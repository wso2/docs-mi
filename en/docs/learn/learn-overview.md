# Overview

See the topics in the following sections for details and instructions.

### Integration Use Cases

Learn about the main integration capabilities of the Micro Integrator of WSO2 API Manager. You can also follow the [tutorials](#integration-tutorials) on each of these use cases to gain hands-on knowledge.

<div>
    <div class="content">
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/message-routing-overview';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">Message Routing</p>
                <p class="hint">Explore how messages are routed to different endpoints.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/message-routing-overview';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">Message Transformation</p>
                <p class="hint">Explore how messages are transformed into different formats.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/data-integration-overview';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">Data Integration</p>
                <p class="hint">Explore how data from various sources are used during message mediation.</p>
            </div>
        </div>
        <!-- end card -->
    </div>
    <div class="content">
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/file-processing-overview';">
            <div class="line"></div>
            <div class="card-content">
                <p class="title">File Processing</p>
                <p class="hint">Explore how data from file systems are moved and used during message mediation.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/connectors';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">SaaS and B2B Connectivity</p>
                <p class="hint">Explore how to integrate with third-party systems using WSO2 connectors.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/service-orchestration-overview';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">Service Orchestration</p>
                <p class="hint">Explore how multiple Restful services are exposed as a single course-grained service.</p>
            </div>
        </div>
        <!-- end card -->
    </div>
    <div class="content">
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/asynchronous-message-overview';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">Enterprise Messaging</p>
                <p class="hint">Explore asynchronous messaging patterns using message brokers.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/scheduled-task-overview';">
            <div class="line"></div>
            <div class="card-content" >
                <p class="title">Scheduled Integration Processes</p>
                <p class="hint">Explore how integration processes are scheduled and executed periodically.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card" onclick="location.href='{{base_path}}/learn/integration-use-case/protocol-switching-overview';">
            <div class="line"></div>
            <div class="card-content">
                <p class="title">Protocol Switching</p>
                <p class="hint">Explore how message protocols are changed during message mediation.</p>
            </div>
        </div>
        <!-- end card -->
    </div>
</div>

### Integration Tutorials

Learn how to implement various integration use cases, deploy them in the Micro Integrator, and test them locally.

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

### Integration Examples

<table>
    <tr>
        <td><b>Message Routing</b> 
            <ul>
                <li><a href="{{base_path}}/learn/examples/routing-examples/routing-based-on-headers">Routing Based on Message Headers</a></li>
                <li><a href="{{base_path}}/learn/examples/routing-examples/routing-based-on-payloads">Routing Based on Message Payload</a></li>
                <li><a href="{{base_path}}/learn/examples/routing-examples/splitting-aggregating-messages">Splitting Messages and Aggregating Responses</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Message Transformation</b> 
            <ul>
                <li><a href="{{base_path}}/learn/examples/message_transformation_examples/json-to-soap-conversion">Converting JSON Messages to SOAP</a></li>
                <li><a href="{{base_path}}/learn/examples/message_transformation_examples/pox-to-json-conversion/">Converting POX Messages to JSON</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Asynchronous Messaging</b>
            <li>RabbitMQ Examples
                <ul>
                    <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/point-to-point-rabbitmq">Point to Point</a></li>
                    <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/pub-sub-rabbitmq">Publish/Subscribe</a></li>
                    <li>Guaranteed Delivery 
                        <ul>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/store-forward-rabbitmq">Message Store and Message Processor</a></li>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/retry-delay-failed-msgs-rabbitmq">Retry failed messages with a delay</a></li>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/requeue-msgs-with-errors-rabbitmq">Requeue a message preserving the order</a></li>
                            <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/move-msgs-to-dlq-rabbitmq">Publish messages to DLX</a></li>
                        </ul>
                    </li>
                    <li><a href="{{base_path}}/learn/examples/rabbitmq-examples/request-response-rabbitmq">Dual Channel</a></li>
                </ul>
            </li>
            <li>JMS Examples
                <ul>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/consuming-jms">Consuming JMS Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/producing-jms">Producing JMS Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/consume-produce-jms">Consuming and Producing JMS Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/dual-channel-http-to-jms">Dual Channel HTTP-to-JMS</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/quad-channel-jms-to-jms">Quad Channel JMS-to-JMS</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/guaranteed-delivery-with-failover">Guaranteed Delivery with Failover</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/publish-subscribe-with-jms">Publish and Subscribe with JMS</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/shared-topic-subscription">Shared Topic Subscription</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/detecting-repeatedly-redelivered-messages">Detecting Repeatedly Redelivered Messages</a></li>
                    <li><a href="{{base_path}}/learn/examples/jms-examples/specifying-a-delivery-delay-on-messages">Specifying Delivery Delay on Messages</a></li>
                </ul>
            </li>
        </td>
    </tr>
    <tr>
        <td><b>Protocol Switching</b>
            <ul>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-JMS-to-HTTP/">Switching from JMS to HTTP/S</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-HTTPS-to-JMS">Switching from HTTP/S to JMS</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching_from_FTP_listener_to_mail_sender">Switching from FTP Listener to Mail Sender</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching_from_HTTP_to_FIX">Switching from HTTP to FIX</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-FIX-to-HTTP">Switch from FIX to HTTP</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-FIX-to-AMQP">Switch from FIX to AMQP</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-between-FIX-versions">Switching between FIX Versions</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-TCP-to-HTTPS">Switching from TCP to HTTP/S</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-from-UDP-to-HTTPS">Switching from UDP to HTTP/S</a></li>
                <li><a href="{{base_path}}/learn/examples/protocol-switching/switching-between-HTTP-and-MSMQ">Switching between HTTP to MSMQ</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>File Processing</b> 
            <ul>
                <li><a href="{{base_path}}/learn/examples/file-processing/vfs-transport-examples">Using VFS for File Transferring</a></li>
                <li><a href="{{base_path}}/learn/examples/file-processing/Accessing-Windows-Share-Using-VFS-Transport">Accessing a Windows Share Using VFS</a></li>
                <li><a href="{{base_path}}/learn/examples/file-processing/mailto-transport-examples">Sending and Receiving Emails</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Data Integration</b>
            <ul>
                <li><a href="{{base_path}}/learn/examples/data-integration/rdbms-data-service">Exposing an RDBMS datasource</a></li>
                <li>Exposing Other Datasources
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/data-integration/csv-data-service">Exposing a CSV datasource</a></li>
                        <li><a href="{{base_path}}/learn/examples/data-integration/carbon-data-service">Exposing a Carbon datasource</a></li>
                    </ul>
                </li>
                <li><a href="{{base_path}}/learn/examples/data-integration/json-with-data-service">Exposing Data in JSON Format</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/odata-service">Using an OData Service</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/nested-queries-in-data-service">Using Nested Data Queries</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/batch-requesting">Batch Requesting</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/request-box">Invoking Multiple Operations as a Request Box</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/distributed-trans-data-service">Using Distributed Transactions in Data Services</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/data-input-validator">Validating Data Input</a></li>
                <li><a href="{{base_path}}/learn/examples/data-integration/swagger-data-services">Swagger Documents of RESTful Data Services</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b>Examples of Components</b>
            <ul>
                <li>REST APIs 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/introduction-rest-api">Using a Simple REST API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/setting-query-params-outgoing-messages">Setting Query Parameters on Outgoing Messages</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/enabling-rest-to-soap">Exposing a SOAP Endpoint as a RESTful API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/configuring-non-http-endpoints">Exposing Non-HTTP Services as RESTful APIs</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/handling-non-matching-resources">Handling Non-Matching Resources</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/setting-https-status-codes">Handling HTTP Status Codes</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/transforming-content-type">Transforming Content Types</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/securing-rest-apis">Securing a REST API</a></li>
                        <li><a href="{{base_path}}/learn/examples/rest-api-examples/publishing-a-swagger-api">Publishing a Custom Swagger Document</a></li>
                        <li>Handling Special Cases
                            <ul>
                                <li><a href="{{base_path}}/learn/examples/rest-api-examples/using-get-with-a-body">Using GET with a Message Body</a></li>
                                <li><a href="{{base_path}}/learn/examples/rest-api-examples/using-post-with-no-body">Using POST with Empty Message Body</a></li>
                                <li><a href="{{base_path}}/learn/examples/rest-api-examples/using-post-with-query-param">Using POST with Query Parameters</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Proxy Services 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/introduction-to-proxy-services">Using a Simple Proxy Service</a></li>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/publishing-a-custom-wsdl">Publishing a Custom WSDL</a></li>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/exposing-proxy-via-inbound">Exposing a Proxy Service via Inbound Endpoints</a></li>
                        <li><a href="{{base_path}}/learn/examples/proxy-service-examples/securing-proxy-services">Securing a Proxy Service</a></li>
                    </ul>
                </li>
                <li>Inbound Endpoints 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-jms-protocol">JMS Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/file-inbound-endpoint">File Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-http-protocol">HTTP Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-https-protocol">HTTPS Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-hl7-protocol-auto-ack">HL7 Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-mqtt-protocol">MQTT Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-rabbitmq-protocol">RabbitMQ Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-kafka">Kafka Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-secured-websocket">Secured WebSocket Inbound Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-with-registry">Using Inbound Endpoints with Registry</a></li>
                    </ul>
                </li>
                <li>Scheduled Tasks 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/scheduled-tasks/task-scheduling-simple-trigger">Task Scheduling using a Simple Trigger</a></li>
                        <li><a href="{{base_path}}/learn/examples/scheduled-tasks/injecting-messages-to-rest-endpoint">Injecting Messages to a RESTful Endpoint</a></li>
                    </ul>
                </li>
                <li><a href="{{base_path}}/learn/examples/registry-examples/local-registry-entries">Local Registry Entries</a></li>
                <li>Templates 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/template-examples/using-sequence-templates">Using Sequence Templates</a></li>
                        <li><a href="{{base_path}}/learn/examples/template-examples/using-endpoint-templates">Using Endpoint Templates</a></li>
                    </ul>
                </li>
                <li>Message Stores & Processors 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/intro-message-stores-processors">Introduction to Message Stores and Processors</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-jdbc-message-store">JDBC Message Store</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-jms-message-stores">JMS Message Store</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-rabbitmq-message-stores">RabbitMQ Message Store</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-message-sampling-processor">Message Sampling Processor</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/using-message-forwarding-processor">Message Forwarding Processor</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/securing-message-processor">Securing the Message Forwarding Processor</a></li>
                        <li><a href="{{base_path}}/learn/examples/message-store-processor-examples/loadbalancing-with-message-processor">Load Balancing with Message Forwarding Processor</a></li>
                    </ul>
                </li>
                <li>Endpoints 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-address-endpoints">Address Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-failover-endpoints">Failover Endpoints</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-http-endpoints">HTTP Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-websocket-endpoints">WebSocket Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-wsdl-endpoints">WSDL Endpoint</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-loadbalancing-endpoints">Load Balance Endpoint</a></li>
                        <li>Recipient List of Endpoints
                            <ul>
                                <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-static-recepient-list-endpoints">Static List of Recepients</a></li>
                                <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-dynamic-recepient-list-endpoints-1">Dynamic List of Recepients</a></li>
                                <li><a href="{{base_path}}/learn/examples/endpoint-examples/using-dynamic-recepient-list-endpoints-2">Dynamic List of Recepients with Aggregated Responses</a></li>
                            </ul>
                        </li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/reusing-endpoints">Reusing Endpoints</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/endpoint-error-handling">Endpoint Error Handling</a></li>
                        <li><a href="{{base_path}}/learn/examples/endpoint-examples/mtom-swa-with-endpoints">MTOM and SwA Optimizations</a></li>
                    </ul>
                </li>
                <li>Sequences 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/sequence-examples/using-multiple-sequences">Breaking Complex Flows into Multiple Sequences</a></li>
                        <li><a href="{{base_path}}/learn/examples/sequence-examples/using-fault-sequences">Using Fault Sequences</a></li>
                        <li><a href="{{base_path}}/learn/examples/sequence-examples/custom-sequences-with-proxy-services">Reusing Sequences</a></li>
                    </ul>
                </li>
                <li>Transports 
                    <ul>
                        <li><a href="{{base_path}}/learn/examples/transport-examples/tcp-transport-examples">Using the TCP Transport</a></li>
                        <li><a href="{{base_path}}/learn/examples/transport-examples/fix-transport-examples">Using the FIX Transport</a></li>
                        <li><a href="{{base_path}}/learn/examples/transport-examples/pub-sub-using-mqtt">Using the MQTT Transport</a></li>
                    </ul>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li><a href="{{base_path}}/learn/examples/working-with-transactions">Transactions</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li><a href="{{base_path}}/learn/examples/json-examples/json-examples">JSON Examples</a></li>
            </ul>
        </td>
    </tr>
</table>
