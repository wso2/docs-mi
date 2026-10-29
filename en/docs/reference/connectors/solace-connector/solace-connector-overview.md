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

Go to the WSO2 Connector Store to download the <a target="_blank" href="https://store.wso2.com/connector/mi-connector-solace">Solace connector</a> and the <a target="_blank" href="https://store.wso2.com/connector/mi-inbound-solace">Solace inbound endpoint</a>.

## Compatibility

| Version | Connector | Inbound endpoint | Supported product versions |
| ------- | --------- | ---------------- | -------------------------- |
| 2.x     | 2.0.1 (Latest) | 2.0.1 (Latest) | WSO2 Integrator: MI 4.6.0 and above |
| 1.x     | 1.0.1     | 1.0.2            | WSO2 Integrator: MI 4.6.0 and above |

The inbound endpoint 2.x requires a 2.x connector. The connector 2.x works with the inbound endpoint 1.x, so the connector can be upgraded first. The health block in the management API is included in WSO2 Integrator: MI 4.7.0. On WSO2 Integrator: MI 4.6.0, apply the latest U2 update level.

## Solace 2.x documentation

Solace 2.x changes when a consumed message is acknowledged, how many messages one endpoint handles at a time, how an endpoint recovers from a broker failure, how a body and its content type travel, and what the management API shows about it. The connector and the inbound endpoint are released together and are upgraded together, so one page set covers both.

| Page | What it covers |
| ---- | -------------- |
| [Set up the Solace Environment]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/) | the broker, the Message VPN, the client username and the Solace client library, for both versions |
| [What is new in 2.x]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-what-is-new/) | the changes from 1.x, the version lock and the server level |
| [Quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/) | consume a queue, call an HTTP backend and acknowledge after the answer, in fifteen minutes |
| [Use cases]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-cases/) | one integration shape per page, with its parameters, its log lines and its health words |
| [How to guides]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-guides/) | one task per guide, with the steps, how to verify and how to undo |
| [Performance]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-performance/) | throughput, latency and CPU measured on one node |
| [Configuration reference]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/) | every parameter of the inbound endpoint and the connector, with its default, and the results of poll, sendRequest and browse |
| [Operations guide]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-operations-guide/) | sizing, the broker settings, the failure modes and the log lines to grep |
| [Migration from 1.x]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-migration-from-1.x/) | the order of the upgrade, the breaking changes and the limits of 2.x |
| [Troubleshooting]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-troubleshooting/) | the symptom, the log line, the cause and the action |

## Solace Connector 1.x documentation

The Solace Connector lets WSO2 Integrator: MI act as a Solace client to publish messages to topics and queues, perform synchronous request-reply, browse and poll queues, and group publishes into local transactions from a mediation flow.

* **[Set up the Solace Environment]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/)**: Prerequisites and steps to set up a Solace PubSub+ broker and obtain the credentials required to connect using basic authentication.

* **[Solace Connector Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-example/)**: A hands-on example that uses a REST API to publish, request-reply, browse, poll, and transact messages on a Solace broker.

* **[Solace Connector Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-reference/)**: A complete reference for every connection parameter and connector operation.

## Solace Inbound Endpoint 1.x documentation

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
