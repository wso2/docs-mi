# Request reply between two integrations

At the end of this guide an HTTP call into one integration is answered by a second integration through a Solace request queue, with the reply channel created and removed by the connector.

## Steps

1. On the broker create Q.requests. The requester's client profile must allow as many egress flows as requests in flight, and the broker must have that many free non durable endpoints.
2. In the requester project create the connection as in [guide 8]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/) and the API.

    ```xml
    <api name="GetSeats" context="/seats" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/{flight}" faultSequence="seatsFaultSeq">
            <inSequence>
                <payloadFactory media-type="json"><format>{"flight": "${params.uriParams.flight}"}</format></payloadFactory>
                <solace.sendRequest configKey="SOLACE_CONN">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.requests</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <requestTimeout>5000</requestTimeout>
                    <responseVariable>reply</responseVariable>
                </solace.sendRequest>
                <respond/>
            </inSequence>
        </resource>
    </api>
    ```

3. In the responder project create a connection and an inbound endpoint on Q.requests with autoAck false, whose sequence replies and then acknowledges.

    ```xml
    <sequence name="seatsResponderSeq" xmlns="http://ws.apache.org/ns/synapse">
        <payloadFactory media-type="json"><format>{"flight": "${payload.flight}", "seats": 12}</format></payloadFactory>
        <solace.sendReply configKey="SOLACE_CONN">
            <target>INBOUND</target>
            <deliveryMode>PERSISTENT</deliveryMode>
            <messageType>TEXT</messageType>
            <responseVariable>replied</responseVariable>
        </solace.sendReply>
        <solace.acknowledgeMessage>
            <responseVariable>ackResult</responseVariable>
        </solace.acknowledgeMessage>
    </sequence>
    ```

4. Deploy both and call the requester.

    ```bash
    curl http://localhost:8290/seats/LX100
    ```

## Verify

The reply comes back within the responder's time. During the call the broker shows a temporary queue owned by the requester's rr session, and none after the reply. The requester's log shows `session orders-node1-SOLACE_CONN-rr connected (generation 1)` on the first call. Stop the responder and call again: the call faults after 5 seconds with the request timeout, and the temporary queue is gone. Start the responder: the request that was left on Q.requests is consumed, its reply goes to a queue that no longer exists, sendReply faults with Queue Not Found, and the responder's fault sequence decides what to do with the request.

## Undo

Remove both CARs. The temporary queues of a requester that died without cleaning up are removed by the broker about a minute after its session closed.
