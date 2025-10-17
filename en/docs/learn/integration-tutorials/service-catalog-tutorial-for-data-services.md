# Exposing an Integration Data Service as a Managed API

Managed APIs refer to the APIs that are managed using WSO2 API Manager, namely REST APIs, GraphQL APIs, SOAP APIs, and Streaming APIs.

This guide explains how to create a Data Service that exposes data from a relational database or another data source through WSO2 Micro Integrator, generate the relevant metadata for the corresponding Data Service, publish the WSDL/WADL or OpenAPI definition in the WSO2 API Manager Service Catalog, and then create a managed API (for example, a REST API) in WSO2 API Manager based on that Data Service.

It also demonstrates how the integration components (WSO2 Micro Integrator) and the API management components (WSO2 API Manager) work together to enable API-led data integration, providing a seamless mechanism to expose, secure, and manage data-driven APIs.

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

#### Creating a Data Service

1. Navigate to **WSO2 Integrator: MI Project Explorer**.

2. Click on the **+** symbol to open the **Add Artifact** pane.

     <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="80%"></a>

3. Click **+ View More** under **Create an Integration**.

4. Click on **Data Service** and enter **RDBMSDataService** as the **Data Service Name**.

5. Click **+ Add Datasource** and enter **RDBMSDataService** as the **Datasource Identifier**.

6. Select **RDBMS** as the **Datasource Type**.

7. Fill in the **Database Name** , **Username**, and **Password** and specify the **Driver Location** as well.

8. Check the connection and Click **Create**.

9. Open the Source view of the **RDBMSDataService**, and copy and paste the **query**, **resource**, and **operation** code. For more information, see [How to Expose an RDBMS Datasource]({{base_path}}/learn/examples/data-integration/rdbms-data-service/)

 ```xml
 <data name="RDBMSDataService" serviceNamespace="" serviceGroup="" transports="http https"       disableStreaming="true">
    <description/>
    <config id="RDBMSDataService" >
        <property name="driverClassName">com.mysql.jdbc.Driver</property>
        <property name="url">jdbc:mysql://localhost:3306/Employees</property>
        <property name="username">root</property>
        <property name="password">Ashakalai123@</property>
    </config>
    <query id="GetEmployeeDetails" useConfig="RDBMSDataService">
        <sql>select EmployeeNumber, FirstName, LastName, Email, Salary from Employees where EmployeeNumber=:EmployeeNumber</sql>
        <param name="EmployeeNumber" paramType="SCALAR" sqlType="STRING"/>
        <result element="Employees" rowName="Employee">
            <element column="EmployeeNumber" name="EmployeeNumber" xsdType="xs:string"/>
            <element column="FirstName" name="FirstName" xsdType="xs:string"/>
            <element column="LastName" name="LastName" xsdType="xs:string"/>
            <element column="Email" name="Email" xsdType="xs:string"/>
            <element column="Salary" name="Salary" xsdType="xs:string"/>
        </result>
    </query>
    <resource method="GET" path="Employee/{EmployeeNumber}">
        <call-query href="GetEmployeeDetails">
            <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
        </call-query>
    </resource>
    <operation name="getEmployeeDetailsOp" disableStreaming="true">
        <call-query href="GetEmployeeDetails">
            <with-param name="EmployeeNumber" query-param="EmployeeNumber"/>
        </call-query>
    </operation>
 </data>
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

3. Open **RDBMSDataService** from the above list.

4. Click **Create API** in the above screen to open the **Create API** dialog box.
   
    <img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/dataservice-create-api.png" alt="Proxy create api" width="50%">

5.  Specify an API name, context, and version, and then click **Create API**.

    !!! Tip
        You will find these values already populated based on the information in the integration service.

You can now see the new API's overview page.

!!! Note
    -   You can use the left-hand navigation to explore the new API.
    -   Click **Endpoints** in the left-hand navigator. You will see that the new API uses the integration service deployed in the WSO2 Integrator: MI as the endpoint (backend).

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/dataservice-api.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/dataservice-api.png" alt="endpoint view"></a>

**Select business plans**

Let's allocate some business plans for the API.

1.  Click on **Overview**, then **Business Plan**.

2.  Select at least one business plan for the API and save.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-business-plan.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-business-plan.png" alt="add business plans to api"></a>

**Deploy API in the Gateway**

Let's deploy the API in a gateway environment.

1.  Click on **Overview**, then **Deploy**.

    !!! Tip
        This opens the **Deployment** tab in the left-hand navigator.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/dataservice-deployment.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/dataservice-deployment.png" alt="open the deployment options"></a>

2.  Click **Default** to specify the gateway environment and host.

    !!! Tip
        This setting deploys the API in Production as well as Sandbox gateways. Find out more about [gateway environments](https://apim.docs.wso2.com/en/4.3.0/deploy-and-publish/deploy-on-gateway/api-gateway/maintaining-separate-production-and-sandbox-gateways/).

3.  **Optionally**, you can add a description.

4.  Click **Deploy**.

You will now see the deployment as the first revision of the API.

### Step 7: Publish the API

Click on **Overview** in the **Publisher** portal and click **Publish** for the `RDBMSDataService` as shown below.

<a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-publish.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-publish.png"></a>

The API is now available in the **Developer** portal for consumers to access.

### Step 8: Use the API

1. Sign in to the **Developer** portal: `https://localhost:9443/devportal/apis`.

    !!! Tip
        Use `admin` as the username and password.

2. Go to the **API** tab and click on the `RDBMSDataService`to open the API overview.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-api-overview.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-api-overview.png"></a>

4. Click **API Console** under **Try Out** for the `RDBMSDataService` in the **Developer** portal as shown below.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-developer-portal.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-developer-portal.png"></a>

5. Enter the username and password for Basic Authentication.

    !!! Tip
        Use `admin` as the username and password.

6. Expand the **/Employee/{EmployeeNumber}** resource and click **Try it out**. 
7. Fill the EmployeeNumber. 
8. Click **Execute**.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-try-it.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-try-it.png"></a>

    You will get the response message from the **RDBMSDataService** service, if you send the **EmployeeNumber** as `3`:
    
    ```xml
    <Employees xmlns="http://ws.wso2.org/dataservice">
      <Employee>
        <EmployeeNumber>3</EmployeeNumber>
        <FirstName>Smith</FirstName>
        <LastName>Will</LastName>
        <Email>will@google.com</Email>
        <Salary>30000.0</Salary>
      </Employee>
    </Employees>
    ```

9. Expand the **SOAP Request** resource and click **Try it out**.
10. Update the payload.
11. Click **Execute**.

    <a href="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-soap-request.png"><img src="{{base_path}}/assets/img/integrate/tutorials/service-catalog/data-service-soap-request.png"></a>

    You will get the response message from the **RDBMSDataService** service, if you send the **EmployeeNumber** as `3`:
    
    ```xml
    <Employees xmlns="http://ws.wso2.org/dataservice">
      <Employee>
        <EmployeeNumber>3</EmployeeNumber>
        <FirstName>Smith</FirstName>
        <LastName>Will</LastName>
        <Email>will@google.com</Email>
        <Salary>30000.0</Salary>
      </Employee>
    </Employees>
    ```

!!! Tip
    For detailed instructions see [Invoke an API using the Integrated API Console](https://apim.docs.wso2.com/en/4.3.0/consume/invoke-apis/invoke-apis-using-tools/invoke-an-api-using-the-integrated-api-console/).
