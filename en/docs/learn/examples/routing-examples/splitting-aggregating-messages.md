# Splitting Messages and Aggregating Responses

This example scenario uses a back-end service with two stock quote inventories (IBM and SUN). A proxy service is configured in the Micro Integrator with the **Iterate** mediator (to split the incoming message) and the **Aggregate** mediator (to aggregate the responses).

When a stock quote request is received by the Micro Integrator, the proxy service will read the **message payload** and first identify the parts of the message that are intended for each of the inventories. The Iterate mediator will then split the message and route the parts to the relevant inventories in the backend. These messages will be processed asynchronously. 

When the response messages are received from the backend, the Aggregate mediator will aggregate the responses into one and send to the client.

## Synapse configuration
    
Listed below are the synapse configurations (proxy service) for implementing this scenario. See the instructions on how to [build and run](#build-and-run) this example.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="SplitAggregateProxy" xmlns="http://ws.apache.org/ns/synapse" transports="https http" startOnLoad="true" trace="disable">
    <target>
        <inSequence>
            <iterate expression="//m0:getQuote/m0:request" preservePayload="true"
                     attachPath="//m0:getQuote"
                     xmlns:m0="http://services.samples">
                <target>
                    <sequence>
                        <header name="Action" scope="default" value="urn:getQuote"/>
                        <call>
                            <endpoint>
                                <address
                                    uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                            </endpoint>
                        </call>
                        <property name="enclose" scope="default">
                            <ns:Results xmlns:ns="http://services.samples" />
                        </property>
                        <aggregate>
                            <onComplete expression="$body/*[1]" enclosingElementProperty="enclose">
                                <respond/>
                            </onComplete>
                        </aggregate>
                    </sequence>
                </target>
            </iterate>
        </inSequence>
    </target>
</proxy>
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

    === "On MacOS/Linux/CentOS"   
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
                    <ax21:change>-2.531918592951604</ax21:change>
                    <ax21:earnings>-8.095104567449876</ax21:earnings>
                    <ax21:high>87.90735784009388</ax21:high>
                    <ax21:last>84.126411441337</ax21:last>
                    <ax21:lastTradeTimestamp>Thu Jul 04 14:15:41 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>87.41551849107691</ax21:low>
                    <ax21:marketCap>4.381845921997943E7</ax21:marketCap>
                    <ax21:name>SUN Company</ax21:name>
                    <ax21:open>-82.79419834819562</ax21:open>
                    <ax21:peRatio>23.20493126556557</ax21:peRatio>
                    <ax21:percentageChange>-2.735192964021126</ax21:percentageChange>
                    <ax21:prevClose>92.568189018347</ax21:prevClose>
                    <ax21:symbol>SUN</ax21:symbol>
                    <ax21:volume>16749</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
            <ns:getQuoteResponse>
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>3.952584440843535</ax21:change>
                    <ax21:earnings>12.355822293270984</ax21:earnings>
                    <ax21:high>150.90185607753006</ax21:high>
                    <ax21:last>146.84858787406628</ax21:last>
                    <ax21:lastTradeTimestamp>Thu Jul 04 14:15:41 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>-144.7928057555438</ax21:low>
                    <ax21:marketCap>5.863608391753769E7</ax21:marketCap>
                    <ax21:name>IBM Company</ax21:name>
                    <ax21:open>152.10742941332884</ax21:open>
                    <ax21:peRatio>24.20098513191582</ax21:peRatio>
                    <ax21:percentageChange>2.351343942072148</ax21:percentageChange>
                    <ax21:prevClose>168.09894844053636</ax21:prevClose>
                    <ax21:symbol>IBM</ax21:symbol>
                    <ax21:volume>18577</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
        </ns:Results>
    </soapenv:Body>
</soapenv:Envelope>
```
