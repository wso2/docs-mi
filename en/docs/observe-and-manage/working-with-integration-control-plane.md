# Monitoring MI Artifacts and Logs

The WSO2 Integration Control Plane (ICP) monitors the MI runtimes in a deployment. This can be a single MI runtime or multiple MI runtimes of an integration. ICP follows a three-level hierarchy i.e. organizations contain projects, and projects contain integrations. Each integration is deployed to an environment, which in turn maps to one or more runtimes. It provides a graphical view of the integration artifacts that are deployed in the MI runtimes. You can also perform various management and administration tasks using the ICP server. 

The ICP server communicates with the management APIs of each WSO2 Integrator: MI runtimes of an integration to get and manipulate data.

## Navigating to Artifacts

After signing in, you land on the **All Projects** page under the Default Organization.

1. **Select a project** — Click a project card (e.g. sample-project) to open it.
2. **Select an integration** — The project page lists integrations in a table. Click a row to open the integration detail view.
3. **Browse artifacts** — The integration detail view shows one section per environment (e.g. Dev, Prod). Each environment section has two tabs:
    - **Entry Points** — APIs, proxies, inbound endpoints, and tasks.
    - **Supporting Artifacts** — Endpoints, sequences, templates, and other backing artifacts.

## Artifact Categories

ICP organizes MI artifacts into two categories: **Entry Points** and **Supporting Artifacts**.

### Entry Points

Entry points are the primary interfaces through which traffic enters an integration. Within an environment section, the **Entry Points** tab is selected by default. Use the dropdown to switch between individual entry points.

<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-artifacts-entry-points-view.png" class="glightbox"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-artifacts-entry-points-view.png" width="1000"></a>

### Supporting Artifacts

Supporting artifacts appear in the **Supporting Artifacts** tab, organized by type in a side list. Each artifact card shows key fields and available controls.

<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-supporting-artifacts-view.png" class="glightbox"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-supporting-artifacts-view.png" width="1000"></a>

## Capabilities of the ICP server

You can use the ICP server to perform the following administration tasks related to your WSO2 Integrator: MI based integrations:

-   <b>Browse integration artifacts</b>

    View details of the artifacts of an integration. Within each integration, artifacts are grouped by environment and split into two tabs i.e. Entry Points (REST APIs, proxy services, inbound endpoints, tasks) and Supporting Artifacts (endpoints, sequences, templates, message stores, connectors, data services, and more).

-   <b>View runtime status</b>

    View the MI runtime nodes where each artifact is deployed and whether each node is online or offline.

-   <b>Control artifacts</b>

    - Enable/disable artifacts

    You can activate/deactivate the following artifacts from the ICP server: <i>Proxy Services</i>, <i>Inbound Endpoints</i>, <i>Tasks</i>, <i>Endpoints</i>, and <i>Message Processors</i> online or offline across all connected runtimes.

    - Enable tracing

    You can enable/disable tracing for the following artifacts: <i>Proxy Services</i>, <i>REST APIs</i>, <i>Endpoints</i>, <i>Sequences</i>, and <i>Inbound Endpoints</i>.

    - Enable statistics

    You can enable/disable statistics for the following artifacts: <i>Proxy Services</i>, <i>REST APIs</i>, <i>Endpoints</i>, <i>Sequences</i>, and <i>Inbound Endpoints</i>.

    !!! Note
        Control changes are applied to all MI runtimes where the artifact is deployed. If a runtime is offline at the time of the change, the update is applied when it reconnects.

-   <b>Inspect artifact source and configuration</b>

    View the raw XML definition of any artifact. For specific types, inspect additional details such as endpoint lists, WSDL definitions, configuration parameters, local entry values, or the child artifacts bundled in a Composite Application.

-   <b>Trigger scheduled tasks</b>

    Manually fire a task from the console without waiting for its schedule.

-   <b>Manage runtimes and environments</b>

    View connected MI runtime instances with their heartbeat status, version, and registration time. Create and manage environments (e.g., Dev, Prod) and generate the shared secrets used to authenticate MI runtimes.

-   <b>Download log files</b>

    You can download the log files generated for each WSO2 Integrator: MI runtime.

-   <b>Manage loggers</b>

    View and update log configurations per integration, including log levels. You can also add or remove loggers. The changes are applied across all MI runtimes of the integration.

-   <b>Manage users</b>

    You can view details of users stored in the [user store]({{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore-in-mi/). You can also add new users to the runtime.

-   <b>Observe logs and metrics for all connected MI runtimes</b>

    ICP provides centralized observability for MI runtimes. Application logs and per-request analytics are collected via Fluent Bit, stored in OpenSearch, and displayed in the ICP Console.

## Using the Integration Control Plane

Follow the steps given below to get started with the WSO2 Integration Control Plane.

### Step 1 - Download the Integration Control Plane

Download the binary distribution of the product, and then follow the instructions to start the WSO2 Integrator: MI and the ICP server.

-   [Install the WSO2 Integrator: MI]({{base_path}}/install-and-setup/install/installing-mi).
-   [Install the Integration Control Plane]({{base_path}}/install-and-setup/install/installing-integration-control-plane).

### Step 2 - Configure the MI servers

Follow the steps given below to configure the MI servers to publish data to the ICP server.

1.  Generate a secret in the ICP console.

    Sign in to the ICP console and generate a secret to authenticate the MI runtime. You can do this at organizaion level or Project/Integration level.

2.  To connect the MI runtimes with the ICP server, add the following configuration to the `deployment.toml` file (stored in the `<MI_HOME>/conf/` folder) of each runtime instance.

```toml
[icp_config]
enabled     = true
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime     = "mi-node-1"
secret      = "<generated secret>"
icp_url     = "https://<icp-host>:9445"
```

#### Field Reference

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `enabled` | yes | — | Must be `true` to activate ICP connectivity |
| `environment` | yes | — | Environment **handle** (must match an ICP environment) |
| `project` | yes | — | Project handle in ICP |
| `integration` | yes | — | Integration handle in ICP |
| `runtime` | no | auto-generated UUID | Unique identifier for this MI instance |
| `secret` | yes | — | Secret from step 1 (`<key-id>.<key-material>`) |
| `icp_url` | no | `https://localhost:9445` | ICP runtime listener endpoint |

#### Optional Fields

| Field | Default | Description |
|-------|---------|-------------|
| `heartbeat_interval` | `10` | Seconds between heartbeats |
| `jwt_issuer` | `icp-runtime-jwt-issuer` | JWT issuer claim |
| `jwt_audience` | `icp-server` | JWT audience claim |
| `jwt_expiry_seconds` | `3600` | JWT token lifetime |
| `jwt_clock_skew_tolerance_ms` | `60000` | Clock skew tolerance in milliseconds |

### Step 3 - Start the MI Server

```bash
# Linux / macOS
./bin/micro-integrator.sh

# Windows
.\bin\micro-integrator.bat
```

On successful connection you will see:

```
INFO {ICPHeartBeatComponent} - Starting ICP heartbeat service. Interval: 10s
INFO {ICPHeartBeatComponent} - Full heartbeat acknowledged by ICP.
```

The runtime now appears under **Runtimes** in the ICP console with status **RUNNING**.
