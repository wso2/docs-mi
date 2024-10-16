# How to Expose a Non-HTTP Services as a RESTful API
This example demonstrates how the WSO2 Micro Integrator forwards messages to non-HTTP endpoints.

## Synapse configuration

Following is a sample REST API configuration that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

```xml
<api xmlns="http://ws.apache.org/ns/synapse" name="EventDelayOrderAPI" context="/orderdelayAPI"> 
   <resource methods="POST" url-mapping="/"> 
      <inSequence> 
         <property name="REST_URL_POSTFIX" action="remove" scope="axis2"/>
         <property name="OUT_ONLY" scope="default" type="STRING" value="true"/>
         <property name="FORCE_SC_ACCEPTED" scope="axis2" type="STRING" value="true"/>
         <call> 
            <endpoint> 
                  <address uri="jms:/DelayOrderTopic?transport.jms.ConnectionFactoryJNDIName=TopicConnectionFactory&amp;
                  java.naming.factory.initial=org.apache.activemq.jndi.ActiveMQInitialContextFactory&amp;
                  java.naming.provider.url=tcp://localhost:61616&amp;transport.jms.DestinationType=topic"/>
            </endpoint> 
         </call> 
      </inSequence> 
   </resource> 
</api>
```

When using a non-HTTP endpoint, such as a JMS endpoint, in the API definition, you must remove the `REST_URL_POSTFIX` property to avoid any characters specified after the context (such as a trailing slash) in the request from being appended to the JMS endpoint. 

Notice that we have specified the `REST_URL_POSTFIX` property with the value set to "remove". When invoking this API, even if the request contains a trailing slash after the context (e.g., `POST http://127.0.0.1:8290/orderdelayAPI/` instead of `POST  http://127.0.0.1:8290/orderdelayAPI`, the endpoint will be called correctly.

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create the REST API]({{base_path}}/develop/creating-artifacts/creating-an-api) using the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

[Configure the ActiveMQ broker]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq) with your Micro Integrator.

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ```

Invoke the REST API with a POST message.
