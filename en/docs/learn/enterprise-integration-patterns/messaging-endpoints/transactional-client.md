# Transactional Client

This page explains how you can implement a sample scenario of the Transactional Client EIP using WSO2 Micro Integrator.

## Introduction to Transactional Client

The Transactional Client EIP controls transactions with the messaging system. It makes the client’s session with the messaging system transactional so that the client can specify transaction boundaries. 

!!! info

    For more information, see the [Transactional Client](http://www.eaipatterns.com/TransactionalClient.html) documentation.

![Transactional client solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/transactional-client-solution.gif)

## Sample scenario

In many business scenarios, there can be data loss when transferring from one section to another because of crashes and other interruptions. This sample scenario demonstrates how messages containing the MESSAGE_COUNT value (MESSAGE_COUNT=1) are assumed to be causing a failure in mediation, and how transactions guarantee that data will not be lost.

There are two ways to implement transactions in WSO2 MI as follows.

- Transaction Mediator
- JMS Transactions

The WSO2 MI can control transactional behavior with a JMS queue and by simulating the Transactional Client EAI pattern. For more information on transactions in WSO2 MI, refer to the [Work with Transactions]({{base_path}}/learn/examples/working-with-transactions/) documentation.

The diagram below depicts how to simulate the sample scenario using WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/transactional-client.png" style="width: 70%;" alt="Transactional client">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Transactional Client EIP by comparing their core components.

| Transactional Client EIP            | Transactional Client Sample Scenario            |
|-------------------------------------|-------------------------------------------------|
| Transactional Producer              | Proxy service                                   |
| Message                             | Simple Stock Quote Request                      |
| Transactional Consumer              | Simple Stock Quote Service                      |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" startOnLoad="true" transports="jms" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
            <property name="OUT_ONLY" scope="axis2" type="BOOLEAN" value="true"/>
            <class name="org.wso2.esb.client.MessageCounterMediator"/>
            <log category="INFO" level="full">
                <property name="MESSAGE*ID" expression="get-property('MESSAGE_COUNT')"/>
            </log>
            <switch source="get-property('MESSAGE_COUNT')">
                <case regex="1">
                    <property name="SET_ROLLBACK_ONLY" scope="axis2" type="BOOLEAN" value="true"/>
                    <log category="INFO" level="custom">
                        <property name="Transaction Action" value="Rollbacked"/>
                    </log>
                </case>
                <default>
                    <log category="INFO" level="custom">
                        <property name="Transaction Action" value="Committed"/>
                    </log>
                    <call>
                        <endpoint key="SimpleStockEp"/>
                    </call>
                </default>
            </switch>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.jms.ContentType">
            <rules>
                <jmsProperty>contentType</jmsProperty>
                <default>text/xml</default>
            </rules>
        </parameter>
        <parameter name="transport.jms.Destination">StockQuoteQueue</parameter>
        <parameter name="transport.jms.ConnectionFactory">myQueueConnectionFactory</parameter>
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

- **class** - A Custom mediator called MessageCountMediator is loaded. This mediator keeps track of the number of messages that pass through the sequence it calls by updating the value of a variable named `MESSAGE_COUNT`.
- **switch** - The Switch mediator checks the value of `MESSAGE_COUNT`.
- **case** - If the value of `MESSAGE_COUNT` is 1, the transaction is considered to have failed, and no message will be put on the call channel.
- **default** - The default action of the switch case flow control. This occurs when the `MESSAGE_COUNT` is anything but 1. The message is put on the call channel, and the transaction is considered a success. 

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

4. Download the [backend service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).

5. Extract the downloaded zip file.

6. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.

7. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat

8. Navigate to the URL where the ActiveMQ WebConsole is available. You can find this URL in the terminal where you started the ActiveMQ instance. It is similar to `http://127.0.0.1:8161/`. 

9. By default, the username and password are both `admin`. 

10. After signing in, click on **Manage ActiveMQ broker**.

11. On the opened page, select the **Queues** tab.

12. Create a queue named `StockQuoteQueue`. 

13. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/TransactionalClient.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

14. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

15. Download [MessageCounter.jar]({{base_path}}/assets/attachments/jar/MessageCounter.jar) and copy it to the `<PROJECT_HOME>/deployment/libs` directory.

16. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

1. Go to ActiveMQ WebConsole and send a JMS message by using the **Send To** operation that appeared for the `StockQuoteQueue` queue. Use the following details to send the message.
    
    - **Destination**: `StockQuoteQueue`
    - **Queue or Topic**: `Queue`
    - **Message Body**: 
            
        ```xml
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

2. Resend the same JMS message.

## Analyze the output

From the two message attempts, the first attempt will roll back and the second attempt will be committed. A message similar to the one below appears in the simple axis2server. 

```
Thu Aug 15 10:37:55 IST 2024 samples.services.SimpleStockQuoteService  :: Accepted order #3 for : 18398 stocks of IBM at $ 172.23182849731984
```

A log similar to below will be printed in the WSO2 MI console.

```
[2024-08-15 09:58:52,066]  INFO {LogMediator} - {proxy:StockQuoteProxy} To: , WSAction: urn:mediate, SOAPAction: urn:mediate, MessageID: ID:chathurangaj.local-60281-1723653809547-4:4:1:1:9, Direction: request, MESSAGE*ID = 1, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body>
    <m0:placeOrder xmlns:m0="http://services.samples">
        <m0:order>
            <m0:price>172.23182849731984</m0:price>
            <m0:quantity>18398</m0:quantity>
            <m0:symbol>IBM</m0:symbol>
        </m0:order>
    </m0:placeOrder>
   </soapenv:Body></soapenv:Envelope>
[2024-08-15 09:58:52,066]  INFO {LogMediator} - {proxy:StockQuoteProxy} Transaction Action = Rollbacked
[2024-08-15 09:59:06,684]  INFO {LogMediator} - {proxy:StockQuoteProxy} To: , WSAction: urn:mediate, SOAPAction: urn:mediate, MessageID: ID:chathurangaj.local-60281-1723653809547-4:4:1:1:10, Direction: request, MESSAGE*ID = 2, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body>
    <m0:placeOrder xmlns:m0="http://services.samples">
        <m0:order>
            <m0:price>172.23182849731984</m0:price>
            <m0:quantity>18398</m0:quantity>
            <m0:symbol>IBM</m0:symbol>
        </m0:order>
    </m0:placeOrder>
   </soapenv:Body></soapenv:Envelope>
[2024-08-15 09:59:06,686]  INFO {LogMediator} - {proxy:StockQuoteProxy} Transaction Action = Committed
```
