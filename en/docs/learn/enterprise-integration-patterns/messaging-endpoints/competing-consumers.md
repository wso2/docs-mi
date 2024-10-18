# Competing Consumers

This page explains how you can implement a sample scenario of Competing Consumers EIP using WSO2 Micro Integrator.

## Introduction to Competing Consumers

The Competing Consumers EIP relates to multiple consumers that compete with each other to receive a request from a given Point-to-Point Channel. In this pattern, requests are handled and delegated similar to how messages are handled in the Point-to-Point channel using the round-robin algorithm. 

!!! info
    For more information, see the [Competing Consumers](http://www.eaipatterns.com/CompetingConsumers.html).

![Competing consumers]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/competing-consumers.gif)

## Sample scenario

In this sample scenario, each Axis2 server instance acts as a consumer waiting for a specific message. When the client sends a message to WSO2 MI, it diverts the request based on the round-robin algorithm among the consumers. This way, the consumers receive a request message adhering to the conditions of the algorithm.

An alternative implementation to the Competing Consumers EIP is to use a Content-Based Router and route messages to different receivers based on the content of a message.

The diagram below depicts how to simulate the sample scenario using the WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/competing-consumers.png" style="width: 70%;" alt="Competing consumers">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Competing Consumers EIP by comparing their core components.

| Competing Consumers EIP            | Competing Consumers Sample Scenario                    |
|------------------------------------|--------------------------------------------------------|
| Sender                             | Simple Stock Quote Client                              |
| Messages                           | Simple Stock Quote Requests with Load-Balance Endpoint |
| Consumer/Receiver                  | Simple Stock Quote Server Instances                    |

## Synapse configuration of the artifacts

=== "Proxy Service"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="StockQuoteProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
         <target>
            <inSequence>
                  <call>
                     <endpoint key="LoadBalanceEP"/>
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
      </proxy>
      ```
=== "Load Balance Endpoint"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <endpoint name="LoadBalanceEP" xmlns="http://ws.apache.org/ns/synapse">
         <loadbalance algorithm="org.apache.synapse.endpoints.algorithms.RoundRobin">
            <endpoint>
                  <address uri="http://localhost:9000/services/SimpleStockQuoteService"></address>
            </endpoint>
            <endpoint>
                  <address uri="http://localhost:9001/services/SimpleStockQuoteService"></address>
            </endpoint>
            <endpoint>
                  <address uri="http://localhost:9002/services/SimpleStockQuoteService"></address>
            </endpoint>
         </loadbalance>
      </endpoint>
      ```

### How the implementation works

Let's explore the elements of the configuration:

- **Proxy Service**: The `StockQuoteProxy` proxy service receives requests and forwards them to the appropriate back-end services using a load-balancing mechanism.
  
- **InSequence**: Directs the incoming message to the `LoadBalanceEP` endpoint using the `call` mediator, and then immediately responds to the client with the `respond` mediator.
  
- **FaultSequence**: Handles errors by logging the full details of any faults and dropping the message.

- **Load Balance Endpoint**: 
    - **Endpoint**: Defines a group of back-end service endpoints that handle the requests.
    - **LoadBalance**: Distributes incoming requests across multiple endpoints using the Round-Robin algorithm, ensuring an even distribution of traffic among the services at `http://localhost:9000`, `http://localhost:9001`, and `http://localhost:9002`.



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

7. Navigate to the `MI_HOME/bin/` directory and start the `tcpmon` application. 

8. In `tcpmon` application, navigate to **Admin** tab. Add listeners to ports `9001` and `9002`. For each listener set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/competing-consumers.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, refer to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run).

12. Start SoapUI.

    For instructions on downloading and starting, refer to [SoapUI Getting Started](https://www.soapui.org/getting-started/).

## Execute the sample

1. Repeatedly send several requests using SoapUI (or any other Soap client).
    ```xml
    POST http://localhost:8290/services/StockQuoteProxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    SOAPAction: "urn:getQuote"
    Connection: Keep-Alive

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
    <soapenv:Body>
        <ser:getQuote>
            <ser:request>
                <xsd:symbol>IBM</xsd:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

## Analyze the output


!!! Note 
      In `tcpmon` tabs and Axis Server console that the requests are distributed among several servers. Each server is acting as a competing consumer.
