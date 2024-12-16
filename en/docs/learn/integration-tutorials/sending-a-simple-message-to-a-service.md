# How to Send a Simple Message to a Service

## What you'll build

Let’s try a simple scenario where a patient makes an inquiry specifying the doctor's specialization (category) to retrieve 
a list of doctors that match the specialization. The required information is available in a back-end microservice. 

To implement this use case, you will create a REST API resource and other artifacts using Micro Integrator Extension for Visual Studio Code
(MI for VS Code), and then deploy them in the embedded WSO2 Micro Integrator instance. The default API resource will be 
configured to receive the client request in place of the back-end service, thereby decoupling the client and the back-end service. 
The response message with the requested doctor details will be routed back to the client through the same API resource.

### Concepts and artifacts used

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties)
-   [HTTP Endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties)
-   [Call Mediator]({{base_path}}/reference/mediators/call-mediator)
-   [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator)

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an Integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `SimpleMessageTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create an Endpoint

An Endpoint artifact is required for the purpose of exposing the URL that connects to the back-end service.

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
         <td>Endpoint Name</td>
         <td><code>QueryDoctorEP</code></td>
         <td>The name of the endpoint.</td>
      </tr>
      <tr>
         <td>URI Template</td>
         <td>
            <code>http://localhost:9090/healthcare/{uri.var.category}</code>
         </td>
         <td>The template for the request URL expected by the back-end service. In this case, the variable 'category' that needs to be included in the request for querying doctors is represented as <code>{uri.var.category}</code> in the template.</td>
      </tr>
      <tr>
         <td>Method</td>
         <td><code>GET</code></td>
         <td>Indicates that we are creating this endpoint for GET requests that are sent to the back-end service.</td>
      </tr>
     </tbody>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/endpoint-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/endpoint-artifact.png" alt="endpoint artifact" width="80%"></a>

5. Click **Create**.  

    The **QueryDoctorEP** endpoint is saved in the `endpoints` folder inside the `<PROJECT_NAME>/src/main/wso2mi/artifacts` directory.  

    Once the endpoint artifact is created, it will appear on the **MI Overview** interface.    

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/mi-overview-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/mi-overview-endpoint.png" alt="mi overview endpoint" width="80%"></a>

#### Create a REST API

A REST API is required for receiving the client response and the REST resource within the API will define the mediation logic that will send requests to the Healthcare back-end service and retrieve the available doctor information.

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
        <td><code>/healthcare</code></td>
        <td>
          Here you are anchoring the API in the <code>/healthcare </code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to <code>/healthcare</code> means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare<code>.
        </td>
      </tr>
    </table>

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
        <th>Description</th>
      </tr>
      <tr>
        <td>URI-Template</td>
        <td>
          <code>/querydoctor/{category}</code> </br> This defines the request URL format. In this case, the full request URL format is <code>http://host:port/querydoctor/{category}</code> where <code>{category}</code> is a variable.
        </td>
      </tr>
      <tr>
        <td>URL Style</td>
        <td>
          <code>URI_TEMPLATE</code>
        </td>
      </tr>
      <tr>
        <td>Methods</td>
        <td>
          <code>GET</code> <br> This defines that the API resource only handles requests where the HTTP method is GET.
        </td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-api-resource.png" alt="edit API resource" width="40%"></a>

8. Click **Update**.

#### Create the mediation logic

You can now configure the mediation logic to handle requests.

1. To get started, click on the **+** icon to add the first mediator to the sequence.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-log.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-log.png" alt="add log" width="80%"></a>

2. Select **Log** mediator in the **Generic** section under **All Mediators**.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/log-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/log-mediator.png" alt="log mediator" width="30%"></a>

    !!! Note
        The Log mediator logs messages when the request is received by the API resource. In this scenario, let's configure the Log mediator to display the following message: “Welcome to the HealthcareService”.

3. Once you select the Log mediator, the **Log** pane will be opened. Fill in the information in the table below:
    <table>
  <tr>
     <th>Field</th>
     <th>Value</th>
     <th>Description</th>
  </tr>
<tbody>
  <tr>
     <td>Log Category</td>
     <td><code>INFO</code></td>
     <td>Indicates that the log contains an informational message.</td>
  </tr>
  <tr>
     <td>Log Level</td>
     <td><code>Custom</code></td>
     <td>When <code>Custom</code> is selected, only specified properties will be logged by this mediator.
     </td>
  </tr>
  <tr>
     <td>Log Separator</td>
     <td><code>(blank)</code></td>
     <td>Since there is only one property that is being logged, you do not require a separator. Therefore, leave this field blank.</td>
  </tr>
  <tr>
     <td>Properties</td>
     <td><br />
     </td>
     <td>
        <div class="content-wrapper">
           1. To edit the **Properties** and print a welcome message in the log, click **Add Parameter**. <br />
               <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-parameter.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-parameter.png" alt="add-parameter" width="30%"></a>, <br />
           2. Then add the following values:<br />
           <ul>
              <li><strong>Property Name</strong>: <code>Log Property message</code></li>
              </li>
              <li><strong>Property Value</strong> : <code>"Welcome to HealthcareService"</code></li>
           </ul>
           <p>
           <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/log-property.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/log-property.png" alt="log-property" width="30%"></a></p> <br />
         3. Click **Save** to save the properties.
        </div>
     </td>
  </tr>
  <tr>
     <td>Description</td>
     <td><code>Request Log</code></td>
     <td>The <strong>Description</strong> field provides the name that appears for the Log mediator icon in the design view.</td>
    </tr>
    </tbody>
    </table>

3.  Click **Submit** to save the Log mediator configuration.

    Let's configure a **Call** mediator to send the request message to the `HealthcareService` endpoint and receive the response message.

4. Click on the **+** icon in the sequence to add a Call mediator after the Log mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-call.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-call.png" alt="add call" width="80%"></a>

5. From the **Palette**, select **Call Endpoint** mediator under the **Mediators** > **Generic** section.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/call-endpoint-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/call-endpoint-mediator.png" alt="call endpoint mediator" width="30%"></a>

6. From the **Call Endpoint** pane, select the **QueryDoctorEP** endpoint, which we created in a previous step.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/call-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/call-endpoint.png" alt="call endpoint" width="30%"></a>

7. Click **Submit**.

    Now let's add a **Respond** mediator at the end of the in sequence to send the response message from the healthcare service back to the client.

8. Click on the **+** icon in the sequence to add a Respond mediator after the Call mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-respond.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/add-respond.png" alt="add respond" width="80%"></a>

9. From the **Palette**, select **Respond** mediator under the **Mediators** > **Generic** section.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/respond-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/respond-mediator.png" alt="respond mediator" width="30%"></a>

10. Click **Submit**.

You have successfully created all the artifacts that are required for sending a request through the Micro Integrator to the back-end service.

<a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/integration-sequence.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/integration-sequence.png" alt="integration sequence" width="80%"></a>

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, navigate to the location where your saved the back-end service.
3. Execute the following command to start the service:

    ```bash
    java -jar Hospital-Service-JDK11-2.0.0.jar
    ```

#### Send the client request

Let's send the request to the API. You can use the embedded <b>HTTP Client</b> as follows:

1. Open the Postman application. If you do not have the application, download it from [here](https://www.postman.com/downloads/).

2. Add the request information as given below and click the <b>Send</b> button.
    
    <table>
        <tr>
            <th>Method</th>
            <td>
               <code>GET</code> 
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td>
                <code>http://localhost:8290/healthcare/querydoctor/surgery</code></br></br>
            </td>
        </tr>
     </table>

If you want to send the client request from your terminal:

1. Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2. Execute the following command.
    ```bash
    curl -v http://localhost:8290/healthcare/querydoctor/surgery
    ```

#### Analyze the response

You will see the response message from the `HealthcareService` with a list of available doctors and the relevant details.

```json
[
   {
      "name": "thomas collins",
      "hospital": "grand oak community hospital",
      "category": "surgery",
      "availability": "9.00 a.m - 11.00 a.m",
      "fee": 7000.0
   },
   {
      "name": "anne clement",
      "hospital": "clemency medical center",
      "category": "surgery",
      "availability": "8.00 a.m - 10.00 a.m",
      "fee": 12000.0
   },
   {
      "name": "seth mears",
      "hospital": "pine valley community hospital",
      "category": "surgery",
      "availability": "3.00 p.m - 5.00 p.m",
      "fee": 8000.0
   }
]
```

Now, check the **Output** tab of VS Code and you will see a message similar to the following:

```
[2024-07-29 15:51:36,956]  INFO {LogMediator} - {api:HealthcareAPI} Log Property message = "Welcome to HealthcareService"
```

You have now created and deployed an API resource in the Micro Integrator, which receives requests, logs a message using the Log mediator, sends the request to a back-end service using the Send mediator, and returns a response to the requesting client.
