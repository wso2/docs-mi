# Running the Integration Control Plane

Follow the steps given below to run the WSO2 Micro Integrator runtime and the Integration Control Plane.

## Before you begin

Follow the steps given below before you start.

1.  Download and install the servers:

    -     [Download and install]({{base_path}}/install-and-setup/install/installing-integration-control-plane) the Integration Control Plane.
    -     [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the Micro Integrator.

2.  Set up the Micro Integrator:

    1.  Open the `deployment.toml` file (stored in the `<MI_HOME>/conf/` folder) of the Micro Integrator, and add the following configuration.

        ```toml
        [dashboard_config]
        dashboard_url = "https://localhost:9743/dashboard/api/"
        heartbeat_interval = 5
        group_id = "mi_dev"
        node_id = "dev_node_2"
        ```

    2.  Be sure to change the host and port number of the `dashboard_url` in the above configuration if you have changed the default host and port for the ICP server.

    !!! Info
        See the section on [configuring the MI servers for the dashboard]({{base_path}}/observe-and-manage/working-with-integration-control-plane/#step-2-configure-the-mi-servers) for more information.

3.  [Start the Micro Integrator]({{base_path}}/install-and-setup/install/running-the-mi).

## Configuring Single Sign-on with OpenID Connect

!!! note "Before you begin"
	- 	This is an **optional** configuration that you can do to enable Single Sign-On for the Integration Control Plane. By default, the Integration Control Plane uses its own user store for authentication.
	-	See the documentation of your preferred Identity provider for instructions on setting up OpenID Connect.
	-	This feature was tested with WSO2 IS 5.10.0 and Shibboleth 4.1.2. There may be compatibility issues when using other vendors.

Follow the steps given below to connect the Integration Control Plane to your Identity provider.

1.	Open the `deployment.toml` file stored in the `<ICP_HOME>/conf/` directory.
2.	Add the following configurations and update the required values.

	```toml
	[sso]
	enable = true
	client_id = "8e4uDF4ewc2aEa"
	base_url = "https://localhost:9443"
	jwt_issuer = "https://localhost:9443/oauth2/token"
	resource_server_URLs = ["https://localhost:9743"]
	sign_in_redirect_URL = "https://localhost:9743/sso"
	```

	Parameters used above are explained below.

	<table>
		<tr>
			<th>Parameter</th>
			<th>Desciption</th>
		</tr>
		<tr>
			<td>
				<code>enable</code>
			</td>
			<td>
				Use this paramater to enable Single Sign-On.
			</td>
		</tr>
		<tr>
			<td>
				<code>client_id</code>
			</td>
			<td>
				The client ID generated from the Identity Provider.
			</td>
		</tr>
		<tr>
			<td>
				<code>base_url</code>
			</td>
			<td>
				The URL of the Identity Provider.
			</td>
		</tr>
		<tr>
			<td>
				<code>jwt_issuer</code>
			</td>
			<td>
				The Identity Provider's issuer identifier.
			</td>
		</tr>
		<tr>
			<td>
				<code>resource_server_URLs</code>
			</td>
			<td>
				The URL of the Integration Control Plane.
			</td>
		</tr>
		<tr>
			<td>
				<code>sign_in_redirect_URL</code>
			</td>
			<td>
				The Sign In redirect URL of the Integration Control Plane.
			</td>
		</tr>

	</table>

See the [complete list of parameters]({{base_path}}/reference/config-catalog-integration-control-plane/#single-sign-on) you can configure for the single sign-on.

## Starting the Integration Control Plane

Follow the steps given below.

1. Open a command prompt as explained below.

      <table>
            <tr>
                  <th>On <b>Linux/macOS</b></td>
                  <td>Establish an SSH connection to the server, log on to the text Linux console, or open a terminal window.</td>
            </tr>
            <tr>
                  <th>On <b>Windows</b></td>
                  <td>Click <b>Start &gt;Run</b>, type <b>cmd</b> at the prompt, and then press <b>Enter</b>.</td>
            </tr>
      </table>     

2. Navigate to the `<ICP_HOME>/bin` folder from your command line.
3. Execute one of the commands given below.

    === "On macOS/Linux"
        ```bash 
        sh dashboard.sh
        ```
    === "On Windows"
        ```bash 
        dashboard.bat
        ```

## Accessing the Integration Control Plane

Once you have [started the ICP server](#starting-the-dashboard-server):

1.  Access the ICP server using the following URL:

    ```bash
    https://localhost:9743/dashboard
    ```

    ![login form for Integration Control Plane]({{base_path}}/assets/img/integrate/monitoring-dashboard/login.png)

2.  Enter the following details to sign in:

    <table>
        <tr>
            <th>
                Username
            </th>
            <td>
                The user name to sign in.</br></br>
                <b>Note</b>: This should be a valid username that is saved in the Micro Integrator server's user store. By default, the 'admin' user name is configured in the default user store.</br></br> 
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

2.  Be sure that the Micro Integrator servers are [already configured and started](#before-you-begin) before you sign in.

See the [Integration Control Plane]({{base_path}}/observe-and-manage/working-with-integration-control-plane) documentation for information on the control plane's capabilities and how to use them.

## Stopping the Integration Control Plane

To <b>stop</b> the ICP standalone application, go to the terminal and press <i>Ctrl+C</i>.
