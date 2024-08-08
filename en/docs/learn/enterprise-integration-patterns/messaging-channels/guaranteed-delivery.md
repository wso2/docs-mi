# Guaranteed Delivery

This section explains, through an example scenario, how the Guaranteed Delivery EIP can be implemented using the ESB profile of WSO2 EI. 

## Introduction to Guaranteed Delivery

The Guaranteed Delivery EIP ensures safe delivery of a message by storing it locally and transmitting it to the receiver's data store. Even when the receiver is offline, the EIP ensures that the message goes through when the receiver comes online. For more information, go to Guaranteed Delivery.

![Guaranteed messaging solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/guaranteed-messaging-solution.gif)

## Sample scenario

This example is a stock quote service where a stock quote request is sent to a specific endpoint when the receiver is offline. An Axis2 server acts as the receiver. The ESB profile stores the request message in a JMS message store provided by the ESB profile. In this scenario a Message Broker acts as the JMS message store. Here, the Message Broker can either be the Message Broker profile of WSO2 EI or ActiveMQ.

The ESB profile periodically checks whether the receiver is online using a Message Forwarding Processor and delivers the message to the endpoint when the receiver comes online.

The existing sample explains connecting to MB or activeMQ as a store. Since this is a sample we are using an in-memory message store.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Guaranteed delivery]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/guaranteed-delivery.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Guaranteed Delivery EIP by comparing their core components.

| Guaranteed Delivery EIP (Figure 1)  | Guaranteed Delivery Example Scenario (Figure 2)   |
|-------------------------------------|---------------------------------------------------|
| Sender                              | Stock Quote Client                                |
| Store                               | Message Store                                     |
| Receiver                            | Stock Quote Service Instance                      |

## Set up the environment

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.

2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.

3. Deploy the back-end service SimpleStockQuoteService. For instructions on deploying sample back-end services, go to Deploying sample back-end services in WSO2 EI Documentation.

4. Start the Message Broker profile of WSO2 EI (or ActiveMQ). For instructions, go to Starting the Message Broker profile in WSO2 EI Documentation.

5. Start the ESB profile and log in to its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

6. In the Management Console, navigate to the Main menu and click Source View in the Service Bus section.

7. Click the required tab based on the Message Broker you are using, and then copy and paste the relevant configuration to the source view.

=== "Configuration for Message Broker Profile"
      ```
      <definitions xmlns="http://ws.apache.org/ns/synapse">
         <proxy name="GuranteedDeliveryProxy"
                transports="http https"
                startOnLoad="true">
            <target>
               <inSequence>
                  <sequence key="delivery_seq"/>
               </inSequence>
               <outSequence>
                  <send/>
               </outSequence>
            </target>
         </proxy>
         <endpoint name="StockReqEndPoint">
            <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
         </endpoint>
         <sequence name="delivery_seq" onError="delivery_fail">
            <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
            <property name="OUT_ONLY" value="true"/>
            <enrich>
               <source type="envelope" clone="true"/>
               <target type="property" property="mssg"/>
            </enrich>
            <send>
               <endpoint key="StockReqEndPoint"/>
            </send>
         </sequence>
         <sequence name="delivery_fail">
            <log level="full"/>
            <enrich>
               <source type="property" clone="true" property="mssg"/>
               <target type="envelope"/>
            </enrich>
            <property name="target.endpoint" value="StockReqEndPoint"/>
            <store messageStore="JMStore"/>
         </sequence>
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
         <messageStore
             class="org.apache.synapse.message.store.impl.jms.JmsStore" name="JMStore">
             <parameter name="java.naming.factory.initial">org.wso2.andes.jndi.PropertiesFileInitialContextFactory</parameter>
             <parameter name="store.jms.cache.connection">false</parameter>
             <parameter name="java.naming.provider.url">repository/conf/jndi.properties</parameter>
             <parameter name="store.jms.JMSSpecVersion">1.1</parameter>
         </messageStore>
         <messageProcessor class="org.apache.synapse.message.processors.forward.ScheduledMessageForwardingProcessor"
                           name="ScheduledProcessor"
                           messageStore="JMStore">
            <parameter name="interval">10000</parameter>
         </messageProcessor>
      </definitions>
      ```
=== "Configuration for ActiveMQ"
      ```
      <definitions xmlns="http://ws.apache.org/ns/synapse">
         <proxy name="GuranteedDeliveryProxy"
                transports="http https"
                startOnLoad="true">
            <target>
               <inSequence>
                  <sequence key="delivery_seq"/>
               </inSequence>
               <outSequence>
                  <send/>
               </outSequence>
            </target>
         </proxy>
         <endpoint name="StockReqEndPoint">
            <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
         </endpoint>
         <sequence name="delivery_seq" onError="delivery_fail">
            <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
            <property name="OUT_ONLY" value="true"/>
            <enrich>
               <source type="envelope" clone="true"/>
               <target type="property" property="mssg"/>
            </enrich>
            <send>
               <endpoint key="StockReqEndPoint"/>
            </send>
         </sequence>
         <sequence name="delivery_fail">
            <log level="full"/>
            <enrich>
               <source type="property" clone="true" property="mssg"/>
               <target type="envelope"/>
            </enrich>
            <property name="target.endpoint" value="StockReqEndPoint"/>
            <store messageStore="JMStore"/>
         </sequence>
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
         <messageStore class="org.wso2.carbon.message.store.persistence.jms.JMSMessageStore"
                       name="JMStore">
            <parameter name="java.naming.factory.initial">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
            <parameter name="store.jms.cache.connection">false</parameter>
            <parameter name="java.naming.provider.url">tcp://localhost:61616</parameter>
            <parameter name="store.jms.JMSSpecVersion">1.1</parameter>
         </messageStore>
         <messageProcessor class="org.apache.synapse.message.processors.forward.ScheduledMessageForwardingProcessor"
                           name="ScheduledProcessor"
                           messageStore="JMStore">
            <parameter name="interval">10000</parameter>
         </messageProcessor>
      </definitions>
      ```

## Set up the sample scenario

1. Stop the Axis2 server instance.

2. Execute the following command to send a message to the ESB profile requesting a stock quote using the Stock Quote Client:

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/services/GuaranteedDeliveryProxy
    ```

    For information on the Stock Quote Client and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation.

3. Start the Axis2 server instance. Observe in the server Console that the message that you sent when it was offline is now successfully delivered.

When you send the first request with the Axis2 server started the output is as follows:

Axis2 server:

samples.services.SimpleStockQuoteService :: Generating quote for : IBM

ESB Console:

LogMediator Standard :: Stock price = $147.72637392119628

When you shut down the Axis2 Server the ESB Console shows this (no other output in other consoles)

```
INFO - ScheduledMessageProcessor Successfully deactivated the message processor [GuaranteedProcessor]
```

!!! note
    Axis2client will get

    ```
    org.apache.axis2.AxisFault: The input stream for an incoming message is null.
    ```

Because by adding `FORCE_SC_ACCEPTED` we respond to the clint immediately with empty body.


Send a few requests while the Axis2 server is shut down. Then, restart the Axis2 server and activate the message processor via the Management Console the output are as follows:

!!! note

    You need to activate the message processor because when the Axis2 server is shut down, it retries for four attempts as defined by `maxdeliveryattempts` property, and then deactivates the message processor.

![Activate processor]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/activate-processor.png)

You view the responses for all the requests you sent while the Axis2 server was shut down:

```
Tue Nov 14 19:04:50 IST 2017 samples.services.SimpleStockQuoteService :: Generating quote for : IBM

Tue Nov 14 19:04:51 IST 2017 samples.services.SimpleStockQuoteService :: Generating quote for : IBM

Tue Nov 14 19:04:52 IST 2017 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

ESB Console output:

```
[2017-11-14 19:04:50,854] [EI-Core]  INFO - LogMediator Standard :: Stock price = $164.73457775331943

[2017-11-14 19:04:51,421] [EI-Core]  INFO - LogMediator Standard :: Stock price = $174.99872641177635

[2017-11-14 19:04:52,417] [EI-Core]  INFO - LogMediator Standard :: Stock price = $178.85450091915658
```

### How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration above.

- proxy [line 2 in config] - This service allows you to abstract the routing logic from the client. Whatever the request is, the client sends it only to the exposed service.
- inSequence [line 6 in config] -  When the service is invoked through the client, this sequence receives the message and sends it to the routing logic.
- sequence [line 17 in config] - The sequence mediator defines a sequence block, callable by its key (defined in the name attribute).
- enrich [line 20 in config] - The enrich mediator processes messages based on the source configuration and performs the action on the target configuration.
- store [line 35 in config] - Saves the message using the message store defined by the name JMS Store.
- messageStore [line 49 in config] - Defines the message store to use and the parameters used to connect to the message store. In this example, the connection is made to an external JMS store.
- messageProcessor [line 56 in config] - Defines the message processing algorithm to use, the period of time to retry sending messages in case of a failure, and the maximum number of retry attempts.
