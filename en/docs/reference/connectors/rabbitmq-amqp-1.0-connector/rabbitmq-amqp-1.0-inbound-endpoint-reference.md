# RabbitMQ (AMQP 1.0) Inbound Endpoint Reference

This reference page documents all the configuration parameters supported by the RabbitMQ Inbound Endpoint. These parameters control how the inbound endpoint connects to the RabbitMQ server, what queues it consumes from, the consumer type, message acknowledgment modes, and more. Use this table as a guide when configuring your inbound endpoint to ensure seamless and reliable integration with RabbitMQ.
<table>
    <tr>
        <th>Parameter Name</th>
        <th>Display Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <th colspan="5">Generic</th>
    </tr>
    <tr>
        <td>name</td>
        <td>Event Integration Name</td>
        <td>A unique name for this RabbitMQ Inbound Endpoint configuration.</td>
        <td>Yes</td>
        <td> - </td>
    </tr>
    <tr>
        <td>sequence</td>
        <td>Injecting Sequence Name</td>
        <td>The name of the mediation sequence that will process the consumed RabbitMQ messages.</td>
        <td>Yes</td>
        <td> - </td>
    </tr>
    <tr>
        <td>onError</td>
        <td>Error Sequence Name</td>
        <td>The name of the error handling sequence to execute if an error occurs during message consumption or processing.</td>
        <td>Yes</td>
        <td> - </td>
    </tr>
    <tr>
        <td>suspend</td>
        <td>Suspend Inbound</td>
        <td>Suspend the inbound endpoint</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Inbound Functional</th>
    </tr>
    <tr>
        <td>sequential</td>
        <td>Execute sequentially</td>
        <td>If enabled, messages will be processed one after the other within the injection sequence, preserving message order.</td>
        <td>No</td>
        <td>true</td>
    </tr>
    <tr>
        <td>coordination</td>
        <td>Coordination</td>
        <td>In a clustered environment, set this to true to ensure that only a single worker node is consuming messages from the queue at any given time.</td>
        <td>No</td>
        <td>true</td>
    </tr>
    <tr>
        <th colspan="5">Basic</th>
    </tr>
   <tr>
    <td>rabbitmq.server.host.name</td>
    <td>Server Hosts</td>
    <td>Specifies the RabbitMQ server hostname(s) or IP address(es) for client connection. For high availability deployments, provide multiple hosts as a comma-separated list (e.g., <code>rabbitmq1.example.com,rabbitmq2.example.com,rabbitmq3.example.com</code>).
        <br><br>
        <b>Single server configuration</b>:
        <ul>
            <li><b>Hostname</b>: <code>rabbitmq.example.com</code> - Recommended for production (enables DNS-based failover)</li>
            <li><b>IP address</b>: <code>192.168.1.100</code> - Direct IP connection (bypasses DNS resolution)</li>
            <li><b>localhost</b>: <code>localhost</code> or <code>127.0.0.1</code> - For local development and testing only</li>
        </ul>
        <b>Multi-server configuration (High Availability)</b>:
        <ul>
            <li>Provide comma-separated list: <code>rabbitmq1.example.com,rabbitmq2.example.com,rabbitmq3.example.com</code></li>
            <li>Client automatically attempts connection to each host in sequence until successful</li>
            <li>Enables automatic failover if the primary broker becomes unavailable</li>
            <li>All hosts should be part of the same RabbitMQ cluster for proper operation</li>
            <li>Order matters: hosts are tried in the specified order during connection and reconnection attempts</li>
        </ul>
        <b>Best practices</b>:
        <ul>
            <li><b>Use hostnames over IPs</b>: Allows infrastructure changes without client reconfiguration</li>
            <li><b>List all cluster nodes</b>: Maximizes availability - if one node fails, client can connect to others</li>
            <li><b>Geographic considerations</b>: List closest/lowest-latency nodes first for optimal performance</li>
            <li><b>Load balancer option</b>: Can use a single load balancer hostname (e.g., <code>rabbitmq-lb.example.com</code>) instead of listing individual nodes, but this creates a single point of failure if the load balancer fails</li>
            <li><b>Network segmentation</b>: Ensure all listed hosts are accessible from the client's network segment</li>
        </ul>
        <b>Port alignment</b>: If providing multiple hosts, ensure corresponding ports are listed in <code>rabbitmq.server.port</code> in the same order. If only one port is specified, it applies to all hosts.
        <br><br>
        <b>Connection behavior</b>:
        <ul>
            <li>Client attempts connection to the first host in the list</li>
            <li>If connection fails, automatically tries the next host</li>
            <li>Continues through the list until a connection succeeds or all hosts are exhausted</li>
            <li>After successful connection, if that connection drops, the client retries using the same failover logic</li>
        </ul>
        <b>Important</b>: This is a required parameter. For production deployments, always specify multiple hosts for high availability unless using a highly available load balancer.
    </td>
    <td>Yes</td>
    <td>localhost</td>
</tr>
    <tr>
        <td>rabbitmq.server.port</td>
        <td>Server Ports</td>
        <td>Specifies the RabbitMQ server ports as a comma-separated list (e.g., port1,port2). Default is 5672 for non-SSL.</td>
        <td>Yes</td>
        <td>5672</td>
    </tr>
    <tr>
        <td>rabbitmq.queue.name</td>
        <td>Queue Name</td>
        <td>The name of the RabbitMQ queue to consume messages from.</td>
        <td>Yes</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.queue.type</td>
        <td>Type</td>
        <td>Specifies the type of RabbitMQ queue to interact with. <br/>
             <b>Options</b>:
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
        <td>rabbitmq.queue.auto.declare</td>
        <td>Auto Declare</td>
        <td>If enabled, the inbound endpoint will attempt to declare the queue if it doesn't exist.</td>
        <td>No</td>
        <td>true</td>
    </tr>
    <tr>
        <td>rabbitmq.exchange.name</td>
        <td>Exchange Name</td>
        <td>Name of the exchange to bind the queue to. Leave empty to consume directly from the queue.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.exchange.type</td>
        <td>Type</td>
        <td>Defines how the exchange routes messages to queues based on routing rules.<br/>
         <b>Options</b>:
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
        <td>rabbitmq.exchange.auto.declare</td>
        <td>Auto Declare</td>
        <td>If enabled, the inbound endpoint will attempt to declare the exchange if it doesn't exist.</td>
        <td>No</td>
        <td>true</td>
    </tr>
    <tr>
        <td>rabbitmq.routing.key</td>
        <td>Routing Key</td>
        <td>Routing key for binding the queue to a DIRECT or TOPIC exchange. Queue name is used if omitted.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <th colspan="5">User Authentication</th>
    </tr>
    <tr>
        <td>rabbitmq.connection.sasl.mechanism</td>
        <td>SASL Mechanism</td>
        <td> Defines the SASL mechanism to use for connection authentication. <br/>
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
        <td>rabbitmq.server.user.name</td>
        <td>Server Username</td>
        <td>Username for PLAIN authentication.</td>
        <td>No</td>
        <td>guest</td>
    </tr>
    <tr>
        <td>rabbitmq.server.password</td>
        <td>Server Password</td>
        <td>Password for PLAIN authentication.</td>
        <td>No</td>
        <td>guest</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.oauth2.enabled</td>
        <td>OAuth2 Enabled</td>
        <td>Enable if using OAuth 2.0 (e.g., Client Credentials or Password Grant) for authentication instead of a simple username/password.</br>
         When OAuth 2.0 is enabled, RabbitMQ validates access tokens presented by clients against a configured authorization server. The OAuth 2.0 plugin uses JWT (JSON Web Token) tokens and can verify them either by validating the token's signature using public keys or by introspecting the token with the authorization server. Please refer to the <a href="https://www.rabbitmq.com/docs/oauth2">RabbitMQ OAuth 2.0 plugin documentation</a> for detailed configuration instructions and supported Identity providers.
        </td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.oauth2.token.endpoint</td>
        <td>Token Endpoint</td>
        <td>Defines the Identity Provider/Token Service token endpoint URL to generate the access token.
          <div class="admonition note">
            <p class="admonition-title">Note</p>
            <p> Provide the HTTPS URL for the token endpoint and import the Identity Provider's public certificate into the WSO2 MI <code>client-truststore.jks</code>. See <a href="{{base_path}}/install-and-setup/setup/security/importing-ssl-certificate/#importing-ssl-certificates-to-a-truststore">importing SSL certificates to a truststore</a> for instructions on importing the certificate into <code>client-truststore.jks</code>.</p>
        </div>
        </td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.oauth2.grant.type</td>
        <td>Grant Type</td>
        <td>Defines the OAuth2 grant type to use for token generation. <br/>
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
        <td>rabbitmq.connection.oauth2.client.id</td>
        <td>Client ID</td>
        <td>The client ID for OAuth 2.0 authentication.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.oauth2.client.secret</td>
        <td>Client Secret</td>
        <td>The client secret for OAuth 2.0 authentication.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.oauth2.username</td>
        <td>User Name</td>
        <td>Username required when using the password OAuth 2.0 grant type.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.oauth2.password</td>
        <td>Password</td>
        <td>Password required when using the password OAuth 2.0 grant type.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <th colspan="5">Resilience</th>
    </tr>
    <tr>
        <td>rabbitmq.connection.idle.timeout</td>
        <td>Connection Idle Timeout</td>
        <td>Maximum period (in milliseconds) the connection can remain idle before being closed.</td>
        <td>No</td>
        <td>60000</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.establish.retry.count</td>
        <td>Connection Establish Retry Count</td>
        <td>Number of times to retry establishing the connection.</td>
        <td>No</td>
        <td>5</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.establish.retry.interval</td>
        <td>Connection Establish Retry Interval</td>
        <td>Interval (in milliseconds) between retries when establishing the connection.</td>
        <td>No</td>
        <td>1000</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.recovery.policy.type</td>
        <td>Connection Recovery Policy Type</td>
        <td>Defines the strategy for automatic connection recovery after a disconnection. <br/>
        <b>Options</b>:
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
        <td>rabbitmq.connection.recovery.initial.delay</td>
        <td>Connection Recovery Initial Delay</td>
        <td>Initial delay (in milliseconds) before the first recovery attempt starts.</td>
        <td>No</td>
        <td>5000</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.recovery.retry.interval</td>
        <td>Connection Recovery Interval</td>
        <td>Fixed interval (in milliseconds) between connection recovery retries.</td>
        <td>No</td>
        <td>10000</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.recovery.retry.timeout</td>
        <td>Connection Recovery Timeout</td>
        <td>Total time (in milliseconds) allowed for the connection recovery process before giving up.</td>
        <td>No</td>
        <td>60000</td>
    </tr>
    <tr>
        <th colspan="5">Queue Properties</th>
    </tr>
    <tr>
        <td>rabbitmq.queue.arguments</td>
        <td>Arguments</td>
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
        <td>For Classic Queues, select the queue implementation version. <br/>
         <b>Options</b>:
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
    <td>rabbitmq.classic.dead.letter.strategy</td>
    <td>Classic Queue Dead Letter Strategy</td>
    <td>For Classic Queues: defines the strategy for handling messages that fail processing and are negatively acknowledged or rejected. 
      <br/>
       <b>Options</b>:
        <ul>
            <li><b>FIXED_DELAY_RETRYABLE_DISCARD</b>: Implements an automatic retry mechanism with a fixed delay between retry attempts. When a message fails (discard), it is sent to a configured wait/delay queue where it waits for a specified period before being returned to the original queue for reprocessing. This retry cycle continues until either the message is successfully processed or the maximum dead-lettered count is reached, after which the message is routed to the final Dead Letter Queue for terminal handling.
                <br><br>
                <b>Required infrastructure</b>:
                <ul>
                    <li>A delay/wait queue with <code>x-message-ttl</code> argument for the retry delay period (e.g., 30000ms for 30-second delays)</li>
                    <li>Dead letter exchange routing configured on the delay queue to return messages to the original queue after TTL expiration</li>
                    <li><code>rabbitmq.max.dead.lettered.count</code> to prevent infinite retry loops</li>
                    <li>Final DLQ infrastructure (<code>rabbitmq.final.dead.letter.queue.name</code>, <code>rabbitmq.final.dead.letter.exchange.name</code>) to capture poison messages</li>
                </ul>
                <b>Message flow</b>:
                <ol>
                    <li>Message fails processing in original queue</li>
                    <li>Dead-lettered to delay queue (with TTL)</li>
                    <li>After TTL expires, message returns to original queue</li>
                    <li>Retry processing attempt</li>
                    <li>Repeat until success or max dead-lettered count reached</li>
                    <li>If max count exceeded, route to final DLQ</li>
                </ol>
                <b>Use cases</b>:
                <ul>
                    <li>Transient failures: temporary network issues, rate limits, external service unavailability</li>
                    <li>Time-dependent processing: data not yet available but expected soon</li>
                    <li>Resource contention: database locks, API throttling that may clear with delay</li>
                    <li>Circuit breaker patterns: allowing time for downstream services to recover</li>
                </ul>
                Provides automatic recovery without manual intervention but requires more complex infrastructure setup.
            </li>
            <li><b>NON_RETRYABLE_DISCARD</b>: No automatic retry mechanism. Messages that fail processing are immediately routed to the configured Dead Letter Exchange without any retry attempts. Failed messages move directly to the DLQ (via <code>rabbitmq.dead.letter.exchange.name</code>) or, if the max dead-lettered count is configured and exceeded, to the final DLQ. This is the simpler, more straightforward approach with minimal infrastructure requirements.
                <br><br>
                <b>Required infrastructure</b>:
                <ul>
                    <li>Dead Letter Exchange (<code>rabbitmq.dead.letter.exchange.name</code>)</li>
                    <li>Dead Letter Queue (<code>rabbitmq.dead.letter.queue.name</code>) bound to the DLX</li>
                    <li>Optional: Final DLQ infrastructure if using <code>rabbitmq.max.dead.lettered.count</code></li>
                </ul>
                <b>Message flow</b>:
                <ol>
                    <li>Message fails processing in original queue</li>
                    <li>Immediately dead-lettered to DLX</li>
                    <li>Routed to DLQ for manual review or alternative processing</li>
                    <li>If max dead-lettered count configured and exceeded, routed to final DLQ instead</li>
                </ol>
                <b>Suitable for scenarios where</b>:
                <ul>
                    <li><b>Failures are permanent</b>: invalid message format, schema violations, business rule violations that won't resolve with time</li>
                    <li><b>Retry logic is application-managed</b>: consumer application implements its own retry strategy with more sophisticated logic</li>
                    <li><b>Manual intervention required</b>: failed messages need human review, code fixes, or data corrections before reprocessing</li>
                    <li><b>Immediate failure notification needed</b>: alerting and monitoring should trigger immediately without delay cycles</li>
                    <li><b>Simplicity preferred</b>: avoiding the complexity of delay queue infrastructure</li>
                </ul>
                This is the default and recommended option unless you specifically need automatic retry behavior with delays.
            </li>
        </ul>
        <b>Strategy comparison</b>:
        <table style="margin-top: 10px; border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Aspect</th>
                <th style="border: 1px solid #ddd; padding: 8px;">FIXED_DELAY_RETRYABLE_DISCARD</th>
                <th style="border: 1px solid #ddd; padding: 8px;">NON_RETRYABLE_DISCARD</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Infrastructure complexity</td>
                <td style="border: 1px solid #ddd; padding: 8px;">High (requires delay queues, additional DLX routing)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Low (simple DLX → DLQ)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Retry behavior</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Automatic with fixed delays</td>
                <td style="border: 1px solid #ddd; padding: 8px;">None (immediate dead-lettering)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Best for</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Transient failures, external service issues</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Permanent failures, application-managed retries</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Failure detection speed</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Delayed (after all retry attempts)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Immediate</td>
            </tr>
        </table>
        <br>
        <b>Configuration requirements</b>:
        <ul>
            <li>Both strategies work with the standard dead letter parameters: <code>rabbitmq.dead.letter.exchange.name</code>, <code>rabbitmq.dead.letter.queue.name</code>, etc.</li>
            <li><b>FIXED_DELAY_RETRYABLE_DISCARD</b> additionally requires manual setup of delay queues with TTL and proper DLX routing topology</li>
            <li>Use <code>rabbitmq.max.dead.lettered.count</code> with both strategies to implement final DLQ routing and prevent infinite cycling</li>
            <li>Configure retry delays via <code>x-message-ttl</code> on delay queues (not a connector parameter)</li>
        </ul>
        <b>Important</b>: This setting only applies to CLASSIC queue types and is ignored for QUORUM and STREAM queues. QUORUM queues use the <code>rabbitmq.quorum.dead.letter.strategy</code> parameter instead, which has different semantics (AT_MOST_ONCE vs AT_LEAST_ONCE delivery guarantees).
    </td>
    <td>No</td>
    <td>NON_RETRYABLE_DISCARD</td>
  </tr>
    <tr>
        <td>rabbitmq.classic.max.priority</td>
        <td>Max Priority</td>
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
        <td>rabbitmq.quorum.initial.member.count</td>
        <td>Initial Member Count</td>
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
        <td>rabbitmq.quorum.delivery.limit</td>
        <td>Delivery Limit</td>
        <td>For Quorum Queues: defines the maximum number of delivery attempts for a message before it is automatically dead-lettered or discarded. This setting adds the <code>x-delivery-limit</code> argument to the queue declaration.
                <br><br>
                <b>How it works</b>: When a message is negatively acknowledged (discard) or requeued by a consumer, RabbitMQ increments its delivery counter. Once the delivery count reaches the specified limit, the message is either moved to a configured dead letter exchange (DLX) or dropped if no DLX is configured.
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
        <td>rabbitmq.quorum.dead.letter.strategy</td>
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
        <td> - </td>
    </tr>
    <tr>
    <td>rabbitmq.stream.initial.member.count</td>
    <td>Initial Member Count</td>
    <td>For STREAM queues: specifies the initial number of cluster nodes that will host replicas of the stream. This setting adds the <code>x-initial-cluster-size</code> argument to the stream queue declaration.
        <br><br>
        <b>How it works</b>: Stream queues use leader-based replication where one replica serves as the leader handling all write operations, while follower replicas asynchronously replicate data for redundancy and availability. The initial member count determines how many replicas are created when the stream is first declared.
        <br><br>
        <b>Default behavior</b>: If not specified, RabbitMQ uses a default value of 3 replicas, which provides a good balance between data safety and resource usage. With 3 replicas, the stream can tolerate the loss of up to 2 nodes while maintaining data availability (though writes require the leader to be available).
        <br><br>
        <b>Fault tolerance</b>:
        <ul>
            <li><b>1 replica</b>: No redundancy - node failure results in data loss until recovery</li>
            <li><b>3 replicas</b>: Tolerates 2 node failures for read operations; leader failure requires failover</li>
            <li><b>5 replicas</b>: Higher redundancy but increased network and storage overhead</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>The cluster must have at least as many available nodes as the specified member count</li>
            <li>Higher replica counts improve data durability but increase disk usage (each replica stores a complete copy) and network traffic (replication overhead)</li>
            <li>Unlike quorum queues, streams don't require a quorum for operation - only the leader needs to be available for writes</li>
            <li>Replicas can be added or removed after stream creation using RabbitMQ management commands</li>
        </ul>
        <b>Important</b>: This setting only applies to STREAM queue types and is ignored for CLASSIC and QUORUM queues. Leave blank to use the RabbitMQ default (3 replicas).
    </td>
    <td>No</td>
    <td> - </td>
</tr>
    <tr>
        <td>rabbitmq.stream.max.age</td>
        <td>Max Age (Seconds)</td>
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
        <td>rabbitmq.stream.max.segment.size</td>
        <td>Max Segment Size (Bytes)</td>
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
        <td>rabbitmq.queue.exclusive</td>
        <td>Exclusive</td>
        <td>If enabled, the queue is deleted when the declaring connection closes. Only one consumer can use it.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>rabbitmq.queue.auto.delete</td>
        <td>Auto Delete</td>
        <td>If enabled, the queue is deleted when the last consumer disconnects.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Exchange Properties</th>
    </tr>
    <tr>
        <td>rabbitmq.header.exchange.binding.arguments</td>
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
        <td>rabbitmq.exchange.arguments</td>
        <td>Arguments</td>
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
        <td>rabbitmq.exchange.auto.delete</td>
        <td>Auto Delete</td>
        <td>If enabled, the exchange is deleted when the last queue is unbound.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Stream Properties</th>
    </tr>
    <tr>
    <td>rabbitmq.stream.filters</td>
    <td>Stream Filters</td>
    <td>For STREAM queues: specifies filter values to selectively consume messages from the stream based on the <code>filter-value</code> message property. Provide as comma-separated values (e.g., <code>order,payment,shipment</code>).
        <br><br>
        <b>How it works</b>: When publishing messages to a stream, producers can attach a <code>filter-value</code> property to each message (e.g., <code>filter-value=order</code>). Consumers specify which filter values they're interested in, and the stream server only delivers matching messages, significantly reducing network bandwidth and consumer processing overhead. Messages without a filter value are excluded unless <code>rabbitmq.stream.filter.match.unfiltered</code> is enabled.
        <br><br>
        <b>Use cases</b>: Multi-tenant systems (filter by tenant ID), event type filtering (orders vs payments vs notifications), regional data segregation (US vs EU messages), or any scenario where different consumers need different subsets of the same stream.
        <br><br>
        <b>Benefits</b>: Server-side filtering reduces network traffic and consumer CPU usage compared to client-side filtering. Particularly valuable for high-volume streams where consumers only need a small percentage of messages.
        <br><br>
        <b>Important</b>: This setting only applies to STREAM queue types. Leave blank to consume all messages without filtering.
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.stream.filter.match.unfiltered</td>
    <td>Stream Filter Match Unfiltered</td>
    <td>Controls whether messages without a <code>filter-value</code> property are included in consumption when stream filters are active.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>false</b> (default): Only messages with matching filter values are consumed. Messages without any filter value are skipped entirely. Use this for strict filtering where all relevant messages are guaranteed to have filter values.</li>
            <li><b>true</b>: Consumes both messages matching the specified filters AND messages without any filter value. Useful during migration periods when some producers haven't yet adopted filter values, or for backward compatibility with legacy messages.</li>
        </ul>
        <b>Example</b>: If filters are set to <code>order,payment</code>:
        <ul>
            <li>With <code>false</code>: Only messages with <code>filter-value=order</code> or <code>filter-value=payment</code> are consumed</li>
            <li>With <code>true</code>: Messages with <code>filter-value=order</code>, <code>filter-value=payment</code>, OR no filter value are consumed</li>
        </ul>
        <b>Important</b>: This setting is only relevant when <code>rabbitmq.stream.filters</code> is specified and applies only to STREAM queues.
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.stream.offset.starting.value</td>
    <td>Offset Value</td>
    <td>Specifies the exact stream offset (message position) from which to start consuming messages. When set, this value takes precedence over <code>rabbitmq.stream.offset.starting.strategy</code>.
        <br><br>
        <b>How it works</b>: Stream offsets are sequential numeric positions representing each message in the stream (similar to Kafka offsets). By providing a specific offset value, you can resume consumption from an exact point in the stream's history, enabling precise replay or recovery scenarios.
        <br><br>
        <b>Use cases</b>:
        <ul>
            <li>Replaying messages from a known checkpoint after processing failures</li>
            <li>Starting consumption from a specific timestamp-derived offset</li>
            <li>Debugging or auditing specific message ranges</li>
            <li>Implementing custom offset management strategies</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>The specified offset must exist in the stream (not already deleted by retention policies)</li>
            <li>Invalid offsets may cause consumer errors or default to earliest/latest available offset</li>
            <li>This overrides the offset strategy, so the strategy setting is ignored when a value is provided</li>
        </ul>
        <b>Important</b>: This setting only applies to STREAM queue types. Leave blank to use the offset strategy instead.
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.stream.offset.starting.strategy</td>
    <td>Offset Strategy</td>
    <td>Defines the starting position in the stream when beginning message consumption. This setting is ignored if <code>rabbitmq.stream.offset.starting.value</code> is specified. <b>Options</b>:
        <ul>
            <li><b>FIRST</b>: Starts consumption from the earliest available message in the stream (beginning of retained history). All messages currently in the stream will be delivered, making this suitable for complete replay scenarios, initial data synchronization, or catch-up processing. Note: The actual starting point depends on the stream's retention policy - messages deleted due to age or size limits are not available.</li>
            <li><b>LAST</b>: Starts consumption from the most recent message in the stream at the time the consumer connects. Historical messages are skipped, and only newly arriving messages (published after consumer connection) are delivered. Useful for real-time processing where historical data is irrelevant, such as live monitoring dashboards or current event processing.</li>
            <li><b>NEXT</b>: Waits for new messages to arrive and only consumes messages published after the consumer attaches. Similar to LAST but with clearer semantics - guaranteed not to consume any existing messages, only future ones. Ideal for new consumers joining a stream where no historical context is needed, such as new microservice instances or fresh monitoring agents. This is the default and safest option for new consumers.</li>
        </ul>
        <b>Important</b>: This setting only applies to STREAM queue types and is used only when <code>rabbitmq.stream.offset.starting.value</code> is not specified.
    </td>
    <td>No</td>
    <td>NEXT</td>
</tr>
<tr>
    <td>rabbitmq.stream.offset.tracker.flush.interval</td>
    <td>Offset Tracker Flush Interval (Seconds)</td>
    <td>Defines how frequently (in seconds) the consumer's current processing offset is persisted to the WSO2 MI server.
        <br><br>
        <b>How it works</b>: As the consumer processes messages, it tracks the last successfully processed offset in memory. This interval determines how often that in-memory offset is flushed (committed) to the server, allowing the consumer to resume from the last committed position after restarts or failures.
        <br><br>
        <b>Trade-offs</b>:
        <ul>
            <li><b>Lower values</b> (e.g., 1-5 seconds): More frequent commits reduce the number of duplicate messages reprocessed after consumer restarts/crashes, but increase server-side I/O overhead.</li>
            <li><b>Higher values</b> (e.g., 30-60 seconds): Reduced overhead and better performance, but more messages may be redelivered (duplicates) after failures since the last flush occurred further in the past.</li>
        </ul>
        <b>Default</b>: 10 seconds provides a reasonable balance for most workloads. Adjust based on your message processing rate and tolerance for duplicate processing.
        <br><br>
        <b>Important</b>: This setting only applies to STREAM queue types. Offset tracking enables automatic resume functionality - without it, consumers would restart from their configured starting strategy on every reconnection.
    </td>
    <td>No</td>
    <td>10</td>
</tr>
<tr>
    <td>rabbitmq.stream.offset.tracker.shutdown.timeout</td>
    <td>Offset Tracker Shutdown Timeout (Seconds)</td>
    <td>Specifies the maximum time (in seconds) to wait for the offset tracker to flush the current offset to the server during graceful WSO2 MI Server shutdown.
        <br><br>
        <b>How it works</b>: When the WSO2 MI Server shuts down gracefully (not a crash), it attempts to commit its latest processed offset one final time before disconnecting. This timeout controls how long the shutdown process will wait for that final flush operation to complete.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li>If the flush completes within the timeout, the consumer resumes from the exact last processed message on restart (no duplicates or gaps)</li>
            <li>If the timeout expires before flushing completes, shutdown proceeds anyway, and the consumer may reprocess some messages on restart (back to the last successfully flushed offset)</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li><b>Too short</b> (< 2 seconds): May not allow enough time for network latency or server processing, resulting in lost offset commits</li>
            <li><b>Too long</b> (> 30 seconds): Delays MI Server shutdown unnecessarily, especially problematic in containerized environments with fast restart cycles</li>
        </ul>
        <b>Default</b>: 5 seconds is typically sufficient for most network conditions while keeping shutdown responsive.
        <br><br>
        <b>Important</b>: This setting only applies to STREAM queue types and only affects graceful shutdown scenarios. Crashes or forced terminations cannot benefit from this timeout.
    </td>
    <td>No</td>
    <td>5</td>
</tr>
    <tr>
        <th colspan="5">SSL Configurations</th>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.enabled</td>
        <td>Enabled</td>
        <td>Enable SSL/TLS for the RabbitMQ connection.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.trust.everything</td>
        <td>Trust Everything</td>
        <td>If enabled, all server certificates are accepted. Not recommended for production.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.keystore.location</td>
        <td>Keystore Location</td>
        <td>File path to the Keystore containing the client's private key and certificate.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.keystore.type</td>
        <td>Keystore Type</td>
        <td>The type of the Keystore (e.g., JKS).</td>
        <td>No</td>
        <td>JKS</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.keystore.password</td>
        <td>Keystore Password</td>
        <td>The password to access the Keystore.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.truststore.location</td>
        <td>Truststore Location</td>
        <td>File path to the Truststore containing trusted server certificates.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.truststore.type</td>
        <td>Truststore Type</td>
        <td>The type of the Truststore (e.g., JKS).</td>
        <td>No</td>
        <td>JKS</td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.truststore.password</td>
        <td>Truststore Password</td>
        <td>The password to access the Truststore.</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.version</td>
        <td>SSL Version</td>
        <td>The preferred SSL/TLS protocol version (e.g., 'TLSv1.2', 'TLSv1.3').</td>
        <td>No</td>
        <td> - </td>
    </tr>
    <tr>
        <td>rabbitmq.connection.ssl.hostname.verification.enabled</td>
        <td>Enabled SSL Hostname Verification</td>
        <td>If enabled, verifies the hostname in the server's certificate against the connected host name.</td>
        <td>No</td>
        <td>false</td>
    </tr>
    <tr>
        <th colspan="5">Dead-Letter Configurations</th>
    </tr>
    <tr>
    <td>rabbitmq.dead.letter.queue.name</td>
    <td>Dead Letter Queue Name</td>
    <td>The name of the Dead Letter Queue (DLQ) where failed or rejected messages are stored for inspection, reprocessing, or archival.
        <br><br>
        <b>Purpose</b>: The DLQ serves as a holding area for messages that cannot be successfully processed, including:
        <ul>
            <li>Messages rejected by consumers (nack/reject with requeue=false)</li>
            <li>Messages exceeding the delivery limit in Quorum queues</li>
            <li>Expired messages (TTL exceeded)</li>
            <li>Messages from full queues with overflow strategies that use dead-lettering</li>
        </ul>
        <b>Best practices</b>:
        <ul>
            <li>Use descriptive naming conventions (e.g., <code>orders.dlq</code>, <code>payments.dead-letter</code>)</li>
            <li>Configure monitoring and alerts on DLQ depth to detect systematic processing failures</li>
            <li>Implement processes for reviewing and reprocessing or discarding DLQ messages</li>
            <li>Consider using a durable queue type (QUORUM recommended) to prevent DLQ message loss</li>
        </ul>
        <b>Important</b>: This queue must be bound to the Dead Letter Exchange specified in <code>rabbitmq.dead.letter.exchange.name</code> using the routing key from <code>rabbitmq.dead.letter.routing.key</code> (for DIRECT exchanges).
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.queue.type</td>
    <td>Dead Letter Queue Type</td>
    <td>Defines the queue type for the Dead Letter Queue. <b>Options</b>:
        <ul>
            <li><b>CLASSIC</b>: The traditional queue type with lower overhead and simpler configuration. Suitable for development environments or non-critical DLQs where message loss is acceptable. Messages are stored on a single node with optional mirroring (deprecated in RabbitMQ 3.12+).</li>
            <li><b>QUORUM</b>: Replicated queue type providing high availability and data safety through Raft consensus. Recommended for production environments where failed messages must be preserved reliably. Ensures DLQ messages survive node failures through automatic replication across cluster nodes. Slightly higher resource usage but significantly better durability guarantees.</li>
        </ul>
        <b>Recommendation</b>: Use QUORUM for production DLQs to ensure failed messages aren't lost during infrastructure issues. This is especially important since DLQ messages often represent valuable data requiring investigation or manual intervention.
        <br><br>
        <b>Important</b>: This setting is only used if <code>rabbitmq.dead.letter.queue.auto.declare</code> is enabled. If the queue already exists, its type cannot be changed without deleting and recreating it.
    </td>
    <td>No</td>
    <td>CLASSIC</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.queue.auto.declare</td>
    <td>Dead Letter Queue Auto Declare</td>
    <td>Controls whether the system automatically creates the Dead Letter Queue if it doesn't already exist.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>true</b>: The Dead Letter Queue is automatically declared (created) when the inbound endpoint starts, using the type specified in <code>rabbitmq.dead.letter.queue.type</code>. Convenient for development, testing, or simple deployments where infrastructure management is automated.</li>
            <li><b>false</b> (default): The Dead Letter Queue must be pre-created manually or through infrastructure-as-code tools. Recommended for production environments where queue topology is managed centrally, versioned, and deployed through controlled processes (Terraform, Ansible, RabbitMQ management policies).</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>Auto-declaration may cause startup failures if permissions are insufficient or if a queue with the same name but different properties already exists</li>
            <li>Manual declaration allows for more precise control over queue arguments, durability settings, and cluster placement</li>
            <li>In production, prefer pre-creating queues to avoid unexpected topology changes during application deployments</li>
        </ul>
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.exchange.name</td>
    <td>Dead Letter Exchange Name</td>
    <td>The name of the Dead Letter Exchange (DLX) responsible for routing dead-lettered messages from the primary queue to the Dead Letter Queue.
        <br><br>
        <b>How it works</b>: When messages are dead-lettered (rejected, expired, or exceeding delivery limits), they are republished to this exchange instead of being discarded. The exchange then routes them to bound queue(s) based on the exchange type and routing rules, typically the configured DLQ.
        <br><br>
        <b>Architecture patterns</b>:
        <ul>
            <li><b>Dedicated DLX per queue</b>: Each primary queue has its own DLX (e.g., <code>orders.dlx</code>, <code>payments.dlx</code>) for isolated failure handling</li>
            <li><b>Shared DLX</b>: Multiple queues route to a common DLX (e.g., <code>app.dlx</code>) with routing keys distinguishing the source queue</li>
        </ul>
        <b>Best practices</b>:
        <ul>
            <li>Use clear naming conventions indicating purpose (e.g., <code>service-name.dlx</code>)</li>
            <li>Ensure the DLX exists before configuring it on queues (or enable auto-declare)</li>
            <li>The primary queue must have this DLX configured via the <code>x-dead-letter-exchange</code> queue argument</li>
        </ul>
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.exchange.type</td>
    <td>Dead Letter Exchange Type</td>
    <td>Defines the exchange type for the Dead Letter Exchange, determining how dead-lettered messages are routed. <b>Options</b>:
        <ul>
            <li><b>DIRECT</b>: Routes messages based on an exact routing key match. Dead-lettered messages are published with either their original routing key or the routing key specified in <code>rabbitmq.dead.letter.routing.key</code> (if configured). Use DIRECT when you need to route failed messages from different source queues to different DLQs, or when you want to preserve routing semantics. Requires binding the DLQ with the appropriate routing key.</li>
            <li><b>FANOUT</b>: Broadcasts all dead-lettered messages to all queues bound to the DLX, ignoring routing keys. Simpler configuration since no routing key matching is needed. Use FANOUT when all dead-lettered messages should go to the same destination(s) regardless of source or when multiple DLQ consumers need copies of every failed message (e.g., for monitoring and archival simultaneously).</li>
        </ul>
        <b>Recommendation</b>: DIRECT is more common as it provides flexibility for routing to specific DLQs based on message origin or failure type. FANOUT is simpler but less flexible.
        <br><br>
        <b>Important</b>: This setting is only used if <code>rabbitmq.dead.letter.exchange.auto.declare</code> is enabled. If using DIRECT, ensure <code>rabbitmq.dead.letter.routing.key</code> is configured.
    </td>
    <td>No</td>
    <td>DIRECT</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.exchange.auto.declare</td>
    <td>Dead Letter Exchange Auto Declare</td>
    <td>Controls whether the system automatically creates the Dead Letter Exchange if it doesn't already exist.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>true</b>: The Dead Letter Exchange is automatically declared (created) when the inbound endpoint starts, using the type specified in <code>rabbitmq.dead.letter.exchange.type</code>. Convenient for development, testing, or automated deployment scenarios.</li>
            <li><b>false</b> (default): The Dead Letter Exchange must be pre-created manually or through infrastructure management tools. Recommended for production environments where exchange topology is managed centrally and changes are version-controlled.</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>Auto-declaration requires appropriate permissions and may fail if an exchange with the same name but different type already exists</li>
            <li>Manual declaration allows better control over exchange durability, internal flags, and other advanced properties</li>
            <li>In multi-service architectures, centralized exchange management prevents conflicts and ensures consistency</li>
        </ul>
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.routing.key</td>
    <td>Dead Letter Routing Key</td>
    <td>Specifies the routing key used when publishing dead-lettered messages to a DIRECT Dead Letter Exchange. This overrides the message's original routing key.
        <br><br>
        <b>How it works</b>: When a message is dead-lettered and the DLX is of type DIRECT, this routing key is used to route the message to bound queue(s). The DLQ must be bound to the DLX with a matching routing key for messages to be delivered.
        <br><br>
        <b>Common patterns</b>:
        <ul>
            <li><b>Static routing key</b>: Use a fixed value like <code>failed</code> or <code>dlq</code> for all dead-lettered messages from this queue</li>
            <li><b>Source-based routing</b>: Use descriptive keys like <code>orders.failed</code>, <code>payments.rejected</code> to identify the source queue</li>
            <li><b>Preserve original</b>: Leave blank to use the message's original routing key (useful for maintaining routing context)</li>
        </ul>
        <b>Example configuration</b>:
        <ul>
            <li>DLX: <code>app.dlx</code> (DIRECT)</li>
            <li>Dead Letter Routing Key: <code>orders.failed</code></li>
            <li>DLQ Binding: Queue <code>orders.dlq</code> bound to <code>app.dlx</code> with routing key <code>orders.failed</code></li>
        </ul>
        <b>Important</b>: This setting is only relevant when <code>rabbitmq.dead.letter.exchange.type</code> is DIRECT. It is ignored for FANOUT exchanges. Leave blank to preserve the original message routing key.
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.max.dead.lettered.count</td>
    <td>Max Dead Lettered Count</td>
    <td>Defines the maximum number of times a message can cycle through the dead-lettering process before being routed to the final Dead Letter Queue, preventing infinite retry loops.
        <br><br>
        <b>How it works</b>: RabbitMQ tracks the number of times a message has been dead-lettered using the <code>x-death</code> message header. Each time a message is dead-lettered, this counter increments. When the count reaches the specified limit, the message is routed to the final DLQ (configured via <code>rabbitmq.final.dead.letter.queue.name</code>) instead of the regular DLQ, effectively removing it from the retry cycle.
        <br><br>
        <b>Use cases</b>:
        <ul>
            <li><b>Retry with delay</b>: Combined with TTL-based delay queues, implements automatic retry with backoff (message goes to DLQ with TTL, then back to original queue, repeat until max count)</li>
            <li><b>Poison message protection</b>: Prevents messages that consistently fail from cycling indefinitely and consuming resources</li>
            <li><b>Tiered failure handling</b>: Allows different handling for transient failures (regular DLQ) vs persistent failures (final DLQ)</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>3-5</b>: Suitable for retry scenarios with moderate failure tolerance</li>
            <li><b>10+</b>: For scenarios where extensive retry attempts are acceptable before final abandonment</li>
        </ul>
        <b>Important</b>: Requires configuring the final DLQ infrastructure (<code>rabbitmq.final.dead.letter.queue.name</code>, <code>rabbitmq.final.dead.letter.exchange.name</code>). Leave blank to disable the final DLQ mechanism (messages can be dead-lettered indefinitely).
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.queue.name</td>
    <td>Final Dead Letter Queue Name</td>
    <td>The name of the final Dead Letter Queue where messages are sent after exceeding the maximum dead-lettered count specified in <code>rabbitmq.max.dead.lettered.count</code>.
        <br><br>
        <b>Purpose</b>: The final DLQ serves as the terminal destination for poison messages - messages that have repeatedly failed processing despite multiple retry attempts. These messages are typically:
        <ul>
            <li>Structurally invalid or corrupted data that cannot be parsed</li>
            <li>Business logic violations that won't resolve with retries</li>
            <li>Messages requiring code changes or manual intervention to process</li>
        </ul>
        <b>Best practices</b>:
        <ul>
            <li>Use distinct naming (e.g., <code>orders.final-dlq</code>, <code>payments.poison-messages</code>) to clearly differentiate from the regular DLQ</li>
            <li>Implement separate monitoring and alerting for the final DLQ - messages here represent systematic issues</li>
            <li>Configure longer retention or persistent storage since these messages often require manual analysis</li>
            <li>Consider periodic review processes to identify patterns in final DLQ messages and address root causes</li>
        </ul>
        <b>Important</b>: Only used when <code>rabbitmq.max.dead.lettered.count</code> is configured. Must be bound to the final DLX specified in <code>rabbitmq.final.dead.letter.exchange.name</code>.
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.queue.type</td>
    <td>Final Dead Letter Queue Type</td>
    <td>Defines the queue type for the final Dead Letter Queue. <b>Options</b>:
        <ul>
            <li><b>CLASSIC</b>: Traditional queue type with simpler configuration and lower overhead. May be acceptable for final DLQs with low message volumes or where loss is tolerable (messages can be re-generated from source systems).</li>
            <li><b>QUORUM</b>: Replicated queue type with high availability and durability. Strongly recommended for final DLQs since these messages represent critical failures that must be preserved for investigation. Ensures poison messages survive node failures and aren't lost during cluster maintenance.</li>
        </ul>
        <b>Recommendation</b>: Use QUORUM for production final DLQs. Messages in the final DLQ often contain valuable diagnostic information about systematic processing failures and should be reliably preserved.
        <br><br>
        <b>Important</b>: This setting is only used if <code>rabbitmq.final.dead.letter.queue.auto.declare</code> is enabled. The queue type cannot be changed after creation without deleting and recreating the queue.
    </td>
    <td>No</td>
    <td>CLASSIC</td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.queue.auto.declare</td>
    <td>Final Dead Letter Queue Auto Declare</td>
    <td>Controls whether the system automatically creates the final Dead Letter Queue if it doesn't already exist.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>true</b>: The final Dead Letter Queue is automatically declared when the inbound endpoint starts, using the type from <code>rabbitmq.final.dead.letter.queue.type</code>. Convenient for development or automated deployments.</li>
            <li><b>false</b> (default): The final DLQ must be pre-created manually or through infrastructure automation. Recommended for production where queue topology is centrally managed and version-controlled.</li>
        </ul>
        <b>Considerations</b>: Same as <code>rabbitmq.dead.letter.queue.auto.declare</code> - production environments typically benefit from explicit infrastructure management rather than runtime auto-creation.
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.exchange.name</td>
    <td>Final Dead Letter Exchange Name</td>
    <td>The name of the final Dead Letter Exchange used to route messages that have exceeded the maximum dead-lettered count to the final DLQ.
        <br><br>
        <b>How it works</b>: When a message's dead-letter count reaches <code>rabbitmq.max.dead.lettered.count</code>, it is published to this exchange instead of the regular DLX. This exchange then routes the message to the final DLQ, removing it from the retry cycle.
        <br><br>
        <b>Architecture patterns</b>:
        <ul>
            <li><b>Separate final DLX</b>: Use a distinct exchange (e.g., <code>app.final-dlx</code>) to clearly separate retry logic from terminal failure handling</li>
            <li><b>Shared with regular DLX</b>: Reuse the same exchange with different routing keys to distinguish regular vs final dead-lettering (less common but simpler topology)</li>
        </ul>
        <b>Important</b>: Only used when <code>rabbitmq.max.dead.lettered.count</code> is configured. The final DLQ must be bound to this exchange with the appropriate routing key (if DIRECT) or simply bound (if FANOUT).
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.exchange.type</td>
    <td>Final Dead Letter Exchange Type</td>
    <td>Defines the exchange type for the final Dead Letter Exchange. <b>Options</b>:
        <ul>
            <li><b>DIRECT</b>: Routes messages based on routing key matching. Provides flexibility for routing poison messages to different final destinations based on source queue or failure type. Requires configuring <code>rabbitmq.final.dead.letter.routing.key</code> and binding the final DLQ with matching routing key.</li>
            <li><b>FANOUT</b>: Broadcasts all poison messages to all bound queues. Simpler configuration with no routing key management needed. Use when all poison messages should go to the same final DLQ regardless of source.</li>
        </ul>
        <b>Recommendation</b>: DIRECT is more common for flexibility, but FANOUT is simpler when routing complexity isn't needed.
        <br><br>
        <b>Important</b>: This setting is only used if <code>rabbitmq.final.dead.letter.exchange.auto.declare</code> is enabled.
    </td>
    <td>No</td>
    <td>DIRECT</td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.exchange.auto.declare</td>
    <td>Final Dead Letter Exchange Auto Declare</td>
    <td>Controls whether the system automatically creates the final Dead Letter Exchange if it doesn't already exist.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>true</b>: The final Dead Letter Exchange is automatically declared when the inbound endpoint starts, using the type from <code>rabbitmq.final.dead.letter.exchange.type</code>.</li>
            <li><b>false</b> (default): The final DLX must be pre-created manually or through infrastructure management tools.</li>
        </ul>
        <b>Considerations</b>: Same as <code>rabbitmq.dead.letter.exchange.auto.declare</code> - production environments typically benefit from centralized exchange management.
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.final.dead.letter.routing.key</td>
    <td>Final Dead Letter Routing Key</td>
    <td>Specifies the routing key used when publishing poison messages (exceeding max dead-lettered count) to a DIRECT final Dead Letter Exchange.
        <br><br>
        <b>How it works</b>: When a message reaches the maximum dead-letter count and the final DLX is DIRECT, this routing key determines how the message is routed to the final DLQ. The final DLQ must be bound to the final DLX with a matching routing key.
        <br><br>
        <b>Common patterns</b>:
        <ul>
            <li><b>Fixed poison key</b>: Use values like <code>poison</code>, <code>failed-final</code>, or <code>abandoned</code></li>
            <li><b>Source-based</b>: Include source identification like <code>orders.poison</code>, <code>payments.final-failure</code></li>
            <li><b>Preserve original</b>: Leave blank to use the message's original routing key</li>
        </ul>
        <b>Important</b>: Only relevant when <code>rabbitmq.final.dead.letter.exchange.type</code> is DIRECT. Ignored for FANOUT exchanges. Leave blank to preserve the original message routing key.
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.publisher.retry.interval</td>
    <td>Dead Letter Publisher Retry Interval (ms)</td>
    <td>Defines the initial interval (in milliseconds) between retry attempts when publishing a message to the Dead Letter Queue fails.
        <br><br>
        <b>How it works</b>: If publishing to the DLQ fails due to network issues, broker unavailability, or resource constraints, the system waits this duration before attempting to republish. Combined with the exponential factor, subsequent retries wait progressively longer (e.g., 10s, 20s, 40s with factor 2.0).
        <br><br>
        <b>Use cases for retry</b>: DLQ publishing can fail due to:
        <ul>
            <li>Temporary network partitions or connectivity issues</li>
            <li>Broker resource limits (memory, disk space)</li>
            <li>Queue length or size limits on the DLQ itself</li>
            <li>Brief broker unavailability during restarts or failovers</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>5000-10000ms (5-10 seconds)</b>: Balances quick recovery with avoiding excessive retry storms</li>
            <li><b>Shorter (1000-3000ms)</b>: For scenarios where DLQ availability is critical and failures are expected to be very brief</li>
            <li><b>Longer (30000ms+)</b>: When DLQ publishing is low priority and can tolerate extended delays</li>
        </ul>
        <b>Default</b>: 10000ms (10 seconds) provides reasonable balance for most scenarios.
    </td>
    <td>No</td>
    <td>10000</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.publisher.retry.count</td>
    <td>Dead Letter Publisher Retry Count</td>
    <td>Specifies the maximum number of retry attempts when publishing to the Dead Letter Queue fails.
        <br><br>
        <b>How it works</b>: After the initial publish attempt fails, the system retries up to this many times before giving up. Each retry waits progressively longer based on the retry interval and exponential factor.
        <br><br>
        <b>Failure handling</b>: After exhausting all retries:
        <ul>
            <li>The failed message is typically logged with full details for manual recovery</li>
            <li>The original message may be lost if no other fallback mechanism exists</li>
            <li>Monitoring should alert on DLQ publish failures to enable manual intervention</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>3-5 retries</b>: Balances recovery attempts with preventing indefinite blocking. Default is 3.</li>
            <li><b>0-1 retries</b>: For fail-fast scenarios where DLQ unavailability should immediately escalate to alerts</li>
            <li><b>10+ retries</b>: For critical systems where every failed message must be captured, accepting longer delays</li>
        </ul>
        <b>Consideration</b>: Higher retry counts with exponential backoff can result in very long total retry periods. For example, 3 retries with 10s initial interval and 2.0 factor = 10s + 20s + 40s = 70s total retry time.
    </td>
    <td>No</td>
    <td>3</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.publisher.retry.exponential.factor</td>
    <td>Dead Letter Publisher Retry Exponential Factor</td>
    <td>Defines the exponential backoff multiplier applied to the retry interval for subsequent retry attempts when DLQ publishing fails.
        <br><br>
        <b>How it works</b>: Each retry attempt waits for <code>interval × (factor ^ attempt_number)</code>. For example:
        <ul>
            <li>Initial interval: 10000ms, Factor: 2.0</li>
            <li>1st retry: 10000ms (10s)</li>
            <li>2nd retry: 20000ms (20s) - interval × 2.0</li>
            <li>3rd retry: 40000ms (40s) - interval × 2.0²</li>
        </ul>
        <b>Purpose</b>: Exponential backoff prevents overwhelming a struggling broker with rapid retry attempts while still allowing quick recovery for transient failures. Longer delays between retries give the broker time to recover from resource constraints or complete maintenance operations.
        <br><br>
        <b>Typical values</b>:
        <ul>
            <li><b>2.0</b> (default): Doubles the wait time with each retry - aggressive but reasonable</li>
            <li><b>1.5</b>: More gradual backoff for scenarios where quick retry is preferred</li>
            <li><b>3.0</b>: Aggressive backoff when broker recovery is expected to take longer</li>
            <li><b>1.0</b>: No exponential backoff - fixed interval between all retries</li>
        </ul>
        <b>Important</b>: Setting this to 1.0 disables exponential backoff, resulting in fixed-interval retries. Values less than 1.0 would decrease intervals (not recommended).
    </td>
    <td>No</td>
    <td>2.0</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.publisher.ack.wait.time</td>
    <td>Dead Letter Publisher Broker ACKNOWLEDGE Waiting Time (ms)</td>
    <td>Specifies the maximum time (in milliseconds) to wait for the RabbitMQ broker to acknowledge successful receipt of a dead-lettered message when using publisher confirms.
        <br><br>
        <b>How it works</b>: When publisher confirms are enabled (recommended for reliability), the broker sends an acknowledgment after successfully persisting the message. This timeout controls how long the publisher waits for that acknowledgment before considering the publish operation failed.
        <br><br>
        <b>Timeout scenarios</b>:
        <ul>
            <li><b>Broker overload</b>: High message volumes or resource constraints may delay acknowledgments</li>
            <li><b>Network latency</b>: Slow or unstable network connections between client and broker</li>
            <li><b>Disk I/O delays</b>: Slow disk writes for durable queues or mirrored/quorum queues</li>
            <li><b>Cluster synchronization</b>: Quorum queues require majority consensus before acknowledging</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>10000-30000ms (10-30 seconds)</b>: Default is 30000ms. Sufficient for most scenarios including quorum queues</li>
            <li><b>Shorter (5000ms)</b>: For low-latency environments with fast disks and minimal network latency</li>
            <li><b>Longer (60000ms+)</b>: For distributed clusters or environments with known slow disk I/O</li>
        </ul>
        <b>Failure handling</b>: If the timeout expires without receiving an acknowledgment, the publish is considered failed and retry logic (if configured) is triggered.
        <br><br>
        <b>Important</b>: This timeout should be longer than typical publish latencies to avoid false failures. Monitor actual acknowledgment times to tune appropriately.
    </td>
    <td>No</td>
    <td>30000</td>
</tr>
<tr>
    <td>rabbitmq.dead.letter.publisher.shutdown.timeout</td>
    <td>Dead Letter Publisher Shutdown Timeout (ms)</td>
    <td>Defines the maximum time (in milliseconds) to wait for the dead letter publisher to complete pending operations and shut down gracefully during application shutdown.
        <br><br>
        <b>How it works</b>: When the application begins shutdown, the dead letter publisher attempts to:
        <ul>
            <li>Complete any in-flight publish operations and await acknowledgments</li>
            <li>Flush any buffered messages to the broker</li>
            <li>Retry any failed publishes within the remaining timeout window</li>
            <li>Close connections and release resources cleanly</li>
        </ul>
        If these operations don't complete within the timeout, the publisher is forcefully terminated, potentially losing messages that were in the process of being published.
        <br><br>
        <b>Typical values</b>:
        <ul>
            <li><b>60000-180000ms (1-3 minutes)</b>: Default is 180000ms (3 minutes). Allows time for retries and acknowledgments</li>
            <li><b>Shorter (30000ms)</b>: For environments requiring fast shutdown cycles, accepting higher risk of message loss</li>
            <li><b>Longer (300000ms+)</b>: For critical systems where DLQ message loss is unacceptable and longer shutdown is tolerable</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>Should be longer than <code>(retry.interval × exponential.factor ^ retry.count) + ack.wait.time</code> to allow full retry cycles</li>
            <li>In containerized environments (Kubernetes, Docker), ensure this timeout is shorter than the container termination grace period</li>
            <li>Longer timeouts delay application shutdown but improve message reliability</li>
        </ul>
        <b>Important</b>: Failed messages not successfully published within this timeout may be lost. Consider implementing persistent local buffering if message loss during shutdown is unacceptable.
    </td>
    <td>No</td>
    <td>180000</td>
  </tr>
    <tr>
        <th colspan="5">Throttling Configurations</th>
    </tr>
   <tr>
    <td>rabbitmq.throttle.enabled</td>
    <td>Throttling Enabled</td>
    <td>Controls whether message consumption rate limiting is active. When enabled, the consumer will throttle message processing according to the configured throttling mode, time unit, and count limits.
        <br><br>
        <b>Purpose</b>: Throttling prevents overwhelming downstream systems, controls resource consumption, enforces API rate limits, or ensures compliance with service-level agreements (SLAs) that specify maximum processing rates.
        <br><br>
        <b>Use cases</b>:
        <ul>
            <li><b>External API rate limits</b>: Processing messages that call third-party APIs with strict rate limits (e.g., 1000 calls/hour)</li>
            <li><b>Database protection</b>: Limiting write operations to prevent overloading databases during peak message volumes</li>
            <li><b>Cost control</b>: Capping processing rates to control consumption-based costs (API calls, cloud resources)</li>
            <li><b>Quality of service</b>: Ensuring fair resource allocation across multiple consumers or message types</li>
            <li><b>Gradual rollout</b>: Slowly ramping up processing during new feature deployments or system migrations</li>
        </ul>
        <b>Behavior</b>:
        <ul>
            <li><b>true</b>: Message consumption is limited according to <code>rabbitmq.throttle.mode</code>, <code>rabbitmq.throttle.timeUnit</code>, and <code>rabbitmq.throttle.count</code></li>
            <li><b>false</b> (default): No throttling applied - messages are consumed as fast as the consumer can process them</li>
        </ul>
        <b>Important</b>: Throttling affects consumer throughput and may cause queue backlog if message arrival rate exceeds the throttling limit. Monitor queue depth and adjust limits appropriately.
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.throttle.mode</td>
    <td>Throttling Mode</td>
    <td>Defines the strategy for applying rate limiting to message consumption. <b>Options</b>:
        <ul>
            <li><b>FIXED_INTERVAL</b>: Enforces a fixed delay between consecutive message processing operations. The delay is calculated to achieve the target rate: <code>delay = (timeUnit in ms) / count</code>. For example, to process 60 messages/minute: delay = 60000ms / 60 = 1000ms between messages.
                <br><br>
                <b>Characteristics</b>:
                <ul>
                    <li>Smooth, evenly distributed message processing over time</li>
                    <li>Predictable, constant throughput rate</li>
                    <li>Each message incurs the calculated delay before the next message is fetched</li>
                    <li>More suitable for steady-state workloads with consistent message arrival rates</li>
                </ul>
                <b>Example</b>: With 100 messages/minute setting:
                <ul>
                    <li>Delay between messages: 600ms</li>
                    <li>Processing pattern: message → 600ms delay → message → 600ms delay → ...</li>
                    <li>Exactly 100 messages processed per minute, evenly spaced</li>
                </ul>
                <b>Best for</b>: Scenarios requiring smooth, predictable load distribution; preventing burst traffic to downstream systems; strict timing requirements.
            </li>
            <li><b>BATCH</b>: Processes messages in bursts up to the specified count within each time window, then waits until the next time window begins. Messages are consumed rapidly until the batch limit is reached, followed by a pause until the time window resets.
                <br><br>
                <b>Characteristics</b>:
                <ul>
                    <li>Bursty processing pattern with idle periods</li>
                    <li>Processes messages as fast as possible until limit reached</li>
                    <li>After reaching count limit, waits for the time window to reset before processing more</li>
                    <li>More efficient for scenarios where downstream systems can handle bursts</li>
                </ul>
                <b>Example</b>: With 100 messages/minute setting:
                <ul>
                    <li>At minute start (0:00): rapidly process 100 messages (may take 5-10 seconds)</li>
                    <li>Remaining time (0:10 - 1:00): idle, waiting for next time window</li>
                    <li>At next minute (1:00): process next 100 messages</li>
                </ul>
                <b>Best for</b>: Batch-oriented downstream systems; scenarios where burst processing is acceptable; maximizing throughput within rate limits while minimizing overall processing time.
                <br><br>
                <b>Default and recommended</b>: BATCH mode is simpler and typically more efficient, as it minimizes the overhead of per-message delays while still respecting rate limits.
            </li>
        </ul>
        <b>Mode comparison</b>:
        <table style="margin-top: 10px; border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Aspect</th>
                <th style="border: 1px solid #ddd; padding: 8px;">FIXED_INTERVAL</th>
                <th style="border: 1px solid #ddd; padding: 8px;">BATCH</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Processing pattern</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Evenly distributed over time</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Bursty with idle periods</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Downstream load</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Smooth, constant rate</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Burst at window start, then idle</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Latency</td>
                <td style="border: 1px solid #ddd; padding: 8px;">More consistent per-message</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Variable (fast if within limit, delayed if limit reached)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Efficiency</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Lower (constant delay overhead)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Higher (processes at max speed within limits)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Best for</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Steady load distribution, timing-sensitive operations</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Burst-tolerant systems, maximizing throughput</td>
            </tr>
        </table>
        <br>
        <b>Important</b>: Only relevant when <code>rabbitmq.throttle.enabled</code> is true. The mode selection depends on downstream system characteristics and processing requirements.
    </td>
    <td>No</td>
    <td>BATCH</td>
</tr>
<tr>
    <td>rabbitmq.throttle.timeUnit</td>
    <td>Throttling Time Unit</td>
    <td>Defines the time window for applying the throttling rate limit. Combined with <code>rabbitmq.throttle.count</code>, this determines the maximum message processing rate. <b>Options</b>:
        <ul>
            <li><b>MINUTE</b>: Rate limit is applied per 60-second window. The throttle count represents the maximum messages to process per minute.
                <br><br>
                <b>Use cases</b>:
                <ul>
                    <li>Short-term rate limits (typical for most API rate limits)</li>
                    <li>Fine-grained control over processing rates</li>
                    <li>Responsive throttling that adapts quickly to load changes</li>
                </ul>
                <b>Example</b>: <code>count=120, timeUnit=MINUTE</code> → Maximum 120 messages per minute (2 messages/second average)
                <br><br>
                <b>FIXED_INTERVAL behavior</b>: 60000ms / 120 = 500ms delay between messages
                <br>
                <b>BATCH behavior</b>: Process up to 120 messages rapidly, then wait until next minute boundary
            </li>
            <li><b>HOUR</b>: Rate limit is applied per 60-minute window. The throttle count represents the maximum messages to process per hour.
                <br><br>
                <b>Use cases</b>:
                <ul>
                    <li>Hourly API quotas or service limits</li>
                    <li>Longer-term resource management</li>
                    <li>Systems with hourly billing or cost tracking</li>
                </ul>
                <b>Example</b>: <code>count=10000, timeUnit=HOUR</code> → Maximum 10,000 messages per hour (≈167 messages/minute average)
                <br><br>
                <b>FIXED_INTERVAL behavior</b>: 3600000ms / 10000 = 360ms delay between messages
                <br>
                <b>BATCH behavior</b>: Process up to 10,000 messages rapidly at hour start, then wait until next hour
            </li>
            <li><b>DAY</b>: Rate limit is applied per 24-hour window. The throttle count represents the maximum messages to process per day.
                <br><br>
                <b>Use cases</b>:
                <ul>
                    <li>Daily quotas or processing limits</li>
                    <li>Long-term capacity planning and cost control</li>
                    <li>Systems with daily budget constraints</li>
                    <li>Compliance requirements with daily processing caps</li>
                </ul>
                <b>Example</b>: <code>count=100000, timeUnit=DAY</code> → Maximum 100,000 messages per day (≈4167 messages/hour, ≈69 messages/minute average)
                <br><br>
                <b>FIXED_INTERVAL behavior</b>: 86400000ms / 100000 = 864ms delay between messages
                <br>
                <b>BATCH behavior</b>: Process up to 100,000 messages rapidly at day start, then wait until next day (midnight)
            </li>
        </ul>
        <b>Choosing the right time unit</b>:
        <ul>
            <li><b>Match downstream limits</b>: If external API has 1000/hour limit, use HOUR with count=1000</li>
            <li><b>Consider bursty behavior</b>: Shorter time units (MINUTE) with BATCH mode create more frequent bursts; longer units (HOUR, DAY) create larger, less frequent bursts</li>
            <li><b>Balance responsiveness</b>: Shorter time units allow faster adaptation to changing conditions</li>
            <li><b>Account for time zone resets</b>: DAY-based throttling resets at midnight in the system timezone</li>
        </ul>
        <b>Important</b>: Only relevant when <code>rabbitmq.throttle.enabled</code> is true. The time unit should align with the rate limiting requirements of your downstream systems or organizational policies.
    </td>
    <td>No</td>
    <td>MINUTE</td>
</tr>
<tr>
    <td>rabbitmq.throttle.count</td>
    <td>Throttling Limit</td>
    <td>Specifies the maximum number of messages to process within the configured time unit. Combined with <code>rabbitmq.throttle.timeUnit</code>, this defines the target processing rate.
        <br><br>
        <b>How it works</b>: The count determines either:
        <ul>
            <li><b>FIXED_INTERVAL mode</b>: Used to calculate the delay between messages: <code>delay = (timeUnit in milliseconds) / count</code></li>
            <li><b>BATCH mode</b>: The maximum number of messages to process before waiting for the next time window</li>
        </ul>
        <b>Calculation examples</b>:
        <ul>
            <li><code>count=60, timeUnit=MINUTE</code> → 60 messages per minute = 1 message/second
                <ul>
                    <li>FIXED_INTERVAL: 1000ms delay between messages</li>
                    <li>BATCH: Process 60 messages, wait until next minute</li>
                </ul>
            </li>
            <li><code>count=3600, timeUnit=HOUR</code> → 3600 messages per hour = 1 message/second
                <ul>
                    <li>FIXED_INTERVAL: 1000ms delay between messages</li>
                    <li>BATCH: Process 3600 messages, wait until next hour</li>
                </ul>
            </li>
            <li><code>count=10, timeUnit=MINUTE</code> → 10 messages per minute = 1 message every 6 seconds
                <ul>
                    <li>FIXED_INTERVAL: 6000ms delay between messages</li>
                    <li>BATCH: Process 10 messages rapidly, wait ~50+ seconds until next minute</li>
                </ul>
            </li>
        </ul>
        <b>Setting appropriate values</b>:
        <ul>
            <li><b>Match external limits</b>: If calling an API with 1000 requests/hour limit, set count to slightly below (e.g., 950) to provide safety margin</li>
            <li><b>Consider processing time</b>: Ensure the count allows enough time for actual message processing. For BATCH mode, <code>count × avg_processing_time</code> should be less than the time window</li>
            <li><b>Account for multiple consumers</b>: If multiple consumer instances are running, divide the total limit by the number of instances</li>
            <li><b>Start conservative</b>: Begin with lower counts and gradually increase based on monitoring and downstream system capacity</li>
        </ul>
        <b>Impact on throughput</b>:
        <ul>
            <li><b>Lower counts</b>: More restrictive throttling, lower throughput, higher queue backlog risk, but better downstream protection</li>
            <li><b>Higher counts</b>: Less restrictive throttling, higher throughput, faster queue processing, but may stress downstream systems</li>
        </ul>
        <b>Monitoring considerations</b>:
        <ul>
            <li>Monitor queue depth to ensure throttling limits aren't causing excessive backlog</li>
            <li>Track actual processing rates to verify throttling is working as expected</li>
            <li>Alert on queue growth that exceeds normal thresholds</li>
            <li>Adjust count dynamically based on downstream system health and capacity</li>
        </ul>
        <b>Important</b>: Required when <code>rabbitmq.throttle.enabled</code> is true. Must be a positive integer greater than 0. The effectiveness of throttling depends on proper alignment with downstream system capabilities and rate limits.
    </td>
    <td>No</td>
    <td> - </td>
  </tr>
    <tr>
        <th colspan="5">Other</th>
    </tr>
    <tr>
        <td>rabbitmq.server.virtual.host</td>
        <td>Virtual Host</td>
        <td>The virtual host (vhost) to connect to. Leave blank for the default '/' vhost.</td>
        <td>No</td>
        <td>/</td>
    </tr>
    <tr>
    <td>rabbitmq.message.content.type</td>
    <td>Content-Type</td>
    <td>Specifies the default Content-Type header to apply to consumed messages when the content type cannot be determined from the message's properties.
        <br><br>
        <b>How it works</b>: RabbitMQ messages can include a <code>content_type</code> property set by the publisher. If this property is missing or empty, the connector uses this default value to interpret and process the message body appropriately.
        <br><br>
        <b>Common values</b>:
        <ul>
            <li><code>application/json</code>: For JSON-formatted message bodies (most common for modern APIs and microservices)</li>
            <li><code>application/xml</code>: For XML-formatted message bodies</li>
            <li><code>text/plain</code>: For plain text messages</li>
            <li><code>application/octet-stream</code>: For binary data without specific format</li>
            <li><code>application/x-www-form-urlencoded</code>: For form-encoded data</li>
        </ul>
        <b>Use cases</b>:
        <ul>
            <li>Working with legacy systems that don't set content type properties</li>
            <li>Enforcing a default format for all messages in a queue</li>
            <li>Ensuring proper message deserialization when content type is ambiguous</li>
        </ul>
        <b>Important</b>: This value is only used as a fallback when the message doesn't have a content_type property. Messages with explicit content_type properties will use their own value. Leave blank if content type should always be determined from message properties (recommended when publishers consistently set this property).
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.message.content.encoding</td>
    <td>Content Encoding (Charset)</td>
    <td>Specifies the default character encoding/charset to use when decoding text-based message bodies if the encoding cannot be determined from the message's properties.
        <br><br>
        <b>How it works</b>: RabbitMQ messages can include a <code>content_encoding</code> property set by the publisher indicating the character set (e.g., UTF-8, ISO-8859-1). If this property is missing, this default value is used to decode the message body bytes into text.
        <br><br>
        <b>Common values</b>:
        <ul>
            <li><code>UTF-8</code>: Universal character encoding supporting all languages (most common and recommended default)</li>
            <li><code>ISO-8859-1</code> (Latin-1): Western European languages</li>
            <li><code>US-ASCII</code>: Basic ASCII characters only</li>
            <li><code>UTF-16</code>: Unicode encoding with 16-bit code units</li>
        </ul>
        <b>Use cases</b>:
        <ul>
            <li>Working with legacy publishers that don't set content encoding</li>
            <li>Ensuring correct text decoding for international character sets</li>
            <li>Preventing character corruption when processing multilingual messages</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>Incorrect encoding can cause character corruption, especially for non-ASCII characters (accents, emoji, non-Latin scripts)</li>
            <li>UTF-8 is the safest default for modern applications as it supports all Unicode characters</li>
            <li>This only affects text-based content types; binary data is not decoded</li>
        </ul>
        <b>Important</b>: This value is only used as a fallback when the message doesn't have a content_encoding property. Leave blank if encoding should always be determined from message properties (recommended when publishers consistently set this property).
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.queue.overflow.strategy</td>
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
        <b>Important</b>: This setting applies to CLASSIC and QUORUM queues when length limits are defined. STREAM queues handle overflow through their own retention mechanisms (<code>maxAge</code>, <code>maxLengthBytes</code>). This parameter is used when auto-declaring queues; for pre-existing queues, the overflow strategy must be set via queue arguments during queue creation.
    </td>
    <td>No</td>
    <td>DROP_HEAD</td>
</tr>
<tr>
    <td>rabbitmq.message.requeue.delay</td>
    <td>Requeue Delay</td>
    <td>Specifies the delay (in milliseconds) before a failed message is automatically requeued to the original queue for reprocessing.
        <br><br>
        <b>How it works</b>: When a message processing fails and the consumer negatively acknowledges it (nack) with requeue=true, instead of immediately returning the message to the queue, the connector waits for this delay period before requeuing. This prevents rapid retry loops and gives time for transient issues to resolve.
        <br><br>
        <b>Use cases</b>:
        <ul>
            <li><b>Transient failure handling</b>: Temporary database connection issues, external service timeouts, rate limiting</li>
            <li><b>Rate limiting</b>: Preventing overwhelming of downstream services with rapid retries</li>
            <li><b>Circuit breaker support</b>: Allowing time for circuit breakers to reset or services to recover</li>
            <li><b>Resource contention</b>: Giving time for locks to release or resources to become available</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>0-1000ms (0-1 second)</b>: Quick retry for very transient failures</li>
            <li><b>5000-10000ms (5-10 seconds)</b>: Moderate delay for service recovery</li>
            <li><b>30000-60000ms (30-60 seconds)</b>: Longer delay for persistent transient issues</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>During the delay, the message is held by the consumer and counts against the prefetch limit</li>
            <li>Longer delays reduce retry storms but increase message processing latency</li>
            <li>This is a simple fixed delay; for exponential backoff, consider using the FIXED_DELAY_RETRYABLE_DISCARD strategy with delay queues</li>
            <li>If <code>rabbitmq.auto.ack.enabled</code> is true, this setting has no effect as messages are auto-acknowledged</li>
        </ul>
        <b>Important</b>: Leave blank or set to 0 for immediate requeue (no delay). This setting only applies when messages are nacked with requeue=true. For more sophisticated retry patterns with exponential backoff, use dead letter exchanges with TTL-based delay queues.
    </td>
    <td>No</td>
    <td> - </td>
</tr>
<tr>
    <td>rabbitmq.auto.ack.enabled</td>
    <td>Auto Acknowledge Enabled</td>
    <td>Controls whether messages are automatically acknowledged immediately upon delivery to the consumer, before processing begins.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>false</b> (default, recommended): Manual acknowledgment mode. Messages are acknowledged only after successful processing by the application. If processing fails or the consumer crashes, unacknowledged messages are automatically requeued by RabbitMQ, ensuring at-least-once delivery. Provides reliability and message safety at the cost of requiring explicit acknowledgment handling.</li>
            <li><b>true</b>: Automatic acknowledgment mode. RabbitMQ considers messages acknowledged as soon as they're delivered to the consumer, regardless of processing outcome. If the consumer crashes or processing fails after delivery, the message is lost permanently. Provides higher throughput and simpler code but risks message loss. Only use when message loss is acceptable.</li>
        </ul>
        <b>Trade-offs</b>:
        <table style="margin-top: 10px; border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Aspect</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Auto ACK (true)</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Manual ACK (false)</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Reliability</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Low - message loss on failures</td>
                <td style="border: 1px solid #ddd; padding: 8px;">High - at-least-once delivery</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Performance</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Higher throughput</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Slightly lower (ACK overhead)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Code complexity</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Simpler (no ACK handling)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">More complex (explicit ACK/NACK)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Message reprocessing</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Not possible</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Automatic on failure</td>
            </tr>
        </table>
        <br>
        <b>When to use auto ACK (true)</b>:
        <ul>
            <li>Logs, metrics, or monitoring data where loss is acceptable</li>
            <li>Duplicate-sensitive workflows where at-most-once delivery is required</li>
            <li>High-throughput scenarios where performance outweighs reliability</li>
            <li>Development/testing environments</li>
        </ul>
        <b>When to use manual ACK (false, recommended)</b>:
        <ul>
            <li>Financial transactions, orders, payments, or any critical business data</li>
            <li>State changes that must not be lost</li>
            <li>Production systems where message reliability is important</li>
            <li>Scenarios requiring retry on failure</li>
        </ul>
        <b>Important</b>: When auto ACK is enabled, settings like <code>rabbitmq.message.requeue.delay</code>, <code>rabbitmq.ack.wait.time</code>, and dead letter strategies have reduced or no effect since messages are acknowledged before processing.
    </td>
    <td>No</td>
    <td>false</td>
</tr>
<tr>
    <td>rabbitmq.ack.wait.time</td>
    <td>ACKNOWLEDGE Wait Time (ms)</td>
    <td>Defines the maximum time (in milliseconds) to wait for message processing to complete before timing out the acknowledgment operation.
        <br><br>
        <b>How it works</b>: In manual acknowledgment mode (<code>rabbitmq.auto.ack.enabled=false</code>), after delivering a message to the consumer application, the connector waits up to this duration for the application to process the message and send an acknowledgment (ACK or NACK). If processing exceeds this timeout, the connector may take timeout action depending on implementation (typically logging an error and potentially nacking the message).
        <br><br>
        <b>Purpose</b>:
        <ul>
            <li>Prevents indefinite blocking when message processing hangs or takes unexpectedly long</li>
            <li>Allows detection of slow or stuck message processing</li>
            <li>Ensures system responsiveness and resource cleanup</li>
            <li>Helps identify performance bottlenecks or processing issues</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>30000-60000ms (30-60 seconds)</b>: For quick processing tasks (API calls, simple transformations)</li>
            <li><b>180000ms (3 minutes)</b>: Default - suitable for moderate processing complexity</li>
            <li><b>300000-600000ms (5-10 minutes)</b>: For complex processing, external service calls, or batch operations</li>
            <li><b>900000ms+ (15+ minutes)</b>: For very long-running tasks, though these may be better handled asynchronously</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li>Should be longer than your worst-case expected processing time plus buffer</li>
            <li>Too short: legitimate long-running tasks may timeout and be requeued unnecessarily</li>
            <li>Too long: hung processes won't be detected promptly, tying up resources</li>
            <li>Monitor actual processing times to tune appropriately</li>
            <li>Consider breaking very long tasks into smaller chunks or using async patterns</li>
        </ul>
        <b>Important</b>: This setting only applies when <code>rabbitmq.auto.ack.enabled=false</code> (manual acknowledgment mode). In auto ACK mode, messages are acknowledged immediately upon receipt, so this timeout is not relevant. Timeout behavior may vary by connector implementation - consult specific connector documentation.
    </td>
    <td>No</td>
    <td>180000</td>
</tr>
<tr>
    <td>rabbitmq.concurrent.consumers.count</td>
    <td>Concurrent Consumers</td>
    <td>Specifies the number of concurrent consumer instances to create for processing messages from the queue in parallel.
        <br><br>
        <b>How it works</b>: Each consumer runs independently and can process messages simultaneously. RabbitMQ distributes messages across all active consumers using round-robin (by default) or other distribution strategies. Multiple consumers enable parallel processing and higher throughput.
        <br><br>
        <b>Benefits of multiple consumers</b>:
        <ul>
            <li><b>Increased throughput</b>: Process more messages per second by parallelizing work</li>
            <li><b>Better resource utilization</b>: Keep CPUs busy while waiting on I/O operations</li>
            <li><b>Fault tolerance</b>: If one consumer fails, others continue processing</li>
            <li><b>Reduced latency</b>: Messages don't wait in queue as long when more consumers are available</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>1</b>: Single consumer - simplest configuration, ordered processing, lower throughput</li>
            <li><b>2-10</b>: Moderate parallelism - good balance for most workloads</li>
            <li><b>10-50+</b>: High parallelism - for high-volume queues or I/O-bound processing</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li><b>Message ordering</b>: Multiple consumers break message ordering within the queue. If strict ordering is required, use 1 consumer or implement application-level ordering</li>
            <li><b>Resource consumption</b>: Each consumer uses memory, threads, and connections. Scale based on available resources</li>
            <li><b>Prefetch interaction</b>: Works with <code>rabbitmq.consumer.initial.credit</code> (prefetch). Total in-flight messages = consumers × prefetch</li>
            <li><b>Thread pool sizing</b>: Should coordinate with <code>rabbitmq.message.receiver.thread.pool.size</code> - thread pool should be ≥ concurrent consumers</li>
            <li><b>Bottleneck identification</b>: If processing is CPU-bound, more consumers help. If I/O-bound (databases, APIs), many consumers increase parallelism</li>
        </ul>
        <b>Scaling guidance</b>:
        <ul>
            <li>Start with 2-4 consumers and monitor queue depth and processing latency</li>
            <li>Increase if queue depth grows despite available CPU/memory</li>
            <li>Decrease if consumers are often idle or resource usage is excessive</li>
            <li>For I/O-bound tasks, can use more consumers than CPU cores</li>
            <li>For CPU-bound tasks, match consumer count to available cores</li>
        </ul>
        <b>Important</b>: Changes require application restart to take effect. For dynamic scaling based on queue depth, consider using RabbitMQ autoscaling features or container orchestration (Kubernetes HPA).
    </td>
    <td>No</td>
    <td>1</td>
</tr>
<tr>
    <td>rabbitmq.message.receiver.thread.pool.size</td>
    <td>Message Receiver Thread Pool Size</td>
    <td>Defines the size of the thread pool dedicated to receiving and initially processing messages from RabbitMQ. This thread pool handles message delivery from the broker to the consumer application.
        <br><br>
        <b>How it works</b>: RabbitMQ client libraries use threads to handle network I/O and message delivery. This parameter controls how many threads are available for these operations, enabling concurrent message receipt and processing.
        <br><br>
        <b>Relationship with concurrent consumers</b>:
        <ul>
            <li>Thread pool size should generally be <b>greater than or equal to</b> concurrent consumer count</li>
            <li>Each consumer may use one or more threads from this pool</li>
            <li>Insufficient threads can bottleneck message delivery even if consumers are idle</li>
            <li>Recommended: thread pool size ≥ concurrent consumers (often 1.5-2× concurrent consumers)</li>
        </ul>
        <b>Typical configurations</b>:
        <table style="margin-top: 10px; border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Concurrent Consumers</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Recommended Thread Pool Size</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Rationale</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">1</td>
                <td style="border: 1px solid #ddd; padding: 8px;">1-2</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Minimal overhead</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">5</td>
                <td style="border: 1px solid #ddd; padding: 8px;">5-10</td>
                <td style="border: 1px solid #ddd; padding: 8px;">1-2 threads per consumer</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">10</td>
                <td style="border: 1px solid #ddd; padding: 8px;">15-20</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Buffer for peak loads</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">20+</td>
                <td style="border: 1px solid #ddd; padding: 8px;">30-50+</td>
                <td style="border: 1px solid #ddd; padding: 8px;">High concurrency workloads</td>
            </tr>
        </table>
        <br>
        <b>Considerations</b>:
        <ul>
            <li><b>Too small</b>: Message delivery bottleneck, consumers starved of messages, reduced throughput</li>
            <li><b>Too large</b>: Excessive memory usage (each thread consumes stack memory), potential thread contention</li>
            <li><b>I/O-bound vs CPU-bound</b>: I/O-bound processing benefits from larger thread pools; CPU-bound may not</li>
            <li><b>Memory impact</b>: Each thread typically uses 1MB+ of stack space (platform-dependent)</li>
        </ul>
        <b>Tuning guidance</b>:
        <ul>
            <li>Start with thread pool = 2 × concurrent consumers</li>
            <li>Monitor thread utilization and message delivery latency</li>
            <li>Increase if thread pool exhaustion is observed (blocked message delivery)</li>
            <li>Decrease if excessive idle threads or memory pressure occurs</li>
        </ul>
        <b>Important</b>: This controls the connector's internal threading, not the application's business logic thread pool. Business logic may run on separate threads or executors depending on the connector implementation.
    </td>
    <td>No</td>
    <td>1</td>
</tr>
<tr>
    <td>rabbitmq.consumer.initial.credit</td>
    <td>Consumer Initial Credit</td>
    <td>Defines the prefetch count (QoS - Quality of Service) limit, controlling the maximum number of unacknowledged messages that can be delivered to a single consumer at once.
        <br><br>
        <b>How it works</b>: RabbitMQ uses a credit-based flow control mechanism. Each consumer is allocated an initial credit (prefetch count). The broker delivers messages up to this limit before pausing delivery. As the consumer acknowledges messages, credit is replenished and more messages are delivered. This prevents consumers from being overwhelmed with messages.
        <br><br>
        <b>Impact on system behavior</b>:
        <ul>
            <li><b>Load balancing</b>: With multiple consumers, lower prefetch ensures more even distribution (each consumer gets fewer messages at once). Higher prefetch may cause uneven load (fast consumers get many messages, slow ones get few)</li>
            <li><b>Throughput</b>: Higher prefetch increases throughput by reducing round-trips to the broker and keeping consumers continuously busy</li>
            <li><b>Latency</b>: Lower prefetch reduces message latency (messages don't wait in consumer buffers as long)</li>
            <li><b>Memory usage</b>: Higher prefetch increases consumer memory usage (more messages buffered in-flight)</li>
            <li><b>Failure impact</b>: Higher prefetch means more messages are redelivered if consumer crashes (all unacknowledged messages)</li>
        </ul>
        <b>Typical values</b>:
        <ul>
            <li><b>1</b>: Strict round-robin distribution, minimal memory, highest latency, lowest throughput. Best for ensuring fair load distribution or when message processing is very slow and inconsistent</li>
            <li><b>10-50</b>: Balanced approach - good throughput with reasonable memory usage and load distribution. Suitable for most workloads</li>
            <li><b>100-1000</b>: High throughput scenarios where consumers can handle large batches efficiently. Best when processing time is consistent and fast</li>
            <li><b>0 (unlimited)</b>: No limit - broker sends all available messages. Risky - can cause out-of-memory errors. Only for specific scenarios with known bounded queue sizes</li>
        </ul>
        <b>Calculation with multiple consumers</b>:
        <ul>
            <li>Total in-flight messages = concurrent consumers × prefetch count</li>
            <li>Example: 5 consumers × 20 prefetch = 100 messages in-flight maximum</li>
            <li>Ensure total doesn't exceed available memory and processing capacity</li>
        </ul>
        <b>Tuning guidance</b>:
        <table style="margin-top: 10px; border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Scenario</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Recommended Prefetch</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Variable processing time (some messages slow, some fast)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">1-10 (ensures fair distribution)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Consistent fast processing (< 100ms per message)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">50-100 (maximize throughput)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">I/O-bound processing (API calls, database queries)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">20-50 (balance parallelism and memory)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Large messages (MB+ size)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">1-5 (limit memory consumption)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Critical ordering requirements</td>
                <td style="border: 1px solid #ddd; padding: 8px;">1 (with 1 consumer)</td>
            </tr>
        </table>
        <br>
        <b>Important</b>: This is a per-consumer setting. Each consumer gets this prefetch limit independently. For auto-ack mode (<code>rabbitmq.auto.ack.enabled=true</code>), prefetch still applies but has less impact since messages are immediately acknowledged upon delivery.
    </td>
    <td>No</td>
    <td>1</td>
</tr>
<tr>
    <td>rabbitmq.classic.override.requeue.with.discard</td>
    <td>Override Requeue Decision With Discard</td>
    <td>For Classic Queues: controls whether requeue attempts for failed messages are overridden and converted to discard/dead-letter operations instead.
        <br><br>
        <b>Behavior</b>:
        <ul>
            <li><b>false</b> (default): Normal requeue behavior - when a message is negatively acknowledged (nack) with requeue=true, it is returned to the queue for redelivery. The message can be reprocessed by the same or different consumer.</li>
            <li><b>true</b>: Override mode - any requeue attempt (nack with requeue=true) is converted to a discard operation. Instead of returning to the queue, the message is:
                <ul>
                    <li>Routed to the configured Dead Letter Exchange (if <code>rabbitmq.dead.letter.exchange.name</code> is set)</li>
                    <li>Discarded entirely if no DLX is configured</li>
                </ul>
                This effectively disables requeuing for the queue, forcing all failed messages to follow the dead letter path.
            </li>
        </ul>
        <b>Use cases for enabling (true)</b>:
        <ul>
            <li><b>Prevent infinite loops</b>: When messages consistently fail and requeuing causes endless retry cycles</li>
            <li><b>Poison message protection</b>: Immediately route problematic messages to DLQ for inspection rather than reprocessing</li>
            <li><b>Enforce dead letter workflow</b>: Ensure all failures go through the dead letter mechanism for consistent handling</li>
            <li><b>Debugging and monitoring</b>: Capture all failed messages in DLQ for analysis without reprocessing noise</li>
            <li><b>Complement to delivery limits</b>: Work with delivery limit settings to ensure messages don't cycle indefinitely</li>
        </ul>
        <b>Relationship with other settings</b>:
        <ul>
            <li>Works in conjunction with <code>rabbitmq.classic.dead.letter.strategy</code></li>
            <li>Requires <code>rabbitmq.dead.letter.exchange.name</code> to be configured for failed messages to be captured (otherwise they're lost)</li>
            <li>Interacts with <code>rabbitmq.message.requeue.delay</code> - when override is enabled, the delay is bypassed as messages aren't requeued</li>
            <li>Most useful with <code>NON_RETRYABLE_DISCARD</code> strategy for immediate failure handling</li>
        </ul>
        <b>Considerations</b>:
        <ul>
            <li><b>Message loss risk</b>: If DLX is not configured and this is true, all requeue attempts result in permanent message loss</li>
            <li><b>No retry opportunity</b>: Transient failures that might succeed on retry will instead be dead-lettered immediately</li>
            <li><b>Monitoring importance</b>: Essential to monitor DLQ when this is enabled, as all failures accumulate there</li>
        </ul>
        <b>Example scenarios</b>:
        <table style="margin-top: 10px; border-collapse: collapse; width: 100%;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Setting</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Message Processing Fails</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Consumer Action</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Result</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">false (default)</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Consumer nacks with requeue=true</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Request requeue</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Message requeued for retry</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">true</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Consumer nacks with requeue=true</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Request requeue</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Message discarded/dead-lettered (requeue overridden)</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">true or false</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Consumer nacks with requeue=false</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Request discard</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Message discarded/dead-lettered (same behavior)</td>
            </tr>
        </table>
        <br>
        <b>Important</b>: This setting only applies to CLASSIC queue types and is ignored for QUORUM and STREAM queues. Always configure a Dead Letter Exchange when enabling this to prevent message loss. This is a safety mechanism - use with caution and ensure DLQ monitoring is in place.
    </td>
    <td>No</td>
    <td>false</td>
</tr>
</table>