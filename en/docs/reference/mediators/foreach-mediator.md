# ForEach Mediator

The ForEach mediator splits the message into a number of different messages derived from the original message by finding matching elements for the [expression]({{base_path}}/reference/synapse-properties/expressions) specified. The behaviour of ForEach mediator is similar to a generic loop. Based on the matching elements, new messages are created for each iteration and processed sequentially. 
The message in each iteration is flowing through the specified [mediation sequence]({{base_path}}/reference/mediation-sequences). After flowing through the mediation sequence, the sub-messages in each iteration are merged back to the corresponding original parent element in the original message sequentially.

!!! Note
    [Iterate Mediator]({{base_path}}/reference/mediators/iterate-mediator) is quite similar to the ForEach mediator. You can use complex expressions to conditionally select elements to iterate over in both mediators. Following are the main difference between ForEach and Iterate mediators:
    
    -   Use the ForEach mediator only for message transformations. If you
        need to make back-end calls from each iteration, then use the
        iterate mediator.
    -   ForEach mediator supports modifying the original payload. You can use Iterate mediator
        for situations where you send the split messages to a target and
        collect them by an [Aggreagte]({{base_path}}/reference/mediators/aggregate-mediator) mediator in a different flow
    -   You need to always accompany an Iterate mediator with an Aggregate mediator.
        ForEach mediator loops over the sub-messages and merges them back to the same
        parent element of the message.
    -   In Iterate mediator you need to send the split messages to an endpoint to
        continue the message flow. However, ForEach mediator does not allow using
        [Call]({{base_path}}/reference/mediators/call-mediator), [Send]({{base_path}}/reference/mediators/send-mediator) and
        [Callout]({{base_path}}/reference/mediators/callout-mediator) mediators in the sequence.
    -   ForEach mediator does not split the message flow, unlike Iterate mediator. It
        guarantees to execute in the same thread until all iterations are
        complete.

!!! Note
    The ForEach mediator creates the following properties in the [default scope]({{base_path}}/reference/synapse-properties/scopes/#default-scope) during mediation and can be accessed in the iterations.

    | Property                   | Description                                                                                           |
    |----------------------------|-------------------------------------------------------------------------------------------------------|
    | FOREACH_ORIGINAL_MESSAGE | This contains the original envelop of the messages split by the ForEach mediator. For example the property `<property name="ORIGINAL_PAYLOAD" expression="get-property('foreachID_FOREACH_ORIGINAL_MESSAGE')"/>` stores the original envelop of the message. You have to prefix the [ForEach ID](#foreachID) to `FOREACH_ORIGINAL_MESSAGE` property name.                    |
    | FOREACH_COUNTER           | This contains the current index of the iteration (zero-based indexing). The message count increases during each iteration. For example the property `<property name="CURRENT_INDEX" expression="get-property('foreachID_FOREACH_COUNTER')"/>` stores the current index of the iteration. You have to prefix the [ForEach ID](#foreachID) to `FOREACH_COUNTER` property name.|



## Syntax

```
<foreach expression="expression" [sequence="sequenceKey"] [id="string"] >
    <sequence>
      (mediator)+
    </sequence>?
</foreach>
```

## Configuration

The parameters available to configure the ForEach mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td id="foreachID"><strong>ForEach ID</strong></td>
<td>If a value is entered for this parameter, it will be used as the prefix for the <code>FOREACH_ORIGINAL_MESSAGE</code> and <code>FOREACH_COUNTER</code> properties created during mediation. This is an optional parameter. It is recommended to define a ForEach ID in nested ForEach scenarios to avoid the properties mentioned from being overwritten.</td>
</tr>
<tr class="even">
<td><strong>Expression</strong></td>
<td><div class="content-wrapper">
<p>The <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> with which different messages are derived by splitting the parent message. This expression should have matching elements based on which the splitting is carried out.</p>
<p>You can click <strong>+ Add Namespace</strong> in the <strong>Expression Editor</strong> to add namespaces when you are providing an expression.</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Sequence</strong></td>
<td><p>The mediation sequence that should be applied to the messages derived from the parent message. ForEach mediator is used only for transformations, thereby, you should not include <a href="{{base_path}}/reference/mediators/call-mediator">Call</a>, <a href="{{base_path}}/reference/mediators/send-mediator">Send</a>, or <a href="{{base_path}}/reference/mediators/callout-mediator">Callout</a> mediators, which are used to invoke endpoints, within this sequence.</p>
<p>For the sequence type you can select one of the following options.</p>
<ul>
<li><strong>Anonymous</strong>: This allows you to define an anonymous sequence to be applied to the split messages by adding the required mediators as children of the ForEach mediator in the mediator tree.</li>
<li><strong>Key</strong>: This allows you to pick an existing mediation sequence.</li>
</ul></td>
</tr>
</tbody>
</table>


## Examples

### Example 1 - Log sub messages

In this configuration, the `"//m0:getQuote/m0:request"` XPath expression and `"json-eval($.getQuote.request)"` JSONPath expression evaluate the split messages to be derived from the parent message. Then the split messages pass through a sequence which includes a [Log mediator]({{base_path}}/reference/mediators/log-mediator) with the log level set to `full`.

=== "Using an XPath expression"
    ``` java 
    <foreach id="foreach_1" expression="//m0:getQuote/m0:request" xmlns:m0="http://services.samples">
            <sequence>
                 <log level="full"/>
            </sequence>
    </foreach>
    ```
=== "Using a JSONPath expression"    
    ``` java 
    <foreach id="foreach_1" expression="json-eval($.getQuote.request)">
            <sequence>
                 <log level="full"/>
            </sequence>
    </foreach>
    ```

### Example 2 - Modify the payload iteratively

When you use ForEach mediator, you can only loop through segments of the message and make changes to a particular segment. You can use [Payload Factory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator) to change the payload in each iteration. Once you exit from the ForEach loop, it automatically aggregates the split segments. This replaces the ForEach function of the complex [XSLT mediators]({{base_path}}/reference/mediators/xslt-mediator) using a ForEach mediator and a Payload Factory mediator. However, to implement the [split-aggregate pattern]({{base_path}}/learn/enterprise-integration-patterns/message-routing/splitter), you still need to use [Iterate mediator]({{base_path}}/reference/mediators/iterate-mediator).

=== "Using an XPath expression"
    ``` java
    <foreach id="foreach_1" expression="//m0:getQuote/m0:request" xmlns:m0="http://services.samples">
        <sequence>
            <property name="OLD_SYMBOL" xmlns:xsd="http://services.samples/xsd" expression="//xsd:symbol"/>
            <property name="NEW_SYMBOL" expression="fn:concat(($ctx:OLD_SYMBOL, '_0')"/>
            <payloadFactory media-type="xml" template-type="default">
                <format>
                    <symbol>$1</symbol>
                </format>
                <args>
                    <arg expression="$ctx:NEW_SYMBOL"/>
                </args>
            </payloadFactory>
        </sequence>
    </foreach>
    ```

=== "Using a JSONPath expression"    
    ``` java
    <foreach id="foreach_1" expression="json-eval($.getQuote.request)">
        <sequence>
            <property name="OLD_SYMBOL" expression="json-eval($.symbol)"/>
            <property name="NEW_SYMBOL" expression="fn:concat($ctx:OLD_SYMBOL, '_0')"/>
            <payloadFactory media-type="json" template-type="default">
                <format>
                    {"symbol": "$1"}
                </format>
                <args>
                    <arg expression="$ctx:NEW_SYMBOL"/>
                </args>
            </payloadFactory>
        </sequence>
    </foreach>
    ```