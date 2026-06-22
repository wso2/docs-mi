# Solace Connector Reference

The following operations allow you to work with the Solace Connector. Click an operation name to see its parameters and notes.

To use the Solace connector, first create a **connection** to the broker, then reference that connection from each operation using the **Connection** (`configKey`) parameter.

!!! note Numeric Parameter Validation
    If a numeric parameter is given an invalid value, the connector logs a warning and falls back to that parameter's default instead of failing the mediation.

---

## Connection configuration

The connection authenticates WSO2 Integrator: MI with the Solace PubSub+ broker and is shared by all operations. In the synapse configuration it is stored as a local entry containing a `<solace.init>` element.

??? note "Connection parameters"
    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>connectionName</td><td>A unique name to identify the connection.</td><td>Yes</td><td>-</td></tr>
        <tr><td>host</td><td>Host URL of the Solace broker, e.g. <code>tcp://localhost:55555</code> or <code>tcps://broker.example.com:55443</code> for TLS.</td><td>Yes</td><td>tcp://localhost:55555</td></tr>
        <tr><td>vpnName</td><td>The Message VPN name.</td><td>Yes</td><td>default</td></tr>
        <tr><td>authenticationScheme</td><td>How the broker authenticates the connection: <code>BASIC</code> (username/password), <code>CLIENT_CERTIFICATE</code> (mutual TLS; username derived from the certificate CN), or <code>OAUTH2</code> (access token / OIDC ID token).</td><td>No</td><td>BASIC</td></tr>
        <tr><td>username</td><td>Username for the broker. Required when <code>authenticationScheme</code> is <code>BASIC</code>.</td><td>Conditional</td><td>-</td></tr>
        <tr><td>password</td><td>Password for the broker. Required when <code>authenticationScheme</code> is <code>BASIC</code>.</td><td>Conditional</td><td>-</td></tr>
        <tr><td>apiProvidedUsername</td><td>Optional. Used only when the VPN is configured with <code>allow-api-provided-username</code>. For <code>CLIENT_CERTIFICATE</code>, leave blank to use the certificate CN; for <code>OAUTH2</code>, leave blank (identity comes from the token).</td><td>No</td><td>-</td></tr>
        <tr><td>oauth2AccessToken</td><td>OAuth2 access token. Used when <code>authenticationScheme</code> is <code>OAUTH2</code>.</td><td>No</td><td>-</td></tr>
        <tr><td>oidcIdToken</td><td>OIDC ID token, used in the OAuth client-role profile. Provide either this, an access token, or both.</td><td>No</td><td>-</td></tr>
        <tr><td>oauth2IssuerIdentifier</td><td>Optional issuer URI to disambiguate when the broker has multiple OAuth profiles.</td><td>No</td><td>-</td></tr>
        <tr><td>clientName</td><td>Unique client name for the session. Auto-generated if not provided.</td><td>No</td><td>-</td></tr>
        <tr><td>connectionTimeout</td><td>Connection timeout in milliseconds.</td><td>No</td><td>30000</td></tr>
        <tr><td>readTimeout</td><td>Read timeout in milliseconds.</td><td>No</td><td>10000</td></tr>
        <tr><td>connectRetries</td><td>Number of initial connection retry attempts.</td><td>No</td><td>3</td></tr>
        <tr><td>connectRetriesPerHost</td><td>Number of connection retries per host.</td><td>No</td><td>0</td></tr>
        <tr><td>reconnectRetries</td><td>Number of reconnection retry attempts after a connection loss.</td><td>No</td><td>3</td></tr>
        <tr><td>reconnectRetryWait</td><td>Wait time between reconnection retries in milliseconds.</td><td>No</td><td>3000</td></tr>
        <tr><td>compressionLevel</td><td>Compression level (0-9). 0 disables compression.</td><td>No</td><td>0</td></tr>
    </table>

    **SSL/TLS Security** (used with <code>tcps://</code> hosts)

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>sslTrustStorePath</td><td>Path to the trust store containing CA certificates used to validate the broker.</td><td>No</td><td>-</td></tr>
        <tr><td>sslTrustStorePassword</td><td>Password for the trust store.</td><td>No</td><td>-</td></tr>
        <tr><td>sslTrustStoreFormat</td><td>Trust store format (<code>JKS</code> or <code>PKCS12</code>).</td><td>No</td><td>JKS</td></tr>
        <tr><td>sslKeyStorePath</td><td>Path to the key store containing the client certificate and private key (for <code>CLIENT_CERTIFICATE</code> / mutual TLS).</td><td>Conditional</td><td>-</td></tr>
        <tr><td>sslKeyStorePassword</td><td>Password for the key store.</td><td>No</td><td>-</td></tr>
        <tr><td>sslKeyStoreFormat</td><td>Key store format (<code>JKS</code> or <code>PKCS12</code>).</td><td>No</td><td>JKS</td></tr>
        <tr><td>sslKeyPassword</td><td>Password for the private key.</td><td>No</td><td>-</td></tr>
        <tr><td>sslValidateCertificate</td><td>Whether to validate the broker's certificate against the trust store. Set <code>false</code> only for self-signed brokers in dev/lab; disabling it removes protection against man-in-the-middle attacks, so never do so in production.</td><td>No</td><td>true</td></tr>
        <tr><td>sslValidateCertificateDate</td><td>Whether to validate the certificate expiration date.</td><td>No</td><td>true</td></tr>
        <tr><td>sslValidateHostname</td><td>Whether to verify that the broker certificate's hostname matches the host you connect to. Disabling it defeats man-in-the-middle protection, so never do so in production.</td><td>No</td><td>true</td></tr>
    </table>

    `sslValidateCertificateDate` and `sslValidateHostname` apply only when `sslValidateCertificate` is enabled.

    Secure Vault is supported for `password`, `oauth2AccessToken`, `oidcIdToken`, `sslTrustStorePassword`, `sslKeyStorePassword`, and `sslKeyPassword`; each accepts a plain value or a vault expression.

    **Advanced Message Options**

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>generateSendTimestamps</td><td>Automatically generate send timestamps on messages.</td><td>No</td><td>false</td></tr>
        <tr><td>generateSequenceNumbers</td><td>Automatically generate sequence numbers on messages.</td><td>No</td><td>false</td></tr>
        <tr><td>calculateMessageExpiration</td><td>Calculate message expiration based on TTL.</td><td>No</td><td>false</td></tr>
    </table>

    **Sample connection (local entry)**

    ```xml
    <localEntry key="SOLACE_CONNECTION" xmlns="http://ws.apache.org/ns/synapse">
      <solace.init>
        <connectionType>SOLACE</connectionType>
        <host>tcp://localhost:55555</host>
        <vpnName>default</vpnName>
        <authenticationScheme>BASIC</authenticationScheme>
        <username>default</username>
        <password>default</password>
        <clientName>wso2mi-client</clientName>
        <name>SOLACE_CONNECTION</name>
      </solace.init>
    </localEntry>
    ```

---

## Publish and request-reply operations

### publishMessage

??? note "publishMessage"
    Publishes a message to a topic or queue. Use `DIRECT` delivery for best-effort topic pub/sub, or `PERSISTENT`/`NON_PERSISTENT` for guaranteed delivery (required for queues).

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>configKey</td><td>The Solace connection to use.</td><td>Yes</td><td>-</td></tr>
        <tr><td>destinationType</td><td><code>TOPIC</code> or <code>QUEUE</code>.</td><td>Yes</td><td>TOPIC</td></tr>
        <tr><td>destinationName</td><td>Name of the topic or queue to publish to.</td><td>Yes</td><td>-</td></tr>
        <tr><td>messageType</td><td><code>TEXT</code>, <code>BYTES</code>, or <code>XML</code>. JSON payloads are auto-detected and carried as TEXT.</td><td>No</td><td>TEXT</td></tr>
        <tr><td>deliveryMode</td><td><code>DIRECT</code> (TOPIC only), <code>PERSISTENT</code>, or <code>NON_PERSISTENT</code>. Queues require PERSISTENT or NON_PERSISTENT.</td><td>No</td><td>DIRECT</td></tr>
        <tr><td>correlationId</td><td>Optional trace ID echoed by any consumer that replies.</td><td>No</td><td>-</td></tr>
        <tr><td>priority</td><td>Message priority (0-255).</td><td>No</td><td>0</td></tr>
        <tr><td>timeToLive</td><td>Time to live in milliseconds.</td><td>No</td><td>0</td></tr>
        <tr><td>applicationMessageId</td><td>Application-defined message ID.</td><td>No</td><td>-</td></tr>
        <tr><td>applicationMessageType</td><td>Application-defined message type.</td><td>No</td><td>-</td></tr>
        <tr><td>replyToDestinationType</td><td>For asynchronous reply-to: <code>TOPIC</code> or <code>QUEUE</code> where consumers should send replies.</td><td>No</td><td>QUEUE</td></tr>
        <tr><td>replyToDestinationName</td><td>Pre-existing destination where replies should arrive. For synchronous request-reply use <code>sendRequest</code> instead.</td><td>No</td><td>-</td></tr>
        <tr><td>userProperties</td><td>Key-value pairs attached to the message for content-based routing and filtering.</td><td>No</td><td>-</td></tr>
        <tr><td>dmqEligible</td><td>Whether the message is eligible for the Dead Message Queue if it cannot be delivered.</td><td>No</td><td>true</td></tr>
        <tr><td>elidingEligible</td><td>Whether the message is eligible for eliding (broker may discard intermediate topic messages).</td><td>No</td><td>false</td></tr>
        <tr><td>waitForAck</td><td>Block for the broker ACK before returning. Applies only to PERSISTENT / NON_PERSISTENT delivery. Outcome exposed via <code>solace.ack.status</code> (ACK | NACK | TIMEOUT).</td><td>No</td><td>false</td></tr>
        <tr><td>ackTimeout</td><td>Max time in milliseconds to wait for the broker ACK when <code>waitForAck</code> is enabled.</td><td>No</td><td>10000</td></tr>
        <tr><td>continueOnAckFailure</td><td>When enabled, a NACK or ACK timeout does not throw; inspect <code>solace.ack.status</code> to branch. When disabled, failures go to the fault sequence.</td><td>No</td><td>false</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the publish result JSON is stored.</td><td>No</td><td>solacePublishResponse</td></tr>
    </table>

    Returns a status object in the response variable ('${vars.<responseVariable>.payload}') and operation does not overwrite the message body.

    **Response fields:** `destination`, `destinationType`, `deliveryMode`, `messageType`, `ackStatus`, `ackReceived`, `correlationKey`, `error`, `publishedAt`.

    **Sample configuration**

    ```xml
    <solace.publishMessage configKey="SOLACE_CONNECTION">
        <destinationType>QUEUE</destinationType>
        <destinationName>Q.orders</destinationName>
        <messageType>TEXT</messageType>
        <deliveryMode>PERSISTENT</deliveryMode>
        <correlationId>{${payload.orderId}}</correlationId>
        <waitForAck>true</waitForAck>
        <ackTimeout>5000</ackTimeout>
        <responseVariable>solacePublishResponse</responseVariable>
    </solace.publishMessage>
    ```

### sendRequest

??? note "sendRequest"
    Sends a request message and blocks until a reply is received on a temporary reply-to destination, or until the request times out (synchronous request-reply, requestor side).

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>configKey</td><td>The Solace connection to use.</td><td>Yes</td><td>-</td></tr>
        <tr><td>destinationType</td><td><code>TOPIC</code> or <code>QUEUE</code>.</td><td>Yes</td><td>TOPIC</td></tr>
        <tr><td>destinationName</td><td>Name of the topic or queue to send the request to.</td><td>Yes</td><td>-</td></tr>
        <tr><td>messageType</td><td><code>TEXT</code>, <code>BYTES</code>, or <code>XML</code>.</td><td>No</td><td>TEXT</td></tr>
        <tr><td>requestTimeout</td><td>Maximum time to wait for a response in milliseconds.</td><td>No</td><td>30000</td></tr>
        <tr><td>deliveryMode</td><td><code>DIRECT</code> (TOPIC only), <code>PERSISTENT</code>, or <code>NON_PERSISTENT</code>.</td><td>No</td><td>DIRECT</td></tr>
        <tr><td>applicationMessageId</td><td>Application-defined message ID.</td><td>No</td><td>-</td></tr>
        <tr><td>applicationMessageType</td><td>Application-defined message type.</td><td>No</td><td>-</td></tr>
        <tr><td>userProperties</td><td>Key-value pairs attached to the message.</td><td>No</td><td>-</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the reply is stored.</td><td>No</td><td>solaceResponse</td></tr>
        <tr><td>overwriteBody</td><td>Replace the message body with the reply.</td><td>No</td><td>false</td></tr>
    </table>

    **Sample configuration**

    ```xml
    <solace.sendRequest configKey="SOLACE_CONNECTION">
        <destinationType>TOPIC</destinationType>
        <destinationName>{${"airline/request/seats/" + payload.flightNo}}</destinationName>
        <messageType>TEXT</messageType>
        <deliveryMode>DIRECT</deliveryMode>
        <requestTimeout>30000</requestTimeout>
        <responseVariable>solaceResponse</responseVariable>
        <overwriteBody>true</overwriteBody>
    </solace.sendRequest>
    ```

### sendReply

??? note "sendReply"
    Sends a reply to an inbound request message, using the reply-to destination and correlation ID taken from the current message context. Call this from a sequence driven by the Solace Inbound Endpoint (the replier side of request-reply).

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>configKey</td><td>The Solace connection to use.</td><td>Yes</td><td>-</td></tr>
        <tr><td>deliveryMode</td><td><code>DIRECT</code>, <code>PERSISTENT</code>, or <code>NON_PERSISTENT</code>.</td><td>No</td><td>DIRECT</td></tr>
        <tr><td>messageType</td><td><code>TEXT</code>, <code>BYTES</code>, or <code>XML</code>.</td><td>No</td><td>TEXT</td></tr>
        <tr><td>applicationMessageType</td><td>Application-defined message type.</td><td>No</td><td>-</td></tr>
        <tr><td>userProperties</td><td>Key-value pairs attached to the reply.</td><td>No</td><td>-</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the operation result is stored.</td><td>No</td><td>solaceResponse</td></tr>
    </table>

    Returns a status object in the response variable and operation does not overwrite the message body.

    **Sample configuration**

    ```xml
    <solace.sendReply configKey="SOLACE_CONNECTION">
        <deliveryMode>DIRECT</deliveryMode>
        <messageType>TEXT</messageType>
        <applicationMessageType>SEAT_QUERY_REPLY</applicationMessageType>
        <responseVariable>solaceResponse</responseVariable>
    </solace.sendReply>
    ```

---

## Queue consumption operations

### poll

??? note "poll"
    Synchronously polls a single message from a queue. Returns null on timeout.

    Settlement: outside a transaction, the message is acknowledged on receipt (at-most-once). Inside `beginTransaction`/`commit`, settlement is deferred: `commit` acknowledges the message, `rollback` redelivers it (at-least-once). Manual ack/nack of polled messages is not supported.

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>configKey</td><td>The Solace connection to use.</td><td>Yes</td><td>-</td></tr>
        <tr><td>queueName</td><td>Name of the queue to poll.</td><td>Yes</td><td>-</td></tr>
        <tr><td>pollTimeout</td><td>Maximum time to wait for a message in milliseconds.</td><td>No</td><td>5000</td></tr>
        <tr><td>selector</td><td>Optional SQL-92 selector expression for filtering on headers and user properties, e.g. <code>region = 'EU' AND priority > 5</code>.</td><td>No</td><td>-</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the result JSON is stored.</td><td>No</td><td>solacePollResponse</td></tr>
        <tr><td>overwriteBody</td><td>Replace the message body with the polled payload.</td><td>No</td><td>false</td></tr>
    </table>

    **Response fields:** `destination`, `received`, `timedOut`, `messageId`, `correlationId`, `payload`, `contentType`.

    **Sample configuration**

    ```xml
    <solace.poll configKey="SOLACE_CONNECTION">
        <queueName>Q.orders</queueName>
        <pollTimeout>5000</pollTimeout>
        <responseVariable>solacePollResponse</responseVariable>
        <overwriteBody>true</overwriteBody>
    </solace.poll>
    ```

### browse

??? note "browse"
    Browses messages on a queue without consuming them. Live consumers continue to see the same messages.

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>configKey</td><td>The Solace connection to use.</td><td>Yes</td><td>-</td></tr>
        <tr><td>queueName</td><td>Name of the queue to browse.</td><td>Yes</td><td>-</td></tr>
        <tr><td>maxMessages</td><td>Maximum number of messages to return.</td><td>No</td><td>10</td></tr>
        <tr><td>browseTimeout</td><td>Maximum time to wait per message read in milliseconds. Browse stops once no message arrives within this window.</td><td>No</td><td>2000</td></tr>
        <tr><td>selector</td><td>Optional SQL-92 selector expression for filtering on headers and user properties.</td><td>No</td><td>-</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the result JSON is stored.</td><td>No</td><td>solaceBrowseResponse</td></tr>
        <tr><td>overwriteBody</td><td>Browse returns messages via the response variable; this flag is unused.</td><td>No</td><td>false</td></tr>
    </table>

    **Response fields:** `destination`, `messageCount`, `messages` (array of message summaries with payload and headers).

    **Sample configuration**

    ```xml
    <solace.browse configKey="SOLACE_CONNECTION">
        <queueName>Q.orders</queueName>
        <maxMessages>10</maxMessages>
        <browseTimeout>2000</browseTimeout>
        <responseVariable>solaceBrowseResponse</responseVariable>
        <overwriteBody>true</overwriteBody>
    </solace.browse>
    ```

---

## Guaranteed message settlement operations

These operations settle a message that was delivered by the **Solace Inbound Endpoint**. They require the inbound endpoint to be configured with `solace.autoAck=false`, and must be called from the inbound's mediation sequence.

### acknowledgeMessage

??? note "acknowledgeMessage"
    Acknowledges the inbound message so the broker can remove it from the queue (successful processing).

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>description</td><td>Optional description of the operation.</td><td>No</td><td>-</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the operation result is stored.</td><td>No</td><td>solaceAckResponse</td></tr>
    </table>

    Returns a status object in the response variable and operation does not overwrite the message body.

    **Sample configuration**

    ```xml
    <solace.acknowledgeMessage>
        <responseVariable>solaceAckResponse</responseVariable>
    </solace.acknowledgeMessage>
    ```

### nackMessage

??? note "nackMessage"
    Negatively acknowledges the inbound message. The inbound endpoint must declare the required settlement outcomes (FAILED, REJECTED) on its consumer flow.

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>outcomeType</td><td><code>FAILED</code> (broker redelivers, subject to max-redelivery, then DMQ) or <code>REJECTED</code> (broker routes immediately to the DMQ, otherwise discards).</td><td>Yes</td><td>FAILED</td></tr>
        <tr><td>description</td><td>Optional description of the operation.</td><td>No</td><td>-</td></tr>
        <tr><td>responseVariable</td><td>Variable name where the operation result is stored.</td><td>No</td><td>solaceNackResponse</td></tr>
    </table>

    Returns a status object in the response variable and operation does not overwrite the message body.

    **Sample configuration**

    ```xml
    <solace.nackMessage>
        <outcomeType>REJECTED</outcomeType>
        <responseVariable>solaceNackResponse</responseVariable>
    </solace.nackMessage>
    ```

---

## Local transaction operations

Group multiple `publishMessage` calls (and deferred settlement of `poll`) into a single atomic unit. Start with `beginTransaction`, then end with `commit` or `rollback`.

### beginTransaction

??? note "beginTransaction"
    Starts a new local transaction on the Solace connection. Subsequent `publishMessage`/`poll` calls participate atomically.

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>configKey</td><td>The Solace connection to use.</td><td>Yes</td><td>-</td></tr>
        <tr><td>transactionTimeoutMillis</td><td>Auto-rollback after this many milliseconds if commit/rollback is not reached. Prevents leaks from forgotten or faulted sequences.</td><td>No</td><td>60000</td></tr>
    </table>

    **Sample configuration**

    ```xml
    <solace.beginTransaction configKey="SOLACE_CONNECTION">
        <transactionTimeoutMillis>30000</transactionTimeoutMillis>
    </solace.beginTransaction>
    ```

### commit

??? note "commit"
    Commits the current local transaction, finalizing all publishes and deferred settlements made during the transaction.

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>description</td><td>Optional description of the operation.</td><td>No</td><td>-</td></tr>
    </table>

    **Sample configuration**

    ```xml
    <solace.commit/>
    ```

### rollback

??? note "rollback"
    Rolls back the current local transaction, discarding all publishes and redelivering any deferred-settlement messages.

    <table>
        <tr><th>Parameter</th><th>Description</th><th>Required</th><th>Default</th></tr>
        <tr><td>description</td><td>Optional description of the operation.</td><td>No</td><td>-</td></tr>
    </table>

    **Sample configuration**

    ```xml
    <solace.rollback/>
    ```
