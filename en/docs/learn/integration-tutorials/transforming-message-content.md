# How to Transform Message Content

## What you'll build

Message transformation is necessary when the message format sent by the client differs from the format expected by the back-end service. The **Message Translator** architectural pattern in WSO2 Integrator: MI describes how to translate from one data format to another.

In this tutorial, you will send a request message to a back-end service where the format of the payload differs from what the back-end service expects. The <a target="_blank" href="{{base_path}}/reference/mediators/data-mapper-mediator/">Data Mapper mediator</a> is used to transform the request payload into the format expected by the back-end service.

Let’s assume this is the format of the request sent by the client:

```json
{
  "name": "John Doe",
  "dob": "1940-03-19",
  "ssn": "234-23-525",
  "address": "California",
  "phone": "8770586755",
  "email": "johndoe@gmail.com",
  "doctor": "thomas collins",
  "hospital_id": "grandoaks",
  "hospital": "grand oak community hospital",
  "cardNo": "7844481124110331",
  "appointment_date": "2017-04-02"
}
```

However, the format of the message compatible with the back-end service is as follows:

```json
{
  "patient": {
    "name": "John Doe",
    "dob": "1990-03-19",
    "ssn": "234-23-525",
    "address": "California",
    "phone": "8770586755",
    "email": "johndoe@gmail.com",
    "cardNo": "7844481124110331"
    },
  "doctor": "thomas collins",
  "hospital_id": "grandoaks",
  "hospital": "grand oak community hospital",
  "appointment_date": "2017-04-02"
}
```

The client message format must be transformed into the back-end service message format within the mediation flow before making the back-end service call.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `TransformMessageTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create a REST API

1. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the API Form.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_artifact_pane.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_artifact_pane.png" alt="create new project" width="80%"></a>

2. Enter the details given below to create a new REST API.

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

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/synapse-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/synapse-api-artifact.png" alt="synapse API artifact" width="80%"></a>      

4.  Click **Create**. This will open the **Service Designer** interface.

    You can now start configuring the API resource.

5. On the Service Designer, click on the three dots (**⋮**) and then **Edit** to access the **Properties** of the default API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_default_get.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_default_get.png" alt="Edit API resource" width="80%"></a>

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

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_api_resource_props.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_api_resource_props.png" alt="Edit API resource properties" width="30%"></a>

7. Click **Update**.


#### Create the mediation logic

Let's configure the API resource with the data transformation logic.

1. Open the **Resource View** of the API resource by clicking the `POST` resource under **Available resources** on **Service Designer**.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/resource_select.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/resource_select.png" alt="Select API resource" width="80%"></a>

2. Once you open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/first_mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/first_mediator.png" alt="First mediator" width="80%"></a>

3.  Under **Mediators**, select the **Data Mapper** mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-data-mapper.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-data-mapper.png" alt="add data mapper" width="80%"></a>

4. In the pane that appears, click **+ Add New**, enter `RequestMapping` as the name, and click **Create** in the **Create New Data Mapper** form.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper-new.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-data-mapper-new.png" alt="create new mapping" width="30%"></a>

5. Click **Add** to insert the Data Mapper into the integration flow. You will then be directed to the Data Mapping Editor.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/data-mapper-canvas.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/data-mapper-canvas.png" alt="data mapper canvas" width="80%"></a>

6. Click on the **Import input schema** to import the input schema. Since this scenario involves JSON to JSON mapping, you can import from either a JSON sample or a JSON schema. In this guide, we will be using the **Import from JSON** option.

7. Copy the following sample request message sent to the API resource, paste it into the editor, and click **Save**.

    ```json
    { 
        "name": "John Doe",
        "dob": "1990-03-19",
        "ssn": "234-23-525",
        "address": "California",
        "phone": "8770586755",
        "email": "johndoe@gmail.com",
        "doctor": "thomas collins",
        "hospital_id": "grandoaks",
        "hospital": "grand oak community hospital",
        "cardNo": "7844481124110331",
        "appointment_date": "2025-04-02"
    }
    ```

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_input_json.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_input_json.png" alt="Add input JSON" width="80%"></a>

8.  Next, to set the output JSON, click **Import Output Schema** and then click **Import from JSON**.  
Copy the following sample request message expected by the back-end service, paste it into the editor, and click **Save**.

    ```json
    {
        "patient": {
            "name": "John Doe",
            "dob": "1990-03-19",
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

9. Now, you can create the mappings by connecting the values in the **Input** box to the corresponding values in the **Output** box.

    !!! Tip
        The WSO2 Integrator: MI Data Mapper includes AI capabilities to automatically generate mappings. With a simple button click, your mappings can be completed in seconds. For more information, see [Data Mapping using AI]({{base_path}}/get-started/how-to-guides/ai-data-mapping/).

    The completed mapping will appear as follows:

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/mapping-data-input-output.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/mapping-data-input-output.png" alt="Mapping" width="80%"></a>

10. Click on **/categories/{category}/reserve** in the **MI Project Explorer** to open the **HealthcareAPI** resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/select_resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/select_resource.png" alt="Select resource" width="80%"></a>

    Now that we have the message formatted as expected by the back-end service, let's use the <a target="_blank" href="{{base_path}}/reference/connectors/http-connector/http-connector-overview/">HTTP connector</a> to send a POST request to the hospital services backend.

11. Click on the **+** icon after the **Data Mapper** mediator and search for `post` in the **Mediator Palette** to add the **HTTP POST** operation for invoking the hospital services backend.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_http_post.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_http_post.png" alt="Add post" width="80%"></a>

12. Click **+ Add new connection** to create a new connection.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/new_http_conn.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/new_http_conn.png" alt="add new connection" width="80%"></a>

13. Select `HTTP` and fill in the following details to create a connection to the Hospital service. Finally, click **Add** in the **Add New Connection** form to create the connection.

    | Property            | Value                   | Description                   |
    |---------------------|-------------------------|-------------------------------|
    | **Connection Name** | `HospitalConnection`    | The name of the connection. |
    | **Base URL**        | `http://localhost:9090` | The base URL for the back-end service.<br>In the next step, we will see how to construct the full URL using the **Relative Path**. |

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_new_http_conn.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_new_http_conn.png" alt="new connection form" width="80%"></a>

14. Provide `/${payload.hospital_id}/categories/${params.pathParams.category}/reserve` as the **Relative Path**, and click **Submit** to add the operation to the integration flow.

    !!! Note
        We will leave the rest of the configurations as defaults: **Content Type** set to **JSON**, **Request Body** as `${payload}`, and **Overwrite Message Body** checked.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/http_post_op.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/http_post_op.png" alt="HTTP operation" width="30%"></a>

15. Click on the **+** icon after the **HTTP POST** operation and select the **Respond** mediator from the **Mediator Palette** to send the response back to the client.
    
You have successfully created all the artifacts required for this use case.

### Step 3: Build and run the artifacts

Now that you have developed an integration using the WSO2 Integrator: MI for the Visual Studio Code plugin, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/build_and_run_btn.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/build_and_run_btn.png" alt="Build and Run" width="80%"></a>

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, navigate to the location where you have saved the back-end service.
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
                "name": "John Doe",
                "dob": "1990-03-19",
                "ssn": "234-23-525",
                "address": "California",
                "phone": "8770586755",
                "email": "johndoe@gmail.com",
                "doctor": "thomas collins",
                "hospital_id": "grandoaks",
                "hospital": "grand oak community hospital",
                "cardNo": "7844481124110331",
                "appointment_date": "2025-04-02"
            }
            </code></pre>
        </div></br>
        This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and date of appointment.
    </tr>
</table>

<a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/try_out.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/try_out.png" alt="Try Out" width="80%"></a>

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
                "name": "John Doe",
                "dob": "1990-03-19",
                "ssn": "234-23-525",
                "address": "California",
                "phone": "8770586755",
                "email": "johndoe@gmail.com",
                "doctor": "thomas collins",
                "hospital_id": "grandoaks",
                "hospital": "grand oak community hospital",
                "cardNo": "7844481124110331",
                "appointment_date": "2025-04-02"
            }
            </code>
        </div>
    </tr>
</table>

#### Analyze the response

You will see the following response received to your <b>HTTP Client</b>.

```json
{
    "appointmentNumber": 5,
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

You have now explored how the WSO2 Integrator: MI can receive a message in one format and transform it into the format expected by the back-end service using the <a target="_blank" href="{{base_path}}/reference/mediators/data-mapper-mediator/">Data Mapper mediator</a>.
