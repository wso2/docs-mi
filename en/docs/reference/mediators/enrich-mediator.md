# Enrich Mediator

The Enrich mediator can process a message based on a given source configuration and then perform the specified action on the message by using the target configuration.

## Syntax

```xml
<enrich>
    <source [clone=true|false] [type=custom|envelope|body|property|inline] [xpath="expression"] [property="string"]/>
    <target [action=replace|child|sibling] [type=custom|envelope|body|property|inline|key] [xpath="expression"] [property="string"]/>
</enrich>
```

## Configuration

The main properties of the Enrich Mediator are as follows:

### Source configuration

The following properties are available:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td><strong>Clone</strong></td>
<td>By setting the clone configuration, the message can be cloned or used as a reference during enriching. The default value is <code>true</code>.
</td>
</tr>
<tr class="odd">
<td><strong>Source Type</strong></td>
<td>The type that the mediator uses from the original message to enrich the modified message that passes through the mediator. Possible values are:
<ul>
<li><strong>Custom</strong>: Custom <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> can be configured and the value is extracted dynamically.</li>
<li><strong>Envelope</strong>: SOAP envelope of the original message used for enriching.</li>
<li><strong>Body</strong>: SOAP body of the original message used for enriching.</li>
<li><strong>Property</strong>: Specifies a property. For information on how you can use the property mediator to specify properties, see <a href="{{base_path}}/reference/mediators/property-mediator">Property Mediator</a>.</li>
<li><strong>Inline</strong>: Specifies the source content defined inline in XML or JSON.</li>
</ul>
</td>
</tr>
</tbody>
</table>

### Target configuration

The following properties are available:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Target Action</strong></td>
<td>By specifying the action type, the relevant action can be applied to the modified message. Possible values are:
<ul>
<li><strong>Replace</strong>: This replaces the message based on the target type specified on the target configuration. This is the default value for Target Action.</li>
<li><strong>Child</strong>: Add as a child of the specified target type.</li>
<li><strong>Sibling</strong>: Add as a sibling of the specified target type.</li>
<li><strong>Remove</strong>: Remove a selected part. This is supported only for JSON messages.</li>
</ul>
</td>
</tr>
<tr class="even">
<td><strong>Target Type</strong></td>
<td>By specifying the action type, the relevant action can be applied to the modified message. Possible values are:
<ul>
<li><strong>Custom</strong>: Custom <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> can be configured and the value is extracted dynamically.</li>
<li><strong>Envelope</strong>: SOAP envelope of the target message will be enriched.</li>
<li><strong>Body</strong>: SOAP body of the target message will be enriched.</li>
<li><strong>Property</strong>: Specifies a property. For information on how you can use the property mediator to specify properties, see <a href="{{base_path}}/reference/mediators/property-mediator">Property Mediator</a>.</li>
<li><strong>Key</strong>: Specifies that the target type is key. Specifically used to rename an existing key name in JSON payloads. This is supported only for JSON messages.</li>
</ul>
</td>
</tr>
</tbody>
</table>


!!! Info
    For the target type `envelope`, the action type should be `replace`. Both action types `child` and `sibling` are not acceptable because they add an envelope within an envelope.

!!! Info
    The target type depends on the source type. For the valid and invalid combinations of source and target types, see the below table.

    <table>
        <tr>
            <th></th>
            <th colspan="5" style="horizontal-align: middle; text-align: center;">Target type</th>
        </tr>
        <tr>
            <th rowspan="6" style="vertical-align: middle; text-align: center;">Source type</th>
            <th></th>
            <th>custom</th>
            <th>envelope</th>
            <th>body</th>
            <th>property</th>
        </tr>
        <tr>
            <th>custom</th>
            <td>valid</td>
            <td>invalid</td>
            <td>valid</td>
            <td>valid</td>
        </tr>
        <tr>
            <th>envelope</th>
            <td>invalid</td>
            <td>invalid</td>
            <td>invalid</td>
            <td>valid</td>
        </tr>
        <tr>
            <th>body</th>
            <td>valid</td>
            <td>invalid</td>
            <td>invalid</td>
            <td>valid</td>
        </tr>
        <tr>
            <th>property</th>
            <td>valid</td>
            <td>valid</td>
            <td>valid</td>
            <td>valid</td>
        </tr>
        <tr>
            <th>inline</th>
            <td>valid</td>
            <td>valid</td>
            <td>valid</td>
            <td>valid</td>
        </tr>
    </table>

## Examples
    
### Example 1: Set the property symbol

In this example, you'll set the envelope of the original message as a property. Later, you can log it using the [Log Mediator]({{base_path}}/reference/mediators/log-mediator).
    
```xml
<enrich>
    <source clone="false" type="envelope"/>
    <target action="replace" type="property" property="payload"/>
</enrich>
```
    
### Example 2: Add a child object to a property
    
In this example, you'll add a child property named `Lamborghini` to a property named `Cars`. The configuration for this is as follows:
    
```xml 
<proxy name="_TestEnrich" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
			<enrich>
				<source clone="true" type="inline">
					<Cars/>
				</source>
				<target action="child" type="property" property="Cars"/>
			</enrich>
			<log category="INFO" level="custom">
				<property name="PekeCarListBeforeEnrich" expression="get-property('Cars')"/>
			</log>
			<enrich>
				<source clone="true" type="inline">
					<Car>Lamborghini</Car>
				</source>
				<target action="child" xpath="$ctx:Cars"/>
			</enrich>
			<log category="INFO" level="custom">
				<property name="PekeCarListAfterEnrich" expression="get-property('Cars')"/>
			</log>
		</inSequence>
        <faultSequence/>
    </target>
</proxy>
```
  
### Example 3: Add a SOAPEnvelope type object as a property to a message
    
In this example, you'll add the SOAP envelope in a SOAP request as a property to a message. The Enrich mediator is useful in this scenario since adding the property directly using the [Property mediator]({{base_path}}/reference/mediators/property-mediator) results in the `SOAPEnvelope` object being created as an `OM` type object. The `OM` type object created cannot be converted back to a `SOAPEnvelope` object.
    
```xml
<enrich>
    <source clone="true" type="envelope"/>
    <target action="replace" type="property" property="ExtractedEnvelope"/>
</enrich>
```
    
### Example 4: Preserve the original payload
    
In this example, you'll copy the original payload to a property using the Enrich mediator.
    
```xml
<enrich>
    <source clone="false" type="body"/>
    <target action="replace" type="property" property="ORIGINAL_PAYLOAD"/>
</enrich>
```
    
Then whenever you need the original payload, you replace the message body with this property value using the Enrich mediator as follows:
    
```xml 
<enrich>
    <source clone="false" property="ORIGINAL_PAYLOAD" type="property"/>
    <target action="replace" type="body"/>
</enrich>
``` 

### Examples - Enrich on JSON messages 

!!! Info
    In JSON enriching scenarios if the enrich mediator source is defined as a property it should contain a JSON object or JSON array.

Below is the JSON payload that is sent in the request for the following examples.

**Payload**

```json
{
    "data": {
        "students": [
            {
                "id": "01",
                "name": "Tom",
                "lastName": "Price",
                "modules": ["CS001", "CS002", "CS003"]
            },
            { 
                "id":"02", 
                "name": "Nick", 
                "lastname": "Thameson",
                "modules": ["CS011", "CS012"] 
             } 
        ]
    }
}
```

#### Example 1: Extract content from the message payload and set it to the message body

In this example, you'll extract the content in the `data` object and set it as the message body.

```xml
<enrich>
    <source clone="false" type="custom" xpath="json-eval($.data)"/>
    <target action="replace" type="body"/>
</enrich>
```

**Response**

```json
{
    "students": [
        {
            "id": "01",
            "name": "Tom",
            "lastName": "Price",
            "modules": [ "CS001", "CS002", "CS003"]
        },
        {
            "id": "02",
            "name": "Nick",
            "lastname": "Thameson",
            "modules": ["CS011", "CS012"]
        }
    ]
}
```

#### Example 2: Set a property as a child in the target

In this example, you'll enroll the first student in the payload for a new module. The new module is set in the `NewModule` property.

```xml
<property name="NewModule" scope="default" type="STRING" value="CS004"/>
<enrich>
    <source clone="true" property="NewModule" type="property"/>
    <target action="child" xpath="json-eval($.data.students[0].modules)"/>
</enrich>
```

**Response**

```json
{
    "data": {
        "students": [
            {
                "id": "01",
                "name": "Tom",
                "lastName": "Price",
                "modules": ["CS001", "CS002", "CS003", "CS004"]
            },
            {
                "id": "02",
                "name": "Nick",
                "lastname": "Thameson",
                "modules": ["CS011", "CS012"]
            }
        ]
    }
}
```

#### Example 3: Set an inline content as a child in the target

In this example, you'll define a new student inline and add it to the `students` array in the payload.

```xml
<enrich>
    <source clone="true" type="inline">
        {
        "id": "03",
        "name": "Mary",
        "lastName": "Jane",
        "modules": ["CS001", "CS002", "CS004"]
        }
    </source>
    <target action="child" xpath="json-eval($.data.students)"/>
</enrich>
```

**Response**

```json
{
    "data": {
        "students": [
            {
                "id": "01",
                "name": "Tom",
                "lastName": "Price",
                "modules": ["CS001", "CS002", "CS003"]
            },
            {
                "id": "02",
                "name": "Nick",
                "lastname": "Thameson",
                "modules": ["CS011", "CS012"]
            },
            {
                "id": "03",
                "name": "Mary",
                "lastName": "Jane",
                "modules": ["CS001","CS002","CS004"]
            }
        ]
    }
}
```

#### Example 4: Set a custom path expression to a property

In this example, you'll assign the first student's name to a property called `Name`.

```xml
<enrich>
    <source clone="true" type="custom" xpath="json-eval($.data.students[0].name)"/>
    <target action="replace" type="property" property="Name"/>
</enrich>
<log category="INFO" level="custom">
    <property name="Student name is : " expression="get-property('Name')"/>
</log>
```

The following line can be observed in the log.

```text
INFO {LogMediator} - {proxy:TestEnrich} Student name is :  = "Tom"
```

#### Example 5: Remove selected parts from a payload

!!! Info
    -   This feature is currently supported only for JSON.
    -   You can provide multiple JSONPath expressions as a comma-separated list for the `remove` operation (as given in the following example).

In this example, you'll remove the `modules` from every student and also remove the first student in the array.

```xml
<enrich>
    <source clone="true" type="custom" xpath="json-eval($.data.students[*].modules,$.data.students[0])"/>
    <target action="remove" type="body"/>
</enrich>
```

**Response**

```json
{
    "data": {
        "students": [
            {
                "id": "02",
                "name": "Nick",
                "lastname": "Thameson"
            }
        ]
    }
}
```

#### Example 6: Remove selected parts from a property

As you removed selected parts from a payload, you can also remove selected parts synapse properties.

```xml
<enrich>
    <source clone="false" type="body"/>
    <target action="replace" type="property" property="students"/>
</enrich>
<enrich>
    <source clone="true" type="custom" xpath="json-eval($.data.students[*].modules,$.data.students[0])"/>
    <target action="remove" type="property" property="students"/>
</enrich>
<log category="INFO" level="simple">
    <property name="result" expression="$ctx:students"/>
</log>
```

Here, in the first Enrich mediator, you are creating a property called `students` with the incoming message payload. 
In the second Enrich mediator, you are removing selected parts from the property, and finally logging the property. 

After invoking we can see the following log appearing in the terminal.

```
result = {"data":{"students":[{"id":"02","name":"Nick","lastname":"Thameson"}]}}
```

#### Example 7: Update a value of an existing object

In this example, you'll replace the `modules` array of every student with `[]`.

```xml
<enrich>
    <source clone="true" type="inline">
        []
    </source>
    <target action="replace" xpath="json-eval($.data.students[*].modules)"/>
</enrich>
```

**Response**

```json
{
    "data": {
        "students": [
            {
                "id": "01",
                "name": "Tom",
                "lastName": "Price",
                "modules": []
            },
            {
                "id": "02",
                "name": "Nick",
                "lastname": "Thameson",
                "modules": []
            }
        ]
    }
}
```

### Example 8: Update the key name of an existing object

!!! Info
    This feature is supported only for JSON.

In this example, you'll replace the key name `name` of every student with `firstName`.

```xml
<enrich>
    <source clone="true" type="inline">
        firstName
    </source>
    <target action="replace" type="key" xpath="json-eval($.data.students[*].name)"/>
</enrich>
```

!!! Info
    When specifying the JSON path of the target, it should comply with the below syntax.
    
    ```text
    <json path to locate the key>.<keyname>
    ```
    
    E.g.: 
    In the above configuration, we are trying to replace the `name` key of the student objects, and 
    JSON path to locate the student objects would be `$.data.students[*]`. Therefore, the JSON path will be as follows:
    
    ```text
    $.data.students[*].name
    ```

#### Response

```json
{
    "data": {
        "students": [
            {
                "id": "01",
                "firstName": "Tom",
                "lastName": "Price",
                "modules": ["CS001","CS002","CS003"]
            },
            {
                "id": "02",
                "firstName": "Nick",
                "lastname": "Thameson",
                "modules": ["CS011","CS012"]
            }
        ]
    }
}
```

### Example 9: Enrich JSON primitive values

You can use property mediators with `JSON` data type to enrich any JSON primitive, object, or array to a given target.

!!! Note 
    When we use a property with `STRING` data type in the Enrich mediator, it supports native JSON capabilities 
    only if the property contains a JSON object or a JSON array. The rest of the values are considered to be XML.

```xml
<property name="NewSubject" value="&quot;CS013 II&quot;" type="JSON"/>	
<enrich>
    <source clone="false" property="NewSubject" type="property"/>
    <target action="child" xpath="json-eval(data.students[1].modules)"/>
</enrich>
```

!!! Note
    When the JSON primitive string contains white spaces, you should enclose them with quotes as shown in the example below. This is due to restrictions enforced by the JSON schema.

#### Response

```json
{
    "data": {
        "students": [
            {
                "id": "01",
                "name": "Tom",
                "lastName": "Price",
                "modules": ["CS001", "CS002", "CS003"]
            },
            {
                "id": "02",
                "name": "Nick",
                "lastname": "Thameson",
                "modules": ["CS011", "CS012", "CS013 II"
                ]
            }
        ]
    }
}
```
