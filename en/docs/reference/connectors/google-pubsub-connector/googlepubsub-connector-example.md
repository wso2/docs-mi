---
search:
  boost: 2
---
# Google Pub Sub Connector Example  

The Google Pub/Sub connector allows you to access the [Google Cloud Pub/Sub API Version v1](https://cloud.google.com/pubsub/docs/reference/rest/) from an integration sequence. 

## What you'll build

Given below is a sample scenario that demonstrates how to work with the WSO2 Google Pub Sub Connector to:

1. Create a Topic to store company update notifications.
2. Insert company update notifications to the created topic.
3. Retrieve company updates from the created topic.

To work with the Google Pub/Sub connector, you need to have a Google Cloud Platform account. Please refer the [Setting up the Google Pub Sub Environment]({{base_path}}/reference/connectors/google-pubsub-connector/googlepubsub-connector-configuration/) documentation to setup an account.

In this scenario, the user needs to create a **Topic** in **Google Cloud Platform account**. This topic is used to store notifications related to company update notifications. Once the user invokes the `createTopic` resource, the subscribing operation also gets triggered simultaneously. Then the user can insert company update notifications to the created topic. Finally, the user can retrieve the company updates from the subscribed topic while invoking the API.

All three operations are exposed via an API. The API with the context `/resources` has three resources.

* `/createTopic` : Used to create a Topic for store company notifications and subscribe to the topic. 
* `/insertCompanyNotifications` : Used to insert company update notifications to the subscribed topic.
* `/getCompanyNotifications` : Used to retrieve information about company updates.

The following diagram shows the overall solution. The user creates a topic, stores some company update notifications, and then receives them back. To invoke each operation, the user uses the same API.

<img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/diagram-overview.png" title="pub-sub connector example" width="800" alt="pub-sub connector example"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project.

### Add integration logic

First create an API, which will be where we configure the integration logic. Specify the API name as `pubsubApi` and API context as `/resources`.

<img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/adding-an-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

#### Configure the API

**Configure a resource for the /createTopic operation**

1. Initialize the connector.

    1. Create the `/createTopic` resource. We will use a URL template called `/createTopic` and the method will be `Post`.

    2. Click **Connection** and select **Google Pub Sub** to initialize the connector.

    3.  Then fill the `clientId`, `clientSecret`, and `refreshToken` fields with the values that you obtained while setting up the Google Pub/Sub environment. 

        - **clientId** : The client ID of the Google Cloud project.
        - **clientSecret** : The client secret of the Google Cloud project.
        - **refreshToken** : The refresh token that you obtained while setting up the Google Pub/Sub environment.

        <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/connection-config.png" title="Initialize connector" width="400" alt="Initialize connector"/>

2. Set up the **Create Topic** operation.
    
    Navigate into the **Connectors** pane and select the `createTopic` operation listed under **Googlepubsub Connector** section. The createTopic operation creates a new topic with the name that you specify.
    
    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/add-create-topic.png" title="Add values to the createTopic operation" width="800" alt="Add values to the createTopic operation"/>

    - **projectId** : The unique ID of the project within which you want to create a topic.
    - **topicName** : The name that you want to give the topic that you are creating.

    While invoking the API, topicName values is populated as an input value for the operation.

    Therefore, we can use `${$payload.topicName}` to capture the topicName value from the request payload.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/create-topic.png" title="Add values to the createTopic operation" width="800" alt="Add values to the createTopic operation"/>

3. Set up the **Subscribe Topic** operation.

    Navigate into the **Connectors** pane and select the **Googlepubsub Connector** section. Then select the `Subscribe Topic` operation.

    - **projectId** : The unique ID of the project within which the topic is created.
    - **subscriptionName** : The name of the subscription.
    - **topicName** : The name of the topic for which you want to create a subscription.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/create-subscription.png" title="Add values to the createTopicSubscription operation" width="800" alt="Add values to the createTopicSubscription operation"/>

4. Forward the backend response to the API caller.

    When you are invoke the created resource, the request for the message is going through the `/createTopic` resource.Then it will invoke the **Create Topic** operation and then the **Subscribe Topic** operation. The response from these operations is captured in variables and then a payload mediator is used to format the response. Finally, it is passed to the Respond mediator. The Respond Mediator stops the processing of the current message and sends the message back to the client as a response.

    1. Add a **payload** mediator to capture the response from the **Create Topic** operation and **Subscribe Topic** operation.

        <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/add-payload-mediator.png" title="Add Payload mediator" width="800" alt="Add Payload mediator"/>

        (You can click on the **fx** icon and go to **variables** to select the response payload from the **Create Topic** operation and **Subscribe Topic** operation.)

    2. Add the **respond mediator** to the **Design view**. 

         <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/add-respond-mediator.png" title="Add Respond mediator" width="800" alt="Add Respond mediator"/>

    3. Once you have setup the sequences and API, you can see the `/createTopic` resource as shown below.

         <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/overall-create-topic.png" title="Overall createTopic resource" width="800" alt="Overall createTopic resource"/>

**Configure a resource for the /insertCompanyNotifications operation**

1. Create the `/insertCompanyNotifications` resource. We will use a URL template called `/insertCompanyNotifications` and the method will be `Post`.

     <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/add-insert-company-notifications.png" title="Add insertCompanyNotifications resource" width="800" alt="Add insertCompanyNotifications resource"/>

2. Set up the **publishMessage** operation. Navigate into the **Connectors** pane and select the **Google Pub/Sub Connector** section. Then select the **publishMessage** operation.

    - **projectId** : The unique ID of the project within which the topic is created.
    - **topicName** : The name of the topic for which you want to create a subscription.
    - **data** :  The message payload.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/publish-message.png" title="Add values to the publishMessage operation" width="800" alt="Add values to the publishMessage operation"/>

3. Add the **Respond mediator** to return the response to the API caller. The response will contain the message ID of the published message.
   Overall, the `/insertCompanyNotifications` resource will look like the following.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/overall-insert-company-notifications.png" title="Overall insertCompanyNotifications resource" width="800" alt="Overall insertCompanyNotifications resource"/>

**Configure a resource for the /getCompanyNotifications operation**

1. Create the `/getCompanyNotifications` resource. We will use a URL template called `/getCompanyNotifications` and the method will be `Post`.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/add-get-company-notifications.png" title="Add getCompanyNotifications resource" width="800" alt="Add getCompanyNotifications resource"/>

2. Set up the **pullMessage** operation. Navigate into the **Connectors** pane and select the **Google Pub/Sub Connector** section. Then select the **pullMessage** operation.
    - **projectId** : The unique ID of the project within which the topic is created.
    - **subscriptionName** : The name of the subscription from which you want to pull messages.
    - **maxMessages** : The maximum number of messages to return.
    - **returnImmediately** : If set to true, the server will return immediately even if there are no messages available to return.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/pull-message.png" title="Add values to the pullMessage operation" width="800" alt="Add values to the pullMessage operation"/>

3. Add the **Respond mediator** to return the response to the API caller. The response will contain the received messages.
   Overall, the `/getCompanyNotifications` resource will look like the following.

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/overall-get-company-notifications.png" title="Overall getCompanyNotifications resource" width="800" alt="Overall getCompanyNotifications resource"/>

Now you can switch into the Source view and check the XML configuration files of the created API and sequences.    
??? note "Full Synapse Code : pubsubApi.xml"
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/resources" name="pubsubApi" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/createTopic">
            <inSequence>
                <googlepubsub.createTopic configKey="GooglePubSub">
                    <projectId>mirelated-455805</projectId>
                    <topicName>{${payload.topicName}}</topicName>
                    <responseVariable>googlepubsub_createTopic_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </googlepubsub.createTopic>
            <googlepubsub.subscribeTopic configKey="GooglePubSub">
        <projectId >mirelated-455805</projectId>
        <subscriptionName >{${payload.subscriptionName}}</subscriptionName>
        <topicName >{${payload.topicName}}</topicName>
        <ackDeadlineSeconds ></ackDeadlineSeconds>
        <pushEndpoint ></pushEndpoint>
        <attributes ></attributes>
        <responseVariable >googlepubsub_subscribeTopic_1</responseVariable>
        <overwriteBody >false</overwriteBody>
                </googlepubsub.subscribeTopic>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"CreateTopicResponse":${vars.googlepubsub_createTopic_1.payload},"SubscribeTopicResponce":${vars.googlepubsub_subscribeTopic_1.payload}}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <resource methods="POST" uri-template="/insertCompanyNotifications">
            <inSequence>
            <googlepubsub.publishMessage configKey="GooglePubSub">
        <projectId >mirelated-455805</projectId>
        <topicName >{${payload.topicName}}</topicName>
        <data >{${payload.notification}}</data>
        <attributes ></attributes>
        <responseVariable >googlepubsub_publishMessage_1</responseVariable>
        <overwriteBody >true</overwriteBody>
                </googlepubsub.publishMessage>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <resource methods="POST" uri-template="/getCompanyNotifications">
            <inSequence>
                <googlepubsub.pullMessage configKey="GooglePubSub">
                    <projectId>mirelated-455805</projectId>
                    <subscriptionName>{${payload.subscriptionName}}</subscriptionName>
                    <maxMessages>10</maxMessages>
                    <returnImmediately>true</returnImmediately>
                    <responseVariable>googlepubsub_pullMessage_1</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </googlepubsub.pullMessage>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/googlepubsub-connector2.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the connection configurations and make other such changes before deploying and running this project.

## Deployment

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the inbuilt API tester or using a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

1. Create a Topic for store company update notifications.

    **Sample request**

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/create-topic-request.png" title="Create Topic request" width="800" alt="Create Topic request"/>

    **Expected response**

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/create-topic-response.png" title="Create Topic response" width="800" alt="Create Topic response"/>

    **You will see the results from G-Cloud console**
    
    - Created Topic.

        <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/pubsub-gcloudtopic.png" title="pubsub-gcloudTopic" width="800" alt="pubsub-gcloudTopic"/>
        
    - Created subscription for the Topic that you specify in the G-Cloud.
        
        <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/pubsub-gcloudsubscription.png" title="pubsub-gcloudSubscription" width="800" alt="pubsub-gcloudSubscription"/>
    
2. Insert company update notifications to the created topic.

    **Sample request**

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/insert-company-notifications-request.png" title="Insert company notifications request" width="800" alt="Insert company notifications request"/>

    **Expected response**

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/insert-company-notifications-response.png" title="Insert company notifications response" width="800" alt="Insert company notifications response"/>

3. Retrieve company updates from the created topic.

    **Sample request**

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/get-company-notifications-request.png" title="Get company notifications request" width="800" alt="Get company notifications request"/>

    **Expected response**

    <img src="{{base_path}}/assets/img/integrate/connectors/gpubsub/v2/get-company-notifications-response.png" title="Get company notifications response" width="800" alt="Get company notifications response"/>