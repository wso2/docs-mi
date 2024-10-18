# Creating an Integration Project

1. Launch Visual Studio Code with the Micro Integrator extension installed.

    !!! info
        Follow the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Click on the WSO2 icon on the **Activity Bar** of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

    This will open the **Design View**.

3. Next, create a new integration project. You have three options to create a new project:

    - **Option 1:** Using the Design View:

        Click **Create New Project** on **Design View**.
    
        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-design-view.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-design-view.png" alt="Create project using design view" width="80%"></a>
    
    - **Option 2:** Using the Micro Integrator Project Explorer: 

        Click **Create New Project** on the **Micro Integrator Project Explorer** pane.
        
        <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-mi-project-explorer.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-mi-project-explorer.png" alt="Create project using MI project explorer" width="80%"></a>

    - **Option 3:** Using the Command Palette: 

        1. Go to the **Command Palette** at the top of the Visual Studio Code interface.
        
        2. Type `>` to display the available commands.
        
            Alternatively, on macOS press `Command`+`Shift`+`P`, and on Windows press `Control`+`Shift`+`P` to open the `Command Palette`.
        
        3. Select **MI: Create New Project**.

            <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-command-palette.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/create-project-using-command-palette.png" alt="Create project using command palette" width="80%"></a>

      Next, the **Project Creation Form** will be opened.

4. In the **Project Creation Form**, enter a suitable name for the integration project under **Project Name**.

5. Provide a location under the **Select Project Directory**.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/new-project-details.png" alt="New Project Details" width="70%"></a>

6. Click **Create**.

    Upon clicking **Create**, you will now see the below interface.

    <a href="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png"><img src="{{base_path}}/assets/img/develop/create-projects/create-integration-project/add-artifact-pane.png" alt="Add Artifact Pane" width="80%"></a>
  
Now you can start creating your integration project by creating artifacts. You can also incorporate the AI-powered assistance experience with Micro Integrator Copilot. 

The following are the synapse artifacts that can be added to an integration flow:

| Artifact              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **API**               | An endpoint with a URL, specifying the context and resources accessible through HTTP methods such as GET, PUT, POST, DELETE. When requests arrive, they are processed by the input sequence (inSequence) of the API, where the Micro Integrator uses mediators to process the message and forward it to the backend service. Upon receiving the response from the backend, the same inSequence or a designated faultSequence (in case of errors) processes the response and forwards it to the client, ensuring a streamlined flow of messages without the need for an output sequence. |
| **Endpoint**          | Defines external reference points for sending out messages from the integration server to external services or APIs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Sequence**          | A reusable set of mediation instructions that processes incoming or outgoing messages. Sequences are used in the proxy service and the REST APIs. Each sequence is a set of mediators where messages are processed.                                                                                                                                                                                                                                                                                                                                                                     |
| **Proxy**             | Acts as an intermediary that accepts client requests, optionally applies mediation logic through sequences, and routes them to external services or internal components for processing, thereby decoupling the client and backend service endpoints.                                                                                                                                                                                                                                                                                                                                    |
| **Inbound Endpoint**  | A listener that facilitates the receiving of messages from external systems into the MI ecosystem. They can be configured dynamically without restarting the server. Messages move from the transport layer to the mediation layer without going through the Axis2 engine.                                                                                                                                                                                                                                                                                                              |
| **Message Store**     | Temporarily stores messages that are processed asynchronously, allowing for reliable messaging and delayed processing. The delivery of a message to the endpoint can be guaranteed with this, since it is only deleted from the Store when an endpoint receives the message correctly.                                                                                                                                                                                                                                                                                                  |
| **Message Processor** | Handles the processing of messages stored in message stores, managing the delivery of messages to endpoints based on specific conditions or schedules. The message processor extracts a queue, memory or database from it and sends it to an endpoint.                                                                                                                                                                                                                                                                                                                                  |
| **Task**              | A scheduled job that executes specific logic at predefined intervals to automate integration workflows. Tasks can also be customized.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Local Entry**       | Static configurations stored locally within the server, used to define simple values or XML configurations that can be referenced within synapse configurations.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Template**          | A reusable configurations that can be parameterized and applied to multiple integration scenarios to promote reusability.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Data Service**      | A deployable artifact that exposes data operations as web services, allowing for CRUD (Create, Read, Update, Delete) operations on underlying data sources through SOAP or RESTful APIs.                                                                                                                                                                                                                                                                                                                                                                                                |
| **Data Source**       | A configuration element that defines the connection details to a database, enabling the Micro Integrator to interact with it for data operations.                                                                                                                                                                                                                                                                                                                                                                                                                                       | 
| **Class Mediator**    | A custom Java class that implements the `org.apache.synapse.Mediator` interface, allowing developers to execute custom logic within the flow of a Synapse configuration.                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Registry**          | A centralized configuration management system used to store, manage, and retrieve configuration artifacts and resources for integration solutions.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
