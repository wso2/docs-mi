# Correlation Identifier

This page explains how you can implement a sample scenario of Correlation Identifier using WSO2 Micro Integrator.

## Introduction to Correlation Identifier

The Correlation Identifier EIP facilitates a unique identifier that indicates which request message a given reply is for. It enables a requester who has received a reply to know which request the reply is for. 

!!! info
    For more information, see the [Correlation Identifier](http://www.eaipatterns.com/CorrelationIdentifier.html) documentation.

![Correlation identifier solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/correlation-identifier-solution.gif)

### How WSO2 Micro Integrator implements the EIP

The message flow of the Micro Integrator automatically manages requests sent by a client by injecting a unique identification number into the message context of each request. When the response arrives, the message will be uniquely identified using this number, allowing the requester to distinguish between requests.
