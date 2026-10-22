# OAuth2 with a rotating token file

An endpoint or a connection authenticates with an OAuth2 token that a sidecar or an operator rotates in a file. The token is read from the file at every connect and at every reconnect attempt, so a rotation needs no restart and no redeploy.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-oauth.png" title="A sidecar writes the token file, the endpoint reads it at every connect and reconnect, the connection uses TLS" width="800" alt="A sidecar writes the token file, the endpoint reads it at every connect and reconnect, the connection uses TLS"/>

## The shape

The identity provider issues a token. A sidecar or an operator writes it to a file and replaces the file atomically, by writing a temporary file in the same directory and renaming it. The inbound endpoint or the connector connection reads the file whole, trims it, and sends it as the OAuth2 access token when it connects and whenever the Solace client reconnects. A missing or unreadable file keeps the last token in use and logs one WARN per failure streak, and one INFO when the file is readable again. The token value never appears in a log line.

## The artifacts

```xml
<parameter name="solace.host">tcps://broker:55443</parameter>
<parameter name="solace.authenticationScheme">OAUTH2</parameter>
<parameter name="solace.oauth2TokenFile">/secrets/solace/token</parameter>
<parameter name="solace.sslTrustStorePath">/secrets/solace/truststore.jks</parameter>
<parameter name="solace.sslTrustStorePassword">wso2:vault-lookup('solace.truststore')</parameter>
```

For a connector connection the parameters are authenticationScheme and oauth2TokenFile in the connection, with the same meaning.

## TLS is required

The Solace client refuses OAuth2 on a plain tcp connection, with the error `OAuth 2.0 based Authentication is supported only for SSL secure connections`. Use a tcps host and a trust store.

## The parameters that matter

| Parameter | Use |
| --- | --- |
| solace.authenticationScheme | OAUTH2 |
| solace.oauth2TokenFile | the file the token is read from |
| solace.oauth2AccessToken | a static token, kept for compatibility, used when no file is set |
| solace.oauth2IssuerIdentifier | the issuer, when the broker has several OAuth profiles |
| solace.apiProvidedUsername | leave blank, the identity comes from the token |

## The log lines

WARN `token file <path> could not be read; keeping the last token` once per failure streak, and INFO when the file is readable again. Every reconnect attempt that reads the file logs the read at DEBUG, with a hash of the token and never its value.
