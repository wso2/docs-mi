# Key Concepts

WSO2 Micro Integrator is a comprehensive integration solution that streamlines the process of digital transformation. It provides a robust, configuration-based approach, enabling developers to create integration solutions visually through a user-friendly, low-code graphical design interface. The following diagram illustrates key components of WSO2 micro integrator.

![Key Concepts]({{base_path}}/assets/img/integrate/key-concepts/key-concepts-overall.png)

## Micro Integrator Runtime

Listed below are the key concepts of the WSO2 Micro Integrator runtime.

![Key Concepts]({{base_path}}/assets/img/integrate/key-concepts/key-concepts.png)

### Message entry points

Message entry points are the entities that a message can enter into the Micro Integrator mediation flow.

#### APIs

An API in WSO2 Micro Integrator is a key component for exposing integration services. Each API is anchored at a user-defined URL context and will only process requests that fall under the given URL context. An API is made of one or more resources, which are logical components of an API that can be accessed by making a particular type of HTTP call.

See the [REST APIs]({{base_path}}/reference/synapse-properties/rest-api-properties) documentation for more information.

#### Proxy Services

A Proxy service is a virtual service that receives messages and optionally processes them before forwarding them to a service at a given endpoint. This approach allows you to perform the necessary message transformations and introduce additional functionality to your services without changing your actual services. Unlike in [APIs](#apis), here, the protocol does not always need to be HTTP/S. Proxy Services support other well-known protocols such as JMS, FTP, FIX, and HL7.

See the [Proxy Services]({{base_path}}/reference/synapse-properties/proxy-service-properties) documentation for more information.

#### Inbound Endpoints

In [APIs](#apis) and [proxy services](#proxy-services) some parts of the configuration are global to a particular instance. For example, the HTTP port needs to be common for all the APIs. The Inbound Endpoints do not contain such global configurations. That gives extra flexibility in configuring the Inbound Endpoints compared to the other two message entry points.

See the [Inbound Endpoints]({{base_path}}/reference/synapse-properties/inbound-endpoints/about-inbound-endpoints) documentation for more information.

---

### Message processing units

#### Mediators

Mediators are individual processing units that perform a specific function on messages that pass through the Micro Integrator. The mediator takes the message received by the [message entry points](#message-entry-points), carries out some predefined actions on it (such as transforming, enriching, filtering), and modifies the message.

See the [Mediators]({{base_path}}/reference/mediators/about-mediators) documentation for more information.

#### Sequences

A sequence is a set of [mediators](#mediators) organized into a logical flow, allowing you to implement [pipes and filter patterns]({{base_path}}/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters). The mediators in the sequence will perform the necessary message processing and route the message to the required destination.

See the [Sequences]({{base_path}}/reference/mediation-sequences) documentation for more information.

#### Message Stores and Processors

A Message Store is used to temporarily store messages before they are delivered to their destination. This approach is useful for several scenarios.

1. Serving traffic to back-end services that can only accept messages at a given rate, whereas incoming traffic arrives at different rates. This use case is called request rate matching.
2. If the back-end service is not available at a particular moment, the message can be kept safely inside the message store until the back-end service becomes available. This use case is called guaranteed delivery. 

The task of the Message Processor is to pick the messages stored in the message store and deliver them to the destination.

See the [Message Stores and Processors]({{base_path}}/reference/synapse-properties/about-message-stores-processors) documentation for more information.

#### Templates

A Template is a reusable configuration that helps streamline and simplify the creation and management of [sequences](#sequences) and [endpoints](#endpoints). Templates allow developers to abstract common logic and reuse it across multiple services, reducing redundancy and ensuring consistency in configurations.

See the [Templates]({{base_path}}/reference/synapse-properties/template-properties) documentation for more information.

---

### Message exit points

#### Endpoints

An endpoint defines an external destination for a message. It could represent an HTTP URL, a mailbox, a JMS queue, a TCP socket, and other connection types, along with the settings needed for the connection.

See the [Endpoints]({{base_path}}/reference/synapse-properties/endpoint-properties) documentation for more information.

#### Connectors

A Connector allows your mediation flows to connect and interact with external services such as Twitter and Salesforce. Typically, connectors are used to wrap the API or the SDK of an external service. Each connector provides operations that perform different actions in that service. For example, the Twitter connector has operations for creating a tweet, getting a user's followers, and more.

To download a required connector, go to the [WSO2 Connector Store](https://store.wso2.com/store).

See the [Connectors]({{base_path}}/reference/connectors/connectors-overview) documentation for more information.

---

### Other concepts

#### Data Services

A Data service allows users to expose data from various data sources such as databases, spreadsheets, and CSV files through services, enabling easy access to this data over HTTP. WSO2 MI simplifies the process of interacting with databases by abstracting the data access logic and offering a way to expose data as services, such as RESTful or SOAP APIs, without requiring developers to write complex code.

See the [Data Services]({{base_path}}/reference/synapse-properties/data-services) documentation for more information.

#### Scheduled Tasks

Executing an integration process at a specified time is a common requirement in enterprise integration. For example, in an organization, there can be a need to run an integration process to synchronize two systems every day at the end of the day. In the Micro Integrator, the execution of a message mediation process can be automated to run periodically by using a scheduled task. Furthermore, you can use cron expressions for more advanced scheduling configurations.

See the [Scheduled Tasks]({{base_path}}/reference/synapse-properties/scheduled-task-properties) documentation for more information.

#### Transports

A transport protocol is responsible for carrying messages that are in a specific protocol. WSO2 Micro Integrator supports all the widely used transports including, HTTP/S, JMS, and VFS, as well as domain-specific transports like FIX. Each transport provides a receiver implementation for receiving messages and a sender implementation for sending messages.

See the [Transports]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports) documentation for more information.

#### Registry

WSO2 Micro Integrator uses a Registry to store various configurations and resources, such as [endpoints](#endpoints). A registry is simply a content store and a metadata repository. Various resources such as XSLT scripts, WSDLs, and configuration files can be stored in a registry and referred to by a key, which is a path similar to a UNIX file path. The WSO2 Micro Integrator uses a [file-based registry]({{base_path}}/install-and-setup/setup/deployment/file-based-registry) that is configured by default. You can also define and use a [local registry]({{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries) when you develop your integration artifacts.

#### Message Builders and Formatters

When a message comes into WSO2 Micro Integrator, the receiving transport selects a message builder based on the message's content type. It uses that builder to process the raw payload data of the message and converts it to a
common format, which the mediation engine of WSO2 Micro Integrator can then read and understand. WSO2 Micro Integrator includes message builders for text-based and binary content.

Conversely, before a transport sends a message out from WSO2 Micro Integrator, a message formatter is used to build the outgoing stream from the message back into its original format. As with message builders, the message formatter is selected based on the message's content type.

See the [Message Builders and Formatters]({{base_path}}/install-and-setup/setup/message-builders-formatters/message-builders-and-formatters) documentation for more information.

---

## Development Tool

### Micro Integrator for VS Code

WSO2 Micro Integrator Visual Studio Code extension (MI for VS Code) is a comprehensive integration solution that simplifies your digital transformation journey. It streamlines your integration development workflow using a user-friendly low-code graphical designing experience. This leverages AI to assist developers throughout the integration development process which elevates the integration experience to new heights.

See the [Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview) documentation for more information.

---

## Monitoring Tools

Listed below are the key concepts of the WSO2 Micro Integrator monitoring tools.

### Integration Control Plane

The WSO2 Integration Control Plane (ICP) can be used to monitor the Micro Integrator instances in a deployment. It provides a graphical view of the integration artifacts that are deployed in the Micro Integrator instances. You can also perform various management and administration tasks using the ICP server.

See the [Integration Control Plane]({{base_path}}/observe-and-manage/working-with-integration-control-plane) documentation for more information.

### Micro Integrator CLI

The Micro Integrator CLI allows you to monitor the Synapse artifacts (deployed in a specified Micro Integrator server) and perform various management and administration tasks from the command line.

See the [Micro Integrator CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli) documentation for more information.
