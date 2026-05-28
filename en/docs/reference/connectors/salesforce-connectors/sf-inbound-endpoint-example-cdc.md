# Salesforce Inbound Endpoint CDC (Change Data Capture) Example

## About Change Data Capture (CDC)

Change Data Capture (CDC) in Salesforce allows you to receive real-time changes of Salesforce records, including record creation, updates, deletions, and undeletions. Unlike PushTopics, CDC supports a broader set of standard and custom objects, and it's more scalable and recommended for enterprise-grade integrations.

CDC events are published to event channels in the format: `/data/<ObjectName>ChangeEvent`. These events can be consumed by WSO2 Integrator: MI through a Salesforce Inbound Endpoint.

## What you'll build

This guide shows how to configure a Salesforce Inbound Endpoint using CDC to listen to real-time changes in the **Account** object.

You will:

1. Enable CDC for a Salesforce object.
2. Set up Salesforce authentication (username/password or OAuth2 Client Credentials).
3. Configure the Inbound Endpoint in WSO2 Integrator: MI using the Visual Studio Code extension.
4. Run and test the integration to receive real-time events.

The inbound endpoint captures CDC events and injects them into a mediation sequence. In this example, we simply log the message, but you can extend it with any logic using [WSO2 Integrator: MI mediators]({{base_path}}/reference/mediators/about-mediators/).

<a href="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/diagram.png"><img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/diagram-cdc.png" title="Salesforce CDC Integration" alt="Salesforce CDC Integration"/></a>

## Step 1: Enable CDC for the Account Object

1. **Login** to your **Salesforce Account**. On the **Home page**, click the **Setup** icon (top right).

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/setup-icon.png" title="Salesforce Setup Icon" width="500" alt="Salesforce Setup Icon"/>

2. In the **Quick Find box**, search for `Change Data Capture`.

3. Click **Change Data Capture** under the **Integrations** section.

4. Select the **Account** object (or any other object you'd like to track) and click **Save**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/enable-cdc.png" title="Enable Change Data Capture" width="800" alt="Enable Change Data Capture"/>

This enables the publication of **AccountChangeEvent** events.

## Step 2: Set up Salesforce Authentication

The Salesforce Inbound Endpoint supports two authentication methods:

- **Username/Password (username-token)** — authenticates using a Salesforce username, password, and security token via the SOAP login API. This is the default authentication type.
- **OAuth2 Client Credentials (oauth)** — authenticates using a Salesforce Connected App's consumer key and secret via the OAuth2 Client Credentials grant. Recommended for server-to-server integrations where storing a user password is undesirable.

!!! info "Version requirement"
    OAuth2 Client Credentials authentication is available from **Salesforce Inbound Endpoint version 3.0.5 and 2.1.17** onwards.

Choose the authentication method that fits your deployment.

=== "Username/Password (username-token)"

    1. **Login** to Salesforce. Click the **User Settings** icon → **Settings**.

    2. Navigate to **Reset My Security Token** and click **Reset Security Token**.

        <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/reset.png" title="Reset Security Token" width="70%" alt="Reset Security Token"/>

    You will receive the new security token via email. You will need to append it to your password when configuring the inbound endpoint.

=== "OAuth2 Client Credentials (oauth)"

    Create a Salesforce External Client App that supports the Client Credentials flow:

    1. **Login** to your **Salesforce Account** and click the **Setup** icon (top right).

    2. In the **Quick Find** box, search for **External Client App Manager** (under **External Client Apps**) and open it. Alternatively, go to **App Manager** (under **Apps**) and click the **New External Client App** button in the top right.

    3. Click **New External Client App**.

    4. Enter an **App Name** and a **Contact Email Address**.

    5. Under **OAuth Settings**, enable **Enable OAuth** and configure the following:
        - **Callback URL**: Enter any valid URL (e.g., `https://login.salesforce.com/services/oauth2/success`).
        - **Selected OAuth Scopes**: Add **Manage user data via APIs (api)** and any other required scopes.
        - Enable **Enable Client Credentials Flow**.

    6. Click **Create**. After saving, open the app, go to the **Settings** tab, and click **Consumer Key and Secret** to retrieve the **Consumer Key** (clientId) and **Consumer Secret** (clientSecret).

    7. To assign a run-as user for the Client Credentials flow, go to the app's **Policies** tab, click **Edit**, and set the **Run As** username to a dedicated integration user.

    !!! note
        The Client Credentials flow does not require end-user interaction and is intended for server-to-server integrations. Use a dedicated integration user with the minimum required permissions as the run-as user.


## Step 3: Configure Salesforce Inbound Endpoint (CDC) in VS Code

1. Follow [Create Integration Project]({{base_path}}/develop/create-integration-project/) to create your integration project.

2. Under **Add Artifact**, choose **Event Integration**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/event-integration.png" title="Add Event Integration" width="800" alt="Add Event Integration"/>

3. Select **Salesforce Inbound Endpoint**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/create-inbound-ep.png" title="Create Inbound Endpoint" width="800" alt="Create Inbound Endpoint"/>

4. Fill in the form with the values for your chosen authentication method:

    === "Username/Password (username-token)"

        * **Name**: SalesforceCDCInboundEP
        * **Injecting Sequence Name**: test
        * **Error Sequence Name**: test
        * **Polling Interval**: 100
        * **Salesforce Object**: `/data/AccountChangeEvent`
        * **Package Version**: 45.0
        * **Authentication Type**: username-token
        * **User Name**: `<USERNAME>`
        * **Password**: `<PASSWORD><SECURITY_TOKEN>`
        * **Login Endpoint**: `https://login.salesforce.com`
        * **SOAP API Version**: `45.0`
        * **Wait Time**: `5000`
        * **Connection Timeout**: `20000`
        * **Execute sequentially** and **Coordination**: select
        * **Replay**: deselect
        * **Event ID File Path**: `<FILE_PATH>`

        <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/inbound-cdc-config.png" title="CDC Inbound Configuration (username-token)" width="800" alt="CDC Inbound Configuration (username-token)"/>

    === "OAuth2 Client Credentials (oauth)"

        * **Name**: SalesforceCDCInboundEP
        * **Injecting Sequence Name**: test
        * **Error Sequence Name**: test
        * **Polling Interval**: 100
        * **Salesforce Object**: `/data/AccountChangeEvent`
        * **Package Version**: 45.0
        * **Authentication Type**: oauth
        * **Client ID**: `<CONSUMER_KEY>`
        * **Client Secret**: `<CONSUMER_SECRET>`
        * **Token Endpoint**: `https://login.salesforce.com/services/oauth2/token` (use `https://test.salesforce.com/services/oauth2/token` for sandboxes)
        * **Wait Time**: `5000`
        * **Connection Timeout**: `20000`
        * **Execute sequentially** and **Coordination**: select
        * **Replay**: deselect
        * **Event ID File Path**: `<FILE_PATH>`

        !!! note
            When using OAuth2 Client Credentials, the **User Name**, **Password**, and **Login Endpoint** fields are not required and will be ignored if provided.

5. Add a **Log Mediator** to print the incoming CDC event:

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/add-log-mediator.png" title="Add Log Mediator" width="800" alt="Add Log Mediator"/>

6. Add a **Drop Mediator** to discard the message after logging:

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/add-drop-mediator.png" title="Add Drop Mediator" width="800" alt="Add Drop Mediator"/>

## Step 4: Deploy, Run and Test the Integration

### Run the Integration

Build and run the integration using the [Deploy Artifacts Guide]({{base_path}}/develop/deploy-artifacts/#build-and-run) or simply click the **Run** button in VS Code extension to run the integration.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/deploy-run.png" title="Deploy and Run" width="500" alt="Deploy and Run"/>

### Test the CDC Event Flow

Go to your Salesforce account and Go to the **Accounts** tab.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/insert-records.png" title="Accounts Tab in Salesforce" width="800" alt="Accounts Tab in Salesforce"/>

Select any account and click on **edit** to update the account details.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/create-account.png" title="Update Account in Salesforce" width="800" alt="Update Account in Salesforce"/>

### Expected Output

After updating an account, you should see logs like the following in the WSO2 Integrator: MI console:

```
To: , MessageID: urn:uuid:56B8EFA309A76212999999737229929, Direction: request, Payload: {"event":{"replayId":6,"createdDate":"2024-12-01T14:21:45.458Z"},"payload":{"ChangeEventHeader":{"entityName":"Account","changeType":"UPDATE"},"Name":"Updated Account","Id":"0012x000005Xc9ZAAS"}}
```