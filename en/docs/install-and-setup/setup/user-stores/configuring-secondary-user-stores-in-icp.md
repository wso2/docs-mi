# Configure a Secondary User Store in ICP

The WSO2 Integration Control Plane (ICP) supports multiple secondary user stores alongside the primary user store. Users from secondary stores can authenticate using `username` (fallthrough) or `DOMAIN/username` (explicit domain).

!!! note
    Users from secondary user stores have non-admin (read-only) permissions in the ICP.

## Adding a secondary user store

Add one `[[secondary_user_store]]` block per store to the `<ICP_HOME>/conf/deployment.toml` file.

The `domain_name` is a label you choose for the store. Users from that store must log in as `<domain_name>/<username>` (e.g., `LDAP_STORE/john`).

=== "Read-Only LDAP"
    ```toml
    [[secondary_user_store]]
    class = "org.wso2.dashboard.security.user.core.ldap.ReadOnlyLDAPUserStoreManager"
    domain_name = "LDAP"
    connection_url = "ldap://localhost:389"
    connection_name = "uid=admin,ou=system"
    connection_password = "admin"
    user_search_base = "ou=Users,dc=wso2,dc=org"
    user_name_attribute = "uid"
    user_name_search_filter = "(&amp;(objectClass=person)(uid=?))"
    user_name_list_filter = "(objectClass=person)"
    read_groups = true
    group_search_base = "ou=Groups,dc=wso2,dc=org"
    group_name_attribute = "cn"
    group_name_search_filter = "(&amp;(objectClass=groupOfNames)(cn=?))"
    group_name_list_filter = "(objectClass=groupOfNames)"
    membership_attribute = "member"
    ```
=== "Read-Write LDAP"
    ```toml
    [[secondary_user_store]]
    class = "org.wso2.dashboard.security.user.core.ldap.ReadWriteLDAPUserStoreManager"
    domain_name = "LDAP_RW"
    connection_url = "ldap://localhost:389"
    connection_name = "uid=admin,ou=system"
    connection_password = "admin"
    user_search_base = "ou=Users,dc=wso2,dc=org"
    user_name_attribute = "uid"
    user_name_search_filter = "(&amp;(objectClass=inetOrgPerson)(uid=?))"
    user_name_list_filter = "(objectClass=inetOrgPerson)"
    user_entry_object_class = "inetOrgPerson"
    write_groups = true
    group_search_base = "ou=Groups,dc=wso2,dc=org"
    group_name_attribute = "cn"
    group_name_search_filter = "(&amp;(objectClass=groupOfNames)(cn=?))"
    group_name_list_filter = "(objectClass=groupOfNames)"
    group_entry_object_class = "groupOfNames"
    membership_attribute = "member"
    empty_roles_allowed = false
    ```
=== "MySQL"
    ```toml
    [[secondary_user_store]]
    class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
    domain_name = "MYSQL"
    url = "jdbc:mysql://localhost:3306/um_db?useSSL=false&serverTimezone=UTC"
    username = "root"
    password = "root"
    driver_name = "com.mysql.cj.jdbc.Driver"
    max_active = 50
    max_wait = 60000
    read_groups = true
    ```
=== "MSSQL"
    ```toml
    [[secondary_user_store]]
    class = "org.wso2.dashboard.security.user.core.jdbc.JDBCUserStoreManager"
    domain_name = "MSSQL"
    url = "jdbc:sqlserver://localhost:1433;databaseName=um_db;encrypt=false"
    username = "sa"
    password = "Password1234"
    driver_name = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    max_active = 50
    max_wait = 60000
    read_groups = true
    ```

You can add multiple `[[secondary_user_store]]` blocks to configure more than one secondary user store.
