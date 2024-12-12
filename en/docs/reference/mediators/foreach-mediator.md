# ForEach Mediator

The ForEach Mediator processes a collection, such as a JSON array or XML list derived from the message body or a defined variable, by splitting it into multiple messages, each corresponding to an item in the collection. The message in each iteration is flowing through the specified [mediation sequence]({{base_path}}/reference/mediation-sequences). After flowing through the mediation sequence, the sub-messages in each iteration are merged back to the corresponding original parent collection in the original message body or variable.

## Syntax

```
<foreach collection="expression" parallel-execution=(true | false) result-target=(string) result-type="JSON | XML" counter-variable=(string) >
    <sequence>
        (mediator)+
    </sequence>+
</foreach>
```

## Configuration

The parameters available to configure the ForEach mediator are as follows.

### General configurations

<table>
   <thead>
      <tr class="header">
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr class="odd">
         <td>
            <strong>Collection to Iterate</strong>
         </td>
         <td>
            This parameter specifies the collection to be processed by the ForEach mediator. You need to provide an expression that points to a collection within the message body or a variable. The collection can be extracted as follows depending on the content type.
            <ul>
               <li>
                  <strong>JSON</strong>
                  : <code>${payload.items}</code>
               </li>
               <li>
                  <strong>XML</strong>
                  : <code>${xpath('//data/list')}</code>
               </li>
               <li>
                  <strong>Variable</strong>
                  : <code>${var.myCollection}</code>
               </li>
            </ul>
         </td>
      </tr>
      <tr class="even">
         <td>
            <strong>Execute Parallel</strong>
         </td>
         <td>
            Specifies whether the messages should be processed in parallel.
            <ul>
               <li>
                  <strong>True</strong>
                  (default): Executes the messages in parallel.
               </li>
               <li>
                  <strong>False</strong>
                  : Executes the messages sequentially.
               </li>
            </ul>
         </td>
      </tr>
   </tbody>
</table>

### Output configurations

<table>
   <thead>
      <tr class="header">
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr class="odd">
         <td>
            <strong>Update Original Collection</strong>
         </td>
         <td>If enabled, the original list will be updated with the content. The content type should match the original collection type.</td>
      </tr>
      <tr class="even">
         <td>
            <strong>Variable Name</strong>
         </td>
         <td>
            The name of the variable where the new content will be saved. This parameter is required if <strong>Update Original Collection</strong> is disabled.
         </td>
      </tr>
      <tr class="odd">
         <td>
            <strong>Variable Type</strong>
         </td>
         <td>
            The type of the variable where the new content will be saved. Supported values:
            <ul>
               <li>
                  <strong>JSON</strong>
                  (default)
               </li>
               <li>
                  <strong>XML</strong>
               </li>
            </ul>
            This parameter is required if <strong>Update Original Collection</strong> is disabled.
         </td>
      </tr>
   </tbody>
</table>

### Advanced configurations

<table>
   <thead>
      <tr class="header">
         <th>Parameter Name</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr class="odd">
         <td>
            <strong>Counter Variable Name</strong>
         </td>
         <td>
            You can access the current iteration number using this variable within the sequence used in the ForEach mediator. This option is available only when
            <strong>Parallel Execution</strong> is disabled.
         </td>
      </tr>
   </tbody>
</table>

## Examples

### Example 1 - Iterating over an XML list derived from the message body and updating the original collection

```xml
<foreach collection="${xpath('//data/list')}" parallel-execution="true">
    <sequence>
        <payloadFactory media-type="xml">
            <format>
                <person xmlns="">
                    <surname>${xpath('//list/name/text()')}</surname>
                    <age>10</age>
                </person>
            </format>
        </payloadFactory>
        <call>
            <endpoint>
                <http method="post" uri-template="http://localhost:5454/api/transform" />
            </endpoint>
        </call>
    </sequence>
</foreach>
```

### Example 2 - Iterating over a JSON array derived from the message body and setting the new content to a variable

```xml
<foreach collection="${payload.data.list}" parallel-execution="true" result-target="processedList" result-type="JSON">
    <sequence>
        <log category="INFO">
            <message>Processing message : ${payload}</message>
        </log>
        <payloadFactory media-type="json">
            <format><![CDATA[{
                "_name": ${payload.name},
                "age": 5
                }]]>
                </format>
        </payloadFactory>
        <call>
            <endpoint>
                <http method="post" uri-template="http://localhost:5454/api/transform" />
            </endpoint>
        </call>
    </sequence>
</foreach>
```

### Example 2 - Iterating over a JSON array derived from a variable

```xml
<foreach collection="${var.list}" parallel-execution="true">
    <sequence>
        <log category="INFO">
            <message>Processing message : ${payload}</message>
        </log>
        <payloadFactory media-type="json">
            <format><![CDATA[{
                "_name": ${payload.name},
                "age": 5
                }]]>
                </format>
        </payloadFactory>
        <call>
            <endpoint>
                <http method="post" uri-template="http://localhost:5454/api/transform" />
            </endpoint>
        </call>
    </sequence>
</foreach>
```
