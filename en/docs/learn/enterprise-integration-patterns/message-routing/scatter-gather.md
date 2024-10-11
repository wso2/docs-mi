# Scatter-Gather

This page explains how you can implement a sample scenario of the Scatter-Gather EIP using the WSO2 Micro Integrator.

## Introduction to Scatter-Gather

The Scatter-Gather EIP maintains the overall message flow when a message needs to be sent to multiple recipients, each of which may send a reply back. 

!!! info

    For more information, see the [Scatter-Gather](http://www.eaipatterns.com/BroadcastAggregate.html) documentation.

![Broadcast aggregate]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/broadcast-aggregate.gif)

## Sample scenario

This sample scenario demonstrates an implementation of Scatter-Gather EIP that broadcasts a message to multiple recipients using WSO2 MI. The WSO2 MI uses the Aggregate mediator to collect the responses and merge them into a single response message.

We use a sample Stock Quote service as the service provided by the vendors. In this scenario, you send a quote request to three vendors, get quotes for certain items, and return the best quote to the client. We assume that all three vendors implement the same service contract. 

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

![Scatter-Gather sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/scatter-gather.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Scatter-Gather EIP by comparing their core components.

| Scatter-Gather EIP            | Scatter-Gather Sample Scenario            |
|-------------------------------|-------------------------------------------|
| Quote Request                 | Simple Stock Quote Request                |
| Broadcast                     | Clone Mediator                            |
| Quote                         | Simple Stock Quote Service Response       |
| Aggregator                    | Aggregate Mediator                        |
| Best Quote                    | Aggregated Response                       |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service"
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="ScatterGatherProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="enrichedres" scope="default" type="STRING" value="initial"/>
                <clone>
                    <target>
                        <sequence>
                            <call>
                                <endpoint key="vendorA"/>
                            </call>
                        </sequence>
                    </target>
                    <target>
                        <sequence>
                            <call>
                                <endpoint key="vendorB"/>
                            </call>
                        </sequence>
                    </target>
                    <target>
                        <sequence>
                            <call>
                                <endpoint key="vendorC"/>
                            </call>
                        </sequence>
                    </target>
                </clone>
                <log category="INFO" level="full"/>
                <aggregate>
                    <completeCondition timeout="0">
                        <messageCount max="-1" min="3"/>
                    </completeCondition>
                    <onComplete aggregateElementType="root" expression="//ns:return" xmlns:ns="http://services.samples">
                        <enrich description="">
                            <source clone="true" type="custom" xpath="/soapenv:Body/ns:return[not(ax21:last &gt; /soapenv:Body/ns:return/ax21:last)]" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://services.samples" xmlns:ax21="http://services.samples/xsd" />
                            <target action="replace" type="property" property="enrichedres"/>
                        </enrich>
                        <payloadFactory media-type="xml" template-type="default">
                            <format>
                                <soapenv:Body xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">$1</soapenv:Body>
                            </format>
                            <args>
                                <arg expression="get-property('enrichedres')" evaluator="xml"/>
                            </args>
                        </payloadFactory>
                        <respond/>
                    </onComplete>
                </aggregate>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "VendorA Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="vendorA" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9001/services/SimpleStockQuoteService/">
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
=== "VendorB Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="vendorB" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9002/services/SimpleStockQuoteService/">
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
=== "VendorC Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="vendorC" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9003/services/SimpleStockQuoteService/">
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

- **clone** - In the inSequence of the ScatterGatherProxy service, we use the Clone mediator to make three copies of the request. Those requests are then forwarded to the three vendor services (SimpleStockeQuoteService). The Clone mediator is similar to the Splitter EIP. It clones the incoming request and passes the requests in parallel to several endpoints.  
- **log** - All received responses are logged before the Aggregate mediator merges them.
- **aggregate** - The Aggregate mediator aggregates response messages for requests made by the Clone mediator. The completion condition specifies the minimum or maximum number of messages to be collected.
- **onComplete** - When all messages are aggregated, the onComplete sequence of the Aggregate mediator will run. This sequence is called once all responses are received or the specified completion condition is met. The responses are aggregated based on the value of the return element in the response.
- **enrich** - The Enrich mediator is used to extract the response, which contains the best quote. The following XPath 1.0 expression is used for this purpose:

    ```
    /soapenv:Body/ns:return[not(ax21:last > /soapenv:Body/ns:return/ax21:last)]
    ```
    
    In essence, this expression instructs the WSO2 MI to pick the response that has the lowest last value. (The XPath 2.0 min function could reduce the complexity of the above expression, but XPath 1.0 is the current default supported by WSO2 MI.) Once the proper response is found, we enrich the SOAP body with it and send that response back to the client.

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

    For instructions, go to [Starting TCPMon]({{base_path}}/observe-and-manage/classic-observability-tcp/starting-tcp-mon/) Documentation.

8. In the `tcpmon` application, navigate to the **Admin** tab. Add listeners to ports `9001`, `9002`, and `9003`. For each listener, set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/ScatterGather.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the above proxy service.

```
POST /services/ScatterGatherProxy HTTP/1.1
Host: localhost:8290
Content-Type: text/xml
soapAction: urn:getSimpleQuote

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples"> 
   <soapenv:Header/> 
   <soapenv:Body> 
      <ser:getSimpleQuote> 
         <ser:symbol>foo</ser:symbol> 
      </ser:getSimpleQuote> 
   </soapenv:Body> 
</soapenv:Envelope>
```

## Analyze the output

Three messages appear in the simple axis2server as below.

```bash
Tue Aug 13 09:58:55 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : foo
Tue Aug 13 09:58:55 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : foo
Tue Aug 13 09:58:55 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : foo
```

You can view the response as follows.
```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <soapenv:Body>
            <ns:return xmlns:ns="http://services.samples" xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>4.213152912849627</ax21:change>
                <ax21:earnings>-8.526135533589905</ax21:earnings>
                <ax21:high>-58.41039827389961</ax21:high>
                <ax21:last>59.19565308228062</ax21:last>
                <ax21:lastTradeTimestamp>Fri Aug 16 11:17:30 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-58.48591341581683</ax21:low>
                <ax21:marketCap>1.0784042223841581E7</ax21:marketCap>
                <ax21:name>foo Company</ax21:name>
                <ax21:open>60.76558672115019</ax21:open>
                <ax21:peRatio>-18.402936604937295</ax21:peRatio>
                <ax21:percentageChange>-7.152882065580833</ax21:percentageChange>
                <ax21:prevClose>-58.901473199495676</ax21:prevClose>
                <ax21:symbol>foo</ax21:symbol>
                <ax21:volume>17128</ax21:volume>
            </ns:return>
        </soapenv:Body>
    </soapenv:Body>
</soapenv:Envelope>
```

When inspecting the `tcpmon`, you will see that each listener has received a request. 
