# Salesforce Pub/Sub Inbound Endpoint Subscribe Example

## About Subscribe
The **Subscribe** RPC in Salesforce Pub/Sub API provides bidirectional streaming with a pull-based mechanism, allowing the client to control how and when events are consumed. This model is well-suited for scenarios where flow control is critical based on client processing capacity.

**Flow Summary:**

* The client initiates a subscription by sending a FetchRequest with:
    - The **topic name** to subscribe to.
    - A **replay preset** (e.g., **LATEST**, **EARLIEST**, or a **custom replay ID**).
    - If the replay preset is **LATEST** or **EARLIEST**, the user can define the behavior for the next server restart—whether to use the last replay ID or the initial value. This can be enabled by selecting the **Enable to retrieve with last replay ID** option in the inbound endpoint configuration.
    - The **number of requests** fetches up to the given values.
* The server responds by delivering events in one or more FetchResponse messages, up to the number of events requested.
* All subsequent requests must use the same topic name as the initial request. A mismatch results in an INVALID_ARGUMENT error.
* To restart the subscription from a different point in the stream (e.g., with a new replay preset), the client must reinitiate the Subscribe RPC.

## What you'll build
This guide walks you through the process of setting up a Salesforce Pub/Sub Inbound Endpoint that subscribes to a Topic.

You will:

1. Create an Order Event using Salesforce Developer Console
2. Configure the Inbound Endpoint in WSO2 Integrator: MI using the Visual Studio Code extension.
3. Run and test the integration to receive real-time notifications.

This example demonstrates how to utilise the Salesforce inbound feature to retrieve events from the Salesforce server.

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/sf-pubsub-inb-diagram.png" title="Salesforce Pub/Sub Inbound Endpoint Example" width="80%" alt="Salesforce Pub/Sub Inbound Endpoint Example"/>

#### **Step 01: Define A Platform Event in Salesforce**

In Salesforce, go to Setup, search for Platform Events, and click New Platform Event to create the Order Event (with the description "Example event for the Pub/Sub API client"). Save the event and add the following custom fields:

- Order_Number__c (Text, 18 characters)
- City__c (Text, 50 characters)
- Amount__c (Number, 16 digits, 2 decimal places)

#### **Step 02: Add the Salesforce Pub/Sub connector to your WSO2 Integrator: MI project.**
In MI, create a new project and add the Salesforce Pub/Sub connector to the project.

1. [Create a new project]({{base_path}}/develop/create-integration-project/) in WSO2 Integrator:  MI.
2. In the Add Artifact interface, under Create an Integration, click Event Integration. This will open the list of event integrations available in WSO2 Integrator: MI.

    <img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/sf-pubsub-inb-2.png" title="Salesforce Pub/Sub Inbound Endpoint Example" width="80%" alt="Event Integration"/>

3. Select Salesforce Pub/Sub Listener.
4. Fill the form with the values for creating the inbound endpoint

    <img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/sf-pubsub-inbound-1.png" title="Salesforce Pub/Sub Inbound User Scenario" alt="Order Notification" width="40%" height="50%"/>

5. Authenticate using your Salesforce **username**,  **password** and your **security token**. Alternatively, you can authorize using request headers if you already have authorized headers. Please ensure the following fields are included:

     - accessToken – The access token
     - instanceUrl – The base URL of your Salesforce instance
     - tenantId – The Salesforce organization ID

     <img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/sf-pubsub.png" title="Salesforce Pub/Sub Inbound User Scenario" alt="Order Notification" width="40%" height="50%"/>

6. Add [a Log Mediator]({{base_path}}/reference/mediators/log-mediator/) to the sequence to log the incoming messages and tick the Append Payload option to include the payload in the log.

    <img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/pubsub-log.png" title="Salesforce Pub/Sub Inbound User Scenario" alt="Log Mediator" width="50%" height="40%"/>

7. Add [a Drop Mediator]({{base_path}}/reference/mediators/drop-mediator/) to the sequence to drop the messages after logging.

    <img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/pubsub-log-drop.png" title="Salesforce Pub/Sub Inbound User Scenario" alt="Order Notification" width="40%" height="50%"/>

#### **Step 03: Deploy, Run and Test the Integration**

In order to deploy and run the project, refer the [build and run](https://mi.docs.wso2.com/en/latest/develop/deploy-artifacts/) guide or simply use the Run button in the Visual Studio Code extension to run the integration.
Once you have published the event to your Order Event in Salesforce, you can check the logs in the WSO2 Integrator: MI server to see the incoming messages.
You can publish an event using the Salesforce Developer Console by executing the following code in the Execute Anonymous window:

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/sf-pubsub-inb-output.png" title="Salesforce Pub/Sub Inbound User Scenario" alt="Order Notification" width="90%" height="50%"/>
