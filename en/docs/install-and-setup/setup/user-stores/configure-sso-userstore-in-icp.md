# SSO Configuration

ICP supports Single Sign-On via OpenID Connect (OIDC), allowing users to authenticate through your organization's identity provider. SSO coexists with local username/password authentication. Users can use either method.

!!! Prerequisites
    
    Before configuring SSO in ICP, complete the following in your identity provider:

    1. Register a new OIDC application (also called a "client" or "app registration").
    2. Note the **Client ID** and **Client Secret** issued for the application.
    3. Add the following **Redirect URI** to the allowed list:
        - Local/on-prem (distribution pack): `http://localhost:9446/auth/callback`
        - Production: `https://<your-icp-domain>/auth/callback`
    4. Ensure the identity provider includes the following claims in the ID token:
        - `sub` (required)
        - `email` or `preferred_username` (at least one required)
        - `name` (recommended, used for display names)

## Step 1: Collect OIDC Endpoints

Gather the following endpoint URLs from your identity provider. Most providers publish these under the [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html) document at `/.well-known/openid-configuration`.

<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Issuer URL</td>
      <td>Unique identifier for the authorization server</td>
    </tr>
    <tr>
      <td>Authorization endpoint</td>
      <td>Where ICP sends users to authenticate</td>
    </tr>
    <tr>
      <td>Token endpoint</td>
      <td>Where ICP exchanges the authorization code for tokens</td>
    </tr>
    <tr>
      <td>End-session endpoint</td>
      <td>Where ICP sends users to log out</td>
    </tr>
  </tbody>
</table>

## Step 2: Update `deployment.toml`

Locate `conf/deployment.toml` under your WSO2 Integrator installation:

<table>
  <thead>
    <tr>
      <th>OS</th>
      <th>Default path</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>macOS</td>
      <td><code>/Applications/WSO2 Integrator.app/Contents/components/icp/conf/deployment.toml</code></td>
    </tr>
    <tr>
      <td>Windows</td>
      <td><code>%USERPROFILE%\AppData\Local\Programs\WSO2\Integrator\components\icp\conf\deployment.toml</code></td>
    </tr>
    <tr>
      <td>Linux</td>
      <td><code>/usr/share/wso2-integrator/components/icp/conf/deployment.toml</code></td>
    </tr>
  </tbody>
</table>

Add the following SSO configuration to the file, replacing the placeholder values with your identity provider's details:

```toml
ssoEnabled = true
ssoIssuer = "https://your-provider.com"
ssoAuthorizationEndpoint = "https://your-provider.com/oauth2/authorize"
ssoTokenEndpoint = "https://your-provider.com/oauth2/token"
ssoLogoutEndpoint = "https://your-provider.com/oauth2/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

For production deployments, replace the redirect URI with your public domain (e.g. `https://icp.example.com/auth/callback`).

Restart the ICP server after saving changes.

### Configuration Parameters

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ssoEnabled</code></td>
      <td>Set to <code>true</code> to activate SSO</td>
    </tr>
    <tr>
      <td><code>ssoIssuer</code></td>
      <td>Issuer URL from your identity provider</td>
    </tr>
    <tr>
      <td><code>ssoAuthorizationEndpoint</code></td>
      <td>Authorization endpoint URL</td>
    </tr>
    <tr>
      <td><code>ssoTokenEndpoint</code></td>
      <td>Token endpoint URL</td>
    </tr>
    <tr>
      <td><code>ssoLogoutEndpoint</code></td>
      <td>End-session endpoint URL</td>
    </tr>
    <tr>
      <td><code>ssoClientId</code></td>
      <td>Client ID from your identity provider</td>
    </tr>
    <tr>
      <td><code>ssoClientSecret</code></td>
      <td>Client secret from your identity provider</td>
    </tr>
    <tr>
      <td><code>ssoRedirectUri</code></td>
      <td>Redirect URI registered with your identity provider</td>
    </tr>
    <tr>
      <td><code>ssoUsernameClaim</code></td>
      <td>Claim to use as the ICP username: <code>email</code> or <code>preferred_username</code></td>
    </tr>
    <tr>
      <td><code>ssoScopes</code></td>
      <td>OIDC scopes to request. <code>openid</code> is required.</td>
    </tr>
  </tbody>
</table>

## Provider-specific examples

### Asgardeo

```toml
ssoEnabled = true
ssoIssuer = "https://api.asgardeo.io/t/<org>/oauth2/token"
ssoAuthorizationEndpoint = "https://api.asgardeo.io/t/<org>/oauth2/authorize"
ssoTokenEndpoint = "https://api.asgardeo.io/t/<org>/oauth2/token"
ssoLogoutEndpoint = "https://api.asgardeo.io/t/<org>/oidc/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Okta

```toml
ssoEnabled = true
ssoIssuer = "https://<domain>.okta.com/oauth2/default"
ssoAuthorizationEndpoint = "https://<domain>.okta.com/oauth2/default/v1/authorize"
ssoTokenEndpoint = "https://<domain>.okta.com/oauth2/default/v1/token"
ssoLogoutEndpoint = "https://<domain>.okta.com/oauth2/default/v1/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Auth0

```toml
ssoEnabled = true
ssoIssuer = "https://<domain>.auth0.com/"
ssoAuthorizationEndpoint = "https://<domain>.auth0.com/authorize"
ssoTokenEndpoint = "https://<domain>.auth0.com/oauth/token"
ssoLogoutEndpoint = "https://<domain>.auth0.com/v2/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Microsoft Entra ID (Azure AD)

```toml
ssoEnabled = true
ssoIssuer = "https://login.microsoftonline.com/<tenant-id>/v2.0"
ssoAuthorizationEndpoint = "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/authorize"
ssoTokenEndpoint = "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token"
ssoLogoutEndpoint = "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Keycloak

```toml
ssoEnabled = true
ssoIssuer = "https://<keycloak-domain>/realms/<realm>"
ssoAuthorizationEndpoint = "https://<keycloak-domain>/realms/<realm>/protocol/openid-connect/auth"
ssoTokenEndpoint = "https://<keycloak-domain>/realms/<realm>/protocol/openid-connect/token"
ssoLogoutEndpoint = "https://<keycloak-domain>/realms/<realm>/protocol/openid-connect/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "preferred_username"
ssoScopes = ["openid", "email", "profile"]
```

## User provisioning

When a user authenticates via SSO for the first time, ICP automatically creates a local account. The account username is taken from the claim specified in `ssoUsernameClaim`. The display name is resolved in the following order:

1. `name` claim
2. Local part of the `email` claim (before `@`)
3. `preferred_username` claim

After the account is created, an administrator must assign the appropriate roles and permissions before the user can access ICP resources. See [Access Control](../access-control.md).

## Security Notes

- **Protect the client secret** — do not commit it to version control. Use environment variables or a secrets manager and inject the value at deployment time.
- **Use HTTPS in production** — `ssoRedirectUri` must use `https://` for production deployments. `http://localhost` is an accepted exception in OIDC for local testing, but plain HTTP should never be used with a public hostname.
- **Redirect URI must match exactly** — the URI in `conf/deployment.toml` must match the one registered with your identity provider character for character, including protocol, hostname, port (if non-standard), and path.

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
      <td>SSO button does not appear on the login page</td>
      <td><code>ssoEnabled</code> is not <code>true</code>, or the server was not restarted</td>
      <td>Set <code>ssoEnabled = true</code> in <code>conf/deployment.toml</code> and restart ICP. Check startup logs for configuration errors.</td>
    </tr>
    <tr>
      <td><code>invalid_client</code> or <code>invalid_grant</code> error</td>
      <td>Incorrect client ID or secret, or the IdP application is inactive</td>
      <td>Verify both values and confirm the application is enabled in your identity provider.</td>
    </tr>
    <tr>
      <td>Redirect URI mismatch error</td>
      <td><code>ssoRedirectUri</code> does not exactly match the URI registered in the identity provider</td>
      <td>Check for differences in protocol, hostname, port, and trailing slashes.</td>
    </tr>
    <tr>
      <td>User is missing required claims</td>
      <td>The identity provider is not including <code>sub</code> and <code>email</code> or <code>preferred_username</code> in the ID token</td>
      <td>Configure your identity provider to include these claims. Verify <code>ssoUsernameClaim</code> matches a claim your provider returns.</td>
    </tr>
    <tr>
      <td>User authenticated successfully but has no access</td>
      <td>User account was created but has no assigned roles</td>
      <td>An administrator must grant roles to the account in ICP. See <a href="../access-control.md">Access Control</a>.</td>
    </tr>
  </tbody>
</table>

## Frequently asked questions

**Can a user authenticate with both SSO and a local password?**  
SSO and local password authentication are independent. If the same email address is used for both, they are treated as separate accounts. Users should use one method consistently.

**What happens if the identity provider is unavailable?**  
SSO login will fail during an outage. Local password authentication (if enabled) remains unaffected.

**Can I enforce SSO-only login?**  
Yes. Disable the local authentication backend to require all users to authenticate through the identity provider. Ensure at least one SSO-authenticated administrator account is in place before doing so.

**Can I configure more than one identity provider?**  
ICP currently supports one OIDC provider per deployment.

**How do I rotate the client secret?**  
Generate a new secret in your identity provider, update `ssoClientSecret` in `conf/deployment.toml`, and restart the ICP server. Active user sessions are not affected.
