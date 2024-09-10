# Facebook Ads Connector Reference

The following operations allow you to work with the Facebook Ads API. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Facebook Ads connector, first create the connection with your configuration. When calling a Facebook Ads operation, ensure the connection is referenced using the configKey attribute.

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

??? note "getAds"
    This is Get ads operation.
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
            <td>Effective status for the ads</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Date range used to aggregate insights metrics</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the campaign</td>
            <td>No</td>
        </tr>
        <tr>
            <td>summary</td>
            <td>Aggregated information about the edge, such as counts</td>
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

??? note "dissociateCampaign"
    This is Dissociate campaign operation.
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
            <td>beforeDate</td>
            <td>Set a before date to delete campaigns before this date</td>
            <td>No</td>
        </tr>
        <tr>
            <td>deleteStrategy</td>
            <td>Delete strategy</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>objectCount</td>
            <td>Object count</td>
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

??? note "createCampaign"
    This is Create campaign operation.
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
            <td>Campaign properties</td>
            <td>Yes</td>
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

??? note "deleteAdSet"
    This is Delete Ad Set operation.
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
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "updateAd"
    This is Update Ad operation.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adId</td>
            <td>ID of the ad</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>properties</td>
            <td>Ad set update properties</td>
            <td>Yes</td>
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

??? note "deleteAd"
    This is Delete Ad operation.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adId</td>
            <td>ID of the ad</td>
            <td>Yes</td>
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

??? note "createAd"
    This is Create Ad operation.
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
            <td>Ad properties</td>
            <td>Yes</td>
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

??? note "getCampaigns"
    This is Get campaigns operation.
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
            <td>Effective status for the campaigns</td>
            <td>No</td>
        </tr>
        <tr>
            <td>isCompleted</td>
            <td>If true, we return completed campaigns.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Date range used to aggregate insights metrics</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the campaign</td>
            <td>No</td>
        </tr>
        <tr>
            <td>summary</td>
            <td>Aggregated information about the edge, such as counts</td>
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

??? note "updateCampaign"
    This is Update campaign operation.
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
            <td>Campaign update properties</td>
            <td>Yes</td>
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

??? note "getAd"
    This is Get ad operation.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>adId</td>
            <td>ID of the ad</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>datePreset</td>
            <td>Predefined date range used to aggregate insights metrics.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>timeRange</td>
            <td>Date range used to aggregate insights metrics</td>
            <td>No</td>
        </tr>
        <tr>
            <td>fields</td>
            <td>Fields of the campaign</td>
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

??? note "getAdSet"
    This is Get Ad Set operation.
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
            <td>Fields of the ad set</td>
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

??? note "createAdSet"
    This is Create Ad Set operation.
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
            <td>Ad set properties</td>
            <td>Yes</td>
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

??? note "deleteCampaign"
    This is Delete campaign operation.
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
    <>
    ```
 
    **Sample request**

    ```json
    {}
    ```

??? note "updateAdSet"
    This is Update Ad Set operation.
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
            <td>Ad set update properties</td>
            <td>Yes</td>
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

??? note "getAdSets"
    This is Get Ad Sets operation.
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
            <td>Fields of the ad set</td>
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

