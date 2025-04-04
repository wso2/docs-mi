# Salesforce Marketing Cloud Access Token Generation

This guide explains how to generate an access token in Salesforce Marketing Cloud using an Installed Package. Follow the steps below for a complete walk through from creating the package to obtaining the token using tools like Postman or curl.

### Step 1: Log in to Marketing Cloud

1. Navigate to your [Salesforce Marketing Cloud login page](https://mc.exacttarget.com/cloud/login.html) and log in with your credentials.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-login.png" title="SFMC login" width="50%" alt="SFMC login"/>

2. Once logged in, click on your username in the top right corner and select Setup from the dropdown menu.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-setup.png" title="SFMC setup" width="50%" alt="SFMC setup"/>

### Step 2: Create an installed package

1. In the **Setup** menu, scroll down to the **Platform Tools** section.
2. Click on **Apps** and then select **Installed Packages**.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-packages.png" title="SFMC packages" width="50%" alt="SFMC installed packages"/>

3. Click the **New** button.
4. Enter a **Name** and **Description** for your package (for example, `API Integration Package`).
5. Click **Save**.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-new-component.png" title="SFMC new component" width="75%" alt="SFMC installed package component"/>

### Step 3: Add an API integration component

1. After saving, click on the package you just created to view its details.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-component-details.png" title="SFMC new component details" width="95%" alt="SFMC installed package component details"/>

2. Click on **Add Component**.
3. Choose **API Integration** as the component type.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-component-type.png" title="SFMC new component type" width="50%" alt="SFMC installed package component type"/>

4. Select Server-to-Server as the integration type.

   <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-integration-type.png" title="SFMC new integration type" width="50%" alt="SFMC installed package integration type"/>

5. In the list of available scopes, check the required permissions for your integration. For most token generation and API calls, you might need:
   * Read and Write access to Email Studio
   * Access to the REST API
   * Any additional scopes based on your specific use case

     <img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-scope.png" title="SFMC component scope" width="75%" alt="SFMC component scopes"/>

6. Click **Save** to add the component.

### Step 4: Retrieve the Client ID and Client Secret

On the package detail page, note down the Base URIs, Client ID and Client Secret generated for your integration. These credentials are required to authenticate API calls.
If necessary, click on Edit to update any integration details or to add further scopes.

<img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-secret.png" title="SFMC secret" width="65%" alt="SFMC client secret"/>

<img src="{{base_path}}/assets/img/integrate/connectors/sfmc/sfmc-client.png" title="SFMC client id" width="95%" alt="SFMC client id"/>

### Step 5: Retrieve your user subdomain (Required for setting up MI)

Extract the subdomain by taking the portion between `https://` and `.auth.marketingcloudapis.com` in your base URI. For example, from `https://mczl3z3cmqr47kmts5x34v1cdlky.auth.marketingcloudapis.com/`, the subdomain is `mczl3z3cmqr47kmts5x34v1cdlky`.

### Step 6: Obtain the access token

To generate the access token, you need to make an HTTP POST request to the Salesforce Marketing Cloud authentication endpoint you retrieved in Step 4.

1. Your Authentication Base URI typically looks like:

```
   https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/
```

2. Replace `YOUR_SUBDOMAIN` with the subdomain provided in your Salesforce Marketing Cloud account (found in your account details).
3. Construct the token request:

The token endpoint is:
```
   https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/v2/token
```

4. The POST request must include your Client ID and Client Secret along with the `grant_type` set to `client_credentials`.

   - Using Postman:

   Open Postman and create a new POST request.
   Set the URL to:
   ```
      https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/v2/token
   ```

   In the Body tab, select raw and JSON as the format, then enter:
   ```json
   {
      "grant_type": "client_credentials",
      "client_id": "YOUR_CLIENT_ID",
      "client_secret": "YOUR_CLIENT_SECRET"
   }
   ```

   Click the Send button.
   The response will include an access_token along with its expiration time.

   - Using curl:

   Open your terminal and run the following command (replace placeholders with your actual values):
   ```sh
      curl -X POST \
        https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/v2/token \
        -H "Content-Type: application/json" \
        -d '{
              "grant_type": "client_credentials",
              "client_id": "YOUR_CLIENT_ID",
              "client_secret": "YOUR_CLIENT_SECRET"
            }'
   ```
The output will be a JSON object that contains your access token.

5. Verify the token:

Confirm that your response includes an `access_token`.
Save the token securely. It is valid for the duration specified in the response and will be required for subsequent API calls.

!!!Note
    WSO2 MI will handle token generation and expiration internally. You only need to provide the Client ID and Client Secret in your API configuration.
