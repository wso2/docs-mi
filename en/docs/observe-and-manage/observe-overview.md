# Overview

This section explains how to set up the observability solutions and perform management tasks for WSO2 Integrator: MI.

## Observability

Observability can be viewed as a superset of monitoring where monitoring is enriched with capabilities to perform debugging 
and profiling through rich context, log analysis, correlation, and tracing. Modern day observability resides on three pillars 
of **logs**, **metrics**, and **tracing**. Modern businesses require observability systems to self-sufficiently emit their current 
state(overview), generate alerts for any abnormalities detected to proactively identify failures, and to provide information to 
find the root causes of a system failure.

### Observability solutions

WSO2 Integrator: MI offers an observability solution based on Prometheus, Loki, Jaeger and Grafana. You can also monitor basic observability data sources such as metrics, logs, and traces.

[![Observability Solution]({{base_path}}/assets/img/observe/observability.png)]({{base_path}}/assets/img/observe/observability.png)

The Grafana based observability solution and basic observability solution are suitable for the following combination of operations.

<table>
    <tr>
        <th>Observability solution</th>
        <th>Operations</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Grafana based solution</td>
        <td>
            <ul>
                <li>Metrics only</li>
                <li>Logging (add-on)</li>
                <li>Tracing (add-on)</li>
            </ul>
        </td>
        <td>The default Grafana based observability solution includes metrics monitoring by default. You can optionally extend this setup by adding log processing and distributed tracing at any time. This modular approach is ideal if you're looking for a comprehensive observability solution for WSO2 Integrator: MI deployments. It also integrates seamlessly with existing setups especially if you already use Prometheus, Grafana, Loki, and Jaeger as your in-house monitoring and observability tools.</td>
    </tr>
    <tr>
        <td>Basic Observability</td>
        <td>
            <ul>
                <li>Metrics</li>
                <li>Tracing</li>
                <li>Logging</li>
            </ul>
        </td>
        <td>This solution allows you to monitor the requests and the responses that correspond to a specific API call, monitor your application's usage, enable tracing and monitor WSO2 Integrator: MI via the JConsole tool. This is a more simpler solution.</td>
    </tr>
</table>

* For instructions to set up the above observability solutions, see [Set up Grafana based Observability for a WSO2 Integrator: MI Deployment in VM](setting-up-cloud-native-observability-on-a-vm.md) or [Set up Grafana based Observability for a WSO2 Integrator: MI Deployment in Kubernetes](setting-up-cloud-native-observability-in-kubernetes.md)

* For more information on how to use the Grafana based solution, see [View Grafana based Observability Statistics](viewing-cloud-native-observability-statistics.md).

* For more information on monitoring basic observability data sources, see [Monitoring Metrics](classic-observability-metrics/jmx-monitoring.md), [Monitoring Logs](classic-observability-logs/monitoring-logs.md), and [Monitoring Traces](classic-observability-traces/monitoring-with-opentelemetry-mi.md).
