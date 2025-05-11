# DB Connector Example: Simple Order Management API

The DB Connector can be used to interact with relational databases using JDBC, perform CRUD operations, call stored procedures, and manage transactions.

## What you'll build

This example demonstrates how to use the DB Connector to create a simple Order Management API.

1.  **GET `/place_order`**: Accepts new order details (customer ID, product ID, quantity). It checks product availability, inserts the order details into `Orders` and `OrderItems` tables, and updates the product inventory in the `Products` table, all within a single database transaction. It returns the newly created `order_id`.

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

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it (assuming you have the database set up).

## Set up the integration project

1.  Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up an **Integration Project**.

2.  Click Add Artifact button in the home view

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-artifact.png" title="Add Artifact" width="500" alt="Add Artifact"/>

3.  Select **API** and click

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-api.png" title="Add API" width="500" alt="Add API"/>

4. Set the name as `ordermgmt` and click **Create**.

<img src="{{base_path}}/assets/img/integrate/connectors/db/set-name-to-api.png" title="Add API Name" width="500" alt="Add API Name"/>

5. Click on the three dots next to the GET resource and select **Edit**.

<img src="{{base_path}}/assets/img/integrate/connectors/db/edit-resource.png" title="Edit Resource" width="500" alt="Edit Resource"/>

6. Set the resource path as `place_order`

7. Click **Add Query Param** and set the name as `customerId` and click **Add**.

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-query-param.png" title="Add Query Param" width="500" alt="Add Query Param"/>

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-query-param-item.png" title="Add Query Param" width="500" alt="Add Query Param"/>

8. Repeat the above step to add the following query parameters:
    *   `productId`
    *   `quantity`


9. Click **Update** to save the changes.

<img src="{{base_path}}/assets/img/integrate/connectors/db/update-query-params.png" title="Update Query Params" width="500" alt="Update Query Params"/>

10. Click on the updated resource. It opens the API in the diagram view. Then click on the + button below to START to add connectors or mediators

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-connector.png" title="Add Mediator" width="500" alt="Add Mediator"/>

11. Click on the **Connections** tab and click on the **Add new connection** button.

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-connection.png" title="Add Connection" width="500" alt="Add Connection"/>

12. Search for **MySQL** or **PostgreSQL** and click the appropriate connection.

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-mysql-connection.png" title="Add MySQL Connection" width="500" alt="Add MySQL Connection"/>

13. Fill in the connection details and click **Add**.
    *   **Connection Name**: `DBCon1`
    *   **JDBC URL**: `jdbc:mysql://localhost:3306/your_database_name`
    *   **Username**: `your_db_username`
    *   **Password**: `your_db_password`

<img src="{{base_path}}/assets/img/integrate/connectors/db/add-connection-details.png" title="Add Connection Details" width="500" alt="Add Connection Details"/>

## Create the integration logic for placing an order (GET /place_order)

1. Create the integration flow as shown in the image. The XML code is provided below.

<img src="{{base_path}}/assets/img/integrate/connectors/db/place-order-flow.png" title="Place Order Flow" width="500" alt="Place Order Flow"/>

??? note "Source view"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/ordermgmt" name="ordermgmt" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/place_order?customerId={customerId}&amp;productId={productId}&amp;quantity={quantity}">
            <inSequence>
                <db.beginTransaction configKey="DBCon1">
                    <timeout>300</timeout>
                    <isolationLevel>TRANSACTION_READ_COMMITTED</isolationLevel>
                </db.beginTransaction>
                <db.select configKey="DBCon11">
                    <query>SELECT * FROM `products` WHERE `product_id` = '${params.queryParams.productId}'</query>
                    <preparedStmt>SELECT * FROM `products` WHERE `product_id` = ?</preparedStmt>
                    <columnNames>productid</columnNames>
                    <columnTypes>VARCHAR</columnTypes>
                    <format>json</format>
                    <table>products</table>
                    <columns>[]</columns>
                    <queryType>online</queryType>
                    <orderBy></orderBy>
                    <queryTimeout></queryTimeout>
                    <responseVariable>db_select_1</responseVariable>
                    <overwriteBody>false</overwriteBody>
                    <productid>{${params.queryParams.productId}}</productid>
                </db.select>
                <filter xpath="${vars.db_select_1.payload.rows[0].stock_quantity &gt;= params.queryParams.quantity}">
                    <then>
                        <db.insert configKey="DBCon11">
                            <query>INSERT INTO `orders` (`customer_id`, `order_date`, `total_amount`) VALUES (${params.queryParams.customerId}, 2025-04-30 14:23:45, ${vars.db_select_1.payload.rows[0].price * params.queryParams.quantity})</query>
                            <preparedStmt>INSERT INTO `orders` (`customer_id`, `order_date`, `total_amount`) VALUES (?, ?, ?)</preparedStmt>
                            <columnNames>customerid, orderdate, totalamount</columnNames>
                            <columnTypes>INT, TIMESTAMP, DECIMAL</columnTypes>
                            <format>json</format>
                            <table>orders</table>
                            <columns>[]</columns>
                            <queryType>online</queryType>
                            <queryTimeout></queryTimeout>
                            <responseVariable>db_insert_1</responseVariable>
                            <overwriteBody>true</overwriteBody>
                            <customerid>{${params.queryParams.customerId}}</customerid>
                            <orderdate>2025-04-30 14:23:45</orderdate>
                            <totalamount>{${vars.db_select_1.payload.rows[0].price * params.queryParams.quantity}}</totalamount>
                            <status></status>
                        </db.insert>
                        <db.executeQuery configKey="DBCon1">
                            <query>UPDATE `products` SET `stock_quantity` = `stock_quantity` - ? WHERE product_id = ?</query>
                            <format>json</format>
                            <parameters>[[${params.queryParams.quantity}, "INTEGER"], [${params.queryParams.productId}, "VARCHAR"], ]</parameters>
                            <isPreparedStatement>true</isPreparedStatement>
                            <isResultSet>false</isResultSet>
                            <queryTimeout></queryTimeout>
                            <fetchSize></fetchSize>
                            <maxRows></maxRows>
                            <transactionIsolation>TRANSACTION_NONE</transactionIsolation>
                            <responseVariable>db_executeQuery_1</responseVariable>
                            <overwriteBody>false</overwriteBody>
                        </db.executeQuery>
                        <db.commitTransaction configKey="DBCon1"/>
                        <respond/>
                    </then>
                    <else>
                        <db.rollbackTransaction configKey="DBCon1"/>
                    </else>
                </filter>
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

1.  Use a tool like `curl` or Postman to send a POST request:
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
