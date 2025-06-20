# Amazon Lambda Connector Example 

Given below is a sample scenario that demonstrates how to create an Amazon Lambda function in the AWS Lambda Service using the WSO2 Amazon Lambda Connector.

## What you'll build
To use the Amazon Lambda connector, add the <amazonlambda.init> element in your configuration before carrying out any Amazon Lambda operations. This Amazon Lambda configuration authenticates with Amazon Lambda by specifying the AWS access key ID and secret access key ID, which are used for every operation. The signature is used with every request and thus differs based on the user's request.

This example demonstrates how to use Amazon Lambda Connector to use `createFunction` operation.

Here we exposed the `createFunction` operation via an API. The API has one resource with the context `/createFunction`.

* `/createFunction` : The `createFunction` operation creates a Lambda function. 

To create a function, you need a deployment package and an execution role. The deployment package contains your function code. The execution role grants the function permission to use AWS services.

The following diagram illustrates all the required functionality of the Amazon Lambda Service that you are going to build.

<img src="{{base_path}}/assets/img/integrate/connectors/amazonlambdaconnectorsample.png" title="Amazon Lambda Connector" width="800" alt="Amazon Lambda Connector"/>

This example demonstrates, how to create an Amazon Lambda function easily using the WSO2 Amazon Lambda Connector. Before creating an Amazon Lambda function inside the AWS Lambda service, you need to implement the required deployment package (ZIP Archive) locally.

As a next step, simply create an AWS S3 bucket and the deployment package should be uploaded into that bucket. This sample API contains a service that can be invoked through an HTTP POST request. Once the service is invoked, it creates a Lambda function inside the AWS Lambda service. When the created Lambda function is invoked, it is able to run without provisioning or managing servers.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Setup the Integration Project

{!includes/build-and-run.md!}

1. First let's create a connection to the AWS lambda service. Navigate to **MI Project Explorer** > **Local Entries** > **Connections** and click on the **+** sign next to **Connections** to open the **Add New Connection** view.

2. Select the **Amazonlambda** connector.
   Configure the below values.

       - Connection Name - `AMAZON_LAMBDA_CONNECTION`
       - Access Key ID - `$ctx:accessKeyId`
       - Secret Access Key - `$ctx:secretAccessKey`
       - Region - `$ctx:region`
       - Blocking - `$ctx:blocking`

    The created connection is saved as a **Local Entry** as below.
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="AMAZON_LAMBDA_CONNECTION" xmlns="http://ws.apache.org/ns/synapse">
        <amazonlambda.init>
            <name>AMAZON_LAMBDA_CONNECTION</name>
            <region>{$ctx:region}</region>
            <accessKeyId>{$ctx:accessKeyId}</accessKeyId>
            <secretAccessKey>{$ctx:secretAccessKey}</secretAccessKey>
            <blocking>{$ctx:blocking}</blocking>
        </amazonlambda.init>
    </localEntry>
    ```

3. Navigate to **MI Project Explorer** > **APIs** and click on the **+** sign next to APIs to open the **Synapse API Artifact** creation form.

4. Specify the API name as `createFunction` and the API context as `/createFunction`. You can go to the XML configuration of the API (source view) and copy the following configuration.

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/createFunction" name="createFunction" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST">
            <inSequence>
                <property expression="json-eval($.secretAccessKey)" name="secretAccessKey" scope="default" type="STRING"/>
                <property expression="json-eval($.accessKeyId)" name="accessKeyId" scope="default" type="STRING"/>
                <property expression="json-eval($.region)" name="region" scope="default" type="STRING"/>
                <property expression="json-eval($.blocking)" name="blocking" scope="default" type="STRING"/>
                <property expression="json-eval($.functionName)" name="functionName" scope="default" type="STRING"/>
                <property expression="json-eval($.functionDescription)" name="functionDescription" scope="default" type="STRING"/>
                <property expression="json-eval($.apiVersionCreateFunction)" name="apiVersionCreateFunction" scope="default" type="STRING"/>
                <property expression="json-eval($.s3Bucket)" name="s3Bucket" scope="default" type="STRING"/>
                <property expression="json-eval($.s3Key)" name="s3Key" scope="default" type="STRING"/>
                <property expression="json-eval($.s3ObjectVersion)" name="s3ObjectVersion" scope="default" type="STRING"/>
                <property expression="json-eval($.zipFile)" name="zipFile" scope="default" type="STRING"/>
                <property expression="json-eval($.targetArn)" name="targetArn" scope="default" type="STRING"/>
                <property expression="json-eval($.environmentVariables)" name="environmentVariables" scope="default" type="STRING"/>
                <property expression="json-eval($.handler)" name="handler" scope="default" type="STRING"/>
                <property expression="json-eval($.kmsKeyArn)" name="kmsKeyArn" scope="default" type="STRING"/>
                <property expression="json-eval($.layers)" name="layers" scope="default" type="STRING"/>
                <property expression="json-eval($.memorySize)" name="memorySize" scope="default" type="STRING"/>
                <property expression="json-eval($.publish)" name="publish" scope="default" type="STRING"/>
                <property expression="json-eval($.role)" name="role" scope="default" type="STRING"/>
                <property expression="json-eval($.runtime)" name="runtime" scope="default" type="STRING"/>
                <property expression="json-eval($.tags)" name="tags" scope="default" type="STRING"/>
                <property expression="json-eval($.timeout)" name="timeout" scope="default" type="STRING"/>
                <property expression="json-eval($.mode)" name="mode" scope="default" type="STRING"/>
                <property expression="json-eval($.securityGroupIds)" name="securityGroupIds" scope="default" type="STRING"/>
                <property expression="json-eval($.subnetIds)" name="subnetIds" scope="default" type="STRING"/>
                <amazonlambda.createFunction configKey="AMAZON_LAMBDA_CONNECTION">
                    <functionName>{$ctx:functionName}</functionName>
                    <functionDescription>{$ctx:functionDescription}</functionDescription>
                    <apiVersionCreateFunction>{$ctx:apiVersionCreateFunction}</apiVersionCreateFunction>
                    <s3Bucket>{$ctx:s3Bucket}</s3Bucket>
                    <s3Key>{$ctx:s3Key}</s3Key>
                    <s3ObjectVersion>{$ctx:s3ObjectVersion}</s3ObjectVersion>
                    <zipFile>{$ctx:zipFile}</zipFile>
                    <targetArn>{$ctx:targetArn}</targetArn>
                    <environmentVariables>{$ctx:environmentVariables}</environmentVariables>
                    <handler>{$ctx:handler}</handler>
                    <kmsKeyArn>{$ctx:kmsKeyArn}</kmsKeyArn>
                    <layers>{$ctx:layers}</layers>
                    <memorySize>{$ctx:memorySize}</memorySize>
                    <publish>{$ctx:publish}</publish>
                    <role>{$ctx:role}</role>
                    <runtime>{$ctx:runtime}</runtime>
                    <tags>{$ctx:tags}</tags>
                    <timeout>{$ctx:timeout}</timeout>
                    <mode>{$ctx:mode}</mode>
                    <securityGroupIds>{$ctx:securityGroupIds}</securityGroupIds>
                    <subnetIds>{$ctx:subnetIds}</subnetIds>
                </amazonlambda.createFunction>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api> 
    ```
5. Now we can export the imported connector and the API into a single CAR application. The CAR application is what we are going to deploy during server runtime.

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

<a href="{{base_path}}/assets/attachments/connectors/amazon-lambda-connector-example.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access key and make other such changes before deploying and running this project.

## Deployment

Follow these steps to deploy the exported Carbon Application (CApp) in the integration runtime. For more info on deploying artifacts, refer to the [Deploying Artifacts]({{base_path}}/develop/deploy-artifacts).

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server. Micro Integrator will be started and the composite application will be deployed.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

??? note "Click here for instructions on deploying on WSO2 Enterprise Integrator 6"
    1. You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server.

    2. WSO2 EI server starts and you can login to the Management Console via the `https://localhost:9443/carbon/` URL. Provide login credentials. The default credentials will be admin/admin. 

    3. You can see that the API is deployed under the API section. 

## Testing

1. Invoke the API using a CURL command or sample client.
   ``` 
   curl -v POST -d 
   '{
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
    }' "http://localhost:8290/createFunction" -H "Content-Type:application/json"  
   ```
2. See the following message content.
   ```
   {
        "Description": "",
        "TracingConfig": {
            "Mode": "PassThrough"
   },
   {
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