# Service Activator

This page explains how you can implement a sample scenario of Service Activator EIP using WSO2 Micro Integrator.

## Introduction to Service Activator

The Service Activator EIP allows an application to design a service to be invoked both via various messaging technologies and non-messaging techniques. Service Activator interfaces methods and services in the back-end service layer so that the back-end services can be filtered and displayed to the client. 

!!! info
    For more information, see the [Service Activator](http://www.eaipatterns.com/MessagingAdapter.html) documentation.

![Messaging adapter solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/messaging-adapter-solution.gif)

## Sample scenario

This sample scenario demonstrates how WSO2 MI can be used to activate only a specific number of services on a back-end Axis2 server. Using the publishWSDL property, the service WSDL file is modified to filter out only a specific number of services. The ability of the WSO2 MI to create proxy services allows the client to invoke the proxy instead of invoking the service directly on the Axis2 server.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/service-activator.png" style="width: 70%;" alt="Service activator">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Service Activator EIP by comparing their core components.

| Service Activator EIP             | Service Activator Sample Scenario             |
|-----------------------------------|-----------------------------------------------|
| Requestor                         | Simple Stock Quote Client                     |
| Service Activator                 | Proxy Service                                 |
| Replier                           | Simple Stock Quote Service                    |



## Synapse configuration of the artifacts

=== "Proxy Service"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="ServiceActivatorProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
         <target>
            <inSequence>
                  <call>
                     <endpoint key="StockQuoteServiceEP"/>
                  </call>
                  <respond/>
            </inSequence>
            <faultSequence>
                  <log level="full">
                     <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
                     <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
                     <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
                  </log>
                  <drop/>
            </faultSequence>
         </target>
         <publishWSDL uri="project_path/src/main/wso2mi/resources/sample_proxy_1.wsdl" preservePolicy="true"/>
      </proxy>
      ```
=== "Endpoint"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <endpoint name="StockQuoteServiceEP" xmlns="http://ws.apache.org/ns/synapse">
         <address uri="http://localhost:9000/services/SimpleStockQuoteService">
         </address>
      </endpoint>
      ```

!!! Note
   Replace `project_path` with the extracted path of your project folder. This way, the `publishWSDL` URI will be the absolute path to the `sample_proxy_1.wsdl` file.

### How the implementation works

Let's break down the key components of the configuration:

- **Proxy** - The proxy service creates a virtual service between the real back-end service and a requestor.
- **publishWSDL** - By default, a proxy service defines a one-to-one mapping of the back-end service interface in the form of a WSDL file that requestors can use to connect to the proxy service. By using the publishWSDL mediator, the proxy service can publish a custom interface. In this example, the publishWSDL mediator is used to provide access only to a subset of all the service methods available to the back-end service. 

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/service-activator.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

## Execute the sample

Send the following requests to the service using SoapUI (or any other SOAP client):

```xml
   POST http://localhost:8290/services/ServiceActivatorProxy

   Accept-Encoding: gzip,deflate
   Content-Type: text/xml;charset=UTF-8
   SOAPAction: "urn:getQuote"
   Connection: Keep-Alive
      
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
      <soapenv:Header/>
      <soapenv:Body>
         <ser:getQuote>
            <ser:request>
               <ser:symbol></ser:symbol>
            </ser:request>
         </ser:getQuote>
      </soapenv:Body>
   </soapenv:Envelope>
```

## Analyze the output

Browse `http://localhost:9000/services/SimpleStockQuoteService?wsdl`. The back-end service `StockQuoteService` offers the following services:

- `getFullQuote`
- `getMarketActivity`
- `getQuote`
- `getSimpleQuote`
- `placeOrder`

Only some of the back-end features will be published through the Service Activator Proxy. Browse `http://localhost:8290/services/ServiceActivatorProxy?wsdl` to view the services offered through the `ServiceActivatorProxy`, and note that services `getMarketActivity` and `getSimpleQuote` are not available. Others are available and active.
