# Azure Service Bus Inbound Endpoint Reference

The following sections provide a detailed reference for the Azure Service Bus Inbound Endpoint in WSO2 Micro Integrator. This event-based inbound endpoint connects to an Azure Service Bus namespace and consumes messages from a queue or a topic subscription, injecting each message into a mediation sequence.

## Compatibility

| Connector Version | Supported Product Versions | Supported Java Versions |
|-------------------|----------------------------|-------------------------|
| 0.9.0             | MI 4.4.0+                  | Java 17+                |

## Sample Configuration

```xml
   <inboundEndpoint name="asbQueueListener" class="org.wso2.carbon.inbound.asb.ASBEventConsumer" sequence="asbQueueListener-inboundSequence" onError="asbQueueListener-inboundErrorSequence" suspend="false">
      <parameters xmlns="http://ws.apache.org/ns/synapse">
         <parameter name="inbound.behavior">eventBased</parameter>
         <parameter name="connectionString">Endpoint=sb://YOUR_NAMESPACE.servicebus.windows.net/;SharedAccessKeyName=YOUR_KEY_NAME;SharedAccessKey=YOUR_KEY</parameter>
         <parameter name="entityType">queue</parameter>
         <parameter name="queueName">orders</parameter>
         <parameter name="sessionEnabled">false</parameter>
         <parameter name="coordination">true</parameter>
         <parameter name="inboundVariableName">asb_inbound</parameter>
         <parameter name="receiveMode">PEEK_LOCK</parameter>
         <parameter name="maxConcurrentConsumers">1</parameter>
         <parameter name="prefetchCount">0</parameter>
         <parameter name="maxLockDurationMs">300000</parameter>
         <parameter name="messageProcessingTimeoutMs">240000</parameter>
         <parameter name="maxRetries">3</parameter>
         <parameter name="retryDelayMs">1000</parameter>
         <parameter name="retryMaxDelayMs">30000</parameter>
         <parameter name="tryTimeoutMs">60000</parameter>
      </parameters>
   </inboundEndpoint>
```

## Connection Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td><code>connectionString</code></td>
    <td>Azure Service Bus connection string used to authenticate to the namespace. Obtain this from the Azure portal under <b>Shared Access Policies</b>.</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>entityType</code></td>
    <td>Type of Service Bus entity to consume from. <b>Possible values</b>: <code>queue</code>, <code>topic</code>.</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>queueName</code></td>
    <td>Name of the queue to consume from. Required when <code>entityType</code> is <code>queue</code>.</td>
    <td>Conditional</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>topicName</code></td>
    <td>Name of the topic to consume from. Required when <code>entityType</code> is <code>topic</code>.</td>
    <td>Conditional</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>subscriptionName</code></td>
    <td>Name of the topic subscription to consume from. Required when <code>entityType</code> is <code>topic</code>.</td>
    <td>Conditional</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>contentType</code></td>
    <td>Content type used for building the message payload (e.g., <code>application/json</code>, <code>application/xml</code>). Takes priority over the message's own content type. If neither is set, the SOAP builder is used.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>coordination</code></td>
    <td>In a clustered setup, runs the inbound endpoint only on a single worker node.</td>
    <td>No</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>inboundVariableName</code></td>
    <td>Name of the variable that holds the structured message data (attributes and headers). Accessible in the mediation flow via this variable name.</td>
    <td>No</td>
    <td><code>asb_inbound</code></td>
  </tr>
</table>

## Consumer Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td><code>receiveMode</code></td>
    <td>Message receive mode.<br>
      <ul>
        <li><b>PEEK_LOCK</b> — the message is locked on the broker while the sequence processes it. The message must be explicitly settled in the mediation sequence using the Azure Service Bus connector's <a href="{{base_path}}/reference/connectors/asb-connector/asb-connector-reference/#message-settlement-only-for-event-integration">Message Settlement (Only For Event Integration)</a> operations.</li>
        <li><b>RECEIVE_AND_DELETE</b> — the message is deleted from the broker as soon as it is received. No settlement is performed.</li>
      </ul>
    </td>
    <td>No</td>
    <td><code>PEEK_LOCK</code></td>
  </tr>
  <tr>
    <td><code>sessionEnabled</code></td>
    <td>Set to <code>true</code> if the target queue or topic subscription is session-enabled.</td>
    <td>No</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>maxConcurrentConsumers</code></td>
    <td>Maximum number of concurrent consumers processing messages. Ignored when <code>sessionEnabled</code> is <code>true</code>.</td>
    <td>No</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>maxConcurrentSessions</code></td>
    <td>Maximum number of sessions processed concurrently. Only used when <code>sessionEnabled</code> is <code>true</code>.</td>
    <td>No</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>maxConcurrentConsumersPerSession</code></td>
    <td>Maximum number of concurrent consumers processing messages within a single session. Set to <code>1</code> to preserve message ordering within a session. Only used when <code>sessionEnabled</code> is <code>true</code>.</td>
    <td>No</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>sessionIdleTimeoutMs</code></td>
    <td>Maximum time (ms) to wait for a message on an idle session before releasing the session lock and acquiring the next available session. Only used when <code>sessionEnabled</code> is <code>true</code>.</td>
    <td>No</td>
    <td><code>60000</code></td>
  </tr>
  <tr>
    <td><code>prefetchCount</code></td>
    <td>Number of messages fetched from the broker and buffered locally. Higher values improve throughput but use more memory. <code>0</code> disables prefetching.</td>
    <td>No</td>
    <td><code>0</code></td>
  </tr>
  <tr>
    <td><code>maxLockDurationMs</code></td>
    <td>Maximum duration (ms) to keep the message lock alive during processing. The lock is auto-renewed in the background until this duration is reached. PEEK_LOCK mode only.</td>
    <td>No</td>
    <td><code>300000</code></td>
  </tr>
  <tr>
    <td><code>messageProcessingTimeoutMs</code></td>
    <td>Maximum time (ms) to wait for a message to be fully processed (settled) before timing out. Should be lower than <code>maxLockDurationMs</code>. On timeout, the lock expires and the message is redelivered. PEEK_LOCK mode only.</td>
    <td>No</td>
    <td><code>240000</code></td>
  </tr>
</table>

!!! note
    Use `prefetchCount` cautiously in `RECEIVE_AND_DELETE` mode. Prefetched messages are removed from the broker immediately, so if the consumer stops or fails before processing them, those messages are lost.

!!! note "Session-enabled entity behavior"
    When `sessionEnabled` is `true`:

    - The processor acquires sessions and processes all available messages in each session. After the last message, it waits `sessionIdleTimeoutMs` for new messages before releasing the session and acquiring the next one.
    - With `maxConcurrentSessions` set to `n`, only `n` sessions are held at a time — remaining sessions wait until a slot is released.
    - To reduce starvation across many sessions, increase `maxConcurrentSessions` and lower `sessionIdleTimeoutMs`.
    - To preserve message ordering within a session, keep `maxConcurrentConsumersPerSession` set to `1`.

## Resilience Parameters

These map to the Azure AMQP retry options (exponential backoff) and apply to transient connection or network failures.

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td><code>maxRetries</code></td>
    <td>Maximum number of retry attempts for transient failures.</td>
    <td>No</td>
    <td><code>3</code></td>
  </tr>
  <tr>
    <td><code>retryDelayMs</code></td>
    <td>Initial delay (ms) between retries. Increases exponentially up to <code>retryMaxDelayMs</code>.</td>
    <td>No</td>
    <td><code>1000</code></td>
  </tr>
  <tr>
    <td><code>retryMaxDelayMs</code></td>
    <td>Maximum delay (ms) between retries.</td>
    <td>No</td>
    <td><code>30000</code></td>
  </tr>
  <tr>
    <td><code>tryTimeoutMs</code></td>
    <td>Maximum duration (ms) to wait for a single operation (e.g., receive, settle) before timing out.</td>
    <td>No</td>
    <td><code>60000</code></td>
  </tr>
</table>

## Accessing Message Metadata

Each injected message exposes Service Bus metadata to the mediation flow through a structured variable.

### Structured variable

A variable (default name `asb_inbound`) is set on the message context containing two child maps:

**`attributes`** — ASB-specific message attributes:

| Key | Description |
| --- | ----------- |
| `timeToLive` | Message time-to-live. |
| `deliveryCount` | Number of times the message has been delivered. |
| `enqueuedTime` | Time the message was enqueued. |
| `sequenceNumber` | Broker-assigned sequence number. |
| `sessionId` | Session identifier (set only for session-enabled entities). |
| `partitionKey` | Partition key (set only if present). |
| `to` | The `To` address (set only if present). |
| `deadLetterSource` | Original entity if the message came from a dead-letter queue (set only if present). |
| `lockedUntil` | Time until which the message is locked for processing (set only in PEEK_LOCK mode). |
| `expiresAt` | Time at which the message expires (set only if present). |
| `scheduledEnqueueTime` | Scheduled enqueue time for the message (set only if present). |
| `enqueuedSequenceNumber` | Enqueued sequence number assigned by the broker. |
| `state` | State of the message (e.g., `Active`, `Deferred`, `Scheduled`; set only if present). |
| `deadLetterReason` | Reason the message was dead-lettered (set only if present). |
| `deadLetterErrorDescription` | Error description for why the message was dead-lettered (set only if present). |

**`headers`** — messaging headers and application properties:

| Key | Description |
| --- | ----------- |
| `messageId` | Message id. |
| `correlationId` | Correlation id. |
| `contentType` | Message content type. |
| `subject` | Message subject/label. |
| `replyTo` | Reply-to address. |
| `replyToSessionId` | Reply-to session identifier (set only if present). |
| *(custom keys)* | Any application properties set by the sender. |

**Sample variable value:**

```json
{
  "attributes": {
    "timeToLive": "PT1H",
    "deliveryCount": 1,
    "enqueuedTime": "2026-07-08T10:15:30Z",
    "sequenceNumber": 42,
    "sessionId": "session-001",
    "partitionKey": "partition-A",
    "lockedUntil": "2026-07-08T10:16:30Z",
    "expiresAt": "2026-07-08T11:15:30Z",
    "enqueuedSequenceNumber": 42
  },
  "headers": {
    "messageId": "abc123-def456",
    "correlationId": "corr-789",
    "contentType": "application/json",
    "subject": "order.created",
    "replyTo": "reply-queue",
    "replyToSessionId": "reply-session-001",
    "customProperty1": "value1",
    "customProperty2": "value2"
  }
}
```

You can access these values in the mediation flow using variable expressions, for example:

```
${vars.asb_inbound.attributes.deliveryCount}
${vars.asb_inbound.headers.messageId}
${vars.asb_inbound.headers.customProperty1}
```

## Message Settlement

When using `PEEK_LOCK` receive mode, the mediation flow must record a settlement decision before processing completes. This is done using the [Azure Service Bus Connector's]({{base_path}}/reference/connectors/asb-connector/asb-connector-reference/) **Message Settlement (Only For Event Integration)** operations. The inbound endpoint and connector work together — the inbound endpoint receives the message and injects it into the sequence, and the connector's settlement operations (placed within the same sequence) communicate the settlement decision back to the inbound endpoint, which then settles the message with the broker.

To use settlement, add the [Azure Service Bus Connector](https://store.wso2.com/connector/mi-connector-asb) to your project and place the appropriate settlement operation in your mediation sequence:

| Operation | Description |
| --------- | ----------- |
| `asb.consumer_complete` | Remove the message from the queue (successful processing). |
| `asb.consumer_abandon` | Release the lock so the message is redelivered. |
| `asb.consumer_defer` | Defer the message for later retrieval by sequence number. |
| `asb.consumer_deadLetter` | Move the message to the dead-letter queue (optionally with a reason and description). |

Example sequence with settlement:

```xml
<sequence name="request" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
   <log category="INFO" logMessageID="false" logFullPayload="true">
      <message>messageId: ${vars.asb_inbound.headers.messageId}</message>
   </log>
   <asb.consumer_complete>
      <responseVariable>asb_consumer_complete_1</responseVariable>
      <overwriteBody>false</overwriteBody>
   </asb.consumer_complete>
</sequence>
```

If the sequence does not record a decision before `messageProcessingTimeoutMs` elapses, the lock expires and the message is redelivered by Azure. Azure enforces the entity's max delivery count, after which repeatedly un-settled messages are dead-lettered automatically.

In `RECEIVE_AND_DELETE` mode, settlement is not required and these operations are ignored.

## Logging Configuration

The Azure Service Bus SDK produces verbose logs at `INFO` and `DEBUG` levels, and may emit `ERROR`-level stack traces during normal idle connection lifecycle events. To keep your logs clean, add the following entries to MI's `log4j2.properties` file (located in `<MI_HOME>/conf/`):

```properties
# Suppress verbose Azure SDK logs (default level is INFO which is very noisy)
logger.Azure.name = com.azure
logger.Azure.level = WARN
```

Also add `Azure` to the `loggers` list in the same file:

```properties
loggers = Azure, ..., <existing loggers>
```
