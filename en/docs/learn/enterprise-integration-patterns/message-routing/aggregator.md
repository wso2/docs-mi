# Aggregator

This section explains, through a sample scenario, how the Aggregator EIP can be implemented using WSO2 ESB. 

## Introduction to Aggregator

The Aggregator EIP combines the results of individual, related messages so that they can be processed as a whole. It works as a stateful filter, collecting and storing individual messages until a complete set of related messages has been received. It then publishes a single message distilled from the individual messages. 

!!! info
    For more information, see the [Aggregator](http://www.eaipatterns.com/Aggregator.html) documentation.

![Aggregator]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/aggregator.gif)

## Sample scenario

This sample scenario demonstrates how WSO2 ESB can be used to send multiple requests and merge the responses. Assume the sender wants to get responses from multiple servers, and it sends a message to the ESB. The ESB will duplicate the request to three different instances of a sample Axis2 server using the Clone Mediator. The ESB will merge the responses received from each of the server instances using the Aggregate Mediator and send it back to the client.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

![Aggregator sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/aggregator-sample-scenario.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Aggregator EIP by comparing their core components.

| Aggregator EIP (Figure 1) | Aggregator Sample Scenario (Figure 2) |
|---------------------------|---------------------------------------|
| Inventory Item            | Simple Stock Quote Service Response   |
| Aggregator                | Aggregate Mediator                    |
| Inventory Order           | WSO2 ESB Response                     |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start three Sample Axis2 server instances on ports 9000, 9001, and 9002. For instructions, refer to the section Setting up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="AggregateMessageProxy"
          transports="http https"
          startOnLoad="true">
      <target>
         <inSequence>
            <log level="full"/>
            <clone>
               <target>
                  <endpoint name="ReceiverA">
                     <address uri="http://localhost:9000/services/SimpleStockQuoteService/"/>
                  </endpoint>
               </target>
               <target>
                  <endpoint name="ReceiverB">
                     <address uri="http://localhost:9001/services/SimpleStockQuoteService/"/>
                  </endpoint>
               </target>
               <target>
                  <endpoint name="ReceiverC">
                     <address uri="http://localhost:9002/services/SimpleStockQuoteService/"/>
                  </endpoint>
               </target>
            </clone>
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

1. Send the following request to the ESB using a SOAP client like [SoapUI](https://www.soapui.org/).
 
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <ser:getQuote>    
             <ser:request>          
                <xsd:symbol>foo</xsd:symbol>
             </ser:request>       
          </ser:getQuote>
       </soapenv:Body>
    </soapenv:Envelope>
    ```
   
2. The user will be able to see the merged response for all three quotes made in the request as shown in the following example screen.

    ![Aggregator SOAP UI]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/aggregator-soap-ui.png)

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- clone [line 9 in ESB config] - The Clone mediator is similar to the Splitter EIP. It clones the incoming request and passes the requests in parallel to several endpoints.   
- aggregate [line 23 in ESB config] - The aggregate mediator aggregates response messages for requests made by the Iterate or Clone mediators. The completion condition specifies a minimum or maximum number of messages to be collected. When all messages have been aggregated, the sequence inside onComplete will be run.
