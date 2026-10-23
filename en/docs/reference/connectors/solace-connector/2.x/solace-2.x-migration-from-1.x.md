# Migration from 1.x

A 1.x project moves to 2.0.0 by upgrading both artifacts together, checking every manual acknowledgement sequence, and reading the new defaults. The connector can go first, the inbound endpoint cannot.

## The order

1. Upgrade the connector to 2.0.0. It works with the inbound endpoint 1.x, the settlement operations find no handle and settle the message directly, which the response reports as mode DIRECT.
2. Upgrade the inbound endpoint to 2.0.0 in the same project. It refuses to start while a 1.x connector is deployed and logs `cannot start: a Solace connector older than 2.0.0 is deployed`, with the required version.
3. Deploy both in one CAR, or the connector before the inbound endpoint.
4. After any later change of the connector library, a new version or a redeploy of it, redeploy the inbound endpoint as well. The endpoint checks the connector only when it starts.

## The breaking changes

| Change | What it means for a project |
| --- | --- |
| the default of failureOutcome is FAILED, it was NONE | a message the sequence does not settle is retried instead of staying unacknowledged |
| a manual acknowledgement sequence must call acknowledgeMessage or nackMessage | a 1.x sequence that relied on the implicit acknowledgement on return now waits for settlementTimeout, 180 seconds, and then applies failureOutcome. There is no compatibility switch, and the endpoint logs a WARN at deploy time for every such sequence |
| the inbound endpoint 2.0.0 requires the connector 2.0.0 | upgrade both |
| the default of reconnectRetries is minus one, it was 3 | the client never gives up on its own |
| publishMessage, sendRequest and sendReply wait for the broker acknowledgement by default on guaranteed delivery, under ackTimeout | a rejected publish is now a fault in the sequence. A publish that could not be confirmed faults with outcome UNKNOWN |
| solace.clientName is a prefix unless clientNameStrict is true | the name on the broker is now the prefix, the node and the endpoint. A script or a monitor keyed on the 1.x name needs clientNameStrict true or a new key |
| replies and polls no longer use pooled sessions | the connection opens two more sessions. The broker's connection limit for the client username must allow the pool size plus two |
| the connection parameters are no longer copied into the message context | a sequence that read the password or the username from a property stops working, and should not have |

## What to change in each sequence shape

| 1.x shape | 2.0.0 |
| --- | --- |
| consume, call the backend, return | add acknowledgeMessage after the call and nackMessage in the fault sequence |
| consume, nackMessage REJECTED for bad input, return for good | add acknowledgeMessage for the good path |
| consume with autoAck true | unchanged, at most once |
| a fault sequence that logged and returned | add nackMessage FAILED, or let failureOutcome apply after the timeout |
| publishMessage with waitForAck false, as the 1.x default | leave the default true and handle the NACK fault, or set continueOnAckFailure true to read ackStatus from the response |
| a request reply responder that published to the reply queue with publishMessage | sendReply with target INBOUND, then acknowledgeMessage |
| poll with the message acknowledged on receipt | unchanged with ackMode AUTO. ackMode CLIENT and target POLL for a lease |
| a transaction across a poll and a publish | unchanged for a connector owned transaction. An inbound owned transaction is new, see [use case 6]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-transacted-consume-publish/) |

## The workarounds that go away

| 1.x workaround | 2.0.0 |
| --- | --- |
| a script that redeployed the endpoint after a flow loss or after a broker outage | the endpoint recovers on its own |
| a monitor on the log for the endpoint's state | the management API status and health |
| a static OAuth2 token redeployed at every rotation | solace.oauth2TokenFile |
| the queue's maximum redelivery count as the only retry | the in place retry with a back off, and the cutoff |
| one endpoint per node with distinct names by hand | the names carry the node |

## The defaults that changed

| Parameter | 1.x | 2.0.0 |
| --- | --- | --- |
| solace.failureOutcome | NONE | FAILED |
| solace.reconnectRetries | 3 | -1 |
| waitForAck | false | true for PERSISTENT and NON\_PERSISTENT |
| solace.clientName | the name as given | a prefix |

## The limits 2.0.0 states

1. A timed out or retried attempt does not cancel its earlier continuation, so a retry is at least once and a side effect can run twice.
2. autoAck acknowledges on return, the asynchronous work after it is outside the settlement and drain bounds.
3. Direct messaging has no broker redelivery.
4. A transaction's result can be unknown after a connection failure during the commit. The message may be redelivered or gone.
5. An exclusive queue limits transacted consumption to one active flow.
6. A close the broker does not answer, or mediation that never returns, can outlive the drain deadline. Such work is left to the broker's redelivery and reported.
7. The pending ceiling under flow control is the window plus a measured overshoot, and the client's windows stop at 255.
8. Throughput figures hold per workload under the stated assumptions of the [performance page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-performance/).
