# Avro Message with Kafka Connector Example

Given below is a sample scenario that demonstrates how to send Apache Avro messages to a Kafka broker via Kafka topics. The `publishMessages` operation allows you to publish messages to the Kafka brokers via Kafka topics.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Kafka broker and then use the `publishMessages` operation to publish messages via the topic. It exposes Kafka functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPS with the required information.

API has the `/publishMessages` context. It publishes messages via the topic to the Kafka server.

## Set up Kafka

Before you begin, 

1. Set up Kafka by following the instructions in [Setting up Kafka](setting-up-kafka.md).
2. Install the [Confluent Platform](https://docs.confluent.io/platform/current/installation/installing_cp/zip-tar.html) according to the Kafka version you are using.

## Configure the connector in WSO2 Integration Studio

Follow these steps to set up the Integration Project and the Connector Exporter Project.

{!includes/reference/connectors/importing-connector-to-integration-studio.md!}

1. Specify the API name as `KafkaTransport` and API context as `/publishMessages`.

2. To configure the resource click on the API Resource and go to **Properties** view. Select the method POST.

3. Drag and drop the property mediator from the mediator palette to the request path of the API resource.

4. Specify values for the property mediator:
   <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>

      <tr>
        <td>New Property Name</td>
        <td>valueSchema</td>
      </tr>

      <tr>
        <td>Property Data Type</td>
        <td>STRING</td>
      </tr>

      <tr>
        <td>Property Action</td>
        <td>set</td>
      </tr>

      <tr>
        <td>Property Scope</td>
        <td>default</td>
      </tr>

      <tr>
        <td>Value</td>
        <td>json-eval($.test)</td>
      </tr>
    </table>

5. Similarly, drag and drop 3 more property mediators from the mediator palette to the request path of the API resource and specify values as follows.
   <table>
      <tr>
         <th>Property Name</th>
         <th>Value</th>
      </tr>

      <tr>
        <td>value</td>
        <td>json-eval($.value)</td>
      </tr>

      <tr>
        <td>key</td>
        <td>json-eval($.key)</td>
      </tr>

      <tr>
        <td>topic</td>
        <td>json-eval($.topic)</td>
      </tr>
    </table>
   
6. Next drag and drop the 'publishMessages' operation of the KafkaTransport Connector to the Design View as shown below.
   <a href="{{base_path}}/assets/img/integrate/connectors/kafka"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-avro-example.png" title="Kafka Avro Example" width="800" alt="Kafka Avro Example"/></a>

7. Create a connection from the properties window by clicking on the '+' icon as shown below.
   <a href="{{base_path}}/assets/img/integrate/connectors/kafka"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-add-connection.png" title="Create Connection" width="800" alt="Create Connection"/></a>

8. In the popup window, provide the following parameters and click **Finish**.
   <table>
      <tr>
         <th>Property Name</th>
         <th>Value</th>
      </tr>
      <tr>
         <td>Bootstrap Servers</td>
         <td>localhost:9092</td>
      </tr>
      <tr>
         <td>Key Serializer Class</td>
         <td>io.confluent.kafka.serializers.KafkaAvroSerializer</td>
      </tr>
      <tr>
         <td>Value Serializer Class</td>
         <td>io.confluent.kafka.serializers.KafkaAvroSerializer</td>
      </tr>
      <tr>
         <td>Schema Registry URL</td>
         <td>http://localhost:8081</td>
      </tr>
   </table>

    
    <a href="{{base_path}}/assets/img/integrate/connectors/kafka"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-connection-configuration.png" title="Connection Configuration" width="500" alt="Connection Configuration"/></a>

10. After the connection is successfully created, select the created connection as 'Connection' from the drop-down menu in the properties window.

11. Next, configure the following parameters in the properties window
   <table>
      <tr>
         <th>Property Name</th>
         <th>Value</th>
      </tr>
      <tr>
         <td>Partition Number</td>
         <td>1</td>
      </tr>
   
      <tr>
         <td>Topic</td>
         <td>$ctx:topic</td>
      </tr>
   
      <tr>
         <td>Key</td>
         <td>$ctx:key</td>
      </tr>
   
      <tr>
         <td>Value</td>
         <td>$ctx:value</td>
      </tr>
   
      <tr>
         <td>Value Schema</td>
         <td>$ctx:valueSchema</td>
      </tr>
   </table>

12. You can find the complete API XML configuration below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/publishMessages" name="KafkaTransport" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST">
        <inSequence>
            <property expression="json-eval($.test)" name="valueSchema" scope="default" type="STRING"/>
            <property expression="json-eval($.value)" name="value" scope="default" type="STRING"/>
            <property expression="json-eval($.key)" name="key" scope="default" type="STRING"/>
            <property expression="json-eval($.topic)" name="topic" scope="default" type="STRING"/>
            <kafkaTransport.publishMessages configKey="KAFKA_CONNECTION_1">
                <topic>{$ctx:topic}</topic>
                <partitionNo>0</partitionNo>
                <key>{ctx:key}</key>
                <valueSchema>{ctx:valueSchema}</valueSchema>
                <value>{ctx:value}</value>
            </kafkaTransport.publishMessages>
        </inSequence>
        <outSequence/>
        <faultSequence/>
    </resource>
</api>
```

13. The following is the generated KAFKA_CONNECTION_1.xml which has been created in local-entries.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="KAFKA_CONNECTION_1" xmlns="http://ws.apache.org/ns/synapse">
   <kafkaTransport.init>
      <name>KAFKA_CONNECTION_1</name>
      <valueSerializerClass>io.confluent.kafka.serializers.KafkaAvroSerializer</valueSerializerClass>
      <connectionType>kafka</connectionType>
      <keySerializerClass>io.confluent.kafka.serializers.KafkaAvroSerializer</keySerializerClass>
      <bootstrapServers>localhost:9092</bootstrapServers>
      <poolingEnabled>false</poolingEnabled>
      <schemaRegistryUrl>http://localhost:8081</schemaRegistryUrl>
   </kafkaTransport.init>
</localEntry>
```
Now we can export the imported connector and the API into a single CAR application. The CAR application needs to be deployed during server runtime. 

{!includes/reference/connectors/exporting-artifacts.md!}

## Deployment

Follow these steps to deploy the exported CApp in the Enterprise Integrator Runtime. 

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server. Micro Integrator will be started and the composite application will be deployed.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

??? note "Click here for instructions on deploying on WSO2 Enterprise Integrator 6"
    1. You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server.

    2. WSO2 EI server starts and you can login to the Management Console https://localhost:9443/carbon/ URL. Provide login credentials. The default credentials will be admin/admin. 

    3. You can see that the API is deployed under the API section. 
    
## Testing

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
   
Run the following command to verify the messages:
````bash
[confluent_home]/bin/kafka-avro-console-consumer --topic myTopic --bootstrap-server localhost:9092 --property print.key=true --from-beginning
````
See the following message content:
````json
{"f1":{"string":"sampleValue"}}
````  
Sample API configuration when the Confluent Schema Registry is secured with basic auth,

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/publishMessages" name="KafkaTransport" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST">
        <inSequence>
            <property name="valueSchema"
                      expression="json-eval($.test)"
                      scope="default"
                      type="STRING"/>
            <property name="value"
                      expression="json-eval($.value)"
                      scope="default"
                      type="STRING"/>
            <property name="key"
                      expression="json-eval($.key)"
                      scope="default"
                      type="STRING"/>
            <property name="topic"
                      expression="json-eval($.topic)"
                      scope="default"
                      type="STRING"/>
           <kafkaTransport.publishMessages configKey="KAFKA_CONNECTION_1">
               <topic>{$ctx:topic}</topic>
               <partitionNo>0</partitionNo>
               <key>{$ctx:key}</key>
               <value>{$ctx:value}</value>
               <valueSchema>{$ctx:valueSchema}</valueSchema>
            </kafkaTransport.publishMessages>
        </inSequence>
        <outSequence/>
        <faultSequence/>
    </resource>
</api>
```
Local entry:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<localEntry key="KAFKA_CONNECTION_1" xmlns="http://ws.apache.org/ns/synapse">
    <kafkaTransport.init>
        <name>KAFKA_CONNECTION_1</name>
        <connectionType>kafka</connectionType>
		<bootstrapServers>localhost:9092</bootstrapServers>
        <valueSerializerClass>io.confluent.kafka.serializers.KafkaAvroSerializer</valueSerializerClass>
        <keySerializerClass>io.confluent.kafka.serializers.KafkaAvroSerializer</keySerializerClass>
        <schemaRegistryUrl>http://localhost:8081</schemaRegistryUrl>
        <poolingEnabled>false</poolingEnabled>
        <basicAuthCredentialsSource>USER_INFO</basicAuthCredentialsSource>
        <basicAuthUserInfo>admin:admin</basicAuthUserInfo>
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
Refer the [confluent documentation](https://docs.confluent.io/platform/current/schema-registry/serdes-develop/serdes-avro.html) for more details.

This demonstrates how the Kafka connector publishes Avro messages to Kafka brokers.
   
## What's next

* To customize this example for your own scenario, see [Kafka Connector Configuration](kafka-connector-config.md) documentation.
