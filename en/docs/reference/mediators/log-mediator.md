# Log Mediator

The **Log mediator** enables the logging of messages as they flow through mediation sequences. It helps in debugging and tracking messages by printing message content, properties, and other relevant information to the console or a log file. It can be added at any point in the flow.

For more information on logging, see [Monitoring Logs]({{base_path}}/observe-and-manage/classic-observability-logs/monitoring-logs/).

## Syntax

```xml
<log [category="INFO|TRACE|DEBUG|WARN|ERROR|FATAL"] [level="custom|full|simple|headers"] [separator="string"]>
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
<td><strong>Category</strong></td>
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
<td>
<p><strong>Level</strong></p>
</td>
<td>
<p>This parameter is used to specify the log level. The possible values are as follows.</p>
<ul>
<li><strong>Custom</strong> : If this is selected, only the properties added to the Log mediator configuration will be logged.</li>
<li><strong>Full</strong> : If this is selected, all the standard headers logged at the <strong>Simple</strong> level as well as the full payload of the message will be logged. This log level causes the message content to be parsed and hence incurs a performance overhead.</li>
<li><strong>Simple</strong> : If this is selected, the standard headers (such as <code>To</code>, <code>From</code>, <code>WSAction</code>, <code>SOAPAction</code>, <code>ReplyTo</code>, and <code>MessageID</code>) will be logged.</li>
<li><strong>Headers</strong> : If this is selected, all the SOAP header blocks will be logged.</li>
</ul>
<p>The properties included in the Log mediator configuration will be logged regardless of the log level selected.</p>
</td>
</tr>
<tr class="odd">
<td><strong>Separator</strong></td>
<td>
<p>This parameter specifies the value used to separate attributes in the log. By default, the separator is a comma (<code>,</code>).</p></td>
</tr>
</tbody>
</table>

You can add properties inside the Log mediator to log additional information. The parameters available to configure a property are as follows:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Property Name</strong></td>
<td>The name of the property to be logged.</td>
</tr>
<tr class="odd">
<td><strong>Value/Expression</strong></td>
<td><p>Based on the use case you can select either value or expression.</p>
<ul>
<li><strong>Value</strong>: If this is selected, a static value would be considered as the property value and this value should be entered in the <strong>Value/Expression</strong> parameter.</li>
<li><p><strong>Expression</strong>: If this is selected, the property value will be determined during the runtime by evaluating an expression. You can refer to <a href="{{base_path}}/reference/synapse-properties/expressions">Expressions</a>.</p></li>
</ul></td>
</tr>
</tbody>
</table>

## Examples

### Use full log

In this example, everything is logged including the complete message.

```xml
<log category="INFO" level="full"/>
```

A sample log output:
```xml
[2024-09-09 15:23:03,998]  INFO {LogMediator} - {api:StockQuoteAPI} To: /stockQuote/getQuote, MessageID: urn:uuid:1f871a99-c7cc-4497-a767-945e4d5fd2c8, correlation_id: 1f871a99-c7cc-4497-a767-945e4d5fd2c8, Direction: request, Payload: { "symbol" : "IBM"}
```

### Use custom logs

In this example, the log level is `custom`. A property
with an XPath expression which is used to get a stock price from a
message is included. This results in logging the stock price which is a
dynamic value.

```xml 
<log category="INFO" level="custom">
   <property name="text" expression="fn:concat('Stock price - ',get-property('stock_price'))"/>
</log>
```
A sample log output:
```xml
[2024-09-09 15:25:20,891]  INFO {LogMediator} - {api:StockQuoteAPI} text = Stock price - 125.00
```