# How to Secure the Message Forwarding Processor

This example demonstrates a use case where security policies are applied to the [message forwarding processor]({{base_path}}/learn/examples/message-store-processor-examples/using-message-forwarding-processor).

## Synapse configuration

Following are the artifact configurations that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml 
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteProxy" transports="https http" startOnLoad="true" trace="disable">
              <description />
        <target>
           <inSequence>
              <property name="FORCE_SC_ACCEPTED" scope="axis2" value="true"/>
              <property name="OUT_ONLY" value="true" />
              <store messageStore="MSG_STORE" />
           </inSequence>
        </target>
     </proxy>
    ```
=== "Local Registry Entry"    
    ```xml 
    <localEntry xmlns="http://ws.apache.org/ns/synapse" key="sec_policy" src="file:/path/to/policy1.xml" />
    ```
=== "Endpoint"    
    ```xml 
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SecureStockQuoteService">
        <address uri="http://localhost:9000/services/SecureStockQuoteService">
           <enableSec policy="sec_policy" />
        </address>
     </endpoint>
    ```
=== "Message Store"    
    ```xml  
    <messageStore xmlns="http://ws.apache.org/ns/synapse" name="MSG_STORE" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" />
    ```
=== "Message Processor"    
    ```xml 
    <messageProcessor xmlns="http://ws.apache.org/ns/synapse" class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="SecureForwardingProcessor" targetEndpoint="SecureStockQuoteService" messageStore="MSG_STORE">
              <parameter name="client.retry.interval">1000</parameter>
              <parameter name="interval">1000</parameter>
              <parameter name="is.active">true</parameter>
    </messageProcessor>
    ```

## Build and run

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), [registry resource]({{base_path}}/develop/creating-artifacts/creating-registry-resources), [local entry]({{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries), [in-memory message store]({{base_path}}/develop/creating-artifacts/creating-a-message-store), and [message processor]({{base_path}}/develop/creating-artifacts/creating-a-message-processor) with the configurations given above.
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
   
The Micro Integrator is configured to enable WS-Security as per the policy specified by
'policy_1.xml' for the outgoing messages to the secured backend. The debug logs on the Micro Integrator
shows the encrypted message flowing to the service and the encrypted
response being received by the Micro Integrator.

The security policy file `policy1.xml` can be downloaded from  [policy1.xml](https://github.com/wso2-docs/WSO2_EI/blob/master/sec-policies/policy1.xml). 
The security policy file URI needs to be updated with the path to the policy1.xml file.