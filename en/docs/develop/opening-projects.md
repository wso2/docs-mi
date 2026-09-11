# Open a Project

If you have an already created Integration project, you can open it using the Visual Studio Code. 

## Opening a Project

Follow the steps below to open your existing integration project:

1. Launch Visual Studio Code with the WSO2 Integrator: MI extension installed.

    !!! info
        Follow the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Click on the WSO2 Integrator: MI icon on the **Activity Bar** of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

    This opens the **WSO2 Integrator: Integrations** panel.

3. Click **Get Started** to open the **Welcome** page.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/get-started.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-get-started.png" alt="Get Started" width="80%"></a>

4. Click **Open** under **Open Project**.

    <a href="{{base_path}}/assets/img/develop/open-project/open-project.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/open-project/open-project.png" alt="Open Project" width="80%"></a>

5. Select the folder containing your integration project.

    !!! Note

        Select the **Import from CApp** option if you want to create a project using an existing Composite Application (CApp).

        <a href="{{base_path}}/assets/img/develop/open-project/import-from-capp.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/open-project/import-from-capp.png" alt="Import from CApp"></a>

    !!! warning "If you have an integration project created by WSO2 Integration Studio..."
    
        MI for VS Code offers limited support for projects created by the WSO2 Integration Studio. To ensure compatibility, you need to migrate your project or workspace to a supported project structure.

        <u>Migrating a Project</u>

        If you open an integration project created using WSO2 Integration Studio, you will be prompted with the following interface.
    
        Click **Migrate Project** to automatically migrate your project using the migration tool provided in the MI for VS Code extension. 

        For a maven multi module project, **each composite exporter** will have its own project created, and **only the files selected within the composite exporter** will be added to the respective project. If multiple projects are created during migration, they will be opened in a workspace. 
    
        The `.backup` folder is created to preserve a copy of the original Integration Studio project prior to migration.        

        Within the `.backup` folder, a file named `skipped-files-during-migration.txt` is generated, which contains the file paths of artifacts that were available to be selected in a composite exporter but were not selected in any composite exporter. 
        
        <a href="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-project.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-project.png" alt="Migrate project"></a>

        <u>Migrating a Workspace</u>

        If you open a workspace created using WSO2 Integration Studio, you will be prompted with the following interface:
        
        Click **Migrate Workspace** to automatically migrate the entire workspace using the migration tool provided in the MI for VS Code extension.

        Each integration project within the workspace will be migrated separately. This process is similar to migrating a single project. If multiple projects are created during migration, they will be opened in a workspace.
    
        <a href="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-workspace.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/importing-projects/migrate-workspace.png" alt="Migrate workspace"></a>         

You will see that the integration artifacts are imported into **WSO2 Integrator: MI Project Explorer**, and the project files are imported into **Explorer**.

!!! info
    If the folder you open is a [consolidated project]({{base_path}}/develop/create-integration-project/#creating-a-consolidated-project), all of its modules are opened together, and each module is listed in the **WSO2 Integrator: MI Project Explorer**.

## Opening Multiple Projects in a Workspace

You are not limited to opening a single integration project at a time. You can open additional existing integration projects alongside an already open project, so that you can view and work with them together in the **WSO2 Integrator: MI Project Explorer**.

To open another project in your current workspace:

1. Click the **+** icon at the top of the **WSO2 Integrator: MI Project Explorer** pane.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-new-project-icon.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-new-project-icon.png" alt="Create New Project icon" width="80%"></a>

    This opens the same **Welcome** page shown in step 3 of [Opening a Project](#opening-a-project) above.

2. Follow steps 4 to 5 under [Opening a Project](#opening-a-project) to open the new project.

Once opened, the project will be added alongside the existing one, and both will be listed together in the **WSO2 Integrator: MI Project Explorer**.

!!! tip
     You can create a [consolidated project]({{base_path}}/develop/create-integration-project/#creating-a-consolidated-project) if you want to manage several related integration projects together as a single project.
