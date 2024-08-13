# Competing Consumers

This section explains, through a sample scenario, how the Competing Consumers EIP can be implemented using WSO2 ESB.

## Introduction to Competing Consumers

The Competing Consumers EIP relates to multiple consumers that compete with each other to receive a request from a given Point-to-Point Channel. In this pattern, requests are handled and delegated similar to how messages are handled in the Point-to-Point channel using the round-robin algorithm. 

!!! info
    For more information, see the [Competing Consumers](http://www.eaipatterns.com/CompetingConsumers.html).

![Competing consumers]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/competing-consumers.gif)

## Sample scenario

In this sample scenario, each Axis2 server instance acts as a consumer waiting for a specific message. When the client sends a message to WSO2 ESB, it diverts the request based on the round-robin algorithm among the consumers. This way, the consumers receive a request message adhering to the conditions of the algorithm.

An alternative implementation to the Competing Consumers EIP is to use a Content-Based Router and route messages to different receivers based on the content of a message.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/competing-consumers.png" style="width: 70%;" alt="Competing consumers">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Competing Consumers EIP by comparing their core components.

| Competing Consumers EIP (Figure 1) | Competing Consumers Sample Scenario (Figure 2)         |
|------------------------------------|--------------------------------------------------------|
| Sender                             | Simple Stock Quote Client                              |
| Messages                           | Simple Stock Quote Requests with Load-Balance Endpoint |
| Consumer/Receiver                  | Simple Stock Quote Server Instances                    |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start three sample Axis2 server instances on ports 9000, 9001, and 9002. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

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
      <in>
         <send>
            <endpoint>
               <loadbalance algorithm="org.apache.synapse.endpoints.algorithms.RoundRobin">
                  <endpoint>
                     <address uri="http://localhost:9000/services/SimpleStockQuoteService/"/>
                  </endpoint>
                  <endpoint>
                     <address uri="http://localhost:9001/services/SimpleStockQuoteService/"/>
                  </endpoint>
                  <endpoint>
                     <address uri="http://localhost:9002/services/SimpleStockQuoteService/"/>
                  </endpoint>
               </loadbalance>
            </endpoint>
         </send>
      </in>
      <out>
         <send/>
      </out>
   </sequence>
</definitions>
```

## Set up the sample scenario

Repeatedly send several requests to the ESB using the stockquote client as follows:

```
ant stockquote -Dtrpurl=http://localhost:8280/ -Dsymbol=foo
```

Following is the request sent by the `stockquote` client in this example.

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header />
   <soapenv:Body>
        <ser:getQuote>       
         <ser:request>
             <ser:symbol>foo</ser:symbol>
         </ser:request>     
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

Note in each Axis2 server console that the requests are distributed among several servers. Each server is acting as a competing consumer.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above.

- **endpoint** [line 13 in ESB config] - Defines the endpoint where the request should be sent.
- **loadbalance** [line 14 in ESB config] - Defines a set of endpoints where incoming requests are distributed using a particular algorithm. In this example, the algorithm distributes messages in a round-robin manner. 
