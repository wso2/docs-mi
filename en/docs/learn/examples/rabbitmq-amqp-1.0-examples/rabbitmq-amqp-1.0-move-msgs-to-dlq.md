# How to Move Unprocessed Messages to a Dead Letter Queue Using RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint

This example demonstrates how WSO2 Integrator: MI can ensure guaranteed delivery of messages by using the Dead Letter Exchange (DLX) of RabbitMQ with the RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint.

As shown below, the RabbitMQ (AMQP 1.0) Inbound Endpoint in WSO2 Integrator: MI consumes messages from the RabbitMQ broker and sends them to a backend endpoint. If message processing fails, the WSO2 Integrator: MI discards the message using the AMQP 1.0 `Rejected` outcome, which causes RabbitMQ to route it to the configured Dead Letter Exchange (DLX).

<img src="{{base_path}}/assets/img/integrate/rabbitmq-amqp-1.0/rabbitmq_amqp_1.0_move-msgs-to-dlq.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

=== "RabbitMQ Consumer"
    ```xml

        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQOrdersEP" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="ordersProcessingSeq" onError="ordersErrorSeq" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="inbound.behavior">eventBased</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="rabbitmq.server.host.name">localhost</parameter>
                <parameter name="rabbitmq.server.port">5672</parameter>
                <parameter name="rabbitmq.queue.name">orders</parameter>
                <parameter name="rabbitmq.queue.type">QUORUM</parameter>
                <parameter name="rabbitmq.queue.auto.declare">false</parameter>
                <parameter name="rabbitmq.exchange.name">orders-exchange</parameter>
                <parameter name="rabbitmq.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.exchange.auto.declare">false</parameter>
                <parameter name="rabbitmq.routing.key">orders</parameter>
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
                <parameter name="rabbitmq.dead.letter.queue.name">orders-error</parameter>
                <parameter name="rabbitmq.dead.letter.queue.type">CLASSIC</parameter>
                <parameter name="rabbitmq.dead.letter.queue.auto.declare">false</parameter>
                <parameter name="rabbitmq.dead.letter.exchange.name">orders-error-exchange</parameter>
                <parameter name="rabbitmq.dead.letter.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.dead.letter.exchange.auto.declare">false</parameter>
                <parameter name="rabbitmq.dead.letter.routing.key">orders-error</parameter>
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
    <sequence name="ordersProcessingSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <call>
            <endpoint>
                <http method="POST" uri-template="http://localhost:8280/orders-backend"/>
            </endpoint>
        </call>
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message>Order processed successfully.</message>
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
    <sequence name="ordersErrorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message>Could not process the order. Moving to dead letter queue.</message>
        </log>
        <rabbitmq.discard>
            <responseVariable>rabbitmq_discard_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.discard>
    </sequence>
    ```

## Build and run

1. Make sure you have a RabbitMQ broker instance running.
2. Create an exchange with the name `orders-exchange` (type: DIRECT, durable: true).
3. Create another exchange `orders-error-exchange` (type: DIRECT, durable: true).
4. Create CLASSIC type queue `orders-error` (durable: true) and bind it to `orders-error-exchange` with routing key `orders-error`.
5. Create QUORUM type queue `orders` (durable: true) with a dead letter exchange configured to `orders-error-exchange` and dead letter routing key `orders-error`, then bind it to `orders-exchange` with routing key `orders`.

Create the artifacts:

{!includes/build-and-run.md!}

3. Create the **Message Inject Sequence** named `ordersProcessingSeq` using the **RabbitMQ Consumer - Message Inject Sequence** configuration given above.
4. Create the **Error Sequence** named `ordersErrorSeq` using the **RabbitMQ Consumer - Error Sequence** configuration given above.
5. Create the **Inbound Endpoint** named `RabbitMQOrdersEP` using the **RabbitMQ Consumer** configuration given above, and configure it to inject messages into the `ordersProcessingSeq` sequence and handle errors via the `ordersErrorSeq` sequence. Refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint.
6. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.
7. Make the `http://localhost:8280/orders-backend` endpoint unavailable temporarily.
8. Publish a message to the `orders` queue.
9. You will see that the failed message has been moved to the `orders-error` queue via the dead letter exchange.
