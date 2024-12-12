# ISO8583 Inbound Endpoint Example

In the real world, financial scenarios are happening among thousands of banking systems and networks. In this situation, one system needs to act as a message publisher, and another system needs to be capable of receiving messages. Once the message is received, further processing actions are performed based on the logic that is implemented in the internal system.

The ISO8583 inbound endpoint of WSO2 acts as a message consumer. The ISO8583 inbound endpoint is a listening inbound endpoint that can consume ISO8583 standard messages. It then converts the messages to XML format and injects messages to a sequence in the integration runtime.

## What you'll build

This scenario demonstrates how the ISO8583 inbound endpoint works as an ISO8583 message consumer. In this scenario, to generate ISO8583 messages we use a sample Java client program.

The ISO8583 inbound endpoint listens on port 5001 and acts as a ISO8583 standard message consumer. When a sample Java client connects on port 5001, the ISO8583 inbound endpoint consumes ISO8583 standard messages, converts the messages to XML format, and then injects messages to a sequence in the integration runtime.

See [ISO8583 connector configuration]({{base_path}}/reference/connectors/iso8583-connector/iso8583-connector-configuration/) for more information. However, for simplicity of this example, we will just log the message. You can extend the sample as required using WSO2 [mediators]({{base_path}}/reference/mediators/about-mediators). 

The following diagram illustrates all the required functionality of the ISO8583 inbound operations that you are going to build. 

For example, while transferring bank and financial sector information using the ISO85883 message format among the banking networks, the message receiving can be done by using inbound endpoints. The ISO8583 inbound endpoint of WSO2 acts as an ISO8583 message receiver. You can inject that message into the mediation flow for getting the required output.

<img src="{{base_path}}/assets/img/integrate/connectors/iso8583-inbound-operations.png" title="ISO8583 inbound operations" width="800" alt="ISO8583 inbound operations"/>

## Set up the Inbound Endpoint

1. Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.

2. Add a new **ISO8583 Inbound Endpoint** by clicking **+** icon in the `Inbound Endpoints` and select `ISO8583 WSO2 Listener`. 
   
    <img src="{{base_path}}/assets/img/integrate/connectors/iso8583-inbound.png" title="Creating inbound endpoint Listener selector" width="800" alt="Creating inbound endpoint"/>
   
3. Provide Inbound Endpoint Name and Port values as shown below and click `Create`.

    <img src="{{base_path}}/assets/img/integrate/connectors/iso8583-inbound-form.png" title="Creating ISO8583 inbound endpoint form" width="800" alt="Creating ISO8583 inbound endpoint form"/>

    The source view of the created inbound endpoint is shown below. 

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="ISOInboundEndpoint" class="org.wso2.carbon.inbound.iso8583.listening.ISO8583MessageConsumer" sequence="ISOInboundEndpoint-inboundSequence" onError="ISOInboundEndpoint-inboundErrorSequence" suspend="false">
        <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.behavior">listening</parameter>
            <parameter name="port">5001</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="headerLength">0</parameter>
            <parameter name="coreThreads">1</parameter>
            <parameter name="maxThreads">3</parameter>
            <parameter name="keepAlive">1</parameter>
            <parameter name="queueLength">1</parameter>
        </parameters>
    </inboundEndpoint>
    ```
   
    !!! Note
        When creating the ISO8583 inbound endpoint you have two options in defining the injecting sequence and error sequence.
        <br/>- **Automatic**: Click the checkbox *Automatically generate sequence*
        <br/>- **Manual**: You can select already defined sequences as injecting and error sequences.<br/>
    
    !!! Info
        In this example, we are using `Automatic` option and that will create an injecting sequence named `ISOInboundEndpoint-inboundSequence` and error sequence named `ISOInboundEndpoint-inboundErrorSequence`.<br/>
       
4. Implement the injecting sequence which process the message - `ISOInboundEndpoint-inboundSequence`.
   
    In this example for simplicity we will just log the message, but in a real world use case, this can be any type of message mediation.
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?><?xml version="1.0" encoding="UTF-8"?>
    <sequence name="ISOInboundEndpoint-inboundSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <log category="INFO" level="full" description="Received ISO Message">
           <property name="Log_Message" value="Message received through ISO8583 Inbound Endpoint"/>
       </log>
    </sequence>
    ```

## Export integration logic as a CApp
In order to export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

## Deployment

1. Download [jpos-1.9.4.jar](http://mvnrepository.com/artifact/org.jpos/jpos/1.9.4), [jdom-1.1.3.jar](http://mvnrepository.com/artifact/org.jdom/jdom/1.1.3), and [commons-cli-1.3.1.jar](http://mvnrepository.com/artifact/commons-cli/commons-cli/1.3.1) and add it to `<Project_Home>/deployment/libs` folder.
2. In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.


## Test

1. Download the JAR file of Test Client program from [here]({{base_path}}/assets/attachments/jar/ISO8583TestClient-1.0.jar).
2. Open a terminal, navigate to downloaded JAR file location.
3. Execute the following command to start the Test Client program:

    ```bash
    java -jar ISO8583TestClient-1.0.jar
    ```
   
4. Provide a ISO8583 standard message as input for ISO8583 Data:

    ```
    0200B220000100100000000000000002000020134500000050000001115221801234890610000914XYRTUI5269TYUI021ABCDEFGHIJ 1234567890 
    ```
   
   **Expected response**
   
   ```
   [2024-12-11 16:02:08,302]  INFO {LogMediator} - To: , MessageID: urn:uuid:7B55A5B8E9634F8DC81733922128267, Direction: request, Log_Message = Message received through ISO8583 Inbound Endpoint, Envelope: 
   <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
      <soapenv:Body>
         <ISOMessage>
            <data>
              <field id="0">0200</field>
              <field id="3">201345</field>
              <field id="4">000000500000</field>
              <field id="7">0111522180</field>
              <field id="11">123489</field>
              <field id="32">100009</field>
              <field id="44">XYRTUI5269TYUI</field>
              <field id="111">ABCDEFGHIJ 1234567890</field>
           </data>
        </ISOMessage>
      </soapenv:Body>
   </soapenv:Envelope>
   ```   
