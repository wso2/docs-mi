# Publish-Subscribe Channel

This section explains, through an example scenario, how the Publish-Subscribe Channel EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Publish-Subscribe Channel

The Publish-Subscribe Channel EIP receives messages from the input channel, and then splits and transmits them among its subscribers through the output channel. Each subscriber has only one output channel. For more information, go to Publish Subscribe Channel. 

![Publish subscribe solution ]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/publish-subscribe-solution.gif)

## Sample scenario

The example scenario depicts an inventory for stocks, and how the EIP distributes a sent message among several subscribers. It has several Stock Quote (Axis2) server instances. When a message arrives to the ESB profile of WSO2 EI, it is transmitted to these server instances, each of which acts as a subscriber through the event mediator.

The diagram below depicts how to simulate the example scenario using the ESB profile of WSO2 EI.

![Publish-Subscribe Channel sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/publish-subscribe-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Publish-Subscribe Channel EIP by comparing their core components.

| Publish-Subscribe Channel EIP (Figure 1) | Publish-Subscribe Channel Example Scenario (Figure 2) |
|------------------------------------------|-------------------------------------------------------|
| Subscriber                               | Stock Quote server instance                           |
| Publisher Subscriber Channel             | Event Mediator                                        |
| Publisher                                | Stock Quote Request                                   |

## The ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this. 

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="PublishSubscribeChannel" startOnLoad="true" transports="http,https">
       <target>
           <inSequence>
               <event topic="PublisherSubsciber"/>
           </inSequence>
       </target>
   </proxy>
</definitions>
```

### How the implementation works

Let's investigate the elements of the configuration in detail.

* main sequence [line 10 in config] - The default sequence that gets triggered when the user invokes the ESB profile of WSO2 EI.
* event [line 12 in config] - Allows you to define a set of receivers.

## Set up the sample scenario

Now, let's try out the sample scenario explained above.

### Set up the environment

Download the  `Publish-Subscribe-Channel.zip` , which includes the artifacts of this sample and follow the steps in Simulating a Sample Scenario.

!!! note
    You need to start two instances of the Axis2 server to run in ports 900 and 9001 by executing the following commands:
    
    ```
    ./axis2server.sh -http  9000 -https  9002 -name MyServer1
    ./axis2server.sh -http  9001 -https  9003 -name MyServer2
    ```

Follow the steps below to create an event:

1. Start the ESB profile and log into its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

2. On the Management Console of the ESB profile, navigate to the **Main** menu, click **Topics**, and then click **Add**.

3. Enter the name  `PublisherSubsciber` as the topic, and click **Add Topic**.

4. You will be directed to the **Topic Browser** tree view where the new topic is displayed. Click the new topic and select **Subscribe** to create a static subscription. Enter `http://localhost:9000/services/SimpleStockQuoteService` as the **Event Sink URL**, and click **Subscribe**.

5. Repeat these steps to add another subscriber on port `9001`.  

## Execute the sample

Execute the following command to send a request using the `Stock Quote Client` to the ESB profile:

```
ant stockquote -Dtrpurl=http://localhost:8280/services/PublishSubscribeChannel -Dsymbol=foo
```

For information on the `Stock Quote Client` and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation.

After executing the above command, note that both `Stock Quote` service instances log a message accepting the request. The structure of the request is as follows:

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>   
         <ser:request>         
            <xsd:symbol>foo</xsd:symbol>
         </ser:request>        
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

When you execute the command above, the request is sent to the  Stock Quote  service. Notice the following processed server log in both Axis 2 servers:

!!! info
    In this sample, WSO2 ESB sends the request to both subscribers configured with the two event sinks. However, the `Stock Service Client` does not receive a response from them.

Generating quote for : foo
