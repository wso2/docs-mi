# Connecting an MI-based Integration to ICP

An integration connects to ICP by including the `icp_config` section in the `deployment.toml` with a **secret** generated from the ICP console. Once
configured, the ICP heartbeat component gets activated in MI and sends periodic heartbeats so ICP can monitor and manage the runtime.

## Prerequisites

- ICP server running and reachable on port **9446**
- An integration deployed as a composite application in MI

## 1. Generate a Secret

Sign in to the ICP console and generate a secret. There are two places to do this;
choose whichever matches your workflow.

### Option A — Organization Level

Best when you want to register a runtime before assigning it to a specific component,
or when the component does not exist in ICP yet.

1. Navigate to **Runtimes** in the sidebar.
2. Find the target environment card (e.g. *dev*) and click **Add Runtime**.
3. Click **Generate Secret**.
4. Select the **MI** tab. Copy the `deployment.toml` snippet shown.

> The secret is displayed only once. Copy it before closing the dialog.

### Option B — Project / Component Level

Best when the component already exists in ICP. The generated snippet has `project`
and `integration` pre-filled and the secret is scoped to that component.

1. Navigate to the component: **Projects → \<project\> → Components → \<component\> → Runtimes**.
2. Find the target environment card and click **Add Runtime**.
3. Click **Generate Secret**.
4. Copy the `deployment.toml` snippet shown.

## 2. Configure the MI runtime

### deployment.toml

Place the snippet in the `deployment.toml` next to your application jar, filling in any
placeholder values.

```toml
[icp_config]
enabled = true
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime = "my-runtime"
secret = "<generated secret>"
#icp_url = "https://<hostname>:9446"
```

### Field Reference

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `enabled` | yes | true | Set to `false` to disable ICP connectivity |
| `environment` | yes | — | Environment name (must match an ICP environment) |
| `project` | yes | — | Project handle in ICP |
| `integration` | yes | — | Component handle in ICP |
| `secret` | yes | — | Secret from step 1 |
| `runtime` | no | - | Display Name for this runtime instance. A separate unique runtime identifier is generated at time of connection. |
| `heartbeatInterval` | no | `10` | Seconds between heartbeats |
| `ssl_verify` | no | `true` | Enforce TLS certificate verification (non-production) |
| `icp_url` | no | `https://localhost:9445` | ICP runtime listener endpoint |


## 3. Start the MI instance

Start the MI instance using `micro-integrator.sh` or `micro-integrator.bat`.

On startup the MI server logs:

```
INFO {ICPHeartBeatComponent} - Starting ICP heartbeat service. Interval: 10s
INFO {ICPHeartBeatComponent} - Full heartbeat acknowledged by ICP.
```

The runtime now appears under **Runtimes** in the ICP console with status **RUNNING**.

## Multiple MI Nodes

Each MI node needs a unique `runtime` value but can share the same `project`,
`integration`, `environment`, and `secret`. All nodes appear as separate runtimes
under the same integration in ICP.

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

## Next Step

-   [Adding Centralized Observability in the Integration Control Plane]({{base_path}}/install-and-setup/install/adding-observability).