# Consume transacted and publish in the same transaction

At the end of this guide a message consumed from Q.in and the message the sequence publishes to Q.out commit together, and a failure rolls both back.

## Steps

1. On the broker give Q.in three settings: a maximum redelivery count, a dead message queue, and max delivered unacknowledged messages per flow set to 1. Create Q.out.
2. Create the connection for the connector as in [use case 7]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-publish-with-confirmation/).
3. Create the sequence. The publish inside it runs on the worker's transacted producer, and the acknowledgement commits.

    ```xml
    <sequence name="orderTxSeq" xmlns="http://ws.apache.org/ns/synapse">
        <call blocking="false"><endpoint key="OrderBackend"/></call>
        <filter source="get-property('axis2', 'HTTP_SC')" regex="2\d\d">
            <then>
                <solace.publishMessage configKey="SOLACE_CONN">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.out</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <responseVariable>published</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <solace.acknowledgeMessage>
                    <responseVariable>ackResult</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.acknowledgeMessage>
            </then>
            <else>
                <solace.nackMessage>
                    <outcomeType>FAILED</outcomeType>
                    <responseVariable>nackResult</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.nackMessage>
            </else>
        </filter>
    </sequence>
    ```

4. Create the inbound endpoint with transacted true and autoAck false. Keep one worker on an exclusive queue.

    ```xml
    <parameter name="solace.destinationType">QUEUE</parameter>
    <parameter name="solace.destinationName">Q.in</parameter>
    <parameter name="solace.autoAck">false</parameter>
    <parameter name="solace.transacted">true</parameter>
    <parameter name="solace.concurrentConsumers">1</parameter>
    ```

5. Deploy and publish one message to Q.in.

## Verify

At start the endpoint logs the WARN that names the three queue settings, and the Solace client logs the INFO line about MaxDeliveredUnackedMessagesPerFlow at bind, which confirms the third setting is in place. After the publish, Q.out holds one message and Q.in is empty. The message appeared on Q.out only when the commit completed. Stop the backend and publish again: the fault sequence's nack rolls the transaction back, Q.out gets nothing, and the broker redelivers the message with the redelivery back off until the queue's cutoff moves it to the dead message queue. A backend answer other than 2xx rolls back the same way, through the nack in the sequence. The back off grows with the broker's delivery count only when the queue has delivery count enabled. Without it every rollback waits the initial delay. Publish a message that the sequence rejects: the same, since REJECTED is a rollback in this mode.

## Undo

Set transacted to false. The endpoint then settles each message on its own and the publish is a normal confirmed publish outside any transaction.
