# Salesforce Connectors Overview

Salesforce is a Customer Relationship Management (CRM) solution that helps bridge the gap between customers and enterprises. This enables you to integrate with Salesforce and perform various actions with ease. This is done using connectors that interact with available Salesforce APIs. 

## Types of Salesforce connectors

To see the available Salesforce connectors, navigate to the [connector store](https://store.wso2.com/store/assets/esbconnector/list) and search for "Salesforce". You get the following connectors:

<img src="{{base_path}}/assets/img/integrate/connectors/sf-connector-store.png" title="Salesforce Connector Store" width="1000" alt="Salesforce Connector Store"/>

### Salesforce connector

The Salesforce connector allows you to work with records in Salesforce. You can use the Salesforce connector to create, query, retrieve, update, and delete records in your organization's Salesforce data. This is typically used when sending XML requests. The connector uses the [Salesforce SOAP API](http://www.salesforce.com/us/developer/docs/api/) to interact with Salesforce. The Salesforce streaming inbound endpoint allows you to perform various Salesforce streaming data through the integration runtime of WSO2.

* **[Configuring Salesforce Connector Operations](https://wso2docs.atlassian.net/wiki/spaces/ESBCONNECTORS/pages/50861838/Configuring+Salesforce+Connector+Operations)**: Includes an overview of the connector and links to associated documentation.

### Salesforce REST connector

The **Salesforce REST Connector** uses the [Salesforce REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm) to interact with Salesforce. This connector is more useful when sending JSON requests. The Salesforce REST Connector allows you to work with records in Salesforce, a web-based service that allows organizations to manage Customer Relationship Management (CRM) data. You can use the Salesforce connector to create, query, retrieve, update, and delete records in your organization's Salesforce data.

* **[Salesforce Access Token Generation]({{base_path}}/includes/reference/connectors/salesforce-connectors/sf-access-token-generation/)**: This section includes how to obtain the OAuth2 tokens from Salesforce REST API.

* **[Salesforce Rest API Connector Example]({{base_path}}/reference/connectors/salesforce-connectors/sf-rest-connector-example/)**: This example explains how to use the Salesforce client to connect with the Salesforce instance and perform the **create** and **retrieve** operations.

* **[Salesforce Rest API Connector Reference]({{base_path}}/reference/connectors/salesforce-connectors/sf-rest-connector-config/)**: This documentation provides a reference guide for the Salesforce REST API operations.
  
The following table lists compatibility information for Salesforce REST Connector.

| Connector version | Supported Salesforce REST API version | Supported WSO2 product versions |
| ------------- | ------------- | ------------- |
| [2.0.0](https://github.com/wso2-extensions/esb-connector-salesforcerest/tree/v2.0.0) | v32.0 | MI 4.3.0, APIM 4.0.0, EI 7.1.0, EI 7.0.x, EI 6.6.0, EI 6.5.0 |

### Salesforce Bulk connector

The Salesforce Bulk connector allows you to access the [Salesforce Bulk REST API](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/) from an integration sequence. As the name implies, this is used for bulk operations when adding multiple entries into Salesforce. Salesforce Bulk is a RESTful API that allows you to quickly load or delete large sets of your organization's data into Salesforce. You can use the Salesforce Bulk connector to query, insert, update, or delete a large number of records asynchronously, by submitting the records in batches. Salesforce can process these batches in the background.

* **[Salesforce Bulk API Connector Example]({{base_path}}/reference/connectors/salesforcebulk-connector/salesforcebulk-connector-example/)**: This example explains how to use the Salesforce Bulk API connector to insert employee details into Salesforce instance and get the status of the inserted employee details.

* **[Salesforce Bulk API Connector Reference]({{base_path}}/reference/connectors/salesforcebulk-connector/salesforcebulk-reference/)**: This documentation provides a reference guide for the Salesforce Bulk API operations.

The following table lists compatibility information for the Salesforce Bulk API Connector.

| Connector version  | Supported Salesforce API version | Supported WSO2 product versions |
| ------------- | ------------- | ------------- |
| 2.1.1 | 34.0 | MI 4.3.0 |

* **[Salesforce Bulk API V2 Connector Example]({{base_path}}/reference/connectors/salesforce-connectors/salesforcebulk-v2-connector-example/)**: This example explains how to use the Salesforce Bulk API V2 connector to perform various operations on Salesforce data.

* **[Salesforce Bulk API V2 Connector Reference]({{base_path}}/reference/connectors/salesforce-connectors/salesforcebulk-v2-reference/)**: This documentation provides a reference guide for the Salesforce Bulk API V2 operations.

The following table lists compatibility information for the Salesforce Bulk API V2 Connector.

| Connector version  | Supported Salesforce API version | Supported WSO2 product versions |
| ------------- | ------------- | ------------- |
| 2.1.1 | 57.0 | MI 4.3.0 |

### Salesforce inbound endpoint  

**Salesforce Inbound Endpoint**  uses the [Salesforce streaming API](https://developer.salesforce.com/docs/atlas.en-us.api_streaming.meta/api_streaming/intro_stream.htm) to receive notifications. This is bundled with and can be obtained from the Salesforce connector available in the store. The Salesforce inbound endpoint receives notifications based on the changes that happen to Salesforce data with respect to an SOQL (Salesforce Object Query Language) query you define, in a secured and scalable way.

* **[Setting up the PushTopic in Salesforce]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-configuration/)**: This documentation explains how to set up the Salesforce environment to connect with WSO2 Salesforce Inbound Endpoint. 

* **[Salesforce Inbound Endpoint Example]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-example/)**: This example explains how Salesforce inbound endpoint acts as a message consumer. The integration runtime of WSO2 is a listening inbound endpoint that can consume messages from Salesforce. 

* **[Salesforce Inbound Endpoint Reference]({{base_path}}/reference/connectors/salesforce-connectors/sf-inbound-endpoint-reference-configuration/)**: This documentation provides a reference guide for the Salesforce Inbound Endpoint.

The following table lists compatibility information for the Salesforce inbound endpoint connector.

| Inbound version  | Supported Salesforce API version | Supported WSO2 product versions |
| ------------- | ------------- | ------------- |
| 2.0.6| 22.0 | MI 4.3.0, APIM 4.0.0, EI 7.1.0, EI 7.0.x, EI 6.6.0, EI 6.5.0 |

## How to contribute

As an open-source project, WSO2 extensions welcome contributions from the community. 

To contribute to the code for these connectors, create a pull request in the following repositories. 

* [Salesforce REST API Connector GitHub repository](https://github.com/wso2-extensions/esb-connector-salesforcerest) 
* [Salesforce Inbound Endpoint GitHub repository](https://github.com/wso2-extensions/esb-inbound-salesforce)
* [Salesforce SOAP API Connector GitHub repository](https://github.com/wso2-extensions/esb-connector-salesforce)
* [Salesforce Bulk API Connector GitHub repository](https://github.com/wso2-extensions/esb-connector-salesforcebulk)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
