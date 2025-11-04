## Introduction

This guide provides best practices for designing, developing, deploying, and maintaining integration solutions with WSO2 Integrator: MI. It is intended for integration developers, architects, and DevOps engineers aiming to build scalable, secure, and maintainable solutions.

## Development Best Practices

### General development guidelines

- Always use the latest version of the WSO2 Integrator: MI extension for VS Code. It is recommended to update the extension frequently to get the latest features and bug fixes.

- Use the UI provided by the WSO2 Integrator: MI extension for VS Code to create and manage your integration projects. This ensures that your projects are set up correctly and follow best practices. You can use manual editing only for advanced configurations not supported by the UI.

### Create projects

- Create a separate project for each microservice or integration usecase. This approach enhances organization, streamlines artifact management, and facilitates easier maintenance and updates of individual integrations.

- Create a multi-module project for managing multiple related services that need to be deployed together. This allows you to manage dependencies and shared resources effectively.

- Apply semantic versioning to both projects and artifacts to clearly communicate the impact of changes (major, minor, patch). This helps manage updates, track dependencies, and ensure compatibility across integration solutions.
    - Sample versioning scheme: `1.0.1`, `1.1.0`, `2.0.0`
    - Include a changelog (a record of changes) in your project to document updates, improvements, and fixes for each version.

### Naming conventions

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
- Design and implement a [Fault Sequence]({{base_path}}/reference/mediation-sequences/#fault-sequences) for each API to handle errors consistently and provide clear feedback to consumers. Ensure error responses include relevant details such as error codes, messages, and correlation IDs for easier troubleshooting.
- Structure APIs to be intuitive and easy to consume. Define resources and operations following RESTful conventions, and use meaningful HTTP methods and status codes.
- When migrating from older WSO2 MI versions, move logic from the [Out Sequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) to the [In Sequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) to align with current best practices and improve maintainability.

!!!Note
    Migrating logic from the [Out Sequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) to the [In Sequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) is recommended for consistency and future-proofing your integration flows.

## Mediators & Connectors Best Practices

### General mediator usage

- Add a proper description to each mediator to clarify its purpose and usage within the integration flow.
- Prefer the [Variable mediator]({{base_path}}/reference/mediators/variable-mediator/) over the [Property mediator]({{base_path}}/reference/mediators/property-mediator/) for storing intermediate values during message processing. The [Variable Mediator]({{base_path}}/reference/mediators/variable-mediator/) is optimized for temporary data storage and reuse within the integration flow, reducing redundant computations and improving performance.
- Reserve the [Property Mediator]({{base_path}}/reference/mediators/property-mediator/) for controlling message flow, such as setting properties that influence routing, error handling, or other flow-specific logic.
- Use clear, descriptive variable names to enhance the readability and maintainability of your integration logic.
- If you want to repeatedly use the same mediation sequence, define it as a [Sequence]({{base_path}}/reference/mediation-sequences/#named-sequences). You can then invoke this reusable sequence from your main sequence, multiple proxy services, or REST APIs. Use the [Call Sequence mediator]({{base_path}}/reference/mediators/sequence-mediator/) to call the saved sequence, or select it as the [InSequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) or [FaultSequence]({{base_path}}/reference/mediation-sequences/#fault-sequences) when configuring a proxy service or REST API. This approach promotes modularity, reduces duplication, and simplifies maintenance across your integration flows.

### General connector usage

- Reuse shared connections across multiple integrations whenever possible to optimize resource usage and enhance performance. Connection pooling is managed per connection, so minimizing the number of distinct connections helps reduce overhead and improve scalability.
- Create separate connections only when required, such as for high-throughput integrations. Dedicated connections provide isolated connection pools, which can be beneficial for integrations that demand high availability.

### Log mediator

- Use Log mediators as checkpoints in message flows to track and debug integration logic. In development, set the log category to `DEBUG` and configure the global log level for `org.apache.synapse.mediators.builtin.LogMediator` accordingly. Include relevant payload information, request metadata (e.g., user ID, timestamp), and unique identifiers (e.g., correlation IDs) to aid in troubleshooting and tracing requests across services.
- In production, restrict Log mediators to Fault sequences to avoid excessive logging and performance overhead. Always log key error details such as `ERROR_CODE` and use correlation IDs to link related log entries. Place Log mediators within Fault sequences to ensure error information is captured in `wso2carbon.log`. Set the global log level to `INFO` to enable essential troubleshooting without exposing sensitive or verbose information.
- Avoid logging sensitive information, such as user credentials or personal data, to protect privacy and comply with data protection regulations. Use descriptive messages and implement structured logging to capture key attributes and context information in a consistent format. Regularly review and adjust log levels to balance visibility and performance.
- Configure log masking to protect sensitive information in your logs. Follow the [masking sensitive information in logs]({{base_path}}/administer/logging-and-monitoring/logging/masking-sensitive-information-in-logs/) guide to set up appropriate log masking settings and ensure compliance with security and privacy requirements.

### Custom mediator / Ballerina module

- Avoid writing a Class mediator or custom Ballerina module if the required functionality can be achieved using the built-in mediators and connectors of WSO2 Integrator: MI. This reduces maintenance overhead and leverages native features.
    - Review the [Mediator Catalog]({{base_path}}/reference/mediators/about-mediators/) and [Connectors]({{base_path}}/reference/connectors/connectors-overview/) to understand the capabilities of built-in mediators and connectors. This helps ensure you leverage existing features and avoid unnecessary custom development.
- If you must implement a Class mediator or a custom Ballerina module, ensure you understand its performance implications and monitor for potential memory leaks or resource issues.
- Use meaningful and properly structured Java package names for Class mediators, and follow Ballerina module naming conventions for custom modules to maintain clarity and organization.
- Follow standard Java and Ballerina naming conventions and code best practices when developing Class mediators or Ballerina modules to ensure maintainability and readability.
- Document the purpose, usage, and configuration of your custom mediator or Ballerina module to help other developers understand and use them effectively.

### HTTP Connector

- Prefer using the HTTP connector for outbound HTTP calls instead of combining endpoints with Call or Send mediators. The HTTP connector provides a more streamlined, configurable, and maintainable approach, supporting advanced features such as connection, retries, and custom headers. This reduces complexity, and ensures better alignment with WSO2 MI best practices.
- Always use the latest version of the HTTP connector to take advantage of new features.

<!-- TODO: Add Scatter Gather Mediator best practices -->
<!-- ### Scatter Gather Mediator -->



### Foreach mediator

- Whenever possible, enable the `Execute Parallel` property in the ForEach mediator to process iterations concurrently. This can significantly improve performance, especially when handling large datasets or making multiple outbound calls. Ensure that your integration logic is thread-safe and that parallel execution does not introduce race conditions or resource contention.
- Enable the `Continue without aggregation` property in the ForEach mediator to optimize performance. This setting allows the mediator to proceed without waiting for responses from outbound calls made during each iteration, reducing latency and improving throughput in scenarios where response aggregation is not required.


### Message transformation

- **PayloadFactory Mediator**: Use when you need to reconstruct the entire message payload into a simple, fixed format. Ideal for scenarios where only a few parameters are extracted from the original message and the output structure is predictable.

- **For-Each + PayloadFactory Mediator**: Use this combination when the original message contains repetitive segments that need to be transformed individually. The For-Each mediator iterates over each segment, and the PayloadFactory mediator constructs the new format for each segment, similar to the For-Each function in XSLT.

- **Data Mapper Mediator**: Use when you need to change the structure of data in a message or convert one data format to another.

- **Enrich Mediator**: Use when only a small part of the message needs to be modified, such as adding or removing an element, without reconstructing the entire payload.

- **XSLT Mediator**: Use for complex transformation logic, including repetitive segments and conditional transformations. Note that XSLT transformations are handled by a third-party engine, which may impact performance.

- **JSON Transform Mediator Best Practices**:
    - Use the JSON Transform mediator when you need to convert XML payloads to JSON or transform JSON structures within your integration flows. This mediator allows you to define transformation properties locally, enabling scenario-specific configurations rather than relying on global settings.
    - Leverage the ability to specify a JSON schema in the mediator to validate and correct payloads during transformation. This helps ensure data consistency and prevents errors caused by schema mismatches.

!!!Note
    When using the XSLT mediator, be aware of potential performance impacts due to the use of a third-party transformation engine.


### Expression & data handling

- Prefer the [Synapse Expression Language]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/) for all JSON data manipulation and transformation tasks. It offers enhanced flexibility, and broader feature support compared to legacy `XPath` and `JSONPath` expressions.
- Use legacy expressions only when maintaining existing integrations that depend on them, or if a required feature is unavailable in the Synapse Expression Language.
- Regularly review and refactor older integrations to migrate to Synapse Expression Language where feasible, ensuring consistency and maintainability across your projects.
- Document any use of legacy expressions, noting the reason for their inclusion and any limitations, to aid future maintenance and upgrades.

<!-- TODO: Add error handling best practices -->
<!-- ## Error Handling Best Practices -->

## Testing & quality best practices

- **Test Strategy & Planning**: Define a comprehensive test strategy for each project, outlining what needs to be tested, including functional, integration, performance, and security aspects.
- **Test Plan Creation**: Develop detailed test plans covering all functional scenarios, edge cases, and performance requirements. Include both positive and negative test cases.
- **WSO2 MI: Integrator Unit Testing**: WSO2 Integrator: MI offers built-in support for unit testing mediation sequences. Develop [unit tests for your integrations]({{base_path}}/develop/creating-unit-test-suite/) to validate individual mediation logic, catch errors early, and ensure ongoing quality as your integration evolves.
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

If you are migrating from an older version of WSO2 Integrator: MI (&lt;4.4.0), your existing configurations and mediators will continue to work in newer MI versions. Migration is optional, only perform it if you want to take advantage of usability and maintainability improvements. If your current mediators meet your requirements and you are satisfied with their behavior, you may continue using them without changes.

For future implementations, adopt the newer mediators and connectors (for example, HTTP Connector, new ForEach, Scatter‑Gather, and the new PayloadFactory) to benefit from improved usability and maintainability.

- The [Out Sequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) in APIs and Proxies are not created by MI VS Code extension by default from version 4.4.0 onwards. Implement the necessary logic in the [In Sequence]({{base_path}}/reference/mediation-sequences/#inout-sequences) to handle outgoing messages.

    ??? "OutSequence Migration Sample"

        === "Legacy Configuration"
            ```xml
            <api context="/weather" name="WeatherAPI" xmlns="http://ws.apache.org/ns/synapse">
                <resource methods="GET" uri-template="/?city={city}">
                    <inSequence>
                        <payloadFactory media-type="json" template-type="default">
                            <format>{city: "$1", "apiKey": "$2"}</format>
                            <args>
                                <arg value="get-property('query.param.city')" evaluator="xml" />
                                <arg value="wso2:vault-lookup('weather_api_key')" evaluator="xml" />
                            </args>
                        </payloadFactory>
                        <send>
                            <endpoint key="WeatherAPI"/>
                        </send>
                    </inSequence>
                    <outSequence>
                        <respond/>
                    </outSequence>
                    <faultSequence/>
                </resource>
            </api>
            ```

        === "New Configuration"
            ```xml
            <api context="/weather" name="WeatherAPI" xmlns="http://ws.apache.org/ns/synapse">
                <resource methods="GET" uri-template="/?city={city}">
                    <inSequence>
                        <payloadFactory media-type="json" template-type="default">
                            <format>{city: "$1", "apiKey": "$2"}</format>
                            <args>
                                <arg value="get-property('query.param.city')" evaluator="xml" />
                                <arg value="wso2:vault-lookup('weather_api_key')" evaluator="xml" />
                            </args>
                        </payloadFactory>
                        <http.post configKey="WeatherAPIConnection">
                            <relativePath></relativePath>
                            <headers>[]</headers>
                            <requestBodyType>JSON</requestBodyType>
                            <requestBodyJson>${payload}</requestBodyJson>
                            <forceScAccepted>false</forceScAccepted>
                            <disableChunking>false</disableChunking>
                            <forceHttp10>false</forceHttp10>
                            <noKeepAlive>false</noKeepAlive>
                            <forcePostPutNobody>false</forcePostPutNobody>
                            <responseVariable>http_post_1</responseVariable>
                            <overwriteBody>true</overwriteBody>
                        </http.post>
                        <respond/>
                    </inSequence>
                    <faultSequence/>
                </resource>
            </api>
            ```

- [Loopback Mediator]({{base_path}}/reference/mediators/loopback-mediator/) is no longer recommended.
- Use the [HTTP Connector]({{base_path}}/reference/connectors/http-connector/http-connector-overview/) to invoke external HTTP services instead of the [Call Mediator]({{base_path}}/reference/mediators/call-mediator/) / [Send Mediator]({{base_path}}/reference/mediators/send-mediator/) / [CallOut Mediator]({{base_path}}/reference/mediators/callout-mediator/). The HTTP Connector provides richer configuration options, and better maintainability. Reserve [Call Mediator]({{base_path}}/reference/mediators/call-mediator/) / [Send Mediator]({{base_path}}/reference/mediators/send-mediator/) / [CallOut Mediator]({{base_path}}/reference/mediators/callout-mediator/) for non-HTTP protocols (such as VFS, RabbitMQ, JMS etc.) or legacy scenarios where connectors are not applicable.

    ??? "Call Endpoint to HTTP Connector Migration"

        - The [HTTP Connector]({{base_path}}/reference/connectors/http-connector/http-connector-overview/) exposes built‑in configuration options that replace many values previously set using the Property mediator.
        - Set these options on the connector operation itself (for example: headers, noKeepAlive etc.), since applying them via Property mediators for HTTP connector is not supported.

        See the example migration below.

        === "Legacy Configuration"

            ```xml
            <api context="/weather" name="WeatherAPI" xmlns="http://ws.apache.org/ns/synapse">
                <resource methods="GET">
                    <inSequence>
                        <property name="NO_KEEPALIVE" value="true" scope="axis2"/>
                        <call>
                            <endpoint key="WeatherEndpoint"/>
                        </call>
                    </inSequence>
                    <faultSequence/>
                </resource>
            </api>
            ```

            ```xml
            <endpoint name="WeatherEndpoint" xmlns="http://ws.apache.org/ns/synapse">
                <http method="get" uri-template="http://weatherapi.com/v1/current.json?key=YOUR_API_KEY&amp;q=London">
                    <suspendOnFailure>
                        <initialDuration>-1</initialDuration>
                        <progressionFactor>1</progressionFactor>
                    </suspendOnFailure>
                    <markForSuspension>
                        <retriesBeforeSuspension>0</retriesBeforeSuspension>
                    </markForSuspension>
                </http>
            </endpoint>
            ```

        === "New Configuration"

            ```xml
            <api context="/weather" name="WeatherAPI" xmlns="http://ws.apache.org/ns/synapse">
                <resource methods="GET">
                    <inSequence>
                        <http.get configKey="WeatherAPIConnection">
                            <relativePath>/</relativePath>
                            <headers>[]</headers>
                            <forceScAccepted>false</forceScAccepted>
                            <disableChunking>false</disableChunking>
                            <forceHttp10>false</forceHttp10>
                            <noKeepAlive>true</noKeepAlive>
                            <responseVariable>http_get_1</responseVariable>
                            <overwriteBody>true</overwriteBody>
                        </http.get>
                        <respond />
                    </inSequence>
                    <faultSequence/>
                </resource>
            </api>
            ```

            ```xml
            <localEntry key="WeatherAPIConnection" xmlns="http://ws.apache.org/ns/synapse">
                <http.init>
                    <connectionType>HTTP</connectionType>
                    <baseUrl>http://weatherapi.com/v1/current.json?key=YOUR_API_KEY&amp;q=London</baseUrl>
                    <authType>None</authType>
                    <timeoutAction>Never</timeoutAction>
                    <retryCount>0</retryCount>
                    <retryDelay>0</retryDelay>
                    <suspendInitialDuration>-1</suspendInitialDuration>
                    <suspendProgressionFactor>1</suspendProgressionFactor>
                    <name>WeatherAPIConnection</name>
                </http.init>
            </localEntry>
            ```

- Use the new [ForEach Mediator]({{base_path}}/reference/mediators/foreach-mediator/) for all scenarios previously handled by the Iterate Mediator or older ForEach. It supports parallel execution, enables external service calls, and offers more flexible configuration.

    ??? "Iterate to ForEach Migration"
        Map Iterate mediator attributes to new ForEach mediator equivalents as follows:
        <table>
            <thead>
                <tr>
                    <th>Iterate attribute / element</th>
                    <th>Foreach attribute / element mapping</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>id="123"</code></td>
                    <td>Not needed anymore.</td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>expression="json-eval(\$.)"</code></td>
                    <td><code>collection="${payload}"</code></td>
                    <td>Convert JSONPath/XPath evaluated expression to [Synapse expression]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/) referencing the iteration collection.</td>
                </tr>
                <tr>
                    <td><code>sequential="true|false"</code></td>
                    <td><code>parallel-execution="true|false"</code></td>
                    <td>Map sequential to parallel-execution (set <code>parallel-execution="true"</code> when <code>sequential="false"</code> to enable concurrent processing; set <code>parallel-execution="false"</code> when <code>sequential="true"</code> to preserve ordering).</td>
                </tr>
                <tr>
                    <td><code>continueParent="true|false"</code></td>
                    <td>N/A</td>
                    <td>This is not applicable as all iterations are aggregated in the foreach mediator itself.</td>
                </tr>
                <tr>
                    <td><code>preservePayload="true|false"</code></td>
                    <td><code>update-original="true|false"</code></td>
                    <td>For details on output aggregation and related options, see [ForEach mediator output configurations]({{base_path}}/reference/mediators/foreach-mediator/#output-configurations).</td>
                </tr>
                <tr>
                    <td><code>attachPath="true|false"</code></td>
                    <td>N/A</td>
                    <td>Attach path is no longer supported. Please use [Enrich mediator]({{base_path}}/reference/mediators/enrich-mediator/) after the foreach mediator.</td>
                </tr>
            </tbody>
        </table>

        See the example migration below.

        === "Legacy Configuration"

            ```xml
            <iterate expression="json-eval($.)">
                <target>
                    <sequence>
                        <call>
                            <endpoint key="PlaceOrderEndpoint"/>
                        </call>
                    </sequence>
                </target>
            </iterate>
            ```

            ```xml
            <endpoint name="PlaceOrderEndpoint" xmlns="http://ws.apache.org/ns/synapse">
                <http method="get" uri-template="http://localhost:8290/orderapi/placeOrder">
                    <suspendOnFailure>
                        <initialDuration>-1</initialDuration>
                        <progressionFactor>1</progressionFactor>
                    </suspendOnFailure>
                    <markForSuspension>
                        <retriesBeforeSuspension>0</retriesBeforeSuspension>
                    </markForSuspension>
                </http>
            </endpoint>
            ```
        
        === "New Configuration"

            ```xml
            <foreach collection="${payload}" parallel-execution="false" update-original="true" continue-without-aggregation="false">
                <sequence>
                    <http.get configKey="OrderAPIConnection">
                        <relativePath>/placeOrder</relativePath>
                        <headers>[]</headers>
                        <forceScAccepted>false</forceScAccepted>
                        <disableChunking>false</disableChunking>
                        <forceHttp10>false</forceHttp10>
                        <noKeepAlive>false</noKeepAlive>
                        <responseVariable>http_get_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </http.get>
                </sequence>
            </foreach>
            ```

            ```xml
            <localEntry key="OrderAPIConnection" xmlns="http://ws.apache.org/ns/synapse">
            <http.init>
                <connectionType>HTTP</connectionType>
                <baseUrl>http://localhost:8290/orderapi</baseUrl>
                <authType>None</authType>
                <timeoutAction>Never</timeoutAction>
                <retryCount>0</retryCount>
                <retryDelay>0</retryDelay>
                <suspendInitialDuration>-1</suspendInitialDuration>
                <suspendProgressionFactor>1</suspendProgressionFactor>
                <name>OrderAPIConnection</name>
            </http.init>
            </localEntry>
            ```

    ??? "Legacy Foreach to New Foreach Migration"

        <table>
            <thead>
                <tr>
                    <th>Legacy attribute / element</th>
                    <th>New attribute / element</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>id="123"</code></td>
                    <td>Not needed anymore.</td>
                    <td>The [current iteration number]({{base_path}}/reference/mediators/foreach-mediator/#advanced-configurations) can be accessed using a variable in the new foreach mediator.</td>
                </tr>
                <tr>
                    <td><code>expression="json-eval(\$.items)"</code></td>
                    <td><code>collection="\${payload.items}"</code></td>
                    <td>Convert JSONPath/XPath evaluated expression to [Synapse expression]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/) referencing the iteration collection.</td>
                </tr>
                <tr>
                    <td>N/A</td>
                    <td><code>parallel-execution="false|true"</code></td>
                    <td>Set <code>parallel-execution="false"</code> when migrating from legacy sequential processing.</td>
                </tr>
                <tr>
                    <td>N/A</td>
                    <td><code>continue-without-aggregation="false|true"</code></td>
                    <td>Set <code>continue-without-aggregation="true"</code> to maintain legacy behavior.</td>
                </tr>
                <tr>
                    <td>N/A</td>
                    <td><code>update-original="true|false"</code></td>
                    <td>Set <code>update-original="false"</code> to maintain legacy behavior.</td>
                </tr>
            </tbody>
        </table>

        See the example migration below.

        === "Legacy Configuration"

            ```xml
            <foreach expression="json-eval($.)">
                <sequence>
                    <payloadFactory media-type="json" template-type="default">
                        <format>{
                            "id": "$1",
                            "count": "$2"
                            }</format>
                        <args>
                            <arg expression="json-eval($.id)" evaluator="json"/>
                            <arg expression="json-eval($.count)" evaluator="json"/>
                        </args>
                    </payloadFactory>
                </sequence>
            </foreach>
            ```

        === "New Configuration"

            ```xml
            <foreach collection="${payload}" parallel-execution="false" update-original="false" continue-without-aggregation="true">
                <sequence>
                    <payloadFactory media-type="json" template-type="default">
                        <format>{
                            "id": "${payload.id}",
                            "count": "${payload.count}"
                            }</format>
                    </payloadFactory>
                </sequence>
            </foreach>
            ```

- Use the [Scatter Gather Mediator]({{base_path}}/reference/mediators/scatter-gather-mediator/) instead of the [Clone Mediator]({{base_path}}/reference/mediators/clone-mediator/) and the [Aggregate Mediator]({{base_path}}/reference/mediators/aggregate-mediator/), which are no longer recommended.

    ??? "Clone & Aggregate to Scatter Gather Migration Sample"

        The Scatter Gather mediator replaces the need for separate Clone and Aggregate mediators.

        The table below maps Clone mediator attributes to their corresponding Scatter Gather mediator attributes.
        <table>
            <thead>
                <tr>
                    <th>Legacy Clone mediator attribute</th>
                    <th>Scatter Gather mediator attribute</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>id="123"</code></td>
                    <td>N/A</td>
                    <td>This is not applicable as the cloned message responses are aggregated in the Scatter Gather mediator itself.</td>
                </tr>
                <tr>
                    <td><code>sequential="true|false"</code></td>
                    <td><code>parallel-execution="true|false"</code></td>
                    <td>Set <code>parallel-execution="false"</code> when migrating from legacy sequential processing.</td>
                </tr>
                <tr>
                    <td><code>continueParent="true|false"</code></td>
                    <td>N/A</td>
                    <td>This is not applicable as all cloned messages are aggregated in the Scatter Gather mediator itself.</td>
                </tr>
            </tbody>
        </table>

        The table below maps Aggregate mediator attributes to their corresponding Scatter Gather mediator attributes.
        <table>
            <thead>
                <tr>
                    <th>Legacy Aggregate mediator attribute</th>
                    <th>Scatter Gather mediator attribute</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <tr>
                        <td><code>id="123"</code></td>
                        <td>N/A</td>
                        <td>Scatter Gather mediator aggregates responses internally, so an explicit id for aggregation is unnecessary.</td>
                    </tr>
                </tr>
                <tr>
                    <td><code>&lt;onComplete expression="json-eval(\$)" /&gt;</code></td>
                    <td><code>&lt;aggregation expression="\${payload}"&gt;</code></td>
                    <td>Convert JSONPath/XPath evaluated expression to [Synapse expression]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/).</td>
                </tr>
                <tr>
                    <td><code>timeout</code></td>
                    <td><code>timeout</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Message Count: <code>min</code></td>
                    <td><code>min-messages</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Message Count: <code>max</code></td>
                    <td><code>max-messages</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>&lt;correlateOn expression="xpath | json-eval(JSON-Path)" /&gt;</code></td>
                    <td><code>condition="expression"</code></td>
                    <td>Convert JSONPath/XPath evaluated expression to [Synapse expression]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/).</td>
                </tr>
            </tbody>
        </table>

        See the example migration below.

        === "Legacy Configuration"

            ```xml
            <clone>
                <target>
                    <sequence>
                        <call>
                            <endpoint key="vendorA"/>
                        </call>
                    </sequence>
                </target>
                <target>
                    <sequence>
                        <call>
                            <endpoint key="vendorB"/>
                        </call>
                    </sequence>
                </target>
            </clone>
            ```

            ```xml
            <aggregate>
                <completeCondition>
                    <messageCount max="-1" min="-1"/>
                </completeCondition>
                <onComplete aggregateElementType="root" expression="json-eval($)">
                    <enrich description="">
                        <source clone="true" type="custom" xpath="$body//jsonArray/jsonElement[not(last &gt; $body//jsonArray/jsonElement/last)]"/>
                        <target action="replace" type="property" property="enrichedres"/>
                    </enrich>
                    <payloadFactory media-type="json">
                        <format>$1</format>
                        <args>
                            <arg expression="get-property('enrichedres')" evaluator="xml"/>
                        </args>
                    </payloadFactory>
                    <respond/>
                </onComplete>
            </aggregate>
            ```

        === "New Configuration"

            ```xml
            <scatter-gather parallel-execution="false" target="Body" result-content-type="JSON">
                <aggregation expression="${payload}"/>
                <sequence>
                    <http.get configKey="VendorA_Connection">
                        <relativePath>/getQuote</relativePath>
                        <headers>[]</headers>
                        <forceScAccepted>false</forceScAccepted>
                        <disableChunking>false</disableChunking>
                        <forceHttp10>false</forceHttp10>
                        <noKeepAlive>false</noKeepAlive>
                        <responseVariable>http_get_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </http.get>
                </sequence>
                <sequence>
                    <http.get configKey="VendorB_Connection">
                        <relativePath>/getQuote</relativePath>
                        <headers>[]</headers>
                        <forceScAccepted>false</forceScAccepted>
                        <disableChunking>false</disableChunking>
                        <forceHttp10>false</forceHttp10>
                        <noKeepAlive>false</noKeepAlive>
                        <responseVariable>http_get_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </http.get>
                </sequence>
            </scatter-gather>
            <payloadFactory media-type="json" template-type="default">
                <format xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">${xpath("$body//jsonArray/jsonElement[not(last &gt; $body//jsonArray/jsonElement/last)]")}</format>
            </payloadFactory>
            <respond/>
            ```

- Use the new [PayloadFactory Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/) which has been enhanced with templating support.

    ??? "Payload Factory Migration"

        The new PayloadFactory mediator supports inline templating. You can insert [Synapse expressions]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/) directly in the format string (for example, `${payload.id}`) and remove the `<args>` block and `$1/$2` placeholders. This simplifies templates, improves readability, and avoids the need to define separate `args` entries when converting legacy payloads to the new templating style.

        See the example migration below.

        === "Legacy Configuration"

            ```xml
            <payloadFactory media-type="json" template-type="default">
                <format>{
                    "id": "$1",
                    "count": "$2"
                    }</format>
                <args>
                    <arg expression="$ctx:id" evaluator="xml"/>
                    <arg expression="$ctx:count" evaluator="xml"/>
                </args>
            </payloadFactory>
            ```
        === "New Configuration"

            ```xml
            <payloadFactory media-type="json" template-type="default">
                <format>{
                    "id": "${payload.id}",
                    "count":"${payload.count}"
                    }</format>
            </payloadFactory>
            ```

- Use the new [Log Mediator]({{base_path}}/reference/mediators/log-mediator/) which has been enhanced with templating support.

    ??? "Log Mediator Migration"

        The `level` attribute is removed from the new log mediator. Set <code>logFullPayload="true"</code> to achieve the same behavior as <code>level="full"</code>.

        See the example migration below.

        === "Legacy Configuration"

            ```xml
            <log category="INFO" level="simple">
                <property name="Name" expression="$ctx:name"/>
            </log>
            ```
        === "New Configuration"

            ```xml
            <log category="INFO" logMessageID="true" logFullPayload="false">
                <property name="Name" expression="$ctx:name"/>
            </log>
            ```