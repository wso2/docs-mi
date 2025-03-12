# Salesforce Marketing Cloud Connector Reference

The following operations allow you to work with the Salesforce Marketing Cloud connector. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Salesforce Marketing Cloud connector, first create the connection with your configuration. When calling a Salesforce Marketing Cloud operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The `init` operation initializes the connection to Salesforce Marketing Cloud REST API.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>connectionName</code></td>
            <td>The name for the Salesforce Marketing Cloud connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>subdomain</code></td>
            <td>Your Salesforce Marketing Cloud subdomain.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientId</code></td>
            <td>Client ID issued when you create the API integration in Installed Packages.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientSecret</code></td>
            <td>Client secret issued when you create the API integration in Installed Packages.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>accountId</code></td>
            <td>Account identifier, or MID, of the target business unit.</td>
            <td>No</td>
        </tr>
    </table>


    **Sample configuration**

    ```xml
        <salesforceMarketingCloud.init>
            <connectionType>SALESFORCEMARKETINGCLOUD</connectionType>
            <subdomain>REPLACE_WITH_SUB_DOMAIN</subdomain>
            <clientId>REPLACE_WITH_CLIENT_ID</clientId>
            <clientSecret>REPLACE_WITH_CLIENT_SECRET</clientSecret>
            <name>SFMC_CON</name>
        </salesforceMarketingCloud.init>
    ```

## Operations

??? note "createAsset"
    The `createAsset` operation creates a new asset.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to create a new asset.</td>
            <td>Yes</td></tr>
    </table>


    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.createAsset configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.createAsset>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "assetType": {
                "name": "htmlemail",
                "id": 208
            },
            "name": "Example Email Created via API",
            "customerKey": "MyUniqueEmailAssetKey",
            "views": {
                "html": {
                    "content": "<html><body><p>Hello, this is an email from the SFMC API!</p></body></html>"
                }
            }
        }
    }
    ```

??? note "createCategory"
    The `createCategory` operation creates a category (folder) in content builder.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to create a new category.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.createCategory configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.createCategory>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "name": "My New Folder",
            "parentId": 50923,
            "enterpriseId": 123456,
            "categoryType": "asset"
        }
    }
    ```

??? note "createContact"
    The `createContact` operation creates a new contact with the specified information in the specified attribute groups.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to create a new contact.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.createContact configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.createContact>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "contactKey": "acruz@mycompany.com",
            "attributeSets": [
                {
                    "name": "Email Addresses",
                    "items": [
                        {
                            "values": [
                                {
                                    "name": "Email Address",
                                    "value": "acruz@mycompany.com"
                                },
                                {
                                    "name": "HTML Enabled",
                                    "value": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    ```

??? note "createJourney"
    The `createJourney` operation creates or saves a journey.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to create a new journey.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.createJourney configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.createJourney>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "key": "b3102b1f-3fa1-478f-9ca9-665b551e13e6",
            "name": "My Journey",
            "workflowApiVersion": 1.0,
            "description": "A journey created via the API",
            "goals": [],
            "triggers": [],
            "activities": []
        }
    }
    ```

??? note "createEmailDefinition"
    The `createEmailDefinition` operation creates a long-living send definition object that references the email template, subscriber list, sending options, journey, and metadata.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to create a new email definition.</td>
            <td>Yes</td></tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.createEmailDefinition configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.createEmailDefinition>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "definitionKey": "MySendDefinitionKey",
            "name": "MySendDefinition",
            "content": {
                "customerKey": "2ac9d669-59d0-4cf0-aa1f-da6cbf667f1f"
            },
            "status": "Active",
            "description": "Send definition for marketing emails",
            "classification": "default transactional",
            "subscriptions": {
                "list": "MY_PUBLICATION_LIST_KEY",
                "dataExtension": "AB8F0F80-065C-4B1C-85FC-545DB1D55768",
                "autoAddSubscriber": true,
                "updateSubscriber": true
            },
            "options": {
                "trackLinks": true
            }
        }
    }
    ```

??? note "createSmsDefinition"
    The `createSmsDefinition` operation creates an sms send definition.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code>
            </td><td>The properties required to create a new SMS definition.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.createSmsDefinition configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.createSmsDefinition>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "definitionKey": "account-reset",
            "name": "account-reset",
            "description": "Using SMS Transactional API",
            "content": {
                "message": "%%FirstName%%, your 2FA token is %%password%%"
            },
            "subscriptions": {
                "shortCode": "8201221",
                "countryCode": "US",
                "keyword": "PASSWORD"
            },
            "options": {
                "urlShortenerOptions": {
                    "isLinkShorteningEnabled": true,
                    "isSubscriberTrackingEnabled": true,
                    "shortenerType": "SFMC"
                },
                "smsMessageRegulatoryAuthorityTemplateId": "1107170833298425627"
            }
        }
    }
    ```

??? note "getAssets"
    The `getAssets` operation retrieves an asset collection by simple filter parameters.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>page</code></td>
            <td>Page number to return from the paged results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pagesize</code></td>
            <td>Number of results per page to return.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>orderBy</code>
            </td><td>Determines which asset property to use for sorting, and also determines the direction in which to sort the data.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>filter</code></td>
            <td>Filter by an asset's property using a simple operator and value.</td>
        <td>No</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Comma-delimited string of asset properties used to reduce the size of your results to only the properties you need.</td>
            <td>No</td>
        </tr>
    </table>


    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.getAssets configKey="SFMC_CON">
        <page>{${payload.page}}</page>
        <pagesize>{${payload.pagesize}}</pagesize>
        <orderBy>{${payload.orderBy}}</orderBy>
        <filter>{${payload.filter}}</filter>
        <fields>{${payload.fields}}</fields>
    </salesforceMarketingCloud.getAssets>
    ```
 
    **Sample request**

    ```json
    {
        "page": 1,
        "pagesize": 10,
        "orderBy": "assetId asc",
        "filter": "status eq 'active'",
        "fields": "assetId,name,status"
    }
    ```

??? note "getContactDeleteRequests"
    The `getContactDeleteRequests` operation retrieves details of contact delete requests for a date range.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>startdateutc</code>
            </td><td>Start date and time in UTC of the date range.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>enddateutc</code></td>
            <td>End date and time in UTC of the date range.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>statusid</code
            ></td><td>Delete request status ID.</td>
            <td>No</td></tr>
        <tr>
            <td><code>page</code></td>
            <td>Page number to return from the paged results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pagesize</code></td>
            <td>Number of results per page to return.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>orderBy</code></td>
            <td>Determines which asset property to use for sorting, and also determines the direction in which to sort the data.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.getContactDeleteRequests configKey="SFMC_CON">
        <startdateutc>{${payload.startdateutc}}</startdateutc>
        <enddateutc>{${payload.enddateutc}}</enddateutc>
        <statusid>{${payload.statusid}}</statusid>
        <page>{${payload.page}}</page>
        <pagesize>{${payload.pagesize}}</pagesize>
        <orderBy>{${payload.orderBy}}</orderBy>
    </salesforceMarketingCloud.getContactDeleteRequests>
    ```
 
    **Sample request**

    ```json
    {
        "startdateutc": "2021-01-01T00:00:00Z",
        "enddateutc": "2021-01-31T23:59:59Z",
        "statusid": 1,
        "pagesize": 50,
        "page": 1,
        "orderBy": "status asc"
    }
    ```

??? note "getJourneys"
    The `getJourneys` operation retrieves a list of journeys.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>page</code></td>
            <td>The page number of results to retrieve.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pageSize</code></td>
            <td>The number of items to return on a page of results.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>orderBy</code></td>
            <td>The field and sort method to use to sort the results. You can sort on these fields: ModifiedDate, Name, Performance.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>definitionType</code></td>
            <td>The type of definition to retrieve. The only accepted value is 'transactional'.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>extras</code></td>
            <td>Additional information to include in the response. Possible values: activities, outcome, stats, all. 'All' provides all available extra details but may impact query performance.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>key</code></td>
            <td>The external key of a journey to retrieve.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>id</code></td>
            <td>The ID of a journey to retrieve. Returns all versions of the journey when specified.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>mostRecentVersionOnly</code>
            </td><td>Specifies whether to return the most recent version of each journey matching the filter criteria.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>nameOrDescription</code>
            </td><td>A search string to apply to the request. Matches name and description of each journey.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>specificApiVersionNumber</code></td>
            <td>The version number of the workflowApiVersion value to retrieve.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>status</code></td>
            <td>A journey status value to filter the results. Possible values: Deleted, Draft, Published, ScheduledToPublish, Stopped, Unpublished.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>tag</code></td>
            <td>A tag to filter the results. Returns only journeys with the specified tag.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>versionNumber</code></td>
            <td>The version number of the journey to retrieve. Default is the currently published version or the latest version number meeting the criteria.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.getJourneys configKey="SFMC_CON">
        <page>{${payload.page}}</page>
        <pageSize>{${payload.pageSize}}</pageSize>
        <orderBy>{${payload.orderBy}}</orderBy>
        <definitionType>{${payload.definitionType}}</definitionType>
        <extras>{${payload.extras}}</extras>
        <key>{${payload.key}}</key>
        <id>{${payload.id}}</id>
        <mostRecentVersionOnly>{${payload.mostRecentVersionOnly}}</mostRecentVersionOnly>
        <nameOrDescription>{${payload.nameOrDescription}}</nameOrDescription>
        <specificApiVersionNumber>{${payload.specificApiVersionNumber}}</specificApiVersionNumber>
        <status>{${payload.status}}</status>
        <tag>{${payload.tag}}</tag>
        <versionNumber>{${payload.versionNumber}}</versionNumber>
    </salesforceMarketingCloud.getJourneys>
    ```
 
    **Sample request**

    ```json
    {
        "orderBy": "modifiedDate DESC",
        "page": 1,
        "pageSize": 50,
        "definitionType": "transactional",
        "extras": "activities,stats",
        "key": "journeyKeyExample",
        "id": "journeyIdExample",
        "mostRecentVersionOnly": true,
        "nameOrDescription": "Welcome",
        "specificApiVersionNumber": 1,
        "status": "Published",
        "tag": "marketing",
        "versionNumber": 2
    }
    ```

??? note "getCategories"
    The `getCategories` operation returns one or more content builder categories that are owned by or reside in your mid.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>page</code></td>
            <td>Page number to return from the paged results. Start with 1 and continue until you get zero results. Typically provided along with the pagesize parameter.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>pagesize</code></td>
            <td>Number of results per page to return. Typically provided along with the page parameter.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>orderBy</code></td>
            <td>Determines which category property to use for sorting, and also determines the direction in which to sort the data.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>filter</code></td>
            <td>Filter by ParentId using a simple operator and value. ParentId is the only allowed field. If you don't provide a filter parameter, the query returns all the Categories in your MID.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.getCategories configKey="SFMC_CON">
        <page>{${payload.page}}</page>
        <pagesize>{${payload.pagesize}}</pagesize>
        <orderBy>{${payload.orderBy}}</orderBy>
        <filter>{${payload.filter}}</filter>
    </salesforceMarketingCloud.getCategories>
    ```
 
    **Sample request**

    ```json
    {
        "filter": "ParentId eq 1234",
        "page": 1,
        "pagesize": 50,
        "orderBy": "categoryId asc"
    }
    ```

??? note "updateAsset"
    The `updateAsset` operation updates a full asset.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>assetId</code></td>
            <td>The ID of the asset to update.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to update the asset.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.updateAsset configKey="SFMC_CON">
        <assetId>{${payload.assetId}}</assetId>
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.updateAsset>
    ```
 
    **Sample request**

    ```json
    {
        "assetId": 3456,
        "body": {
            "CustomerKey": "example-key-123",
            "ContentType": "text/html",
            "Data": {
                "htmlContent": "<html><body><h1>Sample Content</h1></body></html>"
            },
            "AssetType": {
                "Name": "html",
                "ID": 1
            },
            "Version": 1,
            "Locked": false,
            "Name": "Sample Asset",
            "Description": "This is a sample asset update",
            "Category": {
                "ID": 10
            },
            "Tags": [
                "sample",
                "asset"
            ],
            "Content": "<html><body><h1>Updated Content</h1></body></html>"
        }
    }
    ```

??? note "updateContact"
    The `updateContact` operation updates a contact record.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to update the contact.</td>
            <td>Yes</td>
        </tr>
    </table>


    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.updateContact configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.updateContact>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "contactKey": "john.doe@example.com",
            "contactId": 123456,
            "attributeSets": [
                {
                    "name": "Email Addresses",
                    "items": [
                        {
                            "values": [
                                {
                                    "name": "Email Address",
                                    "value": "john.doe@example.com"
                                },
                                {
                                    "name": "HTML Enabled",
                                    "value": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    ```

??? note "deleteAsset"
    The `deleteAsset` operation deletes an asset.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>assetId</code></td>
            <td>The ID of the asset to delete.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.deleteAsset configKey="SFMC_CON">
        <assetId>{${payload.assetId}}</assetId>
    </salesforceMarketingCloud.deleteAsset>
    ```
 
    **Sample request**

    ```json
    {
        "assetId": 3456
    }
    ```

??? note "insertDataExtensionRowSet"
    The `insertDataExtensionRowSet` operation upsert one or more rows in a data extension synchronously by specifying the external key of the target data extension.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>externalKey</code></td>
            <td>The external ID, also known as the customer key, for the data extension.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to insert data extension row set.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.insertDataExtensionRowSet configKey="SFMC_CON">
        <externalKey>{${payload.externalKey}}</externalKey>
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.insertDataExtensionRowSet>
    ```
 
    **Sample request**

    ```json
    {
        "ad_id": "456456456",
        "properties": {
            "name": "New Furniture Ad 2",
            "status": "PAUSED"
        }
    }
    ```

??? note "sendEmailMessage"
    The `sendEmailMessage` operation sends a message to multiple recipients using a send definition.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to send an e-mail message.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.sendEmailMessage configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.sendEmailMessage>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "definitionKey": "MySendDefinitionKey",
            "recipients": [
                {
                    "contactKey": "jane.doe@example.com",
                    "to": "jane.doe@example.com",
                    "attributes": {
                        "FirstName": "Jane",
                        "LastName": "Doe"
                    }
                },
                {
                    "contactKey": "john.smith@example.com",
                    "to": "john.smith@example.com",
                    "attributes": {
                        "FirstName": "John",
                        "LastName": "Smith"
                    }
                }
            ]
        }
    }
    ```

??? note "sendSmsMessage"
    The `sendSmsMessage` operation sends an SMS message to multiple recipients using a send definition.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to send SMS message.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.sendSmsMessage configKey="SFMC_CON">
        <payload>{${payload.body}}</payload>
    </salesforceMarketingCloud.sendSmsMessage>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "definitionKey": "MySendDefinitionKey",
            "recipients": [
                {
                    "contactKey": "Astro25",
                    "to": "15555551234",
                    "messageKey": "nFL4ULgheUeaGbPIMzJJSw"
                },
                {
                    "contactKey": "Codey36",
                    "to": "15555554321",
                    "messageKey": "GV1LhQ6NFkqFUAE1IsoQ9Q"
                }
            ],
            "attributes": {
                "RequestTrackingAttribute": "2"
            }
        }
    }
    ```

## Error codes related to Facebook Ads Connector

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_MESSAGE` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, see [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

| Error code | Description |
| -------- | ------- |
| 701101 | General error. |
| 701102 | Invalid configuration error. |
