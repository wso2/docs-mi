# Configure a User Store in WSO2 Integration Control Plane

## File-based user store (default)

The default user store of the WSO2 Integration Control Plane (ICP) is file-based. You can open the `<ICP_HOME>/conf/deployment.toml` file and add new users to the file-based user store as shown below. You can [encrypt the plain text]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text) using secure vault.

The default file-based user configuration is as follows:

```toml
[internal_apis.file_user_store]
enable = true
```

```toml
[[internal_apis.users]]
user.name = "admin"
user.password = "admin"
user.is_admin = true
```

If you want to add or update the file-based user store you can add users as follows.

```toml
[[internal_apis.users]]
user.name = "user-1"
user.password = "pwd-1"
user.is_admin = true
```

```toml
[[internal_apis.users]]
user.name = "user-2"
user.password = "pwd-2"
```

| Parameter       | Description                                 | Required                 |
|-----------------|---------------------------------------------|--------------------------|
| `user.name`     | Username                                    | Yes                      |
| `user.password` | Password                                    | Yes                      |
| `user.is_admin` | Whether the user is given admin privileges  | Default value is `false` |

!!! Tip
    Set `user.is_admin` to `true` to grant admin privileges to a user in the file-based user store.

## Disable the file-based user store

To disable the file-based user store, add the following to the `<ICP_HOME>/conf/deployment.toml` file:

```toml
[internal_apis.file_user_store]
enable = false
```

!!! note
    See the [Integration Control Plane Configuration Catalog]({{base_path}}/reference/config-catalog-integration-control-plane/#single-sign-on) documentation to connect to the dashboard via Single Sign-On (SSO).

## Configure an LDAP user store

!!! info "Before you begin"
    - See the documentation of your LDAP provider for instructions on setting up the LDAP.
    - Disable the file-based user store as shown below using the `<ICP_HOME>/conf/deployment.toml` file.

         ```toml
         [internal_apis.file_user_store]
         enable = false
         ```

Follow the steps below to connect the ICP to your LDAP user store.

1. Open the `deployment.toml` file stored in the `<ICP_HOME>/conf/` directory.
2. Add the following configurations and update the required values.

### Read write LDAP

```toml
[user_store]
connection_url = "ldap://localhost:10389"
connection_name = "uid=admin,ou=system"
connection_password = "admin"
user_search_base = "ou=Users,dc=wso2,dc=org"
type = "read_write_ldap"
```

### Read only LDAP
 
```toml
[user_store]
connection_url = "ldap://localhost:10389"
connection_name = "uid=admin,ou=system"
connection_password = "admin"
user_search_base = "ou=Users,dc=wso2,dc=org"
type = "read_only_ldap"
read_groups = "true"
```

The parameters used above are explained below.

<table>
	<tr>
		<th>Parameter</th>
		<th>Value</th>
	</tr>
	<tr>
		<td>
			<code>connection_url</code>
		</td>
		<td>
			The URL for connecting to the LDAP. If you are connecting over LDAPS (secured LDAP), you need to import the certificate of the user store to the truststore (<code>client-truststore.jks</code> by default). See the instructions on how to <a href="{{base_path}}/install-and-setup/setup/security/importing-ssl-certificate/#importing-ssl-certificates-to-a-truststore">add certificates to the truststore</a>.
		</td>
	</tr>
	<tr>
		<td>
			<code>connection_name</code>
		</td>
		<td>
			The username used to connect to the user store and perform various operations. This user needs to be an administrator in the user store. That is, the user requires write permission to manage add, modify users and perform search operations on the user store. The value you specify is used as the DN (Distinguish Name) attribute of the user who has sufficient permissions to perform operations on users and roles in LDAP.
		</td>
	</tr>
	<tr>
		<td>
			<code>connection_password</code>
		</td>
		<td>
			Password for the connection username.
		</td>
	</tr>
	<tr>
		<td>
			<code>user_search_base</code>
		</td>
		<td>
			The DN of the context or object under which the user entries are stored in the user store. When the user store searches for users, it will start from this location of the directory.
		</td>
	</tr>
	<tr>
		<td>
			<code>type</code>
		</td>
		<td>
			Use one of the following values. </br></br>
			<code>read_only_ldap</code>: The LDAP connection does not provide write access.</br>
			<code>read_write_ldap</code>: The LDAP connection provides write access.
		</td>
	</tr>
</table>

See the [complete list of parameters]({{base_path}}/reference/config-catalog-mi/#external-user-store) you can configure for the LDAP user store.

## Configure an RDBMS user store

!!! note "Before you begin"
    Disable the file-based user store as shown below using the `<ICP_HOME>/conf/deployment.toml` file.

       ```toml
       [internal_apis.file_user_store]
       enable = false
       ```

If you are already using a JDBC user store (database) with another WSO2 product ([WSO2 API Manager](https://wso2.com/api-management/), [WSO2 Identity Server](https://wso2.com/identity-and-access-management/), or an instance of [WSO2 Enterprise Integrator 6.x.x](https://wso2docs.atlassian.net/wiki/spaces/EI660/overview)), you can connect the same database to the ICP. Alternatively, you can create a new RDBMS user store and connect it to the ICP.

1. To set up a new RDBMS, select the preferred RDBMS type and follow the instructions.

	!!! Tip
		If you already have an RDBMS user store set up, you can skip this step.

	- [Setting up a MySQL database]({{base_path}}/install-and-setup/setup/databases/setting-up-mysql)
	- [Setting up an MSSQL database]({{base_path}}/install-and-setup/setup/databases/setting-up-mssql)
	- [Setting up an Oracle database]({{base_path}}/install-and-setup/setup/databases/setting-up-oracle)
	- [Setting up a Postgre database]({{base_path}}/install-and-setup/setup/databases/setting-up-postgresql)
	- [Setting up an IBM database]({{base_path}}/install-and-setup/setup/databases/setting-up-ibm-db2)

2. Be sure to add the JDBC driver to the `<ICP_HOME>/lib` folder.
3. To connect the ICP to your RDBMS user store:

	1. Open the `deployment.toml` file (stored in the `<ICP_HOME>/conf` directory).
	2. Add the relevant configurations for your RDBMS type.

        === "MySQL"
		    ```toml
	        [user_store]
	        class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
	        type = "database"
	        driver_name = "com.mysql.jdbc.Driver"
	        url = "jdbc:mysql://localhost:3306/userdb"
	        username = ""
	        password = ""
	        pool_options.maxActive=50
	        pool_options.maxWait = 60000
	        
	        ```
        === "MSSQL"
		    ```toml
	        [user_store]
	        class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
	        type = "database"
	        driver_name = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
	        url = "jdbc:sqlserver://<IP>:1433;databaseName=userdb;SendStringParametersAsUnicode=false"
	        username = ""
	        password = ""
	        pool_options.maxActive=50
	        pool_options.maxWait = 60000
		    
	        ```
        === "Oracle"    
		    ```toml
	        [user_store]
	        class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
	        type = "database"
	        driver_name = "com.mysql.jdbc.Driver"
	        url = "oracle.jdbc.OracleDriver"
	        username = ""
	        password = ""
	        pool_options.maxActive=50
	        pool_options.maxWait = 60000
	        
	        ```
        === "PostgreSQL"            
		    ```toml
	        [user_store]
	        class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
	        type = "database"
	        driver_name = "org.postgresql.Driver"
	        url = "jdbc:postgresql://localhost:5432/userdb"
	        username = ""
	        password = ""
	        pool_options.maxActive=50
	        pool_options.maxWait = 60000
		    
	        ```
        === "IBM DB"            
		    ```toml
	        [user_store]
	        class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
	        type = "database"
	        driver_name = "com.ibm.db2.jcc.DB2Driver"
	        url = "jdbc:db2://SERVER_NAME:PORT/userdb"
	        username = ""
	        password = ""
	        pool_options.maxActive=50
	        pool_options.maxWait = 60000   
	        ```

		The parameters used above are explained below.

		<table>
			<tr>
				<th>Parameter</th>
				<th>Value</th>
			</tr>
			<tr>
				<td>
					<code>id</code>
				</td>
				<td>
					The name given to the datasource. This is required to be <code>WSO2CarbonDB</code>.</br></br>
					<b>Note</b>: If you replace <code>WSO2CarbonDB</code> with a different ID, you also need to list the ID as a datasource under the <code>[realm_manager]</code> section in the <code>deployment.toml</code> file as shown below.
					<div>
						<code>
						[realm_manager]</br>
						data_source = "new_id"
						</code>
					</div>
					Otherwise, the user store database ID defaults to <code>WSO2CarbonDB</code> in the realm manager configurations.
				</td>
			</tr>
			<tr>
				<td>
					<code>url</code>
				</td>
				<td>
					The URL for connecting to the database. The type of database is determined by the URL string.
				</td>
			</tr>
			<tr>
				<td>
					<code>username</code>
				</td>
				<td>
					The username used to connect to the user store and perform various operations. This user needs to be an administrator in the user store. That is, the user requires write permission to manage add users, modify users, and perform search operations on the user store.
				</td>
			</tr>
			<tr>
				<td>
					<code>password</code>
				</td>
				<td>
					Password for the connection username.
				</td>
			</tr>
			<tr>
				<td>
					<code>driver</code>
				</td>
				<td>
					The driver class specific to the JDBC user store.
				</td>
			</tr>
		</table>
		
		See the complete list of [database connection parameters]({{base_path}}/reference/config-catalog-mi/#database-connection) and their descriptions. Also, see the recommendations for [tuning the JDBC connection pool]({{base_path}}/install-and-setup/setup/performance-tuning/jdbc-tuning).
	
		The datasource configured under the `[[datasource]]` TOML heading will now be the effective user store for the Micro Integrator. 

## What's next?

For instructions on adding, deleting, or viewing users in the user store, see [Managing Users]({{base_path}}/install-and-setup/setup/user-stores/managing-users#manage-users-and-roles-from-the-cli).
