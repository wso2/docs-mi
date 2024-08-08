# Message Expiration

This section explains, through an example scenario, how the Message Expiration EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Message Expiration

The Message Expiration EIP allows a sender to indicate when a message should be considered stale and shouldn’t be processed. You can set the Message Expiration to specify a time limit in which a message is viable. 

!!! info

    For more information, see the [Message Expiration](http://www.eaipatterns.com/MessageExpiration.html) documentation.

![Message expiration solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/message-expiration-solution.gif)

## Sample scenario

This example scenario simulates message expiration using the endpoint timeout property in the ESB profile. Message expiration sets a time limit for a sent message to be visible. If the limit is exceeded, the message will be discarded without being sent to the receiver.

While setting a delivery timeout for a message in the Message Expiration EIP can be an inherent component of a sender process, the ESB profile can implement this EIP through the use of an endpoint timeout. Alternatively, you can use a MessageStore with a Time To Live duration set by the ESB profile, which expires messages if this duration is reached before passing the message to the intended receivers.

The diagram below depicts how to simulate the example scenario in the ESB profile.

![Message expiration]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/message-expiration.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Message Expiration EIP by comparing their core components.

| Message Expiration EIP (Figure 1) | Message Expiration Example Scenario (Figure 2) |
|-----------------------------------|------------------------------------------------|
| Sender                            | Stock Quote Client                             |
| Channel                           | Proxy Service                                  |
| Dead Letter Channel               | Fault Sequence                                 |
| Intended Receiver                 | Stock Quote Service Instance                   |

### Environment setup

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.

2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.

3. Deploy the back-end service SimpleStockQuoteService. For instructions on deploying sample back-end services, go to Deploying sample back-end services in WSO2 EI Documentation.

4. Download `Message-Expiration.zip` file.

## ESB configuration

Start the ESB profile and log into its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

On the Management Console, navigate to the Main Menu and click Source View in the Service Bus section. Copy and paste the following configuration to the source view. You can now explore the example scenario. 

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
<proxy xmlns="http://ws.apache.org/ns/synapse" name="MessageExpirationProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
   <target>
      <inSequence onError="LogAndDropMessageFault">
         <log level="full"/>
      </inSequence>
      <outSequence onError="fault">
         <log level="full"/>
         <send/>
      </outSequence>
      <endpoint name="TimeoutEndpoint">
         <address uri="http://localhost:9000/services/SimpleStockQuoteService">
            <timeout>
               <duration>30000</duration>
               <responseAction>fault</responseAction>
            </timeout>
         </address>
      </endpoint>
   </target>
</proxy>
<sequence name="LogAndDropMessageFault">
   <log level="full">
      <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
      <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
      <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
   </log>
   <drop/>
</sequence>
</definitions>
```

## Set up the sample scenario

1. Execute the following command to send a request using the Stock Quote Client to the ESB profile:

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/services/MessageExpirationProxy -Dsymbol=foo
    ```
    
    For information on the Stock Quote Client and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation.
    
    Notice the expected response for the request. 

2. Next, drop the Axis2 server instance and restart the ESB profile. The endpoint will time out and be suspended after the timeout period, causing a fault condition.

    Stock Client output: Standard :: Stock price = $75.84091852848711
    Axis2 output: Generating quote for : foo

### How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration shown above.

- Endpoint [line 13 in config] - Defines the back-end service the messages are passed to.
- timeout [line 15 in config] - Defines the timeout duration in milliseconds, and also the action to take (fault or discard) in the event of a response timeout. In this example scenario, when a timeout occurs, the LogAndDropMessageFault sequence activates where the message is dropped using the Drop Mediator. An alternative to dropping the message is to pass the message to a Dead Letter Channel. 
