# Create an Inbound Endpoint

Follow these instructions to create an [Inbound Endpoint]({{base_path}}/reference/synapse-properties/inbound-endpoints/about-inbound-endpoints) artifact in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

### Create an inbound endpoint artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. To add a new inbound endpoint, go to **Micro Integrator Project Explorer** > **Inbound Endpoints**.

4. Hover over **Inbound Endpoints** and click the **+** icon that appears to open the **Inbound EP Form**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/inbound-endpoint-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/inbound-endpoint-form.png" alt="Create inbound endpoint" width="80%"></a>

5. Select the inbound endpoint type.

6. Provide details for the inbound endpoint artifact.

    !!! note
        **Injecting Sequence Name** and **Error Sequence Name** are mandatory fields.
        If you don't have any sequences created in the integration project, tick the checkbox to **Automatically generate sequences**, to generate new sequences for the inbound endpoint. Otherwise, you can select sequences that already exist in the project to the **Injecting Sequence Name** and **Error Sequence Name** fields from the dropdown.

7. Once you complete the **Inbound EP Form**, click **Create**.
<br>

The created inbound endpoint will be available in the **MI Overview** under **Inbound Endpoints**.
If you checked the option to **Automatically generate sequences** in the previous step, the automatically generated inbound sequence and error sequence will also be available in the **MI Overview** under **Sequences**.

!!! info                                                                                                                                                              
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure.                                                                       
                                                                                                                                                                      
    The newly-created inbound endpoint will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/inbound-endpoints` folder of your integration project. 

    If you checked the option to **Automatically generate sequences** in the previous step, the inbound sequence and error sequence will also be created and stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/sequences` folder of your integration project.

### Design the integration

The integration flow for an inbound endpoint is defined within [named sequences]({{base_path}}/reference/mediation-sequences/#named-sequences).

1. To design the integration, go to **MI Project Explorer** > **Inbound Endpoints**.

2. Select the inbound endpoint.

Alternatively, to open this view, go to **MI Overview** and select the inbound sequence you want to design under **Sequences**.

This will open the design view of the inbound endpoint. You can design the inbound sequence now.

Follow the below steps to design the error sequence:

1. Go to **MI Overview**.

2. Select the inbound error sequence you want to design under **Sequences**.

You can now add the mediation artifacts from the palette and design the integration flow.

### Update the configurations

1. Go to **MI Project Explorer** > **Inbound Endpoints**.

2. Select the inbound endpoint you want to edit.

2. On the inbound endpoint view, click the edit (pen) icon next to the inbound endpoint name to edit the inbound endpoint.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/inbound-endpoint-view-edit.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/inbound-endpoint-view-edit.png" alt="Edit inbound endpoint" width="80%"></a>

    This will open the **Edit Listener** interface.

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

### Source View

Click the **Show Source** (`</>`) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the inbound endpoint. You can update the inbound endpoint using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-inbound-endpoint/source-view.png" alt="Edit inbound endpoint" width="80%"></a>

!!! abstract "Learn more about inbound endpoints"

    Follow our examples on inbound endpoints: 
    
    - [JMS Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-jms-protocol)
    - [File Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/file-inbound-endpoint)
    - [HTTP Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-http-protocol)
    - [HTTPS Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-https-protocol)
    - [HL7 Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-hl7-protocol-auto-ack)
    - [MQTT Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-mqtt-protocol)
    - [RabbitMQ Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-rabbitmq-protocol)
    - [Kafka Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-kafka)
    - [WebSocket Inbound Endpoint example]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-secured-websocket)
    - [Using Inbound Endpoints with Registry]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-with-registry)
    
    Follow our tutorial on inbound endpoints:
    
    - See the tutorial on [using inbound endpoints]({{base_path}}/learn/integration-tutorials/using-inbound-endpoints)
