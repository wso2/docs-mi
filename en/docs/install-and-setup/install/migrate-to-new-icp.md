# Migrate from ICP 1.x to the New ICP

This guide is for teams running the legacy WSO2 Integration Control Plane 1.x (the dashboard server on port `9743`) who are moving to the new Ballerina-based Integration Control Plane. It walks through installing the new server, copying users out of an existing JDBC user store with the bundled SQL scripts, and re-pointing each WSO2 Integrator: MI runtime at the new control plane.

The two systems are independent — you can run them side by side during the transition and only decommission the old one once everything is verified.

This guide assumes a JDBC user store on MySQL or MSSQL — the path covered by the bundled migration SQL scripts. LDAP and SSO setups do not need data migration; you re-point them at the new ICP using the keys documented in the new ICP authentication configuration.

## Before you begin

- **Java 21** installed on the target host.
- A backup of the old ICP `userdb` (or whatever name your JDBC user store uses).
- A copy of `<OLD_ICP_HOME>/conf/deployment.toml` so you can read off the old `[user_store]` driver, URL, and credentials.
- The list of MI runtimes currently pointing at the old dashboard URL — every one needs its `deployment.toml` updated.
- The hashing algorithm the old ICP was using (`PasswordDigest` in `user-mgt.xml`, default `SHA-256`).
- Network access to port **`9445`** opened from each MI host to the new ICP host. (Port `9446` is the console; `9445` is the new heartbeat endpoint.)

## Step 1 - Install the new ICP

Download and install the new ICP server using the manual installation steps from the new ICP documentation. For this migration, install it side by side with the old one so you can roll back if needed.

When you reach the database configuration step:

- Configure `[icp_server.storage]` to point at a **new** main database (this stores projects, environments, and integration metadata — none of which existed in 1.x). Run the matching `<engine>_init.sql` from the `dbscripts/` directory in the distribution.
- Configure the `credentialsDb*` keys to point at a **new** credentials database. **Do not reuse the old `userdb`** — the schema is different, and the migration scripts in step 2 need the new schema initialized first.

Both new databases can live on the same database server as the old `userdb`. The migration scripts in step 2 require it — they use cross-database references to read from the old schema and write to the two new ones in a single session.

Start the new ICP, sign in once with the seed `admin` / `admin` to confirm it is healthy, then **stop** the new ICP server before running the migration script. The migration in step 2 writes directly to the credentials database — ICP must not be running while it executes, and its password-hashing setting must be configured before it starts again.

## Step 2 - Migrate users from the old JDBC user store

[Download]({{base_path}}/assets/attachments/migration/integration-control-plane/icp-1x-to-2x-migration-scripts.zip) the migration scripts. The archive contains:

- `v1_to_v2_mysql.sql` — for MySQL / MariaDB
- `v1_to_v2_mssql.sql` — for Microsoft SQL Server
- `README.md` — quick reference

The scripts copy user identities, password hashes and salts, display names, and role assignments from the old `userdb` into the new main and credentials databases.

### Prerequisites

- The new ICP main DB and credentials DB must already be initialized (step 1).
- The database user running the script needs `SELECT` on the old database and `INSERT` / `UPDATE` / `DELETE` on the two new databases.
- All three databases must live on the same database server instance.

### Edit the configuration

Open the script for your engine and edit the variables at the top.

=== "MySQL"
    ```sql
    SET @old_db          = 'userdb';    -- Old ICP 1.x database name
    SET @new_main_db     = 'icp_db';    -- New ICP main database name
    SET @new_creds_db    = 'icp_creds'; -- New ICP credentials database name
    SET @reset_passwords = FALSE;       -- TRUE forces a password change on first login
    ```

=== "MSSQL"
    ```sql
    DECLARE @old_db          NVARCHAR(128) = N'userdb';    -- Old ICP 1.x database name
    DECLARE @new_main_db     NVARCHAR(128) = N'icp_db';    -- New ICP main database name
    DECLARE @new_creds_db    NVARCHAR(128) = N'icp_creds'; -- New ICP credentials database name
    DECLARE @reset_passwords BIT           = 0;            -- 1 forces a password change on first login
    ```

### Run the script

=== "MySQL"
    ```bash
    mysql -u <admin_user> -p < v1_to_v2_mysql.sql 2>&1 | tee migration.log
    ```

=== "MSSQL"
    ```bash
    sqlcmd -S <server> -U <user> -P <password> -i v1_to_v2_mssql.sql
    ```

The script prints a status line after each step and a summary table at the end showing how many users were inserted, merged, or replaced.

### Match the password hashing algorithm

The script copies password hashes and salts as-is. For any user to be able to log in after migration, the new ICP must hash the password they enter using the **same algorithm** the old ICP used — including the seed `admin` account, whose default bcrypt hash gets overwritten by the migration.

!!! warning
    Configure this setting **before** starting the new ICP for the first time after migration. ICP only verifies a password against the stored hash at login time; if the configured algorithm does not match the algorithm the stored hash was produced with, every login attempt fails — there is no in-place rehash on first login.

With ICP stopped, set `passwordHashingAlgorithm` in `<ICP_HOME>/conf/deployment.toml` to match the old `PasswordDigest`:

| Old `PasswordDigest` | New `passwordHashingAlgorithm` |
| --- | --- |
| `SHA-256` *(default)* | `sha-256` |
| `SHA-1` / `SHA` | `sha-1` |
| `SHA-384` | `sha-384` |
| `SHA-512` | `sha-512` |
| `MD5` | `md5` |
| *(null / `PLAIN_TEXT`)* | `plain_text` |

Then start the new ICP.

### What is and isn't migrated

| Data | Source (1.x) | Destination (new) |
| --- | --- | --- |
| User identity | `UM_USER` | `users` (main DB) |
| Display name | `UM_USER_ATTRIBUTE` (`displayName` claim) | `users.display_name` |
| Password hash + salt | `UM_USER` | `user_credentials` (credentials DB) |
| Role → group assignment | `UM_USER_ROLE` + `UM_HYBRID_USER_ROLE` | `group_user_mapping` (main DB) |

Not migrated: refresh tokens, OIDC sessions, audit logs, custom user attributes beyond display name, and project/environment data (which has no equivalent in 1.x).

### Conflict rules

The new ICP init scripts seed a default `admin` user. When the migration script encounters a username that already exists in the new database it applies these rules:

| Existing username in new DB | Action |
| --- | --- |
| `admin` | **Merge** — keep the new UUID and group membership; overwrite the password hash and salt with the values from the old system. |
| any other username | **Replace** — delete the pre-existing new user (and their group mappings) and insert the old system's version with its original UUID. |

In other words, any account pre-created in the new ICP before migration (other than the seed `admin`) will be overwritten.

### Roles → groups mapping

ICP 1.x used flat WSO2 roles. The new ICP uses group-based RBAC. The script applies a simple two-bucket mapping:

| Old role | New group |
| --- | --- |
| `admin` / `Internal/admin` | Super Admins |
| any other role (or no role) | Developers |

Users assigned to **Super Admins** also get `is_super_admin = TRUE`.

This is intentionally coarse. After migration, plan to re-establish fine-grained access using the new RBAC model — see step 4.

## Step 3 - Sign in and verify users

Open `https://<icp-host>:9446/login` and sign in with one of the migrated accounts. If the password hash algorithm is set correctly in `deployment.toml`, login succeeds. If you see an authentication failure for a user you know has the right password, the most common cause is a hashing algorithm mismatch — stop ICP, re-check the table above, correct `passwordHashingAlgorithm`, and start ICP again.

## Step 4 - Recreate organizational structure

ICP 1.x had no concept of projects, environments, or components — every MI node was a flat entry grouped by `group_id`. The new ICP requires this structure to exist before an MI runtime can be registered.

Sign in as a Super Admin and:

1. Decide what your old `group_id` values map to. Each `group_id` is typically a candidate for a **Project**, with each MI node a separate **Component** (or **Runtime** within one component if you ran a cluster).
2. The new ICP ships with the **Default Organization**, two environments (**dev** and **prod**), and a default `<Project> Admins` group per project. Create additional environments if you used more than dev/prod in 1.x.
3. Create the projects and components in the new ICP console.

Then redo access control. The migration script bucketed everyone into **Super Admins** or **Developers**; you almost certainly want project-scoped or environment-scoped mappings instead.

## Step 5 - Re-register each MI runtime

The MI-side configuration changes from `[dashboard_config]` (with a `dashboard_url`) to `[icp_config]` (with a `secret` generated per component in the new console).

For each MI instance:

1. In the new ICP console, generate a secret at the org or component level.
2. In `<MI_HOME>/conf/deployment.toml`, **remove** the old `[dashboard_config]` block and **add** the `[icp_config]` block from the secret-generation dialog.
3. Restart MI.

A typical before/after looks like:

```toml
# Old - remove
[dashboard_config]
dashboard_url = "https://<old-icp-host>:9743/dashboard/api/"
heartbeat_interval = 5
group_id = "mi_dev"
node_id = "dev_node_2"

# New - add
[icp_config]
enabled     = true
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime     = "dev_node_2"
secret      = "<generated secret>"
icp_url     = "https://<new-icp-host>:9445"
```

!!! note
    Runtime heartbeats now go to **`9445`**, not `9743`. Confirm the runtime appears under **Runtimes** in the console with status **RUNNING** before moving to the next instance.

## Step 6 - Decommission the old ICP

Once every MI runtime has been re-registered against the new ICP and is reporting heartbeats:

1. Stop the old ICP server (`Ctrl+C` on the dashboard process or the service shutdown command).
2. Archive `<OLD_ICP_HOME>/conf/deployment.toml` and the `userdb` dump alongside this migration's `migration.log`.
3. Optionally drop the old `userdb` once you are satisfied no rollback is needed. The new ICP does not read it.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Migrated users (or the seed `admin`) cannot log in | `passwordHashingAlgorithm` in `deployment.toml` does not match the old `PasswordDigest` | Stop ICP, set it to the matching value from the table above, then start ICP |
| A user I pre-created in the new ICP is gone | Replace rule — the migration overwrites all non-`admin` usernames that collide with old-system entries | Recreate the user in the new ICP after migration, or rename it before re-running |
| MI runtime does not appear in the console | Wrong `environment` handle (display name used instead of handle) | Use the handle (e.g. `dev`), not the display name |
| MI runtime does not appear in the console | Secret copied incorrectly | Confirm both the key ID and key material are present, separated by a dot |
| MI logs show SSL errors connecting to ICP | Self-signed ICP certificate | Set `ssl_verify = false` for development, or add the ICP cert to MI's truststore for production |
| All users landed in **Developers**, including former admins | The old role was not literally `admin` or `Internal/admin` | Manually add those users to **Super Admins** in the new console |
