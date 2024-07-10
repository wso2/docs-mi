# Gmail Connector Example

The Gmail Connector allows you to access the [Gmail REST API](https://developers.google.com/gmail/api/v1/reference) from an integration sequence. 

## What you'll build

<img src="{{base_path}}/assets/img/integrate/connectors/gmailconnector.png" title="Using Gmail Connector" width="800" alt="Using Gmail Connector"/>

This example demonstrates a scenario where a customer feedback Gmail account of a company can be easily managed using the WSO2 Gmail Connector. This application contains a service that can be invoked through an HTTP GET request. Once the service is invoked, it returns the contents of unread emails in the Inbox under the label of Customers, while sending an automated response to the customer, thanking them for their feedback. The number of emails that can be handled in a single invocation is specified in the application.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Configure the connector in WSO2 MI VS Code Extension

Follow these steps to set up the Integration Project and the Connector Exporter Project. 

1. {!includes/reference/connectors/importing-connector-to-integration-studio.md!}

2. Follow the [configure the Gmail API]({{base_path}}/reference/connectors/gmail-connector/configuring-gmail-api/)  steps to obtain the Client ID, Client Secret, Access Token, and Refresh Token. 

3. Click on the `Add API` in the created Integration Project and create the API with the name `SendMails`.
   <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-api.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

4. Open the API in the diagram view and click on the `Add button` to add connectors or mediators.
   <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-mediator.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

5. To add the Gmail init function under the API, click on `Connectors`, select the `Gmail` connector, and choose the `init` function.
   <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-connector.png" title="Adding an init function" width="800" height="500" alt="Adding a Rest API"/>

6. Add the following parameters by clicking on `Add Parameter`

      - **Client ID**: Value of the Client Id you obtained when you registered your application with the Gmail API.
      - **Client Secret**: Value of the Client Secret you obtained when you registered your application with the Gmail API.
      - **Access Token**: Value of the Access Token to access the Gmail REST API.
      - **Refresh Token**: Value of the Refresh Token, which generates a new Access Token when the previous one gets expired.
      - **userID**: User mail ID.

7. Implement the following API as described above.
   
=== "Source Code"
    ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <api context="/sendmails" name="SendMails" xmlns="http://ws.apache.org/ns/synapse">
         <resource methods="GET">
           <inSequence>
               <gmail.init>
                   <userID></userID>
                   <accessToken></accessToken>
                   <apiUrl>https://www.googleapis.com/gmail</apiUrl>
                   <clientId></clientId>
                   <clientSecret></clientSecret>
                   <refreshToken></refreshToken>
               </gmail.init>
               <gmail.listAllMails>
                   <includeSpamTrash>false</includeSpamTrash>
                   <maxResults>20</maxResults>
                   <q>is:unread label:customers</q>
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
           <outSequence/>
           <faultSequence/>
         </resource>
      </api>
    ```
=== "Diagram View"
      <img src="{{base_path}}/assets/img/integrate/connectors/gmail-diagram-view.png" title="Adding an init function" width="800" alt="Adding a Rest API"/>

8. Click on the `Add Sequence` in the created integration project and create the sequence called `reply`.
   <img src="{{base_path}}/assets/img/integrate/connectors/gmail-add-sequence.png" title="Adding a Rest API" width="800" alt="Adding a Rest API"/>

9. Implement the following sequence as describe above.

=== "Source Code"
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

=== "Diagram View"
    <img src="{{base_path}}/assets/img/integrate/connectors/gamil-diagram-view1.png" title="Adding asequence" width="800" alt="Adding a Rest API"/>

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/gmailconnector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access token and make other such changes before deploying and running this project.

{!includes/reference/connectors/exporting-artifacts.md!}

## Deployment
Follow these steps to deploy the exported CApp in the integration runtime.<br>

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and execute the following command to start the server. Micro Integrator will be started and the composite application will be deployed.
=== "On MacOS/Linux/CentOS"
       ```bash
       sh micro-integrator.sh
       ```
=== "On Windows"
       ```bash
       micro-integrator.bat
       ```

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

## Testing
Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

```
  curl -H "Content-Type: application/json" --request GET http://localhost:8290/sendmails
```

The senders should receive an email with a subject of `Best of Europe — 6 Countries in 9 Days`, and a body of `Thank you for your valuable feedback.`

## What's Next

* To customize this example for your own scenario, see [Gmail Connector Configuration]({{base_path}}/reference/connectors/gmail-connector/gmail-connector-config/) documentation.