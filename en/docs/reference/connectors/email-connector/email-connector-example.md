# Email Connector Example

Email Connector can be used to perform operations using protocols SMTP, IMAP, and POP3. 

## What you'll build

This example explains how to use Email Connector to send an email and retrieve the same email from Gmail. The user sends a payload with the recipients and content of the email. Then, by invoking another API resource, the content of the sent email will be retrieved. 

The example consists of an API named EmailConnector API with two resources `send` and `retrieve`. 

* `/send `: The user sends the request payload which includes the recipients, content, and attachments of the email. This request is sent to the integration runtime by invoking the EmailConnector API. It will send the email to the relevant recipients. 

    <p><img src="{{base_path}}/assets/img/integrate/connectors/email-conn-14.png" title="Send function" width="800" alt="Send function" /></p>

* `/retrieve `: The user sends the request payload, containing the filter to search the received email. This request is sent to the integration runtime where the EmailConnector API resides. Once the API is invoked, it returns the filtered emails.

    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-15.png" title="Retrieve function" width="800" alt="Retrieve function"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **Integration Project**. 

## Create the integration logic

1. Select Micro Integrator and click on **+** in APIs to create a REST API. 
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

2. Provide the API name as `EmailConnector` and the API context as `/emailconnector`. Once we create the API there will be a default resource created and it can be deleted as given below. 
<img src="{{base_path}}/assets/img/integrate/connectors/email-conn-delete-default-resource.png" title="Deleting default resource" width="800" alt="Deleting default resource"/>

3. First, we will create the `/send` resource. This API resource will retrieve information from the incoming HTTP post request such as recipients and content. Create the email and send it to the mentioned recipients.<br/>
   Select the `EmailConnector` API and go to `Open Service Designer`. 
   Click on the `+ Resource` to add an API resource. We use a URL template called `/send` as we have two API resources inside a single API. The method will be `Post`. 
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-resource-1.png" title="Adding the API resource step 1." width="800" alt="Adding the API resource step 1."/>
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-resource-2.png" title="Adding the API resource step 2." width="800" alt="Adding the API resource step 2."/>

4. In this operation, we are going to receive the following inputs from the user. 
    - **from** - Sender of the email.
    - **to** - Recipient of the email. 
    - **subject** - Subject of the email.
    - **content** - Content to be included in the email.
    - **contentType** - Content Type of the email

5. Click on the yellow color highlighted **+** mark. In the pop-up window, go to the `email` connector in the `Connectors` tab and select the `send` operation. <br/>
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-send-operation-1.png" title="Adding the send operation." width="800" alt="Adding the send operation."/>
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-send-operation-2.png" title="Adding the send operation." width="800" alt="Adding the send operation."/>

6. Create a connection by clicking on the 'Add new connection' in the pop-up window as shown below. It will appear a new pop-up window.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-conn.png" title="Adding the connection." width="400" alt="Adding the connection."/>

    In the pop-up window, the following parameters must be provided. <br/>
    
    - **Connection Name** - A unique name to identify the connection by.
    - **Connection Type** - Type of the connection that specifies the protocol to be used.
    - **Host** - Host name of the mail server.
    - **Port** - The port number of the mail server.
    - **Username** - Username used to connect with the mail server.
    - **Password** - Password to connect with the mail server.

    Additionally, for SMTP Secure Connection, the following parameter is also required.
    
    - Require TLS  

    The following values can be provided to connect to Gmail. <br/>
    
    - **Connection Name** - `smtpsconnection`
    - **Connection Type** - `SMTPS`
    - **Host** - `smtp.gmail.com`
    - **Port** - `465`
    - **Username** - &lt;your_email_address&gt;
    - **Password** - &lt;your_email_password&gt; 
    > **NOTE**: If you have enabled 2-factor authentication, an app password should be obtained as instructed [here](https://support.google.com/accounts/answer/185833?hl=en).
    - Require TLS - `false`

    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-smtps-conn.png" title="Connection parameters." width="400" alt="Connection parameters."/>
    
7. After the connection is successfully created, select the created connection as `Connection` from the drop-down in appeared window after going into the `email` connector and select the `send` operation. <br/>
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-select-conn.png" title="Selecting the connection." width="400" alt="Selecting the connection."/>

8. Next, provide the expressions below to the following properties in the properties window to obtain respective values from the JSON request payload.
    - **to** - `json-eval($.to)`
    - **from** - `json-eval($.from)`
    - **subject** - `json-eval($.subject)`
    - **content** - `json-eval($.content)`
    - **contentType** - `json-eval($.contentType)`
 
9. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to respond to the response from sending the email as shown below.
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-respond.png" title="Adding the respond mediator." width="800" alt="Adding the respond mediator."/>

10. Create the next API resource, which is `/retrieve` by following the same steps previously. This API resource will retrieve filters from the incoming HTTP post request from which to filter the email messages such as the subject, retrieve the emails, retrieve the email body, and respond.
   This will be used to retrieve the email we just sent. This will also be a `POST` request.
   <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-retrieve.png" title="Adding new resource." width="800" alt="Adding new resource."/>

11. Add the `list` operation of the Email Connector similar to step 5.

12. Next, we will create an IMAP connection to list emails similar to step 6. Following are the values to be provided when creating the connection. Then select the created connection for the `list` operation similar to step 7.

    - **Connection Name** - `imapsconnection`
    - **Connection Type** - `IMAPS`
    - **Host** - `imap.gmail.com`
    - **Port** - `993`
    - **Username** - &lt;your_email_address&gt;
    - **Password** - &lt;your_email_password&gt;

13. In this operation we are going to receive the following inputs from the user. 
    - **subjectRegex** - Subject Regex to filter the email from. <br/>
    
    Therefore, provide the expressions below to the following properties in the `list` operation window to obtain respective values from the JSON request payload similar to step 8.<br/>
    
    - **Subject Regex** : `json-eval($.subjectRegex)`
    
14. We will next iterate the response received and obtain the email content of each email using the `getEmailBody` operation. To do this, add the [Foreach Mediator]({{base_path}}/reference/mediators/foreach-mediator/) as shown below entering `//emails/email` as the Foreach Expression.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-foreach-mediator.png" title="Adding foreach mediator." width="800" alt="Adding foreach mediator."/>

15. Inside the [Foreach Mediator]({{base_path}}/reference/mediators/foreach-mediator/), add the `getEmailBody` operation as shown below providing the `//email/index/text()` expression as the Email Index.<br/>
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-get-email-body.png" title="Adding getEmailBody operation." width="800" alt="Adding getEmailBody operation."/>

    > **NOTE**: Further, you can use the `getAttachment` operation to retrieve attachment content if there is any. Refer to the [Reference Documentation]({{base_path}}/reference/connectors/email-connector/email-connector-config/) to learn more.

16. Next, we will use a [Payload Factory Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/), to add the email content to the same response we received from the `list` operation and configure the Payload Factory mediator as shown below.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-payload-factory.png" title="Adding payload factory mediator." width="800" alt="Adding payload facotry mediator."/>
    
    Entered payload:
    ```xml
    <email>
        <emailID>$1</emailID>
        <to>$2</to>
        <from>$3</from>
        <subject>$4</subject>
        <textContent>$5</textContent>
    </email>
    ```
    
    You can add every parameter following similar steps given below. <br/>
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-payload-add-param.png" title="Adding payload parameter." width="300" alt="Adding payload parameter."/>

    Here, you may observe that we are obtaining the `TEXT_CONTENT` property which is set when getEmailBody is invoked to retrieve the email content. You can find the list of similar properties set in this operation [here]({{base_path}}/reference/connectors/email-connector/email-connector-config/).

17. Add a [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) and set the Property name as 'messageType' and the value as `application/json`. This is added so that the response will be in JSON.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-property.png" title="Adding property mediator." width="800" alt="Adding property mediator."/>

18. Finally, add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) after the 'foreach' mediator to respond to the response of retrieved emails.
    <img src="{{base_path}}/assets/img/integrate/connectors/email-conn-add-respond-2.png" title="Adding respond mediator 2." width="800" alt="Adding respond mediator 2."/>

19. You can find the complete API XML configuration below. You can go to the source view and copy-paste the following config.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/emailconnector" name="EmailConnector" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/send">
        <inSequence>
            <email.send configKey="smtpsconnection">
                <from>{json-eval($.from)}</from>
                <to>{json-eval($.to)}</to>
                <subject>{json-eval($.subject)}</subject>
                <inlineImages>[]</inlineImages>
                <content>{json-eval($.content)}</content>
                <contentType>{json-eval($.contentType)}</contentType>
                <encoding>UTF-8</encoding>
                <contentTransferEncoding>Base64
                </contentTransferEncoding>
            </email.send>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/retrieve">
        <inSequence>
            <email.list configKey="imapsconnection">
                <folder>Inbox</folder>
                <deleteAfterRetrieve>false</deleteAfterRetrieve>
                <offset>0</offset>
                <limit>10</limit>
                <subjectRegex>{json-eval($.subjectRegex)}</subjectRegex>
            </email.list>
            <foreach expression="//emails/email" id="">
                <sequence>
                    <email.getEmailBody>
                        <emailIndex>{//email/index/text()}</emailIndex>
                    </email.getEmailBody>
                    <payloadFactory media-type="xml" template-type="default">
                        <format>
                            <email>
                                <emailID>$1</emailID>
                                <to>$2</to>
                                <from>$3</from>
                                <subject>$4</subject>
                                <textContent>$5</textContent>
                            </email>
                        </format>
                        <args>
                            <arg expression="//email/emailID" evaluator="xml"/>
                            <arg expression="//email/to" evaluator="xml"/>
                            <arg expression="//email/from" evaluator="xml"/>
                            <arg expression="//email/subject" evaluator="xml"/>
                            <arg expression="$ctx:TEXT_CONTENT" evaluator="xml"/>
                        </args>
                    </payloadFactory>
                    <property name="messageType" scope="axis2" type="STRING" value="application/json"/>
                </sequence>
            </foreach>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

## Export integration logic as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/emailconnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
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
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/emailconnector/send
    ```
**Expected Response**: 
You should get a 'Success' response as below and you will receive the email.
    ```
    {
        "result": {
            "success": true
        }
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
    curl -H "Content-Type: application/json" --request POST --data @data.json http://localhost:8290/emailconnector/retrieve
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
