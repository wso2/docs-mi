# Message Broker

This page explains how you can implement a sample scenario of Message Broker EIP using WSO2 Micro Integrator.

## Introduction to Message Broker

The Message Broker EIP decouples the destination of a message from the sender and maintains central control over the flow of messages. It receives messages from multiple destinations, determines the correct destination, and routes the message to the correct channel. The Message Broker EIP decouples messages from senders and receivers. 

!!! info
    For more information, see the [Message Broker](http://www.eaipatterns.com/MessageBroker.html) documentation.

![Message broker EIP]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-broker.gif)

## Sample scenario

This sample scenario demonstrates how WSO2 MI works with ActiveMQ to implement the Message Broker EIP. In this scenario, sent messages are put into a message queue, which any interested receiver can consume. If you want to add more receivers, you can use topics in ActiveMQ in a similar manner discussed here.

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="OUT_ONLY" value="true"/>
                <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
                <property name="transport.jms.ContentTypeProperty" value="Content-Type" scope="axis2"/>
                <call>
                    <endpoint>
                        <address uri="jms:/messageQueue?transport.jms.ConnectionFactoryJNDIName=QueueConnectionFactory&amp;java.naming.factory.initial=org.apache.activemq.jndi.ActiveMQInitialContextFactory&amp;java.naming.provider.url=tcp://localhost:61616&amp;transport.jms.DestinationType=queue"/>
                    </endpoint>
                </call>
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

### How the implementation works

Let's explore the elements of the configuration:

- **Proxy Service**: Defines a proxy service named `StockQuoteProxy`, which starts automatically and supports HTTP and HTTPS transports.
- **InSequence**: Configures properties to ensure the message is sent without expecting a response, and immediately returns an HTTP 202 Accepted status to the client. The message is then forwarded to a JMS endpoint.
- **Endpoint**: Specifies the JMS endpoint where the message will be sent. The address is a JMS URL, which includes:
    - **JMS Queue**: Specifies the destination queue (`messageQueue`) using a JNDI entry.
    - **Connection Factory**: Looks up the connection factory in JNDI using the name `QueueConnectionFactory`.
    - **Initial Context Factory**: Specifies the ActiveMQ InitialContextFactory for JNDI lookup.
    - **Provider URL**: Points to the ActiveMQ server at `tcp://localhost:61616`.
- **FaultSequence**: Defines how errors are handled, logging full details of the error and then dropping the message.

## Set up the sample scenario

Now, let's try out the sample scenario explained above.

### Set up the environment

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/message-broker.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

4. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

5. Start the project in the WSO2 MI server.

    For instructions, refer [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

6. Set up and Start [ActiveMQ]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq).

7. Start SoapUI.

    For instructions on downloading and starting, refer [SoapUI Getting Started](https://www.soapui.org/getting-started/).

!!!note
    Make sure to configure the relevant [JMS parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters) in the `deployment.toml` file.
    ```
    [[transport.jms.sender]]
    name = "myQueueSender"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    ```

## Execute the sample

Send the request to the service using SoapUI (or any other SOAP client)

```xml
POST  http://localhost:8290/services/StockQuoteProxy

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

When you execute the command above, the request is sent to the StockQuoteProxy. You can check if the message is enqueued into the queue in [ActiveMQ management console](http://localhost:8161/admin/queues.jsp)

![ActiveMQ output]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-broker-ActiveMQ-output.png)
