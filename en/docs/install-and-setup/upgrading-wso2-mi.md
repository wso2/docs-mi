# Upgrade WSO2 Integrator: MI

This document walks you through the process of upgrading WSO2 Integrator: MI.

## Why upgrade?

There are multiple reasons why you would want to upgrade the WSO2 product to the latest version. These reasons include but are not limited to the following.

- The current product version you are using is reaching its end of life. To see if this is the case, view the [support matrix documentation](https://wso2.com/products/support-matrix/).
- You want to leverage the new features of the latest version of the product.
- The version of the product you have does not have certain security and bug fixes that you require.

## What has changed

Over the course of its lifetime, WSO2 Integrator: MI has changed significantly and some of the features you were using in an older version may not work the same way.

To learn what’s new in the WSO2 Integrator: MI 4.6.0 release, see the [About this Release]({{base_path}}/get-started/about-this-release/) page.

## Pre-upgrade tasks

Before bringing your upgraded MI 4.6.0 nodes online, complete the tasks below that apply to your deployment.

### Add the task delete barrier tables to the cluster coordination database

Applies to **clustered deployments** that use [RDBMS-based coordination]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#cluster-coordination).

MI 4.6.0 enables the **task delete barrier** feature by default to prevent stale tasks and brief duplicate execution during hot undeployment. The feature stores its state in four new tables in the coordination database (the database configured as `WSO2_COORDINATION_DB`). For new clusters these tables are created automatically by the standard `<DB_TYPE>_cluster.sql` script — but if you are reusing an existing pre-4.6.0 coordination database, you must add them manually before starting the upgraded cluster, otherwise hot-undeploy of coordinated tasks will fail.

Stop all cluster nodes, then run the standalone barrier script for your database type from `<MI_HOME>/dbscripts/<DB_TYPE>/`:

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
=== "Oracle RAC"
    ```bash
    sqlplus user/password@SID @<MI_HOME>/dbscripts/oracle-rac/oracle_rac_cluster_task_delete_barrier.sql
    ```
=== "PostgreSQL"
    ```bash
    psql -U root -d clusterdb -f <MI_HOME>/dbscripts/postgres/postgresql_cluster_task_delete_barrier.sql
    ```
=== "IBM DB2"
    ```bash
    db2 -tvf <MI_HOME>/dbscripts/db2/db2_cluster_task_delete_barrier.sql
    ```

Run the script **once per cluster** — the tables are shared by every node. If you would prefer to keep the legacy cleanup behavior instead of running the migration, see [Disabling the feature]({{base_path}}/install-and-setup/setup/feature-configs/configuring-task-delete-barrier/#disabling-the-feature).

For background on what the feature does and how to verify it after the upgrade, see [Configuring the Coordinated Task Delete Barrier]({{base_path}}/install-and-setup/setup/feature-configs/configuring-task-delete-barrier).

## Get started

To make sure that the upgrade process is smooth and you have the best experience, WSO2 recommends that you reach out to WSO2 Support in order to upgrade WSO2 Integrator: MI with minimal difficulty.

If you are ready to start the migration process, follow the instructions given below.

If you already have a WSO2 subscription, create a support ticket with your migration requirements and one of our support engineers will get in touch with you.

- [Create a ticket](https://support.wso2.com/support)

If you are not a WSO2 customer and still need migration assistance and resources, please contact us through the following link. One of our Account Managers will get in touch with you to help.

- [Contact us](https://wso2.com/contact/?ref=migrationsupport)
