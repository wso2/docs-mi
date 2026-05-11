# How to Transform EDI data

## What you'll build

Electronic Data Interchange (EDI) is widely used in B2B integrations for exchanging structured business data. However, modern systems often prefer formats like JSON or XML. This tutorial shows you how to bridge that gap by building an integration that accepts EDI payloads, converts them to JSON using Ballerina's EDI capabilities, applies transformation logic using the Data Mapper, and returns the processed data to the client.

The scenario uses a custom order EDI format — the same approach applies to standard formats like X12 or EDIFACT.

**Input EDI payload:**

```text
HDR*HDR123*ACME_CORP*20240519~
ITM*Pen*10~
ITM*Notebook*5~
ITM*Eraser*3~
ITM*Ruler*7~
ITM*Stapler*2~
```

This sample EDI file uses `~` as the segment delimiter and `*` as the field delimiter. The `HDR` segment contains the order ID, organization, and date. Each `ITM` segment contains an item name and quantity.

**Expected JSON output:**

```json
{
  "orderId": "HDR123",
  "organization": "ACME_CORP",
  "date": "20240519",
  "items": [
    { "item": "Pen", "quantity": 10 },
    { "item": "Notebook", "quantity": 5 },
    { "item": "Eraser", "quantity": 3 },
    { "item": "Ruler", "quantity": 7 },
    { "item": "Stapler", "quantity": 2 }
  ]
}
```

The integration flow works as follows:

1. A WSO2 Integrator: MI REST API accepts the EDI file in the request body.
2. A [Ballerina module](https://mi.docs.wso2.com/en/latest/develop/customizations/ballerina-module/overview/) (built using the Ballerina EDI tool) parses the EDI content into an intermediate JSON structure.
3. The Data Mapper mediator transforms the intermediate JSON into the final target format.
4. The result is returned to the client.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Create the EDI schema

The Ballerina EDI tool uses a JSON schema file to understand your EDI format and generate the corresponding Ballerina types and conversion functions.

Create a file named `simple_order_schema.json` with the following content. You can create it anywhere on your file system — you'll reference it in the next step.

```json
{
  "name": "SimpleOrder",
  "delimiters": {
    "segment": "~",
    "field": "*",
    "component": ":",
    "repetition": "^"
  },
  "segments": [
    {
      "code": "HDR",
      "tag": "header",
      "minOccurances": 1,
      "fields": [
        { "tag": "code" },
        { "tag": "orderId" },
        { "tag": "organization" },
        { "tag": "date" }
      ]
    },
    {
      "code": "ITM",
      "tag": "items",
      "maxOccurances": -1,
      "fields": [
        { "tag": "code" },
        { "tag": "item" },
        { "tag": "quantity", "dataType": "int" }
      ]
    }
  ]
}
```

The schema defines:

- **Delimiters** — how segments and fields are separated in the EDI file.
- **HDR segment** — maps to a `header` object containing `orderId`, `organization`, and `date`.
- **ITM segment** — maps to an `items` array where each entry has an `item` name and a `quantity` (typed as `int`).

### Step 3: Pull the Ballerina EDI tool

The Ballerina EDI tool provides the `bal edi codegen` command used to generate Ballerina types and conversion functions from your EDI schema. Pull it once before use.

```bash
bal tool pull edi
```

You can verify the installation by running `bal tool list` and confirming that `edi` appears in the output.

### Step 4: Develop the integration artifacts

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `edi-transform` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

6. Click **Create**.

#### Create the Ballerina module

1. In the **Add artifact** view, expand the artifact types and select **Ballerina Module**.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addModule.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addModule.png" alt="Select Ballerina Module" width="80%"></a>

2. In the **Create Ballerina Module** form, enter `SimpleOrder` as the **name** and click **Create**.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addBallerinaModule.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addBallerinaModule.png" alt="Create Ballerina Module Form" width="80%"></a>

3. Copy `simple_order_schema.json` (created in [Step 2](#step-2-create-the-edi-schema)) into the Ballerina module directory. Keeping the schema alongside the module source makes it easy to regenerate the code if the schema changes later.

4. From within the Ballerina module directory, run the EDI code generation tool to write the generated Ballerina record types and conversion functions directly into `SimpleOrder-module.bal`:

    ```bash
    bal edi codegen -i simple_order_schema.json -o src/main/ballerina/SimpleOrder/SimpleOrder-module.bal
    ```

    This overwrites `SimpleOrder-module.bal` with:

    - A `SimpleOrder` record type with nested `header` and `items` types.
    - A `fromEdiString` function that parses EDI text into a `SimpleOrder` record.
    - A `toEdiString` function that serializes a `SimpleOrder` record back to EDI text.

5. Open `SimpleOrder-module.bal` and add the following import at the top of the file:

    ```ballerina
    import wso2/mi;
    ```

    Then append the following MI wrapper functions at the end of the file:

    ```ballerina
    @mi:Operation
    public function convertEDItoJSON(string ediText) returns json {
        // Convert EDI string to Ballerina SimpleOrder record.
        SimpleOrder|error simpleOrder = fromEdiString(ediText);
        // Check if the conversion was successful.
        if (simpleOrder is error) {
            return {
                "error": simpleOrder.message()
            };
        }
        // Convert Ballerina SimpleOrder record to JSON.
        return simpleOrder.toJson();
    }

    @mi:Operation
    public function convertJSONtoEDI(json jsonData) returns string {
        // Convert JSON to Ballerina SimpleOrder record.
        SimpleOrder|error simpleOrder = jsonData.cloneWithType();

        // Check if the conversion was successful.
        if (simpleOrder is error) {
            return "Error converting JSON to SimpleOrder: " + simpleOrder.message();
        }
        // Convert Ballerina SimpleOrder record to EDI string.
        string|error ediString = toEdiString(simpleOrder);
        // Check if the conversion was successful.
        if (ediString is error) {
            return "Error converting SimpleOrder to EDI: " + ediString.message();
        }
        // Return the EDI string.
        return ediString;
    }
    ```

    !!! note
        The `@mi:Operation` annotation exposes each function as an operation that can be used as a mediator in your integration flow. `convertEDItoJSON` handles EDI-to-JSON conversion, and `convertJSONtoEDI` handles the reverse.

6. Click the **Build Ballerina Module** icon to build the Ballerina project.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/build.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/build.png" alt="Build Ballerina Module" width="80%"></a>

    A notification appears in the bottom-right corner of VS Code while the module is building.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/build-success.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/build-success.png" alt="Build Success Notification" width="40%"></a>

7. Once built, the module appears in the **Mediator palette** and its operations are available for use in integration flows.

#### Create the REST API

1. Navigate to the **Project Overview** page and click **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addArtifact.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addArtifact.png" alt="Select API" width="80%"></a>

2. Select **API** from the artifact list.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addAPI.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addAPI.png" alt="Select API" width="80%"></a>

3. Provide `transform` as the **API Name** and `/transform` as the **Context**, then click **Create**.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addTransformAPI.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addTransformAPI.png" alt="Add Resource Method" width="80%"></a>

4. By default, the API is created with a `GET` resource. Select the **Edit** option.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/editResourceMethod.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/editResourceMethod.png" alt="Edit Resource Method" width="80%"></a>

5. Change the method to **POST** and then click **Update**.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/changeToPOST.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/changeToPOST.png" alt="Change Method to POST" width="80%"></a>

#### Build the mediation flow

1. Click on the `POST /` resource of the `transform` API to open the flow designer.

2. Click **+** to add a new mediator and select the **convertEDItoJSON** operation from the **SimpleOrder** Ballerina module in the mediator palette.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/selectConvertToJsonAPI.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/selectConvertToJsonAPI.png" alt="Select convertEDItoJSON Operation" width="80%"></a>

3. In the mediator configuration:

    - Click the **Ex** button next to the input field and select **payload** as the source. This passes the raw EDI text from the request body to the Ballerina function.
    - Enable the **Overwrite Message Body** option so that the JSON output replaces the current message payload.
    - Click **Add**.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addBallerinaAPI.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addBallerinaAPI.png" alt="Add Artifact" width="80%"></a>

4. Click **+** again and add a **Data Mapper** mediator. When prompted, create a new Data Mapper artifact named `OrderTransform`.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/selectDataMapper.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/selectDataMapper.png" alt="Add Artifact" width="80%"></a>

5. In the Data Mapper editor, configure the input and output schemas:


    - **Input schema** — the intermediate JSON produced by `convertEDItoJSON`. Import or paste the following schema:

        ```json
        {
          "header": {
            "code": "HDR",
            "orderId": "HDR123",
            "organization": "ACME_CORP",
            "date": "20240519"
          },
          "items": [
            { "code": "ITM", "item": "Pen", "quantity": 10 },
            { "code": "ITM", "item": "Notebook", "quantity": 5 },
            { "code": "ITM", "item": "Eraser", "quantity": 3 },
            { "code": "ITM", "item": "Ruler", "quantity": 7 },
            { "code": "ITM", "item": "Stapler", "quantity": 2 }
          ]
        }
        ```

        <a href="{{base_path}}/assets/img/develop/ballerina-module/dataMapperImportInput.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/dataMapperImportInput.png" alt="Add Input JSON" width="80%"></a>

    - **Output schema** — the final JSON format expected by the client:

        ```json
        {
          "orderId": "HDR123",
          "organization": "ACME_CORP",
          "date": "20240519",
          "items": [
            { "item": "Pen", "quantity": 10 },
            { "item": "Notebook", "quantity": 5 },
            { "item": "Eraser", "quantity": 3 },
            { "item": "Ruler", "quantity": 7 },
            { "item": "Stapler", "quantity": 2 }
          ]
        }
        ```

        <a href="{{base_path}}/assets/img/develop/ballerina-module/dataMapperImportOutput.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/dataMapperImportOutput.png" alt="Add Output JSON" width="80%"></a>

6. Create the following field mappings in the Data Mapper:

    | Source                  | Target         |
    |-------------------------|----------------|
    | `header.orderId`        | `orderId`      |
    | `header.organization`   | `organization` |
    | `header.date`           | `date`         |
    | `items`                 | `items`        |

    For the `items` array mapping, map the nested `item` and `quantity` fields from the source array elements to the corresponding fields in the target array elements.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/dataMapperFinalView.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/dataMapperFinalView.png" alt="Data Mapper Final View" width="80%"></a>

7. Save the Data Mapper configuration and return to the flow designer.

8. Click **+** to add a **Respond** mediator at the end of the flow to send the transformed JSON back to the client.

    <a href="{{base_path}}/assets/img/develop/ballerina-module/addRespond.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/addRespond.png" alt="Add Respond" width="80%"></a>

9. The complete mediation flow is as follows.

    ```text
      POST /transform
        → convertEDItoJSON (Ballerina mediator)
        → OrderTransform (Data Mapper)
        → Respond
    ```

    <a href="{{base_path}}/assets/img/develop/ballerina-module/finalView.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/finalView.png" alt="Final View" width="80%"></a>

### Step 5: Run and test the integration

1. Click the **Run** icon in VS Code to start the integration project.

2. Open the integrated **Try it** feature or use a tool like Postman to send a `POST` request to `http://localhost:8290/transform` with the following EDI payload as plain text in the request body:

    ```text
    HDR*HDR123*ACME_CORP*20240519~
    ITM*Pen*10~
    ITM*Notebook*5~
    ITM*Eraser*3~
    ITM*Ruler*7~
    ITM*Stapler*2~
    ```

    <a href="{{base_path}}/assets/img/develop/ballerina-module/requestPayload.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/requestPayload.png" alt="Request Payload" width="80%"></a>

3. You should receive the following JSON response:

    ```json
    {
      "orderId": "HDR123",
      "organization": "ACME_CORP",
      "date": "20240519",
      "items": [
        { "item": "Pen", "quantity": 10 },
        { "item": "Notebook", "quantity": 5 },
        { "item": "Eraser", "quantity": 3 },
        { "item": "Ruler", "quantity": 7 },
        { "item": "Stapler", "quantity": 2 }
      ]
    }
    ```

    <a href="{{base_path}}/assets/img/develop/ballerina-module/responsePayload.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/ballerina-module/responsePayload.png" alt="Response Payload" width="80%"></a>

## What you learned

In this tutorial, you:

- Defined a custom EDI schema using the Ballerina EDI schema format.
- Used the `bal edi codegen` tool to generate Ballerina types and conversion functions for your EDI format.
- Created a Ballerina module in WSO2 Integrator: MI that exposes EDI-to-JSON and JSON-to-EDI operations using the `@mi:Operation` annotation.
- Used the Data Mapper mediator to transform the intermediate representation into the final target format.
- Built and tested a REST API that accepts EDI payloads and returns structured JSON.

This pattern applies to any EDI format — including standard formats like X12 and EDIFACT — by adjusting the schema definition used in the code generation step.
