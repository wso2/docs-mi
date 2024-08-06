## Create the Client ID and Client Secret

1. Navigate to [API Credentials Page](https://console.developers.google.com/projectselector/apis/credentials) and sign in with your Google account.

2. Click on **Select a Project** and click **NEW PROJECT**, to create a project.
 <img src="{{base_path}}/assets/img/integrate/connectors/create-project.png" title="Creating a new Project" width="800" alt="Creating a new Project" />

3. Enter `GmailConnector` as the name of the project and click **Create**.

4. Click **Configure consent screen** in the next screen.
  <img src="{{base_path}}/assets/img/integrate/connectors/consent-screen.jpg" title="Consent Screen" width="800" alt="Consent Screen" />

5. Provide the Application Name as `GmailConnector`, and provide your email as `User support email` and `email address of Developer contact information` in the Consent Screen, then click `SAVE AND CONTINUE`..
  <img src="{{base_path}}/assets/img/integrate/connectors/gmail-consent-screen2.png" title="Consent Screen" width="800" height="300" alt="Consent Screen" />

6. Add scopes of API, then click `SAVE AND CONTINUE`.
   <img src="{{base_path}}/assets/img/integrate/connectors/gmail-consent-screen3.png" title="Consent Screen" width="800" alt="Consent Screen" />

7. Click `ADD USERS`, type the email of the account that you will use for testing, then click `SAVE AND CONTINUE`.
   <img src="{{base_path}}/assets/img/integrate/connectors/gmail-consent-screen4.png" title="Consent Screen" width="800" alt="Consent Screen" />

8. Click Create credentials and click OAuth client ID.
  <img src="{{base_path}}/assets/img/integrate/connectors/create-credentials.png" title="Create Credentials" width="800" alt="Create Credentials" />

9. Enter the following details in the Create OAuth client ID screen and click Create.

  | Type                        | Name                                             | 
  | ------------------          | -------------------------------------------------|
  | Application type            | Web Application                                  |
  | Name                        | GmailConnector                                   |
  | Authorized redirect URIs    | https://developers.google.com/oauthplayground    |

  
10. A Client ID and a Client Secret are provided. Keep them saved.
  <img src="{{base_path}}/assets/img/integrate/connectors/credentials.png" title="Credentials" width="800" alt="Credentials" />

11. Click Library on the side menu, search for **Gmail API** and click on it.

12. Click **Enable** to enable the Gmail API.


## Obtain access token and refresh token
1. Navigate to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) and click OAuth 2.0 Configuration button in the Right top corner.

2. Select **Use your own OAuth credentials**, and provide the obtained Client ID and Client Secret values as above click on Close.
  <img src="{{base_path}}/assets/img/integrate/connectors/oath-configuration.png" title="Obtaining Oauth-configuration" width="800" alt="Obtaining Oauth-configuration" />

3. Under Step 1, select `Gmail API v1` from the list of APIs, select all the scopes expect the [gmail.metadata scope](https://www.googleapis.com/auth/gmail.metadata) scope.

  <img src="{{base_path}}/assets/img/integrate/connectors/select-scopes.png" title="Selecting Scopes" width="800" alt="Selecting Scopes" />

4. Click on **Authorize APIs** button and select your Gmail account when you are asked and allow the scopes.
  <img src="{{base_path}}/assets/img/integrate/connectors/grant-permission.png" title="Grant Permission" width="800" alt="Grant Permission" />

5.  Under Step 2, click **Exchange authorization code for tokens** to generate an display the Access Token and Refresh Token. Now we are done with configuring the Gmail API.
  <img src="{{base_path}}/assets/img/integrate/connectors/refreshtoken.png" title="Getting Tokens" width="800" alt="etting Tokens" />
