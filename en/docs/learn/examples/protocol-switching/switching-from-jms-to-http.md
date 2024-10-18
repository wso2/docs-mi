# How to Switch from JMS to HTTP(S)

This example demonstrates how the Micro Integrator receives messages over the JMS transport and forwards them over an HTTP/S transport. In this sample, the client sends a request message to the proxy service exposed in JMS. The Micro Integrator forwards this message to the HTTP endpoint and returns the reply to the client through a JMS temporary queue.

## Synapse configuration

Following are the integration artifacts (proxy service) that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="JMStoHTTPStockQuoteProxy" startOnLoad="true" transports="jms"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property action="set" name="OUT_ONLY" value="true" />
                <call>
                    <endpoint key="SimpleStockQuoteService" />
                </call>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.jms.ContentType">
            <rules>
                <jmsProperty>contentType</jmsProperty>
                <default>text/xml</default>
            </rules>
        </parameter>
        <parameter name="transport.jms.Destination">Queue1</parameter>
        <parameter name="transport.jms.ConnectionFactory">myQueueListener</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

## Build and Run

Create the artifacts:

{!includes/build-and-run.md!}.
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.
5. Start the selected message broker and create a queue named <strong>Queue1</strong>. 
6. [Configure MI with the selected message broker]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq) and start the Micro-Integrator.

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal and navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:
  
    === "On MacOS/Linux" 
          ```bash 
          sh axis2server.sh
          ```
    === "On Windows"
          ```bash 
          axis2server.bat
          ```

Publish the following XML message to the Queue1.
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   	<m0:placeOrder xmlns:m0="http://services.samples">
	    <m0:order>
	        <m0:price>172.23182849731984</m0:price>
	        <m0:quantity>18398</m0:quantity>
	        <m0:symbol>IBM</m0:symbol>
	    </m0:order>
	</m0:placeOrder>
   </soapenv:Body>
</soapenv:Envelope>
```
