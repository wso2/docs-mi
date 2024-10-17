# Service Orchestration

Service Orchestration is the process of exposing multiple fine-grained services using a single coarse-grained service. The service client will only have access to a single coarse-grained service, which encapsulates the multiple fine-grained services that are invoked in the process flow.
<!--
![service chaining]({{base_path}}/assets/img/integrate/use-cases-overview/service-chaining-new.png)
-->

There are two distinct types of service orchestration:

- Synchronous service orchestration
- Asynchronous service orchestration

In both the above orchestration approaches, the WSO2 Micro Integrator can interact with services using two different patterns (depending on the use case):

**Service chaining**

Multiple services that need to be orchestrated are invoked one after the other in a synchronous manner. The input to one service is dependant on the output of another service. Invocation of services and input-output mapping is handled by the service orchestration layer (which is the WSO2 Micro Integrator). 

**Parallel service invocations**

Multiple services are invoked simultaneously without any blocking until a response is received from another service.

<table>
	<tr>
		<td>
			<b>Tutorials</b></br>
			<ul>
				<li>
					<a href="{{base_path}}/learn/integration-tutorials/exposing-several-services-as-a-single-service">How to expose several services as a single service</a>.
				</li>
			</ul>
		</td>
	</tr>
</table>