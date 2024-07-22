# AmazonSQS Connector Example

The WSO2 Amazon SQS connector allows you to access the exposed Amazon SQS API from an integration sequence.

## What you'll build

This example explains how to use Amazon SQS Connector to create a queue in the Amazon SQS, send a message to the queue, forward it to Simple Stock Quote Service Backend, and send the response to the user. 

It has a single HTTP API resource, which is `sendToQueue`. 

<img src="{{base_path}}/assets/img/integrate/connectors/amazonsqs-connector.jpg" title="AmazonSQS-Connector" width="800" alt="AmazonSQS-Connector"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Setting up the environment 

1. Please follow the steps mentioned in the [Setting up the Amazon S3 Environment ]({{base_path}}/reference/connectors/amazonsqs-connector/amazonsqs-connector-config) document in order to create an Amazon account and obtain access key id and secret access key. Keep them saved to be used in the next steps.  

2. In this example we will be using XPath 2.0 which needs to be enabled in the product as shown below before starting the integration service. 

    Add the following to the `PRODUCT-HOME/conf/deployment.toml` file. You can further refer to the [Product Configurations]({{base_path}}/reference/config-catalog-mi/#message-mediation).
    
      ```
        [mediation]
        synapse.enable_xpath_dom_failover="true"
      ```

    ??? note "Click here for instructions on configuring WSO2 Enterprise Integrator 6"
        1. Uncomment the `synapse.xpath.dom.failover.enabled=true` property in PRODUCT-HOME/conf/synapse.properties file.

3. In this example we use the SimpleStockQuote service backend. Therefore, the SimpleStockQuote service needs to be started. 

## Set up the Integration Project

{!includes/build-and-run.md!}

## Creating the Integration Logic

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
            <version>2009-02-01</version>
            <blocking>false</blocking>
            <enableSSL>false</enableSSL>
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
    ```
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
                  <arg evaluator="xml" expression="get-property('companyName')"/>
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
  ```
  <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="createQueue" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <amazonsqs.createQueue configKey="AMAZON_SQS_CONNECTION">
            <queueName>{$ctx:queueName}</queueName>
        </amazonsqs.createQueue>
        <property expression="json-eval($.CreateQueueResponse.CreateQueueResult.QueueUrl)" name="queueURL" scope="default" type="STRING"/>
        <log level="custom">
            <property expression="$ctx:queueURL" name="queueURL"/>
        </log>
        <property expression="fn:substring($ctx:queueURL,39,12)" name="queueId" scope="default" type="STRING" xmlns:fn="http://www.w3.org/2005/xpath-functions"/>
        <log level="custom">
            <property expression="$ctx:queueId" name="queueId"/>
        </log>
    </sequence>
  ```

4. Create `sendMessage` sequence as shown below. In this sequence, we send the message that we built in step 5 to the Amazon SQS Queue. 
  ```
  <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="sendMessage" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <amazonsqs.sendMessage configKey="AMAZON_SQS_CONNECTION">
            <queueId>{$ctx:queueId}</queueId>
            <queueName>{$ctx:queueName}</queueName>
            <messageBody>{$ctx:target_property}</messageBody>
        </amazonsqs.sendMessage>
    </sequence>
  ```

5. Create the ReceiveAndForwardMessage sequence as shown below. In this sequence, we will receive the message from the Amazon SQS queue and forward it to the StockQuote Endpoint. 
    ```
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="ReceiveAndForwardMessage" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
          <amazonsqs.receiveMessage configKey="AMAZON_SQS_CONNECTION">
              <maxNumberOfMessages>5</maxNumberOfMessages>
              <queueId>{$ctx:queueId}</queueId>
              <queueName>{$ctx:queueName}</queueName>
          </amazonsqs.receiveMessage>
          <property expression="json-eval($.ReceiveMessageResponse.ReceiveMessageResult.Message.Body)" name="messageBody" scope="default" type="STRING"/>
          <payloadFactory media-type="xml">
              <format>
                  <soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
                      <soapenv:Body>$1</soapenv:Body>
                  </soapenv:Envelope>
              </format>
              <args>
                  <arg evaluator="xml" expression="$ctx:messageBody"/>
              </args>
          </payloadFactory>
          <header name="Action" scope="default" value="urn:getQuote"/>
          <call>
              <endpoint key="SimpleStockQuote"/>
          </call>
      </sequence>
    ```

6. Navigate to **MI Project Explorer** > **APIs** and click on the **+** sign next to APIs to open the **Synapse API Artifact** creation form.
  
7. Provide the API name as `SQSAPI` and the API context as `/sqs` and click **Create**. You can go to the source view of the XML configuration file of the API and copy the following configuration. 
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/sqs" name="SQSAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/sendToQueue">
            <inSequence>
                <property expression="json-eval($.queueName)" name="queueName" scope="default" type="STRING"/>
                <sequence key="buildMessage"/>
                <sequence key="createQueue"/>
                <sequence key="sendMessage"/>
                <sequence key="ReceiveAndForwardMessage"/>
                <respond/>
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

Follow these steps to deploy the exported CApp in the integration runtime. For more info on deploying artifacts, refer to the [Deploying Artifacts]({{base_path}}/develop/deploy-artifacts.md).

**Deploying on Micro Integrator**

You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server. Micro Integrator will be started and the composite application will be deployed.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-micli).

??? note "Click here for instructions on deploying on WSO2 Enterprise Integrator 6"
    1. You can copy the composite application to the `<PRODUCT-HOME>/repository/deployment/server/carbonapps` folder and start the server.

    2. WSO2 EI server starts and you can login to the Management Console via the `https://localhost:9443/carbon/` URL. Provide login credentials. The default credentials will be admin/admin. 

    3. You can see that the API is deployed under the API section. 

## Testing

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


2. Create a file called data.json with the following payload. 
    ```
    {
      "companyName":"WSO2",
      "queueName":"Queue1"
    }
    ```
3. Invoke the API as shown below using the curl command. Curl Application can be downloaded from [here](https://curl.haxx.se/download.html).
    ```
    curl -H "Content-Type: application/json" --request POST --data @body.json http://localhost:8290/sqs/sendToQueue
    ```

**Expected Response**: 

You should get the following response with the 'sys_id' and keep it saved. 

```
<ns:getQuoteResponse xmlns:ns="http://services.samples">
    <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
        <ax21:change>4.233604086603518</ax21:change>
        <ax21:earnings>-8.707965767387106</ax21:earnings>
        <ax21:high>-150.5908765590026</ax21:high>
        <ax21:last>153.98353327622493</ax21:last>
        <ax21:lastTradeTimestamp>Wed Apr 08 10:38:56 IST 2020</ax21:lastTradeTimestamp>
        <ax21:low>158.9975778178183</ax21:low>
        <ax21:marketCap>-565228.6001002677</ax21:marketCap>
        <ax21:name>WSO2 Company</ax21:name>
        <ax21:open>-151.38099715271312</ax21:open>
        <ax21:peRatio>23.761940918708092</ax21:peRatio>
        <ax21:percentageChange>-2.8310759126772127</ax21:percentageChange>
        <ax21:prevClose>-149.5404650806414</ax21:prevClose>
        <ax21:symbol>WSO2</ax21:symbol>
        <ax21:volume>9834</ax21:volume>
    </ns:return>
</ns:getQuoteResponse>
```


