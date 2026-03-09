# Create a Custom Mediator

A custom mediator is a Class mediator that you can create to implement custom mediation logic. It is a Java class that extends the `org.apache.synapse.mediators.AbstractMediator` class. You can add a custom mediator to your integration project using the WSO2 Integrator: MI Visual Studio Code extension.

## Instructions  

### Create a custom mediator artifact

Follow the steps below to create a custom mediator artifact:

1. [Create a new integration project]({{base_path}}/develop/create-integration-project/) or select an existing one.  
2. Navigate to **MI Project Explorer** and click on **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

3. Click **+ View More** under **Create an Integration**.
4. Select **Class Mediator** under **Other Artifacts** to open the **ClassMediator Creation Form**.

    <a href="{{base_path}}/assets/img/integrate/create_project/select_class.png"><img src="{{base_path}}/assets/img/integrate/create_project/select_class.png" alt="class mediator artifact" width="80%"></a>

5. Enter the package name and class name of your mediator project.

    <a href="{{base_path}}/assets/img/integrate/create_project/custom_mediator_creation.png"><img src="{{base_path}}/assets/img/integrate/create_project/custom_mediator_creation.png" alt="class mediator form" width="80%"></a>

6. Click <b>Create</b> and see that the project is now listed in the project explorer.  

A new mediator class that extends `org.apache.synapse.mediators.AbstractMediator` is now added to the integration project. You can now add your custom mediation logic to this class.

!!! Info 
    A URL classloader is used to load classes in the mediator (class mediators are not deployed as OSGi bundles). Therefore, it is only possible to refer to the class mediator from artifacts packed in the same CAR file. Accessing the class mediator from an artifact in a different CAR file is not possible. However, you can refer to the class mediator from a sequence packed in the same CAR file and call that sequence from any other artifact packed in other CAR files.
