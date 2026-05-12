# Adding Centralized Observability in the Integration Control Plane

ICP provides centralized observability for MI runtimes. Application logs and per-request analytics are collected via Fluent Bit, stored in OpenSearch, and displayed in the ICP Console.

## Architecture

<a href="{{base_path}}/assets/img/integrate/observability/observability-icp.png" class="glightbox"><img src="{{base_path}}/assets/img/integrate/observability/observability-icp.png" width="1000"></a>

1. MI writes application logs to `wso2carbon.log` with an `[icp.runtimeId=<uuid>]` suffix on each line.
2. MI writes per-request analytics to `synapse-analytics.log` as JSON lines prefixed with `SYNAPSE_ANALYTICS_DATA`.
3. Fluent Bit tails both files and ships each to its own OpenSearch index.
4. ICP Server queries OpenSearch (filtering by runtimeId) when a user opens Logs or Metrics in the Console.

## Prerequisites

| Component | Purpose |
|-----------|---------|
| OpenSearch 2.x | Log and metrics storage |
| Fluent Bit 3.x | Log collection and forwarding |
| ICP Server 2.0.0+ | Observability API layer |
| MI 4.4.0+ | Runtime with ICP heartbeat and analytics support |

## Step 1: Deploy OpenSearch

Any single-node or clustered OpenSearch deployment works. ICP needs HTTP(S) access to the OpenSearch REST API.

Note the host, port, and credentials — you will configure them in ICP Server and Fluent Bit.

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

If your OpenSearch requires authentication, add `-u admin:<password>`. For HTTPS with self-signed certs, add `-k`.

### Metrics index — no template needed

Do **not** create an explicit template for `mi-metrics-logs-*`. OpenSearch's dynamic mapping auto-maps `icp_runtimeId` as `text` with a `.keyword` subfield, which is what ICP Server's metrics queries require.

!!! Note 
    The app logs template must map `icp_runtimeId` as `keyword` (ICP queries it with a bare `terms` filter). The metrics index must keep the dynamic mapping (`text` + `.keyword` subfield) because ICP's metrics aggregations use `icp_runtimeId.keyword`. Applying an explicit `keyword` mapping to the metrics index will break the Metrics page.

## Step 3: Configure ICP Server

Add the OpenSearch connection to `<ICP_HOME>/conf/deployment.toml`.

**These lines must appear before any `[section]` header** (lines starting with `[`). Place them at the top of the file:

```toml
opensearchUrl = "https://localhost:9200"
opensearchUsername = "admin"
opensearchPassword = "<your-opensearch-password>"
```

If OpenSearch is running without TLS (e.g. with the security plugin disabled), use `http://`:

```toml
opensearchUrl = "http://localhost:9200"
```

!!! warning
    The ICP config file ships with these keys commented out near the bottom of the file, after `[ballerina.http.traceLogAdvancedConfig]`. **Do not uncomment those lines.** Because they fall under a `[section]` header, Ballerina treats them as section-scoped values and rejects them. Always add the OpenSearch keys before the first `[section]` header.


Restart ICP Server after saving. Look for this log line to confirm:

```
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

`flow.statistics.enable` activates mediation flow statistics collection. Without it, `[analytics]` has no data to publish.

### 2. Connect to ICP

See [Connect MI Integration to ICP](connect-runtime-mi.md) for the full procedure. The minimum config:

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

| Setting | Purpose |
|---------|---------|
| `${sys:icp.runtime.log.suffix:-}` | Appends `[icp.runtimeId=<uuid>]` to each log line. The `:-` default produces nothing before the ID is initialized during startup. |
| `additivity = false` | Prevents analytics lines from also appearing in `wso2carbon.log`. |

This produces two log files:

| File | Content | OpenSearch index |
|------|---------|------------------|
| `repository/logs/wso2carbon.log` | Application logs (startup, errors, mediations) | `mi-application-logs-*` |
| `repository/logs/synapse-analytics.log` | Per-request analytics (latency, entity type, status) | `mi-metrics-logs-*` |

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

A Lua script can enrich records with metadata fields (`product`, `service_type`) and generate hash-based deduplication IDs. See `icp_server/resources/observability/opensearch-observability-dashboard/config/fluent-bit/scripts.lua` for the reference implementation.

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

**Output plugin**: Use `opensearch` (the dedicated OpenSearch output plugin).

**TLS**: Set `tls On` and `tls.verify Off` if OpenSearch uses HTTPS with a self-signed certificate. Set `tls Off` if OpenSearch runs plain HTTP (e.g. security plugin disabled).

**Auth**: `HTTP_User` and `HTTP_Passwd` are required even if OpenSearch has security disabled — Fluent Bit sends them as-is and OpenSearch ignores them.

:::note
`Replace_Dots On` converts dots in field names (e.g. `payload.apiDetails`) to underscores, which OpenSearch requires.
:::

## Verification

### Check OpenSearch indices

After MI has been running and receiving requests for a minute:

```bash
curl <opensearch-host>:9200/_cat/indices/mi-*?v
```

Expected:

```
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

```
[2026-04-29 14:59:49,781]  INFO {o.w.m.i.a.m.d.p.p.e.ElasticStatisticsPublisher} - SYNAPSE_ANALYTICS_DATA {"serverInfo":{...},"timestamp":"...","schemaVersion":1,"payload":{"entityType":"API","latency":31,"apiDetails":{...},...}} [icp.runtimeId=470d78e8-...]
```

Key payload fields used by the ICP Metrics page:

| Field | Description |
|-------|-------------|
| `payload.entityType` | `API`, `ProxyService`, `Endpoint`, `Sequence`, `InboundEndpoint` |
| `payload.latency` | Request duration in milliseconds |
| `payload.failure` | `true` if the mediation faulted |
| `payload.faultResponse` | `true` if a fault response was sent |
| `payload.apiDetails` | API name, context, method, transport (for API entities) |
| `payload.proxyServiceDetails` | Proxy service name (for ProxyService entities) |

## Index Lifecycle

Indices are created daily with a date suffix. Use [OpenSearch ISM policies](https://opensearch.org/docs/latest/im-plugin/ism/index/) to manage retention. A typical policy keeps 30 days of logs and 90 days of metrics.

## Security Notes

- In production, enable TLS on OpenSearch and set `tls On` and `tls.verify On` in Fluent Bit.
- Use dedicated OpenSearch credentials for Fluent Bit (write-only) and ICP Server (read-only).
