# Scatter Gather Mediator

The **Scatter Gather Mediator** can be used to clone a message into several messages and aggregate the responses. It resembles the [Scatter-Gather enterprise integration pattern]({{base_path}}/learn/enterprise-integration-patterns/message-routing/scatter-gather/).

## Syntax

```xml
<scatter-gather parallel-execution=(true | false) target=(Body | Variable) target-variable=(string) result-content-type=(JSON | XML) result-enclosing-element=(string)>
    <aggregation expression="expression" condition="expression" timeout="long" min-messages="expression" max-messages="expression"/>
        <sequence>
        (mediator)+
        </sequence>+
</scatter-gather>
```
## Configuration

The parameters available to configure the Scatter Gather mediator are as follows.

### General Configurations

<table>
   <thead>
      <tr class="header">
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr class="odd">
         <td><strong>Parallel Execution</strong></td>
         <td>
            Specifies whether the sequences should execute in parallel or sequentially. 
            <ul>
               <li><strong>True</strong>: Executes the sequences in parallel. (Default)</li>
               <li><strong>False</strong>: Executes the sequences sequentially.</li>
            </ul>
         </td>
      </tr>
   </tbody>
</table>

### Aggregate Configurations

<table>
   <thead>
      <tr>
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr class="odd">
         <td><strong>Content Type</strong></td>
         <td>
            Specifies the format of the aggregated result. Supported values:
            <ul>
               <li><strong>JSON</strong>: Aggregates results in JSON format. (Default)</li>
               <li><strong>XML</strong>: Aggregates results in XML format.</li>
            </ul>
         </td>
      </tr>
      <tr class="even">
         <td><strong>Result Enclosing Element Name</strong></td>
         <td>Specifies the name of the root element wrapping the aggregation result. Applicable only when <strong>Content Type</strong> is XML.</td>
      </tr>
      <tr class="odd">
         <td><strong>Aggregate Entire Payloads</strong></td>
         <td>
            By default, the entire message payload is aggregated across all flows. If you prefer to aggregate only specific parts of the payload, disable this option and specify the required portions using an expression.
         </td>
      </tr>
      <tr class="even">
         <td><strong>Partial payload to Aggregate</strong></td>
         <td>
            Specifies the expression that defines which part of the message payload should be aggregated.
            This parameter is applicable only when <strong>Aggregate Entire Payloads</strong> is disabled.
         </td>
      </tr>
      <tr class="odd">
         <td><strong>Filter Messages for Aggregation</strong></td>
         <td>
            By default, all messages are aggregated. Enable this option to filter messages based on a specified condition before aggregation.
         </td>
      </tr>
      <tr class="even">
         <td><strong>Condition</strong></td>
         <td>
            Defines the condition used to filter which responses should be included in the final aggregation.
            To prevent indefinite waiting, either a <strong>Completion Timeout</strong> or a <strong>Minimum flows to complete</strong> value must be configured under <a href="{{base_path}}/reference/mediators/scatter-gather-mediator/#advanced-configurations">Advanced configurations</a>.
         </td>
      </tr>
   </tbody>
</table>

### Advanced Configurations

<table>
   <thead>
      <tr>
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><strong>Completion Timeout</strong></td>
         <td>
            Specifies the maximum duration (in milliseconds) to wait for flows to complete aggregation before timing out.
         </td>
      </tr>
      <tr>
         <td><strong>Minimum flows to complete</strong></td>
         <td>
            Specifies the minimum number of flows that must be completed before aggregation can proceed.
         </td>
      </tr>
      <tr>
         <td><strong>Maximum flows to complete</strong></td>
         <td>
            Specifies the maximum number of flows that should be processed for aggregation.
         </td>
      </tr>
   </tbody>
</table>

### Output Configurations

<table>
   <thead>
      <tr>
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><strong>Overwrite Message Body</strong></td>
         <td>
            By default, replaces the message body with the aggregated response from the Scatter Gather mediator.
            You can disable this option and specify a variable name to store the aggregated response instead.
         </td>
      </tr>
      <tr>
         <td><strong>Output Variable Name</strong></td>
         <td>
            Specifies the variable name to store the output of the Scatter Gather mediator.
            This is applicable only when <strong>Overwrite Message Body</strong> is disabled.
         </td>
      </tr>
   </tbody>
</table>

## Example

In this example, the Scatter Gather mediator execute the sequences parallelly and replace the message body with the aggregated JSON result.

```xml
<scatter-gather parallel-execution="true" target="Body" result-content-type="JSON">
   <aggregation expression="${payload}" />
   <sequence>
      <log category="INFO">
         <message>Processing message in clone path 1</message>
      </log>
      <payloadFactory media-type="json" template-type="default">
         <format>{
                "requestId": ${payload.requestId},
                "pet": {
                "name": "pet2",
                "type": "cat"
                },
                "status": true
                }</format>
      </payloadFactory>
   </sequence>
   <sequence>
      <log category="INFO">
         <message>Processing message in clone path 2</message>
      </log>
      <call> 
         <endpoint>
            <http method="post" uri-template="http://localhost:5454/api/pet"/>
         </endpoint>
      </call>
   </sequence>
</scatter-gather>
```

In this example, the Scatter Gather work in sequential mode and save the aggregated XML result to a variable named <code>servicesResult</code>.

```xml
<scatter-gather parallel-execution="false" target="Variable" target-variable="servicesResult" result-content-type="XML" result-enclosing-element="AggregatedResults">
   <aggregation expression="xpath('$body/node()')" />
   <sequence>
      <log category="INFO">
         <message>Processing message in clone path 1</message>
      </log>
      <call>
         <endpoint>
            <address uri="http://service1.example.com" />
         </endpoint>
      </call>
   </sequence>
   <sequence>
      <log category="INFO">
         <message>Processing message in clone path 2</message>
      </log>
      <call>
         <endpoint>
            <address uri="http://service2.example.com" />
         </endpoint>
      </call>
   </sequence>
</scatter-gather>
```
