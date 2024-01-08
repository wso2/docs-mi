# Protocol Switching

The Micro Integrator offers a wide range of integration capabilities from simple message routing to complicated systems that use integrated solutions. Different applications typically use different protocols for communication. Therefore, for two systems to successfully communicate, it is necessary to switch the protocol (that passes from one system) to the protocol compatible with the receiving application.
<!--
![protocol switching]({{base_path}}/assets/img/integrate/use-cases-overview/protocol-switching-new.png)
-->

For example, messages that are received via HTTP may need to be sent to a JMS queue. Further, you can couple the protocol switching feature with the message transformation feature to handle use cases where the content of messages received via one protocol (such as HTTP) are first processed, and then sent out in a completely different message format and protocol.

<table>
	<tr>
		<td>
			<b>Examples</b>
			<ul>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-jms-to-http">Switching from JMS to HTTP/S</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-https-to-jms">Switching from HTTP/S to JMS</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-ftp-listener-to-mail-sender">Switching from FTP Listener to Mail Sender</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-http-to-fix">Switching from HTTP to FIX</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-fix-to-http">Switching from FIX to HTTP</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-fix-to-amqp">Switching from FIX to AMQP</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-between-fix-versions">Switching between FIX Versions</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-tcp-to-https">Switching from TCP to HTTP/S</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-udp-to-https">Switching from UDP to HTTP/S</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-between-http-and-msmq">Switching between HTTP to MSMQ</a>
				</li>
			</ul>
		</td>
	</tr>
</table>