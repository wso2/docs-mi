---
search:
  boost: 2
---
# Email Connector Example

Email Connector can be used to perform operations using protocols SMTP, IMAP, and POP3. 

## What you'll build

This example explains how to use Email Connector to send an email and retrieve the same email from Gmail. The user sends a payload with the recipients and content of the email. Then, by invoking another API resource, the content of the inbox email will be retrieved. 

The example consists of two API resources `send` and `retrieve`. 

* `/send `: The user sends the request payload which includes the recipients, content, and attachments of the email. This request is sent to the integration runtime by invoking the EmailConnector API. It will send the email to the relevant recipients. 

    <p><img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-14.png" title="Send function" width="900" alt="Send function" /></p>

* `/retrieve `: The user sends the request payload, containing the filter to search the received email. This request is sent to the integration runtime where the EmailConnector API resides. Once the API is invoked, it returns the filtered emails.

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-15.png" title="Retrieve function" width="900" alt="Retrieve function"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **Integration Project**. 

## Create the integration logic for sending email

1. Under the **Create an integration** section, select **API** to create a new REST API.
   <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-api.png" title="Adding a Rest API" width="900" alt="Adding a Rest API"/>

    Provide the API name as `send` and the API context as `/send`.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-resource-1.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>
    Select the newly created `send` API and Click the `edit` icon to change the API method. 

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-resource-2.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>
    Then select the `POST` method and click `OK`.

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-resource-3.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>
    This will create a new API resource with the context `/send` and the method `POST`.

2. First, Let's create a sample payload request to send API. Click on the `Start` node and select the `Add Request` option. This will create a new example payload request.
    </br/>
   <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-request.png" title="Adding the sample API request." width="400" alt="Adding the API request."/>
    
    In this operation, we are going to receive the following inputs from the user. 

    - **from** - Sender of the email.
    - **to** - Recipient of the email. 
    - **subject** - Subject of the email.
    - **content** - Content to be included in the email.
    - **contentType** - Content Type of the email

    Therefore, provide the following JSON payload to the request.
    ```json
    {
        "from": "<your-email>@gmail.com",
        "to": "<your-email>@gmail.com",
        "subject": "Sample email",
        "content": "This is the body of the sample email",
        "contentType":"text/plain"
    }
    ```

3. Now we will add the `send` operation of the Email Connector to send the email.
    <br/>
    To do this, we need to add the Email Connector to the integration project. Now, Click on the `Add` icon and search for the email connector. Select the email connector and click on the `Download` button.
   <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-operation-1.png" title="Adding the send operation." width="900" alt="Adding the send operation."/>
   <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-operation-2.png" title="Adding the send operation." width="900" alt="Adding the send operation."/>

    Add a `send` operation to the integration logic by clicking on the `Add` icon and selecting the `send` operation from the list of operations.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-operation-3.png" title="Adding the send operation." width="900" alt="Adding the send operation."/>

4. Create a connection by clicking on the 'Add new connection' in the pop-up window as shown below. It will appear a new pop-up window.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-conn.png" title="Adding the connection." width="900" alt="Adding the connection."/>

    In the pop-up window, the following parameters must be provided. <br/>
    
    - **Connection Name** - A unique name to identify the connection by.
    - **Host** - Host name of the mail server.
    - **Port** - The port number of the mail server.
    - **Username** - Username used to connect with the mail server.
    - **Password** - Password to connect with the mail server.

    Additionally, for SMTP Secure Connection, the following parameter is also required.
    
    - Require TLS  

    The following values can be provided to connect to Gmail. <br/>
    
    - **Connection Name** - `GmailConnection`
    - **Host** - `smtp.gmail.com`
    - **Port** - `465` 
    - **Username** - &lt;your_email_address&gt;
    - **Password** - &lt;your_email_password&gt; 
    > **NOTE**: If you have enabled 2-factor authentication, an app password should be obtained as instructed [here](https://support.google.com/accounts/answer/185833?hl=en).
    - Require TLS - `false`

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-smtps-conn.png" title="Connection parameters." width="400" alt="Connection parameters."/>
    
5. After the connection is successfully created, select the created connection as `Connection` from the drop-down in appeared window after going into the `email` connector and select the `send` operation. <br/>
    Then we need to provide the necessary parameters to the `send` operation. Since we defined an example request payload, we can use the same parameters to send the email. <br/>
    To do this, click on the `Expression` icon in the From field and select the `Payload` option.

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-parameters-1.png" title="Adding the send parameters." width="400" alt="Adding the send parameters."/>

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-parameters-2.png" title="Adding the send parameters." width="900" alt="Adding the send parameters."/>

    This will open a new pop-up window where you can select the `payload.from` parameter from the request payload. <br/>

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-parameters-3.png" title="Adding the send parameters." width="900" alt="Adding the send parameters."/>

    Next, do the same for the `To`, `Subject`, `Content`, and `ContentType` fields. <br/>

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-send-parameters-4.png" title="Adding the send parameters." width="400" alt="Adding the send parameters."/>

    Tick the `Overwrite body` checkbox in the `Output` field to overwrite the body of the email with the content provided in the request payload. <br/>
 
6. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to respond to the response from sending the email as shown below.

   <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-respond.png" title="Adding the respond mediator." width="900" alt="Adding the respond mediator."/>

## Create the integration logic for retrieving email

1. Create the next API resource, which is `/retrieve` by following the same steps previously. This API resource will retrieve filters from the incoming HTTP post request from which to filter the email messages such as the subject, retrieve the emails, retrieve the email body, and respond.
   This will be used to retrieve the email we just sent. This will also be a `POST` request.
   <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-retrieve.png" title="Adding new resource." width="900" alt="Adding new resource."/>

2. Add the `list` operation of the Email Connector similar to step 3.

3. Next, we will create an IMAP connection to list emails similar to step 4. Following are the values to be provided when creating the connection.

    - **Connection Name** - `imapsconnection`
    - **Connection Type** - `IMAPS`
    - **Host** - `imap.gmail.com`
    - **Port** - `993`
    - **Username** - &lt;your_email_address&gt;
    - **Password** - &lt;your_email_password&gt;

4. In this operation we are going to receive the following inputs from the user. 
    - **subjectRegex** - Subject Regex to filter the email from. <br/>
    
    Therefore, provide the expressions below to the following `Subject Regex` property in the `list` operation window.<br/>
    
    - **Subject Regex** : `payload.subjectRegex` <br/>

    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-list-parameters.png" title="Adding the list parameters." width="400" alt="Adding the send parameters."/>
    
5. We will next iterate the response received and obtain the email content of each email using the `getEmailBody` operation. To do this, add the [Foreach Mediator]({{base_path}}/reference/mediators/foreach-mediator/) as shown below entering `payload.emails` as the Foreach Expression.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-foreach.png" title="Adding foreach mediator." width="900" alt="Adding foreach mediator."/>


6. Inside the [Foreach Mediator]({{base_path}}/reference/mediators/foreach-mediator/), add the `getEmailBody` operation as shown below providing the `payload.emails` expression as the Email Index.<br/>
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-get-email-body.png" title="Adding getEmailBody mediator." width="400" alt="Adding foreach mediator."/>
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-foreach.png" title="Overall component diagram" width="400" alt="Overall component diagram"/>

    > **NOTE**: Further, you can use the `getAttachment` operation to retrieve attachment content if there is any. Refer to the [Reference Documentation]({{base_path}}/reference/connectors/email-connector/email-connector-config/) to learn more.

16. Next, we will use a [Payload Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/), to add the email content to the same response we received from the `list` operation and configure the Payload mediator as shown below.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-payload.png" title="Adding payload factory mediator." width="400" alt="Adding payload facotry mediator."/>

    Entered payload:
    ```json
    {"To":"${payload.email.to}","From":"${payload.email.from}","Subject":"${payload.email.subject}","Content":"${payload.email.textContent}"}
    ```

8. Finally, add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) after the 'foreach' mediator to respond to the response of retrieved emails.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/email-conn-add-respond-2.png" title="Adding respond mediator 2." width="900" alt="Adding respond mediator 2."/>

## Export integration logic as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/emailconnectorv2.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/email-2.x/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

## Test

### Email send operation

1. Create a file called `data.json` with the following payload. We will send the email to ourselves so that we can retrieve it later.
    ```
    {
        "from": "<your-email>@gmail.com",
        "to": "<your-email>@gmail.com",
        "subject": "Sample email",
        "content": "This is the body of the sample email",
        "contentType":"text/plain"
    }
    ```
2. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/send
    ```
**Expected Response**: 
You should get a 'success' response as below and you will receive the email.
    ```
    {
    "success": true
    }
    ``` 

### Email list operation

1. Create a file called `data.json` with the following payload. 
    ```
    {
        "subjectRegex":"Sample email"
    }
    ```
2. Invoke the API as shown below using the curl command.
    ```
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/retrieve
    ```
**Expected Response**: 
You should get a response like below.
    ```
    {
        "emails": {
            "email": [
                {
                    "emailID": "<9402597.1.1720439415817@10.100.1.245>",
                    "to": "<your-email>@gmail.com",
                    "from": "<your-email>@gmail.com",
                    "subject": "Sample email",
                    "textContent": "This is the body of the sample email"
                }
            ]
        }
    }
    ``` 

## What's next

* To customize this example for your own scenario, see [Email Connector Configuration]({{base_path}}/reference/connectors/email-connector/email-connector-config/) documentation for all operation details of the connector.
