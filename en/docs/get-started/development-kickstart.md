# Develop Your First Integration Solution
                                               
Integration developers need efficient tools to build and test all the integration use cases required by the enterprise 
before pushing them into a production environment. The following topics will guide you through the process of building and 
running an example integration use case using Micro Integrator extension for Visual Studio Code (MI for VS Code). This extension 
allows you to conveniently design, develop, and test your integration artifacts before deploying them in your production environment.
 
## What you'll build    

This is a simple service orchestration scenario. The scenario is about a basic healthcare system where the Micro Integrator 
is used to integrate two back-end hospital services to provide information to the client.
     
??? note "Click here to view the business scenario"

    This is the same scenario we considered in our [Quick Start Guide]({{base_path}}/get-started/quick-start-guide) where 
    we executed the already-built integration scenario. In this tutorial, we are going to build the same integration scenario 
    from scratch using the MI for VS Code extension.

    Let’s recall the business scenario:
    
    ![Integration Scenario]({{base_path}}/assets/img/integrate/developing-first-integration/dev-first-integration-0.png)
    
    The scenario is about a basic healthcare system where WSO2 Micro Integrator is used as the integration middleware. Most healthcare centers use a system to help patients book doctor appointments. To check the availability of doctors, patients will typically use every online system that is dedicated to a particular healthcare center or personally visit the healthcare centers.
    
    We will simplify this process of booking doctor appointments by building an integration solution that orchestrates the isolated systems in each healthcare provider and exposes a single interface to the users.
    
    Both the Grand Oak service and Pine Valley service are exposed over the HTTP protocol.
    
    - The Grand Oak service accepts GET requests in the following service endpoint URL:
      ```
      http://<HOST_NAME>:<PORT>/grandOak/doctors/<DOCTOR_TYPE>
      ```
    
    - The Pine Valley service accepts POST requests in the following service endpoint URL:
      ```
      http://<HOST_NAME>:<PORT>/pineValley/doctors
      ```
    
      The expected payload should be in the following JSON format:
        ```bash
        {
                "doctorType": "<DOCTOR_TYPE>"
        }
        ```
    
    Let’s implement a simple Rest API that can be used to query the availability of doctors for a particular category
    from all the available healthcare centers.

## Prerequisites

The following software and configurations are required to proceed with this tutorial:

- **Visual Studio Code (VS Code):** with the [Micro Integrator for VS Code](https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator) extension installed.
- **Java Development Kit (JDK):** Version 11 or 17 is required. Ensure the JDK is properly configured in your system's PATH environment variable.

    !!! Info
        For more information on setting the `JAVA_HOME` environment variable for different operating systems, see the [Install and Setup]({{base_path}}/install-and-setup/install/installing-mi) documentation.

- **Apache Maven:** Ensure Apache Maven is installed and its path is correctly set within the system's PATH environment variable.
- **WSO2 Micro Integrator 4.3.0 Runtime:** Set up WSO2 Micro Integrator 4.3.0 runtime on your machine.  
    1. Download the Micro Integrator 4.3.0 distribution as a ZIP file from [here](https://github.com/wso2/micro-integrator/releases/download/v4.3.0/wso2mi-4.3.0.zip).
    2. Extract the ZIP file. Hereafter, this extracted folder will be referred to as the `<MI_HOME>` folder.

After completing the steps above, follow the instructions below to set up the workspace:

1. Launch VS Code with the Micro Integrator extension installed.

2. Click on the Micro Integrator icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

3. Click on the **Command Palette** on the top of the VS Code.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/command-palette.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/command-palette.png" alt="Command palette" width="70%"></a>

4. Type `>` to show the available commands. Alternatively, you can open the command palette in VS Code by entering `Command`+`Shift`+`P` on macOS and `Ctrl`+`Shift`+`P` on Windows.

5. Select **MI: Add MI server** from the list of available commands.

6. Click **Add MI server** to add a Micro Integrator server.

7. Select the folder where `<MI_HOME>` is located. This will be set as the **current server path**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png" alt="Current server path" width="50%"></a>

## Step 1 - Develop the integration artifacts

### Create the integration project

Let's create an integration project with the required modules (to store artifacts) in VS Code.

1. Click **Create New Project** on **Design View**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-view-pane-create-new-project.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-view-pane-create-new-project.png" alt="Design View Pane Create New Project" width="80%"></a>

    Next, the **Project Creation Form** will be opened.

2. In the **Project Creation Form**, enter `Healthcare` as the **Project Name**.

3. Provide a location under the **Select Project Directory**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-project-details.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-project-details.png" alt="New Project Details" width="70%"></a>

4. Click **Create**. You will be directed to the following interface:

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-artifact-pane.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-artifact-pane.png" alt="Add Artifact Pane" width="80%"></a>

    Now let's start designing the integration by adding the necessary artifacts.

### Create endpoints

The actual backend services (healthcare services) are logically represented in the integration solution as Endpoint artifacts.

Let's create two Endpoint artifacts for the two healthcare services:

1. Navigate to the **Micro Integrator Project Explorer** > **Endpoints**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/mi-project-explorer-endpoints.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/mi-project-explorer-endpoints.png" alt="Create endpoints" width="80%"></a>

2. Hover over **Endpoints** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-endpoint.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-endpoint.png" alt="Create Endpoint" width="80%"></a>

3. This will open the **Endpoint Form**. Now, select the endpoint type you want from the available endpoint types under **Create Endpoint Artifact**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png" alt="Create HTTP Endpoint" width="70%"></a>

4. Select **HTTP Endpoint**.

5. In **Endpoint Artifact** interface that appears, specify the following values for the ‘Grand Oak hospital service’.

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>Endpoint Name</td>
        <td><code>GrandOakEndpoint</code></td>
      </tr>
      <tr>
        <td>URI Template</td>
        <td><code>http://localhost:9090/grandOak/doctors/{uri.var.doctorType}</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>GET</code></td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/grandoak-endpoint-artifact.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/grandoak-endpoint-artifact.png" alt="Grandoak Endpoint Artifact" width="80%"></a>

6. Click **Create** to save the endpoint configuration.

7. Follow the same steps to create an endpoint for ‘Pine Valley Hospital’. Use the following parameter values:

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>Endpoint Name</td>
        <td><code>PineValleyEndpoint</code></td>
      </tr>
      <tr>
        <td>URI Template</td>
        <td><code>http://localhost:9091/pineValley/doctors</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td><code>POST</code></td>
      </tr>
    </table> 

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/pinevalley-endpoint-artifact.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/pinevalley-endpoint-artifact.png" alt="Pinevalley Endpoint Artifact" width="80%"></a>

Once the two endpoint artifacts are created, they will appear on the **MI Overview** interface as shown below:

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/created-endpoints.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/created-endpoints.png" alt="Created Endpoints" width="80%"></a>

### Create the REST API

We are orchestrating multiple services and exposing a single API to the clients. The main integration artifact is going to be a REST API.

1. Navigate to the **Micro Integrator Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/mi-project-explorer-apis.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/mi-project-explorer-apis.png" alt="Create APIs" width="80%"></a>

2. Hover over **APIs** and click the **+** icon that appears to open the below **Synapse API Artifact** creation form.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-api.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-api.png" alt="Create API" width="80%"></a>

3. Specify values for the required REST API properties:

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td><code>HealthcareAPI</code></td>
      </tr>
      <tr>
        <td>Context</td>
        <td><code>healthcare</code></td>
      </tr>
    </table> 

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/healthcare-api-artifact.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/healthcare-api-artifact.png" alt="Healthcare API Artifact" width="80%"></a>

4. Click **Create**.

    The REST API is created in the `/src/main/wso2mi/artifacts/apis` folder under `Healthcare`.

    After creating the API artifact, the **Service Designer** will be displayed with the available resources as shown below:

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/service-designer.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/service-designer.png" alt="Service Designer" width="80%"></a>

5. When you create the API, an API resource is created by default. Click on the `GET` API resource under available resources on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource.png" alt="Edit API Resource" width="80%"></a>

7. Specify values for the required resource properties:

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
        <td>URI Template</td>
        <td>
          <code>/doctor/{doctorType}</code></br></br>
          <b>Note:</b> '{doctorType}' is a URI variable that gets resolved to the path parameter value in the runtime. We can access the value of the URI variable in the mediation flow using the variable (property) called <code>uri.var.doctorType</code>.
        </td>
      </tr>
      <tr>
        <td>URL Style</td>
        <td><code>URL_TEMPLATE</code></td>
      </tr>
      <tr>
        <td>Methods</td>
        <td><code>GET</code></td>
      </tr>
    </table> 

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource-details.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/edit-api-resource-details.png" alt="Edit API Resource Details" width="30%"></a>

8. Click **Update**.

### Create the mediation logic

1. Create two parallel message flows.
   
    In this scenario, the Healthcare API receives an HTTP GET request, which should be delivered to two different back-end 
    services. That is, we need to clone the message to two branches and process them in parallel. To do that, we can use the Clone Mediator.

    !!! tip
        You can simply click on the **+** icon on each arrow in the message sequence flow to add any connector or mediator from the **Palette**, which is to the right of the editor. 
        The **Palette** lists all the available mediators and connectors.
    
    a. To get started, click on the **+** icon to add the first mediator from the **Palette**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-mediator.png" alt="Add Mediator" width="80%"></a>
    
    b. Select **Clone** mediator in the **Flow Control** section under **Mediators**.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-clone-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-clone-mediator.png" alt="Select Clone Mediator" width="30%"></a>
    
    c. Click **Submit**.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-clone-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-clone-mediator.png" alt="Add Clone Mediator" width="30%"></a>
    
    We need to have two branches inside the Clone mediator. 
    
    d. Click on the **+** sign to create the first branch.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-branch-1.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-branch-1.png" alt="Add Branch" width="80%"></a>

2. Invoke the GrandOak Endpoint:

    The **Call** mediator is used to invoke a back-end service. In the [Create Endpoints Step](#create-endpoints), we have already created an Endpoint to represent the GrandOak endpoint.

    a. Click on the **+** sign placed on the first branch of the Clone mediator to open the **Palette**.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-call-mediator-1.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-call-mediator-1.png" alt="Add Call Mediator" width="80%"></a>
    
    b. Select **Call Endpoint** from the **Generic** section under **Mediators**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-call-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-call-mediator.png" alt="Select call mediator" width="35%"></a>
 
    Upon clicking, you will see the **Call Endpoint** pane where you can invoke external services in blocking/non-blocking mode.
    
    c. Under **Select Endpoint**, select `GrandOakEndpoint`.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-grandoakendpoint.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-grandoakendpoint.png" alt="Select Grandoakendpoint" width="35%"></a>
    
    d. Click **Submit**.
    
3. Construct message payload for the PineValley Endpoint:

    !!! note
        Unlike the GrandOAK endpoint, which accepts a simple GET request, the PineValley endpoint requires a POST request with the following JSON message:
        ```
        {
            "doctorType": "<DOCTOR_TYPE>"
        }
        ```
        Therefore, we need to first construct the required message payload. There are several Transformation mediators for constructing messages. Let's use the PayloadFactory mediator.
  
    1. Click on the remaining **+** sign inside the Clone mediator to create the second branch of the Clone mediator, as shown below.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-branch-2.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-branch-2.png" alt="Add Branch" width="80%"></a>
    
    2. Click on the **+** sign placed on the second branch.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-payload-mediator-2.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-payload-mediator-2.png" alt="Add Payload Mediator" width="80%"></a>
    
    3. Select **Payload** mediator from the **Transformation** section under **Mediators**.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/payload-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/payload-mediator.png" alt="Payload mediator" width="35%"></a>
    
    4. In the **Payload** interface, specify the values for the required PayloadFactory properties as shown below:

        | Parameter      | Value                     |
        |----------------|---------------------------|
        | Payload Format | `Inline`                  |
        | Media Type     | `json`                    |
        | Payload        | `{ "doctorType": "$1" }`  |
       
        !!! note
            The `$1` in the Payload format denotes a parameter that can get a value assigned dynamically. The value for the parameters 
            needs to be assigned using Arguments (Args).
    
    5. Click on **Add Parameter** under **Args**.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-payload-args.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-payload-args.png" alt="Add payload args" width="30%"></a>
    
    6. Set the **Argument Value** to `$ctx:uri.var.doctorType`.

    7. Once you specify the Argument Value, click on the `EX` button next to the input field to enable the button.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/argument-value-ex.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/argument-value-ex.png" alt="Argument value expression" width="30%"></a>

    8. Click **Save** under the **Args** section.
    
    9. Click **Submit**.

4. Invoke the PineValley Endpoint

    Use the Call mediator to invoke the PineValley Endpoint. Let’s follow the same steps we used under ‘Invoke GrandOak Endpoint’ as below.
    
    1. Click **+** icon next to the **PayloadFactory** mediator.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-call-mediator-2.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-call-mediator-2.png" alt="Add call mediator" width="80%"></a>
    
    2. Select **Call Endpoint** from the **Generic** section under **Mediators**.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-call-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/select-call-mediator.png" alt="Select call mediator" width="35%"></a>

    3. Under **Select Endpoint**, select `PineValleyEndpoint`.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-call-pane-2.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-call-pane-2.png" alt="Add call pane" width="30%"></a>
    
    4. Click **Submit**.

5. Aggregating response messages

    Since we are cloning the messages and delivering them into two different services, we will receive two responses. So we need to aggregate those two responses and construct a single response. To do that, we can use the Aggregate mediator.

    1. Click **+** icon next to the Clone mediator.
   
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-aggregate-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-aggregate-mediator.png" alt="Add aggregate mediator" width="80%"></a>
    
    2. Select **Aggregate** mediator from the **Flow Control** section under **Mediators**.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/aggregate-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/aggregate-mediator.png" alt="Aggregate mediator" width="35%"></a>

    3. In the **Aggregate** pane, specify values for the required Aggregate mediator properties.
    
        <table>
          <tr>
             <th>Parameter</th>
             <th>Value</th>
          </tr>
          <tr>
            <td>Aggregation Expression</td>
            <td><code>json-eval($.doctors.doctor)</code></td>
          </tr>
        </table>
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-aggregate-pane.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-aggregate-pane.png" alt="Add aggregate pane" width="30%"></a>
    
    4. Click **Submit**.
    
6. Send a response back to the client

    !!! note
        To send the response back to the client, we can use the Respond mediator.
    
    1. To add the Respond mediator, click on the **+** icon after the **Aggregate** mediator.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-respond-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-respond-mediator.png" alt="Add Respond mediator" width="80%"></a>

     2. From the **palette**, select **Respond** mediator from the **Core** section under **Mediators**.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/respond-mediator.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/respond-mediator.png" alt="Respond mediator" width="30%"></a>
    
    3. Click **Submit**.

The final mediation configuration looks similar to the below diagram.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/final-resource-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/final-resource-view.png" alt="Final resource view" width="60%"></a>

Following is what you will see in the **Source View** of MI for VS Code.

!!! info
    You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show source view" width="25%"></a>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/healthcare" name="HealthcareAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/doctor/{doctorType}">
        <inSequence>
            <clone>
                <target>
                    <sequence>
                        <call>
                            <endpoint key="GrandOakEndpoint"/>
                        </call>
                    </sequence>
                </target>
                <target>
                    <sequence>
                        <payloadFactory media-type="json">
                            <format>{
                                "doctorType": "$1"
                                }
                            </format>
                            <args>
                                <arg evaluator="xml" expression="$ctx:uri.var.doctorType"/>
                            </args>
                        </payloadFactory>
                        <call>
                            <endpoint key="PineValleyEndpoint"/>
                        </call>
                    </sequence>
                </target>
            </clone>
            <aggregate>
                <completeCondition>
                    <messageCount max="-1" min="-1"/>
                </completeCondition>
                <onComplete aggregateElementType="root" expression="json-eval($.doctors.doctor)">
                    <respond/>
                </onComplete>
            </aggregate>
        </inSequence>
        <faultSequence/>
    </resource>
</api>
```

## Step 2 - Build and run the artifacts

There are two main options to build and run the integration scenario.

### Option 1: Use the MI for VS Code extension

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.png" alt="Build and run" width="25%"></a>

### Option 2: Use a local Micro Integrator instance

1. Export the artifacts as a deployable CAR file:

    1. Go to the MI Overview pane using the **Home** icon.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/home-icon.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/home-icon.png" alt="Home icon" width="25%"></a>
    
    2. Click the **Build** icon located in the top right corner of VS Code.
    
        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png" alt="Build and export" width="25%"></a>
    
    3. Click the **Export** icon next to the **Build** icon.
    
    4. Select a destination to export the `.car` file.
    
    5. Once you select a folder, the artifacts will be exported as a deployable CAR file to that location.

2. Deploy the Healthcare service: Copy the exported CAR file of the Healthcare service to the `<MI_HOME>/repository/deployment/server/carbonapps` directory.

3. Start the Micro Integrator:

    1. Open a terminal and navigate to the `<MI_HOME>/bin` folder.
   
    2. Execute one of the commands given below:

        === "On MacOS/Linux"
            ```bash 
            ./micro-integrator.sh
            ```         
        === "On Windows"
            ```bash 
            micro-integrator.bat
            ```
        
## Step 3 - Observe deployed artifacts

Optionally, you can install and start the Integration Control Plane (ICP) to observe details of the deployed artifacts by following the steps below:

1. Once you have deployed the artifacts and started the Micro Integrator server, you need to stop it before starting the ICP server.

    - If you are running the Micro Integrator runtime [using the Visual Studio Code](#option-1-using-the-visual-studio-code), stop the server using the **Stop** icon.

          <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/stop-mi-runtime.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/stop-mi-runtime.png" alt="Build and run" width="25%"></a>

    - If you are [using a local Micro Integrator instance](#option-2-using-a-local-micro-integrator-instance), use the below command:

        === "On macOS/Linux"              
            ```bash
            sh micro-integrator.sh stop
            ```
        === "On Windows"             
            ```bash
            micro-integrator.bat --stop
            ```

2. Install and start the Integration Control Plane (ICP) by following the steps below:

    1. Download the [Integration Control Plane]({{base_path}}/install-and-setup/install/installing-integration-control-plane/#installing-the-integration-control-plane_1).

    2. Set up the Micro Integrator:

        1. Open the `deployment.toml` file (stored in the `<MI_HOME>/conf/` directory) of the Micro Integrator.
        2. Add the following configuration:

            ```
            [dashboard_config]
            dashboard_url = "https://localhost:9743/dashboard/api/"
            heartbeat_interval = 5
            group_id = "mi_dev"
            node_id = "dev_node_2"
            ```

3. Start the Integration Control Plane:

    1. Open a terminal.

    2. Navigate to the `<ICP_HOME>/bin` directory.

    3. Execute one of the commands given below:

        === "On macOS/Linux"
            ```bash
            sh dashboard.sh
            ```
        === "On Windows"
            ```bash
            dashboard.bat
            ```

4. Next, restart the Micro Integrator server to register itself with the ICP. Follow the same steps you performed in the [Step 2](#step-2-running-the-integration-artifacts).

5. Access the Integration Control Plane:

    1. Once you have started the ICP server, access the ICP server using the following URL:

        ```bash
        https://localhost:9743/login
        ```

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-login.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-login.png" alt="ICP login" width="80%"></a>

    2. Use the following sign in details.

        | Username  | Password |
        |-----------|----------|
        | `admin`   | `admin`  |

Once you sign in, click on the required artifact type to view its details.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-api-artifacts.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-api-artifacts.png" alt="View API artifacts" width="80%"></a>

## Step 4 - Test the use case

Now, let's test the integration service.

### Start back-end services

Let's start the mock back-end services for this use case:

1.  Download the [`DoctorInfo-JDK11.jar` file]({{base_path}}/assets/attachments/quick-start-guide/doctorinfo-jdk11.jar). This contains two healthcare services.
 
2. Open a terminal, navigate to the location of the downloaded `DoctorInfo-JDK11.jar` file, and execute the following command to start the services:

    ```bash
    java -jar DoctorInfo-JDK11.jar
    ```

### Invoke the Healthcare service

Use a REST client of your choice to send a request to the integration service. In this tutorial we are using curl.

1.  Install and set up [curl](https://curl.haxx.se/) as your REST client.
2.  Open a terminal and execute the following curl command to invoke the service:

    ```bash
    curl -v http://localhost:8290/healthcare/doctor/Ophthalmologist
    ```

You will receive the following response:

```bash
    [
        [
            {
                "name": "John Mathew",
                "time": "03:30 PM",
                "hospital": "Grand Oak"
            },
            {
                "name": "Allan Silvester",
                "time": "04:30 PM",
                "hospital": "Grand Oak"
            }
        ],
        [
            {
                "name": "John Mathew",
                "time": "07:30 AM",
                "hospital": "pineValley"
            },
            {
                "name": "Roma Katherine",
                "time": "04:30 PM",
                "hospital": "pineValley"
            }
        ]
    ]
```
  
