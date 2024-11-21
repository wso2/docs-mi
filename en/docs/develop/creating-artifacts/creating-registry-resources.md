# Create a Registry Resource

Initially, your registry resources project will contain only a `pom` file. You can create any number of registry resources inside that project.

## Step 1: Create the resource artifact

Select the project in Project Explorer.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-add-registry-1.png" width="300">

Click on **+ Add Artifact**. 

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-add-registry-2.png" width="800">

Select **Registry** from the appeared menu. 

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-add-registry-3.png" width="800">

This will open the **New Registry Resource** window.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-create-form.png" width="800">

Select one of the following options.

- [From existing template](#from-existing-template)
- [Import from file system](#import-from-file-system)

### From the existing template

Use the **From existing template** option if you want to generate a registry resource from a template.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-select-existing-template.png" width="800">

Enter a unique name for the **Resource Name**, and **Artifact Name**. Then select a resource template for the **Template Type** field. In this example, a **WSDL File** template is used.

### Import from the file system

Use the **Import from file system** option to import a file or a folder containing registry resources.

!!! Tip
    This helps you import a resource and collection from the same registry instance or a different registry instance that you have added. Similarly, you can export a resource or collection to the same registry instance or a different registry instance.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-select-importing.png" width="800">

Enter a unique name for the artifact, and use **Browse file/Browse folder** to find the relevant file or folder. 

## Step 2: Save the resource artifact

Specify the location to save the registry resource and click **Create**.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-resource-save.png" width="800">  

<table>
  <tr>
    <th>Registry type</th>
    <td>Specify whether it is a governance registry or a configuration registry.</td>
  </tr>
  <tr>
    <th>Registry path</th>
    <td>Specify where the registry resource should be saved at the time of deployment.</td>
  </tr>
</table>

## Edit a registry resource

There may be instances where you need to change the details you entered such as media type, properties, or other information for a registry resource. You can edit such information using the **Edit Registry Metadata** option. To open this edit view, go to the **Registry Explorer** and click on the pen icon of the resource that needs to be updated.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/registry-explorer.png" width="300">  

Click on the **Update** button after making the necessary changes.

<img src="{{base_path}}/assets/img/integrate/create_artifacts/new_resource/edit-registry.png" width="800">  
