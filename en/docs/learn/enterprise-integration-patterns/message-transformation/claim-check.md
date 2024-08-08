# Claim Check

This section explains, through an example scenario, how the Claim Check EIP can be implemented using WSO2 ESB.

## Introduction to Claim Check

The Claim Check EIP reduces the data volume of messages sent across a system without sacrificing information content. It stores the entire message at the initial stage of a sequence of processing steps, and it extracts only the parts required by the following steps. Once processing is completed, it retrieves the stored message and performs any operations. This pattern ensures better performance, since large chunks of unwanted data are reduced to lightweight bits before being processed. 

!!! info
    For more information, see the [Claim Check](http://www.eaipatterns.com/StoreInLibrary.html) documentation.

![Claim Check]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/store-in-library.gif)

## Sample scenario

The following scenario illustrates an instance where a stock quote requires an authentication in order for it to allow access to the back-end service on the Axis2 server. For authentication, it is not necessary for the whole message to flow through the mediation. Instead, initially the whole request will be stored in a property using the Enrich mediator, and the request will then be filtered to contain only the user name. The filtered message will be taken through the authentication step by the Filter mediator. If the authentication succeeds, the original content will be retrieved from the property by the Enrich mediator, and the whole message will be forwarded to the Axis2 server.

The diagram below depicts how to simulate the example scenario using WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/claim-check.png" style="width: 70%;" alt="Claim Check">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Claim Check EIP by comparing their core components.

| Claim Check EIP (Figure 1)   | Claim Check Sample Scenario (Figure 2)                                                                                          |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Message w/Data from Client   | Simple Stock Quote Request with Credential and other data.                                                                      |
| Check Luggage                | Enrich Mediator is used to store the original message as a new property inside a Message Context.                               |
| Data Store                   | Message Context                                                                                                                 |
| Message w/Claim Check        | Simple Stock Quote Request w/Credential information only.                                                                       |
| Data Enricher                | Enrich Mediator is used to replace the SOAP Payload body with the original message stored as a property in the Message Context. |
| Message w/Data from WSO2 ESB | Simple Stock Quote Request with Credential and other data.                                                                      |

!!! note
    An alternative implementation of this EIP is to use an actual data store instead of appending and replacing the SOAP payload.

### Environment setup

1. Download and install the WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start the sample Axis2 server. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (https://localhost:9443/carbon). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the example scenario, to the source view.

```
<!-- Claim Check -->
<definitions xmlns="http://ws.apache.org/ns/synapse">
      <proxy name="ClaimCheckProxy">
        <target>
        <inSequence>
                <!-- First The Whole Message Will Be Stored -->
                <enrich>
                    <source type="body"/>
                    <target type="property" property="CLAIM_STORE"/>
                </enrich>
                 <log level="custom" xmlns="http://ws.apache.org/ns/synapse">
                      <property name="text" expression="get-property('CLAIM_STORE')"/>
                 </log>
                <!-- Will Filter The Content Through Restructuring The Required Information -->   
                <payloadFactory>
                <format>
                    <m:RequiredInformation xmlns:m="http://services.samples">$1</m:RequiredInformation>
                </format>
                <args>
                    <arg xmlns:m0="http://services.samples" expression="//m0:credentials/m0:name"/>
                </args>
                </payloadFactory>
                <!-- Will Filter The Content Using The Re Structured Message -->
                <!-- Processing Steps -->
                <filter xmlns:m1="http://services.samples" source="//m1:RequiredInformation" regex="UserName">
                <then>
                    <property name="Validity" value="1" />                   
                </then>
                <else>
                    <property name="Validity" value="0" />
                    <drop />
                </else>
                </filter>
                <!-- Based On The Validity Will Route The Original Message To The End Point -->
                <filter source="get-property('Validity')" regex="1">
                <then>
                    <!-- Retrive The Original Message Back -->
                    <enrich>
                        <source type="property" property="CLAIM_STORE" />
                        <target action="replace" type="body" />
                    </enrich>
                    <log level="full" />   
                     <send>
                        <endpoint>
                            <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                        </endpoint>
                     </send>             
                </then>
                <else>
                </else>
                </filter>                                        
        </inSequence>
            <outSequence>
            <send />
        </outSequence>   
      </target>
    <publishWSDL uri="file:repository/samples/resources/proxy/sample_proxy_1.wsdl"/>
   </proxy> 
</definitions>
```

## Set up the sample scenario

Send the following request using a SOAP client like [SoapUI](https://www.soapui.org/).

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header>
     <ser:credentials>
          <ser:name>UserName</ser:name>
          <ser:id>001</ser:id>
      </ser:credentials>
     </soapenv:Header>
   <soapenv:Body>
        <ser:getQuote>       
         <ser:request>
             <ser:symbol>foo</ser:symbol>
         </ser:request>     
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

The message is optimized as shown below to go through the authentication process inside the ESB. Once the authentication is done, the original message will be attached back to the payload, and sent to the back-end service. 

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header />
    <soapenv:Body>
    <m:RequiredInformation xmlns:m="http://services.samples">UserName</m:RequiredInformation>
    </soapenv:Body>
</soapenv:Envelope>
```

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- enrich [line 7 in ESB config] - Enrich mediator is used to append the original message body as a new property CLAIM_STORE inside the message context.  
- payloadFactory [line 15 in ESB config] - The original message is simplified to contain credential information only.
- filter [line 25 in ESB config] - A filter is used to check if the credential information exists inside the new message body. The property Validity is set based on this.
- enrich [line 38 in ESB config] - Once the validity is set, another mediator uses the validity setting to retrieve the original message stored in the CLAIM_STORE context and replaces the body of the SOAP payload with it. 
