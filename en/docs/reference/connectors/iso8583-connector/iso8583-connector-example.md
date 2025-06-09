# ISO8583 Connector Example

Given below is a sample scenario that demonstrates how the WSO2 ISO8583 Connector sends an ISO8583 message to financial networks using the integration runtime of WSO2.

## What you'll build

This example demonstrates how to expose core banking system functionality working with ISO8583 protocol as an API. Here, the integration runtime acts as ISO8583 terminal for the banking network. In this scenario to mock the banking network we use a test mock server.

Given below is a sample API that illustrates how you can configure ISO8583 connection and then use the `iso8583.sendMessage` operation to send an ISO8583 message for financial transactions.

<img src="{{base_path}}/assets/img/integrate/connectors/iso8583-connector.png" title="ISO8583 Connector" width="800" alt="ISO8583 Connector"/>

## Set up the integration project

Follow the steps in the [Creating an Integration Project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project. 

## Add integration logic

Follow the [Creating a REST API]({{base_path}}/develop/creating-artifacts/creating-an-api/) guide to create a REST API. Specify the API name as `SendisoTestAPI` and the API context as `/sendiso`.

### Configure the API

1. First, create the `/send` resource. For guidance, refer to the [Adding new API resources]({{base_path}}/develop/creating-artifacts/creating-an-api/#add-new-api-resources) guide. Use the following details when configuring the resource.
    - **URI Template**: `/send`
    - **HTTP Method**: `POST`

2. Set up the **sendMessage** operation.
    1. Select the **send** resource. Click on the **+** mark indicated below to go to the **ISO8583** connector and select **sendMessage** operation. 
           
        <img src="{{base_path}}/assets/img/integrate/connectors/common/add-connector-operation.png" title="Add connector operation" width="400" alt="Add connector operation"/>

    2. Then, click on **Add new connection** to create a new ISO8583 Connection. Provide your values for **Host** and **Port**. 
        <br/>
        
        - **serverHost**: IP address of the server. 
        - **serverPort**: Port to access the server. 
    
    3. Click on **Add** to create the connection. You can see the created connection in the **Connection** drop-down list. Select the created connection from the list.

    4. Since there is no need to configure the `sendMessage` operation parameters, add the operation as it is. 
        
3. Send a response to the user.          
    
    Add a [Respond mediator]({{base_path}}/reference/mediators/respond-mediator/) after the above operation.
       
4.  Now you can switch to the Source view and check the XML configuration files of the created API and connections. 
    
    ??? note "SendisoTestAPI.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/sendiso" name="SendisoTestAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/send">
                <inSequence>
                    <iso8583.sendMessage configKey="isoCon">
                    </iso8583.sendMessage>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ``` 

    ??? note "isoCon.xml"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <localEntry key="isoCon" xmlns="http://ws.apache.org/ns/synapse">
            <iso8583.init>
                <connectionType>ISO8583</connectionType>
                <serverHost>localhost</serverHost>
                <serverPort>5010</serverPort>
            </iso8583.init>
        </localEntry>
        ``` 

   
## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

**Sample request**:

- Content-Type: `application/xml`
- Request body:
    ```
             <ISOMessage>
               <data>
                <field id="104">000001161204171926FABCDE123ABD06414243</field>
                <field id="109">000termid1210Community106A5DFGR1112341234234</field>
                <field id="125">1048468112122012340000100000001107221800</field>
                <field id="127">01581200F230040102B000000000000004000000</field>
               </data>
           </ISOMessage>
    ```
   
**Expected Response**:
   
   ```
          <ISOMessage>
          <data>
          <field id="0">8000</field>
          <field id="23">000</field>
          </data>
          </ISOMessage>  
   ```

!!! Note
    You can set a header to the ISO message as below. When you set a header, it base64 decodes the value and sets the header length. When parsing the message, it assumes that the incoming message includes a header of the specified length at the beginning.
      ```
      <ISOMessage>
      <header>AAAAaw==</header>
      <data>
      <field id="104">000001161204171926FABCDE123ABD06414243</field>
      <field id="109">000termid1210Community106A5DFGR1112341234234</field>
      </data>
      </ISOMessage>
      ```
