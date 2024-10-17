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
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createCustomAudience configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <properties>{json-eval($.properties)}</properties>
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
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.createAdCreative configKey="FB_CONN_1">
        <adId>{json-eval($.ad_id)}</adId>
        <properties>{json-eval($.properties)}</properties>
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
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.updateCustomAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
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
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.addUsersToAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.addUsersToAudience>
    ```
 
    **Sample request**

    ```json
    {
        "audience_id": "456456456",
        "properties": {
            "payload": {
                "schema": "EMAIL_SHA256",
                "data": [
                    "b36a83701f1c3191e19722d6f90274bc1b5501fe69ebf33313e440fe4b0fe210",
                    "2b3b2b9ce842ab8b6a6c614cb1f9604bb8a0d502d1af49c526b72b10894e95b5"
                ]
            }
        }
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
    </table>

    **Sample configuration**

    ```xml
    <facebookAds.removeUsersFromAudience configKey="FB_CONN_1">
        <customAudienceId>{json-eval($.audience_id)}</customAudienceId>
        <properties>{json-eval($.properties)}</properties>
    </facebookAds.removeUsersFromAudience>
    ```
 
    **Sample request**

    ```json
    {
        "audience_id": "456456456",
        "properties": {
            "payload": {
                "schema": "EMAIL_SHA256",
                "data": [
                    "b36a83701f1c3191e19722d6f90274bc1b5501fe69ebf33313e440fe4b0fe210",
                    "2b3b2b9ce842ab8b6a6c614cb1f9604bb8a0d502d1af49c526b72b10894e95b5"
                ]
            }
        }
    }
    ```

## Error codes related to Facebook Ads Connector

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_MESSAGE` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, see [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

| Error code | Description |
| -------- | ------- |
| 701101 | General error. |
| 701102 | Invalid configuration error. |
