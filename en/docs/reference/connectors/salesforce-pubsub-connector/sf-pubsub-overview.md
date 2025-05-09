# Salesforce Pub/Sub Connector for WSO2 Micro Integrator


The **Salesforce Pub/Sub Connector** lets WSO2 Micro Integrator talk directly to Salesforce’s grpc-based Pub/Sub API without you having to deal with low‑level details. With this connector, you can **publish** Platform‑Event records to any topic, look up a topic’s metadata with **getTopic**, and pull the corresponding JSON schema with **getSchema** so your flows can validate or transform events confidently. By handling authentication and protocol work under the hood, the connector drops into your integration projects like any other MI connector, making real‑time event streaming to and from Salesforce straightforward.

* [Salesforce Connection Setting Up]({{base_path}}/reference/connectors/salesforce-pubsub-connector/sf-pubsub-configuration/): This section includes how to obtain the salesforce pub/sub connection from the connector.
* [Salesforce Pub/Sub API Connector Example]({{base_path}}/reference/connectors/salesforce-pubsub-connector/sf-pubsub-example/): This example explains how to use the Salesforce client to connect with the Salesforce instance and perform the publish and retrieve events.
* [Salesforce Pub/Sub API Connector Reference]({{base_path}}/reference/connectors/salesforce-pubsub-connector/sf-pubsub-connector-reference/): This documentation provides a reference guide for the Salesforce Pub/Sub API operations.


## Connector Download

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-pubsub-connector-icon.png" title="Salesforce Pub/Sub Connector" alt="Salesforce Connector Store" width="40%" height="40%"/>


> **Tip:** Download the connector from the [WSO2 Connector Store](https://store.wso2.com/connector/mi-connector-salesforcepubsub).

---

## Compatibility

| Connector Version | Supported MI Version |
|-------------------|----------------------|
| **0.1.0**         | **MI 4.4.0**         |

---

## How to Contribute

As an open-source project, WSO2 extensions welcome community contributions.

1. **Fork** the [Salesforce Pub/Sub Connector repository](https://github.com/wso2-extensions/esb-connector-salesforcepubsub).
2. Check the **issue tracker** for tasks that interest you.
3. Create a **pull request** with your improvements.

We look forward to your contributions!
