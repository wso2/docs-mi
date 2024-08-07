# Create a Custom Mediator

A custom mediator is a Class mediator that you can create to implement custom mediation logic. It is a Java class that extends the `org.apache.synapse.mediators.AbstractMediator` class. You can add a custom mediator to your integration project using the WSO2 Micro Integrator Visual Studio Code extension.

## Instructions  

### Create a custom mediator artifact

Follow the steps below to create a custom mediator artifact:

1. [Create a new integration project]({{base_path}}/develop/create-integration-project/#datasource-project) or select an existing one.  
2. Open <b>MI for VS Code</b> and click the `+` button of **Class Mediators** in the **Micro Integrator: Project Explorer** view to open the class mediator creation form as shown below.  
   ![new mediator project]({{base_path}}/assets/img/integrate/create_project/custom_mediator_creation.png)  
3. Enter the package name and class name of your mediator project.
4. Click <b>Create</b> and see that the project is now listed in the project explorer.  

A new mediator class that extends `org.apache.synapse.mediators.AbstractMediator` is now added to the integration project. You can now add your custom mediation logic to this class.

!!! Info 
    A URL classloader is used to load classes in the mediator (class mediators are not deployed as OSGi bundles). Therefore, it is only possible to refer to the class mediator from artifacts packed in the same CAR file. Accessing the class mediator from an artifact in a different CAR file is not possible. However, you can refer to the class mediator from a sequence packed in the same CAR file and call that sequence from any other artifact packed in other CAR files.
