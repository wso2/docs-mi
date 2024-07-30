# Message Filtering Sample

This sample demonstrates how message filtering can be achieved using the Micro Integrator (MI) based on a request path parameter. The scenario revolves around a verification service that checks the validity of phone numbers.

The sample includes a REST API called `PhoneVerifyAPI` and an endpoint named `PhoneVerifyEP`. The API resource is configured with a URI template that is parameterized to fetch the phone number. Within this setup, the Filter mediator acts as an IF-ELSE programming construct. It validates whether the phone number contains 10 digits. If the condition evaluates to true, the request is sent to the backend. Otherwise, an error message is constructed and sent back to the client.

## Deploying the sample

1.  Open the sample by clicking on the **Message Filtering** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1.  Open a terminal and run the following commands to invoke the API.

    Valid phone number
    ```bash
    curl --location 'http://localhost:8290/phones/validate/7575449510' 
    ```

    Invalid phone number
    ```bash
    curl --location 'http://localhost:8290/phones/validate/75754495' 
    ```

    You will receive the following responses.

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <PhoneReturn xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://ws.cdyne.com/PhoneVerify/query">
        <Company>Bandwidth.com</Company>
        <Valid>true</Valid>
        <Use>Assigned to a code holder for normal use.</Use>
        <State>VA</State>
        <RC>NORFOLK-BUTE ST</RC>
        <OCN>079F</OCN>
        <OriginalNumber>7575449510</OriginalNumber>
        <CleanNumber>7575449510</CleanNumber>
        <SwitchName>NRFLVABSXUY</SwitchName>
        <SwitchType />
        <Country>United States</Country>
        <CLLI>NRFLVABS</CLLI>
        <PrefixType>CLEC - (Competitive Local Exchange Carrier)</PrefixType>
        <LATA>252  </LATA>
        <sms>CLEC - (Competitive Local Exchange Carrier)</sms>
        <AssignDate>08/03/2018</AssignDate>
        <TelecomCity>Norfolk</TelecomCity>
        <TelecomCounty>Southampton</TelecomCounty>
        <TelecomState>VA</TelecomState>
        <TelecomZip>23837</TelecomZip>
        <TimeZone>ET</TimeZone>
        <Lat>36.7153</Lat>
        <Long>-77.0647</Long>
        <Wireless>false</Wireless>
        <LRN />
    </PhoneReturn>
    ```

    ```
    <Message>Invalid Phone Number</Message>
    ```

3.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.
