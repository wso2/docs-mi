# Dead Letter Channel

This page explains how you can implement a sample scenario of Dead Letter Channel EIP using the WSO2 Micro Integrator.

## Introduction to Dead Letter Channel

The Dead Letter Channel (DLC) EIP outlines how messaging systems can handle messages that cannot be delivered to the recipient. Due to system/network failures or failures at the recipient's end, messages sometimes do not get delivered to the target. In such cases, the messaging system can deliver the message to a DLC. Different mechanisms implemented in the DLC take care of delivering the dead message to the target. One method is periodically retrying to send the message to the recipient over a defined period. Persistence of the dead message is another option, which ensures that the dead messages are delivered to the receivers once the system is rebooted, even if the messaging system fails.

For more information, see the [Dead Letter Channel](https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html) documentation.

![Dead letter channel solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/dead-letter-channel-solution.gif)

## Sample scenario

This example takes a proxy service called StockQuoteProxy, which fronts a service by the name SimpleStockQuoteService. As long as the SimpleStockQuoteService is running, the clients calling the StockQuoteProxy service get responses. But if the SimpleStockQuoteService is down or a failure occurs while trying to send the message to the SimpleStockQuoteService, the faultSequence of the StockQuoteProxy will get invoked, and the message will be forwarded to the dead letter channel.

The diagram below depicts how to simulate the example scenario.

![Dead letter channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/dead-letter-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Dead Letter Channel EIP by comparing their core components. We use three constructs of the WSO2 MI to implement the Dead Letter Channel EIP.

| Dead Letter Channel EIP (Figure 1)  | Dead Letter Channel Example Scenario (Figure 1)    |
|-------------------------------------|----------------------------------------------------|
| Sender                              | Stock Quote Client                                 |
| Intended Recipient                  | Stock Quote Service Instance                       |
| Dead Letter Channel                 | Store mediator, Message stores, Message processors |
| Intended Receiver                   | Simple Stock Quote Service                         |

The diagram below depicts the DLC architecture.

![DLC Architecture]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/dlc-architecture.png)

The store mediator stores the dead message in the specified message store. The message processor retrieves stored messages from its associated message store and tries to resend those messages to the target receiver. The message store and message processor combination acts as the dead letter channel.

##  Synapse configuration of the artifacts

Given below is the synapse configuration of this sample. 

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="DeadLetterChannelProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="custom">
                    <property name="Sending request to Endpoint" value="SimpleStockQuoteService"/>
                </log>
                <call>
                    <endpoint key="SimpleStockEp"/>
                </call>
                <log category="INFO" level="custom">
                    <property name="Sending response back to" value="client"/>
                </log>
                <respond/>
            </inSequence>
            <faultSequence>
                <log category="INFO" level="custom">
                    <property name="Fault happened" value="Sending to the DLC store"/>
                </log>
                <store messageStore="dlc-store"/>
                <payloadFactory media-type="xml">
                    <format>
                        <Response xmlns="">
                            <Code>202</Code>
                            <Message>Request Accepted</Message>
                        </Response>
                    </format>
                    <args/>
                </payloadFactory>
                <property name="HTTP_SC" value="202" scope="axis2"/>
                <respond/>
            </faultSequence>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
            <suspendOnFailure>
                <errorCodes>-1</errorCodes>
                <initialDuration>-1</initialDuration>
                <progressionFactor>1</progressionFactor>
            </suspendOnFailure>
            <markForSuspension>
                <retriesBeforeSuspension>10000</retriesBeforeSuspension>
            </markForSuspension>
        </address>
    </endpoint>
    ```
=== "Message Processor"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="ScheduledProcessor" messageStore="dlc-store" targetEndpoint="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="client.retry.interval">1000</parameter>
        <parameter name="member.count">1</parameter>
        <parameter name="message.processor.reply.sequence">ReplySeq</parameter>
        <parameter name="message.processor.deactivate.sequence">DeactivateSeq</parameter>
        <parameter name="is.active">true</parameter>
        <parameter name="max.delivery.attempts">1000</parameter>
        <parameter name="store.connection.retry.interval">1000</parameter>
        <parameter name="max.store.connection.attempts">-1</parameter>
        <parameter name="max.delivery.drop">Disabled</parameter>
        <parameter name="interval">1000</parameter>
    </messageProcessor>
    ```
=== "Message Store"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <messageStore name="dlc-store" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" xmlns="http://ws.apache.org/ns/synapse">
    </messageStore>
    ```
=== "Deactivate Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="DeactivateSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" level="custom">
            <property name="Status" value="Deactivate message processor"/>
        </log>
    </sequence>
    ```
=== "Reply Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="ReplySeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" level="custom">
            <property name="Status" value="Reply"/>
        </log>
    </sequence>
    ```

Let's investigate the elements of the configuration in detail.

- `faultSequence` - The fault sequence. The proxy service `StockQuoteProxy` runs in the event of a fault or error. 
- `store` - The store mediator loads the message store. 
- `messageStore` - Defines the message store to use. 
- `messageProcessor` - Defines the processing algorithm, the period to retry sending messages in case of a failure, and the maximum number of retry attempts.

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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/DeadLetterChannel.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the `DeadLetterChannelProxy` service.

```
POST http://localhost:8290/services/DeadLetterChannelProxy 
Content-type: text/xml;charset=UTF-8
soapAction: urn:getQuote

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
        <ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
            <ser:request>
                <xsd:symbol>IBM</xsd:symbol>
            </ser:request>
        </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

1. A message similar to the one below appears in the simple axis2server.

    ```bash
    Thu Aug 08 11:52:12 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
    ```

    You can view the response as follows. 

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <ns:getQuoteResponse xmlns:ns="http://services.samples">
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                    <ax21:change>-2.4703266972821165</ax21:change>
                    <ax21:earnings>-8.818981505986125</ax21:earnings>
                    <ax21:high>86.94784625834006</ax21:high>
                    <ax21:last>83.62448085969294</ax21:last>
                    <ax21:lastTradeTimestamp>Wed Aug 07 14:58:10 IST 2024</ax21:lastTradeTimestamp>
                    <ax21:low>-82.45035209907705</ax21:low>
                    <ax21:marketCap>4.991770763471378E7</ax21:marketCap>
                    <ax21:name>IBM Company</ax21:name>
                    <ax21:open>85.90922680098718</ax21:open>
                    <ax21:peRatio>-19.390347003464093</ax21:peRatio>
                    <ax21:percentageChange>-2.6955114572674184</ax21:percentageChange>
                    <ax21:prevClose>91.64593571367774</ax21:prevClose>
                    <ax21:symbol>IBM</ax21:symbol>
                    <ax21:volume>9929</ax21:volume>
                </ns:return>
            </ns:getQuoteResponse>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

2. Stop the axis2server, and resend the same request. In this case, you can view the response as follows. 

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Body>
            <Response>
                <Code>202</Code>
                <Message>Request Accepted</Message>
            </Response>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

3. Now the message is stored in the message store and the message processor tries to resend the message every few seconds.

3. Restart the axis2server, and note that the message will be delivered to SimpleStockQuoteService once the server is running. A message similar to the one below appears in the simple axis2server.

    ```bash
    Thu Aug 08 11:52:12 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
    ```
