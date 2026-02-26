# Connect to SaaS or B2B Systems

In the previous tutorial, you learned how to route and transform messages, deploy, and test integrations in WSO2 Integrator:  MI. In this tutorial, you’ll learn how to create a loan review email notification flow that sends an email based on the client's loan status.

## What you'll build

Let's consider a scenario where a client sends a loan request to the `Bank` API deployed in WSO2 Integrator: MI. Upon receiving the request, the API sends an email notification to the client indicating that the loan request has been received and is under review. This is done using a SaaS-based email service.

In this example, you will use <a target="_blank" href="https://developers.google.com/gmail/imap/imap-smtp">Gmail's SMTP service</a> as the email provider.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/what_you_will_build_saas.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/what_you_will_build_saas.png" alt="Create New Project" width="60%"></a>

## What you'll learn

- How to integrate and send emails using the Email connector.

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed.

    !!! Info
        See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

2. You must have completed the **Route and Transform messages** tutorial under **Build your first Integration** before proceeding. Start the [Route and Transform messages]({{base_path}}/get-started/build-first-integration/first-integration-route-and-transform/) tutorial if you haven’t completed it yet.

Now, it's time to design the email notification flow. Follow the steps below to create the email notification integration.

## Step 1 - Create a new API resource

To develop the above scenario, let's get started with creating a new API resource in the `Bank` API.

1. Click on the Service Designer (<img src="{{base_path}}/assets/img/get-started/build-first-integration/service_designer_icon.png" alt="inline expression editor" class="inline-icon">) icon of the `Bank` API in the **WSO2 Integrator: MI Project Explorer** to open the Service Designer.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/service_designer_icon_bank_api_3.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/service_designer_icon_bank_api_3.png" alt="Create New Project" width="80%"></a>

2. In the Service Designer, click the **+ Resource** button to add a new API resource.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_resource_btn_3.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_resource_btn_3.png" alt="Create New Project" width="80%"></a>

3. In the **Add API Resource** pane, set `/loan-review` as the **Resource Path** and select the `POST` method.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_api_resource_pane_loan_review_post.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_api_resource_pane_loan_review_post.png" alt="Create New Project" width="30%"></a>

4. Finally, click **Create** to add the new API resource.

## Step 2 - Design the integration

1. Open the **Resource View** of the newly created API resource by clicking the `POST /loan-review` resource under **Available resources** in the **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_loan_review_post_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_loan_review_post_resource.png" alt="Create New Project" width="80%"></a>

2. After opening the **Resource View**, click on the **Start** node on the canvas to set an input payload for the integration flow.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions, which you will explore in later steps of this tutorial.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/click_start_node_3.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/click_start_node_3.png" alt="Create New Project" width="80%"></a>

3. Click **Add Request**, provide the following JSON payload, then click **Add**. Finally, click **Save** to complete the input payload setup.

    ```json
    {
        "customerId": "C567",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "amount": 25000
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_start_payload_saas.gif"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_start_payload_saas.gif" alt="Create New Project" width="80%"></a>

4. Click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_new_mediator_loan_review_1.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_new_mediator_loan_review_1.png" alt="Create New Project" width="80%"></a>

5. Search for `email` in the **Mediator Palette**, then click the download (<img src="{{base_path}}/assets/img/get-started/build-first-integration/connector_download_icon.png" alt="inline expression editor" class="inline-icon">) icon to add the [Email connector]({{base_path}}/reference/connectors/email-connector/email-connector-overview/) to the project. In the confirmation pane, select **Yes** to add the required dependencies.

    !!! Tip "What is a connector?"
        - Connectors in WSO2 Integrator:  MI enable seamless integration with external systems, cloud platforms, and messaging services without the need for custom implementations. They provide a standardized way to send, receive, and process data from third-party applications like Salesforce, Kafka, and AWS services. To explore connectors in detail, see the [Connector documentation]({{base_path}}/reference/connectors/connectors-overview/).
        - In VS Code, you can view all available connectors by clicking **Add Module** under the **Mediators** tab in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/download_email_connector.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/download_email_connector.png" alt="Create New Project" width="80%"></a>

6. Once the connector is downloaded, select the `Send` operation from the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_email_send.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_email_send.png" alt="Create New Project" width="80%"></a>

7. Click **+ Add new connection** to create a new connection.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/email_add_new_connection_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/email_add_new_connection_btn.png" alt="Create New Project" width="80%"></a>

8. Select `SMTPS` and fill in the following details to create a connection to Gmail's SMTP service. Finally, click **Add** in the **Add New Connection** form to create the connection.

    !!! Tip
        If two-factor authentication is enabled, you need to obtain an app password by following the instructions <a target="_blank" href="https://support.google.com/accounts/answer/185833?hl=en">here</a>.

    | Property            | Value                   |
    |---------------------|-------------------------|
    | **Connection Name** | `GmailConnection`        |
    | **Host**        | `smtp.gmail.com` |
    | **Port**        | `465` |
    | **Username**        | Your email address |
    | **Password**        | Your email password or app password|

    !!! Note
        It is recommended to use secure vault to store credentials. For more information, refer to <a href="{{base_path}}/install-and-setup/setup/security/encrypting-plain-text/">Encrypting Secrets</a>.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/email_create_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/email_create_connection.png" alt="Create New Project" width="80%"></a>


9. After creating the connection, enter your email address in the **From** field and set `Loan Application Received` as the **Subject** in the **Add Send** form.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/email_set_subject.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/email_set_subject.png" alt="Create New Project" width="30%"></a>

    In the next step, you will extract the recipient's email address from the incoming payload and assign it to the **To** field using an expression.

10. Click on the expression (<img src="{{base_path}}/assets/img/get-started/build-first-integration/enable_expression_icon.png" alt="inline expression editor" class="inline-icon">) icon to enable expression mode for the **To** field.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/enable_expression_to.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/enable_expression_to.png" alt="Create New Project" width="80%"></a>

11. Once expressions are enabled, click on the expression editor (<img src="{{base_path}}/assets/img/get-started/build-first-integration/expression_editor_icon.png" alt="inline expression editor" class="inline-icon">) icon to open the editor.

12. Select **Payload** → **email** to extract the recipient's email address from the payload.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/email_set_to.gif">
        <img src="{{base_path}}/assets/img/get-started/build-first-integration/email_set_to.gif" width="50%" alt="Add inline expression">
    </a>

    In the next step, you will use a template with inline expressions to extract data from the incoming payload and construct the email body.

    !!! Tip
        You can use the following pre-filled template in the **Content** field to skip the inline expression insertion steps and continue from **Step 16**.

        ```text
        Dear ${payload.name},

        We have received your loan application for $ ${payload.amount}. Our team will review your application and contact you shortly.

        Thank you,
        O2 Bank
        ```

13. In the **Content** field, enter the following template.

    ```text
    Dear ,

    We have received your loan application for $ . Our team will review your application and contact you shortly.

    Thank you,
    O2 Bank
    ```

14. In the template, place your cursor in the appropriate location (next to `Dear `), click on the inline expression editor (<img src="{{base_path}}/assets/img/get-started/build-first-integration/inline_expression_icon.png" alt="inline expression editor" class="inline-icon">) icon, then select **Payload** → **name**, and click **Add** to insert the inline expression into the template.

15. Repeat the same steps to insert the loan **amount** after the `$` symbol in the template.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_inline_expressions_email_body.gif">
        <img src="{{base_path}}/assets/img/get-started/build-first-integration/add_inline_expressions_email_body.gif" width="50%" alt="Add inline expression">
    </a>

16. Ensure that **Overwrite Message Body** is checked, then click **Submit** to add the email operation to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/email_send_configs.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/email_send_configs.png" alt="Create New Project" width="30%"></a>

17. Click on the **+** icon located just after the **Send** operation to open the **Mediator Palette** to add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond to the client request.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_respond_loan_request_flow.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_respond_loan_request_flow.png" alt="Create New Project" width="80%"></a>

18. Select **Respond** mediator under **Mediators**, and click **Add** to insert it to the integration flow.

You have successfully updated the integration flow to send an email with the loan request status. For reference, you can review the configured API and Email connection.

??? "Bank API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-integration/email_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/email_api.png" alt="ai datamapping api" width="70%"></a>

    === "Source View"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/bankapi" name="BankAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="GET" uri-template="/">
                <inSequence>
                    <payloadFactory media-type="json" template-type="default">
                        <format>{
                            "greetings":"Welcome to O2 Bank !!"
                            }
                        </format>
                    </payloadFactory>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
            <resource methods="POST" uri-template="/deposit">
                <inSequence>
                    <http.post configKey="CurrencyConverter">
                        <relativePath>/currency/rate</relativePath>
                        <headers>[]</headers>
                        <requestBodyType>JSON</requestBodyType>
                        <requestBodyJson>{
                            &quot;fromCurrency&quot;: &quot; ${payload.currency} &quot;,
                            &quot;toCurrency&quot;: &quot;USD&quot;
                            }
                        </requestBodyJson>
                        <forceScAccepted>false</forceScAccepted>
                        <disableChunking>false</disableChunking>
                        <forceHttp10>false</forceHttp10>
                        <noKeepAlive>false</noKeepAlive>
                        <forcePostPutNobody>false</forcePostPutNobody>
                        <responseVariable>http_post_1</responseVariable>
                        <overwriteBody>false</overwriteBody>
                    </http.post>
                    <filter xpath="${vars.http_post_1.attributes.statusCode == 200}">
                        <then>
                            <payloadFactory media-type="json" template-type="default">
                                <format>{ "status": "successful", "amountDeposited": ${payload.amount * vars.http_post_1.payload.rate} }</format>
                            </payloadFactory>
                        </then>
                        <else>
                            <payloadFactory media-type="json" template-type="default">
                                <format>{
                                    "status": "unsuccessful",
                                    "error": "${vars.http_post_1.payload.message}"
                                    }
                                </format>
                            </payloadFactory>
                        </else>
                    </filter>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
            <resource methods="POST" uri-template="/loan-review">
                <inSequence>
                    <email.send configKey="GmailConnection">
                        <from>ENTER_YOUR_EMAIL_HERE</from>
                        <personalName></personalName>
                        <to>{${payload.email}}</to>
                        <cc></cc>
                        <bcc></bcc>
                        <replyTo></replyTo>
                        <subject>Loan Application Received</subject>
                        <content>Dear ${payload.name},
                                        We have received your loan application for $ ${payload.amount}. Our team will review your application and contact you shortly.
                                        Thank you,
                                        O2 Bank</content>
                        <contentType>text/html</contentType>
                        <encoding>UTF-8</encoding>
                        <attachments></attachments>
                        <inlineImages>[]</inlineImages>
                        <contentTransferEncoding>Base64</contentTransferEncoding>
                        <responseVariable>email_send_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </email.send>
                    <respond />
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ```

??? "Email Connection"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-integration/gmail_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/gmail_connection.png" alt="http connection config" width="40%"></a>
        
    === "Source View"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="GmailConnection" xmlns="http://ws.apache.org/ns/synapse">
            <email.init>
                <connectionType>SMTPS</connectionType>
                <host>smtp.gmail.com</host>
                <port>465</port>
                <username>REPLACE</username>
                <password>REPLACE</password>
                <name>GmailConnection</name>
            </email.init>
        </localEntry>
        ```

## Step 3 - Run the integration

Now that you have updated the integration, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/build_and_run_btn_email.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/build_and_run_btn_email.png" alt="Create New Project" width="80%"></a>

## Step 4 - Test the integration service

1. Once the **Runtime Services** interface is open, select the `BankAPI`, and click the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_bank_api_email.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_bank_api_email.png" alt="Create New Project" width="80%"></a>

2. Select the `/loan-review` resource and click **Try it Out** to test the API.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_email_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_email_resource.png" alt="Create New Project" width="80%"></a>

3. Provide a JSON payload and click the **Execute** button to invoke the API. You may use the following sample payload to test the API. Make sure to update the `name` and `email` fields with the actual recipient's information.

    ```json
    {
        "customerId": "C567",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "amount": 45000
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/swagger_execute_email.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/swagger_execute_email.png" alt="Create New Project" width="80%"></a>

4. Check the response received from the server, and verify that the loan request status email has been successfully delivered by checking the recipient’s inbox.

Congratulations!
You have now learned how to integrate with an email SaaS provider using connectors to send emails as part of your integration flow.

## What's next?  

You have now completed this tutorial series, where you learned how to build a complete integration flow step by step. Throughout this journey, you have explored how to create Integration APIs, route and transform messages, connect to external SaaS and B2B systems.

Now, you can explore advanced integration scenarios, applying what you’ve learned to real-world use cases and expanding your expertise in WSO2 Integrator: MI.

Try more [tutorials and examples]({{base_path}}/learn/learn-overview/).

{% raw %}
<style>
.language-bash {
    color: var(--md-feedback-button-color) !important;
}
.language-bash .hljs-string, .hljs-keyword {
    color: var(--md-feedback-button-color) !important;
}
.language-bash .hljs-variable {
    font-weight: 600;
    color: rgb(45, 116, 215) !important;
}
</style>
{% endraw %}
