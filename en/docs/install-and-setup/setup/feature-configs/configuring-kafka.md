# Configuring Kafka

In order to use the Kafka inbound endpoint, you need to download and install [Apache Kafka](http://kafka.apache.org/downloads.html). The recommended version is `kafka_2.12-2.2.1`.

# Kafka Client Libraries

To configure the Kafka inbound endpoint, copy the client libraries from the `KAFKA_HOME/libs` directory to the `MI_HOME/lib` directory, or if you are using Micro Integrator for VS Code, copy the libraries to the `project_path/deployment/lib` directory.

<img width="200" src="{{base_path}}/assets/img/setup-and-install/kafka-vscode-libs.png">

      - kafka_2.12-2.2.1.jar     
      - metrics-core-2.2.0.jar    
      - zkclient-0.11.jar
      - kafka-clients-2.2.1.jar  
      - scala-library-2.12.8.jar  
      - zookeeper-3.4.13.jar
# Starting Kafka

To start the Kafka server:

-   Navigate to `<KAFKA_HOME>` and run the
    following command to start the ZooKeeper server:

    ```bash
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

-   Run the following command to start the Kafka server

    ```bash
    bin/kafka-server-start.sh config/server.properties
    ```

#  Detailed Kafka Configuration Examples

  Producer Example
  ```xml
<kafka:producer name="KafkaProducer"
                bootstrap.servers="localhost:9092"
                key.serializer="org.apache.kafka.common.serialization.StringSerializer"
                value.serializer="org.apache.kafka.common.serialization.StringSerializer"
                acks="all"
                retries="3"
                batch.size="16384"
                linger.ms="1">
</kafka:producer>
  ```
Consumer Example
```xml
<kafka:consumer name="KafkaConsumer"
                bootstrap.servers="localhost:9092"
                group.id="MIGroup"
                key.deserializer="org.apache.kafka.common.serialization.StringDeserializer"
                value.deserializer="org.apache.kafka.common.serialization.StringDeserializer"
                auto.offset.reset="earliest"
                enable.auto.commit="true">
</kafka:consumer>
  ```

# Best Practices

- Partitions: Use multiple partitions to improve throughput and parallelism.
- Compression: Enable message compression (compression.type="gzip") to reduce network usage.
- Consumer Groups: Use multiple consumers in a group to scale message consumption.
- Monitoring: Use Kafka metrics and logs to monitor producer/consumer health.
- Error Handling: Implement retries and dead-letter queues to handle failed messages gracefully.
