# Google Spreadsheet Connector Example

The Google Sheets API lets users to read and modify any aspect of a spreadsheet. The WSO2 Google Spreadsheet Connector allows you to access the Google Spreadsheet [API Version v4](https://developers.google.com/sheets/api/guides/concepts) from an integration sequence. It allows users to read/write any aspect of the spreadsheet via the spreadsheets collection. It has the ability to do spreadsheet operations and spreadsheet data operations. 

## What you'll build

This example explains how to use Google Spreadsheet Connector to create a Google spreadsheet, write data to it.

It will have three HTTP API resources, which are `/create`, `/write` and `/read`. 

* `/create `: The user sends the request payload, which includes the name of the spreadsheet. This request is sent to the integration runtime by invoking the Spreadsheet API. It creates a spreadsheet with specified title and returns the spreadsheet ID and URL.

    <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/create-sheet.png" title="Calling create operation" width="800" alt="Calling create operation"/>

* `/write `: The user sends a request payload containing the spreadsheet ID and the data to be inserted into cell A1. This request is routed to the integration runtime by invoking the Spreadsheet API, which writes the data to the specified range in the spreadsheet.

    <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/write-cell.png" title="Calling write operation" width="800" alt="Calling write operation"/>

* `/read `: The user sends a request payload containing the spreadsheet ID to the integration runtime by invoking the Spreadsheet API, which then reads data from cell A1 of the specified spreadsheet.
    <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/read-cell.png" title="Calling read operation" width="800" alt="Calling read operation"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Setup the Integration Project

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **WSO2 MI** and create the integration project with the **Project Name** as follows:

1. Open the WSO2 MI VS Code extension and click on the **Create Integration Project** icon.
  <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/create-integration-project-1.png" title="Creating a new project" width="800" alt="Creating a new project"/>

2. Give the **Project Name** as `GSheetIntegration` and click the **create** button.
  <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/create-integration-project-2.png" title="Creating a new project" width="800" alt="Creating a new project"/>


### Creating the Integration Logic for Create Operation

1. Follow these steps to [Configure Google Sheets API]({{base_path}}/reference/connectors/google-spreadsheet-connector/get-credentials-for-google-spreadsheet/) and obtain the Client Id, Client Secret, Access Token, and Refresh Token.  

2. Click on the **API** button in create an integration project pane.
  <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/create-integration-api-1.png" title="Creating a new API" width="800" alt="Creating a new API"/>

3. Then, enter the API name as `/create` and click **Create**.</br>
  <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/create-integration-api-2.png" title="Creating a new API" width="600" alt="Creating a new API"/>

4. Select the newly created `create` API and Click the **edit** icon to change the API method. Then select the **POST** method and click **OK**.
  <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/change-api-method.png" title="Changing the API method" width="800" alt="Changing the API method"/>

5. Add the Google Spreadsheet Connector to the API by clicking on the **+** button in the **Design View** and search for `Google Spreadsheet` in the **Mediator** section. Then, select the **Google Spreadsheet** connector and click **Download**.
  <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-gsheet-connector.png" title="Adding Google Spreadsheet Connector" width="800" alt="Adding Google Spreadsheet Connector"/>

#### Create Connection

1. Go to the **Design View** and click on the **+** button next to the **Connections** in the created integration project and select **Google Spreadsheet** connector.</br>
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-connection-1.png" title="Adding Google Spreadsheet Connection" width="400" alt="Adding Google Spreadsheet Connection"/>

2. Enter the connection name as `GoogleSheet` and provide the following details in the **Google Spreadsheet Connection** configuration pane.

      - **Client ID**: Value of the Client Id you obtained when you registered your application with the Google Sheets API.
      - **Client Secret**: Value of the Client Secret you obtained when you registered your application with the Google Sheets API.
      - **Refresh Token**: Value of the Refresh Token, which generates a new Access Token when the previous one gets expired.

    Note: You can obtain these values by following the steps in the [Configure Google Sheets API]({{base_path}}/reference/connectors/google-spreadsheet-connector/get-credentials-for-google-spreadsheet/) section.

<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-connection-2.png" title="Adding Google Spreadsheet Connection" width="500" alt="Adding Google Spreadsheet Connection"/>

#### Implement the API

1. First, Let's create a sample payload request to send API. Click on the **Start** node and select the **Add Request** option. This will create a new example payload request.</br>
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-sample-payload.png" title="Adding sample payload" width="800" alt="Adding sample payload"/>

2. Click on the **+** button in the **Design View** and select the `Google Spreadsheet` connector.

3. Select the `Create New Spreadsheet` operation and click **OK**.
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-operation.png" title="Adding Google Spreadsheet Operation" width="800" alt="Adding Google Spreadsheet Operation"/>

4. Now as **Connection** field, select the `GoogleSheet` connection you created earlier.

5. As the spreadsheet title, select the **Spreadsheet Title** field from the request payload. then click on the **fx** button and select **payload**.
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/config-operation-1.png" title="Configuring Google Spreadsheet Operation" width="800" alt="Configuring Google Spreadsheet Operation"/>

6. Then, select the `title` field from the response payload and click **OK**.
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/config-operation-2.png" title="Configuring Google Spreadsheet Operation" width="800" alt="Configuring Google Spreadsheet Operation"/>

7. Now we need to add a **Payload mediator** after the create operation so that we can return the response from the create operation. To add the Payload mediator and select the `Payload` mediator from the **mediator pane**.
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-payload-1.png" title="Adding Payload mediator" width="800" alt="Adding Payload mediator"/>

8. Then, create the payload as below and click **Add**.
```
  {
    {"id":"${vars.googlespreadsheet_createNewSheet_1.payload.spreadsheetId}","link":"${vars.googlespreadsheet_createNewSheet_1.payload.spreadsheetUrl}"}
  }
```
To select the `spreadsheetId` and `spreadsheetUrl` fields from the response payload, click on the **fx** button and select **payload**. Then select the `spreadsheetId` and `spreadsheetUrl` fields from the response payload and click **OK**.
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/add-payload-2.png" title="Adding Payload mediator" width="800" alt="Adding Payload mediator"/>

9. Finally, add a **Response** mediator to the API. To do this, click on the **+** button in the **Design View** and select the `Response` mediator.
After that, your integration logic should look like below.
<img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/create-integration.png" title="Integration Logic" width="800" alt="Integration Logic"/>

### Creating the Integration Logic for Write and Read Operation

1. Follow the same steps as above to create a new API with the name `/write` and `/read` respectively.

2. Go to the **Design View** and click on the **</>** button top right corner to switch to the **Code View**.

3. Copy the code below and paste it in the **Code View** in the `/write` and `/read` APIs.

??? note "Source view of the `/write` API"
    ```xml  
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/write" name="write" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <googlespreadsheet.editCellData configKey="GoogleSheet">
                    <configLevel>BASIC</configLevel>
                    <spreadsheetId>{${payload.sheetId}}</spreadsheetId>
                    <sheetName>Sheet1</sheetName>
                    <cellId>A1</cellId>
                    <value>{${payload.data}}</value>
                    <responseVariable>googlespreadsheet_editCellData_7</responseVariable>
                    <overwriteBody>false</overwriteBody>
                </googlespreadsheet.editCellData>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"results":${vars.googlespreadsheet_editCellData_7.payload}}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
    Design view of the `/write` API should look like below.
    <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/write-integration.png" title="Integration Logic" width="800" alt="Integration Logic"/>

??? note "Source view of the `/read` API"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/read" name="read" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <googlespreadsheet.getCellData configKey="GoogleSheet">
                    <configLevel >BASIC</configLevel>
                    <spreadsheetId >{${payload.sheetId}}</spreadsheetId>
                    <sheetName >Sheet1</sheetName>
                    <cellId >A1</cellId>
                    <responseVariable >googlespreadsheet_getCellData_1</responseVariable>
                    <overwriteBody >false</overwriteBody>
                </googlespreadsheet.getCellData>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"value":${vars.googlespreadsheet_getCellData_1.payload.values}}</format>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
    Design view of the `/read` API should look like below.
    <img src="{{base_path}}/assets/img/integrate/connectors/googlesheet/read-integration.png" title="Integration Logic" width="800" alt="Integration Logic"/>

## Exporting Integration Logic as a CApp
In order to export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 


## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/google-spreadsheet-connector-2.0.0.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access token and make other such changes before deploying and running this project.

## Deployment

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Testing

Invoke the SpreadsheetAPI with the following URL. You can use inbuilt HTTP client in WSO2 MI or an application such as [Postman](https://www.postman.com/) to invoke the API.

### Create sheet Operation

```
curl -X 'POST' \
  'http://localhost:8290/create/' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "title":"Sample Sheet"
}'
```

You should get a success response as below with the spreadsheet ID and URL:

```json
{
  "id": "1Vk3CJ0ZE0hhw06vZvNqFdd3hw7idqNkgqzo4rzsAI_4",
  "link": "https://docs.google.com/spreadsheets/d/1Vk3CJ0ZE0ddw06vZvNqF7F3hw7idqNkgqzo4rzsAI_4/edit"
}
```

### Write to cell Operation

```
curl -X 'POST' \
  'http://localhost:8290/write/' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "sheetId": "1fOrE1y96Qh-EVV_Uln68-fDhrKDzeVglsYWAXjMN23Y",
  "data":"Sample Record Value"
}'
```

You should get a success response as below with the updated cell value:

```json
{
  "results": {
    "spreadsheetId": "1fOrE1y96Qh-EVV_Uln68-fDhrKDzeVgWSO2WAXjMN23Y",
    "updatedRange": "Sheet1!A1",
    "updatedRows": 1,
    "updatedColumns": 1,
    "updatedCells": 1
  }
}
```

### Read to cell Operation

```
curl -X 'POST' \
  'http://localhost:8290/read/' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "sheetId": "1fOrE1y96Qh-EVV_Uln68-WSOrKDzeVglsYWAXjMN23Y"
}'
```

You should get the following response returned.

```
{
  "value": [
    [
      "Sample Record Value"
    ]
  ]
}
```

## What's Next

* To customize this example for your own scenario, see [Google Spreadsheet Connector Configuration]({{base_path}}/reference/connectors/google-spreadsheet-connector/google-spreadsheet-connector-config/) documentation for all operation details of the connector.
