# Configure a User Store in WSO2 Integration Control Plane

## Authentication Backends

| Mode                   | Description                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Default User Store** | Built-in user management with JWT tokens. Credentials stored in the credentials database.                   |
| **LDAP**               | Enterprise directory integration (Active Directory or OpenLDAP). Enable with `ldapUserStoreEnabled = true`. |
| **SSO / OIDC**         | External identity provider via OpenID Connect.                                                              |
| **Custom Backend**     | Implement a custom HTTP-based auth backend pointed to by `authBackendUrl`.                                  |

## LDAP Configuration

Set `ldapUserStoreEnabled = true` to activate. Most LDAP keys have sensible defaults, but the following keys have no default (marked **—** in the tables) and **must** be provided for a functional LDAP setup:

- `ldapConnectionName` — bind DN used to connect to the LDAP server
- `ldapConnectionPassword` — password for the bind DN
- `ldapUserSearchBase` — base DN under which users are searched

All remaining keys are optional.

### Connection

| Key                      | Type      | Default       | Description                                    |
| ------------------------ | --------- | ------------- | ---------------------------------------------- |
| `ldapUserStoreEnabled`   | `boolean` | `false`       | Activate LDAP user store                       |
| `ldapHostName`           | `string`  | `"localhost"` | LDAP server hostname                           |
| `ldapPort`               | `int`     | `10389`       | LDAP port (`636` for LDAPS)                    |
| `ldapConnectionName`     | `string`  | —             | Bind DN, e.g. `"uid=admin,ou=system"`          |
| `ldapConnectionPassword` | `string`  | —             | Bind DN password                               |
| `ldapSslEnabled`         | `boolean` | `false`       | Enable TLS (LDAPS)                             |
| `ldapTrustStorePath`     | `string`  | —             | Path to JKS truststore for LDAP CA certificate |
| `ldapTrustStorePassword` | `string`  | —             | Truststore password                            |

### User Search

| Key                        | Type     | Default                            | Description                                                                      |
| -------------------------- | -------- | ---------------------------------- | -------------------------------------------------------------------------------- |
| `ldapUserSearchBase`       | `string` | —                                  | Base DN for user search, e.g. `"ou=Users,dc=wso2,dc=org"`                        |
| `ldapUserNameAttribute`    | `string` | `"uid"`                            | User attribute for login (`"sAMAccountName"` for Active Directory)               |
| `ldapUserSearchFilter`     | `string` | `"(&(objectClass=person)(uid=?))"` | Search filter; `?` is replaced with the username                                 |
| `ldapUserDNPattern`        | `string` | `""`                               | Construct DN directly without a search, e.g. `"uid={0},ou=Users,dc=wso2,dc=org"` |
| `ldapDisplayNameAttribute` | `string` | `""`                               | LDAP attribute used as the display name; empty = username                        |

### Group / Role Lookup

| Key                       | Type       | Default                        | Description                                                             |
| ------------------------- | ---------- | ------------------------------ | ----------------------------------------------------------------------- |
| `ldapReadGroups`          | `boolean`  | `true`                         | Enable group lookup                                                     |
| `ldapMemberOfAttribute`   | `string`   | `""`                           | Active Directory `memberOf` attribute (takes precedence when set)       |
| `ldapGroupNameAttribute`  | `string`   | `"cn"`                         | Attribute holding the group name                                        |
| `ldapGroupSearchBase`     | `string`   | —                              | Base DN for group search (used when `ldapMemberOfAttribute` is empty)   |
| `ldapGroupSearchFilter`   | `string`   | `"(objectClass=groupOfNames)"` | Group search filter                                                     |
| `ldapMembershipAttribute` | `string`   | `"member"`                     | Membership attribute (`"uniqueMember"` or `"memberUid"` for posixGroup) |
| `ldapAdminRoles`          | `string[]` | `["admin"]`                    | LDAP groups whose members are granted ICP super-admin on first login    |
