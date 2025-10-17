# Working with Org Unit Details

### Overview 

The following operations allow you to retrieve details of a specific Org Unit

| Operation | Description |
| ------------- |-------------|
|[GET Org Unit Details](#retrieving-org-unit-details)| Retrieve details of a specific Org Unit using its XRefCode, including its relationship to a Parent Org Unit and Legal Entity.  The list of Org Unit XRefCodes can be retrieved using GET Org Units. |

### Operation details

This section provides more details on each of the operations.

#### Retrieving Org Unit Details
We can use GET Org Unit Details operation with required parameters to find details of a selected org unit

**GET Org Unit Details**
```xml
<ceridiandayforce.getOrgUnitDetails>
    <xRefCode>{${properties.xRefCode}}</xRefCode>
    <contextDate>{${properties.contextDate}}</contextDate>
    <expand>{${properties.expand}}</expand>
    <includeChildOrgUnits>{${properties.includeChildOrgUnits}}</includeChildOrgUnits>
</ceridiandayforce.getOrgUnitDetails>
```

**Properties**

* xRefCode (Mandatory - string): The unique identifier (external reference code) of the org unit. The value provided must be the exact match for an org unit; otherwise, a bad request (400) error will be returned.
* contextDate (Optional - string): The Context Date value is an “as-of” date used to determine which org unit data to search when records have specific start and end dates. The service defaults to the current datetime if the requester does not specify a value. Example: 2019-01-01T12:34:56
* expand (Optional - string): This parameter accepts a comma-separated list of top-level entities that contain the data elements needed for downstream processing. When this parameter is not used, only data elements from the orgunit primary record will be included. For more information, please refer to the Introduction to Dayforce Web Services document.
* includeChildOrgUnits (Optional - boolean): When a TRUE value is used in this parameter, the immediate child org units’ information under the org unit being retrieved will be returned as well. The default value is FALSE if parameter is not specified.

**Sample request**

Following is a sample request that can be handled by this operation.

```json
{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "xRefCode": "Store320",
  "includeChildOrgUnits": "true"
}
```

**Sample response**

Given below is a sample response for this operation.

```json
{
    "Data": {
        "OrgLevel": {
            "XRefCode": "Site",
            "ShortName": "Site",
            "LongName": "Site"
        },
        "PhysicalLocation": true,
        "PostalCode": "63103",
        "CountryCode": "USA",
        "OpeningDate": "2012-01-01T00:00:00",
        "GeoCity": {
            "ShortName": "St. Louis"
        },
        "County": "St. Louis",
        "IsOrgManaged": true,
        "IsMobileOrg": false,
        "LedgerCode": "",
        "StateCode": "MO",
        "Address": "1401 Clark Ave.",
        "ChildOrgUnits": {
            "Items": [
                {
                    "OrgLevel": {
                        "XRefCode": "OnSiteDepartment",
                        "ShortName": "Department",
                        "LongName": "Department"
                    },
                    "XRefCode": "Store 32014",
                    "ShortName": "Store 320 - Customer Service"
                },
                {
                    "OrgLevel": {
                        "XRefCode": "OnSiteDepartment",
                        "ShortName": "Department",
                        "LongName": "Department"
                    },
                    "XRefCode": "Store 32025",
                    "ShortName": "Store 320 - Meat"
                },
                {
                    "OrgLevel": {
                        "XRefCode": "OnSiteDepartment",
                        "ShortName": "Department",
                        "LongName": "Department"
                    },
                    "XRefCode": "Store 32026",
                    "ShortName": "Store 320 - Produce"
                },
                {
                    "OrgLevel": {
                        "XRefCode": "OnSiteDepartment",
                        "ShortName": "Department",
                        "LongName": "Department"
                    },
                    "XRefCode": "Store 32027",
                    "ShortName": "Store 320 - Seafood"
                },
                {
                    "OrgLevel": {
                        "XRefCode": "OnSiteDepartment",
                        "ShortName": "Department",
                        "LongName": "Department"
                    },
                    "XRefCode": "Store 32028",
                    "ShortName": "Store 320 - Stocking"
                },
                {
                    "OrgLevel": {
                        "XRefCode": "OnSiteDepartment",
                        "ShortName": "Department",
                        "LongName": "Department"
                    },
                    "XRefCode": "Store 320 Mgmt",
                    "ShortName": "Store 320 - Management"
                }
            ]
        },
        "XRefCode": "Store320",
        "ShortName": "Store 320"
    }
}
```

**Related Dayforce documentation**

[https://developers.dayforce.com/Build/API-Explorer/Configuration/Organization-Data/Org-Units/PATCH-Org-Units.aspx](https://developers.dayforce.com/Build/API-Explorer/Configuration/Organization-Data/Org-Units/PATCH-Org-Units.aspx)
(sic)

### Sample configuration

Following example illustrates how to connect to Dayforce with the init operation and query operation.

1. Create a sample proxy as shown below:

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
         <property expression="${payload.includeChildOrgUnits}" name="includeChildOrgUnits"/>
         <ceridiandayforce.init>
            <username>{${properties.username}}</username>
            <password>{${properties.password}}</password>
            <clientNamespace>{${properties.clientNamespace}}</clientNamespace>
            <apiVersion>{${properties.apiVersion}}</apiVersion>
         </ceridiandayforce.init>
         <ceridiandayforce.getOrgUnitDetails>
            <xRefCode>{${properties.xRefCode}}</xRefCode>
            <includeChildOrgUnits>{${properties.includeChildOrgUnits}}</includeChildOrgUnits>
         </ceridiandayforce.getOrgUnitDetails>
         <send/>
      </inSequence>
    </target>
    <description/>
    </proxy>
                                
    ```

2. Create a json file named query.json and copy the configurations given below to it:

    ```json
    {
        "username": "DFWSTest",
        "password": "DFWSTest",
        "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
        "apiVersion": "V1",
        "xRefCode": "Store320",
        "includeChildOrgUnits": "true"
    }
    ```

3. Replace the credentials with your values.

4. Execute the following curl command:

    ```bash
    curl http://localhost:8280/services/query -H "Content-Type: application/json" -d @query.json
    ```
5. Dayforce returns HTTP Code 200 with the following response body.

    ```json
    {
        "Data": {
            "OrgLevel": {
                "XRefCode": "Site",
                "ShortName": "Site",
                "LongName": "Site"
            },
            "PhysicalLocation": true,
            "PostalCode": "63103",
            "CountryCode": "USA",
            "OpeningDate": "2012-01-01T00:00:00",
            "GeoCity": {
                "ShortName": "St. Louis"
            },
            "County": "St. Louis",
            "IsOrgManaged": true,
            "IsMobileOrg": false,
            "LedgerCode": "",
            "StateCode": "MO",
            "Address": "1401 Clark Ave.",
            "ChildOrgUnits": {
                "Items": [
                    {
                        "OrgLevel": {
                            "XRefCode": "OnSiteDepartment",
                            "ShortName": "Department",
                            "LongName": "Department"
                        },
                        "XRefCode": "Store 32014",
                        "ShortName": "Store 320 - Customer Service"
                    },
                    {
                        "OrgLevel": {
                            "XRefCode": "OnSiteDepartment",
                            "ShortName": "Department",
                            "LongName": "Department"
                        },
                        "XRefCode": "Store 32025",
                        "ShortName": "Store 320 - Meat"
                    },
                    {
                        "OrgLevel": {
                            "XRefCode": "OnSiteDepartment",
                            "ShortName": "Department",
                            "LongName": "Department"
                        },
                        "XRefCode": "Store 32026",
                        "ShortName": "Store 320 - Produce"
                    },
                    {
                        "OrgLevel": {
                            "XRefCode": "OnSiteDepartment",
                            "ShortName": "Department",
                            "LongName": "Department"
                        },
                        "XRefCode": "Store 32027",
                        "ShortName": "Store 320 - Seafood"
                    },
                    {
                        "OrgLevel": {
                            "XRefCode": "OnSiteDepartment",
                            "ShortName": "Department",
                            "LongName": "Department"
                        },
                        "XRefCode": "Store 32028",
                        "ShortName": "Store 320 - Stocking"
                    },
                    {
                        "OrgLevel": {
                            "XRefCode": "OnSiteDepartment",
                            "ShortName": "Department",
                            "LongName": "Department"
                        },
                        "XRefCode": "Store 320 Mgmt",
                        "ShortName": "Store 320 - Management"
                    }
                ]
            },
            "XRefCode": "Store320",
            "ShortName": "Store 320"
        }
    }
    ```
