# Return Address

This page explains how you can implement a sample scenario of Return Address EIP using WSO2 Micro Integrator.

## Introduction to Return Address

The Return Address EIP facilitates adding a return address to a request message, which indicates where to send the reply message. 

!!! info
    For more information, see the [Return Address](http://www.eaipatterns.com/ReturnAddress.html) documentation.

![Return Address Solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/return-address-solution.gif)

## Sample scenario

This example is a stock quote service where a client sends a stock quote request to the WSO2 MI with a return address embedded in the message header, which will indicate to the replier where the response message should be sent.

The diagram below depicts how to simulate the example scenario.

![Return address]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/return-address.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Return Address EIP by comparing their core components.

| Return Address EIP            | Return Address Example Scenario            |
|-------------------------------|--------------------------------------------|
| Requestor 1                   | Stock Quote Client Instance                |
| Request Channel 1             | Send Mediator                              |
| Requestor 2                   | Stock Quote Client Instance                |
| Request Channel 2             | Send Mediator                              |
| Replier                       | Stock Quote Service Instance               |

## Synapse configuration of the artifacts

```xml
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="ReturnAddressProxy" startOnLoad="true" transports="http https"
   xmlns="http://ws.apache.org/ns/synapse">
   <target>
      <inSequence>
         <call></call>
      </inSequence>
      <faultSequence />
   </target>
</proxy>
```

The call mediator forwards messages to the address implied in the `ReplyTo` header field by default unless it is made explicit that the reply should go to a specific address by using an endpoint mediator.

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Set up the back-end service:

    1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
    2. Extract the downloaded zip file.
    3. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.
    4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"
        ```bash
        sh axis2server.sh
        ```
    === "On Windows"
        ```bash
        axis2server.bat
        ```

4. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/ReturnAddress.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP"></a>

5. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

6. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.


## Execute the sample

Send a request like the following to the client.

```
POST /services/ReturnAddressProxy HTTP/1.1
Host: localhost:8290
SOAPAction: urn:getQuote
Content-Type: text/xml
Content-Length: 767

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
      <wsa:To>http://localhost:9000/services/SimpleStockQuoteService</wsa:To>
      <wsa:ReplyTo>
         <wsa:Address>http://10.150.3.53:8200/axis2/services/anonService2/</wsa:Address>
      </wsa:ReplyTo>
      <wsa:MessageID>urn:uuid:9aa8e783-2eb7-4649-9d36-a7fb3ad17abd</wsa:MessageID>
      <wsa:Action>urn:getQuote</wsa:Action>
   </soapenv:Header>
   <soapenv:Body>
      <m0:getQuote xmlns:m0="http://services.samples">
         <m0:request>
            <m0:symbol>foo</m0:symbol>
         </m0:request>
      </m0:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

The client receives 202 status code as the response.
