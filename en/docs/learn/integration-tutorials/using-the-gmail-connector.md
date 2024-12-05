# How to Send an Email from an Integration Service

## What you'll build

When you integrate the systems in your organization, it is also necessary to integrate with third-party systems and their capabilities to enhance your services. WSO2 Micro Integrator uses **Connectors** for the purpose of referring the APIs of third-party systems.

**In this tutorial**, when a client sends an appointment reservation request to the Micro Integrator, the client should receive an email confirming the appointment reservation details. To build this use case, you can add an Email connector to the mediation flow.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `EmailConnectorTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create an endpoint

An Endpoint artifact is required to expose the URL that connects to the back-end service.

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
            <td>Endpoint Name</td>
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
                The template for the request URL is expected by the back-end service. The following two variables will be replaced by the corresponding values in the request message:
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

#### Create an email connection

1. Navigate to the **MI Project Explorer** > **Connections**. Hover over **Connections** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/add-connection.png"><img src="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/add-connection.png" alt="Add connection" width="30%"></a>

2. Next, select the **Email** connector from the appeared connector menu. 

    <a href="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/select-email-connector.png"><img src="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/select-email-connector.png" alt="Select email connector" width="80%"></a>

3. In the **Add New Connection** form that appears, specify the following values to create the new endpoint.

    !!! Tip
        If you have enabled 2-factor authentication, an app password should be obtained as instructed [here](https://support.google.com/accounts/answer/185833?hl=en).

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection Name</td>
            <td>
                Enter `smtpsconnection`
            </td>
        </tr>
        <tr>
            <td>Connection Type</td>
            <td>
                Select `SMTPS` for SMTP Secured Connection.
            </td>
        </tr>
        <tr>
            <td>Host</td>
            <td>
                Enter `smtp.gmail.com`
            </td>
        </tr>
        <tr>
            <td>Port</td>
            <td>
                Enter `465`
            </td>
        </tr>
        <tr>
            <td>Username</td>
            <td>
                Enter your email address
            </td>
        </tr>
        <tr>
            <td>Password</td>
            <td>
                Enter your email password
            </td>
        </tr>
        <tr>
            <td>Require TLS</td>
            <td>
                Select `false`
            </td>
        </tr>
    </table>

#### Create the REST API

1. Go to **MI Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png" alt="create new api" width="30%"></a>

2. Hover over **APIs** and click the **+** icon that appears to open the **API Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-api.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-api.png" alt="add API" width="30%"></a>

3.  Specify values for the required REST API properties:

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
          Here you are anchoring the API in the <code>/healthcare </code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to <code>/healthcare </code> means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare<code>.
        </td>
      </tr>
    </table>                                                                   

4.  Click **Create**. This will open the **Service Designer** interface.

    You can now start configuring the API resource.

5. Click on the `GET` API resource under **Available resources** on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-icon.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-icon.png" alt="edit icon" width="80%"></a>

7.  Specify values for the required resource properties:

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>URI Template</td>
            <td>
                <code>/categories/{category}/reserve</code> </br> This defines the request URL format. In this case, the full request URL format is <code>http://host:port/categories/{category}/reserve</code> where <code>{category}</code> is a variable.
            </td>
        </tr>
        <tr>
          <td>URL Style</td>
          <td>
            <code>URI_TEMPLATE</code>
          </td>
        <tr>
            <td>Methods</td>
            <td>
                <code>POST</code> <br> This defines that the API resource only handles requests where the HTTP method is POST.
            </td>
        </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/edit-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/edit-api-resource.png" alt="edit API resource" width="30%"></a>

8. Click **Update**.

#### Update the mediation flow

You can now start updating the API resource with the mediation flow.

1. Navigate to the **MI Project Explorer** > **APIs** > **HealthcareAPI** > **/categories/{category}/reserve**.

    <a href="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/update-mediation-flow.png"><img src="{{base_path}}/assets/img/learn/tutorials/send-email-from-integration-service/update-mediation-flow.png" alt="edit API resource" width="30%"></a>

2. To add **Property mediator** click **+** icon in the design view and select **Property mediator** from the palette. This is used to extract the hospital name that is sent in the request payload. 

3.  With the **Property mediator** selected, access the **Property** tab and specify the details given below.
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
         <td>STRING</td>
         <td>The data type of the property.</td>
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
                  Click the <strong>Ex</strong> button in the <b>Value</b> field towards the end. This specifies the value type as an <i>expression</i>.
              </li>
              <li>
                  Enter <code>json-eval($.hospital_id)</code> as the expression value.
              </li>
          </ol>
              <b>Note</b>:
              This is the JSONPath expression that will extract the hospital from the request payload.
          </div>
        </td>
      </tr>
      <tr>
        <td>Description</td>
        <td>Get hospital name</td>
        <td></td>
      </tr>
    </table>

4. Click **Submit**.

5. Add another **Property Mediator** by clicking **+** after the previously added property mediator and selecting **Property Mediator** from the palette. This is used to extract the patient's email address. 

6. With the Property mediator selected, access the **Property** tab and specify the details given below.

    <table>
      <tr>
          <th>Property</th>
          <th>Description</th>
      </tr>
      <tr>
        <td>Property Name</td>
        <td>Enter <code>email_id</code>.</td>
      </tr>
      <tr>
        <td>Property Action</td>
        <td>Enter <code>set</code>.</td>
      </tr>
      <tr>
        <td>Property Data Type</td>
        <td>STRING</td>
      </tr>
      <tr>
        <td>Property Scope</td>
        <td>Enter <code>default</code></td>
      </tr>
      <tr>
        <td>Value</td>
        <td>
            <ol>
                <li>
                    Click the <strong>Ex</strong> button in the <b>Value</b> field towards the end. This specifies the value type as <i>expression</i>.
                </li>
                <li>
                    Enter <code>json-eval($.patient.email)</code> to overwrite the default expression.
                </li>
            </ol>
        </td>
      </tr>
      <tr>
          <td>Description</td>
          <td>Get Email ID</td>
      </tr>
    </table>

7.  Add a **Call Mediator** by clicking **+** after the added property mediators and selecting **Call Mediator** from the palette. Then select the **HospitalServicesEP** endpoint from the endpoint drop-down and click **Submit**.

    !!! Info
        Using the Call mediator allows us to define other service invocations following this mediator.

    !!! Note
        The following response will be returned from GrandOakEP, ClemencyEP, or PineValleyEP:
        ```json
        {"appointmentNumber":1,   "doctor":
            {"name":"thomas collins",
                     "hospital":"grand oak community hospital",
                     "category":"surgery","availability":"9.00 a.m - 11.00 a.m",
                     "fee":7000.0},
               "patient":
                   {"name":"John Doe",
                    "dob":"1990-03-19",
                    "ssn":"234-23-525",
                    "address":"California",
                    "phone":"8770586755",
                    "email":"johndoe@gmail.com"},
               "fee":7000.0,
               "confirmed":false}
        ```

8. Add another **Property mediator** just after the call mediator to retrieve and store the response sent from HospitalServiceEP. This will be used within the body of the email.

9. With the Property mediator selected, access the **Property** tab and specify the details given below.

    <table>
      <tr>
          <th>Property</th>
          <th>Description</th>
      </tr>
      <tr>
        <td>Property Name</td>
        <td>Enter <code>hospital_response</code>.</td>
      </tr>
      <tr>
        <td>Property Action</td>
        <td>Enter <code>set</code>.</td>
      </tr>
      <tr>
        <td>Property Data Type</td>
        <td>STRING</td>
      </tr>
      <tr>
        <td>Property Scope</td>
        <td>Enter <code>default</code></td>
      </tr>
      <tr>
        <td>Value</td>
        <td>
            <ol>
                <li>
                    Click the <strong>Ex</strong> button in the <b>Value</b> field towards the end. This specifies the value type as <i>expression</i>.
                </li>
                <li>
                    Enter <code>json-eval($)</code> to overwrite the default expression.
                </li>
            </ol>
        </td>
      </tr>
      <tr>
          <td>Description</td>
          <td>Get Hospital Response</td>
      </tr>
    </table>

10. Click **+** icon below the previously added property mediator and add the **Send** operation from the **Email Connector** palette.

11. With the **Send** operation selected, access the property tab, and select the created connection as **Connection** from the drop-down in the properties window.

12. Specify the following details in the property tab;

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>From</td>
            <td>
              Enter your email address as the value. This will be the account from which the email is sent.
            </td>
        </tr>
        <tr>
            <td>To</td>
            <td>
                <ol>
                    <li>
                        Click the <strong>Ex</strong> button in the <b>Value</b> field towards the end. This specifies the value type as <i>expression</i>.
                    </li>
                    <li>
                        Enter <code>&#36;ctx:email_id</code> as the value. This retrieves the patient's email address that was stored in the relevant Property mediator. 
                    </li>
                </ol>
            </td>
        </tr>
        <tr>
            <td>Subject</td>
            <td>
                Enter <code>Appointment Status</code> as the value. This is the subject line in the email that is sent out.
            </td>
        </tr>
        <tr>
            <td>Content</td>
            <td>
                <ol>
                    <li>
                        Click the <strong>Ex</strong> button in the <b>Value</b> field towards the end. This specifies the value type as <i>expression</i>.
                    </li>
                    <li>
                        Enter <code>&#36;ctx:hospital_response</code> as the value. This retrieves the payment response that was stored in the relevant Property mediator.
                    </li>
                </ol>
            </td>
        </tr>
    </table>

13.  Add a **Respond** mediator to end the sequence processing.

We have now finished creating all the required artifacts.

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

The artifacts will be deployed in the embedded Micro Integrator and the server will start.

- See the startup log in the **Console** tab.
- See the URLs of the deployed services and APIs in the **Runtime Services** tab.

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

Let's send a request to the API resource. You can use Postman or any other **HTTP Client**. Make sure you provide a valid email address so that you can test the email being sent to the patient.

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
          <code>http://<host>:<port>/categories/{category}/reserve</code>.
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
                This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and data of appointment.
              </li>
            </ul>
        </tr>
     </table>
     
     <br/><br/>
     <video src="{{base_path}}/assets/vids/surgery-reserve.webm" width="720" height="480" controls></video>
     <br/><br/>
     
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
      "email": "johndoe@gmail.com",
      "cardNo": "7844481124110331"
      },
      "doctor": "thomas collins",
      "hospital_id": "grandoaks",
      "hospital": "grand oak community hospital",
      "appointment_date": "2025-04-02"
    }
    ```

3.  Open a command line terminal and execute the following command from the location where the `request.json` file you created is saved:

    ```bash
    curl -v -X POST --data @request.json http://localhost:8290/healthcare/categories/surgery/reserve --header "Content-Type: application/json"
    ```
   
#### Analyze the response

An email will be sent to the provided patient email address with the following details:

```bash
Subject: Appointment Status
             
Message: 
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
            "dob": "1940-03-19",
            "ssn": "234-23-525",
            "address": "California",
            "phone": "8770586755",
            "email": "johndoe@gmail.com"
        },
        "fee": 7000.0,
        "confirmed": false
    }
```

You have now explored how to import the Email connector to the Micro Integrator and then use the connector operations to send emails.
