# Salesforce REST API connector example
The Salesforce REST Connector allows you to work with records in Salesforce, a web-based service that allows organizations to manage contact relationship management (CRM) data. You can use the Salesforce connector to create, query, retrieve, update, and delete records in your organization's Salesforce data. The connector uses the [Salesforce REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm) to interact with Salesforce.

## What you'll build
This example explains how to use the Salesforce client to connect with the Salesforce instance and perform the 
following operations:

* Create an account.

     The user sends the request payload that includes sObjects (any object that can be stored in the Lightning platform database), to create a new Account object in Salesforce. This request is sent to the integration runtime by invoking the Salesforce connector API. 

* Execute a SOQL query to retrieve the Account Name and ID in all the existing accounts.

     In this example use the [Salesforce Object Query Language (SOQL)](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm) to search stored Salesforce data for specific information which is created under `sObjects`. 

<img src="{{base_path}}/assets/img/integrate/connectors/salesforce.png" title="Using Salesforce Rest Connector" width="800" alt="Using Salesforce Rest Connector"/>

The user calls the Salesforce REST API. It invokes the **create** sequence and creates a new account in Salesforce. Then through the **retrieve** sequence, it displays all the existing account details to the user. 

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project
1. Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 
2. Create a new `Salesforcerest` connection. 
    1. Go to `Local Entries` -> `Connections` and click on the `+` sign.
    2. Select  `Salesforcerest` connector.
        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-connection.png" title="Add new salesforce connection" width="800" alt="Add new salesforce connection"/>

    3. Use the following values to create the connection. 
        - **Connection Name** - `SalesforceRestConnection`
        - **Connection Type** - `init` 
        - **Access Token** - Value of the access token to access the API via request.
        - **Refresh Token** - Value of the refresh token.
        - **Client Secret** - The value of your client secret given when you registered your application with Salesforce.
        - **Client ID** - Value of your client ID given when you registered your application with Salesforce.
        - **API Version** - `v44.0`
        - **API URL** - Value of the instance URL.
        - **Host Name** - `https://login.salesforce.com`

### Add integration logic
Select Micro Integrator and click on `+` in APIs to create a REST API. Specify the API name as `salesforcerest` and the API context as `/salesforcerest`.
   
   <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

Create the sequence needed to create a Salesforce object. We will create two defined sequences called `create.xml` and  `retrieve.xml` to create an account and retrieve data. 
Select `Sequences` under the project and click on the `+` sign to create a sequence. 
    <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-sequence.png" title="Adding a Sequence" width="800" alt="Adding a Sequence"/>

#### Configure a sequence for the create operation
Now follow the steps below to add configurations to the sequence.

1. Provide `create` as the name and create the sequence. 
2. Set up the `create` operation.
    1. Set up the `create` sequence configurations. In this operation, we are going to create a `sObjects` in the Salesforce account. An `SObject` represents a specific table in the database that you can discretely query. It describes the individual metadata for the specified object. Please find the `create` operation parameters listed here.
       
        - **sObject Name**: Name of the sObject that you need to create in Salesforce.
        - **Field and Value**: The field and value you need to store in the created Salesforce sObject.
        
        While invoking the API, the above two parameter values come as a user input.
    
    2. Select the created `create` sequence. 
    3. Add the `create` operation from the `Salesforcerest` connector. 

        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-create-operation.png" title="Add create operation" width="800" alt="Add create operations"/>
    
    4. To get the input values into the API we can use the [property mediator]({{base_path}}/reference/mediators/property-mediator/). Add the `Property` mediators into the design pane as shown below.

        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-properties.png" title="Add property mediators" width="800" alt="Add property mediators"/>
    
        > **Note**: The properties should be added to the pallet before creating the operation.
    
    5. One property mediator to capture the `sObjectName` value. The sObjectName type can be used to retrieve the metadata for the Account object using the GET method or create a new Account object using the POST method. In this example, we are going to create a new Account object using the POST method.
   
        - **Property Name**: `sObjectName`
        - **Property Value**: expression `json-eval($.sObject)`
        - **Property Data Type**: `STRING`

        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-property-1-config.png" title="Configure first property mediator" width="800" alt="Configure first property mediator"/>
    
    6. Other property mediator to capture the `fieldAndValue` values. The fieldAndValue contains object fields and values that the user needs to store.
   
        - **Property Name** : `fieldAndValue`
        - **Property Value** : expression `json-eval($.fieldAndValue)`
        - **Property Data Type** : `STRING`
     
        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-property-2-config.png" title="Configure second property mediator" width="800" alt="Configure second property mediator"/>  
    
#### Configure a sequence for the retrieve operation
1. Provide `retrieve` as the name and create the sequence.
2. Set up the retrieve operation.
    1. To retrieve data from the created objects in the Salesforce account, you need to add the `query` operation to the `retrieve` sequence. 
    
        - **Query String**:  This variable contains a specified SOQL query. In this sample, this SOQL query executes to retrieve `id` and `name` from created `Account`. If the query results are too large, the response contains the first batch of results.

    2. Add the `query` operation from the `Salesforcerest` connector into the design pane of the `retrieve` sequence.      
    
        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-query-operation.png" title="Add query operation to retrieve sequence" width="800" alt="Add query operation to retrieve sequence"/> 
    
    3. Select the query operation connection to `SalesforceRestConnection` and add the `select id, name from Account` query to the properties section shown below.
    
        <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-query-operation-config.png" title="Configure query operation" width="400" alt="Configure query operation"/>
    
#### Configure the API
1. Create a resource with the below configuration. 
    
    <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-resource.png" title="Resource configuration" width="400" alt="Resource configuration"/>

2. Configure the `salesforcerest API` using the created `create` and `retrieve` sequences.
    1. Select the resource that we created. 
    2. Add the created `create` sequence. 
        1. Add a `Call Sequence` to the design pane.
            
            <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-call-sequence-1.png" title="Add call sequence 1" width="800" alt="Add call sequence 1"/> 
        
        2. Select the `create` sequence from the drop-down given for `Referring Sequence`.
    
    3. Add the created `retrieve` sequence.
        1. Add another `Call Sequence` to the design pane below the previous `Call Sequence`.

            <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-add-call-sequence-2.png" title="Add call sequence 2" width="800" alt="Add call sequence 2"/> 

        2. Select the `retrieve` sequence from the drop-down given for `Referring Sequence`. 
 
    4. Get a response from the user.
        
        When you invoke the created API the request of the message goes through the `create` and `retrieve` sequences. Finally, pass to the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/). Here the Respond Mediator stops the processing of the current message and sends the message back to the client as a response.            
        
        1. Add **respond mediator** to the **design view** at the end. 
        

3. Once you have set up the sequences and the API, you can see the `salesforcerest` API as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/sf-rest-conn-api-design.png" title="API design view" width="800" alt="API design view"/>
       
4.  Now you can switch to the Source view and check the XML configuration files of the created API, connection, and sequences. 

    ??? note "create.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="create"  trace="disable"  xmlns="http://ws.apache.org/ns/synapse">
            <property name="sObjectName" scope="default" type="STRING" expression="json-eval($.sObject)"/>
            <property name="fieldAndValue" scope="default" type="STRING" expression="json-eval($.fieldAndValue)"/>
            <salesforcerest.create configKey="SalesforceRestConnection">
                <sObjectName>{$ctx:sObject}</sObjectName>
                <fieldAndValue>{$ctx:fieldAndValue}</fieldAndValue>
            </salesforcerest.create>
        </sequence>
        ```

    ??? note "retrieve.xml"   
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <sequence name="retrieve"  trace="disable"  xmlns="http://ws.apache.org/ns/synapse">
            <salesforcerest.query configKey="SalesforceRestConnection">
                <queryString>select id, name from Account</queryString>
            </salesforcerest.query>
        </sequence>
        ```

    ??? note "salesforcerest.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/salesforcerest" name="salesforcerest" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST">
                <inSequence>
                    <sequence key="create"/>
                    <sequence key="retrieve"/>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ```
    
    ??? note "SalesforceRestConnection.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="SalesforceRestConnection" xmlns="http://ws.apache.org/ns/synapse">
            <salesforcerest.init>
                <connectionType>init</connectionType>
                <name>SalesforceRestConnection</name>
                <accessToken></accessToken>
                <apiVersion>v44.0</apiVersion>
                <hostName>https://login.salesforce.com</hostName>
                <refreshToken></refreshToken>
                <clientSecret></clientSecret>
                <clientId></clientId>
                <apiUrl></apiUrl>
                <timeout>3000</timeout>
            </salesforcerest.init>
        </localEntry>
        ```

## Get the project
You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/salesforcerest.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access token and make other such changes before deploying and running this project.

## Deployment
To deploy and run the project, please refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli). 

## Test
Save a file called data.json with the following payload. 

```json
{
	"sObject":"Account",
	"fieldAndValue": {
    "name": "Engineers",
    "description":"This Account belongs to WSO2"
  }
}
```

Invoke the API as shown below using the curl command. Curl application can be downloaded from [here](https://curl.haxx.se/download.html).


```
curl -X POST -d @data.json http://localhost:8280/salesforcerest --header "Content-Type:application/json"
```

You will get a set of account names and the respective IDs as the output. Below is an example of the expected response.
```json
{
    "totalSize": 13,
    "done": true,
    "records": [
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszhQAB"
            },
            "Id": "001dM00000HdszhQAB",
            "Name": "Edge Communications"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdsziQAB"
            },
            "Id": "001dM00000HdsziQAB",
            "Name": "Burlington Textiles Corp of America"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszjQAB"
            },
            "Id": "001dM00000HdszjQAB",
            "Name": "Pyramid Construction Inc."
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszkQAB"
            },
            "Id": "001dM00000HdszkQAB",
            "Name": "Dickenson plc"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszlQAB"
            },
            "Id": "001dM00000HdszlQAB",
            "Name": "Grand Hotels & Resorts Ltd"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszmQAB"
            },
            "Id": "001dM00000HdszmQAB",
            "Name": "United Oil & Gas Corp."
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdsznQAB"
            },
            "Id": "001dM00000HdsznQAB",
            "Name": "Express Logistics and Transport"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszoQAB"
            },
            "Id": "001dM00000HdszoQAB",
            "Name": "University of Arizona"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszpQAB"
            },
            "Id": "001dM00000HdszpQAB",
            "Name": "United Oil & Gas, UK"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszqQAB"
            },
            "Id": "001dM00000HdszqQAB",
            "Name": "United Oil & Gas, Singapore"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszrQAB"
            },
            "Id": "001dM00000HdszrQAB",
            "Name": "GenePoint"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HdszsQAB"
            },
            "Id": "001dM00000HdszsQAB",
            "Name": "sForce"
        },
        {
            "attributes": {
                "type": "Account",
                "url": "/services/data/v44.0/sobjects/Account/001dM00000HemdeQAB"
            },
            "Id": "001dM00000HemdeQAB",
            "Name": "Sample Account for Entitlements"
        }
    ]
}
```

## What's next
* To customize this example for your own scenario, see [Salesforce REST Connector Configuration]({{base_path}}/reference/connectors/salesforce-connectors/sf-rest-connector-config/) documentation for all operation details of the connector.
