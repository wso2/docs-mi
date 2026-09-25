# About this Release

## What's new in this release?

The following features and improvements were introduced with **WSO2 Integrator: MI 4.7.0**.

??? note "Priority based CApp deployment"
    With priority-based CApp deployment, WSO2 Integrator: MI provides greater control over deployment order, ensuring critical components are deployed first for a more predictable and reliable startup experience.

??? note "ELK analytics support for data services"
    WSO2 Integrator: MI enables Data Services activity and performance data to be integrated with the Elastic Stack, providing centralized monitoring, visualization, and analysis.

??? note "Configuration and Secret Management Improvements"
    - Simplify cloud-native deployments by reducing application-level configuration managed through `deployment.toml`.
    - Introduce AWS Secrets Manager support

??? note "Native support for Brotli encoded requests"
    WSO2 Integrator: MI now natively supports Brotli (br) encoded HTTP requests, enabling efficient handling of compressed payloads without requiring additional configuration or custom processing.

??? note "Hardened scheduled task coordination"
    WSO2 Integrator: MI introduces a more robust scheduled task coordination mechanism, ensuring that tasks are executed reliably and consistently across clustered deployments.

??? note "Improved operational visibility into clustered deployments"
    Gain greater visibility into scheduled tasks across clustered deployments, including task inventory, CApp ownership, execution state, scheduling details, and active node ownership.

??? note "Data services editor improvements"
    Accelerate Data Services development with in-editor try-out support and an enhanced Data Service Call Mediator.

??? note "Enhanced dependency management in the editor"
    Simplify project dependency management with a streamlined, selection-based experience for adding connectors, inbound endpoints, dependent projects, and external libraries.

??? note "Workspace overview in the editor"
    Manage multiple CApps in a single workspace with a centralized view of projects and configurations. Easily build, run, package, and deploy projects from one place.

??? note "AI Features"
    - Custom AI instructions support
    - Integrate skills framework support
    - Expose WSO2 Integrator: MI as an MCP Server

??? note "Connector Enhancements"
    - Solace Connector and Inbound Endpoint support
    - PGP connector support
    - Azure Service Bus Connector and Inbound Endpoint support
    - Streaming large files to S3 bucket support

## Fixed issues

- [WSO2 Integrator: MI Issues](https://github.com/wso2/product-integrator-mi/issues?q=is%3Aissue%20is%3Aclosed%20closed%3A2026-03-27..2026-10-15)
- [WSO2 Integrator: MI VS Code Extension Issues](https://github.com/wso2/mi-vscode/issues?q=is%3Aissue%20is%3Aclosed%20closed%3A2026-03-27..2026-10-15)

## Known issues

- [WSO2 Integrator: MI Issues](https://github.com/wso2/product-integrator-mi/issues?q=is%3Aissue+is%3Aopen)
- [WSO2 Integrator: MI VS Code Extension Issues](https://github.com/wso2/mi-vscode/issues?q=is%3Aissue+is%3Aopen)

