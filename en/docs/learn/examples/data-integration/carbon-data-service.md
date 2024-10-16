# How to Expose a Carbon Datasource as a Data Service

A Carbon datasource is an RDBMS or a custom datasource created using the
Micro Integrator. You can simply use
that as the datasource for a data service. A Carbon datasource is
persistent, and can be used whenever required.

## Prerequisites

Create a MySQL database with the required data.

1.  Install the MySQL server.
2.  Create a database named `Employees`.

    ```bash
    CREATE DATABASE Employees;
    ```

3.  Create the `Employees` table inside the `Employees` database:

    ```bash
    USE Employees;

    CREATE TABLE Employees (EmployeeNumber int(11) NOT NULL, FirstName varchar(255) NOT NULL, LastName varchar(255) DEFAULT NULL, Email varchar(255) DEFAULT NULL, Salary varchar(255));
    ```

## Synapse configurations

Given below is the data service configuration you need to build. See the instructions on how to [build and run](#build-and-run) this example.

-	**Carbon** datasource

	```xml
	<datasource>
	    <name>rdbms_datasource_mysql</name>
	    <description>MySQL Connection</description>
	    <jndiConfig useDataSourceFactory="false">
	        <name>MysqlConJNDI1</name>
	    </jndiConfig>
	    <definition type="RDBMS">
	        <configuration>
	            <driverClassName>com.mysql.jdbc.Driver</driverClassName>
	            <url>jdbc:mysql://localhost:3306/Employees</url>
	            <username>username</username>
	            <password>password</password>
	        </configuration>
	    </definition>
	</datasource>
	```

-	**Data service**

	```xml
	<data name="RDBMSDataService_3" transports="http https local">
	   <config enableOData="false" id="Datasource">
	      <property name="carbon_datasource_name">rdbms_datasource_mysql</property>
	   </config>
	   <query id="GetEmployeeDetails" useConfig="Datasource">
	      <sql>select EmployeeNumber, FirstName, LastName, Email, Salary from Employees where EmployeeNumber=:EmployeeNumber</sql>
	      <result element="Entries" rowName="Entry">
	         <element column="EmployeeNumber" name="EmployeeNumber" xsdType="string"/>
	         <element column="FirstName" name="FirstName" xsdType="string"/>
	         <element column="LastName" name="LastName" xsdType="string"/>
	         <element column="Email" name="Email" xsdType="string"/>
	         <element column="Salary" name="Salary" xsdType="string"/>
	      </result>
	      <param name="EmployeeNumber" sqlType="STRING"/>
	   </query>
	   <operation name="GetEmployeeOp">
	      <call-query href="GetEmployeeDetails">
	         <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
	      </call-query>
	   </operation>
	   <resource method="GET" path="Employee/{EmployeeNumber}">
	      <call-query href="GetEmployeeDetails">
	         <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
	      </call-query>
	   </resource>
	</data>
	```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
 
3. [Create a datasource]({{base_path}}/develop/creating-artifacts/data-services/creating-datasources) with the data source configuration given above.
4. [Create the data service]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services) with the data service configurations given above.
5. Download the JDBC driver for MySQL from [here](http://dev.mysql.com/downloads/connector/j/).
6. Switch to the **EXPLORER** view in VS Code and copy the downloaded driver to the `<PROJECT_NAME>/deployment/lib/` directory in the project structure.
   
    !!! Note
        If the driver class does not exist in the relevant folders when you create the datasource, you will get an exception such as `Unable to load class: com.mysql.jdbc.Driver`.
   
7. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator. 

The service can be invoked in REST-style via [curl](http://curl.haxx.se/). Shown below is the curl
command to invoke the GET resource:

```bash
curl -X GET http://localhost:8290/services/RDBMSDataService_3.HTTPEndpoint/Employee/3
```

This generates a response as follows.

```bash
<Entries xmlns="http://ws.wso2.org/dataservice"><Entry><EmployeeNumber>3</EmployeeNumber><FirstName>Will</FirstName><LastName>Smith</LastName><Email>will@google.com</Email><Salary>15500.0</Salary></Entry><Entry><EmployeeNumber>3</EmployeeNumber><FirstName>Will</FirstName><LastName>Smith</LastName><Email>will@google.com</Email><Salary>15500.0</Salary></Entry><Entry><EmployeeNumber>3</EmployeeNumber><FirstName>Will</FirstName><LastName>Smith</LastName><Email>will@google.com</Email><Salary>15500.0</Salary></Entry></Entries>
```
