# Create a Project

An integration project in WSO2 Integrator: MI is a structured collection of artifacts designed to facilitate seamless communication and data exchange between diverse systems, applications, and services.

Follow the below steps to create an integration project using the WSO2 Integrator: MI for VS Code extension (MI for VS Code).

1. Launch Visual Studio Code with the MI for VS Code extension installed.

    !!! info
        Follow the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Click on the WSO2 Integrator: MI icon on the **Activity Bar** of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

    This will open the **Design View**.

3. Next, create a new integration project. You have three options to create a new project:

    - **Option 1:** Using the Design View:

        Click **Create New Project** on **Design View**.
    
        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-design-view.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-design-view.png" alt="Create project using design view" width="80%"></a>
    
    - **Option 2:** Using the WSO2 Integrator: MI Project Explorer: 

        Click **Create New Project** on the **WSO2 Integrator: MI Project Explorer** pane.
        
        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-mi-project-explorer.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-mi-project-explorer.png" alt="Create project using MI project explorer" width="80%"></a>

    - **Option 3:** Using the Command Palette: 

        1. Open the VS Code Command Palette by selecting **View** > **Command Palette** from the menu, or by using the shortcut `Command`+`Shift`+`P` on macOS or `Ctrl`+`Shift`+`P` on Windows.

        2. Select **MI: Create New Project**.

            <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-command-palette.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-command-palette.png" alt="Create project using command palette" width="80%"></a>

      Next, the **Project Creation Form** will be opened.

4. In the **Project Creation Form**, enter a suitable name for the integration project under **Project Name**.

5. Ensure `4.6.0` is selected as the **WSO2 Integrator: MI runtime version**.

6. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png" alt="New Project Details" width="70%"></a>

7. Click **Create**.

    Once you click **Create**, the **Add Artifact** pane will be opened.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png" alt="Add Artifact Pane" width="80%"></a>

!!! note
    You need the following to work with the MI for VS Code extension.

    - Java Development Kit (JDK) version 21
    - WSO2 Integrator:  MI 4.6.0 runtime

    If you don't have them installed in your local machine, these will be automatically prompted for downloading and configured by the WSO2 Integrator: MI for VS Code extension during the project creation step:

    1. Click **Download Java & MI** to download and set up Java and MI runtime.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png" alt="Download Java and MI" width="80%"></a>

        !!! info
            If a different version of the JDK or WSO2 MI is installed on your local machine, you'll be prompted to download the required versions. 

            1. Click **Download** to install the required JDK or/and MI version(s).
            2. Once the download is complete, configure the Java Home or/and MI Home paths by clicking **Select Java Home** or/and **Select MI Path**, respectively.

            If the required JDK and WSO2 MI versions are already installed, you can directly configure the Java Home and MI Home paths in this step by clicking **Select Java Home** and **Select MI Path**, respectively.

        Once the process is complete, a window reload will be required, and you will be prompted with the following message:

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png" alt="Reload Window" width="80%"></a>

    2. Click **Reload Window**.

Now you can start creating your integration by developing artifacts. See the [Integration Artifacts Overview]({{base_path}}/develop/creating-artifacts/creating-artifacts-overview) documentation to learn about the integration artifacts.

Additionally, you can enhance your experience by incorporating AI-powered assistance with [WSO2 Integrator: MI Copilot]({{base_path}}/develop/mi-for-vscode/mi-copilot).
