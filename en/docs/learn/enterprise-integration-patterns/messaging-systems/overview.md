# Messaging Systems

Messaging is one integration style out of many, used for connecting various applications in a loosely coupled, asynchronous manner. Messaging decouples the applications from data transferring, so that applications can concentrate on data and related logic while the messaging system handles the transferring of data.

This chapter introduces the basic patterns used when implementing enterprise integration using messaging and how they are simulated using the WSO2 Micro Integrator. These patterns are the fundamentals on which the rest of the chapters in this guide are built.

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
