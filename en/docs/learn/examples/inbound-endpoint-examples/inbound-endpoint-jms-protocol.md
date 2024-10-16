# How to Use a JMS Inbound Endpoint
This sample demonstrates how one way message bridging from JMS to HTTP can be done using the inbound JMS endpoint.

## Synapse configuration

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Inbound Endpoint"
    ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <inboundEndpoint xmlns="http://ws.apache.org/ns/synapse" name="jms_inbound" sequence="request" onError="fault" protocol="jms" suspend="false">
        <parameters>
           <parameter name="interval">1000</parameter>
           <parameter name="transport.jms.Destination">ordersQueue</parameter>
           <parameter name="transport.jms.CacheLevel">1</parameter>
           <parameter name="transport.jms.ConnectionFactoryJNDIName">QueueConnectionFactory</parameter>
           <parameter name="sequential">true</parameter>
           <parameter name="java.naming.factory.initial">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
           <parameter name="java.naming.provider.url">tcp://localhost:61616</parameter>
           <parameter name="transport.jms.SessionAcknowledgement">AUTO_ACKNOWLEDGE</parameter>
           <parameter name="transport.jms.SessionTransacted">false</parameter>
           <parameter name="transport.jms.ConnectionFactoryType">queue</parameter>
        </parameters>
     </inboundEndpoint>
    ```
=== "Sequence"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="request" trace="disable" xmlns="http://ws.apache.org/ns/synapse"/>
      <call>
         <endpoint>
            <address format="soap12" uri="http://localhost:9000/services/SimpleStockQuoteService"/>
         </endpoint>
      </call>
      <drop/>
    </sequence>
    ```

## Build and run

[Configure the ActiveMQ broker]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq).

Create the artifacts:

{!includes/build-and-run.md!}
3. Create a [mediation sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) and [inbound endpoint]({{base_path}}/develop/creating-artifacts/creating-an-inbound-endpoint) with configurations given in the above example.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

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

Invoke the inbound endpoint:

1. Log on to the ActiveMQ console using the `http://localhost:8161/admin` URL.
2. Browse the queue `ordersQueue` listening via the above endpoint.
3. Add a new message with the following content to the queue:

    ```xml
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <soapenv:Body>
            <m0:getQuote xmlns:m0="http://services.samples"> 
                <m0:request>
                    <m0:symbol>IBM</m0:symbol>
                </m0:request>
            </m0:getQuote>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

You will see that the JMS endpoint gets the message from the queue and sends it to the stock quote service.
