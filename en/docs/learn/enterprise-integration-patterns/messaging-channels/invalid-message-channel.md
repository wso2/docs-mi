# Invalid Message Channel

This page explains how you can implement a sample scenario of an Invalid Message Channel using WSO2 Micro Integrator.

## Introduction to Invalid Message Channel

The Invalid Message Channel EIP pattern allows administrators to define an error indication that appears when an endpoint fails to process a request. For more information, go to Invalid Message Channel.

!!! info
    For more information, see the [Invalid Message Channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/invalid-message-solution.gif) documentation.

## Sample scenario

The example scenario creates a deliberate error situation to demonstrate how the WSO2 MI handles errors on message failures. It requires a live Axis2 server instance to provide a response to the sender successfully, and the server instance will be shut down before sending a request. You will observe how the WSO2 MI directs the process to the faultSequence mediator, which indicates the message invalidity to the user.

The diagram below depicts how to simulate the example scenario using the WSO2 MI.

![Invalid message channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/invalid-message-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Invalid Message Channel EIP by comparing their core components.

| Invalid Message Channel EIP            | Invalid Message Channel Example Scenario            |
|----------------------------------------|-----------------------------------------------------|
| Sender                                 | Stock Quote Client                                  |
| Channel                                | Target Endpoint                                     |
| Receiver                               | Stock Quote Service Instance                        |
| Invalid Message Channel                | FaultSequence                                       |

## Synapse configuration of the artifacts

In the proxy service defined below a fault sequence is defined to execute in the event of a fault. It acts as the Invalid Message Channel for this EIP. In this example configuration, we log the fault as an error, but you can place any of the usual mediators inside this sequence. For example, you could pass the invalid message to another service or back to the client.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="InvalidMessageChannelProxy" startOnLoad="true" transports="http https"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full" />
                <call>
                    <endpoint key="SimpleStockQuoteService" />
                </call>
                <respond />
            </inSequence>
            <faultSequence>
                <log level="full">
                    <property name="MESSAGE" value="Failure Message..." />
                    <property name="ERROR_CODE" expression="get-property('ERROR_CODE')" />
                    <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')" />
                </log>
                <property name="HTTP_SC" value="500" scope="axis2" />
                <property name="NO_ENTITY_BODY" value="true" scope="axis2" type="BOOLEAN"/>
                <respond />
            </faultSequence>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the artifacts of the sample

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/InvalidMessageChannel.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

4. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

5. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the service using SoapUI (or any other SOAP client).

```
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

When the client executes the request, since the `SimpleStockQuoteService` is not running the client would receive the status code 500 as the response.
