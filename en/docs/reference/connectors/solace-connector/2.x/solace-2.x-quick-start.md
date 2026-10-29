# Quick start

In fifteen minutes you consume a queue, call an HTTP backend and acknowledge the message after the backend answered, then watch a failure end in the dead message queue. Everything on this page is the [use case 1]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-reliable-consume/) flow with the smallest possible setup.

## Before you start

1. WSO2 Integrator: MI 4.7.0 and the MI for VS Code extension.
2. A Solace PubSub+ broker you can reach, a Message VPN, a client username with a password, and the queue Q.orders with Q.orders.dmq as its dead message queue.
3. The Solace client in the server's lib folder: sol-jcsmp 10.30.1 and jzlib 1.1.3\_2. See the [environment page]({{base_path}}/reference/connectors/solace-connector/solace-connector-config/).
4. An HTTP backend that answers POST on port 8099, or the mock below.

The mock is a few lines of Python. It answers 200 to every POST and logs each request, which is all this page needs.

```python
from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"status": "ok"}')

HTTPServer(("localhost", 8099), Handler).serve_forever()
```

## Step 1, the project and the two dependencies

Create an integration project and add both artifacts to its pom, from the WSO2 Connector Store or from your Maven repository. The store entries are the <a target="_blank" href="https://store.wso2.com/connector/mi-connector-solace">Solace connector</a> and the <a target="_blank" href="https://store.wso2.com/connector/mi-inbound-solace">Solace inbound endpoint</a>.

```xml
<dependency>
    <groupId>org.wso2.integration.inbound</groupId>
    <artifactId>mi-inbound-solace</artifactId>
    <version>2.0.1</version>
    <type>zip</type>
</dependency>
<dependency>
    <groupId>org.wso2.integration.connector</groupId>
    <artifactId>mi-connector-solace</artifactId>
    <version>2.0.1</version>
    <type>zip</type>
</dependency>
<dependency>
    <groupId>org.wso2.integration.connector</groupId>
    <artifactId>mi-connector-http</artifactId>
    <version>1.0.0</version>
    <type>zip</type>
</dependency>
```

## Step 2, the backend connection

The inbound endpoint carries its own Solace connection parameters, and the connector operations that settle a message need no connection of their own. The only connection on this page is the HTTP connection to the backend, a local entry.

```xml
<localEntry key="OrderBackend" xmlns="http://ws.apache.org/ns/synapse">
    <http.init>
        <connectionType>http</connectionType>
        <name>OrderBackend</name>
        <baseUrl>http://localhost:8099</baseUrl>
        <timeoutDuration>10000</timeoutDuration>
        <timeoutAction>Fault</timeoutAction>
    </http.init>
</localEntry>
```

## Step 3, the sequence and the fault sequence

```xml
<sequence name="orderProcessSeq" xmlns="http://ws.apache.org/ns/synapse">
    <log level="custom">
        <property name="order" value="received"/>
        <property name="solaceMessageId" expression="get-property('solace.messageId')"/>
    </log>
    <http.post configKey="OrderBackend">
        <relativePath>/orders</relativePath>
        <headers>[]</headers>
        <requestBodyType>JSON</requestBodyType>
        <requestBodyJson>{${payload}}</requestBodyJson>
        <responseVariable>httpResp</responseVariable>
        <overwriteBody>false</overwriteBody>
    </http.post>
    <filter xpath="${vars.httpResp.attributes.statusCode == 200}">
        <then>
            <solace.acknowledgeMessage>
                <responseVariable>ackResp</responseVariable>
                <overwriteBody>false</overwriteBody>
            </solace.acknowledgeMessage>
        </then>
        <else>
            <solace.nackMessage>
                <outcomeType>FAILED</outcomeType>
                <responseVariable>nackResp</responseVariable>
                <overwriteBody>false</overwriteBody>
            </solace.nackMessage>
        </else>
    </filter>
</sequence>

<sequence name="orderFaultSeq" xmlns="http://ws.apache.org/ns/synapse">
    <log level="custom">
        <property name="order" value="failed"/>
        <property name="errorMessage" expression="get-property('ERROR_MESSAGE')"/>
        <property name="solaceMessageId" expression="get-property('solace.messageId')"/>
    </log>
    <solace.nackMessage>
        <outcomeType>FAILED</outcomeType>
        <responseVariable>nackResp</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.nackMessage>
</sequence>
```

The acknowledgement comes after the backend answered, which is the point of 2.x. An answer other than 200 nacks the message FAILED, and a call that fails before an answer ends in the fault sequence, which nacks it FAILED as well. A FAILED message is retried in place. These two sequences, the local entry and the inbound endpoint below are the shapes the test campaigns ran, with the names changed.

## Step 4, the inbound endpoint

```xml
<inboundEndpoint xmlns="http://ws.apache.org/ns/synapse" name="OrderListener"
                 sequence="orderProcessSeq" onError="orderFaultSeq"
                 class="org.wso2.carbon.inbound.solace.SolaceEventListener" suspend="false">
    <parameters>
        <parameter name="inbound.behavior">eventBased</parameter>
        <parameter name="sequential">true</parameter>
        <parameter name="coordination">true</parameter>
        <parameter name="solace.host">tcp://localhost:55555</parameter>
        <parameter name="solace.vpnName">default</parameter>
        <parameter name="solace.authenticationScheme">BASIC</parameter>
        <parameter name="solace.username">integration</parameter>
        <parameter name="solace.password">integration</parameter>
        <parameter name="solace.destinationType">QUEUE</parameter>
        <parameter name="solace.destinationName">Q.orders</parameter>
        <parameter name="solace.contentType">application/json</parameter>
        <parameter name="solace.autoAck">false</parameter>
        <parameter name="solace.maxRedeliveries">3</parameter>
    </parameters>
</inboundEndpoint>
```

solace.contentType application/json makes the endpoint read every message as JSON, so the sequence can pass `${payload}` to the backend. Without it the endpoint reads each message with the type the producer declared, and a message without a declared type as text or binary. When the connector reads a message itself, with poll, sendRequest or browse, the result has a payload and attributes, see [Results of poll, sendRequest and browse]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#results-of-poll-sendrequest-and-browse).

The password on this page is the plain password of a lab broker. Outside a lab keep it in Secure Vault and write `{wso2:vault-lookup('solace.password')}` as the value, as the other pages do.

## Step 5, deploy

Build the CAR and deploy it, or run the project from VS Code. The log shows three lines: the start of the generation with the settings it resolved, the flow becoming active on the queue, and the started line that names the queue and the outcomes the broker supports. These are the lines as the server wrote them when this page was run.

??? note "The three start lines, as logged"

    ```
    [2026-10-21 09:20:42,821]  INFO {org.wso2.carbon.inbound.solace.SolaceEventListener} - SolaceListener [OrderListener] starting generation 1 (node id node1 from hostname, settlementTimeout 180000 ms from default, concurrentConsumers 1, window 255/1, coordination true)
    [2026-10-21 09:20:43,360]  INFO {org.wso2.carbon.inbound.solace.SolaceFlowEventHandler} - SolaceListener [OrderListener] flow ACTIVE (now consuming on the endpoint, generation 1): Type: 'FLOW_ACTIVE', Info: 'Flow becomes active', ResponseCode: '0', Exception: 'null'
    [2026-10-21 09:20:43,361]  INFO {org.wso2.carbon.inbound.solace.SolaceEventListener} - SolaceListener [OrderListener] generation 1 started: queue Q.orders, outcomes FAILED,REJECTED
    ```

## Step 6, publish a message

Use the broker's REST messaging port, 9000 on a software broker, with the client username. The two Solace headers make the message persistent and eligible for the dead message queue, which step 8 needs.

```bash
curl -u integration:integration -H 'Content-Type: application/json' \
  -H 'Solace-Delivery-Mode: Persistent' -H 'Solace-DMQ-Eligible: true' \
  -X POST http://localhost:9000/QUEUE/Q.orders -d '{"orderId": 1, "seats": 2}'
```

The log shows the order received line and nothing else for the message: the acknowledgement is silent when it succeeds. Once per generation the first message also logs a WARN that the queue has delivery count disabled, so the solace.deliveryCount property is left out. The mock logs the POST. The queue is empty afterwards. As captured on this run:

??? note "The log of the message, as logged"

    ```
    [2026-10-21 09:24:10,162]  WARN {org.wso2.carbon.inbound.solace.SolaceInjectHandler} - Delivery count is not supported on this broker endpoint; the 'solace.deliveryCount' property will be omitted.
    [2026-10-21 09:24:10,184]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = received, solaceMessageId = 1
    127.0.0.1 - - [21/Oct/2026 09:24:10] "POST /orders HTTP/1.1" 200 -
    ```

## Step 7, read the health

```bash
TOKEN=$(curl -sk -u admin:admin https://localhost:9164/management/login \
  | sed -n 's/.*"AccessToken"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
curl -sk -H "Authorization: Bearer $TOKEN" \
  'https://localhost:9164/management/inbound-endpoints?inboundEndpointName=OrderListener'
```

The answer is the endpoint with its configuration, its parameters and a health block. This sample was captured on WSO2 Integrator: MI 4.6.0 at the latest U2 update level, right after the deploy, with the configuration string and the parameter list cut short here. Below the latest U2 update level the status is the task state.

??? note "The full answer of the management API"

    ```json
    {
      "sequence": "orderProcessSeq",
      "tracing": "disabled",
      "stats": "disabled",
      "configuration": "<inboundEndpoint xmlns=\"http://ws.apache.org/ns/synapse\" name=\"OrderListener\" ...",
      "name": "OrderListener",
      "health": {
        "retried": 0,
        "retainedUnsettled": 0,
        "freePermits": 1,
        "lastErrorAt": 0,
        "connectivity.session": "connected",
        "activity": "active",
        "rolledBackByBroker": 0,
        "settled.ack": 0,
        "pending": 0,
        "connectivity.flow-1": "connected",
        "applied.REJECTED": 0,
        "dropped": 0,
        "settleFailed": 0,
        "settled.rejected": 0,
        "settled.failed": 0,
        "unknown": 0,
        "closeRejected": 0,
        "lifecycle": "running",
        "leftByDrain": 0,
        "handlerFailed": 0,
        "connectivity": "connected",
        "rejectedSubmit": 0,
        "rolledBack": 0,
        "decided.INJECTION_REJECTED": 0,
        "abandoned": 0,
        "decided.DRAIN": 0,
        "generation": 1,
        "activity.flow-1": "active",
        "applied.FAILED": 0,
        "committed": 0,
        "degradedOutcomes": 0,
        "applied.NONE": 0,
        "inFlight": 0,
        "received": 0,
        "decided.OTHER": 0,
        "decided.AUTOACK": 0,
        "decided.FAILED": 0,
        "redelivered": 0,
        "applied.ACK": 0,
        "pendingMax": 0,
        "decided.TIMEOUT": 0,
        "decided.ACK": 0,
        "decided.REJECTED": 0,
        "status": "active"
      },
      "error": "orderFaultSeq",
      "parameters": [
        {"name": "inbound.behavior", "value": "eventBased"},
        ...
      ],
      "status": "active"
    }
    ```

Read it from the top. status active: the endpoint consumes, because the broker made this flow the active consumer of the exclusive queue. lifecycle running, connectivity connected and generation 1: the first connection is up and nothing failed. Then the counters. After the message of step 6 they read received 1, decided.ACK 1, settled.ack 1 and inFlight 0. The message reached the sequence, the sequence acknowledged it, and the client library took the acknowledgement. The other counters stay at 0 while all goes well. The [observability page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-observability/) walks through the readings you see when something goes wrong.

## Step 8, make it fail

Stop the backend and publish again. The call fails before an answer, so the fault sequence logs the failure and nacks FAILED. The message is retried in place three times with a growing delay, then rejected to the dead message queue. The HTTP transport also suspends the backend's endpoint for 30 seconds after the connection failure, so the three retries find it suspended and fail at once. These are the lines as the server wrote them for one message on this run, with maxRedeliveries 3.

??? note "The log of the failing message, as logged"

    ```
    [2026-10-21 09:25:29,927]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = received, solaceMessageId = 2
    [2026-10-21 09:25:29,950]  WARN {org.apache.synapse.transport.passthru.ConnectCallback} - Connection refused or failed for : localhost/127.0.0.1:8099
    [2026-10-21 09:25:29,981]  WARN {org.apache.synapse.endpoints.EndpointContext} - Suspending endpoint : OrderBackend_INTERNAL_ENDPOINT_REFERENCE with address {uri.var.base}{+uri.var.path}{+uri.var.query} - current suspend duration is : 30000ms - Next retry after : Wed Oct 21 09:25:59 IST 2026
    [2026-10-21 09:25:29,982]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = failed, errorMessage = Error connecting to the back end, solaceMessageId = 2
    [2026-10-21 09:25:29,989]  WARN {org.wso2.carbon.inbound.solace.DeliveryProcessor} - SolaceListener [OrderListener] message 2 attempt 1 failed; retry in 1000 ms
    [2026-10-21 09:25:30,993]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = received, solaceMessageId = 2
    [2026-10-21 09:25:30,998]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = failed, errorMessage = Currently, HTTP endpoint : [ Name : OrderBackend_INTERNAL_ENDPOINT_REFERENCE ] [ State : SUSPENDED ], solaceMessageId = 2
    [2026-10-21 09:25:31,001]  WARN {org.wso2.carbon.inbound.solace.DeliveryProcessor} - SolaceListener [OrderListener] message 2 attempt 2 failed; retry in 2000 ms
    [2026-10-21 09:25:33,003]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = received, solaceMessageId = 2
    [2026-10-21 09:25:33,008]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = failed, errorMessage = Currently, HTTP endpoint : [ Name : OrderBackend_INTERNAL_ENDPOINT_REFERENCE ] [ State : SUSPENDED ], solaceMessageId = 2
    [2026-10-21 09:25:33,010]  WARN {org.wso2.carbon.inbound.solace.DeliveryProcessor} - SolaceListener [OrderListener] message 2 attempt 3 failed; retry in 4000 ms
    [2026-10-21 09:25:37,012]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = received, solaceMessageId = 2
    [2026-10-21 09:25:37,017]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = failed, errorMessage = Currently, HTTP endpoint : [ Name : OrderBackend_INTERNAL_ENDPOINT_REFERENCE ] [ State : SUSPENDED ], solaceMessageId = 2
    [2026-10-21 09:25:37,019] ERROR {org.wso2.carbon.inbound.solace.DeliveryProcessor} - SolaceListener [OrderListener] message 2 exhausted 3 in-place retries; rejecting (DMQ when eligible)
    ```

The health block then reads received 2, retried 3, decided.ACK 1, decided.FAILED 4, applied.REJECTED 1 and settled.rejected 1. decided counts attempts and applied counts messages: the second message failed four times, the first attempt and three retries, and was rejected once. On the broker Q.orders is empty while Q.orders.dmq holds the message, depth 0 and depth 1 on this run. Start the backend and wait for the suspension to lift, 30 seconds from the failure. A message whose retries all fall inside the suspension fails the same way and ends in the dead message queue too, as the third message of this run did. The retries take 1, 2 and 4 seconds, so a message published in the last seconds before the lift can reach the backend on a retry and is acknowledged. Then publish once more: the transport marks the endpoint active again and the message is acknowledged after the answer.

??? note "The log of message 4, as logged"

    ```
    [2026-10-21 09:26:46,825]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - order = received, solaceMessageId = 4
    [2026-10-21 09:26:46,837]  INFO {org.apache.synapse.endpoints.EndpointContext} - Endpoint : OrderBackend_INTERNAL_ENDPOINT_REFERENCE with address {uri.var.base}{+uri.var.path}{+uri.var.query} currently SUSPENDED will now be marked active since it processed its last message
    ```

After the whole page the health block of this run read received 4, retried 6, decided.ACK 2, applied.ACK 2, settled.ack 2, decided.FAILED 8, applied.REJECTED 2, settled.rejected 2 and inFlight 0, with Q.orders empty and two messages in Q.orders.dmq.

## Undo

Undeploy the CAR, or set suspend to true on the inbound endpoint. The endpoint drains for up to 30 seconds, closes its generation and the flow is gone from the broker. On this run the generation closed in 8 ms. Delete the two queues on the broker when you are done.

??? note "The drain lines, as logged"

    ```
    [2026-10-21 09:27:27,359]  INFO {org.wso2.carbon.inbound.solace.SolaceEventListener} - SolaceListener [OrderListener] pausing: draining generation 1 for up to 30000 ms
    [2026-10-21 09:27:27,365]  INFO {org.wso2.carbon.inbound.solace.SolaceEventListener} - SolaceListener [OrderListener] paused; generation 1 is closing on the closer thread
    [2026-10-21 09:27:27,378]  INFO {org.wso2.carbon.inbound.solace.SolaceEventListener} - SolaceListener [OrderListener] generation 1 closed in 8 ms
    ```
