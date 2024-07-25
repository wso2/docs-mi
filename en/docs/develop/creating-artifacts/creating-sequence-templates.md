# Create a Sequence Template

Follow the instructions below to create a new Sequence Template in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the Sequence Template artifact

{!includes/creating-project.md!}

3. Go to **Micro Integrator Project Explorer** > **Templates**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/create-sequence-template.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/create-sequence-template.png" alt="Create sequence template" width="30%"></a>

4. Hover over **Templates** and click the **+** icon that appears to open the **Template Form** below.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-template.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-template.png" alt="Add API" width="30%"></a>

5. In the **Template Form**, select **Sequence Template**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-form.png" alt="Create sequence template" width="80%"></a>

6. Enter a unique name for the template.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/template-artifact.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/template-artifact.png" alt="Template artifact" width="80%"></a>

7. Specify the vales for the [required parameters]({{base_path}}/reference/synapse-properties/template-properties/#sequence-template-properties) in the sequence template.

8. Click **Create**.

    The template is created in the `/src/main/wso2mi/artifacts/templates` folder under the integration project you created.

### Update properties

1.	Open the **Resource View** of the sequence template you created.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-view.png" alt="Sequence template view" width="50%"></a>

2.  Add the required mediators from the **Palette**.

3.  Specify parameter values as an XPATH.

    In the following example, the `GREETING_MESSAGE` property of the **Log** mediator is specified using the `$func:message` expression.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-design-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-design-view.png" alt="Sequence template design view" width="60%"></a>

### Design the integration

When you have a Sequence template defined, you can use a Call Template Mediator in your [mediation sequence]({{base_path}}/reference/mediation-sequences).

1.  Open the **Resource View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).

2.  Add the **Call Template Mediator** from the **Palette** under **Mediators** > **Generic** to the relevant position in the mediation sequence.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-resource-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/sequence-template-resource-view.png" alt="Sequence template resource view" width="70%"></a>

3.  In the **Call Template** pane, select the previously-created sequence template from the **Target Template** dropdown.

4.  Add required values using the **Call-Template Parameters**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/call-template-pane.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-sequence-template/call-template-pane.png" alt="Call template pane" width="30%"></a>

!!! abstract "Learn more about sequence templates"

    Follow our examples on sequence templates:

    - [Using Sequence Templates]({{base_path}}/learn/examples/template-examples/using-sequence-templates)
