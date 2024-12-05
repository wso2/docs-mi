# How to Expose an Integration Service as a Managed API

## What you'll build

In this tutorial, you'll define an integration service using Micro Integrator Extension for Visual Studio Code (MI for VS Code) and expose it as a managed API to the API marketplace. API consumers then **discover** the API from the marketplace, **subscribe** to it, and **use it** for application development.

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/exposing-servie-as-managed-api.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/exposing-servie-as-managed-api.png" alt="exposing integration service as a managed api"></a>

This demonstrates how the integration components and API management components of WSO2 API Manager work together to enable API-led integration. The following diagram illustrates the various API Manager components and the different user roles that are involved in implementing this process:

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-led-integration-components.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-led-integration-components.png" alt="exposing integration service as a managed api"></a>

1. An **Integration Developer** creates the service using Micro Integrator Extension for Visual Studio Code (MI for VS Code) and deploys it in the Micro Integrator runtime.

    !!! Note
        The integration service is designed to communicate with a back-end service (representing a Hospital) and get details of available doctors for various specializations.

2. An **API Creator** converts the integration service to a managed API (apply security, rate limiting, etc.).
3. An **API Publisher** publishes the API to the API marketplace (Developer Portal).
4. An **API Consumer** (application developer) discovers and uses this API from the Developer Portal.

### Concepts and artifacts used

The following concepts and artifacts are used in this tutorial:

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties) / Integration Service
-   [Endpoints]({{base_path}}/reference/synapse-properties/endpoint-properties)
-   [Mediators]({{base_path}}/reference/mediators/about-mediators)
-   Service Catalog
-   API Publisher
-   API Developer Portal

## Let's get started!

Follow the steps given below to build this use case and try it out.

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an Integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `ServiceCatalogSample` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/create-new-project-integration-first.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/create-new-project-integration-first.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create an Endpoint

An Endpoint artifact is required to expose the back-end service.

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

    Once the endpoint artifact is created, it will appear on the **MI Overview** interface.    

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/mi-overview-endpoint.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/service-catalog-project-overview.png" alt="mi overview endpoint" width="80%"></a>

#### Create a REST API

A REST API is required for receiving the client requests and the REST resource within the API will define the mediation logic that will send requests to the Healthcare back-end service and retrieve the available doctor information.

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

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/synapse-api-creation-form.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/synapse-api-creation-form.png" alt="synapse API artifact" width="80%"></a>

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

2. Select **Log** mediator in the **Generic** section under **All Mediators**. The Log mediator logs messages when the request is received by the API resource. In this scenario, let's configure the Log mediator to display the following message: “Welcome to the HealthcareService”.

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

### Step 3: Configure the Micro Integrator

!!! info "Prerequisites"
    Before you begin, install Micro Integrator on your machine:

    1. Go to the [WSO2 Micro Integrator web page](https://wso2.com/integration/micro-integrator/#), click **Download**, provide necessary details, and then click **Zip Archive** to download the Micro Integrator distribution as a ZIP file.
    
    2. Extract the ZIP file. The extracted folder will be referred to as the `<MI_HOME>` folder.

The Micro Integrator can automatically publish artifacts to the **Service Catalog** in the **API Publisher** portal.

Let's enable this feature in the Micro Integrator.

1. Uncomment the `[[service_catalog]]` section as shown below and change the APIM server configurations accordingly in the `<MI_HOME>/conf/deployment.toml` file.        
     
    !!! Tip
        The default username and password for connecting to the API gateway is `admin`.

    ```toml
    [[service_catalog]]
    apim_host = "https://localhost:9443"
    enable = true
    username = "admin"
    password = "admin"
    ```

!!! Note
    Since the integration developer may not know the API URL when it gets deployed in the Micro Integrator, the URL of the API will be parameterize as `https://{MI_HOST}:{MI_PORT}/healthcare` which will be resolved later using environment variables `MI_HOST` and `MI_PORT` respectively. By default, `localhost` will be used as the `MI_HOST` and `8253` as the `MI_PORT`. Depending on your deployment, you may need to update these environment variables.

### Step 4: Start the API Manager runtime

Let's start the API Manager runtime before starting the Micro Integrator.

1.  Download and set up [WSO2 API Manager](https://wso2.com/api-management/).
2.  Start the [API-M server](https://apim.docs.wso2.com/en/latest/install-and-setup/install/installing-the-product/running-the-api-m/).

### Step 5: Build and run the artifacts

1. Click on the Command Palette at the top of the VS Code.

2. Type `>` to show the available commands.

3. Select **MI: Add MI server**.

4. Select **Add MI server**.

5. Select the folder where `<MI_HOME>` is located. This will be set as the **current server path**.

    <a href="../../../assets/img/develop/mi-for-vscode/qsg/current-server-path.png"><img src="../../../assets/img/develop/mi-for-vscode/qsg/current-server-path.png" alt="Current server path" width="50%"></a>

6. Run the project.

    Click the **Build and Run** icon located on the top right corner of the VS Code.

    <a href="../../../assets/img/develop/mi-for-vscode/qsg/build-and-run.png"><img src="../../../assets/img/develop/mi-for-vscode/qsg/build-and-run.png" alt="Build and run" width="25%"></a>

When the Micro Integrator starts, the integration service will be deployed to the **Service Catalog** during server startup. You will see the following in the server start-up log.

```bash
Successfully updated the service catalog
```

### Step 6: Create and Deploy the API

**Create the API**

Let's expose the integration service as a managed API. 

1.  Sign in to the API Publisher portal: `https://localhost:9443/publisher`. 

    !!! Tip
        Use `admin` as the username and password.

2.  You can also click the **hamburger** icon on the upper-left and click **Services** to see the available services.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/open-service-catalog.png" alt="open service catalag" width="50%">

3.  Open HealthcareAPI from the above list.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/new-service-api-view.png" alt="API created from service catalog">

4.  Click **Create API** in the above screen to open the **Create API** dialog box.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/create-api-from-service.png" alt="create api dialog box">

5.  Specify an API name, context, and version, and then click **Create API**.

    !!! Tip
        You will find these values already populated based on the information in the integration service.

You can now see the new API's overview page.

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview.png" alt="new api view"></a>

!!! Note
    -   You can use the left-hand navigation to explore the new API.
    -   Click **Endpoints** in the left-hand navigator. You will see that the new API uses the integration service deployed in the Micro Integrator as the endpoint (backend).

        <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/endpoint-config-of-api.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/endpoint-config-of-api.png" alt="endpoint view"></a>

**Select business plans**

Let's allocate some business plans for the API.

1.  Go to the API overview and click **Business Plan**.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview-business-plan.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview-business-plan.png" alt="click to add business plan"></a>

2.  Select at least one business plan for the API and save.
 
    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-business-plans.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-business-plans.png" alt="add business plans to api"></a>

**Deploy API in the Gateway**

Let's deploy the API in a gateway environment.

1.  Go to the API overview and click **Deploy**.
    
    !!! Tip
        This opens the **Deployment** tab in the left-hand navigator.
    
    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview-deployment.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview-deployment.png" alt="open the deployment options"></a>

2.  Click **Default** to specify the gateway environment and host.

    !!! Tip
        This setting deploys the API in Production as well as Sandbox gateways. Find out more about [gateway environments](https://apim.docs.wso2.com/en/4.3.0/deploy-and-publish/deploy-on-gateway/api-gateway/maintaining-separate-production-and-sandbox-gateways/).

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-deployment-revision.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-deployment-revision.png" alt="select gateways for the deployment"></a>

3.  **Optionally**, you can add a description.

4.  Click **Deploy**. 

You will now see the deployment as the first revision of the API:

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-gateway-deployment-summary.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-gateway-deployment-summary.png" alt="api first revision"></a>

### Step 7: Publish the API

Go to the API overview in the **Publisher** portal and click **Publish** for the `HealthcareAPI` as shown below.

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview-publish.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/api-overview-publish.png"></a>

The API is now available in the **Developer** portal for consumers to access.

### Step 8: Use the API

!!! Info "Before you begin"

    Let's start the back-end hospital service.

    1.  Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
    2.  Open a terminal and navigate to the location of the back-end service
    3.  Execute the following command to start the service:

        ```bash
        java -jar Hospital-Service-JDK11-2.0.0.jar
        ```

1.  Sign in to the **Developer** portal: `https://localhost:9443/devportal/apis`. 

    !!! Tip
        Use `admin` as the username and password.

2.  Go to the **API** tab. The `HealthcareAPI` is listed as shown below.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-list.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-list.png"></a>

3.  Select the `HealthcareAPI` to open the API overview.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-overview.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-overview.png"></a>

4.  Click **API Console** under **Try Out** for the `HealthcareAPI` in the **Developer** portal as shown below.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-healthcare-api-try-it.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-healthcare-api-try-it.png"></a>

5.  Enter the username and password for Basic Authentication.

    !!! Tip
        Use `admin` as the username and password.

3.  Expand the **/querydoctor/{category}** resource and click **Try it out**.
4.  Specify `surgery` as the doctor category.
5.  Click **Execute**.

     <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-try-it-execute.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-try-it-execute.png"></a>

You will get the response message from the Healthcare service, if you send the category as `surgery`:

```json
[
    {
        "name":"thomas collins",
        "hospital":"grand oak community hospital",
        "category":"surgery",
        "availability":"9.00 a.m - 11.00 a.m",
        "fee":7000.0
    },
    {
        "name":"anne clement",
        "hospital":"clemency medical center",
        "category":"surgery",
        "availability":"8.00 a.m - 10.00 a.m",
        "fee":12000.0
    },
    {
        "name":"seth mears",
        "hospital":"pine valley community hospital",
        "category":"surgery",
        "availability":"3.00 p.m - 5.00 p.m",
        "fee":8000.0
    }
]
```

Now, check the **OUTPUT** tab of VSCode and you will see the following message:

```bash
INFO {LogMediator} - {api:HealthcareAPI} Log Property message = "Welcome to HealthcareService"
```

!!! Tip
    For detailed instructions see [Invoke an API using the Integrated API Console](https://apim.docs.wso2.com/en/4.3.0/consume/invoke-apis/invoke-apis-using-tools/invoke-an-api-using-the-integrated-api-console/).
