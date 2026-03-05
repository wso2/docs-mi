---
search:
  exclude: true
---

# Monitor and Manage Integrations

In the previous tutorial, you learned how to route and transform messages, connect to a SaaS provider, deploy, and test integrations in WSO2 MI. Now, let's explore how to monitor the integrations using the [Integration Control Plane]({{base_path}}/observe-and-manage/working-with-integration-control-plane/) (ICP).

!!! Tip "What is Integration Control Plane?"  
    The Integration Control Plane provides a centralized interface for monitoring and managing deployed integrations. It allows users to track integration statuses, view logs, and manage services efficiently. To learn more, see the [Integration Control Plane documentation]({{base_path}}/observe-and-manage/working-with-integration-control-plane/).

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed.

    !!! Info
        See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

2. You must have completed the **Connect to SaaS or B2B Systems** tutorial under **Build your first Integration** before proceeding. Start the [Connect to SaaS or B2B Systems]({{base_path}}/get-started/build-first-integration/first-integration-connect-saas/) tutorial if you haven’t completed it yet.

3. You need to have the **Integration Control Plane (ICP)** installed.

    !!! Info
        See the [Install the Integration Control Plane]({{base_path}}/install-and-setup/install/installing-integration-control-plane/) documentation for installation instructions.

Follow the instructions below to monitor the `Bank` integration deployed in WSO2 Integrator:  MI using the Integration Control Plane (ICP).

## What you'll learn

- How to check the status of deployed integrations, including viewing active nodes, deployed artifacts, and runtime details.

## What you'll build

In this tutorial, you will learn how to monitor the status of the `Bank` integration using the Integration Control Plane. You will explore how to view deployed integrations, check their status, and ensure they are running as expected.

## Step 1 - Configure MI

Now, it's time to configure the MI runtime to connect to the Integration Control Plane (ICP). Since we will be using an existing integration, ensure that you have completed the [Connect to SaaS or B2B Systems]({{base_path}}/get-started/build-first-integration/first-integration-connect-saas/) tutorial and have the integration project open in VS Code.

!!! Warning
        Before proceeding with the following steps, make sure the MI server linked to VS Code is not running.

1. Click the **Explorer** icon in the top-left corner of VS Code to switch to the default Explorer view.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/click_default_explorer.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/click_default_explorer.png" alt="Create New Project" width="80%"></a>

2. Expand the **deployment** directory, then click on `deployment.toml` to open it.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/open_deployment_toml.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/open_deployment_toml.png" alt="Create New Project" width="80%"></a>

3. Uncomment or add the following configuration in the `deployment.toml` file, then save the changes.

    ```toml
    [dashboard_config]
    dashboard_url = "https://localhost:9743/dashboard/api/"
    group_id = "dev"
    node_id = "node_1"
    ```

    !!! Info
        In this tutorial, we use a single MI node. The `group_id` is used to group related MI instances, while the `node_id` uniquely identifies an instance. You will see these values reflected in the Integration Control Plane (ICP) later in the tutorial.  
        For more information on dashboard configurations, refer to [this guide]({{base_path}}/observe-and-manage/working-with-integration-control-plane/#step-2-configure-the-mi-servers).

## Step 2 - Start the Integration Control Plane (ICP)

1. <a target="_blank" href="https://code.visualstudio.com/docs/terminal/basics">Open a new terminal</a> in VS Code and navigate to the `<ICP_HOME>/bin` folder.

2. Execute one of the following commands to start the Integration Control Plane (ICP).

    === "On macOS/Linux"
        ```bash 
        sh dashboard.sh
        ```
    === "On Windows"
        ```bash 
        dashboard.bat
        ```

    Once the Integration Control Plane (ICP) has started successfully, you should see logs similar to the following in the terminal.

    ```log
    [2025-03-28 12:00:13,277]  INFO {DashboardServer} - WSO2 Integration Control Plane started.
    [2025-03-28 12:00:13,279]  INFO {DashboardServer} - Login to Integration Control Plane Dashboard : 'https://localhost:9743/login'
    ```

3. Click the **Build and Run** icon in the top-right corner of VS Code to start the MI server and deploy the integrations.

    !!! Tip
        If the **Build and Run** icon is not visible after opening the `deployment.toml` file, click the **WSO2 Integrator: MI** icon on the Activity Bar in the VS Code editor to return to the main view.

        <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_mi_build_and_run.gif"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_mi_build_and_run.gif" alt="Create New Project" width="70%"></a>

4. Once the MI server has started successfully, you should see logs similar to the following in the terminal where the Integration Control Plane (ICP) was started.

    ```log
    [2025-03-28 12:00:13,277]  INFO {DashboardServer} - WSO2 Integration Control Plane started.
    [2025-03-28 12:00:13,279]  INFO {DashboardServer} - Login to Integration Control Plane Dashboard : 'https://localhost:9743/login'
    [2025-03-28 12:00:39,373]  INFO {HeartBeatDelegate} - New node node_1 in group : dev is registered. Inserting heartbeat information
    [2025-03-28 12:00:39,551]  INFO {InMemoryDataManager} - Inserting heartbeat details of node node_1 in group dev
    [2025-03-28 12:00:39,552]  INFO {MiArtifactsManager} - Fetching server details from node node_1 in group dev
    [2025-03-28 12:00:39,555]  INFO {InMemoryDataManager} - Adding serverInfo of node node_1 in group dev
    ```

## Step 3 - Monitor integrations

Now that the Integration Control Plane (ICP) is running, log in to the web portal to monitor your integrations.

1. Open your web browser and navigate to [https://localhost:9743/login](https://localhost:9743/login).

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/icp_login_screen.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/icp_login_screen.png" alt="Create New Project"></a>

2. Use `admin` as both the username and password, then click **Sign In** to access the Integration Control Plane.

    !!! Tip  
        By default, `admin` is both the username and password. To enhance security, it is recommended to create new user accounts. See [Manage Users]({{base_path}}/install-and-setup/setup/user-stores/managing-users/) for instructions on adding new users and assigning roles in the Integration Control Plane.

    After signing in, you will land on the home page of the Integration Control Plane, which displays details about the connected MI nodes. This page lists all available MI nodes, and you can view the **Group ID** and **Node ID** configured in [Step 1 – Configure MI]({{base_path}}/get-started/build-first-integration/first-integration-monitor-icp/#step-1-configure-mi).

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/icp_home_page.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/icp_home_page.png" alt="Create New Project"></a>

3. Click the **Node ID** `node_1` to view details about the MI node. A side panel will open, displaying information about the server.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/icp_node_information.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/icp_node_information.png" alt="Create New Project"></a>

    To view details about the deployed artifacts—such as integration applications, APIs, connectors, and more—use the options available in the left-hand navigation panel.

4. Click **Carbon Applications** to view the deployed integration applications. You should see `BankIntegration` listed. Click on a node to view the integration details, including the packaged artifacts.

    !!! Info "What is a Carbon Application?"
        A Carbon Application in WSO2 Integrator:  MI is a deployable archive that packages and distributes integration artifacts in a structured manner. To learn more, see the [Deploying Artifacts]({{base_path}}/develop/deploy-artifacts/) documentation.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/icp_capp_information.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/icp_capp_information.png" alt="Create New Project"></a>

5. Click **APIs** to view the deployed APIs. You should see the `Bank` API listed. Click on a node to view the API details, including the API's source code.

    !!! Info
        When viewing the resources, you should see those created in the previous tutorials. The source code should reflect the structure of the `Bank` API.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/icp_api_information.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/icp_api_information.png" alt="Create New Project"></a>

    You may explore the other artifacts on your own for reference.

Congratulations! You have now learned how to monitor and manage integrations using the Integration Control Plane (ICP). You explored how to check the status of deployed MI nodes and view detailed information about integration artifacts, including their source code.

## What's next?

You have now completed this tutorial series, where you learned how to build a complete integration flow step by step. Throughout this journey, you have explored how to create Integration APIs, route and transform messages, connect to external SaaS and B2B systems, and monitor integrations using the Integration Control Plane (ICP).

Now, you can explore advanced integration scenarios, applying what you’ve learned to real-world use cases and expanding your expertise in WSO2 Integrator: MI.

{% raw %}
<style>
.language-yaml {
    font-family: monospace;
    font-size: 0.6rem !important;
    color: var(--md-feedback-button-color) !important;
}
.language-yaml .hljs-string, .hljs-attr{
    color: var(--md-feedback-button-color) !important;
}

.language-yaml .hljs-number {
    color:rgb(47, 169, 196) !important;
}
</style>
{% endraw %}
