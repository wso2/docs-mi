# Create an Endpoint

Follow the instructions below to create a new [Endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties) artifact in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the endpoint artifact

{!includes/creating-project.md!}

3. Go to **MI Project Explorer** > **Endpoints**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png" alt="Create endpoint" width="30%"></a>

4. Hover over **Endpoints** and click the **+** icon that appears to open the **Endpoint Form** below.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png" alt="Add endpoint" width="30%"></a>

5. Select the endpoint type you want from the **Endpoint Form**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-form.png" alt="Endpoint form" width="80%"></a>

6. Enter a unique name for the endpoint.

7. Specify values for the [required parameters]({{base_path}}/reference/synapse-properties/endpoint-properties) for the selected endpoint type.

8. Click **Create** to save the endpoint configuration.

The endpoint will be created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/endpoints` folder under the integration project you created.

### Design the integration

!!! note
    Endpoints cannot be added directly to the integration sequence. Instead, they must be invoked using the [Send Mediator]({{base_path}}/reference/mediators/send-mediator) or the [Call Mediator]({{base_path}}/reference/mediators/call-mediator).

    Therefore, to add an endpoint artifact to the integration sequence, use the Send Mediator or the Call Mediator.

1.	Open the **Design View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).
2.  Add the **Call Endpoint** mediator from the palette under **All Mediators** > **Generic** section to the relevant position in the mediation sequence:

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/select-call-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/select-call-endpoint.png" alt="Select call endpoint" width="30%"></a>

    !!! Tip
        Similarly, you can use the Send Mediator instead of the Call Mediator.

3. In the **Call Endpoint** form, select the endpoint you need to invoke under **Select Endpoint**. You can also select **Create New** to create a new endpoint artifact.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/call-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/call-endpoint.png" alt="Call endpoint" width="30%"></a>

The endpoint artifact is now linked to your integration sequence.

### Update the properties

1. Go to **MI Project Explorer**.

2. Select the endpoint artifact available under `<PROJECT_NAME>/Endpoints/`. 

You can use the **Form** view or the **Source** view to update endpoint properties.

#### To update from the Form View:

1. Go to **MI Overview**.
2. Under the **Endpoints** available, select the endpoint that you need to update the properties. The **Endpoint Form** will be opened.
3. Update the properties.
4. Click **Save Changes**.

#### To update from the Source View:

1. Go to **MI Overview**.
2. Under the **Endpoints** available, select the endpoint you want.
3. Click on the **Show Source** (**<b>&lt;/&gt;</b>**) icon located in the top right corner of the VS Code. 

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/show-source.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/show-source.png" alt="Show source" width="50%"></a>

    This will open the source view of the endpoint artifact.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-source-view.png" alt="Endpoint source view" width="50%"></a>

To learn more about all available endpoint properties, see the [endpoint properties]({{base_path}}/reference/synapse-properties/endpoint-properties) documentation.

!!! abstract "Learn more about reusable sequences"

    Follow our examples on endpoints:

    - [Using Address Endpoints]({{base_path}}/learn/examples/endpoint-examples/using-address-endpoints)
    - [Using Failover Endpoints]({{base_path}}/learn/examples/endpoint-examples/using-failover-endpoints)
    - [Using HTTP Endpoints]({{base_path}}/learn/examples/endpoint-examples/using-http-endpoints)
    - [Using a Websocket Endpoint]({{base_path}}/learn/examples/endpoint-examples/using-websocket-endpoints)
    - [Using WSDL Endpoints]({{base_path}}/learn/examples/endpoint-examples/using-wsdl-endpoints)
    - [Using Load Balancing Endpoints]({{base_path}}/learn/examples/endpoint-examples/using-loadbalancing-endpoints)
