# File transfer with request reply

An HTTP client asks one integration for a file. That integration sends a request through a Solace queue to a second integration, which reads the file and sends it back as the reply. The first integration writes the file to its own disk and returns it to the client. The file bytes travel unchanged, and the file name travels as a user property.

## The shape

The requester is an API. It calls sendRequest with a short JSON body and the user property filePath, the path of the wanted file. With overwriteBody true the reply becomes the body, as native binary. The File connector writes that body to a file named by the reply's user property fileName, read as `${vars.reply.attributes.userProp_fileName}`. Then respond returns the same bytes to the client.

The responder is an inbound endpoint on Q.files with autoAck false. Its sequence reads the path from the property solace.userProp.filePath, reads the file with the File connector as application/binary onto the body, replies with sendReply and messageType BYTES and the user property fileName, then acknowledges the request.

The request reply mechanics, the temporary reply queue and its cleanup are the ones of [request reply and dual channel]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-request-reply/).

## The artifacts

The two connections, local entries. SOLACE\_CONN is the connection of [guide 8]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-publish-with-confirmation/). FILE\_CONN is a local File connector connection whose working directory holds the folders files, for the responder, and out, for the requester. In this example both integrations share one server, so they share FILE\_CONN.

```xml
<localEntry key="FILE_CONN" xmlns="http://ws.apache.org/ns/synapse">
    <file.init>
        <connectionType>LOCAL</connectionType>
        <name>FILE_CONN</name>
        <workingDir>/data/</workingDir>
        <fileLockScheme>Local</fileLockScheme>
    </file.init>
</localEntry>
```

The responder, the sequence of the inbound endpoint. The request carries the path as the user property filePath, for example files/sample.bin. The sequence takes the file name from the path and returns it as the user property fileName.

```xml
<sequence name="fileResponderSeq" xmlns="http://ws.apache.org/ns/synapse">
    <property name="filePath" expression="get-property('solace.userProp.filePath')"/>
    <property name="fileName" expression="substring-after(get-property('filePath'), 'files/')"/>
    <property name="replyProps" expression="concat('[{&quot;fileName&quot;:&quot;', get-property('fileName'), '&quot;}]')"/>
    <log level="custom">
        <property name="fileTransfer" value="responder"/>
        <property name="path" expression="get-property('filePath')"/>
        <property name="ct" expression="get-property('axis2', 'ContentType')"/>
    </log>
    <file.read configKey="FILE_CONN">
        <path>{$ctx:filePath}</path>
        <readMode>Complete File</readMode>
        <contentType>application/binary</contentType>
        <enableStreaming>false</enableStreaming>
        <enableLock>false</enableLock>
        <responseVariable>fileRead</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.read>
    <solace.sendReply configKey="SOLACE_CONN">
        <target>INBOUND</target>
        <deliveryMode>PERSISTENT</deliveryMode>
        <messageType>BYTES</messageType>
        <userProperties>{$ctx:replyProps}</userProperties>
        <responseVariable>replied</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.sendReply>
    <log level="custom">
        <property name="fileTransfer" value="replied"/>
        <property name="name" expression="get-property('fileName')"/>
    </log>
    <solace.acknowledgeMessage>
        <responseVariable>acked</responseVariable>
        <overwriteBody>false</overwriteBody>
    </solace.acknowledgeMessage>
</sequence>
```

The inbound endpoint of the responder.

```xml
<inboundEndpoint xmlns="http://ws.apache.org/ns/synapse" name="FileResponder"
                 sequence="fileResponderSeq" onError="fileResponderFaultSeq"
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
        <parameter name="solace.destinationName">Q.files</parameter>
        <parameter name="solace.autoAck">false</parameter>
        <parameter name="solace.failureOutcome">FAILED</parameter>
    </parameters>
</inboundEndpoint>
```

fileResponderFaultSeq decides what happens to a request the responder could not answer, for example a nack as in [guide 3]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-nack-to-dmq/). The requester gets no reply then, and its sendRequest times out after requestTimeout with REQUEST\_REPLY\_ERROR 700104.

The requester, an API. The client names the file in the query and sends a short JSON body. The API puts the path in the user property filePath and sends the body as the request. The three X-Reply headers only show the reply's attributes to the client. Leave them out in production.

```xml
<api name="FileFetch" context="/files" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/fetch">
        <inSequence>
            <property name="file" expression="$url:file"/>
            <property name="reqProps" expression="concat('[{&quot;filePath&quot;:&quot;files/', get-property('file'), '&quot;}]')"/>
            <solace.sendRequest configKey="SOLACE_CONN">
                <destinationType>QUEUE</destinationType>
                <destinationName>Q.files</destinationName>
                <deliveryMode>PERSISTENT</deliveryMode>
                <messageType>TEXT</messageType>
                <requestTimeout>15000</requestTimeout>
                <userProperties>{$ctx:reqProps}</userProperties>
                <responseVariable>reply</responseVariable>
                <overwriteBody>true</overwriteBody>
            </solace.sendRequest>
            <property name="outName" expression="${vars.reply.attributes.userProp_fileName}"/>
            <file.write configKey="FILE_CONN">
                <filePath>{fn:concat('out/', $ctx:outName)}</filePath>
                <mimeType>Automatic</mimeType>
                <writeMode>Overwrite</writeMode>
                <responseVariable>written</responseVariable>
                <overwriteBody>false</overwriteBody>
            </file.write>
            <property name="X-Reply-Encoding" expression="${vars.reply.attributes.payloadEncoding}" scope="transport"/>
            <property name="X-Reply-ContentType" expression="${vars.reply.attributes.contentType}" scope="transport"/>
            <property name="X-Reply-FileName" expression="get-property('outName')" scope="transport"/>
            <respond/>
        </inSequence>
        <faultSequence>
            <payloadFactory media-type="json">
                <format>{"error":"$1","code":"$2"}</format>
                <args>
                    <arg expression="get-property('ERROR_MESSAGE')"/>
                    <arg expression="get-property('ERROR_CODE')"/>
                </args>
            </payloadFactory>
            <property name="HTTP_SC" value="500" scope="axis2"/>
            <property name="messageType" value="application/json" scope="axis2"/>
            <respond/>
        </faultSequence>
    </resource>
</api>
```

Keep writeMode. The File connector 4.0.37 of the test bench has no default for it at run time, and without it the write faults 700107 with `Mandatory parameter 'writeMode' is not provided`.

Call the requester.

```bash
curl -X POST -H 'Content-Type: application/json' -d '{"file":"sample.bin"}' \
  -o sample.bin -D - 'http://localhost:8290/files/fetch?file=sample.bin'
```

## What the requester gets

reply is the responseVariable of sendRequest. With overwriteBody true the bytes are on the body and the variable keeps the attributes. Its payload is null. These are the headers of the answer for a file of 264 bytes on the test bench, with the file name changed.

```
HTTP/1.1 200 OK
Content-Type: application/octet-stream
X-Reply-FileName: sample.bin
X-Reply-ContentType: application/octet-stream
X-Reply-Encoding: base64
```

The body of the answer is the 264 bytes of the file. out/sample.bin has the same bytes as files/sample.bin. payloadEncoding base64 and contentType application/octet-stream are the attributes of a binary reply. Without overwriteBody the same reply would put the bytes into the variable as base64 text. A text reply has no payloadEncoding, and a reply declared application/json arrives as parsed JSON. Every attribute is listed in [Results of poll, sendRequest and browse]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-configuration-reference/#results-of-poll-sendrequest-and-browse).

## The request must carry a body

The request must carry a body, even a short one. A message with only headers and an empty payload never reaches the responder's sequence. The inbound endpoint logs `Received empty Solace message, no mediation context built` and settles the message without mediation. The requester's sendRequest then times out with REQUEST\_REPLY\_ERROR 700104. Put the path in a user property and send at least a short text body, as the API above does with its JSON body.

??? note "An empty request on the test bench, as logged and as answered"

    The inbound endpoint's line for an empty request.

    ```
    [2026-10-28 21:26:05,128]  WARN {org.wso2.carbon.inbound.solace.SolaceInjectHandler} - Received empty Solace message, no mediation context built
    ```

    The requester's answer in this flow, after the requestTimeout of that call, 8000 ms.

    ```
    {"error":"REQUEST_REPLY_ERROR: sendRequest timed out after 8000ms. No response received from 'Q.files'.","code":"700104"}
    ```

## The content type of the reply

The reply carries the content type of the formatter that wrote it. For a binary body that is application/octet-stream, whatever the File connector's contentType said. Here the File connector read the file as application/binary, and the reply arrives as application/octet-stream. A consumer that needs the original media type needs the producer to declare it on the Solace message, for example as a user property next to fileName.

## The log lines

The responder logs its two lines for each request. The request was the JSON body of the API, so the responder's sequence sees application/json. With the logger org.wso2.integration.connector at DEBUG, the connector also names the formatter that wrote the reply and the builder that put it on the requester's body. These are the lines of one request on the test bench, with the names changed.

??? note "One file request, as logged"

    ```
    [2026-10-28 09:20:39,616]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - fileTransfer = responder, path = files/sample.bin, ct = application/json; charset=UTF-8
    [2026-10-28 09:20:39,750] DEBUG {org.wso2.integration.connector.utils.PayloadCodec} - sendReply: the message body is written by org.apache.axis2.format.BinaryFormatter for the message type application/binary, formatter type application/binary
    [2026-10-28 09:20:39,772]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - fileTransfer = replied, name = sample.bin
    [2026-10-28 09:20:39,791] DEBUG {org.wso2.integration.connector.utils.BodyInstaller} - sendRequest: the body of content type application/octet-stream is built by org.wso2.carbon.relay.BinaryRelayBuilder with message type application/octet-stream
    ```

## The parameters that matter

| Where | Parameter | Use |
| --- | --- | --- |
| sendRequest | userProperties | the path of the file, `[{"filePath":"files/sample.bin"}]` |
| sendRequest | overwriteBody | true, so the reply bytes become the body for the File connector and for respond |
| sendRequest | requestTimeout | the wait for the reply, 30000 by default. Size it above the responder's file read |
| sendReply | messageType | BYTES. TEXT or XML with a binary body faults PAYLOAD\_ERROR 700124 and nothing is sent |
| sendReply | userProperties | the file name, read by the requester as `${vars.reply.attributes.userProp_fileName}` |
| file.read | contentType, overwriteBody | application/binary and true, so the file becomes a binary body |
| file.write | mimeType, writeMode | Automatic and Overwrite |
| inbound endpoint | solace.autoAck | false, the request is acknowledged after the reply was sent |

## The result on the test bench

A file of 264 bytes and a file of 102400 bytes went through this flow. Each written file and each HTTP answer had the same bytes as the responder's file, checked by hash. The variable showed payloadEncoding base64 and contentType application/octet-stream, and the answer was application/octet-stream. A request with an empty body timed out with 700104 and the responder logged the empty message line. A request with a body of one byte got the file.
