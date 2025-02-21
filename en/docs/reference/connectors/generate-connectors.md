# Generate a connector

## Generate a Connector from an OpenAPI Definition

This document explains how to generate a connector from an OpenAPI definition using Micro Integrator for VSCode Extension. By using an OpenAPI definition, users can automatically create a connector that enables seamless integration with RESTful APIs. The connector will be added to your project and you can use it in your integration flows. When you share your Integration Project with others, the connector will be included in the project.

Follow the below steps to generate a connector using the WSO2 Micro Integrator for VS Code extension (MI for VS Code).

1. Launch Visual Studio Code with the MI for VS Code extension installed.

    !!! info
        Follow the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.

2. Create a new integration project

    Click **Create New Project** on **Micro Integrator Project Explorer**. For more options to create a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

3. Navigate to the **Project Overview** page.

4. Click on **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.

    <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="60%"></a>

7. Click **Import Connector**.

    <a href="{{base_path}}/assets/img/integrate/connectors/import-connector-openapi.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-connector-openapi.png" alt="import connector" width="60%"></a>

8. Select **Import Using OpenAPI** method and click on **Select Location** to upload the OpenAPI definition file. After uploading the file, click **Import**.

    !!! Tip
        You can download a sample OpenAPI definition file from [here](https://raw.githubusercontent.com/swagger-api/swagger-petstore/refs/tags/swagger-petstore-v3-1.0.19/src/main/resources/openapi.yaml).

    <a href="{{base_path}}/assets/img/integrate/connectors/import-openapi-method.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-openapi-method.png" alt="import connector form" width="60%"></a>

9. If the OpenAPI definition is valid, the connector will be generated and added to the project. You can view the generated connection type in the **Connections**.

    <a href="{{base_path}}/assets/img/integrate/connectors/generated-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/generated-connector.png" alt="generated connector" width="60%"></a>

10. To use the connector operations, you can create an Integration artifact (Eg: API, Sequence, etc.) and add it from the Mediator Palette.

    <a href="{{base_path}}/assets/img/integrate/connectors/use-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/use-connector.png" alt="use connector" width="60%"></a>
