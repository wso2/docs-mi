# Messaging Channels

A Message channel is a basic architectural pattern of a [messaging system]({{base_path}}/learn/enterprise-integration-patterns/messaging-systems/overview) and is used fundamentally for exchanging data between applications. An application can use a channel to make a specific type of data available to any receiver applications that need to consume that type of data.

This section introduces different types of channels used in a messaging system, their behaviors, and how they can be simulated using the WSO2 Micro Integrator.

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
