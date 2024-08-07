# Command Message

This section explains, through an example scenario, how the Command Message EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Command Message

The Command Message EIP allows you to use messaging to invoke a procedure in another application. 

!!! info
    For more information, see the [Command Message](http://www.eaipatterns.com/CommandMessage.html) documentation.

![Command message solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/command-message-solution.gif)

## Sample scenario

This example demonstrates how the ESB profile uses messaging to invoke functionality provided by an application, in this case a stock quote service. A command message can be in any form, including a JMS serialized object or a text message in the form of an XML or SOAP request. In this example, the ESB profile will pass the message as a document to a sample Axis2 server and invoke the operation directly using the Callout mediator.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Command message]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/command-message.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Command Message EIP by comparing their core components.

| Command Message EIP (Figure 1)  | Command Message Example Scenario (Figure 2) |
|---------------------------------|---------------------------------------------|
| Sender                          | Stock Quote Client                          |
| Command Message                 | Callout mediator                            |
| Receiver                        | Stock Quote Service Instance                |

## ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this. 

```
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="command-message-proxy" startOnLoad="true" transports="http https">
      <target>
         <inSequence>
             <callout serviceURL="http://localhost:9000/services/SimpleStockQuoteService" action="urn:getQuote">
         <source xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s12="http://www.w3.org/2003/05/soap-envelope" xpath="s11:Body/child::*[fn:position()=1] | s12:Body/child::*[fn:position()=1]" />
         <target xmlns:s11="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s12="http://www.w3.org/2003/05/soap-envelope" xpath="s11:Body/child::*[fn:position()=1] | s12:Body/child::*[fn:position()=1]" />
      </callout>
      <respond />
         </inSequence>
         <outSequence>
            <respond />
         </outSequence>
      </target>
   </proxy>
</definitions>
```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- callout - The callout mediator specifies a particular method to invoke in the back-end service. This invocation is blocking.  
- source - The source specifies the payload for the method invocation using xPath expressions.
- target - The target specifies the location where the response should be concatenated.

## Set up the sample scenario

Now, let's try out the sample explained above.

### Set up the environment

Download the Command-Message.zip, which includes the artifacts of this sample and follow the steps in Simulating a Sample Scenario.

## Execute the sample

1. ANT request:

    ant stockquote -Dtrpurl=http://localhost:8280/services/command-message-proxy

2. The client receives the stock quote as the response.

Stock Quote Client response:
Standard :: Stock price = $85.09378162206208


Axis2 server response:

samples.services.SimpleStockQuoteService :: Generating quote for : IBM
