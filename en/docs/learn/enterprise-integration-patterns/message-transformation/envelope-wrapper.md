# Envelope Wrapper

This section explains, through an example scenario, how the Envelope Wrapper EIP can be implemented using WSO2 ESB.

## Introduction to Envelope Wrapper

The Envelope Wrapper EIP allows existing systems to participate in a messaging exchange that places specific requirements on the message format, such as message header fields or encryption. It wraps application data inside an envelope that is compliant with the messaging infrastructure. The message is unwrapped when it arrives at the destination. 

!!! info
    For more information, see the [Envelope Wrapper](http://www.eaipatterns.com/EnvelopeWrapper.html) documentation.

![Envelope Wrapper]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/wrapper.gif)

## Sample scenario

This example scenario receives a message with application data wrapped inside an envelope, unwraps the message, and sends it to a specific endpoint. The sender sends the request inside a SOAP envelope. Once the ESB receives the envelope, it unwraps it and sends it as a Plain Old XML (POX) request to the sample back-end Axis2 server.

The diagram below depicts how to simulate the example scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/envelope-wrapper-sample-scenario.png" style="width: 70%;" alt="Envelope wrapper sample scenario">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Envelope Wrapper EIP by comparing their core components.

| Envelope Wrapper EIP (Figure 1) | Envelope Wrapper Sample Scenario (Figure 2)  |
|---------------------------------|----------------------------------------------|
| Wrapper                         | Stock Quote Request wrapped in SOAP          |
| Messaging                       | System	WSO2 ESB                              |
| Unwrapper                       | Address Endpoint format                      |
| Recipient                       | Stock Quote Service Instance                 |

!!! note
    An alternative implementation of this EIP is to have the Address Endpoint wrap from one envelope format to another (for example, wrapping a SOAP 1.1 envelope in a SOAP 1.2 envelope).

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start the sample Axis2 server. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the example scenario, to the source view. 

```
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="EnvelopeUnwrapProxy"
          transports="https http"
          startOnLoad="true">
      <target>
         <endpoint>
            <address uri="http://localhost:9000/services/SimpleStockQuoteService"
                     format="pox"/>
         </endpoint>
         <outSequence>
            <send/>
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
      <send/>
   </sequence>
</definitions>
```

## Set up the sample scenario

1. Send the following request using a SOAP client like [SoapUI](https://www.soapui.org/), and monitor the message using TCPMon.

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

2. Notice that the request data is inside a SOAP envelope. When the request was monitored through TCPMon before it was sent to the ESB, it was structured as follows:

    ```
    POST /services/EnvelopeUnwrapProxy HTTP/1.1
    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    SOAPAction: "urn:getQuote"
    Content-Length: 385
    Host: 127.0.0.1:8281
    Connection: Keep-Alive
    User-Agent: Apache-HttpClient/4.1.1 (java 1.5)
      
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

    The request sent to the back-end Axis2 server has the following structure:

    ```
    POST /services/SimpleStockQuoteService HTTP/1.1
    Content-Type: application/xml; charset=UTF-8
    Accept-Encoding: gzip,deflate
    SOAPAction: urn:getQuote
    Transfer-Encoding: chunked
    Host: localhost:9000
    Connection: Keep-Alive
    User-Agent: Synapse-HttpComponents-NIO
      
    e0
    <ser:getQuote xmlns:ser="http://services.samples">    
             <ser:request>          
                <xsd:symbol xmlns:xsd="http://services.samples/xsd">foo</xsd:symbol>
             </ser:request>       
          </ser:getQuote>
    0
    ```

    This means that the SOAP envelope was removed by the ESB.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- **address** [line 8 in ESB config] - The endpoint address contains the attribute format='pox', which makes the ESB convert incoming requests to Plain Old XML. Other supported formats for wrapping include soap11, soap12 and get. For more information, refer to the Address Endpoint mediator.
