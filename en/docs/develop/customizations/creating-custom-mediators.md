# Creating a Custom Mediator

If you need to create a custom mediator that performs some logic on a message, you can either create a new project for mediator, or import an existing mediator project using MI for VS Code.

Once a mediator project is finalized, you can build it as a deployable artifact by clicking on the **Build** and selecting **Build CAPP** . This creates a JAR file that you can deploy. Alternatively, you can deploy the Composite Application Archive (CAR), created during the build process, to the Micro Integrator.

!!! Info
    A URL classloader is used to load classes in the mediator (class mediators are not deployed as OSGi bundles). Therefore, it is only possible to refer to the class mediator from artifacts packed in the same CAR file in which the class mediator is packed. Accessing the class mediator from an artifact packed in another CAR file is not possible. However, it is possible to refer to the class mediator from a sequence packed in the same CAR file and call that sequence from any other artifact packed in other CAR files.

## Instructions

### Creating a Mediator Project

Create this project directory to start creating custom mediator artifacts. You can use these customer mediators when you define the mediation flow in your ESB config project.

1. Open <b>MI for VS Code</b> and click the `+` button of **Class Mediators** in the **Micro Integrator: Project Explorer** view to open the class mediator creation form as shown below.
   ![new mediator project]({{base_path}}/assets/img/integrate/create_project/custom_mediator_creation.png)
2. Enter the package name and class name of your mediator project.
3. Click <b>Create</b> and see that the project is now listed in the project explorer.

The mediator project is created in the workspace location you specified with a new mediator class that extends `org.apache.synapse.mediators.AbstractMediator`.
