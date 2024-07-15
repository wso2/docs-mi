# Hello World Service Sample

This sample contains a simple REST API, which is exposed via the HTTP protocol.

When the API gets invoked, a simple message is generated and sent back to the client as the response.

## Deploying the sample

1.  Open the sample by clicking on the **Hello World Service** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2. Open a terminal and run the following command to invoke the API.
    
    ```bash
    curl --location http://localhost:8290/HelloWorld/
    ```

3. You can also [run the unit test cases]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    
