# Sequence Mediator

The Sequence mediator is used to invoke an already configured [named sequence of mediators]({{base_path}}/reference/mediation-sequences/#named-sequences). This is useful when you need to reuse a particular set of mediators in a given order.

## Syntax


```xml
<sequence key="name"/>
```

## Configuration

The parameters available to configure the Sequence mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td><strong>Referring sequence</strong></td>
<td><div class="content-wrapper">
<p>This is the reference key of the already configured sequence. Possible values are as follows.</p>
<li>the name of the referring sequence as the key.</li>
<li>if the sequence is configured in the <a href="{{base_path}}/get-started/key-concepts/#registry">registry</a>, give the registry path as the key.</li>
<li>a dynamic value by entering an <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> as the key.</li>
</div>
</td>
</tr>
</tbody>
</table>

## Examples

In this example, the following sequence named `StoreSend` includes a [store mediator]({{base_path}}/reference/mediators/store-mediator) to store the request in a message store named `JMSMS` and a [call mediator]({{base_path}}/reference/mediators/call-mediator) to send it to an endpoint afterwards.

=== "Sequence"
    ```xml
    <sequence name="StoreSend" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <store messageStore="JMSMS"/>
        <call>
            <endpoint key="simplestockep"/>
        </call>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="simplestockep" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
            <suspendOnFailure>
                <initialDuration>-1</initialDuration>
                <progressionFactor>1</progressionFactor>
            </suspendOnFailure>
            <markForSuspension>
                <retriesBeforeSuspension>0</retriesBeforeSuspension>
            </markForSuspension>
        </address>
    </endpoint>
    ```

The Sequence mediator configuration can be as follows to invoke the `StoreSend` sequence after using a [payloadFactory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator) to transform the contents of the request.

### Example 1: If the `StoreSend` sequence configured in registry

```xml 
<inSequence>
    <payloadFactory media-type="xml" template-type="default">
        <format>
            <m:checkpriceresponse xmlns:m="http://services.samples/xsd">
                <m:code>$1</m:code>
                <m:price>$2</m:price>
            </m:checkpriceresponse>
        </format>
        <args>
            <arg expression="//m0:symbol" evaluator="xml" xmlns:m0="http://services.samples/xsd"/>
            <arg expression="//m0:last" evaluator="xml" xmlns:m0="http://services.samples/xsd"/>
        </args>
    </payloadFactory>
    <sequence key="conf:StoreSend.xml"/>
</inSequence>
```

### Example 2: If the `StoreSend` sequence configured as a named sequence

```xml 
<inSequence>
    <payloadFactory media-type="xml" template-type="default">
        <format>
            <m:checkpriceresponse xmlns:m="http://services.samples/xsd">
                <m:code>$1</m:code>
                <m:price>$2</m:price>
            </m:checkpriceresponse>
        </format>
        <args>
            <arg expression="//m0:symbol" evaluator="xml" xmlns:m0="http://services.samples/xsd"/>
            <arg expression="//m0:last" evaluator="xml" xmlns:m0="http://services.samples/xsd"/>
        </args>
    </payloadFactory>
    <sequence key="StoreSend"/>
</inSequence>
```

### Example 3: If the `StoreSend` sequence can be derived dynamically

```xml 
<inSequence>
    <payloadFactory media-type="xml" template-type="default">
        <format>
            <m:checkpriceresponse xmlns:m="http://services.samples/xsd">
                <m:code>$1</m:code>
                <m:price>$2</m:price>
            </m:checkpriceresponse>
        </format>
        <args>
            <arg expression="//m0:symbol" evaluator="xml" xmlns:m0="http://services.samples/xsd"/>
            <arg expression="//m0:last" evaluator="xml" xmlns:m0="http://services.samples/xsd"/>
        </args>
    </payloadFactory>
    <property name="seqName" value="StoreSend"/>
	<sequence key="{$ctx:seqName}"/>
</inSequence>
```