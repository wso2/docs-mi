# Smart Proxy

This section explains, through a sample scenario, how the Smart Proxy EIP can be implemented using WSO2 ESB.

## Introduction to Smart Proxy

The Smart Proxy EIP tracks messages on a service that publishes reply messages to the Return Address specified by the requestor. It stores the Return Address supplied by the original requestor and replaces it with the address of the Smart Proxy. When the service sends the reply message, the EIP routes it to the original Return Address. 

!!! info 
    For more information, see the [Smart Proxy](http://www.eaipatterns.com/SmartProxy.html) documentation.

![Smart Proxy]({{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/smart-proxy.gif)

## Sample scenario

This sample scenario demonstrates a stock quote service, and a sample client sends a stock quote request to the ESB. The service that the client invokes is the SmartProxy, but through the ESB it manages to make calls to the back-end stock quote service. Smart Proxy simulates an address to the user. When the user sends a request, it will be diverted to another back-end server that will receive the response and send it back to the client. The ESB stores and manages information on what request the response should go to.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/smart-proxy.png" style="width: 70%;" alt="Smart proxy">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Smart Proxy EIP by comparing their core components.

| Smart Proxy EIP (Figure 1) | Smart Proxy Sample Scenario (Figure 2) |
|----------------------------|----------------------------------------|
| Requestor                  | Simple Stock Quote Client              |
| Smart Proxy                | Proxy Service                          |
| Service                    | Simple Stock Quote Service             |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Getting Started in the WSO2 ESB documentation.

2. Start a sample Axis2 server instance on port 9000. For instructions, see ESB Samples Setup - Starting Sample Back-End Services in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```xml
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="SmartProxy" transports="http https" startOnLoad="true">
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

Send a request using the Stock Quote client to WSO2 ESB as follows. For information about the Stock Quote client, refer to the section  Sample Clients  in the WSO2 ESB documentation.

```
ant stockquote -Dtrpurl=http://localhost:8280/services/SmartProxy -Dsymbol=foo
```

Note that the message is returned to the original requester.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above.

- **proxy** [line 2 in ESB config] - The proxy called SmartProxy passes incoming messages to the back-end service.

- **send** [line 5 in ESB config] - The Send mediator sends the message to the back-end service. The ESB automatically sets the Reply-To header of the incoming request to itself before messages are forwarded to the back-end service.

- **send** [line 12 in ESB config] - The Send mediator inside the outSequence of the proxy sends response messages back to the original requester. 
