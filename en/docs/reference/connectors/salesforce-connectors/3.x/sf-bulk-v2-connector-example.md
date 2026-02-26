# Salesforce Bulk v2.0 Connector Example

The **Salesforce Connector** provides seamless integration with the [Salesforce Bulk v2.0 REST API](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm), enabling easy and efficient handling of large volumes of data. The SalesforceBulk API operates on a RESTful architecture, offering a fast and reliable method to load or delete vast amounts of data from your organization's Salesforce account. With SalesforceBulk, you can perform asynchronous operations like querying, inserting, updating, upserting, or deleting a considerable number of records by submitting them in batches. These batches can be processed by Salesforce in the background, ensuring minimal disruption to your workflow.

## What you'll build

The following example demonstrates how to use the Salesforce Bulk v2.0 Connector for performing various operations on your Salesforce data:

1. Insert account records from a file to the salesforce.
2. Get the created bulk job information.
3. Get the successfully processed records.

You can use the following resources to achieve your requirements.

1. `/createJobAndUploadFile` :
    - Create a new bulk ingest job for insert operation.
    - Read a CSV file using [File Connector]({{base_path}}/reference/connectors/file-connector/file-connector-overview/).
    - Upload the CSV content read from the file.
    - Close the job to denote that the upload is completed.
2. `/getJobInfo` :
    - Get the bulkJob info identified by the jobId passed through the request body.
3. `/getSuccessfulResults` :
    - Retrieve the successful results of the bulk job identified by the `jobId`.

## Set up the environment

By default, the `text/csv` message formatter and message builder are not configured in the WSO2 Integrator: MI settings. To enable this connector to function correctly with `text/csv` data, you will need to follow these steps to add the necessary message formatter and message builder configurations.

Consider the root of the WSO2 Integrator: MI/ Enterprise Integrator as `<PRODUCT_HOME>`.

If you are using the **WSO2 Integrator: MI 4.4.0** or above, you need to add the following message builder to **`<PRODUCT_HOME>`/conf/deployment.toml** file. For more information, refer to the [Working with Message Builders and Formatters]({{base_path}}/install-and-setup/setup/message-builders-formatters/message-builders-and-formatters) and [Product Configurations]({{base_path}}/reference/config-catalog-mi/) documentation.

```toml
[[custom_message_formatters]]
class = "org.apache.axis2.format.PlainTextFormatter"
content_type = "text/csv"

[[custom_message_builders]]
class="org.apache.axis2.format.PlainTextBuilder"
content_type = "text/csv"
```

Save the files and restart the WSO2 Integrator: MI.

## Set up the integration project

Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project.

### Add integration logic

First, create a REST API called `Salesforce` in your project.

| Name | Context |
| ---------------- | ---------------- |
| Salesforce  | /salesforce  |

Create the following resources in 'Salesforce' REST API

| uri-template | method|
| ---------------- | ------|
| /createJobAndUploadFile | GET, POST |
| /getJobInfo  | POST |
| /getSuccessfulResults  | POST |
| /getUnprocessedResults | POST |
| /deleteJob  | POST |
| /createQuery  | GET, POST |
| /getQueryJobInfo | POST |
| /getSuccessfulQueryResults  | POST |

Let's add the operations to the resources in the `Salesforce` API

#### - /createJobAndUploadFile

Users can utilize this resource to send CSV content for upload via a CSV file. The API will utilize a `File Connector` to store the CSV content in a `csvContent` property. The 'UploadJobData' operation will then upload the `csvContent`. After uploading the content, the `CloseJob` operation will be used to change the job status to `UploadComplete`.

1. Select the `createJob` operation from **Salesforce_Connector**.
   1. In the 'Salesforce Configuration' section of the properties, select the Salesforce connection configuration you created.
   2. In the properties section, under `Basic`, select `INSERT` in the Operation dropdown.
   3. Input `Account` in the `Object` text box
   4. Select `COMMA` in the `Column Delimiter` dropbox
   5. Select `LF` or `CRLF` in the `Line Ending` dropbox based on your operating system. IF Windows : `CRLF`, for Unix-based systems : `LF`

2. Select the `read` operation from **[File_Connector]({{base_path}}/reference/connectors/file-connector/file-connector-config/#operations)**.
    1. Prior to this step, you must configure the **File Connector**. For setup instructions, please refer to the [File Connector Documentation]({{base_path}}/reference/connectors/file-connector/file-connector-overview/).
    2. Create a File Connection and select it.
    3. In the `Basic` section, enter the file path.

3. Select the `uploadJobData` operation from **Salesforce_Connector**.
    1. In the 'Salesforce Configuration' section of the properties, select the Salesforce connection configuration you created.
    2. For `Job ID` text box select the expression of the variable value for `id` returned from `createJob` operation.
    3. For `Input Data` text box select the expression of the variable value for `payload` returned from file `read` operation.

4. Select the `closeJob` operation from **Salesforce_Connector**.
    1. In the 'Salesforce Configuration' section of the properties, select the Salesforce connection configuration you created.
    2. In the 'Job ID' text box select the expression of the variable value for `id` returned from `createJob` operation.

5. Select the 'Respond' mediator.

<a href="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-v2/create-job-upload-file.png"><img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-v2/create-job-upload-file.png" width="800" /></a>

#### - /getJobInfo

Using this resource, users can get the job information.

1. Select the `getJobInfo` operation from **Salesforce_Connector**.
    1. In the 'Salesforce Configuration' section of the properties, select the Salesforce connection configuration you created.
    2. In the 'Job ID' text box, enter the expression `${payload.jobId}`.
3. Select the 'Respond' mediator.

<a href="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-v2/get-job-info.png"><img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-v2/get-job-info.png" width="600" /></a>

#### - /getSuccessfulResults

Using this resource, users can retrieve the successfully processed records of a particular bulk job.

1. Select the `getSuccessfulResults` operation from **Salesforce_Connector**.
    1. In the 'Salesforce Configuration' section of the properties, select the Salesforce connection configuration you created.
    2. In the 'Job ID' text box, enter the expression `${payload.jobId}`.
    3. In the 'Output type' dropdown, select `JSON` or `CSV`.
3. Select the 'Respond' mediator.

<a href="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-v2/get-successful-results.png"><img src="{{base_path}}/assets/img/integrate/connectors/salesforcebulk-v2/get-successful-results.png" width="600" /></a>

### Test the resources

Let's test the API. Start the MI and deploy the API.

1. Let's create a bulk ingest job using our `/createJobAndUploadFile` resource. To invoke the resource,  use the following curl command:
    ```bash
    curl --location 'http://localhost:8290/salesforce/createJobAndUploadFile' \
    --header 'Content-Type: text/plain' \
    --header 'Cookie: CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
    ```
You will receive a response similar to the following:
```json
{
    "id": "XXXXXXXXXXXXXXXXX",
    "operation": "insert",
    "object": "Account",
    "createdById": "XXXXXXXXXXXXXXXXX",
    "createdDate": "2023-03-16T06:43:09.000+0000",
    "systemModstamp": "2023-03-16T06:43:09.000+0000",
    "state": "UploadComplete",
    "concurrencyMode": "Parallel",
    "contentType": "CSV",
    "apiVersion": 57.0
}
```
Note down the `id` from the response.

3. Let's get the job information of the bulk job using our `/getJobInfo` resource. To invoke the resource, please use the following curl command:
  ```bash
  curl --location 'http://localhost:8290/salesforce/getJobInfo' \
  --header 'Content-Type: application/json' \
  --header 'Cookie: CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1' \
  --data '{
      "id" : "XXXXXXXXXXXXXXXXX"
  }'
  ```
Make sure you replace the `id` value. You will receive a response similar to the following:

    ```json
    {
      "id": "XXXXXXXXXXXXXXXXX",
      "operation": "insert",
      "object": "Account",
      "createdById": "XXXXXXXXXXXXXXXXX",
      "createdDate": "2023-03-16T06:43:09.000+0000",
      "systemModstamp": "2023-03-16T06:43:13.000+0000",
      "state": "JobComplete",
      "concurrencyMode": "Parallel",
      "contentType": "CSV",
      "apiVersion": 57.0,
      "jobType": "V2Ingest",
      "lineEnding": "LF",
      "columnDelimiter": "COMMA",
      "numberRecordsProcessed": 1,
      "numberRecordsFailed": 0,
      "retries": 0,
      "totalProcessingTime": 139,
      "apiActiveProcessingTime": 81,
      "apexProcessingTime": 0
    }
    ```

4. Let's get the successfully processed records using our `/getSuccessfulResults` resource. To invoke the resource, please use the following curl command:
    ```bash
    curl --location 'http://localhost:8290/salesforce/getSuccessfulResults' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1' \
    --data '{
        "id" : "XXXXXXXXXXXXXXXXX"
    }'
    ```
Make sure you replace the `id` value. You will receive a response similar to the following:

    ```json
    [
      {
        "sf__Id": "XXXXXXXXXXXXXXXXX",
        "sf__Created": "true",
        "Name": "Lorem Ipsum",
        "ShippingCity": "Milano",
        "NumberOfEmployees": "2676",
        "AnnualRevenue": "9.12260031E8",
        "Website": "https://ft.com/lacus/at.jsp",
        "Description": "Lorem ipsum dolor sit amet"
      }
    ]
    ```

5. Let's get the successfully processed records using our `/getUnprocessedResults` resource. To invoke the resource, please use the following curl command:
    ```bash
    curl --location 'http://localhost:8290/salesforce/getUnprocessedResults' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1' \
    --data '{
        "id" : "XXXXXXXXXXXXXXXXX"
    }'
    ```
Make sure you replace the `id` value. Upon successful execution, you will receive a `200 OK` response, and the output will be written to the designated file.
  ```json
    {
      "result": "success"
    }
  ```

## What's next

- To customize this example for your own scenario, see [Salesforce bulk V2 Connector Configuration]({{base_path}}/reference/connectors/salesforce-connectors/salesforcebulk-v2-reference/) documentation for all operation details of the connector.
