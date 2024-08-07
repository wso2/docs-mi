# Gmail Connector Example

The Gmail Connector allows you to access the [Gmail REST API](https://developers.google.com/gmail/api/v1/reference) from an integration sequence. 

## What you'll build

<img src="{{base_path}}/assets/img/integrate/connectors/gmailconnector.png" title="Using Gmail Connector" width="800" alt="Using Gmail Connector"/>

This example demonstrates a scenario where a customer feedback Gmail account of a company can be easily managed using the WSO2 Gmail Connector. This application contains a service that can be invoked through an HTTP GET request. Once the service is invoked, it returns the contents of unread emails in the Inbox under the label of Customers, while sending an automated response to the customer, thanking them for their feedback. The number of emails that can be handled in a single invocation is specified in the application.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow these steps to set up the Integration Project using the WSO2 Micro Integrator Visual Studio Code extension.

### Create a new project

1. Go to **WSO2 Micro Integrator** in the VS Code.

2. Click on **Create New Project** to create the new integration project.

3. provide the **Project Name** and select the **Project Directory**

    <img src="{{base_path}}/assets/img/integrate/connectors/new-vscode-project.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>
   
4. You have now created the new project with the following structure.

    <img src="{{base_path}}/assets/img/integrate/connectors/prject-structure.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

### Create the integration logic 

First, follow the [configure the Gmail API]({{base_path}}/reference/connectors/gmail-connector/configuring-gmail-api/) steps to obtain the `Client ID`, `Client Secret`, `Access Token`, and `Refresh Token`. 

#### Create the API

1. Click on the **+** button next to the **APIs** and create the API with the name `SendMails`.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-api.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

2. Open the API in the diagram view and click on the **+** button below to **START** to add connectors or mediators.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-mediator.png" title="Adding a Rest API" width="500" alt="Adding a Rest API"/>

3. To add the Gmail `init` function under the API, click on `Connectors`, select the `Gmail` connector, and choose the `init` function.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-connector.png" title="Adding an init function" width="500" alt="Adding a Rest API"/>

4. Add the following parameters by clicking on `Add Parameter`

      - **Client ID**: Value of the Client Id you obtained when you registered your application with the Gmail API.
      - **Client Secret**: Value of the Client Secret you obtained when you registered your application with the Gmail API.
      - **Access Token**: Value of the Access Token to access the Gmail REST API.
      - **Refresh Token**: Value of the Refresh Token, which generates a new Access Token when the previous one gets expired.
      - **userID**: User mail ID.

5. Implement the following API as described above.

??? note "Source view of the implemented resource"
    ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/sendmails" name="SendMails" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="GET" uri-template="/">
                <inSequence>
                    <gmail.init>
                        <userId></userId>
                        <apiUrl>https://www.googleapis.com/gmail</apiUrl>
                        <accessToken>ya29.a0AXoRlEpaCgYKAZQSARASFQHGX2MiAoW_lGjmM-nSB7Eiw0171</accessToken>
                        <clientId>599c3ivf2vcma4lplo8s.apps.googleusercontent.com</clientId>
                        <clientSecret>GOCSPX-vI49vSsxY</clientSecret>
                        <refreshToken>1//044biGOCq2Y2BWT1XOlOsCT_xA3kIGVBYbM</refreshToken>
                    </gmail.init>
                    <gmail.getAccessTokenFromRefreshToken/>
                    <gmail.deleteThreads>
                        <id>asd</id>
                        </gmail.deleteThreads>
                    <gmail.listAllMails>
                        <includeSpamTrash>false</includeSpamTrash>
                        <maxResults>20</maxResults>
                        <q>is:unread category:updates </q>
                    </gmail.listAllMails>
                    <iterate expression="json-eval($.messages)" id="iterator">
                        <target>
                        <sequence>
                            <sequence key="reply"/>
                        </sequence>
                        </target>
                    </iterate>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
    ```

#### Create the sequence

1. Click on **+** button next to the **Sequences** in the created integration project and create the sequence called `reply`.

    <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-sequence.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

2. Implement the following sequence as describe above.

??? note "Source view"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="reply" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property expression="json-eval($.id)" name="msgId" scope="default" type="STRING"/>
        <gmail.getAccessTokenFromRefreshToken/>
        <gmail.readMail>
           <id>{$ctx:id}</id>
        </gmail.readMail>
        <property expression="json-eval($.payload.headers[6].value)" name="response" scope="default" type="STRING"/>
        <log level="custom">
            <property expression="get-property('response')" name="response1"/>
        </log>
        <gmail.getAccessTokenFromRefreshToken/>
        <gmail.sendMail>
            <to>asd@gmail.com</to>
            <subject>Best of Europe - 6 Countries in 9 Days</subject>
            <from>isurumuy@gmail.com</from>
            <messageBody>Thank you for your valuable feedback.</messageBody>
        </gmail.sendMail>
    </sequence>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/gmailConnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access token and make other such changes before deploying and running this project.

## Deployment

Once you have [built your artifacts]({{base_path}}/develop/packaging-artifacts) into a composite application, you can
export it into a CAR file (.car file) using the WSO2 Micro Integrator Visual Studio Code extension:

1.  Open the project overview and click on **Export**.

     <img src="{{base_path}}/assets/img/integrate/connectors/export_artifacts.jpeg" width="300" alt="Download ZIP">
    
2.  Click on **Select Destination** to select a destination folder to export the CAR file.

## Test

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

```
  curl -H "Content-Type: application/json" --request GET http://localhost:8290/sendmails
```

**Expected response**:

The senders should receive an email with a subject of `Best of Europe — 6 Countries in 9 Days`, and a body of `Thank you for your valuable feedback.`

## What's next

* To customize this example for your own scenario, see [Gmail Connector Reference Guide]({{base_path}}/reference/connectors/gmail-connector/gmail-connector-config/) documentation.
