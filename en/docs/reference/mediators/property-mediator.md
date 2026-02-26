# Property mediator

The Property mediator is used to define configuration settings that control how an integration behaves. These properties manage transport settings, security configurations, or mediator-specific parameters that influence message processing. The Property mediator allows you to set or remove these properties, ensuring they are available within the mediation flow.

!!! Note
    With the introduction of the [**Variable mediator**]({{base_path}}/reference/mediators/variable-mediator/) in WSO2 MI 4.4.0 onwards, it is now recommended to use the **Property mediator** only for managing configuration-related properties within a mediation flow. To store data for future use, the [**Variable mediator**]({{base_path}}/reference/mediators/variable-mediator/) should be used instead.

## Syntax

```xml
<property name="string" [action="set"|"remove"] [type="STRING"|"INTEGER"|"BOOLEAN"|"DOUBLE"|"FLOAT"|"LONG"|"SHORT"|"OM"|"JSON"] 
        (value="string" | expression="expression") [scope="default"|"transport"|"axis2"|"axis2-client"|"operation"|"registry"|"system"|"env"|"file"] 
        [pattern="regex" [group="integer"]]></property>
```

## Configuration

The parameters available to configure the property mediator are as follows:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Property Name</strong></td>
<td><div class="content-wrapper">
<p>A name for the property.</p>
<p>You can provide a static value or a dynamic value for the property name. A dynamic property name can be retrieved by using an <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a>.</p>
<p>Note that the <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> should be contained within curly brackets (<code>{}</code>) as well as double quotations (<code>""</code>). See the examples given below.</p>
  <ul>
    <li>
      <code>property name="{get-property('propertyName')}"</code>
    </li>
    <li>
      <code>property name="{$ctx:propertyName}"</code>
    </li>
    <li>
      <code>property name="{json-eval({$ctx:propertyName})}"</code>
    </li>
  </ul>
<p>For names of the generic properties that come by default, see <a href="{{base_path}}/reference/mediators/property-reference/generic-properties">Generic Properties</a>.</p>
</div></td>
</tr>
<tr class="even">
<td><strong>Property Action</strong></td>
<td><p>The action to be performed for the property.</p>
<ul>
<li><strong>Set</strong>: If this is selected, the property will be set in the message.</li>
<li><strong>Remove</strong>: If this is selected, the property will be removed from the message.</li>
</ul></td>
</tr>
<tr class="odd">
<td><strong>Property Data Type</strong></td>
<td><div class="content-wrapper">
<p>The data type for the property. Property mediator will handle the property as a property of selected type. Available values are as follows:</p>
<ul>
<li><strong>STRING</strong></li>
<li><strong>INTEGER</strong></li>
<li><strong>BOOLEAN</strong></li>
<li><strong>DOUBLE</strong></li>
<li><strong>FLOAT</strong></li>
<li><strong>LONG</strong></li>
<li><strong>SHORT</strong></li>
<li><p><strong>OM</strong></p></li>
<li><p><strong>JSON</strong></p></li>
</ul>
<div class="admonition note">
        <p class="admonition-title">Note</p>
<p><li><code>STRING</code> is the default type.</li></p>
<p><li>The <code>OM</code> type is used to set XML property values on the message context. This is useful when the expression associated with the property mediator evaluates to an XML node during mediation. When the <code>OM</code> type is used, the XML is converted to an AXIOM OMElement before it is assigned to a property.</li></p>
<p><li>The <code>JSON</code> type is used to set JSON values on the message context. It is recommended to use the JSON
 data type (rather than the STRING data type) for JSON payloads.</li></p>
<p>
  <li>Note that when the JSON is just a string, you need to add quotes around them. This is due to the restrictions in 
  <a href="https://tools.ietf.org/html/rfc7159">RFC</a>.
</li></p>
<p>
  Example 1: Creating a property with a JSON string by giving the value.</br>

  <code>&lt;property name="Greeting" value="&quot;Hello World&quot;" type="JSON"/&gt;</code></br></br>

  Example 2 : Creating a property with a JSON object via expression evaluation.</br>

  <code>&lt;property name="studentObject" expression="json-eval($.student)" type="JSON"/&gt;</code>

</p>
</div>
</div></td>
</tr>
<tr class="even">
<td><strong>Property Value</strong></td>
<td>You can give either value or an expression. 
<ul>
<li><strong>Value</strong>: the property value is entered as a constant in this parameter.</li>
<li><strong>Expression</strong>: the <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> which determines the property value should be entered in this parameter.</li>
</ul>
</td>
</tr>
<tr class="odd">
<td><strong>Pattern</strong></td>
<td>This parameter is used to enter a regular expression that will be evaluated against the value of the property or the result of the <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a>.</td>
</tr>
<tr class="even">
<td><strong>Group</strong></td>
<td>The number (index) of the matching item is evaluated using the regular expression entered in the <strong>Pattern</strong> parameter.</td>
</tr>
<tr class="odd">
<td><strong>Scope</strong></td>
<td><p>The <a href="{{base_path}}/reference/synapse-properties/scopes">scope</a> at which the property will be set to or removed from. Possible values are as follows.</p>
<ul>
<li><strong>Synapse</strong>: This is the default scope. The properties set in this scope last as long as the transaction (request-response) exists.</li>
<li><strong>Transport</strong>: The properties set in this scope will be considered transport headers. For example, if it is required to send an HTTP header named 'CustomHeader' with an outgoing request, you can use the property mediator configuration with this scope.</li>
<li><strong>Axis2</strong>: Properties set in this scope are available only either throughout the request flow or the response flow for which the property is defined.</li>
<li><strong>Registry</strong>: This scope is used to retrieve properties within the registry.</li>
<li><strong>System</strong>: This scope is used to retrieve Java system properties.</li>
<li><strong>Environment</strong>: This scope is used to retrieve environment variables.</li>
<li><strong>File</strong>: This scope is used to retrieve properties defined in the `file.properties` configuration file.</li>
<li><strong>Operation</strong>: This scope is used to retrieve a property in the operation context level.</li>
<li><strong>axis2-client</strong>: This is similar to the <strong>Synapse</strong> scope. The difference between the two scopes is that the <strong>axis2-client</strong> scope can be accessed inside the <b>mediate()</b> method of a mediator via a custom mediator created using the <a href="{{base_path}}/reference/mediators/class-mediator">Class mediator</a>.</li>
</ul>
<p>For a detailed explanation of each scope, see <a href="{{base_path}}/reference/synapse-properties/scopes">scopes</a> documentation.</p></td>
</tr>
</tbody>
</table>

## Examples

### Send a fault message based on the Accept http header

In this configuration, a response is sent to the client based on the `Accept` header. The [Payload mediator]({{base_path}}/reference/mediators/payloadfactory-mediator) transforms the message contents. Then a [Property mediator]({{base_path}}/reference/mediators/property-mediator) sets the message type
based on the `Accept` header using the `$ctx:accept` expression. The message is then sent back to the client via the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator).

``` xml
<payloadFactory media-type="xml">
    <format>
        <m:getQuote xmlns:m="http://services.samples">
            <m:request>
                <m:symbol>Error</m:symbol>
            </m:request>
        </m:getQuote>
    </format>
</payloadFactory>
<property name="messageType" expression="$ctx:accept" scope="axis2"/>
<respond/>
```

### Set the HTTP status code

The Property mediator can be used to set the HTTP status code for responses. In the example below, the status code is set to `500`.

```xml
<property name="HTTP_SC" value="500" scope="axis2"/>
```

### Extract JSON property values

The Property mediator can extract values from JSON payloads using JSONPath expressions. In MI 4.4.0 and later, use synapse expressions.

```xml
<!-- Correct syntax for MI 4.4.0+ -->
<property name="hospitalId" expression="$.hospital_id" scope="default"/>

<!-- Incorrect syntax (legacy) - will cause errors in MI 4.4.0+ -->
<!-- <property name="hospitalId" expression="json-eval($.hospital_id)" scope="default"/> -->
```

!!! Note
    In MI 4.4.0 and later versions, JSONPath expressions like `$.hospital_id` should be used directly without wrapping them in `json-eval()`. The `json-eval()` function is only needed when using JSONPath expressions within other expression contexts.
