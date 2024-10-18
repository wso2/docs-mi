# Header Mediator

The **Header Mediator** allows you to manipulate SOAP and HTTP headers.

## Syntax

```xml
<header name=”string” (value=”string|{property}” | expression=”xpath|jsonpath”) [scope=default|transport] [action=set|remove]/>
```

The optional `action` attribute specifies whether the mediator should set or remove the header. If no value is specified, the header is set by default.

## Configuration

The parameters available to configure the Header mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Name</strong></td>
<td>The name of the header element. You can specify the namespace used in the header element by clicking the <strong>Namespaces</strong> link next to the text field.</td>
</tr>
<tr class="even">
<td><strong>Action</strong></td>
<td>Select <strong>Set</strong> if you want to set the header as a new header. Select <strong>Remove</strong> if you want to remove the header from the incoming message.</td>
</tr>
<tr class="odd">
<td><strong>Value/Expression</strong></td>
<td>A static value or an XPath/JSONPath expression that will be executed on the message to set the header value.</td>
</tr>
<tr class="even">
<td><strong>Inline XML Header</strong></td>
<td><div class="content-wrapper">
<p>This parameter allows you to directly input any XML syntax related to the Header mediator (specifically for SOAP headers). For example, to achieve the following configuration, you should enter the <code>               lastTradeTimestamp              </code> element in the <strong>Inline XML Header</strong> parameter.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1"></a><span class="kw">&lt;header&gt;</span>  </span>
<span id="cb1-2"><a href="#cb1-2"></a>   <span class="kw">&lt;urn:lastTradeTimestamp</span><span class="ot"> xmlns:urn=</span><span class="st">&quot; http://synapse.apache.org/ &quot;</span><span class="kw">&gt;</span>Mon May 13 13:52:17 IST 2013<span class="kw">&lt;/urn:lastTradeTimestamp&gt;</span>  </span>
<span id="cb1-3"><a href="#cb1-3"></a><span class="kw">&lt;/header&gt;</span></span></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><strong>Scope</strong></td>
<td>Select <strong>Synapse</strong> if you want to manipulate SOAP headers. Select <strong>Transport</strong> if you want to manipulate HTTP headers.</td>
</tr>
<tr class="even">
<td><strong>Namespaces</strong></td>
<td>You can click this link to add namespaces if you are providing an expression. The <strong>Namespace Editor</strong> panel would appear. You can enter any number of namespace prefixes and URL that you have used in the XPath expression in this panel.</td>
</tr>
</tbody>
</table>

## Examples

This section covers the following scenarios in which the Header mediator can be used.

### Using SOAP headers

In the following example, the value for `P1 code`should be included in the SOAP header of the message sent from the client to the Micro Integrator. 
To do this, the header mediator is added to the in sequence of the proxy configuration as shown below. Another header mediator is added to the inSequence to respond with `Hello World` in the SOAP header.

=== "REST API"
    ```xml
    <api xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteServiceAPI" context="/stockquote">
        <resource methods="GET" uri-template="/getQuote">
            <inSequence>
                <!-- Setting a simple XML structure as a SOAP header -->
                <property name="REQUEST_HEADER" scope="default" type="OM">
                    <p1:Code xmlns:p1="http://www.XYZ.com/XSD">XYZ</p1:Code>
                </property>
                <header name="p1:Code" scope="default" expression="$ctx:REQUEST_HEADER" xmlns:p1="http://www.XYZ.com/XSD"/>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEP"/>
                </call>
                <!-- Setting a complex XML structure as a SOAP header for the response -->
                <property name="RESPONSE_HEADER" scope="default" type="OM">
                    <p2:Header xmlns:p2="http://www.ABC.com/XSD">
                        <p2:Hello>World</p2:Hello>
                    </p2:Header>
                </property>
                <header name="p2:Header" xmlns:p2="http://www.ABC.com/XSD" action="set" scope="default" expression="$ctx:RESPONSE_HEADER"/>
                <respond/>
            </inSequence>
        </resource>
    </api>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEP" xmlns="http://ws.apache.org/ns/synapse">
        <address     uri="http://localhost:9000/soap/services/SimpleStockQuoteService?wsdl">
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

### Using HTTP headers

The following example makes the ESB profile add the HTTP header `Accept` with the value `image/jpeg` to the HTTP request made to the endpoint.

```xml
<inSequence>
    <header name="Accept" value="image/jpeg" scope="transport"/>
    <call>
        <endpoint name="people">
            <address uri="http://localhost:9763/people/eric+cooke" format="get"/>
        </endpoint>
    </call>
    <respond/>
</inSequence>
```

If you have [enabled wire logs]({{base_path}}/develop/using-wire-logs), you will view the following output.

``` text
<< GET /people/eric+cooke HTTP/1.1
<< Accept: image/jpeg
<< Host: localhost:9763
<< Connection: Keep-Alive
```

### Handling headers with complex XML

A header can contain XML structured values by embedding XML content within the `<header>` element as shown below.

```xml
<header>
    <m:complexHeader xmlns:m="http://org.synapse.example">
        <property key="k1" value="v1" />
        <property key="k2" value="v2" />
    </m:complexHeader>
</header>
```

### Adding a dynamic SOAP header

The following configuration takes the value of an element named `symbol` in the message body (the namespace `http://services.samples/xsd`), and adds it as a SOAP header named `header1`.

```xml
<header xmlns:m="http://org.synapse.example" xmlns:sym="http://services.samples/xsd" name="m:header1" scope="default" expression="//sym:symbol"/>
```

### Setting the endpoint URL dynamically

In this example, the Header mediator allows the endpoint URL to which the message is sent to be set dynamically. It specifies the default address to which the message is sent dynamically by deriving the **To** header of the message via an XPath expression. Then the [Call mediator]({{base_path}}/reference/mediators/call-mediator/) sends the message to a **Default Endpoint**. A Default Endpoint sends the message to the default address of the message (i.e. address specified in the To header). 
Therefore, in this scenario, selecting the Default Endpoint results in the message being sent to relevant URL calculated via the `fn:concat('http://localhost:9764/services/Axis2SampleService_',get-property('epr'))` expression.

```xml
<header name="To" expression="fn:concat('http://localhost:9764/services/Axis2SampleService_',get-property('epr'))"/>
<call>
    <endpoint>
        <default/>
    </endpoint>
</call>
```

### Setting the header with a value in the JSON body	

```	xml
<header name="header-symbol" expression="json-eval($.symbol)"/>	
```
