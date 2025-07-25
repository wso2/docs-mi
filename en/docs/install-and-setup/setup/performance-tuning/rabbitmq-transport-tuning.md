# Tuning the RabbitMQ Transport

See the following topics to tune the RabbitMQ transport:

## Increase the connection pool size

You can increase the connection pool size to improve the performance of the RabbitMQ sender. The default connection pool size is 20. To change this, specify a required value for the `connection_pool_size` parameter in the RabbitMQ transport sender configurations in the deployment.toml file (stored in the `MI_HOME/conf` directory).
 
```toml 
[[transport.rabbitmq.sender]]
name = "rabbitMQSender"
parameter.connection_factory = "RabbitMQConnectionFactory"
parameter.hostname = "localhost"
parameter.port = 5672
parameter.username = "guest"
parameter.password = "guest"
parameter.retry_interval = "10s"
parameter.retry_count = 5
parameter.connection_pool_size = 25
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
name = "AMQPConnectionFactorySender2"
parameter.hostname = "localhost"
parameter.port = 5672
parameter.username = "guest" 
parameter.password = "guest" 
parameter.minimum_evictable_idle_time = 30000
parameter.time_between_eviction_runs = 10000
parameter.borrow_max_wait_millis = 10000
parameter.max_idle_per_key = 20
parameter.connection_pool_size = 200
```

**Parameter descriptions:**

- `parameter.minimum_evictable_idle_time`: This parameter sets the minimum amount of time (in milliseconds) that an object may remain idle in the pool before it becomes eligible for eviction. Here, objects idle for 30,000 milliseconds (30 seconds) or more can be evicted.
- `parameter.time_between_eviction_runs`: This parameter specifies the time interval (in milliseconds) between each run of the eviction process. In this case, the eviction process will run every 10,000 milliseconds (10 seconds), checking for and potentially evicting idle objects.
- `parameter.connection_pool_size`: This parameter refers to the maximum total number of active (borrowed and idle) connections that the pool can manage. Here, the pool can handle a total of 200 connections.
- `parameter.borrow_max_wait_millis`: This parameter determines the maximum amount of time (in milliseconds) that the borrowObject method will block when waiting for an object to become available, should the pool be exhausted. Here, it's set to 10,000 milliseconds (10 seconds).
- `parameter.max_idle_per_key`: This parameter sets the maximum number of idle objects allowed in the pool per key. If the number of idle objects for a key exceeds this limit (20 in this case), the excess objects are subject to eviction. 

!!! Note 
    `max_connections_per_key`: This parameter will be set to the same value as `max_idle_per_key`. Since keeping all allocated connections idle and reusable ensures that consumers and publishers can immediately reuse existing connections with minimal delay.

Adjust these parameters according to your deployment requirements to balance performance and resource consumption.
