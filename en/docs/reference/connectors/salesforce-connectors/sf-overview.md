---
search:
  boost: 2
---
# Salesforce Connectors Overview

Salesforce is a Customer Relationship Management (CRM) solution that helps bridge the gap between customers and enterprises. This enables you to integrate with Salesforce and perform various actions with ease. This is done using connectors that interact with available Salesforce APIs. 

### Salesforce connector

The Salesforce connector allows you to work with records in Salesforce. You can use the Salesforce connector to create, query, retrieve, update, and delete records in your organization's Salesforce data. The connector uses the [Salesforce SOAP API](http://www.salesforce.com/us/developer/docs/api/), [Salesforce Bulk API](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/api_asynch_introduction_how_bulk_api_works.htm/) and [Salesforce REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_list.htm) to interact with Salesforce.

* **[Salesforce Access Token Generation]({{base_path}}/reference/connectors/salesforce-connectors/3.x/sf-access-token-generation)**: This section includes how to obtain the OAuth2 tokens from Salesforce REST API.
* **[Salesforce Rest API Connector Example]({{base_path}}/reference/connectors/salesforce-connectors/3.x/sf-rest-connector-example/)**: This example explains how to use the Salesforce client to connect with the Salesforce instance using the REST API.
* **[Salesforce SOAP API Connector Example]({{base_path}}/reference/connectors/salesforce-connectors/3.x/sf-soap-connector-example/)**: This example explains how to use the Salesforce client to connect with the Salesforce instance using the SOAP API.
* **[Salesforce Bulk API Connector Example]({{base_path}}/reference/connectors/salesforce-connectors/3.x/sf-bulk-v2-connector-example.md/)**: This example explains how to use the Salesforce client to connect with the Salesforce instance using the Bulk V2 API.
* **[Salesforce Connector Reference]({{base_path}}/reference/connectors/salesforce-connectors/3.x/sf-rest-connector-config/)**: This documentation provides a reference guide for the Salesforce operations.
  
The following table lists compatibility information for Salesforce Connector.

| Connector Version                                                                    | Supported WSO2 Product Versions |
| ------------------------------------------------------------------------------------ | ------------------------------- |
| [3.0.0](https://github.com/wso2-extensions/esb-connector-salesforcerest/tree/v3.0.0) | MI 4.4.0                        |

## How to contribute

As an open-source project, WSO2 extensions welcome contributions from the community. 

To contribute to the code for this connector, create a pull request in the following repository. 

* [Salesforce Connector GitHub repository](https://github.com/wso2-extensions/esb-connector-salesforcerest) 

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

> Note: For older versions, see the [2.x documentation]({{base_path}}/reference/connectors/salesforce-connectors/2.x/sf-connector-config/).
