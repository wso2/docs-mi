---
search:
  boost: 2
---
# ServiceNow Connector Example

The WSO2 ServiceNow connector allows you to access the ServiceNow REST API from an integration sequence. Using ServiceNow connector you can work with Aggregate API, Import Set API, and Table API in ServiceNow. You can read more about ServiceNow REST APIs from [here](https://developer.servicenow.com/dev.do#!/reference/api/orlando/rest/c_TableAPI).

## What you'll build

This example explains how to use ServiceNow Connector to create records in a table and retrieve its information. Assume your organization uses ServiceNow support and you need to create an incident. In order to do that we can use the tableAPI, which is a REST API. This can be easily done using WSO2 ServiceNow connector. Whenever you need to raise an incident at ServiceNow, the above API can be called with the required information.

It will have two HTTP API resources, which are `postRecord` and `readRecord`. 

[![ServiceNow scenario]({{base_path}}/assets/img/integrate/connectors/servicenow-scenario.png)]({{base_path}}/assets/img/integrate/connectors/servicenow-scenario.png)

* `/postRecord`: It creates a new record in the existing incident table in the ServiceNow instance.

* `/readRecord `: It reads the detailed information about the created incident record in the incident table.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the environment 

Please follow the steps mentioned in the [Setting up ServiceNow Instance]({{base_path}}/reference/connectors/servicenow-connector/settingup-servicenow-instance/) document in order to create a ServiceNow Instance and obtain the credentials. Keep them saved to be used in the next steps.  

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up WSO2 MI and create a new integration project. Use a suitable Project Name for your integration.

## Create a connection

1. In the Design View, click the **+** button and select **Connection**.

2. In the search bar, type `servicenow` and select the `Servicenow Connector` from the list.

3. In the connection configuration pane, set the **Connection Name** to `ServiceNowConnection` and fill in the required details:
    - **Username**: The username of the ServiceNow account.
    - **Password**: The password of the ServiceNow account.
    - **API URL**: Base URL of your ServiceNow instance (e.g., `https://<site-url>`).
    
    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-service-now-connection.png" title="Adding new connectio" height="100" width="500" alt="Adding new connectio"/>  
      
## Create an API

1. In the Design View, click the **+** button and select **API** in create an integration project pane.

2. Enter the API Name as `serviceNow` and the Context as `/servicenow`, then click **Create**.

3. To add the ServiceNow connector:
    - In the **Design View**, click the **+** button. 
    - In the **Mediator** section, search for `servicenow`. 
    - Select the **servicenow** connector and click **Download**.

## Implement the API

1. Go to the **Source View** of the API by clicking on the **<>** icon in the top right corner of the **Design View**.
2. Copy and paste the following code in the **Source View** of the API.

??? note "Source view of the implemented resource"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/servicenow" name="serviceNow" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/postRecord">
            <inSequence>
                <servicenow.postRecord configKey="ServiceNowConnection">
                    <tableName>incident</tableName>
                    <sysparmDisplayValue>true</sysparmDisplayValue>
                    <sysparmFields>short_description,number,sys_id</sysparmFields>
                    <sysparmView>short_description,number,sys_id</sysparmView>
                    <sysparmExcludeReferenceLink>false</sysparmExcludeReferenceLink>
                    <sysparmInputDisplayValue>true</sysparmInputDisplayValue>
                    <number>34</number>
                    <shortDescription>Incident type: L2</shortDescription>
                    <active>true</active>
                    <approval>owner</approval>
                    <category>inquiry</category>
                    <contactType>email</contactType>
                    <apiColumns></apiColumns>
                </servicenow.postRecord>
                <log category="INFO" logMessageID="false" logFullPayload="true">
                    <message></message>
                </log>
                <servicenow.getRecordById configKey="ServiceNowConnection">
                    <sysId>{${payload.result.sys_id}}</sysId>
                    <tableName>incident</tableName>
                    <sysparmDisplayValue></sysparmDisplayValue>
                    <sysparmFields></sysparmFields>
                    <sysparmView></sysparmView>
                    <sysparmExcludeReferenceLink></sysparmExcludeReferenceLink>
                </servicenow.getRecordById>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
   
## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/serviceNowConnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the instance details and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

### Post record operation

**Sample request**:

- Content-Type: `application/json`
- Request body:
  ```json
  {
    "payload": {}
  }
  ```

**Expected Response** : You should get a response as given below.
```json
{
   "result": {
      "short_description": "Incident type: L2",
      "number": "34",
      "sys_id": "52fc51d9c3aa261043761c84e40131c2"
   }
}
```

## What's next

* To customize this example for your own scenario, see [ServiceNow Connector Configuration]({{base_path}}/reference/connectors/servicenow-connector/servicenow-connector-config/) documentation for all operation details of the connector.
