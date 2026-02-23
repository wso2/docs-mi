# Create a custom inbound endpoint

WSO2 Integrator: MI supports several inbound endpoints. However, there can be scenarios that require functionality not provided by the existing inbound endpoints. For example, you might need an inbound endpoint to connect to a certain back-end server or vendor specific protocol.

To support such scenarios, you can write your own custom inbound endpoint by extending the behavior for **Listening**, **Polling**, and **Event-Based** inbound endpoints.

## Instructions

### Step 1: Develop the custom inbound endpoint

To develop your custom inbound endpoint, you can start by using the provided samples as a template. Ensure you thoroughly read the Javadoc for the methods provided in the template before proceeding with concrete implementation.

Depending on the type of inbound endpoint you want to create, download the relevant maven artifact from the links given below:

-   To create a **custom listening inbound endpoint**, download the maven artifact used in the [sample custom listening inbound endpoint configuration](https://github.com/wso2/docs-mi/tree/main/custom_inbound_listening).

-   To create a **custom polling inbound endpoint**, download the maven artifact used in the [sample custom polling inbound endpoint configuration](https://github.com/wso2/docs-mi/tree/main/custom_inbound_polling).

-   To create a **custom event-based inbound endpoint**, download the maven artifact used in the [sample custom event-based inbound endpoint configuration](https://github.com/wso2/docs-mi/tree/main/custom_inbound_event_based).

!!! note "Files to Modify"

    The following files need to be modified when developing your custom inbound endpoint.

    ---

    **1. connector.xml**

    *Purpose:* Defines the connector component metadata.

    *What to modify:*

    - `component name`: Give a preferred name to your inbound endpoint.
    - `package`: Update to match your Java package structure.
    - `description`: Provide a meaningful description of your inbound endpoint.

    *Example:*

    ```xml
    <component name="YourCustomInbound" package="org.wso2.integration.inbound">
        <description>Your Custom Inbound Endpoint Description</description>
    </component>
    ```

    ---

    **2. descriptor.yml**

    *Purpose:* Specifies Maven dependencies and repositories for your connector.

    *What to modify:*

    - Parameters are inherited from `filter.properties` using placeholders.
    - Add additional dependencies if your inbound endpoint requires external libraries.

    *Example:*

    ```yaml
    dependencies:
      - groupId: "${custom.inbound.groupId}"
        artifactId: "${custom.inbound.artifactId}"
        version: "${custom.inbound.version}"
      - groupId: "com.external.library"
        artifactId: "library-name"
        version: "1.0.0"
    ```

    You can also add custom repositories if needed.

    ---

    **3. filter.properties**

    *Purpose:* Defines property values that will be substituted into `descriptor.yml` during build.

    *What to modify:*

    - Default properties reference Maven project properties (usually keep as-is).
    - Add any custom parameters defined in `descriptor.yml`.

    *Example:*

    ```ini
    custom.inbound.groupId=${project.groupId}
    custom.inbound.artifactId=${project.artifactId}
    custom.inbound.version=${project.version}

    # Add custom properties here
    custom.property.name=custom.value
    ```

    ---

    **4. uischema.json**

    *Purpose:* Defines the UI schema for the WSO2 Integrator: MI VS Code extension.

    **a. Basic Identifiers**

    Update the basic identification fields:

    ```json
    {
      "id": "org.wso2.carbon.inbound.custom.poll.SamplePollingInboundConsumer",
      "name": "SamplePollingInboundConsumer",
      "type": "event-integration",
      "title": "SamplePollingInboundConsumer",
      "help": "Configuration of Sample Polling Inbound Endpoint",
      "elements": []
    }
    ```

    **b. Generic Configurations**

    Update the `name` attribute to reflect your inbound endpoint's name:

    ```json
    {
      "type": "attribute",
      "value": {
        "name": "name",
        "displayName": "Event Integration Name",
        "inputType": "string",
        "required": true,
        "helpTip": "Unique identifier for the Polling event integration."
      }
    }
    ```
    Update the hidden `class` attribute with your fully qualified class name:

    ```json
    {
    "type": "attribute",
    "value": {
        "name": "class",
        "displayName": "Class Name",
        "inputType": "string",
        "required": true,
        "hidden": true,
        "defaultValue": "org.wso2.carbon.inbound.custom.poll.SamplePollingInboundConsumer"
      }
    }
    ```

    !!! Important
        - Keep other attributes in `Generic` and `Inbound Functional` groups unchanged.
        - The `class` attribute in `uischema.json` must exactly match your Java implementation class.

    **c. Custom Configuration Attributes**

    Replace configuration groups with your actual settings. Each attribute defines a UI form field and you can add any number of configuration groups and attributes as necessary.

    ```json
    {
      "type": "attributeGroup",
      "value": {
        "groupName": "Connection Settings",
        "elements": [
          {
            "type": "attribute",
            "value": {
              "name": "hostname",
              "displayName": "Host Name",
              "inputType": "string",
              "required": true,
              "helpTip": "The hostname to connect to"
            }
          }
        ]
      }
    }
    ```

    !!! Tip
        - Use `hidden: true` for attributes that shouldn't appear in the UI.
        - Use `enableCondition` to show/hide fields based on other field values.

    **d. Input Types Available**

    The following input types are available for form fields:

    - `string`: Text input field.
    - `checkbox`: Boolean checkbox.
    - `keyOrExpression`: Dropdown for sequences/keys.

    You can also add validation attributes to any field:

    - `required`: Mark field as mandatory.
    - `defaultValue`: Set a default value.
    - `hidden`: Hide field from UI.
    - `enableCondition`: Show/hide field based on other field values

    ---

    **5. zip-assembly.xml**

    *Purpose:* 
    - Defines how the connector package is assembled.
    - Usually no changes needed unless you have additional resources.

    *What to modify:*

    - Add custom resource files (if required).

    *Example:*

    ```xml
    <file>
        <source>src/main/resources/custom-config.properties</source>
        <outputDirectory>/resources</outputDirectory>
    </file>
    ```


### Step 2: Build the custom inbound endpoint

Build your custom inbound endpoint using **Maven** to create the required inbound zip file. Run the following command from the project's root directory. It will build and place the resulting zip file in the project's `/target` folder.

```bash
  mvn clean install
```

### Step 3: Add the custom inbound endpoint to your integration project

1. If you have already created an [Integration Project]({{base_path}}/develop/create-integration-project), Go to 'File Explorer'.
   
    !!! Tip
        -  If you have not created an integration project yet, refer to [Creating an Integration Project]({{base_path}}/develop/create-integration-project) to create one first.

2. Then navigate to 'src/main/wso2mi/resources' directory of your integration project.
3. Then create a folder named `inbound-connectors` inside the `/resources` folder if it does not already exist.
4. Copy the generated zip file from the `/target` folder of your custom inbound endpoint project to the `/inbound-connectors` folder you created in the previous step.
5. Then your custom inbound endpoint will be listed under Event Integration List.

### Step 4: Create an inbound endpoint
1. Click on the WSO2 Integrator: MI icon on the Activity Bar of the VS Code editor.
   <a href="{{base_path}}/assets/img/get-started/event-integration/select_event_integration.png"><img src="{{base_path}}/assets/img/get-started/event-integration/select_event_integration.png" alt="Create New Project" width="80%"></a>
2. In the Add Artifact interface, under Create an Integration, click Event Integration. This will open the list of event integrations available in WSO2 Integrator: MI.
   <a href="{{base_path}}/assets/img/get-started/event-integration/select_kafka_listener.png"><img src="{{base_path}}/assets/img/get-started/event-integration/select_kafka_listener.png" alt="Create New Project" width="80%"></a>
3. Select your custom inbound from the list. 
4. In the Create Event Integration form, provide the required details for your inbound endpoint and click `Create`.
