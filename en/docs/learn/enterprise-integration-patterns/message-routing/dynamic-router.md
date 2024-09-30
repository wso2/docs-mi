# Dynamic Router

This page explains how you can implement a sample scenario of Dynamic Router using WSO2 Micro Integrator.

## Introduction to Dynamic Router

The Dynamic Router EIP avoids dependence on all possible destinations while maintaining efficiency. It is a router that can self-configure based on special configuration messages from participating destinations. Dynamic Router is available for configuration through a control channel by the receiving parties that can use this control channel.

![Dynamic Router]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/dynamic-router.gif)

## Sample scenario

This sample scenario demonstrates a router that takes an incoming request and decides which back-end service to transmit the message to. To make that decision, it uses a property in the message itself, similar to a Content-Based Router. However, it can also cross-check a registry entry to see if a specific endpoint accepts messages with that property. This approach allows you to reconfigure the router when registry entries change.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/dynamic-router.png" style="width: 70%;" alt="Dynamic Router">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Dynamic Router EIP by comparing their core components.

| Dynamic Router EIP            | Dynamic Router Sample Scenario            |
|-------------------------------|-------------------------------------------|
| Input Channel                 | Main sequence                             |
| Dynamic Rule Base             | Local Registry                            | 
| Dynamic Router                | Switch Mediator                           | 
| A, B, C                       | Simple Stock Quote Services               |

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="DynamicRouterProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse" statistics="disable" trace="disable">
        <target>
            <inSequence>
                <log category="INFO" level="full"/>
                <switch source="get-property('To')">
                    <case regex="http://localhost:9000.*">
                        <filter xmlns:m0="http://services.samples" xpath="get-property('ConfigA') = //m0:getQuote/m0:request/m0:symbol/text()">
                            <then>
                                <call>
                                    <endpoint key="StockQuoteServiceEP1"/>
                                </call>
                            </then>
                            <else>
                                <log category="INFO" level="custom">
                                    <property name="MESSAGE" value="Registry Value Doesn't Match"/>
                                </log>
                            </else>
                        </filter>
                    </case>
                    <case regex="http://localhost:9001.*">
                        <filter xmlns:m0="http://services.samples" xpath="get-property('ConfigB') = //m0:getQuote/m0:request/m0:symbol/text()">
                            <then>
                                <call>
                                    <endpoint key="StockQuoteServiceEP2"/>
                                </call>
                            </then>
                            <else>
                                <log category="INFO" level="custom">
                                    <property name="MESSAGE" value="Registry Value Doesn't Match"/>
                                </log>
                            </else>
                        </filter>
                    </case>
                    <case regex="http://localhost:9002.*">
                        <filter xmlns:m0="http://services.samples" xpath="get-property('ConfigC') = //m0:getQuote/m0:request/m0:symbol/text()">
                            <then>
                                <call>
                                    <endpoint key="StockQuoteServiceEP3"/>
                                </call>
                            </then>
                            <else>
                                <log category="INFO" level="custom">
                                    <property name="MESSAGE" value="Registry Value Doesn't Matched"/>
                                </log>
                            </else>
                        </filter>
                    </case>
                    <default>
                        <drop/>
                    </default>
                </switch>
                <respond/>
            </inSequence>
        </target>
    </proxy>
    ```
=== "Endpoint 1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockQuoteServiceEP1" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
        </address>
    </endpoint>
    ```
=== "Endpoint 2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockQuoteServiceEP2" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9001/services/SimpleStockQuoteService">
        </address>
    </endpoint>
    ```
=== "Endpoint 3"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockQuoteServiceEP3" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9002/services/SimpleStockQuoteService">
        </address>
    </endpoint>
    ```
=== "ConfigA"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="ConfigA" xmlns="http://ws.apache.org/ns/synapse"><![CDATA[foo]]></localEntry>
    ```

=== "ConfigB"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="ConfigB" xmlns="http://ws.apache.org/ns/synapse"><![CDATA[bar]]></localEntry>
    ```
=== "ConfigC"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="ConfigC" xmlns="http://ws.apache.org/ns/synapse"><![CDATA[WSO2]]></localEntry>
    ```


### How the implementation works

Let's break down the elements of the configuration:

- **Proxy Service**: The main entry point for incoming messages. This proxy service dynamically routes the message to one of three possible endpoints based on the message content and configuration settings.

- **switch**: A routing mechanism that examines the `To` header in the SOAP message. Depending on the URL in the header, it determines which case to follow. Each case corresponds to a different backend service.

- **case**: Each case within the switch block checks if the message is destined for a specific service endpoint (`http://localhost:9000`, `http://localhost:9001`, or `http://localhost:9002`). If the message matches one of these URLs, it proceeds to check a specific property in the message.

- **filter**: Inside each case, the filter mediator is used to validate the message content. It checks if the symbol in the incoming message matches a pre-configured value stored in the local entry (`ConfigA`, `ConfigB`, or `ConfigC`). If it matches, the message is sent to the corresponding service endpoint.

- **local entry**: These are registry entries that store the expected values (`foo`, `bar`, `WSO2`) for each service. They act as the criteria against which incoming messages are validated.

- **endpoints**: Each of the three endpoints (`StockQuoteServiceEP1`, `StockQuoteServiceEP2`, `StockQuoteServiceEP3`) corresponds to a different service URL. Depending on the routing logic, the message is sent to one of these endpoints.

- **else block**: If the message does not match the expected symbol, a log message is generated indicating that the registry value didn't match, and the message is not forwarded to the service.

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

7. Navigate to the `<MI_HOME>/bin/` directory and start the `tcpmon` application. 

8. In the `tcpmon` application, navigate to the **Admin** tab. Add listeners to ports `9001` and `9002`, for each listener set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/dynamic-router.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

12. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

## Execute the sample

1. Send the following request using SoapUI (or any other Soap client).
    ```xml
    POST http://localhost:8290/services/DynamicRouterProxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    Connection: Keep-Alive
    SOAPAction: "urn:getQuote"
    To: http://localhost:9000/services/SimpleStockQuoteService

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <soapenv:Header>
        <wsa:To>http://localhost:9000/services/SimpleStockQuoteService</wsa:To>
        <wsa:Action>urn:getQuote</wsa:Action>
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

    ```xml
    POST http://localhost:8290/services/DynamicRouterProxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    Connection: Keep-Alive
    SOAPAction: "urn:getQuote"
    To: http://localhost:9001/services/SimpleStockQuoteService

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <soapenv:Header>
        <wsa:To>http://localhost:9001/services/SimpleStockQuoteService</wsa:To>
        <wsa:Action>urn:getQuote</wsa:Action>
    </soapenv:Header>
    <soapenv:Body>
        <ser:getQuote>
            <ser:request>
                <ser:symbol>bar</ser:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

    ```xml
    POST http://localhost:8290/services/DynamicRouterProxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    Connection: Keep-Alive
    SOAPAction: "urn:getQuote"
    To: http://localhost:9002/services/SimpleStockQuoteService

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing">
    <soapenv:Header>
        <wsa:To>http://localhost:9002/services/SimpleStockQuoteService</wsa:To>
        <wsa:Action>urn:getQuote</wsa:Action>
    </soapenv:Header>
    <soapenv:Body>
        <ser:getQuote>
            <ser:request>
                <ser:symbol>WSO2</ser:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

2. Send more requests changing `symbol` to other values.

## Analyze the output

1. When you send the requests with the `symbol` value set to one of `foo`, `bar`, or `WSO2`, you will receive outputs like the following. Also, you can see in `tcpmon` that you received a request for the relevant port.
    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <ns:getQuoteResponse xmlns:ns="http://services.samples">
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>3.9782739749100493</ax21:change>
                    <ax21:earnings>12.142627905802117</ax21:earnings>
                    <ax21:high>-142.69159439461524</ax21:high>
                    <ax21:last>145.1810442343239</ax21:last>
                    <ax21:lastTradeTimestamp>Tue Aug 20 11:48:05 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>152.09105015765533</ax21:low>
                    <ax21:marketCap>3.707834504517188E7</ax21:marketCap>
                    <ax21:name>foo Company</ax21:name>
                    <ax21:open>151.25901812607216</ax21:open>
                    <ax21:peRatio>-19.743676192563544</ax21:peRatio>
                    <ax21:percentageChange>2.4263061719499506</ax21:percentageChange>
                    <ax21:prevClose>163.9642193925109</ax21:prevClose>
                    <ax21:symbol>foo</ax21:symbol>
                    <ax21:volume>19405</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

2. When you change the `symbol` to a different value, this log will be printed to the WSO2 MI console.
    ```log 
    INFO {LogMediator} - {proxy:DynamicRouterProxy} MESSAGE = Registry Value Doesn't Matched
    ```
