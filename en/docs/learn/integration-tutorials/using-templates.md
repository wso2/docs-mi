# How to Reuse Mediation Sequences

## What you'll build

In this sample scenario, you will use a **Sequence Template**
and reuse it in multiple places of the mediation flow.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `UseTemplateTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/create-new-project.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

#### Create a REST API

1. Go to **MI Project Overview** > **Add Artifact**.
2. Select **API** under **Create an Integration**.
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
        <td><code>/healthcare</code></td>
        <td>
          Here you are anchoring the API in the <code>/healthcare </code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to /healthcare means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare<code>.
        </td>
      </tr>
    </table>                                                                   

4.  Click **Create**. This will open the **Service Designer** interface.

    You can now start configuring the API resource.

5. Click on the `GET` API resource under **Available resources** on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/edit-icon.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/edit-icon.png" alt="edit icon" width="80%"></a>

4.  Click the new API Resource to access the **Properties** tab and enter the following details:

    <table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Resource Path</td>
        <td>
            <code>/categories/{category}/reserve</code>
        </td>
    </tr>
    <tr>
        <td>Methods</td>
        <td>
            <code>POST</code> <br> This defines that the API resource only handles requests where the HTTP method is POST.
        </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/edit-api-resource.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/edit-api-resource.png" alt="edit API resource" width="30%"></a>

8. Click **Update**.

#### Create HTTP connections

In this tutorial, we have three hospital services hosted as the backend:

-   Grand Oak Community Hospital: `http://localhost:9090/grandoaks/`
-   Clemency Medical Center: `http://localhost:9090/clemency/`
-   Pine Valley Community Hospital: `http://localhost:9090/pinevalley/`

The request method is `POST` and the format of the request URL expected by the back-end services is as below.
`http://localhost:9090/grandoaks/categories/{category}/reserve`

Let's create three different HTTP connections for the above services.

1. Navigate to the **Project Overview** page.

2. Click on **Add artifact**.

   <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="80%"></a>

3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store Form**.

   <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="80%"></a>

5. Select **Http**.
6. You need to add dependencies to the project, if not added yet.
7. In the **Add New Connection** form, specify the following values to create the new HTTP connection.

    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection Name</td>
            <td>
                <code>GrandOakConn</code>
            </td>
            <td>
                The name of the connection represents the Grand Oaks Hospital service.
            </td>
        </tr>
        <tr>
            <td>Base URL</td>
            <td>
                <code>http://localhost:9090/grandoaks</code>
            </td>
            <td>
                The base of the request URL for the back-end service.
            </td>
        </tr>
    </table>

4.  Click **Create**.

5.  Similarly, create the HTTP connections for the other two hospital services using the URI Templates given below:
    -   ClemencyConn: `http://localhost:9090/clemency`
    -   PineValleyConn: `http://localhost:9090/pinevalley`

#### Create a sequence template

1. Navigate to the **Project Overview** page.
2. Click on the **Add artifact**.
3. Click **+ View More** under **Create an Integration**.
4. Select **Template** under **Other Artifacts**.
2. Next, select the **Sequence Template** from the appeared template artifact menu. 

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-form.png" alt="select sequence template" width="80%"></a>

3. In the **Template Artifact** form that appears, specify the following values to create the new sequence template.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Template Name</td>
            <td><code>HospitalRoutingSeq</code></td>
        </tr>
        <tr>
            <td>Parameters</td>
            <td>
                <ol>
                    <li>Click on **+ Add Parameter**</li>
                    <li>In the form that appears, specify the following values to add a parameter</li>
                        <ul>
                            <li>**Parameter**: <code>sethospital</code></li>
                            <li>**Is Mandatory**: Keep it untick.</li>
                            <li>**Default Value**: Keep it empty.</li>
                        </ul>
                    <li>Click **Save**</li>
                </ol>
            </td>
        </tr>
    </table>

    <a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/filled-sequence-template.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/filled-sequence-template.png" alt="Filled sequence template" width="80%"></a>

4. Click **Create**. 

5. Navigate to **MI Project Explorer** > **Templates** > **HospitalRoutingSeq**.

6. Add a **Log** mediator by clicking on the **+** in the design view and selecting the **Log** mediator from the palette. This will print a message indicating to which hospital a requested message is routed.

7. In the form that appears specify the following values. 

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Log Category</td>
            <td>`INFO`</td>
        </tr>
        <tr>
            <td>Message</td>
            <td>Routing to `${params.functionParams.sethospital}`</td>
        </tr>
    </table>

8. Click **Add**.

#### Update the mediation flow

You can now start configuring the API resource.

1. Navigate to **MI Project Explorer** > **APIs** > **HealthcareAPI** > **/categories/{category}/reserve**.

2. Add a **Variable** mediator by clicking on the **+** sign in the design view and selecting the **Variable** mediator from the palette. This is used to extract the hospital name that is sent in the request payload. In the form that appears, specify the following values. 

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
      <tr>
         <td>Name</td>
         <td>Enter <code>Hospital</code>.</td>
      </tr>
      <tr>
         <td>Action</td>
         <td>Select <code>set</code>.</td>
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
                <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
               <li>Enter <code>payload.hospital</code> as the expression value.</li>
            </ol>
               <b>Note</b>:
               This is the synapse expression that will extract the hospital from the request payload.
            </div>
         </td>
      </tr>
    </table>

3.  Add a **Switch** mediator by clicking the **+** sign after the **Variable** mediator, and selecting **Switch** mediator from the palette. In the form that appears, specify the following values.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Expression</td>
            <td>
                <p>The <strong>Expression</strong> field is where we specify the synapse expression, which obtains the value of the Hospital that we stored in the Variable mediator.</p>
                <p>Follow the steps given below to specify the expression:</p>
                <ol>
                    <li>Click <b>Ex</b> button in the <b>Value</b> field towards the end</li>
                    <li>Enter <code>vars.Hospital</code></li>
                </ol>
            </td>
        </tr>
        <tr>
            <td>Cases</td>
            <td>
                <p>You can use <b>+ Add new case</b> button to add case branches</p>
                <ol>
                    <li>Case 1: Click on <b>+ Add new case</b> and specify <b>Case Regex</b> as <code>grand oak community hospital</code></li>
                    <li>Case 2: Click on <b>+ Add new case</b> and specify <b>Case Regex</b> as <code>clemency medical center</code></li>
                    <li>Case 3: Click on <b>+ Add new case</b> and specify <b>Case Regex</b> as <code>pine valley community hospital</code></li>
                </ol>
            </td>
        </tr>
    </table>

    <a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/add-switch-mediator.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/add-switch-mediator.png" alt="Add switch mediator" width="80%"></a>

4. Add a **Call Template** mediator to each case branch by clicking the **+** sign in each case branch, and selecting **Call Template** mediator from the palette. In the form that appears, specify the following values.

    <table>
        <tr>
            <th></th>
            <th>Case 1</th>
            <th>Case 2</th>
            <th>Case 3</th>
        </tr>
        <tr>
            <td>Target Template</td>
            <td>Select <code>HospitalRoutingSeq</code></td>
            <td>Select <code>HospitalRoutingSeq</code></td>
            <td>Select <code>HospitalRoutingSeq</code></td>
        </tr>
        <tr>
            <td>Call-Template Parameter</td>
            <td>
                Click on <b>+ Add Parameter</b> button, and specify the following values.
                <ul>
                    <li><b>Parameter Name</b>: <code>sethospital</code></li>
                    <li><b>Parameter Value</b>: <code>grandoaks</code></li>
                </ul>
            </td>
            <td>
                Click on <b>+ Add Parameter</b> button, and specify the following values.
                <ul>
                    <li><b>Parameter Name</b>: <code>sethospital</code></li>
                    <li><b>Parameter Value</b>: <code>clemency</code></li>
                </ul>
            </td>
            <td>
                Click on <b>+ Add Parameter</b> button, and specify the following values.
                <ul>
                    <li><b>Parameter Name</b>: <code>sethospital</code></li>
                    <li><b>Parameter Value</b>: <code>pinevalley</code></li>
                </ul>
            </td>
        </tr>
    </table>

5. Add an HTTP **POST** operation by clicking the **+** sign after the **Call Template** mediator in each case branch. In the form that appears, specify the following values.

    <table>
        <thead>
            <tr>
                <th></th>
                <th>Case 1</th>
                <th>Case 2</th>
                <th>Case 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Connection</td>
                <td><code>GrandOakConn</code></td>
                <td><code>ClemencyConn</code></td>
                <td><code>PineValleyConn</code></td>
            </tr>
            <tr>
                <td>Relative Path</td>
                <td>Enter <code>/categories/\${params.uriParams.category}/reserve</code></td>
                <td>Enter <code>/categories/\${params.uriParams.category}/reserve</code></td>
                <td>Enter <code>/categories/\${params.uriParams.category}/reserve</code></td>
            </tr>
            <tr>
                <td>Content Type</td>
                <td>Select <code>JSON</code></td>
                <td>Select <code>JSON</code></td>
                <td>Select <code>JSON</code></td>
            </tr>
            <tr>
                <td>Request Body</td>
                <td>Enter <code>\${payload}</code></td>
                <td>Enter <code>\${payload}</code></td>
                <td>Enter <code>\${payload}</code></td>
            </tr>
        </tbody>
    </table>


6. Add a **Respond** mediator by clicking the **+** sign after the **Switch** mediator. It will return the response from the health care service back to the client.

<a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/design-view.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/design-view.png" alt="Complete design view" width="80%"></a>

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

Let's send a simple request to invoke the service. You can use Postman or any other **HTTP Client**.

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
                        "ssn": "234-23-5253",
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

1.  Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2.  Create a JSON file named `request.json` with the following request payload.

    ```json
    {
        "patient": {
            "name": "John Doe",
            "dob": "1940-03-19",
            "ssn": "234-23-5253",
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

3.  Open a command line terminal and execute the following command from
    the location where the request.json file you created is saved:

    ```bash
    curl -X POST -H "Content-Type: application/json" --data @request.json http://localhost:8290/healthcare/categories/surgery/reserve
    ```

#### Analyze the response

You will see the following response received to your <b>HTTP Client</b>:

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
        "dob": "1940-03-19",
        "ssn": "234-23-5253",
        "address": "California",
        "phone": "8770586755",
        "email": "johndoe@gmail.com"
    },
    "fee": 7000.0,
    "confirmed": false
}
```

Now check the **Console** tab and you will see the following message: 

`INFO {LogMediator} - {api:HealthcareAPI} To: /healthcare/categories/surgery/reserve, MessageID: urn:uuid:cb0ccafb-8880-44cb-9cb8-23c068a893b4, correlation_id: cb0ccafb-8880-44cb-9cb8-23c068a893b4, Direction: request, message = Routing to grand oak community hospital`.

This is the message printed by the Log mediator when the message from the client is routed to the relevant endpoint in the switch mediator.
