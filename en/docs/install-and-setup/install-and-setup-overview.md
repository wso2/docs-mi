# Overview

## Install

To install and run the Micro Integrator on a virtual machine, see the topics given below.

<table>
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/install/installing-mi">Installing the Micro Integrator Runtime</a>
        </th>
        <td>
            Explains how to download the Micro Integrator runtime as a binary and install it on a virtual machine.
        </td>
    </tr>   
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/install/running-the-mi">Running the Micro Integrator Runtime</a>
        </th>
        <td>
            Explains how you can execute the Micro Integrator runtime and start using its features.
        </td>
    </tr> 
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/install/installing-mi-as-a-windows-service">Running the Micro Integrator as a Windows Service</a>
        </th>
        <td>
            Explains how to install and run the Micro Integrator as a Windows service.
        </td>
    </tr>
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/install/running-the-mi-in-automation-mode">Running the Micro Integrator in Automation Mode</a>
        </th>
        <td>
            Explains how to run the Micro Integrator in Automation Mode.
        </td>
    </tr>
</table>

To install and run the Integration Control Plane on a virtual machine, see the topics given below.

<table>
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/install/installing-integration-control-plane">Installing the Integration Control Plane</a>
        </th>
        <td>
            Explains how to download the Integration Control Plane as a binary and install it on a virtual machine.
        </td>
    </tr>   
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/install/running-the-integration-control-plane">Running the Integration Control Plane</a>
        </th>
        <td>
            Explains how you can execute the Integration Control Plane and start using its features.
        </td>
    </tr> 
</table>

## Set up

To set up and configure the Micro Integrator runtime, see the topics given below.

<table>
<tr>
    <th>
        <a href="{{base_path}}/install-and-setup/setup/updating-mi">Applying WSO2 Updates</a>
    </th>
    <td>
        Explains how to get the latest updates that are available for a particular release of the Micro Integrator.
    </td>
</tr>
<tr>
    <th>
        Data Stores
    </th>
    <td>
        Explains how to set up a user store, databases (multiple types), and a file-based registry. The topics covered are as follows:
        <ul>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore">Configuring a User Store</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/user-stores/configuring-secondary-user-stores">Configuring Secondary User Stores</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/databases/setting-up-mysql">Setting up a MySQL Database</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/databases/setting-up-mssql">Setting up a MSSQL Database</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/databases/setting-up-oracle">Setting up a Oracle Database</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/databases/setting-up-postgresql">Setting up a Postgre SQL Database</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/databases/setting-up-ibm-db2">Setting up a IBM Database</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/deployment/file-based-registry">Configuring the File-based Registry</a>
            </li>
        </ul>                                                               
    </td>
</tr>
<tr>
    <th>
        Securing the Micro Integrator
    </th>
    <td>
        Covers the different ways in which you can secure the Micro Integrator and the data it handles. The topic covered are as follows:
        <ul>
            <li>
                Setting up Keystores:
                <ul>
                   <li>
                       <a href="{{base_path}}/install-and-setup/setup/security/creating-keystores">Creating New Keystores</a>
                   </li>
                   <li>
                       <a href="{{base_path}}/install-and-setup/setup/security/importing-ssl-certificate">Adding SSL certificates to keystores</a>
                   </li>
                   <li>
                       <a href="{{base_path}}/install-and-setup/setup/security/renewing-ca-signed-certificate-in-keystore">Renewing a CA-signed Certificate</a>
                   </li>
                   <li>
                       <a href="{{base_path}}/install-and-setup/setup/security/configuring-keystores">Configuring Keystores</a>
                   </li>
                </ul>
            </li>
            <li>
                Complying with GDPR:
                <ul>
                <li>
                    <a href="{{base_path}}/install-and-setup/setup/security/gdpr-ei">GDPR for the WSO2 Micro Integrator</a>
                </li>
                <li>
                    <a href="{{base_path}}/install-and-setup/setup/security/about-forgetme-tool">About the Identity Anonymization Tool</a>
                </li>
                </ul>
            </li>
            <li>
                Working with Secrets:
                <ul>
                <li>
                    <a href="{{base_path}}/install-and-setup/setup/security/encrypting-plain-text">Encrypting Secrets using WSO2 Secure Vault</a>
                </li>
                <li>
                    <a href="{{base_path}}/install-and-setup/setup/security/using-hashicorp-secrets">Using Hashicorp Secrets</a>
                </li>
                <li>
                    <a href="{{base_path}}/install-and-setup/setup/security/single-key-encryption">Using Symmetric Encryption</a>
                </li>                                                       
                <li>
                <a href="{{base_path}}/install-and-setup/setup/security/securing-management-api">Securing the Management API</a>
                </li> 
                </ul>
            </li>
        </ul>
    </td>
</tr>
<tr>
    <th>
        Performance
    </th>
    <td>
        Explains how to configure the Micro Integrator at different levels to optimize performance.
        <ul>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/tuning-jvm-performance">Tuning JVM Performance</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/network-os-performance">Tuning Network and OS Performance</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/jdbc-tuning">Tuning JDBC Configurations</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/http-transport-tuning">Tuning the HTTP Transport</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/jms-transport-tuning">Tuning the JMS Transport</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/tuning-the-vfs-transport">Tuning the VFS Transport</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/rabbitmq-transport-tuning">Tuning the RabbitMQ Transport</a>
            </li>
            <li>
                <a href="{{base_path}}/install-and-setup/setup/performance-tuning/tuning-inbound-endpoints">Tuning the Inbound Endpoints</a>
            </li>
        </ul>
    </td>
</tr>
<tr>
    <th>
        Message Brokers
    </th>
    <td>
        Explains how to set up the Micro Integrator component to integrate with message brokers such as RabbitMQ, Kafka, and JMS. The topics covered are as follows:
        <ul>
            <li> 
                AMQP (RabbitMQ):
                <ul>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/deploy-rabbitmq">Deploying RabbitMQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-rabbitmq">Connecting to RabbitMQ</a>
                    </li>  
                </ul>
            </li>
            <li>
                JMS:
                <ul>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-activemq">Connecting to ActiveMQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-apache-artemis">Connecting to Apache Artemis</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-hornetq">Connecting to HornetQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-ibm-websphere-app-server">Connecting to IBM Websphere App Server</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-ibm-webspheremq">Connecting to IBM WebSphere MQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-jbossmq">Connecting to JBoss MQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-msmq">Connecting to MSMQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-swiftmq">Connecting to Swift MQ</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-tibco-ems">Connecting to TIBCO EMS</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-weblogic">Connecting to Weblogic</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-wso2-mb">Connecting to WSO2 MB</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-multiple-brokers">Connecting to Multiple Brokers</a>
                    </li>                                                                                                                                                                
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/feature-configs/configuring-kafka">Kafka</a>
                    </li>
                    <li>
                        <a href="{{base_path}}/install-and-setup/setup/brokers/configure-with-azureservicebus">Azure Service Bus</a>
                    </li>  
                </ul>
            </li>
        </ul>
    </td>
</tr>
<tr>
    <th>
        <a href="{{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports">Transports</a>
    </th>
    <td>
        Explains how to configure the Micro Integrator component to work with a range of transports. These include all the widely used transports including HTTP/S, JMS, VFS, as well as domain-specific transports such as FIX.
    </td>
</tr>
<tr>
    <th>
        <a href="{{base_path}}/install-and-setup/setup/transport-configurations/multi-https-transport">Multi-HTTPS Transport</a>
    </th>
    <td>
        Explains how to enable dynamic SSL profiles for the Micro Integrator component and how to  dynamically load the SSL profiles at runtime using a periodic schedule or JMX invocation.
    </td>
</tr>
<tr>
    <th>
        <a href="{{base_path}}/install-and-setup/setup/message-builders-formatters/message-builders-and-formatters">Message Builders and Formatters</a>
    </th>
    <td>
        When the Micro Integrator receives a request via a mode of transport, the transport uses a **message builder** to process the payload and convert it to SOAP. Similarly, when the Micro Integrator sends a message via a mode of transport, the publishing transport uses a **message formatter** to present the payload in the required format. This section explains how to configure these message builders and message formatters.
    </td>
</tr>
<tr>
    <th>
        <a href="{{base_path}}/install-and-setup/setup/message-builders-formatters/message-relay">Message Relay</a>
    </th>
    <td>
        Enabling message relay allows the Micro Integrator component to to pass messages along without building or processing them unless specifically requested to do so. This way, the Micro Integrator can handle a higher throughput.
    </td>
</tr>
<tr>
    <th>
        <a href="{{base_path}}/observe-and-manage/observe-overview/">Observability</a>
    </th>
    <td>
        There are two possible observability solutions that you can enable for the Micro Integrator component. This section explains how to set them up and well as how to configure logging. The topics covered are as follows:
        <ul>
            <li>
                <a href="{{base_path}}/observe-and-manage/setting-up-cloud-native-observability-on-a-vm">Setting up Grafana based Observability on a VM</a>
            </li>
            <li>
                <a href="{{base_path}}/observe-and-manage/setting-up-cloud-native-observability-in-kubernetes/">Setting up Grafana based Observability on Kubernetes</a>
            </li>
            <li>
                    <a href="{{base_path}}/observe-and-manage/classic-observability-logs/configuring-log4j2-properties">Configuring Logs</a>
            </li>
            <li>
                <a href="{{base_path}}/observe-and-manage/classic-observability-logs/enabling-logs-for-a-component">Enabling Logs for a Component</a>
            </li>
            <li>
                <a href="{{base_path}}/administer/logging-and-monitoring/logging/managing-log-growth">Managing Log Growth</a>
            </li>
            <li>
                <a href="{{base_path}}/administer/logging-and-monitoring/logging/masking-sensitive-information-in-logs">Masking Sensitive Information in Logs</a>
            </li>  
        </ul>
    </td>
</tr>
<tr>
    <th>
        <a href="{{base_path}}/install-and-setup/setup/feature-configs/configuring-timestamp-conversion-for-rdbms">Timestamp Conversion for RDBMS</a>
    </th>
    <td>
        Explains how to enable/disable time stamp conversions for the RDBMS databases configured for the Micro Integrator component.
    </td>
</tr>       
</table>

## Deploy

To deploy the Micro Integrator runtime, see the topics given below.

<table>
    <tr>
        <th> 
            <a href="{{base_path}}/install-and-setup/setup/deployment/deploying-wso2-mi">Configuring a Micro Integrator Cluster</a>
        </th>
        <td>
            Explains how to set up a two-node Micro Integrator cluster.
        </td>
    </tr>
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/setup/deployment/deployment-synchronization">Deployment Synchronization</a>
        </th>
        <td>
            Set up deployment synchronization for the Micro Integrator.
        </td>
    </tr>
</table>

## CI/CD

To implement continuous integration and continuous deployment pipelines for integrations, see the topics given below.

<table>
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/setup/deployment/integration-cicd-overview">CI/CD for Integrations - Overview</a>
        </th>
        <td>
            Find out about the methods of implementing CI/CD for integrations in the Micro Integrator.
        </td>
    </tr>
     <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/setup/deployment/mi-cicd-vm">Building a CI/CD Pipeline for Integrations (VM deployment)</a>
        </th>
        <td>
            See the instructions on how to implement a CI/CD pipeline for integrations in a VM deployment of the Micro Integrator.
        </td>
    </tr>
    <tr>
        <th>
            <a href="{{base_path}}/install-and-setup/setup/deployment/mi-cicd-k8s">Building a CI/CD Pipeline for Integrations (K8s deployment)</a>
        </th>
        <td>
            See the instructions on how to implement a CI/CD pipeline for integrations in a Kubernetes deployment of the Micro Integrator.
        </td>
    </tr>
</table>

To manage integration artifacts and logs in the Micro Integrator by using the Micro Integrator CLI (micli), see the topics given below.

<table>
    <tr>
        <th>   
            <a href="{{base_path}}/observe-and-manage/managing-integrations-with-micli">Managing Integrations</a>
        </th>
        <td>
            Explains how to manage integrations with the MI CLI.
        </td>
    </tr>
</table>

## Upgrade

To upgrade from a WSO2 Enterprise Integrator version, follow the [Upgrade WSO2 Micro Integrator](upgrading-wso2-mi.md) documentation.