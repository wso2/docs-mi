# How to Implement Point to Point Messaging Using RabbitMQ

This example demonstrates how WSO2 Micro Integrator can be used to implement an asynchronous point-to-point messaging scenario using queues in a RabbitMQ broker instance.

As shown below, a proxy service configured in the Micro Integrator sends messages to the RabbitMQ queue, which are then consumed by another proxy service in the Micro Integrator.

<img src="{{base_path}}/assets/img/integrate/rabbitmq/rabbitmq-point-to-point.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

=== "RabbitMQ Consumer"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="QueueConsumer" transports="rabbitmq" startOnLoad="true">
      <description/>
      <target>
          <inSequence>
              <log level="custom">
                   <property name="Message Received" expression="//Message"/>
              </log>
          </inSequence>
      </target>
      <parameter name="rabbitmq.queue.name">queue1</parameter>
      <parameter name="rabbitmq.connection.factory">AMQPConnectionFactory</parameter>
      <parameter name="rabbitmq.message.content.type">application/xml</parameter>
    </proxy>
    ```
=== "RabbitMQ Producer"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy xmlns="http://ws.apache.org/ns/synapse"
        name="QueueProducer"
        transports="http https"
        startOnLoad="true">
       <description/>
       <target>
        <inSequence>
          <property name="OUT_ONLY" value="true"/>
          <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
          <send>
              <endpoint>
                <address uri="rabbitmq:/queue1?rabbitmq.server.host.name=localhost&amp;rabbitmq.server.port=5672&amp;rabbitmq.server.user.name=guest&amp;rabbitmq.server.password=guest"/>
              </endpoint>
          </send>
        </inSequence>
      </target>
    </proxy>
    ```
    
## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. Enable the RabbitMQ sender and receiver in the Micro-Integrator from the deployment.toml. Refer the 
 [configuring RabbitMQ documentation]({{base_path}}/install-and-setup/setup/brokers/configure-with-rabbitmq) for more information.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.
6. Make sure you have a RabbitMQ broker instance running.
7. Configure a queue named `queue1` with required exchanges and routing keys.
8. Send the following payload to the RabbitMQ publisher proxy (QueueProducer).

    ```xml
    <Message>
    <Name>John Doe</Name>
    <Age>27</Age>
    </Message>
    ```
