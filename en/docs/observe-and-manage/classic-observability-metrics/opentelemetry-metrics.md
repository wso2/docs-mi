# Exporting Metrics with OpenTelemetry

WSO2 MI can export metrics over the [OpenTelemetry Protocol (OTLP)](https://opentelemetry.io/docs/specs/otlp/), which lets you send structured metric data to any compatible observability backend.

The setup involves three steps: enabling OpenTelemetry in MI, registering the metrics handler, and configuring the metric reporter.

### Step 1 - Enable OpenTelemetry in WSO2 MI

Enable the OpenTelemetry publisher and point it to the gRPC endpoint of your OpenTelemetry Collector.

Add the following to your `deployment.toml` file:

=== "Format"
    ```toml
    [opentelemetry]
    enable = true
    type = "otlp"
    host = "<hostname-of-otel-collector>"
    port = "<port-of-otel-collector>"

    # Instead of 'host' and 'port', you can use 'url' directly.
    url = "<url-of-otel-collector>"
    ```
=== "Example"
    ```toml
    [opentelemetry]
    enable = true
    type = "otlp"
    host = "localhost"
    port = 4317

    # or

    url = "http://localhost:4317"
    ```

### Step 2 - Register the metrics handler

Register the Synapse handler that intercepts messages and collects metrics.

Add the following to your `deployment.toml` file:

```toml
[[synapse_handlers]]
name = "CustomObservabilityHandler"
class = "org.wso2.micro.integrator.observability.metric.handler.MetricHandler"
```

### Step 3 - Configure the metric reporter

Configure the Metric Handler to use the OpenTelemetry reporter when formatting and sending metrics.

Add the following to your `deployment.toml` file:

```toml
[metric_handler]
metric_reporter = "org.wso2.micro.integrator.observability.metric.handler.opentelemetry.reporter.OpenTelemetryReporter"
```

Restart your WSO2 MI server. Metrics will now be collected and exported to your observability backend automatically.