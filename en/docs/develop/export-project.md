# Exporting a Project

With MI for VS Code, you can export projects and later [import]({{base_path}}/develop/importing-projects) them.

If you are deploying the Carbon Application on a remote server that cannot be configured using the **Build and Run** option, you can export the Carbon Application and deploy it manually.

Follow one of the below options:

- Click the **Build** button in the top right corner of the **Project Overview** page to build the Carbon Application. 
  Once the build is complete, switch to the VS Code default **Explorer** view and retrieve the Carbon Application file from the `target` directory under the `<PROJECT_NAME>` directory.

    <a href="{{base_path}}/assets/img/develop/build-capp.png"><img src="{{base_path}}/assets/img/develop/build-capp.png" alt="build" width="700"></a>

- To build and export in a single step, click the Export button in the top right corner of the Project Overview page. 
  Select a directory to save the exported Carbon Application file.

    <a href="{{base_path}}/assets/img/develop/export-capp.png"><img src="{{base_path}}/assets/img/develop/export-capp.png" alt="export" width="700"></a>

Once the Carbon Application is exported, you can manually copy it to the `<MI_HOME>/repository/deployment/server/carbonapps` directory and start the server.

