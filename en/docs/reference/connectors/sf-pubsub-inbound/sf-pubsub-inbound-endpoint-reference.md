# Salesforce Pub/Sub Inbound Endpoint Reference

The following sections provide a detailed reference for the Salesforce Pub/Sub Inbound Endpoint in WSO2 Micro
Integrator.

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the inbound endpoint.</td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td> Polling Interval</td>
    <td>The interval at which the inbound endpoint polls for new events from Salesforce.</td>
    <td>No</td>
    <td>100 </td>
  </tr>
  <tr>
        <td> Server URL</td>
        <td>The URL of the Salesforce server to connect to.</td>
        <td>Yes</td>
        <td>api.pubsub.salesforce.com</td>
 </tr>
 <tr>
        <td>Port</td>
        <td>The port number to connect to the Salesforce server.</td>
        <td>No</td>
        <td>7443</td>
  <tr>
    <td>Topic Name</td>
    <td>The name of the Salesforce topic to subscribe to.</td>
    <td>Yes</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Replay Preset</td>
    <td>The replay preset to use for the subscription. Options include EARLIEST, LATEST, and CUSTOM.</td>
    <td>Yes</td>
    <td>LATEST</td>
  </tr>
  <tr>
    <td>Replay ID</td>
    <td>The custom replay ID to use for the subscription. Required if Replay Preset is set to CUSTOM.</td>
    <td>No</td>
    <td>None</td>
  </tr>
    <tr>
        <td>Access Token</td>
        <td>The access token for authenticating with Salesforce. This is required only if header authorized option</td>
        <td>Yes</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Instance URL</td>
        <td>The base URL of the Salesforce instance. This is required only if header authorized option </td>
        <td>Yes</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Tenant ID</td>
        <td>The Salesforce organization ID. This is required only if header authorized option</td>
        <td>Yes</td>
        <td>None</td>
    </tr>
    <tr>
    <td> Username</td>
        <td>The Salesforce username for authentication. This is required only if basic option</td>
        <td>Yes</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>The Salesforce password for authentication. This is required only if basic option</td>
        <td>Yes</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Security Token</td>
        <td>The Salesforce security token for authentication. This is required only if basic option</td>
        <td>No</td>
        <td>None</td>
    </tr>
</table>
      