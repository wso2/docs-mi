# Message Routing

A [message router]({{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-router) is a basic architectural pattern of a messaging system used fundamentally for connecting different message channels. A router consumes a message from one message channel and republishes it to a different channel based on specified conditions.

This section introduces various types of routers and how they can be simulated using the WSO2 Micro Integrator.

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