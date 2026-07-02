# How to Implement Point to Point Messaging Using RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint

This example demonstrates how to implement an asynchronous point-to-point messaging scenario
using WSO2 Integrator: MI with the RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint,
leveraging queues in a RabbitMQ broker instance.

As illustrated below, a REST API configured in WSO2 Integrator: MI publishes messages to a
RabbitMQ queue via the RabbitMQ (AMQP 1.0) Connector publishMessage operation. These messages
are then consumed by the RabbitMQ (AMQP 1.0) Inbound Endpoint configured in WSO2 Integrator: MI.

<img src="{{base_path}}/assets/img/integrate/rabbitmq-amqp-1.0/rabbitmq_amqp_1.0_point-to-point.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.


=== "RabbitMQ Consumer"
    ```xml
    
        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQInboundEP" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="successSeq" onError="errorSeq" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.behavior">eventBased</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="rabbitmq.server.host.name">localhost</parameter>
            <parameter name="rabbitmq.server.port">5672</parameter>
            <parameter name="rabbitmq.queue.name">queue1</parameter>
            <parameter name="rabbitmq.queue.type">QUORUM</parameter>
            <parameter name="rabbitmq.queue.auto.declare">true</parameter>
            <parameter name="rabbitmq.exchange.name">exchange1</parameter>
            <parameter name="rabbitmq.exchange.type">DIRECT</parameter>
            <parameter name="rabbitmq.exchange.auto.declare">true</parameter>
            <parameter name="rabbitmq.routing.key">routing-key1</parameter>
            <parameter name="rabbitmq.connection.sasl.mechanism">PLAIN</parameter>
            <parameter name="rabbitmq.connection.oauth2.enabled">false</parameter>
            <parameter name="rabbitmq.server.user.name">guest</parameter>
            <parameter name="rabbitmq.server.password">guest</parameter>
            <parameter name="rabbitmq.connection.idle.timeout">60000</parameter>
            <parameter name="rabbitmq.connection.recovery.policy.type">FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</parameter>
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
        </parameters>
    </inboundEndpoint>
    ```
=== "RabbitMQ Consumer - Message Inject Sequence"

    ```xml
    
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="successSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <rabbitmq.accept>
            <responseVariable>rabbitmq_accept_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.accept>
    </sequence>
    ```
=== "RabbitMQ Consumer - Error Sequence"

    ```xml
    
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="errorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message></message>
        </log>
        <rabbitmq.discard>
            <responseVariable>rabbitmq_discard_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.discard>
    </sequence>
    ```
=== "RabbitMQ Producer - Connection Configuration"

    ```xml

     <?xml version="1.0" encoding="UTF-8"?>
     <localEntry key="RabbitMQConnection" xmlns="http://ws.apache.org/ns/synapse">
      <rabbitmq.init>
        <connectionType>RABBITMQ</connectionType>
        <serverUrls>localhost:5672</serverUrls>
        <saslMechanism>PLAIN</saslMechanism>
        <username>guest</username>
        <password>guest</password>
        <connectionRecoveryPolicyType>FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</connectionRecoveryPolicyType>
        <name>RabbitMQConnection</name>
      </rabbitmq.init>
    </localEntry>
    ```
=== "RabbitMQ Producer"


    ```xml

      <api context="/publishmessage" name="PublishMessage" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <rabbitmq.publishMessage configKey="RabbitMQConnection">
                        <headers>[]</headers>
                        <requestBodyType>XML</requestBodyType>
                        <requestBodyXml>${xpath('$body/node()')}</requestBodyXml>
                        <requestCharSet></requestCharSet>
                        <queue>queue1</queue>
                        <queueAutoDeclare>false</queueAutoDeclare>
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
                <payloadFactory  media-type="json" template-type="default">
                <format>${vars.rabbitmq_publishMessage_1.payload}</format>
                    </payloadFactory>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
     </api>
    ```

    
## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

3. Create the **Message Inject Sequence** named `successSeq` using the **RabbitMQ Consumer - Message Inject Sequence** configuration given above.
4. Create the **Error Sequence** named `errorSeq` using the **RabbitMQ Consumer - Error Sequence** configuration given above.
5. Create the **Inbound Endpoint** named `RabbitMQInboundEP` using the **RabbitMQ Consumer** configuration given above, and configure it to inject messages into the `successSeq` sequence and handle errors via the `errorSeq` sequence. Refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint.
6. Before creating the Rest API, make sure to create the local entry for the RabbitMQ connection configuration using the **RabbitMQ Producer - Connection Configuration** given above. Refer the [RabbitMQ (AMQP 1.0) Connector Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Connector PublishMessage Operation.
7. Create the [Rest API]({{base_path}}/develop/creating-artifacts/creating-an-api/) named `PublishMessage` with context `/publishmessage` using the **RabbitMQ Producer** configuration given above, including the RabbitMQ (AMQP 1.0) Connector Publish Message Operation in the inSequence.
8. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.
9. Make sure you have a RabbitMQ broker instance running.
10. Send the following payload as an HTTP POST request to `http://localhost:8290/publishmessage`:

    ```xml
    <Message>
    <Name>John Doe</Name>
    <Age>27</Age>
    </Message>
    ```
    Sample CURL request:

    
    ```
    curl --location 'http://localhost:8290/publishmessage' \
    --header 'Content-Type: application/xml' \
    --data '<Message>
    <Name>John Doe</Name>
    <Age>27</Age>
    </Message>'
    
    ```
