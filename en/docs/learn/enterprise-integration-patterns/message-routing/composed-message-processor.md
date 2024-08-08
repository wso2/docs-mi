# Composed Message Processor

This section explains, through a sample scenario, how the Composed Message Processor EIP can be implemented using WSO2 ESB.

## Introduction to Composed Message Processor

The Composed Msg. Processor EIP is used to process a composite message. It maintains the overall message flow when processing a message consisting of multiple elements, each of which might require different processing. The Composed Message Processor splits the message up, routes the sub-messages to the appropriate destinations, and then aggregates the responses back into a single message. 

!!! info
    For more information, see the [Composed Message Processor](http://www.eaipatterns.com/DistributionAggregate.html) documentation.

![Distribution aggregate]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/distribution-aggregate.gif)

## Sample scenario

This sample scenario demonstrates splitting a message into several requests, which are then routed to different servers, merged together, and sent back to the client. In this scenario, each server instance acts as an inventory controller. The user can have multiple requests in a single request message. The Iterate Mediator processes the request message and splits it. The ESB identifies the request content using the Switch mediator, and decides the routing destination. The Send mediator then sends the request message to the respective location (endpoint). The response, which will be sent from different endpoints, will be merged together using the Aggregate mediator of the ESB before sending back to the client.

The diagram below depicts how to simulate the sample scenario using WSO2 ESB.

![Composed message processor sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/composed-message-processor-example-scenario.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Composed Msg. Processor EIP by comparing their core components.

| Composed Message Processor EIP (Figure 1) | Composed Message Processor Sample Scenario (Figure 2) |
|-------------------------------------------|-------------------------------------------------------|
| New Order                                 | Stock Quote Request                                   |
| Splitter                                  | Iterate Mediator                                      |
| Router                                    | Switch Mediator                                       |
| Widget/Gadget Inventory                   | Stock Quote Service Instance                          |
| Aggregator                                | Aggregate Mediator                                    |
| Validated Order                           | Aggregated Stock Quote Response                       |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start two Sample Axis2 server instances in ports 9000 and 9001. For instructions, refer to the section Setting up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.  

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="ComposedMessageProxy" startOnLoad="true">
      <target>
         <inSequence>
            <log level="full"/>
            <iterate xmlns:m0="http://services.samples"
                     preservePayload="true"
                     attachPath="//m0:getQuote"
                     expression="//m0:getQuote/m0:request">
               <target>
                  <sequence>
                     <switch xmlns:m1="http://services.samples/xsd" source="//m1:symbol">
                        <case regex="IBM">
                           <send>
                              <endpoint>
                                 <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                              </endpoint>
                           </send>
                        </case>
                        <case regex="WSO2">
                           <send>
                              <endpoint>
                                 <address uri="http://localhost:9001/services/SimpleStockQuoteService"/>
                              </endpoint>
                           </send>
                        </case>
                        <default>
                           <drop/>
                        </default>
                     </switch>
                  </sequence>
               </target>
            </iterate>
         </inSequence>
         <outSequence>
            <aggregate>
               <completeCondition>
                  <messageCount/>
               </completeCondition>
               <onComplete xmlns:m0="http://services.samples" expression="//m0:getQuoteResponse">
                  <send/>
               </onComplete>
            </aggregate>
         </outSequence>
      </target>
      <publishWSDL uri="file:repository/samples/resources/proxy/sample_proxy_1.wsdl"/>
   </proxy>
   <sequence name="fault">
      <log level="full">
         <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
         <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
         <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
      </log>
      <drop/>
   </sequence>
   <sequence name="main">
      <log/>
      <drop/>
   </sequence>
</definitions>
```

## Set up the sample scenario

Send the following request using a SOAP client such as SoapUI. 

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>    
         <ser:request>          
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
          <ser:request>           
            <xsd:symbol>WSO2</xsd:symbol>
         </ser:request>
         <ser:request>          
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

Note that the three responses are merged together.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- iterate [line 7 in ESB config] - The Iterate mediator takes each child element of the element specified in its XPath expression and applies the sequence flow inside the Iterate mediator. In this example, it takes each getQuote request specified in the incoming request and forwards this request to the target endpoint.
- switch [line 13 in ESB config] - Observes the message and filters out the message content to the given XPath expression.
- case [line 14 in ESB config] - The filtered content will be tallied with the given regular expression.
- send [line 15 in ESB config] - When a matching case is found, the Send mediator will route the message to the endpoint indicated in the address URI.
- aggregate [line 37 in ESB config] - The Aggregate mediator merges together the response messages for requests made by the Iterate or Clone mediators. The completion condition specifies the minimum or maximum number of messages to be collected. When all messages are aggregated, the sequence inside onComplete is run. 
