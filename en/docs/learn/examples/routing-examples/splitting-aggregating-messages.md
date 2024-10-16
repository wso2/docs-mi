# How to Split Messages and Aggregate Responses

This example scenario uses a back-end service with two stock quote inventories (IBM and SUN). A proxy service is configured in the Micro Integrator with the **Iterate** mediator (to split the incoming message) and the **Aggregate** mediator (to aggregate the responses).

When a stock quote request is received by the Micro Integrator, the proxy service will read the **message payload** and first identify the parts of the message that are intended for each of the inventories. The Iterate mediator will then split the message and route the parts to the relevant inventories in the backend. These messages will be processed asynchronously. 

When the response messages are received from the backend, the Aggregate mediator will aggregate the responses into one and send to the client.

## Synapse configuration
    
Listed below are the synapse configurations (proxy service) for implementing this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SplitAggregateProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <iterate attachPath="//m0:getQuote" expression="//m0:getQuote/m0:request" preservePayload="true" xmlns:m0="http://services.samples">
                    <target>
                        <sequence>
                            <header name="Action" action="set" scope="default" value="urn:getQuote"/>
                            <call>
                                <endpoint key="SimpleStockQuoteServiceEp"/>
                            </call>
                            <property name="enclose" scope="default" type="OM">
                                <ns:Results xmlns:ns="http://services.samples"/>
                            </property>
                        </sequence>
                    </target>
                </iterate>
                <aggregate>
                    <completeCondition timeout="0">
                        <messageCount max="-1" min="-1"/>
                    </completeCondition>
                    <onComplete aggregateElementType="root" enclosingElementProperty="enclose" expression="$body/*[1]">
                        <respond/>
                    </onComplete>
                </aggregate>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
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

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create the proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
        ```bash
        sh axis2server.sh
        ```
    === "On Windows"              
        ```bash
        axis2server.bat
        ```

Invoke the sample proxy service:

```xml
HTTP method: POST 
Request URL: http://localhost:8290/services/SplitAggregateProxy
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:mediate"
CustomHeader: application/json
Message Body:
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   <m0:getQuote xmlns:m0="http://services.samples" xmlns:xsd="http://services.samples/xsd">
        <m0:request>
            <m0:symbol>IBM</m0:symbol>
        </m0:request>
        <m0:request>
            <m0:symbol>SUN</m0:symbol>
        </m0:request>
    </m0:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

You can then observe that the response from the proxy service is the aggregated response received for each of the `getQuote` requests that were sent to the backend.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:Results xmlns:ns="http://services.samples">
            <ns:getQuoteResponse>
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>-2.7541403681043874</ax21:change>
                    <ax21:earnings>13.316362583010434</ax21:earnings>
                    <ax21:high>-69.86552971310732</ax21:high>
                    <ax21:last>70.56563752927664</ax21:last>
                    <ax21:lastTradeTimestamp>Wed Jul 24 21:06:42 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>-70.33199361844859</ax21:low>
                    <ax21:marketCap>3.731387687008923E7</ax21:marketCap>
                    <ax21:name>IBM Company</ax21:name>
                    <ax21:open>-69.18324170577428</ax21:open>
                    <ax21:peRatio>25.158635261126836</ax21:peRatio>
                    <ax21:percentageChange>4.1163339082481105</ax21:percentageChange>
                    <ax21:prevClose>-66.90760345232864</ax21:prevClose>
                    <ax21:symbol>IBM</ax21:symbol>
                    <ax21:volume>16901</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
            <ns:getQuoteResponse>
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>-2.401012800717323</ax21:change>
                    <ax21:earnings>12.160630064213766</ax21:earnings>
                    <ax21:high>197.42220037969906</ax21:high>
                    <ax21:last>189.55943936957652</ax21:last>
                    <ax21:lastTradeTimestamp>Wed Jul 24 21:06:42 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>195.30882072296137</ax21:low>
                    <ax21:marketCap>5.364948639721981E7</ax21:marketCap>
                    <ax21:name>SUN Company</ax21:name>
                    <ax21:open>194.5745817372284</ax21:open>
                    <ax21:peRatio>-17.563343313834807</ax21:peRatio>
                    <ax21:percentageChange>1.328464451789101</ax21:percentageChange>
                    <ax21:prevClose>-180.73594648948068</ax21:prevClose>
                    <ax21:symbol>SUN</ax21:symbol>
                    <ax21:volume>17559</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
        </ns:Results>
    </soapenv:Body>
</soapenv:Envelope>
```
