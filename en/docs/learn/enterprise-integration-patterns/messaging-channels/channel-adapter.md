# Channel Adapter

This page explains how you can implement a sample scenario of Channel Adapter EIP using WSO2 Micro Integrator.

## Introduction to Channel Adapter

Channel Adapter accesses an application's API or data and publishes messages on a channel based on this data. Also, it receives messages and invokes functionality inside the application.

!!! info
    For more information see the [Channel Adapter](http://www.eaipatterns.com/ChannelAdapter.html) documentation.

![Channel adapter]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/channel-adapter-eip.png)

## Sample scenario

This example demonstrates the Salesforce connector of the WSO2 MI transferring a message coming from a stock quote client to Salesforce API and then sending the queried response that comes from Salesforce back to the client. The diagram below depicts how to simulate the example scenario using the WSO2 MI.

![Channel adapter]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/channel-adapter.png)

Before digging into implementation details, let's look at how the core components in the example scenario map to the Channel Adapter EIP:

| Channel Adapter EIP            | Example Scenario              |
|--------------------------------|-------------------------------|
| Sender Application             | StockQuote Client             |
| Channel Adapter                | Salesforce Connector          |
| Message                        | Query Request                 |
| Message Channel                | Salesforce API                |


## Synapse configuration of the artifacts

!!! note
    Replace the Salesforce credentials used in the configuration below with valid credentials.

=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="ChannelAdapter" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <salesforce.query configKey="SalesforceConn">
            <batchSize>10</batchSize>
            <queryString>select id,name,Account.name,AssistantName,AssistantPhone,Birthdate,CreatedBy.name,Department,Description,Email,HomePhone,LastModifiedBy.Name,MobilePhone,Title from Contact</queryString>
        </salesforce.query>
        <respond/>
    </sequence>
    ```
=== "Connection"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="SalesforceConn" xmlns="http://ws.apache.org/ns/synapse">
        <salesforce.init>
            <connectionType>init</connectionType>
            <name>SalesforceConn</name>
            <username>salesforce_username</username>
            <password>salesforce_password + salesforce_security_token</password>
            <loginUrl>https://login.salesforce.com/services/Soap/u/27.0</loginUrl>
        </salesforce.init>
    </localEntry>
    ```

### How the implementation works

Let's break down the elements of the configuration:

- **ChannelAdapter Sequence**: This sequence is triggered to handle the incoming message from the StockQuote client. It sends a query request to Salesforce using the Salesforce connector.
- **Salesforce Connection**: The `SalesforceConn` configuration is used to initialize a connection to Salesforce, including login credentials and endpoint details.
- **salesforce.init**: Initializes the Salesforce connection by triggering a login call and retrieving the security token necessary for further API requests.
- **salesforce.query**: Executes a query on the Salesforce API, retrieving specific data from the `Contact` object based on the defined query string.
- **respond**: Sends the queried response from Salesforce back to the StockQuote client, completing the message exchange.


!!! Note
    Follow the [Salesforce Connector Documentation]({{base_path}}/reference/connectors/salesforce-connectors/sf-overview/) to set up the Salesforce connector, where you will also find examples to try out.
