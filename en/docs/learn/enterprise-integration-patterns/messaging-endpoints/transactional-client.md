# Transactional Client

This section explains, through an sample scenario, how the Transactional Client EIP can be implemented using WSO2 ESB. 

## Introduction to Transactional Client

The Transactional Client EIP controls transactions with the messaging system. It makes the client’s session with the messaging system transactional so that the client can specify transaction boundaries. 

!!! info

    For more information, see the [Transactional Client](http://www.eaipatterns.com/TransactionalClient.html) documentation.

![Transactional client solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/transactional-client-solution.gif)

## Sample scenario

In many business scenarios, there can be data loss when transferring from one section to another because of crashes and other interruptions. This sample scenario demonstrates how messages containing the MESSAGE_COUNT value (MESSAGE_COUNT=1) are assumed to be causing a failure in mediation, and how transactions guarantee that data will not be lost.

There are two ways to implement transaction in WSO2 ESB as follows.

- Transaction Mediator
- JMS Transactions

The ESB can control transactional behavior with a JMS queue and by simulating the Transactional Client EAI pattern. For information on Transactions in WSO2 ESB, refer to Transactions in the WSO2 ESB documentation.

The diagram below depicts how to simulate the sample scenario using WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/transactional-client.png" style="width: 70%;" alt="Transactional client">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Transactional Client EIP by comparing their core components.

| Transactional Client EIP (Figure 1) | Transactional Client Sample Scenario (Figure 2) |
|-------------------------------------|-------------------------------------------------|
| Transactional Producer              | Proxy service inSequence                        |
| Message                             | Simple Stock Quote Request                      |
| Transactional Consumer              | Simple Stock Quote Service                      |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Download and install a JMS server. We use ActiveMQ as the JMS provider in this example.    

3. In order to enable the JMS transport, edit `<ESB_HOME>/repository/conf/axis2/axis2.xml` as follows.

    - Uncomment the Axis2 transport listener configuration for ActiveMQ as follows:
    
        ```
        <transportReceiver name="jms" class="org.apache.axis2.transport.jms.JMSListener">...
        ```

    - Set the `transport.jms.SessionTransacted` parameter to `true`. After making this update, the `transportReceiver` section in `axis2.xml` should look as follows:
    
        ```xml
        <transportReceiver name="jms" class="org.apache.axis2.transport.jms.JMSListener">
                <parameter name="myQueueConnectionFactory" locked="false">
                    <parameter name="java.naming.factory.initial" locked="false">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
                    <parameter name="java.naming.provider.url" locked="false">tcp://localhost:61616</parameter>
                    <parameter name="transport.jms.ConnectionFactoryJNDIName" locked="false">QueueConnectionFactory</parameter>
                    <parameter name="transport.jms.ConnectionFactoryType" locked="false">queue</parameter>
                    <parameter name="transport.jms.SessionTransacted">true</parameter>
                </parameter>
        
                <parameter name="default" locked="false">
                    <parameter name="java.naming.factory.initial" locked="false">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
                    <parameter name="java.naming.provider.url" locked="false">tcp://localhost:61616</parameter>
                    <parameter name="transport.jms.ConnectionFactoryJNDIName" locked="false">QueueConnectionFactory</parameter>
                    <parameter name="transport.jms.ConnectionFactoryType" locked="false">queue</parameter>
                    <parameter name="transport.jms.SessionTransacted">true</parameter>
                </parameter>
        </transportReceiver>
        ```

    - Uncomment the Axis2 transport sender configuration as follows:

        ```
        <transportSender name="jms" class="org.apache.axis2.transport.jms.JMSSender"/>  
        ```

4. Copy the following ActiveMQ client JAR files to the `<ESB_HOME>/repository/components/lib` directory. It allows the ESB to connect to the JMS provider.

    - `activemq-core-5.2.0.jar`
    - `geronimo-j2ee-management_1.0_spec-1.0.jar`

5. You need to add a custom mediator called MessageCounterMediator. Download the `MessageCounterMediator` file and place it in the `<ESB_HOME>/repository/components/lib` folder. To learn how to write custom mediators, refer to Writing Custom Mediator Implementations in the WSO2 ESB documentation.

6. Start ActiveMQ (or equivalent JMS Server) and WSO2 ESB.

7. Start the sample Axis2 server. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```xml
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="StockQuoteProxy" startOnLoad="true" trace="disable">     
      <target>
         <inSequence>
            <!-- Setting MESSAGE_COUNT value -->
            <class name="org.wso2.esb.client.MessageCounterMediator"/>
            <log level="full">
               <property name="MESSAGE*ID" expression="get-property('MESSAGE_COUNT')"/>
            </log>
            <switch source="get-property('MESSAGE_COUNT')">
               <case regex="1">
                    <!-- Undesired MESSAGE_COUNT value -->
                  <property name="SET_ROLLBACK_ONLY" value="true" scope="axis2"/>
                  <log level="custom">
                     <property name="Transaction Action" value="Rollbacked"/>
                  </log>
               </case>
               <default>
                  <log level="custom">
                     <property name="Transaction Action" value="Committed"/>
                  </log>
                  <send>
                     <endpoint name="proxy_endpoint">
                        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                     </endpoint>
                  </send>
               </default>
            </switch>
            <property name="OUT_ONLY" value="true"/>
         </inSequence>
      </target>
      <publishWSDL uri="file:repository/samples/resources/proxy/sample_proxy_1.wsdl"/>
      <parameter name="transport.jms.ContentType">
         <rules>
            <jmsProperty>contentType</jmsProperty>
            <default>application/xml</default>
         </rules>
      </parameter>
   </proxy> 
   <sequence name="main">
      <log/>
      <drop/>
   </sequence>
</definitions>
```

## Set up the sample scenario
Use the ESB's default jmsclient to send messages to the JMS queue in ActiveMQ as follows:

```
ant jmsclient -Djms_type=pox -Djms_dest=dynamicQueues/StockQuoteProxy -Djms_payload=WSO2
```

Note in the ESB console that the first attempt will roll back and the second attempt will be committed.

```
[2012-10-26 22:55:32,520]  INFO - LogMediator To: , MessageID: ID:buddhima-pc-59457-1351272332247-1:1:1:1:1, Direction: request, MESSAGE*ID = 1, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><m:placeOrder xmlns:m="http://services.samples">
    <m:order>
        <m:price>87.63805687450525</m:price>
        <m:quantity>18427</m:quantity>
        <m:symbol>WSO2</m:symbol>
    </m:order>
</m:placeOrder></soapenv:Body></soapenv:Envelope>
[2012-10-26 22:55:32,521]  INFO - LogMediator Transaction Action = Rollbacked
 
[2012-10-26 22:55:33,541]  INFO - LogMediator To: , MessageID: ID:buddhima-pc-59457-1351272332247-1:1:1:1:1, Direction: request, MESSAGE*ID = 2, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><m:placeOrder xmlns:m="http://services.samples">
    <m:order>
        <m:price>87.63805687450525</m:price>
        <m:quantity>18427</m:quantity>
        <m:symbol>WSO2</m:symbol>
    </m:order>
</m:placeOrder></soapenv:Body></soapenv:Envelope>
[2012-10-26 22:55:33,541]  INFO - LogMediator Transaction Action = Committed
```

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- **class** [line 6 in ESB config] - A Custom mediator called MessageCountMediator is loaded. This mediator keeps track of the number of messages that pass through the sequence it calls by updating the value of a variable named MESSAGE_COUNT.
- **switch** [line 10 in ESB config] - The Switch mediator checks the value of MESSAGE_COUNT.
- **case** [line 11 in ESB config] - If the value of MESSAGE_COUNT is 1, the transaction is considered to have failed, and no message will be put on the send channel.
- **default** [line 18 in ESB config] - The default action of the switch case flow control. This occurs when the MESSAGE_COUNT is anything but 1. The message is put on the send channel, and the transaction is considered a success. 
