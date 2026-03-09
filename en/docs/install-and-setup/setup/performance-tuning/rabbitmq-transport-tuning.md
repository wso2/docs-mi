# Tuning the RabbitMQ Transport

See the following topics to tune the RabbitMQ transport:

## Increase the connection pool size

You can increase the connection pool size to improve the performance of the RabbitMQ sender. The default connection pool size is 100. To change this, specify a required value for the `connection_pool_size` parameter in the RabbitMQ transport sender configurations in the deployment.toml file (stored in the `MI_HOME/conf` directory).

!!! Note
    The default connection pool size is increased to 200 from WSO2 Integrator: MI 4.4.0.22 onwards.

```toml 
[[transport.rabbitmq.sender]]
name = "rabbitMQSender"
parameter.hostname = "localhost"
parameter.port = 5672
parameter.username = "guest"
parameter.password = "guest"
parameter.connection_pool_size = 250
```

## Increase the member count

If you set the following parameter to `false` in the deployment.toml file (stored in the `MI_HOME/conf` directory), it sets the configuration to handle the acknowledgement in the application level: 

```toml
[[transport.rabbitmq.listener]]
parameter.queue_auto_ack= false
```

Thus, it sends back the acknowledgement once it sends the request to the back-end. That is, it does not wait for the response. However, in a message store/processor implementation, it waits for the response to send the acknowledgment back to provide guaranteed message delivery. Therefore, there might be a delay in processing messages using message processors than using a message producer/consumer implementation.

However, you can increase performance of message processors either by increasing the member count or by having multiple message processors. If you increase the member count, it will create multiple child processors of the message processor.

## Disable queue and exchange declaration

Setting `rabbitmq.queue.autodeclare` and `rabbitmq.exchange.autodeclare` parameters in the publish URL to false can improve the RabbitMQ transport performance. When these parameters are set to `false`, RabbitMQ does not try to create queues or exchanges if queues or exchanges are not present. However, you should set these parameters if and only if queues and exchanges are declared prior on the broker.

## Reuse connection factory in publisher

In the publisher URL, set the connection factory name instead of the connection parameters as specified below in the `rabbitmq.connection.factory` parameter . This reuses the connection factories and thereby improves performance.

``` xml
<address uri="rabbitmq://?rabbitmq.connection.factory=RabbitMQConnectionFactory&amp;rabbitmq.queue.name=queue1&amp;rabbitmq.queue.routing.key=queue1&amp;rabbitmq.replyto.name=replyqueue&amp;rabbitmq.exchange.name=ex1&amp;rabbitmq.queue.autodeclare=false&amp;rabbitmq.exchange.autodeclare=false&amp;rabbitmq.replyto.name=response_queue"/>
```

## Tune RabbitMQ Connection Pool Parameters

Fine-tuning the connection pool parameters can help optimize resource usage and improve throughput for RabbitMQ transport. You can configure these parameters in the `deployment.toml` file under the sender configuration:

```toml
[[transport.rabbitmq.sender]]
parameter.connection_pool_size = 250
parameter.'rabbitmq.max.idle.per.key' = 100
parameter.'rabbitmq.max.wait.millis' = 10000
```

Starting from MI 4.4.0.22 , you can do the same configuration as follows. (With the additional parameter `exhaust_warn_interval` to control the interval of channel pool exhaustion logs).

```toml
[[transport.rabbitmq.sender]]
parameter.connection_pool_size = 250
parameter.max_idle_per_key = 100
parameter.borrow_max_wait_millis = 10000
parameter.exhaust_warn_interval = 60
```

**Parameter descriptions:**

- `parameter.connection_pool_size`: This parameter determines the connection pool size.
- `parameter.max_idle_per_key`: This parameter sets the maximum number of idle objects allowed in the pool per key (connection factory). If the number of idle objects for a key exceeds this limit (100 in this case), the excess objects are subject to eviction.
- `parameter.borrow_max_wait_millis`: This parameter determines the maximum amount of time (in milliseconds) that the borrowObject method will block when waiting for an object to become available, should the pool be exhausted. Here, it's set to 10,000 milliseconds (10 seconds).
- `parameter.exhaust_warn_interval` : Starting from MI 4.4.0.22 it logs RabbitMq connection pool exhaust warnings. This parameter specifies the interval (in seconds) at which warnings are logged. In this case, default value is 30 seconds.

The following table summarizes how the default RabbitMQ connection pool parameters have changed from MI 4.4.0.22 onwards:

| Parameter                   | MI 4.4.0      | MI 4.4.0.22 |
|-----------------------------|---------------|-------------|
| connection_pool_size        | 100           | 200         |
| max_idle_per_key            | 8             | 100         |
| borrow_max_wait_millis      | -1 (infinite) | 180000      |
| exhaust_warn_interval       | N/A           | 30          |

!!! Note
    `max_connections_per_key`: This parameter will be set to the same value as `max_idle_per_key`. Since keeping all allocated connections idle and reusable ensures that consumers and publishers can immediately reuse existing connections with minimal delay.

!!! Note
    When the RabbitMQ channel pool reaches 75% of the total capacity, the following warnings are logged in the log file.

    ```
    [2025-08-11 11:46:09,181]  WARN {RabbitMQChannelPool} - RabbitMQ channel pool for key AMQPConnectionFactory is nearing capacity. Currently at 6/8 channels. This message will not be repeated for 30 second(s)
    ```

    If the RabbitMQ channel pool is exhausted, the following warning is logged in the log file.

    ```
    [2025-08-11 11:50:24,390]  WARN {RabbitMQChannelPool} - RabbitMQ channel pool for key AMQPConnectionFactory is [EXHAUSTED]. This message will not be repeated for 30 second(s)
    ```

Adjust these parameters according to your deployment requirements to balance performance and resource consumption.

## Performance test results

All the testing was conducted in a c5.xlarge local environment with a 500 byte message using the default WSO2 Integrator:MI distribution.

### Fire and forget (out-only)

| Concurrent users            | Throughput (req/s)  |
|-----------------------------|---------------------|
| 10                          | 4401.8               |
| 50                          | 5328.9               |
| 100                         | 3360.2               |
| 200                         | 2840.1               |

### Dual channel scenario

| Concurrent users            | Throughput (req/s)  |
|-----------------------------|---------------------|
| 10                          | 603.4               |
| 50                          | 843.2               |
| 100                         | 885.3               |
| 200                         | 700.2               |
