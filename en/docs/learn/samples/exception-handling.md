# Exception Handling Sample

This sample demonstrates the exception handling capabilities of the Micro Integrator.

This sample consists of an API called `TimeoutAPI`, an endpoint called `DelayHttpEP`, and a sequence called `TimeoutFailureSeq`.

The backend service takes around 60 seconds to respond back. The endpoint timeout is set to 30 seconds and upon timeout, the fault sequence is executed. The sequence logs the proper error and responds back with an error message.

## Deploying the sample

1.  Open the sample by clicking on the **Exception Handling** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2. Open a terminal and run the following command to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/timeout'
    ```

3. You can also [run the unit test cases]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    
