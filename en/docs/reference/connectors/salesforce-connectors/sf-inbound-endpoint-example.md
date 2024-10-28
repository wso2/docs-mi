# Salesforce Inbound Endpoint Example

The Salesforce streaming Inbound Endpoint allows you to perform various operations on Salesforce streaming data.

The [Salesforce Streaming API](https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/intro_stream.htm) receives notifications based on the changes that happen to Salesforce data with respect to a SOQL (Salesforce Object Query Language) query you define, in a secured and scalable way. For more information, go to the [Quick Start Using Workbench documentation](https://developer.salesforce.com/docs/atlas.en-us.202.0.api_streaming.meta/api_streaming/quick_start_workbench.htm).

## What you'll build

The Salesforce inbound endpoint is a listening inbound endpoint that can consume messages from Salesforce. This injects messages into an integration sequence. However, for simplicity of this example, you will only log the message. You can extend the sample as required using [mediators in WSO2 Micro Integrator]({{base_path}}/reference/mediators/about-mediators/).

In this example, we can trigger the notifications to the Salesforce Inbound Endpoint via creating the `Platform events` or `PushTopic` methods. Please note that our example configurations are based on creating the `PushTopic` method. You can use the instructions given in the [Setting up the PushTopic in Salesforce]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-configuration/) documentation.

The following diagram illustrates all the required functionality of the Salesforce inbound operations that you are going to build. 

For example, we are building an integrated example driven through the [Salesforce connector]({{base_path}}/reference/connectors/salesforce-connectors/sf-rest-connector-example/) and Salesforce Inbound Endpoint. The user calls the Salesforce REST API. It invokes the **create** sequence and creates a new account in Salesforce. Then, through the **retrieve** sequence, it displays all the existing account details to the user.

Now that you have configured the Salesforce Inbound Endpoint, use the following Inbound Endpoint configuration to retrieve account details from your Salesforce account. The Salesforce inbound endpoint acts as a message receiver. You can inject that message into the mediation flow to get the required output.

<a href="{{base_path}}/assets/img/integrate/connectors/salesforce-inboundep-example.png"><img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inboundep-example.png" title="Salesforce Inbound Endpoint" alt="Salesforce Inbound Endpoint"/></a>

## Configure inbound endpoint using WSO2 Micro Integrator Visual Studio Code extension

1. Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

2. First, let's create a sequence to process the message. In this example, for simplicity, you will only log the message, but in a real-world use case, this can be any type of message mediation. Select Micro Integrator and click on `+` in **Sequences** to create the sequence. Add a log and drop the mediator to the sequence. The source view of the sequence will look like below.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="test" onError="fault" xmlns="http://ws.apache.org/ns/synapse">
        <log level="full"/>
        <drop/>
    </sequence>
    ```
   
3. Now let's create the Salesforce Inbound Endpoint. Click on `+` in **Inbound Endpoints** and select **Salesforce** to create the Salesforce Inbound Endpoint.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/sf-inboundep-create-new.png" title="Creating inbound endpoint" width="800" alt="Creating inbound endpoint" style="border:1px solid black"/>

4. Provide the following details in the form that opens.

    - **Name**: `SalesforceInboundEP`
    - **Automatically generate sequences**: deselect
    - **Injecting Sequence Name**: `test`
    - **Error Sequence Name**: `test`
    - **Polling Interval**: `100`
    - **Execute sequentially**: select
    - **Coordination**: select
    - **Salesforce Object**: `/topic/Account` 
    - **Package Version**: `37.0`
    - **User Name**: <USERNAME>
    - **Password**: <PASSWORD>
    - **Login Endpoint**: `https://login.salesforce.com`
    - **SOAP API Version**: `22.0`
    - **Connection Timeout**: `20000`
    - **Wait Time**: `5000`
    - **Replay**: deselect
    - **Event ID File Path**: `<FILE_PATH>`

6. Click on **Submit** to complete the inbound endpoint creation. The Salesforce Inbound Endpoint will be created and listed in the **Inbound Endpoints** section.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <inboundEndpoint name="SalesforceInboundEP" class="org.wso2.carbon.inbound.salesforce.poll.SalesforceStreamData" onError="test" sequence="test" suspend="false" xmlns="http://ws.apache.org/ns/synapse">
       <parameters>
           <parameter name="coordination">true</parameter>
           <parameter name="sequential">true</parameter>
           <parameter name="interval">100</parameter>
           <parameter name="inbound.behavior">polling</parameter>
           <parameter name="connection.salesforce.replay">false</parameter>
           <parameter name="connection.salesforce.EventIDStoredFilePath"><FILE_PATH></parameter>
           <parameter name="connection.salesforce.packageVersion">37</parameter>
           <parameter name="connection.salesforce.salesforceObject">/topic/Account</parameter>
           <parameter name="connection.salesforce.loginEndpoint">https://login.salesforce.com</parameter>
           <parameter name="connection.salesforce.userName"><USERNAME></parameter>
           <parameter name="connection.salesforce.password"><PASSWORD></parameter>
           <parameter name="connection.salesforce.waitTime">5000</parameter>
           <parameter name="connection.salesforce.connectionTimeout">20000</parameter>
           <parameter name="connection.salesforce.soapApiVersion">22.0</parameter>
       </parameters>
   </inboundEndpoint>
   ```
   
> **Note**: To configure the `connection.salesforce.password` parameter value, please use the steps given under the topic `Reset Security Token` in the [Salesforce inbound endpoint configuration]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-configuration/) document.
   
## Export integration logic as a CApp

In order to export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Deployment

1. Navigate to the [connector store](https://store.wso2.com/store/assets/esbconnector/list) and search for `Salesforce`. Click on `Salesforce (Inbound)` and download the JAR file from the releases list. Copy this JAR file into the `<MI_HOME>/lib` folder. 

2. Copy the exported carbon application to the `<MI_HOME>/repository/deployment/server/carbonapps` folder. 

3. Start the integration server. 

## Test

> **Note**: If you want to test this scenario by inserting data manually into the created object records, see [Testing the PushTopic Channel]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-configuration/#testing-the-pushtopic-channel).

   Please use the [Salesforce REST Connector example]({{base_path}}/reference/connectors/salesforce-connectors//sf-rest-connector-example/) testing steps to test this Inbound Endpoint scenario;
   
   Save a file called `data.json` with the following payload (change the value of the `Name` field to `Manager`).
   ```
   {
   	"sObject":"Account",
   	"fieldAndValue": {
       "name": "Manager",
       "description":"This Account belongs to WSO2"
     }
   }
   ``` 
   Invoke the API as shown below using the curl command. Curl application can be downloaded from [here](https://curl.haxx.se/download.html).   
   
   ```
   curl -X POST -d @data.json http://localhost:8280/salesforcerest --header "Content-Type:application/json"
   ```
   You will get a set of account names and the respective IDs as the output. At the same time, in the server console, you can see the following message.
   
   **Expected response**
   
   ```   
   To: , MessageID: urn:uuid:2D8F9AFA30E66278831587368713372, Direction: request, Payload: {"event":{"createdDate":"2020-04-20T07:45:12.686Z","replayId":4,"type":"created"},"sobject":{"Id":"0012x0000048j9mAAA","Name":"Manager"}}
   ```   
## What's next
   
* You can deploy and run your project using [different Micro Integrator installation options]({{base_path}}/install-and-setup/install/installation-options/).
* To customize this example for your own scenario, see [Salesforce Inbound Endpoint Reference]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-reference-configuration/) documentation for all operation details of the connector.
