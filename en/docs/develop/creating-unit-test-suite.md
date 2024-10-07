# Create a Unit Test Suite

Once you have developed an integration solution, WSO2 Micro Integrator VS Code Extension allows you to build unit tests for the following:

- Test [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) and [REST apis]({{base_path}}/develop/creating-artifacts/creating-an-api) with multiple test cases.
- Test the artifacts with [registry resources]({{base_path}}/develop/creating-artifacts/creating-registry-resources).
- Test the artifacts with [Connectors]({{base_path}}/develop/creating-artifacts/adding-connectors).

    !!! Note
         [Scheduled Tasks]({{base_path}}/develop/creating-artifacts/creating-scheduled-task) are not supported by the Unit Testing framework.

## Create Unit Test Suite

1. [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the Micro Integrator server and on your computer.
2. Launch Visual Studio Code with the [Micro Integrator Extension installed]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode).
3. Select the **Testing** extension from the left side panel to view the **Test Explorer**.
4. Click on **Add New Test Suite** in the **Test Explorer**.
   
    <img src="{{base_path}}/assets/img/develop/unit-tests/add-test-suite.png" alt="add test suite" width="700">
   
5. Specify a name for the unit test suite. 
6. Then, select the artifact type that you want to test in order to get the list of artifacts for the selected type.

    !!! Note
         You can only select one sequence or API artifact per unit test suite.

7. Select the artifact to which you want to write the test cases.
8. To add a new test case to the test suite, click on **Add test case**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/add-test-case.png" alt="add test case" width="700">
   
9. Enter the following information:

    1. Enter a name for the test case.
   
        !!! Note
             For APIs, you also need to specify the **Request Path** and **Request Method** in this section. The **Request Path** indicates the URL mapping of the API resource. If the URL mapping consists some parameter(s), replace those with values. Also the **Request Method** indicates the REST method of the resource.

    2. Update the **Input Payload and Properties** section:

        - **Input Payload**: The input payload of the test case. This can be **JSON**, **XML**, or **plain text**.
        - **Input properties**: The input properties of the test case. There are three types of properties allowed in unit testing: **Synapse($ctx), Axis2($axis2)**, and **Transport($trp)** properties.
       
        <img src="{{base_path}}/assets/img/develop/unit-tests/add-property.png" alt="add property" width="700">
       
        !!! Note
             For sequences, the test suite allows to add all type of properties with the value. But for APIs you are only allowed to add transport properties.
   
        <img src="{{base_path}}/assets/img/develop/unit-tests/new-property.png" alt="new property" width="700">

    3. In the **Assertions** section, you can add multiple assertions belonging to two types. **AssertEquals** to check the whether the mediated result and expected values are equal. **AssertNotNull** to check whether the mediated result is not null.

         <img src="{{base_path}}/assets/img/develop/unit-tests/add-assertion.png" alt="add assertion" width="700">

    4. Fill the following information for each assertion.

         - **Assertion Type**: Type of the assertion.
         - **Actual Expression**: Expression that you want to assert.
             -   **$body**: assert the payload<br/>
             -   **$ctx:<property_name>**: assert synapse property
             -   **$axis2:<property_name>**: assert axis2 property
             -   **$trp:<property_name>**: assert transport property
             -   **$statusCode**: assert status code of the service
             -   **$httpVersion**: assert http version of the service

         - **Expected Value**: Expected value for the actual expression. Type can be a **JSON**, **XML** or a **plain text**.
         - **Error Message**: Error message to print when the assertion is failed.
       
         <img src="{{base_path}}/assets/img/develop/unit-tests/new-assertion.png" alt="new assertion" width="700">
       
    6. Once you have added at least one assertion, click on **Create** to save the unit test case.
    
        <img src="{{base_path}}/assets/img/develop/unit-tests/test-case-completed.png" alt="completed test case" width="700">
   
10. To add a mock service to the test suite, click on **Add mock service**.

     <img src="{{base_path}}/assets/img/develop/unit-tests/add-mock-service.png" alt="completed test case" width="700">
   
11. You can use a mock service to simulate the actual endpoint. If you have an already created mock service, select the mock service from the list existing mock services as shown below or [create a new mock service]({{base_path}}/develop/creating-unit-test-suite/#create-mock-service).
   
     <img src="{{base_path}}/assets/img/develop/unit-tests/existing-mock-service.png" alt="existing mock service" width="700">

12. Once the required information is completed, click on **Create**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/test-suite-completed.png" alt="completed test suite" width="700">

## Create Mock Service

1. From the dropdown which has the existing list of mock services, select **Create New**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/new-mock-service.png" alt="add mock service" width="700">

2. Enter the following information:
    - **Name of the Mock Service**: A name for the mock service.
    - **Mocking Endpoint Name**: Endpoint name which wants to mock.
    - **Mock Service Port**: Port for the mock service.
    - **Mock Service Context**: Main context for the service starts with '/'.

3. Add multiple resources for the mock service as needed. To add multiple resources click the **Add mock service resource** button.

    <img src="{{base_path}}/assets/img/develop/unit-tests/add-mock-service-resource.png" alt="add mock resource" width="700">

4. Enter the following information for the mock resource:

    - **Service Sub Context**: Sub context of the resource starts with '/'.
    - **Service Method**: REST method type of the resource.

5. Fill the **Expected request to resource** section if you want to mock an endpoint based on the coming request headers or payload.

    - **Header Name**: Expected request header name.
    - **Header Value**: Expected request header value.
    - **Expected Request Payload**: Expected request payload to the service.

    !!! Info
         Entered request headers/payload must be matched with the request to send the response this mock service.

6. Fill the **Expected response from resource** section to get a response from the service.
        
    - **Response Status Code**: Response status code of the mock service.
    - **Header Name**: Response request header name.
    - **Header Value**: Response request header value.
    - **Expected Response Payload**: Expected response payload from the service.

7. Once the required information is completed in the **Mock Resource Configuration** page, click on **Submit**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/mock-resource-completed.png" alt="completed mock resource" width="700">

8. Review the information given and  click on **Submit** to complete the mock service creation.

    <img src="{{base_path}}/assets/img/develop/unit-tests/mock-service-completed.png" alt="completed mock service" width="700">

!!! Info
     Please note that the mock service **should have a sub context** with '/' defined, and additional sub contexts should be defined after that.
     
     - If you are trying to mock an endpoint `http://petstore.com/pets` where the mock service context is `/pet`, the sub-context should be `/`.
     - If you are trying to mock an endpoint `http://petstore.com/pets/id` where the mock service context is `/pet`, the sub-context should be `/id`.

## Update Unit Test Suite

1. Switch to the **Testing** extension from the left side panel of the VS Code to view the **Test Explorer** in which the existing test suites will be listed.
2. Click on the **Diagram** icon which is on the right side of any given unit test suite in order to update it by following the steps similar to its creation process.
   
    <img src="{{base_path}}/assets/img/develop/unit-tests/update-test.png" alt="update test" width="700">

## Run Unit Test Suite

1. Switch to the **Testing** extension from the left side panel of the VS Code to view the **Test Explorer** in which the existing test suites will be listed.
2. Click on the **Run** icon which is on the right side of any given unit test suite in order to run it and get the test results.
   
    <img src="{{base_path}}/assets/img/develop/unit-tests/run-test.png" alt="run test" width="700">

!!! Note
     Within the WSO2 MI VS Code Extension an option is given to generate the unit test suite for a selected artifact using AI.

     To use this option, in the **Create New Test Suite** page click on the **Generate Unit Tests with AI** button after giving a name for the test suite and selecting the artifact to be used for the test suite. 
    
     <img src="{{base_path}}/assets/img/develop/unit-tests/generate-with-ai.png" alt="generate test" width="700">

!!! Note
    Additionally, you can run unit tests from you command line interface (CLI) by following the steps:

    1. Run a separate Micro Integrator Instance in unit testing mode. To start the server in unit testing mode you can pass the argument `-DsynapseTest` as below. If you want to change the synapse testing port, you can pass the `-DsynapseTestPort=<new Port>` argument. Default port is `9008`. It is recommended to run on a new MI server without any previously deployed integrations to avoid conflicts.
    
        `sh micro-integrator.sh -DsynapseTest`

    2. Navigate to integration project location and run the following command.

        `mvn clean install -DtestServerType=remote -DtestServerHost=localhost -DtestServerPort=9008 -P test`

