# Transacted consume then publish

A consumed message and the messages the sequence publishes for it commit or roll back as one unit. The sequence decides with acknowledgeMessage, and everything else rolls the transaction back.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-transacted.png" title="One worker owns a transacted session. The consume and the publish commit together" width="800" alt="One worker owns a transacted session. The consume and the publish commit together"/>

## The shape

With solace.transacted true each worker owns one transacted session with a synchronous flow and a producer, and the worker thread is the only thread that touches them. A connector operation inside the sequence, on any thread, submits its broker work to the worker and waits. publishMessage and sendReply publish on the worker's producer, inside the transaction. acknowledgeMessage commits. nackMessage with either outcome, the settlement timeout, a fault and a message that cannot be converted all roll back, and the broker redelivers the message. One message per transaction, and the worker receives the next message only after the commit or the rollback.

## The artifacts

```xml
<parameter name="solace.transacted">true</parameter>
<parameter name="solace.autoAck">false</parameter>
<parameter name="solace.concurrentConsumers">1</parameter>
```

```xml
<sequence name="orderTxSeq" xmlns="http://ws.apache.org/ns/synapse">
    <call blocking="false">
        <endpoint key="OrderBackend"/>
    </call>
    <solace.publishMessage configKey="SOLACE_CONN">
        <destinationType>QUEUE</destinationType>
        <destinationName>Q.out</destinationName>
        <deliveryMode>PERSISTENT</deliveryMode>
        <messageType>TEXT</messageType>
        <responseVariable>published</responseVariable>
    </solace.publishMessage>
    <solace.acknowledgeMessage>
        <responseVariable>ackResult</responseVariable>
    </solace.acknowledgeMessage>
</sequence>
```

## The three settings the queue needs

A transacted rollback returns every message the broker had delivered into the flow's window, received by the application or not, and counts a redelivery for each of them. Without the right queue settings the healthy messages behind a failing one reach the dead message queue unprocessed. A transacted endpoint therefore needs three settings on its queue, and the endpoint logs a WARN at start that names them, because the Solace client cannot read a queue's settings.

1. A maximum redelivery count, the exit for a message that always fails.
2. A dead message queue.
3. Max delivered unacknowledged messages per flow set to 1, so the broker holds the next message until the transaction completes.

Measured on 20 October 2026 with five messages, a redelivery cutoff of 3 and the first message always failing: without the third setting all five were dead lettered and 15 redeliveries were counted, with it the first message alone was dead lettered after 3 redeliveries and the other four committed once each. Set the third setting on transacted queues only, since at 1 it limits a non transacted flow to one message. The Solace client confirms it at bind with the INFO line `AD windowSize (255) is greater than router MaxDeliveredUnackedMessagesPerFlow (1), set AckThreshold to 0`, and prints nothing when the setting is absent.

## The rules for the sequence

| Rule | Why |
| --- | --- |
| the publishes of the transaction go through publishMessage and sendReply with the same connection, nothing else | they run on the worker's producer inside the transaction |
| poll, beginTransaction, commit and rollback fault with INBOUND\_TRANSACTION 700113 | the worker owns the transaction and decides from the settlement |
| sendRequest faults with REQUEST\_IN\_TRANSACTION 700114 | a transacted publish is invisible to the responder until the commit, so the reply could never arrive before it |
| a connector owned transaction must not span a non blocking call | the transaction id lives in the message's axis2 scope, the commit after the call finds no transaction, and a publish after the call goes out untransacted |
| maxRedeliveries is ignored, the queue's cutoff applies | the broker counts the redeliveries, and the redelivery back off runs before each rollback with the broker's delivery count as the attempt number |
| a publish that runs inline on the worker thread has no ackTimeout | the caller is the worker, which cannot time itself out |

On an exclusive queue only one of the transacted flows is active, so the concurrency there is one. When the result of a commit is unknown after a connection failure, the worker rebuilds its session, flow and producer, and the message may be redelivered or gone, so the mode is at least once.
