# Publish binary and text bodies unchanged

At the end of this guide an API publishes the body of an HTTP request and the content of a file to a queue, and the message on the broker carries the same bytes or the same characters, with the content type of the body.

The connector writes the body the way the HTTP transport writes it. The platform's formatter for the body's content type writes the bytes and names the content type, and messageType chooses the Solace message class.

| messageType | The Solace message | Use it for |
| --- | --- | --- |
| BYTES | a BytesMessage with the bytes, unchanged | files, images, PDF documents, any binary body, and text that must keep its bytes |
| TEXT, the default | a TextMessage with the characters | JSON, XML and text that a consumer reads as text |
| XML | an XMLContentMessage with the characters | consumers that expect that message class |

A binary body with TEXT or XML is refused before the send. JSON has no message class of its own, send it as TEXT or BYTES.

## Steps

1. Create the connection SOLACE\_CONN as in [guide 8]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/), and the File connector connection FILE\_CONN as in [use case 12]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-file-transfer-request-reply/). On the broker create Q.orders.
2. Create the API. The first resource publishes the request body as BYTES, the second as TEXT, and the third reads a file with the File connector and publishes it as BYTES.

    ```xml
    <api name="PublishBody" context="/publish" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/binary" faultSequence="publishFaultSeq">
            <inSequence>
                <solace.publishMessage configKey="SOLACE_CONN">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.orders</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>BYTES</messageType>
                    <responseVariable>published</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <payloadFactory media-type="json"><format>{"ackStatus": "${vars.published.attributes.ackStatus}"}</format></payloadFactory>
                <respond/>
            </inSequence>
        </resource>
        <resource methods="POST" uri-template="/text" faultSequence="publishFaultSeq">
            <inSequence>
                <solace.publishMessage configKey="SOLACE_CONN">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.orders</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>TEXT</messageType>
                    <responseVariable>published</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <payloadFactory media-type="json"><format>{"ackStatus": "${vars.published.attributes.ackStatus}"}</format></payloadFactory>
                <respond/>
            </inSequence>
        </resource>
        <resource methods="POST" uri-template="/file" faultSequence="publishFaultSeq">
            <inSequence>
                <property name="path" expression="$url:path"/>
                <file.read configKey="FILE_CONN">
                    <path>{$ctx:path}</path>
                    <readMode>Complete File</readMode>
                    <contentType>application/binary</contentType>
                    <enableStreaming>false</enableStreaming>
                    <enableLock>false</enableLock>
                    <responseVariable>fileRead</responseVariable>
                    <overwriteBody>true</overwriteBody>
                </file.read>
                <solace.publishMessage configKey="SOLACE_CONN">
                    <destinationType>QUEUE</destinationType>
                    <destinationName>Q.orders</destinationName>
                    <deliveryMode>PERSISTENT</deliveryMode>
                    <messageType>BYTES</messageType>
                    <responseVariable>published</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </solace.publishMessage>
                <payloadFactory media-type="json"><format>{"ackStatus": "${vars.published.attributes.ackStatus}"}</format></payloadFactory>
                <respond/>
            </inSequence>
        </resource>
    </api>
    ```

    publishFaultSeq is the fault sequence of guide 8. It answers 502 with the error code and the message.

3. Deploy and call each resource.

    ```bash
    curl -X POST -H 'Content-Type: application/octet-stream' --data-binary @sample.bin http://localhost:8290/publish/binary
    curl -X POST --data-binary @sample.bin -H 'Content-Type:' http://localhost:8290/publish/binary
    curl -X POST -H 'Content-Type: text/plain' --data-binary '[INFO] started' http://localhost:8290/publish/text
    curl -X POST -H 'Content-Type: text/plain; charset=ISO-8859-1' --data-binary @latin1.txt http://localhost:8290/publish/text
    curl -X POST -H 'Content-Type: application/xml' --data-binary '<order><id>42</id><note>ü</note></order>' http://localhost:8290/publish/text
    curl -X POST 'http://localhost:8290/publish/file?path=files/sample.bin'
    curl -X POST -H 'Content-Type: application/octet-stream' --data-binary @sample.bin http://localhost:8290/publish/text
    ```

    The second call sends no Content-Type header. latin1.txt holds the text café über straße in ISO-8859-1. The last call sends a binary body to the TEXT resource.

## Verify

Every call but the last answers ackStatus ACK. Read the messages on Q.orders with your consumer, or with a browse as in the [configuration reference]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#browse-summaries). These are the messages the test bench received for the same calls.

| The call | The message on the broker |
| --- | --- |
| a 264 byte file, application/octet-stream, BYTES | a BytesMessage, application/octet-stream, the same 264 bytes |
| the same file with no Content-Type, BYTES | a BytesMessage, application/octet-stream, the same 264 bytes |
| text/plain, TEXT | a TextMessage, `text/plain; charset=UTF-8`, the text `[INFO] started` |
| `text/plain; charset=ISO-8859-1`, TEXT | a TextMessage, `text/plain; charset=ISO-8859-1`, the text café über straße |
| application/xml, TEXT | a TextMessage, `application/xml; charset=UTF-8`, the text `<order><id>42</id><note>ü</note></order>` |
| the File connector read as application/binary, BYTES | a BytesMessage with the same 264 bytes as the file |
| a binary body, TEXT | no message. The fault sequence answers 502 with the code 700124 and the message below |

```
PAYLOAD_ERROR: publishMessage: the message body is binary (application/octet-stream) and messageType TEXT carries text, use messageType BYTES
```

The bench also published a file of 102400 bytes, an empty file and a file with all 256 byte values, with the same result: the bytes on the broker were the bytes of the file, checked by hash.

## Charsets

1. TEXT carries characters. The content type of the message names the charset of the request, so an ISO-8859-1 request goes out as `text/plain; charset=ISO-8859-1` with the same characters.
2. BYTES carries the bytes the formatter wrote. A request sent as `text/plain; charset=ISO-8859-1` and published with BYTES keeps its ISO-8859-1 bytes. The bench compared them with the file by hash.
3. A character that the charset of the message context cannot encode faults PAYLOAD\_ERROR 700124 and nothing is sent. On the bench a JSON body with é published with the charset US-ASCII faulted this way. With ISO-8859-1 the same body went out as `application/json; charset=ISO-8859-1`.
4. Binary bytes are never converted.

## The body after the publish

The body stays on the message context. A second publish, an HTTP call or a File connector write after the publish sends the same bytes. The bench published an XML body and a binary body twice, then sent each to an HTTP endpoint and to a file, and every copy had the same length as the original.

## Undo

Remove the API or the CAR, and purge Q.orders on the broker.
