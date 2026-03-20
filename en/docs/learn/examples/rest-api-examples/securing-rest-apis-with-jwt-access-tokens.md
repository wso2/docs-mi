# Secure APIs using JWT (Self Contained) Access Tokens

WSO2 Integrator: MI supports RFC 9068-compliant, self-contained JWT access tokens as secure API credentials. JSON Web Token (JWT) is an open standard of transmitting information securely between two parties. Because these tokens are digitally signed, they provide a tamper-proof mechanism for transmitting authorization data directly within the request.

JWT access tokens are ideal as API credentials because they function as self-contained security assertions. By carrying specific claims such as resource scopes, intended audience, and issuer details, etc. directly within the token, they provide the necessary context for delegated authorization. This allows the WSO2 Integrator: MI to inspect the token’s internal data and enforce granular security policies locally, ensuring that requests are authorized based on the specific permissions granted by the user.

## Prerequisites for JWT based tokens

The following prerequisites have to be satisfied for JWT based tokens to work.

-   Only signed JWT access tokens are allowed.

-   The expected token format is as follows:

    `base64(header).base64(payload).base64(signature)`

-   Mandatory Claims: The token must include `iss`, `sub`, `aud`, `jti`, `iat`, and `exp`.

-   The JWT header should ideally contain `"typ": "at+jwt"` or `"typ": "application/at+jwt"` to indicate that the token is a JWT access token.

-   WSO2 Integrator: MI must have network access to the IdP's JSON Web Key Set (/jwks) endpoint for digital signature verification purposes.

-   If using a static public key instead of JWKS, the IdP’s public certificate must be imported into the WSO2 Integrator: MI's truststore (client-truststore.jks) with the alias configured in the handler. For more information, see [Importing SSL certificates to a truststore.]({{base_path}}/install-and-setup/setup/security/importing-ssl-certificate/#importing-ssl-certificates-to-a-truststore)


## Mandatory attributes of a JWT access token

The following are the mandatory attributes that are required for a JWT access token.

<html>
      <div class="admonition note">
      <p class="admonition-title">Note</p>
      <div>
          Please note that the WSO2 Integrator: MI exclusively supports 
          <strong>RFC 9068</strong> (JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens). 
          The mandatory attributes of a JWT access token and the validation pipeline described below is strictly implemented to comply with this specification.
      </div>
      </div> 
</html>

- `Header`
   <table>
      <tbody>
         <tr>
            <td>`alg`</td>
            <td>The algorithm which signs the token (e.g., RS256).</td>
         </tr>
         <tr>
            <td>`typ`</td>
            <td>The media type of the complete JWS (e.g., at+jwt or application/at+jwt).</td>
         </tr>
      </tbody>
   </table>

- `Payload`
   <table>
      <tbody>
         <tr>
            <td>`sub`</td>
            <td>The subject of the token, which identifies as to whom the token refers to.</td>
         </tr>
         <tr>
            <td>`iat`</td>
            <td>Token issued time</td>
         </tr>
         <tr>
            <td>`exp`</td>
            <td>The expiry time of the token.</td>
         </tr>
         <tr>
            <td>`iss`</td>
            <td>The principal that issued the JWT.</td>
         </tr>
         <tr>
            <td>`aud`</td>
            <td>The recipients that the JWT is intended for.</td>
         </tr>
         <tr>
            <td>`jti`</td>
            <td>The unique identifier of the JWT.</td>
         </tr>
      </tbody>
   </table>

## Validation Pipeline

### 1. Header Metadata Validation
Before verifying the signature, the handler inspects the JWT header for two critical security markers:

- **Type Check (`typ`):** The handler confirms that the `typ` header is set to `at+jwt` (or `application/at+jwt`). This prevents "Token Confusion" attacks where an ID token might be mistakenly presented as an Access Token.

- **Algorithm Check (`alg`):** The handler enforces the use of strong asymmetric algorithms (e.g., RS256). Any tokens using the `none` algorithm or weak symmetric algorithms (HMAC) are rejected immediately to prevent signature bypass.

<html>
      <div class="admonition note">
      <p class="admonition-title">Note</p>
      <p>
        <ul>
          <li>
              <strong>Default Behavior:</strong> By default, the server only accepts algorithms from the <strong>RSA family</strong> (e.g., RS256, RS384, RS512, PS256, PS384, PS512). This ensures that only strong, asymmetric signatures are trusted.
          </li>
          <li>
              <strong>Strict Validation:</strong> If you need to be more specific or restrict the API to a single signature type, you can [configure the <code>allowedAlgorithm</code> parameter](#handler-configuration-reference) at the handler level. This will force the handler to validate that the token's <code>alg</code> header matches your specified value exactly.
          </li>
        </ul>
      </p>
      </div> 
</html>

### 2. Integrity & Authenticity Check

Once the header is validated, the process moves to **Digital Signature Verification**. Using the `kid` (Key ID) found in the JWT header, the handler retrieves the corresponding public key from the configured **JWKS endpoint**. This step confirms that the token was indeed issued by a trusted Identity Provider and has not been altered in transit.

### 3. Temporal Policy Enforcement

Once the signature is verified, the handler enforces time-based security policies.

- **`exp` Claim Check:**  The Expiration (`exp`) claim is validated to ensure the token is currently active. 

- **`iat` Claim Check:** The `iat` check ensures the token is not "from the future" (accounting for the `clock_skew_seconds` parameter) and that it hasn't exceeded the `max_issued_at_age_seconds` policy, which limits the total lifespan of a token regardless of its official expiration.

<html>
      <div class="admonition note">
        <p class="admonition-title">Example Scenario</p>
        <div>
          <ul style="margin-top: 10px; margin-bottom: 0;">
              <li><strong>Policy:</strong> <code>max_issued_at_age_seconds</code> is set to <strong>3600</strong> (1 hour).</li>
              <li><strong>Token Issued At (iat):</strong> 10:00 AM</li>
              <li><strong>Expiration (exp):</strong> 01:00 PM</li>
              <li><strong>Current Time:</strong> 11:30 AM</li>
              <li><strong>Result:</strong> The token will be <strong>rejected</strong>, even if the expiration (<code>exp</code>) is set for 1:00 PM. 
                  This is because the token is now 90 minutes old, exceeding your 60-minute "maximum age" policy.
              </li>
          </ul>
        </div>
      </div> 
</html>

### 4. Audience validation
The handler then validates that the token is intended for this specific API by inspecting the Audience (`aud`) claim. If the configured audience is not present in the token's audience list, the request is rejected. This method is particularly useful when APIs are shared across multiple clients or services, and you want to ensure that each token is issued for a specific intended audience.

There are two levels to configure this:

- **Global Audience Validation:** By setting the `audience` parameter at the global level (in `deployment.toml`), you can enforce a universal audience requirement across all APIs. This is ideal for scenarios where all your APIs are intended for the same set of clients.
- **Handler-Level Audience Validation:** If you have APIs that serve different audiences, you can override the global setting by configuring the `audience` parameter at the handler level within the API definition. This is <strong>recommended for business-critical integrations</strong> where you must strictly validate that a token was issued
  specifically for that high-security resource, preventing "token reuse" across different parts of your ecosystem.

### 5. Scope validation
The WSO2 Integrator: MI validates the scopes coming in the `scope` claim of the JWT. The handler ensures the scope claim contains the necessary permissions (defined in the Open API spec) required to access the specific resource.

### 6. Sender Constrain & Proof-of-Possession
The final layer of the pipeline is the Confirmation (`cnf`) claim check. If **cnf validation** is enabled (for maximum security, cnf validation is enabled by default), the handler extracts the thumbprint of the client certificate used during the TLS handshake and compares it with the x5t#S256 value inside the token. This Proof-of-Possession check ensures that even if a JWT is intercepted, it cannot be used by any party other than the original client to whom it was issued.

<html>
      <div class="admonition note">
        <p class="admonition-title">Note</p>
        <p>
        If your environment does not support mTLS or if this specific validation is not required, 
        you must explicitly disable it
    </p>
    <ul>
        <li>
            <strong>To disable:</strong> Set the <code>disableCNFValidation</code> parameter to <code>true</code> 
            within the handler properties of your API definition.
        </li>
    </ul>
      </div> 
</html>

### 7. Token Revocation Extension
While JWTs are traditionally stateless, many production environments require a way to instantly invalidate tokens that have been compromised or logged out at the Identity Provider (IdP) level. To support this, the handler includes a **Token Revocation Extension**.

This extension provides a dedicated interface, allowing you to implement your own custom revocation logic. By plugging into this extension, the handler can check each incoming token against your specific revocation source, such as a database, a distributed cache (like Redis), or a direct API call to your IdP's revocation endpoint.

The interface for this extension is defined as follows:

```java
package org.wso2.micro.integrator.security.handler.oauth;

import java.util.Map;

public interface TokenRevocationHandler {

  /**
   * Checks if the given token has been revoked or invalidated.
   *
   * @param token The raw string token or a parsed JWT object.
   * @param context Additional metadata (e.g., claims) that might aid in the check.
   * @return true if the token is revoked/invalid; false if it is still active.
   * @throws RevocationCheckException if the check fails due to system errors.
   */
  boolean isRevoked(String token, Map<String, Object> context) throws RevocationCheckException;
}
```

If your custom implementation returns `true`, the handler will immediately reject the request, ensuring that revoked tokens cannot be used even if they have not yet reached their expiration time.

## Handler Configuration Reference

The following table provides a reference for the configurable parameters of the JWT access token handler.

### Validation Properties

| Parameter Name                     | Description                                                                                                                                                                                                                                                                                                                                        | Required/<br/>Optional | Default <br/>Value |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -- |----|
| `jwksEndpoint`                     | The URL of the JWKS endpoint where the handler can retrieve the public keys for signature verification.   <br/><br/> `<property name="jwksEndpoint" value="https://idp.example.com/.well-known/jwks.json"/>`                                                                                                                                       | Required | None |
| `authorizationHeader`              | The HTTP header containing the token.  <br/><br/> `<property name="authorizationHeader" value="Authorization"/>`                                                                                                                                                                                                                                   | Optional | "Authorization" |
| `trustedIssuers`                   | A comma-separated list of trusted token issuers. The handler will only accept tokens that have an `iss` claim matching one of these values. <br/><br/>`<property name="trustedIssuers" value="https://idp.example.com,https://sts.windows.net/tenant-id/"/>`                                                                                       | Optional | None |
| `allowedAlgorithms`                | A comma-separated list of allowed signing algorithms (e.g., RS256, ES256). Tokens signed with algorithms not in this list will be rejected.  <br/><br/>`<property name="allowedAlgorithms" value="RS384,RS512"/>`                                                                                                                                  | Optional | RS256 |
| `audience`                         | The expected audience value that must be present in the `aud` claim of the JWT. This ensures the token is intended for this API.  <br/><br/>`<property name="audience" value="https://api.orders.com"/>`                                                                                                                                                            | Optional | None |
| `maxIssuedAtAgeSeconds`            | Defines the maximum lifespan allowed for a token since it was issued (`iat`), regardless of the expiration time. <br/><br/>`<property name="maxIssuedAtAgeSeconds" value="18000"/>`                                                                                                                                                                | Optional | None |
| `removeOAuthHeadersFromOutMessage` | A flag to indicate whether to remove the OAuth-related headers (e.g., Authorization header) from the message before sending it to the backend. This can help prevent sensitive information from being exposed to backend services. <br/><br/>`<property name="removeOAuthHeadersFromOutMessage" value="true"/>`                                    | Optional | true |
| `tokenRevocationHandler`           | The fully qualified class name of a custom token revocation handler that implements the `TokenRevocationHandler` interface. This allows you to plug in custom logic to check if a token has been revoked (e.g., by checking a database or cache). <br/><br/>`<property name="tokenRevocationHandler" value="org.sample.customRecovationHandler"/>` | Optional | None |

### Sender-Constrained Properties

When cnf validation is enabled, the handler will enforce sender constraint by performing a Proof-of-Possession check. In this case, the following additional properties are relevant:

| Parameter Name | Description                                                                                                                                                                                                         | Required/<br/>Optional | Default Value   |
| --- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- |-----------------|
| `disableCNFValidation` | Set to false to enable Proof-of-Possession checks. It validates the cnf claim against the client's certificate.                                                                                                     | Optional | false           |
| `enableClientCertificateValidation` | Toggles the extraction and validation of the client certificate from the transport layer.                                                                                                                           | Optional | true            |
| `clientCertificateHeader` | The HTTP header from which to extract the client certificate. This is typically used in scenarios where the client certificate is forwarded by a reverse proxy or LB. | Optional | "X-Client-Certificate" |
| `clientCertificateEncode` | This property specifies the encoding format used for the client certificate when it is passed through HTTP headers (via the `clientCertificateHeader`). It ensures the handler can correctly decode the certificate string back into its original `X.509` format before performing the `cnf` (confirmation) thumbprint validation. | Optional | false           |

### HTTP Client & Proxy Configuration

The handler uses an internal HTTP client to retrieve public keys from the Identity Provider's JWKS metadata. Proper configuration of these settings is vital to prevent latency issues or connection failures during the token validation process.


   By defining these properties within the handler tag of a specific API definition, you can override the [global settings here](#http-client--proxy-configuration-1). This is useful for APIs that need to connect to an internal IdP (bypassing the proxy) or for critical services that require shorter timeout durations to fail fast.

| Property Name              | Description                                                                                                  | Required/<br/>Optional | Default Value |
|----------------------------|--------------------------------------------------------------------------------------------------------------| --- |---------------|
| `connectionTimeout`        | The timeout (in milliseconds) for establishing a connection to the JWKS endpoint.                            | Optional | 5000 ms       |
| `socketTimeout`            | The timeout (in milliseconds) for waiting for data from the JWKS endpoint after a connection is established. | Optional | 5000 ms       |
| `connectionRequestTimeout` | The timeout (in milliseconds) for waiting to obtain a connection from the internal connection pool.          | Optional | 5000 ms       |
| `enableProxy`              | Set to `true` to route JWKS requests through a proxy server.                                                 | Optional | false         |
| `proxyHost`                | The hostname of the proxy server to use when connecting to the JWKS endpoint.                                | Optional | None          |
| `proxyPort`                | The port number of the proxy server.                                                                         | Optional | None          |
| `proxyProtocol`            | The protocol to use when connecting to the proxy server (e.g., `http` or `https`).                           | Optional | http          |
| `proxyUsername`            | The username for authenticating with the proxy server, if required.                                          | Optional | None          |
| `proxyPassword`            | The password for authenticating with the proxy server, if required.                                          | Optional | None          |

```xml
<handler class="org.wso2.micro.integrator.security.handler.oauth.OAuthAuthenticationHandler">
    ...
    <property name="connectionTimeout" value="3000"/>
    <property name="socketTimeout" value="3000"/>
    <property name="connectionRequestTimeout" value="3000"/>
    <property name="enableProxy" value="false"/>
</handler>
```

## Global Server Configuration Reference

While the handler can be configured at the API level, the following properties can be managed globally. This ensures that all APIs on the server follow a consistent security baseline. These global values serve as the fallback if a specific handler-level property is missing.

### Token Validation Settings

| Parameter Name                     | Description                                                                                                                                                                                                                               | Required/<br/>Optional | Default <br/>Value |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -- |----|
| `trusted_issuers`                   | A comma-separated list of trusted token issuers. The handler will only accept tokens that have an `iss` claim matching one of these values.  | Optional | None |
| `allowed_algorithms`                | A comma-separated list of allowed signing algorithms (e.g., RS256, ES256). Tokens signed with algorithms not in this list will be rejected.                                            | Optional | RS256 |
| `audience`                         | The expected audience value that must be present in the `aud` claim of the JWT. This ensures the token is intended for this API.                                                          | Optional | None |
| `max_issued_at_age_seconds`            | Defines the maximum lifespan allowed for a token since it was issued (`iat`), regardless of the expiration time.                                                                | Optional | None |  
| `clock_skew_seconds`                | The amount of clock skew (in seconds) to allow when validating the `iat` and `exp` claim. This accounts for minor time discrepancies between the token issuer and the WSO2 Integrator: MI.                                                | Optional | 60 seconds |

```toml
[rest_api.jwt_security_handler]
trusted_issuers = ["https://idp.example.com","https://sts.windows.net/tenant-id/"]
allowed_algorithms = ["RS256","RS384"]
audience = "https://api.orders.com"
max_issued_at_age_seconds = 18000
clock_skew_seconds = 60
```
  <html>
      <div class="admonition note">
      <p class="admonition-title">Note</p>
      <h3>Trusted Issuer Configuration</h3>
      <p>
          The <strong>trustedIssuers</strong> property defines the valid <code>iss</code> values that the handler will accept. 
          For maximum flexibility, this can be configured at both the global and handler levels.
      </p>
      <ul>
          <li>
              <strong>Global Configuration (Recommended):</strong> If you have multiple APIs that need to accept tokens from the same set of Identity Providers, it is better to maintain a list of trusted issuers at the global level (within <code>deployment.toml</code>). This way, you can avoid redundant configurations in each API and ensure consistency across your API ecosystem.
          </li>
          <li>
              <strong>Handler-Level Override:</strong> You can also define <strong>trustedIssuers</strong> directly at the handler level for a specific API. This is ideal for specialized APIs that require a unique or more restricted set of issuers.
          </li>
      </ul>
      <div>
          <strong>Precedence:</strong> The handler will always prioritize the <strong>handler level</strong> configuration. If a specific list is provided in the API definition, it will completely override the global list for that specific API.
      </div>
        </div> 
  </html>

### Log Masking & Data Privacy Settings
   
  To prevent the exposure of sensitive Bearer tokens in system logs (such as wire logs or audit logs), the handler supports a set of global masking configurations. These settings define how a JWT is truncated and obscured before being printed to any log file.
  
  | Parameter Name                     | Description                                                                                                                                                                                                                 | Required/<br/>Optional | Default <br/>Value |
  |------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -- |--------------------|
  |`log_masking.token_max_len`| The maximum number of characters from the token to printed in logs. If the token exceeds this length, it will be truncated and suffixed with an ellipsis (`...`).                | Optional | 10 characters      |
  |`log_masking.token_max_visible_len`| The number of characters to remain visible at the end of the token after truncation. This allows for partial identification of the token without exposing the full value. | Optional | 4 characters       |
  |`log_masking.token_min_visible_len_ratio`| The minimum percentage of the token that must remain visible if it is very short.                                                                                | Optional | 0.3 (30%)          |
  |`log_masking.token_mask_char`| The character used to replace the masked portion of the token.                                                                                                                | Optional | "X"                |

  ```toml
  [rest_api.jwt_security_handler]
  log_masking.token_max_len = 12
  log_masking.token_max_visible_len = 5
  log_masking.token_min_visible_len_ratio = 0.2
  log_masking.token_mask_char = "X"
  ```

###  Cache Settings

To optimize performance and reduce latency during token validation, the handler can cache the parsed JWT tokens and JWKS responses from the Identity Provider. The following global settings control the caching behavior:

| Parameter Name                     | Description                                                                                                                                                                                                                     | Required/<br/>Optional | Default <br/>Value       |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -- |--------------------------|
|`cache_expiry`| The duration (in seconds) for which a cached entry remains valid. After this period, the token will be removed from the cache.                                                                 | Optional | 900 seconds (15 minutes) |

  ```toml
  [rest_api.jwt_security_handler]
  cache_expiry = 600
  ```

### HTTP Client & Proxy Configuration

The handler requires an HTTP client to fetch Public Keys from the Identity Provider's JWKS endpoint. If the HTTP client properties are not explicitly defined at the Handler Level for a specific API, the handler will automatically fall back to these global settings. This is the recommended place for corporate proxy settings that apply to the whole network.

```toml
[mediation]
http_client.global_connection_timeout = 3000
http_client.global_socket_timeout = 3000
http_client.global_connection_request_timeout = 3000
http_client.global_proxy_enabled = false
```

| Global Level Configuration Name                 | Description                                                                                                  | Required/<br/>Optional | Default Value |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------| --- |---------------|
| `http_client.global_connection_timeout`         | The timeout (in milliseconds) for establishing a connection to the JWKS endpoint.                            | Optional | 5000 ms       |
| `http_client.global_socket_timeout`             | The timeout (in milliseconds) for waiting for data from the JWKS endpoint after a connection is established. | Optional | 5000 ms       |
| `http_client.global_connection_request_timeout` | The timeout (in milliseconds) for waiting to obtain a connection from the internal connection pool.          | Optional | 5000 ms       |
| `http_client.global_proxy_enabled`              | Set to `true` to route JWKS requests through a proxy server.                                                 | Optional | false         |
| `http_client.global_proxy_host`                 | The hostname of the proxy server to use when connecting to the JWKS endpoint.                                | Optional | None          |
| `http_client.global_proxy_port`                 | The port number of the proxy server.                                                                         | Optional | None          |
| `http_client.global_proxy_protocol`             | The protocol to use when connecting to the proxy server (e.g., `http` or `https`).                           | Optional | http          |
| `http_client.global_proxy_username`             | The username for authenticating with the proxy server, if required.                                          | Optional | None          |
| `http_client.global_proxy_password`             | The password for authenticating with the proxy server, if required.                                          | Optional | None          |

    
## Build and Run

Follow the instructions below to secure APIs with JWT (Self Contained) access tokens for delegate access for REST APIs in WSO2 Integrator: MI.

### Step 1: Configure the OAuth2 Authorization Handler

1. Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.
   2. Define the OpenAPI Specification with Scopes.

      To enforce scope validation for a specific API resource, you must use the security keyword at the operation level. The handler will look for these definitions to determine if the incoming token has the necessary permissions.

      **The Security Key:** 
            Under the security block, you must specify the key `oauth2`.
         
       <html>
             <div class="admonition note">
             <p class="admonition-title">Note</p>
             <p>The security key is case -insensitive. Whether you write oauth2, OAuth2, or OAUTH2, the handler will correctly identify it. </p>
             </div> 
       </html>
    
        **The Scope List:**
        Under that key, list the specific scopes required to access that resource. Ex: `read:orders`, `write:orders`, etc. 

      Check this sample OpenAPI definition that includes the security definitions for scope validation:
  
      ```yaml
      openapi: 3.0.1
      info:
        title: Order Management API
        description: API for managing customer orders with OAuth2 scope validation.
        version: 1.0.0
      
      paths:
        /orders:
          get:
            summary: Retrieve all orders
            responses:
              '200':
                description: A list of orders
            security:
              - OAuth2:           # Must match the name "oauth2"
                  - read:orders   # Requirement: Token must have this scope
          post:
            summary: Create a new order
            responses:
              '201':
                description: Order created
            security:
              - OAuth2:
                  - write:orders  # Requirement: Token must have this scope
      ```

3. [Create the REST API with the OpenAPI definition]({{base_path}}/develop/creating-artifacts/creating-an-api) given above.
4. To configure the OAuth2Authorization handler for the API, click the **Edit** button of the created API and navigate to the Handlers section. 
5. Click on the **Add Handler** button and type `org.wso2.micro.integrator.security.handler.oauth.OAuthAuthenticationHandler` as the class name. 
6. Click on **Add Property** button to add the necessary properties as below.

   <img src="{{base_path}}/assets/img/learn/api-security/oauth2/oauth2-authorization-handler/add-oauth-authorization-handler.png">

    ```xml
    <api name="OrderService" context="/v1" publishSwagger="conf:/swagger/orders.yaml">
        <resource methods="GET" uri-template="/orders">
            <inSequence>
                <payloadFactory media-type="json">
                    <format>{"status": "Success", "data": "Order list retrieved"}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
        </resource>
        <resource methods="POST" url-mapping="/orders">
            <inSequence>
                <payloadFactory media-type="json">
                  <format>{"status": "Success", "data": "Order created"}</format>
                  <args/>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
        <handlers>
            <handler class="org.wso2.micro.integrator.security.handler.oauth.OAuth2AuthorizationHandler">
                <property name="jwksEndpoint" value="https://idp.example.com/.well-known/jwks.json"/>
                <property name="audience" value="https://api.orders.com"/>
                <property name="authorizationHeader" value="Authorization"/>
                <property name="disableCNFValidation" value="false"/>
            </handler>
        </handlers>
    </api>
    ```

### Step 3:  Configure Global Settings

  The global settings for the `OAuth2AuthorizationHandler` handler can be defined in the `deployment.toml` file. These settings will apply to all APIs that use the `OAuth2AuthorizationHandler` handler, unless overridden at the handler level within a specific API definition.
   
  1. To manage trusted issuers at the server level, specify the following configurations in your `deployment.toml` file. 

  ```toml
  [rest_api.jwt_security_handler]
  trusted_issuers = ["https://idp.example.com","https://sts.windows.net/tenant-id/"]
  ```