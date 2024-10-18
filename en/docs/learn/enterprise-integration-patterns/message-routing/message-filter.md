# Message Filter

This page explains how you can implement a sample scenario of Message Filter EIP using WSO2 Micro Integrator.

## Introduction to Message Filter

The Message Filter EIP checks an incoming message against specific criteria that the message must adhere to. If the criteria are not met, the filter discards the message otherwise, it routes the message to the output channel.

!!! info
    For more information, see the [Message Filter](http://www.eaipatterns.com/Filter.html) documentation.

## Sample scenario

The sample scenario depicts an inventory for stocks where an incoming request is filtered based on its content. If the content meets the criteria, the message filter allows the request to proceed otherwise, the message is dropped.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

### Scenario 1: content meeting the filter criteria

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-filter-eip.png" style="width: 70%;" alt="Message filter EIP">

### Scenario 2: content not meeting the filter criteria

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-filter.png" style="width: 70%;" alt="Message filter">

Before digging into implementation details, let's take a look at the correlation between the sample scenario and the Message Filter EIP by comparing their core components.

| Message Filter EIP            | Message Filter Sample Scenario                                        | 
|-------------------------------|-----------------------------------------------------------------------|
| Quote                         | Stock Quote Request                                                   | 
| Message Filter                | Filter Mediator is used to filter the content of the incoming message | 

## Synapse configuration of the artifacts

=== "Proxy Service"
```xml
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="MessageFilterProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
	<target>
		<inSequence>
			<filter xmlns:m0="http://services.samples" source="//m0:getQuote/m0:request/m0:symbol" regex="foo">
				<then>
					<call>
						<endpoint key="StockServiceEP"/>
					</call>
					<respond/>
				</then>
				<else>
					<drop/>
				</else>
			</filter>
		</inSequence>
	</target>
</proxy>
```

### How the implementation works

Let's examine the elements of the configuration in detail:

- **Proxy Service**: The proxy service receives requests and forwards them to the appropriate back-end service, abstracting the routing logic from the client. The client always sends requests to the exposed service, not directly to the back-end services.

- **InSequence**: When the client invokes the service, the message is processed by the inSequence and routed according to the defined logic.

- **Filter**: Filters incoming messages, discarding those that do not meet the specified criteria.

- **Respond**: If a matching condition is found, the respond mediator routes the message to the endpoint specified in the address URI.

- **OutSequence**: The response from the endpoint is processed by the outSequence and then returned to the sender.
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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/message-filter.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9.  Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

## Execute the sample

Send the following request using SoapUI (or any other Soap client).

```xml
POST http://localhost:8290/services/MessageFilterProxy

Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:getQuote"
Connection: Keep-Alive

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

When your request has the value `foo`, you will receive a response like this:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.352337680518278</ax21:change>
                <ax21:earnings>12.727065083278656</ax21:earnings>
                <ax21:high>92.75656524398916</ax21:high>
                <ax21:last>88.78328252546186</ax21:last>
                <ax21:lastTradeTimestamp>Mon Aug 12 11:30:32 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>92.40515024154969</ax21:low>
                <ax21:marketCap>3618966.99564144</ax21:marketCap>
                <ax21:name>foo Company</ax21:name>
                <ax21:open>91.53912035529257</ax21:open>
                <ax21:peRatio>-18.98135135726734</ax21:peRatio>
                <ax21:percentageChange>2.7410884095070918</ax21:percentageChange>
                <ax21:prevClose>-85.81765084115912</ax21:prevClose>
                <ax21:symbol>foo</ax21:symbol>
                <ax21:volume>19747</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```

!!! Note
        If you send a request with any other value, the request will be dropped, and you will receive a 202 response.
