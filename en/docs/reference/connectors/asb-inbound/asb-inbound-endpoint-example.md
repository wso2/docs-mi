# Azure Service Bus Inbound Endpoint Example

## About Azure Service Bus Event Integration

The Azure Service Bus inbound endpoint acts as an event-based message consumer. It connects to an Azure Service Bus namespace and continuously listens for messages on a **queue** or **topic subscription**, injecting each message into a mediation sequence for processing. The endpoint is built on top of the Azure SDK, supporting concurrent consumption, automatic lock renewal, session-aware processing, and configurable retry behavior.

## What you'll build

This guide walks you through setting up an Azure Service Bus inbound endpoint that listens to a queue, logs incoming messages, and settles them using the Azure Service Bus connector.

You will:

1. Set up an Azure Service Bus namespace with a queue.
2. Configure the inbound endpoint in WSO2 Micro Integrator using the Visual Studio Code extension.
3. Run and test the integration to receive and process messages.

## Prerequisites

- An Azure Service Bus namespace with at least one queue or a topic with a subscription. Set up Azure Service Bus by following the instructions in [Set up Azure Service Bus]({{base_path}}/reference/connectors/asb-connector/asb-connector-setup/).
- WSO2 Micro Integrator 4.4.0 or later.
- Java 17 or later.
- The [Azure Service Bus Connector](https://store.wso2.com/connector/mi-connector-asb) added to your project (required for message settlement operations in PEEK_LOCK mode).

### **Step 01: Add the Azure Service Bus Inbound Endpoint to your project**

1. [Create a new project]({{base_path}}/develop/create-integration-project/) in WSO2 Micro Integrator (MI).

2. In the Add Artifact interface, under Create an Integration, click **Event Integration**. This will open the list of event integrations available in WSO2 Micro Integrator.

3. Select **Azure Service Bus (Inbound)**.
      
      <img src="{{base_path}}/assets/img/integrate/connectors/asb-inbound/select-asb-inbound.png" title="Create ASB Inbound Endpoint" width="1000" alt="Create ASB Inbound Endpoint"/>

4. Enter the following values in the form and click **Create**.

    - **Event Integration Name**: `asbQueueListener`
    - **Connection String**: Your Azure Service Bus connection string.
    - **Entity Type**: `queue`
    - **Queue Name**: `orders` [Name of your queue]

   The source view of the created inbound endpoint is shown below. For detailed descriptions of each parameter, please refer to the [Azure Service Bus Inbound Endpoint Reference]({{base_path}}/reference/connectors/asb-inbound/asb-inbound-endpoint-reference/).

   ```xml
   <inboundEndpoint name="asbQueueListener" class="org.wso2.carbon.inbound.asb.ASBEventConsumer" sequence="asbQueueListener-inboundSequence" onError="asbQueueListener-inboundErrorSequence" suspend="false">
      <parameters xmlns="http://ws.apache.org/ns/synapse">
         <parameter name="inbound.behavior">eventBased</parameter>
         <parameter name="connectionString">Endpoint=sb://YOUR_NAMESPACE.servicebus.windows.net/;SharedAccessKeyName=YOUR_KEY_NAME;SharedAccessKey=YOUR_KEY</parameter>
         <parameter name="entityType">queue</parameter>
         <parameter name="queueName">orders</parameter>
         <parameter name="sessionEnabled">false</parameter>
         <parameter name="coordination">true</parameter>
         <parameter name="inboundVariableName">asb_inbound</parameter>
         <parameter name="receiveMode">PEEK_LOCK</parameter>
         <parameter name="maxConcurrentConsumers">1</parameter>
         <parameter name="prefetchCount">0</parameter>
         <parameter name="maxLockDurationMs">300000</parameter>
         <parameter name="messageProcessingTimeoutMs">240000</parameter>
         <parameter name="maxRetries">3</parameter>
         <parameter name="retryDelayMs">1000</parameter>
         <parameter name="retryMaxDelayMs">30000</parameter>
         <parameter name="tryTimeoutMs">60000</parameter>
      </parameters>
   </inboundEndpoint>
   ```

### **Step 02: Configure the mediation sequence**

1. Add a [Log Mediator]({{base_path}}/reference/mediators/log-mediator/) to the sequence to log the incoming message metadata. Set the following properties:

    - **Append Payload**: true
    - **Message**: `ASB_MessageId: ${vars.asb_inbound.headers.messageId}`

2. Add the Azure Service Bus connector's **Complete** operation from the **Message Settlement (Only For Event Integration)** section to settle the message (complete it after successful processing).
      
      <img src="{{base_path}}/assets/img/integrate/connectors/asb-inbound/add-complete-operation.png" title="Add Complete Operation" width="800" alt="Add Complete Operation"/>

   The resulting sequence XML should look like:

   ```xml
   <sequence name="asbQueueListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
      <log category="INFO" logMessageID="false" logFullPayload="true">
         <message>ASB_MessageId: ${vars.asb_inbound.headers.messageId}</message>
      </log>
      <asb.consumer_complete>
         <responseVariable>asb_consumer_complete_1</responseVariable>
         <overwriteBody>false</overwriteBody>
      </asb.consumer_complete>
   </sequence>
   ```

   For the error sequence, you can dead-letter the message with a reason:

   ```xml
   <sequence name="asbQueueListener-inboundErrorSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
      <log category="INFO" logMessageID="false" logFullPayload="false">
         <message>MESSAGE: Executing default 'fault' sequence
         ERROR_CODE: ${properties.synapse.ERROR_CODE}
         ERROR_MESSAGE: ${properties.synapse.ERROR_MESSAGE}</message>
      </log>
      <asb.consumer_deadLetter>
         <responseVariable>asb_consumer_deadLetter_1</responseVariable>
         <overwriteBody>false</overwriteBody>
         <deadLetterReason>DEADLETTERED_BY_RECEIVER</deadLetterReason>
         <deadLetterErrorDescription>Fault in processing</deadLetterErrorDescription>
      </asb.consumer_deadLetter>
   </sequence>
   ```

## Export the integration project as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/AzureServiceBus-Inbound-Example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Send a test message to the `orders` queue using the Azure portal's **Service Bus Explorer**, the Azure CLI, or the Azure Service Bus connector's **sendMessage** operation from another integration:

```bash
az servicebus queue message send \
  --namespace-name <namespace> \
  --queue-name orders \
  --body '{"orderId": "ORD-001", "amount": 99.99}'
```

**Expected Response**:

Check the MI server logs. You should see the message metadata and payload logged:

```text
    INFO {LogMediator} - {inboundendpoint:asbQueueListener} ASB_MessageId: 4636edfc0e894b6980ffb52f087c35cc, To: , MessageID: ce9e2ae0-277c-413b-b941-3764e9d94b9a, Direction: request, Payload: {
    "orderId": "ORD-001",
    "amount": 99.99
}
 ```

## What's next

* To customize this example for your own scenario, see [Azure Service Bus Inbound Endpoint Reference]({{base_path}}/reference/connectors/asb-inbound/asb-inbound-endpoint-reference/) documentation.
