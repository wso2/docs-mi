# Pipes and Filters

This page explains how you can implement a sample scenario of Pipes and Filters EIP using WSO2 Micro Integrator.

## Introduction to Pipes and Filters EIP

The Pipes and Filters EIP breaks down a large task into smaller subsets of independent steps chained together. This is useful when a sequence of processing steps is required to perform a single event in an integration scenario. The main use case of this EIP is to maintain independence and flexibility between each processing step.

!!! info
    For more information, see the [Pipes and Filters](https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html) documentation.

## Sample scenario

The example scenario depicts how a stock quote request is sent from a client to a service (Stock Quote Service). The request is first received by the WSO2 MI, which transmits the request through the following filters:

* Check Username filter: to verify the username.
* Check User ID filter: to verify the user ID.

!!! note
    Filter Mediators are used in the service to verify the validity of the message (checking the username and user ID).

If the message meets the criteria of the first filter, it passes to the second filter. Once it passes the second filter, the service sends the stock quote request to the back-end service (Stock Quote Service) for processing.

![Pipes and filters]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters.png)

## Synapse configurations of the artifacts

!!! note
    When you unzip the ZIP file you downloaded below in step 7 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions]({{base_path}}/develop/intro-integration-development/).

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="pipes-and-filters-proxy" startOnLoad="true" transports="http https"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <!-- Will direct an incoming request to the specified sequence -->
                <sequence key="PipesAndFilters"/>
                <respond/>
            </inSequence>
        </target>
    </proxy>
    ```
=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="PipesAndFilters" trace="disable"
        xmlns="http://ws.apache.org/ns/synapse">
        <log level="full"/>
        <!-- Checks For the User Name -->
        <filter regex="UserName" source="//m0:credentials/m0:name"
            xmlns:m0="http://services.samples">
            <then>
                <filter regex="001" source="//m1:credentials/m1:id"
                    xmlns:m1="http://services.samples">
                    <then>
                        <call>
                            <endpoint key="StockService"/>
                        </call>
                    </then>
                    <else>
                        <drop/>
                    </else>
                </filter>
            </then>
            <else>
                <drop/>
            </else>
        </filter>
    </sequence>
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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/pipes-and-filters.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

## Execute the sample

Send the following request to the service using SoapUI (or any other SOAP client).

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples"
xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header>
    <ser:credentials>
          <ser:name>UserName</ser:name>
          <ser:id>001</ser:id>
      </ser:credentials>
   </soapenv:Header> 
   <soapenv:Body>
      <ser:getQuote>
         <ser:request>
            <xsd:symbol>msft</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

![Pipes and filters request]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters-request.png)

## Analyze the output

After sending the request to the service through the client, notice that the request is successfully generated in the Stock Quote server. The following output will be printed on the Axis2 server's Console, confirming that the request is successfully received by the back-end service.

```log
Tue Aug 06 10:35:01 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : msft
```

You can view the response in the SOAPUI as follows. 

![Pipes and filters soap output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters-soap-output.png)

!!! note

    If you send another request by changing the name or ID, the request fails as shown below.
    ![Pipes and filters failed output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters-failed-output.png)
