# XML to JSON Transformation Sample

This sample demonstrates some message transformation capabilities of the Micro Integrator.

The API constructs a JSON payload after receiving the request as the actual backend requires a JSON message. But the received request is in XML format. Hence, the mediation layer transforms the XML into a JSON by mapping the necessary elements from the request payload. The endpoint returns a JSON message back as the response. Then the JSON response get converted to a XML and responded back to the client.

## Deploying the sample

1.  Open the sample by clicking on the **XML to JSON Transformation** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1.  Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow step 2 for manual invocation.

2.  Open a terminal and run the following command to invoke the API.

    ```bash
    curl --location --request POST 'http://localhost:8290/laboratory/users' --header 'Content-Type: application/xml' \
    --data-raw '<user>
      <name>Sam</name>
      <job>Scientist</job>
    </user>'
    ```

3.  You can also [run the unit test cases]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    
