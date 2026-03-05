## Generate a gRPC connector from a Proto definition

This section explains how to generate a gRPC connector from a `.proto` file using the WSO2 Integrator:  MI Connector Generator tool. The gRPC connector enables seamless communication between services, facilitating integration with systems that expose gRPC APIs. By utilizing a `.proto` file, which defines the service and message structure, the connector is automatically generated, allowing you to implement a fully functional gRPC client in your integration.

## Prerequisites

Before you begin, ensure you have the following:

* **Java Development Kit (JDK) 8 or later**
* **Apache Maven 3.6.x or higher**

## Steps to generate the connector

There are two ways of generating a gRPC connector from a `.proto` file:

1. **Using the WSO2 Integrator: MI for VS Code extension**: This method allows you to generate a connector directly from the VS Code IDE.
2. **Using the WSO2 MI Connector Tooling**: This method involves using a command-line tool to generate the connector from a `.proto` file.

## Option 01: Using the WSO2 Integrator: MI for VS Code extension

Follow the steps below to generate the gRPC connector:

1. **Launch Visual Studio Code** with the MI for VS Code extension installed.

    !!! info
        Follow the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. **Create a new integration project**.

    Click **Create New Project** on **WSO2 Integrator: MI Project Explorer**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

3. **Navigate to the Project Overview page**.

4. Add a new artifact by clicking on **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click on **+ View More** under **Create an Integration**.

6. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.

      <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="60%"></a>

7. Click on the **For gRPC (Proto)**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-6.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-6.png" alt="connections artifact" width="60%"></a>

8. Then select a location for the .proto file and click the **import**

9. If the given proto file is valid, You can view the generated connection type in the **Connections**.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png" alt="generated connector" width="60%" ></a>

10. To use the connector operations, you can create an integration artifact (such as API and sequence) and add it from the Mediator Palette.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png" alt="generated connector" width="60%" ></a>

## Option 02: Using the WSO2 MI Connector Tooling

Follow the steps below to generate the gRPC connector:

1. **Fork the MI connector tooling repository**

    * Fork the [esb-connector-tooling repository](https://github.com/wso2-extensions/esb-connector-tooling).

2. **Build the project using maven**

    * Navigate to your project directory (`<PROJECT_HOME>/`) and build the project using Maven:

    ```bash
    mvn clean install
    ```

3. **Locate the tool**

    * Once built, the tool will be packaged as a zip file: `mi-connector-generator-{version}.zip`.
    * You can find this file in the `<PROJECT_HOME>/target` directory.

4. **Extract the tool**

    * Extract the `mi-connector-generator-{version}.zip` file to your preferred location.

5. **Run the connector generator**

    * Navigate to the extracted folder and go to the `bin` directory.

    * **For macOS/Linux**: Use `generate.sh`:

      ```bash
      ./generator <proto-file> <output-directory> [miVersion]
      ```

    * **For Windows**: Use `generate.bat`:

      ```bash
      generator.bat <proto-file> <output-directory> [miVersion]
      ```

    * Replace:

        * `<proto-file>` with the path to your `.proto` file.
        * `<output-directory>` with the path where you want the connector to be generated.
        * `[miVersion]` with your specific WSO2 Integrator: MI version.

##### Example command

For macOS/Linux:

```bash
./generator /path/to/order-service.proto /path/to/output-directory 4.6.0
```

For Windows:

```bash
generator.bat C:\path\to\order-service.proto C:\path\to\output-directory 4.6.0
```

By following these steps, you can generate a fully functional gRPC connector from a `.proto` file, enabling seamless integration with gRPC-based services in WSO2 Integrator: MI.

##### Steps to import generated connector

1. Navigate to the **Mediator Palette** page
2. Select the **Add Module** under the Mediator Palette.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-1.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-1.png" alt="generated connector" width="60%" ></a>

3. Select **Import Module**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-8.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-8.png" alt="import connector" width="60%"></a>

4. Select Location to upload the generated connector. After providing the generated connector zip file, click **Import**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-9.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-9.png" alt="generated connector" width="60%"></a>

5. You can view the connector type in **the Connections**

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-4.png" alt="generated connector" width="60%" ></a>

6. To use the connector operations, you can create an integration artifact (such as API and sequence) and add it from the Mediator Palette.

      <a href="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png"><img src="{{base_path}}/assets/img/integrate/connectors/grpc-tool/grpc-tool-5.png" alt="generated connector" width="60%" ></a>

!!! Note
    The gRPC Connector Generator does **not** yet handle:

    - **Streaming RPCs** : server, client, or bidirectional streams
    - **Custom `.proto` options**:  e.g., `deadline`, any other non-standard option fields
    - **Specific data types**: `oneof` unions and deeply nested complex structures
    
    > For the full list of features the tool *does* support, see the [gRPC generator tool specification guide](https://github.com/wso2-extensions/esb-connector-tooling/blob/master/docs/grpc-spec.md).
