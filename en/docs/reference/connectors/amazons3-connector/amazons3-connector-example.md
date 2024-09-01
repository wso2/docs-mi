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

## Setting up the environment

Please follow the steps mentioned at [Setting up Amazon S3]({{base_path}}/reference/connectors/amazons3-connector/amazons3-connector-config) document in order to create an Amazon S3 account and obtain the credentials you need to access the Amazon APIs. Keep them saved to be used in the next steps.

## Setup the Integration Project

{!includes/build-and-run.md!}

## Creating the Integration Logic

1. Navigate to **MI Project Explorer** > **APIs** and click on the **+** sign next to APIs to open the **Synapse API Artifact** creation form.

2. Specify the API name as `S3ConnectorTestAPI` and the API context as `/s3connector` and click **Create**.
   After creating the API artifact, the Service Designer pane will be displayed with the default API resource.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-create-api.png" title="Create API" width="800" alt="Create API"/>

3. First, we will create the `/createbucket` resource. This API resource will retrieve the bucket name from the incoming HTTP PUT request and create a bucket in Amazon S3.

    Click on the **options** icon and select **edit** to edit the resource. We will create a `PUT` resource with URL template `/createbucket` .

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-edit-api-resource-option.png" title="Edit API resource" width="800" alt="Edit API resource"/>
    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-edit-api-resource.png" title="Edit API resource" width="400" alt="Edit API resource"/>

4. Next, select the `PUT /createbucket` resource from the **Available resources**. You will now see the graphical view of the `SampleRedisAPI`.

5. Click the **+** icon under the **start**. You will see the available mediators and connectors. Click the `amazons3` connector and select the `CreateBucket` operation from the operations list.

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-add-amazon-s3-connector.png" title="Amazon s3 connector" width="800" alt="Amazon s3 connector"/>

6. Create a connection by clicking on the **Add New Connection** as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-add-new-connection.png" title="Creating a new connection" width="800" alt="Creating a new connection"/>

    In the **Add New Connection** form, the following parameters must be provided.

    - Connection Name - A unique name to identify the connection by.
    - Connection Type - Type of the connection that specifies the protocol to be used.
    - AWS Access Key ID - Access key associated with your Amazon user account.
    - AWS Secret Access Key - Secret Access key associated with your Amazon user account.
    - Region - Region that is used to select a regional endpoint to make requests.

    !!! note
        1. You can either define the credentials or allow the AWS SDK to manage the credentials. The SDK will look for AWS credentials in system/user environment variables or use the IAM role for authentication if the application is running in an EC2 instance.
        2. The [IAM role for authentication](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) is available only with Amazon S3 connector v2.0.2 and above.

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-create-new-connection.png" title="Configuring a new connection" width="500" alt="Configuring a new connection"/>

7. After the connection is successfully created, select the created connection as **Amazon S3Connection** from the dropdown menu in the **Add createBucket** form.

8. Next, configure the following parameters:

    - Bucket Name - json-eval($.bucketName) - Click on the `EX` button to provide the name as an expression.
    - Bucket Region - Select a region from the drop-down menu. Here we are using us-east-2.

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-createBucket-operation.png" title="Configuring create bucket operation" width="800" alt="Configuring create bucket operation"/>

9. Next, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) from the mediator palette to send back the response from creating the bucket as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-create-bucket-overview.png" title="Adding a respond mediator" width="400" alt="AAdding a respond mediator"/>

10. Navigate to the **Service Designer View** of `S3ConnectorTestAPI` and click on the **+ Resource** button to create the next API resource, which is `/addobject`. This API resource will retrieve information about the object from the incoming HTTP POST request such as the bucketName, objectKey and the file content and upload it to Amazon S3.
    
    Configure the following values:

    - URI Template - /addobject
    - methods - POST
    - URL Style - URL_TEMPLATE

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-add-new-resource.png" title="Create new resource" width="800" alt="Create new resource"/>
    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-add-object-resource.png" title="Adding the addObject resource" width="400" alt="Adding the addObject resource"/>

11. Select the `POST /addObject` resource to open the design view. Click the **+** button under the start and select the  `putObject` operation under the `amazons3` connector from the connector list.

    In the **Add putObject** form, select the already created connection as **Amazon S3 Connection** from the dropdown menu and provide the following expressions to the below properties. Make sure to click on the `EX` button to provide the values as expressions.
    
    - Bucket Name - json-eval($.bucketName)
    - Object Key - json-eval($.objectKey)
    - File Content - json-eval($.message)

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-putObject-operation.png" title="Configuring put object operation" width="800" alt="Configuring put object operation"/>

12. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from uploading the object.
    
    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-add-object-overview.png" title="Add object resource overview" width="400" alt="Add object resource overview"/>

13. To create the next API resource, which is `/info` navigate to the **Service Designer View** of `S3ConnectorTestAPI` and click on the **+ Resource** button. This API resource will retrieve information from the incoming HTTP POST request such as the bucketName, objectKey and get the object from Amazon S3.

    Configure the following values:

    - URI Template - /info
    - methods - POST
    - URL Style - URL_TEMPLATE
    
    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-info-resource.png" title="Adding the info resource" width="400" alt="Adding the info resource"/>

14. Select the `POST /info` resource to open the design view. Click the **+** button under the start and select the  `getObject` operation under the `amazons3` connector from the connector list.

15. In the **Add getObject** form, select the already created connection as **Amazon S3 Connection** from the dropdown menu and provide the following expressions to the below properties. Make sure to click on the `EX` button to provide the values as expressions.

    - Bucket Name - json-eval($.bucketName)
    - Object Key - json-eval($.objectKey)

    <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-getObject-operation.png" title="Configuring get object operation" width="800" alt="Configuring get object operation"/>

16. Finally, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the getObject operation.

       <img src="{{base_path}}/assets/img/integrate/connectors/s3-connector-2x/s3-connector-info-overview.png" title="Info-resource-overview" width="400" alt="Info-resource-overview"/>

17. You can find the complete API XML configuration below. You can go to the source view and copy paste the following config.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/s3connector" name="S3ConnectorTestAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="PUT" uri-template="/createbucket">
        <inSequence>
            <amazons3.createBucket configKey="AMAZON_S3_CONNECTION_1">
                <bucketName>{json-eval($.bucketName)}</bucketName>
                <bucketRegion>us-east-2</bucketRegion>
            </amazons3.createBucket>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/addobject">
        <inSequence>
            <amazons3.putObject configKey="AMAZON_S3_CONNECTION_1">
                <bucketName>{json-eval($.bucketName)}</bucketName>
                <objectKey>{json-eval($.objectKey)}</objectKey>
                <fileContent>{json-eval($.message)}</fileContent>
            </amazons3.putObject>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/info">
        <inSequence>
            <amazons3.getObject configKey="AMAZON_S3_CONNECTION_1">
                <bucketName>{json-eval($.bucketName)}</bucketName>
                <objectKey>{json-eval($.objectKey)}</objectKey>
            </amazons3.getObject>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
</api>
```
18. You can find the created `AMAZON_S3_CONNECTION_1` saved as a **local entry**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="AMAZON_S3_CONNECTION_1" xmlns="http://ws.apache.org/ns/synapse">
    <amazons3.init>
        <awsAccessKeyId>replace_with_access_key</awsAccessKeyId>
        <name>AMAZON_S3_CONNECTION_1</name>
        <region>us-east-2</region>
        <connectionType>amazons3</connectionType>
        <awsSecretAccessKey>replace_with_secret_access_key</awsSecretAccessKey>
    </amazons3.init>
</localEntry>

```
**Note**:

* As `awsAccessKeyId` use the access key obtained from Amazon S3 setup and update the above API configuration.
* As `awsSecretAccessKey` use the secret key obtained from Amazon S3 setup and update the above API configuration.
* Note that `region`, `connectionName` and credentials are hard coded. Please change them as per the requirement.
* For more information please refer the [reference guide]({{base_path}}/reference/connectors/amazons3-connector/amazons3-connector-reference) for Amazon S3 connector.

Now we can export the artifacts into a Carbon Application (CApp) and deploy it to the server runtime to run it and test it.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/amazonS3Example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access key and make other such changes before deploying and running this project.

## Deployment

Follow these steps to deploy the exported CApp in the integration runtime. For more info on deploying artifacts, refer to the [Deploying Artifacts]({{base_path}}/develop/deploy-artifacts).

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server. Micro Integrator will be started and the composite application will be deployed.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

??? note "Click here for instructions on deploying on WSO2 Enterprise Integrator 6"
    1. You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server.

    2. WSO2 EI server starts and you can login to the Management Console via the `https://localhost:9443/carbon/` URL. Provide login credentials. The default credentials will be admin/admin. 

    3. You can see that the API is deployed under the API section. 

## Testing

We can use Curl or Postman to try the API. The testing steps are provided for curl. Steps for Postman should be straightforward and can be derived from the curl requests.

### Creating a bucket in Amazon S3

1. Create a file called `data.json` with the following content. Note that the bucket region is `us-east-2`. If you need to create the bucket in a different region, modify the hard coded region of the API configuration accordingly.
    ```json
    {
        "bucketName":"wso2-engineers"
    }
    ```
2. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" --request PUT --data @data.json http://127.0.0.1:8290/s3connector/createbucket
    ```
**Expected Response**:

    You will receive a response like below containing the details of the bucket created.

    ```json
    {
        "createBucketResult": {
            "success": true,
            "Response": {
                "Status": "200:Optional[OK]",
                "Location": "http://wso2-engineers.s3.amazonaws.com/"
            }
        }
    }
    ```

    Please navigate to [Amazon AWS S3 console](https://s3.console.aws.amazon.com/) and see if a bucket called `wso2-engineers` is created. If you tried to create a bucket with a name that already exists, it will reply back with a message indicating the conflict.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazons3-bucket.png" title="Creating Amazon S3 bucket" width="800" alt="Creating Amazon S3 bucket"/>

### Post a message into the Amazon S3 bucket

1. Create a file called `data.json` with the following content.
    ```json
    {
        "bucketName":"wso2-engineers",
        "objectKey":"Julian.txt",
        "message":"Julian Garfield, Software Engineer, Integration Group"
    }
    ```
2. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" --request POST --data @data.json http://127.0.0.1:8290/s3connector/addobject
    ```
**Expected Response**:
    You will receive a response like below containing the details of the object created.

    ```json
    {
        "putObjectResult": {
            "success": true,
            "PutObjectResponse": {
                "ETag": "\"359a77e8b4a63a637df3e63d16fd0e34\""
            }
        }
    }
    ```
    Navigate to the AWS S3 console and click on the bucket `wso2-engineers`. You will note that a file has been created with the name `Julian.txt`.
    <img src="{{base_path}}/assets/img/integrate/connectors/amazons3-bucket-upload.jpg" title="Upload object to Amazon S3 bucket" width="800" alt="Upload object to Amazon S3 bucket"/>

### Read objects from the Amazon S3 bucket

Now let us read the information on `wso2-engineers` that we stored in the Amazon S3 bucket.

1. Create a file called data.json with the following content. It specifies which bucket to read from and what the filename is. This example assumes that the object is stored at the root level inside the bucket. You can also read an object stored in a folder inside the bucket.

    ```json
    {
        "bucketName":"wso2-engineers",
        "objectKey":"Julian.txt"
    }
    ```
2. Invoke the API as shown below using the curl command.  
    ```
    curl -H "Content-Type: application/json" --request POST --data @data.json http://127.0.0.1:8290/s3connector/info
    ```
**Expected Response**:
    You receive a response similar to the following. The `Content` element contains the contents of the file requested.

    !!! note
        The `Content` element is available only with Amazon S3 connector v2.0.1 and above.

    ```json
    {
        "getObjectResult": {
            "success": true,
            "GetObjectResponse": {
                "AcceptRanges": "bytes",
                "Content": "Julian Garfield, Software Engineer, Integration Group",
                "ContentLength": 45,
                "ContentType": "text/plain; charset=UTF-8",
                "DeleteMarker": false,
                "ETag": "\"359a77e8b4a63a637df3e63d16fd0e34\"",
                "LastModified": null,
                "metadata": null,
                "MissingMeta": 0,
                "PartsCount": 0,
                "TagCount": 0
            }
        }
    }
    ```

In this example, Amazon S3 connector is used to perform operations with Amazon S3 storage. You can receive details of the errors that occur when invoking S3 operations using the S3 responses itself. Please read the [Amazon S3 connector reference guide]({{base_path}}/reference/connectors/amazons3-connector/amazons3-connector-reference) to learn more about the operations you can perform with the Amazon S3 connector.
