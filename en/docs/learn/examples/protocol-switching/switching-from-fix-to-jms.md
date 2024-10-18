# How to Switch from FIX to JMS

This example demonstrates how WSO2 Micro Integrator receives messages through FIX and forwards them through JMS.

Synapse will forward the order request by binding it to a JMS message payload and sending it to the ActiveMQ consumer. The ActiveMQ consumer will send an execution back to Banzai.

## Synapse configuration

Following are the integration artifacts (proxy service) that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml 
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="FIXProxy" startOnLoad="true" transports="fix" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full"/>
                <property name="transport.fix.ServiceName" scope="axis2-client" type="STRING" value="FIXProxy"/>
                <call>
                    <endpoint key="QueueStockQuoteServiceEp"/>
                </call>
                <log category="INFO" level="full"/>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.fix.AcceptorConfigURL">file:/{file_path}/fix-synapse.cfg</parameter>
        <parameter name="transport.fix.AcceptorMessageStore">file</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="QueueStockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="jms:/QueueStockQuoteService?transport.jms.ConnectionFactoryJNDIName=QueueConnectionFactory&amp;java.naming.factory.initial=org.apache.activemq.jndi.ActiveMQInitialContextFactory&amp;java.naming.provider.url=tcp://localhost:61616&amp;transport.jms.ReplyDestination=replyQueue">
            <suspendOnFailure>
                <initialDuration>-1</initialDuration>
                <progressionFactor>1</progressionFactor>
            </suspendOnFailure>
            <markForSuspension>
                <retriesBeforeSuspension>0</retriesBeforeSuspension>
            </markForSuspension>
        </address>
    </endpoint>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. Download the FIX transport resources from [here](https://github.com/wso2-docs/WSO2_EI/tree/master/FIX-transport-resources) and change the `{file_path}` of the proxy with the downloaded location.
5. [Configure MI with the selected message broker]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq) and start the Micro-Integrator.
6. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

[Enable the FIX transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-fix-transport) and start the Micro-Integrator.

Run the quickfixj **Banzai** sample application.

```bash
java -jar quickfixj-examples-banzai-2.3.1.jar
```

Send an order request from Banzai to Synapse. For example, Buy 1000 DELL @ $100. 
<img src="{{base_path}}/assets/img/learn/fix-to-http.png" title="FIX order request" width="800" alt="FIX order request" />

Then, the message count of the queue should be increased. To check this, follow these steps:

1. Navigate to the URL where the ActiveMQ WebConsole is available. You can find this URL in the terminal where you started ActiveMQ. It is similar to `http://127.0.0.1:8161/`. 
2. By default, the username and password are both `admin`.
3. After signing in, click on **Manage ActiveMQ broker**.
4. On the opened page, select the **Queues** tab.

You will see a page similar to the one below.

<img src="{{base_path}}/assets/img/learn/activemq-result.png" title="ActiveMQ result" width="800" alt="ActiveMQ result" />

You can again send a request and check the increment of the count in the queue. 
