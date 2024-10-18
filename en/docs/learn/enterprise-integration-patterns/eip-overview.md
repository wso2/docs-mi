# Enterprise Integration Patterns with WSO2 Micro Integrator

Enterprise Application Integration (EAI) is key to connecting business applications with heterogeneous systems. Over the years, architects of integration solutions have invented their own blend of patterns in a variety of ways. However, most of these architectures have similarities, initiating a set of widely-accepted standards in architecting integration patterns. Most of these standards are described in the [Enterprise Integration Patterns Catalog](http://www.eaipatterns.com/toc.html).

In this guide, we have shown how each pattern in the Patterns Catalog can be simulated using various constructs in WSO2 Micro Integrator (MI). Click on a topic in the list below for details.  

## Messaging Systems

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-channels">Message Channels</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/channels.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/channels.png" alt="channels" width="80"></a></td>
        <td>How one application communicates with another using messaging.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message">Message</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message.png" alt="message" width="80"></a></td>
        <td>How two applications connected by a message channel exchange a piece of information.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters">Pipes and Filters</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/pipes-and-filters-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/pipes-and-filters-icon.gif" alt="pipes-and-filters" width="80"></a></td>
        <td>How to perform complex processing on a message while maintaining independence and flexibility.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-router">Message Router</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-based-router-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-based-router-icon.gif" alt="content-based-router" width="80"></a></td>
        <td>How to decouple individual processing steps so that messages can be passed to different filters depending on conditions.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-translator">Message Translator</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-translator-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-translator-icon.gif" alt="message-translator" width="80"></a></td>
        <td>How systems using different data formats communicate with each other using messaging.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-endpoint">Message Endpoint</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-endpoint.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-endpoint.png" alt="message-endpoint" width="80"></a></td>
        <td>How an application connects to a messaging channel to send and receive messages.</td>
    </tr>
</table>

## Messaging Channels

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/point-to-point-channel">Point-to-Point Channel</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/point-to-point.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/point-to-point.png" alt="point-to-point" width="80"></a></td>
        <td>How the caller can be sure that exactly one receiver will receive the document or perform the call.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/publish-subscribe-channel">Publish-Subscribe Channel</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/publish-subscribe.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/publish-subscribe.png" alt="publish-subscribe" width="80"></a></td>
        <td>How the sender broadcasts an event to all interested receivers.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/datatype-channel">Datatype Channel</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/datatype-channel.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/datatype-channel.png" alt="datatype-channel" width="80"></a></td>
        <td>How the application sends a data item such that the receiver will know how to process it.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/invalid-message-channel">Invalid Message Channel</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/invalid-message-channel.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/invalid-message-channel.png" alt="invalid-message-channel" width="80"></a></td>
        <td>How a messaging receiver gracefully handles a message that makes no sense.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/dead-letter-channel">Dead Letter Channel</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/dead-letter-channel.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/dead-letter-channel.png" alt="dead-letter-channel" width="80"></a></td>
        <td>What the messaging system does with a message it cannot deliver.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/guaranteed-delivery">Guaranteed Delivery</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/guaranteed-messaging.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/guaranteed-messaging.png" alt="guaranteed-messaging" width="80"></a></td>
        <td>How the sender ensures delivery of a message, even if the messaging system fails.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/channel-adapter">Channel Adapter</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/channel-adapter.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/channel-adapter.png" alt="channel-adapter" width="80"></a></td>
        <td>How to connect an application to the messaging system to send/receive messages.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/messaging-bridge">Messaging Bridge</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-bridge.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-bridge.png" alt="messaging-bridge" width="80"></a></td>
        <td>How multiple messaging systems can be connected so that messages available on one are also available on the others.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-channels/message-bus">Message Bus</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-bus.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-bus.png" alt="message-bus" width="80"></a></td>
        <td>An architecture enabling separate applications to work together in a decoupled fashion such that applications can be easily added or removed without affecting the others.</td>
    </tr>
</table>

## Message Construction

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/command-message">Command Message</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/command-message.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/command-message.png" alt="command-message" width="80"></a></td>
        <td>How messaging can be used to invoke a procedure in another application.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/document-message">Document Message</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/document-message.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/document-message.png" alt="document-message" width="80"></a></td>
        <td>How messaging can be used to transfer data between applications.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/event-message">Event Message</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/event-message.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/event-message.png" alt="event-message" width="80"></a></td>
        <td>How messaging can be used to transmit events from one application to another.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/request-reply">Request-Reply</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/request-reply.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/request-reply.png" alt="request-reply" width="80"></a></td>
        <td>How an application that sends a message gets a response from the receiver.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/return-address">Return Address</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/return-address.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/return-address.png" alt="return-address" width="80"></a></td>
        <td>How a replier knows where to send the reply.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/correlation-identifier">Correlation Identifier</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/correlation-identifier.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/correlation-identifier.png" alt="correlation-identifier" width="80"></a></td>
        <td>How a requester that has received a reply knows which request the reply is for.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/message-sequence">Message Sequence</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-sequence.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-sequence.png" alt="message-sequence" width="80"></a></td>
        <td>How messaging can transmit an arbitrarily large amount of data.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/message-expiration">Message Expiration</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-expiration.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-expiration.png" alt="message-expiration" width="80"></a></td>
        <td>How a sender indicates when a message should be considered stale and therefore should not be processed.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-construction/format-indicator">Format Indicator</a></td>
        <td></td>
        <td>How a message’s data format can be designed to allow for possible future changes.</td>
    </tr>
</table>

## Message Routing

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/content-based-router">Content-Based Router</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-based-router.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-based-router.png" alt="content-based-router" width="80"></a></td>
        <td>How to handle a situation when the implementation of a single logical function (such as an inventory check) is spread across multiple physical systems.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/message-filter">Message Filter</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-filter.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-filter.png" alt="message-filter" width="80"></a></td>
        <td>How a component avoids receiving uninteresting messages.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/dynamic-router">Dynamic Router</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/dynamic-router.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/dynamic-router.png" alt="dynamic-router" width="80"></a></td>
        <td>How to avoid the dependency of a router in all possible destinations, while maintaining its efficiency.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/recipient-list">Recipient List</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/recipient-list.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/recipient-list.png" alt="recipient-list" width="80"></a></td>
        <td>How to route a message to a list of dynamically specified recipients.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/splitter">Splitter</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/splitter.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/splitter.png" alt="splitter" width="80"></a></td>
        <td>How to process a message if it contains multiple elements, each of which may have to be processed in a different way.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/aggregator">Aggregator</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/aggregator.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/aggregator.png" alt="aggregator" width="80"></a></td>
        <td>How to combine the results of individual but related messages so that they can be processed as a whole.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/composed-message-processor">Composed Message Processor</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/distribution-aggregate.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/distribution-aggregate.png" alt="distribution-aggregate" width="80"></a></td>
        <td>How to maintain the overall flow when processing a message consisting of multiple elements, each of which may require different processing.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/scatter-gather">Scatter-Gather</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/broadcast-aggregate-icon.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/broadcast-aggregate-icon.png" alt="Scatter-Gather" width="80"></a></td>
        <td>How to maintain the overall flow when a message needs to be sent to multiple recipients, each of which may send a reply.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/routing-slip">Routing Slip</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/routing-table.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/routing-table.png" alt="routing-table" width="80"></a></td>
        <td>How to route a message consecutively through a series of steps when the sequence of the steps is not known at design time and may vary for each message.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/process-manager">Process Manager</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/process-manager.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/process-manager.png" alt="process-manager" width="80"></a></td>
        <td>How to route a message through multiple processing steps, when the required steps may not be known at design time and may not be sequential.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-routing/message-broker">Message Broker</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-broker.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-broker.png" alt="message-broker" width="80"></a></td>
        <td>How to decouple the destination of a message from the sender and maintain central control over the flow of messages.</td>
    </tr>
</table>

## Message Transformation

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/envelope-wrapper">Envelope Wrapper</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/envelope-wrapper.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/envelope-wrapper.png" alt="envelope-wrapper" width="80"></a></td>
        <td>How existing systems participate in a messaging exchange, which places specific requirements in the message format, such as message header fields or encryption.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/content-enricher">Content Enricher</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/data-enricher.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/data-enricher.png" alt="data-enricher" width="80"></a></td>
        <td>How to communicate with another system if the message originator does not have all the required data items available.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/content-filter">Content Filter</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-filter.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-filter.png" alt="content-filter" width="80"></a></td>
        <td>How to simplify dealing with a large message when you are interested only in a few data items.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/claim-check">Claim Check</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/store-in-library.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/store-in-library.png" alt="store-in-library" width="80"></a></td>
        <td>How to reduce the data volume of a message sent across the system without sacrificing information content.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/normalizer">Normalizer</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/normalizer.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/normalizer.png" alt="normalizer" width="80"></a></td>
        <td>How to process messages that are semantically equivalent but arrive in a different format.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/canonical-data-model">Canonical Data Model</a></td>
        <td></td>
        <td>How to minimize dependencies when integrating applications that use different data formats.</td>
    </tr>
</table>

## Messaging Endpoints

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/messaging-gateway">Messaging Gateway</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-gateway.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-gateway.png" alt="messaging-gateway" width="80"></a></td>
        <td>How to encapsulate access to the messaging system from the rest of the application.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/messaging-mapper">Messaging Mapper</a></td>
        <td></td>
        <td>How to move data between domain objects and the messaging infrastructure, while keeping the two independent of each other.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/transactional-client">Transactional Client</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/transactional-client.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/transactional-client.png" alt="transactional-client" width="80"></a></td>
        <td>How a client controls its transactions with the messaging system.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/polling-consumer">Polling Consumer</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/polling-consumer.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/polling-consumer.png" alt="polling-consumer" width="80"></a></td>
        <td>How an application consumes a message when the application is ready.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/event-driven-consumer">Event-Driven Consumer</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/event-driven-consumer.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/event-driven-consumer.png" alt="event-driven-consumer" width="80"></a></td>
        <td>How an application automatically consumes messages as they become available.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/competing-consumers">Competing Consumers</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/competing-consumers.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/competing-consumers.png" alt="competing-consumers" width="80"></a></td>
        <td>How a messaging client processes multiple messages concurrently.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/message-dispatcher">Message Dispatcher</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-dispatcher.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-dispatcher.png" alt="message-dispatcher" width="80"></a></td>
        <td>How multiple consumers on a single channel coordinate their message processing.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/selective-consumer">Selective Consumer</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-selector.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-selector.png" alt="message-selector" width="80"></a></td>
        <td>How a message consumer selects which messages to receive.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/durable-subscriber">Durable Subscriber</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/durable-subscription.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/durable-subscription.png" alt="durable-subscription" width="80"></a></td>
        <td>How a subscriber avoids missing messages while it is not listening for them.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/messaging-endpoints/service-activator">Service Activator</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-adapter.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-adapter.png" alt="messaging-adapter" width="80"></a></td>
        <td>How an application designs a service to be invoked via both messaging and non-messaging techniques.</td>
    </tr>
</table>
