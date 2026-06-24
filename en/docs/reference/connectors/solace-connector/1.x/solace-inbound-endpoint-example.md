# Solace Inbound Endpoint Example

The Solace Inbound Endpoint lets WSO2 Integrator: MI **consume** messages from a [Solace PubSub+](https://solace.com/products/event-broker/) broker. It listens on a queue or topic and injects each received message into a mediation sequence, where you can process it and settle it with `acknowledgeMessage` / `nackMessage`, or answer it with `sendReply`.

## What you'll build

Continuing the **SkyWay** airline scenario from the [Solace Connector Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-example/), this example builds the **consumer** side with two event integrations:

1. **OrderQueueListener** consumes order messages from the **`Q.orders`** queue using guaranteed messaging. The sequence validates each order and explicitly settles it:
    * valid order → **`acknowledgeMessage`** (removed from the queue),
    * invalid order (more than 9 seats) → **`nackMessage` REJECTED** (routed to the Dead Message Queue, no redelivery, because an order that breaks the booking limit can never succeed on retry).

    Any unexpected processing error is left unsettled, so the configured **Fallback Failure Outcome (`FAILED`)** redelivers the message for another attempt.

2. **SeatRequestListener** subscribes to the **`airline/request/seats/>`** topic and answers each seat-availability request with **`sendReply`**. This is the replier that completes the synchronous request-reply started by the connector's `sendRequest` operation.

Together these cover the inbound endpoint and the `acknowledgeMessage`, `nackMessage`, and `sendReply` operations.

## Step 01: Set up the Solace environment

Follow [Set up the Solace Environment]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/) to:

* Start a Solace broker and note the **Host URL**, **Message VPN**, **Username**, and **Password** (basic authentication).
* Create the **`Q.orders`** queue (or let the inbound endpoint auto-provision it. See [Provision Destination]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-reference/)).
* For the queue settlement scenario, configure a **Dead Message Queue (DMQ)** and a max-redelivery count on `Q.orders` in PubSub+ Manager so that `REJECTED` and exhausted `FAILED` messages have somewhere to go.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-dmq.png" title="Add Event Integration" width="80%" alt="Dead Message Queue"/>

!!! warning "Install the Solace JCSMP client"
    Before deploying, install `com.solacesystems:sol-jcsmp:10.30.1` and `org.apache.servicemix.bundles:org.apache.servicemix.bundles.jzlib:1.1.3_2` into `<MI_HOME>/lib` and restart the server. See [Install the required JARs]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/#install-the-required-jars).

## Step 02: Configure the inbound endpoints in WSO2 Integrator: MI

Follow these steps in the MI for VS Code extension.

1. [Create a new project]({{base_path}}/develop/create-integration-project/) (or reuse the project from the connector example).

2. In the **Add Artifact** interface, under **Create an Integration**, click **Event Integration**.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/add-event-integration.png" title="Add Event Integration" width="80%" alt="Add Event Integration"/>

3. Select **Solace** from the list of available event integrations.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-select-inbound.png" title="Select Solace inbound" width="80%" alt="Select Solace inbound"/>

### Listener 1: consume and settle orders from a queue

4. Fill the form to create the first inbound endpoint:

    | Field | Value |
    | ----- | ----- |
    | **Event Integration Name** | `OrderQueueListener` |
    | **Automatically generate sequences** | `true` |
    | **Solace Host** | Your broker host, e.g. `tcp://localhost:55555` |
    | **Solace VPN Name** | `default` |
    | **Authentication Scheme** | `BASIC` |
    | **Username** | `default` |
    | **Password** | `default` |
    | **Destination Type** | `QUEUE` |
    | **Destination Name** | `Q.orders` |
    | **Content Type** | `application/json` |
    | **Auto Acknowledge** | `false` (the sequence settles messages manually) |
    | **Fallback Failure Outcome** | `FAILED` |

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-orderqueue-form.png" title="OrderQueueListener configuration" width="80%" alt="OrderQueueListener configuration"/>

    !!! tip "Filter messages with a selector"
        Set the optional **Selector** field to a SQL-92 selector expression so the broker delivers only matching messages to this endpoint, evaluated server-side only on message headers and the **User Properties** set when publishing. Selectors apply to `QUEUE` and durable topic (DTE) destinations only. For example, 
        
        - `region = 'EU' AND channel = 'counter'` receive only counter-channel EU orders.
        - `priority >= 5 AND region = 'EU'` receive only EU orders with priority 5 or higher.

5. Open the generated **`OrderQueueListener-inboundSequence`** and build the validation and settlement logic:

    1. Add a **Log** mediator that logs the incoming order.

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-add-log-mediator.png" title="Add the Log mediator" width="1000" alt="Log Mediator"/>

    2. Add an **If-Else** mediator with the condition `${payload.seats > 9}`.

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-add-filter.png" title="Add the If-Else mediator" width="1000" alt="If-Else Mediator"/>

    3. In the **then** branch (too many seats), add a **Log** mediator and a **NACK Message** operation with **Outcome Type** set to `REJECTED`.
    4. In the **else** branch (valid order), add a **Log** mediator and an **Acknowledge Message** operation.

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-filter-logic.png" title="Configure the then and else branches" width="1000" alt="If-Else Mediator Logic"/>

    Expand the full sequence below and paste it into the **Source** view of the sequence:

    ??? example "OrderQueueListener-inboundSequence (full XML)"

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="OrderQueueListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <log category="INFO" logMessageID="false" logFullPayload="false">
                <message>[ORDER] received: ${payload}</message>
            </log>
            <filter xpath="${payload.seats &gt; 9}">
                <then>
                    <log category="WARN">
                        <message>[ORDER] Seat limit exceeded.</message>
                    </log>
                    <solace.nackMessage>
                        <outcomeType>REJECTED</outcomeType>
                        <responseVariable>solaceNackResponse</responseVariable>
                    </solace.nackMessage>
                </then>
                <else>
                    <log category="INFO">
                        <message>[ORDER] Accepted</message>
                    </log>
                    <solace.acknowledgeMessage>
                        <responseVariable>solaceAckResponse</responseVariable>
                    </solace.acknowledgeMessage>
                </else>
            </filter>
        </sequence>
        ```

    !!! note
        The settlement operations (`acknowledgeMessage`, `nackMessage`) act on the message currently delivered by the inbound endpoint, so they do not need a `configKey`. They work only when the inbound endpoint has **Auto Acknowledge** set to `false`.

    !!! note "Transient failures use the fallback, not an explicit nack"
        The sequence only NACKs `REJECTED` for invalid orders (more than 9 seats). It does **not** NACK `FAILED` anywhere. If processing throws an unexpected error (for example, a downstream call fails), the sequence leaves the message unsettled and the **Fallback Failure Outcome** (`FAILED`, set on the endpoint) redelivers it. There is no need for an error sequence that calls `nackMessage`.

### Listener 2: reply to seat-availability requests from a topic

6. Create a second **Event Integration** of type **Solace** for the replier:

    | Field | Value |
    | ----- | ----- |
    | **Event Integration Name** | `SeatRequestListener` |
    | **Automatically generate sequences** | `true` |
    | **Solace Host** | Your broker host, e.g. `tcp://localhost:55555`|
    | **Solace VPN Name** | `default` |
    | **Authentication Scheme** | `BASIC` |
    | **Username** | `default` |
    | **Password** | `default` |
    | **Destination Type** | `TOPIC` |
    | **Subscription Type** | `DIRECT` |
    | **Destination Name** | `airline/request/seats/>` |
    | **Content Type** | `application/json` |


    The `>` wildcard subscribes to every flight, e.g. `airline/request/seats/SW220`.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-seatrequest.png" title="SeatRequestListener configuration" width="1000" alt="SeatRequestListener configuration form"/>

7. Build the reply logic for **`SeatRequestListener-inboundSequence`**:

    1. Create a separate Solace connection named `SOLACE_REPLY_CONNECTION` for the reply. You cannot reuse the connector's `SOLACE_CONNECTION` here, so configure a new connection with the same broker host, VPN, and credentials, exactly as in the [connector example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-example/#create-the-solace-connection).

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-reply-connection.png" title="Create the SOLACE_REPLY_CONNECTION" width="1000" alt="Solace Reply Connection"/>

    2. Optionally, add a **Log** mediator to log the incoming request.
    3. Add a **Payload Factory** mediator that builds the seat-availability reply : `{"flightNo":"${payload.flightNo}","available":["12A","14C","22F"],"count":3}`

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-reply-payload.png" title="Add the Payload Factory mediator" width="1000" alt="Solace Reply Payload"/>

    4. Add the **Send Reply** operation and select `SOLACE_REPLY_CONNECTION`.

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-send-reply.png" title="Add the Send Reply operation" width="1000" alt="Add send reply operation"/>

        The completed reply sequence looks like the following:

        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-inbound-send-reply-sequence.png" title="Completed reply sequence" width="1000" alt="Send reply Sequence"/>

    Expand the full sequence below and paste it into the **Source** view of the sequence:

    ??? example "SeatRequestListener-inboundSequence (full XML)"

        ```xml
        <sequence name="SeatRequestListener-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <log category="INFO">
                <message>[SEATS] inquiry received: ${payload}</message>
            </log>
            <payloadFactory media-type="json" template-type="default">
                <format>{"flightNo":"${payload.flightNo}","available":["12A","14C","22F"],"count":3}</format>
            </payloadFactory>
            <solace.sendReply configKey="SOLACE_REPLY_CONNECTION">
                <deliveryMode>DIRECT</deliveryMode>
                <messageType>TEXT</messageType>
                <applicationMessageType>SEAT_QUERY_REPLY</applicationMessageType>
                <responseVariable>solaceResponse</responseVariable>
            </solace.sendReply>
        </sequence>
        ```

    !!! note
        `sendReply` uses the 'reply-to' destination and 'correlation ID' carried on the inbound request message, so you do not specify a destination. It works only inside a sequence driven by an inbound endpoint that received a request message.

## Step 03: Run and test

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide, or click the **Run** button in the MI for VS Code extension. Both inbound endpoints connect to the broker and begin listening on startup.

### Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/solace-inbound-example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! warning
    Update the connection host, username, and password to match your own broker before deploying.

### Test the queue listener (ack / nack)

Publish messages to `Q.orders`. The easiest way is the connector example's `/skyway/orders` resource, or **Try Publish** in PubSub+ Manager.

* **Valid order → acknowledged and removed from the queue:**

    ```bash
    curl -H "Content-Type: application/json" --request POST \
      --data '{"orderId":"ORD-1001","flightNo":"SW220","seats":2}' \
      http://localhost:8290/skyway/orders
    ```

    MI log:

    ```
    [ORDER] received: {"orderId":"ORD-1001","flightNo":"SW220","seats":2}
    [ORDER] Accepted
    ```

* **More than 9 seats → NACK REJECTED, routed to the DMQ** (an order that breaks the booking limit can never succeed on retry, so it is dead-lettered immediately rather than redelivered):

    ```bash
    curl -H "Content-Type: application/json" --request POST \
      --data '{"orderId":"ORD-1002","flightNo":"SW220","seats":12}' \
      http://localhost:8290/skyway/orders
    ```

    ```
    [ORDER] received: {"orderId":"ORD-1002","flightNo":"SW220","seats":12}
    [ORDER] Seat limit exceeded.
    ```

    In PubSub+ Manager, open **Queues** and check the DMQ. The rejected message should appear there.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-dmq-result.png" title="Queue and DMQ result" width="80%" alt="Queue and DMQ result"/>

### Test the request-reply listener (sendReply)

With `SeatRequestListener` running, invoke the connector's `/skyway/seats/query` resource:

```bash
curl -H "Content-Type: application/json" --request POST \
  --data '{"flightNo":"SW220"}' \
  http://localhost:8290/skyway/seats/query
```

**Expected response**: the reply produced by `SeatRequestListener` and delivered back to `sendRequest`:

```json
{ "flightNo": "SW220", "available": ["12A", "14C", "22F"], "count": 3 }
```

## What's next

* See the **[Solace Inbound Endpoint Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-reference/)** for every inbound parameter, including durable topic subscriptions, selectors, destination provisioning, and SSL/TLS.
* See the **[Solace Connector Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-reference/)** for the producer-side operations.
