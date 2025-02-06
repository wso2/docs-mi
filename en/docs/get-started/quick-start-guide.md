# Quick Start Guide

Welcome to the WSO2 Micro Integrator Quick Start Guide, your step-by-step tutorial for getting started with WSO2 Micro Integrator (MI). WSO2 MI enables you to build, deploy, and manage integration solutions with ease, providing flexibility and scalability to connect applications, services, and systems.

In this guide, you'll learn the basics of setting up and using WSO2 MI to create and deploy a basic integration flow with minimal hassle.

## Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">Micro Integrator for VS Code</a> extension installed.

!!! Info
    See the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation to learn how to install Micro Integrator for VS Code.

Follow the instructions below to create your first integration solution:

## What you'll build

Let’s try a simple scenario where the client sends a request to a `HelloWorld` API deployed in the WSO2 Micro Integrator and the API calls a backend service and returns its response. The backend service responds a `Hello World!!!` message, and the API deployed in the WSO2 Micro Integrator forwards this response to the client.

<a href="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.gif"><img src="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.gif"></a>

You can use the following `HelloWorld` service as the backend service.

<table>
    <tr>
        <td>URL</td>
        <td>
            <code>https://apis.wso2.com/zvdz/mi-qsg/v1.0</code>
        </td>
    </tr>
    <tr>
        <td>HTTP Method</td>
        <td>
            <code>GET</code> 
        </td>
    </tr>
</table>

## Step 1 - Create a new integration project

To develop the above scenario, let's get started with creating an integration project in the Micro Integrator extension installed VS Code.

1. Launch VS Code with the Micro Integrator extension installed.

2. Click on the Micro Integrator icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a>

3. Click **Create New Project** on **Micro Integrator Project Explorer**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

4. In the **Project Creation Form**, enter `HelloWorld` as the **Project Name**.

5. Ensure `4.4.0` is selected as the **Micro Integrator runtime version**.

6. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-project.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-project.png" alt="Create New Project" width="80%"></a>

7. Click **Create**.

   Once you click **Create**, the **Add Artifact** pane will be opened.

!!! note
    You need the following to work with the MI for VS Code extension. If you don't have them installed in your local machine, these will be automatically prompted for downloading and configured by the Micro Integrator for VS Code extension during the project creation step:

    - Java Development Kit (JDK) version 21
    - WSO2 Micro Integrator (MI) 4.4.0 runtime

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png" alt="Download Java and MI" width="80%"></a>


    If you have different versions of JDK and WSO2 MI installed in your local machine, you can configure Java Home path and MI path respectively in this step. 

## Step 2 - Create an API

Now the integration project is ready to add an API. In this scenario, the API calls a backend service and responds to the client. First, let's create an API.

1. In the **Add Artifact** pane, under **Create an Integration**, click on **API** to open the **API Form**.

3. Enter `HelloWorldAPI` as the API **Name**. The API **Context** field will be automatically populated with the same value.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-api.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-api.png" alt="Create New API" width="80%"></a>

4. Click **Create**.

Once you create the API, a default resource will be automatically generated. You can see this default resource listed in the **Service Designer** under **Available resources**. You'll use this resource in this tutorial.

<!--
!!! info
    To learn how to add a new resource to an API, see the [Add new resource]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) documentation.
-->

## Step 3 - Design the integration

Now it is time to design your API. This is the underlying logic that is executed behind the scenes when an API request is made. In this scenario first, you need to call the backend service. For that, you have to add an [endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties). Follow the below steps to create an endpoint.

1. Navigate to the **MI Project Explorer**.

2. Click on the **+** icon to open the **Add Artifact** pane.

3. On the **Add Artifact** pane, click **+ View More** under **Create an Integration**.

4. Click **Endpoint** under **Other Artifacts**.

    This will open the **Endpoint Form**.

5. Select **HTTP Endpoint** from the **Create Endpoint** interface.

6. Specify the following values to create the HTTP endpoint for the [backend service](#what-youll-build).

     <table>
     <tr>
         <th>Parameter</th>
         <th>Value</th>
     </tr>
     <tr>
         <td>Endpoint Name</td>
         <td>
             <code>HelloWorldEp</code>
         </td>
     </tr>
     <tr>
         <td>URI Template</td>
         <td>
             <code>https://apis.wso2.com/zvdz/mi-qsg/v1.0</code>
         </td>
     </tr>
     <tr>
         <td>HTTP Method</td>
         <td>
             <code>GET</code> 
         </td>
     </tr>
     </table>

5. Click  **Create**.

    Now you have to add a [Call Mediator]({{base_path}}/reference/mediators/call-mediator) to call the backend service.

6. Open the **Resource View** of the API resource.

    1. Go to **MI Project Explorer** > **APIs**.

    2. Under `HelloWorldAPI`, click the default API resource to open the **Resource View** of the API resource.

7. Once you open the **Resource View**, click on the **+** icon on the Canvas to open the palette.

8. Select **Call Endpoint** mediator under **Mediators**.

9. In the **Add Call Mediator** pane, from the **Endpoint** dropdown, select the created `HelloWorldEp` endpoint.

10. Click  **Add**.

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

11. Click on the **+** icon placed just after the Call mediator to open the palette.

12. Select **Respond** mediator under **Mediators**.

13. Click **Add**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif" alt="Design API" width="80%"></a>

Following is what you'll see in the **Source View** of the VS Code.

!!! info
    You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/helloworldapi" name="HelloWorldAPI" xmlns="http://ws.apache.org/ns/synapse">
   <resource methods="GET" uri-template="/">
      <inSequence>
         <call>
            <endpoint key="HelloWorldEp"/>
         </call>
         <respond/>
      </inSequence>
      <faultSequence>
      </faultSequence>
   </resource>
</api>
```

<!--

## Step 4 - Add MI server to run integration

You need to [configure]({{base_path}}/develop/using-remote-micro-integrator) the downloaded and extracted WSO2 MI server in the Micro Integrator extension installed VS Code to run the integration solution. Let's proceed with the following steps.

1. Open the VS Code **Command Palette** by selecting **View** > **Command Palette** from the menu, or by using the shortcut `Command`+`Shift`+`P` on macOS or `Ctrl`+`Shift`+`P` on Windows.

2. Select **MI: Add MI server** from the list of available commands.

3. Click **Add MI server** to add a Micro Integrator server.

4. Select the folder where `<MI_HOME>` is located. This will be set as the **current server path**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/configure-mi-server.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/configure-mi-server.gif" alt="Configure MI Server" width="80%"></a>

-->

## Step 4 - Run the integration artifacts

Now that you have developed an integration using the Micro Integrator for the Visual Studio Code plugin, it is time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run-project.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run-project.png" alt="Build and run" width="80%"></a>

## Step 5 - Test the integration service

Now, let's test the integration service. For that, you can use the inbuilt try-it functionality in the MI for VS Code extension.

When you run the integration artifact as in [Step 4](#step-4-run-the-integration-artifacts), the **Runtime Services** interface is opened up. You can see all the available services.

Select `HelloWorldAPI` that you have developed and test the resource.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/test-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/test-api.gif" alt="Test API" width="80%"></a>

Congratulations!
Now, you have created your first integration service.

Additionally, you can use the [Integration Control Plane (ICP)]({{base_path}}/observe-and-manage/working-with-integration-control-plane) to observe details of the deployed artifacts.

## What's next?

Try more [tutorials and examples]({{base_path}}/learn/learn-overview/).
