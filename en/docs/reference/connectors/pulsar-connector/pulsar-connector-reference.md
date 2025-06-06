# Apache Pulsar Connector Reference

This documentation provides a reference guide for the Apache Pulsar Connector. The Pulsar connector allows you to connect to Apache Pulsar, a distributed messaging system, and perform message publishing.
Click an operation name to see parameter details and samples on how to use it.

## Connection Configurations

<img src="{{base_path}}/assets/img/integrate/connectors/pulsar/pulsar-conn.png" title="Apache Pulsar Connector Configuration" width="700" alt="Apache Pulsar Connector Configuration"/>

The WSO2 Apache Pulsar Connector allows you to establish both secure and non-secure connections to Apache Pulsar. 

---

### Connection Configuration Parameters

??? note "PULSAR"
    This operation allows you to initialize the connection to Apache Pulsar.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>serviceUrl</td>
            <td>The Pulsar broker URL to connect. It follows the format- pulsar://<host_name>:<port> where pulsar is the protocol. The content following the :// is the host name and the port on which the broker is running.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        <tr>
            <td>connectionTimeoutMs</td>
            <td>Timeout for establishing a connection (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>operationTimeoutSeconds</td>
            <td>Timeout for client operations (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>requestTimeoutMs</td>
            <td>Timeout for requests (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>lookupTimeoutMs</td>
            <td>Timeout for lookup requests (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionMaxIdleSeconds</td>
            <td>Maximum idle time for connections (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numIoThreads</td>
            <td>Number of IO threads for Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numListenerThreads</td>
            <td>Number of listener threads for Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableBusyWait</td>
            <td>Enable busy-wait for IO threads.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>initialBackoffInterval</td>
            <td>Initial backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxBackoffInterval</td>
            <td>Maximum backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionsPerBroker</td>
            <td>Number of connections per broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>concurrentLookupRequest</td>
            <td>Number of concurrent lookup requests allowed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxConcurrentLookupRequests</td>
            <td>Maximum number of concurrent lookup requests allowed on each broker connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRequests</td>
            <td>Maximum number of lookup requests allowed on each broker connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRedirects</td>
            <td>Maximum number of lookup redirects allowed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxNumberOfRejectedRequestPerConnection</td>
            <td>Maximum number of rejected requests per connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>useTcpNoDelay</td>
            <td>Enable TCP no delay for network connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableTransaction</td>
            <td>Enable transaction support in Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>keepAliveIntervalSeconds</td>
            <td>Keep-alive interval for broker connections (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>statsIntervalSeconds</td>
            <td>Interval for statistics collection (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>memoryLimitBytes</td>
            <td>Memory limit for Pulsar client (in bytes).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>listenerName</td>
            <td>Listener name for the Pulsar client.</td>
            <td>No</td>
        </tr>
    </table>

??? note "PULSAR SECURE"
    This operation allows you to initialize a secure and authenticated connection to Apache Pulsar.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>serviceUrl</td>
            <td>The Pulsar broker URL to connect. It follows the format- pulsar+ssl://<host_name>:<port> where pulsar is the protocol and +ssl is an optional parameter that shows that the connection is secured by TLS. The content following the :// is the host name and the port on which the broker is running.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        <tr>
            <td>connectionTimeoutMs</td>
            <td>Timeout for establishing a connection (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>operationTimeoutSeconds</td>
            <td>Timeout for client operations (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>requestTimeoutMs</td>
            <td>Timeout for requests (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>lookupTimeoutMs</td>
            <td>Timeout for lookup requests (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionMaxIdleSeconds</td>
            <td>Maximum idle time for connections (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numIoThreads</td>
            <td>Number of IO threads for Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numListenerThreads</td>
            <td>Number of listener threads for Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableBusyWait</td>
            <td>Enable busy-wait for IO threads.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>initialBackoffInterval</td>
            <td>Initial backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxBackoffInterval</td>
            <td>Maximum backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionsPerBroker</td>
            <td>Number of connections per broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>concurrentLookupRequest</td>
            <td>Number of concurrent lookup requests allowed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxConcurrentLookupRequests</td>
            <td>Maximum number of concurrent lookup requests allowed on each broker connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRequests</td>
            <td>Maximum number of lookup requests allowed on each broker connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRedirects</td>
            <td>Maximum number of lookup redirects allowed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxNumberOfRejectedRequestPerConnection</td>
            <td>Maximum number of rejected requests per connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>useTcpNoDelay</td>
            <td>Enable TCP no delay for network connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableTransaction</td>
            <td>Enable transaction support in Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>keepAliveIntervalSeconds</td>
            <td>Keep-alive interval for broker connections (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>statsIntervalSeconds</td>
            <td>Interval for statistics collection (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>memoryLimitBytes</td>
            <td>Memory limit for Pulsar client (in bytes).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>listenerName</td>
            <td>Listener name for the Pulsar client.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Parameters for secure connection (TLS encryption)</td>
        <tr>
            <td>tlsAllowInsecureConnection</td>
            <td>Allow insecure TLS connections.</td>
            <td>No</td>
        </tr>        
        <tr>
            <td>tlsTrustCertsFilePath</td>
            <td>Path to the TLS trust certificates file.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustStorePath</td>
            <td>Path to the TLS trust store.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustStoreType</td>
            <td>Type of the TLS trust store.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustStorePassword</td>
            <td>Password for the TLS trust store.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsProtocols</td>
            <td>List of enabled TLS protocols.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsCiphers</td>
            <td>List of enabled TLS ciphers.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>autoCertRefreshSeconds</td>
            <td>Interval for automatic certificate refresh (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableTlsHostnameVerification</td>
            <td>Enable hostname verification for TLS connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>useKeyStoreTls</td>
            <td>Enable TLS using keystore.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Parameters for Authentication</td>
        <tr>
            <td>authenticationType</td>
            <td>Type of authentication (e.g., JWT, TLS, OAUTH2, NONE).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>jwtToken</td>
            <td>JWT token to be used with JWT authentication type.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    Given below is a sample configuration to create a client connection without security.

    ```xml
    <pulsar.init>
        <name>pulsarConnection</name>
        <serviceUrl>pulsar://localhost:6650</serviceUrl>
        <connectionTimeoutMs>10000</connectionTimeoutMs>
        <operationTimeoutSeconds>30</operationTimeoutSeconds>
        <requestTimeoutMs>30000</requestTimeoutMs>
        <lookupTimeoutMs>10000</lookupTimeoutMs>
        <connectionMaxIdleSeconds>60</connectionMaxIdleSeconds>
        <numIoThreads>4</numIoThreads>
        <numListenerThreads>2</numListenerThreads>
        <enableBusyWait>true</enableBusyWait>
        <initialBackoffInterval>1000</initialBackoffInterval>
        <maxBackoffInterval>100000</maxBackoffInterval>
        <connectionsPerBroker>1</connectionsPerBroker>
        <concurrentLookupRequest>10</concurrentLookupRequest>
        <maxConcurrentLookupRequests>100</maxConcurrentLookupRequests>
        <maxLookupRequests>1000</maxLookupRequests>
        <maxLookupRedirects>5</maxLookupRedirects>
        <maxNumberOfRejectedRequestPerConnection>100</maxNumberOfRejectedRequestPerConnection>
        <useTcpNoDelay>true</useTcpNoDelay>
        <enableTransaction>false</enableTransaction>
        <keepAliveIntervalSeconds>30</keepAliveIntervalSeconds>
        <statsIntervalSeconds>60</statsIntervalSeconds>
        <memoryLimitBytes>104857600</memoryLimitBytes>
        <listenerName>pulsarListener</listenerName>
    </pulsar.init>
    ```

---

### Publishing messages to Apache Pulsar

??? note "Publish Message"
    The publishMessage operation allows you to publish messages to the Apache Pulsar brokers.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topicName</td>
            <td>The name of the Pulsar topic to which messages will be published.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>compressionType</td>
            <td>The compression type to use for messages. Supported values: NONE, LZ4, ZLIB, ZSTD, SNAPPY.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sendMode</td>
            <td>The mode for sending the message: SYNC (wait for ack) or ASYNC (send and continue).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingEnabled</td>
            <td>Whether message batching is enabled for the producer. Batching can improve throughput by sending multiple messages in a single request.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingMaxMessages</td>
            <td>The maximum number of messages permitted in a batch.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingMaxBytes</td>
            <td>The maximum size of a batch in bytes.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingMaxPublishDelayMicros</td>
            <td>The maximum delay in microseconds for batching messages before they are published.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>chunkingEnabled</td>
            <td>Whether chunking is enabled for large messages. If enabled, large messages are split into smaller chunks.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>chunkMaxMessageSize</td>
            <td>The maximum size (in bytes) of a single message before it gets chunked.</td>
            <td>No</td>
        </tr>   
        <tr>
            <th colspan="3">Additional parameters</td>
        <tr>
            <td>sendTimeoutMs</td>
            <td>The timeout in milliseconds for a message to be sent. If the message is not acknowledged within this time, it is marked as failed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>blockIfQueueFull</td>
            <td>Whether the producer should block when the outgoing message queue is full. If false, send operations will fail immediately when the queue is full.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxPendingMessages</td>
            <td>The maximum number of messages allowed to be pending in the outgoing queue.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxPendingMessagesAcrossPartitions</td>
            <td>The maximum number of pending messages across all partitions. This is useful for partitioned topics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>hashingScheme</td>
            <td>The hashing scheme used to determine the partition for a message. Supported values: JavaStringHash, Murmur3_32Hash, BoostHash.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageRoutingMode</td>
            <td>The message routing mode for partitioned topics. Supported values: SinglePartition, RoundRobinPartition, CustomPartition.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Input Parameters</td>
        <tr>
            <td>key</td>
            <td>The key associated with the message for partitioning or routing.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>value</td>
            <td>The value or payload of the message to be published.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sequenceId</td>
            <td>The sequence ID to assign to the message for deduplication or ordering.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>deliverAfter</td>
            <td>The delay duration after which the message should be delivered (e.g., 5s, 1m).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>Custom properties to attach to the message as key-value pairs.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Output Parameters</td>
        <tr>
            <td>responseVariable</td>
            <td>The name of the variable to which the output should be stored.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <pulsar.publishMessages configKey="securePulsar">
        <topicName>cities</topicName>
        <compressionType>NONE</compressionType>
        <sendMode>Sync</sendMode>
        <batchingEnabled>false</batchingEnabled>
        <key>sampleKey</key>
        <value>{${payload}}</value>
        <sequenceId></sequenceId>
        <properties>[{"compression":"enabled"}, {"type":"json"}]</properties>
        <responseVariable>pulsar_publishMessages_135</responseVariable>
        <overwriteBody>false</overwriteBody>
    </pulsar.publishMessages>
    ```

    Following properties will be set in the message context or to a new variable if the `overwriteBody` parameter is set to `false`.

    ```
    {
        "success": "true"
        "msgid: "fdfdfd"
    }
    ```