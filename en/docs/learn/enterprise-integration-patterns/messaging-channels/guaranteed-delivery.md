# Guaranteed Delivery

This page explains how you can implement a sample scenario of Guaranteed Delivery EIP using WSO2 Micro Integrator.

## Introduction to Guaranteed Delivery

The Guaranteed Delivery EIP ensures the safe delivery of a message by storing it locally and transmitting it to the receiver's data store. Even when the receiver is offline, the EIP ensures that the message goes through when the receiver comes online. For more information, go to Guaranteed Delivery.

![Guaranteed messaging solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/guaranteed-messaging-solution.gif)

## Sample scenario

This example is a stock quote service where a stock quote request is sent to a specific endpoint when the receiver is offline. An Axis2 server acts as the receiver. The WSO2 MI stores the request message in a JMS message store. In this scenario, ActiveMQ acts as the JMS message store. 

The WSO2 MI periodically checks whether the receiver is online using a Message Forwarding Processor and delivers the message to the endpoint when the receiver comes online.

The existing sample explains connecting to ActiveMQ as a store. Since this is a sample we are using an in-memory message store.

The diagram below depicts how to simulate the example scenario using the WSO2 MI.

![Guaranteed delivery]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/guaranteed-delivery.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Guaranteed Delivery EIP by comparing their core components.

| Guaranteed Delivery EIP             | Guaranteed Delivery Example Scenario              |
|-------------------------------------|---------------------------------------------------|
| Sender                              | Stock Quote Client                                |
| Store                               | Message Store                                     |
| Receiver                            | Stock Quote Service Instance                      |

## Synapse configurations of the artifacts

=== "Proxy Service"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="GuaranteedDeliveryProxy" transports="http https" startOnLoad="true" xmlns="http://ws.apache.org/ns/synapse">
         <target>
            <inSequence>
               <sequence key="delivery_seq"/>
            </inSequence>
         </target>
      </proxy>
      ```
=== "End Point"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <endpoint name="StockReqEndPoint" xmlns="http://ws.apache.org/ns/synapse">
         <address uri="http://localhost:9000/services/SimpleStockQuoteService">
         </address>
      </endpoint>
      ```
=== "Delivery Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="delivery_seq" onError="delivery_fail" xmlns="http://ws.apache.org/ns/synapse">
         <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
         <property name="OUT_ONLY" value="true"/>
         <enrich>
            <source type="envelope" clone="true"/>
            <target type="property" property="mssg"/>
         </enrich>
         <call>
            <endpoint key="StockReqEndPoint"/>
         </call>
      </sequence>
      ```
=== "Delivery Fail Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="delivery_fail" xmlns="http://ws.apache.org/ns/synapse">
         <log level="full"/>
         <enrich>
            <source type="property" clone="true" property="mssg"/>
            <target type="envelope"/>
         </enrich>
         <property name="target.endpoint" value="StockReqEndPoint"/>
         <store messageStore="JMStore"/>
      </sequence>
      ```
=== "Fault Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="fault" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
         <log level="full">
            <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
            <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
            <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
         </log>
         <drop/>
      </sequence>
      ```
=== "Message Processor"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="ScheduledProcessor" messageStore="JMStore" targetEndpoint="StockReqEndPoint" xmlns="http://ws.apache.org/ns/synapse">
         <parameter name="client.retry.interval">1000</parameter>
         <parameter name="member.count">1</parameter>
         <parameter name="is.active">true</parameter>
         <parameter name="max.delivery.attempts">4</parameter>
         <parameter name="store.connection.retry.interval">1000</parameter>
         <parameter name="max.store.connection.attempts">4</parameter>
         <parameter name="max.delivery.drop">Disabled</parameter>
         <parameter name="interval">1000</parameter>
      </messageProcessor>
      ```
=== "Message Store"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <messageStore name="JMStore" class="org.apache.synapse.message.store.impl.jms.JmsStore" xmlns="http://ws.apache.org/ns/synapse">
         <parameter name="java.naming.factory.initial">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
         <parameter name="store.jms.connection.factory">QueueConnectionFactory</parameter>
         <parameter name="java.naming.provider.url">tcp://localhost:61616</parameter>
         <parameter name="store.jms.JMSSpecVersion">1.1</parameter>
      </messageStore>
      ```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- **Proxy**: This service abstracts the routing logic from the client. Regardless of the request, the client sends it only to the exposed service.
- **InSequence**: Upon invocation through the client, this sequence receives the message and forwards it to the routing logic.
- **Sequence**: Defines a sequence block, callable by its key (as specified in the name attribute).
- **Enrich**: Processes messages based on the source configuration and performs actions on the target configuration.
- **Store**: Saves the message using the specified message store, such as the JMS Store.
- **MessageStore**: Defines the message store to use and the parameters required to connect to it. In this example, the connection is made to an external JMS store.
- **MessageProcessor**: Specifies the message processing algorithm, the retry interval in case of failures, and the maximum number of retry attempts.
  
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

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/guaranteed-delivery.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

11. Start the ActiveMQ. For instructions, go to Starting the [ActiveMQ]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq/)

12. Set up [MI CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli/).


## Execute the sample

1. Start the Axis2 server instance.

2. Send the request to the service using SoapUI (or any other SOAP client):
   ```xml
   POST http://localhost:8290/services/GuaranteedDeliveryProxy

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

3. Stop the Axis2 server instance and send the above request again a few times.

4. Start the Axis2 server again and Restart the message processor using the following command:
   ```bash
   mi activate message-processor ScheduledProcessor -e dev
   ```
   
!!! Info
      For more details, see the [documentation]({{base_path}}/observe-and-manage/managing-integrations-with-micli/#message-processors).

## Analyze the output

When you send the first request with the Axis2 server running, the output is:

**Axis2 server:**

```log
samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

When the Axis2 server is shut down, the MI Console displays:

```log
INFO {ScheduledMessageProcessor} - Successfully deactivated the message processor [ScheduledProcessor]
```

The client receives an immediate response with an empty body due to the `FORCE_SC_ACCEPTED` setting.

If you sent several requests while the Axis2 server was shut down, and then restarted the Axis2 server and activated the message processor via the MI CLI, the output would be:

```log
Fri Aug 09 10:19:48 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
Fri Aug 09 10:19:49 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
Fri Aug 09 10:19:50 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

!!! Note
      You need to activate the message processor because, when the Axis2 server is shut down, it retries four times as defined by the `max.store.connection.attempts` property, and then deactivates the message processor.
