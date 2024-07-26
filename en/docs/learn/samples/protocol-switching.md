# Protocol Switching Sample

This sample demonstrates the protocol switching capability of WSO2 MI. It includes a service that receives messages over the HTTP protocol and delivers them over the JMS protocol to a downstream service.

The sample features a REST API called "StudentRegistrationAPI" which takes an HTTP request and publishes it to a JMS queue. The "StudentQueueEP" represents the JMS endpoint with the necessary parameters.

When a request is received by the API, it is published to a JMS queue through an endpoint. The endpoint does not return a response. The "OUT_ONLY" property in the mediation flow indicates one-way asynchronous invocation. Additionally, the client will receive a ‘202 Accepted’ response because the "FORCE_SC_ACCEPTED" property is set in the mediation flow.

## Deploying the sample

1.  Open the sample by clicking on the **Protocol Switching** card.
2.  Give a folder location to save the sample.
3.  Add the following config in `<MI_HOME>/conf/deployment.toml` file to enable JSM transport.

    ```toml
    [[transport.jms.sender]]
    name = "default"
    parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
    parameter.provider_url = "tcp://localhost:61616"
    parameter.connection_factory_name = "QueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.cache_level = "producer"
    ```
    
4.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

1. Start the activeMQ server by running the following command from the `<MI_HOME>/bin` directory. (This sample is tested with ActiveMQ 5.18.1)

    ```bash
    sh activemq.sh start
    ```

2. Open a terminal and run the following commands to invoke the API.

    ```bash
    curl --location 'http://localhost:8290/registerstudent/' --header 'Content-Type: application/json' \
    --data '{
        "Student": {
        "Name": "Peter"
        }
    }'
    ```

3. The published message can be seen from [ActiveMQ Console](http://127.0.0.1:8161/admin/browse.jsp?JMSDestination=StudentQueue). Default value is ‘admin’ for both password and username.