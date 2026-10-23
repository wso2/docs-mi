# Set the worker pool and the window for a throughput target

At the end of this guide one endpoint processes N messages at a time under flow control, sized from a throughput target and the backend's latency.

## Steps

1. Work out N. The throughput of one endpoint on one node is about N divided by the time a worker spends on one message, which is the backend's latency when the backend dominates. For 20 messages per second against a backend that answers in 500 ms, N is 10 with no margin. Take 16.
2. Set the workers and the window on the inbound endpoint. The window is the transport window, the number of messages the broker may push before the client acknowledges them at the transport level, and the pending high water mark of the flow control. Keep it at least N and at most 255.

    ```xml
    <parameter name="solace.concurrentConsumers">16</parameter>
    <parameter name="solace.subAckWindowSize">32</parameter>
    ```

3. Size the HTTP transport for N calls in flight at once, in deployment.toml, so the HTTP connector does not queue the calls behind each other. The passthrough transport's worker pool must allow at least N threads for this endpoint beside the other load of the node.
4. On the broker, set the queue's max delivered unacknowledged messages per flow to at least the window, so the broker does not throttle below the client's window. Leave it at the broker default when it is already higher.
5. Deploy, pre spool a few hundred messages on the queue, and watch.

## Verify

The backend sees N requests in flight at once. The management API shows inFlight at N while the queue drains, pending around the window, and pendingMax as the peak pending count of this workload, which can be above the window. On our bench the broker's unacknowledged count for the flow stayed inside the window plus N plus pendingMax. Deliveries the endpoint retains on purpose, shown as retainedUnsettled, come on top of that, and the queue's own limit on delivered unacknowledged messages applies to the total. The log shows one stop line when the pending queue reaches the window and one start line when it is back at the low mark, never one line per message. The completed throughput is close to N divided by the backend's latency. When it is not, the limiting service is the backend, the HTTP transport or the broker, in that order of likelihood.

## Undo

Set solace.concurrentConsumers back to 1 and remove the window parameter. The endpoint drains its workers within drainTimeout on the redeploy.
