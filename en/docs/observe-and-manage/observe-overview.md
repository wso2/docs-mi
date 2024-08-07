# Overview

This section explains how to set up the observability solutions and perform management tasks for WSO2 Micro Integrator.

## Observability

Observability can be viewed as a superset of monitoring where monitoring is enriched with capabilities to perform debugging 
and profiling through rich context, log analysis, correlation, and tracing. Modern day observability resides on three pillars 
of **logs**, **metrics**, and **tracing**. Modern businesses require observability systems to self-sufficiently emit their current 
state(overview), generate alerts for any abnormalities detected to proactively identify failures, and to provide information to 
find the root causes of a system failure.

### Observability solutions

WSO2 Micro Integrator offers an observability solution based on Prometheus, Loki, Jaeger and Grafana. You can also monitor basic observability data sources such as metrics, logs, and traces.

[![Observability Solution]({{base_path}}/assets/img/observe/observability.png)]({{base_path}}/assets/img/observe/observability.png)

The Grafana based observability solution and basic observability solution are suitable for the following combination of operations.

<table>
    <tr>
        <th>Observability solution</th>
        <th>Operations</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Grafana based Kubernetes solution</td>
        <td>
            <ul>
                <li>Metrics only</li>
                <li>Metrics + Logging</li>
                <li>Metrics + Tracing</li>
                <li>Metrics + Logging + Tracing</li>
            </ul>
        </td>
        <td>The default Grafana based Kubernetes solution comes with metrics enabled. You can also configure logging and tracing in combination with this. This solution is ideal if you want a complete solution to observability and you already have Prometheus, Grafana, and Jaeger as your in-house monitoring and observability tools.</td>
    </tr>
    <tr>
        <td>Grafana based VM deployment</td>
        <td>
            <ul>
                <li>Metrics only</li>
                <li>Logging (add-on)</li>
                <li>Tracing (add-on)</li>
            </ul>
        </td>
        <td>The default Grafana based VM solution comes with metrics enabled. You can additionally set up logging or tracing separatly as part of this solution later. This solution is ideal if you want a complete solution to observability, but you need to set this up on a VM. Ideally you would already have Prometheus, Grafana, and Jaeger as your in-house monitoring and observability tools.</td>
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
        <td>This solution allows you to monitor the requests and the responses that correspond to a specific API call, monitor your application's usage, enable tracing and monitor WSO2 Micro Integrator via the JConsole tool. This is a more simpler solution.</td>
    </tr>
</table>

* For instructions to set up the above observability solutions, see [Setting up Grafana based Observability on a VM](setting-up-cloud-native-observability-on-a-vm.md) or [Setting up Grafana based Observability on Kubernetes](setting-up-cloud-native-observability-in-kubernetes.md)

* For more information on how to use the Grafana based solution, see [Viewing Grafana Dashboard](viewing-cloud-native-observability-statistics.md).

* For more information on monitoring basic observability data sources, see [Monitoring Metrics](classic-observability-metrics/jmx-monitoring.md), [Monitoring Logs](classic-observability-logs/monitoring-logs.md), and [Monitoring Traces](classic-observability-traces/monitoring-with-opentelemetry-mi.md).

## Built-in Tools

You can monitor and manage various artifacts that you have deployed. The following are the options that enable you to do this.

- **[Integration Control Plane](working-with-integration-control-plane.md)**: Allows you to perform administration tasks related to your Micro Integrator deployment.
- **[Managing Integrations with MI CLI](managing-integrations-with-micli.md)**: Allows you to perform various management and administration tasks from the command line.
- **[Using the Management API](working-with-management-api.md)**: The Micro Integrator CLI and the Integration Control Plane communicate with this service to obtain administrative information of the server instance and to perform various administration tasks. If you are not using the ICP or the CLI, you can directly access the resources of the management API.

## Integration with external tools

You can integrate with external tools to do the following:

**Monitoring Metrics**

- [JMX Monitoring](classic-observability-metrics/jmx-monitoring.md)
- [SNMP Monitoring](classic-observability-metrics/snmp-monitoring.md)
