# Header Based Routing Sample

This sample demonstrates the routing capability of WSO2 Micro Integrator (WSO2 MI). In this scenario, routing occurs based on a header in the message. The integration involves a service that performs arithmetic operations. Depending on the value of the `operation` header in the message, it needs to be routed to the relevant service.

The routing decision is made based on the content of the HTTP header called `Operation`. Specifically, the Switch mediator extracts the value of the element using an XPath expression. Subsequently, the PayloadFactory mediator constructs the message payload required by the backend service.

## Deploying the sample

1.  Open the sample by clicking on the **Header Based Routing** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Open a terminal and run the following commands to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/calculate' \
    --header 'Operation: Add' \
    --header 'Content-Type: text/xml' \
    --data '<ArithmaticOperation>
        <Arg1>10</Arg1>
        <Arg2>25</Arg2>
    </ArithmaticOperation>'
    ```

    ```bash
    curl --location 'http://localhost:8290/calculate' \
    --header 'Operation: Divide' \
    --header 'Content-Type: text/xml' \
    --data '<ArithmaticOperation>
        <Arg1>10</Arg1>
        <Arg2>25</Arg2>
    </ArithmaticOperation>'
    ```

    You will receive the following responses.

    ```
    <?xml version="1.0" encoding="UTF-8" ?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:s='http://www.w3.org/2001/XMLSchema'>
        <SOAP-ENV:Body>
            <AddIntegerResponse xmlns="http://tempuri.org">
                <AddIntegerResult>35</AddIntegerResult>
            </AddIntegerResponse>
        </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
    ```

    ```
    <?xml version="1.0" encoding="UTF-8" ?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:s='http://www.w3.org/2001/XMLSchema'>
        <SOAP-ENV:Body>
            <DivideIntegerResponse xmlns="http://tempuri.org">
                <DivideIntegerResult>.4</DivideIntegerResult>
            </DivideIntegerResponse>
        </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
    ```

2. You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.
