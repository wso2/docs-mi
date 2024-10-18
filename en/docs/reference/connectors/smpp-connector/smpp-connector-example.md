# SMPP Connector Example

SMPP (Short Message Peer-to-Peer Protocol) Connector allows you to send an SMS from an integration sequence. It uses the [jsmpp API](https://jsmpp.org/) to communicate with an SMSC (Short Message Service Center), which is used to store, forward, convert, and deliver Short Message Service (SMS) messages. jsmpp is a Java implementation of the SMPP protocol.

## What you'll build

Given below is a sample scenario that demonstrates how to work with the WSO2 SMPP Connector and send SMS messages via the SMPP protocol.

The SMPP server in SMSC has all the ESME (External Short Messaging Entity) addresses. This is an external application that connects to an SMSC and the active connection. When you send an SMS to a destination, it comes to the SMSC. Then one of the modules in SMSC checks if the destination address is available or not. If it is available, it creates a connection object that is responsible for sending the SMS message.
There are many SMPP gateways available in the world and now almost all the message centers support SMPP. It is not practical always to connect with real SMSC. However, in this scenario we will try it with **SMSC simulator**. Please refer to the [Setting up the SMPP Connector]({{base_path}}/reference/connectors/smpp-connector/smpp-connector-configuration/) documentation.

The following `sendSMS`operation is exposed via an API. The API with the context `/send` has one resource.

* `/send`: Used to send SMS messages to the Short Message Service Center.

The following diagram shows the overall solution. There is an HTTP API that you can invoke with an HTTP call with JSON. The API can send an SMS for the request number in a JSON request with the message in JSON. 

<img src="{{base_path}}/assets/img/integrate/connectors/smpp-connector-example.png" title="SMPP connector example" width="800" alt="smpp connector example"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `SmppTestApi` and the API context as `/smpptest`.

### Configure the API

1. First, we will create the `/send` resource to send an SMS to the Short Message Service Center. Refer the [Adding new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#adding-new-api-resources) guide to create a new resource. Provide the resource details below.
    <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-create-send-resource.png" title="Create send resource" width="800" alt="Create send resource"/>

2. Set up the **sendSMS** operation.
    1. Select the **send** resource. Click on the **+** mark indicated below to go to the **SMPP** connector and select **sendSMS** operation. 
           
        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-add-send-sms-operation.png" title="Add send sms operation" width="800" alt="Add send sms operation"/>    

    2. Then, click on **Add new connection** to create a new SMSC Connection. Provide your values for **Host**, **Port**, **System ID**, and **Password**. You can reuse the SMSC connection with other operators.
        <br/>

        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-add-sms-connection.png" title="Create SMPP connection" width="300" alt="Create SMPP connection"/>
        <br/>
        
        - **Host**: IP address of the SMSC. 
        - **Port**: Port to access the SMSC.
        - **System ID**: username to access the SMSC.
        - **Password**: password to access the SMSC. 
        - **System Type [Optional]**: It is used to categorize the type of ESME that is binding to the SMSC. Examples include “CP” (Content providers), “VMS” (voice mail system), and “OTA” (over-the-air activation system).
        - **Address Ton [Optional]**: Indicates the Type of Number of the ESME address.  
        - **Address NPI [Optional]**: Numbering Plan Indicator for ESME address.  
    

        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-config-new-connection.png" title="Config SMPP connection" width="400" height="400" alt="Config SMPP connection"/>

    3. In this operation we will send SMS messages peer-to-peer using the SMPP protocol. It provides a flexible data communications interface for transferring short message data between Message Centers, such as a Short Message Service Centre (SMSC), GSM Unstructured Supplementary Services Data (USSD) Server, or other types of Message Centers, and an SMS application system, such as a WAP Proxy Server, Email Gateway, or other Messaging Gateways. Please find the mandatory `send` operation parameters listed here.
               
        - **Source Address**: Source address of the SMS message. 
        - **Destination Address**: The destination address of the SMS message. 
        - **Message**: Content of the SMS message.
        
        While invoking the API, the values of the above three parameters come from user input.
    
    4. To get the input values into the API we can use the [property mediator]({{base_path}}/reference/mediators/property-mediator). Add the **Property** mediators into the Design pane as shown bellow.
    
        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-add-property-mediators.png" title="Add property mediators" width="800" alt="Add property mediators"/>

        The parameters available for configuring the Property mediator are as follows:
    
        > **Note**: The properties should be added to the pallet before creating the operation.
    
    4. Add the property mediator to capture the `sourceAddress` value. The `sourceAddress` contains the source address of the SMS message. 
   
        - **Property Name**: `sourceAddress`
        - **Property Value**: expression `json-eval($.sourceAddress)`
   
        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-source-address-property.png" title="Add property mediators sourceAddress" width="800" alt="Add property mediators sourceAddress"/>
    
    5. Add the property mediator to capture the `message` values. The message contains the content of the SMS message.                  
   
        - **Property Name**: `message`
        - **Property Value**: expression `json-eval($.message)`
     
        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-message-property.png" title="Add values to capture message" width="800" alt="Add values to capture message"/>  
      
    6. Add the property mediator to capture the `destinationAddress` values. The message contains the content of the SMS message.                  
       
        - **Property Name**: `destinationAddress`
        - **Property Value**: expression `json-eval($.destinationAddress)`
         
        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-destination-address-property.png" title="Add values to capture destinationAddress" width="800" alt="Add values to capture destinationAddress"/>  
    
    7. Add the `sendSMS` operation in the `SMPP` connector. Select the previously created connection. Provide the following expressions for source address, destination address, and message as below. 
        - **Source Address** - expression `$ctx:sourceAddress`
        - **Destination Address** - expression `$ctx:destinationAddress` 
        - **Message** - expression `$ctx:message`

        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-again-add-send-sms-operation.png" title="Again add send sms operation" width="800" alt="Again add send sms operation"/> 
        <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-select-sms-conn.png" title="Select created SMSC connection" width="400" alt="Select created SMSC connection"/> 
        
3. Get a response from the user.
    
    When you are invoking the created API, the request of the message is going through the `/send` resource. Finally, it is passed to the [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/). The Respond Mediator stops the processing of the current message and sends the message back to the client as a response.            
    
    Add **respond mediator** to the **Design view**. <br/>
    
    <img src="{{base_path}}/assets/img/integrate/connectors/smpp-example-add-respond.png" title="Add Respond mediator" width="800" alt="Add Respond mediator"/> 
 
    > **Note**: The properties should be added to the pallet before creating the operation.
       
4.  Now you can switch to the Source view and check the XML configuration files of the created API and sequences. 
    
    ??? note "SmppTestApi.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/smpptest" name="SmppTestApi" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/send">
                <inSequence>
                    <property name="sourceAddress" scope="default" type="STRING" expression="json-eval($.sourceAddress)"/>
                    <property name="message" scope="default" type="STRING" expression="json-eval($.message)"/>
                    <property name="destinationAddress" scope="default" type="STRING" expression="json-eval($.destinationAddress)"/>
                    <SMPP.sendSMS configKey="SMSC_CONFIG_1">
                        <sourceAddress>{$ctx:sourceAddress}</sourceAddress>
                        <destinationAddress>{$ctx:destinationAddress}</destinationAddress>
                        <message>{$ctx:message}</message>
                    </SMPP.sendSMS>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ``` 

    ??? note "SMSC_CONFIG_1.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="SMSC_CONFIG_1" xmlns="http://ws.apache.org/ns/synapse">
            <SMPP.init>
                <connectionType>init</connectionType>
                <name>SMSC_CONFIG_1</name>
                <host>localhost</host>
                <port>2775</port>
                <systemId>kasun</systemId>
                <password>kasun</password>
            </SMPP.init>
        </localEntry>
        ``` 

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/smpp-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the simulator details and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

## Test

Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

**Sample request**

  ```
  curl -v POST -d '{"sourceAddress":"16111", "message":"Hi! This is the first test SMS message.","destinationAddress":"071XXXXXXX"}' "http://localhost:8290/smpptest/send" -H "Content-Type:application/json"
  ```
**You will receive the `messageId` as expected response**

  ```
  {"messageId":"Smsc2001"}
  ```
**Expected Response in SMSC simulator console**
    
  ```
  02:38:39 [sys] new connection accepted
  02:38:39 [] client request: (bindreq: (pdu: 35 2 0 1) kasun kasun cp 52 (addrrang: 0 0 ) ) 
  02:38:39 [kasun] authenticated kasun
  02:38:39 [kasun] server response: (bindresp: (pdu: 0 80000002 0 1) Smsc Simulator) 
  02:38:39 [kasun] client request: (submit: (pdu: 80 4 0 2) (addr: 0 0 16111)  (addr: 0 0 )  (sm: msg: Hi! This is the first test SMS message.)  (opt: ) ) 
  02:38:39 [kasun] putting message into message store
  02:38:39 [kasun] server response: (submit_resp: (pdu: 0 80000004 0 2) Smsc2001 )
  ```
