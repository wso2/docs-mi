#  How to Implement Dual Channel Scenario with RabbitMQ

This sample demonstrates how you can implement the <b>request-reply</b> messaging scenario (dual-channel scenario) using the RabbitMQ broker and WSO2 Micro Integrator. 

As shown below, the `OrderRequest` proxy service in the Micro Integrator receives an HTTP
request, which it publishes to a RabbitMQ queue. This message is consumed and processed by the `OrderProcessing` proxy service in the Micro Integrator, and the response is sent back to the client over HTTP.

<img src="{{base_path}}/assets/img/integrate/rabbitmq/rabbitmq-request-response.png">

## Synapse configurations

See the instructions on how to [build and run](#build-and-run) this example. 

=== "Order Request Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy xmlns="http://ws.apache.org/ns/synapse"
        name="OrderRequestService"
        transports="http https"
        startOnLoad="true">
       <description/>
       <target>
        <inSequence>
          <property name="rabbitmq.message.content.type"
                    value="Content-Type"
                    scope="axis2"/>
          <property name="TRANSPORT_HEADERS" scope="axis2" action="remove"/>
          <call>
              <endpoint>
                <address uri="rabbitmq:/order-request?rabbitmq.server.host.name=localhost&amp;rabbitmq.server.port=5672&amp;rabbitmq.server.user.name=guest&amp;rabbitmq.server.password=guest"/>
              </endpoint>
          </call>
          <respond/>
        </inSequence>
       </target>
    </proxy>
    ```
=== "Order Processing Proxy Service"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy xmlns="http://ws.apache.org/ns/synapse"
        name="OrderProcessingService"
        transports="rabbitmq"
        startOnLoad="true">
       <target>
        <inSequence>
          <call>
            <endpoint xmlns="http://ws.apache.org/ns/synapse">
              <http method="POST" uri-template="http://localhost:8290/orders"/>
            </endpoint>
          </call>
          <log level="full">
              <property name="Info" value="Your order has been placed successfully."/>
          </log>
          <respond/>
        </inSequence>
        <faultSequence>
          <payloadFactory media-type="xml">
              <format>
                <Error>$1</Error>
              </format>
              <args>
                <arg evaluator="xml" expression="get-property('ERROR_MESSAGE')"/>
              </args>
          </payloadFactory>
          <respond/>
        </faultSequence>
       </target>
       <parameter name="rabbitmq.queue.name">order-request</parameter>
       <parameter name="rabbitmq.connection.factory">AMQPConnectionFactory</parameter>
    </proxy>
    ```

We can use the below synapse configurations to act as the mock backend called by the `OrderProcessingService` proxy service.

=== "Mock Orders Backend service"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/orders" name="mockOrdersBackend" xmlns="http://ws.apache.org/ns/synapse">
      <resource methods="POST">
        <inSequence>
          <property name="messageType" value="application/json" scope="axis2"/>
          <payloadFactory media-type="json">
            <format>{"message":"Order created"}</format>
              <args/>
          </payloadFactory>
          <respond/>
        </inSequence>
        <faultSequence>
          <payloadFactory media-type="json">
            <format>{"error":"Error processing order"}</format>
            <args/>
          </payloadFactory>
          <respond/>
        </faultSequence>
      </resource>
    </api>
    ```

## Build and run

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. Enable the RabbitMQ sender and receiver in the Micro-Integrator from the deployment.toml. Refer the 
 [configuring RabbitMQ documentation]({{base_path}}/install-and-setup/setup/brokers/configure-with-rabbitmq) for more information.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.
6. Make sure you have a RabbitMQ broker instance running.
7. Send a message to the `Order Request Proxy Service` with the following payload. 

	```json
	{   "orderId": "1242",
	"orderQty": 43,
	"orderDate": "2020/07/22"
	}
	```
