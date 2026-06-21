# Solace Connector Example

<!-- Opt in to bordered image-tab windows (see .image-tabs in mitheme.css). -->
<span class="image-tabs"></span>

This example shows how WSO2 Integrator: MI uses the Solace Connector to act as a client of a [Solace PubSub+](https://solace.com/products/event-broker/) event broker. From a mediation flow, you can publish messages, perform synchronous request-reply, browse and poll queues, and group publishes into local transactions.

## What you'll build

!!! info "Usecase"
    This example uses a fictional airline, **SkyWay** that runs its booking platform on a Solace broker so that the different parts of the business can exchange events reliably. When a customer places a booking, the order is published to a queue for guaranteed processing by the fulfilment system, while a lightweight notification is broadcast to a topic so that interested services (such as loyalty and analytics) can react. Front-end services query live seat availability through synchronous request-reply, operators browse and poll the order queue to inspect or drain pending bookings, an order is processed by polling it and publishing a follow-on event together in a single transaction so the broker never holds partial state.

A single REST API with the context `/skyway` exposes one resource per operation, grouped by messaging pattern:

| Resource | Method | Operation used | What it does |
| -------- | ------ | -------------- | ------------ |
| `/orders` | `POST` | `publishMessage` | Publishes an order to the **`Q.orders`** queue with guaranteed (persistent) delivery and waits for the broker acknowledgement. |
| `/notifications` | `POST` | `publishMessage` | Broadcasts an order-created event to the **`airline/orders/created`** topic using direct (best-effort) delivery. |
| `/seats/query` | `POST` | `sendRequest` | Sends a seat-availability request to the **`airline/request/seats/{flightNo}`** topic and waits for a reply (synchronous request-reply). |
| `/orders/browse` | `GET` | `browse` | Returns a non-destructive preview of the messages currently on **`Q.orders`**. |
| `/orders/poll` | `GET` | `poll` | Consumes a single message from **`Q.orders`**. |
| `/orders/atomic` | `POST` | `beginTransaction`, `poll`, `publishMessage`, `commit`, `rollback` | Polls an order from **`Q.orders`** and publishes a processed-order event inside one local transaction, so both settle together or neither does. |

The reply side of `/seats/query` (the `sendRequest` partner operation `sendReply`) and the queue-consumption settlement operations (`acknowledgeMessage`, `nackMessage`) are covered in the [Solace Inbound Endpoint Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-example/).

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the environment

Follow the steps in [Set up the Solace Environment]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/) to start a Solace broker, create the **`Q.orders`** queue, and obtain the **Host URL**, **Message VPN**, **Username**, and **Password** for basic authentication. Keep these values handy; you will use them when creating the connection.

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project in the MI for VS Code extension.

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `SkyWayAPI` and the API context as `/skyway`.

### Create the Solace connection

All operations share a single Solace connection. You will create it once (from the first operation you configure) and reuse it everywhere.

1. Open any resource of the API in **Design** view, click the **+** icon on the canvas to open the **Mediator Palette**, and then under **Connections** tab, click **Add new connection**.

2. Search for the **Solace** connector.

3. Provide the following values to connect to the broker using basic authentication, then click **Add**:

    | Field | Value |
    | ----- | ----- |
    | **Connection Name** | `SOLACE_CONNECTION` |
    | **Host URL** | Your broker host, e.g. `tcp://localhost:55555` (or `tcps://...:55443` for TLS) |
    | **VPN Name** | `default` |
    | **Authentication Scheme** | `BASIC` |
    | **Username** | Your broker username, e.g. `default` |
    | **Password** | Your broker password, e.g. `default` |

    Leave the remaining fields (connection settings, SSL/TLS, advanced message options) at their defaults.

    !!! note
        For a TLS host (`tcps://`), expand **SSL/TLS Security** and provide a trust store that contains the broker's CA certificate, or, for a self-signed broker in a lab, set **Validate Certificate** (and, if needed, **Validate Certificate Hostname**) to `false`. Never disable certificate or hostname validation in production, as it removes protection against man-in-the-middle attacks.

    === "Step 1: Add new connection"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/new-connection-palette.png" title="Open the Mediator Palette and add a new connection" width="1000" alt="New connection palette"/>

    === "Step 2: Search for Solace"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/search-connection-palette.png" title="Search for the Solace connector" width="1000" alt="Search connection palette"/>

    === "Step 3: Enter connection details"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-add-connection.png" title="Add Solace connection form" width="1000" alt="Add Solace connection"/>

    !!! info "Client Name"
        **Client Name** is an optional connection setting that uniquely identifies this session on the broker (it appears in PubSub+ Manager under **Clients**). Solace requires client names to be **unique within a Message VPN**: if two sessions connect with the same name, the broker disconnects the duplicate. Leave it blank to let the broker auto-generate a unique name. Set it explicitly only when you want a recognizable name for monitoring or troubleshooting, and in that case give each endpoint and connection (`OrderQueueListener`, `SeatRequestListener`, and `SOLACE_REPLY_CONNECTION`) a distinct value so they do not collide.
    
    !!! tip
        The created connection appears in the **Connection** drop-down of every Solace operation. Select `SOLACE_CONNECTION` whenever you configure an operation below.

### Publish messages

Both the publish-subscribe (topic) and point-to-point (queue) patterns use the same **Publish Message** operation. Only the destination type and delivery mode change. The first resource is shown in full; the second reuses the same steps with different field values.

#### 1. Publish an order to a queue (guaranteed delivery)

This resource publishes an incoming order to the `Q.orders` queue with **persistent** delivery and blocks until the broker acknowledges it.

1. Create the `/orders` resource (**URI Template**: `/orders`, **HTTP Method**: `POST`). See [Add new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources).

2. Add the **Publish Message** operation and configure it:

    - **Connection**: `SOLACE_CONNECTION`
    - **Destination Type**: `QUEUE`
    - **Destination Name**: `Q.orders`
    - **Message Type**: `TEXT`
    - **Delivery Mode**: `PERSISTENT`
    - **Correlation ID**: `{${payload.orderId}}`
    - **User Properties**: `region=EU`, `channel=counter`
    - **Wait For Ack**: `true`
    - **Ack Timeout**: `5000`

    !!! note "Wait For Ack"
        - Applies only to `PERSISTENT` / `NON_PERSISTENT` delivery (`DIRECT` messages are never acknowledged). When enabled, the publish blocks until the broker confirms the message is spooled, up to `ackTimeout`. 
    
        - The outcome is reported as `ackStatus` (`ACK` | `NACK` | `TIMEOUT`). A `NACK`/`TIMEOUT` throws unless `continueOnAckFailure` is `true`. Ignored inside a transaction where durability comes from `commit`.

    !!! tip "Tag messages with user properties for later filtering"
        Use the optional **User Properties** field to attach key-value metadata to the message (here, `region=EU` and `channel=counter`). Consumers can then filter on these properties with a selector, so only matching messages are delivered, without inspecting the payload.

3. Add a [Payload Factory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/) that emits the publish result from `${vars.solace_publishMessage_1.payload}`, followed by a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/). (The publish operation returns a status object in its response variable rather than overwriting the message body.)

    === "Step 1: Find Publish Message operation"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/search-solace-publish-queue.png" title="Search for the Publish Message operation" width="1000" alt="Search Publish Message"/>

    === "Step 2: Configure operation"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/add-solace-publish-queue.png" title="Publish Message configuration form" width="1000" alt="Publish Message form"/>

    === "Step 3: Add Payload Mediator"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/add-payload-solace-publish-queue.png" title="Add the Payload Factory mediator" width="1000" alt="Payload Factory mediator"/>

    === "Step 4: Add Respond Mediator"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-publish-queue.png" title="Publish Message resource with Respond" width="1000" alt="Publish Message Queue resource"/>

#### 2. Broadcast a notification to a topic (direct delivery)

Same **Publish Message** operation as above, but published to a topic with best-effort (`DIRECT`) delivery, so there is no broker acknowledgement.

1. Create the `/notifications` resource (`POST`).

2. Add the **Publish Message** operation and configure it:

    - **Connection**: `SOLACE_CONNECTION`
    - **Destination Type**: `TOPIC`
    - **Destination Name**: `airline/orders/created`
    - **Message Type**: `TEXT`
    - **Delivery Mode**: `DIRECT`

3. Add a [Payload Factory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/) that returns `{"result":"published"}`, followed by a **Respond** mediator.

    === "Step 1: Configure Publish Message operation"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/configure-solace-publish-topic.png" title="Configure the Publish Message operation" width="1000" alt="Configure Publish Message"/>

    === "Step 2: Add Payload Mediator"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/add-payload-publish-topic.png" title="Add the Payload Factory mediator" width="1000" alt="Add Payload Mediator"/>

    === "Step 3: Add Respond Mediator"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/add-respond-publish-topic.png" title="Publish Message resource with Respond" width="1000" alt="Publish Message Topic resource"/>

### 3. Request-reply

`sendRequest` publishes a request and blocks until a reply arrives on a temporary reply-to destination, or until the request times out.

1. Create the `/seats/query` resource (**URI Template**: `/seats/query`, **HTTP Method**: `POST`).

2. Add the **Send Request** operation:

    - **Connection**: `SOLACE_CONNECTION`
    - **Destination Type**: `TOPIC`
    - **Destination Name**: `{${"airline/request/seats/" + payload.flightNo}}`
    - **Message Type**: `TEXT`
    - **Delivery Mode**: `DIRECT`
    - **Request Timeout (ms)**: `30000`
    - **Overwrite Body**: `true`

3. Add a **Respond** mediator. The reply payload becomes the API response.

    === "Step 1: Configure Send Request operation"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/configure-solace-browse.png" title="Configure the Send Request operation" width="1000" alt="Configure Send Request"/>

    === "Step 2: Add Log Mediator"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-request-reply-log.png" title="Add a Log mediator" width="1000" alt="Request-Reply Log mediator"/>

    === "Step 3: Add Respond Mediator"
        <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-request-reply.png" title="Send Request resource with Respond" width="1000" alt="Request-Reply resource"/>   

    !!! note
        A replier must be listening on `airline/request/seats/>` to answer the request. The [Solace Inbound Endpoint Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-example/) builds exactly that replier using the `sendReply` operation. Without a replier, this resource returns a timeout.

### Consume from a queue

You can read `Q.orders` in two ways without an inbound endpoint: `browse` previews messages without removing them, and `poll` consumes a single message. Both reuse the same step pattern as the publish resources.

#### 4. Browse the order queue (non-destructive)

1. Create the `/orders/browse` resource (`GET`).

2. Add the **Browse Queue** operation and configure it:

    - **Connection**: `SOLACE_CONNECTION`
    - **Queue Name**: `Q.orders`
    - **Max Messages**: `10`
    - **Browse Timeout (ms)**: `2000`
    - **Overwrite Body**: `true`

    !!! note "Reading the response"
        - Each browsed message is an element of the payload array. Message fields like `messageId`, `correlationId`, `expiration`, `replyTo`, and `userProperties` appear only when the broker set them, so null-check before use.
        
        - The `destination` and `messageCount` can be found in `${vars.<responseVariable>.attributes}`. 

3. Add a **Log** mediator to log 'destination' and 'message count'.        

4. Add a **Respond** mediator. Browsing does not consume the messages, so live consumers still receive them.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-browse-queue.png" title="Browse Queue resource with Respond" width="1000" alt="Browse Queue resource"/>

    !!! tip "Filter with a selector"
        Set the optional **Selector** field to a SQL-92 selector expression to preview only the messages whose properties match, instead of the whole queue. The expression is evaluated only against message headers and the **User Properties** set when publishing.For example, 
        
        - `region = 'EU' AND channel = 'counter'` polls the next counter-channel EU order.
        - `priority >= 5 AND region = 'EU'` polls the next EU order with priority 5 or higher.

#### 5. Poll a single message from the queue

1. Create the `/orders/poll` resource (`GET`).

2. Add the **Poll Message** operation and configure it:

    - **Connection**: `SOLACE_CONNECTION`
    - **Queue Name**: `Q.orders`
    - **Poll Timeout (ms)**: `5000`
    - **Selector**: `region='EU' AND channel='counter'` (matches the **User Properties** set by the `/orders` publish, so it returns those orders)
    - **Overwrite Body**: `true`

3. Add a **Respond** mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-poll-queue.png" title="Poll Queue resource with Respond" width="1000" alt="Poll Queue resource"/>

    !!! note
        Outside a transaction, a polled message is acknowledged on receipt (at-most-once). Wrap the poll in `beginTransaction`/`commit` if a mediation failure should redeliver the message instead of losing it.

    !!! tip "Filter with a selector"
        Set the optional **Selector** field to a SQL-92 selector expression to consume only the next message whose properties match, leaving non-matching messages on the queue. The expression is evaluated only against message headers and the **User Properties** set when publishing. For example, 

        - `region = 'EU' AND channel = 'counter'` polls the next counter-channel EU order.
        - `priority >= 5 AND region = 'EU'` polls the next EU order with priority 5 or higher.

### Advanced operations

These build on the basics above and need extra broker setup, so you can skip them on a first pass and come back when you need transactions.

#### 6. Atomic poll-and-publish with a local transaction

This resource polls an order from `Q.orders` and publishes a processed-order event inside one transaction. On **commit**, the polled message is acknowledged (removed from the queue) and the publish is sent. On **rollback**, the polled message is redelivered to the queue and the publish is discarded, so the broker is never left in a partial state.

1. Create the `/orders/atomic` resource (**URI Template**: `/orders/atomic`, **HTTP Method**: `POST`).

2. Build the sequence in this order:
    1. **Begin Transaction**: Connection `SOLACE_CONNECTION`, Transaction Timeout (ms) `30000`.
    2. **Poll Message**: Queue Name `Q.orders`, Poll Timeout (ms) `5000`, Overwrite Body `true`.
    3. **Publish Message**: Destination Type `TOPIC`, Destination Name `airline/orders/processed`, Delivery Mode `PERSISTENT`.
    4. A [If Else mediator]({{base_path}}/reference/mediators/filter-mediator/) on `${payload.forceFail}`:
        - **then** branch: **Rollback Transaction**, then a **Payload Factory** that returns `{"result":"rolled-back"}`.
        - **else** branch: **Commit Transaction**, then a **Payload Factory** that returns `{"result":"committed"}`.
    5. A **Respond** mediator.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-transactional.png" title="Transactional poll-and-publish sequence" width="800" alt="Transactional poll-and-publish sequence"/>

## API source

You can copy the following configuration into the **Source** view of the API. It reflects exactly what the steps above produce. Replace `SOLACE_CONNECTION` with your connection name if you used a different one.

??? example "Full API source XML"

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/skyway" name="SkyWayAPI" xmlns="http://ws.apache.org/ns/synapse">
        <!-- 1. Publish an order to a queue (guaranteed) -->
        <resource methods="POST" uri-template="/orders">
            <inSequence>
                <solace.publishMessage configKey="SOLACE_CONNECTION">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.orders</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <correlationId>{${payload.orderId}}</correlationId>
                    <priority>0</priority>
                    <timeToLive>0</timeToLive>
                    <applicationMessageId></applicationMessageId>
                    <applicationMessageType></applicationMessageType>
                    <replyToDestinationType>QUEUE</replyToDestinationType>
                    <replyToDestinationName></replyToDestinationName>
                    <userProperties>[{"region":"EU"},{"channel":"counter"}]</userProperties>
                    <dmqEligible>true</dmqEligible>
                    <elidingEligible>false</elidingEligible>
                    <waitForAck>true</waitForAck>
                    <ackTimeout>5000</ackTimeout>
                    <continueOnAckFailure>false</continueOnAckFailure>
                    <responseVariable>solace_publishMessage_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <payloadFactory media-type="json" template-type="default">
                    <format>${vars.solace_publishMessage_1.payload}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <!-- 2. Broadcast a notification to a topic (direct) -->
        <resource methods="POST" uri-template="/notifications">
            <inSequence>
                <solace.publishMessage configKey="SOLACE_CONNECTION">
                    <destinationType>TOPIC</destinationType>
                    <destinationName>airline/orders/created</destinationName>
                    <deliveryMode>DIRECT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <correlationId></correlationId>
                    <priority>0</priority>
                    <timeToLive>0</timeToLive>
                    <applicationMessageId></applicationMessageId>
                    <applicationMessageType></applicationMessageType>
                    <replyToDestinationType>QUEUE</replyToDestinationType>
                    <replyToDestinationName></replyToDestinationName>
                    <userProperties>[]</userProperties>
                    <dmqEligible>true</dmqEligible>
                    <elidingEligible>false</elidingEligible>
                    <responseVariable>solace_publishMessage_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"result":"published"}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <!-- 3. Synchronous request-reply -->
        <resource methods="POST" uri-template="/seats/query">
            <inSequence>
                <solace.sendRequest configKey="SOLACE_CONNECTION">
                    <destinationType>TOPIC</destinationType>
                    <destinationName>{${&quot;airline/request/seats/&quot; + payload.flightNo}}</destinationName>
                    <deliveryMode>DIRECT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <requestTimeout>30000</requestTimeout>
                    <applicationMessageId></applicationMessageId>
                    <applicationMessageType></applicationMessageType>
                    <userProperties>[]</userProperties>
                    <responseVariable>solace_sendRequest_1</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </solace.sendRequest>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <!-- 4. Browse the queue (non-destructive) -->
        <resource methods="GET" uri-template="/orders/browse">
            <inSequence>
                <solace.browse configKey="SOLACE_CONNECTION">
                    <queueName>Q.orders</queueName>
                    <maxMessages>10</maxMessages>
                    <browseTimeout>2000</browseTimeout>
                    <selector></selector>
                    <responseVariable>solace_browse_1</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </solace.browse>
                <log category="INFO" logMessageID="false" logFullPayload="false">
                    <message>Destination : ${vars.solace_browse_1.attributes.destination}, Message Count : ${vars.solace_browse_1.attributes.messageCount}</message>
                </log>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <!-- 5. Poll a single message -->
        <resource methods="GET" uri-template="/orders/poll">
            <inSequence>
                <solace.poll configKey="SOLACE_CONNECTION">
                    <queueName>Q.orders</queueName>
                    <pollTimeout>5000</pollTimeout>
                    <selector>region='EU' AND channel='counter'</selector>
                    <responseVariable>solace_poll_1</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </solace.poll>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <!-- 6. Atomic poll-and-publish in a local transaction -->
        <resource methods="POST" uri-template="/orders/atomic">
            <inSequence>
                <solace.beginTransaction configKey="SOLACE_CONNECTION">
                    <transactionTimeoutMillis>60000</transactionTimeoutMillis>
                </solace.beginTransaction>
                <solace.poll configKey="SOLACE_CONNECTION">
                    <queueName>Q.orders</queueName>
                    <pollTimeout>5000</pollTimeout>
                    <selector></selector>
                    <responseVariable>solace_poll_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.poll>
                <solace.publishMessage configKey="SOLACE_CONNECTION">
                    <destinationType>TOPIC</destinationType>
                    <destinationName>airline/orders/processed</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <correlationId></correlationId>
                    <priority>0</priority>
                    <timeToLive>0</timeToLive>
                    <applicationMessageId></applicationMessageId>
                    <applicationMessageType></applicationMessageType>
                    <replyToDestinationType>QUEUE</replyToDestinationType>
                    <replyToDestinationName></replyToDestinationName>
                    <userProperties>[]</userProperties>
                    <dmqEligible>true</dmqEligible>
                    <elidingEligible>false</elidingEligible>
                    <waitForAck>false</waitForAck>
                    <responseVariable>solace_publishMessage_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <filter xpath="${payload.forceFail}">
                    <then>
                        <solace.rollback/>
                        <payloadFactory media-type="json" template-type="default">
                            <format>{ "result": "rolled-back" }</format>
                        </payloadFactory>
                    </then>
                    <else>
                        <solace.commit/>
                        <payloadFactory media-type="json" template-type="default">
                            <format>{ "result": "committed" }</format>
                        </payloadFactory>
                    </else>
                </filter>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/solace-connector-example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! warning
    Update the connection host, username, and password to match your own broker before deploying.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide, or simply click the **Run** button in the MI for VS Code extension.

## Testing

Invoke the API resources as shown below.

### 1. Publish an order to a queue

**Request**

```bash
curl -H "Content-Type: application/json" --request POST \
  --data '{"orderId":"ORD-1001","flightNo":"SW220","seats":2}' \
  http://localhost:8290/skyway/orders
```

**Expected response**

```json
{
    "ackStatus": "ACK",
    "messageType": "TEXT",
    "deliveryMode": "PERSISTENT",
    "ackReceived": true,
    "publishedAt": 1781851112383,
    "destination": "Q.orders",
    "destinationType": "QUEUE",
    "correlationKey": "Q.orders-0f7fb623-c543-41d4-8d24-ac6d29c5234d"
}
```

The message has been queued in Q.orders. You can confirm its presence in PubSub+ Manager by opening **Queues → Q.orders**.

### 2. Broadcast a notification to a topic

```bash
curl -H "Content-Type: application/json" --request POST \
  --data '{"orderId":"ORD-1001","status":"CREATED"}' \
  http://localhost:8290/skyway/notifications
```

**Expected response**

```json
{ "result": "published" }
```

Direct messages are delivered only to active subscribers at publish time. There is no message spooling, so offline subscribers will not receive them.

### 3. Query seat availability (request-reply)

This requires a replier listening on `airline/request/seats/>`. Build it with the [Solace Inbound Endpoint Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-example/).

```bash
curl -H "Content-Type: application/json" --request POST \
  --data '{"flightNo":"SW220"}' \
  http://localhost:8290/skyway/seats/query
```

**Expected response** (the reply produced by the replier)

```json
{ "flightNo": "SW220", "available": ["12A", "14C", "22F"], "count": 3 }
```

### 4. Browse the queue

```bash
curl http://localhost:8290/skyway/orders/browse
```

**Expected response** (messages are previewed, not consumed)

```json
[
    {
        "elidingEligible": false,
        "dmqEligible": true,
        "deliveryMode": "PERSISTENT",
        "payload": "{\r\n    \"orderId\": \"ORD-1001\",\r\n    \"flightNo\": \"SW220\",\r\n    \"seats\": 2\r\n}",
        "destination": "Q.orders",
        "messageId": "5",
        "correlationId": "ORD-1001",
        "priority": 0,
        "contentType": "application/json",
        "redelivered": false
    },
    {
        "elidingEligible": false,
        "dmqEligible": true,
        "deliveryMode": "PERSISTENT",
        "payload": "{\r\n    \"orderId\": \"ORD-1002\",\r\n    \"flightNo\": \"SW220\",\r\n    \"seats\": 5\r\n}",
        "destination": "Q.orders",
        "messageId": "7",
        "correlationId": "ORD-1002",
        "priority": 0,
        "contentType": "application/json",
        "redelivered": false
    }
]
```
MI Log :
```
[2026-06-22 13:53:18,180]  INFO {LogMediator} - {api:SkyWayAPI GET /skyway/orders/browse} Destination : Q.orders, Message Count : 3 
```

### 5. Poll a message from the queue

```bash
curl http://localhost:8290/skyway/orders/poll
```

**Expected response**

```json
{
    "orderId": "ORD-1001",
    "flightNo": "SW220",
    "seats": 2
}
```

If the queue is empty, the poll returns `"received": false, "timedOut": true` after the poll timeout.

!!! note "Reading the response"
    The message body is the payload. Metadata is under `${vars.<responseVariable>.attributes.<key>}`. `destination`, `received`, and `timedOut` are always present, and a received message also adds `priority`, `redelivered`, `dmqEligible`, `elidingEligible`, `deliveryMode`, and `contentType`. Fields like `messageId`, `correlationId`, `expiration`, `replyTo`, and `userProperties` appear only when the broker set them, so null-check before use.

### 6. Atomic poll-and-publish (commit and rollback)

This resource consumes from `Q.orders`, so first make sure at least one order is on the queue (for example, by calling `/skyway/orders`).

**Commit path** (default). The polled order is acknowledged (removed) and the processed event is published:

```bash
curl --request POST http://localhost:8290/skyway/orders/atomic
```
**Expected response**

```json
{ "result": "committed" }
```

MI Log :
```
[2026-06-22 14:05:17,073]  INFO {SolaceTransactionRegistry} - TransactionRegistry: registered txId=f6d83776-7857-4330-8864-666c4f0f615e (connectionName=SOLACE_CONNECTION, connectionId=SOLACE_CONNECTION, timeoutMillis=60000, activeCount=1) 
[2026-06-22 14:05:17,073]  INFO {SolaceBeginTransaction} - solace.beginTransaction: started txId=f6d83776-7857-4330-8864-666c4f0f615e (timeout=60000ms) 
[2026-06-22 14:05:17,112]  INFO {SolacePollMessage} - solace.poll: txId=f6d83776-7857-4330-8864-666c4f0f615e resolved to connectionId=SOLACE_CONNECTION 
[2026-06-22 14:05:17,223]  INFO {SolacePublishMessage} - solace.publishMessage: txId=f6d83776-7857-4330-8864-666c4f0f615e resolved to connectionId=SOLACE_CONNECTION 
[2026-06-22 14:05:17,264]  INFO {SolacePublishMessage} - solace.publishMessage: txId=f6d83776-7857-4330-8864-666c4f0f615e transacted send queued (correlationKey=tx-SOLACE_CONNECTION-4851f392-8ce0-41ce-9b88-9336321526ef, ackStatus=TX_PENDING) 
[2026-06-22 14:05:17,334]  INFO {SolaceConnection} - Transaction committed on connection: SOLACE_CONNECTION 
[2026-06-22 14:05:17,353]  INFO {SolaceCommit} - solace.commit: txId=f6d83776-7857-4330-8864-666c4f0f615e committed successfully 
```

**Rollback path**. Set `forceFail` to `true`; the polled order is redelivered to `Q.orders` and the publish is discarded:

```bash
curl -H "Content-Type: application/json" --request POST \
  --data '{"forceFail":"true"}' \
  http://localhost:8290/skyway/orders/atomic
```

**Expected response**

```json
{ "result": "rolled-back" }
```

MI Log :
```
[2026-06-22 14:10:25,985]  INFO {SolaceTransactionRegistry} - TransactionRegistry: registered txId=396c86b9-19c9-4cea-b618-6554a5f40c30 (connectionName=SOLACE_CONNECTION, connectionId=SOLACE_CONNECTION, timeoutMillis=60000, activeCount=1) 
[2026-06-22 14:10:25,985]  INFO {SolaceBeginTransaction} - solace.beginTransaction: started txId=396c86b9-19c9-4cea-b618-6554a5f40c30 (timeout=60000ms) 
[2026-06-22 14:10:25,993]  INFO {SolacePollMessage} - solace.poll: txId=396c86b9-19c9-4cea-b618-6554a5f40c30 resolved to connectionId=SOLACE_CONNECTION 
[2026-06-22 14:10:31,020]  INFO {SolacePublishMessage} - solace.publishMessage: txId=396c86b9-19c9-4cea-b618-6554a5f40c30 resolved to connectionId=SOLACE_CONNECTION 
[2026-06-22 14:10:31,022]  INFO {SolacePublishMessage} - solace.publishMessage: txId=396c86b9-19c9-4cea-b618-6554a5f40c30 transacted send queued (correlationKey=tx-SOLACE_CONNECTION-eb30c43d-5bf1-48cc-a610-96f87213c7a9, ackStatus=TX_PENDING) 
[2026-06-22 14:10:31,048]  WARN {SolaceConnection} - Transaction rolled back on connection: SOLACE_CONNECTION 
[2026-06-22 14:10:31,056]  INFO {SolaceRollback} - solace.rollback: txId=396c86b9-19c9-4cea-b618-6554a5f40c30 rolled back successfully
```

After a rollback, the order is still on `Q.orders` (browse the queue to confirm).

## What's next

* Build the consumer side with the **[Solace Inbound Endpoint Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-example/)**, which covers `acknowledgeMessage`, `nackMessage`, and `sendReply`.
* See the **[Solace Connector Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-reference/)** for every operation parameter.
