# Microsoft Azure Data Lake storage connector example

Given below is a sample scenario that demonstrates how to work with container and blob operations using the WSO2 Microsoft Azure Storage Connector.

## What you'll build

This example demonstrates how to use Microsoft Azure Storage connector to:

1. Create a file system in a Microsoft Azure Storage account. 

    Example:
    Create a file system called `customer-behavior-analytics` to store transaction logs, web activity data, and processed analytics.

2. Create a directory.

    Example:
    Create a directory called `raw-data/transactions/` directory. to store transaction logs.

3. Upload a file.

    Example:
    Upload `transactions_2025_01.json` containing customer transaction data (product IDs, timestamps, etc.) into the `raw-data/transactions/` directory.

4. Download a file.

    Example:
    Download `transactions_2025_01.json` containing customer segments into the local environment.

5. Retrieve the metadata from a specific file.

    Example:
    Retrieve metadata for the `transactions_2025_01.json` file stored in the `raw-data/transactions/` directory.

6. Remove created File System.

    Example:
    Remove the `customer-behavior-analytics` file system from the Azure Data Lake Storage account.

For more information about these operations, please refer to the [Microsoft Azure Storage connector reference guide]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-reference/).

> **Note**: Before invoking the API, you need to create a **Storage Account** in **Microsoft Azure Data Lake Storage account**. See [Azure Storage Configuration]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/) documentation for more information.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

## Create the integration logic

1. Click `+` on the Extension panel APIs to create the REST API. Specify the API name as `MSAzureDataLakeStorageTestAPI` and the API context as `/azure`. Then, delete the default `/resource` endpoint.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/create_api.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>
    
    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/delete_default_resource.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>

2. First, we will create the `/createfilesystem` resource. This  API resource will retrieve the file system  name from the incoming HTTP  POST request and create a file system in Microsoft Azure Storage. Click on  the `+ Resource` and fill in the details. Use a URL template called `/createfilesystem` and the POST HTTP method.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/add_resources.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/add_api_resource.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>

3. Click the created resource. Next, click the `+` arrow below the Start node to open the side panel. Select **Connections** and click **Add new Connection**. Search `msazuredatalakestorage` and click.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/create_new_connection.png" title="Creating a new connection" width="800" alt="Microsoft Azure Storage use case"/>

4. Create a connection as shown below.

    You can use Access key , SAS Token or OAuth2 method for authentication.

    !!! note
        You can either define the Account Access key or Client Credentials for authentication. For more information, please refer to [Initialize the connector guide]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-reference/#initialize-the-connector).

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_new_connection.png" title="Configuring a new connection" width="800" alt="Microsoft Azure Storage use case"/>

5. After the connection is successfully created, select the created connection in **Connections**. In the drop down menu, click **CreateFileSystem**.

<img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/add_create_file_system_oparation.png" title="Adding create file system operation" width="800" alt="Microsoft Azure Storage use case"/>

6. Next, configure the following parameters in the properties window, the click the submit button.

    - **File System Name** - payload.filesystemName
    - **Metadata(Optional)** - payload.metadata
    - **Timeout (Optional)** 
    - **Public Access Type (Optional)**

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_create_directory_operation.png" title="Adding create file system operation" width="800" alt="Microsoft Azure Storage use case"/>

    > **Note** Tick on overwrite message body, if you want to replace the Message Body in Message Context with the response of the operation (This will remove the payload from the above variable).

7. Click `+` below the `CreateFileSystem` node to add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from creating the container as shown below.


    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/adding_respond_mediator.png" title="Adding a respond mediator" width="800" alt="Microsoft Azure Storage use case"/>

8. Follow the same steps to create the next API resource, `/createdirectory`. This API resource will create the directory from the  incoming HTTP POST request.

9. Next, add the `CreateDirectory` operation from the **Connections** tab using the created connection. In the properties view, provide the following expressions for the below properties:
    - **File System name** - payload.fileSystemName
    - **Target Path** - payload.targetPath (eg: `raw-data/transactions/`, no need to add file system name)
   

10. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `CreateDirectory` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_create_directory_operation.png" title="Configuring xreate directory operation" width="800" alt="Microsoft Azure Storage use case"/>

11. Follow the same steps to create the next API resource, `/uploadfile`. This API resource will retrieve information about the blob from the  incoming HTTP POST request.

12. Next, add the `UploadFile` operation from the **Connections** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **File System name** - payload.filesystemName
    - **Target Path** - payload.targetPath (eg: `raw-data/transactions/transactions_2025_01.json`, no need to add file system name)
    - **Input Type** - Local File
    - **Metadata** - payload.source
    - **Local File Path** - payload.localPath 

>>Note: The example `transactions_2025_01.json` file is as follows:
```json
{
    "transactions": [
        {
          "transaction_id": "TXN1001",
          "date": "2025-01-05",
          "amount": 150.75,
          "currency": "USD",
          "status": "Completed",
          "payment_method": "Credit Card",
          "customer": {
            "customer_id": "CUST001",
            "name": "John Doe",
            "email": "john.doe@example.com"
          }
        },
        {
          "transaction_id": "TXN1002",
          "date": "2025-01-12",
          "amount": 299.99,
          "currency": "EUR",
          "status": "Pending",
          "payment_method": "PayPal",
          "customer": {
            "customer_id": "CUST002",
            "name": "Jane Smith",
            "email": "jane.smith@example.com"
          }
        },
        {
          "transaction_id": "TXN1003",
          "date": "2025-01-20",
          "amount": 500.00,
          "currency": "GBP",
          "status": "Failed",
          "payment_method": "Bank Transfer",
          "customer": {
            "customer_id": "CUST003",
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com"
          }
        }
    ]
         
}
```
  
13. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `UploadFile` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_upload_file_operation.png" title="Configuring upload file operation" width="800" alt="Microsoft Azure Storage use case"/>

14. Follow the same steps to create the next API resource, `/downloadfile`. This API resource will download file from the  incoming HTTP POST request.

15. Next, add the `DownloadFile` operation from the **Connections** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **File System name** - payload.filesystemName
    - **Target File** - payload.targetFile (eg: `raw-data/transactions/transactions_2025_01.json`, no need to add file system name)
    - **Download Location** - payload.downloadLocation(eg: local-path/transactions_2025_01.json)

16. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `DownloadFile` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_download_file_operation.png" title="Configuring download file operation" width="800" alt="Microsoft Azure Storage use case"/>

17. Follow the same steps to create the next API resource, `/readmetadata`. This API resource will retrieve metadata of the file from the  incoming HTTP POST request.

18. Next, add the `GetMetadata` operation from the **Connections** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **File System name** - payload.filesystemName
    - **Target Path** - payload.targetPath (eg: `raw-data/transactions/transactions_2025_01.json`, no need to add file system name)

19. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `GetMetadata` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_read_metadata.png" title="Configuring get metadata operation" width="800" alt="Microsoft Azure Storage use case"/>

20. Follow the same steps to create the next API resource, `/deletefilesystem`. This API resource will delete the file system from the  incoming HTTP POST request.

21. Next, add the `DeleteFileSystem` operation from the **Connections** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **File System name** - payload.filesystemName

22. Finally, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `DeleteFileSystem` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazuredatalakestorage-connector/configure_delete_file_system_operation.png" title="Configuring delete file system operation" width="800" alt="Microsoft Azure Storage use case"/>

23. You can find the complete API XML configuration below. You can go to the source view (by clicking the `</>` icon on the top right corner) and copy-paste the following configuration.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/azure" name="MSAzureDataLakeStorageTestAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/createfilesystem">
        <inSequence>
            <msazuredatalakestorage.createFileSystem configKey="con1">
                <fileSystemName>{${payload.filesystemName}}</fileSystemName>
                <timeout></timeout>
                <metadata>[["source","${payload.metadata}"],]</metadata>
                <accessType>NONE</accessType>
                <responseVariable>msazuredatalakestorage_createFileSystem_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </msazuredatalakestorage.createFileSystem>
            <respond description="create file system"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/createdirectory">
        <inSequence>
            <msazuredatalakestorage.createDirectory configKey="con1">
                <fileSystemName>{${payload.filesystemName}}</fileSystemName>
                <directoryName>{${payload.targetPath}}</directoryName>
                <responseVariable>msazuredatalakestorage_createDirectory_504</responseVariable>
                <overwriteBody>true</overwriteBody>
                <metadata>[]</metadata>
                <timeout></timeout>
                <contentLanguage></contentLanguage>
                <contentType></contentType>
                <contentEncoding></contentEncoding>
                <contentDisposition></contentDisposition>
                <cacheControl></cacheControl>
                <permissions></permissions>
                <umask></umask>
                <sourceLeaseId></sourceLeaseId>
                <group></group>
                <owner></owner>
            </msazuredatalakestorage.createDirectory>
            <respond description="create-directory"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/uploadfile">
        <inSequence>
            <msazuredatalakestorage.uploadFile configKey="con1">
                <fileSystemName>{${payload.filesystemName}}</fileSystemName>
                <filePathToUpload>{${payload.targetPath}}</filePathToUpload>
                <localFilePath>{${payload.localPath}}</localFilePath>
                <metadata>[]</metadata>
                <timeout></timeout>
                <responseVariable>msazuredatalakestorage_uploadFile_1</responseVariable>
                <overwriteBody>true</overwriteBody>
                <contentLanguage></contentLanguage>
                <contentType></contentType>
                <contentEncoding></contentEncoding>
                <contentDisposition></contentDisposition>
                <cacheControl></cacheControl>
                <blockSize></blockSize>
                <maxSingleUploadSize></maxSingleUploadSize>
                <maxConcurrency></maxConcurrency>
                <inputType>Local File</inputType>
            </msazuredatalakestorage.uploadFile>
            <respond description="upload-file"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/downloadfile">
        <inSequence>
            <msazuredatalakestorage.downloadFile configKey="con1">
                <fileSystemName>{${payload.filesystemName}}</fileSystemName>
                <filePathToDownload>{${payload.targetFile}}</filePathToDownload>
                <downloadLocation>{${payload.downloadLocation}}</downloadLocation>
                <responseVariable>msazuredatalakestorage_downloadFile_640</responseVariable>
                <overwriteBody>true</overwriteBody>
                <timeout></timeout>
                <leaseId></leaseId>
                <ifUnmodifiedSince></ifUnmodifiedSince>
                <ifMatch></ifMatch>
                <ifModifiedSince></ifModifiedSince>
                <ifNoneMatch></ifNoneMatch>
                <blockSize></blockSize>
                <maxConcurrency></maxConcurrency>
                <offset></offset>
                <count></count>
                <maxRetryRequests></maxRetryRequests>
                <rangeGetContentMd5>false</rangeGetContentMd5>
            </msazuredatalakestorage.downloadFile>
            <respond description="download-file"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/readmetadata">
        <inSequence>
            <msazuredatalakestorage.getMetadata configKey="con1">
                <fileSystemName>{${payload.filesystemName}}</fileSystemName>
                <filePath>{${payload.targetPath}}</filePath>
                <responseVariable>msazuredatalakestorage_getMetadata_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </msazuredatalakestorage.getMetadata>
            <respond description="read-metadata"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/deletefilesystem">
        <inSequence>
            <msazuredatalakestorage.deleteFileSystem configKey="con1">
                <fileSystemName>{${payload.filesystemName}}</fileSystemName>
                <responseVariable>msazuredatalakestorage_deleteFileSystem_1</responseVariable>
                <overwriteBody>true</overwriteBody>
                <timeout></timeout>
                <leaseId></leaseId>
                <ifUnmodifiedSince></ifUnmodifiedSince>
                <ifMatch></ifMatch>
                <ifModifiedSince></ifModifiedSince>
                <ifNoneMatch></ifNoneMatch>
            </msazuredatalakestorage.deleteFileSystem>

            <respond description="delete-file-system"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/msazuredatalakestorage-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the credentials and make other such changes before deploying and running this project.

## Deployment

Follow these steps to deploy the exported CApp in the integration runtime. 

**Deploying on Micro Integrator**
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

1. Creating a new file system in Microsoft Azure Data Lake Storage for storing customer behavior data.
 
    **Sample request**

    ```curl
    curl -v POST -d {"filesystemName":"customer-behavior-analytics", "metadata":"customers"} "http://localhost:8290/azure/createfilesystem" -H "Content-Type:application/json"
    ```
 
    **Expected Response**

    ```json
    {
     
        "status": true,
        "message": "Successfully created the filesystem"
        
    }
    ```
    
2. Create a directory.

    **Sample request**

    ```curl
    curl -v POST 'http://localhost:8290/azure/createdirectory' --header 'Content-Type: application/json' -d '{"filesystemName": "customer-behavior-analytics", "targetPath": "raw-data/transactions/"}'
    ```

    **Expected Response**

    ```json    
    {
     
        "status": true,
        "message": "Successfully created the directory."
        
    }
    ```
 
3. Upload a file.

    **Sample request**
        
    ```curl
    curl -v POST 'http://localhost:8290/azure/uploadfile' --header 'Content-Type: application/json' -d '{"filesystemName": "customer-behavior-analytics", "targetPath": "raw-data/transactions/transactions_2025_01.json", "localPath" : "/home/pasindusa/Downloads/transactions_2025_01.json", "source":"customers" }'
    ```

    **Expected Response**

    It will retrieve the content text.
    
    ```json
    {
     
        "status": true,
        "message": "Successfully uploaded the file"
        
    }
    ```

4. Download a file.

    **Sample request**

    ```curl
    curl -v POST 'http://localhost:8290/azure/downloadfile' --header 'Content-Type: application/json' -d '{"filesystemName": "customer-behavior-analytics", "targetFile": "raw-data/transactions/transactions_2025_01.json", "downloadLocation":"/home/pasindusa/Downloads/transactions_2025_01.json"}'
    ```

    **Expected Response**

    ```json
    {
     
        "status": true,
        "message": "Successfully downloaded the file"
        
    }
    ```

5. Retrieve the metadata from a specific file.

    **Sample request**

    ```curl
    curl -v POST 'http://localhost:8290/azure/readmetadata' --header 'Content-Type: application/json' -d '{"filesystemName": "customer-behavior-analytics", "targetPath": "raw-data/transactions/transactions_2025_01.json"}'
    ```

    **Expected Response**

    ```json
    {
        "status": true,
        "result": {
            "source" : "customers"
        }
    }
    ```

7. Remove created File System.

    **Sample request**
        
    ```curl
    curl -v POST -d {"fileSystemName":"customer-behavior-analytics"} "http://localhost:8290/azure/deletefilesystem" -H "Content-Type:application/json"
    ```

    **Expected Response**
    
    ```json
    {
     
        "status": true,
        "message": "Successfully deleted the file system"
        
    }
    ```

## What's next

* You can deploy and run your project on Docker or Kubernetes. See the instructions in [Running the Micro Integrator on Containers]({{base_path}}/develop/deploy-artifacts).
