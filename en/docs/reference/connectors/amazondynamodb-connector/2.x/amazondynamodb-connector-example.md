# Amazon DynamoDB Connector Example

 Amazon DynamoDB Connector allows you to access the [Amazon DynamoDB REST API](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.API.html) from an integration sequence.

## What you'll build

Given below is a sample scenario that demonstrates how to work with the Amazon DynamoDB Connector and how to perform various `table` and `items` operations with Amazon DynamoDB.

This example explains how to use Amazon DynamoDB Connector to:

1. Create a table (a location for storing employee details) in Amazon DynamoDB.
2. Insert employee details (items) into the created table.
3. Update the employee details table.
4. Retrieve information about the inserted employee details (items).
5. Remove inserted employee details (items).
6. Retrieve the list of tables.
7. Remove the created employee details table.

All seven operations are exposed via an API. The API with the context `/resources` has seven resources.

* `/addtable` : Create a new table in the Amazon DynamoDB with the specified table name to store employee details.
* `/insertdetails` : Insert employee data (items) and store in the specified table.
* `/updatetable` : Update the specified table (provisioned throughput settings, global secondary indexes, or DynamoDB Streams settings for a specified table).
* `/listdetails` : Retrieve information about the added employee details (items).
* `/deletedetails` : Remove added employee details from the specified table (items).
* `/listtable` : Retrieve information about the created tables.
* `/deletetable` : Remove the created table in the Amazon DynamoDB.

For more information about these operations, please refer to the [Amazon DynamoDB connector reference guide]({{base_path}}/reference/connectors/amazondynamodb-connector/amazondynamodb-connector-configuration/).

> **Note**: Before invoking the API, you need to configure message builders/formatters in deployment.toml. See [Setting up the Amazon DynamoDB Connector]({{base_path}}/reference/connectors/amazondynamodb-connector/amazondynamodb-connector-configuration/) documentation for more information.

The following diagram shows the overall solution. The user creates a table, stores some employee details (items) into the table, and then receives it back. To invoke each operation, the user uses the same API. 

<img src="{{base_path}}/assets/img/integrate/connectors/amazon-dynamoDB-connector-example.jpg" title="Amazon DynamoDB connector example" width="800" alt="Amazon DynamoDB connector example"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `amazonDynamoDBAPI` and the API context as `/resources`.

### Configure the API

#### Configure a resource for the addtable operation

1. Create the `/addtable` resource. For guidance, refer to the [Adding new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) guide. Use the following details when configuring the resource.
      - **URI Template**: `/addtable`
      - **HTTP Method**: `POST`

2. Select the **addTable** resource. Click on the **+** icon on the canvas to open the **Mediator Palette** and search for the **DynamoDB** connector.

3. After downloading, you can see the DynamoDB connector in the mediator palette. Click on the **Add table** operation under the DynamoDB connector.

4. Then, click on **Add new connection** to create a new DynamoDB Connection.

      Following values can be provided when connecting to the DynamoDB database. <br/>

      - **region** : The region of the application access.
      - **accessKeyId** : The AWS secret access key.
      - **secretAccessKey** : The AWS accessKeyId of the user account to generate the signature.
      - **blocking** : Boolean type, this property helps the connector perform blocking invocations to AmazonDynamoDB. 

         <img src="{{base_path}}/assets/img/integrate/connectors/amazon-dynamodb/dynamodb-add-connection.png" title="Add connection" width="800" alt="Add connection"/>

5. Click on **Add** to create the connection. You can see the created connection in the **Connection** drop-down list. Select the created connection from the list.

6. Configure the **Add Table** operation by providing values for the following fields.

      - **attributeDefinitions** : A list of attributes that describe the key schema for the table and indexes. If you are adding a new global secondary index to the table, AttributeDefinitions should include the key element(s) of the new index. 
      - **tableName** : The name of the table to create. 
      - **keySchema** : Specifies the attributes that make up the primary key for a table or an index. The attributes in keySchema must also be defined in attributeDefinitions.
      - **localSecondaryIndexes** : One or more local secondary indexes (the maximum is five) to be created on the table. Each index is scoped to a given partition key value. There is a 10 GB size limit per partition key value. Alternately, the size of a local secondary index is unconstrained.
      - **provisionedThroughput** : Represents the provisioned throughput setting for a specified table or index.

      While invoking the API, the above five parameter values come as user input.

      - **attributeDefinitions** : `payload.attributeDefinitions`
      - **tableName** : `payload.tableName`
      - **keySchema** : `payload.keySchema`
      - **localSecondaryIndexes** : `payload.localSecondaryIndexes`
      - **provisionedThroughput** : `payload.provisionedThroughput`

7. To store the response of the operation in the message body, select **Overwrite Message Body** in the Output Section. This will allow you to send the response back to the user as a response of the API invocation.

      <img src="{{base_path}}/assets/img/integrate/connectors/amazon-dynamodb/dynamodb-add-table-operation.png" title="Insert Many Operation" width="800" alt="Insert Many Operation"/>

8. Send a response to the user.

    Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-dynamodb/dynamodb-respond-mediator.png" title="Add Table resource" width="800" alt="Add Table resource"/>


#### Configure a resource for the insertdetails operation

1. Navigate into the **Mediators** pane and select the `Put Item` operation under the **Amazondynamodb Connector**.  

2. The `Put Item` operation is used to insert new items to the tables. The `Put Item` operation parameters are listed here.

      - **item** : A map of attribute name/value pairs, one for each attribute. Only the primary key attributes are required, but you can optionally provide other attribute name-value pairs for the item 
      - **tableName** :  The name of the table to contain the item. 
      
      While invoking the API, the above two parameter values come as user input.
      
      - **item** : `payload.item`
      - **tableName** : `payload.tableName`

3. Send a response to the user.

      Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.
     
#### Configure a resource for the updatetable operation

1. Navigate into the **Connectors** pane and select the `Update Table` operation under the **Amazondynamodb Connector**.   

2. The Update Table operation is used to update the created tables. The `Update Table` operation parameters are listed here.

   - **provisionedThroughput** : The new provisioned throughput setting for the specified table or index. 
      - **tableName** :  The name of the table to contain the item. 

      While invoking the API, the above two parameter values come as user input.
      
      - **provisionedThroughput** : `payload.provisionedThroughput`
      - **tableName** : `payload.tableName`

3. Send a response to the user.

      Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

#### Configure a resource for the listdetails operation

1. Navigate into the **Connectors** pane and select the `Get Item` operation under the **Amazondynamodb Connector**.
   

2. The Get Item operation is used to retrieve inserted items to the tables. The `Get Item` operation parameters are listed here.

      - **key** : An array of primary key attribute values that define specific items in the table. For each primary key, you must provide all of the key attributes. 
      - **tableName** :  The name of the table to contain the item. 

      While invoking the API, the above two parameter values come as user input.

      - **key** : `payload.key`
      - **tableName** : `payload.tableName`

3. Send a response to the user.

      Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.


#### Configure a resource for the deletedetails operation

1. Navigate into the **Connectors** pane and select the `deleteItem` operation under the **Amazondynamodb Connector**.   

2. The deleteItem operation is used to remove inserted items from the table. The `deleteItem` operation parameters are listed here.

      - **key** : An array of primary key attribute values that define specific items in the table. For each primary key, you must provide all of the key attributes. 
      - **tableName** :  The name of the table to contain the item.
      - **returnConsumedCapacity** : Determines the level of detail about provisioned throughput consumption that is returned in the response.
      - **returnValues** : Use returnValues if you want to get the item attributes as they appeared before they were deleted.

      While invoking the API, the above two parameter values (key, tableName) come as user input.
      
      - **key** : `payload.key`
      - **tableName** : `payload.tableName`
      - **returnConsumedCapacity** : `TOTAL`
      - **returnValues** : `ALL_OLD`

3. Send a response to the user.

      Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

#### Configure a resource for the listtable operation

1. Navigate into the **Connectors** pane and select the `listTables` operation under the **Amazondynamodb Connector**.

2. The listTables operation is used to retrieve information about the created tables. `listTables` operation parameters listed here.

      - **exclusiveStartTableName** : The first table name that the listTables operation evaluates. Use the value returned for LastEvaluatedTableName. 
      - **limit** : The maximum number of table names to retrieve. If this parameter is not specified, the limit is 100.

      While invoking the API, the above two parameter values come as user input.
      
      - **exclusiveStartTableName** : `payload.exclusiveStartTableName`
      - **limit** : `payload.limit`
    
3. Send a response to the user.

      Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.

#### Configure a resource for the deletetable operation

1. Navigate into the **Connectors** pane and select the `deleteTable` operation under the **Amazondynamodb Connector**.  

2. The listTables operation is used to retrieve information about the created tables. The `deleteTable` operation parameters are listed here.

      - **limit** : The maximum number of table names to retrieve. If this parameter is not specified, the limit is 100.
      
      While invoking the API, the above parameter value comes as user input.

      - **limit** : `payload.limit`

3. Send a response to the user.

      Add [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.



Now you can switch into the Source view and check the XML configuration files of the created API.

??? note "amazonDynamoDBAPI.xml"
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <api xmlns="http://ws.apache.org/ns/synapse" context="/resources" name="amazonDynamoDBAPI">
         <resource methods="POST" url-mapping="/addtable">
            <inSequence>
                  <amazondynamodb.createTable configKey="AWS_Con">
                     <attributeDefinitions>{${payload.attributeDefinitions}}</attributeDefinitions>
                     <tableName>{${payload.tableName}}</tableName>
                     <keySchema>{${payload.keySchema}}</keySchema>
                     <localSecondaryIndexes>{${payload.localSecondaryIndexes}}</localSecondaryIndexes>
                     <globalSecondaryIndexes></globalSecondaryIndexes>
                     <StreamSpecification></StreamSpecification>
                     <provisionedThroughput>{${payload.provisionedThroughput}}</provisionedThroughput>
                     <responseVariable>amazondynamodb_createTable_630</responseVariable>
                     <overwriteBody>true</overwriteBody>
                  </amazondynamodb.createTable>
                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
         <resource methods="POST" url-mapping="/insertdetails">
            <inSequence>
               <amazondynamodb.putItem configKey="AWS_Con">
               <item >{${payload.item}}</item>
               <tableName >{${payload.tableName}}</tableName>
               <conditionalOperator ></conditionalOperator>
               <conditionExpression ></conditionExpression>
               <expected ></expected>
               <expressionAttributeNames ></expressionAttributeNames>
               <expressionAttributeValues ></expressionAttributeValues>
               <returnConsumedCapacity ></returnConsumedCapacity>
               <returnItemCollectionMetrics ></returnItemCollectionMetrics>
               <returnValues ></returnValues>
               <responseVariable >amazondynamodb_putItem_997</responseVariable>
               <overwriteBody >true</overwriteBody>
                  </amazondynamodb.putItem>
                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
         <resource methods="POST" url-mapping="/deletedetails">
            <inSequence>
                  <amazondynamodb.deleteItem configKey="AWS_Con">
                     <key>{${payload.key}}</key>
                     <tableName>{${payload.tableName}}</tableName>
                     <conditionalOperator></conditionalOperator>
                     <conditionExpression></conditionExpression>
                     <expected></expected>
                     <expressionAttributeNames></expressionAttributeNames>
                     <expressionAttributeValues></expressionAttributeValues>
                     <returnConsumedCapacity>TOTAL</returnConsumedCapacity>
                     <returnItemCollectionMetrics></returnItemCollectionMetrics>
                     <returnValues>ALL_OLD</returnValues>
                     <responseVariable>amazondynamodb_deleteItem_1</responseVariable>
                     <overwriteBody>true</overwriteBody>
                  </amazondynamodb.deleteItem>

                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
         <resource methods="POST" url-mapping="/listdetails">
            <inSequence>
                  <amazondynamodb.getItem configKey="AWS_Con">
                     <key>{${payload.key}}</key>
                     <tableName>{${payload.tableName}}</tableName>
                     <attributesToGet></attributesToGet>
                     <consistentRead></consistentRead>
                     <expressionAttributeNames></expressionAttributeNames>
                     <projectionExpression></projectionExpression>
                     <returnConsumedCapacity></returnConsumedCapacity>
                     <responseVariable>amazondynamodb_getItem_1</responseVariable>
                     <overwriteBody>true</overwriteBody>
                  </amazondynamodb.getItem>
                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
         <resource methods="POST" url-mapping="/listtable">
            <inSequence>
                  <amazondynamodb.listTables configKey="AWS_Con">
                     <exclusiveStartTableName>{${payload.exclusiveStartTableName}}</exclusiveStartTableName>
                     <limit>{${payload.limit}}</limit>
                     <responseVariable>amazondynamodb_listTables_1</responseVariable>
                     <overwriteBody>true</overwriteBody>
                  </amazondynamodb.listTables>
                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
         <resource methods="POST" url-mapping="/updatetable">
            <inSequence>
                  <amazondynamodb.updateTable configKey="AWS_Con">
                     <tableName>{${payload.tableName}}</tableName>
                     <attributeDefinitions></attributeDefinitions>
                     <globalSecondaryIndexUpdates></globalSecondaryIndexUpdates>
                     <StreamSpecification></StreamSpecification>
                     <provisionedThroughput>{${payload.provisionedThroughput}}</provisionedThroughput>
                     <responseVariable>amazondynamodb_updateTable_1</responseVariable>
                     <overwriteBody>true</overwriteBody>
                  </amazondynamodb.updateTable>
                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
         <resource methods="POST" url-mapping="/deletetable">
            <inSequence>
               <amazondynamodb.deleteTable configKey="AWS_Con">
                  <tableName >{${payload.tableName}}</tableName>
                  <responseVariable >amazondynamodb_deleteTable_237</responseVariable>
                  <overwriteBody >true</overwriteBody>
                  </amazondynamodb.deleteTable>
                  <respond/>
            </inSequence>
            <faultSequence/>
         </resource>
      </api>

      ```  
      
## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/AmazonDynamoDBConnector3xxExample.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API resources as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

1. Create a new table in the Amazon DynamoDB with the specified table name to store employee details. Invoke `addtable` resource with the following payload.
 
   **Sample request**
 
   ```json
   {
      "attributeDefinitions":[
         {
            "AttributeName":"employee_id",
            "AttributeType":"S"
         },
         {
            "AttributeName":"name",
            "AttributeType":"S"
         },
         {
            "AttributeName":"department",
            "AttributeType":"S"
         }
      ],
      "tableName":"Employee_Details",
      "keySchema":[
         {
            "AttributeName":"employee_id",
            "KeyType":"HASH"
         },
         {
            "AttributeName":"name",
            "KeyType":"RANGE"
         }
      ],
      "localSecondaryIndexes":[
         {
            "IndexName":"department",
            "KeySchema":[
               {
                  "AttributeName":"employee_id",
                  "KeyType":"HASH"
               },
               {
                  "AttributeName":"department",
                  "KeyType":"RANGE"
               }
            ],
            "Projection":{
               "ProjectionType":"KEYS_ONLY"
            }
         }
      ],
      "provisionedThroughput":{
         "ReadCapacityUnits":5,
         "WriteCapacityUnits":5
      }
   } 
   ```

   **Expected Response**
    
   ```json
   {
      "TableDescription":{
         "AttributeDefinitions":[
            {
               "AttributeName":"department",
               "AttributeType":"S"
            },
            {
               "AttributeName":"employee_id",
               "AttributeType":"S"
            },
            {
               "AttributeName":"name",
               "AttributeType":"S"
            }
         ],
         "CreationDateTime":1590068547.564,
         "ItemCount":0,
         "KeySchema":[
            {
               "AttributeName":"employee_id",
               "KeyType":"HASH"
            },
            {
               "AttributeName":"name",
               "KeyType":"RANGE"
            }
         ],
         "LocalSecondaryIndexes":[
            {
               "IndexArn":"arn:aws:dynamodb:us-east-2:610968236798:table/Employee_Details/index/department",
               "IndexName":"department",
               "IndexSizeBytes":0,
               "ItemCount":0,
               "KeySchema":[
                  {
                     "AttributeName":"employee_id",
                     "KeyType":"HASH"
                  },
                  {
                     "AttributeName":"department",
                     "KeyType":"RANGE"
                  }
               ],
               "Projection":{
                  "ProjectionType":"KEYS_ONLY"
               }
            }
         ],
         "ProvisionedThroughput":{
            "NumberOfDecreasesToday":0,
            "ReadCapacityUnits":5,
            "WriteCapacityUnits":5
         },
         "TableArn":"arn:aws:dynamodb:us-east-2:610968236798:table/Employee_Details",
         "TableId":"10520308-ae1e-4742-b9d4-fc6aae67191e",
         "TableName":"Employee_Details",
         "TableSizeBytes":0,
         "TableStatus":"CREATING"
      }
   }
    
   ```
2. Insert the employee details (items) into the specified table. Invoke `insertdetails` resource with the following payload.

   **Sample request**
   
   ```json
   {
      "tableName":"Employee_Details",
      "item":{
         "employee_id":{
            "S":"001"
         },
         "name":{
            "S":"Jhone Fedrick"
         },
         "department":{
            "S":"Engineering"
         }
      }
   }
   ```
   
   **Expected Response**
   
   ``` 
   {}
   ``` 
3. Update the specified table. Invoke `updatetable` resource with the following payload.
   
   **Sample request**
   
   ```json
   {
      "tableName":"Employee_Details",
      "provisionedThroughput":{
         "ReadCapacityUnits":12,
         "WriteCapacityUnits":12
      }
   }
   ```
   
   **Expected Response**
   
   ```json
   {
      "TableDescription":{
         "AttributeDefinitions":[
            {
               "AttributeName":"department",
               "AttributeType":"S"
            },
            {
               "AttributeName":"employee_id",
               "AttributeType":"S"
            },
            {
               "AttributeName":"name",
               "AttributeType":"S"
            }
         ],
         "CreationDateTime":1590068547.564,
         "ItemCount":0,
         "KeySchema":[
            {
               "AttributeName":"employee_id",
               "KeyType":"HASH"
            },
            {
               "AttributeName":"name",
               "KeyType":"RANGE"
            }
         ],
         "LocalSecondaryIndexes":[
            {
               "IndexArn":"arn:aws:dynamodb:us-east-2:610968236798:table/Employee_Details/index/department",
               "IndexName":"department",
               "IndexSizeBytes":0,
               "ItemCount":0,
               "KeySchema":[
                  {
                     "AttributeName":"employee_id",
                     "KeyType":"HASH"
                  },
                  {
                     "AttributeName":"department",
                     "KeyType":"RANGE"
                  }
               ],
               "Projection":{
                  "ProjectionType":"KEYS_ONLY"
               }
            }
         ],
         "ProvisionedThroughput":{
            "LastIncreaseDateTime":1590071461.81,
            "NumberOfDecreasesToday":0,
            "ReadCapacityUnits":5,
            "WriteCapacityUnits":5
         },
         "TableArn":"arn:aws:dynamodb:us-east-2:610968236798:table/Employee_Details",
         "TableId":"10520308-ae1e-4742-b9d4-fc6aae67191e",
         "TableName":"Employee_Details",
         "TableSizeBytes":0,
         "TableStatus":"UPDATING"
      }
   }
   ```
4. Retrieve information about the added employee details (items). Invoke `listdetails` resource with the following payload.
   
   **Sample request**
   
   ```json
   {
      "tableName":"Employee_Details",
      "key":{
         "employee_id":{
            "S":"001"
         },
         "name":{
            "S":"Jhone Fedrick"
         }
      }
   }
   ```
   
   **Expected Response**
   
   ```json
   {
      "Item":{
         "department":{
            "S":"Engineering"
         },
         "name":{
            "S":"Jhone Fedrick"
         },
         "employee_id":{}
      }
   }
    
   ```
5. Remove added employee details from the specified table (items). Invoke `deletedetails` resource with the following payload.
   
   **Sample request**
   
   ```json
   {
      "tableName":"Employee_Details",
      "key":{
         "employee_id":{
            "S":"001"
         },
         "name":{
            "S":"Jhone Fedrick"
         }
      }
   }
   ```
   
   **Expected Response**
   
   ```json
   {
      "Attributes":{
         "department":{
            "S":"Engineering"
         },
         "name":{
            "S":"Jhone Fedrick"
         },
         "employee_id":{
            "S":"001"
         }
      },
      "ConsumedCapacity":{
         "CapacityUnits":2,
         "TableName":"Employee_Details"
      }
   } 
   ```  
6. Retrieve information about the created tables. Invoke `listtable` resource with the following payload.
   
   **Sample request**
   
   ```json
   {
      "exclusiveStartTableName":"Employee_Details",
      "limit":4
   }
   ```
   
   **Expected Response**
   
   ```json
   {
      "LastEvaluatedTableName":"TTestMyTablehread",
      "TableNames":[
         "Results",
         "Results1",
         "Results123",
         "TTestMyTablehread"
      ]
   } 
   ``` 

7. Remove the created table in the Amazon DynamoDB. Invoke `deletetable` resource with the following payload.
   
   **Sample request**
   
   ```json
   {
   	"tableName":"Employee_Details"
   }
   
   ```
   
   **Expected Response**
   
   ```json
   {
      "TableDescription":{
         "ItemCount":0,
         "ProvisionedThroughput":{
            "NumberOfDecreasesToday":0,
            "ReadCapacityUnits":12,
            "WriteCapacityUnits":12
         },
         "TableArn":"arn:aws:dynamodb:us-east-2:610968236798:table/Employee_Details",
         "TableId":"10520308-ae1e-4742-b9d4-fc6aae67191e",
         "TableName":"Employee_Details",
         "TableSizeBytes":0,
         "TableStatus":"DELETING"
      }
   }
   ```
