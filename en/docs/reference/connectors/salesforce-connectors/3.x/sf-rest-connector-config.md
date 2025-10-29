---
search:
  boost: 2
---

# Salesforce Connector Reference

The following operations allow you to work with the Salesforce Connector. Click an operation name to see parameter details and sample usage.

> **Note:** The API version is configurable and can be adjusted based on your Salesforce environment or requirements. This version of the Salesforce Connector was tested using Salesforce API version v60.0.

---
## Initialize the connector

The WSO2 Integrator: MI Salesforce connector offers **two connection types**, each suited to a different API family:

| Connection type            | Typical use-case                                                 | Provide                                                                                                                                     | What the connector does                                                                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OAuth 2.0**              | REST & Bulk APIs                                                 | Client Credentials grant**<br/>• `clientId`<br/>• `clientSecret` | *Access-token only:* uses it until it expires, then fails.<br/><br/>*Client Credentials:* automatically exchanges `clientId` + `clientSecret` for a fresh access token whenever needed. |
| **BasicAuth (SOAP login)** | SOAP Partner/Enterprise APIs (`query`, `create`, `update`, etc.) | • `username`<br/>• `password`                                                                                                               | Calls the Salesforce SOAP `login` operation, retrieves a session ID, and attaches it to every subsequent SOAP request.                                                                  |

> **Note:** BasicAuth is **only** for SOAP operations. REST and Bulk calls **must** use OAuth 2.0. For more information on how authentication is done in Salesforce, see
[Understanding Authentication](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_authentication.htm).

??? note "OAuth 2.0"
    This connection initializes the connector to interact with the Salesforce REST & Bulk APIs. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_web_server_oauth_flow.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>A logical name to identify this connection.</td>
            <td>Yes</td>
            <td>SALESFORCE_OAUTH_2</td>
        </tr>
        <tr>
            <td>scope</td>
            <td>Space-separated OAuth scopes.</td>
            <td>No</td>
            <td>full refresh_token</td>
        </tr>
        <tr>
            <td>clientId</td>
            <td>Consumer Key from your connected app.</td>
            <td>Yes</td>
            <td>XXXXXXXXXXXX</td>
        </tr>
        <tr>
            <td>clientSecret</td>
            <td>Consumer Secret from your connected app.</td>
            <td>Yes</td>
            <td>XXXXXXXXXXXX</td>
        </tr>
        <tr>
            <td>tokenUrl</td>
            <td>OAuth 2.0 token endpoint URL.</td>
            <td>Yes</td>
            <td>https://login.salesforce.com/services/oauth2/token</td>
        </tr>
        <tr>
            <td>instanceUrl</td>
            <td>Base URL for API requests.</td>
            <td>Yes</td>
            <td>https://your_instance.salesforce.com</td>
        </tr>
        <tr>
            <td>apiVersion</td>
            <td>Salesforce API version.</td>
            <td>No</td>
            <td>v60.0</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>Connection timeout in milliseconds.</td>
            <td>No</td>
            <td>3000</td>
        </tr>
        <tr>
            <td>blocking</td>
            <td>Enable blocking API calls.</td>
            <td>No</td>
            <td>false</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <salesforcerest.init>
        <connectionName>{${payload.connectionName}}</connectionName>
        <grantType>{${payload.grantType}}</grantType>
        <scope>{${payload.scope}}</scope>
        <clientId>{${payload.clientId}}</clientId>
        <clientSecret>{${payload.clientSecret}}</clientSecret>
        <tokenUrl>{${payload.tokenUrl}}</tokenUrl>
        <instanceUrl>{${payload.instanceUrl}}</instanceUrl>
        <apiVersion>{${payload.apiVersion}}</apiVersion>
        <timeout>{${payload.timeout}}</timeout>
        <blocking>{${payload.blocking}}</blocking>
    </salesforcerest.init>
    ```

    **Sample request**
    
    ```json
    {
      "connectionName": "SALESFORCE_OAUTH_2",
      "scope": "full refresh_token",
      "clientId": "XXXXXXXXXXXX",
      "clientSecret": "XXXXXXXXXXXX",
      "tokenUrl": "https://login.salesforce.com/services/oauth2/token",
      "instanceUrl": "https://your_instance.salesforce.com",
      "apiVersion": "v60.0",
      "timeout": "3000",
      "readTimeout": "3000",
      "blocking": "false"
    }
    ```

??? note "BasicAuth"
This connection also initializes the connector to interact with Salesforce via Basic Authentication using the SOAP login API. See the [SOAP API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/intro_soap_api.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>A logical name to identify this connection.</td>
            <td>Yes</td>
            <td>BasicAuth</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Salesforce login username.</td>
            <td>Yes</td>
            <td>user@example.com</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password followed by your security token.</td>
            <td>Yes</td>
            <td>MyP@ssw0rdXyZ</td>
        </tr>
        <tr>
            <td>loginUrl</td>
            <td>Salesforce login endpoint URL.</td>
            <td>Yes</td>
            <td>https://login.salesforce.com/services/Soap/u/60.0</td>
        </tr>
        <tr>
            <td>forceLogin</td>
            <td>Always start a new session if enabled.</td>
            <td>No</td>
            <td>false</td>
        </tr>
        <tr>
            <td>blocking</td>
            <td>Enable blocking API calls to Salesforce.</td>
            <td>No</td>
            <td>false</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforcerest.init>
        <connectionName>{${payload.connectionName}}</connectionName>
        <username>{${payload.username}}</username>
        <password>{${payload.password}}</password>
        <loginUrl>{${payload.loginUrl}}</loginUrl>
        <forceLogin>{${payload.forceLogin}}</forceLogin>
        <blocking>{${payload.blocking}}</blocking>
    </salesforcerest.init>
    ```
    
    **Sample request**

    ```json
    {
        "connectionName": "BasicAuth",
        "username": "user@example.com",
        "password": "MyP@ssw0rdXyZ",
        "loginUrl": "https://login.salesforce.com/services/Soap/u/60.0",
        "forceLogin": "false",
        "blocking": "false"
    }
    ``` 

### Search

??? note "search"
    The `salesforce.search` operation allows you to search for records by specifying a search string. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_search.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>searchString</td>
            <td>The SOQL query to execute the search.</td>
            <td>Yes</td>
            <td>sample string</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.search>
        <searchString>{${payload.searchString}}</searchString>
    </salesforce.search>
    ```

    **Sample request**

    ```json
    {
        "searchString": "FIND {map*} IN ALL FIELDS RETURNING Account (Id, Name), Contact, Opportunity, Lead",
    }
    ```

### Users

??? note "getUserInformation"
    The `salesforce.getUserInformation` operation retrieves information about a specific user by specifying the following property. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.198.0.api_rest.meta/api_rest/dome_process_rules.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>userId</td>
            <td>The ID of the user whose details you want to retrieve.</td>
            <td>Yes</td>
            <td>00528000000yl7j</td>
        </tr>

    </table>

    **Sample configuration**

    ```xml
    <salesforce.getUserInformation>
        <userId>{${payload.userId}}</userId>
    </salesforce.getUserInformation>
    ```

    **Sample request**

    ```json
    {
        "userId": "00528000000yl7j"
    }
    ```

??? note "resetPassword"
The `salesforce.resetPassword` operation resets a specific user’s password by specifying the following property. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_user_password.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>userId</td>
            <td>The ID of the user whose password you want to reset.</td>
            <td>Yes</td>
            <td>00528000000yl7j</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.resetPassword>
        <userId>{${payload.userId}}</userId>
    </salesforce.resetPassword>
    ```

    **Sample request**

    ```json
    {
        "userId": "00528000000yl7j",
    }
    ```

??? note "setPassword"
    The `salesforce.setPassword` operation sets a specific user’s password by specifying the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_user_password.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>userId</td>
            <td>The ID of the user whose password you want to set.</td>
            <td>Yes</td>
            <td>00528000000yl7j</td>
        </tr>
        <tr>
            <td>fieldAndValue</td>
            <td>JSON object containing the new password field and its value — for example: <code>{"NewPassword":"MyNewP@ssw0rd"}</code></td>
            <td>Yes</td>
            <td>{"NewPassword":"MyNewP@ssw0rd"}</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.setPassword>
        <userId>{${payload.userId}}</userId>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.setPassword>
    ```

    **Sample request**

    ```json
    {
        "userId": "00528000000yl7j",
        "fieldAndValue": "{\"NewPassword\":\"MyNewP@ssw0rd\"}"
    }
    ```

### Query

??? note "query"
    The `salesforce.query` operation retrieves data from a Salesforce object by specifying the following properties. To include deleted records in the Recycle Bin, use the `salesforce.queryAll` operation in place of `salesforce.query`. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_query.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value<th>
        </tr>
        <tr>
            <td>queryString</td>
            <td>The SQL query to use to search for records.</td>
            <td>Yes</td>
            <td>select id, name from Account</td>
        </tr>
        <tr>
            <td>queryAll</td>
            <td>Check if the deleted records should be included in the result</td>
            <td>false</td>
        </tr>
    </table>

    **Sample configuration**

    query:

    ```xml
    <salesforce.query>
        <queryString>{${payload.queryString}}</queryString>
    </salesforce.query>
    ```

    queryAll:

    ```xml
    <salesforce.queryAll>
        <queryString>{${payload.queryString}}</queryString>
    </salesforce.queryAll>
    ```
    
    **Sample request**

    ```json
    {
        "queryString": "SELECT ID, NAME FROM ACCOUNT",
    }
    ```

### Records

??? note "create"
    The `salesforce.create` operation creates a new record by specifying the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_sobject_create.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The type of object for which you will create a record.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>fieldAndValue</td>
            <td>The .json format property used to create the record. Include all mandatory fields according to the requirements for the specified sObject.</td>
            <td>Yes</td>
            <td><pre>{
            "name": "wso2",
            "description":"This Account belongs to WSO2"}
            </pre></td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.create>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.create>
    ```

    **Sample request**

    The following is a sample request that can be handled by the create operation.

    ```json
    {
        "sObjectName":"Account",,
        "fieldAndValue": {
            "name": "wso2",
            "description":"This Account belongs to WSO2"
        }
    }
    ```

??? note "createBulk"
    The `salesforce.createBulk` operation creates multiple records of the same sObject type by specifying the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.198.0.api_rest.meta/api_rest/dome_composite_sobject_tree_flat.htm#topic-title) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The type of object for which you will create a record.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>fieldAndValue</td>
            <td>The .json format property, which specifies each record as an entry within the records array. Include all mandatory fields according to the requirements for the specified sObject.</td>
            <td>Yes</td>
            <td><pre>{
            "records": [
            {
            "attributes": {"type": "Account", "referenceId": "ref1"},
            "name": "wso2",
            "phone": "1111111",
            "website": "www.salesforce1.com"
            },
            {
            "attributes": {"type": "Account", "referenceId": "ref2"},
            "name": "slwso2",
            "phone": "22222222",
            "website": "www.salesforce2.com"
            }]
            }
            </pre></td>
        </tr>
    </table>

    > **Note**: For example, if you are creating a record for the Account sObject, "name" is a mandatory parameter, and you might want to include the optional description, so the fieldAndValue property would look like this:
    > ```json
    > {
    >   "records": [
    >   {
    >        "attributes": {"type": "Account", "referenceId": "ref1"},
    >        "name": "wso2",
    >        "phone": "1111111",
    >        "website": "www.salesforce1.com"
    >    },
    >    {
    >        "attributes": {"type": "Account", "referenceId": "ref2"},
    >        "name": "slwso2",
    >        "phone": "22222222",
    >        "website": "www.salesforce2.com"
    >    }]
    > }
    > ```

    **Sample configuration**

    ```xml
    <salesforce.createBulk>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.createBulk>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",,
        "fieldAndValue": {
            "records": [
                {
                "attributes": {"type": "Account", "referenceId": "ref1"},
                "name": "wso2",
                "phone": "1111111",
                "website": "www.salesforce1.com"
                },
                {
                "attributes": {"type": "Account", "referenceId": "ref2"},
                "name": "slwso2",
                "phone": "22222222",
                "website": "www.salesforce2.com"
                }]
            }
    }
    ```

??? note "createTree"
    To create nested records for a specific sObject, use salesforce.createTree and specify the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.198.0.api_rest.meta/api_rest/dome_composite_sobject_tree_create.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The type of object for which you will create a record.</td>
            <td>Yes</td>
            <td></td>
        </tr>
        <tr>
            <td>fieldAndValue</td>
            <td>The .json format property, which specifies each record as an entry within the records array. Include all mandatory fields according to the requirements for the specified sobject.</td>
            <td>Yes</td>
            <td><pre>{
            "records" :[{
            "attributes" : {"type" : "Account", "referenceId" : "ref1"},
            "name" : "SampleAccount1",
            "phone" : "1234567890",
            "website" : "www.salesforce.com",
            "numberOfEmployees" : "100",
            "type" : "Analyst",
            "industry" : "Banking",
            "Contacts" : {
            "records" : [{
            "attributes" : {"type" : "Contact", "referenceId" : "ref2"},
            "lastname" : "Smith",
            "Title" : "President",
            "email" : "sample@salesforce.com"
            },{
            "attributes" : {"type" : "Account", "referenceId" : "ref3"},
            "lastname" : "Evans",
            "title" : "Vice President",
            "email" : "sample@salesforce.com"
            }]
            }
            },{
            "attributes" : {"type" : "Account", "referenceId" : "ref4"},
            "name" : "SampleAccount2",
            "phone" : "1234567890",
            "website" : "www.salesforce.com",
            "numberOfEmployees" : "52000",
            "type" : "Analyst",
            "industry" : "Banking",
            "childAccounts" : {
            "records" : [{
            "attributes" : {"type" : "Account", "referenceId" : "ref5"},
            "name" : "SampleChildAccount1",
            "phone" : "1234567890",
            "website" : "www.salesforce.com",
            "numberOfEmployees" : "100",
            "type" : "Analyst",
            "industry" : "Banking"
            }]
            },
            "Contacts" : {
            "records" : [{
            "attributes" : {"type" : "Contact", "referenceId" : "ref6"},
            "lastname" : "Jones",
            "title" : "President",
            "email" : "sample@salesforce.com"
            }]
            }
            }]
            }
            </pre></td>
        </tr>
    </table>

    > **Note**: If you are creating records for the Account sObject, "name" is a mandatory parameter, and you might want to include additional optional values for each record, so the fieldAndValue property might look like this:
    > ```json
    > {
    >   "records" :[{
    >   "attributes" : {"type" : "Account", "referenceId" : "ref1"},
    >   "name" : "SampleAccount1",
    >   "phone" : "1234567890",
    >   "website" : "www.salesforce.com",
    >   "numberOfEmployees" : "100",
    >   "type" : "Analyst",
    >   "industry" : "Banking",
    >   "Contacts" : {
    >     "records" : [{
    >       "attributes" : {"type" : "Contact", "referenceId" : "ref2"},
    >       "lastname" : "Smith",
    >       "Title" : "President",
    >       "email" : "sample@salesforce.com"
    >     },{
    >       "attributes" : {"type" : "Contact", "referenceId" : "ref3"},
    >       "lastname" : "Evans",
    >       "title" : "Vice President",
    >       "email" : "sample@salesforce.com"
    >     }]
    >   }
    >   },{
    >   "attributes" : {"type" : "Account", "referenceId" : "ref4"},
    >   "name" : "SampleAccount2",
    >   "phone" : "1234567890",
    >   "website" : "www.salesforce.com",
    >   "numberOfEmployees" : "52000",
    >   "type" : "Analyst",
    >   "industry" : "Banking",
    >   "childAccounts" : {
    >     "records" : [{
    >       "attributes" : {"type" : "Account", "referenceId" : "ref5"},
    >       "name" : "SampleChildAccount1",
    >       "phone" : "1234567890",
    >       "website" : "www.salesforce.com",
    >       "numberOfEmployees" : "100",
    >       "type" : "Analyst",
    >       "industry" : "Banking"
    >     }]
    >   },
    >   "Contacts" : {
    >     "records" : [{
    >       "attributes" : {"type" : "Contact", "referenceId" : "ref6"},
    >       "lastname" : "Jones",
    >       "title" : "President",
    >       "email" : "sample@salesforce.com"
    >     }]
    >   }
    >   }]
    > }
    > ```

    **Sample configuration**

    ```xml
    <salesforce.createTree>
        <sObjectName>{${payload.sObjectName}}</sobject>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.createTree>
    ```

    **Sample request**

    ```json
    {
        "sObjectName": "Account",
        "fieldAndValue": {
            "records": [
                {
                    "attributes": {
                        "type": "Account",
                        "referenceId": "ref1"
                    },
                    "name": "SampleAccount1",
                    "phone": "1234567890",
                    "website": "www.salesforce.com",
                    "numberOfEmployees": "100",
                    "type": "Analyst",
                    "industry": "Banking",
                    "Contacts": {
                        "records": [
                            {
                                "attributes": {
                                    "type": "Contact",
                                    "referenceId": "ref2"
                                },
                                "LastName": "Smith",
                                "Title": "President",
                                "Email": "sample@salesforce.com"
                            },
                            {
                                "attributes": {
                                    "type": "Contact",
                                    "referenceId": "ref3"
                                }, // fixed
                                "LastName": "Evans", // fixed
                                "Title": "Vice President", // fixed
                                "Email": "sample@salesforce.com" // fixed
                            }
                        ]
                    }
                },
                {
                    "attributes": {
                        "type": "Account",
                        "referenceId": "ref4"
                    },
                    "name": "SampleAccount2",
                    "phone": "1234567890",
                    "website": "www.salesforce.com",
                    "numberOfEmployees": "52000",
                    "type": "Analyst",
                    "industry": "Banking",
                    "childAccounts": {
                        "records": [
                            {
                                "attributes": {
                                    "type": "Account",
                                    "referenceId": "ref5"
                                },
                                "name": "SampleChildAccount1",
                                "phone": "1234567890",
                                "website": "www.salesforce.com",
                                "numberOfEmployees": "100",
                                "type": "Analyst",
                                "industry": "Banking"
                            }
                        ]
                    },
                    "Contacts": {
                        "records": [
                            {
                                "attributes": {
                                    "type": "Contact",
                                    "referenceId": "ref6"
                                },
                                "LastName": "Jones",
                                "Title": "President",
                                "Email": "sample@salesforce.com"
                            }
                        ]
                    }
                }
            ]
        }
    }
    ```

??? note "update"
    The `salesforce.update` operation updates an existing record by specifying the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The type of object for which you will create a record.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>fieldAndValue</td>
            <td>The json format property with the new definition for the record.</td>
            <td>Yes</td>
            <td><pre>{
            "name": "wso2",
            "description":"This Account belongs to WSO2"
            }
            </pre></td>
        </tr>
        <tr>
            <td>Id</td>
            <td>The ID of the record you are updating.</td>
            <td>Yes</td>
            <td>00128000002OOhD</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.update>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
        <Id>{${payload.Id}}</Id>
    </salesforce.update>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",
        "Id":"00128000002OOhD",,
        "fieldAndValue": {
            "name": "wso2",
            "description":"This Account belongs to WSO2"
        }
    }
    ```

??? note "delete"
    The `salesforce.delete` operation deletes a record and requires the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_delete_record.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The object type of the record.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>Id</td>
            <td>The ID of the record you are deleting.</td>
            <td>Yes</td>
            <td>00128000002OOhD</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.update>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
        <Id>{$ctx:Id}</Id>
    </salesforce.update>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",
        "idToDelete":"00128000002OOhD",
    }
    ```


??? note "upsert"
    The `salesforce.upsert` operation creates or updates a record using an external ID by specifying the following properties. This method is used to create records or update existing records based on the value of a specified external ID field. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm) for more information.
    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Sample Value</th>
    </tr>
    <tr>
        <td>sObjectName</td>
        <td>The object type whose value you want to upsert.</td>
        <td>Yes</td>
        <td>Account</td>
    </tr>
    <tr>
        <td>externalIDField</td>
        <td>The external Id Field of the subject.</td>
        <td>Yes</td>
        <td>sample__c</td>
    </tr>
    <tr>
        <td>Id</td>
        <td>The value of the customExtIdField.</td>
        <td>Yes</td>
        <td>15222</td>
    </tr>
    <tr>
        <td>fieldAndValue</td>
        <td>The json format property/payload used to create the record.</td>
        <td>Yes</td>
        <td>{
        "Name":"john"
        }
        </td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.upsert>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <externalIDField>{${payload.externalIDField}}</externalIDField>
        <Id>{${payload.Id}}</Id>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.upsert>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",,
        "intervalTime" : "2400000",
        "externalIDField":"sample__c",
        "Id":"15222",
        "fieldAndValue":
        {
            "Name":"john"
        }
    }
    ```

??? note "getDeleted"
    The `salesforce.getDeleted` operation retrieves a list of records deleted within a specified timespan for the given object. Provide the start and end date-time values in ISO 8601 format: `YYYY-MM-DDThh:mm:ss+hh:mm`. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_getdeleted.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The object where you want to look for deleted records</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>startTime</td>
            <td>Starting date/time (Coordinated Universal Time (UTC)—not local—timezone) of the timespan for which to retrieve the data.</td>
            <td>Yes</td>
            <td>2015-10-05T12:30:30+05:30</td>
        </tr>
        <tr>
            <td>endTime</td>
            <td>Ending date/time (Coordinated Universal Time (UTC)—not local—timezone) of the timespan for which to retrieve the data.</td>
            <td>Yes</td>
            <td>2015-10-10T20:30:30+05:30</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getDeleted>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <startTime>{${payload.startTime}}</startTime>
        <endTime>{${payload.endTime}}</endTime>
    </salesforce.getDeleted>
    ```

    **Sample request**

    ```json
    {
      "sObjectName":"Account",
      "startTime":"2015-10-05T12:30:30+05:30",
      "endTime":"2015-10-10T20:30:30+05:30"
    }
    ```

??? note "getUpdated"
    The `salesforce.getUpdated` operation retrieves a list of records updated within a specified timespan for the given object. Provide the start and end date-time values in ISO 8601 format: `YYYY-MM-DDThh:mm:ss+hh:mm`. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_getupdated.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The object where you want to look for updated records</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>startTime</td>
            <td>Starting date/time (Coordinated Universal Time (UTC)—not local—timezone) of the timespan for which to retrieve the data.</td>
            <td>Yes</td>
            <td>2015-10-05T12:30:30+05:30</td>
        </tr>
        <tr>
            <td>endTime</td>
            <td>Ending date/time (Coordinated Universal Time (UTC)—not local—timezone) of the timespan for which to retrieve the data.</td>
            <td>Yes</td>
            <td>2015-10-10T20:30:30+05:30</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getUpdated>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <startTime>{${payload.startTime}}</startTime>
        <endTime>{${payload.endTime}}</endTime>
    </salesforce.getUpdated>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",
        "startTime":"2015-10-05T12:30:30+05:30",
        "endTime":"2015-10-10T20:30:30+05:30"
    }
    ```


### sObjects

??? note "describeGlobal"
    The `salesforce.describeGlobal` operation retrieves a list of all objects available in the system. You can then obtain metadata for one or more objects as described in the following sections. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_describeGlobal.htm) for more information.

    **Sample configuration**

    ```xml
    <salesforce.describeGlobal/>
    ```

    **Sample request**

    ```json
    {}
    ```

??? note "describeSObject"
    The `salesforce.describeSObject` operation retrieves metadata (such as name, label, and fields—including field properties) for a specific object type by specifying the following properties. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_describe.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjectName</td>
            <td>The object type whose metadata you want to retrieve.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.describeSObject>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
    </salesforce.describeSObject>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",
    }
    ```

??? note "retrieveSObject"
    The `salesforce.retrieveSObject` operation retrieves details of a specific record. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_retrieve.htm) for more information.
    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Sample Value</th>
    </tr>
    <tr>
        <td>sObjectName</td>
        <td>The object type of the record.</td>
        <td>Yes</td>
        <td>Account</td>
    </tr>
    <tr>
        <td>rowId</td>
        <td>The ID of the record whose details you want to retrieve.</td>
        <td>Yes</td>
        <td>00128000005YjDnAAK</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.retrieveSObject>
        <sObjectName>{${payload.sObjectName}}</sObjectName>
        <rowId>{${payload.rowId}}</rowId>
    </salesforce.retrieveSObject>
    ```

    **Sample request**

    ```json
    {
        "sObjectName":"Account",
        "rowId":"00128000005YjDnAAK",
    }
    ```

### Composite

??? note "compositeBatch"
    The `salesforce.compositeBatch` operation executes up to 25 sub-requests in a single call to Salesforce’s Composite Batch REST resource. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_batch.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Field and Value</td>
            <td>JSON string that defines the array of sub-requests (each sub-request includes <code>method</code>, <code>url</code>, optional <code>body</code>, and a <code>referenceId</code>).</td>
            <td>Yes</td>
            <td>[{"method":"GET","url":"/services/data/v60.0/sobjects/Account/001..."}]</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.compositeBatch>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.compositeBatch>
    ```

    **Sample request**

    ```json
    {
        "fieldAndValue": {
            "batchRequests": [
                {
                    "method": "PATCH",
                    "url": "v64.0/sobjects/account/001D000000K0fXOIAZ",
                    "richInput": {
                        "Name": "NewName"
                    }
                },
                {
                    "method": "GET",
                    "url": "v64.0/sobjects/account/001D000000K0fXOIAZ?fields=Name,BillingPostalCode"
                }
            ]
        }
    }
    ```

??? note "compositeGraph"
    The `salesforce.compositeGraph` operation submits one or more composite graph operations to Salesforce’s Composite Graph REST resource. Each graph can contain multiple sub-requests that are executed in the order you define. See the [Composite Graph API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_graph.htm) for full details.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Field and Value</td>
            <td>
                A JSON object that defines one or more graphs.<br/>
                Each graph contains a <code>graphId</code> and a <code>compositeRequest</code> array.<br/>
                Every sub-request in <code>compositeRequest</code> specifies <code>method</code>, <code>url</code>, an optional <code>body</code>, and a <code>referenceId</code>.
            </td>
            <td>Yes</td>
            <td>{ "graphs": [ { "graphId": "Graph1", "compositeRequest": [ … ] } ] }</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.compositeGraph>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.compositeGraph>
    ```

    **Sample request**

    ```json
    {
        "fieldAndValue": {
            "graphs": [
                {
                    "graphId": "Graph1",
                    "compositeRequest": [
                        {
                            "method": "GET",
                            "url": "/services/data/v60.0/sobjects/Account/0018g00000XXXXXAAA",
                            "referenceId": "RefAccount"
                        },
                        {
                            "method": "PATCH",
                            "url": "/services/data/v60.0/sobjects/Account/@{RefAccount.Id}",
                            "body": {
                                "Industry": "Manufacturing"
                            },
                            "referenceId": "UpdateAccount"
                        }
                    ]
                }
            ]
        }
    }
    ```

??? note "compositeRequest"
    The `salesforce.compositeRequest` operation executes a series of REST API sub-requests in a single call to Salesforce’s Composite REST resource, preserving the order and allowing inter-request references. See the [Composite API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite.htm) for full details.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Field And Value</td>
            <td>
                A JSON object that defines the composite request.<br/>
                Must include an <code>allOrNone</code> flag and a <code>compositeRequest</code> array.<br/>
                Each item in <code>compositeRequest</code> specifies <code>method</code>, <code>url</code>, an optional <code>body</code>, and a <code>referenceId</code>.
            </td>
            <td>Yes</td>
            <td>{ "allOrNone": true, "compositeRequest": [ … ] }</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.compositeRequest>
        <fieldAndValue>{${payload.fieldAndValue}}</fieldAndValue>
    </salesforce.compositeRequest>
    ```

    **Sample request**

    ```json
    {
        "fieldAndValue": {
            "allOrNone": true,
            "compositeRequest": [
                {
                    "method": "GET",
                    "url": "/services/data/v60.0/sobjects/Account/0018g00000XXXXXAAA",
                    "referenceId": "RefAccount"
                },
                {
                    "method": "PATCH",
                    "url": "/services/data/v60.0/sobjects/Account/@{RefAccount.id}",
                    "body": {
                        "Industry": "Manufacturing"
                    },
                    "referenceId": "UpdateAccount"
                },
                {
                    "method": "POST",
                    "url": "/services/data/v60.0/sobjects/Contact",
                    "body": {
                        "LastName": "Smith",
                        "AccountId": "@{RefAccount.id}"
                    },
                    "referenceId": "CreateContact"
                }
            ]
        }
    }
    ```

### Bulk V2

??? note "abortJob"
    The `salesforce.abortJob` operation aborts a bulk ingest job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/close_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.abortJob>
        <jobId>{${payload.jobId}}</jobId>
    </salesforce.abortJob>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI"
    }
    ```

??? note "createJob"
    The `salesforce.createJob` operation creates a bulk ingest job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/create_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Operation</td>
            <td>The bulk operation to perform on the data (for example, <code>insert</code>, <code>update</code>, <code>upsert</code>, or <code>delete</code>).</td>
            <td>Yes</td>
            <td>insert</td>
        </tr>
        <tr>
            <td>Object</td>
            <td>The object type for the data being processed. Use only a single object type per job.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>Column Delimeter</td>
            <td>The column delimiter used for CSV job data. Default is <code>COMMA</code>. Valid values: <code>BACKQUOTE</code>, <code>CARET</code>, <code>COMMA</code>, <code>PIPE</code>, <code>SEMICOLON</code>, <code>TAB</code>.</td>
            <td>Yes</td>
            <td>COMMA</td>
        </tr>
        <tr>
            <td>Line Ending</td>
            <td>The line ending used for CSV job data, marking the end of a data row. Valid values: <code>LF</code>, <code>CRLF</code>. Default is <code>LF</code>.</td>
            <td>Yes</td>
            <td>LF</td>
        </tr>
        <tr>
            <td>Assignment Rule ID</td>
            <td>The ID of an assignment rule to run for a Case or a Lead. The rule can be active or inactive.</td>
            <td>No</td>
            <td>01Q3j000000XXXXAAA</td>
        </tr>
        <tr>
            <td>External ID Field Name</td>
            <td>The external-ID field in the object being updated. Required only for <code>upsert</code> operations.</td>
            <td>No</td>
            <td>External_Id__c</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.createJob>
        <operation>{${payload.operation}}</operation>
        <object>{${payload.object}}</object>
        <columnDelimiter>{${payload.columnDelimiter}}</columnDelimiter>
        <lineEnding>{${payload.lineEnding}}</lineEnding>
        <assignmentRuleId>{${payload.assignmentRuleId}}</assignmentRuleId>
        <externalIdFieldName>{${payload.externalIdFieldName}}</externalIdFieldName>
    </salesforce.createJob>
    ```

    **Sample request**

    ```json
    {
        "operation": "insert",
        "object": "Account",
        "columnDelimiter": "COMMA",
        "lineEnding": "LF",
        "assignmentRuleId": "01Q3j000000XXXXAAA",
        "externalIdFieldName": "External_Id__c"
    }
    ```

??? note "closeJob"
    The `salesforce.closeJob` operation closes a bulk ingest job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/close_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.closeJob>
        <jobId>{${payload.jobId}}</jobId>
    </salesforce.closeJob>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI"
    }
    ```

??? note "deleteJob"
    The `salesforce.deleteJob` operation deletes a bulk ingest job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/delete_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.deleteJob>
        <jobId>{${payload.jobId}}</jobId>
    </salesforce.deleteJob>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI"
    }
    ```

??? note "getAllJobInfo"
    The `salesforce.getJobInfo` operation retrieve all the bulk ingest job information from Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/get_all_jobs.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>IsPKChunkingEnabled</td>
            <td>If set to <code>true</code>, returns information only about jobs where PK Chunking is enabled (Bulk API 1.0 only).</td>
            <td>No</td>
            <td>true</td>
        </tr>
        <tr>
            <td>Job Type</td>
            <td>Returns jobs that match the specified type.<br/>
                Valid values: <code>Classic</code>, <code>BigObjectIngest</code>, <code>V2Ingest</code>, <code>All</code>.</td>
            <td>No</td>
            <td>V2Ingest</td>
        </tr>
        <tr>
            <td>Query Locator</td>
            <td>Returns jobs starting at the specified locator value.</td>
            <td>No</td>
            <td>0Sf3i0000004oBAEAY</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getAllJobInfo>
        <isPKChunkingEnabled>{${payload.isPKChunkingEnabled}}</isPKChunkingEnabled>
        <jobType>{${payload.jobType}}</jobType>
        <queryLocator>{${payload.queryLocator}}</queryLocator>
    </salesforce.getAllJobInfo>
    ```

    **Sample request**

    ```json
    {
        "isPKChunkingEnabled": true,
        "jobType": "V2Ingest",
        "queryLocator": "0Sf3i0000004oBAEAY"
    }
    ```

??? note "getFailedResults"
    The `salesforce.getFailedResults` operation retrieves failed records of a specific bulk job from Salesforce using the Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/get_job_failed_results.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
        <tr>
            <td>Output Type</td>
            <td>The response content type.</td>
            <td>Yes</td>
            <td>CSV</td>
        </tr>
        <tr>
            <td>Add Results To</td>
            <td>Where to store the results (<code>FILE</code> or <code>BODY</code>).</td>
            <td>Yes</td>
            <td>FILE</td>
        </tr>
        <tr>
            <td>File Path</td>
            <td>The file path to store results (required only when <code>Add Results To</code> is <code>FILE</code>).</td>
            <td>If <code>FILE</code> selected</td>
            <td>/tmp/failed_results.csv</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getFailedResults>
        <jobId>{${payload.jobId}}</jobId>
        <outputType>{${payload.outputType}}</outputType>
        <addResultsTo>{${payload.addResultsTo}}</addResultsTo>
        <filePath>{${payload.filePath}}</filePath>
    </salesforce.getFailedResults>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI",
        "outputType": "CSV",
        "addResultsTo": "FILE",
        "filePath": "/tmp/failed_results.csv"
    }
    ```

??? note "getJobInfo"
    The `salesforce.getJobInfo` operation retrieve bulk ingest job information from Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/get_job_info.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getJobInfo>
        <jobId>{${payload.jobId}}</jobId>
    </salesforce.getJobInfo>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI"
    }
    ```

??? note "getSuccessfulResults"
    The `salesforce.getSuccessfulResults` operation retrieves successful records of a specific bulk job from Salesforce using the Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/get_job_successful_results.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
        <tr>
            <td>Output Type</td>
            <td>The response content type.</td>
            <td>Yes</td>
            <td>CSV</td>
        </tr>
        <tr>
            <td>Add Results To</td>
            <td>Where to store the results (<code>FILE</code> or <code>BODY</code>).</td>
            <td>Yes</td>
            <td>FILE</td>
        </tr>
        <tr>
            <td>File Path</td>
            <td>The file path to store results (required only when <code>Add Results To</code> is <code>FILE</code>).</td>
            <td>If <code>FILE</code> selected</td>
            <td>/tmp/success_results.csv</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getSuccessfulResults>
        <jobId>{${payload.jobId}}</jobId>
        <outputType>{${payload.outputType}}</outputType>
        <addResultsTo>{${payload.addResultsTo}}</addResultsTo>
        <filePath>{${payload.filePath}}</filePath>
    </salesforce.getSuccessfulResults>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI",
        "outputType": "CSV",
        "addResultsTo": "FILE",
        "filePath": "/tmp/success_results.csv"
    }
    ```

??? note "getUnprocessedResults"
    The `salesforce.getUnprocessedResults` operation retrieves unprocessed records of a specific bulk job from Salesforce using the Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/get_job_unprocessed_results.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
        <tr>
            <td>Output Type</td>
            <td>The response content type.</td>
            <td>Yes</td>
            <td>CSV</td>
        </tr>
        <tr>
            <td>Add Results To</td>
            <td>Where to store the results (<code>FILE</code> or <code>BODY</code>).</td>
            <td>Yes</td>
            <td>FILE</td>
        </tr>
        <tr>
            <td>File Path</td>
            <td>The file path to store results (required only when <code>Add Results To</code> is <code>FILE</code>).</td>
            <td>If <code>FILE</code> selected</td>
            <td>/tmp/unprocessed_results.csv</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getUnprocessedResults>
        <jobId>{${payload.jobId}}</jobId>
        <outputType>{${payload.outputType}}</outputType>
        <addResultsTo>{${payload.addResultsTo}}</addResultsTo>
        <filePath>{${payload.filePath}}</filePath>
    </salesforce.getUnprocessedResults>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI",
        "outputType": "CSV",
        "addResultsTo": "FILE",
        "filePath": "/tmp/unprocessed_results.csv"
    }
    ```

??? note "uploadJobData"
    The `salesforce.uploadJobData` operation upload the csv records to a bulk job in Salesforce using the Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/upload_job_data.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk job ID.</td>
            <td>Yes</td>
            <td>7503i000000XXXXXAAI</td>
        </tr>
        <tr>
            <td>Input Data</td>
            <td>The CSV content to upload.</td>
            <td>Yes</td>
            <td><code>Name,Industry&#10;Acme,Manufacturing</code></td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.uploadJobData>
        <jobId>{${payload.jobId}}</jobId>
        <inputData>{${payload.inputData}}</inputData>
    </salesforce.uploadJobData>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7503i000000XXXXXAAI",
        "inputData": "Name,Industry\nAcme,Manufacturing"
    }
    ```

??? note "createQueryJob"
    The `salesforce.createQueryJob` operation creates a bulk query job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/query_create_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Operation</td>
            <td>The type of query.<br/>Valid values: <code>QUERY</code>, <code>QUERY_ALL</code>.</td>
            <td>Yes</td>
            <td>QUERY</td>
        </tr>
        <tr>
            <td>Column Delimiter</td>
            <td>The column delimiter used for CSV job data.<br/>Default is <code>COMMA</code>.<br/>Valid values: <code>BACKQUOTE</code>, <code>CARET</code>, <code>COMMA</code>, <code>PIPE</code>, <code>SEMICOLON</code>, <code>TAB</code>.</td>
            <td>Yes</td>
            <td>COMMA</td>
        </tr>
        <tr>
            <td>Line Ending</td>
            <td>The line ending used for CSV job data, marking the end of a data row.<br/>Valid values: <code>LF</code>, <code>CRLF</code>.<br/>Default is <code>LF</code>.</td>
            <td>Yes</td>
            <td>LF</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.createQueryJob>
        <operation>{${payload.operation}}</operation>
        <columnDelimiter>{${payload.columnDelimiter}}</columnDelimiter>
        <lineEnding>{${payload.lineEnding}}</lineEnding>
    </salesforce.createQueryJob>
    ```

    **Sample request**

    ```json
    {
        "operation": "QUERY",
        "columnDelimiter": "COMMA",
        "lineEnding": "LF"
    }
    ```

??? note "abortQueryJob"
    The `salesforce.abortQueryJob` operation aborts a bulk query job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/query_abort_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Query Job ID</td>
            <td>The bulk query job ID.</td>
            <td>Yes</td>
            <td>7508i000000YYYYAAA</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.abortQueryJob>
        <queryJobId>{${payload.queryJobId}}</queryJobId>
    </salesforce.abortQueryJob>
    ```

    **Sample request**

    ```json
    {
        "queryJobId": "7508i000000YYYYAAA"
    }
    ```

??? note "deleteQueryJob"
    The `salesforce.deleteQueryJob` operation deletes a bulk query job in Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/query_delete_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Query Job ID</td>
            <td>The bulk query job ID.</td>
            <td>Yes</td>
            <td>7508i000000YYYYAAA</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.deleteQueryJob>
        <queryJobId>{${payload.queryJobId}}</queryJobId>
    </salesforce.deleteQueryJob>
    ```

    **Sample request**

    ```json
    {
        "queryJobId": "7508i000000YYYYAAA"
    }
    ```

??? note "getQueryJobInfo"
    The `salesforce.getQueryJobInfo` operation retrieve bulk query job information from Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/query_get_one_job.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The bulk query job ID.</td>
            <td>Yes</td>
            <td>7508i000000YYYYAAA</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getQueryJobInfo>
        <jobId>{${payload.jobId}}</jobId>
    </salesforce.getQueryJobInfo>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7508i000000YYYYAAA"
    }
    ```

??? note "getAllQueryJobInfo"
    The `salesforce.getAllQueryJobInfo` operation retrieve all the bulk query job information from Salesforce using Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/query_get_all_jobs.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>IsPKChunkingEnabled</td>
            <td>If set to <code>true</code>, returns information only about jobs where PK Chunking is enabled (Bulk API 1.0 only).</td>
            <td>No</td>
            <td>true</td>
        </tr>
        <tr>
            <td>Job Type</td>
            <td>Returns jobs that match the specified type.<br/>
                Valid values: <code>Classic</code>, <code>V2Query</code>, <code>V2Ingest</code>, <code>All</code>.</td>
            <td>No</td>
            <td>V2Query</td>
        </tr>
        <tr>
            <td>Query Locator</td>
            <td>Returns jobs starting at the specified locator value.</td>
            <td>No</td>
            <td>0Sf3i0000004oBAEAY</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getAllQueryJobInfo>
        <isPKChunkingEnabled>{${payload.isPKChunkingEnabled}}</isPKChunkingEnabled>
        <jobType>{${payload.jobType}}</jobType>
        <queryLocator>{${payload.queryLocator}}</queryLocator>
    </salesforce.getAllQueryJobInfo>
    ```

    **Sample request**

    ```json
    {
        "isPKChunkingEnabled": true,
        "jobType": "V2Query",
        "queryLocator": "0Sf3i0000004oBAEAY"
    }
    ```

??? note "getQueryJobResults"
    The `salesforce.getQueryJobResults` operation retrieves the results of a specified bulk query job from Salesforce using the Salesforce Bulk API v2. See the [related API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/query_get_job_results.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Salesforce configuration</td>
            <td>The Salesforce configuration that stores OAuth-related data.</td>
            <td>Yes</td>
            <td>salesforceConfig</td>
        </tr>
        <tr>
            <td>Job ID</td>
            <td>The ID of the bulk query job.</td>
            <td>Yes</td>
            <td>7508i000000YYYYAAA</td>
        </tr>
        <tr>
            <td>Locator</td>
            <td>A string that identifies a specific set of query results. Providing a value returns only that set of results.</td>
            <td>No</td>
            <td>02X8i000004abcdEAA</td>
        </tr>
        <tr>
            <td>Max Records</td>
            <td>The maximum number of records to retrieve per result set.</td>
            <td>No</td>
            <td>500</td>
        </tr>
        <tr>
            <td>Output Type</td>
            <td>The response content type.</td>
            <td>Yes</td>
            <td>CSV</td>
        </tr>
        <tr>
            <td>Add Results To</td>
            <td>Where to store the results (<code>FILE</code> or <code>BODY</code>).</td>
            <td>Yes</td>
            <td>FILE</td>
        </tr>
        <tr>
            <td>File Path</td>
            <td>The file path to store results (required only when <code>Add Results To</code> is <code>FILE</code>).</td>
            <td>If <code>FILE</code> selected</td>
            <td>/tmp/query_results.csv</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.getQueryJobResults>
        <jobId>{${payload.jobId}}</jobId>
        <locator>{${payload.locator}}</locator>
        <maxRecords>{${payload.maxRecords}}</maxRecords>
        <outputType>{${payload.outputType}}</outputType>
        <addResultsTo>{${payload.addResultsTo}}</addResultsTo>
        <filePath>{${payload.filePath}}</filePath>
    </salesforce.getQueryJobResults>
    ```

    **Sample request**

    ```json
    {
        "jobId": "7508i000000YYYYAAA",
        "locator": "02X8i000004abcdEAA",
        "maxRecords": 500,
        "outputType": "CSV",
        "addResultsTo": "FILE",
        "filePath": "/tmp/query_results.csv"
    }
    ```

### SOAP

??? note "soapConvertLead"  
    The `salesforce.soapConvertLead` operation converts one or more Lead records into Account, Contact, and (optionally) Opportunity records. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_convertlead.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Lead Convert Requests</td>
            <td>The convert lead requests</td>
            <td>Yes</td>
            <td>[{...}]</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapConvertLead>
        <leadconvertrequests>{${payload.leadconvertrequests}}</leadconvertrequests>
    </salesforce.soapConvertLead>
    ```
    
    **Sample request**
    
    ```json
    {
      "leadconvertrequests": "[{...}]"
    }
    ```

??? note "soapCreate"  
    The `salesforce.soapCreate` operation adds one or more new records to Salesforce. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_create.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>All or None</td>
            <td>Whether to rollback changes if an object fails(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>Allow Field Truncate</td>
            <td>Whether to truncates strings that exceed the field length(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapCreate>
        <allOrNone>{${payload.allOrNone}}</allOrNone>
        <allowFieldTruncate>{${payload.allowFieldTruncate}}</allowFieldTruncate>
        <sobjects>{${payload.sobjects}}</sobjects>
    </salesforce.soapCreate>
    ```
    
    **Sample request**
    
    ```json
    {
      "allOrNone": "1",
      "allowFieldTruncate": "1",
      "sobjects": "Account"
    }
    ```

??? note "soapDelete"  
    The `salesforce.soapDelete` operation deletes one or more records from Salesforce. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_delete.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>All or None</td>
            <td>Whether to rollback changes if an object fails(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapDelete>
        <allOrNone>{${payload.allOrNone}}</allOrNone>
        <sobjects>{${payload.sobjects}}</sobjects>
    </salesforce.soapDelete>
    ```
    
    **Sample request**
    
    ```json
    {
      "allOrNone": "1",
      "sobjects": "Account"
    }
    ```


??? note "soapDescribeGlobal"  
    The `salesforce.soapDescribeGlobal` operation retrieves a list of all objects available in your organization's data. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_describeglobal.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr><td colspan="4">No parameters</td></tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapDescribeGlobal>
    </salesforce.soapDescribeGlobal>
    ```
    
    **Sample request**
    
    ```json
    {}
    ```

??? note "soapDescribeSObject"  
    The `salesforce.soapDescribeSObject` operation describes metadata (fields and properties) for the specified object. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_describesobject.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObject</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapDescribeSObject>
        <sobject>{${payload.sobject}}</sobject>
    </salesforce.soapDescribeSObject>
    ```
    
    **Sample request**
    
    ```json
    {
      "sobject": "Account"
    }
    ```

??? note "soapDescribeSObjects"  
    The `salesforce.soapDescribeSObjects` operation describes metadata (fields and properties) for one or more specified objects. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_describesobjects.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject types</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapDescribeSObjects>
        <sobjects>{${payload.sobjects}}</sobjects>
    </salesforce.soapDescribeSObjects>
    ```
    
    **Sample request**
    
    ```json
    {
      "sobjects": "Account"
    }
    ```

??? note "soapEmptyRecycleBin"  
    The `salesforce.soapEmptyRecycleBin` operation permanently deletes records from the Recycle Bin. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_emptyrecyclebin.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>All or None</td>
            <td>Whether to rollback changes if an object fails(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapEmptyRecycleBin>
        <allOrNone>{${payload.allOrNone}}</allOrNone>
        <sobjects>{${payload.sobjects}}</sobjects>
    </salesforce.soapEmptyRecycleBin>
    ```
    
    **Sample request**
    
    ```json
    {
      "allOrNone": "1",
      "sobjects": "Account"
    }
    ```

??? note "soapFindDuplicates"  
    The `salesforce.soapFindDuplicates` operation searches for duplicate records based on defined matching rules. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_findduplicates.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapFindDuplicates>
        <sobjects>{${payload.sobjects}}</sobjects>
    </salesforce.soapFindDuplicates>
    ```
    
    **Sample request**
    
    ```json
    {
      "sobjects": "Account"
    }
    ```

??? note "soapFindDuplicatesByIds"  
    The `salesforce.soapFindDuplicatesByIds` operation searches for duplicate records for the provided record IDs. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_findduplicatesbyids.htm) for more information. The input is an array of IDs.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>IDs</td>
            <td>Record ids</td>
            <td>Yes</td>
            <td>["0018g00000XXXXXAAA"]</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapFindDuplicatesByIds>
        <ids>{${payload.ids}}</ids>
    </salesforce.soapFindDuplicatesByIds>
    ```
    
    **Sample request**
    
    ```json
    {
      "ids": "[\"0018g00000XXXXXAAA\"]"
    }
    ```

??? note "soapGetDeleted"  
    The `salesforce.soapGetDeleted` operation retrieves IDs of records deleted during a specified time window. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_getdeleted.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObject Type</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>Start Date</td>
            <td>The start date for deleted records lookup</td>
            <td>Yes</td>
            <td>2025-06-01T00:00:00Z</td>
        </tr>
        <tr>
            <td>End Date</td>
            <td>The end date for deleted records lookup</td>
            <td>Yes</td>
            <td>2025-06-16T00:00:00Z</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapGetDeleted>
        <sObjectType>{${payload.sObjectType}}</sObjectType>
        <startDate>{${payload.startDate}}</startDate>
        <endDate>{${payload.endDate}}</endDate>
    </salesforce.soapGetDeleted>
    ```
    
    **Sample request**
    
    ```json
    {
      "sObjectType": "Account",
      "startDate": "2025-06-01T00:00:00Z",
      "endDate": "2025-06-16T00:00:00Z"
    }
    ```



??? note "soapGetServerTimestamp"  
    The `salesforce.soapGetServerTimestamp` operation retrieves the current server timestamp (UTC). See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_getservertimestamp.htm) for more information..
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr><td colspan="4">No parameters</td></tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapGetServerTimestamp>
    </salesforce.soapGetServerTimestamp>
    ```
    
    **Sample request**
    
    ```json
    {}
    ```

??? note "soapGetUpdated"  
    The `salesforce.soapGetUpdated` operation retrieves IDs of records updated during a specified time window. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_getupdated.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>sObject Type</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>Start Date</td>
            <td>The start date for deleted records lookup</td>
            <td>Yes</td>
            <td>2024-01-01T00:00:00Z</td>
        </tr>
        <tr>
            <td>End Date</td>
            <td>The end date for deleted records lookup</td>
            <td>Yes</td>
            <td>2024-01-02T00:00:00Z</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapGetUpdated>
        <sObjectType>{${payload.sObjectType}}</sObjectType>
        <startDate>{${payload.startDate}}</startDate>
        <endDate>{${payload.endDate}}</endDate>
    </salesforce.soapGetUpdated>
    ```
    
    **Sample request**
    
    ```json
    {
      "sObjectType": "Account",
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-01-02T00:00:00Z"
    }
    ```

??? note "soapGetUserInfo"  
    The `salesforce.soapGetUserInfo` operation retrieves personal information for the user of the current session. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_getuserinfo.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr><td colspan="4">No parameters</td></tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapGetUserInfo>
    </salesforce.soapGetUserInfo>
    ```
    
    **Sample request**
    
    ```json
    {}
    ```

??? note "soapLogout"  
    The `salesforce.soapLogout` operation terminates the current session. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_logout.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr><td colspan="4">No parameters</td></tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapLogout>
    </salesforce.soapLogout>
    ```
    
    **Sample request**
    
    ```json
    {}
    ```

??? note "soapMerge"  
    The `salesforce.soapMerge` operation merges up to three records of the same object type into a single record. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_merge.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Merge Requests</td>
            <td>WThe merge requests.</td>
            <td>Yes</td>
            <td>[&lt;MergeRequest/&gt;]</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapMerge>
        <mergerequests>{${payload.mergerequests}}</mergerequests>
    </salesforce.soapMerge>
    ```
    
    **Sample request**
    
    ```json
    {
      "mergerequests": "[<MergeRequest/>]"
    }
    ```

??? note "soapQuery"  
    The `salesforce.soapQuery` operation runs a SOQL query and returns matching records. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_query.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Batch Size</td>
            <td>The number of records to return.</td>
            <td>Yes</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Query String</td>
            <td>The queryString to get the results from API.</td>
            <td>Yes</td>
            <td>SELECT Id, Name FROM Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapQuery>
        <batchSize>{${payload.batchSize}}</batchSize>
        <queryString>{${payload.queryString}}</queryString>
    </salesforce.soapQuery>
    ```
    
    **Sample request**
    
    ```json
    {
      "batchSize": 200,
      "queryString": "SELECT Id, Name FROM Account"
    }
    ```

??? note "soapQueryAll"  
    The `salesforce.soapQueryAll` operation runs a SOQL query that returns both active and archived/deleted records. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_queryall.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Batch Size</td>
            <td>The number of records to return.</td>
            <td>Yes</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Query String</td>
            <td>The queryString to get the results from API.</td>
            <td>Yes</td>
            <td>SELECT Id, Name FROM Account</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapQueryAll>
        <batchSize>{${payload.batchSize}}</batchSize>
        <queryString>{${payload.queryString}}</queryString>
    </salesforce.soapQueryAll>
    ```
    
    **Sample request**
    
    ```json
    {
      "batchSize": 200,
      "queryString": "SELECT Id, Name FROM Account"
    }
    ```

??? note "soapQueryMore"  
    The `salesforce.soapQueryMore` operation retrieves the next batch of query results. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_querymore.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Batch Size</td>
            <td>The number of records to return.</td>
            <td>Yes</td>
            <td>200</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapQueryMore>
        <batchSize>{${payload.batchSize}}</batchSize>
    </salesforce.soapQueryMore>
    ```
    
    **Sample request**
    
    ```json
    {
      "batchSize": 200
    }
    ```

??? note "soapResetPassword"  
    The `salesforce.soapResetPassword` operation resets a user's password and emails them the new password. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_resetpassword.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>User ID</td>
            <td>The user&#x27;s Salesforce ID.</td>
            <td>Yes</td>
            <td>0058g00000XXXXXAAA</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapResetPassword>
        <userId>{${payload.userId}}</userId>
    </salesforce.soapResetPassword>
    ```
    
    **Sample request**
    
    ```json
    {
      "userId": "0058g00000XXXXXAAA"
    }
    ```

??? note "soapRetrieve"  
    The `salesforce.soapRetrieve` operation retrieves field values for one or more records of a specified object. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_retrieve.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Object Type</td>
            <td>The object type of the records.</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>Object IDs</td>
            <td>XML representation of the records to retrieve, as shown in the following example.</td>
            <td>Yes</td>
            <td>&lt;ids&gt;001...&lt;/ids&gt;</td>
        </tr>
        <tr>
            <td>Field List</td>
            <td>A comma-separated list of the fields you want to retrieve from the records.</td>
            <td>Yes</td>
            <td>SampleValue</td>
        </tr>
    </table>
    
    **Sample configuration**
    
    ```xml
    <salesforce.soapRetrieve>
        <objectType>{${payload.objectType}}</objectType>
        <objectIDS>{${payload.objectIDS}}</objectIDS>
        <fieldList>{${payload.fieldList}}</fieldList>
    </salesforce.soapRetrieve>
    ```
    
    **Sample request**
    
    ```json
    {
      "objectType": "Account",
      "objectIDS": "<ids>001...</ids>",
      "fieldList": "SampleValue"
    }
    ```

??? note "soapSearch"  
    The `salesforce.soapSearch` operation executes a SOSL text search against your organization's data. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_search.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>search String</td>
            <td>The searchString to get the Result.</td>
            <td>Yes</td>
            <td>*John*</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <salesforce.soapSearch>
        <searchString>{${payload.searchString}}</searchString>
    </salesforce.soapSearch>
    ```

    **Sample request**

    ```json
    {
        "searchString": "*John*"
    }
    ```

??? note "soapSendEmail"
    The `salesforce.soapSendEmail` operation sends a single or mass email immediately. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_sendemail.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Send Email</td>
            <td>XML representation of the email, as shown in the example.</td>
            <td>Yes</td>
            <td>{}</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
        <salesforce.soapSendEmail>
            <sendEmail>{${payload.sendEmail}}</sendEmail>
        </salesforce.soapSendEmail>
    ```
    
    **Sample request**
    
    ```json
        {
          "sendEmail": "<SingleEmailMessage>...</SingleEmailMessage>"
        }
    ```

??? note "soapSendEmailMessage"
    The `salesforce.soapSendEmailMessage` operation sends up to 10 draft EmailMessage records. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_sendemailmessage.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>Send Email Message</td>
            <td>XML representation of the email IDs to send, as shown in the example.</td>
            <td>Yes</td>
            <td>{}</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
        <salesforce.soapSendEmailMessage>
            <sendEmailMessage>{${payload.sendEmailMessage}}</sendEmailMessage>
        </salesforce.soapSendEmailMessage>
    ```

    **Sample request**

    ```json
        {
          "sendEmailMessage": "<EmailMessage>...</EmailMessage>"
        }
    ```

??? note "soapSetPassword"
    The `salesforce.soapSetPassword` operation sets a user's password to a specified value. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_setpassword.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>User ID</td>
            <td>The user&#x27;s Salesforce ID.</td>
            <td>Yes</td>
            <td>0058g00000XXXXXAAA</td>
        </tr>
        <tr>
            <td>Password</td>
            <td>If using setPassword, the new password to assign to the user.</td>
            <td>Yes</td>
            <td>P@ssw0rd123</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
        <salesforce.soapSetPassword>
            <userId>{${payload.userId}}</userId>
            <password>{${payload.password}}</password>
        </salesforce.soapSetPassword>
    ```

    **Sample request**

    ```json
        {
          "userId": "0058g00000XXXXXAAA",
          "password": "P@ssw0rd123"
        }
    ```

??? note "soapUndelete"
    The `salesforce.soapUndelete` operation restores deleted records from the Recycle Bin. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_undelete.htm) for more information.
    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Sample Value</th>
    </tr>
    <tr>
        <td>All or None</td>
        <td>Whether to rollback changes if an object fails(Default value is 0).</td>
        <td>Yes</td>
        <td>1</td>
    </tr>
    <tr>
        <td>sObjects</td>
        <td>The sobject type</td>
        <td>Yes</td>
        <td>Account</td>
    </tr>
    </table>

    **Sample configuration**

    ```xml
        <salesforce.soapUndelete>
            <allOrNone>{${payload.allOrNone}}</allOrNone>
            <sobjects>{${payload.sobjects}}</sobjects>
        </salesforce.soapUndelete>
    ```

    **Sample request**

    ```json
        {
          "allOrNone": "1",
          "sobjects": "Account"
        }
    ```

??? note "soapUpdate"
    The `salesforce.soapUpdate` operation updates one or more existing records. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_update.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>All or None</td>
            <td>Whether to rollback changes if an object fails(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>Allow Field Truncate</td>
            <td>Whether to truncates strings that exceed the field length(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
        <salesforce.soapUpdate>
            <allOrNone>{${payload.allOrNone}}</allOrNone>
            <allowFieldTruncate>{${payload.allowFieldTruncate}}</allowFieldTruncate>
            <sobjects>{${payload.sobjects}}</sobjects>
        </salesforce.soapUpdate>
    ```

    **Sample request**

    ```json
        {
          "allOrNone": "1",
          "allowFieldTruncate": "1",
          "sobjects": "Account"
        }
    ```

??? note "soapUpsert"
    The `salesforce.soapUpsert` operation creates new records or updates existing records based on an external ID field. See the [SOAP API documentation](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_upsert.htm) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
            <th>Sample Value</th>
        </tr>
        <tr>
            <td>All or None</td>
            <td>Whether to rollback changes if an object fails(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>Allow Field Truncate</td>
            <td>Whether to truncates strings that exceed the field length(Default value is 0).</td>
            <td>Yes</td>
            <td>1</td>
        </tr>
        <tr>
            <td>sObjects</td>
            <td>The sobject type</td>
            <td>Yes</td>
            <td>Account</td>
        </tr>
        <tr>
            <td>External ID</td>
            <td>The field containing the record ID</td>
            <td>Yes</td>
            <td>External_Id__c</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
        <salesforce.soapUpsert>
            <allOrNone>{${payload.allOrNone}}</allOrNone>
            <allowFieldTruncate>{${payload.allowFieldTruncate}}</allowFieldTruncate>
            <sobjects>{${payload.sobjects}}</sobjects>
            <externalId>{${payload.externalId}}</externalId>
        </salesforce.soapUpsert>
    ```

    **Sample request**

    ```json
        {
          "allOrNone": "1",
          "allowFieldTruncate": "1",
          "sobjects": "Account",
          "externalId": "External_Id__c"
        }
    ```
