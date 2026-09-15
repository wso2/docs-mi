# Configure Coordinated Task Monitoring

In a clustered WSO2 Integrator: MI deployment that uses [RDBMS-based coordination]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#cluster-coordination), every coordinated task (a scheduled trigger or a message processor) is expected to run on exactly **one** node at a time. **Coordinated task monitoring** lets you verify that this is actually the case: it records which node each coordinated task is running on, detects when the same task ends up running on more than one node, exposes this information through the [Management API]({{base_path}}/observe-and-manage/working-with-management-api/#get-task-status), and writes log alerts you can hook into existing log-based monitoring.

The feature is **disabled by default**, and it is strictly an observer — enabling it never changes how tasks are scheduled or assigned.

## What this feature does

Certain failure patterns — for example, a node with a misconfigured heartbeat interval evicting another node that is still alive — can silently leave the same coordinated task running on two nodes at once, causing duplicate message processing. Without this feature, the only way to notice is to compare application-level side effects across nodes.

When coordinated task monitoring is enabled:

- Every node periodically records the coordinated tasks it is **actually running** into the coordination database (the `RUNNING_TASK_OBSERVATION` table).
- The leader node continuously cross-checks these observations and records every duplication episode — including short-lived ones — with its duration and severity (the `TASK_DUPLICATION_EVENT` table).
- The `GET /management/task-status` Management API resource lets you query the live task placement, check for live duplicates, and browse the duplication history.
- The leader node logs a `WARN` when a duplication is **detected** or **cleared**, and an `ERROR` when it is **sustained**, so existing log alerting catches the problem without anyone polling the API.

## Step 1 - Create the monitoring tables

Run the matching script against your **coordination database** (the database configured as the `WSO2_COORDINATION_DB` datasource):

```text
<MI_HOME>/dbscripts/<DB_TYPE>/<DB_TYPE>_task_monitoring.sql
```

Scripts are provided for `mysql`, `mssql`, `oracle`, `oracle-rac`, `postgres`, and `db2`. Each script creates the two monitoring tables:

- `RUNNING_TASK_OBSERVATION`
- `TASK_DUPLICATION_EVENT`

!!! Note
    On MySQL, the coordination database must use the `latin1` character set — the `VARCHAR(512)` composite primary key exceeds the InnoDB index key limit under MySQL 8's default `utf8mb4`. This is the same requirement that applies to the base cluster coordination script.

## Step 2 - Enable the feature

Add the following to `<MI_HOME>/conf/deployment.toml` on **every node**, then restart the nodes:

```toml
[task_handling]
enable_task_monitoring = true
```

While the flag is not set, the feature is fully inert: nothing is written to the monitoring tables, and every `task-status` view responds with `"taskMonitoringEnabled": false`.

!!! Note
    Enable the feature on all nodes in the cluster. A node that does not have the flag set never reports its running tasks, so it is invisible to the monitor and duplications involving that node cannot be detected.

## Step 3 - Query task status

Use the `GET /management/task-status` resource of the Management API. The database-backed views read the shared coordination database, so you can query **any** node and get the cluster-wide answer.

First [get a JWT token]({{base_path}}/observe-and-manage/working-with-management-api/#getting-a-jwt-token), then invoke the resource:

```bash
curl -X GET "https://localhost:9164/management/task-status?view=duplicates" -H "accept: application/json" -H "Authorization: Bearer TOKEN" -k
```

| Resource | Shows |
|----------|-------|
| `/task-status` | Which coordinated task runs on which node (cluster-wide). |
| `/task-status?node={nodeId},{nodeId}` | The same view, filtered to specific node(s). |
| `/task-status?name={taskName}` | Where one task runs, a `duplicate` flag, and the last observed time. |
| `/task-status?view=duplicates` | Tasks running on two or more nodes **right now** (`"healthy": true` means none). |
| `/task-status?view=history` | Forensic episode log — every past duplication with severity and duration. Add `&name={taskName}` to filter. |
| `/task-status?scope=local` | The queried node's own in-memory task set. Reads no database, so it keeps answering during a coordination database outage — query each node and compare. |

For example, a healthy cluster responds to `?view=duplicates` with:

```json
{
    "duplicates": [],
    "healthy": true,
    "coordinationDbAvailable": true
}
```

and a cluster with a live duplication responds with:

```json
{
    "duplicates": [
        {
            "nodes": ["node", "node1"],
            "taskName": "SampleScheduledTask"
        }
    ],
    "healthy": false,
    "coordinationDbAvailable": true
}
```

See [GET TASK STATUS]({{base_path}}/observe-and-manage/working-with-management-api/#get-task-status) for the complete resource reference with sample responses for every view.

## Log-based alerting

The leader node logs every duplication state transition, so you do not need to poll the API to be alerted:

- `WARN` — `Coordinated task duplication DETECTED` / `Coordinated task duplication CLEARED`
- `ERROR` — `Coordinated task duplication SUSTAINED` (the duplication persisted beyond roughly twice the cluster heartbeat-retry interval)

Point your existing log alerting at the `ERROR` line to catch sustained duplications automatically.

## Behavior notes

- Only **coordinated** tasks are monitored. On a standalone (non-clustered) server, the resource responds with `"coordinationEnabled": false`.
- Timestamps in API responses are ISO-8601 in **UTC** (note the trailing `Z`).
- During a coordination database outage, the database-backed views degrade explicitly — they return `"coordinationDbAvailable": false` instead of a false `"healthy": true`. Use `?scope=local` against each node in that state.
- A normal task failover (a node shutting down and its tasks moving to another node) is **not** reported as a duplication — observations are aged out using a freshness window derived from the cluster heartbeat-retry interval. Keep the heartbeat interval at or above its default so this window behaves as intended.
