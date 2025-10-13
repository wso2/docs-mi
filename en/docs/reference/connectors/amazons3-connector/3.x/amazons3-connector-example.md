# Amazon S3 Connector Example 

The AmazonS3 Connector allows you to access the Amazon Simple Storage Service (Amazon S3) via the AWS [SDK](https://aws.amazon.com/sdk-for-java/).

## What you'll build

This example depicts how to use AmazonS3 connector to:

1. Create an S3 bucket (a location for storing your data) in Amazon cloud.
2. Upload a message into the created bucket as a text file.
3. Retrieve the created text file back and convert it into a message in the integration runtime.

All three operations are exposed via an API. The API with the context `/s3connector` has three resources:

* `/createbucket` - Once invoked, it will create a bucket in Amazon with the specified name
* `/addobject`  - The incoming message will be stored in the specified bucket with the specified name
* `/info` - Once invoked, it will read the specified file from the specified bucket and respond with the content of the file

The following diagram shows the overall solution. The user creates a bucket, stores some message in the bucket, and then receives it back.

To invoke each operation, the user uses the same API.

<img src="{{base_path}}/assets/img/integrate/connectors/amazon-s3-diagram.jpg" title="Overview of Amazon S3 use case" width="800" alt="Amazon S3 use case"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `S3ConnectorTestAPI` and the API context as `/s3connector`.

### Configure the API

1. First, create the `/createbucket` resource. For guidance, refer to the [Add new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) guide. Use the following details when configuring the resource.
    - **URI Template**: `/createbucket`
    - **HTTP Method**: `PUT`

2. Set up the **Create Bucket** operation.
    1. Select the **createbucket** resource. Click on the **+** icon on the canvas to open the **Mediator Palette** and search for the **S3** connector.

        <img src="{{base_path}}/assets/img/integrate/connectors/common/add-connector-operation.png" title="Add connector operation" width="400" alt="Add connector operation"/>

    2. Search for the **S3** connector and download the connector if you have not done so already. After downloading, you can see the Amazon S3 connector in the mediator palette. Click on the **Create Bucket** operation under the S3 connector.

        <img src="{{base_path}}/assets/img/integrate/connectors/amazons3/s3-create-bucket-add.png" title="Create Bucket Operation" width="800" alt="Create Bucket Operation"/>

    3. Then, click on **Add new connection** to create a new S3 Connection.
        
        Following values can be provided when connecting to the S3 service. <br/>

        - **Connection Name** - A unique name to identify the connection by.
        - **AWS Access Key ID** - Access key associated with your Amazon user account.
        - **AWS Secret Access Key** - Secret Access key associated with your Amazon user account.
        - **Region** - Region that is used to select a regional endpoint to make requests.

        <img src="{{base_path}}/assets/img/integrate/connectors/amazons3/s3-add-connection.png" title="Add connection" width="800" alt="Add connection"/>

        !!! note
            1. You can either define the credentials or allow the AWS SDK to manage the credentials. The SDK will look for AWS credentials in system/user environment variables or use the IAM role for authentication if the application is running in an EC2 instance.
            2. The [IAM role for authentication](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) is available only with Amazon S3 connector v2.0.2 and above.

    4. Click on **Add** to create the connection. You can see the created connection in the **Connection** drop-down list. Select the created connection from the list.

    5. Configure the **createBucket** operation by providing the following expressions for the properties. These expressions will retrieve the respective values from the JSON request payload.

        - **Bucket Name**: `payload.bucketName`
        - **Bucket Region**: Select a region from the drop-down menu. Here we are using us-east-2.

    6. To store the response of the operation in the message body, select **Overwrite Message Body** in the Output Section. This will allow you to send the response back to the user as a response of the API invocation.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazons3/s3-create-bucket-operation.png" title="Create Bucket Operation" width="400" alt="Create Bucket Operation"/>

3. Send a response to the user.

    Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazons3/s3-create-bucket-resource.png" title="Create Bucket Resource" width="800" alt="Create Bucket Resource"/>

4. Create the next API resource (which is `/addobject`) by doing same steps as create `/createbucket`. This API resource will store the incoming message in the specified bucket with the specified name. Use the following details when configuring the resource.
    - **URI Template**: `/addobject`
    - **HTTP Method**: `POST`

5. Setup the **Put Object** operation.

    1. Provide expressions for the following properties. These expressions will retrieve the respective values from the JSON request payload.

        - **Bucket Name**: `payload.bucketName`
        - **Object Key**: `payload.objectKey`
        - **File Content**: `payload.message`

    2. Select **Overwrite Message Body** as `true` to overwrite the response body with the response from the operation.

6. Add a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

7. Create the next API resource (which is `/info`) by doing same steps as create `/createbucket`. This API resource will read the specified file from the specified bucket and respond with the content of the file. Use the following details when configuring the resource.
    - **URI Template**: `/info`
    - **HTTP Method**: `POST`

8. Setup the **Get Object** operation.

    1. Provide expressions for the following properties. These expressions will retrieve the respective values from the JSON request payload.

        - **Bucket Name**: `payload.bucketName`
        - **Object Key**: `payload.objectKey`

    2. Select **Overwrite Message Body** as `true` to overwrite the response body with the response from the operation.

9. Add a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/S3ExampleProject.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access key and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Testing

1. Invoke the API resources as shown below using the MI VSCode Extension.

    <img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

### Creating a bucket in Amazon S3

**Sample request**

```json
{
    "bucketName":"wso2-engineers"
}
```

**Expected Response**:

You will receive a response like below containing the details of the bucket created.

```json
{
  "success": true,
  "result": {
    "operation": "CreateBucketResult",
    "statusCode": 200,
    "statusText": "OK",
    "location": "http://wso2-engineers.s3.amazonaws.com/"
  }
}
```

Please navigate to [Amazon AWS S3 console](https://s3.console.aws.amazon.com/) and see if a bucket called `wso2-engineers` is created. If you tried to create a bucket with a name that already exists, it will reply back with a message indicating the conflict.

<img src="{{base_path}}/assets/img/integrate/connectors/amazons3-bucket.png" title="Creating Amazon S3 bucket" width="800" alt="Creating Amazon S3 bucket"/>

### Post a message into the Amazon S3 bucket

**Sample request**

```json
{
    "bucketName":"wso2-engineers",
    "objectKey":"Julian.txt",
    "message":"Julian Garfield, Software Engineer, Integration Group"
}
```

**Expected Response**:

You will receive a response like below containing the details of the object created.

```json
{
  "success": true,
  "result": {
    "eTag": "\"cb9e1c242a916ea4ee56eb24416539fc\"",
    "serverSideEncryption": "AES256"
  }
}
```

Navigate to the AWS S3 console and click on the bucket `wso2-engineers`. You will note that a file has been created with the name `Julian.txt`.
<img src="{{base_path}}/assets/img/integrate/connectors/amazons3-bucket-upload.png" title="Upload object to Amazon S3 bucket" width="800" alt="Upload object to Amazon S3 bucket"/>

### Read objects from the Amazon S3 bucket

Now let us read the information on `wso2-engineers` that we stored in the Amazon S3 bucket.

**Sample request**

```json
{
    "bucketName":"wso2-engineers",
    "objectKey":"Julian.txt"
}
```

**Expected Response**:

You receive a response similar to the following. The `Content` element contains the contents of the file requested.

!!! note
    The `Content` element is available only with Amazon S3 connector v2.0.1 and above.

```json
{
    "success": true,
    "result": {
        "deleteMarker": false,
        "acceptRanges": "bytes",
        "lastModified": {
            "seconds": 1751249615,
            "nanos": 0
        },
        "contentLength": 53,
        "eTag": "\"b3e19f7ec73a246ba5c7aac3ceaff91a\"",
        "missingMeta": 0,
        "contentType": "text/plain; charset=UTF-8",
        "serverSideEncryption": "AES256",
        "metadata": {},
        "partsCount": 0,
        "tagCount": 0,
        "content": "Julian Garfield, Software Engineer, Integration Group"
    }
}
```

## What's next

* To customize this example for your own scenario, see [Amazon S3 Connector Configuration]({{base_path}}/reference/connectors/amazons3-connector/amazons3-connector-config/) documentation.
