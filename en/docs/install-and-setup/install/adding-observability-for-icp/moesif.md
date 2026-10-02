# Set up Moesif Observability in the Integration Control Plane

With Moesif, Fluent Bit publishes MI metrics and application logs to a Moesif application. ICP embeds Moesif canvases and filters their data using the Runtime IDs registered for the selected integration and environment.

## Prerequisites

- ICP installed and running.
- An MI-based integration connected to ICP with its runtime shown as **RUNNING**.
- A [Moesif account](https://www.moesif.com/wrap/basic).
- Docker with Docker Compose on a host that can read the MI log files.
- Permission to edit or manage the integration in ICP.
- Network access from Fluent Bit to `https://api.moesif.net`, from ICP to `https://api.moesif.com`, and from the browser to `https://www.moesif.com`.

## Step 1: Prepare Moesif

1. Sign in to Moesif and create one application for each ICP environment that you want to observe.
2. Open **Account > Settings > API Keys** and copy the application's **Collector Application ID**.

Use the same Moesif application for metrics and logs in an ICP environment. ICP stores the canvas configuration per environment, so integrations in that environment share it. Repeat the setup for each additional environment.

You will use two different credentials:

| Credential | Where to use it | Purpose |
|------------|-----------------|---------|
| **Collector Application ID** | The `.env` files in the downloaded Fluent Bit bundles | Publishes metrics and logs to Moesif |
| **Management API Key** | The **Management API Key** field on either the **Metrics** or **Logs** page in ICP | Allows ICP to load both embedded canvases for the environment |

## Step 2: Publish metrics

MI writes per-request analytics to `synapse-analytics.log`. The Fluent Bit bundle available in the ICP console reads this file, converts the records to Moesif actions, and adds the ICP Runtime ID used by the canvas filter.

### Configure MI analytics

1. Add the following to `<MI_HOME>/conf/deployment.toml`. Replace `<UNIQUE_MI_SERVER_ID>` with an identifier that is unique among the MI servers publishing to this Moesif application.

    ```toml
    [mediation]
    flow.statistics.enable=true
    flow.statistics.capture_all=true

    [analytics]
    enabled=true
    publisher="log"
    id="<UNIQUE_MI_SERVER_ID>"
    prefix="SYNAPSE_ANALYTICS_DATA"
    api_analytics.enabled=true
    proxy_service_analytics.enabled=true
    sequence_analytics.enabled=true
    endpoint_analytics.enabled=true
    inbound_endpoint_analytics.enabled=true
    ```

2. In `<MI_HOME>/conf/log4j2.properties`, add `SYNAPSE_ANALYTICS_APPENDER` to the existing `appenders` list and `SynapseAnalytics` to the existing `loggers` list.

3. Add the following appender and logger definitions:

    {% raw %}
    ```properties
    appender.SYNAPSE_ANALYTICS_APPENDER.type = RollingFile
    appender.SYNAPSE_ANALYTICS_APPENDER.name = SYNAPSE_ANALYTICS_APPENDER
    appender.SYNAPSE_ANALYTICS_APPENDER.fileName = ${sys:carbon.home}/repository/logs/synapse-analytics.log
    appender.SYNAPSE_ANALYTICS_APPENDER.filePattern = ${sys:carbon.home}/repository/logs/synapse-analytics-%d{MM-dd-yyyy}-%i.log
    appender.SYNAPSE_ANALYTICS_APPENDER.layout.type = PatternLayout
    appender.SYNAPSE_ANALYTICS_APPENDER.layout.pattern = %d{HH:mm:ss,SSS} [%X{ip}-%X{host}] [%t] %5p %c{1} %m%n
    appender.SYNAPSE_ANALYTICS_APPENDER.policies.type = Policies
    appender.SYNAPSE_ANALYTICS_APPENDER.policies.time.type = TimeBasedTriggeringPolicy
    appender.SYNAPSE_ANALYTICS_APPENDER.policies.time.interval = 1
    appender.SYNAPSE_ANALYTICS_APPENDER.policies.time.modulate = true
    appender.SYNAPSE_ANALYTICS_APPENDER.policies.size.type = SizeBasedTriggeringPolicy
    appender.SYNAPSE_ANALYTICS_APPENDER.policies.size.size=1000MB
    appender.SYNAPSE_ANALYTICS_APPENDER.strategy.type = DefaultRolloverStrategy
    appender.SYNAPSE_ANALYTICS_APPENDER.strategy.max = 10

    logger.SynapseAnalytics.name = org.wso2.micro.integrator.analytics.messageflow.data.publisher.publish.elasticsearch.ElasticStatisticsPublisher
    logger.SynapseAnalytics.level = INFO
    logger.SynapseAnalytics.additivity = false
    logger.SynapseAnalytics.appenderRef.SYNAPSE_ANALYTICS_APPENDER.ref = SYNAPSE_ANALYTICS_APPENDER
    ```
    {% endraw %}

4. Restart MI and send requests to a deployed API, proxy service, sequence, endpoint, or inbound endpoint to generate analytics records.

### Start the metrics sidecar

1. In ICP, open the project and MI integration, then select **Runtimes**. Copy the **Runtime ID** of the runtime in the target environment.
2. Select **Metrics**, choose the target environment, and select **Moesif** if the provider selector is shown. If the canvas is already linked, click **View Configurations**.
3. Expand **Step 02: Publish metrics from your runtime** and click **Download Fluent Bit config**.
4. Extract `moesif-fluent-bit.zip` and update its `.env` file:

    ```dotenv
    MOESIF_APPLICATION_ID=<MOESIF_COLLECTOR_APPLICATION_ID>
    MI_HOME=<MI_HOME>
    ICP_RUNTIME_ID=<RUNTIME_ID>
    LOG_FILE_PATH=/logs/synapse-analytics.log
    MOESIF_HOST=api.moesif.net
    FLUENT_BIT_HTTP_PORT=2020
    ```

    - `MI_HOME` is the absolute path to the MI installation. Docker mounts its `repository/logs` directory into the sidecar.
    - `ICP_RUNTIME_ID` is the **Runtime ID** copied from ICP, not the runtime display name or the analytics `id` configured above.
    - Change `FLUENT_BIT_HTTP_PORT` if port `2020` is already used by another metrics sidecar.
    - On Windows, use a Windows-style host path and enable the drive in Docker Desktop file sharing.

5. From the extracted directory, start Fluent Bit:

    ```bash
    docker compose up -d
    ```

6. Check the sidecar output:

    ```bash
    docker compose logs -f fluent-bit
    ```

The bundle handles one runtime. Run a separate metrics sidecar for each MI runtime, using that runtime's `MI_HOME`, `ICP_RUNTIME_ID`, and an available `FLUENT_BIT_HTTP_PORT`. The sidecar starts reading at the end of the analytics log on its first run, so generate new requests after starting it.

## Step 3: Publish application logs

MI writes server logs to `<MI_HOME>/repository/logs/wso2carbon.log` by default; no MI logging change is required. Use the separate logs bundle in ICP to send those entries to Moesif.

1. In the integration, select **Logs**, choose the target environment, and select **Moesif** if the provider selector is shown. If the canvas is already linked, click **View Configurations**.
2. Expand **Step 02: Publish logs from your runtime** and click **Download Fluent Bit config**.
3. Extract `moesif-fluent-bit-mi-logs.zip` and update its `.env` file:

    ```dotenv
    MOESIF_APPLICATION_ID=<MOESIF_COLLECTOR_APPLICATION_ID>
    MI_HOME=<MI_HOME>
    ICP_RUNTIME_ID=<RUNTIME_ID>
    MOESIF_HOST=api.moesif.net
    ```

4. From the extracted directory, start Fluent Bit and inspect its output:

    ```bash
    docker compose up -d
    docker compose logs -f fluent-bit
    ```

The logs bundle also handles one runtime. Run a separate logs sidecar for each MI runtime and set `ICP_RUNTIME_ID` to the runtime whose `wso2carbon.log` is mounted. The sidecar starts reading at the end of the file on its first run, so generate new log entries after starting it.

## Step 4: Load the canvases in ICP

After data starts flowing, create a **Management API Key** in the same Moesif application. Give it the **access_tokens: create** and **events: read** scopes.

1. Open either the integration's **Metrics** or **Logs** page and expand **Step 03: Load the dashboard**.
2. Paste the key into **Management API Key**, then click **Link canvas**.
3. Open the other observability page for the same environment and confirm that its canvas loads without asking for the key again.

ICP stores one Management API Key per environment. Supplying it from either setup flow configures both the metrics and logs canvases, including for other integrations in that environment. ICP derives the Moesif organization and application from the key and obtains a short-lived token for each embedded canvas. After linking, use **View Configurations** to review the publishing steps or update the shared credentials.

!!! note
    Treat the Management API Key and sidecar `.env` files as secrets. Updating the key from either canvas changes the shared credentials for the entire environment.

## Step 5: Verify the setup

1. Send requests to an API or service deployed in MI and generate an application log entry.
2. Confirm that actions and logs arrive in the Moesif application for the environment.
3. In ICP, open **Metrics** and **Logs**, select the corresponding environment and runtimes, and choose a time range that includes the new requests.
4. Confirm that the embedded canvases show the new data.

The built-in HealthCheckAPI (`/health`) does not generate analytics records. Call a deployed API or proxy service when verifying metrics.

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| The metrics canvas is empty | Confirm that statistics and analytics are enabled, `synapse-analytics.log` contains new `SYNAPSE_ANALYTICS_DATA` entries, and the metrics sidecar is running. Generate requests after starting the sidecar. |
| The logs canvas is empty | Confirm that the logs sidecar mounts the correct MI installation and that `wso2carbon.log` received new entries after the sidecar started. |
| Data exists in Moesif but is missing in ICP | Check the selected environment, runtime, and time range. Confirm that each sidecar's `ICP_RUNTIME_ID` exactly matches the **Runtime ID** shown in ICP. Recreate the sidecar with `docker compose up -d` after changing `.env`, then generate new data. |
| Linking a canvas fails | Use a Management API Key with both required scopes from the same application as the Collector Application ID. Confirm that ICP can reach the Moesif Management API and that your user can edit or manage the integration. |
| Moesif setup is not shown | Confirm that Moesif is enabled in both ICP Server and the ICP console. For an already linked canvas, select **Moesif** if the provider selector is shown, then click **View Configurations**. |

## What's next

- [Connect an MI-based integration to ICP](../connecting-an-integration-to-icp.md)
- [Work with the Integration Control Plane]({{base_path}}/observe-and-manage/working-with-integration-control-plane/)
