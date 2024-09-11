# CDC Inbound Endpoint Example 

The CDC (Change Data Capture) inbound endpoint enables you to capture changes made to data in a database. Consider a scenario where the database crashes at some point, leading to the loss of data related to certain operations. This highlights the need to synchronize the data with a cloud-based backup storage. To minimize risk, updating the cloud storage in real time is preferable to batch updates. Therefore, it is important to detect modification events and update the cloud storage accordingly. The CDC inbound endpoint can be used for this purpose.

## What you'll build

This scenario demonstrates how the CDC inbound endpoint can be used to capture changes occurring in a MySQL database. In this example, we will configure the **CDC Inbound Endpoint** to capture changes made to a MySQL table, such as insertions, updates, and deletions.

In this example, a relational database table is used to store product information. The product data is added to the database by an external system that is outside of the enterprise's control. As soon as a new product is inserted, the system needs to detect and process the data. The integration runtime is used here to listen for database changes and trigger the relevant processes. It can either invoke backend APIs or place the data onto a message bus after performing the necessary data transformations. However, for the sake of simplicity in this example, we will simply log the message. You can extend this example as needed using WSO2 mediators.

## Set up the environment 

1. First, install [MySQL database](https://www.mysql.com/) locally. If you have a remote server, please obtain the credentials required to connect.  

2. Connect to MySQL server.

3. Create a database called `inventory`. 
    ```sql
    CREATE DATABASE inventory;
    ```

4. Switch to the database `inventory`.
    ```sql
    USE inventory;
    ```

4. Then, create a table called `products` under that database using the following SQL script. 
    ```sql
    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price REAL NOT NULL
    );
    ```

5. Create a user. For detailed instructions, refer to the [MySQL Creating User](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-creating-user) documentation. 

6. Enable binlog. For detailed instructions, refer to the [Enable MySQL Binlog](https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-binlog) documentation. 

7. Enable GTIDs. For detailed instructions, refer to the [Enable MySQL GTIDs](https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-gtids) documentation. 

## Configure inbound endpoint using Micro Integrator

{!includes/create-new-project.md!}

4. Create a sequence to process the capturing of a data change. 

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="cdc-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" level="full"/>
    </sequence>
    ```

5. Create a sequence to process any errors. 

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="cdc-inboundErrorSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" level="full"/>
    </sequence>
    ```

6. Click on **+** sign beside the **Inbound Endpoints** and select **CDC** to add a new **CDC Inbound Endpoint**.

7. The source view of the created CDC inbound endpoint will be as below. 
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="cdc" class="org.wso2.carbon.inbound.cdc.CDCPollingConsumer" sequence="cdc-inboundSequence" onError="cdc-inboundErrorSequence" suspend="false">
        <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="interval">1000</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="snapshot.mode">initial</parameter>
            <parameter name="connector.class">io.debezium.connector.mysql.MySqlConnector</parameter>
            <parameter name="database.hostname">localhost</parameter>
            <parameter name="database.port">3306</parameter>
            <parameter name="database.user">root</parameter>
            <parameter name="database.password"></parameter>
            <parameter name="database.dbname">inventory</parameter>
            <parameter name="database.server.id">1</parameter>
            <parameter name="table.include.list">inventory.products</parameter>
            <parameter name="allowed.operations">update, create, delete</parameter>
        </parameters>
    </inboundEndpoint>
    ```

8. Download the latest Debezium Orbit JAR from [nexus](https://maven.wso2.org/nexus/content/repositories/public/org/wso2/orbit/debezium/debezium/) and place it in `<PROJECT_HOME>/deployment/libs` directory. Here, `<PROJECT_HOME>` refers to the directory path where your integration project is located.

9. Download the JDBC driver from the [MySQL website](https://dev.mysql.com/downloads/connector/j/), and copy it into the `<PROJECT_HOME>/deployment/libs` directory.

!!! info 
    If you're using a different database, you'll need to download the appropriate JDBC driver and place it in the `<PROJECT_HOME>/deployment/libs` directory.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/cdc-inbound-endpoint.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the database details and make other such changes before deploying and running this project.

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

## Test

### Add a new record

1. In the MySQL terminal, execute the following SQL command to insert a new product record into the `products` table:

    ```sql
    INSERT INTO products (name, price) VALUES ('IPhone 14', 333.99);
    ```

2. You will see a log entry in the WSO2 server console similar to the following:

    ```
    [2024-08-22 14:45:12,996]  INFO {LogMediator} - {inboundendpoint:cdc-inbound-endpoint} To: , MessageID: urn:uuid:5F9F8759FEEABE8BAD1724318113031, Direction: request, Payload: {"op":"CREATE","before":null,"after":{"id":12,"name":"IPhone 14","price":333.99}}
    ```

### Update an existing record 

1. In the MySQL terminal, execute the following SQL command to update the name of a product in the `products` table:

    ```sql
    UPDATE products SET name = 'IPhone 15' WHERE id = 12;
    ```

2. You will see a log entry in the WSO2 server console similar to the following:

    ```
    [2024-08-22 14:49:50,195]  INFO {LogMediator} - {inboundendpoint:cdc-inbound-endpoint} To: , MessageID: urn:uuid:5F9F8759FEEABE8BAD1724318390233, Direction: request, Payload: {"op":"UPDATE","before":{"id":12,"name":"IPhone 14","price":333.99},"after":{"id":12,"name":"IPhone 15","price":333.99}}
    ```

## Delete an existing record

1. In the MySQL terminal, execute the following SQL command to delete a product record from the `products` table:

    ```sql
    DELETE FROM products WHERE id = 12;
    ```

2. You will see a log entry in the WSO2 server console similar to the following:

    ```
    [2024-08-22 14:53:45,570]  INFO {LogMediator} - {inboundendpoint:cdc-inbound-endpoint} To: , MessageID: urn:uuid:5F9F8759FEEABE8BAD1724318625607, Direction: request, Payload: {"op":"DELETE","before":{"id":12,"name":"IPhone 15","price":333.99},"after":null}
    ```

> **Note**: You can do any type of advanced integration using the available mediators in the [Mediator Catalog]({{base_path}}/reference/mediators/about-mediators/) documentation, not just logging. 
