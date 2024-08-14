# Sequence Mediator

The **Sequence Mediator** refers to an already defined sequence element, which is used to invoke a named sequence of mediators. This is useful when you need to use a particular set on mediators in a given order repeatedly.

You can alternatively select a predefined sequence from the Registry as the in/fault sequence for a proxy service or a REST service without adding any mediator configurations inline. The difference between these two options are described in the table below.

| Attribute                                         | Picking a predefined sequence as in/fault sequence                                                                                                                                                                                                                  | Referring to a predefined sequence via the Sequence mediator                                                                                                                                                                                                        |
|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Adding other mediators                            | Other mediator configurations not already included in the predefined sequence cannot be added to the in/fault sequence.                                                                                                                                    | Other mediator configurations not already included in the predefined sequence can be added to the in/fault sequence.                                                                                                                                    |
| Applying changes done to the predefined sequence | Any changes done to the sequence saved in the **Registry** after it was selected as the in/fault sequence will not be considered when carrying out mediation. | Any changes done to the sequence saved in the **Registry** after it was selected as the in/fault sequence will be considered when carrying out mediation. |

!!! Info
    The Sequence mediator is a [content-unaware]({{base_path}}/reference/mediators/about-mediators/#classification-of-mediators) mediator.

## Syntax

A sequence ref token refers to a  `<sequence/>` element, which is used to invoke a named sequence of mediators.

```xml
<sequence key="name"/>
```

## Configuration

The parameters available to configure the Sequence mediator are as follows.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Key Type</strong></td>
<td><p>This parameter defines whether the key to access the required sequence is a static key or a dynamic key. Possible values are as follows.</p>
<ul>
<li><strong>Static Key</strong>: If this is selected, the key to access the sequence is a static value. You can click either <strong>Configuration Registry</strong> or <strong>Governance Registry</strong>, as relevant, to select the required key from the resource tree for the <strong>Referring Sequence</strong> parameter.</li>
<li><strong>Dynamic Key</strong>: If this is selected, you can define the key to access the sequence as a dynamic value by entering an XPath expression in the <strong>Referring Sequence</strong> parameter.</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>Referring sequence</strong></td>
<td><div class="content-wrapper">
<p>The key to access the sequence saved in the registry. You can either enter a static value selected from the resource tree or an XPath expression depending on the option you selected for the <strong>Key Type</strong> parameter.</p>
<b>Tip</b>:
<p>You can click <strong>NameSpaces</strong> to add namespaces if you are providing an expression. Then the <strong>Namespace Editor</strong> panel would appear where you can provide any number of namespace prefixes and URLs used in the XPath expression.</p>
</div></td>
</tr>
</tbody>
</table>

## Examples

In this example, the following sequence named `StoreSend` is saved in the Configuration registry. It includes a [Store Mediator]({{base_path}}/reference/mediators/store-mediator) to store the request in a message store named `JMSMS` and a [Call Mediator]({{base_path}}/reference/mediators/call-mediator) to send it to an endpoint afterwards.

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

The Sequence mediator configuration can be as follows to invoke the `StoreSend` sequence after using a [PayloadFactory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator) to transform the contents of the request.

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
