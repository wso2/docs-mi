# Salesforce Pub/Sub Connector Reference


The following operations allow you to work with the Salesforce Pub/Sub Connector. Click an operation name to see parameter details and samples on how to use it.


### Connection configuration


The Salesforce Pub/Sub Connector uses  Basic Authentication or Authorization headers. For more information on authentication, go to [Set up Salesforce Pub/Sub Connector Connection]({{base_path}}/reference/connectors/salesforce-pubsub-connector/sf-pubsub-configuration/).


??? note "Salesforce Pub/Sub Connection"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>server</td>
            <td>The service root URL.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>The port for the root URL.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>Tls Enabled</td>
            <td>Enabling the secure channel using TLS</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <salesforcePubSub.init>
        <connectionType>SALESFORCEPUBSUB</connectionType>
        <server>{${properties.server}}</server>
        <port>{${properties.port}}</port>
        <tlsEnabled>true</tlsEnabled>
        <authType>Basic Auth</authType>
        <username>{${properties.username}}</username>
        <password>{${properties.password}}</password>
        <securityToken>{${properties.securityToken}}</securityToken>
        <name>sfpubsub</name>
    </salesforcePubSub.init>
    ```
    **Sample request**
    ```json
     {
        "server": "api.pubsub.salesforce.com",
        "port": 7443,
        "tlsEnabled": true,
        "username": XXXXXXXXXXXX,
        "password": XXXXXXXXXXXX,
        "securityToken": XXXXXXXXXXXX
     }
    ```

### Publish Events


The **publish** operation allows you to publish events to a Salesforce topic. The event data must be in JSON format and must match the schema of the topic.


??? note "Salesforce Pub/Sub publish"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topic_name</td>
            <td>Topic to publish on</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>events</td>
            <td>Batch of ProducerEvent(s) to send</td>
            <td>Yes</td>
        </tr>
    </table>
    
    **Sample configuration**

    ```xml
    <salesforcePubSub.publish configKey="sfpubsub">
        <topic_name>{${properties.topic_name}}</topic_name>
        <events>{${properties.events}}</events>
        <auth_refresh></auth_refresh>
        <responseVariable>salesforcePubSub_publish_229</responseVariable>
        <overwriteBody>true</overwriteBody>
    </salesforcePubSub.publish>
    ```
    **Sample request**
    ```json
     {
        "topic_name": "/event/order__e",
        "events": [
            {
                "schema_id": "Cj6--yRyVY72q2Wfo0Fs1w",
                "payload": "2uqVkNRlJDAwNWdMMDAwMDAwZHN3YlFBQQIA"
            },
            {
                "schema_id": "Cj6--yRyVY72q2Wfo0Fs1w",
                "payload": "2uqVkNRlJDAwNWdMMDAwMDAwZHN3YlFBQQIA"
            }
            ]
     }
    ```

### Get Topic

The **getTopic** operation allows you to retrieve the metadata of a Salesforce topic. This includes information such as the topic name, description, and schema.

??? note "Salesforce Pub/Sub getTopic"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>topic_name</td>
            <td>Topic to retrieve metadata for</td>
            <td>Yes</td>
        </tr>
    </table>

    ```xml
    <salesforcePubSub.getTopic configKey="sfpubsub">
        <topic_name>{${properties.topic_name}}</topic_name>
        <responseVariable>salesforcePubSub_getTopic_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </salesforcePubSub.getTopic>
    ```
    **Sample request**
    ```json
     {
        "topic_name": "/event/order__e"
     }
    ```
### Get Schema

The **getSchema** operation allows you to retrieve the JSON schema of a Salesforce topic. This schema defines the structure of the events that can be published to the topic.


??? note "Salesforce Pub/Sub getSchema"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>schema_id</td>
            <td>Schema fingerprint for this event, which is a hash of the schema.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforcePubSub.getSchema configKey="sfpubsub">
        <schema_id>{${properties.schema_id}}</schema_id>
        <responseVariable>salesforcePubSub_getSchema_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </salesforcePubSub.getSchema>
    ```
    **Sample request**
    ```json
     { 
        "schema_id": "Cj6--yRyVY72q2Wfo0Fs1w"
     }
    ```
