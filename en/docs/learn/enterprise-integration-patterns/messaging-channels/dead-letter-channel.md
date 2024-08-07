# Dead Letter Channel

This section explains, through an example scenario, how the Dead Letter Channel EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Dead Letter Channel

The Dead Letter Channel (DLC) EIP outlines how messaging systems can handle messages that cannot be delivered to the recipient. Due to system/network failures or failures at the recipient's end, messages sometimes do not get delivered to the target. In such cases, the messaging system can deliver the message to a DLC. Different mechanisms implemented in the DLC take care of delivering the dead message to the target. One method is periodically retrying to send the message to the recipient over a defined period of time. Persistence of the dead message is another option, which ensures that the dead messages are delivered to the receivers once the system is rebooted, even if the messaging system fails.

For more information, see the [Dead Letter Channel](https://www.enterpriseintegrationpatterns.com/patterns/messaging/DeadLetterChannel.html) documentation.

![Dead letter channel solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/dead-letter-channel-solution.gif)

## Sample scenario

This example takes a proxy service called StockQuoteProxy, which fronts a service by the name SimpleStockQuoteService. As long as the SimpleStockQuoteService is running, the clients calling StockQuoteProxy service get responses. But if the SimpleStockQuoteService is down or a failure occurs while trying to send the message to the SimpleStockQuoteService, the faultSequence of the StockQuoteProxy will get invoked, and the message will be forwarded to the dead letter channel.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Dead letter channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/dead-letter-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Dead Letter Channel EIP by comparing their core components. We use three constructs of the ESB profile to implement the Dead Letter Channel EIP.

| Dead Letter Channel EIP (Figure 1)  | Dead Letter Channel Example Scenario (Figure 1)    |
|-------------------------------------|----------------------------------------------------|
| Sender                              | Stock Quote Client                                 |
| Intended Recipient                  | Stock Quote Service Instance                       |
| Dead Letter Channel                 | Store mediator, Message stores, Message processors |
| Intended Receiver                   | Simple Stock Quote Service                         |

The diagram below depicts the DLC architecture in the ESB profile.

![DLC Architecture]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/dlc-architecture.png)

The store mediator stores the dead message in the specified message store. The message processor retrieves stored messages from its associated message store and tries to resend those messages to the target receiver. The message store and message processor combination acts as the dead letter channel.

## ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this.

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="DeadLetterChannelProxy" transports="https http" startOnLoad="true" trace="disable">
       <description/>
       <target>
           <endpoint>
               <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
           </endpoint>
           <inSequence>
               <log level="custom">
                   <property name="Sending request to Endpoint" value="SimpleStockQuoteService"/>
               </log>
           </inSequence>
           <outSequence>
               <log level="custom">
                   <property name="Sending response back to" value="client"/>
               </log>
               <respond/>
           </outSequence>
           <faultSequence>
               <log level="custom">
                   <property name="Fault happened" value="Sending to the DLC store"/>
               </log>
               <store messageStore="dlc-store"/>
           </faultSequence>
       </target>
       <publishWSDL uri="http://localhost:9000/services/SimpleStockQuoteService?wsdl"/>
   </proxy>
   <endpoint name="SimpleStockQuoteService">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
   </endpoint>
   <messageStore name="dlc-store"/>
</definitions>
```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- `faultSequence` - The fault sequence. The proxy service `StockQuoteProxy` runs in the event of a fault or error. 
- `store` - The store mediator loads the message store defined in line 53. 
- `messageStore` - Defines the message store to use, which we created using the ESB profile Management Console in step 2 above. 
- `messageProcessor` - The `messageProcessor` defines the processing algorithm, the period of time to retry sending messages in case of a failure, and the maximum number of retry attempts.

## Set up the sample scenario

Now, let's try out the sample scenario explained above.

### Set up the environment

Download the `Dead-Letter-Channel.zip`, which includes the artifacts of this sample and follow the steps in Simulating a Sample Scenario.

## Execute the sample

Use SoapUI or ESB profile's Try It tool to send the following request to the StockQuoteProxy service. For information on the Stock Quote Client and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation.

![Soap UI]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/soap-ui.png)

## Analyze the output

1. A message similar to the one below appears in the simple Axis2 server.

    ```
    
    ```

2. Stop the Axis2 server, and resend the same request. Note that the message sending fails, and the message processor tries to resend the message every few seconds.

3. Restart the Axis2 server, and note that the message will be delivered to SimpleStockQuoteService once the server is running.

Execute the following command for Stock Quote Client:

```
ant stockquote -Dtrpurl=http://localhost:8280/services/DeadLetterChannelProxy
```

Axis2 output:

Generating quote for : IBM

Stock Quote Client output:

Standard :: Stock price = $146.31993212382798

Stop the Axis2 server, and resend the same request. View the message count beomes 1 in the Stores (Management Console)

Restart the Axis2 server, and note that the message will be delivered to SimpleStockQuoteService once the server is running.

![Message store]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/message-store.png)
