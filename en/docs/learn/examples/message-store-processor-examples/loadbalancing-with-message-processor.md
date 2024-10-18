# How to Implement Load Balancing with Message Forwarding Processor

This example demonstrates how the message forwarding processor handles load balancing.

## Synapse configuration

Following are the artifact configurations that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml  
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy"
                  transports="https http"
                  startOnLoad="true">
        <description/>
        <target>
           <inSequence>
              <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
              <property name="OUT_ONLY" value="true"/>
              <store messageStore="JMSMS"/>
           </inSequence>
           <outSequence/>
           <faultSequence/>
        </target>
     </proxy>
    ```
=== "Endpoint 1"    
    ```xml  
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SimpleStockQuoteService1">
      <address uri="http://localhost:9001/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
=== "Endpoint 2"    
    ```xml  
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SimpleStockQuoteService2">
      <address uri="http://localhost:9002/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
=== "Endpoint 3"    
    ```xml  
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SimpleStockQuoteService3">
      <address uri="http://localhost:9003/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
=== "Message Store"    
    ```xml  
    <messageStore xmlns="http://ws.apache.org/ns/synapse" class="org.apache.synapse.message.store.impl.jms.JmsStore" name="JMSMS">
      <parameter name="java.naming.factory.initial">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
      <parameter name="store.jms.cache.connection">false</parameter>
      <parameter name="java.naming.provider.url">tcp://localhost:61616</parameter>
      <parameter name="store.jms.JMSSpecVersion">1.1</parameter>
      <parameter name="store.jms.destination">JMSMS</parameter>
    </messageStore>
    ```
=== "Message Processor 1"    
    ```xml  
    <messageProcessor xmlns="http://ws.apache.org/ns/synapse" class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor"
                             name="Forwarder1"
                             targetEndpoint="SimpleStockQuoteService1"
                             messageStore="JMSMS">
      <parameter name="client.retry.interval">1000</parameter>
      <parameter name="interval">1000</parameter>
      <parameter name="is.active">true</parameter>
    </messageProcessor>
    ```
=== "Message Processor 2"    
    ```xml 
    <messageProcessor xmlns="http://ws.apache.org/ns/synapse" class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor"
                             name="Forwarder2"
                             targetEndpoint="SimpleStockQuoteService2"
                             messageStore="JMSMS">
      <parameter name="client.retry.interval">1000</parameter>
      <parameter name="interval">1000</parameter>
      <parameter name="is.active">true</parameter>
    </messageProcessor>
    ```
=== "Message Processor 3"    
    ```xml 
    <messageProcessor xmlns="http://ws.apache.org/ns/synapse" class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor"
                             name="Forwarder3"
                             targetEndpoint="SimpleStockQuoteService3"
                             messageStore="JMSMS">
      <parameter name="client.retry.interval">1000</parameter>
      <parameter name="interval">1000</parameter>
      <parameter name="is.active">true</parameter>
    </messageProcessor>
    ```

## Build and run

[Configure the ActiveMQ broker]({{base_path}}/install-and-setup/setup/brokers/configure-with-activemq).

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), [endpoints]({{base_path}}/develop/creating-artifacts/creating-endpoints), [message stores]({{base_path}}/develop/creating-artifacts/creating-a-message-store) and [message processors]({{base_path}}/develop/creating-artifacts/creating-a-message-processor) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file and create two additional copies of the extracted folder.
3. Open the `axis2.xml` file located in the `axis2Server/conf/` directory within each extracted folder.
4. Update the port numbers in the `axis2.xml` file for each folder to `9001`, `9002`, and `9003` respectively.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folders.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
        ```bash
        sh axis2server.sh
        ```
    === "On Windows"          
        ```bash
        axis2server.bat
        ```

Send the following request to invoke the service:

```bash
POST http://localhost:8290/services/StockQuoteProxy HTTP/1.1
Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:getQuote"
Content-Length: 492
Host: localhost:8290
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
         <ser:request>
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

If you send the request to the proxy service several times and observe the log on the back-end server, you will see that the following messages are distributed among the back-end nodes.

```aidl
Mon Aug 12 13:19:27 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```