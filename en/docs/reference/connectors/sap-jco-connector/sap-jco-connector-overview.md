# SAP JCo Connector Overview

The SAP JCo Connector enables WSO2 Micro Integrator to communicate with SAP systems through the [SAP Java Connector (JCo)](https://support.sap.com/en/product/connectors/jco.html) library. It allows you to call RFC-enabled function modules (including BAPIs) and to exchange IDocs (Intermediate Documents) with SAP ERP and S/4HANA systems.

The connector is built from the [Ballerina SAP JCo module](https://github.com/ballerina-platform/module-ballerinax-sap.jco) and packaged for the Micro Integrator.

## Key features

- Connect to SAP systems via SAP JCo.
- Execute Remote Function Calls (RFC) and BAPIs with import and table parameters.
- Send IDocs to an SAP system over tRFC (with TID creation and confirmation).
- Return RFC responses as records, XML, or JSON.
- Compatible with SAP ERP and S/4HANA systems.

## Compatibility

| Connector version | Supported product versions |
|-------------------|----------------------------|
| 1.0.0             | MI 4.6.0 and above         |

## SAP JCo Connector documentation

* **[Set up the SAP JCo Connector]({{base_path}}/reference/connectors/sap-jco-connector/sap-jco-connector-configuration/)**: This documentation explains how to obtain the SAP middleware libraries, install the native SAP JCo library, and configure a connection to an SAP system.

* **[SAP JCo Connector Example]({{base_path}}/reference/connectors/sap-jco-connector/sap-jco-connector-example/)**: This example explains how to use the SAP JCo Connector to call an RFC-enabled function module and to send an IDoc to an SAP system.

* **[SAP JCo Connector Reference]({{base_path}}/reference/connectors/sap-jco-connector/sap-jco-connector-reference/)**: This documentation provides a reference guide for the SAP JCo Connector operations.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP JCo Connector GitHub repository](https://github.com/wso2-extensions/mi-connector-sap.jco)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
