# Document Message

This page explains how you can implement a sample scenario of the Document Message EIP using WSO2 Micro Integrator.

## Introduction to Document Message

The Document Message EIP is used to reliably transfer a data structure between applications. The Command Message EIP allows you to invoke only a specific client through the WSO2 MI, while the Document Message EIP sends the entire data unit to the receiver. 

!!! info
    For more information, see the [Document Message](http://www.eaipatterns.com/DocumentMessage.html) documentation.

![Document message]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/document-message-solution.gif)

## Sample scenario

This example demonstrates transmitting an entire message from a client to a sample Axis2 server as a document message, which the Axis2 server processes so it can identify which operation to invoke.

The diagram below depicts how to simulate the example scenario using the WSO2 MI.

![Document message]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/document-message.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Document Message EIP by comparing their core components.

| Document Message EIP            | Document Message Example Scenario            |
|---------------------------------|----------------------------------------------|
| Sender                          | Stock Quote Client                           |
| Document Message                | Proxy Service                                |
| Receiver                        | Simple Stock Quote Service Instance          |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="DocumentMessageProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
        <inSequence>
            <call>
                <endpoint key="SimpleStockEp"/>
            </call>
            <respond/>
        </inSequence>
        <faultSequence/>
        </target>
    </proxy>
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

- Proxy Service - The proxy service receives requests and forwards them to the backend service, abstracting the routing logic from the client. In this example scenario, the proxy service simply forwards requests to the backend service following the Document Message EIP style.

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/DocumentMessage.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the above proxy service.

```
POST /services/DocumentMessageProxy HTTP/1.1
Host: localhost:8290
Content-Type: text/xml
soapAction: urn:getQuote

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote xmlns:ser="http://services.samples">
         <ser:request>
            <ser:symbol>IBM</ser:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

A message similar to the one below appears in the Axis2 server.

```bash
Tue Aug 13 12:31:38 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

You can view the response as follows.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.411510818596997</ax21:change>
                <ax21:earnings>12.65693310695867</ax21:earnings>
                <ax21:high>-172.45667702244614</ax21:high>
                <ax21:last>175.58040593328195</ax21:last>
                <ax21:lastTradeTimestamp>Tue Aug 13 12:31:38 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-174.48462741220598</ax21:low>
                <ax21:marketCap>3.604055175262325E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>180.7317908133331</ax21:open>
                <ax21:peRatio>23.49701102462313</ax21:peRatio>
                <ax21:percentageChange>1.4361628534032258</ax21:percentageChange>
                <ax21:prevClose>-167.91346558522403</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>5558</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
