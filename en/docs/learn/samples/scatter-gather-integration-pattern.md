# Scatter Gather Integration Pattern Sample

This sample demonstrates how to implement the Scatter-Gather enterprise integration pattern with Micro Integrator.

The sample includes a REST API called MissionServiceAPI and three endpoints: MissionEP1, MissionEP2 and MissionEP3.

When a client invokes the API, it clones the request payload and sends it to the three different endpoints. The responses from these endpoints are then aggregated and built into a single payload, which is sent back to the client.

## Deploying the sample

1.  Open the sample by clicking on the **Scatter Gather Integration Pattern** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1.  Open a terminal and run the following commands to invoke the Service.

    ```bash
    curl --location 'http://localhost:8290/missionservice' \
    --header 'Content-Type: text/xml' \
    --data '<tem:Mission xmlns:tem="http://tempuri.org"/>' 
    ```

    You will receive a response like following.

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:s="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <soapenv:Body>
            <MissionResult xmlns="http://tempuri.org">Resellers of cloud-based Web 3.0 application development gaming for emerging markets.</MissionResult>
            <MissionResult xmlns="http://tempuri.org">Spearheading the next generation of compliant broad-band instrumentation models for high-worth individuals.</MissionResult>
            <MissionResult xmlns="http://tempuri.org">The industry leader in personal quantum XML marketing services for industry and government.</MissionResult>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

2.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.
