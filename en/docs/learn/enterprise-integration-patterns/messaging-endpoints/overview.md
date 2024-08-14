# Messaging Endpoints

An [endpoint]({{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-endpoint) is used to connect an application to a messaging channel so that the application can send or receive messages.

This section introduces various endpoint patterns and how each can be simulated using the WSO2 Micro Integrator.

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
