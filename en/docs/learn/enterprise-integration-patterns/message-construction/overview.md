# Message Construction

Message construction involves the architectural patterns of various constructs, functions, and activities involved in creating and transforming a message between applications.

This chapter introduces message construction patterns and how they can be simulated using the WSO2 Micro Integrator.

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
