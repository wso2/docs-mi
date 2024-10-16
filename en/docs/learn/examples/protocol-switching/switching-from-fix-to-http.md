# How to Switch from FIX to HTTP

This example demonstrates how WSO2 Micro Integrator receives messages through FIX and forwards them through HTTP.

The Micro Integrator will forward the order request to a one-way `placeOrder` operation in the back-end service. Micro Integrator uses a simple XSLT Mediator to transform the incoming FIX to a SOAP message.

## Synapse configuration

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="FIXToHTTPProxy" startOnLoad="true" transports="fix" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full"/>
                <xslt key="{reg_path}/FIX_XSLT.xslt">
                </xslt>
                <log category="INFO" level="full"/>
                <header name="Action" action="set" scope="default" value="urn:placeOrder"/>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEp"/>
                </call>
                <log category="INFO" level="full"/>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.fix.AcceptorConfigURL">file:/{file_path}/fix-synapse.cfg</parameter>
        <parameter name="transport.fix.AcceptorMessageStore">file</parameter>
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
=== "FIX_XSLT"
    ```xml 
    <xsl:stylesheet version="2.0"
                    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                    xmlns:fn="http://www.w3.org/2005/02/xpath-functions">
        <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
        <xsl:template match="/">
            <m0:placeOrder xmlns:m0="http://services.samples">
                <m0:order>
                    <m0:price>
                        <xsl:value-of select="//message/body/field[@id='44']"/>
                    </m0:price>
                    <m0:quantity>
                        <xsl:value-of select="//message/body/field[@id='38']"/>
                    </m0:quantity>
                    <m0:symbol>
                        <xsl:value-of select="//message/body/field[@id='55']"/>
                    </m0:symbol>
                </m0:order>
            </m0:placeOrder>
        </xsl:template>
    </xsl:stylesheet>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Add the above XSLT as a registry resource. Refer [Creating a Registry Resource]({{base_path}}/develop/creating-artifacts/creating-registry-resources/) guide for further information. 
4. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
5. Download the FIX transport resources from [here](https://github.com/wso2-docs/WSO2_EI/tree/master/FIX-transport-resources) and change the `{file_path}` of the proxy with the downloaded location.
6. Change the `{reg_path}` with the XSLT registry location. 
6. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

[Enable the FIX transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-fix-transport) and start the Micro-Integrator.

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

Run the quickfixj **Banzai** sample application.

```bash
java -jar quickfixj-examples-banzai-2.3.1.jar
```

## Testing 

Send an order request from Banzai to Synapse. For example, Buy 1000 DELL @ $100. User has to send a "Limit" Order because price is a mandatory field for placeOrder operation.

<img src="{{base_path}}/assets/img/learn/fix-to-http.png" title="FIX order request" width="800" alt="FIX order request" />

We can see the transformed SOAP message logged as follows. 

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <m0:placeOrder xmlns:m0="http://services.samples" xmlns:fn="http://www.w3.org/2005/02/xpath-functions">
            <m0:order>
                <m0:price>100</m0:price>
                <m0:quantity>1000</m0:quantity>
                <m0:symbol>DELL</m0:symbol>
            </m0:order>
        </m0:placeOrder>
    </soapenv:Body>
</soapenv:Envelope>
```

In the axis2server, the accepted order will be as follows:

```
Tue Jul 16 10:20:23 IST 2024 samples.services.SimpleStockQuoteService  :: Accepted order #1 for : 1000 stocks of DELL at $ 100.0
```

