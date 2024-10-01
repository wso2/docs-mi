# Deploying Artifacts

Now that you have developed an integration using the Micro Integrator Visual Studio Code plugin, you have several options to deploy that integration to the Micro Integrator server runtime.

## Build and Run

1.	[Download and install]({{base_path}}/install-and-setup/install/installing-mi) the Micro Integrator server on your local machine.
2.  Follow these steps to add the server to the VS Code extension if it has not been added yet.
    1. Open the command palette by pressing `Ctrl+Shift+P` and select the command `Add MI Server`.
    2. In the file selector that opens, select the Micro Integrator server directory.<br>
       <a href="{{base_path}}/assets/img/develop/add-server.png"><img src="{{base_path}}/assets/img/develop/add-server.png" alt="addServer" width="700"></a>
    
3.  Open the **Project Overview** page by clicking on the **Project Overview** icon.

    <a href="{{base_path}}/assets/img/develop/open-project-overview.png"><img src="{{base_path}}/assets/img/develop/open-project-overview.png" alt="projectOverview" width="700"></a>

4.  Click on the **Build and Run** button on top right corner of the **Project Overview** page.

    <a href="{{base_path}}/assets/img/develop/build-and-run.png"><img src="{{base_path}}/assets/img/develop/build-and-run.png" alt="buildAndRun" width="300"></a>

5.  Then the artifacts will get deployed in the Micro Integrator server and you can see the deployment logs in the **Console**.

    <a href="{{base_path}}/assets/img/develop/run-overview.png"><img src="{{base_path}}/assets/img/develop/run-overview.png" alt="deploymentLogs" width="700"></a>

## Build and Export the Carbon Application

If we are deploying the Carbon Application in some remote server which we cannot configure as in the **Build and Run** option, we can export the Carbon Application and deploy it in the server manually.

- Click on the **Build** button on the top right corner of the **Project Overview** page to build the Carbon Application.
  Once the build is finished, you can switch to VS Code default file explorer view and get the Carbon Application file from the target directory. 

    <a href="{{base_path}}/assets/img/develop/build-capp.png"><img src="{{base_path}}/assets/img/develop/build-capp.png" alt="build" width="700"></a>

- To build and export in a single step, click on the **Export** button on the top right corner of the **Project Overview** page to export the Carbon Application.
  Select a directory to save the exported Carbon Application file.

    <a href="{{base_path}}/assets/img/develop/export-capp.png"><img src="{{base_path}}/assets/img/develop/export-capp.png" alt="export" width="700"></a>

Once the Carbon Application is exported, we can copy it to the `<MI_HOME>/repository/deployment/server/carbonapps` directory manually and start the server.

## Build Docker image

We can use the Micro Integrator VS Code extension to build a Docker image of our integration solution.

1.  Make sure the Docker is installed on your local machine and the Docker daemon is running.
2.  Click on the **Build** button on the top right corner of the **Project Overview** page and select the Docker option to build the Docker image.

    <a href="{{base_path}}/assets/img/develop/build-docker.png"><img src="{{base_path}}/assets/img/develop/build-docker.png" alt="dokcer" width="700"></a>

3. Run the `docker images` command to verify the Docker image is built correctly.
4. Run the Docker image using the following command.

    ```bash
    docker run -p 8290:8290 -p 8253:8253 -p 9164:9164 <DOCKER_IMAGE_NAME>
    ```

    Replace `<DOCKER_IMAGE_NAME>` with the name of the Docker image you have built.

!!! Note
    You might get the following error depending on the name you have given to the project. 

    ```image part 'HelloWorld' doesn't match allowed pattern '[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?(?:(?:/[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?)+)?'```

    To resolve this, go to the `pom.xml` file, locate the `io.fabric8` maven plugin and change the `<name>` configuration to match the regex
    ```xml
    <name>helloworld:${project.version}</name>
    ```
    Then build the Docker image again.
