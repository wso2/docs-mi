# Expressions

In WSO2 Micro Integrator, expressions are a way to dynamically compute values within various integration artifacts such as sequences, APIs, endpoints, and proxies. These expressions are used to extract data as it flows through the integration logic.

The most commonly used expression languages in WSO2 MI are [Variables](#variables), [Functions](#functions), [JSONPath (for JSON)](#jsonpath-expressions), and [XPath (for XML)](#xpath-expressions).

## Variables

There is a set of predefined variables that you can use to extract data from the message. These variables in different [scopes]({{base_path}}/reference/synapse-properties/scopes) are as follows:

### $ctx

The prefix used to get properties set at the [default scope]({{base_path}}/reference/synapse-properties/scopes/#default-scope). For example, to get the value of property with name `ERROR_MESSAGE`, use the expression `$ctx:ERROR_MESSAGE`.

Similarly, you can use the `$ctx` prefix with [Generic Properties]({{base_path}}/reference/mediators/property-reference/generic-properties).

??? note "Example of $ctx usage"
    
    This example sends a request to an API, and call to a non-existent endpoint reference key. It causes a
    mediation fault, which triggers the fault sequence.

    Deploy the following API. For instructions, see [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/).
    
    The `<property name="stockprop" expression="$ctx:ERROR_MESSAGE"/>` property in the fault sequence configuration is used to log the error message that occurs due to a mediation fault.
    
    ``` xml
    <api context="/stockQuote" name="stockQuoteAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/">
            <inSequence>
                <call>
                    <endpoint key="ep2"/>
                </call>
                <respond/>   
            </inSequence>
            <faultSequence>
                <log>
                    <property name="stockprop" expression="$ctx:ERROR_MESSAGE"/>
                    <property name="Cause" expression="get-property('ERROR_MESSAGE')"/>
                </log>
            </faultSequence>
        </resource>
    </api> 
    ```
     
    Note the following message in the log.

    ``` java
    INFO {LogMediator} - {api:stockQuoteAPI} To: /stockQuote/, MessageID: urn:uuid:f1c35024-4d19-4042-abed-8880a4d98c3d, correlation_id: f1c35024-4d19-4042-abed-8880a4d98c3d, Direction: request, stockprop = Couldn't find the endpoint with the key : ep2, Cause = Couldn't find the endpoint with the key : ep2
    ```
    In this example, the property definition, `<property
    name="stockprop" expression="$ctx:ERROR_MESSAGE"/>` is equivalent
    to `<property name="stockprop"
    expression="get-property('ERROR_MESSAGE')"/>`.

### $trp

The prefix used to get the transport headers. For example, to get the transport header named Content-Type of the current message, use the `$trp:Content-Type` expression. HTTP transport headers are not case sensitive. Therefore, `$trp:Content-Type` and `$trp:CONTENT-TYPE` are regarded as the same.

Similarly, you can use `$trp` prefix with [HTTP Transport Properties]({{base_path}}/reference/mediators/property-reference/http-transport-properties).


??? note "Example of $trp usage"

    Deploy the following API. For instructions, see [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/).
    
    Note the property, `<property name="stockprop" expression="$trp:Content-Type"/>` in the configuration, which is used to log the `Content-Type` HTTP header of the request message.
    
    ``` xml
    <api context="/stockQuote" name="stockQuoteAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <log>
                    <property name="stockprop" expression="$trp:Content-Type"/>
                </log>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api> 
    ```
    
    Note the following message in the log.
    
    ``` java
    INFO {LogMediator} - {api:stockQuoteAPI} To: /stockQuote/, MessageID: urn:uuid:7095f877-6a7c-4c99-a48b-c506ed9e43e1, correlation_id: 7095f877-6a7c-4c99-a48b-c506ed9e43e1, Direction: request, stockprop = application/json
    ```
    
    In this example, the property definition, `<property name="stockprop"
    expression="$trp:Content-Type"/>` is equivalent to `<property
    name="stockprop"
    expression="get-property('transport','Content-Type')"/>`.

### $body

The prefix used to get the message payload. For example, the `$body//getQuote` expression refers to the first `getQuote` element in a message body.

??? note "Example of $body usage"

    Deploy the following proxy service using instructions in [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).
    
    Note the property, `<property xmlns:m0="http://services.samples" name="stockprop" expression="$body//m0:getQuote"/>` in the configuration. It is used to log the first `<m0:getQuote>` element of the request message body.
    
    ``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
        <target>
            <inSequence>
                <log>
                    <property xmlns:m0="http://services.samples" name="stockprop" expression="$body//m0:getQuote"/>
                </log>
                <respond/>
            </inSequence>
        </target>
    </proxy> 
    ```
    
    Note the following message in the log.
    
    ``` java
    INFO - LogMediator To: /services/StockQuoteProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:930f68f5-199a-4eff-90d2-ea679c2362ab, Direction: request, stockprop = <m0:getQuotexmlns:m0="http://services.samples"><m0:request><m0:symbol>IBM</m0:symbol></m0:request></m0:getQuote>
    ```

### $axis2

The prefix used to get the properties at the [axis2 scope]({{base_path}}/reference/synapse-properties/scopes/#axis2-scope). For example, to get the value of the `axis2` scope property with the `REST_URL_POSTFIX` name, use the `$axis2:REST_URL_POSTFIX` expression.

Similarly, you can use `$axis2` prefix with [HTTP Transport Properties]({{base_path}}/reference/mediators/property-reference/axis2-properties).

??? note "Example of $axis2 usage"

    Deploy the following API. For instructions, see [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/).
    
    Note the property, `<property name="stockprop" expression="$axis2:REST_URL_POSTFIX"/>` in the configuration which is used to log the `REST_URL_POSTFIX`
    value of the request message.
    
    ``` xml
    <api context="/stockQuote" name="stockQuoteAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/process">
            <inSequence>
                <log>
                    <property name="stockprop" expression="$axis2:REST_URL_POSTFIX"/>
                </log>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api> 
    ```

    Note the following message in the log.
    
    ``` java
    INFO {LogMediator} - {api:stockQuoteAPI} To: /stockQuote/process, MessageID: urn:uuid:1cba15f7-d3b8-47b5-a0e7-f8275f9a6a99, correlation_id: 1cba15f7-d3b8-47b5-a0e7-f8275f9a6a99, Direction: request, stockprop = /process
    ```
    
    In this example, the property definition,
    `<property name="stockprop" expression="$axis2:REST_URL_POSTFIX"/>`
    is equivalent to
    `<property name="stockprop" expression="get-property('axis2','REST_URL_POSTFIX')"/>`

### $url

The prefix used to get the URI query params of a request URL.

??? note "Example of $url usage"

    Deploy the following API. For instructions, see [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/).
    
    ``` xml
    <api xmlns="http://ws.apache.org/ns/synapse" name="URLQueryTest" context="/query">
       <resource methods="GET" uri-template="/edit?a={symbol}&b={value}">
          <inSequence>
             <log level="full">
                <property name="SYMBOL" expression="$url:a"></property>
                <property name="VALUE" expression="$url:b"></property>
             </log>
             <respond></respond>
          </inSequence>
          <faultSequence/>
       </resource>
    </api>
    ```

    Note the following message in the log.
    ``` xml
    INFO {LogMediator} - {api:URLQueryTest} To: /query/edit?a=wso2&b=2.4, MessageID: urn:uuid:b89fa7a9-8974-4539-96f6-4e42bd05c6c3, correlation_id: b89fa7a9-8974-4539-96f6-4e42bd05c6c3, Direction: request, SYMBOL = wso2, VALUE = 2.4, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"><soapenv:Body/></soapenv:Envelope>
    ```

### $func

The prefix used to refer to a particular parameter value passed externally by an invoker such as the [Call Template Mediator]({{base_path}}/reference/mediators/call-template-mediator).

??? note "Example of $func usage"

    Add a sequence template with the following configuration. See [Adding a New Sequence Template]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) for detailed instructions.
    
    ``` xml
    <template xmlns="http://ws.apache.org/ns/synapse" name="HelloWordLogger">
        <sequence>
            <log level="full">
                <property xmlns:ns2="http://org.apache.synapse/xsd" xmlns:ns="http://org.apache.synapse/xsd" name="message" expression="$func:message"></property>
            </log>
        </sequence>
    </template>
    ```
    
    Deploy the following API. For instructions, see [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/).
    
    ``` xml
    <api context="/stockQuote" name="stockQuoteAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/process">
            <inSequence>
                <call-template target="HelloWorldLogger">
                    <with-param name="message" value="HelloWorld"/>
                </call-template>
                <log/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api> 
    ```

    Note the following message in the log.
    
    ``` xml
    INFO {LogMediator} - {api:stockQuoteAPI} To: /stockQuote/process, MessageID: urn:uuid:c640f936-52c0-4e2c-94ee-b29e11884272, correlation_id: c640f936-52c0-4e2c-94ee-b29e11884272, Direction: request, message = null, Payload: {
    "payload": {}
    }
    ```

### $header

The prefix used to get the SOAP 1.1 or 1.2 header element. For example, the expression
`$header/wsa:To` refers to the addressing `To` header regardless of
whether this message is SOAP-11 or SOAP-12.

??? note "Example of $header usage"

    Deploy the following proxy service using instructions in [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).
    
    Note the property, `<property xmlns:wsa="http://www.w3.org/2005/08/addressing" name="stockprop" expression="$header/wsa:To"/>` in the configuration. It is used to log the value of **wsa:To** header of the SOAP request.
    
    ``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
        <target>
            <inSequence>
                <log>
                    <property xmlns:wsa="http://www.w3.org/2005/08/addressing" name="stockprop" expression="$header/wsa:To"/>
                </log>
                <respond/>
            </inSequence>
        </target>
    </proxy> 
    ```
    
    Note the following message in the log.
    
    ``` java
    INFO - LogMediator To: http://localhost:9000/services/SimpleStockQuoteService, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:8a64c9cb-b82f-4d6f-a45d-bef37f8b664a, Direction: request, stockprop = http://localhost:9000/services/SimpleStockQuoteService
    ```

### $env

The prefix used to get a SOAP 1.1 or 1.2 envelope element. For example, to get the body element from the SOAP envelope, use the expression `$env/*[local-name()='Body']`. You can do the same using the expression [$body](#body).

Similarly you can use [$header](#header) to get SOAP 1.1 or 1.2 header element instead of using `$env`.

??? note "Example of $env usage"

    1.  Deploy the following API. For instructions, see [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/).
    
        ``` xml
        <api context="/soapEnvelopeTest" name="SoapEnvelopeTest">
                <resource url-mapping="/*">
                    <inSequence>
                        <property name="messageType" scope="axis2" value="application/xml"/>
                        <payloadFactory media-type="xml">
                            <format>
                                <theData xmlns="http://some.namespace">
                                    <item>$1</item>
                                </theData>
                            </format>
                            <args>
                                <arg evaluator="xml" expression="$env/*[local-name()='Body']/*[local-name()='jsonObject']/*"/>
                            </args>
                        </payloadFactory>
                        <property name="messageType" scope="axis2" value="application/json"/>
                        <respond/>
                    </inSequence>
                </resource>
        </api>
        ```
    
    2.  Send a post request to the API you created (i.e., `http://localhost:8280/soapEnvelopeTest`),with the following json payload using a rest client.
    
        ``` xml
        {"content":{ "paramA": "ValueA", "paramB": "valueB" }}
        ```
    
        You will receive the following response:
    
        ``` xml
        {"theData":{"item":{"content":{"paramA":"ValueA","paramB":"valueB"}}}}
        ```


## Functions

There is a set of predefined functions that you can use to extract data from the message.

#### base64Encode() function

The `base64Encode()` function returns the base64-encoded value of the specified string.

Syntax:

-   `base64Encode(string value)`
-   `base64Encode(string value, string charset)`

Example:

`<property name="ENCODED_VALUE" expression="base64Encode('This is a test value')"/>`

#### base64Decode() function

The `base64Decode()` function returns the original value of the specified base64-encoded value.

The syntax of the function takes the following format.

-   `base64Decode(string encodedValue)`
-   `base64Decode(string encodedValue, string charset)`

Example:

`<property name="DECODED_VALUE" expression="base64Decode('VGhpcyBpcyBhIHRlc3QgdmFsdWU=')"/>`

#### get-property() function

The `get-property()` function allows you to retrieve various types of properties from the message context, such as transport headers, custom properties, system properties, or Axis2-specific properties. These properties can be used in the message flows, making the mediation process dynamic.

The syntax of the function takes the following format.

-   `get-property(String propertyName)`
-   `get-property(String scope, String propertyName)`

The function accepts [scope]({{base_path}}/reference/synapse-properties/scopes) as an optional parameter. It retrieves a
message property at the given scope. If you provide only the property name without the scope, the default `synapse` scope will be used.

See [scopes]({{base_path}}/reference/synapse-properties/scopes) documentation to see examples for each operation.

#### url-encode() function

The `url-encode()` function returns the URL-encoded value of the specified string.

Syntax:

-   `url-encode(string value)`
-   `url-encode(string value, string charset)`

Example:

`<property name="ENCODED_URL" expression="url-encode('http://this is a test url')"/>`

## JSONPath expressions

[JSONPath](http://goessner.net/articles/JsonPath/) expressions are used for navigating and querying JSON data. JSONPath allows you to extract specific data from JSON documents.

JSONPath expressions are used within mediators like Log, Filter, Property, and Switch mediators to extract JSON data.
`json-eval` function in expressions is used to specify JSONPath.

- The syntax usually starts with `$` to represent the root of the JSON document.
- Dots (.) and brackets ([]) are used to traverse different levels of the JSON hierarchy.

### JSONPath syntax

Suppose we have the following payload:

```
{
  "id": 12345,
  "id_str": "12345",
  "array": [ 1, 2, [ [], [{"inner_id": 6789}] ] ],
  "name": null,
  "object": {},
  "$schema_location": "unknown",
  "12X12": "image12x12.png"
}
```

The following table summarizes sample JSONPath expressions and their outputs:

<table>
<thead>
<tr class="header">
<th>Expression</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>$.</code></pre></td>
<td><pre><code>{ &quot;id&quot;:12345, &quot;id_str&quot;:&quot;12345&quot;, &quot;array&quot;:[1, 2, [[],[{&quot;inner_id&quot;:6789}]]], &quot;name&quot;:null, &quot;object&quot;:{}, &quot;$schema_location&quot;:&quot;unknown&quot;, &quot;12X12&quot;:&quot;image12x12.png&quot;}</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.id</code></pre></td>
<td><pre><code>12345</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>$.name</code></pre></td>
<td><pre><code>null</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.object</code></pre></td>
<td><pre><code>{}</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>$.[&#39;$schema_location&#39;]</code></pre></td>
<td><pre><code>unknown</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.12X12</code></pre></td>
<td><pre><code>image12x12.png</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>$.array</code></pre></td>
<td><pre><code>[1, 2, [[],[{&quot;inner_id&quot;:6789}]]]</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.array[2][1][0].inner_id</code></pre></td>
<td><pre><code>6789</code></pre></td>
</tr>
</tbody>
</table>

You can evaluate a JSONPath expression against a property that contains a JSON payload using [Variables](#variables).

To evaluate a JSONPath expression against a property, use the following syntax.

```json
json-eval(<scope_of_the_property>:<property_name>.<JSONPath_expression>)
```

Example 1: When the property is in the default scope you can use [$ctx](#ctx).

```json
json-eval($ctx:propertyName.student.name)
```

Example 2: When the property is in the Axis2 scope you can use [$axis2](#axis2).

```json
json-eval($axis2:propertyName.student.name)
```

Example 3: When the property is in the transport scope you can use [$trp](#trp).

```json
json-eval($trp:propertyName.student.name)
```

## XPath expressions

[XPath (XML Path Language)](https://www.w3schools.com/xml/xpath_intro.asp) is a language used to navigate through elements and attributes in an XML document. It allows you to identify and extract specific portions of XML data, making it ideal for working with complex XML payloads, which are common in service integration scenarios.

!!! Note
    The WSO2 Micro Integrator supports standard XPath functions and variables through its underlying XPath engine. It supports XPath 1.0 by default whereas the support for XPath 2.0 can be introduced by adding the following property in `<MI_HOME>/conf/deployment.toml`.
    
    ```toml
    [mediation]
    synapse.enable_xpath_dom_failover=true
    ```

### XPath Syntax

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

See [xpath syntax](https://www.w3schools.com/xml/xpath_syntax.asp) for more examples.

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
