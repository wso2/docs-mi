# Message Channels

This page explains how you can implement a sample scenario of Message Channels using WSO2 Micro Integrator.

## Introduction to Message Channels

Message Channels facilitate communication between applications. A sender adds a message to a particular channel, which a receiver can read. Message Channels allow the sender and receiver to synchronize.

!!! info
    For more information, see the [Message Channel](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html) documentation.

## Sample scenario

The sample scenario depicts how a stock inventory is made from a sender application to the receiver application through a Message Channel. The Message Channel retrieves the message content from the sender, and it allows the receiver to read the content through the Message Channel. The diagram below depicts how to simulate the sample scenario.

![Message channels]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-channels.png)

## Synapse configurations of the artifacts

When you unzip the ZIP file you downloaded below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts/` directory. For more information about these artifacts, go to [Develop Integration Solutions]({{base_path}}/develop/intro-integration-development/).

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="message-channel-proxy" startOnLoad="true" transports="http https"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <sequence key="message-channel-sequence"/>
                <log level="custom">
                    <property name="sending response to" value="client"/>
                </log>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="message-channel-sequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log level="custom">
            <property name="sending request to" value="axis2 server"/>
        </log>
        <call>
            <endpoint key="SimpleStockQuoteService"/>
        </call>
        <respond/>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
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

5. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/MessageChannels.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

6. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

7. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.


## Execute the sample

Send the following request to the service using SoapUI (or any other SOAP client).

```
POST /services/message-channel-proxy HTTP/1.1
Host: localhost:8290
SOAPAction: urn:getQuote
Content-Type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
    <soapenv:Header/>
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

When you execute the request, the proxy service will receive the message and then route it to the back-end service (StockQuoteService). The following generated stock quote response will be received by the client application:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.5477449224000654</ax21:change>
                <ax21:earnings>13.355122817579623</ax21:earnings>
                <ax21:high>194.61535812737355</ax21:high>
                <ax21:last>188.53115352495462</ax21:last>
                <ax21:lastTradeTimestamp>Tue Aug 06 10:52:05 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-187.35545800800978</ax21:low>
                <ax21:marketCap>5.520155820141873E7</ax21:marketCap>
                <ax21:name>foo Company</ax21:name>
                <ax21:open>-184.57395642330587</ax21:open>
                <ax21:peRatio>23.15252744429442</ax21:peRatio>
                <ax21:percentageChange>-1.2212285341635047</ax21:percentageChange>
                <ax21:prevClose>208.62147019396122</ax21:prevClose>
                <ax21:symbol>foo</ax21:symbol>
                <ax21:volume>15781</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
