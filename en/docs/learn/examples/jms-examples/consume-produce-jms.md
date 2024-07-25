# Consuming and Producing JMS Messages

This section describes how to configure WSO2 Micro Integrator to work as a JMS-to-JMS proxy service. In this example, the Micro Integrator listens to a JMS queue, consumes messages, and then sends those messages to another JMS queue.

## Synapse configuration

Given below is the synapse configuration of the proxy service that mediates the above use case. See the instructions on how to [build and run](#build-and-run) this example.

```xml
<proxy name="StockQuoteProxy" startOnLoad="true" transports="jms" xmlns="http://ws.apache.org/ns/synapse">
    <target>
		<inSequence>
			<log category="INFO" level="full"/>
			<respond/>
		</inSequence>
	</target>
	<parameter name="transport.jms.ConnectionFactory">myQueueConnectionFactory</parameter>
	<parameter name="transport.jms.ReplyDestination">ResponseQueue</parameter>
</proxy>
```

The Synapse artifacts used are explained below.

<table>
    <tr>
        <th>Artifact Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
            Proxy Service
        </td>
        <td>
            A proxy service is used to receive messages and to define the message flow. In the sample configuration above, the 'transports' property is set to 'jms', which allows the ESB to receive JMS messages. This proxy <b>StockQuoteProxy</b> listens to the 'StockQuoteProxy' queue and sends the messages it receives to another queue named 'ResponseQueue'
        </td>
    </tr>
    <tr>
        <td>Respond Mediator</td>
        <td>
            The Respond Mediator stops the processing on the current message and sends the message back to the client as a response. In this scenario, Declaring the <code>transport.jms.ReplyDestination</code> parameter with the value 'ResponseQueue' ensures that responses are directed to and received by the 'ResponseQueue'.

        </td>
    </tr>
</table>

!!! Info
    Make sure to configure the relevant JMS listener parameters in the `deployment.toml` file.
    ```
    [[transport.jms.listener]]
    name = "myQueueConnectionFactory"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    ```
    To refer details on JMS transport parameters, you can follow [JMS transport parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters) used in the Micro Integrator.

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create the proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the broker:

1.  [Configure a broker]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-jms-transport) with your Micro Integrator instance. Let's use Active MQ for this example.
2.  Start the broker.
3.  Start the Micro Integrator (after starting the broker).

You now have a running WSO2 Micro Integrator instance and an ActiveMQ instance to simulate the sample scenario.
Add a message to the `StockQuoteProxy` queue using the [ActiveMQ Web Console](https://activemq.apache.org/web-console.html). You will see the same message published to the `ResponseQueue`.