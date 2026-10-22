# Rotate an OAuth2 token file without a restart

At the end of this guide an inbound endpoint authenticates with an OAuth2 token from a file, and replacing the file is all a rotation takes.

## Steps

1. On the broker enable an OAuth profile on the Message VPN and a TLS listener. OAuth is refused on a plain connection.
2. Put the current token in a file the server can read, and keep the directory writable for the sidecar or the operator that rotates it.

    ```bash
    umask 077
    printf '%s' "$TOKEN" > /secrets/solace/token.new && mv /secrets/solace/token.new /secrets/solace/token
    ```

3. Configure the endpoint.

    ```xml
    <parameter name="solace.host">tcps://broker:55443</parameter>
    <parameter name="solace.authenticationScheme">OAUTH2</parameter>
    <parameter name="solace.oauth2TokenFile">/secrets/solace/token</parameter>
    <parameter name="solace.sslTrustStorePath">/secrets/solace/truststore.jks</parameter>
    <parameter name="solace.sslTrustStorePassword">wso2:vault-lookup('solace.truststore')</parameter>
    ```

4. Deploy. Then rotate: write the new token with the same two commands. Nothing else.

## Verify

The endpoint connects with the token in the file. After the rotation, force a reconnect by disconnecting the client on the broker, or wait for the next reconnect: the log shows the session reconnected, and the broker's client list shows the session authenticated with the new token's subject. Remove the file for a minute: the next reconnect logs one WARN that the file could not be read and keeps the last token, and the reconnect succeeds. Put the file back and the log shows INFO that it is readable again. Search the log for the token value: it is never there.

## Undo

Set authenticationScheme back to BASIC with a username and a password, or keep OAUTH2 with the static solace.oauth2AccessToken, which then needs a redeploy at every rotation.
