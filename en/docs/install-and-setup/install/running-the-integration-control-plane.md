# Running the Integration Control Plane

Follow the steps given below to run the Integration Control Plane.

## Configure the Integration Control Plane

All configuration lives in `conf/deployment.toml`. The defaults work
out of the box for local evaluation. ICP will start with the embedded H2
database, listen on `https://localhost:9446`, and create an `admin` user.

### Essential Settings

| Setting                  | Default                  | Description                              |
| ------------------------ | ------------------------ | ---------------------------------------- |
| `serverPort`             | `9446`                   | HTTPS port for the console and API       |
| `runtimeListenerPort`    | `9445`                   | HTTPS port for runtime heartbeat connections |
| `serverHost`             | `0.0.0.0`                | Bind address                             |
| `logLevel`               | `INFO`                   | `DEBUG`, `INFO`, `WARN`, or `ERROR`      |
| `frontendJwtHMACSecret`  | (default key)            | JWT signing secret — change in production |

### Database Settings

By default ICP uses an embedded H2 database stored in `bin/database/`. For
production, switch to PostgreSQL, MySQL, or MSSQL by uncommenting and editing
the `[icp_server.storage]` section in `deployment.toml`:

```toml
[icp_server.storage]
dbType   = "postgresql"
dbHost   = "db.example.com"
dbPort   = 5432
dbName   = "icp_database"
dbUser   = "icp_user"
dbPassword = "changeme"
```

A separate credentials database stores user passwords. Configure it with the
`credentialsDb*` settings if you want credential storage on the same external
database:

```toml
credentialsDbType     = "postgresql"
credentialsDbHost     = "db.example.com"
credentialsDbPort     = 5432
credentialsDbName     = "credentialsdb"
credentialsDbUser     = "icp_user"
credentialsDbPassword = "changeme"
```

When using H2 (the default), no database configuration is needed.

### Observability Settings (OpenSearch)

To enable centralized logs and metrics, point ICP at an OpenSearch instance.
Add these keys **before the first `[section]` header** in `deployment.toml`:

```toml
opensearchUrl = "https://localhost:9200"
opensearchUsername = "admin"
opensearchPassword = "<your-opensearch-password>"
```

If OpenSearch runs without TLS, use `http://`. Skip this section if you don't
need observability yet.

### Reverse Proxy Settings

ICP serves the console and API on port `9446` by default. To expose ICP through a reverse proxy:

1. Point the proxy at `https://<icp-host>:9446` (the backend is HTTPS with a
   self-signed certificate, so configure the proxy to trust it or skip
   verification for the upstream).

2. Tell ICP the external URL so the console can reach the API. Add these to
   `deployment.toml`:

   ```toml
   backendGraphqlEndpoint      = "https://icp.example.com/graphql"
   backendAuthBaseUrl           = "https://icp.example.com/auth"
   backendObservabilityEndpoint = "https://icp.example.com/icp/observability"
   ```

3. MI runtimes connect to ICP for heartbeats. If they also go through the
   proxy, set `icp_url` in the runtime's `deployment.toml` to the proxy URL:

   ```toml
   [icp_config]
   icp_url = "https://icp.example.com"
   ```

   If runtimes connect directly (bypassing the proxy), leave `icp_url`
   pointing at the ICP host.

## Start the Integration Control Plane

Linux / macOS:

```bash
./bin/icp.sh
```

Windows:

```bat
bin\icp.bat
```

The server logs its startup to the console. Once you see the listener ready
message, ICP is available at `https://localhost:9446`.

**Note:** ICP ships with a self-signed certificate. Your browser will show a
security warning on first visit — accept it to proceed.

## Sign In to the Integration Control Plane

Navigate to `https://<host>:9446/login`. Enter username `admin` and password
`admin`, then click **Sign In**.

After login the browser redirects to the organization home at
`https://<host>:9446/organizations/default`.

**Warning:** Change the default admin password immediately via **Access-control**
> **Users** > **Reset Password**.

## Stop the Integration Control Plane

To <b>stop</b> the ICP standalone application, go to the terminal and press <i>Ctrl+C</i>.

## Default Setting of the Integration Control Plane

ICP ships with these resources out of the box:

<table>
  <thead>
    <tr>
      <th>Resource</th>
      <th>Defaults</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Organization</td>
      <td><strong>Default Organization</strong> (<code>default</code>)</td>
    </tr>
    <tr>
      <td>Environments</td>
      <td><strong>dev</strong> (Non-Critical), <strong>prod</strong> (Critical)</td>
    </tr>
    <tr>
      <td>Roles</td>
      <td>Admin, Developer, Project Admin, Super Admin, Viewer</td>
    </tr>
    <tr>
      <td>Groups</td>
      <td>Super Admins, Administrators, Developers</td>
    </tr>
    <tr>
      <td>User</td>
      <td><code>admin</code> / <code>admin</code> (member of Super Admins)</td>
    </tr>
  </tbody>
</table>

When a project is created, ICP also auto-creates a
`<Project Name> Admins` group with the *Project Admin* role.

## What's next?

-   [Connecting an Integration in MI to ICP]({{base_path}}/install-and-setup/install/connecting-an-integration-to-icp).