# Intelligent Document Processing (IDP) Connector Example

The IDP Connector enables the extraction of structured data from documents using frontier models such as OpenAI, or cost-free local models powered by Ollama.

## What you'll build

This example explains how to use the IDP Connector to process an invoice image and extract key information such as purchase order number, shipping details, order information (price, quantity, size, total), and client details into a predefined, type-safe JSON schema.

You will build a REST API with a single resource `/` that accepts an invoice image and returns the extracted data.

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it. **Remember to replace the API key with your own before running the project.**

---

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **Integration Project**.

---

## Create the integration logic to extract data from an invoice image

1. Under the **Create an integration** section, select **API** to create a new REST API.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/create-api.png" title="Adding a Rest API" width="900" alt="Adding a Rest API"/>

    Provide the API name as `idpConnector` and the API context as `/idpconnector` and click on `Create`.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/create-api-idpconnector.png" title="Adding the API resource step 1." width="900" alt="Adding the API resource step 1."/>
    <br/>
    Select the newly created `idpConnector` API and click the `Edit` icon to change the API method.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/edit-resource-method.png" title="Editing the API resource." width="900" alt="Editing the API resource."/>
    <br/>
    Update the value of `method` to `Post`.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/update-to-post-method.png" title="Editing the API resource." width="900" alt="Editing the API resource."/>
    <br/>

2. Add the Intelligent Document Processing Connector to the integration project. Click on the **Add Module** icon and search for the **Intelligent Document Processing** connector. Select the connector and click on the **Download** button.

    To add the **Process Documents** operation under the API, select the **Intelligent Document Processing** connector and choose the **Process Documents** operation.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/add-idp-connector.png" title="Adding the Process Documents operation." width="700" alt="Adding the Process Documents operation."/>

3. Click on **Add new connection** to create a new OpenAI connection.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/add-new-connection.png" title="Create OpenAI Connection" width="700" alt="Create OpenAI Connection"/>

    Select **OpenAI** as the connection type and provide the connection name as `open_ai_connection`.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/idp-openai-connection.png" title="OpenAI Connection Options" width="700" alt="OpenAI Connection Options"/>

4. After creating the OpenAI connection, update the values for the Process Documents operation as follows:
    - **Connection**: `open_ai_connection`
    - **Content Format**: `Base64`
    - **MIME Type**: `image/jpeg`
    - **Content**: `payload.image`
    - **Overwrite Message Body**: `true`

    Click **Add new schema** and create a schema named `schema_1`. Then click **Add**.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/operation-parameters.png" title="Configure Process Documents" width="700" alt="Configure Process Documents"/>

5. Once you submit the document, the **IDP Connector Schema Generator** form will automatically pop up.  
   You can also access it later from **Micro Integrator Project Explorer** under `resources/idp_schemas/schema_1`.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/schema-generator-view.png" title="Schema Generator Form" width="700" alt="Schema Generator Form"/>

6. [Download sample image ZIP]({{base_path}}/assets/attachments/connectors/idp/purchase_order.zip) and extract the JPG file named `purchase_order.jpg` to use as your sample image.  
   Upload it in the schema generator form as shown below and click **Extract Schema**.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/extract-schema-example.png" title="Upload Image" width="700" alt="Upload Image"/>

    The extracted JSON schema is shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/generated-schema.png" title="Generated Schema" width="700" alt="Generated Schema"/>

    The schema will be extracted based on the image. You can edit the extracted schema as needed and verify your schema against any image or PDF.
    Refer to the [Schema Generation Reference]({{base_path}}/reference/connectors/idp-connector/idp-connector-schema-generation/) for more details on editing and validating schemas.

7. Add the [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator/) to respond with the extracted data as shown below.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/respond-mediator.png" title="Adding the respond mediator." width="700" alt="Adding the respond mediator."/>

??? note "Source view of the implemented resource"
    ```xml
    <resource methods="POST" uri-template="/">
        <inSequence>
            <idp.processDocuments configKey="open_ai_connection">
                <maxTokens>4096</maxTokens>
                <fileContent>{${payload.image}}</fileContent>
                <idpSchema>schema_1</idpSchema>
                <responseVariable>idp_processDocuments_1</responseVariable>
                <overwriteBody>true</overwriteBody>
                <contentFormat>Base64</contentFormat>
                <mimeType>image/jpeg</mimeType>
            </idp.processDocuments>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    ```

---

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/idp/IDP_Connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

---

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

---

## Test

1. Once the **Runtime Services** interface is open, you can see MI is running as below.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/tryout-view.png" title="MI Runtime" width="900" alt="MI Runtime"/>

2. Download the Postman extension for VS Code or download the Postman desktop app.  
   Once downloaded, follow these steps:
   - Set the request method to **POST**.
   - Set the URL to `http://localhost:8290/idpconnector`.
   - [Download sample request ZIP]({{base_path}}/assets/attachments/connectors/idp/request_body.zip) and extract the sample request JSON file (this contains base64 encoding of purchase_order.jpg).
   - In Postman, go to **Body > raw > JSON** and paste the extracted JSON content as the request body and Click **Send**.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/postman-request.png" title="Postman Request" width="900" alt="Postman Request"/>

3. Check the success response received from the server, and verify the extracted data in the response.

    <img src="{{base_path}}/assets/img/integrate/connectors/idp/postman-response.png" title="Postman Response" width="900" alt="Postman Response"/>

---

### Sending multipart request

Inside MI server, multipart form data is available as Base64.  
So, change the **Process Documents** operation content to `payload.mediate.image.$`. After this, restart the server.

<img src="{{base_path}}/assets/img/integrate/connectors/idp/multipart-operation-parameters.png" title="Multipart Config" width="900" alt="Multipart Config"/>

To send a multipart form request:

1. Select method as **POST**, URL as `http://localhost:8290/idpconnector`, and under **Body > form-data** set the key as `image` and select the location where you downloaded `purchase_order.jpg`.
    <img src="{{base_path}}/assets/img/integrate/connectors/idp/multipart-postman-request.png" title="Postman Multipart Response" width="900" alt="Postman Multipart Response"/>

2. Click **Send**.

You can also try with curl:

```sh
curl -X POST -F "image=@/mnt/c/garbages/Test_IDP_Connector/screenshots/example/purchase_order.jpg" http://localhost:8290/idpconnector
```
*(Change the path to your actual `purchase_order.jpg` location.)*

## What's next

* To customize this example for your own scenario, see [IDP Connector Reference Guide]({{base_path}}/reference/connectors/idp-connector/idp-connector-reference) documentation for all operation details of the connector.

