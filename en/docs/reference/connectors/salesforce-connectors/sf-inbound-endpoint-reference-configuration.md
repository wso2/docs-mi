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
    <td>interval</td>
    <td>The polling interval for the Salesforce inbound endpoint.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connection.salesforce.salesforceObject</td>
    <td>The name of the Push Topic or the Platform Event that is added to the Salesforce account.</td>
    <td>Yes</td>
    <td>/topic/Account</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connection.salesforce.packageVersion</td>
    <td>The version of the Salesforce API.</td>
    <td>Yes</td>
    <td>37.0</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connection.salesforce.userName</td>
    <td>Salesforce login user name.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connection.salesforce.password</td>
    <td>Salesforce login password.</td>
    <td>Yes</td>
    <td>eitest123xxxxxxx</td>
    <td>-</td>
  </tr>
  <tr>
    <td>connection.salesforce.loginEndpoint</td>
    <td>The Endpoint of the Salesforce account.</td>
    <td>Yes</td>
    <td>https://login.salesforce.com</td>
    <td>https://login.salesforce.com</td>
  </tr>
  <tr>
    <td>connection.salesforce.soapApiVersion</td>
    <td>The version of the Salesforce SOAP API.</td>
    <td>No</td>
    <td>22.0</td>
    <td>22.0</td>
  </tr>
  <tr>
    <td>connection.salesforce.connectionTimeout</td>
    <td>The time to wait to connect to the client.</td>
    <td>No</td>
    <td>20000</td>
    <td>20 * 1000 ms</td>
  </tr>
  <tr>
    <td>connection.salesforce.waitTime</td>
    <td>The time to wait to connect to the Salesforce account.</td>
    <td>No</td>
    <td>5000</td>
    <td>5 * 1000 ms</td>
  </tr>
  <tr>
    <td>connection.salesforce.replay</td>
    <td>Enabling this will read the event ID stored in the Registry or from the text file provided via Event ID File Path parameter.</td>
    <td>No</td>
    <td>-</td>
    <td>False</td>
  </tr>
  <tr>
    <td>connection.salesforce.EventIDStoredFilePath</td>
    <td>When replay is enabled, do not define any value for this property (i.e., keep it blank), to replay from the last event ID stored in the config Registry DB (property- name of the Salesforce object (follow the example below for more understanding) resource path - connector/salesforce/event). When replay is enabled, specify the directory path of a text file to start replaying from the event ID stored in it.</td>
    <td>No</td>
    <td>/home/kasun/Documents/SalesForceConnector/a.txt</td>
    <td>-</td>
  </tr>
</table>
