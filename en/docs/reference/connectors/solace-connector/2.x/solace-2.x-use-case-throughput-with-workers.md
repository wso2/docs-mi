# Throughput with workers

One endpoint handles several messages at a time, holds back the broker with flow control when its workers are busy, and never stalls another endpoint on the node. The number of workers is the one parameter to set.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-workers.png" title="The dispatcher hands messages to N workers, parks the rest, and stops the flow at the high mark" width="800" alt="The dispatcher hands messages to N workers, parks the rest, and stops the flow at the high mark"/>

## The shape

The broker pushes messages into the endpoint's own client context. The dispatcher runs on that context's thread and never blocks. With a free worker it hands the message over and returns. With none it parks the message in a pending queue and, when the queue reaches the transport window, stops the flow so the broker sends no more. A worker that finishes takes the next parked message before it releases its permit, and starts the flow again at the low mark, so the broker is asked for more while the workers still have work.

## The model

The throughput of one endpoint on one node is about N divided by the worker occupancy, capped by the slowest service on the path. The occupancy is the time a worker spends on one delivery: the inject, the wait for the decision, the retries and the settlement. When the backend's latency dominates, the throughput is N divided by that latency. With a backend that answers in 500 ms, one worker gives 2 messages per second and eight workers give 16, as long as the backend and the HTTP transport have the capacity.

A worker is a parked thread while it waits, so tens of workers cost little CPU. Each holds its stack, its message and its message context.

## The parameters that matter

| Parameter | Default | Use |
| --- | --- | --- |
| solace.concurrentConsumers | 1 | the number of workers, and the bound on deliveries in progress |
| solace.subAckWindowSize | 255 | the transport window, 1 to 255. It is also the pending high water mark of the flow control. It is not a hard limit on pending messages |
| the HTTP transport |  | must allow N calls in flight at once |
| the queue's max delivered unacknowledged messages per flow | broker default | at least the window, so the broker does not throttle below the client's window |

When the pending queue reaches the window, the high water mark, the dispatcher stops the flow. It starts the flow again when the pending queue falls to the low mark, the smaller of N and the window minus one. The workers then still have parked messages to take while the broker sends more. Messages that the Solace client had already received still arrive after the stop, so the pending queue can pass the window. How far depends on the workload. One bench run peaked at 409 pending messages with a window of 255.

The broker counts more than the pending queue. Its count of delivered and unacknowledged messages for the flow also holds the messages in the workers, and the deliveries an endpoint retains on purpose: with failureOutcome NONE, or after a settlement that failed, a message stays delivered and unsettled after its worker moved on, counted as retainedUnsettled. The queue's max delivered unacknowledged messages per flow limits all of them together. Size the window, N and that broker limit together.

```xml
<parameter name="solace.concurrentConsumers">8</parameter>
<parameter name="solace.subAckWindowSize">16</parameter>
```

## Ordering

Above one worker the order is per worker, not per queue. A flow that needs strict order keeps N at 1 and relies on the retry in place, see [use case 3]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-ordering/).

## The log lines

The flow control logs one line when it stops the flow at the high mark and one when it starts it at the low mark, never one per message. The start line carries the number of messages still pending.

## The health words

The counters pending, pendingMax and inFlight show the flow control at work. inFlight stays at most N. pending rises to about the window and can pass it by the messages already on their way. pendingMax is the peak pending count the endpoint has seen, not the overshoot alone. retainedUnsettled counts the deliveries kept unsettled on purpose.

## Measured

| What | Result |
| --- | --- |
| 1000 messages against a 500 ms backend, eight workers against one | 63.6 s against 509.3 s, 8.00 times faster |
