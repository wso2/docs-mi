# Google Ads Connector Reference

The following operations allow you to work with the Google Ads API. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Google Ads connector, first create the connection with your configuration. When calling a Google Ads operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The `init` operation initializes the connection to Google Ads API.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>base</code></td>
            <td>The service root URL. The default value is `https://googleads.googleapis.com`.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientId</code></td>
            <td>Client ID of the registered application.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientSecret</code></td>
            <td>Client secret of the registered application.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>refreshToken</code></td>
            <td>The refresh token that can be used to obtain a new access token.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>developerToken</code></td>
            <td>The developer token for the Google Ads connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>loginCustomerId</code></td>
            <td>The ID of the manager account. Required when using a manager account to access an customer account.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>tokenEndpoint</code></td>
            <td>The HTTP endpoint that can be uses to obtain an access token.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.init>
        <connectionType>googleAds</connectionType>
        <name>GGOGLE_ADS_CONN</name>
        <base>https://googleads.googleapis.com</base>
        <clientId>REPLACE_WITH_CLIENT_ID</clientId>
        <clientSecret>REPLACE_WITH_CLIENT_SECRET</clientSecret>
        <refreshToken>REPLACE_WITH_REFRESH_TOKEN</refreshToken>
        <developerToken>REPLACE_WITH_DEVELOPER_TOKEN</developerToken>
        <loginCustomerId>REPLACE_WITH_MANAGER_ID</loginCustomerId>
        <tokenEndpoint>https://www.googleapis.com/oauth2/v3/token</tokenEndpoint>
    </googleAds.init>
    ```

## Operations

??? note "createCustomerClient"
    The `createCustomerClient` operation creates a new client under the provided manager. The new client customer is returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the manager under whom client customer is being created.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>customerClient</code></td>
            <td>The new client customer to create. The resource name on this customer will be ignored. Type: object [Customer](https://developers.google.com/google-ads/api/rest/reference/rest/v17/Customer)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>accessRole</code></td>
            <td>The proposed role of user on the created client customer. Accessible only to customers on the allow-list. Type: enum [AccessRole](https://developers.google.com/google-ads/api/rest/reference/rest/v17/AccessRole)</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>emailAddress</code></td>
            <td>Email address of the user who should be invited on the created client customer. Accessible only to customers on the allow-list. Type: string</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.createCustomerClient configKey="GGOGLE_ADS_CONN">
        <customerId>{json-eval($.account_id)}</customerId>
        <customerClient>{json-eval($.client_data)}</customerClient>
    </googleAds.createCustomerClient>
    ```
 
    **Sample request**

    ```json
    {
        "account_id": "123123123",
        "client_data": {
            "status": "ENABLED",
            "descriptiveName": "Client Customer 1",
            "currencyCode": "USD",
            "timeZone": "GMT"
        }
    }
    ```

??? note "customersMutate"
    The `customersMutate` operation updates a customer. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operation</code></td>
            <td>The operation to perform on the customer Type: object [CustomerOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CustomerOperation)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: enum [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType)</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.customersMutate configKey="GGOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operation>{json-eval($.operation)}</operation>
        <validateOnly>{json-eval($.validate_only)}</validateOnly>
        <responseContentType>{json-eval($.response_type)}</responseContentType>
    </googleAds.customersMutate>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "456456456",
        "validate_only": false,
        "response_type": "MUTABLE_RESOURCE",
        "operation": {
            "update": {
                "resourceName": "customers/456456456",
                "descriptiveName": "My Client 1",
                "hasPartnersBadge": true
            },
            "updateMask": "descriptiveName,hasPartnersBadge"
        }
    }
    ```

??? note "campaignBudgets"
    The `campaignBudgets` operation creates, updates, or removes campaign budgets. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose campaign budgets are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual campaign budgets. Type: object [CampaignBudgetOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CampaignBudgetOperation)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. Default is false. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: enum [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType)</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "campaignsMutate"
    The `campaignsMutate` operation creates, updates, or removes campaigns. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose campaigns are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual campaigns. Type: object [CampaignOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CampaignOperation)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. Default is false. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: enum [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType)</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "adGroupsMutate"
    The `adGroupsMutate` operation creates, updates, or removes ad groups. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose ad groups are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual ad groups.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "adGroupAdsMutate"
    The `adGroupAdsMutate` operation creates, updates, or removes ads. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose ads are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual ads.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "adsMutate"
    The `adsMutate` operation updates ads. Operation statuses are returned. Updating ads is not supported for TextAd, ExpandedDynamicSearchAd, GmailAd and ImageAd.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose ads are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual ads.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "search"
    The `search` operation returns all rows that match the search query.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being queried.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>query</code></td>
            <td>The query string. Type: string</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>pageToken</code></td>
            <td>Token of the page to retrieve. If not specified, the first page of results will be returned. Use the value obtained fromnextPageTokenin the previous response in order to request the next page of results. Type: string</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageSize</code></td>
            <td>Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. Type: integer</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>returnTotalResultsCount</code></td>
            <td>If true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false. Type: boolean</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>summaryRowSetting</code></td>
            <td>Determines whether a summary row will be returned. By default, summary row is not returned. If requested, the summary row will be sent in a response by itself after all other query results are returned. Type: enum [SummaryRowSetting](https://developers.google.com/google-ads/api/rest/reference/rest/v17/SummaryRowSetting)</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```
