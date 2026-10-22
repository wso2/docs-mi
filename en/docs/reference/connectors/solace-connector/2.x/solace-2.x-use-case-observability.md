# Observability

The management API and ICP show what the broker sees: one status word, three health axes and the counters. The log carries a fixed set of lines an operator can grep for, and every fault of the connector has a code and a name.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-health.png" title="The endpoint reports status, health and counters through the management API to ICP and to any monitor" width="800" alt="The endpoint reports status, health and counters through the management API to ICP and to any monitor"/>

## The status word

GET https://host:9164/management/inbound-endpoints?inboundEndpointName=OrderListener returns the endpoint with its status and a health block. Below the latest U2 update level of WSO2 Integrator: MI 4.6.0 the status is the task state.

| Status | Meaning |
| --- | --- |
| active | consuming, or with the active flow in broker side high availability |
| standby | bound, the broker holds this flow standby |
| connected | running, and the broker has not reported the flow as active or standby: before the first indication, or on a broker without the capability. On an exclusive queue the word is active once the broker reports the flow. |
| recovering | connecting, draining or recovering, or the client is reconnecting. Captured on the bench in the instant an endpoint drained its generation before a recovery: status recovering, lifecycle draining, connectivity connected, generation 1. |
| failed | the endpoint stopped after a refusal at start or after recovery.maxAttempts |
| stopped | deactivated through the management API or the CLI, or undeployed. A 1.x endpoint shows inactive in the same case |

## The three axes

| Axis | Values | What it means |
| --- | --- | --- |
| lifecycle | stopped, connecting, running, draining, recovering, failed | the state of the endpoint |
| connectivity | connected, reconnecting, disconnected, per resource and as a whole | the session, each flow and, for a Direct topic, the subscriptions. It reads disconnected before the first bind and after a refusal at start, and reconnecting when any resource is not connected |
| activity | active, standby, unknown, per flow and as a whole | the broker's active flow indication. It reads unknown until the first indication and always when the broker lacks it |

The axes, the status and the generation number come from one point in time. The counters beside them are written by the workers without that lock, so they are an approximate reading taken during the snapshot.

## The counters

| Counter | Meaning |
| --- | --- |
| received | messages the dispatcher took from the broker |
| decided by outcome | ACK, FAILED, REJECTED decisions made by the sequence, the timeout or the drain |
| applied, settled by outcome | what the worker did with each decision and what reached the broker |
| inFlight, pending, pendingMax | messages on a worker, messages parked, the highest number parked |
| retainedUnsettled, settleFailed | messages kept unsettled on purpose, and settles the broker refused |
| dropped | messages discarded at a flow loss or above the Direct bound |
| generation | the number of the current connection attempt |

Health never triggers a recovery. It reports.

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
| REQUEST\_REPLY\_ERROR, POLL\_ERROR | 700104, 700105 | the operation's own failure |
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
