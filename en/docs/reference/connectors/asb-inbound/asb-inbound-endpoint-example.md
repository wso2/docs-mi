# Azure Service Bus Inbound Endpoint Example

## About Azure Service Bus Event Integration

The Azure Service Bus inbound endpoint acts as an event-based message consumer. It connects to an Azure Service Bus namespace and continuously listens for messages on a **queue** or **topic subscription**, injecting each message into a mediation sequence for processing. The endpoint is built on top of the Azure `ServiceBusProcessorClient`, supporting concurrent consumption, automatic lock renewal, session-aware processing, and configurable retry behavior.

## What you'll build

This guide walks you through setting up an Azure Service Bus inbound endpoint that listens to a queue, logs incoming messages, and settles them using the Azure Service Bus connector.

You will:

1. Set up an Azure Service Bus namespace with a queue.
2. Configure the inbound endpoint in WSO2 Micro Integrator using the Visual Studio Code extension.
3. Run and test the integration to receive and process messages.

## Prerequisites

- An Azure Service Bus namespace with at least one queue or a topic with a subscription. You can create one from the [Azure portal](https://portal.azure.com/).
- A connection string with **Listen** (or higher) permission for the target entity. Obtain this from the Azure portal under **Shared Access Policies**.
- WSO2 Micro Integrator 4.4.0 or later.
- The [Azure Service Bus Connector](https://store.wso2.com/connector/mi-connector-asb) added to your project (required for message settlement operations in PEEK_LOCK mode).

#### **Step 01: Create an Azure Service Bus Queue**

1. In the [Azure portal](https://portal.azure.com/), navigate to your Service Bus namespace.
2. Click **Queues** in the left navigation, then click **+ Queue**.
3. Enter a name for the queue (e.g., `orders`) and click **Create**.
4. Navigate to **Shared Access Policies** and copy the connection string.

#### **Step 02: Add the Azure Service Bus Inbound Endpoint to your project**

1. [Create a new project]({{base_path}}/develop/create-integration-project/) in WSO2 Micro Integrator (MI).
2. In the Add Artifact interface, under Create an Integration, click **Event Integration**. This will open the list of event integrations available in WSO2 Micro Integrator.
3. Select **Azure Service Bus**.
4. Fill in the form with the following values:

    - **Event Integration Name**: `asbQueueListener`
    - **Connection String**: Your Azure Service Bus connection string.
    - **Entity Type**: `queue`
    - **Queue Name**: `orders`

#### **Step 03: Configure the mediation sequence**

1. Add a [Log Mediator]({{base_path}}/reference/mediators/log-mediator/) to the sequence to log the incoming message metadata. Set the following properties:

    - `messageId` with expression `${var.asb_inbound.headers.messageId}`
    - `deliveryCount` with expression `${var.asb_inbound.attributes.deliveryCount}`

2. Enable **Append Payload** to include the message body in the log output.

3. Add the Azure Service Bus connector's **consumer_complete** operation to settle the message (complete it after successful processing).

4. Add a [Drop Mediator]({{base_path}}/reference/mediators/drop-mediator/) at the end of the sequence.

The resulting sequence XML should look like:

```xml
<sequence xmlns="http://ws.apache.org/ns/synapse" name="request" onError="fault">
   <log level="custom">
      <property name="messageId" expression="${var.asb_inbound.headers.messageId}"/>
      <property name="deliveryCount" expression="${var.asb_inbound.attributes.deliveryCount}"/>
   </log>
   <log level="full"/>
   <asb.consumer_complete />
   <drop/>
</sequence>
```

For the error sequence, you can dead-letter the message with a reason:

```xml
<sequence xmlns="http://ws.apache.org/ns/synapse" name="fault">
   <log level="full">
      <property name="MESSAGE" value="Executing default 'fault' sequence"/>
      <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
      <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
   </log>
   <asb.consumer_deadLetter>
      <responseVariable>asb_consumer_deadLetter_1</responseVariable>
      <overwriteBody>false</overwriteBody>
      <deadLetterReason>DEADLETTERED_BY_RECEIVER</deadLetterReason>
      <deadLetterErrorDescription>Fault in processing</deadLetterErrorDescription>
   </asb.consumer_deadLetter>
   <drop/>
</sequence>
```

#### **Step 04: Deploy, Run and Test**

1. Deploy and run the project using the [build and run]({{base_path}}/develop/deploy-artifacts/) guide or the **Run** button in the VS Code extension.

2. Send a test message to the `orders` queue. You can use the Azure portal's **Service Bus Explorer**, the Azure CLI, or the Azure Service Bus connector's **sendMessage** operation from another integration:

    ```bash
    az servicebus queue message send \
      --namespace-name <namespace> \
      --queue-name orders \
      --body '{"orderId": "ORD-001", "amount": 99.99}'
    ```

3. Check the MI server logs. You should see the message metadata and payload logged:

    ```
    INFO {LogMediator} - messageId = abc123-def456, deliveryCount = 1
    ```

## Consuming from a Topic Subscription

To consume from a topic subscription instead of a queue, configure the inbound endpoint with:

- **Entity Type**: `topic`
- **Topic Name**: the name of the topic (e.g., `events`)
- **Subscription Name**: the name of the subscription (e.g., `audit`)

The resulting inbound endpoint configuration:

```xml
<inboundEndpoint xmlns="http://ws.apache.org/ns/synapse"
                 name="asbTopicListener"
                 sequence="request"
                 onError="fault"
                 class="org.wso2.carbon.inbound.asb.ASBEventConsumer"
                 suspend="false">
   <parameters>
      <parameter name="inbound.behavior">eventBased</parameter>
      <parameter name="coordination">true</parameter>
      <parameter name="connectionString">Endpoint=sb://&lt;namespace&gt;.servicebus.windows.net/;SharedAccessKeyName=&lt;keyName&gt;;SharedAccessKey=&lt;key&gt;</parameter>
      <parameter name="entityType">topic</parameter>
      <parameter name="topicName">events</parameter>
      <parameter name="subscriptionName">audit</parameter>
      <parameter name="receiveMode">PEEK_LOCK</parameter>
      <parameter name="contentType">application/json</parameter>
   </parameters>
</inboundEndpoint>
```

## Session-Enabled Entities

To consume from a session-enabled queue or subscription, set `sessionEnabled` to `true`. The endpoint uses a session-aware processor that automatically acquires sessions.

```xml
<inboundEndpoint xmlns="http://ws.apache.org/ns/synapse"
                 name="asbSessionQueueListener"
                 sequence="request"
                 onError="fault"
                 class="org.wso2.carbon.inbound.asb.ASBEventConsumer"
                 suspend="false">
   <parameters>
      <parameter name="inbound.behavior">eventBased</parameter>
      <parameter name="coordination">true</parameter>
      <parameter name="connectionString">Endpoint=sb://&lt;namespace&gt;.servicebus.windows.net/;SharedAccessKeyName=&lt;keyName&gt;;SharedAccessKey=&lt;key&gt;</parameter>
      <parameter name="entityType">queue</parameter>
      <parameter name="queueName">session-orders</parameter>
      <parameter name="sessionEnabled">true</parameter>
      <parameter name="maxConcurrentSessions">2</parameter>
      <parameter name="maxConcurrentMessagesPerSession">1</parameter>
      <parameter name="receiveMode">PEEK_LOCK</parameter>
      <parameter name="contentType">application/json</parameter>
   </parameters>
</inboundEndpoint>
```

You can access the session identifier in the mediation flow using `${var.asb_inbound.attributes.sessionId}`.

!!! note
    Pointing a session-enabled endpoint at a non-session entity (or vice versa) will fail at runtime.
