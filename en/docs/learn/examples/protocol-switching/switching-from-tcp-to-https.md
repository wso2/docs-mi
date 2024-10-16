# How to Switch from TCP to HTTP/S

This example demonstrates how WSO2 Micro Integrator receives SOAP messages over TCP and forwards them over HTTP.

TCP is not an application layer protocol. Hence there are no application-level headers available in the requests. The Micro Integrator has to simply read the XML content coming through the socket and dispatch it to the right proxy service based on the information available in the message payload. The TCP transport is capable of dispatching requests based on addressing headers or the first element in the SOAP body. In this sample, we will get the sample client to send WS-Addressing headers in the request. Therefore, the dispatching will take place based on the addressing header values.

## Synapse configuration

Following are the integration artifacts (proxy service) that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" startOnLoad="true" transports="tcp" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full"/>
                <property name="OUT_ONLY" scope="default" type="BOOLEAN" value="true"/>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEp"/>
                </call>
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
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service.

* Download the [back-end service](
https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip)
* Extract the downloaded zip file.
* Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
* Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

[Enable the TCP transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-tcp-transport) and start the Micro-Integrator.

Send the following message via TCP to the TCP listener port.
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>tcp://localhost:6060/services/StockQuoteProxy</wsa:To>
        <wsa:ReplyTo>
            <wsa:Address>http://www.w3.org/2005/08/addressing/none</wsa:Address>
        </wsa:ReplyTo>
        <wsa:MessageID>urn:uuid:464d2e2a-cd47-4c63-a7c6-550c282a1e3c</wsa:MessageID>
        <wsa:Action>urn:placeOrder</wsa:Action>
    </soapenv:Header>
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
In Linux, we can save the above request in a `request.xml` file and use Netcat to send the TCP request. 
```
netcat localhost 6060 < request.xml
```

You will see the following response in the back-end service's console:

```bash
samples.services.SimpleStockQuoteService  :: Accepted order #1 for : 18398 stocks of IBM at $ 172.23182849731984
```
