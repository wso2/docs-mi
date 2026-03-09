# Creating a Data Source

Follow the instructions given below to create a data source artifact in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

{!includes/creating-project.md!}

3. To add a new Sequence Template, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

5. Click **Data Source** under **Other Artifacts** to open the **Data Source Creation Form**.

    This will open a form to create a new datasource.

3. Enter the following details:

    | Property Name            | Description                                                    |
    |--------------------------|----------------------------------------------------------------|
    | **Datasource Name**      | Name of the datasource                                         |
    | **Description**          | Description                                                    |
    | **Datasource Type**      | Type of the datasource                                         |
    | **Data source provider** | Choose between  `default`  and  `external data source`         |
    | **Database Engine**      | Database engine for the data source                            |
    | **Driver**               | Driver for the data source                                     |
    | **URL**                  | URL for the data source                                        |
    | **Username**             | Username for the datasource                                    |
    | **Password**             | password for the datasource                                    |
    | **JNDI Name**            | JNDI name for the datasource to expose it as a JNDI datasource |
   

4. Click **Create** to create the data source.

Shown below is the sample configuration that is created. You can now update the values in this configuration.

```xml
<datasource>
    <name>MySQLConnection</name>
    <description>MySQL Connection</description>
    <jndiConfig useDataSourceFactory="false">
        <name>MysqlConJNDI1</name>
    </jndiConfig>
    <definition type="RDBMS">
        <configuration>
            <driverClassName>com.mysql.jdbc.Driver</driverClassName>
            <url>jdbc:mysql://localhost:3306/mysqldb</url>
            <username>root</username>
            <password>root</password>
        </configuration>
    </definition>
</datasource>
```

!!!	Tip
    You can generate data services for the created datasource. 
    For more information, you can follow the steps given in [Generate Data Services]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services/#generate-data-service-from-a-datasource).


## Examples

Follow our example on data sources:

-	<a href="{{base_path}}/learn/examples/data-integration/carbon-data-service">Exposing a Carbon Datasource</a>
