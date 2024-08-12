# AmazonSQS Connector Example

The WSO2 Amazon SQS connector allows you to access the exposed Amazon SQS API from an integration sequence.

## What you'll build

This example explains how to use Amazon SQS Connector to create a queue in the Amazon SQS, send a message to the queue, forward it to Simple Stock Quote Service Backend, and send the response to the user. 

It has a single HTTP API resource, which is `sendToQueue`. 

<img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-connector.jpg" title="AmazonSQS-Connector" width="800" alt="AmazonSQS-Connector"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the environment 

1. Follow the steps mentioned in the [Setting up the Amazon S3 Environment]({{base_path}}/reference/connectors/amazonsqs-connector/amazonsqs-connector-config) document to create an Amazon account and obtain access key ID and secret access key. Keep them saved to use in the next steps.

2. Download and place the following client libraries in to the <PRODUCT_HOME>/lib directory (From SQS connector 2.0.0 and above).
   
     - apache-client-2.20.26.jar 
     - auth-2.26.20.jar 
     - aws-core-2.26.20.jar 
     - checksums-2.26.20.jar 
     - checksums-spi-2.26.20.jar 
     - endpoints-spi-2.26.20.jar 
     - http-auth-aws-2.26.20.jar 
     - http-auth-spi-2.26.20.jar 
     - http-client-spi-2.26.20.jar 
     - identity-spi-2.26.20.jar 
     - json-utils-2.20.26.jar 
     - metrics-spi-2.20.26.jar 
     - profiles-2.26.20.jar 
     - protocol-core-2.20.26.jar 
     - reactive-streams-1.0.4.jar 
     - regions-2.26.20.jar 
     - retries-spi-2.26.20.jar 
     - sqs-2.26.20.jar 
     - third-party-jackson-core-2.20.26.jar 
     - utils-2.26.20.jar 
     - aws-json-protocol-2.26.20.jar 
     - http-auth-2.26.20.jar 
     - sdk-core-2.26.20.jar 
     - retries_2.26.20.jar

## Set up the integration project

Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project.

## Create the integration logic

1. First let's create a connection to the Amazon SQS instance. Navigate to **MI Project Explorer** > **Local Entries** > **Connections** and click on the **+** sign next to **Connections** to open the **Add New Connection** view.
2. Select the **Amazonsqs** connector.
   Configure the below values.

       - Connection Name - Unique name to identify the connection by.
       - Connection Type - Type of the connection that specifies the protocol to be used.
       - Access Key ID - Access key associated with your Amazon user account.
       - Secret Access Key - Secret Access key associated with your Amazon user account.
       - Region - Region that is used to select a regional endpoint to make requests.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-sqs/connectors.png" title="Available connectors" width="500" alt="Available connectors"/>
    
    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-sqs/add-new-connection.png" title="Add new connection" width="500" alt="Add new connection"/>


    The created connection is saved as a **Local Entry** as below.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <localEntry key="AMAZON_SQS_CONNECTION" xmlns="http://ws.apache.org/ns/synapse">
        <amazonsqs.init>
            <connectionType>amazonsqs</connectionType>
            <name>AMAZON_SQS_CONNECTION</name>
            <accessKeyId>access-key-id</accessKeyId>
            <secretAccessKey>secret-access-key</secretAccessKey>
            <region>us-east-2</region>
        </amazonsqs.init>
    </localEntry>
    ```

3. Navigate to **MI Project Explorer** > **Endpoints** and click on the **+** icon next to **Endpoints**.
4. Select **Address Endpoint**.

    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-sqs/add-endpoint.png" title="Adding an endpoint" width="800" alt="Adding an endpoint"/>

5. You can go to the source view of the XML configuration file of the endpoint and copy the following configuration.
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <endpoint name="SimpleStockQuote" xmlns="http://ws.apache.org/ns/synapse">
       <address     uri="http://localhost:9000/services/SimpleStockQuoteService">
           <suspendOnFailure>
               <initialDuration>-1</initialDuration>
               <progressionFactor>1</progressionFactor>
           </suspendOnFailure>
           <markForSuspension>
               <retriesBeforeSuspension>0</retriesBeforeSuspension>
           </markForSuspension>
       </address>
   </endpoint>
   ```
6. Then create the following sequences, which are buildMessage, createQueue, sendMessage and ReceiveAndForwardMessage.
7. Navigate to **MI Project Explorer** > **Sequences** and click on the **+** sign next to Sequences to open the **Create New Sequence** form.
    
    <img src="{{base_path}}/assets/img/integrate/connectors/amazon-sqs/create-new-sequence.png" title="Adding a Sequence" width="800" alt="Adding a Sequence"/>

8. Provide the Sequence name as `buildMessage` and click **Create**. You can go to the source view of the XML configuration file of the sequence and copy the following configuration. In this sequence we are taking the user's input `companyName` and we build the message using a Payload Factory Mediator.
   ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="buildMessage" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
          <property expression="json-eval($.companyName)" name="companyName" scope="default" type="STRING"/>
          <payloadFactory media-type="xml">
              <format>
                  <m0:getQuote xmlns:m0="http://services.samples">
                     <m0:request>
                        <m0:symbol>$1</m0:symbol>
                     </m0:request>
                 </m0:getQuote>
              </format>
              <args>
                  <arg evaluator="xml" expression="$ctx:companyName"/>
              </args>
          </payloadFactory>
          <header name="Action" scope="default" value="urn:getQuote"/>
          <enrich>
              <source clone="true" type="body"/>
              <target property="target_property" type="property"/>
          </enrich>
      </sequence>
   ```
   
9. Create the `createQueue` sequence as shown below. In this sequence, we create a queue in the Amazon SQS instance. 
  ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="createQueue" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log category="INFO" level="custom">
           <property name="queueName" expression="$ctx:queueName" />
       </log>
       <amazonsqs.createQueue configKey="AMAZON_SQS_CONNECTION">
             <queueName>{$ctx:queueName}</queueName>
       </amazonsqs.createQueue>
       <log level="custom">
             <property expression="json-eval($)" name="queueURL"/>
       </log>
       <property expression="json-eval($.CreateQueueResponse.CreateQueueResult.QueueUrl)" name="queueURL" scope="default" type="STRING"/>
       <log level="custom">
             <property expression="$ctx:queueURL" name="queueURL"/>
       </log>
    </sequence>
  ```

4. Create `sendMessage` sequence as shown below. In this sequence, we send the message that we built in step 5 to the Amazon SQS Queue. 
  ```
  <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="sendMessage" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <amazonsqs.sendMessage configKey="AMAZON_SQS_CONNECTION">
            <queueUrl>{$ctx:queueURL}</queueUrl>
            <messageBody>{$ctx:target_property}</messageBody>
        </amazonsqs.sendMessage>
    </sequence>
  ```

10. Create the ReceiveAndForwardMessage sequence as shown below. In this sequence, we will receive the message from the Amazon SQS queue and forward it to the StockQuote Endpoint. 
```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <sequence name="ReceiveAndForwardMessage" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
       <amazonsqs.receiveMessage configKey="AMAZON_SQS_CONNECTION">
             <maxNumberOfMessages>5</maxNumberOfMessages>
             <queueUrl>{$ctx:queueURL}</queueUrl>
       </amazonsqs.receiveMessage>
       <property xmlns:m0="http://services.samples" name="stockprop" expression="$body//m0:getQuote"/>
       <log level="custom">
             <property expression="$ctx:stockprop" name="stockprop"/>
       </log>
       <payloadFactory media-type="xml">
           <format>
               <soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
                   <soapenv:Body>$1</soapenv:Body>
               </soapenv:Envelope>
           </format>
           <args>
               <arg evaluator="xml" expression="$ctx:stockprop" />
           </args>
       </payloadFactory>
       <header name="Action" scope="default" value="urn:getQuote"/>
       <call>
           <endpoint key="SimpleStockQuote" />
       </call>
   </sequence>
```

11. Navigate to **MI Project Explorer** > **APIs** and click on the **+** sign next to APIs to open the **Synapse API Artifact** creation form.
  
12. Provide the API name as `SQSAPI` and the API context as `/sqs` and click **Create**. You can go to the source view of the XML configuration file of the API and copy the following configuration. 
```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <api context="/sqs" name="SQSAPI" xmlns="http://ws.apache.org/ns/synapse">
       <resource methods="POST" uri-template="/sendToQueue">
           <inSequence>
               <property expression="json-eval($.queueName)" name="queueName" scope="default" type="STRING" />
               <sequence key="buildMessage" />
               <sequence key="createQueue" />
               <sequence key="sendMessage" />
               <sequence key="ReceiveAndForwardMessage" />
               <respond />
           </inSequence>
           <faultSequence/>
       </resource>
   </api>
```

Now we can export the artifacts into a Carbon Application (CApp) and deploy it to the server runtime to run it and test it.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/amazonSQSExample.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the value of the access key and make other such changes before deploying and running this project.

## Deployment

Follow the steps in [deploy-artifacts]({{base_path}}/develop/deploy-artifacts) guide to build and export it into a CAR file (.car file) using the WSO2 Micro Integrator Visual Studio Code extension.

## Test

1. Deploy the back-end service `SimpleStockQuoteService`.

    1. Download the ZIP file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
    2. Extract the downloaded zip file.
    3. Open a terminal and navigate to the `axis2Server/bin/` directory inside the extracted folder.
    4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

        === "On MacOS/Linux/CentOS"   
            ```bash
             sh axis2server.sh
            ```
        === "On Windows"              
            ```bash
            axis2server.bat
            ```

3. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).

   ```
       curl --location 'http://localhost:8290/sqs/sendToQueue' \
       --header 'Content-Type: application/json' \
       --data '{
          "companyName":"WSO2",
          "queueName":"Queue1"
       }'
    ```

**Expected Response**: 

You should get the following response with the 'sys_id' and keep it saved. 

```
<ns:getQuoteResponse xmlns:ns="http://services.samples">
    <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
        <ax21:change>-2.3656563413900478</ax21:change>
        <ax21:earnings>13.92852425779543</ax21:earnings>
        <ax21:high>161.79828086332458</ax21:high>
        <ax21:last>155.25325499166968</ax21:last>
        <ax21:lastTradeTimestamp>Thu Aug 08 13:28:27 IST 2024</ax21:lastTradeTimestamp>
        <ax21:low>160.3277722524871</ax21:low>
        <ax21:marketCap>5.643236512855213E7</ax21:marketCap>
        <ax21:name>WSO2 Company</ax21:name>
        <ax21:open>-153.68772137674222</ax21:open>
        <ax21:peRatio>-18.75230816155238</ax21:peRatio>
        <ax21:percentageChange>-1.3934902393316715</ax21:percentageChange>
        <ax21:prevClose>169.76483039627422</ax21:prevClose>
        <ax21:symbol>WSO2</ax21:symbol>
        <ax21:volume>19325</ax21:volume>
    </ns:return>
</ns:getQuoteResponse>
```

## What's next

* To customize this example for your own scenario, see [Amazon SQS Connector Reference Guide]({{base_path}}/reference/connectors/amazonsqs-connector/amazonsqs-connector-reference) documentation for all operation details of the connector.
