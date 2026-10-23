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
| solace.contentType | detected | overrides the content type |
| solace.binaryPayloadAsBase64 | false | base64 for binary payloads |
| solace.selector |  | a SQL 92 selector on headers and user properties, queues and durable topic endpoints |

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

The 1.x parameters keep their meaning: name, host, vpnName, username, password, apiProvidedUsername, clientName, connectionTimeout, readTimeout, compressionLevel, the generate flags, connectRetries, connectRetriesPerHost, reconnectRetries, reconnectRetryWait, the ssl parameters, authenticationScheme, oauth2AccessToken, oauth2IssuerIdentifier, oidcIdToken, pubAckWindowSize. One of them changes how it is applied: connectRetries and connectRetriesPerHost now count the physical connect attempts a session makes across its recovery, and each attempt connects once inside the client library, so a broker outage never piles up connect attempts behind callers that timed out. The parameters below are new in 2.0.0.

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

sendRequest: destinationType, destinationName, deliveryMode, messageType, requestTimeout, correlationId, priority, timeToLive, applicationMessageId, applicationMessageType, senderId, userProperties, dmqEligible, elidingEligible, expiration, waitForAck (true), ackTimeout (10000), responseVariable, overwriteBody. Refused inside any transaction with REQUEST\_IN\_TRANSACTION.

sendReply: target (INBOUND, the default, or POLL), deliveryMode, messageType, correlationId, priority, timeToLive, applicationMessageId, applicationMessageType, senderId, userProperties, dmqEligible, elidingEligible, expiration, waitForAck (true), ackTimeout (10000), responseVariable, overwriteBody. Replies to the message the inbound endpoint delivered or to the polled message.

poll: queueName, pollTimeout (the wait, including the wait for the flow's owner thread), ackMode (AUTO, or CLIENT to stash the message with a lease), selector, responseVariable, overwriteBody. Inside a connector owned transaction the message is held until the commit or the rollback.

browse: queueName, maxMessages, browseTimeout, selector, responseVariable, overwriteBody.

acknowledgeMessage: target (INBOUND or POLL), responseVariable, overwriteBody. The response carries mode, DEFERRED when the decision was handed to the inbound endpoint 2.0.0, DIRECT when settled on the broker for an inbound endpoint 1.x or a polled message. It also carries settled, and reason ALREADY\_DECIDED, LATE or STALE\_DELIVERY when the call lost.

nackMessage: outcomeType (FAILED or REJECTED), target, responseVariable, overwriteBody, with the same response.

beginTransaction: transactionTimeoutMillis. commit and rollback take no parameter and wait up to 30 seconds for the completion.

requestCachedMessages: cacheName, topicPattern, cacheMaxMessages, cacheMaxAgeSeconds, cacheRequestTimeout, liveDataAction, responseVariable, overwriteBody, unchanged from 1.x.

## Message properties set by the inbound endpoint

The 1.x properties stay: solace.messageId, solace.destination, solace.deliveryMode, solace.receiveTimestamp, solace.sequenceNumber, solace.expiration, solace.discardIndication, solace.deliveryCount, solace.priority, solace.correlationId, solace.replyTo, solace.senderId, solace.senderTimestamp, solace.applicationMessageId, solace.applicationMessageType, solace.timeToLive, solace.httpContentType, solace.httpContentEncoding, solace.cos, solace.dmqEligible, solace.elidingEligible, and solace.userProp.&lt;key&gt; for each user property. New or changed in 2.0.0: solace.deliveryAttempt, the number of the in place attempt, 1 on the first injection. solace.redelivered, true when the broker's flag is set and from the second in place attempt, now on Direct topics too. solace.inbound.settlement, the settlement handle, never set or removed by a sequence. In transacted mode solace.inbound.tx and solace.inbound.tx.producer, used by the connector operations.
