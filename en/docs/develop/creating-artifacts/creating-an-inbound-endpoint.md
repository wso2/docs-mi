# Create an Inbound Endpoint

Follow these instructions to create an [Inbound Endpoint]({{base_path}}/reference/synapse-properties/inbound-endpoints/about-inbound-endpoints) artifact in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

### Create an inbound endpoint artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. To add a new Inbound Endpoint, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. On the **Add artifact** pane, click **Event Integration** under **Create an Integration** to open the **Event Integration Form**.

6. Select the Event Integration type.

8. Once you complete the **Event Integration Form**, click **Create**.

The created inbound endpoint will be available in **Project Overview** under **Event Integration**.

<!--
If you checked the option to **Automatically generate sequences** in the previous step, the automatically generated inbound sequence and error sequence will also be available in **Project Overview** under **Sequences**.
-->

!!! info                                                                                                                                                              
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure.                                                                       
                                                                                                                                                                      
    The newly-created inbound endpoint will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/inbound-endpoints` folder of your integration project. 

    The inbound sequence and error sequence will also be created and stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/sequences` folder of your integration project.

### Design the integration

1. To design the integration, go to **MI Project Explorer** > **Event Integrations**.

2. Select the inbound endpoint you want to design.

3. Click on the **+** icon to open the palette.

4. Add the mediation artifacts from the palette and design the integration flow.

Follow the below steps to design the error sequence:

1. Go to **MI Project Explorer** > **Other Artifacts** > **Sequences**.

2. Select the previously-created error sequence you want to design.

3. Add the mediation artifacts from the palette and design the integration flow.

### Update the configurations

1. Go to **MI Project Explorer** > **Event Integrations**.

2. Select the inbound endpoint you want to edit.

2. On the inbound endpoint view, click the edit (pen) icon next to the inbound endpoint name to edit the inbound endpoint.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/inbound-endpoint-view-edit.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/inbound-endpoint-view-edit.png" alt="Edit inbound endpoint" width="80%"></a>

    This will open the **Event Integration** form.

4. Once you update the details, click **Update**.

See the following links for the list of parameters for each inbound endpoint type:

- [HTTP Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/http-inbound-endpoint-properties)
- [CXF WS RM Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/cxf-ws-rm-inbound-endpoint-properties)
- [HL7 Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/hl7-inbound-endpoint-properties)
- [WebSocket Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/websocket-inbound-endpoint-properties)
- [File Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/polling-inbound-endpoints/file-inbound-endpoint-properties)
- [JMS Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/polling-inbound-endpoints/jms-inbound-endpoint-properties)
- [Kafka Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/polling-inbound-endpoints/kafka-inbound-endpoint-properties)
- [RabbitMQ Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/event-based-inbound-endpoints/rabbitmq-inbound-endpoint-properties)
- [MQTT Inbound Parameters]({{base_path}}/reference/synapse-properties/inbound-endpoints/event-based-inbound-endpoints/mqtt-inbound-endpoint-properties)

### Source view

Click the **Show Source** (**</>**) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the inbound endpoint. You can update the inbound endpoint using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/source-view.png" alt="Edit inbound endpoint" width="80%"></a>

## Tutorials

Follow our tutorial on inbound endpoints:
    
- See the tutorial on [using inbound endpoints]({{base_path}}/learn/integration-tutorials/using-inbound-endpoints)

## Examples

Follow our examples on inbound endpoints: 

- [JMS Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-jms-protocol)
- [File Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/file-inbound-endpoint)
- [HTTP Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-http-protocol)
- [HTTPS Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-https-protocol)
- [HL7 Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-hl7-protocol-auto-ack)
- [MQTT Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-mqtt-protocol)
- [RabbitMQ Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-rabbitmq-protocol)
- [WebSocket Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-secured-websocket)
- [Using Inbound Endpoints with Registry]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-with-registry)
    