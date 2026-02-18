# Avro message with Kafka connector example

Given below is a sample scenario that demonstrates how to send Apache Avro messages to a Kafka broker via Kafka topics. The `publishMessages` operation allows you to publish messages to the Kafka brokers via Kafka topics.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Kafka broker with the `init` operation and then use the `publishMessages` operation to publish messages via the topic. It exposes Kafka functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPS with the required information.

API has the `/publishMessages` context. It publishes messages via the topic to the Kafka server.

## Prerequisites

- Set up MI by following the instructions in [Setting up Kafka](setting-up-kafka.md)
- Set up Confluent by following the [Confluent documentation](https://docs.confluent.io/platform/current/installation/overview.html).

## Set up the integration project

Follow the steps below to set up the integration project using the WSO2 Integrator: MI Visual Studio Code extension.

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up WSO2 MI and create a new integration project. Use a suitable Project Name for your integration.

### Create a connection

1. In the Design View, click the **+** button and select **Connection**.

2. In the search bar, type `Kafka` and select the `Kafka connector` from the list.

    <img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-avro-create-connection.png" title="Creating a new connection" width="600" alt="Creating a new connection"/>

3. In the Connection Configuration pane, enter the following required information:
    - **Connection Name** - Sample_Kafka
    - **Connection Type** - kafka
    - **Bootstrap Servers** - localhost:9092
    - **Key Serializer Class** - io.confluent.kafka.serializers.KafkaAvroSerializer
    - **Value Serializer Class** - io.confluent.kafka.serializers.KafkaAvroSerializer
    - **Schema Registry URL** - http://localhost:8081
    - **Max Active Connections** - 100

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

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

### Sample request:

- Content-Type: application/json
- Request body:

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

Run the following command to verify the messages:
````bash
[confluent_home]/bin/kafka-avro-console-consumer.sh --topic myTopic --bootstrap-server localhost:9092 --property print.key=true --from-beginning
````

See the following message content:
````json
{"f1":{"string":"sampleValue"}}
````  

> NOTE:  Connection configuration for the Confluent Schema Registry is secured with basic auth
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
            <basicAuthUserInfo>admin:admin</basicAuthUserInfo>
            <maxActiveConnections>100</maxActiveConnections>
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

   
## What's next

* To customize this example for your own scenario, see [Kafka Connector Configuration](kafka-connector-config.md) documentation.
