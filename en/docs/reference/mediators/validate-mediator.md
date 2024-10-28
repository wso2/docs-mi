# Validate Mediator

You can use the Validate mediator to validate XML and JSON messages against a specified XML or JSON schema.

## Syntax

``` java
<validate [source="expression"] [cache-schema="true|false"]>
   <schema key="string"/>+
   <feature name="string" value="true|false"/>+
   <resource key="registryKey" location="string"/>+
   <on-fail>
      (mediator)+
   </on-fail>
</validate>
```

## Configurations

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Source</strong></td>
<td><div class="content-wrapper">
<p>The <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> to extract the XML or JSON payload that needs to be validated. The Validate mediator validates the evaluation of this expression against the schema specified in the <a href="#schemas">schema</a>. 
<div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>If this is not specified, 
    <ul>
        <li>For XML: the validation is performed against the first child of the SOAP body of the current message.</li>
        <li>For JSON: the validation is performed against the whole body of the current message. For example: <code>json-eval($.msg)</code></li>
    </ul></p>
 </div>
</div></td>
</tr>
<tr class="even">
<td><strong>Enable Schema Caching</strong></td>
<td><div class="content-wrapper">
<p>This check box is enabled by default to ensure that schemas retrieved from the registry for one service/REST API are cached for future use.</p>
<p>Be sure to disable this check box if you are using the validate mediator inside a <b>Template</b>. Since multiple proxy services/REST APIs will be accessing one template, schemas that are cached for one service can interrupt another service that uses the same template.</p>
</div></td>
</tr>
</tbody>
</table>

The other configuration can be divided into the following sections.

### Schemas

This section is used to specify the key to access the schema based on which validation is carried out. The parameters available in this section are as
follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Schema</strong></td>
<td><div class="content-wrapper">
<p>The key for the schema location. It can be specified using one of the following methods.</p>
<ul>
<li>You can give a static key. The schema should be predefined and saved as a resource in the Registry in the given location.</li>
<li>You can give an <a href="{{base_path}}/reference/synapse-properties/expressions">expression</a> to extract the schema.</li>
</ul>
</div></td>
</tr>
</tbody>
</table>

### Features

This section is used to specify which features of the Validate mediator
should be enabled and which should be disabled. A feature can be used to control schema validation behavior. The parameters available
in this section are as follows.

!!! Info
    Only the [FEATURE_SECURE_PROCESSING](https://docs.oracle.com/en/java/javase/17/docs/api/java.xml/javax/xml/XMLConstants.html#FEATURE_SECURE_PROCESSING) feature is currently supported by the validator.


| Parameter Name      | Description                                |
|---------------------|--------------------------------------------|
| **Feature Name**    | The name of the feature.                   |
| **Feature Enabled** | Select the checkbox to enable the feature. | 

### Resources

A resource in the Validate mediator configuration enables you to import
a schema referenced within another schema. In order to access such a
schema via a resource, the parent schema should be saved as a resource
in the Registry. The parameters available in this section are as
follows.

| Parameter Name | Description                                                                                                                                                                                                                                                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Location**   | The location of the schema to be imported. The value entered here should be equal to the value of the `schema location` attribute within the relevant `<xsd:import>` element in the parent schema. |
| **Key**        | The key to access the parent schema saved in the Registry.                                                                                                                                               |

### on-fail

Once the validate mediator is added, you can define mediators inside the validate mediator which will be added to the `on-fail` element. These mediators will be executed when the validation fails. 

!!! Tip
    A [Fault mediator]({{base_path}}/reference/mediators/fault-mediator) should be added as a child to the Validate mediator to specify the fault sequence to be followed if the validation fails.

## Examples

### Validate XML payload

#### Example 1 - Basic configuration

In this example, the schema for validating messages is given as a registry key, `schema\sample.xsd`. No source attribute is specified, and therefore the schema will be used to validate the first child of the SOAP body. The mediation logic to follow if the validation fails is defined within the `on-fail` element. In this example, the [Fault Mediator]({{base_path}}/reference/mediators/fault-mediator) creates a SOAP fault to be sent back to the client.

```xml
<validate cache-schema="true">
    <schema key="schema\sample.xsd"/>
         <on-fail>
                <makefault>
                    <code value="tns:Receiver"
                            xmlns:tns="http://www.w3.org/2003/05/soap-envelope"/>
                    <reason value="Invalid Request!!!"/>
                </makefault>
                <property name="RESPONSE" value="true"/>
                <header name="To" expression="get-property('ReplyTo')"/>
         </on-fail>
</validate>
```

#### Example 2 - Validate mediator with resources

In this example, the following schema named `08MockServiceSchema` is saved in the Registry. This schema is located in `MockDataTypes.xsd`. A reference is made within this schema to another schema named `08SOAPFaults` which is located in `SOAPFaults.xsd`.

```xml
<xsd:import namespace= "http://samples.synapse.com/08MockServiceSchema" schemalocation= "MockDataTypes.xsd">
    <xsd:import namespace= "http://samples.synapse.com/08SOAPFaults" schemalocation= "../Common/SOAPFaults.xsd">
</xsd:import>
```

The Validate mediator can be configured as follows.

```xml
<validate cache-schema="true">
    <schema key="MockDataTypes.xsd"/>
    <resource location="../Common/SOAPFaults.xsd" key="conf:custom/schema/SOAPFaults.xsd"/>
    <on-fail>
        <log level="custom">
            <property name="validation failed" value="Validation failed ###"/>
            <property name="error_msg" expression="$ctx:ERROR_MESSAGE"/>
        </log>
    </on-fail>
</validate>
```

The schema used by the validate mediator is `MockDataTypes.xsd`. In addition, a resource is used to import the `08SOAPFaults` schema which is referred to in the `08MockServiceSchema` schema. Note that the value `../Common/SOAPFaults.xsd` which is specified as the location for the schema to be imported is the same as the location specified for `08SOAPFaults` schema in the `08MockServiceSchema` configuration.

The `on-fail` sequence of this Validate mediator includes a [Log mediator]({{base_path}}/reference/mediators/log-mediator) which is added as a child to the Validate mediator. This log mediator uses two properties to generate the error message `Validation failed ###` when the validation of a message against the schemas specified fails.

### Validate JSON payload

The following examples use the below sample schema `StockQuoteSchema.json` file. Add the sample schema file to the registry path: `conf:/schema/StockQuoteSchema.json`.

!!! Tip
    When adding this sample schema file to the Registry, specify the **Media Type** as `application/json`.

``` java
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "getQuote": {
      "type": "object",
      "properties": {
        "request": {
          "type": "object",
          "properties": {
            "symbol": {
              "type": "string"
            }
          },
          "required": [
            "symbol"
          ]
        }
      },
      "required": [
        "request"
      ]
    }
  },
  "required": [
    "getQuote"
  ]
}
```

#### Example 1 - Basic configuration

In this example, the required schema for validating messages going through the Validate mediator is given as the registry key `schema\StockQuoteSchema.json`. You do not have any source attributes specified. Therefore, the schema will be used to validate the complete JSON payload. The mediation logic to follow if the
validation fails is defined within the on-fail element. In this example, the [PayloadFactory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator) creates a fault to be sent back to the client.

``` java
<validate cache-schema="true">
    <schema key="conf:/schema/StockQuoteSchema.json"/>
    <on-fail>
        <payloadFactory media-type="json">
            <format>{"Error":"$1",
            "Error Details" : "$2"       }</format>
            <args>
                <arg evaluator="xml" expression="$ctx:ERROR_MESSAGE" />
                <arg evaluator="xml" expression="$ctx:ERROR_DETAIL" />
            </args>
        </payloadFactory>
        <property name="HTTP_SC" value="500" scope="axis2"/>
        <respond/>
    </on-fail>
</validate>
```

An example of a valid JSON payload request against the given schema is given below.

``` java
{
   "getQuote": {
      "request": {
         "symbol": "WSO2"
      }
   }
}
```

When you send an invalid JSON payload against the given schema, the following response will appear.

```
{
    "Error": "object has missing required properties ([\"request\"])",
    "Error Details ": " Error while validating Json message error: object has missing required properties ([\"request\"])\n    level: \"error\"\n    schema: {\"loadingURI\":\"#\",\"pointer\":\"/properties/getQuote\"}\n    instance: {\"pointer\":\"/getQuote\"}\n    domain: \"validation\"\n    keyword: \"required\"\n    required: [\"request\"]\n    missing: [\"request\"]\n"
}
```

#### Example 2 - Validate mediator with source (JSONPath)

In this example, it extracts the message element from the JSON request body and validates only that part of the message against the given schema.

``` xml
<validate cache-schema="true" source="json-eval($.msg)">
    <schema key="conf:/schema/StockQuoteSchema.json"/>
    <on-fail>
        <payloadFactory media-type="json">
            <format>{"Error":"$1",
            "Error Details" : "$2"       }</format>
            <args>
                <arg evaluator="xml" expression="$ctx:ERROR_MESSAGE" />
                <arg evaluator="xml" expression="$ctx:ERROR_DETAIL" />
            </args>
        </payloadFactory>
        <property name="HTTP_SC" value="500" scope="axis2"/>
        <respond/>
    </on-fail>
</validate>
```

An example of a valid JSON request payload against the given schema is given below.

``` java
{
   "msg": {
      "getQuote": {
         "request": {
            "symbol": "WSO2"
         }
      }
   }
}
```

When you send an invalid JSON payload against the given schema, the following response will appear.

```
{
    "Error": "object has missing required properties ([\"request\"])",
    "Error Details": "Error while validating Json message error: object has missing required properties ([\"request\"])\n    level: \"error\"\n    schema: {\"loadingURI\":\"#\",\"pointer\":\"/properties/getQuote\"}\n    instance: {\"pointer\":\"/getQuote\"}\n    domain: \"validation\"\n    keyword: \"required\"\n    required: [\"request\"]\n    missing: [\"request\"]\n"
}
```
