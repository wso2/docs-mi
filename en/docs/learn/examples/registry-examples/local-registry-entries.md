# How to Use Sequences and Endpoints as Local Entries
This sample demonstrates how sequences and endpoints can be fetched from a local entry.

## Synapse configurations

Following are the integration artifacts that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <proxy name="MainProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="direction" scope="default" type="STRING" value="incoming"/>
                <sequence key="stockquote"/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Sequence"    
    ```xml
    <sequence name="stockquote" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <!-- log the message using the custom log level. illustrates custom properties for log -->
        <log level="custom">
            <property name="Text" value="Sending quote request"/>
            <property expression="get-property('direction')" name="direction"/>
        </log>
        <!-- Call the real endpoint referenced by key "simple" endpoint definition -->
        <call>
            <endpoint key="simple"/>
        </call>
    </sequence>
    ```
=== "Endpoint"    
    ```xml
    <endpoint name="simple" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

## Build and run

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create sequence `stockquote` and endpoint `simple` as [local entries]({{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries) with the configurations given above.
3. Also, create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) `MainProxy` with the configuration given above.
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

Use the following request and payload to invoke the service and analyze the mediation log on the Micro Integrator's start-up console.

```xml
POST /services/MainProxy HTTP/1.1
Host: localhost:8290
User-Agent: curl/7.85.0
Accept: */*
ontent-Type: application/xml
Content-Length: 180

<ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
    <ser:request>
        <xsd:symbol>IBM</xsd:symbol>
    </ser:request>
</ser:getQuote>
```

You will see that the sequence and the endpoint are fetched from the local entry and that the property named `direction` (which was set by the proxy service) is logged by the sequence.

```
INFO {org.apache.synapse.mediators.builtin.LogMediator} - Text = Sending quote request, direction = incoming
```

You will get the following sample response:

```xml
HTTP/1.1 200 OK
Content-Type: application/xml; charset=UTF-8
Date: Tue, 02 Jul 2024 06:55:36 GMT
Transfer-Encoding: chunked

<ns:getQuoteResponse xmlns:ns="http://services.samples">
<ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
    <ax21:change>-2.2697098428306304</ax21:change>
    <ax21:earnings>13.026833862989434</ax21:earnings>
    <ax21:high>69.21072689664607</ax21:high>
    <ax21:last>67.17176636344576</ax21:last>
    <ax21:lastTradeTimestamp>Tue Jul 02 12:25:36 IST 2024</ax21:lastTradeTimestamp>
    <ax21:low>-66.19040627867486</ax21:low>
    <ax21:marketCap>5.701823203899602E7</ax21:marketCap>
    <ax21:name>IBM Company</ax21:name>
    <ax21:open>-66.56991575858342</ax21:open>
    <ax21:peRatio>-18.513042883210343</ax21:peRatio>
    <ax21:percentageChange>3.4493276334361993</ax21:percentageChange>
    <ax21:prevClose>-65.80151507873896</ax21:prevClose>
    <ax21:symbol>IBM</ax21:symbol>
    <ax21:volume>16115</ax21:volume>
</ns:return>
</ns:getQuoteResponse>
```