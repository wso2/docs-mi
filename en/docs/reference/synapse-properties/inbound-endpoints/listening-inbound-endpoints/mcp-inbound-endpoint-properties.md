# MCP Inbound Endpoint

## Introduction

!!! note
    The MCP inbound endpoint is supported only from WSO2 Integrator: MI 4.6.0 onwards.

The MCP inbound endpoint exposes integrations deployed in WSO2 Integrator: MI as [Model Context Protocol (MCP)](https://modelcontextprotocol.io) tools that AI agents and assistants can discover and invoke. It starts a listener on a dedicated port and serves MCP requests over the streamable HTTP transport at the `/mcp` context path.

The tools exposed by the server are defined in a separate local entry that the inbound endpoint references through the `mcp.tools.localentry` parameter. Each tool is backed by either a REST API resource or a sequence:

- **API-backed tools**: the tool invokes a resource of a REST API deployed in the same server. The tool arguments are mapped to the resource's path and query parameters and JSON request body.
- **Sequence-backed tools**: the tool arguments are injected into the sequence as a JSON payload, and the message payload at the end of the sequence is returned as the tool result.

The MCP inbound endpoint is provided by the **MCP inbound connector** (`mi-inbound-mcp`) and is configured as a custom (class-based) inbound endpoint using the `org.wso2.carbon.inbound.sse.McpInboundListener` class.

!!! info
    The recommended way to create an MCP server is through the MI for VS Code extension, which generates both the inbound endpoint and the tools local entry. See [Create an MCP Server]({{base_path}}/develop/creating-artifacts/creating-an-mcp-server).

### Protocol support

The endpoint implements MCP protocol version `2024-11-05` and supports the following JSON-RPC methods: `initialize`, `notifications/initialized`, `tools/list`, `tools/call`, and `ping`.

MCP clients send JSON-RPC messages as HTTP `POST` requests to the `/mcp` path. A `GET` request with the `Accept: text/event-stream` header opens a Server-Sent Events (SSE) stream for server-to-client messages. Sessions are tracked using the `Mcp-Session-Id` HTTP header. Keep-alive comments are sent periodically on open SSE streams to prevent idle connections from being closed by intermediaries.

## Syntax

=== "Inbound Endpoint"
    ```xml
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

=== "Tools Local Entry"
    ```xml
    <localEntry key="WeatherMCPServer-mcp-config" xmlns="http://ws.apache.org/ns/synapse">
        <mcptools>
            <tool name="get_weather">
                <api>WeatherAPI</api>
                <resource>/weather/{city}</resource>
                <method>GET</method>
                <description>Get the current weather for a city</description>
                <inputSchema><![CDATA[{"type":"object","properties":{"city":{"type":"string"}},"additionalProperties":false,"required":["city"]}]]></inputSchema>
            </tool>
            <tool name="convert_currency">
                <sequence>CurrencyConversionSequence</sequence>
                <description>Convert an amount from one currency to another</description>
                <inputSchema><![CDATA[{"type":"object","properties":{"amount":{"type":"number"},"from":{"type":"string"},"to":{"type":"string"}},"additionalProperties":false,"required":["amount","from","to"]}]]></inputSchema>
            </tool>
        </mcptools>
    </localEntry>
    ```

## Properties

### Required Properties

Listed below are the required properties when configuring an MCP inbound endpoint.

<table>
   <thead>
      <tr>
         <th>Property</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>class</td>
         <td>The inbound endpoint implementation class. This must be set to <code>org.wso2.carbon.inbound.sse.McpInboundListener</code> (specified as the <code>class</code> attribute of the <code>inboundEndpoint</code> element).</td>
      </tr>
      <tr>
         <td>inbound.mcp.port</td>
         <td>The port on which the MCP server listens. The server fails to start if this parameter is missing or is not a valid number. By default, the port is used as-is without applying the server's port offset. To apply the port offset to inbound endpoint ports, set <code>inbound.port.offset.enable=true</code> in the <code>MI_HOME/conf/deployment.toml</code> file under <code>[synapse_properties]</code>.</td>
      </tr>
      <tr>
         <td>mcp.tools.localentry</td>
         <td>The key of the local entry that contains the <code>&lt;mcptools&gt;</code> tool definitions exposed by this server. If this parameter is not present, the <code>mcp.tools</code> parameter is read as a fallback.</td>
      </tr>
   </tbody>
</table>

### Optional Properties

Listed below are the optional properties you can configure for an MCP inbound endpoint.

<table>
   <thead>
      <tr>
         <th>Property</th>
         <th>Description</th>
         <th>Default Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>inbound.cors.allow.origin</td>
         <td>The value of the <code>Access-Control-Allow-Origin</code> response header, which defines the origins allowed to access the MCP server from a browser-based client.</td>
         <td><code>*</code></td>
      </tr>
      <tr>
         <td>inbound.cors.allow.methods</td>
         <td>The value of the <code>Access-Control-Allow-Methods</code> response header, which defines the HTTP methods allowed in cross-origin requests.</td>
         <td><code>GET, POST, OPTIONS</code></td>
      </tr>
      <tr>
         <td>inbound.cors.allow.headers</td>
         <td>The value of the <code>Access-Control-Allow-Headers</code> response header, which defines the request headers allowed in cross-origin requests.</td>
         <td><code>Content-Type, Mcp-Session-Id</code></td>
      </tr>
      <tr>
         <td>inbound.cors.expose.headers</td>
         <td>The value of the <code>Access-Control-Expose-Headers</code> response header, which defines the response headers exposed to cross-origin clients.</td>
         <td><code>Mcp-Session-Id</code></td>
      </tr>
      <tr>
         <td>inbound.sse.keepalive.interval</td>
         <td>The interval (in milliseconds) at which keep-alive comments are sent on open SSE streams. If an invalid value is provided, the default is used.</td>
         <td><code>30000</code></td>
      </tr>
   </tbody>
</table>

!!! note
    The MI for VS Code extension also generates the `inbound.http.port`, `inbound.http.context`, and `inbound.behavior` parameters for project consistency and tooling support. The MCP listener serves requests at the fixed `/mcp` context path.

## Tool definition reference

The local entry referenced by `mcp.tools.localentry` contains an `<mcptools>` element with one `<tool>` element per exposed tool.

<table>
   <thead>
      <tr>
         <th>Element</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>tool</td>
         <td>Defines a single MCP tool. The <code>name</code> attribute is the tool name advertised to MCP clients in the <code>tools/list</code> response. It is recommended to use short, action-oriented names (for example, <code>get_weather</code>).</td>
      </tr>
      <tr>
         <td>api</td>
         <td>The name of the REST API that backs this tool. Used together with <code>resource</code> and <code>method</code> for API-backed tools.</td>
      </tr>
      <tr>
         <td>resource</td>
         <td>The URI template of the API resource to invoke (for example, <code>/weather/{city}</code>). Path and query parameters in the template are populated from the tool arguments.</td>
      </tr>
      <tr>
         <td>method</td>
         <td>The HTTP method of the API resource to invoke (for example, <code>GET</code>, <code>POST</code>).</td>
      </tr>
      <tr>
         <td>sequence</td>
         <td>The name of the sequence that backs this tool. Used instead of <code>api</code>/<code>resource</code>/<code>method</code> for sequence-backed tools. The tool arguments are injected into the sequence as a JSON payload, and the message payload at the end of the sequence is returned as the tool result.</td>
      </tr>
      <tr>
         <td>description</td>
         <td>A description of what the tool does. AI agents rely on this description to decide when to call the tool, so describe its purpose and usage clearly.</td>
      </tr>
      <tr>
         <td>inputSchema</td>
         <td>A <a href="https://json-schema.org/">JSON Schema</a> (wrapped in a CDATA section) describing the arguments the tool accepts. For API-backed tools created with the MI for VS Code extension, this schema is generated automatically from the API definition.</td>
      </tr>
   </tbody>
</table>
