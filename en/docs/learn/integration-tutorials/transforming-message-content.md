# How to Transform Message Content

## What you'll build

Message transformation is necessary when the message format sent by the client differs from the format expected by the back-end service. The **Message Translator** architectural pattern in WSO2 Micro Integrator describes how to translate from one data format to another.

**In this tutorial**, you will send a request message to a back-end service where the format of the request payload differs from what the back-end service expects. The **Data Mapper** mediator transforms the request message payload to the format expected by the back-end service.

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

The client message format must be transformed to the back-end service message format within the In sequence.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

#### Create an integration project

An Integration project is a maven multi module project containing all the required modules for the integration solution.

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `TransformMessageTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create new endpoint

An Endpoint artifact is required to expose the URL that connects to the back-end service.

1. Navigate to the **MI Project Explorer** > **Endpoints**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png" alt="create new endpoint" width="30%"></a>

2. Hover over **Endpoints** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png" alt="Add endpoint" width="30%"></a>

3. Next, select **HTTP Endpoint** type from the **Create Endpoint Artifact** interface.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png" alt="Create HTTP Endpoint" width="60%"></a>

4. In the **HTTP Endpoint Form** that appears, specify the following values to create the new endpoint. 

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
            <td>Endpoint Name </td>
            <td><code>HospitalServicesEP</code></td>
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
      </tbody>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/endpoint-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/endpoint-artifact.png" alt="endpoint artifact" width="80%"></a>

5.  Click **Create**.

#### Create a REST API

1. Go to **MI Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png" alt="create new api" width="30%"></a>

2. Hover over **APIs** and click the **+** icon that appears to open the **API Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-api.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-api.png" alt="add API" width="30%"></a>

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
        <td><code>/healthcare </code></td>
        <td>
          Here you are anchoring the API in the <code>/healthcare </code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to /healthcare means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare<code>.
        </td>
      </tr>
    <table>

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/synapse-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/synapse-api-artifact.png" alt="synapse API artifact" width="80%"></a>      

4.  Click **Create**. This will open the **Service Designer** interface.

    You can now start configuring the API resource.

5. Click on the `GET` API resource under **Available resources** on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit-icon.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit-icon.png" alt="edit icon" width="80%"></a>

7. Specify values for the required resource properties:

    <table>
      <tr>
        <th>Property</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>URI-Template</td>
        <td>
          <code>/categories/{category}/reserve</code></br> This defines the request URL format. In this case, the full request URL format is <code>http://host:port/categories/{category}/reserve</code> where <code>{category}</code> is a variable.
        </td>
      </tr>
      <tr>
        <td>Url Style</td>
        <td>
          <code>URI_TEMPLATE</code>
        </td>
      </tr>
      <tr>
        <td>Methods</td>
        <td>
          <code>POST</code> <br> This defines that the API resource only handles requests where the HTTP method is POST.
        </td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit-api-resource.png" alt="edit API resource" width="40%"></a>

8. Click **Update**.


#### Create the mediation logic

Let's configure the API resource with the data transformation logic.

1. To get started, click on the **+** icon to add the first mediator to the sequence.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-property.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-property.png" alt="add property" width="80%"></a>

2. Select **Property** mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/property-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/property-mediator.png" alt="property mediator" width="30%"></a>

    !!! Info
        This is used to extract the hospital name from the request payload. 

3.  Once you select the Property mediator, the **Property** panel will be opened. Fill in the information in the table below:

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
        <td><code>uri.var.hospital</code></td>
        <td>The name that will be used to refer this property's values.</td>
      </tr>
      <tr>
        <td>Property Action</td>
        <td><code>set</code></td>
        <td>The property action.</td>
      </tr>
      <tr>
        <td>Property Data Type</td>
        <td><code>STRING</code></td>
        <td>The property action.</td>
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
          <div class="content-wrapper">
            <p>Follow the steps given below to specify the expression value:</p>
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
          </div>
        </td>
      </tr>
      </tbody>
    </table>

4.  Click **Submit** to save the Property mediator configuration.

5.  Click on the **+** icon under **Property** mediator. Add a **Data Mapper** mediator just after the Property mediator in the In Sequence of the API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-data-mapper.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-data-mapper.png" alt="add data mapper" width="30%"></a>

6.  Once you select the **Data Mapper** mediator, the **Property** panel will be opened. Select **New Mapping** and Fill name as <code>RequestMapping</code>. Click **Create Mapping**. You can view the data mapping editor.  

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/data-mapper-canvas.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/data-mapper-canvas.png" alt="data mapper canvas" width="80%"></a>

7.  Click **+** on **Import Input Schema**. Then, click **Import from JSON**. Copy the following sample content of the request message sent to the API resource and click **Save**.

    ```json
    { "name": "John Doe",
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

8.  Click **+** on **Import Output Schema**. Then, click **Import from JSON**. Copy the following sample content of the request message expected by the back-end service and click **Save**.

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

9. Now, you can draw the mapping by clicking the values in the **Input** box to the relevant values in the **Output** box.  

    The completed mapping will look as follows:

    <img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/mapping-data-input-output.png">

10. Save and close the configuration. Go back to **HealthcareAPI** resource.

11.  Open API resource. Add a **Call mediator** next to the Data mapper from the **Mediators** palette and select the `HospitalServicesEP` endpoint from the dropdown list. Click **Submit**.

      <img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-call-mediator-for-transformation.png">

12. Add a **Respond mediator** next to the **Call mediator** to return the response from the health care service back to the client. Click **Submit**.

      <img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add-respond-mediator-for-transformation.png">
    
18. Save the REST API configuration.

You have successfully created all the artifacts required for this use case.

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

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

Let's send a request to the API resource to make a reservation. You can use Postman or any other <b>HTTP Client</b>:

1. Open the Postman application. If you do not have the application, download it from here : [Postman](https://www.postman.com/downloads/)

2. Add the request information as shown below and click the <b>Send</b> button.
    
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
            </div></br>
            <ul>
              <li>
                This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and date of appointment.
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
3. Open a terminal and navigate to the directory where you have saved the `request.json` file.
4. Execute the following command.
    ```json
    curl -v -X POST --data @request.json http://localhost:8290/healthcare/categories/surgery/reserve --header "Content-Type:application/json"
    ```
    
#### Analyze the response

You will see the following response received by your <b>HTTP Client</b>:

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

You have now explored how the Micro Integrator can receive a message in one format and transform it into the format expected by the back-end service using the Data Mapper mediator.
