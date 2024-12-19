# Create a Proxy Service

Follow these instructions to create a [Proxy Service]({{base_path}}/reference/synapse-properties/proxy-service-properties) artifact in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Create a new proxy service artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. Go to **MI Project Explorer** > **Proxy Services**.

4. Hover over **Proxy Services** and click the **+** icon that appears to open the **Proxy Service Form** below.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service.png" alt="proxy service" width="80%"></a>

5. Enter a unique name for the proxy service.

6. Once you complete the **Proxy Service Form**, click **Create**.

!!! info
    You can switch to the default Visual Studio Code **Explorer** to view the folder structure.

    The newly-created proxy service will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/proxy-services` folder of your integration project.

## Design the integration

1. Go to the **MI Overview** interface.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/mi-overview.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/mi-overview.png" alt="MI overview" width="80%"></a>

2. Click on the proxy service you created to go to its **Resource View**.

    The default **Resource View** will be as follows:
   
    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service-design-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service-design-view.png" alt="source view" width="80%"></a>

3. Add the required mediators and connectors and design the integration flow.

## Update the configurations

1. Go to **MI Overview**.

2. Under **Proxy Services**, select the proxy service you want to edit to go to its **Resource View**.

3. Click the **Edit** icon to edit the proxy service.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-service.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-service.png" alt="Edit proxy service" width="80%"></a>

4. Add the required parameters.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-view.png" alt="Edit proxy view" width="80%"></a>

5. Click **Update**.

   See the following links for the list of transport parameters you can use:

   - [VFS Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/vfs-transport-parameters)
   - [JMS Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters)
   - [FIX Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/fix-transport-parameters)
   - [MailTo Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mailto-transport-parameters)
   - [MQTT Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mqtt-transport-parameters)
   - [RabbitMQ Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/rabbitmq-transport-parameters)

   See the complete list of [service-level properties and parameters]({{base_path}}/reference/synapse-properties/proxy-service-properties) that you can configure.

## Source View

Click the **Show Source** (`</>`) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the proxy service.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show source view" width="30%"></a>

You can update the proxy service using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/source-view.png" alt="source view" width="80%"></a>

!!! abstract "Learn more about proxy services"

    Follow our examples on proxy services: 

    - [Using a Simple Proxy Service]({{base_path}}/learn/examples/proxy-service-examples/introduction-to-proxy-services)
    - [Publishing a Custom WSDL]({{base_path}}/learn/examples/proxy-service-examples/publishing-a-custom-wsdl)
    - [Exposing a Proxy Service via Inbound Endpoint]({{base_path}}/learn/examples/proxy-service-examples/exposing-proxy-via-inbound)
    - [Securing Proxy Services]({{base_path}}/learn/examples/proxy-service-examples/securing-proxy-services)
