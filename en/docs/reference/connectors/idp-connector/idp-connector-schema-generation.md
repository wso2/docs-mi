# Intelligent Document Processing (IDP) Connector Schema Generation

The IDP Schema Generation tool enables you to create, edit, and test JSON schemas for document extraction. You can build schemas manually using the UI, extract them automatically from documents using AI, or edit them directly as JSON. Once finalized, schemas are stored in the Governance Registry.

---

## Components of IDP Schema Generation

### 1. Schema Editor

The Schema Editor lets you visually design the output schema for your document extraction. You can add fields, nested fields, tables (arrays), and object tables.

#### Supported Field Parameters

<table>
    <tr>
        <th>Parameter Name</th>
        <th>Element Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><b>name</b></td>
        <td>-</td>
        <td>The key used at runtime for this parameter.</td>
    </tr>
    <tr>
        <td><b>type</b></td>
        <td>type</td>
        <td>The output type. Supported types: <code>string</code>, <code>number</code>, <code>integer</code>, <code>boolean</code>.</td>
    </tr>
    <tr>
        <td><b>description</b></td>
        <td>description</td>
        <td>Prompt for AI to extract data for this field.</td>
    </tr>
    <tr>
        <td><b>format</b></td>
        <td>format</td>
        <td>
            Predefined formats for string fields:<br/>
            <table>
                <tr><th>Format</th><th>Description</th></tr>
                <tr><td>date-time</td><td>ISO 8601 date and time (e.g., <code>2024-06-01T12:00:00Z</code>)</td></tr>
                <tr><td>time</td><td>Time only (e.g., <code>12:00:00</code>)</td></tr>
                <tr><td>date</td><td>Date only (e.g., <code>2024-06-01</code>)</td></tr>
            </table>
        </td>
    </tr>
    <tr>
        <td><b>pattern</b></td>
        <td>pattern</td>
        <td>
            Regex pattern for validation.<br/>
            <b>Note:</b> Local Ollama models do not support regex validation. Avoid using <code>pattern</code> if you are using local Ollama models.
        </td>
    </tr>
    <tr>
        <td><b>allowed values</b></td>
        <td>enum</td>
        <td>Allowed values for the field, entered as comma-separated list.</td>
    </tr>
</table>

#### Creating a Schema Using the UI

##### Create a Field

![Field creation UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/add-new-field.png)

- Select the field parameters (`name`, `type`, etc.) and click **Add**.

##### Create Nested Field

To create a nested field, use the dot operator to specify the hierarchy. For example, if you want to create a field named `city` inside a `location` object, which itself is inside a `shop` object, enter `shop.location.city` as the field name.

- Enter `shop.location.city` as the field name.
- This will create the structure:  
  `shop` → `location` → `city`

![Nested field UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/add-new-nested-field.png)

##### Create Array (Table of Primitive Data Types)

- Go to **Tables View**.
- Add a table, select type as `string`, `integer`, etc.
- Fill in all necessary fields and click **Add**.

![Array/table UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/add-new-table.png)

##### Create Table of Objects (Array of Objects)

- Go to **Tables View**.
- Select type as `object`.
- Under **Table Items**, add all fields for the object.
- Click **Save**.

![Object table UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/add-new-object-table.png)

---

#### Extract Schema Using AI

You can extract a schema from a PDF or image using AI:

- Upload your document (PDF/image).
- Click **Extract Schema**.
- The schema is generated based on the document.

![AI extraction UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/extract-schema.png)

---

#### Edit Existing Schema Using AI

You can use the Copilot chat interface below the Schema Editor to make changes to your schema using natural language instructions.

- **Chat with Copilot** to make changes to the schema.

![Chat UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/fine-tune.png)

#### Direct JSON Editing

You can directly view and edit the raw JSON schema source.

- Click the **Show Source** icon (top-right) to view and edit the raw JSON file.

![Source code UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/source-code.png)

---

### 2. TryOut Panel

Once your schema is ready:

- Click **Go to TryOut**.

![Go to TryOut UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/go-to-tryout.png)

- Upload another document to test extraction against your schema.
- Select your connection (built-in Connection given by wso2 or custom).

![TryOut connections UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/tryout-connections.png)

- The extraction results for your uploaded document will be displayed as below.

![TryOut result UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/tryout-result.png)

---

### Managing and Editing Saved Schemas

All changes are autosaved. You can close the window at any time.

To edit a saved schema later:

- Go to **Micro Integrator Project Explorer**.
- Under **idp-schemas**, find your schema.
- Click to edit again.

![Project explorer UI placeholder]({{base_path}}/assets/img/integrate/connectors/idp/saved-schemas.png)

