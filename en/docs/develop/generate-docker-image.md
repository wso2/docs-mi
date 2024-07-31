# Generating Docker Images

## Before you begin

1.  Install Docker from the [Docker Site](https://docs.docker.com/).
2.  Create a Docker Account at [Docker Hub](https://hub.docker.com) and log in.
3.  Start the Docker server.

## Generate the Docker image

We can use the Micro Integrator VS Code Extension to build a Docker image of our integration solution.

1. [Create a project]({{base_path}}/develop/create-integration-project) and develop the integration solution by creating the required artifacts.
   
    !!! Note
         Make sure that the `DOCKER_HOST` environment variable is set on your machine before following the next step.

2. Click on the **Build** button on the top right corner of the **Project Overview** page and select the Docker option to build the Docker image.

    <img src="{{base_path}}/assets/img/develop/build-docker-image.png" alt="build docker image" width="700">

3. Once the build is completed, run the `docker images` command to verify that the Docker image was built successfully.
4. Run the Docker image using the following command. Replace `<DOCKER_IMAGE_NAME>` with the name of the Docker image you have built.

    ```bash
    docker run -p 8290:8290 -p 8253:8253 -p 9164:9164 <DOCKER_IMAGE_NAME>
    ```

!!! Note
    You might get the following error depending on the name you have given to the project.

    ```image part 'HelloWorld' doesn't match allowed pattern '[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?(?:(?:/[a-z0-9]+(?:(?:(?:[._]|__|[-]*)[a-z0-9]+)+)?)+)?'```

    To resolve this, go to the `pom.xml` file, locate the `io.fabric8` maven plugin and change the `<name>` configuration to match the regex
    ```xml
    <name>helloworld:${project.version}</name>
    ```
    Then build the Docker image again.
