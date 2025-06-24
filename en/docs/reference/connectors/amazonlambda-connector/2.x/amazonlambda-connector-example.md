# Amazon Lambda Connector Example 

Given below is a sample scenario that demonstrates how to create an Amazon Lambda function in the AWS Lambda Service using the WSO2 Amazon Lambda Connector.

## What you'll build
To use the Amazon Lambda connector, add the `amazonLambda` connection in your configuration before carrying out any Amazon Lambda operations. This Amazon Lambda configuration authenticates with Amazon Lambda by specifying the AWS access key ID and secret access key ID, which are used for every operation. The signature is used with every request and thus differs based on the user's request.

This example demonstrates how to use Amazon Lambda Connector to use `createFunction` operation.

Here we exposed the `createFunction` operation via an API. The API has one resource with the context `/createFunction`.

* `/createFunction` : The `createFunction` operation creates a Lambda function. 

To create a function, you need a deployment package and an execution role. The deployment package contains your function code. The execution role grants the function permission to use AWS services.

The following diagram illustrates all the required functionality of the Amazon Lambda Service that you are going to build.

<img src="{{base_path}}/assets/img/integrate/connectors/amazonlambdaconnectorsample.png" title="Amazon Lambda Connector" width="800" alt="Amazon Lambda Connector"/>

This example demonstrates, how to create an Amazon Lambda function easily using the WSO2 Amazon Lambda Connector. Before creating an Amazon Lambda function inside the AWS Lambda service, you need to implement the required deployment package (ZIP Archive) locally.

As a next step, simply create an AWS S3 bucket and the deployment package should be uploaded into that bucket. This sample API contains a service that can be invoked through an HTTP POST request. Once the service is invoked, it creates a Lambda function inside the AWS Lambda service. When the created Lambda function is invoked, it is able to run without provisioning or managing servers.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `createFunction` and the API context as `/createFunction`.

### Configure the API

#### Configure the resource for the createFunction operation

1. Update the `/` resource from GET to POST . 

2. Select the updated resource. Click on the **+** icon on the canvas to open the **Mediator Palette** and search for the **Lambda** connector.

3. After downloading, you can see the Amazon Lambda connector in the mediator palette. Click on the **Add function** operation under the Lambda connector.

4. Then, click on **Add new connection** to create a new Lambda Connection.

      Following values can be provided when connecting to the Lambda service. <br/>

      - **region** : The region of the application access.
      - **accessKeyId** : The AWS secret access key.
      - **secretAccessKey** : The AWS accessKeyId of the user account to generate the signature.
      - **blocking** : Boolean type, this property helps the connector perform blocking invocations to Amazon Lambda. 

         <img src="{{base_path}}/assets/img/integrate/connectors/amazon-lambda/lambda-add-connection.png" title="Add connection" width="800" alt="Add connection"/>

5. Click on **Add** to create the connection. You can see the created connection in the **Connection** drop-down list. Select the created connection from the list.

6. Configure the **Create Function** operation by providing expressions for the following fields.

    - **Function Name** : ${payload.functionName} 
    - **API Version** : 2015-03-31
    - **Handler** : ${payload.handler}
    - **Execution Role ARN** : ${payload.role}
    - **Runtime** : ${payload.runtime}
    - **S3 Bucket** : ${payload.s3Bucket}
    - **S3 Key** : ${payload.s3Key}
    - **S3 Object Version** : ${payload.s3ObjectVersion}

    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-lambda/lambda-create-function-operation.png" title="Create function" width="500" alt="Create function"/>

7. To store the response of the operation in the message body, select **Overwrite Message Body** in the Output Section. This will allow you to send the response back to the user as a response of the API invocation.

8. Send a response to the user.

    Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-lambda/lambda-create-function-resource.png" title="Create function resource" width="800" alt="Create function resource"/>


## Create Amazon Lambda Deployment Package (Lambda function) 
In this scenario, we created a sample AWS Deployment Package (Lambda function) in Python.

1. Our sample Deployment Package would look similar to the following (source view : addingNumbers.py).
    ```
    import json
       
       print('Loading function')
       
       def addingNumbers(event, context):
           #print("Received event: " + json.dumps(event, indent=2))
           value1 = event['key1']
           value2 = event['key2']
           print("value1 = " + value1)
           print("value2 = " + value2)
           return float(value1) + float(value2) # Echo back the addition of two keys
           #raise Exception('Something went wrong')
    ```

2. Create a ZIP archive.

Please use the command line terminal or shell to run the following commands. Commands are shown in listings preceded by a prompt symbol ($) and the name of the current directory, when appropriate:

```
~/Documents$ zip addingNumbers.zip addingNumbers.py
 adding: addingNumbers.py.py (deflated 17%)
```

## Upload Amazon Lambda Deployment Package (ZIP archive) into the AWS S3 bucket

1. Log in to the AWS Management Console.
2. Navigate to the created S3 bucket (e.g., eiconnectortest).
3. Click **Upload**.
4. Select created Amazon Lambda Deployment Package (ZIP archive) and Upload.

## Create Execution Role

You need to create an Execution Role by referring to the [Setting up the Amazon Lambda Environment]({{base_path}}/reference/connectors/amazonlambda-connector/setting-up-amazonlambda/) documentation.  

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/AmazonLambdaConnector2xxExample.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access key and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Testing

1. Invoke the API resources as shown below using the MI VSCode Extension.

    <img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

    **Sample request**
 
    ```json
    {
        "secretAccessKey":"xxxx",
        "accessKeyId":"xxxx",
        "region":"us-east-2",
        "blocking":"false",
        "s3Bucket":"eiconnectortest",
        "s3Key":"addingNumbers.zip",
        "s3ObjectVersion":"null",
        "functionName":"eiLambdaConnector",
        "handler":"addingNumbers.addingNumbers",
        "role":"arn:aws:iam::610968236798:role/EIConnectorTestRole",
        "runtime":"python3.12",
        "apiVersionCreateFunction":"2015-03-31"
        } 
    ```

2. The response of the `createFunction` operation will be similar to the following.
   
    ```json
    {
            "Description": "",
            "TracingConfig": {
                "Mode": "PassThrough"
            },
            "VpcConfig": null,
            "RevisionId": "4b6e5fdd-cbfa-4ba2-9f6e-528cccdb333f",
            "LastModified": "2020-03-13T05:33:54.900+0000",
            "FunctionName": "eiLambdaConnector",
            "Runtime": "python3.7",
            "Version": "$LATEST",
            "LastUpdateStatus": "Successful",
            "Layers": null,
            "FunctionArn": "arn:aws:lambda:us-east-2:610968236798:function:eiLambdaConnector",
            "KMSKeyArn": null,
            "MemorySize": 128,
            "LastUpdateStatusReason": null,
            "DeadLetterConfig": null,
            "Timeout": 3,
            "Handler": "addingNumbers.addingNumbers",
            "CodeSha256": "VAISY9lY/a7DvxZNOSKCj+q/fsbfUaJjKhCsCVG3yzU=",
            "Role": "arn:aws:iam::610968236798:role/EIConnectorTestRole",
            "MasterArn": null,
            "CodeSize": 405,
            "State": "Active",
            "StateReason": null,
            "Environment": null,
            "StateReasonCode": null,
            "LastUpdateStatusReasonCode": null
    }
    ```

3. Log in to the AWS Management Console.

4. Navigate to the AWS Lambda and Functions tab.
   <img src="{{base_path}}/assets/img/integrate/connectors/awslambdafunction.png" title="Amazon Lambda Function" width="800" alt="Amazon Lambda Function"/>
   
5. Next you need to execute the function. Navigate to **Configure test events**. <br>
   <img src="{{base_path}}/assets/img/integrate/connectors/configuretestevent.png" title="Configure Test Event" width="800" alt="Configure Test Event"/>
   
6. Click **Create new test event**.
   <img src="{{base_path}}/assets/img/integrate/connectors/createtestevent.png" title="Create Test Event" width="800" alt="Create Test Event"/>
   
7. Navigate and select the created test event from the dropdown in the top right corner. Click the **Test** button and execute the test event.
   <img src="{{base_path}}/assets/img/integrate/connectors/executecreatedevent.png" title="Execute Test Event" width="800" alt="Execute Test Event"/>
 
## What's next

* To customize this example for your own scenario, see [Amazon Lambda Connector Configuration]({{base_path}}/reference/connectors/amazonlambda-connector/amazonlambda-connector-config/) documentation.