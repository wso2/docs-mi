# Create a Project

An integration project in WSO2 Integrator: MI is a structured collection of artifacts designed to facilitate seamless communication and data exchange between diverse systems, applications, and services.

## Creating a Project

Follow the below steps to create an integration project using the WSO2 Integrator: MI for VS Code extension (MI for VS Code).

1. Launch Visual Studio Code with the MI for VS Code extension installed.

    !!! info
        Follow the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Click on the WSO2 Integrator: MI icon on the **Activity Bar** of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

    This opens the **WSO2 Integrator: Integrations** panel.

3. Click **Get Started** to open the **Welcome** page.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/get-started.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-get-started.png" alt="Get Started" width="80%"></a>

4. Click **Create** under **Create New Project**.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/welcome-to-mi-create-new-project.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project.png" alt="Welcome to MI page" width="80%"></a>

5. In the **Project Creation Form**, enter a suitable name for the integration project under **Project Name**.

6. Ensure the relevant product version is selected as the **WSO2 Integrator: MI runtime version**.

7. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png" alt="New Project Details" width="70%"></a>

8. Click **Create**.

    Once you click **Create**, the **Add Artifact** pane will be opened.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png" alt="Add Artifact Pane" width="80%"></a>

!!! note
    You need the following to work with the MI for VS Code extension.

    - Java Development Kit (JDK) version 25
    - WSO2 Integrator:  MI 4.7.0 runtime

    If you don't have them installed in your local machine, these will be automatically prompted for downloading and configured by the WSO2 Integrator: MI for VS Code extension during the project creation step:

    1. Click **Download Java & MI** to download and set up Java and MI runtime.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png" alt="Download Java and MI" width="80%"></a>

        !!! info
            If a different version of the JDK or WSO2 MI is installed on your local machine, you'll be prompted to download the required versions. 

            1. Click **Download** to install the required JDK or/and MI version(s).
            2. Once the download is complete, configure the Java Home or/and MI Home paths by clicking **Select Java Home** or/and **Select MI Path**, respectively.

            If the required JDK and WSO2 MI versions are already installed, you can directly configure the Java Home and MI Home paths in this step by clicking **Select Java Home** and **Select MI Path**, respectively.

        Once the process is complete, a window reload will be required, and you will be prompted with the following message:

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png" alt="Reload Window" width="80%"></a>

    2. Click **Reload Window**.

Now you can start creating your integration by developing artifacts. See the [Integration Artifacts Overview]({{base_path}}/develop/creating-artifacts/creating-artifacts-overview) documentation to learn about the integration artifacts.

Additionally, you can enhance your experience by incorporating AI-powered assistance with [WSO2 Integrator Copilot]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/overview).

## Creating Multiple Projects in a Workspace

You are not limited to a single integration project per VS Code window. You can create additional integration projects alongside an already open project, so that you can view and work with them together in the **WSO2 Integrator: MI Project Explorer**.

To create another project in your current workspace:

1. Click the **+** icon at the top of the **WSO2 Integrator: MI Project Explorer** pane.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-new-project-icon.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-new-project-icon.png" alt="Create New Project icon" width="80%"></a>

    This will open the same **Welcome** page shown in step 4 of [Creating a Project](#creating-a-project) above.

2. Follow steps 4 to 8 under [Creating a Project](#creating-a-project) to complete the **Project Creation Form** for the new project.

Once created, the new project will be added alongside the existing one, and both will be listed together in the **WSO2 Integrator: MI Project Explorer**, allowing you to manage multiple integration projects side by side.

!!! info
    If you want to bundle several related integration modules together under a single project instead of maintaining them as separate projects in a workspace, consider creating a [consolidated project](#creating-a-consolidated-project) instead. You can also convert an existing workspace into a consolidated project directly, without recreating your projects.

## Creating a Consolidated Project

A **consolidated project** bundles multiple integration modules into a single multi-module integration project, instead of creating each module as a separate, independent project. This is useful when you have several related integration modules that you want to organize, build, and version together under one parent project, rather than managing them as individual projects added to a workspace.

To create a consolidated project, follow the same steps as [creating a  project](#creating-a-project) above, and on the **Project Creation Form**:

1. Expand **Advanced Options**, and then expand **Project Configurations**.
2. Select the **Consolidated Project** checkbox.
3. Click on **Add Module** to add a module to the consolidated project and provide a name for it. Repeat this step for each module you want to include.
4. Click **Create Project**.

<a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-consolidated-project.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-consolidated-project.png" alt="Create a consolidated project" width="80%"></a>

!!! note "Converting a workspace to a consolidated project"
    If you already have multiple integration projects added to the same VS Code workspace, you do not need to recreate them to get a consolidated project. You can merge the existing projects in the workspace into a single consolidated project instead:

    1. Open the **Workspace Overview** page. It lists all the projects currently added to the workspace, under **Projects**.
    2. Expand the **Advanced** section at the bottom of the page.
    3. Click **Convert to Consolidated** next to **Convert to Consolidated Project**.

        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/convert-to-consolidated.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/convert-to-consolidated.png" alt="Convert a workspace to a consolidated project" width="90%"></a>

    This will merge all the projects listed in the workspace into a consolidated project, with each existing project becoming a module of it, so that they share build and deployment options.

