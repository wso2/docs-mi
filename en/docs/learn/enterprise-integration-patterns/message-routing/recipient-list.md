# Recipient List

This page explains how you can implement a sample scenario of Recipient List EIP using WSO2 Micro Integrator.

## Introduction to Recipient List

The Recipient List EIP routes a message to a list of dynamically specified recipients. It processes an incoming message and identifies its list of recipients. Once the list is identified, the message will be sent to all recipient channels. 

!!! info
    For more information, see the [Recipient List](http://www.eaipatterns.com/RecipientList.html) documentation.

![Recipient list]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/recipient-list.gif)

## Sample scenario

This Sample scenario is a stock quote service sending a stock quote request to recipients that are instances of a sample Axis2 server. The Switch mediator identifies the content of the client request and distributes the content among the Recipient List endpoints.

The diagram below depicts how to simulate the sample scenario using the WSO2 MI. 

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/recipient-list.png" style="width: 70%;" alt="Recipient list">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Recipient List EIP by comparing their core components.

| Recipient List EIP            | Recipient List EIP                             |
|-------------------------------|------------------------------------------------|
| Sender                        | StockQuoteClient                               |
| Recipient List                | RecipientList mediator                         |
| Receivers (A, B, C, D)        | SimpleStockQuote Service Instances (foo, WSO2) |

## Synapse configuration of the artifacts

!!! note 
    When you unzip the ZIP file you downloaded below in step 7 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions]({{base_path}}/develop/intro-integration-development/) Documentation.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="RecipientListProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
                <property name="OUT_ONLY" value="true"/>
                <switch source="//m0:getQuote/m0:request/m0:symbol" xmlns:m0="http://services.samples">
                    <case regex="WSO2">
                        <call>
                            <endpoint key="Wso2RLEps"/>
                        </call>
                    </case>
                    <case regex="IBM">
                        <call>
                            <endpoint key="IbmRLEps"/>
                        </call>
                    </case><default></default>
                </switch>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "IBM Recipient List Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="IbmRLEps" xmlns="http://ws.apache.org/ns/synapse">
        <recipientlist>
            <endpoint key="Ep1"/>
            <endpoint key="Ep2"/>
        </recipientlist>
        <description></description>
    </endpoint>
    ```
=== "WSO2 Recipient List Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="Wso2RLEps" xmlns="http://ws.apache.org/ns/synapse">
        <recipientlist>
            <endpoint key="Ep3"/>
            <endpoint key="Ep4"/>
        </recipientlist>
        <description></description>
    </endpoint>
    ```
=== "Endpoint 1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="Ep1" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9001/services/SimpleStockQuoteService">
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
    <endpoint name="Ep2" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9002/services/SimpleStockQuoteService">
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
    <endpoint name="Ep3" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9003/services/SimpleStockQuoteService">
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
=== "Endpoint 4"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="Ep4" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9004/services/SimpleStockQuoteService">
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

Let's investigate the elements of the synapse configuration in detail. 

- **Switch** - The Switch mediator performs a switch/case based on the symbol found inside the original request. In this sample scenario, one of two call mediators is used, based on the value of the symbol element in the request.
- **recipientList** - the recipientList mediator lists several endpoints inside tags. WSO2 MI will forward the request to all endpoints in this list. 

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

8. In the `tcpmon` application, navigate to the **Admin** tab. Add listeners to ports `9001`, `9002`, `9003`, and `9004`. For each listener set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href={{base_path}}/assets/attachments/learn/enterprise-integration-patterns/RecipientList.zip>
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

Note that if the symbol is `IBM`, the WSO2 MI sends the request to servers running on ports 9001 and 9002. If you change the symbol to `WSO2`, it will send the requests to servers running on ports 9003 and 9004.

## Execute the sample

Send the following requests.

=== "IBM"
    ```
    POST /services/RecipientListProxy HTTP/1.1
    Host: localhost:8290
    Content-Type: text/xml
    soapAction: urn:getQuote

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ser:getQuote xmlns:ser="http://services.samples">
            <ser:request>
                <ser:symbol>IBM</ser:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
=== "WSO2"
    ```
    POST /services/RecipientListProxy HTTP/1.1
    Host: localhost:8290
    Content-Type: text/xml
    soapAction: urn:getQuote

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ser:getQuote xmlns:ser="http://services.samples">
            <ser:request>
                <ser:symbol>WSO2</ser:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

## Analyze the output

When you send the request for `IBM`, the service first receives the message and then sends it to the backend service (StockQuoteService) running on ports `9001`, and `9002`. When you send the request for `WSO2`, the service first receives the message and then sends it to the backend service (StockQuoteService) running on ports `9003`, and `9004`. 
The following output will be printed on the Axis2 Server Console: 

```
Mon Aug 12 16:04:59 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : WSO2
Mon Aug 12 16:04:59 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : WSO2
Mon Aug 12 16:05:12 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
Mon Aug 12 16:05:12 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

When inspecting the `tcpmon`, you will see that each listener has received a request. 
