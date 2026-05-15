# Built-in User Store

The built-in user store keeps user credentials — password hashes, salts, and per-user attributes such as failed-login counters — in a dedicated **credentials database**, separate from the main ICP database that holds projects, environments, and integration metadata.

By default both databases use the embedded H2 engine, writing to `<ICP_HOME>/bin/database/`. For production, switch the credentials database to PostgreSQL, MySQL, or MSSQL.


## Default Setup (H2)

No configuration is needed. ICP creates the H2 credentials database automatically on first start, initializes the schema, and seeds an `admin` user with password `admin`.

!!! warning
    H2 is for evaluation and development only. For production deployments, use PostgreSQL, MySQL, or MSSQL.


!!! warning
    The default `admin` / `admin` credentials are publicly known. Change the password immediately after first login via **Profile** > **Change Password**.

## Connect an External Database

### Step 1 — Create the database and user

Create a dedicated database and user on the database server. The user needs `CREATE`, `INSERT`, `UPDATE`, `DELETE`, and `SELECT` privileges on the credentials database.

### Step 2 — Initialize the schema

Run the appropriate init script to create the `user_credentials` and `user_attributes` tables and seed the default `admin` user. The scripts are included in the ICP distribution:

<table>
  <thead>
    <tr>
      <th>Database</th>
      <th>Init script</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PostgreSQL</td>
      <td><code>db-scripts/credentials_postgresql_init.sql</code></td>
    </tr>
    <tr>
      <td>MySQL</td>
      <td><code>db-scripts/credentials_mysql_init.sql</code></td>
    </tr>
    <tr>
      <td>MSSQL</td>
      <td><code>db-scripts/credentials_mssql_init.sql</code></td>
    </tr>
  </tbody>
</table>

Example for PostgreSQL:

```bash
psql -h <host> -U <admin_user> -d <credentials_db> \
  -f db-scripts/credentials_postgresql_init.sql
```

The init script seeds the `admin` user with a bcrypt hash of the default password `admin`.

!!! warning
    The default `admin` / `admin` credentials are publicly known. Change the password immediately after first login via **Profile** > **Change Password**.

### Step 3 — Configure deployment.toml

Add the `credentialsDb*` keys as **top-level entries** in `<ICP_HOME>/conf/deployment.toml`, before any `[section]` header:

```toml
credentialsDbType     = "postgresql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 5432
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

!!! Note
    These keys must be top-level entries, **not** inside the `[icp_server.storage]` section. The `[icp_server.storage]` section controls the main ICP database (projects, environments, etc.), which is configured independently.


<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>credentialsDbType</code></td>
      <td><code>h2</code></td>
      <td>Database engine: <code>h2</code>, <code>postgresql</code>, <code>mysql</code>, or <code>mssql</code></td>
    </tr>
    <tr>
      <td><code>credentialsDbHost</code></td>
      <td><code>localhost</code></td>
      <td>Database server hostname (not used for H2)</td>
    </tr>
    <tr>
      <td><code>credentialsDbPort</code></td>
      <td>Varies by database type (see below)</td>
      <td>Database port (not used for H2)</td>
    </tr>
    <tr>
      <td><code>credentialsDbName</code></td>
      <td><code>credentials_db</code></td>
      <td>Name of the credentials database</td>
    </tr>
    <tr>
      <td><code>credentialsDbUser</code></td>
      <td><code>icp_user</code></td>
      <td>Database user</td>
    </tr>
    <tr>
      <td><code>credentialsDbPassword</code></td>
      <td><code>icp_password</code></td>
      <td>Database password — <strong>must be changed in production</strong></td>
    </tr>
  </tbody>
</table>

Default ports: PostgreSQL `5432`, MySQL `3306`, MSSQL `1433`.

#### Database-specific examples

**MySQL**

```toml
credentialsDbType     = "mysql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 3306
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

**Microsoft SQL Server**

```toml
credentialsDbType     = "mssql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 1433
credentialsDbName     = "credentials_db"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```
