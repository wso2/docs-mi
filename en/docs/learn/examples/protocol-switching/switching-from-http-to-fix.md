# How to Switch from HTTP to FIX

This example demonstrates how WSO2 Micro Integrator receives messages in HTTP and forwards them through FIX.

Synapse will create a session with the **Executor** and forward the order request. The first response coming from the Executor will be sent back over HTTP. The Executor generally sends two responses for each incoming order request. But since the response has to be forwarded over HTTP, only one can be sent back to the client.

## Synapse configuration

Following are the integration artifacts (proxy service) that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="HTTPToFIXProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full"/>
                <property name="transport.fix.ServiceName" scope="axis2-client" type="STRING" value="HTTPToFIXProxy"/>
                <call>
                    <endpoint key="FixEp"/>
                </call>
                <log category="INFO" level="full"/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.fix.InitiatorConfigURL">file:/{file_path}/synapse-sender.cfg</parameter>
        <parameter name="transport.fix.InitiatorMessageStore">file</parameter>
        <parameter name="transport.fix.SendAllToInSequence">false</parameter>
        <parameter name="transport.fix.DropExtraResponses">true</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="FixEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="fix://localhost:19876?BeginString=FIX.4.0&amp;SenderCompID=SYNAPSE&amp;TargetCompID=EXEC">
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

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. Download the FIX transport resources from [here](https://github.com/wso2-docs/WSO2_EI/tree/master/FIX-transport-resources) and change the `{file_path}` of the proxy with the downloaded location. 
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

[Enable the FIX transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-fix-transport) and start the Micro-Integrator.

Run the quickfixj **Executor** sample application.

```bash
java -jar quickfixj-examples-executor-2.3.1.jar
```

Send the following request to the Micro Integrator.

```bash
curl -X POST \
  http://localhost:8290/services/HTTPToFIXProxy \
  -H 'cache-control: no-cache' \
  -H 'content-type: text/xml' \
  -H 'soapaction: \"urn:mediate\"' \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header />
   <soapenv:Body>
      <message>
         <header>
            <field id="35">D</field>
            <field id="52">Fri Nov 08 11:04:31 IST 2019</field>
         </header>
         <body>
            <field id="11">122333</field>
            <field id="21">1</field>
            <field id="38">5</field>
            <field id="40">1</field>
            <field id="54">1</field>
            <field id="55">IBM</field>
            <field id="59">0</field>
         </body>
         <trailer />
      </message>
   </soapenv:Body>
</soapenv:Envelope>'
```

We will receive the following response from the executor application.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <message inSession="FIX.4.0:SYNAPSE->EXEC" counter="11">
            <header>
                <field id="8">FIX.4.0</field>
                <field id="9">119</field>
                <field id="34">13</field>
                <field id="35">8</field>
                <field id="49">EXEC</field>
                <field id="52">20240715-18:29:03</field>
                <field id="56">SYNAPSE</field>
            </header>
            <body>
                <field id="6">0</field>
                <field id="11">122333</field>
                <field id="14">0</field>
                <field id="17">11</field>
                <field id="20">0</field>
                <field id="31">0</field>
                <field id="32">0</field>
                <field id="37">11</field>
                <field id="38">5</field>
                <field id="39">0</field>
                <field id="54">1</field>
                <field id="55">IBM</field>
            </body>
            <trailer>
                <field id="10">160</field>
            </trailer>
        </message>
    </soapenv:Body>
</soapenv:Envelope>
```