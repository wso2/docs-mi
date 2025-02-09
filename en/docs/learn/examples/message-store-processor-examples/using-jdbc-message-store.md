# How to Use a JDBC Message Store

In this sample, the client sends requests to a proxy service. The proxy service stores the messages in a JDBC message store. The back-end service is invoked by a message forwarding processor, which picks the messages stored in the JDBC message store.

## Prerequisites

Set up the database. Use one of the following DB scripts depending on which database type you want to use. 

=== "MySQL"
    ```SQL
    CREATE TABLE jdbc_message_store(
                indexId BIGINT( 20 ) NOT NULL AUTO_INCREMENT ,
                msg_id VARCHAR( 200 ) NOT NULL ,
                message BLOB NOT NULL ,
                PRIMARY KEY ( indexId )
                )
    ```
=== "H2"         
    ```SQL
    CREATE TABLE jdbc_message_store(
                    indexId BIGINT( 20 ) NOT NULL AUTO_INCREMENT ,
                    msg_id VARCHAR( 200 ) NOT NULL ,
                    message BLOB NOT NULL ,
                    PRIMARY KEY ( indexId )
                    )
    ```

!!! Note
    You can create a similar script based on the database you want to set up.

Add the relevant database driver into the `<MI_HOME>/lib` directory.

## Synapse configuration
Following are the artifact configurations that we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

This sample configuration uses a MySQL database named **sampleDB** and the database table named **jdbc_message_store**.

=== "Proxy Service"
    ```xml  
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="MessageStoreProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
              <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
              <property name="OUT_ONLY" value="true"/>
              <property name="target.endpoint" value="StockQuoteServiceEp"/>
              <store messageStore="SampleStore"/>
          </inSequence>
        </target>
        <publishWSDL uri="file:/path/to/sample_proxy_1.wsdl"/>
    </proxy>
    ```
=== "Message Store"     
    ```xml  
    <?xml version="1.0" encoding="UTF-8"?>
    <messageStore class="org.apache.synapse.message.store.impl.jdbc.JDBCMessageStore" name="SampleStore" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="store.jdbc.driver">com.mysql.jdbc.Driver</parameter>
        <parameter name="store.producer.guaranteed.delivery.enable">false</parameter>
        <parameter name="store.jdbc.username">root</parameter>
        <parameter name="store.jdbc.connection.url">jdbc:mysql://localhost:3306/sampleDB</parameter>
        <parameter name="store.jdbc.password">********</parameter>
        <parameter name="store.jdbc.table">jdbc_message_store</parameter>
    </messageStore>
    ```
=== "Message Processor"     
    ```xml  
    <?xml version="1.0" encoding="UTF-8"?>
    <messageProcessor class="org.apache.synapse.message.processor.impl.forwarder.ScheduledMessageForwardingProcessor" messageStore="SampleStore" name="ScheduledProcessor" targetEndpoint="StockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="client.retry.interval">1000</parameter>
        <parameter name="max.delivery.attempts">5</parameter>
        <parameter name="member.count">1</parameter>
        <parameter name="store.connection.retry.interval">1000</parameter>
        <parameter name="max.store.connection.attempts">-1</parameter>
        <parameter name="max.delivery.drop">Disabled</parameter>
        <parameter name="interval">10000</parameter>
        <parameter name="is.active">true</parameter>
    </messageProcessor>
    ```
=== "Endpoint"     
    ```xml 
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="StockQuoteServiceEp">
      <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

## Build and run

The WSDL file `sample_proxy_1.wsdl` can be downloaded from  [sample_proxy_1.wsdl](https://github.com/wso2-docs/WSO2_EI/blob/master/samples-protocol-switching/sample_proxy_1.wsdl). 
The WSDL URI needs to be updated with the path to the `sample_proxy_1.wsdl` file.

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), [JDBC message store]({{base_path}}/develop/creating-artifacts/creating-a-message-store), [message processor]({{base_path}}/develop/creating-artifacts/creating-a-message-processor), and [endpoint]({{base_path}}/develop/creating-artifacts/creating-endpoints) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:
 
    === "On MacOS/Linux"  
          ```bash 
          sh axis2server.sh
          ```
    === "On Windows"               
          ```bash 
          axis2server.bat
          ```

Send the following request to invoke the sample proxy service:

```xml
POST http://localhost:8290/services/MessageStoreProxy HTTP/1.1
Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:getQuote"
Content-Length: 492
Host: localhost:9090
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
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