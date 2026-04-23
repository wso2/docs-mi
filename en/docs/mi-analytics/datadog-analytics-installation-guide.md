# Datadog Based Analytics Solution for Micro Integrator

Datadog is a robust monitoring and analytics platform designed for cloud-scale applications. It enables organizations to 
monitor their infrastructure, applications, and logs in real-time, providing deep insights into performance metrics, logs, 
and distributed traces. Datadog supports a wide range of integrations with various technologies, allowing users to consolidate 
monitoring efforts into a single platform.

Integrating Datadog with WSO2 Micro Integrator (MI) enhances monitoring and observability capabilities by extending MI’s native analytics with 
Datadog’s advanced monitoring features. By integrating, organizations can:

- Centralize Monitoring: Consolidate MI analytics logs into Datadog for centralized monitoring and visualization.
- Enhance Troubleshooting: Gain deeper insights into MI performance metrics and logs, facilitating quicker issue identification 
and resolution.
- Create Custom Dashboards: Utilize Datadog’s dashboard capabilities to create customized visualizations and reports based 
on MI analytics data.
- Real-time Alerting: Set up real-time alerts based on MI metrics and logs to proactively manage and respond to operational issues.

This guide provides step-by-step instructions for configuring Datadog with WSO2 MI in both VM and Docker environments.

## VM Deployment

### Step 01: Configure WSO2 Micro Integrator

1. Follow the steps in [WSO2 Micro Integrator Analytics Installation Guide](https://mi.docs.wso2.com/en/latest/mi-analytics/mi-elk-installation-guide/#configure-micro-integrator) to enable analytics in Micro Integrator.

2. Develop your integration using the WSO2 MI for VS Code: Micro Integrator extension for Visual Studio Code. (Currently, 
   this extension is available as a developer preview version.) 

    !!! info 
        See [Install Micro Integrator for VS Code](https://mi.docs.wso2.com/en/latest/develop/mi-for-vscode/install-wso2-mi-for-vscode/) for details on the installation. 

3. Start Micro Integrator.
   
    !!! tip
        See [Developing Your First Integration Solution](https://mi.docs.wso2.com/en/latest/develop/mi-for-vscode/quick-start-guide-mi-for-vscode/) for a quick set up guide. 

4. In the first step you have already configured the Micro Integrator to enable analytics. Ensure logs are generated correctly.
   
    a. Navigate to the `<MI_HOME>/repository/logs` folder.

    b. Open the `synapse-analytics.log` file.
   
    If you have successfully enabled analytics in the Micro Integrator, you will see the logs getting generated in the `synapse-analytics.log` file.

    A sample log entry is given below:

    ```
    01:03:05,452 [-] [message-flow-reporter-1-tenant--1234]  INFO ElasticStatisticsPublisher SYNAPSE_ANALYTICS_DATA {"serverInfo":{"hostname":"dinithid","serverName":"localhost","ipAddress":"192.168.8.181","id":"wso2mi_server_1234"},"timestamp":"2024-06-19T19:33:02.278Z","schemaVersion":1,"payload":{"metadata":{},"entityType":"API","failure":false,"latency":124,"messageId":"urn:uuid:a906b7ea-2af8-4bb4-80b0-ea81b73aecee","correlation_id":"a906b7ea-2af8-4bb4-80b0-ea81b73aecee","apiDetails":{"method":"GET","apiContext":"/healthcare","api":"HealthcareAPI","transport":"http","subRequestPath":"/doctor/Ophthalmologist"},"faultResponse":false,"entityClassName":"org.apache.synapse.api.API"}}
    ```

Now that we have configured the Micro Integrator, let's configure Datadog in the next step.

### Step 02 : Install Datadog Agent

For the VM deployment, we need to install a Datadog client application which handles all the data publishing to the cloud application. 

1. Sign up for a new account at [https://www.datadoghq.com/](https://www.datadoghq.com/) if you haven't already.

2. Install the Datadog Agent by following the instructions provided in the Datadog documentation based on your operating system.

    You will be notified once the Agent is running correctly, and it will continue to run in the background anf submit the metrics to Datadog.

    After a successful installation, you will be redirected to the Datadog dashboard.

3. Navigate to the left sidebar of the Datadog dashboard and select **Metrics**.

4. Under **Metrics**, select **Explorer** to open the **Metrics Explorer** view.

    <img src="{{base_path}}/assets/img/analytics/datadog/select-metrics-explorer.png" alt="image" width="30%">

If the dashboard shows a CPU usage graph, we can conclude that the initial integration is working.

### Step 03 : Configure Datadog Agent to publish the synapse analytics logs

By default, the Datadog Agent is not configured to read log files. 

Follow the steps below to configure Datadog Agent to read log files. For this you need to configure `datadog.yaml` which is the Agent’s main configuration file.

!!! info
    For macOS, the `datadog.yaml` file is located in the `.datadog-agent` directory.

    For any other operating systems, please see the [Agent Configuration Files](https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6v7) documentation.

1. Open the `datadog.yaml` file.

    By default, the `logs_enabled` property is commented out and set to `false`.

2. Uncomment the entry.

3. Set the value to `true`.

    ```
    logs_enabled: true
    ```

4. Next, configure a new log collector to tail and publish logs from the Micro Integrator.

    If you are using macOS, follow the steps below:

    For any other operating system, see the [Custom log collection](https://docs.datadoghq.com/agent/logs/?tab=tailfiles#custom-log-collection) documentation.

       a. Navigate to the `.datadog-agent` directory.

       b. Open the `conf.d` directory inside the `.datadog-agent` directory.
       
       c. Inside the directory, create a new folder and name it as `wso2mi.d`. This will be used to hold the configuration for Micro Integrator. 
       
       d. Inside the `wso2mi.d` directory, create a file named `conf.yaml`. 

       e. Add the below content to the `conf.yaml` file. Change the values accordingly.
       
       ```
       logs:
       - type: file
         path: "/Users/dinithidias/MIProjects/wso2mi-4.2.0/repository/logs/synapse-analytics.log"
         service: "wso2mi"
         source: "wso2mi_node"
       ```

5. Next, restart the Datadog Agent to apply the above changes.

    If you are using macOS, follow the steps below to restart the Datadog Agent:
    
    a. Open the terminal.
    
    b. Stop the Agent by executing the following command:
    
    ```
    launchctl stop com.datadoghq.agent
    ```
    
    c. Start the Agent by executing the following command:
    
    ```
    launchctl start com.datadoghq.agent
    ```
    
    For any other operating system, see the [Agent Commands](https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7) documentation.

6. Now, invoke the integrations few times, log in to Datadog and see if we can see the logs getting publishing correctly as follows.

    <img src="{{base_path}}/assets/img/analytics/datadog/log-entry.png" alt="log-entry" width="70%">

### Step 04: Creating pipelines

Next, we need to create a pipeline to pre-process the MI logs.

!!! info
    Note that each log entry contains a detailed JSON object. To access the fields inside this JSON directly, you need to extract it 
    using a Grok parser. This lets you parse the logs and easily work with the JSON data.

1. Navigate to the left sidebar of the Datadog dashboard.

2. Select **Logs** > **Pipelines**.

    <img src="{{base_path}}/assets/img/analytics/datadog/logs-pipelines.png" alt="logs-pipelines" width="30%">

3. Click **New Pipeline**.

4. In the next interface, under **Filter**.

5. Select the **Source**. The source will be suggested automatically.

6. Provide a **Name** for the pipeline.

7. Click **Create**.

    Now you will be redirected back to the pipeline dashboard.

8. Locate the pipeline you created and click on it. 

9. Click on **Add processor** option under the created pipeline.

    <img src="{{base_path}}/assets/img/analytics/datadog/add-processor.png" alt="add-processor" width="50%">

10. In the next screen, specify the values to create a Grok parser.

11. Create a Grok parser as in the following image.

    You can specify the below parsing rule:
    
    ```
    rules_1 %{date("HH:mm:ss,SSS")}%{regex("[^a-zA-Z0-9]*[a-zA-Z0-9-]*[^a-zA-Z0-9]*\\w+ \\w+ \\w+")}%{data::json}
    ```

    <img src="{{base_path}}/assets/img/analytics/datadog/grok-parser.png" alt="grok-parser" width="70%">

    If the rule is correctly parsing you will see it's extracting the JSON correctly as follows.

    <img src="{{base_path}}/assets/img/analytics/datadog/rule-matched-extraction.png" alt="rule-matched-extraction" width="70%">

### Step 05: Creating facets and measures

Once the pipeline is successfully set up, you can create facets and measures on the extracted JSON fields.

1. To create a facet or measures, click on a single log entry. 

2. In the popup that appears, create a facet or measure.

For example, let's create a measure for the latency as follows:

<img src="{{base_path}}/assets/img/analytics/datadog/create-measure.png" alt="create-measure" width="50%">

Add a few facets for the filters you want to apply. 

For example, now let's add a facet for `payload.entityType` to filter the logs by entity type (such as API or proxy).

<img src="{{base_path}}/assets/img/analytics/datadog/create-facet.png" alt="create-facet" width="50%">

### Step 06: Creating a dashboard

1. Navigate to the left sidebar of the Datadog dashboard.

2. Select **Dashboards** > **New Dashboard**.

    <img src="{{base_path}}/assets/img/analytics/datadog/new-dashboard.png" alt="new-dashboard" width="30%">

3. Create a dashboard in Datadog and add some graphs by applying filters on the facets and measures you created in the Step 05.

    <img src="{{base_path}}/assets/img/analytics/datadog/create-a-dashboard.png" alt="create-a-dashboard" width="50%">

!!! info
    Follow the [Dashboards](https://docs.datadoghq.com/dashboards/#copy-import-or-export-dashboard-json) documentation to learn about creating dashboards.

[//]: # (## Docker Deployment)
