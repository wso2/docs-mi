# Database Polling Sample

This sample demonstrates database polling capability in the Micro Integrator.

Four modules get created with this sample which are; a scheduled task called `DoctorsRecordsSyncTask`, a sequence called `DoctorsRecordsSyncSeq`, an endpoint called `DoctorsDataServiceEP` and a data service called `DoctorsDataService`.

The data service module exposes three database operations; `ReadDoctors`, `UpdateDoctorsSyncStatus`, and `ReadDoctorsNotSync`.

The scheduled task runs periodically and injects a dummy payload to the sequence to initiate the messaging flow. The first payload is constructed to invoke the data service operation `ReadDoctors` and to retrieve the doctor records that are not synchronized. The second payload is constructed to update the not synchronized doctor records as a transaction. There is a special type of operation called request_box in the data service. The `ReadDoctorsNotSync` and `UpdateDoctorsSyncStatus` operations are wrapped with the request_box in order to run them in transactional manner.

## Setup database to run the sample

1. Create a database and a user with the following details and grant that user access to the database.

    ```bash
    CREATE DATABASE hospital_db;
    USE hospital_db;
    CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON hospital_db.* TO 'user'@'localhost';
    ```

2. Create a table and insert some records.

    ```bash
    CREATE TABLE `doctors` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(50) DEFAULT NULL,
    `hospital` varchar(50) DEFAULT NULL,
    `speciality` varchar(50) DEFAULT NULL,
    `availability` varchar(50) DEFAULT NULL,
    `charge` int(10) DEFAULT NULL,
    `sync` int(11) DEFAULT '0',
    PRIMARY KEY (`id`)
    );
    ```

    ```bash
    INSERT INTO doctors (name, hospital, speciality, availability, charge) values
    ('thomas collins', 'grand oak community hospital', 'surgery', '9.00 a.m - 11.00 a.m', 7000),
    ('henry parker', 'grand oak community hospital', ' ent', '9.00 a.m - 11.00 a.m', 4500),
    ('abner jones', 'grand oak community hospital', 'gynaecology', '8.00 a.m - 10.00 a.m', 11000),
    ('abner jones', 'grand oak community hospital', 'ent', '8.00 a.m - 10.00 a.m', 6750),
    ('anne clement', 'clemency medical center', 'surgery', '8.00 a.m - 10.00 a.m', 12000),
    ('thomas kirk', 'clemency medical center', 'gynaecology', '9.00 a.m - 11.00 a.m', 8000),
    ('cailen cooper', 'clemency medical center', 'paediatric', '9.00 a.m - 11.00 a.m', 5500),
    ('seth mears', 'pine valley community hospital', 'surgery', '3.00 p.m - 5.00 p.m', 8000),
    ('emeline fulton', 'pine valley community hospital', 'cardiology', '8.00 a.m - 10.00 a.m', 4000),
    ('jared morris', 'willow gardens general hospital', 'cardiology', '9.00 a.m - 11.00 a.m', 10000),
    ('henry foster', 'willow gardens general hospital', 'paediatric', '8.00 a.m - 10.00 a.m', 10000),
    ('chris brown', 'pine valley community hospital', 'surgery', '9.00 a.m - 11.00 a.m', 5500),
    ('victor ivan', 'pine valley community hospital', 'ent', '9.00 a.m - 11.00 a.m', 5500),
    ('jimmy carter', 'willow gardens general hospital', 'ent', '9.00 a.m - 11.00 a.m', 2500),
    ('peter simon', 'clemency medical center', 'cardiology', '9.00 a.m - 11.00 a.m', 6000);
    ```

## Deploying the sample

1. Open the sample by clicking on the **Database Polling** card.
2. Give a folder location to save the sample.
3. Open the `DoctorsDataService` data service artifact and update the RDBMS datasource in it by replacing the `URL`, `Username` and `Password` values with your database credentials.
4. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

A scheduled task will be executed after the carbon application is deployed in the server and that task will log data in the MI server console.
