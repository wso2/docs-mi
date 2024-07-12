# Overview

This section contains a description about the sample integration scenarios included in the Micro Integrator VS Code plugin.

## Accessing the samples

We can access the samples through the welcome page of the VS Code plugin.
If you are not currently on the welcome page, you can navigate to it by giving the "Open MI Welcome" command in the VS Code command palette.

<a href="{{base_path}}/assets/img/learn/samples/access_samples.png"><img src="{{base_path}}/assets/img/learn/samples/access_samples.png" alt="Access Samples" width="700"></a>

By clicking on **More...** we can get the following window with all the samples which has the search and filter options.

<a href="{{base_path}}/assets/img/learn/samples/access_samples2.png"><img src="{{base_path}}/assets/img/learn/samples/access_samples2.png" alt="Access Samples" width="700"></a>

## Hello World Service

This sample contains a simple REST API, which is exposed via the HTTP protocol.
When the API gets invoked, a simple message is generated and sent back to the client as the response.

### Running the sample
1.  Open the sample by clicking on the **Hello World Service** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

### Invoking the sample

1.  Once the sample is running you will get a runtime services view with the API swagger definition. You can test the API using the swagger editor or follow the step 2 for manual invocation.

2.  Open a terminal and run the following command to invoke the API.
    ```bash
    curl http://localhost:8290/HelloWorld/
    ```

    You will receive the following response.
    ```
    { "Hello": "World"}
    ```

3.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    

## Content Based Routing

This sample demonstrates the routing capability of WSO2 Micro Integrator (WSO2 MI). In this scenario, routing occurs based on the content of the message payload.

The use case involves an arithmetic operations service. Depending on the operation type, the message needs to be routed to the relevant service. Specifically, the routing decision is based on the value of the ‘Operation’ attribute in the request payload.

The Switch mediator handles the routing by extracting the attribute value using a JSON evaluation expression. Subsequently, the PayloadFactory mediator constructs the message payload required by the backend service. Additionally, the Property mediator sets the message type to JSON, ensuring that the response is converted from XML (as returned by the backend services) to JSON format.

### Running the sample
1.  Open the sample by clicking on the **Content Based Routing** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

### Invoking the sample

1.  Open a terminal and run the following commands to invoke the API.
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

3.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    

## Header Based Routing

This sample demonstrates the routing capability of WSO2 Micro Integrator (WSO2 MI). In this scenario, routing occurs based on a header in the message. The integration involves a service that performs arithmetic operations. Depending on the value of the “operation” header in the message, it needs to be routed to the relevant service.

The routing decision is made based on the content of the HTTP header called ‘Operation’. Specifically, the Switch mediator extracts the value of the element using an XPath expression. Subsequently, the PayloadFactory mediator constructs the message payload required by the backend service.

### Running the sample
1.  Open the sample by clicking on the **Header Based Routing** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

### Invoking the sample

1.  Open a terminal and run the following commands to invoke the API.
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

3.  You can also [run the unit test case]({{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suite) defined for this sample.    


## MessageFiltering

This sample demonstrates how message filtering can be achieved using the Enterprise Service Bus (ESB) based on a request path parameter. The scenario revolves around a verification service that checks the validity of phone numbers.

The sample includes a REST API called “PhoneVerifyAPI” and an endpoint named “PhoneVerifyEP.” The API resource is configured with a URI template that is parameterized to fetch the phone number. Within this setup, the Filter mediator acts as an IF-ELSE programming construct. It validates whether the phone number contains 10 digits. If the condition evaluates to true, the request is sent to the backend. Otherwise, an error message is constructed and sent back to the client.

### Running the sample
1.  Open the sample by clicking on the **Message Filtering** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

### Invoking the sample

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
