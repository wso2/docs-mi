# Exporting Logs to Moesif

WSO2 MI can export logs to [Moesif](https://www.moesif.com/) using the OpenTelemetry Collector, enabling you to view and analyze MI logs in Moesif's Live Event Log.

!!! note
    To correlate logs with traces using trace IDs and span IDs, see [Exporting Logs with OpenTelemetry]({{base_path}}/observe-and-manage/classic-observability-logs/opentelemetry-logs/).

## Prerequisites

- WSO2 MI 4.6 or later
- Docker (for running the OpenTelemetry Collector)

## Step 1 - Create a Moesif account and obtain an Application ID

1. Create a [Moesif account](https://www.moesif.com/signup) if you don't already have one.

2. Once logged in, obtain your **Collector Application ID** by navigating to:

    ```
    Account → API Keys → Collector Application Id
    ```

    You'll need this Application ID to configure the OpenTelemetry Collector exporter.

## Step 2 - Configure the OpenTelemetry Collector

The OpenTelemetry Collector reads the MI log file and forwards the logs to Moesif's OTLP endpoint.

Create a file named `otel-collector-config.yaml` with the following content:

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
      value: "WSO2-MI"
      action: upsert

exporters:
  otlphttp/logs:
    logs_endpoint: https://api.moesif.net/v1/logs
    headers:
      X-Moesif-Application-Id: '<YOUR_MOESIF_APPLICATION_ID>'

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
      exporters: [ otlphttp/logs ]
```

Replace `<YOUR_MOESIF_APPLICATION_ID>` with the Collector Application ID you obtained in [Step 1](#step-1---create-a-moesif-account-and-obtain-an-application-id).

- The `filelog` receiver tails the `wso2carbon.log` file.
- The `resource` processor tags each log record with the service name `WSO2-MI`.
- The `otlphttp/logs` exporter sends logs to Moesif's OTLP HTTP endpoint with your Application ID for authentication.

For more details on Moesif's OpenTelemetry integration, see the [Moesif OpenTelemetry Integration Guide](https://www.moesif.com/docs/server-integration/open-telemetry/).

## Step 3 - Start services and verify

1. Start the OpenTelemetry Collector:

    ```bash
    docker run --rm \
      -v $(pwd)/otel-collector-config.yaml:/etc/otelcol-contrib/config.yaml \
      -v <MI_HOME>/repository/logs:/var/log/wso2mi \
      -v $(pwd)/.data:/etc/otelcol-contrib/.data \
      otel/opentelemetry-collector-contrib:latest \
      --config /etc/otelcol-contrib/config.yaml
    ```

    Replace `<MI_HOME>` with the path to your WSO2 MI installation directory.

2. Start the WSO2 MI server.

3. Make some API requests to generate log entries.

!!! note
    - Make sure the Collector has **read access** to the `wso2carbon.log` file.
    - The `file_storage` extension persists the read offset so that the Collector resumes from where it left off if restarted.

## Viewing logs in Moesif

Once both the WSO2 MI server and the OpenTelemetry Collector are running, logs will begin appearing in Moesif.

1. Log in to the [Moesif Portal](https://www.moesif.com/wrap).

2. Navigate to **Live Event Log** to see the captured log data. For more information, see the [Moesif Live Event Log documentation](https://www.moesif.com/docs/api-analytics/event-stream/).

!!! tip "See also"
    - For more details on Moesif's OpenTelemetry integration, see the [Moesif OpenTelemetry Server Integration documentation](https://www.moesif.com/docs/server-integration/open-telemetry/).
    - For metrics observability with Moesif, see [Moesif Based Metrics]({{base_path}}/observe-and-manage/classic-observability-metrics/moesif-metrics/setup/).
    - For a complete end-to-end observability setup using OpenTelemetry with other backends, see [OpenTelemetry Based Logs]({{base_path}}/observe-and-manage/classic-observability-logs/opentelemetry-logs/).
