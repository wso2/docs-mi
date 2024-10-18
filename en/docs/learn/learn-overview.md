# Overview

See the topics in the following sections for details and instructions.

### Integration Use Cases

Learn about the main integration capabilities of the Micro Integrator. You can also follow the [tutorials](#integration-tutorials) on these use cases to gain hands-on knowledge.

<table>
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/message-routing-overview">Message Routing</a>
        </th>
        <td>
            Explore how messages are routed to different endpoints.
        </td>
    </tr>   
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/message-transformation-overview">Message Transformation</a>
        </th>
        <td>
            Explore how messages are transformed into different formats.
        </td>
    </tr>     
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/data-integration-overview">Data Integration</a>
        </th>
        <td>
            Explore how data from various sources are used during message mediation.
        </td>
    </tr>      
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/file-processing-overview">File Processing</a>
        </th>
        <td>
            Explore how data from file systems are moved and used during message mediation.
        </td>
    </tr>  
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/connectors">SaaS and B2B Connectivity</a>
        </th>
        <td>
            Explore how to integrate with third-party systems using WSO2 connectors.
        </td>
    </tr>  
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/service-orchestration-overview">Service Orchestration</a>
        </th>
        <td>
            Explore how multiple Restful services are exposed as a single coarse-grained service.
        </td>
    </tr>  
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/asynchronous-message-overview">Enterprise Messaging</a>
        </th>
        <td>
            Explore asynchronous messaging patterns using message brokers.
        </td>
    </tr>  
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/scheduled-task-overview">Scheduled Integration Processes</a>
        </th>
        <td>
            Explore how integration processes are scheduled and executed periodically.
        </td>
    </tr>  
    <tr>
        <th>
            <a href="{{base_path}}/learn/integration-use-case/protocol-switching-overview">Protocol Switching</a>
        </th>
        <td>
            Explore how message protocols are changed during message mediation.
        </td>
    </tr>  
</table>

<!--

### Integration Tutorials

Learn how to implement various integration use cases, deploy them in the Micro Integrator, and test them locally.

-->

<!--

-   API-led Integration tutorials

    <table>
    <tr>
        <td>
            <a href="{{base_path}}/learn/integration-tutorials/service-catalog-tutorial">Exposing an Integration Service as a Managed API</a>
        </td>
    </tr>
    <tr>
        <td>
            <a href="{{base_path}}/learn/integration-tutorials/service-catalog-tutorial-for-proxy-services">Exposing an Integration SOAP Service as a Managed API</a>
        </td>
    </tr>
    </table>

-->

<!--
-   Message mediation tutorials

    <table>
        <tr>
            <td>
                <ul>
                    <li><a href="{{base_path}}/learn/integration-tutorials/sending-a-simple-message-to-a-service">Sending a Simple Message to a Service</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/routing-requests-based-on-message-content">Routing Requests based on Message Headers</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/transforming-message-content">Translating Message Formats</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/exposing-several-services-as-a-single-service">Exposing Several Services as a Single Service</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/storing-and-forwarding-messages">Store and Forward Messages for Guaranteed Delivery</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/sending-a-simple-message-to-a-datasource">Exposing Datasources as a Service</a></li>
                </ul>
            </td>
            <td>
                <ul>
                    <li><a href="{{base_path}}/learn/integration-tutorials/file-processing">File Processing</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/using-scheduled-tasks">Periodic Execution of Integration Process</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/using-inbound-endpoints">Using Inbound Endpoints</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/using-templates">Reusing Mediation Sequences</a></li>
                    <li><a href="{{base_path}}/learn/integration-tutorials/sap-integration">Sending Emails from an Integration Service</a></li>
                </ul>
            </td>
        </tr>
    </table>

-->

### Integration Examples

<table>
    <tr>
        <td><b>Message Routing</b> 
            <ul>
                <li><a href="{{base_path}}/learn/examples/routing-examples/routing-based-on-headers">How to route requests based on message content</a></li>
                <li><a href="{{base_path}}/learn/examples/routing-examples/routing-based-on-payloads">How to route requests based on message headers</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Message Transformation</b> 
            <ul>
                <li><a href="{{base_path}}/learn/examples/message-transformation-examples/json-to-soap-conversion">How to transform a JSON message to SOAP</a></li>
                <li><a href="{{base_path}}/learn/examples/message-transformation-examples/pox-to-json-conversion/">How to transform a POX message to JSON</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Asynchronous Messaging</b>
            <li>RabbitMQ Examples
                <ul>
                    <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/point-to-point-rabbitmq">How to implement Point to Point messaging using RabbitMQ</a></li>
                    <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/pub-sub-rabbitmq">How to publish and subscribe with RabbitMQ</a></li>
                    <li>Guaranteed Delivery 
                        <ul>
                            <li><a href="{{base_path}}/learn/integration-tutorials/storing-and-forwarding-messages">How to store and forward messages for guaranteed delivery</a></li>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/retry-delay-failed-msgs-rabbitmq">How to retry failed messages with a delay</a></li>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/requeue-msgs-with-errors-rabbitmq">How to requeue a message preserving the order</a></li>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/move-msgs-to-dlq-rabbitmq">How to publish unacked messages to Dead Letter Exchange</a></li>
                        </ul>
                    </li>
                    <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/request-response-rabbitmq">How to implement Dual Channel scenario with RabbitMQ</a></li>
                </ul>
            </li>
            <li>JMS Examples
                <ul>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/consuming-jms">How to consume JMS Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/producing-jms">How to produce JMS Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/consume-produce-jms">How to consume and produce JMS Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/dual-channel-http-to-jms">How to implement JMS Synchronous Invocations - Dual Channel HTTP-to-JMS</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/quad-channel-jms-to-jms">How to implement JMS Synchronous Invocations - Quad Channel JMS-to-JMS</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/guaranteed-delivery-with-failover">How to implement a guaranteed delivery with failover</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/publish-subscribe-with-jms">How to publish and subscribe with JMS</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/shared-topic-subscription">How to implement Shared Topic Subscription Scenario with JMSn</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/detecting-repeatedly-redelivered-messages">How to detect Repeatedly Redelivered Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/specifying-a-delivery-delay-on-messages">How to specify Delivery Delay on messages</a></li>
                </ul>
            </li>
        </td>
    </tr>
    <tr>
        <td><b>Protocol Switching</b>
            <ul>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-jms-to-http/">How to switch from JMS to HTTP/S</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-https-to-jms">How to switch from HTTP/S to JMS</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-ftp-listener-to-mail-sender">How to switch from FTP Listener to Mail Sender</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-http-to-fix">How to switch from HTTP to FIX</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-fix-to-http">How to switch from FIX to HTTP</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-fix-to-jms">How to switch from FIX to JMS</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-between-fix-versions">How to switch between FIX Versions</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-tcp-to-https">How to switch from TCP to HTTP/S</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-udp-to-https">How to switch from UDP to HTTP/S</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-between-http-and-msmq">How to switch from HTTP to MSMQ</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>File Processing</b> 
            <ul>
                <li><a href="{{base_path}}/learn/integration-tutorials/file-processing">How to process a file using VFS transport</a></li>
                <li><a href="{{base_path}}/learn/examples/file-processing/accessing-windows-share-using-vfs-transport">How to access a Windows Share using VFS transport</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Data Integration</b>
            <ul>
                <li><a href="{{base_path}}/learn/examples/data-integration/rdbms-data-service">How to expose an RDBMS datasource</a></li>
                <li>Exposing Other Datasources
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/data-integration/csv-data-service">How to expose a CSV datasource</a></li>
                        <li><a href="{{base_path}}/learn/examples/data-integration/carbon-data-service">How to expose a Carbon datasource</a></li>
                    </ul>
                </li>
                <li><a href="{{base_path}}/learn/examples/data-integration/json-with-data-service">How to expose data in JSON Format</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/odata-service">How to expose data as an OData Service</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/nested-queries-in-data-service">How to use Nested Data Queries</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/batch-requesting">How to perform Batch Requesting</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/request-box">How to invoke Multiple Operations as a Request Box</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/distributed-trans-data-service">How to use Distributed Transactions in Data Services</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/data-input-validator">How to validate Data Input</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/swagger-data-services">How to use Swagger Documents of RESTful Data Services</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Examples of Components</b>
            <ul>
                <li>REST APIs 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/introduction-rest-api">How to use a simple REST API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/setting-query-params-outgoing-messages">How to set query parameters on outgoing messages</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/enabling-rest-to-soap">How to expose a SOAP Endpoint as a RESTful API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/configuring-non-http-endpoints">How to expose a non-HTTP services as a RESTful API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/handling-non-matching-resources">How to handle non-matching resources</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/setting-https-status-codes">How to handle HTTP status codes</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/transforming-content-type">How to transform content types</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/securing-rest-apis">How to secure a REST API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/publishing-a-swagger-api">How to publish a custom swagger document</a></li>
                        <li>Handling Special Cases
                            <ul> 
                                <li><a href="{{base_path}}/learn/examples/rest-api-examples/special-cases/#get-request-with-a-message-body">How to use GET with a Message Body</a></li>
                                <li><a href="{{base_path}}/learn/examples/rest-api-examples/special-cases/#using-post-with-an-empty-body">How to use POST with Empty Message Body</a></li>
                                <li><a href="{{base_path}}/learn/examples/rest-api-examples/special-cases/#using-post-with-query-parameters">How to use POST with Query Parameters</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Proxy Services 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/introduction-to-proxy-services">How to use a simple Proxy Service</a></li>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/publishing-a-custom-wsdl">How to publish a custom WSDL</a></li>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/exposing-proxy-via-inbound">How to expose a proxy service via inbound endpoints</a></li>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/securing-proxy-services">How to secure a proxy service</a></li>
                    </ul>
                </li>
                <li>Inbound Endpoints 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-jms-protocol">How to use a JMS Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/file-inbound-endpoint">How to use a File Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-http-protocol">How to use an HTTP Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-https-protocol">How to use an HTTPS Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-hl7-protocol-auto-ack">How to use an HL7 Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-mqtt-protocol">How to use an MQTT Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-rabbitmq-protocol">How to use a RabbitMQ Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-kafka">How to use a Kafka Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-secured-websocket">How to use a Secured WebSocket Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-with-registry">How to use an Inbound Endpoints with Registry</a></li>
                    </ul>
                </li>
                <li>Scheduled Tasks 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/scheduled-tasks/task-scheduling-simple-trigger">How to schedule tasks using a simple trigger</a></li>
                        <li><a href="{{base_path}}/learn/examples/scheduled-tasks/injecting-messages-to-rest-endpoint">How to inject messages to a RESTful endpoint</a></li>
                    </ul>
                </li>
                <li><a href="{{base_path}}/learn/examples/registry-examples/local-registry-entries">How to use Sequences and Endpoints as Local Entries</a></li>
                <li>Templates 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/template-examples/using-sequence-templates">How to use a Sequence Template</a></li>
                        <li><a href="{{base_path}}/learn/examples/template-examples/using-endpoint-templates">How to use an Endpoint Templates</a></li>
                    </ul>
                </li>
                <li>Message Stores & Processors 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/intro-message-stores-processors">Introduction to Message Stores and Processors</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-jdbc-message-store">How to use a JDBC Message Store</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-jms-message-stores">How to use a JMS Message Store</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-rabbitmq-message-stores">How to use a RabbitMQ Message Store</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-message-sampling-processor">How to use a Message Sampling Processor</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-message-forwarding-processor">How to use a Message Forwarding Processor</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/securing-message-processor">How to secure the Message Forwarding Processor</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/loadbalancing-with-message-processor">How to do load balancing with Message Forwarding Processor</a></li>
                    </ul>
                </li>
                <li>Endpoints 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-http-endpoints">How to use an HTTP Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-address-endpoints">How to use an Address Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-failover-endpoints">How to use a Failover Endpoints</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-websocket-endpoints">How to use a WebSocket Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-wsdl-endpoints">How to use a WSDL Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-loadbalancing-endpoints">How to use a Load Balance Endpoint</a></li>
                        <li>Recipient List of Endpoints
                            <ul>
                                <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-static-recepient-list-endpoints">How to route messages to a Static List of Recipients</a></li>
                                <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-dynamic-recepient-list-endpoints-1">How to route messages to a Dynamic List of Recipients</a></li>
                                <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-dynamic-recepient-list-endpoints-2">How to route messages to a Dynamic List of Recipients and aggregate responses</a></li>
                            </ul>
                        </li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/reusing-endpoints">How to reuse endpoints</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/endpoint-error-handling">How to do endpoint error handling</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/mtom-swa-with-endpoints">How to do MTOM and SwA Optimizations</a></li>
                    </ul>
                </li>
                <li>Sequences 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/sequence-examples/using-multiple-sequences">How to break complex flows into multiple sequences</a></li>
                        <li><a href="{{base_path}}/learn/examples/sequence-examples/using-fault-sequences">How to use fault sequences</a></li>
                        <li><a href="{{base_path}}/learn/examples/sequence-examples/custom-sequences-with-proxy-services">How to reuse mediation sequences</a></li>
                    </ul>
                </li>
                <li>Transports 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/transport-examples/tcp-transport-examples">How to use the TCP Transport</a></li>
                        <li><a href="{{base_path}}/learn/examples/transport-examples/fix-transport-examples">How to use the FIX Transport</a></li>
                        <li><a href="{{base_path}}/learn/examples/transport-examples/pub-sub-using-mqtt">How to use the MQTT Transport</a></li>
                                        <li><a href="{{base_path}}/learn/examples/file-processing/mailto-transport-examples">How to use the MailTo Transport</a></li>
                    </ul>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li><a href="{{base_path}}/learn/examples/working-with-transactions">How to work with transactions</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li><a href="{{base_path}}/learn/examples/json-examples/json-examples">How to work with JSON Message Payloads</a></li>
            </ul>
        </td>
    </tr>
</table>
