# Set up Grafana based Observability for a WSO2 Integrator: MI Deployment in Kubernetes

This guide walks you through setting up a Grafana based observability solution for a WSO2 Integrator:  MI deployment running in a Kubernetes environment.

You need to start with the [Grafana based metrics](#step-1-set-up-grafana-based-metrics) to enable basic metric monitoring for your MI instances. Once the metrics setup is complete, you can enhance your observability stack by adding support for [log processing](#step-2-optionally-integrate-the-log-processing-add-on) and [message tracing](#step-3-optionally-integrate-the-message-tracing-add-on).

These capabilities provide comprehensive visibility into the performance and behavior of your integration runtime.

!!! Warning "Disclaimer"
    The configuration provided in this guide is intended for quick evaluation and testing of Grafana based observability with a WSO2 Integrator: MI deployment on Kubernetes.

    It is not recommended for production use. For production grade deployments, refer to the official best practices and security guidelines from <a target="_blank" href="https://grafana.com/docs/">Grafana</a>, <a target="_blank" href="https://prometheus.io/docs/">Prometheus</a>, <a target="_blank" href="https://docs.fluentbit.io/">Fluent Bit</a>, <a target="_blank" href="https://grafana.com/docs/loki/">Loki</a>, and <a target="_blank" href="https://www.jaegertracing.io/docs/1.69/">Jaeger</a>.

## Prerequisites

- Set up a Kubernetes cluster. For instructions, see <a target="_blank" href="https://kubernetes.io/docs/home/">Kubernetes Documentation</a>.
- Install <a target="_blank" href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">Git</a>, <a target="_blank" href="https://helm.sh/docs/intro/install/">Helm</a>, and the <a target="_blank" href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">Kubernetes client</a>.

## Step 1 - Set up Grafana based metrics

To enable Grafana based monitoring for WSO2 Integrator: MI, you need to set up **Prometheus** and **Grafana**.

In this setup:

- A lightweight <a target="_blank" href="https://prometheus.io/blog/2021/11/16/agent/">Prometheus Agent</a> is deployed within the WSO2 Integrator: MI's Kubernetes cluster.
- The agent scrapes metrics from MI instances and forwards them to a centralized remote Prometheus server.
- The remote Prometheus server exposes them to Grafana, which is used for visualizing system statistics.

!!! Note
    While the Prometheus Agent runs inside the MI cluster, the Prometheus server and Grafana can be hosted externally or in a separate observability cluster, depending on your architecture.

### Set up Prometheus server

This is the centralized remote Prometheus server where all Prometheus Agents will forward the metrics collected from WSO2 Integrator: MI instances. Follow the steps below to set it up:

1. Download Prometheus from the <a target="_blank" href="https://prometheus.io/download/">Prometheus site</a>.

    !!! tip
        - WSO2 Micro Inetgrator is tested with Prometheus version **2.45.6** which will be used in this guide.
        - This guide uses the precompiled binary, but you may choose from other <a target="_blank" href="https://prometheus.io/docs/prometheus/latest/installation/">installation options</a> depending on your requirements.
        - Be sure to select the appropriate binary for your operating system and architecture.

2. Extract the downloaded file and navigate into the extracted folder.

    !!! info
        This directory is referred to as `<PROMETHEUS_HOME>` from hereon.

3. Run the following command from within `<PROMETHEUS_HOME>` to start the Prometheus server.

    `./prometheus --web.enable-remote-write-receiver`

    !!! Note
        Since Prometheus Agents will push metrics to this server, you must start Prometheus with the `--web.enable-remote-write-receiver` flag. This enables Prometheus to accept remote write requests.

    When the Prometheus server is successfully started, you will see the following log:

    *Server is ready to receive web requests.*

### Set up Grafana

Follow the steps below to set up the Grafana server:

1. Download and install <a target="_blank" href="https://grafana.com/grafana/download/7.1.1">Grafana</a>.

    !!! Tip
        - WSO2 Integrator: MI is tested with Grafana **7.1.1**, which is used in this guide.
        - Follow the Grafana installation instructions specific to your operating system.

2. Start your Grafana server.

    !!! Tip
        The procedure to start Grafana depends on your operating system and the installation process. For example, If your operating system is Mac OS and you have installed Grafana via Homebrew, you start Grafana by issuing the `brew services start grafana` command.

3. Open the Grafana UI.

    - Navigate to <a target="_blank" href="http://localhost:3000/">http://localhost:3000/</a> in your browser.
    - Sign in using the default credentials (`admin` / `admin`) unless you've configured custom credentials.

#### Add Prometheus as a data source

1. Click the **Gear** icon in the left-hand navigation pane to go to the **Configuration** section.

2. Click **Data Sources**, then click **Add data source**.

3. In the **Add data source** page, select **Prometheus**.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/select_prometheus.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/select_prometheus.png" style="width:60%"></a>
    
4. In the **Data Sources/Prometheus** page, enter the URL of the centralized remote Prometheus server.

    !!! Tip
        If you're running the Prometheus server locally using the configurations provided in this guide, you can set the URL to `http://localhost:9090`.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/prometheus_config.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/prometheus_config.png" style="width:60%"></a>
    
5. Click **Save & Test**. You will see a confirmation message if the data source is configured successfully.

#### Import dashboards to Grafana

The WSO2 Integrator: MI provides pre-configured Grafana dashboards in which you can visualize MI statistics.

You can directly import the required dashboards to Grafana using the <b>dashboard ID</b>:

1.  Go to <a target="_blank" href="https://grafana.com/orgs/wso2/dashboards">WSO2 Dashboards in Grafana labs</a>.
2.  Select the required dashboard and copy the dashboard ID.
3.  Provide this ID to Grafana and import the dashboard.
4.  Repeat the above steps to import all other WSO2 Integrator: MI dashboards.

These dashboards are provided as JSON files that can be manually imported to Grafana. To import the dashboards as JSON files:

1.  Go to <a target="_blank" href="https://grafana.com/orgs/wso2/dashboards">WSO2 Dashboards in Grafana labs</a>, select the required dashboard and download the JSON file.
2.  Sign in to Grafana, click the **+** icon in the left pane, and then click **Import**.

    The **Import** dialog box opens as follows.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/grafana-import-dialog-box.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/grafana-import-dialog-box.png"></a>
    
3. Click **Upload .json file**. Then browse for one of the dashboards that you downloaded as a JSON file.

4. Repeat the above two steps to import all the required dashboards that you downloaded and saved.

### Configure the WSO2 Integrator: MI to enable statistics publishing

To expose metrics for Prometheus scraping, update your WSO2 Integrator: MI Helm chart configuration (`values.yaml`) with the following changes:

- **Enable the Statistics Publishing Handler**

    Add the following under the `wso2.config` section.

    ```yaml
    wso2:
        config:
            synapseHandlers:
            - name: MetricHandler
              class: org.wso2.micro.integrator.observability.metric.handler.MetricHandler
    ``` 

    For details, refer to the [Configure Helm charts for WSO2 Integrator: MI]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/) guide.

- **Enable the Prometheus Metrics Endpoint**

    Add the following under `wso2.deployment.envs`.

    ```yaml
    wso2:
        deployment:
            envs:
                JAVA_OPTS: "-DenablePrometheusApi=true"
    ```

    This enables the `/metric-service/metrics` endpoint exposed by WSO2 Integrator: MI for Prometheus scraping.

- **Add Prometheus Discovery Annotations**

    Prometheus Agent uses pod annotations for service discovery. Add the following under `wso2.deployment.annotations`.

    ```yaml
    wso2:
        deployment:
            annotations:
                prometheus.io/wso2-path: "/metric-service/metrics"
                prometheus.io/wso2-port: "9201"
                prometheus.io/wso2-scrape: "true"
    ```

### Set up the Prometheus Agent

Prometheus Agents are lightweight Prometheus instances designed for metric collection and remote forwarding. When deployed in each Kubernetes cluster, these agents perform the following tasks:

- Scrape metrics from WSO2 Integrator:  MI instances within the same cluster.
- Forward the scraped metrics to a centralized Prometheus server using remote write.

To deploy the Prometheus Agent in your Kubernetes cluster, you need to create a `Deployment` and the necessary access control resources. Follow the steps below:

1. Create a new namespace for the Prometheus Agent.

    ```
    kubectl create namespace monitoring
    ```

    !!! Note
        This guide uses `monitoring` as the namespace. If you choose a different namespace, ensure you update all the subsequent resources accordingly.

2. Create the `ServiceAccount`, `ClusterRole`, and `ClusterRoleBinding`.

    Apply the following YAML definitions to grant the Prometheus Agent the necessary permissions:

    ```yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: prometheus-agent
      namespace: monitoring
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
      name: prometheus-agent
    rules:
      - apiGroups: [""]
        resources:
        - pods
        - nodes
        - services
        - endpoints
        verbs: ["get", "list", "watch"]
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRoleBinding
    metadata:
      name: prometheus-agent
    roleRef:
      apiGroup: rbac.authorization.k8s.io
      kind: ClusterRole
      name: prometheus-agent
    subjects:
      - kind: ServiceAccount
        name: prometheus-agent
        namespace: monitoring
    ```

3. Deploy the `ConfigMap` that defines the Prometheus Agent configuration.

    This `ConfigMap` contains the scraping rules and the remote write configuration used by the Prometheus Agent.

    !!! Note
        - Update the value of `remote_write.url` (line 12) to point to the Prometheus Server you configured in the [previous step](#set-up-prometheus-server).
        - The annotation labels used for `relabel_configs` (lines 22, 26, and 33) must match the ones configured in your WSO2 Integrator: MI Helm chart. If you changed these labels in the [Configure the WSO2 Integrator: MI to enable statistics publishing](#configure-the-micro-integrator-to-enable-statistics-publishing) step, make sure to update them here accordingly.
        - Each WSO2 Integrator: MI instance will be labeled with its pod name. Therefore, in the Grafana UI, MI instances will be identified by their respective pod names.

    ```yaml linenums="1"
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: prometheus-agent-config
      namespace: monitoring
    data:
      prometheus.yml: |
        global:
          scrape_interval: 15s

        remote_write:
          - url: "http://host.docker.internal:9090/api/v1/write"

        scrape_configs:
          - job_name: 'kubernetes-pods-wso2-integration'
            kubernetes_sd_configs:
              - role: pod
            relabel_configs:
              - action: keep
                regex: true
                source_labels:
                - __meta_kubernetes_pod_annotation_prometheus_io_wso2_scrape
              - action: replace
                regex: (.+)
                source_labels:
                - __meta_kubernetes_pod_annotation_prometheus_io_wso2_path
                target_label: __metrics_path__
              - action: replace
                regex: ([^:]+)(?::\d+)?;(\d+)
                replacement: $1:$2
                source_labels:
                - __address__
                - __meta_kubernetes_pod_annotation_prometheus_io_wso2_port
                target_label: __address__
              - action: labelmap
                regex: __meta_kubernetes_pod_label_(.+)
              - action: replace
                source_labels:
                - __meta_kubernetes_namespace
                target_label: kubernetes_namespace
              - action: replace
                source_labels:
                - __meta_kubernetes_pod_name
                target_label: kubernetes_pod_name
              - action: replace
                source_labels:
                - __meta_kubernetes_pod_name
                target_label: instance
    ```

4. Deploy the `Deployment` that runs the Prometheus Agent.

    This deployment launches a Prometheus Agent instance in your Kubernetes cluster using the configuration defined in the previous step.

    !!! Note
        While this guide uses a Deployment to run a single instance of the Prometheus Agent, you can also deploy it as a DaemonSet if you want the agent to run on every node in the cluster. This approach is recommended when collecting node-local metrics or logs, ensuring consistent and scalable scraping across all nodes.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: prometheus-agent
      namespace: monitoring
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: prometheus-agent
      template:
        metadata:
          labels:
            app: prometheus-agent
        spec:
          serviceAccountName: prometheus-agent
          containers:
            - name: prometheus-agent
              image: prom/prometheus:v2.45.6
              args:
                - --config.file=/etc/prometheus/prometheus.yml
                - --enable-feature=agent
              volumeMounts:
                - name: config
                  mountPath: /etc/prometheus
          volumes:
            - name: config
              configMap:
                name: prometheus-agent-config
    ```

## Step 2 - Optionally, integrate the Log processing add-on

Once you have successfully set up [Grafana based metrics](#step-1-set-up-grafana-based-metrics), you can extend observability by enabling the log processing add-on using a **Grafana Loki-based logging stack**.

A Loki-based logging stack consists of the following components:

- **Fluent Bit**: An agent that gathers logs from the MI pods and forwards them.
- **Loki**: A log aggregation system that stores logs and processes queries.
- **Grafana**: A visualization tool that queries Loki and displays the logs.

!!! note
    While the Fluent Bit runs inside the WSO2 Integrator: MI Kubernetes cluster, the Loki server can be hosted externally or deployed in a separate observability cluster, similar to how you set up Prometheus and Grafana.

Follow the steps below to set up **Grafana Loki** and **Fluent Bit** for log processing:

### Set up the Loki server

Grafana Loki aggregates and processes logs received from Fluent Bit.

1. Download Loki from the <a target="_blank" href="https://github.com/grafana/loki/releases/tag/v2.9.4">Loki GitHub Releases</a>.

    !!! note
        - WSO2 Integrator: MI is tested with **Loki 2.9.4**, which is used in this guide.
        - You can install Loki in a separate observability cluster or an external host, similar to how you set up Prometheus and Grafana.
        - This guide uses the precompiled binary, but you may choose from other <a target="_blank" href="https://grafana.com/docs/loki/latest/setup/install/">installation options</a> depending on your requirements.
        - Make sure to download the appropriate binary for your operating system and architecture.

2. Extract the downloaded file and navigate into the extracted folder.

    !!! info
        This directory is referred to as `<LOKI_HOME>` throughout the rest of the guide.

3. Create a configuration file named `loki-local-config.yaml` in the `<LOKI_HOME>` directory.

    !!! tip
        - You can modify the sample configuration values based on your environment and requirements.

    Below is a minimal sample configuration:

    ```yaml
    auth_enabled: false
    
    server:
      http_listen_port: 3100
    
    ingester:
      lifecycler:
        ring:
          kvstore:
            store: inmemory
          replication_factor: 1
        final_sleep: 0s
      chunk_idle_period: 5m
      chunk_retain_period: 30s
      max_transfer_retries: 0
    
    schema_config:
      configs:
        - from: 2018-04-15
          store: boltdb
          object_store: filesystem
          schema: v11
          index:
            prefix: index_
            period: 168h
    
    storage_config:
      boltdb:
        directory: /tmp/loki/index
    
      filesystem:
        directory: /tmp/loki/chunks
    
    limits_config:
      enforce_metric_name: false
      reject_old_samples: true
      reject_old_samples_max_age: 168h
    
    chunk_store_config:
      max_look_back_period: 0s
    
    table_manager:
      retention_deletes_enabled: false
      retention_period: 0s
    ```

4. Run the Loki server.

    Execute the following command from within the `<LOKI_HOME>` directory to start the Loki server:

    ```bash
    ./loki-darwin-arm64 -config.file=./loki-local-config.yaml
    ```

    !!! note
        Replace `loki-darwin-arm64` with the appropriate binary name based on your operating system and architecture.

    When the Loki server is successfully started, you should see a log similar to:

    ```
    level=info ts=... caller=server.go:XXX msg="Loki started"
    ```

    This indicates that the server is running and ready to receive logs from Fluent Bit.

### Configure the WSO2 Integrator: MI for Fluent Bit log collection

To allow Fluent Bit to scrape logs from WSO2 Integrator: MI pods, you must annotate the pods accordingly. Fluent Bit looks for the annotation `mi.fluentbit/include: true` on target pods.

Update the `values.yaml` file of the WSO2 Integrator: MI Helm chart to include the following under `wso2.deployment.annotations`:

```yaml
wso2:
    deployment:
        annotations:
            mi.fluentbit/include: "true"
```

### Set up Fluent Bit

Follow the instructions below to deploy Fluent Bit in the Kubernetes cluster where your WSO2 Integrator: MI pods are running, using the official Helm chart.

You will use the Fluent Bit Helm chart with a customized `fluent-bit-values.yaml` file as shown below.

!!! Note
    - Update the values of `[OUTPUT] Host` and `[OUTPUT] Port` (lines 42–43) to point to the Loki Server you configured in the [previous step](#set-up-the-loki-server).
    - The annotation label used in the `[FILTER] Regex` (line 36) must match the one configured in your WSO2 Integrator: MI Helm chart. If you changed the label in the [Configure the WSO2 Integrator: MI for Fluent Bit log collection](#configure-the-micro-integrator-for-fluent-bit-log-collection) step, make sure to reflect those changes here as well.
    - The `[PARSER] Regex` (line 10) is based on the default `log4j2` pattern used in the MI Helm chart. If you’ve customized the <a target="_blank" href="https://github.com/wso2/helm-mi/blob/4.4.x/mi/confs/log4j2.properties">log4j2.properties</a>, update the regex pattern accordingly.

```yaml linenums="1"
serviceAccount:
  create: true
  name: fluent-bit

config:
  customParsers: |
    [PARSER]
        Name        mi_log
        Format      regex
        Regex       ^\[(?<time>[^\]]+)\] \[\] : mi :\s+(?<level>\w+)\s+\{(?<class>[^\}]+)\} - (?<message>.*)
        Time_Key    time
        Time_Format %Y-%m-%d %H:%M:%S,%L

  inputs: |
    [INPUT]
        Name              tail
        Tag               kube.*
        Path              /var/log/containers/*.log
        Parser            mi_log
        DB                /var/log/flb_kube.db
        Mem_Buf_Limit     5MB
        Skip_Long_Lines   On

  filters: |
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_Tag_Prefix     kube.var.log.containers.
        Merge_Log           On
        Merge_Log_Key       log
        K8S-Logging.Parser  On
        K8S-Logging.Exclude On
    [FILTER]
        Name    grep
        Match   kube.*
        Regex   $kubernetes['annotations']['mi.fluentbit/include'] true

  outputs: |
    [OUTPUT]
        Name        loki
        Match       *
        Host        host.docker.internal
        Port        3100
        TLS         Off
        line_format json
        labels      instance=$kubernetes['pod_name'],log_level=$log_level,service=$service
        label_keys  $kubernetes['namespace_name'],$kubernetes['pod_name'],$kubernetes['container_name']
```

1. Add the Fluent Bit Helm repository.

    ```
    helm repo add fluent https://fluent.github.io/helm-charts
    helm repo update
    ```

2. Install Fluent Bit using your custom values file.

    ```
    helm install fluent-bit fluent/fluent-bit \
        -n logging --create-namespace \
        -f fluent-bit-values.yaml
    ```

Once deployed, Fluent Bit will collect logs from the MI pods (identified via annotations) and forward them to your Loki server for storage and visualization via Grafana.

### Configure Grafana to visualize logs

Follow the steps below to add **Loki** as a data source in Grafana and enable log visualization.

1. Start your Grafana server.

    !!! Tip
        The procedure to start Grafana depends on your operating system and the installation process. For example, If your operating system is Mac OS and you have installed Grafana via Homebrew, you start Grafana by issuing the `brew services start grafana` command.
        
2. Open the Grafana UI.

    - Navigate to <a target="_blank" href="http://localhost:3000/">http://localhost:3000/</a> in your browser.
    - Sign in using the default credentials (`admin` / `admin`) unless you've configured custom credentials.

3. Add Loki as a data source.

    - Click the **Gear** icon in the left-hand navigation pane to go to the **Configuration** section.
    - Click **Data Sources**, then click **Add data source**.
    - In the **Add data source** page, select **Loki**.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/grafana-select-datasource.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/grafana-select-datasource.png" style="width:60%"></a>

4. Configure the Loki data source.

    - In the **Settings** tab, provide the URL of your Loki server in the format `http://<loki-host>:<port>`.  

    !!! Tip
        If you're running the Loki server locally using the configurations provided in this guide, you can set the URL to `http://localhost:3100`.

5. Save and test the configuration. 

    - Click **Save & Test**.
    - Grafana will display a confirmation message if the connection to Loki is successful.

Once the data source is configured, you can view the logs in the dashboards or use the Explore tab to query logs collected from MI instances.

## Step 3 - Optionally, integrate the Message Tracing add-on

Once you have successfully set up [Grafana based metrics](#step-1-set-up-grafana-based-metrics), you can extend observability by enabling message tracing using Jaeger.

### Set up Jaeger

Download and install <a target="_blank" href="https://www.jaegertracing.io/download/">Jaeger</a>.

!!! Note

    - WSO2 Integrator: MI is tested with Jaeger **1.69.0**, which is used in this guide.
    - You can install Jaeger in a separate observability cluster or an external host, similar to how you set up Prometheus, Loki and Grafana.
    - Sampler types play a key role in how traces are collected. Choose a <a target="_blank" href="https://www.jaegertracing.io/docs/1.69/sampling/">sampler type</a> based on your throughput and observability requirements.
    - Before enabling tracing in production, it’s recommended to conduct performance testing and fine-tune resource usage. Refer to the <a target="_blank" href="https://www.jaegertracing.io/docs/1.69/performance-tuning/">Jaeger performance tuning guide</a> for best practices.

### Configure the WSO2 Integrator: MI to publish tracing information

Follow the steps below to configure WSO2 Integrator: MI to publish tracing data to Jaeger.

Update the `values.yaml` file of the MI Helm chart by adding the following configuration under the `wso2.config` section. Ensure that the `host` and `port` fields are updated to match the Jaeger instance configured in the [previous step](#set-up-jaeger).

```yaml
wso2:
  config:
    mediation:
      flow:
        statistics:
          captureAll: true
        tracer:
          collectPayloads: true
          collectMediationProperties: true
    opentelemetry:
      enable: true
      type: jaeger
      host: host.docker.internal
      port: 14250
```

!!! Note
    - The `opentelemetry` block configures the Jaeger exporter using gRPC on port `14250`, which is the standard for the OTLP collector.
    - Instead of using `host` and `port`, you can use the `url` parameter to specify the Jaeger endpoint directly.
    ```yaml
    opentelemetry:
        enable: true
        type: jaeger
        url:  "<JAEGER_URL>"
    ```
    
    - The service name used to initialize the Jaeger Tracer can be customized via the `SERVICE_NAME` environment variable under `wso2.deployment.envs`.
    ```yaml
    wso2:
        deployment:
            envs:
                SERVICE_NAME: "customServiceName"
    ```
    If not set explicitly, `SERVICE_NAME` defaults to `WSO2-SYNAPSE`. If you change the service name, make sure to update the corresponding service-level dashboards (e.g., Proxy Service, API Service, Inbound Endpoint) in Grafana. This ensures the Tracing UI option in the dashboard correctly redirects to the appropriate trace in the Jaeger UI based on the updated service name.

### Configure Grafana to visualize tracing data

To visualize tracing data in Grafana using Jaeger, follow the steps below.

#### Add Jaeger as a data source

1. Open the Grafana UI.

    - Navigate to <a target="_blank" href="http://localhost:3000/">http://localhost:3000/</a> in your browser.
    - Sign in using the default credentials (`admin` / `admin`) unless you've configured custom credentials.

2. Click the **Gear** icon in the left-hand navigation pane to go to the **Configuration** section and then click **Data Sources**.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/open-datasources.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/open-datasources.png"></a>

3. Click **Add data source** and select **Jaeger** from the list of available data source types.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/select-jaeger.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/select-jaeger.png"></a>
    
4. In the **Data Sources/Jaeger** dialog box, enter the URL of the Jaeger query service in the `http://<host>:<port>` format.

    !!! Tip
        If you're running the Jaeger locally using the configurations provided in this guide, you can set the URL to `http://localhost:16686`.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/enter-basic-jaeger-information.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/enter-basic-jaeger-information.png"></a>
    
5. Click **Save & Test**. You will see a confirmation message if the data source is configured successfully.

#### Set up drill-down links in dashboards

To enable redirection to Jaeger from the service dashboards:

1. Open a service-level dashboard (e.g., Proxy Service, API Service, or Inbound Endpoint dashboard).

2. Click the **Settings (cogwheel)** icon in the upper-right corner.

3. Click **Variables** in the sidebar.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/variables.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/variables.png"></a>

4. Edit the **JaegerHost** variable and set it to your Jaeger query component’s `host:port`.

    !!! Tip
        If you're running the Jaeger locally using the configurations provided in this guide, you can set the **JaegerHost** variable to `localhost:16686`.

    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/constant-options.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/constant-options.png"></a>

5. Click **Save**.

Repeat these steps for each service-level dashboard to enable proper redirection.
    
Once this configuration is complete, clicking on response time widgets within a service-level dashboard will redirect you to the relevant trace in the Jaeger UI.

<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/jaeger-ui.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/jaeger-ui.png" style="width:40%"></a>

## What's next?

If you have successfully set up your Grafana based observability setup, see the instructions on [Viewing Grafana Dashboard]({{base_path}}/observe-and-manage/viewing-cloud-native-observability-statistics/).
