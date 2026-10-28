# Configuration reference

Every parameter of the inbound endpoint and of the connector, with its default as shipped. The parameter names are the ones in the artifact XML. The VS Code forms show the same names with spaces.

## Inbound endpoint

Connection.

| Parameter | Required | Default | Meaning |
| --- | --- | --- | --- |
| solace.host | yes | tcp://localhost:55555 | the broker, tcps for TLS. A comma separated host list is allowed |
| solace.vpnName | yes | default | the Message VPN |
| solace.clientName | no | empty | the client name prefix. The endpoint appends the node id and the endpoint name unless solace.clientNameStrict is true. Empty gives node and endpoint name |
| solace.clientNameStrict | no | false | true sends solace.clientName as given, as 1.x did. A name longer than 160 bytes is cut and ends with a short hash |
| solace.compressionLevel | no | 0 | 0 to 9, 0 is off |

Authentication.

| Parameter | Required | Default | Meaning |
| --- | --- | --- | --- |
| solace.authenticationScheme | yes | BASIC | BASIC, CLIENT\_CERTIFICATE or OAUTH2 |
| solace.username, solace.password | BASIC |  | the password supports Secure Vault expressions |
| solace.oauth2AccessToken | OAUTH2 |  | a static token. Provide this, solace.oidcIdToken or solace.oauth2TokenFile |
| solace.oauth2TokenFile | OAUTH2 |  | the file the token is read from at every connect and reconnect. A missing or unreadable file keeps the last token with a WARN |
| solace.oidcIdToken, solace.oauth2IssuerIdentifier | no |  | the OIDC id token and the issuer |
| solace.apiProvidedUsername | no |  | only when the VPN allows an API provided username |

Destination.

| Parameter | Required | Default | Meaning |
| --- | --- | --- | --- |
| solace.destinationType | yes | QUEUE | QUEUE or TOPIC |
| solace.destinationName | yes |  | the queue, or the topic strings, comma separated for Direct |
| solace.subscriptionType | TOPIC | DIRECT | DIRECT or DURABLE |
| solace.dteName | TOPIC and DURABLE |  | the durable topic endpoint |
| solace.sharedSubscriptionGroup | no |  | with a Direct topic and coordination false, subscribes the group form so each message reaches one node |

Consumer.

| Parameter | Default | Meaning |
| --- | --- | --- |
| solace.contentType | empty | the content type the body is read with. It wins over the type the message declares. Empty uses the declared type, else the default of the message class. The body is never inspected. A value without a charset takes the charset the message declares, else UTF-8 |
| solace.binaryPayloadAsBase64 | false | the legacy form. true puts every BytesMessage body into the message as base64 text with application/octet-stream, and the sequence decodes it. false builds a binary body, and a BytesMessage of a text type is decoded with its charset |
| solace.selector |  | a SQL 92 selector on headers and user properties, queues and durable topic endpoints |

How the endpoint turns a message into a body is in [The body the inbound endpoint builds](#the-body-the-inbound-endpoint-builds).

Guaranteed messaging.

| Parameter | Default | Meaning |
| --- | --- | --- |
| solace.autoAck | true | acknowledged when the injection returns, at most once. Set false to settle from the sequence |
| solace.failureOutcome | FAILED | the outcome when no settlement arrives within solace.settlementTimeout: FAILED retries in place, REJECTED routes an eligible message to the dead message queue, NONE leaves the message unsettled and counts it |
| solace.subAckWindowSize | 255 | the transport window, 1 to 255, the high mark of the flow control |
| solace.settlementTimeout | 180000 | the time the sequence has to settle, in ms. When absent, the deployment.toml key applies, then the default |
| solace.concurrentConsumers | 1 | the workers, and the bound on delivery attempts in progress |
| solace.maxRedeliveries | -1 | in place retries: -1 unlimited, N then REJECTED, 0 settles FAILED at once for the broker's redelivery. Ignored in transacted mode |
| solace.redelivery.initialDelay, solace.redelivery.progression, solace.redelivery.maxDelay | 1000, 2.0, 60000 | the delay between retries, in ms, growing by the progression up to the maximum |
| solace.requireSettlementOutcomes | AUTO | AUTO requests the outcomes the broker reports and retains a message that needs a missing one. TRUE fails the bind as 1.x did |
| solace.transacted | false | one local transaction per message, committed on ACK. Refused with autoAck true and on topics |
| solace.drainTimeout | 30000 | the upper limit of a pause, a resume and an undeploy, at least 3000. The last 2000 ms settle the messages in flight |
| solace.drainOutcome | NONE | messages still in flight when the drain reaches its settle budget: NONE leaves them to the broker, REJECTED routes the eligible ones to the dead message queue |
| solace.queuePermission | empty | the permission set on a queue the endpoint provisions |

Connection retry and recovery.

| Parameter | Default | Meaning |
| --- | --- | --- |
| solace.connectionTimeout | 30000 | the initial connect timeout, in ms |
| solace.connectRetries, solace.connectRetriesPerHost | 3, 3 | initial connect retries |
| solace.reconnectRetries | -1 | the client's reconnect attempts after a loss, -1 without limit |
| solace.reconnectRetryWait | 3000 | the wait between the client's reconnect attempts |
| solace.recovery.initialDelay, solace.recovery.progression, solace.recovery.maxDelay | 1000, 2.0, 60000 | the back off of the endpoint's own recovery loop |
| solace.recovery.maxAttempts | -1 | attempts before the endpoint stops in failed, -1 without limit |
| solace.keepAliveInterval, solace.keepAliveLimit | client default | the keep alive interval in ms, at least 50, and the limit, at least 1 |

Destination provisioning, when solace.provisionDestination is true.

| Parameter | Default | Meaning |
| --- | --- | --- |
| solace.provisionDestination | false | create the queue or the durable topic endpoint when it does not exist |
| solace.queueAccessType | EXCLUSIVE | EXCLUSIVE or NON\_EXCLUSIVE |
| solace.queueQuotaMB, solace.queueMaxMsgSize | 0 | the broker default |
| solace.queueRespectTTL | false | discard expired messages |
| solace.queueMaxMsgRedelivery | 0 | the maximum redelivery count before the dead message queue, 0 is the broker default |

TLS.

| Parameter | Default | Meaning |
| --- | --- | --- |
| solace.sslTrustStorePath, solace.sslTrustStorePassword, solace.sslTrustStoreFormat | JVM default, , JKS | the trust store |
| solace.sslKeyStorePath, solace.sslKeyStorePassword, solace.sslKeyStoreFormat, solace.sslKeyPassword |  | the client certificate store, required for CLIENT\_CERTIFICATE |
| solace.sslValidateCertificate, solace.sslValidateCertificateDate, solace.sslValidateHostname | true | disable only in a lab |

Common inbound parameters: sequential, true, forced to true when autoAck is false. coordination, true, one node consumes at a time in a cluster. solace.generateReceiveTimestamps, false, exposes the broker receive time as solace.receiveTimestamp.

The deployment.toml key.

```toml
[messaging_callback]
solace_inbound_settlement_timeout_ms = 180000
```

It applies to every Solace inbound endpoint without its own solace.settlementTimeout.

## Connector connection

The 1.x parameters keep their meaning: name, host, vpnName, username, password, apiProvidedUsername, clientName, connectionTimeout, readTimeout, compressionLevel, the generate flags, connectRetries, connectRetriesPerHost, reconnectRetries, reconnectRetryWait, the ssl parameters, authenticationScheme, oauth2AccessToken, oauth2IssuerIdentifier, oidcIdToken, pubAckWindowSize. One of them changes how it is applied: connectRetries and connectRetriesPerHost now count the physical connect attempts a session makes across its recovery, and each attempt connects once inside the client library, so a broker outage never piles up connect attempts behind callers that timed out. The parameters below are new in 2.x.

| Parameter | Default | Meaning |
| --- | --- | --- |
| clientNameStrict | false | true sends clientName as given to the first pooled session and the other sessions append their role. false names every session prefix, node id, connection name and number, with rr and poll for the dedicated sessions |
| oauth2TokenFile |  | the token file read at every connect and reconnect, with authenticationScheme OAUTH2 |
| pollAckTimeout | 180000 | the lease of a message polled with ackMode CLIENT, in ms |
| pollFlowIdleTimeout | 60000 | an idle poll flow with no lease is closed after it |
| maxPollFlows | 16 | the cached poll flows, one per queue and selector. Beyond it the least recently used idle flow is evicted, and with none idle the poll faults POLL\_FLOW\_LIMIT |
| requireSettlementOutcomes | AUTO | AUTO retains a polled message that needs a missing outcome and recycles its flow. TRUE fails the bind |
| maxConcurrentRequests | 100 | sendRequest calls in flight on the request reply session. Beyond it a call waits up to its requestTimeout and faults REQUEST\_CONCURRENCY\_EXCEEDED |
| recovery.initialDelay, recovery.progression, recovery.maxDelay, recovery.maxAttempts | 1000, 2.0, 60000, -1 | the rebuild of a failed session, within the operation's deadline |
| keepAliveInterval, keepAliveLimit | client default | the keep alive of the sessions |
| maxActiveConnections, maxIdleConnections | 8, 8 | the pooled sessions. The connection keeps at most twice maxActiveConnections pooled physical sessions, counting those still connecting or being closed. A call that needs a new one at that limit waits within its own deadline, then faults EXPIRED with nothing sent |
| maxWaitTime | 10000 | the wait for a pooled session, in ms. Zero or negative is replaced by the default |
| minEvictionTime, evictionCheckInterval |  | the pool evictor, off when the interval is empty |
| exhaustedAction | WHEN\_EXHAUSTED\_BLOCK | BLOCK waits up to maxWaitTime, FAIL faults at once, GROW creates one more session and removes the limit on pooled physical sessions, as a negative maxActiveConnections does |
| pubAckWindowSize | 1 | the publisher window of every session. Keep 1 for request reply unless the stream keeps the window busy |

The broker's per client username connection limit must allow maxActiveConnections plus two per connection, for the poll and request reply sessions, plus one per inbound endpoint. While sessions are being replaced a connection can hold up to twice its own number.

## Connector operations

publishMessage: destinationType, destinationName, deliveryMode (DIRECT for topics only, PERSISTENT, NON\_PERSISTENT), messageType, correlationId, priority, timeToLive, applicationMessageId, applicationMessageType, senderId, replyToDestinationType, replyToDestinationName, userProperties, dmqEligible, elidingEligible, expiration, waitForAck (true for PERSISTENT and NON\_PERSISTENT), ackTimeout (10000, the deadline for connect, send and the acknowledgement), continueOnAckFailure (false), responseVariable, overwriteBody. The response carries ackStatus, ACK, NACK, NOT\_REQUESTED or NOT\_APPLICABLE, and outcome UNKNOWN when the deadline cut the operation after the send.

sendRequest: destinationType, destinationName, deliveryMode, messageType, requestTimeout (30000), correlationId, priority, timeToLive, applicationMessageId, applicationMessageType, senderId, userProperties, dmqEligible, elidingEligible, expiration, waitForAck (true), ackTimeout (10000), contentType (the type the reply is read with), responseVariable, overwriteBody. Refused inside any transaction with REQUEST\_IN\_TRANSACTION.

sendReply: target (INBOUND, the default, or POLL), deliveryMode, messageType, correlationId, priority, timeToLive, applicationMessageId, applicationMessageType, senderId, userProperties, dmqEligible, elidingEligible, expiration, waitForAck (true), ackTimeout (10000), responseVariable, overwriteBody. Replies to the message the inbound endpoint delivered or to the polled message. The reply carries the correlation id of the request. An explicit correlationId is used only when the request has no correlation id. Without an explicit applicationMessageId the reply carries the request's.

poll: queueName, pollTimeout (5000, the wait, including the wait for the flow's owner thread), ackMode (AUTO, or CLIENT to stash the message with a lease), selector, contentType (the type the message is read with), responseVariable, overwriteBody. Inside a connector owned transaction the message is held until the commit or the rollback.

browse: queueName, maxMessages (10), browseTimeout (2000), selector, contentType (the type every message is read with), responseVariable, overwriteBody.

poll, sendRequest and browse write their result in the shape of [Results of poll, sendRequest and browse](#results-of-poll-sendrequest-and-browse).

acknowledgeMessage: target (INBOUND or POLL), responseVariable, overwriteBody. The response carries mode, DEFERRED when the decision was handed to the inbound endpoint 2.x, DIRECT when settled on the broker for an inbound endpoint 1.x or a polled message. It also carries settled, and reason ALREADY\_DECIDED, LATE or STALE\_DELIVERY when the call lost.

nackMessage: outcomeType (FAILED or REJECTED), target, responseVariable, overwriteBody, with the same response.

beginTransaction: transactionTimeoutMillis. commit and rollback take no parameter and wait up to 30 seconds for the completion.

An operation parameter with an explicit invalid value faults INVALID\_CONFIG 700103 before any broker call. For example deliveryMode PERSISTANT gives `INVALID_CONFIG: deliveryMode must be PERSISTENT, NON_PERSISTENT or DIRECT, got 'PERSISTANT'`. An absent parameter keeps its default.

## How a body is sent

!!! info
    Applies to the connector and the inbound endpoint 2.0.1 and later.

publishMessage, sendRequest and sendReply send the body of the message context. The connector writes it the way the HTTP transport writes a body. The platform's message formatter for the body's content type writes the bytes and names the content type. That content type goes on the Solace message, with one charset parameter at most.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-publish-path.png" title="The formatter of the content type writes the bytes, messageType chooses the Solace message class, and the content type goes on the message. messageType does not convert the body" width="800" alt="The formatter of the content type writes the bytes, messageType chooses the Solace message class, and the content type goes on the message. messageType does not convert the body"/>

messageType chooses the Solace message class.

The user properties of a received message are not copied to the outgoing message. The outgoing message carries only the user properties of its userProperties parameter. To forward one, read it from the result, for example `${vars.polled.attributes.userProp_fileName}`, or from solace.userProp.fileName on the inbound endpoint, and pass it in userProperties, as the [file transfer use case]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-file-transfer-request-reply/) does with fileName.

| messageType | The Solace message |
| --- | --- |
| TEXT, the default | a TextMessage with the characters of the body |
| BYTES | a BytesMessage with the bytes the formatter wrote, with no conversion |
| XML | an XMLContentMessage with the characters of the body |

JSON has no message class of its own. Send it as TEXT or BYTES. A binary body with TEXT or XML faults PAYLOAD\_ERROR 700124 and nothing is sent.

```
PAYLOAD_ERROR: publishMessage: the message body is binary (application/octet-stream) and messageType TEXT carries text, use messageType BYTES
```

An HTTP request with no Content-Type header is sent as bytes with application/octet-stream, so publish it with BYTES.

The text, XML and JSON formatters write UTF-8. When the charset of the message context is another one, the connector converts the text to it. A request sent as `text/plain; charset=ISO-8859-1` goes out as `text/plain; charset=ISO-8859-1`, with the same characters. A character that the charset cannot encode faults PAYLOAD\_ERROR 700124 and nothing is sent. Binary and multipart bytes are never converted.

A formatter registered for a custom content type writes its bytes with the charset of the message context, with no conversion. For such a type the strict charset handling depends on that formatter. It must report its own encoding failures and describe its own bytes.

A URL encoded or multipart form is written by the platform's form formatter, as it would go out over HTTP, with the same properties.

With WRITE\_XML\_DECLARATION set, the XML declaration the connector writes always names the charset of the message, UTF-8 included.

The body stays on the message context after the send. A second publish, an HTTP call or a File connector write after it sends the same body. A binary body keeps its bytes. A text, JSON or XML body is written again by its formatter, so its characters and its structure stay, while the bytes can differ, for example in the charset or the XML serialization.

The connector does not publish from an HTTP request whose body transfer failed. publishMessage, sendRequest and sendReply then fault PAYLOAD\_ERROR 700124 before any broker call and send nothing. The one exception is a body the connector installed itself with overwriteBody. So a fault sequence that builds its own message after such a failure gets the same fault.

```
PAYLOAD_ERROR: publishMessage: the HTTP request body was not received completely, nothing is sent
```

Every 700124 in this section comes before any broker call. For sendRequest it concerns the request. A sendRequest that fails on its reply has already sent the request, see [Fault 700124 by operation](#fault-700124-by-operation).

userProperties is a JSON array of objects, for example `[{"fileName":"x.txt"},{"tenant":"team1"}]`. Every key of every object is a user property. A string stays a string, an integer becomes a long, a decimal a double and a boolean a boolean. Anything else faults PAYLOAD\_ERROR 700124 and nothing is sent: input that is not a JSON array of objects, a null, a nested object or array, or a number too large for a long or a double.

## Results of poll, sendRequest and browse

!!! info
    Applies to the connector and the inbound endpoint 2.0.1 and later.

poll, sendRequest and browse read messages from the broker. Each one writes its result into the variable that its responseVariable parameter names. The examples on this page use polled for poll, reply for sendRequest and browsed for browse. These are the names set in responseVariable, so use the names your own operations set.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-read-result.png" title="With overwriteBody false the variable holds the payload and the attributes. With overwriteBody true the message becomes the body and the variable holds the attributes. browse returns an array of summaries" width="800" alt="With overwriteBody false the variable holds the payload and the attributes. With overwriteBody true the message becomes the body and the variable holds the attributes. browse returns an array of summaries"/>

### Payload and attributes

A result has two parts. payload is the body of the message. attributes describe the message: its ids, its delivery fields, its content type and its user properties.

This is the result of a poll as a test run returned it. The message was a text message with two user properties.

```json
{
  "attributes": {
    "destination": "Q.orders",
    "received": true,
    "timedOut": false,
    "ackMode": "AUTO",
    "messageId": "1",
    "deliveryMode": "PERSISTENT",
    "priority": 4,
    "redelivered": false,
    "dmqEligible": false,
    "elidingEligible": false,
    "contentType": "text/plain; charset=UTF-8",
    "userProp_fileName": "x.txt",
    "userProp_tenant": "team1"
  },
  "payload": "props"
}
```

The sequence reads the body as `${vars.polled.payload}` and the file name as `${vars.polled.attributes.userProp_fileName}`.

This is the result of a sendRequest. The responder replied with a JSON body and three user properties.

```json
{
  "attributes": {
    "destination": "Q.requests",
    "destinationType": "QUEUE",
    "messageId": "10964114",
    "correlationId": "req-5e8de98e-83d7-415c-9971-39d7d78e1e66",
    "applicationMessageId": "app-1",
    "deliveryMode": "NON_PERSISTENT",
    "priority": 4,
    "redelivered": false,
    "dmqEligible": false,
    "elidingEligible": false,
    "contentType": "application/json; charset=UTF-8",
    "userProp_attempt": 3,
    "userProp_fileName": "x.txt",
    "userProp_ok": true
  },
  "payload": {"ask": 1}
}
```

destination and destinationType are the request's. Every other attribute describes the reply. The reply declared application/json, so the payload is the parsed object. `${vars.reply.attributes.userProp_fileName}` gives x.txt.

A poll that finds no message within pollTimeout returns the attributes destination, received false, timedOut true and, outside a transaction, ackMode, and the payload `{"received": false, "timedOut": true, "destination": "Q.orders"}`.

### Every attribute

The first table holds the attributes of the operation. The second holds the attributes of the message, the same on poll, on sendRequest and on each browse item. A key whose value is not there is left out. It is never null.

| Key | Type | Operation | When it is absent |
| --- | --- | --- | --- |
| destination | string | poll: the queue polled. sendRequest: the destination of the request. browse: the queue browsed, and on each item the destination of that message | never |
| received | boolean | poll | never |
| timedOut | boolean | poll | never |
| ackMode | string, AUTO or CLIENT | poll | on a poll inside a connector owned transaction |
| leaseDeadline | number, epoch milliseconds | poll | unless ackMode is CLIENT and a message was received |
| destinationType | string, QUEUE or TOPIC | sendRequest | never |
| messageCount | number | browse | never |

| Key | Type | When it is absent |
| --- | --- | --- |
| messageId | string | when the message has none |
| correlationId | string | when the message has none |
| applicationMessageId | string | when the message has none |
| applicationMessageType | string | when the message has none |
| senderId | string | when the message has none |
| deliveryMode | string, PERSISTENT, NON\_PERSISTENT or DIRECT | when the message has none |
| priority | number | never |
| redelivered | boolean | never |
| dmqEligible | boolean | never |
| elidingEligible | boolean | never |
| expiration | number, epoch milliseconds | when it is 0 |
| timeToLive | number, milliseconds | when it is 0 |
| senderTimestamp | number, epoch milliseconds | when the sender set none |
| receiveTimestamp | number, epoch milliseconds | when it is 0 |
| sequenceNumber | number | when the message has none |
| replyToName | string | when the message has no reply to destination |
| replyToType | string, QUEUE or TOPIC | when the message has no reply to destination |
| contentType | string, the type the payload was read with | on a browse item whose payload could not be read |
| payloadEncoding | string, base64 | unless the payload is binary |
| payloadErrorCode | number | everywhere except on a browse item whose payload could not be read |
| payloadErrorMessage | string | everywhere except on a browse item whose payload could not be read |
| userProp\_&lt;key&gt; | string, number or boolean | one key per user property, none when the message has no user properties |

A poll that times out has no message attributes.

### User properties

Each user property is an attribute named userProp\_ followed by its key. In the expressions below polled, reply and browsed are the names set in each operation's responseVariable.

| Operation | Expression |
| --- | --- |
| poll | `${vars.polled.attributes.userProp_fileName}` |
| sendRequest | `${vars.reply.attributes.userProp_fileName}` |
| poll, a key with a dot | `${vars.polled.attributes['userProp_file.name']}` |
| browse, the first item | `${vars.browsed.payload[0].userProp_fileName}` |

A key with a dot or another punctuation mark needs the bracket form.

A user property keeps the type the producer gave it: a string, a number or a boolean. A bytes value becomes base64 text. A nested map becomes JSON object text and a nested stream JSON array text.

Every user property carries the prefix, so a user property never replaces an attribute of the connector. A user property named contentType arrives as userProp\_contentType, next to the connector's own contentType.

The inbound endpoint gives the same user properties as message context properties named solace.userProp.&lt;key&gt;, see [Message properties set by the inbound endpoint](#message-properties-set-by-the-inbound-endpoint).

### Text, JSON, XML and binary payloads

The connector reads a message by its class and its content type. The content type is the contentType parameter of the operation, else the type the message declares, else the default of the message class.

| Message class | Default content type |
| --- | --- |
| TextMessage | text/plain |
| BytesMessage | application/octet-stream |
| XMLContentMessage | application/xml |
| MapMessage, StreamMessage | application/json, and the contentType parameter does not apply |

The content type decides the payload.

| Read as | payload | payloadEncoding |
| --- | --- | --- |
| a JSON type, application/json or a type that ends in +json | the parsed value: an object, an array, a number, true, false or null | absent |
| an XML type, application/xml, text/xml or a type that ends in +xml | the XML text as a JSON string | absent |
| any other text type, text/plain for example | the text as a JSON string | absent |
| any other type | the bytes as base64 text | base64 |
| a MapMessage | its JSON object | absent |
| a StreamMessage | its JSON array | absent |

A BytesMessage read as a text type is decoded with the charset of its content type, UTF-8 when it names none. Bytes that are not valid in that charset fault PAYLOAD\_ERROR 700124. The connector never puts in a replacement character. A body read as JSON that does not parse faults PAYLOAD\_ERROR 700124 too.

```
PAYLOAD_ERROR: poll: the body read as application/json is not valid JSON
```

A poll with ackMode AUTO has already taken such a message off the queue. With ackMode CLIENT the message stays on the queue under its lease. A sendRequest that fails here has already sent its request. Every case is in [Fault 700124 by operation](#fault-700124-by-operation).

A TextMessage or an XMLContentMessage read as a type that is not text is binary. Its bytes are the UTF-8 encoding of its text.

A binary payload is base64 text and payloadEncoding is base64. A message whose body is the three bytes 00 01 FF gives the payload `AAH/`, with payloadEncoding base64 and contentType application/octet-stream. Decode it with base64 when you need the bytes. With overwriteBody true the body gets the native binary instead.

### The content type rule

!!! info
    Applies to the connector and the inbound endpoint 2.0.1 and later.

The connector does not guess JSON or XML from the body. Without a declared type or the contentType parameter, a TextMessage is text and a BytesMessage is binary. A TextMessage whose text looks like JSON is still text.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/2.x/solace-2x-content-type.png" title="The content type of a received message is the contentType parameter, else the type declared on the message, else the default of the message class. The body is never inspected" width="800" alt="The content type of a received message is the contentType parameter, else the type declared on the message, else the default of the message class. The body is never inspected"/>

There are two ways to read such a body as JSON or XML.

1. The producer declares the content type on the message.
2. poll, sendRequest and browse set the contentType parameter. On sendRequest it applies to the reply only.

Here is the same JSON document, sent as a TextMessage without a declared type, polled without and with the parameter.

| contentType parameter | attributes.contentType | payload |
| --- | --- | --- |
| absent | text/plain | `"{\"fileName\":\"x.txt\",\"size\":264,\"ok\":true,\"tags\":[\"a\",\"b\"],\"nested\":{\"k\":\"v\"}}"`, a string |
| application/json | application/json | `{"fileName":"x.txt","size":264,"ok":true,"tags":["a","b"],"nested":{"k":"v"}}`, an object |

```xml
<solace.poll configKey="SOLACE_CONN">
    <queueName>Q.orders</queueName>
    <pollTimeout>3000</pollTimeout>
    <contentType>application/json</contentType>
    <responseVariable>polled</responseVariable>
    <overwriteBody>false</overwriteBody>
</solace.poll>
```

The parameter wins over the type the message declares. A value without a charset takes the charset the message declares, else UTF-8. An empty value means no parameter. A value that is not a media type, or that names a charset Java does not know, faults INVALID\_CONFIG 700103 before any broker call. browse applies the parameter to every item, but keeps a JSON text item as summary text.

### With overwriteBody false

The result goes only into the variable. The body of the message context stays as it was. A publishMessage, sendRequest or sendReply after it sends that body, not the message you read. To send on the message you read, read it with overwriteBody true.

### With overwriteBody true

poll and sendRequest put the message itself on the body. The builder that the platform registers for the content type builds it, as a transport builds a request. A JSON message becomes a JSON body, an XML message an XML body, a text message a text body and a binary message the native binary body. The variable keeps the attributes, and its payload is null.

1. Text is built as UTF-8. A message declared `text/plain; charset=ISO-8859-1` keeps that type in attributes.contentType, and the body becomes `text/plain; charset=UTF-8` with the same characters.
2. A binary body keeps the type it was read with. A message declared application/pdf goes back over HTTP as application/pdf with the same bytes.
3. For a binary body, a respond, an HTTP call, a File connector write or a publish with messageType BYTES after it sends the bytes unchanged. A text, JSON or XML body is written again by its formatter. Its characters and its structure stay, but the bytes can differ, as item 1 shows for the charset.
4. The new body replaces the old one completely. The processing instructions of an earlier XML document do not stay.
5. A poll that times out puts its payload, `{"received": false, "timedOut": true, "destination": "Q.orders"}`, on the body.

browse with overwriteBody true writes its array of summaries onto the body as JSON. The variable keeps destination and messageCount.

A body polled with overwriteBody has a known limit, see [Known limits](#known-limits).

### Browse summaries

browse does not take messages off the queue. It returns a summary of each message in queue order. Nothing is acknowledged or removed.

A summary has the attributes of the message, contentType, payloadEncoding for a binary item, and payload.

1. A text, JSON or XML item has its text as payload, a JSON string. A JSON item stays text even when it is declared application/json. poll would parse it.
2. A binary item has base64 text, with payloadEncoding base64.
3. A MapMessage item is its JSON object, and a StreamMessage item is its JSON array, as on poll.
4. An item whose payload cannot be read carries payloadErrorCode and payloadErrorMessage, and no payload and no contentType. It keeps its message id and its other attributes. The browse goes on with the next item.

A connection or browser failure still fails the whole browse.

This is a browse of a queue with a binary message and an ISO-8859-1 text message, as a test run returned it. The base64 text is cut short here.

```json
{
  "attributes": {
    "messageCount": 2,
    "destination": "Q.orders"
  },
  "payload": [
    {
      "destination": "Q.orders",
      "messageId": "10964037",
      "deliveryMode": "PERSISTENT",
      "priority": 4,
      "redelivered": false,
      "dmqEligible": true,
      "elidingEligible": false,
      "contentType": "application/octet-stream",
      "payloadEncoding": "base64",
      "payload": "iVBORw0KGgoAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8w..."
    },
    {
      "destination": "Q.orders",
      "messageId": "10964038",
      "deliveryMode": "PERSISTENT",
      "priority": 4,
      "redelivered": false,
      "dmqEligible": true,
      "elidingEligible": false,
      "contentType": "text/plain; charset=ISO-8859-1",
      "payload": "café über straße\n"
    }
  ]
}
```

This is the second item of a browse of three, where the middle message was declared UTF-8 and its bytes were not valid UTF-8. The first and the third item came back as usual.

```json
{
  "destination": "Q.orders",
  "messageId": "10964040",
  "deliveryMode": "PERSISTENT",
  "priority": 4,
  "redelivered": false,
  "dmqEligible": true,
  "elidingEligible": false,
  "payloadErrorCode": 700124,
  "payloadErrorMessage": "browse: the body is not valid UTF-8 text"
}
```

Read the file name of the first item as `${vars.browsed.payload[0].userProp_fileName}` and the number of items as `${vars.browsed.attributes.messageCount}`.

## Fault 700124 by operation

PAYLOAD\_ERROR 700124 means that a body, its charset or the user properties could not be read, built or written. What was already sent, and what happened to the message, depends on the operation.

| Operation | What was already sent | What happened to the message |
| --- | --- | --- |
| publishMessage | nothing. The body, the charset and the user properties are checked before any broker call | nothing to settle. Fix the cause and publish again |
| sendReply | nothing, no reply went out. The checks run before any broker call | the request the sequence answers is not settled by the fault. With autoAck false the fault sequence decides, as for any failure |
| sendRequest, a fault on the request | nothing. The request is checked before any broker call | nothing to settle. A retry after the fix sends the request once |
| sendRequest, a fault on the reply | the request. The responder may have processed it | the reply could not be read with its content type, or with overwriteBody it could not be built into the body. The reply was received, and the temporary reply queue of a guaranteed request is gone after the fault, so the reply cannot be read again. A retry sends a new request, so a retry is not safe by itself |
| poll with ackMode AUTO | nothing | the message is already acknowledged and off the queue |
| poll with ackMode CLIENT | nothing | the lease is still held. The fault sequence can settle the message with acknowledgeMessage or nackMessage and target POLL. Without a settlement the lease ends after pollAckTimeout, the message is settled FAILED and the broker redelivers it. Until then another CLIENT poll in the same message context faults POLL\_UNSETTLED |
| poll inside a connector owned transaction | nothing | the message belongs to the open transaction. rollback returns it to the queue and commit removes it |
| browse | nothing | no operation fault. The item carries payloadErrorCode 700124, the message stays on the queue, and the browse goes on |

A sendRequest fault does not say whether the request or the reply failed. Some messages can only come from the request, for example `the message body is binary (application/octet-stream) and messageType TEXT carries text, use messageType BYTES` or an error in userProperties. When the side is not clear, assume that the request was sent.

## Known limits

1. A body polled with overwriteBody is parsed in full by the next connector operation that has a responseVariable. So a broken document fails there, even if the sequence never reads it.
2. A body that does not build faults PAYLOAD\_ERROR 700124. There is one exception. When the parser's message contains the name of a platform parser exception, for example because the document has an element named JsonSyntaxException, the platform reports the code 601000 instead. The payload is still rejected. What was already sent is the same as for 700124, see [Fault 700124 by operation](#fault-700124-by-operation).
3. An explicit correlationId on sendReply is used only when the request has no correlation id. When the request has one, the reply carries the request's correlation id.

## Message properties set by the inbound endpoint

The 1.x properties stay: solace.messageId, solace.destination, solace.deliveryMode, solace.receiveTimestamp, solace.sequenceNumber, solace.expiration, solace.discardIndication, solace.deliveryCount, solace.priority, solace.correlationId, solace.replyTo, solace.senderId, solace.senderTimestamp, solace.applicationMessageId, solace.applicationMessageType, solace.timeToLive, solace.httpContentType, solace.httpContentEncoding, solace.cos, solace.dmqEligible, solace.elidingEligible, and solace.userProp.&lt;key&gt; for each user property. New or changed in 2.x: solace.deliveryAttempt, the number of the in place attempt, 1 on the first injection. solace.redelivered, true when the broker's flag is set and from the second in place attempt, now on Direct topics too. solace.inbound.settlement, the settlement handle, never set or removed by a sequence. In transacted mode solace.inbound.tx and solace.inbound.tx.producer, used by the connector operations.

solace.userProp.&lt;key&gt; holds each user property as text. A string, a number or a boolean is its text form. A bytes value is base64 text. Any other value keeps the text form it had in 1.x. Read one with `get-property('solace.userProp.fileName')`.

## The body the inbound endpoint builds

!!! info
    Applies to the connector and the inbound endpoint 2.0.1 and later.

The inbound endpoint builds the body with the builder that the platform registers for the content type, the way a transport builds a request. The content type is solace.contentType, else the type the message declares, else the default of the message class: text/plain for a TextMessage, application/octet-stream for a BytesMessage, application/xml for an XMLContentMessage and application/json for a MapMessage or a StreamMessage. The body is never inspected to choose. A TextMessage that looks like JSON is text.

1. Text reaches the sequence as UTF-8. A message declared `text/plain; charset=ISO-8859-1` gives the sequence `text/plain; charset=UTF-8` with the same characters.
2. A binary message gives the platform's binary body. An HTTP call or a File connector write sends its bytes unchanged.
3. A form, URL encoded or multipart, is kept as bytes with its declared type. No field is parsed.
4. A body that does not build never reaches the sequence. JSON that the builder rejects at its start and an XML document whose root is malformed fail here. A JSON or XML document damaged after its start builds lazily, reaches the sequence and fails where mediation first reads it. For a body that fails at the build, the endpoint logs `could not be converted into a message context; rejecting` and settles the message without mediation. With autoAck false it is rejected, so it goes to the dead message queue when it is eligible. With autoAck true it is acknowledged. A transacted endpoint rolls the transaction back.
5. An empty message, with headers and no body, never reaches the sequence either. The endpoint logs `Received empty Solace message, no mediation context built` and settles it the same way.
6. solace.binaryPayloadAsBase64 true keeps the legacy form. Every BytesMessage body becomes base64 text with application/octet-stream, and the sequence decodes it.

With the logger org.wso2.carbon.inbound.solace at DEBUG, the endpoint names the builder of every message.

```
DEBUG {org.wso2.carbon.inbound.solace.SolaceUtils} - Solace message of content type application/json is built by org.wso2.micro.integrator.core.json.JsonStreamBuilder with message type application/json
```

[Consume JSON, XML, text and binary messages]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-how-to-consume-json-xml-text-binary/) shows what a sequence sees for each kind of message.
