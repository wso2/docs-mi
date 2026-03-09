# Create a Unit Test Suite

Once you have developed an integration solution, WSO2 Integrator: MI VS Code Extension allows you to build unit tests for the following:

- Test [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) and [REST apis]({{base_path}}/develop/creating-artifacts/creating-an-api) with multiple test cases.
- Test the artifacts with [registry resources]({{base_path}}/develop/creating-artifacts/creating-registry-resources).
- Test the artifacts with [Connectors]({{base_path}}/develop/creating-artifacts/adding-connectors).

    !!! Note
         [Scheduled triggers]({{base_path}}/develop/creating-artifacts/creating-scheduled-task) are not supported by the Unit Testing framework.

## Create Unit Test Suite

1. [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the WSO2 Integrator: MI server and on your computer.
2. Launch Visual Studio Code with the [WSO2 Integrator: MI Extension installed]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode).
3. Select the **Testing** extension from the left side panel to view the **Test Explorer**.
4. Click on **Add New Test Suite** in the **Test Explorer**.
   
    <img src="{{base_path}}/assets/img/develop/unit-tests/add-test-suite.png" alt="add test suite" width="700">
   
5. Specify a name for the unit test suite. 
6. Then, select the artifact type that you want to test in order to get the list of artifacts for the selected type.

    !!! Note
         You can only select one sequence or API artifact per unit test suite.

7. Select the artifact to which you want to write the test cases.

    !!! Note
         You can also [use AI to generate a Unit Test Suite]({{base_path}}/develop/creating-unit-test-suite/#generate-unit-test-suite-using-ai) for the selected artifact.

8. To add a new test case to the test suite, click on **Add test case**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/add-test-case.png" alt="add test case" width="700">
   
9. Enter the following information:

    1. Enter a name for the test case.
   
        !!! Note
             For APIs, you also need to specify the **Resource Path** and **Resource Method** in this section. The **Resource Path** indicates the URL mapping of the API resource. If the URL mapping consists some parameter(s), replace those with values. Also the **Resource Method** indicates the REST method of the resource.

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
         - **Assertion**: Item that you want to assert.
             -   **Payload**: assert the payload
             -   **Status Code**: assert status code of the service
             -   **Transport Header**: assert a transport property

            !!! Note
                When **Assertion** is set to Transport Header, an additional field called **Transport Header** will be displayed to enter the header name

            -   **HTTP Version**: assert http version of the service

         - **Expected Value**: Expected value for the assertion (only when Assertion Type is set to **Assert Equals**). Type can be a **JSON**, **XML** or a **plain text**.
         - **Error Message**: Error message to print when the assertion is failed.

         <img src="{{base_path}}/assets/img/develop/unit-tests/new-assertion.png" alt="new assertion" width="700">
       
    6. Once you have added the properties and assertions, click on **Create** to save the unit test case.
    
        <img src="{{base_path}}/assets/img/develop/unit-tests/test-case-completed.png" alt="completed test case" width="700">
   
10. To add a mock service to the test suite, click on **Add mock service**.

     <img src="{{base_path}}/assets/img/develop/unit-tests/add-mock-service.png" alt="add mock service" width="700">
   
11. You can use a mock service to simulate the actual endpoint. If you have an already created mock service, select the mock service from the list existing mock services as shown below or [create a new mock service]({{base_path}}/develop/creating-unit-test-suite/#create-mock-service).
   
     <img src="{{base_path}}/assets/img/develop/unit-tests/existing-mock-service.png" alt="existing mock service" width="700">

12. Once the required information is completed, click on **Create**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/test-suite-completed.png" alt="completed test suite" width="700">

## Create Mock Service

1. To create a new Mock Service, click **Add New**.

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

8. Review the information given and  click on **Create** to complete the mock service creation.

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
    Additionally, the tests automatically run when executing `mvn clean install`. If you want to run unit tests with your configured server, follow the steps:

    1. Run a separate WSO2 Integrator: MI Instance in unit testing mode. To start the server in unit testing mode, you can pass the argument `-DsynapseTest` as below. If you want to change the synapse testing port, you can pass the `-DsynapseTestPort=<new Port>` argument. Default port is `9008`. It is recommended running on a new MI server without any previously deployed integrations to avoid conflicts.
    
        `sh micro-integrator.sh -DsynapseTest`

    2. Navigate to the integration project location and run the following command.

        `mvn clean install -DtestServerType=remote -DtestServerHost=localhost -DtestServerPort=9008 -P test`

## View unit test coverage

After running unit tests, the framework automatically calculates and displays **line coverage** based on the mediators executed during test execution. The coverage percentage indicates the proportion of mediators in your integration artifacts (APIs, sequences, templates) that were executed at least once during the test run.

When you run unit tests, a coverage summary is displayed in the console output showing:

- **Test Suite Coverage**: Overall coverage percentage for the main artifact being tested
- **Supportive Artifact Coverage**: Individual coverage percentages for any supportive artifacts used (sequences, templates, registry resources)

For a detailed coverage report, review the JSON report generated at `<project-name>/target/unit-test-report.json`. This detailed report provides granular information about which specific mediators were covered and which were not, helping you identify gaps in your test coverage.

!!! Tip
    Aim for high coverage percentages to ensure your integration logic is thoroughly tested. If you notice low coverage for certain artifacts, consider adding additional test cases to exercise untested mediators.

## Generate unit test suite using AI

1. In the **Create New Unit Test** page, give a test suite name, select the artifact type and the artifact to be used for the test suite.
2. Click **Generate Unit Tests with AI** and wait until the AI service responds with the generated test suite and test cases.

    <img src="{{base_path}}/assets/img/develop/unit-tests/generate-test-suite.png" alt="generate test suite" width="700">

!!! Note
    In order to use AI services, a MI Copilot account is required. You shall be prompted to login to MI Copilot if you are not already signed in.

## Generate Unit Test Case using AI

!!! Note
    Adding a test case using AI, is only available for test suites that have already been created.

1. In the **Update Unit Test** page, click on **Add Test Case**.

    <img src="{{base_path}}/assets/img/develop/unit-tests/add-test-case-ai.png" alt="add test case AI" width="700">

2. Click on **Generate Test Case with AI**. Input fields are not required to be filled.

    <img src="{{base_path}}/assets/img/develop/unit-tests/generate-test-case.png" alt="generate test case" width="700">

3. Fill the **Test Case Description** explaining the test case that needs to be added.

4. Click on **Generate**. Wait for the AI service to respond with the generated test case.

    <img src="{{base_path}}/assets/img/develop/unit-tests/generate-test-case-description.png" alt="generate test case description" width="700">

!!! Note
    The newly generated test will be added to the existing test suite as a new test case.