# Set up OpenTelemetry-based Metrics Publishing for WSO2 Integrator: MI

This guide walks you through setting up an OpenTelemetry (OTel)-based observability solution for WSO2 Integrator: MI. You will configure the MI runtime to publish metrics using the OpenTelemetry protocol (OTLP) and use a unified Grafana LGTM (Loki, Grafana, Tempo, Mimir) stack to visualize the data.

!!! Warning "Disclaimer"
    The configuration provided in this guide is intended for quick evaluation and testing of OpenTelemetry Grafana-based observability with a WSO2 Integrator: MI.

    It is not recommended for production use. For production grade deployments, refer to the official best practices and security guidelines from <a target="_blank" href="https://grafana.com/docs/">Grafana</a>, <a target="_blank" href="https://prometheus.io/docs/">Prometheus</a>, <a target="_blank" href="https://grafana.com/docs/loki/">Loki</a>, <a target="_blank" href="https://opentelemetry.io/docs/collector/">OpenTelemetry Collector</a>.
---

## Prerequisites

* **Docker:** Ensure Docker is installed and running on your machine to easily spin up the backend services.

---

## Step 1 - Set up the LGTM stack using Docker

To visualize the metrics, we will use the Grafana LGTM stack. The Grafana `docker-otel-lgtm` project provides an open-source backend for OpenTelemetry in a single Docker image. This project is the easiest way to set up an OpenTelemetry backend with an OpenTelemetry Collector, Grafana, Loki, Mimir, and Tempo for self-managed development, demo, and testing environments.

### 1. Configure the OpenTelemetry Collector

To read the text file and transform it into a structured OpenTelemetry log record, we will use the `filelog` receiver's operator pipeline. Operators perform specific transformations sequentially.

Create a file named `otel-collector-config.yaml` and add the following configuration:

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

### 2. Set up the LGTM stack with Docker Compose
Create a `docker-compose.yaml` file with the following content to define the LGTM service and the OpenTelemetry Collector:

```yaml
services:
  lgtm:
    image: grafana/otel-lgtm:latest
    ports:
      - "3000:3000"  # Grafana UI
      - "4317:4317"  # OTLP gRPC
      - "4318:4318"  # OTLP HTTP
    environment:
      - OTEL_METRIC_EXPORT_INTERVAL=5000

  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    container_name: otel-collector
    volumes:
      - <path_to_otel_collector_config>:/etc/otelcol-contrib/config.yaml
      - <MI_HOME>/repository/logs:/var/log/wso2mi
      - <path_to_data_directory>:/etc/otelcol-contrib/.data
    depends_on:
      - lgtm
```

Replace `<path_to_otel_collector_config>` with the actual path to your `otel-collector-config.yaml` file, `<MI_HOME>` with the path to your WSO2 MI installation, and `<path_to_data_directory>` with a local directory path for the Collector's file storage.


The above Docker Compose configuration exposes the following essential ports:

* `3000`: Grafana UI
* `4317`: OTLP gRPC receiver
* `4318`: OTLP HTTP receiver

---

## Step 2 - Configure WSO2 Integrator: MI

Next, you need to configure your WSO2 MI instance to capture statistics and publish them to the OpenTelemetry endpoint.

Open your `<MI_HOME>/conf/deployment.toml` file and add the following configurations:

### 1. Enable flow statistics and tracing

Enable the internal statistics engine to capture flow metrics and payloads.

```toml
[mediation]
flow.statistics.enable = true
flow.statistics.capture_all = true
stat.tracer.collect_payloads = true
stat.tracer.collect_mediation_properties = true

```

### 2. Enable and configure OpenTelemetry

Enable the OpenTelemetry publisher and point it to the gRPC endpoint exposed by your LGTM container (`localhost:4317`).

```toml
[opentelemetry]
enable = true
logs = true
type = "otlp"
url = "http://localhost:4317"

```

### 3. Register the metrics handler

Register the specific Synapse handler that will intercept the messages and generate the observability metrics.

```toml
[[synapse_handlers]]
name="CustomObservabilityHandler"
class="org.wso2.micro.integrator.observability.metric.handler.MetricHandler"

```

### 4. Configure the metric reporter

Specify the OpenTelemetry reporter class so that the Metric Handler knows how to format and dispatch the collected metrics.

```toml
[metric_handler]
metric_reporter="org.wso2.micro.integrator.observability.metric.handler.opentelemetry.reporter.OpenTelemetryReporter"

```

---

## Step 3 - Publish and parse WSO2 MI logs with OpenTelemetry Collector

To achieve full observability, it is crucial to correlate your metrics and distributed traces with your application logs. By extracting the execution context (trace and span IDs) from your logs, you can seamlessly navigate from a failed trace directly to the corresponding log lines in your LGTM stack.

To do this, we will configure the WSO2 Integrator: MI to inject trace context into the logs, and then use the OpenTelemetry Collector's `filelog` receiver to parse and forward them.

### 1. Update WSO2 MI log configuration

First, you need to update the MI log formatter to append the active trace and span IDs to each log line.

Open the `<MI_HOME>/conf/log4j2.properties` file and update the `CARBON_LOGFILE` appender layout pattern:

```properties
appender.CARBON_LOGFILE.layout.pattern = [%d] %5p {% raw %}{%c}{% endraw %} - %m%ex %notEmpty{trace_id=%X{trace_id}}  %notEmpty{ span_id=%X{span_id}}%n

```

Start your WSO2 MI server. Your log lines will now look similar to this when a request is processed:
`[2023-10-25 10:00:00,000]  INFO {org.wso2.carbon.core.internal.CarbonCoreDataHolder} - Message execution started trace_id=5b8aa5a2d2c872e8321acf1234567890   span_id=1234567890abcdef`

Once running, the Collector will automatically tail your `wso2carbon.log`, and export it directly to Loki (via the LGTM OpenTelemetry receiver).

---

## Step 4 - Start MI and view the dashboards

1. **Start WSO2 MI**: Start your Micro Integrator instance using the usual startup script in the `bin` directory (`micro-integrator.sh` or `micro-integrator.bat`).
2. **Generate Traffic**: Invoke a few of your deployed APIs or proxy services to generate telemetry data.
3. **Access Grafana**: Log in to `http://localhost:3000` using your web browser.
4. **Navigate to Dashboards**: Navigate to the pre-configured dashboards to view your published OpenTelemetry metrics, traces, and logs.