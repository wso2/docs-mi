# DB Event Inbound Endpoint Example 

The following are the main features of the event generator. 

1. Trigger an event with the data of the table row when a new record is added or updated. Optionally, delete the row associated with the event after triggering the event.
2. Trigger an event when a boolean field is flipped in a particular table row. 

## What you'll build

In this example let us see how to configure `DB-event Inbound Endpoint` so that it can listen to data changes done to a `MySQL` table. Out of the features mentioned above, feature no:1 is used here. Please refer to [reference guide]({{base_path}}/reference/connectors/db-event-inbound-endpoint/db-event-inbound-endpoint-config/) if you need to use other features. 

In an enterprise system, a relational database table is used to store customer information. Customers' information is added by an external system to the database which is not in the enterprise's control. As soon as a new customer is inserted, the system needs to pick up and process its data. The integration runtime is used here to listen to DB changes and invoke the relevant processes. It can invoke backend APIs or place data into a message bus after required data transformations. However, for simplicity of this example, we will just log the message. You can extend the sample as required using WSO2 mediators. 

The following diagram shows the overall solution we are going to build. The external system will update the MySQL DB and the integration runtime will trigger events based on the inserts and updates. 

<img src="{{base_path}}/assets/img/integrate/connectors/db-event-diagram.png" title="Overview of DB event inbound EP use case" width="600" alt="Overview of DB event inbound EP use case"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the environment 

First, install [MySQL database](https://www.mysql.com/downloads/) locally. If you have a remote server, please obtain the credentials required to connect. In this example, database credentials are assumed as username=`root` and password=`root`. 

1. Create a database called `test`. Then create a table called `CDC_CUSTOM` under that database using the following SQL script. 
  ```sql
  CREATE TABLE `test`.`CDC_CUSTOM` (
    `ID` INT NOT NULL,
    `NAME` VARCHAR(45) NULL,
    `ADDRESS` VARCHAR(45) NULL,
    `AMOUNT` INT NULL,
    PRIMARY KEY (`ID`));
  ```

2. We need an additional column to track new records. If you apply this feature to an existing database table, you can alter the table as shown below. It will add a column of type `TIMESTAMP`, which gets automatically updated when you insert or update a record. 
  ```sql
  ALTER TABLE test.CDC_CUSTOM
  ADD COLUMN UPDATED_AT 
    TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP;
  ```


## Configure inbound endpoint using micro integrator

1. Create an **Integration Project** as below. 
<img src="{{base_path}}/assets/img/integrate/connectors/db-event-inbound-create-project.png" title="Creating a new Integration Project" width="800" alt="Creating a new Integration Project" />

2. Create two sequences to process the database event and handle the failure of the database event. 
  <br/>
  Sequence to process the database event 
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="DBEventProcessSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log description="event log" level="full">
            <property name="message" value="event received"/>
        </log>
    </sequence>
    ```
  <br/>
  Sequence to handle the failure of the database event
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="eventProcessFailSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property name="SET_DB_ROLLBACK_ONLY" scope="default" type="STRING" value="true"/>
        <log level="full">
            <property name="MESSAGE" value="Executing default 'fault' sequence"/>
            <property expression="get-property('ERROR_CODE')" name="ERROR_CODE" xmlns:ns="http://org.apache.synapse/xsd"/>
            <property expression="get-property('ERROR_MESSAGE')" name="ERROR_MESSAGE" xmlns:ns="http://org.apache.synapse/xsd"/>
        </log>
        <drop/>
    </sequence>
    ```

3. Click on `+` sign beside the `Inbound Endpoints` and select `Custom` to add a new **custom inbound endpoint**.</br> 
  <img src="{{base_path}}/assets/img/integrate/connectors/db-event-inbound-ep.png" title="Creating DB event inbound endpoint" width="800" alt="Creating DB event inbound endpoint" style="border:1px solid black"/>
  <br/>
  Configure the custom inbound endpoint as below. Please note that you need to update the URL, username, and password as required. <br/>
    <img src="{{base_path}}/assets/img/integrate/connectors/db-event-inbound-ep-config-1.png" title="Configure DB event inbound endpoint 1" width="600" alt="Configure DB event inbound endpoint 1" style="border:1px solid black"/>
    <img src="{{base_path}}/assets/img/integrate/connectors/db-event-inbound-ep-config-2.png" title="Configure DB event inbound endpoint 2" width="600" alt="Configure DB event inbound endpoint 2" style="border:1px solid black"/>
  <br/>
  The source view of the created custom inbound endpoint will be as below. 
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <inboundEndpoint class="org.wso2.carbon.inbound.poll.dbeventlistener.DBEventPollingConsumer" name="CustomerDBEventEP" onError="eventProcessFailSeq" sequence="DBEventProcessSeq" suspend="false" xmlns="http://ws.apache.org/ns/synapse">
      <parameters>
          <parameter name="interval">1000</parameter>
          <parameter name="class">org.wso2.carbon.inbound.poll.dbeventlistener.DBEventPollingConsumer</parameter>
          <parameter name="sequential">true</parameter>
          <parameter name="coordination">true</parameter>
          <parameter name="inbound.behavior">polling</parameter>
          <parameter name="driverName">com.mysql.jdbc.Driver</parameter>
          <parameter name="url">jdbc:mysql://localhost/test</parameter>
          <parameter name="username">root</parameter>
          <parameter name="password">root</parameter>
          <parameter name="tableName">CDC_CUSTOM</parameter>
          <parameter name="filteringCriteria">byLastUpdatedTimestampColumn</parameter>
          <parameter name="filteringColumnName">UPDATED_AT</parameter>
          <parameter name="primaryKey">ID</parameter>
          <parameter name="connectionValidationQuery">SELECT 1</parameter>
          <parameter name="registryPath">dbEventIE/timestamp</parameter>
      </parameters>
  </inboundEndpoint>
  ```


## Export integration logic as a carbon application

Follow the steps provided in the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/db-event-listener.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the database details and make other such changes before deploying and running this project.

## Deployment

1. Navigate to the [connector store](https://store.wso2.com/store/assets/esbconnector/list) and search for `DB Event Listener`. Click on `DB Event Listener` and download the .jar file by clicking on `Download Inbound Endpoint`. Copy this .jar file into the <PRODUCT-HOME>/lib folder. 

2. Download [`mysql-connector-java`](https://dev.mysql.com/downloads/connector/j/) associated with `MySQL` server version and add it to the <PRODUCT-HOME>/lib folder.`

3. Copy the exported carbon application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder. 

4. Start the server 

Now the integration runtime will start listening to the data changes of `CDC_CUSTOM` table. 

## Test

### Add a new record

1. Using the MySQL terminal, execute the following SQL to insert a new customer record into the table. 
  ```sql
  INSERT INTO `test`.`CDC_CUSTOM` (`ID`, `NAME`, `ADDRESS`, `AMOUNT`) VALUES (001, "john", "22/3, Tottenham Court, London" , 1000);
  ```
2. You can see a log entry in the WSO2 server console similar to the following. 
  ```
  [2024-07-12 10:46:25,674]  INFO {LogMediator} - To: , MessageID: urn:uuid:C33BFFBFC43BA2E8581720761385599, Direction: request, message = event received, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"><soapenv:Body><Record><ID>1</ID><NAME>john</NAME><ADDRESS>22/3, Tottenham Court, London</ADDRESS><AMOUNT>1000</AMOUNT><UPDATED_AT>2024-07-12 10:46:25.0</UPDATED_AT></Record></soapenv:Body></soapenv:Envelope>
  ```

3. If you add another new record, only that new record will get notified to the integration runtime and the old records will be ignored.


### Update an existing record 

1. Using the MySQL terminal, execute the following SQL to update the added record. 
  ```sql
  UPDATE `test`.`CDC_CUSTOM` SET AMOUNT = 2000 WHERE ID = 001;
  ```
2. You can see a log entry in the WSO2 server console similar to the following.
  ```
  [2024-07-12 10:53:10,500]  INFO {LogMediator} - To: , MessageID: urn:uuid:C33BFFBFC43BA2E8581720761790499, Direction: request, message = event received, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"><soapenv:Body><Record><ID>1</ID><NAME>john</NAME><ADDRESS>22/3, Tottenham Court, London</ADDRESS><AMOUNT>2000</AMOUNT><UPDATED_AT>2024-07-12 10:53:09.0</UPDATED_AT></Record></soapenv:Body></soapenv:Envelope>
  ```

> **Note**: You can do any type of advanced integration using the rich mediator catalog, not just logging. 

## What's next

* To customize this example for your own scenario, see [DB Event Inbound Endpoint Configuration]({{base_path}}/reference/connectors/db-event-inbound-endpoint/db-event-inbound-endpoint-config/) documentation for all configuration options of the endpoint.
