# Working with Employee Locations

### Overview 

The following operations allow you to retrieve, create or update locations of an employee

| Operation | Description |
| ------------- |-------------|
|[GET Employee Locations](#retrieving-employee-locations)| Retrieve locations, and their respective authority types, that an employee manages. |
|[POST Employee Locations](#creating-employee-locations)| Assign locations and authority types for an employee to manage. |
|[PATCH Employee Locations](#updating-employee-locations)| Update assigned locations and authority types for an employee to manage. |

### Operation details

This section provides more details on each of the operations.

#### Retrieving Employee Locations
We can use GET Employee Locations operation with required parameters to search and find location of an employee.

**GET Employee Locations**
```xml
<ceridiandayforce.getEmployeeLocations>
    <xRefCode>{${properties.xRefCode}}</xRefCode>
    <contextDate>{${properties.contextDate}}</contextDate>
    <contextDateRangeFrom>{${properties.contextDateRangeFrom}}</contextDateRangeFrom>
    <contextDateRangeTo>{${properties.contextDateRangeTo}}</contextDateRangeTo>
</ceridiandayforce.getEmployeeLocations>
```

**Properties**

* xRefCode (Mandatory): The unique identifier (external reference code) of the employee whose data will be retrieved. The value provided must be the exact match for an employee; otherwise, a bad request (400) error will be returned.
* contextDate (Optional): The Context Date value is an “as-of” date used to determine which employee data to search when records have specific start and end dates. The service defaults to the current datetime if the requester does not specify a value. Example: 2017-01-01T13:24:56
* contextDateRangeFrom (Optional): The Context Date Range From value is the start of the range of dates used to determine which employee data to search when records have specific start and end dates. The service defaults to null if the requester does not specify a value. Example: 2017-01-01T13:24:56
* contextDateRangeTo (Optional): The Context Date Range To value is the end of the range of dates to determine which employee data to search when records have specific start and end dates. The service defaults to null if the requester does not specify a value. Example: 2017-01-01T13:24:56

**Sample request**

Following is a sample request that can be handled by this operation.

```json
{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "42199",
  "contextDateRangeFrom": "2017-01-01T13:24:56"
}
```

**Sample response**

Given below is a sample response for this operation.

```json
{
    "Data": [
        {
            "IsPrimary": true,
            "Location": {
                "XRefCode": "Bank 1Admin",
                "ShortName": "Bank 1 - Admin",
                "LongName": "Bank 1 - Admin"
            },
            "EffectiveStart": "2019-01-01T00:00:00",
            "IsDefault": true,
            "EmployeeLocationAuthorities": {
                "Items": [
                    {
                        "EffectiveStart": "2019-01-01T00:00:00",
                        "AuthorityType": {
                            "XRefCode": "MANAGER",
                            "ShortName": "Manager",
                            "LongName": "Management"
                        }
                    }
                ]
            }
        }
    ]
}
```

**Related Dayforce documentation**

[https://developers.dayforce.com/Build/API-Explorer/User-Security,-Authority-Management/Locations/GET-Employee-Locations.aspx](https://developers.dayforce.com/Build/API-Explorer/User-Security,-Authority-Management/Locations/GET-Employee-Locations.aspx)

#### Creating Employee Locations
We can use POST Employee Locations operation with required parameters to create employee locations.

**POST Employee Locations**
```xml
<ceridiandayforce.postEmployeeLocations>
    <xRefCode>{${properties.xRefCode}}</xRefCode>
    <isValidateOnly>{${properties.isValidateOnly}}</isValidateOnly>
    <fieldAndValue>{${properties.fieldAndValue}}</fieldAndValue>
</ceridiandayforce.postEmployeeLocations>
```

**Properties**

* xRefCode (Mandatory): The unique identifier (external reference code) of the employee whose data will be retrieved. The value provided must be the exact match for an employee; otherwise, a bad request (400) error will be returned.
* isValidateOnly (Mandatory): When a TRUE value is used in this parameter, POST and PATCH operations validate the request without applying updates to the database.

**Sample request**

Following is a sample request that can be handled by this operation.

```json
{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "42199",
  "isValidateOnly": "true",
  "fieldAndValue": {
            "IsPrimary": true,
            "Location": {
                "XRefCode": "Bank 1Admin",
                "ShortName": "Bank 1 - Admin",
                "LongName": "Bank 1 - Admin"
            },
            "EffectiveStart": "2019-01-01T00:00:00",
            "IsDefault": true,
            "EmployeeLocationAuthorities": {
                "Items": [
                    {
                        "EffectiveStart": "2019-01-01T00:00:00",
                        "AuthorityType": {
                            "XRefCode": "MANAGER",
                            "ShortName": "Manager",
                            "LongName": "Management"
                        }
                    }
                ]
            }
        }
}
```

**Sample response**

Dayforce returns HTTP Code 200

**Related Dayforce documentation**

[https://developers.dayforce.com/Build/API-Explorer/User-Security,-Authority-Management/Locations/POST-Employee-Locations.aspx](https://developers.dayforce.com/Build/API-Explorer/User-Security,-Authority-Management/Locations/POST-Employee-Locations.aspx)

#### Updating Employee Locations
We can use PATCH Employee Locations operation with required parameters to update the locations of employees.

**PATCH Employee Locations**
```xml
<ceridiandayforce.patchEmployeeLocations>
    <xRefCode>{${properties.xRefCode}}</xRefCode>
    <isValidateOnly>{${properties.isValidateOnly}}</isValidateOnly>
    <fieldAndValue>{${properties.fieldAndValue}}</fieldAndValue>
</ceridiandayforce.patchEmployeeLocations>
```

**Properties**

* xRefCode (Mandatory): The unique identifier (external reference code) of the employee whose data will be retrieved. The value provided must be the exact match for an employee; otherwise, a bad request (400) error will be returned.
* isValidateOnly (Mandatory): When a TRUE value is used in this parameter, POST and PATCH operations validate the request without applying updates to the database.

**Sample request**

Following is a sample request that can be handled by this operation.

```json
{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "42199",
  "isValidateOnly": "true",
  "fieldAndValue": {
            "IsPrimary": true,
            "Location": {
                "XRefCode": "Bank 1Admin",
                "ShortName": "Bank 1 - Admin",
                "LongName": "Bank 1 - Admin"
            },
            "EffectiveStart": "2019-01-01T00:00:00",
            "IsDefault": true,
            "EmployeeLocationAuthorities": {
                "Items": [
                    {
                        "EffectiveStart": "2019-01-01T00:00:00",
                        "AuthorityType": {
                            "XRefCode": "MANAGER",
                            "ShortName": "Manager",
                            "LongName": "Management"
                        }
                    }
                ]
            }
        }
}
```

**Sample response**

Dayforce returns HTTP Code 200

**Related Dayforce documentation**

[https://developers.dayforce.com/Build/API-Explorer/User-Security,-Authority-Management/Locations/PATCH-Employee-Locations.aspx](https://developers.dayforce.com/Build/API-Explorer/User-Security,-Authority-Management/Locations/PATCH-Employee-Locations.aspx)

### Sample configuration

Following example illustrates how to connect to Dayforce with the init operation and query operation.

1.Create a sample proxy as below :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<proxy xmlns="http://ws.apache.org/ns/synapse"
       name="query"
       startOnLoad="true"
       statistics="disable"
       trace="disable"
       transports="http,https">
   <target>
      <inSequence>
         <log level="full" separator=","/>
         <property expression="${payload.username}" name="username"/>
         <property expression="${payload.password}" name="password"/>
         <property expression="${payload.clientNamespace}" name="clientNamespace"/>
         <property expression="${payload.apiVersion}" name="apiVersion"/>
         <property expression="${payload.xRefCode}" name="xRefCode"/>
         <property expression="${payload.isValidateOnly}" name="isValidateOnly"/>
         <property expression="${payload.fieldAndValue}" name="fieldAndValue"/>
         <ceridiandayforce.init>
            <username>{${properties.username}}</username>
            <password>{${properties.password}}</password>
            <clientNamespace>{${properties.clientNamespace}}</clientNamespace>
            <apiVersion>{${properties.apiVersion}}</apiVersion>
         </ceridiandayforce.init>
         <ceridiandayforce.postEmployeeLocations>
            <xRefCode>{${properties.xRefCode}}</xRefCode>
            <isValidateOnly>{${properties.isValidateOnly}}</isValidateOnly>
            <fieldAndValue>{${properties.fieldAndValue}}</fieldAndValue>
         </ceridiandayforce.postEmployeeLocations>
         <send/>
      </inSequence>
   </target>
   <description/>
</proxy>
                                
```

2.Create a json file named query.json and copy the configurations given below to it:

```json
{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "42199",
  "isValidateOnly": "true",
  "fieldAndValue": {
            "IsPrimary": true,
            "Location": {
                "XRefCode": "Bank 1Admin",
                "ShortName": "Bank 1 - Admin",
                "LongName": "Bank 1 - Admin"
            },
            "EffectiveStart": "2019-01-01T00:00:00",
            "IsDefault": true,
            "EmployeeLocationAuthorities": {
                "Items": [
                    {
                        "EffectiveStart": "2019-01-01T00:00:00",
                        "AuthorityType": {
                            "XRefCode": "MANAGER",
                            "ShortName": "Manager",
                            "LongName": "Management"
                        }
                    }
                ]
            }
        }
}
```
3.Replace the credentials with your values.

4.Execute the following curl command:

```bash
curl http://localhost:8280/services/query -H "Content-Type: application/json" -d @query.json
```
5.Dayforce returns HTTP Code 200
