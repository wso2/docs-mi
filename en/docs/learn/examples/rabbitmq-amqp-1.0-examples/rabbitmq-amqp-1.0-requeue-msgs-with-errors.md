# How to Requeue a Message Preserving the Order Using RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint

This example demonstrates how WSO2 Integrator: MI can ensure guaranteed delivery of messages by requeueing messages when an error occurs during processing, using the RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint.

As shown in the following example, the WSO2 Integrator: MI first consumes the request message from the RabbitMQ queue via the RabbitMQ (AMQP 1.0) Inbound Endpoint and sends it to the backend HTTP endpoint. If the HTTP endpoint becomes unavailable, the message is released back to the `student-registration` queue in the RabbitMQ broker using the AMQP 1.0 `Released` outcome until the endpoint becomes available again. You can configure the **Requeue Delay** (rabbitmq.message.requeue.delay) under the **Other** section of the RabbitMQ (AMQP 1.0) inbound endpoint configuration to specify the delay between each requeue attempt. For **Quorum** queue types, the message is dropped/dead lettered after reaching the delivery limit. However, with **Classic** queues, the message is requeued indefinitely until it is successfully processed.


<img src="{{base_path}}/assets/img/integrate/rabbitmq-amqp-1.0/rabbitmq_amqp_1.0_requeue-msgs-with-errors.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

=== "RabbitMQ Consumer"
    ```xml

        <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQStudentRegEP" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="studentRegProcessingSeq" onError="studentRegErrorSeq" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="inbound.behavior">eventBased</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="rabbitmq.server.host.name">localhost</parameter>
                <parameter name="rabbitmq.server.port">5672</parameter>
                <parameter name="rabbitmq.queue.name">student-registration</parameter>
                <parameter name="rabbitmq.queue.type">QUORUM</parameter>
                <parameter name="rabbitmq.queue.auto.declare">true</parameter>
                <parameter name="rabbitmq.exchange.name">student-registration-exchange</parameter>
                <parameter name="rabbitmq.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.exchange.auto.declare">true</parameter>
                <parameter name="rabbitmq.routing.key">student-registration</parameter>
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
                <parameter name="rabbitmq.message.requeue.delay">6000</parameter>
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
    <sequence name="studentRegProcessingSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <call>
            <endpoint>
                <http method="POST" uri-template="http://localhost:8280/students-backend"/>
            </endpoint>
        </call>
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message>Student registration processed successfully.</message>
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
    <sequence name="studentRegErrorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message>Could not process the student registration. Requeueing message.</message>
        </log>
        <rabbitmq.requeue>
            <responseVariable>rabbitmq_requeue_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.requeue>
    </sequence>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

3. Create the **Message Inject Sequence** named `studentRegProcessingSeq` using the **RabbitMQ Consumer - Message Inject Sequence** configuration given above.
4. Create the **Error Sequence** named `studentRegErrorSeq` using the **RabbitMQ Consumer - Error Sequence** configuration given above.
5. Create the **Inbound Endpoint** named `RabbitMQStudentRegEP` using the **RabbitMQ Consumer** configuration given above, and configure it to inject messages into the `studentRegProcessingSeq` sequence and handle errors via the `studentRegErrorSeq` sequence. Refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint.
6. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.
7. Make the `http://localhost:8280/students-backend` endpoint unavailable temporarily.
8. Make sure you have a RabbitMQ broker instance running.
9. Publish a message to the `student-registration` queue.
10. You will see that the message is requeued and redelivered until the endpoint becomes available.
