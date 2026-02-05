# Add connectors

You can develop configurations with connectors and deploy the configurations and connectors as composite application archive (CAR) files in WSO2 Integrator: MI.

## Instructions

This section describes the different methods to add connectors to your integration project.

### Add connectors to your integration flow

The recommended method to use connectors is to add them directly through the mediator palette while designing your integration flow.

1. Open the **Resource View** or **Sequence View** where you want to add the connector operation.

2. Click the **+** icon on the canvas to open the palette.

3. In the palette, navigate to **Mediators** and locate the connector category you need (for example, **HTTP**, **Salesforce**, **Gmail**).

4. Select the desired connector operation from the list.

5. Configure the connector operation by providing the required parameters and connection details.

    <a href="{{base_path}}/assets/img/integrate/connectors/import-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-connector.png" alt="import connector" width="80%"></a>

This method automatically adds the connector dependency to your project when you use a connector operation.

### Import connectors using the connector importer

You can import custom connectors or connectors from external sources using the connector importer.

1. Navigate to the **Project Overview** page.

2. Click **Add artifact**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="80%"></a>

3. Click **+ View More** under **Create an Integration**.

4. Select **Connections** under **Other Artifacts**.

5. Click the **Import Connector** button.

    <a href="{{base_path}}/assets/img/integrate/connectors/new-import-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/new-import-connector.png" alt="import connector" width="80%"></a>

6. Choose one of the following options:
    - Select **Import Using OpenAPI** to import a connector using an OpenAPI definition.
    - Select **Upload Connector ZIP file** to import a connector using a ZIP file.

    <a href="{{base_path}}/assets/img/integrate/connectors/import-connector-options.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-connector-options.png" alt="import connector options" width="80%"></a>

### Manually add connector files to the project

If you have already downloaded the connector, you can manually add the connector file to the directory `<PROJECT_HOME>/src/main/wso2mi/resources/connectors` in your project file structure.

### Remove connectors

1. Navigate to a sequence. 
2. Click the **+** icon. 
3. In the mediator palette, scroll down to the chosen connector.
4. Click on the delete icon to delete the connector from the project. 

   <a href="{{base_path}}/assets/img/integrate/connectors/delete-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/delete-connector.png" alt="delete connector" width="30%"></a>

!!! Info
    In addition to the above methods, you can enable a connector by creating a configuration file in the `<MI_HOME>/repository/deployment/server/synapse-configs/default/imports` directory with the following configurations. Replace the value of the `name` property with the name of your connector, and name the configuration file `{org.wso2.carbon.connector}<CONNECTOR_NAME>.xml` (for example, `{org.wso2.carbon.connector}salesforce.xml`).
    ```xml
        <import xmlns="http://ws.apache.org/ns/synapse"
        name="salesforce"
        package="org.wso2.carbon.connector"
        status="enabled"/>
    ```
