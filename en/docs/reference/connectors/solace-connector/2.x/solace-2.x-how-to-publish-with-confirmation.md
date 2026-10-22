# Publish with confirmation from an API

At the end of this guide an API publishes a persistent message and answers the HTTP client only after the broker acknowledged it, and a rejection by the broker reaches the client as a fault.

## Steps

1. Create the connection local entry.

    ```xml
    <localEntry key="SOLACE_CONN" xmlns="http://ws.apache.org/ns/synapse">
        <solace.init>
            <connectionType>SOLACE</connectionType>
            <name>SOLACE_CONN</name>
            <host>tcp://broker:55555</host>
            <vpnName>default</vpnName>
            <authenticationScheme>BASIC</authenticationScheme>
            <username>integration</username>
            <password>{wso2:vault-lookup('solace.password')}</password>
            <clientName>orders</clientName>
        </solace.init>
    </localEntry>
    ```

    The password is a Secure Vault lookup. The alias solace.password must exist in the vault before the deploy, see [Encrypting secrets]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/). The braces are part of the value. Without them the server sends the lookup text as the password.

2. Create the API.

    ```xml
    <api name="PublishOrder" context="/orders" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/" faultSequence="publishFaultSeq">
            <inSequence>
                <solace.publishMessage configKey="SOLACE_CONN">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.orders</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <ackTimeout>10000</ackTimeout>
                    <responseVariable>published</responseVariable>
                </solace.publishMessage>
                <payloadFactory media-type="json"><format>{"ackStatus": "${vars.published.attributes.ackStatus}"}</format></payloadFactory>
                <respond/>
            </inSequence>
        </resource>
    </api>

    <sequence name="publishFaultSeq" xmlns="http://ws.apache.org/ns/synapse">
        <payloadFactory media-type="json"><format>{"error": "${properties.synapse.ERROR_CODE}", "message": "${properties.synapse.ERROR_MESSAGE}"}</format></payloadFactory>
        <property name="HTTP_SC" value="502" scope="axis2"/>
        <respond/>
    </sequence>
    ```

3. Deploy and call it.

    ```bash
    curl -H 'Content-Type: application/json' -X POST http://localhost:8290/orders -d '{"orderId": 1}'
    ```

## Verify

The response is ackStatus ACK and the message is on Q.orders. The log of the first call shows the connector's connection initialised and `session orders-node1-SOLACE_CONN-1 connected (generation 1)`.

Shut down the queue's ingress on the broker and call again: the fault sequence answers 502 with the error 700122 and the message `NACK: subcode 31, Queue Shutdown`. Pause the broker container, or block its port, and call again: after 10 seconds the fault sequence answers with 700119 DEADLINE. The next call after the broker is back logs `rebuilt (generation 2)` and succeeds.

## Undo

Re enable the queue's ingress. Remove the API or the CAR. The connection closes its sessions on the undeploy and the broker's client list shows none of its names.
