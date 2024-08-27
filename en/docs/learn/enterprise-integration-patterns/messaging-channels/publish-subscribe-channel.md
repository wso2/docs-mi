# Publish-Subscribe Channel

This page explains how you can implement a sample scenario of Publish-Subscribe Channel EIP using WSO2 Micro Integrator.

## Introduction to Publish-Subscribe Channel

The Publish-Subscribe Channel EIP receives messages from the input channel, and then splits and transmits them among its subscribers through the output channel. Each subscriber has only one output channel. For more information, go to Publish Subscribe Channel. 

!!! info
    For more information, see the [Publish subscribe channel](https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html) documentation.

![Publish subscribe solution ]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/publish-subscribe-solution.gif)

## Sample scenario

The example scenario depicts an inventory for stocks and demonstrates how the EIP distributes a sent message among several subscribers. It includes multiple instances of the SimpleStockQuoteService. When a message is added to the WSO2 MI, it is transmitted to these server instances, each of which acts as a subscriber through the ActiveMQ topic.

The diagram below depicts how to simulate the example scenario using WSO2 MI.

![Publish-Subscribe Channel sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/publish-subscribe-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Publish-Subscribe Channel EIP by comparing their core components.

| Publish-Subscribe Channel EIP            | Publish-Subscribe Channel Example Scenario            |
|------------------------------------------|-------------------------------------------------------|
| Subscriber                               | SimpleStockQuoteService                               |
| Publisher Subscriber Channel             | ActiveMQ topic                                        |
| Publisher                                | StockQuoteProxy                                       |

## Synapse configurations of the artifacts

=== "StockQuoteProxy"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" transports="http" startOnLoad="true" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="OUT_ONLY" value="true"/>
                <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
                <call>
                    <endpoint>
                        <address uri="jms:/SimpleStockQuoteService?transport.jms.ConnectionFactoryJNDIName=TopicConnectionFactory&amp;java.naming.factory.initial=org.apache.activemq.jndi.ActiveMQInitialContextFactory&amp;java.naming.provider.url=tcp://localhost:61616&amp;transport.jms.DestinationType=topic"/>
                    </endpoint>
                </call>
            </inSequence>
        </target>
    </proxy>
    ```
=== "SimpleStockQuoteService1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SimpleStockQuoteService1" transports="jms" startOnLoad="true" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="OUT_ONLY" value="true"/>
            <log level="custom">
                    <property name="Subscriber1" value="I am Subscriber1"/>
                </log>
                <drop/>
            </inSequence>
        </target>
        <parameter name="transport.jms.ContentType">
            <rules>
                <jmsProperty>contentType</jmsProperty>
                <default>application/xml</default>
            </rules>
        </parameter>
        <parameter name="transport.jms.ConnectionFactory">myTopicConnectionFactory</parameter>
        <parameter name="transport.jms.DestinationType">topic</parameter>
        <parameter name="transport.jms.Destination">SimpleStockQuoteService</parameter>
    </proxy>
    ```
=== "SimpleStockQuoteService2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SimpleStockQuoteService2" transports="jms" startOnLoad="true" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                    <property name="OUT_ONLY" value="true"/>
            <log level="custom">
                        <property name="Subscriber2" value="I am Subscriber2"/>
                    </log>
                    <drop/>
                </inSequence>
        </target>
        <parameter name="transport.jms.ContentType">
            <rules>
            <jmsProperty>contentType</jmsProperty>
            <default>application/xml</default>
            </rules>
        </parameter>
        <parameter name="transport.jms.ConnectionFactory">myTopicConnectionFactory</parameter>
        <parameter name="transport.jms.DestinationType">topic</parameter>
        <parameter name="transport.jms.Destination">SimpleStockQuoteService</parameter>
    </proxy>
    ```

### How the implementation works

Let's break down the key components of the configuration:

- **StockQuoteProxy**: Forwards stock quote requests from clients to a JMS topic, enabling asynchronous processing.
- **SimpleStockQuoteService1**: Subscribes to the JMS topic, logs a custom message, and drops the message.
- **SimpleStockQuoteService2**: Similar to **SimpleStockQuoteService1**, it subscribes to the JMS topic, logs a different custom message, and drops the message.

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/publish-subscribe-channel.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

4. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

5. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

6. Set up and Start [ActiveMQ]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq).

!!!note
    Make sure to configure the relevant [JMS parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters) in the `deployment.toml` file.
    ```
    [[transport.jms.listener]]
    name = "myTopicConnectionFactory"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "TopicConnectionFactory"
    parameter.connection_factory_type = "topic"

    [[transport.jms.sender]]
    name = "myTopicSender"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "TopicConnectionFactory"
    parameter.connection_factory_type = "topic"
    ```
## Execute the sample

Send the following request to the service using SoapUI (or any other SOAP client).

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

When you execute the command above, the request is sent to the StockQuoteProxy. Notice the following processed server log in WSO2 MI output:

```log
[2024-08-13 09:40:05,276]  INFO {LogMediator} - {proxy:SimpleStockQuoteService1} Subscriber1 = I am Subscriber1
[2024-08-13 09:40:05,276]  INFO {LogMediator} - {proxy:SimpleStockQuoteService2} Subscriber2 = I am Subscriber2
```
