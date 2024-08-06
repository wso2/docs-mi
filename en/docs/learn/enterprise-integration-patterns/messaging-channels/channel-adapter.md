# Channel Adapter

This section explains, through an example scenario, how the Channel Adapter EIP can be implemented using the ESB profile of WSO2 EI. 

## Introduction to Channel Adapter

Channel Adapter accesses an application's API or data and publishes messages on a channel based on this data. Also, it receives messages and invokes functionality inside the application.

!!! info
    For more information see the [Channel Adapter](http://www.eaipatterns.com/ChannelAdapter.html) documentation.

![Channel adapter]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/channel-adapter-eip.png)

## Sample scenario

This example demonstrates the Salesforce connector of the ESB profile transferring a message coming from a stock quote client to Salesforce API and then sends the queried response that comes from Salesforce back to the client. The diagram below depicts how to simulate the example scenario using the ESB profile.

![Channel adapter]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/channel-adapter.png)

Before digging into implementation details, let's look at how the core components in the example scenario map to the Channel Adapter EIP:

| Channel Adapter EIP (Figure 1) | Example Scenario (Figure 2)   |
|--------------------------------|-------------------------------|
| Sender Application             | StockQuote Client             |
| Channel Adapter                | Salesforce Connector          |
| Message                        | Query Request                 |
| Message Channel                | Salesforce API                |

## ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this.  

!!! note
    Replace the Salesforce credentials used in the configuration below with valid credentials.

```
<? xml version = "1.0" encoding = "UTF-8" ?>
<!-- Message Channels -->
<definitions xmlns = "http://ws.apache.org/ns/synapse">
  <!-- External sequence acts as a message channel --> 
  <sequence name = "ChannelAdapter">
   <salesforce.init>
     <username>salesforce_username</username>
     <password>salesforce_password + salesforce_security_token</password>
     <loginUrl>https://login.salesforce.com/services/Soap/u/27.0</loginUrl>
     </salesforce.init>
     <salesforce.query>
     <batchSize>200</batchSize>  
   <queryString>select
id,name,Account.name,AssistantName,AssistantPhone,Birthdate,CreatedBy.name,Department,Description,Email,HomePhone,LastModifiedBy.Name,MobilePhone,Title
 from Contact</queryString>
     </salesforce.query>
     <respond/>
    </sequence>
  <!-- Sender will invoke the following Sequence -->
  <sequence name = "main">
      <!-- The request will first trigger to the following -->
      <in>
           <!-- Allows calling of the following sequence defined through the key -->
           <sequence key = "ChannelAdapter"/>
      </in>
      <out>
           <!-- The response given out through the channel adapter will be sent back to the sender -->
          <send/>
      </out>
  </sequence>
</definitions>
```

### How the implementation works

Let's investigate in detail the elements of the configuration.

* main sequence - The default sequence that is triggered when the user invokes the ESB profiel.
* sequence - The message is directed to the in mediator when it is received by the main sequence.
* salesforce.init - Triggers the login call to Salesforce and retrieves the security token.
* salesforce.query  - Triggers the query call to salesforce and retrieves the results.
* respond - Sends the result back to the client.

## Set up the sample scenario

Now, let's try out the sample explained above.

### Set up the environment

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.
2. Download the Salesforce Connector.
3. Add and enable the Salesforce connector to your ESB profile instance. For instructions, go to Working with Connectors in WSO2 Ei Documentation.
4. Sign up for a Salesforce developer account. A security token will be sent to your email address. You will use your Salesforce user name, password, and this security token in the configuration below.

## Execute the sample

Execute the following command to send a request using the Stock Quote Client to the ESB profile:

```
ant stockquote -Dtrpurl=http://localhost:8280
```

For information on the Stock Quote Client and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation. This command executes the Connector, which sends a request to Salesforce and sends the response from Salesforce back to the client.
