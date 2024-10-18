# Create a custom inbound endpoint

WSO2 Micro Integrator supports several inbound endpoints. However, there can be scenarios that require functionality not provided by the existing inbound endpoints. For example, you might need an inbound endpoint to connect to a certain back-end server or vendor specific protocol.

To support such scenarios, you can write your own custom inbound endpoint by extending the behavior for **Listening**, **Polling**, and **Event-Based** inbound endpoints.

## Instructions

### Step 1: Develop the custom inbound endpoint

- To create a **custom listening inbound endpoint**, download the maven artifact used in the [sample custom listening inbound endpoint configuration](https://github.com/wso2-docs/ESB/tree/master/ESB-Artifacts/inbound/custom_inbound_listening) configuration.

- To create a **custom polling inbound endpoint**, download the maven artifact used in the [sample custom polling inbound endpoint configuration](https://github.com/wso2-docs/ESB/tree/master/ESB-Artifacts/inbound/custom_inbound).

- To create a **custom event-based inbound endpoint**, download the maven artifact used in the [sample custom event-based inbound endpoint configuration](https://github.com/wso2-docs/ESB/tree/master/ESB-Artifacts/inbound/custom_inbound_waiting).

### Step 2: Deploy the custom inbound endpoint

You need to copy the built jar file to the `MI_HOME/lib` directory and restart the Micro Integrator to load the class.
To add the jar file via your integration project, copy it to the <b>lib</b> directory under the <b>deployment</b> directory in the **Explorer** view of the VSCode or add the maven dependency of the jar file to the <b>pom.xml</b> file of the project.

### Step 3: Add the custom inbound endpoint

1. If you have already created an [Integration Project]({{base_path}}/develop/create-integration-project), click the `+` button in the **Inbound Endpoints** section of the **Micro Integrator: Project Explorer** and select **Custom**. This will open a form.
2. Give a unique name to the inbound endpoint and update the rest of the properties with the required details as follows:
	<table>
   		<thead>
	  		<tr>
		 		<th>
					<p>Property Name</p>
		 		</th>
		 		<th>
					<p>Description</p>
		 		</th>
	  		</tr>
   		</thead>
   		<tbody>
	  		<tr>
		 		<td>
				  Sequence
				 </td>
				 <td>Name of the sequence message that should be injected. Select the appropriate sequence from the drop-down menu. If you have not created sequences for your project yet, please create them first.</td>
			 </tr>
			 <tr>
				 <td>
				  onError
				 </td>
				 <td>Name of the fault sequence that should be invoked in case of failure. Select the appropriate error sequence from the drop-down menu.</td>
			 </tr>
			 <tr>
				 <td>
				  class
				 </td>
				 <td>
				  Name of the custom class you implemented in <a href="#step-1-developing-a-custom-inbound-endpoint">step 1</a>.
				 </td>
			  </tr>
			  <tr>
				 <td>
				  inbound.behavior
				 </td>
				 <td>
				  Specify whether your custom endpoint is <code>listening</code>, <code>polling</code>, or <code>event-based</code>.
				 </td>
			  </tr>
		   </tbody>
		</table>  
3. Add any required parameters by clicking the **Add Parameter** button. Depending on the type of inbound endpoint (e.g., Kafka, HTTP), you may need to add additional parameters specific to the protocol or technology you are integrating with. 
4. Click **Create** to add the custom inbound endpoint to the project.
