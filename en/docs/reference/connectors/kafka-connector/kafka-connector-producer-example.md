# Kafka Connector Example

Given below is a sample scenario that demonstrates how to send messages to a Kafka broker via Kafka topics. The publishMessages operation allows you to publish messages to the Kafka brokers via Kafka topics.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Kafka broker with the `init` operation and then use the `publishMessages` operation to publish messages via the topic. It exposes Kafka functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPs with the required information.

API has the context `/publishMessages`. It will publish messages via the topic to the Kafka server.

The following diagram illustrates all the required functionality of the Kafka service that you are going to build.

<a href="{{base_path}}/assets/img/integrate/connectors/kafkaconnectorpublishmessage.png"><img src="{{base_path}}/assets/img/integrate/connectors/kafkaconnectorpublishmessage.png" title="KafkaConnector" width="800" alt="KafkaConnector"/></a>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up kafka

Before you begin, set up Kafka by following the instructions in [Setting up Kafka]({{base_path}}/reference/connectors/kafka-connector/setting-up-kafka/).

## Set up the integration project

1. Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

2. Create a new Kafka connection. 
    1. Goto `Local Entries` -> `Connections` and click on the `+` sign. 
    2. Select  `KafkaTransport` connector.
        <img src="{{base_path}}/assets/img/integrate/connectors/kafka-conn-add-new-connection.png" title="Add new kafka connection" width="800" alt="Add new kafka connection"/>

    3. Use the following values to create the connection. 
        - Connection Name - `KafkaConnection`
        - Connection Type - `kafka`
        - Bootstrap Servers - `localhost:9092` 
        - Key Serializer Class - `org.apache.kafka.common.serialization.StringSerializer`
        - Value Serializer Class - `org.apache.kafka.common.serialization.StringSerializer`
        - Pooling Enabled - `false`

## Create the integration logic

1. Select Micro Integrator and click on `+` in APIs to create a REST API. Provide `KafkaTransport` as name and `publishMessages` as context.
   <img src="{{base_path}}/assets/img/integrate/connectors/kafka-conn-add-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

2. Create a resource with the below configuration.<br/>
    <img src="{{base_path}}/assets/img/integrate/connectors/kafka-conn-add-resource.png" title="Adding API Resource" width="400" alt="Adding API Resource"/>

3. Select the created resource and add the `PublishMessages` operation.
    <img src="{{base_path}}/assets/img/integrate/connectors/kafka-conn-add-operation.png" title="Adding operation" width="800" alt="Adding operation"/>

    - Use the following values to fill the appearing form.
        - Connection - `KafkaConnection`
        - Topic - `test`
        - Partition Number - `0`

        <img src="{{base_path}}/assets/img/integrate/connectors/kafka-conn-config-operation.png" title="Configure operation" width="400" alt="Configure operation"/>

The source view of the XML configuration file of the API will be as below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
    <api context="/publishMessages" name="KafkaTransport" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST">
        <inSequence>
            <kafkaTransport.publishMessages configKey="KafkaConnection">
                <topic>test</topic>
                <partitionNo>0</partitionNo>
                <keySchemaSoftDeleted>false</keySchemaSoftDeleted>
                <valueSchemaSoftDeleted>false</valueSchemaSoftDeleted>
            </kafkaTransport.publishMessages>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    </api>
```

Now, we can export the imported connector and the API into a single CAR application. The CAR application needs to be deployed during server runtime. 

## Export integration logic as a carbon application 

To export the project, please refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/kafka-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, please refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).
    
## Test

**Create a topic**:

Let’s create a topic named `test` with a single partition and only one replica.
Navigate to the <KAFKA_HOME> and run following command. 
```bash
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test     
```

**Sample request**:
   
Send a message to the Kafka broker using a CURL command or sample client.
```bash
curl -X POST -d '{"name":"sample"}' "http://localhost:8290/publishMessages" -H "Content-Type:application/json" -v
```

**Expected response**: 
   
Navigate to the <KAFKA_HOME> and run the following command to verify the messages:
```bash
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```

See the following message content:
```bash
{"name":"sample"}
```   

This demonstrates how the Kafka connector publishes messages to the Kafka brokers.
   
## What's next

* To customize this example for your own scenario, see [Kafka Connector Configuration]({{base_path}}/reference/connectors/kafka-connector/kafka-connector-config/) documentation.