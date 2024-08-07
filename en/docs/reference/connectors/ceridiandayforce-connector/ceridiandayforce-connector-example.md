# Ceridian Dayforce Connector Example 

The Ceridian Dayforce connector allows you to  access the REST API of Ceridian Dayforce HCM. Dayforce is a 
comprehensive human capital management system that covers the entire employee lifecycle including HR, payroll, 
benefits, talent management, workforce management, and services. The entire system resides on cloud that takes the 
burden of managing and replicating data on-premise.

## What you'll build

This example depicts how to use Dayforce connector to:

1. Send GET request to retrieve the address of employees from the sample environment defaults
2. Send a POST request to create contacts of an employee. (Note that the POST and PATCH requests will not update the 
sample environment database as it is shared among all developers. However, we will get a response with HTTP code 200)

Both of the two operations are exposed via an API. The API with the context `/dayforceconnector` has three resources.  

* `/getEmployeeAddress` - Once invoked, it will retrieve the address information of a specified employee
* `/postEmployeeContact`  - This will create the contact information of an employee when invoked. The relevant 
parameters must be passed in the body as we will see below.

## Set up the environment 

Please follow the steps mentioned at [Setting up Ceridian Dayforce Environment]({{base_path}}/reference/connectors/ceridiandayforce-connector/ceridiandayforce-connector-config/) document in order to create a Ceridian Dayforce developer account and obtain credentials you need to access the 
Dayforce sample APIs. Keep them saved for use in the next steps.  

## Set up the integration project

Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) to set up the Integration Project.

## Create the integration logic

1. Select Micro Integrator and click on `+` in APIs to create a REST API. In the form that opens, provide the API name as `DayforceConnectorTestAPI` and the context as `/dayforceconnector` and click on **Create**.  
    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/create-new-rest-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

2. Click on the **Service Designer** and edit the added resource method with the following configurations as shown below. 

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/edit-api-resource.png" title="Edit Resource Method" width="800" alt="Edit Resource Method"/>

    | Field            | Value                 |
    |------------------|-----------------------|
    | **URI Template** | `/getEmployeeAddress` |
    | **URL Style**    | `URI_TEMPLATE`        |
    | **Methods**      | `POST`                |
    | **Protocol**     | `HTTP, HTTPS`         |

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/edit-api-resource-configuration.png" title="Edit Resource Configuration" width="800" alt="Edit Resource Configuration"/>  
   
    Click on **Update** to save the configurations.

3. Click on the `/getEmployeeAddress` resource method from the **Service Designer** to open the graphical view, where you can add mediators and the connector to the mediation logic.

4. Add a [Log]({{base_path}}/reference/mediators/log-mediator/) mediator with the following configurations to log the request message.

    | Field            | Value                  |
    |------------------|------------------------|
    | **Log Category** | `INFO`                 |
    | **Log Level**    | `full`                 |
    | **Separator**    | `,`                    |

5. Add a [Property Group]({{base_path}}/reference/mediators/property-group-mediator/) mediator with the following parameters. 

    | Property name            | Property value (as expression)      |
    |--------------------------|-------------------------------------|
    | **username**             | `json-eval($.username)`             |
    | **password**             | `json-eval($.password)`             |
    | **clientNamespace**      | `json-eval($.clientNamespace)`      |
    | **apiVersion**           | `json-eval($.apiVersion)`           |
    | **contextDateRangeFrom** | `json-eval($.contextDateRangeFrom)` |
    | **contextDateRangeTo**   | `json-eval($.contextDateRangeTo)`   |
    | **xRefCode**             | `json-eval($.xRefCode)`             |

    You can add these properties by clicking on the **Add Parameter** of the **Property Group** tab. When entering the `Property Value` fields, make sure to select the **EX** button to specify the value types as expressions.

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-parameters-to-property-group.png" title="Add Property Group Mediator" width="800" alt="Add Property Group Mediator"/>

6. Now, add the **Ceridian Dayforce** connector to the mediation logic. Click on `+` in the graphical view and select the `cerdiandayforce` connector from the list of connectors. Select the `init` operation from the list of operations.

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-dayforce-init.png" title="Add Connector" width="800" alt="Add Connector"/>

7. Click on **Add Parameter** and add the following parameters to the Ceridian Dayforce connector's `init` operation.

    | Parameter name      | Parameter value (as expression)   |
    |---------------------|-----------------------------------|
    | **username**        | `$ctx:username`                   |
    | **password**        | `$ctx:password`                   |
    | **clientNamespace** | `$ctx:clientNamespace`            |
    | **apiVersion**      | `$ctx:apiVersion`                 |

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-dayforce-init-param.png" title="Add Parameters to Dayforce Init" width="800" alt="Add Parameters to Dayforce Init"/>

    Click on **Submit** to save the configurations.

8. Add the `getEmployeeAddresses` operation to the mediation logic. Click on `+` in the graphical view and select the `cerdiandayforce` connector from the list of connectors. Select the `getEmployeeAddresses` operation from the list of operations.

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-dayforce-get-addresses.png" title="Add Get Employee Addresses" width="800" alt="Add Get Employee Addresses"/>  

9. Click on the **Add Parameter** and add the following parameters to the Ceridian Dayforce connector's `getEmployeeAddresses` operation.

    | Parameter name           | Parameter value (as expression)   |
    |--------------------------|-----------------------------------|
    | **xRefCode**             | `$ctx:xRefCode`                   |
    | **contextDate**          | `$ctx:contextDate`                |
    | **contextDateRangeFrom** | `$ctx:contextDateRangeFrom`       |
    | **contextDateRangeTo**   | `$ctx:contextDateRangeTo`         |

    Click on **Submit** to save the configurations.

10. Add a [Respond]({{base_path}}/reference/mediators/respond-mediator/) mediator to the mediation logic to respond back to the client.

11. Let's add the logic to create contacts of an employee. Click on the **Service Designer** and add a new resource method with the following configurations as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-resource-post-employee-contacts.png" title="Add New Resource Method" width="800" alt="Add New Resource Method"/>

    | Field            | Value                  |
    |------------------|------------------------|
    | **URI Template** | `/postEmployeeContact` |
    | **URL Style**    | `URI_TEMPLATE`         |
    | **Methods**      | `POST`                 |
    | **Protocol**     | `HTTP, HTTPS`          |

    Click on **Add** to save the configurations.

12. Click on the `/postEmployeeContact` resource method from the **Service Designer** to open the graphical view, where you can add mediators and the connector to the mediation logic.

13. Add a [Log]({{base_path}}/reference/mediators/log-mediator/) mediator with the following configurations to log the request message.

    | Field            | Value                  |
    |------------------|------------------------|
    | **Log Category** | `INFO`                 |
    | **Log Level**    | `full`                 |
    | **Separator**    | `,`                    |

14. Add a [Property Group]({{base_path}}/reference/mediators/property-group-mediator/) mediator with the following parameters.

    | Property name       | Property value (as expression)      |
    |---------------------|-------------------------------------|
    | **username**        | `json-eval($.username)`             |
    | **password**        | `json-eval($.password)`             |
    | **clientNamespace** | `json-eval($.clientNamespace)`      |
    | **apiVersion**      | `json-eval($.apiVersion)`           |
    | **isValidateOnly**  | `json-eval($.isValidateOnly)`       |
    | **fieldAndValue**   | `json-eval($.fieldAndValue)`        |
    | **xRefCode**        | `json-eval($.xRefCode)`             |

    You can add these properties by clicking on **Add Parameter** of the **Property Group** tab. When entering the `Property Value` fields, make sure to select the **EX** button to specify the value types as expressions.

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-property-params-post-contacts.png" title="Add Property Group Mediator" width="800" alt="Add Property Group Mediator"/>

15. Now, add the **Ceridian Dayforce** connector to the mediation logic. Click on `+` in the graphical view and select the `cerdiandayforce` connector from the list of connectors. Select the `init` operation.

16. Click on **Add Parameter** and add the following parameters to the Ceridian Dayforce connector's `init` operation.

    | Parameter name      | Parameter value (as expression)   |
    |---------------------|-----------------------------------|
    | **username**        | `$ctx:username`                   |
    | **password**        | `$ctx:password`                   |
    | **clientNamespace** | `$ctx:clientNamespace`            |
    | **apiVersion**      | `$ctx:apiVersion`                 |

    Click on **Submit** to save the configurations.

17. Add the `postEmployeeContacts` operation to the mediation logic. Click on `+` in the graphical view and select the `cerdiandayforce` connector from the list of connectors. Select the `postEmployeeContacts` operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/dayforce/add-dayforce-post-employee-contacts.png" title="Add Post Employee Contacts" width="800" alt="Add Post Employee Contacts"/>

18. Click on **Add Parameter** and add the following parameters to the Ceridian Dayforce connector's `postEmployeeContacts` operation.

    | Parameter name     | Parameter value (as expression)   |
    |--------------------|-----------------------------------|
    | **xRefCode**       | `$ctx:xRefCode`                   |
    | **isValidateOnly** | `$ctx:isValidateOnly`             |
    | **fieldAndValue**  | `$ctx:fieldAndValue`              |

    Click on **Submit** to save the configurations.

19. Add a [Respond]({{base_path}}/reference/mediators/respond-mediator/) mediator to the mediation logic to respond back to the client.

20. The complete XML configuration of the API is as follows.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/dayforceconnector" name="DayforceConnectorTestAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/getEmployeeAddress">
            <inSequence>
                <log category="INFO" level="full" separator=","/>
			    <propertyGroup>
				    <property name="username" scope="default" type="STRING" expression="json-eval($.username)"/>
				    <property name="password" scope="default" type="STRING" expression="json-eval($.password)"/>
				    <property name="clientNamespace" scope="default" type="STRING" expression="json-eval($.clientNamespace)"/>
				    <property name="apiVersion" scope="default" type="STRING" expression="json-eval($.apiVersion)"/>
				    <property name="contextDateRangeFrom" scope="default" type="STRING" expression="json-eval($.contextDateRangeFrom)"/>
				    <property name="contextDateRangeTo" scope="default" type="STRING" expression="json-eval($.contextDateRangeTo)"/>
				    <property name="xRefCode" scope="default" type="STRING" expression="json-eval($.xRefCode)"/>
			    </propertyGroup>
			    <ceridiandayforce.init>
				    <username>{$ctx:username}</username>
				    <password>{$ctx:password}</password>
				    <clientNamespace>{$ctx:clientNamespace}</clientNamespace>
				    <apiVersion>{$ctx:apiVersion}</apiVersion>
			    </ceridiandayforce.init>
			    <ceridiandayforce.getEmployeeAddresses>
				    <xRefCode>{$ctx:xRefCode}</xRefCode>
				    <contextDate>{$ctx:contextDate}</contextDate>
				    <contextDateRangeFrom>{$ctx:contextDateRangeFrom}</contextDateRangeFrom>
				    <contextDateRangeTo>{$ctx:contextDateRangeTo}</contextDateRangeTo>
			    </ceridiandayforce.getEmployeeAddresses>
			    <respond/>
		    </inSequence>
		    <faultSequence>
		    </faultSequence>
	    </resource>
	    <resource methods="POST" uri-template="/postEmployeeContact">
		    <inSequence>
			    <log category="INFO" level="full" separator=","/>
			    <propertyGroup>
				    <property name="username" scope="default" type="STRING" expression="json-eval($.username)"/>
				    <property name="password" scope="default" type="STRING" expression="json-eval($.password)"/>
				    <property name="clientNamespace" scope="default" type="STRING" expression="json-eval($.clientNamespace)"/>
				    <property name="apiVersion" scope="default" type="STRING" expression="json-eval($.apiVersion)"/>
				    <property name="isValidateOnly" scope="default" type="STRING" expression="json-eval($.isValidateOnly)"/>
				    <property name="fieldAndValue" scope="default" type="STRING" expression="json-eval($.fieldAndValue)"/>
				    <property name="xRefCode" scope="default" type="STRING" expression="json-eval($.xRefCode)"/>
			    </propertyGroup>
			    <ceridiandayforce.init>
				    <username>{$ctx:username}</username>
				    <password>{$ctx:password}</password>
				    <clientNamespace>{$ctx:clientNamespace}</clientNamespace>
				    <apiVersion>{$ctx:apiVersion}</apiVersion>
			    </ceridiandayforce.init>
			    <ceridiandayforce.postEmployeeContacts>
				    <xRefCode>{$ctx:xRefCode}</xRefCode>
				    <isValidateOnly>{$ctx:isValidateOnly}</isValidateOnly>
				    <fieldAndValue>{$ctx:fieldAndValue}</fieldAndValue>
			    </ceridiandayforce.postEmployeeContacts>
			    <respond/>
		    </inSequence>
		    <faultSequence>
		    </faultSequence>
	    </resource>
    </api>
    ```

## Export integration logic as a CApp
In order to export the project, refer to the [build and export the composite application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/ceridiandayforce-connector-1.0.0.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.  

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Test

We can use Curl or Postman to try the API. The testing steps are provided for curl. Steps for Postman should be 
straightforward and can be derived from the curl requests.  

### GET the address information of an employee in Dayforce

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

```
curl --location --request POST 'http://192.168.8.100:8290/dayforceconnector/getEmployeeAddress' \
--header 'Content-Type: application/json' \
--data '{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr58.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "42199"
}'
```

**Note**
* You may have to change the `http://192.168.8.100:8290` part depending on the ip address on which your integration server instance is running.
* You may have to change the clientNamespace' in the request body as Dayforce developer instance gets moved around by Ceridian. The address can be obtained ad mentioned in section Setting up the environment 
 
**Expected Response**:

You should receive 200 OK response with the response body as follows,

```json
{
    "Data": [
        {
            "Address1": "4114 Yonge St.",
            "City": "North York",
            "PostalCode": "M2P 2B7",
            "Country": {
                "Name": "Canada",
                "XRefCode": "CAN",
                "ShortName": "Canada",
                "LongName": "Canada"
            },
            "State": {
                "Name": "Ontario",
                "XRefCode": "ON",
                "ShortName": "Ontario",
                "LongName": "Ontario"
            },
            "EffectiveStart": "2017-01-15T00:00:00",
            "ContactInformationType": {
                "ContactInformationTypeGroup": {
                    "XRefCode": "Address",
                    "ShortName": "Address",
                    "LongName": "Address"
                },
                "XRefCode": "PrimaryResidence",
                "ShortName": "Primary Residence",
                "LongName": "Primary Residence"
            },
            "IsPayrollMailing": false
        }
    ]
}
```
    
### POST the contact information of an employee in Dayforce

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

```
curl --location --request POST 'http://192.168.8.100:8290/dayforceconnector/postEmployeeContact' \
--header 'Content-Type: application/json' \
--data '{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr58.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "42199",
  "isValidateOnly": "FALSE",
  "contextDateRangeFrom": "2017-01-01T13:24:56",
  "fieldAndValue": {
      "ContactNumber": "202 265 8987",
      "Country": {
        "Name": "United States of America",
        "XRefCode": "USA",
        "ShortName": "United States of America",
        "LongName": "United States of America"
      },
      "EffectiveStart": "2000-01-01T00:00:00",
      "ContactInformationType": {
        "ContactInformationTypeGroup": {
          "XRefCode": "Phone",
          "ShortName": "Phone",
          "LongName": "Phone"
        },
        "XRefCode": "HomePhone",
        "ShortName": "Home",
        "LongName": "Home"
      },
      "IsForSystemCommunications": false,
      "IsPreferredContactMethod": false,
      "IsUnlistedNumber": false,
      "IsVerified": false,
      "IsRejected": false,
      "ShowRejectedWarning": true,
      "NumberOfVerificationRequests": 0
    }
}'
```

**Expected Response**:
* You should get a 200 OK response. Please note that this post will not update the database in the sample 
environment. However, if you use this in a test or production environment changes will be made to the database.

In this example Ceridian Dayforce connector is used to perform operations with Dayforce HCM.  Please read the [Ceridian Dayforce connector reference guide]({{base_path}}/reference/connectors/ceridiandayforce-connector/ceridiandayforce-connector-reference/) to learn more about the operations you can perform with the Dayforce connector.
