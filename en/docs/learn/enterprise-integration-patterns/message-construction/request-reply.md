# Request-Reply

This page explains how you can implement a sample scenario of Request-Reply EIP using WSO2 Micro Integrator.

## Introduction to Request-Reply

The Request-Reply EIP facilitates two-way communication by ensuring that a sender gets a response or reply back from the receiver after sending a request message. This pattern sends a pair of Request-Reply messages, each on its own channel. 

!!! info

    For more information, refer to [Request-Reply](http://www.eaipatterns.com/RequestReply.html) documentation.

![Request reply]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/request-reply.gif)

## Sample scenario

The example scenario illustrates how a request for a service is made through one channel, and the response from the service is returned to the requester on a separate channel.

The diagram below depicts how to simulate the example scenario.

![Request reply]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/request-reply.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Request-Reply EIP by comparing their core components.

| Request-Reply EIP (Figure 1) | Request-Reply Example Scenario (Figure 2) |
|------------------------------|-------------------------------------------|
| Requestor                    | Simple Stock Quote Client                 |
| Request Channel              | Send, Endpoint                            |
| Replier                      | Stock Quote Service Instance              |
| Reply Channel                | Send, Endpoint                            |

## Synapse configuration of the artifacts

Given below is the synapse configuration of this sample.

=== "Proxy Service"
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <proxy name="RequestReplyProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
      <target>
         <inSequence>
            <sequence key="RequestProcessSeq"/>
            <call>
               <endpoint key="SimpleStockQuoteServiceEp"/>
            </call>
            <sequence key="ResponseProcessSeq"/>
            <respond/>
         </inSequence>
      </target>
   </proxy>
   ```
=== "Request Process Sequence"
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sequence name="RequestProcessSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
      <header name="Action" xmlns:wsa="http://www.w3.org/2005/08/addressing" action="set" scope="default" value="urn:getQuote"/>
   </sequence>
   ```
=== "Response Process Sequence"
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sequence name="ResponseProcessSeq" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
      <enrich description="">
         <source clone="true" type="inline">
            <ResponseEnvelopeWrapper></ResponseEnvelopeWrapper>
         </source>
         <target action="child" type="body"/>
      </enrich>
   </sequence>
   ```

Let's investigate the elements of the configuration in detail. 

- Request Process Sequence - When a client sends a message, it is picked up by this sequence.
- Call Mediator -  The call mediator sends the message to the endpoint running on port 9000.
- Response Process Sequence - The response from the endpoint can be further processed through this sequence. 
- Respond Mediator - The respond mediator will direct the message back to the requesting client.

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the [backend service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).

4. Extract the downloaded zip file.

5. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.

6. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ``` 

7. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/RequestReply.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9. Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

## Execute the sample

Send the following request to the above proxy service.

```
POST /services/RequestReplyProxy HTTP/1.1
Host: localhost:8290
Content-Type: text/xml

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
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

## Analyze the output

A message similar to the one below appears in the simple axis2server.
   
```bash
Fri Aug 09 00:23:15 IST 2024 samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

You can view the response as follows.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <ResponseEnvelopeWrapper xmlns="http://ws.apache.org/ns/synapse">
        <soapenv:Envelope>
            <soapenv:Header/>
            <soapenv:Body>
                <ns:getQuoteResponse xmlns:ns="http://services.samples">
                    <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                        <ax21:change>4.2113329121535985</ax21:change>
                        <ax21:earnings>12.835575447763125</ax21:earnings>
                        <ax21:high>169.56462892544192</ax21:high>
                        <ax21:last>164.91134732838054</ax21:last>
                        <ax21:lastTradeTimestamp>Sun Aug 11 22:57:48 IST 2024</ax21:lastTradeTimestamp>
                        <ax21:low>-164.53083186503255</ax21:low>
                        <ax21:marketCap>4.370714333403162E7</ax21:marketCap>
                        <ax21:name>IBM Company</ax21:name>
                        <ax21:open>172.04078135604772</ax21:open>
                        <ax21:peRatio>24.822545511157507</ax21:peRatio>
                        <ax21:percentageChange>2.2584407962867004</ax21:percentageChange>
                        <ax21:prevClose>186.47081292003838</ax21:prevClose>
                        <ax21:symbol>IBM</ax21:symbol>
                        <ax21:volume>19826</ax21:volume>
                    </ns:return>
                </ns:getQuoteResponse>
            </soapenv:Body>
        </soapenv:Envelope>
    </ResponseEnvelopeWrapper>
</soapenv:Envelope>
```
