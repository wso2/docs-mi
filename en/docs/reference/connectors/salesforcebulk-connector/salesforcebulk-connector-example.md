# Salesforce Bulk Connector Example

The Salesforce Bulk Connector allows you to access the [Salesforce Bulk REST API](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm) from an integration sequence. SalesforceBulk is a RESTful API that allows you to quickly load large sets of your organization's data into Salesforce or delete large sets of your organization's data from Salesforce. You can use SalesforceBulk to query, insert, update, or delete a large number of records asynchronously, by submitting the records in batches. Salesforce can process these batches in the background.

## What you'll build

This example demonstrates how to use the SalesforceBulk connector to:

1. Insert employee details (job and batch) into Salesforce.
2. Get the status of the inserted employee details.

Both operations are exposed via an API. The API with the context `/resources` has two resources.

* `/insertEmployeeDetails`: Create a new job in the Salesforce account and insert employee details.
* `/getStatusOfBatch`: Retrieve the status of the created batch from the Salesforce account.

In this example, the user sends the request to invoke an API to insert employee details in bulk to the Salesforce account. When invoking the `insertEmployeeDetails` resource, it creates a new job based on the properties that you specify. Read the CSV data file by using the WSO2 File Connector and the extracted dataset is inserted as a batch. Afterward, it responds according to the specified template and is sent back to the client. Finally, a user can retrieve the batch status using the `getStatusOfBatch` resource. 

<img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-connector.png" title="Using Salesforce Bulk Connector" width="800" alt="Using Salesforce Bulk Connector"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

{!includes/build-and-run.md!}

3. Create a new Salesforce Bulk connection. 
    1. Hover over the **MI Project Explorer** > **Connections**, and click on the **+** sign appearing. 
    2. Select  **Salesforcebulk** connector.
        <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-connection.png" title="Add new salesforce bulk connection" width="90%" alt="Add new salesforce bulk connection"/>

    3. Use the following values to create the connection. 
        - **Connection Name** - `SalesforceBulkConnection`
        - **Connection Type** - `init` 
        - **Access Token** - The value of the access token to access the API via request.
        - **Refresh Token** - The value of the refresh token.
        - **Client Secret** - The value of your client secret given when you registered your application with Salesforce.
        - **Client ID** - The value of your client ID given when you registered your application with Salesforce.
        - **API Version** - `34`
        - **API URL** - The value of the instance URL.

### Add integration logic

First create an API, which will be where we configure the integration logic. 
Goto **MI Project Explorer** > **APIs**. Hover over the **APIs**, and click on the **+** sign to create a REST API. Specify the API **Name** as `Salesforcebulk-API` and API **Context** as `/salesforce`.
    
<img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-api.png" title="Adding a Salesforcebulk Rest API" width="90%" alt="Adding a Salesforcebulk Rest API"/>

#### Configure a resource for the insertEmployeeBulkRecords 

1. Add a resource with the below configurations. 
    - **URI Template**: `/insertEmployeeBulkRecords`
    - **URI Style**: `URI_TEMPLATE`
    - **Methods**: `POST`
        
    <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-resource.png" title="Add a resource" width="30%" alt="Add a resource"/>

2. Select the created resource. 

3. Add a **Property** mediator by clicking **+** sign in the design pane and selecting **Property** mediator from the palette. This is the object type of data that is to be processed by the job. Access the **Property** tab and specify the details given below.
   
    - **Property Name**: `objectName`
    - **Property Action**: `set`
    - **Property Value**: expression `//object/text()`
    - **Property Data Type**: `STRING`
    - **Property Scope**: `DEFAULT`
            
4. Add another **Property** mediator into the design view after the previous **Property** mediator to capture the `source` value.  The source is the location of the file. This can be a file on the local physical file system or a file on an FTP server.   
        
    - **Property Name**: `source`
    - **Property Action**: `set`
    - **Property Value**: expression `//source/text()`
    - **Property Data Type**: `STRING`
    - **Property Scope**: `DEFAULT`

4. Set up the **createJob** operation.

    1. Setup the **createJob** configurations. In this operation, we are going to create a job in the Salesforce account. Please find the **createJob** operation parameters listed here.
       
        - **Operation**: The processing operation that the job should perform.
        - **Object**: The object type of data that is to be processed by the job.
        - **Content Type**: The content type of the job.
        
        While invoking the API, the above **object** parameter value comes as a user input.
    
    2. Click **+** sign below the previously added property mediator and add the **createJob** operation from **Salesforcebulk** connector into the design pane.
    
        <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-createjob.png" title="Add createJob operation" width="90%" alt="Add createJob operation"/>

        The following values can be used to configure the **createJob** operation:

        - **Connection**: Select `SalesforceBulkConnection`
        - **Object**: expression `$ctx:objectName`
        - **Operation**: `insert`
        - **Content Type**: `XML`

5. Add a **Property** mediator by clicking **+** sign in the design pane after the **createJob** operation, and selecting **Property** mediator from the palette. Access the **Property** tab and specify the details given below.
   
    - **Property Name**: `jobId`
    - **Property Action**: `set`
    - **Property Value**: expression `//n0:jobInfo/n0:id`
    - **Property Data Type**: `STRING`
    - **Property Scope**: `DEFAULT`

3. Set up the **read** operation.

    1. Setup the **read** configurations. In this operation, we are going to read the CSV file content by using the [WSO2 File Connector]({{base_path}}/reference/connectors/file-connector/file-connector-overview).
    
        - **contentType**: Content type of the files processed by the connector.
        - **File/Directory Path**: The location of the file. This can be a file on the local physical file system or a file on an FTP server. 
        - **File Pattern**: The pattern of the file to be read.
                
        While invoking the API, the above `source` parameter value comes as a user input.
        
        > **Note**: When you configure this `source` parameter in the Windows operating system you need to set this property shown below `<source>C:\\Users\Kasun\Desktop\Salesforcebulk-connector\SFBulk.csv</source>`.
    
    2. Click **+** sign below the previously added property mediator and add the **read** operation from **File** connector into the design pane.
            
        <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-file-read-operation.png" title="Add file read operation" width="90%" alt="Add file read operation"/>

        Use the following values to configure the **read** operation.

        - **File/Directory Path** - expression `$ctx:source`
        - **Read Mode** - `Complete File`
        - **MIME Type** - `text/csv` 
        - **Encoding** - `UTF-8`
        - **Add Result To** - `Message Body`

5. Set up **Data Mapper** mediator.

    1. To extract the `objects` from the file read operation, we used [data mapper]({{base_path}}/reference/mediators/data-mapper-mediator). Click on the **+** sign after the **read** operation and add the **Data Mapper** mediator from the palette. Access the **Property** tab and specify the details given below.
        
        - **Mapping**: Select `New Mapping`
        - **Name**: `CsvToXml`
        - **Input Type**: `CSV`
        - **Output Type**: `XML`
    
        <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-datamapper.png" title="Add data mapper" width="90%" alt="Add data mapper"/>

    2. Click **Submit**.

    3. In the opening window, go to **Import Input Schema** and select **Import from JSON Schema**. Then provide the below schema.

        ```json
        {
            "$schema" : "http://wso2.org/json-schema/wso2-data-mapper-v5.0.0/schema#",
            "inputType" : "CSV",
            "id" : "http://wso2jsonschema.org",
            "title" : "root",
            "type" : "array",
            "items" : [ {
                "properties" : {
                "name" : {
                    "id" : "http://wso2jsonschema.org/0/name",
                    "type" : "string"
                },
                "description" : {
                    "id" : "http://wso2jsonschema.org/0/description",
                    "type" : "string"
                }
                },
                "id" : "http://wso2jsonschema.org/0",
                "type" : "object"
            } ]
        }
        ```

    4. Go to **Import Output Schema** and select **Import from JSON Schema**. Then provide the below schema.

        ```json
        {
            "$schema" : "http://wso2.org/json-schema/wso2-data-mapper-v5.0.0/schema#",
            "outputType" : "XML",
            "id" : "http://wso2jsonschema.org",
            "title" : "values",
            "type" : "object",
            "properties" : {
                "sObject" : {
                "id" : "http://wso2jsonschema.org/sObject",
                "type" : "array",
                "items" : [ {
                    "id" : "http://wso2jsonschema.org/sObject/0",
                    "type" : "object",
                    "properties" : {
                    "description" : {
                        "id" : "http://wso2jsonschema.org/sObject/0/description",
                        "type" : "string"
                    },
                    "name" : {
                        "id" : "http://wso2jsonschema.org/sObject/0/name",
                        "type" : "string"
                    }
                    }
                } ]
                }
            }
        }
        ```

    5. Map the respective field in the input schema and output schema. For more information, refer to the [Data Mapper Mediator]({{base_path}}/reference/mediators/data-mapper-mediator/) Documentation. 

6. Set up the **addBatch** operation.
    1. Please find the **addBatch** operation parameters listed here.
        - **Objects**: A list of records to process.
        - **Job ID**: The unique identifier of the job to which you want to add a new batch.
        - **is Query**: Set to true if the operation is query.
        - **Content Type**: The content type of the batch data. The content type you specify should be compatible with the content type of the associated job. Possible values are `application/xml` and `text/csv`.
    
        While invoking the API, the above `jobId` and `objects` parameter values come as user input. Using a property mediator will extract the `jobId` from the `createJob` response and store it in a configured `addBatch` operation.
    
    2. Click **+** sign below the previously added **Data Mapper** mediator and add the **addBatch** operation from the **Salesforcebulk** connector into the design pane. The following values can be used to configure the **addBatch** operation:

        - **Connection** - Select `SalesforceBulkConnection`
        - **Objects** - expression `//values`
        - **Job ID** - expression `$ctx.jobId`
        - **is Query** - Select `false`
        - **Content Type** - `application/xml`
    
        <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-addbatch.png" title="Add addBatch operation" width="90%" alt="Add addBatch operation"/>

7. Forward the backend response to the API caller.
    
    When you are invoking the created resource, the request of the message is going through the `/insertEmployeeBulkRecords` resource. Finally, it is passed to the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/). The Respond Mediator stops the processing of the current message and sends the message back to the client as a response.            
    
    Click the **+** sign below the previously added **addBatch** operation and add the **respond** mediator from the palette to the design pane. 

#### Configure a resource for the getStatusOfBatch 

1. Add a resource with the below configurations. 
    - **URI Template**: `/getStatusOfBatch`
    - **URI Style**: `URI_TEMPLATE`
    - **Methods**: `POST`

2. Select the created resource. 

3. Add a **Property** mediator by clicking the **+** sign in the design pane and selecting **Property** mediator from the palette to capture the `jobId` value.

    - **Property Name**: `jobId`
    - **Property Action**: `set`
    - **Property Value**: expression `//jobId/text()`
    - **Property Data Type**: `STRING`
    - **Property Scope**: `DEFAULT`
        
4. Add another **Property** mediator into the design view after the previous **Property** mediator from the palette to capture the `batchId` value.
        
    - **Property Name**: `batchId`
    - **Property Action**: `set`
    - **Property Value**: expression `//batchId/text()`
    - **Property Data Type**: `STRING`
    - **Property Scope**: `DEFAULT`

5. Set up the **getBatchStatus** operation.

    1. To retrieve the created batch status from the added batches in the Salesforce account, you need to add the **getBatchStatus** operation. 
        
    2. Click on the **+** sign after the previously added property mediator and add the **getBatchStatus** operation from the **Salesforcebulk** connector into the design pane.     
    
        - **jobId**: The unique identifier of the job to which the batch you specify belongs.
        - **batchId**: The unique identifier of the batch for which you want to retrieve the status.
        
        While invoking the API, the above `jobId` and `batchId` parameter values come as a user input. The following values can be used to configure the **addBatch** operation:

        - **Connection**: Select `SalesforceBulkConnection`
        - **jobId**: expression `$ctx:jobId`
        - **batchId**: expression `$ctx:batchId`
                
        
    <img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk/salesforcebulk-conn-add-getbatchstatus-operation.png" title="Add query operation to getBatchStatus" width="90%" alt="Add query operation to getBatchStatus"/> 

3. Forward the backend response to the API caller.
    
    When you are invoking the created resource, the request of the message is going through the `/getStatusOfBatch` resource. Finally, it is passed to the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/). The Respond Mediator stops the processing of the current message and sends the message back to the client as a response.            
    
    Click the **+** sign below the previously added **getBatchStatus** operation and add the **respond** mediator from the palette to the design pane.  
           
Now you can switch to the Source view and check the XML configuration files of the created API and sequences. 

=== "REST API"
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/salesforce" name="Salesforce" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/insertEmployeeBulkRecords">
            <inSequence>
                <property name="objectName" scope="default" type="STRING" expression="//object/text()"/>
                <property name="source" scope="default" type="STRING" expression="//source/text()"/>
                <salesforcebulk.createJob configKey="SalesforceBulkConnection">
                    <object>{$ctx:objectName}</object>
                    <operation>insert</operation>
                    <contentType>XML</contentType>
                </salesforcebulk.createJob>
                <property name="jobId" scope="default" type="STRING" expression="//n0:jobInfo/n0:id" xmlns:n0="http://www.force.com/2009/06/asyncapi/dataload"/>
                <file.read configKey="FileConnection">
                    <path>{$ctx:source}</path>
                    <readMode>Complete File</readMode>
                    <startLineNum>0</startLineNum>
                    <endLineNum>0</endLineNum>
                    <lineNum>0</lineNum>
                    <encoding>UTF-8</encoding>
                    <enableStreaming>false</enableStreaming>
                    <enableLock>false</enableLock>
                    <includeResultTo>Message Body</includeResultTo>
                    <contentType>text/csv</contentType>
                </file.read>
                <datamapper config="gov:/datamapper/CsvToXml/CsvToXml.dmc" inputSchema="gov:/datamapper/CsvToXml/CsvToXml_inputSchema.json" inputType="CSV" outputSchema="gov:/datamapper/CsvToXml/CsvToXml_outputSchema.json" outputType="XML"/><salesforcebulk.addBatch configKey="SalesforceBulkConnection">
                    <objects>{//values}</objects>
                    <jobId>{$ctx:jobId}</jobId>
                    <isQuery>false</isQuery>
                    <contentType>application/xml</contentType>
                </salesforcebulk.addBatch>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <resource methods="POST" uri-template="/getStatusOfBatch">
            <inSequence>
                <property name="jobId" scope="default" type="STRING" expression="//jobId/text()"/>
                <property name="batchId" scope="default" type="STRING" expression="//batchId/text()"/>
                <salesforcebulk.getBatchStatus configKey="SalesforceBulkConnection">
                    <batchId>{$ctx:batchId}</batchId>
                    <jobId>{$ctx:jobId}</jobId>
                </salesforcebulk.getBatchStatus>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
=== "File Connection"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="FILE_CONNECTION" xmlns="http://ws.apache.org/ns/synapse">
        <file.init>
            <connectionType>LOCAL</connectionType>
            <name>FILE_CONNECTION</name>
            <workingDir>/Users/chathurangaj/Desktop/resource</workingDir>
            <fileLockScheme>Local</fileLockScheme>
        </file.init>
    </localEntry>
    ```
=== "SalesforceBulk Connection"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="SalesforceBulkConnection" xmlns="http://ws.apache.org/ns/synapse">
        <salesforcebulk.init>
            <connectionType>init</connectionType>
            <name>SalesforceBulkConnection</name>
            <apiUrl></apiUrl>
            <accessToken></accessToken>
            <apiVersion>34</apiVersion>
            <refreshToken></refreshToken>
            <clientSecret></clientSecret>
            <clientId></clientId>
        </salesforcebulk.init>
    </localEntry>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/salesforcebulk.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access token and make other such changes before deploying and running this project.

## Build and run

{!includes/build-and-run-artifacts.md!}

The artifacts will be deployed in the embedded Micro Integrator and the server will start.

- See the startup log in the **Console** tab.
- See the URLs of the deployed services and APIs in the **Runtime Services** tab.

!!! info  
    To support the use of `text/csv` content, we need to add a custom message formatter and builder. To do this, include the following configuration in the `<MI_HOME>/conf/deployment.toml` file.

    ```
    [[custom_message_formatters]]
    content_type = "text/csv"
    class = "org.apache.axis2.format.PlainTextFormatter"

    [[custom_message_builders]]
    content_type = "text/csv"
    class = "org.apache.axis2.format.PlainTextBuilder"
    ```

## Test

1. Create a new job in the Salesforce account and insert employee details.

    The source path provided is relative to the **workingDir** where the file connector is initiated. The content of the `/input.csv` file used here is as follows.

    ```
    name,description
    John Doe,A software engineer from California.
    Jane Smith,A graphic designer based in New York.
    Alice Johnson,A freelance writer and editor.
    Bob Brown,A project manager with experience in IT services.
    ```

    **Sample request**
    
    ```
    POST /salesforce/insertEmployeeBulkRecords HTTP/1.1
    Host: localhost:8290
    Content-Type: application/xml

    <inserRecord>
        <object>Account</object>
        <source>/input.csv</source>
    </inserRecord>
    ```

     **Expected Response**
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <batchInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <id>751dM000002fyjpQAA</id>
        <jobId>750dM000005kWFqQAM</jobId>
        <state>Queued</state>
        <createdDate>2024-08-15T18:14:57.000Z</createdDate>
        <systemModstamp>2024-08-15T18:14:57.000Z</systemModstamp>
        <numberRecordsProcessed>0</numberRecordsProcessed>
        <numberRecordsFailed>0</numberRecordsFailed>
        <totalProcessingTime>0</totalProcessingTime>
        <apiActiveProcessingTime>0</apiActiveProcessingTime>
        <apexProcessingTime>0</apexProcessingTime>
    </batchInfo>
    ```

2. Get the status of the inserted employee details.
 
    **Sample request**

    ```
    POST /salesforce/getStatusOfBatch HTTP/1.1
    Host: localhost:8290
    Content-Type: application/xml

    <getBatchStatus>
        <jobId>750dM000005kWFqQAM</jobId>
        <batchId>751dM000002fyjpQAA</batchId>
    </getBatchStatus>
    ```

    **Expected Response**
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <batchInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">
        <id>751dM000002fyjpQAA</id>
        <jobId>750dM000005kWFqQAM</jobId>
        <state>Failed</state>
        <stateMessage>InvalidBatch : Records not found</stateMessage>
        <createdDate>2024-08-15T18:14:57.000Z</createdDate>
        <systemModstamp>2024-08-15T18:14:58.000Z</systemModstamp>
        <numberRecordsProcessed>0</numberRecordsProcessed>
        <numberRecordsFailed>0</numberRecordsFailed>
        <totalProcessingTime>0</totalProcessingTime>
        <apiActiveProcessingTime>0</apiActiveProcessingTime>
        <apexProcessingTime>0</apexProcessingTime>
    </batchInfo>
    ```

## What's next

- To customize this example for your own scenario, see [Salesforce bulk Connector Configuration]({{base_path}}/reference/connectors/salesforcebulk-connector/salesforcebulk-reference) documentation for all operation details of the connector.
