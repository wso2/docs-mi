# DB Connector Reference

This documentation provides a reference guide for the DB Connector.
The DB Connector allows you to connect to relational databases via JDBC and perform various operations including executing queries, modifying data, calling stored procedures, and managing transactions.

## Connection Configurations

The DB Connector utilizes connection pooling for efficient database interaction. You need to configure a connection before using the connector operations.

### Connection Parameters
Common parameters for configuring a database connection:

??? note "Connection Parameters"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>A unique name to identify this connection configuration.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>driverClassName</td>
            <td>The fully qualified name of the JDBC driver class (e.g., <code>com.mysql.cj.jdbc.Driver</code>, <code>org.postgresql.Driver</code>).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>jdbcUrl</td>
            <td>The JDBC URL for connecting to the database (e.g., <code>jdbc:mysql://localhost:3306/mydatabase</code>, <code>jdbc:postgresql://localhost:5432/mydatabase</code>).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>The username for database authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>The password for database authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</th>
        </tr>
        <tr>
            <td>maxActiveConnections</td>
            <td>Maximum number of active connections that can be allocated from this pool at the same time.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>maxIdleConnections</td>
            <td>Maximum number of connections that can remain idle in the pool, without extra ones being released.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>minIdleConnections</td>
            <td>Minimum number of connections that can remain idle in the pool, without extra ones being created.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>poolConnectionAgedTimeout</td>
            <td>The time in milliseconds after which an aged connection should be removed from the pool.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>maxWaitTime</td>
            <td>The maximum number of milliseconds that the pool will wait (when no connections are available) for a connection to be returned before throwing an exception.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>evictionCheckInterval</td>
            <td>The interval in milliseconds between runs of the idle object evictor thread.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>minEvictionTime</td>
            <td>The minimum amount of time in milliseconds an object may sit idle in the pool before it is eligible for eviction by the idle object evictor.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>exhaustedAction</td>
            <td>Specifies the behavior when the pool is exhausted (e.g., 'FAIL', 'BLOCK', 'GROW').</td>
            <td>Optional</td>
        </tr>
    </table>

    ??? note "Example: MySQL Connection"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="DBCon11" xmlns="http://ws.apache.org/ns/synapse">
        <db.init>
            <connectionType>MYSQL</connectionType>
            <dbUrl>jdbc:mysql://localhost:3306/supermarket</dbUrl>
            <dbUser>saliya</dbUser>
            <dbPassword>password</dbPassword>
            <driverClass>com.mysql.cj.jdbc.Driver</driverClass>
            <userConsent>true</userConsent>
            <dbDriver>MySQL</dbDriver>
            <exhaustedAction>WHEN_EXHAUSTED_BLOCK</exhaustedAction>
            <name>DBCon11</name>
        </db.init>
        </localEntry>
        ```

    ??? note "Example: PostgreSQL Connection"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="PostgreSQLCon" xmlns="http://ws.apache.org/ns/synapse">
        <db.init>
            <connectionType>POSTGRESQL</connectionType>
            <dbUrl>jdbc:postgresql://localhost:5432/supermarket</dbUrl>
            <dbUser>saliya</dbUser>
            <dbPassword>password</dbPassword>
            <driverClass>org.postgresql.Driver</driverClass>
            <userConsent>true</userConsent>
            <dbDriver>PostgreSQL</dbDriver>
            <exhaustedAction>WHEN_EXHAUSTED_BLOCK</exhaustedAction>
            <name>PostgreSQLCon</name>
        </db.init>
        </localEntry>
        ```

## Operations

Operations use the `configKey` attribute to reference a pre-defined connection configuration.

??? note "select"
    Executes a SQL SELECT query using prepared statements.
    <table>
        <tr><th>Parameter Name</th><th>Description</th><th>Required</th></tr>
        <tr><td>query</td><td>The Raw SQL SELECT statement</td><td>Yes</td></tr>
        <tr><td>preparedStmt</td><td>The SQL SELECT statement with '?' placeholders for parameters.</td><td>Yes</td></tr>
        <tr><td>columnNames</td><td>A comma-separated list of column names to be returned in the result set.</td><td>Optional</td></tr>
        <tr><td>columnTypes</td><td>A comma-separated list of data types for the columns (e.g., VARCHAR, INTEGER, DOUBLE).</td><td>Optional</td></tr>
        <tr><td>format</td><td>The format of the result set (e.g., JSON, XML).</td><td>Optional</td></tr>
        <tr><td>table</td><td>The name of the table to be queried.</td><td>Optional</td></tr>
        <tr><td>columns</td><td>A list of columns to be included in the result set.</td><td>Optional</td></tr>
        <tr><td>queryType</td><td>The type of query (e.g., online, offline).</td><td>Optional</td></tr>
        <tr><td>orderBy</td><td>The column name to order the result set by.</td><td>Optional</td></tr>
        <tr><td>queryTimeout</td><td>The maximum time in milliseconds to wait for the query to execute.</td><td>Optional</td></tr>
        <tr><td>responseVariable</td><td>If specified, the result set is stored in this context variable.</td><td>Optional</td></tr>
        <tr><td>overwriteBody</td><td>If 'true' (default), the result set overwrites the payload. Set to 'false' if using 'responseVariable'.</td><td>Optional</td></tr>
    </table>

    The fields `preparedStmt`, `columnNames`, and `columnTypes` will be automatically generated when using the enhanced mode in the VS Code extension.

    **Sample configuration**

    The `query` parameter here is not used when the `preparedStmt` is used. The `preparedStmt` is used to prepare the SQL statement with the parameterized values. When `preparedStmt` is absent, the connector will fall back to the `query` parameter.

    ```xml
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
    ```

    **Sample response (JSON in `db_select_1` variable)**

    ```json
    [
        {
            "product_id": "PROD001",
            "name": "Super Widget",
            "price": 19.99,
            "stock_quantity": 148
        },
        {
            "product_id": "PROD002",
            "name": "Mega Widget",
            "price": 29.99,
            "stock_quantity": 75
        },
        {
            "product_id": "PROD003",
            "name": "Ultra Widget",
            "price": 39.99,
            "stock_quantity": 50
        }
    ]
    ```
    *(Note: The exact JSON structure might vary based on the database schema and query.)*

??? note "insert"
    Executes a SQL INSERT statement using prepared statements. Can retrieve auto-generated keys.
    <table>
        <tr><th>Parameter Name</th><th>Description</th><th>Required</th></tr>
        <tr><td>query</td><td>The Raw SQL INSERT statement</td><td>Yes</td></tr>
        <tr><td>preparedStmt</td><td>The SQL INSERT statement with '?' placeholders for parameters.</td><td>Yes</td></tr>
        <tr><td>columnNames</td><td>A comma-separated list of column names to be inserted.</td><td>Optional</td></tr>
        <tr><td>columnTypes</td><td>A comma-separated list of data types for the columns (e.g., VARCHAR, INTEGER, DOUBLE).</td><td>Optional</td></tr>
        <tr><td>table</td><td>The name of the table to be inserted into.</td><td>Optional</td></tr>
        <tr><td>columns</td><td>A list of columns to be included in the result set.</td><td>Optional</td></tr>
        <tr><td>queryType</td><td>The type of query (e.g., online, offline).</td><td>Optional</td></tr>
        <tr><td>queryTimeout</td><td>The maximum time in milliseconds to wait for the query to execute.</td><td>Optional</td></tr>
        <tr><td>responseVariable</td><td>If specified, the result set is stored in this context variable.</td><td>Optional</td></tr>
        <tr><td>overwriteBody</td><td>If 'true' (default), the result set overwrites the payload. Set to 'false' if using 'responseVariable'.</td><td>Optional</td></tr>     
    </table>

    The fields `preparedStmt`, `columnNames`, and `columnTypes` will be automatically generated when using the enhanced mode in the VS Code extension.

    **Sample configuration**

    The `query` parameter here is not used when the `preparedStmt` is used. The `preparedStmt` is used to prepare the SQL statement with the parameterized values. When `preparedStmt` is absent, the connector will fall back to the `query` parameter. `preparedStmt` is automatically generated when using the enhanced mode in the VS Code extension.

    ```xml
    <db.insert configKey="DBCon11">
        <query>INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `total_amount`) VALUES (101, ${params.queryParams.customerId}, 2025-04-30 14:23:45, ${vars.db_select_1.payload.rows[0].price * params.queryParams.quantity})</query>
        <preparedStmt>INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `total_amount`) VALUES (?, ?, ?, ?)</preparedStmt>
        <columnNames>orderid, customerid, orderdate, totalamount</columnNames>
        <columnTypes>INT, INT, TIMESTAMP, DECIMAL</columnTypes>
        <format>json</format>
        <table>orders</table>
        <columns>[]</columns>
        <queryType>online</queryType>
        <queryTimeout></queryTimeout>
        <responseVariable>db_insert_1</responseVariable>
        <overwriteBody>false</overwriteBody>
        <orderid>1110</orderid>
        <customerid>{${params.queryParams.customerId}}</customerid>
        <orderdate>2025-04-30 14:23:45</orderdate>
        <totalamount>{${vars.db_select_1.payload.rows[0].price * params.queryParams.quantity}}</totalamount>
        <status></status>
    </db.insert>
    ```

    **Sample result (in `insertResult` variable)**
    ```json
    {
        "generatedKeys": [
            { "GENERATED_KEY": 12345 }
        ],
        "affectedRows": 1
    }
    ```

??? note "delete"
    Executes a SQL DELETE statement using prepared statements.
    <table>
        <tr><th>Parameter Name</th><th>Description</th><th>Required</th></tr>
        <tr><td>query</td><td>The Raw SQL DELETE statement</td><td>Yes</td></tr>
        <tr><td>preparedStmt</td><td>The SQL DELETE statement with '?' placeholders for parameters.</td><td>Yes</td></tr>
        <tr><td>columnNames</td><td>A comma-separated list of column names to be deleted.</td><td>Optional</td></tr>
        <tr><td>columnTypes</td><td>A comma-separated list of data types for the columns (e.g., VARCHAR, INTEGER).</td><td>Optional</td></tr>
        <tr><td>table</td><td>The name of the table to be deleted from.</td><td>Optional</td></tr>
        <tr><td>columns</td><td>Data for the parameters in the prepared statement (only used in offline mode).</td><td>Optional</td></tr>
        <tr><td>queryType</td><td>The type of query (e.g., online, offline).</td><td>Optional</td></tr>
        <tr><td>queryTimeout</td><td>The maximum time in milliseconds to wait for the query to execute.</td><td>Optional</td></tr>
        <tr><td>responseVariable</td><td>If specified, the result set is stored in this context variable.</td><td>Optional</td></tr>
        <tr><td>overwriteBody</td><td>If 'true' (default), the result set overwrites the payload. Set to 'false' if using 'responseVariable'.</td><td>Optional</td></tr>     
    </table>

    The fields `preparedStmt`, `columnNames`, and `columnTypes` will be automatically generated when using the enhanced mode in the VS Code extension.

    The field columns is used to pass the data for the parameters in the prepared statement. This is only used in offline mode when a connection can not be made to the target database or if the user consent is not given. The data is passed in the format of a JSON array of arrays. Each inner array contains the column name, value, and type.

    **Sample configuration**
    ```xml
    <db.delete configKey="DBCon22">
        <query>DELETE FROM `orderitems` WHERE `order_id` = 1 AND `product_id` = 'PROD001'</query>
        <preparedStmt>DELETE FROM `orderitems` WHERE "orderid" = ? AND "productid" = ?</preparedStmt>
        <columnNames>orderid, productid</columnNames>
        <columnTypes>VARCHAR, VARCHAR</columnTypes>
        <format>json</format>
        <table>orderitems</table>
        <columns>[["orderid","1","VARCHAR",],["productid","PROD001","VARCHAR",],]</columns>
        <queryType>offline</queryType>
        <queryTimeout></queryTimeout>
        <responseVariable>db_delete_1</responseVariable>
        <overwriteBody>false</overwriteBody>
        <orderitemid></orderitemid>
        <orderid>1</orderid>
        <productid>PROD001</productid>
        <quantity></quantity>
        <unitprice></unitprice>
    </db.delete>
    ```
    **Sample result (in `db_delete_1` variable)**
    ```json
    {
        "affectedRows": 1 // Number of rows affected by the delete operation
    }
    ```

??? note "callProcedure"
    Calls a database stored procedure or function.
    <table>
        <tr><th>Parameter Name</th><th>Description</th><th>Required</th></tr>
        <tr><td>query</td><td>The Raw SQL CALL statement</td><td>Yes</td></tr>
        <tr><td>preparedStmt</td><td>The SQL CALL statement with '?' placeholders for parameters.</td><td>Yes</td></tr>
        <tr><td>columnNames</td><td>A comma-separated list of column names to be returned in the result set.</td><td>Optional</td></tr>
        <tr><td>columnTypes</td><td>A comma-separated list of data types for the columns (e.g., VARCHAR, INTEGER, DOUBLE).</td><td>Optional</td></tr>
        <tr><td>format</td><td>The format of the result set (e.g., JSON, XML).</td><td>Optional</td></tr>
        <tr><td>table</td><td>The name of the table to be queried.</td><td>Optional</td></tr>
        <tr><td>columns</td><td>A list of columns to be included in the result set.</td><td>Optional</td></tr>
    </table>

    **Sample configuration (Conceptual)**
    ```xml
    <db.call configKey="DBCon33">
        <query>CALL `GetEmployeesByDepartment`(2, '3')</query>
        <preparedStmt>CALL `GetEmployeesByDepartment`(?, ?)</preparedStmt>
        <columnNames>deptID, deptName</columnNames>
        <columnTypes>INT, VARCHAR</columnTypes>
        <format>json</format>
        <table>GetEmployeesByDepartment</table>
        <columns>[]</columns>
        <queryType>online</queryType>
        <queryTimeout></queryTimeout>
        <fetchSize></fetchSize>
        <maxRows></maxRows>
        <responseVariable>db_call_51</responseVariable>
        <overwriteBody>false</overwriteBody>
        <deptID>2</deptID>
        <deptName>3</deptName>
    </db.call>
    ```
        **Sample result (in `db_call_51` variable)**
        ```json
        {
            "outputParameters": {
                "deptID": 2,
                "deptName": "Sales"
            },
            "resultSets": [ /* Optional: if procedure returns result sets */ ]
        }
        ```

??? note "executeQuery"
    Executes an arbitrary SQL statement. Use when you need to execute complex queries. Paramters can be passed in the SQL statement using the `?` placeholder. The parameters are passed in the order they appear in the SQL statement.
    <table>
        <tr><th>Parameter Name</th><th>Description</th><th>Required</th></tr>
        <tr><td>query</td><td>The SQL statement to execute.</td><td>Yes</td></tr>
        <tr><td>isPreparedStatement</td><td>If 'true', the SQL statement is treated as a prepared statement. If 'false', it is treated as a regular SQL statement.</td><td>Yes</td></tr>
        <tr><td>isResultSet</td><td>If 'true', the result is treated as a result set. If 'false', it is treated as an update count.</td><td>Yes</td></tr>
        <tr><td>columns</td><td>Contains the data for the parameters in the SQL statement. The data is passed in the format of a JSON array of arrays. Each inner array contains the value and type.</td><td>Optional</td></tr>
        <tr><td>responseVariable</td><td>If specified, the result (update count or result set) is stored in this context variable.</td><td>Optional</td></tr>
        <tr><td>overwriteBody</td><td>If 'true' (default), the result overwrites the payload. Set to 'false' if using 'responseVariable'.</td><td>Optional</td></tr>
    </table>

    **Sample configuration**
    ```xml
    <db.executeQuery configKey="DBCon1">
        <sql>SELECT o.order_id, o.order_date, o.status, o.total_amount, c.customer_name, c.email, oi.product_id,, p.name AS product_name, oi.quantity, oi.unit_price FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id JOIN Order_Items oi ON o.order_id = oi.order_id JOIN Products p ON oi.product_id = p.product_id WHERE o.order_id = ?</sql>
        <columns>[[1,"INTEGER"]]</columns>  
        <isPreparedStatement>true</isPreparedStatement>
        <isResultSet>true</isResultSet> 
        <resultType>JSON</resultType>
        <responseVariable>db_execute_query_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </db.executeQuery>
    ```

    **Sample result (in `db_execute_query_1` variable)**
    ```json
    [{
        "order_id": 101,
        "order_date": "2025-04-30 14:23:45",
        "status": "Shipped",
        "total_amount": 199.99,
        "customer_name": "John Doe",
        "email": "john@mail.com",
        "product_id": "PROD001",
        "product_name": "Super Widget",
        "quantity": 2,
        "unit_price": 19.99
    }]
    ```

??? note "beginTransaction"
    Starts a new database transaction associated with the current message context. Subsequent DB operations within the same flow (until commit or rollback) will participate in this transaction.
    <table>
        <tr><th>Parameter Name</th><th>Description</th><th>Required</th></tr>
        <tr><td>isolationLevel</td><td>Specifies the transaction isolation level (e.g., TRANSACTION_READ_COMMITTED, TRANSACTION_REPEATABLE_READ, TRANSACTION_SERIALIZABLE). Default depends on the database.</td><td>Optional</td></tr>
    </table>

    The `isolationLevel` parameter can take one of the following values: </br>
    - `TRANSACTION_READ_UNCOMMITTED`: Allows reading uncommitted changes (dirty reads). </br>
    - `TRANSACTION_READ_COMMITTED`: Prevents dirty reads; allows non-repeatable reads. </br>
    - `TRANSACTION_REPEATABLE_READ`: Prevents dirty reads and non-repeatable reads; allows phantom reads. </br>
    - `TRANSACTION_SERIALIZABLE`: Prevents dirty reads, non-repeatable reads, and phantom reads. This is the highest isolation level.

    **Sample configuration**
    ```xml
    <db.beginTransaction configKey="DBCon1">
        <isolationLevel>READ_COMMITTED</isolationLevel>
    </db.beginTransaction>
    ```

??? note "commitTransaction"
    Commits the database transaction associated with the current message context.

    **Sample configuration**
    ```xml
    <db.commitTransaction configKey="DBCon1"></db.commitTransaction>
    ```

??? note "rollbackTransaction"
    Rolls back the database transaction associated with the current message context.

    **Sample configuration**
    ```xml
    <db.rollbackTransaction configKey="DBCon1"></db.rollbackTransaction>
    ```

**Note**: For a practical example demonstrating transaction management and various operations, see [DB Connector Example]({{base_path}}/reference/connectors/db-connector/db-connector-example/).
