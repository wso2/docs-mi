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

Follow these steps to set up the Integration Project using the WSO2 Micro Integrator Visual Studio Code extension.

### Create the new project

1. Go to **WSO2 Micro Integrator** in the VS Code.

2. Click on **Create New Project** to create the new integration project.

3. provide the **Project Name** and select the **Project Directory**

    <img src="{{base_path}}/assets/img/integrate/connectors/new-vscode-project.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

4. You have now created the new project with the following structure.

     <img src="{{base_path}}/assets/img/integrate/connectors/prject-structure.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

### Create the integration logic

#### Create the first resource

1. Click on the **+** button next to the **APIs** and provide the API name as `FileConnector` and the API context as `/fileConnector`.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-add-api.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

2. To create the `/create` resource. Click on **Edit** and update the value of `URI template` to `/create` and value of `method` to `Post`.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-update-resource.png" title="Adding the API resource." width="500" alt="Adding the API resource."/>

3. Open the API in the diagram view and click on the **+** button below to **START** to add connectors or mediators.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-add-connector.png" title="Adding the API resource." width="500" alt="Adding the API resource."/>

4. To add the write operation under the API, click on **Connectors**, select the **file** connector, and choose the **write** operation.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-add-operation.png" title="Adding the API resource." width="500" alt="Adding the API resource."/>

5. Click on **Add new connection** to create the new local file connection.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-add-new-connection.png" title="Adding createFile operation" width="500" alt="Adding createFile operation"/>

6. After creating the local file connection, update the values for file path and Content for the write operation.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-write-operation.png" title="First API Resource" width="500" alt="First API Resource"/>

??? note "Source view of the implemented resource"
    ```xml
        <resource methods="POST" uri-template="/create">
            <inSequence>
                <file.write configKey="local_file_connection">
                    <filePath>{json-eval($.filePath)}</filePath>
                    <contentOrExpression>{json-eval($.inputContent)}</contentOrExpression>
                    <mimeType>Automatic</mimeType>
                    <writeMode>Overwrite</writeMode>
                    <appendPosition>0</appendPosition>
                    <encoding>UTF-8</encoding>
                    <compress>false</compress>
                    <appendNewLine>false</appendNewLine>
                    <enableStreaming>false</enableStreaming>
                    <enableLock>false</enableLock>
                    <updateLastModified>true</updateLastModified>
                    <includeResultTo>Message Body</includeResultTo>
                </file.write>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    ```
#### Create the second resource

1. Click on **+ Resource** to add new resource.

     <img src="{{base_path}}/assets/img/integrate/connectors/file-add-new-resource.png" title="Adding an API resource" width="500" alt="Adding an API resource"/>

2. Use the URL template as `/read`. The method will be POST.

3.  Implement the following API as described above.

??? note "Source view"
    ```
        <resource methods="POST" uri-template="/read">
            <inSequence>
                <property name="path" expression="json-eval($.filePath)"/>
                <file.checkExist configKey="local_file_connection">
                    <path>{$ctx:path}</path>
                    <includeResultTo>Message Body</includeResultTo>
                </file.checkExist>
                <switch source="json-eval($.checkExistResult.fileExists)">
                    <case regex="true">
                        <file.read configKey="local_file_connection">
                        <path>{$ctx:path}</path>
                        <readMode>Complete File</readMode>
                        <startLineNum>0</startLineNum>
                        <endLineNum>0</endLineNum>
                        <lineNum>0</lineNum>
                        <encoding>UTF-8</encoding>
                        <enableStreaming>false</enableStreaming>
                        <enableLock>false</enableLock>
                        <includeResultTo>Message Body</includeResultTo>
                    </file.read>
                    <respond/>
                    </case>
                <default>
                    <log category="INFO" level="simple">
                        <property name="Status" value="File does not exist"/>
                    </log>
                    <drop/>
                </default>
                </switch>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/FileConnectorExample.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

Once you have [built your artifacts]({{base_path}}/develop/packaging-artifacts) into a composite application, you can
export it into a CAR file (.car file) using the WSO2 Micro Integrator Visual Studio Code extension:

1.  Open the project overview and click on **Export**.

     <img src="{{base_path}}/assets/img/integrate/connectors/export_artifacts.jpeg" width="800" alt="Download ZIP">

2.  Click on **Select Destination** to select a destination folder to export the CAR file.

## Test

### File create operation

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
```
curl --location 'http://localhost:8290/fileconnector/create' \
--header 'Content-Type: application/json' \
--data '{
"filePath":"/Users/wso2/Documents/mi_testing/doc/create.txt",
"inputContent": "This is a test file"
}'
```

**Expected response**:

You should get a 'Success' response, and the file should be created in the specified location in the above payload.

### File read operation

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
```
curl --location 'http://localhost:8290/fileconnector/read' \
--header 'Content-Type: application/json' \
--data '{
"filePath":"/Users/wso2/Documents/mi_testing/doc/create.txt"
}'
```

**Expected response**:

You should get the following text returned.

```
This is a test file.
```

## What's next

* To customize this example for your own scenario, see [File Connector Reference Guide]({{base_path}}/reference/connectors/file-connector/file-connector-config) documentation for all operation details of the connector.
