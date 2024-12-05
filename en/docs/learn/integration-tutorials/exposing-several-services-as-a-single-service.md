# How to Expose Several Services as a Single Service

## What you'll build

When information from several services is required to construct a response to a client request, service chaining needs to be implemented. This means integrating several services based on some business logic and exposing them as a single, aggregated service.

In this tutorial, when a client sends a request for a medical appointment, the Micro Integrator performs several service calls to multiple back-end services to construct a response that includes all the necessary details. The **Call** mediator allows you to specify all service invocations one after the other within a single sequence.

You will also use the **PayloadFactory** mediator to take the response from one back-end service and transform it into the format accepted by another back-end service.

### Concepts and artifacts used

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties)
-   [HTTP Endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties)
-   [Property Mediator]({{base_path}}/reference/mediators/property-mediator)
-   [Call Mediator]({{base_path}}/reference/mediators/call-mediator)
-   [PayloadFactory Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator)

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

#### Create new Endpoints

Let's create three HTTP endpoints to represent all three back-end services: Hospital Service, Channeling Service, and Payment Service.

1. Navigate to the **MI Project Explorer** > **Endpoints**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png" alt="create new endpoint" width="30%"></a>

2. Hover over **Endpoints** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png" alt="Add endpoint" width="30%"></a>

3. Next, select **HTTP Endpoint** type from the **Create Endpoint Artifact** interface.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png" alt="Create HTTP Endpoint" width="60%"></a>

4. In the **HTTP Endpoint Form** that appears, specify the following values to create the new endpoint.

    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Endpoint Name </td>
            <td>
                <code>HospitalServicesEP</code>
            </td>
            <td>
                This is a single endpoint configured to forward requests to the relevant hospital by reading the hospital specified in the request payload.
            </td>
        </tr>
        <tr>
            <td>URI Template</td>
            <td>
                <code>http://localhost:9090/{uri.var.hospital}/categories/{uri.var.category}/reserve</code>
            </td>
            <td>
                The template for the request URL expected by the back-end service. The following two variables will be replaced by the corresponding values in the request message:
                <ul>
                  <li>{uri.var.hospital}</li>
                  <li>{uri.var.category}</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Method</td>
            <td>
                <code>POST</code>
            </td>
            <td>
                Endpoint HTTP REST Method.
            </td>
        </tr>
    </table>

5.  Click **Create**.
   
6.  Create another **HTTP Endpoint** for the Channeling back-end service and specify the details given below:
   
    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Endpoint Name</td>
            <td>`ChannelingFeeEP`</td>
            <td>The name of the endpoint.</td>
        </tr>
        <tr>
            <td>URI Template</td>
            <td><code>http://localhost:9090/{uri.var.hospital}/categories/appointments/{uri.var.appointment_id}/fee</code></td>
            <td>
                The template for the request URL expected by the back-end service. The following two variables will be replaced by the corresponding values in the request message:
                <ul>
                  <li>{uri.var.hospital}: This will be the hospital ID extracted from the original request payload.</li>
                  <li>{uri.var.appointment_id}: This will be the appointment ID extracted from the response payload that is received from the hospital service.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Method</td>
            <td>
                <code>GET</code>
            </td>
            <td>
                This endpoint artifact will be used to get information from the back-end service.
            </td>
        </tr>
    </table>

7.  Click **Create**.

8.  Create another **HTTP Endpoint** for the Settle Payment back-end service and specify the details given below:
   
    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Endpoint Name</td>
            <td>`SettlePaymentEP`</td>
            <td>The name of the endpoint.</td>
        </tr>
        <tr>
            <td>URI Template</td>
            <td><code>http://localhost:9090/healthcare/payments</code></td>
            <td>
                The template for the request URL expected by the back-end service.
            </td>
        </tr>
        <tr>
            <td>Method</td>
            <td>
                <code>POST </code>
            </td>
            <td>
                This endpoint artifact will be used to post information to the back-end service.
            </td>
        </tr>
    </table>

9.  Click **Create**.

You have now created the endpoints that are required for this tutorial.

#### Create a REST API

1. Go to **MI Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png" alt="create new api" width="30%"></a>

2. Hover over **APIs** and click the **+** icon that appears to open the **API Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-api.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-api.png" alt="add API" width="30%"></a>

3. Specify values for the required REST API properties:
    <table>
      <tr>
        <th>Property</th>
        <th>Value</th>
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
        <td><code>/healthcare </code></td>
        <td>
          Here you are anchoring the API in the <code>/healthcare </code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to /healthcare means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare<code>.
        </td>
      </tr>
    <table>                                                    
    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/synapse-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/synapse-api-artifact.png" alt="synapse API artifact" width="80%"></a>               

4. Click **Create**. This opens the **Service Designer** interface.

    You can now start configuring the API resource.

5. Click on the `GET` API resource under **Available resources** on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-icon.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-icon.png" alt="edit icon" width="80%"></a>

7. Specify values for the required resource properties:

    <table>
    <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>URI-Template</td>
        <td><code>/categories/{category}/reserve</code></td>
        <td>
            The request URL should match this template. The {category} variable will be replaced with the value sent in the request.
        </td>
    </tr>
    <tr>
        <td>Url Style</td>
        <td>`URI_TEMPLATE`</td>
        <td>
            You can now specify dynamic variables to extract values from the request URL.
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
8. Click **Update**.

#### Update the mediation flow

You can now start updating the API resource with the mediation flow.

1. To get started, click on the **+** icon to add the first mediator to the sequence.

2. Select **Property** mediator from the **Mediators** palette. This is used to extract the hospital name that is sent in the request payload. 
   
    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-property-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-property-mediator.png" alt="add property mediator" width="80%"></a>

3. With the **Property** mediator selected, access the **Properties** tab and give the following details:
  <table>
  <tr>
  <th>Property</th>
  <th>Value</th>
  <th>Description</th>
  </tr>
  <tr>
  <td>Property Name</td>
  <td><code>uri.var.hospital</code></td>
  <td>The name that will be used to refer to this property's values.</td>
  </tr>
  <tr>
  <td>Property Action</td>
  <td><code>set</code></td>
  <td>The property action.</td>
  </tr>
  <tr>
  <td>Property Data Type</td>
  <td><code>String</code></td>
  <td>The property data type.</td>
  </tr>
  <tr>
  <td>Property Scope</td>
  <td><code>default</code></td>
  <td>The scope of the property.</td>
  </tr>
  <tr>
  <td>Value (Expression)</td>
  <td><code>json-eval(&#36;.hospital_id)</code></td>
  <td>
  <ol>
  <li>
  Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.
  </li>
  <li>
  Enter <code>json-eval($.hospital_id)</code> as the expression value.
  </li>
  </ol>
  <b>Note</b>:
  This is the JSONPath expression that will extract the hospital from the request payload.
  </td>
  </tr>
  </table>

4. Click **Submit**.

5. Add a new **Property** mediator just after the previous property mediator. This will retrieve and store the card number that was sent to the request payload.

6. With the **Property** mediator selected, access the Properties tab and specify the following details:
  <table>
  <tr>
  <th>Property</th>
  <th>Value</th>
  <th>Description</th>
  </tr>
  <tr>
  <td>Property Name</td>
  <td><code>card_number</code></td>
  <td>The name of the property, which will be used to refer to this property.</td>
  </tr>
  <tr>
  <td>Property Action</td>
  <td><code>set</code></td>
  <td>The property action.</td>
  </tr>
  <tr>
  <td>Property Data Type</td>
  <td><code>String</code></td>
  <td>The property data type.</td>
  </tr>
  <tr>
  <td>Value (Expression)</td>
  <td><code>json-eval(&#36;.cardNo)</code></td>
  <td>
  <ol>
  <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
  <li>Enter <code>json-eval($.cardNo)</code> as the expression value.</li>
  </ol>
  <b>Note</b>:
  This is the JSONPath expression that will extract the card number from the request payload.
  </td>
  </tr>
  <tr>
  <td>Description</td>
  <td>Get Card Number</td>
  <td>The description of the property.</td>
  </tr>
  </table>

7. Add a **Call** mediator from the **Mediators** palette. In the sequence palette, specify the endpoint as `HospitalServicesEP`. Click **Submit**.

    !!! Info
        Using the **Call** mediator allows us to define other service invocations following this mediator.
  
    !!! Note
        The following response will be returned from GrandOakEP, ClemencyEP, or PineValleyEP:
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
        Let's use Property mediators to retrieve and store the values that you get from the response you receive from GrandOakEP, ClemencyEP, or PineValleyEP.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-call-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-call-mediator.png" alt="add call mediator" width="80%"></a>

8. Add another **Property** mediator after **Call** mediator to retrieve and store the value sent as `appointmentNumber`.

9. With the **Property** mediator selected, access the Properties tab and specify the following details:
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
  <td>Property Name</td>
  <td><code>uri.var.appointment_id</code></td>
  <td>This value is used when invoking <b>ChannelingFeeEP</b></td>
  </tr>
  <tr>
  <td>Property Action</td>
  <td><p>Select <strong>set</strong></p></td>
  <td>The action of the property</td>
  </tr>
  <tr>
  <td>Property Data Type</td>
  <td><code>String</code></td>
  <td>The property data type.</td>
  </tr>
  <tr>
  <td>Value (Expression)</td>
  <td><code>json-eval(&#36;.appointmentNumber)</code></td>
  <td>
  <ol>
  <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
  <li>Enter <code>json-eval($.appointmentNumber)</code> as the expression value.</li>
  </ol>
  <b>Note</b>:
  This is the JSONPath expression that will extract the appointment number from the request payload.
  </td>
  </tr>
  <tr>
  <td>Description</td>
  <td>Get Appointment Number</td>
  <td>The description of the property.</td>
  </tr>
  </tbody>
  </table>

10. Similarly, add two more **Property** mediators. They will retrieve and store the `doctor` details and `patient` details respectively from the response that is received from GrandOakEP, ClemencyEP, or PineValleyEP.

    - To store `doctor` details:

        <table>
        <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
        </tr>
        <tr>
        <td>Property Name</td>
        <td>
        <code>doctor_details</code>
        </td>
        <td>
        The property name that will be used to refer to this property.
        </td>
        </tr>
        <tr>
        <td>Property Action</td>
        <td>
        <strong>set</strong>
        </td>
        <td>
        The property action name.
        </td>
        </tr>
        <tr>
        <td>Property Data Type</td>
        <td><code>String</code></td>
        <td>The property data type.</td>
        </tr>
        <tr>
        <td>Value (Expression)</td>
        <td><code>json-eval(&#36;.doctor)</code></td>
        <td>
        <ol>
        <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
        <li>Enter <code>json-eval($.doctor)</code> as the expression value.</li>
        </ol>
        <b>Note</b>:
        This is the JSONPath expression that will extract the doctor details from the request payload.
        </td>
        </tr>
        <tr>
        <td>Description</td>
        <td>
        Get Doctor Details
        </td>
        <td>The description of the property.</td>
        </tr>
        </table>

    - To store `patient` details:

        <table>
        <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
        </tr>
        <tr>
        <td>Property Name</td>
        <td>
        Enter <code>patient_details</code>
        </td>
        <td>
        The property name that will be used to refer to this property.
        </td>
        </tr>
        <tr>
        <td>Property Action</td>
        <td>
        Select <strong>set</strong>
        </td>
        <td>
        The property action name.
        </td>
        </tr>
        <tr>
        <td>Property Data Type</td>
        <td><code>String</code></td>
        <td>The property data type.</td>
        </tr>
        <tr>
        <td>Value (Expression)</td>
        <td><code>json-eval(&#36;.patient)</code></td>
        <td>
        <ol>
        <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
        <li>Enter <code>json-eval($.patient)</code> as the expression value.</li>
        </ol>
        <b>Note</b>:
        This is the JSONPath expression that will extract the patient details from the request payload.
        </td>
        </tr>
        <tr>
        <td>Description</td>
        <td>
        Get Patient Details
        </td>
        <td>The description of the property.</td>
        </tr>
        </table>  

11. Add a **Call** mediator from the **Mediators** palette. In the sequence palette specify the endpoint as `ChannelingFeeEP`. Click **Submit**.

    !!! Note
        The following response that is received from ChannelingFeeEP:
        ```json
        {
            "patientName": " John Doe ",
            "doctorName": "thomas collins",
            "actualFee": "7000.0"
        }
        ```  

12. Add a **Property** mediator adjoining the **Call** mediator box to retrieve and store the value sent as `actualFee`. 

13. Access the **Property** tab of the mediator and specify the following details:
  <table>
  <tr>
  <th>Property</th>
  <th>Value</th>
  <th>Description</th>
  </tr>
  <tr>
  <td>Property Name</td>
  <td><code>actual_fee</code></td>
  <td>This value is used when invoking the SettlePaymentEP. The property name that will be used to refer to this property.</td>
  </tr>
  <tr>
  <td>Property Action</td>
  <td><code>set</code></td>
  <td>The property action name.</td>
  </tr>
  <tr>
  <td>Property Data Type</td>
  <td><code>String</code></td>
  <td>The property data type.</td>
  </tr>
  <tr>
  <td>Value (Expression)</td>
  <td>`json-eval($.actualFee)`</td>
  <td>
  <ol>
  <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
  <li>Enter `json-eval($.actualFee)` as the expression value.</li>
  </ol>
  </td>
  </tr>
  <tr>
  <td>Description</td>
  <td>Get Actual Fee</td>
  <td>The description of the property.</td>
  </tr>
  </table>

14.  Let's use the **PayloadFactory** mediator to construct the following message payload for the request sent to SettlePaymentEP.

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

15.  Add a **PayloadFactory** mediator next to the **Property** mediator to construct the above message payload.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-payload-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-payload-mediator.png" alt="add payload mediator" width="80%"></a>

16.  With the **PayloadFactory** mediator selected, access the properties tab of the mediator and specify the following details:
  <table>
  <tr>
  <th>Property</th>
  <th>Description</th>
  </tr>
  <tr>
  <td>Payload Format</td>
  <td>Select <code>Inline</code></td>
  </tr>
  <tr>
  <td>Media Type</td>
  <td>Select <code>json</code></td>
  </tr>
  <tr>
  <td>Payload</td>
  <td>
  ```json 
  {"appointmentNumber":$1, "doctor":$2, "patient":$3, "fee":$4, "confirmed":"false", "card_number":"$5"}
  ```
  This is the message payload to send with the request to SettlePaymentEP. In this payload, $1, $2, $3, $4, and $5 indicate variables.
  </td>
  </tr>
  </table>

17.  To add the arguments for the **PayloadFactory** mediator:
  1. Click the **Add Parameter** in the **Args** field to open the **PayloadFactoryArgument** dialog.
  2. Enter the following information in the **PayloadFactoryArgument** dialog box. This provides the argument that defines the actual value of the first variable (used in the format definition given in the previous step).
    <table>
    <tr>
    <th>Property</th>
    <th>Description</th>
    </tr>
    <tr>
    <td>Argument Value</td>
    <td>
    <div class="content-wrapper">
    <p>Follow the steps given below to specify the expression:</p>
    <ol>
    <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
    </li>
    <li>
    Enter <code>$ctx:uri.var.appointment_id</code> as the expression.
    Note that the `$ctx` method is similar to using the <code>get-property</code> method. This method checks in the message context.
    </li>
    </ol>
    </div>
    </td>
    </tr>
    <tr>
    <td>
    Evaluator
    </td>
    <td>
    Select <code>xml</code>.</br></br>
    This indicates that the expression is provided in XML.
    </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/payload-parameter.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/payload-parameter.png" alt="payload mediator parameters" width="30%"></a>

18.  Click **Save**.

19. Similarly, click **Add Parameter** and add more arguments to define the other variables that are used in the message payload format definition. Use the following as the **Value** for each of them:

    -   `$ctx:doctor_details`  
    -   `$ctx:patient_details`  
    -   `$ctx:actual_fee`  
    -   `$ctx:card_number` 
 
20. Click **Submit**.

21. Add a **Call** mediator from the **Mediators** palette.In the sequence palette specify the endpoint as `SettlePaymentEP`. Click **Submit**.

22. Add a **Respond** mediator to send the response to the client. 

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, navigate to the location where you saved the back-end service.
3. Execute the following command to start the service:

    ```bash
    java -jar Hospital-Service-JDK11-2.0.0.jar
    ```

#### Send the client request

Let's send a request to the API resource. You can use Postman or any other **HTTP Client**:

1. Open the Postman application. If you do not have the application, download it from here : [Postman](https://www.postman.com/downloads/)

2. Add the request information as given below and click the <b>Send</b> button.
    
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
          <code>http://<host>:<port>/categories/{category}/reserve</code>
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
                  "email": "johndoe@gmail.com",
                  "cardNo": "7844481124110331"
                  },
                  "doctor": "thomas collins",
                  "hospital_id": "grandoaks",
                  "hospital": "grand oak community hospital",
                  "appointment_date": "2025-04-02"
                }
              </code>
            </div></br>
            <ul>
              <li>
                This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and date of appointment.
              </li>
            </ul>
        </tr>
     </table>
     
If you want to send the client request from your terminal:

1. Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2. Create a JSON file named `request.json` with the following request payload.

    ```json
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
    ```
3. Open a terminal and navigate to the directory where you have saved the `request.json` file.

4. Execute the following command.

    ```bash
    curl -v -X POST --data @request.json  http://localhost:8290/healthcare/categories/surgery/reserve  --header "Content-Type:application/json"
    ```

#### Analyze the response

You will see the response received to your <b>HTTP Client</b>:

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

You have now explored how the Micro Integrator can perform service chaining using the **Call** mediator and transform message payloads from one format to another using the **PayloadFactory** mediator.
