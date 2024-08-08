# Messaging Bridge

This section explains, through an example scenario, how the Message Bridge EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Messaging Bridge

The Messaging Bridge EIP facilitates the connection between messaging systems and replicates messages between them by transforming message formats from one system to the other. For more information, refer to http://www.eaipatterns.com/MessagingBridge.html.

![Messaging bridge]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/messaging-bridge.gif)

## Sample scenario

An enterprise might use more than one messaging system in communication. This example illustrates the ESB profile as a message bridge, which accepts a REST message from the client, transforms the REST message to SOAP format, and sends the SOAP message to the back-end Axis2 server. To transform the sent REST request to a SOAP message, we use the API functionality of the ESB profile. It restructures the message to a REST format using the Payload Factory mediator.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Messaging bridge]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/messaging-bridge.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Messaging Bridge EIP by comparing their core components.

| Messaging Bridge EIP (Figure 1) | Messaging Bridge Example Scenario (Figure 2)                                                        |
|---------------------------------|-----------------------------------------------------------------------------------------------------|
| Messaging System1               | Stock Quote client                                                                                  |
| Messaging Bridge                | PayloadFactory Mediator (You can add any transformation mediator here. Also see Message Translator) |
| Messaging System2               | Stock Quote service                                                                                 |

## ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this. 

```
<!-- Message Translator-->
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <api name="MessageTranslate" context="/stockquote">
      <resource methods="GET" uri-template="/view/{symbol}">
         <inSequence>
            <payloadFactory>
               <format>
                  <m0:getQuote xmlns:m0="http://services.samples">
                <m0:request>
                    <m0:symbol>$1</m0:symbol>
                </m0:request>
             </m0:getQuote>
               </format>
               <args>
                  <arg expression="get-property('uri.var.symbol')"/>
               </args>
            </payloadFactory>
            <property name="SOAPAction" value="getQuote" scope="transport"></property>
            <send>
               <endpoint>
                  <address uri="http://localhost:9000/services/SimpleStockQuoteService" format="soap11"/>
               </endpoint>
            </send>
         </inSequence>
         <outSequence>
            <send/>
         </outSequence>
      </resource>
   </api>     
</definitions>
```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- Payload Factory - Builds the necessary SOAP request for the back-end service. It uses the value of the HTTP GET variable (from the REST request made to the ESB profile).  
- args - A list of arguments that will be concatenated in the same order inside the format tags (in a printf style).  

## Set up the sample scenario

Now, let's try out the sample explained above.

### Set up the environment

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.
2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.
3. Deploy the back-end service SimpleStockQuoteService. For instructions on deploying sample back-end services, go to Deploying sample back-end services in WSO2 EI Documentation.

## Execute the sample

1. Pass the following request to the ESB profile using the cURL client.

    ```
    curl -v http://127.0.0.1:8280/stockquote/view/IBM
    ```

2. You can use TCPMon to see the type of the message and its message format:

    ```
    GET /stockquote/view/IBM HTTP/1.1
    User-Agent: curl/7.22.0 (x86_64-pc-linux-gnu) libcurl/7.22.0 OpenSSL/1.0.1 zlib/1.2.3.4 libidn/1.23 librtmp/2.3
    Host: 127.0.0.1:8281
    Accept: */*
    ```

3. After sending the request, notice that the Axis2 server has logged the message and accepted the request.
