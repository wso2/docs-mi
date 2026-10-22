# Publish with confirmation

A guaranteed publish from a sequence waits for the broker's acknowledgement, and the whole operation ends at one deadline. A rejection by the broker is a fault with the broker's reason, and a publish that could not be confirmed says so.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-publish.png" title="An API publishes with the connector. The broker acknowledges or rejects under the ackTimeout deadline" width="800" alt="An API publishes with the connector. The broker acknowledges or rejects under the ackTimeout deadline"/>

## The artifacts

The connection, a local entry.

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
        <maxActiveConnections>8</maxActiveConnections>
    </solace.init>
</localEntry>
```

The password is a Secure Vault lookup. The alias solace.password must exist in the vault before the deploy, see [Encrypting secrets]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/). The braces are part of the value. Without them the server sends the lookup text as the password.

The operation.

```xml
<solace.publishMessage configKey="SOLACE_CONN">
    <destinationType>QUEUE</destinationType>
    <destinationName>Q.orders</destinationName>
    <deliveryMode>PERSISTENT</deliveryMode>
    <messageType>TEXT</messageType>
    <waitForAck>true</waitForAck>
    <ackTimeout>10000</ackTimeout>
    <continueOnAckFailure>false</continueOnAckFailure>
    <responseVariable>published</responseVariable>
</solace.publishMessage>
```

## How the deadline works

ackTimeout, 10 seconds by default, is the deadline of the operation. It covers the connect of a session that must be rebuilt, the wait for the producer, the send and the broker's acknowledgement. The pool borrow has its own bound, maxWaitTime, 10 seconds by default. Where the deadline lands decides what the caller is told.

During a broker outage each pooled session has at most one connect attempt running. A caller that arrives while it runs waits on that attempt within its own deadline, and a caller whose deadline ends leaves the attempt running for the next one. On the test bench, about 90 seconds each of publish, request reply and poll calls every half second against a paused broker kept the connect threads at two at most, where a pool of two with its request reply and poll sessions allows four, with no growth over the run, and every kind of call succeeded right after the broker returned.

| Family | Codes | What it means | What to do |
| --- | --- | --- | --- |
| safe | DEADLINE\_BEFORE\_SEND 700118, EXPIRED 700120, PUBLISH\_ERROR 700102 | nothing was sent | retry freely |
| uncertain | DEADLINE 700119, UNKNOWN 700121, both with outcome UNKNOWN | the message may or may not have reached the broker | a retry is at least once |
| refused | NACK 700122 with the subcode and the broker's phrase, CONNECTION\_ERROR 700101 | the broker said no, or no session could be had | read the reason |

A session whose operation ended uncertain is not reused. The next operation rebuilds it under its own deadline with the recovery back off. With continueOnAckFailure true the response carries ackStatus NACK or TIMEOUT instead of a fault.

## What the broker's reasons look like

| Case | Response |
| --- | --- |
| the queue is over its quota | NACK, subcode 30, Spool Over Quota |
| the queue's ingress is shut down | NACK, subcode 31, Queue Shutdown |
| the ACL denies the publish | NACK, subcode 28, Publish ACL Denied |
| a topic collected by a queue whose ingress is off, with the queue's reject message to sender on discard set to always | NACK, subcode 32, Endpoint Shutdown |

## The two silent cases

Two discards never reach the publisher, and both are Solace semantics. A Direct publish has no acknowledgement, so a discard by a shut down queue or by an ACL is invisible and the response reads ackStatus NOT\_APPLICABLE. A guaranteed publish to a topic that a queue collects is acknowledged normally and the message is gone when the queue's ingress is shut down and the queue's reject message to sender on discard setting is at its default, when queue enabled. Use PERSISTENT delivery when loss matters, and set reject message to sender on discard to always on any queue that collects a topic. The queue's discard counters on the broker show what was lost.

## The parameters that matter

| Parameter | Default | Use |
| --- | --- | --- |
| waitForAck | true for PERSISTENT and NON\_PERSISTENT | wait for the broker acknowledgement |
| ackTimeout | 10000 | the deadline of the operation in ms |
| continueOnAckFailure | false | carry the status in the response instead of a fault |
| maxActiveConnections | 8 | the pooled sessions of the connection |
| maxWaitTime | 10000 | the bound of the pool borrow |
| recovery.initialDelay, progression, maxDelay, maxAttempts | 1000, 2.0, 60000, -1 | the rebuild of a failed session |

The broker's per client username connection limit must allow the pool size plus two, because the connection opens a request reply session and a poll session on first use.

## The log lines

The first connect of a pooled session logs INFO `session <name>-1 connected (generation 1)`. A rebuild logs WARN `session <name>-1 rebuilt (generation 2)`. An operation that expired logs the deadline and the session it closed.
