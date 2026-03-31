# Azure Service Bus Connector Overview

[Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/) is a fully managed enterprise message broker that provides message queues and publish-subscribe topics. It supports reliable, asynchronous communication between distributed applications and services using the AMQP 1.0 protocol. Azure Service Bus handles messages that include data in common formats such as JSON, XML, and plain text, making it suitable for decoupling applications, load leveling, and ordered messaging scenarios.

The **WSO2 Azure Service Bus Connector** allows WSO2 Micro Integrator (MI) to seamlessly interact with Azure Service Bus. It supports managing Service Bus resources (queues, topics, subscriptions, and rules), sending messages (single, batch, and scheduled), and receiving messages with settlement operations (complete, abandon, defer, dead-letter).

## Features

- **Administration Operations**:
Manage queues, topics, subscriptions, and rules with full CRUD (create, get, update, delete, list, exists) operations.

- **Message Sending**:
Send single messages, batch messages, or schedule messages for future delivery.

- **Message Receiving**:
Receive single or batch messages, receive deferred messages, and retrieve message payloads.

- **Message Settlement**:
Complete, abandon, defer, or dead-letter received messages for flexible message processing.

- **Lock Management**:
Renew message locks to extend processing time in PEEK_LOCK mode.

- **AMQP Retry Configuration**:
Configure retry policies with exponential or fixed retry modes for reliable communication.

- **Multiple Receive Modes**:
Support for PEEK_LOCK (default) and RECEIVE_AND_DELETE receive modes.

Go to the <a target="_blank" href="https://store.wso2.com/connector/mi-connector-asb">WSO2 Connector Store</a> to download the Azure Service Bus connector.

<img src="{{base_path}}/assets/img/integrate/connectors/asb/asb-connector-store.png" title="Azure Service Bus Connector Store" width="200" alt="Azure Service Bus Connector Store"/>

## Compatibility

| Connector Version | Supported Product Versions |
|-------------------|----------------------------|
| 1.0.0             | MI 4.4.0+                  |

## Azure Service Bus Connector documentation

* **[Setting Up Azure Service Bus]({{base_path}}/reference/connectors/asb-connector/asb-connector-setup/)**: This documentation provides instructions on how to set up Azure Service Bus before using the connector.

* **[Azure Service Bus Connector Reference]({{base_path}}/reference/connectors/asb-connector/asb-connector-reference/)**: This documentation provides a reference guide for the Azure Service Bus Connector configurations.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Azure Service Bus Connector GitHub repository](https://github.com/wso2-extensions/mi-connector-asb)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
