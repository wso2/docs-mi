# Creating a Datasource

Follow the instructions given below to create a new Datasource connection in WSO2 Integration Studio.

## Instructions

Follow the steps given below to create the datasource file:

1.  [Create a new integration project]({{base_path}}/develop/create-integration-project/#datasource-project) or select an existing one.

2. Click on the `+` beside **Data Sources** in the **Micro Integrator: Project Explorer** sidebar to create a new datasource.

    <img src="{{base_path}}/assets/img/integrate/data-services/add-datasource-from-sidebar.png", title="Add datasource", width="800", alt="Add datasource"> 

    This will open a form to create a new datasource.

3. Enter the following details:

    - **Datasource Name**: Enter a name for the datasource.
    - **Description**: Enter a description for the datasource.
    - **Datasource Type**: Select the type of the datasource. 
    - **Data source provider**: Choose between `default` and `external data source`.
    - **Database Engine**: Select the database engine for the datasource.
    - **Driver**: Select the driver for the datasource.
    - **URL**: Enter the URL for the datasource.
    - **Username**: Enter the username for the datasource.
    - **Password**: Enter the password for the datasource.
    - **JNDI Name**: Enter the JNDI name for the datasource to expose it as a JNDI datasource.  
   
    <img src="{{base_path}}/assets/img/integrate/data-services/create-datasource.png", title="Create datasource", width="800", alt="Create datasource">

4. Use the expand/collapse buttons to expand and add additional datasource configurations. 

    <img src="{{base_path}}/assets/img/integrate/data-services/additional-datasource-configurations.png", title="Add additional configs", width="800", alt="Add additional configs">

5. Click **Create** to complete the datasource creation.

A datasource file will now be created in your datasource config module. 
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
    You can generate dataservices for the created datasource. 
    For more information, you can follow the steps given in [Generate Data Services]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services/#generate-data-service-from-a-datasource).


## Examples

-	<a href="{{base_path}}/learn/examples/data-integration/carbon-data-service">Exposing a Carbon Datasource</a>
