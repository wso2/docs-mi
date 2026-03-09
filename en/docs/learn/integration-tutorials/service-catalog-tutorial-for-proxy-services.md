# Exposing an Integration SOAP Service as a Managed API

Managed APIs refer to the APIs that are managed using WSO2 API Manager, namely REST APIs, GraphQL APIs, SOAP APIs, and Streaming APIs. This guide explains how to create a Proxy Service (SOAP backend) for the integration solution, generate relevant metadata for the corresponding Proxy service, publish the WSDL definition in the WSO2 API Manager Service Catalog and then creating a **SOAP Pass-Through API**.

Also, this demonstrates how the integration components and API management components of WSO2 API Manager work together to enable API-led integration.

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

#### Creating a Proxy Service

1. Navigate to **WSO2 Integrator: MI Project Explorer**.

2. Click on the **+** symbol to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="80%"></a>

3. Click **+ View More** under **Create an Integration**.

4. Click on **Proxy** and enter **StockQuoteProxy** as the **proxy name**. 

5. Click **Create**. 

6. Open the **Source** view of the **StockQuoteProxy** you created, and update the integration solution. For more information, see [Using a Simple Proxy Service]({{base_path}}/learn/examples/proxy-service-examples/introduction-to-proxy-services/)
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <call>
                    <endpoint>
                        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                    </endpoint>
                </call>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
        <publishWSDL uri="file:/Users/wso2/Downloads/sample_proxy_1.wsdl"/>
    </proxy>
    ```

### Step 3: Configure the WSO2 Integrator: MI

!!! info "Prerequisites"
    Before you begin, install WSO2 Integrator: MI on your machine:

    1. Go to the [WSO2 Integrator: MI web page](https://wso2.com/integration/micro-integrator/#), click **Download**, provide the necessary details, and then click **Zip Archive** to download the WSO2 Integrator: MI distribution as a ZIP file.
    
    2. Extract the ZIP file. The extracted folder will be referred to as the `<MI_HOME>` folder.

The WSO2 Integrator: MI can automatically publish artifacts to the **Service Catalog** in the **API Publisher** portal.

Let's enable this feature in the WSO2 Integrator: MI.

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
    Since the integration developer may not know the API URL when it gets deployed in the WSO2 Integrator: MI, the URL of the API will be parameterized as `https://{MI_HOST}:{MI_PORT}/healthcare` which will be resolved later using environment variables `MI_HOST` and `MI_PORT` respectively. By default, `localhost` will be used as the `MI_HOST` and `8253` as the `MI_PORT`. Depending on your deployment, you may need to update these environment variables.

### Step 4: Start the API Manager runtime

Let's start the API Manager runtime before starting the WSO2 Integrator: MI.

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

   Click the **Build and Run** icon located in the top right corner of the VS Code.

   <a href="../../../assets/img/develop/mi-for-vscode/qsg/build-and-run.png"><img src="../../../assets/img/develop/mi-for-vscode/qsg/build-and-run.png" alt="Build and run" width="25%"></a>

When the WSO2 Integrator: MI starts, the integration service will be deployed to the **Service Catalog** during server startup. You will see the following in the server start-up log.

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

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-service.png" alt="Proxy open service catalog" width="50%">

3. Open **StockQuoteProxy** from the above list.

4. Click **Create API** in the above screen to open the **Create API** dialog box.
   
    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-create-api.png" alt="Proxy create api" width="50%">

5.  Specify an API name, context, and version, and then click **Create API**.

    !!! Tip
        You will find these values already populated based on the information in the integration service.

You can now see the new API's overview page.

!!! Note
    -   You can use the left-hand navigation to explore the new API.
    -   Click **Endpoints** in the left-hand navigator. You will see that the new API uses the integration service deployed in the WSO2 Integrator: MI as the endpoint (backend).

        <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-api.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-api.png" alt="endpoint view"></a>

**Select business plans**

Let's allocate some business plans for the API.

1.  Click on **Overview**, then **Business Plan**.

2.  Select at least one business plan for the API and save.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-business-plan.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-business-plan.png" alt="add business plans to api"></a>

**Deploy API in the Gateway**

Let's deploy the API in a gateway environment.

1.  Click on **Overview**, then **Deploy**.

    !!! Tip
        This opens the **Deployment** tab in the left-hand navigator.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-deployment.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-deployment.png" alt="open the deployment options"></a>

2.  Click **Default** to specify the gateway environment and host.

    !!! Tip
        This setting deploys the API in Production as well as Sandbox gateways. Find out more about [gateway environments](https://apim.docs.wso2.com/en/4.3.0/deploy-and-publish/deploy-on-gateway/api-gateway/maintaining-separate-production-and-sandbox-gateways/).

3.  **Optionally**, you can add a description.

4.  Click **Deploy**.

### Step 7: Publish the API

Click on **Overview** in the **Publisher** portal and click **Publish** for the `StockQuoteProxy` as shown below.

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-publish.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/proxy-publish.png"></a>

The API is now available in the **Developer** portal for consumers to access.

You will now see the deployment as the first revision of the API.

### Step 8: Subscribe to the API

Now, let's assume you are an API consumer who wants to use the API. As a consumer, you need to first subscribe to the API.

1.  Sign in to the **Developer** portal: `https://localhost:9443/devportal/apis`.

    !!! Tip
        Use `admin` as the username and password.

2.  Go to the **API** tab. The `StockQuoteProxy` is listed as shown below.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/expose-soap-service/developer-portal-api-list.png">

3.  Select the `StockQuoteProxy` to open the API overview.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/expose-soap-service/developer-portal-api-overview.png">

4.  Go to the **Subscriptions** tab and subscribe using the **DefaultApplication** as shown below.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/expose-soap-service/developer-portal-api-subscription.png">

!!! Tip
    For detailed instructions, see [Subscribe to an API](https://apim.docs.wso2.com/en/latest/consume/manage-subscription/subscribe-to-an-api/).

### Step 9: Use the SOAP Pass-Through API

!!! Info "Before you begin"

    Let's start the back-end service.

    1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
    2. Extract the downloaded zip file.
    3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
    4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

        === "On MacOS/Linux/CentOS"    
            ```bash  
            sh axis2server.sh
            ```
        === "On Windows"               
            ```bash 
            axis2server.bat
            ```

**Generate access token**

When you consume an API from the marketplace, your access to the API is authenticated. Therefore, the **DefaultApplication** that you used for subscribing to the API should get an access token for the gateway environment in which the API is deployed. Since the `StockQuoteProxy` is deployed in the Production gateway, you must generate **PROD** keys.

1.  Go to the **Subscriptions** tab for the `StockQuoteProxy` in the **Developer** portal.
2.  Click **PROD KEYS** for the **DefaultApplication**.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-generate-keys.png">

3.  Click **Generate Keys** (at the bottom of this view) to apply a consumer key and secret as shown below.

    !!! Note
        The application may already have a consumer key and secret generated. In this case, you can skip this step.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/developer-portal-api-consumer-keys.png">

4.  Click **Generate Access Token** in the above view to generate the access token.

5.  Save the generated token.

**Try out the service**

Now, let's test the use case by sending a simple client request that invokes the service.

1.  Click **Try Out** for the `StockQuoteProxy` in the **Developer** portal as shown below.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/expose-soap-service/developer-portal-api-try-it.png">

2.  Enter the following details.

    <table>
        <tr>
            <th>
                Security Type
            </th>
            <td>
                Select <b>OAuth</b> as the security type.
            </td>
        </tr>
        <tr>
            <th>
                Applications
            </th>
            <td>
                Select <b>DefaultApplication</b> from the list of application.
            </td>
        </tr>
        <tr>
            <th>
                Key Type
            </th>
            <td>
                Select <b>Production</b> as the key type. This means that the production gateway (environment) is used.
            </td>
        </tr>
        <tr>
            <th>
                access.token
            </th>
            <td>
                Add the access token you generated for the <b>DefaultApplication</b>. You can also click <b>GET TEST KEY</b> to generate a test token.
            </td>
        </tr>
        <tr>
            <th>
                Gateway
            </th>
            <td>
                Select <b>Default</b> as the gateway.
            </td>
        </tr>
    </table>

3.  Expand the **/** POST resource and click **Try it out**.
4.  Let's specify 'urn:getQuote' as the SOAP Action.
5.  Let's input the following payload as the SOAP Request.
    ```xml
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
            <soapenv:Header/>
            <soapenv:Body>
              <ser:getQuote>
                 <ser:request>
                    <xsd:symbol>IBM</xsd:symbol>
                 </ser:request>
              </ser:getQuote>
            </soapenv:Body>
        </soapenv:Envelope>
    ```
6. Click **Execute**.

    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/expose-soap-service/developer-portal-api-try-it-execute.png">

You will get the response message from the StockQuoteProxy service:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xsi:type="ax21:GetQuoteResponse" xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax21:change>3.9976027101114964</ax21:change>
                <ax21:earnings>13.346364457377131</ax21:earnings>
                <ax21:high>-73.39500514990955</ax21:high>
                <ax21:last>73.6913265107944</ax21:last>
                <ax21:lastTradeTimestamp>Fri Sep 24 22:10:56 IST 2021</ax21:lastTradeTimestamp>
                <ax21:low>-71.88761385784731</ax21:low>
                <ax21:marketCap>4.3004624870633185E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>-71.86467758088759</ax21:open>
                <ax21:peRatio>24.390401836247552</ax21:peRatio>
                <ax21:percentageChange>-5.715833533678435</ax21:percentageChange>
                <ax21:prevClose>-69.93910313442652</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>8029</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```

Now, check the **Console** tab of WSO2 Integration Studio and you will see the following message:

```bash
INFO - LogMediator Message = "You have successfully invoked the StockQuoteProxy"
```

!!! Tip
    For detailed instructions see [Invoke an API using the Integrated API Console](https://apim.docs.wso2.com/en/latest/consume/invoke-apis/invoke-apis-using-tools/invoke-an-api-using-the-integrated-api-console/).
