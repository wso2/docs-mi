# Avro message with Kafka connector example

Given below is a sample scenario that demonstrates how to send Apache Avro messages to a Kafka broker via Kafka topics. The `publishMessages` operation allows you to publish messages to the Kafka brokers via Kafka topics.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Kafka broker with the `init` operation and then use the `publishMessages` operation to publish messages via the topic. It exposes Kafka functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPS with the required information.

API has the `/publishMessages` context. It publishes messages via the topic to the Kafka server.

## Set up Kafka

Before you begin, set up Kafka by following the instructions in [Setting up Kafka](setting-up-kafka.md).

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.
## Create the integration logic

1. Click `+` on the Extension panel APIs to create the REST API.

2. Specify the API name as `KafkaTransport` and API context as `/publishMessages`. Click create.

<img src="{{base_path}}/assets/img/integrate/connectors/kafka-avro-example-1.png" title="Adding a Rest API" alt="Adding a Rest API" />

3. Click the `/resource` default endpoint to open the **Resource View**. Then click the `+` arrow below the Start node to open the side panel. Select **Externals** and click **Add new Connection**. Search `kafkaTransport` and click.
<img src="{{base_path}}/assets/img/integrate/connectors/kafka-avro-example-2.png" title="Adding a kafka Connection" alt="Adding a kafka Connection"/>
4. Provide values as below and click **Add**.
    - **Connection Name** - Sample_Kafka
    - **Connection Type** - kafka
    - **Boostrap Servers** - localhost:9092
    - **Key Serializer Class** - io.confluent.kafka.serializers.KafkaAvroSerializer
    - **Value Serializer Class** - io.confluent.kafka.serializers.KafkaAvroSerializer
    - **Schema Registry URL** - http://localhost:8081
    - **Max Pool Size** - 100

<img src="{{base_path}}/assets/img/integrate/connectors/kafka-avro-example-3.png" title="Create a kafka Connection" alt="Create a kafka Connection"/>
5. You can go to the XML configuration of the API (source view) and copy the following configuration.
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/publishMessages" name="KafkaTransport" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <property name="valueSchema" expression="json-eval($.test)" scope="default" type="STRING"/>
                <property name="value" expression="json-eval($.value)" scope="default" type="STRING"/>
                <property name="key" expression="json-eval($.key)" scope="default" type="STRING"/>
                <property name="topic" expression="json-eval($.topic)" scope="default" type="STRING"/>
                <kafkaTransport.publishMessages configKey="Sample_Kafka">
                    <topic>{$ctx:topic}</topic>
                    <partitionNo>0</partitionNo>
                    <key>{$ctx:key}</key>
                    <value>{$ctx:value}</value>
                    <valueSchema>{$ctx:valueSchema}</valueSchema>
                    <keySchemaSoftDeleted>false</keySchemaSoftDeleted>
                    <valueSchemaSoftDeleted>false</valueSchemaSoftDeleted>
                </kafkaTransport.publishMessages>
		    </inSequence>
        </resource>
    </api>
    ```

## Deployment

Follow these steps to deploy the exported CApp in the Enterprise Integrator Runtime. 

**Deploying on Micro Integrator**
To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.
    
## Test

Invoke the API (http://localhost:8290/publishMessages) with the following payload,

````json
{
   "test": {
       "type": "record",
       "name": "myrecord",
       "fields": [
           {
               "name": "f1",
               "type": ["string", "int"]
           }
       ]
   },
   "value": {
       "f1": "sampleValue"
   },
   "key": "sampleKey",
   "topic": "myTopic"
}
````

**Expected Response**: 
!!!info
    Refer to the [confluent documentation](https://docs.confluent.io/platform/current/installation/overview.html) for installing confluent.
   
Run the following command to verify the messages:
````bash
[confluent_home]/bin/kafka-avro-console-consumer.sh --topic myTopic --bootstrap-server localhost:9092 --property print.key=true --from-beginning
````
See the following message content:
````json
{"f1":{"string":"sampleValue"}}
````  
Sample Connection configuration when the Confluent Schema Registry is secured with basic auth

```xml
<?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="Sample_Kafka" xmlns="http://ws.apache.org/ns/synapse">
        <kafkaTransport.init>
            <connectionType>kafka</connectionType>
            <name>Sample_Kafka2</name>
            <bootstrapServers>localhost:9092</bootstrapServers>
            <keySerializerClass>io.confluent.kafka.serializers.KafkaAvroSerializer</keySerializerClass>
            <valueSerializerClass>io.confluent.kafka.serializers.KafkaAvroSerializer</valueSerializerClass>
            <schemaRegistryUrl>http://localhost:8081</schemaRegistryUrl>
            <basicAuthCredentialsSource>USER_INFO</basicAuthCredentialsSource>
            <basicAuthUserInfo>admin:admi</basicAuthUserInfo>
            <maxPoolSize>100</maxPoolSize>
            <poolingEnabled>false</poolingEnabled>
        </kafkaTransport.init>
    </localEntry>
```
In the above example, the <b>basicAuthCredentialsSource</b> parameter is configured as <b>USER_INFO</b>. For example, consider a scenario where the <b>basicAuthCredentialsSource</b> parameter is set to <b>URL</b> as follows:

````xml 
<basicAuthCredentialsSource>URL</basicAuthCredentialsSource>
````

Then, the <b>schemaRegistryUrl</b> parameter should be configured as shown below.

````xml 
<schemaRegistryUrl>http://admin:admin@localhost:8081</schemaRegistryUrl>
````
Refer to the [confluent documentation](https://docs.confluent.io/platform/current/schema-registry/serdes-develop/serdes-avro.html) for more details.

This demonstrates how the Kafka connector publishes Avro messages to Kafka brokers.
   
## What's next

* To customize this example for your own scenario, see [Kafka Connector Configuration](kafka-connector-config.md) documentation.
