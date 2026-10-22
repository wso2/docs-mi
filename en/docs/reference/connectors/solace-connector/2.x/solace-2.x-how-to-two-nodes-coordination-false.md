# Run two nodes with coordination false on an exclusive queue

At the end of this guide two nodes bind the same exclusive queue, the broker keeps one flow active and the other standby, and a dead node hands over in the broker's own time with nothing lost.

## Steps

1. Give each node its own node id. Set the environment variable nodeId, or node\_id under cluster\_config in deployment.toml, to node1 and node2. Without it two servers on one host would share the host name as the node id.
2. On the broker create Q.orders as an exclusive queue, with a dead message queue.
3. In the inbound endpoint set coordination to false. No coordination database is needed in this mode.

    ```xml
    <parameter name="coordination">false</parameter>
    <parameter name="solace.clientName">orders</parameter>
    <parameter name="solace.destinationType">QUEUE</parameter>
    <parameter name="solace.destinationName">Q.orders</parameter>
    ```

4. Deploy the same CAR on both nodes.
5. Publish messages and kill the node whose log says flow ACTIVE.

## Verify

After the deploy both nodes log their bind. One logs `flow ACTIVE` and shows status active in its management API. The other logs only its started line and shows connected with activity unknown, because the broker sends no indication to a flow that binds as standby. A node logs `flow INACTIVE` and shows standby when its active flow loses the queue to another node. The broker's client list shows two clients, orders, node1, OrderListener and orders, node2, OrderListener, and the queue shows two flows with one active.

After the kill the standby node logs `flow ACTIVE` within the broker's detection of the lost session, its status becomes active, and the messages that were in flight on the dead node are redelivered to it. The test campaign measured a consumption gap of 0.369 seconds for this hand over and no lost message.

On a broker without active flow indication both nodes show connected and activity unknown. The broker still fails over, and the endpoint logs a WARN at bind that names the missing capability.

## Undo

Set coordination back to true, which is the default, and deploy. Only the node the task layer schedules binds from then on.
