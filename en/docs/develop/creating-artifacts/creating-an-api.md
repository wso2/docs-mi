# Create an API

Follow these instructions to create an [API]({{base_path}}/reference/synapse-properties/rest-api-properties) artifact in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

## Create an API artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. To add a new API, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. On the **Add artifact** pane, click **API** under **Create an Integration** to open the **API Form**.

6. Provide details for the API artifact.
    
     <table>
        <thead>
           <tr>
              <th>Field</th>
              <th>Description</th>
           </tr>
        </thead>
        <tbody>
           <tr>
              <td>**Name**</td>
              <td>The name of the API artifact.</td>
           </tr>
           <tr>
              <td>**Context**</td>
              <td>The context for the API. For example, <code>/healthcare</code>. 
              <div class="admonition note">
              <p class="admonition-title">Note</p>
              <p>
              <ul>
                 <li>This value will be automatically populated with the same value you provided for the API **Name**, or you can update it with a different name.</li> 
                 <li>The API context should be unique for each API.</li>
                 <li>It is not recommended to use <code>/service</code> as the API context because it is preserved for Proxy services.</li>
              </ul>
              </p>
              </div>
              </td>
           </tr>
           <tr>
         <td>**Generate API From**</td>
         <td>
             Select one of the given options:
             <ul>
                 <li>**None**: This option is selected by default. Use it to create a new API artifact from scratch.</li>
                 <li>**From OpenAPI definition**: Select this option to generate the API artifact from an existing Swagger definition (YAML/JSON file). The Synapse configuration (XML) of the API will be generated using the Swagger definition.</li>
                 <li>**From WSDL file**: Select this option to generate Synapse API from a Web Services Description Language (WSDL) endpoint.</li>
             </ul>
         </td>
         </tr>
        </tbody>
     </table>

    - If you selected **None** under **Generate API From**, you can start creating an API from scratch.

        <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api.png" alt="generate API from wsdl file" width="80%"></a>

    -  If you selected **From OpenAPI definition** under **Generate API From**, enter the details of your custom Swagger file:

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
                    Check this to save the Swagger definition.</br>
                </td>
            </tr>
        </table>

        <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-openapi-definition.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-openapi-definition.png" alt="generate API from openAPI definition" width="80%"></a>

    - If you selected **From WSDL file** under **Generate API From**, enter the following information:

        <table><thead>
          <tr>
            <th>Parameter</th>
            <th>Description</th>
          </tr></thead>
        <tbody>
          <tr>
            <td>WSDL Type</td>
            <td>Select <b>File</b> to generate API from a WSDL file or a ZIP file containing a valid WSDL file, or select <b>URL</b> to generate the API using a remote WSDL file.</td>
          </tr>
          <tr>
            <td>WSDL File</td>
            <td>Browse and select the WSDL file or ZIP file that contains a valid WSDL file.</td>
          </tr>
          <tr>
            <td>WSDL URL</td>
            <td>Give the remote location of the SOAP Service WSDL file as a valid URL.</td>
          </tr>
          <tr>
            <td>SOAP Endpoint</td>
            <td>Give the actual SOAP Backend URL. (This should return a valid WSDL when invoked with <code>?wsdl</code>.)</td>
          </tr>
        </tbody>
        </table>

        <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-wsdl-file.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/generate-api-from-wsdl-file.png" alt="generate API from wsdl file" width="80%"></a>

        !!! Note
            - The current SOAP to REST generation has some limitations.
            - Go to the <a target="_blank" href="https://github.com/wso2/soap-to-rest/blob/main/limitations.md">Limitations of SOAP to REST Feature</a> documentation for more details on these limitations.
            - All the generated REST services are not production-ready and require manual review and necessary edits using MI for VS Code.
            - Additionally, since using a dot `.` in XML element names is not considered a best practice, you may need to manually modify the generated SOAP payload to remove or adjust the dot notation.

7. Once you complete the **API Form**, click **Create**.

!!! info
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure.

    - The newly-created API will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/apis` folder of your integration project. 
    - A Swagger file for the API will be generated in the `<PROJECT_NAME>/src/main/wso2mi/resources/api-definitions` folder.

- The created APIs will be displayed in **Project Overview**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/available-apis.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/available-apis.png" alt="available-apis" width="80%"></a>

## Add new API resources

When you create the API, an API resource is created by default. If you want to add a new resource:

1. Click **+ Resource** on the **Service Designer** to open the **Add API Resource** pane.

2. Add the required details.

3. Click **Create**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/add-resource.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/add-resource.png" alt="add new API resource" width="80%"></a>

!!! Info "Default API resource"

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

The created API resources will be available in **Service Designer** under **Available Resources** for each created API.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/available-resources.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/available-resources.png" alt="available-resources" width="80%"></a>

<!--

## Update metadata

When you create the API artifact from MI for VS Code extension, the metadata files will be created and stored under the `<PROJECT_NAME>/src/main/wso2mi/resources/metadata` folder.

!!! note
    You can view the below folder structure by [switching]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/#mi-project-explorer) to the VS Code default **Explorer** view.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/metadata-folder.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/metadata-folder.png" alt="Metadata folder" width="30%"></a>

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
            This is the URL of the API when it gets deployed in the WSO2 Integrator: MI. You (as the integration developer) may not know this URL during development. Therefore, you can parameterize the URL to be resolved later using environment variables. By default, the <code>{MI_HOST}</code> and <code>{MI_PORT}</code> values are parameterized with placeholders.</br></br>
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

## Design the integration

1. Open the **Resource View** of the API resource.

    1. Go to **MI Project Explorer** > **APIs**.
    2. Under the API you created, click the API resource to open the **Resource View** of the API resource.

2. Click on the **+** icon below the API resource to open the palette.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/open-palette.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/open-palette.png" alt="open-palette" width="80%"></a>

3. Add the required mediators and connectors to the API resource and design the integration flow.

## Update configurations

### Update the API configurations

1. Go to **Project Overview**.

2. Under **APIs**, select the API you want to edit. This will open the **Service Designer**.

3. On the **Service Designer**, click the **Edit** icon to edit the API. 

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/edit-api-interface.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/edit-api-interface.png" alt="available-apis" width="80%"></a>

    This will open the **Edit API** pane.

4. Once you edit, click **Save Changes**.

    See the complete list of [API configurations]({{base_path}}/reference/synapse-properties/rest-api-properties/#rest-api-properties) you can configure.

### Update the API resource configurations

1. Go to **Project Overview**.

2. Under **APIs**, select the API you want to edit. This will open the **Service Designer**.

3. On the **Service Designer**, click on the API resource to go to the **Resource View** of the API resource.

4. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/edit-api-resource-interface.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/edit-api-resource-interface.png" alt="available-apis" width="80%"></a>

    This will open the **Edit API Resource** pane.

5. Once you edit, click **Update**.

    See the complete list of [API Resource configurations]({{base_path}}/reference/synapse-properties/rest-api-properties/#rest-api-resource-properties) you can configure.

## Source view

Click the **Show Source** (**</>**) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the API.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show source view" width="30%"></a>

You can update the API using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/source-view.png" alt="source view" width="80%"></a>

## Swagger view

1. Go to **Service Designer**.

2. Click **OpenAPI Spec** to view the API definition of your API.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/open-api-spec.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/open-api-spec.png" alt="OpenAPI spec" width="80%"></a>

You can interact with the API using the **Swagger View**.

!!! Note
    If you have created the API by adding a custom Swagger definition, this view displays the API's default Swagger definition, not the custom one you have added.

## Enable CORS

To enable CORS for your API, follow these steps:

1. Go to **Project Overview**.

2. Under **APIs**, select the API you want to edit. This will open the **Service Designer**.

3. On the **Service Designer**, click the **Edit** icon to edit the API.

4. In the **Edit API** pane, navigate to the **CORS** section.

5. Enable CORS by toggling the checkbox.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/cors-enabled.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/cors-enabled.png" alt="CORS enabled" width="80%"></a>

6. Configure the allowed origins, methods, and headers as per your requirements.

7. Click **Save Changes**.

## Examples

Follow our examples on APIs: 

- [Using a Simple Rest API]({{base_path}}/learn/examples/rest-api-examples/introduction-rest-api)
- [Working with Query Parameters]({{base_path}}/learn/examples/rest-api-examples/setting-query-params-outgoing-messages)
- [Exposing a SOAP Endpoint as a RESTful API]({{base_path}}/learn/examples/rest-api-examples/enabling-rest-to-soap)
- [Exposing Non-HTTP Services as RESTful APIs]({{base_path}}/learn/examples/rest-api-examples/configuring-non-http-endpoints)
- [Handling Non Matching Resources]({{base_path}}/learn/examples/rest-api-examples/handling-non-matching-resources)
- [Handling HTTP Status Codes]({{base_path}}/learn/examples/rest-api-examples/setting-https-status-codes)
- [Manipulating Content Types]({{base_path}}/learn/examples/rest-api-examples/transforming-content-type)
- [Securing a REST API]({{base_path}}/learn/examples/rest-api-examples/securing-rest-apis)
- [Special Cases]({{base_path}}/learn/examples/rest-api-examples/special-cases)
    