# Periodic Execution of Integration Processes

Executing an integration process at a specified time is another common requirement in enterprise integration. For example, in an organization, there can be a need for running an integration process to synchronize two systems every day at the day end.  

In Micro Integrator, execution of a message mediation process can be automated to run periodically by using a 'Scheduled task'. You can schedule a task to run in the time interval of 't' for 'n' number of times or to run once the Micro Integrator starts. 

Furthermore, you can use cron expressions for more advanced executing time configuration.

<table>
	<tr>
		<td>
			<b>Examples</b></br>
			<ul>
                <li>
					<a href="{{base_path}}/learn/integration-tutorials/using-scheduled-tasks">How to periodically execute integration processes</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/scheduled-tasks/task-scheduling-simple-trigger">How to schedule tasks using a simple trigger</a>
				</li>
				<li>
					<a href="{{base_path}}/learn/examples/scheduled-tasks/injecting-messages-to-rest-endpoint">How to inject messages to a RESTful endpoint</a>
				</li>
			</ul>
		</td>
	</tr>
</table>
