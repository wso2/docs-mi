# How to Route Requests Based on Message Payloads

This example scenario uses a back-end service with two stock quote inventories (IBM and MSFT). A proxy service is configured in the Micro Integrator to use separate mediation sequences for processing request messages with different **payloads**. 

When a stock quote request is received, the Micro Integrator will read the **message payload** (content) and then route the message to the relevant mediation sequence for processing. The sequence will forward the message to the relevant stock quote inventory in the backend, receive the response, process it, and return it to the client.
    
## Synapse configuration
    
Listed below are the synapse configurations (proxy service) for implementing this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="ContentBasedRoutingProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <switch source="$body//ser:getQuote/ser:request/xsd:symbol" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
                    <case regex="IBM">
                        <sequence key="sequence1"/>
                    </case>
                    <case regex="MSFT">
                        <sequence key="sequence2"/>
                    </case>
                    <default>
                        <log category="INFO" level="custom">
                            <property name="Error" expression="fn:concat('Invalid request for symbol - ', //ser:getQuote/ser:request/xsd:symbol)"/>
                        </log>
                    </default>
                </switch>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Sequence 1"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="sequence1" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <sequence key="send_seq"/>
        <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
        <respond/>
    </sequence>
    ```
=== "Sequence 2"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="sequence2" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <sequence key="send_seq"/>
        <property name="messageType" scope="axis2" type="STRING" value="text/xml"/>
        <respond/>
    </sequence>
    ```   
=== "Send Seq"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="send_seq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <header name="Action" action="set" scope="default" value="urn:getQuote"/>
        <call>
            <endpoint key="SimpleStockQuoteServiceEp"/>
        </call>
    </sequence>
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

Invoke the proxy service:

- Send a request to get the IBM stock quote and see that a JSON response is received with the IBM stock quote.

    === "Request"
        ```xml
        HTTP method: POST 
        Request URL: http://localhost:8290/services/ContentBasedRoutingProxy
        Content-Type: text/xml;charset=UTF-8
        Message Body:
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
          <soapenv:Header/>
          <soapenv:Body>
             <ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
                <ser:request>
                   <xsd:symbol>IBM</xsd:symbol>
                </ser:request>
             </ser:getQuote>
          </soapenv:Body>
        </soapenv:Envelope>
        ```
    === "Response"        
        ```json
        {
            "Envelope": {
                "Header": null,
                "Body": {
                    "getQuoteResponse": {
                        "return": {
                            "@type": "ax21:GetQuoteResponse",
                            "change": 4.418798707278302,
                            "earnings": 12.45093399022414,
                            "high": 168.13771759203115,
                            "last": 163.47334517802744,
                            "lastTradeTimestamp": "Wed Jul 03 20:54:49 IST 2024",
                            "low": -161.50688678590913,
                            "marketCap": -1473008.7246540487,
                            "name": "IBM Company",
                            "open": 170.41169322638817,
                            "peRatio": 23.793211892043292,
                            "percentageChange": 2.4421226150197826,
                            "prevClose": 180.9409028073108,
                            "symbol": "IBM",
                            "volume": 5987
                        }
                    }
                }
            }
        }
        ```

- Send a request to get the MSFT stock quote and see that an XML response is received with the MSFT stock quote.

    === "Request"
        ```xml
        HTTP method: POST 
        Request URL: http://localhost:8290/services/ContentBasedRoutingProxy
        Content-Type: text/xml;charset=UTF-8
        Message Body:
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
          <soapenv:Header/>
          <soapenv:Body>
             <ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
                <ser:request>
                   <xsd:symbol>MSFT</xsd:symbol>
                </ser:request>
             </ser:getQuote>
          </soapenv:Body>
        </soapenv:Envelope>
        ```
    === "Response"        
        ```xml
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Header/>
            <soapenv:Body>
                <ns:getQuoteResponse xmlns:ns="http://services.samples">
                    <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                        <ax21:change>-2.528287483710473</ax21:change>
                        <ax21:earnings>13.431609160481447</ax21:earnings>
                        <ax21:high>-75.13700429778517</ax21:high>
                        <ax21:last>76.83898629121823</ax21:last>
                        <ax21:lastTradeTimestamp>Wed Jul 03 21:07:48 IST 2024</ax21:lastTradeTimestamp>
                        <ax21:low>80.58269030360869</ax21:low>
                        <ax21:marketCap>-9230708.531429557</ax21:marketCap>
                        <ax21:name>MSFT Company</ax21:name>
                        <ax21:open>79.72238912842184</ax21:open>
                        <ax21:peRatio>25.533000687552736</ax21:peRatio>
                        <ax21:percentageChange>-2.963224683980784</ax21:percentageChange>
                        <ax21:prevClose>85.32216599633553</ax21:prevClose>
                        <ax21:symbol>MSFT</ax21:symbol>
                        <ax21:volume>15388</ax21:volume>
                    </ns:return>
                </ns:getQuoteResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
