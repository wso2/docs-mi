# How to Validate Data Input

Validators are added to individual input mappings in a query. Input
validation allows data services to validate the input parameters in a
request and stop the execution of the request if the input doesn’t meet
the required criteria. WSO2 Micro Integrator provides a set of built-in validators for some of the most
common use cases. It also provides an extension mechanism to write
custom validators.

## Prerequisites

Let's create a MySQL database with the required data.

1.  Install the MySQL server.
2.  Create a database named `           EmployeeDatabse          ` .

    ```bash
    CREATE DATABASE EmployeeDatabase;
    ```

3.  Create the Employee table inside the Employees database:

    ```bash
    USE EmployeeDatabase;

    CREATE TABLE Employees (EmployeeNumber int(11) NOT NULL, FirstName varchar(255) NOT NULL, LastName varchar(255) DEFAULT NULL, Email varchar(255) DEFAULT NULL, Salary varchar(255));
    ```

## Synapse configuration
Given below is the data service configuration you need to build. See the instructions on how to [build and run](#build-and-run) this example.

```xml
<data name="input_validator_sample" transports="http https local">
   <config enableOData="false" id="Datasource">
      <property name="driverClassName">com.mysql.jdbc.Driver</property>
      <property name="url">jdbc:mysql://localhost:3306/EmployeeDatabase</property>
      <property name="username">root</property>
      <property name="password">password</property>
   </config>
   <query id="addEmployeeQuery" useConfig="Datasource">
      <sql>insert into Employees (EmployeeNumber, FirstName, LastName, Email, Salary) values(:EmployeeNumber,:FirstName,:LastName,:Email,:Salary)</sql>
      <param name="EmployeeNumber" sqlType="STRING"/>
      <param name="FirstName" sqlType="STRING">
            <validateLength maximum="10" minimum="3"/>
      </param>
      <param name="LastName" sqlType="STRING"/>
      <param name="Email" sqlType="STRING"/>
      <param name="Salary" sqlType="STRING"/>

   </query>
   <operation name="addEmployeeOp">
      <call-query href="addEmployeeQuery">
         <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
         <with-param name="FirstName" query-param="FirstName"/>
         <with-param name="LastName" query-param="LastName"/>
         <with-param name="Email" query-param="Email"/>
         <with-param name="Salary" query-param="Salary"/>
      </call-query>
   </operation>
</data>
```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

3. [Create the data service]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services) with the configurations given above.

4. Download the JDBC driver for MySQL from [here](http://dev.mysql.com/downloads/connector/j/).

5. Switch to the **EXPLORER** view in VS Code and copy the downloaded driver to the `<PROJECT_NAME>/deployment/lib/` directory in the project structure.

    !!! Note
        If the driver class does not exist in the relevant folders when you create the datasource, you will get an exception such as `Unable to load class: com.mysql.jdbc.Driver`.

6. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Let's send a request with invalid and valid data to the data service:

1. Download and Install [SoapUI](https://www.soapui.org/downloads/soapui.html) to run this SOAP service.
2. Create a new SOAP project in SoapUI by using the following WSDL file:
   ```bash
   http://localhost:8290/services/input_validator_sample?wsdl
   ```
   
3. Update the **addEmployeeOp** operation (under **input_validator_sample.SOAP12Binding**) with the request body as shown below:

    ```xml
    <dat:addEmployeeOp>
        <dat:EmployeeNumber>6001</dat:EmployeeNumber>
        <dat:FirstName>AB</dat:FirstName>
        <dat:LastName>Nick</dat:LastName>
        <dat:Email>test@test.com</dat:Email>
        <dat:Salary>1500</dat:Salary>
    </dat:addEmployeeOp>
    ```
    
4. Invoke the **addEmployeeOp** operation. A validation error is thrown as the response because the **addEmployeeOp** operation has failed. This is because the FirstName only has 2 characters.

5. Now, change the FirstName value in the request as shown below and invoke the operation again.
    ```xml
    <dat:addEmployeeOp>
        <dat:EmployeeNumber>6001</dat:EmployeeNumber>
        <dat:FirstName>ABC</dat:FirstName>
        <dat:LastName>Nick</dat:LastName>
        <dat:Email>test@test.com</dat:Email>
        <dat:Salary>1500</dat:Salary>
    </dat:addEmployeeOp>
    ```
    The employee details are added to the database table.
