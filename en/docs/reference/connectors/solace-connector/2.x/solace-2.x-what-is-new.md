# Solace 2.x: what is new

Solace 2.x is the new version of the Solace inbound endpoint and the Solace connector for WSO2 Integrator: MI. It changes when a consumed message is acknowledged, how many messages one endpoint handles at a time, how an endpoint recovers from a broker failure, how a body and its content type travel, and what the management API shows about it. The two artifacts are released together and are upgraded together.

## When a message is acknowledged

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-what-is-new.png" title="In 1.x the message was acknowledged when the sequence returned. In 2.0.0 it is acknowledged when the sequence decides." width="800" alt="In 1.x the message was acknowledged when the sequence returned. In 2.0.0 it is acknowledged when the sequence decides."/>

## 1.x against 2.x

| Topic | 1.x | 2.x |
| --- | --- | --- |
| Manual acknowledgement | acknowledged when the sequence returned, before the backend answered | the worker waits for the decision of acknowledgeMessage or nackMessage, up to settlementTimeout |
| Default failure outcome | NONE, the message stayed unacknowledged | FAILED, retried in place with a back off, then REJECTED after maxRedeliveries |
| Concurrency | one message at a time per endpoint | concurrentConsumers workers per endpoint, bounded unsettled messages, flow control toward the broker |
| Threads | one callback thread shared by every session in the server | one client context per endpoint and per connector connection, the mediation on worker threads |
| Reconnect | three attempts, then the endpoint was torn down | unlimited reconnect in the client, then the endpoint's own recovery loop with a back off |
| First start during a broker outage | the endpoint stayed dead until a redeploy | retried by the server with a back off |
| Pause, undeploy | the flow closed at once, the work in flight redelivered | drained within drainTimeout, nothing acknowledged silently |
| High availability | task coordination only | task coordination, or the broker's active and standby flows with coordination false |
| Client names | the configured name as given | the configured prefix, the node and the endpoint, unless clientNameStrict is true |
| Transactions | the consumed message could not be part of a transaction | transacted true consumes and publishes in one transaction per message |
| Publish | returned before the broker acknowledged | waits for the acknowledgement under ackTimeout, a rejection is a fault with the broker's reason |
| Request reply | the request held a pooled session while it waited | a dedicated session, up to maxConcurrentRequests requests, temporary queues cleaned up |
| Poll | a new flow per call, acknowledged on receipt | cached flows on a dedicated session, ackMode CLIENT with a lease |
| OAuth2 | a static token | a token file read at every connect and reconnect |
| Health | the task state | status, lifecycle, connectivity, activity and counters in the management API |
| Credentials | copied into the message context | kept inside the connection |
| Content types | JSON or XML guessed from the first character of a message without a declared type | improved content type handling on the platform's builders and formatters, by the declared type, with no guess. SOAP is a later item |

## Versions and the server level

The inbound endpoint 2.x requires a 2.x connector. It refuses to start while a 1.x connector is deployed and logs an error that names the required version. The connector 2.x works with the inbound endpoint 1.x, so the connector can be upgraded first.

Both artifacts run on WSO2 Integrator: MI 4.6.0 and above. The health block in the management API and the server side retry of a failed first start come with the latest U2 update level of WSO2 Integrator: MI 4.6.0 and 4.7.0. On an older update level a failed first start is not retried by the server, and the management API shows the task state.

The Solace client library is not bundled. Install sol-jcsmp 10.30.1 and jzlib 1.1.3\_2 in the lib folder of the server once, as for 1.x.

## Which path to Solace

Two paths reach a Solace PubSub+ broker from WSO2 products, and they do different things.

1. The Solace inbound endpoint and connector, this page set, use the native Solace client. They are the path with settlement after asynchronous work, worker pools, the broker's own high availability, transactions over the consumed message, and health in the management API.
2. The JMS transport of WSO2 Integrator: MI with the Solace JMS library is the path for a team that uses JMS for every broker and needs no Solace specific feature.

## Where to go next

In fifteen minutes the [quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/) shows the basic pattern. It consumes one queue, calls an HTTP backend and acknowledges the message after the call. The [use case pages]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-cases/) show one integration shape each with its parameters, its log lines and its health words. The [migration page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-migration-from-1.x/) lists what changes for a 1.x project. The [configuration reference]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#results-of-poll-sendrequest-and-browse) shows what poll, sendRequest and browse return.
