# Twitter API Connector Example

This example explains how to use the Twitter client to connect with the Twitter platform and perform operations. The connector uses the [Twitter API](https://developer.twitter.com/en/docs/twitter-api) to interact with Twitter.

## What you'll build

In this guide, you will build a project to perform the following operation. 

* Create a Tweet.

     The user sends the request payload that includes the necessary parameters for a Tweet, to create a new Tweet in Twitter. This request is sent to the integration runtime by invoking the Twitter connector API. 

<center><img src="{{base_path}}/assets/img/integrate/connectors/twitter-connector-store.png" title="Using Twitter Rest Connector" width="200" alt="Using Twitter Rest Connector"/></center>

The user calls the Twitter REST API. It invokes the **createTweet** sequence and creates a new Tweet on Twitter.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project.

1. Select the Micro Integrator Extension and click on `+` in APIs to create a REST API.

    <img src="{{base_path}}/assets/img/integrate/connectors/twitter-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

2. Follow these steps to [configure the Twitter API]({{base_path}}/reference/connectors/twitter-connector/twitter-connector-credentials/) and obtain the Client Id, Access Token and Refresh Token.

4. Provide the API name as **createTweet**. You can go to the source view of the XML configuration file of the API and copy the following configuration. 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/createtweet" name="createTweet" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/">
        <inSequence>
            <property expression="json-eval($.clientId)" name="clientId"/>
            <property expression="json-eval($.accessToken)" name="accessToken"/>
            <property expression="json-eval($.id)" name="id"/>
            <property expression="json-eval($.text)" name="text"/>
            <property expression="json-eval($.for_super_followers_only)" name="for_super_followers_only"/>
            <property expression="json-eval($.poll)" name="place_fields"/>
            <twitter.init>
                <accessToken>{$ctx:accessToken}</accessToken>
                <clientId>{$ctx:clientId}</clientId>
            </twitter.init>
            <twitter.createTweet>
                <for_super_followers_only>{$ctx:for_super_followers_only}</for_super_followers_only>
                <poll>{$ctx:poll}</poll>
                <text>{$ctx:text}</text>
            </twitter.createTweet>
            <respond/>
        </inSequence>
        <faultSequence/>
    </resource>
</api>
```

## Export integration logic as a carbon application

To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/twitter-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

!!! attention
        Before deploying, you will have to configure runtime. If you have not followed the [Configuring Integration Runtime]({{base_path}}/reference/connectors/twitter-connector/twitter-connector-configuration/) guide, please follow it before deploying the CApp.

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Test
Invoke the API as shown below using the curl command. Curl application can be downloaded from [here](https://curl.haxx.se/download.html).

```
curl --location 'http://<HOST_NAME>:<PORT>/createtweet' \
--header 'Content-Type: application/json' \
--data '{
   "ClientId": "ZW82OS1rYkJnOEhmUUpjSDNnS246MTpjaQ",
   "accessToken": "eENYRW5OczRKbFZCd2JRcm9EejFVUVp4N1JIcmNHY1RCLVBmckpHMjQycE1nOjE2ODczMjcxMzk4NjY6MTowOmF0OjE",
   "text": "Hello from WSO2",
   "for_super_followers_only": false,
   "poll": {"options": ["yes", "maybe", "no"], "duration_minutes": 120}
}'
```
If you are using MI 4.2.0 and above in your local environment without configuring, `<HOST_NAME> = localhost` and `<PORT> = 8290`.

A response similar to the following will be received.

```json
{
   "data": {
      "edit_history_tweet_ids": [
         "1667035675894640640"
      ],
      "id": "1667035675894640640",
      "text": "Hello from WSO2"
   }
}
```

## What's next

* To explore further the Twitter connector operations, see [Twitter Connector Reference]({{base_path}}/reference/connectors/twitter-connector/twitter-connector-reference/) documentation.
