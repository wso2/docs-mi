# How to Mediate HL7 Messages

You can create a proxy service that uses the HL7 transport to connect to an HL7 server. This proxy service will receive HL7-client connections and send them to the HL7 server. It can also receive XML messages over HTTP/HTTPS and transform them into HL7 before sending them to the server, and it will transform the HL7 responses back into XML.

## Synapse configuration

Given below is an example proxy that receives HL7 messages from a client and relays the message to an HL7 server. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="hl7testproxy" transports="https,http,hl7" statistics="disable" trace="disable" startOnLoad="true">
    <target>
       <inSequence>
         <log category="INFO" level="full" />
         <call>
            <endpoint key="HL7Endpoint" />
         </call>
         <respond />
       </inSequence>
    </target>
    <parameter name="transport.hl7.Port">9292</parameter>
    </proxy>
    ```
=== "HL7Endpoint"
    ```xml
    <endpoint name="hl7_endpoint" xmlns="http://ws.apache.org/ns/synapse">
      <address uri="hl7://localhost:9988" />
    </endpoint>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. [Create the proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Configure the HL7 transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-hl7-transport) in your Micro Integrator.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

To test this scenario, you need the following:

- An HL7 client that sends messages to the port specified by the `transport.hl7.Port` parameter.
- An HL7 back-end application that receives messages from the Micro Integrator.

You can simulate the HL7 client and back-end application using a tool such as <b>HAPI</b>.

You can use the following HL7 message to test this scenario when invoking with a HL7 Client.
   ```bash
   MSH|^~\&|Abc|Def|Ghi|JKL|20131231000000||ADT^A01|1234567|P|2.6|||NE|NE|CH|
   ```
You can use the following xml message to test this scenario when invoking with a HTTP/HTTPS Client.
   ```xml
   <hl7:message xmlns:hl7="http://wso2.org/hl7">
      <ADT_A01 xmlns="urn:hl7-org:v2xml">
         <MSH>
               <MSH.1>|</MSH.1>
               <MSH.2>^~\&amp;</MSH.2>
               <MSH.3>
                  <HD.1>Abc</HD.1>
               </MSH.3>
               <MSH.4>
                  <HD.1>Def</HD.1>
               </MSH.4>
               <MSH.5>
                  <HD.1>Ghi</HD.1>
               </MSH.5>
               <MSH.6>
                  <HD.1>JKL</HD.1>
               </MSH.6>
               <MSH.7>20131231000000</MSH.7>
               <MSH.9>
                  <MSG.1>ADT</MSG.1>
                  <MSG.2>A01</MSG.2>
               </MSH.9>
               <MSH.10>1234567</MSH.10>
               <MSH.11>
                  <PT.1>P</PT.1>
               </MSH.11>
               <MSH.12>
                  <VID.1>2.6</VID.1>
               </MSH.12>
               <MSH.15>NE</MSH.15>
               <MSH.16>NE</MSH.16>
               <MSH.17>CH</MSH.17>
         </MSH>
      </ADT_A01>
   </hl7:message>
   ```
