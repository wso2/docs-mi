# Salesforce Access Token Generation

First, we will create a Salesforce App (Connected App) and obtain the OAuth 2 tokens from the Salesforce REST API.

1. Navigate to the [Salesforce Developer Edition](https://developer.salesforce.com/signup) and create a Salesforce account.

   <img src="https://apim.docs.wso2.com/en/4.1.0/assets/img/integrate/connectors/salesforce-developer-edition-signup.png" title="Create Salesforce account" width="80%"/>

2. Log in to Salesforce after verifying your account with the newly created credentials. In the upper-right corner, select **Setup**.

   <img src="https://apim.docs.wso2.com/en/4.1.0/assets/img/integrate/connectors/salesforce-account-setup.png" title="Select setup" width="60%"/>

3. Navigate to **Apps › App Manager** and click **New Connected App**.  

   <img src="https://apim.docs.wso2.com/en/4.1.0/assets/img/integrate/connectors/new-connected-app.png" title="Add new connected app" width="90%"/>

4. On the **New Connected App** page, fill the required fields:  

   <img src="https://apim.docs.wso2.com/en/4.1.0/assets/img/integrate/connectors/create-connected-app.png" title="Create new connected app"/>

    * **Connected App Name**, **API Name**, and **Contact Email** under **Basic Information**.
    * Under **API (Enable OAuth Settings)**, tick **Enable OAuth Settings**.
    * **Callback URL**: `https://login.salesforce.com`
    * **Selected OAuth Scopes**:
        * *Manage user data via APIs (API)*
        * *Manage user data via Web browsers (web)*
        * *Perform requests at any time (refresh_token, offline_access)*
    * Untick **Require Proof Key for Code Exchange (PKCE)**.

6. Click **Save**.

7. Back in **Apps › App Manager**, click the Connected App you just created, then **View**.

8. Under **API (Enable OAuth Settings)**, copy the **Consumer Key** and **Consumer Secret**.  
   <img src="https://apim.docs.wso2.com/en/4.1.0/assets/img/integrate/connectors/connected-app.jpg" title="Connected app"/>

9. Click **Edit**, and under **OAuth Policies** set **Permitted Users** to **All users may self-authorize**, then **Save**.

10. Obtain an authorization **code**. Replace `<DOMAIN>` with your org’s My Domain name:

    ```
    https://<DOMAIN>.develop.my.salesforce.com/services/oauth2/authorize?response_type=code&client_id=<CONSUMER_KEY>&redirect_uri=https://login.salesforce.com
    ```

    After authenticating, you will be redirected to a URL like:

    ```
    https://login.salesforce.com/?code=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    ```

11. Note the `code` parameter (masked above).

12. Exchange the code for tokens (example shown with all secrets masked):

```bash
curl --location --request POST \
  "https://xxxxxxxxxxxxxxxx.develop.my.salesforce.com/services/oauth2/token?code=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&grant_type=authorization_code&client_id=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&client_secret=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&redirect_uri=https://login.salesforce.com" \
  --header "Accept: */*" \
  --header "Accept-Encoding: gzip, deflate" \
  --header "Cache-Control: no-cache" \
  --header "Connection: keep-alive" \
  --header "Content-Length: 0" \
  --header "Host: xxxxxxxxxxxxxxxx.develop.my.salesforce.com" \
  --header "User-Agent: PostmanRuntime/7.19.0" \
  --header "cache-control: no-cache"
```

12. In Postman, import the request and replace the following placeholders with your own values:

* `code`
* `client_id`
* `client_secret`

<img src="https://apim.docs.wso2.com/en/4.1.0/assets/img/integrate/connectors/postman-connected-app.png" title="Postman connected app"/>
