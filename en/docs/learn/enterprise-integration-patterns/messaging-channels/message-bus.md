# Message Bus

This page explains how you can implement a sample scenario of Message Bus EIP using WSO2 Micro Integrator.

## Introduction to Message Bus

The Message Bus EIP enables separate applications to work together in a decoupled manner so that applications can be easily added or removed without affecting each other. This approach makes maintenance and testing smoother since editing or removing an application will not affect the functionality of any other application. 

!!! info 
    For more information, refer to the [Message Bus](http://www.eaipatterns.com/MessageBus.html) documentation.

![Message bus solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/message-bus-solution.gif)

## Sample scenario

This sample scenario demonstrates how application logic is layered, and how each component of the application logic is separated as a mediator, allowing message processing to be executed in a decoupled manner. The mediation process is explained in the [Mediation Sequences]({{base_path}}/reference/mediation-sequences/) documentation.

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="MessageBusProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <filter regex=".*/StockQuote.*" source="get-property('To')">
                    <then>
                        <call>
                            <endpoint key="SimpleStockQuoteServiceEp"/>
                        </call>
                    </then>
                    <else>
                        <drop/>
                    </else>
                </filter>
                <respond/>
            </inSequence>
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

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the [backend service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).

4. Extract the downloaded zip file.

5. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.

6. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ``` 

7. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/MessageBus.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]("{{base_path}}/develop/deploy-artifacts/#build-and-run") Documentation.


## Execute the sample

Send the following request to the service.

```
POST http://localhost:8290/services/MessageBusProxy/StockQuote
Content-type: text/xml;charset=UTF-8
soapAction: urn:getQuote

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

## Analyze the output

According to the configuration above, the service routes an incoming message to a backend server if the conditions specified in the filter section are met. Notice how the application's logic is decoupled. It uses one component for filtering, and another to send a message to the endpoint. If you were to decide to remove the filtering step, you could remove the filter mediator segment from the XML without affecting the application's logic for sending the message to the backend server.
