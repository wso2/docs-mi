# Run the performance measurement on your own cluster

At the end of this guide you have measured the throughput of one endpoint on your own cluster with the same method as the [performance page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-performance/), so your figures and ours compare.

## Steps

1. Prepare the three parts: a queue for the test, a backend that answers in a known time, and a feeder that publishes persistent messages with a sequence number and the send time in the payload. A mock backend that sleeps for the latency you want to model is enough. The production backend gives the real figure.
2. Deploy the endpoint of [use case 1]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-reliable-consume/) against the test queue with the workers and the window you want to measure, and the HTTP transport sized for them.
3. Run the maximum measurement first: pre spool 120 seconds worth of messages on the queue and feed at 1.5 times the completed rate you saw, so the queue never empties. Record the completed rate. The latency does not apply here.
4. Run the steady measurement: feed at 80 percent of the maximum you measured, 60 seconds of warmup, then 300 seconds of measurement. Record the completed messages per second at the backend, the latency from the send time in the payload to the backend's receive time at p50, p95 and p99, the server's CPU, the thread count, and the health counters pending, inFlight and pendingMax sampled every second.
5. Repeat each steady run three times and each maximum run at least twice, as for the performance page. When two runs differ by more than 10 percent in completed rate, add one more run, and the median is the figure.
6. After the load stops, record how long the pending work, the retained heap after a forced collection, and the thread count take to return to the idle values.

## Verify

A valid steady run shows no upward trend in pending, retained heap or threads across the 300 seconds, and returns to the idle baseline after the load. A valid maximum run never reaches queue depth zero. The backend's set of sequence numbers equals the sent set, so nothing was lost, and a sequence number seen twice is a duplicate to report. Name the limiting service of each run: the backend, the HTTP transport, the broker, the CPU or the client library. A figure without its limiting service is not comparable.

## Undo

Undeploy the test endpoint and purge the test queue. Remove the feeder's messages from the dead message queue if any were rejected.
