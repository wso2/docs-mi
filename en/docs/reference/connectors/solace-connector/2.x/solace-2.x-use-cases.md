# Use cases

Each use case page shows one integration shape: the picture, the artifacts with the parameters that matter, the log lines you will see, the health words to watch, and the result the test campaign measured for that shape. Pick the page that matches the flow you are building.

| Use case | What you get |
| --- | --- |
| [1 Reliable consume with an HTTP backend]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-reliable-consume/) | acknowledged after the backend answered, retried on failure, dead lettered when the retries are exhausted |
| [2 Throughput with workers]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-throughput-with-workers/) | several messages at a time per endpoint, a bounded number of unsettled messages, no stall across endpoints |
| [3 Ordering with one worker]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-ordering/) | strict order kept through retries |
| [4 Broker outage and recovery]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-broker-outage-recovery/) | reconnect that never gives up, recovery with a back off, nothing to restart |
| [5 High availability across nodes]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-ha-across-nodes/) | task coordination, or the broker's active and standby flows |
| [6 Transacted consume then publish]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-transacted-consume-publish/) | the consumed message and the publishes commit or roll back together |
| [7 Publish with confirmation]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-publish-with-confirmation/) | every guaranteed publish confirmed under a deadline, rejections surfaced with the broker's reason |
| [8 Request reply and dual channel]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-request-reply/) | synchronous request reply on a dedicated session, the reply channel created and removed by the connector |
| [9 Poll with leases]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-poll-with-leases/) | a message handed to an API call with a lease, settled from the sequence |
| [10 OAuth2 with a rotating token file]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-oauth2-token-file/) | token rotation without a restart |
| [11 Observability]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-observability/) | status, health axes, counters, the log line index and the fault codes |

Every page ends with the same four parts: the parameters that matter, the log lines, the health words, and the measured result.
