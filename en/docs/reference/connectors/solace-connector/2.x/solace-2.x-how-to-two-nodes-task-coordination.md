# Run two nodes with task coordination

At the end of this guide two nodes share a coordination database, the task layer of WSO2 Integrator: MI runs the endpoint on one of them, and a dead node hands over within the coordination time.

## Steps

1. Give each node its own node id, node1 and node2, through the nodeId environment variable or node\_id under cluster\_config in deployment.toml.
2. Point both nodes at one coordination database and keep the coordination defaults. The detection time is the heartbeat interval times the maximum retries, 15 seconds with the defaults.

    ```toml
    [[datasource]]
    id = "WSO2_COORDINATION_DB"
    url = "jdbc:mysql://db:3306/coordination"
    username = "mi"
    password = "$secret{coordination_db}"
    driver = "com.mysql.cj.jdbc.Driver"
    ```

3. Keep coordination at its default of true on the inbound endpoint, or set it so.

    ```xml
    <parameter name="coordination">true</parameter>
    ```

4. Deploy the same CAR on both nodes.
5. Publish messages and kill the node whose log shows the task scheduled.

## Verify

One node logs the task scheduled line for the endpoint and the first generation started. Its management API shows the endpoint with status connected, since the broker reports no active flow indication to a flow that binds this way. The other node shows the endpoint without a running task. The broker's client list shows one client for the endpoint.

After the kill the surviving node logs the task scheduled line and starts its generation within the coordination time plus the connect and the bind, and the broker redelivers the messages that were in flight on the dead node once it drops that node's session. On the bench with the coordination hardening off, the default of WSO2 Integrator: MI, the surviving node took the task 16.7 s after the kill, which is the task layer's detection on its 15 second formula, and bound its flow half a second later. With the hardening on, the surviving node took the task and started its generation 16.0 s after the kill. In both runs the 2 messages in flight on the dead node were delivered again to the survivor, and none of the 240 were lost.

## Undo

Stop one node. The task stays on the other. If the stopped node ran the task, the other node takes it after the coordination time. On the bench with the coordination hardening on, a stop did not hand the task back. The other node took it when the heartbeat expired and consumed again 19 s after the stop. The 2 messages the stopped node had received but not processed were delivered to it, and none of the 240 were lost. To go back to one node for good, remove the coordination datasource and set coordination to false, or leave the datasource and run one node, which the task layer handles as a cluster of one.
