# Routing Based on Message Headers

This example scenario uses an inventory of stocks as the back-end service. A proxy service is configured in the Micro Integrator to use separate mediation sequences for processing request messages with different **message headers**. 

When a stock quote request is received, the Micro Integrator will read the **request header** and then route the message to the relevant mediation sequence for processing. The relevant sequence will forward the message to the backend, receive the response, process it, and return it to the client.
    
## Synapse configuration
    
Listed below are the synapse configurations for implementing this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="HeaderBasedRoutingProxy" transports="https http" startOnLoad="true" trace="disable">
       <target>
          <!-- When a request arrives the following sequence will be followed -->
          <inSequence>
             <switch xmlns:ns="http://org.apache.synapse/xsd" source="get-property('transport','CustomHeader')">
                <case regex="application/json">
                   <log level="custom">
                      <property name="'CustomHeader'" value="application/json" />
                   </log>
                   <sequence key="sequence1" />
                </case>
                <case regex="text/xml">
                   <log level="custom">
                      <property name="'CustomHeader'" value="text/xml" />
                   </log>
                   <sequence key="sequence2" />
                </case>
                <default>
                   <log level="custom">
                      <property name="AcceptHeader" value="other" />
                   </log>
                   <sequence key="sequence3" />
                </default>
             </switch>
          </inSequence>
       </target>
    </proxy>
    ```
=== "Sequence 1"     
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="sequence1"> 
            <sequence key="send_seq"/> 
            <property name="messageType" value="application/json" scope="axis2"/>
            <respond/>
    </sequence>
    ```
=== "Sequence 2"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="sequence2"> 
            <sequence key="send_seq"/> 
            <property name="messageType" value="text/xml" scope="axis2"/>
            <respond/>
    </sequence>
    ```
=== "Sequence 3"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="sequence3"> 
            <sequence key="send_seq"/> 
            <respond/>
    </sequence>
    ```    
=== "Send Seq"     
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="send_seq"> 
        <header name="Action" scope="default" value="urn:getQuote"/>
        <call> 
          <endpoint name="simple">
           <address uri="http://localhost:9000/services/SimpleStockQuoteService"/> 
          </endpoint> 
        </call> 
    </sequence>
    ```   

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) and [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) with the configurations given above.
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

Invoke the proxy service:

- Send a request with the 'application/json' header and see that a JSON response is received.

    === "Request (application/json)"
        ```xml
        HTTP method: POST 
        Request URL: http://localhost:8290/services/HeaderBasedRoutingProxy
        Content-Type: text/xml;charset=UTF-8
        CustomHeader: application/json
        Message Body:
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
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
                            "change": 3.8274925074699615,
                            "earnings": 12.497082213279025,
                            "high": -161.41346745041102,
                            "last": 164.53738820320592,
                            "lastTradeTimestamp": "Mon Jul 01 16:12:23 IST 2024",
                            "low": -163.2629771689784,
                            "marketCap": -4291974.770736802,
                            "name": "IBM Company",
                            "open": 172.25384297431248,
                            "peRatio": 25.33375650150598,
                            "percentageChange": 2.156561954110794,
                            "prevClose": 177.4812219131509,
                            "symbol": "IBM",
                            "volume": 19678
                        }
                    }
                }
            }
        }
        ```

- Send a request with the 'text/xml' header and see that an XML response is received.

    === "Request (text/xml)"
        ```xml
        HTTP method: POST 
        Request URL: http://localhost:8290/services/HeaderBasedRoutingProxy
        Content-Type: text/xml;charset=UTF-8
        CustomHeader: text/xml
        Message Body:
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
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
        ```xml
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Header/>
            <soapenv:Body>
                <ns:getQuoteResponse xmlns:ns="http://services.samples">
                    <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                        <ax21:change>4.131871430984311</ax21:change>
                        <ax21:earnings>13.582164597035094</ax21:earnings>
                        <ax21:high>-160.71069227737433</ax21:high>
                        <ax21:last>162.56566544816462</ax21:last>
                        <ax21:lastTradeTimestamp>Mon Jul 01 16:19:44 IST 2024</ax21:lastTradeTimestamp>
                        <ax21:low>166.6876727232271</ax21:low>
                        <ax21:marketCap>3.630109155595136E7</ax21:marketCap>
                        <ax21:name>IBM Company</ax21:name>
                        <ax21:open>-161.08473734270993</ax21:open>
                        <ax21:peRatio>24.51306734205319</ax21:peRatio>
                        <ax21:percentageChange>-2.622518084027564</ax21:percentageChange>
                        <ax21:prevClose>-157.55359157099647</ax21:prevClose>
                        <ax21:symbol>IBM</ax21:symbol>
                        <ax21:volume>5552</ax21:volume>
                    </ns:return>
                </ns:getQuoteResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
