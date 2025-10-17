# Facebook Ads Connector Reference

The following operations allow you to work with the Facebook Ads API. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Facebook Ads connector, first create the connection with your configuration. When calling a Facebook Ads operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The `init` operation initializes the connection to Facebook Ads API.
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
            <td>The service root URL. The default value is `https://graph.facebook.com/v20.0`.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>accessToken</code></td>
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
    The `createCampaign` operation creates a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the campaign properties. See the [Campaign parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createCampaign configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>campaignResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `getCampaigns` operation returns campaigns under this ad account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>datePreset</code></td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>effectiveStatus</code></td>
            <td>Effective status for the campaigns.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>isCompleted</code></td>
            <td>If true, we return completed campaigns.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeRange</code></td>
            <td>Date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Fields of the campaign that the response should contain. See the [Fields](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getCampaigns configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <fields>{json-eval($.fields)}</fields>
        <effectiveStatus>{json-eval($.status)}</effectiveStatus>
        <isCompleted>{json-eval($.is_completed)}</isCompleted>
        <responseVariable>campaignsResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `updateCampaign` operation updates a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>campaignId</code></td>
            <td>ID of the campaign.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the campaign properties. See the [Campaign parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#parameters-3) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateCampaign configKey="FB_CONN_1">
        <campaignId>{json-eval($.campaign_id)}</campaignId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>updateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `dissociateCampaign` operation dissociate a campaign from an ad account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>deleteStrategy</code></td>
            <td>Delete strategy. Possible values <code>DELETE_ANY</code>, <code>DELETE_OLDEST</code> or <code>DELETE_ARCHIVED_BEFORE</code>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>beforeDate</code></td>
            <td>Set a before date to delete campaigns before this date.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>objectCount</code></td>
            <td>Object count.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.dissociateCampaign configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <deleteStrategy>{json-eval($.strategy)}</deleteStrategy>
        <objectCount>{json-eval($.count)}</objectCount>
        <responseVariable>dissociateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `deleteCampaign` operation deletes a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>campaignId</code></td>
            <td>ID of the campaign.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.deleteCampaign configKey="FB_CONN_1">
        <campaignId>{json-eval($.campaign_id)}</campaignId>
        <responseVariable>deleteResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.deleteCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "campaign_id": "123123123"
    }
    ```

??? note "createAdSet"
    The `createAdSet` operation creates an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the adset properties. See the [Ad set parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createAdSet configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>adSetResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `getAdSets` operation returns all ad sets from one ad account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>datePreset</code></td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeRange</code></td>
            <td>Time Range. Note if the time range is invalid, it will be ignored.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Fields of the ad set that the response should contain. See the [Fields]( https://developers.facebook.com/docs/marketing-api/reference/adgroup#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAdSets configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <fields>{json-eval($.fields)}</fields>
        <responseVariable>adSetsResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `getAdSet` operation return data related to an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adSetId</code></td>
            <td>ID of the ad set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>datePreset</code></td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeRange</code></td>
            <td>Time Range. Note if time range is invalid, it will be ignored.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Fields of the ad set that the response should contain. See the [Fields](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#parameters-2) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAdSet configKey="FB_CONN_1">
        <adSetId>{json-eval($.ad_set_id)}</adSetId>
        <fields>{json-eval($.fields)}</fields>
        <responseVariable>adSetResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `updateAdSet` operation updates an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adSetId</code></td>
            <td>ID of the ad set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the adset properties. See the [Ad set parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/adsets/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateAdSet configKey="FB_CONN_1">
        <adSetId>{json-eval($.ad_set_id)}</adSetId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>updateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `deleteAdSet` operation deletes an ad set.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adSetId</code></td>
            <td>ID of the ad set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.deleteAdSet configKey="FB_CONN_1">
        <adSetId>{json-eval($.ad_set_id)}</adSetId>
        <responseVariable>deleteResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.deleteAdSet>
    ```
 
    **Sample request**

    ```json
    {
        "ad_set_id": "123123123"
    }
    ```

??? note "createAd"
    The `createAd` operation creates an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the ad properties. See the [Ad parameters](https://developers.facebook.com/docs/marketing-api/reference/ad-account/ads/#parameters-2) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createAd configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>adResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `getAds` operation returns ads under this ad account.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>datePreset</code></td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>effectiveStatus</code></td>
            <td>Filter ads by effective status.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>updatedSince</code></td>
            <td>Time since the ad has been updated.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeRange</code></td>
            <td>Date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Fields of the ad that the response should contain. See the [Fields]( https://developers.facebook.com/docs/marketing-api/reference/adgroup#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAds configKey="FB_CONN_1">
        <adAccountId>{json-eval($.account_id)}</adAccountId>
        <fields>{json-eval($.fields)}</fields>
        <effectiveStatus>{json-eval($.status)}</effectiveStatus>
        <updatedSince>{json-eval($.updated_since)}</updatedSince>
        <responseVariable>adsResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `getAd` operation returns data of an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adId</code></td>
            <td>ID of the ad.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>datePreset</code></td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>timeRange</code></td>
            <td>Date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Fields of the ad that the response should contain. See the [Fields]( https://developers.facebook.com/docs/marketing-api/reference/adgroup#fields) documentation for a list of all available fields.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getAd configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <fields>{json-eval($.fields)}</fields>
        <responseVariable>adResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `updateAd` operation updates an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adId</code></td>
            <td>ID of the ad.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>A JSON object containing the ad properties. See the [Update Limitations](https://developers.facebook.com/docs/marketing-api/reference/adgroup#limitations) documentation for all the available properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateAd configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>updateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
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
    The `deleteAd` operation deletes an ad.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adId</code></td>
            <td>ID of the ad.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.deleteAd configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <responseVariable>deleteResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.deleteAd>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id": "456456456"
    }
    ```
??? note "createCustomAudience"
    The `createCustomAudience` operation creates a custom audience.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
            <tr>
            <td><code>properties</code></td>
            <td>Custom audience properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createCustomAudience configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>audienceResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.createCustomAudience>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id": "456456456",
        "properties": {
            "name": "My Custom Audience",
            "subtype": "CUSTOM", 
            "description": "Audience based on website traffic",
            "customer_file_source": "USER_PROVIDED_ONLY"
        }
    }
    ```

??? note "createAdCreative"
    The `createAdCreative` operation creates an ad creative.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>Ad creative properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createAdCreative configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>creativeResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.createAdCreative>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id": "456456456",
        "properties": {
            "name": "My Ad Creative",
            "object_story_spec": {
                "page_id": "465229476789834",
                "link_data": {
                    "description": "My ad creative",
                    "image_hash": "f2cafafae01fc9201c8d2e70687dhk675Ddsac",
                    "link": "https://sample.com/",
                    "message": "Check out my website!",
                    "name": "headline",
                    "call_to_action": {
                        "type": "LEARN_MORE",
                        "value": {
                            "link": "https://sample.com/",
                            "link_caption": ""
                        }
                    }
                }
            },
            "degrees_of_freedom_spec": {
                "creative_features_spec": {
                    "standard_enhancements": {
                        "enroll_status": "OPT_OUT"
                    }
                }
            }
        }
    }
    ```

??? note "updateCustomAudience"
    The `updateCustomAudience` operation updates a custom audience.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customAudienceId</code></td>
            <td>ID of the custom audience.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>Custom audience update properties.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateCustomAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>updateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.updateCustomAudience>
    ```
 
    **Sample request**

    ```json
    {
        "audience_id": "456456456",
        "properties": {
            "name": "My Custom Audience Update",
            "subtype": "CUSTOM", 
            "description": "Audience based on website traffic",
        }
    }
    ```

??? note "addUsersToAudience"
    The `addUsersToAudience` operation adds users to a custom audience. 
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customAudienceId</code></td>
            <td>ID of the custom audience.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>Properties of the users to be added to the audience.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>inputStructure</code></td>
            <td>Structure of the user data to be added.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configurations for Facebook API compatible input**

    ```xml
    <facebookAds.addUsersToAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>audienceUpdateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.addUsersToAudience>

    <facebookAds.addUsersToAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <inputStructure>FACEBOOK_API_COMPATIBLE</inputStructure>
        <responseVariable>audienceUpdateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.addUsersToAudience>
    ```
 
    **Sample request for Facebook API compatible input**

    ```json
    {
        "audience_id": "456456456",
        "properties": {
            "payload": {
                "schema": [
                    "COUNTRY",
                    "EMAIL",
                    "FN",
                    "GEN",
                    "LN",
                    "MADID",
                    "PHONE"
                ],
                "data": [
                    [
                        "79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621",
                        "23b9cb38c8e9c75a466a349eec16aff2c3eabc707cf57432a872aab7e532d069",
                        "b54f08623ae4039f55bcecba4961037fb4513d2ba9cb2b0667c5db970ac94911",
                        "252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111",
                        "d07227456ed0f3a3ca01456ee769b4662c1c679d754465b44c93b075fea751cd",
                        "aece52e7-03ee-455a-b3c4-e57283966239",
                        "c7e1a5948418c64b472abbe6a7b443ec83c4e31573874d600de828f89dd71339"
                    ]
                ]
            }
        }
    }
    ```

    **Sample configurations for JSON array input**

    ```xml
    <facebookAds.addUsersToAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <inputStructure>JSON_ARRAY</inputStructure>
        <responseVariable>audienceUpdateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.addUsersToAudience>
    ```
 
    **Sample request for JSON array input**

    ```json
    {
        "audience_id": "456456456",
        "properties": [
            {
                "email": "elizabetho@fb.com",
                "phone": "1-(650)-561-5622",
                "madid": "aece52e7-03ee-455a-b3c4-e57283966239",
                "fn": "Elizabeth",
                "ln": "Olsen",
                "zip": "94046",
                "ct": "Menlo Park",
                "st": "CA",
                "country": "US",
                "dob": "10\/21\/68",
                "doby": 1968,
                "gen": "F",
                "age": 48,
                "uid": 1234567890
            },
            {
                "email": "andrewj@fb.com",
                "phone": "1-(212) 736-3100",
                "madid": "BEBE52E7-03EE-455A-B3C4-E57283966239",
                "fn": "Andrew",
                "ln": "Jamison",
                "zip": "10118",
                "ct": "New York",
                "st": "NY",
                "country": "US",
                "dob": "10\/17\/78",
                "doby": 1978,
                "gen": "M",
                "age": 38,
                "uid": 1443637309
            }
        ]
    }
    ```

??? note "removeUsersFromAudience"
    The `removeUsersFromAudience` operation removes users from a custom audience.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>customAudienceId</code></td>
            <td>ID of the custom audience.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>Properties of the users to be removed from the audience.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>inputStructure</code></td>
            <td>Structure of the user data to be removed.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configurations for Facebook API compatible input**

    ```xml
    <facebookAds.removeUsersFromAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <responseVariable>audienceUpdateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.removeUsersFromAudience>

    <facebookAds.removeUsersFromAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <inputStructure>FACEBOOK_API_COMPATIBLE</inputStructure>
        <responseVariable>audienceUpdateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.removeUsersFromAudience>
    ```
 
    **Sample request for Facebook API compatible input**

    ```json
    {
        "audience_id": "456456456",
        "properties": {
            "payload": {
                "schema": [
                    "COUNTRY",
                    "EMAIL",
                    "FN",
                    "GEN",
                    "LN",
                    "MADID",
                    "PHONE"
                ],
                "data": [
                    [
                        "79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621",
                        "23b9cb38c8e9c75a466a349eec16aff2c3eabc707cf57432a872aab7e532d069",
                        "b54f08623ae4039f55bcecba4961037fb4513d2ba9cb2b0667c5db970ac94911",
                        "252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111",
                        "d07227456ed0f3a3ca01456ee769b4662c1c679d754465b44c93b075fea751cd",
                        "aece52e7-03ee-455a-b3c4-e57283966239",
                        "c7e1a5948418c64b472abbe6a7b443ec83c4e31573874d600de828f89dd71339"
                    ]
                ]
            }
        }
    }
    ```

    **Sample configurations for JSON array input**

    ```xml
    <facebookAds.removeUsersFromAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
        <inputStructure>JSON_ARRAY</inputStructure>
        <responseVariable>audienceUpdateResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.removeUsersFromAudience>
    ```
 
    **Sample request for JSON array input**

    ```json
    {
        "audience_id": "456456456",
        "properties": [
            {
                "email": "elizabetho@fb.com",
                "phone": "1-(650)-561-5622",
                "madid": "aece52e7-03ee-455a-b3c4-e57283966239",
                "fn": "Elizabeth",
                "ln": "Olsen",
                "zip": "94046",
                "ct": "Menlo Park",
                "st": "CA",
                "country": "US",
                "dob": "10\/21\/68",
                "doby": 1968,
                "gen": "F",
                "age": 48,
                "uid": 1234567890
            },
            {
                "email": "andrewj@fb.com",
                "phone": "1-(212) 736-3100",
                "madid": "BEBE52E7-03EE-455A-B3C4-E57283966239",
                "fn": "Andrew",
                "ln": "Jamison",
                "zip": "10118",
                "ct": "New York",
                "st": "NY",
                "country": "US",
                "dob": "10\/17\/78",
                "doby": 1978,
                "gen": "M",
                "age": 38,
                "uid": 1443637309
            }
        ]
    }
    ```

??? note "getCustomAudiences"
    The `getCustomAudiences` operation retrieves all custom audiences. Provide a value for the `filterByName` parameter to retrieve specific audiences by name.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>adAccountId</code></td>
            <td>ID of the ad account.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>filterByName</code></td>
            <td>Provide a name to filter and retrieve specific audiences.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>responseVariable</code></td>
            <td>Variable name to store the response payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>overwriteBody</code></td>
            <td>Replace the current message payload with the operation response.</td>
            <td>No (Default: false)</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.getCustomAudiences configKey="FB_CONN_1">
        <adAccountId>{json-eval($.ad_account_id)}</adAccountId>
        <filterByName>{json-eval($.filter_name)}</filterByName>
        <responseVariable>audiencesResponse</responseVariable>
        <overwriteBody>false</overwriteBody>
    </facebookAds.getCustomAudiences>
    ```
 
    **Sample request**

    Retrieve all the custom audiences.

    ```json
    {
        "ad_account_id": "123123123"
    }
    ```

    Retrieve specific audiences by name.
    
    ```json
    {
        "ad_account_id": "123123123",
        "filter_name": "Custom Audience With Users"
    }
    ```

## Error codes related to Facebook Ads Connector

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_MESSAGE` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, see [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

| Error code | Description |
| -------- | ------- |
| 701101 | General error. |
| 701102 | Invalid configuration error. |
