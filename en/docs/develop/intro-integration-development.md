# Developing Integration Solutions

The contents on this page will walk you through the topics related to developing integration solutions using WSO2 Micro Integrator extension for Visual Studio Code: MI for VS Code.

## Micro Integrator for Visual Studio Code (MI for VS Code)

MI for VS Code is the comprehensive developer tool, which you will use to <b>develop</b>, <b>build</b>, and <b>test</b> your integration solutions before the solutions are pushed to your production environments. See the topics given below for details.

<table>
    <tr>
        <td>
            <a href="{{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/">Overview of MI for VS Code extension</a>
        </td>
        <td>
            Get introduced to the main functions of MI for VS Code.
        </td>
    </tr>
    <tr>
        <td>
            <a href="{{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode">Installing MI for VS Code extension</a>
        </td>
        <td>
            Find the instructions on how to download and install the MI for VS Code on your operating system.
        </td>
    </tr>
    <tr>
        <td>
            <a href="{{base_path}}/develop/mi-for-vscode/troubleshooting-mi-for-vscode">Troubleshooting MI for VS Code extension</a>
        </td>
        <td>
            Find details on how to troubleshoot errors you might encounter as you use MI for VS Code.
        </td>
    </tr>
</table>

## Development workflow

Integration developers will follow the workflow illustrated by the following diagram.

![developer workflow]({{base_path}}/assets/img/integrate/development_workflow.png)

### Set up the workspace

To start developing integration solutions, you need to first <a href="{{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/">install and set up Mico Integrator VS Code extension</a>.

### Develop

-   <a href="{{base_path}}/develop/create-integration-project/#integration-project">Create an Integration project</a>: An integration project will include all the artifacts of your integration solution.

-   Create artifacts

    <table>
        <tr>
            <td>
                <b>Message Entry Points</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-an-api/">REST API</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-a-proxy-service/">Proxy Service</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-an-inbound-endpoint/">Inbound Endpoint</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-scheduled-task/">Scheduled Task</a>
                    </li>
                </ul>
            </td>
            <td>
                <b>Message Processing Units</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-a-message-store/">Message Store</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-a-message-processor/">Message Processor</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-endpoints/">Endpoint</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-endpoint-templates/">Endpoint Template</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-sequence-templates/">Sequence Template</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-reusable-sequences/">Reusable Sequences</a>
                    </li>
                </ul>
            </td>
            <td>
                <b>Registry Resources</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/creating-registry-resources/">Registry Resource</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries/">Local Entry</a>
                    </li>
                </ul>
            </td>
        <tr>
            <td>
                <b>Data Services Resources</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/data-services/creating-data-services/">Data Service</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/data-services/creating-datasources/">Datasource</a>
                    </li>
                </ul>
            </td>
            <td>
                <b>Custom Artifacts</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/customizations/creating-custom-mediators/">Custom Mediator</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/customizations/creating-custom-inbound-endpoint/">Custom Inbound Endpoint</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/customizations/creating-new-connector/">Custom Connector</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/customizations/creating-custom-task-scheduling/">Custom Scheduled Task</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/customizations/creating-synapse-handlers/">Synapse Handler</a>
                    </li>
                </ul>
            </td>
            <td>
                <b>Other</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/exporting-artifacts/">Export Artifacts</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/importing-artifacts/">Import Artifacts</a>
                    </li>
                </ul>
            </td>
        </tr>
    </table>

-   Secure the artifacts

    <table>
        <tr>
            <td>
                <b>Encrypting Sensitive Data</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/security/encrypting-plain-text/">Encrpting Secrets</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/using-docker-secrets/">Docker Secrets</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/using-k8s-secrets/">Kubernetes Secrets</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/security/single-key-encryption/">Symmetric Encryption</a>
                    </li>
                </ul>
            </td>
            <td>
                <b>Securing APIs and Services</b>
                <ul>
                    <li>
                        <a href="{{base_path}}/develop/advanced-development/applying-security-to-an-api/">Securing REST APIs</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/advanced-development/applying-security-to-a-proxy-service/">Securing Proxy Services</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/develop/creating-artifacts/data-services/securing-data-services/">Securing Data Services</a>
                    </li>
                </ul>
            </td>
        </tr>
    </table>

### Build and run

1.  <a href="{{base_path}}/develop/packaging-artifacts">Package</a>

    The artifacts and modules should be packaged in a <b>Composite Exporter</b> before they can be deployed in any environment.

2.  <a href="{{base_path}}/develop/deploy-artifacts">Deploy</a>

    You can easily deploy and try out the packaged integration artifacts on your preferred environment:

    <table>
        <tr>
            <td>
                <ul>
                    <li>
                        Deploy on the <a href="{{base_path}}/develop/using-embedded-micro-integrator">Embedded Micro Integrator</a>
                    </li>
                    <li>
                        Deploy on a <a href="{{base_path}}/develop/using-remote-micro-integrator">Remote Micro Integrator</a>
                    </li>
                </ul>
            </td>
        </tr>
    </table>

3.  <a href="{{base_path}}/develop/creating-unit-test-suite/#run-unit-test-suites">Unit Tests</a>

    Use the <b>integration test suite</b> of MI for VS Code to run unit tests on the developed integration solution.

### Iterate and improve

As you build and run the integration flow, you may identify errors that need to be fixed, and changes that need to be done to the synapse artifacts.

<table>
    <tr>
        <td>
            Debug Mediations
        </td>
        <td>
            Use the <a href="{{base_path}}/develop/debugging-mediation">Mediation Debug</a> function in MI for VS Code to debug errors while you develop the integration solutions.
        </td>
    </tr>
    <tr>
        <td>
            Using Logs
        </td>
        <td>
            You can enable and analyze the following logs to debug various errors:
            <ul>
                <li>
                    <a href="{{base_path}}/develop/using-wire-logs">Wire Logs</a>
                </li>
                <li>
                    <a href="{{base_path}}/develop/monitoring-service-level-logs">Proxy Service Access Logs</a>
                </li>
                <li>
                    <a href="{{base_path}}/develop/monitoring-api-level-logs">REST API Access Logs</a>
                </li>
            </ul>
        </td>
    </tr>
</table>

You must redeploy the integration artifacts after applying changes.

-   If you are testing on a VM, the artifacts will be instantly deployed when you <a href="{{base_path}}/develop/deploy-artifacts">redeploy the synapse artifacts</a>.
-   If you are testing on containers, you need to rebuild the <a href="{{base_path}}/develop/deploy-artifacts/#build-docker-image">Docker images</a>.

### Push to production

It is recommended to use a <b>CI/CD pipeline</b> to deploy your tested integration solutions in the production environment.

<table>
    <tr>
        <td>
            <b>On-Premise Environment</b>
        </td>
        <td>
            You can easily push your integration solutions to a CI/CD pipeline.
        </td>
    </tr>
</table>

## Related topics

<table>
    <tr>
        <td>
            <b><a href="{{base_path}}/learn/learn-overview/#integration-use-cases">Integration Use Cases</a></b>
        </td>
        <td>
            Read about the integration use cases supported by the Micro Integrator.
        </td>
    </tr>
    <tr>
        <td>
            <b><a href="{{base_path}}/learn/learn-overview/#integration-examples">Tutorials</a></b>
        </td>
        <td>
            Develop and try out each integration use case end-to-end.
        </td>
    </tr>
    <tr>
        <td>
            <b><a href="{{base_path}}/learn/learn-overview/#integration-examples">Examples</a></b>
        </td>
        <td>
            Try out specific integration scenarios by running the samples.
        </td>
    </tr>
</table>
