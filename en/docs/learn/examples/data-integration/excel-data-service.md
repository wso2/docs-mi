# How to Expose an Excel Datasource

This example demonstrates how an Excel sheet can be exposed as a data service.

## Prerequisites

[Download](https://github.com/wso2-docs/WSO2_EI/blob/master/data-service-resources/Products.xls) the `Products.xls` file.

This file contains data about products (cars/motorcycles) that are manufactured in an automobile company. The data table has the following columns: `ID`, `Model`, and `Classification`.

!!! Note
    WSO2 Integrator: MI uses the Apache POI library to work with Excel datasources and supports both **XLS** and **XLSX** formats. By default, MI includes the lightweight **poi-ooxml** dependency, which is sufficient for basic Excel processing. However, if your Excel files use advanced schemas that are not supported by the default library, you may need to manually add the **poi-ooxml-full** JAR to the `MI_HOME/lib` directory.

## Synapse configuration
Given below is the data service configuration you need to build. See the instructions on how to [build and run](#build-and-run) this example.

**Be sure** to update the Excel datasource path.

```xml
<data name="ExcelDataService" serviceNamespace="http://ws.wso2.org/dataservice/samples/excel_sample_service">
   <config id="default">
      <property name="excel_datasource">/path/to/excel/Products.xls</property>
   </config>
   <query id="getProductsQuery" useConfig="default">
      <excel>
         <workbookname>Sheet1</workbookname>
         <hasheader>true</hasheader>
         <startingrow>2</startingrow>
         <maxrowcount>-1</maxrowcount>
         <headerrow>1</headerrow>
      </excel>
      <result defaultNamespace="http://ws.wso2.org/dataservice/samples/excel_sample_service/getProducts" element="Products" rowName="Product">
         <element column="ID" name="ID"/>
         <element column="Model" name="Model"/>
         <element column="Classification" name="Classification"/>
      </result>
   </query>
   <operation name="getProducts">
      <call-query href="getProductsQuery"/>
   </operation>
</data>
```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}

2. [Create the data service]({{base_path}}/develop/creating-artifacts/data-services/creating-data-services) with the configurations given above.
   **Be sure** to update the Excel datasource path.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI. 

You can send an HTTP GET request to invoke the data service using cURL
as shown below.

```bash
curl -X GET http://localhost:8290/services/ExcelDataService/getProducts
```

This will return the response in XML.

Example:

```xml
<Products
	xmlns="http://ws.wso2.org/dataservice/samples/excel_sample_service/getProducts">
	<Product>
		<ID>S10_1678</ID>
		<Model>1969 Harley Davidson Ultimate Chopper</Model>
		<Classification>Motorcycles</Classification>
	</Product>
	<Product>
		<ID>S10_1949</ID>
		<Model>1952 Alpine Renault 1300</Model>
		<Classification>Classic Cars</Classification>
	</Product>
	<Product>
		<ID>S10_2016</ID>
		<Model>1996 Moto Guzzi 1100i</Model>
		<Classification>Motorcycles</Classification>
	</Product>
	<Product>
		<ID>S10_4698</ID>
		<Model>2003 Harley-Davidson Eagle Drag Bike</Model>
		<Classification>Motorcycles</Classification>
	</Product>
	<Product>
		<ID>S10_4757</ID>
		<Model>1972 Alfa Romeo GTA</Model>
		<Classification>Classic Cars</Classification>
	</Product>
	<Product>
		<ID>S10_4962</ID>
		<Model>1962 LanciaA Delta 16V</Model>
		<Classification>Classic Cars</Classification>
	</Product>
	<Product>
		<ID>S12_1099</ID>
		<Model>1968 Ford Mustang</Model>
		<Classification>Classic Cars</Classification>
	</Product>
	<Product>
		<ID>S12_1108</ID>
		<Model>2001 Ferrari Enzo</Model>
		<Classification>Classic Cars</Classification>
	</Product>
</Products>
```
