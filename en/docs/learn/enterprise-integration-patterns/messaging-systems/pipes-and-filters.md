# Pipes and Filters

The Pipes and Filters EIP breaks down a large task into smaller subsets of independent steps that are chained together. This is useful when a sequence of processing steps are required to perform a single event in an integration scenario. The main use case of this EIP is to maintain independence and flexibility between each processing step.

!!! info
    For more information, see the [Pipes and Filters](https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html) documentation.

## Sample scenario

The example scenario depicts how a stock quote request is sent from a client to a service (Stock Quote Service). The request is first received by the ESB profile, which transmits the request through the following filters:

* Check Username filter: to verify the username.
* Check User ID filter: to verify the user ID.

!!! note
    Filter Mediators are used in the ESB, to verify the validity of the message (checking the username and user ID).

If the message meets the criteria of the first filter, it will be passed to the second filter. Once the request successfully passes through the second filter (i.e., the filtering criteria is fulfilled), the ESB sends the stock quote request to the back-end service (Stock Quote Service) for processing.

![Pipes and filters]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters.png)

## Synapse configurations of the artifacts

!!! note
    When you unzip the ZIP file you download below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/synapse-config` directory. For more information about these artifacts, go to WSO2 EI Documentation.

=== "Proxy Service"
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="pipes-and-filters-proxy" startOnLoad="true" transports="http https"
          xmlns="http://ws.apache.org/ns/synapse">
          <target>
              <inSequence>
                  <!-- Will direct an incoming request to the specified sequence -->
                  <sequence key="PipesAndFilters"/>
              </inSequence>
              <outSequence>
                  <respond/>
              </outSequence>
              <faultSequence/>
          </target>
      </proxy>
      ```
=== "Sequence"
      ```
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
                          <send>
                              <endpoint>
                                  <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                              </endpoint>
                          </send>
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

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Start the backend (SimpleStockQuoteService) service

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Server/src/SimpleStockQuoteService` directory, and execute the ant command.

    For more information on the `SimpleStockQuoteService`, go to Deploying sample backend services in the WSO2 EI Documentation.

4. Start one Axis2 server instance

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2server` directory, and execute the following commands:

    === "On Windows"
          axis2server.bat
    === "On Linux/Solaris"
          ./axis2server.sh  

5. Download the artifacts of the sample

    Download the `Pipes-and-Filters.zip` file.

6. Import the artifacts to WSO2 EI

    Click File -> Import -> WSO2 -> Existing WSO2 projects into workspace to import the downloaded ZIP file via WSO2 EI Tooling.

7. Start the ESB profile of the WSO2 EI server

    For instructions, go to Running WSO2 Enterprise Integrator via Tooling in the WSO2 EI Documentation.

8. Start SOAP UI

    For instructions on downloading and starting, go to SOAP UI.

## Execute the sample

Send the following request to the ESB Profile using SOAP UI (or any other SOAP client).

```
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

When you send the request, the ESB Profile receives the message first and then routes it to the back-end service (Stock Quote Service). The following output will be printed on the Axis2 server's Console, confirming that the request is successfully received by the back-end service.

```

```

You can view the response in the SOAP UI as follows. 

![Pipes and filters soap output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters-soap-output.png)

!!! note

    If you send another request by changing the name or ID, the request fails as shown below.
    ![Pipes and filters failed output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/pipes-and-filters-failed-output.png)
