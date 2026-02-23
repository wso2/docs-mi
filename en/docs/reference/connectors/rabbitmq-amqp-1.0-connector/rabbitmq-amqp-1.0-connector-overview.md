# RabbitMQ (AMQP 1.0) Connector Overview

[RabbitMQ](https://www.rabbitmq.com/) is a widely used open-source message broker that enables applications to communicate asynchronously by sending and receiving messages through queues. It decouples producers and consumers, improves reliability, and supports multiple messaging protocols, making it suitable for distributed and microservices-based systems.
From RabbitMQ 4.0 onward, AMQP 1.0 is supported natively. In RabbitMQ 3.x, AMQP 1.0 support is provided through plugins. This enables RabbitMQ to serve as a robust, standards-based messaging backbone for enterprise and cloud-native applications.

[AMQP 1.0](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-overview-v1.0-os.html) (Advanced Message Queuing Protocol) is an open, internet-standard protocol for business messaging. It defines a binary, wire-level protocol that ensures reliable and interoperable message exchange between two parties, regardless of the underlying platform or programming language.

AMQP 1.0 follows a layered architecture, and its specification is organized into several parts:

- Part 1 – Type System and Encoding: Defines the data types and how they are encoded on the wire.
- Part 2 – Transport Layer: Specifies an efficient, binary, peer-to-peer protocol for transferring messages between processes over a network.
- Part 3 – Message Format: Defines the structure and concrete encoding of AMQP messages.
- Part 4 – Transactions: Describes how messaging interactions can be grouped into atomic transactions.
- Part 5 – Security: Defines security layers such as authentication and encryption.

The **WSO2 RabbitMQ connector** allows WSO2 Micro Integrator: MI to seamlessly interact with RabbitMQ message brokers. It supports reliable, asynchronous communication by enabling message publishing to queues or exchanges, implementing Remote Procedure Call (RPC) patterns, and managing message acknowledgments through accept, discard, or requeue operations. Additionally, it allows external systems to send messages over HTTP/HTTPS without requiring native RabbitMQ client integrations.

## Features

- **Message Publishing**:  
Send messages to RabbitMQ queues or exchanges.

- **RPC Support**:  
Implement request-response patterns using RabbitMQ.

- **Message Acknowledgment**:  
Accept, discard, or requeue messages.

- **SSL/TLS Support**:  
Ensure secure communication with RabbitMQ brokers.

- **Failover Support**:  
Enable automatic reconnection and retry mechanisms.

- **Authentication**:  
Supports JWT-based authentication, certificate-based authentication, and basic authentication to restrict access to authorized clients only.

This setup is ideal for scenarios where services need to push data into RabbitMQ securely and efficiently via simple HTTP/HTTPS calls.

Go to the <a target="_blank" href="https://store.wso2.com/connector/mi-connector-rabbitmq">WSO2 Connector Store</a> to download the RabbitMQ connector.

<img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/rabbitmq-connector.png" title="RabbitMQ Connector Store" width="200" alt="RabbitMQ Connector Store"/>

## Compatibility

| Connector Version | Supported Product Versions |
|-------------------|----------------------------|
| 1.0.1             | MI 4.6.0+                  |

## RabbitMQ Connector documentation

* **[RabbitMQ (AMQP 1.0) Connector Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-example/)**: This example explains how to use the RabbitMQ Connector to publish messages to queue.

* **[RabbitMQ (AMQP 1.0) Connector Reference]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-reference/)**: This documentation provides a reference guide for the RabbitMQ Connector configurations.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [RabbitMQ (AMQP 1.0) Connector GitHub repository](https://github.com/wso2-extensions/mi-connector-rabbitmq)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
