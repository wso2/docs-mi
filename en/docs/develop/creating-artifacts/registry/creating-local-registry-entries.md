# Create a Local Registry Entry

The **local registry** acts as a memory registry where you can store static content as a key-value pair. This could be a static text specified as **inline text**, static XML specified as an **inline XML** fragment, or a **URL** (using the `src` attribute).

=== "Inline text"
    ```xml
    <localEntry key="version" xmlns="http://ws.apache.org/ns/synapse">0.1</localEntry>
    ```
=== "Inline XML"     
    ```xml 
    <localEntry key="validate_schema" xmlns="http://ws.apache.org/ns/synapse">
        <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" ...
        </xs:schema>
    </localEntry>
    ```
=== "Source URL"     
    ```xml 
    <localEntry key="xslt-key-req" src="file:repository/samples/resources/transform/transform.xslt" xmlns="http://ws.apache.org/ns/synapse"/>
    ```

This is useful for the type of static content often found in XSLT files, WSDL files, URLs, etc. Local entries can be referenced from mediators in the WSO2 Integrator: MI mediation flows and resolved at runtime. These entries are top-level entries and are globally visible within the entire system. Values of these entries can be retrieved via the extension XPath function `synapse:${properties.prop-name}`, and the keys of these entries could be specified wherever a registry key is expected within the configuration. A local entry shadows any entry with the same name from a remote Registry.

Follow these steps to create a local entry artifact.

{!includes/creating-project.md!}

3. To add a new local entry, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

5. Click **Local Entry** under **Other Artifacts** to open the **Local Entry Form**.

2. Select one of the following types of local entries.

    <img src="{{base_path}}/assets/img/integrate/create_artifacts/new_local_entry/local-entry-types.png" width="800">

    -   **In-Line Text Entry**: Type the text you want to store
    -   **In-Line XML Entry**: Type the XML code you want to store
    -   **Source URL Entry**: Type or browse to the URL you want to store

3. Enter a unique name for the local entry and specify the values.

5. Click **Create**.

The Local Entry will be saved in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/local-entries` directory.

### Update the properties

Open the created local entry artifact from the **MI Project Explorer**. You can use the **Form** view or the **Source** view to update Local Entry properties.

### Use a local entry

After you create a local entry, you can reference it from a mediator in your mediation workflow. For example, if you created a local entry with XSLT code, you can add an XSLT mediator to the workflow and then reference the local entry as follows:

1.  Open to the **Design View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).
2.  Add an [XSLT Mediator]({{base_path}}/reference/mediators/xslt-mediator) to the mediation flow as shown below.

    <img src="{{base_path}}/assets/img/integrate/create_artifacts/new_local_entry/local-entry-add-xslt.png" width="800">

    It will open up the **Properties** tab. 

3. Select the **XSLT Static Schema Key** and enter other properties. 

4. Click **Submit**.

!!! Info
    If you want to add local entries before deploying the server, you can add them to the top-level bootstrap file `synapse.xml`, or separate XML files in the `local-entries` directory, which are located under `<MI_HOME>\repository\deployment\server\synapse-configs\default`. When the server is started, these configurations will be added to the registry.

## Examples

Follow our examples on local entries:

- [Sequences and Endpoints as Local Registry Entries]({{base_path}}/learn/examples/registry-examples/local-registry-entries)
