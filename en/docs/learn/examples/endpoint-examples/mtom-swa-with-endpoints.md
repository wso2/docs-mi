# How to Implement MTOM and SwA Optimizations and Request/Response Correlation

This sample demonstrates how you can use content optimization mechanisms such as **Message Transmission Optimization Mechanism** (MTOM) and **SOAP with Attachments** (SwA) with the Micro Integrator.

By default, the Micro Integrator serializes binary data as Base64 encoded strings and sends them in the SOAP payload. MTOM and SwA define mechanisms over which files with binary content can be transmitted over SOAP web services.

The configuration sets a local message context property, and forwards
the message to
`http://localhost:9000/services/MTOMSwASampleService`
optimizing the binary content as MTOM. You can see the actual message
sent over the http transport if required by sending this message through
TCPMon.

During response processing, the
Micro Integrator can identify the past information (by checking the local message property) about the current message context,
and use this knowledge to transfer the response back to the client
in the same format as the original request.  

!!! Note
    In a content aware mediation scenario (where the message gets built), you can use the following property to decode the 
    multipart message that is being sent to the backend. Otherwise, the outgoing message will be in encoded form.
    ```xml
    <property name="DECODE_MULTIPART_DATA" value="true" scope="axis2" action="set" type="BOOLEAN"/>
    ```
    
## Synapse configuration

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="SampleSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <filter regex="urn:uploadFileUsingMTOM" source="get-property('Action')">
            <then>
                <property name="example" scope="default" type="STRING" value="mtom"/>
                <call>
                    <endpoint key="SwASampleService"/>
                </call>
            </then>
            <else>
                <filter regex="urn:uploadFileUsingSwA" source="get-property('Action')">
                    <then>
                        <property name="example" scope="default" type="STRING" value="swa"/>
                        <call>
                            <endpoint key="SwASampleService"/>
                        </call>
                    </then>
                    <else></else>
                </filter>
            </else>
        </filter>
        <filter regex="mtom" source="get-property('example')">
            <then>
                <property name="enableMTOM" scope="axis2" type="STRING" value="true"/>
            </then>
            <else>
                <filter regex="swa" source="get-property('example')">
                    <then>
                        <property name="enableSwA" scope="axis2" type="STRING" value="true"/>
                    </then>
                    <else></else>
                </filter>
            </else>
        </filter>
        <respond/>
    </sequence>
    ```
=== "Proxy Service"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SampleProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <sequence key="SampleSequence"/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "MTOM Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="MTOMSampleService" xmlns="http://ws.apache.org/ns/synapse">
        <address optimize="mtom" uri="http://localhost:9000/services/MTOMSwASampleService">
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
=== "SwA Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SwASampleService" xmlns="http://ws.apache.org/ns/synapse">
        <address optimize="swa" uri="http://localhost:9000/services/MTOMSwASampleService">
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

1. [Launch Visual Studio Code with the Micro Integrator Extension installed]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode).
2. Open the `deployment.toml` file (stored in the `MI_HOME/conf` directory) and add the following configurations:

    - To enable MTOM:
       ```toml
       [server]
       enable_mtom = true
       ```
      When this is enabled, all outgoing messages will be serialized and
        sent as MTOM optimized MIME messages. You can override this
        configuration per service in the `services.xml`
        configuration file.

    - To enable SwA:
       ```toml
       [server]
       enable_swa = true
       ```
      When this is enabled, incoming SwA messages are automatically
        identified by the Micro Integrator. 

    !!! Note
        From MI 4.2.0 onwards, there are two different configs for the axis2 and the axis2 blocking client. The above configurations will be used to configure the axis2  client. To enable SwA and MTOM configurations for the axis2 blocking client, you need to add the following configuration as well.
    
        ```toml
        [server]
        enable_mtom = true
        enable_swa = true
        ```

3. [Create a project]({{base_path}}/develop/create-integration-project).
4. Create the [sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) with the configurations given above.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

When your client executes successfully, it will upload a file containing
the ASF logo, receive its response, and save the response to a
temporary file.

<!--
When you analyze the log once the client is run specifying MTOM
optimization, you will see an output as follows:
```bash
[java] Sending file : ./../../repository/samples/resources/mtom/asf-logo.gif as MTOM
[java] Saved response to file : ./../../work/temp/sampleClient/mtom-49258.gif
```
-->

If you use TCPMon and send the message through it, you will see that the requests and responses sent are MTOM/SwA optimized or sent as http
attachments as follows:

- **MTOM**

    ```xml
    POST http://localhost:9000/services/MTOMSwASampleService HTTP/1.1
    Host: 127.0.0.1
    SOAPAction: urn:uploadFileUsingMTOM
    Content-Type: multipart/related; boundary=MIMEBoundaryurn_uuid_B94996494E1DD5F9B51177413845353; type="application/xop+xml";
    start="<0.urn:uuid:B94996494E1DD5F9B51177413845354@apache.org>"; start-info="text/xml"; charset=UTF-8
    Transfer-Encoding: chunked
    Connection: Keep-Alive
    User-Agent: Synapse-HttpComponents-NIO

    --MIMEBoundaryurn_uuid_B94996494E1DD5F9B51177413845353241
    Content-Type: application/xop+xml; charset=UTF-8; type="text/xml"
    Content-Transfer-Encoding: binary
    Content-ID:
       <0.urn:uuid:B94996494E1DD5F9B51177413845354@apache.org>221b1
          <?xml version='1.0' encoding='UTF-8'?>
             <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                <soapenv:Body>
                   <m0:uploadFileUsingMTOM xmlns:m0="http://www.apache-synapse.org/test">
                      <m0:request>
                         <m0:image>
                            <xop:Include href="cid:1.urn:uuid:78F94BC50B68D76FB41177413845003@apache.org" xmlns:xop="http://www.w3.org/2004/08/xop/include" />
                         </m0:image>
                      </m0:request>
                   </m0:uploadFileUsingMTOM>
                </soapenv:Body>
             </soapenv:Envelope>
    --MIMEBoundaryurn_uuid_B94996494E1DD5F9B51177413845353217
    Content-Type: image/gif
    Content-Transfer-Encoding: binary
    Content-ID:
             <1.urn:uuid:78F94BC50B68D76FB41177413845003@apache.org>22800GIF89a... << binary content >>
    ```

- **SWA**

    ```xml
    POST http://localhost:9000/services/MTOMSwASampleService HTTP/1.1
    Host: 127.0.0.1
    SOAPAction: urn:uploadFileUsingSwA
    Content-Type: multipart/related; boundary=MIMEBoundaryurn_uuid_B94996494E1DD5F9B51177414170491; type="text/xml";
    start="<0.urn:uuid:B94996494E1DD5F9B51177414170492@apache.org>"; charset=UTF-8
    Transfer-Encoding: chunked
    Connection: Keep-Alive
    User-Agent: Synapse-HttpComponents-NIO

    --MIMEBoundaryurn_uuid_B94996494E1DD5F9B51177414170491225
    Content-Type: text/xml; charset=UTF-8
    Content-Transfer-Encoding: 8bit
    Content-ID:
       <0.urn:uuid:B94996494E1DD5F9B51177414170492@apache.org>22159
          <?xml version='1.0' encoding='UTF-8'?>
             <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                <soapenv:Body>
                   <m0:uploadFileUsingSwA xmlns:m0="http://www.apache-synapse.org/test">
                      <m0:request>
                         <m0:imageId>urn:uuid:15FD2DA2584A32BF7C1177414169826</m0:imageId>
                      </m0:request>
                   </m0:uploadFileUsingSwA>
                </soapenv:Body>
             </soapenv:Envelope>22--34MIMEBoundaryurn_uuid_B94996494E1DD5F9B511774141704912
    17
    Content-Type: image/gif
    Content-Transfer-Encoding: binary
    Content-ID:
             <urn:uuid:15FD2DA2584A32BF7C1177414169826>22800GIF89a... << binary content >>
    ```
