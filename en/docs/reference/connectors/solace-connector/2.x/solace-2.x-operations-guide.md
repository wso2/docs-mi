# Operations guide

What an operator sizes, watches and does. The endpoint and the connector recover from broker failures on their own, so most of this page is about reading the signs, and the rest is about the broker settings each shape needs.

## Sizing

| Unit | Application threads | Broker connections | Broker flows |
| --- | --- | --- | --- |
| inbound endpoint, manual or auto acknowledgement | N workers plus a lifecycle thread and a closer thread | 1 | 1 |
| inbound endpoint, transacted | the same | 1 | N |
| connector connection | a watchdog, a closer, a connect thread while a session connects, one per cached poll flow, one per open connector owned transaction | the pool size plus 2, the poll and request reply sessions created on first use | the poll flows in use plus one temporary flow per request in flight |

The Solace client adds its own context threads to each unit, measured by name in the performance campaign. A worker waiting for a backend is a parked thread, so the cost of N is memory for its stack, its message and its context, not CPU.

## The broker settings each shape needs

| Shape | On the broker |
| --- | --- |
| every queue consumed with manual acknowledgement | a dead message queue and a maximum redelivery count, for REJECTED and for the broker's own redelivery |
| a transacted queue | the two above, and max delivered unacknowledged messages per flow set to 1, on transacted queues only, since at 1 it limits a non transacted flow to one message |
| a queue that collects a topic | reject message to sender on discard set to always, or a publish to the topic is lost without a trace when the queue's ingress is shut down |
| the client username | a connection limit of at least the pool size plus two per connector connection plus one per inbound endpoint |
| request reply | free non durable endpoints and client profile egress flows of at least maxConcurrentRequests plus the poll flows plus one. A Standard broker at the 100 connection tier allows 100 of each in total |
| manual acknowledgement with FAILED and REJECTED | a broker that reports the settlement outcomes. On one that does not, requireSettlementOutcomes AUTO retains such messages and reconnects so the broker redelivers them |
| OAuth2 | a TLS listener, the client refuses OAuth on a plain connection |

## The failure modes and what to do

| What you see | What is happening | What to do |
| --- | --- | --- |
| status recovering, the log shows session reconnecting | the client lost the broker and reconnects on its own | nothing, the broker redelivers the messages in flight when the session is back |
| status recovering, the log shows generation N is recovering and connection attempt lines | the loss was terminal for the client, the endpoint retries with a back off | nothing, unless the cause is on your side, a deleted queue or a changed ACL |
| status failed at deploy time | a refused configuration, a 1.x connector deployed, a missing shared subscription capability, or recovery.maxAttempts reached | read the ERROR line, it names the cause |
| the counters show retainedUnsettled growing | the broker lacks a settlement outcome the sequence uses, or a settle was refused | check the broker's settlement outcome support. The messages are redelivered after the reconnect |
| the counters show settleFailed | the flow was gone when the worker settled, the broker redelivers | nothing, it is counted and the message comes back |
| messages reach the dead message queue unprocessed behind a failing one on a transacted queue | max delivered unacknowledged per flow is not 1 | set it on the queue |
| two nodes evict each other on the broker, closed by peer in a loop | clientNameStrict true with one name on two nodes, or two server processes on one host without distinct node ids | let the names carry the node, or set distinct node ids |
| a publish reports success and nothing arrives | Direct delivery, or a topic collected by a queue with its ingress shut down and reject on discard at its default | PERSISTENT delivery, reject on discard always, read the queue's discard counters |
| sendRequest fails at once with a 503 about non durable endpoints or flows | the broker's limit is below maxConcurrentRequests | lower the bound or size the broker |
| a graceful stop takes up to ackTimeout | a publish waits on an unreachable broker and the server drains the transports before it destroys the connector | expected, the stop is bounded by ackTimeout and by the server's graceful shutdown timeout, 180 seconds by default |
| the endpoint starts paused after a restart | a deactivation through the management API persists, in the inbound state registry and in the task store | activate it again through the management API, or for a clean start delete both registry entries, named below |

## What never happens by itself

Health reports and never recovers. A paused endpoint stays paused across restarts, because the deactivation is persisted twice: under registry governance repository components org.apache.synapse.inbound, and in the task store under org.wso2.carbon.tasks definitions ESB\_TASK with the task state property PAUSED. An operator who wants a clean start after a deactivation deletes both.

An inbound endpoint checks the connector library only when it starts. After any change of the connector library, a new version or a redeploy of it, redeploy the inbound endpoint as well.

A few timings to know. A session rebuilt while the broker is unreachable holds the operation for ackTimeout at most, and the connect attempt itself ends on its own thread at the Solace connect timeout. A confirmation pending on a session that went down is reported at ackTimeout, not at the moment of the loss. A disconnected client's temporary queues linger about a minute on the broker. Under a timeout storm on request reply, many callers timing out together, the shared request reply session may be rebuilt once, the callers in flight at that instant report UNKNOWN, and the next caller rebuilds it within milliseconds.

## The log lines to grep

| Grep for | Meaning |
| --- | --- |
| `starting generation` | a connection attempt of an inbound endpoint |
| `is recovering` | a terminal loss, the endpoint's own recovery |
| `session reconnecting`, `session reconnected` | the client's own reconnect, no recovery |
| `rebuilt (generation` | a connector session rebuilt after a failure |
| `connected (generation 1)` | the first connect of a connector session, INFO, normal |
| `retry in`, `exhausted` | in place retries and the cutoff |
| `parked messages discarded` | messages parked at a flow loss, redelivered by the broker |
| `reconnect refused` | a retired generation or a failed session declined its own reconnect, by design |
| `contains no settlement operation` | a manual acknowledgement sequence that never settles, at deploy time |
| `cannot start` | the endpoint refused at start, the line names the cause |

## The health words

active, standby, connected, recovering, failed and stopped are the status. lifecycle, connectivity and activity are the axes. The [observability page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-observability/) lists the counters. An alert on recovering that lasts longer than the recovery back off plus the broker's own restart time is the one alert worth setting.
