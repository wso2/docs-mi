# Add Connectors

You can develop configurations with connectors, and deploy the configurations and connectors as composite application archive (CAR) files in WSO2 Integrator: MI.

## Instructions

See the topics given below.

### Import connectors

The following methods allow you to import connectors into the project.

#### Method 1: Add connectors from the Connector Store

1. Navigate to the **Project Overview** page.
2. Click on **Add artifact**.
   
    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="80%"></a>

3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.
   
    <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="80%"></a>

5. Choose the desired connection. This will ask for the addition of dependencies to the project. Clicking **Yes** will add the connector to the project.

#### Method 2: Import connectors

1. Navigate to the **Project Overview** page.
2. Click on **Add artifact**.
3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.
5. There you can click on the **Import Connector** button.

    <a href="{{base_path}}/assets/img/integrate/connectors/new-import-connector.png"><img src="{{base_path}}/assets/img/integrate/connectors/new-import-connector.png" alt="import connector" width="80%"></a>

6. From the options appearing,
    - Select **Import Using OpenAPI** to import a connector using an OpenAPI definition.
    - Select **Upload Connector ZIP file** to import a connector using a ZIP file.

    <a href="{{base_path}}/assets/img/integrate/connectors/import-connector-options.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-connector-options.png" alt="import connector options" width="80%"></a>

#### Method 3: Directly add connectors to the project

If you have already downloaded the connector, in the project file structure you can add the connector file into the directory `<PROJECT_HOME>/src/main/wso2mi/resources/connectors`.

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
