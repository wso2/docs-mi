# Salesforce Inbound Endpoint Reference

The following configurations allow you to configure Salesforce Inbound Endpoint for your scenario. 

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
    <td>replay</td>
    <td> Enabling this will read the event ID stored in the Registry DB or from the text file stored in the local machine.</td>
    <td>Yes</td>
    <td>enable or disable</td>
    <td>false</td>
  </tr>
  <tr>
    <td>packageVersion</td>
    <td>The version of the Salesforce API.</td>
    <td>Yes</td>
    <td>37.0</td>
    <td>-</td>
  </tr>
  <tr>
    <td>salesforceObject</td>
    <td>The name of the Push Topic or the Platform Event that is added to the Salesforce account.</td>
    <td>Yes</td>
    <td>/topic/Account</td>
    <td>-</td>
  </tr>
  <tr>
    <td>loginEndpoint</td>
    <td>The Endpoint of the Salesforce account.</td>
    <td>Yes</td>
    <td>https://login.salesforce.com</td>
    <td>https://login.salesforce.com</td>
  </tr>
  <tr>
    <td>userName</td>
    <td>The username for accessing the Salesforce account.</td>
    <td>Yes</td>
    <td>-</td>
    <td>-</td>
  </tr> 
  <tr>
    <td>password</td>
    <td> The password provided here is a concatenation of the user password and the security token provided by Salesforce. For more information, see <a href="https://help.salesforce.com/articleView?id=user_security_token.htm&type=5">Information on creating a security token in Salesforce</a></td>
    <td>Yes</td>
    <td>eitest123xxxxxxx</td>
    <td>-</td>
  </tr>
  <tr>
    <td>waitTime</td>
    <td>The time to wait to connect to the Salesforce account.</td>
    <td>Yes</td>
    <td>5000</td>
    <td>5 * 1000 ms</td>
  </tr> 
  <tr>
    <td>connectionTimeout</td>
    <td>The time to wait to connect to the client.</td>
    <td>Yes</td>
    <td>20000</td>
    <td>20 * 1000 ms</td>
  </tr> 
  <tr>
    <td>soapApiVersion</td>
    <td>The version of the Salesforce SOAP API.</td>
    <td>Yes</td>
    <td>22.0</td>
    <td>-</td>
  </tr>
  <tr>
    <td>EventIDStoredFilePath</td>
    <td>When replay is enabled, do not define any value for this property (i.e., keep it blank), to replay from the last event ID stored in the config Registry DB (property- name of the Salesforce object (follow the example below for more understanding) resource path - connector/salesforce/event). When replay is enabled, specify the directory path of a text file to start replaying from the event ID stored in it.</td>
    <td>No</td>
    <td>/home/kasun/Documents/SalesForceConnector/a.txt</td>
    <td>-</td>
  </tr>   
</table>