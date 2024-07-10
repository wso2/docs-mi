# Creating a Reusable Sequence

Follow these steps to create a new reusable sequence that you can add to your mediation workflow or refer to from a sequence mediator, or to create a sequence mediator and its underlying sequence all at once.

## Instructions

### Creating a Sequence Artifact

{!includes/build-and-run.md!}

3. Go to **MI Project Explorer** > **Sequences**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/create-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/create-sequence.png" alt="Create Sequence" width="35%"></a>

4. Click on the **+** sign next to **Sequences** to open the below **Sequence Form**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/create-new-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/create-new-sequence.png" alt="Create New Sequence" width="80%"></a>

5. Provide a unique name for the sequence.

6. Specify the required values for the sequence.

    To save the sequence as a dynamic sequence in a registry resource project:

      1. Select the **Save the sequence in registry** check box.
      2. Type the sequence name in the **Artifact Name** field.
      3. Specify the registry type (**Governance registry (gov)** or **Configuration registry (conf)**) under **Select registry type**.
      4. Type the sequence name in the **Registry Path** field.

         <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sample-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/sample-sequence.png" alt="Sample Sequence" width="80%"></a>

7. Click **Create**.

    The sequence is created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/sequences` folder. If you opt for the **Save the sequence in registry** option in the previous step, the sequence is created in the `<PROJECT_NAME>/src/main/wso2mi/resources/` directory according to the values you specified.

    The created sequence is available in the **All Mediators** under **Generic** > **Call Sequence** and ready for use in other meditation workflows.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/defined-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/defined-sequence.png" alt="Sample Sequence" width="80%"></a>

### Create from a Sequence Mediator

1. Go to the graphical view of your proxy service.

2. Click on the add (**+**) icon to open the palette to access **All Mediators**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/edit-proxy.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/edit-proxy.png" alt="Edit Proxy" width="80%"></a>

3. From the **All Mediators**, select **Call Sequence** under the **Generic** section.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/call-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/call-sequence.png" alt="Call Sequence" width="30%"></a>

4. Select the sequence mediator you just added form **MI Overview**. Then the graphical view of the new sequence opens.

### Designing the integration

- If you create a sequence artifact from the **MI Project Explorer**, follow the steps below:

    1. Go to **MI Overview**.
    
    2. Select the sequence you created. You will see the graphical view of the sequence.
    
    3. Click on the **+** sign and add the required integration artifacts from the palette to the canvas and design the integration flow.

- To use a sequence from a different project or from the registry, you can use the Sequence Mediator:

    1. Add the **Sequence Mediator** from **All Mediators** to the mediation flow.
      
    2. When adding a sequence mediator to the integration, you will see the **Call Sequence** panel.
      
    3. Under **Referring Sequence**, select the sequence from the list of available sequences. 
   
You can also use the [**Source view**](#using-the-source-view) to update the sequence configuration.

### Using the Source View

Click the **Show Source** (`</>`) icon located in the top right corner of the VS Code to view the XML-based synapse configuration (source code) of the API.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/show-source-view.png" alt="Show Source View" width="30%"></a>

You can update the sequence using this view.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/using-source-view.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/using-source-view.png" alt="Using Source View" width="80%"></a>

## Examples

-   [Breaking Complex Flows into Multiple Sequences]({{base_path}}/learn/examples/sequence-examples/using-multiple-sequences)
-   [Using Fault Sequences]({{base_path}}/learn/examples/sequence-examples/using-fault-sequences)
-   [Reusing Sequences]({{base_path}}/learn/examples/sequence-examples/custom-sequences-with-proxy-services)
