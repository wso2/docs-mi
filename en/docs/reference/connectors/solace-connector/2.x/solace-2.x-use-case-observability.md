# Observability

The health block of an endpoint answers three questions: is it consuming, if not why, and what happened to the messages. Read the status word first. Read the counters when the status or a symptom sends you there. The log carries a fixed set of lines an operator can grep for, and every fault of the connector has a code and a name.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-health.png" title="The endpoint reports status, health and counters through the management API to ICP and to any monitor" width="800" alt="The endpoint reports status, health and counters through the management API to ICP and to any monitor"/>

## The status word

GET https://host:9164/management/inbound-endpoints?inboundEndpointName=OrderListener, with the login token of the [quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/), returns the endpoint with its status and a health block. ICP shows the same under Inbound Endpoints. WSO2 Integrator: MI 4.7.0 includes this health reporting. On WSO2 Integrator: MI 4.6.0, apply the latest U2 update level. Older 4.6.0 update levels show the task state only.

This is the answer after the quick start, as the test bench returned it. The configuration and the parameters are cut, and the health keys are grouped for reading. The server returns them in no fixed order.

```json
{
  "name": "OrderListener",
  "status": "active",
  "sequence": "orderProcessSeq",
  "error": "orderFaultSeq",
  "configuration": "<inboundEndpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"OrderListener\" ...",
  "parameters": [ ... ],
  "health": {
    "status": "active",
    "lifecycle": "running",
    "connectivity": "connected",
    "connectivity.session": "connected",
    "connectivity.flow-1": "connected",
    "activity": "active",
    "activity.flow-1": "active",
    "generation": 1,

    "received": 4,
    "redelivered": 0,
    "retried": 6,
    "decided.ACK": 3,
    "decided.FAILED": 7,
    "decided.REJECTED": 0,
    "decided.TIMEOUT": 0,
    "decided.DRAIN": 0,
    "decided.INJECTION_REJECTED": 0,
    "decided.AUTOACK": 0,
    "decided.OTHER": 0,
    "applied.ACK": 3,
    "applied.FAILED": 0,
    "applied.REJECTED": 1,
    "applied.NONE": 0,
    "settled.ack": 3,
    "settled.failed": 0,
    "settled.rejected": 1,

    "inFlight": 0,
    "pending": 0,
    "pendingMax": 0,
    "freePermits": 1,

    "retainedUnsettled": 0,
    "settleFailed": 0,
    "dropped": 0,
    "leftByDrain": 0,
    "abandoned": 0,
    "rejectedSubmit": 0,
    "handlerFailed": 0,
    "closeRejected": 0,
    "degradedOutcomes": 0,

    "committed": 0,
    "rolledBack": 0,
    "rolledBackByBroker": 0,
    "unknown": 0,

    "lastErrorAt": 0
  }
}
```

How to read it. The endpoint is consuming: status active, lifecycle running, everything connected, generation 1. Four messages came in. Three were acknowledged, settled.ack 3. One failed on every attempt and was rejected to the dead message queue, settled.rejected 1. One more failed three times before the backend came back and then went through. Together that is 7 failed attempts and 6 retries. Nothing is waiting, inFlight 0 and pending 0, and every key in the last three groups is 0, as it should be.

| Status | What it means | What to do |
| --- | --- | --- |
| active | consuming | nothing |
| connected | bound and healthy, but the broker has not said active or standby. A node that bound second on an exclusive queue reads this, and a Direct topic endpoint always does | nothing |
| standby | bound, and another node's flow has the queue | nothing. It takes over when the broker makes its flow active |
| recovering | starting, reconnecting, recovering, or draining for a pause or an undeploy | wait. Alert when it lasts longer than the broker needs to come back |
| failed | stopped after a refusal at start or after recovery.maxAttempts | read lastError, fix the cause, then activate or redeploy the endpoint |
| stopped | deactivated or undeployed, or the other node under task coordination | nothing, unless you expected it to run |

## Six readings and what they mean

Each reading is a health block from the test bench, cut to the keys that matter.

### All messages went through

`received 1000, decided.ACK 1000, settled.ack 1000, inFlight 0, pending 0`

Every message reached the sequence, the sequence acknowledged it, and the client library took the acknowledgement while the session was connected. Nothing is waiting. This is the normal reading.

### The backend failed and one message went to the dead message queue

`received 2, decided.ACK 1, decided.FAILED 4, retried 3, applied.REJECTED 1, settled.rejected 1`

decided counts attempts and applied counts messages. The first message was acknowledged on its first attempt. The second failed four times, the first attempt and three retries, and was rejected to the dead message queue. Look at the backend, and at the message in the dead message queue.

### The endpoint is busy

`concurrentConsumers 8: inFlight 8, pending 29, pendingMax 29`

All eight workers are busy and 29 messages wait for a worker. The endpoint stopped the flow, so the broker holds the rest of the queue. This is normal under load. One endpoint completes about N messages per backend response time, here about 16 a second against a 500 ms backend. More workers or a faster backend raise it.

### The broker was away for a minute

`status recovering, lifecycle running, connectivity reconnecting, generation 1`

The Solace client lost the broker and reconnects by itself. When the broker is back the status returns to active, still generation 1. Nothing to do.

### The queue was deleted

`status recovering, lifecycle recovering`, then `status active, generation 6`

The loss was final for the client, so the endpoint closed its connection and built a new one. Every attempt took the next generation number, and the fifth attempt succeeded once the queue existed again. The log line `connection attempt <n> failed` says why each attempt failed, here 503 Unknown Queue.

### A message waits and then comes back

`inFlight 1` for the whole settlementTimeout, then `decided.TIMEOUT 1`

The sequence ended without acknowledgeMessage or nackMessage, so the message waited for the settlement timeout and was then retried. Look for the deploy time WARN that names the sequence, and add the missing settlement on that path.

## Set alerts on these

- status failed.
- status recovering for longer than your broker needs to restart.
- handlerFailed or closeRejected above 0. Both mean a defect. Send the log to support.
- retainedUnsettled growing. These messages stay unsettled on the broker until the endpoint reconnects, and they count against the queue's limit of delivered unacknowledged messages.
- dropped growing on a Direct topic. Those messages are lost.

## Good to know

- The counters count since the deploy or the server start. A recovery does not reset them. inFlight, pending, pendingMax and freePermits belong to the current generation.
- settled means the client library took the settle while the session was connected. The broker's own counters are on the broker.
- After a stop, read only the status. The other words keep their last values.
- lastErrorAt is the time of the last error in milliseconds since 1970, and lastError holds its text. Both stay after a recovery.
- Health never triggers a recovery. It reports.

## Every key in one table

| Group | Keys | What they say |
| --- | --- | --- |
| words | status, lifecycle, connectivity, activity, and the same per session and per flow | the state of the endpoint, of its connection, and the broker's active flow indication |
| generation | generation | the last connection attempt that reached running. It goes up by one per attempt |
| messages | received, decided.\*, applied.\*, settled.\*, retried, redelivered | what came in, what was decided per attempt, what was done per message, and which settlements the client library took |
| load | inFlight, pending, pendingMax, freePermits | messages on a worker, messages waiting for one, the highest wait, the free workers |
| left to the broker or lost | retainedUnsettled, settleFailed, dropped, leftByDrain, abandoned, rejectedSubmit | messages the broker delivers again, except dropped on a Direct topic |
| defects and limits | handlerFailed, closeRejected, degradedOutcomes | 0 in normal running. degradedOutcomes counts the outcomes the broker does not support |
| transacted | committed, rolledBack, rolledBackByBroker, unknown | the outcome of each transaction |
| errors | lastErrorAt, lastError | the last error |

## The log line index

| Event | Line |
| --- | --- |
| start | `starting generation <n>`, then the started line with the queue |
| client reconnect | `session reconnecting`, `session reconnected` |
| recovery | `generation <n> is recovering`, `connection attempt <n> failed; next attempt in <ms> ms` |
| retry | `message <id> attempt <n> failed; retry in <ms> ms`, `exhausted <n> in-place retries; rejecting (DMQ when eligible)` |
| flow loss | `parked messages discarded`, with the count |
| deploy time WARNs | a manual acknowledgement sequence with no settlement operation, a strict client name two nodes will share, a transacted endpoint naming the three queue settings |
| connector session | `session <name> connected (generation 1)`, `session <name> rebuilt (generation <n>)`, `session <name> reconnecting`, `session <name> DOWN` |
| poll | `poll flow <queue> closed (<why>)`, `polled message <id> was not settled within pollAckTimeout` |

## The fault codes of the connector

| Name | Code | Family |
| --- | --- | --- |
| CONNECTION\_ERROR | 700101 | refused, no session could be had |
| PUBLISH\_ERROR | 700102 | safe, before the send |
| INVALID\_CONFIG | 700103 | refused |
| REQUEST\_REPLY\_ERROR, POLL\_ERROR | 700104, 700108 | the operation's own failure |
| TRANSACTION\_ACTIVE | 700111 | a pooled session with an open transaction cannot be rebuilt |
| TRANSACTION\_COMPLETED | 700112 | a command reached a transaction that had ended |
| INBOUND\_TRANSACTION | 700113 | an operation not allowed inside an inbound owned transaction |
| REQUEST\_IN\_TRANSACTION | 700114 | sendRequest inside any transaction |
| POLL\_UNSETTLED, POLL\_FLOW\_LIMIT | 700115, 700116 | a CLIENT poll with a lease outstanding, no idle flow |
| REQUEST\_CONCURRENCY\_EXCEEDED | 700117 | maxConcurrentRequests reached within requestTimeout |
| DEADLINE\_BEFORE\_SEND | 700118 | safe, the deadline passed before the send |
| DEADLINE | 700119 | uncertain, no acknowledgement within the deadline, outcome UNKNOWN |
| EXPIRED | 700120 | safe, the deadline passed in a wait or a connect |
| UNKNOWN | 700121 | uncertain, an exception inside or after the send |
| NACK | 700122 | refused by the broker, with the subcode and the phrase |
| ROLLED\_BACK | 700123 | the broker rolled the transaction back |
| PAYLOAD\_ERROR | 700124 | the body could not be read, built or written, or its charset or user properties are wrong. publishMessage, sendReply and the request side of sendRequest fault before any broker call, so nothing was sent. A sendRequest that faults on its reply has already sent the request, so a retry is not safe by itself. A poll with ackMode AUTO has already taken the message off the queue, with CLIENT the lease is still held. Every case is in [Fault 700124 by operation]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#fault-700124-by-operation). When the parser's message contains the name of a platform parser exception, the platform reports 601000 instead |
| TRANSACTION\_CONNECTION\_MISMATCH | 700125 | an operation on another connection inside a connector owned transaction |
| TRANSACTION\_MESSAGE\_LIMIT | 700126 | a second consuming poll in one connector owned transaction |
