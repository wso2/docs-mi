# Set up Salesforce Pub/Sub Connector Connection

You can follow one of the following methods to set up the Salesforce Pub/Sub Connector connection.

## 1. Basic authentication for connection
a. To work with the Salesforce Pub/Sub connector, you need to have a Salesforce account. If you do not have a Salesforce account, go to <a target="_blank" href="https://developer.salesforce.com/signup">https://developer.salesforce.com/signup</a> and create a Salesforce developer account.

b. After creating a Salesforce account you will get a Salesforce security token.

c. To configure the Salesforce Pub/Sub Connector you need to save and keep the username, password, and security token of your Salesforce account.

To use basic authentication, set the **Authentication Type** to `Basic Auth` and configure the **Username**, **Password**, and **Security Token** as shown below.

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-init-upass.png" title="Salesforce Pub/Sub Basic Auth" alt="Salesforce Basic Auth" width="40%"/>

## 2. Authorization headers for connection

Every time an RPC method executes, it sends a set of HTTP/gRPC headers to authorize access to your Salesforce resources.  
If you already have the following header values, you can establish a connection immediately.

!!! Tip
    You may follow this guide on [Salesforce access token generation]({{base_path}}/reference/connectors/salesforce-connectors/sf-access-token-generation) to obtain the required credentials.

!!! Note
    By default, the access token is valid for **2 hours**, as defined by Salesforce. The keepalive mechanism used by the Salesforce connection may keep the connection active and refresh the token while WSO2 Integrator: MI is running. However, if the WSO2 Integrator: MI has been stopped for more than **2 hours**, you may need to regenerate the access token.

| Header | What it is | How to obtain it | Example |
|--------|------------|------------------|---------|
| **`accessToken`** | OAuth 2.0 access token (or the session ID returned by the `login()` SOAP call). | • Complete an OAuth authorization flow.<br>• Read `sessionId` in the `login()` SOAP response. | `00D5e000003TIrB!AQoAQ...` |
| **`instanceUrl`** | Base URL of your Salesforce org (no path). | • `serverUrl` field in a `login()` response.<br>• `instance_url` field in an OAuth response. | `https://MyDomainName.my.salesforce.com` |
| **`tenantId`** | Unique org identifier used by the Pub/Sub API. You can pass either:<br>• the raw **Org ID**<br>• the full value `core/<MyDomain>/<Org ID>` | • `organizationId` in a `login()` response.<br>• *Setup ▸ Company Information* (Org ID). | `00D5e000003TIrB`<br>`core/MyDomainName/00D5e000003TIrB` |

To use authorization headers instead of basic authentication, set the **Authentication Type** to `NONE` and configure the **Headers** as shown below.

<img src="{{base_path}}/assets/img/integrate/connectors/sf-pubsub/sf-init-headers.png" title="Salesforce Pub/Sub Authorization headers" alt="Salesforce Authorization headers" width="40%"/>
