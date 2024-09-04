# CDC Inbound Endpoint Reference

The following configurations allow you to configure the CDC Inbound Endpoint for your scenario. 

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:20px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-0pky">Parameter</th>
    <th class="tg-0pky">Default Value</th>
    <th class="tg-0pky">Description</th>
  </tr>
  <tr>
    <td class="tg-0pky">interval</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The polling interval for the inbound endpoint to execute each cycle. This value is set in milliseconds.</td>
  </tr>
  <tr>
    <td class="tg-0pky">coordination</td>
    <td class="tg-0pky">true</td>
    <td class="tg-0pky">This optional property is only applicable in a cluster environment. In a clustered environment, an inbound endpoint will only be executed in worker nodes. If set to <code>true</code> in a cluster setup, this will run the inbound only in a single worker node. Once the running worker is down, the inbound starts on another available worker in the cluster. By default, coordination is enabled.</td>
  </tr>
  <tr>
    <td class="tg-0pky">sequential</td>
    <td class="tg-0pky">true</td>
    <td class="tg-0pky">Whether the messages need to be polled and injected sequentially or not. By default, this is set to <code>true</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">connector.name</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Unique name for the connector. If not present, the inbound endpoint name is considered as the connector name. </td>
  </tr>
  <tr>
    <td class="tg-0pky">snapshot.mode</td>
    <td class="tg-0pky">initial</td>
    <td class="tg-0pky">Specifies the criteria for running a snapshot when the connector starts. Possible settings are: <code>always</code>, <code>initial</code>, <code>initial_only</code>, <code>schema_only</code>, <code>no_data</code>, <code>recovery</code>, <code>when_needed</code>, <code>configuration_based</code>, and <code>custom</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">connector.class</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The name of the Java class for the connector.<br>
Example: <br>
For MySQL database, <code>io.debezium.connector.mysql.MySqlConnector</code><br>
For PostgreSQL database, <code>io.debezium.connector.postgresql.PostgresConnector</code><br>
For Oracle database, <code>io.debezium.connector.oracle.OracleConnector</code><br>
For Db2 database, <code>io.debezium.connector.db2.Db2Connector</code></td>
  </tr>
  <tr>
    <td class="tg-0pky">topic.prefix</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Topic prefix that provides a namespace for the database server that you want Debezium to capture. The prefix should be unique across all other connectors since it is used as the prefix for all Kafka topic names that receive records from this connector. Only alphanumeric characters, hyphens, dots, and underscores must be used in the database server logical name.</td>
  </tr>
  <tr>
    <td class="tg-0pky">schema.history.internal</td>
    <td class="tg-0pky">FileSchemaHistory</td>
    <td class="tg-0pky">The name of the Java class that is responsible for the persistence of the database schema history. It must implement <code><…>.SchemaHistory</code> interface.<br>

Refer <a href="https://debezium.io/documentation/reference/stable/development/engine.html#database-history-properties">Database schema history properties</a> documentation and <a href="https://debezium.io/documentation/reference/stable/operations/debezium-server.html#debezium-source-configuration-properties">Debezium source configuration</a> documentation for more information.</td>
  </tr>
  <tr>
    <td class="tg-0pky">schema.history.internal.file.filename</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">This value is required only if <code>io.debezium.storage.file.history.FileSchemaHistory</code> was provided for the <code>schema.history.internal</code> value. You need to specify the path to a file where the database schema history is stored.
By default, the file will be stored in the <code>&lt;MI Home&gt;/cdc/schemaHistory</code> directory.</td>
  </tr>
  <tr>
    <td class="tg-0pky">schema.history.internal.kafka.topic</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The Kafka topic where the database schema history is stored.
Required when <code>schema.history.internal</code> is set to the <code><…>.KafkaSchemaHistory</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">schema.history.internal.kafka.bootstrap.servers</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The initial list of Kafka cluster servers to connect to. The cluster provides the topic to store the database schema history.
Required when <code>schema.history.internal</code> is set to the <code><…​>.KafkaSchemaHistory</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">offset.storage</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The name of the Java class that is responsible for the persistence of connector offsets. It must implement <code><…>.OffsetBackingStore</code> interface.</td>
  </tr>
  <tr>
    <td class="tg-0pky">offset.storage.file.filename</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Path to file where offsets are to be stored. Required when <code>offset.storage</code> is set to the <code><…>.FileOffsetBackingStore</code>.
By default, the file will be stored in the <code>&lt;MI Home&gt;/cdc/offsetStorage</code> directory.</td>
  </tr>
  <tr>
    <td class="tg-0pky">offset.storage.topic</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The name of the Kafka topic where offsets are to be stored. Required when <code>offset.storage</code> is set to the <code><…​>.KafkaOffsetBackingStore</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">offset.storage.partitions</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The number of partitions used when creating the offset storage topic. Required when <code>offset.storage</code> is set to the <code><…​>.KafkaOffsetBackingStore</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">offset.storage.replication.factor</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Replication factor used when creating the offset storage topic. Required when <code>offset.storage</code> is set to the <code><…​>.KafkaOffsetBackingStore</code>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.hostname</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">IP address or hostname of the database server</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.port</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Port number (Integer) of the database server</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.user</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Name of the database user to use when connecting to the database server.</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.password</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The password to connect to the database.<br>
Example: <code><parameter name="database.password">your_password</parameter></code>

or

<code><parameter name="database.password">{wso2:vault-lookup(password_alias')}</parameter></code></td>
  </tr>
  <tr>
    <td class="tg-0pky">database.dbname</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The name of the database that needs to be listened to.<br>
*This is applicable only for MySQL, Postgres, Oracle, and Db2</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.instance</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Specifies the instance name of the SQL Server named instance.<br>
*This is applicable only for SQL Server</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.names</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The comma-separated list of the SQL Server database names from which to stream the changes.<br>
*This is applicable only for SQL Server</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.server.id</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">A numeric ID of this database client, which must be unique across all currently running database processes in the MySQL cluster.<br>
*This is applicable only for MySQL</td>
  </tr>
  <tr>
    <td class="tg-0pky">table.include.list</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">The list of tables from the selected database that the changes for them need to be captured.<br>
Example: <code><parameter name="table.include.list">inventory.products</parameter></code></td>
  </tr>
  <tr>
    <td class="tg-0pky">allowed.operations</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Operations that the user needs to listen to, in the specified database tables.
Should provide comma-separated values for create/update/delete/truncate.<br>
Example: create, update, delete<br>
By default, truncate operations are skipped.</td>
  </tr>
  <tr>
    <td class="tg-0pky">database.out.server.name</td>
    <td class="tg-0pky">-</td>
    <td class="tg-0pky">Name of the XStream outbound server configured in the database.<br>
*Only applicable if you are using Oracle database.</td>
  </tr>
</table>

For more custom configurations, please refer to the [Debezium](https://debezium.io/documentation/reference/stable/index.html) documentation.
