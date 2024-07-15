# Content Based Routing Sample

This sample demonstrates the routing capability of WSO2 Micro Integrator (WSO2 MI). In this scenario, routing occurs based on the content of the message payload.

The use case involves an arithmetic operations service. Depending on the operation type, the message needs to be routed to the relevant service. Specifically, the routing decision is based on the value of the `Operation` attribute in the request payload.

The Switch mediator handles the routing by extracting the attribute value using a JSON evaluation expression. Subsequently, the PayloadFactory mediator constructs the message payload required by the backend service. Additionally, the Property mediator sets the message type to JSON, ensuring that the response is converted from XML (as returned by the backend services) to JSON format.

## Deploying the sample

1.  Open the sample by clicking on the **Content Based Routing** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Open a terminal and run the following commands to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/arithmaticAPI' \
    --header 'Content-Type: application/json' \
    --data '{
    "Operation": "Add",
      "Arg1": "10",
      "Arg2": "25"
    }'
    ```

    ```bash
    curl --location 'http://localhost:8290/arithmaticAPI' \
    --header 'Content-Type: application/json' \
    --data '{
    "Operation": "Divide",
      "Arg1": "25",
      "Arg2": "5"
    }'
    ```

    You will receive the following responses.

    ```
    {
        "AddIntegerResponse": {
            "AddIntegerResult": 35
        }
    }
    ```

    ```
    {
        "DivideIntegerResponse": {
            "DivideIntegerResult": 5
        }
    }
    ```

2. You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.
