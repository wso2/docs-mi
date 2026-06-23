# Solace Connector Overview

[Solace PubSub+](https://solace.com/products/event-broker/) is an advanced event broker that lets you publish, subscribe, queue, and request-reply messages across distributed systems using open APIs and protocols. It supports both **non-persistent (direct)** messaging for high-throughput pub/sub and **guaranteed (persistent)** messaging for once-and-only-once delivery.

The Solace Connector allows WSO2 Integrator: MI to interact with a Solace PubSub+ broker as a **client**. You can publish messages to topics and queues, perform synchronous request-reply, browse and poll queues, and group publishes into local transactions within your mediation flows.

To **consume** messages from a Solace broker and drive a mediation sequence, use the companion **Solace Inbound Endpoint**.

!!! note "Messaging patterns covered"
    Together, the connector and the inbound endpoint cover all three [Solace message exchange patterns](https://docs.solace.com/Get-Started/message-exchange-patterns.htm) on both the producer and consumer sides:

    * **Publish-Subscribe** - The connector publishes to topics, and the inbound endpoint injects messages from its subscribed topics into a mediation sequence.
    * **Point-to-Point** - The connector publishes to queues, and messages are consumed either by the inbound endpoint or by polling through the connector (`poll`). `browse` can inspect a queue without consuming.
    * **Request-Reply** - The connector issues requests as the requestor (`sendRequest`) and on the reply side, an inbound endpoint receives a request and the sequence responds via `sendReply`.

!!! info "Protocol"
    The connector and inbound endpoint are built on the Solace **JCSMP** API and communicate with the broker over **SMF** (Solace Message Format), the broker's native protocol exposed on the SMF ports (`tcp://…:55555` / `tcps://…:55443`). This gives access to Solace-specific capabilities such as local transactions and negative acknowledgements. To reach a Solace broker over **JMS**, **AMQP**, or **MQTT** instead, use the corresponding WSO2 Integrator: MI transport rather than this connector.

Go to the <a target="_blank" href="https://store.wso2.com/connector/mi-connector-solace">WSO2 Connector Store</a> to download the Solace connector.

## Compatibility

| Connector Version | Supported product versions |
| ----------------- | -------------------------- |
| 1.0.0 (Latest)    | MI 4.6.0 and above         |

## Solace Connector documentation

The Solace Connector lets WSO2 Integrator: MI act as a Solace client to publish messages to topics and queues, perform synchronous request-reply, browse and poll queues, and group publishes into local transactions from a mediation flow.

* **[Set up the Solace Environment]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/)**: Prerequisites and steps to set up a Solace PubSub+ broker and obtain the credentials required to connect using basic authentication.

* **[Solace Connector Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-example/)**: A hands-on example that uses a REST API to publish, request-reply, browse, poll, and transact messages on a Solace broker.

* **[Solace Connector Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-reference/)**: A complete reference for every connection parameter and connector operation.

## Solace Inbound Endpoint documentation

The Solace Inbound Endpoint lets WSO2 Integrator: MI consume messages from a Solace broker and drive a mediation sequence. It acts as a message consumer, listening to a queue or topic and injecting received messages into the sequence, where they can be acknowledged, rejected, or replied to.

* **[Solace Inbound Endpoint Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-example/)**: A hands-on example that consumes messages from a Solace queue and a topic, acknowledges/rejects them, and replies to request messages.

* **[Solace Inbound Endpoint Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-reference/)**: A complete reference for every Solace Inbound Endpoint parameter.

## Supported operations and patterns

The Solace connector exposes the following operations, grouped by category:

| Category          | Operation               | Description |
| ----------------- | ----------------------- | ----------- |
| **Publish**       | `publishMessage`        | Publish messages to Solace topics or queues, with transactional awareness. |
| **Consume**       | `poll`                  | Poll for messages from a Solace queue. |
|                   | `browse`                | Browse messages in a queue without consuming them. |
| **Settlement**    | `acknowledgeMessage`    | Acknowledge consumed messages so the broker removes them from the queue. |
|                   | `nackMessage`           | Negatively acknowledge messages to trigger redelivery or dead-lettering. |
| **Request‑Reply** | `sendRequest`           | Send a request message and await a reply. |
|                   | `sendReply`             | Send a reply in response to a received request. |
| **Transactional** | `beginTransaction`      | Opens a transacted session, pins the connection, and scopes it to the flow via a transaction id on the message context. Rejects a nested begin and auto-rolls-back on timeout. |
|                   | `commit`                | Atomically finalizes the transaction: pending publishes are sent and any messages polled within it are acknowledged and removed. |
|                   | `rollback`              | Cancels the transaction: pending publishes are discarded and any messages polled within it are redelivered to their queue. |

The **Solace Inbound Endpoint** complements these by listening to a queue or topic and injecting received messages into a mediation sequence, where `acknowledgeMessage`, `nackMessage`, and `sendReply` can be called.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community.

To contribute to the code for this connector, create a pull request in the following repositories:

* [Solace Connector GitHub repository](https://github.com/wso2-extensions/mi-connector-solace)
* [Solace Inbound Endpoint GitHub repository](https://github.com/wso2-extensions/mi-inbound-solace)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
