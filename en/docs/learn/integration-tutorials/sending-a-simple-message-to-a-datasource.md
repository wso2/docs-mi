# How to Expose a Datasource as a Service

## What you'll build

A **data service** provides a web service interface to access data that is stored in various datasources. The following sections describe how you can use Micro Integrator Extension for Visual Studio Code (MI for VS Code) to work with data services' artifacts. 

!!! Tip
    Note that this feature is currently supported in Micro Integrator Extension for Visual Studio Code (MI for VS Code) for relational datasources and CSV files.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

- **MySQL server:** Follow the below steps to set up MySQL server.
    1. Install the MySQL server.
    2. Download the JDBC driver for MySQL from [here](http://dev.mysql.com/downloads/connector/j/). You will need this when you configure the MySQL server with the Micro Integrator.
        
    3. Create a database named `Employees`.

        ```bash
        CREATE DATABASE Employees;
        ```

    4. Create a user and grant the user access to the Database.
    
        ```
       CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
       GRANT ALL PRIVILEGES ON Employees.* TO 'user'@'localhost';
       ```

    5. Create the Employee table inside the Employees database:

        ```bash
        USE Employees;
        CREATE TABLE Employees (EmployeeNumber int(11) NOT NULL, FirstName varchar(255) NOT NULL, LastName varchar(255) DEFAULT NULL, Email varchar(255) DEFAULT NULL, Salary varchar(255));
        INSERT INTO Employees (EmployeeNumber, FirstName, LastName, Email, Salary) values (3, "Edgar", "Code", "edgar@rdbms.com", 100000);
        ```

### Step 2: Create a data service

Follow the steps given below to create a new data service.

#### Create an Integration project

{!includes/create-new-project.md!}

1. In the **Project Creation Form**, enter `DataSourceServiceTutorial` as the **Project Name**.

2. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-project.png" alt="create new project" width="80%"></a>

3. Click **Create**.

#### Create a data service with a data source

1.  Navigate to the **MI Project Explorer** > **Data Services**.
   
   <a href="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-data-source.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-data-source.png" width="30%"></a>

2.  Hover over **Data Services** and click the **+** icon that appears.
   
   <a href="{{base_path}}/assets/img/learn/tutorials/data-service/add-data-source.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/add-data-source.png" width="30%"></a>

3.  Enter a name for the data service:

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
    <tbody>
        <tr>
            <td>Data Service Name</td>
            <td>RDBMSDataService</td>
        </tr>
    </tbody>
    </table>

4. Click **Add Datasource**.
   
<a href="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-dataservice.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/create-new-dataservice.png" width="80%"></a>
    
1. To create the datasource connection specify the following values to create the new datasource:

    <table>
    <caption>Datasource Properties</caption>
    <tr>
        <th>Property</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>Datasource ID</td>
        <td>Datasource</td>
    </tr>
    <tr>
        <td>Datasource Type</td>
        <td>RDBMS</td>
    </tr>
    <tr>
        <td>Datasource Type (Default/External)</td>
        <td>Leave <strong>Default</strong> selected.</td>
    </tr>
    <tr>
        <td>Database Engine</td>
        <td>MySQL</td>
    </tr>
    <tr>
        <td>Driver Class</td>
        <td>com.mysql.jdbc.Driver</td>
    </tr>
    <tr>
        <td>URL</td>
        <td>jdbc:mysql://localhost:3306/Employees</td>
    </tr>
    <tr>
        <td>User Name</td>
        <td>user</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>password</td>
    </tr>
</table>

<a href="{{base_path}}/assets/img/learn/tutorials/data-service/datasource-form.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/datasource-form.png" width="80%"></a>

1.  Click **Add**.
   
2.  Click **Create** to create a data service with datasource.

#### Create a resource

Now, let's create a REST resource that can be used to invoke the query.

1. Click new **Data Service** created in the previous step.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/new-dataservice.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/new-dataservice.png" width="80%"></a>
   
2. Click **+ Resources**. 

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/add-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/add-resource.png" width="80%"></a>

3. Enter the following resource details.

    <table>
    <tr>
    <th>Property</th>
    <th>Description</th>
    </tr>
    <tbody>
    <tr>
    <td>Resource Path</td>
    <td>Employee/{EmployeeNumber}</td>
    </tr>
    <tr>
    <td>Resource Method</td>
    <td>GET</td>
    </tr>
    </tbody>
    </table>
       
4. Click **Add**.

!!!	tip
    Alternatively, you can generate a data service from a datasource. For more information, refer to [Generate Data Services]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services/#generate-data-service-from-a-datasource).


#### Configure data service

Let's write an SQL query to GET data from the MySQL datasource that you
configured in the previous step:

1. Click new **Resource** created in the previous step.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/new-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/new-resource.png" width="80%"></a>

2. Click **Input Mapping** in DataService View.

3. Click **Add Parameter**.
   
    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping.png" width="80%"></a>

4. Specify the following values
   <table>
    <tr>
    <th>Property</th>
    <th>Description</th>
    </tr>
    <tbody>
    <tr>
    <td>Mapping Name</td>
    <td>EmployeeNumber</td>
    </tr>
    <tr>
    <tr>
    <td>Query Parameter</td>
    <td>EmployeeNumber</td>
    </tr>
    <tr>
    <td>Parameter Type</td>
    <td>SCALAR</td>
    </tr>
    <tr>
    <td>SQL Type</td>
    <td>STRING</td>
    </tr>
    </tbody>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/input-mapping-2.png" width="30%"></a>

5. Click **Add**. Then Click **Submit**.

6.  Click **Query** in DataService View.
    
7.  Specify the following values in the query details:

    <table>
    <tr>
    <th>Parameter</th>
    <th>Value</th>
    </tr>
    <tr>
    <td>Query ID</td>
    <td>GetEmployeeDetails</td>
    </tr>
    <tr>
    <td>Datasource</td>
    <td>Datasource</td>
    </tr>
    <tr>
    <td>SQL Query</td>
    <td>select EmployeeNumber, FirstName, LastName, Email from Employees where EmployeeNumber=:EmployeeNumber</td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/query.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/query.png" width="80%"></a>

8.  Click **Submit**.
   
9.  Click **Transformation** in DataService View.
    
10. Specify the following value:

    <table>
    <tr>
    <th>Property</th>
    <th>Description</th>
    </tr>
    <tr>
    <td>Grouped by Element</td>
    <td>Employees</td>
    </tr>
    </table>
    
    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/transformation.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/transformation.png" width="80%"></a>

11. Click **Submit**.

12. Click **Output Mapping** in DataService View.

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/output-mapping.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/output-mapping.png" width="80%"></a>
    
13. Click **Add Parameter**. Specify the following values:
    <table>
    <tr>
    <th>Property</th>
    <th>Description</th>
    </tr>
    <tbody>
    <tr>
    <td>Mapping Type</td>
    <td>Element</td>
    </tr>
    <tr>
    <td>Datasource Type</td>
    <td>column</td>
    </tr>
    <tr>
    <td>Output Field Name</td>
    <td>EmployeeNumber</td>
    </tr>
    <tr>
    <td>Datasource Column Name</td>
    <td>EmployeeNumber</td>
    </tr>
    <tr>
    <td>Parameter Type</td>
    <td>Scalar</td>
    </tr>
    <tr>
    <td>Schema Type</td>
    <td>String</td>
    </tr>
    </tbody>
    </table>   

    <a href="{{base_path}}/assets/img/learn/tutorials/data-service/output-mapping-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/output-mapping-2.png" width="30%"></a>

14. Save the parameter.

15. Follow the same steps to create the following output parameters:

    <table>
    <tr>
    <th>Mapping Type</th>
    <th>Datasource Type</th>
    <th>Output Field Name</th>
    <th>Datasource Column Name</th>
    <th>Parameter Type</th>
    <th>Schema Type</th>
    </tr>
    <tr>
    <td>Element</td>
    <td>column</td>
    <td>FirstName</td>
    <td>FirstName</td>
    <td>Scalar</td>
    <td>string</td>
    </tr>
    <tr>
    <td>Element</td>
    <td>column</td>
    <td>LastName</td>
    <td>LastName</td>
    <td>Scalar</td>
    <td>string</td>
    </tr>
    <tr>
    <td>Element</td>
    <td>column</td>
    <td>Email</td>
    <td>Email</td>
    <td>Scalar</td>
    <td>string</td>
    </tr>
    </table>
   
   <a href="{{base_path}}/assets/img/learn/tutorials/data-service/output-mapping-3.png"><img src="{{base_path}}/assets/img/learn/tutorials/data-service/output-mapping-3.png" width="30%"></a>
 
14. Click **Submit**.

### Step 3: Configure the Micro Integrator server

To add the MySQL database driver to the server:

1. Copy the MySQL driver JAR (see [Setting up the Workspace](#step-1-set-up-the-workspace)) to `/project-path/deployment/libs`.

If the driver class does not exist in the relevant directory, you will get an exception such as `Cannot load JDBC driver class com.mysql.jdbc.Driver` when the Micro Integrator starts.

### Step 4: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

### Step 5: Test the data service

Let's test the use case by sending a simple client request that invokes the service.

#### Send the client request

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
            <th>URL</th>
            <td><code>http://localhost:8290/services/RDBMSDataService.HTTPEndpoint/Employee/3</code></br></br>
            </td>
        </tr>
     </table>
     
     <img src="{{base_path}}/assets/img/integrate/tutorials/119132155/rdbms-employee.png" width="800">
     
If you want to send the client request from your terminal:

1. Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2. Execute the following command.
    ```bash
    curl -X GET http://localhost:8290/services/RDBMSDataService.HTTPEndpoint/Employee/3
    ```

#### Analyze the response

You will see the following response received by your <b>HTTP Client</b>:

```xml
<Employees xmlns="http://ws.wso2.org/dataservice">
  <EmployeeNumber>3</EmployeeNumber>
  <FirstName>Edgar</FirstName>
  <LastName>Code</LastName>
  <Email>edgar@rdbms.com</Email>
</Employees>
```
