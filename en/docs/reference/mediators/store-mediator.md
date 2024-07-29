# Store Mediator

The **Store mediator** enqueues messages passing through its mediation sequence in a given **message store**. It can serve as a [dead letter channel](https://wso2docs.atlassian.net/wiki/spaces/IntegrationPatterns/pages/36864029/Dead+Letter+Channel) if it is included in a fault sequence and if its message store is connected to a **message processor** that forwards all the messages in the store to an endpoint.

## Syntax

!!! Info
    The Store mediator is a [content aware]({{base_path}}/reference/mediators/about-mediators/#classification-of-mediators) mediator.

``` xml
<axis2ns1:store xmlns:axis2ns1="http://ws.apache.org/ns/synapse" messageStore="JMSMS" sequence="storeSequence"></axis2ns1:store>
```

You can dynamically route messages to a Message Store via the Store mediator by resolving the name of the Message Store from the message context. To enable this, give a path expression (followed by its namespace definitions) for the value of the store name attribute as shown below.

``` xml
<axis2ns1:store xmlns:axis2ns1="http://ws.apache.org/ns/synapse" messagestore="{//m:msgstr/m:arg/m:value}"
    xmlns:m="http://services.samples/xsd" sequence="storeSequence"></axis2ns1:store>
```

## Configuration

The parameters available to configure the Store mediator is as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Message Store</strong></td>
<td><div class="content-wrapper">
<p>The Message Store, in which messages will be stored. You can give the name of the Message Store either as a <strong>value</strong> or as an <strong><strong>expression</strong>.</strong></p>
<p>You should add the message store to the ESB profile before you can select it here.</p>
<ul>
<li>To give the Message Store name as a value, select <strong>Value</strong> for <strong>Specify As</strong>, and select the name of the Message Store from the drop down of <strong>Value</strong>.</li>
<li><p>To give the Message Store name as an expression, select <strong>Expression</strong> for <strong>Specify As</strong>, and enter the XPath to derive the Message Store from the message context.</p>
<p>In the namespace editor, add the namespaces used in the XPath.</p></li>
</ul>
</div></td>
</tr>
<tr class="even">
<td><strong>On Store Sequence</strong></td>
<td>The sequence< that will be called before the message gets stored. This sequence should be predefined in the registry before it can be entered here. Click either <strong>Configuration Registry</strong> or <strong>Governance</strong> <strong>Registry</strong> to select the required sequence from the resource tree.</td>
</tr>
</tbody>
</table>

## Examples

Following are examples demonstrating the usage of the Store mediator.

### Defining the Message Store as a value

A proxy service can be configured with the Store mediator as follows to save messages in a message store named `JMSMS`.

```xml
<proxy name="SimpleProxy" transports="http https" startonload="true" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
   <target>
      <inSequence>
         <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2" type="STRING"></property>
         <property name="OUT_ONLY" value="true" scope="default" type="STRING"></property>
         <store messageStore="JMSMS"></store>
      </inSequence>
   </target>
</proxy>
```

### Defining the Message Store as an XPath expression

A proxy service can be configured with the Store mediator as follows to save messages in a Message Store, which is dynamically set via the message context specified using an XPath expression.

=== "Proxy Service 1"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StoreMediatorProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <store messageStore="{//ser:getQuote/ser:request/ser:symbol}" xmlns:ser="http://services.samples"/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StoreMediatorEndpoint" xmlns="http://ws.apache.org/ns/synapse">
        <address     uri="http://localhost:9000/services/SimpleStockQuoteService">
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
=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="errorHandler"  trace="disable"  xmlns="http://ws.apache.org/ns/synapse">
        <!-- Log the message at the full log level with the ERROR_MESSAGE and the ERROR_CODE-->
        <log category="INFO" level="full">
            <property name="MESSAGE" value="Executing default 'fault' sequence"/>
            <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
            <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
        </log>
        <!-- Drops the messages by default if there is a fault -->
        <drop/>
    </sequence>
    ```
=== "Proxy Service 2"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SimpleProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <!-- Log all messages passing through -->
                <log category="INFO" level="full"/>
                <!-- ensure that the default configuration only sends if it is one of samples -->
                <filter regex="http://localhost:9000.*" source="get-property('To')">
                    <then>
                        <!-- Use call mediator for inline message sending and handling the response -->
                        <call/>
                    </then>
                    <else>
                        <!-- Log or handle messages not matching the filter -->
                        <log level="custom">
                            <property name="message" value="URL does not match the allowed pattern"/>
                        </log>
                        <!-- Respond with an error or appropriate message -->
                        <respond/>
                    </else>
                </filter>
                <!-- Use respond mediator to send back responses to non-filtered requests -->
                <respond/>
            </inSequence>
            <faultSequence>
                <sequence key="errorHandler"/>
            </faultSequence>
        </target>
    </proxy>
    ```
=== "Message Store"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <messageStore name="StoreMediatorStore" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" xmlns="http://ws.apache.org/ns/synapse"/>
    ```
=== "Message Processor"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" name="StoreMediatorProcessor" messageStore="StoreMediatorStore" targetEndpoint="StoreMediatorEndpoint" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="client.retry.interval">1000</parameter>
        <parameter name="member.count">1</parameter>
        <parameter name="is.active">true</parameter>
        <parameter name="max.delivery.attempts">4</parameter>
        <parameter name="store.connection.retry.interval">1000</parameter>
        <parameter name="max.store.connection.attempts">-1</parameter>
        <parameter name="max.delivery.drop">Disabled</parameter>
        <parameter name="interval">1000</parameter>
        <parameter name="throttle">false</parameter>
    </messageProcessor>
    ```
