# Debugging Mediation

## Debugging with External Micro Integrator

1. [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the Micro Integrator server and on your computer.

2. Launch Visual Studio Code with the [Micro Integrator Extension installed]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode).

3. Select the artifact that requires debugging from the **Project Overview** page.

    <img src="{{base_path}}/assets/img/develop/debugger/project-overview.png" alt="project overview" width="700">

4. Then select the relevant resource from the **Service Designer** page in order to open the **Diagram View** of the resource.

    <img src="{{base_path}}/assets/img/develop/debugger/service-designer.png" alt="service designer" width="700">

5. To add a breakpoint to a mediator, in the **Diagram View** click on the **Options** icon on the right side of the mediator name and select **Add Breakpoint**.

    <img src="{{base_path}}/assets/img/develop/debugger/add-breakpoint.png" alt="add breakpoint" width="300">
   
    !!! Note
         To remove a breakpoint from a mediator, click on the **Options** icon on the right side of the mediator name and select **Remove Breakpoint**.
   
          <img src="{{base_path}}/assets/img/develop/debugger/remove-breakpoint.png" alt="remove breakpoint" width="300">

6. Configure a new MI server without any previously deployed integrations to avoid conflicts by following the steps below.

    1. Open the command palette in VS Code by entering `Command`+`Shift`+`P` on macOS and `Ctrl`+`Shift`+`P` on Windows.
    2. Select **MI: Add MI server** from the list of available commands.
    3. Select the folder where `<MI_HOME>` is located.
   
      <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png" alt="Current server path" width="50%"></a>
      
    !!! Note
         Mediation debugging with the MI for VSCode extension is supported on Windows starting from MI server version 4.3.0. 

7. Select the **Run and Debug** extension from the left side panel and then click on the **Run and Debug** button.

    <img src="{{base_path}}/assets/img/develop/debugger/run-and-debug.png" alt="run debug" width="700">

8. Select **MI: Run and Debug** as the debugger.

    <img src="{{base_path}}/assets/img/develop/debugger/select-debugger.png" alt="debugger selection" width="700">

Then the server will start up in debug mode and the server logs can be viewed in the Terminal alongside with the Debug Console.

<img src="{{base_path}}/assets/img/develop/debugger/terminal-view.png" alt="terminal view" width="700">

Once the server is up, send a request to the Micro Integrator and start debugging the flow.

<img src="{{base_path}}/assets/img/develop/debugger/with-breakpoints.png" alt="breakpoints" width="300">

You can use the below controlling panel to debug the flow by performing operations like step over, restart, pause, and stop.

<img src="{{base_path}}/assets/img/develop/debugger/debugger-controls.png" alt="debugger controls" width="700">

## Information provided by the Debugger Tool

When your target artifact gets a request message and when the mediation flow reaches a mediator marked as a breakpoint, the message mediation process suspends at that point.

There are two segments in the **Variables** section, namely **Server Internals** and **Message Envelope**.

 <img src="{{base_path}}/assets/img/develop/debugger/variables.png" alt="variables" width="700">

You can view the message payload in the **Message Envelope** section and you can view the message mediation properties in the **Server Internals** section.

The **Server Internals** section contains properties of the following property scopes.

-   **Axis2-Client Scope** properties
-   **Axis2 Scope** properties
-   **Operation Scope** properties
-   **Synapse Scope** properties
-   **Transport Scope** properties

These properties can be further expanded in order to view information on the property keys and values of them as shown below.

 <img src="{{base_path}}/assets/img/develop/debugger/properties-expanded.png" alt="properties expanded" width="700">
