# How to Invoke Multiple Operations as a Request Box

This example demonstrates how a data service can invoke request
box operations. The **request box** feature allows you to invoke
multiple operations (consecutively) to a datasource using a single
operation.

**Boxcarring** is a method of grouping a set of service calls so that
they can be executed as a group (i.e., the individual service calls are
executed consecutively in the specified order). Note that we have now
deprecated the boxcarring method for data services. Instead, we have
replaced boxcarring with a new request type called **request_box** .

**Request box** is simply a wrapper element (request_box), which wraps
the service calls that need to be invoked. When the request_box is
invoked, the individual service calls are executed in the specified
order, and the result of the last service call in the list are returned.
In this tutorial, we are using the request box to invoke the following
two service calls:

1.  Add a new employee to the database
2.  Get details of the office of the added employee

When you click the **Enable Boxcarring** check box for the data service,
both of the above functions (**Boxcarring** and **Request box**) are
enabled. However, since boxcarring is deprecated in the product, it is
recommended to disable boxcarring by clicking the **Disable Legacy
Boxcarring Mode** check box.

## Prerequisites

Let's create a MySQL database with the required data.

1. Install the MySQL server.
2. Create a database named **Company**.

      ```bash
      CREATE DATABASE Company;
      ```

3. Create the **Employees** table:

      ```bash
      USE Company;

      CREATE TABLE `Employees` (`EmployeeNumber` int(11) NOT NULL, `FirstName` varchar(255) NOT NULL, `LastName` varchar(255) DEFAULT NULL, `Email` varchar(255) DEFAULT NULL, `JobTitle` varchar(255) DEFAULT NULL, `OfficeCode` int(11) NOT NULL, PRIMARY KEY (`EmployeeNumber`,`OfficeCode`));
      ```

## Synapse configuration
Given below is the data service configuration you need to build. See the instructions on how to [build and run](#build-and-run) this example.

!!! Tip
    Be sure to replace the datasource username and password with the correct values for your MySQL instance.

```xml
<data disableLegacyBoxcarringMode="true" enableBoxcarring="true" name="request_box_example" transports="http https local">
   <config enableOData="false" id="Datasource">
      <property name="driverClassName">com.mysql.jdbc.Driver</property>
      <property name="url">jdbc:mysql://localhost:3306/Company</property>
      <property name="username">root</property>
      <property name="password">password</property>
   </config>
   <query id="addEmployeeQuery" useConfig="Datasource">
      <sql>insert into Employees (EmployeeNumber, FirstName, LastName, Email,OfficeCode) values(:EmployeeNumber,:FirstName,:LastName,:Email,:OfficeCode)</sql>
      <param name="EmployeeNumber" sqlType="STRING"/>
      <param name="FirstName" sqlType="STRING"/>
      <param name="LastName" sqlType="STRING"/>
      <param name="Email" sqlType="STRING"/>
      <param name="OfficeCode" sqlType="STRING"/>
   </query>
   <query id="selectEmployeebyIDQuery" useConfig="Datasource">
      <sql>select EmployeeNumber, FirstName, LastName, Email, OfficeCode from Employees where EmployeeNumber=:EmployeeNumber</sql>
      <result element="Entries" rowName="Entry">
         <element column="EmployeeNumber" name="EmployeeNumber" xsdType="string"/>
         <element column="FirstName" name="FirstName" xsdType="string"/>
         <element column="LastName" name="LastName" xsdType="string"/>
         <element column="Email" name="Email" xsdType="string"/>
         <element column="OfficeCode" name="OfficeCode" xsdType="string"/>
      </result>
      <param name="EmployeeNumber" sqlType="STRING"/>
   </query>
   <operation name="addEmployeeOp">
      <call-query href="addEmployeeQuery">
         <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
         <with-param name="FirstName" query-param="FirstName"/>
         <with-param name="LastName" query-param="LastName"/>
         <with-param name="Email" query-param="Email"/>
         <with-param name="OfficeCode" query-param="OfficeCode"/>
      </call-query>
   </operation>
   <operation name="selectEmployeeOp">
      <call-query href="selectEmployeebyIDQuery">
         <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
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
2. Create a new SOAP Project in the SoapUI using following WSDL file:
   ```bash
   http://localhost:8290/services/request_box_example?wsdl
   ```

3. Invoke the **request_box** under **request_box_exampleSOAP12Binding** with the following request body:

    !!! Tip
        Note that we are sending two transactions with details of two employees.

    ```xml
    <dat:request_box xmlns:p="http://ws.wso2.org/dataservice">
       <!--Exactly 1 occurrence-->
       <addEmployeeOp xmlns="http://ws.wso2.org/dataservice">
             <!--Exactly 1 occurrence-->
             <xs:EmployeeNumber xmlns:xs="http://ws.wso2.org/dataservice">1003</xs:EmployeeNumber>
             <!--Exactly 1 occurrence-->
             <xs:FirstName xmlns:xs="http://ws.wso2.org/dataservice">Chris</xs:FirstName>
             <!--Exactly 1 occurrence-->
             <xs:LastName xmlns:xs="http://ws.wso2.org/dataservice">Sam</xs:LastName>
             <!--Exactly 1 occurrence-->
             <xs:Email xmlns:xs="http://ws.wso2.org/dataservice">chris@sam.com</xs:Email>
             <!--Exactly 1 occurrence-->
             <xs:OfficeCode xmlns:xs="http://ws.wso2.org/dataservice">1</xs:OfficeCode>
       </addEmployeeOp>
       <!--Exactly 1 occurrence-->
       <selectEmployeeOp xmlns="http://ws.wso2.org/dataservice">
             <!--Exactly 1 occurrence-->
             <xs:EmployeeNumber xmlns:xs="http://ws.wso2.org/dataservice">1003</xs:EmployeeNumber>
       </selectEmployeeOp>
    </dat:request_box>
    ```

You will see the following response received by SoapUI:

```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
<soapenv:Body>
      <axis2ns16:DATA_SERVICE_REQUEST_BOX_RESPONSE xmlns:axis2ns16="http://ws.wso2.org/dataservice">
            <Entries xmlns="http://ws.wso2.org/dataservice">
                  <Entry>
                        <EmployeeNumber>1003</EmployeeNumber>
                        <FirstName>Chris</FirstName>
                        <LastName>Sam</LastName>
                        <Email>chris@sam.com</Email>
                        <OfficeCode>1</OfficeCode>
                  </Entry>
            </Entries>
      </axis2ns16:DATA_SERVICE_REQUEST_BOX_RESPONSE>
</soapenv:Body>
</soapenv:Envelope>
```

!!! Note
    Additionally, you can add resources to call the queries to invoke request_box as a REST service invocation. For that you have to append `request_box` to the URL when invoking. See the [how to post data using request box]({{base_path}}/learn/examples/data-integration/json-with-data-service/#post-data-using-request-box) documentation for more information.

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
    <resource method="GET" path="employee/{EmployeeNumber}">
        <call-query href="selectEmployeebyIDQuery">
            <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
        </call-query>
    </resource>
    ```

    Request:
    
    1. First, create a file named `employee-request-box-payload.json`, and define the JSON payload for posting the request box as shown below.
    
        ```
        {
            "request_box"  : {
                "_postemployee" : {
                    "EmployeeNumber"  : "14005",
                    "LastName" :  "Smith" ,
                    "FirstName" :  "Will" ,
                    "Email" :  "will@google.com" ,
                    "JobTitle": "Consultant",
                    "Officecode": "01"
                },
                "_getemployee_employeenumber":{
                    "EmployeeNumber"  : "14005"
                }
            }
        }
        ```
    
    2. On the terminal, navigate to the location where the `employee-request-box-payload.json` file is stored, and execute the following HTTP request:
    
        ```
        curl -X POST -H 'Accept: application/json'  -H 'Content-Type: application/json' --data "@employee-request-box-payload.json" http://localhost:8290/services/request_box_example/request_box
        ```
