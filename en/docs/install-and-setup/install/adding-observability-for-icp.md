# Add Centralized Observability in the Integration Control Plane

ICP provides centralized observability for MI runtimes. Application logs and per-request analytics are collected via Fluent Bit, stored in OpenSearch, and displayed in the ICP Console.

## Architecture

<a href="{{base_path}}/assets/img/integrate/observability/observability-icp.png" class="glightbox"><img src="{{base_path}}/assets/img/integrate/observability/observability-icp.png" alt="ICP observability architecture diagram showing log and metrics flow from MI through Fluent Bit to OpenSearch and ICP Console" width="1000"></a>

1. MI writes application logs to `wso2carbon.log` with an `[icp.runtimeId=<uuid>]` suffix on each line.
2. MI writes per-request analytics to `synapse-analytics.log` as JSON lines prefixed with `SYNAPSE_ANALYTICS_DATA`.
3. Fluent Bit tails both files and ships each to its own OpenSearch index.
4. ICP Server queries OpenSearch (filtering by runtimeId) when a user opens Logs or Metrics in the Console.

## Prerequisites

<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenSearch 2.x</td>
      <td>Log and metrics storage</td>
    </tr>
    <tr>
      <td>Fluent Bit 3.x</td>
      <td>Log collection and forwarding</td>
    </tr>
    <tr>
      <td>ICP Server 2.0.0+</td>
      <td>Observability API layer</td>
    </tr>
    <tr>
      <td>MI server</td>
      <td>Runtime with ICP heartbeat and analytics support</td>
    </tr>
  </tbody>
</table>

## Step 1: Deploy OpenSearch

Any single-node or clustered OpenSearch deployment works. ICP needs HTTP(S) access to the OpenSearch REST API.

For detailed OpenSearch setup and deployment instructions, refer to the [OpenSearch Installation Guide](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/index/).


Note the host, port, and credentials — you will configure them in ICP Server and Fluent Bit.

## Step 1.1: Deploy Fluent Bit

ICP requires Fluent Bit **3.x** for log collection and forwarding to OpenSearch.

For detailed Fluent Bit setup and deployment instructions, refer to the [Fluent Bit Installation Guide](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).

Ensure your Fluent Bit instance has:
- Network connectivity to both the MI runtime (to tail log files) and OpenSearch (to forward logs)
- Appropriate permissions to read MI log files
- Sufficient disk space and memory for buffering

After deployment, you will configure Fluent Bit to tail MI's log files in Step 5.

## Step 2: Create Index Templates

Apply index templates before any data arrives to ensure correct field mappings.

### Application logs template

The `time` field must accept the timestamp format MI produces (`2026-04-29 12:01:22,874`). Add a custom date format alongside the defaults:

```bash
curl -X PUT '<opensearch-host>:9200/_index_template/wso2_mi_application_log_template' \
  -H 'Content-Type: application/json' \
  -d '{
    "index_patterns": ["mi-application-logs-*"],
    "template": {
      "mappings": {
        "properties": {
          "time": {
            "type": "date",
            "format": "yyyy-MM-dd HH:mm:ss,SSS||strict_date_optional_time||epoch_millis"
          },
          "message":        { "type": "text" },
          "icp_runtimeId":  { "type": "keyword" }
        }
      }
    }
  }'
```

!!! note "Testing only"
    The flags below are suitable for local testing. For production, use a dedicated OpenSearch user with minimal permissions, provide a trusted CA certificate (`--cacert <ca.crt>`), and avoid disabling SSL verification.

    - If your OpenSearch requires authentication, add `-u admin:<password>`.
    - For HTTPS with self-signed certs, add `-k` (skips SSL verification — not recommended for production).

### Metrics index — no template needed

**Do not** create an explicit template for `mi-metrics-logs-*`. OpenSearch's dynamic mapping will automatically map `icp_runtimeId` as `text` with a `.keyword` subfield, which is required by ICP Server metrics queries. Applying an explicit template will interfere with this automatic mapping.

!!! note
    The app logs template must map `icp_runtimeId` as `keyword` (ICP queries it with a bare `terms` filter). The metrics index must keep the dynamic mapping (`text` + `.keyword` subfield) because ICP's metrics aggregations use `icp_runtimeId.keyword`. Applying an explicit `keyword` mapping to the metrics index will break the Metrics page.

## Step 3: Configure ICP Server

Add the OpenSearch connection to `<ICP_HOME>/conf/deployment.toml`.

```toml
opensearchUrl = "https://localhost:9200"
opensearchUsername = "admin"
opensearchPassword = "<your-opensearch-password>"
```

!!! note
    Place the above config at the top of the file **before any `[section]` header** (lines starting with `[`). 

!!! warning "Testing and Development Only"
    If OpenSearch is running without TLS (e.g. with the security plugin disabled), you can use `http://` **only for testing and development**:

    ```toml
    opensearchUrl = "http://localhost:9200"
    ```

    For production deployments, always use HTTPS with proper TLS certificates and strong authentication credentials. Refer to [OpenSearch Security Best Practices](https://opensearch.org/docs/latest/security/index/) for configuring authentication, authorization, and encryption in production environments.

Restart ICP Server after saving. Look for this log line to confirm:

```text
level=INFO module=wso2/icp_server message="OpenSearch client initialized successfully"
```

## Step 4: Configure MI

Three changes are needed in the MI runtime.

### 1. Enable analytics in `deployment.toml`

```toml
[mediation]
flow.statistics.enable=true
flow.statistics.capture_all=true

[analytics]
enabled = true
```

### 2. Connect to ICP

See [Connect MI Integration to ICP](connecting-an-integration-to-icp.md) for the full procedure. The minimum config:

```toml
[icp_config]
enabled = true
icp_url = "https://<icp-server-host>:9445"
environment = "dev"
project = "my-project"
integration = "my-integration"
secret = "<key-id>.<key-material>"
```

### 3. Route analytics to a separate log file

Add a dedicated log4j2 appender so Fluent Bit can tail `synapse-analytics.log` independently of `wso2carbon.log`.

In `<MI_HOME>/conf/log4j2.properties`:

**Register the appender** — add `SYNAPSE_ANALYTICS_LOGFILE` to the `appenders` line:

```properties
appenders = SYNAPSE_ANALYTICS_LOGFILE, CARBON_CONSOLE, CARBON_LOGFILE, ...
```

**Register the logger** — add `ElasticStatisticsPublisher` to the `loggers` line:

```properties
loggers = ElasticStatisticsPublisher, AUDIT_LOG, SERVICE_LOGGER, ...
```

**Append the icp.runtimeId suffix** to `CARBON_LOGFILE.layout.pattern` so the Fluent Bit parser can extract it:

{% raw %}
```properties
appender.CARBON_LOGFILE.layout.pattern = [%d] %5p {%c} - %m %ex${sys:icp.runtime.log.suffix:-}%n
```
{% endraw %}

**Add the appender and logger definitions** at the end of the file:

{% raw %}
```properties
# Synapse analytics → separate file for Fluent Bit
appender.SYNAPSE_ANALYTICS_LOGFILE.type = RollingFile
appender.SYNAPSE_ANALYTICS_LOGFILE.name = SYNAPSE_ANALYTICS_LOGFILE
appender.SYNAPSE_ANALYTICS_LOGFILE.fileName = ${sys:logfiles.home}/synapse-analytics.log
appender.SYNAPSE_ANALYTICS_LOGFILE.filePattern = ${sys:logfiles.home}/synapse-analytics-%d{MM-dd-yyyy}.log
appender.SYNAPSE_ANALYTICS_LOGFILE.layout.type = PatternLayout
appender.SYNAPSE_ANALYTICS_LOGFILE.layout.pattern = [%d] %5p {%c} - %m %ex${sys:icp.runtime.log.suffix:-}%n
appender.SYNAPSE_ANALYTICS_LOGFILE.policies.type = Policies
appender.SYNAPSE_ANALYTICS_LOGFILE.policies.size.type = SizeBasedTriggeringPolicy
appender.SYNAPSE_ANALYTICS_LOGFILE.policies.size.size = 10MB
appender.SYNAPSE_ANALYTICS_LOGFILE.strategy.type = DefaultRolloverStrategy
appender.SYNAPSE_ANALYTICS_LOGFILE.strategy.max = 5

logger.ElasticStatisticsPublisher.name = org.wso2.micro.integrator.analytics.messageflow.data.publisher.publish.elasticsearch.ElasticStatisticsPublisher
logger.ElasticStatisticsPublisher.level = INFO
logger.ElasticStatisticsPublisher.appenderRef.SYNAPSE_ANALYTICS_LOGFILE.ref = SYNAPSE_ANALYTICS_LOGFILE
logger.ElasticStatisticsPublisher.additivity = false
```
{% endraw %}

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>${sys:icp.runtime.log.suffix:-}</code></td>
      <td>Appends <code>[icp.runtimeId=&lt;uuid&gt;]</code> to each log line. The <code>:-</code> default produces nothing before the ID is initialized during startup.</td>
    </tr>
    <tr>
      <td><code>additivity = false</code></td>
      <td>Prevents analytics lines from also appearing in <code>wso2carbon.log</code>.</td>
    </tr>
  </tbody>
</table>

This produces two log files:

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Content</th>
      <th>OpenSearch index</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>repository/logs/wso2carbon.log</code></td>
      <td>Application logs (startup, errors, mediations)</td>
      <td><code>mi-application-logs-*</code></td>
    </tr>
    <tr>
      <td><code>repository/logs/synapse-analytics.log</code></td>
      <td>Per-request analytics (latency, entity type, status)</td>
      <td><code>mi-metrics-logs-*</code></td>
    </tr>
  </tbody>
</table>

## Step 5: Configure Fluent Bit

Fluent Bit tails both MI log files and ships them to OpenSearch.

### Parsers

MI's default log4j2 `[%d]` pattern produces timestamps like `2026-04-29 12:01:22,874` (space-separated date/time, comma before milliseconds). The parser `Time_Format` must match this exactly.

```ini
# parsers.conf

[PARSER]
    Name        mi_log_parser
    Format      regex
    Regex       ^(?:TID:\s*)?\[(?<time>[^\]]+)\]\s+(?<level>\w+)\s+\{(?<class>[^}]+)\}\s+(?:\[\s*Deployed From Artifact Container:\s*(?<artifact_container>[^\]]+?)\s*\])?\s*-\s+(?<message>.*?)(?:\s+\[icp\.runtimeId=(?<icp_runtimeId>[^\]]+)\])?\s*$
    Time_Key    time
    Time_Format %Y-%m-%d %H:%M:%S,%L
    Time_Keep   On

[MULTILINE_PARSER]
    Name          mi_multiline
    Type          regex
    Flush_timeout 1000
    Rule          "start_state"  "^(?:TID:\s*)?\[[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}"  "cont"
    Rule          "cont"         "^(?!(?:TID:\s*)?\[[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2})"  "cont"

[PARSER]
    Name        mi_metrics_json_extract
    Format      regex
    Regex       SYNAPSE_ANALYTICS_DATA\s+(?<json_str>\{.*\})(?:\s+\[icp\.runtimeId=(?<icp_runtimeId>[^\]]+)\])?

[PARSER]
    Name        json
    Format      json
    Time_Keep   Off
```

The multiline parser joins Java stack traces with the preceding log line.

Key details in `mi_log_parser`:

- **`(?:TID:\s*)?`** — some MI log lines have a `TID:` prefix before the timestamp (early startup lines). The prefix is optional.
- **`(?<message>.*?)`** — lazy match so it stops before the optional runtimeId suffix.
- **`(?:\s+\[icp\.runtimeId=(?<icp_runtimeId>[^\]]+)\])?`** — extracts `icp_runtimeId` from the `[icp.runtimeId=<uuid>]` suffix appended by the log4j2 pattern. ICP uses this field to filter logs by runtime.

### Lua enrichment (optional)

A Lua script can enrich records with metadata fields (`product`, `service_type`) and generate hash-based deduplication IDs. See `<ICP_SERVER>/resources/observability/opensearch-observability-dashboard/config/fluent-bit/scripts.lua` for the reference implementation.

The pipeline works without Lua enrichment — logs and metrics will reach OpenSearch and be queryable by ICP. The Lua filters add deduplication and metadata that improve production reliability.

### Fluent Bit pipeline

```ini
# fluent-bit.conf

[SERVICE]
   Flush        1
   Log_Level    info
   Parsers_File parsers.conf

# ── MI application logs ──
[INPUT]
   Name             tail
   Path             <MI_HOME>/repository/logs/wso2carbon.log
   Tag              mi_app_logs
   multiline.parser mi_multiline
   Read_from_Head   On
   Path_Key         log_file_path

[FILTER]
   Name         parser
   Match        mi_app_logs
   Key_Name     log
   Parser       mi_log_parser
   Reserve_Data On

# ── MI analytics (metrics) ──
[INPUT]
   Name             tail
   Path             <MI_HOME>/repository/logs/synapse-analytics.log
   Tag              mi_metrics_raw
   Read_from_Head   On

[FILTER]
   Name  grep
   Match mi_metrics_raw
   Regex log SYNAPSE_ANALYTICS_DATA

[FILTER]
   Name         parser
   Match        mi_metrics_raw
   Key_Name     log
   Parser       mi_metrics_json_extract
   Reserve_Data Off

[FILTER]
   Name         parser
   Match        mi_metrics_raw
   Key_Name     json_str
   Parser       json
   Reserve_Data On

# ── Outputs ──
[OUTPUT]
   Name               opensearch
   Match              mi_app_logs
   Host               localhost
   Port               9200
   Logstash_Format    On
   Logstash_Prefix    mi-application-logs
   Replace_Dots       On
   Suppress_Type_Name On
   tls                Off
   HTTP_User          admin
   HTTP_Passwd        <password>

[OUTPUT]
   Name               opensearch
   Match              mi_metrics_raw
   Host               localhost
   Port               9200
   Logstash_Format    On
   Logstash_Prefix    mi-metrics-logs
   Replace_Dots       On
   Suppress_Type_Name On
   tls                Off
   HTTP_User          admin
   HTTP_Passwd        <password>
```

Replace `<MI_HOME>` with the actual MI installation path. Use forward slashes on Linux, backslashes on Windows.

Adjust the following fields in each `[OUTPUT]` block to match your OpenSearch setup:

- **Output plugin**: The `Name opensearch` line uses the dedicated OpenSearch output plugin.
- **TLS**: Set `tls On` and `tls.verify Off` if OpenSearch uses HTTPS with a self-signed certificate. Set `tls Off` if OpenSearch runs plain HTTP (e.g., security plugin disabled).
- **Auth**: `HTTP_User` and `HTTP_Passwd` are required even if OpenSearch has security disabled — Fluent Bit sends them as-is and OpenSearch ignores them.

!!! note
    `Replace_Dots On` converts dots in field names (e.g. `payload.apiDetails`) to underscores, which OpenSearch requires.

## Verification

### Check OpenSearch indices

After MI has been running and receiving requests for a minute:

```bash
curl <opensearch-host>:9200/_cat/indices/mi-*?v
```

Expected:

```text
mi-application-logs-2026.04.29
mi-metrics-logs-2026.04.29
```

### Generate traffic

MI metrics are per-request. With no HTTP traffic, the Metrics page shows "No metrics data". The built-in HealthCheckAPI (`/health`) does **not** generate analytics data — you must call an actual deployed service or API.

```bash
# Deploy a test API or proxy, then:
curl http://localhost:8290/<your-api-context>
```

### Check ICP Console

1. Log into the ICP Console.
2. Navigate to the project with the connected MI runtime.
3. Open **Logs** — runtime log entries with timestamps, levels, and messages.
4. Open **Metrics** — request count, latency charts, and most-used APIs table.

## Troubleshooting

<table>
    <tr>
        <th>Symptom</th>
        <th>Cause</th>
        <th>Fix</th>
    </tr>
    <tr>
        <td>Logs/Metrics page shows "Observability Service Not Configured"</td>
        <td>ICP Server's OpenSearch connection not configured</td>
        <td>Add <code>opensearchUrl</code>, <code>opensearchUsername</code>, <code>opensearchPassword</code> <strong>before the first <code>[section]</code> header</strong> in ICP's <code>deployment.toml</code> and restart</td>
    </tr>
    <tr>
        <td>Metrics page shows "No metrics data"</td>
        <td>No HTTP traffic sent to MI</td>
        <td>Metrics are per-request — send traffic to a deployed API/proxy first</td>
    </tr>
    <tr>
        <td>Metrics page shows "No metrics data"</td>
        <td><code>flow.statistics.enable</code> not set</td>
        <td>Add <code>[mediation] flow.statistics.enable=true</code> to MI's <code>deployment.toml</code></td>
    </tr>
    <tr>
        <td>Metrics page shows "No metrics data"</td>
        <td><code>[analytics] enabled</code> not set</td>
        <td>Add <code>[analytics] enabled = true</code> to MI's <code>deployment.toml</code></td>
    </tr>
    <tr>
        <td>Metrics page shows "No metrics data"</td>
        <td><code>icp_runtimeId</code> has an explicit <code>keyword</code> mapping on the metrics index</td>
        <td>Delete the metrics index and remove any template covering <code>mi-metrics-logs-*</code>. Let dynamic mapping create <code>text</code> + <code>.keyword</code>.</td>
    </tr>
    <tr>
        <td>Logs show "No logs found"</td>
        <td><code>icp.runtime.log.suffix</code> not in log4j2 pattern</td>
        <td>Add <code>${sys:icp.runtime.log.suffix:-}</code> to <code>CARBON_LOGFILE.layout.pattern</code></td>
    </tr>
    <tr>
        <td>Logs show "No logs found"</td>
        <td>Fluent Bit parser doesn't extract <code>icp_runtimeId</code> from app logs</td>
        <td>Verify the <code>mi_log_parser</code> regex includes the <code>(?:\s+\[icp\.runtimeId=(?&lt;icp_runtimeId&gt;[^\]]+)\])?</code> capture group. ICP filters logs by runtimeId — docs without this field are invisible.</td>
    </tr>
    <tr>
        <td>Fluent Bit parser errors: <code>invalid time format</code></td>
        <td>Parser <code>Time_Format</code> doesn't match MI log timestamps</td>
        <td>MI uses <code>%Y-%m-%d %H:%M:%S,%L</code> (space separator, comma before millis). Verify your <code>parsers.conf</code>.</td>
    </tr>
    <tr>
        <td>Fluent Bit output fails to flush (retry errors)</td>
        <td><code>tls</code> setting doesn't match OpenSearch's protocol</td>
        <td>Set <code>tls Off</code> for plain HTTP or <code>tls On</code> + <code>tls.verify Off</code> for HTTPS with self-signed certs</td>
    </tr>
    <tr>
        <td>OpenSearch rejects docs with <code>mapper_parsing_exception</code> on <code>time</code> field</td>
        <td>Index template date format doesn't accept MI's timestamp format</td>
        <td>Add <code>yyyy-MM-dd HH:mm:ss,SSS</code> to the template's <code>time.format</code> (see Step 2)</td>
    </tr>
    <tr>
        <td><code>synapse-analytics.log</code> is empty</td>
        <td>Analytics appender/logger not configured in log4j2</td>
        <td>Add <code>ElasticStatisticsPublisher</code> logger routing to <code>SYNAPSE_ANALYTICS_LOGFILE</code></td>
    </tr>
    <tr>
        <td><code>synapse-analytics.log</code> missing <code>[icp.runtimeId=...]</code></td>
        <td>log4j2 pattern missing suffix</td>
        <td>Add <code>${sys:icp.runtime.log.suffix:-}</code> to the analytics appender pattern</td>
    </tr>
</table>

## MI Analytics Data Format

Each analytics line in `synapse-analytics.log` looks like:

```text
[2026-04-29 14:59:49,781]  INFO {o.w.m.i.a.m.d.p.p.e.ElasticStatisticsPublisher} - SYNAPSE_ANALYTICS_DATA {"serverInfo":{...},"timestamp":"...","schemaVersion":1,"payload":{"entityType":"API","latency":31,"apiDetails":{...},...}} [icp.runtimeId=470d78e8-...]
```

Key payload fields used by the ICP Metrics page:

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>payload.entityType</code></td>
      <td><code>API</code>, <code>ProxyService</code>, <code>Endpoint</code>, <code>Sequence</code>, <code>InboundEndpoint</code></td>
    </tr>
    <tr>
      <td><code>payload.latency</code></td>
      <td>Request duration in milliseconds</td>
    </tr>
    <tr>
      <td><code>payload.failure</code></td>
      <td><code>true</code> if the mediation faulted</td>
    </tr>
    <tr>
      <td><code>payload.faultResponse</code></td>
      <td><code>true</code> if a fault response was sent</td>
    </tr>
    <tr>
      <td><code>payload.apiDetails</code></td>
      <td>API name, context, method, transport (for API entities)</td>
    </tr>
    <tr>
      <td><code>payload.proxyServiceDetails</code></td>
      <td>Proxy service name (for ProxyService entities)</td>
    </tr>
  </tbody>
</table>

## Index lifecycle

Indices are created daily with a date suffix. Use [OpenSearch ISM policies](https://opensearch.org/docs/latest/im-plugin/ism/index/) to manage retention. A typical policy keeps 30 days of logs and 90 days of metrics.

## Security notes

- In production, enable TLS on OpenSearch and set `tls On` and `tls.verify On` in Fluent Bit.
- Use dedicated OpenSearch credentials for Fluent Bit (write-only) and ICP Server (read-only).
