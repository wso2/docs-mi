# Monitor MI Artifacts and Logs

The WSO2 Integration Control Plane (ICP) provides a central console to monitor MI runtimes, browse deployed artifacts, view logs, and perform management tasks. Start by connecting your MI runtime to ICP.

## Connect an MI runtime to ICP

Before you begin, [install MI]({{base_path}}/install-and-setup/install/installing-mi/) and [install and start ICP]({{base_path}}/install-and-setup/install/installing-integration-control-plane/), and deploy your integration in MI.

Use **Add Runtime** to connect MI directly. You do not need to create a project or integration in the ICP console first; ICP creates any missing entries from your runtime configuration when MI connects.

### Step 1 - Generate a secret

1. Sign in to the ICP console at `https://<ICP_HOST>:9446`.
2. On the empty **All Projects** page, click **Add Runtime**. If projects already exist, open **Runtimes** in the sidebar at the organization level, with no project or integration selected.
3. Find the target environment (for example, **Dev**) and click **Add Runtime**. If the landing-page shortcut has already opened the dialog, check that it is for the intended environment.
4. Click **Generate Secret**, then select the **MI** tab.
5. Copy the generated `deployment.toml` configuration before closing the dialog. The secret is displayed only once.

### Step 2 - Configure the MI servers

Add the copied `[icp_config]` section to `<MI_HOME>/conf/deployment.toml`, or update the section if it already exists. For example:

```toml
[icp_config]
enabled     = true
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime     = "mi-node-1"
secret      = "<generated secret>"
icp_url     = "https://<ICP_HOST>:9445"
```

Keep the generated `environment` and `secret` values. Set `project` and `integration` to the handles you want to create or reuse, give each MI node a distinct `runtime` name, and set `icp_url` to the ICP runtime listener address reachable from MI.

### Step 3 - Start the MI Server

Start or restart MI to apply the configuration. Run the appropriate command from `<MI_HOME>`:

```bash
# Linux / macOS
./bin/micro-integrator.sh

# Windows
.\bin\micro-integrator.bat
```

After MI logs `Full heartbeat acknowledged by ICP.`, check that the runtime appears under **Runtimes** in the ICP console with status **RUNNING**. Return to **All Projects** to open the project and integration matching your configuration and browse their artifacts.

For detailed instructions, configuration fields, connecting multiple MI nodes, and troubleshooting, see [Connect an MI-based Integration to ICP]({{base_path}}/install-and-setup/install/connecting-an-integration-to-icp/). That guide also covers generating a secret for an existing integration and optionally creating projects and integrations in the console.

## How ICP organizes integrations

ICP follows a three-level hierarchy: organizations contain projects, and projects contain integrations. Each integration can have runtimes in multiple environments, such as Dev and Prod. ICP groups the artifacts reported by those runtimes under the corresponding integration and environment.

The ICP server communicates with the management APIs of the MI runtimes to retrieve artifact details and perform management operations.

## Navigate to Artifacts

After signing in, you land on the **All Projects** page under the Default Organization.

1. **Select a project** — Click a project card (e.g. sample-project) to open it.
2. **Select an integration** — The project page lists integrations in a table. Click a row to open the integration detail view.
3. **Browse artifacts** — The integration detail view shows one section per environment (e.g. Dev, Prod). Each environment section has two tabs:
    - **Entry Points** — APIs, proxies, inbound endpoints, and tasks.
    - **Supporting Artifacts** — Endpoints, sequences, templates, and other backing artifacts.

## Artifact categories

ICP organizes MI artifacts into two categories: **Entry Points** and **Supporting Artifacts**.

### Entry Points

Entry points are the primary interfaces through which traffic enters an integration. Within an environment section, the **Entry Points** tab is selected by default. Use the dropdown to switch between individual entry points.

<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-artifacts-entry-points-view.png" class="glightbox"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-artifacts-entry-points-view.png" alt="Monitoring dashboard - artifacts entry points view" width="1000"></a>

### Supporting Artifacts

Supporting artifacts appear in the **Supporting Artifacts** tab, organized by type in a side list. Each artifact card shows key fields and available controls.

<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-supporting-artifacts-view.png" class="glightbox"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/mi-supporting-artifacts-view.png" alt="Monitoring dashboard - supporting artifacts view" width="1000"></a>

## Capabilities of the ICP server

You can use the ICP server to perform the following administration tasks related to your WSO2 Integrator: MI-based integrations:

-   <b>Browse integration artifacts</b>

    View details of the artifacts of an integration. Within each integration, artifacts are grouped by environment and split into two tabs: Entry Points (REST APIs, proxy services, inbound endpoints, tasks) and Supporting Artifacts (endpoints, sequences, templates, message stores, connectors, data services, and more).

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

    !!! info
        To restrict the non-admin users in the ICP from updating the deployed artifacts, you can add the following configuration to the `<ICP_HOME>/conf/deployment.toml` file.

        ```toml
        [user_access]
        make_non_admin_users_read_only = true
        ```

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
