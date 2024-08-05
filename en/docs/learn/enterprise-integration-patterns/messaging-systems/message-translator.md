# Message Translator

Typically, different applications use different data types. Therefore, for two applications to successfully communicate, you should intermediately translate the messages that pass from one application to the data type compatible with the receiving application. A translator changes the context of a message from one interface to another, allowing messages to adhere to message context rules of the back-end service.

The Message Translator EIP is responsible for message translating to ensure compatibility between applications supporting different data types.

!!! info
    For more information, see the [Message Translator](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html) documentation. 


Sample scenario
The example scenario depicts an inventory of stocks. It illustrates how the sender sends a request in one format, which is then transformed into another format compatible with the receiver. The format of the request is as follows:

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header>   
   </soapenv:Header>
   <soapenv:Body>
        <ser:Code>foo</ser:Code>
   </soapenv:Body>
</soapenv:Envelope>
```

The message format compatible with the receiver is as follows:

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>
         <!--Optional:-->
         <ser:request>
            <!--Optional:-->
            <ser:symbol>foo</ser:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

All requests in the first format should be translated to the second by the ESB profile of WSO2 EI. 

!!! note
    The translation is done through the Payload Factory Mediator.

![Message translator scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-translator-scenario.png)

## Synapse configurations of the artifacts

!!! note
    When you unzip the ZIP file you download below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/synapse-config` directory. For more information about these artifacts, go to WSO2 EI Documentation.

**Proxy Service**

```
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="message-translator-proxy" startOnLoad="true" transports="http https"
    xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
            <!-- Will transform the incoming message to the format specified below -->
            <payloadFactory media-type="xml">
                <format>
                    <m:getQuote
                        xmlns:m="http://services.samples">
                        <m:request>
                            <m:symbol>$1</m:symbol>
                        </m:request>
                    </m:getQuote>
                </format>
                <args>
                    <arg evaluator="xml" expression="//m0:Code"
                        xmlns:m0="http://services.samples"/>
                    </args>
                </payloadFactory>
                <send>
                    <endpoint>
                        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
                    </endpoint>
                </send>
            </inSequence>
            <outSequence>
                <respond/>
            </outSequence>
            <faultSequence/>
    </target>
</proxy>
```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

1. Install WSO2 EI

    For instructions, go to Installing the Product in the WSO2 EI Documentation.

2. Set up WSO2 EI Tooling

    For instructions, go to Installing Enterprise Integrator Tooling in the WSO2 EI Documentation.

3. Start the backend (`SimpleStockQuoteService`) service

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Server/src/SimpleStockQuoteService` directory, and execute the ant command.

    For more information on the SimpleStockQuoteService, go to Deploying sample backend services in the WSO2 EI Documentation.

4. Start one Axis2 server instance

    In a new Console tab, navigate to the <EI_HOME>/samples/axis2server directory, and execute the following commands:

    === "On Windows"
          axis2server.bat
    === "On Linux/Solaris"
          ./axis2server.sh  

5. Download the artifacts of the sample

    Download the Message-Translator.zip file.

6. Import the artifacts to WSO2 EI

    Click File -> Import -> WSO2 -> Existing WSO2 projects into workspace to import the downloaded ZIP file via WSO2 EI Tooling.

7. Start the ESB profile of the WSO2 EI server

    For instructions, go to Running WSO2 Enterprise Integrator via Tooling in the WSO2 EI Documentation.

8. Start SOAP UI

    For instructions on downloading and starting, go to SOAP UI.

## Execute the sample

Send the following request to the ESB Profile using SOAP UI (or any other SOAP client).

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header>   
   </soapenv:Header>
   <soapenv:Body>
        <ser:Code>foo</ser:Code>
   </soapenv:Body>
</soapenv:Envelope>
```

![Message translator request]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-translator-request.png)

## Analyze the output

After sending the request to the ESB profile of WSO2 EI through the client, notice that the request is successfully generated in the Stock Quote server.  The following output will be printed on the Axis2 server's Console, confirming that the request is successfully received by the back-end service.

```

```

You can view the response in the SOAP UI as follows. 

![Message translator response]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-translator-response.png)
