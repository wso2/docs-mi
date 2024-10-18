# Routing Slip

This page explains how you can implement a sample scenario of Routing Slip using WSO2 Micro Integrator.

## Introduction to Routing Slip

The Routing Slip EIP routes a message consecutively through a series of processing steps when the sequence of steps is not known at design-time, and may vary for each message. 

!!! info
    For more information, see the [Routing Slip](http://www.eaipatterns.com/RoutingTable.html) documentation.

![Routing table simple]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/routing-table-simple.gif)

The sequence in which a message should be processed usually varies based on the request that arrives. This EIP observes the message at the initial state and attaches a specific list of steps that the message should follow.

## Sample scenario

In the sample scenario, when the Micro Integrator receives a message, it will attach a property to the message using the Header mediator to indicate the set of processors that it should follow. It defines each process as a separate sequence. This example consists of three independent sequences. The attached properties are processed using the Iterate mediator, and the process is analyzed using the Switch mediator in each iteration cycle. Once the process is analyzed, the message will be sent to the respective process (sequence).

The diagram below depicts how to simulate the sample scenario using WSO2 Micro Integrator.

![Routing slip]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/routing-slip.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Routing Slip EIP by comparing their core components.

| Routing Slip EIP            | Routing Slip Sample Scenario                |
|-----------------------------|---------------------------------------------|
| Request Message             | Simple Stock Quote Request                  |
| Routing Slip                | Header Mediator appends node to SOAP header |
| Proc A/B/C                  | Sequence                                    |

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="RoutingSlipProxy" startOnLoad="true" transports="http https"
       xmlns="http://ws.apache.org/ns/synapse">
       <target>
          <inSequence>
             <header name="m1:RoutingSlip" xmlns:m1="http://services.samples" action="set"
                scope="default" value="Process_A" />
             <header name="m1:RoutingSlip" xmlns:m1="http://services.samples" action="set"
                scope="default" value="Process_C" />
             <log category="INFO" level="full" />
             <iterate expression="//m0:RoutingSlip" id="" preservePayload="true"
                xmlns:m0="http://services.samples">
                <target>
                   <sequence>
                      <switch source="//m2:RoutingSlip" xmlns:m2="http://services.samples">
                         <case regex="Process_A">
                            <sequence key="process_a" />
                         </case>
                         <case regex="Process_B">
                            <sequence key="process_b" />
                         </case>
                         <case regex="Process_C">
                            <sequence key="process_c" />
                         </case>
                         <default>
                           <drop />
                         </default>
                      </switch>
                   </sequence>
                </target>
             </iterate>
             <respond />
          </inSequence>
          <faultSequence />
       </target>
    </proxy>
    ```
=== "Process_A"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="process_a" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log level="custom">
             <property name="Process" value="A"/>
          </log>
       <sequence key="send_seq" />
    </sequence>
    ```
=== "Process_B"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="process_b" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log level="custom">
         <property name="Process" value="B"/>
       </log>
    </sequence>
    ```
=== "Process_C"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="process_c" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log level="custom">
          <property name="Process" value="C"/>
       </log>
    </sequence>
    ```
=== "Send_Seq"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="send_seq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <call>
          <endpoint key="SimpleStockQuoteService" />
       </call>
    </sequence>
    ```
=== "SimpleStockQuoteService"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

Let's investigate the elements of the synapse configuration in detail.

- The header mediator  - The Header mediator appends a key/value pair to the SOAP header. It can be used to remove such pairs. In this example, the configuration adds a header field called `RoutingSlip` with a value of `Process A`. It then adds another header field `RoutingSlip` with a value of `Process C`.
- The iterate mediator - The Iterate mediator is used to iterate over all `RoutingSlip` nodes inside the header.
- The switch mediator  - The Switch mediator is used to filter out and match the value in `RoutingSlip` to run the relevant sequence. 

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Set up the back-end service:

    1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
    2. Extract the downloaded zip file.
    3. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.
    4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"
        ```bash
        sh axis2server.sh
        ```
    === "On Windows"
        ```bash
        axis2server.bat
        ```

5. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/RoutingSlip.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

6. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

7. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send a request like the following to the client.

```
POST /services/RoutingSlipProxy HTTP/1.1
Host: localhost:8290
SOAPAction: urn:getQuote
Content-Type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
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

Note that the steps are attached to the message header initially. Thereafter, processing will be decided based on the attached slip. You can observe process A and process C being logged in the Output tab in the VS Code console.

```bash
INFO {LogMediator} - {proxy:RoutingSlipProxy} Process = A
INFO {LogMediator} - {proxy:RoutingSlipProxy} Process = C
```

You can also allow the message to flow through Process B by indicating a header in the following manner.

```xml
<header xmlns:m1="http://services.samples"
                    name="m1:RoutingSlip"
                    value="Process_B"/>
```

If you add the above header at the beginning, you will notice the message going through Process B as well.

The Micro Integrator returns the following response to the client.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>-2.978781608058176</ax21:change>
                <ax21:earnings>12.882968046272731</ax21:earnings>
                <ax21:high>181.51813786212372</ax21:high>
                <ax21:last>174.6778346526516</ax21:last>
                <ax21:lastTradeTimestamp>Mon Aug 12 14:50:15 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>180.18440980473167</ax21:low>
                <ax21:marketCap>1.2583559693621557E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>181.0045516914419</ax21:open>
                <ax21:peRatio>-19.450298691496627</ax21:peRatio>
                <ax21:percentageChange>-1.5428965301229411</ax21:percentageChange>
                <ax21:prevClose>193.0642496046589</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>6500</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
