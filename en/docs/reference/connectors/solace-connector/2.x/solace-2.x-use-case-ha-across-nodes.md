# High availability across nodes

Two nodes run the same endpoint in one of two modes. With coordination true, the default, the task layer of WSO2 Integrator: MI decides which node consumes. With coordination false every node binds the queue and the broker decides, with one flow active and the others standby. In both modes the nodes no longer evict each other, because every client name carries the node.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-ha.png" title="Two nodes under the broker's active and standby flows, and under task coordination" width="800" alt="Two nodes under the broker's active and standby flows, and under task coordination"/>

## The two modes

|  | coordination true | coordination false |
| --- | --- | --- |
| who decides | the task layer of WSO2 Integrator: MI, through the coordination database | the broker |
| what binds | one node, the one the task is scheduled on | every node binds its own flow |
| failover time | the coordination detection, heartbeat interval times max retries, 15 s with the defaults, plus the connect and bind | the broker's detection of the lost session, the standby flow is already bound |
| exclusive queue | one consumer | one active flow, the rest standby, shown in the health block |
| non exclusive queue | one consumer | every node consumes, the order across nodes is not kept |
| Direct topic | one node | every node receives every message, unless sharedSubscriptionGroup splits the stream |
| health status | active on the scheduled node | active on the consuming node, standby on the others, connected when the broker reports no active flow indication |

## The artifacts

```xml
<parameter name="coordination">false</parameter>
<parameter name="solace.clientName">orders</parameter>
<parameter name="solace.sharedSubscriptionGroup">orders</parameter>
```

coordination is the generic inbound parameter. There is no Solace specific high availability parameter. sharedSubscriptionGroup applies to a Direct topic with coordination false and subscribes the group form of the topic, so that the broker spreads the stream across the nodes of the group.

## Client names

An endpoint connects to the broker as the configured prefix, the node id and the endpoint name. A connector session connects as the prefix, the node id, the connection name and a number, and the two dedicated sessions end in rr and poll. The node id is the node.id system property, else the nodeId system property or environment variable, else the node\_id of the cluster configuration in deployment.toml, else the host name. Two server processes on one host need distinct node ids. A name longer than 160 bytes is cut at the prefix and ends with a short hash.

clientNameStrict true sends the configured name as it is, as 1.x did, for a script or a monitor that keys on it. The endpoint then logs a WARN at deploy time, because two nodes with the same name evict each other on the broker.

## The log lines

With coordination false the consuming node logs `flow ACTIVE` and the others log `flow INACTIVE`. A Direct topic without a group logs one INFO line at bind that says every node receives every message. The node id source is logged at INFO at start.
