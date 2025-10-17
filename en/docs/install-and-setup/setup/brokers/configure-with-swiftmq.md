# Connecting to SwiftMQ

This section describes how to configure WSO2 Integrator: MI to connect with SwiftMQ.

1. Download and set up SwiftMQ.
2. Download and install WSO2 Integrator: MI
3. Copy the following client libraries from `SMQ_HOME/lib` directory to `MI_HOME/lib` directory.

    -   jms.jar
    -   jndi.jar
    -   swiftmq.jar

    !!! Info
        Always use the standard client libraries that come with a particular version of SwiftMQ in order to avoid version incompatibility issues. We recommend that you remove old client libraries, if any, from all locations including `MI_HOME/lib `and `MI_HOME/droppins` before copying the libraries relevant to a given version.

4.  If you want the WSO2 Integrator: MI to receive messages from a SwiftMQ instance, or to send messages to a SwiftMQ instance, you need to update the deployment.toml file with the relevant connection parameters.

    Add the following configurations to enable the JMS sender and listener with SwiftMQ connection parameters.
    ```toml
    [transport.jms]
    sender_enable = true
    
    [[transport.jms.listener]]
    name = "myTopicConnectionFactory"
    parameter.initial_naming_factory = "com.swiftmq.jndi.InitialContextFactoryImpl"
    parameter.provider_url = "smqp://localhost:4001/timeout=10000"
    parameter.connection_factory_name = "TopicConnectionFactory"
    parameter.connection_factory_type = "topic"
    parameter.jms_spec_version = "1.0"
    
    [[transport.jms.listener]]
    name = "myQueueConnectionFactory"
    parameter.initial_naming_factory = "com.swiftmq.jndi.InitialContextFactoryImpl"
    parameter.provider_url = "smqp://localhost:4001/timeout=10000"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.jms_spec_version = "1.0"
    
    [[transport.jms.listener]]
    name = "default"
    parameter.initial_naming_factory = "com.swiftmq.jndi.InitialContextFactoryImpl"
    parameter.provider_url = "smqp://localhost:4001/timeout=10000"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.jms_spec_version = "1.0"
    ```
    !!! Info
        For details on the JMS configuration parameters used in the code segments above, see [JMS connection factory parameters]({{base_path}}/reference/config-catalog-mi/#jms-transport-listener-non-blocking-mode).

You have now configured an instance of SwiftMQ and WSO2 Integrator: MI. Refer [JMS Consumer]({{base_path}}/learn/examples/jms-examples/consuming-jms) and [JMS Producer]({{base_path}}/learn/examples/jms-examples/producing-jms) section for implementation details of JMS consumer and producer.
