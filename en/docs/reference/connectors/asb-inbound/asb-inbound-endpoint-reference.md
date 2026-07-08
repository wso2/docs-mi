# Azure Service Bus Inbound Endpoint Reference

The following sections provide a detailed reference for the Azure Service Bus Inbound Endpoint in WSO2 Micro Integrator. This event-based inbound endpoint connects to an Azure Service Bus namespace and consumes messages from a queue or a topic subscription, injecting each message into a mediation sequence.

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
        <li><b>PEEK_LOCK</b> — the message is locked on the broker while the sequence processes it. The message must be explicitly settled using the Azure Service Bus connector's <b>Message Settlement (Only For Event Integration)</b> operations.</li>
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
    <td><code>maxConcurrentMessages</code></td>
    <td>Maximum number of messages processed concurrently. Ignored when <code>sessionEnabled</code> is <code>true</code>.</td>
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
    <td><code>maxConcurrentMessagesPerSession</code></td>
    <td>Maximum number of messages processed concurrently within a single session. Set to <code>1</code> to preserve message ordering within a session. Only used when <code>sessionEnabled</code> is <code>true</code>.</td>
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

**`headers`** — messaging headers and application properties:

| Key | Description |
| --- | ----------- |
| `messageId` | Message id. |
| `correlationId` | Correlation id. |
| `contentType` | Message content type. |
| `subject` | Message subject/label. |
| `replyTo` | Reply-to address. |
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
    "partitionKey": "partition-A"
  },
  "headers": {
    "messageId": "abc123-def456",
    "correlationId": "corr-789",
    "contentType": "application/json",
    "subject": "order.created",
    "replyTo": "reply-queue",
    "customProperty1": "value1",
    "customProperty2": "value2"
  }
}
```

You can access these values in the mediation flow using variable expressions, for example:

```
${var.asb_inbound.attributes.deliveryCount}
${var.asb_inbound.headers.messageId}
${var.asb_inbound.headers.customProperty1}
```

## Message Settlement

When using `PEEK_LOCK` receive mode, the mediation flow must record a settlement decision using the Azure Service Bus connector's **Message Settlement (Only For Event Integration)** operations. The following settlement actions are available:

| Action | Description |
| ------ | ----------- |
| `complete` | Remove the message from the queue (successful processing). |
| `abandon` | Release the lock so the message is redelivered. |
| `defer` | Defer the message for later retrieval by sequence number. |
| `deadLetter` | Move the message to the dead-letter queue (optionally with a reason and description). |

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
