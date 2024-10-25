# Quick Start Guide

Welcome to the WSO2 Micro Integrator Quick Start Guide, your step-by-step tutorial for getting started with WSO2 Micro Integrator. WSO2 MI enables you to build, deploy, and manage integration solutions with ease, providing flexibility and scalability to connect applications, services, and systems.

In this guide, you'll learn the basics of setting up and using WSO2 MI to create and deploy a basic integration flow with minimal hassle.

## Prerequisites

The following software and configurations are required to proceed with this tutorial:

- **Java Development Kit (JDK):** Version 11 or 17 is required. Set up a [JDK that is compatible]({{base_path}}/install-and-setup/setup/reference/product-compatibility/#tested-jdks). Ensure the JDK is properly configured in your [system's PATH environment variable](({{base_path}}/install-and-setup/install/installing-mi)).

    !!! Info
        For more information on setting the `JAVA_HOME` environment variable for different operating systems, see the [Install and Setup]({{base_path}}/install-and-setup/install/installing-mi) documentation.

  - **Apache Maven:** Ensure [Apache Maven](https://maven.apache.org/download.cgi) is installed (version 3.6.0 onwards) and its path is correctly set within the [system's PATH environment variable](https://maven.apache.org/install.html).

    !!! info
        For more information on installing Apache Maven, see the [Apache Maven documentation](https://maven.apache.org/install.html).

- **WSO2 Micro Integrator 4.3.0 Runtime:** Set up WSO2 Micro Integrator 4.3.0 runtime on your machine.
    1. Download the Micro Integrator 4.3.0 distribution as a ZIP file from [here](https://github.com/wso2/micro-integrator/releases/download/v4.3.0/wso2mi-4.3.0.zip).
    2. Extract the ZIP file. Hereafter, this extracted folder will be referred to as the `<MI_HOME>` folder.
- **Visual Studio Code (VS Code):** with the [Micro Integrator for VS Code](https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator) extension installed.

After completing the steps above, follow the instructions below to create your first integration solution:

## What you'll build

Let’s try a simple scenario where the client sends a request to a `HelloWorld` API deployed in the WSO2 Micro Integrator and the API calls a backend service and returns its response. The backend service responds a `Hello World!!!` message, and the API deployed in the WSO2 Micro Integrator forwards this response to the client.

<a href="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.gif"><img src="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.gif"></a>

You can use the following HelloWorld service as the backend service.

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

3. Click **Create New Project** on **Design View**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

4. In the **Project Creation Form**, enter `HelloWorld` as the **Project Name**.

5. Provide a location under the **Select Project Directory**.

   <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-new-project.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-new-project.gif" alt="Create New Project" width="70%"></a>

## Step 2 - Create an API

Now the integration project is ready to add an API. In this scenario, the API calls a backend service and responds to the client. First, let's create an API.

1. Go to **Micro Integrator Project Explorer** > **APIs.**

2. Hover over **APIs** and click the **+** icon that appears to open the **Synapse API Artifact** creation form.

3. Enter `HelloWorldAPI` as the API **Name** and `hello` as the API **Context**. Once we create the API there will be a default resource created. We will use this resource in this tutorial. See the [Add new resource]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) documentation to learn how to add a new resource to an API.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-api.gif" alt="Create New API" width="70%"></a>

## Step 3 - Design the integration

Now it is time to design your API. This is the underlying logic that executed behind the scenes when an API request is made. In this scenario first we need to call the backend service. For that, you have to add an [endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties).

1. Navigate to the **MI Project Explorer** > **Endpoints**.

2. Hover over Endpoints and click the + icon that appears.

3. Select **HTTP Endpoint** from the **Create Endpoint Artifact** interface.

4. Specify the following values to create the HTTP endpoint for the [backend service](#what-youll-build).

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

    Click  **Create**.

    Now you have to add a [Call Mediator]({{base_path}}/reference/mediators/call-mediator) to call the backend service.

5. Open the **Resource View** of the API resource.

6. Click on the **+** icon to open the mediator palette.

7. Select **Call Endpoint** mediator under **Mediators** > **Generic**.

8. Select the created endpoint for the **Endpoint**. 

9. Click  **Submit**.
    
    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

10. Click **+** icon below the call mediator to open the palette.

11. Select **Respond** mediator under **Mediators** > **Generic**. 

12. Click **Submit**.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif" alt="Design API" width="70%"></a>

## Step 4 - Add MI server to run integration

You need to [configure]({{base_path}}/develop/using-remote-micro-integrator) the downloaded and extracted WSO2 MI server in the Micro Integrator extension installed VS Code to run the integration solution. Let's proceed with the following steps.

1. Click on the **Command Palette** on the top of the VS Code.

3. Type `>` to show the available commands. Alternatively, you can open the command palette in VS Code by entering `Command`+`Shift`+`P` on macOS and `Ctrl`+`Shift`+`P` on Windows.

4. Select **MI: Add MI server** from the list of available commands.

5. Click **Add MI server** to add a Micro Integrator server.

6. Select the folder where `<MI_HOME>` is located. This will be set as the **current server path**.

   <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/configure-mi-server.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/configure-mi-server.gif" alt="Configure MI Server" width="70%"></a>

## Step 5 - Run the integration artifacts

Now that you have developed an integration using the Micro Integrator Visual Studio Code plugin. It is time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.gif" alt="Build and run" width="70%"></a>

## Step 6 - Test the integration service

Now, let's test the integration service. For that you can use the inbuilt try-it functionality in the Micro Integrator for VS Code. 

1. When you run the integration artifact as in [Step 5](#step-5---run-the-integration-artifacts), **Runtime Services** interface is opened up. You can see all the available services. 

2. Select the API that you have developed and test the resource.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/test-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/test-api.gif" alt="Test API" width="70%"></a>

Congratulations!
Now, you have created your first integration service.

Additionally, you can use the [Integration Control Plane (ICP)]({{base_path}}/observe-and-manage/working-with-integration-control-plane) to observe details of the deployed artifacts.

## What's next?

Try more [tutorials and examples]({{base_path}}/learn/learn-overview/).
