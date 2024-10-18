# Selective Consumer

This page explains how you can implement a sample scenario of Selective Consumer EIP using WSO2 Micro Integrator.

## Introduction to Selective Consumer

The Selective Consumer EIP allows a message consumer to select which messages it will receive. It filters the messages delivered by its channel so that it only receives the ones that match its criteria. 

!!! info
      For more information, see the [Selective Consumer](http://www.eaipatterns.com/MessageSelector.html) documentation.

![Message selector solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/message-selector-solution.gif)

## Sample scenario

This sample scenario demonstrates how a specific receiver only processes messages that are pre-filtered based on certain criteria. We have an Axis2 server as the consumer. The consumer criteria are specified through an XML schema validation, which is stored as a local entry in the registry. We use the Validate mediator to check whether the messages that are sent to the service match the criteria of the schema. The Axis2 server can consume the message only if the message meets the validation criteria.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/selective-consumer.png" style="width: 70%;" alt="Selective consumer">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Selective Consumer EIP by comparing their core components.

| Selective Consumer EIP            | Selective Consumer Sample Scenario            |
|-----------------------------------|-----------------------------------------------|
| Specifying Producer               | Simple Stock Quote Client                     |
| Messages with Selection Values    | Simple Stock Quote Request                    |
| Selective Consumer                | Schema Validator (Validate Mediator)          |
| Receiver                          | Simple Stock Quote Server                     |

## Synapse configuration of the artifacts

=== "Proxy Service"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="StockQuoteProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
         <target>
            <inSequence>
                  <validate cache-schema="true">
                  <schema key="selective_criteria"/>
                     <on-fail>
                     <makefault description="" version="soap11">
                        <code value="soap11Env:VersionMismatch" xmlns:soap11Env="http://schemas.xmlsoap.org/soap/envelope/"/>
                        <reason value="Invalid custom quote request"/>
                     </makefault>
                     <property name="RESPONSE" value="true"/>
                     <header name="To" expression="get-property('ReplyTo')"/>
                     <respond/>
                  </on-fail>
               </validate>
               <call>
                  <endpoint key="StockQuoteServiceEP"/>
               </call>
               <respond/>
            </inSequence>
            <faultSequence>
                  <log level="full">
                     <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
                     <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
                     <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
               </log>
                  <drop/>
            </faultSequence>
         </target>
      </proxy>
      ```
=== "Local Entry"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <localEntry key="selective_criteria" xmlns="http://ws.apache.org/ns/synapse">
         <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.apache-synapse.org/test" elementFormDefault="qualified" attributeFormDefault="unqualified" targetNamespace="http://services.samples">
            <xs:element name="getQuote">
                  <xs:complexType>
                     <xs:sequence>
                        <xs:element name="request">
                              <xs:complexType>
                                 <xs:sequence>
                                    <xs:element name="symbol" type="xs:string"></xs:element>
                                 </xs:sequence>
                              </xs:complexType>
                        </xs:element>
                     </xs:sequence>
                  </xs:complexType>
            </xs:element>
         </xs:schema>
      </localEntry>
      ```
=== "Endpoint"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <endpoint name="StockQuoteServiceEP" xmlns="http://ws.apache.org/ns/synapse">
         <address uri="http://localhost:9000/services/SimpleStockQuoteService">
         </address>
      </endpoint>
      ```

### How the implementation works

Let's break down the key components of the configuration:

- **Local Entry**: A local registry entry (`selective_criteria`) defines the XML schema used for validating incoming messages.
- **Validate Mediator**: This mediator validates incoming messages against the specified schema. If validation fails, the `on-fail` sequence is executed.
- **On-Fail Sequence**: If validation fails, this sequence creates a SOAP fault response, sets the `To` header using the `ReplyTo` property, and sends the response back to the client.
- **Fault Sequence**: Handles any errors during message processing by logging detailed fault information and then dropping the message.

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the [backend service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).

4. Extract the downloaded zip file.

5. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.

6. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ``` 

7. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/selective-consumer.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

## Execute the sample

Send the following requests to the service using SoapUI (or any other SOAP client):

```xml
   POST http://localhost:8290/services/StockQuoteProxy

   Accept-Encoding: gzip,deflate
   Content-Type: text/xml;charset=UTF-8
   SOAPAction: "urn:getQuote"
   Connection: Keep-Alive
      
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
      <soapenv:Header/>
      <soapenv:Body>
         <ser:getQuote>
            <ser:request>
               <ser:stockvalue></ser:stockvalue>
            </ser:request>
         </ser:getQuote>
      </soapenv:Body>
   </soapenv:Envelope>
```

## Analyze the output

Note that the stock quote request is not processed. Send the following message to the service.

```xml
   POST http://localhost:8290/services/StockQuoteProxy

   Accept-Encoding: gzip,deflate
   Content-Type: text/xml;charset=UTF-8
   SOAPAction: "urn:getQuote"
   Connection: Keep-Alive


   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
      <soapenv:Header/>
      <soapenv:Body>
         <ser:getQuote>
            <ser:request>
               <ser:symbol>IBM</ser:symbol>
            </ser:request>
         </ser:getQuote>
      </soapenv:Body>
   </soapenv:Envelope>
```

The consumer has specified the criteria for using schema validation. Only the messages that meet these criteria will be consumed.
