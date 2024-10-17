# How to Use Inbound Endpoints

## What you'll build

In this sample scenario, you will use an **Inbound Endpoint** to expose an already defined REST API through a different port. 
You can reuse the REST API that was defined in the [Sending a Simple Message to a Service]({{base_path}}/learn/integration-tutorials/sending-a-simple-message-to-a-service) tutorial. 

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Open the integration project

1. Download the required project from [here]({{base_path}}/assets/attachments/learn/tutorials/sending-simple-message-tutorial.zip) and extract.

2. Launch VS Code with the Micro Integrator extension installed.

3. Click on the Micro Integrator icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a>

4. Click **Open MI Project** on **Design View**.

5. Provide the location of the downloaded project path.

#### Develop the inbound endpoint

1. Once you have opened the integration project described above, the **Micro Integrator Project Explorer** will appear with the previously created artifacts. Note that the `HealthcareAPI` is already included.

    <a href="{{base_path}}/assets/img/learn/tutorials/using-inbound-endpoint/inbound-project-explorer.png"><img src="{{base_path}}/assets/img/learn/tutorials/using-inbound-endpoint/inbound-project-explorer.png" alt="Inbound project explorer" width="40%"></a>

2. Navigate to the **MI Project Explorer** > **Inbound Endpoints**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/create-inbound-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/create-inbound-endpoint.png" alt="create inbound endpoint" width="40%"></a>

2. Hover over **Inbound Endpoints** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-inbound-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-inbound-endpoint.png" alt="add inbound endpoint" width="40%"></a>

3. On the **Inbound EP Form**, select **HTTP** as the inbound endpoint type.

3.  Enter the following details and click **Add**.
    
    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Inbound Endpoint Name</td>
            <td>
                QueryDoctorInboundEndpoint
            </td>
        </tr>
        <tr>
            <td>Injecting Sequence Name</td>
            <td>
                TestIn
            </td>
        </tr>
        <tr>
            <td>Error Sequence Name</td>
            <td>
                fault
            </td>
        </tr>
        <tr>
            <td>Inbound HTTP port</td>
            <td>
                8285
            </td>
        </tr>
        <tr>
            <td>Dispatch Filter Pattern</td>
            <td>
                /healthcare/querydoctor/.\*
            </td>
        </tr>
    </table>

The endpoint will now be mapped to any URL that matches the pattern provided above. You will expose the healthcare API on a new port through this inbound endpoint.

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the backend service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, navigate to the location where you saved the back-end service.
3. Execute the following command to start the service:

    ```bash
    java -jar Hospital-Service-JDK11-2.0.0.jar
    ```

#### Send the client request

Let's send a message to the **healthcare** REST API (through the inbound endpoint) on port 8285. You can use Postman or any other **HTTP Client**:

1. Open the Postman application. If you do not have the application, download it from here : [Postman](https://www.postman.com/downloads/)

2. Add the request information as given below and click the <b>Send</b> button.
    
    <table>
        <tr>
            <th>Method</th>
            <td>
               <code>GET</code> 
            </td>
        </tr>
        <tr>
            <th>URL</th>
            <td><code>http://localhost:8285/healthcare/querydoctor/surgery</code></br></br>
            </td>
        </tr>
     </table>
     
     <br/><br/>
     <video src="{{base_path}}/assets/vids/query-doctor-surgery.webm" width="720" height="480" controls></video>
     <br/><br/>

If you want to send the client request from your terminal:

1.  Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2.  Open a command line terminal and execute the following command:

    ```bash
    curl -v http://localhost:8285/healthcare/querydoctor/surgery
    ```

You will get the response shown below. The inbound endpoint has successfully invoked the REST API, and further, the response received by the REST API has been routed back to the client through the inbound endpoint.

```json
[
    {
        "name": "thomas collins",
        "hospital": "grand oak community hospital",
        "category": "surgery",
        "availability": "9.00 a.m - 11.00 a.m",
        "fee": 7000.0
    },
    {
        "name": "anne clement",
        "hospital": "clemency medical center",
        "category": "surgery",
        "availability": "8.00 a.m - 10.00 a.m",
        "fee": 12000.0
    },
    {
        "name": "seth mears",
        "hospital": "pine valley community hospital",
        "category": "surgery",
        "availability": "3.00 p.m - 5.00 p.m",
        "fee": 8000.0
    }
]
```
