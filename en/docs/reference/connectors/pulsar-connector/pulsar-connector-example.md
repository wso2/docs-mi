# Apache Pulsar Connector Example

The **Apache Pulsar Connector** allows publishing messages to Apache Pulsar topics hosted on either local brokers or managed Pulsar services. It supports secure communication using **TLS encryption** and **JWT-based authentication**, and exposes the publishing functionality through a **RESTful API**. Users can send messages to Pulsar over HTTP/HTTPS, simplifying integration with external systems.

## What you'll build

Given below is a sample API that illustrates how you can connect to a Apache Pulsar broker with the `init` operation and then use the `publishMessage` operation to publish messages to the topics. It exposes Apache Pulsar functionalities as a RESTful service. Users can invoke the API using HTTP/HTTPs with the required information.

API has the context `/publishMessage`. It will publish messages via the topic to the Apache Pulsar server.

The following diagram illustrates all the required functionality of the Apache Pulsar service that you are going to build.

<a href="{{base_path}}/assets/img/integrate/connectors/kafkaconnectorpublishmessage.png"><img src="{{base_path}}/assets/img/integrate/connectors/kafkaconnectorpublishmessage.png" title="KafkaConnector" width="800" alt="KafkaConnector"/></a>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Before you begin

To connect with Apache Pulsar using the WSO2 Micro Integrator Apache Pulsar Connector, you need to first set up a running Pulsar instance locally or on a server. In this example, we will use an Apache Pulsar standalone server. Follow the steps below to prepare the Pulsar environment:

### 1. Download and Extract Pulsar

- Download the latest Apache Pulsar release from the [official website](https://pulsar.apache.org/download/).
- Extract the archive to a preferred location on your machine.

---

### 2. Configure TLS Encryption

- For this example, **TLS encryption using PEM certificates** is used to ensure secure communication with the Pulsar broker. To configure TLS with PEM, refer to the official [Apache Pulsar documentation](https://pulsar.apache.org/docs/next/security-tls-transport/#configure-mtls-encryption-with-pem) for a step-by-step guide and ensure that you have the following components prepared:

    - A **Certificate Authority (CA)** certificate - `tlsTrustCertsFilePath`
    - A **server certificate** - `tlsCertificateFilePath`
    - The **server's private key** - `tlsKeyFilePath`

---

### 3. Configure Authentication using tokens based on JSON Web Tokens (JWT)

- For this example, **JWT-based authentication** is used to restrict access to authorized clients only. To configure JWT authentication, refer to the official [Apache Pulsar documentation](https://pulsar.apache.org/docs/next/security-jwt/) for a step-by-step guide. Ensure that you have the following components prepared:

    - A **JWT token** that includes the necessary claims for authentication. The compact representation of a signed JWT is a string that looks like:
        ```bash
        eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY
        ```
  
    Once the JWT token is generated, configure the Pulsar broker to enable JWT-based authentication.

### 4. Start the Pulsar Standalone Server

- Navigate to the extracted Pulsar directory.
- Start the standalone server using the following command:

      ```bash
      bin/pulsar standalone
      ```

!!!Note
    - For setting up Pulsar in other environments such as Docker or Kubernetes, please refer to the [official Apache Pulsar documentation](https://pulsar.apache.org/docs/next/getting-started-home/).
    - The recommended version of Java for Apache Pulsar is 21 or above.

### Setup Environment for Apache Pulsar Connector

To configure the Apache Pulsar connector with Apache Pulsar version 4.0.4, copy the following client libraries to the `<MI_HOME>/lib` directory.

* [pulsar-client-4.0.4.wso2v1.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka_2.12/2.8.2)
* [pulsar-client-original-4.0.4.jar](https://repo1.maven.org/maven2/org/apache/pulsar/pulsar-client-original/4.0.4/pulsar-client-original-4.0.4.jar)
* [pulsar-common-4.0.4.jar](https://repo1.maven.org/maven2/org/apache/pulsar/pulsar-common/4.0.4/pulsar-common-4.0.4.jar)
* [bookkeeper-common-allocator-4.16.6.jar](https://repo1.maven.org/maven2/org/apache/bookkeeper/bookkeeper-common-allocator/4.16.6/bookkeeper-common-allocator-4.16.6.jar)
* [netty-codec-dns-4.1.119.Final.jar](https://repo1.maven.org/maven2/io/netty/netty-codec-dns/4.1.119.Final/netty-codec-dns-4.1.119.Final.jar)
* [netty-resolver-dns-4.1.119.Final.jar](https://repo1.maven.org/maven2/io/netty/netty-resolver-dns/4.1.119.Final/netty-resolver-dns-4.1.119.Final.jar)
* [netty-transport-classes-epoll-4.1.119.Final.jar](https://repo1.maven.org/maven2/io/netty/netty-transport-classes-epoll/4.1.119.Final/netty-transport-classes-epoll-4.1.119.Final.jar)
* [netty-incubator-transport-classes-io_uring-0.0.26.Final.jar](https://repo1.maven.org/maven2/io/netty/incubator/netty-incubator-transport-classes-io_uring/0.0.26.Final/netty-incubator-transport-classes-io_uring-0.0.26.Final.jar)

## Set up the integration project

Follow these steps to set up the Integration Project using the WSO2 Micro Integrator Visual Studio Code extension.

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **WSO2 MI** and create the integration project with the **Project Name** as follows:

<img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateProject.png" title="Creating a new Project" width="800" alt="Creating a new Project"/>

### Create the integration logic

#### Create the API

1. Under the **Create an integration** section, select **API** to create a new REST API.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateAPI1.png" title="Creating a new API" width="800" alt="Creating a new API"/>

2. Then, enter the API name as `PublishMessage` and the Context as `/publishMessage` and click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateAPI.png" title="Creating a new API" width="800" alt="Creating a new API"/>

3. Select the newly created `PublishMessage` API and click the **Edit** button to change the API method.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/UpdateResource1.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>

4. Then select the `POST` method and click **Update**.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/UpdateResource.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
   <br/> 
   This will create a new API resource with the context `/publishmessage` and the method `POST`.

#### Create Sample Request Payload

To map elements from the request payload to the configuration parameters, you can define a sample request payload. To do this, follow the steps below:

5. Click on the resource and you will be redirected to the **Design View** of the API. Now, click on the `Start` node on the canvas and select the `Add Request` option. This will open a pane to create a new example payload request.

       In this operation, we are going to receive the following inputs from the user.
    
        - **topic** - The name of the Pulsar topic to which the message will be published.
        - **message** - The content of the message to be published.
        - **key** - The key associated with the message, used for partition routing.
        - **properties** - Additional named properties to be included with the message.
    
       Therefore, provide the following JSON payload to the request.
        ```json
        {
            "topic": "<your-email>@gmail.com",
            "message": "<your-email>@gmail.com",
            "key": "Sample email",
            "properties": {
                "message-type":"text/plain",
                "event-date": "2025-05-20"
              }  
           
        }
        ```
    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/AddApiRequestPayload.png" title="Adding the sample API request." width="400" alt="Adding the API request."/>

#### Add Pulsar Connector to the Project

6. Now we will add the `publishMessage` operation of the Pulsar Connector to the integration flow. To do this, we need to add the Apache Pulsar Connector to the integration project first. 
    For that, open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette** and search for `Pulsar` in the **Mediators** section. Then, select the **Pulsar** connector and click on the **Download** button.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateConnection1.png" title="Adding Pulsar Connector" width="800" alt="Adding Pulsar Connector"/>

7. Click on the `publishMessage` operation to add that operation to the integration flow.

#### Create Connection

8. Create a new connection by clicking on the '+ Add new connection' button as shown below. It will open a new pop-up window.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateConnection2.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

9. Click on the **PulsarSecure** tile under the Pulsar Connector.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateConnection3.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

10. Enter the connection name as `PulsarSecureConnection` and provide the following details in the **Pulsar Connection** configuration pane.

      - **Broker URL**: pulsar://localhost:6651/
      - **Authentication Type**: JWT
      - **JWT Token**: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY
      - **Broker CA Certificate Path**: /absolute/path/to/ca.cert.pem

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/CreateConnection4.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

### Implement the API

11. Once the Pulsar connection is successfully created, it will be listed in the drop-down on the **Connection** section of the **Add PublishMessage** operation window.

12. Now we need to configure the necessary parameters of the `publishMessage` operation. For some of the fields, we will use Synapse expressions to map values from the sample request defined in [Create Sample Request Payload](#create-sample-request-payload).
    - Input Section
        - **Message**: `${payload.message}`
        - **Key**: ${payload.key}
        - **Message Properties**: 
          ```json
          [
            {"message-type": "${payload.properties.message-type}"},
            {"event-date": "${payload.properties.event-date}"}
          ]
          ```
    - Producer Settings
        - **Topic Name**: ${payload.topic}
        - **Compression Type**: NONE
        - **Send Mode**: Sync
        - **Batching Enabled**: true
    - Output Section
        - **Output Variable**: pulsar_publishMessage_28
        - **Overwrite Message Body**: true
      
- To do this, click on the `Expression` icon in the Message field and select the `Payload` option.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/AddExpression.png" title="Adding the send parameters." width="700" alt="Configuring publishMessage operation."/>

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/SelectFromPayload.png" title="Adding the send parameters." width="700" alt="Configuring publishMessage operation."/>

    This will open a new pop-up window where you can select the `payload.message` parameter from the request payload. <br/>

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/AddMessageConfig.png" title="Adding the send parameters." width="700" alt="Configuring publishMessage operation."/>

    Next, do the same for the `Key`, `Message Properties`, and `Topic` fields. <br/>

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/PublishMessageConfigPane1.png" title="Adding the send parameters." width="400" alt="PublishMessage operation pane."/>
  
    Tick the `Overwrite body` checkbox in the `Output` field to overwrite the message body with the response of the operation. This will replace the sample request payload defined at the top with the output schema of the operation response shown below. <br/>

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/OutputSchema.png" title="publishmessage operation output schema." width="400" alt="publishmessage operation output schema."/>

13. Add a Log mediator to log the response of the `publishMessage` operation. To do this, click on the `+` icon after the `publishMessage` operation and select the `Log` mediator from the **Mediator Palette**.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/AddLogMediator1.png" title="Adding Log Mediator" width="700" alt="Adding Log Mediator"/>

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/AddLogMediator2.png" title="Adding Log Mediator" width="500" alt="Adding Log Mediator"/>


14. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to respond to the response of the `publishMessage` operation as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/AddRespondMediator.png" title="Adding the respond mediator." width="900" alt="Adding the respond mediator."/>

## Export integration logic as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/PulsarProducer.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

1. Create a file called `data.json` with the following payload.
    ```json
    {
        "topic": "test-topic",
        "message": "Hello, Pulsar!",
        "key": "sample-key",
        "properties": {
            "message-type": "text/plain",
            "event-date": "2025-05-20"
        }
    }
    ```
2. Use the following `curl` command to invoke the API.
    ```bash
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/publishmessage
    ```
**Expected Response**:
You should get a 'success' response as below along with the messageId.
```
{
    "success": "true",
    "messageId": "141:0:-1"
}
``` 

## What's next

* To customize this example for your own scenario, see [Apache Pulsar Connector Reference]({{base_path}}/reference/connectors/pulsar-connector/pulsar-connector-reference/) documentation.
