# Expressions

In WSO2 Micro Integrator, expressions are a way to dynamically compute values within various integration artifacts such as sequences, proxies, endpoints, and APIs. These expressions are used to extract, transform, and route data as it flows through the integration logic.

## XPath expressions

The WSO2 Micro Integrator supports standard XPath functions and variables through its underlying XPath engine. It supports XPath 1.0 by default where as the support for XPath 2.0 can be introduced by adding the following property in `<MI_HOME>/conf/deployment.toml`.

```toml
[mediation]
synapse.enable_xpath_dom_failover=true
```

The Micro Integrator also provides custom XPath functions and variables for accessing message properties.

### XPath extension functions

In addition to standard XPath functions, the Micro Integrator supports the following custom functions for
working with XPath expressions:

#### `base64Encode()` function

The `base64Encode` function returns the base64-encoded value of the
specified string.

Syntax:

-   `           base64Encode(string value)          `
-   `           base64Encode(string value, string charset)          `
    `                     `

#### `base64Decode()` function

The `base64Decode` function returns the original value of the specified
base64-encoded value.

Syntax:

-   `           base64Decode(string encodedValue)          `
-   `           base64Decode(string           encodedValue           , string charset)          `
    `                     `

#### get-property() function

The `get-property()` function allows any XPath expression used in a configuration to look up information from the current message context. Using the [Property mediator]({{base_path}}/reference/mediators/property-mediator), you can retrieve properties from the message context and header.

The syntax of the function takes the following format.

-   `          get-property(String propertyName)         `
-   `          get-property(String scope, String propertyName)         `

The function accepts scope as an optional parameter. It retrieves a
message property at the given scope, which can be one of the following.

If you provide only the property name without the scope, the default `synapse` scope will be used.

!!! Info
    When the result of an XPath evaluation results in a single XML node, the
    evaluator will return the text content of this node by default
    (equivalent of doing `/root/body/node/text()`). If you want to retrieve
    the node itself, you can configure the [Enrich mediator]({{base_path}}/reference/mediators/enrich-mediator) as shown
    in the following example.
    ``` xml
    <inSequence>
    <log level="custom">
    <property name="WHERE" value="before doing stuff"/>
    </log>
    <enrich>
    <source type="body" clone="true"/>
    <target type="property" property="ENRICH_PROPERTY"/>
    </enrich>
    <property name="PROPERTY_PROPERTY"
    expression="$body/child::node()"
    scope="default"/>
    <log level="custom">
    <property name="WHERE" value="before doing stuff"/>
    <property name="ENRICH_PROPERTY" expression="get-property('ENRICH_PROPERTY')"/>
    <property name="PROPERTY_PROPERTY" expression="get-property('PROPERTY_PROPERTY')"/>
    </log>
    <enrich>
    <source type="property" clone="true" property="ENRICH_PROPERTY"/>
    <target type="body" action="sibling"/>
    </enrich>
    <log level="full"/>
    </inSequence>
    ```

##### Synapse scope

When the scope of a property mediator is `         synapse        ` ,
its value is available throughout both the in sequence and the out
sequence. In addition to the user-defined properties, you can retrieve
the following special properties from the `         synapse        `
scope.

|                 |                                                                                                                                                                   |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name            | Return Value                                                                                                                                                      |
| To              | Incoming URL as a String, or empty string («») if a To address is not defined.                                                                                    |
| From            | From address as a String, or empty string («») if a From address is not defined.                                                                                  |
| Action          | SOAP Addressing Action header value as a String, or empty string («») if an Action is not defined.                                                                |
| FaultTo         | SOAP FaultTo header value as a String, or empty string («») if a FaultTo address is not defined.                                                                  |
| ReplyTo         | ReplyTo header value as a String, or empty string («») if a ReplyTo address is not defined.                                                                       |
| MessageID       | A unique identifier (UUID) for the message as a String, or empty string («») if a MessageID is not defined. This ID is guaranteed to be unique.                   |
| FAULT           | TRUE if the message has a fault, or empty string if the message does not have a fault.                                                                            |
| MESSAGE_FORMAT | Returns pox, get, soap11, or soap12 depending on the message. If a message type is unknown this returns soap12                                                    |
| OperationName   | Operation name corresponding to the message. A proxy service with a WSDL can have different operations. If the WSDL is not defined, ESB defines fixed operations. |


To access a property with the `         synapses        ` cope inside the `         mediate()        ` method of a mediator, you can include the following configuration in a custom mediator created using the [Class mediator]({{base_path}}/reference/mediators/class-mediator):

``` java
public boolean mediate(org.apache.synapse.MessageContext mc) {  
// Available in both in-sequence and out-sequenc  
String propValue = (String) mc.getProperty("PropName");  
System.out.println("SCOPE_SYNAPSE : " + propValue);  
return true;  
}
```

##### axis2 scope

When the scope of a property mediator is `         axis2        ` , its
value is available only throughout the sequence for which the property
is defined (e.g., if you add the property to an in sequence, its value
will be available only throughout the in sequence). You can retrieve
message context properties within the `         axis2        ` scope
using the following syntax.

Syntax:  
`         get-property('axis2', String propertyName)        `

To access a property with the `axis2` scope inside the `mediate()` method of a mediator, you can include the following configuration in a custom mediator created using the [Class mediator]({{base_path}}/reference/mediators/class-mediator):

``` java
public boolean mediate(org.apache.synapse.MessageContext mc) {  
org.apache.axis2.context.MessageContext axis2MsgContext;  
axis2MsgContext = ((Axis2MessageContext) mc).getAxis2MessageContext();  
  
// Available only in the sequence the property is defined.  
String propValue = (String) axis2MsgContext.getProperty("PropName");  
System.out.println("SCOPE_AXIS2 : " + propValue);  
return true;  
} 
```

##### axis2-client

This is similar to the `         synapse                          `
scope. The difference is that it can be accessed inside the
`         mediate()        ` method of a mediator by including one of
the following configurations in a custom mediator, created using the
[Class mediator]({{base_path}}/reference/mediators/class-mediator) :

``` java
public boolean mediate(org.apache.synapse.MessageContext mc) {  
org.apache.axis2.context.MessageContext axis2MsgContext;  
axis2MsgContext = ((Axis2MessageContext) mc).getAxis2MessageContext();  
String propValue = (String) axis2MsgContext.getProperty("PropName");  
System.out.println("SCOPE_AXIS2_CLIENT - 1 : " + propValue); 
```

or

``` java
propValue = (String) axis2MsgContext.getOptions().getProperty("PropName");  
System.out.println("SCOPE_AXIS2_CLIENT - 2: " + propValue);  
return true;  
}  
```

##### transport scope

When the scope of a property mediator is `         transport        ` ,
it will be added to the transport header of the outgoing message from
the ESB profile. You can retrieve message context properties within the
`         transport        ` scope using the following syntax.

Syntax:  
`get-property('transport', String propertyName)        `

##### registry scope

You can retrieve properties within the registry using the following syntax.

Syntax:  
`get-property('registry', String registryPath@propertyName)`  
`get-property('registry', String registryPath)`

##### system scope

You can retrieve Java System properties using the following syntax.

Syntax:  
`get-property('system', String propertyName)`

##### environment scope

You can retrieve environment variables using the following syntax.

Syntax:  
`get-property('env', String propertyName)`

##### file scope

You can retrieve properties defined in the `file.properties` configuration file using the following syntax. Properties in the file are reloaded periodically according to the time interval defined by the `file.properties.sync.interval` system property in seconds. If this interval is not defined, changes to the properties will not be reloaded automatically during runtime.

Syntax:  
`get-property('file', String propertyName)`

##### operation scope

You can retrieve a property in the operation context level from the
`         operation        ` scope. The properties within
iterated/cloned message with the `         operation        ` scope are
preserved in the in sequence even if you have configured your API
resources to be sent through the fault sequence when faults exist. A
given property with the `         operation        ` scope only exists
in a single request and can be accessed by a single resource. The
properties in this scope are passed to the error handler when the
`         FORCE_ERROR_ON_SOAP_FAULT        ` property is set to
`         true        ` . See `FORCE_ERROR_ON_SOAP_FAULT` section in [Generic Properties]({{base_path}}/reference/mediators/property-reference/generic-properties) for more information.

Syntax:  
`         get-property('operation', String propertyName)        `

#### url-encode() function

The url-encode function returns the URL-encoded value of the specified
string.

Syntax:

-   url-encode(string value)
-   url-encode(string value, string charset)

### Synapse XPath variables

There is a set of predefined XPath variables that you can directly use
to write XPaths in the Synapse configuration, instead of using the
synapse:get-property() function . These XPath variables get properties
of various scopes as follows:

#### $ctx

Prefix for Synapse MessageContext properties and gets a property at the default scope. For example, to get the value of Synapse message context property with name `ERROR_MESSAGE`, use the XPath expression `$ctx:ERROR_MESSAGE`. We have discussed an example below.

**Example of $ctx usage**:

This example sends a request to a sample proxy service, and sets the
target endpoint to a non-existent endpoint reference key. It causes a
mediation fault, which triggers the fault sequence.

Deploy the following proxy service. For instructions, see [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

Note the property, `<property name="stockerrorprop" expression="$ctx:ERROR\_MESSAGE"/\>` in the fault sequence configuration. It is used to log the error message that occurs due to a  mediation fault.

``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
       <target>
          <inSequence>
            <call>
                <endpoint key="ep2"/>
             </call>
             <respond/>   
          </inSequence>
          <faultSequence>
             <log>
                <property name="stockerrorprop" expression="$ctx:ERROR_MESSAGE"/>
                <property name="Cause" expression="get-property('ERROR_MESSAGE')"/>
             </log>
          </faultSequence>
       </target>
    </proxy> 
```

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

Note the following message in the log.

``` java
INFO - LogMediator To: /services/StockQuoteProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:54205f7d-359b-4e82-9099-0f8e3bf9d014, Direction: request, stockerrorprop = Couldn't find the endpoint with the key : ep2 
```

In this example, the property definition, `<property
name="stockerrorprop" expression="$ctx:ERROR\_MESSAGE"/\>` is equivalent
to `<property name="stockerrorprop"
expression="get-property('ERROR\_MESSAGE')"/\>`.

Similarly, you can use `$ctx` prefix with [Generic Properties]({{base_path}}/reference/mediators/property-reference/generic-properties).

#### $trp

Prefix used to get the transport headers. For example, to get the
transport header named Content-Type of the current message, use the
XPath expression **$trp:Content-Type** . HTTP transport headers are not
case sensitive. Therefore, $trp:Content-Type and $trp:CONTENT-TYPE are
regarded as the same. We have discussed an example below.

**Example of $trp usage:**

Deploy the following proxy service. For instructions, see [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

Note the property, `<property name="stockprop" expression="$trp:Content-Type"/\>` in the configuration, which is used to log the `Content-Type` HTTP header of the request message.

``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
       <target>
          <inSequence>
             <log>
                 <property name="stockprop" expression="$trp:Content-Type"/>
             </log>
             <call>
                <endpoint>
                   <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
             </call>
             <respond/>
          </inSequence>
       </target>
    </proxy> 
```

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

Note the following message in the log.

``` java
[2013-03-18 12:23:14,101] INFO - LogMediator To: http://localhost:8280/services/StockQuoteProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:25a3143a-5b18-4cbb-b8e4-27d4dd1895d2, Direction: request, stockprop = text/xml; charset=UTF-8 
```

In this example, the property definition, `<property name="stockprop"
expression="$trp:Content-Type"/\>` is equivalent to `<property
name="stockprop"
expression="get-property('transport','Content-Type')"/\>`. Similarly, you
can use `$trp` prefix with [HTTP Transport
Properties]({{base_path}}/reference/mediators/property-reference/http-transport-properties) .

#### $body

The SOAP 1.1 or 1.2 body element. For example, the expression `$body//getQuote` refers to the first `getQuote` element in a SOAP body, regardless of whether the message is SOAP-11 or SOAP-12. We have discussed an example below.

**Example of $body usage**:

Deploy the following proxy service using instructions in [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

Note the property, `<property xmlns:m0="http://services.samples" name="stockprop" expression="$body//m0:getQuote"/>` in the configuration. It is used to log the first `<m0:getQuote>` element of the request SOAP body.

    ``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
       <target>
          <inSequence>
             <log>
                <property xmlns:m0="http://services.samples" name="stockprop" expression="$body//m0:getQuote"/>
             </log>
             <call>
                <endpoint>
                   <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
             </call>
             <respond/>
          </inSequence>
       </target>
    </proxy> 
    ```

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

Note the following message in the log.

``` java
[2013-03-18 14:04:41,019] INFO - LogMediator To: /services/StockQuoteProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:930f68f5-199a-4eff-90d2-ea679c2362ab, Direction: request, stockprop = <m0:getQuotexmlns:m0="http://services.samples"><m0:request><m0:symbol>IBM</m0:symbol></m0:request></m0:getQuote>
```

#### $header

The SOAP 1.1 or 1.2 header element. For example, the expression
`$header/wsa:To` refers to the addressing `To` header regardless of
whether this message is SOAP-11 or SOAP-12. We have discussed an example
below.

**Example of $header usage** :

Deploy the following proxy service using instructions in [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

Note the property, `<property xmlns:wsa="http://www.w3.org/2005/08/addressing" name="stockprop" expression="$header/wsa:To"/>` in the configuration. It is used to log the value of **wsa:To** header of the SOAP request.

``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
       <target>
          <inSequence>
             <log>
                <property xmlns:wsa="http://www.w3.org/2005/08/addressing" name="stockprop" expression="$header/wsa:To"/>
             </log>
             <call>
                <endpoint>
                   <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
             </call>
             <respond/>
          </inSequence>
       </target>
    </proxy> 
```

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

Note the following message in the log.

``` java
    [2013-03-18 14:14:16,356] INFO - LogMediator To: http://localhost:9000/services/SimpleStockQuoteService, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:8a64c9cb-b82f-4d6f-a45d-bef37f8b664a, Direction: request,
    stockprop = http://localhost:9000/services/SimpleStockQuoteService
```

#### $axis2

Prefix for Axis2 MessageContext properties. This is used to get the
property value at the axis2 scope. For example, to get the value of
Axis2 message context property with name `REST_URL_POSTFIX`, use the
XPath expression `$axis2:REST_URL_POSTFIX`. We have discussed an
example below.

**Example of $axis2 usage** :

Deploy the following proxy service. For instructions, see [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

Note the property, `<property name="stockprop" expression="$axis2:REST_URL_POSTFIX"/>` in the configuration which is used to log the `REST_URL_POSTFIX`
value of the request message.

``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https,http" statistics="disable" trace="disable" startOnLoad="true">
       <target>
          <inSequence>
             <log>
                <property name="stockprop" expression="$axis2:REST_URL_POSTFIX"/>
             </log>
             <call>
                <endpoint>
                  <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
             </call>
             <respond/>
          </inSequence>
       </target>
    </proxy>
```

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```
   
Note the following message in the log.

``` java
INFO - LogMediator To: http://localhost:8280/services/StockQuoteProxy/test/prefix, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:ecd228c5-106a-4448-9c83-3b1e957e2fe5, Direction: request, stockprop = /test/prefix
```

In this example, the property definition,
`         <property name="stockprop" expression="$axis2:REST_URL_POSTFIX"/>        `
is equivalent to
`         <property name="stockprop" expression="get-property('axis2','REST_URL_POSTFIX')"/>        `

Similarly, you can use `$axis2` prefix with [HTTP Transport Properties]({{base_path}}/reference/mediators/property-reference/http-transport-properties.md).

#### $url

The prefix used to get the URI element of a request URL.

**Example of $url usage:**

1.  Create a REST API with the following configuration using instructions given in page [Working with APIs]({{base_path}}/develop/creating-artifacts/creating-an-api).

    ``` xml
    <api xmlns="http://ws.apache.org/ns/synapse" name="Editing" context="/editing">
       <resource methods="GET" uri-template="/edit?a={symbol}&b={value}">
          <inSequence>
             <log level="full">
                <property name="SYMBOL" expression="$url:a"></property>
                <property name="VALUE" expression="$url:b"></property>
             </log>
             <respond></respond>
          </inSequence>
       </resource>
    </api>
    ```

2.  Send a request to the REST API you created using a browser as
    follows:

    ``` xml
    http://10.100.5.73:8280/editing/edit?a=wso2&b=2.4
    ```

    You will see the following in the log:

    ``` xml
    LogMediator To: /editing/edit?a=wso2&b=2.4, MessageID: urn:uuid:36cb5ad7-f150-490d-897a-ee7b86a9307d, Direction: request, SYMBOL = wso2, VALUE = 2.4, Envelope: <?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"><soapenv:Body></soapenv:Body></soapenv:Envelope>
    ```

#### $func

The prefix used to refer to a particular parameter value passed
externally by an invoker such as the [Call Template
Mediator]({{base_path}}/reference/mediators/call-template-mediator).

**Example of $func usage:**

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

Deploy the following proxy service. For instructions, see [Creating a Proxy Service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

``` xml
    <proxy xmlns="http://ws.apache.org/ns/synapse"
           name="StockQuoteProxy"
           transports="https,http"
           statistics="disable"
           trace="disable"
           startOnLoad="true">
       <target>
          <inSequence>
             <call-template target="HelloWorldLogger">
                <with-param name="message" value="HelloWorld"/>
             </call-template>
             <call>
                <endpoint>
                  <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                </endpoint>
             </call>
             <log/>
             <respond/>
          </inSequence>
       </target>
    </proxy>
```

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux/CentOS"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

Note the following message in the log.

``` xml
LogMediator To: http://localhost:8280/services/StockQuoteProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, ReplyTo: http://www.w3.org/2005/08/addressing/anonymous, MessageID: urn:uuid:8d90e21b-b5cc-4a02-98e2-24b324fa704c, Direction: request, message = HelloWorld
```

#### $env

Prefix used to get a SOAP 1.1 or 1.2 envelope level element. For example, to get the body element from the SOAP envelope, use the expression `$env/\*\[local-name()='Body'\]`.

**Example of $env usage:**

1.  Create an API with the following configuration. For information on how to create an API, see [Working with APIs]({{base_path}}/develop/creating-artifacts/creating-an-api).

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
    
## JSONPath expressions

JSONPath is used for navigating and querying JSON data. Similar to XPath for XML, JSONPath allows you to extract specific data from JSON documents. It's commonly used in scenarios where messages or payloads are in JSON format, enabling you to manipulate and route data based on its content.

JSONPath expressions are used within mediators like Log, Filter, Property, and Script mediators to access and manipulate JSON data.
`json-eval` function in expressions is used to specify JSONPath

- JSONPath expressions are written in a specific syntax to navigate through the JSON structure.
- The syntax typically starts with $ to represent the root of the JSON document.
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

!!! Info
    During mediation, evaluating expressions against a property does not modify the original payload. The changes will be reflected within the property itself and hence, it cannot be expected to get applied for the rest of the mediation similar to payload modification.

We can also evaluate a JSONPath expression against a property that contains a JSON payload.

To evaluate a JSONPath expression against a  property, use the following syntax.

```json
json-eval(<scope_of_the_property>:<property_name>.<JSONPath_expression>)
```

Example 1: When the property is in the synapse message context.

```json
json-eval($ctx:propertyName.student.name)
```

Example 2: When the property is in the axis2 message context.

```json
json-eval($axis2:propertyName.student.name)
```

Example 3: When the property is in the transport scope.

```json
json-eval($trp:propertyName.student.name)
```

Learn more about [JSONPath syntax](http://goessner.net/articles/JsonPath/).




