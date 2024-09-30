# Message Endpoint

This page explains how you can implement a sample scenario of Message Endpoint EIP using WSO2 Micro Integrator.

## Introduction to Message Endpoint EIP

The Message Endpoint EIP encapsulates the messaging system from the rest of the application and customizes a general messaging API for a specific application and task. Therefore, you can change the message API just by changing the endpoint code. This improves the maintainability of applications.

!!! info 
    For more information, see the [Message Endpoint](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageEndpoint.html) documentation.

## Sample scenario

The example scenario depicts how a stock quote is generated when a request is sent to the WSO2 MI. The sender sends the request to the WSO2 MI, where the request is then diverted to the Stock Quote service. 

![Message endpoint pattern]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-endpoint-pattern.png)

## Synapse configurations of the artifacts

!!! note
    When you unzip the ZIP file you downloaded below in step 7 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions](https://mi.docs.wso2.com/en/latest/develop/intro-integration-development/).

=== "Proxy Service"
    ```xml
    <proxy name="message-endpoint-proxy" startOnLoad="true" transports="http https"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <!-- Sends the message to the specified service -->
                <call>
                    <endpoint key="StockService"/>
                </call>
                <respond/>
            </inSequence>
        </target>
    </proxy>
    ```
=== "End Point"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockService" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/message-endpoint.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started]("https://www.soapui.org/getting-started/") Documentation.

## Execute the sample

Send the following request to the service using SoapUI (or any other SOAP client).

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>   
         <ser:request>         
            <xsd:symbol>foo</xsd:symbol>
         </ser:request>        
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

![Message endpoint request]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-endpoint-request.png)

## Analyze the output

After sending the request to the service through the client, notice that the request is successfully generated in the Stock Quote server.  The following output will be printed on the Axis2 server's Console, confirming that the request is successfully received by the backend service.

```log
Tue Aug 06 15:20:41 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : foo
```

You can view the response in the SOAPUI as follows. 

![Message endpoint output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-endpoint-output.png)
