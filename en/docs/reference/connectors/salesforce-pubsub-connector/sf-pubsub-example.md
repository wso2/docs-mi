# Salesforce Pub/Sub Connector Examples

The **Salesforce Pub/Sub Connector** lets WSO2 Micro Integrator talk directly to Salesforce’s grpc-based Pub/Sub API without you having to deal with low‑level details. With this connector, you can **publish** Platform‑Event records to any topic, look up a topic’s metadata with **getTopic**, and pull the corresponding JSON schema with **getSchema** so your flows can validate or transform events confidently. By handling authentication and protocol work under the hood, the connector drops into your integration projects like any other MI connector, making real‑time event streaming to and from Salesforce straightforward.

## What you'll build
This example explains how to use the Salesforce client to connect with the Salesforce instance and perform the
following operations by publishing the event to the already defined event in saleforce instance.

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-use-case.jpg" title="Salesforce Pub/Sub User Scenario" alt="Salesforce Connector Store" width="90%" height="40%"/>

#### Step 01: Define A Platform Event in Salesforce

- In Setup, open Platform Events, click New Platform Event, create Order Event (description “Example event for the Pub/Sub API client”), save it, and add three custom fields: Order_Number__c (Text 18), City__c (Text 50), and Amount__c (Number 16, 2).

#### Step 02: Add the Salesforce Pub/Sub connector to your WSO2 Micro Integrator project.

In MI, create a new project and add the Salesforce Pub/Sub connector to the project.

1. Create a new project in WSO2 Micro Integrator (MI).
2. Download the Salesforce Pub/Sub connector from [the WSO2 Connector Store](https://store.wso2.com/connector/mi-connector-salesforcepubsub) or Add the connector to your project by navigating to the "Connections" section in mediator pallet and selecting "Add New Connection", Search the Salesforce Pub/Sub connector from the list and click "Add".

#### Step 03: Configure the Salesforce Pub/Sub connector.

1. Create a Salesforce Pub/Sub connection by clicking on the "Add New Connection" button in the connector configuration window.
2. Enter the connection details, including the server URL, port, and enable TLS option.
3. Select basic authentication option and fill these details (username, password, and security token).
4. Click "Add" to create the connection.


<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-pubsub-connector-connection.png" title="Salesforce Pub/Sub Connection" alt="Salesforce Connector Store" width="60%" height="70%"/>


#### Step 04:Create a new sequence and add the Salesforce Pub/Sub connection to the sequence.

When you are selecting the Salesforce Pub/Sub connector, you will be prompted to select the operation you want to perform. Select the "Publish" operation and click "Add".

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-seq-adding-publish-event.png" title="Salesforce Pub/Sub Connection" alt="Salesforce Connector Store" width="60%" height="70%"/>

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-publish-event.jpg" title="Salesforce Pub/Sub Sequence" alt="Salesforce Connector Store" width="50%" height="60%"/>


Same as, you can add the other operations to the sequence as well. The following image shows the operations you can perform using the Salesforce Pub/Sub connector.

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-sequance.png" title="Salesforce Pub/Sub Operations" alt="Salesforce Connector Store" width="60%" height="50%"/>

Now you can execute the sample integration app using run option in the VS code, and you will see the similar output in the console.
 
```
2025-05-09 14:20:16,005]  INFO {LogMediator} - {api:sfpubsub GET /sfpubsub/} _CADE3qaegX3ECEW0rlbYA, body = {"rpc_id":"d1bd2fb8-8a70-4054-9ed1-1b03c18b3f4d","schema_id":"_CADE3qaegX3ECEW0rlbYA","results":[{"replayId_":{"bytes":[0,0,0,0,0,0,-109,-117,0,0],"hash":0},"correlationKey_":"a8e7bf9a-303e-4bce-98c3-d8fa15f0d70a","memoizedIsInitialized":-1,"unknownFields":{"fields":{}},"memoizedSize":-1,"memoizedHashCode":0},{"replayId_":{"bytes":[0,0,0,0,0,0,-109,-116,0,0],"hash":0},"correlationKey_":"808dbeea-eae6-4043-bf68-f64fdfb4915d","memoizedIsInitialized":-1,"unknownFields":{"fields":{}},"memoizedSize":-1,"memoizedHashCode":0}]}
[2025-05-09 14:20:17,328]  INFO {LogMediator} - {api:sfpubsub GET /sfpubsub/} test: 1930d11b-bce5-4cd4-93b0-4dc5b082f553, schema = {"rpc_id":"1930d11b-bce5-4cd4-93b0-4dc5b082f553","schema_json":"{\"type\":\"record\",\"name\":\"Order_Event__e\",\"namespace\":\"com.sforce.eventbus\",\"fields\":[{\"name\":\"CreatedDate\",\"type\":\"long\",\"doc\":\"CreatedDate:DateTime\"},{\"name\":\"CreatedById\",\"type\":\"string\",\"doc\":\"CreatedBy:EntityId\"},{\"name\":\"Order_Number__c\",\"type\":[\"null\",\"string\"],\"doc\":\"Data:Text:00NgL00000vXMFS\",\"default\":null},{\"name\":\"City__c\",\"type\":[\"null\",\"string\"],\"doc\":\"Data:Text:00NgL00000vXNGM\",\"default\":null},{\"name\":\"Amount__c\",\"type\":[\"null\",\"double\"],\"doc\":\"Data:Double:00NgL00000vXNVG\",\"default\":null}]}","schema_id":"_CADE3qaegX3ECEW0rlbYA"}
```