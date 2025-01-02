# XPath Expressions

[XPath (XML Path Language)](https://www.w3schools.com/xml/xpath_intro.asp) is a language used to navigate through elements and attributes in an XML document. It allows you to identify and extract specific portions of XML data, making it ideal for working with complex XML payloads, which are common in service integration scenarios.

!!! Note
    The WSO2 Micro Integrator supports standard XPath functions and variables through its underlying XPath engine. It supports XPath 1.0 by default whereas the support for XPath 2.0 can be introduced by adding the following property in `<MI_HOME>/conf/deployment.toml`.

    ```toml
    [mediation]
    synapse.enable_xpath_dom_failover=true
    ```

## XPath syntax

The syntax provides a way to select nodes such as elements and attributes in an XML document.

Let's use the following payload:

```xml
<order>
    <customer id="1100">
        <name>John Doe</name>
        <email>john@example.com</email>
    </customer>
    <items>
        <item id="101">
            <name>Smartphone</name>
            <price>300</price>
        </item>
        <item id="102">
            <name>Laptop</name>
            <price>1200</price>
        </item>
    </items>
    <total>1500</total>
</order>
```

The following table summarizes sample XPath expressions and their outputs:

<table>
<thead>
<tr class="header">
<th>Type</th>
<th>Description</th>
<th>Expression</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td rowspan="2">Node Selection</td>
<td>Single Slash (/): Selects nodes from the root element.</td>
<td><code>expression="//ns:order/ns:total" xmlns:ns="http://ws.apache.org/ns/synapse"</code></td>
<td><pre><code>1500</code></pre></td>
</tr>
<tr class="even">
<td>Double Slash (//): Selects nodes in the document regardless of their depth or hierarchy.</td>
<td><pre><code>expression="//ns:total" xmlns:ns="http://ws.apache.org/ns/synapse"</code></pre></td>
<td><pre><code>1500</code></pre></td>
</tr>
<tr class="odd">
<td>Attributes</td>
<td>@: XPath can also be used to select attributes of elements.</td>
<td><pre><code>expression="//ns:customer/@id" xmlns:ns="http://ws.apache.org/ns/synapse"</code></pre></td>
<td><pre><code>1100</code></pre></td>
</tr>
<tr class="even">
<td>Predicates</td>
<td>Square Brackets ([]): Used to apply conditions to narrow down the node selection.</td>
<td><pre><code>expression="//ns:item[@id='102']/ns:name" xmlns:ns="http://ws.apache.org/ns/synapse"</code></pre></td>
<td><pre><code>Laptop</code></pre></td>
</tr>
<tr class="odd">
<td>Functions</td>
<td>XPath includes various built-in functions to work with nodes and data. Refer to <a href="https://www.w3schools.com/xml/xsl_functions.asp">more functions</a>.</td>
<td><pre><code>expression="sum(//ns:item/ns:price)" xmlns:ns="http://ws.apache.org/ns/synapse"</code></pre></td>
<td><pre><code>1500.0</code></pre></td>
</tr>
</tbody>
</table>

Go to [XPath syntax](https://www.w3schools.com/xml/xpath_syntax.asp) for more examples.

??? note "How to retrieve the XML node itself instead of text content"
    When the result of an XPath evaluation results in a single XML node, the
    evaluator will return the text content of this node (similar to executing `/root/body/node/text()`). If you want to retrieve
    the node itself, you have to configure the [Enrich mediator]({{base_path}}/reference/mediators/enrich-mediator) as shown
    in the following example.
    ``` xml
    <inSequence>
    <log level="custom">
    <property name="WHERE" value="before doing stuff"/>
    </log>
    <enrich>
    <source type="body" clone="true"/>
    <target type="property" property="ORIGINAL_PAYLOAD"/>
    </enrich>
    <property name="CHILD_PAYLOAD" expression="$body/child::node()" scope="default"/>
    <log level="custom">
    <property name="WHERE" value="after doing stuff"/>
    <property name="ORIGINAL_PAYLOAD" expression="get-property('ORIGINAL_PAYLOAD')"/>
    <property name="CHILD_PAYLOAD" expression="get-property('CHILD_PAYLOAD')"/>
    </log>
    <enrich>
    <source type="property" clone="true" property="ORIGINAL_PAYLOAD"/>
    <target type="body" action="sibling"/>
    </enrich>
    <log level="full"/>
    </inSequence>
    ```