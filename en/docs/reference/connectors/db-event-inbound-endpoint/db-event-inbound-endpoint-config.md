# DB Event Inbound Endpoint Reference

The following configurations allow you to configure DB Event Inbound Endpoint for your scenario. 

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Possible Values</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>sequential</td>
    <td>Whether the messages should be polled and injected sequentially.</td>
    <td>Yes</td>
    <td>true , false</td>
    <td>TRUE</td>
  </tr>
  <tr>
    <td>driverName</td>
    <td>The class name of the database driver.</td>
    <td>Yes</td>
    <td>com.mysql.jdbc.Driver</td>
    <td>-</td>
  </tr>
  <tr>
    <td>url</td>
    <td>The JDBC URL of the database.</td>
    <td>Yes</td>
    <td>jdbc:mysql://&lt;HOST&gt;/&lt;DATABASE_NAME&gt;</td>
    <td>-</td>
  </tr>
  <tr>
    <td>username</td>
    <td>The user name to connect to the database.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>password</td>
    <td>The password to connect to the database.</td>
    <td>Required if you have set a password for the database.</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>tableName</td>
    <td>The name of the table to capture changes to records.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>filteringCriteria</td>
    <td>The criteria to poll the database for record changes. Possible criteria are as follows:<br>
        <li><b>byLastUpdatedTimestampColumn:</b> Specify this to poll the database for a record that has changed since the last modified timestamp.</li>
        <li><b>byBooleanColumn:</b> Specify this to poll the database for record changes according to a column where it contains the boolean (true or false) value. By default, values are set to true. Each polling cycle takes only the records with the value true and updates it as false after polling. <b>Note:</b> When you create this database table column, you have to specify the data type as varchar instead of boolean data type.</li>
        <li><b>deleteAfterPoll:</b> Specify this if you want to delete records after polling.</li>
    </td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>filteringColumnName</td>
    <td>The actual name of the column that captures changes.<br/>
        <li>If filteringCriteria is `byLastUpdatedTimestampColumn`, this needs to be a column of type `Timestamp` and should be updated with the record.</li>
        <li>If filteringCriteria is `byBooleanColumn` this needs to be a column of type `Varchar`.</li>
    </td>
    <td>Required if the value of the filteringCriteria parameter is specified as byLastUpdatedTimestampColumn or byBooleanColumn</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>primaryKey</td>
    <td>The primary key column name.</td>
    <td>Yes</td>
    <td>ID</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connectionValidationQuery</td>
    <td>The query to check the availability of the connection.</td>
    <td>No</td>
    <td>SELECT 1</td>
    <td>SELECT 1</td>
  </tr>
  <tr>
    <td>registryPath</td>
    <td>The registry path of the timestamp. This is used to retrieve records when the value of the filteringCriteria parameter is specified as byLastUpdatedTimestampColumn.</td>
    <td>No</td>
    <td>-</td>
    <td>Name of the Inbound Endpoint</td>
  </tr>
</table>

<br/>

## Rollback the events

Once processing of an event fails, it will trigger a specified `fault sequence`. It is possible to specify the following property in such a situation. 
```xml
<property name="SET_DB_ROLLBACK_ONLY" value="true"/>
```
Once this property is set to `true`, DB event listener will not do any updates to the database. That is, it will not delete the row associated with the event or it will not update the boolean value being monitored. Also, it will not consider that event as received by the endpoint. Upon the next DB event poll, the same event will be triggered again. You can build a re-try mechanism upon mediation failures using this feature. 
