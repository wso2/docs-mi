# Composed Message Processor

This page explains how you can implement a sample scenario of Composed Message Processor using WSO2 Micro Integrator.

## Introduction to Composed Message Processor

The Composed Msg. Processor EIP is used to process a composite message. It maintains the overall message flow when processing a message consisting of multiple elements, each of which might require different processing. The Composed Message Processor splits the message up, routes the sub-messages to the appropriate destinations, and then aggregates the responses back into a single message. 

!!! info
    For more information, see the [Composed Message Processor](http://www.eaipatterns.com/DistributionAggregate.html) documentation.

![Distribution aggregate]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/distribution-aggregate.gif)

## Sample scenario

This sample scenario demonstrates splitting a message into several requests, which are then routed to different servers, merged together, and sent back to the client. In this scenario, each server instance acts as an inventory controller. The user can have multiple requests in a single request message. The Iterate Mediator processes the request message and splits it. The request content is identified using the Switch mediator and the routing destination is decided. The Call mediator then sends the request message to the respective location (endpoint). The response, which will be sent from different endpoints, will be merged together using the Aggregate mediator before sending back to the client.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

![Composed message processor sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/composed-message-processor-example-scenario.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Composed Msg. Processor EIP by comparing their core components.

| Composed Message Processor EIP            | Composed Message Processor Sample Scenario            |
|-------------------------------------------|-------------------------------------------------------|
| New Order                                 | Stock Quote Request                                   |
| Splitter                                  | Iterate Mediator                                      |
| Router                                    | Switch Mediator                                       |
| Widget/Gadget Inventory                   | Stock Quote Service Instance                          |
| Aggregator                                | Aggregate Mediator                                    |
| Validated Order                           | Aggregated Stock Quote Response                       |

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="ComposedMessageProxy" startOnLoad="true" transports="http https"
       xmlns="http://ws.apache.org/ns/synapse">
       <target>
          <inSequence>
             <log level="full"/>
             <iterate attachPath="//m0:getQuote" expression="//m0:getQuote/m0:request"
                preservePayload="true" xmlns:m0="http://services.samples">
                <target>
                   <sequence>
                      <switch source="//m1:symbol" xmlns:m1="http://services.samples/xsd">
                         <case regex="IBM">
                            <call>
                               <endpoint key="SimpleStockQuoteService1"/>
                            </call>
                         </case>
                         <case regex="WSO2">
                            <call>
                               <endpoint key="SimpleStockQuoteService2"/>
                            </call>
                         </case>
                         <default>
                            <drop/>
                         </default>
                      </switch>
                   </sequence>
                </target>
             </iterate>
             <aggregate>
                <completeCondition>
                   <messageCount/>
                </completeCondition>
                <onComplete expression="//m0:getQuoteResponse"
                   xmlns:m0="http://services.samples">
                   <respond/>
                </onComplete>
             </aggregate>
          </inSequence>
          <faultSequence>
             <log level="full">
                <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
                <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
                <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
             </log>
             <drop/>
          </faultSequence>
       </target>
    </proxy>
    ```
=== "SimpleStockQuoteService1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteService1" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
=== "SimpleStockQuoteService2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteService2" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9001/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

Let's investigate the elements of the synapse configuration in detail. 

- The iterate mediator - The Iterate mediator takes each child element of the element specified in its XPath expression and applies the sequence flow inside the Iterate mediator. In this example, it takes each `getQuote` request specified in the incoming request and forwards this request to the target endpoint.
- The Switch mediator - Observes the message and filters out the message content to the given XPath expression.
- The Call mediator in switch mediator - When a matching case is found, the Call mediator will route the message to the endpoint indicated in the address URI.
- The Aggregate mediator - The Aggregate mediator merge the response messages for requests made by the Iterate or Clone mediators. The completion condition specifies the minimum or maximum number of messages to be collected. When all messages are aggregated, the sequence inside `onComplete` is run.

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

4. In `tcpmon` application, navigate to **Admin** tab. Add listener to port `9001` and set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

5. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/ComposedMessageProcessor.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

6. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

7. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.


## Execute the sample

Send the following request using a SOAP client such as SoapUI. 

```
POST /services/ComposedMessageProxy HTTP/1.1
Host: localhost:8290
SOAPAction: urn:getQuote
Content-Type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>
         <ser:request>
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
          <ser:request>
            <xsd:symbol>WSO2</xsd:symbol>
         </ser:request>
         <ser:request>
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

Note that the three responses are merged together. 

## Analyze the output

The Micro Integrator returns the following response to the client.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>4.2567397658365085</ax21:change>
                <ax21:earnings>-9.8034892952617</ax21:earnings>
                <ax21:high>-162.3225923122293</ax21:high>
                <ax21:last>163.48677303848953</ax21:last>
                <ax21:lastTradeTimestamp>Mon Aug 12 11:19:39 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>171.36732605650354</ax21:low>
                <ax21:marketCap>1.3723952872154225E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>171.36840817756675</ax21:open>
                <ax21:peRatio>24.575108752678478</ax21:peRatio>
                <ax21:percentageChange>-2.7153822026906984</ax21:percentageChange>
                <ax21:prevClose>-156.7639266994703</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>6393</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>4.137238142311592</ax21:change>
                <ax21:earnings>-9.737213228851822</ax21:earnings>
                <ax21:high>188.01788750650937</ax21:high>
                <ax21:last>179.18269241208367</ax21:last>
                <ax21:lastTradeTimestamp>Mon Aug 12 11:19:39 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-178.95891051374818</ax21:low>
                <ax21:marketCap>5.7739167109927885E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>-177.25685611512893</ax21:open>
                <ax21:peRatio>-17.465156717842763</ax21:peRatio>
                <ax21:percentageChange>-2.334630569879786</ax21:percentageChange>
                <ax21:prevClose>-177.2116837536581</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>16175</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.3486472346147655</ax21:change>
                <ax21:earnings>-8.88812398482074</ax21:earnings>
                <ax21:high>159.55424697569694</ax21:high>
                <ax21:last>153.32568814109163</ax21:last>
                <ax21:lastTradeTimestamp>Mon Aug 12 11:19:39 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-152.99149353893569</ax21:low>
                <ax21:marketCap>5.537991838624418E7</ax21:marketCap>
                <ax21:name>WSO2 Company</ax21:name>
                <ax21:open>-151.3649278746529</ax21:open>
                <ax21:peRatio>23.872718076100966</ax21:peRatio>
                <ax21:percentageChange>-1.3894438584780746</ax21:percentageChange>
                <ax21:prevClose>169.03505818416824</ax21:prevClose>
                <ax21:symbol>WSO2</ax21:symbol>
                <ax21:volume>7119</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
