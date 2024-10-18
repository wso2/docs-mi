# Content Enricher

This page explains how you can implement a sample scenario of the Content Enricher EIP using the WSO2 Micro Integrator.

## Introduction to Content Enricher

The Content Enricher EIP facilitates communication with another system if the message originator does not have all the required data items available. It accesses an external data source to augment a message with missing information. 

!!! info
    For more information, see the [Content Enricher](http://www.eaipatterns.com/DataEnricher.html) documentation.

![Data enricher]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/data-enricher.gif)

## Sample scenario

This example scenario depicts a stock quote service. The client sends a stock quote request to the WSO2 MI with only an identity number. But to provide a stock quote, the sample Axis2 server at the backend needs to map the identity number with a corresponding name, which is in an external source. The values are stored as local entries. When the request arrives, the identity will be analyzed using the Switch mediator. Sequentially, the identity number will be replaced with the local entry using the Enrich mediator.

The diagram below depicts how to simulate the example scenario using the WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/content-enricher.png" style="width: 70%;" alt="Content enricher">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Content Enricher EIP by comparing their core components.

| Content Enricher EIP            | Content Enricher Sample Scenario                             |
|---------------------------------|--------------------------------------------------------------|
| Basic Message                   | Stock Quote Request from Stock Quote Client                  |
| Enricher                        | Enrich Mediator                                              |
| Resource	                      | Local Registry                                               |
| Enriched Message                | Enriched Stock Quote Request from the WSO2 MI                |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="ContentEnrichProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <switch source="//m1:symbol" xmlns:m1="http://services.samples/xsd">
                    <case regex="1">
                        <enrich description="">
                            <source clone="true" key="Location1" type="inline"/>
                            <target action="replace" xpath="//m1:symbol/text()" xmlns:m1="http://services.samples/xsd"/>
                        </enrich>
                    </case>
                    <case regex="2">
                        <enrich description="">
                            <source clone="true" key="Location2" type="inline"/>
                            <target action="replace" xpath="//m1:symbol/text()" xmlns:m1="http://services.samples/xsd"/>
                        </enrich>
                    </case>
                    <default></default>
                </switch>
                <call>
                    <endpoint key="SimpleStockEp"/>
                </call>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Local Entry 1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="Location1" xmlns="http://ws.apache.org/ns/synapse">
        <![CDATA[IBM]]>
    </localEntry>
    ```
=== "Local Entry 2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="Location2" xmlns="http://ws.apache.org/ns/synapse">
        <![CDATA[WSO2]]>
    </localEntry>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
            <suspendOnFailure>
                <initialDuration>-1</initialDuration>
                <progressionFactor>1</progressionFactor>
            </suspendOnFailure>
            <markForSuspension>
                <retriesBeforeSuspension>0</retriesBeforeSuspension>
            </markForSuspension>
        </address>
    </endpoint>
    ```

Let's investigate the elements of the configuration in detail. 
- enrich - The enrich mediator is used for message enrichment. In this configuration, it retrieves content from a local registry entry (via `source`) and replaces certain elements in the message (via `target`).
- source - The `source` element in the enrich mediator defines where the content for enrichment originates. The location in which you can find the source configuration. In this example, it is a simple inline text string located in the local registry entry.
- target - The `target` element in the enrich mediator specifies where the source configuration should be applied. This is specified using an XPath expression.
- localEntry - The `localEntry` element represents entries in the local registry. In this example, Location1 contains `IBM`, and Location2 contains `WSO2`.

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/ContentEnricher.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the above proxy service.

```
POST /services/ContentEnrichProxy HTTP/1.1
Host: localhost:8290
Content-Type: text/xml
soapAction: urn:getQuote

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>
         <ser:request>
            <xsd:symbol>2</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

A message similar to the one below appears in the simple axis2server.

```bash
Tue Aug 13 21:10:16 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : WSO2
```

You can view the response as follows.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.8978741189955097</ax21:change>
                <ax21:earnings>-9.939907930800844</ax21:earnings>
                <ax21:high>-158.8567947828041</ax21:high>
                <ax21:last>162.024543774764</ax21:last>
                <ax21:lastTradeTimestamp>Tue Aug 13 21:10:16 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-158.4099442705978</ax21:low>
                <ax21:marketCap>3.952813978268175E7</ax21:marketCap>
                <ax21:name>WSO2 Company</ax21:name>
                <ax21:open>168.644570459495</ax21:open>
                <ax21:peRatio>-18.634969373595844</ax21:peRatio>
                <ax21:percentageChange>-1.590623198106395</ax21:percentageChange>
                <ax21:prevClose>182.18482683047569</ax21:prevClose>
                <ax21:symbol>WSO2</ax21:symbol>
                <ax21:volume>18487</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
