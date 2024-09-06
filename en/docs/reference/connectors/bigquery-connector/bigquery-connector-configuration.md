# Set up the BigQuery environment  

The BigQuery connector allows you to access the [BigQuery REST API](https://cloud.google.com/bigquery/docs/reference/rest) from an integration sequence.

To work with the BigQuery connector, you need to have a Google Cloud Platform account. If you do not have a Google Cloud Platform account, go to [console.cloud.google.com](https://console.cloud.google.com/freetrial), and create a Google Cloud Platform trial account.

BigQuery uses the OAuth 2.0 protocol for authorization. All requests to the BigQuery REST API will be authorized against a registered user. Developers can generate user credentials from the Google Cloud Platform using two different mechanisms. See the following sections for details.

### Obtain user credentials 

Follow the steps below to generate user credentials.

**Obtaining a client ID and client secret**

1. Go to [https://accounts.google.com/SignUphttps://accounts.google.com/SignUp](https://accounts.google.com/SignUp) and create a Google account.

2. Go to [https://console.developers.google.com/projectselector/apis/credentials](https://console.developers.google.com/projectselector/apis/credentials), and sign in to your **Google account**.
    
     <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-credentials-page.png" title="Bigquery-credentials-page" width="600" alt="Bigquery-credentials-page"/>   
   
3. If you do not already have a project, Enter `BigQueryExample` as the name of the project and click on **Create**.

4. To create an `api key`, Click on **Create credentials** and then select **API key**.

     <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-api-key.png" title="Select OAuth client ID" width="600" alt="Select OAuth client ID"/>

5. Click on the **Configure consent screen** in the next screen.

     <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-consent-screen.png" title="Bigquery-credentials-page" width="300" alt="Bigquery-credentials-page"/>

6. Provide the Application Name as `BigQueryExample`, and provide your email as `User support email` and `email address of Developer contact information` in the Consent Screen, then click on **SAVE AND CONTINUE**.

7. To add scopes for API, click on **ADD OR REMOVE SCOPES**

    1. Go to **Google API Library**.
   
        <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-google-api.png" title="Consent Screen" width="300" alt="Consent Screen" />
   
    2. Search **BigQuery API** and enable it.
   
        <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-add-big-query.png" title="Consent Screen" width="300" alt="Consent Screen" />
   
    3. Refresh the page and add following scopes.
   
        <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-add-scopes.png" title="Consent Screen" width="300" alt="Consent Screen" />
    
8. Click on **ADD USERS**, type the email address of the account you will be testing with, then click on **SAVE AND CONTINUE**.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail-consent-screen4.png" title="Consent Screen" width="300" alt="Consent Screen" />

9. To get `client id` and `client secrets`, Click on **Create credentials** and then select **OAuth client ID**.     
   
    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-credentials.png" title="Select OAuth client ID" width="300" alt="Select OAuth client ID"/> 
   
10. Next, **select** Web Application, and **create a client**.
  
    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-select-web-application.png" title="Select web application" width="600" alt="Select web application"/> 

11. Add `https://developers.google.com/oauthplayground` as the redirect URI (you can add any URI that you need as redirect URI) under **Authorized redirect URIs**, and then click **Create**. This displays the **client ID** and **client secret**.

    <img src="{{base_path}}/assets/img/integrate/connectors/biguery-authorization-redirect-URI.png" title="Authorization-redirect-URI" width="600" alt="Authorization-redirect-URI"/> 
   
12. Make a note of the **client ID** and **client secret** that is displayed or download the json file, and then **click OK**.   

### Obtain access token and refresh token

1. Navigate to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) and click OAuth 2.0 Configuration button in the Right top corner.

2. Select **Use your own OAuth credentials**, and provide the obtained Client ID and Client Secret values as above click on Close.

     <img src="{{base_path}}/assets/img/integrate/connectors/oath-configuration.png" title="Obtaining Oauth-configuration" width="300" alt="Obtaining Oauth-configuration" />
   
3. Under Step 1, select `BigQuery API v2` from the list of APIs, select the following scopes.

     <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-select-scopes.png" title="Selecting Scopes" width="300" alt="Selecting Scopes" />

4. Click on **Authorize APIs** button and select your Gmail account when you are asked and allow the scopes.

     <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-add-scope.png" title="Grant Permission" width="300" alt="Grant Permission" />

5.  Under Step 2, click **Exchange authorization code for tokens** to generate and display the Access Token and Refresh Token.

### Obtain credentials using the service account

1. Open the [Service Accounts](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts) page in the GCP console.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-service-account.png" title="Bigquery service account" width="600" alt="Bigquery service account"/> 

2. Select your project and click **Open**.

3. Click **Create Service Account**.
  
    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-service-account.png" title="Bigquery create service account" width="600" alt="Bigquery create service account"/> 

4. Enter **Service account details**, and then click **CREATE AND CONTINUE**.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-enter-service-account-details.png" title="Bigquery enter service account" width="600" alt="Bigquery enter service account"/> 

5. Select a **role** you wish to grant to the service account and click **CONTINUE**.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-service-account-role.png" title="Bigquery enter service account role" width="600" alt="Bigquery enter service account role"/> 

6. Grant users access to this service account (optional) and click **Done**.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-service-account-grant-user-access.png" title="Bigquery enter service account grant user access" width="600" alt="Bigquery enter service account grant user access"/> 

7. Go to the service account for which you wish to create a key and click on the **created Service account** in that row.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-select-created-service-account.png" title="Bigquery enter service account grant user access" width="600" alt="Bigquery enter service account grant user access"/> 

8. Click on **Create key**.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-key.png" title="Bigquery service account create key" width="600" alt="Bigquery service account create key"/> 

9. Select the key type as **P12** and click **Create**. Then the created key will be downloaded.

### Create dataset and table

**Create dataset**

1. Open the [BigQuery console](https://console.cloud.google.com/bigquery) and select the created project

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-select-project.png" title="Bigquery create Dataset step1" width="600" alt="Bigquery create Dataset step1"/> 
   
2. Click on the **View Action** on the created project.
    
    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-dataset.png" title="Bigquery create Dataset step2" width="600" alt="Bigquery create Dataset step2"/>
   
3. Enter the required Dataset details and click **Create Dataset**.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-dataset2.png" title="Bigquery create Dataset step2" width="600" alt="Bigquery create Dataset step2"/> 

**Create table**

1. After creating the Dataset, click on the created **Dataset**. You can see the following details. Then click **Create Table**.  

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-table1.png" title="Bigquery create Table step1" width="600" alt="Bigquery create Table step1"/> 

2. Enter required Table details and click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/bigquery-create-table2.png" title="Bigquery create Table step2" width="600" alt="Bigquery create Table step2"/> 

For more information about these operations, please refer to the [BigQuery connector reference guide]({{base_path}}/reference/connectors/bigquery-connector/bigquery-connector-reference/).