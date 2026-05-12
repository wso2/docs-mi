# LDAP User Store

ICP can authenticate users against an external LDAP directory instead of the built-in credentials database. The LDAP adapter supports standard LDAP servers (OpenLDAP, 389 Directory Server, etc.) and Active Directory.

!!! Prerequisites
    - The LDAP server is reachable from the host running ICP.
    - A service account (bind DN + password) with read access to user and group entries exists, **or** your LDAP server allows anonymous bind.
    - You know the base DN under which users are stored (e.g. `ou=Users,dc=wso2,dc=org`).


## Configuration

All LDAP settings are top-level keys in `conf/deployment.toml`. Only `ldapUserStoreEnabled = true` is strictly required to activate the adapter; all other keys have defaults.

### Activate the adapter

```toml
ldapUserStoreEnabled = true
```

### Server connection

```toml
ldapHostName = "ldap.example.com"   # default: localhost
ldapPort     = 10389                # default: 10389; use 636 for LDAPS

# Service-account credentials used to search the directory.
# Omit (leave empty) for anonymous bind.
ldapConnectionName     = "uid=admin,ou=system"
ldapConnectionPassword = "secret"
```

### User search

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
      <td><code>ldapUserSearchBase</code></td>
      <td><code>ou=Users,dc=wso2,dc=org</code></td>
      <td>Base DN for user searches</td>
    </tr>
    <tr>
      <td><code>ldapUserNameAttribute</code></td>
      <td><code>uid</code></td>
      <td>Attribute that holds the login username</td>
    </tr>
    <tr>
      <td><code>ldapUserSearchFilter</code></td>
      <td><code>(&amp;(objectClass=person)(uid=?))</code></td>
      <td>Filter to locate a user; <code>?</code> is replaced with the username</td>
    </tr>
    <tr>
      <td><code>ldapUserDNPattern</code></td>
      <td><em>(empty)</em></td>
      <td>Optional shortcut — construct the DN directly without a search (see below)</td>
    </tr>
    <tr>
      <td><code>ldapDisplayNameAttribute</code></td>
      <td><em>(empty)</em></td>
      <td>Attribute used as the display name in ICP; leave empty to use the username</td>
    </tr>
  </tbody>
</table>

**`ldapUserDNPattern`** avoids a search round-trip by constructing the DN from the username directly. Use `{0}` as the placeholder:

```toml
ldapUserDNPattern = "uid={0},ou=Users,dc=wso2,dc=org"
```

If the pattern is set, `ldapUserSearchFilter` and the admin bind are not used for authentication (though they are still used for group lookup if `ldapMemberOfAttribute` is not set).

### Group / role lookup

ICP reads groups to determine whether a user should be granted super-admin. Two strategies are supported.

#### Strategy A — `memberOf` (Active Directory and some standard LDAP servers)

The user entry contains a `memberOf` attribute that lists the DNs of every group the user belongs to. This is the most efficient strategy.

```toml
ldapMemberOfAttribute = "memberOf"
```

When this is set, the group-search settings below are ignored.

#### Strategy B — Group membership search (standard LDAP)

ICP searches the group subtree for entries whose membership attribute contains the user's DN.

```toml
ldapGroupSearchBase     = "ou=Groups,dc=wso2,dc=org"   # default
ldapGroupNameAttribute  = "cn"                          # default
ldapGroupSearchFilter   = "(objectClass=groupOfNames)"  # default
ldapMembershipAttribute = "member"                      # default; or "uniqueMember"
```

For **posixGroup** schemas where membership is stored as plain usernames rather than full DNs, set:

```toml
ldapMembershipAttribute = "memberUid"
```

Set `ldapReadGroups = false` to skip group lookup entirely (no user will receive super-admin via LDAP roles).

### Admin role mapping

List the LDAP group names (the value of `ldapGroupNameAttribute`, not the full DN) whose members should become ICP super-admins on first login:

```toml
ldapAdminRoles = ["icp-admins", "administrators"]
```

The comparison is **case-sensitive**. A user is placed in the ICP *Super Admins* group the **first time they log in** with a matching role. Subsequent role changes in LDAP are not reflected automatically.

### TLS (LDAPS)

For production deployments, enable TLS:

```toml
ldapSslEnabled = true

# Path to a JKS truststore containing the LDAP server's CA certificate.
# If omitted, certificate verification is disabled (not recommended for production).
ldapTrustStorePath     = "../conf/security/ldap-truststore.jks"
ldapTrustStorePassword = "truststore-password"
```

To import a CA certificate into the truststore:

```bash
keytool -importcert -alias ldap-ca \
  -file /path/to/ldap-ca.crt \
  -keystore ../conf/security/ldap-truststore.jks \
  -storepass truststore-password
```

## Directory-specific examples

### OpenLDAP (inetOrgPerson + groupOfNames)

```toml
ldapUserStoreEnabled   = true

ldapHostName           = "ldap.example.com"
ldapPort               = 389
ldapConnectionName     = "cn=admin,dc=example,dc=com"
ldapConnectionPassword = "admin-password"

ldapUserSearchBase       = "ou=people,dc=example,dc=com"
ldapUserNameAttribute    = "uid"
ldapUserSearchFilter     = "(&(objectClass=inetOrgPerson)(uid=?))"
ldapDisplayNameAttribute = "cn"

ldapGroupSearchBase     = "ou=groups,dc=example,dc=com"
ldapGroupNameAttribute  = "cn"
ldapGroupSearchFilter   = "(objectClass=groupOfNames)"
ldapMembershipAttribute = "member"

ldapAdminRoles = ["icp-admins"]
```

### OpenLDAP (posixAccount + posixGroup)

```toml
ldapUserSearchBase       = "ou=people,dc=example,dc=com"
ldapUserNameAttribute    = "uid"
ldapUserSearchFilter     = "(&(objectClass=posixAccount)(uid=?))"
ldapDisplayNameAttribute = "cn"

ldapGroupSearchBase     = "ou=groups,dc=example,dc=com"
ldapGroupNameAttribute  = "cn"
ldapGroupSearchFilter   = "(objectClass=posixGroup)"
ldapMembershipAttribute = "memberUid"

ldapAdminRoles = ["icp-admins"]
```

### Active Directory

```toml
ldapHostName           = "dc01.corp.example.com"
ldapPort               = 389
ldapConnectionName     = "CN=svc-icp,OU=Service Accounts,DC=corp,DC=example,DC=com"
ldapConnectionPassword = "service-account-password"

ldapUserSearchBase       = "OU=Users,DC=corp,DC=example,DC=com"
ldapUserNameAttribute    = "sAMAccountName"
ldapUserSearchFilter     = "(&(objectClass=user)(sAMAccountName=?))"
ldapDisplayNameAttribute = "displayName"

# AD populates memberOf on the user entry — no separate group search needed
ldapMemberOfAttribute  = "memberOf"
ldapGroupNameAttribute = "cn"

ldapAdminRoles = ["ICP Admins"]
```

For AD over LDAPS (port 636):

```toml
ldapPort               = 636
ldapSslEnabled         = true
ldapTrustStorePath     = "../conf/security/ad-truststore.jks"
ldapTrustStorePassword = "truststore-password"
```

## How it works

On login the adapter:

1. Resolves the user's LDAP Distinguished Name (DN) — either directly from a pattern or via a directory search.
2. Authenticates the user by attempting an LDAP bind with their DN and password.
3. Reads the user's group memberships from the directory.
4. If any group matches a configured admin role, the user is granted ICP super-admin **on first login** (by adding them to the built-in *Super Admins* group).
5. Returns a stable, deterministic user ID (UUID v5 derived from the username and search base) so the same LDAP user always maps to the same ICP user record.

## Troubleshooting

<table>
  <thead>
    <tr>
      <th>Symptom</th>
      <th>Cause</th>
      <th>Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Login returns 401 with no error in logs</td>
      <td>User not found in directory</td>
      <td>Check <code>ldapUserSearchBase</code> and <code>ldapUserSearchFilter</code>; verify the username attribute matches the login name</td>
    </tr>
    <tr>
      <td>Login returns 500 "Authentication service unavailable"</td>
      <td>Cannot reach LDAP server</td>
      <td>Check <code>ldapHostName</code>, <code>ldapPort</code>, firewall rules</td>
    </tr>
    <tr>
      <td>Users can log in but are never super-admin</td>
      <td>Group names don't match</td>
      <td><code>ldapAdminRoles</code> values must match the <code>ldapGroupNameAttribute</code> value exactly (case-sensitive)</td>
    </tr>
    <tr>
      <td>TLS handshake failure</td>
      <td>CA certificate not trusted</td>
      <td>Import the LDAP server's CA cert into the truststore</td>
    </tr>
    <tr>
      <td>Users get super-admin on first login but lose it after re-deploy</td>
      <td>Expected behaviour</td>
      <td>Super-admin is set once at first login; subsequent changes must be managed via the ICP user management UI</td>
    </tr>
    <tr>
      <td>Display name shows as username</td>
      <td><code>ldapDisplayNameAttribute</code> missing on entry</td>
      <td>Verify the attribute name or set <code>ldapDisplayNameAttribute = ""</code> to always use the username</td>
    </tr>
  </tbody>
</table>
