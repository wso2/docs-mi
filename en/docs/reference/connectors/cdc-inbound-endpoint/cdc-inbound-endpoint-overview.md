# CDC Inbound Endpoint Overview

The CDC inbound protocol is used to perform Change Data Capture in MI. The changes happening to any external database can be listened to using the CDC inbound endpoint. The CDC protocol uses Debezium to connect with the databases and capture the events. The protocol itself outputs the event via a sequence through the Inbound Endpoint. Currently, CDC Inbound Endpoint supports MySQL, SQL Server, PostgreSQL, Oracle, and DB2 databases. You need to place the client JARs required for your CDC inside the Micro Integrator to use this inbound endpoint.

Go to the <a target="_blank" href="https://store.wso2.com/connector/mi-inbound-cdc">WSO2 Connector Store</a> to download the CDC Inbound Endpoint.

<img src="{{base_path}}/assets/img/integrate/connectors/cdc-store.png" title="CDC Store" width="200" alt="CDC Store"/>

## Compatibility

| Connector Version | Supported product versions |
| ------------- |-------------|
| 1.1.0    | MI 4.3.0, MI 4.2.0 |

## CDC inbound endpoint

* **[CDC Inbound Endpoint Configuration]({{base_path}}/reference/connectors/cdc-inbound-endpoint/cdc-inbound-endpoint-configuration)**: This documentation provides guidance on setting up the CDC Inbound Endpoint environment with the necessary JAR files and database configurations.

* **[CDC Inbound Endpoint Example]({{base_path}}/reference/connectors/cdc-inbound-endpoint/cdc-inbound-endpoint-example)**: In this example, you will learn how to configure **CDC Inbound Endpoint** so that it can listen to data changes done to a **MySQL** table.

* **[CDC Inbound Endpoint Reference]({{base_path}}/reference/connectors/cdc-inbound-endpoint/cdc-inbound-endpoint-config)**: This documentation provides a reference guide for the CDC Inbound Endpoint.
