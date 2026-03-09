# AmazonSQS Inbound Endpoint Example

The AmazonSQS Inbound Endpoint allows you to connect to Amazon and consume messages form an Amazon SQS queue. The messages are then injected into the mediation engine for further processing and mediation.

## What you'll build

This scenario demonstrates how the AmazonSQS inbound endpoint works as a message consumer. The Amazon SQS queue will receive messages from a third-party system, while the integration runtime will keep listening to the messages from that queue. The WSO2 AmazonSQS Inbound Endpoint will receive the message and notify. If you are extending this sample scenario, you can perform any kind of mediation using the [mediators]({{base_path}}/reference/mediators/about-mediators/).

## Prerequisites - Create AmazonSQS Simple Queue

To proceed with this scenario, ensure you have connectivity to an Amazon AWS account. Follow these steps:

1. Refer to the [Setting up the Amazon Lambda Environment]({{base_path}}/reference/connectors/amazonlambda-connector/setting-up-amazonlambda/) to:

    1. Create an Amazon AWS account.
    2. Obtain your **Access Key** ID and **Secret Access Key**

2. Create a Simple Queue

    1. Navigate to the Simple Queue Service (SQS) in your AWS Management Console.
    2. Create a new Queue and obtain the **URL of the Amazon SQS Queue**.

!!! Info
    The parameters obtained in the [Create AmazonSQS Simple Queue](#prerequisites---create-amazonsqs-simple-queue) step are used for configurations as detailed below.

    - **secret Key**    : The secret key used to sign requests.
    - **access Key**    : The access key that corresponds to the secret key that you used to sign the request.
    - **destination**   : URL of the Amazon SQS Queue from which you want to consume messages.


## Set up the integration project

1. Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project. 

2. Add a new **AmazonSQS inbound endpoint** by clicking the **+** icon in the **Inbound Endpoints** and select **AmazonSQS WSO2 Listner Connector**.

    <img src="{{base_path}}/assets/img/integrate/connectors/sqs-inbound.png" title="Creating inbound endpoint" width="800" alt="Creating inbound endpoint"/>

3. Configure the AmazonSQS inbound endpoint as shown below and click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/sqs-inbound-form.png" title="Creating AmazonSQS inbound endpoint form" width="800" alt="Creating AmazonSQS inbound endpoint form"/>

    !!! Note
        When creating the SMPP inbound endpoint you have two options in defining the injecting sequence and error sequence.
        <br/>- **Automatic**: Click the checkbox *Automatically generate sequence*
        <br/>- **Manual**: You can select already defined sequences as injecting and error sequences.

    !!! Info
        In this example, we are using the **Automatic** option and that will create an injecting sequence named `AmazonSQSInboundEndpoint-inboundSequence` and an error sequence named `AmazonSQSInboundEndpoint-inboundErrorSequence`.<br/>

    The source view of the created inbound endpoint is shown below.

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <inboundEndpoint name="AmazonSQSInboundEndpoint" class="org.wso2.carbon.inbound.amazonsqs.AmazonSQSPollingConsumer" sequence="AmazonSQSInboundEndpoint-inboundSequence" onError="AmazonSQSInboundEndpoint-inboundErrorSequence" suspend="false">
         <parameters xmlns="http://ws.apache.org/ns/synapse">
             <parameter name="interval">2000</parameter>
             <parameter name="sequential">true</parameter>
             <parameter name="coordination">true</parameter>
             <parameter name="destination">https://sqs.us-east-2.amazonaws.com/610968236798/eiconnectortestSQS</parameter>
             <parameter name="contentType">text/plain</parameter>
             <parameter name="accessKey"><!-- access key id --></parameter>
             <parameter name="secretKey"><!-- secret key --></parameter>
             <parameter name="autoRemoveMessage">true</parameter>
             <parameter name="attributeNames">All</parameter>
         </parameters>
     </inboundEndpoint> 
     ```

4. Implement the injecting sequence which processes the message - `AmazonSQSInboundEndpoint-inboundSequence`. 
   
    For simplicity, in this example you will just log the message. However, in a real-world use case, this could involve any type of message mediation.
 
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="request" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log level="full"/>
    </sequence>
    ```
   
## Export integration logic

In order to export the project, refer to the [build and export the composite application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Deployment
  
In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test 

1. Log in to the Amazon **Simple Queue Service** -> created **Queue**. 
2. Select the Queue and right click -> **Send a Message**-> enter `Message`, or you can even use [AmazonSQS Connector Example]({{base_path}}/reference/connectors/amazonsqs-connector/amazonsqs-connector-example) we have implemented before.

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
