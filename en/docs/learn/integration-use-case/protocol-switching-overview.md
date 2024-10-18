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
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-jms-to-http">How to switch from JMS to HTTP/S</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-https-to-jms">How to switch from HTTP/S to JMS</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-ftp-listener-to-mail-sender">How to switch from FTP Listener to Mail Sender</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-http-to-fix">How to switch from HTTP to FIX</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-fix-to-http">How to switch from FIX to HTTP</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-fix-to-amqp">How to switch from FIX to AMQP</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-between-fix-versions">How to switch between FIX Versions</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-tcp-to-https">How to switch from TCP to HTTP/S</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-from-udp-to-https">How to switch from UDP to HTTP/S</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/protocol-switching/switching-between-http-and-msmq">How to switch between HTTP to MSMQ</a>
				</li>
			</ul>
		</td>
	</tr>
</table>