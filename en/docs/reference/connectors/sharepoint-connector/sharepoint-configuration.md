# Sharepoint Connector Reference

The following operations allow you to work with the Microsoft Graph APIs related to Sharepoint. Click an operation name to see parameter details and samples on how to use it.

## Initialize the connector

To use the Sharepoint connector, first create the connection with your configuration. When calling a Sharepoint operation, ensure the connection is referenced using the `configKey` attribute.

??? note "init"
    The `init` operation initializes the connection to Microsoft Graph API.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Unique name to identify the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>base</code></td>
            <td>The service root URL. The default value is `https://graph.microsoft.com/v1.0`.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientId</code></td>
            <td>Client ID of the registered application.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>clientSecret</code></td>
            <td>Client secret of the registered application.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>tenant</code></td>
            <td>Your Azure AD tenant ID or domain name.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.init>
        <connectionType>sharepoint</connectionType>
        <name>SHAREPOINT_CONN</name>
        <base>https://graph.microsoft.com/v1.0</base>
        <clientId>REPLACE_WITH_CLIENT_ID</clientId>
        <clientSecret>REPLACE_WITH_CLIENT_SECRET</clientSecret>
        <tenant>REPLACE_WITH_TENANT</tenant>
    </sharepoint.init>
    ```

## Operations

??? note "createFolder"
    The `createFolder` operation creates a new folder within the specified parent folder in SharePoint. The newly created folder is returned upon successful execution.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr> 
            <td><code>siteId</code></td> 
            <td>The unique identifier of the site. Type: <code>string</code></td> 
            <td>Yes</td> 
        </tr> 
        <tr> 
            <td><code>parentItemId</code></td> 
            <td>The ID of the parent folder. Use <code>'root'</code> for the root directory. Type: <code>string</code></td> 
            <td>Yes</td> 
        </tr> 
        <tr> 
            <td><code>name</code></td> 
            <td>The name of the folder to be created. Type: <code>string</code></td> 
            <td>Yes</td> 
        </tr> 
        <tr> 
            <td><code>folder</code></td> 
            <td>Empty object to indicate this item is a folder. Type: <code>string</code></td> 
            <td>Yes</td>
        </tr> 
        <tr> 
            <td><code>MicrosoftGraphConflictBehavior</code></td> 
            <td>Specifies how to handle naming conflicts when creating files or folders. Accepts <code>'fail'</code> (default), <code>'replace'</code>, or <code>'rename'</code>. Type: <code>string</code></td> 
            <td>No</td> 
        </tr> 
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.createFolder configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.site_id)}</siteId>
        <parentItemId>{json-eval($.parent_id)}</parentItemId>
        <name>{json-eval($.folder_name)}</name>
        <folder>{}</folder>
        <MicrosoftGraphConflictBehavior>{json-eval($.conflict_behavior)}</MicrosoftGraphConflictBehavior>
    </sharepoint.createFolder>
    ```
 
    **Sample request**

    ```json
    {
        "site_id": "site123",
        "parent_id": "root",
        "folder_name": "New Folder",
        "MicrosoftGraphConflictBehavior": "fail"
    }
    ```

??? note "uploadFile"
    The `uploadFile` operation uploads a new file to the specified folder within a SharePoint site. Upon successful execution, the newly uploaded file will be available at the target location.
    <table> 
        <tr> 
            <th>Parameter name</th> 
            <th>Description</th> 
            <th>Required</th> 
        </tr> 
        <tr>    
            <td><code>siteId</code></td> 
            <td>The unique identifier of the SharePoint site where the file will be uploaded. Type: <code>string</code></td> 
            <td>Yes</td> 
        </tr> 
        <tr> 
            <td><code>parentItemId</code></td> 
            <td>The ID of the parent folder where the file will be uploaded. Use <code>'root'</code> for the root directory. Type: <code>string</code></td> 
            <td>Yes</td> 
        </tr> 
        <tr> 
            <td><code>fileName</code></td> 
            <td>The name of the file to be uploaded. Type: <code>string</code></td> 
            <td>Yes</td> 
        </tr> 
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.uploadFile configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <parentItemId>{json-eval($.parentItemId)}</parentItemId>
        <fileName>{json-eval($.fileName)}</fileName>
    </sharepoint.uploadFile>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "parentItemId": "root",
        "fileName": "NewDocument.docx"
    }
    ```

??? note "createGroup"
    The `createGroup` operation creates a new Microsoft 365 Group, which provisions a connected SharePoint site. Upon successful execution, the newly created group details are returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>A brief description of the group, outlining its purpose and intended use. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>displayName</code></td>
            <td>The display name of the group, visible in Microsoft 365 applications and directories. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>groupTypes</code></td>
            <td>An array specifying the types of the group. For Microsoft 365 groups, set this to <code>['Unified']</code>. Type: <code>string[]</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>mailEnabled</code></td>
            <td>Indicates whether the group is mail-enabled. Set to <code>true</code> to enable email functionalities for the group. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>mailNickname</code></td>
            <td>The mail alias for the group, used in its email address. This must be unique within the organization. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>securityEnabled</code></td>
            <td>Determines whether the group is a security group. For Microsoft 365 groups, set this to <code>false</code>. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>visibility</code></td>
            <td>Defines the visibility of the group. Acceptable values are <code>'Private'</code> or <code>'Public'</code>. Type: <code>string</code></td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.createGroup configKey="SHAREPOINT_CONN">
        <description>{json-eval($.description)}</description>
        <displayName>{json-eval($.displayName)}</displayName>
        <groupTypes>{json-eval($.groupTypes)}</groupTypes>
        <mailEnabled>{json-eval($.mailEnabled)}</mailEnabled>
        <mailNickname>{json-eval($.mailNickname)}</mailNickname>
        <securityEnabled>{json-eval($.securityEnabled)}</securityEnabled>
        <visibility>{json-eval($.visibility)}</visibility>
    </sharepoint.createGroup>
    ```
 
    **Sample request**

    ```json
    {
        "description": "Team collaboration for Project Alpha",
        "displayName": "Project Alpha Team",
        "groupTypes": ["Unified"],
        "mailEnabled": "true",
        "mailNickname": "projectalpha",
        "securityEnabled": "false",
        "visibility": "Private"
    }
    ```

??? note "createList"
    The `createList` operation creates a new list within the specified SharePoint site. Upon successful execution, the newly created list details are returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the site. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>Specifies the name and the properties of the new list. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.createList configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <properties>{json-eval($.listProperties)}</properties>
    </sharepoint.createList>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listProperties": {
            "displayName": "Books through MI",
            "columns": [
                {
                    "name": "BookAuthor",
                    "text": {}
                },
                {
                    "name": "PageCount",
                    "number": {}
                }
            ],
            "list": {
                "template": "genericList"
            }
        }
    }
    ```

??? note "createListItem"
    The `createListItem` operation creates a new item within the specified SharePoint list. Upon successful execution, the newly created list item details are returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier of the list where the item will be created. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>The object containing the data for the new list item. Type: <code>object</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.createListItem configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
        <fields>{json-eval($.fields)}</fields>
    </sharepoint.createListItem>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "list456",
        "fields": {
            "BookAuthor": "Ross Geller",
            "PageCount": 567
        }
    }
    ```

??? note "deleteDriveItem"
    The `deleteDriveItem` operation deletes the specified file or folder within a SharePoint site. Upon successful execution, the item is removed from the site.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the item resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the item (file or folder) to be deleted. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.deleteDriveItem configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <itemId>{json-eval($.itemId)}</itemId>
    </sharepoint.deleteDriveItem>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "itemId": "item789"
    }
    ```

??? note "deleteList"
    The `deleteList` operation deletes the specified list within a SharePoint site. Upon successful execution, the targeted list is removed from the site.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier of the list to be deleted. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.deleteList configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
    </sharepoint.deleteList>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "list456"
    }
    ```

??? note "deleteListItem"
    The `deleteListItem` operation deletes the specified item within a SharePoint list. Upon successful execution, the targeted list item is permanently removed from the list.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier of the list containing the item to be deleted. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the item (file or folder) to be deleted. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.deleteListItem configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
        <itemId>{json-eval($.itemId)}</itemId>
    </sharepoint.deleteListItem>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "list456",
        "itemId": "5"
    }
    ```

??? note "getDriveItemById"
    The `getDriveItemById` operation retrieves metadata about the specified file or folder within a SharePoint site. Upon successful execution, detailed information about the drive item is returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the item resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the item (file or folder) whose metadata is to be retrieved. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getDriveItemById configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <itemId>{json-eval($.itemId)}</itemId>
    </sharepoint.getDriveItemById>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "itemId": "item789"
    }
    ```

??? note "getFolderChildren"
    The `getFolderChildren` operation retrieves all items within the specified folder in a SharePoint site. Upon successful execution, a list of child items (files and subfolders) along with their metadata is returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the folder resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the folder whose children are to be retrieved. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getFolderChildren configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <itemId>{json-eval($.itemId)}</itemId>
    </sharepoint.getFolderChildren>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "itemId": "folder456"
    }
    ```

??? note "getGroupSite"
    The `getGroupSite` operation retrieves the root SharePoint site associated with the specified Microsoft 365 Group. Upon successful execution, detailed information about the group's SharePoint site is returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>groupId</code></td>
            <td>The unique identifier of the Microsoft 365 Group. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getGroupSite configKey="SHAREPOINT_CONN">
        <groupId>{json-eval($.groupId)}</groupId>
    </sharepoint.getGroupSite>
    ```
 
    **Sample request**

    ```json
    {
        "groupId": "group123"
    }
    ```

??? note "getListById"
    The `getListById` operation retrieves detailed information about a specific SharePoint list using its unique identifier (GUID). Upon successful execution, the operation returns metadata and properties of the specified list.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier (GUID) of the list to be retrieved. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getListById configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
    </sharepoint.getListById>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    ```

??? note "getListItemById"
    The `getListItemById` operation retrieves detailed information about a specific item within a SharePoint list using its unique identifier (ID). Upon successful execution, the operation returns metadata and properties of the specified list item.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier (GUID) of the list containing the item to be retrieved. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the item (file or folder) to be retrieved. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getListItemById configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
        <itemId>{json-eval($.itemId)}</itemId>
    </sharepoint.getListItemById>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "itemId": "item789"
    }
    ```

??? note "getListItems"
    The `getListItems` operation retrieves all items within the specified SharePoint list. Upon successful execution, a collection of list items along with their metadata is returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier (GUID) of the list from which items are to be retrieved. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getListItems configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
    </sharepoint.getListItems>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    ```

??? note "getLists"
    The `getLists` operation retrieves all lists within the specified SharePoint site. Upon successful execution, a collection of lists along with their metadata is returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the lists are located. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getLists configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
    </sharepoint.getLists>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123"
    }
    ```

??? note "getRootChildren"
    The `getRootChildren` operation retrieves all items in the root directory of the drive within the specified SharePoint site. Upon successful execution, a collection of child items (files and folders) along with their metadata is returned.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the root drive is located. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.getRootChildren configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
    </sharepoint.getRootChildren>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123"
    }
    ```

??? note "updateFileContent"
    The `updateFileContent` operation updates the content of the specified file within a SharePoint site. Upon successful execution, the file's content is updated with the provided data.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the item resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the item (file or folder) to be updated. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.updateFileContent configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <itemId>{json-eval($.itemId)}</itemId>
    </sharepoint.updateFileContent>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "itemId": "file456"
    }
    ```

??? note "updateFolder"
    The `updateFolder` operation updates the properties of the specified folder within a SharePoint site. Upon successful execution, the folder's properties are updated with the provided data.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the folder resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the folder to be updated. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>The new name for the folder. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.updateFolder configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <itemId>{json-eval($.itemId)}</itemId>
        <name>{json-eval($.name)}</name>
    </sharepoint.updateFolder>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "itemId": "folder456",
        "name": "New Folder Name"
    }
    ```

??? note "updateList"
    The `updateList` operation updates the properties of the specified SharePoint list. Upon successful execution, the list's properties are updated with the provided data.
    <table>
        <tr>
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier (GUID) of the list to be updated. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>displayName</code></td>
            <td>The new display name you wish to assign to the list. Type: <code>string</code></td>
            <td>No</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>The new description text for the list. Type: <code>string</code></td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.updateList configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
        <displayName>{json-eval($.displayName)}</displayName>
        <description>{json-eval($.description)}</description>
    </sharepoint.updateList>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "displayName": "Updated List Name",
        "description": "This is the updated description for the list."
    }
    ```

??? note "updateListItemFields"
    The `updateListItemFields` operation updates the fields of the specified list item within a SharePoint site. Upon successful execution, the item's properties are updated with the provided data.
    <table> 
        <tr> 
            <th>Parameter name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td><code>siteId</code></td>
            <td>The unique identifier of the SharePoint site where the list resides. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>listId</code></td>
            <td>The unique identifier (GUID) of the list containing the item to be updated. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>itemId</code></td>
            <td>The unique identifier of the item (file or folder) to be updated. Type: <code>string</code></td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><code>properties</code></td>
            <td>Specifies the properties of the item to be updated. Type: <code>object</code></td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sharepoint.updateListItemFields configKey="SHAREPOINT_CONN">
        <siteId>{json-eval($.siteId)}</siteId>
        <listId>{json-eval($.listId)}</listId>
        <itemId>{json-eval($.itemId)}</itemId>
        <properties>{json-eval($.properties)}</properties>
    </sharepoint.updateListItemFields>
    ```
 
    **Sample request**

    ```json
    {
        "siteId": "site123",
        "listId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "itemId": "3",
        "properties": {
            "BookAuthor": "Chandler Bing",
            "PageCount": 2456
        }
    }
    ```

## Error codes related to Sharepoint Connector

The connector may encounter errors during operation execution. When an error occurs, the `ERROR_MESSAGE` property will contain detailed information about the error. You can handle these errors using a `Fault Sequence` in your integration. For more information, see [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences/).

| Error code | Description |
| -------- | ------- |
| 701001 | General error. |
| 701002 | Invalid configuration error. |
| 701003 | Error in access token generation flow. |
