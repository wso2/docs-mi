# Switching from UDP to HTTP/S

This example demonstrates how WSO2 Micro Integrator receives SOAP messages over UDP and forwards them over HTTP.

## Synapse configuration

Following are the integration artifacts (proxy service) that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="StockQuoteProxy" startOnLoad="true" transports="udp" xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
            <log level="full"/>
            <property name="OUT_ONLY" value="true"/>
            <call>
                <endpoint>
                    <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
            </call>
        </inSequence>
    </target>
    <publishWSDL key="conf:UDP_WSDL/sample_proxy_1.wsdl" preservePolicy="true"/>
    <parameter name="transport.udp.port">9999</parameter>
    <parameter name="transport.udp.contentType">text/xml</parameter>
</proxy>
```

## Build and Run

Create the artifacts:

1. [Set up WSO2 Integration Studio]({{base_path}}/develop/installing-wso2-integration-studio).
2. [Create an integration project]({{base_path}}/develop/create-integration-project) with an <b>ESB Configs</b> module and an <b>Composite Exporter</b>.
3. Add [sample_proxy_1.wsdl](https://github.com/wso2-docs/WSO2_EI/blob/master/samples-protocol-switching/sample_proxy_1.wsdl) as a [registry resource]({{base_path}}/develop/creating-artifacts/creating-registry-resources) (change the registry path of the proxy accordingly). 
    1. Download [sample_proxy_1.wsdl](https://github.com/wso2-docs/WSO2_EI/blob/master/samples-protocol-switching/sample_proxy_1.wsdl)
    2. Add a registry resource. 
        <img src="{{base_path}}/assets/img/learn/samples/add-registry-resource.png" title="Add registry resource" width="800" alt="Add registry resource"/>
        1. Click on `+` sign next to `Registry`.
        2. Select `Import from the file system`.
        3. Goto `Browse file` and select the downloaded file. 
        4. Provide artifact name, registry type, and registry path as in the figure.
        5. Create the registry resource. 
4. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service:

* Download the [back-end service](
https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
* Extract the downloaded zip file.
* Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
* Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ```

[Enable the UDP transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-udp-transport) and start the Micro-Integrator.

Send the following message via UDP to the UDP listener port (9999).
```xml
<?xml version='1.0' encoding='utf-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>udp://localhost:9999/services/StockQuoteProxy</wsa:To>
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
In Linux, we can save the above request in a <strong>request.xml</strong> file and use netcat to send the UDP request. 

```bash
nc -u localhost 9999 < request.xml
```
