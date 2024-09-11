# Facebook Ads Connector Reference

The following operations allow you to work with the Facebook Ads API. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Facebook Ads connector, first create the connection with your configuration. When calling a Facebook Ads operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The init operation is used to initialize the connection to Facebook Ads API.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>Unique name to identify the connection by.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>base</td>
            <td>The service root URL. The default value is `https://graph.facebook.com/v20.0`.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>accessToken</td>
            <td>The access token to authenticate the request.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.init>
        <connectionType>facebookAds</connectionType>
        <name>FB_CONN_1</name>
        <base>https://graph.facebook.com/v20.0</base>
        <accessToken>REPLACE_WITH_ACCESS_TOKEN</accessToken>
    </facebookAds.init>
    ```

## Operations

??? note "createCampaign"
    Create a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>A JSON object containing the campaign properties. Refer to the [Campaign parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createCampaign configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.createCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "account_id":"123123123",
        "properties": {
            "name": "New Furniture Campaign",
            "objective": "OUTCOME_TRAFFIC",
            "status": "PAUSED",
            "special_ad_categories": ["EMPLOYMENT"]
        }
    }
    ```

??? note "getCampaigns"
    Returns campaigns under this ad account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>datePreset</td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>effectiveStatus</td>
            <td>Effective status for the campaigns.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>isCompleted</td>
            <td>If true, we return completed campaigns.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the campaign that the response should contain. Refer to the [Fields](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getCampaigns configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <fields>{json-eval($.fields)}</fields>
        <effectiveStatus>{json-eval($.status)}</effectiveStatus>
        <isCompleted>{json-eval($.is_completed)}</isCompleted>
    </facebookAds.getCampaigns>
    ```
 
    **Sample request**

    ```json
    {
        "account_id": "123123123",
        "fields": "id,name",
        "is_completed": true,
        "status": [
            "PAUSED"
        ]
    }
    ```

??? note "updateCampaign"
    Updates a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>campaignId</td>
            <td>ID of the campaign.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>A JSON object containing the campaign properties. Refer to the [Campaign parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#parameters-3) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateCampaign configKey="FB_CONN_1">
        <campaignId>{json-eval($.campaign_id)}</campaignId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.updateCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "campaign_id": "123123123",
        "properties": {
            "name": "New Furniture Likes Campaign 2",
            "objective": "OUTCOME_ENGAGEMENT"
        }
    }
    ```

??? note "dissociateCampaign"
    Dissociate a campaign from an AdAccount.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>deleteStrategy</td>
            <td>Delete strategy. Possible values <code>DELETE_ANY</code>, <code>DELETE_OLDEST</code> or <code>DELETE_ARCHIVED_BEFORE</code>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>beforeDate</td>
            <td>Set a before date to delete campaigns before this date.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>objectCount</td>
            <td>Object count.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.dissociateCampaign configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <deleteStrategy>{json-eval($.strategy)}</deleteStrategy>
        <objectCount>{json-eval($.count)}</objectCount>
    </facebookAds.dissociateCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "account_id": "123123123",
        "strategy": "DELETE_OLDEST",
        "count": 1
    }
    ```

??? note "deleteCampaign"
    Deletes a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>campaignId</td>
            <td>ID of the campaign.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.deleteCampaign configKey="FB_CONN_1">
        <campaignId>{json-eval($.campaign_id)}</campaignId>
    </facebookAds.deleteCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "campaign_id": "123123123"
    }
    ```

??? note "createAdSet"
    Creates an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>A JSON object containing the adset properties. Refer to the [Ad set parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createAdSet configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.createAdSet>
    ```
 
    **Sample request**

    ```json
    {
        "account_id": "123123123",
        "properties": {
            "name": "New Furniture Ad set",
            "status": "PAUSED",
            "campaign_id": "123123123",
            "daily_budget": "10000",
            "bid_amount": "300",
            "billing_event": "IMPRESSIONS",
            "targeting": {
                "facebook_positions": [
                    "feed"
                ],
                "geo_locations": {
                    "countries": [
                        "US"
                    ]
                }
            }
        }
    }
    ```

??? note "getAdSets"
    Returns all ad sets from one ad account
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>datePreset</td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Time Range. Note if time range is invalid, it will be ignored.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the ad set that the response should contain. Refer to the [Fields]( https://developers.facebook.com/docs/marketing-api/reference/adgroup#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAdSets configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <fields>{json-eval($.fields)}</fields>
    </facebookAds.getAdSets>
    ```
 
    **Sample request**

    ```json
    {
        "account_id":"123123123",
        "fields":"id,name,status,campaign"
    }
    ```

??? note "getAdSet"
    Return data related to an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adSetId</td>
            <td>ID of the ad set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>datePreset</td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Time Range. Note if time range is invalid, it will be ignored.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the ad set that the response should contain. Refer to the [Fields](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#parameters-2) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAdSet configKey="FB_CONN_1">
        <adSetId>{json-eval($.ad_set_id)}</adSetId>
        <fields>{json-eval($.fields)}</fields>
    </facebookAds.getAdSet>
    ```
 
    **Sample request**

    ```json
    {
        "ad_set_id":"456456456",
        "fields":"name, targeting"
    }
    ```

??? note "updateAdSet"
    Updates an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adSetId</td>
            <td>ID of the ad set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>A JSON object containing the adset properties. Refer to the [Ad set parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateAdSet configKey="FB_CONN_1">
        <adSetId>{json-eval($.ad_set_id)}</adSetId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.updateAdSet>
    ```
 
    **Sample request**

    ```json
    {
        "ad_set_id": "123123123",
        "properties": {
            "name": "New Furniture Ad set Updated",
            "status": "PAUSED",
            "bid_amount": "500"
        }
    }
    ```

??? note "deleteAdSet"
    Deletes a ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adSetId</td>
            <td>ID of the ad set.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.deleteAdSet configKey="FB_CONN_1">
        <adSetId>{json-eval($.ad_set_id)}</adSetId>
    </facebookAds.deleteAdSet>
    ```
 
    **Sample request**

    ```json
    {
        "ad_set_id": "123123123"
    }
    ```

??? note "createAd"
    Create an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>A JSON object containing the ad properties. Refer to the [Ad parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createAd configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.createAd>
    ```
 
    **Sample request**

    ```json
    {
        "account_id": "123123123",
        "properties": {
            "name": "New Furniture Ad",
            "status": "PAUSED",
            "adset_id": "456456456",
            "creative": {
                "creative_id": "789789789"
            }
        }
    }
    ```

??? note "getAds"
    Returns ads under this ad account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adAccountId</td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>datePreset</td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>effectiveStatus</td>
            <td>Filter ads by effective status.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>updatedSince</td>
            <td>Time since the ad has been updated.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the ad that the response should contain. Refer to the [Fields]( https://developers.facebook.com/docs/marketing-api/reference/adgroup#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAds configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <fields>{json-eval($.fields)}</fields>
        <effectiveStatus>{json-eval($.status)}</effectiveStatus>
        <updatedSince>{json-eval($.updated_since)}</updatedSince>
    </facebookAds.getAds>
    ```
 
    **Sample request**

    ```json
    {
        "account_id": "123123123",
        "fields": "id,name,status,ad_active_time",
        "status": [
            "ACTIVE"
        ],
        "updated_since": 34564356
    }
    ```

??? note "getAd"
    Returns data of an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adId</td>
            <td>ID of the ad.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>datePreset</td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the ad that the response should contain. Refer to the [Fields]( https://developers.facebook.com/docs/marketing-api/reference/adgroup#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAd configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <fields>{json-eval($.fields)}</fields>
    </facebookAds.getAd>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id":"789789789",
        "fields":"id,name,status,campaign,ad_active_time"
    }
    ```

??? note "updateAd"
    Updates an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adId</td>
            <td>ID of the ad.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>A JSON object containing the ad properties. Refer to the [Update Limitations](https://developers.facebook.com/docs/marketing-api/reference/adgroup#limitations) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateAd configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.updateAd>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id": "456456456",
        "properties": {
            "name": "New Furniture Ad 2",
            "status": "PAUSED"
        }
    }
    ```

??? note "deleteAd"
    Deletes an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adId</td>
            <td>ID of the ad.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.deleteAd configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
    </facebookAds.deleteAd>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id": "456456456"
    }
    ```
