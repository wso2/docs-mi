# Create a REST API

Follow the instructions below to create a new REST API artifact in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the API artifact

{!includes/creating-project.md!}

3. Go to **Micro Integrator Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png" alt="Create REST API" width="30%"></a>

4. Hover over **APIs** and click the **+** icon that appears to open the **Synapse API Artifact** creation form below.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-api.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-api.png" alt="Add API" width="30%"></a>

    In the interface that opens, provide details for the synapse API artifact.
    
     <table>
        <thead>
           <tr>
              <th>Parameter</th>
              <th>Description</th>
           </tr>
        </thead>
        <tbody>
           <tr>
              <td>Name</td>
              <td>Name of the synapse API artifact.</td>
           </tr>
           <tr>
              <td>Context</td>
              <td>The context for the REST API. For example, <code>/healthcare</code>. 
              <div class="admonition note">
              <p class="admonition-title">Note</p>
              <p>
              <ul>
                 <li>It is not recommended to use the same API context in multiple APIs. The API context should be unique for each API.</li>
                 <li>It is also not recommended to use <code>/service</code> as API context because it is preserved for Proxy services.</li>
              </ul>
              </p>
              </div>
              </td>
           </tr>
           <tr>
         <td>Generate API From</td>
         <td>
             Select one of the given options:
             <ul>
                 <li>None: This option is selected by default. Use it to create a new REST API artifact from scratch.</li>
                 <li>From OpenAPI definition: Select this option to generate the REST API artifact from an existing Swagger definition (YAML/JSON file). The Synapse configuration (XML) of the REST API will be generated using the Swagger definition.</li>
                 <li>From WSDL file: Select this option to generate Synapse API from a WSDL endpoint.</li>
             </ul>
         </td>
         </tr>
        </tbody>
     </table>

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-new-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-new-rest-api.png" alt="Create new rest API" width="80%"></a>

    <br/>

    - If you selected **None** in the previous step, you can start creating an API from scratch.

    -  If you selected **From OpenAPI definition** in the previous step, enter the details of your custom Swagger file:

        <table>
            <tr>
                <th>
                    Parameter
                </th>
                <th>
                    Description
                </th>
            </tr>
            <tr>
                <td>
                    Swagger File
                </td>
                <td>
                    Click <b>Select Location</b> and select a file for OpenAPI definition. This field is required.
                </td>
            </tr>
            <tr>
                <td>
                    Save Swagger Definition
                </td>
                <td>
                    Check this to save the Swagger definition. The Swagger definition will be saved to this registry.</br>
                </td>
            </tr>
        </table>

        <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-openapi-definition.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-openapi-definition.png" alt="generate API from openAPI definition" width="80%"></a>

    - If you selected **From WSDL file** in the previous step, enter the following information:

        <table><thead>
          <tr>
            <th>Parameter</th>
            <th>Description</th>
          </tr></thead>
        <tbody>
          <tr>
            <td>WSDL Type</td>
            <td>Select <b>File</b> to generate API from a WSDL file or a Zip file containing a valid WSDL file, or select <b>URL</b> to generate the API using a remote WSDL file.</td>
          </tr>
          <tr>
            <td>WSDL File</td>
            <td>Browse and select the WSDL File or Zip file that contains a valid WSDL file.</td>
          </tr>
          <tr>
            <td>WSDL URL</td>
            <td>Give the remote location of the SOAP Service WSDL File as a valid URL.</td>
          </tr>
          <tr>
            <td>SOAP Endpoint</td>
            <td>Give the actual SOAP Backend URL. (This should return a valid WSDL when invoked with <code>?wsdl</code>.)</td>
          </tr>
        </tbody>
        </table>

        <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-wsdl-file.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-wsdl-file.png" alt="generate API from wsdl file" width="80%"></a>

        !!! Note
            - Current SOAP to REST Generation has the limitations mentioned [here](https://github.com/wso2/soap-to-rest/blob/main/limitations.md).
            - All the generated REST Services are not production-ready and users need to review them manually using MI for VS Code and edit if needed.
            - Since having `.` (dot) in XML element names is not a best practice, you may need to manually change the generated soap payload to include the `.` (dot).

5. Once you complete the **API Form**, click **Create**.

   The REST API is created inside the `/src/main/wso2mi/artifacts/apis` folder of your integration project.

   If you have provided a custom Swagger definition file (YAML), it is stored in the `/src/main/wso2mi/resources/api-definitions` folder of your integration project.

   Once you create the REST API, it will be available on the **Service Designer** under **Available Resources**.

   <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/service-designer-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/service-designer-view.png" alt="service designer view" width="80%"></a>

### Add new API resources

When you create the API, an API resource is created by default. If you want to add a new resource:

1. Click **+ Resource** on the **Service Designer** to open the **Add API Resource** pane.

2. Add the required details.

3. Click **Create**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/add-resource.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/add-resource.png" alt="add new API resource" width="80%"></a>

!!! Info
    **About the default API Resource**

    Each API can have at most one default resource. Any request received
        by the API but does not match any of the enclosed resources
        definitions will be dispatched to the default resource of the API.
        In the following example, if a DELETE request is received by `SampleAPI` on the `/payments` URL, the request will be
        dispatched to the default resource as none of the resources in SampleAPI are configured to handle DELETE requests.

    === "SampleAPI"
        ```xml
        <api name="SampleAPI" context="/payments">
        <resource url-mapping="/list" methods="GET" inSequence="seq1"/>
        <resource uri-template="/edit/{userId}" methods="PUT POST">
            <inSequence>
                 <log/>
                 <send>
                      <endpoint key="BackendService"/>
                 </send>
            </inSequence>
        </resource>
        <resource inSequence="seq2"/>
        </api>
        ```    

### Update metadata

When you create the API artifact from MI for VS Code extension, the metadata files will be created and stored under the `<PROJECT_NAME>/src/main/wso2mi/resources/metadata` folder.

!!! note
    You can view the below folder structure by [switching]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/#mi-project-explorer) to the VS Code default **Explorer** view.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/metadata-folder.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/metadata-folder.png" alt="Metadata folder" width="30%"></a>

<!--

The service's metadata is used by the API management runtime to generate the API proxy for the integration service (which is this API).

<table>
    <tr>
        <th>
            Parameter
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td>
            description
        </td>
        <td>
            Explain the purpose of the API.
        </td>
    </tr>
    <tr>
        <td>
            serviceUrl
        </td>
        <td>
            This is the URL of the API when it gets deployed in the Micro Integrator. You (as the integration developer) may not know this URL during development. Therefore, you can parameterize the URL to be resolved later using environment variables. By default, the <code>{MI_HOST}</code> and <code>{MI_PORT}</code> values are parameterized with placeholders.</br></br>
            You can configure the serviceUrl in the following ways:
            <ul>
                <li>
                    Add the complete URL without parameters. For example: <code>http://localhost:8290/healthcare</code>.</br>
                </li>
                <li>
                    Parameterize using the host and port combination. For example: <code>http://{MI_HOST}:{MI_PORT}/healthcare</code>.
                </li>
                <li>
                    Parameterize using a preconfigured URL. For example: <code>http://{MI_URL}/healthcare</code>.
                </li>
            </ul>
        </td>
    </tr>
</table>

!!! Tip
    See the [Service Catalog API documentation](https://apim.docs.wso2.com/en/latest/reference/product-apis/service-catalog-apis/service-catalog-v1/service-catalog-v1/) for more information on the metadata in the YAML file.

-->

### Design the integration

1. On the **Service Designer**, click on the API resource and go to the **Resource View**.

2. Add the required mediators and connectors to the API resource and design the integration flow.

You can also use the [**Source View**](#using-the-source-view) or the [**Swagger View**](#using-the-swagger-editor) to update the API configuration.

### Update properties

To update API level properties:

1. On the **Service Designer**, click on the API resource to go to the **Resource View** of the API resource.

    You will now see the graphical view of the API with its default API Resource.

2. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource.png" alt="edit API resource" width="80%"></a>

3. Specify values for the required resource properties:

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource-details.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource-details.png" alt="Edit API resource details" width="30%"></a>

4. Click **Update**.

    See the complete list of [API Resource properties]({{base_path}}/reference/synapse-properties/rest-api-properties/#rest-api-resource-properties) you can configure.

### Use the Source View

Click the **Show Source** (`</>`) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the API.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show source view" width="30%"></a>

You can update the API using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/source-view.png" alt="source view" width="80%"></a>

### Use the Swagger View

1. Go to **Service Designer**.

2. Click **OpenAPI Spec** to view the API definition of your API.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/open-api-spec.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/open-api-spec.png" alt="OpenAPI spec" width="80%"></a>

You can interact with the API using the **Swagger View**.

!!! Note
    If you have added a custom Swagger definition to the API, note that this view displays the API's default Swagger definition, not the custom Swagger definition that you added.

!!! abstract "Learn more about REST APIs"

    Follow our examples on REST APIs: 

    - [Using a Simple Rest API]({{base_path}}/learn/examples/rest-api-examples/introduction-rest-api)
    - [Working with Query Parameters]({{base_path}}/learn/examples/rest-api-examples/setting-query-params-outgoing-messages)
    - [Exposing a SOAP Endpoint as a RESTful API]({{base_path}}/learn/examples/rest-api-examples/enabling-rest-to-soap)
    - [Exposing Non-HTTP Services as RESTful APIs]({{base_path}}/learn/examples/rest-api-examples/configuring-non-http-endpoints)
    - [Handling Non Matching Resources]({{base_path}}/learn/examples/rest-api-examples/handling-non-matching-resources)
    - [Handling HTTP Status Codes]({{base_path}}/learn/examples/rest-api-examples/setting-https-status-codes)
    - [Manipulating Content Types]({{base_path}}/learn/examples/rest-api-examples/transforming-content-type)
    - [Securing a REST API]({{base_path}}/learn/examples/rest-api-examples/securing-rest-apis)
    - [Special Cases]({{base_path}}/learn/examples/rest-api-examples/special-cases)
    
