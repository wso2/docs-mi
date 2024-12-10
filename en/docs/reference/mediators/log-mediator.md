# Log Mediator

The **Log mediator** enables the logging of messages as they flow through mediation sequences. It helps in debugging and tracking messages by printing message content, variables, properties, and other relevant information to the console or a log file. It can be added at any point in the flow.

For more information on logging, see [Monitoring Logs]({{base_path}}/observe-and-manage/classic-observability-logs/monitoring-logs/).

## Syntax

```xml
<log [category="INFO|TRACE|DEBUG|WARN|ERROR|FATAL"] [separator="string"]>
   <message></message>
   <property name="string" (value="string" | expression="expression")/>+
</log>
```

## Configuration

The parameters available to configure the Log mediator are as
follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Log Category</strong></td>
<td><p>This parameter is used to specify the log category. The following log levels correspond to the Micro Integrator service level logs.</p>
<ul>
<li><strong>INFO</strong> - provides informational messages that highlight the progress of the application at a coarse-grained level.</li>
<li><strong>TRACE</strong> - provides fine-grained informational events than the DEBUG level.</li>
<li><strong>DEBUG</strong> - provides fine-grained informational events that are most useful to debug an application.</li>
<li><strong>WARN</strong> - provides informational messages on potentially harmful situations.</li>
<li><strong>ERROR</strong> - provides error events that might still allow the application to continue running.</li>
<li><p><strong>FATAL</strong> - provides very severe error events that will presumably lead the application to abort.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><strong>Message</strong></td>
<td>
<p>This parameter is used to define a log message. You can embed <a href="{{base_path}}/reference/synapse-properties/synapse-expressions">Synapse Expressions</a> in the template to generate the log message.</p></td>
</tr>
</tbody>
</table>

You can use the <code>Additional Parameters</code> section to log additional information. The configurations available under <code>Additional Parameters</code> section of the Log mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Parameters</strong></td>
<td><p>This is used to specify the key value pairs to be logged. You can use the <code>Add Paramter</code> option to add a new parameter.
<ul>
<li><strong>Name</strong> - The name of the parameter to be logged.</li>
<li><strong>Value</strong> - Based on the use case you can either have a static value or an <a href="{{base_path}}/reference/synapse-properties/synapse-expressions">expression</a>.</li>
</ul></p></td>
</tr>
<tr class="even">
<td><strong>Parameter Separator</strong></td>
<td>
<p>This parameter specifies the value used to separate parameters in the log. By default, the separator is a comma (<code>,</code>).</p></td>
</tr>
</tbody>
</table>

## Examples

### Using a message template

In this example, we define a message template using [Synapse Expressions]({{base_path}}/reference/synapse-properties/synapse-expressions).

```xml
<log category="INFO">
   <message>Processing user details : ${payload.user} with Purchase data : ${var.purchaseDetails}</message>
</log>
```

A sample log output:
```xml
[2024-09-09 15:23:03,998]  INFO {LogMediator} - {api:StockQuoteAPI} Processing user details : {"firstName":"Johne", "lastName": "Doe"} with Purchase data : {"itemCode": 8987, "price": 45}
```

### Using parameters in addition to message template

In this example, we define parameters in addition to the message.

```xml 
<log category="INFO">
   <message>Processing user details : ${payload.user} with Purchase data : ${var.purchaseDetails}</message>
   <property name="endpoint" expression="${var.endpointName}"/>
</log>
```
A sample log output:
```xml
[2024-09-09 15:23:03,998]  INFO {LogMediator} - {api:StockQuoteAPI} Processing user details : {"firstName":"Johne", "lastName": "Doe"} with Purchase data : {"itemCode": 8987, "price": 45}, endpoint = PurchaseEP
```
