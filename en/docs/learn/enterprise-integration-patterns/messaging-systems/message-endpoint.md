# Message Endpoint

The Message Endpoint EIP encapsulates the messaging system from the rest of the application and customizes a general messaging API for a specific application and task. Therefore, you can change the message API just by changing the endpoint code. This improves the maintainability of applications.

!!! info 
    For more information, see the [Message Endpoint](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageEndpoint.html) documentation.

## Sample scenario

The example scenario depicts how a stock quote is generated when a request is sent to the ESB profile of WSO2 EI. The sender sends the request to the ESB profile, where the request is then diverted to the Stock Quote service. 

![Message endpoint pattern]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-endpoint-pattern.png)

## Synapse configurations of the artifacts

!!! note
    When you unzip the ZIP file you download below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/synapse-config` directory. For more information about these artifacts, go to WSO2 EI Documentation.

**Proxy Service**

```
<proxy name="message-endpoint-proxy" startOnLoad="true" transports="http https"
    xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
            <!-- Sends the message to the specified service -->
            <send>
                <endpoint>
                    <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
            </send>
        </inSequence>
        <outSequence>
            <respond/>
        </outSequence>
        <faultSequence/>
    </target>
</proxy>
```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Start the backend (`SimpleStockQuoteService`) service

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Server/src/SimpleStockQuoteService` directory, and execute the ant command.

    For more information on the SimpleStockQuoteService, go to Deploying sample backend services in the WSO2 EI Documentation.

4. Start one Axis2 server instance

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2server` directory, and execute the following commands:

    === "On Windows"
          axis2server.bat
    === "On Linux/Solaris"
          ./axis2server.sh

5. Download the artifacts of the sample

    Download the `Message-Endpoint.zip` file.

6. Import the artifacts to WSO2 EI

    Click File -> Import -> WSO2 -> Existing WSO2 projects into workspace to import the downloaded ZIP file via WSO2 EI Tooling.

7. Start the ESB profile of the WSO2 EI server

    For instructions, go to Running WSO2 Enterprise Integrator via Tooling in the WSO2 EI Documentation.

8. Start SOAP UI

    For instructions on downloading and starting, go to SOAP UI.

## Execute the sample

Send the following request to the ESB Profile using SOAP UI (or any other SOAP client).

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

After sending the request to the ESB profile of WSO2 EI through the client, the Stock Quote service will receive the inventory and log a message. The following output will be printed on the Axis2 server's Console, confirming that  the request is successfully received by the back-end service.

```

```

You can view the response in the SOAP UI as follows. 

![Message endpoint output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-endpoint-output.png)
