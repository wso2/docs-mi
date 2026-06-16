# How to Implement Request-Response (RPC) Messaging with RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint

This example demonstrates how to implement the request-response (RPC) messaging scenario using WSO2 Integrator: MI with the RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint.

As shown below, a REST API configured in WSO2 Integrator: MI sends an RPC request to a RabbitMQ queue via the RabbitMQ (AMQP 1.0) Connector sendRpc operation and waits for a response on a reply queue. The request is consumed by the RabbitMQ (AMQP 1.0) Inbound Endpoint, processed by calling a backend service, and the response is published back to the reply queue.

<img src="{{base_path}}/assets/img/integrate/rabbitmq-amqp-1.0/rabbitmq_amqp_1.0_request-response.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

=== "RabbitMQ RPC Server (Consumer)"
    ```xml

        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQRpcServerEP" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="orderProcessingSeq" onError="orderErrorSeq" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="inbound.behavior">eventBased</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="rabbitmq.server.host.name">localhost</parameter>
                <parameter name="rabbitmq.server.port">5672</parameter>
                <parameter name="rabbitmq.queue.name">order-request</parameter>
                <parameter name="rabbitmq.queue.type">QUORUM</parameter>
                <parameter name="rabbitmq.queue.auto.declare">false</parameter>
                <parameter name="rabbitmq.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.exchange.auto.declare">false</parameter>
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
=== "RabbitMQ RPC Server - Processing Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="orderProcessingSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <call blocking="true">
            <endpoint>
                <http method="POST" uri-template="http://localhost:8290/orders"/>
            </endpoint>
        </call>
        <rabbitmq.publishMessage configKey="RabbitMQConnection">
            <headers>[]</headers>
            <requestBodyType>JSON</requestBodyType>
            <requestBodyJson>${payload}</requestBodyJson>
            <requestCharSet></requestCharSet>
            <queue>order-reply</queue>
            <queueAutoDeclare>false</queueAutoDeclare>
            <queueType>QUORUM</queueType>
            <queueArguments></queueArguments>
            <maxPriority></maxPriority>
            <initialMemberCount></initialMemberCount>
            <deliveryLimit></deliveryLimit>
            <deadLetterStrategy></deadLetterStrategy>
            <maxAge></maxAge>
            <maxSegmentSize></maxSegmentSize>
            <queueExclusive>false</queueExclusive>
            <queueAutoDelete>false</queueAutoDelete>
            <queueOverflowStrategy>DROP_HEAD</queueOverflowStrategy>
            <exchange></exchange>
            <exchangeAutoDeclare>false</exchangeAutoDeclare>
            <exchangeType>DIRECT</exchangeType>
            <routingKey></routingKey>
            <exchangeArguments></exchangeArguments>
            <headerExchangeArguments></headerExchangeArguments>
            <exchangeAutoDelete>false</exchangeAutoDelete>
            <publishTimeout>60000</publishTimeout>
            <publisherConfirms>true</publisherConfirms>
            <responseVariable>rabbitmq_publishMessage_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.publishMessage>
    
        <rabbitmq.accept>
            <responseVariable>rabbitmq_accept_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.accept>
    </sequence>
    ```
=== "RabbitMQ RPC Server - Error Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="orderErrorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message></message>
        </log>
        <rabbitmq.discard>
            <responseVariable>rabbitmq_discard_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.discard>
    </sequence>
    ```

=== "RabbitMQ RPC Client"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
       <api context="/orderrequest" name="OrderRequestAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/">
                <inSequence>
                <rabbitmq.sendRpc configKey="RabbitMQConnection">
                    <headers>[]</headers>
                    <requestBodyType>JSON</requestBodyType>
                    <requestBodyJson>${payload}</requestBodyJson>
                    <responseBodyType>JSON</responseBodyType>
                    <requestCharSet></requestCharSet>
                    <responseCharSet></responseCharSet>
                    <queue>order-request</queue>
                    <queueAutoDeclare>true</queueAutoDeclare>
                    <queueType>QUORUM</queueType>
                    <queueArguments></queueArguments>
                    <deliveryLimit></deliveryLimit>
                    <deadLetterStrategy></deadLetterStrategy>
                    <queueAutoDelete>false</queueAutoDelete>
                    <queueOverflowStrategy>DROP_HEAD</queueOverflowStrategy>
                    <replyToQueue>order-reply</replyToQueue>
                    <replyToQueueAutoDeclare>true</replyToQueueAutoDeclare>
                    <replyToQueueType>QUORUM</replyToQueueType>
                    <replyToQueueArguments></replyToQueueArguments>
                    <replyToQueueDeliveryLimit></replyToQueueDeliveryLimit>
                    <replyToQueueDeadLetterStrategy></replyToQueueDeadLetterStrategy>
                    <replyToQueueAutoDelete>false</replyToQueueAutoDelete>
                    <replyToQueueOverflowStrategy>DROP_HEAD</replyToQueueOverflowStrategy>
                    <requestTimeout>60000</requestTimeout>
                    <responseVariable>rabbitmq_sendRpc_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </rabbitmq.sendRpc>
    
                    <payloadFactory media-type="json" template-type="default">
                        <format>${vars.rabbitmq_sendRpc_1.payload}</format>
                </payloadFactory>
                    <respond/>
            </inSequence>
                <faultSequence>
            </faultSequence>
            </resource>
      </api>
    ```

=== "RabbitMQ RPC/Publisher Client - Connection Configuration"

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

We can use the below synapse configuration to act as the mock backend called by the `orderProcessingSeq` sequence.

=== "Mock Orders Backend Service"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/orders" name="mockOrdersBackend" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/" >
            <inSequence>
                <property name="messageType" value="application/json" scope="axis2"/>
                <payloadFactory media-type="json">
                    <format>{"message":"Order created"}</format>
                    <args/>
                </payloadFactory><respond/>
            </inSequence>
            <faultSequence>
                <payloadFactory media-type="json">
                    <format>{"error":"Error processing order"}</format>
                    <args/>
                </payloadFactory>
                <respond/>
            </faultSequence>
        </resource>
    </api>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

3. Create the **Processing Sequence** named `orderProcessingSeq` using the **RabbitMQ RPC Server - Processing Sequence** configuration given above.
4. Create the **Error Sequence** named `orderErrorSeq` using the **RabbitMQ RPC Server - Error Sequence** configuration given above.
5. Create the **Inbound Endpoint** named `RabbitMQRpcServerEP` using the **RabbitMQ RPC Server (Consumer)** configuration given above, and configure it to inject messages into the `orderProcessingSeq` sequence and handle errors via the `orderErrorSeq` sequence. Refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint.
6. Create the [Rest API]({{base_path}}/develop/creating-artifacts/creating-an-api/) named `OrderRequestAPI` with context `/orderrequest` using the **RabbitMQ RPC Client** configuration given above.
7. Before creating the Rest API, make sure to create the local entry for the RabbitMQ connection configuration using the **RabbitMQ RPC/Publisher Client - Connection Configuration** given above. Refer the [RabbitMQ (AMQP 1.0) Connector Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Connector sendRpc Operation.
8. Optionally, create the **Mock Orders Backend Service** REST API to simulate the backend endpoint.
9. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.
10. Make sure you have a RabbitMQ broker instance running.
11. Send the following payload as an HTTP POST request to `http://localhost:8290/orderrequest`:

    ```json
    {
        "orderId": "1242",
        "orderQty": 43,
        "orderDate": "2020/07/22"
    }
    ```
    Sample CURL request:


    ```
    curl --location 'http://localhost:8290/orderrequest' \
         --header 'Content-Type: application/json' \
         --data '{
        "orderId": "1242",
        "orderQty": 43,
        "orderDate": "2020/07/22"
        }'
    
    ```
