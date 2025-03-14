# How to Use an HL7 Inbound Endpoint (with Auto Ack)

The HL7 inbound endpoint implementation is fully asynchronous and is based on the Minimal Lower Layer Protocol(MLLP) implemented on top of event driven I/O.

## Synapse configuration

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Inbound Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="Sample1" onError="fault" protocol="hl7" sequence="msgReceiveSeq" suspend="false" xmlns="http://ws.apache.org/ns/synapse">
        <parameters>
            <parameter name="inbound.hl7.Port">20000</parameter>
            <parameter name="inbound.hl7.AutoAck">true</parameter>
            <parameter name="inbound.hl7.TimeOut">3000</parameter>
            <parameter name="inbound.hl7.CharSet">UTF-8</parameter>
            <parameter name="inbound.hl7.ValidateMessage">false</parameter>
            <parameter name="inbound.hl7.BuildInvalidMessages">true</parameter>
            <parameter name="inbound.hl7.PassThroughInvalidMessages">true</parameter>
        </parameters>
    </inboundEndpoint>
    ```
=== "Main Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="msgReceiveSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log level="full"/>
        <drop/>
    </sequence>
    ```
=== "Fault Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="fault" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <drop/>
    </sequence>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create two sequences]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) (Main and Fault) and an [inbound endpoint]({{base_path}}/develop/creating-artifacts/creating-an-inbound-endpoint) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

To execute the sample, use the **HAPI HL7 TestPanel**:

-   Connect to the port defined in the inbound endpoint (i.e., 20000,
    which is the value of `           inbound.hl7.Port)          ` using
    the HAPI HL7 TestPanel.
-   Generate and send an HL7 message using the messages dialog frame.

You will see that the Micro Integrator receives the HL7 message and logs a
serialization of this message in a SOAP envelope. You will also see that
the HAPI HL7 TestPanel receives an acknowledgement.
