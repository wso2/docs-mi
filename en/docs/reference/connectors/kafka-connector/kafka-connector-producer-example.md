# Kafka Connector Example

Given below is a sample scenario that demonstrates how to send messages to a Kafka broker via Kafka topics. The publishMessages operation allows you to publish messages to the Kafka brokers via Kafka topics.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Kafka broker and then use the `publishMessages` operation to publish messages via the topic. It exposes Kafka functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPs with the required information.

API has the context `/publishMessages`. It will publish messages via the topic to the Kafka server.

The following diagram illustrates all the required functionality of the Kafka service that you are going to build.

<a href="{{base_path}}/assets/img/integrate/connectors/kafkaconnectorpublishmessage.png"><img src="{{base_path}}/assets/img/integrate/connectors/kafkaconnectorpublishmessage.png" title="KafkaConnector" width="800" alt="KafkaConnector"/></a>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up Kafka

Before you begin, set up Kafka by following the instructions in [Setting up Kafka]({{base_path}}/reference/connectors/ksfka-connector/setting-up-kafka/).

## Configure the connector in WSO2 Integration Studio

Follow these steps to set up the Integration Project and the Connector Exporter Project. 

{!includes/reference/connectors/importing-connector-to-integration-studio.md!}

7. Specify the API name as `KafkaTransport` and API context as `/publishMessages`. 

8. To configure the resource click on the API Resource and go to **Properties** view. Select the method POST.

9. Next drag and drop the 'publishMessages' operation of the KafkaTransport Connector to the Design View as shown below.
   <a href="{{base_path}}/assets/img/integrate/connectors/kafka"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-add-connector.png" title="Add publishMessages connector operation" width="800" alt="Add publishMessages connector operation"/></a>

10. Create a connection from the properties window by clicking on the `+` icon as shown below.

    <a href="{{base_path}}/assets/img/integrate/connectors/kafka"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-add-connection.png" title="Create Connection" width="800" alt="Create Connection"/></a>

    In the popup window, the following parameters must be provided.

    - Bootstrap Servers - The Kafka brokers listed as host1:port1 and host2:port2.
    - Key Serializer Class - The serializer class for the key that implements the serializer interface.
    - Value Serializer Class - The serializer class for the value that implements the serializer interface.

11. After the connection is successfully created, select the created connection as `Connection` from the drop down menu in the properties window.

12. Next, configure the following parameters in the properties window.
    - Topic - The name of the topic
    - Partition Number - The partition number of the topic

      <a href="{{base_path}}/assets/img/integrate/connectors/kafka"><img src="{{base_path}}/assets/img/integrate/connectors/kafka/kafka-properties.png" title="Kafka Properties" width="800" alt="Kafka Properties"/></a>

13. You can find the API XML as follows:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/publishMessages" name="KafkaTransport" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST">
            <inSequence>
                <kafkaTransport.publishMessages configKey="KAFKA_CONNECTION_1">
                    <topic>test</topic>
                    <partitionNo>0</partitionNo>
                </kafkaTransport.publishMessages>
            </inSequence>
            <outSequence/>
            <faultSequence/>
        </resource>
    </api>
    ```
14. Following is the local entry generated: 
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="KAFKA_CONNECTION_1" xmlns="http://ws.apache.org/ns/synapse">
        <kafkaTransport.init>
            <name>KAFKA_CONNECTION_1</name>
            <valueSerializerClass>org.apache.kafka.common.serialization.StringSerializer</valueSerializerClass>
            <connectionType>kafka</connectionType>
            <keySerializerClass>org.apache.kafka.common.serialization.StringSerializer</keySerializerClass>
            <bootstrapServers>localhost:9092</bootstrapServers>
            <poolingEnabled>false</poolingEnabled>
        </kafkaTransport.init>
    </localEntry>
    ```

Now we can export the imported connector and the API into a single CAR application. The CAR application needs to be deployed during server runtime. 

{!includes/reference/connectors/exporting-artifacts.md!}

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/kafka-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

Follow these steps to deploy the exported CApp in the integration runtime. 

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server. Micro Integrator will be started and the composite application will be deployed.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

??? note "Click here for instructions on deploying on WSO2 Enterprise Integrator 6"
    1. You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server.

    2. WSO2 EI server starts and you can login to the Management Console https://localhost:9443/carbon/ URL. Provide login credentials. The default credentials will be admin/admin. 

    3. You can see that the API is deployed under the API section. 
    
## Testing

**Create a topic**:

Let’s create a topic named “test” with a single partition and only one replica.
Navigate to the `<KAFKA_HOME>` and run following command.
   
```bash
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test     
```

**Sample Request**:
   
Send a message to the Kafka broker using a CURL command or sample client.

```bash
curl -X POST -d '{"name":"sample"}' "http://localhost:8290/publishMessages" -H "Content-Type:application/json" -v
```

**Expected Response**: 
   
Navigate to the `<KAFKA_HOME>` and run the following command to verify the messages:

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