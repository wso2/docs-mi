# JMS Integration Sample

This sample demonstrates some of the capabilities in WSO2 MI for integrating with JMS brokers.

The sample includes the following components:

- REST API (OrderPaymentServiceAPI): This API receives HTTP requests with XML payloads and publishes them to the OrderPaymentQueue queue. The OUT_ONLY property in the mediation flow denotes one-way asynchronous invocation. Additionally, the client will receive a ‘202 Accepted’ response because the FORCE_SC_ACCEPTED property is set in the mediation flow.

- JMS Inbound Endpoint (OrderPaymentQueueInboundEP): This endpoint periodically polls XML messages from the OrderPaymentQueue. It consumes available messages in the queue and injects them into the sequence.

- Sequences (OrderPaymentQueueProcessSeq and OrderPaymentQueueErrorSeq): These sequences handle the processing and error scenarios related to the messages received from the queue. The OrderPaymentQueueProcessSeq logs the message, while the OrderPaymentQueueErrorSeq handles any errors encountered during processing.

- Endpoint (OrderPaymentQueueEP): This endpoint represents the JMS destination.

## Deploying the sample

1.  Open the sample by clicking on the **JMS Integration** card.
2.  Give a folder location to save the sample.
3.  Add the following config in `<MI_HOME>/conf/deployment.toml` file to enable JSM transport.

    ```toml
    [[transport.jms.sender]]
    name = "default"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.cache_level = "producer"

    [[transport.jms.listener]]
    name = "myQueueConnectionFactory"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    ```

4.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Start the activeMQ server by running the following command from the `<MI_HOME>/bin` directory. (This sample is tested with ActiveMQ 5.18.1)

    ```bash
    sh activemq.sh start
    ```

2. Open a terminal and run the following commands to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/orderpayment' \
    --header 'Content-Type: application/json' \
    --data '{
      "Payment": {
      "Id": "1",
      "Amount": "100"
      }
    }'
    ```

3. The enqueued and dequeued message count can be seen from [ActiveMQ Console](http://127.0.0.1:8161/admin/browse.jsp?JMSDestination=StudentQueue). Default value is ‘admin’ for both password and username.
4. You can see the following log in the VS Code terminal

    ```
   [2024-07-16 11:15:49,277]  INFO {LogMediator} - {inboundendpoint:OrderPaymentQueueInboundEP} To: , MessageID: ID:lahirumadu.local-60501-1721108740269-3:1:1:1:1, Direction: request, Payload: {
    "Payment": {
    "Id": "1",
    "Amount": "100"
    }
    }
    ```