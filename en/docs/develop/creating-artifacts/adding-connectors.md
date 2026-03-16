# Add Connectors

You can develop configurations with connectors, and deploy the configurations and connectors as composite application archive (CAR) files in WSO2 Micro Integrator.

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

1. Navigate to the mediation flow to which the connector operation should be added.
2. Click the **+** icon in the relevant location of the mediation flow to open the mediator palette.
3. Click on **+ Add Module** and then select the **+ Import Module** option.

   <a href="{{base_path}}/assets/img/integrate/connectors/import-connector.gif"><img src="{{base_path}}/assets/img/integrate/connectors/import-connector.gif" alt="import connector" width="80%"></a>

!!! Note
    The imported connector will be stored in the `<PROJECT_HOME>/src/main/wso2mi/resources/connectors` folder location.

#### Method 3: Import connections

1. Navigate to the **Project Overview** page.
2. Click on **Add artifact**.
3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store** form.
5. Select the relevant option to either import a connection using an **OpenAPI definition** or a **gRPC (Proto) definition**.

    <a href="{{base_path}}/assets/img/integrate/connectors/import-connection.png"><img src="{{base_path}}/assets/img/integrate/connectors/import-connection.png" alt="import connection" width="80%"></a>

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
