# Route and transform messages

In the previous tutorial, you learned how to develop, deploy, and test your first integration in WSO2 MI. In this tutorial, you will learn how to call an HTTP backend service and dynamically build a payload.

## What you'll build

Let's consider a scenario where a client sends a deposit request to the `Bank` API deployed in WSO2 Integrator: MI. The API calls a currency converter service to convert the amount to USD, and then responds to the client with the converted deposit value and status.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/what_you_will_build_route.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/what_you_will_build_route.png" alt="Create New Project" width="60%"></a>

## What you'll learn

- How to create an API resource.
- How to use the HTTP connector.
- How to use expressions.
- How to use the Mediator TryOut.

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed.

    !!! Info
        See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

2. You must have completed the **Develop an Integration API** tutorial under **Build your first Integration** before proceeding. Start the [Develop an Integration API]({{base_path}}/get-started/build-first-integration/first-integration-api-service/)  tutorial if you haven’t completed it yet.

Follow the instructions below to modify the API to call an HTTP endpoint and dynamically build a payload.

## Step 1 - Create a new API resource

To develop the above scenario, let's get started with creating a new API resource in the `Bank` API.

1. Click on the Service Designer (<img src="{{base_path}}/assets/img/get-started/build-first-integration/service_designer_icon.png" alt="inline expression editor" class="inline-icon">) icon of the `Bank` API in the **WSO2 Integrator: MI Project Explorer** to open the Service Designer.

    !!! Note
        The **Service Designer** icon will appear when you hover over the API name in the Project Explorer.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/service_designer_icon_bank_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/service_designer_icon_bank_api.png" alt="Create New Project" width="80%"></a>

2. In the Service Designer, click the **+ Resource** button to add a new API resource.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_resource_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_resource_btn.png" alt="Create New Project" width="80%"></a>

3. In the **Add API Resource** pane, set `/deposit` as the **Resource Path** and select the `POST` method.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_api_resource_pane.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_api_resource_pane.png" alt="Create New Project" width="30%"></a>

4. Finally, click **Create** to add the new API resource.

## Step 2 - Design the integration

Now, it's time to design the bank deposit flow. Follow the steps below to create the integration.

1. Open the **Resource View** of the newly created API resource by clicking the `POST /deposit` resource under **Available resources** in the **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_deposit_post_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_deposit_post_resource.png" alt="Create New Project" width="80%"></a>

2. After opening the **Resource View**, click on the **Start** node on the canvas to set an input payload for the integration flow.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions and support the Mediator TryOut features, which you will explore in later steps of this tutorial.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/click_start_node.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/click_start_node.png" alt="Create New Project" width="80%"></a>

3. Click **Add Request**, provide the following details, then click **Add**. Finally, click **Save** to complete the input payload setup.

    | Name            | Request body                   |
    |-----------------|--------------------------------|
    | `sample1` | `{ "currency":"EUR", "amount":100 }` |

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_start_payload_resize.gif"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_start_payload_resize.gif" alt="Create New Project" width="80%"></a>

4. Click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_new_mediator_deposit.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_new_mediator_deposit.png" alt="Create New Project" width="80%"></a>

    To convert the amount from the given currency to USD, you need to call a currency converter service. You can use the following currency converter service as the backend.

    <table>
        <tr>
            <td>URL</td>
            <td>
                <code>https://dev-tools.wso2.com/gs/helpers/v1.0/currency/rate</code>
            </td>
        </tr>
        <tr>
            <td>HTTP Method</td>
            <td>
                <code>POST</code> 
            </td>
        </tr>
        <tr>
            <td>Request payload format</td>
            <td>
                <code>
                {
                    "fromCurrency" : "EUR",
                    "toCurrency" : "USD"
                }
                </code> 
            </td>
        </tr>
    </table>

5. Search for `post` in the **Mediator Palette** to add the HTTP POST operation for currency conversion.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/search_http_post.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/search_http_post.png" alt="Create New Project" width="80%"></a>

6. Click **+ Add new connection** to create a new connection.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_new_connection_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_new_connection_btn.png" alt="Create New Project" width="80%"></a>

7. Select `HTTPS` and fill in the following details to create a connection to currency converter service. Finally, click **Add** in the **Add New Connection** form to create the connection.

    | Property            | Value                   |
    |---------------------|-------------------------|
    | **Connection Name** | `CurrencyConverter`        |
    | **Base URL**        | `https://dev-tools.wso2.com/gs/helpers/v1.0` |

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_new_connection_form.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_new_connection_form.png" alt="create connection" width="80%"></a>

8. Provide `/currency/rate` as the **Relative Path**, and uncheck **Overwrite Message Body**. In the next step, we’ll create the payload required for the HTTP POST operation.

    !!! Note
        The **Overwrite Message Body** option determines whether the current payload should be replaced with the response from the HTTP call. Since you need to preserve the original payload to extract the `amount`, make sure to uncheck **Overwrite Message Body**. When this option is unchecked, the response will be stored in the specified output variable instead of overwriting the original payload.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_http_post.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_http_post.png" alt="geo http request" width="30%"></a>

9. In the **Request Body** box, enter the following sample JSON object. In the next step, you will use an inline expression to extract the currency from the incoming payload and insert it into this JSON object.

    !!! Tip "What is an expression?"
        Expressions in WSO2 Integrator:  MI allow you to dynamically access, evaluate, and manipulate message content during processing. To explore expressions in detail, see the [Expressions documentation]({{base_path}}/reference/synapse-properties/synapse-expressions/).

    ```json
    {
        "fromCurrency": " ",
        "toCurrency": "USD"
    }
    ```

10. In the JSON object, place your cursor in the corresponding location (next to `"fromCurrency": "`), click on the inline expression editor (<img src="{{base_path}}/assets/img/get-started/build-first-integration/inline_expression_icon.png" alt="inline expression editor" class="inline-icon">) icon, then select **Payload** → **currency**, and click **Add** to insert the inline expression into the JSON object.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_inline_expression_post.gif">
        <img src="{{base_path}}/assets/img/get-started/build-first-integration/add_inline_expression_post.gif" width="50%" alt="Add inline expression">
    </a>

11. Finally, click **Sumbit** to insert the **HTTP POST** operation into the integration flow.

    !!! Tip
        Since you're halfway through the flow, it's a good time to verify everything so far. You can use the **Mediator TryOut** feature to execute the flow up to a specific mediator and inspect its input and output.
        To explore this feature in detail, see the [Mediator TryOut documentation]({{base_path}}/develop/mediator-tryout/).

        1. Here, we’ll use this feature to check the output of the HTTP call. On the canvas, click the **HTTP POST** operation to open the **Edit** pane, then select the **Tryout** tab.<br>
            <a href="{{base_path}}/assets/img/get-started/build-first-integration/click_http_post.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/click_http_post.png" alt="create connection" width="80%"></a>

        2. Once the data is loaded, click **Run** to execute the flow through this mediator and review the output. Expand the **Variables** section and check the **http_post_1** → **payload** element to view the JSON response from the currency converter service.<br>
            <a href="{{base_path}}/assets/img/get-started/build-first-integration/tryout_http.gif"><img src="{{base_path}}/assets/img/get-started/build-first-integration/tryout_http.gif" alt="Create New Project" width="30%"></a>
    
    !!! Info
        - The output variable of the HTTP call contains the following data:
            - **Payload** – The response body of the HTTP call.
            - **Attributes** – Metadata such as the status code.
            - **Headers** – The response headers of the HTTP call.

        - The currency converter service returns a JSON object like `{"fromCurrency":"LKR", "toCurrency":"USD", "rate":0.0033}`. Since the response is stored in the variable `http_post_1`, you can access this JSON object using the expression `vars.http_post_1.payload`. You will work with this data in the upcoming steps.

12. Click the **+** icon placed just after the **HTTP POST** operation to open the **Mediator Palette** to add an [If Else Mediator]({{base_path}}/reference/mediators/filter-mediator) to check the HTTP status code and continue the integration accordingly.

13. Under **Mediators**, search for `if else` and select the **If Else** mediator.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_ifelse.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_ifelse.png" alt="Create New Project" width="80%"></a>

    You will use an expression to define the condition for the **If Else** mediator. This condition checks whether the HTTP status code is `200` and determines which flow to execute. If the status code is `200`, the integration will convert the request amount and send a deposit success message. Otherwise, it will send an error message to the client.

14. In the **Add If Else Mediator** pane that appears, click on the expression editor (<img src="{{base_path}}/assets/img/get-started/build-first-integration/expression_editor_icon.png" alt="inline expression editor" class="inline-icon">) icon to open the editor.

15. Select **Variables** → **http_post_1** → **attribures** → **statusCode** to extract the HTTP status code from the POST response.

16. Next, type a space to display the list of operators. Select the `==` (equal) operator and enter `200` to complete the condition.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_if_condition.gif"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_if_condition.gif" alt="Create New Project" width="50%"></a>

17. Finally, click **Add** to insert the **If Else** mediator into the integration flow.

18. Click on the **+** icon in the **Then** branch on the canvas to open the **Mediator Palette**. This branch executes when the HTTP status code is `200`.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_mediator_then_branch.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_mediator_then_branch.png" alt="Create New Project" width="80%"></a>

19. Under **Mediators**, select the **Payload** mediator.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_payload_then_branch.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_payload_then_branch.png" alt="Create New Project" width="80%"></a>

    In the next step, you will use a template with inline expressions to calculate the converted amount based on the incoming payload and the exchange rate returned from the HTTP POST call.

    !!! Tip
        You can use the following pre-filled template in the **Payload** box to skip the inline expression insertion steps and continue from **Step 23**.

        ```json
        {
            "status": "successful",
            "amountDeposited": ${payload.amount * vars.http_post_1.payload.rate}
        }
        ```

20. In the **Payload** box, enter the following sample JSON object. In the next step, we’ll use the inline expression editor to calculate the converted amount and insert it into this JSON structure.

    ```json
    {
        "status": "successful",
        "amountDeposited": 
    }
    ```

21. In the JSON object, place your cursor in the corresponding location (next to `"amountDeposited": `), click on the inline expression editor (<img src="{{base_path}}/assets/img/get-started/build-first-integration/inline_expression_icon.png" alt="inline expression editor" class="inline-icon">) icon, then select **Payload** → **amount**.

22. Next, append ` * vars.http_post_1.payload.rate` to the expression, and click **Add** to insert the inline expression into the JSON object.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_inline_expression.gif">
        <img src="{{base_path}}/assets/img/get-started/build-first-integration/add_inline_expression.gif" width="50%" alt="Add inline expression">
    </a>

23. Finally, click **Add** to insert the **Payload** mediator into the integration flow.

24. Click on the **+** icon in the **Else** branch on the canvas to open the **Mediator Palette**. This branch executes when the HTTP status code is **not** `200`.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_mediator_else_branch.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_mediator_else_branch.png" alt="Create New Project" width="80%"></a>

25. Select **Payload** mediator under **Mediators**.

26. In the **Payload** box, enter the following template to create a new payload for the error message. Then, click **Add** to insert the **Payload** mediator into the integration flow.

    !!! Info
        In case of an error, the currency converter service returns a JSON object containing an error message and an error code. This template uses the `message` field from the converter service response to generate the error payload.

    ```json
    {
        "status": "unsuccessful",
        "error": "${vars.http_post_1.payload.message}"
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/payload_transform_after_http_error.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/payload_transform_after_http_error.png" alt="Create New Project" width="30%"></a>

27. Click on the **+** icon placed just after the **If Else** mediator to open the **Mediator Palette** to add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_respond_deposit_flow.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_respond_deposit_flow.png" alt="Create New Project" width="80%"></a>

28. Select **Respond** mediator under **Mediators**, and click **Add** to insert it to the integration flow.

You may refer to the following API and HTTP connection for reference,

??? "Bank API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-integration/deposit_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/deposit_api.png" alt="ai datamapping api" width="70%"></a>

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
        </api>
        ```

??? "HTTP Connection"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-integration/currency_http_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/currency_http_connection.png" alt="http connection config" width="40%"></a>
        
    === "Source View"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="CurrencyConverter" xmlns="http://ws.apache.org/ns/synapse">
            <http.init>
                <connectionType>HTTPS</connectionType>
                <baseUrl>https://dev-tools.wso2.com/gs/helpers/v1.0</baseUrl>
                <authType>None</authType>
                <timeoutAction>Never</timeoutAction>
                <retryCount>0</retryCount>
                <retryDelay>0</retryDelay>
                <suspendInitialDuration>-1</suspendInitialDuration>
                <suspendProgressionFactor>1</suspendProgressionFactor>
                <name>CurrencyConverter</name>
            </http.init>
        </localEntry>
        ```

## Step 3 - Run the integration

Now that you have updated the integration, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/build_and_run_btn_deposit.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/build_and_run_btn_deposit.png" alt="Create New Project" width="80%"></a>

## Step 4 - Test the integration service

1. Once the **Runtime Services** interface is open, select the `BankAPI`, and click the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_bank_api_deposit.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_bank_api_deposit.png" alt="Create New Project" width="80%"></a>

2. Select the `/deposit` resource and click **Try it Out** to test the API.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_deposit_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/swagger_select_deposit_resource.png" alt="Create New Project" width="80%"></a>

3. Provide a JSON payload and click the **Execute** button to invoke the API. You may use the following sample payloads to test the API.

    1. Amount in US dollar (USD)

    ```json
    {
        "currency":"USD",
        "amount":456
    }
    ```

    2. Amount in Japanese yen (JPY)

    ```json
    {
        "currency":"JPY",
        "amount":897
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/swagger_execute_deposit.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/swagger_execute_deposit.png" alt="Create New Project" width="80%"></a>

4. Check the response received from the server and verify that the currency conversion has been applied correctly.

Congratulations!
You have now learned how to create an API resource, use the HTTP connector, work with expressions, and test mediators using Mediator TryOut.

## What's next?  

So far, you have learned how to route and transform the payload efficiently. Next, you'll explore how to connect to a SaaS service to send an email.

Click on the **Next** button below to continue to the next tutorial.

<div style="display: flex; justify-content: center; align-items: center; gap: 100px; margin-top: 20px;">
  <a href="{{base_path}}/get-started/build-first-integration/first-integration-api-service/" class="md-button">← Previous</a>
  <a href="{{base_path}}/get-started/build-first-integration/first-integration-connect-saas/" class="md-button md-button--primary">Next →</a>
</div>

{% raw %}
<style>
.language-bash {
    color: var(--md-feedback-button-color) !important;
}
.language-bash .hljs-string {
    color: var(--md-feedback-button-color) !important;
}
.language-bash .hljs-variable {
    font-weight: 600;
    color: rgb(45, 116, 215) !important;
}
</style>
{% endraw %}
