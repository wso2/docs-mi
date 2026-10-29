# How to guides

Each guide is one task with numbered steps, the exact artifact XML, the command or the click, and what the log and the health API show when the step worked. Every guide ends with how to verify and how to undo.

| Guide | Task |
| --- | --- |
| 1 | [Install both artifacts in a project and deploy them in a CAR]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-install-and-deploy/) |
| 2 | [Consume from a queue and acknowledge after an HTTP call]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-consume-and-acknowledge/) |
| 3 | [Nack a message and route it to the dead message queue]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-nack-to-dmq/) |
| 4 | [Set the worker pool and the window for a throughput target]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-worker-pool-and-window/) |
| 5 | [Run two nodes with coordination false on an exclusive queue]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-two-nodes-coordination-false/) |
| 6 | [Run two nodes with task coordination and a coordination database]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-two-nodes-task-coordination/) |
| 7 | [Consume transacted and publish in the same transaction]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-transacted-consume-and-publish/) |
| 8 | [Publish with confirmation from an API]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/) |
| 9 | [Request reply between two integrations]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-request-reply/) |
| 10 | [Poll a queue with leases from an API]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-poll-with-leases/) |
| 11 | [Rotate an OAuth2 token file without a restart]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-rotate-oauth2-token/) |
| 12 | [Read health and counters from the management API and ICP]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-read-health/) |
| 13 | [Tune the settlement timeout through deployment.toml]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-tune-settlement-timeout/) |
| 14 | [Upgrade a 1.x project to 2.x]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-upgrade-from-1.x/) |
| 15 | [Run the performance measurement on your own cluster]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-run-performance-measurement/) |
| 16 | [Consume JSON, XML, text and binary messages and see what the sequence gets]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-consume-json-xml-text-binary/) |
| 17 | [Publish binary and text bodies from HTTP and from the File connector]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-binary-and-text/) |
| 18 | [Transform a message read by the inbound endpoint or by poll and publish it]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-transform-and-publish/) |

The guides assume the [environment page]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/) was followed: a broker you can reach, a client username, and the Solace client in the server's lib folder.
