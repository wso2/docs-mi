# How to Break Complex Flows into Multiple Sequences
This sample demonstrates how a complex sequence can be separated into a set of simpler sequences. In this sample, you will send a simple request to a back-end service (Stock Quote service) and receive a response. If you look at the sample's XML configuration, you will see how this mediation is performed by several sequence definitions instead of one main sequence.

## Synapse configuration

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

- Proxy service:
  ```xml
  <proxy xmlns="http://ws.apache.org/ns/synapse" name="SequenceBreakdownSampleProxy" startOnLoad="true" transports="http https">
        <description/>
        <target inSequence="StockQuoteSeq"/>
  </proxy>
  ```

- Mediation sequences:

    === "Sequence 1"
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteSeq" onError="StockQuoteErrorSeq">
            <log level="custom">
                <property name="Sequence" value="StockQuoteSeq"/>
                <property name="Description" value="Request recieved"/>
            </log>
            <sequence key="CallStockQuoteSeq"/>
            <sequence key="TransformAndRespondSeq"/>
        </sequence>
        ```
    === "Sequence 2"        
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteErrorSeq">
            <log level="custom">
                <property name="Description" value="Error occurred in StockQuoteErrorSeq"/>
                <property name="Status" value="ERROR"/>
            </log>
        </sequence>
        ```
    === "Sequence 3"        
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="TransformAndRespondSeq" onError="TransformAndRespondErrorSeq">
            <log level="custom">
                <property name="Sequence" value="TransformAndRespondSeq"/>
                <property name="Description" value="Response is ready to be transformed"/>
            </log>
            <payloadFactory media-type="xml">
                <format>
                    <Information xmlns="">
                        <Name>$1</Name>
                        <Last>$2</Last>
                        <High>$3</High>
                        <Low>$4</Low>
                    </Information>
                </format>
                <args>
                    <arg evaluator="xml" xmlns:m0="http://services.samples/xsd" expression="//m0:name"/>
                    <arg evaluator="xml" xmlns:m0="http://services.samples/xsd" expression="//m0:last"/>
                    <arg evaluator="xml" xmlns:m0="http://services.samples/xsd" expression="//m0:low"/>
                    <arg evaluator="xml" xmlns:m0="http://services.samples/xsd" expression="//m0:high"/>
                </args>
            </payloadFactory>
            <log level="custom">
                <property name="Sequence" value="TransformAndRespondSeq"/>
                <property name="Description" value="Responding back to the client with the transformed response"/>
            </log>
            <respond/>
        </sequence>
        ```
    === "Sequence 4"         
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="TransformAndRespondErrorSeq">
            <log level="custom">
                <property name="Description" value="Error occurred in TransformAndRespondSeq"/>
                <property name="Status" value="ERROR"/>
            </log>
        </sequence>
        ```
    === "Sequence 5"         
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="CallStockQuoteErrorSeq">
              <log level="custom">
                  <property name="Description" value="Error occurred in CallStockQuoteSeq"/>
                  <property name="Status" value="ERROR"/>
              </log>
        </sequence>
        ```
    === "Sequence 6"           
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="CallStockQuoteSeq" onError="CallStockQuoteErrorSeq">
            <switch source="//ns:symbol" xmlns:ns="http://org.apache.synapse/xsd">
                <case regex="IBM">
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Calling IBM endpoint"/>
                    </log>
                    <call blocking="true">
                        <endpoint>
                            <http method="GET" uri-template="http://localhost:8290/stockquote/view/IBM"/>
                        </endpoint>
                    </call>
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Response received from IBM endpoint"/>
                    </log>
                </case>
                <case regex="GOOG">
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Calling GOOG endpoint"/>
                    </log>
                    <call blocking="true">
                        <endpoint>
                            <http method="GET" uri-template="http://localhost:8290/stockquote/view/GOOG"/>
                        </endpoint>
                    </call>
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Response received from GOOG endpoint"/>
                    </log>
                </case>
                <case regex="AMZN">
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Calling AMZN endpoint"/>
                    </log>
                    <call blocking="true">
                        <endpoint>
                            <http method="GET" uri-template="http://localhost:8290/stockquote/view/AMZN"/>
                        </endpoint>
                    </call>
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Response received from AMZN endpoint"/>
                    </log>
                </case>
                <default>
                    <log level="custom">
                        <property name="Sequence" value="CallStockQuoteSeq"/>
                        <property name="Description" value="Invalid Symbol"/>
                        <property name="Status" value="ERROR"/>
                    </log>
                    <drop/>
                </default>
            </switch>
        </sequence>
        ```

- REST API, which calls the back-end service.

=== "REST API"
     ```xml
     <api xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteAPI" context="/stockquote">
             <resource methods="GET" uri-template="/view/{symbol}">
                 <inSequence>
                 <payloadFactory media-type="xml">
                     <format>
                         <m0:getQuote xmlns:m0="http://services.samples">
                             <m0:request>
                             <m0:symbol>$1</m0:symbol>
                             </m0:request>
                         </m0:getQuote>
                     </format>
                     <args>
                         <arg evaluator="xml" expression="${properties.uri.var.symbol}"/>
                     </args>
                 </payloadFactory>
                 <header name="Action" scope="default" value="urn:getQuote"/>
                 <call>
                    <endpoint key="SimpleStockQuoteService"/>
                 </call>
                 <respond/>
                </inSequence>
                <faultSequence/>
            </resource>
     </api>
     ```
=== "Endpoint"
     ```xml
     <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
     </endpoint>
     ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), the [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences), and the [REST API ]({{base_path}}/develop/creating-artifacts/creating-an-api) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.

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

Send a request to invoke the service:
```xml
POST http://localhost:8290/services/SequenceBreakdownSampleProxy.SequenceBreakdownSampleProxyHttpSoap11Endpoint HTTP/1.1
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:mediate"


<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header />
   <soapenv:Body>
      <placeOrder xmlns="http://org.apache.synapse/xsd">
         <order>
            <price>50</price>
            <quantity>10</quantity>
            <symbol>IBM</symbol>
         </order>
      </placeOrder>
   </soapenv:Body>
</soapenv:Envelope>
```

You will receive the following response:

```xml
HTTP/1.1 200 OK
SOAPAction: "urn:mediate"
Host: Chanikas-MacBook-Pro.local:8290
Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
Date: Wed, 02 Oct 2019 10:01:25 GMT
Transfer-Encoding: chunked
Connection: Keep-Alive

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <Information>
         <Name>IBM Company</Name>
         <Last>69.75734480144942</Last>
         <High>-69.47003220786323</High>
         <Low>72.09188473048964</Low>
      </Information>
   </soapenv:Body>
</soapenv:Envelope>
```
