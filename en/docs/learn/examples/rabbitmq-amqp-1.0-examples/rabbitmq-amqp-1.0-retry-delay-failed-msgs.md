# How to Retry Failed Messages with a Delay Using RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint

This example demonstrates how WSO2 Integrator: MI can guarantee message delivery to an endpoint by controlling the number of delivery retries during errors, using the RabbitMQ (AMQP 1.0) Connector and Inbound Endpoint. A delay between retries is enforced via the RabbitMQ Dead Letter Exchange (DLX) mechanism with message TTL. 

This mechanism is supported only for **Classic** queues. For **Quorum** queues, RabbitMQ provides a built-in broker-level retry mechanism that automatically handles failed messages through requeuing, with configurable requeue delays and maximum requeue attempts. As a result, the application or integration logic does not need to implement custom retry or delay handling when using Quorum queues. Additionally, the **Stream** queue type is not suitable for this use case because it does not support Dead Letter Exchange (DLX) functionality or message acknowledgments, both of which are essential for implementing delayed retry mechanisms. To take advantage of the native retry capabilities when using **Quorum** queues, the RabbitMQ (AMQP 1.0) endpoint provides the ability to configure the maximum requeue attempts by setting the **Delivery Limit** under the **Queue Properties** section. The **Requeue Delay** can be specified in the **Other** section of the endpoint configuration, allowing complete control over the broker-managed retry behavior directly through the endpoint parameters.

The most important requirement is that when configuring the RabbitMQ (AMQP 1.0) inbound endpoint, under **Queue Properties**, you must set the **Classic Queue Dead Letter Strategy** (`rabbitmq.classic.dead.letter.strategy`) to **`FIXED_DELAY_RETRYABLE_DISCARD`** for this mechanism to work correctly. 

As illustrated below:

1. A REST API configured in WSO2 Integrator: MI receives an HTTP request and publishes the enrollment message to the `enrollment-exchange` via the RabbitMQ (AMQP 1.0) Connector `publishMessage` operation. RabbitMQ routes the message to the `enrollment` queue.
2. The RabbitMQ (AMQP 1.0) Inbound Endpoint in WSO2 Integrator: MI consumes the message from the `enrollment` queue and attempts to deliver it to the Enrollment Backend.
3. If the backend call **succeeds**, the `rabbitmq.accept` operation sends the AMQP 1.0 `Accepted` outcome, acknowledging the message.
4. If the backend call **fails**, the `rabbitmq.discard` operation sends the AMQP 1.0 `Rejected` outcome. RabbitMQ routes the message to the dead letter exchange (`enrollment-error-exchange`), which delivers it to the `enrollment-error` queue.
5. The `enrollment-error` queue has a configured TTL (`x-message-ttl` of 60 s). After the TTL expires, the message is routed back to the `enrollment-exchange` for another delivery attempt, enforcing the retry delay.
6. The connector tracks how many times a message has been dead-lettered. If the count has **not** exceeded `rabbitmq.max.dead.lettered.count` (3), the message is discarded again for a further DLX retry. Once the maximum is exceeded, the connector attempts to publish the message to the final dead letter queue (`enrollment-final-error`) and then accepts the original message. If that final-DLQ publish itself fails, the connector retries it internally before giving up.

<img src="{{base_path}}/assets/img/integrate/rabbitmq-amqp-1.0/rabbitmq_amqp_1.0_retry-delay-failed-msgs.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

=== "RabbitMQ Consumer"
    
    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
        <inboundEndpoint name="RabbitMQEnrollmentEP" class="org.wso2.carbon.inbound.rabbitmq.RabbitMQListener" sequence="enrollmentProcessingSeq" onError="enrollmentErrorSeq" suspend="false">
            <parameters xmlns="http://ws.apache.org/ns/synapse">
                <parameter name="inbound.behavior">eventBased</parameter>
                <parameter name="sequential">true</parameter>
                <parameter name="coordination">true</parameter>
                <parameter name="rabbitmq.server.host.name">localhost</parameter>
                <parameter name="rabbitmq.server.port">5672</parameter>
                <parameter name="rabbitmq.queue.name">enrollment</parameter>
                <parameter name="rabbitmq.queue.type">CLASSIC</parameter>
                <parameter name="rabbitmq.queue.auto.declare">false</parameter>
                <parameter name="rabbitmq.exchange.name">enrollment-exchange</parameter>
                <parameter name="rabbitmq.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.exchange.auto.declare">false</parameter>
                <parameter name="rabbitmq.routing.key">enrollment</parameter>
                <parameter name="rabbitmq.connection.sasl.mechanism">PLAIN</parameter>
                <parameter name="rabbitmq.connection.oauth2.enabled">false</parameter>
                <parameter name="rabbitmq.server.user.name">guest</parameter>
                <parameter name="rabbitmq.server.password">guest</parameter>
                <parameter name="rabbitmq.connection.idle.timeout">60000</parameter>
                <parameter name="rabbitmq.connection.recovery.policy.type">FIXED_WITH_INITIAL_DELAY_AND_TIMEOUT</parameter>
                <parameter name="rabbitmq.classic.dead.letter.strategy">FIXED_DELAY_RETRYABLE_DISCARD</parameter>
                <parameter name="rabbitmq.queue.exclusive">false</parameter>
                <parameter name="rabbitmq.queue.auto.delete">false</parameter>
                <parameter name="rabbitmq.exchange.auto.delete">false</parameter>
                <parameter name="rabbitmq.stream.filter.match.unfiltered">false</parameter>
                <parameter name="rabbitmq.stream.offset.starting.strategy">NEXT</parameter>
                <parameter name="rabbitmq.stream.offset.tracker.flush.interval">10</parameter>
                <parameter name="rabbitmq.stream.offset.tracker.shutdown.timeout">5</parameter>
                <parameter name="rabbitmq.connection.ssl.enabled">false</parameter>
                <parameter name="rabbitmq.dead.letter.queue.name">enrollment-error</parameter>
                <parameter name="rabbitmq.dead.letter.queue.type">CLASSIC</parameter>
                <parameter name="rabbitmq.dead.letter.queue.auto.declare">false</parameter>
                <parameter name="rabbitmq.dead.letter.exchange.name">enrollment-error-exchange</parameter>
                <parameter name="rabbitmq.dead.letter.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.dead.letter.exchange.auto.declare">false</parameter>
                <parameter name="rabbitmq.dead.letter.routing.key">enrollment-error</parameter>
                <parameter name="rabbitmq.max.dead.lettered.count">3</parameter>
                <parameter name="rabbitmq.final.dead.letter.queue.name">enrollment-final-error</parameter>
                <parameter name="rabbitmq.final.dead.letter.queue.type">CLASSIC</parameter>
                <parameter name="rabbitmq.final.dead.letter.queue.auto.declare">false</parameter>
                <parameter name="rabbitmq.final.dead.letter.exchange.name">enrollment-final-error-exchange</parameter>
                <parameter name="rabbitmq.final.dead.letter.exchange.type">DIRECT</parameter>
                <parameter name="rabbitmq.final.dead.letter.exchange.auto.declare">false</parameter>
                <parameter name="rabbitmq.final.dead.letter.routing.key">enrollment-final-error</parameter>
                <parameter name="rabbitmq.dead.letter.publisher.retry.interval">10000</parameter>
                <parameter name="rabbitmq.dead.letter.publisher.retry.count">5</parameter>
                <parameter name="rabbitmq.dead.letter.publisher.retry.exponential.factor">2.0</parameter>
                <parameter name="rabbitmq.dead.letter.publisher.ack.wait.time">30000</parameter>
                <parameter name="rabbitmq.dead.letter.publisher.shutdown.timeout">180000</parameter>
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
     
=== "RabbitMQ Consumer - Message Inject Sequence"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="enrollmentProcessingSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="true">
            <message></message>
        </log>
        <call>
            <endpoint>
                <http method="POST" uri-template="http://localhost:8280/enrollment-backend"/>
            </endpoint>
        </call>
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message>Enrollment processed successfully.</message>
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
    <sequence name="enrollmentErrorSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" logMessageID="false" logFullPayload="false">
            <message>Could not process the enrollment. Discarding message for DLX retry.</message>
        </log>
        <rabbitmq.discard>
            <responseVariable>rabbitmq_discard_1</responseVariable>
            <overwriteBody>false</overwriteBody>
        </rabbitmq.discard>
    </sequence>
    ```

=== "RabbitMQ Producer"

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/enrollment" name="EnrollmentAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <rabbitmq.publishMessage configKey="RabbitMQConnection">
                    <headers>[]</headers>
                    <requestBodyType>XML</requestBodyType>
                    <requestBodyXml>${xpath('$body/node()')}</requestBodyXml>
                    <requestCharSet></requestCharSet>
                    <queue>enrollment</queue>
                    <queueAutoDeclare>false</queueAutoDeclare>
                    <queueType>CLASSIC</queueType>
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
                    <exchange>enrollment-exchange</exchange>
                    <exchangeAutoDeclare>false</exchangeAutoDeclare>
                    <exchangeType>DIRECT</exchangeType>
                    <routingKey>enrollment</routingKey>
                    <exchangeArguments></exchangeArguments>
                    <headerExchangeArguments></headerExchangeArguments>
                    <exchangeAutoDelete>false</exchangeAutoDelete>
                    <publishTimeout>60000</publishTimeout>
                    <publisherConfirms>true</publisherConfirms>
                    <responseVariable>rabbitmq_publishMessage_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </rabbitmq.publishMessage>
    
                <payloadFactory media-type="json" template-type="default">
                    <format>${vars.rabbitmq_publishMessage_1.payload}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>

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

## Build and run

Make sure you have a RabbitMQ broker instance running.

!!! Tip
      If you are working with Windows or your machine does not already have `rabbitmqadmin`, you can [download](https://www.rabbitmq.com/docs/management-cli#obtaining-rabbitmqadmin) it before proceeding with the next steps.

      Furthermore, when working with Windows, you may need to provide the arguments as a JSON string as shown below.
      
      ```
      arguments="{\"x-dead-letter-exchange\": \"enrollment-error-exchange\", \"x-dead-letter-routing-key\": \"enrollment-error\"}"
      ```

1. Declare the exchange to route enrollment messages.
    ```bash
    rabbitmqadmin declare exchange --vhost=/ --user=guest --password=guest name=enrollment-exchange type=direct durable=true
    ```

2. Declare a queue to store enrollment messages with DLX and dead-letter routing key configured to handle failures.
    ```bash
    rabbitmqadmin declare queue --vhost=/ --user=guest --password=guest name=enrollment durable=true arguments='{"x-dead-letter-exchange": "enrollment-error-exchange", "x-dead-letter-routing-key": "enrollment-error"}'
    ```

3. Bind the `enrollment` queue to `enrollment-exchange`.
    ```bash
    rabbitmqadmin declare binding --vhost=/ --user=guest --password=guest source=enrollment-exchange destination=enrollment routing_key=enrollment
    ```

4. Declare the dead letter exchange to route failed enrollment messages.
    ```bash
    rabbitmqadmin declare exchange --vhost=/ --user=guest --password=guest name=enrollment-error-exchange type=direct durable=true
    ```

5. Declare the delay queue with DLX, dead-letter routing key, and TTL to enforce the retry delay.
    ```bash
    rabbitmqadmin declare queue --vhost=/ --user=guest --password=guest name=enrollment-error durable=true arguments='{"x-dead-letter-exchange": "enrollment-exchange", "x-dead-letter-routing-key": "enrollment", "x-message-ttl": 60000}'
    ```

6. Bind the `enrollment-error` queue to `enrollment-error-exchange`.
     ```bash
     rabbitmqadmin declare binding --vhost=/ --user=guest --password=guest source=enrollment-error-exchange destination=enrollment-error routing_key=enrollment-error
     ```
7. Declare the final dead letter exchange.
    ```bash
     rabbitmqadmin declare exchange --vhost=/ --user=guest --password=guest name=enrollment-final-error-exchange type=direct durable=true
    ```
8. Declare the final dead letter queue where messages are moved after exhausting all retries.
     ```bash
      rabbitmqadmin declare queue --vhost=/ --user=guest --password=guest name=enrollment-final-error durable=true
     ```
9. Bind the `enrollment-final-error` queue to `enrollment-final-error-exchange`.
    ```bash
      rabbitmqadmin declare binding --vhost=/ --user=guest --password=guest source=enrollment-final-error-exchange destination=enrollment-final-error routing_key=enrollment-final-error
    ```
   
Create the artifacts:

{!includes/build-and-run.md!}

3. Create the **Message Inject Sequence** named `enrollmentProcessingSeq` using the **RabbitMQ Consumer - Message Inject Sequence** configuration given above.
4. Create the **Error Sequence** named `enrollmentErrorSeq` using the **RabbitMQ Consumer - Error Sequence** configuration given above.
5. Create the **Inbound Endpoint** named `RabbitMQEnrollmentEP` using the **RabbitMQ Consumer** configuration given above, and configure it to inject messages into the `enrollmentProcessingSeq` sequence and handle errors via the `enrollmentErrorSeq` sequence. Refer to the [RabbitMQ (AMQP 1.0) Inbound Endpoint Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-inbound-endpoint-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Inbound Endpoint.
6. Before creating the REST API, create the local entry for the RabbitMQ connection using the **RabbitMQ Producer - Connection Configuration** given above. Refer to the [RabbitMQ (AMQP 1.0) Connector Example]({{base_path}}/reference/connectors/rabbitmq-amqp-1.0-connector/rabbitmq-amqp-1.0-connector-example/) for more information regarding configuring the RabbitMQ (AMQP 1.0) Connector `publishMessage` operation.
7. Create the [REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) named `EnrollmentAPI` with context `/enrollment` using the **RabbitMQ Producer** configuration given above.
8. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.
9. Make the `http://localhost:8280/enrollment-backend` backend endpoint unavailable temporarily to simulate failures.
10. Send the following payload as an HTTP POST request to `http://localhost:8290/enrollment`:

    ```xml
    <Enrollment>
        <Name>John Doe</Name>
        <Course>WSO2 Integration</Course>
    </Enrollment>
    ```
    Sample CURL Request:
    
    ```
    curl --location 'http://localhost:8290/enrollment' \
    --header 'Content-Type: application/xml' \
    --data '<Enrollment>
    <Name>John Doe</Name>
    <Course>WSO2 Integration</Course>
    </Enrollment>'
    ```

11. You will see that the failed message is retried 3 times with a 60-second delay between each attempt (enforced by the `enrollment-error` queue TTL), and then moved to the `enrollment-final-error` queue once the maximum retry count is exceeded.
