# Content-Based Router

This page explains how you can implement a sample scenario of Content-Based Router EIP using WSO2 Micro Integrator.

## Introduction to Content-Based Router

The Content-Based Router (CBR) reads the content of a message and routes it to a specific recipient based on its content. This approach is useful when an implementation of a specific logical function is distributed across multiple physical systems.

The following diagram depicts the Content-Based Router's behavior where the router performs a logical function (e.g., inventory check). It receives a request message (new order), reads it, and routes the request to one of the two recipients according to the message's content. 

!!! info
    For more information on the Content-Based Router, see the [Content-Based Router](http://www.eaipatterns.com/ContentBasedRouter.html) documentation.

![Content-Based Router]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/content-based-router.png)

## Sample scenario

The sample scenario depicts an inventory for stocks and illustrates how the Content-Based Router routes a message based on the message content. When the router receives a stock request, it reads the content of the request. If the request is made for foo, the request is routed to the foo stock inventory service. If the request is for bar, it is routed to the bar stock inventory service.

The diagram below depicts how to simulate the sample scenario using the WSO2 MI.

![Content-Based Router sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/content-based-router-sample-scenario.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Content-Based Router EIP by comparing their core components.

| Content-Based Router EIP            | Content-Based Router Sample Scenario                                                                                                                                                                                                                                                                                       |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Widget and Gadget Inventory         | foo Inventory Service and bar Inventory service act as two separate services in the sample scenario.                                                                                                                                                                                                                              |
| Router                              | Message routing is simulated by the Switch and Send mediators of the WSO2 MI. The Switch Mediator acts as the router and observes the content of the message, while the Send Mediator is used to send the message to a selected recipient. Each case defined should decide on routing the message to the appropriate service. |
| New Order                           | Stock Quote Request                                                                                                                                                                                                                                                                                                            |
## Synapse configuration of the artifacts

!!! note
    When you unzip the ZIP file you downloaded below in step 9 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions](https://mi.docs.wso2.com/en/latest/develop/intro-integration-development/).

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="ContentBasedRoutingProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <switch source="//m0:getQuote/m0:request/m0:symbol" xmlns:m0="http://services.samples">
                    <case regex="foo">
                        <call>
                            <endpoint key="StockServiceEP1"/>
                        </call>
                        <respond/>
                    </case>
                    <case regex="bar">
                        <call>
                            <endpoint key="StockServiceEP2"/>
                        </call>
                        <respond/>
                    </case>
                    <default>
                        <property name="symbol" expression="fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)" xmlns:m0="http://services.samples"/>
                    </default>
                </switch>
            </inSequence>
        </target>
    </proxy>
    ```
=== "Endpoint 1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockServiceEP1" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9001/services/SimpleStockQuoteService">
        </address>
    </endpoint>
    ```
=== "Endpoint 2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockServiceEP2" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9002/services/SimpleStockQuoteService">
        </address>
    </endpoint>
    ```

### How the Implementation Works

Let's explore the elements of the configuration in detail:

- **Proxy Service**: The proxy service receives requests and forwards them to the appropriate back-end service, abstracting the routing logic from the client. The client always sends requests to the exposed service, not directly to the back-end services.
- **InSequence**: When the client invokes the service, the message receives the inSequence and is routed according to the defined logic.
- **Switch**: Evaluates the message and filters its content based on the XPath expression.
- **Case**: The filtered content is matched against a specified regular expression.
- **Send**: If a matching case is found, the send mediator routes the message to the endpoint specified in the address URI.
- **Default**: If no matching condition is found, the message is routed to the default case.
- **Respond**: The response from an endpoint is received through the Respond mediator, which then returns the message to the sender.

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

7. Navigate to the `MI_HOME/bin/` directory and start the `tcpmon` application. 

8. In `tcpmon` application, navigate to **Admin** tab. Add listeners to ports `9001` and `9002`. For each listener set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/content-based-router.zip">
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
    POST http://localhost:8290/services/ContentBasedRoutingProxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    SOAPAction: "urn:getQuote"
    Connection: Keep-Alive

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
    <soapenv:Body>
        <ser:getQuote>
            <ser:request>
                <ser:symbol>s</ser:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

2. Send another request changing `foo` to `bar`.

## Analyze the output

1. When you send the request with `foo`, you can view the following outputs.
    - Axis2 Server
    ```log
    samples.services.SimpleStockQuoteService :: Generating quote for : foo
    ```
    - Client console
    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <ns:getQuoteResponse xmlns:ns="http://services.samples">
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>-2.888808860350523</ax21:change>
                    <ax21:earnings>13.091381356773143</ax21:earnings>
                    <ax21:high>173.39589343900357</ax21:high>
                    <ax21:last>165.64361888416187</ax21:last>
                    <ax21:lastTradeTimestamp>Fri Aug 09 15:03:08 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>171.5517020598204</ax21:low>
                    <ax21:marketCap>4.474723676446933E7</ax21:marketCap>
                    <ax21:name>foo Company</ax21:name>
                    <ax21:open>171.16435553986477</ax21:open>
                    <ax21:peRatio>24.42766998839096</ax21:peRatio>
                    <ax21:percentageChange>-1.5225608270138737</ax21:percentageChange>
                    <ax21:prevClose>189.73356000602</ax21:prevClose>
                    <ax21:symbol>foo</ax21:symbol>
                    <ax21:volume>6756</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
        </soapenv:Body>
    </soapenv:Envelope>
    ```
    - tcpmon 

<img alt="tcpmon response for foo" width="80%" src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/content-based-router-tcpmon-response-foo.png"/>
    
        
1. When you send the request with `bar`, you can view the following outputs.
    - Axis2 Server
    ```log
    samples.services.SimpleStockQuoteService :: Generating quote for : bar
    ```
    - Client console
    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <ns:getQuoteResponse xmlns:ns="http://services.samples">
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>4.124132054281285</ax21:change>
                    <ax21:earnings>12.483431163052666</ax21:earnings>
                    <ax21:high>-155.8150737984415</ax21:high>
                    <ax21:last>157.53622659947996</ax21:last>
                    <ax21:lastTradeTimestamp>Fri Aug 09 15:08:40 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>163.23580115463065</ax21:low>
                    <ax21:marketCap>5.613170787258939E7</ax21:marketCap>
                    <ax21:name>bar Company</ax21:name>
                    <ax21:open>163.45390396566518</ax21:open>
                    <ax21:peRatio>24.728167257722287</ax21:peRatio>
                    <ax21:percentageChange>-2.771539975765438</ax21:percentageChange>
                    <ax21:prevClose>-148.80290706044357</ax21:prevClose>
                    <ax21:symbol>bar</ax21:symbol>
                    <ax21:volume>8251</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
        </soapenv:Body>
    </soapenv:Envelope>
    ```
    - tcpmon 
  
<img alt="tcpmon response for bar" width="80%" src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/content-based-router-tcpmon-response-bar.png"/>

!!! Note
        If you send a request with any other value, you receive a 202 response.

