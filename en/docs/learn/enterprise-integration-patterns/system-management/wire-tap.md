# Wire Tap

This section explains, through a sample scenario, how the Wire Tap EIP can be implemented using WSO2 ESB.

## Introduction to Wire Tap

The Wire Tap EIP inspects messages that travel on a Point-to-Point Channel EIP. It inserts a simple Recipient List into the channel that publishes each incoming message to the main channel and a secondary channel. 

!!! info
    For more information, see the [Wire Tap](http://www.eaipatterns.com/WireTap.html) documentation.

![Wire tap]({{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/wire-tap.gif)

## Sample scenario

This sample scenario demonstrates how the Log mediator in WSO2 ESB can be used to tap in between two message flows. The log mediator indicates the structure of the message in the ESB console each time it is called.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/wire-tap.png" style="width: 70%;" alt="Wire tap">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Wire Tap EIP by comparing their core components.

| Wire Tap EIP (Figure 1) | Wire Tap Sample Scenario (Figure 2) |
|-------------------------|-------------------------------------|
| Source                  | Simple Stock Quote Client           |
| Wire Tap                | Log Mediator                        |
| Destination             | Simple Stock Quote Service          |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Getting Started in the WSO2 ESB documentation.

2. Start a sample Axis2 server instance on port 9000. For instructions, see ESB Samples Setup - Starting Sample Back-End Services in the WSO2 ESB documentation.

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
         <log level="full"/>
         <send>
            <endpoint>
               <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
            </endpoint>
         </send>
      </in>
      <out>
         <log level="full"/>
         <send/>
      </out>
   </sequence>
</definitions>
```

## Set up the sample scenario

Send a request using the Stock Quote client to WSO2 ESB in the following manner. For information about the Stock Quote client, refer to the Sample Clients section in the WSO2 ESB documentation.

```
ant stockquote -Dtrpurl=http://localhost:8280/ -Dsymbol=foo
```

Note that the ESB Log mediator taps into the message and displays it on the console.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above.

- **sequence** [line 10 in ESB config] - The main sequence is invoked when the a request is sent to WSO2 ESB.
- **log** [line 12 in ESB config] - The Log mediator with attribute level set to full logs the entire message that passes through. 
