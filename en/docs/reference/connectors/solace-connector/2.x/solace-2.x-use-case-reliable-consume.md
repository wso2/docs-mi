# Reliable consume with an HTTP backend

A message consumed from a queue is acknowledged after the HTTP backend answered, retried when the backend fails, and moved to the dead message queue when the retries are exhausted. Nothing is lost between the consume and the answer, and nothing is acknowledged silently.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-reliable-consume.png" title="Consume from Q.orders, call the backend, then acknowledge or reject from the sequence" width="800" alt="Consume from Q.orders, call the backend, then acknowledge or reject from the sequence"/>

## The shape

The inbound endpoint consumes Q.orders with autoAck false and hands each message to a worker. The worker injects the message into the sequence and waits for the decision. The sequence calls the backend, and when the answer is good it calls acknowledgeMessage. The fault sequence calls nackMessage. The worker settles the message on the broker with the decision and only then takes the next one.

## The artifacts

The inbound endpoint. Set autoAck to false, choose the failure policy, and keep one worker for strict order.

```xml
<inboundEndpoint xmlns="http://ws.apache.org/ns/synapse" name="OrderListener"
                 sequence="orderProcessSeq" onError="orderFaultSeq"
                 class="org.wso2.carbon.inbound.solace.SolaceEventListener" suspend="false">
    <parameters>
        <parameter name="inbound.behavior">eventBased</parameter>
        <parameter name="sequential">true</parameter>
        <parameter name="coordination">true</parameter>
        <parameter name="solace.host">tcp://broker:55555</parameter>
        <parameter name="solace.vpnName">default</parameter>
        <parameter name="solace.authenticationScheme">BASIC</parameter>
        <parameter name="solace.username">integration</parameter>
        <parameter name="solace.password">wso2:vault-lookup('solace.password')</parameter>
        <parameter name="solace.destinationType">QUEUE</parameter>
        <parameter name="solace.destinationName">Q.orders</parameter>
        <parameter name="solace.autoAck">false</parameter>
        <parameter name="solace.failureOutcome">FAILED</parameter>
        <parameter name="solace.maxRedeliveries">3</parameter>
        <parameter name="solace.settlementTimeout">180000</parameter>
        <parameter name="solace.concurrentConsumers">1</parameter>
    </parameters>
</inboundEndpoint>
```

The sequence. The call to the backend is non blocking, which is the case that 1.x got wrong. The acknowledgement comes after the response.

```xml
<sequence name="orderProcessSeq" xmlns="http://ws.apache.org/ns/synapse">
    <call blocking="false">
        <endpoint key="OrderBackend"/>
    </call>
    <filter source="${vars.statusCode}" regex="2..">
        <then>
            <solace.acknowledgeMessage>
                <responseVariable>ackResult</responseVariable>
            </solace.acknowledgeMessage>
        </then>
        <else>
            <solace.nackMessage>
                <outcomeType>FAILED</outcomeType>
                <responseVariable>nackResult</responseVariable>
            </solace.nackMessage>
        </else>
    </filter>
</sequence>
```

The fault sequence. An exception in the mediation ends here, and the message is retried.

```xml
<sequence name="orderFaultSeq" xmlns="http://ws.apache.org/ns/synapse">
    <log level="custom"><property name="order" value="failed, retrying"/></log>
    <solace.nackMessage>
        <outcomeType>FAILED</outcomeType>
        <responseVariable>nackResult</responseVariable>
    </solace.nackMessage>
</sequence>
```

The settlement operations need no connection. They act on the message the inbound endpoint delivered, through a handle on the message context, from whatever thread the sequence ends on.

## What each decision does

| Decision | What happens |
| --- | --- |
| acknowledgeMessage | the message is acknowledged on the broker and removed from the queue |
| nackMessage FAILED | the message is retried in place on the same worker after a delay that starts at 1 second and doubles up to 60 seconds. The message stays on the worker, so the queue's order is kept and the broker's redelivery count does not move. After maxRedeliveries attempts it is settled REJECTED. With maxRedeliveries 0 it is settled FAILED at once and the broker's own redelivery applies. |
| nackMessage REJECTED | the message is settled REJECTED and the broker moves it to the queue's dead message queue |
| no decision within settlementTimeout | the endpoint applies failureOutcome, FAILED by default |
| an empty or unparseable payload | settled REJECTED, so the message is kept for inspection instead of being retried forever |

REJECTED needs a dead message queue on the queue, configured on the broker. Without one the broker discards the message.

## The parameters that matter

| Parameter | Default | Use |
| --- | --- | --- |
| solace.autoAck | true | false for this use case |
| solace.failureOutcome | FAILED | the outcome when the sequence makes no decision in time |
| solace.maxRedeliveries | -1, unlimited | the number of in place retries before REJECTED |
| solace.redelivery.initialDelay, progression, maxDelay | 1000, 2.0, 60000 | the delay between retries |
| solace.settlementTimeout | 180000 | the time the sequence has to decide. It must exceed the longest timeout in the sequence |
| solace.concurrentConsumers | 1 | workers per endpoint, see [use case 2]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-throughput-with-workers/) |

## The log lines

A retry logs `message <id>: attempt 1 failed; retry in 1000 ms`, and the last one logs `exhausted 3 in-place retries; rejecting (DMQ when eligible)`. At deploy time the endpoint logs a WARN for a manual acknowledgement sequence that contains no settlement operation, because such a sequence would wait for settlementTimeout on every message.

## The health words

The management API shows the status active while the endpoint consumes, and the counters received, decided by outcome, settled by outcome and inFlight move with every message. A message in its retry delay counts as inFlight.
