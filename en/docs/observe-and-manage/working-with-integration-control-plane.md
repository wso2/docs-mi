# Monitoring MI Artifacts and Logs

The WSO2 Integration Control Plane (ICP) monitors the MI instances in a deployment. This can be a single MI instance or multiple MI instances in a group (cluster). It provides a graphical view of the integration artifacts that are deployed in the MI instances. You can also perform various management 
and administration tasks using the ICP server. 

The ICP server communicates with the management APIs of each WSO2 Integrator: MI instance in the group (cluster) to get and manipulate data.

## Capabilities of the ICP server

You can use the ICP server to perform the following administration tasks related to your WSO2 Integrator: MI deployment:

!!! tip
    You can search for certain artifacts using the specific name of the artifact if there are many such items in the list.

    ![search in integration control plane]({{base_path}}/assets/img/integrate/monitoring-dashboard/search.png)    

-   <b>View the MI servers in the deployment</b>

    View basic information of each server node.

-   <b>View integration artifacts deployed in a group</b>

    View details of the artifacts deployed in a cluster or group of WSO2 Integrator: MI instances.

-   <b>Identify the MI servers where a specified artifact is deployed</b>

    View the MI server instances where each artifact is deployed.

-   <b>Update deployed artifacts</b>

    !!! Note
        When you update an artifact, only the specified MI instance will be updated. Cluster-wide updates are not available with the ICP server.

    You can activate/deactivate the following artifacts from the ICP server: <i>Proxy Services</i>, <i>Endpoints</i>, and <i>Message Processors</i>.

    You can enable/disable tracing for the following artifacts: <i>Proxy Services</i>, <i>Endpoints</i>, <i>APIs</i> <i>Sequences</i> and <i>Inbound Endpoints</i>.

-   <b>View registry resources</b>

    You can view content, properties, and metadata of each registry resource.

-   <b>View logs</b>

    You can view the log files generated for each WSO2 Integrator: MI instance of the cluster/group.

-   <b>View, update, and add loggers</b>

    This page can be accessed by users with admin rights only. You can view log configurations of each instance and update the log level. You can update the log levels on a single node or apply the change to the entire cluster/group as well. Furthermore, you can add new loggers, which will be applied to the entire cluster/group.

-   <b>Manage users</b>

    This page can be accessed by users with admin rights only. You can view details of users stored in the [external user store]({{base_path}}/install-and-setup/setup/user-stores/managing-users). You can also add new users to the specified cluster/group.

## Using the Integration Control Plane

Follow the steps given below to get started with the WSO2 Integration Control Plane.

### Step 1 - Download the Integration Control Plane

Download the binary distribution of the product, and then follow the instructions to start the WSO2 Integrator: MI and the ICP server.

-   [Install the WSO2 Integrator: MI]({{base_path}}/install-and-setup/install/installing-mi).
-   [Install the Integration Control Plane]({{base_path}}/install-and-setup/install/installing-integration-control-plane).

### Step 2 - Configure the MI servers

Follow the steps given below to configure the MI servers to publish data to the ICP server.

1.  To connect the MI servers with the ICP server, add the following configuration to the `deployment.toml` file (stored in the `<MI_HOME>/conf/` folder) of each server instance.

    ```toml
    [dashboard_config]
    dashboard_url = "https://{hostname/ip}:{port}/dashboard/api/"
    heartbeat_interval = "<HEARTBEAT_INTERVAL>"
    group_id = "<GROUP_ID>"
    node_id = "<NODE_ID>"
    ```
    For example: 
    ```toml
    [dashboard_config]
     dashboard_url = "https://localhost:9743/dashboard/api/"
     heartbeat_interval = 5
     group_id = "mi_dev"
     node_id = "dev_node_2"
    ```
    
    If the WSO2 Integrator: MI server is deployed in a Kubernetes environment, add the following configuration to the `deployment.toml` file. 

    **Limitation**: When there are replicas in the deployment, the write operations will not work properly.

    If communicating via Ingress, use the following configuration:
    ```toml
    dashboard_url = "https://{hostname/ip}:{port}/dashboard/api/"
    management_hostname = "<INGRESS_HOSTNAME>"
    ```
    
    If communicating via Service instead, use the following configuration:
    ```toml
    dashboard_url = "https://{hostname/ip}:{port}/dashboard/api/"
    management_hostname = "<SERVICE_NAME>"
    management_port = <SERVICE_PORT>
    ```

    <table>
        <tr>
            <th>
                dashboard_url
            </th>
            <td>
                <b>Required</b>. This is the URL to access ICP server. Replace the hostname/IP and port (default - 9743) with relevant values from your environment.
            </td>
        </tr>
        <tr>
            <th>
                heartbeat_interval
            </th>
            <td>
                <b>Optional</b>. The time interval (in seconds) between two heartbeats sent from the WSO2 Integrator: MI to the ICP server. By default, the heartbeat_interval is set to `5`. 
            </td>
        </tr>
        <tr>
            <th>
                group_id
            </th>
            <td>
                <b>Optional</b>. In a clustered deployment, the group ID should be the same in all WSO2 Integrator: MI Instances. 
                The ICP server displays information from one group at a time. By default, the group_id is set to `default`. 
            </td>
        </tr>
        <tr>
            <th>
                node_id
            </th>
            <td>
                <b>Optional</b>. By default, in a clustered deployment, the relevant `node_id` is used as this configuration. For more information about the cluster node ID, see the instructions on <a href="{{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi/#node-id">configuring an MI cluster</a>. In a non-clustered deployment, a random UUID is used if the `node_id` is not set for this configuration.
            </td>
        </tr>
        <tr>
            <th>
                management_hostname
            </th>
            <td>
                <b>Required if MI server is deployed in a Kubernetes environment</b>. Hostname for the WSO2 Integrator: MI management endpoint.
            </td>
        </tr>
        <tr>
            <th>
                management_port
            </th>
            <td>
                <b>Optional</b>. Port of the WSO2 Integrator: MI management endpoint.
            </td>
        </tr>
    </table> 

2.  **Optionally**, configure the [WSO2 Integrator: MI user store]({{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore).

    !!! Tip
        Note the following about your user store configurations.

        -   The user credentials for signing in to the ICP server should be stored in your user store. This can be the default **file-based user store** or an **external LDAP/RDBMS** user store.
        -   [User management]({{base_path}}/install-and-setup/setup/user-stores/managing-users) is possible only if you have an RDBMS or LDAP user store for your WSO2 Integrator: MI.
        -   If you have an [external RDBMS user store]({{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore/#configuring-an-rdbms-user-store), be sure that the RDBMS driver is correctly added to the `<MI_HOME>/lib` folder. You will not be able to sign in without the driver.

3.  Regardless of the user who logs in, the ICP server uses the user configured in its `deployment.toml` to fetch the data to the ICP server. Then the ICP server renders these data in the UI according to logged-in user. Hence, configure the super admin user credentials in the user store as mentioned below in the `deployment.toml` file (stored in the `<ICP_HOME>/conf/` folder).

    ```toml
    [mi_super_admin]
    username = "admin"
    password = "admin"
    ```
    
### Step 3 - Start the ICP server

Follow the steps given below.

1. Open a terminal and navigate to the `<ICP_HOME>/bin` folder.
2. Execute one of the commands given below.
      
    === "On MacOS/Linux"
        ```bash 
        ./dashboard.sh
        ```
    === "On Windows"
        ```bash 
        dashboard.bat
        ```
      
### Step 4 - Start the MI servers

Follow the steps given below.

1. Open a terminal and navigate to the `<MI_HOME>/bin` folder.
2. Execute one of the commands given below.
      
    === "On MacOS/Linux"
        ```bash 
        ./micro-integrator.sh
        ```
    === "On Windows"           
        ```bash 
        micro-integrator.bat
        ```
      
### Step 5 - Sign in to the ICP server

Once you have [set up and started the ICP server](#using-the-integration-control-plane), you can access the ICP server URL.

!!! Note "Before you begin"
    Be sure to have at least one WSO2 Integrator: MI server connected to the ICP server before attempting to sign in to it. This can be verified by checking the presence of the following log.
    ```
    New node <node_id> in group : <group_id> is registered. Inserting heartbeat information
    ```
  
1.  Copy the following ICP server URL to your browser:

    ```bash
    https://localhost:9743/login
    ```

2.  Enter the following details to sign in.

    ![login form for integration control plane]({{base_path}}/assets/img/integrate/monitoring-dashboard/login.png)

    <table>
        <tr>
            <th>
                Username
            </th>
            <td>
                The user name to sign in.</br></br>
                <b>Note</b>: This should be a valid username that is saved in the WSO2 Integrator: MI server's user store. By default, the 'admin' user name is configured in the default user store.</br></br> 
                See <a href="{{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore">configuring user stores</a> for information.
            </td>
        </tr>
        <tr>
            <th>
                Password
            </th>
            <td>
                The password of the user name. By default, 'admin' is the user name and password. 
            </td>
        </tr>
    </table> 

3.  Click <b>Sign In</b>.

You are redirected to the home page of the Integration Control Plane. 
     
<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-artifact-home.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-artifact-home.png" width="1000"></a>

### Step 6 - Monitor MI artifacts and logs

Follow the steps given below.

1.  Select the group ID that you want to view from the upper left menu.  
    
    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-select-group.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-select-group.png" width="1000"></a>

    You can see the list of server nodes in each group, as shown in the above diagram.

2.  Click a node ID, and a side navigational panel opens to display the server information.
    
    <a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-server-sidepanal.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-server-sidepanal.png" width="1000"></a>

Now you can view details of artifacts, update artifacts, and perform various other administration tasks. Select the required option from the left-hand navigator.

<a href="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-artifact-list.png"><img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-artifact-list.png" width="300"></a>

## Monitoring health of ICP server

The Integration Control Plane provides a health check endpoint that can be used to monitor the status of the ICP server. The following API format can be used to invoke the health API.

```
https://localhost:9743/dashboard/api/healthz
```

If the ICP server is up and running properly, the following response will appear.

```
{"status":"ready"}
```

<!--
### Proxy Services

Select this option to manage proxy services deployed in the environment.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-proxy-service-1.png">

You can view details, and update the <b>status</b> and enable <b>tracing</b>/<b>statistics</b> for each proxy service.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-proxy-service-2.png">

### Endpoints

Select this option to manage endpoint artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-endpoint-1.png">

You can view details, update the <b>status</b>, and enable <b>tracing</b>/<b>statistics</b> for each endpoint.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-endpoint-2.png">

### Inbound Endpoints

Select this option to manage inbound endpoint artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-inbound-endpoint-1.png">

You can view details of each inbound endpoint as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-inbound-endpoint-2.png">

### Message Processors

Select this option to manage message processor artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-message-processor-1.png">

You can view details, update the <b>status</b>, and enable <b>tracing</b>/<b>statistics</b> for each message processor.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-message-processor-1.png">

### Message Stores

Select this option to manage message store artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-message-store-1.png">

You can view details of each message store as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-message-store-2.png">

### API

Select this option to manage REST API artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-api-1.png">

You can view details and update <b>tracing</b> for each API as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-api-2.png">

### Templates

Select this option to manage template artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-template-1.png">

You can view details for each template as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-template-2.png">

### Sequences

Select this option to manage sequence artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-sequence-1.png">

You can view details and update <b>tracing</b> for each sequence as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-template-2.png">

### Tasks

Select this option to manage Scheduled triggers deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-task-1.png">

You can view details for each task as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-task-2.png">

### Local Entries

Select this option to manage local entries deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-localentry-1.png">

You can view details for each local entry as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-localentry-2.png">

### Data Services

Select this option to manage data services deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-dataservice-1.png">

You can view details for each data service as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-dataservice-2.png">

### Connectors

Select this option to manage connector artifacts deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-connector-1.png">

You can view details for each connector as shown below.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-connector-2.png">

### Carbon Applications

Select this option to see the list of composite applications deployed in the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-capp.png">

### Log Files

Select this option to view and download log files of the WSO2 Integrator: MI instance.

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-view-logs.png">

### Log Configs

Select this option to manage the log4j loggers of the WSO2 Integrator: MI instance.

To view log configs and update log levels:

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-logger-1.png">

To add new loggers:

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-logger-2.png">

### Users

Select this option to manage the users of the WSO2 Integrator: MI instance. These users are stored in the external user store connected to the WSO2 Integrator: MI.

To view and remove users:

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-users-1.png" width="700">

To add new users:

<img src="{{base_path}}/assets/img/integrate/monitoring-dashboard/dashboard-users-2.png" width="700">
-->
