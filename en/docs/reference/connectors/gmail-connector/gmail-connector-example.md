# Gmail Connector Example

The Gmail Connector allows you to access the [Gmail REST API](https://developers.google.com/gmail/api/v1/reference) from an integration sequence. 

## What you'll build

<img src="{{base_path}}/assets/img/integrate/connectors/gmailconnector.png" title="Using Gmail Connector" width="600" alt="Using Gmail Connector"/>

This example demonstrates a scenario where a customer feedback Gmail account of a company can be easily managed using the WSO2 Gmail Connector. This application contains a service that can be invoked through an HTTP GET request. Once the service is invoked, it returns the contents of unread emails in the Inbox under the label of Customers, while sending an automated response to the customer, thanking them for their feedback. The number of emails that can be handled in a single invocation is specified in the application.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow these steps to set up the Integration Project using the WSO2 Micro Integrator Visual Studio Code extension.

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **WSO2 MI** and create the integration project with the **Project Name** as follows:

<img src="{{base_path}}/assets/img/integrate/connectors/gmail/CreateProject.png" title="Creating a new Project" width="800" alt="Creating a new Project"/>

### Create the integration logic 

First, follow the [configure the Gmail API]({{base_path}}/reference/connectors/gmail-connector/configuring-gmail-api/) steps to obtain the `Client ID`, `Client Secret`, `Access Token`, and `Refresh Token`. 

#### Create the API

1. Click on the **API** button in create an integration project pane.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/CreateAPI1.png" title="Creating a new API" width="800" alt="Creating a new API"/>

2. Then, enter the API name as `SendMails` and click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/CreateAPI2.png" title="Creating a new API" width="600" alt="Creating a new API"/>

3. Add the Gmail Connector to the API by clicking on the **+** button in the **Design View** and search for `Gmail` in the **Mediator** section. Then, select the `Gmail` connector and click **Download**.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/AddGmailConnector.png" title="Adding Gmail Connector" width="800" alt="Adding Gmail Connector"/>


#### Create Connection

1. Go to the **Design View** and click on the **+** button next to the **Connections** in the created integration project and select **Gmail**.
    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/CreateConnection1.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

2. Enter the connection name as `GmailConnection` and provide the following details in the **Gmail Connection** configuration pane.

      - **Client ID**: Value of the Client Id you obtained when you registered your application with the Gmail API.
      - **Client Secret**: Value of the Client Secret you obtained when you registered your application with the Gmail API.
      - **Refresh Token**: Value of the Refresh Token, which generates a new Access Token when the previous one gets expired.

    Note: You can obtain these values by following the steps in the [Configure the Gmail API]({{base_path}}/reference/connectors/gmail-connector/configuring-gmail-api/) section.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/CreateConnection2.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

### Implement the API

1. Go to the **Source View** of the API by clicking on the **<>** icon in the top right corner of the **Design View**.
    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/OpenSourceView.png" title="Source view of the implemented resource" width="800" alt="Source view of the implemented resource"/>

2. Copy and paste the following code in the **Source View** of the API.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/OpenedSourceView.png" title="Implemented resource" width="800" alt="Implemented resource"/>

??? note "Source view of the implemented resource"
    ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/sendmails" name="sendmails" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="GET" uri-template="/">
                <inSequence>
                    <gmail.listAllMails configKey="GmailConnection">
                        <includeSpamTrash>false</includeSpamTrash>
                        <labelIds></labelIds>
                        <maxResults>10</maxResults>
                        <pageToken></pageToken>
                        <q>is:unread category:updates</q>
                        <responseVariable>gmail_listAllMails_1</responseVariable>
                        <overwriteBody>false</overwriteBody>
                    </gmail.listAllMails>
                    <foreach collection="${vars.gmail_listAllMails_1.payload.messages}" parallel-execution="true" update-original="true" continue-without-aggregation="false">
                        <sequence>
                            <gmail.readMail configKey="GmailConnection">
                                <id>{${payload.id}}</id>
                                <format></format>
                                <metadataHeaders></metadataHeaders>
                            </gmail.readMail>
                            <variable name="fromString" type="STRING" expression="${payload.payload.headers[?(@.name==&quot;From&quot;)].value}"/>
                            <variable name="fromEmail" type="STRING" expression="${subString(vars.fromString,integer(indexOf(vars.fromString,&quot;&lt;&quot;))+1,integer(indexOf(vars.fromString,&quot;&gt;&quot;)))}"/>
                            <gmail.sendMail configKey="GmailConnection">
                                <to>{${vars.fromEmail}}</to>
                                <subject>Thank You - Your Feedback Has Been Received!</subject>
                                <from>youremail@gmail.com</from>
                                <messageBody>Thank you for your feedback.
                                    We have received it and truly appreciate you taking the time to share your thoughts with us.
                                    Your input is valuable and will help us improve.
                                </messageBody>
                                <cc></cc>
                                <bcc></bcc>
                                <id>1</id>
                                <threadId></threadId>
                                <responseVariable>gmail_sendMail_1</responseVariable>
                                <overwriteBody>false</overwriteBody>
                            </gmail.sendMail>
                            <log category="INFO" logMessageID="false" logFullPayload="false">
                                <message>{&quot;Mail&quot;:&quot;${vars.fromEmail}&quot;,&quot;SendStatus&quot;:&quot;${vars.gmail_sendMail_1.payload}&quot;}</message>
                            </log>
                        </sequence>
                    </foreach>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
    ```

4. Click on the **Run** button in the **Design View** to run the API.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail/RunProject.png" title="Running the API" width="800" alt="Running the API"/>

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/gmailConnectorV4.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the connection and make other such changes before deploying and running this project.

## Deployment

Once you have [built your artifacts]({{base_path}}/develop/packaging-artifacts) into a composite application, you can
export it into a CAR file (.car file) using the WSO2 Micro Integrator Visual Studio Code extension:

1.  Open the project overview and click on **Export**.

     <img src="{{base_path}}/assets/img/integrate/connectors/gmail/ExportProject.png" width="800" alt="Export Project"/>
    
2.  Click on **Select Destination** to select a destination folder to export the CAR file.

## Test

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

```
  curl -H "Content-Type: application/json" --request GET http://localhost:8290/sendmails
```

**Expected response**:

The senders should receive an email with a subject of `Thank You - Your Feedback Has Been Received!`, and you should have a set of logs on MI Runtime with sent email details like follows:

```
  {"Mail":"from-email@from.com","SendStatus":"{"id":"19632786b897fc14","threadId":"19642386b897fc14","labelIds":["SENT"]}"}
```

## What's next

* To customize this example for your own scenario, see [Gmail Connector Reference Guide]({{base_path}}/reference/connectors/gmail-connector/gmail-connector-config/) documentation.
