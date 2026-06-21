# Set up the Solace Environment

The Solace connector and inbound endpoint connect to a **Solace PubSub+ event broker**. To connect, you need a running broker, a Message VPN, and a client username and password for **basic authentication**. This guide shows how to obtain them.

## Prerequisites

To follow the Solace connector and inbound endpoint examples, you need:

* **WSO2 Integrator: MI 4.6.0 or later**, with the [Micro Integrator for Visual Studio Code extension]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) installed.
* **A Solace PubSub+ broker** reachable from the machine running WSO2 Integrator: MI. You can use any of the following:
    * [Solace PubSub+ Cloud](https://console.solace.cloud/) - a free, hosted broker (recommended for trying things out).
    * [Solace PubSub+ Software (Standard Edition)](https://solace.com/products/event-broker/software/) - run locally with Docker.
* **A Message VPN** on the broker.
* **A client username and password** with permission to publish and subscribe.

### Install the required JARs

Place the following into `<MI_HOME>/lib`.

| Artifact | Version |
|---|---|
| `com.solacesystems:sol-jcsmp` | `10.30.1` |
| `org.apache.servicemix.bundles:org.apache.servicemix.bundles.jzlib` | `1.1.3_2` |

You can fetch both JARs from Maven into `lib` with:

```bash
mvn dependency:copy -Dartifact=com.solacesystems:sol-jcsmp:10.30.1 -DoutputDirectory="$MI_HOME/lib"
mvn dependency:copy -Dartifact=org.apache.servicemix.bundles:org.apache.servicemix.bundles.jzlib:1.1.3_2 -DoutputDirectory="$MI_HOME/lib"
```

## Option 1: Use Solace PubSub+ Cloud

1. Sign up for a free account at [console.solace.cloud](https://console.solace.cloud/) and create a new service (the free tier is sufficient).

2. Navigate to **Cluster Manager** -> **Services** and create the service as follows.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-cloud-create-service.png" title="Create a Solace Cloud service" width="800" alt="Create a Solace Cloud service"/>

3. Once the service is running, open it and go to the **Connect** tab. Select **Connect with Java** and click **Solace JCSMP API**.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/solace-cloud-connect-service.png" title="Create a Solace Cloud service" width="800" alt="Connect to Solace Cloud service"/>

4. Note down the following values - you will use them as the connection parameters:

    | Connection parameter | Where to find it on the **Connect** tab |
    | -------------------- | --------------------------------------- |
    | **Host URL**         | The **SMF Host** value, e.g. `tcps://mr-connection-xxxx.messaging.solace.cloud:55443` (use the `tcps://` URI for the secured port) |
    | **Message VPN**      | The **Message VPN** value |
    | **Username**         | The **Username** value |
    | **Password**         | The **Password** value |

5. The Broker Manager Quick Links can be found under the **Manage** tab to create queues.

## Option 2: Run a local broker with Docker

If you prefer to run the broker locally, start the PubSub+ Standard Edition container:

```bash
docker run -d -p 8080:8080 -p 55555:55555 -p 55443:55443 \
  --shm-size=1g \
  --env username_admin_globalaccesslevel=admin \
  --env username_admin_password=admin \
  --name solace solace/solace-pubsub-standard
```

This starts a broker with:

| Connection parameter | Default value |
| -------------------- | ------------- |
| **Host URL**         | `tcp://localhost:55555` (plain) or `tcps://localhost:55443` (TLS) |
| **Message VPN**      | `default` |
| **Username**         | `default` |
| **Password**         | `default` |

The browser-based **PubSub+ Manager** administration console is available at `http://localhost:8080` (log in with `admin` / `admin`). Use it to create queues, inspect messages, and configure cache instances.

<img src="{{base_path}}/assets/img/integrate/connectors/solace/pubsub-manager-dashboard.png" title="PubSub+ Manager dashboard" width="800" alt="PubSub+ Manager dashboard"/>

## Create a queue (for guaranteed messaging)

Direct topic messaging works without any provisioning. However, **guaranteed (persistent) messaging**, used by the queue and transaction examples, requires a durable queue on the broker.

1. Open **PubSub+ Manager** (`http://localhost:8080` for Docker, or the **Manage** tab in PubSub+ Cloud).
2. Select your Message VPN, then go to **Queues** and click **+ Queue**.
3. Create a queue named **`Q.orders`** with the default settings (non-exclusive access type is fine for the examples).
4. Repeat to create a queue named **`Q.seats`** if you want to try the request-reply over a queue.

    <img src="{{base_path}}/assets/img/integrate/connectors/solace/pubsub-manager-create-queue.png" title="Create a queue" width="800" alt="Create a queue"/>

!!! tip
    The Solace Inbound Endpoint can auto-provision its queue for you. Enable **Provision Destination** in the inbound configuration and the queue is created on the broker if it does not already exist. See the [Inbound Endpoint Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-reference/).

## Authentication

The examples in this documentation use **basic authentication**. This is the default authentication scheme (`BASIC`).

Keep the **Host URL**, **Message VPN**, **Username**, and **Password** noted above. You will enter them when you create the Solace connection.

!!! note "Other authentication schemes"
    The connector also supports **CLIENT_CERTIFICATE** (mutual TLS, where the broker derives the username from the client certificate's Common Name) and **OAUTH2** (an access token and/or OIDC ID token). These require additional broker-side configuration and are out of scope for this guide. See the [Connector Reference]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-reference/) for the full list of authentication parameters.

## What's next

* Try the **[Solace Connector Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-connector-1.x-example/)** to publish and consume messages from a mediation flow.
* Try the **[Solace Inbound Endpoint Example]({{base_path}}/reference/connectors/solace-connector/1.x/solace-inbound-endpoint-example/)** to drive a sequence from messages arriving on the broker.
