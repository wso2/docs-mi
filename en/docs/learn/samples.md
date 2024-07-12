# Overview

This section contains a description about the sample integration scenarios included in the Micro Integrator VS Code plugin.

## Accessing the samples

We can access the samples through the welcome page of the VS Code plugin.
If you are not currently on the welcome page, you can navigate to it by giving the "Open MI Welcome" command in the VS Code command palette.

<a href="{{base_path}}/assets/img/learn/samples/access_samples.png"><img src="{{base_path}}/assets/img/learn/samples/access_samples.png" alt="Access Samples" width="700"></a>

By clicking on **More...** we can get the following window with all the samples which has the search and filter options.

<a href="{{base_path}}/assets/img/learn/samples/access_samples2.png"><img src="{{base_path}}/assets/img/learn/samples/access_samples2.png" alt="Access Samples" width="700"></a>

### 1. Hello World Service

This sample contains a simple REST API, which is exposed via the HTTP protocol.
When the API gets invoked, a simple message is generated and sent back to the client as the response.

#### Running the sample
1.  Open the sample by clicking on the **Hello World Service** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

#### Invoking the sample

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
