# How to Use a WebSocket Endpoint

WebSocket is a protocol that provides full-duplex communication channels over a single TCP connection. This can be used by any client or server application. The WSO2 Micro Integrator (MI) provides WebSocket support via the [WebSocket Transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-websocket-transport) and the [WebSocket Inbound Protocol]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-secured-websocket).

## Example 1: Send a message from a WebSocket client to a WebSocket endpoint

If you need to send a message from a WebSocket client to a WebSocket endpoint via WSO2 MI, you need to establish a persistent WebSocket connection from the WebSocket client to WSO2 MI as well as from WSO2 MI to the WebSocket backend.

To demonstrate this scenario, you need to create two dispatching sequences: one for client-to-backend mediation and another for backend-to-client mediation. Finally, you need to configure the WebSocket inbound endpoint of WSO2 MI to use the created sequences and listen on port `9092`.

For sample synapse configurations, see [WebSocket Inbound]({{base_path}}/learn/examples/inbound-endpoint-examples/inbound-endpoint-secured-websocket).

If you analyze the log, you will see that a connection from the WebSocket client to WSO2 MI is established, and the sequences are executed by the WebSocket inbound endpoint. You will also see that the message sent to the WebSocket server is not transformed and that the response injected to the out sequence is also not transformed.

## Example 2: Send a message from an HTTP client to a WebSocket endpoint

If you need to send a message from an HTTP client to a WebSocket endpoint via the Micro Integrator, you need to establish a persistent WebSocket connection from WSO2 MI to the WebSocket backend.

To demonstrate this scenario, you need to create two dispatching sequences: one for the client to back-end mediation, and another for the back-end to client mediation. Then you need to create a proxy service to call the created sequences.

### Synapse configuration
Following is a sample proxy service configuration that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

Create the sequence for client-to-backend mediation, the sequence for the backend-to-client mediation, and a proxy service to call the sequences.

=== "Sequence (Backend Mediation)"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="dispatchSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <property name="OUT_ONLY" scope="default" type="BOOLEAN" value="true"/>
        <property name="FORCE_SC_ACCEPTED" scope="axis2" type="BOOLEAN" value="true"/>
        <property name="websocket.accept.contentType" scope="axis2" type="STRING" value="text/xml"/>
        <call>
            <endpoint key="WebsocketEp"/>
        </call>
    </sequence>
    ```
=== "Sequence (Backend to Client Mediation)"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="outDispatchSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" level="full"/>
    </sequence>
    ```
=== "Proxy Service"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="websocketProxy1" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target inSequence="dispatchSeq" faultSequence="outDispatchSeq">
        </target>
    </proxy>
    ```
=== "Endpoint" 
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="WebsocketEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="ws://localhost:8082/websocket">
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

### Build and run

Create the artifacts:

{!includes/build-and-run.md!}
    
    !!! Note
        The Websocket sender functionality of the Micro Integrator is disabled by default. To enable the transport, open the `deployment.toml` file from the `MI_TOOLING_HOME/Contents/Eclipse/runtime/microesb/conf/` directory and add the following: 

        ```toml
        [transport.ws]
        sender.enable = true
        sender.outflow_dispatch_sequence = 'outDispatchSeq'
        ``` 

3. Create the [mediation sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) and the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.

4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Starting the WebSocket server:

-  Download the netty artifacts zip file from [here](https://github.com/wso2-docs/ESB) and extract it. The extracted folder will be shown as `ESB`.
-  Open a terminal, navigate to `ESB/ESB-Artifacts/Netty_artifacts_for_WebSocket_samples`, and execute the following command to start the WebSocket server on port `8082`:
   
   ```bash
    java -cp 'netty-example-4.0.30.Final.jar:lib/*:.' io.netty.example.http.websocketx.server.WebSocketServer
   ```
   
Calling the Proxy service:

-  Execute the following command to call the proxy service:
```bash
curl -v --request POST -d "<?xml version=\"1.0\" encoding=\"UTF-8\"?><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Body><test>Value</test></soapenv:Body></soapenv:Envelope>" -H Content-Type:"text/xml" http://localhost:8290/services/websocketProxy1
```

If you analyze the log, you will see that an HTTP request is sent to the
WebSocket server, and that the WebSocket server injects the response to
the out sequence.
