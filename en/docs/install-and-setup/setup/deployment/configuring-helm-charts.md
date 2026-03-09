# Configure Helm charts for WSO2 Integrator: MI

This guide explains how to configure Helm charts for deploying WSO2 Integrator:  MI in Kubernetes environments. Depending on your use case, you can choose which of the following configuration options are required.

## Helm Charts Repository

WSO2 provides Helm charts to simplify the deployment of WSO2 Integrator: MI and its associated components, including the Integration Control Plane (ICP).

You can find the official WSO2 Integrator: MI Helm charts repository at: <a target="_blank" href="https://github.com/wso2/helm-mi">https://github.com/wso2/helm-mi</a>

This repository contains two main Helm charts:

 -WSO2 Integrator: MI Chart (mi) – Deploys the core MI runtime.

 - Integration Control Plane Chart (icp) – Deploys the Integration Control Plane used for monitoring and managing deployed integrations.

To get started:

1. Open a terminal and navigate to the location where you want to save the local copy.

2. Clone the WSO2 Integrator: MI Git repository with Helm resources.

```bash
git clone https://github.com/wso2-enterprise/helm-mi.git
cd helm-mi
git checkout 4.4.x
```

Let's refer to the root folder of the local copy as `<HELM_HOME>`.

## Customize the Base WSO2 Integrator: MI Docker Image

There may be scenarios where you need to customize the base WSO2 Integrator: MI Docker image. For example, to include third-party dependencies or libraries in the `<MI_HOME>/lib` directory.

Depending on the scope of the customization, you can choose one of the following approaches:

- [Using MI for VS Code extension](#use-the-mi-for-vs-code-extension) - Use this approach when the customization is specific to a single integration project.
Example: Adding a custom JAR to be used as a class mediator within one integration.
- [Manually using a Dockerfile](#manually-using-a-dockerfile) - Use this approach when the customization is required across multiple integrations.
Example: Adding a JDBC driver JAR or keystores that will be used by all integration artifacts. You can create a customized MI image with these common components and use it as the base image in all your integration projects.

### Use the MI for VS Code Extension

Each integration project contains a `Dockerfile` used when building the Docker image. This file is located at the `<PROJECT_HOME>/deployment/docker` directory.  
You can edit this file to apply any required customizations, such as copying additional JARs or configuration files into the image.

<a href="{{base_path}}/assets/img/setup-and-install/vscode_docker_file.png"><img src="{{base_path}}/assets/img/setup-and-install/vscode_docker_file.png" alt="VS Code Docker" width="80%"></a>

### Manually using a Dockerfile

There may be scenarios where you need to create a customized base WSO2 Integrator: MI Docker image. For example, to include third-party dependencies such as JDBC drivers or keystores. In such cases, you can extend the official MI Docker image by creating a custom image using a Dockerfile

The example below shows how to copy custom JARs into the MI runtime's `lib` directory:

```docker
FROM docker.wso2.com/wso2mi:4.4.0

USER wso2carbon

ARG USER_HOME=/home/${USER}
ARG WSO2_SERVER_NAME=wso2mi
ARG WSO2_SERVER_VERSION=4.4.0
ARG WSO2_SERVER=${WSO2_SERVER_NAME}-${WSO2_SERVER_VERSION}
ARG WSO2_SERVER_HOME=${USER_HOME}/${WSO2_SERVER}

# copy libs
COPY --chown=wso2carbon:wso2 lib/*.jar ${WSO2_SERVER_HOME}/lib/
```

!!! Example "Explanation"
    The following command in the Dockerfile copies all `.jar` files from your local `lib/` folder into the `lib/` directory of the WSO2 Integrator: MI server image:

    ```docker
    COPY --chown=wso2carbon:wso2 lib/*.jar ${WSO2_SERVER_HOME}/lib/
    ```
    - `COPY`: Transfers all JARs from the local lib/ directory (next to the Dockerfile).

    - `--chown=wso2carbon:wso2`: Ensures correct file ownership for the runtime user.

    - `${WSO2_SERVER_HOME}/lib/`: This is the runtime library directory where the MI server loads JARs at startup.

!!! Note
    Before building the image, ensure all required JARs are placed inside a `lib/` folder alongside your Dockerfile.

Once the required changes have been done to the Dockerfile, run the following command to build the custom image. Replace `<CONTAINER_REGISTRY>`, `<IMAGE_REPO>`, and `<IMAGE_TAG>` as appropriate.

```bash
docker build . -t <CONTAINER_REGISTRY>/<IMAGE_REPO>:<IMAGE_TAG>
```

## Mount Keystore and Truststore via Kubernetes Secrets

WSO2 Integrator: MI includes self-signed certificates by default. However, when deploying to a production environment, it is strongly recommended to generate and use your own keystores.

If the keystores are not baked into the Docker image, you can mount them as a Kubernetes Secret.

### Step 1 - Create a Kubernetes Secret with the Keystores

!!! Note
    1. The Kubernetes secret should include the following JKS files
        - Primary keystore (e.g., `wso2carbon.jks`)
        - Internal keystore (e.g., `wso2internal.jks`)
        - Truststore (e.g., `client-truststore.jks`)

    2. The file names used in the secret can be customized. However, ensure you reference those exact names in the `values.yaml` file under the corresponding keystore and truststore configuration fields.

    3. For instructions on generating these keystores, see [Creating New Keystores]({{base_path}}/install-and-setup/setup/security/creating-keystores/).

In the following example, a Kubernetes secret named `jks-secret` is created with three JKS files. Replace the secret name, file names and namespace as needed.

```bash
kubectl create secret generic jks-secret \
  --from-file=wso2carbon.jks \
  --from-file=client-truststore.jks \
  --from-file=wso2internal.jks \
  -n <namespace>
```

### Step 2 - Update the Helm chart

In your `values.yaml` file, set the name of the Kubernetes secret under `wso2.deployment.JKSSecretName`:

```yaml
wso2:
  deployment:
    JKSSecretName: jks-secret
```

Then, specify the actual filenames of the keystore, truststore, and internal keystore as they were added to the Kubernetes secret. This ensures the WSO2 Integrator: MI loads the correct files at runtime.

```yaml
wso2:
  config:
    keyStore:
        primary:
            fileName: "wso2carbon.jks"
            alias: "wso2carbon"
            password: ""
            keyPassword: ""
        internal:
            fileName: "wso2internal.jks"
            alias: "wso2carbon"
            password: ""
            keyPassword: ""
    trustStore:
        primary:
            fileName: "client-truststore.jks"
            password: ""
```

!!! note
    The file names (`wso2carbon.jks`, `client-truststore.jks`, `wso2internal.jks`) must match the names you used when creating the secret with kubectl. You can use different file names, but you must reference them exactly in `values.yaml`.

## Define values for configurables

When deploying your integration to a Kubernetes cluster using the Helm chart, review the `config.properties` file in your integration project and provide values for each configurable as an environment variable.

!!! note
    As a best practice, integration developers should externalize environment-specific values using configurables. To learn more, see [Externalized Configuration]({{base_path}}/develop/externalized-configuration/).

**Set a configurable value as an environment variable**

The Helm chart for WSO2 Integrator: MI supports setting environment variables directly through the `values.yaml` file. Use this method to inject values for your configurables at deployment time.

In your `values.yaml` file, add the following under `wso2.deployment.env`:

```yaml
wso2:
  deployment:
    env:
      - name: BASE_URL
        value: https://api.dev.example.com
```

The above environment variables will be accessible to your integration through `${configs.BASE_URL}` etc.

## Secure Synapse configurations

WSO2 Integrator: MI includes Secure Vault functionality by default. However, for Kubernetes deployments, it is recommended to use **HashiCorp Vault** to securely store and manage secrets used in integration artifacts.

To configure WSO2 Integrator: MI to connect with HashiCorp Vault, update the following values in your `values.yaml` file:

```yaml
config:
  vault:
    hashicorp:
        # -- HashiCorp Vault URL
        address:
        # -- Static Token authentication. Only applicable if static token authentication.
        rootToken:
        # -- AppRole authentication roleId. Only applies if AppRole Pull authentication is used
        roleId:
        # -- AppRole authentication secretId. Only applies if AppRole Pull authentication is used
        secretId:
        # -- All resources fetched from the HashiCorp vault are cached for this number of milliseconds
        cacheableDuration: 15000
        # -- The version of the HashiCorp secret engine
        engineVersion: 2
        # -- The namespace value specified here applies globally to HashiCorp secrets in all synapse configurations
        namespace:
        # -- The Trust store that is used for SSL communication with the HashiCorp server
        trustStoreFile:
        # -- The Key store that is used for SSL communication with the HashiCorp server
        keyStoreFile:
        # -- The password of the keystore file that is used for SSL communication
        keyStorePassword:
```

For more details on how to use HashiCorp Vault with integration artifacts, refer to the [Using HashiCorp Secrets]({{base_path}}/install-and-setup/setup/security/using-hashicorp-secrets/) guide.

## Secure TOML configurations

To secure the passwords and other sensitive values used in the `deployment.toml` file of the WSO2 Integrator: MI, you need to use the **Secure vault** functionality.  
The **Internal Keystore** will be used for encryption and decryption during this process.

Follow the steps below to secure the TOML configurations:

1. Enable Secure vault.

    In your `values.yaml` file, set the following parameter to enable Secure vault:

    ```yaml
    wso2:
      config:
        secureVault:
          enabled: true
    ```

    Once enabled, all the password values provided via the Helm chart must be in encrypted format.  
    Refer to the [`[secrets]` section](https://github.com/wso2/helm-mi/blob/4.4.x/mi/confs/deployment.toml#L204) of the `deployment.toml` to identify which values require encryption.

2. Encrypt secret values.

    After identifying the values to encrypt, use the cipher tool as described in the [Encrypting Secrets using WSO2 Secure Vault]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/) documentation to generate the encrypted strings.

    Add the encrypted values back into the appropriate locations in your `values.yaml` file.

    !!! tip
        You can also use the MI CLI tool as an alternative to encrypt values. See [Encrypting Secrets with MI CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli/#encrypting-secrets-with-mi-cli) for more details.

3. Store Internal keystore password securely.

    You must add the internal keystore password (in **plain text**) to the respective **cloud provider’s secret or key management service**.  
    This value is required by the WSO2 Integrator: MI at startup to decrypt the Secure vault secrets.

4. Reference cloud provider secrets in `values.yaml`.
    
    After creating the required secret in your cloud provider, reference it in the `values.yaml` file under the appropriate provider-specific configuration block. These references will be used by the Helm chart to pass the credentials securely to the WSO2 Integrator: MI during deployment.
    
    Refer to the following guides based on your cloud environment for detailed instructions:

    - <a target="_blank" href="https://github.com/wso2/helm-mi/blob/4.4.x/mi/EXAMPLES.md#amazon-elastic-kubernetes-service-eks">Amazon Elastic Kubernetes Service (EKS)</a>
    - <a target="_blank" href="https://github.com/wso2/helm-mi/blob/4.4.x/mi/EXAMPLES.md#azure-kubernetes-service-aks">Azure Kubernetes Service (AKS)</a>
    - <a target="_blank" href="https://github.com/wso2/helm-mi/blob/4.4.x/mi/EXAMPLES.md#google-kubernetes-engine-gke">Google Kubernetes Engine (GKE)</a>

## User store configurations

In production environments, it is recommended to disable the file-based user store and configure an external RDBMS (or optionally, an LDAP) for user management.

Update the following values in your `values.yaml` file.

```yaml
wso2:
  config:
    userstore:
      file:
        # Recommended to disable for production deployments.
        enabled: false
      rdbms:
        # JDBC connection URL of the user database. Replace <DB_HOST>, <DB_PORT> and database name as needed.
        url: "jdbc:mysql://<DB_HOST>:<DB_PORT>/MI_USER_DB"
        # Database credentials.
        username: "<REPLACE>"
        password: "<REPLACE>"
        jdbc:
          # Fully qualified class name of the JDBC driver. Update based on your RDBMS.
          driver: "com.mysql.cj.jdbc.Driver"
          # Optional: JDBC connection pool parameters.
          poolParameters:
            maximumPoolSize: 10
            connectionTimeout: 30000
```

!!! Note
    1. It is recommended to **include the JDBC driver in your Docker image**, ensuring the WSO2 Integrator: MI can connect to databases without additional configuration. If you choose not to bundle the driver in the image, you must update the Helm chart to mount the driver JAR into the deployment.
    2. Ensure that the **database schema is initialized** before deploying the WSO2 Integrator: MI. Refer to [Configuring an RDBMS user store]({{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore-in-mi/#configuring-an-rdbms-user-store/) for guidance on setting up the database.

## Coordination configurations

This is an **optional configuration**, required only if you plan to deploy stateful artifacts such as Scheduled triggers, Message Processors, or Polling and Event-based Inbound Endpoints across multiple replicas. These artifacts require coordination to prevent duplicate executions and ensure consistent behavior across the cluster.

Update the following values in your `values.yaml` file.

```yaml
wso2:
  config:
    coordination:
      # -- Node ID for coordination
      nodeId: "$env{POD_NAME}"
      rdbms:
        # -- Coordination Database URL
        url: "jdbc:mysql://<DB_HOST>:<DB_PORT>/clusterdb"
        # -- Coordination Database username
        username: "<REPLACE>"
        # -- Coordination Database password
        password: "<REPLACE>"
        jdbc:
          # Fully qualified class name of the JDBC driver. Update based on your RDBMS.
          driver: "com.mysql.cj.jdbc.Driver"
```

!!! Note
    1. It is recommended to **include the JDBC driver in your Docker image**, ensuring the WSO2 Integrator: MI can connect to databases without additional configuration. If you choose not to bundle the driver in the image, you must update the Helm chart to mount the driver JAR into the deployment.
    2. Ensure that the **database schema is initialized** before deploying the WSO2 Integrator: MI. Refer to [Configuring Coordination database]({{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#database) for guidance on setting up the database.

## Analytics configuration

WSO2 Integrator: MI supports ELK-based analytics. It publishes analytics events as logs via log4j2 appenders. For cloud deployments, it is recommended to publish logs to stdout and use log collection agents such as Fluent Bit, CloudWatch Agent, or similar to stream logs to your preferred analytics backend.

For more details, see the [Elastic Stack-Based Operational Analytics for WSO2 Integrator: MI]({{base_path}}/mi-analytics/mi-elk-installation-guide/) documentation.

This section shows how to configure the Helm chart and update the `log4j2.properties` file to publish analytics events to the container output. Depending on your platform, you can modify these settings accordingly.

The following configurations will output logs similar to the example below:

```
mi-analytics : 03:01:51,399 [-] [message-flow-reporter-0-tenant--1234]  INFO ElasticStatisticsPublisher SYNAPSE_ANALYTICS_DATA {"serverInfo":{"hostname":"cloud-apis-intg-5b9f4ddf6d-c8z66","serverName":"localhost","ipAddress":"10.42.0.228","id":"cloud-apis-intg-5b9f4ddf6d-c8z66"},"timestamp":"2025-05-15T03:01:46.050Z","schemaVersion":1,"payload":{"metadata":{},"entityType":"API","failure":false,"latency":2841,"messageId":"urn:uuid:8b4b345a-6e8b-4dd8-94bb-8adec0c98b5e","correlation_id":"8b4b345a-6e8b-4dd8-94bb-8adec0c98b5e","apiDetails":{"method":"POST","apiContext":"/currencyapi","api":"CurrencyAPI","transport":"https","subRequestPath":"/"},"faultResponse":false,"entityClassName":"org.apache.synapse.api.API"}}
mi-analytics : 03:01:51,403 [-] [message-flow-reporter-0-tenant--1234]  INFO ElasticStatisticsPublisher SYNAPSE_ANALYTICS_DATA {"serverInfo":{"hostname":"cloud-apis-intg-5b9f4ddf6d-c8z66","serverName":"localhost","ipAddress":"10.42.0.228","id":"cloud-apis-intg-5b9f4ddf6d-c8z66"},"timestamp":"2025-05-15T03:01:47.152Z","schemaVersion":1,"payload":{"metadata":{},"endpointDetails":{"name":"CurrencyConverter_INTERNAL_ENDPOINT_REFERENCE"},"entityType":"Endpoint","failure":false,"latency":1708,"messageId":"urn:uuid:8b4b345a-6e8b-4dd8-94bb-8adec0c98b5e","correlation_id":"8b4b345a-6e8b-4dd8-94bb-8adec0c98b5e","faultResponse":false,"entityClassName":"org.apache.synapse.endpoints.Endpoint"}}
```

### Update the Helm chart

To enable analytics event publishing via logs, update your `values.yaml` file with the following configuration under `wso2.config`:

```yaml
wso2:
  config:
    analytics:
      # -- Enable/Disable analytics
      enabled: true
      # -- Analytics publisher (Publisher types supported are log and databridge)
      publisher: "log"
      # -- An identifier that will be published with the analytic.
      # -- You can use Kubernetes environment variables (e.g., $env{POD_NAME})
      id: ""
      # -- Prefix added when Elasticsearch analytics are being published
      prefix: "SYNAPSE_ANALYTICS_DATA"
      # -- Enable/Disable publishing API analytics data
      apiAnalytics: true
      # -- Enable/Disable publishing proxy service analytics data
      proxyServiceAnalytics: true
      # -- Enable/Disable publishing sequence analytics data
      sequenceAnalytics: true
      # -- Enable/Disable publishing endpoint analytics data
      endpointAnalytics: true
    mediation:
      flow:
        statistics:
          enable: true
          captureAll: true
```

### Update Log4J2 configuration

Open the `<HELM_HOME>/mi/confs` directory and edit the `log4j2.properties` file as follows:

1. Add `ELK_ANALYTICS_APPENDER` to the appenders list.

    ```
    appenders = ELK_ANALYTICS_APPENDER,.... (list of other available appenders)
    ```

2. Add the following configuration after the appenders:

    !!! note
        - If you're using a log aggregator like Fluent Bit or CloudWatch Agent, make sure the layout pattern is compatible with your log collector.
        - The layout pattern below prefixes each analytics log entry with `mi-analytics :` for easier identification and parsing.

    ``` log
    appender.ELK_ANALYTICS_APPENDER.type = Console
    appender.ELK_ANALYTICS_APPENDER.name = ELK_ANALYTICS_APPENDER
    appender.ELK_ANALYTICS_APPENDER.layout.type = PatternLayout
    appender.ELK_ANALYTICS_APPENDER.layout.pattern = mi-analytics : %d{HH:mm:ss,SSS} [%X{ip}-%X{host}] [%t] %5p %c{1} %m%n
    ```

3. Add ELKAnalytics to the loggers list:

    ``` log
    loggers = ELKAnalytics, ...(list of other available loggers)
    ```

4. Add the following configurations after the loggers.

    ``` log
    logger.ELKAnalytics.name = org.wso2.micro.integrator.analytics.messageflow.data.publisher.publish.elasticsearch.ElasticStatisticsPublisher
    logger.ELKAnalytics.level = DEBUG
    logger.ELKAnalytics.additivity = false
    logger.ELKAnalytics.appenderRef.ELK_ANALYTICS_APPENDER.ref = ELK_ANALYTICS_APPENDER
    ```

## Tracing configuration

WSO2 Integrator: MI supports OpenTelemetry for tracing. You can use it to export tracing data to various backends such as Jaeger, Zipkin.

Refer to the [Monitoring with OpenTelemetry]({{base_path}}/observe-and-manage/classic-observability-traces/monitoring-with-opentelemetry-mi/) guide for supported providers and configuration details.

In your `values.yaml` file, add the following under `wso2.config` to enable and configure tracing with **Jaeger**.

```yaml
wso2:
  config:
    opentelemetry:
      enable: true
      type: "jaeger"
      # -- Hostname of the OpenTelemetry tracing system
      host:
      # -- Port of the OpenTelemetry tracing system
      port:
      # -- Url of the OpenTelemetry tracing system. Instead of ‘host’ and ‘port’, ‘url’ can be used
      url:
    mediation:
      flow:
        statistics:
          captureAll: true
        tracer:
          collectPayloads: true
          collectMediationProperties: true
```

## Resource naming convention

Kubernetes artifacts generated by the Helm chart will follow the naming convention shown below.

```
<CLOUD_NAME>-<RELEASE_NAME>
```

 - **CLOUD_NAME**: Typically reflects the environment or organization name (e.g., wso2, dev, prod).

 - **RELEASE_NAME**: The name of the Helm release (e.g., mi, icp, mi-dev).

!!! Example
    If CLOUD_NAME=`wso2-cloud` and RELEASE_NAME=`dev-mi`, the k8s deployment for MI will be named as `wso2-cloud-dev-mi`

This naming helps clearly identify and manage resources across different environments.

### How to customize the names

You can set the `cloudName` at the top level of your `values.yaml` file,

```yaml
cloudName: wso2-cloud
```

You can specify the `RELEASE_NAME` when running the Helm install or upgrade command,

=== "Command"
    ```bash 
    helm install <RELEASE_NAME> . -n <NAMESPACE> --values values.yaml
    ```
=== "Example"     
    ```bash 
    helm install dev-mi . -n mi-test --values values.yaml
    ```

This ensures that all generated resources follow the naming convention for easier management and environment separation.

## What's next?

- To explore advanced configurations and vendor–specific cluster settings, refer to the <a target="_blank" href="https://github.com/wso2/helm-mi/blob/4.4.x/mi/EXAMPLES.md">Examples documentation</a> and the <a target="_blank" href="https://github.com/wso2/helm-mi/blob/4.4.x/mi/CONFIG.md">Config documentation</a> in the WSO2 Integrator: MI Helm Chart repository.

- For a hands-on experience deploying WSO2 Integrator: MI and the Integration Control Plane (ICP) in a local Kubernetes cluster using commonly used configurations, see the [Sample Deployment]({{base_path}}/install-and-setup/setup/deployment/sample-k8s-deployment/) guide.
