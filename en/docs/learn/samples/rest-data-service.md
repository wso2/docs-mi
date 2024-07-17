# REST Data Service Sample

This sample demonstrates the capability of the Micro Integrator to perform CRUD operations via a data service using the REST protocol.

This sample contains a Data Service called `RESTDataService` that include data sources and queries required to perform the CRUD operations.

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

1. Open the sample by clicking on the **REST Data Service** card.
2. Give a folder location to save the sample.
3. Open the `RESTDataService` data service artifact and update the RDBMS datasource in it by replacing the `URL`, `Username` and `Password` values with your database credentials.
4. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

Open a terminal and run the following commands to invoke the APIs.

   - curl for create student

   ```bash
   curl --location --request POST 'http://localhost:8290/services/RESTDataService/student' --header 'Content-Type: application/json' \
   --data-raw '{
      "_poststudent": {
        "name" : "Will Smith",
        "school": "Beverly Hills School",
        "grade": 10
      }
   }'
   ```

   - curl for read student

   ```bash
   curl --location --request GET 'http://localhost:8290/services/RESTDataService/student'
   ```

   - curl for update student

   ```bash
   curl --location --request PUT 'http://localhost:8290/services/RESTDataService/student' --header 'Content-Type: application/json' \
   --data-raw '{
      "_putstudent": {
          "id" : 3,
        "name" : "Will Smith",
        "school": "Beverly Hills School",
        "grade": 11
      }
   }'
   ```

   - curl for delete student

   ```bash
   curl --location --request DELETE 'http://localhost:8290/services/RESTDataService/student' --header 'Content-Type: application/json' \
   --data-raw '{
     "_deletestudent": {
         "id" : 3
     }
   }'
   ```
