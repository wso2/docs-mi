# About this Release

## What's new in this release?

The following features and improvements were introduced with **WSO2 Integrator: MI 4.6.0**.

??? note "JDK 25 Support"
    With JDK 25 support, WSO2 Integrator: MI stays aligned with the latest Java platform releases, offering a future-ready and fully validated runtime environment.

??? note "Post-Quantum Secure Runtime"
    Strengthens runtime security with post-quantum-ready cryptography, safeguards your integrations against emerging quantum threats, ensuring long-term data protection and cryptographic resilience.

??? note "Bouncy Castle FIPS Crypto Provider Support"
    Run MI with the Bouncy Castle FIPS crypto provider to meet stricter cryptographic requirements in regulated environments. This improves compliance readiness and enables deployments that rely on FIPS-capable crypto modules.

??? note "OAuth 2.0 (JWT) Authentication for REST APIs"
    Secure REST APIs with an OAuth 2.0 (JWT) authentication handler for token-based access control, adding a zero-trust layer to API access.

??? note "Management API Enhancements"
    - Enable/disable/trigger scheduled tasks at runtime
    - Enable/disable statistics at runtime

??? note "Enhanced Logging with Mediator ID"
    Include mediator IDs in runtime logs for faster troubleshooting and clearer correlation between log entries and mediation flow components. This makes debugging easier, especially in complex integration flows.

??? note "Observability Features/Improvements"
    - Support Prometheus API 1.x
    - Support publishing observability data to Moesif
    - OpenTelemetry-based observability in Data Services
    - OpenTelemetry support for traces and logs
    - OpenTelemetry span filtering support for mediators
    - Show connector/module operations as a single span in traces

??? note "VS Code Extension Features/Improvements"
    - Remote debugging
    - Unit test coverage for Synapse artifacts

??? note "AI Features"
    - MCP tool support for agents in the AI connector
    - Agent memory trim and summarization support
    - Agent mode in MI Copilot

??? note "Connector Enhancements"
    - AMQP 1.0 protocol support
    - gRPC connector with import support
    - MI connector generation from Ballerina connectors

## Fixed issues

- [WSO2 Integrator: MI Issues](https://github.com/wso2/product-micro-integrator/issues?q=is%3Aissue%20is%3Aclosed%20closed%3A2025-10-28..2026-03-27)
- [MI for VS Code Issues](https://github.com/wso2/mi-vscode/issues?q=is%3Aissue%20is%3Aclosed%20closed%3A2025-10-28..2026-03-27)

## Known issues

- [WSO2 Integrator: MI Issues](https://github.com/wso2/micro-integrator/issues?q=is%3Aissue+is%3Aopen)
- [MI for VS Code Issues](https://github.com/wso2/mi-vscode/issues?q=is%3Aissue+is%3Aopen)

