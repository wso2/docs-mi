# Claim Check

This page explains how you can implement a sample scenario of Claim Check using WSO2 Micro Integrator.

## Introduction to Claim Check

The Claim Check EIP reduces the data volume of messages sent across a system without sacrificing information content. It stores the entire message at the initial stage of a sequence of processing steps, and it extracts only the parts required by the following steps. Once processing is completed, it retrieves the stored message and performs any operations. This pattern ensures better performance since large chunks of unwanted data are reduced to lightweight bits before being processed. 

!!! info
    For more information, see the [Claim Check](http://www.eaipatterns.com/StoreInLibrary.html) documentation.

![Claim Check]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/store-in-library.gif)

## Sample scenario

The following scenario illustrates an instance where a stock quote requires authentication in order for it to allow access to the back-end service on the Axis2 server. For authentication, it is not necessary for the whole message to flow through the mediation. Instead, initially, the whole request will be stored in a property using the Enrich mediator, and the request will then be filtered to contain only the user name. The filtered message will be taken through the authentication step by the Filter mediator. If the authentication succeeds, the original content will be retrieved from the property by the Enrich mediator, and the whole message will be forwarded to the Axis2 server.

The diagram below depicts how to simulate the example scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/claim-check.png" style="width: 70%;" alt="Claim Check">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Claim Check EIP by comparing their core components.

| Claim Check EIP              | Claim Check Sample Scenario                                                                                           |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Message w/Data from Client   | Simple Stock Quote Request with Credential and other data.                                                                      |
| Check Luggage                | Enrich Mediator is used to store the original message as a new property inside a Message Context.                               |
| Data Store                   | Message Context                                                                                                                 |
| Message w/Claim Check        | Simple Stock Quote Request w/Credential information only.                                                                       |
| Data Enricher                | Enrich Mediator is used to replace the SOAP Payload body with the original message stored as a property in the Message Context. |
| Message w/Data from WSO2 MI  | Simple Stock Quote Request with Credential and other data.                                                                      |

!!! note
    An alternative implementation of this EIP is to use an actual data store instead of appending and replacing the SOAP payload.

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="ClaimCheckProxy" startOnLoad="true" transports="http https"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <enrich description="">
                    <source clone="true" type="body" />
                    <target action="replace" type="property" property="CLAIM_STORE" />
                </enrich>
                <log level="custom" xmlns="http://ws.apache.org/ns/synapse">
                    <property name="text" expression="get-property('CLAIM_STORE')" />
                </log>
                <payloadFactory media-type="xml" template-type="default">
                    <format><m:RequiredInformation xmlns:m="http://services.samples">
                        $1</m:RequiredInformation></format>
                    <args>
                        <arg expression="//m0:credentials/m0:name" evaluator="xml"
                            xmlns:m0="http://services.samples" />
                    </args>
                </payloadFactory>
                <filter regex="UserName" source="//m1:RequiredInformation"
                    xmlns:m1="http://services.samples">
                    <then>
                        <property name="Validity" scope="default" type="STRING" value="1" />
                    </then>
                    <else>
                        <property name="Validity" scope="default" type="STRING" value="0" />
                        <drop />
                    </else>
                </filter>
                <filter regex="1" source="get-property('Validity')">
                    <then>
                        <enrich description="">
                            <source clone="true" property="CLAIM_STORE" type="property" />
                            <target action="replace" type="body" />
                        </enrich>
                        <log category="INFO" level="full" />
                        <call>
                            <endpoint key="SimpleStockQuoteService" />
                        </call>
                    </then>
                    <else>
                    </else>
                </filter>
                <respond />
            </inSequence>
            <faultSequence />
        </target>
    </proxy>
    ```
=== "SimpleStockQuoteService"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

Let's investigate the elements of the synapse configuration in detail.

- Enrich mediator append the original message body as a new property `CLAIM_STORE` inside the message context.
- The PayloadFactory is used to simplify the original message to contain credential information only.
- A filter mediator is used to check if the credential information exists inside the new message body. The property `Validity` is set based on this.
- Once the validity is set, another enrich mediator is used to retrieve the original message stored in the `CLAIM_STORE` context and replace the body of the SOAP payload with it.

The message is optimized as shown below to go through the authentication process inside the WSO2 MI. Once the authentication is done, the original message will be attached back to the payload and sent to the back-end service. 

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header />
    <soapenv:Body>
    <m:RequiredInformation xmlns:m="http://services.samples">UserName</m:RequiredInformation>
    </soapenv:Body>
</soapenv:Envelope>
```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Set up the back-end service:

    1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
    2. Extract the downloaded zip file.
    3. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.
    4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"
        ```bash
        sh axis2server.sh
        ```
    === "On Windows"
        ```bash
        axis2server.bat
        ```

4. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/ClaimCheck.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

5. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

6. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send a request like the following to the client.

```bash
POST /services/ClaimCheckProxy HTTP/1.1
Host: localhost:8290
SOAPAction: urn:getQuote
Content-Type: text/xml

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

## Analyze the output

The Micro Integrator returns the following response to the client.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>4.4154126835769745</ax21:change>
                <ax21:earnings>13.75987123836357</ax21:earnings>
                <ax21:high>-76.6936810459641</ax21:high>
                <ax21:last>77.99113006964049</ax21:last>
                <ax21:lastTradeTimestamp>Tue Aug 13 10:53:23 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>79.9581944141776</ax21:low>
                <ax21:marketCap>5183772.493789349</ax21:marketCap>
                <ax21:name>foo Company</ax21:name>
                <ax21:open>-76.05071575411084</ax21:open>
                <ax21:peRatio>23.328237153959172</ax21:peRatio>
                <ax21:percentageChange>-5.690664466425336</ax21:percentageChange>
                <ax21:prevClose>-77.59045906901927</ax21:prevClose>
                <ax21:symbol>foo</ax21:symbol>
                <ax21:volume>8673</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
