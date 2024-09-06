# Message History

This section explains, through a sample scenario, how the Message History EIP can be implemented using WSO2 ESB.

## Introduction to Message History

The Message History EIP provides a list of all applications that the message passed through since its origination. It helps analyze and debug the flow of messages in a loosely coupled system. 

!!! info
    For more information, see the [Message History](http://www.eaipatterns.com/MessageHistory.html) documentation.

![Message history]({{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/message-history.gif)

## Sample scenario

Inside WSO2 ESB, a message travels through different paths and different types of mediations. This sample scenario demonstrates how to track and remember, in a fine-grained manner, which mediation processes a message passes through inside the ESB. You can store a message in WSO2 ESB using a Property Mediator. These properties are assigned to the underlying Message Context of a particular sequence a message passes through. In this example, we show how each mediation updates the message history and finally shows it using a Log Mediator.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/message-history.png" style="width: 70%;" alt="Message History">

## Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Getting Started in the WSO2 ESB documentation.

2. Start a sample Axis2 server instance on port 9000. For instructions, see ESB Samples Setup - Starting Sample Back-End Services in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```xml
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <sequence name="sendSeq">
      <property name="sendSeq"
                value="*** At Sending Sequence ***"
                scope="default"
                type="STRING"/>
      <log level="custom">
         <property name="mainSeq" expression="get-property('mainSeq')"/>
         <property name="seq1" expression="get-property('seq1')"/>
         <property name="sendSeq" expression="get-property('seq1')"/>
      </log>
      <send>
         <endpoint>
            <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
         </endpoint>
      </send>
   </sequence>

   <sequence name="seq1">
      <property name="seq1"
                value="*** At Sequence 1 ***"
                scope="default"
                type="STRING"/>
      <sequence key="sendSeq"/>
   </sequence>

   <sequence name="fault">
      <log level="full">
         <property name="MESSAGE" value="Executing default 'fault' sequence"/>
         <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
         <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
      </log>
      <drop/>
   </sequence>

   <sequence name="main">
      <in>
         <filter xmlns:ns="http://org.apache.synapse/xsd"
                 source="get-property('To')"
                 regex="http://localhost:9000.*">
            <then>
               <property name="mainSeq" value="** At Main Sequence**"/>
               <sequence key="seq1"/>
            </then>
            <else/>
         </filter>
      </in>
      <out>
         <send/>
      </out>
      <description>The main sequence for the message mediation</description>
   </sequence>
</definitions>
```

## Set up the sample scenario

Send a request using the Stock Quote client to WSO2 ESB in the following manner. For information about the Stock Quote client, refer to the section  Sample Clients   in the WSO2 ESB documentation.

```
ant stockquote -Daddurl=http://localhost:9000/services/SimpleStockQuoteService -Dtrpurl=http://localhost:8280
```

Note that the message mediates though main, seq1, and sendSeq before reaching the endpoint. Each sequence adds a property to the message, and the final Log mediator at sendSeq puts out those properties as follows:

```
INFO - LogMediator mainSeq = ** At Main Sequence**, seq1 = *** At Sequence 1 ***, sendSeq = *** At Sequence 1 ***
```

Similarly, you can add required entries to a message to track and display its mediation history.

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above step3.

- **Sequence** [line 19 in ESB config] - The sequence with key `seq1` defines a Message Context property called seq1 and calls the sequence sendSeq.

- **Sequence** [line 36 in ESB config] - This is the main sequence that is invoked when the ESB receives a request. The main sequence filters the messages (line 38 in ESB config) to determine whether the request is going to an endpoint that begins with  http://localhost:9000 . If so, a Message Context property called mainSeq is defined, and the sequence seq1 is invoked.

- **Sequence** [line 2 in ESB config] - The sequence with key send_seq defines a Message Context property called sendSeq. It then logs the properties by calling the get-property XPath function for the properties set in all the sequences, namely mainSeq, seq1, and sendSeq. After logging this information, the Send mediator is called to forward the message to the endpoint.
