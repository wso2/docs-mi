# Hello Docker Sample

This sample guides you through building a Docker image on your local machine with a specified target repository name and tag.

This sample contains a simple REST API called ‘HelloWorld’. When you invoke it, it generates a JSON message and sends it to the client.

## Deploying the sample

1.  Open the sample by clicking on the **Hello Docker** card.
2.  Give a folder location to save the sample.
3.  [Build the docker image]({{base_path}}/develop/deploy-artifacts#build-docker-image) using the build options.

## Running the Docker image

1.  Run the `docker images` command and verify that the image is created. (`hellodocker:1.0.0`)
2.  Run the docker image using the following command.

    ```bash
    docker run -p 8290:8290 -p 8253:8253 -p 9164:9164 hellodocker:1.0.0
    ```
3.  Open a terminal and run the following command to invoke the API deployed in the Docker container.

    ```bash
    curl --location http://localhost:8290/HelloWorld/
    ```
    