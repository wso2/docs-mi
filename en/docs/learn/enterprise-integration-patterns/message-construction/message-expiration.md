# Message Expiration

This page explains how you can implement a sample scenario of Message Expiration using WSO2 Micro Integrator.

## Introduction to Message Expiration

The Message Expiration EIP allows a sender to indicate when a message should be considered stale and shouldn’t be processed. You can set the Message Expiration to specify a time limit in which a message is viable. 

!!! info

    For more information, see the [Message Expiration](http://www.eaipatterns.com/MessageExpiration.html) documentation.

![Message expiration solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/message-expiration-solution.gif)

## Sample scenario

This example scenario simulates message expiration using the endpoint timeout property. Message expiration sets a time limit for a sent message to be visible. If the limit is exceeded, the message will be discarded without being sent to the receiver.

While setting a delivery timeout for a message in the Message Expiration EIP can be an inherent component of a sender process, this EIP can be implemented in WSO2 MI through the use of an endpoint timeout. Alternatively, you can use a MessageStore with a Time To Live duration set, which expires messages if this duration is reached before passing the message to the intended receivers.

The diagram below depicts how to simulate the example scenario in the WSO2 MI.

![Message expiration]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/message-expiration.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Message Expiration EIP by comparing their core components.

| Message Expiration EIP            | Message Expiration Example Scenario            |
|-----------------------------------|------------------------------------------------|
| Sender                            | Stock Quote Client                             |
| Channel                           | Proxy Service                                  |
| Dead Letter Channel               | Fault Sequence                                 |
| Intended Receiver                 | Stock Quote Service Instance                   |

## Synapse configuration of the artifacts

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="MessageExpirationProxy" startOnLoad="true" transports="http https"
       xmlns="http://ws.apache.org/ns/synapse">
       <target faultSequence="LogAndDropMessageFault">
          <inSequence>
             <log category="INFO" level="full" />
             <call>
                <endpoint key="SimpleStockQuoteService" />
             </call>
             <respond />
          </inSequence>
          <faultSequence />
       </target>
    </proxy>
    ```
=== "LogAndDropMessageFault"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="LogAndDropMessageFault" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log level="full">
          <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
          <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
          <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
       </log>
       <drop/>
    </sequence>
    ```
=== "SimpleStockQuoteService"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="TimeoutEndpoint" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService">
          <timeout>
             <duration>3000</duration>
                <responseAction>fault</responseAction>
          </timeout>
       </address>
    </endpoint>
    ```

The endpoint is defined with a timeout duration in milliseconds, and also the action to take (fault or discard) in the event of a response timeout. In this example scenario, when a timeout occurs, the `LogAndDropMessageFault` sequence activates where the message is dropped using the Drop Mediator. An alternative to dropping the message is to pass the message to a Dead Letter Channel. 

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/MessageExpiration.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

4. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

6. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send a request like the following to the Micro Integrator.

```xml
POST /services/MessageExpirationProxy HTTP/1.1
Host: localhost:8290
SOAPAction: urn:getQuote
Content-Type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>
         <ser:request>
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```
## Analyze the output

Since the backend `SimpleStockQuoteService` is not running the endpoint will time out and be suspended after the timeout period, causing a fault condition.

The following output would be logged in the Output tab of the VS Code.

```bash
WARN {EndpointContext} - Suspending endpoint : TimeoutEndpoint with address http://localhost:9000/services/SimpleStockQuoteService - last suspend duration was : 30000ms and current suspend duration is : 30000ms - Next retry after : Thu Aug 15 13:32:46 IST 2024
 INFO {LogMediator} - {proxy:MessageExpirationProxy} To: /services/MessageExpirationProxy, WSAction: urn:getQuote, SOAPAction: urn:getQuote, MessageID: urn:uuid:669b933f-7267-4cb7-9ca6-22c984a48b42, correlation_id: eeb480c3-6093-4def-8394-f2070e053d2e, Direction: request, MESSAGE = Executing default "fault" sequence, ERROR_CODE = 101503, ERROR_MESSAGE = Error connecting to the back end, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://services.samples/xsd" xmlns:ser="http://services.samples"><soapenv:Body>
      <ser:getQuote>    
         <ser:request>          
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body></soapenv:Envelope>
```
