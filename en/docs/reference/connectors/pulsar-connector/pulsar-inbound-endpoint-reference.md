# Apache Pulsar Inbound Endpoint Reference

This reference page documents all the configuration parameters supported by the Apache Pulsar Inbound Endpoint. These parameters control how the inbound endpoint connects to the Pulsar server, what topics it subscribes to, the subscription type, message processing modes, and more. Use this table as a guide when configuring your inbound endpoint to ensure seamless and reliable integration with Apache Pulsar.

<table>
    <tr>
        <th>Parameter</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>topicNames</td>
        <td>Topic(s)</td>
        <td>Specifies a comma-separated list of Pulsar topic names to which the message is consumed.<br><br>The Topic field has the following format: <code>{persistent|non-persistent}://tenant/namespace/topic</code><br><br>The first segment is the type of topic. The topic can be persistent or non-persistent. With persistent topics, all the messages are persisted to the disk. The second segment is the name of the domain or a tenant. The third segment is the namespace within the domain and the fourth segment is the name of the individual topic.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>topicsPattern</td>
        <td>Topics Pattern</td>
        <td>Defines a regular expression pattern to match multiple topic names dynamically. This parameter is mutually exclusive with <code>topicNames</code>; only one of <code>topicsPattern</code> or <code>topicNames</code> should be specified.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>subscriptionName</td>
        <td>Subscription Name</td>
        <td>Unique identifier for the subscription. This name is used to track the consumer's position and state within the topic, allowing message delivery to resume from the last acknowledged message.</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>subscriptionType</td>
        <td>Subscription Type</td>
        <td>Specifies the subscription mode for the consumer. Options include <code>Exclusive</code> (single consumer), <code>Shared</code> (round-robin across consumers), <code>Failover</code> (active-passive), and <code>Key_Shared</code> (key-based routing). The default value is <code>Exclusive</code>.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>subscriptionTopicsMode</td>
        <td>Subscription Topics Mode</td>
        <td>
          Determines which types of topics the consumer subscribes to: <code>AllTopics</code> (both persistent and non-persistent), <code>PersistentOnly</code>, or <code>NonPersistentOnly</code>.<br>
          This parameter is required when <code>topicsPattern</code>; is used and has no effect if <code>topicNames</code> is specified.
        </td>
        <td>No</td>
    </tr>
    <tr>
        <td>subscriptionInitialPosition</td>
        <td>Subscription Initial Position</td>
        <td>Sets the initial position in the topic when the subscription is created. Choose <code>Latest</code> to start from new messages or <code>Earliest</code> to consume from the beginning of the topic.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>contentType</td>
        <td>Message Content Type</td>
        <td>Indicates the expected content type of incoming Pulsar messages, such as <code>application/json</code> or <code>text/plain</code>. This helps with message parsing and processing.</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>messageWaitTimeout</td>
        <td>Message Wait Timeout (in milliseconds)</td>
        <td>Maximum duration (in milliseconds) the consumer will wait for a message before timing out. Useful for controlling polling behavior in synchronous receive operations.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>processingMode</td>
        <td>Processing Mode</td>
        <td>Specifies whether messages are processed synchronously (Sync) or asynchronously (Async). Async mode can improve throughput by processing multiple messages concurrently.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>ackTimeoutMillis</td>
        <td>Ack Timeout (in milliseconds)</td>
        <td>Time limit (in milliseconds) for the consumer to acknowledge a message. If the timeout is exceeded, the message will be redelivered to another consumer.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>nackRedeliveryDelay</td>
        <td>Nack Redelivery Delay</td>
        <td>Specifies the delay (in milliseconds) before a negatively acknowledged message is redelivered to the consumer. Helps control retry intervals for failed messages.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>dlqTopic</td>
        <td>DLQ Topic</td>
        <td>Name of the Dead Letter Queue (DLQ) topic where messages that cannot be processed successfully after a maximum number of attempts are sent for further analysis or handling.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>dlqMaxRedeliverCount</td>
        <td>DLQ Max Redeliver Count</td>
        <td>Maximum number of times a message will be redelivered before being routed to the DLQ. Prevents infinite redelivery loops for problematic messages.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>batchReceiveEnabled</td>
        <td>Receive in Batch</td>
        <td>Enables batch receiving mode, allowing the consumer to receive multiple messages in a single call, which can improve throughput and reduce network overhead.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>batchingMaxMessages</td>
        <td>Batching Max Messages</td>
        <td>Sets the maximum number of messages that can be included in a single batch when batch receiving is enabled.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>batchingMaxBytes</td>
        <td>Batching Max Bytes</td>
        <td>Defines the maximum total size (in bytes) of messages in a batch. Batching will be triggered if this size is reached before the max messages or timeout.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>batchingTimeout</td>
        <td>Batching Timeout (in milliseconds)</td>
        <td>Specifies the maximum time (in milliseconds) to wait before delivering a batch, even if the batch is not full. Ensures timely message delivery.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>batchIndexAckEnabled</td>
        <td>Enable Batch Index Acknowledgment</td>
        <td>Enables acknowledgment at the individual message index level within a batch, allowing for more granular message processing and redelivery.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>maxPendingChunkedMessage</td>
        <td>Max Pending Chunked Message</td>
        <td>Maximum number of incomplete chunked messages that can be pending at any time. Helps control memory usage when handling large messages split into chunks.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>expiryTimeOfIncompleteChunkedMessageMillis</td>
        <td>Expiry Time Of Incomplete Chunked Message (in milliseconds)</td>
        <td>Time limit (in milliseconds) for assembling a complete chunked message. Incomplete messages exceeding this time will be discarded.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>autoAckOldestChunkedMessageOnQueueFull</td>
        <td>Auto Ack Oldest Chunked Message On Queue Full</td>
        <td>Automatically acknowledges and removes the oldest incomplete chunked message when the pending queue is full, preventing resource exhaustion.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>autoUpdatePartitions</td>
        <td>Auto Update Partitions</td>
        <td>Enables automatic detection and subscription to new partitions for partitioned topics, ensuring the consumer receives messages from all partitions.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>autoUpdatePartitionsIntervalSeconds</td>
        <td>Auto Update Partitions Interval (in seconds)</td>
        <td>Interval (in seconds) at which the consumer checks for new partitions in partitioned topics and updates its subscription accordingly.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>receiverQueueSize</td>
        <td>Receiver Queue Size</td>
        <td>Number of messages that can be queued by the consumer before being processed. Larger values can improve throughput but increase memory usage.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>maxTotalReceiverQueueSizeAcrossPartitions</td>
        <td>Max Total Receiver Queue Size Across Partitions</td>
        <td>Sets the maximum combined receiver queue size for all partitions of a partitioned topic, helping to control overall memory consumption.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>replicateSubscriptionState</td>
        <td>Replicate Subscription State</td>
        <td>Enables replication of the subscription state across multiple Pulsar clusters, supporting geo-replication and disaster recovery scenarios.</td>
        <td>No</td>
    </tr>
    <tr>
        <td>readCompacted</td>
        <td>Read Compacted</td>
        <td>Configures the consumer to read only the latest value for each key from a compacted topic, reducing the number of messages delivered and improving efficiency.</td>
        <td>No</td>
    </tr>
</table>