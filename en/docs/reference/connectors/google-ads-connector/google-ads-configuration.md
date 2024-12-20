# Google Ads Connector Reference

The following operations allow you to work with the Google Ads API. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Google Ads connector, first create the connection with your configuration. When calling a Google Ads operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The `init` operation initializes the connection to Google Ads API.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Unique name to identify the connection.</td>
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
            <td>The ID of the manager account. Required when using a manager account to access a customer account.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>tokenEndpoint</code></td>
            <td>The HTTP endpoint that can be used to obtain an access token. The default value is `https://www.googleapis.com/oauth2/v3/token`.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.init>
        <connectionType>googleAds</connectionType>
        <name>GOOGLE_ADS_CONN</name>
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
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the manager under whom the client customer is being created. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>customerClient</code></td>
            <td>The new client customer to create. The resource name on this customer will be ignored. Type: [Customer](https://developers.google.com/google-ads/api/rest/reference/rest/v17/Customer) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>accessRole</code></td>
            <td>The proposed role of the user on the created client customer. Accessible only to customers on the allow-list. Type: [AccessRole](https://developers.google.com/google-ads/api/rest/reference/rest/v17/AccessRole) enum</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>emailAddress</code></td>
            <td>Email address of the user who should be invited on the created client customer. Accessible only to customers on the allow-list. Type: <code>string</code></td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.createCustomerClient configKey="GOOGLE_ADS_CONN">
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
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being modified. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operation</code></td>
            <td>The operation to perform on the customer Type: [CustomerOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CustomerOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.customersMutate configKey="GOOGLE_ADS_CONN">
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
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose campaign budgets are being modified. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual campaign budgets. Type: [CampaignBudgetOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CampaignBudgetOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is <code>false</code>. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.campaignBudgets configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operations>{json-eval($.operations)}</operations>
    </googleAds.campaignBudgets>
    ```
 
    **Sample request**

    === "Create"
        ```json
        {
            "customer_id": "456456456",
            "operations": [
                {
                    "create": {
                        "name": "My Campaign Budget #1",
                        "amountMicros": 500000
                    }
                },
                {
                    "create": {
                        "name": "My Campaign Budget #2",
                        "amountMicros": 400000
                    }
                }
            ]
        }
        ```
    === "Update"
        ```json
        {
            "customer_id": "456456456",
            "operations": [
                {
                    "update": {
                        "resourceName": "customers/456456456/campaignBudgets/789789789",
                        "amountMicros": "300000"
                    },
                    "updateMask": "amountMicros"
                }
            ]
        }
        ```
    === "Remove"
        ```json
        {
            "customer_id": "456456456",
            "operations": [
                {
                    "remove": "customers/456456456/campaignBudgets/789789789"
                }
            ]
        }
        ```

??? note "campaignsMutate"
    The `campaignsMutate` operation creates, updates, or removes campaigns. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose campaigns are being modified. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual campaigns. Type: [CampaignOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CampaignOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is <code>false</code>. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.campaignsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operations>{json-eval($.operations)}</operations>
        <validateOnly>{json-eval($.validateOnly)}</validateOnly>
    </googleAds.campaignsMutate>
    ```
 
    **Sample request**

    === "Create"
        ```json
        {
            "customer_id": "1231231223",
            "validateOnly": false,
            "operations": [
                {
                    "create": {
                        "status": "PAUSED",
                        "advertisingChannelType": "SEARCH",
                        "geoTargetTypeSetting": {
                            "positiveGeoTargetType": "PRESENCE_OR_INTEREST",
                            "negativeGeoTargetType": "PRESENCE"
                        },
                        "name": "My Search campaign #1",
                        "campaignBudget": "customers/1231231223/campaignBudgets/789789789",
                        "targetSpend": {}
                    }
                }
            ]
        }
        ```
    === "Update"
        ```json
        {
            "customer_id": "1231231223",
            "validateOnly": false,
            "operations": [
                {
                    "updateMask": "name",
                    "update": {
                        "resourceName": "customers/1231231223/campaigns/789789789",
                        "name": "My Search campaign #2"
                    }
                }
            ]
        }
        ```
    === "Remove"
        ```json
        {
            "customer_id": "1231231223",
            "validateOnly": false,
            "operations": [
                {
                    "remove": "customers/1231231223/campaigns/789789789"
                }
            ]
        }
        ```

??? note "adGroupsMutate"
    The `adGroupsMutate` operation creates, updates, or removes ad groups. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose ad groups are being modified. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual ad groups. Type: [AdGroupOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/AdGroupOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is <code>false</code>. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.adGroupsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operations>{json-eval($.operations)}</operations>
    </googleAds.adGroupsMutate>
    ```
 
    **Sample request**

    === "Create"
        ```json
        {
            "customer_id": "123123123",
            "operations": [
                {
                    "create": {
                        "status": "UNSPECIFIED",
                        "type": "SEARCH_STANDARD",
                        "name": "Test Ad group 1",
                        "campaign": "customers/123123123/campaigns/456456456"
                    }
                }
            ]
        }
        ```
    === "Update"
        ```json
        {
            "customer_id": "123123123",
            "operations": [
                {
                    "updateMask": "name,cpmBidMicros",
                    "update": {
                        "resourceName": "customers/123123123/adGroups/456456456",
                        "name": "My Ad group 1",
                        "cpmBidMicros": "10000"
                    }
                }
            ]
        }
        ```
    === "Remove"
        ```json
        {
            "customer_id": "123123123",
            "operations": [
                {
                    "remove": "customers/123123123/adGroups/456456456"
                }
            ]
        }
        ```

??? note "adGroupAdsMutate"
    The `adGroupAdsMutate` operation creates, updates, or removes ads. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose ads are being modified. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual ads. Type: [AdGroupAdOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/AdGroupAdOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is <code>false</code>. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.adGroupAdsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operations>{json-eval($.operations)}</operations>
    </googleAds.adGroupAdsMutate>
    ```
 
    **Sample request**

    === "Create"
        ```json
        {
            "customer_id": "123123123",
            "operations": [
                {
                    "create": {
                        "adGroup": "customers/123123123/adGroups/456456456",
                        "status": "PAUSED",
                        "ad": {
                            "name": "Test Ad 1",
                            "responsiveSearchAd": {
                                "headlines": [
                                    {
                                        "pinned_field": "HEADLINE_1",
                                        "text": "An example headline"
                                    },
                                    {
                                        "text": "Another example headline"
                                    },
                                    {
                                        "text": "Yet another headline"
                                    }
                                ],
                                "descriptions": [
                                    {
                                        "text": "An example description"
                                    },
                                    {
                                        "text": "Another example description"
                                    }
                                ],
                                "path1": "integration"
                            },
                            "finalUrls": [
                                "https://www.wso2.com"
                            ]
                        }
                    }
                }
            ]
        }
        ```
    === "Update"
        ```json
        {
            "customer_id": "123123123",
            "operations": [
                {
                    "updateMask": "status",
                    "update": {
                        "status": "ENABLED",
                        "resourceName": "customers/123123123/adGroupAds/456456456~789789789"
                    }
                }
            ]
        }
        ```
    === "Remove"
        ```json
        {
            "customer_id": "123123123",
            "operations": [
                {
                    "remove": "customers/123123123/adGroupAds/456456456~789789789"
                }
            ]
        }
        ```

??? note "adsMutate"
    The `adsMutate` operation updates ads. Operation statuses are returned. Updating ads is not supported for TextAd, ExpandedDynamicSearchAd, GmailAd and ImageAd.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose ads are being modified. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual ads. Type: [AdOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/AdOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is <code>false</code>. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseContentType</code></td>
            <td>The response content type setting. Determines whether the mutable resource or just the resource name should be returned post mutation. Type: [ResponseContentType](https://developers.google.com/google-ads/api/rest/reference/rest/v17/ResponseContentType) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.adsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operations>{json-eval($.operations)}</operations>
    </googleAds.adsMutate>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "operations": [
            {
                "updateMask": "finalUrls",
                "update": {
                    "resourceName": "customers/123123123/ads/789789789",
                    "finalUrls": [
                        "https://www.github.com"
                    ]
                }
            }
        ]
    }
    ```

??? note "search"
    The `search` operation returns all rows that match the search query.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being queried. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>query</code></td>
            <td>The query string. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>pageToken</code></td>
            <td>Token of the page to retrieve. If not specified, the first page of the results will be returned. Use the value obtained from <code>nextPageToken</code> in the previous response to request the next page of results. Type: <code>string</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageSize</code></td>
            <td>Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. Type: <code>integer</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>returnTotalResultsCount</code></td>
            <td>If true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>summaryRowSetting</code></td>
            <td>Determines whether a summary row will be returned. By default, a summary row is not returned. If requested, the summary row will be sent in a response by itself after all other query results are returned. Type: [SummaryRowSetting](https://developers.google.com/google-ads/api/rest/reference/rest/v17/SummaryRowSetting) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.search configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <query>{json-eval($.query)}</query>
    </googleAds.search>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "query": "SELECT customer_client.client_customer FROM customer_client"
    }
    ```

??? note "campaignCriteriaMutate"
    The `campaignCriteriaMutate` operation creates, updates, or removes criteria.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose criteria are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual criteria. Type: [CampaignCriterionOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/CampaignCriterionOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is false.</td>
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
    <googleAds.campaignCriteriaMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <query>{json-eval($.operations)}</query>
    </googleAds.campaignCriteriaMutate>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "operations": [
            {
                "create": {
                    "campaign": "customers/123123123/campaigns/789789789",
                    "criterion": {
                        "customAudience": "customers/123123123/customAudiences/781704020"
                    }
                }
            }
        ]
    }
    ```

??? note "customAudiencesMutate"
    The `customAudiencesMutate` operation creates or updates custom audiences.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose custom audiences are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual custom audiences. Type: [CustomAudienceOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/customers.customAudiences/mutate#CustomAudienceOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.customAudiencesMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <query>{json-eval($.operations)}</query>
    </googleAds.customAudiencesMutate>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "operations": [
            {
                "create": {
                    "status": "ENABLED",
                    "name": "Tech Enthusiasts Custom Audience",
                    "type": "AUTO",
                    "description": "Custom audience targeting users interested in technology-related content.",
                    "members": [
                        {
                            "memberType": "KEYWORD",
                            "keyword": "Artificial Intelligence"
                        },
                        {
                            "memberType": "URL",
                            "url": "https://example.com/tech-articles"
                        },
                        {
                            "memberType": "APP",
                            "app": "com.example.techapp"
                        }
                    ]
                }
            }
        ]
    }
    ```

??? note "audiencesMutate"
    The `audiencesMutate` operation creates audiences. 
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer whose audiences are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual audiences. Type: [AudienceOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/AudienceOperation) object</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is false.</td>
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
    <googleAds.audiencesMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <query>{json-eval($.operations)}</query>
    </googleAds.audiencesMutate>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "operations": [
            {
                "create": {
                    "name": "Audience Group",
                    "description": "Test audience group",
                    "dimensions": [
                        {
                            "age": {
                                "ageRanges": [
                                    {
                                        "minAge": 18,
                                        "maxAge": 24
                                    },
                                    {
                                        "minAge": 25,
                                        "maxAge": 34
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
    ```

??? note "userListsMutate"
    The `userListsMutate` operation creates or updates user lists. Operation statuses are returned.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>Required. The ID of the customer whose user lists are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>Required. The list of operations to perform on individual user lists. Type: [UserListOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/UserListOperation) object.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>partialFailure</code></td>
            <td>If true, successful operations will be carried out and invalid operations will return errors. If false, all operations will be carried out in one transaction if and only if they are all valid. The default value is <code>false</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Only errors are returned, not results.</td>
            <td>No</td>
        </tr>
    </table>
    
    **Sample configuration**

    ```xml
    <googleAds.userListsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <query>{json-eval($.operations)}</query>
    </googleAds.userListsMutate>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "operations": [
            {
                "create": {
                    "name": "My Customer Match List",
                    "description": "List created via MI",
                    "membershipLifeSpan": 30,
                    "crmBasedUserList": {
                        "uploadKeyType": "CONTACT_INFO",
                        "": "FIRST_PARTY"
                    }
                }
            }
        ]
    }
    ```

??? note "userDataMutate"
    The `userDataMutate` operation adds or removes users from user lists.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>Required. The ID of the customer whose user lists are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>userListId</code></td>
            <td>Required. The ID of the user list whose users are being modified.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>inputStructure</code></td>
            <td>Required. Defines the data source for the user list. Options:
                <ul>
                    <li><code>GOOGLE_API_COMPATIBLE</code> — Enables the Google Ads API-friendly input body as input.</li>
                    <li><code>JSON_ARRAY</code> — Activates attributes for uploading user data as a JSON array.</li>
                </ul>
            </td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>operations</code></td>
            <td>The list of operations to perform on individual user lists. Type: [UserListOperation](https://developers.google.com/google-ads/api/rest/reference/rest/v17/UserListOperation) object.</td>
            <td>Required if <code>inputStructure</code> is <code>GOOGLE_API_COMPATIBLE</code></td>
        </tr>
        <tr>
            <td><code>jsonArrayContent</code></td>
            <td>A JSON array containing user data to upload.</td>
            <td>Required if <code>inputStructure</code> is <code>JSON_ARRAY</code></td>
        </tr>
        <tr>
            <td><code>operationType</code></td>
            <td>Defines the operation to be performed on the user list. Options: <code>create</code> or <code>remove</code>. </td>
            <td>Required if <code>inputStructure</code> is <code>JSON_ARRAY</code></td>
        </tr>
        <tr>
            <td><code>userIdentifierSource</code></td>
            <td>Specifies the source of the user identifiers. Options: <code>UNKNOWN</code>, <code>UNSPECIFIED</code>, <code>FIRST_PARTY</code> or <code>THIRD_PARTY</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>transactionAttributes</code></td>
            <td>Allows the inclusion of transaction attributes for user data upload.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>userAttributes</code></td>
            <td>Includes additional user attributes for the uploaded data.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>consent</code></td>
            <td>Indicates consent for uploading user data.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "GOOGLE_API_COMPATIBLE"**

    ```xml
    <googleAds.userListsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <operations>{json-eval($.operations)}</operations>
        <userListId>{json-eval($.userListId)}</userListId>
    </googleAds.userListsMutate>
    ```

    **Sample request for "GOOGLE_API_COMPATIBLE"**

    ```json
    {
        "customer_id": "123123123",
        "operations": [
            {
                "create": {
                    "userIdentifiers": [
                        {
                            "hashedEmail": "2c41b9d011bc28e71842637075e2a67cf4e73010172f4a18985494467d73a6d6"
                        },
                        {
                            "hashedPhoneNumber": "00b340221ad566a1400936daadce44a7c61b5b04505fc66d3d55d96bde434bc1"
                        }
                    ]
                }
            }
        ],
        "userListId": "1232132321"
    }
    ```

    **Sample configuration for "JSON_ARRAY"**

    ```xml
    <googleAds.userListsMutate configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <inputStructure>JSON_ARRAY</inputStructure>
        <jsonArrayContent>{json-eval($.jsonArrayContent)}</jsonArrayContent>
        <operationType>create</operationType>
        <userIdentifierSource>UNSPECIFIED</userIdentifierSource>
        <userListId>{json-eval($.userListId)}</userListId>
    </googleAds.userListsMutate>
    ```

    **Sample request for "JSON_ARRAY"**

    ```json
    {
        "customer_id": "123123123",
        "jsonArrayContent": [
            {"phoneNumber": "+94112132234"},
            {"email": "someone@sample.com"},
            {"mobileId": "23131234324"}
        ],
        "userListId": "1232132321"
    }
    ```

    **Acceptance Criteria for `jsonArrayContent`**

    To upload a user list, the input must be a JSON array containing any number of user objects. Each user object represents a single user identifier. Below is the format and guidelines for creating and uploading the user list.

    **Example Format:**
    ```json
    [
      {"user_identifier1": "value1"},
      {"user_identifier2": "value2"},
      {"user_identifier3": "value3"}
    ]
    ```

    **User Identifier Types:**
    Each user object must contain only one of the following user identifiers:
    - **Phone Number**
    ```json
    {"phoneNumber": "+94112132234"}
    ```
    - **Email Address**
    ```json
    {"email": "someone@sample.com"}
    ```
    - **Mobile ID**
    ```json
    {"mobileId": "23131234324"}
    ```
    - **Third-Party User ID**
    ```json
    {"thirdPartyUserId": "2124234234"}
    ```
    - **Address Information**
    ```json
    {
      "addressInfo": {
        "firstName": "Someone",
        "lastName": "Someone",
        "city": "somecity",
        "state": "aa",
        "countryCode": "aa",
        "postalCode": "12345",
        "streetAddress": "SampleRd"
      }
    }
    ```
    
    **Additional Field: `userIdentifierSource`**
    Each user object can optionally include a `userIdentifierSource` field with one of the following values:
    - `FIRST_PARTY`: User identifier provided by the advertiser.
    - `THIRD_PARTY`: User identifier provided by a partner.
    
    **Example:**
    ```json
    {"userIdentifierSource": "FIRST_PARTY", "phoneNumber": "0772345164"}
    ```

    ** Notes:**
    - Each user object must contain **only one user identifier**. Multiple identifiers in the same object are treated as separate user objects.
    - Example of incorrect format:
    ```json
    {
      "Email": "someone@abc.com",
      "Phone": "0893425678"
    }
    ```
    This will be treated as:
    ```json
    [
      {"email": "someone@abc.com"},
      {"phoneNumber": "0893425678"}
    ]
    ```

??? note "getCustomers"
    The `getCustomers` operation returns all customers.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being queried. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>pageToken</code></td>
            <td>Token of the page to retrieve. If not specified, the first page of the results will be returned. Use the value obtained from <code>nextPageToken</code> in the previous response to request the next page of results. Type: <code>string</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageSize</code></td>
            <td>Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. Type: <code>integer</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>returnTotalResultsCount</code></td>
            <td>If true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>summaryRowSetting</code></td>
            <td>Determines whether a summary row will be returned. By default, a summary row is not returned. If requested, the summary row will be sent in a response by itself after all other query results are returned. Type: [SummaryRowSetting](https://developers.google.com/google-ads/api/rest/reference/rest/v17/SummaryRowSetting) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.getCustomers configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
    </googleAds.search>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123"
    }
    ```

??? note "getCampaigns"
    The `getCampaigns` operation returns all campaigns.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being queried. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>pageToken</code></td>
            <td>Token of the page to retrieve. If not specified, the first page of the results will be returned. Use the value obtained from <code>nextPageToken</code> in the previous response to request the next page of results. Type: <code>string</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageSize</code></td>
            <td>Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. Type: <code>integer</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>returnTotalResultsCount</code></td>
            <td>If true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>summaryRowSetting</code></td>
            <td>Determines whether a summary row will be returned. By default, a summary row is not returned. If requested, the summary row will be sent in a response by itself after all other query results are returned. Type: [SummaryRowSetting](https://developers.google.com/google-ads/api/rest/reference/rest/v17/SummaryRowSetting) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.getCampaigns configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
    </googleAds.search>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123"
    }
    ```

??? note "getUserLists"
    The `getUserLists` operation returns all user lists.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customerId</code></td>
            <td>The ID of the customer being queried. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>userListName</code></td>
            <td>The name of the user list to retrieve. Type: <code>string</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageToken</code></td>
            <td>Token of the page to retrieve. If not specified, the first page of the results will be returned. Use the value obtained from <code>nextPageToken</code> in the previous response to request the next page of results. Type: <code>string</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageSize</code></td>
            <td>Number of elements to retrieve in a single page. When too large a page is requested, the server may decide to further limit the number of returned resources. Type: <code>integer</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>validateOnly</code></td>
            <td>If true, the request is validated but not executed. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>returnTotalResultsCount</code></td>
            <td>If true, the total number of results that match the query ignoring the LIMIT clause will be included in the response. Default is false. Type: <code>boolean</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>summaryRowSetting</code></td>
            <td>Determines whether a summary row will be returned. By default, a summary row is not returned. If requested, the summary row will be sent in a response by itself after all other query results are returned. Type: [SummaryRowSetting](https://developers.google.com/google-ads/api/rest/reference/rest/v17/SummaryRowSetting) enum</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googleAds.search configKey="GOOGLE_ADS_CONN">
        <customerId>{json-eval($.customer_id)}</customerId>
        <userListName>{json-eval($.user_list_name)}</userListName>
    </googleAds.search>
    ```
 
    **Sample request**

    ```json
    {
        "customer_id": "123123123",
        "user_list_name": "My User List"
    }
    ```

## Error codes related to Google Ads Connector

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_MESSAGE` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, see [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

| Error code | Description |
| -------- | ------- |
| 701001 | General error. |
| 701002 | Invalid configuration error. |
| 701003 | Error in access token generation flow. |
