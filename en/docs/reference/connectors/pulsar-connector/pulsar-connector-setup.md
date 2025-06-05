# 📝 Set Up Apache Pulsar

To connect with Apache Pulsar using the WSO2 Micro Integrator Apache Pulsar Connector, you need to first set up a running Pulsar instance locally or on a server. Follow the steps below to prepare the Pulsar environment:

---

### 1. Download and Extract Pulsar

- Download the latest Apache Pulsar release from the [official website](https://pulsar.apache.org/download/).
- Extract the archive to a preferred location on your machine.

---

### 2. Start the Pulsar Standalone Server

- Navigate to the extracted Pulsar directory.
- Start the standalone server using the following command:

  ```bash
  bin/pulsar standalone

!!!Note
- For setting up Pulsar in other environments such as Docker or Kubernetes, please refer to the [official Apache Pulsar documentation](https://pulsar.apache.org/docs/next/getting-started-home/).
- The recommended version of Java for Apache Pulsar is 21 or above.

## Setup Environment for Apache Pulsar Connector

1. To configure the Apache Pulsar connector with Apache Pulsar version 4.0.4, copy the following client libraries to the `<MI_HOME>/lib` directory.

  * [pulsar-client-4.0.4.wso2v1.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka_2.12/2.8.2)
  * [pulsar-client-original-4.0.4.jar](https://repo1.maven.org/maven2/org/apache/pulsar/pulsar-client-original/4.0.4/pulsar-client-original-4.0.4.jar)
  * [pulsar-common-4.0.4.jar](https://repo1.maven.org/maven2/org/apache/pulsar/pulsar-common/4.0.4/pulsar-common-4.0.4.jar)
  * [bookkeeper-common-allocator-4.16.6.jar](https://repo1.maven.org/maven2/org/apache/bookkeeper/bookkeeper-common-allocator/4.16.6/bookkeeper-common-allocator-4.16.6.jar)
  * [netty-codec-dns-4.1.119.Final.jar](https://repo1.maven.org/maven2/io/netty/netty-codec-dns/4.1.119.Final/netty-codec-dns-4.1.119.Final.jar)
  * [netty-resolver-dns-4.1.119.Final.jar](https://repo1.maven.org/maven2/io/netty/netty-resolver-dns/4.1.119.Final/netty-resolver-dns-4.1.119.Final.jar)
  * [netty-transport-classes-epoll-4.1.119.Final.jar](https://repo1.maven.org/maven2/io/netty/netty-transport-classes-epoll/4.1.119.Final/netty-transport-classes-epoll-4.1.119.Final.jar)
  * [netty-incubator-transport-classes-io_uring-0.0.26.Final.jar](https://repo1.maven.org/maven2/io/netty/incubator/netty-incubator-transport-classes-io_uring/0.0.26.Final/netty-incubator-transport-classes-io_uring-0.0.26.Final.jar)
