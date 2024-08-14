# MongoDB connector example

The MongoDB Connector can be used to perform CRUD operations in the local database as well as in MongoDB Atlas (cloud version of MongoDB).

## What you&#39;ll build

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

5. Select the correct driver version from the **Version**(`3.3`) menu.

6. Clear the **Include full driver code example** check box to get the connection string.


## Create the integration project

1.  Create a new integration project named `MongodbConnector`.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-3.png" title="Create project" width="500" alt="Create project"/>

2.  Click `+` on Extension panal APIs to create the REST API.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-api-create-1.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

3.  Provide the API name as `MongoConnector` and the API context as `/mongodbconnector`. Click **create**.
    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-api-create-2.png" title="Adding Rest API Values" width="800" alt="Adding Rest API Values"/>
4.  Delete default resource created by Extension.
    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-api-create-3.png" title="Delete default resource" width="800" alt="Delete default resource"/> <br/>
    Then click `+ Resource` to create the `/insertmany` resource. This API resource inserts documents into the MongoDB database. Let's use a **URL_template** as URL style and insert `/insertmany` to URI Template. Select methods as `Post`. Then click **create**.
    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-4.png" title="Adding the API resource." width="800" alt="Adding the API resource."/><br/>
    Click created `/insertmany` resource open **Resource View**. Then click `+` arrow below Start node to open side panel.
    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-open-resource-view.png" title="Open Resource View" width="800" alt="Open Resource View"/><br/>

5.  Select **Connectors** and search **mongodb** connector. Click the mongodb connector to open opareation panal then click **insertMany**. 
    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-5.png" title="Adding the insert many operation." width="800" alt="Adding the insert many operation."/>

6.  Create a connection by clicking **Add new Connection**.

    Following values can be provided when connecting to the MongoDB database. <br/>

    - Connection Type - URI
    - Connection Name - connectionURI
    - Connection URI - mongodb+srv://server.example.com/?connectTimeoutMS=300000&amp;authSource=aDifferentAuthDB
    - Database - TestDatabase

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-6.png" title="Adding the connection." width="800" alt="Adding the connection."/>

7.  After the connection is successfully created, you can select the new connection from the 'Connection' menu in the properties view.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-7.png" title="Selecting the connection." width="800" alt="Selecting the connection."/>

8.  Next, provide JSON expressions for the following two properties. These expressions will retrieve the respective values from the JSON request payload.

    - Collection - json-eval($.collection)
    - Documents - json-eval($.documents)

9.  Click `+` arrow under `insertMany` node then click [Respond Mediator](https://ei.docs.wso2.com/en/latest/micro-integrator/references/mediators/respond-mediator/) and submit to add to the canvas. This returns the response message to the client (after inserting documents) as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-8.png" title="Adding the respond mediator." width="800" alt="Adding the respond mediator."/><br/>
    Final diagram should look like this.
    <img src="{{base_path}}/assets/img/integrate/connectors/mongodb-conn-8-1.png" title="Final Diagram" width="800" alt="Final Diagram"/><br/>

10. Create the next API resource (which is `/find`) by doing same steps as create `/insertmany`. This API resource will find all the documents matching the find query given by the user. This will also be a `POST` request.

11. Select 'connectionURI' as the connection from the 'Connection' menu in the properties view.

12. Next, provide JSON expressions for the following two properties. These expressions will retrieve the respective values from the JSON request payload.

    - Collection - json-eval($.collection)
    - Query - json-eval($.query)

14. Add [Respond Mediator](https://ei.docs.wso2.com/en/latest/micro-integrator/references/mediators/respond-mediator/) to the canvas. This returns the response message to the client (after retrieving documents) as shown below.

15. You can find the complete API XML configuration below. Now you can switch to the Source view and check the XML configuration files of the created API and sequences. 

```
<?xml version="1.0" encoding="UTF-8"?>
<api context="/mongodbconnector" name="MongoConnector" xmlns="http://ws.apache.org/ns/synapse">
	<resource methods="POST" uri-template="/insertmany">
		<inSequence>
			<property expression="json-eval($.collection)" name="collection" scope="default" type="JSON"/>
			<property expression="json-eval($.documents)" name="documents" scope="default" type="JSON"/>
			<mongodb.insertMany configKey="connectionURI">
				<collection>{$ctx:collection}</collection>
				<documents>{$ctx:documents}</documents>
				<ordered>True</ordered>
			</mongodb.insertMany>
			<respond/>
		</inSequence>
		<faultSequence>
		</faultSequence>
	</resource>
	<resource methods="POST" uri-template="/find">
		<inSequence>
			<property expression="json-eval($.collection)" name="collection" scope="default" type="JSON"/>
			<property expression="json-eval($.query)" name="query" scope="default" type="JSON"/>
			<mongodb.find configKey="connectionURI">
				<collection>{$ctx:collection}</collection>
				<query>{$ctx:query}</query>
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

<a href="{{base_path}}/assets/attachments/connectors/MongodbConnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Testing

### Insert Many Operation

1.  Create a file named `insertmany.json` with the following payload:

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

2.  Invoke the API as shown below using the curl command.

    !!! Info
        The Curl application can be downloaded from [here](https://curl.haxx.se/download.html).

    ```bash
    curl -H "Content-Type: application/json" --request POST --data @insertmany.json http://localhost:8290/mongodbconnector/insertmany
    ```

    **Expected Response** : You should get a response as given below and the data will be added to the database.

    ```json
    {
    	"InsertManyResult": "Successful"
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

1.  Create a file called `find.json` with the following payload.

    ```json
    {
    	"collection": "TestCollection",
    	"query": {
    		"name": "Jane Doe"
    	}
    }
    ```

2.  Invoke the API using the curl command shown below.

    !!! Info
        Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

    ```bash
    curl -H "Content-Type: application/json" --request POST --data @find.json http://localhost:8290/mongodbconnector/find
    ```

    **Expected Response** : You should get a response similar to the one given below.

    ```json
    [
    	{
    		"_id": "123",
    		"name": "Jane Doe"
    	},
    	{
    		"_id": "12345",
    		"name": "Jane Doe"
    	}
    ]
    ```

## What's next

- To customize this example for your own scenario, see [MongoDB Connector Configuration]({{base_path}}/reference/connectors/mongodb-connector/mongodb-connector-config/) documentation for all operation details of the connector.
