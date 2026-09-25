# Connect an MI-based Integration to ICP

An integration connects to ICP by including the `icp_config` section in the `deployment.toml` with a **secret** generated from the ICP console. Once
configured, the ICP heartbeat component gets activated in MI and sends periodic heartbeats so ICP can monitor and manage the runtime.

!!! Tip "Get started with Add Runtime"
    You can connect an MI runtime without first creating a project or integration in the console. Use **Add Runtime** to generate a secret, configure the MI runtime, and start it. ICP automatically creates any missing project and integration from the `project` and `integration` values in your configuration when the runtime first connects.

## Prerequisites

- ICP server running and accessible (default: `https://<ICP_HOST>:9446`)
- ICP runtime listener reachable from MI (default: `https://<ICP_HOST>:9445`). Set `icp_url` if using a different address or port.
- An integration deployed as a composite application in MI

## 1. Generate a Secret

Sign in to the ICP console at `https://<ICP_HOST>:9446`. For a first-time connection, follow **Option A — Add Runtime**. Use **Option B** if you already have an MI integration in ICP.

!!! Note
    The secret is displayed only once in either workflow. Copy the generated configuration before closing the dialog.

### Option A — Add Runtime (recommended)

Use this organization-level workflow to let ICP create the project and integration when your runtime connects.

1. On the **All Projects** landing page, click **Add Runtime** in the **No projects found** view. If projects already exist, navigate to **Runtimes** in the sidebar at the organization level, with no project or integration selected.
2. In **Runtimes**, find the target environment card (for example, **Dev**) and click **Add Runtime**. If the landing-page shortcut has already opened the dialog, check that it is for the intended environment.
3. Click **Generate Secret**.
4. Select the **MI** tab and copy the `deployment.toml` snippet, including the generated `secret`, before closing the dialog.
5. Set `project` and `integration` to the handles you want to use, for example, `my-project` and `my-integration`, and give the runtime a distinct `runtime` name. Keep the generated `environment` and `secret` values. These project and integration entries do not need to exist in ICP yet.
6. Continue to [Configure the MI runtime](#2-configure-the-mi-runtime), then start MI. ICP identifies the runtime as MI and creates any missing project and integration on its first successful connection.

### Option B — Project / Integration level

Best when the integration already exists in ICP. The generated snippet has `project`
and `integration` pre-filled and the secret is scoped to that integration.

1. On **All Projects**, open your project, then select your MI integration from the integrations table. If it does not exist yet, follow [Create a project and an MI integration](#create-a-project-and-an-mi-integration).
2. Click **Runtimes** in the integration sidebar.
3. Find the target environment card (for example, **Dev**) and click **Add Runtime**.
4. In the dialog, click **Generate Secret**.
5. Copy the `deployment.toml` snippet, including the generated `secret`, before closing the dialog. The MI configuration is shown based on the integration's selected technology. Keep the pre-filled `project`, `integration`, and `environment` values, set `runtime` to a distinct name for the MI node, and continue below.

## 2. Configure the MI runtime

### deployment.toml

Add the `[icp_config]` snippet copied from ICP to `MI_HOME/conf/deployment.toml`, or update the existing section if one is already present. The following example shows the required configuration. For **Option A**, choose the project and integration handles to create or reuse. For **Option B**, use the existing project and integration **Name** values (handles), rather than their display names. Use the generated secret in both cases.

```toml
[icp_config]
enabled = true
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime = "my-runtime"
secret = "<generated secret>"
# Uncomment and update if ICP is running on another host or runtime listener port.
# icp_url = "https://<ICP_HOST>:9445"
```

### Field reference

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `enabled` | yes | true | Set to `false` to disable ICP connectivity |
| `environment` | yes | — | Environment name (must match an ICP environment) |
| `project` | yes | — | Project handle in ICP |
| `integration` | yes | — | Integration handle in ICP |
| `secret` | yes | — | Secret from step 1 |
| `runtime` | no | — | Name displayed for this runtime in ICP. Use a distinct name for each node. This is separate from the generated UUID shown as **Runtime ID**. |
| `heartbeat_interval` | no | `10` | Seconds between heartbeats |
| `jwt_issuer` | no | `icp-runtime-jwt-issuer` | JWT issuer claim |
| `jwt_audience` | no | `icp-server` | JWT audience claim |
| `jwt_expiry_seconds` | no | `3600` | JWT token lifetime in seconds |
| `jwt_clock_skew_tolerance_ms` | no | `60000` | Clock skew tolerance in milliseconds |
| `ssl_verify` | no | `true` | Enforce TLS certificate verification (non-production) |
| `icp_url` | no | `https://localhost:9445` | ICP runtime listener endpoint. Set this to an address reachable from MI when ICP runs on another host or uses a different runtime listener port. |


## 3. Start the MI instance

Start the MI instance using `micro-integrator.sh` or `micro-integrator.bat`.

On startup the MI server logs:

```text
INFO {ICPHeartBeatComponent} - Starting ICP heartbeat service. Interval: 10s
INFO {ICPHeartBeatComponent} - Full heartbeat acknowledged by ICP.
```

The runtime now appears under **Runtimes** in the ICP console with status **RUNNING**. If you used **Option A**, return to **All Projects** and open the project and integration matching your configuration to browse the deployed artifacts.

## Create a project and an MI integration

This is an optional alternative to **Add Runtime** if you want to create and organize entries in ICP before connecting the runtime. Sign in to the ICP console and open **All Projects** under the selected organization. A project groups related integrations, and an integration represents the MI application whose runtimes you want to monitor. Creating these entries in ICP does not deploy the application to MI.

If your project and MI integration already exist, open them and continue to [Generate a Secret](#1-generate-a-secret).

### Create a project

1. On the **All Projects** page, click **Create Project**. If you already have a project, open its card and continue to [Create an MI integration](#create-an-mi-integration).
2. Enter a **Display Name**, for example, `My Project`.
3. Review the generated **Name**, for example, `my-project`. This is the project handle used as `project` in the MI configuration. To change it, click **Edit name**.
4. Optionally enter a **Description**, then click **Create**. The project page opens.

### Create an MI integration

1. On the project page, click **Create Integration** to open **Create New Integration**.
2. Enter a **Display Name**, for example, `My Integration`, and review the generated **Name**, for example, `my-integration`. This name is the integration handle used as `integration` in the MI configuration. Click **Edit name** if you need to change it.
3. Optionally enter a **Description**.
4. Under **Technology**, select **WSO2 Integrator: MI** for an application deployed in an MI runtime. The **WSO2 Integrator** option is for Ballerina-based integrations.
5. Under **Integration Type (optional)**, select a classification that describes your integration, such as **Integration as API** for an API or **Automation** for a scheduled task. You can leave this unselected.
6. Click **Create**. The integration overview opens. Continue with [Option B — Project / Integration level](#option-b-project-integration-level) below to generate a secret and connect its MI runtime. Deployed artifacts appear after the runtime connects to ICP.

## Multiple MI Nodes

Each MI node needs a unique `runtime` value but can share the same `project`,
`integration`, `environment`, and `secret`. All nodes appear as separate runtimes
under the same integration in ICP.

MI generates a runtime UUID at startup and persists it in `MI_HOME/.icp_runtime_id`.
Each node must have its own UUID. Start each node from a fresh MI distribution.
If you copy an already-started installation to create a new node, remove
`.icp_runtime_id` from the stopped **new copy** before its first startup so MI
generates a new UUID. Preserve the file on the original node. Changing only
`runtime` in a copied installation does not create a separate runtime identity.

```toml
# Node 1
[icp_config]
runtime = "mi-node-1"

# Node 2
[icp_config]
runtime = "mi-node-2"
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Full heartbeat rejected` | Wrong or revoked secret | Generate a new secret in the console |
| `Runtime shows but status is not RUNNING` | Heartbeats stopped | Check the MI process is alive and network is reachable |
| `PKIX path building failed` | Self-signed ICP certificate | Set `ssl_verify = false` (non-production) or provide the CA via `cert` |

## Next step

-   [Add Centralized Observability in the Integration Control Plane]({{base_path}}/install-and-setup/install/adding-observability-for-icp).
