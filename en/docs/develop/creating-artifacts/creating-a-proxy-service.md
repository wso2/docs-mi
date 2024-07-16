# Creating a Proxy Service

Follow the instructions given below to create a new [Proxy Service]({{base_path}}/reference/synapse-properties/proxy-service-properties) artifact in WSO2 Integration Studio.

## Instructions

### Creating the Proxy Service artifact

{!includes/creating-project.md!}

3. Go to **MI Project Explorer** > **Proxy Services**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/create-proxy-service.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/create-proxy-service.png" alt="Create proxy service" width="30%"></a>

4. Click on the **+** sign next to **Proxy Services** to open the proxy service creation form.

5.  Enter a unique name for the proxy service.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/proxy-service.png" alt="proxy service" width="80%"></a>

6. Click **Create**.
   
The proxy service is created in the `src/main/wso2mi/artifacts/proxy-services` folder under the project you specified.

### Designing the integration

1. Go to the **MI Overview** interface. 

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/mi-overview.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/mi-overview.png" alt="MI overview" width="80%"></a>

2. Click on the proxy service you created to go to the **Resource View**.

3. Add the required mediators and connectors and design the integration flow.

You can also use the [**Source View**](#using-the-source-view) or the [**Swagger View**](#using-the-swagger-editor) to update the proxy service configuration.

### Updating the properties

1. Go to the **Graphical View** of the proxy service.

2. Click the **Edit** icon to edit the proxy service.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-service.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-service.png" alt="Edit proxy service" width="80%"></a>

3. Add the required parameters.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/edit-proxy-view.png" alt="Edit proxy view" width="80%"></a>

4. Click **Update**.

    See the following links for the list of transport parameters you can use:
    
      - [VFS Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/vfs-transport-parameters)
      - [JMS Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters)
      - [FIX Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/fix-transport-parameters)
      - [MailTo Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mailto-transport-parameters)
      - [MQTT Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mqtt-transport-parameters)
      - [RabbitMQ Parameters]({{base_path}}/reference/synapse-properties/transport-parameters/rabbitmq-transport-parameters)
    
    See the complete list of [service-level properties and parameters]({{base_path}}/reference/synapse-properties/proxy-service-properties) that you can configure.

### Using the Source View

Click the **Show Source** (`</>`) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the proxy service.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show source view" width="30%"></a>

You can update the proxy service using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-proxy-service/source-view.png" alt="source view" width="80%"></a>

## Examples

-   [Using a Simple Proxy Service]({{base_path}}/learn/examples/proxy-service-examples/introduction-to-proxy-services)
-   [Publishing a Custom WSDL]({{base_path}}/learn/examples/proxy-service-examples/publishing-a-custom-wsdl)
-   [Exposing a Proxy Service via Inbound Endpoint]({{base_path}}/learn/examples/proxy-service-examples/exposing-proxy-via-inbound)
-   [Securing Proxy Services]({{base_path}}/learn/examples/proxy-service-examples/securing-proxy-services)
