# Apache Pulsar Inbound Endpoint Example

The Apache Pulsar Inbound Endpoint allows you to connect to Apache Pulsar server and consume messages from specified topics. The messages are then injected into the mediation engine for further processing and mediation.

## What you’ll build

By following this tutorial, you will gain hands-on experience in:

- Configuring the Apache Pulsar Inbound Endpoint in WSO2 Micro Integrator using the Visual Studio Code extension.
- Consuming and processing messages from a Pulsar topic.
- Run and test the integration to receive real-time notifications.

The inbound endpoint acts as a message receiver and injects those messages into an integration sequence. In this section, we will demonstrate how to configure the inbound endpoint to establish a secure connection with the Apache Pulsar server using **TLS encryption** and **JWT-based authentication**. In this example, we will simply log the message, but you can extend this to perform any complex mediation logic using [WSO2 Micro Integrator mediators]({{base_path}}/reference/mediators/about-mediators/).

## Prerequisites 

### Setup Apache Pulsar

To connect with Apache Pulsar using the WSO2 Micro Integrator Apache Pulsar Connector, you need to first set up a running Pulsar instance locally or on a server. In this example, we will use an Apache Pulsar standalone server. Set up Apache Pulsar by following the instructions in [Set up Apache Pulsar]({{base_path}}/reference/connectors/pulsar-connector/pulsar-connector-setup/).

## Configure Inbound Endpoint

1. Follow the steps in [create Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up your project.

2. Create a sequence to process the message. In this example, we will just log the message for simplicity, but in a real-world use case, this can be any message mediation.

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="successSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
            <log category="INFO" logMessageID="false" logFullPayload="false">
                <message>${payload}</message>
                <property name="TopicNames" expression="${properties.synapse.topicNames}"/>
                <property name="MessageID" expression="${properties.synapse.messageId}"/>
                <property name="Key" expression="${properties.synapse.key}"/>
                <property name="RedeliveryCount" expression="${properties.synapse.redeliveryCount}"/>
            </log>
      </sequence> 
      ```

2. Then, go to the **Add Artifact** section and select **Event Integration**.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar-inbound/AddEventIntegration.png" title="Add an Event Integration" width="800" alt="Add an Event Integration"/>

3. Create an **Apache Pulsar Inbound Endpoint**.

    <img src="{{base_path}}/assets/img/integrate/connectors/pulsar-inbound/AddPulsarInboundEndpoint.png" title="Create Pulsar Inbound Endpoint" width="800" alt="Create Pulsar Inbound Endpoint"/>

4. Fill in the form with the following values and click on `create`.

      * **Inbound Functional:**
        * **Event Integration Name**: `ApachePulsarInboundEP`
        * **Injecting Sequence Name**: `successSeq`
        * **Error Sequence Name**: `errorSeq`
        * **Polling Interval**: `1000`
        * **Coordination**: `true`
      * **Pulsar Connection:**
        * **Enable TLS Encryption**: `true`
        * **Broker URL**: `pulsar+ssl://localhost:6651/`
        * **Allow Insecure TLS Connection**: `false`
        * **Use KeyStore TLS**: `false`
        * **Broker CA Certificate Path**: absolute path to the CA certificate file (e.g., `/path/to/ca.cert.pem`)
        * **Authentication Type**: `JWT`
        * **JWT Token**: the JWT token generated from the Pulsar server (e.g., `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY`)
      * **Consumer:**
         * **Topic(s)**: `persistent://public/default/baa`
         * **Subscription Name**: `mySubscription`
         * **Subscription Type**: `Exclusive`
         * **Subscription Initial Position**: `Latest`
         * **Message Content Type**: `application/json`
         * **Message Wait Timeout (in milliseconds)**: `3000`
         * **Processing Mode**: `sync`

    The source view of the created inbound endpoint is shown below.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="ApachePulsarInboundEP" class="org.wso2.integration.inbound.PulsarMessageConsumer" 
    sequence="successSeq" onError="errorSeq" suspend="false">
        <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="interval">1000</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="useTLS">true</parameter>
            <parameter name="serviceUrl">pulsar+ssl://localhost:6651/</parameter>
            <parameter name="useKeyStoreTls">false</parameter>
            <parameter name="tlsTrustCertsFilePath">/path/to/ca.cert.pem</parameter>
            <parameter name="authenticationType">JWT</parameter>
            <parameter name="jwtToken">eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY</parameter>
            <parameter name="topicNames">persistent://public/default/baa</parameter>
            <parameter name="subscriptionName">mySubscription</parameter>
            <parameter name="subscriptionType">Exclusive</parameter>
            <parameter name="subscriptionTopicsMode">PersistentOnly</parameter>
            <parameter name="subscriptionInitialPosition">Latest</parameter>
            <parameter name="contentType">application/json</parameter>
            <parameter name="messageWaitTimeout">3000</parameter>
            <parameter name="processingMode">Sync</parameter>
            <parameter name="dlqMaxRedeliverCount">5</parameter>
            <parameter name="batchReceiveEnabled">false</parameter>
        </parameters>
    </inboundEndpoint>
    ```      

## Export integration logic as a CApp

Follow the steps in the [Build and Export the Carbon Application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide to build and export the CApp to a specified location.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/ApachePulsarProducerAndConsumer.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Run the Integration

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide or simply use the **Run** button in the Visual Studio Code extension to run the integration.

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce-inbound/deploy-run.png" title="Deploy and Run the Integration" width="500" alt="Deploy and Run the Integration"/>

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).


## Testing the Integration

You can manually publish messages to Apache Pulsar using the pulsar-client CLI tool, as described in the [official Apache Pulsar documentation](https://pulsar.apache.org/docs/next/tutorials-produce-consume/).

Alternatively, you can use the [Apache Pulsar Connector example]({{base_path}}/reference/connectors/pulsar-connector/pulsar-connector-example) to insert data programmatically. In this example, we will use the WSO2 MI Apache Pulsar connector to insert data into the Pulsar topic.

1. Save the following payload as `data.json`:

   ```json
   {
        "topic": "persistent://public/default/baa",
        "message": "{\"Hello\": \"Pulsar\"}",
        "key": "sample-key",
        "properties": {
            "message-type": "json",
            "event-date": "2025-05-20"
        }
    }
   ```

2. Invoke the API using the following `curl` command:

   ```
   curl -X POST -d @data.json http://localhost:8290/publishmessage --header "Content-Type:application/json"
   ```

#### Expected Output

After inserting a record, you should see a log entry in the WSO2 Micro Integrator console similar to the following:

   ```
   TopicNames = persistent://public/default/baa, MessageID = 212:12:-1, Key = sample-key, RedeliveryCount = 0, MessageProperties = [{"event-date":"2025-05-20"},{"message-type":"json"}], Payload = {"Hello":"Pulsar"}
   ```
