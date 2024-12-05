# Micro Integrator for VS Code Overview

WSO2 Micro Integrator for Visual Studio Code extension (MI for VS Code) is a comprehensive integration solution that simplifies your digital transformation journey. It streamlines connectivity among applications, services, data, and the cloud using a user-friendly low-code graphical designing experience and revolutionizes your integration development workflow. As an integration developer, you can execute all the development lifecycle phases using this tool. When your integration solutions are production-ready, you can easily push the artifacts to your continuous integration/continuous deployment pipeline.

!!!info "Why a VS Code extension?"
    - It's free and open-source.
    - It offers speed and robust capabilities.
    - It's compatible across various platforms.
    - It's lightweight.

This page provides a quick overview of the interface of the MI for VS Code extension.

## Getting Started

When the extension is installed properly, you can see the WSO2 Micro Integrator icon in the Activity Bar of the VS Code editor.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="700"></a> 

You can click the WSO2 Micro Integrator icon to open the extension.

When you open the extension for the first time, you'll see the **Design View** panel on the right side and the **Micro Integrator: Project Explorer** on the left.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/getting-started.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/getting-started.png" alt="Getting Started" width="700"></a>

To get started, you need to first create the required project directories. You can either open a folder containing an integration project by selecting [**Open MI Project**]({{base_path}}/develop/opening-projects) or create a new integration project from scratch by selecting [**Create New Project**]({{base_path}}/develop/create-integration-project). Alternatively, you can use an integration sample provided under **Explore Samples**, which will generate the required projects and files for a specific use case.

To create a new project you can use the links on the **MI Project Explorer** or **Design View**.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/create-new-project.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/create-new-project.png" alt="Create New Project" width="700"></a>

## Samples

The **Design View** lists a set of [sample projects]({{base_path}}/learn/samples/samples-overview) that represent common integration scenarios. You can use these to explore WSO2 Micro Integrator and to try out common integration use cases.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/samples.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/samples.png" alt="Samples" width="700"></a>

Once you create an integration project, you will see the **Add Artifact** panel where you can start the integration with one of the following options:

- **Describe your Integration to generate with AI**
- **Create an Integration** using the integration artifacts

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-overview.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-overview.png" alt="MI Overview" width="700"></a>

## MI Project Explorer

The **Micro Integrator Project Explorer** provides a view of all the project directories created for your integration solution. Shown below is the **MI Project Explorer** of a sample project.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/project-explorer.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/project-explorer.png" alt="Project Explorer" width="700"></a>

You can add the artifacts required for your integration using the MI Project Explorer.

!!! info "Explorer view"
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure. Shown below is how to switch from the **MI Project Explorer** view to the default VS Code **Explorer** view for a sample project.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/switch-to-project-explorer.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/switch-to-project-explorer.gif" alt="Switch to project explorer.gif" width="80%"></a>

## MI Copilot

WSO2 Micro Integrator (MI) Copilot is an AI-powered tool that simplifies the creation of integration scenarios. By describing your requirements in natural language or uploading relevant files, MI Copilot generates the necessary integration artifacts for seamless project integration.

Clicking on the **Open AI Panel** icon located in the top right corner of VS Code will open the WSO2 MI Copilot interface.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png" alt="Open AI Panel" width="700"></a>

You can create any integration project by entering your integration scenario in natural language into the provided text box, allowing AI to generate the necessary artifacts.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-copilot.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-copilot.png" alt="MI Copilot" width="700"></a>

For more information on WSO2 MI Copilot and its capabilities, see [MI Copilot]({{base_path}}/develop/mi-for-vscode/mi-copilot) documentation.

!!!info "What's Next?"
    - See [Install MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) for more information on how to install and set up MI for VS Code.

<!-- 
    - See [Build and Run]({{base_path}}/develop/mi-for-vscode/build-and-run) to get started with MI VS Code extension.
    - See [Debugging]({{base_path}}/develop/mi-for-vscode/debugging) to learn about debugging.
-->