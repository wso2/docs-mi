# Open a Project

If you have an already created Integration project, you can open it using the Visual Studio Code. 

Follow the steps below to open your existing integration project:

1. Launch Visual Studio Code with the Micro Integrator extension installed.

    !!! info
        Follow the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Navigate to **Micro Integrator Project Explorer**.

3. Select **Open MI Project**.  

4. Select the folder containing your integration project.

5. Click **Open MI Project**.

    <a href="{{base_path}}/assets/img/develop/create-projects/importing-projects/open-mi-project.png"><img src="{{base_path}}/assets/img/develop/create-projects/importing-projects/open-mi-project.png" alt="Open MI Project"></a>

    !!! warning "If you have an integration project created by WSO2 Integration Studio..."
    
        MI for VS Code offers limited support for projects created by the WSO2 Integration Studio. To ensure compatibility, you need to migrate your project to a supported project structure.
       
        If you open an integration project created using WSO2 Integration Studio, you will be prompted with the following interface.
    
        Click **Migrate Project** to automatically migrate your project using the migration tool provided in the MI for VS Code extension.
    
        <a href="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-project.png"><img src="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-project.png" alt="Migrate project"></a>

You will see that the integration artifacts are imported into **Micro Integrator Project Explorer**, and the project files are imported into **Explorer**.
