# Proxying a SOAP Service Sample

This sample features a service that acts as a proxy for an existing service exposed via a SOAP API. When a client invokes this service, it simply forwards the message to the backend service without altering its content.

Specifically, the sample includes a simple proxy service called ‘ProxyForEchoService,’ which serves as the intermediary. Additionally, it contains an endpoint representing the actual backend service within the MI context.

## Deploying the sample

1.  Open the sample by clicking on the **Proxying a SOAP Service** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1.  Open a terminal and run the following commands to invoke the Service.

    ```bash
    curl --location 'http://localhost:8290/services/ProxyForEchoService' \
    --header 'Content-Type: text/xml' \
    --data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <echo:echoString xmlns:echo="http://echo.services.core.carbon.wso2.org">
              <in>Hello</in>
            </echo:echoString>
        </soapenv:Body>
    </soapenv:Envelope>' 
    ```

    You will receive a response like following.

    ```
    <ns:echoStringResponse xmlns:ns="http://echo.services.core.carbon.wso2.org">
        <return>Hello</return>
    </ns:echoStringResponse>
    ```

2.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.
