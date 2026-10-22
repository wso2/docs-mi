# Poll a queue with leases from an API

At the end of this guide an API call takes one message from a queue, works on it and acknowledges it, and a message the caller never settles comes back to the queue after its lease.

## Steps

1. Create the connection as in [guide 8]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/), with a short lease for this guide.

    ```xml
    <pollAckTimeout>10000</pollAckTimeout>
    ```

2. Create the API.

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
                        <call blocking="false"><endpoint key="OrderBackend"/></call>
                        <solace.acknowledgeMessage>
                            <target>POLL</target>
                            <responseVariable>ackResult</responseVariable>
                        </solace.acknowledgeMessage>
                    </then>
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

The first call returns the first message with timedOut false, the backend received it, and Q.orders holds one message. The log shows the poll session connected and the flow bound. Comment out the acknowledgement, redeploy and call again: the second message is returned, and after 10 seconds the log shows `polled message <id> was not settled within pollAckTimeout 10000 ms; settling FAILED` and the message is back on the queue with the redelivered flag. Call the API with the queue empty: it returns timedOut true after 3 seconds and holds no flow longer than pollFlowIdleTimeout.

## Undo

Set ackMode back to AUTO, or remove the target POLL acknowledgement and the lease parameter. Remove the API.
