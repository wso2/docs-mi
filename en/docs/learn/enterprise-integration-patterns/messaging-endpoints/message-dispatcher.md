# Message Dispatcher

This page explains how you can implement a sample scenario of Message Dispatcher EIP using WSO2 Micro Integrator.

## Introduction to Message Dispatcher

The Message Dispatcher EIP consumes messages from a single channel and distributes them among performers. It allows multiple consumers on a single channel to coordinate their message processing. 

!!! info
    For more information, see the [Message Dispatcher](http://www.eaipatterns.com/MessageDispatcher.html) documentation.

![Message dispatcher]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/message-dispatcher.gif)

## Sample scenario

This sample scenario demonstrates how to distribute messages among performers using the weighted load balance mediator. We have several Axis2 server instances, each considered to be a performer.

The diagram below depicts how to simulate the sample scenario using the WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/message-dispatcher.png" style="width: 70%;" alt="Message dispatcher">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Message Dispatcher EIP by comparing their core components.

| Message Dispatcher EIP            | Message Dispatcher Sample Scenario            |
|-----------------------------------|-----------------------------------------------|
| Sender                            | Simple Stock Quote Client                     |
| Messages                          | Simple Stock Quote Requests                   |
| Message Dispatcher                | Message Endpoint, Load-Balance Endpoint       |
| Performers                        | Simple Stock Quote Server Instance            |

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
        <loadbalance algorithm="org.apache.synapse.endpoints.algorithms.WeightedRoundRobin">
                <endpoint>
                    <address uri="http://localhost:9000/services/SimpleStockQuoteService/"/>
                    <property name="loadbalance.weight" value="1"/>
                </endpoint>
                <endpoint>
                    <address uri="http://localhost:9001/services/SimpleStockQuoteService/"/>
                    <property name="loadbalance.weight" value="2"/>
                </endpoint>
                <endpoint>
                    <address uri="http://localhost:9002/services/SimpleStockQuoteService/"/>
                    <property name="loadbalance.weight" value="3"/>
                </endpoint>
        </loadbalance>
    </endpoint>
    ```

### How the implementation works

Let's explore the elements of the configuration:

- **Proxy Service**: The `StockQuoteProxy` proxy service handles incoming requests, forwarding them to a load-balanced set of back-end services.

- **InSequence**: Processes the incoming message by invoking the `LoadBalanceEP` endpoint using the `call` mediator, then immediately responds to the client using the `respond` mediator.

- **FaultSequence**: Manages errors by logging detailed fault information and dropping the message.

- **Load Balance Endpoint**: 
    - **Endpoint**: Specifies multiple back-end service endpoints that will process the requests.
    - **LoadBalance**: Distributes requests across the endpoints using a Weighted Round-Robin algorithm, where each endpoint has a different weight (`1`, `2`, `3`), controlling the proportion of requests each endpoint receives.

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/message-dispatcher.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

12. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.
   
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
                <xsd:symbol>s</xsd:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

## Analyze the output

!!! Note 
      In each `tcpmon` tab and Axis Server console that the requests are distributed among several servers in a weighted manner. Servers running on port `9000`, `9001`, and `9002` receive the request in that order until the process starts over again in a round-robin manner.

