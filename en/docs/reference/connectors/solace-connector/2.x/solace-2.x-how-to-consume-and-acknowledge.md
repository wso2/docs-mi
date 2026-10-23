# Consume from a queue and acknowledge after an HTTP call

At the end of this guide a message consumed from a queue is acknowledged only after the HTTP backend has answered, and a backend failure retries it.

## Steps

1. On the broker create the queue Q.orders with a dead message queue and a maximum redelivery count. Publish the test messages DMQ eligible, for example with the REST header `Solace-DMQ-Eligible: true`, so that a rejected message reaches the dead message queue.
2. Create the endpoint for the backend.

    ```xml
    <endpoint name="OrderBackend" xmlns="http://ws.apache.org/ns/synapse">
        <http method="POST" uri-template="http://backend:8080/orders">
            <timeout><duration>30000</duration><responseAction>fault</responseAction></timeout>
        </http>
    </endpoint>
    ```

3. Create the sequence that calls the backend and acknowledges only an accepted answer, and the fault sequence that nacks. A 2xx status acknowledges. Any other status nacks FAILED, and a call that fails before an answer ends in the fault sequence, which nacks FAILED too.

    ```xml
    <sequence name="orderProcessSeq" xmlns="http://ws.apache.org/ns/synapse">
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
    </sequence>

    <sequence name="orderFaultSeq" xmlns="http://ws.apache.org/ns/synapse">
        <solace.nackMessage>
            <outcomeType>FAILED</outcomeType>
            <responseVariable>nackResult</responseVariable>
            <overwriteBody>false</overwriteBody>
        </solace.nackMessage>
    </sequence>
    ```

4. Create the inbound endpoint with autoAck false, the two sequences, and a retry limit.

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
            <parameter name="solace.password">{wso2:vault-lookup('solace.password')}</parameter>
            <parameter name="solace.destinationType">QUEUE</parameter>
            <parameter name="solace.destinationName">Q.orders</parameter>
            <parameter name="solace.autoAck">false</parameter>
            <parameter name="solace.failureOutcome">FAILED</parameter>
            <parameter name="solace.maxRedeliveries">3</parameter>
        </parameters>
    </inboundEndpoint>
    ```

    The password is a Secure Vault lookup. The alias solace.password must exist in the vault before the deploy, see [Encrypting secrets]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/). The braces are part of the value. Without them the server sends the lookup text as the password.

5. Deploy the CAR and publish a message to Q.orders.

## Verify

The backend receives the request, the queue is empty afterwards, and the management API shows received 1, decided.ACK 1, settled.ack 1. Stop the backend and publish again: the log shows `attempt 1 failed; retry in 1000 ms`, then the attempts 2 and 3, then `exhausted 3 in-place retries; rejecting (DMQ when eligible)`, and the message is in the dead message queue. Start the backend with a mock that answers 500: the message is nacked FAILED and retried the same way, and only a 2xx answer acknowledges. The time between the publish and the backend's request is the time the backend took to answer, and the acknowledgement is after it.

## Undo

Set suspend to true on the inbound endpoint and redeploy, or remove the CAR. Purge the dead message queue on the broker when you are done.
