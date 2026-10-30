# Consume JSON, XML, text and binary messages

At the end of this guide an inbound endpoint consumes a JSON, an XML, a text and a binary message, and the log shows what the sequence sees for each one: the content type, the message type, the first body element and the payload.

The rule behind it is short. The endpoint builds the body with the platform's builder for the content type. The content type is solace.contentType, else the type the message declares, else the default of the message class. The body is never inspected to choose, so a text message that looks like JSON stays text.

!!! info
    Applies to the connector and the inbound endpoint 2.0.1 and later.

## Steps

1. On the broker create the queue Q.orders, as in the [quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/).
2. Create the sequence. It logs what it sees, logs the payload for every body that is not binary, and acknowledges the message.

    ```xml
    <sequence name="viewSeq" xmlns="http://ws.apache.org/ns/synapse">
        <property name="attempt" expression="get-property('solace.deliveryAttempt')"/>
        <property name="name" expression="concat(get-property('solace.messageId'), '_', get-property('attempt'))"/>
        <log level="custom">
            <property name="view" value="message"/>
            <property name="name" expression="get-property('name')"/>
            <property name="attempt" expression="get-property('attempt')"/>
            <property name="ct" expression="get-property('axis2', 'ContentType')"/>
            <property name="mt" expression="get-property('axis2', 'messageType')"/>
            <property name="el" expression="local-name($body/*[1])"/>
            <property name="ns" expression="namespace-uri($body/*[1])"/>
        </log>
        <filter source="get-property('axis2', 'messageType')" regex="application/octet-stream|application/binary">
            <then/>
            <else>
                <log level="custom">
                    <property name="view" value="payload"/>
                    <property name="name" expression="get-property('name')"/>
                    <property name="p" expression="${payload}"/>
                </log>
            </else>
        </filter>
        <solace.acknowledgeMessage>
            <responseVariable>acked</responseVariable>
            <overwriteBody>false</overwriteBody>
        </solace.acknowledgeMessage>
    </sequence>
    ```

3. Create the inbound endpoint with autoAck false and viewSeq as its sequence. Do not set solace.contentType, so each message is read with its own type.

    ```xml
    <inboundEndpoint xmlns="http://ws.apache.org/ns/synapse" name="OrderViewer"
                     sequence="viewSeq" onError="orderFaultSeq"
                     class="org.wso2.carbon.inbound.solace.SolaceEventListener" suspend="false">
        <parameters>
            <parameter name="inbound.behavior">eventBased</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="solace.host">tcp://broker:55555</parameter>
            <parameter name="solace.vpnName">default</parameter>
            <parameter name="solace.authenticationScheme">BASIC</parameter>
            <parameter name="solace.username">integration</parameter>
            <parameter name="solace.password">{wso2:vault-lookup('solace.password')}</parameter>
            <parameter name="solace.destinationType">QUEUE</parameter>
            <parameter name="solace.destinationName">Q.orders</parameter>
            <parameter name="solace.autoAck">false</parameter>
        </parameters>
    </inboundEndpoint>
    ```

    orderFaultSeq is the fault sequence of the quick start. It nacks the message FAILED.

4. To see which builder built each message, set the logger of the endpoint to DEBUG in conf/log4j2.properties and add SolaceInbound to the loggers list of that file.

    ```
    logger.SolaceInbound.name = org.wso2.carbon.inbound.solace
    logger.SolaceInbound.level = DEBUG
    ```

5. Deploy the CAR. Publish four messages through the broker's REST messaging port, each with its content type. The binary one is any file, here 264 random bytes in sample.bin.

    ```bash
    head -c 264 /dev/urandom > sample.bin
    curl -u integration:integration -H 'Solace-Delivery-Mode: Persistent' -H 'Content-Type: application/json' \
      -X POST http://localhost:9000/QUEUE/Q.orders \
      -d '{"fileName":"x.txt","size":264,"ok":true,"tags":["a","b"],"nested":{"k":"v"}}'
    curl -u integration:integration -H 'Solace-Delivery-Mode: Persistent' -H 'Content-Type: application/xml' \
      -X POST http://localhost:9000/QUEUE/Q.orders -d '<order><id>42</id><note>ü</note></order>'
    curl -u integration:integration -H 'Solace-Delivery-Mode: Persistent' -H 'Content-Type: text/plain' \
      -X POST http://localhost:9000/QUEUE/Q.orders \
      -d '{"fileName":"x.txt","size":264,"ok":true,"tags":["a","b"],"nested":{"k":"v"}}'
    curl -u integration:integration -H 'Solace-Delivery-Mode: Persistent' -H 'Content-Type: application/octet-stream' \
      -X POST http://localhost:9000/QUEUE/Q.orders --data-binary @sample.bin
    ```

    The third message carries JSON text but declares text/plain. It shows that the endpoint does not guess.

## Verify

The log shows one view line per message and a payload line for every message that is not binary.

| The message | ct | mt | el | p, the payload |
| --- | --- | --- | --- | --- |
| JSON, application/json | `application/json; charset=UTF-8` | application/json | jsonObject | the JSON document |
| XML, application/xml | `application/xml; charset=UTF-8` | application/xml | order | the order element inside the SOAP body |
| JSON text, text/plain | `text/plain; charset=UTF-8` | text/plain | text | `{"text":"..."}`, the text in the text wrapper |
| binary, application/octet-stream | application/octet-stream | application/octet-stream | binary | not logged |

Text always reaches the sequence as UTF-8. A message declared `text/plain; charset=ISO-8859-1` gives the sequence `text/plain; charset=UTF-8` with the same characters.

These are the lines of the test bench for the same four kinds of message, with the names changed. There the text message was a TextMessage without a declared type, which the endpoint reads as text/plain, its class default.

??? note "The JSON message, as logged"

    ```
    [2026-10-28 16:31:30,517] DEBUG {org.wso2.carbon.inbound.solace.SolaceUtils} - Solace message of content type application/json is built by org.wso2.micro.integrator.core.json.JsonStreamBuilder with message type application/json
    [2026-10-28 16:31:30,518]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = message, name = 1_1, attempt = 1, ct = application/json; charset=UTF-8, mt = application/json, el = jsonObject, ns =
    [2026-10-28 16:31:30,518]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = payload, name = 1_1, p = {"fileName":"x.txt","size":264,"ok":true,"tags":["a","b"],"nested":{"k":"v"}}
    ```

??? note "The XML message, as logged"

    ```
    [2026-10-28 16:31:33,864] DEBUG {org.wso2.carbon.inbound.solace.SolaceUtils} - Solace message of content type application/xml is built by org.apache.axis2.builder.ApplicationXMLBuilder with message type application/xml
    [2026-10-28 16:31:33,866]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = message, name = 2_1, attempt = 1, ct = application/xml; charset=UTF-8, mt = application/xml, el = order, ns =
    [2026-10-28 16:31:33,868]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = payload, name = 2_1, p = <soapenv:Body xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><order><id>42</id><note>ü</note></order></soapenv:Body>
    ```

??? note "The JSON text without a declared type, as logged"

    ```
    [2026-10-28 16:30:15,283] DEBUG {org.wso2.carbon.inbound.solace.SolaceUtils} - Solace message of content type text/plain is built by org.apache.axis2.format.PlainTextBuilder with message type text/plain
    [2026-10-28 16:30:15,284]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = message, name = 1_1, attempt = 1, ct = text/plain; charset=UTF-8, mt = text/plain, el = text, ns = http://ws.apache.org/commons/ns/payload
    [2026-10-28 16:30:15,286]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = payload, name = 1_1, p = {"text":"{\"fileName\":\"x.txt\",\"size\":264,\"ok\":true,\"tags\":[\"a\",\"b\"],\"nested\":{\"k\":\"v\"}}"}
    ```

??? note "The binary message, as logged"

    ```
    [2026-10-28 16:30:28,747] DEBUG {org.wso2.carbon.inbound.solace.SolaceUtils} - Solace message of content type application/octet-stream is built by org.wso2.carbon.relay.BinaryRelayBuilder with message type application/octet-stream
    [2026-10-28 16:30:28,748]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - view = message, name = 5_1, attempt = 1, ct = application/octet-stream, mt = application/octet-stream, el = binary, ns = http://ws.apache.org/commons/ns/payload
    ```

## Read the body and the user properties

1. A JSON body is the platform's JSON payload. Read it with `${payload}`, a field with `${payload.fileName}`.
2. An XML body is the document itself. Read it with XPath, for example `$body/order/id`.
3. A text body is the platform's text wrapper. `${payload}` gives `{"text":"..."}`.
4. A binary body is the platform's binary element. An HTTP call or a File connector write sends its bytes unchanged, and the XPath `$body/*[1]` gives the bytes as base64 text.
5. Each user property is a message context property named solace.userProp.&lt;key&gt;, for example `get-property('solace.userProp.fileName')`. The value is text. A bytes value is base64 text. The responder of [use case 12]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-file-transfer-request-reply/) reads its file path this way.

## When the producer does not declare the type

A producer that sends JSON as a TextMessage or a BytesMessage without a content type gives the sequence a text or a binary body. Set solace.contentType on the endpoint to read such messages as JSON or XML.

```xml
<parameter name="solace.contentType">application/json</parameter>
```

On the test bench the same undeclared JSON TextMessage then gave ct `application/json; charset=UTF-8`, mt application/json and el jsonObject. The parameter applies to every message of the endpoint, so use it for a queue that carries one type.

## When a body does not build

The platform builds JSON and XML lazily, so where a broken document fails depends on where it breaks.

1. JSON that the builder rejects at its start, and an XML document whose root is malformed, fail at the build. Such a message never reaches the sequence. The endpoint logs that it could not convert the message and settles it without mediation. With autoAck false it is rejected, so it goes to the dead message queue when it is eligible.
2. A JSON or XML document damaged after its start reaches the sequence. It fails where mediation first reads the body. The settlement then follows the usual rules: with autoAck false the fault sequence decides, and a sequence that acknowledges without reading the body acknowledges a document it did not validate. A sequence that needs a valid payload parses and validates it explicitly.

An empty message is settled like the first case, with the line `Received empty Solace message, no mediation context built`. The [migration page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-migration-from-1.x/#malformed-json-and-xml) explains the same rules.

??? note "A message declared application/json whose text is not JSON from its start, as logged"

    ```
    [2026-10-28 16:30:32,149] DEBUG {org.wso2.carbon.inbound.solace.SolaceUtils} - Solace message of content type application/json is built by org.wso2.micro.integrator.core.json.JsonStreamBuilder with message type application/json
    [2026-10-28 16:30:32,151] ERROR {org.wso2.micro.integrator.core.json.JsonStreamBuilder} - Error occurred while processing document for application/json java.lang.reflect.InvocationTargetException
    [2026-10-28 16:30:32,151] ERROR {org.wso2.carbon.inbound.solace.DeliveryProcessor} - SolaceListener [OrderViewer] message 6 could not be converted into a message context; rejecting org.apache.axis2.AxisFault
    ```

The text of that message was `not json`. The management API counts such a message under decided.INJECTION\_REJECTED and applied.REJECTED. The full rules are in [The body the inbound endpoint builds]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#the-body-the-inbound-endpoint-builds).

## Undo

Remove the CAR and set the logger back to its level. Purge Q.orders on the broker when you are done.
