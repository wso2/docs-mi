# Google Pub/Sub Inbound Endpoint Example

## Introduction
[Google Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview) is a globally distributed, asynchronous messaging service designed to decouple services that produce events from services that process events.

The Google Pub/Sub Inbound Endpoint provides a robust and production-grade implementation of a Google Cloud Pub/Sub subscriber using the Streaming Pull API, built on top of Google's high-level Java client library. The Streaming Pull API is ideal for low-latency, high-throughput message consumption, as it maintains a persistent connection to efficiently stream messages from the server to the client.

!!! Note
    The WSO2 MI Google Pub/Sub Inbound Endpoint also supports subscription creation. To create or update a subscription, the service account must have the `roles/pubsub.editor` role. However, if you only intend to consume messages from an existing subscription, the `roles/pubsub.subscriber` role is sufficient.

## What you’ll build

By following this tutorial, you will gain hands-on experience in:

1. Setting up Google Cloud Pub/Sub resources.
2. Configuring the Inbound Endpoint in WSO2 Micro Integrator using the Visual Studio Code extension.
3. Running and testing the integration to receive real-time messages.

#### **Step 01: Setting up Google Cloud Pub/Sub resources**
##### Prerequisites

* Create a [Google Cloud Account](https://console.cloud.google.com/freetrial?facet_utm_source=google&facet_utm_campaign=%28organic%29&facet_utm_medium=organic&facet_url=https%3A%2F%2Fcloud.google.com%2Fpubsub%2Fdocs%2Fpublish-receive-messages-console&facet_id_list=%5B39300012%2C+39300020%2C+39300118%2C+39300196%2C+39300241%2C+39300319%2C+39300320%2C+39300326%2C+39300345%2C+39300354%2C+39300363%2C+39300374%2C+39300412%2C+39300421%2C+39300436%2C+39300472%2C+39300488%2C+39300496%2C+39300498%2C+39300569%5D) if you already don't have one.
* Create/Select a [Google Cloud Project](https://console.cloud.google.com/projectselector2/home/dashboard).
* Enable the [Pub/Sub API](https://console.cloud.google.com/flows/enableapi?apiid=pubsub.googleapis.com)

##### Create required resources
* [Create a Topic](https://cloud.google.com/pubsub/docs/publish-receive-messages-console#create_a_topic)
* [Create a Subscription](https://cloud.google.com/pubsub/docs/publish-receive-messages-console#add_a_second_subscription)
* [Set Up Authentication](https://cloud.google.com/docs/authentication/set-up-adc-attached-service-account)

#### **Step 02: Configuring the Inbound Endpoint in WSO2 Micro Integrator using the Visual Studio Code extension**
Follow these steps to configure the inbound endpoint in WSO2 Micro Integrator using the Visual Studio Code extension:

1. [Create a new project]({{base_path}}/develop/create-integration-project/) using the WSO2 Micro Integrator VS Code extension.
2. In the Add Artifact interface, under Create an Integration, click Event Integration. This will open the list of event integrations available in WSO2 Micro Integrator.

    <img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub-inbound/sf-pubsub-inb-2.png" title="Google Pub/Sub Inbound Endpoint Example" width="80%" alt="Event Integration"/>

3. Select Google Pub/Sub Inbound Endpoint.
4. Fill the form with the values for creating the inbound endpoint.

    <img src="{{base_path}}/assets/img/integrate/connectors/google-pubsub-inbound/createEventIntegration.png" title="Google Pub/Sub Inbound Example" alt="Event Integration" width="80%" height="30%"/>

5. Add [a Log Mediator]({{base_path}}/reference/mediators/log-mediator/) to the sequence to log the incoming messages. 
   
    <img src="{{base_path}}/assets/img/integrate/connectors/google-pubsub-inbound/logmediator.png" title="Google Pub/Sub Inbound Create Subs" alt="Order Notification" width="80%" height="30%"/>

6. Add [a Drop Mediator]({{base_path}}/reference/mediators/drop-mediator/) to the sequence to drop the messages after logging. You can use any mediation to mediate the consumed records.

!!! Note
    You can access the consumed record details like pub/sub message id, record published time, ordering-key(if available) and attributes through below message context properties. Each message attribute can be accessed with attribute key.
    ```xml
    <property name="messageID" expression="${properties.synapse.MessageID}"/>
    <property name="MessagePublishTime" expression="${properties.synapse.MessagePublishTime}"/>
    <property name="MessageOrderingKey" expression="${properties.synapse.MessageOrderingKey}"/>
    <property name="MessageAttribute1" expression="${properties.synapse.attributeName}"/>
    ```

#### **Step 03: Running and testing the integration to receive real-time messages**

1. To generate an access token for Publisher, refer to [Setting up the Google PubSub Environment]({{base_path}}/reference/connectors/google-pubsub-connector/googlepubsub-connector-configuration/).

2. Publish a message to the Google Pub/Sub topic. You can use the below direct Rest API or [WSO2 Google Pub/Sub Connector]({{base_path}}/reference/connectors/google-pubsub-connector/googlepubsub-connector-example.md).

```curl
curl --location 'https://pubsub.googleapis.com/v1/projects/<project-id>/topics/<topic-id>:publish' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <ACCESS-TOKEN>' \
--data '{
"messages": [
{
"data": "ewogICJub3RpZmljYXRpb24iOiB7CiAgICAidGl0bGUiOiAiTmV3IERhdGEgUmVjZWl2ZWQiLAogICAgImRlc2NyaXB0aW9uIjogIk9yZGVyIHByb2Nlc3NpbmcgZGV0YWlscy4iLAogICAgImRldGFpbHMiOiB7CiAgICAgICJNZXNzYWdlIENvbnRlbnQiOiAiT3JkZXIgcHJvY2Vzc2VkIiwKICAgICAgIk1ldHJpYyBWYWx1ZSI6IDMuMTQsCiAgICAgICJQcm9jZXNzaW5nIFN0YXR1cyI6ICJTdWNjZXNzZnVsIgogICAgfSwKICAgICJ0aW1lc3RhbXAiOiAiMjAyNS0wNy0wMVQxMDo0NTowMFoiCiAgfQp9",
"attributes": {
"key1": "value9",
"key2": "value2",
"attributeName": "user123"}}
]}
```
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts) guide or simply click the **Run** button in the Visual Studio Code extension.
Once you have published the message to your Google Pub/Sub Topic, you can check the logs in the WSO2 Micro Integrator server to see the incoming messages.


<img src="{{base_path}}/assets/img/integrate/connectors/google-pubsub-inbound/events-recieved.png" title="Google Pub/Sub Inbound User Scenario" alt="Order Notification" width="90%" height="50%"/>