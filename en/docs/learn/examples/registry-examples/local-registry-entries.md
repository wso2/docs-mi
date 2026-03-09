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

Use the following request and payload to invoke the service and analyze the mediation log on the WSO2 Integrator: MI's start-up console.

```xml
POST /services/MainProxy HTTP/1.1
Host: localhost:8290
User-Agent: curl/7.85.0
Accept: */*
ontent-Type: application/xml
Content-Length: 180

<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
    <soapenv:Body>
        <ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
            <ser:request>
                <xsd:symbol>IBM</xsd:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
</soapenv:Envelope>
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
        
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>4.191087083572446</ax21:change>
                <ax21:earnings>-9.952474232055817</ax21:earnings>
                <ax21:high>-72.8171065535778</ax21:high>
                <ax21:last>73.50526521380392</ax21:last>
                <ax21:lastTradeTimestamp>Wed Feb 19 14:51:56 IST 2025</ax21:lastTradeTimestamp>
                <ax21:low>76.57490051860815</ax21:low>
                <ax21:marketCap>4.566278143927491E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>-72.42408809905557</ax21:open>
                <ax21:peRatio>23.2031816177439</ax21:peRatio>
                <ax21:percentageChange>-6.010932770929779</ax21:percentageChange>
                <ax21:prevClose>-69.72440456897945</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>15961</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```