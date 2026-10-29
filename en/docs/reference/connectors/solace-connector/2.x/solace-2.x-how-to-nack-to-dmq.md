# Nack and route to the dead message queue

At the end of this guide a message the sequence judges invalid is rejected to the dead message queue at once, and a message that fails for a passing reason is retried and only then dead lettered.

## Steps

1. On the broker give Q.orders a dead message queue, Q.orders.dmq, and a maximum redelivery count. A rejected message reaches the dead message queue only when the message is eligible for it. The publisher marks it eligible, for example with the REST header `Solace-DMQ-Eligible: true`, or with dmqEligible true on publishMessage. On a broker that respects the flag, a rejected message that is not eligible is discarded, and the endpoint logs one WARN for it. Newer brokers can override the flag through the queue's Respect DMQ Eligible setting and the Message VPN, so check the effective policy of your broker, see [Setting dead message queues](https://docs.solace.com/Messaging/Guaranteed-Msg/Setting-Dead-Msg-Queues.htm). Without a dead message queue the broker discards a rejected message.
2. In the sequence, decide between the two outcomes. REJECTED for an input that can never succeed, FAILED for a failure that a retry can cure.

    ```xml
    <sequence name="orderProcessSeq" xmlns="http://ws.apache.org/ns/synapse">
        <filter source="${payload.seats}" regex="^[1-9]$">
            <then>
                <call blocking="false"><endpoint key="OrderBackend"/></call>
                <filter source="get-property('axis2', 'HTTP_SC')" regex="2\d\d">
                    <then>
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
            </then>
            <else>
                <log category="WARN"><message>order rejected: seats out of range</message></log>
                <solace.nackMessage>
                    <outcomeType>REJECTED</outcomeType>
                    <responseVariable>nackResult</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.nackMessage>
            </else>
        </filter>
    </sequence>
    ```

    A valid order is acknowledged only for a 2xx answer from the backend, as in guide 2. Any other answer nacks it FAILED, so it is retried.

3. Keep the fault sequence on FAILED, so an exception during the backend call is retried. Set solace.maxRedeliveries on the inbound endpoint to the number of retries. A value of 3 allows the first attempt and three retries. If all four fail, the endpoint rejects the message.
4. Deploy and publish one invalid order, seats 12, and one valid order with the backend stopped. Publish both DMQ eligible, for example with the REST header `Solace-DMQ-Eligible: true`.

## Verify

The invalid order is in Q.orders.dmq at once, the counters show decided.REJECTED 1 and settled.rejected 1. The valid order with the backend stopped is retried with the back off and reaches the dead message queue after the attempts, with decided.FAILED equal to the attempts and settled.rejected 2. The response of nackMessage carries settled true and mode DEFERRED, which means the decision reached the inbound endpoint. The settled counters say which settlements the client library took. The broker shows where each message is.

This guide's endpoint has autoAck false and is not transacted. On it, a message that does not build never reaches the sequence. The endpoint rejects it without a decision, so an eligible message is kept in the dead message queue for inspection. This happens to a message with an empty payload, to JSON that the builder rejects at its start and to an XML document whose root is malformed. A JSON or XML document damaged after its start builds lazily and reaches the sequence. It can fail where the sequence first reads it, and then the fault sequence decides how to settle it. See [Malformed JSON and XML]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-migration-from-1.x/#malformed-json-and-xml).

## Undo

Purge Q.orders.dmq on the broker, or move its messages back to Q.orders with the broker's tools to replay them.
