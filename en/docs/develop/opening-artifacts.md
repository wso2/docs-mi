# Opening Artifacts

Follow the instructions given below to open an already-created integration artifact from the MI for VS Code extension.

1. Create an [integration project]({{base_path}}/develop/create-integration-project). 

    !!! note
        Hereafter, the above-mentioned integration project directory will be referred to as `<PROJECT_NAME>`, and the existing project directory from which you want to import the integration artifacts will be referred to as `<OLD_PROJECT_NAME>`.

2. Open the `<OLD_PROJECT_NAME>/src/main/wso2mi/artifacts/<ARTIFACT_TYPE>` directory.

3. Copy the respective XML file of the artifact you want to import to your new integration project.

    For example, if you want to import an API, copy the `<OLD_PROJECT_NAME>/src/main/wso2mi/artifacts/apis/<API_NAME.xml>` file

4. Open the `<PROJECT_NAME>/src/main/wso2mi/artifacts/<ARTIFACT_TYPE>` directory.

5. Paste the XML file that you have copied.

    For example, if you want to import an API, paste the copied XML file in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/apis/` directory.

6. Refresh the **Micro Integrator Project Explorer** to ensure that the files are visible in the project structure.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/refresh-project-explorer.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/refresh-project-explorer.png" alt="refresh project explorer" width="30%"></a>

!!! note

	When importing artifacts with custom mediators, make sure the custom mediator name starts with the "CUSTOM_" prefix. 

	!!! example 
		```xml
			<proxy name="example_proxy" startOnLoad="true" transports="http" xmlns="http://ws.apache.org/ns/synapse">
				<target>
					<inSequence>
						<log level="custom"/>
						<CUSTOM_mymediator>
							...
						</CUSTOM_mymediator>
						<log level="full"/>
					</inSequence>
					<faultSequence/>
				</target>
			</proxy> 
		```
		
