# Configure the Coordinated Task Delete Barrier

The **task delete barrier** is enabled by default in clustered WSO2 Integrator: MI deployments that use [RDBMS-based coordination]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#cluster-coordination). Most users do not need to do anything to use this feature — but you should read this page if you are **upgrading an existing cluster** (you may need to add a few tables to your coordination database) or if you want to **disable** the feature.

## What this feature does

When you hot-undeploy a coordinated task (a scheduled trigger or a message processor) in a clustered MI deployment, MI must remove the task from the shared coordination database so that no other node tries to run it. Without coordination, this cleanup can leave behind stale tasks or briefly reassign tasks to nodes that have already removed them.

The task delete barrier makes the cleanup deterministic: the cluster waits for every node to confirm that the task is gone locally before the row is removed from the database.

## New clusters — no setup required

If you are setting up a new cluster, the default coordination-database script (`<MI_HOME>/dbscripts/<DB_TYPE>/<DB_TYPE>_cluster.sql`) creates the four barrier tables automatically alongside the rest of the cluster coordination tables:

- `TASK_DELETE_GUARD`
- `TASK_DELETE_BARRIER`
- `TASK_DELETE_BARRIER_EXPECTED`
- `TASK_DELETE_BARRIER_ACK`

No additional configuration is required — the feature is on as soon as your cluster starts.

## Migrate an existing cluster

If you are upgrading an existing cluster from a previous MI version, the four barrier tables are not present in your current coordination database and must be added before starting the upgraded cluster — otherwise hot-undeploy of coordinated tasks will fail. The per-database scripts and recommended downtime steps are delivered as part of the support migration package; [contact WSO2 Support](https://wso2.com/contact/?ref=migrationsupport) to request the MI 4.6.0 migration resources.

## Confirm the feature is active

After the cluster starts, look for this line in the `wso2carbon.log` on each node:

```text
INFO {ScheduledTaskManager} - Clustered task delete barrier flow is enabled. Configure [task_handling.enable_task_delete_barrier] to control it.
```

When a coordinated task is hot-undeployed, the leader node logs a `Leader flow finalized delete barrier` line, and worker nodes log `Barrier acknowledgement` lines. Seeing both confirms the feature is working end-to-end.

## Disable the feature

If you need to revert to the legacy best-effort cleanup behavior, set `enable_task_delete_barrier = false` under `[task_handling]` in `<MI_HOME>/conf/deployment.toml` on **every node**, then restart:

```toml
[task_handling]
enable_task_delete_barrier = false
```

!!! Note
    All nodes in the cluster must use the same value for `enable_task_delete_barrier`. Mixing nodes with the feature enabled and disabled is not supported.

When disabled, the cluster reverts to the legacy behavior where the leader node uses a short timed delay before deleting the task row. The four barrier tables can stay in the database — they are harmless when unused, and there is no teardown script to run.
