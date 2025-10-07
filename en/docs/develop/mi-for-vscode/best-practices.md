## Introduction

This guide provides best practices for designing, developing, deploying, and maintaining integration solutions with WSO2 Micro Integrator (MI). It is intended for integration developers, architects, and DevOps engineers aiming to build scalable, secure, and maintainable solutions.

## Development Best Practices

### General development guidelines

- Always use the latest version of the WSO2 Micro Integrator extension for VS Code. It is recommended to update the extension frequently to get the latest features and bug fixes.

- Use the UI provided by the WSO2 Micro Integrator extension for VS Code to create and manage your integration projects. This ensures that your projects are set up correctly and follow best practices. You can use manual editing only for advanced configurations not supported by the UI.

### Create projects

- Create a separate project for each microservice or integration usecase. This approach enhances organization, streamlines artifact management, and facilitates easier maintenance and updates of individual integrations.

- Create a multi-module project for managing multiple related services that need to be deployed together. This allows you to manage dependencies and shared resources effectively.

- Apply semantic versioning to both projects and artifacts to clearly communicate the impact of changes (major, minor, patch). This helps manage updates, track dependencies, and ensure compatibility across integration solutions.
    - Sample versioning scheme: `1.0.1`, `1.1.0`, `2.0.0`
    - Include a changelog (a record of changes) in your project to document updates, improvements, and fixes for each version.

### Naming Conventions

- Use meaningful names for your projects to identify their purpose easily.
   - Use a meaningful group ID that reflects your organization or team, or logically groups related projects together. For example, use `com.companyname` or `org.departmentname`. Be sure to give the same group ID to related projects.
    - Use a meaningful artifact ID that reflects the specific project or module. For example, use `order-service` or `payment-gateway`.

- Follow a consistent naming convention for your artifacts to easily identify their purpose and functionality. For example, use `OrderAPI`, `PaymentSequence`, or `InventoryEndpoint`.

<table>
  <thead>
    <tr>
        <th>Type</th>
        <th>Description</th>
        <th>Format</th>
        <th>Sample</th>
    </tr>
  </thead>
    <tbody>
        <tr>
            <td>Project Name</td>
            <td>The root directory of the project's source code. Make it reflect the project's purpose.</td>
            <td>&lt;ProjectName&gt;</td>
            <td>StudentInformationSystem</td>
        </tr>
            <tr>
            <td>Artifacts</td>
            <td>The synapse artifacts that are created for your integration projects. These include sequences, endpoints, proxy services, etc.</td>
            <td>&lt;ArtifactName&gt;&lt;Type&gt;</td>
            <td>GetStudentSequence, SimpleStockQuoteProxyService</td>
        </tr>
        <tr>
            <td>Registry resource folder structure</td>
            <td>Organize resources using custom folders that clearly indicate the type or logical category of each resource. Ensure the folder structure is intuitive and reflects the contents, such as grouping schemas, WSDLs, and XSDs into separate, well-named directories for easier management and discovery.</td>
            <td>&lt;Project&gt;/&lt;ResourceType&gt;/&lt;subResourceType&gt;</td>
            <td>
                StudentInformationSystem<br>
                ├── Schema<br>
                ├── wsdl<br>
                └── xsd
            </td>
        </tr>
    </tbody>
</table>

<!-- TODO: Add dependency management best practices -->
<!-- ### Dependency Management -->


## Artifacts Best Practices

### Working with APIs

- Choose clear, descriptive names for APIs that accurately reflect their functionality and business domain. Follow a consistent naming convention, such as `StudentAPI`, `OrderAPI`, or `PaymentAPI`, to improve discoverability and maintainability.
- Apply versioning to APIs to manage changes, communicate updates, and ensure backward compatibility. Document version changes and deprecations clearly.
- Design and implement a `Fault Sequence` for each API to handle errors consistently and provide clear feedback to consumers. Ensure error responses include relevant details such as error codes, messages, and correlation IDs for easier troubleshooting.
- Structure APIs to be intuitive and easy to consume. Define resources and operations following RESTful conventions, and use meaningful HTTP methods and status codes.
- When migrating from older WSO2 MI versions, move logic from the `Out Sequence` to the `In Sequence` to align with current best practices and improve maintainability.

> **Note:** Migrating logic from the `Out Sequence` to the `In Sequence` is recommended for consistency and future-proofing your integration flows.

## Mediators & Connectors Best Practices

### General Mediator Usage

- Add a proper description to each mediator to clarify its purpose and usage within the integration flow.
- Prefer the `Variable Mediator` over the `Property Mediator` for storing intermediate values during message processing. The `Variable Mediator` is optimized for temporary data storage and reuse within the integration flow, reducing redundant computations and improving performance.
- Reserve the `Property Mediator` for controlling message flow, such as setting properties that influence routing, error handling, or other flow-specific logic.
- Use clear, descriptive variable names to enhance the readability and maintainability of your integration logic.
- If you want to repeatedly use the same mediation sequence, define it as a `Sequence`. You can then invoke this reusable sequence from your main sequence, multiple proxy services, or REST APIs. Use the  `Call Sequence` mediator to call the saved sequence, or select it as the `InSequence` or `FaultSequence` when configuring a proxy service or REST API. This approach promotes modularity, reduces duplication, and simplifies maintenance across your integration flows.

### General Connector Usage

- Reuse shared connections across multiple integrations whenever possible to optimize resource usage and enhance performance. Connection pooling is managed per connection, so minimizing the number of distinct connections helps reduce overhead and improve scalability.
- Create separate connections only when required, such as for high-throughput integrations. Dedicated connections provide isolated connection pools, which can be beneficial for integrations that demand high availability.

### Log Mediator

- Use Log mediators as checkpoints in message flows to track and debug integration logic. In development, set the log category to `DEBUG` and configure the global log level for `org.apache.synapse.mediators.builtin.LogMediator` accordingly. Include relevant payload information, request metadata (e.g., user ID, timestamp), and unique identifiers (e.g., correlation IDs) to aid in troubleshooting and tracing requests across services.
- In production, restrict Log mediators to Fault sequences to avoid excessive logging and performance overhead. Always log key error details such as `ERROR_CODE` and use correlation IDs to link related log entries. Place Log mediators within Fault sequences to ensure error information is captured in `wso2carbon.log`. Set the global log level to `INFO` to enable essential troubleshooting without exposing sensitive or verbose information.
- Avoid logging sensitive information, such as user credentials or personal data, to protect privacy and comply with data protection regulations. Use descriptive messages and implement structured logging to capture key attributes and context information in a consistent format. Regularly review and adjust log levels to balance visibility and performance.

### Custom Mediator / Ballerina Module

- Avoid writing a Class mediator or custom Ballerina module if the required functionality can be achieved using the built-in mediators and connectors of WSO2 Micro Integrator. This reduces maintenance overhead and leverages native features.
    - Review the [Mediator Catalog](https://mi.docs.wso2.com/en/latest/reference/mediators/about-mediators/) and [Connectors](https://mi.docs.wso2.com/en/latest/reference/connectors/connectors-overview/) to understand the capabilities of built-in mediators and connectors. This helps ensure you leverage existing features and avoid unnecessary custom development.
- If you must implement a Class mediator or a custom Ballerina module, ensure you understand its performance implications and monitor for potential memory leaks or resource issues.
- Use meaningful and properly structured Java package names for Class mediators, and follow Ballerina module naming conventions for custom modules to maintain clarity and organization.
- Follow standard Java and Ballerina naming conventions and code best practices when developing Class mediators or Ballerina modules to ensure maintainability and readability.
- Document the purpose, usage, and configuration of your custom mediator or Ballerina module to help other developers understand and use them effectively.

### HTTP Connector

- Prefer using the HTTP connector for outbound HTTP calls instead of combining endpoints with Call or Send mediators. The HTTP connector provides a more streamlined, configurable, and maintainable approach, supporting advanced features such as connection, retries, and custom headers. This reduces complexity, improves performance, and ensures better alignment with WSO2 MI best practices.
- Always use the latest version of the HTTP connector to take advantage of performance improvements and new features.

<!-- TODO: Add Scatter Gather Mediator best practices -->
<!-- ### Scatter Gather Mediator -->



### Foreach Mediator

- Whenever possible, enable the `Execute Parallel` property in the ForEach mediator to process iterations concurrently. This can significantly improve performance, especially when handling large datasets or making multiple outbound calls. Ensure that your integration logic is thread-safe and that parallel execution does not introduce race conditions or resource contention.
- Enable the `Continue without aggregation` property in the ForEach mediator to optimize performance. This setting allows the mediator to proceed without waiting for responses from outbound calls made during each iteration, reducing latency and improving throughput in scenarios where response aggregation is not required.


### Message Transformation

- **PayloadFactory Mediator**: Use when you need to reconstruct the entire message payload into a simple, fixed format. Ideal for scenarios where only a few parameters are extracted from the original message and the output structure is predictable.

- **For-Each + PayloadFactory Mediator**: Use this combination when the original message contains repetitive segments that need to be transformed individually. The For-Each mediator iterates over each segment, and the PayloadFactory mediator constructs the new format for each segment, similar to the For-Each function in XSLT.

- **Data Mapper Mediator**: Use when you need to change the structure of data in a message or convert one data format to another.

- **Enrich Mediator**: Use when only a small part of the message needs to be modified, such as adding or removing an element, without reconstructing the entire payload.

- **XSLT Mediator**: Use for complex transformation logic, including repetitive segments and conditional transformations. Note that XSLT transformations are handled by a third-party engine, which may impact performance.

- **JSON Transform Mediator Best Practices**:
    - Use the JSON Transform mediator when you need to convert XML payloads to JSON or transform JSON structures within your integration flows. This mediator allows you to define transformation properties locally, enabling scenario-specific configurations rather than relying on global settings.
    - Leverage the ability to specify a JSON schema in the mediator to validate and correct payloads during transformation. This helps ensure data consistency and prevents errors caused by schema mismatches.

> **Note:** When using the XSLT mediator, be aware of potential performance impacts due to the use of a third-party transformation engine.


### Expression & Data Handling

- Prefer the **Synapse Expression Language** for all JSON data manipulation and transformation tasks. It offers improved performance, enhanced flexibility, and broader feature support compared to legacy `XPath` and `JSONPath` expressions.
- Use legacy expressions only when maintaining existing integrations that depend on them, or if a required feature is unavailable in the Synapse Expression Language.
- Regularly review and refactor older integrations to migrate to Synapse Expression Language where feasible, ensuring consistency and maintainability across your projects.
- Document any use of legacy expressions, noting the reason for their inclusion and any limitations, to aid future maintenance and upgrades.

<!-- TODO: Add error handling best practices -->
<!-- ## Error Handling Best Practices -->

## Testing & Quality Best Practices

- **Test Strategy & Planning**: Define a comprehensive test strategy for each project, outlining what needs to be tested, including functional, integration, performance, and security aspects.
- **Test Plan Creation**: Develop detailed test plans covering all functional scenarios, edge cases, and performance requirements. Include both positive and negative test cases.
- **Automation Tools**: Use JMeter and SoapUI for API and integration testing. Write automation scripts for repetitive test cases and performance tests. For web applications, automate UI testing using Selenium.
- **Java Integration Tests**: Whenever possible, implement Java-based integration tests to automate end-to-end scenarios and validate interactions between components.
- **Isolated & Integrated Testing**: Isolate test scenarios for each product or module. Test them as separate units before writing integration tests that cover cross-product or cross-module flows.
- **Continuous Testing in SDLC**: Perform tests throughout the Software Development Life Cycle (SDLC), from development to deployment, to catch issues early and ensure ongoing quality.
- **Test Environment Parity**: Ensure the test environment closely matches the production environment in terms of resource allocation, VM sizes, database configurations, and network resources.
- **Distributed Testing**: Avoid relying solely on single-node test results. Test across multiple nodes to simulate real-world deployment scenarios.
- **Custom Solutions Testing**: Test all custom solutions and artifacts thoroughly. Avoid using default server ports when testing custom features to prevent conflicts.
- **Load & Performance Testing**: Before production deployment, run load tests in development and test environments using data and scenarios that closely replicate production use cases.
- **Security & Penetration Testing**: Conduct penetration tests on the production setup before go-live. Coordinate with stakeholders to schedule and execute these tests.
- **User Acceptance Testing (UAT)**: Run UAT rounds against documented requirements to ensure the solution meets customer acceptance criteria and business needs.
- **Test Documentation**: Document all functional and performance test results in detail. For each test, create a report that includes the steps followed, sample data or requests used, and the outcome (pass/fail, observations, and any issues found).
    - **Functional Test Results**: Maintain a dedicated document for functional test results. Include test case descriptions, expected outcomes, actual outcomes, and any deviations or bugs identified during testing.

        | Test Case ID      | *Enter Function Name*|
        |------------------|-----------------|
        | Description       | *Enter Description*   |
        | Test Steps        | *Enter Test Steps*    |
        | Expected Results  | *Enter Expected Results* |
        | Actual Results    | *Enter Actual Results*   |
        | Status            | *Enter Status (Pass/Fail)* |
        | Comments          | *Enter Comments*        |



    - **Performance Test Results**: Create a separate document for performance test results. Record the test scenarios, load profiles, metrics collected (such as response times, throughput, resource usage), and analysis of the results.

        | Test Case ID             | *Enter Test Case ID*       |
        |------------------|----------------------------|
        | Description       | *Enter Description*         |
        | Test Steps        | *Enter Test Steps*          |
        | Actual Results    | *Enter Actual Results*      |
        | Expected Results  | *Enter Expected Results*    |
        | CPU Usage         | *Enter CPU Usage*           |
        | Duration          | *Enter Duration*            |
        | Memory Usage      | *Enter Memory Usage*        |
        | Status            | *Enter Status (Pass/Fail)* |
        | Comments          | *Enter Comments*            |
    
    - **Test Summary Report**: Prepare a summary document that aggregates all test results. Include the total number of test cases executed, breakdown of passed/failed cases, key observations, and a concise summary of overall system quality and readiness.
    - **Traceability**: Link each test result to the corresponding requirement or user story to ensure traceability and coverage.
    - **Review & Sign-off**: Share the test result documents and summary with stakeholders for review and sign-off before proceeding to deployment.

## Deployment Best Practices

- Before deploying to production, optimize your deployment environment based on WSO2 MI performance recommendations. Review and implement the [production deployment guidelines](https://mi.docs.wso2.com/en/latest/install-and-setup/setup/deployment-best-practices/production-deployment-guidelines/) to ensure scalability, reliability, and security. Adjust resource allocations, configure JVM parameters, and fine-tune network and storage settings as outlined in the official documentation.

- **Pre-testing Patches**: Always test patches in a dedicated test environment before applying them to production. This helps identify potential issues and ensures compatibility with your integration solutions.

- **Automated Patch Testing**: Use automated test suites such as JMeter or SoapUI to validate the stability and functionality of patched environments. Automate regression and integration tests to quickly detect any breaking changes.

- **Patch Documentation**: Document all patches applied, including version details, test results, and any issues encountered during testing. Maintain a changelog for traceability and future reference.

- **Scheduled Patch Cycles**: Establish a regular patching schedule and communicate planned maintenance windows to stakeholders. Avoid applying patches during peak business hours to minimize disruption.

- **Rollback Strategy**: Prepare a rollback plan in case a patch introduces unexpected issues. Ensure backups and previous versions are available for quick restoration.

- **Security Patches**: Prioritize security patches and apply them promptly to mitigate vulnerabilities. Validate security fixes through targeted penetration and vulnerability tests in the test environment.

## Security Best Practices

- Use [WSO2 Secret Vault](https://mi.docs.wso2.com/en/latest/install-and-setup/setup/security/encrypting-plain-text/) to securely store and manage sensitive information such as API keys, passwords, and certificates in your integration solutions. This approach ensures that secrets are encrypted at rest and only decrypted at runtime, reducing the risk of unauthorized access and enhancing overall security compliance.

## Migration Best Practices

If you are migrating from an older version of WSO2 Micro Integrator (&lt;4.4.0), note that your existing configurations will continue to work. However, it is recommended to migrate to the newer configurations for improved maintainability, performance, and alignment with current best practices.

- The `Out Sequence` in APIs and Proxies is deprecated from version 4.4.0 onwards. Migrate any existing `Out Sequence` logic to the `In Sequence`.  
- `Loopback Mediator` is no longer recommended.
- The use of `Call Mediator` and `Endpoint` for invoking external HTTP services is no longer recommended. Instead, adopt the `HTTP Connector`, which offers enhanced configuration options, better performance, and improved maintainability. Reserve the use of endpoints for non-HTTP protocols or legacy scenarios where connectors are not applicable.
- The `Iterate Mediator` is deprecated. Use the enhanced `ForEach Mediator` (version 2) for all scenarios previously handled by the Iterate or ForEach (version 1) mediators. The updated ForEach mediator provides improved performance, supports parallel processing, enables external service calls, and offers more flexible configuration options. It is the recommended approach for iterating over message elements in integration flows.
- The `Clone Mediator` and `Aggregate Mediator` are no longer recommended. Instead of that, use `Scatter Gather Mediator`.
- The `PayloadFactory Mediator` has been enhanced with new features and improved performance. Migrate any existing `PayloadFactory` configurations to take advantage of these enhancements.

