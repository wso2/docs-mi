# Message Broker

This section explains, through a sample scenario, how the Message Broker EIP can be implemented using WSO2 ESB. 

## Introduction to Message Broker

The Message Broker EIP decouples the destination of a message from the sender and maintains central control over the flow of messages. It receives messages from multiple destinations, determines the correct destination, and routes the message to the correct channel. The Message Broker EIP decouples messages from senders and receivers. 

!!! info

    For more information, see the [Message Broker](http://www.eaipatterns.com/MessageBroker.html) documentation.

![Message broker EIP]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-broker.gif)

## Sample scenario

This sample scenario demonstrates how WSO2 ESB works with WSO2 Message Broker to implement the Message Broker EIP. In this scenario, sent messages are put into a Message Broker queue, which any interested receiver can consume. If you want to add more receivers, you can use topics in WSO2 Message Broker in a similar manner discussed here.

### Environment setup

### Set up WSO2 Message Broker

1. Download a binary version of WSO2 Message Broker from http://wso2.com/products/message-broker, and extract the distribution, which will be referred to as `<MB_HOME>`.

2. Open `<MB_HOME>/repository/conf/carbon.xml` file, and change the offset of ports to 1. This is done to ensure that there will be no port conflicts when you run multiple WSO2 products simultaneously on the same server.

    ```
    <Ports>
    <Offset>1</Offset>
    ...
    ```

3. If you are using WSO2 MB version 2.0.0 or 2.1.0 , change the default virtual host to carbon in `<MB_HOME>/repository/conf/advanced/qpid-virtualhosts.xml` file.

    ```
    <virtualhosts>
        <default>carbon</default>
    ...
    ```

4. Start WSO2 MB server by executing `wso2server.sh` (or `wso2server.bat` in Windows) file in the `<MB_HOME>/bin` directory.

### Set up WSO2 ESB

1. Download and install WSO2 ESB from  http://wso2.com/products/enterprise-service-bus . Installation home will be referred to as `<ESB_HOME>`. For a list of prerequisites and step-by-step installation instructions, refer to  Installation Guide in the WSO2 ESB documentation.

2. Copy the following files from `<MB_HOME>/client-lib` to `<ESB_HOME>/repository/components/lib`.

    - `geronimo-jms_1.1_spec-1.1.0.wso2v1.jar`
    - `andes-client-0.13.wso2v8.1.jar`

3. Enable the JMS transport receivers and senders by uncommenting the relevant sections in the `<ESB_HOME>/repository/conf/axis2/axis2.xml` file. For example:

    ```
    
    <transportReceiver name="jms" class="org.apache.axis2.transport.jms.JMSListener">
            <parameter name="myTopicConnectionFactory" locked="false">
               <parameter name="java.naming.factory.initial" locked="false">org.wso2.andes.jndi.PropertiesFileInitialContextFactory</parameter>
                <parameter name="java.naming.provider.url" locked="false">repository/conf/jndi.properties</parameter>
                <parameter name="transport.jms.ConnectionFactoryJNDIName" locked="false">TopicConnectionFactory</parameter>
                <parameter name="transport.jms.ConnectionFactoryType" locked="false">topic</parameter>
            </parameter>
            <parameter name="myQueueConnectionFactory" locked="false">
                <parameter name="java.naming.factory.initial" locked="false">org.wso2.andes.jndi.PropertiesFileInitialContextFactory</parameter>
                <parameter name="java.naming.provider.url" locked="false">repository/conf/jndi.properties</parameter>
                <parameter name="transport.jms.ConnectionFactoryJNDIName" locked="false">QueueConnectionFactory</parameter>
               <parameter name="transport.jms.ConnectionFactoryType" locked="false">queue</parameter>
            </parameter>
            <parameter name="default" locked="false">
                <parameter name="java.naming.factory.initial" locked="false">org.wso2.andes.jndi.PropertiesFileInitialContextFactory</parameter>
                <parameter name="java.naming.provider.url" locked="false">repository/conf/jndi.properties</parameter>
                <parameter name="transport.jms.ConnectionFactoryJNDIName" locked="false">QueueConnectionFactory</parameter>
                <parameter name="transport.jms.ConnectionFactoryType" locked="false">queue</parameter>
            </parameter>
    </transportReceiver>
    .........
     
     
    <transportSender name="jms" class="org.apache.axis2.transport.jms.JMSSender"/>
    ```

4. Define the following properties in the <ESB_HOME>/repository/conf/jndi.properties file.

    ```
    .....
    #Need change QueueConnection factory as follows
    connectionfactory.QueueConnectionFactory = amqp://admin:admin@clientID/carbon?brokerlist='tcp://localhost:5673'
    connectionfactory.TopicConnectionFactory = amqp://admin:admin@clientID/carbon?brokerlist='tcp://localhost:5673'
    
    # register some queues in JNDI using the form
    # queue.[jndiName] = [physicalName]
    queue.myqueue=myqueue
    
    # register some topics in JNDI using the form - Commented since this sample is not going to use Topics
    # topic.[jndiName] = [physicalName]
    #topic.MyTopic = example.MyTopic
    ```

5. Start the sample Axis2 server on ports `9001` and `9002`. For instructions, refer to the section Setting up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console,  navigate to the Main menu and click Source View in the Service Bus section . Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.  

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="StockQuoteProxy"
          transports="http"
          startOnLoad="true"
          trace="disable">
      <description/>
      <target>
            <!-- Send message to WSO2 MB -->
         <endpoint>
            <address uri="jms:/myqueue?transport.jms.ConnectionFactoryJNDIName=QueueConnectionFactory&amp;java.naming.factory.initial=org.wso2.andes.jndi.PropertiesFileInitialContextFactory&amp;java.naming.provider.url=repository/conf/jndi.properties&amp;transport.jms.DestinationType=queue"/>
         </endpoint>
         <inSequence>
            <property name="OUT_ONLY" value="true"/>
            <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
            <property name="transport.jms.ContentTypeProperty"
                      value="Content-Type"
                      scope="axis2"/>
         </inSequence>
         <outSequence>
            <property name="TRANSPORT_HEADERS" scope="axis2" action="remove"/>
            <send/>
         </outSequence>
      </target>
   </proxy>
   <sequence name="fault">
      <log level="full">
         <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
         <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
         <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
      </log>
      <drop/>
   </sequence>
   <sequence name="main">
      <log/>
      <drop/>
   </sequence>
</definitions>
```

## Set up the sample scenario

Send a request using Stock Quote client to the proxy service in the following manner. For information on the Stock Quote client, refer to the Sample Clients section in WSO2 ESB documentation.

```
ant stockquote -Dtrpurl=http://localhost:8280/services/StockQuoteProxy -Dsymbol=WSO2
```

Note that the request is stored in WSO2 Message Broker. Any consumer can access the stored message by accessing  destinationMyQueue in WSO2 Message Broker.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- **Proxy service** [line 3 in ESB config] - Defines a proxy service named StockQuoteProxy.
- **endpoint** [line 10 in ESB config] - Defines an endpoint inside the proxy service. The address of the endpoint is a JMS URL. The JMS URL is made up of the following elements:
    - **jms:/myqueue** - Looks for a JNDI entry myqueue (see JNDI properties above).
    - **?** - Separator indicating extra attributes.
    - **transport.jms.ConnectionFactoryJNDIName=QueueConnectionFactory** - Looks up ConnectionFactory in JNDI with name QueueConnectionFactory.
    - **&amp;**  - Separator (this will convert to ‘&’)
    - **java.naming.factory.initial=org.wso2.andes.jndi.PropertiesFileInitialContextFactory** -  Uses the andes properties-based JNDI.
    - **&amp;**  - Another separator (this will convert to ‘&’)
    - **java.naming.provider.url=repository/conf/jndi.properties** - Looks in `repository/conf/jndi.properties` for the JNDI properties file.
