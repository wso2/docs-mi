# Set up the CDC Inbound Endpoint Environment

## Setup MySQL

1. First, install [MySQL database v8.x.x](https://www.mysql.com/) locally. If you have a remote server, please obtain the credentials required to connect.  

2. Create a user. For detailed instructions, refer to the [MySQL Creating User](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-creating-user) documentation. 

3. Enable binlog. For detailed instructions, refer to the [Enable MySQL Binlog](https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-binlog) documentation. 

4. Enable GTIDs. For detailed instructions, refer to the [Enable MySQL GTIDs](https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-gtids) documentation. 

5. Download the [Debezium MySQL Connecter Plug-in version 2.7.4.Final](https://debezium.io/releases/2.7/) and Extract.

6. Download the latest Debezium Orbit JAR v2.7.4 from [nexus](https://maven.wso2.org/nexus/content/repositories/public/org/wso2/orbit/debezium/debezium/) and place it in `<PROJECT_HOME>/deployment/libs` directory. 

7.  Copy the following JAR files to `<PROJECT_HOME>/deployment/libs`:
    - `mysql-connector-j-8.3.0.jar`
    - `antlr4-runtime-4.10.1.jar`

8.  Copy the following JAR files to `<MI_HOME>/wso2/lib`:
    - `debezium-connector-mysql-2.7.4.Final.jar`
    - `debezium-core-2.7.4.Final.jar`


!!!Note
    - `<PROJECT_HOME>` refers to the directory where your integration project is located.
    - `<MI_HOME>` refers to the extracted folder of the WSO2 Micro Integrator zip.


## Setup PostgreSQL

1. Install [PostgreSQL](https://www.postgresql.org/download/) locally or ensure you have access to a remote PostgreSQL instance with the necessary credentials.
   
2. Configuring the PostgreSQL server. For detailed instructions, refer to the [Configuring the PostgreSQL server](https://debezium.io/documentation//reference/2.7/connectors/postgresql.html#postgresql-server-configuration) documentation.

3. Download the [Debezium PostgreSQL Plug-in version 2.7.4.Final](https://debezium.io/releases/2.7/) and Extract.

4. Download the latest Debezium Orbit JAR v2.7.4 from [nexus](https://maven.wso2.org/nexus/content/repositories/public/org/wso2/orbit/debezium/debezium/) and place it in `<PROJECT_HOME>/deployment/libs`.

5. Copy the following JAR files to `<PROJECT_HOME>/deployment/libs`:
    - `postgresql-42.6.1.jar`
    - `protobuf-java-3.25.5.jar`

6. Copy the following JAR files to `<MI_HOME>/wso2/lib`:
    - `debezium-connector-postgres-2.7.4.Final.jar`
    - `debezium-core-2.7.4.Final.jar`


!!!Note
    - `<PROJECT_HOME>` refers to the directory where your integration project is located.
    - `<MI_HOME>` refers to the extracted folder of the WSO2 Micro Integrator zip.

## Setup MS SQL Server

1. Install [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) locally or ensure you have access to a remote SQL Server instance with the necessary credentials.

2. Enable Change Data Capture (CDC) in both database and server. For detailed instructions, refer to the [Enable MSSQL CDC](https://debezium.io/documentation//reference/2.7/connectors/sqlserver.html#setting-up-sqlserver) documentation.

3. Download the [Debezium SQL Server Plug-in version 2.7.4.Final](https://debezium.io/releases/2.7/) and Extract.

4. Download the latest Debezium Orbit JAR v2.7.4 from [nexus](https://maven.wso2.org/nexus/content/repositories/public/org/wso2/orbit/debezium/debezium/) and place it in `<PROJECT_HOME>/deployment/libs`.

5. Copy the following JAR files to `<PROJECT_HOME>/deployment/libs`:
    - `mssql-jdbc-12.8.1.jre8.jar`

6. Copy the following JAR files to `<MI_HOME>/wso2/lib`:
    - `debezium-connector-sqlserver-2.7.4.Final.jar`
    - `debezium-core-2.7.4.Final.jar`


!!!Note
    - `<PROJECT_HOME>` refers to the directory where your integration project is located.
    - `<MI_HOME>` refers to the extracted folder of the WSO2 Micro Integrator zip.
