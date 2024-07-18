# Fetch SalesForce Accounts Sample

This sample demonstrates how to integrate WSO2 Micro Integrator (MI) with the Salesforce system.

The primary purpose of this integration is to fetch records related to sales leads from the Salesforce system. When a client sends a request, a service within WSO2 MI retrieves the relevant data.

The sample includes an API called `SalesforceAccountServiceAPI`, which facilitates the connection with the Salesforce system for retrieving sales account data. When this API is invoked, it establishes communication with Salesforce via the connector and responds with the relevant sales account information.

## Deploying the sample

1.  Open the sample by clicking on the **Fetch SalesForce Accounts** card.
2.  Give a folder location to save the sample.
3.  Follow this guide on [Salesforce access token generation]({{base_path}}/includes/reference/connectors/salesforce-connectors/sf-access-token-generation/) to obtain the required credentials.
4.  Go to `SalesforceConnection1` in the **Integration-Configurations** folder and update the required properties with your Salesforce credentials.
    - accessToken
    - refreshToken
    - clientSecret
    - clientId
    - apiUrl
    - username
    - password
    
    <a href="{{base_path}}/assets/img/learn/samples/salesforce-connection.png"><img src="{{base_path}}/assets/img/learn/samples/salesforce-connection.png" alt="salesforce-conection" width="700"></a>

5. Change the query used in the `SalesForceAccountServiceAPI` if required.
6. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Open a terminal and run the following command to invoke the API.

    ```bash
    curl --location http://localhost:8290/salesforceaccountapi
    ```

2. You will get response with the sales account information.