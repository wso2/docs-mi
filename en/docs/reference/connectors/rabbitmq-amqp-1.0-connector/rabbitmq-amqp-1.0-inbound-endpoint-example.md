# RabbitMQ (AMQP 1.0) Inbound Endpoint Example

The RabbitMQ (AMQP 1.0) Inbound Endpoint allows you to connect to RabbitMQ Broker and consume messages from specified queues. The messages are then injected into the mediation engine for further processing and mediation.

## What you’ll build

By following this tutorial, you will gain hands-on experience in:

- Configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint in WSO2 Integrator: MI using the Visual Studio Code extension.
- Consuming and processing messages from a RabbitMQ queue.
- Running and testing the integration to receive real-time notifications.

The inbound endpoint acts as a message receiver and injects those messages into an integration sequence. In this section, we will demonstrate how to configure the inbound endpoint to establish a connection with the RabbitMQ Broker. In this example, we will simply log the message. However, you can extend the flow to perform complex mediation tasks using [mediators]({{base_path}}/reference/mediators/about-mediators/).

## Prerequisites 

### Set up RabbitMQ Broker

To connect with RabbitMQ Broker using the WSO2 Integrator: MI RabbitMQ (AMQP 1.0) Inbound Endpoint, you need to first set up a running RabbitMQ Broker instance locally or on a server. In this example, we will use an RabbitMQ Broker standalone server. Set up RabbitMQ Broker by following the instructions in [Set up RabbitMQ Broker]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-setup/).

## Configure Inbound Endpoint

1. Follow the steps in [create Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up your project.

2. Create a sequence (message injecting sequence) to process the message. In this example, the sequence logs the message for simplicity, but in a real-world use case, this can include any message mediation logic. Since the RabbitMQ broker requires acknowledgment from the client that receives the message, you need to configure the `rabbitmq.accept` operation to acknowledge the message after processing. You can configure this operation anywhere in the message injecting sequence based on when you want to acknowledge the message and notify the RabbitMQ broker to remove it from the queue, indicating successful processing. For more information on message acknowledgment, refer to the [RabbitMQ (AMQP 1.0) Connector reference documentation - Message Acknowledgment Operations Section]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-reference/#message-acknowledgment-operations).
```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sequence name="successSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log category="INFO" logMessageID="false" logFullPayload="false">
           <message>${payload}</message>
       </log>
       <rabbitmq.accept>
           <responseVariable>rabbitmq_accept_1</responseVariable>
           <overwriteBody>false</overwriteBody>
       </rabbitmq.accept>
   </sequence> 
```

3. Create another sequence to handle errors that occur during message processing. Similar to the message injecting sequence, this example logs the message for simplicity, but in a real-world use case, this can include error handling and recovery logic. Since the RabbitMQ broker requires acknowledgment, you need to configure either the `rabbitmq.discard` operation or the `rabbitmq.requeue` operation to negatively acknowledge the message. You can configure this operation anywhere in the error sequence based on when you want to acknowledge the failure and notify the RabbitMQ broker to either discard or requeue the message. For more information on message acknowledgment, refer to the [RabbitMQ (AMQP 1.0) Connector reference documentation - Message Acknowledgment Operations Section]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-reference/#message-acknowledgment-operations).
```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sequence name="errorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log category="INFO" logMessageID="false" logFullPayload="false">
           <message>${payload}</message>
       </log>
       <rabbitmq.discard>
           <responseVariable>rabbitmq_discard_1</responseVariable>
           <overwriteBody>false</overwriteBody>
       </rabbitmq.discard>
   </sequence>
```
4. Then, go to the **Add Artifact** section and select **Event Integration**.

    <img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq-inbound/AddEventIntegration.png" title="Add an Event Integration" width="800" alt="Add an Event Integration"/>

5. Create an **RabbitMQ (AMQP 1.0) Inbound Endpoint**.

    <img src="{{base_path}}/assets/img/integrate/connectors/rabbitmq-inbound/AddRabbitMQInbound.png" title="Create RabbitMQ Inbound Endpoint" width="800" alt="Create RabbitMQ Inbound Endpoint"/>

6. Enter the following values in the form and click **Create**.

      * **Inbound Functional:**
        * **Event Integration Name**: `RabbitMQInboundEP`
        * **Injecting Sequence Name**: `successSeq`
        * **Error Sequence Name**: `errorSeq`
        * **Execute Sequentially**: `true`
        * **Coordination**: `true`
      * **Basic :**
        * **Server Hosts**: `localhost`
        * **Server Ports**: `5672`
        * **Queue Name**: `notification-queue`
        * **Queue Type**: `QUORUM`
        * **Queue AutoDeclare**: `true`
        * **Exchange Name**: `notification-exchange`
        * **Exchange Type**: `DIRECT`
        * **Exchange Auto Declare**: `true`
        * **Routing Key**: `notification-routing-key`
      * **User Authentication:**
         * **SASL Mechanism**: `PLAIN`
         * **OAuth2 Enabled**: `false`
         * **Server UserName**: `guest`
         * **Server Password**: `guest`

    The source view of the created inbound endpoint is shown below. For detailed descriptions of each parameter, please refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint reference documentation]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-reference).

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="RabbitMQInboundEP" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="successSeq" onError="errorSeq" suspend="false">
        <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.behavior">eventBased</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="rabbitmq.server.host.name">localhost</parameter>
            <parameter name="rabbitmq.server.port">5672</parameter>
            <parameter name="rabbitmq.queue.name">notification-queue</parameter>
            <parameter name="rabbitmq.queue.type">QUORUM</parameter>
            <parameter name="rabbitmq.queue.auto.declare">true</parameter>
            <parameter name="rabbitmq.exchange.name">notification-exchange</parameter>
            <parameter name="rabbitmq.exchange.type">DIRECT</parameter>
            <parameter name="rabbitmq.exchange.auto.declare">true</parameter>
            <parameter name="rabbitmq.routing.key">notification-routing-key</parameter>
            <parameter name="rabbitmq.connection.sasl.mechanism">PLAIN</parameter>
            <parameter name="rabbitmq.connection.oauth2.enabled">false</parameter>
            <parameter name="rabbitmq.server.user.name">guest</parameter>
            <parameter name="rabbitmq.server.password">guest</parameter>
            <parameter name="rabbitmq.connection.idle.timeout">60000</parameter>
            <parameter name="rabbitmq.connection.recovery.policy.type">FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</parameter>
            <parameter name="rabbitmq.classic.dead.letter.strategy">NON_RETRYABLE_DISCARD</parameter>
            <parameter name="rabbitmq.queue.exclusive">false</parameter>
            <parameter name="rabbitmq.queue.auto.delete">false</parameter>
            <parameter name="rabbitmq.exchange.auto.delete">false</parameter>
            <parameter name="rabbitmq.stream.filter.match.unfiltered">false</parameter>
            <parameter name="rabbitmq.stream.offset.starting.strategy">NEXT</parameter>
            <parameter name="rabbitmq.stream.offset.tracker.flush.interval">10</parameter>
            <parameter name="rabbitmq.stream.offset.tracker.shutdown.timeout">5</parameter>
            <parameter name="rabbitmq.connection.ssl.enabled">false</parameter>
            <parameter name="rabbitmq.dead.letter.queue.type">CLASSIC</parameter>
            <parameter name="rabbitmq.dead.letter.queue.auto.declare">false</parameter>
            <parameter name="rabbitmq.dead.letter.exchange.type">DIRECT</parameter>
            <parameter name="rabbitmq.dead.letter.exchange.auto.declare">false</parameter>
            <parameter name="rabbitmq.throttle.enabled">false</parameter>
            <parameter name="rabbitmq.throttle.mode">BATCH</parameter>
            <parameter name="rabbitmq.throttle.timeUnit">MINUTE</parameter>
            <parameter name="rabbitmq.queue.overflow.strategy">DROP_HEAD</parameter>
            <parameter name="rabbitmq.auto.ack.enabled">false</parameter>
            <parameter name="rabbitmq.ack.wait.time">180000</parameter>
            <parameter name="rabbitmq.concurrent.consumers.count">1</parameter>
            <parameter name="rabbitmq.message.receiver.thread.pool.size">1</parameter>
            <parameter name="rabbitmq.consumer.initial.credit">1</parameter>
            <parameter name="rabbitmq.classic.override.requeue.with.discard">false</parameter>
        </parameters>
    </inboundEndpoint>
    ```      

## Export integration logic as a CApp

Follow the steps in the [Build and Export the Carbon Application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide to build and export the CApp to a specified location.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/RabbitMQMessageListener.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Run the Integration

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide or simply use the **Run** button in the Visual Studio Code extension to run the integration.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/deploy-run.png" title="Deploy and Run the Integration" width="500" alt="Deploy and Run the Integration"/>

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).


## Testing the Integration

You can manually publish messages to a RabbitMQ queue via the RabbitMQ management console. Refer to the [official RabbitMQ documentation](https://www.rabbitmq.com/docs/management) for guidance on accessing the management console. You can use the console to publish messages for testing purposes. However, this approach is not recommended for enterprise-level deployments.

Alternatively, you can use the [RabbitMQ (AMQP 1.0) Connector example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-example) to insert data programmatically. In this example, we will use the WSO2 MI RabbitMQ (AMQP 1.0) connector to insert data into the RabbitMQ queue.

1. Save the following payload as `data.json`:

       ```json
       {
          "queue": "notification-queue",
          "message": "Hello World!"
       }
       ```

2. Invoke the API using the following `curl` command:

   ```
   curl -X POST -d @data.json http://localhost:8290/publishmessage --header "Content-Type:application/json"
   ```

#### Expected Output

After inserting a record, you should see a log entry in the WSO2 Integrator: MI console similar to the following:

   ```
   [2026-02-13 18:32:39,526]  INFO {LogMediator} RabbitMQInboundEP-rabbitmq-inbound-listener-dispatcher-0 - {inboundendpoint:RabbitMQInboundEP} {"text":"Hello World!"}
   ```
