# Microsoft Azure storage connector example

Given below is a sample scenario that demonstrates how to work with container and blob operations using the WSO2 Microsoft Azure Storage Connector.

## What you'll build

This example demonstrates how to use Microsoft Azure Storage connector to:

1. Create a container (a location for storing employee details) in a Microsoft Azure Storage account.
2. Upload JSON employee details (blob) into the container.
3. Download an employee details (blob).
4. Remove uploaded employee details (blob).
5. Retrieve the metadata from a specific file (blob). 
6. Remove created container.

For more information about these operations, please refer to the [Microsoft Azure Storage connector reference guide]({{base_path}}/reference/connectors/microsoft-azure-storage-connector/2.x/microsoft-azure-storage-reference/).

> **Note**: Before invoking the API, you need to create a **Storage Account** in **Microsoft Azure Storage account**. See [Azure Storage Configuration]({{base_path}}/reference/connectors/microsoft-azure-storage-connector/microsoft-azure-storage-configuration/) documentation for more information.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

## Create the integration logic

1. Click `+` on the Extension panel APIs to create the REST API. Specify the API name as `MSAzureStorageTestAPI` and the API context as `/azure`. Then, delete the default `/resource` endpoint.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/create_api.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>
    
    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/delete_default_resource.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>

2. First, we will create the `/createcontainer` resource. This API resource will retrieve the container name from the incoming HTTP POST request and create a container in Microsoft Azure Storage. Click on the `+ Resource` and fill in the details. Use a URL template called `/createcontainer` and the POST HTTP method.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/adding_create_container_resource.png" title="Adding the createbucket resource" width="800" alt="Microsoft Azure Storage use case"/>

3. Click the created resource. Next, click the `+` arrow below the Start node to open the side panel. Select **Externals** and click **Add new Connection**. Search `msazurestorage` and click.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/create_new_connection_btn.png" title="Creating a new connection" width="800" alt="Microsoft Azure Storage use case"/>

4. Create a connection as shown below.

    In the window, the following parameters must be provided:

    - **Connection Name**: Unique name to identify the connection.
    - **Connection Type**: msazurestorage
    - **Account Name**: The name of the Azure storage account.
    - **Client ID**: The client ID of the application.
    - **Client Secret**: The client Secret of the application.
    - **Tenant ID**: The Tenant ID of the application.
    - **Default Endpoints Protocol**: http
    !!! note
        You can either define the Account Access key or Client Credentials for authentication. For more information, please refer to [Initialize the connector guide]({{base_path}}/reference/connectors/microsoft-azure-storage-connector/2.x/microsoft-azure-storage-reference/#initialize-the-connector).

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_new_connection.png" title="Configuring a new connection" width="800" alt="Microsoft Azure Storage use case"/>

5. After the connection is successfully created, select the created connection in **Externals**. In the dropdown menu, click `CreateContainer`.
<img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/add_create_container_oparation.png" title="Adding create container operation" width="800" alt="Microsoft Azure Storage use case"/>

6. Next, configure the following parameters in the properties window,

    - **Container Name** - json-eval($.containerName)

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_create_container_operation.png" title="Configuring create container operation" width="800" alt="Microsoft Azure Storage use case"/>

7. Click `+` below the `CreateContainer` node to add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from creating the container as shown below.


    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/adding_respond_mediator.png" title="Adding a respond mediator" width="800" alt="Microsoft Azure Storage use case"/>

8. Follow the same steps to create the next API resource, `/addblob`. This API resource will retrieve information about the blob from the incoming HTTP POST request, such as the container name, blob name, and the file content, and upload it to Microsoft Azure Storage.

9. Next, add the `uploadBlob` operation from the **Externals** tab using the created connection. In the properties view, provide the following expressions for the below properties:
    - **Container Name** - json-eval($.containerName)
    - **Blob name** - json-eval($.fileName)
    - **Content Type** - json-eval($.contentType)
    - **Text Content** - json-eval($.textContent)
    - **Metadata** - json-eval($.metadata)

10. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from uploading the blob.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_add_blob_operation.png" title="Configuring upload blob operation" width="800" alt="Microsoft Azure Storage use case"/>

11. Follow the same steps to create the next API resource, `/downloadblob`. This API resource will retrieve information from the incoming HTTP POST request, such as the container name and blob name, and download from Microsoft Azure Storage.

12. Next, add the `downloadBlob` operation from the **Externals** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **Container Name** - json-eval($.containerName)
    - **Blob name** - json-eval($.fileName)

13. Finally, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `downloadBlob` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_blob_download_operation.png" title="Configuring download blob operation" width="800" alt="Microsoft Azure Storage use case"/>

14. Follow the same steps to create the next API resource, `/deleteblob`. This API resource will retrieve information from the incoming HTTP POST request, such as the container name and blob name, and delete the blob from Microsoft Azure Storage.

15. Next, add the `deleteBlob` operation from the **Externals** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **Container Name** - json-eval($.containerName)
    - **Blob name** - json-eval($.fileName)

16. Finally, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `deleteBlob` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_blob_delete_operation.png" title="Configuring delete blob operation" width="800" alt="Microsoft Azure Storage use case"/>

17. Follow the same steps to create the next API resource, `/listmetadata`. This API resource will retrieve information from the incoming HTTP POST request, such as the container name and blob name, and retrieve the metadata of the blob from Microsoft Azure Storage.

18. Next, add the `listMetadata` operation from the **Externals** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **Container Name** - json-eval($.containerName)
    - **Blob name** - json-eval($.fileName)

19. Finally, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `listMetadata` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_list_metadata_operation.png" title="Configuring list metadata operation" width="800" alt="Microsoft Azure Storage use case"/>

20. Follow the same steps to create the next API resource, `/deletecontainer`. This API resource will retrieve information from the incoming HTTP POST request, such as the container name, and delete the container from Microsoft Azure Storage.

21. Next, add the `deleteContainer` operation from the **Externals** tab using the created connection. In the properties view, provide the following expressions for the below properties:

    - **Container Name** - json-eval($.containerName)

22. Finally, add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response from the `deleteContainer` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/msazure-connector-2x/configure_delete_container_operation.png" title="Configuring delete container operation" width="800" alt="Microsoft Azure Storage use case"/>

23. You can find the complete API XML configuration below. You can go to the source view (by clicking the `</>` icon on the top right corner) and copy-paste the following configuration.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/azure" name="MSAzureStorageTestAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/createcontainer">
        <inSequence>
            <msazurestorage.createContainer configKey="AZURE_CONNECTION">
                <containerName>{json-eval($.containerName)}</containerName>
            </msazurestorage.createContainer>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/addblob">
        <inSequence>
            <msazurestorage.uploadBlob configKey="AZURE_CONNECTION">
                <containerName>{json-eval($.containerName)}</containerName>
                <textContent>{json-eval($.textContent)}</textContent>
                <fileName>{json-eval($.fileName)}</fileName>
                <blobContentType>{json-eval($.contentType)}</blobContentType>
                <metadata>{json-eval($.metadata)}</metadata>
            </msazurestorage.uploadBlob>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/downloadblob">
        <inSequence>
            <msazurestorage.downloadBlob configKey="AZURE_CONNECTION">
                <containerName>{json-eval($.containerName)}</containerName>
                <fileName>{json-eval($.fileName)}</fileName>
            </msazurestorage.downloadBlob>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/deleteblob">
        <inSequence>
            <msazurestorage.deleteBlob configKey="AZURE_CONNECTION">
                <containerName>{json-eval($.containerName)}</containerName>
                <fileName>{json-eval($.fileName)}</fileName>
            </msazurestorage.deleteBlob>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/listmetadata">
        <inSequence>
            <msazurestorage.listMetadata configKey="AZURE_CONNECTION">
                <containerName>{json-eval($.containerName)}</containerName>
                <fileName>{json-eval($.fileName)}</fileName>
            </msazurestorage.listMetadata>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
    <resource methods="POST" uri-template="/deletecontainer">
        <inSequence>
            <msazurestorage.deleteContainer configKey="AZURE_CONNECTION">
                <containerName>{json-eval($.containerName)}</containerName>
            </msazurestorage.deleteContainer>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
</api>
```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/MSAzureStorageConnector.zip">
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

1. Creating a new container in Microsoft Azure Storage for store employee details.
 
    **Sample request**

    ```curl
    curl -v POST -d {"containerName":"employeedetails"} "http://localhost:8290/azure/createcontainer" -H "Content-Type:application/json"
    ```
 
    **Expected Response**

    ```json
    {
        "result": {
            "success": true
        }
    }
    ```
    
2. Upload JSON employee details.

    **Sample request**

    ```curl
    curl -v POST 'http://localhost:8290/azure/addblob' --header 'Content-Type: application/json' -d '{"containerName": "employeedetails", "fileName": "employee1.json", "textContent": "{\"name\":\"John\", \"salary\": 1000, \"age\": 44}", "contentType": "application/json", "metadata": {"key1": "value1"}}'
    ```

    **Expected Response**

    ```json    
    {
        "result": {
            "success": true
        }
    }
    ```
 
4. Download JSON employee details.

    **Sample request**
        
    ```curl
    curl -v POST 'http://localhost:8290/azure/downloadblob' --header 'Content-Type: application/json' -d '{"containerName": "employeedetails", "fileName": "employee1.json"}'
    ```

    **Expected Response**

    It will retrieve the content text or binary name and the file path.
    
    ```json
    {
        "name": "John",
        "salary": 1000,
        "age": 44
    }
    ```

5. Retrieve blob metadata.

    **Sample request**

    ```curl
    curl -v POST 'http://localhost:8290/azure/listmetadata' --header 'Content-Type: application/json' -d '{"containerName": "employeedetails", "fileName": "employee1.json"}'
    ```

    **Expected Response**

    ```json
    {
        "result": {
            "metadata": {
                "key1": "value1"
            }
        }
    }
    ```

6. Remove uploaded employee details (blob).

    **Sample request**

    ```curl
    curl -v POST 'http://localhost:8290/azure/deleteblob' --header 'Content-Type: application/json' -d '{"containerName": "employeedetails", "fileName": "employee1.json"}'
    ```

    **Expected Response**

    ```json
    {
        "result": {
            "success": true
        }
    }
    ```

7. Remove created container.

    **Sample request**
        
    ```curl
    curl -v POST -d {"containerName":"employeedetails"} "http://localhost:8290/azure/deletecontainer" -H "Content-Type:application/json"
    ```

    **Expected Response**
    
    ```json
    {
        "result": {
            "success": true
        }
    }
    ```

## What's next

* You can deploy and run your project on Docker or Kubernetes. See the instructions in [Running the Micro Integrator on Containers]({{base_path}}/develop/deploy-artifacts).
