# MongoDB Connector Reference

This documentation provides a reference guide for the MongoDB Connector.

## Connection configurations

The MongoDB connector can be used to deal with two types of connections:

- **Connection String URI (URI)**: Directly provide a MongoDB connection string URI.

- **Connection Parameters**: Configure the connection with individual parameters

    - **Standard**:  Standard MongoDB connection parameters
    - **DNS Seed List**: MongoDB connection using DNS SRV records for server discovery. (DNS SRV Lookup)

The supported connection URI types and connection options are listed in the [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/) documentation.

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
                Connection Name
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
                Type
            </td>
            <td>
                String
            </td>
            <td>
                Method to construct the connection URI</br> 
                <b>Possible values</b>: 
                <ul>
                    <li>
                        <b>Connection String URI</b>:  Directly provide a MongoDB connection string URI.
                    </li>
                    <li>
                        <b>Connection Parameters</b>: Configure the connection with individual parameters
                    </li>
                </ul>
            </td>
            <td>
                Connection String URI
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td colspan="5" style="background-color: #f8f8f8; font-weight: bold;">
                Connection String URI Configuration
            </td>
        </tr>
        <tr>
            <td>
                Connection String URI
            </td>
            <td>
                String
            </td>
            <td>
                The MongoDB connection string URI. This is only applicable for the connection type "Connection String URI".<br>
                Eg: [prefix]://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
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
                Database
            </td>
            <td>
                String
            </td>
            <td>
                The name of the database in the MongoDB server.
            </td>
            <td>
                -
            </td>
            <td>
                Yes
            </td>
        </tr>
        <tr>
            <td colspan="5" style="background-color: #f8f8f8; font-weight: bold;">
                Connection Parameters Configuration
            </td>
        </tr>
        <tr>
            <td>
                Use DNS SRV Lookup
            </td>
            <td>
                String
            </td>
            <td>
                When true, the driver uses DNS SRV records to discover the MongoDB server. This is only applicable for the connection type "Connection Parameters".
            <td>
                false
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
        <td>
            Host
        </td>
        <td>
            String
        </td>
        <td>
            The name of the host. It identifies either a hostname, IP address, or unix domain socket.
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
            Port
        </td>
        <td>
            Number
        </td>
        <td>
            The port number. This is only applicable for the connection type "Connection Parameters" and you are not using DNS SRV Lookup.
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
            Database
        </td>
        <td>
            String
        </td>
        <td>
            The name of the database in the MongoDB server.
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
            Seed List
        </td>
        <td>
            String
        </td>
        <td>
            A seed list is used by drivers and clients (like the mongo shell) for initial discovery of the replica set configuration. Seed lists can be provided as host:port pairs. This is used in replica sets and shared clusters. This is only applicable for the connection type "Connection Parameters" and you are not using DNS SRV Lookup.
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
            Username
        </td>
        <td>
            String
        </td>
        <td>
            The user name to authenticate the database associated with the user.
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
            String
        </td>
        <td>
            The password to authenticate the database associated with the user.
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
                Replica Set
            </td>
            <td>
                String
            </td>
            <td>
                The name of the replica set to connect to.
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
                Auth Source
            </td>
            <td>
                String
            </td>
            <td>
                The database name associated with the user's credentials.
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
                Auth Mechanism
            </td>
            <td>
                String
            </td>
            <td>
                The authentication mechanism to use.
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
                Auth Mechanism Properties
            </td>
            <td>
                String
            </td>
            <td>
                The authentication mechanism properties.
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
                Gssapi Service Name
            </td>
            <td>
                String
            </td>
            <td>
                The Kerberos service name when connecting to Kerberized MongoDB instances. This value must match the service name set on MongoDB instances to which you are connecting.
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
                Write Concern W Option
            </td>
            <td>
                String
            </td>
            <td>
                Corresponds to the write concern w Option.
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
                Write Concern Timeout MS
            </td>
            <td>
                Number
            </td>
            <td>
                 The time limit (in milliseconds) of the write concern.
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
                Journal
            </td>
            <td>
                String
            </td>
            <td>
                When this option used, the Micro Integrator requests an acknowledgement from MongoDB that the write operation has been written to the journal. This applies when the write concern is set to 'j'.
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
                Maximum Pool Size
            </td>
            <td>
                Number
            </td>
            <td>
                The maximum number of connections in the connection pool.
            </td>
            <td>
                100
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Minimum Pool Size
            </td>
            <td>
                Number
            </td>
            <td>
                The minimum number of connections in the connection pool.
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
                Maximum Idle Time MS
            </td>
            <td>
                Number
            </td>
            <td>
                The maximum number of milliseconds that a connection can remain idle in the pool before being removed and closed.
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
                Wait Queue Multiple
            </td>
            <td>
                Number
            </td>
            <td>
                The maximum pool size is multiplied by this value to calculate the maximum number of threads that are allowed to wait for a connection to become available in the pool.
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
                Wait Queue Timeout MS
            </td>
            <td>
                Number
            </td>
            <td>
                The maximum time in milliseconds that a thread can wait for a connection to become available.
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
                SSL
            </td>
            <td>
                Boolean
            </td>
            <td>
                A boolean to enable or disables TLS/SSL for the connection.
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
                SSL Invalid Host Names Allowed
            </td>
            <td>
                Boolean
            </td>
            <td>
                User name used to connect with the file server.
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
                Connect Timeout TS
            </td>
            <td>
                Number
            </td>
            <td>
                The time in milliseconds for attempting a connection before timing out. For most drivers, the default is to never timeout.
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
                Socket Timeout MS
            </td>
            <td>
                Number
            </td>
            <td>
                The time in milliseconds for attempting a send or receive on a socket before the attempt times out. For most drivers, the default is to never timeout.
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
                Compressors
            </td>
            <td>
                String
            </td>
            <td>
                Comma-delimited string of compressors to enable network compression for communication between this client and a mongod/mongos instance.
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
                Zlib Compression Level
            </td>
            <td>
                Number
            </td>
            <td>
                An integer that specifies the compression level when zlib is used for network compression.
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
                Read Concern Level
            </td>
            <td>
                String
            </td>
            <td>
                The level of isolation.
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
                Read Preference
            </td>
            <td>
                String
            </td>
            <td>
                Specifies the read preferences for this connection.
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
                Maximum Staleness Seconds
            </td>
            <td>
                Number
            </td>
            <td>
                The maximum time (in seconds) a connection can remain stale before the client stops using it for read operations.
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
                Read Preference Tags
            </td>
            <td>
                String
            </td>
            <td>
                Document tags as a comma-separated list or colon-separated key-value pairs.
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
                Local Threshold MS
            </td>
            <td>
                Number
            </td>
            <td>
                The latency (in milliseconds) that is allowed when selecting a suitable MongoDB instance from the list of available instances.
            </td>
            <td>
                15
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Server Selection Timeout MS
            </td>
            <td>
                Number
            </td>
            <td>
                The time (in milliseconds) that is allowed for server selection before an exception is thrown.
            </td>
            <td>
                30,000
            </td>
            <td>
                No
            </td>
        </tr>
        <tr>
            <td>
                Server Selection Try Once
            </td>
            <td>
                Boolean
            </td>
            <td>
                When true, the driver scans the MongoDB deployment exactly once after server selection fails and then either selects a server or raises an error. When false, the driver searches for a server until the serverSelectionTimeoutMS value is reached. Only applies for single-threaded drivers.
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
                Heartbeat Frequency MS
            </td>
            <td>
                Number
            </td>
            <td>
                Controls the intervals between which the driver checks the state of the MongoDB deployment. The interval (in milliseconds) between checks, counted from the end of the previous check until the beginning of the next one.
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
                App Name
            </td>
            <td>
                String
            </td>
            <td>
                Specify a custom app name.
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
                Retry Reads
            </td>
            <td>
                Boolean
            </td>
            <td>
                Enables retryable reads.
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
                Retry Writes
            </td>
            <td>
                Boolean
            </td>
            <td>
                Enable retryable writes.
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
                UUID Representation
            </td>
            <td>
                String
            </td>
            <td>
                The type of UUID representation.
            </td>
            <td>
                -
            </td>
            <td>
                No
            </td>
        </tr>
        
    </table>

**Sample Configuration of Connection URI**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="uriConnection" xmlns="http://ws.apache.org/ns/synapse">
    <mongodb.init>
        <name>uriConnection</name>
        <connectionType>MONGODB</connectionType>
        <inputType>Connection String URI</connectionType>
        <connectionURI>mongodb+srv://server.example.com/?connectTimeoutMS=300000&authSource=aDifferentAuthDB</connectionURI>
        <database>users</database>
    </mongodb.init>
</localEntry>
```

**Sample configuration of Connection parameters configs**

Sample configuration of STANDARD (standalone) configs.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="standaloneStandardConnection" xmlns="http://ws.apache.org/ns/synapse">
    <mongodb.init>
        <name>standaloneStandardConnection</name>
        <connectionType>MONGODB</connectionType>
        <inputType>Connection Parameters</inputType>
        <useDnsSrvLookup>false</useDnsSrvLookup>
        <database>users</database>
        <host>localhost</host>
        <port>27017</port>
        <username>administrator</username>
        <password>1234</password>
    </mongodb.init>
</localEntry>
```

**Sample configuration of Connection parameters (replica set) configs**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="replicaSetStandardConnection" xmlns="http://ws.apache.org/ns/synapse">
    <mongodb.init>
        <name>replicaSetStandardConnection</name>
        <connectionType>MONGODB</connectionType>
        <inputType>Connection Parameters</inputType>
        <useDnsSrvLookup>false</useDnsSrvLookup>
        <seedList>mongodb1.example.com:27317,mongodb2.example.com:27017</seedList>
        <database>users</database>
        <username>administrator</username>
        <password>1234</password>
        <authSource>aDifferentAuthDB</authSource>
        <ssl>true</ssl>
        <w>majority</w>
        <replicaSet>mySet</replicaSet>
        <retryWrites>true</retryWrites>
    </mongodb.init>
</localEntry>
```

 **Sample Configuration of Connection parameters (with DNS SRV lookup) configs**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="dslConnection" xmlns="http://ws.apache.org/ns/synapse">
    <mongodb.init>
        <name>dslConnection</name>
        <connectionType>MONGODB</connectionType>
        <inputType>Connection Parameters</inputType>
        <useDnsSrvLookup>true</useDnsSrvLookup>
        <host>server.example.com</host>
        <database>users</database>
        <username>administrator</username>
        <password>1234</password>
        <authSource>aDifferentAuthDB</authSource>
        <retryWrites>true</retryWrites>
        <w>majority</w>
    </mongodb.init>
</localEntry>
```

## Operations

The following operations allow you to work with the MongoDB connector. Click an operation name to see parameter details and samples on how to use it.

??? note "insertOne"
    Inserts a document into a collection. See the related [insertOne documentation](https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Document
    </td>
    <td>
    JSON String
    </td>
    <td>
    A document to insert into the collection.
    </td>
    <td> -
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
    
    **Sample Configuration**
    
    ```xml
    <mongodb.insertOne configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <document>{json-eval($.document)}</document>
    </mongodb.insertOne>
    
    ```
    
    **Sample Request**
    
    ```json
    {
        "collection": "TestCollection",
        "document": {
            "_id": "123",
            "name": "John Doe"
        }
    }
    ```

??? note "insertMany"
    Inserts multiple documents into a collection. See the related [insertMany documentation](https://docs.mongodb.com/manual/reference/method/db.collection.insertMany) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Documents
    </td>
    <td>
    JSON String
    </td>
    <td>
    An array of documents to insert into the collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Ordered
    </td>
    <td>
    Boolean
    </td>
    <td>
    A boolean specifying whether the MongoDB instance should perform an ordered or unordered insert.
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

    **Sample Configuration**

    ```xml
    <mongodb.insertMany configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <documents>{json-eval($.documents)}</documents>
        <ordered>True</ordered>
    </mongodb.insertMany>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "documents": [
            {
                "name": "Jane Doe",
                "_id": "123"
            },
            {
                "name": "Jane Doe",
                "_id": "1234"
            },
            {
                "name": "Jane Doe",
                "_id": "12345"
            }
        ]
    }
    ```

??? note "findOne"
    Returns one document that satisfies the specified query criteria on the collection. If multiple documents satisfy the query, this method returns the first document according to the [natural order](https://docs.mongodb.com/manual/reference/glossary/#term-natural-order). See the related [find documentation](https://docs.mongodb.com/manual/reference/method/db.collection.find/) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Query
    </td>
    <td>
    JSON String
    </td>
    <td>
    Specifies query selection criteria using [query operators](https://docs.mongodb.com/manual/reference/operator/). To return the first document in a collection, omit this parameter or pass an empty document ({}).
    </td>
    <td>
    {}
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Projection
    </td>
    <td>
    JSON String
    </td>
    <td>
    Specifies the fields to return using [projection operators](https://docs.mongodb.com/manual/reference/operator/projection/). Omit this parameter to return all fields in the matching document.
    </td>
    <td> -
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Collation
    </td>
    <td>
    JSON String
    </td>
    <td>
    Collation allows users to specify language-specific rules for string comparison, such as rules for letter case and accent marks.
    </td>
    <td> -
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

    **Sample Configuration**

    ```xml
    <mongodb.findOne configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <query>{json-eval($.query)}</query>
        <responseVariable>mongodb_findOne_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </mongodb.findOne>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "query": {
            "name": "Jane Doe"
        }
    }
    ```

??? note "find"
    Selects documents in a collection or [view](https://docs.mongodb.com/manual/core/views/) and returns a [cursor](https://docs.mongodb.com/manual/reference/glossary/#term-cursor) to the selected documents. See the related [find documentation](https://docs.mongodb.com/manual/reference/method/db.collection.find/) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Query
    </td>
    <td>
    JSON String
    </td>
    <td>
    Selection filter using [query operators](https://docs.mongodb.com/manual/reference/operator/). To return all documents in a collection, omit this parameter or pass an empty document ({}).
    </td>
    <td>
    {}
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Projection
    </td>
    <td>
    JSON String
    </td>
    <td>
    Specifies the fields to return using [projection operators](https://docs.mongodb.com/manual/reference/operator/projection/). Omit this parameter to return all fields in the matching document.
    </td>
    <td> -
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Collation
    </td>
    <td>
    JSON String
    </td>
    <td>
    Collation allows users to specify language-specific rules for string comparison, such as rules for letter case and accent marks.
    </td>
    <td> -
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Sort
    </td>
    <td>
    JSON String
    </td>
    <td>
    A document that defines the sort order of the result set.
    </td>
    <td> -
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
    
    **Sample Configuration**

    ```xml
    <mongodb.find configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <query>{json-eval($.query)}</query>
        <responseVariable>mongodb_find_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </mongodb.find>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "query": {
            "name": "John Doe"
        }
    }
    ```

??? note "updateOne"
    Updates a single document within the collection based on the filter. See the related [updateOne documentation](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Query
    </td>
    <td>
    JSON String
    </td>
    <td>
    The selection criteria for the update. The same [query selectors](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors) as in the [find()](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find) method are available. Specify an empty document {} to update the first document returned in the collection.
    </td>
    <td>
    {}
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Update
    </td>
    <td>
    JSON String
    </td>
    <td>
    The modifications to apply.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Upsert
    </td>
    <td>
    Boolean
    </td>
    <td>
    Creates a new document if no documents match the filter.
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
    Collation
    </td>
    <td>
    JSON String
    </td>
    <td>
    Collation allows users to specify language-specific rules for string comparison, such as rules for letter case and accent marks.
    </td>
    <td> -
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Array Filters
    </td>
    <td>
    JSON String
    </td>
    <td>
    An array of filter documents that determine which array elements to modify for an update operation on an array field.
    </td>
    <td> -
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

    !!! Info
        Array Filters parameter should be in a JSON object format. See the example given below.

        ```
        {
            "collection": "TestCollection",
            "query": {
                "grades": {
                    "$gte": 100
                }
            },
            "update": {
                "$set": {
                    "grades.$[element]": 100
                }
            },
            "arrayFilters": {
                "element": {
                    "$gte": 100
                }
            }
        }
        ```

    **Sample Configuration**

    ```xml
    <mongodb.updateOne configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <query>{json-eval($.query)}</query>
        <update>{json-eval($.update)}</update>
        <upsert>False</upsert>
        <responseVariable>mongodb_updateOne_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </mongodb.updateOne>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "query": {
            "_id": "123"
        },
        "update": {
            "$set": {
                "name": "Jane Doe"
            }
        }
    }
    ```

??? note "updateMany"
    Updates all documents that match the specified filter for a collection. See the related [updateMany documentation](https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Query
    </td>
    <td>
    JSON String
    </td>
    <td>
    The selection criteria for the update. The same [query selectors](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors) as in the [find()](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find) method are available. Specify an empty document {} to update all documents in the collection.
    </td>
    <td>
    {}
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Update
    </td>
    <td>
    JSON String
    </td>
    <td>
    The modifications to apply.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Upsert
    </td>
    <td>
    Boolean
    </td>
    <td>
    Creates a new document if no documents match the filter.
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
    Collation
    </td>
    <td>
    JSON String
    </td>
    <td>
    Collation allows users to specify language-specific rules for string comparison, such as rules for letter case and accent marks.
    </td>
    <td> -
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Array Filters
    </td>
    <td>
    JSON String
    </td>
    <td>
    An array of filter documents that determine which array elements to modify for an update operation on an array field.
    </td>
    <td> -
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

    !!! Info
        Array filters parameter should be in a JSON object format. See the example given below.

        ```
        {
            "collection": "TestCollection",
            "query": {
                "grades": {
                    "$gte": 100
                }
            },
            "update": {
                "$set": {
                    "grades.$[element]": 100
                }
            },
            "arrayFilters": {
                "element": {
                    "$gte": 100
                }
            }
        }
        ```

    **Sample Configuration**

    ```xml
    <mongodb.updateMany configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <query>{json-eval($.query)}</query>
        <update>{json-eval($.update)}</update>
        <upsert>False</upsert>
        <responseVariable>mongodb_updateMany_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </mongodb.updateMany>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "query": {
            "_id": "123"
        },
        "update": {
            "$set": {
                "name": "Jane Doe"
            }
        }
    }
    ```

??? note "deleteOne"
    Removes a single document from a collection. See the related [deleteOne documentation](https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#db.collection.deleteOne) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Query
    </td>
    <td>
    JSON String
    </td>
    <td>
    Specifies deletion criteria using [query operators](https://docs.mongodb.com/manual/reference/operator/). Specify an empty document {} to delete the first document returned in the collection.
    </td>
    <td>
    {}
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Collation
    </td>
    <td>
    JSON String
    </td>
    <td>
    Collation allows users to specify language-specific rules for string comparison, such as rules for letter case and accent marks.
    </td>
    <td> -
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
    
    **Sample Configuration**

    ```xml
    <mongodb.deleteOne configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <query>{json-eval($.query)}</query>
        <responseVariable>mongodb_deleteOne_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </mongodb.deleteOne>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "query": {
            "name": "Jane Doe"
        }
    }
    ```

??? note "deleteMany"
    Removes all documents that match the query from a collection. See the related [deleteMany documentation](https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/#db.collection.deleteMany) for more information.
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
    Collection
    </td>
    <td>
    String
    </td>
    <td>
    The name of the MongoDB collection.
    </td>
    <td> -
    </td>
    <td>
    Yes
    </td>
    </tr>
    <tr>
    <td>
    Query
    </td>
    <td>
    JSON String
    </td>
    <td>
    Specifies deletion criteria using [query operators](https://docs.mongodb.com/manual/reference/operator/). To delete all documents in a collection, pass in an empty document ({}).
    </td>
    <td>
    {}
    </td>
    <td>
    No
    </td>
    </tr>
    <tr>
    <td>
    Collation
    </td>
    <td>
    JSON String
    </td>
    <td>
    Collation allows users to specify language-specific rules for string comparison, such as rules for letter case and accent marks.
    </td>
    <td> -
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

    **Sample Configuration**

    ```xml
    <mongodb.deleteMany configKey="connectionURI">
        <collection>{json-eval($.collection)}</collection>
        <query>{json-eval($.query)}</query>
        <responseVariable>mongodb_deleteMany_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </mongodb.deleteMany>
    ```

    **Sample Request**

    ```json
    {
        "collection": "TestCollection",
        "query": {
            "name": "John Doe"
        }
    }
    ```
