# Polling Consumer

This page explains how you can implement a sample scenario of the Polling Consumer EIP using the WSO2 Micro Integrator.

## Introduction to Polling Consumer

The Polling Consumer EIP allows the WSO2 MI to explicitly make a call when the application wants to receive a message. 

!!! info
    For more information, see the [Polling Consumer](http://www.eaipatterns.com/PollingConsumer.html).

![Polling consumer solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/polling-consumer-solution.gif)

## Sample scenario

This sample scenario demonstrates the WSO2 MI JMS proxy, which is a polling transport that is used to connect to various JMS providers. After configuring the JMS proxy, it will listen on a queue on the JMS server. Next, we send a message to the queue, and the JMS proxy in the WSO2 MI will pick up the message when it is ready for consumption.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/polling-consumer.png" style="width: 70%;" alt="Polling consumer solution">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Polling Consumer EIP by comparing their core components.

| Polling Consumer EIP            | Polling Consumer Sample Scenario            |
|---------------------------------|---------------------------------------------|
| Sender                          | Simple Stock Quote Client                   |
| Message                         | Simple Stock Quote Request                  |
| Polling Consumer                | Proxy Service using JMS Transport           |
| Receiver                        | Simple Stock Quote Service                  |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service" 
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" startOnLoad="true" transports="jms" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="OUT_ONLY" scope="axis2" type="BOOLEAN" value="true"/>
                <call>
                    <endpoint key="SimpleStockEp"/>
                </call>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.jms.Destination">StockQuoteProxyQueue</parameter>
        <parameter name="transport.jms.ConnectionFactory">myQueueConnectionFactory</parameter>
        <parameter name="transport.jms.ContentType">
            <rules>
                <jmsProperty>contentType</jmsProperty>
                <default>text/xml</default>
            </rules>
        </parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
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

Let's investigate the elements of the configuration in detail.

- **proxy** - A proxy service with a JMS transport.
- **parameter** - Sets JMS transport parameter contentType to `application/xml`.

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Let's use ActiveMQ as the message broker in this example. Follow the instructions in the [Connect to ActiveMQ]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq/) Documentation to configure the broker with WSO2 MI, and start the broker.

    !!! Note
        Make sure to configure the relevant [JMS parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters/) in the `<MI_HOME>/conf/deployment.toml` file.

        ```
        [[transport.jms.listener]]
        name = "myQueueConnectionFactory"
        parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
        parameter.provider_url = "tcp://localhost:61616"
        parameter.connection_factory_name = "QueueConnectionFactory"
        parameter.connection_factory_type = "queue"
        ```

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

7. Navigate to the URL where the ActiveMQ WebConsole is available. You can find this URL in the terminal where you started the ActiveMQ instance. It is similar to `http://127.0.0.1:8161/`. 

8. By default, the username and password are both `admin`. 

9. After signing in, click on **Manage ActiveMQ broker**.

10. On the opened page, select the **Queues** tab.

11. Create a queue named `StockQuoteProxyQueue`. 

12. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/PollingConsumer.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

13. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

14. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

1. Go to ActiveMQ WebConsole and send a JMS message by using the **Send To** operation that appeared for the `StockQuoteProxyQueue` queue. Use the following details to send the message.
    
    - **Destination**: `StockQuoteProxyQueue`
    - **Queue or Topic**: `Queue`
    - **Message Body**: 
        ```xml
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

1. A message similar to the one below appears in the simple axis2server.

    ```bash
    Wed Aug 14 23:26:13 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
    ```

    Also, note that there is one message queued and one de-queued in the queue created in the ActiveMQ web console.

2. Next, stop the WSO2 MI server and send a stock quote request again. In the ActiveMQ web console, you can see that there are two messages queued and only one message de-queued.

3. Start the WSO2 MI server again. Now in the ActiveMQ web console, you can see that there are two messages queued and two messages de-queued. Also, in the console running the sample Axis2 server, you will see a message indicating that the server has accepted the second message.
