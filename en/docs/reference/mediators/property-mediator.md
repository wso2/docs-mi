# Property mediator

The Property mediator is used to manage message properties within a mediation flow. Properties in WSO2 MI are key-value pairs that can be used to store and retrieve values during message processing. The Property Mediator allows you to set or remove these properties, which can then be used later in the mediation flow.

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

### Set and log and property

In this example, we are setting the property symbol, and later we can log it using the [Log Mediator]({{base_path}}/reference/mediators/log-mediator).

```xml
<property name="symbol" expression="fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)" xmlns:m0="http://services.samples/xsd"/>

<log level="custom">
    <property name="symbol" expression="$ctx:symbol"/>
</log>
```

### Send a fault message based on the Accept http header

In this configuration, a response is sent to the client based on the `Accept` header. The [PayloadFactory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator) transforms the message contents. Then a [Property mediator]({{base_path}}/reference/mediators/property-mediator) sets the message type
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

### Read a property stored in the Registry

You can read a property that is stored in the Registry by using the `get-property()` method in your Synapse configuration. 
For example, the following Synapse configuration retrieves the `abc` property of the collection `gov:/data/xml/collectionx`, and stores it in the `regProperty` property.

``` xml
<property name="regProperty" expression="get-property('registry', 'gov:/data/xml/collectionx@abc')"/>
```

!!! Info
    You can use the following syntax to read properties or resources stored in the `gov` or `conf` registries. When specifying the path to the resource, do not give the absolute path. Instead, use the `gov` or `conf` prefixes.

#### Read a property stored under a collection

-   `get-property('registry','gov:<path to resource from governance>@<propertyname>')`
-   `get-property('registry','conf:<path to resource from config>@<propertyname>')`

#### Read a property stored under a resource

-   `get-property('registry','gov:<path to resource from governance>/@<propertyname>')`
-   `get-property('registry','conf:<path to resource from config>/@<propertyname>')`

#### Read an XML resource

-   `get-property('registry','gov:<path to resource from governance>')`
-   `get-property('registry','conf:<path to resource from config>')`

### Read a file stored in the Registry

Following is an example, in which you read an XML file that is stored in the registry using an [expression]({{base_path}}/reference/synapse-properties/expressions), to retrieve a value from it. Assume you have the following XML file stored in the registry in the path `gov:/test.xml`.

**test.xml**

```xml
<root>
  <book>A Song of Ice and Fire</book>
  <author>George R. R. Martin</author>
</root>
```

In the mediation flow, you can use the following expression to read XML.

**reg_xpath.xml**

``` xml
<property name="xmlFile" expression="get-property('registry','gov:/test.xml')" scope="default" type="OM"></property>
<log level="custom">
    <property name="Book_Name" expression="$ctx:xmlFile//book"></property>
</log>
```

Your output log will look like this.

``` text
[2015-09-21 16:01:28,750]  INFO - LogMediator Book_Name = A Song of Ice and Fire
```

### Read SOAP headers

SOAP headers provide information about the message, such as the To and From values. You can use the `get-property()` function in the Property mediator to retrieve these headers. See the [SOAP headers]({{base_path}}/reference/mediators/property-reference/soap-headers) documentation for more information.

For example, the following property stores the `To` header.

```xml
<property name="ToHeader" expression="get-property('To')" scope="axis2"/>
```