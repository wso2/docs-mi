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

Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) to set up the Integration Project.

## Create the mediation logic

1. First, create the `PostRecord` and `ReadRecord` sequences. Select Micro Integrator and click `+` on **Sequences** to create the sequence.

    <a href="{{base_path}}/assets/img/integrate/connectors/servicenow/add-sequence.png"><img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-sequence.png" title="Adding a Sequence" width="800" alt="Adding a Sequence"/></a>

2. Provide the Sequence name as `PostRecord` and click on **Create**. It will open a graphical view of the sequence where you can add the mediators and connectors.  

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-to-sequence.png" title="Adding artifacts to Sequence" width="800" alt="Adding artifacts to Sequence"/>  

3. In the graphical view click on `+` and go to the **Connectors** tab. Click on the `servicenow` connector and select the `init` operation.  

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-servicenow-init.png" title="Adding init operation" width="800" alt="Adding init operation"/>

4. Click on `+ Add Parameter` and provide the following key-value pairs. You need to use the **ServiceNow instance URL**, **username**, and **password** that you obtained when setting up the ServiceNow instance.

    | Key                       | Value                              |
    |---------------------------|------------------------------------|
    | **serviceNowInstanceURL** | `https://dev55707.service-now.com` |
    | **username**              | `admin`                            |
    | **password**              | `Diazo123@`                        |
   
    Click on **Submit** to save the configuration.  

5. Now add the `postRecord` operation to the sequence. Click on `+` and go to the **Connectors** tab. Click on the `servicenow` connector and select `postRecord` operation. 

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-servicenow-postRecord.png" title="Adding postRecord operation" width="800" alt="Adding postRecord operation"/>  

6. Click on `+ Add Parameter` and provide the following key-value pairs.  

    | Key                          | Value                             |
    |------------------------------|-----------------------------------|
    | **tableName**                | `incident`                        |
    | **sysparmDisplayValue**      | `true`                            |
    | **sysparmFields**            | `short_description,number,sys_id` |
    | **sysparmView**              | `short_description,number,sys_id` |
    | **sysparmInputDisplayValue** | `true`                            |
    | **number**                   | `34`                              |
    | **shortDescription**         | `{$ctx:shortDescription}`         |
    | **active**                   | `true`                            |
    | **approval**                 | `owner`                           |
    | **category**                 | `inquiry`                         |
    | **contactType**              | `{$ctx:contactType}`              |

    Click on **Submit** to save the configuration.

7. Add a **[Property]({{base_path}}/reference/mediators/property-mediator/)** mediator to the sequence to save the `sys_id` of the created incident. Click on `+` and go to the **Mediators** tab. Click on the **Property** mediator and provide the following details.  

    | Property               | Value                        |
    |------------------------|------------------------------|
    | **Property Name**      | `sysId`                      |
    | **Property Scope**     | `default`                    |
    | **Property Data Type** | `STRING`                     |
    | **Property Action**    | `Set`                        |
    | **Property Value**     | `json-eval($.result.sys_id)` |

    When entering the **Property Value**, make sure to select the **EX** button to specify the value type as an expression. 

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-postrec-seq-property.png" title="Adding property mediator" width="800" alt="Adding property mediator"/>

    Click on **Submit** to complete the property mediator creation. Now the `postRecord` sequence is created, and you can view the mediation logic in the graphical view and source view as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/postRecord-sequence.png" title="postRecord sequence" width="800" alt="postRecord sequence"/>

    ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="PostRecord" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
      <servicenow.init>
          <serviceNowInstanceURL>https://dev55707.service-now.com</serviceNowInstanceURL>
          <username>admin</username>
          <password>Diazo123@</password>
      </servicenow.init>
      <servicenow.postRecord>
          <tableName>incident</tableName>
          <sysparmDisplayValue>true</sysparmDisplayValue>
          <sysparmFields>short_description,number,sys_id</sysparmFields>
          <sysparmView>short_description,number,sys_id</sysparmView>
          <sysparmInputDisplayValue>true</sysparmInputDisplayValue>
          <number>34</number>
          <shortDescription>{$ctx:shortDescription}</shortDescription>
          <active>true</active>
          <approval>owner</approval>
          <category>inquiry</category>
          <contactType>{$ctx:contactType}</contactType>
      </servicenow.postRecord>
      <property name="sysId" scope="default" type="STRING" expression="json-eval($.result.sys_id)"/>
      </sequence>
    ```  
   
8. Similarly, create the `ReadRecord` sequence by click `+` on **Sequences**. Provide the Sequence name as `ReadRecord` and click on **Create**. Follow the steps 3 and 4 to add the `init` operation of the ServiceNow connector to the sequence.

9. Then add the `getRecordById` operation to the sequence. Click on `+` and go to the **Connectors** tab. Click on the `servicenow` connector and select `getRecordById` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-servicenow-getRecordById.png" title="Adding getRecordById operation" width="800" alt="Adding getRecordById operation"/>

10. Click on `+ Add Parameter` and provide the following key-value pairs.

    | Key           | Value          |
    |---------------|----------------|
    | **sysId**     | `{$ctx:sysId}` |
    | **tableName** | `incident`     |

    Click on **Submit** to save the configuration.

    The `ReadRecord` sequence is created, and you can view the mediation logic in the graphical view and source view as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/readRecord-sequence.png" title="readRecord sequence" width="800" alt="readRecord sequence"/>

    ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="ReadRecord" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
      <servicenow.init>
          <serviceNowInstanceURL>https://dev55707.service-now.com</serviceNowInstanceURL>
          <username>admin</username>
          <password>Diazo123@</password>
      </servicenow.init>
      <servicenow.getRecordById>
          <sysId>{$ctx:sysId}</sysId>
          <tableName>incident</tableName>
      </servicenow.getRecordById>
      </sequence>
    ```
    
11. Now let's create the REST API to expose the above sequences. Click on `+` in **APIs** and select **New REST API**. Provide the API name as `ServiceNowAPI` and the context as `/servicenow` and click on **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-servicenow-api.png" title="Adding Rest API" width="800" alt="Adding Rest API"/>

12. Click on the **Service Designer** and edit the added resource method and enter the following details as shown in the images below. 

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/edit-rest-api.png" title="Edit resource" width="800" alt="Edit resource"/>

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/add-postRecord-resource.png" title="Adding postRecord resource" width="800" alt="Adding postRecord resource"/>

13. Add another API resource by clicking on `+ Resource` from the **Service Designer** and enter the following details.

    | Property         | Value          |
    |------------------|----------------|
    | **URL Style**    | `URI_TEMPLATE` |
    | **URI Template** | `/readRecord`  |
    | **HTTP Method**  | `POST`         |
    | **Protocol**     | `HTTP, HTTPS`  |

14. Let's update the `/postRecord` resource with the required mediation logic. Click on the `/postRecord` to open the graphical view and a property mediator with the following details.

    | Property               | Value                           |
    |------------------------|---------------------------------|
    | **Property Name**      | `shortDescription`              |
    | **Property Scope**     | `default`                       |
    | **Property Data Type** | `STRING`                        |
    | **Property Action**    | `Set`                           |
    | **Property Value**     | `json-eval($.shortDescription)` |

    Make sure to select the **EX** button in the **Property Value** and Click on **Submit**.

15. Add another property mediator with the following details.

    | Property               | Value                      |
    |------------------------|----------------------------|
    | **Property Name**      | `contactType`              |
    | **Property Scope**     | `default`                  |
    | **Property Data Type** | `STRING`                   |
    | **Property Action**    | `Set`                      |
    | **Property Value**     | `json-eval($.contactType)` |

    Make sure to select the **EX** button in the **Property Value** and Click on **Submit**.

16. Add a **[Call Sequence]({{base_path}}/reference/mediators/sequence-mediator/)** mediator and select the `PostRecord` sequence as the **Referring sequence**. 

17. Add the **[Respond]({{base_path}}/reference/mediators/respond-mediator/)** mediator to respond to the request. 

    The final mediation logic of the `/postRecord` resource is shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/postRecord-resource-diagram.png" title="postRecord resource" width="800" alt="postRecord resource"/>

18. similarly, update the `/readRecord` resource with the required mediation logic. Click on the `/readRecord` to open the graphical view and add a property mediator with the following details.

    | Property               | Value                |
    |------------------------|----------------------|
    | **Property Name**      | `sysId`              |
    | **Property Scope**     | `default`            |
    | **Property Data Type** | `STRING`             |
    | **Property Action**    | `Set`                |
    | **Property Value**     | `json-eval($.sysId)` |

    Make sure to select the **EX** button in the **Property Value** and Click on **Submit**.

19. Add a **Call Sequence** mediator and select the `ReadRecord` sequence as the **Referring sequence**.

20. Add the **Respond** mediator to respond to the request. 

    The final mediation logic of the `/readRecord` resource appears as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/servicenow/readRecord-resource-diagram.png" title="readRecord resource" width="800" alt="readRecord resource"/>

21. Now you have created the REST API with the required resources and mediation logic. You can view the source view of the API configuration as shown below.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/servicenow" name="ServiceNowAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/postRecord">
            <inSequence>
                <property name="shortDescription" scope="default" type="STRING" expression="json-eval($.shortDescription)"/>
                <property name="contactType" scope="default" type="STRING" expression="json-eval($.contactType)"/>
                <sequence key="PostRecord"/>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
        <resource methods="POST" uri-template="/readRecord">
            <inSequence>
                <property name="sysId" scope="default" type="STRING" expression="json-eval($.sysId)"/>
                <sequence key="ReadRecord"/>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```

## Export integration logic as a CApp
In order to export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/servicenow.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the instance details and make other such changes before deploying and running this project.

## Deployment

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

## Test

### Post record operation

1. Create a file called data.json with the following payload. You can further refer to the parameters from [here](https://docs.servicenow.com/bundle/orlando-application-development/page/integrate/inbound-rest/concept/c_TableAPI.html#c_TableAPI).
    ```
    {
        "shortDescription":"Incident type: L2",
        "contacttype":"email"
    }
    ```
2. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here] (https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/servicenow/postRecord
    ```
**Expected response**: 
You should get the following response with the 'sys_id' and keep it saved. 
```
  {
    "result": {
        "short_description": "Incident type: L2",
        "number": "34",
        "sys_id": "fd7e0271073f801036baf03c7c1ed0ff"
    }
}
```

### Read record operation

1. Create a file called data.json with the following payload. Make sure you paste above saved sys_id as the sysId below. 
    ```
    {
        "sysId":"fd7e0271073f801036baf03c7c1ed0ff"
    }
    ```
2. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here] (https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/fileconnector/readrecord
    ```

**Expected response**: 
You should get the following text returned. 

  ```
  {
      "result":{
          "parent":"",
          "made_sla":"true",
          "caused_by":"",
          "watch_list":"",
          "upon_reject":"cancel",
          "sys_updated_on":"2020-03-27 17:45:43",
          "child_incidents":"0",
          "hold_reason":"",
          "approval_history":"",
          "number":"34",
          "resolved_by":"",
          "sys_updated_by":"admin",
          "opened_by":{
            "link":"https://dev55707.service-now.com/api/now/table/sys_user/6816f79cc0a8016401c5a33be04be441",
            "value":"6816f79cc0a8016401c5a33be04be441"
          },
          "user_input":"",
          "sys_created_on":"2020-03-27 17:45:43",
          "sys_domain":{
            "link":"https://dev55707.service-now.com/api/now/table/sys_user_group/global",
            "value":"global"
          },
          "state":"1",
          "sys_created_by":"admin",
          "knowledge":"false",
          "order":"",
          "calendar_stc":"",
          "closed_at":"",
          "cmdb_ci":"",
          "delivery_plan":"",
          "contract":"",
          "impact":"3",
          "active":"true",
          "work_notes_list":"",
          "business_service":"",
          "priority":"5",
          "sys_domain_path":"/",
          "rfc":"",
          "time_worked":"",
          "expected_start":"",
          "opened_at":"2020-03-27 17:45:43",
          "business_duration":"",
          "group_list":"",
          "work_end":"",
          "caller_id":"",
          "reopened_time":"",
          "resolved_at":"",
          "approval_set":"",
          "subcategory":"",
          "work_notes":"",
          "short_description":"Incident type: L2",
          "close_code":"",
          "correlation_display":"",
          "delivery_task":"",
          "work_start":"",
          "assignment_group":"",
          "additional_assignee_list":"",
          "business_stc":"",
          "description":"",
          "calendar_duration":"",
          "close_notes":"",
          "notify":"1",
          "service_offering":"",
          "sys_class_name":"incident",
          "closed_by":"",
          "follow_up":"",
          "parent_incident":"",
          "sys_id":"fd7e0271073f801036baf03c7c1ed0ff",
          "contact_type":"",
          "reopened_by":"",
          "incident_state":"1",
          "urgency":"3",
          "problem_id":"",
          "company":"",
          "reassignment_count":"0",
          "activity_due":"",
          "assigned_to":"",
          "severity":"3",
          "comments":"",
          "approval":"not requested",
          "sla_due":"",
          "comments_and_work_notes":"",
          "due_date":"",
          "sys_mod_count":"0",
          "reopen_count":"0",
          "sys_tags":"",
          "escalation":"0",
          "upon_approval":"proceed",
          "correlation_id":"",
          "location":"",
          "category":"inquiry"
      }
  }     
  ```

## What's next

* To customize this example for your own scenario, see [ServiceNow Connector Configuration]({{base_path}}/reference/connectors/servicenow-connector/servicenow-connector-config/) documentation for all operation details of the connector.
