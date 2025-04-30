# DB Connector Example: Simple Order Management API

The DB Connector can be used to interact with relational databases using JDBC, perform CRUD operations, call stored procedures, and manage transactions.

## What you'll build

This example demonstrates how to use the DB Connector to create a simple Order Management API with two resources:

1.  **POST `/orders`**: Accepts new order details (customer ID, product ID, quantity). It checks product availability, inserts the order details into `Orders` and `OrderItems` tables, and updates the product inventory in the `Products` table, all within a single database transaction. It returns the newly created `order_id`.
2.  **GET `/orders/{orderId}`**: Retrieves the details of a specific order by joining `Orders`, `OrderItems`, `Products`, and `Customers` tables. It returns the result in JSON or XML format based on the `Accept` header.

This example showcases:
*   Using `select`, `insert`, and `update` operations.
*   Using prepared statements for security and efficiency.
*   Managing database transactions (`beginTransaction`, `commitTransaction`, `rollbackTransaction`).
*   Retrieving auto-generated keys.
*   Handling results (JSON/XML).
*   Conditional processing based on database query results (Filter mediator).
*   Reading URI parameters and request payloads.

### Database Schema (Example - PostgreSQL/MySQL)

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
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

-- Orders Table
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY, -- Or AUTO_INCREMENT for MySQL
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'PENDING',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- OrderItems Table
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY, -- Or AUTO_INCREMENT for MySQL
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
2.  Add the DB Connector to your project. Search for `rdbms` or `db` connector in the tooling palette and add it.
3.  Configure a DB Connection Pool:
    *   Create a new **DB Connection** configuration element in your project (e.g., under `src/main/synapse-config/connections`).
    *   Configure it with the details for your database (MySQL, PostgreSQL, etc.) similar to the examples in the [DB Connector Reference]({{base_path}}/reference/connectors/db-connector/db-connector-config/#connection-configurations). Give it a unique name, e.g., `OrderDBPool`.

## Create the integration logic for placing an order (POST /orders)

1.  Under the **Create an integration** section, select **API** to create a new REST API. Name it `OrderManagementAPI` and set the context to `/ordermgmt`.
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/create-api.png" title="Create API" width="800" alt="Create API"/>

2.  Create a new API resource for the path `/orders` with the `POST` method.
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/create-post-resource.png" title="Create POST Resource" width="800" alt="Create POST Resource"/>

3.  **Extract Request Payload**: Drag a **Property** mediator onto the canvas. Configure it to extract `customerId`, `productId`, and `quantity` from the incoming JSON payload. Repeat for each property.
    *   Property Name: `customerId`, Type: `INTEGER`, Value Type: `Expression`, Value Expression: `json-eval($.customerId)`
    *   Property Name: `productId`, Type: `STRING`, Value Type: `Expression`, Value Expression: `json-eval($.productId)`
    *   Property Name: `reqQuantity`, Type: `INTEGER`, Value Type: `Expression`, Value Expression: `json-eval($.quantity)`
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/extract-payload.png" title="Extract Payload Properties" width="400" alt="Extract Payload Properties"/>

4.  **Start Transaction**: Add the `db.beginTransaction` operation from the DB Connector palette. Configure it to use your connection pool (`OrderDBPool`).
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/begin-transaction.png" title="Begin Transaction" width="400" alt="Begin Transaction"/>
    ```xml
    <db.beginTransaction configKey="OrderDBPool"/>
    ```

5.  **Check Stock & Get Price**: Add the `db.select` operation.
    *   Configure the `configKey` to `OrderDBPool`.
    *   SQL: `SELECT price, stock_quantity FROM Products WHERE product_id = ?`
    *   Add one parameter: Type `VARCHAR`, Value `{$ctx:productId}`.
    *   Set `responseVariable` to `productInfo`.
    *   Set `overwriteBody` to `false`.
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/select-product.png" title="Select Product Info" width="600" alt="Select Product Info"/>
    ```xml
    <db.select configKey="OrderDBPool">
        <sql>SELECT price, stock_quantity FROM Products WHERE product_id = ?</sql>
        <parameters>
            <parameter type="VARCHAR" value="{$ctx:productId}"/>
        </parameters>
        <responseVariable>productInfo</responseVariable>
        <overwriteBody>false</overwriteBody>
    </db.select>
    ```

6.  **Extract Product Details**: Add Property mediators to extract the price and stock from the `productInfo` variable. Check if results exist first.
    *   Property Name: `productPrice`, Type: `DOUBLE`, Value Expression: `json-eval($.results[0].price)`
    *   Property Name: `currentStock`, Type: `INTEGER`, Value Expression: `json-eval($.results[0].stock_quantity)`
    *   *(Add error handling if `productInfo.results` is empty)*

7.  **Validate Stock**: Add a **Filter** mediator.
    *   Condition (XPath): `get-property('currentStock') >= get-property('reqQuantity')`
    *   *(Alternative: Use a Script mediator for more complex validation)*
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/filter-stock.png" title="Filter Stock" width="600" alt="Filter Stock"/>

8.  **Handle Insufficient Stock (Filter 'Else' path)**:
    *   Add the `db.rollbackTransaction` operation (`configKey="OrderDBPool"`).
    *   Add a **PayloadFactory** mediator to create an error response:
        ```json
        {
          "error": "Insufficient stock or product not found",
          "productId": "{$ctx:productId}",
          "requested": "{$ctx:reqQuantity}",
          "available": "{$ctx:currentStock}"
        }
        ```
    *   Set HTTP Status Code (e.g., 400) using a Property mediator: ` <property name="HTTP_SC" value="400" scope="axis2"/>`
    *   Add a **Respond** mediator.

9.  **Continue Order Processing (Filter 'Then' path)**:
    *   **Calculate Total Amount**: Add a Property mediator.
        *   Name: `totalAmount`, Type: `DOUBLE`, Expression: `get-property('productPrice') * get-property('reqQuantity')`
    *   **Insert Order Header**: Add the `db.insert` operation.
        *   `configKey="OrderDBPool"`
        *   SQL: `INSERT INTO Orders (customer_id, total_amount, status) VALUES (?, ?, 'PENDING')`
        *   Parameters: `INTEGER` value `{$ctx:customerId}`, `DECIMAL` value `{$ctx:totalAmount}`.
        *   `retrieveGeneratedKeys="true"`
        *   `generatedKeysVariable="orderInsertResult"`
        *   `overwriteBody="false"`
    *   **Extract New Order ID**: Add a Property mediator.
        *   Name: `newOrderId`, Type: `INTEGER`, Expression: `json-eval($.generatedKeys[0].GENERATED_KEY)` (Adjust key name based on your DB/driver).
    *   **Insert Order Item**: Add another `db.insert` operation.
        *   `configKey="OrderDBPool"`
        *   SQL: `INSERT INTO OrderItems (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)`
        *   Parameters: `INTEGER` value `{$ctx:newOrderId}`, `VARCHAR` value `{$ctx:productId}`, `INTEGER` value `{$ctx:reqQuantity}`, `DECIMAL` value `{$ctx:productPrice}`.
        *   `overwriteBody="false"`
    *   **Update Stock**: Add the `db.update` operation.
        *   `configKey="OrderDBPool"`
        *   SQL: `UPDATE Products SET stock_quantity = stock_quantity - ? WHERE product_id = ?`
        *   Parameters: `INTEGER` value `{$ctx:reqQuantity}`, `VARCHAR` value `{$ctx:productId}`.
        *   `overwriteBody="false"`
    *   **Commit Transaction**: Add the `db.commitTransaction` operation (`configKey="OrderDBPool"`).
    *   **Success Response**: Add a **PayloadFactory** mediator.
        ```json
        {
          "message": "Order created successfully",
          "orderId": "{$ctx:newOrderId}"
        }
        ```
        *   Set Content-Type header: `<property name="messageType" value="application/json" scope="axis2"/>`
    *   Add a **Respond** mediator.

    <!-- Placeholder image for the 'Then' path flow -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/post-flow-then.png" title="POST Flow - Success Path" width="900" alt="POST Flow - Success Path"/>

## Create the integration logic for retrieving an order (GET /orders/{orderId})

1.  Create another API resource for the path `/orders/{orderId}` with the `GET` method.
    <!-- Placeholder image -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/create-get-resource.png" title="Create GET Resource" width="800" alt="Create GET Resource"/>

2.  **Extract Order ID**: Add a Property mediator.
    *   Name: `uri.var.orderId`, Type: `INTEGER`, Expression: `$ctx:uri.var.orderId`

3.  **Retrieve Order Details**: Add the `db.select` operation.
    *   `configKey="OrderDBPool"`
    *   SQL:
        ```sql
        SELECT o.order_id, o.order_date, o.status, o.total_amount,
               c.customer_name, c.email,
               oi.product_id, p.name AS product_name, oi.quantity, oi.unit_price
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        JOIN OrderItems oi ON o.order_id = oi.order_id
        JOIN Products p ON oi.product_id = p.product_id
        WHERE o.order_id = ?
        ```
    *   Parameter: `INTEGER` value `{$ctx:uri.var.orderId}`.
    *   `responseVariable="orderDetails"`
    *   `overwriteBody="false"`

4.  **Format Response (JSON/XML)**: Add a **Switch** mediator based on the `Accept` header.
    *   Source: `$trp:Accept`
    *   Case (Regex `application/xml`):
        *   Use a **PayloadFactory** to transform the `orderDetails` JSON variable into the desired XML structure.
        *   Set Content-Type: `<property name="messageType" value="application/xml" scope="axis2"/>`
    *   Default Case (Assume JSON):
        *   Use a **PayloadFactory** to format the `orderDetails` variable if needed, or directly set it as the payload.
        *   Set Content-Type: `<property name="messageType" value="application/json" scope="axis2"/>`
        *   Example PayloadFactory (to set body directly from variable):
            ```xml
            <payloadFactory media-type="json">
                <format>{$ctx:orderDetails}</format>
                <args/>
            </payloadFactory>
            ```

5.  Add a **Respond** mediator after the Switch mediator.

    <!-- Placeholder image for the GET flow -->
    <img src="{{base_path}}/assets/img/integrate/connectors/db-connector/get-flow.png" title="GET Flow" width="900" alt="GET Flow"/>

## Export integration logic as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<!-- Placeholder for download link -->
<!-- <a href="{{base_path}}/assets/attachments/connectors/dbconnector_ordermgmt.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a> -->
**Note**: Project ZIP not available yet.

## Deployment

1.  Ensure your database (MySQL/PostgreSQL) is running and the schema/sample data is loaded.
2.  Ensure the DB Connection pool configuration in your project matches your database credentials and URL.
3.  Deploy the exported Carbon Application (CApp) to your WSO2 Micro Integrator instance. Refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

### Place a new order

1.  Use a tool like `curl` or Postman to send a POST request:
    ```bash
    curl -X POST http://localhost:8290/ordermgmt/orders \
    -H "Content-Type: application/json" \
    -d '{
        "customerId": 101,
        "productId": "PROD001",
        "quantity": 5
    }'
    ```

2.  **Expected Success Response**:
    ```json
    {
        "message": "Order created successfully",
        "orderId": 1 # The actual generated order ID
    }
    ```
    *(Verify in your database that the order was created and stock was updated)*

3.  **Example Insufficient Stock Response** (if you try to order more than available):
    ```bash
    curl -X POST http://localhost:8290/ordermgmt/orders \
    -H "Content-Type: application/json" \
    -d '{
        "customerId": 102,
        "productId": "PROD002",
        "quantity": 100
    }'
    ```
    ```json
    # Status Code: 400 Bad Request
    {
        "error": "Insufficient stock or product not found",
        "productId": "PROD002",
        "requested": "100",
        "available": "50" # Actual available stock
    }
    ```
    *(Verify in your database that no order was created and stock remains unchanged)*

### Retrieve an order

1.  Assuming an order with ID `1` was created successfully, send a GET request:
    ```bash
    # Request JSON (Default)
    curl -X GET http://localhost:8290/ordermgmt/orders/1

    # Request XML
    curl -X GET http://localhost:8290/ordermgmt/orders/1 -H "Accept: application/xml"
    ```

2.  **Expected JSON Response**: (Structure might vary based on `db.select` result format)
    ```json
    {
        "results": [
            {
                "order_id": 1,
                "order_date": "2023-10-27T10:30:00Z", # Example date
                "status": "PENDING",
                "total_amount": 99.95, # 19.99 * 5
                "customer_name": "Alice Wonderland",
                "email": "alice@example.com",
                "product_id": "PROD001",
                "product_name": "Super Widget",
                "quantity": 5,
                "unit_price": 19.99
            }
            # Potentially multiple items if the query returns multiple rows per order
        ]
    }
    ```

3.  **Expected XML Response**: (Structure depends on your PayloadFactory transformation)
    ```xml
    <OrderDetails>
        <Order>
            <OrderId>1</OrderId>
            <OrderDate>2023-10-27T10:30:00Z</OrderDate>
            <Status>PENDING</Status>
            <TotalAmount>99.95</TotalAmount>
            <Customer>
                <Name>Alice Wonderland</Name>
                <Email>alice@example.com</Email>
            </Customer>
            <Item>
                <ProductId>PROD001</ProductId>
                <ProductName>Super Widget</ProductName>
                <Quantity>5</Quantity>
                <UnitPrice>19.99</UnitPrice>
            </Item>
        </Order>
    </OrderDetails>
    ```

## What's next

*   Explore the [DB Connector Reference]({{base_path}}/reference/connectors/db-connector/db-connector-config/) for details on all operations and connection parameters.
*   Learn about error handling strategies in WSO2 MI.
*   Consider using Data Services for more complex data access scenarios.
