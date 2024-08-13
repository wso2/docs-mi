# Channel Purger

This section explains, through a sample scenario, how the Channel Purger EIP can be implemented using WSO2 ESB.

## Introduction to Channel Purger

The Channel Purger EIP removes unwanted messages, which can disturb tests or running systems, from a channel. Channel Purger is also useful when you need to reset a messaging system to a consistent state. 

!!! info
    For more information, see the [Channel Purger](http://www.eaipatterns.com/ChannelPurger.html) documentation.

![Channel purger]({{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/channel-purger.gif)

## Sample scenario

This sample scenario is a stock quote service, and we send several stock quote requests to a message store to fill it. We then demonstrate how a user can delete left-over messages in a particular store through the management console UI of WSO2 ESB.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/channel-purger.png" style="width: 70%;" alt="Channel purger">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Channel Purger EIP by comparing their core components.

| Channel Purger EIP (Figure 1) | Channel Purger Sample Scenario (Figure 2) |
|-------------------------------|-------------------------------------------|
| Messages                      | Simple Stock Quote Requests               |
| Channel                       | Message Store                             |
| Channel Purger                | WSO2 ESB Management Console               |

### Environment setup

Download and install the WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Getting Started in the WSO2 ESB documentation.
Start the sample Axis2 server. For instructions, refer to the section ESB Samples Setup - Starting Sample Back-End Services in the WSO2 ESB documentation.

## ESB configuration

1. Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

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
          <store messageStore="PurgedData"/>
       </sequence>
       <messageStore name="PurgedData"/>
    </definitions>
    ```

2. Send several stock quote requests to the message store using the following command.

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/ -Dsymbol=foo
    ```

## Set up the sample scenario

Now that the message store is filled with several requests, let's delete some of them using the ESB management console.

1. Open the management console UI, click the Main menu and then Service Bus. Next, click the  Message Stores sub menu. This will open the Manage Message Stores window.

    <img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/manage-message-stores.png" style="width: 70%;" alt="Manage message stores">

2. Click the PurgedData option in the store. You will see the list of messages sent earlier. Click Show Envelope to view the message.

    <img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/delete-message.png" style="width: 70%;" alt="Delete message">

3. Click Delete to delete individual messages or Delete All to delete all messages at once.

### How the implementation works

- **Sequence** [line 10 in ESB config] - The main sequence is the default sequence for WSO2 ESB.
- **Store** [line 11 in ESB config] - The Store mediator stores messages in the given message store.
- **messageStore** [line 13 in ESB config] - Defines a new message store with the name PurgedData. Message purging steps are given above in the section Simulating the Sample Scenario.
