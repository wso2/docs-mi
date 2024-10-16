# How to Use a Message Forwarding Processor

This example demonstrates the usage of the message forwarding processor.

## Synapse configuration
Following are the artifact configurations that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml  
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https http" startOnLoad="true" trace="disable">
              <description />
        <target>
           <inSequence>
            <log level="full"/>
            <property name="FORCE_SC_ACCEPTED" scope="axis2" value="true"/>
            <property name="OUT_ONLY" value="true"/>
            <store messageStore="MyStore"/>
        </inSequence>
    </target>
    </proxy>
    ```
=== "Message Store"    
    ```xml
    <messageStore name="MyStore" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" xmlns="http://ws.apache.org/ns/synapse"/>
    ```

=== "Message Processor"    
    ```xml  
    <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="ScheduledProcessor" messageStore="MyStore" targetEndpoint="StockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="client.retry.interval">1000</parameter>
        <parameter name="member.count">1</parameter>
        <parameter name="is.active">true</parameter>
        <parameter name="max.delivery.attempts">4</parameter>
        <parameter name="store.connection.retry.interval">1000</parameter>
        <parameter name="max.store.connection.attempts">-1</parameter>
        <parameter name="max.delivery.drop">Disabled</parameter>
        <parameter name="interval">1000</parameter>
    </messageProcessor>
    ```
=== "Endpoint"    
    ```xml
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteServiceEp">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
            <suspendOnFailure>
                <errorCodes>-1</errorCodes>
                <progressionFactor>1.0</progressionFactor>
            </suspendOnFailure>
        </address>
    </endpoint>
    ```

## Build and run

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), [endpoint]({{base_path}}/develop/creating-artifacts/creating-endpoints), [In-Memory message store]({{base_path}}/develop/creating-artifacts/creating-a-message-store) and [message processor]({{base_path}}/develop/creating-artifacts/creating-a-message-processor) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

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

Send the following request to invoke the service:

```bash
POST http://localhost:8290/services/StockQuoteProxy HTTP/1.1
Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:getQuote"
Content-Length: 492
Host: localhost:9090
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

Now Start the SimpleStockQuoteService. When you Start the service you will see message getting delivered to the service. Even though service is down when we invoke it from the client. Here in the Proxy Service store mediator will store the getQuote request message in the "MyStore" Message Store. Message Processor will send the message to the endpoint configured as a message context property. Message processor will remove the message from the store only if message delivered successfully.
