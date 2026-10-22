# Performance

What one node of WSO2 Integrator: MI does with the Solace 2.0.0 artifacts, measured on a test bench. The numbers come first, then what limits them, then how they were taken.

## The results

All figures are messages per second on one node, from the throughput measurement. Steady is the load the endpoint handled for five minutes with no backlog building up. Maximum is what it completed when the queue was never empty.

| What you run | Workers | Backend answers in | Steady | Maximum |
| --- | --- | --- | --- | --- |
| consume, call the backend, acknowledge after the answer | 1 | 500 ms | 1.6 | 2.0 |
| the same | 8 | 500 ms | 12.7 | 15.8 |
| the same | 32 | 500 ms | 50.6 | 63.3 |
| the same | 128 | 500 ms | 201.5 | 251.3 |
| the same | 1 | 20 ms | 33 | 41 |
| the same | 8 | 20 ms | 249 | 311 |
| the same | 32 | 20 ms | 503 | 629 |
| the same, the test backend is the limit | 128 | 20 ms | 415 | 518 |
| the same with 100 KB messages | 8 | 500 ms | 12.4 | 15.5 |
| acknowledge on receipt, no wait for the backend | 1 and 8 | 500 ms | 1.6 and 12.7 | not measured |
| transacted consume then publish | 1 | none | 33 | 41 |
| transacted consume then publish | 8 | none | 81 | 101 |
| publish persistent from an API, 32 callers, 8 pooled sessions |  | none | 267 |  |
| publish persistent from an API, 32 callers, 32 pooled sessions |  | none | 888 |  |
| publish direct from an API, 32 callers, 8 pooled sessions |  | none | 5200 |  |
| request reply from an API, 32 callers |  | the responder on the bench | 202 |  |

The endpoint adds little to the backend's own time. In the steady runs with a 500 ms backend, the 99th percentile of the time from the receipt of a message to the settlement call was at most 513 ms, and 520 ms with 100 KB messages. With a 20 ms backend the same percentile was 27 ms at one and eight workers, 47 ms at 32 and 44 ms at 128, where the test backend and the host were the limit.

CPU and memory stay small. Consuming against the 500 ms backend used 0.05 of a core at one worker, 0.11 at eight, 0.24 at 32 and 0.77 at 128. The retained heap after a forced collection stayed between 104 and 125 MB and did not grow during a run, and the thread count did not grow. After each steady run stopped, the endpoint's counters of work in progress were back at zero after 72 to 98 ms, and the broker's queue was empty after 156 to 206 ms. With 100 KB messages the queue took longer: in one run the counters read zero after 82 ms and the queue was empty after 754 ms.

Eight workers gave eight times the throughput of one worker against the 500 ms backend, 7.98 times measured.

## What limits the numbers

Consuming is bounded by the backend. The throughput is about the number of workers divided by the backend's answer time: eight workers divided by half a second is sixteen per second. Add workers until the backend, the HTTP transport or the CPU becomes the limit. At 20 ms with 32 and 128 workers that limit was the test backend and the shared host, not the endpoint.

Publishing with confirmation is bounded by the broker. Each persistent publish waits for the broker's acknowledgement, about 30 ms per message on the test broker, so a pooled session completes about 30 publishes per second and more sessions give more throughput. Direct publishes wait for nothing and are bounded by the host CPU.

Transactions add one commit round trip per message, about 24 ms on the test broker at one worker and longer under eight concurrent transactions, so eight workers gave about two and a half times one worker.

Request reply sends the requests one at a time on its shared session and receives the replies in parallel, which gave 202 requests per second with 32 callers.

## How the numbers were taken

Every run was one minute of warmup and five minutes of measurement, repeated, three times for the steady runs and twice for the maximum runs. A maximum run kept the queue from ever running empty. A steady run offered 80 percent of that maximum for the five minutes and had to show no backlog, no growth in memory or threads, and a return to idle after the load stopped. Latency was measured inside the endpoint, from the receive to the acknowledgement call, so time spent waiting on the broker before delivery does not count.

We also checked what the probe that records this latency costs. With eight workers at a steady 12.65 messages per second, a run without the probe used the same CPU in every thread group as the runs with it, within a thousandth of a core. We checked this at that load only, so it does not show that the probe is free at every load.

The bench was one node of WSO2 Integrator: MI 4.6.0 on JDK 21, a Solace PubSub+ software broker in a container on the same host, a mock HTTP backend with a set delay, and 1 KB JSON messages unless stated. Everything shared one host. The figures are observations for this hardware, this broker, these payloads and these loads. A deployment with the broker and the backend on other hosts adds network time and broker storage time, so it can be slower or faster. Measure your own.

The run had to pass four checks, and did. Eight workers complete at least six times what one worker completes against the 500 ms backend. In transacted mode, the 99th percentile of the delay from the sequence's decision to the start of the commit stays under 50 ms. This is a scheduling delay and does not include the broker's commit time. The steady runs show no growth and return to idle. At the steady load, the 99th percentile of the time from the receipt to the settlement call stays within the backend time plus half a second.

## Compared with ActiveMQ on the same bench

Publishing with a broker confirmation is where Solace 2.0.0 stands out.

| What you run | Solace 2.0.0 | Compared with | Its figure |
| --- | --- | --- | --- |
| publish persistent from an API, 32 callers, each publish confirmed by the broker | 254 per second, pool of 8 sessions | ActiveMQ 5.15.9, stock JMS sender | 115 per second |
| the same, the slowest call in a hundred | 156 ms | ActiveMQ 5.15.9, stock JMS sender | 906 ms |
| consume, call a 500 ms backend, acknowledge after the answer | one message per worker every half second | ActiveMQ 5.15.9, stock JMS transport | the same |
| acknowledge after the backend answered | yes | Solace 1.x | not possible, 1.x acknowledges on receipt |
| acknowledge on receipt, one worker, 500 ms backend, time to reach the backend at the median | 18 ms | Solace 1.x | 20 ms |
| the same, CPU | 0.04 of a core | Solace 1.x | 0.07 of a core |

These figures come from one bench host with both brokers as shipped. They compare the two integration configurations named in each row, as tested. They are not a ranking of the brokers.

## Tuning

| You want | Set | Why |
| --- | --- | --- |
| more throughput on a slow backend | solace.concurrentConsumers up, with enough HTTP connections | throughput is about workers divided by backend time until something else limits it |
| fewer messages taken from the broker but not yet acknowledged | solace.subAckWindowSize, and the queue's max delivered unacknowledged messages per flow | the window is the pending high water mark, not a hard limit. The broker also counts the messages in the workers, the ones still in transit after a stop and any retained deliveries, and its own per flow limit caps the total |
| strict order | solace.concurrentConsumers 1 | the retry in place keeps the order |
| many small publishes from many callers | maxActiveConnections up | one pooled session serves one publish at a time |
| request reply at high concurrency | maxConcurrentRequests within the broker's free endpoints and flows | each request holds a temporary queue and a flow on the broker |
| transacted throughput | more workers on a non exclusive queue | one transaction per message is the model, the commit round trip is the cost |

## Measure it on your own cluster

[How to guide 15]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-run-performance-measurement/) gives the artifacts, the load tool, the probes and the result sheet, so the same shapes can be measured on your cluster with your backend's answer time and your message size.
