# Integration Control Plane Configuration Catalog

All the server-level configurations of your Integration Control Plane can be applied using a single configuration file:
* **ICP 2.0.0**: The `deployment.toml` file (stored in the `ICP_HOME/conf` directory).
* **ICP 1.2.0**: The `Config.toml` file (stored in the `ICP_HOME/conf` directory).

## Server Settings

| Key                                  | Type      | Default     | Description                                                           |
| ------------------------------------ | --------- | ----------- | --------------------------------------------------------------------- |
| `serverPort`                         | `int`     | `9446`      | HTTPS port for all ICP endpoints                                      |
| `serverHost`                         | `string`  | `"0.0.0.0"` | Bind address                                                          |
| `runtimeListenerPort`                | `int`     | `9445`      | Port for runtime communication listener                               |
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

Configure the main database in the `[icp_server.storage]` section of the configuration file:
* **ICP 2.0.0**: `<ICP_HOME>/conf/deployment.toml`
* **ICP 1.2.0**: `<ICP_HOME>/conf/Config.toml`

| Key          | Description                                               |
| ------------ | --------------------------------------------------------- |
| `dbType`     | Database engine — `mysql`, `postgresql`, `mssql`, or `h2` |
| `dbHost`     | Database server hostname (not used for H2)                |
| `dbPort`     | Database server port (not used for H2)                    |
| `dbName`     | Database/schema name                                      |
| `dbUser`     | Database user                                             |
| `dbPassword` | Database password                                         |

#### MySQL

```toml
[icp_server.storage]
dbType = "mysql"
dbHost = "localhost"
dbPort = 3306
dbName = "icp_db"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
```

#### PostgreSQL

```toml
[icp_server.storage]
dbType = "postgresql"
dbHost = "localhost"
dbPort = 5432
dbName = "icp_db"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
```

#### Microsoft SQL Server

```toml
[icp_server.storage]
dbType = "mssql"
dbHost = "localhost"
dbPort = 1433
dbName = "icp_db"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
```

#### H2 (In-Memory)

```toml
[icp_server.storage]
dbType = "h2"
```

H2 is suitable for development and testing only.

### Credentials Database

The default authentication backend stores user credentials in a separate database or schema. These are flat top-level keys configured in:
* **ICP 2.0.0**: `deployment.toml` (not under any table header)
* **ICP 1.2.0**: `Config.toml` (not under any table header)

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

 Credentials are stored in a dedicated credentials database separate from the main ICP database, configured via `credentialsDbName`, `credentialsDbHost`, and `credentialsDbPort`. For H2, they are stored in:
 * **ICP 2.0.0**: `<ICP_HOME>/bin/database/credentials`
 * **ICP 1.2.0**: `<ICP_HOME>/database/credentials`

## SSO Configurations

Configure Single Sign-On (SSO) using the `[sso]` section of:
* **ICP 2.0.0**: `<ICP_HOME>/conf/deployment.toml`
* **ICP 1.2.0**: `<ICP_HOME>/conf/Config.toml`

```toml
[sso]
enable = true
client_id = "<CLIENT_ID>"
client_secret = "<CLIENT_SECRET>"
base_url = "https://<IDP_HOST>:<IDP_PORT>"
jwt_issuer = "https://<IDP_HOST>:<IDP_PORT>/oauth2/token"
additional_trusted_audience = ["<AUDIENCE>"]
jwks_algorithm = "RS256"
well_known_endpoint = "https://<IDP_HOST>:<IDP_PORT>/oauth2/token/.well-known/openid-configuration"
jwks_endpoint = "https://<IDP_HOST>:<IDP_PORT>/oauth2/jwks"
introspection_endpoint = "https://<IDP_HOST>:<IDP_PORT>/oauth2/introspect"
user_info_endpoint = "https://<IDP_HOST>:<IDP_PORT>/oauth2/userinfo"
resource_server_URLs = ["https://<ICP_HOST>:<ICP_PORT>"]
sign_in_redirect_URL = "https://<ICP_HOST>:<ICP_PORT>/sso"
admin_group_attribute = "groups"
admin_groups = ["admin"]
storage = "webWorker"

[[sso.authorization_request.params]]
key = "app_id"
value = "<APP_ID>"
```

| Key                              | Type            | Default                                                    | Description                                                                                   |
| -------------------------------- | --------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `enable`                         | `boolean`       | `false`                                                    | Enable SSO for the ICP console                                                                |
| `client_id`                      | `string`        | —                                                          | OAuth 2.0 client ID registered in the identity provider                                       |
| `client_secret`                  | `string`        | —                                                          | OAuth 2.0 client secret registered in the identity provider                                   |
| `base_url`                       | `string`        | —                                                          | Base URL of the identity provider (e.g., WSO2 Identity Server)                                |
| `jwt_issuer`                     | `string`        | —                                                          | Expected `iss` claim in the JWT — typically the token endpoint of the identity provider       |
| `additional_trusted_audience`    | `string array`  | —                                                          | Additional audiences trusted for JWT validation besides the default                           |
| `jwks_algorithm`                 | `string`        | —                                                          | Algorithm used to verify the JWT signature (e.g., `RS256`)                                   |
| `well_known_endpoint`            | `string`        | `<base_url>/oauth2/token/.well-known/openid-configuration` | OpenID Connect discovery endpoint for auto-configuring identity provider metadata             |
| `jwks_endpoint`                  | `string`        | —                                                          | JWKS endpoint for fetching public keys to verify JWT signatures                               |
| `introspection_endpoint`         | `string`        | —                                                          | Token introspection endpoint                                                                  |
| `user_info_endpoint`             | `string`        | —                                                          | UserInfo endpoint for retrieving claims about the authenticated user                          |
| `resource_server_URLs`           | `string array`  | —                                                          | List of ICP resource server URLs that accept the SSO token                                    |
| `sign_in_redirect_URL`           | `string`        | —                                                          | Callback URL to redirect after a successful sign-in                                           |
| `admin_group_attribute`          | `string`        | `"groups"`                                                 | JWT claim name that carries group membership information                                      |
| `admin_groups`                   | `string array`  | —                                                          | Groups whose members are granted admin privileges in the ICP console                          |
| `storage`                        | `string`        | `"webWorker"`                                              | Browser storage for the SSO session — `webWorker`, `sessionStorage`, or `localStorage`       |

### Additional Authorization Request Parameters

Use `[[sso.authorization_request.params]]` to append extra query parameters to the authorization request sent to the identity provider.

| Key     | Type     | Description                                         |
| ------- | -------- | --------------------------------------------------- |
| `key`   | `string` | Query parameter name to append to the auth request  |
| `value` | `string` | Value for the query parameter                       |
