# Request reply and dual channel

An HTTP request comes in, the sequence publishes it to a request queue and waits for the reply, a second integration consumes the request and replies, and the HTTP client gets the reply. The reply channel is created and removed by the connector, nothing is configured for it and nothing is left behind.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-request-reply.png" title="The requester publishes with sendRequest and waits. The responder consumes and answers with sendReply through a temporary reply queue" width="800" alt="The requester publishes with sendRequest and waits. The responder consumes and answers with sendReply through a temporary reply queue"/>

## The shape

sendRequest takes one of maxConcurrentRequests permits, publishes the request on the connection's request reply session with the reply to destination set by the connector, a temporary queue per request for guaranteed delivery or the requestor's inbox for Direct, waits up to requestTimeout, and cleans up on every exit. The responder is an inbound endpoint on the request queue whose sequence calls sendReply and then acknowledges the request. sendReply publishes on the responder's own request reply session with the connector's identity, so the responder's broker user can differ from the requester's.

## The artifacts

The requester, inside an API resource.

```xml
<solace.sendRequest configKey="SOLACE_CONN">
    <destinationType>QUEUE</destinationType>
    <destinationName>Q.requests</destinationName>
    <deliveryMode>PERSISTENT</deliveryMode>
    <messageType>TEXT</messageType>
    <requestTimeout>5000</requestTimeout>
    <waitForAck>true</waitForAck>
    <ackTimeout>10000</ackTimeout>
    <responseVariable>reply</responseVariable>
    <overwriteBody>true</overwriteBody>
</solace.sendRequest>
<respond/>
```

overwriteBody true puts the reply on the body, so respond returns it to the HTTP client. Without it the reply stays in vars.reply and the client gets its own request back.

sendRequest publishes the current body as the request. Call the API with a body, or build the request first with a payload factory as guide 9 does. An empty request is rejected by the responder as an empty message.

The responder, the sequence of an inbound endpoint on Q.requests with autoAck false. The reply is published before the request is acknowledged.

```xml
<sequence name="seatsResponderSeq" xmlns="http://ws.apache.org/ns/synapse">
    <payloadFactory media-type="json"><format>{"seats": 12}</format></payloadFactory>
    <solace.sendReply configKey="SOLACE_CONN">
        <target>INBOUND</target>
        <deliveryMode>PERSISTENT</deliveryMode>
        <messageType>TEXT</messageType>
        <responseVariable>replied</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.sendReply>
    <solace.acknowledgeMessage>
        <responseVariable>ackResult</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.acknowledgeMessage>
</sequence>
```

## Dual channel, for readers of the JMS transport

The JMS transport of WSO2 Integrator: MI has a [dual channel page]({{base_path}}/learn/examples/jms-examples/dual-channel-http-to-jms/), HTTP to JMS with a reply queue. The native Solace pair gives a similar business interaction with its own facts.

|  | JMS transport dual channel | Solace sendRequest and sendReply |
| --- | --- | --- |
| reply destination | an operator owned reply queue, correlation back to the waiting caller | a temporary queue per request, created and removed by the connector, no correlation to configure |
| the responder's reply | published to the configured reply queue | sendReply on the request's reply to destination, the responder must call it |
| automatic reply when the sequence ends | depends on the transport configuration | not included, the responder calls sendReply |
| the requester's thread | waits | waits on its calling thread, on a dedicated session, not on a pooled one |
| a restart of the requester | the reply queue keeps the replies | an outstanding request is not resumed, its temporary queue is gone |
| inside a transaction |  | sendRequest is refused with REQUEST\_IN\_TRANSACTION 700114 |
| resources left behind | the reply queue | none when the cleanup succeeds, the test counted the temporary queues back to zero |

The reply publication and the request's settlement are two operations, so a failure between them can redeliver the request and produce a second reply. A fixed reply queue with a correlation id is the asynchronous shape: publishMessage with the reply to parameters set, and an inbound endpoint on the reply queue. That shape needs its own correlation and does not resume the waiting HTTP caller.

## The parameters that matter

| Parameter | Default | Use |
| --- | --- | --- |
| requestTimeout | 5000 | the wait for the reply, in ms |
| maxConcurrentRequests | 100 | the requests in flight on the connection. A call beyond it waits up to requestTimeout and faults REQUEST\_CONCURRENCY\_EXCEEDED 700117 |
| waitForAck, ackTimeout | true, 10000 | the publish of the request, as for publishMessage |
| pubAckWindowSize | 1 | keep the default |
