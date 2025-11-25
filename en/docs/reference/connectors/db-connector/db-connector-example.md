# DB Connector Example

The DB Connector can be used to interact with relational databases using JDBC, perform CRUD operations, call stored procedures, and manage transactions.

## What you'll build
This example demonstrates how to use the DB Connector to create a simple Order Management API.

**GET `/place_order`**: Accepts new order details (customer ID, product ID, quantity). It checks product availability, inserts the order details into `Orders` and `OrderItems` tables, and updates the product inventory in the `Products` table, all within a single database transaction. It returns the newly created `order_id`.

This example showcases:

*   Using `select`, `insert`, and `executeQuery` operations.
*   Using prepared statements for security and efficiency.
*   Managing database transactions (`beginTransaction`, `commitTransaction`, `rollbackTransaction`).
*   Retrieving auto-generated keys.
*   Conditional processing based on database query results (Filter mediator).
*   Reading URI parameters and request payloads.

### Database Schema (Example - MySQL)

You'll need a database with the following tables and sample data:

```sql
-- Products Table
CREATE TABLE Products (
    product_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL
);

-- Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT, -- Or SERIAL for PostgreSQL
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT, -- Or SERIAL for PostgreSQL
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'PENDING',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- OrderItems Table
CREATE TABLE OrderItems (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT, -- Or SERIAL for PostgreSQL
    order_id INT NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Sample Data
INSERT INTO Products (product_id, name, price, stock_quantity) VALUES
('PROD001', 'Super Widget', 19.99, 100),
('PROD002', 'Mega Gadget', 45.50, 50);

INSERT INTO Customers (customer_id, customer_name, email) VALUES
(101, 'Alice Wonderland', 'alice@example.com'),
(102, 'Bob The Builder', 'bob@example.com');
```

## Set up the integration project

1.  Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up an **Integration Project**.
2.  Create the `ordersAPI` API. Follow the steps in the [create an api]({{base_path}}/develop/creating-artifacts/creating-an-api/#create-an-api-artifact) guide to create the API.
3.  Click on the three dots next to the GET resource of created API and select **Edit**.
4.  Set the resource path as `/place_order`
5.  Click **Add Query Param** and set the name as `customerId` and click **Add**.
6.  Repeat the above step to add the following query parameters:
    *   `productId`
    *   `quantity`
7. Click **Update** to save the changes.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/add-query-param.png" title="Add Query Param" width="800" alt="Add Query Param"/>

8. Click on the updated resource. It opens the API in the diagram view. Then click on the + button below to START to add connectors or mediators
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/add-connector.png" title="Add Connector" width="800" alt="Add Connector"/>

9. Click on the **Connections** tab and click on the **Add new connection** button.
10. Search for **MySQL** and select the MySQL connection. Under the DB Connector you will see the supported Database types that you can select from.

    <img src="{{base_path}}/assets/img/integrate/connectors/db/add-mysql-connection.png" title="Add MySQL Connection" width="800" alt="Add MySQL Connection"/>
    
11. Fill in the connection details and click **Add**.
    *   **Connection Name**: `DBCon1`
    *   **JDBC URL**: `jdbc:mysql://localhost:3306/your_database_name`
    *   **Username**: `your_db_username`
    *   **Password**: `your_db_password`
    *   **JDBC Driver Select Options**: If you want to use your own driver, select "Select Local Driver" or "Add Maven Dependency" options. For this example let's use the default driver.
    
    <img src="{{base_path}}/assets/img/integrate/connectors/db/add-connection-details.png" title="Add Connection Details" width="800" alt="Add Connection Details"/>

    Once you add the connection the connector operations will be shown as below.

    <img src="{{base_path}}/assets/img/integrate/connectors/db/connector-operations.png" title="Add Connector Operations" width="800" alt="Add Connector Operations"/>

## Create the integration logic for placing an order (GET /place_order)

1. Add BeginTransaction operation with Isolation Level "TRANSACTION_READ_COMMITTED"
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/begintransaction-operation.png" title="BeginTransaction Operation" width="800" alt="BeginTransaction Operation"/>

2. Add Select operation as below.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/select-operation.png" title="Select Operation" width="800" alt="Select Operation"/>

3. Add filter to check the stock availability.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/filter.png" title="Filter" width="800" alt="Filter"/>

4. Add Insert operation to the then flow.

    <img src="{{base_path}}/assets/img/integrate/connectors/db/insert-operation.png" title="Insert Operation" width="800" alt="Insert Operation"/>

5. Use ExecuteQuery operation to implement stock number update in Product table.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/execute-query-operation.png" title="ExecuteQuery Operation" width="800" alt="ExecuteQuery Operation"/>

6. Add CommitTransaction operation to implement commit for the DB transaction.
7. In the Else flow add the RollbackTransaction to rollback.
8. Complete the flow as shown below in the image. The XML code is provided below.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/db/complete-flow.png" title="Complete Flow" width="800" alt="Complete Flow"/>

??? note "Source view"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/ordersapi" name="ordersAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/place_order?customerId={customerId}&amp;productId={productId}&amp;quantity={quantity}">
            <inSequence>
                <db.beginTransaction configKey="DBCon1">
                    <timeout>300</timeout>
                    <isolationLevel>TRANSACTION_READ_COMMITTED</isolationLevel>
                </db.beginTransaction>
                <db.select configKey="DBCon1">
                    <query>SELECT * FROM `Products` WHERE `product_id` = '${params.queryParams.productId}'</query>
                    <columnNames>product_id</columnNames>
                    <columnTypes>VARCHAR</columnTypes>
                    <format>json</format>
                    <table>Products</table>
                    <columns>[]</columns>
                    <queryType>online</queryType>
                    <orderBy></orderBy>
                    <limit></limit>
                    <offset></offset>
                    <queryTimeout></queryTimeout>
                    <fetchSize></fetchSize>
                    <maxRows></maxRows>
                    <responseVariable>db_select_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </db.select>
                <filter description="Check product stock availability" xpath="${vars.db_select_1.payload.rows[0].stock_quantity &gt;= params.queryParams.quantity}">
                    <then>
                        <db.insert configKey="DBCon1">
                            <query>INSERT INTO `Orders` (`customer_id`, `total_amount`) VALUES (${params.queryParams.customerId}, ${vars.db_select_1.payload.rows[0].price * params.queryParams.quantity})</query>
                            <columnNames>customer_id, total_amount</columnNames>
                            <columnTypes>INT, DECIMAL</columnTypes>
                            <format>json</format>
                            <table>Orders</table>
                            <columns>[]</columns>
                            <queryType>online</queryType>
                            <queryTimeout></queryTimeout>
                            <responseVariable>db_insert_1</responseVariable>
                            <overwriteBody>false</overwriteBody>
                        </db.insert>
                        <db.executeQuery configKey="DBCon1">
                            <query>UPDATE `products` SET `stock_quantity` = `stock_quantity` - ? WHERE product_id = ?</query>
                            <format>json</format>
                            <parameters>[["${params.queryParams.quantity}", "INTEGER"], ["${params.queryParams.productId}", "VARCHAR"]]</parameters>
                            <isPreparedStatement>true</isPreparedStatement>
                            <isResultSet>true</isResultSet>
                            <queryTimeout></queryTimeout>
                            <fetchSize></fetchSize>
                            <maxRows></maxRows>
                            <transactionIsolation>TRANSACTION_NONE</transactionIsolation>
                            <responseVariable>db_executeQuery_1</responseVariable>
                            <overwriteBody>false</overwriteBody>
                        </db.executeQuery>
                        <db.commitTransaction configKey="DBCon1">
                            <enable>true</enable>
                        </db.commitTransaction>
                    </then>
                    <else>
                        <db.rollbackTransaction configKey="DBCon1">
                            <enable>true</enable>
                        </db.rollbackTransaction>
                        <payloadFactory media-type="json" template-type="default">
                            <format>{"Message":"Failed to place the order. Requested amount of the product not available."}</format>
                        </payloadFactory>
                    </else>
                </filter>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/dbConnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>


## Deployment

1.  Ensure your database (MySQL) is running and the schema/sample data is loaded.
2.  Ensure the DB Connection configuration in your project matches your database credentials and URL.
3.  Once you have [built your artifacts]({{base_path}}/develop/packaging-artifacts) into a composite application, you can
    export it into a CAR file (.car file) using the WSO2 Micro Integrator Visual Studio Code extension:
4.  Open the project overview and click on **Export**.

     <img src="{{base_path}}/assets/img/integrate/connectors/export_artifacts.jpeg" width="300" alt="Download ZIP">

5.  Click on **Select Destination** to select a destination folder to export the CAR file.


## Test

### Place a new order

1.  Use a tool like `curl` or Postman to send a GET request:
    ```bash
    curl -X GET "http://localhost:8290/ordermgmt/place_order?customerId=101&productId=PROD001&quantity=2"
    ```
2.  You should receive a response with the `order_id` of the newly created order.

??? "Sample Response"
```json
{
"generatedKeys": [
{ "GENERATED_KEY": 1 }
],
"affectedRows": 1,
}
```
3.  Check your database to verify that the order has been created and the product stock has been updated.
4.  You can also check the `Orders` and `OrderItems` tables to see the inserted records.
## What's next
*   Explore the [DB Connector Reference]({{base_path}}/reference/connectors/db-connector/db-connector-config/) for details on all operations and connection parameters.
*   Learn about error handling strategies in WSO2 MI.
*   Consider using Data Services for more complex data access scenarios.