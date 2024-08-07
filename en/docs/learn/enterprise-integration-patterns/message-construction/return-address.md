# Return Address

This section explains, through an example scenario, how the Return Address Message EIP can be implemented using the ESB profile of WSO2 ESI. 

## Introduction to Return Address

The Return Address EIP facilitates adding a return address to a request message, which indicates where to send the reply message. 

!!! info
    For more information, see the [Return Address](http://www.eaipatterns.com/ReturnAddress.html) documentation.

![Return Address Solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/return-address-solution.gif)

## Example scenario

This example is a stock quote service where a client sends a stock quote request to the ESB profile with a return address embedded in the message header, which will indicate to the replier where the response message should be sent.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Return address]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/return-address.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Return Address EIP by comparing their core components.

| Return Address EIP (Figure 1) | Return Address Example Scenario (Figure 2) |
|-------------------------------|--------------------------------------------|
| Requestor 1                   | Stock Quote Client Instance                |
| Request Channel 1             | Send Mediator                              |
| Requestor 2                   | Stock Quote Client Instance                |
| Request Channel 2             | Send Mediator                              |
| Replier                       | Stock Quote Service Instance               |

### Environment setup

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.

2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.

3. Deploy the back-end service `SimpleStockQuoteService`. For instructions on deploying sample back-end services, go to Deploying sample back-end services in WSO2 EI Documentation.

4. Download `Return-Address.zip` file.

## ESB configuration

Start the ESB profile and log into its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

On the Management Console, navigate to the Main Menu and click Source View in the Service Bus section. Copy and paste the following configuration to the source view. You can now explore the example scenario. 

```
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <sequence name="main">
      <in>
         <log level="full"/>
         <send/>
      </in>
      <out>
         <log level="full"/>
         <send/>
      </out>
   </sequence>
</definitions>
```

## Set up the sample scenario

1. Execute the following command to send a request using the Stock Quote Client to the ESB profile:

    For information on the Stock Quote Client and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation.

    ```
    ant stockquote -Daddurl=http://localhost:9000/services/SimpleStockQuoteService -Dtrpurl=http://localhost:8280/services/ReturnAddressProxy -Dmode=dualquote -Dsymbol=foo
    ```

2. If you use `TCPmon` to analyze the message passing, you will notice that the client sends the following message. Note that in line 4, the WS-Addressing `ReplyTo` header is set to a service called `anonService2`. Since the reply is made to this service on a separate channel, the client will receive no response.

    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
          <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
             <wsa:To>http://localhost:9000/service/SimpleStockQuoteService</wsa:To>
             <wsa:ReplyTo>
                <wsa:Address>http://10.150.3.53:8200/axis2/services/anonService2/</wsa:Address>
             </wsa:ReplyTo>
             <wsa:MessageID>urn:uuid:9aa8e783-2eb7-4649-9d36-a7fb3ad17abd</wsa:MessageID>
             <wsa:Action>urn:getQuote</wsa:Action>
          </soapenv:Header>
          <soapenv:Body>
             <m0:getQuote xmlns:m0="http://services.samples">
                <m0:request>
                   <m0:symbol>foo</m0:symbol>
                </m0:request>
             </m0:getQuote>
          </soapenv:Body>
       </soapenv:Envelope>
    ```

Axis2 Client Response:

Standard dual channel :: Stock price = $78.11501844382737

Axis2 Server Response:

samples.services.SimpleStockQuoteService :: Generating quote for : foo

### How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration shown above.

send [line 10 in config] - The send mediator forwards messages to the address implied in the ReplyTo header field by default, unless it is made explicit that the reply should go to a specific address by using an endpoint mediator. 
