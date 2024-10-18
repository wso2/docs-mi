# Point-to-Point Channel

This page explains how you can implement a sample scenario of Point-to-Point Channel EIP using WSO2 Micro Integrator.

## Introduction to Point-to-Point Channel

The Point-to-Point Channel EIP allows only a single receiver to consume a sent message when multiple receivers are waiting to consume it.

!!! info
    For more information, go to [Point-to-Point Channel](http://www.eaipatterns.com/PointToPointChannel.html). 

## Sample scenario

The sample scenario is an inventory for stocks. It illustrates how a stock quote is generated, which only a single consumer receives at a given time. The diagram below depicts how to simulate the sample scenario.

![Point-to-Point Channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/point-to-point.png)

## Synapse configurations of the artifacts

When you unzip the ZIP file you downloaded below in step 9 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions]({{base_path}}/develop/intro-integration-development/) Documentation.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="PointToPointProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <call>
                    <endpoint key="LoadBalanceEp"/>
                </call>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Load Balance Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="LoadBalanceEp" xmlns="http://ws.apache.org/ns/synapse">
        <loadbalance algorithm="org.apache.synapse.endpoints.algorithms.RoundRobin">
            <endpoint key="SimpleStockEp1"/>
            <endpoint key="SimpleStockEp2"/>
            <endpoint key="SimpleStockEp3"/>
        </loadbalance>
        <description></description>
    </endpoint>
    ```
=== "Endpoint 1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp1" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9001/services/SimpleStockQuoteService/">
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
=== "Endpoint 2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp2" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9002/services/SimpleStockQuoteService/">
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
=== "Endpoint 3"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp3" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9003/services/SimpleStockQuoteService/">
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

7. Navigate to the `MI_HOME/bin/` directory and start the `tcpmon` application. 

    For instructions, go to [Starting TCPMon]({{base_path}}/observe-and-manage/classic-observability-tcp/starting-tcp-mon/) Documentation.

8. In the `tcpmon` application, navigate to the **Admin** tab. Add listeners to ports `9001`, `9002`, and `9003`. For each listener set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/PointToPointChannel.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request **3 or more times**. Make sure to include a `simpleClientSession` in the header.

```
POST http://localhost:8290/services/PointToPointProxy
Content-Type: text/xml;charset=UTF-8
simpleClientSession: 123

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
   <m0:placeOrder xmlns:m0="http://services.samples">
            <m0:order>
                <m0:price>172.23182849731984</m0:price>
                <m0:quantity>18398</m0:quantity>
                <m0:symbol>IBM</m0:symbol>
            </m0:order>
        </m0:placeOrder>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

Out of the three instances of the Stock Quote service (Axis2 server), only one server acquires the sent request at a given time. When you send the requests, the WSO2 MI first receives the message and then routes it to the backend service (StockQuoteService). The following output will be printed on the Axis2 Server Console: 

```
Wed Aug 07 11:03:15 IST 2024 samples.services.SimpleStockQuoteService  :: Accepted order #1 for : 18398 stocks of IBM at $ 172.23182849731984
Wed Aug 07 11:03:17 IST 2024 samples.services.SimpleStockQuoteService  :: Accepted order #2 for : 18398 stocks of IBM at $ 172.23182849731984
Wed Aug 07 11:03:19 IST 2024 samples.services.SimpleStockQuoteService  :: Accepted order #3 for : 18398 stocks of IBM at $ 172.23182849731984
```

When inspecting the `tcpmon`, you will see that each listener has received a request (If you have only sent 3 requests, otherwise more than 1). This is because, when multiple requests are sent with the same session ID, they are distributed across the three endpoints in a round-robin manner.
