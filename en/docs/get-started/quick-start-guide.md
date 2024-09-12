# Quick Start Guide

Welcome to the WSO2 Micro Integrator Quick Start Guide, your step-by-step tutorial for getting started with one of the most powerful integration tools. WSO2 MI enables you to build, deploy, and manage integration solutions with ease, providing flexibility and scalability to connect applications, services, and systems.

In this guide, you'll learn the basics of setting up and using WSO2 MI to create and deploy a basic integration flow with minimal hassle.

## Prerequisites

The following software and configurations are required to proceed with this tutorial:

- **Java Development Kit (JDK):** Version 11 or 17 is required. Set up a [JDK that is compatible]({{base_path}}/install-and-setup/setup/reference/product-compatibility/#tested-jdks). Ensure the JDK is properly configured in your system's PATH environment variable.

    !!! Info
        For more information on setting the `JAVA_HOME` environment variable for different operating systems, see the [Install and Setup]({{base_path}}/install-and-setup/install/installing-mi) documentation.

  - **Apache Maven:** Ensure [Apache Maven](https://maven.apache.org/download.cgi) is installed (version 3.6.0 onwards) and its path is correctly set within the system's PATH environment variable.

    !!! info
        For more information on installing Apache Maven, see the [Apache Maven documentation](https://maven.apache.org/install.html).

- **A Rest Client:** Download and install any REST Client of your choice such as [Postman](https://www.postman.com/) or [cURL](https://curl.se/). We will be using Postman in this tutorial. 
- **WSO2 Micro Integrator 4.3.0 Runtime:** Set up WSO2 Micro Integrator 4.3.0 runtime on your machine.
    1. Download the Micro Integrator 4.3.0 distribution as a ZIP file from [here](https://github.com/wso2/micro-integrator/releases/download/v4.3.0/wso2mi-4.3.0.zip).
    2. Extract the ZIP file. Hereafter, this extracted folder will be referred to as the `<MI_HOME>` folder.
- **Visual Studio Code (VS Code):** with the [Micro Integrator for VS Code](https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator) extension installed.

After completing the steps above, follow the instructions below to set up the workspace:

## Step 1 - Configure MI server

We need to configure the downloaded and extracted WSO2 MI server in the Micro Integrator extension installed VS Code to run the integration solution. Let's proceed with the following steps.

1. Launch VS Code with the Micro Integrator extension installed.

2. Click on the Micro Integrator icon on the Activity Bar of the VS Code editor.

3. Click on the **Command Palette** on the top of the VS Code.

4. Type `>` to show the available commands. Alternatively, you can open the command palette in VS Code by entering `Command`+`Shift`+`P` on macOS and `Ctrl`+`Shift`+`P` on Windows.

5. Select **MI: Add MI server** from the list of available commands.

6. Click **Add MI server** to add a Micro Integrator server.

7. Select the folder where `<MI_HOME>` is located. This will be set as the **current server path**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/configure-mi-server.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/configure-mi-server.gif" alt="Configure MI Server" width="70%"></a>

## Step 2 - Create a new integration project

Now, it is time to create an integration project in the Micro Integrator extension installed VS Code.

1. Click **Create New Project** on **Design View**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

2. In the **Project Creation Form**, enter `HelloWorld` as the **Project Name**.

3. Provide a location under the **Select Project Directory**.

   <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-new-project.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-new-project.gif" alt="Create New Project" width="70%"></a>

## Step 3 - Create an API

Now the integration project is ready to add an API. In this simple example, the API responds with a message saying `Hello, WSO2!!!`. Now let's add an API.

1. Go to **Micro Integrator Project Explorer** > **APIs.**

2. Hover over **APIs** and click the **+** icon that appears to open the **Synapse API Artifact** creation form.

3. Enter `HelloWorldAPI` as the API **Name** and `hello` as the API **Context**. Once we create the API there will be a default resource created. We will use this resource in this tutorial. Refer [Add new resource]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources).

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-api.gif" alt="Create New API" width="70%"></a>

## Step 4 - Design the integration

Now it is time to design your API. This is the underlying processing that takes place behind the scenes when an API request is made. In this guide we are configuring a HelloWorld API, we will start with adding a PayloadFactory Mediator to construct the response message.

1. Open the **Resource View** of the API resource.

2. Click on the **+** icon to open the Palette.

3. Select **Payload Factory** mediator under **Mediators** > **Most popular**.

4. Specify the following values.

    <table>
    <tr>
        <th>Parameter</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>Payload Format</td>
        <td>
            <code>Inline</code>
        </td>
    </tr>
    <tr>
        <td>Media Type</td>
        <td>
            <code>json</code>
        </td>
    </tr>
    <tr>
        <td>Payload</td>
        <td>
            <code>{"message": "Hello, WSO2!!!"}</code> 
        </td>
    </tr>
    </table>
    
    Click  **Submit**.
    
    Now let's add a Respond Mediator to respond the message to the client.

5. Click **+** icon below the Payload Factory Mediator to open the Palette.

6. Select **Respond** mediator under **Mediators** > **Most popular**.

7. Click **Submit**.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif" alt="Design API" width="70%"></a>

## Step 5 - Run the integration artifacts

Now that you have developed an integration using the Micro Integrator Visual Studio Code plugin. It is time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.gif" alt="Build and run" width="70%"></a>

## Step 6 - Test the integration service

Now, let's test the integration service. Open up the rest client of your choice and send a request to the API. 

Use the following URL for this demo:

`http://localhost:8290/hello`

You can use Postman to send a request as below.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/test-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/test-api.gif" alt="Test API" width="70%"></a>

Congratulations!
Now, you have created your first integration service.

## What's next?

- [Develop your first integration solution]({{base_path}}/get-started/development-kickstart/).
- [More Tutorials]({{base_path}}/learn/learn-overview/).
