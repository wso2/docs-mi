# Event Message

This section explains, through an example scenario, how the Event Message EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Event Message

The Event Message EIP is used for reliable, asynchronous event notification between applications. 

!!! info
    For more information, see the [Event Message](http://www.eaipatterns.com/EventMessage.html).

![Event message solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/event-message-solution.gif)

## Sample scenario

When a subject has an event to be announced, it will crate an event object, wrap it in a message, and send it to a set of subscribers. This example scenario depicts several Axis2 server instances as subscribers. When a message arrives to the ESB profile, it will be transmitted through the event mediator to each of these server instances that acts as a subscriber.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Event message]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/event-message.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Event Message EIP by comparing their core components.

| Event Message EIP (Figure 1) | Event Message Example Scenario (Figure 2) |
|------------------------------|-------------------------------------------|
| Subject                      | Stock Quote Client                        |
| Event Message                | Event, Topic                              |
| Observer                     | Stock Quote Service Instance              |

##  ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this. 

```
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="EventMessageProxy" transports="https http" startOnLoad="true" trace="disable">
      <target>
         <inSequence>
            <event topic="stockquote" />
         </inSequence>
         <outSequence>
            <send />
         </outSequence>
      </target>
   </proxy>
</definitions>
```

### How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration shown above.

- Event [line 12 of config] - Sends incoming events to the topics that you created earlier.

## Set up the sample scenario

Now, let's try out the sample scenario explained above.

### Set up the environment

1. Download the `Event-Message.zip`, which includes the artifacts of this sample and follow the steps in Simulating a Sample Scenario.

2. Follow the steps below to create an event.

    1. Start the ESB profile and log into its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

   2. Select the **Topics** menu from the **Main** menu, and then select the **Add** sub menu.

   3. Enter the name `stockquote` for the topic and then click **Add Topic**.

   4. In the Topic Browser tree, click the newly created `stockquote` topic and then click **Subscribe** to create a static subscription.

   5. Enter the value http://localhost:9000/services/SimpleStockQuoteService in the **Event Sink URL** field and click **Subscribe**.

   6. Repeat these steps to add another subscriber in port `9001`.

## Execute the sample

Send the following message from a SOAP client like SoapUI to the ESB profile.

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

Observe the two Axis2 server instances. Both instances will receive the request, which was sent from the client.

Output of both Axis Server consoles:

samples.services.SimpleStockQuoteService :: Generating quote for : foo

You don't get a response in the Soap UI.
