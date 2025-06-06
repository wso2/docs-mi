# Apache Pulsar Connector Reference

This documentation provides a reference guide for the Apache Pulsar Connector. The Pulsar connector allows you to connect to Apache Pulsar, a distributed messaging system, and perform message publishing.
Click an operation name to see parameter details and samples on how to use it.

## Connection Configurations

<img src="{{base_path}}/assets/img/integrate/connectors/pulsar/PulsarConnections.png" title="Apache Pulsar Connections" width="700" alt="Apache Pulsar Connections"/>

The WSO2 Apache Pulsar Connector allows you to establish both secure and non-secure connections to Apache Pulsar. 

---

### Connection Configuration Parameters

??? note "PULSAR"
    This operation allows you to initialize the connection to Apache Pulsar.ddd

    **Note:** Unless explicitly stated, the default values of the optional parameters match those defined in the official [Apache Pulsar Configuration documentation](https://pulsar.apache.org/reference/#/4.0.x/client/client-configuration-client).

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>Connection name</td>
            <td>Unique name to identify the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>serviceUrl</td>
            <td>Broker URL</td>
            <td>The Pulsar broker URL to connect. It follows the format - `pulsar://<host_name>:<port>` where pulsar is the protocol. The content following the `://` is the host name and the port on which the broker is running.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        <tr>
            <td>connectionTimeoutMs</td>
            <td>Connection Timeout (in milliseconds)</td>
            <td>Timeout for establishing a TCP connection in milliseconds.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>operationTimeoutSeconds</td>
            <td>Operation Timeout (in seconds)</td>
            <td>Specifies how long the client should wait (in seconds) for sending a message before timing out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>requestTimeoutMs</td>
            <td>Request Timeout (in milliseconds)</td>
            <td>Timeout duration (in milliseconds) for individual Pulsar requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>lookupTimeoutMs</td>
            <td>Lookup Timeout (in milliseconds)</td>
            <td>Timeout (in milliseconds) for topic lookup operations. If the broker does not respond in time, the request fails. This helps prevent the client from waiting indefinitely when trying to resolve a topic to a broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionMaxIdleSeconds</td>
            <td>Connection Max Idle Time (in seconds)</td>
            <td>Specifies the maximum time (in seconds) a connection can stay idle before being closed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numIoThreads</td>
            <td>Number of IO Threads</td>
            <td>Sets the number of threads dedicated for handling network I/O operations such as reading and writing data to the broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numListenerThreads</td>
            <td>Number of Listener Threads</td>
            <td>The number of threads used to process messages received by consumers.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableBusyWait</td>
            <td>Enable Busy Wait</td>
            <td>When enabled, uses busy-waiting for IO threads instead of traditional blocking IO. This may reduce latency but increases CPU usage.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>initialBackoffInterval</td>
            <td>Initial Backoff Interval (in milliseconds)</td>
            <td>Initial backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxBackoffInterval</td>
            <td>Max Backoff Interval (in milliseconds)</td>
            <td>Maximum backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionsPerBroker</td>
            <td>Number of Connections Per Broker</td>
            <td>Determines how many TCP connections the client maintains per broker. Increasing this can help with high-throughput scenarios.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRedirects</td>
            <td>Maximum Number of Lookup Redirects</td>
            <td>The maximum number of times a lookup request can be redirected when resolving a topic to its broker. If the number of redirects exceeds this limit, the lookup operation fails. This helps prevent infinite redirect loops during topic resolution.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRequest</td>
            <td>Maximum Number of Lookup Requests</td>
            <td>Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>concurrentLookupRequest</td>
            <td>Number of Concurrent Lookup Requests</td>
            <td>The number of concurrent lookup requests that can be sent on each broker connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxConcurrentLookupRequests</td>
            <td>Maximum Number of Concurrent Lookup Requests</td>
            <td>The number of concurrent lookup requests that can be sent on each broker connection. Setting a maximum prevents overloading a broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxNumberOfRejectedRequestPerConnection</td>
            <td>Maximum Number Of Rejected Request Per Connection</td>
            <td>Maximum number of rejected requests of a broker in a certain time frame (60 seconds) after the current connection is closed and the client creating a new connection to connect to a different broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>useTcpNoDelay</td>
            <td>Enable TCP No Delay</td>
            <td>Enable TCP no delay for network connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableTransaction</td>
            <td>Enable Transaction</td>
            <td>Whether to enable transaction support in the Pulsar connector. When set to true, the connector can participate in transactional message publishing, allowing atomic operations across multiple topics and partitions. This is useful for scenarios requiring exactly-once semantics or coordinated multi-message operations. If not needed, leave it as false to avoid extra overhead.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>keepAliveIntervalSeconds</td>
            <td>Keep Alive Interval (in seconds)</td>
            <td>Interval (in seconds) to send keep-alive messages to maintain an active connection with the broker.  This helps prevent the connection from being closed due to inactivity. If not set, the default value defined by Pulsar will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>statsIntervalSeconds</td>
            <td>Stats Interval (in seconds)</td>
            <td>The interval (in seconds) at which the Pulsar connector collects and reports statistics. This helps monitor client(connector) performance and resource usage. If not set, the default value defined by Pulsar will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>memoryLimitBytes</td>
            <td>Memory Limit (in bytes)</td>
            <td>The maximum amount of memory (in bytes) that the Pulsar client(connector) can use. It helps control the memory usage of the client(connector), preventing it from consuming excessive resources, which is important for stability and performance in resource-constrained environments. If not set, the default value defined by Pulsar will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>listenerName</td>
            <td>Listener Name</td>
            <td>Listener name for lookup.</td>
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
        <numIoThreads>4</numIoThreads>
        <numListenerThreads>2</numListenerThreads>
        <connectionsPerBroker>1</connectionsPerBroker>
        <memoryLimitBytes>104857600</memoryLimitBytes>
    </pulsar.init>
    ```

??? note "PULSAR SECURE"
    This operation allows you to initialize a secure and authenticated connection to Apache Pulsar.

    **Note:** Unless explicitly stated, the default values of the optional parameters match those defined in the official [Apache Pulsar Configuration documentation](https://pulsar.apache.org/reference/#/4.0.x/client/client-configuration-client).

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>Connection Name</td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>serviceUrl</td>
            <td>Broker URL</td>
            <td>The Pulsar broker URL to connect. It follows the format- `pulsar+ssl://<host_name>:<port>` where pulsar is the protocol and `+ssl` is an optional parameter that shows that the connection is secured by TLS. The content following the `://` is the host name and the port on which the broker is running.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Parameters for secure connection (TLS encryption)</td>
        <tr>
            <td>tlsAllowInsecureConnection</td>
            <td>Allow Insecure TLS Connection</td>
            <td>Allows the client to connect to the broker using TLS even if the server's certificate cannot be verified (e.g., self-signed certificates). Use with caution, as it disables strict certificate validation. When this is true, the value of `tlsTrustCertsFilePath` and the trust store parameters are ignored. Default value is false.</td>
            <td>No</td>
        </tr>   
        <tr>
            <td>useKeyStoreTls</td>
            <td>Use KeyStore TLS</td>
            <td>Enables the use of a Java KeyStore for TLS configuration instead of PEM files. Default value is false.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustCertsFilePath</td>
            <td>Broker CA Certificate Path</td>
            <td>Specifies the file path to the CA certificate(s) used to verify the broker's TLS certificate. This should point to a PEM-encoded certificate file. This is applicable only when `useKeyStoreTls` parameter is set to false.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustStorePath</td>
            <td>TLS TrustStore Path</td>
            <td>The file system path to the Java KeyStore (trust store) containing trusted CA certificates for TLS connections. This is applicable only when `useKeyStoreTls` parameter is set to true.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustStoreType</td>
            <td>TLS TrustStore Type</td>
            <td>The type of the trust store (e.g., JKS or PKCS12) used for TLS certificate validation. This is applicable only when `useKeyStoreTls` parameter is set to true.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsTrustStorePassword</td>
            <td>TLS TrustStore Password</td>
            <td>Password for the TLS trust store. This is applicable only when `useKeyStoreTls` parameter is set to true.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsProtocols</td>
            <td>TLS Protocols</td>
            <td>Specifies the list of enabled TLS protocol versions (e.g., TLSv1.2, TLSv1.3) as a comma-separated value. This controls which protocol versions the client will use when negotiating with the broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tlsCiphers</td>
            <td>TLS Ciphers</td>
            <td>Specifies the list of enabled TLS ciphers as a comma-separated value. This controls which encryption algorithms are allowed during the TLS handshake.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>autoCertRefreshSeconds</td>
            <td>Auto Certificate Refresh Interval (in seconds)</td>
            <td>Interval for automatic certificate refresh (in seconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableTlsHostnameVerification</td>
            <td>Enable TLS Hostname Verification</td>
            <td>Enables hostname verification for TLS connections. When set to true, the client checks that the broker's TLS certificate matches its hostname, providing additional security against man-in-the-middle attacks. If false, this verification is skipped.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Parameters for Authentication</td>
        <tr>
            <td>authenticationType</td>
            <td>Authentication Type</td>
            <td>Type of authentication (e.g., JWT, TLS, OAUTH2, NONE).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>jwtToken</td>
            <td>JWT Token</td>
            <td>JWT token to be used with JWT authentication type.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        <tr>
            <td>connectionTimeoutMs</td>
            <td>Connection Timeout (in milliseconds)</td>
            <td>Timeout for establishing a TCP connection in milliseconds.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>operationTimeoutSeconds</td>
            <td>Operation Timeout (in seconds)</td>
            <td>Specifies how long the client should wait (in seconds) for sending a message before timing out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>requestTimeoutMs</td>
            <td>Request Timeout (in milliseconds)</td>
            <td>Timeout duration (in milliseconds) for individual Pulsar requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>lookupTimeoutMs</td>
            <td>Lookup Timeout (in milliseconds)</td>
            <td>Timeout (in milliseconds) for topic lookup operations. If the broker does not respond in time, the request fails. This helps prevent the client from waiting indefinitely when trying to resolve a topic to a broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionMaxIdleSeconds</td>
            <td>Connection Max Idle Time (in seconds)</td>
            <td>Specifies the maximum time (in seconds) a connection can stay idle before being closed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numIoThreads</td>
            <td>Number of IO Threads</td>
            <td>Sets the number of threads dedicated for handling network I/O operations such as reading and writing data to the broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>numListenerThreads</td>
            <td>Number of Listener Threads</td>
            <td>The number of threads used to process messages received by consumers.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableBusyWait</td>
            <td>Enable Busy Wait</td>
            <td>When enabled, uses busy-waiting for IO threads instead of traditional blocking IO. This may reduce latency but increases CPU usage.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>initialBackoffInterval</td>
            <td>Initial Backoff Interval (in milliseconds)</td>
            <td>Initial backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxBackoffInterval</td>
            <td>Max Backoff Interval (in milliseconds)</td>
            <td>Maximum backoff interval for reconnection attempts (in milliseconds).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionsPerBroker</td>
            <td>Number of Connections Per Broker</td>
            <td>Determines how many TCP connections the client maintains per broker. Increasing this can help with high-throughput scenarios.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRedirects</td>
            <td>Maximum Number of Lookup Redirects</td>
            <td>The maximum number of times a lookup request can be redirected when resolving a topic to its broker. If the number of redirects exceeds this limit, the lookup operation fails. This helps prevent infinite redirect loops during topic resolution.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxLookupRequest</td>
            <td>Maximum Number of Lookup Requests</td>
            <td>Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>concurrentLookupRequest</td>
            <td>Number of Concurrent Lookup Requests</td>
            <td>The number of concurrent lookup requests that can be sent on each broker connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxConcurrentLookupRequests</td>
            <td>Maximum Number of Concurrent Lookup Requests</td>
            <td>The number of concurrent lookup requests that can be sent on each broker connection. Setting a maximum prevents overloading a broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxNumberOfRejectedRequestPerConnection</td>
            <td>Maximum Number Of Rejected Request Per Connection</td>
            <td>Maximum number of rejected requests of a broker in a certain time frame (60 seconds) after the current connection is closed and the client creating a new connection to connect to a different broker.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>useTcpNoDelay</td>
            <td>Enable TCP No Delay</td>
            <td>Enable TCP no delay for network connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>enableTransaction</td>
            <td>Enable Transaction</td>
            <td>Whether to enable transaction support in the Pulsar connector. When set to true, the connector can participate in transactional message publishing, allowing atomic operations across multiple topics and partitions. This is useful for scenarios requiring exactly-once semantics or coordinated multi-message operations. If not needed, leave it as false to avoid extra overhead.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>keepAliveIntervalSeconds</td>
            <td>Keep Alive Interval (in seconds)</td>
            <td>Interval (in seconds) to send keep-alive messages to maintain an active connection with the broker.  This helps prevent the connection from being closed due to inactivity. If not set, the default value defined by Pulsar will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>statsIntervalSeconds</td>
            <td>Stats Interval (in seconds)</td>
            <td>The interval (in seconds) at which the Pulsar connector collects and reports statistics. This helps monitor client(connector) performance and resource usage. If not set, the default value defined by Pulsar will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>memoryLimitBytes</td>
            <td>Memory Limit (in bytes)</td>
            <td>The maximum amount of memory (in bytes) that the Pulsar client(connector) can use. It helps control the memory usage of the client(connector), preventing it from consuming excessive resources, which is important for stability and performance in resource-constrained environments. If not set, the default value defined by Pulsar will be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>listenerName</td>
            <td>Listener Name</td>
            <td>Listener name for lookup.</td>
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
        <numIoThreads>4</numIoThreads>
        <numListenerThreads>2</numListenerThreads>
        <connectionsPerBroker>1</connectionsPerBroker>
        <memoryLimitBytes>104857600</memoryLimitBytes>
        <authenticationType>JWT</authenticationType>
        <jwtToken>eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIifQ.KpRMeZtp9Tjl-4wJq5PppK71sc6Gwb0utspd1PpLSr0</jwtToken>
        <tlsAllowInsecureConnection>false</tlsAllowInsecureConnection>
        <useKeyStoreTls>false</useKeyStoreTls>
        <tlsTrustCertsFilePath>/Users/wso2/Documents/apache-pulsar-4.0.4/ca.cert.pem</tlsTrustCertsFilePath>
    </pulsar.init>
    ```

---

### Publishing messages to Apache Pulsar

??? note "Publish Message"
    The publishMessage operation allows you to publish messages to the Apache Pulsar brokers.
    
    **Note:** Unless explicitly stated, the default values of the optional parameters match those defined in the official [Apache Pulsar Configuration documentation](https://pulsar.apache.org/reference/#/next/client/client-configuration-producer).

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>value</td>
            <td>Message</td>
            <td>The value or payload of the message to be published.</td>
            <td>Yes</td>
        <tr>
            <td>key</td>
            <td>Key</td>
            <td>The key associated with the message for partitioning or routing.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>Message Properties</td>
            <td>Custom properties to attach to the message as key-value pairs.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sequenceId</td>
            <td>Sequence ID</td>
            <td>The sequence ID to assign to the message for deduplication or ordering.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>deliverAfter</td>
            <td>Deliver After (in milliseconds)</td>
            <td>The delay duration after which the message should be delivered (e.g., 5s, 1m).</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Producer Settings</td>
        <tr>
            <td>topicName</td>
            <td>Topic Name</td>
            <td>The name of the Pulsar topic to which messages will be published.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>compressionType</td>
            <td>Compression Type</td>
            <td>The compression type to use for messages. Supported values: NONE, LZ4, ZLIB, ZSTD, SNAPPY. Reduces message size over the network.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sendMode</td>
            <td>Send Mode</td>
            <td>The mode for sending the message: SYNC (wait for ack) or ASYNC (send and continue).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingEnabled</td>
            <td>Batching Enabled</td>
            <td>Whether message batching is enabled for the producer. Batching can improve throughput by sending multiple messages in a single request. The default value is `true`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingMaxMessages</td>
            <td>Batching Max Messages</td>
            <td>The maximum number of messages permitted in a batch. The default value is `1000`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingMaxBytes</td>
            <td>Batching Max Bytes (in bytes)</td>
            <td>The maximum size of a batch in bytes. The default value is `131072`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>batchingMaxPublishDelayMicros</td>
            <td>Batching Max Publish Delay (in microseconds)</td>
            <td>The maximum delay (in microseconds) to wait before publishing a batch, even if the batch is not full. Controls batching latency. The default value is `1000` microseconds.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>chunkingEnabled</td>
            <td>Chunking Enabled</td>
            <td>Whether chunking is enabled for large messages. If enabled, large messages are split into smaller chunks. The default value is `false`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>chunkMaxMessageSize</td>
            <td>Chunk Max Message Size (in Bytes)</td>
            <td>The maximum size (in bytes) of a single message before it gets chunked.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sendTimeoutMs</td>
            <td>Send Timeout (in milliseconds)</td>
            <td>The timeout in milliseconds for a message to be sent. If the message is not acknowledged within this time, it is marked as failed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>blockIfQueueFull</td>
            <td>Block Producer If Queue Full</td>
            <td>Whether the producer should block when the outgoing message queue is full. If false, send operations will fail immediately when the queue is full. The default value is `false`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxPendingMessages</td>
            <td>Max Pending Messages</td>
            <td>The maximum number of messages allowed to be pending in the outgoing queue.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxPendingMessagesAcrossPartitions</td>
            <td>Max Pending Messages Across Partitions</td>
            <td>The maximum number of pending messages across all partitions. This is useful for partitioned topics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>hashingScheme</td>
            <td>Hashing Scheme</td>
            <td>The hashing scheme used to determine the partition for a message. Supported values: JavaStringHash, Murmur3_32Hash, BoostHash. The default value is `JavaStringHash`.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>messageRoutingMode</td>
            <td>Message Routing Mode</td>
            <td>The message routing mode for partitioned topics. Supported values: SinglePartition, RoundRobinPartition, CustomPartition. The default value is `RoundRobinPartition`.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Output Parameters</td>
        <tr>
            <td>responseVariable</td>
            <td>Output variable Name</td>
            <td>The name of the variable to which the output should be stored.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Overwrite Message Body</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <pulsar.publishMessages configKey="securePulsar">
        <topicName>{${payload.topic}}</topicName>
        <compressionType>NONE</compressionType>
        <sendMode>Sync</sendMode>
        <batchingEnabled>false</batchingEnabled>
        <key>{${payload.key}}</key>
        <value>{${payload.message}}</value>
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
        "msgid: "162:3:-1"
    }
    ```