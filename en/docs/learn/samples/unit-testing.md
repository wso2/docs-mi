# Unit Testing Sample

The main intention of this sample is to demonstrate the usage of the Synapse unit testing framework. It contains four main test suites that showcase the capabilities of the unit testing framework.

Specifically, the sample includes an API that fetches the url_key path parameter from the request URL and responds with a simple payload based on the value of the parameter.

Test suites are located inside the src/test/wso2mi directory.


### Business Logic Test Suite
businessLogicTestSuite has two test cases which sends /?url_key=payload_1 and /?url_key=payload_other as api request path and asserts whether responsePayload_1 is received for the first case and responsePayload_2 to the second.

### Secondary Flow Test Suite
secondaryFlowTestSuite has two test cases which sets payload property to payload_1 and payload_2 and asserts whether flowvalue property is set to flowValue_1 and flowValue_2 respectively after calling secondaryFlow sequence.

### First Sub Flow Test Suite
firstSubFlowTestSuite has one test case which sets flowValue property to flowValue_1 and asserts whether the value is set correctly after executing firstSubFlow sequence.

### Second Sub Flow Test Suite
secondSubFlowTestSuite has one test case which sets flowValue property to flowValue_2 and asserts whether the value is set correctly after executing secondSubFlow sequence.

## Deploying the sample

1.  Open the sample by clicking on the **Unit Test Tutorial** card.
2.  Give a folder location to save the sample.

## Running the test suites

1. Switch to the unit test view and click on the **Run Test** button on top level to run the test suite at once or click on the **Run Test** button of specific test case to run them separately.

<a href="{{base_path}}/assets/img/learn/samples/run-unit-test.png"><img src="{{base_path}}/assets/img/learn/samples/run-unit-test.png" alt="Access Samples" width="700"></a>
