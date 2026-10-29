# Broker outage and recovery

An endpoint survives a broker outage without any operator action. The client reconnects on its own without giving up, what the client gives up on the endpoint recovers with a new generation, and an endpoint deployed while the broker is down comes up when the broker returns.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-recovery.png" title="Generation 1 runs, the broker is lost, the client reconnects, the endpoint recovers, generation 2 runs" width="800" alt="Generation 1 runs, the broker is lost, the client reconnects, the endpoint recovers, generation 2 runs"/>

## What happens

1. The broker becomes unreachable. The Solace client reconnects on its own, with solace.reconnectRetries at minus one by default, so it never stops trying. The health shows recovering and the lifecycle stays running. Messages delivered before the loss are redelivered by the broker when the session is back.
2. The loss is terminal for the client, for example the queue was deleted or the client gave up because a limit was set. The endpoint drains the current generation, retires it, and starts a new generation with a back off between attempts, 1 second, then 2, 4 and so on up to 60 seconds, without an attempt limit by default. The retired generation is closed on a separate closer thread, so a broker that does not answer a close cannot hang the endpoint.
3. The broker is back. The new generation binds, the health shows active, and the broker redelivers the messages that were in flight.

A pause or an undeploy during any of this drains the work in flight within drainTimeout and leaves parked messages to the broker. A Direct topic subscription is reapplied after a reconnect.

An endpoint deployed while the broker is down fails its first start. WSO2 Integrator: MI 4.7.0 retries that first start with a back off until it succeeds. On WSO2 Integrator: MI 4.6.0, apply the latest U2 update level for this server retry. On an older 4.6.0 update level the endpoint stays failed until a redeploy, as in 1.x.

The connector keeps its own work bounded during an outage too. A pooled session that cannot connect is tried again by the next call, with at most one attempt per session at a time. The connection holds at most twice maxActiveConnections pooled physical sessions, counting those still connecting or being closed, also when the pool replaces its session holders. A call beyond that waits within its own deadline and then faults EXPIRED with nothing sent, so a long outage never piles up connect attempts or closes. When the broker is back the next call connects.

## The parameters that matter

| Parameter | Default | Use |
| --- | --- | --- |
| solace.reconnectRetries | -1 | the client's own reconnect, unlimited |
| solace.reconnectRetryWait | 3000 | the wait between the client's reconnect attempts, in ms |
| solace.recovery.initialDelay, progression, maxDelay | 1000, 2.0, 60000 | the back off of the endpoint's own recovery loop |
| solace.recovery.maxAttempts | -1 | attempts before the endpoint stops in failed, unlimited by default |
| solace.drainTimeout | 30000 | the upper limit of a pause, a resume and an undeploy, at least 3000 |
| solace.drainOutcome | NONE | what happens to messages still in flight when the drain runs out of time: left to the broker, or REJECTED |

## The log lines

During a client reconnect: `session reconnecting` and `session reconnected`. During a recovery: `generation 1 is recovering`, then `connection attempt 1 failed; next attempt in 1000 ms` for each attempt, then `generation <n> started` when an attempt succeeds. Every attempt takes the next generation number, so the log of an outage reads as one story. On the bench a queue that was gone for 11 seconds took four failed attempts, and the endpoint came back as generation 6.

## The health words

The status moves from active to recovering and back to active. During a client reconnect the lifecycle stays running and the connectivity reads reconnecting. During a recovery the lifecycle reads recovering. The generation number in the health block increases with every connection attempt of a recovery, not by one per recovery.

The words as the server returned them on the bench, cut to the three axes, in the instant an endpoint drained its generation before a recovery and, for comparison, while it consumed.

```json
"status": "recovering", "lifecycle": "draining", "connectivity": "connected", "activity": "active", "generation": 1
"status": "active", "lifecycle": "running", "connectivity": "connected", "activity": "active", "generation": 1
```
