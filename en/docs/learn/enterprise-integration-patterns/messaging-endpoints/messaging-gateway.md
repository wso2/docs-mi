# Messaging Gateway

This section explains, through an sample scenario, how the Messaging Gateway EIP can be implemented using WSO2 ESB. 

## Introduction to Messaging Gateway

The Messaging Gateway EIP encapsulates message-specific code from the rest of the application. It is a class that wraps messaging-specific method calls and exposes domain-specific methods to the application. Only the Messaging Gateway knows about the actual implementation of the messaging system. The rest of the application calls the methods of the Messaging Gateway, which are exposed to external applications. 

!!! info
    For more information, see the [Messaging Gateway](http://www.eaipatterns.com/MessagingGateway.html) documentation.

![Messaging gateway solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/messaging-gateway-solution.gif)

## Sample scenario

This sample scenario demonstrates creating a proxy service with a publishWSDL element. The published WSDL's methods act as the Message Gateway, hiding details of the actual back-end service, and exposing only domain-specific methods to the client application.

Proxy services in WSO2 ESB act as Messaging Gateways, abstracting the details of the actual back-end services from implementing clients. For a more complex example of how WSO2 ESB can act as a Messaging Gateway, refer to Health Care Scenario, where a single Proxy Service acts as a Messaging Gateway between several back-end services.

The diagram below depicts how to simulate the sample scenario using WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/messaging-gateway.png" style="width: 70%;" alt="Messaging gateway">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Messaging Gateway EIP by comparing their core components.

| Messaging Gateway EIP (Figure 1) | Messaging Gateway Example Scenario (Figure 2) |
|----------------------------------|-----------------------------------------------|
| Application                      | Simple Stock Quote Client / Service           |
| Messaging Gateway                | Proxy Service                                 |

## Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start the sample Axis2 server. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

3. Copy the `sample_proxy_3.wsdl` file into your `<ESB_HOME>/repository/samples/resources/proxy` directory. 

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```xml
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="StockQuoteProxy" startOnLoad="true">
      <target>
         <endpoint>
            <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
         </endpoint>
         <outSequence>
            <send/>
         </outSequence>
      </target>
      <publishWSDL uri="file:repository/samples/resources/proxy/sample_proxy_3.wsdl"/>
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

If you navigate to `http://localhost:9000/services/SimpleStockQuoteService`, you can see the WSDL file of the back-end server. There are five methods exposed externally, but the Proxy Service `SimpleQuoteProxy` exposes only four externally, filtering out the `getFullQuote` method. See the `SimpleQuoteProxy` WSDL file in `http://localhost:8280/services/StockQuoteProxy?wsdl`.

Send the following request using a SOAP client like [SoapUI](https://www.soapui.org/) to the `SimpleQuoteProxy` service.

```
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://services.samples"
xmlns:xsd="http://services.samples/xsd">
   <soap:Header/>
   <soap:Body>
      <ser:getFullQuote>
         <!--Optional:-->
         <ser:request>
            <!--Optional:-->
            <xsd:symbol>WSO2</xsd:symbol>
         </ser:request>
      </ser:getFullQuote>
   </soap:Body>
</soap:Envelope>
```

After sending the above message to the server, you'll get a server error as The endpoint reference (EPR) for the Operation not found is /services/StockQuoteProxy and the WSA Action = urn:getFullQuote. The reason for this error is that the getFullQuote method is not exposed to SimpleQuoteProxy, although the back-end server supports it.

Now, specify a different published WSDL file as follows and send the same SOAP message to the server again.

```
...
<publishWSDL uri="file:repository/samples/resources/proxy/sample_proxy_1.wsdl"/>
...
```

Note that you get the correct response from the server, since the new WSDL of the proxy service is the same as the back-end service.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- **proxy** [line 2 in ESB config] - Defines a new proxy service called `StockQuoteProxy`.
- **endpoint** [line 4 in ESB config] - Defines the endpoint of the actual back-end service that this proxy service is connected to.
- **publishWSDL** [line 11 in ESB config] - Defines the WSDL file to expose for this proxy service. If no `publishWSDL` is given, the actual back-end service's WSDL is exposed. 
