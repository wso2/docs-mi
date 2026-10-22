# Poll a queue with leases from an API

At the end of this guide an API call takes one message from a queue, works on it and acknowledges it, and a message the caller never settles comes back to the queue after its lease.

## Steps

1. Create the connection as in [guide 8]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/), with a short lease for this guide.

    ```xml
    <pollAckTimeout>10000</pollAckTimeout>
    ```

2. Create the API. It calls the backend through the HTTP connection OrderBackend of the [quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/). poll keeps the message in vars.polled and does not put it on the body, so the API passes vars.polled.payload to the backend and builds its own answer.

    ```xml
    <api name="NextOrder" context="/next" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/">
            <inSequence>
                <solace.poll configKey="SOLACE_CONN">
                    <queueName>Q.orders</queueName>
                    <pollTimeout>3000</pollTimeout>
                    <ackMode>CLIENT</ackMode>
                    <responseVariable>polled</responseVariable>
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
            </inSequence>
        </resource>
    </api>
    ```

3. Deploy, publish two messages to Q.orders, and call the API.

    ```bash
    curl http://localhost:8290/next
    ```

## Verify

The first call returns the first message inside {"received": true, "timedOut": false, "message": ...}, the backend received that message, and Q.orders holds one message. A backend answer other than 200 nacks the message FAILED, so the broker redelivers it to a later poll. The log shows the poll session connected and the flow bound. Comment out the acknowledgement, redeploy and call again: the second message is returned, and after 10 seconds the log shows `polled message <id> was not settled within pollAckTimeout 10000 ms; settling FAILED` and the message is back on the queue with the redelivered flag. Call the API with the queue empty: it returns {"received": false, "timedOut": true} after 3 seconds and holds no flow longer than pollFlowIdleTimeout.

## Undo

Set ackMode back to AUTO, or remove the target POLL acknowledgement and the lease parameter. Remove the API.
