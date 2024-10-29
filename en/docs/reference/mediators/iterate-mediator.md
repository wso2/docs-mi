# Iterate Mediator

The Iterate Mediator implements the [Splitter enterprise integration pattern]({{base_path}}/learn/enterprise-integration-patterns/message-routing/splitter/) and splits the message into several different messages derived from the parent message.

!!! Info
    The Iterate mediator is similar to the [Clone mediator]({{base_path}}/reference/mediators/clone-mediator). The difference between the two mediators is, that the Iterate mediator splits a message into different parts, whereas the Clone mediator makes multiple identical copies of the message.

!!! Info
    Iterate Mediator is quite similar to the [ForEach mediator]({{base_path}}/reference/mediators/foreach-mediator). You can use complex expressions to conditionally select elements to iterate over in both mediators. Following are the main differences between ForEach and Iterate mediators:
    
    -   Use the ForEach mediator only for message transformations. If you need to make back-end calls from each iteration, use the iterate mediator.
    -   The ForEach mediator supports modifying the original payload. You can use the Iterate mediator for situations where you send the split messages to a target and collect them by an [Aggreagte]({{base_path}}/reference/mediators/aggregate-mediator) mediator in a different flow.
    -   You need to always accompany an Iterate mediator with an Aggregate mediator. ForEach mediator loops over the sub-messages and merges them back to the same parent element of the message.
    -   In Iterate mediator, you need to send the split messages to an endpoint to continue the message flow. However, ForEach mediator does not allow using [Call]({{base_path}}/reference/mediators/call-mediator), [Send]({{base_path}}/reference/mediators/send-mediator) and [Callout]({{base_path}}/reference/mediators/callout-mediator) mediators in the sequence.
    -   The ForEach mediator does not split the message flow, unlike the Iterate mediator. It guarantees execution in the same thread until all iterations are complete.

## Syntax

``` java
<iterate [sequential=(true|false)] [continueParent=(true|false)] [preservePayload=(true|false)] [(attachPath="expression")? expression="expression"]>
   <target [to="uri"] [soapAction="qname"] [sequence="sequenceKey"] [endpoint="endpointKey"]>
     <sequence>
       (mediator)+
     </sequence>?
     <endpoint>
       endpoint
     </endpoint>?
   </target>+
</iterate>
```

## Configuration

The parameters available to configure the Iterate mediator are as
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
<td><strong>Iterate ID</strong></td>
<td>The iterate ID can be used to identify messages created by the iterate mediator. This is particularly useful when aggregating responses of messages that are created using nested iterate mediators.</td>
</tr>
<tr class="even" id="sequential_mediation">
<td><strong>Sequential Mediation</strong></td>
<td><div class="content-wrapper">
<p>This parameter is used to specify whether the split messages should be processed sequentially or not. The processing is carried out based on the information relating to the sequence and endpoint specified in the <a href="#target-configuration">target configuration</a>. The possible values are as follows.</p>
<ul>
<li><strong>True</strong>: If this is selected, the split messages will be processed sequentially. Note that selecting <strong>True</strong> might cause delays due to high resource consumption.</li>
<li><strong>False</strong>: If this is selected, the split messages will not be processed sequentially. This is the default value and it results in better performance.</li>
</ul>
<p>The responses will not necessarily be aggregated in the same order that the requests were sent, even if the <code>               sequential Mediation              </code> parameter is set to <code>               true              </code> .</p>

</div></td>
</tr>
<tr class="odd">
<td><strong>Continue Parent</strong></td>
<td><p>This parameter is used to specify whether the mediation flow continues on the mediators defined after the iterate mediator. Possible values are as follows.</p>
<ul>
<li><strong>True</strong>: If this is selected, the mediation flow continues at the point where the iteration started, once all iterations are finished.</li>
<li><strong>False</strong>: If this is selected, the mediation flow will not return to the parent sequence after the iterations are complete.</li>
</ul></td>
</tr>
<tr class="even" id="preserve_payload">
<td><strong>Preserve Payload</strong></td>
<td><p>This parameter is used to specify whether the original message payload should be used as a template when creating split messages. Possible values are as follows.</p>
<ul>
<li><strong>True</strong>: If this is selected, the original message payload will be used as a template. The split elements are attached to the specified <a href="#attach_path">attach path</a>.</li>
<li><strong>False</strong>: If this is selected, the original message payload will not be used as a template. After the iteration, the payload is replaced by the split elements. This is the default value.</li>
</ul></td>
</tr>
<tr class="odd">
<td><strong>Iterate Expression</strong></td>
<td><div class="content-wrapper">
<p>The <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> is used to split the message. This expression selects the set of sub messages from the request payload that are applied to the mediation defined within the iterate target. Each iteration of the iterate mediator will be executed on each sub message. New messages are created for each and every matching element and processed in parallel or in sequence based on the value specified for the <a href="#sequential_mediation">Sequential Mediation</a> parameter.</p>
<p>In the <strong>Expression Editor</strong> you can click <strong>+ Add Namespace</strong> to add namespaces.</p>
</div></td>
</tr>
<tr class="even" id="attach_path">
<td><strong>Attach Path</strong></td>
<td><div class="content-wrapper">
<p>When <a href="#preserve_payload">preserve payload</a> is true, to form new messages, you can specify an <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> to identify the parent element to which the split elements are attached.</p>
<p>In the <strong>Expression Editor</strong> you can click <strong>+ Add Namespace</strong> to add namespaces.</p>
</div></td>
</tr>
</tbody>
</table>

### Target configuration

Each Iterate mediator has its own target by default. It appears in the mediation tree once you configure the above parameters and save them.

The parameters available to configure the target configuration are as follows:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>SOAP Action</strong></td>
<td>The SOAP action of the message.</td>
</tr>
<tr class="even">
<td><strong>To Address</strong></td>
<td>The target endpoint address.</td>
</tr>
<tr class="odd">
<td><strong>Sequence</strong></td>
<td><p>This parameter is used to specify whether split messages should be mediated via a sequence or not, and to specify the sequence if they are to be further mediated. Possible options are as follows.</p>
<ul>
<li><strong>Anonymous</strong>: If this is selected, you can define an anonymous sequence for the split messages by adding the required mediators as children to <strong>Target</strong> in the mediator tree.</li>
<li><strong>Key</strong>: If this is selected, you can refer to a predefined sequence.</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>Endpoint</strong></td>
<td><p>The endpoint to which the split messages should be sent. Possible options are as follows.</p>
<ul>
<li><strong>None</strong>: If this is selected, the split messages are not sent to an endpoint.</li>
<li><strong>Anonymous</strong>: If this is selected, you can define an anonymous endpoint within the iterate target configuration to which the split messages should be sent.</li>
<li><strong>Key</strong>: If this is selected, you can refer to a predefined endpoint.</li>
</ul></td>
</tr>
</tbody>
</table>

## Examples

In these examples, the Iterate mediator splits the messages into parts and processes them asynchronously. Also see the [Splitting Messages and Aggregating Responses]({{base_path}}/learn/examples/routing-examples/splitting-aggregating-messages) documentation.

=== "Using an XPath expression"
    ```xml 
        <iterate expression="//m0:getQuote/m0:request" preservePayload="true"
                 attachPath="//m0:getQuote"
                 xmlns:m0="http://services.samples">
            <target>
                <sequence>
                    <call>
                        <endpoint>
                            <address
                                uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                        </endpoint>
                    </call>
                </sequence>
            </target>
        </iterate>
    ```
=== "Using a JSONpath expression"    
    ```xml 
        <iterate id="jsonIterator" preservePayload="true" 
                 attachPath="json-eval($.placeHolder)" 
                 expression="json-eval($.students.studentlist)">
           <target>
              <sequence>
                 <call>
                     <endpoint>
                           <http method="POST" uri-template="http://localhost:8280/iteratesample/echojson"/>
                     </endpoint>
                 </call>
              </sequence>
           </target>
        </iterate>
    ```
