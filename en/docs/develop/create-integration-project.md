# Create a Project

An integration project in WSO2 Micro Integrator (MI) is a structured collection of artifacts designed to facilitate seamless communication and data exchange between diverse systems, applications, and services.

Follow the below steps to create an integration project using the WSO2 Micro Integrator for VS Code extension (MI for VS Code):

1. Launch Visual Studio Code with the MI for VS Code extension installed.

    !!! info
        Follow the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Click on the Micro Integrator icon on the **Activity Bar** of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

    This will open the **Design View**.

3. Next, create a new integration project. You have three options to create a new project:

    - **Option 1:** Using the Design View:

        Click **Create New Project** on **Design View**.
    
        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-design-view.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-design-view.png" alt="Create project using design view" width="80%"></a>
    
    - **Option 2:** Using the Micro Integrator Project Explorer: 

        Click **Create New Project** on the **Micro Integrator Project Explorer** pane.
        
        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-mi-project-explorer.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-mi-project-explorer.png" alt="Create project using MI project explorer" width="80%"></a>

    - **Option 3:** Using the Command Palette: 

        1. Go to the **Command Palette** at the top of the Visual Studio Code interface.
        
        2. Type `>` to display the available commands.
        
            Alternatively, on macOS press `Command`+`Shift`+`P`, and on Windows press `Control`+`Shift`+`P` to open the `Command Palette`.
        
        3. Select **MI: Create New Project**.

            <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-command-palette.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-command-palette.png" alt="Create project using command palette" width="80%"></a>

      Next, the **Project Creation Form** will be opened.

4. In the **Project Creation Form**, enter a suitable name for the integration project under **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png" alt="New Project Details" width="70%"></a>

6. Click **Create**.

    Upon clicking **Create**, you will now see the below interface.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png" alt="Add Artifact Pane" width="80%"></a>

Now you can start creating your integration by developing artifacts. Additionally, you can enhance your experience by incorporating AI-powered assistance with [Micro Integrator Copilot]({{base_path}}/develop/mi-for-vscode/mi-copilot).

See the [Integration Artifacts Overview]({{base_path}}/develop/creating-artifacts/creating-artifacts-overview) documentation to learn about the integration artifacts.
