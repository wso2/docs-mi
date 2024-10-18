# Normalizer

This page explains how you can implement a sample scenario of Normalizer using WSO2 Micro Integrator.

## Introduction to Normalizer

The Normalizer EIP processes messages that are semantically equivalent but arrive in different formats. It routes each message type through a custom Message Translator so that the resulting messages match a common format. 

!!! info
    For more information, see the [Normalizer](http://www.eaipatterns.com/Normalizer.html) documentation.

![Normalizer]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/normalizer-detail.gif)

## Sample scenario

This example scenario demonstrates how WSO2 MI handles messages it receives in different formats using Message Builders and Message Formatters. The client application and back-end service do not have to be concerned about message formats, because the MI processes them and sends the responses back in the same format.

The diagram below depicts how to simulate the example scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/normalizer.png" style="width: 70%;" alt="Normalizer">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Normalizer EIP by comparing their core components.

| Normalizer EIP  | Normalizer Sample Scenario                                                                                  |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| Different Message Formats | SOAP, POX, or JSON Stock Quote Request                                                                                 |
| Router                    | Filter Mediator routes messages based on an existing XPath expression, which identifies format of the message. |
| Translators               | XSLT Mediator                                                                                                          |
| Common Format Message     | SOAP Request from WSO2 MI                                                                                             |

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="NormalizerProxy" startOnLoad="true" transports="http https"
       xmlns="http://ws.apache.org/ns/synapse">
       <target>
          <inSequence>
             <log level="full" />
             <filter xmlns:m0="http://services.samples" xpath="//m0:getQuote/m0:request/m0:symbol">
                <then>
                   <sequence key="sendSeq" />
                </then>
                <else>
                   <sequence key="jsonInTransformSeq" />
                </else>
             </filter>
             <filter regex="JSONtoSOAP" source="get-property('TRANSFORMATION')">
                <then>
                   <property name="messageType" value="application/json" scope="axis2"
                      type="STRING" />
                </then>
                <else>
                </else>
             </filter>
             <log category="INFO" level="full" />
             <respond />
          </inSequence>
          <faultSequence />
       </target>
    </proxy>
    ```
=== "jsonInTransformSeq"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="jsonInTransformSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <xslt key="in_transform">
       </xslt>
       <property name="messageType" scope="axis2" type="STRING" value="application/xml" />
       <property name="TRANSFORMATION" scope="default" type="STRING" value="JSONtoSOAP" />
       <enrich>
          <source clone="true" type="custom" xpath="//m0:getQuote" xmlns:m0="http://services.samples"
             xmlns:ns="http://org.apache.synapse/xsd" />
          <target action="replace" type="body" />
       </enrich>
       <header name="Action" scope="default" value="urn:getQuote" />
       <sequence key="sendSeq" />
    </sequence>
    ```
=== "sendSeq"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="sendSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <call>
          <endpoint key="SimpleStockQuoteService" />
       </call>
    </sequence>
    ```
=== "SimpleStockQuoteService"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
=== "XSLT Local Entry"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="in_transform" xmlns="http://ws.apache.org/ns/synapse">
       <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:m0="http://services.samples" version="2.0" exclude-result-prefixes="m0 fn">
          <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"></xsl:output>
          <xsl:template match="*">
                <xsl:element name="{local-name()}" namespace="http://services.samples">
                   <xsl:copy-of select="attribute::*"></xsl:copy-of>
                   <xsl:apply-templates></xsl:apply-templates>
                </xsl:element>
          </xsl:template>
       </xsl:stylesheet>
    </localEntry>
    ```

The configuration above first filters out the JSON messages to do the necessary transformation, since the back-end service understands only SOAP messages. JSON messages are also filtered in the outSequence. Most of these transformations are done at the code level.

Let's investigate the elements of the synapse configuration in detail.

- The Filter mediator looks for a particular XPath expression inside the request message. If the expression evaluates successfully, it is assumed to be a SOAP or POX message, and the mediation continues through the sequence `sendSeq`. If the expression does not evaluate, it is assumed to be a JSON message, and the mediation continues via the `jsonInTransformSeq` sequence.
- The local entry holds an XSL transformation that converts JSON requests to XML.
- The XSLT mediator applies the defined XSLT to the payload.
- The address element of the endpoint defines the back-end service and the message format that back-end service prefers. This format is used to normalize a message further, but only when there can be a 1-to-1 mapping between two different formats, for example, between SOAP 1.1 and SOAP 1.2. 

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/Normalizer.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

5. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

6. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

You can test this configuration for JSON, SOAP, and POX messages using the following curl commands.

- SOAP

    ```
    POST /services/NormalizerProxy HTTP/1.1
    Host: localhost:8290
    SOAPAction: urn:getQuote
    Content-Type: text/xml

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <getQuote xmlns="http://services.samples">
              <request>
                  <symbol>WSO2</symbol>
              </request>
          </getQuote>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

- JSON

    ```
    POST /services/NormalizerProxy HTTP/1.1
    Host: localhost:8290
    Content-Type: application/json

    {
       "getQuote": {
          "request": {
               "symbol": "WSO2"
          }
       }
    }
    ```

- POX
    ```bash
    POST /services/NormalizerProxy HTTP/1.1
    Host: localhost:8290
    SOAPAction: urn:getQuote
    Content-Type: application/xml

    <getQuote xmlns="http://services.samples">
       <request>
          <symbol>WSO2</symbol>
       </request>
    </getQuote>
    ```

## Analyze the output

For the different types of payloads, Micro Integrator will return the following responses to the client.

- XML
   ```xml
   <?xml version='1.0' encoding='UTF-8'?>
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header/>
      <soapenv:Body>
         <ns:getQuoteResponse xmlns:ns="http://services.samples">
               <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                  <ax21:change>4.179543936607943</ax21:change>
                  <ax21:earnings>-9.822593276541957</ax21:earnings>
                  <ax21:high>172.93040367202286</ax21:high>
                  <ax21:last>168.28780404830076</ax21:last>
                  <ax21:lastTradeTimestamp>Thu Aug 15 11:46:59 IST 2024</ax21:lastTradeTimestamp>
                  <ax21:low>-166.47153758900456</ax21:low>
                  <ax21:marketCap>-2144374.6265382282</ax21:marketCap>
                  <ax21:name>WSO2 Company</ax21:name>
                  <ax21:open>-168.1118057178796</ax21:open>
                  <ax21:peRatio>23.969572952344045</ax21:peRatio>
                  <ax21:percentageChange>-2.5856017238934745</ax21:percentageChange>
                  <ax21:prevClose>-161.64685759546384</ax21:prevClose>
                  <ax21:symbol>WSO2</ax21:symbol>
                  <ax21:volume>16983</ax21:volume>
               </ns:return>
         </ns:getQuoteResponse>
      </soapenv:Body>
   </soapenv:Envelope>
   ```

- POX
   ```xml
   <ns:getQuoteResponse xmlns:ns="http://services.samples">
      <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
         <ax21:change>-2.4016917807235343</ax21:change>
         <ax21:earnings>13.990004257605522</ax21:earnings>
         <ax21:high>-144.91296076649868</ax21:high>
         <ax21:last>146.99865817496837</ax21:last>
         <ax21:lastTradeTimestamp>Thu Aug 15 11:42:33 IST 2024</ax21:lastTradeTimestamp>
         <ax21:low>-145.03194704475234</ax21:low>
         <ax21:marketCap>3129835.307607008</ax21:marketCap>
         <ax21:name>WSO2 Company</ax21:name>
         <ax21:open>152.64477584761724</ax21:open>
         <ax21:peRatio>23.481626032992185</ax21:peRatio>
         <ax21:percentageChange>1.7048291646561002</ax21:percentageChange>
         <ax21:prevClose>-140.87580330713112</ax21:prevClose>
         <ax21:symbol>WSO2</ax21:symbol>
         <ax21:volume>7252</ax21:volume>
      </ns:return>
   </ns:getQuoteResponse>
   ```

- JSON

    ```json
    {
       "getQuoteResponse": {
          "return": {
                "@type": "ax21:GetQuoteResponse",
                "change": 4.126973941971716,
                "earnings": -8.036469395101125,
                "high": -177.30560059230046,
                "last": 181.81369838796877,
                "lastTradeTimestamp": "Thu Aug 15 11:48:50 IST 2024",
                "low": 187.49779650687898,
                "marketCap": -8693560.766391275,
                "name": "WSO2 Company",
                "open": -178.1923043598257,
                "peRatio": 25.19866572930432,
                "percentageChange": 2.000174892191473,
                "prevClose": 206.3306542884375,
                "symbol": "WSO2",
                "volume": 17885
          }
       }
    }
    ```
