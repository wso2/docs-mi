# Create an Endpoint Template

Follow the instructions below to create a new Endpoint Template in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the endpoint template artifact

{!includes/creating-project.md!}

3. To add a new Endpoint Template, navigate to **MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Template** under **Other Artifacts** to open the **Template Form**.

7. This will open the **Template Form** shown below, where you can select the **Template Artifact**. Select an endpoint template type.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/template-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/template-form.png" alt="Template form" width="80%"></a>

    !!! note
        There are four Endpoint Templates available: 
    
        - **Address Endpoint Template**
        - **Default Endpoint Template**
        - **HTTP Endpoint Template**
        - **WSDL Endpoint Template**

    This will open the respective **Endpoint Form**.

8. Enter a unique name for the template.

9. Specify values for the [required parameters]({{base_path}}/reference/synapse-properties/template-properties/#endpoint-template-properties) for the selected endpoint type.

10. Also, update the endpoint parameter values with placeholders prefixed by `$`.

11. Click **Create**.

    The template endpoint artifact is created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/templates` folder under the project you created.

### Design the integration

Follow the steps below to add the already-created endpoint template to your mediation sequence.

1. Go to **MI Project Explorer**.

2. Click on the **+** icon to open the **Add Artifact** pane.

3. Click **+ View More** under **Create an Integration**.

4. Click **Endpoint** under **Other Artifacts** to open the **Endpoint Form**.

5. Click **+ View More**.

3. Select **Template Endpoint** from the set of available endpoints on the **Endpoint Form**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/endpoint-form.png" alt="Endpoint form" width="80%"></a>

4. In the **Template Endpoint Form**, specify the values for the required properties.

5. From the **Template** dropdown, select the endpoint template you created [earlier](#create-the-endpoint-template-artifact).

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/created-endpoint-template.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint-template/created-endpoint-template.png" alt="created endpoint template" width="80%"></a>

6. Click **Create**.

    Endpoints cannot be added directly to the integration sequence. Instead, they must be invoked using the [Send Mediator]({{base_path}}/reference/mediators/send-mediator) or the [Call Mediator]({{base_path}}/reference/mediators/call-mediator).

    Therefore, to add an endpoint artifact to the integration sequence, use the Send Mediator or the Call Mediator.

1.	Open the **Design View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).
2.  Add the **Call Endpoint** mediator from the palette under **All Mediators** > **Generic** section to the relevant position in the mediation sequence:

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/select-call-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/select-call-endpoint.png" alt="Select call endpoint" width="80%"></a>

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

## Examples

Follow our examples on endpoint templates:

- [Using Endpoint Templates]({{base_path}}/learn/examples/template-examples/using-endpoint-templates)
