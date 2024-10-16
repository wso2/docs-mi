# How to Use Fault Sequences
WSO2 Micro Integrator provides fault sequences for dealing with errors. Whenever an error occurs, the mediation engine attempts to provide as much information as possible on the error to the user by initializing the following properties on the erroneous message:

-	ERROR_CODE
-   ERROR_MESSAGE
-   ERROR_DETAIL
-   ERROR_EXCEPTION

## Synapse configuration
Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy service"
    ```xml
    <proxy name="FaultTestProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <switch source="//m0:getQuote/m0:request/m0:symbol" xmlns:m0="http://services.samples">
                    <case regex="IBM">
                        <call>
                           <endpoint key="SimpleStockQuoteService" />
                        </call>
                    </case>
                    <case regex="MSFT">
                        <call>
                            <endpoint key="bogus"/>
                        </call>
                    </case>
                    <case regex="SUN">
                        <sequence key="sunSequence"/>
                    </case>
                </switch>
                <drop/>
            </inSequence>
            <faultSequence>
                <log level="custom">
                    <property name="text" value="An unexpected error occured"/>
                    <property name="message" expression="get-property('ERROR_MESSAGE')"/>
                </log>
                <drop/>
            </faultSequence>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
    
-   Mediation sequences:

    === "Error Handling Sequence with Logs"        
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="sunErrorHandler">
            <log level="custom">
                <property name="text" value="An unexpected error occured for stock SUN"/>
                <property name="message" expression="get-property('ERROR_MESSAGE')"/>
            </log>
            <drop/>
        </sequence>
        ```
    === "Error Handling Sequence"        
        ```xml
        <sequence xmlns="http://ws.apache.org/ns/synapse" name="sunSequence" onError="sunErrorHandler">
            <call>
                <endpoint key="sunPort"/>
            </call>
        </sequence>
        ```

Note how the `ERROR_MESSAGE` property is being used to get the error message text. Within the fault sequence, you can access these property values using
the `get-property` XPath function. The following log mediator logs the actual error message:

```xml
<log level="custom">  
    <property name="text" value="An unexpected error occured"/>
    <property name="message" expression="get-property('ERROR_MESSAGE')"/>
</log>
``` 



The following is a sample of the configurations to use the Fault sequence in an API. Make note of the "faultSequence" attribute in the "resource" element.

```xml
<api context="/testFault" name="FaultTestAPI">
    <resource faultSequence="fault" methods="POST" uri-template="/v1">
        <inSequence>
            <switch source="//m0:getQuote/m0:request/m0:symbol" xmlns:m0="http://services.samples">
                <case regex="IBM">
                    <call>
                        <endpoint key="SimpleStockQuoteService" />
                    </call>
                </case>
                <case regex="MSFT">
                    <call>
                        <endpoint key="bogus"/>
                    </call>
                </case>
                <case regex="SUN">
                    <sequence key="sunSequence"/>
                </case>
            </switch>
            <drop/>
        </inSequence>
    </resource>
</api>
```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), and the [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) with the configurations given above.
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

Send a request to invoke the proxy service:
```xml
POST http://localhost:8290/services/FaultTestProxy HTTP/1.1
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:mediate"

<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header />
   <soapenv:Body>
      <m0:getQuote xmlns:m0="http://services.samples">
         <m0:request>
            <m0:price>50</m0:price>
            <m0:quantity>10</m0:quantity>
            <m0:symbol>SUN</m0:symbol>
         </m0:request>
      </m0:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

The following line is logged:
```bash
INFO {org.apache.synapse.mediators.builtin.LogMediator} - text = An unexpected error occured for stock SUN, message = Couldn't find the endpoint with the key : sunPort
```
