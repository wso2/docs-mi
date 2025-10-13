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
    
        MI for VS Code offers limited support for projects created by the WSO2 Integration Studio. To ensure compatibility, you need to migrate your project or workspace to a supported project structure.

        <u>Migrating a Project</u>

        If you open an integration project created using WSO2 Integration Studio, you will be prompted with the following interface.
    
        Click **Migrate Project** to automatically migrate your project using the migration tool provided in the MI for VS Code extension. 

        For a maven multi module project, **each composite exporter** will have its own project created, and **only the files selected within the composite exporter** will be added to the respective project. If multiple projects are created during migration, they will be opened in a workspace. 
    
        The `.backup` folder is created to preserve a copy of the original Integration Studio project prior to migration.        

        Within the `.backup` folder, a file named `skipped-files-during-migration.txt` is generated, which contains the file paths of artifacts that were available to be selected in a composite exporter but were not selected in any composite exporter. 
        
        <a href="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-project.png"><img src="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-project.png" alt="Migrate project"></a>

        <u>Migrating a Workspace</u>

        If you open a workspace created using WSO2 Integration Studio, you will be prompted with the following interface:
        
        Click **Migrate Workspace** to automatically migrate the entire workspace using the migration tool provided in the MI for VS Code extension.

        Each integration project within the workspace will be migrated separately. This process is similar to migrating a single project. If multiple projects are created during migration, they will be opened in a workspace.
    
        <a href="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-workspace.png"><img src="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-workspace.png" alt="Migrate workspace"></a>         

You will see that the integration artifacts are imported into **Micro Integrator Project Explorer**, and the project files are imported into **Explorer**.
