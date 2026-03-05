# RabbitMQ (AMQP 1.0) Connector Example

The **RabbitMQ Connector** allows publishing messages to RabbitMQ queues hosted on either local brokers or managed RabbitMQ services. It supports secure communication using **TLS encryption** and **OAuth2 authentication**, and exposes the publishing functionality through a RESTful API. Users can send messages to RabbitMQ over HTTP/HTTPS, simplifying integration with external systems.

## What you'll build

This example demonstrates how to use the RabbitMQ Connector to publish messages to a RabbitMQ queue through a REST API. The API exposes the resource `/publishMessage`, which enables users to send messages to a RabbitMQ queue.

The user sends a payload containing the necessary information, such as the queue name and message content. The integration runtime then uses the RabbitMQ Connector to publish the message to the configured RabbitMQ broker.

- `/publishMessage`: This resource accepts a request payload that includes details such as the queue name and message content. Upon invocation, the API uses the RabbitMQ Connector to connect with the RabbitMQ broker and publish the message to the specified queue.

The following diagram illustrates an overview of the RabbitMQ RESTful service that you are going to build in this example.

<a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/RabbitMQConnectorDiagram.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/RabbitMQConnectorDiagram.png" title="RabbitMQConnectorUseCase" width="80%" alt="RabbitMQConnectorUseCase"/></a>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Before you begin

### Setup RabbitMQ Broker

To connect with RabbitMQ using the WSO2 Integrator: MI RabbitMQ Connector, you need to first set up a running RabbitMQ Broker instance locally or on a server. In this example, we will use a RabbitMQ standalone server. Set up RabbitMQ Broker by following the instructions in [Set up RabbitMQ Broker]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-setup/).

## Develop the integration logic

Follow these steps to set up the Integration Project using the WSO2 Integrator: MI Visual Studio Code extension.

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **WSO2 MI** and create the integration project with the **Project Name** as follows:

<a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateProject.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateProject.png" alt="Creating a new Project" width="80%"></a>
### Create the integration logic

#### Create the API

1. Under the **Create an integration** section, select **API** to create a new REST API.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateAPI.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateAPI.png" title="Creating a new API" width="80%" alt="Creating a new API"/></a>

2. Then, enter the API name as `PublishMessage` and the Context as `/publishMessage` and click **Create**.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateAPI1.png" ><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateAPI1.png" title="Creating a new API" width="80%" alt="Creating a new API"/></a>

3. Select the newly created `PublishMessage` API and click the **Edit** button to change the API method.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/UpdateResource.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/UpdateResource.png" title="Adding the API resource step 1." width="80%" alt="Adding the API resource step 1."/></a>

4. Then select the `POST` method and click **Update**.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/UpdateResource1.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/UpdateResource1.png" title="Adding the API resource step 1." width="80%" alt="Adding the API resource step 1."/></a>
   <br/> 
   This will create a new API resource with the context `/publishmessage` and the method `POST`.

#### Create sample request payload

To map elements from the request payload to the configuration parameters, you can define a sample request payload. To do this, follow the steps below:

Click on the resource and you will be redirected to the **Design View** of the API. Now, click on the `Start` node on the canvas and select the `Add Request` option. This will open a pane to create a new example payload request.

In this operation, we are going to receive the following inputs from the user.

- **queue** - The name of the RabbitMQ queue to which the message will be published.
- **message** - The content of the message to be published.

    Therefore, provide the following JSON payload to the request.

    ```json
    {
        "queue": "TestQueue",
        "message": "Hello World!"
    }
    ```
  
   <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddAPIRequestPayload.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddAPIRequestPayload.png" title="Adding the sample API request." width="40%" alt="Adding the API request."/></a>

#### Add RabbitMQ Connector to the Project

1. Now we will add the `publishMessage` operation of the RabbitMQ Connector to the integration flow. To do this, we need to add the RabbitMQ Connector to the integration project first.
   For that, open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette** and search for `RabbitMQ` in the **Mediators** section. Then, select the **RabbitMQ** connector and click on the **Download** button.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/SelectPublishMessageOperation.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/SelectPublishMessageOperation.png" title="Adding RabbitMQ Connector" width="80%" alt="Adding RabbitMQ Connector"/></a>

2. Click on the `publishMessage` operation to add that operation to the integration flow.

#### Create Connection

1. Create a new connection by clicking on the '+ Add new connection' button as shown below. It will open a new pop-up window.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateConnection1.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateConnection1.png" title="Creating a new Connection" width="60%" alt="Creating a new Connection"/></a>

2. Click on the **RabbitMQ** tile under the RabbitMQ Connector.

3. Enter the connection name as `RabbitMQConnection` and provide the following details in the **RabbitMQ Connection** configuration pane.

    - **RabbitMQ Broker Urls**: localhost:5672
    - **SASL Mechanism**: PLAIN
    - **OAuth2 Enabled**: false
    - **Server Username**: guest
    - **Server Password**: guest

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateConnection2.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/CreateConnection2.png" title="Creating a new Connection" width="60%" alt="Creating a new Connection"/></a>

### Implement the API

1. Once the RabbitMQ connection is successfully created, it will be listed in the drop-down on the **Connection** section of the **Add PublishMessage** operation window.

2. Now we need to configure the necessary parameters of the `publishMessage` operation. For some of the fields, we will use Synapse expressions to map values from the sample request defined in [Create Sample Request Payload](#create-sample-request-payload).
    - Destination Queue/Exchange Section
        - **Queue**: `${payload.queue}`
        - **Queue Type**: QUORUM
        - **Queue Auto Declare** : true
        
    - Request Message Settings
        - **Content Type**: TEXT
        - **Request Body**: `${payload.message}`

    - Publisher Client Settings
      - **Publisher Confirms**: true
      - **Publish Timeout (MS)**: 60000

    - Output Section
       - **Output Variable Name**: rabbitmq_publishMessage_1

3. To do this, click on the `Expression` icon in the Message field and select the `Payload` option.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddExpression.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddExpression.png" title="Adding expressions." width="70%" alt="Configuring publishMessage operation."/></a>

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/SelectFromPayload.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/SelectFromPayload.png" title="Adding expressions." width="70%" alt="Configuring publishMessage operation."/></a>

   This will open a new pop-up window where you can select the `payload.message` parameter from the request payload. <br/>

   <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/selectFromPayload2.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/selectFromPayload2.png" title="Adding the send parameters." width="70%" alt="Configuring publishMessage operation."/></a>

   Next, do the same for the `Request Body` field. <br/>

   <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/PublishMessageConfigPane1.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/PublishMessageConfigPane1.png" title="Adding the send parameters." width="40%" alt="PublishMessage operation pane."/></a>

4. Click the **+** icon located immediately after the **Publish Message** operation to open the **Mediator Palette**. Add an [If Else Mediator]({{base_path}}/reference/mediators/filter-mediator) to verify the acknowledgment status from the RabbitMQ broker and proceed with the integration accordingly.

5. Under **Mediators**, search for `if else` and select the **If Else** mediator.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/SearchIfElseMediator.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/SearchIfElseMediator.png" alt="Select If Else Mediator" width="80%"></a>

    You will use an expression to define the condition for the **If Else** mediator. This condition evaluates whether the Success field in the RabbitMQ connector response is `true` to determine the appropriate flow. If `true`, the integration generates a success message and responds to the client application; otherwise, it sends an error message to the client.

6. In the **Add If Else Mediator** pane that appears, click on the expression editor (<img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddIfElseMediator.png" alt="inline expression editor" class="inline-icon">) icon to open the editor.

7. Select **Variables** → **rabbitmq_publishMessage_1** → **payload** → **success** to extract the RabbitMQ broker acknowledgment status from the Publish Message response.

<a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddIfElseMediator2.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddIfElseMediator2.png" alt="Add if else Mediator" width="40%"></a>

8. Finally, click **Add** to insert the **If Else** mediator into the integration flow.

9. Click on the **+** icon in the **Then** branch on the canvas to open the **Mediator Palette**. This branch executes when the Success field is `true`.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddMediatorsToThenBranch.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddMediatorsToThenBranch.png" alt="Add Mediators to then branch" width="80%"></a>

10. Under **Mediators**, select the **Log** mediator to log the successful message publishing response from the RabbitMQ broker.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddLogMediator.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddLogMediator.png" title="Adding Log Mediator" width="40%" alt="Adding Log Mediator"/></a>

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddLogMediator2.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddLogMediator2.png" title="Adding Log Mediator" width="40%" alt="Adding Log Mediator"/></a>
    
11. Then select the **Payload** mediator from the **Mediator Palette** to create a custom response payload to be sent back to the client application.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddPayloadMediator.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddPayloadMediator.png" title="Adding Payload Mediator" width="40%" alt="Adding Payload Mediator"/></a>

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddPayloadMediator2.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddPayloadMediator2.png" title="Adding Payload Mediator" width="40%" alt="Adding Payload Mediator"/></a>


12. Repeat the same steps for the **Else** branch as well. Add the **Log** mediator to log the failure message, the **Payload** mediator to create a custom error response payload.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddMediatorsElseBranch.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddMediatorsElseBranch.png" title="Adding Mediators to else branch" width="80%" alt="Add Mediators to else branch"/></a>

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddMediatorsElseBranch2.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddMediatorsElseBranch2.png" title="Adding Mediators to else branch" width="80%" alt="Add Mediators to else branch"/></a>


13. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to respond to the response of the `publishMessage` operation as shown below.

    <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/AddRespondMediator.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/RabbitMQPublishMessageAPI.png" title="Adding the respond mediator." width="80%" alt="Adding the respond mediator."/></a>

??? "RabbitMQ Publish Message API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
         <a href="{{base_path}}/assets/img/integrate/connectors/rabbitmq/RabbitMQPublishMessageAPI.png"><img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/RabbitMQPublishMessageAPI.png" alt="RabbitMQ Publish Message API" width="70%"></a>

    === "Source View"
        
           ```xml

            <?xml version="1.0" encoding="UTF-8"?>
            <api context="/publishmessage" name="PublishMessage"
            xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <rabbitmq.publishMessage configKey="RabbitMQConnection">
                        <headers>[]</headers>
                        <requestBodyType>TEXT</requestBodyType>
                        <requestBodyText>${payload.message}</requestBodyText>
                        <requestCharSet></requestCharSet>
                        <queue>{${payload.queue}}</queue>
                        <queueAutoDeclare>true</queueAutoDeclare>
                        <queueType>QUORUM</queueType>
                        <queueArguments></queueArguments>
                        <deliveryLimit></deliveryLimit>
                        <deadLetterStrategy></deadLetterStrategy>
                        <queueAutoDelete>false</queueAutoDelete>
                        <queueOverflowStrategy>DROP_HEAD</queueOverflowStrategy>
                        <exchange></exchange>
                        <exchangeAutoDeclare>false</exchangeAutoDeclare>
                        <exchangeType>DIRECT</exchangeType>
                        <routingKey></routingKey>
                        <exchangeArguments></exchangeArguments>
                        <exchangeAutoDelete>false</exchangeAutoDelete>
                        <publishTimeout>60000</publishTimeout>
                        <publisherConfirms>true</publisherConfirms>
                        <responseVariable>rabbitmq_publishMessage_1</responseVariable>
                        <overwriteBody>false</overwriteBody>
                    </rabbitmq.publishMessage>
                    <filter xpath="${vars.rabbitmq_publishMessage_1.payload.success}">
                        <then>
                            <log category="INFO" logMessageID="false" logFullPayload="false">
                                <message>Published message Successfully with message ID: ${vars.rabbitmq_publishMessage_1.payload.messageId}</message>
                            </log>
                            <payloadFactory media-type="json" template-type="default">
                                <format>${vars.rabbitmq_publishMessage_1.payload}</format>
                            </payloadFactory>
                        </then>
                        <else>
                            <log category="INFO" logMessageID="false" logFullPayload="false">
                                <message>Failed to Publish Message with message ID: ${vars.rabbitmq_publishMessage_1.payload.messageId}</message>
                            </log>
                            <payloadFactory media-type="json" template-type="default">
                                <format>${vars.rabbitmq_publishMessage_1.payload}</format>
                            </payloadFactory>
                        </else>
                    </filter>
                    <respond/>
                </inSequence>
                <faultSequence></faultSequence>
              </resource>
            </api>
           ```

## Export the integration project as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/RabbitMQPublisher.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

1. Create a file called `data.json` with the following payload.
    ```json
    {
        "queue": "TestQueue",
        "message": "Hello World!"
    }
    ```
2. Use the following `curl` command to invoke the API.
    ```bash
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/publishmessage
    ```
**Expected Response**:
You should get a 'success' response as below along with the messageId.

     ```json
     {
            "success": "true"
            "msgid: "urn:uuid:a40ec122-e3eb-4915-aafe-5686f90871eb"
     }
     ```

## What's next

* To customize this example for your own scenario, see [RabbitMQ (AMQP 1.0) Connector Reference]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-reference/) documentation.
