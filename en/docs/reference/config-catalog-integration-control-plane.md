# Integration Control Plane Configuration Catalog

All the server-level configurations of your Integration Control Plane can be applied using a single configuration file, which is the `deployment.toml` file (stored in the `ICP_HOME/conf` directory).

## Server Settings

| Key                                  | Type      | Default     | Description                                                           |
| ------------------------------------ | --------- | ----------- | --------------------------------------------------------------------- |
| `serverPort`                         | `int`     | `9446`      | HTTPS port for all ICP endpoints                                      |
| `serverHost`                         | `string`  | `"0.0.0.0"` | Bind address                                                          |
| `logLevel`                           | `string`  | `"INFO"`    | Log verbosity — `DEBUG`, `INFO`, `WARN`, `ERROR`                      |
| `enableAuditLogging`                 | `boolean` | `true`      | Enable audit log for authentication and management events             |
| `enableMetrics`                      | `boolean` | `true`      | Expose Prometheus metrics endpoint                                    |
| `schedulerIntervalSeconds`           | `int`     | `30`        | Interval (seconds) between health-check polling of connected runtimes |
| `refreshTokenCleanupIntervalSeconds` | `int`     | `86400`     | How often expired refresh tokens are purged from the database         |

## Authentication Settings

| Key                          | Type      | Default                    | Description                                                       |
| ---------------------------- | --------- | -------------------------- | ----------------------------------------------------------------- |
| `authBackendUrl`             | `string`  | `"https://localhost:9447"` | URL of the authentication backend service                         |
| `frontendJwtHMACSecret`      | `string`  | —                          | HMAC-SHA256 secret for signing JWT tokens (minimum 32 characters) |
| `defaultTokenExpiryTime`     | `int`     | `3600`                     | JWT access token lifetime in seconds                              |
| `refreshTokenExpiryTime`     | `int`     | `604800`                   | Refresh token lifetime in seconds (default: 7 days)               |
| `enableRefreshTokenRotation` | `boolean` | `true`                     | Rotate refresh token on each use                                  |
| `maxRefreshTokensPerUser`    | `int`     | `0`                        | Maximum active refresh tokens per user (`0` = unlimited)          |

## Database Configurations

### Main Database

Configure the main database in the `[icp_server.storage]` section of `<ICP_HOME>/conf/deployment.toml`.

| Key        | Description                                               |
| ---------- | --------------------------------------------------------- |
| `dbType`   | Database engine — `mysql`, `postgresql`, `mssql`, or `h2` |
| `host`     | Database server hostname (not used for H2)                |
| `port`     | Database server port (not used for H2)                    |
| `name`     | Database/schema name                                      |
| `username` | Database user                                             |
| `password` | Database password                                         |

#### MySQL

```toml
[icp_server.storage]
dbType = "mysql"
host = "localhost"
port = 3306
name = "icp_db"
username = "<DB_USER>"
password = "<DB_PASSWORD>"
```

#### PostgreSQL

```toml
[icp_server.storage]
dbType = "postgresql"
host = "localhost"
port = 5432
name = "icp_db"
username = "<DB_USER>"
password = "<DB_PASSWORD>"
```

#### Microsoft SQL Server

```toml
[icp_server.storage]
dbType = "mssql"
host = "localhost"
port = 1433
name = "icp_db"
username = "<DB_USER>"
password = "<DB_PASSWORD>"
```

#### H2 (In-Memory)

```toml
[icp_server.storage]
dbType = "h2"
```

H2 is suitable for development and testing only.

### Credentials Database

The default authentication backend stores user credentials in a separate database or schema. These are flat top-level keys in `deployment.toml` (not under any table header).

```toml
credentialsDbType = "postgresql"   # h2, postgresql, mysql, or mssql
credentialsDbHost = "localhost"
credentialsDbPort = 5432
credentialsDbName = "credentialsdb"
credentialsDbUser = "icp_user"
credentialsDbPassword = "icp_password"
```

| Key                     | Type     | Default           | Description                             |
| ----------------------- | -------- | ----------------- | --------------------------------------- |
| `credentialsDbType`     | `string` | `"h2"`            | `h2`, `postgresql`, `mysql`, or `mssql` |
| `credentialsDbHost`     | `string` | `"localhost"`     | Not used for H2                         |
| `credentialsDbPort`     | `int`    | `5432`            | Not used for H2                         |
| `credentialsDbName`     | `string` | `"credentialsdb"` | Database/schema name                    |
| `credentialsDbUser`     | `string` | `"icp_user"`      | Database user                           |
| `credentialsDbPassword` | `string` | —                 | Database password                       |

For PostgreSQL, credentials are stored in a `credentials` schema within the same database. For H2, they are stored in `<ICP_HOME>/bin/database/credentials`.
