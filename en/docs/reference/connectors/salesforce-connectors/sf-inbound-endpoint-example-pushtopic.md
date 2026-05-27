# Salesforce Inbound Endpoint Push Topic Example

## About PushTopic

A PushTopic lets you define a SOQL query and receive event notifications when changes occur to the data matching that query. It provides a powerful way to monitor Salesforce records in near real-time. When a record is created, updated, deleted, or undeleted, a corresponding notification is published to the defined topic, which the Inbound Endpoint in WSO2 Integrator: MI can consume.

## What you'll build

This guide walks you through the process of setting up a Salesforce Inbound Endpoint that listens to changes in Salesforce records using a PushTopic.

You will:

1. Create a PushTopic using Salesforce Developer Console.
2. Set up Salesforce authentication (username/password or OAuth2 Client Credentials).
3. Configure the Inbound Endpoint in WSO2 Integrator: MI using the Visual Studio Code extension.
4. Run and test the integration to receive real-time notifications.

The inbound endpoint acts as a message receiver and injects events into an integration sequence. In this example, we simply log the message, but you can extend this to perform any complex mediation logic using [WSO2 Integrator: MI mediators]({{base_path}}/reference/mediators/about-mediators/).


In this example, we will use the **Account** object in Salesforce to demonstrate the PushTopic functionality. When an **Account** record is created, updated, deleted, or undeleted, the WSO2 Inbound Endpoint will receive notifications and process them accordingly. For a visual representation of the integration, refer to the diagram below:

<a href="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/diagram.png"><img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/diagram.png" title="Salesforce Inbound Endpoint" alt="Salesforce Inbound Endpoint"/></a>

## Step 1: Creating a PushTopic

The [PushTopic](https://developer.salesforce.com/docs/atlas.en-us.202.0.api_streaming.meta/api_streaming/create_a_pushtopic.htm) object includes a SOQL query that defines which data changes will trigger events. Here’s how you can create one using the Salesforce Developer Console:

1. **Login** to your **Salesforce Account**. On the **Home page**, click the **Setup** icon (top right) and open **Developer Console**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/developer-console.png" title="Open the Developer Console." width="500" alt="Open the Developer Console."/>

2. In the Developer Console, go to **Debug** → **Open Execute Anonymous Window**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/execute.png" title="Open the Anonymous Window." width="500" alt="Open the Anonymous Window."/>

3. Paste the following Apex code into the **Enter Apex Code** window and click **Execute**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/code.png" title="Enter Apex code." width="700" alt="Enter Apex code."/> 

   ```apex
   PushTopic pushTopic = new PushTopic();
   pushTopic.Name = 'Account';
   pushTopic.Query = 'SELECT Id, Name FROM Account';
   pushTopic.ApiVersion = 37.0;
   pushTopic.NotifyForOperationCreate = true;
   pushTopic.NotifyForOperationUpdate = true;
   pushTopic.NotifyForOperationUndelete = true;
   pushTopic.NotifyForOperationDelete = true;
   pushTopic.NotifyForFields = 'Referenced';
   insert pushTopic;
   ```

   This code sets up a PushTopic to listen for all changes on the Salesforce **Account** object. Once created, Salesforce will send notifications to the WSO2 Inbound Endpoint whenever an **Account** record changes.


## Step 2: Set up Salesforce Authentication

The Salesforce Inbound Endpoint supports two authentication methods:

- **Username/Password (username-token)** — authenticates using a Salesforce username, password, and security token via the SOAP login API. This is the default authentication type.
- **OAuth2 Client Credentials (oauth)** — authenticates using a Salesforce Connected App's consumer key and secret via the OAuth2 Client Credentials grant. Recommended for server-to-server integrations where storing a user password is undesirable.

!!! info "Version requirement"
    OAuth2 Client Credentials authentication is available from **Salesforce Inbound Endpoint version 3.0.5** onwards.

Choose the authentication method that fits your deployment.

=== "Username/Password (username-token)"

    1. **Login** to your **Salesforce Account**. Click the **Settings** icon (top right corner of the Home page).

        <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/settings.png" title="Select Settings." width="40%" alt="Select Settings"/> 

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


## Step 3: Configure Inbound Endpoint using WSO2 Integrator: MI VS Code Extension

1. Follow [Create Integration Project]({{base_path}}/develop/create-integration-project/) steps to set up your project.

2. Go to the **Add Artifact** section and select **Event Integration**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/event-integration.png" title="Add Inbound Endpoint" width="800" alt="Add Inbound Endpoint"/>

3. Create a **Salesforce Inbound Endpoint**.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/create-inbound-ep.png" title="Create Salesforce Inbound Endpoint" width="800" alt="Create Salesforce Inbound Endpoint"/>

4. Fill in the form with the values for your chosen authentication method:

    === "Username/Password (username-token)"

        * **Name**: SalesforceInboundEP
        * **Injecting Sequence Name**: test
        * **Error Sequence Name**: test
        * **Polling Interval**: 100
        * **Salesforce Object**: /topic/Account
        * **Package Version**: 37.0
        * **Authentication Type**: username-token
        * **User Name**: `<USERNAME>`
        * **Password**: `<SALESFORCE_PASSWORD><SECURITY_TOKEN>`
        * **Login Endpoint**: https://login.salesforce.com
        * **SOAP API Version**: 58.0
        * **Wait Time**: 5000
        * **Connection Timeout**: 20000
        * **Execute sequentially** and **Coordination**: select
        * **Replay**: deselect
        * **Event ID File Path**: `<FILE_PATH>`

        <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/inbound-ep-config.png" title="Inbound Endpoint Configuration (username-token)" width="800" alt="Inbound Endpoint Configuration (username-token)"/>

    === "OAuth2 Client Credentials (oauth)"

        * **Name**: SalesforceInboundEP
        * **Injecting Sequence Name**: test
        * **Error Sequence Name**: test
        * **Polling Interval**: 100
        * **Salesforce Object**: /topic/Account
        * **Package Version**: 37.0
        * **Authentication Type**: oauth
        * **Client ID**: `<CONSUMER_KEY>`
        * **Client Secret**: `<CONSUMER_SECRET>`
        * **Token Endpoint**: `https://login.salesforce.com/services/oauth2/token` (use `https://test.salesforce.com/services/oauth2/token` for sandboxes)
        * **Wait Time**: 5000
        * **Connection Timeout**: 20000
        * **Execute sequentially** and **Coordination**: select
        * **Replay**: deselect
        * **Event ID File Path**: `<FILE_PATH>`

        !!! note
            When using OAuth2 Client Credentials, the **User Name**, **Password**, and **Login Endpoint** fields are not required and will be ignored if provided.

5. Submit the configuration.

6. Add a **Log Mediator** to the sequence to log the incoming messages. and tick the **Append Payload** option to include the payload in the log.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/add-log-mediator.png" title="Add Log Mediator" width="800" alt="Add Log Mediator"/>

7. Add a **Drop Mediator** to the sequence to drop the messages after logging.

    <img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/add-drop-mediator.png" title="Add Drop Mediator" width="800" alt="Add Drop Mediator"/>


## Step 4: Deploy ,Run and Test the Integration

#### Run the Integration

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide or simply use the **Run** button in the Visual Studio Code extension to run the integration.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/deploy-run.png" title="Deploy and Run the Integration" width="500" alt="Deploy and Run the Integration"/>

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).


#### Testing the Integration

You can manually insert records into Salesforce via Salesforce UI or use the [Salesforce REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject.htm) to insert records.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/insert-records.png" title="Insert Records into Salesforce" width="800" alt="Insert Records into Salesforce"/>

You can also use the [Salesforce REST Connector example]({{base_path}}/reference/connectors/salesforce-connectors/sf-rest-connector-example/) to insert data:

1. Save the following payload as `data.json`:

   ```json
   {
       "sObject": "Account",
       "fieldAndValue": {
           "name": "Manager",
           "description": "This Account belongs to WSO2"
       }
   }
   ```

2. Invoke the API using the following `curl` command:

   ```
   curl -X POST -d @data.json http://localhost:8280/salesforcerest --header "Content-Type:application/json"
   ```

#### Expected Output

After inserting a record, you should see a log entry in the WSO2 Integrator: MI console similar to the following:

   ```
   To: , MessageID: urn:uuid:2D8F9AFA30E66278831587368713372, Direction: request, Payload: {"event":{"createdDate":"2020-04-20T07:45:12.686Z","replayId":4,"type":"created"},"sobject":{"Id":"0012x0000048j9mAAA","Name":"Manager"}}
   ```

