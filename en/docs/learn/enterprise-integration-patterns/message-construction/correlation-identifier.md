# Correlation Identifier

This section explains how the Correlation Identifier EIP can be implemented using the ESB profile of WSO2 EI. 

## Introduction to Correlation Identifier
The Correlation Identifier EIP facilitates a unique identifier that indicates which request message a given reply is for. It enables a requester that has received a reply to know which request the reply is for. 

!!! info
    For more information, see the [Correlation Identifier](http://www.eaipatterns.com/CorrelationIdentifier.html) documentation.

![Correlation identifier solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/correlation-identifier-solution.gif)

### How the ESB profile implements the EIP

Message flow of the ESB profile automatically manages requests sent by a client. It injects a unique identification number into the message context of each request. When the response arrives, the message will be uniquely identified using this number, allowing the requester to distinguish between requests.     
