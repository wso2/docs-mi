# Durable Subscriber

This page explains how you can implement a sample scenario of Durable Subscriber EIP using WSO2 Micro Integrator.

## Introduction to Durable Subscriber

The Durable Subscriber EIP avoids missing messages while it’s not listening for them. It makes the messaging system save messages published while the subscriber is disconnected. This pattern is similar to the Publish-Subscribe EIP, which temporarily stores a message if a subscriber is offline at the time a message is published and sends the message when it gets online again. 

!!! info
    For more information, see the [Durable Subscriber](http://www.eaipatterns.com/DurableSubscription.html) documentation.

![Durable subscription solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/durable-subscription-solution.gif)

## Sample scenario

This sample scenario demonstrates how a message is duplicated and routed to the subscribers using the Clone mediator when the publisher sends a message. We have two Axis2 servers as the subscribers. If only one subscriber is online at the time a message is sent, instead of discarding the message, it will be stored in a message store. The message forwarding processor will attempt to send the message in the store until the subscriber comes online. When the subscriber comes online, the message will be successfully delivered.

The diagram below depicts how to simulate the sample scenario using the WSO2 MI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/durable-subscriber.png" style="width: 70%;" alt="Durable subscriber">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Durable Subscriber EIP by comparing their core components.

| Durable Subscriber EIP            | Durable Subscriber Sample Scenario               |
|-----------------------------------|--------------------------------------------------|
| Publisher                         | Simple Stock Quote Client                        |
| Publish Subscribe Channel         | Clone Mediator, Message Store, Message Processor |
| Durable Consumer                  | Simple Stock Quote Service                       |
| Non Durable Consumer              | Simple Stock Quote Service                       |

## Synapse configuration of the artifacts

=== "Proxy Service"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="PublishProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
         <target>
            <inSequence>
                  <clone>
                     <target sequence="DurableSubscriber"/>
                     <target sequence="NonDurableSubscriber"/>
                  </clone>
            </inSequence>
         </target>
      </proxy>
      ```
=== "DurableSubscriber Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="DurableSubscriber" onError="sub1_fails" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
         <property name="OUT_ONLY" scope="default" type="BOOLEAN" value="true"/>
         <call>
            <endpoint key="DurableSubscriberEndpoint"/>
         </call>
      </sequence>
      ```
=== "NonDurableSubscriber Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="NonDurableSubscriber" onError="sub2_fails" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
         <property name="OUT_ONLY" scope="default" type="BOOLEAN" value="true"/>
         <call>
            <endpoint key="NonDurableSubscriberEndpoint"/>
         </call>
      </sequence>
      ```
=== "DurableSubscriber Fail Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="sub1_fails" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
         <store messageStore="pending_subscriptions"/>
      </sequence>
      ```
=== "NonDurableSubscriber Fail Sequence"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="sub2_fails" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
         <drop/>
      </sequence>
      ```
=== "DurableSubscriber Endpoint"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <endpoint name="DurableSubscriberEndpoint" xmlns="http://ws.apache.org/ns/synapse">
         <address uri="http://localhost:9001/services/SimpleStockQuoteService">
         </address>
      </endpoint>
      ```
=== "NonDurableSubscriber Endpoint"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <endpoint name="NonDurableSubscriberEndpoint" xmlns="http://ws.apache.org/ns/synapse">
         <address uri="http://localhost:9002/services/SimpleStockQuoteService">
         </address>
      </endpoint>
      ```
=== "Message Store"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <messageStore name="pending_subscriptions" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" xmlns="http://ws.apache.org/ns/synapse">
      </messageStore>
      ```
=== "Message Processor"
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="send_pending_message" messageStore="pending_subscriptions" targetEndpoint="DurableSubscriberEndpoint" xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="client.retry.interval">1000</parameter>
            <parameter name="member.count">1</parameter>
            <parameter name="is.active">true</parameter>
            <parameter name="max.delivery.attempts">50</parameter>
            <parameter name="store.connection.retry.interval">1000</parameter>
            <parameter name="max.store.connection.attempts">-1</parameter>
            <parameter name="max.delivery.drop">Disabled</parameter>
            <parameter name="interval">1000</parameter>
      </messageProcessor>
      ```

### How the implementation works

Let's break down the key components of the configuration:

- **Proxy Service**: The `PublishProxy` service clones incoming requests and sends them to two different sequences: `DurableSubscriber` and `NonDurableSubscriber`.

- **DurableSubscriber Sequence**: Forward the cloned message to the `DurableSubscriberEndpoint`. If an error occurs, the `sub1_fails` sequence stores the message in the `pending_subscriptions` message store.

- **NonDurableSubscriber Sequence**: Forward the cloned message to the `NonDurableSubscriberEndpoint`. If an error occurs, the `sub2_fails` sequence simply drops the message.

- **DurableSubscriber Fail Sequence**: Stores failed messages in the `pending_subscriptions` message store for later processing.

- **NonDurableSubscriber Fail Sequence**: Drops any failed messages without further action.

- **DurableSubscriber Endpoint**: Specifies the target endpoint for the `DurableSubscriber` sequence.

- **NonDurableSubscriber Endpoint**: Specifies the target endpoint for the `NonDurableSubscriber` sequence.

- **Message Store**: Defines the `pending_subscriptions` store, where undelivered messages are kept.

- **Message Processor**: Defines a scheduled message processor that attempts to forward messages from the `pending_subscriptions` store to the `DurableSubscriberEndpoint`, retrying every second with up to 50 attempts.

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the [backend service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).

4. Extract the downloaded zip file.

5. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.

6. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ```

7. Navigate to the `MI_HOME/bin/` directory and start the `tcpmon` application. 

8. In `tcpmon` application, navigate to **Admin** tab. Add listeners to ports `9001` and `9002`, for each listener set the **target hostname** to `localhost` and **target port** to `9000` in each instance.

9. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/durable-subscriber.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

10. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

11. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

12. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.
Use a SOAP client like [SoapUI](https://www.soapui.org/) to forward the following request to the PublishProxy service. 

## Execute the sample

1. Send the following request to the service using SoapUI (or any other SOAP client).
   ```xml
      POST http://localhost:8290/services/PublishProxy

      Accept-Encoding: gzip,deflate
      Content-Type: text/xml;charset=UTF-8
      SOAPAction: "urn:placeOrder"
      Connection: Keep-Alive

      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
         <soapenv:Header/>
         <soapenv:Body>
            <ser:placeOrder xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
                  <ser:order>
                     <xsd:price>100</xsd:price>
                     <xsd:quantity>10</xsd:quantity>
                     <xsd:symbol>IBM</xsd:symbol>
                  </ser:order>
            </ser:placeOrder>
         </soapenv:Body>
      </soapenv:Envelope>
   ```
2. Stop port `9001` tcpmon (the Durable Subscriber) and resend the request again.
   
3. Stop port `9002` tcpmon (the NonDurable Subscriber) and resend the request again.
   
## Analyze the output

Note that both tcpmon tabs receive the request. Next, stop the tcpmon running on port `9000` (the Durable Subscriber) and resend the request. Notice that the Durable Subscriber has not received the request. Start the tcpmon on port `9000` again and observe that the previously undelivered message is delivered. You can repeat this for the tcpmon running on port `9002` (the Non-Durable Subscriber). In that case, when the server is back on, any previously undelivered messages will not be received.


