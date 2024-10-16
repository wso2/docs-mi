# The Trade Desk Connector Reference

The following operations allow you to work with The Trade Desk API. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Trade Desk connector, first create the connection with your configuration. When calling a Trade Desk operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The `init` operation initializes the connection to the Trade Desk API.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>connectionName</code></td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>base</code></td>
            <td>The service root URL. The default value is <code>https://api.thetradedesk.com/v3</code>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>authToken</code></td>
            <td>The access token to authenticate the request.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.init>
        <connectionType>TheTradeDesk</connectionType>
        <connectionName>TTD_CONNECTION</connectionName>
        <base>https://api.thetradedesk.com/v3</base>
        <authToken>REPLACE_WITH_AUTH_TOKEN</authToken>
    </TheTradeDesk.init>
    ```

## Operations

??? note "createDataGroup"
    The `createDataGroup` operation creates a new data group entity with the necessary details.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the data group properties. See the [Data Group Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/post-datagroup) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.createDataGroup configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.createDataGroup>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "AdvertiserId": "{advertiserId}",
            "DataGroupName": "Data Group Name",
            "IsSharable": true,
            "FirstPartyDataIds": [
                1234567
            ],
            "ThirdPartyDataIds": [
                "1234567|bluekai"
            ],
            "SkipUnauthorizedThirdPartyData": true
        }
    }
    ```

??? note "createCampaign"
    The `createCampaign` operation initiates a new advertising campaign with specified parameters.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the campaign properties. See the [Campaign Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/post-campaign) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.createCampaign configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.createCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "Budget": {
                "Amount": 1200000,
                "CurrencyCode": "USD"
            },
            "StartDate": "2022-01-01T00:00:00",
            "EndDate": "2022-12-31T00:00:00",
            "AutoAllocatorEnabled": true,
            "AutoPrioritizationEnabled": true,
            "PacingMode": "PaceAhead",
            "IncludeDefaultsFromAdvertiser": true,
            "Objective": "Awareness",
            "PrimaryGoal": {
                "MaximizeReach": true
            },
            "SecondaryGoal": {
                "MaximizeLtvIncrementalReach": true
            },
            "TertiaryGoal": {
                "VCPMInAdvertiserCurrency": {
                    "Amount": 28,
                    "CurrencyCode": "USD"
                }
            },
            "PrimaryChannel": "Video",
            "AdvertiserId": "{advertiserId}",
            "CampaignName": "New Campaign Name",
            "CampaignConversionReportingColumns": []
        }
    }
    ```

??? note "createAudience"
    The `createAudience` operation generates a custom audience segment for targeted advertising.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the audience properties. See the [Audience Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/post-audience) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.createAudience configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.createAudience>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "AdvertiserId": "sample string 1",
            "AudienceName": "Length Limited String 2",
            "IncludedDataGroupIds": [
                "sample string 3"
            ],
            "Description": "sample string 4",
            "ExcludedDataGroupIds": [
                "sample string 5"
            ],
            "GeoForCounts": "sample string 6"
        }
    }
    ```

??? note "updateAudience"
    The `updateAudience` operation updates the criteria defining an existing audience segment.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the audience properties. See the [Audience Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/put-audience) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.updateAudience configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.updateAudience>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "AudienceId": "sample string 1",
            "AdvertiserId": "sample string 2",
            "AudienceName": "Length Limited String 3",
            "Description": "sample string 4",
            "ExcludedDataGroupIds": [
                "sample string 5"
            ],
            "GeoForCounts": "sample string 6",
            "IncludedDataGroupIds": [
                "sample string 7"
            ]
        }
    }
    ```

??? note "getAdvertiser"
    The `getAdvertiser` operation retrieves details of an existing advertiser account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>advertiserId</code></td>
            <td>The platform ID of the advertiser to retrieve.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.getAdvertiser configKey="TTD_CONNECTION">
        <advertiserId>{json-eval($.advertiserId)}</advertiserId>
    </TheTradeDesk.getAdvertiser>
    ```
 
    **Sample request**

    ```json
    {
        "advertiserId": "advertiser_12345"
    }
    ```

??? note "getCampaign"
    The `getCampaign` operation fetches details and performance data of a specific campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>campaignId</code></td>
            <td>The platform ID of the campaign to retrieve.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.getCampaign configKey="TTD_CONNECTION">
        <campaignId>{json-eval($.campaignId)}</campaignId>
    </TheTradeDesk.getCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "campaignId": "campaign_12345"
    }
    ```

??? note "getAudience"
    The `getAudience` operation obtains information about a specific audience segment.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>audienceId</code></td>
            <td>The platform ID of the audience to retrieve.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.getAudience configKey="TTD_CONNECTION">
        <audienceId>{json-eval($.audienceId)}</audienceId>
    </TheTradeDesk.getAudience>
    ```
 
    **Sample request**

    ```json
    {
        "audienceId": "audience_12345"
    }
    ```

??? note "updateAdGroup"
    The `updateAdGroup` operation modifies the settings of an existing ad group.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the ad group properties. See the [Ad Group Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/put-adgroup) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.updateAdGroup configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.updateAdGroup>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "AdGroupId": "sample string 1",
            "AdGroupCategory": {
                "CategoryId": 2
            },
            "AdGroupName": "Length Limited String 3",
            "AreFutureKoaFeaturesEnabled": false,
            "AssociatedBidLists": [
                {
                    "BidListId": "sample string 4",
                    "IsDefaultForDimension": false,
                    "IsEnabled": false
                }
            ],
            "Availability": "Archived",
            "CampaignId": "sample string 5",
            "ChannelId": "Display",
            "CustomLabels": [
                {
                    "CustomLabelId": "sample string 6"
                }
            ],
            "Description": "Length Limited String 7",
            "EnabledValueAddedProviders": [
                "Scibids"
            ],
            "FunnelLocation": "Consideration",
            "Increments": [
                "sample string 19"
            ],
            "IsEnabled": false,
            "NewFrequencyConfigs": [
                {
                    "CounterId": "sample string 90",
                    "CounterName": "Length Limited String 91",
                    "FrequencyCap": 92,
                    "FrequencyGoal": 93,
                    "ResetIntervalInMinutes": 94
                }
            ],
            "PredictiveClearingEnabled": false
        }
    }
    ```

??? note "createAdGroup"
    The `createAdGroup` operation creates a new ad group within a campaign to organize ads with shared settings.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the ad group properties. See the [Ad Group Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/post-adgroup) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.createAdGroup configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.createAdGroup>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "CampaignId": "{campaignId}",
            "AdGroupName": "Test Ad Group",
            "IndustryCategoryId": 292,
            "AdGroupCategory": {
                "CategoryId": 8311
            },
            "RTBAttributes": {
                "BudgetSettings": {
                    "DailyBudget": {
                        "Amount": 1,
                        "CurrencyCode": "USD"
                    },
                    "PacingMode": "PaceToEndOfDay"
                },
                "BaseBidCPM": {
                    "Amount": 1,
                    "CurrencyCode": "USD"
                },
                "MaxBidCPM": {
                    "Amount": 5,
                    "CurrencyCode": "USD"
                },
                "AudienceTargeting": {
                    "CrossDeviceVendorListForAudience": [
                        {
                            "CrossDeviceVendorId": 11,
                            "CrossDeviceVendorName": "Identity Alliance"
                        }
                    ]
                },
                "ROIGoal": {
                    "CPAInAdvertiserCurrency": {
                        "Amount": 0.2,
                        "CurrencyCode": "USD"
                    }
                },
                "CreativeIds": [
                    "{creativeId1}",
                    "{creativeId2"
                ]
            },
            "AssociatedBidLists": []
        }
    }
    ```

??? note "updateDataGroup"
    The `updateDataGroup` operation alters an existing data group to keep data organized and current.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the data group properties. See the [Data Group Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/put-datagroup) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.updateDataGroup configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.updateDataGroup>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "DataGroupId": "sample string 1",
            "AdvertiserId": "sample string 2",
            "DataGroupName": "Length Limited String 3",
            "Description": "Length Limited String 4",
            "FirstPartyDataIds": [
                5
            ],
            "GeoForCounts": "sample string 6",
            "IsSharable": false,
            "SkipUnauthorizedThirdPartyData": false,
            "ThirdPartyDataIds": [
                "sample string 7"
            ]
        }
    }
    ```

??? note "createCreative"
    The `createCreative` operation uploads and registers a new creative asset for use in ads.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the creative properties. See the [Creative Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/post-creative) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.createCreative configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.createCreative>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "AdvertiserId": "{advertiserId}",
            "CreativeName": "Creative Name",
            "Description": "Test Creative",
            "ImageAttributes": {
                "ImageContent": "<insert base-64-encoded image string here>",
                "ClickthroughUrl": "https://www.google.com",
                "LandingPageUrl": "https://www.domain.com"
            }
        }
    }
    ```

??? note "createAdvertiser"
    The `createAdvertiser` operation adds a new advertiser account to the platform for managing campaigns.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the advertiser properties. See the [Advertiser Parameters](https://partner.thetradedesk.com/v3/portal/api/ref/post-advertiser) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <TheTradeDesk.createAdvertiser configKey="TTD_CONNECTION">
        <properties>{json-eval($.properties)}</properties>
    </TheTradeDesk.createAdvertiser>
    ```
 
    **Sample request**

    ```json
    {
        "properties": {
            "PartnerId": "{partnerId}",
            "AdvertiserName": "Advertiser ABC",
            "Description": "New Advertiser",
            "CurrencyCode": "USD",
            "AttributionClickLookbackWindowInSeconds": 5184000,
            "AttributionImpressionLookbackWindowInSeconds": 5184000,
            "ClickDedupWindowInSeconds": 7,
            "ConversionDedupWindowInSeconds": 60,
            "DefaultRightMediaOfferTypeId": 1,
            "IndustryCategoryId": 292,
            "AdvertiserCategory": {
                "CategoryId": 8311
            },
            "DomainAddress": "https://www.domain.com"
        }
    }
    ```

## Error codes related to the Trade Desk Connector

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_MESSAGE` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, see [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

| Error code | Description |
| -------- | ------- |
| 701101 | General error. |
| 701102 | Invalid configuration error. |
