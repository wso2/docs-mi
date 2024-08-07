# AmazonSQS Inbound Endpoint Example

The AmazonSQS Inbound Endpoint allows you to connect to Amazon and consume messages form an Amazon SQS queue. The messages are then injected into the mediation engine for further processing and mediation.

## What you'll build

This scenario demonstrates how the AmazonSQS inbound endpoint works as a message consumer. In this scenario, you should have a connectivity with Amazon AWS account. Please follow the steps mentioned in the [Setting up the Amazon Lambda Environment]({{base_path}}/reference/connectors/amazonlambda-connector/setting-up-amazonlambda/) document in order to create an Amazon account and obtain access key id and secret access key.

The Amazon SQS queue will receive messages from a third party system, while the integration runtime will keep listening to the messages from that queue. First you need to create a **Queue** inside the **Simple Queue Service** and send a message to the created Queue. The WSO2 AmazonSQS Inbound Endpoint will receive the message and notify. If you are extending this sample scenario, you can perform any kind of mediation using the [mediators]({{base_path}}/reference/mediators/about-mediators/).

The Simple Queue Service will receive messages from the outside, while the AmazonSQS inbound endpoint will consume messages based on the updates.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project. 

1. Select the Micro Integrator VS Code Extension and click on `+` in `Inbound Endpoints` to create a new inbound endpoint. Select the 
creation Type as `custom`.
   
   <img src="{{base_path}}/assets/img/integrate/connectors/sqs-inbound.png" title="Creating inbound endpoint" width="800" alt="Creating inbound endpoint" style="border:1px solid black"/>

2. In the form, set the class name to `org.wso2.carbon.inbound.amazonsqs.AmazonSQSPollingConsumer` under the `Basic` section.

3. Navigate to the source view and update it with the following configuration as required. 
     
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <inboundEndpoint xmlns="http://ws.apache.org/ns/synapse"   
                    name="AmazonSQS"    
                    onError="requestISO" 
                    sequence="request"    
                    suspend="false" 
                    class="org.wso2.carbon.inbound.amazonsqs.AmazonSQSPollingConsumer">
       <parameters>
           <parameter name="sequential">true</parameter>
           <parameter name="interval">2000</parameter>
           <parameter name="coordination">true</parameter>
           <parameter name="waitTime">19</parameter>
           <parameter name="maxNoOfMessage">10</parameter>
           <parameter name="destination">https://sqs.us-east-2.amazonaws.com/610968236798/eiconnectortestSQS</parameter>
           <parameter name="accessKey">AKIAY4QELOL7GF35XBW5</parameter>
           <parameter name="secretKey">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</parameter>
           <parameter name="attributeNames">attributeName1,contentType</parameter>
           <parameter name="contentType">application/json</parameter>
           <parameter name="class">org.wso2.carbon.inbound.amazonsqs.AmazonSQSPollingConsumer</parameter>
           <parameter name="inbound.behavior">polling</parameter>
       </parameters>
   </inboundEndpoint>   
   ```   
   **Sequence to process the message**
   
   In this example, for simplicity we will just log the message, but in a real world use case, this can be any type of message mediation.
 
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sequence name="request" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log level="full"/>
   </sequence>
   ```
!!! Note 
    To configure the `secretKey` and `accessKey` parameter value, please use the [Setting up the Amazon Lambda Environment]({{base_path}}/reference/connectors/amazonlambda-connector/setting-up-amazonlambda/) documentation.

    - **secretKey** : The secret key used to sign requests.
    - **accessKey** : The access key that corresponds to the secret key that you used to sign the request.
    - **destination** : URL of the Amazon SQS Queue from which you want to consume messages.
   
## Export integration logic
In order to export the project, refer to the [build and export the composite application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Deployment

Navigate to the [connector store](https://store.wso2.com/store/assets/esbconnector/list) and search for `AmazonSQS Connector`. Click on `AmazonSQS Inbound Endpoint` and download the .jar file by clicking on `Download Inbound Endpoint`. 
   > **Note**: Copy this .jar file into **<MI-HOME>/dropins** folder.
  
In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test 

Please log in to the Amazon **Simple Queue Service**-> created **Queue**. Select the Queue and **right click**-> **Send a Message**-> enter **Message**, or you can even use [AmazonSQS Connector Example]({{base_path}}/reference/connectors/amazonsqs-connector/amazonsqs-connector-example) we have implemented before.

**Sample Message**

```
{"Message":"Test Amazon SQS Service"}
```
AmazonSQS Inbound Endpoint will consume message from the Simple Queue Service.

**Expected response**

You will see following message in the server log file (found at <MI_HOME>/repository/logs/wso2carbon.log).
 
```bash
[2020-05-22 12:28:03,799]  INFO {org.apache.synapse.mediators.builtin.LogMediator} - To: , MessageID: urn:uuid:CB783799949CD049281590130683750, Direction: request, Payload: {"Message":"Test Amazon SQS Service"}
```
