# AmazonSQS Connector Example

The WSO2 Amazon SQS connector allows you to access the exposed Amazon SQS API from an integration sequence.

## What you'll build

This example explains how to use Amazon SQS Connector to:

1. Create a queue in Amazon SQS.
2. Send a JSON message to the created queue.

Both operations are exposed via an API. The API with the context `/sqs` has two resources:

* `/createQueue` - Once invoked, it will create a queue in Amazon SQS with the specified name
* `/sendMessage` - The incoming JSON message will be sent to the specified queue

The following diagram shows the overall solution. The user creates a queue, sends a JSON message to the queue.

To invoke each operation, the user uses the same API.

<img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-connector.jpg" title="AmazonSQS-Connector" width="800" alt="AmazonSQS-Connector"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `SQSAPI` and the API context as `/sqs`.

### Configure the API

1. First, create the `/createQueue` resource. For guidance, refer to the [Add new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) guide. Use the following details when configuring the resource.
    - **URI Template**: `/createQueue`
    - **HTTP Method**: `POST`

2. Set up the **Create Queue** operation.
    1. Select the **createQueue** resource. Click on the **+** icon on the canvas to open the **Mediator Palette** and search for the **SQS** connector.

        <img src="{{base_path}}/assets/img/integrate/connectors/common/add-connector-operation.png" title="Add connector operation" width="400" alt="Add connector operation"/>

    2. Search for the **SQS** connector and download the connector if you have not done so already. After downloading, you can see the Amazon SQS connector in the mediator palette. Click on the **Create Queue** operation under the SQS connector.

        <img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-3xx/sqs-create-queue-add.png" title="Create Queue Operation" width="800" alt="Create Queue Operation"/>

    3. Then, click on **Add new connection** to create a new SQS Connection.
        
        Following values can be provided when connecting to the SQS service. <br/>

        - **Connection Name** - Unique name to identify the connection by.
        - **Access Key ID** - Access key associated with your Amazon user account.
        - **Secret Access Key** - Secret Access key associated with your Amazon user account.
        - **Region** - Region that is used to select a regional endpoint to make requests.

        <img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-3xx/sqs-add-connection.png" title="Add connection" width="600" alt="Add connection"/>

    4. Click on **Add** to create the connection. You can see the created connection in the **Connection** drop-down list. Select the created connection from the list.

    5. Configure the **createQueue** operation by providing the following expressions for the properties. These expressions will retrieve the respective values from the JSON request payload.

        - **Queue Name**: `payload.queueName`

    6. To store the response of the operation in the message body, select **Overwrite Message Body** in the Output Section. This will allow you to send the response back to the user as a response of the API invocation.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-3xx/sqs-create-queue-operation.png" title="Create Queue Operation" width="400" alt="Create Queue Operation"/>

3. Send a response to the user.

    Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-3xx/sqs-create-queue-resource.png" title="Create Queue Resource" width="800" alt="Create Queue Resource"/>

4. Create the next API resource (which is `/sendMessage`) by doing same steps as create `/createQueue`. This API resource will send the incoming JSON message to the specified queue. Use the following details when configuring the resource.
    - **URI Template**: `/sendMessage`
    - **HTTP Method**: `POST`

5. Setup the **Send Message** operation.

    1. Provide expressions for the following properties. These expressions will retrieve the respective values from the JSON request payload.

        - **Queue URL**: `payload.queueUrl`
        - **Message Body**: `payload.message`

    2. Select **Overwrite Message Body** as `true` to overwrite the response body with the response from the operation.

6. Add a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/SQSExample3xx.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access key and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Testing

1. Invoke the API resources as shown below using the MI VSCode Extension.

    <img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

### Creating a queue in Amazon SQS

**Sample request**

```json
{
  "ResponseMetadata": {
    "RequestId": "c253d4b6-e9b3-58e8-96f7-b4574a35540b"
  },
  "CreateQueueResult": {
    "QueueUrl": "https://sqs.us-east-2.amazonaws.com/446449776830/wso2-test-queue"
  },
  "success": true
}
```

**Expected Response**:

You will receive a response like below containing the details of the queue created.

```json
{
    "success": true,
    "result": {
        "queueUrl": "https://sqs.us-east-2.amazonaws.com/123456789012/wso2-test-queue"
    }
}
```

Please navigate to [Amazon AWS SQS console](https://console.aws.amazon.com/sqs/) and see if a queue called `wso2-test-queue` is created.

### Send a message to the Amazon SQS queue

**Sample request**

```json
{
    "queueUrl": "https://sqs.us-east-2.amazonaws.com/123456789012/wso2-test-queue",
    "message": {
        "orderId": "12345",
        "product": "WSO2 Integration Suite",
        "quantity": 2,
        "customer": {
            "name": "John Doe",
            "email": "john.doe@example.com"
        }
    }
}
```

**Expected Response**:

You will receive a response like below containing the details of the message sent.

```json
{
  "ResponseMetadata": {
    "RequestId": "6c641e9d-a530-5a04-ac7f-7e7c06e1f8d8"
  },
  "SendMessageResult": {
    "MessageId": "bcc28e2d-960e-4faa-a611-010418e81809",
    "MD5OfMessageBody": "ec4b6ea3aed2a32ecb5d30dcfd65df4d"
  },
  "success": true
}
```

Navigate to the AWS SQS console and click on the queue `wso2-test-queue`. You will note that a message has been sent to the queue and you can view the message content by polling the queue.

## What's next

* To customize this example for your own scenario, see [Amazon SQS Connector Configuration]({{base_path}}/reference/connectors/amazonsqs-connector/amazonsqs-connector-config/) documentation.
