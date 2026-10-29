# Poll with leases

An API call takes one message from a queue on demand, works on it, and settles it from the sequence. The message is held under a lease, so a caller that dies does not lose it, and the flow that served the call is cached for the next one.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-poll.png" title="An API polls one message with a lease and acknowledges it with target POLL" width="800" alt="An API polls one message with a lease and acknowledges it with target POLL"/>

## When to use it

Use poll when the integration decides when to read a message. The inbound endpoint pushes every message as soon as it arrives. With poll the sequence takes one message on demand, for example on each call to an API such as GET /orders/next.

With ackMode AUTO the message leaves the queue as soon as poll returns it, so a failed backend call loses it. With ackMode CLIENT the message stays on the queue under a lease of pollAckTimeout, 180 s by default, until the sequence acknowledges or nacks it.

When the lease ends without a settlement, the connector settles the message FAILED and the broker hands it to a later poll. A caller that dies or never settles does not lose the message.

## The shape

poll receives one message from a queue on the connection's poll session, where one flow per queue and selector is cached with its own owner thread. With ackMode AUTO the message is acknowledged as soon as it is handed to the call, at most once. With ackMode CLIENT the message is stashed on the message context with a lease of pollAckTimeout, and the sequence settles it with acknowledgeMessage or nackMessage with target POLL. A lease that passes unsettled is settled FAILED and the broker redelivers the message. A second CLIENT poll while a lease is outstanding faults before touching the broker.

## The artifacts

```xml
<solace.poll configKey="SOLACE_CONN">
    <queueName>Q.orders</queueName>
    <pollTimeout>3000</pollTimeout>
    <ackMode>CLIENT</ackMode>
    <responseVariable>polled</responseVariable>
    <overwriteBody>false</overwriteBody>
</solace.poll>
<filter source="${vars.polled.attributes.timedOut}" regex="false">
    <then>
        <http.post configKey="OrderBackend">
            <relativePath>/orders</relativePath>
            <headers>[]</headers>
            <requestBodyType>JSON</requestBodyType>
            <requestBodyJson>{${vars.polled.payload}}</requestBodyJson>
            <responseVariable>backend</responseVariable>
            <overwriteBody>false</overwriteBody>
        </http.post>
        <filter xpath="${vars.backend.attributes.statusCode == 200}">
            <then>
                <solace.acknowledgeMessage>
                    <target>POLL</target>
                    <responseVariable>ackResult</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.acknowledgeMessage>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"received": true, "timedOut": false, "message": ${vars.polled.payload}}</format>
                </payloadFactory>
            </then>
            <else>
                <solace.nackMessage>
                    <outcomeType>FAILED</outcomeType>
                    <target>POLL</target>
                    <responseVariable>nackResult</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.nackMessage>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"received": true, "timedOut": false, "processed": false}</format>
                </payloadFactory>
            </else>
        </filter>
    </then>
    <else>
        <payloadFactory media-type="json" template-type="default">
            <format>{"received": false, "timedOut": true}</format>
        </payloadFactory>
    </else>
</filter>
<respond/>
```

The response of poll carries the message body as the payload and its metadata as attributes, with timedOut true when the queue was empty for pollTimeout. A message declared application/json gives a parsed payload. A message without a declared type is text or binary, unless poll sets its contentType parameter. Every attribute and the payload of each content type are in [Results of poll, sendRequest and browse]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#results-of-poll-sendrequest-and-browse). poll does not put the message on the body. The sequence passes vars.polled.payload to the backend, here through the HTTP connection of the quick start, acknowledges only a 200 answer, and builds its own answer for the caller, including the one for an empty queue. The answer for a message that was not processed keeps the backend's HTTP status. A poll inside a sequence of the inbound endpoint keeps the two messages apart: target POLL settles the polled one, target INBOUND, the default, settles the inbound endpoint's one.

## The parameters that matter

| Parameter | Default | Use |
| --- | --- | --- |
| pollTimeout |  | the wait for a message, including the wait for the flow's owner thread |
| ackMode | AUTO | CLIENT to settle from the sequence |
| selector |  | a SQL 92 selector, one cached flow per queue and selector |
| pollAckTimeout | 180000 | the lease of a CLIENT delivery, in ms |
| pollFlowIdleTimeout | 60000 | an idle flow with no lease is closed after it |
| maxPollFlows | 16 | the cached flows per connection. The least recently used idle one is evicted for a new selector, and when none is idle the poll faults POLL\_FLOW\_LIMIT 700116 |
| requireSettlementOutcomes | AUTO | on a broker without the FAILED outcome an expired lease retains the message and recycles the flow instead |

The poll session runs beside the pool, so a caller that waits for a message holds no pooled session.

## What happens on a rebind

When the broker rebinds a poll flow, after a queue was recreated or its egress toggled, the connector closes that flow with whatever the client had buffered, and the next poll binds a fresh one. A message buffered before the rebind is never returned by a poll, the broker redelivers it. Recovery is at least once, never exactly once. A lease that was live on the closed flow is stale, and its late settlement reports STALE\_DELIVERY.

## The log lines

An expired lease logs WARN `polled message <id> was not settled within pollAckTimeout 180000 ms; settling FAILED`. A flow that closes logs INFO `poll flow <queue> closed (idle for 60001 ms)`, `closed (evicted)` or `closed (flow reconnecting)`. A late settlement from a closed flow logs WARN `late settlement of polled message <id> from a closed poll flow`.
