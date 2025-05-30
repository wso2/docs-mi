# Salesforce Inbound Endpoint Reference

The Salesforce Inbound Endpoint in WSO2 Micro Integrator is built on top of the Salesforce EMP (Event Monitoring Platform) Connector, which leverages Salesforce’s Streaming API to subscribe to real-time events. This includes support for PushTopics and Change Data Capture (CDC), allowing your integration to respond immediately to changes in Salesforce data—such as when a record is created, updated, deleted, or undeleted.

This reference page documents all the configuration parameters supported by the Salesforce Inbound Endpoint. These parameters control how the connector authenticates with Salesforce, what data it listens to, the polling behavior, event replay settings, and more. Use this table as a guide when configuring your inbound endpoint to ensure seamless and reliable integration with Salesforce's event stream.

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Example Values</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td><code>interval</code></td>
    <td>The polling interval for the Salesforce inbound endpoint.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>connection.salesforce.salesforceObject</code></td>
    <td>The name of the Push Topic or the Platform Event that is added to the Salesforce account, or the Record the you want to listen for Change Data Capture events.</td>
    <td>Yes</td>
    <td><code>/topic/Account</code><br/><code>/data/AccountChangeEvent</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>connection.salesforce.packageVersion</code></td>
    <td>The version of the Salesforce API.</td>
    <td>Yes</td>
    <td><code>37.0</code></td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>connection.salesforce.userName</code></td>
    <td>Salesforce login user name.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>connection.salesforce.password</code></td>
    <td>Salesforce login password.</td>
    <td>Yes</td>
    <td><code>eitest123xxxxxxx</code></td>
    <td>-</td>
  </tr>
  <tr>
    <td><code>connection.salesforce.loginEndpoint</code></td>
    <td>The Endpoint of the Salesforce account.</td>
    <td>Yes</td>
    <td><code>https://login.salesforce.com</code></td>
    <td><code>https://login.salesforce.com</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.soapApiVersion</code></td>
    <td>The version of the Salesforce SOAP API.</td>
    <td>No</td>
    <td><code>22.0</code></td>
    <td><code>22.0</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.connectionTimeout</code></td>
    <td>The time to wait to connect to the client.</td>
    <td>No</td>
    <td><code>20000</code></td>
    <td><code>20000</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.waitTime</code></td>
    <td>The time to wait to connect to the Salesforce account.</td>
    <td>No</td>
    <td><code>5000</code></td>
    <td><code>5000</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.initialEventId</code></td>
    <td>Specifies the initial event ID from which to start reading messages. This value is applicable only when message replaying is enabled. It will be used only if <code>connection.salesforce.EventIDStoredFilePath</code> is not configured, and the value of this parameter(<code>initialEventId</code>) is greater than the replay ID stored in the registry.
</td>
    <td>No</td>
    <td><code>100</code></td>
    <td><code>-1</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.replay</code></td>
    <td>Enabling this will read the event ID stored in the Registry or from the text file provided via the event ID file path.</td>
    <td>No</td>
    <td>-</td>
    <td><code>False</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.replayWithMultipleInbounds</code></td>
    <td>This parameter is applicable only when replay is enabled. If you are using multiple Salesforce inbound endpoints, enabling this configuration ensures proper message replay across all endpoints.</td>
    <td>No</td>
    <td>-</td>
    <td><code>False</code></td>
  </tr>
  <tr>
    <td><code>connection.salesforce.EventIDStoredFilePath</code></td>
    <td>This field is visible only if replay is enabled. When enabled, specify the directory path of a text file to replay from the event ID stored in it, or leave it blank to replay from the last event ID stored in the config Registry DB.</td>
    <td>No</td>
    <td><code>/home/kasun/Documents/SalesForceConnector/a.txt</code></td>
    <td>-</td>
  </tr>
</table>
