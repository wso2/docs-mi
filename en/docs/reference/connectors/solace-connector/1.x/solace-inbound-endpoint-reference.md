# Solace Inbound Endpoint Reference

The following sections provide a detailed reference for the Solace Inbound Endpoint in WSO2 Integrator: MI. The inbound endpoint listens on a Solace queue or topic and injects each received message into a mediation sequence.

In the synapse configuration, parameters are written as `<parameter name="...">value</parameter>` elements inside an `<inboundEndpoint>`. The inbound class is `org.wso2.carbon.inbound.solace.SolaceEventListener`.

## Generic parameters

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>name</td><td>A unique name for this inbound endpoint configuration.</td><td>Yes</td><td>-</td></tr>
    <tr><td>sequence</td><td>The mediation sequence that processes consumed messages.</td><td>Yes</td><td>-</td></tr>
    <tr><td>onError</td><td>The error-handling sequence executed if message consumption or processing fails.</td><td>No</td><td>-</td></tr>
    <tr><td>inbound.behavior</td><td>The message consumption mode. Fixed at <code>eventBased</code> for the Solace inbound endpoint.</td><td>Yes</td><td>eventBased</td></tr>
    <tr><td>sequential</td><td>If enabled, messages are processed one after another within the injecting sequence, preserving order.</td><td>No</td><td>true</td></tr>
    <tr><td>coordination</td><td>In a clustered environment, set to <code>true</code> so that only a single worker node consumes messages at any time.</td><td>No</td><td>true</td></tr>
    <tr><td>suspend</td><td>Whether the inbound endpoint starts in a suspended state.</td><td>No</td><td>false</td></tr>
</table>

## Connection parameters

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.host</td><td>Solace broker host, e.g. <code>tcp://host:port</code> or <code>tcps://host:port</code> for SSL.</td><td>Yes</td><td>tcp://localhost:55555</td></tr>
    <tr><td>solace.vpnName</td><td>Solace Message VPN name.</td><td>Yes</td><td>default</td></tr>
    <tr><td>solace.authenticationScheme</td><td>Authentication scheme: <code>BASIC</code>, <code>CLIENT_CERTIFICATE</code>, or <code>OAUTH2</code>.</td><td>Yes</td><td>BASIC</td></tr>
    <tr><td>solace.username</td><td>Username for broker authentication. Required when scheme is <code>BASIC</code>.</td><td>Conditional</td><td>-</td></tr>
    <tr><td>solace.password</td><td>Password for broker authentication. Required when scheme is <code>BASIC</code>. Supports Secure Vault expressions.</td><td>Conditional</td><td>-</td></tr>
    <tr><td>apiProvidedUsername</td><td>Optional. Used only when the VPN allows api-provided usernames. For <code>CLIENT_CERTIFICATE</code>, leave blank to use the certificate CN; for <code>OAUTH2</code>, leave blank.</td><td>No</td><td>-</td></tr>
    <tr><td>solace.oauth2AccessToken</td><td>OAuth2 access token. Used when scheme is <code>OAUTH2</code>.</td><td>Conditional</td><td>-</td></tr>
    <tr><td>solace.oidcIdToken</td><td>OIDC ID token (alternative to the access token).</td><td>Conditional</td><td>-</td></tr>
    <tr><td>solace.oauth2IssuerIdentifier</td><td>OAuth2 issuer identifier (optional).</td><td>No</td><td>-</td></tr>
    <tr><td>solace.clientName</td><td>Optional client name for the session. The broker assigns one automatically if empty.</td><td>No</td><td>-</td></tr>
</table>

!!! note
    When `solace.authenticationScheme` is `OAUTH2`, you must provide either `solace.oauth2AccessToken` or `solace.oidcIdToken`; otherwise the endpoint fails to start.

## Destination parameters

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.destinationType</td><td>Type of Solace destination: <code>QUEUE</code> or <code>TOPIC</code>.</td><td>Yes</td><td>QUEUE</td></tr>
    <tr><td>solace.subscriptionType</td><td>For topics: <code>DIRECT</code> (non-persistent) or <code>DURABLE</code> (persistent). Applies only when <code>destinationType</code> is <code>TOPIC</code>.</td><td>Conditional</td><td>DIRECT</td></tr>
    <tr><td>solace.destinationName</td><td>Name of the queue or topic. For TOPIC + DIRECT, comma-separated values create multiple subscriptions; wildcards (<code>></code>, <code>*</code>) are supported.</td><td>Yes</td><td>-</td></tr>
    <tr><td>solace.dteName</td><td>Name of the Durable Topic Endpoint (DTE) for persistent topic subscriptions. Required for TOPIC + DURABLE.</td><td>Conditional</td><td>-</td></tr>
</table>

## Consumer parameters

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.contentType</td><td>Override content-type detection for the synapse message (<code>application/json</code>, <code>application/xml</code>, <code>text/plain</code>). Leave empty to auto-detect.</td><td>No</td><td>(auto-detect)</td></tr>
    <tr><td>solace.binaryPayloadAsBase64</td><td>When enabled, raw bytes of a BytesMessage are base64-encoded instead of UTF-8 decoded (prevents corruption of binary data). Auto-sets content type to <code>application/octet-stream</code>.</td><td>No</td><td>false</td></tr>
    <tr><td>solace.selector</td><td>Optional SQL-92 expression evaluated server-side on headers and user properties. Only matching messages are delivered. Applies to QUEUE and DTE destinations; ignored for direct topic subscribers. Example: <code>priority &gt;= 5 AND tenant = 'acme'</code>.</td><td>No</td><td>-</td></tr>
</table>

## Guaranteed messaging parameters

These apply to QUEUE destinations and DURABLE topic subscriptions.

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.autoAck</td><td>When enabled, messages are auto-acknowledged on receipt and the sequence cannot influence settlement. Leave <code>false</code> to call <code>acknowledgeMessage</code> / <code>nackMessage</code> from the sequence.</td><td>No</td><td>true</td></tr>
    <tr><td>solace.failureOutcome</td><td>Fallback settlement used only when the sequence does not call ack/nack itself (e.g. unhandled exception). Ignored when <code>autoAck</code> is on. <code>NONE</code>: leave unsettled (broker redelivers after timeout). <code>FAILED</code>: redeliver immediately. <code>REJECTED</code>: route straight to the DMQ.</td><td>No</td><td>NONE</td></tr>
    <tr><td>solace.subAckWindowSize</td><td>Number of guaranteed messages the broker can have in flight before it must receive an acknowledgement. Raise for higher throughput, lower for stricter ordering or memory-constrained consumers.</td><td>No</td><td>255</td></tr>
</table>

!!! note "Settlement outcomes"
    For `nackMessage` to use `FAILED` or `REJECTED`, the broker must support negative acknowledgement and the queue should have a Dead Message Queue and max-redelivery configured so rejected/exhausted messages have somewhere to go.

## Connection retry parameters

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.connectionTimeout</td><td>Timeout in milliseconds for the initial connection to the broker.</td><td>No</td><td>30000</td></tr>
    <tr><td>solace.connectRetries</td><td>Number of times to retry the initial connection.</td><td>No</td><td>3</td></tr>
    <tr><td>solace.connectRetriesPerHost</td><td>Number of times to retry connection to each host in the host list.</td><td>No</td><td>3</td></tr>
    <tr><td>solace.reconnectRetries</td><td>Number of times to retry after a connection loss.</td><td>No</td><td>3</td></tr>
    <tr><td>solace.reconnectRetryWait</td><td>Wait time in milliseconds between reconnect attempts.</td><td>No</td><td>3000</td></tr>
</table>

!!! note "Connection recovery"
    On a connection loss the endpoint reconnects according to the retry parameters above. If reconnection is exhausted, or the broker reports a terminal session or flow failure, the endpoint tears itself down and the WSO2 Integrator: MI framework automatically resumes it, re-establishing the connection. No manual intervention or restart is required.

## Destination provisioning parameters

If enabled, the queue or DTE is auto-created on the broker if it does not already exist. Applies to QUEUE destinations and DURABLE topic subscriptions.

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.provisionDestination</td><td>Auto-provision the queue or DTE if it does not exist.</td><td>No</td><td>false</td></tr>
    <tr><td>solace.queueAccessType</td><td>Access type for a provisioned queue: <code>EXCLUSIVE</code> or <code>NON_EXCLUSIVE</code>.</td><td>No</td><td>EXCLUSIVE</td></tr>
    <tr><td>solace.queueQuotaMB</td><td>Maximum spool usage in MB for the provisioned queue. 0 means broker default.</td><td>No</td><td>0</td></tr>
    <tr><td>solace.queueMaxMsgSize</td><td>Maximum message size in bytes for the provisioned queue. 0 means broker default.</td><td>No</td><td>0</td></tr>
    <tr><td>solace.queueRespectTTL</td><td>If enabled, the queue respects message TTL and discards expired messages.</td><td>No</td><td>false</td></tr>
    <tr><td>solace.queueMaxMsgRedelivery</td><td>Maximum redelivery attempts before a message is moved to the DMQ. 0 means broker default.</td><td>No</td><td>0</td></tr>
</table>

## Advanced session parameters

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.generateReceiveTimestamps</td><td>Records the broker receive time on every inbound message, exposed in the sequence as the synapse property <code>solace.receiveTimestamp</code> (epoch milliseconds). Useful for end-to-end latency / SLA tracking.</td><td>No</td><td>false</td></tr>
</table>

## SSL/TLS security parameters

Used with `tcps://` hosts.

<table>
    <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
    <tr><td>solace.sslTrustStorePath</td><td>Path to the JKS/PKCS12 file containing CAs trusted when validating the broker's server certificate. Leave empty to use the JVM default truststore.</td><td>No</td><td>-</td></tr>
    <tr><td>solace.sslTrustStorePassword</td><td>Password for the trust store file.</td><td>No</td><td>-</td></tr>
    <tr><td>solace.sslTrustStoreFormat</td><td>Trust store format: <code>JKS</code> or <code>PKCS12</code>.</td><td>No</td><td>JKS</td></tr>
    <tr><td>solace.sslKeyStorePath</td><td>Path to the JKS/PKCS12 file containing the client certificate and private key. Required when scheme is <code>CLIENT_CERTIFICATE</code>.</td><td>Conditional</td><td>-</td></tr>
    <tr><td>solace.sslKeyStorePassword</td><td>Password for the key store file.</td><td>No</td><td>-</td></tr>
    <tr><td>solace.sslKeyStoreFormat</td><td>Key store format: <code>JKS</code> or <code>PKCS12</code>.</td><td>No</td><td>JKS</td></tr>
    <tr><td>solace.sslKeyPassword</td><td>Password protecting the private key entry inside the key store. Often the same as the key-store password.</td><td>No</td><td>-</td></tr>
    <tr><td>solace.sslValidateCertificate</td><td>Validate the broker's certificate chain (issuer, signature, hostname). Set <code>false</code> ONLY for self-signed brokers in dev/lab, never in production.</td><td>No</td><td>true</td></tr>
    <tr><td>solace.sslValidateCertificateDate</td><td>Validate the broker certificate's notBefore/notAfter dates. Ignored when <code>solace.sslValidateCertificate</code> is <code>false</code>.</td><td>No</td><td>true</td></tr>
</table>

## Message properties

For each consumed message, the inbound endpoint sets the following `solace.*` properties on the synapse message context, which the injecting sequence can read (for example with the Property mediator). Conditional fields are set only when present on the message.

<table>
    <tr><th>Property</th><th>Description</th></tr>
    <tr><td>solace.messageId</td><td>Broker-assigned message ID.</td></tr>
    <tr><td>solace.destination</td><td>Queue or topic the message was received on.</td></tr>
    <tr><td>solace.deliveryMode</td><td><code>DIRECT</code>, <code>PERSISTENT</code>, or <code>NON_PERSISTENT</code>.</td></tr>
    <tr><td>solace.redelivered</td><td><code>true</code> if the broker has redelivered this message.</td></tr>
    <tr><td>solace.deliveryCount</td><td>Number of delivery attempts, when the broker provides it.</td></tr>
    <tr><td>solace.correlationId</td><td>Correlation ID carried on the message (if set).</td></tr>
    <tr><td>solace.replyTo</td><td>Reply-to destination, if the message set one.</td></tr>
    <tr><td>solace.priority</td><td>Message priority (if set).</td></tr>
    <tr><td>solace.dmqEligible</td><td>Whether the message is Dead-Message-Queue eligible.</td></tr>
    <tr><td>solace.receiveTimestamp</td><td>Broker receive time (epoch milliseconds). Set only when <code>solace.generateReceiveTimestamps</code> is enabled.</td></tr>
    <tr><td>solace.userProp.&lt;key&gt;</td><td>One property per publisher-supplied user property, each prefixed with <code>solace.userProp.</code>.</td></tr>
</table>

## Sample inbound endpoint configuration

A queue listener using basic authentication with manual settlement:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<inboundEndpoint name="OrderQueueListener"
                 class="org.wso2.carbon.inbound.solace.SolaceEventListener"
                 sequence="OrderQueueListener-inboundSequence"
                 onError="OrderQueueListener-errorSequence">
    <parameters xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="inbound.behavior">eventBased</parameter>
        <parameter name="sequential">true</parameter>
        <parameter name="coordination">true</parameter>
        <parameter name="suspend">false</parameter>
        <parameter name="solace.host">tcp://localhost:55555</parameter>
        <parameter name="solace.vpnName">default</parameter>
        <parameter name="solace.authenticationScheme">BASIC</parameter>
        <parameter name="solace.username">default</parameter>
        <parameter name="solace.password">default</parameter>
        <parameter name="solace.destinationType">QUEUE</parameter>
        <parameter name="solace.destinationName">Q.orders</parameter>
        <parameter name="solace.contentType">application/json</parameter>
        <parameter name="solace.autoAck">false</parameter>
        <parameter name="solace.failureOutcome">FAILED</parameter>
        <parameter name="solace.subAckWindowSize">255</parameter>
    </parameters>
</inboundEndpoint>
```

A direct topic subscriber (the request-reply replier):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<inboundEndpoint name="SeatRequestListener"
                 class="org.wso2.carbon.inbound.solace.SolaceEventListener"
                 sequence="SeatRequestListener-inboundSequence"
                 onError="SeatRequestListener-errorSequence">
    <parameters xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="inbound.behavior">eventBased</parameter>
        <parameter name="sequential">true</parameter>
        <parameter name="coordination">true</parameter>
        <parameter name="solace.host">tcp://localhost:55555</parameter>
        <parameter name="solace.vpnName">default</parameter>
        <parameter name="solace.authenticationScheme">BASIC</parameter>
        <parameter name="solace.username">default</parameter>
        <parameter name="solace.password">default</parameter>
        <parameter name="solace.destinationType">TOPIC</parameter>
        <parameter name="solace.subscriptionType">DIRECT</parameter>
        <parameter name="solace.destinationName">airline/request/seats/></parameter>
        <parameter name="solace.contentType">application/json</parameter>
    </parameters>
</inboundEndpoint>
```
