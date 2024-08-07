# FHIR Connector Example

In this example the connector uses the FHIR REST API to interact with FHIR.  

## What you'll build

Given below is a sample API that illustrates how you can connect to a FHIR server and invoke operations. It exposes FHIR functionalities as a restful service. Users can invoke the API with HTTP/HTTPs with required information.

1. `/create` : create a new patient at FHIR server
2. `/read` : retrieve information about the patient from FHIR server
3. `/readSpecificResourceById`: read patient by Id
4. `/update` : update patient information from FHIR server.
5. `/delete` : remove added patient information from FHIR server.

To know further information about these operations please refer this link.

> **Note**: If the ID element is not provided, or the value is wrong, the server responds with a HTTP 400 error code and provides an operation outcome identifying the issue.

Before you start configuring the FHIR connector, you also need to download the relevant integration runtime of WSO2, and we refer to that location as `<PRODUCT_HOME>`.

Specific message builders/formatters configuration needs to be enabled in the product as shown below before starting the integration service.

If you are using **EI7** or **APIM 4.0.0**, you need to enable this property by adding the following to the **<PRODUCT_HOME>/conf/deployment.toml** file. You can further refer to the [Working with Message Builders and Formatters]({{base_path}}/install-and-setup/setup/message-builders-formatters/message-builders-and-formatters/) and [Product Configurations](https://apim.docs.wso2.com/en/4.2.0/reference/config-catalog/#http-transport) documentations. 

```toml
[[custom_message_builders]]
content_type = "application/fhir+json"
class = "org.wso2.micro.integrator.core.json.JsonStreamBuilder"

[[custom_message_formatters]]
content_type = "application/fhir+json"
class = "org.wso2.micro.integrator.core.json.JsonStreamFormatter"
```

If you are using **EI 6**, you can enable this property by doing the following Axis2 configurations in the **<PRODUCT_HOME>\repository\conf\axis2\axis2.xml** file.

**messageFormatters**

```xml
<messageFormatter contentType="application/fhir+json" 
class="org.wso2.carbon.integrator.core.json.JsonStreamFormatter"/>
```

**messageBuilders**

```xml
<messageBuilder contentType="application/fhir+json" 
class="org.wso2.carbon.integrator.core.json.JsonStreamBuilder"/>
```

The following diagram illustrates all the required functionality of the FHIR API service that you are going to build.

In here FHIR clients can invoke the API with HTTP/HTTPs with the required information. The FHIR connector processes each request by converting to the Health Level Seven International standards and then sends it to the resources available on the FHIR server.

This server is loaded with a standard set of test data sets and also this server can store any data that are related to administrative concepts such as patients, providers, organizations, and devices as well as a variety of clinical concepts including problems, medications, diagnostics, care plans, and financial issues, among others.

<img src="{{base_path}}/assets/img/integrate/connectors/fhirconnector.png" title="FHIR Connector" width="800" alt="FHIR Connector"/>

## Set up the integration project

Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project.

1. Select Micro Integrator and click on `+` in APIs to create a REST API. 

2. Specify the API name as `SampleApi` and API context as `/resources`. You can go to the source view of the XML configuration file of the API and copy the following configuration (source view).

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <api context="/resources" name="SampleApi" xmlns="http://ws.apache.org/ns/synapse">
       <resource methods="POST" url-mapping="/create">
           <inSequence>
               <property expression="json-eval($.base)" name="base" scope="default" type="STRING"/>
               <property expression="json-eval($.resourceType)" name="type" scope="default" type="STRING"/>
               <property expression="json-eval($.format)" name="format" scope="default" type="STRING"/>
               <log level="custom">
                   <property expression="get-property('transport','Content-Type')" name="base"/>
               </log>
               <fhir.init>
                   <base>http://hapi.fhir.org/baseR4</base>
               </fhir.init>
               <switch source="get-property('transport','Content-Type')">
                   <case regex="application/json">
                       <property name="format" scope="default" type="STRING" value="json"/>
                       <fhir.create>
                           <type>{$ctx:type}</type>
                           <format>{$ctx:format}</format>
                       </fhir.create>
                   </case>
                   <case regex="application/xml">
                       <property name="format" scope="default" type="STRING" value="xml"/>
                       <fhir.create>
                           <type>{$ctx:type}</type>
                           <format>{$ctx:format}</format>
                       </fhir.create>
                   </case>
                   <default></default>
               </switch>
               <log level="full" separator=","/>
               <respond/>
           </inSequence>
           <faultSequence/>
       </resource>
       <resource methods="POST" url-mapping="/read">
           <inSequence>
               <property expression="json-eval($.base)" name="base" scope="default" type="STRING"/>
               <property expression="json-eval($.resourceType)" name="type" scope="default" type="STRING"/>
               <property expression="json-eval($.format)" name="format" scope="default" type="STRING"/>
               <fhir.init>
                   <base>http://hapi.fhir.org/baseR4</base>
               </fhir.init>
               <switch source="get-property('transport','Content-Type')">
                   <case regex="application/json">
                       <property name="format" scope="default" type="STRING" value="json"/>
                       <fhir.readResource>
                           <type>{$ctx:type}</type>
                           <format>{$ctx:format}</format>
                       </fhir.readResource>
                   </case>
                   <case regex="application/xml">
                       <property name="format" scope="default" type="STRING" value="xml"/>
                       <fhir.readResource>
                           <type>{$ctx:type}</type>
                           <format>{$ctx:format}</format>
                       </fhir.readResource>
                   </case>
                   <default></default>
               </switch>
               <log level="full" separator=","/>
               <respond/>
           </inSequence>
           <faultSequence/>
       </resource>
       <resource methods="POST" url-mapping="/readSpecificResourceById">
           <inSequence>
               <property expression="json-eval($.base)" name="base" scope="default" type="STRING"/>
               <property expression="json-eval($.resourceType)" name="type" scope="default" type="STRING"/>
               <property expression="json-eval($.format)" name="format" scope="default" type="STRING"/>
               <property expression="json-eval($.id)" name="id" scope="default" type="STRING"/>
               <property expression="json-eval($.summary)" name="summary" scope="default" type="STRING"/>
               <fhir.init>
                   <base>http://hapi.fhir.org/baseR4</base>
               </fhir.init>
               <switch source="get-property('transport','Content-Type')">
                   <case regex="application/json">
                       <property name="format" scope="default" type="STRING" value="json"/>
                       <fhir.readSpecificResourceById>
                           <type>{$ctx:type}</type>
                           <id>{$ctx:id}</id>
                           <format>{$ctx:format}</format>
                           <summary>{$ctx:summary}</summary>
                       </fhir.readSpecificResourceById>
                   </case>
                   <case regex="application/xml">
                       <property name="format" scope="default" type="STRING" value="xml"/>
                       <fhir.readSpecificResourceById>
                           <type>{$ctx:type}</type>
                           <id>{$ctx:id}</id>
                           <format>{$ctx:format}</format>
                           <summary>{$ctx:summary}</summary>
                       </fhir.readSpecificResourceById>
                   </case>
                   <default></default>
               </switch>
               <log level="full" separator=","/>
               <respond/>
           </inSequence>
           <faultSequence/>
       </resource>
       <resource methods="POST" url-mapping="/update">
           <inSequence>
               <property expression="json-eval($.base)" name="base" scope="default" type="STRING"/>
               <property expression="json-eval($.resourceType)" name="type" scope="default" type="STRING"/>
               <property expression="json-eval($.format)" name="format" scope="default" type="STRING"/>
               <property expression="json-eval($.idToUpdate)" name="idToDelete" scope="default" type="STRING"/>
               <fhir.init>
                   <base>http://hapi.fhir.org/baseR4</base>
               </fhir.init>
               <switch source="get-property('transport','Content-Type')">
                   <case regex="application/json">
                       <property name="format" scope="default" type="STRING" value="json"/>
                       <fhir.update>
                           <type>{$ctx:type}</type>
                           <idToUpdate>{$ctx:idToUpdate}</idToUpdate>
                           <format>{$ctx:format}</format>
                       </fhir.update>
                   </case>
                   <case regex="application/xml">
                       <property name="format" scope="default" type="STRING" value="xml"/>
                       <fhir.update>
                           <type>{$ctx:type}</type>
                           <idToUpdate>{$ctx:idToUpdate}</idToUpdate>
                           <format>{$ctx:format}</format>
                       </fhir.update>
                   </case>
                   <default></default>
               </switch>
               <log level="full" separator=","/>
               <respond/>
           </inSequence>
           <faultSequence/>
       </resource>
       <resource methods="POST" url-mapping="/delete">
           <inSequence>
               <property expression="json-eval($.base)" name="base" scope="default" type="STRING"/>
               <property expression="json-eval($.resourceType)" name="type" scope="default" type="STRING"/>
               <property expression="json-eval($.format)" name="format" scope="default" type="STRING"/>
               <property expression="json-eval($.idToDelete)" name="idToDelete" scope="default" type="STRING"/>
               <fhir.init>
                   <base>http://hapi.fhir.org/baseR4</base>
               </fhir.init>
               <switch source="get-property('transport','Content-Type')">
                   <case regex="application/json">
                       <property name="format" scope="default" type="STRING" value="json"/>
                       <fhir.delete>
                           <type>{$ctx:type}</type>
                           <idToDelete>{$ctx:idToDelete}</idToDelete>
                       </fhir.delete>
                   </case>
                   <case regex="application/xml">
                       <property name="format" scope="default" type="STRING" value="xml"/>
                       <fhir.delete>
                           <type>{$ctx:type}</type>
                           <idToDelete>{$ctx:idToDelete}</idToDelete>
                       </fhir.delete>
                   </case>
                   <default></default>
               </switch>
               <log level="full" separator=","/>
               <respond/>
           </inSequence>
           <faultSequence/>
       </resource>
   </api>
   ```
    To learn about supported operations and their parameters, please refer to `FHIR connector reference`.

Now we can export the imported connector and the API into a single CAR application. The CAR application is what we are going to deploy during server runtime.

## Export integration logic as a CApp
In order to export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/fhir-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

Follow these steps to deploy the exported CApp in the integration runtime. 

**Deploy on Micro Integrator**

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Test

Invoke the API as shown below using the curl command. Curl application can be downloaded from [here](https://curl.haxx.se/download.html).

### Add patient information
   
**Sample Request** 
      
```
curl -v POST -d 
   '  {  "resourceType": "Patient",
           "name": [{"family": "Jhone","given": ["Winney","Rodrigo"]}]
      }' "http://localhost:8290/resources/create" -H "Content-Type:application/json" 
       
```
**Expected Response**: 
      
```
<jsonObject>
       <resourceType>Patient</resourceType>
       <id>698021</id>
        <meta>
          <versionId>1</versionId>
          <lastUpdated>2020-03-24T07:57:14.506+00:00</lastUpdated>
        </meta>
         <text>
           <status>generated</status>
           <div>&lt;div xmlns="http://www.w3.org/1999/xhtml"&gt;&lt;div class="hapiHeaderText"&gt;Winney Rodrigo &lt;b&gt;JHONE &lt;/b&gt;&lt;/div&gt;&lt;table class="hapiPropertyTable"&gt;&lt;tbody/&gt;&lt;/table&gt;&lt;/div&gt;</div>
         </text>    
         <name>
            <family>Jhone</family>
            <given>Winney</given>
            <given>Rodrigo</given>
        </name>
</jsonObject>
```  
           
### Read patient information

**Sample Request** 
      
```
curl -v POST -d 
   '  {  
       	"resourceType": "Patient"
      }' "http://localhost:8290/resources/read" -H "Content-Type:application/json"        
```

**Expected Response**: 

It will retrieve all the existing resources in the FHIR server.
  
### Read specific patient information
   
**Sample Request** 
      
```
curl -v POST -d 
   '{
       "resourceType":"Patient",
       "id":"698021"
    }' "http://localhost:8290/resources/readSpecificResourceById" -H "Content-Type:application/json"            
```         

**Expected Response**: 
      
```xml
<jsonObject>
    <resourceType>Patient</resourceType>
    <id>698021</id>
    <meta>
        <versionId>1</versionId>
        <lastUpdated>2020-03-24T07:57:14.506+00:00</lastUpdated>
    </meta>
    <text>
        <status>generated</status>
        <div>&lt;div xmlns="http://www.w3.org/1999/xhtml"&gt;&lt;div class="hapiHeaderText"&gt;Winney Rodrigo &lt;b&gt;JHONE &lt;/b&gt;&lt;/div&gt;&lt;table class="hapiPropertyTable"&gt;&lt;tbody/&gt;&lt;/table&gt;&lt;/div&gt;</div>
        </text>
               <name>
                  <family>Jhone</family>
                  <given>Winney</given>
                  <given>Rodrigo</given>
               </name>
</jsonObject>
```

### Update patient information
   
**Sample Request** 
   
```
curl -v POST -d 
         '{
             "resourceType":"Patient",
             "idToUpdate":"597079",
             "name":[
                {
                   "family":"Marry",
                   "given":[
                      "Samsong",
                      "Perera"
                   ]
                }
             ]
          }' "http://localhost:8290/resources/update" -H "Content-Type:application/json"   
```

**Expected Response**: 
      
```xml
<jsonObject>
         <resourceType>Patient</resourceType>
         <id>597079</id>
         <meta>
            <versionId>1</versionId>
            <lastUpdated>2020-03-24T07:57:14.506+00:00</lastUpdated>
         </meta>
         <text>
            <status>generated</status>
            <div>&lt;div xmlns="http://www.w3.org/1999/xhtml"&gt;&lt;div class="hapiHeaderText"&gt;Winney Rodrigo &lt;b&gt;JHONE &lt;/b&gt;&lt;/div&gt;&lt;table class="hapiPropertyTable"&gt;&lt;tbody/&gt;&lt;/table&gt;&lt;/div&gt;</div>
         </text>
         <name>
            <family>Marry</family>
            <given>Samsong</given>
            <given>Perera</given>
         </name>
</jsonObject>
```     

### Delete patient information
    
**Sample Request** 
  
```
curl -v POST -d 
   '{
      "resourceType":"Patient",
      "idToDelete":"597079",
    }' "http://localhost:8290/resources/delete" -H "Content-Type:application/json" 
```   

**Expected Response**: 
   
```xml
<jsonObject>
         <resourceType>OperationOutcome</resourceType>
         <text>
            <status>generated</status>
            <div>&lt;div xmlns="http://www.w3.org/1999/xhtml"&gt;&lt;h1&gt;Operation Outcome&lt;/h1&gt;&lt;table border="0"&gt;&lt;tr&gt;&lt;td style="font-weight: bold;"&gt;INFORMATION&lt;/td&gt;&lt;td&gt;[]&lt;/td&gt;&lt;td&gt;&lt;pre&gt;Successfully deleted 1 resource(s) in 46ms&lt;/pre&gt;&lt;/td&gt;
                   					
                   				
                   			&lt;/tr&gt;
                   		&lt;/table&gt;
                   	&lt;/div&gt;</div>
         </text>
         <issue>
            <severity>information</severity>
            <code>informational</code>
            <diagnostics>Successfully deleted 1 resource(s) in 46ms</diagnostics>
         </issue>
</jsonObject>
```    

This demonstrates how the WSO2 FHIR connector works.
