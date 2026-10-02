# Add Centralized Observability in the Integration Control Plane

ICP supports Moesif and OpenSearch for viewing logs and metrics from connected MI runtimes. Choose an observability provider and follow its setup guide.

| Provider | Metrics collection | Application log collection | Setup |
|----------|--------------------|----------------------------|-------|
| **Moesif** | Fluent Bit transforms MI analytics records and publishes them to Moesif as actions. | A separate Fluent Bit sidecar forwards `wso2carbon.log` to Moesif. | [Set up Moesif](adding-observability-for-icp/moesif.md) |
| **OpenSearch** | Fluent Bit forwards MI analytics records to OpenSearch. | Fluent Bit forwards structured application logs to OpenSearch. | [Set up OpenSearch](adding-observability-for-icp/opensearch.md) |

!!! note
    ICP stores one Moesif Management API Key per environment. Linking either the metrics or logs canvas configures both canvases for every integration in that environment.

## Prerequisites

- [Install and start ICP](installing-integration-control-plane.md).
- [Connect an MI-based integration to ICP](connecting-an-integration-to-icp.md) and confirm that its runtime is shown as **RUNNING**.

## What's next

- [Set up Moesif observability](adding-observability-for-icp/moesif.md)
- [Set up OpenSearch observability](adding-observability-for-icp/opensearch.md)
