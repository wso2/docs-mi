# Microsoft Azure Data Lake Storage Connector Reference

The following operations allow you to work with the Microsoft Azure Data Lake Storage Connector. Click an operation name to see parameter details and samples on how to use it.

---

## Initialize the connector

To use the Microsoft Azure Data Lake Storage connector, you need to initialize the configuration before carrying out any other Microsoft Azure Data Lake Storage operations.

To use the Microsoft Azure Storage connector, add the element in your configuration before carrying out any Azure Data Lake Storage operations. This Microsoft Azure Data Lake Storage configuration authenticates with Microsoft Azure Data Lake Storage by Access Key, Azure Active Directory(Oauth2), or Shared Access Signature(SAS) which are used for every operation.

> **Note**: To work with the Microsoft Azure Data Lake Storage connector, you need to create a **Storage Account** in **Microsoft Azure Data Lake Storage account**. See [Azure Storage Configuration]({{base_path}}/reference/connectors/msazuredatalakestorage-connector/microsoft-azure-data-lake-storage-connector-configuration/) documentation for more information.

??? note "MSAzureDataLake"
    The init operation is used to initialize the connection to Microsoft Azure.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>accountName</td>
            <td>The name of the Azure Data Lake storage account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>accessType</td>
            <td>The method for accessing the Azure Data Lake storage account.(Access Key, Shared Access Signature, OAuth2)</td>
            <td>Yes</td>
        </tr>
    </table>
    If you are using the Access Key method,
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>accountKey</td>
            <td>The access key of the Azure Data Lake storage account.</td>
            <td>Yes</td>
        </tr>
    </table>
    If you are using the OAuth2 method,
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>clientId</td>
            <td>The client ID of the application.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>clientSecret</td>
            <td>The client secret of the application.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>tenantId</td>
            <td>The tenant ID of the application.</td>
            <td>Yes</td>
        </tr>
    </table>
    If you are using the Shared Access Signature method,
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>sasToken</td>
            <td>The sas token of the storage.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.init>
        <accountName>{${payload.accountName}}</accountName>
        <accountKey>{${payload.accountKey}}</accountKey>
    </msazuredatalakestorage.init>
    ```
    
---

## File Systems

??? note "createFileSystem"
    The createFileSystem operation creates a file system into the storage. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>he name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>metadata</td>
            <td>The path to the file to be uploaded.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.createFileSystem configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <timeout></timeout>
        <metadata>[]</metadata>
        <accessType>NONE</accessType>
        <responseVariable>msazuredatalakestorage_createFileSystem_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </msazuredatalakestorage.createFileSystem>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "customer-behavior-analytics"
    }
    ```

??? note "deleteFileSystem"
    The deleteFileSystem operation delete the file system. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>No</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>The lease ID of the file system.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.deleteFileSystem configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <responseVariable>msazuredatalakestorage_deleteFileSystem_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <timeout></timeout>
        <leaseId></leaseId>
        <ifUnmodifiedSince></ifUnmodifiedSince>
        <ifMatch></ifMatch>
        <ifModifiedSince></ifModifiedSince>
        <ifNoneMatch></ifNoneMatch>
    </msazuredatalakestorage.deleteFileSystem>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "customer-behavior-analytics"
    }
    ```

??? note "listFileSystems"
    The listFileSystems operation retrives all file systems from the storage. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>The name of the container.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>retrieveMetadata</td>
            <td>Whether to retrieve metadata.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>retrieveDeleted</td>
            <td>Whether to retrieve deleted file systems.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>prefix</td>
            <td>The prefix of the file system name.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxResultsPerPage</td>
            <td>The maximum number of results per page.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.listFileSystems configKey="con1">
        <responseVariable>msazuredatalakestorage_listFileSystems_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <retrieveMetadata>false</retrieveMetadata>
        <retrieveDeleted>false</retrieveDeleted>
        <maxResultsPerPage></maxResultsPerPage>
        <prefix></prefix>
        <timeout></timeout>
    </msazuredatalakestorage.listFileSystems>
    ```

## Directories

??? note "createDirectory"
    The createDirectory operation creates a directory in the storage. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>directoryName</td>
            <td>The name of the directory.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>No</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>metadata</td>
            <td>The metadata to the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentLanguage</td>
            <td>The language of the content.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>The MIME content type of the content.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentEncoding</td>
            <td>Defines the encoding type.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentDisposition</td>
            <td>The value of the Content-Disposition response header.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>cacheControl</td>
            <td>The value of the Cache-Control response header.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>permissions</td>
            <td>The permissions of the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>umask</td>
            <td>The umask of the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sourceLeaseId</td>
            <td>The lease ID of the source directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>group</td>
            <td>The group of the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>owner</td>
            <td>The owner of the directory.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.createDirectory configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <directoryName>{${payload.directoryName}}</directoryName>
        <responseVariable>msazuredatalakestorage_createDirectory_1</responseVariable>
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
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "directoryName": "section1/marketing",
    }
    ```

??? note "deleteDirectory"
    The deleteDirectory operation deletes a directory from the storage. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>directoryName</td>
            <td>The name of the directory to be deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>recursive</td>
            <td>Delete the contents of the directory.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>The lease ID of the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.deleteDirectory configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <directoryName>{${payload.directoryName}}</directoryName>
        <responseVariable>msazuredatalakestorage_deleteDirectory_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <timeout></timeout>
        <recursive>true</recursive>
        <leaseId></leaseId>
        <ifUnmodifiedSince></ifUnmodifiedSince>
        <ifMatch></ifMatch>
        <ifModifiedSince></ifModifiedSince>
        <ifNoneMatch></ifNoneMatch>
    </msazuredatalakestorage.deleteDirectory>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "directoryName": "section1/marketing"
    }
    ```

## Files

??? note "readFile"
    The readFile operation retrives the file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePath</td>
            <td>The path of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>count</td>
            <td>The number of bytes to read.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>The offset to start reading from.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxRetryRequests</td>
            <td>The maximum number of retry requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>This request will succeed only if the provided leaseId matches the actual lease on the resource.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.readFile configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <filePath>{${payload.filePath}}</filePath>
        <responseVariable>msazuredatalakestorage_readFile_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <timeout></timeout>
        <count></count>
        <offset></offset>
        <maxRetryRequests></maxRetryRequests>
        <leaseId></leaseId>
        <ifUnmodifiedSince></ifUnmodifiedSince>
        <ifMatch></ifMatch>
        <ifModifiedSince></ifModifiedSince>
        <ifNoneMatch></ifNoneMatch>
    </msazuredatalakestorage.readFile>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePath": "section1/marketing/sample.json"
    }
    ```

??? note "uploadFile"
    The uploadFile operation uploads a file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePathToUpload</td>
            <td>The destination path in the file system where the file will be uploaded.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>localFilePath</td>
            <td>The local file path of the file to be uploaded.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>textContent</td>
            <td>Text content to be uploaded instead of a file.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>metadata</td>
            <td>The metadata of the file.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>contentLanguage</td>
            <td>The language of the content.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>The MIME content type of the content.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentEncoding</td>
            <td>Defines the encoding type.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentDisposition</td>
            <td>The value of the Content-Disposition response header.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>cacheControl</td>
            <td>The value of the Cache-Control response header.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>blockSize</td>
            <td>The size of the block in MB.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxSingleUploadSize</td>
            <td>The maximum size of a single upload in bytes.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxConcurrency</td>
            <td>The maximum number of blocks that can be uploaded in parallel.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>inputType</td>
            <td>The input type. Either 'local' or 'text.'</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.uploadFile configKey="con1">
        <fileSystemName>{${properties.fileSystemName}}</fileSystemName>
        <filePathToUpload>{${properties.filePathToUpload}}</filePathToUpload>
        <textContent>{${properties.textContent}}</textContent>
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
        <inputType>Text Content</inputType>
    </msazuredatalakestorage.uploadFile>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePathToUpload": "section1/marketing/sample.json",
        "textContent": "This is a sample text content to be uploaded."
    }
    ```

??? note "deleteFile"
    The deleteFile operation deletes a file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>directoryName</td>
            <td>The name of the directory to be deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>recursive</td>
            <td>Delete the contents of the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>The lease ID of the directory.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.deleteFile configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <directoryName>{${payload.directoryName}}</directoryName>
        <responseVariable>msazuredatalakestorage_deleteFile_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <timeout></timeout>
        <leaseId></leaseId>
        <ifUnmodifiedSince></ifUnmodifiedSince>
        <ifMatch></ifMatch>
        <ifModifiedSince></ifModifiedSince>
        <ifNoneMatch></ifNoneMatch>
    </msazuredatalakestorage.deleteFile>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "directoryName": "section1/marketing/sample.json"
        
    }
    ```

??? note "flushFile"
    The flushFile operation flushes a file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePathToFlush</td>
            <td>The path of the file in the file system to flush.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>fileLength</td>
            <td>The length of the file to flush.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>contentLanguage</td>
            <td>The content language of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>The content type of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentEncoding</td>
            <td>The content encoding of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>contentDisposition</td>
            <td>The content disposition of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>cacheControl</td>
            <td>The cache control of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>The lease ID of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The time since which the file has not been modified.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The ETag value of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The time since which the file has been modified.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The ETag value of the file to flush.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>uncommittedDataRetained</td>
            <td>Whether to retain uncommitted data.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseAction</td>
            <td>The lease action to perform.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>leaseDuration</td>
            <td>The duration of the lease.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>proposedLeaseId</td>
            <td>The proposed lease ID.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.flushFile configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <filePathToFlush>{${payload.filePathToFlush}}</filePathToFlush>
        <fileLength>{${payload.fileLength}}</fileLength>
        <contentLanguage></contentLanguage>
        <contentType></contentType>
        <contentEncoding></contentEncoding>
        <contentDisposition></contentDisposition>
        <cacheControl></cacheControl>
        <leaseId></leaseId>
        <ifUnmodifiedSince></ifUnmodifiedSince>
        <ifMatch></ifMatch>
        <ifModifiedSince></ifModifiedSince>
        <ifNoneMatch></ifNoneMatch>
        <uncommittedDataRetained>false</uncommittedDataRetained>
        <leaseAction>None</leaseAction>
        <timeout></timeout>
        <responseVariable>msazuredatalakestorage_flushFile_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <leaseDuration></leaseDuration>
        <proposedLeaseId></proposedLeaseId>
    </msazuredatalakestorage.flushFile>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePathToFlush": "section1/marketing/sample.json",
        "fileLength": 1024
    }
    ```

??? note "downloadFile"
    The downloadFile operation downloads a file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
         <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePathToDownload</td>
            <td>The path of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>downloadLocation</td>
            <td>The destination path to save the downloaded file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>The lease ID of the file.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>blockSize</td>
            <td>The size of the block in MB.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxSingleDownloadSize</td>
            <td>The maximum size of a single download in bytes.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxConcurrency</td>
            <td>The maximum number of blocks that can be downloaded in parallel.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>The offset in bytes from where the download should start.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>count</td>
            <td>The number of bytes to be downloaded.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxRetryRequests</td>
            <td>The maximum number of retry requests.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>rangeGetContentMd5</td>
            <td>Whether the contentMD5 for the specified file range should be returned.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.downloadFile configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <filePathToDownload>{${payload.filePathToDownload}}</filePathToDownload>
        <downloadLocation>{${payload.downloadLocation}}</downloadLocation>
        <responseVariable>msazuredatalakestorage_downloadFile_1</responseVariable>
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
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePathToDownload": "section1/marketing/sample.json",
        "downloadLocation": "/path/to/download/location/sample.json"
    }
    ```

??? note "appendFile"
    The appendFile operation appends new content to the file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePathToAppend</td>
            <td>The path of the file in the file system where data will be appended.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>inputType</td>
            <td>The input type. Either 'local' or 'text.'</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>localFilePath</td>
            <td>The local file path containing the data to be appended.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>textContent</td>
            <td>Text content to append directly instead of reading from a file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>flush</td>
            <td>This request will succeed only if the provided leaseId matches the actual lease on the resource.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseAction</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>leaseDuration</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>proposedLeaseId</td>
            <td>A proposed lease ID that can be set when acquiring or changing a lease.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.appendFile configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <filePathToAppend>{${payload.filePathToAppend}}</filePathToAppend>
        <inputType>Local File</inputType>
        <localFilePath>{${payload.localFilePath}}</localFilePath>
        <timeout></timeout>
        <responseVariable>msazuredatalakestorage_appendFile_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <flush>true</flush>
        <leaseId></leaseId>
        <leaseAction>None</leaseAction>
        <leaseDuration></leaseDuration>
        <proposedLeaseId></proposedLeaseId>
    </msazuredatalakestorage.appendFile>
    ```
    
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePathToAppend": "section1/marketing/sample.json",
        "localFilePath": "/path/to/local/file.txt",
    }
    ```

??? note "getMetadata"
    The getMetadata operation retrives metadata of a file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePath</td>
            <td>The path of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.getMetadata configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <filePath>{${payload.filePath}}</filePath>
        <responseVariable>msazuredatalakestorage_getMetadata_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </msazuredatalakestorage.getMetadata>
    ```

    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePath": "section1/marketing/sample.json"
    }
    ``` 

??? note "updateMetadata"
    The updateMetadata operation updates metadata of a file. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePathToAddMetaData</td>
            <td>The path of the file where metadata will be added.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>metadata</td>
            <td>The metadata to be added.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>leaseId</td>
            <td>This request will succeed only if the provided leaseId matches the actual lease on the resource.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>ifNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.updateMetadata configKey="con1">
        <fileSystemName>{${payload.fileName}}</fileSystemName>
        <filePathToAddMetaData>{${payload.filePathToAddMetaData}}</filePathToAddMetaData>
        <metadata>[["key1","${payload.key1}"],]</metadata>
        <timeout></timeout>
        <responseVariable>msazuredatalakestorage_updateMetadata_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <leaseId></leaseId>
        <ifUnmodifiedSince></ifUnmodifiedSince>
        <ifMatch></ifMatch>
        <ifModifiedSince></ifModifiedSince>
        <ifNoneMatch></ifNoneMatch>
    </msazuredatalakestorage.updateMetadata>
    ```
    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "filePathToAddMetaData": "section1/marketing/sample.json",
        "key1": "value1"
    }
    ``` 

## Paths

??? note "listPaths"
    The listPaths operation lists all paths from a file sytem. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>path</td>
            <td>The path to list.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>recursive</td>
            <td>Whether to list recursively.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>maxResults</td>
            <td>The maximum number of results to return.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.listPaths configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <path>{${payload.path}}</path>
        <recursive>true</recursive>
        <responseVariable>msazuredatalakestorage_listPaths_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <timeout></timeout>
        <maxResults></maxResults>
    </msazuredatalakestorage.listPaths>
    ```

    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "path": "section1/marketing"
    }
    ```

??? note "renamePath"
    The renamePath operation renames a path. See the [related API documentation](https://learn.microsoft.com/en-us/java/api/overview/azure/storage-file-datalake-readme?view=azure-java-stable) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>fileSystemName</td>
            <td>The name of the file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>directoryName</td>
            <td>The name of the directory.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>newDirectoryName</td>
            <td>The new name of the directory.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the response of the operation.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>The timeout for the operation.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>newFileSystemName</td>
            <td>The name of the new file system.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>sourceLeaseId</td>
            <td>This request will succeed only if the provided leaseId matches the actual lease on the resource.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sourceIfUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sourceIfMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sourceIfModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>sourceIfNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>destinationLeaseId</td>
            <td>This request will succeed only if the provided leaseId matches the actual lease on the resource.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>destinationIfUnmodifiedSince</td>
            <td>The operation will be performed only if the resource has not been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>destinationIfMatch</td>
            <td>The operation will be performed only if the resource's ETag matches the specified ETag value.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>destinationIfModifiedSince</td>
            <td>The operation will be performed only if the resource has been modified since the specified time.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>destinationIfNoneMatch</td>
            <td>The operation will be performed only if the resource's ETag does not match the specified ETag value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <msazuredatalakestorage.renamePath configKey="con1">
        <fileSystemName>{${payload.fileSystemName}}</fileSystemName>
        <directoryName>{${payload.directoryName}}</directoryName>
        <newDirectoryName>{${payload.newDirectoryName}}</newDirectoryName>
        <responseVariable>msazuredatalakestorage_renamePath_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <timeout></timeout>
        <newFileSystemName>{${payload.newFileSystemName}}</newFileSystemName>
        <sourceLeaseId></sourceLeaseId>
        <sourceIfUnmodifiedSince></sourceIfUnmodifiedSince>
        <sourceIfMatch></sourceIfMatch>
        <sourceIfModifiedSince></sourceIfModifiedSince>
        <sourceIfNoneMatch></sourceIfNoneMatch>
        <destinationLeaseId></destinationLeaseId>
        <destinationIfUnmodifiedSince></destinationIfUnmodifiedSince>
        <destinationIfMatch></destinationIfMatch>
        <destinationIfModifiedSince></destinationIfModifiedSince>
        <destinationIfNoneMatch></destinationIfNoneMatch>
    </msazuredatalakestorage.renamePath>
    ```

    **Sample request**

    ```json
    {
        "fileSystemName": "sales",
        "directoryName": "section1/marketing",
        "newDirectoryName": "section1/marketing_renamed",
        "newFileSystemName": "sales_renamed"
    }
    ``` 

## Error codes related to Microsoft Azure Data Lake Storage Connector

| Error code | Error message |
| -------- | ------- |
| 710001 | MS_AZURE_DATALAKE_GEN2:CONNECTION_ERROR |
| 710002 | MS_AZURE_DATALAKE_GEN2:INVALID_CONFIGURATION |
| 710003 | MS_AZURE_DATALAKE_GEN2:MISSING_PARAMETERS |
| 710004 | MS_AZURE_DATALAKE_GEN2:AUTHENTICATION_ERROR |
| 710005 | MS_AZURE_DATALAKE_GEN2:FILE_ALREADY_EXISTS_ERROR |
| 710006 | MS_AZURE_DATALAKE_GEN2:FILE_IO_ERROR |
| 710007 | MS_AZURE_DATALAKE_GEN2:DATA_LAKE_STORAGE_GEN2_ERROR |
| 710008 | MS_AZURE_DATALAKE_GEN2:FILE_PERMISSION_ERROR |
| 710009 | MS_AZURE_DATALAKE_GEN2:GENERAL_ERROR |
| 710010 | MS_AZURE_DATALAKE_GEN2:FILE_SYSTEM_DOES_NOT_EXIST |
| 710011 | MS_AZURE_DATALAKE_GEN2:INVALID_JSON |
| 710012 | MS_AZURE_DATALAKE_GEN2:TIMEOUT_ERROR |
| 710013 | MS_AZURE_DATALAKE_GEN2:DIRECTORY_NOT_FOUND_ERROR |
| 710014 | MS_AZURE_DATALAKE_GEN2:FILE_DOES_NOT_EXIST |
| 710015 | MS_AZURE_DATALAKE_GEN2:No_SUCH_ALGORITHM |
| 710016 | MS_AZURE_DATALAKE_GEN2:IO_EXCEPTION |
| 700717 | MS_AZURE_DATALAKE_GEN2:DIRECTORY_ALREADY_EXISTS_ERROR |
| 710018 | MS_AZURE_DATALAKE_GEN2:INVALID_MAX_RETRY_REQUESTS |

In addition to the above `ERROR_DETAIL` property will contain detail information about the error. For more information, refer to [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).