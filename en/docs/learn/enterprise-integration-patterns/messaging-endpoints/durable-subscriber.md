# Durable Subscriber

This section explains, through a sample scenario, how the Durable Subscriber EIP can be implemented using WSO2 ESB.

## Introduction to Durable Subscriber

The Durable Subscriber EIP avoids missing messages while it’s not listening for them. It makes the messaging system save messages published while the subscriber is disconnected. This pattern is similar to the Publish-Subscribe EIP, which temporarily stores a message if a subscriber is offline at the time a message is published, and sends the message when it gets online again. 

!!! info
    For more information, see the [Durable Subscriber](http://www.eaipatterns.com/DurableSubscription.html) documentation.

![Durable subscription solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/durable-subscription-solution.gif)

## Sample scenario

This sample scenario demonstrates how a message is duplicated and routed to the subscribers using the Clone mediator when the publisher sends a message. We have two Axis2 servers as the subscribers. If only one subscriber is online at the time a message is sent, instead of discarding the message, it will be stored in a message store. The message forwarding processor will attempt to send the message in the store until the subscriber comes online. When the subscriber comes online, the message will be successfully delivered.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/durable-subscriber.png" style="width: 70%;" alt="Durable subscriber">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Durable Subscriber EIP by comparing their core components.

| Durable Subscriber EIP (Figure 1) | Durable Subscriber Sample Scenario (Figure 2)    |
|-----------------------------------|--------------------------------------------------|
| Publisher                         | Simple Stock Quote Client                        |
| Publish Subscribe Channel         | Clone Mediator, Message Store, Message Processor |
| Durable Consumer                  | Simple Stock Quote Service                       |
| Non Durable Consumer              | Simple Stock Quote Service                       |

### Environment setup

1. Download and install the WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start three sample Axis2 server instances on ports `9000` and `9001`. For instructions, see Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```
<!-- Durable Subscriber Proxy-->
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <taskManager provider="org.wso2.carbon.mediation.ntask.NTaskTaskManager"/>
   <registry provider="org.wso2.carbon.mediation.registry.WSO2Registry">
        <parameter name="cachableDuration">15000</parameter>
   </registry>
   <proxy xmlns="http://ws.apache.org/ns/synapse"
    name="PublishProxy"
    transports="http"
    statistics="disable"
    trace="disable"
    startOnLoad="true">
         <target>
         <inSequence>
            <property name="FORCE_SC_ACCEPTED"
             value="true"
             scope="axis2"
             type="STRING"/>
               <clone>
                  <target sequence="DurableSubscriber"/>
                  <target sequence="NonDurableSubscriber"/>
               </clone>
          </inSequence>
          <outSequence>
             <drop/>
          </outSequence>
          </target>
            <description/>
   </proxy>
    <!-- Error Sequences -->
    <sequence name = "sub1_fails" >
       <store messageStore="pending_subscriptions" />
    </sequence>
    <sequence name = "sub2_fails" >
         <drop/>
    </sequence>
    <!-- Subscription List-->
    <sequence name="DurableSubscriber" onError="sub1_fails" xmlns="http://ws.apache.org/ns/synapse">
        <in>
          <property name="OUT_ONLY" value="true"/>
          <send>
            <endpoint name="Subscriber 1">
                 <address uri="http://localhost:9000/services/SimpleStockQuoteService/"/>
            </endpoint>
          </send>
        </in>
    </sequence>
    <sequence name="NonDurableSubscriber" onError="sub2_fails" xmlns="http://ws.apache.org/ns/synapse">
        <in>
          <property name="OUT_ONLY" value="true"/>
          <send>
            <endpoint name="Subscriber 2">
                 <address uri="http://localhost:9001/services/SimpleStockQuoteService/"/>
            </endpoint>
          </send>
        </in>
    </sequence>
    <!-- Re Direction End Points -->
    <endpoint name="DurableSubscriberEndpoint"> 
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/> 
    </endpoint>

    <!-- Message Store And Process -->
    <messageStore name="pending_subscriptions"/>
       
    <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="send_pending_message"
    messageStore="pending_subscriptions">
        <parameter name="interval">1000</parameter>
        <parameter name="max.delivery.attempts">50</parameter> 
        <parameter name="target.endpoint">DurableSubscriberEndpoint</parameter>
    </messageProcessor>      
</definitions>
```

## Set up the sample scenario

Use a SOAP client like [SoapUI](https://www.soapui.org/) to forward the following request to the PublishProxy service. 

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:placeOrder>
         <ser:order>
            <xsd:price>10</xsd:price>
            <xsd:quantity>100</xsd:quantity>
            <xsd:symbol>foo</xsd:symbol>
         </ser:order>
      </ser:placeOrder>
   </soapenv:Body>
</soapenv:Envelope>
```

Note that both Axis2 servers receive the request. Next, stop the Axis2 server running on port `9000` (the Durable Subscriber) and resend the request again. Note that the Durable Subscriber will not receive the request. Start the Axis2 server on port 9000. Note that the previously undelivered message will be delivered. We can do the same for the Axis2 server running on port `9001` (the Non Durable Subscriber). In that case, when the server is back on, any previously undelivered messages will not be received.

### How the implementation works

Let us investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above.

- **Proxy Service** [line 6 in ESB config ] - A proxy service takes an incoming Stock Quote client request and clones the request by forwarding one copy each to two target sequences, DurableSubscriber and NonDurableSubscriber.

- **Sequence** [line 29 in ESB config] - The DurableSubscriber sequence forwards the message to the Durable Endpoint. This endpoint has the onError attribute set to the sub1_fails sequence (line 21 in ESB config), which will store the message in case of a failure.

- **Sequence** [line 38 in ESB config] - The NonDurableSubscriber sequence works the same as the sequence described above. The only difference is that on failure, the sub2_fails sequence (line 25 in ESB config) is called, which simply drops the message.

- **Sequence** [line 21 in ESB config] - This sequence sets the target.endpoint property for the DurableEndpointSubscriber endpoint (defined on line 48 in ESB config), and uses a Store Mediator to define the message store used to save the message. In this example, it is the store with key pending_subscription.

- **messageStore** [line 53 in ESB config] - Defines a new message store with the name pending_subscriptions.

- **messageProcessor** [line 55 in ESB config] - The messageProcessor is used to define the type of processing done to a particular messageStore, which in this example is pending_subscription. This example defines a messageProcessor that uses a ScheduledMessageForwardingProcessor, which retries sending the messages every second with a maximum number of delivery attempts set to 50. 

