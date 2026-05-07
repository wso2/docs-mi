# Azure Service Bus Connector Reference

This documentation provides a reference guide for the Azure Service Bus Connector. The Azure Service Bus connector enables you to connect to an Azure Service Bus namespace and perform administration, message sending, and message receiving operations. Click an operation name to see parameter details and samples on how to use it.

## Connection Configurations

The Azure Service Bus Connector supports three connection types, each corresponding to a different client: **Administrator**, **MessageSender**, and **MessageReceiver**. Each connection type requires its own initialization configuration.

---

### Administrator Connection

??? note "Administrator"
    The Administrator connection allows you to manage Azure Service Bus resources such as queues, topics, subscriptions, and rules.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>connectionName</td>
        <td>Connection Name</td>
        <td>A unique name to identify this connection.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>connectionString</td>
        <td>Connection String</td>
        <td>The connection string for the Azure Service Bus namespace. Obtain this from the Azure portal under Shared Access Policies.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.init>
        <connectionType>ADMINISTRATOR</connectionType>
        <name>asbAdminConnection</name>
        <connectionString>Endpoint=sb://my-namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xxxxxxxx</connectionString>
    </asb.init>
    ```

---

### MessageSender Connection

??? note "MessageSender"
    The MessageSender connection allows you to send messages to a specific queue or topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>connectionName</td>
        <td>Connection Name</td>
        <td>A unique name to identify this connection.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>connectionString</td>
        <td>Connection String</td>
        <td>The connection string for the Azure Service Bus namespace.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>entityType</td>
        <td>Entity Type</td>
        <td>The type of Service Bus entity to send messages to. <b>Possible values</b>: <code>QUEUE</code>, <code>TOPIC</code>.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>topicOrQueueName</td>
        <td>Topic or Queue Name</td>
        <td>The name of the queue or topic to send messages to.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">AMQP Retry Options</th>
    </tr>
    <tr>
        <td>amqpRetryOptions_maxRetries</td>
        <td>Max Retries</td>
        <td>The maximum number of retry attempts.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_delay</td>
        <td>Delay</td>
        <td>The initial delay between retry attempts in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_maxDelay</td>
        <td>Max Delay</td>
        <td>The maximum delay between retry attempts in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_tryTimeout</td>
        <td>Try Timeout</td>
        <td>The timeout per retry attempt in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_retryMode</td>
        <td>Retry Mode</td>
        <td>The retry mode to use. <b>Possible values</b>: <code>EXPONENTIAL</code>, <code>FIXED</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.init>
        <connectionType>MESSAGE_SENDER</connectionType>
        <name>asbSenderConnection</name>
        <connectionString>Endpoint=sb://my-namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xxxxxxxx</connectionString>
        <entityType>QUEUE</entityType>
        <topicOrQueueName>myQueue</topicOrQueueName>
    </asb.init>
    ```

---

### MessageReceiver Connection

??? note "MessageReceiver"
    The MessageReceiver connection allows you to receive messages from a specific queue or topic subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>connectionName</td>
        <td>Connection Name</td>
        <td>A unique name to identify this connection.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>connectionString</td>
        <td>Connection String</td>
        <td>The connection string for the Azure Service Bus namespace.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>entityConfigDataType</td>
        <td>Entity Config Type</td>
        <td>The type of entity to receive messages from. <b>Possible values</b>: <code>TopicSubsConfig</code> (for topic subscriptions), <code>QueueConfig</code> (for queues).</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Topic Subscription Configuration (when entityConfigDataType is TopicSubsConfig)</th>
    </tr>
    <tr>
        <td>entityConfig_topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to receive messages from.</td>
        <td>Yes (for TopicSubsConfig)</td>
        <td>-</td>
    </tr>
    <tr>
        <td>entityConfig_subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to receive messages from.</td>
        <td>Yes (for TopicSubsConfig)</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Queue Configuration (when entityConfigDataType is QueueConfig)</th>
    </tr>
    <tr>
        <td>entityConfig_queueName</td>
        <td>Queue Name</td>
        <td>The name of the queue to receive messages from.</td>
        <td>Yes (for QueueConfig)</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Receive Options</th>
    </tr>
    <tr>
        <td>receiveMode</td>
        <td>Receive Mode</td>
        <td>The mode for receiving messages. <b>Possible values</b>:
        <ul>
            <li><b>PEEK_LOCK</b>: Messages are locked for the receiver but not removed from the queue. The receiver must complete, abandon, defer, or dead-letter the message.</li>
            <li><b>RECEIVE_AND_DELETE</b>: Messages are immediately removed from the queue upon receipt.</li>
        </ul>
        </td>
        <td>No</td>
        <td>PEEK_LOCK</td>
    </tr>
    <tr>
        <td>maxAutoLockRenewDuration</td>
        <td>Max Auto Lock Renew Duration</td>
        <td>The maximum duration (in seconds) for automatically renewing message locks.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">AMQP Retry Options</th>
    </tr>
    <tr>
        <td>amqpRetryOptions_maxRetries</td>
        <td>Max Retries</td>
        <td>The maximum number of retry attempts.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_delay</td>
        <td>Delay</td>
        <td>The initial delay between retry attempts in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_maxDelay</td>
        <td>Max Delay</td>
        <td>The maximum delay between retry attempts in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_tryTimeout</td>
        <td>Try Timeout</td>
        <td>The timeout per retry attempt in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>amqpRetryOptions_retryMode</td>
        <td>Retry Mode</td>
        <td>The retry mode to use. <b>Possible values</b>: <code>EXPONENTIAL</code>, <code>FIXED</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    </table>

    **Sample configuration (Queue)**

    ```xml
    <asb.init>
        <connectionType>MESSAGE_RECEIVER</connectionType>
        <name>asbReceiverConnection</name>
        <connectionString>Endpoint=sb://my-namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xxxxxxxx</connectionString>
        <entityConfigDataType>QueueConfig</entityConfigDataType>
        <entityConfig_queueName>myQueue</entityConfig_queueName>
        <receiveMode>PEEK_LOCK</receiveMode>
    </asb.init>
    ```

    **Sample configuration (Topic Subscription)**

    ```xml
    <asb.init>
        <connectionType>MESSAGE_RECEIVER</connectionType>
        <name>asbReceiverConnection</name>
        <connectionString>Endpoint=sb://my-namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xxxxxxxx</connectionString>
        <entityConfigDataType>TopicSubsConfig</entityConfigDataType>
        <entityConfig_topicName>myTopic</entityConfig_topicName>
        <entityConfig_subscriptionName>mySubscription</entityConfig_subscriptionName>
        <receiveMode>PEEK_LOCK</receiveMode>
    </asb.init>
    ```

---

## Operations

The following operations allow you to work with the Azure Service Bus Connector. Click an operation name to see parameter details and samples on how to use it.

### Administrator Operations

The following operations require an **Administrator** connection.

#### Queue Operations

??? note "createQueue"
    Creates a new queue in the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>queueName</td>
        <td>Queue Name</td>
        <td>The name of the queue to create.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Queue Options</th>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_seconds</td>
        <td>Auto Delete On Idle (Seconds)</td>
        <td>The idle interval after which the queue is automatically deleted (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_nanoseconds</td>
        <td>Auto Delete On Idle (Nanoseconds)</td>
        <td>The idle interval after which the queue is automatically deleted (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_seconds</td>
        <td>Default Message TTL (Seconds)</td>
        <td>The default time-to-live for messages in the queue (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_nanoseconds</td>
        <td>Default Message TTL (Nanoseconds)</td>
        <td>The default time-to-live for messages in the queue (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_seconds</td>
        <td>Duplicate Detection Window (Seconds)</td>
        <td>The duration of the duplicate detection history (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_nanoseconds</td>
        <td>Duplicate Detection Window (Nanoseconds)</td>
        <td>The duration of the duplicate detection history (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_seconds</td>
        <td>Lock Duration (Seconds)</td>
        <td>The lock duration for messages received from the queue (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_nanoseconds</td>
        <td>Lock Duration (Nanoseconds)</td>
        <td>The lock duration for messages received from the queue (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxDeliveryCount</td>
        <td>Max Delivery Count</td>
        <td>The maximum number of delivery attempts before a message is dead-lettered.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxMessageSizeInKilobytes</td>
        <td>Max Message Size (KB)</td>
        <td>The maximum message size in kilobytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxSizeInMegabytes</td>
        <td>Max Size (MB)</td>
        <td>The maximum size of the queue in megabytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>status</td>
        <td>Status</td>
        <td>The status of the queue. <b>Possible values</b>: <code>Active</code>, <code>Disabled</code>, <code>SendDisabled</code>, <code>ReceiveDisabled</code>, <code>Creating</code>, <code>Deleting</code>, <code>Renaming</code>, <code>Restoring</code>, <code>Unknown</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>userMetadata</td>
        <td>User Metadata</td>
        <td>Custom metadata associated with the queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enableBatchedOperations</td>
        <td>Enable Batched Operations</td>
        <td>Whether to enable batched operations on the queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnMessageExpiration</td>
        <td>Dead Lettering On Message Expiration</td>
        <td>Whether to move expired messages to the dead-letter sub-queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresDuplicateDetection</td>
        <td>Requires Duplicate Detection</td>
        <td>Whether the queue requires duplicate detection.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enablePartitioning</td>
        <td>Enable Partitioning</td>
        <td>Whether to partition the queue across multiple message brokers.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresSession</td>
        <td>Requires Session</td>
        <td>Whether the queue requires sessions for message processing.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardTo</td>
        <td>Forward To</td>
        <td>The name of the queue or topic to forward messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardDeadLetteredMessagesTo</td>
        <td>Forward Dead Lettered Messages To</td>
        <td>The name of the queue or topic to forward dead-lettered messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.createQueue configKey="asbAdminConnection">
        <queueName>myQueue</queueName>
        <maxDeliveryCount>10</maxDeliveryCount>
        <defaultMessageTimeToLive_seconds>3600</defaultMessageTimeToLive_seconds>
        <enableBatchedOperations>true</enableBatchedOperations>
        <responseVariable>asb_createQueue_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.createQueue>
    ```

??? note "getQueue"
    Retrieves the properties of a queue.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>queueName</td>
        <td>Queue Name</td>
        <td>The name of the queue to retrieve.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.getQueue configKey="asbAdminConnection">
        <queueName>myQueue</queueName>
        <responseVariable>asb_getQueue_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.getQueue>
    ```

??? note "updateQueue"
    Updates the properties of an existing queue.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>queueName</td>
        <td>Queue Name</td>
        <td>The name of the queue to update.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Update Options</th>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_seconds</td>
        <td>Auto Delete On Idle (Seconds)</td>
        <td>The idle interval after which the queue is automatically deleted (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_nanoseconds</td>
        <td>Auto Delete On Idle (Nanoseconds)</td>
        <td>The idle interval after which the queue is automatically deleted (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_seconds</td>
        <td>Default Message TTL (Seconds)</td>
        <td>The default time-to-live for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_nanoseconds</td>
        <td>Default Message TTL (Nanoseconds)</td>
        <td>The default time-to-live for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_seconds</td>
        <td>Duplicate Detection Window (Seconds)</td>
        <td>The duration of the duplicate detection history (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_nanoseconds</td>
        <td>Duplicate Detection Window (Nanoseconds)</td>
        <td>The duration of the duplicate detection history (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_seconds</td>
        <td>Lock Duration (Seconds)</td>
        <td>The lock duration for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_nanoseconds</td>
        <td>Lock Duration (Nanoseconds)</td>
        <td>The lock duration for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxDeliveryCount</td>
        <td>Max Delivery Count</td>
        <td>The maximum number of delivery attempts before a message is dead-lettered.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxMessageSizeInKilobytes</td>
        <td>Max Message Size (KB)</td>
        <td>The maximum message size in kilobytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxSizeInMegabytes</td>
        <td>Max Size (MB)</td>
        <td>The maximum size of the queue in megabytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>status</td>
        <td>Status</td>
        <td>The status of the queue. <b>Possible values</b>: <code>Active</code>, <code>Disabled</code>, <code>SendDisabled</code>, <code>ReceiveDisabled</code>, <code>Creating</code>, <code>Deleting</code>, <code>Renaming</code>, <code>Restoring</code>, <code>Unknown</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>userMetadata</td>
        <td>User Metadata</td>
        <td>Custom metadata associated with the queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enableBatchedOperations</td>
        <td>Enable Batched Operations</td>
        <td>Whether to enable batched operations on the queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnMessageExpiration</td>
        <td>Dead Lettering On Message Expiration</td>
        <td>Whether to move expired messages to the dead-letter sub-queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresDuplicateDetection</td>
        <td>Requires Duplicate Detection</td>
        <td>Whether the queue requires duplicate detection.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enablePartitioning</td>
        <td>Enable Partitioning</td>
        <td>Whether to partition the queue across multiple message brokers.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresSession</td>
        <td>Requires Session</td>
        <td>Whether the queue requires sessions for message processing.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardTo</td>
        <td>Forward To</td>
        <td>The name of the queue or topic to forward messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardDeadLetteredMessagesTo</td>
        <td>Forward Dead Lettered Messages To</td>
        <td>The name of the queue or topic to forward dead-lettered messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.updateQueue configKey="asbAdminConnection">
        <queueName>myQueue</queueName>
        <maxDeliveryCount>15</maxDeliveryCount>
        <status>Active</status>
        <responseVariable>asb_updateQueue_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.updateQueue>
    ```

??? note "deleteQueue"
    Deletes a queue from the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>queueName</td>
        <td>Queue Name</td>
        <td>The name of the queue to delete.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.deleteQueue configKey="asbAdminConnection">
        <queueName>myQueue</queueName>
        <responseVariable>asb_deleteQueue_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.deleteQueue>
    ```

??? note "listQueues"
    Lists all queues in the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.listQueues configKey="asbAdminConnection">
        <responseVariable>asb_listQueues_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.listQueues>
    ```

??? note "queueExists"
    Checks whether a queue exists in the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>queueName</td>
        <td>Queue Name</td>
        <td>The name of the queue to check.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.queueExists configKey="asbAdminConnection">
        <queueName>myQueue</queueName>
        <responseVariable>asb_queueExists_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.queueExists>
    ```

#### Topic Operations

??? note "createTopic"
    Creates a new topic in the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to create.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Topic Options</th>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_seconds</td>
        <td>Auto Delete On Idle (Seconds)</td>
        <td>The idle interval after which the topic is automatically deleted (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_nanoseconds</td>
        <td>Auto Delete On Idle (Nanoseconds)</td>
        <td>The idle interval after which the topic is automatically deleted (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_seconds</td>
        <td>Default Message TTL (Seconds)</td>
        <td>The default time-to-live for messages sent to the topic (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_nanoseconds</td>
        <td>Default Message TTL (Nanoseconds)</td>
        <td>The default time-to-live for messages sent to the topic (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_seconds</td>
        <td>Duplicate Detection Window (Seconds)</td>
        <td>The duration of the duplicate detection history (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_nanoseconds</td>
        <td>Duplicate Detection Window (Nanoseconds)</td>
        <td>The duration of the duplicate detection history (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_seconds</td>
        <td>Lock Duration (Seconds)</td>
        <td>The lock duration for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_nanoseconds</td>
        <td>Lock Duration (Nanoseconds)</td>
        <td>The lock duration for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxDeliveryCount</td>
        <td>Max Delivery Count</td>
        <td>The maximum number of delivery attempts.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxMessageSizeInKilobytes</td>
        <td>Max Message Size (KB)</td>
        <td>The maximum message size in kilobytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxSizeInMegabytes</td>
        <td>Max Size (MB)</td>
        <td>The maximum size of the topic in megabytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>status</td>
        <td>Status</td>
        <td>The status of the topic. <b>Possible values</b>: <code>Active</code>, <code>Disabled</code>, <code>SendDisabled</code>, <code>ReceiveDisabled</code>, <code>Creating</code>, <code>Deleting</code>, <code>Renaming</code>, <code>Restoring</code>, <code>Unknown</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>userMetadata</td>
        <td>User Metadata</td>
        <td>Custom metadata associated with the topic.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enableBatchedOperations</td>
        <td>Enable Batched Operations</td>
        <td>Whether to enable batched operations on the topic.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnMessageExpiration</td>
        <td>Dead Lettering On Message Expiration</td>
        <td>Whether to move expired messages to the dead-letter sub-queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresDuplicateDetection</td>
        <td>Requires Duplicate Detection</td>
        <td>Whether the topic requires duplicate detection.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enablePartitioning</td>
        <td>Enable Partitioning</td>
        <td>Whether to partition the topic across multiple message brokers.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresSession</td>
        <td>Requires Session</td>
        <td>Whether the topic requires sessions.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>supportOrdering</td>
        <td>Support Ordering</td>
        <td>Whether the topic supports message ordering.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.createTopic configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <enableBatchedOperations>true</enableBatchedOperations>
        <supportOrdering>true</supportOrdering>
        <responseVariable>asb_createTopic_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.createTopic>
    ```

??? note "getTopic"
    Retrieves the properties of a topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to retrieve.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.getTopic configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <responseVariable>asb_getTopic_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.getTopic>
    ```

??? note "updateTopic"
    Updates the properties of an existing topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to update.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Update Options</th>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_seconds</td>
        <td>Auto Delete On Idle (Seconds)</td>
        <td>The idle interval after which the topic is automatically deleted (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_nanoseconds</td>
        <td>Auto Delete On Idle (Nanoseconds)</td>
        <td>The idle interval after which the topic is automatically deleted (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_seconds</td>
        <td>Default Message TTL (Seconds)</td>
        <td>The default time-to-live for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_nanoseconds</td>
        <td>Default Message TTL (Nanoseconds)</td>
        <td>The default time-to-live for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_seconds</td>
        <td>Duplicate Detection Window (Seconds)</td>
        <td>The duration of the duplicate detection history (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>duplicateDetectionHistoryTimeWindow_nanoseconds</td>
        <td>Duplicate Detection Window (Nanoseconds)</td>
        <td>The duration of the duplicate detection history (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxDeliveryCount</td>
        <td>Max Delivery Count</td>
        <td>The maximum number of delivery attempts.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxMessageSizeInKilobytes</td>
        <td>Max Message Size (KB)</td>
        <td>The maximum message size in kilobytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxSizeInMegabytes</td>
        <td>Max Size (MB)</td>
        <td>The maximum size of the topic in megabytes.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>status</td>
        <td>Status</td>
        <td>The status of the topic. <b>Possible values</b>: <code>Active</code>, <code>Disabled</code>, <code>SendDisabled</code>, <code>ReceiveDisabled</code>, <code>Creating</code>, <code>Deleting</code>, <code>Renaming</code>, <code>Restoring</code>, <code>Unknown</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>userMetadata</td>
        <td>User Metadata</td>
        <td>Custom metadata associated with the topic.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enableBatchedOperations</td>
        <td>Enable Batched Operations</td>
        <td>Whether to enable batched operations.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnMessageExpiration</td>
        <td>Dead Lettering On Message Expiration</td>
        <td>Whether to move expired messages to the dead-letter sub-queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresDuplicateDetection</td>
        <td>Requires Duplicate Detection</td>
        <td>Whether the topic requires duplicate detection.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enablePartitioning</td>
        <td>Enable Partitioning</td>
        <td>Whether to partition the topic across multiple message brokers.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresSession</td>
        <td>Requires Session</td>
        <td>Whether the topic requires sessions.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>supportOrdering</td>
        <td>Support Ordering</td>
        <td>Whether the topic supports message ordering.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.updateTopic configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <supportOrdering>true</supportOrdering>
        <status>Active</status>
        <responseVariable>asb_updateTopic_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.updateTopic>
    ```

??? note "deleteTopic"
    Deletes a topic from the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to delete.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.deleteTopic configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <responseVariable>asb_deleteTopic_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.deleteTopic>
    ```

??? note "listTopics"
    Lists all topics in the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.listTopics configKey="asbAdminConnection">
        <responseVariable>asb_listTopics_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.listTopics>
    ```

??? note "topicExists"
    Checks whether a topic exists in the Azure Service Bus namespace.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to check.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.topicExists configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <responseVariable>asb_topicExists_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.topicExists>
    ```

#### Subscription Operations

??? note "createSubscription"
    Creates a new subscription for a topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to create the subscription for.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to create.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Subscription Options</th>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_seconds</td>
        <td>Auto Delete On Idle (Seconds)</td>
        <td>The idle interval after which the subscription is automatically deleted (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_nanoseconds</td>
        <td>Auto Delete On Idle (Nanoseconds)</td>
        <td>The idle interval after which the subscription is automatically deleted (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_seconds</td>
        <td>Default Message TTL (Seconds)</td>
        <td>The default time-to-live for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_nanoseconds</td>
        <td>Default Message TTL (Nanoseconds)</td>
        <td>The default time-to-live for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_seconds</td>
        <td>Lock Duration (Seconds)</td>
        <td>The lock duration for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_nanoseconds</td>
        <td>Lock Duration (Nanoseconds)</td>
        <td>The lock duration for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxDeliveryCount</td>
        <td>Max Delivery Count</td>
        <td>The maximum number of delivery attempts before a message is dead-lettered.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>status</td>
        <td>Status</td>
        <td>The status of the subscription. <b>Possible values</b>: <code>Active</code>, <code>Disabled</code>, <code>SendDisabled</code>, <code>ReceiveDisabled</code>, <code>Creating</code>, <code>Deleting</code>, <code>Renaming</code>, <code>Restoring</code>, <code>Unknown</code>.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>userMetadata</td>
        <td>User Metadata</td>
        <td>Custom metadata associated with the subscription.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enableBatchedOperations</td>
        <td>Enable Batched Operations</td>
        <td>Whether to enable batched operations.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnMessageExpiration</td>
        <td>Dead Lettering On Message Expiration</td>
        <td>Whether to move expired messages to the dead-letter sub-queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnFilterEvaluationExceptions</td>
        <td>Dead Lettering On Filter Evaluation Exceptions</td>
        <td>Whether to move messages to the dead-letter sub-queue when filter evaluation fails.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>requiresSession</td>
        <td>Requires Session</td>
        <td>Whether the subscription requires sessions.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardTo</td>
        <td>Forward To</td>
        <td>The name of the queue or topic to forward messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardDeadLetteredMessagesTo</td>
        <td>Forward Dead Lettered Messages To</td>
        <td>The name of the queue or topic to forward dead-lettered messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.createSubscription configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <maxDeliveryCount>10</maxDeliveryCount>
        <responseVariable>asb_createSubscription_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.createSubscription>
    ```

??? note "getSubscription"
    Retrieves the properties of a subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to retrieve.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.getSubscription configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <responseVariable>asb_getSubscription_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.getSubscription>
    ```

??? note "updateSubscription"
    Updates the properties of an existing subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to update.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Update Options</th>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_seconds</td>
        <td>Auto Delete On Idle (Seconds)</td>
        <td>The idle interval after which the subscription is automatically deleted (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>autoDeleteOnIdle_nanoseconds</td>
        <td>Auto Delete On Idle (Nanoseconds)</td>
        <td>The idle interval after which the subscription is automatically deleted (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_seconds</td>
        <td>Default Message TTL (Seconds)</td>
        <td>The default time-to-live for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>defaultMessageTimeToLive_nanoseconds</td>
        <td>Default Message TTL (Nanoseconds)</td>
        <td>The default time-to-live for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_seconds</td>
        <td>Lock Duration (Seconds)</td>
        <td>The lock duration for messages (seconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>lockDuration_nanoseconds</td>
        <td>Lock Duration (Nanoseconds)</td>
        <td>The lock duration for messages (nanoseconds component).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>maxDeliveryCount</td>
        <td>Max Delivery Count</td>
        <td>The maximum number of delivery attempts.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>status</td>
        <td>Status</td>
        <td>The status of the subscription.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>userMetadata</td>
        <td>User Metadata</td>
        <td>Custom metadata associated with the subscription.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>enableBatchedOperations</td>
        <td>Enable Batched Operations</td>
        <td>Whether to enable batched operations.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnMessageExpiration</td>
        <td>Dead Lettering On Message Expiration</td>
        <td>Whether to move expired messages to the dead-letter sub-queue.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetteringOnFilterEvaluationExceptions</td>
        <td>Dead Lettering On Filter Evaluation Exceptions</td>
        <td>Whether to move messages to the dead-letter sub-queue when filter evaluation fails.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardTo</td>
        <td>Forward To</td>
        <td>The name of the queue or topic to forward messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>forwardDeadLetteredMessagesTo</td>
        <td>Forward Dead Lettered Messages To</td>
        <td>The name of the queue or topic to forward dead-lettered messages to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.updateSubscription configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <maxDeliveryCount>15</maxDeliveryCount>
        <responseVariable>asb_updateSubscription_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.updateSubscription>
    ```

??? note "deleteSubscription"
    Deletes a subscription from a topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to delete.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.deleteSubscription configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <responseVariable>asb_deleteSubscription_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.deleteSubscription>
    ```

??? note "listSubscriptions"
    Lists all subscriptions for a topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic to list subscriptions for.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.listSubscriptions configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <responseVariable>asb_listSubscriptions_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.listSubscriptions>
    ```

??? note "subscriptionExists"
    Checks whether a subscription exists for a topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to check.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.subscriptionExists configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <responseVariable>asb_subscriptionExists_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.subscriptionExists>
    ```

#### Rule Operations

??? note "createRule"
    Creates a new rule for a subscription to filter messages.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>ruleName</td>
        <td>Rule Name</td>
        <td>The name of the rule to create.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Rule Options</th>
    </tr>
    <tr>
        <td>rule_filter</td>
        <td>Filter</td>
        <td>The SQL filter expression for the rule (e.g., <code>priority = 'high'</code>).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>rule_action</td>
        <td>Action</td>
        <td>The SQL action expression for the rule (e.g., <code>SET sys.label = 'important'</code>).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.createRule configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <ruleName>highPriorityRule</ruleName>
        <rule_filter>priority = 'high'</rule_filter>
        <rule_action>SET sys.label = 'important'</rule_action>
        <responseVariable>asb_createRule_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.createRule>
    ```

??? note "getRule"
    Retrieves the properties of a rule.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>ruleName</td>
        <td>Rule Name</td>
        <td>The name of the rule to retrieve.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.getRule configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <ruleName>highPriorityRule</ruleName>
        <responseVariable>asb_getRule_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.getRule>
    ```

??? note "updateRule"
    Updates the properties of an existing rule.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>ruleName</td>
        <td>Rule Name</td>
        <td>The name of the rule to update.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Rule Options</th>
    </tr>
    <tr>
        <td>rule_filter</td>
        <td>Filter</td>
        <td>The SQL filter expression for the rule.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>rule_action</td>
        <td>Action</td>
        <td>The SQL action expression for the rule.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.updateRule configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <ruleName>highPriorityRule</ruleName>
        <rule_filter>priority = 'critical'</rule_filter>
        <responseVariable>asb_updateRule_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.updateRule>
    ```

??? note "deleteRule"
    Deletes a rule from a subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>ruleName</td>
        <td>Rule Name</td>
        <td>The name of the rule to delete.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.deleteRule configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <ruleName>highPriorityRule</ruleName>
        <responseVariable>asb_deleteRule_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.deleteRule>
    ```

??? note "listRules"
    Lists all rules for a subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>topicName</td>
        <td>Topic Name</td>
        <td>The name of the topic.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>The name of the subscription to list rules for.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.listRules configKey="asbAdminConnection">
        <topicName>myTopic</topicName>
        <subscriptionName>mySubscription</subscriptionName>
        <responseVariable>asb_listRules_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.listRules>
    ```

---

### MessageSender Operations

The following operations require a **MessageSender** connection.

??? note "send"
    Sends a single message to the configured queue or topic with full message properties.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Message Properties</th>
    </tr>
    <tr>
        <td>body</td>
        <td>Body</td>
        <td>The message body content.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>contentType</td>
        <td>Content Type</td>
        <td>The content type of the message (e.g., <code>application/json</code>, <code>text/plain</code>).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>messageId</td>
        <td>Message ID</td>
        <td>A unique identifier for the message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>to</td>
        <td>To</td>
        <td>The destination address of the message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>replyTo</td>
        <td>Reply To</td>
        <td>The address to reply to.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>replyToSessionId</td>
        <td>Reply To Session ID</td>
        <td>The session ID for reply messages.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>label</td>
        <td>Label</td>
        <td>An application-specific label for the message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>sessionId</td>
        <td>Session ID</td>
        <td>The session identifier for session-aware entities.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>correlationId</td>
        <td>Correlation ID</td>
        <td>The correlation identifier for correlating messages.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>partitionKey</td>
        <td>Partition Key</td>
        <td>The partition key for routing messages to specific partitions.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>timeToLive</td>
        <td>Time To Live</td>
        <td>The message time-to-live in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>applicationProperties_properties</td>
        <td>Application Properties</td>
        <td>Custom application properties as key-value pairs.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.send configKey="asbSenderConnection">
        <body>Hello, Azure Service Bus!</body>
        <contentType>text/plain</contentType>
        <timeToLive>3600</timeToLive>
        <responseVariable>asb_send_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.send>
    ```

??? note "sendPayload"
    Sends a message with just the payload content to the configured queue or topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>messagePayload</td>
        <td>Message Payload</td>
        <td>The payload content to send.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.sendPayload configKey="asbSenderConnection">
        <messagePayload>${payload.message}</messagePayload>
        <responseVariable>asb_sendPayload_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.sendPayload>
    ```

??? note "sendBatch"
    Sends a batch of messages to the configured queue or topic.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>messageCount</td>
        <td>Message Count</td>
        <td>The number of messages in the batch.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>messages</td>
        <td>Messages</td>
        <td>The array of messages to send. Each message can include body, contentType, messageId, and other message properties.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.sendBatch configKey="asbSenderConnection">
        <messageCount>2</messageCount>
        <messages>[{"body": "Message 1"}, {"body": "Message 2"}]</messages>
        <responseVariable>asb_sendBatch_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.sendBatch>
    ```

??? note "schedule"
    Sends a message to be enqueued at a scheduled time.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Message Properties</th>
    </tr>
    <tr>
        <td>body</td>
        <td>Body</td>
        <td>The message body content.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>contentType</td>
        <td>Content Type</td>
        <td>The content type of the message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>messageId</td>
        <td>Message ID</td>
        <td>A unique identifier for the message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>timeToLive</td>
        <td>Time To Live</td>
        <td>The message time-to-live in seconds.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>applicationProperties_properties</td>
        <td>Application Properties</td>
        <td>Custom application properties as key-value pairs.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Scheduled Enqueue Time</th>
    </tr>
    <tr>
        <td>year</td>
        <td>Year</td>
        <td>The year of the scheduled enqueue time.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>month</td>
        <td>Month</td>
        <td>The month of the scheduled enqueue time (1-12).</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>day</td>
        <td>Day</td>
        <td>The day of the scheduled enqueue time.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>hour</td>
        <td>Hour</td>
        <td>The hour of the scheduled enqueue time (0-23).</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>minute</td>
        <td>Minute</td>
        <td>The minute of the scheduled enqueue time (0-59).</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>second</td>
        <td>Second</td>
        <td>The second of the scheduled enqueue time.</td>
        <td>No</td>
        <td>0</td>
    </tr>
    <tr>
        <td>timeAbbrev</td>
        <td>Time Zone</td>
        <td>The time zone abbreviation (e.g., <code>UTC</code>, <code>Z</code>).</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output. Returns the sequence number of the scheduled message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.schedule configKey="asbSenderConnection">
        <body>Scheduled message</body>
        <contentType>text/plain</contentType>
        <year>2026</year>
        <month>4</month>
        <day>1</day>
        <hour>10</hour>
        <minute>30</minute>
        <second>0</second>
        <timeAbbrev>UTC</timeAbbrev>
        <responseVariable>asb_schedule_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.schedule>
    ```

??? note "cancel"
    Cancels a previously scheduled message using its sequence number.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the scheduled message to cancel.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.cancel configKey="asbSenderConnection">
        <sequenceNumber>12345</sequenceNumber>
        <responseVariable>asb_cancel_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.cancel>
    ```

??? note "close (Sender)"
    Closes the MessageSender connection.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.close configKey="asbSenderConnection">
        <responseVariable>asb_close_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.close>
    ```

---

### MessageReceiver Operations

The following operations require a **MessageReceiver** connection.

#### Receive Operations

??? note "receive"
    Receives a single message from the configured queue or subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>serverWaitTime</td>
        <td>Server Wait Time</td>
        <td>The maximum time (in seconds) the server waits for a message to arrive before returning.</td>
        <td>No</td>
        <td>60</td>
    </tr>
    <tr>
        <td>deadLettered</td>
        <td>Dead Lettered</td>
        <td>Whether to receive from the dead-letter sub-queue instead of the main queue.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>returnType</td>
        <td>Message Body Type</td>
        <td>Expected type of the message body. Determines how the body is bound when receiving the message. <b>Possible values</b>: <code>json</code>, <code>xml</code>, <code>text</code>.</td>
        <td>No</td>
        <td>json</td>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Output Variable Name</td>
        <td>The name of the variable to store the received message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.receive configKey="asbReceiverConnection">
        <serverWaitTime>60</serverWaitTime>
        <returnType>json</returnType>
        <responseVariable>asb_receive_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.receive>
    ```

??? note "receiveBatch"
    Receives a batch of messages from the configured queue or subscription.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>maxMessageCount</td>
        <td>Max Message Count</td>
        <td>The maximum number of messages to receive in the batch.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>serverWaitTime</td>
        <td>Server Wait Time</td>
        <td>The maximum time (in seconds) the server waits for messages to arrive.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLettered</td>
        <td>Dead Lettered</td>
        <td>Whether to receive from the dead-letter sub-queue.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the received messages.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.receiveBatch configKey="asbReceiverConnection">
        <maxMessageCount>10</maxMessageCount>
        <serverWaitTime>60</serverWaitTime>
        <responseVariable>asb_receiveBatch_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.receiveBatch>
    ```

??? note "receivePayload"
    Receives the message from the configured queue or subscription directly bound to the configured output type. This operation can only be used in **Receive and Delete** mode and is not compatible with **Peek Lock** mode.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>serverWaitTime</td>
        <td>Server Wait Time</td>
        <td>The maximum time (in seconds) the server waits for a message to arrive.</td>
        <td>No</td>
        <td>60</td>
    </tr>
    <tr>
        <td>deadLettered</td>
        <td>Dead Lettered</td>
        <td>Whether to receive from the dead-letter sub-queue.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>T</td>
        <td>Output Type</td>
        <td>Type to bind the received message body to. <b>Possible values</b>: <code>json</code> (for JSON payloads), <code>xml</code> (for XML), <code>string</code> (for plain-text/binary content). <b>Important</b>: This must match the format in which the message was originally sent. For example, if the message was sent as JSON, you must select <code>json</code> — selecting a different type will result in a binding error.</td>
        <td>No</td>
        <td>json</td>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Output Variable Name</td>
        <td>The name of the variable to store the received payload.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.receivePayload configKey="asbReceiverConnection">
        <T>json</T>
        <serverWaitTime>60</serverWaitTime>
        <responseVariable>asb_receivePayload_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.receivePayload>
    ```

??? note "receiveDeferred"
    Receives a deferred message by its sequence number.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the deferred message to receive.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the received message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.receiveDeferred configKey="asbReceiverConnection">
        <sequenceNumber>12345</sequenceNumber>
        <responseVariable>asb_receiveDeferred_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.receiveDeferred>
    ```

#### Message Settlement and Lock Management Operations

These operations are used with the **PEEK_LOCK** receive mode to settle received messages or manage message locks.

!!! warning "Important"
    Message settlement operations (`complete`, `abandon`, `defer`, `deadLetter`) and the `renewLock` operation must be used in the **same integration flow** as the `receive` or `receiveDeferred` operation that retrieved the message. You cannot receive a message in one request and settle or renew its lock in a separate request. The receive and settlement/lock operations must be part of a single message processing flow.

??? note "complete"
    Marks a message as successfully processed and removes it from the queue.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the message to complete.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.complete configKey="asbReceiverConnection">
        <sequenceNumber>${vars.asb_receive_1.payload.sequenceNumber}</sequenceNumber>
        <responseVariable>asb_complete_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.complete>
    ```

??? note "abandon"
    Releases the lock on a message, making it available for other receivers.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the message to abandon.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.abandon configKey="asbReceiverConnection">
        <sequenceNumber>${vars.asb_receive_1.payload.sequenceNumber}</sequenceNumber>
        <responseVariable>asb_abandon_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.abandon>
    ```

??? note "defer"
    Defers a message for later retrieval using its sequence number.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the message to defer.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.defer configKey="asbReceiverConnection">
        <sequenceNumber>${vars.asb_receive_1.payload.sequenceNumber}</sequenceNumber>
        <responseVariable>asb_defer_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.defer>
    ```

??? note "deadLetter"
    Moves a message to the dead-letter sub-queue with an optional reason and description.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the message to dead-letter.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetterReason</td>
        <td>Dead Letter Reason</td>
        <td>The reason for dead-lettering the message.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>deadLetterErrorDescription</td>
        <td>Dead Letter Error Description</td>
        <td>A description of the error that caused the message to be dead-lettered.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.deadLetter configKey="asbReceiverConnection">
        <sequenceNumber>${vars.asb_receive_1.payload.sequenceNumber}</sequenceNumber>
        <deadLetterReason>Processing failed</deadLetterReason>
        <deadLetterErrorDescription>Invalid message format</deadLetterErrorDescription>
        <responseVariable>asb_deadLetter_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.deadLetter>
    ```

??? note "renewLock"
    Renews the lock on a message to extend the processing time. Only applicable in PEEK_LOCK mode.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td>sequenceNumber</td>
        <td>Sequence Number</td>
        <td>The sequence number of the message whose lock should be renewed.</td>
        <td>Yes</td>
        <td>-</td>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.renewLock configKey="asbReceiverConnection">
        <sequenceNumber>${vars.asb_receive_1.payload.sequenceNumber}</sequenceNumber>
        <responseVariable>asb_renewLock_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.renewLock>
    ```

#### Connection Operations

??? note "close (Receiver)"
    Closes the MessageReceiver connection.

    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Output</th>
    </tr>
    <tr>
        <td>responseVariable</td>
        <td>Response Variable</td>
        <td>The name of the variable to store the operation output.</td>
        <td>No</td>
        <td>-</td>
    </tr>
    <tr>
        <td>overwriteBody</td>
        <td>Overwrite Message Body</td>
        <td>Whether to replace the message body with the operation output.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <asb.close configKey="asbReceiverConnection">
        <responseVariable>asb_close_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </asb.close>
    ```
