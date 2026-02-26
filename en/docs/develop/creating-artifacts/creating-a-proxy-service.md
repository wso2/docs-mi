# Create a Proxy Service

Follow these instructions to create a [Proxy Service]({{base_path}}/reference/synapse-properties/proxy-service-properties) artifact in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

## Create a new proxy service artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. To add a new proxy service, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Proxy** under **Other Artifacts** to open the **Proxy Service Form**.

7. Once you complete the **Proxy Service Form**, click **Create**.

!!! info
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure.

    The newly-created proxy service will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/proxy-services` folder of your integration project.

## Design the integration

1. Go to **MI Project Explorer** > **Other Artifacts** > **Proxy Services**.

2. Click on the proxy service you created to open the **Proxy View**.

3. Click on the **+** icon to open the palette.
   
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service-design-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service-design-view.png" alt="source view" width="80%"></a>

4. Add the required mediators and connectors and design the integration flow.

## Update the configurations

1. Go to **MI Project Explorer** > **Other Artifacts** > **Proxy Services**.

2. Click on the proxy service you want to edit to go to its **Proxy View**.

3. Once you open the **Proxy View**, click the **Edit** icon to edit the proxy service.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-service.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-service.png" alt="Edit proxy service" width="80%"></a>

4. Update the required parameters.

5. Click **Update**.

   See the following links for the list of transport parameters you can use:

   - [VFS Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/vfs-transport-parameters)
   - [JMS Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters)
   - [FIX Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/fix-transport-parameters)
   - [MailTo Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mailto-transport-parameters)
   - [MQTT Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mqtt-transport-parameters)
   - [RabbitMQ Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/rabbitmq-transport-parameters)

   See the complete list of [service-level properties and parameters]({{base_path}}/reference/synapse-properties/proxy-service-properties) that you can configure.

## Source view

Click the **Show Source** (**</>**) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the proxy service.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show source view" width="30%"></a>

You can update the proxy service using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/source-view.png" alt="source view" width="80%"></a>

## Examples

Follow our examples on proxy services: 

- [Using a Simple Proxy Service]({{base_path}}/learn/examples/proxy-service-examples/introduction-to-proxy-services)
- [Publishing a Custom WSDL]({{base_path}}/learn/examples/proxy-service-examples/publishing-a-custom-wsdl)
- [Exposing a Proxy Service via Inbound Endpoint]({{base_path}}/learn/examples/proxy-service-examples/exposing-proxy-via-inbound)
- [Securing Proxy Services]({{base_path}}/learn/examples/proxy-service-examples/securing-proxy-services)
