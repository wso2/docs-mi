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
            <td>Client ID issued when you create the API integration in <b>Installed Packages</b>.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientSecret</code></td>
            <td>Client secret issued when you create the API integration in <b>Installed Packages</b>.</td>
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>customerKey</code></td>
            <td>Reference to customer's private ID/name for the asset.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>contentType</code></td>
            <td>The type that the content attribute will be in.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>data</code></td>
            <td>Property bag containing the asset data.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>assetType</code></td>
            <td>The type of the asset saved as a name/ID pair.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>version</code></td>
            <td>The version of the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>locked</code></td>
            <td>Specifies if the asset can be modified or not.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fileProperties</code></td>
            <td>Properties referred to by the asset if it is a file type.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Name of the asset, set by the client. 200 character maximum.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>Description of the asset, set by the client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>category</code></td>
            <td>ID of the category the asset belongs to.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>tags</code></td>
            <td>List of tags associated with the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>content</code></td>
            <td>The actual content of the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>design</code></td>
            <td>Fallback for display when neither content nor supercontent are provided.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>superContent</code></td>
            <td>Content that supersedes content in terms of display.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>customFields</code></td>
            <td>Custom fields within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>views</code></td>
            <td>Views within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>blocks</code></td>
            <td>Blocks within the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>minBlocks</code></td>
            <td>Minimum number of blocks within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>maxBlocks</code></td>
            <td>Maximum number of blocks within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>channels</code></td>
            <td>List of channels that are allowed to use this asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>allowedBlocks</code></td>
            <td>List of blocks that are allowed in the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>slots</code></td>
            <td>Slots within the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>businessUnitAvailability</code></td>
            <td>A dictionary of member IDs that have been granted access to the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>template</code></td>
            <td>Template the asset follows.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>file</code></td>
            <td>Base64-encoded string of a file associated with an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>generateFrom</code></td>
            <td>Indicates which view to use to generate this view’s content.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties</code></td>
            <td>Allows you to share content with business units with Content Builder Sharing enabled.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties.sharedWith</code></td>
            <td>List of MID IDs the asset is shared with.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties.sharingType</code></td>
            <td>Permission granted to MIDs in <code>sharedWith</code> (view, edit, or local).</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.createAsset configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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

??? note "Create Campaign"
    The `Create Campaign` operation creates a new marketing campaign with defined objectives, target audience, and parameters.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to create a new campaign.</td>
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>The name of the campaign.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>A description of the campaign.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>campaignCode</code></td>
            <td>A campaign code to associate with the campaign.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>color</code></td>
            <td>The color used to identify the campaign in the Marketing Cloud Engagement web interface, expressed as an HTML color code.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>favorite</code></td>
            <td>Indicates whether to identify the campaign as a favorite.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <SalesforceMarketingCloud.createCampaign configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
        <payload>{${payload.body}}</payload>
    </SalesforceMarketingCloud.createCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "body": {
            "name": "Final Hours for Summer Sale",
            "description": "Invite our most engaged customers to shop our Summer Sale before it ends.",
            "campaignCode": "summer2023",
            "color": "800080",
            "favorite": false
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Name of the category.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>parentId</code></td>
            <td>ID of the parent category.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>categoryType</code></td>
            <td>The type of category, either asset or asset-shared, automatically set to match the parent. If asset-shared, include SharingProperties.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>enterpriseId</code></td>
            <td>ID of the enterprise this business unit belongs to.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>memberId</code></td>
            <td>ID of the member who creates the category.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>Description of the category.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties</code></td>
            <td>Allows sharing the category with business units with Content Builder Sharing enabled. Includes MIDs and sharing type.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties.sharedWith</code></td>
            <td>List of up to 100 MID IDs the category is shared with. Use 0 to share across the enterprise if enabled.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties.sharingType</code></td>
            <td>Permission for MIDs in <code>sharedWith</code>. Only possible value for categories is <code>edit</code>.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.createCategory configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>contactKey</code></td>
            <td>Primary address for the contact. You must provide either a value for contactKey or contactID.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>contactID</code></td>
            <td>Unique ID for the contact. You must provide either a value for contactKey or contactID.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>attributeSets</code></td>
            <td>Array of information used to create a new contact.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>attributeSets.name</code></td>
            <td>Required. Name of attribute group to which to add the contact information.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>attributeSets.values</code></td>
            <td>Name and value pairs indicating the attribute and applicable value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.createContact configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>key</code></td>
            <td>Required. The customer key as a GUID (UUID) to be used while referencing this journey.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Required. The name of this journey.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>A description of this journey.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>workflowApiVersion</code></td>
            <td>Required. The Journey Spec version to use for this journey. Possible values: 0.5, 1.0.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>goals</code></td>
            <td>The goal for this particular journey. Expressed as an object of type ContactDecision from the Journey Spec.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>triggers</code></td>
            <td>The trigger for this particular journey. Expressed as an object of type ContactEvent from the Journey Spec.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>activities</code></td>
            <td>The activities which compose this particular journey. Expressed as objects of types supported by the Journey Spec.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.createJourney configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>definitionKey</code></td>
            <td>Required. Unique, user-generated key to access the definition object.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Required. Name of the definition. Must be unique.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>content.customerKey</code></td>
            <td>Required. Unique identifier of the content asset.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>status</code></td>
            <td>Operational state of the definition: active, inactive, or deleted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>User-provided description of the send definition.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>classification</code></td>
            <td>The external key of a sending classification defined in Email Studio Administration. Only transactional classifications are permitted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>subscriptions.list</code></td>
            <td>Required. The external key of the list or all subscribers. Contains the subscriber keys and profile attributes.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>subscriptions.dataExtension</code></td>
            <td>The external key of the triggered send data extension.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>subscriptions.autoAddSubscriber</code></td>
            <td>Adds the recipient’s email address and contact key as a subscriber key to subscriptions.list. Default is true.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>subscriptions.updateSubscriber</code></td>
            <td>Updates the recipient’s contact key as a subscriber key. Default is true.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.trackLinks</code></td>
            <td>Wraps links for tracking and reporting. Default is true.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.cc</code></td>
            <td>Include CC email addresses with every send. Can use %%attribute%% syntax for dynamic CCs.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.bcc</code></td>
            <td>Include BCC email addresses with every send. Can use %%attribute%% syntax for dynamic BCCs.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.createJourney</code></td>
            <td>Marks the definition as available for use in Journey Builder as a Transactional Send Journey.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.createEmailDefinition configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
            <td><code>payload</code></td>
            <td>The properties required to create a new SMS definition.</td>
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>definitionKey</code></td>
            <td>Required. Unique, user-generated key to access the definition object.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Required. Name of the definition. Must be unique.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>content.message</code></td>
            <td>Required. The message content that you want sent with each message. Use substitution strings and AMPscript to personalize the message.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>status</code></td>
            <td>Operational state of the definition: active, inactive, or deleted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>User-provided description of the send definition.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>subscriptions.shortCode</code></td>
            <td>Required. The short or long code for the mobile transmissions for each message on this definition.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>subscriptions.countryCode</code></td>
            <td>The country code associated with the shortCode. Don't use for long codes unless required by your account configuration.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>subscriptions.keyword</code></td>
            <td>Required. The keyword used to track messages.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>subscriptions.autoAddSubscriber</code></td>
            <td>Allows you to add a recipient as a subscriber using contactKey. When false, the message is rejected if contactKey doesn't exist as a subscriber.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.urlShortenerOptions.IsLinkShorteningEnabled</code></td>
            <td>Indicates if URL shortening is enabled for URLs in the message body.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.urlShortenerOptions.isSubscriberTrackingEnabled</code></td>
            <td>Indicates if subscriber-level tracking is enabled. Required if shortenerType is <code>SFMC</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.urlShortenerOptions.shortenerType</code></td>
            <td>The type of URL shortener. The value is <code>SFMC</code>.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>options.SmsMessageRegulatoryAuthorityTemplateId</code></td>
            <td>The ID of the DLT template used in the SMS. Available only for customers in India.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.createSmsDefinition configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
            <td><code>orderBy</code></td>
            <td>Determines which asset property to use for sorting, and also determines the direction in which to sort the data.</td>
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

??? note "getCampaigns"
    The `getCampaigns` operation retrieve a list of campaigns in your account.
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
            <td><code>orderBy</code></td>
            <td>The field and sort method to use to sort the results.</td>
            <td>No</td>
        </tr>
    </table>


    **Sample configuration**

    ```xml
    <SalesforceMarketingCloud.getCampaigns configKey="SFMC_CON">
        <page>{${payload.page}}</page>
        <pagesize>{${payload.pagesize}}</pagesize>
        <orderBy>{${payload.orderBy}}</orderBy>
    </SalesforceMarketingCloud.getCampaigns>
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

??? note "getContactDeleteRequests"
    The `getContactDeleteRequests` operation retrieves details of contact delete requests for a date range.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>startdateutc</code></td>
            <td>Start date and time in UTC of the date range.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>enddateutc</code></td>
            <td>End date and time in UTC of the date range.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>statusid</code></td>
            <td>Delete request status ID.</td>
            <td>No</td>
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
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.getJourneys configKey="SFMC_CON">
        <page>{${payload.page}}</page>
        <pageSize>{${payload.pageSize}}</pageSize>
        <orderBy>{${payload.orderBy}}</orderBy>
    </salesforceMarketingCloud.getJourneys>
    ```
 
    **Sample request**

    ```json
    {
        "orderBy": "modifiedDate DESC",
        "page": 1,
        "pageSize": 50
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>customerKey</code></td>
            <td>Reference to customer's private ID/name for the asset.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>contentType</code></td>
            <td>The type that the content attribute will be in.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>data</code></td>
            <td>Property bag containing the asset data.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>assetType</code></td>
            <td>The type of the asset saved as a name/ID pair.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>version</code></td>
            <td>The version of the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>locked</code></td>
            <td>Specifies if the asset can be modified or not.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>fileProperties</code></td>
            <td>Stores the different properties that this asset refers to if it is a file type.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Name of the asset, set by the client. 200 character maximum.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>Description of the asset, set by the client.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>category</code></td>
            <td>ID of the category the asset belongs to.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>tags</code></td>
            <td>List of tags associated with the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>content</code></td>
            <td>The actual content of the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>design</code></td>
            <td>Fallback for display when neither content nor supercontent are provided.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>superContent</code></td>
            <td>Content that supersedes content in terms of display.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>customFields</code></td>
            <td>Custom fields within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>views</code></td>
            <td>Views within an asset.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>blocks</code></td>
            <td>Blocks within the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>minBlocks</code></td>
            <td>Minimum number of blocks within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>maxBlocks</code></td>
            <td>Maximum number of blocks within an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>channels</code></td>
            <td>List of channels that are allowed to use this asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>allowedBlocks</code></td>
            <td>List of blocks that are allowed in the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>slots</code></td>
            <td>Slots within the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>businessUnitAvailability</code></td>
            <td>A dictionary of member IDs that have been granted access to the asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>template</code></td>
            <td>Template the asset follows.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>file</code></td>
            <td>Base64-encoded string of a file associated with an asset.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>generateFrom</code></td>
            <td>Tells the sending compiler what view to use for generating this view's content.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties</code></td>
            <td>Allows you to share content with one or more business units that have Content Builder Sharing enabled.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties.sharedWith</code></td>
            <td>List of MID IDs the asset is shared with.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>sharingProperties.sharingType</code></td>
            <td>Indicates the permission that you are granting to the list of MIDs in sharedWith. Possible values are view, edit, or local.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.updateAsset configKey="SFMC_CON">
        <assetId>{${payload.assetId}}</assetId>
        <inputStructure>INLINE</inputStructure>
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>contactKey</code></td>
            <td>Primary address for the contact. You must provide either a value for contactKey or contactID.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>contactID</code></td>
            <td>Unique ID for the contact. You must provide either a value for contactKey or contactID.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>attributeSets</code></td>
            <td>Array of information used to create a new contact.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>attributeSets.name</code></td>
            <td>Required. Name of attribute group to which to add the contact information.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>attributeSets.values</code></td>
            <td>Name and value pairs indicating the attribute and applicable value.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.updateContact configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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

??? note "updateCampaign"
    The `updateCampaign` operation updates a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>campaignId</code></td>
            <td>ID of the campaign to be updated.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>payload</code></td>
            <td>The properties required to update the campaign.</td>
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>The name of the campaign.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>A description of the campaign.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>campaignCode</code></td>
            <td>A campaign code to associate with the campaign.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>color</code></td>
            <td>The color used to identify the campaign in the Marketing Cloud Engagement web interface, expressed as an HTML color code.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>favorite</code></td>
            <td>Indicates whether to identify the campaign as a favorite.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <SalesforceMarketingCloud.updateCampaign configKey="OSCON">
        <inputStructure>INLINE</inputStructure>
        <campaignId>{${payload.id}}</campaignId>
        <payload>{${payload.body}}</payload>
    </SalesforceMarketingCloud.updateCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "id": 237
        "body": {
            "name": "Final Hours for Summer Sale",
            "description": "Invite our most engaged customers to shop our Summer Sale before it ends.",
            "campaignCode": "summer2023",
            "color": "800080",
            "favorite": false
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
            <td>Yes</td>
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

??? note "deleteCampaign"
    The `deleteCampaign` operation deletes a campaign.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>campaignId</code></td>
            <td>The ID of the campaign to delete.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforceMarketingCloud.deleteCampaign configKey="SFMC_CON">
        <campaignId>{${payload.campaignId}}</campaignId>
    </salesforceMarketingCloud.deleteCampaign>
    ```
 
    **Sample request**

    ```json
    {
        "campaignId": 3456
    }

??? note "deleteContact"
    The `deleteContact` operation deletes a given list of contacts.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>values</code></td>
            <td>Array of contact ID values to delete.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>deleteOperationType</code></td>
            <td>Type of delete operation to perform.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <SalesforceMarketingCloud.deleteContact configKey="OSCON">
        <values>{${payload.values}}</values>
        <deleteOperationType>ContactAndAttributes</deleteOperationType>
    </SalesforceMarketingCloud.deleteContact>
    ```
 
    **Sample request**

    ```json
    {
        "values": [
            207807736
        ]
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
        "externalKey": "AB8F0F80-065C-4B1C-85FC-545DB1D55767",
        "body": [
            {
                "values": {
                    "SubscriberKey": "email address",
                    "EmailAddress": "email address"
                }
            },
            {
                "values": {
                    "SubscriberKey": "email address",
                    "EmailAddress": "email address"
                }
            }
        ]
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>definitionKey</code></td>
            <td>The ID of the send definition.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>recipients</code></td>
            <td>Recipient parameters and metadata. Cannot be used with single recipient array.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>attributes</code></td>
            <td>Personalization attributes for the message as key-value pairs.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.sendEmailMessage configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
            <td>Required if <code>inputStructure</code> is <code>INLINE</code></td>
        </tr>
        <tr>
            <td><code>definitionKey</code></td>
            <td>The ID of the send definition.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>recipients</code></td>
            <td>An array of recipient objects that contain tracking and personalization metadata.</td>
            <td>Required if <code>inputStructure</code> is <code>FORM</code></td>
        </tr>
        <tr>
            <td><code>subscriptions</code></td>
            <td>Resubscribe the recipient even if previously opted out.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>content</code></td>
            <td>Overrides content in send definition. Supports substitution strings.</td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>attributes</code></td>
            <td>Key-value pairs used to personalize the message globally.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration for "INLINE"**

    ```xml
    <salesforceMarketingCloud.sendSmsMessage configKey="SFMC_CON">
        <inputStructure>INLINE</inputStructure>
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
