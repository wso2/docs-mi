# Add Connectors

You can develop configurations with connectors, and deploy the configurations and connectors as composite application archive (CAR) files in WSO2 Micro Integrator.

!!! Info
    In addition to the below methods, you can enable a connector by creating a configuration file in the `MI_HOME/repository/deployment/server/synapse-configs/default/imports` directory with the following configurations. Replace the value of the `name` property with the name of your connector, and name the configuration file `{org.wso2.carbon.connector}<CONNECTOR_NAME>.xml` (e.g., `{org.wso2.carbon.connector}salesforce.xml`).
    ```xml
    <import xmlns="http://ws.apache.org/ns/synapse"
            name="salesforce"
            package="org.wso2.carbon.connector"
            status="enabled"/>
    ```

## Instructions

See the topics given below.

### Import connectors

Follow the steps below to import connectors into Micro Integrator VS Code Extension:

1. When adding a Connector operation, choose the desired Connector in the **Connector** palette. This will automatically import the selected Connector.

2. If you have already downloaded the connector, in the project file structure you can add the connector file into the directory, `<PROJECT_HOME>/src/main/wso2mi/resources/connectors`

<img src="{{base_path}}/assets/img/develop/adding-connector.png">

### Remove connectors

You can manually remove the connectors added to `<PROJECT_HOME>/src/main/wso2mi/resources/connectors` directory by deleting them.
