# Intelligent Document Processing (IDP) Connector Reference

The following operation allows you to work with the Intelligent Document Processing Connector. Click the operation name to see parameter details and samples on 
how to use it.

---

## Connection configurations

The IDP connector allows you to work with any OpenAI-compatible endpoints. Some tested LLMs are listed below. If you want to use a different LLM endpoint than those listed, choose the custom LLM connection option.

- <b>OpenAI</b>: Standard OpenAI endpoints.
- <b>Ollama</b>: Local LLMs served via Ollama server.
- <b>Custom LLM</b>: Any other OpenAI-compatible endpoint.

<img src="{{base_path}}/assets/img/integrate/connectors/idp/llm-connections.png" title="types of llm connections" width="700" alt="types of llm connections"/>

Regardless of the endpoint, all endpoints use the same set of common configurations as below. 

??? note "Common configs to all connection types"

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Element</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>Connection Name</td>
            <td>name</td>
            <td>String</td>
            <td>A unique name to identify the connection.</td>
            <td>-</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>API Key</td>
            <td>apiKey</td>
            <td>String</td>
            <td>The API key used to authenticate with the LLM endpoint.</td>
            <td>-</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>Model</td>
            <td>model</td>
            <td>String</td>
            <td>
                The multimodal LLM model that supports structured responses.<br/>
                <b>Examples:</b> <br/>
                - OpenAI: <code>gpt-4o-mini</code> or higher<br/>
                - Ollama: <code>qwen2.5vl:3b</code>
            </td>
            <td>
                OpenAI: <code>gpt-4.1-mini</code><br/>
                Ollama: <code>qwen2.5vl:3b</code>
            </td>
            <td>No</td>
        </tr>
        <tr>
            <td>Endpoint URL</td>
            <td>endpointUrl</td>
            <td>String</td>
            <td>
                The endpoint URL of any OpenAI-compatible service.<br/>
                <b>Examples:</b> <br/>
                - OpenAI: <code>https://api.openai.com/v1/chat/completions</code><br/>
                - Ollama: <code>http://localhost:11434/v1/chat/completions</code>
            </td>
            <td>
                OpenAI: <code>https://api.openai.com/v1/chat/completions</code><br/>
                Ollama: <code>http://localhost:11434/v1/chat/completions</code>
            </td>
            <td>No</td>
        </tr>
    </table>

    !!!note
        - The `model` should be a multimodal model (especially for Ollama) that can process both images and text. Refer to [Ollama multimodal models](https://ollama.com/blog/multimodal-models).
        - The model should be capable of producing structured outputs (for example, OpenAI GPT-4.0 and above). See the [OpenAI models documentation](https://platform.openai.com/docs/models) for more details.

    **Sample configuration**

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="ollama_connection_1" xmlns="http://ws.apache.org/ns/synapse">
        <idp.init>
            <connectionType>OLLAMA</connectionType>
            <apiKey>ollama</apiKey>
            <model>qwen2.5vl:3b</model>
            <endpointUrl>http://localhost:11434/v1/chat/completions</endpointUrl>
            <name>ollama_connection_1</name>
        </idp.init>
    </localEntry>
    ``` 
---

!!! Tip
    If you experience a socket timeout error (especially when using Ollama server), increase the HTTP socket timeout in the `<PRODUCT_HOME>/conf/deployment.toml` file as shown below:

    ```toml
    [transport.http]
    socket_timeout = 1200000   # timeout in milliseconds
    ```

## Document Processing

??? note "processDocuments"
    The `processDocuments` operation submits a document to the configured backend service for data extraction based on a defined schema.
    <table>
    <tr>
        <th>Parameter Name</th>
        <th>Element</th>
        <th>Type</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>Connection</td>
        <td>configKey</td>
        <td>String</td>
        <td>The LLM connection to use for document processing.</td>
        <td>-</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Content Format</td>
        <td>contentFormat</td>
        <td>String</td>
        <td>
            The format of the input file content.<br/>
            <b>Allowed values:</b> <code>Base64</code>, <code>Data URI</code>.<br/>
            <b>Note:</b> In MI server, multipart form data will be available as Base64. If you are sending an image as form data, use <code>Base64</code>.
        </td>
        <td>Base64</td>
        <td>No</td>
    </tr>
    <tr>
        <td>MIME Type</td>
        <td>mimeType</td>
        <td>String</td>
        <td>
            The MIME type of the file being processed.<br/>
            <b>Allowed values (when using Base64):</b> <code>image/png</code>, <code>image/jpeg</code>, <code>image/gif</code>, <code>image/webp</code>, <code>application/pdf</code>
        </td>
        <td>-</td>
        <td>No</td>
    </tr>
    <tr>
        <td>Content</td>
        <td>fileContent</td>
        <td>String</td>
        <td>
            The content of the image or PDF to be processed, based on the selected content format.<br/>
            <b>Note:</b> If you send the image or PDF as form data, it can be captured using <code>payload.mediate.&lt;key&gt;.$</code>.
        </td>
        <td>-</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Schema</td>
        <td>idpSchema</td>
        <td>String</td>
        <td>
            The predefined schema for data extraction.<br/>
            If you do not have a schema, click <b>+Add new schema</b>. Refer to the <a href="{{base_path}}/reference/connectors/idp-connector/idp-connector-schema-generation/">Schema Generation Reference</a> for more information.
        </td>
        <td>-</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Max Tokens</td>
        <td>maxTokens</td>
        <td>Integer</td>
        <td>The maximum number of tokens to generate in the completion.</td>
        <td>4096</td>
        <td>No</td>
    </tr>
    <tr>
        <td>Response Variable</td>
        <td>responseVariable</td>
        <td>String</td>
        <td>Name of the variable to which the output of the operation should be assigned.</td>
        <td>-</td>
        <td>No</td>
    </tr>
    <tr>
        <td>Overwrite Body</td>
        <td>overwriteBody</td>
        <td>Boolean</td>
        <td>Replace the Message Body in the Message Context with the response of the operation.</td>
        <td>false</td>
        <td>No</td>
    </tr>
</table>

**Sample configuration**

```xml
<idp.processDocuments configKey="ollama_connection_1">
    <maxTokens>4096</maxTokens>
    <fileContent>{${payload.mediate.file.$}}</fileContent>
    <idpSchema>schema_2</idpSchema>
    <responseVariable>idp_processDocuments_1</responseVariable>
    <overwriteBody>true</overwriteBody>
    <contentFormat>Base64</contentFormat>

    **Sample configuration**

    ```xml
    <idp.processDocuments configKey="ollama_connection_1">
        <maxTokens>4096</maxTokens>
        <fileContent>{${payload.mediate.file.$}}</fileContent>
        <idpSchema>schema_2</idpSchema>
        <responseVariable>idp_processDocuments_1</responseVariable>
        <overwriteBody>true</overwriteBody>
        <contentFormat>Base64</contentFormat>
        <mimeType>image/jpeg</mimeType>
    </idp.processDocuments>
    ```
    
    **Sample request**

    The `fileContent` is expected to be passed in the payload.

    ```json
    {
        "fileContent": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    }
    ```
