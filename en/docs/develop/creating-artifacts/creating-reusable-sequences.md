# Create a Reusable Sequence

Follow these steps to create a new reusable sequence that you can add to your mediation workflow or refer to from a sequence mediator, or to create a sequence mediator and its underlying sequence all at once.

## Instructions

### Create a sequence artifact

{!includes/creating-project.md!}

3. To add a new Sequence, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Sequence** under **Other Artifacts** to open the **Sequence Form**.

7. Provide a unique name for the sequence.

8. Specify the required values for the sequence.

9. Click **Create**.

<br/>

- The sequence is created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/sequences` folder. 

- The created sequence is also available in the **Palette**, under **All Mediators** > **Generic** > **Call Sequence**, and is ready for use in other meditation workflows.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/defined-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/defined-sequence.png" alt="Sample Sequence" width="80%"></a>

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/call-defined-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/call-defined-sequence.png" alt="Call Sequence" width="80%"></a>


### Create from a sequence mediator

1. Go to the graphical view of your proxy service.

2. Click on the add (**+**) icon to open the **Palette** to access **Mediators**.

3. Select **Call Sequence**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/edit-proxy.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/edit-proxy.png" alt="Edit Proxy" width="80%"></a>

4. In the **Call Sequence** pane, select the previously created sequence from the **Referring Sequence** dropdown. Then the sequence will be linked to the integration.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/referring-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/referring-sequence.png" alt="referring sequence" width="30%"></a>

### Design the integration

1. Once you create a sequence artifact, open its **Resource View** from Go to **MI Project Explorer** > **Other Artifacts** > **Sequences**.

2. Click the **+** icon to open the **Palette**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sequence-design-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sequence-design-view.png" alt="Sequence design view" width="80%"></a>

2. Add the required integration artifacts from the **Palette** and design the integration flow.    

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sequence-graphical-editor.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sequence-graphical-editor.png" alt="Sequence graphical editor" width="80%"></a>

<!--

- To use a sequence from a different project or from the registry, you can use the Sequence Mediator:

    1. From the **Palette**, add **Call Sequence** from **Mediators** > **Generic** to the mediation flow. This will open the **Call Sequence** pane.
      
    2. Under **Referring Sequence**, select the sequence from the list of available sequences.
       
       <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/call-sequence-pane.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/call-sequence-pane.png" alt="Call sequence pane" width="40%"></a>

-->

You can also use the [**Source view**](#using-the-source-view) to update the sequence configuration.

### Use the source view

Click the **Show Source** (`</>`) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the reusable sequence.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show Source View" width="30%"></a>

You can update the sequence using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/using-source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/using-source-view.png" alt="Using Source View" width="80%"></a>

## Examples

Follow our examples on endpoint templates:

- [Breaking Complex Flows into Multiple Sequences]({{base_path}}/learn/examples/sequence-examples/using-multiple-sequences)
- [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences)
- [Reusing Sequences]({{base_path}}/learn/integration-tutorials/using-templates/)
