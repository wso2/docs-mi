# CDC Inbound Endpoint Reference

The following configurations allow you to configure the CDC Inbound Endpoint for your scenario. 

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>interval</td>
    <td>The polling interval for the inbound endpoint to execute each cycle. This value is set in milliseconds.</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>coordination</td>
    <td>This optional property is only applicable in a cluster environment. In a clustered environment, an inbound endpoint will be executed in all worker nodes. If set to <code>true</code> in a cluster setup, this will run the inbound only in a single worker node. Once the running worker is down, the inbound starts on another available worker in the cluster. By default, coordination is enabled.</td>
    <td>Yes</td>
    <td>true</td>
  </tr>
  <tr>
    <td>sequential</td>
    <td>Whether the messages need to be polled and injected sequentially or not. By default, this is set to <code>true</code>.</td>
    <td>Yes</td>
    <td>true</td>
  </tr>
  <tr>
    <td>snapshot.mode</td>
    <td>Specifies the criteria for running a snapshot when the connector starts. Possible values are: <code>always</code>, <code>initial</code>, <code>initial_only</code>, <code>schema_only</code>, <code>no_data</code>, <code>recovery</code>, <code>when_needed</code>, <code>configuration_based</code>, and <code>custom</code>.</td>
    <td>Yes</td>
    <td>initial</td>
  </tr>
  <tr>
    <td>connector.class</td>
    <td>The name of the Java class for the connector.<br>
Example: <br>
For MySQL database, <code>io.debezium.connector.mysql.MySqlConnector</code><br>
For PostgreSQL database, <code>io.debezium.connector.postgresql.PostgresConnector</code><br>
For Oracle database, <code>io.debezium.connector.oracle.OracleConnector</code><br>
For Db2 database, <code>io.debezium.connector.db2.Db2Connector</code></td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.hostname</td>
    <td>IP address or hostname of the database server</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.port</td>
    <td>Port number (Integer) of the database server</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.user</td>
    <td>Name of the database user to use when connecting to the database server.</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.password</td>
    <td>The password to connect to the database.<br>
Example: <code><parameter name="database.password">your_password</parameter></code> or <code><parameter name="database.password">{wso2:vault-lookup(password_alias')}</parameter></code></td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.dbname</td>
    <td>The name of the database that needs to be listened to.<br>
*This is applicable only for MySQL, Postgres, Oracle, and Db2</td>
    <td>Yes</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connector.name</td>
    <td>Unique name for the connector. If not present, the inbound endpoint name is considered as the connector name. </td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>topic.prefix</td>
    <td>Topic prefix that provides a namespace for the database server that you want Debezium to capture. The prefix should be unique across all other connectors since it is used as the prefix for all Kafka topic names that receive records from this connector. Only alphanumeric characters, hyphens, dots, and underscores must be used in the database server logical name.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>schema.history.internal</td>
    <td>The name of the Java class that is responsible for the persistence of the database schema history. It must implement <code>io.debezium.relational.history.SchemaHistory</code> interface.<br>

Refer <a href="https://debezium.io/documentation/reference/stable/development/engine.html#database-history-properties">Database schema history properties</a> documentation and <a href="https://debezium.io/documentation/reference/stable/operations/debezium-server.html#debezium-source-configuration-properties">Debezium source configuration</a> documentation for more information.</td>
    <td>No</td>
    <td><code>io.debezium.storage.file.history.FileSchemaHistory</code></td>
  </tr>
  <tr>
    <td>schema.history.internal.file.filename</td>
    <td>This value is required only if <code>io.debezium.storage.file.history.FileSchemaHistory</code> was provided for the <code>schema.history.internal</code> value. You need to specify the path to a file where the database schema history is stored.
By default, the file will be stored in the <code>&lt;MI_HOME&gt;/cdc/schemaHistory</code> directory.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>schema.history.internal.kafka.topic</td>
    <td>The Kafka topic where the database schema history is stored.
Required when <code>schema.history.internal</code> is set to the <code>io.debezium.storage.kafka.history.KafkaSchemaHistory</code>.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>schema.history.internal.kafka.bootstrap.servers</td>
    <td>The initial list of Kafka cluster servers to connect to. The cluster provides the topic to store the database schema history.
Required when <code>schema.history.internal</code> is set to the <code>io.debezium.storage.kafka.history.KafkaSchemaHistory</code>.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>offset.storage</td>
    <td>The name of the Java class that is responsible for the persistence of connector offsets. It must implement <code>org.apache.kafka.connect.storage.OffsetBackingStore</code> interface.</td>
    <td>No</td>
    <td><code>org.apache.kafka.connect.storage.FileOffsetBackingStore</code></td>
  </tr>
  <tr>
    <td>offset.storage.file.filename</td>
    <td>Path to file where offsets are to be stored. Required when <code>offset.storage</code> is set to the <code>org.apache.kafka.connect.storage.FileOffsetBackingStore</code>.
By default, the file will be stored in the <code>&lt;MI_HOME&gt;/cdc/offsetStorage</code> directory.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>offset.storage.topic</td>
    <td>The name of the Kafka topic where offsets are to be stored. Required when <code>offset.storage</code> is set to the <code>org.apache.kafka.connect.storage.KafkaOffsetBackingStore</code>.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>offset.storage.partitions</td>
    <td>The number of partitions used when creating the offset storage topic. Required when <code>offset.storage</code> is set to the <code>org.apache.kafka.connect.storage.KafkaOffsetBackingStore</code>.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>offset.storage.replication.factor</td>
    <td>Replication factor used when creating the offset storage topic. Required when <code>offset.storage</code> is set to the <code>org.apache.kafka.connect.storage.KafkaOffsetBackingStore</code>.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.instance</td>
    <td>Specifies the instance name of the SQL Server named instance.<br>
*This is applicable only for SQL Server</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.names</td>
    <td>The comma-separated list of the SQL Server database names from which to stream the changes.<br>
*This is applicable only for SQL Server</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.server.id</td>
    <td>A numeric ID of this database client, which must be unique across all currently running database processes in the cluster.<br>
*This is applicable only for MySQL and MariaDB</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>table.include.list</td>
    <td>The list of tables from the selected database that the changes for them need to be captured.<br>
Example: <code><parameter name="table.include.list">inventory.products</parameter></code></td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>allowed.operations</td>
    <td>Operations that the user needs to listen to in the specified database tables.
Should provide comma-separated values for create/update/delete/truncate.<br>
Example: create, update, delete<br>
By default, truncate operations are skipped.</td>
    <td>No</td>
    <td>-</td>
  </tr>
  <tr>
    <td>database.out.server.name</td>
    <td>Name of the XStream outbound server configured in the database.<br>
*Only applicable if you are using Oracle database.</td>
    <td>No</td>
    <td>-</td>
  </tr>
</table>

For more custom configurations, please refer to the [Debezium](https://debezium.io/documentation/reference/stable/index.html) documentation.
