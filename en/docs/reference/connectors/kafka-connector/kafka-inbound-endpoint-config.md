# Kafka Inbound Endpoint Reference

## Mandatory parameters

The following parameters are required when configuring Kafka Inbound Endpoint.

<table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><code>bootstrap.servers</code></td>
            <td>The Kafka brokers listed as <code>host1:port1</code> and <code>host2:port2</code></td>
        </tr>
        <tr>
            <td><code>key.deserializer</code></td>
            <td>Deserializer class for key that implements the <code>org.apache.kafka.common.serialization.Deserializer</code> interface.</td>
        </tr>
        <tr>
            <td><code>value.deserializer</code></td>
            <td>Deserializer class for value that implements the <code>org.apache.kafka.common.serialization.Deserializer</code> interface.</td>
        </tr>
        <tr>
            <td><code>group.id</code></td>
            <td>The consumer group ID.</td>
        </tr>
        <tr>
            <td><code>poll.timeout</code></td>
            <td>The max time to block in the consumer waiting for records.</td>
        </tr>
        <tr>
            <td><code>topic.name</code></td>
            <td>The name of the topic.</td>
        </tr>
        <tr>
            <td><code>contentType</code></td>
            <td>The content type of the message.</td>
        </tr>
</table>

## Optional parameters

<table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
        <tr>
            <td><code>topic.pattern</code></td>
            <td>The name pattern of the topic.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>topic.partitions</code></td>
            <td>A comma-separated list of partitions for the topic to which the consumer is subscribed.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>enable.auto.commit</code></td>
            <td>Whether the consumer will automatically commit offsets periodically at the interval set by <code>auto.commit.interval.ms</code>.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>auto.commit.interval.ms</code></td>
            <td>Offsets are committed automatically with a frequency controlled by the config.</td>
            <td><code>5000</code></td>
        </tr>
        <tr>
            <td><code>failure.retry.count</code></td>
            <td>The offset set to the same record until the failure retry count exceeds.</td>
            <td><code>-1</code></td>
        </tr>
        <tr>
            <td><code>session.timeout.ms</code></td>
            <td>The timeout used to detect client failures when using Kafka’s group management facility.</td>
            <td><code>10000</code></td>
        </tr>
        <tr>
            <td><code>fetch.min.bytes</code></td>
            <td>The minimum amount of data the server should return for a fetch request.</td>
            <td><code>1</code></td>
        </tr>
        <tr>
            <td><code>heartbeat.interval.ms</code></td>
            <td>The expected time between heartbeats to the consumer coordinator when using Kafka’s group management facilities.</td>
            <td><code>3000</code></td>
        </tr>
        <tr>
            <td><code>max.partition.fetch.bytes</code></td>
            <td>The maximum amount of data per-partition the server will return. Records are fetched in batches by the consumer.</td>
            <td><code>1048576</code></td>
        </tr>
        <tr>
            <td><code>key.delegate.deserializer</code></td>
            <td>Property name for the delegate key deserializer.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>value.delegate.deserializer</code></td>
            <td>Property name for the delegate value deserializer.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>schema.registry.url</code></td>
            <td>Comma-separated list of URLs for Schema Registry instances that can be used to register or look up schemas.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>basic.auth.credentials.source</code></td>
            <td>Specify how to pick the credentials for the Basic authentication header.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>basic.auth.user.info</code></td>
            <td>Specify the user info for the Basic authentication in the form of <code>{username}:{password}</code>.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.key.password</code></td>
            <td>The password of the private key in the key store file or the PEM key specified in <code>ssl.keystore.key</code>.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.keystore.location</code></td>
            <td>The location of the key store file. This is optional for client and can be used for two-way authentication for client.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.keystore.password</code></td>
            <td>The store password for the key store file. This is optional for client and only needed if <code>ssl.keystore.location</code> is configured.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.truststore.location</code></td>
            <td>The location of the trust store file.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.truststore.password</code></td>
            <td>The password for the trust store file.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>auto.offset.reset</code></td>
            <td>Defines what to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server.</td>
            <td><code>latest</code></td>
        </tr>
        <tr>
            <td><code>connections.max.idle.ms</code></td>
            <td>Close idle connections after the number of milliseconds specified by this config.</td>
            <td><code>540000</code></td>
        </tr>
        <tr>
            <td><code>exclude.internal.topics</code></td>
            <td>Whether internal topics matching a subscribed pattern should be excluded from the subscription.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>fetch.max.bytes</code></td>
            <td>The maximum amount of data the server should return for a fetch request.</td>
            <td><code>52428800</code></td>
        </tr>
        <tr>
            <td><code>max.poll.interval.ms</code></td>
            <td>The maximum delay between invocations of <code>poll()</code> when using consumer group management.</td>
            <td><code>300000</code></td>
        </tr>
        <tr>
            <td><code>max.poll.records</code></td>
            <td>The maximum number of records returned in a single call to <code>poll()</code>.</td>
            <td><code>500</code></td>
        </tr>
        <tr>
            <td><code>partition.assignment.strategy</code></td>
            <td>A list of class names or class types, ordered by preference, of supported partition assignment strategies that the client will use to distribute partition ownership amongst consumer instances when group management is used.</td>
            <td><code>org.apache.kafka.clients.consumer.RangeAssignor</code></td>
        </tr>
        <tr>
            <td><code>receive.buffer.bytes</code></td>
            <td>The size of the TCP receive buffer (SO_RCVBUF) to use when reading data.</td>
            <td><code>65536</code></td>
        </tr>
        <tr>
            <td><code>request.timeout.ms</code></td>
            <td>The configuration controls the maximum amount of time the client will wait for the response of a request.</td>
            <td><code>305000</code></td>
        </tr>
        <tr>
            <td><code>sasl.jaas.config</code></td>
            <td>JAAS login context parameters for SASL connections in the format used by JAAS configuration files.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.client.callback.handler.class</code></td>
            <td>The fully qualified name of a SASL client callback handler class that implements the <code>AuthenticateCallbackHandler</code> interface.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.login.class</code></td>
            <td>The fully qualified name of a class that implements the Login interface.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.kerberos.service.name</code></td>
            <td>The Kerberos principal name that Kafka runs as.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.mechanism</code></td>
            <td>SASL mechanism used for client connections.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>security.protocol</code></td>
            <td>Protocol used to communicate with brokers.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>send.buffer.bytes</code></td>
            <td>The size of the TCP send buffer (SO_SNDBUF) to use when sending data.</td>
            <td><code>131072</code></td>
        </tr>
        <tr>
            <td><code>ssl.enabled.protocols</code></td>
            <td>The list of protocols enabled for SSL connections.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.keystore.type</code></td>
            <td>The file format of the key store file.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.protocol</code></td>
            <td>The SSL protocol used to generate the SSLContext.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.provider</code></td>
            <td>The name of the security provider used for SSL connections.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.truststore.type</code></td>
            <td>The file format of the trust store file.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>check.crcs</code></td>
            <td>Automatically check the CRC32 of the records consumed. This ensures no on-the-wire or on-disk corruption to the messages occurred.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>client.id</code></td>
            <td>An id string to pass to the server when making requests.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>fetch.max.wait.ms</code></td>
            <td>The maximum amount of time the server will block before answering the fetch request if there isn’t sufficient data to immediately satisfy the requirement given by fetch.min.bytes.</td>
            <td>500</code></td>
        </tr>
        <tr>
            <td><code>interceptor.classes</code></td>
            <td>A list of classes to use as interceptors.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>metadata.max.age.ms</code></td>
            <td>The period of time in milliseconds after which we force a refresh of metadata even if we haven’t seen any partition leadership changes to proactively discover any new brokers or partitions.</td>
            <td><code>300000</code></td>
        </tr>
        <tr>
            <td><code>metric.reporters</code></td>
            <td>A list of classes to use as metrics reporters.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>metrics.num.samples</code></td>
            <td>The number of samples maintained to compute metrics.</td>
            <td><code>2</code></td>
        </tr>
        <tr>
            <td><code>metrics.recording.level</code></td>
            <td>The highest recording level for metrics.</td>
            <td><code>INFO</code></td>
        </tr>
        <tr>
            <td><code>metrics.sample.window.ms</code></td>
            <td>The window of time a metrics sample is computed over.</td>
            <td><code>30000</code></td>
        </tr>
        <tr>
            <td><code>reconnect.backoff.ms</code></td>
            <td>The base amount of time to wait before attempting to reconnect to a given host.</td>
            <td><code>50</code></td>
        </tr>
        <tr>
            <td><code>retry.backoff.ms</code></td>
            <td>The amount of time to wait before attempting to retry a failed request to a given topic partition.</td>
            <td><code>100</code></td>
        </tr>
        <tr>
            <td><code>sasl.kerberos.kinit.cmd</code></td>
            <td>Kerberos kinit command path.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.kerberos.min.time.before.relogin</code></td>
            <td>Login thread sleep time between refresh attempts.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.kerberos.ticket.renew.jitter</code></td>
            <td>Percentage of random jitter added to the renewal time.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.kerberos.ticket.renew.window.factor</code></td>
            <td>Login thread will sleep until the specified window factor of time from last refresh to ticket’s expiry has been reached, at which time it will try to renew the ticket.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.cipher.suites</code></td>
            <td>A list of cipher suites.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.endpoint.identification.algorithm</code></td>
            <td>The endpoint identification algorithm to validate server hostname using server certificate.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.keymanager.algorithm</code></td>
            <td>The algorithm used by key manager factory for SSL connections.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.secure.random.implementation</code></td>
            <td>The SecureRandom PRNG implementation to use for SSL cryptography operations.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>ssl.trustmanager.algorithm</code></td>
            <td>The algorithm used by trust manager factory for SSL connections.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.oauthbearer.token.endpoint.url</code></td>
            <td>The URL for the OAuth/OIDC identity provider.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.oauthbearer.scope.claim.name</code></td>
            <td>The OAuth claim for the scope is often named “scope”, but this (optional) setting can provide a different name to use for the scope included in the JWT payload’s claims if the OAuth/OIDC provider uses a different name for that claim.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.login.callback.handler.class</code></td>
            <td>The fully qualified name of a SASL login callback handler class that implements the AuthenticateCallbackHandler interface.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.login.connect.timeout.ms</code></td>
            <td>The (optional) value in milliseconds for the external authentication provider connection timeout.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.login.read.timeout.ms</code></td>
            <td>The (optional) value in milliseconds for the external authentication provider read timeout.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.login.retry.backoff.ms</code></td>
            <td>The (optional) value in milliseconds for the initial wait between login attempts to the external authentication provider.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>sasl.login.retry.backoff.max.ms</code></td>
            <td>The (optional) value in milliseconds for the maximum wait between login attempts to the external authentication provider.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>kafka.header.prefix</code></td>
            <td>The prefix for Kafka headers.</td>
            <td></td>
        </tr>
        <tr>
            <td><code>avro.use.logical.type.converters</code></td>
            <td>Whether to enable the use of logical type converters in Avro. This parameter is available only with Kafka Inbound Endpoint v1.2.2 and above.</td>
            <td><code>False</code></td>
        </tr>
</table>

---

## Manual offset control

Manual offset committing gives you explicit control over when Kafka offsets are committed, ensuring that messages are acknowledged only after successful processing. Follow the steps below to configure manual offset commit behavior in WSO2 Kafka Inbound Endpoint.


### Step 1: Disable auto commit

Disabling auto commit ensures that the WSO2 Kafka Inbound Endpoint does not commit the Kafka offset automatically, allowing your mediation logic to determine when an offset should be committed.

To disable auto commit, set the following parameter in your Kafka inbound endpoint configuration:

```xml
<parameter name="enable.auto.commit">false</parameter>
```

### Step 2: Use `SET_ROLLBACK_ONLY` to prevent commit on failure

Add the following property to your **onError sequence** to signal the Inbound Endpoint not to commit the current offset if message processing fails. This will cause the same message to be re-polled in the next cycle.


```xml
<property name="SET_ROLLBACK_ONLY" value="true" scope="default" type="STRING"></property>
```

### Step 3: Configure Retry Behavior using `failure.retry.count` (Optional)

Add this parameter to the inbound endpoint to control the retry behavior:

```xml
<parameter name="failure.retry.count">N</parameter>
```

- `N` is the number of retry attempts for a failed message.
- If not set or set to `-1` (default), the same message will be retried **indefinitely**.
- If the retry count is exceeded, the offset will move to the next record, and the failed message will be discarded.


!!! Note
    Manual offset committing is **reliable only when used with sequential and synchronous mediation flows**.
    
    **Why?**<br>
    
    - In parallel processing mode in the current connector architecture, the actual result of message processing may be ignored, and offsets may get committed under the assumption that the processing was successful. This may lead to message loss, especially if some records fail during message processing<br>
    - Additionally, asynchronous mediation flows (e.g., using `non-blocking Call mediator`, using `Clone` and `Iterate` mediators with `sequential` mode disabled, or `Scatter-Gather` and `Foreach` mediators with `parallelExecution` mode enabled) can cause offsets to be committed before message processing completes, which may lead to unprocessed messages being skipped.


    **Recommendation**

    To ensure reliable manual offset committing:
    
    - Use **sequential processing** with **synchronous flows** wherever possible.
    - For throughput and scalability:
        - Configure your Kafka topic with **multiple partitions**.
        - Run **multiple Kafka Inbound Endpoints** (within the same consumer group) to read from different partitions concurrently.
