# Request-Reply

This section explains, through an example scenario, how the Request-Reply Message EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Request-Reply

The Request-Reply EIP facilitates two-way communication by ensuring that a sender gets a response or reply back from the receiver after sending a request message. This pattern sends a pair of Request-Reply messages, each on its own channel. 

!!! info

    For more information, refer to [Request-Reply](http://www.eaipatterns.com/RequestReply.html) documentation.

![Request reply]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/request-reply.gif)

## Sample scenario

The example scenario illustrates how a request to a service is made through one channel, and the response from the service is returned to the requester on a separate channel.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Request reply]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/request-reply.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Request-Reply EIP by comparing their core components.

| Request-Reply EIP (Figure 1) | Request-Reply Example Scenario (Figure 2) |
|------------------------------|-------------------------------------------|
| Requestor                    | Simple Stock Quote Client                 |
| Request Channel              | Send, Endpoint                            |
| Replier                      | Stock Quote Service Instance              |
| Reply Channel                | Send, Endpoint                            |

### Environment setup

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.

2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.

3. Deploy the back-end service `SimpleStockQuoteService`. For instructions on deploying sample back-end services, go to Deploying sample back-end services in WSO2 EI Documentation.

4. Download the `Request-Reply.zip` file.

## ESB configuration

Start the ESB profile and log into its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

On the Management Console, navigate to the Main Menu and click Source View in the Service Bus section. Copy and paste the following configuration to the source view. You can now explore the example scenario. 

```
<?xml version="1.0" encoding="UTF-8"?>
 <definitions xmlns="http://ws.apache.org/ns/synapse">
  <proxy name="RequestReplyProxy" transports="http https" startOnLoad="true">
        <target>
           <inSequence>
              <send>
                 <endpoint>
                    <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                 </endpoint>
              </send>
           </inSequence>
           <outSequence>
              <send/>
           </outSequence>
        </target>
     </proxy>
 </definitions>
```

## Set up the sample scenario

Use a SOAP client like SoapUI to invoke the above proxy service. The following image illustrates how a response is generated to a request made by the client.

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples"
xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header>
   </soapenv:Header>
   <soapenv:Body>
      <ser:getQuote>
         <ser:request>
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

![Request reply SOAP response]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/request-reply-soap-response.png)

## How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration shown above.

- inSequence [line 5 in config] - When a client sends a message, it is picked up by the inSequence.
- send [line 6 in config] -  The send mediator sends the message to the endpoint running on port 9000.
- outSequence [line 12 in config] - The processed response from the endpoint will be sent back to the client through the outSequence. The send mediator inside the outSequence will direct the message back to the requesting client, which is on a channel separate from the requesting channel. 
