# Configuring the Coordinated Task Delete Barrier

!!! Note
    This feature is available from the latest update of WSO2 Integrator: MI 4.5.0 onwards and applies only to **clustered deployments** with [RDBMS-based coordination]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#cluster-coordination) enabled.

## What this feature does

When you hot-undeploy a coordinated task (a scheduled trigger or a message processor) in a clustered MI deployment, MI must remove the task from the shared coordination database so that no other node tries to run it. By default this cleanup is a best-effort operation that uses a short timed delay — and on busy clusters or during overlapping hot deployments, it can leave behind stale tasks or briefly reassign tasks to nodes that have already removed them.

Enabling the **task delete barrier** makes the cleanup deterministic: the cluster waits for every node to confirm that the task is gone locally before the row is removed from the database.

## When you should enable this

Enable the task delete barrier if you are seeing any of the following in your cluster:

- **Stale task entries** lingering in the coordination database after CAR files are undeployed.
- **Tasks running on a node that no longer has the artifact**, usually visible as "task not found" errors right after a hot deployment.
- **Brief duplicate execution** of the same task on two nodes during rolling deployments.

If your cluster is small, deployments are infrequent, and you have not seen the symptoms above, the default behavior is usually sufficient and no action is needed.

## Before you start

You will need:

- A clustered MI deployment with RDBMS-based coordination already configured.
- Access to the coordination database with permission to create tables.
- Access to the `deployment.toml` file on every node in the cluster.

## Step 1 — Create the required database tables

The feature uses a few extra tables in the same database you have configured as `WSO2_COORDINATION_DB`. You must create them **before** enabling the feature, or task deletions will fail.

Run the script for your database type from `<MI_HOME>/dbscripts/<DB_TYPE>/`:

=== "MySQL"
    ```bash
    mysql -u root -p clusterdb < <MI_HOME>/dbscripts/mysql/mysql_cluster_task_delete_barrier.sql
    ```
=== "MSSQL"
    ```bash
    sqlcmd -S localhost -d clusterdb -i <MI_HOME>/dbscripts/mssql/mssql_cluster_task_delete_barrier.sql
    ```
=== "Oracle"
    ```bash
    sqlplus user/password@SID @<MI_HOME>/dbscripts/oracle/oracle_cluster_task_delete_barrier.sql
    ```
=== "PostgreSQL"
    ```bash
    psql -U root -d clusterdb -f <MI_HOME>/dbscripts/postgresql/postgresql_cluster_task_delete_barrier.sql
    ```
=== "IBM DB2"
    ```bash
    db2 -tvf <MI_HOME>/dbscripts/db2/db2_cluster_task_delete_barrier.sql
    ```

You only need to run this once per cluster — the tables are shared by all nodes.

!!! Warning
    Do not enable the feature in `deployment.toml` until this script has run successfully. If the tables do not exist, task deletions will not be processed.

## Step 2 — Enable the feature on every node

On **each node** in the cluster, open `<MI_HOME>/conf/deployment.toml` and add `enable_task_delete_barrier = true` under the `[task_handling]` section:

```toml
[task_handling]
enable_task_delete_barrier = true
```

Restart the node for the change to take effect.

!!! Note
    All nodes must use the same value. Do not enable the feature on some nodes and leave it disabled on others — mixed clusters are not supported.

## Step 3 — Confirm the feature is active

After restart, look for this line in the `wso2carbon.log` on each node:

```
INFO {ScheduledTaskManager} - Clustered task delete barrier flow is enabled. Configure [task_handling.enable_task_delete_barrier] to control it.
```

Then trigger a hot undeploy of a coordinated task (for example, by removing a scheduled trigger CAR). On the leader node you should see a `Leader flow finalized delete barrier` log line, and on workers a `Barrier acknowledgement` line. Seeing both confirms the feature is working end-to-end.

## Disabling the feature

To turn the feature off, set the property to `false` (or remove the line) in `deployment.toml` on every node, then restart:

```toml
[task_handling]
enable_task_delete_barrier = false
```

The cluster reverts to the default behavior. The barrier tables can stay in place — they are harmless when unused, and there is no teardown script to run.
