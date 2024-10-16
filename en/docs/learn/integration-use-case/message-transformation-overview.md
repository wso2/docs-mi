# Message Transformation

The integration of systems that communicate in various message formats is a common business case in enterprise integration. WSO2 Micro Integrator facilitates this use case as the intermediary system bridging the communication gap among the systems.

For example, consider a service that returns data in XML format and a mobile client that accepts messages only in JSON format. To allow these two systems to communicate, the intermediary system needs to convert message formats during the communication. This allows the systems to communicate with each other without depending on the message formats supported by each system.

The following image depicts a typical message transformation scenario using the Transform mediator.

<img src="{{base_path}}/assets/img/integrate/use-cases-overview/message-transformation.png" title="Message Transformation" width="600" alt="Message Transformation"/>

<table>
	<tr>
		<td>
			<b>Tutorials</b></br>
			<ul>
				<li>
                    <a href="{{base_path}}/learn/integration-tutorials/transforming-message-content">How to transform message content</a>.
				</li>
                <li>
                    <a href="{{base_path}}/learn/examples/message-transformation-examples/json-to-soap-conversion">How to transform a JSON message to SOAP</a>.
				</li>
                <li>
                    <a href="{{base_path}}/learn/examples/message-transformation-examples/pox-to-json-conversion">How to translate a POX message to JSON</a>.
				</li>
			</ul>
		</td>
	</tr>
</table>