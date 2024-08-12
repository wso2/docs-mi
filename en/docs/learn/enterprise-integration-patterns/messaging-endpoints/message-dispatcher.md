# Message Dispatcher

This section explains, through a sample scenario, how the Message Dispatcher EIP can be implemented using WSO2 ESB.

## Introduction to Message Dispatcher

The Message Dispatcher EIP consumes messages from a single channel and distributes them among performers. It allows multiple consumers on a single channel to coordinate their message processing. 

!!! info
    For more information, see the [Message Dispatcher](http://www.eaipatterns.com/MessageDispatcher.html) documentation.

![Message dispatcher]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/message-dispatcher.gif)

## Sample scenario

This sample scenario demonstrates how to distribute messages among performers using the weighted load balance mediator. We have several Axis2 server instances, each considered to be a performer.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-endpoints/message-dispatcher.png" style="width: 70%;" alt="Message dispatcher">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Message Dispatcher EIP by comparing their core components.

| Message Dispatcher EIP (Figure 1) | Message Dispatcher Sample Scenario (Figure 2) |
|-----------------------------------|-----------------------------------------------|
| Sender                            | Simple Stock Quote Client                     |
| Messages                          | Simple Stock Quote Requests                   |
| Message Dispatcher                | Message Endpoint, Load-Balance Endpoint       |
| Performers                        | Simple Stock Quote Server Instance            |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Getting Started in the WSO2 ESB documentation.

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
               <loadbalance algorithm="org.apache.synapse.endpoints.algorithms.WeightedRoundRobin">
                  <endpoint>
                     <address uri="http://localhost:9000/services/SimpleStockQuoteService/"/>
                     <property name="loadbalance.weight" value="1"/>
                  </endpoint>
                  <endpoint>
                     <address uri="http://localhost:9001/services/SimpleStockQuoteService/"/>
                     <property name="loadbalance.weight" value="2"/>
                  </endpoint>
                  <endpoint>
                     <address uri="http://localhost:9002/services/SimpleStockQuoteService/"/>
                     <property name="loadbalance.weight" value="3"/>
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

Repeatedly send several requests to the ESB using the Stock Quote client as follows:

```
ant stockquote -Dtrpurl=http://localhost:8280/ -Dsymbol=foo
```

Following is the request sent by the Stock Quote client in this example:

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

Note in each Axis2 server console that the requests are distributed among several servers in a weighted manner. Servers running on port `9000`, `9001`, and `9002` receive the request in that order until the process starts over again in a round-robin manner.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above.

- **endpoint** [line 13 in ESB config] - Defines the endpoint where the request should be sent.
- **loadbalance** [line 14 in ESB config] - Defines a set of endpoints where incoming requests are distributed using a particular algorithm. In this example, the algorithm distributes messages in a weighted round-robin manner.
