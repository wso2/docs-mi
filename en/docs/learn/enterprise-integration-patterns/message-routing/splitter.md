# Splitter

This section explains, through a sample scenario, how the Splitter EIP can be implemented using WSO2 ESB.

## Introduction to Splitter

The Splitter EIP processes messages containing multiple elements that might have to be processed in different ways. The Splitter breaks out the composite message into a series of individual messages, each containing data related to one item. 

!!! info
    For more information, see the [Splitter](http://www.eaipatterns.com/Sequencer.html) documentation.

![Sequencer]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/sequencer.gif)

## Sample scenario

This example demonstrates WSO2 ESB implementing the Splitter EIP by processing a list of repeating elements, each of which will be processed individually. The client sends multiple requests in a single message. Using the Iterate mediator of the ESB, each request will be processed individually and transmitted to a sample Axis2 server.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

![Splitter]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/splitter.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Splitter EIP by comparing their core components.

| Splitter EIP (Figure 1) | Splitter Sample Scenario (Figure 2)      |
|-------------------------|------------------------------------------|
| New Order Request       | Stock Quote Request                      |
| Splitter                | Iterate Mediator                         |
| Order Item Request      | Endpoint (stock quote service instances) |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start a Sample Axis2 server instance. For instructions, refer to the section Setting up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.  

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="SplitMessageProxy" transports="http https" startOnLoad="true">
      <target>
         <inSequence>
            <log level="full"/>
            <iterate xmlns:m0="http://services.samples"
                     preservePayload="true"
                     attachPath="//m0:getQuote"
                     expression="//m0:getQuote/m0:request">
               <target>
                  <sequence>
                     <send>
                        <endpoint>
                           <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                        </endpoint>
                     </send>
                  </sequence>
               </target>
            </iterate>
         </inSequence>
         <outSequence>
            <drop/>
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
      <in/>
      <out/>
   </sequence>
</definitions>
```

## Set up the sample scenario

Send the following request to the ESB server using a SOAP client like [SoapUI](https://www.soapui.org/).

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

Note that the three requests will appear as sent in the Axis2 server log.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- iterate [line 6 in ESB config] - The Iterate mediator takes each child element of the element specified in its XPath expression and applies the sequence flow inside the iterator mediator. In this example, it takes each getQuote request specified in the incoming request to the ESB and forwards this request to the target endpoint. 
