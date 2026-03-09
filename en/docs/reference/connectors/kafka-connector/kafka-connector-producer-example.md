---
search:
  boost: 2
---

# Kafka Connector Example

Given below is a sample scenario that demonstrates how to send messages to a Kafka broker via Kafka topics. The publishMessages operation allows you to publish messages to the Kafka brokers via Kafka topics.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Kafka broker with the `init` operation and then use the `publishMessages` operation to publish messages via the topic. It exposes Kafka functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPs with the required information.

API has the context `/publishMessages`. It will publish messages via the topic to the Kafka server.

The following diagram illustrates all the required functionality of the Kafka service that you are going to build.

<a href="{{base_path}}/assets/img/integrate/connectors/kafka/kafkaconnectorpublishmessage.png"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafkaconnectorpublishmessage.png" title="KafkaConnector" width="800" alt="KafkaConnector"/></a>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up kafka

Before you begin, set up Kafka by following the instructions in [Setting up Kafka]({{base_path}}/reference/connectors/kafka-connector/setting-up-kafka/).

## Set up the integration project

Follow the steps below to set up the integration project using the WSO2 Integrator: MI Visual Studio Code extension.

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up WSO2 MI and create a new integration project. Use a suitable Project Name for your integration.

### Create a connection

1. In the Design View, click the **+View More** button and select **Connection**.

2. In the search bar, type `Kafka` and select the `Kafka connector` from the list.

    <img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-avro-create-connection.png" title="Creating a new connection" width="600" alt="Creating a new connection"/>

3. In the Connection Configuration pane, enter the following required information:
    - **Connection Name** - KafkaConnection
    - **Connection Type** - kafka
    - **Bootstrap Servers** - localhost:9092
    - **Key Serializer Class** - org.apache.kafka.common.serialization.StringSerializer
    - **Value Serializer Class** - org.apache.kafka.common.serialization.StringSerializer
    - **Pooling Enabled** - false

### Create an API

1. Click on the **API** button in create an integration project pane.

    <img src="{{base_path}}/assets/img/integrate/connectors/jira/create-api1.png" title="Creating a new API" width="600" alt="Creating a new API"/>

2. Enter the API Name as `KafkaTransport` and the Context as `/publishMessages`, then click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-avro-example-1.png" title="Creating a new API" width="600" alt="Creating a new API"/>

3. To add the Kafka connector:
    - In the **Design View**, click the **+** button.
    - In the **Mediator** section, search for `Kafka`.
    - Select the **Kafka** connector and click **Download**

### Implement the API

1. Go to the **Source View** of the API by clicking on the **<>** icon in the top right corner of the **Design View**.
   <img src="{{base_path}}/assets/img/integrate/connectors/jira/source_view.png" title="Source view of the implemented resource" width="600" alt="Source view of the implemented resource"/>

2. Copy and paste the following code in the **Source View** of the API.

??? note "Source view of the implemented resource"
    ```xml
        <?xml version="1.0" encoding="UTF-8"?>
    <api context="/publishMessages" name="KafkaTransport" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
        <inSequence>
            <kafkaTransport.publishMessages configKey="KafkaConnection">
                <topic>test</topic>
                <partitionNo>0</partitionNo>
                <key></key>
                <keySchema></keySchema>
                <keySchemaId></keySchemaId>
                <keySchemaMetadata></keySchemaMetadata>
                <valueSchema></valueSchema>
                <valueSchemaId></valueSchemaId>
                <keySchemaSubject></keySchemaSubject>
                <keySchemaVersion></keySchemaVersion>
                <keySchemaSoftDeleted>false</keySchemaSoftDeleted>
                <valueSchemaSubject></valueSchemaSubject>
                <valueSchemaVersion></valueSchemaVersion>
                <valueSchemaMetadata></valueSchemaMetadata>
                <valueSchemaSoftDeleted>false</valueSchemaSoftDeleted>
                <value></value>
                <forwardExistingHeaders>None</forwardExistingHeaders>
                <customHeaders>[]</customHeaders>
                <customHeaderExpression></customHeaderExpression>
            </kafkaTransport.publishMessages>
        </inSequence>
        <faultSequence>
        </faultSequence>
        </resource>
    </api>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/kafka-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

**Create a topic**:

Let’s create a topic named `test` with a single partition and only one replica.
Navigate to the `<KAFKA_HOME>` and run following command. 
```bash
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test     
```

**Sample request**:

- Content-Type: application/json
- Request body:
  ```json
  {
    "name": "sample"
  }
  ```
  
**Expected response**: 
   
Navigate to the `<KAFKA_HOME>` and run the following command to verify the messages:
```bash
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```

See the following message content:
```bash
{"name":"sample"}
```
   
## What's next

* To customize this example for your own scenario, see [Kafka Connector Configuration]({{base_path}}/reference/connectors/kafka-connector/kafka-connector-config/) documentation.
