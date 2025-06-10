# MongoDB connector example

The MongoDB Connector can be used to perform CRUD operations in the local database as well as in MongoDB Atlas (cloud version of MongoDB).

## What you'll build

This example explains how to use MongoDB Connector to insert and find documents from a MongoDB database.

The sample API given below demonstrates how the MongoDB connector can be used to connect to the MongoDB Server and perform **insert many** and **find** operations on it.

- `/insertmany`: The user sends a request payload that includes the connection information, collection name, and the documents to be inserted. This request is sent to the integration runtime by invoking the MongodbConnector API. This will insert the documents into the MongoDB database.

    <p><img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-1.png" title="Insert many function" width="800" alt="Insert many function" /></p>

- `/find`: The user sends the request payload containing the connection information, collection name, and the find query. This request is sent to the integration runtime by invoking the MongodbConnector API. Once the API is invoked, it returns the documents matching the find query.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-2.png" title="Find function" width="800" alt="Find function"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Before you begin

If you want to connect to MongoDB Atlas, follow the steps mentioned below to get the connection string.

1. In the Clusters view, click **Connect** for the cluster to which you want to connect.

2. Click **Choose a connection method**.

3. Click **Connect your application**.

4. Select Java from the **Driver** menu.

5. Select the correct driver version from the **Version**(`4.3 or later`) menu.

6. Clear the **Include full driver code example** check box to get the connection string.


## Set up the integration project

Follow the steps in the [Create Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `MongoConnector` and the API context as `/mongodbconnector`.

### Configure the API

1. First, create the `/insertmany` resource. For guidance, refer to the [Add new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) guide. Use the following details when configuring the resource.
    - **URI Template**: `/insertmany`
    - **HTTP Method**: `POST`

2. Set up the **Insert Many** operation.
    1. Select the **insertmany** resource. Click on the **+** icon on the canvas to open the **Mediator Palette** and search for the **MongoDB** connector.

        <img src="{{base_path}}/assets/img/integrate/connectors/common/add-connector-operation.png" title="Add connector operation" width="400" alt="Add connector operation"/>

    2. Search for the **MongoDB** connector and download the connector if you have not done so already. After downloading, you can see the MongoDB connector in the mediator palette. Click on the **Insert Many** operation under the MongoDB connector.

        <img src="{{base_path}}/assets/img/integrate/connectors/mongodb/mongo-insert-many-add.png" title="Insert Many Operation" width="800" alt="Insert Many Operation"/>

    3. Then, click on **Add new connection** to create a new MongoDB Connection.
        
        Following values can be provided when connecting to the MongoDB database. <br/>

        - Connection Name - connectionURI
        - Connection URI - mongodb+srv://server.example.com/?connectTimeoutMS=300000&amp;authSource=aDifferentAuthDB
        - Database - TestDatabase

        <img src="{{base_path}}/assets/img/integrate/connectors/mongodb/mongo-add-new-connection.png" title="Add connection" width="800" alt="Add connection"/>

    3. Click on **Add** to create the connection. You can see the created connection in the **Connection** drop-down list. Select the created connection from the list.

    4. Configure the **insertMany** operation by providing the following expressions for the properties. These expressions will retrieve the respective values from the JSON request payload.

        - **Collection**: `payload.collection`
        - **Documents**: `payload.documents`

    5. To store the response of the operation in the message body, select **Overwrite Message Body** in the Output Section. This will allow you to send the response back to the user as a response of the API invocation.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb/mongo-insert-many-operation.png" title="Insert Many Operation" width="800" alt="Insert Many Operation"/>

3. Send a response to the user.       

    Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb/mongdo-insert-many-resource.png" title="Insert Many Operation" width="800" alt="Insert Many Operation"/>

5. Create the next API resource (which is `/find`) by doing same steps as create `/insertmany`. This API resource will find all the documents matching the find query given by the user. This will also be a `POST` request.

6. Setup the **Find** operation.

    1. Provide expressions for the following two properties. These expressions will retrieve the respective values from the JSON request payload.

        - Collection - payload.collection
        - Query - payload.query

    2. Select **Overwrite Body** as `true` to overwrite the response body with the response from the operation.

7. Add a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

8. You can find the complete API XML configuration below. Now you can switch to the Source view and check the XML configuration files of the created API and sequences. 

```
<?xml version="1.0" encoding="UTF-8"?>
<api context="/mongodbconnector" name="MongoConnector" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/insertmany">
        <inSequence>
            <mongodb.insertMany configKey="connectionURI">
                <collection>{${payload.collection}}</collection>
                <documents>{${payload.documents}}</documents>
                <ordered>True</ordered>
                <responseVariable>mongodb_insertMany_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </mongodb.insertMany>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/find">
        <inSequence>
            <mongodb.find configKey="connectionURI">
                <collection>{${payload.collection}}</collection>
                <query>{${payload.query}}</query>
                <projection></projection>
                <collation></collation>
                <limit></limit>
                <sort></sort>
                <responseVariable>mongodb_find_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </mongodb.find>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/MongodbConnector3xx.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

### Insert Many Operation

1.  Invoke the API `insertmany` resource as shown below using the MI VSCode Extension.

    <img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

    **Sample Request**:

    - Content-Type: `application/json`
    - Request body:
        ```json
        {
            "collection": "TestCollection",
            "documents": [
                {
                    "name": "Jane Doe",
                    "_id": "123"
                },
                {
                    "name": "John Doe",
                    "_id": "1234"
                },
                {
                    "name": "Jane Doe",
                    "_id": "12345"
                }
            ]
        }
        ```

    **Expected Response** : You should get a response as given below and the data will be added to the database.

    ```json
    {
        "insertedIds": [
            "6846963a436675569b109b1a",
            "6846963a436675569b109b1b",
            "6846963a436675569b109b1c"
        ],
        "insertedCount": 3
    }
    ```

### Find Operation

!!! Note
    In order to find documents by ObjectId, the find query payload should be in the following format:

    ```json
    {
        "query": {
            "_id": {
                "$oid": "6011b180007ce60ab2ad74a5"
            }
        }
    }
    ```

1.  Invoke the API `find` resource using the MI VSCode Extension.

    **Sample Request**:

    - Content-Type: `application/json`
    - Request body:
        ```json
        {
            "collection": "TestCollection",
            "query": {
                "name": "Jane Doe"
            }
        }
        ```

    **Expected Response** : You should get a response as given below and the data will be added to the database.

    ```json
    {
        "found": true,
        "data": [
            {
                "name": "Jane Doe",
                "_id": "123"
            },
            {
                "name": "Jane Doe",
                "_id": "12345"
            }
        ],
        "count": 2
    }
    ```


## What's next

- To customize this example for your own scenario, see [MongoDB Connector Configuration]({{base_path}}/reference/connectors/mongodb-connector/mongodb-connector-config/) documentation for all operation details of the connector.
