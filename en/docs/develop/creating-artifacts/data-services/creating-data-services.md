# Create a Data Service

### Create the data service artifact

Follow the instructions given below to create a new data service artifact in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

{!includes/creating-project.md!}

3. To add a new data service artifact, navigate to **Micro Integrator Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Data Service** under **Other Artifacts** to open the **Data Service Form** where you can configure the data service.

7. Enter a name for the data service.

8. Specify other required properties.

<!--
9. Click **Create**.

	The data service (`.dbs`) file will be created in your integration project in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/data-services` directory.
-->

### Add a data source

You can configure the data source connection details in this step.

1.	Go to the **Service Designer** of the created data service and click on **Edit** to reopen the **Data Service Form**.  

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/add-datasource-1.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/add-datasource-1.png" width="80%"></a>

2.	Click on the **+ Add Datasource** to open the **Create Datasource** form.  

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/add-datasource-2.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/add-datasource-2.png" width="80%"></a>

3. Enter the data source connection details.

4. Click **Add** to save the data source configurations to the data service.

5. Click **Advanced Configurations** to expand the section and add the required configurations.  

The data service should now have the query element added.

### Add a resource

In this step, you can configure a REST resource to invoke the data service.

1.  Select **REST** and click on **+ Resource** to add a REST resource.
	
	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/add-resource-to-dataservice.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/add-resource-to-dataservice.png" width="80%"></a>

2. Give the following details to create the REST resource. 

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/create_resource.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/create_resource.png" width="80%"></a>  

	<table>
		<tr>
			<th>
				Parameter
			</th>
			<th>
				Description
			</th>
		</tr>
		<tr>
			<td>
				Resource Path
			</td>
			<td>
				Give the HTTP REST resource path you need to expose.
			</td>
		</tr>
		<tr>
			<td>
				Resource Method
			</td>
			<td>
				Select the REST API method from the drop-down list.
			</td>
		</tr>
	</table>
   
	Click **Add** to add the resource to the data service.

3. Go to the **Service Designer** view and click on the added resource to open the graphical view. 

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/open-resource-graphical-view.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/open-resource-graphical-view.png" width="80%"></a>  

	The graphical view will appear as shown below. You can use it to configure the main query details.  

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/resource-graphical-view.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/resource-graphical-view.png" width="80%"></a>  

### Add a SOAP operation

In this step you can configure a SOAP operation for invoking the data service.

1.  Select **SOAP** and click on **+ Operation** to add a SOAP operation.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/new-operataion.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/new-operataion.png" width="80%"></a>

2.  Give a name to the SOAP Operation, then click on **Add**.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/add-operation.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/add-operation.png" width="80%"></a>

3. Click on the added operation to open the graphical view.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/open-operation-graphical-view.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/open-operation-graphical-view.png" width="80%"></a>

	The graphical view will appear as shown below. You can use it to configure the main query details.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/soap-operation-view.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/soap-operation-view.png" width="80%"></a>  

### Create queries for REST resources and SOAP operations

You can configure the main query details for both SOAP operations and REST resources using their respective graphical views.

1.  Click on **Query** to edit the query configuration.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/edit-query.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/edit-query.png" width="80%"></a>

2. Enter the following query details.

	<table>
		<tr>
			<th>
				Parameter
			</th>
			<th>
				Description
			</th>
		</tr>
		<tr>
			<td>
				Query ID
			</td>
			<td>
				Provide a unique name to Identify the Query.
			</td>
		</tr>
		<tr>
			<td>
				Datasource
			</td>
			<td>
			   All the data sources created for this data service are listed. Select the required data source from the list.
			</td>
		</tr>
		<tr>
			<td>
				Query / Expression
			</td>
			<td>
				You can enter the SQL query in this text box.
			</td>
		</tr>
	</table>

	Provide the required parameter values in the **Advanced Properties** section.

#### Input mapping

You can configure input parameters for the query using this section.

1.  Click on the **Input Mapping** from the graphical view to edit the section.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/edit-input-mapping.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/edit-input-mapping.png" width="80%"></a>  

2.	There are two  ways to create the mapping:

	- You can use the default configurations to automatically generate the input mappings from the SQL query.
    - If you want to add a new input mapping:
    

    	1. Click **+ Add Parameter**.  

			<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/add-input-mapping-params.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/add-input-mapping-params.png" width="80%"></a>

       	2. Enter the following input mapping details:

			<table>
				<tr>
					<th>
						Parameter
					</th>
					<th>
						Description
					</th>
				</tr>
				<tr>
					<td>
						<b>Mapping Name</b>
					</td>
					<td>
						Enter a name for the mapping.
					</td>
				</tr>
				<tr>
					<td>
						<b>Query Parameter</b>
					</td>
					<td>
						Enter the query parameter.
					</td>
				</tr>
				<tr>
					<td>
						<b>Parameter Type</b>
					</td>
					<td>
						The parameter type
					</td>
				</tr>
				<tr>
					<td>
						<b>SQL Type</b>
					</td>
					<td>
						The SQL type
					</td>
				</tr>
			</table>  

		3.	Save the input mapping. You can add multiple input mappings as required.  

	Shown below is an example query with input mapping:

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/input_mappings.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/input_mappings.png" width="80%"></a>

#### Result (output mappings)

You can configure output result parameters for the query using this section.

1.  Click **Output Mapping** from the graphical view to edit the output mapping configurations.

	<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/out_mapping_expanded.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/out_mapping_expanded.png" width="80%"></a>

2. There are two ways to create the output mapping:

	- You can use the default configurations to automatically generate the output mappings from the SQL query. 
	- Alternatively, you can manually add the mappings:

      	1. Click **+ Add Parameter**.

	
			<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/add_output_mappings.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/add_output_mappings.png" width="80%"></a>

      	2. Enter the following output element details.


             <table>
                 <tr>
                     <th>Property</th>
                     <th>Value</th>
                 </tr>
                 <tbody>
                 <tr class="odd">
                     <td>Datasource Type</td>
                     <td>column</td>
                 </tr>
                 <tr class="even">
                     <td>Output Field Name</td>
                     <td>EmployeeNumber</td>
                 </tr>
                 <tr class="odd">
                     <td>Datasource Column Name</td>
                     <td>EmployeeNumber</td>
                 </tr>
                 <tr class="even">
                     <td>Schema Type</td>
                     <td>String</td>
                 </tr>
                 </tbody>
             </table>


		Follow the same steps to create the remaining output elements.

		Shown below is an example query with output mappings:

		<a href="{{base_path}}/assets/img/integrate/tutorials/data_services/output_mapings.png"><img src="{{base_path}}/assets/img/integrate/tutorials/data_services/output_mapings.png" width="80%"></a>

## Tutorials

Follow our tutorial on data services:

- [How to Expose a Datasource as a Service]({{base_path}}/learn/integration-tutorials/sending-a-simple-message-to-a-datasource)

## Examples 

Follow our examples on data services:

<ul>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/rdbms-data-service">Exposing an RDBMS Datasource</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/json-with-data-service">Exposing Data in JSON Format</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/odata-service">Using an OData Service</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/nested-queries-in-data-service">Using Nested Data Queries</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/batch-requesting">Batch Requesting</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/request-box">Invoking Multiple Operations via Request Box</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/distributed-trans-data-service">Using Distributed Transactions in Data Services</a>
	</li>
	<li>
		<a href="{{base_path}}/learn/examples/data-integration/data-input-validator">Validating Data Input</a>
	</li>
</ul>

## Samples

You can use a sample template to create your data service.

1.	Go to **Explore Samples** in MI for VS Code. 
2.	In the **Samples** tab, go to the **REST Data Service** and click on **Download**. This will download the project to your chosen directory and open it in a new VS Code window.

For more information