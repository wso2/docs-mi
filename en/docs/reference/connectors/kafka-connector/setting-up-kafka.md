# Set up Kafka

## For Kafka inbound endpoint

To configure the Kafka inbound endpoint, copy the following orbit bundles to the `<MI_HOME>/dropins` directory.

* [kafka-avro-serializer](https://mvnrepository.com/artifact/org.wso2.orbit.io.confluent/kafka-avro-serializer/7.6.0.wso2v1)
* [kafka-schema-serializer](https://mvnrepository.com/artifact/org.wso2.orbit.io.confluent/kafka-schema-serializer/7.6.0.wso2v1)
* [kafka-schema-registry-client](https://mvnrepository.com/artifact/org.wso2.orbit.io.confluent/kafka-schema-registry-client/7.6.0.wso2v1)

Copy the following additional client libraries to the `<MI_HOME>/lib` directory.

* [kafka-clients-3.7.0.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients/3.7.0)
* [avro-1.11.3.jar](https://mvnrepository.com/artifact/org.apache.avro/avro/1.11.3)

!!!Note
    If you are also using the Kafka connector, copy the necessary dependencies as outlined in the following section.

## For connector version 3.2.0 and later

To use the Kafka connector, download and install [Apache Kafka](http://kafka.apache.org/downloads.html). Before you start configuring Kafka you also need the integration runtime and we refer to that location as `<PRODUCT_HOME>`.

!!!Note
    - The Kafka connector has been tested with the Kafka versions listed below.
    - To access all downloadable versions of Kafka, see the [Kafka documentation](https://kafka.apache.org/downloads).
    - The recommended version of Java is 11.

### Kafka version 2.8.2

1. To configure the Kafka connector with Kafka version 2.8.2, copy the following client libraries from the `<KAFKA_HOME>/lib` directory to the `<MI_HOME>/lib` directory.

    * [kafka_2.12-2.8.2.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka_2.12/2.8.2)
    * [kafka-clients-2.8.2.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients/2.8.2)
    * [metrics-core-2.2.0.jar](https://mvnrepository.com/artifact/com.yammer.metrics/metrics-core/2.2.0)
    * [scala-library-2.12.13jar](https://mvnrepository.com/artifact/org.scala-lang/scala-library/2.12.13)
    * [zkclient-0.10.jar](https://mvnrepository.com/artifact/com.101tec/zkclient/0.10)
    * [zookeeper-3.5.9.jar](https://mvnrepository.com/artifact/org.apache.zookeeper/zookeeper/3.5.9)

2. Copy the following additional client libraries to the `<MI_HOME>/lib` directory (can be copied from the Confluent platform):

    * [avro-1.11.3.jar](https://mvnrepository.com/artifact/org.apache.avro/avro/1.11.3)
    * [common-config-5.4.0.jar](https://mvnrepository.com/artifact/io.confluent/common-config/5.4.0)
    * [common-utils-5.4.0.jar](https://mvnrepository.com/artifact/io.confluent/common-utils/5.4.0)
    * [kafka-avro-serializer-5.3.0.jar](https://mvnrepository.com/artifact/io.confluent/kafka-avro-serializer/5.3.0)
    * [kafka-schema-registry-client-5.3.0.jar](https://mvnrepository.com/artifact/io.confluent/kafka-schema-registry-client/5.3.0)

### Kafka version 3.7.0

1. To configure the Kafka connector with Kafka version 3.7.0, copy the following orbit bundles to the `<MI_HOME>/dropins` directory.

    * [kafka-avro-serializer](https://mvnrepository.com/artifact/org.wso2.orbit.io.confluent/kafka-avro-serializer/7.6.0.wso2v1)
    * [kafka-schema-serializer](https://mvnrepository.com/artifact/org.wso2.orbit.io.confluent/kafka-schema-serializer/7.6.0.wso2v1)
    * [kafka-schema-registry-client](https://mvnrepository.com/artifact/org.wso2.orbit.io.confluent/kafka-schema-registry-client/7.6.0.wso2v1)

2. Copy the following client libraries from the `<KAFKA_HOME>/lib` directory to the `<MI_HOME>/lib` directory.

    * [kafka_2.13-3.7.0.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka_2.13/3.7.0)
    * [kafka-clients-3.7.0.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients/3.7.0)
    * [metrics-core-2.2.0.jar](https://mvnrepository.com/artifact/com.yammer.metrics/metrics-core/2.2.0)
    * [scala-library-2.13.2jar](https://mvnrepository.com/artifact/org.scala-lang/scala-library/2.13.2)
    * [zkclient-0.10.jar](https://mvnrepository.com/artifact/com.101tec/zkclient/0.10)
    * [zookeeper-3.8.3.jar](https://mvnrepository.com/artifact/org.apache.zookeeper/zookeeper/3.8.3)

3. Copy the following additional client libraries to the `<MI_HOME>/lib` directory (can be copied from the Confluent platform):

    * [avro-1.11.3.jar](https://mvnrepository.com/artifact/org.apache.avro/avro/1.11.3)
    * [common-config-7.6.0.jar](https://mvnrepository.com/artifact/io.confluent/common-config/7.6.0)
    * [common-utils-7.6.0.jar](https://mvnrepository.com/artifact/io.confluent/common-utils/7.6.0)

4. Navigate to `<KAFKA_HOME>` and run the following command to start the ZooKeeper server:

    ```bash
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

5. From the `<KAFKA_HOME>` directory, run the following command to start the Kafka server:

    ```bash
    bin/kafka-server-start.sh config/server.properties
    ```

Now that you have connected to Kafka, you can start publishing and consuming messages using the Kafka brokers. For more information, see [Publishing Messages using Kafka]({{base_path}}/reference/connectors/kafka-connector/kafka-connector-producer-example/) and [Consuming Messages using Kafka]({{base_path}}/reference/connectors/kafka-connector/kafka-inbound-endpoint-example/).

## For connector version 3.1.x and below

To use the Kafka connector, download and install [Apache Kafka](http://kafka.apache.org/downloads.html). Before you start configuring the Kafka you also need the integration runtime and we refer to that location as `<PRODUCT_HOME>`.

!!!Note
    - The recommended version of Kafka is Kafka_2.11-2.2.1.
    - To access all downloadable versions of Kafka, see the [Kafka documentation](https://kafka.apache.org/downloads).
    - The recommended version of Java is 1.8.

1. To configure the Kafka connector, copy the following client libraries from the `<KAFKA_HOME>/lib` directory to the `<MI_HOME>/lib` directory.

    * [kafka_2.11-2.2.1.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka_2.11/2.2.1)
    * [kafka-clients-1.0.0.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients/1.0.0)
    * [metrics-core-2.2.0.jar](https://mvnrepository.com/artifact/com.yammer.metrics/metrics-core/2.2.0)
    * [scala-library-2.12.3.jar](https://mvnrepository.com/artifact/org.scala-lang/scala-library/2.12.3)
    * [zkclient-0.10.jar](https://mvnrepository.com/artifact/com.101tec/zkclient/0.10)
    * [zookeeper-3.4.10.jar](https://mvnrepository.com/artifact/org.apache.zookeeper/zookeeper/3.4.10)

2. Copy the following additional client libraries to the `<MI_HOME>/lib` directory (can be copied from the Confluent platform):

    * [avro-1.8.1.jar](https://mvnrepository.com/artifact/org.apache.avro/avro/1.8.1)
    * [common-config-5.4.0.jar](https://mvnrepository.com/artifact/io.confluent/common-config/5.4.0)
    * [common-utils-5.4.0.jar](https://mvnrepository.com/artifact/io.confluent/common-utils/5.4.0)
    * [kafka-avro-serializer-5.3.0.jar](https://mvnrepository.com/artifact/io.confluent/kafka-avro-serializer/5.3.0)
    * [kafka-schema-registry-client-5.3.0.jar](https://mvnrepository.com/artifact/io.confluent/kafka-schema-registry-client/5.3.0)

3. Navigate to `<KAFKA_HOME>` and run the following command to start the ZooKeeper server:

    ```bash
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

4. From the `<KAFKA_HOME>` directory, run the following command to start the Kafka server:

    ```bash
    bin/kafka-server-start.sh config/server.properties
    ```

Now that you have connected to Kafka, you can start publishing and consuming messages using the Kafka brokers. For more information, see [Publishing Messages using Kafka]({{base_path}}/reference/connectors/kafka-connector/kafka-connector-producer-example/) and [Consuming Messages using Kafka]({{base_path}}/reference/connectors/kafka-connector/kafka-inbound-endpoint-example/).
