# RabbitMQ (AMQP 1.0) Connector Reference

This documentation provides a reference guide for the RabbitMQ Connector. The RabbitMQ connector enables you to connect to a RabbitMQ broker, a reliable messaging system, and perform message publishing operations. Click an operation name to see parameter details and samples on how to use it.

## Connection Configurations

<img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/RabbitMQConnection.png" title="RabbitMQ Connection" width="40%" alt="RabbitMQ Connection"/>

The WSO2 RabbitMQ Connector allows you to establish connections to the RabbitMQ broker using either SSL or non-SSL protocols.

---

### Connection Configuration Parameters

??? note "RABBITMQ"
    This operation allows you to initialize the connection to RabbitMQ Broker.

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
        <td>The name for the rabbitmq connection</td>
        <td>Yes</td>
        <td>RABBITMQ_CONNECTION_1</td>
    </tr>
    <tr>
        <th colspan="5">General</th>
    </tr>
    <tr>
        <td>serverUrls</td>
        <td>RabbitMQ Broker Urls</td>
        <td>Enter RabbitMQ server URLs as a comma-separated list (e.g., host1:port1,host2:port2).</td>
        <td>Yes</td>
        <td>localhost:5672</td>
    </tr>
    <tr>
        <th colspan="5">Auth Configuration</th>
    </tr>
    <tr>
        <td>saslMechanism</td>
        <td>SASL Mechanism</td>
        <td> Select the SASL mechanism to use for connection authentication.
        <b>Possible values</b>:
        <ul>
           <li>
              <b>PLAIN</b>: The default, standard authentication method that transmits username and password credentials in plain text. This mechanism is simple and widely supported but requires secure transport (TLS/SSL) to protect credentials during transmission. When OAuth2 authentication is enabled, the SASL mechanism should be set to PLAIN, as the OAuth2 token is passed as the password field.
           </li>
           <li>
              <b>EXTERNAL</b>: Delegates authentication to an external mechanism, bypassing RabbitMQ's internal user database. This typically works in conjunction with the <code>rabbitmq_auth_backend_external</code> plugin or certificate-based authentication (TLS/SSL mutual authentication). 
              <b>Common use cases:</b>
              <ul>
                 <li><b>Client Certificate Authentication</b>: The client's identity is extracted from the TLS certificate's Distinguished Name (DN) during the TLS handshake, eliminating the need for username/password credentials.</li>
                 <li><b>External Authentication Scripts</b>: When using <code>rabbitmq_auth_backend_external</code>, authentication and authorization are delegated to external scripts or programs that can integrate with LDAP, Kerberos, custom databases, or other identity providers.</li>
              </ul>
              This mechanism is suitable for enterprise environments requiring centralized identity management or certificate-based security models.
           </li>
        </ul>
        <b>Security Considerations</b>:
        <ul>
           <li><b>PLAIN</b>: Always use with TLS/SSL encryption to prevent credential interception. Never use over unencrypted connections in production environments.</li>
           <li><b>EXTERNAL</b>: Requires proper certificate management and PKI infrastructure for certificate-based auth, or secure configuration of external authentication backends. Provides stronger authentication but increases setup and maintenance complexity.</li>
        </ul>
        </td>
        <td>Yes</td>
        <td>PLAIN</td>
    </tr>
    <tr>
        <td>username</td>
        <td>Server Username</td>
        <td>Username for PLAIN authentication.</td>
        <td>No</td>
        <td>guest</td>
    </tr>
    <tr>
        <td>password</td>
        <td>Server Password</td>
        <td>Password for PLAIN authentication.</td>
        <td>No</td>
        <td>guest</td>
    </tr>
    <tr>
        <td>oAuth2Enabled</td>
        <td>OAuth2 Enabled</td>
        <td>Enable if using OAuth 2.0 (e.g., Client Credentials or Password Grant) for authentication instead of a simple username/password.</br>
         When OAuth 2.0 is enabled, RabbitMQ validates access tokens presented by clients against a configured authorization server. The OAuth 2.0 plugin uses JWT (JSON Web Token) tokens and can verify them either by validating the token's signature using public keys or by introspecting the token with the authorization server. Please refer to the <a href="https://www.rabbitmq.com/docs/oauth2">RabbitMQ OAuth 2.0 plugin documentation</a> for detailed configuration instructions and supported Identity providers.
        </td>
        <td>No</td>
        <td>false</td>  
    </tr>
    <tr>
        <th colspan="5">OAuth2 Configurations</th>
    </tr>
    <tr>
    <td>tokenEndpoint</td>
    <td>Token Endpoint</td>
    <td>Enter Identity Provider/Token Service token endpoint URL to generate the access token.
        <div class="admonition note">
            <p class="admonition-title">Note</p>
            <p> Provide the HTTPS URL for the token endpoint and import the Identity Provider's public certificate into the WSO2 MI <code>client-truststore.jks</code>. See <a href="{{base_path}}/install-and-setup/setup/security/importing-ssl-certificate/#importing-ssl-certificates-to-a-truststore">importing SSL certificates to a truststore</a> for instructions on importing the certificate into <code>client-truststore.jks</code>.</p>
        </div>
    </td>
    <td>No</td>
    <td> - </td>
    </tr>
    <td>grantType</td>
    <td>Grant Type</td>
    <td>Select the OAuth2 grant type to use for token generation. 
        <b>Options</b>:
        <ul>
            <li><b>client_credentials</b>: Used for machine-to-machine (M2M) authentication where the application authenticates using its own credentials (client ID and client secret) without user involvement. This is the most common grant type for service-to-service communication and background processes. Recommended for most RabbitMQ integration scenarios.</li>
            <li><b>password</b>: Also known as Resource Owner Password Credentials (ROPC) grant. The application collects the user's username and password directly and exchanges them for an access token. This grant type should only be used when there is a high degree of trust between the user and the application, as it requires handling user credentials directly. Generally discouraged for security reasons unless legacy systems require it.</li>
        </ul>
    </td>
    <td>No</td>
    <td>client_credentials</td>
    </tr>
    <tr>
        <td>clientId</td>
        <td>Client ID</td>
        <td>The client ID for token generation.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>clientSecret</td>
        <td>Client Secret</td>
        <td>The client secret for token generation.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>oAuth2UserName</td>
        <td>User Name</td>
        <td>Enter the username to use with password grant type for token generation.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>oAuth2Password</td>
        <td>Password</td>
        <td>Enter the password to use with password grant type for token generation.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <th colspan="5">SSL Configuration</th>
    </tr>
    <tr>
        <td>sslEnabled</td>
        <td>SSL Enabled</td>
        <td>Enable SSL/TLS for the RabbitMQ connection.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>trustEverything</td>
        <td>Trust Everything</td>
        <td>If enabled, all server certificates will be accepted, regardless of validity. Not recommended for production environments.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>keyStoreLocation</td>
        <td>Keystore Location</td>
        <td>The file path to the Keystore containing the client's private key and certificate.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>keyStoreType</td>
        <td>Keystore Type</td>
        <td>The type of the Keystore (e.g., JKS).</td>
        <td>No</td>
        <td>JKS</td>
    </tr>
    <tr>
        <td>keyStorePassword</td>
        <td>Keystore Password</td>
        <td>The password to access the Keystore.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>trustStoreLocation</td>
        <td>Truststore Location</td>
        <td>The file path to the Truststore containing trusted server certificates.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>trustStoreType</td>
        <td>Truststore Type</td>
        <td>The type of the Truststore (e.g., JKS).</td>
        <td>No</td>
        <td>JKS</td>
    </tr>
    <tr>
        <td>trustStorePassword</td>
        <td>Truststore Password</td>
        <td>The password to access the Truststore.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>sslVersion</td>
        <td>SSL Version</td>
        <td>The preferred SSL/TLS protocol version (e.g., 'TLSv1.2', 'TLSv1.3').</td>
        <td>No</td>
        <td>TLSv1.2</td>
    </tr>
    <tr>
        <td>hostnameVerificationEnabled</td>
        <td>Enabled SSL Hostname Verification</td>
        <td>If enabled, the hostname in the server's certificate must match the server host name you are connecting to.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Advanced</th>
    </tr>
    <tr>
        <td>virtualHost</td>
        <td>Virtual Host</td>
        <td>The virtual host (vhost) within the RabbitMQ server to connect to. Leave blank for the default '/' vhost.</td>
        <td>No</td>
        <td> / </td>
    </tr>
    <tr>
        <td>connectionIdleTimeout</td>
        <td>Connection Idle Timeout</td>
        <td>The maximum period (in milliseconds) the connection can remain idle without any activity before it is closed by the server.</td>
        <td>No</td>
        <td>60000</td>
    </tr>
    <tr>
        <td>connectionEstablishRetryCount</td>
        <td>Connection Establish Retry Count</td>
        <td>The number of times to retry establishing the connection to the RabbitMQ server. Leave blank for default.</td>
        <td>No</td>
        <td>5</td>
    </tr>
    <tr>
        <td>connectionEstablishRetryInterval</td>
        <td>Connection Establish Retry Interval</td>
        <td>The interval (in milliseconds) between retries when establishing the connection.</td>
        <td>No</td>
        <td>1000</td>
    </tr>
    <tr>
    <td>connectionRecoveryPolicyType</td>
    <td>Connection Recovery Policy Type</td>
    <td>Defines the strategy for automatic connection recovery after a disconnection. <b>Options</b>:
        <ul>
            <li><b>FIXED</b>: Attempts to reconnect immediately after a connection failure with a fixed interval between retry attempts. This provides the fastest reconnection but may overwhelm the broker if it's experiencing issues or during network instability.</li>
            <li><b>FIXED_WITH_INITIAL_DELAY</b>: Waits for a specified initial delay before attempting the first reconnection, then continues with fixed intervals for subsequent retries. This gives the broker or network time to stabilize before reconnection attempts begin, reducing unnecessary load during transient failures.</li>
            <li><b>FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</b>: Combines an initial delay before the first retry attempt with a maximum timeout limit for the entire recovery process. If the connection cannot be re-established within the timeout period, recovery attempts cease. This prevents indefinite reconnection attempts and allows the application to fail gracefully or implement alternative handling. Recommended for production environments to balance resilience with resource management.</li>
        </ul>
    </td>
    <td>No</td>
    <td>FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</td>
    </tr>
    <tr>
        <td>connectionRecoveryInitialDelay</td>
        <td>Connection Recovery Initial Delay</td>
        <td>The initial delay (in milliseconds) before the first recovery attempt starts.</td>
        <td>No</td>
        <td>5000</td>
    </tr>
    <tr>
        <td>connectionRecoveryInterval</td>
        <td>Connection Recovery Interval</td>
        <td>The fixed interval (in milliseconds) between connection recovery retries.</td>
        <td>No</td>
        <td>10000</td>
    </tr>
    <tr>
        <td>connectionRecoveryTimeout</td>
        <td>Connection Recovery Timeout</td>
        <td>The total time (in milliseconds) allowed for the connection recovery process before giving up.</td>
        <td>No</td>
        <td>60000</td>
    </tr>
    </table>

    **Sample configuration**

    Given below is a sample configuration to create a client connection.

    ```xml
    <rabbitmq.init>
        <connectionType>RABBITMQ</connectionType>
        <name>rabbitMQConnection1</name>
        <serverUrls>localhost:5673</serverUrls>
        <saslMechanism>PLAIN</saslMechanism>
        <oAuth2Enabled>true</oAuth2Enabled>
        <tokenEndpoint>https://localhost:9443/oauth2/token</tokenEndpoint>
        <grantType>client_credentials</grantType>
        <clientId>****************</clientId>
        <clientSecret>****************</clientSecret>
        <sslEnabled>true</sslEnabled>
        <keyStoreLocation>/path/to/keystore.jks</keyStoreLocation>
        <keyStoreType>JKS</keyStoreType>
        <keyStorePassword>pasword</keyStorePassword>
        <trustStoreLocation>/path/to/client-truststore.jks</trustStoreLocation>
        <trustStoreType>JKS</trustStoreType>
        <trustStorePassword>password</trustStorePassword>
        <sslVersion>TLSv1.2</sslVersion>
        <connectionIdleTimeout>180000</connectionIdleTimeout>
        <connectionRecoveryPolicyType>FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</connectionRecoveryPolicyType>
        <connectionRecoveryInitialDelay>5000</connectionRecoveryInitialDelay>
        <connectionRecoveryInterval>10000</connectionRecoveryInterval>
        <connectionRecoveryTimeout>60000</connectionRecoveryTimeout>
    </rabbitmq.init>
    ```

---

## Operations

The following operations allow you to work with the RabbitMQ Connector. Click an operation name to see parameter details and samples on how to use it.

### Message Publishing Operations

The following operations allows you to send messages to RabbitMQ queues or exchanges.

??? note "Publish Message"
    The publishMessage operation allows you to publish messages to the RabbitMQ brokers.

    <table>
    <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Default Value</th>
        </tr>
        <tr>
            <td>RabbitMQ Connection</td>
            <td>name</td>
            <td>The name of the RabbitMQ connection configuration to use.</td>
            <td>Yes</td>
            <td> - </td>
        </tr>
        <tr>
            <th colspan="5">Destination Queue/Exchange Configuration</th>
        </tr>
        <tr>
            <td>queue</td>
            <td>Queue</td>
            <td>Specify the name of the RabbitMQ queue to publish to.</td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>queueType</td>
            <td>Queue Type</td>
            <td>Select the type of RabbitMQ queue to interact with. <b>Options</b>:
                <ul>
                    <li><b>CLASSIC</b>: The traditional RabbitMQ queue type with support for all messaging patterns and features. Offers flexibility and full protocol compatibility but provides limited fault tolerance as queues are stored on a single node. Suitable for development, testing, or non-critical workloads where high availability is not required.</li>
                    <li><b>QUORUM</b>: A replicated queue type built on the Raft consensus algorithm, providing high availability and data safety through replication across multiple cluster nodes. Automatically handles leader election and failover. Designed for critical workloads requiring message durability and resilience against node failures. Recommended for production environments where message loss is unacceptable. Note: Does not support all classic queue features (e.g., priority queues, message TTL at message level).</li>
                    <li><b>STREAM</b>: A persistent, append-only log structure optimized for high-throughput, large-volume message flows with non-destructive consumption. Messages are retained on disk and can be consumed multiple times by different consumers from any offset. Ideal for event streaming, audit logs, time-series data, and scenarios requiring message replay or long-term retention. Requires RabbitMQ 3.9+ and uses a different consumption model than traditional queues.</li>
                </ul>
            </td>
            <td>No</td>
            <td>QUORUM</td>
        </tr>
        <tr>
            <td>queueAutoDeclare</td>
            <td>Queue Auto Declare</td>
            <td>If enabled, the connector will attempt to declare the specified queue on the RabbitMQ server if it doesn't already exist.</td>
            <td>No</td>
            <td>true</td>
        </tr>
        <tr>
            <td>exchange</td>
            <td>Exchange Name</td>
            <td>Specify exchange name and routing key to publish message via an exchange instead of a queue. If using an exchange, leave queue blank—the routing key controls message delivery based on exchange type.</td>
            <td>No</td>
            <td> - </td>
        </tr>
          <tr>
            <td>exchangeType</td>
            <td>Exchange Type</td>
            <td>Defines how the exchange routes messages to queues based on routing rules. <b>Options</b>:
                <ul>
                    <li><b>DIRECT</b>: Routes messages to queues based on an exact match between the routing key and the binding key. Simple and efficient for point-to-point messaging where each message should be delivered to specific queues. Ideal for task distribution and targeted message delivery scenarios.</li>
                    <li><b>FANOUT</b>: Broadcasts all messages to all bound queues, ignoring routing keys entirely. Every queue bound to the exchange receives a copy of each message. Perfect for publish-subscribe patterns, notifications, and scenarios where the same message needs to reach multiple independent consumers simultaneously.</li>
                    <li><b>TOPIC</b>: Routes messages based on wildcard pattern matching between the routing key and binding patterns. Binding keys can use wildcards: <code>*</code> (matches exactly one word) and <code>#</code> (matches zero or more words). Enables flexible, hierarchical routing based on multi-part routing keys (e.g., <code>stock.usa.tech</code>). Suitable for complex routing scenarios like log aggregation, multi-criteria filtering, and selective subscription patterns.</li>
                    <li><b>HEADERS</b>: Routes messages based on matching message header attributes rather than routing keys. Uses the <code>x-match</code> binding argument to specify whether <b>all</b> headers must match or <b>any</b> header match is sufficient. Provides the most flexible routing but with higher overhead. Best for complex routing rules based on multiple message properties or when routing logic cannot be expressed through routing keys alone.</li>
                </ul>
            </td>
            <td>No</td>
            <td>DIRECT</td>
        </tr>
        <tr>
            <td>exchangeAutoDeclare</td>
            <td>Exchange Auto Declare</td>
            <td>If enabled, the connector will attempt to declare the specified exchange on the RabbitMQ server if it doesn't already exist.</td>
            <td>No</td>
            <td>true</td>
        </tr>
        <tr>
            <td>routingKey</td>
            <td>Routing Key</td>
            <td>Specify a routing key when binding a queue to a DIRECT or TOPIC exchange. If omitted, the queue name will be used as the routing key.</td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <th colspan="5">Request Message Configuration</th>
        </tr>
        <tr>
            <td>headers</td>
            <td>Headers</td>
            <td>Key value pairs for headers</td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>requestBodyType</td>
            <td>Content Type</td>
            <td>The content type of the request body. Options: JSON, XML, TEXT</td>
            <td>No</td>
            <td>JSON</td>
        </tr>
        <tr>
            <td>requestBodyJson</td>
            <td>Request Body</td>
            <td>Request body when content type is JSON</td>
            <td>No</td>
            <td>${payload}</td>
        </tr>
        <tr>
            <td>requestBodyXml</td>
            <td>Request Body</td>
            <td>Request body when content type is XML</td>
            <td>No</td>
            <td>${xpath('$body/node()')}</td>
        </tr>
        <tr>
            <td>requestBodyText</td>
            <td>Request Body</td>
            <td>Request body when content type is TEXT</td>
            <td>No</td>
            <td>${xpath('$body/node()')}</td>
        </tr>
        <tr>
            <th colspan="5">Publisher Client Configuration</th>
        </tr>
        <tr>
            <td>publisherConfirms</td>
            <td>Publisher Confirms</td>
            <td>Enable publisher confirms to ensure message delivery acknowledgment from the RabbitMQ broker.</td>
            <td>No</td>
            <td>true</td>
        </tr>
        <tr>
            <td>publishTimeout</td>
            <td>Publish Timeout (ms)</td>
            <td>The maximum time (in milliseconds) to wait for the message to be published before timing out.</td>
            <td>No</td>
            <td>60000</td>
        </tr>
        <tr>
            <th colspan="5">Queue Properties</th>
        </tr>
        <tr>
        <td>queueArguments</td>
        <td>Queue Arguments</td>
        <td>Additional arguments to customize queue behavior when declaring the queue. Specify as comma-separated key=value pairs (e.g., <code>x-message-ttl=60000,x-max-length=1000</code>).
            <br><br>
            <b>Common queue arguments</b>:
            <ul>
                <li><code>x-message-ttl</code>: Sets the time-to-live (TTL) for messages in milliseconds. Messages older than this value are automatically discarded or dead-lettered. Example: <code>x-message-ttl=60000</code> (1 minute). Useful for time-sensitive data like session tokens or temporary notifications.</li>
                <li><code>x-max-length</code>: Limits the maximum number of messages the queue can hold. When exceeded, the overflow strategy (see <code>queueOverflowStrategy</code>) determines what happens. Example: <code>x-max-length=10000</code>. Prevents unbounded queue growth.</li>
                <li><code>x-max-length-bytes</code>: Limits the maximum total size of messages in bytes. Alternative to message count limit. Example: <code>x-max-length-bytes=10485760</code> (10MB). Useful for controlling memory usage.</li>
                <li><code>x-dead-letter-exchange</code>: Specifies the exchange to route dead-lettered messages (expired, rejected, or exceeding delivery limits). Example: <code>x-dead-letter-exchange=dlx</code>. Essential for handling failed or problematic messages.</li>
                <li><code>x-dead-letter-routing-key</code>: Optional routing key for dead-lettered messages. If not set, the original routing key is used. Example: <code>x-dead-letter-routing-key=failed.orders</code>.</li>
                <li><code>x-expires</code>: Auto-deletes the queue after specified milliseconds of inactivity (no consumers, no messages published). Example: <code>x-expires=1800000</code> (30 minutes). Useful for temporary or session-based queues.</li>
                <li><code>x-single-active-consumer</code>: When set to <code>true</code>, ensures only one consumer receives messages at a time (others are on standby). Example: <code>x-single-active-consumer=true</code>. Useful for ordered processing or leader election patterns.</li>
            </ul>
            <b>Format</b>: Use the syntax <code>key1=value1,key2=value2</code> with no spaces. Numeric values should be in milliseconds for time-based arguments or plain integers/bytes for counts and sizes. Boolean values should be <code>true</code> or <code>false</code>.
            <br><br>
            <b>Note</b>: Arguments specified here are applied during queue declaration. If the queue already exists with different arguments, the declaration will fail unless the arguments match exactly. Some arguments are queue-type specific (e.g., <code>x-max-priority</code> for CLASSIC queues only). Leave blank if no custom queue arguments are needed.
        </td>
        <td>No</td>
        <td> - </td>
       </tr>
         <tr>
            <td>rabbitmq.classic.version</td>
            <td>Queue Version</td>
            <td>For Classic Queues, select the queue implementation version. <b>Options</b>:
                <ul>
                    <li><b>V1</b>: The legacy classic queue implementation available in all RabbitMQ versions. Uses the original message storage and indexing mechanism. While mature and stable, it has known performance limitations with large queues, high message rates, and memory efficiency. Consider using V1 only for backward compatibility or if running RabbitMQ versions prior to 3.10.</li>
                    <li><b>V2</b>: The modern classic queue implementation introduced in RabbitMQ 3.10, also known as CQv2 (Classic Queue version 2). Provides significantly improved performance, memory efficiency, and scalability through optimized message storage and reduced per-message overhead. Offers better handling of large queues (millions of messages) and higher throughput. Recommended for all new deployments and production workloads running RabbitMQ 3.10 or later. Note: Once a queue is created with a specific version, it cannot be changed without recreating the queue.</li>
                </ul>
                <b>Important</b>: This setting only applies to CLASSIC queue types and is ignored for QUORUM and STREAM queues.
            </td>
            <td>No</td>
            <td>V2</td>
        </tr>
         <tr>
            <td>maxPriority</td>
            <td>Queue Max Priority</td>
            <td>For Classic Queues: defines the maximum priority level the queue should support (valid range: 0-255). When set, this parameter adds the <code>x-max-priority</code> argument to the queue declaration, enabling priority queue functionality.
                <br><br>
                <b>How it works</b>: Messages published with a priority value (0 to the specified max) are delivered to consumers in priority order, with higher priority messages consumed first. Messages without an explicit priority are treated as priority 0 (lowest). 
                <br><br>
                <b>Performance considerations</b>: Priority queues have additional CPU and memory overhead compared to standard queues. Higher max priority values increase this overhead. For most use cases, a max priority of 10 or less is sufficient and recommended.
                <br><br>
                <b>Use cases</b>: Suitable for scenarios requiring differentiated message handling, such as urgent alerts, high-priority transactions, or tiered job processing systems.
                <br><br>
                <b>Important</b>: Priority queues are only supported by CLASSIC queues. This setting is ignored for QUORUM and STREAM queue types. Leave empty or set to 0 to disable priority functionality.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
         <tr>
            <td>initialMemberCount</td>
            <td>Queue Initial Member Count</td>
            <td>Specifies the initial number of cluster nodes that will host replicas of the queue. This setting applies differently based on queue type:
                <br><br>
                <b>For Quorum Queues</b>: Defines the initial replication factor (number of replica nodes) for the queue. The default is 3 replicas if not specified, which provides a good balance between availability and resource usage. Quorum queues require a majority (quorum) of replicas to be available for operation. For example, with 3 replicas, the queue tolerates 1 node failure; with 5 replicas, it tolerates 2 node failures. Higher replica counts improve fault tolerance but increase network overhead and resource consumption.
                <br><br>
                <b>For Stream Queues</b>: Determines the initial number of stream replicas across cluster nodes. Similar to quorum queues, this affects data redundancy and availability. Streams use leader-based replication where one replica is the leader handling writes, while followers replicate data.
                <br><br>
                <b>Considerations</b>:
                <ul>
                    <li>The cluster must have at least as many nodes as the specified member count</li>
                    <li>Odd numbers (3, 5, 7) are recommended for quorum-based systems to avoid split-brain scenarios</li>
                    <li>Leave blank to use RabbitMQ's default behavior (typically 3 replicas)</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM and STREAM queue types and is ignored for CLASSIC queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
          <tr>
            <td>deliveryLimit</td>
            <td>Queue Delivery Limit</td>
            <td>For Quorum Queues: defines the maximum number of delivery attempts for a message before it is automatically dead-lettered or discarded. This setting adds the <code>x-delivery-limit</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: When a message is negatively acknowledged (nack/reject) or requeued by a consumer, RabbitMQ increments its delivery counter. Once the delivery count reaches the specified limit, the message is either moved to a configured dead letter exchange (DLX) or dropped if no DLX is configured.
                <br><br>
                <b>Use cases</b>: Prevents poison messages (messages that repeatedly fail processing) from blocking the queue indefinitely. Essential for building resilient systems where problematic messages can be isolated for manual inspection or alternative handling without affecting other messages.
                <br><br>
                <b>Best practices</b>:
                <ul>
                    <li>Always configure a dead letter exchange when using delivery limits to capture failed messages for analysis</li>
                    <li>Typical values range from 3-10 depending on your tolerance for retries</li>
                    <li>Consider implementing exponential backoff in consumers before relying solely on delivery limits</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM queue types and is ignored for CLASSIC and STREAM queues. Leave blank to disable delivery limit enforcement (messages can be redelivered indefinitely).
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
            <tr>
            <td>deadLetterStrategy</td>
            <td>Quorum Queue Dead Letter Strategy</td>
            <td>For Quorum Queues: defines how messages are handled when being dead-lettered, controlling the delivery guarantee semantics. This setting adds the <code>x-dead-letter-strategy</code> argument to the queue declaration. <b>Options</b>:
                <ul>
                    <li><b>AT_MOST_ONCE</b>: The default and safer strategy. Messages are removed from the original queue before being published to the dead letter exchange (DLX). This guarantees that a message will not be duplicated if the dead-lettering process fails - it will either be in the original queue or successfully dead-lettered, but never in both. However, in case of broker failure during dead-lettering, the message may be lost. Recommended for most use cases where preventing duplicate processing is more critical than preventing message loss.</li>
                    <li><b>AT_LEAST_ONCE</b>: Messages are published to the dead letter exchange first, then removed from the original queue only after successful publication. This ensures no message is lost during the dead-lettering process, but in case of failures, the same message might be dead-lettered multiple times, resulting in duplicates in the DLX. Use this when message loss is unacceptable and your downstream systems can handle duplicate messages (idempotent processing).</li>
                </ul>
                <b>Trade-offs</b>:
                <ul>
                    <li><b>AT_MOST_ONCE</b>: Prevents duplicates, risks message loss on failure</li>
                    <li><b>AT_LEAST_ONCE</b>: Prevents message loss, risks duplicates on failure</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM queue types and requires a dead letter exchange to be configured. It is ignored for CLASSIC and STREAM queues.
            </td>
            <td>No</td>
            <td>AT_MOST_ONCE</td>
        </tr>
            <tr>
            <td>maxAge</td>
            <td>Queue Max Age</td>
            <td>For STREAM queues: defines the maximum time-based retention period for messages in the stream. This setting adds the <code>x-max-age</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: Messages older than the specified age are automatically deleted from the stream to manage disk space. Age is calculated from the message timestamp. The retention policy is evaluated periodically, not in real-time, so messages may persist slightly beyond the specified age.
                <br><br>
                <b>Format</b>: Specify the duration using time units:
                <ul>
                    <li><code>Y</code> - Years (e.g., <code>1Y</code>)</li>
                    <li><code>M</code> - Months (e.g., <code>3M</code>)</li>
                    <li><code>D</code> - Days (e.g., <code>7D</code>)</li>
                    <li><code>h</code> - Hours (e.g., <code>24h</code>)</li>
                    <li><code>m</code> - Minutes (e.g., <code>30m</code>)</li>
                    <li><code>s</code> - Seconds (e.g., <code>3600s</code>)</li>
                </ul>
                <b>Use cases</b>: Essential for managing storage costs and compliance requirements in event streaming scenarios. For example, audit logs might retain data for 90 days, while real-time analytics streams might only need 24 hours.
                <br><br>
                <b>Considerations</b>:
                <ul>
                    <li>Can be combined with <code>maxLengthBytes</code> - whichever limit is reached first triggers deletion</li>
                    <li>Deleted messages cannot be recovered</li>
                    <li>Leave blank for unlimited retention (not recommended for production - may exhaust disk space)</li>
                </ul>
                <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
        <td>maxSegmentSize</td>
        <td>Queue Max Segment Size (Bytes)</td>
            <td>For STREAM queues: defines the maximum size in bytes for individual segment files in the stream's underlying storage. This setting adds the <code>x-stream-max-segment-size-bytes</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: RabbitMQ streams store messages in append-only segment files on disk. When a segment reaches the specified size, it is closed and a new segment is created. Smaller segments are rotated more frequently, while larger segments reduce the number of files but increase individual file sizes.
                <br><br>
                <b>Performance implications</b>:
                <ul>
                    <li><b>Smaller segments</b> (e.g., 100MB-250MB): More frequent rotation, faster deletion of old data when retention policies apply, better for scenarios with frequent retention policy enforcement, but higher file system overhead</li>
                    <li><b>Larger segments</b> (e.g., 500MB-1GB): Fewer files, reduced I/O overhead, better sequential write performance, but slower retention cleanup and potentially longer recovery times</li>
                </ul>
                <b>Default behavior</b>: If not specified, RabbitMQ uses a default value of 500MB (524,288,000 bytes), which balances performance and manageability for most workloads.
                <br><br>
                <b>Best practices</b>:
                <ul>
                    <li>Consider your retention period: shorter retention periods benefit from smaller segments for faster cleanup</li>
                    <li>Match to your message rate: high-throughput streams may benefit from larger segments</li>
                    <li>Ensure adequate disk I/O capacity for your chosen segment size</li>
                    <li>Typical range: 100MB to 1GB depending on workload characteristics</li>
                </ul>
                <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues. Leave blank to use the RabbitMQ default (500MB).
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>queueExclusive</td>
            <td>Queue Exclusive</td>
            <td>If enabled, the queue will be deleted when the connection that declared it closes. Only one consumer can use an exclusive queue.</td>
            <td>No</td>
            <td>false</td>
        </tr>
        <tr>
            <td>queueAutoDelete</td>
            <td>Queue Auto Delete</td>
            <td>If enabled, the queue will be automatically deleted when the last consumer disconnects from it.</td>
            <td>No</td>
            <td>false</td>
        </tr>
           <tr>
            <td>queueOverflowStrategy</td>
            <td>Queue Overflow Strategy</td>
            <td>Defines the behavior when a queue reaches its maximum length limit (set via <code>maxLength</code> or <code>maxLengthBytes</code>). This setting adds the <code>x-overflow</code> argument to the queue declaration. <b>Options</b>:
                <ul>
                    <li><b>DROP_HEAD</b>: Automatically discards the oldest messages from the front of the queue to make room for new incoming messages. The queue maintains its maximum size by continuously dropping the oldest data. Publishers are not notified of the drops, and messages are silently discarded without any delivery guarantees. Best for scenarios where recent data is more valuable than old data, such as real-time metrics, live sensor readings, or recent activity feeds where historical data can be safely discarded.</li>
                    <li><b>REJECT_PUBLISH</b>: Refuses to accept new messages when the queue is full. Publishers receive a negative acknowledgment (basic.return or exception depending on the client), allowing them to handle the rejection (retry, log error, route elsewhere). The queue preserves all existing messages without dropping any. Suitable for workloads where message loss is unacceptable and publishers can implement backpressure handling or alternative routing strategies.</li>
                    <li><b>REJECT_PUBLISH_DLX</b>: Similar to REJECT_PUBLISH, but rejected messages are automatically routed to the configured Dead Letter Exchange (DLX) instead of being lost. This allows rejected messages to be captured, inspected, and potentially reprocessed later. Requires a DLX to be configured on the queue; otherwise, behaves like REJECT_PUBLISH. Ideal for critical workflows where overflow messages need preservation and manual review, or for implementing overflow queues as a secondary processing tier.</li>
                </ul>
                <b>Use case guidance</b>:
                <ul>
                    <li><b>DROP_HEAD</b>: Circular buffers, caching layers, monitoring dashboards, sliding time windows</li>
                    <li><b>REJECT_PUBLISH</b>: Task queues with strict ordering, financial transactions, systems with explicit backpressure</li>
                    <li><b>REJECT_PUBLISH_DLX</b>: Audit systems, compliance-sensitive workflows, overflow handling with recovery options</li>
                </ul>
                <b>Important</b>: This setting applies to CLASSIC and QUORUM queues when length limits are defined. STREAM queues handle overflow through their own retention mechanisms (<code>maxAge</code>, <code>maxLengthBytes</code>).
            </td>
            <td>No</td>
            <td>DROP_HEAD</td>
        </tr>
        <tr>
            <th colspan="5">Exchange Properties</th>
        </tr>
            <tr>
            <td>exchangeArguments</td>
            <td>Exchange Arguments</td>
            <td>Additional arguments to customize exchange behavior when declaring the exchange. Specify as comma-separated key=value pairs (e.g., <code>alternate-exchange=my-ae,internal=true</code>).
                <br><br>
                <b>Common exchange arguments</b>:
                <ul>
                    <li><code>alternate-exchange</code>: Specifies an alternate exchange to route messages that cannot be routed by the primary exchange (no matching bindings). Useful for capturing unroutable messages instead of returning them to the publisher or silently dropping them. Example: <code>alternate-exchange=unrouted-messages</code></li>
                    <li><code>internal</code>: When set to <code>true</code>, marks the exchange as internal, preventing direct publishing from clients. Internal exchanges can only receive messages from other exchanges via exchange-to-exchange bindings. Useful for building complex routing topologies. Example: <code>internal=true</code></li>
                </ul>
                <b>Format</b>: Use the syntax <code>key1=value1,key2=value2</code> with no spaces around the equals sign or commas. Boolean values should be specified as <code>true</code> or <code>false</code>.
                <br><br>
                <b>Use cases</b>:
                <ul>
                    <li><b>Alternate exchanges</b>: Error handling, audit trails for unrouted messages, fallback routing</li>
                    <li><b>Internal exchanges</b>: Multi-stage routing pipelines, routing abstraction layers, exchange federation</li>
                </ul>
                <b>Note</b>: Arguments specified here are applied during exchange declaration. If the exchange already exists with different arguments, the declaration will fail unless the arguments match exactly. Leave blank if no custom exchange arguments are needed.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
            <tr>
            <td>headerExchangeArguments</td>
            <td>Header Exchange Binding Arguments</td>
            <td>For HEADERS exchanges: defines the header matching criteria used to route messages from the exchange to the bound queue. Specify as comma-separated key=value pairs (e.g., <code>x-match=all,format=pdf,type=report</code>).
                <br><br>
                <b>Required argument</b>:
                <ul>
                    <li><code>x-match</code>: Controls the matching logic for header-based routing. <b>Must be specified</b> for HEADERS exchange bindings.
                        <ul>
                            <li><code>x-match=any</code>: Routes the message if <b>any</b> of the binding headers match the message headers. Acts as a logical OR operation. Example: binding with <code>x-match=any,priority=high,urgent=true</code> will match messages with either <code>priority=high</code> OR <code>urgent=true</code> (or both).</li>
                            <li><code>x-match=all</code>: Routes the message only if <b>all</b> binding headers match the message headers. Acts as a logical AND operation. Example: binding with <code>x-match=all,format=pdf,type=report</code> requires both <code>format=pdf</code> AND <code>type=report</code> in the message headers for routing to succeed.</li>
                        </ul>
                    </li>
                </ul>
                <b>Additional headers</b>: Any other key=value pairs specified (beyond <code>x-match</code>) define the actual header criteria for matching. Message headers must contain matching key-value pairs according to the <code>x-match</code> logic.
                <br><br>
                <b>Format</b>: Use the syntax <code>x-match=any|all,header1=value1,header2=value2</code>. Header values are case-sensitive and must match exactly.
                <br><br>
                <b>Examples</b>:
                <ul>
                    <li><code>x-match=all,type=order,priority=high</code> - Matches only messages with both headers</li>
                    <li><code>x-match=any,region=us,region=eu</code> - Matches messages from either US or EU region</li>
                    <li><code>x-match=all,format=json</code> - Matches only JSON format messages</li>
                </ul>
                <b>Important</b>: This setting only applies when using HEADERS exchange type and is ignored for DIRECT, FANOUT, and TOPIC exchanges. Messages are evaluated based on their header properties, not their routing key.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>exchangeAutoDelete</td>
            <td>Exchange Auto Delete</td>
            <td>If enabled, the exchange will be automatically deleted when the last queue is unbound from it.</td>
            <td>No</td>
            <td>false</td>
        </tr>
        <tr>
            <th colspan="5">Other</th>
        </tr>
        <tr>
            <td>requestCharSet</td>
            <td>Request Content Encoding (Charset)</td>
            <td>The content encoding/character set (e.g., UTF-8) used for the message body if the encoding/character set cannot be determined from the request message.</td>
            <td>No</td>
            <td>UTF-8</td>
        </tr>
        <tr>
            <th colspan="5">Output</th>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Output Variable Name</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
            <td>rabbitmq_response_variable1</td>
        </tr>
     </table>
    
    **Sample configuration**

    ```xml
    <rabbitmq.publishMessage configKey="RabbitMQConnection">
                    <queue>{${payload.queue}}</queue>
                    <queueAutoDeclare>true</queueAutoDeclare>
                    <queueType>QUORUM</queueType>
                    <queueArguments></queueArguments>
                    <deliveryLimit></deliveryLimit>
                    <deadLetterStrategy></deadLetterStrategy>
                    <queueAutoDelete>false</queueAutoDelete>
                    <queueOverflowStrategy>DROP_HEAD</queueOverflowStrategy>
                    <exchange></exchange>
                    <exchangeAutoDeclare>false</exchangeAutoDeclare>
                    <exchangeType>DIRECT</exchangeType>
                    <routingKey></routingKey>
                    <exchangeArguments></exchangeArguments>
                    <exchangeAutoDelete>false</exchangeAutoDelete>
                    <publishTimeout>60000</publishTimeout>
                    <publisherConfirms>true</publisherConfirms>
                    <headers>[]</headers>
                    <requestBodyType>TEXT</requestBodyType>
                    <requestBodyText>${payload.message}</requestBodyText>
                    <requestCharSet></requestCharSet>
                    <responseVariable>rabbitmq_publishMessage_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
     </rabbitmq.publishMessage>
    ```
    
     The following properties will be set to a new variable upon receiving a successful acknowledgment (Accept) from the RabbitMQ broker.
     ```json
     {
            "success": "true"
            "msgid: "urn:uuid:a40ec122-e3eb-4915-aafe-5686f90871eb"
     }
     ```
    
??? note "Send RPC Request"
    The sendRpc operation allows you to send an RPC request to the RabbitMQ broker. This is a synchronous operation that waits for the response from the broker before proceeding. This is the operation that initiates the dual-channel scenario.
        
    <table>
    <tr>
            <th>Parameter Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Default Value</th>
        </tr>
         <tr>
            <td>RabbitMQ Connection</td>
            <td>name</td>
            <td>The name of the RabbitMQ connection configuration to use.</td>
            <td>Yes</td>
            <td> - </td>
        </tr>
        <tr>
            <th colspan="5">Destination Queue Configuration</th>
        </tr>
        <tr>
            <td>queue</td>
            <td>Queue</td>
            <td>The name of the Queue.</td>
            <td>Yes</td>
            <td> - </td>
        </tr>
        <tr>
            <td>queueType</td>
            <td>Queue Type</td>
            <td>Select the type of RabbitMQ queue to interact with: Classic, Quorum (for high availability), or Stream (for large, continuous message flows). Options: CLASSIC, QUORUM, STREAM</td>
            <td>Yes</td>
            <td>QUORUM</td>
        </tr>
        <tr>
            <td>queueType</td>
            <td>Queue Type</td>
            <td>Select the type of RabbitMQ queue to interact with. <b>Options</b>:
                <ul>
                    <li><b>CLASSIC</b>: The traditional RabbitMQ queue type with support for all messaging patterns and features. Offers flexibility and full protocol compatibility but provides limited fault tolerance as queues are stored on a single node. Suitable for development, testing, or non-critical workloads where high availability is not required.</li>
                    <li><b>QUORUM</b>: A replicated queue type built on the Raft consensus algorithm, providing high availability and data safety through replication across multiple cluster nodes. Automatically handles leader election and failover. Designed for critical workloads requiring message durability and resilience against node failures. Recommended for production environments where message loss is unacceptable. Note: Does not support all classic queue features (e.g., priority queues, message TTL at message level).</li>
                    <li><b>STREAM</b>: A persistent, append-only log structure optimized for high-throughput, large-volume message flows with non-destructive consumption. Messages are retained on disk and can be consumed multiple times by different consumers from any offset. Ideal for event streaming, audit logs, time-series data, and scenarios requiring message replay or long-term retention. Requires RabbitMQ 3.9+ and uses a different consumption model than traditional queues.</li>
                </ul>
            </td>
            <td>No</td>
            <td>QUORUM</td>
        </tr>
        <tr>
            <th colspan="5">Reply-To Queue Configuration</th>
        </tr>
        <tr>
            <td>replyToQueue</td>
            <td>Reply-To Queue</td>
            <td>The name of the Reply-To Queue.</td>
            <td>Yes</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueType</td>
            <td>Reply-To Queue Type</td>
            <td>Select the type of RabbitMQ queue to interact with. <b>Options</b>:
                <ul>
                    <li><b>CLASSIC</b>: The traditional RabbitMQ queue type with support for all messaging patterns and features. Offers flexibility and full protocol compatibility but provides limited fault tolerance as queues are stored on a single node. Suitable for development, testing, or non-critical workloads where high availability is not required.</li>
                    <li><b>QUORUM</b>: A replicated queue type built on the Raft consensus algorithm, providing high availability and data safety through replication across multiple cluster nodes. Automatically handles leader election and failover. Designed for critical workloads requiring message durability and resilience against node failures. Recommended for production environments where message loss is unacceptable. Note: Does not support all classic queue features (e.g., priority queues, message TTL at message level).</li>
                    <li><b>STREAM</b>: A persistent, append-only log structure optimized for high-throughput, large-volume message flows with non-destructive consumption. Messages are retained on disk and can be consumed multiple times by different consumers from any offset. Ideal for event streaming, audit logs, time-series data, and scenarios requiring message replay or long-term retention. Requires RabbitMQ 3.9+ and uses a different consumption model than traditional queues.</li>
                </ul>
            </td>
            <td>Yes</td>
            <td>QUORUM</td>
        </tr>
        <tr>
            <td>replyToQueueAutoDeclare</td>
            <td>Reply-To Queue Auto Declare</td>
            <td>If enabled, the connector will attempt to declare the specified queue on the RabbitMQ server if it doesn't already exist.</td>
            <td>No</td>
            <td>true</td>
        </tr>
        <tr>
            <th colspan="5">Request Message Configuration</th>
        </tr>
        <tr>
            <td>headers</td>
            <td>Request Headers</td>
            <td>Key value pairs for headers</td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>requestBodyType</td>
            <td>Request Content Type</td>
            <td>The content type of the request body. Options: JSON, XML, TEXT</td>
            <td>No</td>
            <td>JSON</td>
        </tr>
        <tr>
            <td>requestBodyJson</td>
            <td>Request Body</td>
            <td>Request body when content type is JSON</td>
            <td>No</td>
            <td>${payload}</td>
        </tr>
        <tr>
            <td>requestBodyXml</td>
            <td>Request Body</td>
            <td>Request body when content type is XML</td>
            <td>No</td>
            <td>${xpath('$body/node()')}</td>
        </tr>
        <tr>
            <td>requestBodyText</td>
            <td>Request Body</td>
            <td>Request body when content type is TEXT</td>
            <td>No</td>
            <td>${xpath('$body/node()')}</td>
        </tr>
        <tr>
            <th colspan="5">RPC Client Configuration</th>
        </tr>
        <tr>
            <td>requestTimeout</td>
            <td>Request Timeout (ms)</td>
            <td>The maximum time (in milliseconds) to wait for sending the RPC request.</td>
            <td>No</td>
            <td>60000</td>
        </tr>
        <tr>
            <th colspan="5">Response Message Configuration</th>
        </tr>
        <tr>
            <td>responseBodyType</td>
            <td>Response Content Type</td>
            <td>Set the desired content type for the response if the content type cannot be determined from the RabbitMQ response message. Options: JSON, XML, TEXT</td>
            <td>No</td>
            <td>JSON</td>
        </tr>
        <tr>
            <th colspan="5">Queue Properties</th>
        </tr>
        <tr>
            <td>queueArguments</td>
            <td>Queue Arguments</td>
            <td>Additional arguments to customize queue behavior when declaring the queue. Specify as comma-separated key=value pairs (e.g., <code>x-message-ttl=60000,x-max-length=1000</code>).
                <br><br>
                <b>Common queue arguments</b>:
                <ul>
                    <li><code>x-message-ttl</code>: Sets the time-to-live (TTL) for messages in milliseconds. Messages older than this value are automatically discarded or dead-lettered. Example: <code>x-message-ttl=60000</code> (1 minute). Useful for time-sensitive data like session tokens or temporary notifications.</li>
                    <li><code>x-max-length</code>: Limits the maximum number of messages the queue can hold. When exceeded, the overflow strategy (see <code>queueOverflowStrategy</code>) determines what happens. Example: <code>x-max-length=10000</code>. Prevents unbounded queue growth.</li>
                    <li><code>x-max-length-bytes</code>: Limits the maximum total size of messages in bytes. Alternative to message count limit. Example: <code>x-max-length-bytes=10485760</code> (10MB). Useful for controlling memory usage.</li>
                    <li><code>x-dead-letter-exchange</code>: Specifies the exchange to route dead-lettered messages (expired, rejected, or exceeding delivery limits). Example: <code>x-dead-letter-exchange=dlx</code>. Essential for handling failed or problematic messages.</li>
                    <li><code>x-dead-letter-routing-key</code>: Optional routing key for dead-lettered messages. If not set, the original routing key is used. Example: <code>x-dead-letter-routing-key=failed.orders</code>.</li>
                    <li><code>x-expires</code>: Auto-deletes the queue after specified milliseconds of inactivity (no consumers, no messages published). Example: <code>x-expires=1800000</code> (30 minutes). Useful for temporary or session-based queues.</li>
                    <li><code>x-single-active-consumer</code>: When set to <code>true</code>, ensures only one consumer receives messages at a time (others are on standby). Example: <code>x-single-active-consumer=true</code>. Useful for ordered processing or leader election patterns.</li>
                </ul>
                <b>Format</b>: Use the syntax <code>key1=value1,key2=value2</code> with no spaces. Numeric values should be in milliseconds for time-based arguments or plain integers/bytes for counts and sizes. Boolean values should be <code>true</code> or <code>false</code>.
                <br><br>
                <b>Note</b>: Arguments specified here are applied during queue declaration. If the queue already exists with different arguments, the declaration will fail unless the arguments match exactly. Some arguments are queue-type specific (e.g., <code>x-max-priority</code> for CLASSIC queues only). Leave blank if no custom queue arguments are needed.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>rabbitmq.classic.version</td>
            <td>Queue Version</td>
            <td>For Classic Queues, select the queue implementation version. <b>Options</b>:
                <ul>
                    <li><b>V1</b>: The legacy classic queue implementation available in all RabbitMQ versions. Uses the original message storage and indexing mechanism. While mature and stable, it has known performance limitations with large queues, high message rates, and memory efficiency. Consider using V1 only for backward compatibility or if running RabbitMQ versions prior to 3.10.</li>
                    <li><b>V2</b>: The modern classic queue implementation introduced in RabbitMQ 3.10, also known as CQv2 (Classic Queue version 2). Provides significantly improved performance, memory efficiency, and scalability through optimized message storage and reduced per-message overhead. Offers better handling of large queues (millions of messages) and higher throughput. Recommended for all new deployments and production workloads running RabbitMQ 3.10 or later. Note: Once a queue is created with a specific version, it cannot be changed without recreating the queue.</li>
                </ul>
                <b>Important</b>: This setting only applies to CLASSIC queue types and is ignored for QUORUM and STREAM queues.
            </td>
            <td>No</td>
            <td>V2</td>
        </tr>
         <tr>
            <td>maxPriority</td>
            <td>Queue Max Priority</td>
            <td>For Classic Queues: defines the maximum priority level the queue should support (valid range: 0-255). When set, this parameter adds the <code>x-max-priority</code> argument to the queue declaration, enabling priority queue functionality.
                <br><br>
                <b>How it works</b>: Messages published with a priority value (0 to the specified max) are delivered to consumers in priority order, with higher priority messages consumed first. Messages without an explicit priority are treated as priority 0 (lowest). 
                <br><br>
                <b>Performance considerations</b>: Priority queues have additional CPU and memory overhead compared to standard queues. Higher max priority values increase this overhead. For most use cases, a max priority of 10 or less is sufficient and recommended.
                <br><br>
                <b>Use cases</b>: Suitable for scenarios requiring differentiated message handling, such as urgent alerts, high-priority transactions, or tiered job processing systems.
                <br><br>
                <b>Important</b>: Priority queues are only supported by CLASSIC queues. This setting is ignored for QUORUM and STREAM queue types. Leave empty or set to 0 to disable priority functionality.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
         <tr>
            <td>initialMemberCount</td>
            <td>Queue Initial Member Count</td>
            <td>Specifies the initial number of cluster nodes that will host replicas of the queue. This setting applies differently based on queue type:
                <br><br>
                <b>For Quorum Queues</b>: Defines the initial replication factor (number of replica nodes) for the queue. The default is 3 replicas if not specified, which provides a good balance between availability and resource usage. Quorum queues require a majority (quorum) of replicas to be available for operation. For example, with 3 replicas, the queue tolerates 1 node failure; with 5 replicas, it tolerates 2 node failures. Higher replica counts improve fault tolerance but increase network overhead and resource consumption.
                <br><br>
                <b>For Stream Queues</b>: Determines the initial number of stream replicas across cluster nodes. Similar to quorum queues, this affects data redundancy and availability. Streams use leader-based replication where one replica is the leader handling writes, while followers replicate data.
                <br><br>
                <b>Considerations</b>:
                <ul>
                    <li>The cluster must have at least as many nodes as the specified member count</li>
                    <li>Odd numbers (3, 5, 7) are recommended for quorum-based systems to avoid split-brain scenarios</li>
                    <li>Leave blank to use RabbitMQ's default behavior (typically 3 replicas)</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM and STREAM queue types and is ignored for CLASSIC queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
          <tr>
            <td>deliveryLimit</td>
            <td>Queue Delivery Limit</td>
            <td>For Quorum Queues: defines the maximum number of delivery attempts for a message before it is automatically dead-lettered or discarded. This setting adds the <code>x-delivery-limit</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: When a message is negatively acknowledged (nack/reject) or requeued by a consumer, RabbitMQ increments its delivery counter. Once the delivery count reaches the specified limit, the message is either moved to a configured dead letter exchange (DLX) or dropped if no DLX is configured.
                <br><br>
                <b>Use cases</b>: Prevents poison messages (messages that repeatedly fail processing) from blocking the queue indefinitely. Essential for building resilient systems where problematic messages can be isolated for manual inspection or alternative handling without affecting other messages.
                <br><br>
                <b>Best practices</b>:
                <ul>
                    <li>Always configure a dead letter exchange when using delivery limits to capture failed messages for analysis</li>
                    <li>Typical values range from 3-10 depending on your tolerance for retries</li>
                    <li>Consider implementing exponential backoff in consumers before relying solely on delivery limits</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM queue types and is ignored for CLASSIC and STREAM queues. Leave blank to disable delivery limit enforcement (messages can be redelivered indefinitely).
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
            <tr>
            <td>deadLetterStrategy</td>
            <td>Quorum Queue Dead Letter Strategy</td>
            <td>For Quorum Queues: defines how messages are handled when being dead-lettered, controlling the delivery guarantee semantics. This setting adds the <code>x-dead-letter-strategy</code> argument to the queue declaration. <b>Options</b>:
                <ul>
                    <li><b>AT_MOST_ONCE</b>: The default and safer strategy. Messages are removed from the original queue before being published to the dead letter exchange (DLX). This guarantees that a message will not be duplicated if the dead-lettering process fails - it will either be in the original queue or successfully dead-lettered, but never in both. However, in case of broker failure during dead-lettering, the message may be lost. Recommended for most use cases where preventing duplicate processing is more critical than preventing message loss.</li>
                    <li><b>AT_LEAST_ONCE</b>: Messages are published to the dead letter exchange first, then removed from the original queue only after successful publication. This ensures no message is lost during the dead-lettering process, but in case of failures, the same message might be dead-lettered multiple times, resulting in duplicates in the DLX. Use this when message loss is unacceptable and your downstream systems can handle duplicate messages (idempotent processing).</li>
                </ul>
                <b>Trade-offs</b>:
                <ul>
                    <li><b>AT_MOST_ONCE</b>: Prevents duplicates, risks message loss on failure</li>
                    <li><b>AT_LEAST_ONCE</b>: Prevents message loss, risks duplicates on failure</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM queue types and requires a dead letter exchange to be configured. It is ignored for CLASSIC and STREAM queues.
            </td>
            <td>No</td>
            <td>AT_MOST_ONCE</td>
        </tr>
            <tr>
            <td>maxAge</td>
            <td>Queue Max Age</td>
            <td>For STREAM queues: defines the maximum time-based retention period for messages in the stream. This setting adds the <code>x-max-age</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: Messages older than the specified age are automatically deleted from the stream to manage disk space. Age is calculated from the message timestamp. The retention policy is evaluated periodically, not in real-time, so messages may persist slightly beyond the specified age.
                <br><br>
                <b>Format</b>: Specify the duration using time units:
                <ul>
                    <li><code>Y</code> - Years (e.g., <code>1Y</code>)</li>
                    <li><code>M</code> - Months (e.g., <code>3M</code>)</li>
                    <li><code>D</code> - Days (e.g., <code>7D</code>)</li>
                    <li><code>h</code> - Hours (e.g., <code>24h</code>)</li>
                    <li><code>m</code> - Minutes (e.g., <code>30m</code>)</li>
                    <li><code>s</code> - Seconds (e.g., <code>3600s</code>)</li>
                </ul>
                <b>Use cases</b>: Essential for managing storage costs and compliance requirements in event streaming scenarios. For example, audit logs might retain data for 90 days, while real-time analytics streams might only need 24 hours.
                <br><br>
                <b>Considerations</b>:
                <ul>
                    <li>Can be combined with <code>maxLengthBytes</code> - whichever limit is reached first triggers deletion</li>
                    <li>Deleted messages cannot be recovered</li>
                    <li>Leave blank for unlimited retention (not recommended for production - may exhaust disk space)</li>
                </ul>
                <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
        <td>maxSegmentSize</td>
        <td>Queue Max Segment Size (Bytes)</td>
            <td>For STREAM queues: defines the maximum size in bytes for individual segment files in the stream's underlying storage. This setting adds the <code>x-stream-max-segment-size-bytes</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: RabbitMQ streams store messages in append-only segment files on disk. When a segment reaches the specified size, it is closed and a new segment is created. Smaller segments are rotated more frequently, while larger segments reduce the number of files but increase individual file sizes.
                <br><br>
                <b>Performance implications</b>:
                <ul>
                    <li><b>Smaller segments</b> (e.g., 100MB-250MB): More frequent rotation, faster deletion of old data when retention policies apply, better for scenarios with frequent retention policy enforcement, but higher file system overhead</li>
                    <li><b>Larger segments</b> (e.g., 500MB-1GB): Fewer files, reduced I/O overhead, better sequential write performance, but slower retention cleanup and potentially longer recovery times</li>
                </ul>
                <b>Default behavior</b>: If not specified, RabbitMQ uses a default value of 500MB (524,288,000 bytes), which balances performance and manageability for most workloads.
                <br><br>
                <b>Best practices</b>:
                <ul>
                    <li>Consider your retention period: shorter retention periods benefit from smaller segments for faster cleanup</li>
                    <li>Match to your message rate: high-throughput streams may benefit from larger segments</li>
                    <li>Ensure adequate disk I/O capacity for your chosen segment size</li>
                    <li>Typical range: 100MB to 1GB depending on workload characteristics</li>
                </ul>
                <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues. Leave blank to use the RabbitMQ default (500MB).
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>queueExclusive</td>
            <td>Queue Exclusive</td>
            <td>If enabled, the queue will be deleted when the connection that declared it closes. Only one consumer can use an exclusive queue.</td>
            <td>No</td>
            <td>false</td>
        </tr>
        <tr>
            <td>queueAutoDelete</td>
            <td>Queue Auto Delete</td>
            <td>If enabled, the queue will be automatically deleted when the last consumer disconnects from it.</td>
            <td>No</td>
            <td>false</td>
        </tr>
         <tr>
            <td>queueOverflowStrategy</td>
            <td>Queue Overflow Strategy</td>
            <td>Defines the behavior when a queue reaches its maximum length limit (set via <code>maxLength</code> or <code>maxLengthBytes</code>). This setting adds the <code>x-overflow</code> argument to the queue declaration. <b>Options</b>:
                <ul>
                    <li><b>DROP_HEAD</b>: Automatically discards the oldest messages from the front of the queue to make room for new incoming messages. The queue maintains its maximum size by continuously dropping the oldest data. Publishers are not notified of the drops, and messages are silently discarded without any delivery guarantees. Best for scenarios where recent data is more valuable than old data, such as real-time metrics, live sensor readings, or recent activity feeds where historical data can be safely discarded.</li>
                    <li><b>REJECT_PUBLISH</b>: Refuses to accept new messages when the queue is full. Publishers receive a negative acknowledgment (basic.return or exception depending on the client), allowing them to handle the rejection (retry, log error, route elsewhere). The queue preserves all existing messages without dropping any. Suitable for workloads where message loss is unacceptable and publishers can implement backpressure handling or alternative routing strategies.</li>
                    <li><b>REJECT_PUBLISH_DLX</b>: Similar to REJECT_PUBLISH, but rejected messages are automatically routed to the configured Dead Letter Exchange (DLX) instead of being lost. This allows rejected messages to be captured, inspected, and potentially reprocessed later. Requires a DLX to be configured on the queue; otherwise, behaves like REJECT_PUBLISH. Ideal for critical workflows where overflow messages need preservation and manual review, or for implementing overflow queues as a secondary processing tier.</li>
                </ul>
                <b>Use case guidance</b>:
                <ul>
                    <li><b>DROP_HEAD</b>: Circular buffers, caching layers, monitoring dashboards, sliding time windows</li>
                    <li><b>REJECT_PUBLISH</b>: Task queues with strict ordering, financial transactions, systems with explicit backpressure</li>
                    <li><b>REJECT_PUBLISH_DLX</b>: Audit systems, compliance-sensitive workflows, overflow handling with recovery options</li>
                </ul>
                <b>Important</b>: This setting applies to CLASSIC and QUORUM queues when length limits are defined. STREAM queues handle overflow through their own retention mechanisms (<code>maxAge</code>, <code>maxLengthBytes</code>).
            </td>
            <td>No</td>
            <td>DROP_HEAD</td>
        </tr>
        <tr>
            <th colspan="5">Reply-To Queue Properties</th>
        </tr>
        <tr>
            <td>replyToQueueArguments</td>
            <td>Reply-To Queue Arguments</td>
            <td>Additional arguments to customize queue behavior when declaring the queue. Specify as comma-separated key=value pairs (e.g., <code>x-message-ttl=60000,x-max-length=1000</code>).
                <br><br>
                <b>Common queue arguments</b>:
                <ul>
                    <li><code>x-message-ttl</code>: Sets the time-to-live (TTL) for messages in milliseconds. Messages older than this value are automatically discarded or dead-lettered. Example: <code>x-message-ttl=60000</code> (1 minute). Useful for time-sensitive data like session tokens or temporary notifications.</li>
                    <li><code>x-max-length</code>: Limits the maximum number of messages the queue can hold. When exceeded, the overflow strategy (see <code>queueOverflowStrategy</code>) determines what happens. Example: <code>x-max-length=10000</code>. Prevents unbounded queue growth.</li>
                    <li><code>x-max-length-bytes</code>: Limits the maximum total size of messages in bytes. Alternative to message count limit. Example: <code>x-max-length-bytes=10485760</code> (10MB). Useful for controlling memory usage.</li>
                    <li><code>x-dead-letter-exchange</code>: Specifies the exchange to route dead-lettered messages (expired, rejected, or exceeding delivery limits). Example: <code>x-dead-letter-exchange=dlx</code>. Essential for handling failed or problematic messages.</li>
                    <li><code>x-dead-letter-routing-key</code>: Optional routing key for dead-lettered messages. If not set, the original routing key is used. Example: <code>x-dead-letter-routing-key=failed.orders</code>.</li>
                    <li><code>x-expires</code>: Auto-deletes the queue after specified milliseconds of inactivity (no consumers, no messages published). Example: <code>x-expires=1800000</code> (30 minutes). Useful for temporary or session-based queues.</li>
                    <li><code>x-single-active-consumer</code>: When set to <code>true</code>, ensures only one consumer receives messages at a time (others are on standby). Example: <code>x-single-active-consumer=true</code>. Useful for ordered processing or leader election patterns.</li>
                </ul>
                <b>Format</b>: Use the syntax <code>key1=value1,key2=value2</code> with no spaces. Numeric values should be in milliseconds for time-based arguments or plain integers/bytes for counts and sizes. Boolean values should be <code>true</code> or <code>false</code>.
                <br><br>
                <b>Note</b>: Arguments specified here are applied during queue declaration. If the queue already exists with different arguments, the declaration will fail unless the arguments match exactly. Some arguments are queue-type specific (e.g., <code>x-max-priority</code> for CLASSIC queues only). Leave blank if no custom queue arguments are needed.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueClassicVersion</td>
            <td>Reply-To Queue Version</td>
            <td>For Classic Queues, select the queue implementation version. <b>Options</b>:
                <ul>
                    <li><b>V1</b>: The legacy classic queue implementation available in all RabbitMQ versions. Uses the original message storage and indexing mechanism. While mature and stable, it has known performance limitations with large queues, high message rates, and memory efficiency. Consider using V1 only for backward compatibility or if running RabbitMQ versions prior to 3.10.</li>
                    <li><b>V2</b>: The modern classic queue implementation introduced in RabbitMQ 3.10, also known as CQv2 (Classic Queue version 2). Provides significantly improved performance, memory efficiency, and scalability through optimized message storage and reduced per-message overhead. Offers better handling of large queues (millions of messages) and higher throughput. Recommended for all new deployments and production workloads running RabbitMQ 3.10 or later. Note: Once a queue is created with a specific version, it cannot be changed without recreating the queue.</li>
                </ul>
                <b>Important</b>: This setting only applies to CLASSIC queue types and is ignored for QUORUM and STREAM queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueMaxPriority</td>
            <td>Reply-To Queue Max Priority</td>
            <td>For Classic Queues: defines the maximum priority level the queue should support (valid range: 0-255). When set, this parameter adds the <code>x-max-priority</code> argument to the queue declaration, enabling priority queue functionality.
                <br><br>
                <b>How it works</b>: Messages published with a priority value (0 to the specified max) are delivered to consumers in priority order, with higher priority messages consumed first. Messages without an explicit priority are treated as priority 0 (lowest). 
                <br><br>
                <b>Performance considerations</b>: Priority queues have additional CPU and memory overhead compared to standard queues. Higher max priority values increase this overhead. For most use cases, a max priority of 10 or less is sufficient and recommended.
                <br><br>
                <b>Use cases</b>: Suitable for scenarios requiring differentiated message handling, such as urgent alerts, high-priority transactions, or tiered job processing systems.
                <br><br>
                <b>Important</b>: Priority queues are only supported by CLASSIC queues. This setting is ignored for QUORUM and STREAM queue types. Leave empty or set to 0 to disable priority functionality.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueInitialMemberCount</td>
            <td>Reply-To Queue Initial Member Count</td>
            <td>Specifies the initial number of cluster nodes that will host replicas of the queue. This setting applies differently based on queue type:
                <br><br>
                <b>For Quorum Queues</b>: Defines the initial replication factor (number of replica nodes) for the queue. The default is 3 replicas if not specified, which provides a good balance between availability and resource usage. Quorum queues require a majority (quorum) of replicas to be available for operation. For example, with 3 replicas, the queue tolerates 1 node failure; with 5 replicas, it tolerates 2 node failures. Higher replica counts improve fault tolerance but increase network overhead and resource consumption.
                <br><br>
                <b>For Stream Queues</b>: Determines the initial number of stream replicas across cluster nodes. Similar to quorum queues, this affects data redundancy and availability. Streams use leader-based replication where one replica is the leader handling writes, while followers replicate data.
                <br><br>
                <b>Considerations</b>:
                <ul>
                    <li>The cluster must have at least as many nodes as the specified member count</li>
                    <li>Odd numbers (3, 5, 7) are recommended for quorum-based systems to avoid split-brain scenarios</li>
                    <li>Leave blank to use RabbitMQ's default behavior (typically 3 replicas)</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM and STREAM queue types and is ignored for CLASSIC queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueDeliveryLimit</td>
            <td>Reply-To Queue Delivery Limit</td>
            <td>For Quorum Queues: defines the maximum number of delivery attempts for a message before it is automatically dead-lettered or discarded. This setting adds the <code>x-delivery-limit</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: When a message is negatively acknowledged (nack/reject) or requeued by a consumer, RabbitMQ increments its delivery counter. Once the delivery count reaches the specified limit, the message is either moved to a configured dead letter exchange (DLX) or dropped if no DLX is configured.
                <br><br>
                <b>Use cases</b>: Prevents poison messages (messages that repeatedly fail processing) from blocking the queue indefinitely. Essential for building resilient systems where problematic messages can be isolated for manual inspection or alternative handling without affecting other messages.
                <br><br>
                <b>Best practices</b>:
                <ul>
                    <li>Always configure a dead letter exchange when using delivery limits to capture failed messages for analysis</li>
                    <li>Typical values range from 3-10 depending on your tolerance for retries</li>
                    <li>Consider implementing exponential backoff in consumers before relying solely on delivery limits</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM queue types and is ignored for CLASSIC and STREAM queues. Leave blank to disable delivery limit enforcement (messages can be redelivered indefinitely).
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueDeadLetterStrategy</td>
            <td>Reply-To Queue Dead Letter Strategy</td>
            <td>For Quorum Queues: defines how messages are handled when being dead-lettered, controlling the delivery guarantee semantics. This setting adds the <code>x-dead-letter-strategy</code> argument to the queue declaration. <b>Options</b>:
                <ul>
                    <li><b>AT_MOST_ONCE</b>: The default and safer strategy. Messages are removed from the original queue before being published to the dead letter exchange (DLX). This guarantees that a message will not be duplicated if the dead-lettering process fails - it will either be in the original queue or successfully dead-lettered, but never in both. However, in case of broker failure during dead-lettering, the message may be lost. Recommended for most use cases where preventing duplicate processing is more critical than preventing message loss.</li>
                    <li><b>AT_LEAST_ONCE</b>: Messages are published to the dead letter exchange first, then removed from the original queue only after successful publication. This ensures no message is lost during the dead-lettering process, but in case of failures, the same message might be dead-lettered multiple times, resulting in duplicates in the DLX. Use this when message loss is unacceptable and your downstream systems can handle duplicate messages (idempotent processing).</li>
                </ul>
                <b>Trade-offs</b>:
                <ul>
                    <li><b>AT_MOST_ONCE</b>: Prevents duplicates, risks message loss on failure</li>
                    <li><b>AT_LEAST_ONCE</b>: Prevents message loss, risks duplicates on failure</li>
                </ul>
                <b>Important</b>: This setting only applies to QUORUM queue types and requires a dead letter exchange to be configured. It is ignored for CLASSIC and STREAM queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueMaxAge</td>
            <td>Reply-To Queue Max Age</td>
            <td>For STREAM queues: defines the maximum time-based retention period for messages in the stream. This setting adds the <code>x-max-age</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: Messages older than the specified age are automatically deleted from the stream to manage disk space. Age is calculated from the message timestamp. The retention policy is evaluated periodically, not in real-time, so messages may persist slightly beyond the specified age.
                <br><br>
                <b>Format</b>: Specify the duration using time units:
                <ul>
                    <li><code>Y</code> - Years (e.g., <code>1Y</code>)</li>
                    <li><code>M</code> - Months (e.g., <code>3M</code>)</li>
                    <li><code>D</code> - Days (e.g., <code>7D</code>)</li>
                    <li><code>h</code> - Hours (e.g., <code>24h</code>)</li>
                    <li><code>m</code> - Minutes (e.g., <code>30m</code>)</li>
                    <li><code>s</code> - Seconds (e.g., <code>3600s</code>)</li>
                </ul>
                <b>Use cases</b>: Essential for managing storage costs and compliance requirements in event streaming scenarios. For example, audit logs might retain data for 90 days, while real-time analytics streams might only need 24 hours.
                <br><br>
                <b>Considerations</b>:
                <ul>
                    <li>Can be combined with <code>maxLengthBytes</code> - whichever limit is reached first triggers deletion</li>
                    <li>Deleted messages cannot be recovered</li>
                    <li>Leave blank for unlimited retention (not recommended for production - may exhaust disk space)</li>
                </ul>
                <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues.
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueMaxSegmentSize</td>
            <td>Reply-To Queue Max Segment Size (Bytes)</td>
            <td>For STREAM queues: defines the maximum size in bytes for individual segment files in the stream's underlying storage. This setting adds the <code>x-stream-max-segment-size-bytes</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: RabbitMQ streams store messages in append-only segment files on disk. When a segment reaches the specified size, it is closed and a new segment is created. Smaller segments are rotated more frequently, while larger segments reduce the number of files but increase individual file sizes.
                <br><br>
                <b>Performance implications</b>:
                <ul>
                    <li><b>Smaller segments</b> (e.g., 100MB-250MB): More frequent rotation, faster deletion of old data when retention policies apply, better for scenarios with frequent retention policy enforcement, but higher file system overhead</li>
                    <li><b>Larger segments</b> (e.g., 500MB-1GB): Fewer files, reduced I/O overhead, better sequential write performance, but slower retention cleanup and potentially longer recovery times</li>
                </ul>
                <b>Default behavior</b>: If not specified, RabbitMQ uses a default value of 500MB (524,288,000 bytes), which balances performance and manageability for most workloads.
                <br><br>
                <b>Best practices</b>:
                <ul>
                    <li>Consider your retention period: shorter retention periods benefit from smaller segments for faster cleanup</li>
                    <li>Match to your message rate: high-throughput streams may benefit from larger segments</li>
                    <li>Ensure adequate disk I/O capacity for your chosen segment size</li>
                    <li>Typical range: 100MB to 1GB depending on workload characteristics</li>
                </ul>
                <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues. Leave blank to use the RabbitMQ default (500MB).
            </td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>replyToQueueExclusive</td>
            <td>Reply-To Queue Exclusive</td>
            <td>If enabled, the queue will be deleted when the connection that declared it closes. Only one consumer can use an exclusive queue.</td>
            <td>No</td>
            <td>false</td>
        </tr>
        <tr>
            <td>replyToQueueAutoDelete</td>
            <td>Reply-To Queue Auto Delete</td>
            <td>If enabled, the queue will be automatically deleted when the last consumer disconnects from it.</td>
            <td>No</td>
            <td>false</td>
        </tr>
        <tr>
            <td>replyToQueueOverflowStrategy</td>
            <td>Reply-To Queue Overflow Strategy</td>
            <td>Defines the behavior when a queue reaches its maximum length limit (set via <code>maxLength</code> or <code>maxLengthBytes</code>). This setting adds the <code>x-overflow</code> argument to the queue declaration. <b>Options</b>:
                <ul>
                    <li><b>DROP_HEAD</b>: Automatically discards the oldest messages from the front of the queue to make room for new incoming messages. The queue maintains its maximum size by continuously dropping the oldest data. Publishers are not notified of the drops, and messages are silently discarded without any delivery guarantees. Best for scenarios where recent data is more valuable than old data, such as real-time metrics, live sensor readings, or recent activity feeds where historical data can be safely discarded.</li>
                    <li><b>REJECT_PUBLISH</b>: Refuses to accept new messages when the queue is full. Publishers receive a negative acknowledgment (basic.return or exception depending on the client), allowing them to handle the rejection (retry, log error, route elsewhere). The queue preserves all existing messages without dropping any. Suitable for workloads where message loss is unacceptable and publishers can implement backpressure handling or alternative routing strategies.</li>
                    <li><b>REJECT_PUBLISH_DLX</b>: Similar to REJECT_PUBLISH, but rejected messages are automatically routed to the configured Dead Letter Exchange (DLX) instead of being lost. This allows rejected messages to be captured, inspected, and potentially reprocessed later. Requires a DLX to be configured on the queue; otherwise, behaves like REJECT_PUBLISH. Ideal for critical workflows where overflow messages need preservation and manual review, or for implementing overflow queues as a secondary processing tier.</li>
                </ul>
                <b>Use case guidance</b>:
                <ul>
                    <li><b>DROP_HEAD</b>: Circular buffers, caching layers, monitoring dashboards, sliding time windows</li>
                    <li><b>REJECT_PUBLISH</b>: Task queues with strict ordering, financial transactions, systems with explicit backpressure</li>
                    <li><b>REJECT_PUBLISH_DLX</b>: Audit systems, compliance-sensitive workflows, overflow handling with recovery options</li>
                </ul>
                <b>Important</b>: This setting applies to CLASSIC and QUORUM queues when length limits are defined. STREAM queues handle overflow through their own retention mechanisms (<code>maxAge</code>, <code>maxLengthBytes</code>).
            </td>
            <td>No</td>
            <td>DROP_HEAD</td>
        </tr>
        <tr>
            <th colspan="5">Other</th>
        </tr>
        <tr>
            <td>requestCharSet</td>
            <td>Request Content Encoding (Charset)</td>
            <td>The content encoding/character set (e.g., UTF-8) used for the message body if the encoding/character set cannot be determined from the request message.</td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <td>responseCharSet</td>
            <td>Response Content Encoding (Charset)</td>
            <td>The content encoding/character set (e.g., UTF-8) used for the message body if the encoding/character set cannot be determined from the response message.</td>
            <td>No</td>
            <td> - </td>
        </tr>
        <tr>
            <th colspan="5">Output</th>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Output Variable Name</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
            <td> - </td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Overwrite Message Body</td>
            <td>Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).</td>
            <td>No</td>
            <td>false</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <rabbitmq.sendRpc configKey="RabbitMQConnection">
                <headers>[]</headers>
                <requestBodyType>JSON</requestBodyType>
                <requestBodyJson>${payload.message}</requestBodyJson>
                <responseBodyType>JSON</responseBodyType>
                <requestCharSet></requestCharSet>
                <responseCharSet></responseCharSet>
                <queue>{${payload.queue}}</queue>
                <queueAutoDeclare>true</queueAutoDeclare>
                <queueType>QUORUM</queueType>
                <queueArguments></queueArguments>
                <deliveryLimit></deliveryLimit>
                <deadLetterStrategy></deadLetterStrategy>
                <queueAutoDelete>false</queueAutoDelete>
                <queueOverflowStrategy>DROP_HEAD</queueOverflowStrategy>
                <replyToQueue>{${payload.reply-to-queue}}</replyToQueue>
                <replyToQueueAutoDeclare>true</replyToQueueAutoDeclare>
                <replyToQueueType>QUORUM</replyToQueueType>
                <replyToQueueArguments></replyToQueueArguments>
                <replyToQueueDeliveryLimit></replyToQueueDeliveryLimit>
                <replyToQueueDeadLetterStrategy></replyToQueueDeadLetterStrategy>
                <replyToQueueAutoDelete>false</replyToQueueAutoDelete>
                <replyToQueueOverflowStrategy>DROP_HEAD</replyToQueueOverflowStrategy>
                <requestTimeout>60000</requestTimeout>
                <responseVariable>rabbitmq_sendRpc_1</responseVariable>
                <overwriteBody>true</overwriteBody>
    </rabbitmq.sendRpc>
    ```

    The response from the RabbitMQ broker will be stored in a new variable if the `overwriteBody` property is set to `false`. The variable name will be taken from the `responseVariable` property. If `overwriteBody` is set to `true`, the response will replace the existing message body in the message context, and the `responseVariable` property will not be used to store the output.

### Message Acknowledgment Operations

The following operations can be used with the RabbitMQ inbound endpoint to handle message acknowledgments from RabbitMQ queues. These operations enable you to control message flow and ensure messages are processed correctly. 

!!!Note 
    These operations do not require a configured RabbitMQ connection, as they handle acknowledgments at the MI server level.

??? note "Accept Message"
    The accept operation allows you to acknowledge the message with the AMQP 1.0 ‘Accepted’ outcome. This indicates that the message has been successfully processed and that the broker can safely remove it from the queue.

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
            <td>Output Variable Name</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
            <td></td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <rabbitmq.accept>
                <responseVariable>rabbitmq_accept_1</responseVariable>
                <overwriteBody>false</overwriteBody>
    </rabbitmq.accept>
    ```
    This operation will acknowledge the message as accepted, allowing the RabbitMQ broker to remove it from the queue. The response from the acknowledgment operation will be stored in a new variable named `rabbitmq_accept_1`.

??? note "Requeue Message"
    The requeue operation allows you to release the message with the AMQP 1.0 'Released' outcome. This indicates the message was not processed, and the broker can requeue it for delivery to the same or a different consumer.

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
            <td>Output Variable Name</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
            <td></td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <rabbitmq.requeue>
                <responseVariable>rabbitmq_requeue_1</responseVariable>
                <overwriteBody>false</overwriteBody>
    </rabbitmq.requeue>
    ```
    This operation will acknowledge the message as released, indicating to the RabbitMQ broker that the message was not processed and that the broker can requeue it for delivery to the same or a different consumer. The response from the acknowledgment operation will be stored in a new variable named `rabbitmq_requeue_1`.

??? note "Discard Message"
    The discard operation allows you to reject the message with the AMQP 1.0 'Rejected' outcome. This indicates the message is invalid, and the broker can either discard it or move it to a dead-letter queue if configured.

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
            <td>Output Variable Name</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
            <td></td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <rabbitmq.discard>
                <responseVariable>rabbitmq_discard_1</responseVariable>
                <overwriteBody>false</overwriteBody>
    </rabbitmq.discard>
    ```
    This operation will acknowledge the message as discarded, indicating that the message is invalid. The broker can either discard it or move it to a dead-letter queue if configured. The response from the acknowledgment operation will be stored in a new variable named `rabbitmq_discard_1`.