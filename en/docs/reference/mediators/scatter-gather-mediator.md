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

### Output Configurations

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
         <td><strong>Expression</strong></td>
         <td>
            Defines the expression specifying which data should be aggregated from each message. If clone sequences result in XML, you need to use an XPath synapse expression like <code>${xpath('//data/user')}</code> instead of <code>${payload.user}</code>. By default, the whole body will be aggregated.
         </td>
      </tr>
      <tr class="odd">
         <td><strong>Result Enclosing Element Name</strong></td>
         <td>Specifies the name of the root element wrapping the aggregation result. Applicable only when <strong>Content Type</strong> is XML.</td>
      </tr>
      <tr class="even">
         <td><strong>Save Result to</strong></td>
         <td>
            Determines where the aggregated result will be stored. 
            <ul>
               <li><strong>Body</strong>: Note that this will replace the existing message body with the aggregated result. (Default)</li>
               <li><strong>Variable</strong>: Saves the result to a variable defined under <strong>Variable Name</strong> parameter.</li>
            </ul>
         </td>
      </tr>
      <tr class="even">
         <td><strong>Variable Name</strong></td>
         <td>The name of the variable where the aggregated result is saved. Applicable only when <strong>Save Result to</strong> is Variable.</td>
      </tr>
   </tbody>
</table>

### Aggregation Configurations

<table>
   <thead>
      <tr>
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><strong>Condition</strong></td>
         <td>An optional expression defining a condition that determines when the messages should be aggregated.</td>
      </tr>
      <tr>
         <td><strong>Timeout</strong></td>
         <td>The maximum time (in milliseconds) to wait for messages to complete aggregation.</td>
      </tr>
      <tr>
         <td><strong>Minimum Messages</strong></td>
         <td>The minimum number of messages required before aggregation can proceed.</td>
      </tr>
      <tr>
         <td><strong>Maximum Messages</strong></td>
         <td>The maximum number of messages processed for aggregation.</td>
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
