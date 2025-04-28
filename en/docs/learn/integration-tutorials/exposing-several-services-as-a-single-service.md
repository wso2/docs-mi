# How to Expose Several Services as a Single Service

## What you'll build

When information from several services is required to construct a response to a client request, service chaining needs to be implemented. This means integrating several services based on some business logic and exposing them as a single, aggregated service.

In this tutorial, when a client sends a request for a medical appointment, the Micro Integrator performs several service calls to multiple back-end services to construct a response that includes all the necessary details. The <a target="_blank" href="{{base_path}}/reference/connectors/http-connector/http-connector-overview/">HTTP connector</a> will be used to invoke services sequentially within a single integration flow.

You will also use the <a target="_blank" href="{{base_path}}/reference/mediators/payloadfactory-mediator/">Payload mediator</a> to transform the response from one back-end service into the format required by another service.

<a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/what_you_will_build.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/what_you_will_build.png" alt="service orchestration" width="80%"></a>

### Concepts and artifacts used

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties)
-   [HTTP Connector]({{base_path}}/reference/connectors/http-connector/http-connector-overview)
-   [Variable Mediator]({{base_path}}/reference/mediators/variable-mediator)
-   [Payload Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator)

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `ExposeSeveralServicesTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create HTTP connections

Let's create an HTTP connection to represent all three back-end services: Hospital Service, Channeling Service, and Payment Service.

1. Navigate to **MI Project Explorer**.
2. Click on **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store Form**.

    <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="80%"></a>

5. Select **HTTP**.
6. In the **Add New Connection** form, specify the following values to create the new HTTP connection.

     <table>
         <thead>
           <tr>
              <th>Property</th>
              <th>Value</th>
              <th>Description</th>
           </tr>
         </thead>
         <tbody>
           <tr>
              <td>Connection Name</td>
              <td><code>CommonServiceConn</code></td>
              <td>The name of the connection.</td>
           </tr>
           <tr>
              <td>Base URL</td>
              <td>
                 <code>http://localhost:9090</code>
              </td>
              <td>The base URL used to send requests to the back-end service.</td>
           </tr>
         </tbody>
     </table>

7. Click **Add**.

You have now created the connection that is required for this tutorial.

#### Create a REST API

1. In the **MI Project Explorer** click on **+ Add artifact**.
2. Select **API** under **Create an Integration**.
3. Specify values for the required REST API properties:

    <table>
    <tr>
        <th>Property</th>
        <th style="width: 140px">Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Name</td>
        <td><code>HealthcareAPI</code></td>
        <td>
            The name of the REST API.
        </td>
    </tr>
    <tr>
        <td>Context</td>
        <td><code>/healthcare</code></td>
        <td>
            Here you are anchoring the API in the <code>/healthcare</code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to <code>/healthcare</code> means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare</code>.
        </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/create-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/create-api-artifact.png" alt="create API artifact" width="80%"></a>

4. Click **Create**. This opens the **Service Designer** interface.

    You can now start configuring the API resource.

5. On the Service Designer, click on the three dots (**⋮**) and then **Edit** to access the **Properties** of the default API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-icon-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-icon-api-resource.png" alt="Edit API resource" width="70%"></a>

6. Enter the following details:

    <table>
    <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Resource Path</td>
        <td><code>/categories/{category}/reserve</code></td>
        <td>
            The request URL should match this resource path. The <code>{category}</code> variable will be replaced with the value sent in the request.
        </td>
    </tr>
    <tr>
        <td>Methods</td>
        <td>
            `POST`
        </td>
        <td>
            This API resource will accept POST requests.
        </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/edit-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/edit-api-resource.png" alt="Edit API resource" width="30%"></a>

7. Click **Update**.

#### Update the mediation flow

You can now start updating the API resource with the mediation flow.

1. To get started, click on the **Start** node on the canvas to set an input payload for the integration flow.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions which you will explore in later steps of this tutorial.

2. Click **Add Request**, provide the following JSON payload, then click **Add**. Finally, click **Save** to complete the input payload setup.

    ```json
    {
        "patient":{
            "name":"John Doe",
            "dob":"1940-03-19",
            "ssn":"234-23-525",
            "address":"California",
            "phone":"8770586755",
            "email":"johndoe@gmail.com"
        },
        "doctor":"thomas collins",
        "hospital_id":"grandoaks",
        "hospital":"grand oak community hospital",
        "cardNo":"7844481124110331",
        "appointment_date":"2025-04-02"
    }
    ```

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_start_payload_service_chaining.gif"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_start_payload_service_chaining.gif" alt="Add start payload" width="80%"></a>

    We need to use the Hospital ID (`hospital_id`) and card number (`cardNo`) in multiple HTTP calls later in the integration flow. To avoid losing these values, we will store them using the <a target="_blank" href="{{base_path}}/reference/mediators/variable-mediator/">Variable mediator</a> so that they can be easily reused throughout the flow.

3. Click on the **+** icon on the canvas to open the **Mediator Palette**.

4. Under **Mediators**, select the **Variable** mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-variable-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-variable-mediator.png" alt="add variable mediator" width="80%"></a>

5. Provide `hospital_id` as the variable name. In the next, we will extract the Hospital ID from the incoming payload and assign it to this variable.

6. Click on the expression (<img src="{{base_path}}/assets/img/common/enable_expression_icon.png" alt="expression icon" class="inline-icon">) icon to enable expression mode for the **Value** field.

7. Once expressions are enabled, click on the expression editor (<img src="{{base_path}}/assets/img/common/expression_editor_icon.png" alt="expression editor" class="inline-icon">) icon to open the editor. Then, select **Payload** → **hospital_id** to extract the Hospital ID from the request payload.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/service_chaining_hospital_id_var.gif"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/service_chaining_hospital_id_var.gif" alt="Extract Hospital ID" width="50%"></a>

8. Click **Add** to insert the **Variable** mediator into the integration flow.

9. Next, add a new **Variable** mediator right after the previous one. This mediator will extract and store the card number from the incoming payload.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_second_var.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_second_var.png" alt="Add second variable" width="80%"></a>

10. Similar to the previous steps, you can use the expression editor to select **Payload** → **cardNo**, or simply copy and paste the following details.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>CardNumber</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>STRING</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the expression (<img src="{{base_path}}/assets/img/common/enable_expression_icon.png" alt="expression icon" class="inline-icon">) icon in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.cardNo</code> as the expression value.</li>
                    </ol>
                </div>
            </td>
        </tr>
    </table>

11. Click **Add** to insert the second **Variable** mediator into the integration flow.

12. Search for `post` in the **Mediator Palette** to add the **HTTP POST** operation after the **Variable** mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_http_post.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_http_post.png" alt="Add HTTP POST" width="80%"></a>

13. In the pane that appears, specify the following values.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection</td>
            <td>Select <code>CommonServiceConn</code>.</td>
        </tr>
        <tr>
            <td>Relative Path</td>
            <td><code>/\${vars.hospital_id}/categories/${params.pathParams.category}/reserve</code></td>
        </tr>
        <tr>
            <td>Response Variable Name</td>
            <td><code>HospitalServiceRes</code>.</td>
        </tr>
    </table>

    !!! Note
        We will leave the rest of the configurations as defaults: **Content Type** set to **JSON**, **Request Body** as `${payload}`, and **Overwrite Message Body** checked.

    !!! Info
        - The output variable(<code>HospitalServiceRes</code>) of the HTTP call contains the following data:
            - **Attributes** – Metadata such as the status code.
            - **Headers** – The response headers of the HTTP call.

        - The response body from the HTTP call will be assigned to the message payload, which you can access using the Synapse expression `${payload}`.

    !!! Info
        A response similar to the following will be returned from different hospital services such as GrandOaks, Clemency, or PineValley.
        ```json
        {
            "appointmentNumber": 1,
            "doctor": {
                "name": "thomas collins",
                "hospital": "grand oak community hospital",
                "category": "surgery",
                "availability": "9.00 a.m - 11.00 a.m",
                "fee": 7000.0
            },
            "patient": {
                "name": "John Doe",
                "dob": "1990-03-19",
                "ssn": "234-23-525",
                "address": "California",
                "phone": "8770586755",
                "email": "johndoe@gmail.com"
            },
            "fee": 7000.0,
            "confirmed": false
        }
        ```
    Let's use Variable mediators to extract and store the `Appointment Number`, `Doctor`, and `Patient` details from the received response.

14. Click on the **+** icon on the canvas to add another **Variable** mediator after the **HTTP POST** operation to extract and store the value received as `appointmentNumber`.

15. In the **Add Variable Mediator** pane, provide the following details.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>AppointmentId</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>STRING</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the expression (<img src="{{base_path}}/assets/img/common/enable_expression_icon.png" alt="expression icon" class="inline-icon">) icon in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.appointmentNumber</code> as the expression value.</li>
                    </ol>
                </div>
            </td>
        </tr>
    </table>

16. Similarly, add two more **Variable** mediators to extract and store the `doctor` and `patient` details from the received response.

    - To store `doctor` details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>DoctorDetails</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>JSON</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the expression (<img src="{{base_path}}/assets/img/common/enable_expression_icon.png" alt="expression icon" class="inline-icon">) icon in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.doctor</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the doctor's details from the request payload.
                </div>
            </td>
        </tr>
    </table>

    - To store `patient` details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>PatientDetails</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>JSON</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the expression (<img src="{{base_path}}/assets/img/common/enable_expression_icon.png" alt="expression icon" class="inline-icon">) icon in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.patient</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the patient details from the request payload.
                </div>
            </td>
        </tr>
    </table>

17. Click on the **+** icon after the **Variable** mediator and select the **HTTP GET** operation from the **Mediator Palette**.

    !!! Tip
        You can search for `get` in the **Mediator Palette** to quickly find the HTTP GET operation.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_http_post.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add_http_get.png" alt="Add HTTP GET" width="80%"></a>

18. In the pane that appears, specify the following values.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection</td>
            <td>Select <code>CommonServiceConn</code>.</td>
        </tr>
        <tr>
            <td>Relative Path</td>
            <td><code>/\${vars.hospital_id}/categories/appointments/\${vars.AppointmentId}/fee</code></td>
        </tr>
    </table>

    !!! Info
        A response similar to the following will be returned from the Channeling service.
        ```json
        {
            "patientName": " John Doe ",
            "doctorName": "thomas collins",
            "actualFee": "7000.0"
        }
        ```
    
    To invoke the payment service in the next steps, you first need to construct the following request payload. We will use the <a target="_blank" href="{{base_path}}/reference/mediators/payloadfactory-mediator/">Payload mediator</a> to create it.

    ```json
    {
        "appointmentNumber": 2,
        "doctor": {
            "name": "thomas collins",
            "hospital": "grand oak community hospital",
            "category": "surgery",
            "availability": "9.00 a.m - 11.00 a.m",
            "Fee": 7000.0
        },
        "patient": {
            "name": "John Doe",
            "dob": "1990-03-19",
            "ssn": "234-23-525",
            "address": "California",
            "phone": "8770586755",
            "email": "johndoe@gmail.com"
        },
        "fee": 7000.0,
        "Confirmed": false,
        "card_number": "1234567890"
    }
    ```

19. Click on the **+** icon after the **HTTP GET** operation and select the **Payload** mediator to construct the above request payload.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-payload-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-payload-mediator.png" alt="add payload mediator" width="80%"></a>

20. In the **Add Payload Mediator** pane that appears, enter the following template in the **Payload** box and ensure that the **Content Type** is set to **JSON**.

    ```json 
    {
        "appointmentNumber":${vars.AppointmentId},
        "doctor":${vars.DoctorDetails},
        "patient":${vars.PatientDetails},
        "fee":${payload.actualFee},
        "confirmed":"false",
        "card_number":"${vars.CardNumber}"
    }
    ```   

    !!! Note
        - Values inside <code>${...}</code> are inline expressions dynamically fetching data during the flow.
        - <code>vars</code> refers to values stored using Variable mediators, while <code>payload</code> refers to the current message body.
        - This constructed payload will be sent to the Payments service for payment processing.

    <table>
        <thead>
            <tr>
            <th>Field</th>
            <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td><strong>appointmentNumber</strong></td>
            <td>Retrieved from the variable <code>AppointmentId</code>, which stores the appointment ID extracted earlier.</td>
            </tr>
            <tr>
            <td><strong>doctor</strong></td>
            <td>Retrieved from the variable <code>DoctorDetails</code>, which contains the doctor's details.</td>
            </tr>
            <tr>
            <td><strong>patient</strong></td>
            <td>Retrieved from the variable <code>PatientDetails</code>, which contains the patient's details.</td>
            </tr>
            <tr>
            <td><strong>fee</strong></td>
            <td>Extracted from the <code>actualFee</code> field of the current message payload (the response payload of the HTTP GET call).</td>
            </tr>
            <tr>
            <td><strong>confirmed</strong></td>
            <td>Hardcoded to <code>false</code> to indicate that the appointment is not yet confirmed.</td>
            </tr>
            <tr>
            <td><strong>card_number</strong></td>
            <td>Retrieved from the variable <code>CardNumber</code>, containing the customer's card number.</td>
            </tr>
        </tbody>
    </table>

21. Click **Add** to insert the **Payload** mediator into the integration flow.

    !!! Tip
        When you use a <a target="_blank" href="{{base_path}}/reference/mediators/payloadfactory-mediator/">Payload mediator</a>, it replaces (overwrites) the current message body with the new payload you define. If you need to keep any previous payload data, make sure to store it in a variable before using the Payload mediator.

22. Click on the **+** icon after the **Payload** mediator and select the **HTTP POST** operation from the **Mediator Palette**.

23. In the **Add POST** pane, enter the following details and click **Submit** to add the HTTP POST operation.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection</td>
            <td>Select <code>CommonServiceConn</code>.</td>
        </tr>
        <tr>
            <td>Relative Path</td>
            <td><code>/healthcare/payments</code></td>
        </tr>
    </table>

    !!! Note
        We will leave the rest of the configurations as defaults: **Content Type** set to **JSON**, **Request Body** as `${payload}`, and **Overwrite Message Body** checked.

24. Click on the **+** icon after the **HTTP POST** operation and select the **Respond** mediator from the **Mediator Palette** to send the response back to the client.

### Step 3: Build and run the artifacts

Now that you have developed an integration using the Micro Integrator for the Visual Studio Code plugin, it's time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/build_and_run_btn.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/build_and_run_btn.png" alt="Build and Run" width="80%"></a>

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, and navigate to the location where you saved the back-end service.
3. Execute the following command to start the service:

    ```bash
    java -jar Hospital-Service-JDK11-2.0.0.jar
    ```

#### Send the client request

Now, let's test the integration service. For that, you can use the inbuilt try-it functionality in the MI for VS Code extension.

When you run the integration artifact as in [Step 3](#step-3-build-and-run-the-artifacts), the **Runtime Services** interface is opened up. You can see all the available services.

Select the `HealthcareAPI` you have developed and test the resource using the following category and payload.

<table>
    <tr>
        <th>Category</th>
        <td>
            <code>surgery</code> 
        </td>
    </tr>
    <tr>
        <th>Payload</th>
        <td>
        <div>
            <pre><code>
            {
                "patient":{
                    "name":"John Doe",
                    "dob":"1940-03-19",
                    "ssn":"234-23-525",
                    "address":"California",
                    "phone":"8770586755",
                    "email":"johndoe@gmail.com"
                },
                "doctor":"thomas collins",
                "hospital_id":"grandoaks",
                "hospital":"grand oak community hospital",
                "cardNo":"7844481124110331",
                "appointment_date":"2025-04-02"
            }
            </code></pre>
        </div></br>
        This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and date of appointment.
    </tr>
</table>

<a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/try_out.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/try_out.png" alt="Try Out" width="80%"></a>

Optionally, you can use [Postman](https://www.postman.com/downloads/) or [cURL](https://curl.haxx.se/) to send the request. You can refer to the following request information.

<table>
    <tr>
        <th>Method</th>
        <td>
            <code>POST</code> 
        </td>
    </tr>
    <tr>
        <th>Headers</th>
        <td>
            <code>Content-Type=application/json</code>
        </td>
    </tr>
    <tr>
        <th>URL</th>
        <td><code>http://localhost:8290/healthcare/categories/surgery/reserve</code></br></br>
            <ul>
            <li>
                The URI-Template format that is used in this URL was defined when creating the API resource:
        <code>http://host:port/healthcare/categories/{category}/reserve</code>
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Body</th>
        <td>
        <div>
            <code>
            {
                "patient": {
                "name": "John Doe",
                "dob": "1940-03-19",
                "ssn": "234-23-525",
                "address": "California",
                "phone": "8770586755",
                "email": "johndoe@gmail.com"
            },
                "doctor": "thomas collins",
                "hospital_id": "grandoaks",
                "hospital": "grand oak community hospital",
                "cardNo": "7844481124110331",
                "appointment_date": "2025-04-02"
            }
            </code>
        </div>
        </td>
    </tr>
</table>

#### Analyze the response

You will see the following response received to your <b>HTTP Client</b>:

```json
{
    "patient":"John Doe",
    "actualFee":7000.0,
    "discount":20,
    "discounted":5600.0,
    "paymentID":"480fead2-e592-4791-941a-690ad1363802",
    "status":"Settled"
}
```

You have now learned how the Micro Integrator can perform service chaining using the <a target="_blank" href="{{base_path}}/reference/connectors/http-connector/http-connector-overview/">HTTP connector</a> and transform message payloads between different formats using the <a target="_blank" href="{{base_path}}/reference/mediators/payloadfactory-mediator/">Payload mediator</a>.

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
