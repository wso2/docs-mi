# Command Message

This page explains how you can implement a sample scenario of Command Message EIP using WSO2 Micro Integrator.

## Introduction to Command Message

The Command Message EIP allows you to use messaging to invoke a procedure in another application. 

!!! info
    For more information, see the [Command Message](http://www.eaipatterns.com/CommandMessage.html) documentation.

![Command message solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/command-message-solution.gif)

## Sample scenario

This example demonstrates how the WSO2 MI uses messaging to invoke functionality provided by an application, in this case, a stock quote service. A command message can be in any form, including a JMS serialized object or a text message in the form of an XML or SOAP request. In this example, the WSO2 MI will pass the message as a document to a sample Axis2 server and invoke the operation directly using the Call mediator.

The diagram below depicts how to simulate the example scenario using the WSO2 MI.

![Command message]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/command-message.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Command Message EIP by comparing their core components.

| Command Message EIP             | Command Message Example Scenario            |
|---------------------------------|---------------------------------------------|
| Sender                          | Stock Quote Client                          |
| Command Message                 | Call mediator                               |
| Receiver                        | Stock Quote Service Instance                |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="CommandMessageProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <header name="Action" action="set" scope="default" value="urn:getQuote"/>
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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/CommandMessage.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the above proxy service.

```
POST /services/CommandMessageProxy HTTP/1.1
Host: localhost:8290
Content-Type: application/soap+xml

<s12:Envelope xmlns:s12="http://www.w3.org/2003/05/soap-envelope">
   <s12:Header/>
   <s12:Body>
        <ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
            <ser:request>
                <xsd:symbol>IBM</xsd:symbol>
            </ser:request>
        </ser:getQuote>
   </s12:Body>
</s12:Envelope>
```

## Analyze the output

A message similar to the one below appears in the simple axis2server.

```bash
Tue Aug 13 14:48:29 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

You can view the response as follows.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.9477279077218044</ax21:change>
                <ax21:earnings>12.966336060464375</ax21:earnings>
                <ax21:high>-65.04299505454664</ax21:high>
                <ax21:last>65.05264218088124</ax21:last>
                <ax21:lastTradeTimestamp>Tue Aug 13 15:38:20 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>67.23374498819649</ax21:low>
                <ax21:marketCap>4.677896775199244E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>67.8880716532154</ax21:open>
                <ax21:peRatio>-19.89827532669306</ax21:peRatio>
                <ax21:percentageChange>4.592499612489774</ax21:percentageChange>
                <ax21:prevClose>-64.18569747300917</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>5381</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
