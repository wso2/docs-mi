# How to Expose a Datasource as a Service

## What you'll build

In this tutorial, you will create a [Data Service]({{base_path}}/reference/synapse-properties/data-services/) that exposes an RDBMS data source as a RESTful API.

!!! Tip "What is a Data Service?"
    A Data Service in WSO2 Micro Integrator allows you to expose data from relational databases, CSV files, or other data sources as RESTful or SOAP APIs. It simplifies integration by handling database queries, input/output mappings, and data transformation without writing custom code. To explore Data Services in detail, see the [Data Services]({{base_path}}/reference/synapse-properties/data-services/) documentation.

When a client sends a request to the Micro Integrator, the employee number will be extracted from the request, used in a SQL query to retrieve employee information, and the result will be returned in JSON format.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

#### Set up MySQL server

Follow the steps below to set up the MySQL server.

1. Install the <a target="_blank" href="https://www.mysql.com/downloads/">MySQL</a> server.

2. Connect to the MySQL server using a MySQL client to create and populate the necessary database for this tutorial. Follow the steps below to create the `Company` database, a new user named `wso2mi`, and the `Employees` table.
    
3. Create a database named `Company`.

    ```bash
    CREATE DATABASE Company;
    ```

4. Create a user and grant the user access to the Database.

    ```
    CREATE USER 'wso2mi'@'localhost' IDENTIFIED BY 'wso2mi';
    GRANT ALL PRIVILEGES ON Company.* TO 'wso2mi'@'localhost';
    ```

5. Create the Employees table inside the Company database:

    ```bash
    USE Company;
    CREATE TABLE Employees (EmployeeNumber int(11) NOT NULL, FirstName varchar(255) NOT NULL, LastName varchar(255) DEFAULT NULL, Email varchar(255) DEFAULT NULL, Salary varchar(255));
    INSERT INTO Employees (EmployeeNumber, FirstName, LastName, Email, Salary) values (3, "Edgar", "Code", "edgar@rdbms.com", 100000);
    ```

6. Download the JDBC driver for MySQL from [here](http://dev.mysql.com/downloads/connector/j/). Make sure to download a version that is compatible with your MySQL server version. You will need this driver when configuring the MySQL server with the Micro Integrator.

### Step 2: Create a data service

Follow the steps given below to create a new data service.

#### Create an Integration project

{!includes/create-new-project.md!}

1. In the **Project Creation Form**, enter `EmployeeDataServiceTutorial` as the **Project Name**.

2. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-project.png" alt="create new project" width="80%"></a>

3. Click **Create**.

Once you click **Create**, the **Add Artifact** pane will be opened.

#### Create a data service with a data source

1. In the **Add Artifact** interface, click **+ View More** under **Create an Integration**.

2. Select **Data Service** under **Other Artifacts** to open the **Data Service Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/select_dataservice_artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/select_dataservice_artifact.png" width="80%"></a>

3. Provide `EmployeeDataService` as the **Data Service Name**. In the next step, you will configure a datasource that enables the service to connect to the MySQL database.

4. Click **Add Datasource**.
   
    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-dataservice.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-dataservice.png" width="80%"></a>
    
5. Set `EmployeeDatasource` as the **Datasource Identifier**, and select `RDBMS` for the **Datasource Type**, since this tutorial uses a MySQL database. Once you select the datasource type, the relevant configuration fields will be displayed.

    <table>
        <thead>
            <tr>
                <th>Property</th>
                <th>Value</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>Database Engine</strong>
                </td>
                <td>
                    Select <code>MySQL</code>
                </td>
                <td>Type of the relational database.</td>
            </tr>
            <tr>
                <td>
                    <strong>Hostname</strong>
                </td>
                <td>
                    <code>localhost</code>
                </td>
                <td>Hostname of the MySQL instance.</td>
            </tr>
            <tr>
                <td>
                    <strong>Port</strong>
                </td>
                <td>
                    <code>3306</code>
                </td>
                <td>Port used to access the MySQL instance.</td>
            </tr>
            <tr>
                <td>
                    <strong>Database Name</strong>
                </td>
                <td>
                    <code>Company</code>
                </td>
                <td>Name of the database to connect to.</td>
            </tr>
            <tr>
                <td>
                    <strong>Username</strong>
                </td>
                <td>
                    <code>wso2mi</code>
                </td>
                <td>Username for database authentication.</td>
            </tr>
            <tr>
                <td>
                    <strong>Password</strong>
                </td>
                <td>
                    <code>wso2mi</code>
                </td>
                <td>Password for database authentication.</td>
            </tr>
        </tbody>
    </table>

    !!! Note
        The rest of the configurations will be left as default. For advanced configurations, refer to [Datasource Parameters]({{base_path}}/reference/synapse-properties/data-services/datasource-configuration-parameters/).

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/datasource-form.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/datasource-form.png" width="80%"></a>

6. Click **Next**. 

7. You will be directed to the **Select Database Driver** window to choose a driver. Browse and select the driver JAR file that you downloaded in the [Set up MySQL Server](#set-up-mysql-server) step, and then click **Next**.

    You will then see the **Test Connection** form, where you can verify the connection to the data source using the provided username and password.

8. Click **Test Connection** to verify the connection. A success or failure message will appear based on the result.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/datasource-test-connection.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/datasource-test-connection.png" width="80%"></a>

9. Once the connection is successful, click **Create** to finalize the data source setup.

10. Finally, click **Create** in the **Data Service** form to add the Data Service to the integration project. In the next steps, you will learn how to create a resource and define a SQL query.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/insert-dataservice.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/insert-dataservice.png" width="80%"></a>

#### Create a resource

Now, let's create a REST resource that will be used to invoke the SQL query.

1. In the **MI Project Explorer**, select the **EmployeeDataService** that you created in the previous step.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/select-dataservice.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/select-dataservice.png" width="80%"></a>

2. In the **Data Service Designer**, click the **+ Resources** button to add a new resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/add-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/add-resource.png" width="80%"></a>

    In the next step, you will create a resource that accepts the Employee Number as a path parameter. This value will be used to query the SQL database.

3. Enter the following resource details, then click **Add** to insert the resource into the Data Service.

    <table>
    <tr>
    <th>Property</th>
    <th>Value</th>
    <th>Description</th>
    </tr>
    <tbody>
    <tr>
    <td>Resource Path</td>
    <td><code>Employee/{EmployeeNumber}</code></td>
    <td>
        The request URL should match this resource path. The <code>{EmployeeNumber}</code> variable will be replaced with the value sent in the request.
    </td>
    </tr>
    <tr>
    <td>Resource Method</td>
    <td><code>GET</code></td>
    <td>This resource will accept POST requests.</td>
    </tr>
    </tbody>
    </table>

!!!	tip
    Alternatively, you can generate a Data Service directly from a data source. For more information, refer to [Generate Data Services]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services/#generate-data-service-from-a-datasource).


#### Configure data service

Let’s write an SQL query to retrieve data from the MySQL data source you configured in the previous step, using the Employee Number provided as a path parameter in the GET resource.

1. Open the **DataService View** of the newly created resource by clicking the `GET Employee/{EmployeeNumber}` resource under **Resources** in the **Data Service Designer**.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/new-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/new-resource.png" width="80%"></a>

    !!! Info
        A single Data Service resource consists of the following key elements:

        - **Input Mapping** – Binds incoming request parameters to SQL query variables.
        - **Query** – Defines the database query using the mapped input parameters.
        - **Transformation** – Defines the output type (such as XML or JSON) and allows optional reshaping of the query result before it is sent in the response.
        - **Output Mapping** – Performs the actual mapping of the SQL query result to the selected response structure, organizing it into a user-friendly format.

2. Click on **Input Mapping** in the **DataService** view.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/c.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping.png" width="80%"></a>

    Here, you will map the `EmployeeNumber` path parameter to the SQL query variable `employee_number`, which will be used in the SQL query.

3. Click **Add Parameter**, specify the following values, and click **Save** to add the input mapping for the Employee Number.

    <table>
    <tr>
    <th>Property</th>
    <th>Description</th>
    </tr>
    <tbody>
    <tr>
    <td>Mapping Name</td>
    <td><code>employee_number</code></td>
    </tr>
    <tr>
    <tr>
    <td>Query Parameter</td>
    <td><code>EmployeeNumber</code></td>
    </tr>
    <tr>
    <td>Parameter Type</td>
    <td><code>SCALAR</code></td>
    </tr>
    <tr>
    <td>SQL Type</td>
    <td><code>STRING</code></td>
    </tr>
    </tbody>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping-2.png" width="30%"></a>

4. Finally, click **Submit** in the **Edit Input Mapping** pane to complete the input mapping configuration.

5. Click on **Query** in the **DataService** view. Here, you will write the SQL query to retrieve employee data using the `employee_number` SQL query variable.
    
6. Enter the following SQL query in the **Query / Expression** field, then click **Submit** to save the query.

    ```sql
    SELECT EmployeeNumber, FirstName, LastName, Email FROM Employees WHERE EmployeeNumber=:employee_number
    ```

    The `:employee_number` syntax is used to reference the SQL query variable you configured earlier.
    When the resource is invoked, the value passed through the `EmployeeNumber` path parameter will be substituted into this query.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/define_query.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/define_query.png" width="30%"></a>

7. Click on **Transformation** in the **DataService** view. Here, you will set the content type to **JSON**, as the client expects a JSON response.

8. Choose `JSON` as the **Output Type**, then click **Submit** to save the transformation settings.
    
    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/transformation.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/transformation.png" width="80%"></a>

9. Click on **Output Mapping** in the **DataService** view. Here, you will define the response JSON using the SQL results (`EmployeeNumber`, `FirstName`, `LastName`, and `Email`) retrieved from the query defined earlier.
    
10. Provide the following JSON template, then click **Submit** to save the output mapping.
    
    ```json
    {
        "Employee":{
            "EmployeeNumber":"$EmployeeNumber",
            "FirstName":"$FirstName",
            "LastName":"$LastName",
            "Email":"$Email"
        }
    }
    ```

    In this JSON template, each placeholder (e.g., `$EmployeeNumber`, `$FirstName`) refers to a column in the SQL query result.  
    The **Output Mapping** binds each of these individual values to a corresponding field in the JSON response.  

    Since we're returning a single record, the mapping is done for a single row, and each key in the `Employee` object maps directly to a column value from the query.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/output_mapping.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/output_mapping.png" width="80%"></a>

### Step 3: Build and run the artifacts

Now that you have developed the data service using the Micro Integrator for the Visual Studio Code plugin, it's time to deploy the integration to the Micro Integrator server runtime.

!!! Note
    If you didn’t select a driver JAR file in the [Create a Data Service with a Data Source](#create-a-data-service-with-a-data-source) step, make sure you have added the JAR file to the `<Project_Path>/deployment/libs` directory, or copied it to the `<MI_HOME>/lib` directory.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/data-service/build_and_run_btn.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/build_and_run_btn.png" width="80%"></a>

### Step 4: Test the data service

Let's test the use case by sending a simple client request that invokes the service.

#### Send the client request

When you run the integration artifact as in [Step 3](#step-3-build-and-run-the-artifacts), the **Runtime Services** interface is opened up. You can see all the available services.

Let's send a request to the API resource. You can use Postman or any other **HTTP Client**:

1. Open the Postman application. If you do not have the application, download it from here : [Postman](https://www.postman.com/downloads/).

2. Add the request information as given below and click the <b>Send</b> button.
    
    <table>
        <tr>
            <th>Method</th>
            <td>
               <code>GET</code> 
            </td>
        </tr>
        <tr>
            <th>Headers</th>
            <td>
               <code>Accept=application/json</code> 
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td><code>http://localhost:8290/services/EmployeeDataService.HTTPEndpoint/Employee/3</code></br></br>
            </td>
        </tr>
     </table>
     
If you want to send the client request from your terminal:

1. Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2. Execute the following command.
    ```bash
    curl -X GET http://localhost:8290/services/EmployeeDataService.HTTPEndpoint/Employee/3 -H "Accept: application/json"
    ```

#### Analyze the response

You will see the following response received by your <b>HTTP Client</b>:

```json
{
    "Employee": {
        "Email": "edgar@rdbms.com",
        "FirstName": "Edgar",
        "EmployeeNumber": "3",
        "LastName": "Code"
    }
}
```
