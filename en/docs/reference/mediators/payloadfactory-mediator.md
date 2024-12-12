# PayloadFactory mediator

The **PayloadFactory Mediator** transforms or replaces the contents of a
message. That is, you can configure the format of the request or response
using a template with inline [Synapse expressions]({{base_path}}/reference/synapse-properties/synapse-expressions).

You can use two methods to format the payload using this mediator.

-   Use the **default** template to write the payload in the required format (JSON, XML, or text).
-   Use the **FreeMarker** template to write the payload. This is particularly useful when 
    defining complex JSON payloads.

## Syntax

``` java
<payloadFactory media-type="xml | json" template-type="default | freemarker">
    <format/>
</payloadFactory>
```

## Configuration

Parameters available to configure the PayloadFactory mediator are as follows:

<table>
  <tr>
    <th>
      Parameter Name
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      Content Type
    </td>
    <td>
      This parameter is used to specify whether the message payload should be formatted in JSON, XML, or Text.
    </td>
  </tr>
  <tr>
    <td>
      Payload
    </td>
    <td>
      Define the payload using a template with inline Synapse expressions.
    </td>
  </tr>
</table>

### Advanced configurations

Parameters available to configure advanced properties of the PayloadFactory mediator are as follows:

<table>
  <tr>
    <th>
      Parameter Name
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      Template Type
    </td>
    <td>
      The template type determines how you define a new payload. Select one of the following template types:
      <ul>
        <li>
          <b>default</b>: If you select this template type, you can define the payload using the normal syntax of the specified media type.
        </li>
        <li>
          <b>FreeMarker</b>: If you select this template type, the mediator will accept FreeMarker templates to define the payload.
        </li>
      </ul>
            See the examples given below for details.
    </td>
  </tr>
  <tr>
    <td>
      Use a Template Resource
    </td>
    <td>
      If this is selected, you can import or create a template from resources.
    </td>
  </tr>
</table>

You need to specify the payload format depending on the <b>Template Type</b> you specified in the mediator configuration.

### Default template

If you select **default** as the **Template Type**, you can define the payload using inline synapse expressions as shown below. This example defines a JSON payload.

```xml
<payloadFactory description="Construct payload for addition operation" media-type="json">
    <format>
        {
            "AddInteger": {
                "Arg1": ${payload.grocery.arg1}
                "Arg2": ${payload.grocery.arg2}
            }
        }
    </format>
</payloadFactory>
```

### FreeMarker template

The PayloadFactory mediator supports [FreeMarker Templates](https://freemarker.apache.org/docs/). If you select **freemarker** as the **Template Type**, you can define the payload as a FreeMarker template. The following example defines a JSON payload.

!!! Note
    -   FreeMarker version 2.3.30 is tested with WSO2 MI 4.x.x.
    -   The CDATA will be added automatically when configuring the payload using WSO2 Micro Integrator VSCode extension.

```xml
<variable name="customer_id" type="STRING" value="43672343"/>
<payloadFactory media-type="json" template-type="freemarker">
    <format><![CDATA[{
        "name": "${payload.customer_name}"
        "customer_id" : "${var.customer_id}",
        "axis2 property": "${axis2.REST_URL_POSTFIX}",
        "trp property": "${trp.Host}"
        }]]>
    </format>
</payloadFactory>
```

When you use the FreeMarker template type as shown above, note that the script is wrapped inside a CDATA tag. This is applicable for all media types when the payload is defined **inline**. If you get the payload as a resource, the CDATA tag does not apply.

The following root variables are available when you format a FreeMarker payload:

<table>
  <tr>
    <th>
      <code>payload</code>
    </th>
    <td>
      This variable represents the current payload in the message context. It can be JSON, XML, or TEXT. Regardless of the payload type, the payload variable is a <a href="https://freemarker.apache.org/docs/pgui_datamodel_parent.html#autoid_32">FreeMarker Hash type container</a>.
    </td>
  </tr>
  <tr>
    <th>
      <code>var</code>
    </th>
    <td>
      You can use the var variable to access variables. For example, if you have a variable named <code>customer_id</code>, you can get the variable in the FreeMarker template by using <code>var.customer_id</code>.
    </td>
  </tr>
  <tr>
    <th>
      <code>ctx</code>
    </th>
    <td>
      You can use the ctx variable to access properties with the 'default' scope. For example, if you have a property named <code>endpoint_status</code> in the default scope, you can get the property in the FreeMarker template by using <code>ctx.endpoint_status</code>.
    </td>
  </tr>
  <tr>
    <th>
      <code>axis2</code>
    </th>
    <td>
      This represents all the axis2 properties.
    </td>
  </tr>
  <tr>
    <th>
      <code>trp</code>
    </th>
    <td>
      This variable represents transport headers. You can access transport header values in the same way as accessing properties.
    </td>
  </tr>
</table>

See the [Freemarker examples](#examples-using-the-freemarker-template) for details.

## Examples: Using the default template

### Using XML

!!! Note
    When you need to access XML with custom namespaces, you need to first assign the result to a variable and then use it in the Payload Factory mediator.
    ```xml
    <variable name="symbol" type="STRING" expression="${xpath('//m0:Code')}" xmlns:m0="http://services.samples"/>
    ```

```xml
<proxy name="RespondMediatorProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
     <target>
        <inSequence>
            <variable name="symbol" type="STRING" expression="${xpath('//m0:Code')}" xmlns:m0="http://services.samples"/>
            <!-- using payloadFactory mediator to transform the message -->
            <payloadFactory media-type="xml">
                <format>
                    <m:getQuote xmlns:m="http://services.samples">
                        <m:request>
                            <m:symbol>${var.symbol}</m:symbol>
                        </m:request>
                    </m:getQuote>
                </format>
            </payloadFactory>
            <respond/>
        </inSequence>
     </target>
</proxy>
```

### Using JSON

```xml
<payloadFactory media-type="json">
    <format>
        {
            "coordinates": null,
            "created_at": "Fri Jun 24 17:43:26 +0000 2011",
            "truncated": false,
            "favorited": false,
            "id_str": "${payload.entities.hashtags[0].text}",
            "entities": {
                "urls": [

                ],
                "hashtags": [
                    {
                        "text": "${payload.entities.hashtags.text}",
                        "indices": [
                            35,
                            45
                        ]
                    }
                ],
                "user_mentions": [

                ]
            },
            "in_reply_to_user_id_str": null,
            "contributors": null,
            "text": "${payload.user.id}",
            "retweet_count": 0,
            "id": "##",
            "in_reply_to_status_id_str": null,
            "geo": null,
            "retweeted": false,
            "in_reply_to_user_id": null,
            "source": "&lt;a href=\"http://sites.google.com/site/yorufukurou/\rel=\"nofollow\"&gt;YoruFukurou&lt;/a&gt;",
            "in_reply_to_screen_name": null,
            "user": {
                "id_str": "##",
                "id": "##"
            },
            "place": null,
            "in_reply_to_status_id": null
        }
    </format>
</payloadFactory>
```

### Suppressing the namespace

To prevent the MI from adding the default Synapse namespace in
an element in the payload format, use <code>xmlns=""</code> as shown in the following example.

``` java
<ser:getPersonByUmid xmlns:ser="http://service.directory.com">
    <umid xmlns="">sagara</umid>
</ser:getPersonByUmid>     
```

### Including a complete SOAP envelope as the format

In the following configuration, an entire SOAP envelope is added as the
format defined inline. This is useful when you want to generate the
result of the PayloadFactory mediator as a complete SOAP message with
SOAP headers.

```xml
<payloadFactory media-type="xml"> 
    <format> 
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> 
            <soapenv:Body> 
                <error> 
                <mes>${payload.message}</mes>
                </error> 
            </soapenv:Body> 
        </soapenv:Envelope> 
    </format> 
</payloadFactory>
```

### Uploading a file to an HTTP endpoint via a multipart request

The below example configuration uses VFS to upload the file in the
specified location to the given HTTP endpoint via an HTTP multipart
request.

```xml
<proxy xmlns="http://ws.apache.org/ns/synapse"
       name="smooksample"
       startOnLoad="true"
       statistics="disable"
       trace="disable"
       transports="vfs">
   <target>
      <inSequence>
         <enrich>
            <source clone="true" type="body"/>
            <target property="originalBody" type="property"/>
         </enrich>
         <payloadFactory media-type="xml">
            <format>
               <root xmlns="">
                  <customFieldOne>ABC</customFieldOne>
                  <customFieldTwo>DEF</customFieldTwo>
                  <file xmlns="http://org.apache.axis2/xsd/form-data"
                        charset="US-ASCII"
                        content-type="text/plain"
                        filename="${headers.FILE_NAME}"
                        name="file1">${properties.synapse.originalBody}</file>
               </root>
            </format>
         </payloadFactory>
         <header name="Content-Type" scope="transport" value="multipart/form-data"/>
         <property name="messageType"
                   scope="axis2"
                   type="STRING"
                   value="multipart/form-data"/>
         <property name="OUT_ONLY" scope="default" type="STRING" value="true"/>
         <call>
            <endpoint>
               <address format="rest" uri="http://localhost:3000/upload/"/>
            </endpoint>
         </call>
      </inSequence>
   </target>
   <parameter name="transport.PollInterval">5</parameter>
   <parameter name="transport.vfs.FileURI">file:///<YOUR_FILE_LOCATION></parameter>
   <parameter name="transport.vfs.ContentType">application/octet-stream</parameter>
   <parameter name="transport.vfs.ActionAfterProcess">DELETE</parameter>
   <parameter name="transport.vfs.FileNamePattern">.*\..*</parameter>
   <description/>
</proxy>
```

In the above example, the following property mediator configuration sets
the message type as <code>multipart/form-data</code> .

```xml
<property name="messageType"
    scope="axis2"
    type="STRING"
    value="multipart/form-data"/>
```

The below <code>file</code> parameter of the payload factory
mediator defines the HTTP multipart request.

!!! Tip
    Do not change the <code>http://org.apache.axis2/xsd/form-data</code> namespace.

```xml
<file xmlns="http://org.apache.axis2/xsd/form-data"
    charset="US-ASCII"
    content-type="text/plain"
    filename="${headers.FILE_NAME}"
    name="file1">${properties.synapse.originalBody}</file>
```

Also, the below property mediator configuration sets the content of the
uploaded file.

```xml
<header name="Content-Type" scope="transport" value="multipart/form-data"/>
```

### Adding a literal value

To have a literal value, you need to enclose the synapse expression with double quotes(<code>"${expression}"</code>). This allows you to consider the expression result as a literal string and to stop processing it.

```xml
<api context="/payload" name="payload" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/">
        <inSequence>
            <payloadFactory media-type="json">
                <format>{"newValue" : "${xpath('//pet')}"}</format>
            </payloadFactory>
            <respond />
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

Following is a sample payload (i.e., <code>request.xml</code> file), which you can process using the above configuration.

**request.xml**

```xml
<pet><name>John</name><age>5</age></pet>
```

You can use the below sample cURL command to send the request to the
above configuration.

```bash
curl -d @request.xml http://localhost:8280/payload -H "Content-Type: application/xml" -v
```

You view the below output:

```json
{
    "newValue": "<pet><name>John</name><age>5</age></pet>"
}
```

!!! Info
    If you do not use double quotes(<code>"${expression}"</code>) in the Payload Factory mediator of the above configuration, you view the output as follows:

    ```json
    {
        "newValue": {
            "pet": {
                "name": "John",
                "age": 5
            }
        }
    }
    ```

If you want to evaluate a valid JSON object as a string, you can use double quotes(<code>"${expression}"</code>) in the PayloadFactoryMediator as indicated below,

```xml
<payloadFactory media-type="json">
    <format> { "message":{ "payload_string": "${payload.dataObject}" } }
    </format>
</payloadFactory> 
```

### Adding a custom SOAP header

You can add custom SOAP headers to a request by using the PayloadFactory
Mediator in a proxy service as shown in the example below.

```xml
<proxy
    xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy"
    transports="https http"
    startOnLoad="true"
    trace="disable">
    <description/>
    <target>
        <endpoint>
            <address uri="http://localhost:9001/services/SimpleStockQuoteService"/>
        </endpoint>
        <inSequence>
            <log level="full"/>
            <payloadFactory media-type="xml">
                <format>
                    <soapenv:Envelope
                        xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"
                        xmlns:xsd="http://services.samples/xsd"
                        xmlns:ser="http://services.samples">
                        <soapenv:Header>
                            <ser:authenticationRequest>
                                <userName xmlns="">${payload.data.username}</userName>
                                <password xmlns="">${payload.data.password}</password>
                            </ser:authenticationRequest>
                        </soapenv:Header>
                        <soapenv:Body>
                            <ser:getQuote>
                                <ser:request>
                                    <xsd:symbol>${var.request.symbol}</xsd:symbol>
                                </ser:request>
                            </ser:getQuote>
                        </soapenv:Body>
                    </soapenv:Envelope>
                </format>
            </payloadFactory>
            <respond/>
        </inSequence>
        <faultSequence>
            <sequence key="errorHandler"/>
        </faultSequence>
    </target>
    <publishWSDL preservePolicy="false" uri="file:repository/samples/resources/proxy/sample_proxy_1.wsdl"/>
</proxy>
```

```xml
<sequence xmlns="http://ws.apache.org/ns/synapse" name="errorHandler">
    <log level="full">
        <property name="MESSAGE" value="Executing default "fault" sequence"/>
        <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
        <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
    </log>
    <drop/>
</sequence>
```

## Examples: Using the FreeMarker template

### XML to JSON transformation

This example shows how an XML payload can be converted to a JSON payload using a freemarker template.

-   Input Payload
    ```xml
    <user>
        <first_name>John</first_name>
        <last_name>Deo</last_name>
        <age>35</age>
        <location>
            <state code="NY">New York</state>
            <city>Manhattan</city>
        </location>
    </user>
    ```

-   Output Payload
    ```json
    {
        "Name": "John Doe",
        "Age": 35,
        "Address": "Manhattan, NY"
    }
    ```

-   FreeMarker Tamplate
    ```json
    {
        "Name": "${payload.user.first_name} ${payload.user.last_name}",
        "Age": "${payload.user.age}",
        "Address": "${payload.user.location.city},${payload.user.location.state.@code}"
    }
    ```

-   Synapse Code
    ```xml
    <payloadFactory media-type="json" template-type="freemarker">
        <format>
            <![CDATA[{
                "Name": "${payload.user.first_name} ${payload.user.last_name}",
                "Age": ${payload.user.age},
                "Address": "${payload.user.location.city},${payload.user.location.state.@code}"
            }]]>
        </format>
    </payloadFactory>
    ```

You can get more info on how to use XML payloads from [FreeMarker's official documentation](https://freemarker.apache.org/docs/xgui.html).

### JSON to XML transformation

This example shows how a JSON payload can be converted to an XML payload using a freemarker template.

-   Input Payload
    ```json
    {
    "first_name": "John",
    "last_name": "Deo",
    "age": 35,
        "location": {
            "state": {
                "code": "NY",
                "name": "New York"
            },
            "city": "Manhattan"
        }
    }
    ```

-   Output Payload
    ```xml
    <user>
        <Name>John Deo</Name>
        <Age>35</Age>
        <Address>Manhattan, NY</Address>
    </user>
    ```

-   FreeMarker Tamplate
    ```xml
    <user>
        <Name>${payload.first_name} ${payload.last_name}</Name>
        <Age>${payload.age}</Age>
        <Address>${payload.location.city}, ${payload.location.state.code}</Address>
    </user>
    ```

-   Synapse Code
    ```xml
    <payloadFactory media-type="xml" template-type="freemarker">
        <format><![CDATA[<user>
        <Name>${payload.first_name} ${payload.last_name}</Name>
        <Age>${payload.age}</Age>
        <Address>${payload.location.city}, ${payload.location.state.code}</Address>
        </user>]]>
        </format>
    </payloadFactory>
    ```

### JSON to JSON transformation

This example shows how a JSON payload is transformed into another JSON format using a freemarker template.

-   Input Payload
    ```json
    {
    "first_name": "John",
    "last_name": "Deo",
    "age": 35,
    "location": {
            "state": {
                "code": "NY",
                "name": "New York"
            },
            "city": "Manhattan"
        }
    }
    ```

-   Output Payload
    ```json
    {
        "Name": "John Doe",
        "Age": 35,
        "Address": "Manhattan, NY"
    }
    ```

-   FreeMarker Tamplate
    ```json
    {
        "Name": "${payload.first_name} ${payload.last_name}",
        "Age": "${payload.age}",
        "Address": "${payload.location.city}, ${payload.location.state.code}"
    }
    ```

-   Synapse Code
    ```xml
    <payloadFactory media-type="json" template-type="freemarker">
        <format>
            <![CDATA[{
                "Name": "${payload.first_name} ${payload.last_name}",
                "Age": ${payload.age},
                "Address": "${payload.location.city}, ${payload.location.state.code}"
            }]]>
        </format>
    </payloadFactory>
    ```

### Handling arrays

#### XML arrays

This example shows how to loop through an XML array in the input payload and then transform the data using a freemarker template.

-   Input Payload
    ```xml
    <people>
        <person>
            <id>1</id>
            <first_name>Veronika</first_name>
            <last_name>Lacroux</last_name>
        </person>
        <person>
            <id>2</id>
            <first_name>Trescha</first_name>
            <last_name>Campaigne</last_name>
        </person>
        <person>
            <id>3</id>
            <first_name>Mayor</first_name>
            <last_name>Moscrop</last_name>
        </person>
    </people>
    ```

-   Output Payload
    ```xml
    <people>
        <person>
            <index>1</index>
            <name>Veronika Lacroux</first_name>
        </person>
        <person>
            <index>2</index>
            <name>Trescha Campaigne</name>
        </person>
        <person>
            <index>3</index>
            <name>Mayor Moscrop</name>
        </person>
    </people>
    ```

    Note that, we have looped through the person list in the input XML, and received a person list in the output. However, the name attribute in the output is a combination of the first_name and last_name attributes from the input.

-   FreeMarker Tamplate
    ```xml
    <people>
        <#list payload.people.person as person>
        <person>
            <index>${person.id}</index>
            <name>${person.first_name} ${person.last_name}</name>
        </person>
        </#list>
    </people>
    ```

    In this FreeMarker template, we are using the list directive. This is used to loop through a list in the input and transform it into another structure in the output. You can get more information about the list directive from [FreeMarker documentation](https://freemarker.apache.org/docs/ref_directive_list.html).

-   Synapse Code
    ```xml
    <payloadFactory media-type="xml" template-type="freemarker">
        <format>
            <![CDATA[<people>
            <#list payload.people.person as person>
            <person>
                <index>${person.id}</index>
                <name>${person.first_name} ${person.last_name}</name>
            </person>
            </#list>
            </people>]]>
        </format>
    </payloadFactory>
    ```

#### JSON arrays

This example shows how to loop through a JSON array in the input payload and then transform the data using a freemarker template.

-   Input Payload
    ```json
    [
        {
            "id":1,
            "first_name":"Veronika",
            "last_name":"Lacroux"
        },
        {
            "id":2,
            "first_name":"Trescha",
            "last_name":"Campaigne"
        },
        {
            "id":3,
            "first_name":"Mayor",
            "last_name":"Moscrop"
        }
    ]
    ```

-   FreeMarker Tamplate
    ```xml
    <people>
    <#list payload as person>
    <person>
        <index>${person.id}</index>
        <name>${person.first_name} ${person.last_name}</name>
    </person>
    </#list>
    </people>
    ```

    As you can see here, it is almost the same as the XML list. You have to use an identical syntax to loop through a JSON array.

-   Synapse Code
    ```xml
    <payloadFactory media-type="xml" template-type="freemarker">
        <format>
            <![CDATA[<people>
            <#list payload as person>
            <person>
                <index>${person.id}</index>
                <name>${person.first_name} ${person.last_name}</name>
            </person>
            </#list>
            </people>]]>
        </format>
    </payloadFactory>
    ```

### Generating CSV payloads

Using FreeMarker templates, it is straightforward to generate text payloads. The payload you generate could be plain text, a CSV, or EDI, and any other text related format. In this example, we are showing how to transform an XML payload into a CSV payload. 

-   Input Payload
    ```xml
    <people>
        <person>
            <id>1</id>
            <first_name>Veronika</first_name>
            <last_name>Lacroux</last_name>
        </person>
        <person>
            <id>2</id>
            <first_name>Trescha</first_name>
            <last_name>Campaigne</last_name>
        </person>
        <person>
            <id>3</id>
            <first_name>Mayor</first_name>
            <last_name>Moscrop</last_name>
        </person>
    </people>
    ```

-   Output Payload
    ```
    ID,First Name, Last Name
    1,Veronika,Lacroux
    2,Trescha,Campaigne
    3,Mayor,Moscrop
    ```

    In this output, we have converted the person list in the XML payload into a CSV payload.

-   FreeMarker Tamplate
    ```
    ID,First Name, Last Name
    <#list payload.people.person as person>
    ${person.id},${person.first_name},${person.last_name}
    </#list>
    ```

    In this template, we define the CSV structure and fill it by looping through the payload list. If the input payload is JSON, there will not be a significant difference in this template. See the example on [Handling Arrays](#handling-arrays) to understand the difference between JSON and XML array traversing.

-   Synapse Code
    ```xml
    <payloadFactory media-type="text" template-type="freemarker">
        <format><![CDATA[ID,First Name, Last Name
                <#list payload.people.person as person>
                ${person.id},${person.first_name},${person.last_name}
                </#list>]]>
        </format>
    </payloadFactory>
    ```

    If you don’t know the CSV column names and the number of columns, you can use a FreeMarker template like the following to generate a CSV for the given XML. 

    ```xml
    <#list payload.people.person[0]?children?filter(c -> c?node_type == 'element') as c>${c?node_name}<#sep>,</#list>
    <#list payload.people.person as person>
    <#list person?children?filter(c -> c?node_type == 'element') as c>${c}<#sep>,</#list>
    </#list>
    ```
### XML to EDI transformation

This example shows how an XML payload can be converted to an EDI format using a freemarker template. In this example, we have referenced the freemarker template as a registry resource.
See the instructions on how to [build and run](#build-and-run) this example.

=== "XMLtoEDI - Proxy" 
    ```xml 
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="xml-to-edi-proxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <payloadFactory media-type="text" template-type="freemarker">
                    <format key="conf:custom/template.ftl"/>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "template.ftl - Registry Resource"
    ```injectedfreemarker 
    <#-- Assign * as element separator -->
    <#assign element_separator="*">
    <#-- Assign ! as segment terminator -->
    <#assign segment_terminator="!">
    <#-- Interchange Control Header -->
    ISA${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Authorization_Information_Qualifier}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Authorization_Information}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Security_Information_Qualifier}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Security_Information}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_ID_Qualifier[0]}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Sender_ID}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_ID_Qualifier[1]}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Receiver_ID}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Date}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Time}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Control_Standards_ID}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Control_Version_Nbr}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Interchange_Control_Number}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Acknowledgment_Request}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Test_Indicator}${element_separator}${payload.UniversalTransaction.Interchange_Control_Header.Subelement_Separator}${segment_terminator}
    <#-- Functional_Group_Header -->
    GS${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Functional_Identifier_Code}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Application_Senders_Code}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Application_Receivers_Code}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Date}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Time}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Group_Control_Number}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Responsible_Agency_Code}${element_separator}${payload.UniversalTransaction.Functional_Group_Header.Industry_ID}${segment_terminator}
    <#-- Transaction_Set_Header -->
    ST${element_separator}${payload.UniversalTransaction.Transaction_Set_Header.Transaction_Set_Identifier_Code}${element_separator}${payload.UniversalTransaction.Transaction_Set_Header.Transaction_Set_Control_Number}${segment_terminator}
    <#-- Begin_Invoice -->
    BIG${element_separator}${payload.UniversalTransaction.Begin_Invoice.Invoice_Date}${element_separator}${payload.UniversalTransaction.Begin_Invoice.Invoice_Number}${element_separator}${payload.UniversalTransaction.Begin_Invoice.PO_Date[0]!''}${element_separator}${payload.UniversalTransaction.Begin_Invoice.PO_Number}${element_separator}${payload.UniversalTransaction.Begin_Invoice.Release_Number[0]!''}${element_separator}${payload.UniversalTransaction.Begin_Invoice.Changed_Order_Sequence[0]!''}${element_separator}${payload.UniversalTransaction.Begin_Invoice.Transaction_Type_Code[0]!''}${segment_terminator}
    <#-- Currency -->
    CUR${element_separator}${payload.UniversalTransaction.Currency.Entity_Identifier_Code}${element_separator}${payload.UniversalTransaction.Currency.Currency_Code}${segment_terminator}
    <#-- Reference_Identification -->
    <#list payload.UniversalTransaction.Reference_Identification as ref>
      <#assign REF="REF${element_separator}${ref.Reference_Identification_Qualifier[0]!''}${element_separator}${ref.Reference_Identification[0]!''}${segment_terminator}">
    ${REF}
    </#list>
    <#-- Name -->
    <#list payload.UniversalTransaction.Name as name>
      <#assign N1="N1${element_separator}${name.Entity_Identifier_Code[0]!''}${element_separator}${name.Name[0]!''}${segment_terminator}">
    ${N1}
    </#list>
    <#-- Total -->
    TDS${element_separator}${payload.UniversalTransaction.Total_invoice_amount}${segment_terminator}
    <#-- Service, Promotion, Allowance, or Charge Information  -->
    <#list payload.UniversalTransaction.SAC_Information as sac>
      <#assign SAC="SAC${element_separator}${sac.Allowance_or_Charge_Indicator[0]!''}${element_separator}${sac.Service_or_Charge_Code[0]!''}${element_separator}${sac.SAC_03[0]!''}${element_separator}${sac.SAC_04[0]!''}${element_separator}${sac.Amount[0]!''}${element_separator}${sac.Description[0]!''}${segment_terminator}">
    ${SAC}
    </#list>
    <#-- Transaction_Set_Trailer -->
    SE${element_separator}${payload.UniversalTransaction.Transaction_Set_Trailer.Number_of_Included_Segments}${element_separator}${payload.UniversalTransaction.Transaction_Set_Trailer.Transaction_Set_Control_Number}${segment_terminator}
    <#-- Functional_Group_Trailer -->
    GE${element_separator}${payload.UniversalTransaction.Functional_Group_Trailer.Number_of_Transaction_Sets_Incl}${element_separator}${payload.UniversalTransaction.Functional_Group_Trailer.Group_Control_Number}${segment_terminator}
    <#-- Interchange_Control_Trailer -->
    IEA${element_separator}${payload.UniversalTransaction.Interchange_Control_Trailer.Nbr_of_Included_Functional_Groups}${element_separator}${payload.UniversalTransaction.Interchange_Control_Trailer.Interchange_Control_Number}${segment_terminator}
    ```
=== "Request Payload"        
    ```xml  
    <UniversalTransaction>
      <Interchange_Control_Header>
          <Authorization_Information_Qualifier>00</Authorization_Information_Qualifier>
          <Authorization_Information></Authorization_Information>
          <Security_Information_Qualifier>00</Security_Information_Qualifier>
          <Security_Information></Security_Information>
          <Interchange_ID_Qualifier>ZZ</Interchange_ID_Qualifier>
          <Interchange_Sender_ID>XXXXXXXXX</Interchange_Sender_ID>
          <Interchange_ID_Qualifier>01</Interchange_ID_Qualifier>
          <Interchange_Receiver_ID>834469876</Interchange_Receiver_ID>
          <Interchange_Date>200221</Interchange_Date>
          <Interchange_Time>1946</Interchange_Time>
          <Interchange_Control_Standards_ID>U</Interchange_Control_Standards_ID>
          <Interchange_Control_Version_Nbr>00401</Interchange_Control_Version_Nbr>
          <Interchange_Control_Number>100015519</Interchange_Control_Number>
          <Acknowledgment_Request>1</Acknowledgment_Request>
          <Test_Indicator>P</Test_Indicator>
          <Subelement_Separator>></Subelement_Separator>
      </Interchange_Control_Header>
      <Functional_Group_Header>
          <Functional_Identifier_Code>IN</Functional_Identifier_Code>
          <Application_Senders_Code>XXXXXXXXX</Application_Senders_Code>
          <Application_Receivers_Code>834469876</Application_Receivers_Code>
          <Date>20200221</Date>
          <Time>1946</Time>
          <Group_Control_Number>100014444</Group_Control_Number>
          <Responsible_Agency_Code>X</Responsible_Agency_Code>
          <Industry_ID>004010</Industry_ID>
      </Functional_Group_Header>
      <Transaction_Set_Header>
          <Transaction_Set_Identifier_Code>810</Transaction_Set_Identifier_Code>
          <Transaction_Set_Control_Number>100014444</Transaction_Set_Control_Number>
      </Transaction_Set_Header>
      <Begin_Invoice>
          <Invoice_Date>20200221</Invoice_Date>
          <Invoice_Number>E064784444</Invoice_Number>
          <PO_Date></PO_Date>
          <PO_Number>X1055555</PO_Number>
          <Release_Number></Release_Number>
          <Changed_Order_Sequence></Changed_Order_Sequence>
          <Transaction_Type_Code></Transaction_Type_Code>
      </Begin_Invoice>
      <Currency>
          <Entity_Identifier_Code>BY</Entity_Identifier_Code>
          <Currency_Code>USD</Currency_Code>
      </Currency>
      <Reference_Identification>
          <Reference_Identification_Qualifier>BM</Reference_Identification_Qualifier>
          <Reference_Identification>999749873334</Reference_Identification>
      </Reference_Identification>
      <Name>
          <Entity_Identifier_Code>CN</Entity_Identifier_Code>
          <Name>G0205016</Name>
      </Name>
      <Name>
          <Entity_Identifier_Code>CN2</Entity_Identifier_Code>
          <Name>G0305017</Name>
      </Name>
      <Total_invoice_amount>8550</Total_invoice_amount>
      <SAC_Information>
          <Allowance_or_Charge_Indicator>C</Allowance_or_Charge_Indicator>
          <Service_or_Charge_Code>D500</Service_or_Charge_Code>
          <SAC_03>ZZ</SAC_03>
          <SAC_04>HDLG</SAC_04>
          <Amount>800</Amount> 
          <Description>HANDLING</Description>
      </SAC_Information>
      <Transaction_Set_Trailer>
          <Number_of_Included_Segments>15</Number_of_Included_Segments> 
          <Transaction_Set_Control_Number>100015519</Transaction_Set_Control_Number>
      </Transaction_Set_Trailer>
      <Functional_Group_Trailer>
          <Number_of_Transaction_Sets_Incl>1</Number_of_Transaction_Sets_Incl>
          <Group_Control_Number>100015511</Group_Control_Number>
      </Functional_Group_Trailer>
      <Interchange_Control_Trailer>
          <Nbr_of_Included_Functional_Groups>1</Nbr_of_Included_Functional_Groups>
          <Interchange_Control_Number>100015511</Interchange_Control_Number>
      </Interchange_Control_Trailer>
    </UniversalTransaction>
    ```

#### Build and run

1. Launch Visual Studio Code with the Micro Integrator for VS Code extension (MI for VS Code) installed.

    !!! info
        Follow the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Create an [integration project]({{base_path}}/develop/create-integration-project/).
3. Create the artifacts (proxy service, registry resource) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.
5. Send a POST request to the <code>xml-to-edi-proxy</code> with the above given payload.
	
-   Output Payload
    ```text
    ISA*00**00**ZZ*XXXXXXXXX*01*834469876*200221*1946*U*00401*100015519*1*P*>!
    GS*IN*XXXXXXXXX*834469876*20200221*1946*100014444*X*004010!
    ST*810*100014444!
    BIG*20200221*E064784444**X1055555***!
    CUR*BY*USD!
    REF*BM*999749873334!
    N1*CN*G0205016!
    N1*CN2*G0305017!
    TDS*8550!
    SAC*C*D500*ZZ*HDLG*800*HANDLING!
    SE*15*100015519!
    GE*1*100015511!
    IEA*1*100015511!
    ```
    
### Accessing variables and properties

This example shows how to access variables and properties using the following variables: <code>var</code>, <code>ctx</code>, <code>axis2</code>, and <code>trp</code>.

-   FreeMarker Tamplate
    ```json
    {
    "variable" : "${var.user_id}",
    "ctx property" : "${ctx.user_name}",
    "axis2 property": "${axis2.REST_URL_POSTFIX}",
    "trp property": "${trp.Host}"
    }
    ```

    In this freemarker template, we have referenced the variable named <code>user_id</code>, default scoped property named <code>user_name</code>, the axis2 scoped property named <code>REST_URL_POSTFIX</code>, and the transport header <code>Host</code>. The output is returned as a JSON object.

-   Output Payload
    ```json
    {
    "variable" : "567865",
    "ctx property": "john",
    "axis2 property": "/demo",
    "trp property": "localhost:8290"
    }
    ```

-   Synapse Code
    ```xml
    <variable name="user_id" type="STRING" value="567865"/>
    <property name="user_name" scope="default" type="STRING" value="john"/>
    <payloadFactory media-type="json" template-type="freemarker">
        <format><![CDATA[{
            "variable" : "${var.user_id}",
            "ctx property" : "${ctx.user_name}",
            "axis2 property": "${axis2.REST_URL_POSTFIX}",
            "trp property": "${trp.Host}"
            }]]>
        </format>
    </payloadFactory>
    ```

### Handling optional values

Some of the input parameters you specify in the FreeMarker template (payload, properties, and variables) may be optional. This
means that the value can be null or empty during runtime. It is important to handle optional parameters in the FreeMarker template to avoid runtime issues due to null or empty values. FreeMarker
[documentation](https://freemarker.apache.org/docs/dgui_template_exp.html#dgui_template_exp_missing)
describes methods for handling optional parameters properly. The following example shows how to handle optional values in a
FreeMarker template by using the **Default value operator** described in the FreeMarker documentation.

-   Input Payload
    ```json
    {
    "first_name": "John",
    "age": 35
    }
    ```
-   FreeMarker Tamplate
    ```
    {
    "Name": "${payload.first_name} ${payload.last_name ! "" }",
    "Age": ${payload.age}
    }
    ```

-   Output Payload
    ```json
    {
    "Name": "John ",
    "Age": 35
    }
    ```

-   Synapse Code
    ```xml
    <payloadFactory media-type="json" template-type="freemarker">
        <format><![CDATA[{
        "Name": "${payload.first_name} ${payload.last_name ! "" }",
        "Age": ${payload.age}
         }]]>
        </format>
    </payloadFactory>
    ```

In this example, The FreeMarker template is expecting a property named <code>last_name</code> from the input payload. However, the 
payload does not contain that property. To handle that, the
<code>${payload.last_name ! "" }</code> syntax is used in the template. This syntax replaces the <code>last_name</code> value with an empty 
string if it is not present in the input payload.
