# Working with I-9 Order

### Overview 

The following operations allow you to update i-9 employment eligibility of an employee

| Operation | Description |
| ------------- |-------------|
|[PATCH I-9 Order](#updating-i-9-order)| Update I-9 employment eligibility verification order status. |

### Operation details

This section provides more details on each of the operations.

#### Updating I-9 Order
We can use PATCH I-9 Order operation with required parameters to search and find employment eligibility of an employee

**PATCH I-9 Order**
```xml
<ceridiandayforce.patchI9Order>
    <i9OrderId>{${properties.i9OrderId}}</i9OrderId>
    <isValidateOnly>{${properties.isValidateOnly}}</isValidateOnly>
    <fieldAndValue>{${properties.fieldAndValue}}</fieldAndValue>
</ceridiandayforce.patchI9Order>
```

**Properties**

* i9OrderId (Mandatory): The unique identifier for the I-9 order on the I-9 partner's system. The value of this parameter needs to match the value for the I9OrderId property in the request body.
* isValidateOnly (Mandatory): When a TRUE value is used in this parameter, POST and PATCH operations validate the request without applying updates to the database.

**Sample request**

Following is a sample request that can be handled by this operation.

```json
{
  "username": "DFWSTest",
  "password": "DFWSTest",
  "clientNamespace": "usconfigr57.dayforcehcm.com/Api/ddn",
  "apiVersion": "V1",
  "i9OrderId": "FF6C2C9F-E3D7-42F1-90C6-C163F5C8B9DF",
  "isValidateOnly": "true",
  "fieldAndValue": 
	{
	  "I9OrderId": "FF6C2C9F-E3D7-42F1-90C6-C163F5C8B9DF",
	  "OrderStatusXRefCode": "PENDING EMPLOYER"
	}
}
```

**Sample response**

Dayforce returns HTTP Code 200

**Related Dayforce documentation**

[https://developers.dayforce.com/Build/API-Explorer/Reporting-(1)/GET-Report-Metadata-for-a-list-of-reports.aspx](https://developers.dayforce.com/Build/API-Explorer/Reporting-(1)/GET-Report-Metadata-for-a-list-of-reports.aspx)
(sic)

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
         <property expression="${payload.isValidateOnly}" name="isValidateOnly"/>
         <property expression="${payload.fieldAndValue}" name="fieldAndValue"/>
         <property expression="${payload.i9OrderId}" name="i9OrderId"/>
         <ceridiandayforce.init>
            <username>{${properties.username}}</username>
            <password>{${properties.password}}</password>
            <clientNamespace>{${properties.clientNamespace}}</clientNamespace>
            <apiVersion>{${properties.apiVersion}}</apiVersion>
         </ceridiandayforce.init>
         <ceridiandayforce.patchI9Order>
            <i9OrderId>{${properties.i9OrderId}}</i9OrderId>
            <isValidateOnly>{${properties.isValidateOnly}}</isValidateOnly>
            <fieldAndValue>{${properties.fieldAndValue}}</fieldAndValue>
         </ceridiandayforce.patchI9Order>
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
  "i9OrderId": "FF6C2C9F-E3D7-42F1-90C6-C163F5C8B9DF",
  "isValidateOnly": "true",
  "fieldAndValue": 
	{
	  "I9OrderId": "FF6C2C9F-E3D7-42F1-90C6-C163F5C8B9DF",
	  "OrderStatusXRefCode": "PENDING EMPLOYER"
	}
}
```
3.Replace the credentials with your values.

4.Execute the following curl command:

```bash
curl http://localhost:8280/services/query -H "Content-Type: application/json" -d @query.json
```
5.Dayforce returns HTTP Code 200
