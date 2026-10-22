# Nack and route to the dead message queue

At the end of this guide a message the sequence judges invalid goes to the dead message queue at once, and a message that fails for a passing reason is retried and only then dead lettered.

## Steps

1. On the broker give Q.orders a dead message queue, Q.orders.dmq, and a maximum redelivery count. REJECTED moves a message to the dead message queue. Without one the broker discards it.
2. In the sequence, decide between the two outcomes. REJECTED for an input that can never succeed, FAILED for a failure that a retry can cure.

    ```xml
    <sequence name="orderProcessSeq" xmlns="http://ws.apache.org/ns/synapse">
        <filter source="${payload.seats}" regex="^[1-9]$">
            <then>
                <call blocking="false"><endpoint key="OrderBackend"/></call>
                <solace.acknowledgeMessage>
                    <responseVariable>ackResult</responseVariable>
                </solace.acknowledgeMessage>
            </then>
            <else>
                <log category="WARN"><message>order rejected: seats out of range</message></log>
                <solace.nackMessage>
                    <outcomeType>REJECTED</outcomeType>
                    <responseVariable>nackResult</responseVariable>
                </solace.nackMessage>
            </else>
        </filter>
    </sequence>
    ```

3. Keep the fault sequence on FAILED, so an exception during the backend call is retried, and set solace.maxRedeliveries on the inbound endpoint to the number of attempts before the message is dead lettered.
4. Deploy and publish one invalid order, seats 12, and one valid order with the backend stopped.

## Verify

The invalid order is in Q.orders.dmq at once, the counters show decided.REJECTED 1 and settled.rejected 1. The valid order with the backend stopped is retried with the back off and reaches the dead message queue after the attempts, with decided.FAILED equal to the attempts and settled.rejected 2. The response of nackMessage carries settled true and mode DEFERRED, which means the decision reached the inbound endpoint. The counters say what reached the broker.

A message with an empty or unparseable payload goes to the dead message queue without a decision, so it is kept for inspection.

## Undo

Purge Q.orders.dmq on the broker, or move its messages back to Q.orders with the broker's tools to replay them.
