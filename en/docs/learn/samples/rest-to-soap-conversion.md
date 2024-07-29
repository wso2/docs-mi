# REST to SOAP Conversion Sample

This sample demonstrates how we can expose an existing SOAP service as a RESTful API.

This sample consists of a REST API called `CityInformationAPI` and an Endpoint `CityLookupEP`.

The API resource is configured with an URI-Template and parameterized to get the ZIP code. A request payload is constructed with a given zip code. Also, ‘SOAPAction’ which is a mandatory header for SOAP 1.1 is set before invoking the endpoint. Once the response is received, it is sent back to the client converting the XML message to a JSON message.

## Deploying the sample

1.  Open the sample by clicking on the **REST to SOAP Conversion** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2. Open a terminal and run the following command to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/city/lookup/60601'
    ```

3. You can also [run the unit test cases]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    
