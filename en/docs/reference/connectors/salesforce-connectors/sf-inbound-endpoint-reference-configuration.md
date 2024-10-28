# Salesforce Inbound Endpoint Reference

The following configurations allow you to configure Salesforce Inbound Endpoint for your scenario. 

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
    <td>The name of the Push Topic or the Platform Event that is added to the Salesforce account.</td>
    <td>Yes</td>
    <td><code>/topic/Account</code></td>
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
    <td><code>connection.salesforce.replay</code></td>
    <td>Enabling this will read the event ID stored in the Registry or from the text file provided via the event ID file path.</td>
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
