# How to Publish and Subscribe with RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint

This example demonstrates how to implement a publish-subscribe messaging scenario using WSO2 Integrator: MI with the RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint, leveraging a FANOUT exchange in a RabbitMQ broker instance.

As illustrated below, a REST API configured in WSO2 Integrator: MI publishes messages to a RabbitMQ FANOUT exchange via the RabbitMQ (AMQP 1.0) Connector publishMessage operation. These messages are then broadcast to multiple RabbitMQ (AMQP 1.0) Inbound Endpoints configured in WSO2 Integrator: MI, each consuming from a separate queue bound to the same exchange.

<img src="{{base_path}}/assets/img/integrate/rabbitmq-amqp-1.0/rabbitmq_amqp_1.0_pub-sub.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

=== "RabbitMQ Subscriber 1"
    ```xml

        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQSubscriber1" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="successSeq1" onError="errorSeq1" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.behavior">eventBased</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="rabbitmq.server.host.name">localhost</parameter>
            <parameter name="rabbitmq.server.port">5672</parameter>
            <parameter name="rabbitmq.queue.name">queue2</parameter>
            <parameter name="rabbitmq.queue.type">QUORUM</parameter>
            <parameter name="rabbitmq.queue.auto.declare">true</parameter>
            <parameter name="rabbitmq.exchange.name">notifications-exchange</parameter>
            <parameter name="rabbitmq.exchange.type">FANOUT</parameter>
            <parameter name="rabbitmq.exchange.auto.declare">true</parameter>
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
=== "RabbitMQ Subscriber 1 - Message Inject Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="successSeq1" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <rabbitmq.accept>
            <responseVariable>rabbitmq_accept_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.accept>
    </sequence>
    ```
=== "RabbitMQ Subscriber 1 - Error Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="errorSeq1" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message></message>
        </log>
        <rabbitmq.discard>
            <responseVariable>rabbitmq_discard_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.discard>
    </sequence>
    ```

=== "RabbitMQ Subscriber 2"
    ```xml

        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQSubscriber2" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="successSeq2" onError="errorSeq2" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.behavior">eventBased</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="rabbitmq.server.host.name">localhost</parameter>
            <parameter name="rabbitmq.server.port">5672</parameter>
            <parameter name="rabbitmq.queue.name">queue3</parameter>
            <parameter name="rabbitmq.queue.type">QUORUM</parameter>
            <parameter name="rabbitmq.queue.auto.declare">true</parameter>
            <parameter name="rabbitmq.exchange.name">notifications-exchange</parameter>
            <parameter name="rabbitmq.exchange.type">FANOUT</parameter>
            <parameter name="rabbitmq.exchange.auto.declare">true</parameter>
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
=== "RabbitMQ Subscriber 2 - Message Inject Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="successSeq2" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <rabbitmq.accept>
            <responseVariable>rabbitmq_accept_2</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.accept>
    </sequence>
    ```
=== "RabbitMQ Subscriber 2 - Error Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="errorSeq2" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message></message>
        </log>
        <rabbitmq.discard>
            <responseVariable>rabbitmq_discard_2</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.discard>
    </sequence>
    ```

=== "RabbitMQ Publisher"
    ```xml

        <api context="/publishmessage" name="PublishMessage" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <rabbitmq.publishMessage configKey="RabbitMQConnection">
                        <headers>[]</headers>
                        <requestBodyType>XML</requestBodyType>
                        <requestBodyXml>${xpath('$body/node()')}</requestBodyXml>
                        <requestCharSet></requestCharSet>
                        <queue></queue>
                        <queueAutoDeclare>false</queueAutoDeclare>
                        <queueType>QUORUM</queueType>
                        <queueArguments></queueArguments>
                        <deliveryLimit></deliveryLimit>
                        <deadLetterStrategy></deadLetterStrategy>
                        <queueAutoDelete>false</queueAutoDelete>
                        <queueOverflowStrategy>DROP_HEAD</queueOverflowStrategy>
                        <exchange>notifications-exchange</exchange>
                        <exchangeAutoDeclare>false</exchangeAutoDeclare>
                        <exchangeType>FANOUT</exchangeType>
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

=== "RabbitMQ Publisher - Connection Configuration"

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

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

3. Create the **Message Inject Sequence** named `successSeq1` using the **RabbitMQ Subscriber 1 - Message Inject Sequence** configuration given above.
4. Create the **Error Sequence** named `errorSeq1` using the **RabbitMQ Subscriber 1 - Error Sequence** configuration given above.
5. Create the **Inbound Endpoint** named `RabbitMQSubscriber1` using the **RabbitMQ Subscriber 1** configuration given above, and configure it to inject messages into the `successSeq1` sequence and handle errors via the `errorSeq1` sequence. Refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint.
6. Create the **Message Inject Sequence** named `successSeq2` using the **RabbitMQ Subscriber 2 - Message Inject Sequence** configuration given above.
7. Create the **Error Sequence** named `errorSeq2` using the **RabbitMQ Subscriber 2 - Error Sequence** configuration given above.
8. Create the **Inbound Endpoint** named `RabbitMQSubscriber2` using the **RabbitMQ Subscriber 2** configuration given above, and configure it to inject messages into the `successSeq2` sequence and handle errors via the `errorSeq2` sequence.
9. Create the [Rest API]({{base_path}}/develop/creating-artifacts/creating-an-api/) named `PublishMessage` with context `/publishmessage` using the **RabbitMQ Publisher** configuration given above, including the RabbitMQ (AMQP 1.0) Connector Publish Message Operation in the inSequence.
10. Before creating the Rest API, make sure to create the local entry for the RabbitMQ connection configuration using the **RabbitMQ Publisher - Connection Configuration** given above. Refer the [RabbitMQ (AMQP 1.0) Connector Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Connector PublishMessage Operation.
11. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.
12. Make sure you have a RabbitMQ broker instance running.
13. Send the following payload as an HTTP POST request to `http://localhost:8290/publishmessage`:

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
