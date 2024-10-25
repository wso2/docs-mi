# How to Perform Batch Requesting

The batch requests feature allows you to send multiple (IN-Only)
requests to a datasource using a single operation (batch operation).

## Prerequisites

Let's create a MySQL database with the required data.

1.  Install the MySQL server.
2.  Create the following database: Company

    ```bash
    CREATE DATABASE Company;
    ```

3.  Create the **Employees** table:

    ```bash
    USE Company;


    CREATE TABLE `Employees` (`EmployeeNumber` int(11) NOT NULL, `FirstName` varchar(255) NOT NULL, `LastName` varchar(255) DEFAULT NULL, `Email` varchar(255) DEFAULT NULL, `JobTitle` varchar(255) DEFAULT NULL, `OfficeCode` int(11) NOT NULL, PRIMARY KEY (`EmployeeNumber`,`OfficeCode`));
    ```

## Synapse configuration

Given below is the data service configuration you need to build. See the instructions on how to [build and run](#build-and-run) this example.

!!! Tip
    Be sure to replace the datasource username and password with the correct values for your MySQL instance.

```xml
<data name="batch_requesting_sample" transports="http https local">
   <config enableOData="false" id="Datasource">
      <property name="driverClassName">com.mysql.jdbc.Driver</property>
      <property name="url">jdbc:mysql://localhost:3306/Company</property>
      <property name="username">root</property>
      <property name="password">password</property>
   </config>
   <query id="addEmployeeQuery" useConfig="Datasource">
      <sql>insert into Employees (EmployeeNumber, FirstName, LastName, Email, JobTitle, OfficeCode) values(:EmployeeNumber,:FirstName,:LastName,:Email,:JobTitle,:Officecode)</sql>
      <param name="EmployeeNumber" sqlType="STRING"/>
      <param name="FirstName" sqlType="STRING"/>
      <param name="LastName" sqlType="STRING"/>
      <param name="Email" sqlType="STRING"/>
      <param name="JobTitle" sqlType="STRING"/>
      <param name="Officecode" sqlType="STRING"/>
   </query>
   <operation name="addEmployeeOp">
      <call-query href="addEmployeeQuery">
         <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
         <with-param name="FirstName" query-param="FirstName"/>
         <with-param name="LastName" query-param="LastName"/>
         <with-param name="Email" query-param="Email"/>
         <with-param name="JobTitle" query-param="JobTitle"/>
         <with-param name="Officecode" query-param="Officecode"/>
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

Let's send a request with multiple transactions to the data service:

1. Download and Install [SoapUI](https://www.soapui.org/downloads/soapui.html) to run this SOAP service.
   1. Create a new SOAP project in SoapUI by using the following WSDL file:
      ```bash
      http://localhost:8290/services/batch_requesting_sample?wsdl
      ```

3. Update the **addEmployeeOp** operation (under **batch_requesting_sampleSOAP11Binding**) with the request body as shown below:

    !!! Tip
        In this example, we are sending two transactions with details of two employees.

    ```xml
    <p:addEmployeeOp_batch_req xmlns:p="http://ws.wso2.org/dataservice">
       <!--1 or more occurrences-->
       <addEmployeeOp xmlns="http://ws.wso2.org/dataservice">
          <!--Exactly 1 occurrence-->
          <xs:EmployeeNumber xmlns:xs="http://ws.wso2.org/dataservice">1002</xs:EmployeeNumber>
          <!--Exactly 1 occurrence-->
          <xs:FirstName xmlns:xs="http://ws.wso2.org/dataservice">John</xs:FirstName>
          <!--Exactly 1 occurrence-->
          <xs:LastName xmlns:xs="http://ws.wso2.org/dataservice">Doe</xs:LastName>
          <!--Exactly 1 occurrence-->
          <xs:Email xmlns:xs="http://ws.wso2.org/dataservice">johnd@wso2.com</xs:Email>
          <!--Exactly 1 occurrence-->
          <xs:JobTitle xmlns:xs="http://ws.wso2.org/dataservice">Consultant</xs:JobTitle>
          <!--Exactly 1 occurrence-->
          <xs:Officecode xmlns:xs="http://ws.wso2.org/dataservice">01</xs:Officecode>
       </addEmployeeOp>
       <addEmployeeOp xmlns="http://ws.wso2.org/dataservice">
          <!--Exactly 1 occurrence-->
          <xs:EmployeeNumber xmlns:xs="http://ws.wso2.org/dataservice">1004</xs:EmployeeNumber>
          <!--Exactly 1 occurrence-->
          <xs:FirstName xmlns:xs="http://ws.wso2.org/dataservice">Peter</xs:FirstName>
          <!--Exactly 1 occurrence-->
          <xs:LastName xmlns:xs="http://ws.wso2.org/dataservice">Parker</xs:LastName>
          <!--Exactly 1 occurrence-->
          <xs:Email xmlns:xs="http://ws.wso2.org/dataservice">peterp@wso2.com</xs:Email>
          <!--Exactly 1 occurrence-->
          <xs:JobTitle xmlns:xs="http://ws.wso2.org/dataservice">Consultant</xs:JobTitle>
          <!--Exactly 1 occurrence-->
          <xs:Officecode xmlns:xs="http://ws.wso2.org/dataservice">01</xs:Officecode>
       </addEmployeeOp>
    </p:addEmployeeOp_batch_req>
    ```
    
    <a href="{{base_path}}/assets/img/examples/data-integration/batch-requesting-soap-ui.png"><img src="{{base_path}}/assets/img/examples/data-integration/batch-requesting-soap-ui.png" title="Soap UI" width="900" alt="Soap UI"/></a>
    
4.  Invoke the **addEmployeeOp** operation.

You will find that all the records have been inserted into the `Employees` database simultaneously.

!!! Tip
    Want to confirm that the records are added to the database? Run the following MySQL command.
    
    ```bash
    SELECT * FROM Employees
    ```

!!! Note
    Additionally, you can add a resource to call the query to invoke batch request as a REST service invocation. For that you have to append `_batch_req` suffix to the [resource request path]({{base_path}}/reference/synapse-properties/data-services/elements-of-a-data-service/#defining-resources) when invoking. See the [how to post json data in batches]({{base_path}}/learn/examples/data-integration/json-with-data-service/#post-data-in-batches) documentation for more information. 
    
    Sample resource configuration:

    ```
    <resource method="POST" path="employee">
        <call-query href="addEmployeeQuery">
            <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
            <with-param name="FirstName" query-param="FirstName"/>
            <with-param name="LastName" query-param="LastName"/>
            <with-param name="Email" query-param="Email"/>
            <with-param name="JobTitle" query-param="JobTitle"/>
            <with-param name="Officecode" query-param="Officecode"/>
        </call-query>
    </resource>
    ```

    Request:
    
    1. First, create a file named `employee-batch-payload.json`, and define the JSON payload for posting multiple employee records (batch) as shown below.

        ```
        {
            "user_defined_value": {
                "user_defined_value": [
                    {
                        "EmployeeNumber": "5012",
                        "FirstName": "Will",
                        "LastName": "Smith",
                        "Email": "will@smith.com",
                        "JobTitle": "Consultant",
                        "Officecode": "01"
                    },
                    {
                        "EmployeeNumber": "5013",
                        "FirstName": "Parker",
                        "LastName": "Peter",
                        "Email": "peter@parker.com",
                        "JobTitle": "Consultant",
                        "Officecode": "01"
                    }
                ]
            }
        }
        ```
    
    2. On the terminal, navigate to the location where the `employee-batch-payload.json` file is stored, and execute the following HTTP request:
    
        ```
        curl -X POST -H 'Accept: application/json'  -H 'Content-Type: application/json' --data "@employee-batch-payload.json" -k -v http://localhost:8290/services/batch_requesting_sample/employee_batch_req
        ```