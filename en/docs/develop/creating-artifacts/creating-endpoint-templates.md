# Create an Endpoint Template

Follow the instructions below to create a new Endpoint Template in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the endpoint template artifact

{!includes/creating-project.md!}

3. Go to **Micro Integrator Project Explorer** > **Templates**. 

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/create-new-template.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/create-new-template.png" alt="Create endpoint template" width="30%"></a>

4. Hover over **Templates** and click the **+** icon that appears to open the **Template Form** below.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-template.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-template.png" alt="Add-template" width="30%"></a>

5. This will open the **Template Form** shown below, where you can select the **Template Artifact**. Select the endpoint template type.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/template-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/template-form.png" alt="Template form" width="80%"></a>

    !!! note
        There are four Endpoint Templates available: 
    
        - **Address Endpoint Template**
        - **Default Endpoint Template**
        - **HTTP Endpoint Template**
        - **WSDL Endpoint Template**

    This will open the respective **Endpoint Form**.

6. Enter a unique name for the template.

7. Specify values for the [required parameters]({{base_path}}/reference/synapse-properties/template-properties/#endpoint-template-properties) for the selected endpoint type.

8. Also, update the endpoint parameter values with placeholders prefixed by `$`.

9. Click **Create**.

    The template endpoint artifact is created in the `src/main/wso2mi/artifacts/templates` folder under the project you created.

### Design the integration

Follow the steps below to add the already-created endpoint template to your mediation sequence.

1. Go to **MI Project Explorer** > **Endpoints**.

2. Hover over **Endpoints** and click the **+** icon that appears to open the below **Endpoint Form**.

3. Select **Template Endpoint** from the set of available endpoints on the **Endpoint Form**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-form.png" alt="Endpoint form" width="80%"></a>

4. In the **Template Endpoint Form**, specify the values for the required properties.

5. From the **Template** dropdown, select the endpoint template you created in a [previous step](#create-the-endpoint-template-artifact).

6. Click **Create**.

    Endpoints cannot be added directly to the integration sequence. Instead, they must be invoked using the [Send Mediator]({{base_path}}/reference/mediators/send-mediator) or the [Call Mediator]({{base_path}}/reference/mediators/call-mediator).

    Therefore, to add an endpoint artifact to the integration sequence, use the Send Mediator or the Call Mediator.

1.	Open the **Design View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).
2.  Add the **Call Endpoint** mediator from the palette under **All Mediators** > **Generic** section to the relevant position in the mediation sequence:

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/select-call-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/select-call-endpoint.png" alt="Select call endpoint" width="30%"></a>

    !!! Tip
        Similarly, you can use the Send Mediator instead of the Call Mediator.

3. In the **Call Endpoint** form, select the endpoint you need to invoke under **Select Endpoint**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/call-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/call-endpoint.png" alt="Call endpoint" width="30%"></a>

The endpoint template artifact is now linked to your integration sequence.

### Update properties

You can update the properties you specified for the endpoint template later.

1. From **MI Project Explorer**, select the endpoint template available under the available endpoint templates.

3. Update the properties from the **Template Artifact** form.

4. Click **Save Changes**.

!!! abstract "Learn more about endpoint templates"

    Follow our examples on endpoint templates:

    - [Using Endpoint Templates]({{base_path}}/learn/examples/template-examples/using-endpoint-templates)
