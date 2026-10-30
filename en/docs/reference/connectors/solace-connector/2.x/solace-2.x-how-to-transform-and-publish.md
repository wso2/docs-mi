# Transform a message and publish it

At the end of this guide a message read by the inbound endpoint, or by poll, is published to a second queue: as it is, or as a new body built in the sequence. You also see why changing the message type is not a conversion.

The rule is the same everywhere. publishMessage sends the body of the message context, written by the platform's formatter for the body's content type. So the body that the sequence holds at the publish is the body that goes out.

!!! info
    Applies to the connector and the inbound endpoint 2.0.1 and later.

## Steps

1. Create the connection SOLACE\_CONN as in [guide 8]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/). On the broker create Q.orders and Q.orders.out.
2. To relay a consumed message as it is, give the inbound endpoint a sequence that publishes the body it received with BYTES, and then acknowledges. BYTES sends the body as its formatter writes it, so it fits every body: a binary body keeps its bytes, and a text, JSON or XML body from the inbound endpoint goes out as UTF-8 bytes with its content type. TEXT is for consumers that need a TextMessage. With TEXT a binary body, a PNG, a ZIP file or a multipart form for example, faults PAYLOAD\_ERROR 700124 and nothing is sent.

    ```xml
    <sequence name="relaySeq" xmlns="http://ws.apache.org/ns/synapse">
        <solace.publishMessage configKey="SOLACE_CONN">
            <destinationType>QUEUE</destinationType>
            <destinationName>Q.orders.out</destinationName>
            <deliveryMode>PERSISTENT</deliveryMode>
            <messageType>BYTES</messageType>
            <responseVariable>relayed</responseVariable>
            <overwriteBody>false</overwriteBody>
        </solace.publishMessage>
        <solace.acknowledgeMessage>
            <responseVariable>acked</responseVariable>
            <overwriteBody>false</overwriteBody>
        </solace.acknowledgeMessage>
    </sequence>
    ```

    A consumer that needs a TextMessage for the text bodies gets them with TEXT. Choose by the body, not by a list of content types. A binary body is the platform's element binary in the namespace http://ws.apache.org/commons/ns/payload, as the log of guide 16 shows. The bench relay published the binary bodies with BYTES and the others with TEXT, and the rows of the Verify table say which one each message used.

    The inbound endpoint is the one of [guide 16]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-consume-json-xml-text-binary/) with relaySeq as its sequence.

3. To transform the message, build the new body with a payloadFactory before the publish. The media type of the payloadFactory sets the content type of the new body, so a JSON format gives application/json, an XML format application/xml and a text format text/plain.

    ```xml
    <payloadFactory media-type="json" template-type="default">
        <format>{"orderId": "${payload.orderId}", "status": "accepted"}</format>
    </payloadFactory>
    <solace.publishMessage configKey="SOLACE_CONN">
        <destinationType>QUEUE</destinationType>
        <destinationName>Q.orders.out</destinationName>
        <deliveryMode>PERSISTENT</deliveryMode>
        <messageType>TEXT</messageType>
        <responseVariable>published</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.publishMessage>
    ```

    A binary body built in the sequence is the platform's binary element with base64 text. Set its message type and content type, then publish it with BYTES.

    ```xml
    <payloadFactory media-type="xml">
        <format><ns:binary xmlns:ns="http://ws.apache.org/commons/ns/payload">AAECAwQFBgcICQoLDA0ODw==</ns:binary></format>
        <args/>
    </payloadFactory>
    <property name="messageType" value="application/octet-stream" scope="axis2"/>
    <property name="ContentType" value="application/octet-stream" scope="axis2"/>
    <solace.publishMessage configKey="SOLACE_CONN">
        <destinationType>QUEUE</destinationType>
        <destinationName>Q.orders.out</destinationName>
        <deliveryMode>PERSISTENT</deliveryMode>
        <messageType>BYTES</messageType>
        <responseVariable>published</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.publishMessage>
    ```

4. To publish a message read by poll, poll it with overwriteBody true. The message becomes the body. For a binary message a publish with BYTES then sends its bytes unchanged, with the type it was read with.

    ```xml
    <solace.poll configKey="SOLACE_CONN">
        <queueName>Q.orders</queueName>
        <pollTimeout>4000</pollTimeout>
        <ackMode>AUTO</ackMode>
        <responseVariable>polled</responseVariable>
        <overwriteBody>true</overwriteBody>
    </solace.poll>
    <solace.publishMessage configKey="SOLACE_CONN">
        <destinationType>QUEUE</destinationType>
        <destinationName>Q.orders.out</destinationName>
        <deliveryMode>PERSISTENT</deliveryMode>
        <messageType>BYTES</messageType>
        <responseVariable>published</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.publishMessage>
    ```

    A JSON, XML or text message is written again by its formatter. Publish it with BYTES for its UTF-8 bytes, or with TEXT for a consumer that needs a TextMessage. Check `${vars.polled.attributes.timedOut}` first when the queue can be empty, as the [poll guide]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-poll-with-leases/) does.

## Verify

Read the messages on Q.orders.out with your consumer, or with a browse. These are the messages the test bench received.

| What was published | The message on Q.orders.out |
| --- | --- |
| a binary message relayed by the inbound endpoint with BYTES | a BytesMessage, application/octet-stream, the same bytes |
| an ISO-8859-1 text message relayed by the inbound endpoint with TEXT | a TextMessage, `text/plain; charset=UTF-8`, the same characters café über straße |
| an XML message relayed with TEXT | a TextMessage, `application/xml; charset=UTF-8`, `<order><id>42</id><note>ü</note></order>` |
| a JSON message relayed with TEXT | a TextMessage, `application/json; charset=UTF-8`, the same JSON |
| a JSON payloadFactory body, TEXT | a TextMessage, `application/json; charset=UTF-8`, `{"a":1,"b":[1,2],"c":"pf"}` |
| an XML payloadFactory body, TEXT | a TextMessage, `application/xml; charset=UTF-8`, `<order><id>42</id><note>pf</note></order>` |
| a text payloadFactory body, TEXT | a TextMessage, `text/plain; charset=UTF-8`, `hello from pf` |
| a binary element with base64 text, BYTES | a BytesMessage, application/octet-stream, the decoded bytes, 256 on the bench |
| a 264 byte message declared application/pdf, polled onto the body, BYTES | a BytesMessage, application/pdf, the same 264 bytes |

The inbound endpoint gives the sequence text as UTF-8, so a relayed ISO-8859-1 text goes out as UTF-8 with the same characters. The bench published the polled message twice, once in a transaction, and both copies had the same bytes and the type application/pdf.

## Changing the message type is not a conversion

Setting the messageType property, or ContentType, to another type does not convert the body. It only chooses the formatter that writes it. The formatter writes what the body holds in its own form.

On the bench an API received a JSON body, set messageType and ContentType to text/plain, and published with TEXT. The message on the broker was a TextMessage, `text/plain; charset=UTF-8`, with an empty text. The same context sent back over HTTP gave an answer of 0 bytes, so the connector sent what the HTTP transport would send. The text formatter writes the text of a text body, and a JSON body has none.

A sequence that wants the JSON document as literal text builds a text body with a payloadFactory of media type text, whose format holds the text it wants.

```xml
<payloadFactory media-type="text">
    <format>hello from pf</format>
    <args/>
</payloadFactory>
```

The same holds for binary. A binary body published with messageType set to application/binary went out on the bench as a BytesMessage with application/octet-stream and the same bytes. The binary formatter names the type.

## Undo

Remove the CAR or the sequences, and purge Q.orders.out on the broker.
