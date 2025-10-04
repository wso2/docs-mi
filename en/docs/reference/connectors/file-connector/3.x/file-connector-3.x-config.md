# File Connector Reference

The following operations allow you to work with the File Connector version 3. Click an operation name to see parameter details and samples on how to use it.

??? note "append"
    The append operation appends content to an existing file in a specified location.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location of the file for which content needs to be appended.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>inputContent</td>
            <td>The content to be appended.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>position</td>
            <td>Position to append the content. If you provide a valid position, content will be appended to that position. Otherwise, content will be appended at the end of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>encoding</td>
            <td>The encoding that is supported. Possible values are US-ASCII, UTF-8, and UTF-16.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentities</td>
            <td>Location of the private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentityPassphrase</td>
            <td>Passphrase of the private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.append>
        <destination>{${properties.destination}}</destination>
        <inputContent>{${properties.inputContent}}</inputContent>
        <position>{${properties.position}}</position>
        <encoding>{${properties.encoding}}</encoding>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <sftpIdentities>{${properties.sftpIdentities}}</sftpIdentities>
        <sftpIdentityPassphrase>{${properties.sftpIdentityPassphrase}}</sftpIdentityPassphrase>
    </fileconnector.append>
    ```
    
    **Sample request**
    
    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "destination":"/home/vive/Desktop/file/append.txt",
            "inputContent":"Add Append Text."
        }
    ```


??? note "archive"
    The archive operation archives files or folders. This operation supports the ZIP archive type.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server. 
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li> 
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location of the archived file with the file name. (e.g., file:///home/user/test/test.zip)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>inputContent</td>
            <td>The input content that needs to be archived.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>fileName</td>
            <td>The name of the file where input content needs to be archived.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeSubDirectories</td>
            <td>Set to true if you want to include the sub directories.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentities</td>
            <td>Location of the private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentityPassphrase</td>
            <td>Passphrase of the private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    > NOTE: To make an archive operation, you can provide either the source or inputContent. If inputContent is provided as the parameter, we need to specify fileName. Otherwise, it will use the default fileName (output.txt).

    **Sample configuration**

    ```xml
    <fileconnector.archives>
        <source>{${properties.source}}</source>
        <destination>{${properties.destination}}</destination>
        <inputContent>{${properties.inputContent}}</inputContent>
        <fileName>{${properties.fileName}}</fileName>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <includeSubDirectories>{${properties.includeSubDirectories}}</includeSubDirectories>
        <sftpIdentities>{${properties.sftpIdentities}}</sftpIdentities>
        <sftpIdentityPassphrase>{${properties.sftpIdentityPassphrase}}</sftpIdentityPassphrase>
    </fileconnector.archives>
    ```

    **Sample request**

    Following is a sample REST/JSON request that can be handled by the archive operation.
    ```json
    {
        "source":"/home/vive/Desktop/file",
        "destination":"/home/user/test/file.zip",
        "includeSubDirectories":"true"
    }
    ```


??? note "copy"
    The copy operation copies files from one location to another. This operation can be used when you want to copy any kind of files and large files as well. You can also copy particular files with specified file patterns.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server.
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li>
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location of the archived file with the file name. (e.g., file:///home/user/test/test.zip)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePattern</td>
            <td>The pattern of the files to be copied. (e.g., [a-zA-Z][a-zA-Z]*.(txt|xml|jar))</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeParentDirectory</td>
            <td>Set to true if you want to include the parent directory.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentities</td>
            <td>Location of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentityPassphrase</td>
            <td>Passphrase of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentities</td>
            <td>Location of the target's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentityPassphrase</td>
            <td>Passphrase of the target's private key.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeSubDirectories</td>
            <td>Set to true if you want to include the sub directories.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.copy>
        <source>{${properties.source}}</source>
        <destination>{${properties.destination}}</destination>
	    <filePattern>{${properties.filePattern}}</filePattern>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
	    <includeParentDirectory>{${properties.includeParentDirectory}}</includeParentDirectory>
	    <sourceSftpIdentities>{${properties.sftpIdentities}}</sourceSftpIdentities>
        <sourceSftpIdentityPassphrase>{${properties.sourceSftpIdentityPassphrase}}</sourceSftpIdentityPassphrase>
        <targetSftpIdentities>{${properties.targetSftpIdentities}}</targetSftpIdentities>
        <targetSftpIdentityPassphrase>{${properties.targetSftpIdentityPassphrase}}</targetSftpIdentityPassphrase>
        <includeSubDirectories>{${properties.includeSubDirectories}}</includeSubDirectories>
    </fileconnector.copy>
    ```

    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file",
        "destination":"/home/user/test/fileCopy",
        "filePattern":".*\.xml",
        "includeParentDirectory":"false",
        "includeSubDirectories":"false"
    }
    ```


??? note "create"
    The create operation creates a file or folder in a specified location. When creating a file, you can either create the file with content or without content.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>filePath</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server.
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li>
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>inputContent</td>
            <td>The content of the file.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>encoding</td>
            <td>The encoding that is supported. Possible values are US-ASCII, UTF-8, and UTF-16.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>isBinaryContent</td>
            <td>Set to true if input content should be handled as binary data. Input content is expected to be base64 encoded binary content.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentities</td>
            <td>Location of the private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentityPassphrase</td>
            <td>Passphrase of the private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.create>
        <filePath>{${properties.filePath}}</filePath>
        <inputContent>{${properties.inputContent}}</inputContent>
	    <encoding>{${properties.encoding}}</encoding>
	    <isBinaryContent>{${properties.isBinaryContent}}</isBinaryContent>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <sftpIdentities>{${properties.sftpIdentities}}</sftpIdentities>
        <sftpIdentityPassphrase>{${properties.sftpIdentityPassphrase}}</sftpIdentityPassphrase>
    </fileconnector.create>
    ```

    **Sample request**

    ```json
    {
        "filePath":"sftp://UserName:Password@Host/home/connectors/create.txt",
        "inputContent":"InputContent Text",
        "encoding":"UTF8"
    }
    ```


??? note "delete"
    The delete operation deletes a file or folder from the file system.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server.
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li>
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePattern</td>
            <td>The pattern of the files to be deleted.(e.g., [a-zA-Z][a-zA-Z]*.(txt|xml|jar)).</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeSubDirectories</td>
            <td>Set to true if you want to include the sub directories.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>deleteContainerFolders</td>
            <td>Set to true if you want to delete the container folders.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentities</td>
            <td>Location of the private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentityPassphrase</td>
            <td>Passphrase of the private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.delete>
        <source>{${properties.source}}</source>
        <filePattern>{${properties.filePattern}}</filePattern>
	    <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <includeSubDirectories>{${properties.includeSubDirectories}}</includeSubDirectories>
        <deleteContainerFolders>{${properties.deleteContainerFolders}}</deleteContainerFolders>
        <sftpIdentities>{${properties.sftpIdentities}}</sftpIdentities>
        <sftpIdentityPassphrase>{${properties.sftpIdentityPassphrase}}</sftpIdentityPassphrase>
    </fileconnector.delete>
    ```

    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file",
        "filePattern":".*\.txt",
        "includeSubDirectories":"true"
    }
    ```


??? note "isFileExist"
    The isFileExist operation checks the existence of a file in a specified location. This operation returns true if the file exists and returns false if the file does not exist in the specified location.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server.
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li>
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>sftpIdentities</td>
            <td>The location of the private key.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>sftpIdentityPassphrase</td>
            <td>The passphrase of the private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.isFileExist>
        <source>{${properties.source}}</source>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <sftpIdentities>{${properties.sftpIdentities}}</sftpIdentities>
        <sftpIdentityPassphrase>{${properties.sftpIdentityPassphrase}}</sftpIdentityPassphrase>
    </fileconnector.isFileExist>
    ```

    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file/test.txt"
    }
    ```


??? note "listFileZip"
    The listFileZip operation lists all the file paths inside a compressed file. This operation supports the ZIP archive type.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server.
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li>
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.listFileZip>
        <source>{${properties.source}}</source>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
    </fileconnector.listFileZip>
    ```

    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file/test.zip"
    }
    ```


??? note "move"
    The  move operation moves a file or folder from one location to another.

    **Info**: The move operation can only move a file/folder within the same server. For example, you can move a file/folder from one local location to another local location, or from one remote location to another remote location on the same server. You cannot use the move operation to move a file/folder between different servers. If you want to move a file/folder from a local location to a remote location or vice versa, use the copy operation followed by delete operation instead of using the move operation.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server.
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li>
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location where the file has to be moved to.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeParentDirectory</td>
            <td>Set to true if you want to include the parent directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeSubDirectories</td>
            <td>Set to true if you want to include the sub directories.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setAvoidPermission</td>
            <td>Set to true if you want to skip the file permission check.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentities</td>
            <td>Location of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentityPassphrase</td>
            <td>Passphrase of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentities</td>
            <td>Location of the target's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentityPassphrase</td>
            <td>Passphrase of the target's private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.move>
        <source>{${properties.source}}</source>
        <destination>{${properties.destination}}</destination>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <filePattern>{${properties.filePattern}}</filePattern>
	    <includeParentDirectory>{${properties.includeParentDirectory}}</includeParentDirectory>
        <includeSubDirectories>{${properties.includeSubDirectories}}</includeSubDirectories>
        <setAvoidPermission>{${properties.setAvoidPermission}}</setAvoidPermission>
	    <sourceSftpIdentities>{${properties.sftpIdentities}}</sourceSftpIdentities>
        <sourceSftpIdentityPassphrase>{${properties.sourceSftpIdentityPassphrase}}</sourceSftpIdentityPassphrase>
        <targetSftpIdentities>{${properties.targetSftpIdentities}}</targetSftpIdentities>
        <targetSftpIdentityPassphrase>{${properties.targetSftpIdentityPassphrase}}</targetSftpIdentityPassphrase>
    </fileconnector.move>
    ```

    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file",
        "destination":"/home/vive/Desktop/move",
        "filePattern":".*\.txt",
        "includeParentDirectory":"true",
        "includeSubDirectories":"true"
    }
    ```


??? note "read"
    The read operation reads content from an existing file in a specified location.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server. 
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li> 
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePattern</td>
            <td>The pattern of the file to be read.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>Content type of the files processsed by the connector.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>streaming</td>
            <td>The streaming mode. This can be either true or false.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeParentDirectory</td>
            <td>Set to true if you want to include the parent directory.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentities</td>
            <td>Location of the private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sftpIdentityPassphrase</td>
            <td>Passphrase of the private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Info**: To enable streaming for large files, you have to add the following message builder and formatter in the <ESB_HOME>/repository/conf/axis2/axis2.xml file:
    * Add <messageFormatter contentType="application/file" class="org.wso2.carbon.relay.ExpandingMessageFormatter"/> under message formatters.
    * Add <messageBuilder contentType="application/file" class="org.apache.axis2.format.BinaryBuilder"/> under message builders.

    **Sample configuration**
    
    ```xml
    <fileconnector.read>
        <source>{${properties.source}}</source>
        <filePattern>{${properties.filePattern}}</filePattern>
        <contentType>{${properties.contentType}}</contentType>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
        <sftpIdentities>{${properties.sftpIdentities}}</sftpIdentities>
        <sftpIdentityPassphrase>{${properties.sftpIdentityPassphrase}}</sftpIdentityPassphrase>
    </fileconnector.read>
    ```
    
    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file",
        "contentType":"application/xml",
        "filePattern":".*\.xml",
        "streaming":"false"
    }
    ```


??? note "search"
    The search operation finds a file or folder based on a given file pattern or directory pattern in a specified location.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server. 
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li> 
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePattern</td>
            <td>The pattern of the file to be read.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>recursiveSearch</td>
            <td>Whether you are searching recursively (the possible values are True or False).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>includeParentDirectory</td>
            <td>Set to true if you want to include the parent directory.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <fileconnector.search>
        <source>{${properties.source}}</source>
        <filePattern>{${properties.filePattern}}</filePattern>
	    <recursiveSearch>{${properties.recursiveSearch}}</recursiveSearch>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
    </fileconnector.search>
    ```
    
    **Sample request**
    ```json
    {
        "source":"/home/vive/Desktop/file",
        "filePattern":".*\.xml",
        "recursiveSearch":"true"
    }
    ```


??? note "unzip"
    The unzip operation decompresses zip file. This operation supports ZIP archive type.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file. This can be a file on the local physical file system or a file on an FTP server. 
                <ul>
                    <li>For local files, the URI format is [file://]absolute-path, where absolute-path is a valid absolute file name for the local platform. UNC names are supported under Windows (e.g., file:///home/user/test or file:///C:/Windows).</li> 
                    <li>For files on a FTP server, the URI format is ftp://[ username[: password]@] hostname[: port][ relative-path] (e.g., ftp://myusername:mypassword@somehost/pub/downloads/test.txt).</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location of the decompressed file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>setTimeout</td>
            <td>The timeout value on the JSC (Java Secure Channel) session in milliseconds. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setPassiveMode</td>
            <td>Set to true if you want to enable passive mode.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setSoTimeout</td>
            <td>The socket timeout value for the FTP client. E.g., 100000.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setUserDirIsRoot</td>
            <td>Set to true if you want to use root as the user directory.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>setStrictHostKeyChecking</td>
            <td>Sets the requirement to use host key checking. E.g., no.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentities</td>
            <td>Location of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentityPassphrase</td>
            <td>Passphrase of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentities</td>
            <td>Location of the target's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentityPassphrase</td>
            <td>Passphrase of the target's private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <fileconnector.unzip>
        <source>{${properties.source}}</source>
        <destination>{${properties.destination}}</destination>
        <setTimeout>{${properties.setTimeout}}</setTimeout>
        <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
        <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
        <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
        <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
	    <sourceSftpIdentities>{${properties.sftpIdentities}}</sourceSftpIdentities>
        <sourceSftpIdentityPassphrase>{${properties.sourceSftpIdentityPassphrase}}</sourceSftpIdentityPassphrase>
        <targetSftpIdentities>{${properties.targetSftpIdentities}}</targetSftpIdentities>
        <targetSftpIdentityPassphrase>{${properties.targetSftpIdentityPassphrase}}</targetSftpIdentityPassphrase>
    </fileconnector.unzip>
    ```
    
    **Sample request**
    
    ```json
    {
        "source":"/home/vive/Desktop/file/test.zip",
        "destination":"/home/vive/Desktop/file/test"
    }
    ```


??? note "ftpOverProxy"
    The ftpOverProxy operation connects to a FTP server through a proxy.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>proxyHost</td>
            <td>The host name of the proxy.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>proxyPort</td>
            <td>The port number of the proxy.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>proxyUsername</td>
            <td>The user name of the proxy.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>proxyPassword</td>
            <td>The password of the proxy.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>ftpUsername</td>
            <td>The username of the FTP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>ftpPassword</td>
            <td>The password of the FTP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>ftpServer</td>
            <td>The FTP server name.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>ftpPort</td>
            <td>The port number of the FTP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>targetPath</td>
            <td>The target path. For example, if the file path is ftp://myusername:mypassword@somehost/pub/downloads/testProxy.txt, the targetPath will be pub/downloads/.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>targetFile</td>
            <td>The name of the file (e.g., if the path is like "ftp://myusername:mypassword@somehost/pub/downloads/testProxy.txt", then targetPath will be "testProxy.txt").</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>keepAliveTimeout</td>
            <td>The time to wait between sending control connection keep alive messages when processing file upload or download.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>controlKeepAliveReplyTimeout</td>
            <td>The time to wait for control keep-alive message replies.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>binaryTransfer</td>
            <td>Set the file type to be transferred.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>localActive</td>
            <td>Set the current data connection mode to either ACTIVE_LOCAL_DATA_CONNECTION_MODE or PASSIVE_LOCAL_DATA_CONNECTION_MODE.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.ftpOverProxy>
        <proxyHost>{${properties.proxyHost}}</proxyHost>
        <proxyPort>{${properties.proxyPort}}</proxyPort>
        <proxyUsername>{${properties.proxyUsername}}</proxyUsername>
        <proxyPassword>{${properties.proxyPassword}}</proxyPassword>
        <ftpUsername>{${properties.ftpUsername}}</ftpUsername>
        <ftpPassword>{${properties.ftpPassword}}</ftpPassword>
        <ftpServer>{${properties.ftpServer}}</ftpServer>
        <ftpPort>{${properties.ftpPort}}</ftpPort>
        <targetPath>{${properties.targetPath}}</targetPath>
        <targetFile>{${properties.targetFile}}</targetFile>
        <keepAliveTimeout>{${properties.keepAliveTimeout}}</keepAliveTimeout>
        <controlKeepAliveReplyTimeout>{${properties.controlKeepAliveReplyTimeout}}</controlKeepAliveReplyTimeout>
        <binaryTransfer>{${properties.binaryTransfer}}</binaryTransfer>
        <localActive>{${properties.localActive}}</localActive>
    </fileconnector.ftpOverProxy>
    ```

    **Sample request**
    
    ```json
    {
        "proxyHost":"SampleProxy",
        "proxyPort":"3128",
        "proxyUsername":"wso2",
        "proxyPassword":"Password",
        "ftpUsername":"primary",
        "ftpPassword":"Password",
        "ftpServer":"192.168.56.6",
        "ftpPort":"21",
        "targetFile":"/home/primary/res"
    }
    ```


??? note "send"
    The send operation sends a file to a specified location.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>address</td>
            <td>The address where the file has to be sent.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>append</td>
            <td>Set this to true if you want to append the response to the response file.</td>
            <td>Optional</td>
        </tr>
    </table>

    > **Note**: To send a VFS file, you have to specify the following properties in your configuration:
    ```
             <property name="OUT_ONLY" value="true"/>
             <property name="ClientApiNonBlocking" value="true" scope="axis2" action="remove"/>
    ```

    **Sample configuration**
    
    ```xml
    <fileconnector.send>
        <address>{${properties.address}}</address>
	    <append>{${properties.append}}</append>
    </fileconnector.send>
    ```

    **Sample request**
    
    ```json
    {
        "address":"/home/vive/Desktop/file/outTest",
        "append":"true"
    }
    ```


??? note "getSize"
    The getSize operation returns the size of a file.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <fileconnector.getSize>
        <source>{${properties.source}}</source>
    </fileconnector.getSize>
    ```

    **Sample request**
    
    ```json
    {
        "source":"/home/vive/Desktop/file/outTest/sample.txt"
    }
    ```


??? note "getLastModifiedTime"
    The getLastModifiedTime operation returns last modified time of a file/folder.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <fileconnector.getLastModifiedTime>
        <source>{${properties.source}}</source>
    </fileconnector.getLastModifiedTime>
    ```

    **Sample request**
    
    ```json
    {
        "source":"/home/vive/Desktop/file/outTest/sample.txt"
    }
    ```


??? note "splitFile"
    The splitFile operation splits a file into multiple chunks.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location to write the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>chunkSize</td>
            <td>The chunk size in bytes to split the file. This is to split the file based on chunk size. You should provide either chunkSize or numberOfLines to split the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>numberOfLines</td>
            <td>The number of lines per file. This is to split the file based on the number of lines. You should provide either chunkSize or numberOfLines to split the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>xpathExpression</td>
            <td>Defines a pattern in order to select a set of nodes in XML document.</td>
            <td>Yes</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentities</td>
            <td>Location of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentityPassphrase</td>
            <td>Passphrase of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentities</td>
            <td>Location of the target's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentityPassphrase</td>
            <td>Passphrase of the target's private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <fileconnector.splitFile>
        <source>{${properties.source}}</source>
        <destination>{${properties.destination}}</destination>
        <chunkSize>{${properties.chunkSize}}</chunkSize>
	    <numberOfLines>{${properties.numberOfLines}}</numberOfLines>
	    <xpathExpression>{${properties.xpathExpression}}</xpathExpression>
	    <sourceSftpIdentities>{${properties.sftpIdentities}}</sourceSftpIdentities>
        <sourceSftpIdentityPassphrase>{${properties.sourceSftpIdentityPassphrase}}</sourceSftpIdentityPassphrase>
        <targetSftpIdentities>{${properties.targetSftpIdentities}}</targetSftpIdentities>
        <targetSftpIdentityPassphrase>{${properties.targetSftpIdentityPassphrase}}</targetSftpIdentityPassphrase>
    </fileconnector.splitFile>
    ```
    
    **Sample request**
    
    ```json
    {
        "source":"/home/vive/Desktop/file/outTest/sample.txt",
        "destination":"/home/vive/Desktop/file/outTest/",
        "chunkSize":"4096",
        "xpathExpression":"//products/product"
    }
    ```


??? note "mergeFiles"
    The mergeFiles operation merges multiple chunks into a single file.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>destination</td>
            <td>The location to write the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePattern</td>
            <td>The pattern of the file to be read.</td>
            <td>Yes</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentities</td>
            <td>Location of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>sourceSftpIdentityPassphrase</td>
            <td>Passphrase of the source's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentities</td>
            <td>Location of the target's private key.</td>
            <td>Optional</td>
        </tr>
	    <tr>
            <td>targetSftpIdentityPassphrase</td>
            <td>Passphrase of the target's private key.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.mergeFiles>
        <source>{${properties.source}}</source>
        <destination>{${properties.destination}}</destination>
        <filePattern>{${properties.filePattern}}</filePattern>
	    <sourceSftpIdentities>{${properties.sftpIdentities}}</sourceSftpIdentities>
        <sourceSftpIdentityPassphrase>{${properties.sourceSftpIdentityPassphrase}}</sourceSftpIdentityPassphrase>
        <targetSftpIdentities>{${properties.targetSftpIdentities}}</targetSftpIdentities>
        <targetSftpIdentityPassphrase>{${properties.targetSftpIdentityPassphrase}}</targetSftpIdentityPassphrase>
    </fileconnector.mergeFiles>
    ```
    
    **Sample request**
    
    ```json
    {
        "source":"/home/vive/Desktop/file/outTest/",
        "destination":"/home/vive/Desktop/file/outTest/sample.txt",
        "filePattern":"*.txt*"
    }
    ```


??? note "readSpecifiedLines"
    The readSpecifiedLines operation reads specific lines between given line numbers from a file.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>Content type of the files processed by the connector.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>start</td>
            <td>Read from this line number.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>end</td>
            <td>Read up to this line number.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.readSpecifiedLines>
        <source>{${properties.source}}</source>
        <contentType>{${properties.contentType}}</contentType>
        <start>{${properties.start}}</start>
        <end>{${properties.end}}</end>
    </fileconnector.readSpecifiedLines>
    ```

    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file/outTest/sampleText.txt",
        "start":"5",
        "end":"25"
    }
    ```


??? note "readALine"
    The readALine operation reads a specific line from a file.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>source</td>
            <td>The location of the file.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>lineNumber</td>
            <td>Line number to read.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <fileconnector.readALine>
        <source>{${properties.source}}</source>
        <lineNumber>{${properties.lineNumber}}</lineNumber>
    </fileconnector.readALine>
    ```
    
    **Sample request**

    ```json
    {
        "source":"/home/vive/Desktop/file/outTest/sampleText.txt",
        "lineNumber":"5"
    }
    ```



### Sample configuration in a scenario

The following is a sample proxy service that illustrates how to connect to the File connector and use the create operation to create a file. You can use this sample as a template for using other operations in this category.

**Sample Proxy**
```xml
<proxy xmlns="http://ws.apache.org/ns/synapse"
       name="FileConnector_create"
       transports="https,http"
       statistics="disable"
       trace="disable"
       startOnLoad="true">
   <target>
      <inSequence>
         <property name="source" expression="${payload.source}"/>
         <property name="inputContent" expression="${payload.inputContent}"/>
         <property name="encoding" expression="${payload.encoding}"/>
         <property name="setTimeout" expression="${payload.setTimeout}"/>
         <property name="setPassiveMode" expression="${payload.setPassiveMode}"/>
         <property name="setSoTimeout" expression="${payload.setSoTimeout}"/>
         <property name="setStrictHostKeyChecking"
                   expression="${payload.setStrictHostKeyChecking}"/>
         <property name="setUserDirIsRoot" expression="${payload.setUserDirIsRoot}"/>
         <fileconnector.create>
            <source>{${properties.source}}</source>
            <inputContent>{${properties.inputContent}}</inputContent>
            <encoding>{${properties.encoding}}</encoding>
            <setTimeout>{${properties.setTimeout}}</setTimeout>
            <setPassiveMode>{${properties.setPassiveMode}}</setPassiveMode>
            <setSoTimeout>{${properties.setSoTimeout}}</setSoTimeout>
            <setUserDirIsRoot>{${properties.setUserDirIsRoot}}</setUserDirIsRoot>
            <setStrictHostKeyChecking>{${properties.setStrictHostKeyChecking}}</setStrictHostKeyChecking>
         </fileconnector.create>
         <respond/>
      </inSequence>
   </target>
   <description/>
</proxy>         
```

**Note**: For more information on how this works in an actual scenario, see [File Connector Example]({{base_path}}/reference/connectors/file-connector/3.x/file-connector-3.x-example).
