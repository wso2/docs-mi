# Develop an Integration API

In this tutorial, you'll learn the basics of setting up and using WSO2 MI to create and deploy an Integration API service with minimal hassle.

## What you'll build

Let’s try a simple scenario where the client sends a request to the `Bank` API deployed in the WSO2 Integrator: MI and receives a `Welcome to O2 Bank !!` greeting response.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/what_you_will_build_greeting.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/what_you_will_build_greeting.png" alt="Create New Project" width="40%"></a>

## What you'll learn

- How to create an integration project.
- How to create an Integration API.
- How to deploy and test.

## Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed. The MI for VS Code extension is the official developer tool for designing, developing, and testing integration solutions with WSO2 Integrator: MI.

!!! Info
    See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

Follow the instructions below to create your first Integration API.

## Step 1 - Create a new integration project

To develop the above scenario, let's get started with creating an integration project in the WSO2 Integrator: MI extension installed VS Code.

1. Launch VS Code with the WSO2 Integrator: MI extension installed.

2. Click on the WSO2 Integrator: MI icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a>

3. Click **Create New Project** on **Design View**. For more options for creating a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project_btn.png" alt="Create New Project" width="80%"></a>

4. In the **Project Creation Form**, enter `BankIntegration` as the **Project Name**.

5. Ensure `4.6.0` is selected as the **WSO2 Integrator: MI runtime version**.

6. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project.png" alt="Create New Project" width="80%"></a>

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

Now the integration project is ready to add an API. In this scenario, the API responds to the client with a greeting message. First, let's create an API.

1. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the **API Form**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png" alt="Create New Project" width="80%"></a>

2. Enter `BankAPI` as the API **Name**. The API **Context** field will be automatically populated with the same value.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_bank_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_bank_api.png" alt="Create New Project" width="80%"></a>

3. Click **Create**.

Once you create the API, a default resource will be automatically generated. You can see this default resource listed in the **Service Designer** under **Available resources**. You'll use this resource in this tutorial.

## Step 3 - Design the integration

Now it's time to design your API. This is the underlying logic that's executed behind the scenes when an API request is made. In this scenario, you need to send back a greeting message to the client. For that, you have to add a [Payload mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/). Follow the below steps to add a Payload mediator.

!!! Tip "What is a mediator?"
    Mediators are the core building blocks of message processing in WSO2 Integrator:  MI. They define how messages are transformed and routed as they pass through an integration flow. To explore mediators in detail and understand how they work, see the [Mediator documentation]({{base_path}}/reference/mediators/about-mediators/).

1. Open the **Resource View** of the API resource by clicking the `GET` resource under **Available resources** on **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_get_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_get_resource.png" alt="Create New Project" width="80%"></a>

2. Once you open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_new_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_new_mediator.png" alt="Create New Project" width="80%"></a>

3. Under **Mediators**, select the **Payload** mediator.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_payload_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_payload_mediator.png" alt="Create New Project" width="80%"></a>

4. In the **Add Payload Mediator** pane that appears, provide the following as the payload.

    ```json
    {
        "greetings":"Welcome to O2 Bank !!"
    }
    ```
 
    <a href="{{base_path}}/assets/img/get-started/build-first-integration/set_greeting_payload.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/set_greeting_payload.png" alt="Create New Project" width="80%"></a>

5. Click **Add** to add the Payload mediator to the integration flow.

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

6. Click on the **+** icon placed just after the Payload mediator to open the **Mediator Palette**.

7. Select the **Respond** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/select_respond_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/select_respond_mediator.png" alt="Create New Project" width="80%"></a>

You may refer to the following API configuration for reference,

??? "Bank API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-integration/greeting_api_completed.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/greeting_api_completed.png" alt="Create New Project" width="70%"></a>

    === "Source View"
        ```yaml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/bankapi" name="BankAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="GET" uri-template="/">
                <inSequence>
                    <payloadFactory media-type="json" template-type="default">
                        <format>{
                            "greetings":"Welcome to O2 Bank !!"
                            }
                        </format>
                    </payloadFactory>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ```

## Step 4 - Run the Integration API

Now that you have developed an integration using the WSO2 Integrator: MI for the Visual Studio Code plugin, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/build_and_run_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/build_and_run_btn.png" alt="Create New Project" width="80%"></a>

## Step 5 - Test the Integration API

Now, let's test the Integration API. For that, you can use the inbuilt try-it functionality in the MI for VS Code extension.

When you run the integration as in [Step 4](#step-4-run-the-integration-api), the **Runtime Services** interface is opened up. You can see all the available services.

Select `BankAPI` that you have developed and test the resource.

<a href="{{base_path}}/assets/img/get-started/build-first-integration/tryout_greeting.gif"><img src="{{base_path}}/assets/img/get-started/build-first-integration/tryout_greeting.gif" alt="Test API" width="80%"></a>

Congratulations!
Now, you have created your first Integration API.

## What's next?  

So far, you have responded to the client with a mock payload. Next, you will explore how to route and transform the payload effectively.

Click on the **Next** button below to continue to the next tutorial.

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px;">
  <a href="{{base_path}}/get-started/build-first-integration/first-integration-route-and-transform/" class="md-button md-button--primary">Next →</a>
</div>
