# Using a Remote Micro Integrator

The following instructions can be used to run your artifacts in a remote Micro Integrator instance.

## Deploy and run artifacts in a remote instance

However, when your solutions are ready to be moved to your production environments, it is recommended to use a **CICD pipeline**.

!!! Note
     As an alternative, you can skip the steps given below and manually copy the exported CAR file to the `<MI_HOME>/repository/deployment/server/carbonapps/` folder, where `<MI_HOME>` is the root folder of your Micro Integrator installation.
     For more information on how to export a CAR file, see [Exporting Artifacts]({{base_path}}/develop/exporting-artifacts).

1. [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the Micro Integrator server and on your computer. 

2. Launch Visual Studio Code with the [Micro Integrator Extension installed]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode).

3. Open the command palette of the VS Code and type command `Add MI Server`.

    <img src="{{base_path}}/assets/img/develop/remote-server/add-server-command.png" alt="add server command" width="700">

4. Click on `Add MI Server` and when the file selector opens, select the Micro Integrator server directory.

    <img src="{{base_path}}/assets/img/develop/remote-server/change-server-path.png" alt="change server path" width="700">

5. Click on the **Run** button on top right corner of the **Project Overview** page.

    <img src="{{base_path}}/assets/img/develop/remote-server/build-and-run.png" alt="build and run" width="700">

6. This will deploy the artifacts in the Micro Integrator server and start the server. Then the server logs can be viewed in the Terminal.
    
    <img src="{{base_path}}/assets/img/develop/remote-server/server-started.png" alt="server started" width="700">

## Deploy, redeploy, or remove artifacts in a remote instance

If you require to make any changes to the CAR file by modifying its artifacts, the changes can be made via the MI VS Code Extension itself while the server is running and once the required changes are made, click on the restart icon to redeploy the updated CAR file in the remote server.

 <img src="{{base_path}}/assets/img/develop/remote-server/restart-server.png" alt="restart server" width="700">

!!! Note
	 Hot deployment is enabled in the Micro Integrator by default. This allows you to redeploy artifacts without restarting the server. 
     Therefore, if you manually add or remove any CAR file to or from the `<MI_HOME>/repository/deployment/server/carbonapps/` folder, those will be deployed or removed from the server without a server restart.

## Disable graceful shutdown (Only for testing)

By default, the graceful shutdown capability is enabled in the Micro Integrator distribution. This means that the server will not immediately shut down when there are incomplete HTTP messaging transactions that are still active. These are transactions that are processed by the HTTP/S PassThrough transport.

For example, consider a delay in receiving the response from the backend (which should be returned to the messaging client). Because graceful shutdown is enabled, the Micro Integrator will wait until the time specified by the following parameter in the server configuration file (`deployment.toml` file) is exceeded before shutting down.

```toml
[transport.http]
socket_timeout = 180000
```

You can disable this feature by using the following system property when you start the server:

!!! Warning
	Disabling graceful shutdown is only recommended for a development environment for the purpose of making the development and testing process faster. Be sure to have graceful shutdown enabled when you move to production.

```bash
-DgracefulShutdown=false
``` 
