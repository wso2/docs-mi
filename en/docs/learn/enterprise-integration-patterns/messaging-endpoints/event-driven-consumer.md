# Event-Driven Consumer

This section explains, through a sample scenario, how the Event-Driven Consumer EIP can be implemented using the ESB Profile of WSO2 Enterprise Integrator (WSO2 EI). 

## Introduction to Event-Driven Consumer

The Event-Driven Consumer EIP allows an application to automatically consume messages as they become available. 

!!! info
    For more information, see the [Event-Driven Consumer](http://www.eaipatterns.com/EventDrivenConsumer.html) documentation.

![Event-driven consumer]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/event-driven-consumer-solution.gif)

## Sample scenario

This EIP is also referred to as an asynchronous receiver. This sample scenario demonstrates how an event will be triggered based on the availability of the receiver and a message will be consumed by the receiver.

The diagram below depicts how to simulate the sample scenario using the ESB Profile of WSO2 EI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/event-driven-consumer.png" style="width: 70%;" alt="Event-driven consumer">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Event-Driven Consumer EIP by comparing their core components.

| Event-Driven Consumer EIP (Figure 1) | Event-Driven Consumer Sample Scenario (Figure 2) |
|--------------------------------------|--------------------------------------------------|
| Sender                               | Simple Stock Quote Client                        |
| Message                              | Simple Stock Quote Request                       |
| Event Driven Consumer                | Event Mediator                                   |
| Receiver                             | Simple Stock Quote Service                       |

### Environment setup

1. Download and install the ESB Profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.

2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.

3. Follow the steps below to create an event.

    - Start the ESB Profile and log into its management console UI (`https://localhost:9443/carbon`).
    - Select the Topics menu from the Main menu and then select the Add sub menu.
    - Enter EventConsumerTopic as the name of the topic, and then click Add Topic.
    - Click EventConsumerTopic in the topic browser tree, and then click Subscribe to create a static subscription.
    - Enter the value `http://localhost:9000/services/SimpleStockQuoteService` in the Event Sink URL field and click Subscribe.

## ESB configuration

On the Management Console of the ESB Profile, navigate to the Main menu and click Source View in the Service Bus section . Next, copy and paste the following configuration to the source view. Then you can explore the sample scenario 

```xml
<definitions xmlns="http://ws.apache.org/ns/synapse">
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
      <event topic="EventConsumerTopic"/>
   </sequence>
</definitions>
```

## Set up the sample scenario

Send a request using the Stock Quote client to the ESB as follows:

```
ant stockquote -Dtrpurl=http://localhost:8280 -Dsymbol=foo
```

For information on the Stock Quote Client and its operation modes, see Stock Quote Client in the WSO2 EI Documentation.

After sending the request, note that a message accepting the request is displayed on the Stock Quote service's console. This is triggered as an event when the message is published into the topic EventConsumerTopic that you created earlier. All subscribers will receive the topic.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration provided above.

- **event** [line 13 in ESB config] - Allows you to define a set of subscribers to receive messages when the topic subscribes to receives a message. Also, see Eventing.
