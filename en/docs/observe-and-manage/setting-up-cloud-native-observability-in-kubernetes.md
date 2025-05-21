# Setting up Grafana based Observability on Kubernetes

Follow the instructions given below to set up a Grafana based observability solution in a Kubernetes environment.

To streamline the deployment of the Grafana based observability solution in Kubernetes, the Micro Integrator provides a Helm chart via which you can deploy the solution to your Kubernetes cluster. The deployment installs the relevant products and adds the required configurations. After the installation, you can directly use the observability solution with a few additional configurations.

## Prerequisites

- Set up a Kubernetes cluster. For instructions, see [Kubernetes Documentation](https://kubernetes.io/docs/home/).
- Install Helm in the client machine.
- Deploy an ingress controller. (e.g. [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)). If you are working with a different ingress controller, make sure to change the value of `ingressClassName` where applicable in the `values.yaml` file.

## Setting up the observability deployment

When you deployed the solution on a VM, you first set up the minimum deployment (with metrics monitoring capability) and then added log processing and message tracing capabilities (as add-ons). However, when you deploy on Kubernetes, you must first select the required observability capabilities and then deploy all the related technologies and configurations in one step. 

Select the required deployment option from the following list and follow the instructions.

### Option 1 - Metrics Monitoring

The basic observability stack allows you to view metrics by installing and configuring Prometheus and Grafana. To install it, follow the steps below:
    
1. Clone the [Helm repository](https://github.com/wso2/observability-ei).

2. Navigate to the `cloud-native` directory of the cloned repository.

3. To install the basic deployment with the `wso2-observability` release name, issue the following command.

    `helm install wso2-observability . --render-subchart-notes`
    
4. Make changes to the default settings of the chart if required. For information about configurable parameters, see [Integration Observability - Configuration](https://github.com/wso2/observability-ei#configuration).
    
The above step deploys the basic deployment and displays instructions to access the dashboards. This deployment allows you to access both Prometheus and Grafana UIs and provides you with the ability to view and analyze metrics.

If you have exposed the Grafana service using the ingress controller, you can access the Grafana UI from [https://monitoring.mi.wso2.com/grafana](https://monitoring.mi.wso2.com/grafana). You can use the default password acquired from 
```
kubectl get secret --namespace <namespace_of_release> wso2-observability-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
or configure to use a different password.


### Option 2 - Metrics + Log Monitoring

This deployment involves deploying Prometheus, Grafana, Loki, and Fluent-bit Daemon set with all the required configurations to integrate deployed products. To install the deployment using Helm, follow the steps below:
    
1. Clone the [Helm repository](https://github.com/wso2/observability-ei).

2. Navigate to the `cloud-native` directory of the cloned repository.

3. Open the `values.yaml` file and set the `enabled` parameter to `true` for Loki-stack as shown in the extract below.

    ```yaml
    loki-stack:
        enabled: true
    ```
    
4. To install the observability deployment including log processing capabilities with the `wso2-observability` release name, issue the following command.

    `helm install wso2-observability . --render-subchart-notes`
    
5. Make changes to the default settings of the chart if required. For information about configurable parameters, see [Integration Observability - Configuration](https://github.com/wso2/observability-ei#configuration).

The above steps deploy the observability solution with log processing capabilities and display instructions to access the dashboards. With this deployment, you can access Prometheus and Grafana UIs.     

### Option 3 - Metrics Monitoring + Message Tracing

This involves deploying Prometheus, Grafana, and Jaeger-operator with all the required configurations to integrate deployed products. To install the deployment using Helm, follow the steps below:

Start by setting up cert-manager since it is a prerequisite for deploying the Jaeger-operator helm charts.

#### Set up cert-manager

1. Execute the below command to see if CRDs are already installed.
```
kubectl get crd -l app.kubernetes.io/instance=cert-manager
```
2. If no resources were found, install them with the below command.
```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.6.3/cert-manager.crds.yaml
```

Execute the below commands to install cert-manager.

3. Add the Jetstack helm repository. 
```
helm repo add jetstack https://charts.jetstack.io
```
4. If you have the repository already added, update it.
```
helm repo update
```
5. run the below command to install cert-manager.
```
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.6.3
```

!!! Tip
    You can check which version of cert-manager is compatible with the jeager-operator version you'll be using from the compatibility matrix [here](https://github.com/jaegertracing/helm-charts/blob/v2/charts/jaeger-operator/COMPATIBILITY.md).

Once the cert-manager is set up, continue with the helm chart installation.

1. Clone the [Helm repository](https://github.com/wso2/observability-ei).

2. Navigate to the `cloud-native` directory of the cloned repository.

3. Open the `values.yaml` file and set the `enabled` parameter to `true` for Jaeger as shown in the extract below.

    ```yaml
    jaeger-operator:
        enabled: true
    ```
    
4. To install the observability deployment including tracing capabilities with the `wso2-observability` release name, issue the following command.

    `helm install wso2-observability . --render-subchart-notes`
    
5. Make changes to the default settings of the chart if required. For information about configurable parameters, see [Integration Observability - Configuration](https://github.com/wso2/observability-ei#configuration).

The above steps deploy the observability solution with tracing capabilities and displays instructions to access the dashboards. With this deployment, you are able to access Prometheus, Grafana, and Jaeger UIs.

This deployment installs Jaeger-Operator and an 'AllInOnce' Jaeger instance with the default configurations. You can change this behaviour by providing a prefered instance specification under `jaeger-operator.jaeger.spec` in the `values.yaml` file. Follow [this](https://github.com/jaegertracing/helm-charts/tree/master/charts/jaeger-operator#after-the-helm-installation) documentation to deploy your preferred Jaeger deployment.

!!! Note	
    - There are some limitations because the Jaeger client, by default, uses a UDP sender as mentioned in [the Jaeger documentation](https://www.jaegertracing.io/docs/1.22/client-libraries/). If the payload size exceeds 65 KB, spans might get lost in the Jaeger console. 	
    - Jaeger [sampler types](https://www.jaegertracing.io/docs/1.22/sampling/) can also play a major role in tracing. Depending on the TPS, the sampler type should be carefully chosen.	
    - Be sure to check the performance tests and scaling requirements before including tracing in production deployments. For details on how to achieve better performance, see the [Jaeger performance tuning guide](https://www.jaegertracing.io/docs/1.22/performance-tuning/). 

Once deployed, you can access the Jaeger UI from  [http://tracing.mi.wso2.com](http://tracing.mi.wso2.com). You can change the host name by chanigng the `jaeger-oeprator.jaeger.spec.ingress.hosts` in `values.yaml` file.

##### Configuring Grafana to visualize tracing information

The Helm chart configures the Jaeger data source automatically. Therefore, unlike in Setting up [Grafana based Observability in a Virtual Machine]({{base_path}}/observe-and-manage/setting-up-cloud-native-observability-on-a-vm), it is not required to add it manually. However, to configure the links into Jaeger UI from the service-level dashboards, you need to perform the following steps:

1. Access Grafana via `localhost:3000` and sign in.
2. Navigate to the settings section of the service level dashboard by clicking the cog wheel icon in the top right corner.

3. Click **Variable**. This opens the following view.

     [![Variables view]({{base_path}}/assets/img/integrate/monitoring-dashboard/variables.png)]({{base_path}}/assets/img/integrate/monitoring-dashboard/variables.png)
    
4. Edit the JaegerHost variable and provide your Jaeger query component hostname and port in the `host:port` syntax as shown below.

     [![constant options]({{base_path}}/assets/img/integrate/monitoring-dashboard/constant-options.png)]({{base_path}}/assets/img/integrate/monitoring-dashboard/constant-options.png)
    
5. Click **Save**

You need to perform the above steps for all the service-level dashboards (i.e., Proxy Service dashboard, API Service Dashboard, and Inbound Endpoint dashboard).

Once Grafana is successfully configured to visualize statistics, you should be correctly redirected to the Jaeger UI from the Response Time widget of each service level dashboard as shown below.

[![jaeger ui]({{base_path}}/assets/img/integrate/monitoring-dashboard/jaeger-ui.png){: style="width:50%"}]({{base_path}}/assets/img/integrate/monitoring-dashboard/jaeger-ui.png)

### Option 4 - Metrics + Logs + Message Tracing

To install the Grafana based observability solution with logging and tracing capabilities in your Kubernetes cluster, follow the steps below:

1. Clone the [Helm repository](https://github.com/wso2/observability-ei).

2. Navigate to the `cloud-native` directory of the cloned repository.

3. Open the `values.yaml` file and set the `enabled` parameter to `true` for both Loki-stack and Jaeger as shown in the extract below.

    ```yaml
    loki-stack:
     enabled: true
    jaeger-operator:
     enabled: true
    ```
    
4. To install the complete deployment with the `wso2-observability` release name, issue the following command.

    `helm install wso2-observability . --render-subchart-notes`
    
5. Make changes to the default settings of the chart if required. For information about configurable parameters, see [Integration Observability - Configuration](https://github.com/wso2/observability-ei#configuration).
    
The above step deploys the complete deployment and displays instructions to access the dashboards. This deployment allows you to access Prometheus, Grafana, and Jaeger UIs.

## Setting up the Micro Integrator deployment

To integrate with the observability deployment, you are required to perform the following three main tasks in the Micro Integrator deployment:

### Enabling observability for the Micro Integrator

- **Enabling the statistics publishing handler**

    Add the following lines under `wso2.config` in the `values.yaml` file in the MI helm charts.
    
    ```yaml
    synapseHandlers:
    - name: MetricHandler
      class: org.wso2.micro.integrator.observability.metric.handler.MetricHandler
    ``` 
    
    For more information about the Micro Integrator helm charts, see [Guide on configuring MI helm charts]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/).

- **Enabling the metrics endpoint**

    Set an environment variable under `wso2.deployment.envs` in the `values.yaml` file of the MI helm chart.
    
    ```yaml
    envs:
      JAVA_OPTS: "-DenablePrometheusApi=true"
    ```

- **Enabling discovery for Prometheus**

    To allow Prometheus to discover Micro Integrator pods, set the following pod level annotations under `wso2.deployment.annotations`.
    
    ```yaml
    prometheus.io/wso2-path: "/metric-service/metrics"
    prometheus.io/wso2-port: "9201"
    prometheus.io/wso2-scrape: "true"
    ```

!!! Info
    If both the MI and observability deployments are within the same cluster and the pod-level annotations are configured as described above, you can view metrics for each MI node individually using the Grafana dashboards.

### Configuring the Micro Integrator to publish logs

!!! Tip
    This step is only required if you have log processing capabilities in your observability deployment.
    
Once the above tasks are completed, the MI deployment installed thorugh the helm charts emits metric data, and the observability deployment can discover and start without further configuration.

**Configuring pods to parse logs through Fluent-bit**

To do this, set the following pod level annotation to the Micro Integrator pod.

`fluentbit.io/parser: wso2`

### Configuring the Micro Integrator to publish tracing information

!!! Tip
    This step is only required if you have message tracing capabilities in your observability deployment.

To configure the Micro Integrator to publish tracing information, add the following under the `wso2.config` section in the `values.yaml` file in your MI helm charts.

```yaml
mediation:
    flow:
        statistics:
            enable: false
            captureAll: true
        tracer:
            collectPayloads: true
            collectMediationProperties: true
opentelemetry:
    enable: true
    logs: true
    type: jaeger
    host: wso2-observability-jaeger-operator-jaeger-collector.default.svc.cluster.local
    port: 14250
```

!!! Tip
    Instead of using `host` and `port`, the `url` parameter can be used directly to connect to Jaeger in the following way.

    ```yaml
    opentelemetry:
        enable: true
        logs: true
        type: jaeger
        url:  "<url-of-jaeger-endpoint>"
    ```

These settings enable the tracing data instrumentation and publishing to a Jaeger instance.

For more information about the Micro Integrator helm deployment, see [Guide on configuring MI helm charts]({{base_path}}/install-and-setup/setup/deployment/configuring-helm-charts/).

## What's Next?

If you have successfully set up your Grafana based observability deployment, see the instructions on [Viewing Grafana Dashboard]({{base_path}}/observe-and-manage/viewing-cloud-native-observability-statistics/).
