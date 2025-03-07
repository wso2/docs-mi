# How to Route Requests Based on Message Content

## What you'll build

In this tutorial, we are creating the mediation artifacts that can route a message to the relevant endpoint depending on the content of the message payload.

When the client sends the appointment reservation request to the Micro Integrator, the message payload of the request contains the name of the hospital where the appointment needs to be confirmed. The HTTP request method that is used for this is POST. Based on the hospital name sent in the request message, the Micro Integrator should route the appointment reservation to the relevant hospital's back-end service.

### Concepts and artifacts used

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties)
-   [HTTP Connector]({{base_path}}/reference/connectors/http-connector/http-connector-overview)
-   [Variable Mediator]({{base_path}}/reference/mediators/variable-mediator)

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `ContentBasedRouteTutorial` as the **Project Name**.

5. Provide a location under the **Select Project Directory**.

     <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Finish**.

You will now see the projects listed in the **Project Explorer**.

#### Create HTTP connections

In this tutorial, we have three hospital services hosted as the backend:

-   Grand Oak Community Hospital: `http://localhost:9090/grandoaks/`
-   Clemency Medical Center: `http://localhost:9090/clemency/`
-   Pine Valley Community Hospital: `http://localhost:9090/pinevalley/`

The request method is `POST` and the format of the request URL expected by the back-end services is as below.
`http://localhost:9090/grandoaks/categories/{category}/reserve`

Let's create three different HTTP connections for the above services.

1. Navigate to **MI Project Explorer**.

2. Click on **+ Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store Form**.

    <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="80%"></a>

5. Select **HTTP**.
6. You need to add dependencies to the project, if not added yet.
7. In the **Add New Connection** form, specify the following values to create the new HTTP connection.
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
              <td><code>GrandOakConn</code></td>
              <td>The name of the connection.</td>
           </tr>
           <tr>
              <td>Base URL</td>
              <td>
                 <code>http://localhost:9090/grandoaks</code>
              </td>
              <td>The base of the request URL for the back-end service.</td>
           </tr>
         </tbody>
     </table>

8. Click **Add**.

9. Similarly, create the HTTP connections for the other two hospital services using the Base URLs given below:

    | Connection Name | Base URL                           |
    |-----------------|------------------------------------|
    | ClemencyConn    | `http://localhost:9090/clemency`   |
    | PineValleyConn  | `http://localhost:9090/pinevalley` |

You have now created the three connections for the hospital back-end services that will be used to make appointment reservations.

!!! Tip
    You can also create a single connection where the differentiation of the hospital name can be handled using a variable in the relative path of an operation. See the tutorial on [Exposing Several Services as a Single Service]({{base_path}}/learn/integration-tutorials/exposing-several-services-as-a-single-service).

    Using three different connections is advantageous when the back-end services are very different from one another and/or when there is a requirement to configure error handling differently for each of them.

#### Create a REST API

1. Go to **Project Settings** > **Add Artifact**.
2. Select **API** under **Create an Integration**.
3. Enter the details given below to create a new REST API.

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
          Here you are anchoring the API in the <code>/healthcare</code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to /healthcare means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare</code>.
        </td>
      </tr>
    </table>                                                                   

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/synapse-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/synapse-api-artifact.png" alt="Synapse API artifact" width="70%"></a>

4. Click **Create**.

5. On the Service Designer, click on the default API resource to access the **Properties** tab to edit the default API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-icon-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-icon-api-resource.png" alt="Edit API resource" width="70%"></a>

6. Enter the following details:

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
            <code>POST</code> 
        </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/integrate/tutorials/using-templates/edit-api-resource.png"><img src="{{base_path}}/assets/img/integrate/tutorials/using-templates/edit-api-resource.png" alt="edit API resource" width="30%"></a>

7. Click **Update**.

#### Define the mediation flow 

You can now start configuring the API resource.

1. Navigate to **MI Project Explorer** > **APIs** > **HealthcareAPI** > **/categories/{category}/reserve** to open the **Resource View**.

2. Click on the **+** icon to open the **Palette**. 

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/open-palette.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/open-palette.png" alt="open palette" width="60%"></a>

3. Select **Variable** mediator under **Mediators**.

4. Specify the following values.

    !!! Info
        This is used to extract the hospital name that is sent in the request payload.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
      <tr>
         <td>Name</td>
         <td><code>Hospital</code></td>
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
               <li>Click the **EX** button next to the <b>Value</b> field. This specifies the value type as <i>expression</i>.</li>
               <li>Enter <code>payload.hospital</code> as the **Expression Value**.</li>
            </ol>
               <b>Note</b>:
               This is the synapse expression that will extract the hospital from the request payload.</br>
               Click **Save**.
            </div>
         </td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/variable.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/variable.png" alt="Variable properties" width="35%"></a>

5. Click **Submit**.

6. Add a **Switch** mediator by clicking the **+** sign after the **Variable** mediator, and selecting **Switch** mediator from the palette. In the form that appears, specify the following values.

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

9. Click **Add** to save the values for the Switch mediator.

10. Add a **Log** mediator to each case branch by clicking the **+** sign in each case branch, and selecting **Log** mediator from the palette. In the form that appears, specify the following values.

    <table>
        <tr>
            <th></th>
            <th>Case 1 (grand oak community hospital)</th>
            <th>Case 2 (clemency medical center)</th>
            <th>Case 3 (pine valley community hospital)</th>
            <th>Default</th>
        </tr>
        <tr>
            <td>Log Category</td>
            <td><code>INFO</code></td>
            <td><code>INFO</code></td>
            <td><code>INFO</code></td>
            <td><code>ERROR</code></td>
        </tr>
        <tr>
            <td>Message</td>
            <td><code>Routing to: ${vars.Hospital}</code></td>
            <td><code>Routing to: ${vars.Hospital}</code></td>
            <td><code>Routing to: ${vars.Hospital}</code></td>
            <td><code>Invalid hospital: ${vars.Hospital}</code></td>
        </tr>
        <tr>
            <td>Description</td>
            <td><code>GrandOak Log</code></td>
            <td><code>Clemency Log</code></td>
            <td><code>PineValley Log</code></td>
            <td><code>Fault Log</code></td>
        </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view-after-log.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view-after-log.png" alt="Resource view after adding log" width="80%"></a>   

    !!! Info
        You have now configured the Switch mediator to log the `Routing to: <Hospital Name>` message when a request is sent to this API resource. The request message will then be routed to the relevant hospital back-end service based on the hospital name that is sent in the request payload.
        
        The default case of the Switch mediator handles the invalid hospital requests that are sent to the request payload. This logs the message (`Invalid hospital: <Hospital Name>`) for requests that have an invalid hospital name.

11. Add an HTTP **POST** operation by clicking the **+** sign after the **Log** mediator in each case branch except for `default`. In the form that appears, specify the following values.

    <table>
        <thead>
            <tr>
                <th></th>
                <th>Case 1 (grand oak community hospital)</th>
                <th>Case 2 (clemency medical center)</th>
                <th>Case 3 (pine valley community hospital)</th>
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
                <td>Enter <code>/categories/\${params.pathParams.category}/reserve</code></td>
                <td>Enter <code>/categories/\${params.pathParams.category}/reserve</code></td>
                <td>Enter <code>/categories/\${params.pathParams.category}/reserve</code></td>
            </tr>
            <tr>
                <td>Headers</td>
                <td>Leave empty</td>
                <td>Leave empty</td>
                <td>Leave empty</td>
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
            <tr>
                <td>Response Variable Name</td>
                <td>Enter <code>hospital_res</code></td>
                <td>Enter <code>hospital_res</code></td>
                <td>Enter <code>hospital_res</code></td>
            </tr>
            <tr>
                <td>Overwrite Message Body</td>
                <td>Select</td>
                <td>Select</td>
                <td>Select</td>
            </tr>
        </tbody>
    </table>

19. Add a **Respond** mediator just after the **Switch** mediator to return the response from the health care service back to the client.

    You have successfully created all the artifacts that are required for routing messages to a back-end service depending on the content in the request payload. 

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view.png" alt="Resource view" width="80%"></a>

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

The artifacts will be deployed in the Micro Integrator server and the server will start.

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

Let's send a request to the API resource to make a reservation. You can use the Postman application as follows:

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
          <code>http://host:port/categories/{category}/reserve</code>
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
        "email": "johndoe@gmail.com"
        },
        "doctor": "thomas collins",
        "hospital_id": "grandoaks",
        "hospital": "grand oak community hospital",
        "appointment_date": "2025-04-02"
    }
    ```
3. Open a terminal and navigate to the directory where you have saved the `request.json` file.
4. Execute the following command.
    ```json
    curl -v -X POST --data @request.json http://localhost:8290/healthcare/categories/surgery/reserve --header "Content-Type:application/json"
    ```

#### Analyze the response

You will see the following response received to your <b>HTTP Client</b>:

```json
{"appointmentNumber":1,
    "doctor":
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
"confirmed":false,
"appointmentDate":"2025-04-02"}
```

Now check the **Console** tab and you will see the following message: `INFO - LogMediator message = Routing to grand oak community hospital`
    
This is the message printed by the Log mediator when the message from the client is routed to the relevant endpoint in the Switch mediator.

You have successfully completed this tutorial and have seen how the requests received by the Micro Integrator can be routed to the relevant endpoint using the Switch mediator.
