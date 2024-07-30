# RabbitMQ Integration Sample

This sample demonstrates integration with RabbitMQ over the AMQP protocol.

The sample includes the following components:

-  Proxy Service (`SalesOrderAddService`): This service acts as an intermediary. When it receives an HTTP request with an XML payload, it publishes the payload to the AMQP queue.
-  RabbitMQ Inbound Endpoint (`SalesOrderQueueInboundEP`): This endpoint periodically polls XML messages from the SalesOrderQueue. It consumes available messages in the queue and injects them into the sequence.
-  Sequences (`SalesOrderQueueProcessSeq` and `SalesOrderQueueErrorSeq`): These sequences handle the processing and error scenarios related to the messages received from the queue. The SalesOrderQueueProcessSeq logs the message, while the SalesOrderQueueErrorSeq handles any errors encountered during processing.
-  Endpoint (`SalesOrderQueueEP`): This endpoint represents the AMQP destination.

When the client invokes the proxy service, it triggers a one-way asynchronous invocation (denoted by the OUT_ONLY property in the mediation flow). Additionally, the client will receive a ‘202 Accepted’ response because the FORCE_SC_ACCEPTED property is set in the mediation flow.

## Deploying the sample

1.  Open the sample by clicking on the **RabbitMQ Integration** card.
2.  Give a folder location to save the sample.
3.  Change the RabbitMQ user-name, password, hostname and port in `SalesOrderQueueEP` and `SalesOrderQueueInboundEP` to match your environment.
4.  Add the following config in `<MI_HOME>/conf/deployment.toml` file to enable RabbitMQ transport.

    ```toml
    [transport.rabbitmq]
    sender_enable = true
    ```

5.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Start the RabbitMQ server.

2. Open a terminal and run the following commands to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/services/SalesOrderAddService' \
    --header 'Content-Type: application/xml' \
    --data '<Orders>
      <Order>
        <Id>1</Id>
        <Price>100</Price>
      </Order>
    </Orders>'
    ```

3. The enqueued and dequeued message count can be seen from [RabbitMQ Console](http://localhost:15672/#/queues/%2F/SalesOrderQueue).
4. You can see the following log in the VS Code terminal

    ```
    [2024-07-16 14:37:41,941]  INFO {LogMediator} - {inboundendpoint:SalesOrderQueueInboundEP} To: , MessageID: 24624ff9-e903-427a-a20f-b7c513f82f0f, Direction: request, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><Orders>
    <Order>
    <Id>1</Id>
    <Price>100</Price>
    </Order>
    </Orders></soapenv:Body></soapenv:Envelope>
    ```