# API Testing Sample

This sample contains a simple REST API with four resources for GET, POST, PUT, and DELETE methods with their respective test cases.

When the API gets invoked, a simple message is generated according to the called resource method and sent back to the client as the response.

This sample contains a simple REST API called `RESTApi`. And it's respective test suites in the `test` directory.

## Deploying the sample

1.  Open the sample by clicking on the **API Testing** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2. Open a terminal and run the following commands to invoke the APIs.
    
    ```bash
    curl --location --request GET 'http://localhost:8290/api/unittest'
    ```

    ```bash
    curl --location --request POST 'http://localhost:8290/api/unittest'
    ```

    ```bash
    curl --location --request PUT 'http://localhost:8290/api/unittest'
    ```

    ```bash
    curl --location --request DELETE 'http://localhost:8290/api/unittest'
    ```

3. You can also [run the unit test cases]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    
