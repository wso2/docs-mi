# About this Release

## What's new in this release?

The following features and improvements were introduced with **WSO2 Integrator: MI 4.5.0**.

??? note "Versioned Artifacts"
    MI 4.5.0 introduces support for versioned artifact deployment, letting users deploy multiple versions of the same integration logic concurrently and cleanly manage version lifecycles.

??? note "Per API CORS Configuration Support"
    Enable per-API CORS configuration for enhanced security and cross-origin resource sharing control.

??? note "Enable/ Disable Capability for Inbound Endpoints"
    Inbound endpoints can now be dynamically activated/deactivated using the Management API, giving operational flexibility for handling pipelines, scheduled flows, or incident recovery.

??? note "Graceful Transport Shutdown"
    Graceful shutdown has been extended to transport-level tasks, allowing you to restart or terminate instances with confidence—without losing in-flight data or interrupting operations.

??? note "Manage Dependencies Across Integration Projects"
    New dependency management allows seamless handling of shared artifacts across multiple integration projects. This ensures consistency, reduces duplication, and improves project maintainability.

??? note "Multi-Project Support"
    Organize your integrations into multiple modules and manage them in a single workspace. MI 4.5.0 includes support for migrating complex multi-module Maven projects previously developed in WSO2 Integration Studio to VS Code.

??? note "MI Copilot / AI-Assisted Development Experience Enhancements"
    - Syntax validation of generated code
    - "Thinking mode" that suggests improvements
    - Automatic migration of old data mapper content
    - Feedback and rating support for AI output

??? note "Improved Unit Testing UI"
    A smoother and more intuitive interface for writing and executing unit tests within the VS Code extension.

??? note "Kubernetes Configuration Support"
    Easily generate K8s deployment files from the VS Code extension.

??? note "Support for New Connectors / Protocols"
    - Jakarta Messaging 3.1 Support
    - gRPC support
    - Salesforce Marketing Cloud
    - Apache Pulsar
    - Intelligent Document Processing (IDP)
    - Salesforce PubSub

??? note "Enhanced Connectors"
    **Kafka:**
    Error tracing via callbacks.
    Publish custom headers dynamically.
    
    **File Connector & Listener:** 
    The Connector and the Inbound Listener have been enhanced to offer more reliable and flexible file event handling
    
    **Facebook & Google Ads:** 
    Hashing support added

## Fixed issues

- [WSO2 Integrator: MI Issues](https://github.com/wso2/product-micro-integrator/issues?q=is%3Aissue%20is%3Aclosed%20closed%3A2025-02-20..2025-10-21)
- [MI for VS Code Issues](https://github.com/wso2/mi-vscode/issues?q=is%3Aissue%20is%3Aclosed%20closed%3A2025-02-20..2025-10-21)

## Known issues

- [WSO2 Integrator: MI Issues](https://github.com/wso2/micro-integrator/issues?q=is%3Aissue+is%3Aopen)
- [MI for VS Code Issues](https://github.com/wso2/mi-vscode/issues?q=is%3Aissue+is%3Aopen)

