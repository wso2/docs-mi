# Setting up Salesforce Pub/Sub Connector Connection

You can follow one of the following methods to set up the Salesforce Pub/Sub Connector connection.

## 1. Basic Authentication for Connection
a. To work with the Salesforce Pub/Sub connector, you need to have a Salesforce account. If you do not have a Salesforce account, go to https://developer.salesforce.com/signup  and create a Salesforce developer account.

b. After creating a Salesforce account you will get a Salesforce security token.

c. To configure the Salesforce Pub/Sub Connector you need to save and keep the username, password, and security token of your Salesforce account.

## 2. Authorization Headers for Connection

Every time an RPC method executes, it sends a set of HTTP/gRPC headers to authorize access to your Salesforce resources.  
If you already have the following header values, you can establish a connection immediately.

| Header | What it is | How to obtain it | Example |
|--------|------------|------------------|---------|
| **`accessToken`** | OAuth 2.0 access token (or the session ID returned by the `login()` SOAP call). | • Complete an OAuth authorization flow.<br>• Read `sessionId` in the `login()` SOAP response. | `00D5e000003TIrB!AQoAQ...` |
| **`instanceUrl`** | Base URL of your Salesforce org (no path). | • `serverUrl` field in a `login()` response.<br>• `instance_url` field in an OAuth response. | `https://MyDomainName.my.salesforce.com` |
| **`tenantId`** | Unique org identifier used by the Pub/Sub API. You can pass either:<br>• the raw **Org ID**<br>• the full value `core/<MyDomain>/<Org ID>` | • `organizationId` in a `login()` response.<br>• *Setup ▸ Company Information* (Org ID). | `00D5e000003TIrB`<br>`core/MyDomainName/00D5e000003TIrB` |

