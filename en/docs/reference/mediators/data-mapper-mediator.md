# Data Mapper Mediator

The Data Mapper mediator is a data mapping solution that can be integrated
into a mediation sequence. It converts and transforms one data format to
another or changes the structure of the data in a message. The WSO2 Micro Integrator for Visual Studio Code (MI for VS Code) extension
provides a graphical mapping configuration and
generates the files required for executing this graphical mapping
configuration through the WSO2 Data Mapper engine.

The Data Mapper component utilizes TypeScript to define the mapping when you use the WSO2 MI for VS Code extension. When you build the Integration project using the WSO2 MI for VS Code extension, the Data Mapper component generates the required configuration files needed by the Data Mapper Engine to execute the mapping. These files are stored in the Governance Registry.

## Syntax

```xml
<datamapper config="name" inputSchema="string" inputType="string" outputSchema="string" outputType="string"/> 
```

## Configuration

The parameters available for configuring the Data Mapper mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Mapping Configuration</strong></td>
<td>The file, which contains the script file that is used to execute the mapping. This file is generated when you build the Integration project using the WSO2 MI for VS Code extension. It is stored under <b>Governance Registry</b>.</td>
</tr>
<tr class="even">
<td><strong>Input Schema</strong></td>
<td>JSON schema, which represents the input message format. This file is generated when you build the Integration project using the WSO2 MI for VS Code extension. It is stored under <b>Governance Registry</b>.</td>
</td>
</tr>
<tr class="odd">
<td><strong>Output Schema</strong></td>
<td>JSON schema, which represents the output message format. This file is generated when you build the Integration project using the WSO2 MI for VS Code extension. It is stored under <b>Governance Registry</b>.</td>
</tr>
<tr class="even">
<td><strong>Input Type</strong></td>
<td>Expected input message type (XML/JSON/CSV).</br>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>By default, the Input Type is selected from the Input Schema if you have not provided one. If you want to specify the Input Type, then you can specify it in the WSO2 MI for VS Code extension.</p>
</div>

</td>
</tr>
<tr class="odd">
<td><strong>Output Type</strong></td>
<td>Target output message type (XML/JSON/CSV).</br>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>By default, the Output Type is selected from the output schema if you have not provided one. If you want to specify the Output Type, you can specify it in the WSO2 MI for VS Code extension.</p>
</div></td>
</tr>
</tbody>
</table>

## Components of Data Mapper

### Mapping configuration file

The Data Mapper component utilizes TypeScript to define the mapping when you use the WSO2 MI for VS Code extension. When you build the integration project using the WSO2 MI for VS Code extension, the data mapping configuration file is compiled into JavaScript, which is used by the Data Mapper engine to map the elements in the MI runtime.

![mapping configuration]({{base_path}}/assets/img/integrate/mediators/datamapper/mapping-configuration.png) 

### Input and output files

You can load the following input/output message formats:

-   **XML:** to load a sample XML file
-   **JSON:** to load a sample JSON file
-   **CSV:** to load a sample CSV file with column names as the first
    record
-   **JSONSCHEMA:** to load a JSON schema

![input and output files]({{base_path}}/assets/img/integrate/mediators/datamapper/input-output-files.png) 


Based on the provided input/output files, the Typescript interfaces are generated inside the Mapping configuration file. JSON schema files are generated when you build a project using the WSO2 MI for VS Code extension. These files are stored in the CAR file and deployed inside the governance registry. These files are used to validate the input and output messages at runtime.

!!! info "Reimport input/output files"
    If you need to reimport input/output, you can right click on top of the input/output widget. 

!!! info "Filter elements"
    If you need to filter elements in input/output, you can use the filter bar on the upper right corner of the Data Mapper view.

    ![filtered fields]({{base_path}}/assets/img/integrate/mediators/datamapper/filtered-fields.png) 

### Expression Editor

The Expression Editor is used to define the mapping with additional operations between the input and output messages. It provides a set of operations that can be used to define the mapping. You can find the list of operations supported by the Data Mapper below in the [Data Mapper operations](#data-mapper-operations) section.

![empty expression bar]({{base_path}}/assets/img/integrate/mediators/datamapper/expression-bar-initial.png) 

![complete expression bar]({{base_path}}/assets/img/integrate/mediators/datamapper/expression-bar-complete.png) 

!!! info "Expressions"
    You can define any expression in the Expression Editor by clicking on the output element. The expression editor will be enabled and you can define the expression.

    ![expressions]({{base_path}}/assets/img/integrate/mediators/datamapper/expressions.png) 

### Sub Mapping

The Sub Mapping feature allows you to define a mapping for a specific part of the input message. This is useful when you have a complex input message and you want to reuse the mapping logic for different parts of the message.

![sub mapping]({{base_path}}/assets/img/integrate/mediators/datamapper/submapping.png) 

![using sub mapping]({{base_path}}/assets/img/integrate/mediators/datamapper/utilize-submapping.png) 

### Custom Functions

The Data Mapper supports custom functions that can be used to define the mapping. You can define custom functions in the mapping configuration file and use them in the mapping.

![custom functions]({{base_path}}/assets/img/integrate/mediators/datamapper/custom-functions.png) 

### Data Mapper operations

The operations that the Data Mapper supports as shown below.

#### Arithmetic

- **sum:** adds two/more numbers.

- **ceiling:** derives the ceiling value of a number (closest larger integer value).

- **floor:** derives the floor value of a number (closest lower integer value).

- **round:** derives the nearest integer value.

- **min:** derives the minimum number from given inputs

- **max:** derives the maximum number from given inputs

#### Type conversion

- **toNumber:** converts a String value to number (“0” -> 0).

- **toBoolean:** converts a String value to boolean (“true” -> true).

- **numberToString:** converts a number or a boolean value to String.

- **booleanToString:** converts a boolean value to String.

#### String

- **concat:** concatenates two or more Strings.

- **split:** splits a String by a matching String value.

- **toUppercase:** converts a String to uppercase letters.

- **toLowercase:** converts a String to lowercase letters.

- **stringLength:** gets the length of the String.

- **startsWith:** checks whether a String starts with a specific value. (This is not supported in Java 7.)

- **endsWith:** checks whether String ends with a specific value. (This is not supported in Java 7.)

- **substring:** extracts a part of the String value.

- **trim:** removes white spaces from the beginning and end of a String.

- **replaceFirst:** replaces the first occurrence of a target String with another.

- **match** – check whether the input match with a (JS) Regular Expression

## AI Data Mapper
The MI Copilot AI Assistant will allow you to seamlessly generate the input-output mapping. Simply load the input and output schema (of any type) to the relevant sections as shown below and click **Map**. Use the **Clear** button to clear all mappings.

!!! info "WSO2 Account and Usage Limits"
    To use this feature, you must have a WSO2 account. If you do not have one, attempting to access Copilot or the mapping feature will prompt you to create an account. If your account exceeds the usage limit, it will be refreshed after the specified time limit.

!!! info "Review and Fine-tune"
    Since AI powers the automated mapping, it may contain errors. Always verify the accuracy of the generated mappings. To fine tune the mappings you can use the `</>` button and edit the TypeScript (TS) file.

![AI Data Mapper diagram]({{base_path}}/assets/img/integrate/mediators/datamapper/ai-mapping.png)

## Examples

### Example 1 - Creating a SOAP payload with namespaces

This example creates a Salesforce login SOAP payload using a JSON
payload. The login payload consists of XML namespaces. Even though the
JSON payload does not contain any namespace information, the output JSON
schema will be generated with XML namespace information using the
provided SOAP payload.

![example one Data mapper diagram]({{base_path}}/assets/img/integrate/mediators/datamapper/example-1.png)

The sample input JSON payload is as follows.

``` js
{  
   "name":"Watson",
   "password":"watson@123"
}
```

The sample output XML is as follows.

``` xml
<soapenv:Envelope xmlns:urn="urn:enterprise.soap.sforce.com" xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope/">
  <soapenv:Body>
    <urn:login>
      <urn:username><b>user@domain.com</b></urn:username>
      <urn:password><b>secret</b></urn:password>
    </urn:login>
  </soapenv:Body>
</soapenv:Envelope>
```

### Example 2 - Mapping SOAP header elements

This example demonstrates how to map SOAP header elements along with
SOAP body elements to create a certain SOAP payload, by creating a
Salesforce convertLead SOAP payload using a JSON payload. The Convert
Lead SOAP payload needs mapping SOAP header information.  
For example: `<urn:sessionId>QwWsHJyTPW.1pd0_jXlNKOSU</urn:sessionId>`

![example 2 datamapping]({{base_path}}/assets/img/integrate/mediators/datamapper/complete-datamapping.png)

The sample input JSON payload is as follows.

``` js
{  
   "owner":{  
      "ID":"005D0000000nVYVIA2",
      "name":"Smith",
      "city":"CA",
      "code":"94041",
      "country":"US"
   },
   "lead":{  
      "ID":"00QD000000FP14JMAT",
      "name":"Carl",
      "city":"NC",
      "code":"97788",
      "country":"US"
   },
   "sendNotificationEmail":"true",
   "convertedStatus":"Qualified",
   "doNotCreateOpportunity":"true",
   "opportunityName":"Partner Opportunity",
   "overwriteLeadSource":"true",
   "sessionId":"QwWsHJyTPW.1pd0_jXlNKOSU"
}
```

The sample output XML is as follows.

``` xml
<?xml version="1.0" encoding="utf-8"?>  
<soapenv:Envelope xmlns:urn="urn:enterprise.soap.sforce.com" xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope/">
  <soapenv:Header>
     <urn:SessionHeader>
        <urn:sessionId>QwWsHJyTPW.1pd0_jXlNKOSU</urn:sessionId>
     </urn:SessionHeader>
     </soapenv:Header>
     <soapenv:Body>
     <urn:convertLead >
        <urn:leadConverts> <!-- Zero or more repetitions -->
           <urn:convertedStatus>Qualified</urn:convertedStatus>
           <urn:doNotCreateOpportunity>false</urn:doNotCreateOpportunity>
           <urn:leadId>00QD000000FP14JMAT</urn:leadId>
           <urn:opportunityName>Partner Opportunity</urn:opportunityName>
           <urn:overwriteLeadSource>true</urn:overwriteLeadSource>
           <urn:ownerId>005D0000000nVYVIA2</urn:ownerId>
           <urn:sendNotificationEmail>true</urn:sendNotificationEmail>
        </urn:leadConverts>
     </urn:convertLead>
</soapenv:Body>
</soapenv:Envelope>
```

### Example 3 - Mapping primitive types

This example demonstrates how you can map an XML payload with integer,
boolean and other values into a JSON payload with required primitive types,
by specifying the required primitive type in the JSON schema.

![example 3 datamapping]({{base_path}}/assets/img/integrate/mediators/datamapper/mapping-primitive-types.png) 

![example 3 array mapping]({{base_path}}/assets/img/integrate/mediators/datamapper/mapping-primitive-types-array.png) 

The sample input XML payload is as follows.

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
    <root>
        <name>app_name</name>
        <version>version</version>
        <manifest_version>2</manifest_version>
        <description>description_text</description>
        <container>GOOGLE_DRIVE</container>
        <api_console_project_id>YOUR_APP_ID</api_console_project_id>
        <gdrive_mime_types>
            <opendrivedoc>
                <type>image/png</type>
                <type>image/jpeg</type>
                <type>image/gif</type>
                <type>application/vnd.google.drive.ext-type.png</type>
                <type>application/vnd.google.drive.ext-type.jpg</type>
                <type>application/vnd.google.drive.ext-type.gif</type>
                <href>http://your_web_url/</href>
                <title>Open</title>
                <disposition>window</disposition>
            </opendrivedoc>
        </gdrive_mime_types>
        <icons>
            <icon_128>icon_128.png</icon_128>
        </icons>
        <app>
            <launch>
                <web_url>http://yoursite.com</web_url>
            </launch>
        </app>
    </root>
```

The sample output JSON is as follows.

``` js
{
"name" : "app_name",
"version" : "version",
"manifest_version" : 2,
"description" : "description_text",
"container" : "GOOGLE_DRIVE",
"api_console_project_id" : "YOUR_APP_ID",
"gdrive_mime_types": {
  "opendrivedoc": [
    {
      "type": ["image/png", "image/jpeg", "image/gif", "application/vnd.google.drive.ext-type.png",
      "application/vnd.google.drive.ext-type.jpg","application/vnd.google.drive.ext-type.gif"],
      "href": "http://your_web_url/",
      "title" : "Open",
      "disposition" : "window"
    }
  ]
},
"icons": {
  "icon_128": "icon_128.png"
},
"app" : {
  "launch" : {
  "web_url" : "http://yoursite.com"
  }
}
}
```

### Example 4 - Mapping XML to CSV

This example demonstrates how you can map an XML payload to CSV format.

!!! Info
    If you specify special characters (For example `&`,
    `&amp;`) within the `<text>`
    tag when converting from CSV to CSV, they will be displayed as follows
    by default.
    -   `& -> &amp;`
    -   `&amp; -> &amp;amp;`
    -   `< -> &lt;`
    -   `&lt; -> &lt;lt;`

To avoid this and to display the exact special characters as text in the
returned output, add the following properties in the Synapse
configuration.

``` xml
<property name="messageType" value="text/plain" scope="axis2"/>
<property name="ContentType" value="text/plain" scope="axis2"/>
```

<img src="{{base_path}}/assets/img/integrate/mediators/datamapper/example-4.gif" alt="Example 4">

The sample input XML payload is as follows.

``` xml
<?xml version="1.0"?>
<PurchaseOrder PurchaseOrderNumber="001">
<Address>
    <Name>James Yee</Name>
    <Street>Downtown Bartow</Street>
    <City>Old Town</City>
    <State>PA</State>
    <Zip>95819</Zip>
    <Country>USA</Country>
</Address>
<Address>
    <Name>Elen Smith</Name>
    <Street>123 Maple Street</Street>
    <City>Mill Valley</City>
    <State>CA</State>
    <Zip>10999</Zip>
    <Country>USA</Country>
</Address>
 <DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>
</PurchaseOrder>
```

The sample output CSV is as follows.

``` text
Name,Street,City,State,Zip,Country
James Yee,Downtown Bartow,Old Town,PA,95819,USA
Ellen Smith,123 Maple Street,Mill Valley,CA,10999,USA
```
