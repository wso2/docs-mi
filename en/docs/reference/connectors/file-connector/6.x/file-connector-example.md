# File Connector Example

File Connector can be used to perform operations in the local file system as well as in a remote server such as FTP and SFTP. 

## What you'll build

This example explains how to use File Connector to create a file in the local file system and read the particular file. The user sends a payload specifying which content is to be written to the file. Based on that content, a file is created in the specified location. Then the content of the file can be read as an HTTP response by invoking the other API resource upon the existence of the file. Similarly, the same example can be configured to communicate with a remote file system (i.e FTP server) easily. The example also uses some other WSO2 mediators to manipulate messages.

It will have two HTTP API resources, which are `create` and `read`.

* `/create `: The user sends the request payload which includes the location where the file needs to be saved and the content needs to be added to the file. This request is sent to the integration runtime by invoking the FileConnector API. It saves the file in the specified location with the relevant content.

    <p><img src="{{base_path}}/assets/img/integrate/connectors/filecon-3.x/fileconnector-03.png" title="Adding a Rest API" width="800" alt="Adding a Rest API" /></p>

* `/read `: The user sends the request payload, which includes the location of the file that needs to be read. This request is sent to the integration runtime where the FileConnector API resides. Once the API is invoked, it first checks if the file exists in the specified location. If it exists, the content is read and response is sent to the user. If the file does not exist, it sends an error response to the user.

    <img src="{{base_path}}/assets/img/integrate/connectors/filecon-3.x/fileconnector-02.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **Integration Project**. 

## Create the integration logic to create a file

1. Under the **Create an integration** section, select **API** to create a new REST API.
   <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-conn-add-api.png" title="Adding a Rest API" width="900" alt="Adding a Rest API"/>

    Provide the API name as `FileConnector` and the API context as `/fileConnector` and click on `Create`.
    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-conn-add-api-context.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>
    Select the newly created `fileConnector` API and Click the `Edit` icon to change the URI template API method. 

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-edit-resource-1.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>
    Update the value of `URI template` to `/create` and value of `method` to `Post`.

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-edit-resource-create.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>

2. First, Let's create a sample payload request to send API. Click on the `Start` node and select the `Add Request` option. This will create a new example payload request.

    </br/>
   <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-conn-add-request.png" title="Adding the sample API request." width="700" alt="Adding the API request."/>
    
    In this operation, we are going to receive the following inputs from the user. 

    - **filePath** - Location where the file needs to be created.
    - **inputContent** - Content that needs to be added to the file.

    Therefore, provide the following JSON payload to the request.
    ```json
    {
        "filePath": "/Users/wso2/Documents/mi_testing/doc/create.txt",
        "inputContent": "This is a test file"
    }
    ``` 

3. We need to add the File Connector to the integration project. Click on the Add icon and search for the File connector. Select the File connector and click on the Download button.

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-search.png" title="Adding the API resource." width="700" alt="Adding the API resource."/>

     To add the write operation under the API, click on **Connectors**, select the **file** connector, and choose the **write** operation. 

     <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-add-operation.png" title="Adding the API resource." width="700" alt="Adding the API resource."/>

5. Click on **Add new connection** to create the new local file connection.

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-options.png" title="Create File Options" width="700" alt="Create File Options"/>

    Select **Local** as the connection type and provide the connection name as `local_file_connection`.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-conn-add-connection.png" title="Adding createFile operation" width="700" alt="Adding createFile operation"/>

6. After creating the local file connection, update the values for file path and Content for the write operation.

    Since we have already added a sample payload request in the Start node, we can use the Expression editor to get the values from the payload. 

    Click on the **Expression** icon and select the `Payload` option. Under the `Payload` option, select the `filePath`.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-write-filePath.png" title="File Write Operation" width="700" alt="File Write Operation"/>

    Similarly, select the `inputContent` for the **Content** field.

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-write-fileContent.png" title="File Write Operation" width="700" alt="File Write Operation"/>

7. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to respond to the response from sending the email as shown below.

   <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-respond.png" title="Adding the respond mediator." width="700" alt="Adding the respond mediator."/>



??? note "Source view of the implemented resource"
    ```xml
        <resource methods="POST" uri-template="/create">
        <inSequence>
            <file.write configKey="local_file_connection">
                <filePath>{${payload.filePath}}</filePath>
                <contentOrExpression>${payload.inputContent}</contentOrExpression>
                <encoding>UTF-8</encoding>
                <mimeType>Automatic</mimeType>
                <compress>false</compress>
                <writeMode>Overwrite</writeMode>
                <enableStreaming>false</enableStreaming>
                <appendNewLine>false</appendNewLine>
                <enableLock>false</enableLock>
                <updateLastModified>true</updateLastModified>
                <timeBetweenSizeCheck>1000</timeBetweenSizeCheck>
                <updateFilePermission>644</updateFilePermission>
                <maxRetries>0</maxRetries>
                <retryDelay>0</retryDelay>
                <diskShareAccessMask>MAXIMUM_ALLOWED</diskShareAccessMask>
                <responseVariable>file_write_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </file.write>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    ```
## Create the integration logic to read a file

1. Click on **+ Resource** to add new resource.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-add-new-resource.png" title="Adding an API resource" width="500" alt="Adding an API resource"/>

2. Use the URL template as `/read`. The method will be POST.

3.  Implement the following API as described above.

??? note "Source view"
    ```
        <resource methods="POST" uri-template="/read">
            <inSequence>
                <file.checkExist configKey="local_file_connection">
                    <path>{${payload.filePath}}</path>
                    <diskShareAccessMask>MAXIMUM_ALLOWED</diskShareAccessMask>
                    <responseVariable>file_checkExist_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </file.checkExist>
                <filter xpath="${vars.file_checkExist_1.payload.fileExists}">
                    <then>
                        <file.read configKey="local_file_connection">
                            <path>{${payload.filePath}}</path>
                            <filePattern></filePattern>
                            <readMode>Complete File</readMode>
                            <contentType></contentType>
                            <encoding>UTF-8</encoding>
                            <enableStreaming>false</enableStreaming>
                            <enableLock>false</enableLock>
                            <maxRetries>0</maxRetries>
                            <retryDelay>0</retryDelay>
                            <diskShareAccessMask>MAXIMUM_ALLOWED</diskShareAccessMask>
                            <responseVariable>file_read_1</responseVariable>
                            <overwriteBody>true</overwriteBody>
                        </file.read>
                    </then>
                    <else>
                        <payloadFactory media-type="json" template-type="default">
                            <format>{"message" : "File ${payload.filePath} does not exist."}</format>
                        </payloadFactory>
                        <property name="HTTP_SC" scope="axis2" type="STRING" value="404"/>
                    </else>
                </filter>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/FileConnector5xxExample.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

## Test

### File create operation

1. Once the **Runtime Services** interface is open, select the `FileConnector`, and click the **Try It** button.

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-runtime-services.png" title="Test Create Operation" width="900" alt="Test Create Operation"/>

2. Select the `/create` resource and click **Try it Out** to test the API.

    <img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-tryit.png" title="Test Create Operation" width="900" alt="Test Create Operation"/>

3. Provide a JSON payload and click the **Execute** button to invoke the API. You may use the following sample payload to test the API. Make sure to change the file path to a valid location in your system.

    ```json
    {
        "filePath":"/Users/wso2/Documents/mi_testing/doc/create.txt",
        "inputContent": "This is a test file"
    }
    ```

    <a href="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-con-execute.png" alt="Test Create Operation" width="900"></a>

4. Check the success response received from the server, and verify that the file should be created in the specified location in the above payload.

### File read operation

1. Select the `/read` resource and click **Try it Out** to test the API.

2. Provide a JSON payload and click the **Execute** button to invoke the API. You may use the following sample payload to test the API. Make sure to change the file path to a valid location in your system.

    ```json
    {
        "filePath":"/Users/wso2/Documents/mi_testing/doc/create.txt"
    }
    ```

3. Verify the content received in the response. 

    ```
    This is a test file.
    ```

## Enhanced Features Available

The File Connector provides several advanced features demonstrated in the example above:

### File Stability Checking
The `timeBetweenSizeCheck` parameter allows you to ensure files are not actively being written before performing operations. This is particularly useful in scenarios where files may be created by external processes:

```xml
<timeBetweenSizeCheck>1000</timeBetweenSizeCheck>
```

### File Permission Management
The `updateFilePermission` parameter lets you set POSIX file permissions after writing files (local file system only):

```xml
<updateFilePermission>644</updateFilePermission>
```

### International Character Support
For ZIP operations, the `fileNameEncoding` parameter enables proper handling of non-ASCII file names:

```xml
<fileNameEncoding>UTF-8</fileNameEncoding>
```

## What's next

* To customize this example for your own scenario, see [File Connector Reference Guide]({{base_path}}/reference/connectors/file-connector/file-connector-config) documentation for all operation details of the connector.
