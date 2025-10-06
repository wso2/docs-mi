---
search:
  boost: 2
---
# Google Pub/Sub Connector Reference

The Google Pub/Sub connector allows you to access the [Google Cloud Pub/Sub API Version v1](https://cloud.google.com/pubsub/docs/reference/rest/) from an integration sequence. Google Cloud Pub/Sub is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications.

## Connection Configuration

To use the Google Pub/Sub Connector, you need to configure a connection. The connection configuration requires the following parameters:

- **Client ID**: The client ID of your Google Cloud project.
- **Client Secret**: The client secret of your Google Cloud project.
- **Refresh Token**: The refresh token for your Google account.

You can obtain these credentials by following the steps in the [Configure Google Pub/Sub API]({{base_path}}/reference/connectors/google-pubsub-connector/googlepubsub-connector-configuration/).

The following operations allow you to work with the Google Pub/Sub Connector. Click an operation name to see parameter details and samples on how to use it.


??? note "createTopic"
    The createTopic operation creates a new topic with a name that you specify. See the [related API documentation](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/create) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topicName</td>
            <td>The name of the topic that you are creating.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>projectId</td>
            <td>The unique ID of the project within which you want to create the topic.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googlepubsub.createTopic>
        <topicName>{${payload.topicName}}</topicName>
        <projectId>{${payload.projectId}}</projectId>
    </googlepubsub.createTopic>
    ```
    
    **Sample request**

    ```json
    {
        "apiUrl":"https://pubsub.googleapis.com",
        "apiVersion":"v1",
        "accessToken": "ya29.GlwG2NhgX_NQhxjtF_0G9bzf0FEj_shNWgF_GXmjeYQF0XQXrBjjcrJukforOeyTAHoFfSQW0x-OrrZ2lj47Z6k6DAYZuUv3ZhJMl-ll4mvouAbc",
        "topicName":"topicA",
        "projectId":"rising-parser-123456"
    }
    ```

??? note "publishMessage"
    The publishMessage operation publishes messages to a specified topic. See the [related API documentation](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/publish) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topicName</td>
            <td>The unique name of the topic to which messages should be published.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>projectId</td>
            <td>The unique ID of the project within which the topic is created.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>data</td>
            <td>The message payload.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>Additional attributes of the message.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googlepubsub.publishMessage>
        <topicName>{${payload.topicName}}</topicName>
        <projectId>{${payload.projectId}}</projectId>
        <data>{${payload.data}}</data>
        <attributes>{${payload.attributes}}</attributes>
    </googlepubsub.publishMessage>
    ```
    
    **Sample request**

    ```json
    {
        "apiUrl":"https://pubsub.googleapis.com",
        "apiVersion":"v1",
        "accessToken": "ya29.GlwG2NhgX_NQhxjtF_0G9bzf0FEj_shNWgF_GXmjeYQF0XQXrBjjcrJukforOeyTAHoFfSQW0x-OrrZ2lj47Z6k6DAYZuUv3ZhJMl-ll4mvouAbc",
        "topicName":"topicA",
        "projectId":"rising-parser-123456"
    }
    ```

??? note "subscribeTopic"
    The createTopicSubscription operation creates a subscription to a topic that you specify. See the [related API documentation](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions/create) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topicName</td>
            <td>The name of the topic that you are creating.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>projectId</td>
            <td>The unique ID of the project within which you want to create the topic.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>subscriptionName</td>
            <td>The name of the subscription.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>ackDeadlineSeconds</td>
            <td>The maximum time a subscriber can take to acknowledge a message that is received.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>pushEndpoint</td>
            <td>The URL that specifies the endpoint to which messages should be pushed.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>attributes</td>
            <td>Additional endpoint configuration attributes.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googlepubsub.createTopicSubscription>
        <topicName>{${payload.topicName}}</topicName>
        <projectId>{${payload.projectId}}</projectId>
        <subscriptionName>{${payload.subscriptionName}}</subscriptionName>
        <ackDeadlineSeconds>{${payload.ackDeadlineSeconds}}</ackDeadlineSeconds>
        <pushEndpoint>{${payload.pushEndpoint}}</pushEndpoint>
        <attributes>{${payload.attributes}}</attributes>
    </googlepubsub.createTopicSubscription>
    ```
    
    **Sample request**

    ```json
    {
        "apiUrl":"https://pubsub.googleapis.com",
        "apiVersion":"v1",
        "accessToken": "ya29.GlwAJG2NhgX_NQhxjtF_0G9bzf0FEj_shNWgF_GXmYFpwIxjeYQF0XQXukforOeyTAHoFfSQW0x-OrrZ2lj47Z6k6DAYZuUv3ZhJMl-ll4mvouAbc",
        "projectId":"rising-parser-123456",
        "topicName":"topicA",
        "subscriptionName":"mysubA",
        "ackDeadlineSeconds":"30",
        "pushEndpoint": "https://example.com/push",
        "attributes": {"key": "value1","key2":"values2"}
    }
    ```

??? note "pullMessage"
    The pullMessage operation retrieves messages that are published to a topic. See the [related API documentation](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions/pull) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topicName</td>
            <td>The name of the topic to which the subscription belongs.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>projectId</td>
            <td>The unique ID of the project within which the topic is created.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>subscriptionName</td>
            <td>The name of the subscription from which messages should be retrieved.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>maxMessages</td>
            <td>The maximum number of messages to retrieve.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>returnImmediately</td>
            <td>Set this to true if you want the server to respond immediately.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <googlepubsub.pullMessage>
        <topicName>{${payload.topicName}}</topicName>
        <projectId>{${payload.projectId}}</projectId>
        <subscriptionName>{${payload.subscriptionName}}</subscriptionName>
        <maxMessages>{${payload.maxMessages}}</maxMessages>
        <returnImmediately>{${payload.returnImmediately}}</returnImmediately>
    </googlepubsub.pullMessage>
    ```
    
    **Sample request**

    ```json
    {
        "apiUrl":"https://pubsub.googleapis.com",
        "apiVersion":"v1",
        "accessToken": "ya29.GlwABbJG2NhgX_NQhxjtF_0G9bzf0FEj_shNWgF_GXmYFpwIxjeYQF0XjcrJukforOeyTAHoFfSQW0x-OrrZ2lj47Z6k6DAYZuUv3ZhJMl-ll4mvouAbc",
        "topicName":"topicA",
        "projectId":"rising-parser-123456",
        "subscriptionName":"mysubA",
        "maxMessages":"2",
        "returnImmediately":"false"
    }
    ```