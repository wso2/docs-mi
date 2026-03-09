# Email Connector Reference

This documentation provides a reference guide for the Email Connector.
The Email Connector allows you to list, send emails and perform other actions such as get body, get attachment,mark email as read, mark email as deleted, delete email and expunge folder on different mailboxes using protocols IMAP, POP3 and SMTP.

## Connection Configurations

<img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn.png" title="Email Connector Configuration" width="700" alt="Email Connector Configuration"/>

The WSO2 MI Email Connector supports multiple email protocols, allowing seamless integration with mail servers.

- **SMTP (Simple Mail Transfer Protocol)**  
  SMTP is a standard communication protocol used for sending emails between mail servers. It is primarily responsible for the transmission of outgoing messages from email clients to mail servers and between mail servers.  

- **SMTPS (Secure SMTP)**  
  SMTPS is the secure version of SMTP that encrypts email communication using SSL/TLS to enhance security and protect sensitive information from interception during transmission.  

- **POP3 (Post Office Protocol v3)**  
  POP3 is a protocol used to retrieve emails from a mail server. It downloads messages to the local device and typically removes them from the server, making it suitable for single-device email access.  

- **POP3S (Secure POP3)**  
  POP3S is the secure version of POP3, where email retrieval is encrypted using SSL/TLS, ensuring that email data remains protected during transmission.  

- **IMAP (Internet Message Access Protocol)**  
  IMAP is a protocol used for retrieving emails while keeping them stored on the mail server. It allows users to manage emails across multiple devices, providing synchronization between the client and server.  

- **IMAPS (Secure IMAP)**  
  IMAPS is the secure version of IMAP, where email communication is encrypted using SSL/TLS, ensuring that sensitive data remains protected while being accessed or synchronized.  

### Connection Configuration Parameters
The connection configuration parameters are used to establish a connection with the email server. These parameters are needed to provide based on the protocol you are using.

??? note "SMTP"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>Name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Hostname of the SMTP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Port number of the SMTP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>requireAuthentication</td>
            <td>Specifies if authentication is required.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Username for authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password for authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        </tr>
            <td>Read Timeout</td>
            <td>Timeout for reading the response from the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>Timeout for establishing the connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>writeTimeout</td>
            <td>Timeout for writing the request to the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Active Connections</td>
            <td>Maximum number of active connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Idle Connections</td>
            <td>Maximum number of idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Wait Time</td>
            <td>Maximum wait time for a connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Min Eviction Time</td>
            <td>Minimum time before an idle connection is evicted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Eviction Check Interval</td>
            <td>Interval for checking idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Exhausted Action </td>
            <td>Action to take when the connection pool is exhausted.</td>
            <td>No</td>
        </tr>
    </table>

??? note "SMTPS"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>Name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Hostname of the SMTPS server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Port number of the SMTPS server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Username for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>requireTLS</td>
            <td>Specifies if TLS is required.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        </tr>
            <td>Read Timeout</td>
            <td>Timeout for reading the response from the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>Timeout for establishing the connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>writeTimeout</td>
            <td>Timeout for writing the request to the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Active Connections</td>
            <td>Maximum number of active connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Idle Connections</td>
            <td>Maximum number of idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Wait Time</td>
            <td>Maximum wait time for a connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Min Eviction Time</td>
            <td>Minimum time before an idle connection is evicted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Eviction Check Interval</td>
            <td>Interval for checking idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Exhausted Action </td>
            <td>Action to take when the connection pool is exhausted.</td>
            <td>No</td>
        </tr>
    </table>

??? note "POP3"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>Name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Hostname of the POP3 server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Port number of the POP3 server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Username for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        </tr>
            <td>Read Timeout</td>
            <td>Timeout for reading the response from the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>Timeout for establishing the connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>writeTimeout</td>
            <td>Timeout for writing the request to the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Active Connections</td>
            <td>Maximum number of active connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Idle Connections</td>
            <td>Maximum number of idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Wait Time</td>
            <td>Maximum wait time for a connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Min Eviction Time</td>
            <td>Minimum time before an idle connection is evicted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Eviction Check Interval</td>
            <td>Interval for checking idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Exhausted Action </td>
            <td>Action to take when the connection pool is exhausted.</td>
            <td>No</td>
        </tr>
    </table>

??? note "POP3S"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>Name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Hostname of the POP3S server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Port number of the POP3S server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Username for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        </tr>
            <td>Read Timeout</td>
            <td>Timeout for reading the response from the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>Timeout for establishing the connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>writeTimeout</td>
            <td>Timeout for writing the request to the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Active Connections</td>
            <td>Maximum number of active connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Idle Connections</td>
            <td>Maximum number of idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Wait Time</td>
            <td>Maximum wait time for a connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Min Eviction Time</td>
            <td>Minimum time before an idle connection is evicted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Eviction Check Interval</td>
            <td>Interval for checking idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Exhausted Action </td>
            <td>Action to take when the connection pool is exhausted.</td>
            <td>No</td>
        </tr>
    </table>

??? note "IMAP"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>Name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Hostname of the IMAP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Port number of the IMAP server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Username for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        </tr>
            <td>Read Timeout</td>
            <td>Timeout for reading the response from the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>Timeout for establishing the connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>writeTimeout</td>
            <td>Timeout for writing the request to the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Active Connections</td>
            <td>Maximum number of active connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Idle Connections</td>
            <td>Maximum number of idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Wait Time</td>
            <td>Maximum wait time for a connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Min Eviction Time</td>
            <td>Minimum time before an idle connection is evicted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Eviction Check Interval</td>
            <td>Interval for checking idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Exhausted Action </td>
            <td>Action to take when the connection pool is exhausted.</td>
            <td>No</td>
        </tr>
    </table>

??? note "IMAPS"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>connectionName</td>
            <td>Name of the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Hostname of the IMAPS server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Port number of the IMAPS server.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>username</td>
            <td>Username for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>password</td>
            <td>Password for authentication.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>requireTLS</td>
            <td>Specifies if TLS is required.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Oauth2 Authentication</td>
        </tr>
        <tr>
            <td>Enable OAuth2</td>
            <td>Specifies if OAuth2 authentication is required.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Grant Type</td>
            <td>Type of OAuth2 grant to be used.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Client Id</td>
            <td>Client ID for OAuth2 authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Client Secret</td>
            <td>Client Secret for OAuth2 authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Refresh Token</td>
            <td>Refresh Token for OAuth2 authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Token URL</td>
            <td>URL to obtain the OAuth2 token.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Scope</td>
            <td>Scope for OAuth2 authentication.</td>
            <td>No</td>
        </tr>
        <tr>
            <th colspan="3">Additional parameters for connection</td>
        </tr>
            <td>Read Timeout</td>
            <td>Timeout for reading the response from the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>connectionTimeout</td>
            <td>Timeout for establishing the connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>writeTimeout</td>
            <td>Timeout for writing the request to the server.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Active Connections</td>
            <td>Maximum number of active connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Idle Connections</td>
            <td>Maximum number of idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Max Wait Time</td>
            <td>Maximum wait time for a connection.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Min Eviction Time</td>
            <td>Minimum time before an idle connection is evicted.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Eviction Check Interval</td>
            <td>Interval for checking idle connections.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>Exhausted Action </td>
            <td>Action to take when the connection pool is exhausted.</td>
            <td>No</td>
        </tr>
    </table>

## Operations
    
    
??? note "list"
    The list operation retrieves emails matching the specified filters.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>deleteAfterRetrieve</td>
            <td>Whether the email should be deleted after retrieving.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>receivedSince</td>
            <td>The date after which to retrieve received emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>receivedUntil</td>
            <td>The date until which to retrieve received emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>sentSince</td>
            <td>The date after which to retrieve sent emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>sentUntil</td>
            <td>The date until which to retrieve sent emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>subjectRegex</td>
            <td>Subject Regex to match with the wanted emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>fromRegex</td>
            <td>From email address to match with the wanted emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>seen</td>
            <td>Whether to retrieve 'seen' or 'not seen' emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>answered</td>
            <td>Whether to retrieve 'answered' or 'unanswered' emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>deleted</td>
            <td>Whether to retrieve 'deleted' or 'not deleted' emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>recent</td>
            <td>Whether to retrieve 'recent' or 'past' emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>offset</td>
            <td>The index from which to retrieve emails.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>limit</td>
            <td>The number of emails to be retrieved.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the Mailbox folder to retrieve emails from. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <email.list configKey="IMAPS_CONN">
        <deleteAfterRetrieve>false</deleteAfterRetrieve>
        <receivedSince></receivedSince>
        <receivedUntil></receivedUntil>
        <sentSince></sentSince>
        <sentUntil></sentUntil>
        <subjectRegex></subjectRegex>
        <fromRegex></fromRegex>
        <seen></seen>
        <answered></answered>
        <deleted></deleted>
        <recent>true</recent>
        <offset>0</offset>
        <limit>10</limit>
        <folder>Inbox</folder>
        <responseVariable>email_list_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </email.list>
    ```
    
    **Sample response**
    
    The response received will be stored in the variable `email_list_1` as a JSON object. The following is a sample response.
    
    ```json
    {
        "emails": {
            "email": [
                {
                    "index": 0,
                    "emailId": "<1623446944.0.152334336343@localhost>",
                    "to": "<your-email>@gmail.com",
                    "from": "<your-email>@gmail.com",
                    "replyTo": "<your-email>@gmail.com",
                    "subject": "Sample email",
                    "attachments": {
                        "index": "0",
                        "name": "contacts.csv",
                        "contentType": "TEXT/CSV"
                    }
                }
            ]
        }
    }
    ```
        
    > **Note:** The emailId of the email can be used to retrieve the email content and attachment content using below operations.
    
??? note "getEmailBody"

    The getEmailBody operation retrieves the email content.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>emailId</td>
            <td>Email Id of the email to retrieve the content.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the mailbox folder from which to retrieve the email. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <email.getEmailBody configKey="IMAPS_CONN">
        <emailId >&lt;CAJDNsXYtN9_QnACnZP=MRp5E2u3_StvQ0SO4QQu5THxSA=mAXg@mail.wso2.com&gt;</emailId>
        <folder >Inbox</folder>
        <responseVariable >email_getEmailBody_1</responseVariable>
        <overwriteBody >false</overwriteBody>
    </email.getEmailBody>
    ```

    Following properties will be set in the message context or to a new variable if the `overwriteBody` parameter is set to `false`.

    ```
    {
        "email": {
            "emailId": "<email@mail.wso2.com>",
            "to": "toemail@email.com",
            "from": "fromemail@email.com",
            "cc": "",
            "bcc": "",
            "subject": "Subject",
            "replyTo": "email@email.com",
            "htmlContent": "<div dir=\"auto\"></div>\r\n",
            "textContent": "\r\n"
        }
    }
    ```

??? note "getEmailAttachment"

    The getEmailAttachment operation retrieves the email content.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>emailId</td>
            <td>Email Id of the email to retrieve the content.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the mailbox folder from which to retrieve the email. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
            <td>attachmentIndex</td>
            <td>Index of the attachment as per above response of which to retrieve the attachment content.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <email.getEmailAttachment configKey="IMAPS_CONN">
        <emailId>emailId</emailId>
        <folder>Inbox</folder>
        <attachmentIndex>0</attachmentIndex>
        <responseVariable>email_getEmailAttachment_1</responseVariable>
        <overwriteBody>true</overwriteBody>
    </email.getEmailAttachment>
    ```

    Following properties will be set as attributes.

    * ATTACHMENT_TYPE: Content Type of the attachment.
    * ATTACHMENT_NAME: Name of the attachment.

    This operation will set the content of the attachment in the message context according to its content type or assign it to a new variable if the `overwriteBody` parameter is set to `false`. The content will be set in the variable context as a base64 encoded string.

??? note "send"
    The send operation sends an email to specified recipients with the specified content.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>from</td>
            <td>The 'From' address of the message sender.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>to</td>
            <td>The recipient addresses of 'To' (primary) type.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>personalName</td>
            <td>The personal name of the message sender. This is available from Email Connector version 1.1.2 onwards.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>cc</td>
            <td>The recipient addresses of 'CC' (carbon copy) type.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>bcc</td>
            <td>The recipient addresses of 'BCC' (blind carbon copy) type.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>replyTo</td>
            <td>The email addresses to which to reply to this email.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>The subject of the email.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>content</td>
            <td>Body of the message in any format.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>contentType</td>
            <td>Content Type of the body text.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>encoding</td>
            <td>The character encoding of the body.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>attachments</td>
            <td>The attachments that are sent along with the email body.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>contentTransferEncoding</td>
            <td>Encoding used to indicate the type of transformation that is used to represent the body in an acceptable manner for transport.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>inlineImages</td>
            <td>
            A JSONArray that enables the insertion of inline image details. This can be used to specify the image properties, such as the image URL, size, and alignment, among others. By including inline images in the JSONArray, developers can create more visually appealing and engaging content within their application. Note that this feature is available from Email connector version 1.1.1 onwards.
            <div class="admonition note">
            <p class="admonition-title">Note</p>
            There are 2 methods you can follow to add images, as listed below.<br>
            **1. Providing file path**
            ```json
            {
                "from": "abc@wso2.com",
                "to": "xyz@wso2.com",
                "subject": "Sample email subject",
                "content": "<H1>Image1</H1><img src=\"cid:image1\" alt=\"this is image of image1\"><br/><H1>Image2</H1><img src=\"cid:image2\" alt=\"this is image of image2\">",
                "inlineImages": [
                    {
                        "contentID": "image1",
                        "filePath": "/Users/user/Documents/images/image1.jpeg"
                    },
                    {
                        "contentID": "image2",
                        "filePath": "/Users/user/Documents/images/image2.jpeg"
                    }
                ],
                "contentType": "text/html"
            }   
            ``` 
            **2. Base64Content**
            ```json
            {
                "from": "abc@wso2com",
                "to": "xyz@wso2.com",
                "subject": "Sample email subject",
                "content": "<H1>Image1</H1><img src=\"cid:image1\" alt=\"this is image of a image1\"><br/><H1>Image2</H1><img src=\"cid:image2\" alt=\"this is a image2\">",
                "inlineImages": [
                    {
                        "contentID": "image1",
                        "fileName": "image1.jpeg",
                        "base64Content": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAY......"
                    },
                    {
                        "contentID": "image2",
                        "fileName": "image2.jpeg",
                        "base64Content": "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBbRXhp...."
                    }
                ],
                "contentType": "text/html"
            }
            ```
            </div>  
            </td>
            <td>Optional</td>
        </tr>
    </table>
    
    > NOTE: If there are any custom headers to be added to the email they can be set as Axis2 properties in the context with the prefix "EMAIL-HEADER:" as the property name similar to below.
    ```
    <property name="EMAIL-HEADER:myProperty" value="testValue"/>
    ```

    **Sample configuration**

    ```xml
    <email.send configKey="SMTP_CONN">
        <from>email1@wso2.com</from>
        <personalName></personalName>
        <to>email2@wso2.com</to>
        <cc></cc>
        <bcc></bcc>
        <replyTo></replyTo>
        <subject>WSO2 MI Email Connector Test</subject>
        <content>Sample Email</content>
        <contentType>text/html</contentType>
        <encoding>UTF-8</encoding>
        <attachments></attachments>
        <inlineImages>[]</inlineImages>
        <contentTransferEncoding>Base64</contentTransferEncoding>
        <responseVariable>email_send_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </email.send>
    ```

    **Sample response**
    The response received will be stored in the variable `email_send_1` as a JSON object. The following is a sample response.
    
    ```json
    {
        "success":true
    }
    ```
    > **Note:** The response will be set in the message context or to a new variable if the `overwriteBody` parameter is set to `false`.

??? note "delete"
    The delete operation deletes an email.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>emailId</td>
            <td>Email Id of the email to delete.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the mailbox folder from which to delete the emails. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <email.delete configKey="IMAPS_CONN">
        <folder>INBOX</folder>
        <emailId>sampleId</emailId>
        <responseVariable>email_delete_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </email.delete>
    ```

    **Sample response**
    The response received will be stored in the variable `email_delete_1` as a JSON object. The following is a sample response.
    
    ```json
    {
        "success":true
    }
    ```

??? note "markAsDeleted"
    The markAsDeleted operation marks an email as deleted.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>emailId</td>
            <td>Email Id of the email to mark as deleted.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the mailbox folder where the email is. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <email.markAsRead configKey="IMAPCONN">
        <folder>INBOX</folder>
        <emailId>sampleId</emailId>
        <responseVariable>email_markAsDelete_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </email.markAsRead>
    ```

    **Sample response**
    The response received will be stored in the variable `email_markAsDelete_1` as a JSON object. The following is a sample response.
    
    ```json
    {
        "success":true
    }
    ```


??? note "markAsRead"
    The markAsRead marks an email as read.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>emailId</td>
            <td>Email Id of the email to mark as read.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the mailbox folder where the email is. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <email.markAsRead configKey="IMAPCONN">
        <folder>INBOX</folder>
        <emailId>sampleId</emailId>
        <responseVariable>email_markAsRead_1</responseVariable>
        <overwriteBody>false</overwriteBody>
    </email.markAsRead>
    ```

    **Sample response**
    The response received will be stored in the variable `email_markAsRead_1` as a JSON object. The following is a sample response.
    
    ```json
    {
        "success":true
    }
    ```


??? note "expungeFolder"
    The expungeFolder operation permanently deletes the emails marked for deletion.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>folder</td>
            <td>Name of the mailbox folder where the email is. Default is `INBOX`.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <email.expungeFolder configKey="IMAPCONN">
        <folder>INBOX</folder>
    </email.expungeFolder>
    ```

**Note**: For more information on how this works in an actual scenario, see [Email Connector Example]({{base_path}}/reference/connectors/email-connector/email-connector-example/).
