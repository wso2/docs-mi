# Consume from a queue and acknowledge after an HTTP call

At the end of this guide a message consumed from a queue is acknowledged only after the HTTP backend has answered, and a backend failure retries it.

## Steps

1. On the broker create the queue Q.orders with a dead message queue and a maximum redelivery count.
2. Create the endpoint for the backend.

    ```xml
    <endpoint name="OrderBackend" xmlns="http://ws.apache.org/ns/synapse">
        <http method="POST" uri-template="http://backend:8080/orders">
            <timeout><duration>30000</duration><responseAction>fault</responseAction></timeout>
        </http>
    </endpoint>
    ```

3. Create the sequence that calls the backend and acknowledges after the answer, and the fault sequence that nacks.

    ```xml
    <sequence name="orderProcessSeq" xmlns="http://ws.apache.org/ns/synapse">
        <call blocking="false"><endpoint key="OrderBackend"/></call>
        <solace.acknowledgeMessage>
            <responseVariable>ackResult</responseVariable>
        </solace.acknowledgeMessage>
    </sequence>

    <sequence name="orderFaultSeq" xmlns="http://ws.apache.org/ns/synapse">
        <solace.nackMessage>
            <outcomeType>FAILED</outcomeType>
            <responseVariable>nackResult</responseVariable>
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
            <parameter name="solace.password">wso2:vault-lookup('solace.password')</parameter>
            <parameter name="solace.destinationType">QUEUE</parameter>
            <parameter name="solace.destinationName">Q.orders</parameter>
            <parameter name="solace.autoAck">false</parameter>
            <parameter name="solace.failureOutcome">FAILED</parameter>
            <parameter name="solace.maxRedeliveries">3</parameter>
        </parameters>
    </inboundEndpoint>
    ```

5. Deploy the CAR and publish a message to Q.orders.

## Verify

The backend receives the request, the queue is empty afterwards, and the management API shows received 1, decided.ACK 1, settled.ack 1. Stop the backend and publish again: the log shows `attempt 1 failed; retry in 1000 ms`, then the attempts 2 and 3, then `exhausted 3 in-place retries; rejecting (DMQ when eligible)`, and the message is in the dead message queue. The time between the publish and the backend's request is the time the backend took to answer, and the acknowledgement is after it.

## Undo

Set suspend to true on the inbound endpoint and redeploy, or remove the CAR. Purge the dead message queue on the broker when you are done.
