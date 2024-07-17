# Students Data Service Sample

This sample demonstrates the capability of the Micro Integrator to perform CRUD operations via a data service using the SOAP protocol.

This sample contains a Data Service called `StudentDataService` that include data sources and queries required to perform the CRUD operations.

## Setup database to run the sample

1. Create a database and a user with the following details and grant that user access to the database.

    ```bash
    CREATE DATABASE school_db;
    USE school_db;
    CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON school_db.* TO 'user'@'localhost';
    ```

2. Create a table and insert some records.

    ```bash
    CREATE TABLE `students` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
    `school` varchar(50) DEFAULT NULL,
    `grade` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
    );
    ```
    
    ```bash
    INSERT INTO students (name, school, grade) VALUES
    ('Tim', 'Summer School', 7),
    ('Peter', 'Burnley High School', 10);
    ```

## Deploying the sample

1. Open the sample by clicking on the **Students Data Service** card.
2. Give a folder location to save the sample.
3. Open the `StudentDataService` data service artifact and update the RDBMS datasource in it by replacing the `URL`, `Username` and `Password` values with your database credentials.
4. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

Open a terminal and run the following commands to invoke the APIs.

   - curl for create student operation

   ```bash
   curl --location --request POST 'http://localhost:8290/services/StudentDataService' \
   --header 'SOAPAction: urn:CreateStudents' \
   --header 'Content-Type: text/xml' \
   --data-raw '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://ws.wso2.org/dataservice">
        <soapenv:Header/>
        <soapenv:Body>
            <dat:CreateStudents>
                <dat:name>Sam</dat:name>
                <dat:school>Mary College</dat:school>
                <dat:grade>8</dat:grade>
            </dat:CreateStudents>
        </soapenv:Body>
   </soapenv:Envelope>'
   ```

   - curl for read student operation

   ```bash
   curl --location --request POST 'http://localhost:8290/services/StudentDataService' \
   --header 'SOAPAction: urn:ReadStudents' \
   --header 'Content-Type: text/xml' \
   --data-raw '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://ws.wso2.org/dataservice">
        <soapenv:Header/>
        <soapenv:Body>
            <dat:ReadStudents/>
        </soapenv:Body>
   </soapenv:Envelope>'
   ```

   - curl for update student operation

   ```bash
   curl --location --request POST 'http://localhost:8290/services/StudentDataService' \
   --header 'SOAPAction: urn:UpdateStudents' \
   --header 'Content-Type: text/xml' \
   --data-raw '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://ws.wso2.org/dataservice">
        <soapenv:Header/>
        <soapenv:Body>
            <dat:UpdateStudents>
                <dat:name>Sam</dat:name>
                <dat:school>Mary College</dat:school>
                <dat:grade>6</dat:grade>
                <dat:id>3</dat:id>
            </dat:UpdateStudents>
        </soapenv:Body>
   </soapenv:Envelope>'
   ```

   - curl for delete student operation

   ```bash
   curl --location --request POST 'http://localhost:8290/services/StudentDataService' \
   --header 'SOAPAction: urn:DeleteStudents' \
   --header 'Content-Type: text/xml' \
   --data-raw '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://ws.wso2.org/dataservice">
        <soapenv:Header/>
        <soapenv:Body>
            <dat:DeleteStudents>
                <dat:id>3</dat:id>
            </dat:DeleteStudents>
        </soapenv:Body>
   </soapenv:Envelope>'
   ```
