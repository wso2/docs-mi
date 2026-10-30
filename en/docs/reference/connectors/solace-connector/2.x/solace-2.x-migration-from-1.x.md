# Migration from 1.x

A 1.x project moves to 2.x by upgrading both artifacts together, checking every manual acknowledgement sequence, checking every flow that relies on the content type of a message, and reading the new defaults. The connector can go first, the inbound endpoint cannot.

## The order

1. Upgrade the connector to 2.x. It works with the inbound endpoint 1.x, the settlement operations find no handle and settle the message directly, which the response reports as mode DIRECT.
2. Upgrade the inbound endpoint to 2.x in the same project. It refuses to start while a 1.x connector is deployed and logs `cannot start: a Solace connector older than 2.0.0 is deployed`, with the required version.
3. Deploy both in one CAR, or the connector before the inbound endpoint.
4. After any later change of the connector library, a new version or a redeploy of it, redeploy the inbound endpoint as well. The endpoint checks the connector only when it starts.

## The breaking changes

| Change | What it means for a project |
| --- | --- |
| the default of failureOutcome is FAILED, it was NONE | a message the sequence does not settle is retried instead of staying unacknowledged |
| a manual acknowledgement sequence must call acknowledgeMessage or nackMessage | a 1.x sequence that relied on the implicit acknowledgement on return now waits for settlementTimeout, 180 seconds, and then applies failureOutcome. There is no compatibility switch, and the endpoint logs a WARN at deploy time for every such sequence |
| the inbound endpoint 2.x requires a 2.x connector | upgrade both |
| the default of reconnectRetries is minus one, it was 3 | the client never gives up on its own |
| publishMessage, sendRequest and sendReply wait for the broker acknowledgement by default on guaranteed delivery, under ackTimeout | a rejected publish is now a fault in the sequence. A publish that could not be confirmed faults with outcome UNKNOWN |
| solace.clientName is a prefix unless clientNameStrict is true | the name on the broker is now the prefix, the node and the endpoint. A script or a monitor keyed on the 1.x name needs clientNameStrict true or a new key |
| replies and polls no longer use pooled sessions | the connection opens two more sessions. The broker's connection limit for the client username must allow the pool size plus two |
| the connection parameters are no longer copied into the message context | a sequence that read the password or the username from a property stops working, and should not have |
| the content type of a message without a declared type is no longer guessed | 1.x guessed JSON and XML from the first character. 2.x gives text/plain for a TextMessage and application/octet-stream for a BytesMessage. The producer declares the type, or the inbound endpoint sets solace.contentType, and poll, sendRequest and browse set their contentType parameter. No option restores the guess |
| declared JSON or XML that is malformed no longer falls back to text | the message fails, see [Malformed JSON and XML](#malformed-json-and-xml) |

## What to change in each sequence shape

| 1.x shape | 2.x |
| --- | --- |
| consume, call the backend, return | add acknowledgeMessage after the call and nackMessage in the fault sequence |
| consume, nackMessage REJECTED for bad input, return for good | add acknowledgeMessage for the good path |
| consume with autoAck true | unchanged, at most once |
| a fault sequence that logged and returned | add nackMessage FAILED, or let failureOutcome apply after the timeout |
| publishMessage with waitForAck false, as the 1.x default | leave the default true and handle the NACK fault, or set continueOnAckFailure true to read ackStatus from the response |
| a request reply responder that published to the reply queue with publishMessage | sendReply with target INBOUND, then acknowledgeMessage |
| poll with the message acknowledged on receipt | unchanged with ackMode AUTO. ackMode CLIENT and target POLL for a lease |
| a transaction across a poll and a publish | unchanged for a connector owned transaction. An inbound owned transaction is new, see [use case 6]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-transacted-consume-publish/) |
| a sequence that reads JSON or XML from a producer that declares no content type | set solace.contentType on the endpoint, or contentType on poll, sendRequest and browse, or declare the type on the producer |

## The workarounds that go away

| 1.x workaround | 2.x |
| --- | --- |
| a script that redeployed the endpoint after a flow loss or after a broker outage | the endpoint recovers on its own |
| a monitor on the log for the endpoint's state | the management API status and health |
| a static OAuth2 token redeployed at every rotation | solace.oauth2TokenFile |
| the queue's maximum redelivery count as the only retry | the in place retry with a back off, and the cutoff |
| one endpoint per node with distinct names by hand | the names carry the node |

## The defaults that changed

| Parameter | 1.x | 2.x |
| --- | --- | --- |
| solace.failureOutcome | NONE | FAILED |
| solace.reconnectRetries | 3 | -1 |
| waitForAck | false | true for PERSISTENT and NON\_PERSISTENT |
| solace.clientName | the name as given | a prefix |
| solace.contentType | detected from the first character of the body | the declared type, else the default of the message class |

## Malformed JSON and XML

1.x let declared malformed JSON or XML fall back to text. 2.x never falls back.

JSON that the builder rejects at its start, and an XML document whose root is malformed, fail at the build. The inbound endpoint logs `could not be converted into a message context; rejecting` and the sequence never runs. A JSON or XML document damaged after its start fails where the sequence first reads the body, because the platform builds both lazily. We do not promise that every read of such a body throws. A sequence that requires a validated payload parses and validates it explicitly.

The settlement of such a failure follows the usual rules. With autoAck false the fault sequence decides. When it decides nothing, the settlement timeout passes and failureOutcome applies. A sequence that acknowledges without reading the body acknowledges a document it did not validate. With autoAck true the inbound endpoint acknowledges when the sequence returns, a failed sequence included.

## The limits of 2.x

1. A timed out or retried attempt does not cancel its earlier continuation, so a retry is at least once and a side effect can run twice.
2. autoAck acknowledges on return, the asynchronous work after it is outside the settlement and drain bounds.
3. Direct messaging has no broker redelivery.
4. A transaction's result can be unknown after a connection failure during the commit. The message may be redelivered or gone.
5. An exclusive queue limits transacted consumption to one active flow.
6. A close the broker does not answer, or mediation that never returns, can outlive the drain deadline. Such work is left to the broker's redelivery and reported.
7. The pending ceiling under flow control is the window plus a measured overshoot, and the client's windows stop at 255.
8. Throughput figures hold per workload under the stated assumptions of the [performance page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-performance/).
