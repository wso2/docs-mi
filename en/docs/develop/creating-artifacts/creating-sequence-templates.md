# Create a Sequence Template

Follow the instructions below to create a new Sequence Template in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the sequence template artifact

{!includes/creating-project.md!}

3. To add a new Sequence Template, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Template** under **Other Artifacts** to open the **Template Form**.

7. In the **Template Form**, select **Sequence Template**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-form.png" alt="Create sequence template" width="80%"></a>

8. Enter a unique name for the template.

9. Specify the vales for the [required parameters]({{base_path}}/reference/synapse-properties/template-properties/#sequence-template-properties) in the sequence template.

10. Click **Create**.

    The template is created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/templates` folder under the integration project you created.

### Update properties

1. Go to **MI Project Explorer** > **Other Artifacts** > **Templates**, and select the sequence template to open the **Resource View** of the sequence template you created.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-view.png" alt="Sequence template view" width="80%"></a>

2.  Click the edit icon to edit the sequence template.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/edit-sequence-template.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/edit-sequence-template.png" alt="edit sequence template" width="80%"></a>

### Design the integration

When you have a Sequence template defined, you can use a Call Template Mediator in your [mediation sequence]({{base_path}}/reference/mediation-sequences).

1.  Open the **Resource View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).

2.  Add the **Call Template Mediator** from the **Palette** under **Mediators** > **Generic** to the relevant position in the mediation sequence.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-resource-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-resource-view.png" alt="Sequence template resource view" width="70%"></a>

3.  In the **Call Template** pane, select the previously-created sequence template from the **Target Template** dropdown.

4.  Add required values using the **Call-Template Parameters**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/call-template-pane.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/call-template-pane.png" alt="Call template pane" width="30%"></a>

## Examples

Follow our examples on sequence templates:

- [Using Sequence Templates]({{base_path}}/learn/examples/template-examples/using-sequence-templates)
