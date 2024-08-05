# BigQuery Connector Example

The WSO2 BigQuery connector is mostly composed of operations that are useful for retrieving BigQuery data such as project details, datasets, tables, and jobs (it has one operation that can be used to insert data into BigQuery tables).

In this example, we are trying to build up a sample scenario based on the BigQuery Table operations.

## What you'll build

Given below is a sample scenario that demonstrates how to work with the WSO2 BigQuery Connector:

1. The user sends the request to invoke an API to get created table details from the BigQuery. This REST call will retrieve schema level information and send it back to the API caller.
2. Insert data in to the created table.
3. Retrieve inserted details from the BigQuery table.
4. Run an SQL query (BigQuery) and retrieve details from BigQuery table.

All four operations are exposed via an `bigquery-testAPI` API. The API with the context `/resources` has four resources.

* `/gettabledetails`: This is used to get created table details from the BigQuery table by ID.
* `/insertdetails` : This is used to insert the data into the table.
* `/getdetails` : This is used to retrieves table data from a specified set of rows.
* `/runQuery` : The runQuery operation runs an SQL query (BigQuery) and returns results if the query completes within a specified timeout.              

 > **Note**: Before starting this scenario, you need to create a **project** in BigQuery. Next, create a **Dataset** and under that Dataset you have to have **Table**. For more information about these operations, please refer to the [Setting up the BigQuery Environment]({{base_path}}/reference/connectors/bigquery-connector/bigquery-connector-configuration/). 

The following diagram shows the overall solution. User can invoke the table schema level details from the `gettabledetails` resource. Using the response details, the API caller can insert data into the created table. If users need to retrieve table data from a specified set of rows, they need to invoke the `getdetails` resource. Finally `/runQuery` resource runs an SQL query (BigQuery) and returns results back to the API caller.

<img src="{{base_path}}/assets/img/integrate/connectors/bigquery-example.jpg" title="BigQuery connector example" width="800" alt="BigQuery connector example"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow these steps to set up the Integration Project using the WSO2 Micro Integrator Visual Studio Code extension.

### Create the new project

1. Go to **WSO2 Micro Integrator** in the VS Code.

2. Click on **Create New Project** to create the new integration project.

3. provide the **Project Name** and select the **Project Directory**

    <img src="{{base_path}}/assets/img/integrate/connectors/new-vscode-project.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

4. You have now created the new project with the following structure.

    <img src="{{base_path}}/assets/img/integrate/connectors/prject-structure.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

#### Configure the API

Open the MI project view and click the **+** button next to the **API**. A form will open to create a new API resources. Specify the API name as **bigquery-testAPI** and API context as **/resources**.

 <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-add-api.png" title="Adding a Rest API" width="300" alt="Adding a Rest API"/>

##### Configure a resource for the gettabledetails operation

Create a resource that to invoke an API to get created table details from the BigQuery. To achieve this, add the following components to the configuration.

1. Initialize the connector.
    
    1. Go to the **Connector**, select the **BigQuery Connector**, click on **init** operation.
        
        <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-add-init.png" title="Drag and drop init operation" width="400" alt="Drag and drop init operation"/>   
    
    2. Click on **+ Add Parameter** and add the following properties with your corresponding values.
        
        - **apiUrl**: The base endpoint URL of the BigQuery API.
        - **accessToken**: The OAuth token for the BigQuery API.
        - **clientId** : The client ID for the BigQuery API.
        - **clientSecret** : The client Secret for the BigQuery API.
        - **refreshToken** : The refresh token for the BigQuery API.
        - **apiKey** : The API key. Required unless you provide an OAuth 2.0 token.

2. Add **getTable** operation. This operation retrieves a table by ID.                                               

    1. Go to the **Connector**, select the **BigQuery Connector**, click on the **getTable** operation. 

    2. Click on **+ Add Parameter** and add the following properties with your corresponding values.
                                                                                 
         - **datasetId** : The dataset ID of the requested table.
         - **projectId** : The project ID of the requested table.
         - **tableId** : The ID of the requested table.

3. To forward the backend response to the API caller, navigate to the **Mediator** and click on the **Respond** mediator.

##### Configure a resource for the insertdetails operation
    
1. Initialize the connector.
   You can use the same configuration to initialize the connector. Please follow the steps given in section 1 for setting up the `init` operation to the `gettabledetails` operation.
   
2. Set up the **insertAllTableData** operation. This operation inserts the data into the table.

      1. Go to the **Connector**, select the **BigQuery Connector**, click on the **insertAllTableData** operation. 
   
      2. Click on **+ Add Parameter** and add the following properties with your corresponding values.

         - **datasetId** : The dataset ID of the requested table.
         - **projectId** : The project ID of the requested table.
         - **tableId** : The ID of the requested table.
         - **skipInvalidRows** : A boolean value to check whether the row should be validated.
         - **ignoreUnknownValues** : A boolean value to validate whether the values match the table schema.
         - **jsonPay** : A JSON object that contains a row of data.

      In this example, `skipInvalidRows` value is configured as **true** and `ignoreUnknownValues` value is configured as **true**. 

3. To forward the backend response to the API caller, navigate to the **Mediator** and click on the **Respond** mediator.

##### Configure a resource for the listTabledata operation
    
1. Initialize the connector.
   You can use the same configuration to initialize the connector. Please follow the steps given in section 1 for setting up the `init` operation to the `gettabledetails` operation.
   
2. Set up the `listTabledata` operation. This operation retrieves table data from a specified set of rows.

    1. Go to the **Connector**, select the **BigQuery Connector**, click on the **listTabledata** operation.
   
    2. Click on **+ Add Parameter** and add the following properties with your corresponding values.

         - **datasetId** : The dataset ID of the requested table.
         - **projectId** : The project ID of the requested table.
         - **tableId** : The ID of the requested table.

3. To forward the backend response to the API caller, navigate to the **Mediator** and click on the **Respond** mediator. 

##### Configure a resource for the runQuery operation
    
1. Initialize the connector.
   You can use the same configuration to initialize the connector. Please follow the steps given in section 1 for setting up the `init` operation to the `gettabledetails` operation.
   
   2. Set up the `runQuery` operation. The `/runQuery` operation runs an SQL query (BigQuery) and returns results if the query completes within a specified timeout.

       1. Go to the **Connector**, select the **BigQuery Connector**, click on the **runQuery** operation.
   
       2. Click on **+ Add Parameter** and add the following properties with your corresponding values.

         - **projectId** : The project ID of the requested table.
         - **kind** : The resource type of the request.
         - **defaultProjectId** : The ID of the project that contains this dataset.
         - **defaultDatasetId** :  A unique ID (required) for this dataset without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.
         - **query** : A query string (required) that complies with the BigQuery query syntax.
         - **maxResults** : The maximum number of rows of data (results) to return per page. Responses are also limited to 10 MB. By default, there is no maximum row count and only the byte limit applies.
         - **timeoutMs** : Specifies how long (in milliseconds) the system should wait for the query to complete before expiring and returning the request.
         - **dryRun** :  If set to true, BigQuery does not run the job. Instead, if the query is valid, BigQuery returns statistics about the job. If the query is invalid, an error returns. The default value is false.
         - **useQueryCache** : Specifies whether to look for the result in the query cache. The default value is true.

       In this example, `kind` value is configured as **bigquery#tableDataInsertAllResponse**, `query` value is configured as **SELECT Name FROM students**, `maxResults` value is configured as **1000**, `timeoutMs` value is configured as **1000**, `dryRun` value is configured as **false** and `useQueryCache` value is configured as **true**.

3. To forward the backend response to the API caller, navigate to the **Mediator** and click on the **Respond** mediator.
 
??? note "bigquery-testAPI.xml"
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/resources" name="bigquery-testAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/gettabledetails">
            <inSequence>
                <bigquery.init>
                    <apiUrl>https://www.googleapis.com</apiUrl>
                    <accessToken>ya29.1</accessToken>
                    <clientId>513m</clientId>
                    <clientSecret>GDr</clientSecret>
                    <refreshToken>1//qMQmOs</refreshToken>
                    <apiKey>AAqQ</apiKey>
                </bigquery.init>
                <bigquery.getTable>
                    <datasetId>{json-eval($.datasetId)}</datasetId>
                    <projectId>{json-eval($.projectId)}</projectId>
                    <tableId>{json-eval($.tableId)}</tableId>
                </bigquery.getTable>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <resource methods="POST" url-mapping="/insertdetails">
            <inSequence>
                <bigquery.init>
                    <apiUrl>https://www.googleapis.com</apiUrl>
                    <accessToken>ya29.1</accessToken>
                    <clientId>513m</clientId>
                    <clientSecret>GDr</clientSecret>
                    <refreshToken>1//qMQmOs</refreshToken>
                    <apiKey>AAqQ</apiKey>
                </bigquery.init>
                <bigquery.insertAllTableData>
                    <datasetId>{json-eval($.datasetId)}</datasetId>
                    <projectId>{json-eval($.projectId)}</projectId>
                    <tableId>{json-eval($.tableId)}</tableId>
                    <skipInvalidRows>true</skipInvalidRows>
                    <ignoreUnknownValues>true</ignoreUnknownValues>
                    <jsonPay>{json-eval($.jsonPay)}</jsonPay>
                </bigquery.insertAllTableData>
                <respond/>
            </inSequence>
            <outSequence/>
            <faultSequence/>
        </resource>
        <resource methods="POST" url-mapping="/getdetails">
            <inSequence>
                <bigquery.init>
                    <apiUrl>https://www.googleapis.com</apiUrl>
                    <accessToken>ya29.1</accessToken>
                    <clientId>513m</clientId>
                    <clientSecret>GDr</clientSecret>
                    <refreshToken>1//qMQmOs</refreshToken>
                    <apiKey>AAqQ</apiKey>
                </bigquery.init>
                <bigquery.listTabledata>
                    <datasetId>{json-eval($.datasetId)}</datasetId>
                    <projectId>{json-eval($.projectId)}</projectId>
                    <tableId>{json-eval($.tableId)}</tableId>
                </bigquery.listTabledata>
            <respond/>
            </inSequence>
            <outSequence/>
            <faultSequence/>
        </resource>
        <resource methods="POST" url-mapping="/runQuery">
            <inSequence>
            <bigquery.init>
                <apiUrl>https://www.googleapis.com</apiUrl>
                <accessToken>ya29.1</accessToken>
                <clientId>513m</clientId>
                <clientSecret>GDr</clientSecret>
                <refreshToken>1//qMQmOs</refreshToken>
                <apiKey>AAqQ</apiKey>
            </bigquery.init>
            <bigquery.runQuery>
                <projectId>{json-eval($.projectId)}</projectId>
                <defaultProjectId>{json-eval($.projectId)}</defaultProjectId>
                <defaultDatasetId>{json-eval($.datasetId)}</defaultDatasetId>
                <kind>bigquery#tableDataInsertAllResponse</kind>
                <query>SELECT Name FROM Tes</query>
                <maxResults>10000</maxResults>
                <timeoutMs>10000</timeoutMs>
                <dryRun>false</dryRun>
                <useQueryCache>true</useQueryCache>
            </bigquery.runQuery>
            <respond/>
            </inSequence>
            <outSequence/>
            <faultSequence/>
        </resource>
    </api>      
    ```  
## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/bigQueryConnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

Once you have [built your artifacts]({{base_path}}/develop/packaging-artifacts) into a composite application, you can
export it into a CAR file (.car file) using the WSO2 Micro Integrator Visual Studio Code extension:

1.  Open the project overview and click on **Export**.

    <img src="{{base_path}}/assets/img/integrate/connectors/export_artifacts.jpeg" width="300" alt="Download ZIP">
    
2.  Click on **Select Destination** to select a destination folder to export the CAR file.

## Test

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

#### Invoke an API to get created table details from the BigQuery.
 
   **Sample request**
   
   Save a file called **data.json** with the following payload.
      
   ```json
     {
        "tableId":"students",
        "datasetId":"Sample1",
        "projectId":"ei-connector-improvement"
     }
   ```
   ```
   curl -v POST -d @data.json "http://localhost:8290/resources/getTable" -H "Content-Type:application/json"
   ```
   **Expected response**
    
   ```json
     // API callback
     callBackFunction({
       "kind": "bigquery#table",
       "etag": "G5Yv0gFoLTD2gSToi5YPwA==",
       "id": "ei-connector-improvement:Sample1.students",
       "selfLink": "https://www.googleapis.com/bigquery/v2/projects/ei-connector-improvement/datasets/Sample1/tables/students",
       "tableReference": {
         "projectId": "ei-connector-improvement",
         "datasetId": "Sample1",
         "tableId": "students"
       },
       "schema": {
         "fields": [
           {
             "name": "name",
             "type": "STRING",
             "mode": "NULLABLE"
           },
           {
             "name": "age",
             "type": "INTEGER",
             "mode": "NULLABLE"
           }
         ]
       },
       "numBytes": "0",
       "numLongTermBytes": "0",
       "numRows": "0",
       "creationTime": "1592219906721",
       "lastModifiedTime": "1592219906768",
       "type": "TABLE",
       "location": "US"
     }
     );
   ```     
####  Invoke an API to insert data in to the created table.
 
   **Sample request**
   
   Save a file called **data.json** with the following payload.
   
   ```json
   {
     "tableId":"students",
     "datasetId":"Sample1",
     "projectId":"ei-connector-improvement",
     "jsonPay":{
            "json":
                  {
                   "name":"Jhone",
                   "age":"30"
                   }
                }
   }
   ```
   ```
   curl -v POST -d @data.json "http://localhost:8290/resources/insertdetails" -H "Content-Type:application/json"
   ```

   **Expected response**
    
   ```json
   {
       "kind": "bigquery#tableDataInsertAllResponse"
   }
   ```

####  Invoke an API to retrieve inserted details from the BigQuery table.
 
   **Sample request**
   
   Save a file called **data.json** with the following payload.
      
   ```json
   {
       "tableId":"students",
       "datasetId":"Sample1",
       "projectId":"ei-connector-improvement"
   }
   ```
   ```
   curl -v POST -d @data.json "http://localhost:8290/resources/getdetails" -H "Content-Type:application/json"
   ```

   **Expected response**
    
   ```
     // API callback
     callBackFunction({
       "kind": "bigquery#tableDataList",
       "etag": "CddYdG3ttrhpWPEGTOpKKg==",
       "totalRows": "0",
       "rows": [
         {
           "f": [
             {
               "v": "Kasun"
             },
             {
               "v": "25"
             }
           ]
         },
         {
           "f": [
             {
               "v": "Jhone"
             },
             {
               "v": "30"
             }
           ]
         }
       ]
     }
     );
   ```

####  Invoke an API to run an SQL query (BigQuery) and retrieve details from BigQuery table.
 
   **Sample request**
   
   Save a file called **data.json** with the following payload.
   
   ```json
   {
         "defaultDatasetId":"Sample1",
         "projectId":"ei-connector-improvement"
   }
   ```  
   
   ```
   curl -v POST -d @data.json "http://localhost:8290/resources/runQuery" -H "Content-Type:application/json"
   ```
   **Expected response**
   
   ```json
      {
             "kind": "bigquery#queryResponse",
             "schema": {
                 "fields": [
                     {
                         "name": "name",
                         "type": "STRING",
                         "mode": "NULLABLE"
                     },
                     {
                         "name": "age",
                         "type": "INTEGER",
                         "mode": "NULLABLE"
                     }
                 ]
             },
             "jobReference": {
                 "projectId": "ei-connector-improvement",
                 "jobId": "job_YQS1kmzYpfBT-wKvkLi5uVbSL_Mh",
                 "location": "US"
             },
             "totalRows": "2",
             "rows": [
                 {
                     "f": [
                         {
                             "v": "Kasun"
                         },
                         {
                             "v": "25"
                         }
                     ]
                 },
                 {
                     "f": [
                         {
                             "v": "Jhone"
                         },
                         {
                             "v": "30"
                         }
                     ]
                 }
             ],
             "totalBytesProcessed": "30",
             "jobComplete": true,
             "cacheHit": false
         }
   ```  
   
## What's next

* To customize this example for your own scenario, see [BigQuery Connector Reference Guide]({{base_path}}/reference/connectors/bigquery-connector/bigquery-connector-reference) documentation for all operation details of the connector.