# How to Route Requests Based on Message Content

## What you'll build

In this tutorial, we are creating the mediation artifacts that can route a message to the relevant backend depending on the content of the message payload.

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

5. Provide a location under the **Project Directory**.

     <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Once you click **Create**, the **Add Artifact** pane will be opened.

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

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/select-http.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/select-http.png" alt="select HTTP connection" width="80%"></a>

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

7. Click **Add**.

8. Similarly, create the HTTP connections for the other two hospital services using the Base URLs given below:

    | Connection Name | Base URL                           |
    |-----------------|------------------------------------|
    | ClemencyConn    | `http://localhost:9090/clemency`   |
    | PineValleyConn  | `http://localhost:9090/pinevalley` |

You have now created the three connections for the hospital back-end services that will be used to make appointment reservations.

!!! Tip
    You can also create a single connection where the differentiation of the hospital name can be handled using a variable in the relative path of an operation. See the tutorial on [Exposing Several Services as a Single Service]({{base_path}}/learn/integration-tutorials/exposing-several-services-as-a-single-service).

    Using three different connections is advantageous when the back-end services are very different from one another and/or when there is a requirement to configure error handling differently for each of them.

#### Create a REST API

1. In the **MI Project Explorer** click on **+ Add artifact**.
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
          Here you are anchoring the API in the <code>/healthcare</code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to <code>/healthcare</code> means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare</code>.
        </td>
      </tr>
    </table>                                                                   

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/synapse-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/synapse-api-artifact.png" alt="Synapse API artifact" width="70%"></a>

4. Click **Create**.

5. On the Service Designer, click on the three dots (**⋮**) and then **Edit** to access the **Properties** of the default API resource.

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

2. Click on the **+** icon to open the **Mediator Palette**. 

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/open-palette.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/open-palette.png" alt="open palette" width="60%"></a>

3. Select the **Switch** mediator under **Mediators**.

4. In the **Add Switch Mediator** pane that appears, specify the following values.

    <table>
         <tr>
             <th>Property</th>
             <th>Description</th>
         </tr>
         <tr>
             <td>Expression</td>
             <td>
                 <p>The <strong>Expression</strong> field is where you specify the <a href="{{base_path}}/reference/synapse-properties/expressions">Synapse expression</a> used to extract the hospital name from the request payload.</p>
                 <p>Follow the steps given below to specify the expression:</p>
                 <ol>
                     <li>Click the <b>EX</b> button at the end of the <b>Value</b> field.</li>
                     <li>Enter <code>payload.hospital</code>.</li>
                 </ol>
             </td>
         </tr>
         <tr>
             <td>Cases</td>
             <td>
                <p>Use the <b>+ Add New Case</b> button to add each of the following case branches by setting the following Regex patterns:</p>
                <ol>
                    <li><code>grand oak community hospital</code></li>
                    <li><code>clemency medical center</code></li>
                    <li><code>pine valley community hospital</code></li>
                </ol>
            </td>
         </tr>
     </table>

5. Click **Add** to insert the Switch mediator to the integration flow.

6. Add a **Log** mediator to each case branch by clicking on the **+** icon in the respective case branch and selecting the **Log** mediator from the **Mediator Palette**. In the pane that appears, specify the following values.

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
            <td><code>Routing to: ${payload.hospital}</code></td>
            <td><code>Routing to: ${payload.hospital}</code></td>
            <td><code>Routing to: ${payload.hospital}</code></td>
            <td><code>Invalid hospital: ${payload.hospital}</code></td>
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
        You have now configured the Switch mediator to log the message `Routing to: <Hospital Name>` whenever a request is sent to this API resource. The request will then be routed to the relevant hospital back-end service based on the hospital name provided in the request payload.

        The default case of the Switch mediator handles invalid hospital requests. It logs the message `Invalid hospital: <Hospital Name>` for requests with an invalid or unrecognized hospital name.

7. Add an HTTP **POST** operation by clicking the **+** icon after the **Log** mediator in each case branch, except for the `default` branch. In the pane that appears, specify the following values.

    !!! Tip
        You can search for `post` in the **Mediator Palette** to quickly find the HTTP POST operation.

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
                <td><code>/categories/\${params.pathParams.category}/reserve</code></td>
                <td><code>/categories/\${params.pathParams.category}/reserve</code></td>
                <td><code>/categories/\${params.pathParams.category}/reserve</code></td>
            </tr>
            <tr>
                <td>Response Variable Name</td>
                <td><code>hospital_res</code></td>
                <td><code>hospital_res</code></td>
                <td><code>hospital_res</code></td>
            </tr>
        </tbody>
    </table>

    !!! Note
        We will leave the rest of the configurations as defaults — that is, **Content Type** set to **JSON**, **Request Body** as `${payload}`, and **Overwrite Message Body** checked.

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/http_post_grandoak.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/http_post_grandoak.png" alt="HTTP POST operation" width="30%"></a>

8. Add a **Respond** mediator right after the **Switch** mediator to return the response from the healthcare service back to the client.

    You have successfully created all the artifacts required to route messages to a back-end service based on the content of the request payload. 

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view.png" alt="Resource view" width="80%"></a>

### Step 3: Build and run the artifacts

Now that you have developed an integration using the Micro Integrator for the Visual Studio Code plugin, it's time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/message-routing/build_and_run_btn.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/build_and_run_btn.png" alt="Build and Run" width="80%"></a>

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
        This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and data of appointment.
    </tr>
</table>

<a href="{{base_path}}/assets/img/learn/tutorials/message-routing/try_out.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/try_out.png" alt="Try Out" width="80%"></a>

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
                The URI-Template format that is used in this URL was defined when creating the API resource:
        <code>http://host:port/categories/{category}/reserve</code>
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
        </div>
    </tr>
</table>

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
    "fee": 7000
  },
  "patient": {
    "name": "John Doe",
    "dob": "1940-03-19",
    "ssn": "234-23-525",
    "address": "California",
    "phone": "8770586755",
    "email": "johndoe@gmail.com"
  },
  "fee": 7000,
  "confirmed": false
}
```

Now, check the **Output** tab in VS Code. You should see a message similar to the following: `INFO {LogMediator} - {api:HealthcareAPI POST /healthcare/categories/surgery/reserve} Routing to: grand oak community hospital`.

This message is printed by the **Log** mediator when the client request is routed to the appropriate backend using the **Switch** mediator.

You have successfully completed this tutorial and learned how requests received by the Micro Integrator can be routed to the relevant backend using the **Switch** mediator.
