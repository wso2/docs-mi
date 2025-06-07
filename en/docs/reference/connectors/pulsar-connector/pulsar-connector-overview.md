# Apache Pulsar Connector Overview

[Apache Pulsar](https://pulsar.apache.org/docs/) is a distributed, cloud-native messaging and streaming platform that supports both publish-subscribe and message queueing models. In Pulsar, producers send messages to topics, which can be consumed by one or more consumers.

The Apache Pulsar connector focuses on **publishing messages** to Pulsar topics. It enables RESTful communication with the Pulsar broker, allowing external systems to send messages over HTTP/HTTPS without needing native Pulsar client integrations.

## Features

- **Topic-Based Architecture**  
  Messages are published to specified Pulsar topics, including partitioned topics for scalability.

- **Secure Communication**  
  Supports **TLS encryption** to ensure data confidentiality and integrity during transmission.

- **Authentication**  
  Supports **JWT-based authentication** to restrict access to authorized clients only.

This setup is ideal for scenarios where services need to push data into Apache Pulsar securely and efficiently via simple HTTP/HTTPS calls.

Go to the <a target="_blank" href="https://store.wso2.com/connector/mi-connector-pulsar">WSO2 Connector Store</a> to download the Apache Pulsar connector.

<img src="{{base_path}}/assets/img/integrate/connectors/pulsar/Apache-Pulsar-Connector-02.png" title="Apache Pulsar Connector Store" width="200" alt="Apache Pulsar Connector Store"/>

## Compatibility

| Connector Version | Supported Product Versions |
|-------------------|----------------------------|
| 0.9.3             | MI 4.4.0                   |

## Apache Pulsar Connector documentation

* **[Apache Pulsar Connector Example]({{base_path}}/reference/connectors/pulsar-connector/pulsar-connector-example/)**: This example explains how to use the Apache Pulsar Connector to publish messages to topics.

* **[Apache Pulsar Connector Reference]({{base_path}}/reference/connectors/pulsar-connector/pulsar-connector-reference/)**: This documentation provides a reference guide for the Apache Pulsar Connector configurations.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Apache Pulsar Connector GitHub repository](https://github.com/wso2-extensions/mi-connector-pulsar)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
