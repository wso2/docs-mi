# Intelligent Document Processing (IDP) Connector Example

Given below is a sample scenario that demonstrates how to work with the WSO2 Intelligent Document Processing (IDP) Connector to extract structured data from a document.

## What you'll build

This example demonstrates how to use the Intelligent Document Processing (IDP) connector to:

1.  **Process a document to extract structured data.**

    **Example**:
    Submit an invoice PDF file (`invoice_2025_07.pdf`) to extract key information such as the invoice number, vendor name, line items, and total amount into a pre-defined JSON format.

For more information about these operations, please refer to the [Intelligent Document Processing (IDP) Connector reference guide]({{base_path}}/reference/connectors/idp-connector/idp-connector-reference/).

> **Note**: Before invoking the API, you need to have credentials for the backend document processing service you intend to use (e.g., an OpenAI API key). See the [IDP Configuration]({{base_path}}/reference/connectors/idp-connector/idp-connector-configuration/) documentation for more information.

---

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

---

## Create the integration logic

1.  Click `+` on the Extension panel APIs to create the REST API. Specify the API name as `IDPProcessAPI` and the API context as `/processDocuments`.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/create_api.png" title="Creating the API" width="800" alt="Creating the API"/>

2.  Click on the `+ Resource` and fill in the details. Use a URL template called `/processDocuments` and the **POST** HTTP method.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/add_api_resource.png" title="Adding the API resource" width="800" alt="Adding the API resource"/>

3.  Click the created resource. Next, click the `+` arrow below the Start node to open the side panel. Select **Connections** and click **Add new Connection**. Search for `idp` and click.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/create_new_connection.png" title="Creating a new connection" width="800" alt="Creating a new connection"/>

4.  Create a connection as shown below. For this example, we will use an OpenAI connection.

    !!! note
        For more information on configuring connections, please refer to the [Initialize the connector guide]({{base_path}}/reference/connectors/idp-connector/idp-connector-reference/#initialize-the-connector).

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/configure_new_connection.png" title="Configuring a new connection" width="800" alt="Configuring a new connection"/>

5.  After the connection is successfully created, select the created connection in **Connections**. In the drop-down menu, click **ProcessDocuments**.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/add_process_documents_operation.png" title="Adding Process Documents operation" width="800" alt="Adding Process Documents operation"/>

6.  Next, configure the following parameters in the properties window.
    * Under **Scanner Output Schema**, click **Add new output schema** and provide an appropriate name. For this example, we have named it `schema_1`.
    * Fill in the rest of the parameters, then click the submit button.

    - **Max Tokens** - `4096`
    - **File Content** - `payload.mediate.file.$`
    - **Scanner Output Schema** - `schema_1`
    - **Response Variable** - `idp_processDocuments_1`
    - **Overwrite Message Body** - `true`
    - **Content Format** - `Base64`
    - **Mime Type** - `application/pdf`

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/configure_process_documents_operation.png" title="Configuring Process Documents operation" width="800" alt="Configuring Process Documents operation"/>

    > **Note**: Tick **Overwrite Message Body** if you want to replace the Message Body in the Message Context with the response of the operation.

    After you save the form, a panel for schema generation will automatically pop up. Alternatively, you can find your created schema under **Resources -> idp-schemas** in the Micro Integrator project explorer.

7.  Click `+` below the `ProcessDocuments` node to add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to send back the response.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp-connector/adding_respond_mediator.png" title="Adding a respond mediator" width="800" alt="Adding a respond mediator"/>

---

## Define JSON schema

1.  Download the following sample PDF file. In the schema generation UI, upload this file and then press **Extract Schema** to get an initial schema based on the document's content.

    <a href="{{base_path}}/assets/attachments/connectors/sample-invoice.pdf" download>
    <img src="{{base_path}}/assets/img/integrate/connectors/pdf-download-icon.png" width="100" alt="Download Sample PDF">
    </a>

2.  Select the **Source** view to see the JSON schema you created. You can edit the raw code directly in this view, and the changes will be reflected in the visual UI editor.

3.  Use the visual UI to change the schema as you wish. You can rename fields, change data types, or restructure the JSON. For example, you can create a new table for line items or add a nested object like `additional_info` with a `note` field inside it.

4.  Go to the **Try It** tab and upload the same PDF file again. Select your configured connection and press the **Try It** button.

5.  You can now see the extracted data in the defined JSON structure. If you are not satisfied with the results, press **Back to editor** to return to the schema view and refine the structure as needed. Repeat this process until the extracted data perfectly matches your requirements.

---

## Build and run the artifacts

Now that you have developed an integration using the Micro Integrator for the Visual studio Code plugin, it's time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

Refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

<img src="{{base_path}}/assets/img/integrate/connectors/run-button.png" title="Build and Run" width="800" alt="Build and Run"/>

---

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/idp-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the connection credentials and make other such changes before deploying and running this project.
