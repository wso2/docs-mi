# How to Requeue a Message Preserving the Order

This sample demonstrates how WSO2 Micro Integrator can ensure guaranteed delivery of messages by requeueing messages when an error occurs during delivery. That is, the Micro Integrator can be configured to requeue messages to a RabbitMQ queue when the delivery fails. 

As shown in the following example, the Micro Integrator first consumes the request message from the RabbitMQ queue and sends it to the back-end HTTP endpoint. If the HTTP endpoint becomes unavailable, the message will be returned
to the `student-registration` queue in the RabbitMQ broker until the endpoint becomes available again.

<img src="{{base_path}}/assets/img/integrate/rabbitmq/rabbitmq-requeue-messages.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example.

```xml
<proxy xmlns="http://ws.apache.org/ns/synapse"
       name="StudentRegistrationService"
       transports="rabbitmq"
       startOnLoad="true">
   <description/>
   <target>
      <inSequence>
         <log level="custom">
            <property name="Message Received" expression="$body"/>
         </log>
         <call blocking="true">
            <endpoint>
               <http uri-template="http://localhost:8290/students"/>
            </endpoint>
         </call>
         <log level="custom">
            <property name="Status" value="The message process successfully"/>
         </log>
      </inSequence>
      <faultSequence>
         <log level="custom">
            <property name="Status" value="Could not process the message"/>
         </log>
         <property name="SET_REQUEUE_ON_ROLLBACK" value="true" scope="axis2"/>
      </faultSequence>
   </target>
   <parameter name="rabbitmq.queue.auto.ack">false</parameter>
   <parameter name="rabbitmq.channel.consumer.qos">1</parameter>
   <parameter name="rabbitmq.message.requeue.delay">30000</parameter>
   <parameter name="rabbitmq.queue.name">student-registration</parameter>
   <parameter name="rabbitmq.connection.factory">AMQPConnectionFactory</parameter>
   <parameter name="rabbitmq.message.content.type">application/xml</parameter>
</proxy>
```

## Build and run

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. Enable the RabbitMQ sender and receiver in the Micro-Integrator from the deployment.toml. Refer the 
 [configuring RabbitMQ documentation]({{base_path}}/install-and-setup/setup/brokers/configure-with-rabbitmq) for more information.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.
6. Make the `http://localhost:8290/students` endpoint unavailable temporarily. 
7. Make sure you have a RabbitMQ broker instance running.
8. Publish a message to the `student-registration` queue.
