---
tags:
  - vscode
  - extension
---

#WSO2 Integrator: MI for VS Code Overview

WSO2 Integrator: MI offers an extension for Visual Studio Code (VS Code) that simplifies the development of integration solutions.

This page provides a quick overview of the interface of the MI for VS Code extension.

!!! info
    See [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) for a complete installation guide of the MI for VS Code extension.

When the extension is installed properly, you can see the WSO2 Integrator: MI icon in the Activity Bar of the VS Code editor.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a> 

Click the MI icon to open the extension and get started.

When you open the extension for the first time, you'll see the **Design View** on the right side and the **WSO2 Integrator: MI: Project Explorer** on the left.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/getting-started.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/getting-started.png" alt="Getting Started" width="80%"></a>

To get started, you need to first create an integration project. You can either open a folder containing an integration project by selecting [**Open MI Project**]({{base_path}}/develop/opening-projects) or create a new integration project from scratch by selecting [**Create New Project**]({{base_path}}/develop/create-integration-project). Alternatively, you can use a [sample](#samples) integration project provided under **Explore Samples**, which contains the required projects and files for a specific use case.

To create a new project you can use the links on the **MI Project Explorer** or **Design View**.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/create-new-project.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/create-new-project.png" alt="Create New Project" width="80%"></a>

## MI Project Explorer

The **WSO2 Integrator: MI Project Explorer** provides a view of all the project directories created for your integration solution. Shown below is the **MI Project Explorer** of a sample project.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/project-explorer.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/project-explorer.png" alt="Project Explorer" width="80%"></a>

You can add the [artifacts]({{base_path}}/develop/creating-artifacts/creating-artifacts-overview/) required for your integration using the MI Project Explorer.

!!! info "Explorer view"
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure of your integration project. Go to **MI Project Explorer** and click the **Explorer** icon to switch to the default VS Code Explorer view.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/switch-to-project-explorer.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/switch-to-project-explorer.png" alt="Switch to project explorer.png" width="30%"></a>

    Shown below is the **Explorer** view of a sample project.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/explorer-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/explorer-view.png" alt="explorer view" width="80%"></a>

## Project overview

The Project Overview in MI for VS Code extension provides an overview of your integration project. You can view, add, build, and export artifacts from here.

Follow any of the steps below to open **Project Overview**:

- Open the VS Code **Command Palette** by selecting **View** > **Command Palette** from the menu and select the **MI:Show Overview** command.

- If you want to access the **Project Overview** from any other view, select the **Home** ( <a href="{{base_path}}/assets/img/develop/mi-for-vscode/home-icon.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/home-icon.png" alt="home icon" width="20"></a> ) icon.

Shown below is the **Project Overview** of a sample integration project.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/project-overview.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/project-overview.png" alt="project overview" width="80%"></a>

## WSO2 MI Copilot

WSO2 Integrator:  MI Copilot is an AI-powered tool that simplifies the creation of integration scenarios. By describing your requirements in natural language or uploading relevant files, MI Copilot generates the necessary integration artifacts for seamless project integration.

Clicking on the **Open AI Panel** icon located in the top right corner of VS Code will open the WSO2 MI Copilot interface.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png" alt="Open AI Panel" width="80%"></a>

You can create any integration project by entering your integration scenario in natural language into the provided text box, allowing AI to generate the necessary artifacts.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-copilot.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-copilot.png" alt="MI Copilot" width="80%"></a>

For more information on WSO2 MI Copilot and its capabilities, see [MI Copilot]({{base_path}}/develop/mi-for-vscode/mi-copilot) documentation.

## Samples

The **Design View** lists a set of [sample projects]({{base_path}}/learn/samples/samples-overview) that represent common integration scenarios. You can use these to explore WSO2 Integrator: MI and to try out common integration use cases.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/samples.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/samples.png" alt="Samples" width="80%"></a>

!!!info "What's Next?"
    - See [Install MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) for more information on how to install and set up MI for VS Code.
    - See [Create an integration project]({{base_path}}/develop/create-integration-project) for more information on how to create an integration project.
    - See [Integration artifacts overview]({{base_path}}/develop/creating-artifacts/creating-artifacts-overview) for more information on integration artifacts.
