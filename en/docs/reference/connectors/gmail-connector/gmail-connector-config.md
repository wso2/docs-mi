# Gmail Connector Reference

The following operations allow you to work with the Gmail Connector. Click an operation name to see parameter details and samples on how to use it.

---

### Connection configuration

The Gmail API uses OAuth2 authentication with Tokens. For more information on authentication, go to [Authorizing Your App with Gmail](https://developers.google.com/gmail/api/auth/about-auth).

??? note "GMAIL Connection"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>clientId</td>
            <td>Value of the Client ID you obtained when you registered your application with Gmail API.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>clientSecret</td>
            <td>Value of the Client Secret you obtained when you registered your application with the Gmail API.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>refreshToken</td>
            <td>Value of the Refresh Token, which generates a new Access Token when the previous one gets expired.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiUrl</td>
            <td>The API URL of Gmail (https://www.googleapis.com/gmail).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>apiVersion</td>
            <td>Version of the Gmail API.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>userId</td>
            <td>User mail ID.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>tokenEndpoint</td>
            <td>The token endpoint URL for OAuth authentication.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.init>
        <connectionType>GMAIL</connectionType>
        <clientId>00339149310-2h1dc24k9d5sn22k309dc578agjjwso2.apps.googleusercontent.com</clientId>
        <clientSecret>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</clientSecret>
        <refreshToken>1//04CeqvBsifESwCgYIARAAGAQSNwF-L9IrBtD40NRB0jiWSO20x5hOHhNppXnB9S9VKvguwUVVkZSp_OkL-MI-tFwahvF5K7reXUI</refreshToken>
        <apiUrl>https://www.googleapis.com/gmail</apiUrl>
        <apiVersion>v1</apiVersion>
        <userId>me</userId>
        <tokenEndpoint>https://oauth2.googleapis.com/token</tokenEndpoint>
        <name>CONN</name>
    </gmail.init>
    ```

### Mail Management 

??? note "listAllMails"
    The listAllMails operation lists all messages. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/labels/get) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>includeSpamTrash</td>
            <td>Includes messages from SPAM and TRASH in the results (default: false).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>labelIds</td>
            <td>Only returns messages with labels that match all of the specified label IDs.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>maxResults</td>
            <td>Maximum number of messages to return.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>pageToken</td>
            <td>Page token to retrieve a specific page of results in the list.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>q</td>
            <td>Only returns messages matching the specified query. Supports the same query format as the Gmail search box.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.listAllMails configKey="GmailConnection">
        <includeSpamTrash>{${payload.includeSpamTrash}}</includeSpamTrash>
        <labelIds>{${payload.labelIds}}</labelIds>
        <maxResults>{${payload.maxResults}}</maxResults>
        <pageToken>{${payload.pageToken}}</pageToken>
        <q>{${payload.q}}</q>
        <responseVariable>gmail_listAllMails_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.listAllMails>
    ```
    
    **Sample request**

    ```json
    {
        "maxResults":"10",
        "includeSpamTrash":"true",
        "pageToken":"00965906535058580458",
        "labelIds":"UNREAD",
        "q":"Jira"
    }
    ```

??? note "readMail"
    The readMail operation retrieves a message by its ID. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/get) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the message to retrieve.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>format</td>
            <td>The format to return.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>metadataHeaders</td>
            <td>When the format is METADATA, only include the headers specified in this property.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.readMail ConfigKey="GmailConnection">
        <id>{${payload.id}}</id>
        <format>{${payload.format}}</format>
        <metadataHeaders>{${payload.metadataHeaders}}</metadataHeaders>
        <responseVariable>gmail_readMail_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.readMail>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14bbb686ba287e1d",
        "format":"minimal"
    }
    ```

??? note "sendMail"
    The sendMail operation sends a plain message. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/send) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>to</td>
            <td>The email address of the recipient of the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>Subject of the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>from</td>
            <td>The email address of the sender of the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>cc</td>
            <td>The email addresses of recipients who will receive a copy of this message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>bcc</td>
            <td>The email addresses of recipients who will privately receive a copy of this message (their email addresses will be hidden).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageBody</td>
            <td>The content of the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>If the message body is in the format of html or need to send a rich text then we must give the parameter value as "text/html; charset=UTF-8" otherwise it takes the default value as text/plain.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.sendMail configKey="GmailConnection">
        <to>{${payload.to}}</to>
        <subject>{${payload.subject}}</subject>
        <from>{${payload.from}}</from>
        <cc>{${payload.cc}}</cc>
        <bcc>{${payload.bcc}}</bcc>
        <messageBody>{${payload.messageBody}}</messageBody>
        <contentType>{${payload.contentType}}</contentType>
        <responseVariable>gmail_sendMail_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.sendMail>
    ```
    
    **Sample request**

    ```json
    {
        "to":"ashalya86@gmail.com",
        "subject":"Hello",
        "cc":"vanii@gamil.com",
        "bcc":"elil@gmail.com",
        "messageBody":"Hello! Thank you for contacting us.",
        "contentType":"text/html; charset=UTF-8"
    }
    ```

??? note "modifyExistingMessage"
    The modifyExistingMessage operation modifies an existing message. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/modify) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the message to modify.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>addLabelIds</td>
            <td>A list of IDs of labels to add to this message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>removeLabelIds</td>
            <td>A list of IDs of labels to remove from this message.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.modifyExistingThread configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <addLabelIds>{${payload.addLabelIds}}</addLabelIds>
        <removeLabelIds>{${payload.removeLabelIds}}</removeLabelIds>
        <responseVariable>gmail_modifyExistingThread_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.modifyExistingThread>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14ba5cd56fcb61ee",
        "addLabelIds": [
            "Label_33",
            "Label_24"],
        "removeLabelIds": [
            "Label_28",
            "Label_31"]
    }
    ```

??? note "trashMessage"
    The trashMessage operation sends a message to the trash. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/trash) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the message to send to trash.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.trashMessage configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_trashMessage_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.trashMessage>
    ```
    
    **Sample request**

    ```json
    {
        "id":"4647683792802"
    }
    ```

??? note "unTrashMessage"
    The unTrashMessage operation removes a message from trash. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/untrash) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the message to untrash.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.unTrashMessage configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_unTrashMessage_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.unTrashMessage>
    ```
    
    **Sample request**

    ```json
    {
        "id":"4647683792802"
    }
    ```

??? note "deleteMessage"
    The deleteMessage operation permanently deletes a message. The message cannot be recovered after it is deleted. You can use trashMessages instead if you do not want to permanently delete the message. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/delete) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the message to delete.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.deleteMessage configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_deleteMessage_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.deleteMessage>
    ```
    
    **Sample request**

    ```json
    {
        "id":"4647683792802"
    }
    ```

??? note "sendMailWithAttachment"
    The sendMailWithAttachment operation sends a message with attachments. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/messages/send) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>to</td>
            <td>The email addresses of the recipients of the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>Subject of the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>cc</td>
            <td>The email addresses of recipients who will receive a copy of this message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>bcc</td>
            <td>The email addresses of recipients who will privately receive a copy of this message (their email addresses will be hidden).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>fileName</td>
            <td>A comma-seperated list of file names of the attachments you want to include with the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>filePath</td>
            <td>A comma-seperated list of file paths of the attachments you want to include with the message.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageBody</td>
            <td>Content of the message.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.sendMailWithAttachment configKey="GmailConnection">
        <subject>{${payload.subject}}</subject>
        <to>{${payload.to}}</to>
        <cc>{${payload.cc}}</cc>
        <bcc>{${payload.bcc}}</bcc>
        <messageBody>{${payload.messageBody}}</messageBody>
        <fileName>{${payload.fileName}}</fileName>
        <filePath>{${payload.filePath}}</filePath>
        <responseVariable>gmail_sendMailWithAttachment_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.sendMailWithAttachment>
    ```
    
    **Sample request**

    ```json
    {
        "subject":"WSO2 Gmail Connector",
        "to":"hmrajas1990@gmail.com",
        "cc":"hmrajas1990@gmail.com",
        "bcc":"rajjaz@wso2.com",
        "messageBody":"Welcome to WSO2 ESB Gmail Connector!!!!!",
        "fileName":"/home/rajjaz/Documents/ESB/esb-connector-gmail/src/test/resources/artifacts/ESB/config/smile.png",
        "filePath":"smile.png"
    }
    ```

### Drafts Management

??? note "listDrafts"
    The listDrafts operation lists all drafts in Gmail. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/drafts/list) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>maxResults</td>
            <td>Maximum number of messages to return.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>pageToken</td>
            <td>Page token to retrieve a specific page of results in the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.listDrafts configKey="GmailConnection">
        <maxResults>{${payload.maxResults}}</maxResults>
        <pageToken>{${payload.pageToken}}</pageToken>
        <responseVariable>gmail_listDrafts_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.listDrafts>
    ```
    
    **Sample request**

    ```json
    {
        "maxResults":"10",
        "pageToken":"09876536614133772469"
    }
    ```

??? note "readDraft"
    The readDraft operation retrieves a particular draft email. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/drafts/get) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the draft email to be retrieve</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>format</td>
            <td>The <a href="https://developers.google.com/gmail/api/v1/reference/users/drafts/get#parameters">format</a> to return the draft in</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.readDraft configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <format>{${payload.format}}</format>
        <responseVariable>gmail_readDraft_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.readDraft>
    ```
    
    **Sample request**

    ```json
    {
        "id": "1492984134337920839",
        "format":"raw"
    }
    ```

??? note "deleteDraft"
    The deleteDraft operation deletes an existing draft. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/drafts/delete) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the draft email to be deleted.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.deleteDraft configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_deleteDraft_1</responseVariable>
        <overwriteBody>false</overwriteBo`dy>
    </gmail.deleteDraft>
    ```
    
    **Sample request**

    ```json
    {
        "id":"1491513685150755887"
    }
    ```

??? note "createDraft"
    The createDraft operation creates a new draft. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/drafts/create) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>to</td>
            <td>The email address of the recipient of this email.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>Subject of the email.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>from</td>
            <td>The email address of the sender of the email.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>cc</td>
            <td>The email addresses of recipients who will receive a copy of this email.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>bcc</td>
            <td>The email addresses of recipients who will privately receive a copy of this email (their email addresses will be hidden from each other).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>threadId</td>
            <td>ID of the thread.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>id</td>
            <td>ID of the email.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageBody</td>
            <td>Content of the email.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>If the message body is in the format of HTML or if you need to send a rich text then you must give the parameter value as "text/html; charset=UTF-8" otherwise it takes the default value as text/plain.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.createDraft configKey="GmailConnection">
        <to>{${payload.to}}</to>
        <subject>{${payload.subject}}</subject>
        <from>{${payload.from}}</from>
        <cc>{${payload.cc}}</cc>
        <bcc>{${payload.bcc}}</bcc>
        <id>{${payload.id}}</id>
        <threadId>{${payload.threadId}}</threadId>
        <messageBody>{${payload.messageBody}}</messageBody>
        <contentType>{${payload.contentType}}</contentType>
        <responseVariable>gmail_createDraft_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.createDraft>
    ```
    
    **Sample request**

    ```json
    {
        "to":"tharis63@hotmail.com",
        "from":"tharis63@gmail.com",
        "subject":"test",
        "messageBody":"Hi hariprasath",
        "cc":"tharis63@outlook.com",
        "bcc":"tharis63@yahoo.com",
        "id":"154b8c77e551c509",
        "threadId":"154b8c77e551c509",
        "contentType":"text/html; charset=UTF-8"
    }
    ```

### Labels Management

??? note "listLabels"
     The listLabels operation lists all existing labels. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/labels/list) for more information.

    **Sample configuration**

    ```xml
    </gmail.listLabels configKey="GmailConnection">
        <responseVariable>gmail_listLabels_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.listLabels>
    ```    

??? note "readLabel"
    The readLabel operation gets a label's details. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/labels/get) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the label whose details you want to retrieve.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.readLabel configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_readLabel_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.readLabel>
    ```
    
    **Sample request**

    ```json
    {
        "id":"Label_1"
    }
    ```

??? note "deleteLabel"
    The deleteLabel operation deletes a label. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/labels/delete) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the label to be deleted.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.deleteLabel configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_deleteLabel_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.deleteLabel>
    ```
    
    **Sample request**

    ```json
    {
        "id":"57648478394803"
    }
    ```

??? note "createLabel"
    The createLabel operation creates a new label. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/labels/create) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>The display name of the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageListVisibility</td>
            <td>The visibility of messages with this label in the message list in the Gmail web interface.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>labelListVisibility</td>
            <td>The visibility of the label in the label list in the Gmail web interface.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>type</td>
            <td>The owner type for the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messagesTotal</td>
            <td>The total number of messages with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messagesUnread</td>
            <td>The number of unread messages with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>threadsTotal</td>
            <td>The total number of threads with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>threadsUnread</td>
            <td>The number of unread threads with the label.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.createLabel configKey="GmailConnection">
        <name>{${payload.name}}</name>
        <messageListVisibility>{${payload.messageListVisibility}}</messageListVisibility>
        <labelListVisibility>{${payload.labelListVisibility}}</labelListVisibility>
        <type>{${payload.type}}</type>
        <messagesTotal>{${payload.messagesTotal}}</messagesTotal>
        <messagesUnread>{${payload.messagesUnread}}</messagesUnread>
        <threadsTotal>{${payload.threadsTotal}}</threadsTotal>
        <threadsUnread>{${payload.threadsUnread}}</threadsUnread>
        <responseVariable>gmail_createLabel_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.createLabel>
    ```

    **Sample request**

    ```json
    {
        "name": "TestESB2",
        "threadsUnread": 100,
        "messageListVisibility": "show",
        "threadsTotal": 100,
        "type": "user",
        "messagesTotal": 100,
        "messagesUnread": 100,
        "labelListVisibility": "labelShow"
    }
    ```

??? note "updateLabel"
    The updateLabel operation updates an existing label. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/labels/update) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>name</td>
            <td>The display name of the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messageListVisibility</td>
            <td>The visibility of messages with this label in the message list in the Gmail web interface.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>labelListVisibility</td>
            <td>The visibility of the label in the label list in the Gmail web interface.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>type</td>
            <td>The owner type for the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messagesTotal</td>
            <td>The total number of messages with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>messagesUnread</td>
            <td>The number of unread messages with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>threadsTotal</td>
            <td>The total number of threads with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>threadsUnread</td>
            <td>The number of unread threads with the label.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the label to update.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.updateLabel configKey="GmailConnection">
        <name>{${payload.name}}</name>
        <messageListVisibility>{${payload.messageListVisibility}}</messageListVisibility>
        <labelListVisibility>{${payload.labelListVisibility}}</labelListVisibility>
        <type>{${payload.type}}</type>
        <messagesTotal>{${payload.messagesTotal}}</messagesTotal>
        <messagesUnread>{${payload.messagesUnread}}</messagesUnread>
        <threadsTotal>{${payload.threadsTotal}}</threadsTotal>
        <threadsUnread>{${payload.threadsUnread}}</threadsUnread>
        <id>{${payload.id}}</id>
        <responseVariable>gmail_updateLabel_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.updateLabel>
    ```
    
    **Sample request**

    ```json
    {
        "id":"426572682792",
        "name": "TestESB2",
        "threadsUnread": 100,
        "messageListVisibility": "show",
        "threadsTotal": 100,
        "type": "user",
        "messagesTotal": 100,
        "messagesUnread": 100,
        "labelListVisibility": "labelShow"
    }
    ```



### Threads

??? note "listAllThreads"
    The listAllThreads operation lists all the existing email threads. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/threads/list) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>includeSpamTrash</td>
            <td>Include messages from SPAM and TRASH in the results (default: false).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>labelIds</td>
            <td>Only returns threads with labels that match all of the specified label IDs.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>maxResults</td>
            <td>Maximum number of messages to return.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>pageToken</td>
            <td>Page token to retrieve a specific page of results in the list.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>q</td>
            <td>Only returns messages matching the specified query. Supports the same query format as the Gmail search box.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.listAllThreads configKey="GmailConnection">
        <includeSpamTrash>{${payload.includeSpamTrash}}</includeSpamTrash>
        <labelIds>{${payload.labelIds}}</labelIds>
        <maxResults>{${payload.maxResults}}</maxResults>
        <pageToken>{${payload.pageToken}}</pageToken>
        <q>{${payload.q}}</q>
        <responseVariable>gmail_listAllThreads_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.listAllThreads>
    ```
    
    **Sample request**

    ```json
    {
        "maxResults":"10",
        "includeSpamTrash":"true",
        "pageToken":"00965906535058580458",
        "labelIds":"UNREAD",
        "q":"Jira"
    }
    ```

??? note "readThread"
    The readThread operation retrieves an existing thread. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/threads/get) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the thread to retrieve.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>format</td>
            <td>The format in which to return the messages in the thread.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>metadataHeaders</td>
            <td>When the format is METADATA, only include the headers specified with this property.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.readThread configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <format>{${payload.format}}</format>
        <metadataHeaders>{${payload.metadataHeaders}}</metadataHeaders>
        <responseVariable>gmail_readThread_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.readThread>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14bbb686ba287e1d",
        "format":"minimal"
    }
    ```

??? note "trashThreads"
    The trashThreads operation sends a thread to the trash. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/threads/trash) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the thread to trash.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.trashThread configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_trashThread_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.trashThread>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14bbb686ba287e1d"
    }
    ```

??? note "unTrashThreads"
    The unTrashThreads operation removes a thread from the trash. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/threads/untrash) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the thread to untrash.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.unTrashThread configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_unTrashThread_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.unTrashThread>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14bbb686ba287e1d"
    }
    ```

??? note "modifyExistingThread"
    The modifyExistingThread operation modifies an existing thread. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/threads/modify) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>id</td>
            <td>The ID of the thread to modify.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>addLabelIds</td>
            <td>A list of IDs of labels to add to this thread.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>removeLabelIds</td>
            <td>A list of IDs of labels to remove from this thread.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.modifyExistingThread configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <addLabelIds>{${payload.addLabelIds}}</addLabelIds>
        <removeLabelIds>{${payload.removeLabelIds}}</removeLabelIds>
        <responseVariable>gmail_modifyExistingThread_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.modifyExistingThread>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14b31c7af7b778f4",
        "addLabelIds": [
            "Label_33",
            "Label_24"],
        "removeLabelIds": [
            "Label_28",
            "Label_31"]
    }
    ```

??? note "deleteThread"
    The deleteThreads operation deletes the specified thread`. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/threads/delete) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
        <td>id</td>
            <td>The ID of the thread to delete.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.deleteThread configKey="GmailConnection">
        <id>{${payload.id}}</id>
        <responseVariable>gmail_deleteThread_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.deleteThread>
    ```
    
    **Sample request**

    ```json
    {
        "id":"14b31c7af7b778f4"
    }
    ```

### Account Management

??? note "listTheHistory"
    The listTheHistory operation lists the history of changes to the user's mailbox. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/history/list) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>startHistoryId</td>
            <td>Returns history records after the specified startHistoryId.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>maxResults</td>
            <td>The maximum number of history records to return.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>pageToken</td>
            <td>Page token to retrieve a specific page of results in the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <gmail.listTheHistory configKey="GmailConnection">
        <startHistoryId>{${payload.startHistoryId}}</startHistoryId>
        <labelId>{${payload.labelId}}</labelId>
        <maxResults>{${payload.maxResults}}</maxResults>
        <pageToken>{${payload.pageToken}}</pageToken>
        <responseVariable>gmail_listTheHistory_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.listTheHistory>
    ```
    
    **Sample request**

    ```json
    {
        "startHistoryId":"7399652",
        "labelId":"Label_31",
        "maxResults":"10"
    }
    ```

??? note "getUserProfile"
    The getUserProfile operation lists all details about the user's profile. See the [related API documentation](https://developers.google.com/gmail/api/v1/reference/users/getProfile) for more information.

    **Sample configuration**

    ```xml
    <gmail.getUserProfile configKey="GmailConnection">
        <responseVariable>gmail_getUserProfile_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </gmail.getUserProfile>
    ```


??? note "endSession"
    The endSession operation terminates the authenticated IMAP and SMTP connections with Gmail.

    **Sample configuration**

    ```xml
    <gmail.endSession configKey="GmailConnection">
        <responseVariable >gmail_endSession_1</responseVariable>
        <overwriteBody >false</overwriteBody>
    </gmail.endSession>
    ```
