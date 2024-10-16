# How to Transform a JSON Message to SOAP

Let's consider a scenario where you have a SOAP-based backend and a JSON client. The SOAP backend is exposed as a REST API in the Micro Integrator. 

When the JSON client sends a message to the SOAP backend, the REST API in the Micro Integrator should convert the JSON message to SOAP. The backend will process the SOAP request and generate a response for the JSON client. The Micro Integrator should then convert the SOAP response back to JSON and return it to the client.

The following examples explain different methods of converting JSON messages to SOAP using the Micro Integrator.

## Using the PayloadFactory mediator

Let's convert JSON messages to SOAP using the [PayloadFactory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator).

### Synapse configuration
Following is a sample REST API configuration that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run-example-1) this example.

=== "REST API"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/stockorder_api" name="JSONToSOAP" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET POST PUT">
            <inSequence>
                <payloadFactory media-type="xml" template-type="default">
                    <format>
                        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
                            <soapenv:Header/>
                            <soapenv:Body>
                                <ser:placeOrder>
                                    <ser:order>
                                        <xsd:symbol>$1</xsd:symbol>
                                        <xsd:price>$2</xsd:price>
                                        <xsd:quantity>$3</xsd:quantity>
                                    </ser:order>
                                </ser:placeOrder>
                            </soapenv:Body>
                        </soapenv:Envelope>
                    </format>
                    <args>
                        <arg expression="$.placeOrder.order.symbol" evaluator="json"/>
                        <arg expression="$.placeOrder.order.price" evaluator="json"/>
                        <arg expression="$.placeOrder.order.quantity" evaluator="json"/>
                    </args>
                </payloadFactory>
                <log category="INFO" level="full"/>
                <call>
                    <endpoint key="SimpleStockEp"/>
                </call>
                <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
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

### Build and run (example 1)

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create the REST API]({{base_path}}/develop/creating-artifacts/creating-an-api) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the backend service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote backend service:
 
    === "On MacOS/Linux"        
          ```bash 
          sh axis2server.sh
          ```
    === "On Windows"               
          ```bash  
          axis2server.bat
          ```

Invoke the REST API:

- HTTP method: `POST`
- Request URL: `http://localhost:8290/stockorder_api`
- Content-Type: `application/json`
- SoapAction: `urn:placeOrder`
- Message Body:
    ```json
    {
        "placeOrder": {
            "order": {
                "symbol": "IBM",
                "price": "3.141593E0",
                "quantity": "4"
            }
        }
    }
    ```

Check the log printed on the backend service's terminal to confirm that the order has been successfully placed.

```xml
Fri Aug 02 17:23:18 IST 2024 samples.services.SimpleStockQuoteService  :: Accepted order #1 for : 4 stocks of IBM at $ 3.141593
```

The JSON client will receive a 202 response from the backend confirming that the stock order has been received.

## Using the XSLT mediator

Let's convert JSON messages to SOAP using the [XSLT mediator]({{base_path}}/reference/mediators/xslt-mediator). The XSLT, which specifies the message conversion parameters, is stored in the product registry as a **local entry**.

### Synapse configuration
Following are the synapse configurations for implementing this scenario. See the instructions on how to [build and run](#build-and-run-example-2) this example.

=== "REST API"
    ```xml 
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/stockorder_api" name="Convert_JSON_To_Soap_Using_XSLT" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET POST">
            <inSequence>
                <log category="INFO" level="full"/>
                <xslt key="in_transform"/>
                <header name="Action" action="set" scope="default" value="urn:getQuote"/>
                <enrich>
                    <source clone="true" type="custom" xpath="//m0:getQuote" xmlns:m0="http://services.samples"/>
                    <target action="replace" type="body"/>
                </enrich>
                <call>
                    <endpoint key="SimpleStockEp"/>
                </call>
                <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
=== "Local Entry"    
    ```xml  
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="in_transform" xmlns="http://ws.apache.org/ns/synapse">
        <xsl:stylesheet exclude-result-prefixes="m0 fn" version="2.0" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:m0="http://services.samples" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:output indent="yes" method="xml" omit-xml-declaration="yes"/>
            <xsl:template match="*">
                <xsl:element name="{local-name()}" namespace="http://services.samples">
                    <xsl:copy-of select="attribute::*"/>
                    <xsl:apply-templates/>
                </xsl:element>
            </xsl:template>
        </xsl:stylesheet>
    </localEntry>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
        <address format="soap11" uri="http://localhost:9000/services/SimpleStockQuoteService">
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

### Build and run (example 2)

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create the REST API]({{base_path}}/develop/creating-artifacts/creating-an-api) with the configurations given above.
4. [Create a local entry]({{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries) named **in_transform** with the above XSLT configuration.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the backend service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash 
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash  
          axis2server.bat
          ```

Invoke the REST API:

- HTTP method: `POST`
- Request URL: `http://localhost:8290/stockorder_api`
- Content-Type: `application/json`
- SoapAction: `urn:getQuote`
- Message Body:
    ```json
    {
        "getQuote": {
            "request": {
                "symbol": "IBM"
            }
        }
    }
    ```

Check the log printed on the backend service's terminal to confirm that the request is successfully sent.

```xml
Thu Jul 04 09:57:03 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

The JSON client will receive the following response from the backend with the relevant stock quote:

```json
{
    "getQuoteResponse": {
        "return": {
            "@type": "ax21:GetQuoteResponse",
            "change": -2.7461458083948234,
            "earnings": -8.902403847737537,
            "high": -76.88947473390292,
            "last": 78.48339950126588,
            "lastTradeTimestamp": "Sat Aug 03 20:58:03 IST 2024",
            "low": -76.7346372667833,
            "marketCap": 35972151.03356741,
            "name": "IBM Company",
            "open": 82.08102633181527,
            "peRatio": 24.115603872309407,
            "percentageChange": 3.7576876965199992,
            "prevClose": -73.08073555282505,
            "symbol": "IBM",
            "volume": 16540
        }
    }
}
```