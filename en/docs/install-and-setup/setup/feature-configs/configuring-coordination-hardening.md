# Configure Coordination Hardening for At-Most-Once Task Execution

In a clustered WSO2 Integrator: MI deployment that uses [RDBMS-based coordination]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#cluster-coordination), every coordinated task (a scheduled trigger or a message processor) is assigned to one node at a time. Under certain faults the cluster's view of that assignment can lag behind reality: a JVM pause such as a long garbage collection or a heap dump, a slow or briefly unavailable coordination database, a node failing over while it is still running its tasks, or a redeployment that overlaps a membership change. In those windows the same scheduled occurrence of a task can run on two nodes.

**Coordination hardening** closes those windows. When it is enabled, a node claims every task execution in the coordination database before it runs it, a node only schedules coordinated tasks after it has proven that it holds a live boot lease, a watchdog detects JVM freezes and stops the node from firing until it has re-proven itself, and every node reports its readiness through the Management API with named conditions that tell you what to do.

The feature is **disabled by default**. It is available from WSO2 Integrator: MI 4.7.0 onwards and builds on the [coordinated task delete barrier]({{base_path}}/install-and-setup/setup/feature-configs/configuring-task-delete-barrier) and [coordinated task monitoring]({{base_path}}/install-and-setup/setup/feature-configs/configuring-task-monitoring).

## What this feature does

When coordination hardening is enabled on every node:

- **Claim before fire.** Each scheduled occurrence of a coordinated task is claimed once, cluster wide, in the `COORDINATED_TASK_CLAIM` table before the task runs. A second node that reaches the same occurrence is refused and logs `Coordinated fire vetoed` with a reason (`LOST_RACE`, `EPOCH_MISMATCH` or `LAPSED`). A refused fire is the protection working, not a failure.
- **Boot lease.** A node advertises itself in the `NODE_ADVERTISEMENT` table when it starts and only begins coordinated scheduling once its lease is `PROVEN`. Until then it holds its tasks instead of running them alongside another node.
- **Pause Watchdog.** If the JVM freezes for longer than 0.75 x W (see the timing rule below), the node treats its lease as lapsed and stops firing. When the JVM resumes, the node re-proves its lease, its running tasks are handed back to the scheduler and they resume without a restart.
- **Synchronous injection.** Message injector tasks complete their sequence mediation on the Quartz worker thread that fired the task, instead of handing the message to the mediation thread pool, so a claim covers the whole execution of the task and not only its start.
- **Readiness reporting.** `GET /management/coordination-readiness` reports whether the node is green and lists any condition by name, class and detail. Two operator endpoints, `POST /management/task-reconfigure` and `POST /management/task-retire`, resolve the rare cases where a task's recorded state has to be changed by hand. See [Coordination readiness and task operations]({{base_path}}/observe-and-manage/working-with-management-api/#get-coordination-readiness).
- **Quorum with `task_server_count`.** When the round robin resolver is configured with `task_server_count`, coordinated tasks pause while fewer nodes than that count are live, and resume within seconds of the missing node proving itself. Without `task_server_count` the surviving node takes the tasks over within about one W.

!!! Note "The timing rule"
    Every window in this page is expressed as `W = heart_beat_interval x heart_beat_max_retry` of the [RDBMS coordination parameters]({{base_path}}/install-and-setup/setup/feature-configs/configuring-rdbms-coordination). With the defaults, W = 5000 ms x 3 = 15 s, the watchdog threshold is 0.75 x W = 11.25 s and the usual alert window is 4 x W = 60 s. If you change the heartbeat settings, recompute W. Size W so that 0.75 x W is longer than the longest JVM pause you expect on the node. A pause between 0.75 x W and W lapses the lease, which recovers by itself once the JVM resumes, and a pause longer than W also makes the cluster evict the node, exactly as it does without the feature.

## Before you begin

- The cluster uses RDBMS-based coordination and the system clocks of all nodes are synchronized.
- `heart_beat_interval` and `heart_beat_max_retry` are identical on every node. A node with different values is refused at join time.
- The [coordinated task delete barrier]({{base_path}}/install-and-setup/setup/feature-configs/configuring-task-delete-barrier) is enabled (it is enabled by default) and the [coordinated task monitoring]({{base_path}}/install-and-setup/setup/feature-configs/configuring-task-monitoring) tables exist. The monitoring feature powers the duplicate detector and the `task-status` views you will use to operate the cluster.

## Step 1 - Create the hardening tables

Run the matching script against your **coordination database** (the database configured as the `WSO2_COORDINATION_DB` datasource) before you enable the feature on any node:

```text
<MI_HOME>/dbscripts/<DB_TYPE>/<DB_TYPE>_cluster_coordination_hardening.sql
```

Scripts are provided for `mysql`, `mssql`, `oracle`, `oracle-rac`, `postgres` and `db2`. Each script creates two tables and nothing else:

- `COORDINATED_TASK_CLAIM`
- `NODE_ADVERTISEMENT`

The script only creates tables, writes no data and can be run again safely. Running it against a live cluster changes nothing until a node is enabled in the next step.

!!! Note
    On MySQL, the coordination database must use the `latin1` character set, the same requirement that applies to the base cluster coordination script.

!!! Warning
    Do not enable the feature (Step 3) on a node whose coordination database lacks these tables. Such a node refuses to finish starting, which is the intended fail-closed behavior: it opens no transports and logs an `ERROR` that names the `schema-present` condition and a hardened activation step that failed. Apply the script to the database and the node completes its startup on its own within one lease retry, without a restart.

## Step 2 - Remove leftover task entries

The boot pass of an armed node accepts the cluster only when every entry in `COORDINATED_TASK_TABLE` has an open claim row bound to a schedule fingerprint and a trigger family. Whether the task is deployed is not part of that rule. Claim rows are created only when an armed node registers a deployed task, so before the first activation an entry whose artifact no node deploys can never receive one, and it keeps every node in the `seeding-parity` gate with no coordinated task running. A coordination database that was in use before the feature was enabled can hold such entries, typically because an artifact was removed while the server was stopped, which never triggers the cleanup that removes the entry. Remove them before the first armed start.

Run the same check the product runs, against the coordination database:

```sql
SELECT t.TASK_NAME, t.DESTINED_NODE_ID, t.TASK_STATE, c.STATUS, c.SCHEDULE_FP
  FROM COORDINATED_TASK_TABLE t
  LEFT JOIN COORDINATED_TASK_CLAIM c ON t.TASK_NAME = c.TASK_NAME
 WHERE c.TASK_NAME IS NULL OR c.STATUS <> 'OPEN' OR c.SCHEDULE_FP IS NULL OR c.TRIGGER_FAMILY IS NULL;
```

This is the exact check the boot pass runs. An entry is listed when it has no claim row, when its claim is not `OPEN`, or when the claim is not yet bound to a schedule fingerprint and trigger family. Before the first activation the query lists every entry, because no claim rows exist yet. Compare the names against the scheduled triggers and message processors deployed on every node (`repository/deployment/server/carbonapps` and `synapse-configs/default/tasks`). Delete only the entries whose artifact is deployed on no node:

```sql
DELETE FROM COORDINATED_TASK_TABLE WHERE TASK_NAME IN ('<task name>', '<task name>');
```

Do not truncate the table: the entries of deployed tasks carry their recorded state. If an entry is missed, the readiness output of every node names it under `seeding-parity` and the same delete applies while the nodes keep running; the boot pass retries on its own and no restart is needed. After activation the query returns no rows on a healthy cluster. An entry listed with a claim that is not `OPEN` is resolved through the operator endpoints, a reopen with `task-reconfigure` or a `task-retire`, never by SQL. An artifact removed while a node is stopped after activation leaves an entry that keeps its open claim row, so that entry satisfies the boot-pass rule, does not appear in this query and does not block any node. A node that does not have the task deployed ignores the entry. Once the task is deployed on no node, remove the entry with `task-retire`, not by SQL.

## Step 3 - Enable the feature on every node

Add the following to `<MI_HOME>/conf/deployment.toml` on **every node**:

```toml
[task_handling]
coordination_hardening = true
enable_task_delete_barrier = true
synchronous_injection = true
enable_task_monitoring = true
```

The first three settings are checked together when the node starts. A node with `coordination_hardening = true` but `enable_task_delete_barrier` or `synchronous_injection` missing or `false` refuses to arm: its readiness reports the `hardening-profile-invalid` condition and it does not fire coordinated tasks until the block is corrected. Never work around this by dropping one of the flags.

Restart the nodes **one at a time**, letting the cluster settle before the next. A restarted node comes back armed and claims each execution before it runs it. A node that has not been restarted yet still fires the way it did before, so a mixed cluster carries the same duplicate risk as before the feature and no more. There is no data migration step: the first armed boot of each node seeds the claim table from its own task registrations.

!!! Note
    All nodes in the cluster must use the same values for these four settings. A node that stays at `coordination_hardening = false` is reported by its peers under the `unadvertised-member` condition and is excluded from task placement.

## Step 4 - Confirm the feature is active

After the rolling restart, [get a JWT token]({{base_path}}/observe-and-manage/working-with-management-api/#getting-a-jwt-token) and ask every node for its readiness:

```bash
curl -X GET "https://localhost:9164/management/coordination-readiness" -H "accept: application/json" -H "Authorization: Bearer TOKEN" -k
```

An armed and healthy node responds with:

```json
{
    "node": "node",
    "green": true,
    "conditions": []
}
```

A node that still runs with the feature off responds with `"green": false` and the single condition `hardening-disabled`. Every node green with an empty condition list is the point at which the guarantee is active for the cluster.

The `wso2carbon.log` of each armed node shows these lines during startup:

```text
INFO {BootLeaseControllerImpl} - Boot lease PROVEN for node [node], boot id [...]: ELIGIBLE published; coordinated scheduling starts.
INFO {MessageInjector} - Global synchronous injection is enabled. Message-injector tasks will complete sequence mediation on the Quartz worker thread ...
```

## Monitor the cluster

Two rules apply to every endpoint below: they return HTTP 200 even when the node is degraded, so parse the body and never the status code, and there is no cluster wide endpoint, so poll **every node** and combine the answers in your monitoring system. Replace `9164` with each node's management port (9164 plus the node's port offset).

### The endpoints to poll

| Endpoint | What to check | Alert when |
|---|---|---|
| `GET /management/coordination-readiness` | `green` and `conditions[].name` | `green` is `false` on any node for longer than 4 x W. A short red right after a start or a failover is normal. |
| `GET /management/coordination-readiness?view=liveness` | `leaseState` (want `PROVEN`), `live` (want `true`), `schedulerCycle.graceExpired` (want `false`), `terminalLeaseState.terminal` (want `false`) | `terminal` is `true` (page now), or `live` is `false` for longer than 4 x W. A node can be green and still not live during a database stall; this view shows it. |
| `GET /management/task-status` | every coordinated task listed under some node | a task missing from every node for longer than 4 x W while all nodes are live. An uneven split after a rolling restart is normal; placement does not rebalance by itself. |
| `GET /management/task-status?view=duplicates` and `?view=history` | `healthy` and the `severity` of past episodes | any episode with severity `SUSTAINED`, or an open episode older than 2 x W. `TRANSIENT` episodes of a few seconds around restarts and failovers are normal and clear by themselves. |
| `GET /management/coordination-readiness?view=counters` | refused fires per task and reason | a counter that stays `open` for one task for longer than 4 x W. |

The same duplicate check is available to a database monitor:

```sql
SELECT COUNT(*) FROM TASK_DUPLICATION_EVENT WHERE SEVERITY = 'SUSTAINED';
SELECT COUNT(*) FROM TASK_DUPLICATION_EVENT WHERE CLEARED_AT IS NULL;
SELECT COUNT(*) FROM COORDINATED_TASK_TABLE WHERE DESTINED_NODE_ID IS NULL OR DESTINED_NODE_ID = '';
```

The first count must be 0. The second counts every open episode, including the transient ones that clear by themselves, so alert on it only when it stays above 0 for longer than 2 x W and apply that age rule in the monitoring system. The third must be 0 while all nodes are live.

### Log lines to alert on

Match on the quoted substrings in `wso2carbon.log` on every node. The wording is stable. A repeated condition is logged once, then once per minute with a count, then once when it clears, so these patterns do not flood.

**Page immediately**

| Match | Meaning | What to do |
|---|---|---|
| `Coordinated task duplication SUSTAINED` | A task provably ran on two nodes longer than the tolerance. | Check `?view=duplicates`, collect the logs of both nodes and contact WSO2 Support. |
| `COORDINATED_TASK_CLAIM went backwards` | The database returned older data than was committed (a stale replica or a restore). | Stop and verify the database before touching any node. |
| `Boot lease TERMINAL` | The node stopped coordinated work permanently. | See terminal standby below. |
| `is a duplicate node` | Two processes run with the same `node_id`. | Fix the `node_id` and restart the duplicate. |
| `Waiting for N nodes to resolve the tasks` | Only with `task_server_count`: coordinated tasks are paused below quorum. Readiness stays green during this, so the log line is the only signal. It repeats several times per second: alert on presence, not on volume. | Bring the missing node back. |

**Same day**

| Match | Meaning | What to do |
|---|---|---|
| `recorded registration failures` | Startup registration failed for the named tasks and the node stays non firing. | See `boot-pass-incomplete` in the condition table. |
| `Boot lease LAPSED` without `Boot lease recovered to PROVEN` or `re-acquired with a fresh generation` within 4 x W | The node lost its lease and did not come back. | Check database latency and the liveness view; restart the node if it stays lapsed. |
| `Pause Watchdog: JVM freeze detected` | The JVM froze (garbage collection, heap dump, virtual machine pause) and recovered by itself. | Find the cause of the freeze and keep W longer than the longest expected freeze. |
| `Coordinated fire still vetoed` | One task has been refused on one node for over a minute. | Read the `reason` and the counters view. |
| `alive and not acknowledging` or `Skip-wait hint set` | An undeploy is inconsistent across nodes. | Undeploy the artifact from every node. |
| `A hardened activation step failed` | An armed node cannot finish starting, usually because the hardening tables are missing. | Run the script of Step 1; the node completes its startup without a restart. |
| `Config Fence refuses coordination` or `window mismatch` | This node's coordination settings differ from a live peer. | Make the `[task_handling]` block and the heartbeat settings identical on all nodes and restart this node. |
| `parked` | A redeployed task definition was held because its trigger type or schedule changed in a way that conflicts with the recorded one. The task does not run until resolved. | See `parked-task` in the condition table. |

**Normal, do not alert on these**

`Coordinated fire vetoed` with reason `LOST_RACE` or `EPOCH_MISMATCH` followed by `veto cleared`, `did not commit this cycle`, `Failed to publish ownership and update state as RUNNING`, `is running locally but assigned to`, `Coordinated task duplication DETECTED` followed by `CLEARED`, `serialization (deadlock) victim on attempt 1 of 3` or `attempt 2 of 3`, and the recovery lines `Boot lease recovered to PROVEN`, `Boot lease recovery handed [N] RUNNING row(s)` and `Task resumed`. These are the protection working around restarts, failovers and database turbulence. Alert only if the same line repeats for one task for longer than 4 x W.

### Readiness conditions

The `clazz` of a condition tells you its shape. `GATE` means the node refuses coordinated work until the cause is removed. `CONTINUOUS` means the node is reporting a state that may clear by itself. Whatever the condition, first check that the other nodes are green and `task-status` shows every task running somewhere: if so, the tasks are safe and you have time. The `detail` text names the task, the setting or the peer involved.

Conditions that need an operator action on that node. Each row says whether a restart follows, and where it does, restart only after fixing the named cause:

| Condition | Meaning | What to do |
|---|---|---|
| `hardening-disabled` | `coordination_hardening` is not set on this node. | Add the `[task_handling]` block of Step 3 and restart. |
| `hardening-profile-invalid` | The flag is on but `enable_task_delete_barrier` or `synchronous_injection` is not `true`. | Set the block exactly as in Step 3 and restart. |
| `hardening-config-contradiction` | The flag value could not be parsed and the node fell back to the default behavior. | Fix the value and restart. |
| `schema-present` | The hardening tables are missing. The server does not finish starting. | Run the script of Step 1; the node then completes its startup on its own. |
| `timing-validation` | The heartbeat settings contradict each other. | Make `heart_beat_interval` and `heart_beat_max_retry` identical on every node and restart. |
| `config-fence-correctness-convergence` | This node's coordination settings differ from a live peer; `detail` lists the keys. | Align the settings with the peer and restart this node. |
| `boot-pass-incomplete` | At startup one or more tasks, named in `detail`, failed to register. The node refuses to fire coordinated tasks rather than run a partial set. Other nodes keep running every task. | If the named task's artifact is broken, fix it. If the log shows three `serialization (deadlock) victim` lines for the task before the failure, nothing is broken: restart this node once. |
| `fingerprint-conflict` | A redeployed task's schedule differs from the recorded one, typically after an artifact was replaced while the node was stopped. The task is parked on this node until resolved. | If the change was unintentional, deploy the same artifact version on every node and restart this node to clear the flag. If the schedule change is intended, either redeploy the artifact with the server running, undeploy then deploy, so the delete barrier retires the old record and the new definition registers cleanly, or call `POST /management/task-reconfigure` with the expected incarnation and the recorded fingerprint printed in `detail`. |
| `trigger-family-conflict` | A task changed its trigger type, from cron to interval or back, which is not allowed. | Undeploy the task everywhere, retire it with `POST /management/task-retire`, and redeploy it under a new name. |
| `orphan-task-row` | A task entry that is still present sits over a claim that is `CLOSED` or retired. It is found when the task registers or when it is undeployed, and `detail` names the task. | Reopen the claim with `task-reconfigure` from a node that has the task deployed, or remove the task with `task-retire`, as described in the Management API reference. The condition clears by itself once the entry is resolved. |
| `fingerprint-bind-completeness`, `guard-orphan`, `durable-finalizing-wave`, `anti-join-invariant`, `config-fence-byte-length` | Internal consistency problems, usually from out of band database edits. | Do not edit the database. Collect the logs and the readiness output and contact WSO2 Support. |

Conditions that clear by themselves. Alert only if one lasts longer than 4 x W:

| Condition | Meaning | What to do |
|---|---|---|
| `non-proven-lease-state` | The node is between lease states: starting, or recovering from a stall or a freeze. | Wait 4 x W. If it stays, look for a `GATE` condition beside it and treat that one. |
| `seeding-parity` | The boot pass check of Step 2 failed. `detail` names each entry with its reason: `missing claim row`, `unexpectedly CLOSED claim row` (or another status that is not `OPEN`), or `unbound claim row`. On a first activation these are `missing claim row` leftovers of tasks deployed on no node; every node reports the same names and no coordinated task runs until they are resolved. | `missing claim row`: delete the entry if its artifact is deployed nowhere, or deploy the artifact. A claim that is not `OPEN`: reopen it with `task-reconfigure` from a node that has the task deployed, or remove the task with `task-retire`, never by SQL. `unbound claim row`: the claim lost its fingerprint or trigger family outside the server; do not edit the database, contact WSO2 Support. The boot pass retries on its own within about one W, no restart needed. Contact WSO2 Support if the named tasks are deployed on a live node and the condition stays. |
| `unadvertised-member` (leader only) | A live member has not armed the feature and is excluded from placement. | Expected during the rolling activation. Otherwise check that node's readiness. |
| `standby-holds-coordinatorship` | A node not cleared for work holds the leader role for a moment. | Wait. |
| `deployed-but-rowless` | A deployed task has no database row; the repair runs by itself. | Wait one scheduler cycle. |
| `wave-holdout` | An undeploy is waiting for a live node that still has the artifact. | Undeploy the artifact from every node. |
| `parked-task` | A task definition is parked pending one of the conflicts above. | Treat the paired conflict condition. |
| `misfire-validation` | A task declares a misfire policy the feature does not allow. | Fix the task definition and redeploy. |

### Terminal standby

`terminalLeaseState.terminal` is `true` in the liveness view and the log shows `Boot lease TERMINAL`. The node has stopped coordinated work for good, which happens when two processes share one `node_id` or when another process took over the node's advertisement while this node was frozen past W. In both cases fix the cause if there is one and restart the terminal node once. The other nodes keep running every task in the meantime.

### Expected timings

| Event | Expect within | Investigate after |
|---|---|---|
| A restarted node is green and its tasks are placed | 1 to 2 x W | 5 minutes |
| A terminal node restarted and `PROVEN` again | 1 x W | 2 minutes |
| Quorum restored with `task_server_count` and tasks firing again | seconds, at most 1 x W | 2 minutes |
| `Boot lease LAPSED` followed by `recovered to PROVEN` | tracks the database fault | 5 minutes after the database is healthy |
| A JVM freeze ends and every task fires again | 1 to 2 x W | any task still stopped minutes after the cluster is healthy |

After a freeze, on one node or on all nodes at once, recovery is automatic and needs no restart: expect `Boot lease recovered to PROVEN`, then `Boot lease recovery handed [N] RUNNING row(s)`, then `Task resumed` lines. A task paused during a fault is the protection holding it rather than risking a duplicate.

### Thirty second triage

1. `coordination-readiness` on every node. All green: look at the log alerts only.
2. One node red: use the condition tables above. Tasks are safe while the other nodes are green.
3. `?view=duplicates` reports `"healthy": false`, or a `SUSTAINED` line: collect the logs of both nodes and the duplicates history, and contact WSO2 Support.
4. `terminal` is `true`: one restart of that node.
5. Everything red at once: the coordination database. Check its reachability and latency before touching any node.

## Behavior notes

- **Startup registration deadlock.** When a node joins while the leader is handing tasks to it, the two database writes can deadlock. The registration is retried up to three times with a short pause, logging one `WARN ... serialization (deadlock) victim on attempt N of 3` per lost attempt, and the node proves itself within a second or two. If all three attempts lose, which has been seen only on SQL Server under a slow database path, the node reports `boot-pass-incomplete` and one restart of that node resolves it. Nothing is duplicated: the other nodes keep every task.
- **Task entries after activation.** Every entry an armed node creates gets its claim row in the same registration, and an undeploy done with the server running removes the entry through the delete barrier. An artifact removed while a node is stopped leaves an entry that keeps its open claim row: the node still starts, a node without the task ignores the entry, and `task-retire` removes it once the task is deployed on no node. The `seeding-parity` gate can only return if a node ran with the feature off against the same database, if the task table was restored or copied without the claim table, or if the claim table was edited by hand.
- **Rolling restarts.** Placement concentrates on the node that stayed up and does not rebalance by itself. An uneven split is normal.
- **Standalone servers.** On a server that does not use RDBMS coordination the feature does nothing and the readiness endpoint reports `hardening-disabled`.

## Disable the feature

Set `coordination_hardening = false` under `[task_handling]` on **every node** and restart the nodes one at a time. The claim and advertisement tables can stay in the database; they are harmless when unused and there is no teardown script to run.
