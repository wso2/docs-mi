# File Connector Reference

The following configurations allow you to work with the File Connector version 5.

## Connection configurations

The File connector can be used to deal with two types of file systems:

-   <b>Local File System</b>: A file system of the server where the WSO2 integration runtime is deployed.
-   <b>Remote File System</b>: A file system outside the server where the WSO2 integration runtime is deployed. There are few industry standard protocols established to expose a file system over TCP. Following protocols are supported by the File connector. 

    -   FTP
    -   FTPS
    -   SFTP
    -   SMB2

<img src="{{base_path}}/assets/img/integrate/connectors/file-5.x/file-conn.png" title="types of file connections" width="700" alt="types of file connections"/>
    
There are different connection configurations that can be used for the above protocols. They contain a common set of configurations and some additional configurations specific to the protocol.

??? note "Common configs to all connection types"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                Connection Name
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                A unique name to identify the connection.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Connection Type
            </td>
            <td>
                connectionType
            </td>
            <td>
                String
            </td>
            <td>
                The protocol used for communicating with the file system.</br> 
                <b>Possible values</b>: 
                <ul>
                    <li>
                        <b>Local</b>: Provides access to the files on the local physical file system.
                    </li>
                    <li>
                        <b>FTP</b>: Provides access to the files on an FTP server.
                    </li>
                    <li>
                        <b>FTPS</b>: Provides access to the files on an FTP server over SSL.
                    </li>
                    <li>
                        <b>SFTP</b>: Provides access to the files on an SFTP server (that is, an SSH or SCP server).
                    </li>
                    <li>
                        <b>SMB2</b>: Provides access to the files on a Samba server.
                    </li>
                </ul>
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Working Directory
            </td>
            <td>
                workingDir
            </td>
            <td>
                String
            </td>
            <td>
                This is the working directory. The file paths in operations, which are associated with the connection, should be provided relative to this folder. </br>
                <b>Note</b>: As per <a href="https://commons.apache.org/proper/commons-vfs/filesystems.html#Local_Files">VFS documentation</a>, for windows, the working directory of local connections should be as follows: <code>/C:/Documents</code>.
            <td>
                Defaults to file system root.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                File Locking Behaviour
            </td>
            <td>
                fileLockScheme
            </td>
            <td>
                String
            </td>
            <td>
                Specify whether to acquire node-specific lock (Local) or cluster-wide lock (Cluster) when locks are acquired in read and write operations.</br>
                <ul>
                    <li>
                        <b>Local</b></br>
                        When a lock is acquired, it is acquired within the context of file operations performed by that server node only. Local lock acquired by some file operation on a particular server node is not visible to the other server nodes that may access the same file system.
                    </li>
                    <li>
                    <b>Cluster</b></br> 
                    When multiple server nodes access the same file system performing read and write operations, you may use this behaviour. Here, when a file lock is acquired, it is visible to all file connector operations across the nodes. This is acquired by creating a <code>.lock</code> file in the same file system (for the file that is being accessed). The behaviour depends on the OS and the file system. Therefore, this feature may not work as intended in high-concurrent scenarios.
                    </li>
                </ul>
                <b>Note</b>:</br>
                File locking is available for read and write operations. When enabled, a file specific lock is acquired before the operation and released after the operation. Parallel read/write operations are restricted when locking is enabled by a file operation.
            <td>
                Local
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>

??? note "Common remote connection configs"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                Host
            </td>
            <td>
                host
            </td>
            <td>
                String
            </td>
            <td>
                Host name of the file server.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Port
            </td>
            <td>
                port
            </td>
            <td>
                Number
            </td>
            <td>
                The port number of the file server
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Username
            </td>
            <td>
                username
            </td>
            <td>
                String
            </td>
            <td>
                The username used to connect with the file server. If the username contains special characters, you will need to use the URL encoded value.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Password
            </td>
            <td>
                password
            </td>
            <td>
                String
            </td>
            <td>
                The password to connect with the file server. If the password contains special characters, you will need to use the URL encoded value.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                User Directory Is Root
            </td>
            <td>
                userDirIsRoot
            </td>
            <td>
                Boolean
            </td>
            <td>
                If set to false (default), VFS will choose the file system's root as the VFS's root. If you want to have the user's home as the VFS root, then set this to 'true'.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
    </table>


??? note "FTP/FTPS"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                Is Passive
            </td>
            <td>
                isPassive
            </td>
            <td>
                Boolean
            </td>
            <td>
                If passive mode is enabled, set this to 'true'.</br></br>
                <b>Note</b> the following about 'Active/Passive' mode:
                <ol>
                    <li>
                        <b>Active Mode</b>: The client starts listening on a random port for incoming data connections from the server (the client sends the FTP command PORT to inform the server on which port it is listening). Nowadays, the client is typically behind a firewall (e.g. built-in Windows firewall) or NAT router (e.g. ADSL modem), unable to accept incoming TCP connections. The passive mode was introduced and is heavily used for this reason. 
                    </li>
                    <li>
                        <b>Passive Mode</b>: In the passive mode, the client uses the control connection to send a PASV command to the server and then receives a server IP address and server port number from the server, which the client then uses to open a data connection to the server IP address and server port number received.
                    </li>
                </ol>
            </td>
            <td>
                true
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                FTP Connection Timeout
            </td>
            <td>
                ftpConnectionTimeout
            </td>
            <td>
                Number
            </td>
            <td>
                Specify the timeout in milliseconds for the initial control connection.
            </td>
            <td>
                100000
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                FTP Socket Timeout
            </td>
            <td>
                ftpSocketTimeout
            </td>
            <td>
                Number
            </td>
            <td>
                Specify the socket timeout in milliseconds for the FTP client.
            </td>
            <td>
                150000
            </td>
            <td>
                No
            </td>
        </tr>
    </table>


??? note "FTPS"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                KeyStore Path
            </td>
            <td>
                keyStorePath
            </td>
            <td>
                String
            </td>
            <td>
                The keystore path.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                KeyStore Password
            </td>
            <td>
                keyStorePassword
            </td>
            <td>
                String
            </td>
            <td>
                The password to the keystore.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                TrustStore Path
            </td>
            <td>
                trustStorePath
            </td>
            <td>
                String
            </td>
            <td>
                The truststore path.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                TrustStore Password
            </td>
            <td>
                trustStorePassword
            </td>
            <td>
                String
            </td>
            <td>
                The password to the truststore.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Implicit Mode Enabled
            </td>
            <td>
                implicitModeEnabled
            </td>
            <td>
                Boolean
            </td>
            <td>
                Set this to 'true' if <a href="https://en.wikipedia.org/wiki/FTPS#Implicit">implicit mode </a>is enabled.
                <ul>
                    <li>
                        <b>Implicit</b>: The TLS ClientHello message should be initiated by client.
                    </li>
                    <li>
                        <b>Explicit</b>: The client must "explicitly request" security from an FTPS server.
                    </li>
                </ul>
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Channel Protection Level
            </td>
            <td>
                channelProtectionLevel
            </td>
            <td>
                String
            </td>
            <td>
                The FTP Data Channel protection level. Possible values: C,S,E,P.</br> 
                <b>Example</b>: Sends a “PROT P” command when implicit SSL is enabled.
            </td>
        </tr>
    </table>


??? note "SFTP"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                SFTP Connection Timeout
            </td>
            <td>
                sftpConnectionTimeout
            </td>
            <td>
                Number
            </td>
            <td>
                The <b>Jsch</b> connection timeout in milli seconds.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                SFTP Session Timeout
            </td>
            <td>
                sftpSessionTimeout
            </td>
            <td>
                Number
            </td>
            <td>
                The <b>Jsch</b> session timeout in milli seconds.
            </td>
            <td>
                100000
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
                Strict Host Key Check
            </td>
            <td>
                strictHostKeyChecking
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether the Host key should be checked. If set to 'true', the connector (JSch) will always verify the public key (fingerprint) of the SSH/SFTP server.
            </td>
            <td>
                false
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
                Private Key File
            </td>
            <td>
                privateKeyFilePath
            </td>
            <td>
                String
            </td>
            <td>
                Path to the private key file.</br></br>
                <b>Note</b>: You can only use a key generated in a classic manner (<i>ssh-keygen -m PEM</i>).
            </td>
            <td>
                false
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
                Private Key Passphrase
            </td>
            <td>
                privateKeyPassword
            </td>
            <td>
                String
            </td>
            <td>
                The passphrase of the private key. The security of a key (even if encrypted) is retained because it is not available to anyone else. You can specify the passphrase when generating keys.
            </td>
            <td>
                false
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
                File System Permission Check
            </td>
            <td>
                setAvoidPermission
            </td>
            <td>
                Boolean
            </td>
            <td>
                Set to true if you want to skip the file permission check.</br>
                Available in file-connector <b>v4.0.9</b> and above.
            </td>
            <td>
                false
            </td>
            <td>
            No
            </td>
        </tr>
    </table>

    !!!info
        The following SFTP connection parameters are available in File Connector version 4.0.21 and later.

    !!!note
        The WSO2 File Connector uses connection pooling for enhanced performance. It uses the Apache Commons Pool as the base framework for connection pooling. For detailed information on the pooling mechanism, refer to the [Apache Commons Pool documentation](https://javadoc.io/doc/commons-pool/commons-pool/1.5.6/org/apache/commons/pool/impl/GenericObjectPool.html). The following parameters can be used to fine-tune the connection pool according to your requirements.
        
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
            Connection Pool Aged Timeout
            </td>
            <td>
            sftpPoolConnectionAgedTimeout
            </td>
            <td>
            Integer
            </td>
            <td>
            Interval to close connections in the connection pool in seconds.
            </td>
            <td>
            Never
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Max Active Connections
            </td>
            <td>
            maxActiveConnections
            </td>
            <td>
            Integer
            </td>
            <td>
            The maximum number of connections (including both idle and active/borrowed) that can exist within the pool at a given time.
            </td>
            <td>
            8
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Max Idle Connections
            </td>
            <td>
            maxIdleConnections
            </td>
            <td>
            Integer
            </td>
            <td>
            The maximum number of connections that can remain idle in the pool at any time, awaiting to be borrowed. Excess idle objects may be removed.
            </td>
            <td>
            8
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Max Wait Time
            </td>
            <td>
            maxWaitTime
            </td>
            <td>
            Integer
            </td>
            <td>
            This parameter determines how long the connector is willing to wait in the queue for a connection to become available. If the wait time exceeds the configured maximum wait time, the pool may throw an exception when it is exhausted and no connections are available.
            </td>
            <td>
            indefinite (wait forever)
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Eviction Check Interval
            </td>
            <td>
            evictionCheckInterval
            </td>
            <td>
            Integer
            </td>
            <td>
            This parameter specifies how frequently the evictor thread scans the pool for idle connections eligible for eviction. By configuring this interval, developers can control the frequency of resource checks, optimizing performance without unnecessary overhead.
            </td>
            <td>
            Eviction doesn't run if this isn't defined.    
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Min Eviction Time
            </td>
            <td>
            minEvictionTime
            </td>
            <td>
            Integer
            </td>
            <td>
            Connections in the pool must remain idle for at least this specified duration before the evictor considers them for removal. This ensures that only connections inactive beyond a defined threshold are evicted, preventing premature eviction of frequently used resources.
            </td>
            <td>
            Eviction doesn't run if this and <code>evictionCheckInterval</code> aren't defined.
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Exhausted Action
            </td>
            <td>
            exhaustedAction
            </td>
            <td>
            String
            </td>
            <td>
            Determines the action to take when the <code>borrowObject()</code> method is called, but the pool is exhausted.
            </td>
            <td>
            <code>WHEN_EXHAUSTED_BLOCK</code>
            </td>
            <td>
            No
            </td>
        </tr>
    </table>

??? note "SMB"

    !!!info
        The following SMB connection parameters are available in File Connector version 4.0.26 and later.

    !!!note
        - The WSO2 File Connector uses connection pooling for enhanced performance. It uses the Apache Commons Pool as the base framework for connection pooling. For detailed information on the pooling mechanism, refer to the [Apache Commons Pool documentation](https://javadoc.io/doc/commons-pool/commons-pool/1.5.6/org/apache/commons/pool/impl/GenericObjectPool.html). The following parameters can be used to fine-tune the connection pool according to your requirements.
        - SMB2 servers will close idle connections forcefully based on their configurations. In such cases, the WSO2 Integrator: MI may throw connection errors. To avoid these errors, you can fine-tune the connection eviction configurations to remove idle connections from the pool.
        
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
            Connection Pool Aged Timeout
            </td>
            <td>
            sftpPoolConnectionAgedTimeout
            </td>
            <td>
            Integer
            </td>
            <td>
            Interval to close connections in the connection pool in seconds.
            </td>
            <td>
            Never
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Max Active Connections
            </td>
            <td>
            maxActiveConnections
            </td>
            <td>
            Integer
            </td>
            <td>
            The maximum number of connections (including both idle and active/borrowed) that can exist within the pool at a given time.
            </td>
            <td>
            8
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Max Idle Connections
            </td>
            <td>
            maxIdleConnections
            </td>
            <td>
            Integer
            </td>
            <td>
            The maximum number of connections that can remain idle in the pool at any time, awaiting to be borrowed. Excess idle objects may be removed.
            </td>
            <td>
            8
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Max Wait Time
            </td>
            <td>
            maxWaitTime
            </td>
            <td>
            Integer
            </td>
            <td>
            This parameter determines how long the connector is willing to wait in the queue for a connection to become available. If the wait time exceeds the configured maximum wait time, the pool may throw an exception when it is exhausted and no connections are available.
            </td>
            <td>
            indefinite (wait forever)
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Eviction Check Interval
            </td>
            <td>
            evictionCheckInterval
            </td>
            <td>
            Integer
            </td>
            <td>
            This parameter specifies how frequently the evictor thread scans the pool for idle connections eligible for eviction. By configuring this interval, developers can control the frequency of resource checks, optimizing performance without unnecessary overhead.
            </td>
            <td>
            Eviction doesn't run if this isn't defined.    
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Min Eviction Time
            </td>
            <td>
            minEvictionTime
            </td>
            <td>
            Integer
            </td>
            <td>
            Connections in the pool must remain idle for at least this specified duration before the evictor considers them for removal. This ensures that only connections inactive beyond a defined threshold are evicted, preventing premature eviction of frequently used resources.
            </td>
            <td>
            Eviction doesn't run if this and <code>evictionCheckInterval</code> aren't defined.
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Exhausted Action
            </td>
            <td>
            exhaustedAction
            </td>
            <td>
            String
            </td>
            <td>
            Determines the action to take when the <code>borrowObject()</code> method is called, but the pool is exhausted.
            </td>
            <td>
            <code>WHEN_EXHAUSTED_BLOCK</code>
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Enable Encryption
            </td>
            <td>
            enableEncryption
            </td>
            <td>
            Boolean
            </td>
            <td>
            Determines whether to enable data encryption. This must be enabled when connecting to an SMB server that enforces encryption.</br> 
            Available in file-connector version <b>v4.0.34</b> and above.
            </td>
            <td>
            false
            </td>
            <td>
            No
            </td>
        </tr>
        <tr>
            <td>
            Encode Password
            </td>
            <td>
            encodePassword
            </td>
            <td>
            Boolean
            </td>
            <td>
            Determines whether special characters in the password should be URL-encoded.           
            Available in file-connector version <b>v4.0.30</b> and above.
            </td>
            <td>
            false
            </td>
            <td>
            No
            </td>
        </tr>

    </table>

    !!! Note
        The File connector internally uses the [Apache VFS Library](https://commons.apache.org/proper/commons-vfs/). According to the selected connection type, the following VFS connection URLs will be generated.
        
        === "Local File"
            ```bash
            [file://] absolute-path
            file:///home/someuser/somedir
            file:///C:/Documents and Settings
            ```
        === "FTP"         
            ```bash 
            ftp://[ username[: password]@] hostname[: port][ relative-path]
            ftp://myusername:mypassword@somehost/pub/downloads/somefile.tgz
            ```
        === "FTPS"         
            ```bash 
            ftps://[ username[: password]@] hostname[: port][ absolute-path]
            ftps://myusername:mypassword@somehost/pub/downloads/somefile.tgz
            ``` 
        === "SFTP"         
            ```bash 
            sftp://[ username[: password]@] hostname[: port][ relative-path]
            sftp://myusername:mypassword@somehost/pub/downloads/somefile.tgz
            ```
        === "SMB2"         
            ```bash 
            smb2://[ username[: password]@] hostname[: port][ relative-path]
            smb2://myusername:mypassword@somehost:445/SMBTesting
            ```    


!!! Tip
    There are instances where errors occur when using .csv files and the output is encoded. To overcome this, add the following configuration to the `<PRODUCT_HOME>/repository/conf/deployment.toml` file.

    ```toml

    [[custom_message_formatters]]
    content_type = "text/csv"
    class = "org.apache.axis2.format.PlainTextFormatter"

    [[custom_message_builders]]
    content_type = "text/csv"
    class = "org.apache.axis2.format.PlainTextBuilder"

    ```

    Also, you need to modify your proxy service as indicated below.

    ```xml

    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="proxyDeployingSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property name="slotNumber" value="1"/>
        <property expression="get-property(&quot;SYSTEM_DATE&quot;, &quot;mm&quot;)" name="currentMin" scope="default" type="STRING"/>
        <file.read configKey="slotFileConnection">
            <path>/csv/slot.csv</path>
            <readMode>Specific Line</readMode>
            <startLineNum>0</startLineNum>
            <endLineNum>0</endLineNum>
            <lineNum>{${properties.currentMin}}</lineNum>
            <contentType>text/csv</contentType>
            <enableStreaming>false</enableStreaming>
            <enableLock>false</enableLock>
        </file.read>
        <log level="custom">
            <property name="slott" expression="${properties.slotNumber}"/>
        </log>
    </sequence>

    ```

## Operations

The following operations allow you to work with the File Connector. Click an operation name to see parameter details and samples on how to use it.

??? note "createDirectory"
    Creates a new folder in a provided directory path.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Directory Path
            </td>
            <td>
                directoryPath
            </td>
            <td>
                String
            </td>
            <td>
                The new directory path.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <file.createDirectory configKey="CONNECTION_NAME">
        <directoryPath>{${properties.directoryPath}}</directoryPath>
        <responseVariable>file_createDirectory_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.createDirectory>
    ```

    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "directoryPath":"/home/vive/Desktop/file",
        }
    ```

    **Response**

    ```json
    {
        "success": true
    }
    ```

??? note "checkExist"
    Check if a given file or folder exists.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                File/Folder Path
            </td>
            <td>
                path
            </td>
            <td>
                String
            </td>
            <td>
                The new directory path that should be scanned.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <file.checkExist configKey="CONNECTION_NAME">
        <path>{${properties.path}}</path>
        <responseVariable>file_checkExist_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.checkExist>
    ```

    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "path":"/home/vive/Desktop/file/append.txt",
        }
    ```

    **Response**

    ```
    {
        "success": true
    }
    ```

??? note "compress"
    Archives a file or a directory.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Folder/File To Compress
            </td>
            <td>
                sourceDirectoryPath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the folder that should be compressed.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Targer File Path
            </td>
            <td>
                targetFilePath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the compressed file that will be created. If the file already exists, it is overwritten.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Include Sub Directories
            </td>
            <td>
                includeSubDirectories
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether the sub folders in the original folder should be included in the compressed file.
            </td>
            <td>
                true
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.compress configKey="CONNECTION_NAME">
        <sourceDirectoryPath>{${properties.sourceDirectoryPath}}</sourceDirectoryPath>
        <targetFilePath>{${properties.targetFilePath}}</targetFilePath>
        <includeSubDirectories>{${properties.includeSubDirectories}}</includeSubDirectories>
        <responseVariable>file_compress_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.compress>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "sourceDirectoryPath":"/home/vive/Desktop/file",
            "targetFilePath":"/home/user/test/file.zip"
        }
    ```

    **Response**

    ```json
    {
        "success": true,
        "NumberOfFilesAdded": 16
    }
    ```

    **Error**

    ```json
    {
        "success": false,
        "code": 700102,
        "detail": "File or directory to compress does not exist"
    }

??? note "copy"
    Copies the file or folder specified by a source path to a target path. The source can be a file or a folder. If it is a folder, the copying is recursive. 

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Source Path
            </td>
            <td>
                sourcePath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the file that should be copied. 
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Targer Path
            </td>
            <td>
                targetPath
            </td>
            <td>
                String
            </td>
            <td>
                 The location (folder) to which the file should be copied. </br>
                 If the target folder does not exist at the time of copy, a new folder is created.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Source File Pattern
            </td>
            <td>
                sourceFilePattern
            </td>
            <td>
                String
            </td>
            <td>
                The file name pattern of the source file. Example: <i>[a-zA-Z][a-zA-Z]*.(txt|xml|jar)</i>
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Copy Including Source Parent
            </td>
            <td>
                includeParent
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specify whether the parent folder should be copied from the file source along with the content. By default, only the content inside the folder will get copied.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Existing Files
            </td>
            <td>
                overwrite
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether or not to overwrite the file if the same file already exists in the target destination.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Rename To
            </td>
            <td>
                renameTo
            </td>
            <td>
                String
            </td>
            <td>
                The new name of the copied file.
            </td>
            <td>
                Original file name.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Max Retries	
            </td>
            <td>
                maxRetries
            </td>
            <td>
                Integer
            </td>
            <td>
                The maximum number of retries to be done in case of a failure.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Retry Interval	
            </td>
            <td>
                retryDelay
            </td>
            <td>
                Integer
            </td>
            <td>
                The time interval between retries in milliseconds.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.copy configKey="CONNECTION_NAME">
        <sourcePath>{${properties.sourcePath}}</sourcePath>
        <targetPath>{${properties.targetPath}}</targetPath>
        <sourceFilePattern>{${properties.sourceFilePattern}}</sourceFilePattern>
        <includeParent>{${properties.includeParent}}</includeParent>
        <overwrite>{${properties.overwrite}}</overwrite>
        <renameTo>{${properties.renameTo}}</renameTo>
        <maxRetries>{${properties.maxRetries}}</maxRetries>
        <retryDelay>{${properties.retryDelay}}</retryDelay>
        <responseVariable>file_copy_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.copy>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "sourcePath":"/home/vive/Desktop/file/append.txt",
            "targetPath":"/home/user/test/file"
        }
    ```

    **Response**

    ```json
    { 
        "success": true
    }
    ```

    **Error**

    ```json
    {
        "success": false,
        "code": 700103,
        "detail": "Destination file already exists and overwrite not allowed"
    }
    ```

??? note "move"
    Moves the file or folder specified by the source path to the target directory. The source can be a file or a folder. If it is a folder, the moving is recursive.
    
    The move operation can only move a file/folder within the same server. For example, you can move a file/folder from one local location to another local location, or from one remote location to another remote location on the same server. You cannot use the move operation to move a file/folder between different servers.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Source Path
            </td>
            <td>
                sourcePath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the file that should be copied.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Targer Path
            </td>
            <td>
                targetPath
            </td>
            <td>
                String
            </td>
            <td>
                 The location to which the file should be copied.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Create Parent Directories
            </td>
            <td>
                createParentDirectories
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether the parent directory should be created if it doesn't already exist in the target folder.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Include Parent
            </td>
            <td>
                includeParent
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specify whether the parent folder should be copied from the file source along with the content.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Existing Files
            </td>
            <td>
                overwrite
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether or not to overwrite the file if the same file already exists in the target destination.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Rename To
            </td>
            <td>
                renameTo
            </td>
            <td>
                String
            </td>
            <td>
                The new name of the moved files.
            </td>
            <td>
                Original file name.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                File Pattern
            </td>
            <td>
                filePattern
            </td>
            <td>
                String
            </td>
            <td>
                The pattern (regex) of the files to be moved. </br>
                <b>Example</b>: <code>[a-zA-Z][a-zA-Z]*.(txt|xml|jar)</code>.</br>
                Available in file-connector <b>v4.0.5</b> and above
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
                <tr>
            <td>
               Is Source Mounted
            </td>
            <td>
                isSourceMounted
            </td>
            <td>
                Boolean
            </td>
            <td>
                Whether the source path is a mounted path or not.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Is Target Mounted
            </td>
            <td>
                isTargetMounted
            </td>
            <td>
                Boolean
            </td>
            <td>
                Whether the target path is a mounted path or not.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.move configKey="CONNECTION_NAME">
        <sourcePath>{${properties.sourcePath}}</sourcePath>
        <targetPath>{${properties.targetPath}}</targetPath>
        <createParentDirectories>{${properties.createParentDirectories}}</createParentDirectories>
        <includeParent>{${properties.includeParent}}</includeParent>
        <overwrite>{${properties.overwrite}}</overwrite>
        <renameTo>{${properties.renameTo}}</renameTo>
        <filePattern>{${properties.filePattern}}</filePattern>
        <isSourceMounted>{${properties.isSourceMounted}}</isSourceMounted>
        <isTargetMounted>{${properties.isTargetMounted}}</isTargetMounted>
        <responseVariable>file_move_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.move>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "sourcePath":"/home/vive/Desktop/file/append.txt",
            "targetPath":"/home/user/test/file"
        }
    ```

    **Response**

    ```json
    {
        "success": true
    }
    ```

    **Error**

    ```json
    {
        "success": false,
        "code": 700103,
        "detail": "Destination file already exists and overwrite not allowed"
    }
    ```

??? note "read"
    Reads the content and metadata of a file at a given path. Metadata of the file is added as atrributes to the output variable while content is set as payload (or optionally overwrite the message body). 

    Known message properties representing file properties:

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                FILE_LAST_MODIFIED_TIME
            </td>
            <td>
                DateTime
            </td>
            <td>
                The time at which the file was last modified.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               FILE_SIZE
            </td>
            <td>
                Number
            </td>
            <td>
                 The file size (in bytes).
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                FILE_IS_DIR
            </td>
            <td>
                Boolean
            </td>
            <td>
                 Specifies whether a folder directory is represented as the file.
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                FILE_PATH
            </td>
            <td>
                String
            </td>
            <td>
                The file path.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                FILE_URL
            </td>
            <td>
                String
            </td>
            <td>
                The VFS URL of the file.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                FILE_NAME
            </td>
            <td>
                String
            </td>
            <td>
                The file name or folder name.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                FILE_NAME_WITHOUT_EXTENSION
            </td>
            <td>
                String
            </td>
            <td>
                The file name without the extension.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>

    Important:

    -   When reading a folder, the first file that matches the pattern will be read first. Note that sub directories are not scanned. If you need to move or delete the file before reading the folder again, use the `FILE_NAME` context variable.
    -   The MIME type (content-type) of the message is determined by the file extension (i.e an XML file will be read as a message with the `application/xml` MIME type). However, users can force the MIME type by the `ContentType` parameter. Similarly, the `Encoding` parameter can be used to force the encoding.  
    -   You can set `EnableLock` to `true` to enable file system lock until the reading is completed and the stream is closed. 
    -   When large files are read, use `streaming=true`. Note that you need to first make necessary changes in the `deployment.toml`. The `ContentType` parameter also needs to be `application/binary`. Note that file reading modes are not applicable when streaming is set to `true`. The complete file is always streamed.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               File Path
            </td>
            <td>
                path
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the file that should be read.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                File Pattern
            </td>
            <td>
                filePattern
            </td>
            <td>
                String Regex
            </td>
            <td>
                 The file name pattern that should be matched when reading the file.
            </td>
            <td>
                All text files (<code>.*\.txt</code>)
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Read Mode
            </td>
            <td>
                readMode
            </td>
            <td>
                String
            </td>
            <td>
                Available file reading modes: <code>Complete File</code>, <code>Between Lines</code>, <code>Starting From Line</code>, <code>Up To Line</code>, and <code>Specific Line</code>.
            </td>
            <td>
                Complete File.
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Start Line Num
            </td>
            <td>
                startLineNum
            </td>
            <td>
                Number
            </td>
            <td>
                Starts reading the file from the specified line.
            </td>
            <td>
                1
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                End Line Num
            </td>
            <td>
                endLineNum
            </td>
            <td>
                Number
            </td>
            <td>
                Reads the file upto the specified line.
            </td>
            <td>
                Last line of file.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Specific Line number
            </td>
            <td>
                lineNum
            </td> 
            <td>
                Number
            </td>
            <td>
                Specific line to read.
            </td>
            <td>
                When the reading mode is <code>Specific Line</code>.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                MIMEType
            </td>
            <td>
                contentType
            </td>
            <td>
                String
            </td>
            <td>
                Content type of the message set to the payload by this operation
            </td>
            <td>
                Determined by the file extension.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Encoding
            </td>
            <td>
                encoding
            </td> 
            <td>
                String
            </td>
            <td>
                Encoding of the message set to the payload by this operation.
            </td>
            <td>
                UTF-8
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Enable Streaming
            </td>
            <td>
                enableStreaming
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether or not streaming is used to read the file without any interpretation of the content.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Enable Locking
            </td>
            <td>
                enableLock
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether or not to lock the file.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Max Retries	
            </td>
            <td>
                maxRetries
            </td>
            <td>
                Integer
            </td>
            <td>
                The maximum number of retries to be done in case of a failure.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Retry Interval	
            </td>
            <td>
                retryDelay
            </td>
            <td>
                Integer
            </td>
            <td>
                The time interval between retries in milliseconds.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.read configKey="CONNECTION_NAME">
        <path>{${properties.path}}</path>
        <filePattern>{${properties.filePattern}}</filePattern>
        <includeResultTo>{${properties.includeResultTo}}</includeResultTo>
        <resultPropertyName>{${properties.resultPropertyName}}</resultPropertyName>
        <readMode>{${properties.readMode}}</readMode>
        <startLineNum>{${properties.startLineNum}}</startLineNum>
        <endLineNum>{${properties.endLineNum}}</endLineNum>
        <lineNum>{${properties.lineNum}}</lineNum>
        <contentType>{${properties.contentType}}</contentType>
        <encoding>{${properties.encoding}}</encoding>
        <enableStreaming>{${properties.enableStreaming}}</enableStreaming>
        <enableLock>{${properties.enableLock}}</enableLock>
        <maxRetries>{${properties.maxRetries}}</maxRetries>
        <retryDelay>{${properties.retryDelay}}</retryDelay>
        <responseVariable>file_read_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.read>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "path":"/home/vive/Desktop/file/read.txt",
            "readMode":"Complete File"
        }
    ```

    **Response**

    ```xml
    This is line one.
    This is line two.
    This is line three.
    This is line four.
    This is line five.
    This is line six.
    This is line seven.
    This is line eight.
    This lis line nine.
    This is line ten.
    ```

    **Full Log**

    ```bash
    [2020-10-06 06:01:44,083]  INFO {LogMediator} - {api:TestAPI} To: /filetest, MessageID: urn:uuid:7ab557c0-f9cb-4cf6-9c7b-f06a4640522a, Direction: request, message = After Read, FILE_LAST_MODIFIED_TIME = 10/06/2020 05:46:39, FILE_SIZE = 30, FILE_IS_DIR = false, FILE_NAME = test1.txt, FILE_PATH = /wso2/test, FILE_URL = file:///Users/hasitha/temp/file-connector-test/wso2/test/test1.txt, FILE_NAME_WITHOUT_EXTENSION = test1, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><text xmlns="http://ws.apache.org/commons/ns/payload">This is test1.txt file content</text></soapenv:Body></soapenv:Envelope>
    ```

    **Error**

    ```json
    {
        "success": false,
        "code": 700102,
        "detail": "File or folder not found: file:///Users/hasitha/temp/file-connector-test/wso2/test/abcd.txt"
    }
    ```

??? note "rename"
    Rename a file in a specified path. The new name cannot contain path separators. 

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Path
            </td>
            <td>
               path
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the file that should be renamed.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Rename To
            </td>
            <td>
               renameTo
            </td>
            <td>
                String
            </td>
            <td>
                The file's new name.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Existing Files
            </td>
            <td>
               overwrite
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether or not to overwrite the file in the target directory (if the same file exists).
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.rename configKey="CONNECTION_NAME">
        <path>{${properties.path}}</path>
        <renameTo>{${properties.renameTo}}</renameTo>
        <overwrite>{${properties.overwrite}}</overwrite>
        <responseVariable>file_rename_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.rename>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "path":"/home/vive/Desktop/file/read.txt",
            "renameTo":"test"
        }
    ```

    **Response**

    ```json
    {
        "success": true
    }
    ```

    **Error**

    ```json
    {
        "success": false,
        "code": 700103,
        "detail": "Destination file already exists and overwrite not allowed"
    }
    ```

??? note "delete"
    Deletes the files matching in a given directory.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               File/Directory Path
            </td>
            <td>
               path
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the file/folder that should be deleted.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Pattern to Match Files
            </td>
            <td>
               matchingPattern
            </td>
            <td>
                String
            </td>
            <td>
                 The pattern that should be matched when listing files. This does not operate recursively on sub folders.
            </td>
            <td>
                All files.
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Max Retries	
            </td>
            <td>
                maxRetries
            </td>
            <td>
                Integer
            </td>
            <td>
                The maximum number of retries to be done in case of a failure.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Retry Interval	
            </td>
            <td>
                retryDelay
            </td>
            <td>
                Integer
            </td>
            <td>
                The time interval between retries in milliseconds.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.delete configKey="CONNECTION_NAME">
        <path>{${properties.path}}</path>
        <matchingPattern>{${properties.matchingPattern}}</matchingPattern>
        <maxRetries>{${properties.maxRetries}}</maxRetries>
        <retryDelay>{${properties.retryDelay}}</retryDelay>
        <responseVariable>file_delete_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.delete>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "path":"/home/vive/Desktop/file/read.txt"
        }
    ```

    **Response** 

    For a single file:

    ```json
    {
        "success": true
    }
    ```

    For a folder:

    ```json
    {
        "success": true,
        "numOfDeletedFiles": 5
    }
    ```

??? note "unzip"
    Unzip a specified file to a given location. If a folder with the same name exists, it is overwritten. 

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Zip File Path
            </td>
            <td>
                sourceFilePath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the ZIP file that should be unzipped.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Target Directory
            </td>
            <td>
                targetDirectory
            </td>
            <td>
                String
            </td>
            <td>
                 The location (folder) to which the ZIP file should be unzipped.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                File Name Encoding
            </td>
            <td>
                fileNameEncoding
            </td>
            <td>
                String
            </td>
            <td>
                 The character encoding to interpret the file names inside the ZIP archive.
            </td>
            <td>
                UTF-8
            </td>
            <td>
                No
            </td>
        </tr>
    </table>

    > NOTE: The latest File connector (v4.0.7 onwards) supports decompressing the .gz files.
    
     **Sample configuration**
    ```xml
    <file.unzip configKey="CONNECTION_NAME">
        <sourceFilePath>{${properties.sourceFilePath}}</sourceFilePath>
        <targetDirectory>{${properties.targetDirectory}}</targetDirectory>
        <responseVariable>file_unzip_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.unzip>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "sourceFilePath":"/home/vive/Desktop/file/test.zip",
            "targetDirectory":"/home/user/test/file"
        }
    ```

    **Response** 

    ```json
    {
        "success": true
    }
    ```

    **On Error** 

    ```json
    {
        "success": false,
        "code": 700102,
        "detail": "File not found: file:///Users/hasitha/temp/file-connector-test/wso2/archievenew.zip"
    }
    ```

??? note "splitFile"
    Splits a file into multiple smaller files.

    -   If the folder does not exist, it will be created.
    -   If the folder has files, they will be overwritten. 

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Path to the file to split
            </td>
            <td>
                sourceFilePath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the file that should be split.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Target Directory
            </td>
            <td>
                targetDirectory
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the target folder where the new files should be created.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Split Mode
            </td>
            <td>
                splitMode
            </td>
            <td>
                String
            </td>
            <td>
                 The split mode to use. The available options are as follows:</br>
                 <ul>
                    <li>ChunkSize</li>
                    <li>Linecount</li>
                    <li>XPATH Expression</li>
                 </ul>
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Chunk Size
            </td>
            <td>
                chunkSize
            </td>
            <td>
                Number
            </td>
            <td>
                 If the <b>Split Mode</b> is 'Chunk Size', specify the chunk size (in bytes) into which the file should be split.
            </td>
            <td>
                -
            </td>
            <td>
                -
            </td>
        </tr>
        <tr>
            <td>
                Line Count
            </td>
            <td>
                lineCount
            </td>
            <td>
                Number
            </td>
            <td>
                 If the <b>Split Mode</b> is 'Line Count', specify the number of lines by which the original file should be split.
            </td>
            <td>
                -
            </td>
            <td>
                -
            </td>
        </tr>
        <tr>
            <td>
                XPATH Expression
            </td>
            <td>
                xpathExpression
            </td>
            <td>
                Number
            </td>
            <td>
                 If the <b>Split Mode</b> is 'XPATH Expression', specify the expression by which the file should be split. Only applies when splitting XML files.
            </td>
            <td>
                Chunk Size
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
     **Sample configuration**
    ```xml
    <file.splitFile configKey="CONNECTION_NAME">
        <sourceFilePath>{${properties.sourceFilePath}}</sourceFilePath>
        <targetDirectory>{${properties.targetDirectory}}</targetDirectory>
        <splitMode>{${properties.splitMode}}</splitMode>
        <xpathExpression>{${properties.xpathExpression}}</xpathExpression>
        <responseVariable>file_splitFile_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </file.splitFile>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "sourceFilePath":"/home/vive/Desktop/file/test.txt",
            "targetDirectory":"/home/user/test/file",
            "splitMode":"Linecount",
            "lineCount":"10"
        }
    ```

    **Response** 

    ```json
    {
        "success": true,
        "numberOfSplits": 6
    }
    ```

    **On Error** 

    ```json
    {
        "success": false,
        "code": 700107,
        "detail": "Parameter 'xpathExpression' is not provided"
    }
    ```

??? note "listFiles"
    Lists all the files (that match the specified pattern) in the directory path.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Directory Path
            </td>
            <td>
                directoryPath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the directory from which files should be listed.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Matching Pattern
            </td>
            <td>
                matchingPattern
            </td>
            <td>
                String
            </td>
            <td>
                 The file pattern that should be used to select files for listing.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                List Files in Sub Directories
            </td>
            <td>
                recursive
            </td>
            <td>
                Boolean
            </td>
            <td>
                 List files from sub directories recursively.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                File Sort Attribute
            </td>
            <td>
                sortingAttribute
            </td>
            <td>
               String
            </td>
            <td>
                 Files will get sorted and listed according to one of the follow: Name, Size, LastModifiedTime.
            </td>
            <td>
                Name
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Sort Order
            </td>
            <td>
                sortingOrder
            </td>
            <td>
                String
            </td>
            <td>
                 The sorting order applicable to the <b>File Sort</b> attribute.</br>
                 <b>Possible Values</b>: Ascending, Descending.
            </td>
            <td>
                Ascending
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Response Format
            </td>
            <td>
                responseFormat
            </td> 
            <td>
                String
            </td>
            <td>
                Format to list the files in response. 
                <b>Possible Values</b>: Hierarchical, Flat.
            </td>
            <td>
                Hierarchical
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Max Retries	
            </td>
            <td>
                maxRetries
            </td>
            <td>
                Integer
            </td>
            <td>
                The maximum number of retries to be done in case of a failure.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Retry Interval	
            </td>
            <td>
                retryDelay
            </td>
            <td>
                Integer
            </td>
            <td>
                The time interval between retries in milliseconds.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.listFiles configKey="CONNECTION_NAME">
        <directoryPath>{${properties.directoryPath}}</directoryPath>
        <matchingPattern>{${properties.matchingPattern}}</matchingPattern>
        <recursive>{${properties.recursive}}</recursive>
        <sortingAttribute>{${properties.sortingAttribute}}</sortingAttribute>
        <sortingOrder>{${properties.sortingOrder}}</sortingOrder>
        <responseFormat>{${properties.responseFormat}}</responseFormat>
        <maxRetries>{${properties.maxRetries}}</maxRetries>
        <retryDelay>{${properties.retryDelay}}</retryDelay>
        <responseVariable>file_listFiles_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </file.listFiles>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "directoryPath":"/home/vive/Desktop/file"
        }
    ```

    **Response** 

    ```json
    {
       "success": true,
       "directory": {
           "name": "test",
           "file": [
               ".DS_Store",
               "abc.txt",
               "input.xml",
               "output.csv"
           ],
           "directory": [
               {
                   "name": "aa"
               },
               {
                   "name": "hasitha",
                   "file": [
                       "a1.txt",
                       "a2.txt"
                   ]
               }
           ]
       }
    }
    ```

??? note "exploreZipFile"
    Explore the contents of a ZIP file in a specific location.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Zip File Path
            </td>
            <td>
                zipFilePath
            </td>
            <td>
                String
            </td>
            <td>
                 The path to the ZIP file that should be explored.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.exploreZipFile configKey="CONNECTION_NAME">
        <zipFilePath>{${properties.directoryPath}}</zipFilePath>
        <responseVariable>file_exploreZipFile_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </file.exploreZipFile>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "zipFilePath":"/home/vive/Desktop/file/test.zip"
        }
    ```

    **Response** 

    ```json
    {
           "success": true,
           "zipFileContent": [
               "test1.txt",
               "test2.txt",
               "hasitha/a1.txt",
               "hasitha/a2.txt",
               "hasitha/b/b2.txt",
               "hasitha/b/b1.txt",
               "hasitha/b/c/test1.txt",
               "hasitha/b/c/c1.txt"
           ]
       }
    ```

    **On Error** 

    ```json
    {
       "success": false,
       "code": 700102,
       "detail": "Zip file not found at path file:///Users/hasitha/temp/file-connector-test/wso2/test/archieve.zip"
    }
    ```

??? note "mergeFiles"
    Merge the contents of multiple files in a folder to a single file.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Source Directory Path
            </td>
            <td>
                sourceDirectoryPath
            </td>
            <td>
                String
            </td>
            <td>
                The path to the source folder containing the files that should be merged.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Target File Path
            </td>
            <td>
                targetFilePath
            </td>
            <td>
                String
            </td>
            <td>
                Path to the folder that holds the merged file.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               File Pattern
            </td>
            <td>
                filePattern
            </td>
            <td>
                String
            </td>
            <td>
                The pattern that should be used for selecting the source files that should be merged.</br>
                <b>Example</b>: <code>[a-zA-Z][a-zA-Z]*.(txt|xml|jar)</code>.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
               Write Mode
            </td>
            <td>
                writeMode
            </td>
            <td>
                String
            </td>
            <td>
                If the file already exists, this parameter will determine whether the existing file should be overwritten or appended during the merge.</br>
                Possible values are Ovewrite or Append.
            </td>
            <td>
                Overwrite
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>
    
    **Sample configuration**
    ```xml
    <file.mergeFiles configKey="CONNECTION_NAME">
        <sourceDirectoryPath>{${properties.sourceDirectoryPath}}</sourceDirectoryPath>
        <targetFilePath>{${properties.targetFilePath}}</targetFilePath>
        <filePattern>{${properties.filePattern}}</filePattern>
        <writeMode>{${properties.writeMode}}</writeMode>
        <responseVariable>file_mergeFiles_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </file.mergeFiles>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "sourceDirectoryPath":"/home/vive/Desktop/file",
            "targetFilePath":"/home/user/test/file",
            "writeMode":"Overwrite",

        }
    ```

    **Response** 

    ```json
    {
        "success": true,
        "detail": {
            "numberOfMergedFiles": 5,
            "totalWrittenBytes": 992
        }
    }
    ```

    **On Error** 

    ```json
    {
        "success": false,
        "code": 700102,
        "detail": "Directory not found: file:///Users/hasitha/temp/file-connector-test/wso2/toMergesnsdfb"
    }
    ```

??? note "write"
    Writes content to a specified file.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>
                File Connection
            </td>
            <td>
                name
            </td>
            <td>
                String
            </td>
            <td>
                The name of the file connection configuration to use.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               File Path
            </td>
            <td>
               filePath
            </td>
            <td>
                String
            </td>
            <td>
                The path to the file that should be written (include file name and extension).
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Content/Expression
            </td>
            <td>
               contentOrExpression
            </td>
            <td>
                String
            </td>
            <td>
                Static content or expression to evaluate content.
            </td>
            <td>
                The content will be fetched from the body ("$Body") of the incoming message.
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               MIME Type
            </td>
            <td>
               mimeType
            </td>
            <td>
                String
            </td>
            <td>
                The MIME type that will be applied in order to format the outgoing message.</br></br> Possible values: "Automatic","text/plain", "application/xml", "application/binary", "application/json", "text/xml".</br></br>
                If you don't want to change the MIME type of the message that has been mediated before this operation, use the default "Automatic" value. If the value is set to "application/binary", a binary file will get created with base-64 decoded content.
            </td>
            <td>
                Automatic
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Write Mode
            </td>
            <td>
               writeMode
            </td>
            <td>
                String
            </td>
            <td>
                If the file already exists, this parameter will determine whether the existing file should be overwritten or appended. You can also specify if a new file should be created.</br>
                Possible values: Ovewrite, Append, Create New.
            </td>
            <td>
                Overwrite
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Append New Line
            </td>
            <td>
               appendNewLine
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether a new line should be added to the end of the file after the content is written.
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
               Encoding
            </td>
            <td>
               encoding
            </td>
            <td>
                String
            </td>
            <td>
                Applied only when some static content or evaluated content is written.</br>
                <b>Possible Values</b>: US-ASCII, UTF-8, or UTF-16.
            </td>
            <td>
                UTF-8
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
               Compress
            </td>
            <td>
               compress
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether the content should be compressed after the content is written. Only available when the <b>Write Mode</b> is ‘Create New ‘or ‘OverWrite’.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
               Enable Streaming
            </td>
            <td>
               enableStreaming
            </td>
            <td>
                Boolean
            </td>
            <td>
                Write file using the stream set to the message context.
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
               Enable Locking
            </td>
            <td>
               enableLock
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specifies whether or not to lock the file during file write.</br></br>
                <b>Note</b>: If the connector is processing a file named 'xyz.xml', a file called 'xyz.xml.lock' is created to represent the lock (with the CREATE_NEW mode). Once the file connector operation is completed, the file is deleted. When you create the lock, you can set an expiry time as well. If the connector operation fails to create the file because it already exists, that means that another process is working on it. Then connector operation will fail and the application will have to retry. Information such as the servername and PID is written to the lock file, which may be important for debugging. 
            </td>
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Update Last Modified Timestamp.
            </td>
            <td>
                updateLastModified
            </td>
            <td>
                Boolean
            </td>
            <td>
                Specify whether to update the last modified timestamp of the file. This is available from version 4.0.4.</br>
            </td>
            <td>
                true
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Max Retries	
            </td>
            <td>
                maxRetries
            </td>
            <td>
                Integer
            </td>
            <td>
                The maximum number of retries to be done in case of a failure.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Retry Interval	
            </td>
            <td>
                retryDelay
            </td>
            <td>
                Integer
            </td>
            <td>
                The time interval between retries in milliseconds.
            </td>
            <td>
                0
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Disk Share Access Mask
            </td>
            <td>
                diskShareAccessMask
            </td>
            <td>
                String
            </td>
            <td>
                <p> The <code>diskShareAccessMask</code> configuration applies when using the **SMB2** or **SMB3** protocol for file operations through the file connector. This setting defines the access permissions (ACCESS_MASK) for the disk share as a comma separated string. Refer to the [SMBJ documentation](https://www.javadoc.io/doc/com.hierynomus/smbj/0.11.3/com/hierynomus/msdtyp/AccessMask.html) for the available access masks.</p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p>Requires WSO2 Integrator: MI version 4.4.0.7 (U2) or later.</p>
                </div>
            </td>
            <td>
                MAXIMUM_ALLOWED
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Output Variable Name
            </td>
            <td>
                responseVariable
            </td>
            <td>
                String
            </td>
            <td>
                Name of the variable to which the output of the operation should be assigned
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td>
                Overwrite Message Body
            </td>
            <td>
                overwriteBody
            </td>
            <td>
                String
            </td>
            <td>
                Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).
            </td>
            <td>
                false
            </td>
            <td>
                Yes
            </td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <file.write configKey="CONNECTION_NAME">
        <filePath>{${properties.filePath}}</filePath>
        <contentOrExpression>{${properties.contentOrExpression}}</contentOrExpression>
        <mimeType>{${properties.mimeType}}</mimeType>
        <writeMode>{${properties.writeMode}}</writeMode>
        <appendNewLine>{${properties.appendNewLine}}</appendNewLine>
        <encoding>{${properties.encoding}}</encoding>
        <compress>{${properties.compress}}</compress>
        <enableStreaming>{${properties.enableStreaming}}</enableStreaming>
        <enableLock>{${properties.enableLock}}</enableLock>
        <updateLastModified>{${properties.updateLastModified}}</updateLastModified>
        <maxRetries>{${properties.maxRetries}}</maxRetries>
        <retryDelay>{${properties.retryDelay}}</retryDelay>
        <diskShareAccessMask>MAXIMUM_ALLOWED</diskShareAccessMask>
        <responseVariable>file_write_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </file.write>
    ```
    
    **Sample request**

    Following is a sample REST/JSON request that can be handled by the append operation.
    ```json
        {
            "filePath":"/home/vive/Desktop/file.test.txt"
        }
    ```

    **Response** 

    ```json
    {
        "success": true,
        "writtenBytes": 10
    }
    ```

    **Error**

    ```json
    {
        "success": false,
        "code": 700108,
        "detail": "Target file already exists. Path = file:///Users/hasitha/temp/file-connector-test/copy/kandy/hasitha.txt"
    }
    ```
    
