# Snowflake connector example

The Snowflake Connector allows you to access the [Snowflake JDBC Driver API](https://docs.snowflake.com/developer-guide/jdbc/jdbc) from an integration sequence. This provides functionalities to execute a set of standard Snowflake DDL, DML, and query commands. You can use the connector to perform query, execute, and batch-execute operations on Snowflake databases. 

## What you'll build

This example demonstrates how to use the Snowflake Connector for querying, inserting, batch-inserting, and deleting data in a Snowflake database. Let's consider a use case involving a hotel database for managing reservations. Within the hotel database, there is a table named RESERVATIONS that stores reservation details.

1. Insert a single record into the Snowflake database.
2. Insert multiple records into the Snowflake database.
3. Query data from the Snowflake database.
4. Delete data from the Snowflake database.

All operations are exposed via an API. The API with the context `/snowflakeconnector` has 4 resources.

* `/insertReservation`: Insert a single reservation into the Snowflake database.
* `/insertReservationBatch`: Insert a batch of reservations to the Snowflake database.
* `/getReservationInfo`: Retrieve all the reservations from the Snowflake database.
* `/deleteReservation`: Delete a reservation from the Snowflake database.

## Before you begin

Before you begin, you must have a valid Snowflake account. To use the Snowflake database, you must have a valid Snowflake account. To create a snowflake account, please visit the official Snowflake website and complete the registration process. Once registered you will obtain a username and password with which you can log in to your Snowflake account, and the account identifier which is the unique identifier for your Snowflake account within your business entity and the Snowflake network.

1. Create a database named `HOTEL_DB` in Snowflake.
2. Select the `PUBLIC` schema and create a table named `RESERVATIONS` with the following columns.

```sql
create table RESERVATIONS (
   NICNUMBER String,
   FIRSTNAME String,
   LASTNAME String,
   CHECKIN String,
   CHECKOUT String,
   ADULTS INT,
   CHILDREN INT,
   ROOMTYPE String,
   SPECIALREQUESTS String
)
```

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

### Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

   <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-create-project.png" title="Create new Integration Project" width="800" alt="Create new Integration Project"/>


### Add integration logic

First, create a REST API called `SnowflakeConnectorApi` in your project.

| Name | Context |
| ---------------- | ---------------- |
| SnowflakeConnectorApi  | /snowflakeconnector  |

Create the following resources in the 'SnowflakeConnectorApi' REST API.

| uri-template               | method  |
|----------------------------|-------- |
| `/insertReservation`         | POST    |
| `/getReservationInfo`        | GET     |
| `/insertReservationBatch`    | POST    |
| `/deleteReservation/{NICNUMBER}`         | DELETE  |

Let's add the operations to the resources in the `SnowflakeConnectorApi` API.

#### - /insertReservation

Users can utilize this resource to insert a single record into the Snowflake database. The user will send the reservation payload in the request body.

1. In the API insequence add the [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) to extract the payload from the request body. Let's store the payload in a property named `payload`.
    ```xml
      <property expression="json-eval($)" name="payload" scope="default" type="STRING"/>
   ```

2. Add the `execute` operation from the **SnowflakeConnector** section.

      <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-execute-operation.png" title="Add execute operation from connector" width="800" alt="Add execute operation from connector"/>
      
      1. Then in the appearing window, you see an option to add a new connection. Click on `Add new connection` to initiate a new Snowflake Connection. 
         
         <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-connection-config.png" title="Snowflake Connection Config" width="400" alt="Snowflake Connection Config"/>
         
         1. In the **Connection Configurations** section give a name for `Snowflake Connection`.
         2. Provide your Snowflake Account Identifier in the `Account Identifier` text box.
         3. Provide your Snowflake username in the `Username` text box.
         4. Provide your Snowflake password in the `Password` text box.
         5. Click **Add**.
      
      2. Select the created connection for the `execute` operation. 
      3. In the `Execute Query` text box, enter the following query.
         ```sql
         INSERT INTO HOTEL_DB.PUBLIC.RESERVATIONS (NICNUMBER, FIRSTNAME, LASTNAME, CHECKIN, CHECKOUT, ADULTS, CHILDREN, ROOMTYPE, SPECIALREQUESTS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ```
      4. For the `Payload` text box, enter `$ctx:payload` as an expression.
         
         <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-execute-config.png" title="Execute Config" width="400" alt="Snowflake Execute Config"/>

         ```xml
         <snowflake.execute configKey="SNOWFLAKE_CONNECTION">
            <executeQuery>INSERT INTO HOTEL_DB.PUBLIC.RESERVATIONS (NICNUMBER, FIRSTNAME, LASTNAME, CHECKIN, CHECKOUT, ADULTS, CHILDREN, ROOMTYPE, SPECIALREQUESTS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)</executeQuery>
            <payload>{$ctx:payload}</payload>
         </snowflake.execute>
         ```

3. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response.
   
#### - /getReservationInfo

Using this resource users retrieve all records from table `Reservations` of `HOTEL_DB`.

1. Add the `query` operation from the **SnowflakeConnector** section.

      <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-query-operation.png" title="Snowflake query operation" width="800" alt="Snowflake query operation"/>

      1. Select the Snowflake connection configuration you created.
      2. In the `Sql Query` text box, enter the following query.
      
         ```sql
         SELECT * FROM HOTEL_DB.PUBLIC.RESERVATIONS
         ```

         <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-query-config.png" title="Snowflake query configuration" width="400" alt="Snowflake query configuration"/>

         ```xml
         <snowflake.query configKey="SNOWFLAKE_CONNECTION">
            <query>SELECT * FROM HOTEL_DB.PUBLIC.RESERVATIONS</query>
         </snowflake.query>
         ```

2. Add the [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) and set the Property name as `messageType` and the value as `application/json`. This is added so that the response will be in JSON.
   ```xml
    <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
   ```
3. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response.

#### - /insertReservationBatch

Using this resource users can insert multiple records into the table `Reservations` of `HOTEL_DB`. The user will send the bulk payload in the request body.

1. In the API insequence add the [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) to extract the payload from the request body. Let's store the payload in a property called `payload`.
    ```xml
      <property expression="json-eval($)" name="payload" scope="default" type="STRING"/>
    ```
2. Add the `batchExecute` operation from the **SnowflakeConnector** section.

      <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-batch-execute-operation.png" title="Snowflake batch execute operation" width="800" alt="Snowflake batch execute operation"/>
      
      1. Select the Snowflake connection configuration you created.
      2. In the `Execute Query` text box, enter the following query.
         ```sql
         INSERT INTO HOTEL_DB.PUBLIC.RESERVATIONS (NICNUMBER, FIRSTNAME, LASTNAME, CHECKIN, CHECKOUT, ADULTS, CHILDREN, ROOMTYPE, SPECIALREQUESTS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ```
      3. For the `Payload` text box, enter `$ctx:payload` as an expression.

         <img src="{{base_path}}/assets/img/integrate/connectors/snowflake_connector/snowflake-conn-batch-execute-config.png" title="Snowflake batch execute operation config" width="400" alt="Snowflake batch execute operation config"/>

         ```xml
         <snowflake.batchExecute configKey="SNOWFLAKE_CONNECTION">
            <executeQuery>INSERT INTO HOTEL_DB.PUBLIC.RESERVATIONS (NICNUMBER, FIRSTNAME, LASTNAME, CHECKIN, CHECKOUT, ADULTS, CHILDREN, ROOMTYPE, SPECIALREQUESTS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)</executeQuery>
            <payload>{$ctx:payload}</payload>
         </snowflake.batchExecute>
         ```

      5. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response.

#### - /deleteReservation/{NICNUMBER}

Using this resource users can delete a record in table `Reservations` of `HOTEL_DB`. The user will provide the NICNUMBER as a path parameter.

1. In the API insequence add the [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) to construct the delete query. Let's store the query in a property named `deleteQuery`.
    ```xml
      <property expression="fn:concat('DELETE FROM HOTEL_DB.PUBLIC.RESERVATIONS WHERE NICNUMBER=',get-property('uri.var.NICNUMBER'))" name="deleteQuery" scope="default" type="STRING"/>
    ```
2. Add the `execute` operation from the **SnowflakeConnector** section.
      1. Select the Snowflake connection configuration you created.
      3. In the `Execute Query` text box, enter `$ctx:deleteQuery` as an expression.
         ```xml
         <snowflake.execute configKey="SNOWFLAKE_CONNECTION">
            <executeQuery>{$ctx:deleteQuery}</executeQuery>
         </snowflake.execute>
         ```
3. Add the [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) and set the Property name as `messageType` and the value as `application/json`. This is added so that the response will be in JSON.
   ```xml
    <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
   ```
4. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response.

??? info "The resources are now ready to be tested. The API source should resemble the following. Expand to see."
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <api context="/snowflakeconnector" name="SnowflakeConnectorApi" xmlns="http://ws.apache.org/ns/synapse">
         <resource methods="POST" uri-template="/insertReservation">
            <inSequence>
               <property name="payload" scope="default" type="STRING" expression="json-eval($)"/>
               <snowflake.execute configKey="SNOWFLAKE_CONNECTION_1">
                  <executeQuery>INSERT INTO HOTEL_DB.PUBLIC.RESERVATIONS (NICNUMBER, FIRSTNAME, LASTNAME, CHECKIN, CHECKOUT, ADULTS, CHILDREN, ROOMTYPE, SPECIALREQUESTS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)</executeQuery>
                  <payload>{$ctx:payload}</payload>
               </snowflake.execute>
               <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
         </resource>
         <resource methods="GET" uri-template="/getReservationInfo">
            <inSequence>
               <snowflake.query configKey="SNOWFLAKE_CONNECTION_1">
                  <query>SELECT * FROM HOTEL_DB.PUBLIC.RESERVATIONS</query>
               </snowflake.query>
               <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
               <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
         </resource>
         <resource methods="POST" uri-template="/insertReservationBatch">
            <inSequence>
               <property expression="json-eval($)" name="payload" scope="default" type="STRING"/>
               <snowflake.batchExecute configKey="SNOWFLAKE_CONNECTION_1">
                  <executeQuery>INSERT INTO HOTEL_DB.PUBLIC.RESERVATIONS (NICNUMBER, FIRSTNAME, LASTNAME, CHECKIN, CHECKOUT, ADULTS, CHILDREN, ROOMTYPE, SPECIALREQUESTS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)</executeQuery>
                  <payload>{$ctx:payload}</payload>
               </snowflake.batchExecute>
               <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
         </resource>
         <resource methods="DELETE" uri-template="/deleteReservation/{NICNUMBER}">
            <inSequence>
               <property expression="fn:concat('DELETE FROM HOTEL_DB.PUBLIC.RESERVATIONS WHERE NICNUMBER=',get-property('uri.var.NICNUMBER'))" name="deleteQuery" scope="default" type="STRING"/>
               <snowflake.execute configKey="SNOWFLAKE_CONNECTION_1">
                  <executeQuery>{$ctx:deleteQuery}</executeQuery>
               </snowflake.execute>
               <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
               <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
         </resource>
      </api>
      ```

## Export integration logic as a carbon application 

To export the project, please refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/snowflake-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip "You may need to update the values of Snowflake connection configurations before deploying and running this project."

## Deployment

To deploy and run the project, please refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

### Test the resources

Let's test the API. Deploy the carbon application and start the Micro Integrator.

1. Insert Reservation Resource
    1. Create a file called `payload.json` with the following payload.
        ```json
        {
            "NICNUMBER": "9876543210",
            "FIRSTNAME": "Alice",
            "LASTNAME": "Johnson",
            "CHECKIN": "2023-10-01",
            "CHECKOUT": "2023-10-05",
            "ADULTS": 1,
            "CHILDREN": 0,
            "ROOMTYPE": "Single",
            "SPECIALREQUESTS": "Quiet room"
        }
        ```
    2. Invoke the API as shown below using the curl command.
        ```bash
        curl -H "Content-Type: application/json" --request POST --data @payload.json http://localhost:8290/snowflakeconnector/insertReservation
        ```
       **Expected Response**:
       You should get a response as below.
       ```json
       {
         "operation":"execute",
         "isSuccessful":true,
         "message":"Rows affected :  1"
       }
       ```

2. Insert Reservation Batch Resource
      1. Create a file called `payload.json` with the following payload.
         ```json
         [
         {
            "NICNUMBER": "2345678901",
            "FIRSTNAME": "Emma",
            "LASTNAME": "Williams",
            "CHECKIN": "2024-06-01",
            "CHECKOUT": "2024-06-05",
            "ADULTS": "1",
            "CHILDREN": "0",
            "ROOMTYPE": "Single",
            "SPECIALREQUESTS": "Late check-in"
            },
            {
               "NICNUMBER": "1234567890",
               "FIRSTNAME": "Bob",
               "LASTNAME": "Smith",
               "CHECKIN": "2023-10-01",
               "CHECKOUT": "2023-10-05",
               "ADULTS": 2,
               "CHILDREN": 1,
               "ROOMTYPE": "Double",
               "SPECIALREQUESTS": "Extra bed"
            }
         ]
         ```
      2. Invoke the API as shown below using the curl command.
         ```bash
         curl -H "Content-Type: application/json" --request POST --data @payload.json http://localhost:8290/snowflakeconnector/insertReservationBatch
         ```
         **Expected Response**:
         You should get a response as below.

         ```json
         {
            "operation":"batchExecute",
            "isSuccessful":true,
            "message":"Successfully executed 2 statements out of 2 statements."
         }
         ```
       
3. Get Reservation Info Resource
      1. Invoke the API as shown below using the curl command.
         ```bash
         curl -H "Content-Type: application/json" --request GET http://localhost:8290/snowflakeconnector/getReservationInfo
         ```
         **Expected Response**:
         You should receive a response as below.
         ```json
         [
            {
               "NICNUMBER":"9876543210",
               "FIRSTNAME":"Alice",
               "LASTNAME":"Johnson",
               "CHECKIN":"2023-10-01",
               "CHECKOUT":"2023-10-05",
               "ADULTS":"1",
               "CHILDREN":"0",
               "ROOMTYPE":"Single",
               "SPECIALREQUESTS":"Quiet room"
            },
            {
               "NICNUMBER":"2345678901",
               "FIRSTNAME":"Emma",    
               "LASTNAME":"Williams",
               "CHECKIN":"2024-06-01",
               "CHECKOUT":"2024-06-05", 
               "ADULTS":"1",
               "CHILDREN":"0",
               "ROOMTYPE":"Single",
               "SPECIALREQUESTS":"Late check-in"
            },
            {
               "NICNUMBER":"1234567890",
               "FIRSTNAME":"Bob",
               "LASTNAME":"Smith",
               "CHECKIN":"2023-10-01",
               "CHECKOUT":"2023-10-05",
               "ADULTS":"2",
               "CHILDREN":"1",
               "ROOMTYPE":"Double",
               "SPECIALREQUESTS":"Extra bed"
            }
         ]
         ```
4. Delete Reservation Resource
    1. Invoke the API as shown below using the curl command.
        ```bash
        curl -H "Content-Type: application/json" --request DELETE http://localhost:8290/snowflakeconnector/deleteReservation/9876543210
        ```
        **Expected Response**:
        You should receive a response as below.
        ```json
        {
          "operation":"execute",
          "isSuccessful":true,
          "message":"Rows affected :  1"
        }
        ```

## What's next

- To customize this example for your own scenario, see [Snowflake Connector Configuration]({{base_path}}/reference/connectors/snowflake-connector/snowflake-connector-reference/) documentation for all operation details of the connector.