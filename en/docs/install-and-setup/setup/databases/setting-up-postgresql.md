# Setting up a PostgreSQL Database

Follow the steps given below to set up the required Postgre databases for your Micro Integrator.

!!! Tip
	WSO2 Micro Integrator requires databases for the following scenarios:

	-	<a href='{{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi#cluster-coordination'>cluster coordination</a>
    -	<a href='{{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore'>using an RDBMS user store</a>

## Setting up the database and login role

The following Postgre scripts are stored in the `<MI_HOME>/dbscripts/postgres` directory of your Micro Integrator. First, select the scripts that are required for your deployment.

You can run the scripts on one database instance or set up separate instances for each requirement. For convenience, it is recommended to set up separate databases for each use case.

<table>
	<tr>
		<th>Script</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>postgresql_cluster.sql</td>
		<td>This script creates the database tables that are required for <a href='{{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#cluster-coordination'>cluster coordination</a> (i.e., coordinating the server nodes in your VM deployment). This is only applicable if you have stateful integration artifacts deployed in a clustered setup.
		</td>
	</tr>
	<tr>
		<td>postgresql_user.sql</td>
		<td>This script creates the database tables that are required for storing users and roles. This is only required if you have configured an <a href='{{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore'>RDBMS user store</a>.</td>
	</tr>
</table>

Create the databases and then create the DB tables by pointing to the relevant script in the `<MI_HOME>/dbscripts/postgres` directory.

1.  Install PostgreSQL on your computer as follows:  
2.  Start the PostgreSQL service using the following command:  
3.  Create a database and the login role from a GUI using the
4.  To connect PGAdminIII to a PostgreSQL database server, locate the
    server from the object browser, right-click the client and click
    **Connect** . This will show you the databases, tablespaces, and
    login roles as follows:  
5.  To create a database, click **Databases** in the tree (inside the
    object browser), and click **New Database** .
6.  In the **New Database** dialog box, give a name to the database,
    e.g., gregdb and click **OK** .
7.  To create a login role, click **Login Roles** in the tree (inside
    the object browser), and click **New Login Role** . Enter the role
    name and a password.

    These values will be used in the product configurations as described
        in the following sections. In the sample configuration,
        `           dbadmin          ` will be used as both the role name
        and the password.

8.  Optionally, enter other policies, such as the expiration time for
    the login and the connection limit.
9.  Click **OK** to finish creating the login role.

## Setting up the drivers

1.  Download the [PostgreSQL JDBC4 driver](https://jdbc.postgresql.org/download/).
2.  Copy the driver to the `MI_HOME/lib` directory.    

## Connecting the database to the server

Open the `deployment.toml` file in the `<MI_HOME>/conf` directory and add the following sections to create the connection between the Micro Integrator and the relevant database. Note that you need separate configurations corresponding to the separate databases (`clusterdb` and `userdb`).

=== "Cluster DB Connection"
    ```toml 
    [[datasource]]
    id = "WSO2_COORDINATION_DB"
    url= "jdbc:postgresql://localhost:5432/clusterdb"
    username="root"
    password="root"
    driver="org.postgresql.Driver"
    pool_options.maxActive=50
    pool_options.maxWait = 60000
    pool_options.testOnBorrow = true
    ```
=== "User DB Connection"    
    ```toml 
    [[datasource]]
    id = "WSO2CarbonDB"
    url= "jdbc:postgresql://localhost:5432/userdb"
    username="root"
    password="root"
    driver="org.postgresql.Driver"
    pool_options.maxActive=50
    pool_options.maxWait = 60000
    pool_options.testOnBorrow = true
    ```

{!includes/integration/pull-content-user-store-db-id.md!}

See the descriptions of [database connection parameters]({{base_path}}/reference/config-catalog-mi/#database-connection).

!!! note

    To access tables in non-public schemas when using PostgreSQL, you need to explicitly define the schema name in the database connection URL as follows:
    
    ```sql
    postgres://user:password@host/dbname?sslmode=disable&search_path=schema
    ```
    
    Alternatively, you can set the schema directly within the PostgreSQL database configuration as follows:
    
    ```sql
    SET search_path TO wso2schema;
    ```