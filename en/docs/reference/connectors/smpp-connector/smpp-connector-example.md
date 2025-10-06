---
search:
  boost: 2
---
# SMPP Connector Example

SMPP (Short Message Peer-to-Peer Protocol) Connector allows you to send an SMS from an integration sequence. It uses the [jsmpp API](https://jsmpp.org/) to communicate with an SMSC (Short Message Service Center), which is used to store, forward, convert, and deliver Short Message Service (SMS) messages. jsmpp is a Java implementation of the SMPP protocol.

## What you'll build

Given below is a sample scenario that demonstrates how to work with the WSO2 SMPP Connector and send SMS messages via the SMPP protocol.

The SMPP server in SMSC has all the ESME (External Short Messaging Entity) addresses. This is an external application that connects to an SMSC and the active connection. When you send an SMS to a destination, it comes to the SMSC. Then one of the modules in SMSC checks if the destination address is available or not. If it is available, it creates a connection object that is responsible for sending the SMS message.
There are many SMPP gateways available in the world and now almost all the message centers support SMPP. It is not practical always to connect with real SMSC. However, in this scenario you will try it with **SMSC simulator**. Please refer to the [Setting up the SMPP Connector]({{base_path}}/reference/connectors/smpp-connector/smpp-connector-configuration/) documentation.

The following `sendSMS`operation is exposed via an API. The API with the context `/send` has one resource.

* `/send`: Used to send SMS messages to the Short Message Service Center.

The following diagram shows the overall solution. There is an HTTP API that you can invoke with an HTTP call with JSON. The API can send an SMS for the request number in a JSON request with the message in JSON. 

<img src="{{base_path}}/assets/img/integrate/connectors/smpp-connector-example.png" title="SMPP connector example" width="800" alt="smpp connector example"/>

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `SmppTestApi` and the API context as `/smpptest`.

### Configure the API

1. First, you will create the `/send` resource to send an SMS to the Short Message Service Center. Refer to the [Adding new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#adding-new-api-resources) guide to create a new resource. Provide the resource details as below.
    - **URI Template**: `/send`
    - **HTTP Method**: `POST`

2. Set up the **sendSMS** operation.
    1. Select the **send** resource. Click on the **+** icon on the canvas to open the **Mediator Palette**, search for the **SMPP** connector, and select the **sendSMS** operation.
           
        <img src="{{base_path}}/assets/img/integrate/connectors/common/add-connector-operation.png" title="Add connector operation" width="400" alt="Add connector operation"/>

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

    3. In this operation you will send SMS messages peer-to-peer using the SMPP protocol. It provides a flexible data communications interface for transferring short message data between Message Centers, such as a Short Message Service Centre (SMSC), GSM Unstructured Supplementary Services Data (USSD) Server, or other types of Message Centers, and an SMS application system, such as a WAP Proxy Server, Email Gateway, or other Messaging Gateways. Please find the mandatory `send` operation parameters listed here.
               
        - **Source Address**: Source address of the SMS message. 
        - **Destination Address**: The destination address of the SMS message. 
        - **Message**: Content of the SMS message.
        
        While invoking the API, the values of the above three parameters come from user input.
    
    4. Add the `sendSMS` operation in the `SMPP` connector. Select the previously created connection. Provide the following expressions for source address, destination address, and message as below. 
        - **Source Address** - expression `payload.sourceAddress`
        - **Destination Address** - expression `payload.destinationAddress` 
        - **Message** - expression `payload.message`

        To store the response of the operation in the message body, select **Overwrite Message Body** in the Output Section. This will allow you to send the response back to the user as a response of the API invocation.
        
3. Send a response to the user.          
    
    Add a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.
       
4.  Now you can switch to the Source view and check the XML configuration files of the created API and sequences. 
    
    ??? note "SmppTestApi.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/smpptest" name="SmppTestApi" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/send">
                <inSequence>
                    <SMPP.sendSMS configKey="SMSC_CONFIG_1">
                        <sourceAddress>{$ctx:sourceAddress}</sourceAddress>
                        <destinationAddress>{$ctx:destinationAddress}</destinationAddress>
                        <message>{$ctx:message}</message>
                        <responseVariable>SMPP_sendSMS_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
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

!!! tip
    You may need to update the simulator details and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

**Sample request**

  ```
{"sourceAddress":"16111", "message":"Hi! This is the first test SMS message.","destinationAddress":"071XXXXXXX"}
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
