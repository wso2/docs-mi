# Store Mediator

The Store mediator enqueues messages passing through its mediation sequence in a given [message store]({{base_path}}/reference/synapse-properties/about-message-stores-processors). It can serve as a [dead letter channel]({{base_path}}/learn/enterprise-integration-patterns/messaging-channels/dead-letter-channel/) if it is included in a fault sequence and if its message store is connected to a [message processor]({{base_path}}/reference/synapse-properties/about-message-stores-processors) that forwards all the messages in the store to an [endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties).

## Syntax

``` xml
<store messageStore="string|expression" sequence="string"/>
```

## Configuration

The parameters available to configure the Store mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Message Store</strong></td>
<td><div class="content-wrapper">
<p>The Message Store, in which messages will be stored. You can give the name of the Message Store either as a <strong>value</strong> or as an <strong><a href="{{base_path}}/reference/synapse-properties/expressions">expressions</a></strong>.</p>
<p>You have to <a href="{{base_path}}/develop/creating-artifacts/creating-a-message-store">create the message store</a> before adding it here.</p>
<ul>
<li>To give the Message Store name as a value, add the value for <strong>Message Store</strong> field.</li>
<li><p>To give the Message Store name as an <a href="{{base_path}}/reference/synapse-properties/expressions">expressions</a>, click on <strong>Ex</strong>, and enter the <a href="{{base_path}}/reference/synapse-properties/expressions">expressions</a> to derive the Message Store.</p></li>
<p>For example: <code>&lt;store messagestore=&quot;{//m:msgstr/m:arg/m:value}&quot; xmlns:m=&quot;http://services.samples/xsd&quot; sequence=&quot;storeSequence&quot;/&gt;</code></p>
</ul>
</div></td>
</tr>
<tr class="even">
<td><strong>On Store Sequence</strong></td>
<td>The sequence that will be called before the message gets stored. This <a href="{{base_path}}/develop/creating-artifacts/creating-reusable-sequences">sequence should be created</a> before adding it here.</td>
</tr>
</tbody>
</table>

## Examples

Following are examples demonstrating the usage of the Store mediator.

### Define the Message Store as a value

An [API]({{base_path}}/reference/synapse-properties/rest-api-properties) can be configured with the Store mediator as follows to save messages in a [message store]({{base_path}}/reference/synapse-properties/about-message-stores-processors) named `JMSMS`.

```xml
<api context="/store" name="StoreAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/">
        <inSequence>
             <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2" type="STRING"></property>
             <property name="OUT_ONLY" value="true" scope="default" type="STRING"></property>
             <store messageStore="JMSMS"></store>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

### Define the Message Store as an XPath expression

An [API]({{base_path}}/reference/synapse-properties/rest-api-properties) can be configured with the Store mediator as follows to save messages in a [message store]({{base_path}}/reference/synapse-properties/about-message-stores-processors), which is extracted dynamically using an [XPath expression]({{base_path}}/reference/synapse-properties/expressions/#xpath-expressions).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/store" name="StoreAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/">
        <inSequence>
            <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2" type="STRING"></property>
            <property name="OUT_ONLY" value="true" scope="default" type="STRING"></property>
            <store messageStore="{//ser:getQuote/ser:request/ser:symbol}" xmlns:ser="http://services.samples"/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```