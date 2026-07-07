# Create an MCP Server

!!! note
    MCP servers are supported only from WSO2 Integrator: MI 4.6.0 onwards. Make sure the runtime version of your integration project is 4.6.0 or later.

The Model Context Protocol (MCP) is an open standard that lets AI agents and assistants discover and invoke external tools. An **MCP Server** artifact in WSO2 Integrator: MI exposes your integrations as MCP tools so that any MCP-compatible client, such as an AI agent built with the MI [AI Module]({{base_path}}/reference/connectors/ai-module/ai-module-overview/), Claude Desktop, or GitHub Copilot, can call them.

You can expose the following as MCP tools:

- **REST API operations**: expose an operation of an existing [REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) as a tool. The tool's input schema is generated automatically from the API definition.
- **Sequences**: expose an existing [sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences/) as a tool with a custom input schema.
- **New tools**: create a tool from scratch. A new sequence is created for the tool, and you design its mediation logic in the sequence designer.

When a client invokes a tool, the tool arguments are passed to the API resource or sequence as a JSON payload, and the resulting payload is returned to the client as the tool result.

The MCP server runs in the WSO2 Integrator: MI runtime as an inbound endpoint that listens on a dedicated port and serves MCP requests over the streamable HTTP transport at the `/mcp` context path.

## Create an MCP server artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. Navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Select **MCP Server** under **Other Artifacts** to open the **Create MCP Server** form.

    !!! note
        The MCP server functionality is provided by the **MCP inbound connector** (`mi-inbound-mcp`). If the connector is not already a dependency of your project, you will be prompted to add it when the form opens. Click **Yes** and wait for the download to complete.

7. Enter a unique name for the MCP server and the port it should listen on.

    <!-- TODO: screenshot of the Create MCP Server form -->
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/create-mcp-server-form.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/create-mcp-server-form.png" alt="create MCP server form" width="80%"></a>

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Server Name</td>
            <td>A unique name for the MCP server. The name must be at least 3 characters long and can only contain letters, numbers, hyphens, and underscores.</td>
        </tr>
        <tr>
            <td>Port</td>
            <td>The port the MCP server listens on. The port must not be used by another inbound endpoint in the project. The default value is <code>8300</code>.</td>
        </tr>
    </table>

    Optionally, expand the advanced configuration section to change the Cross-Origin Resource Sharing (CORS) and connection keep-alive settings:

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
        <tr>
            <td>Allow Origin</td>
            <td>The origins allowed to access the MCP server (the <code>Access-Control-Allow-Origin</code> header).</td>
            <td><code>*</code></td>
        </tr>
        <tr>
            <td>Allow Methods</td>
            <td>The HTTP methods allowed in cross-origin requests.</td>
            <td><code>GET, POST, OPTIONS</code></td>
        </tr>
        <tr>
            <td>Allow Headers</td>
            <td>The request headers allowed in cross-origin requests.</td>
            <td><code>Content-Type, Mcp-Session-Id</code></td>
        </tr>
        <tr>
            <td>Expose Headers</td>
            <td>The response headers exposed to cross-origin clients.</td>
            <td><code>Mcp-Session-Id</code></td>
        </tr>
        <tr>
            <td>Keep-Alive Interval (ms)</td>
            <td>The interval (in milliseconds) at which keep-alive messages are sent on open streaming connections.</td>
            <td><code>30000</code></td>
        </tr>
    </table>

8. Click **Create MCP Server**.

The created MCP server opens in the **Edit MCP Server** view, where you can add tools. It will also be available in the **MI Project Explorer** under **MCP Servers**.

!!! info
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure. Creating an MCP server adds two files to your integration project:

    - An inbound endpoint configuration with the server's port, context, and CORS settings, stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/inbound-endpoints` folder.
    - A local entry named `<SERVER_NAME>-mcp-config` holding the tool definitions, stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/local-entries` folder.

## Add tools to the MCP server

Tools are the operations that MCP clients can discover and invoke on your MCP server. You can add tools from the **Edit MCP Server** view, which opens right after the server is created. To open it later, go to **MI Project Explorer** > **MCP Servers** and select the MCP server.

1. Click **+ Add Tool**.

2. Select the tool type.

    <!-- TODO: screenshot of the Select Tool Type pane (From APIs / From Sequences / New Tool) -->
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/select-tool-type.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/select-tool-type.png" alt="select tool type" width="80%"></a>

    - **From APIs**: expose operations of an existing REST API in the project as tools.
    - **From Sequences**: expose existing sequences in the project as tools.
    - **New Tool**: create a tool from scratch with a new backing sequence.

3. Once you have added the tools, click **Update** to save the MCP server.

### Add tools from an API

1. On the **Add Tools from API Operations** dialog, select the API from the **Select API** dropdown.

2. Select one or more API operations to expose as tools.

    <!-- TODO: screenshot of the Add Tools from API Operations dialog with an operation selected -->
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/add-tools-from-api.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/add-tools-from-api.png" alt="add tools from API operations" width="80%"></a>

3. For each selected operation, enter a **Tool Name** (for example, `get_weather`) and a **Description**.

    !!! tip
        AI agents rely on the tool name and description to decide when to call a tool. Use a short, action-oriented name and describe clearly what the tool does and when it should be used.

4. Click **Add Selected Tools**.

The input schema of each tool is generated automatically from the API definition of the selected API: path and query parameters and the JSON request body of the operation become the tool's input arguments.

### Add tools from sequences

1. On the **Add Tools from Sequences** dialog, select one or more sequences.

2. For each selected sequence, enter a **Tool Name** and a **Description**, and optionally provide an **Input Schema (JSON)** that defines the arguments the tool accepts as a [JSON Schema](https://json-schema.org/).

    <!-- TODO: screenshot of the Add Tools from Sequences dialog -->
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/add-tools-from-sequence.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/add-tools-from-sequence.png" alt="add tools from sequences" width="80%"></a>

3. Click **Add Selected**.

When a client invokes the tool, the tool arguments are injected into the sequence as a JSON payload. The message payload at the end of the sequence is returned to the client as the tool result.

### Create a new tool from scratch

1. On the **Create New Tool** dialog, enter a **Tool Name** and a **Description**, and optionally provide an **Input Schema (JSON)**.

    <!-- TODO: screenshot of the Create New Tool dialog -->
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/create-new-tool.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-mcp-server/create-new-tool.png" alt="create new tool" width="80%"></a>

2. Click **Create Tool**.

A new sequence named `<TOOL_NAME>_tool` is created for the tool, and the sequence designer opens. Add the mediation artifacts from the palette to design the tool's logic.

## Update the MCP server configurations

1. Go to **MI Project Explorer** > **MCP Servers**.

2. Select the MCP server you want to edit. The **Edit MCP Server** view opens.

3. Update the port, CORS settings, or tools, and click **Update**.

## Source view

Click the **Show Source** (**</>**) icon located in the top right corner of VS Code to view the XML-based synapse configuration (source code) of the MCP server artifacts. The following example shows the generated inbound endpoint and local entry for an MCP server named `WeatherMCPServer` with one API-backed tool:

=== "Inbound Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="WeatherMCPServer" sequence="" onError="" class="org.wso2.carbon.inbound.sse.McpInboundListener">
        <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.mcp.port">8300</parameter>
            <parameter name="inbound.http.port">8300</parameter>
            <parameter name="inbound.http.context">/mcp</parameter>
            <parameter name="mcp.tools.localentry">WeatherMCPServer-mcp-config</parameter>
            <parameter name="inbound.behavior">listening</parameter>
            <parameter name="inbound.cors.allow.origin">*</parameter>
            <parameter name="inbound.cors.allow.methods">GET, POST, OPTIONS</parameter>
            <parameter name="inbound.cors.allow.headers">Content-Type, Mcp-Session-Id</parameter>
            <parameter name="inbound.cors.expose.headers">Mcp-Session-Id</parameter>
            <parameter name="inbound.sse.keepalive.interval">30000</parameter>
        </parameters>
    </inboundEndpoint>
    ```

=== "Local Entry"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="WeatherMCPServer-mcp-config" xmlns="http://ws.apache.org/ns/synapse">
        <mcptools>
            <tool name="get_weather">
                <api>WeatherAPI</api>
                <resource>/weather/{city}</resource>
                <method>GET</method>
                <description>Get the current weather for a city</description>
                <inputSchema><![CDATA[{"type":"object","properties":{"city":{"type":"string"}},"additionalProperties":false,"required":["city"]}]]></inputSchema>
            </tool>
        </mcptools>
    </localEntry>
    ```

For the complete list of parameters supported by the MCP inbound endpoint and the tool definition syntax, see [MCP Inbound Endpoint Properties]({{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/mcp-inbound-endpoint-properties).

## Connect to the MCP server

Once you [deploy the artifacts]({{base_path}}/develop/deploy-artifacts/) and start the server, the MCP server is available at:

```
http://<HOSTNAME>:<PORT>/mcp
```

For example, when running WSO2 Integrator: MI locally with the default port, the server URL is `http://localhost:8300/mcp`. Configure this URL in any MCP-compatible client to discover and invoke the tools you defined.

!!! tip
    You can also consume the MCP server from an AI agent built with WSO2 Integrator: MI. See [Adding MCP Tools]({{base_path}}/get-started/build-first-ai-integration/first-integration-ai-agent/#adding-mcp-tools) for instructions on connecting an agent to an MCP server.
