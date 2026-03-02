# Set up the complete OpenTelemetry-based Observability for WSO2 Integrator: MI

This guide walks you through setting up a complete OpenTelemetry (OTel)-based observability solution for WSO2 Integrator: MI - covering **traces**, **metrics**, and **logs** in a single unified stack. By the end of this guide, you will have:

- A Grafana LGTM (Loki, Grafana, Tempo, Mimir) backend running in Docker to store and visualize all telemetry.
- An OpenTelemetry Collector receiving log data from MI and forwarding it to the LGTM stack.
- WSO2 MI configured to publish traces and metrics directly to the LGTM stack over OTLP, and to emit structured logs that the Collector can tail and forward.

!!! note "Telemetry signal configuration details"
    This guide focuses on the end-to-end LGTM setup. For the full configuration options and explanations for each telemetry signal, refer to the dedicated pages:

    - **Traces** - [Monitoring with OpenTelemetry](classic-observability-traces/monitoring-with-opentelemetry-mi.md)
    - **Metrics** - [OpenTelemetry Metrics](classic-observability-metrics/opentelemetry-metrics.md)
    - **Logs** - [OpenTelemetry Logs](classic-observability-logs/opentelemetry-logs.md)

!!! warning "Disclaimer"
    The configuration provided in this guide is intended for quick evaluation and testing only.

    It is not recommended for production use. For production-grade deployments, refer to the official best practices and security guidelines from <a target="_blank" href="https://grafana.com/docs/">Grafana</a>, <a target="_blank" href="https://opentelemetry.io/docs/collector/">OpenTelemetry Collector</a>, <a target="_blank" href="https://grafana.com/docs/loki/">Loki</a>, and <a target="_blank" href="https://prometheus.io/docs/">Mimir/Prometheus</a>.

---

## Prerequisites

- **Docker and Docker Compose**: Required to run the LGTM stack and the OpenTelemetry Collector.
- **WSO2 MI**: A running or ready-to-start WSO2 Integrator: MI installation.

---

## Step 1 - Create the OpenTelemetry Collector configuration

The OpenTelemetry Collector acts as the log-forwarding agent. It tails the MI log file and sends structured log records to the LGTM stack.

Create a file named `otel-collector-config.yaml`:

```yaml
receivers:
  filelog:
    include: [ /var/log/wso2mi/wso2carbon.log ]
    start_at: end
    storage: file_storage

processors:
  resource:
    attributes:
      - key: service.name
        value: "WSO2-SYNAPSE"
        action: upsert

exporters:
  otlp:
    endpoint: "lgtm:4317"
    tls:
      insecure: true

extensions:
  file_storage:
    directory: /etc/otelcol-contrib/.data
    create_directory: true

service:
  extensions: [ file_storage ]
  pipelines:
    logs:
      receivers: [ filelog ]
      processors: [ resource ]
      exporters: [ otlp ]
```

The `filelog` receiver tails `wso2carbon.log`, the `resource` processor tags each record with the service name, and the `otlp` exporter sends the logs to Loki through the LGTM container's built-in OTLP receiver. See [OpenTelemetry Logs](classic-observability-logs/opentelemetry-logs.md) for the full configuration reference.

---

## Step 2 - Set up the LGTM stack with Docker Compose

The Grafana <a target="_blank" href="https://github.com/grafana/docker-otel-lgtm">`docker-otel-lgtm`</a> image bundles an OpenTelemetry-compatible Grafana, Loki, Tempo, and Mimir into a single container, providing the simplest way to run a complete OpenTelemetry backend for development and testing.

Create a `docker-compose.yaml` file in the same directory as your `otel-collector-config.yaml`:

```yaml
services:
  lgtm:
    image: grafana/otel-lgtm:latest
    ports:
      - "3000:3000"
      - "4317:4317"
      - "4318:4318"
    environment:
      - OTEL_METRIC_EXPORT_INTERVAL=5000

  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    container_name: otel-collector
    volumes:
      - ./otel-collector-config.yaml:/etc/otelcol-contrib/config.yaml
      - <MI_HOME>/repository/logs:/var/log/wso2mi
      - ./otel-data:/etc/otelcol-contrib/.data
    depends_on:
      - lgtm
```

Replace `<MI_HOME>` with the absolute path to your WSO2 MI installation directory.

| Port | Purpose |
|------|---------|
| `3000` | Grafana web UI |
| `4317` | OTLP gRPC - receives traces and metrics directly from MI |
| `4318` | OTLP HTTP |

Start the stack:

```bash
docker compose up -d
```

---

## Step 3 - Configure WSO2 Integrator: MI

All configuration changes below are made in `<MI_HOME>/conf/deployment.toml` and `<MI_HOME>/conf/log4j2.properties`.

### 1. Enable flow statistics

This is required for both traces and metrics collection. Add the following to `deployment.toml`:

```toml
[mediation]
flow.statistics.enable = true
flow.statistics.capture_all = true
stat.tracer.collect_payloads = true
stat.tracer.collect_mediation_properties = true
```

### 2. Enable OpenTelemetry and point MI to the LGTM stack

The following configuration enables OTLP export of **traces** from MI directly to the LGTM container. Add the following to `deployment.toml`:

```toml
[opentelemetry]
enable = true
type = "otlp"
url = "http://localhost:4317"
```

For the full configuration reference, see [Monitoring with OpenTelemetry](classic-observability-traces/monitoring-with-opentelemetry-mi.md).

### 3. Enable metrics collection

Register the Synapse handler and metric reporter so that MI collects and exports metrics over OTLP. Add the following to `deployment.toml`:

```toml
[[synapse_handlers]]
name = "CustomObservabilityHandler"
class = "org.wso2.micro.integrator.observability.metric.handler.MetricHandler"

[metric_handler]
metric_reporter = "org.wso2.micro.integrator.observability.metric.handler.opentelemetry.reporter.OpenTelemetryReporter"
```

For a detailed explanation of these settings, see [OpenTelemetry Metrics](classic-observability-metrics/opentelemetry-metrics.md).

### 4. Inject trace context into MI logs

To correlate logs with traces in Grafana, update the `CARBON_LOGFILE` appender layout in `<MI_HOME>/conf/log4j2.properties` to include trace and span IDs:

```properties
appender.CARBON_LOGFILE.layout.pattern = [%d] %5p {% raw %}{%c}{% endraw %} - %m%ex %notEmpty{trace_id=%X{trace_id}}  %notEmpty{ span_id=%X{span_id}}%n
```

Log lines will now include trace context when requests are processed:

```log
[2023-10-25 10:00:00,000]  INFO {org.wso2.carbon.core.internal.CarbonCoreDataHolder} - Message execution started trace_id=5b8aa5a2d2c872e8321acf1234567890  span_id=1234567890abcdef
```

For additional log configuration options (e.g., adding context to the console appender), see [OpenTelemetry Logs](classic-observability-logs/opentelemetry-logs.md).

---

## Step 4 - Start MI and explore the dashboards

1. **Start WSO2 MI** using the startup script in the `bin` directory (`micro-integrator.sh` or `micro-integrator.bat`).
2. **Generate traffic** by invoking any deployed API or proxy service.
3. **Open Grafana** at <a target="_blank" href="http://localhost:3000">`http://localhost:3000`</a>.

---

## Step 5 (Optional) - Set up Grafana dashboards

To visualize MI telemetry data with pre-built dashboards, follow the instructions in [Setting Up Grafana Dashboards](viewing-cloud-native-observability-statistics.md).
   
