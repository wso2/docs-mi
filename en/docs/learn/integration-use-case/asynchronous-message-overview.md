# Asynchronous Message Processing

Asynchronous messaging is a communication method wherein the system puts a message in a message queue and does not require an immediate response to continue processing. Asynchronous messaging is useful for the following:

- Delegate the request to some external system for processing
- Ensure delivery of a message to an external system
- Throttle message rates between two systems
- Batch processing of messages

Note the following about asynchronous message processing:

- Asynchronous messaging solves the problem of intermittent connectivity. The message receiving party does not need to be online to receive the message as the message is stored in a middle layer. This allows the receiver to retrieve the message when it comes online.
- Message consumers do not need to know about the message publishers. They can operate independently.

Disadvantages of asynchronous messaging includes the additional component of a message broker or transfer agent to ensure the message is received. This may affect both performance and reliability. There are various levels of message delivery reliability grantees from publisher to broker and from broker to subscriber. Wire level protocols like AMQP and MQTT can provide those.

<table>
	<tr>
		<td>
			<b>RabbitMQ Examples</b>
            <ul>
                <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/point-to-point-rabbitmq">How to implement Point to Point messaging using RabbitMQ</a></li>
                <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/pub-sub-rabbitmq">How to publish and subscribe with RabbitMQ</a></li>
                <li>Guaranteed Delivery 
                    <ul>
                        <li><a href="{{base_path}}/learn/integration-tutorials/storing-and-forwarding-messages">How to store and forward messages for guaranteed delivery</a></li>
                        <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/retry-delay-failed-msgs-rabbitmq">How to retry failed messages with a delay</a></li>
                        <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/requeue-msgs-with-errors-rabbitmq">How to requeue a message preserving the order</a></li>
                        <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/move-msgs-to-dlq-rabbitmq">How to publish unacked messages to Dead Letter Exchange</a></li>
                    </ul>
                </li>
                <li>
                	<a href="{{base_path}}/learn/examples/rabbitmq-examples/request-response-rabbitmq">How to implement Dual Channel scenario with RabbitMQ</a>
                </li>
            </ul>
		</td>
		<td>
			<b>JMS Examples</b>
			<ul>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/consuming-jms">How to consume JMS Messages</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/producing-jms">How to produce JMS Messages</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/consume-produce-jms">How to consume and produce JMS Messages</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/dual-channel-http-to-jms">How to implement JMS Synchronous Invocations - Dual Channel HTTP-to-JMS</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/quad-channel-jms-to-jms">How to implement JMS Synchronous Invocations - Quad Channel JMS-to-JMS</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/guaranteed-delivery-with-failover">How to implement a guaranteed delivery with failover</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/publish-subscribe-with-jms">How to publish and subscribe with JMS</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/shared-topic-subscription">How to implement Shared Topic Subscription Scenario with JMS</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/detecting-repeatedly-redelivered-messages">How to detect Repeatedly Redelivered Messages</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/jms-examples/specifying-a-delivery-delay-on-messages">How to specify Delivery Delay on Messages</a>
				</li>
			</ul>
		</td>
	</tr>
</table>