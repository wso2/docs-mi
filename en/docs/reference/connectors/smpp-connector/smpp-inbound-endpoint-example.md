# SMPP inbound endpoint example

The SMPP inbound endpoint allows you to consume messages from SMSC (Short Message Service Center). The WSO2 SMPP inbound endpoint acts as a message consumer. It creates a connection with the SMSC, then listens over a port to consume only SMS messages from the SMSC and injects the messages into the integration sequence. It will receive alert notifications or will notify when a data short message is accepted.

## What you'll build

This scenario demonstrates how the SMPP inbound endpoint works as a message consumer. In this scenario, you should have connectivity with SMSC (Short Message Service Center) via the SMPP protocol. For this, we are using **SMSC simulator** to accomplish the required requirements. Please refer to the [Setting up the SMPP Connector]({{base_path}}/reference/connectors/smpp-connector/smpp-connector-configuration/) documentation for more information.

The SMPP inbound endpoint is listening to the Short Message Service Center for consuming messages using a defined port number in the inbound endpoint configurations. If the SMSC generates some message by itself or the user injects SMS messages into the SMSC, the WSO2 SMPP inbound endpoint will receive and notify. Then just log the SMS message content. In your own scenarios, you can inject that message into the mediation flow to get the required output.

The following diagram shows the overall solution we are going to build. The SMSC will generate or receive messages from the outside, while the SMPP inbound endpoint will consume messages based on the updates.

<img src="{{base_path}}/assets/img/integrate/connectors/smpp-inboundep-example.png" title="SMPP Inbound Endpoint" width="800" alt="SMPP Inbound Endpoint"/>

## Set up the inbound endpoint

1. Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

2. Create a sequence to process the message. In this example, we will just log the message for simplicity, but in a real-world use case, this can be any message mediation.
 
      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence xmlns="http://ws.apache.org/ns/synapse" name="request" onError="fault">
         <log level="custom">
            <property xmlns:ns="http://org.apache.synapse/xsd"
                      name="MessageId"
                      expression="get-property('SMPP_MessageId')"/>
            <property xmlns:ns="http://org.apache.synapse/xsd"
                      name="SourceAddress"
                      expression="get-property('SMPP_SourceAddress')"/>
            <property xmlns:ns="http://org.apache.synapse/xsd"
                      name="DataCoding"
                      expression="get-property('SMPP_DataCoding')"/>
            <property xmlns:ns="http://org.apache.synapse/xsd"
                      name="ScheduleDeliveryTime"
                      expression="get-property('SMPP_ScheduleDeliveryTime')"/>
            <property xmlns:ns="http://org.apache.synapse/xsd"
                      name="SequenceNumber"
                      expression="get-property('SMPP_SequenceNumber')"/>
            <property xmlns:ns="http://org.apache.synapse/xsd"
                      name="ServiceType"
                      expression="get-property('SMPP_ServiceType')"/>
         </log>
         <log level="full"/>
      </sequence>
      ```
   
3. Click on the **+** button next to **Inbound Endpoints** and select **SMPP** to add a new SMPP inbound endpoint.  

    <img src="{{base_path}}/assets/img/integrate/connectors/smpp-create-new-inbound-endpoint.png" title="Creating smpp inbound endpoint" width="1000" alt="Creating smpp inbound endpoint"/>
    <br/>

4. Configure the SMPP inbound endpoint as shown below and click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/smpp-config-endpoint-1.png" title="Configure SMPP inbound endpoint 1" width="1000" alt="Configure SMPP inbound endpoint 1"/>
    <br/>
   
    !!! Note
        When creating the SMPP inbound endpoint you have two options in defining the injecting sequence and error sequence.
        <br/>- **Automatic**: Click the checkbox *Automatically generate sequence*
        <br/>- **Manual**: You can select already defined sequences as injecting and error sequences.

        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-injecting-and-error-sequence.png" title="Configure SMPP inbound endpoint Injecting and Error Sequences" width="600" alt="Configure SMPP inbound endpoint Injecting and Error Sequences"/>

    The source view of the created inbound endpoint is shown below.
    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <inboundEndpoint name="SMPP" class="org.wso2.carbon.inbound.smpp.SMPPListeningConsumer" sequence="request" onError="fault" suspend="false">
        <parameters xmlns="http://ws.apache.org/ns/synapse">
            <parameter name="inbound.behavior">eventBased</parameter>
            <parameter name="sequential">true</parameter>
            <parameter name="coordination">true</parameter>
            <parameter name="host">localhost</parameter>
            <parameter name="port">2775</parameter>
            <parameter name="systemId">pavel</parameter>
            <parameter name="password">wpsd</parameter>
            <parameter name="bindType">BIND_RX</parameter>
            <parameter name="addressTon">UNKNOWN</parameter>
            <parameter name="addressNpi">UNKNOWN</parameter>
            <parameter name="enquireLinkTimer">10000</parameter>
            <parameter name="transactionTimer">200</parameter>
            <parameter name="reconnectInterval">1000</parameter>
            <parameter name="retryCount">3</parameter>
            <parameter name="exponentialFactor">5</parameter>
            <parameter name="maximumBackoffTime">10000</parameter>
        </parameters>
    </inboundEndpoint>
    ```        

!!! Note
    To configure the `systemId` and `password` parameter values, see [Configure the SMSC]({{base_path}}/reference/connectors/smpp-connector/smpp-connector-configuration/#configure-the-smsc-short-message-service-center-simulator).
    <br/>- **systemId**: The username to access the SMSC
    <br/>- **password**: The password to access the SMSC
   
## Export integration logic as a CApp

Follow the steps in the [Build and Export the Carbon Application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide to build and export the CApp to a specified location.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/smpp-inbound-endpoint.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the simulator details and make other such changes before deploying and running this project.

## Deployment

1. Navigate to the [connector store](https://store.wso2.com/store/assets/esbconnector/list) and search for `SMPP Connector`. Click on `SMPP Inbound Endpoint` and download the .jar file by clicking on `Download Inbound Endpoint`. Copy this .jar file into **PRODUCT-HOME/lib** folder. 

2. Download  [jsmpp-2.1.0-RELEASE.jar](https://mvnrepository.com/artifact/com.googlecode.jsmpp/jsmpp/2.1.0-RELEASE) and [asyncretry-jdk7-0.0.6.jar](https://mvnrepository.com/artifact/com.nurkiewicz.asyncretry/asyncretry-jdk7/0.0.6) copy inside **PRODUCT-HOME/lib** folder.

    !!! Tip
        Alternatively, for deployment steps 1 and 2, MI for VS Code provides the capability to copy JARs to the `<PRODUCT_HOME>/lib` folder while exporting the CApp. You can copy the necessary JARs to the **deployment** > **libs** folder in the **Explorer** view.
       
        <img src="{{base_path}}/assets/img/integrate/connectors/copy-libs-via-vscode.png" title="Copy libs with VS Code" width="400" alt="Copy libs with VS Code" />

3. Copy the exported carbon application to the **PRODUCT-HOME/repository/deployment/server/carbonapps** folder. 

4. [Start the integration server]({{base_path}}/get-started/quick-start-guide/#start-the-micro-integrator). 

## Test  

   Send an SMS message from SMSC to the user `kasun`. 
      
   1. Open the simulator. 
   2. Press `Enter`, and you will see multiple options.
     
      <img src="{{base_path}}/assets/img/integrate/connectors/smsc-simulator-multiple-options.png" title="SMSC simulator multiple options" width="250" alt="SMSC simulator multiple options" style="border:1px solid black"/>
   
   3. Enter `4` to send a message. 
   4. Then, you will get to type the message. Enter the message "Hi! This is the first test SMS message.".

   SMPP Inbound Endpoint will consume messages from the SMSC.
   
   **Expected response**

   ```
    [2024-07-17 15:38:26,381]  INFO {LogMediator} - MessageId = 0, SourceAddress = null, DataCoding = 0, ScheduleDeliveryTime = null, SequenceNumber = 3, ServiceType = null
    [2024-07-17 15:38:26,385]  INFO {LogMediator} - To: , MessageID: urn:uuid:2D91A3B4AC27392C7E1721210906380, Direction: request, Envelope: <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><text xmlns="http://ws.apache.org/commons/ns/payload">Hi! This is the first test SMS message</text></soapenv:Body></soapenv:Envelope>
   ```
