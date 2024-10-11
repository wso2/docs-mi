# Messaging Bridge

This page explains how you can implement a sample scenario of Message Bridge using WSO2 Micro Integrator.

## Introduction to Messaging Bridge

The Messaging Bridge EIP facilitates the connection between messaging systems and replicates messages between them by transforming message formats from one system to the other. 

!!! info
    For more information, see the [Messaging Bridge](http://www.eaipatterns.com/MessagingBridge.html) documentation.

![Messaging bridge]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/messaging-bridge.gif)

## Sample scenario

An enterprise might use more than one messaging system in communication. This example illustrates a message bridge, which accepts a REST message from the client, transforms the REST message to SOAP format, and sends the SOAP message to the back-end Axis2 server. To transform the sent REST request to a SOAP message, we use the API functionality of the WSO2 MI. It restructures the message to a REST format using the Payload Factory mediator.

The diagram below depicts how to simulate the example scenario using the WSO2 MI.

![Messaging bridge]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/messaging-bridge.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Messaging Bridge EIP by comparing their core components.

| Messaging Bridge EIP            | Messaging Bridge Example Scenario                                                        |
|---------------------------------|-----------------------------------------------------------------------------------------------------|
| Messaging System1               | Stock Quote client                                                                                  |
| Messaging Bridge                | PayloadFactory Mediator (You can add any transformation mediator here. Also see [Message Translator]({{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-translator.md)) |
| Messaging System2               | Stock Quote service                                                                                 |

## Synapse configuration of the artifacts

Given below is the Synapse configuration of this sample.

=== "Rest API"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/stockquote" name="MessageTranslate" xmlns="http://ws.apache.org/ns/synapse">
       <resource methods="GET" uri-template="/view/{symbol}">
          <inSequence>
             <payloadFactory media-type="xml" template-type="default">
                <format>
                   <m0:getQuote xmlns:m0="http://services.samples">
                      <m0:request>
                         <m0:symbol>$1</m0:symbol>
                      </m0:request>
                   </m0:getQuote>
                </format>
                <args>
                   <arg expression="get-property('uri.var.symbol')" evaluator="xml"/>
                </args>
             </payloadFactory>
             <property name="SOAPAction" scope="transport" type="STRING" value="getQuote"/>
             <call>
                <endpoint key="SimpleStockQuoteService"/>
             </call>
             <respond/>
          </inSequence>
          <faultSequence>
          </faultSequence>
       </resource>
    </api>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- Payload Factory - Builds the necessary SOAP request for the back-end service. It uses the value of the HTTP GET variable (from the REST request made to the API).
- args - A list of arguments that will be concatenated in the same order inside the format tags (in a `printf` style).

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/MessageBridge.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

6. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

7. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

1. Send the following request to the WSO2 MI.

    ```
    GET /stockquote/view/IBM HTTP/1.1
    Host: 127.0.0.1:8290
    ```

2. You can use TCPMon to see the type of the message and its message format:

    ```
    GET /stockquote/view/IBM HTTP/1.1
    Host: 127.0.0.1:9001
    User-Agent: curl/8.6.0
    Accept: */*

    ```

## Analyze the output

The Micro Integrator returns the following response to the client.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope
	xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
	<soapenv:Header/>
	<soapenv:Body>
		<ns:getQuoteResponse
			xmlns:ns="http://services.samples">
			<ns:return
				xmlns:ax21="http://services.samples/xsd"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
				<ax21:change>4.253693801154686</ax21:change>
				<ax21:earnings>-8.911930009503555</ax21:earnings>
				<ax21:high>92.80585287535649</ax21:high>
				<ax21:last>90.17401754112653</ax21:last>
				<ax21:lastTradeTimestamp>Fri Aug 09 09:04:45 IST 2024</ax21:lastTradeTimestamp>
				<ax21:low>93.0455425581039</ax21:low>
				<ax21:marketCap>3.619279162229402E7</ax21:marketCap>
				<ax21:name>IBM Company</ax21:name>
				<ax21:open>-89.89772752071849</ax21:open>
				<ax21:peRatio>23.71867645074842</ax21:peRatio>
				<ax21:percentageChange>-4.984394252613035</ax21:percentageChange>
				<ax21:prevClose>-85.34023565500894</ax21:prevClose>
				<ax21:symbol>IBM</ax21:symbol>
				<ax21:volume>5102</ax21:volume>
			</ns:return>
		</ns:getQuoteResponse>
	</soapenv:Body>
</soapenv:Envelope>
```
