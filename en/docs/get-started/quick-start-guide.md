---
search:
  exclude: true
---

# Quick Start Guide

Welcome to the WSO2 Integrator: MI Quick Start Guide, your step-by-step tutorial for getting started with WSO2 Integrator:  MI. WSO2 MI enables you to build, deploy, and manage integration solutions with ease, providing flexibility and scalability to connect applications, services, and systems.

In this guide, you'll learn the basics of setting up and using WSO2 MI to create and deploy a basic integration flow with minimal hassle.

## Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed.

!!! Info
    See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation to learn how to install WSO2 Integrator: MI for VS Code.

Follow the instructions below to create your first integration solution:

## What you'll build

Let’s try a simple scenario where the client sends a request to a `HelloWorld` API deployed in the WSO2 Integrator: MI and the API calls a backend service and returns its response. The backend service responds a `Hello World!!!` message, and the API deployed in the WSO2 Integrator: MI forwards this response to the client.

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

To develop the above scenario, let's get started with creating an integration project in the WSO2 Integrator: MI extension installed VS Code.

1. Launch VS Code with the WSO2 Integrator: MI extension installed.

2. Click on the WSO2 Integrator: MI icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a>

3. Click **Create New Project** on **WSO2 Integrator: MI Project Explorer**. For more options for creating a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

4. In the **Project Creation Form**, enter `HelloWorld` as the **Project Name**.

5. Ensure `4.6.0` is selected as the **WSO2 Integrator: MI runtime version**.

6. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-project.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-project.png" alt="Create New Project" width="80%"></a>

7. Click **Create**.

   Once you click **Create**, the **Add Artifact** pane will be opened.

!!! note
    You need the following to work with the MI for VS Code extension.

    - Java Development Kit (JDK) version 21
    - WSO2 Integrator:  MI 4.6.0 runtime

    If you don't have them installed on your local machine, these will be automatically prompted for downloading and configured by the WSO2 Integrator: MI for VS Code extension during the project creation step:

    1. Click **Download Java & MI** to download and set up Java and MI runtime.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png" alt="Download Java and MI" width="80%"></a>

        !!! info
            If a different JDK or WSO2 MI version is installed on your local machine, you'll be prompted to download the required versions. 

            1. Click **Download** to install the required JDK or/and MI version(s).
            2. Once the download is complete, configure the Java Home or/and MI Home paths by clicking **Select Java Home** or/and **Select MI Path**, respectively.

            If the required JDK and WSO2 MI versions are already installed, you can directly configure the Java Home and MI Home paths in this step by clicking **Select Java Home** and **Select MI Path**, respectively.

        Once the process is complete, a window reload will be required, and you will be prompted with the following message:

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png" alt="Reload Window" width="80%"></a>

    2. Click **Reload Window**.

## Step 2 - Create an API

Now the integration project is ready to add an API. In this scenario, the API calls a backend service and responds to the client. First, let's create an API.

1. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the **API Form**.

2. Enter `HelloWorldAPI` as the API **Name**. The API **Context** field will be automatically populated with the same value.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-api.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/new-api.png" alt="Create New API" width="80%"></a>

3. Click **Create**.

Once you create the API, a default resource will be automatically generated. You can see this default resource listed in the **Service Designer** under **Available resources**. You'll use this resource in this tutorial.

## Step 3 - Design the integration

Now it's time to design your API. This is the underlying logic that's executed behind the scenes when an API request is made. In this scenario first, you need to call the backend service. For that, you have to add an [HTTP connection]({{base_path}}/reference/connectors/http-connector/http-connector-overview). Follow the below steps to create an HTTPS connection.

1. Open the **Resource View** of the API resource by clicking the `GET` resource under **Available resources** on **Service Designer**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/get-resource.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/get-resource.png" alt="Add new connection" width="80%"></a>

2. Once you open the **Resource View**, click on the **+** icon on the canvas to open the palette.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/open-palette.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/open-palette.png" alt="Add new connection" width="80%"></a>

3. Under **Mediators** > **HTTP** select the **GET** operation .

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-get-operation.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-get-operation.png" alt="Add new connection" width="80%"></a>

4. In the **Add Get** pane that appears, click **Add new connection**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-new-connection.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-new-connection.png" alt="Add new connection" width="40%"></a>

5. Under **Add New Connection**, select **HTTPS**.

6. Specify the following values:

    | Property            | Value                   |
    |---------------------|-------------------------|
    | **Connection Name** | `HelloWorldConn`        |
    | **Base URL**        | `https://apis.wso2.com` |

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/hello-world-connection.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/hello-world-connection.png" alt="Add new connection" width="80%"></a>

7. Click **Add**.

    You'll be directed to the **Add Get** pane again.

8. Enter `/zvdz/mi-qsg/v1.0` as the **Relative Path**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-get.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/add-get.png" alt="Add new connection" width="40%"></a>

9. Click **Submit**.

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

10. Click on the **+** icon placed just after the HTTPS GET operation to open the palette.

11. Select **Respond** mediator under **Mediators**.

12. Click **Add**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/design-api.gif" alt="Design API" width="80%"></a>

Following is what you'll see in the **Source View** of the VS Code.

!!! info
    You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/helloworldapi" name="HelloWorldAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET" uri-template="/">
        <inSequence>
            <http.get configKey="HelloWorldConn">
                <relativePath>/zvdz/mi-qsg/v1.0</relativePath>
                <headers>[]</headers>
                <forceScAccepted>false</forceScAccepted>
                <disableChunking>false</disableChunking>
                <forceHttp10>false</forceHttp10>
                <noKeepAlive>false</noKeepAlive>
                <responseVariable>http_get_1</responseVariable>
                <overwriteBody>true</overwriteBody>
            </http.get>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

## Step 4 - Run the integration artifacts

Now that you have developed an integration using the WSO2 Integrator: MI for the Visual Studio Code plugin, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

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
