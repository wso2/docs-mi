# Introduction to Message Stores and Processors

This sample demonstrates the basic functionality of a [message store]({{base_path}}/reference/synapse-properties/about-message-stores-processors).

## Synapse configuration

Following are the artifact configurations that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml  
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="SampleProxy" transports="http" startOnLoad="true" trace="disable">
        <description/>
        <target>
            <inSequence>
                <log level="full"/>
                <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
                <store messageStore="MyStore" sequence="onStoreSequence"/>
            </inSequence>
            <faultSequence>
                <sequence key="OnError"/>
            </faultSequence>
        </target>
    </proxy>
    ```
=== "On Store Sequence"    
    ```xml  
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="onStoreSequence">
        <log>
            <property name="On-Store" value="Storing message"/>
        </log>
    </sequence>
    ```
=== "Message Store"    
    ```xml 
    <messageStore xmlns="http://ws.apache.org/ns/synapse" name="MyStore" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" />
    ```
=== "OnError Sequence"    
    ```xml  
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="OnError">
        <log level="full">
            <property name="MESSAGE" value="Executing default 'fault' sequence"/>
            <property name="ERROR_CODE" expression="${properties.ERROR_CODE}"/>
            <property name="ERROR_MESSAGE" expression="${properties.ERROR_MESSAGE}"/>
        </log>
        <drop/>
    </sequence>
    ```

## Build and run

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), [in-memory message store]({{base_path}}/develop/creating-artifacts/creating-a-message-store), and [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.

Send the following request to invoke the service:

```xml
POST http://localhost:8290/services/SampleProxy HTTP/1.1
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

In the proxy service, the store mediator will store the
`         getQuote        ` request message in the
`         MyStore        ` message store. Before storing the request,
the message store mediator will invoke the
`         onStoreSequence        ` sequence.

Analyze the logs and you will see the following log:

```bash
INFO {org.apache.synapse.mediators.builtin.LogMediator} - To: /services/SampleProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, MessageID: urn:uuid:ab78ee5d-f5ed-4346-a0ea-1beb2e6c0b1d, Direction: request, On-Store = Storing message
```

You can then use the JMX view of the Synapse message store using
jconsole.
