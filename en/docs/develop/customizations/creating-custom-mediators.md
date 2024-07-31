# Create a Custom Mediator

Follow the instructions below to create a custom mediator.  

## Instructions  

### Create a custom mediator artifact

A custom mediator is a Java class that extends the `org.apache.synapse.mediators.AbstractMediator` class. This class is used to perform custom mediation logic on a message.
Follow the steps below to create a custom mediator artifact:

1. [Create a new integration project]({{base_path}}/develop/create-integration-project/#datasource-project) or select an existing one.  
2. Open <b>MI for VS Code</b> and click the `+` button of **Class Mediators** in the **Micro Integrator: Project Explorer** view to open the class mediator creation form as shown below.  
   ![new mediator project]({{base_path}}/assets/img/integrate/create_project/custom_mediator_creation.png)
3. Enter the package name and class name of your mediator project.
4. Click <b>Create</b> and see that the project is now listed in the project explorer.  

The mediator project is created in the workspace location you specified with a new mediator class that extends `org.apache.synapse.mediators.AbstractMediator`.
