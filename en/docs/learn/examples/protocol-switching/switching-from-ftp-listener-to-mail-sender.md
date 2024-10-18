# How to Switch from FTP Listener to Mail Sender

This example demonstrates how WSO2 Micro Integrator receives messages through the FTP transport listener and forwards the messages through the mail transport sender.

VFS transport listener will pick the file from the directory in the FTP server. The file in the FTP directory will be deleted. The response will be sent to the given e-mail address.

## Synapse configuration

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Proxy Service"
    ```xml
    <proxy name="SFTPtoMailToProxy" startOnLoad="true" transports="vfs" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <header name="Action" value="urn:getQuote" />
                <call>
                    <endpoint key="SimpleStockQuoteService" />
                </call>
                <property action="set" name="OUT_ONLY" value="true" />
                <property name="Subject" scope="transport" type="STRING" value="Stock quote response" />
                <property name="messageType" scope="axis2" type="STRING" value="application/xml" />
                <send>
                    <endpoint key="MailEndpoint" />
                </send>
            </inSequence>
        </target>
        <parameter name="transport.vfs.FileURI">vfs:sftp://guest:guest@localhost/test?vfs.passive=true</parameter> <!--CHANGE-->
        <parameter name="transport.vfs.ContentType">text/xml</parameter>
        <parameter name="transport.vfs.FileNamePattern">.*\.xml</parameter>
        <parameter name="transport.PollInterval">15</parameter>
    </proxy>
    ```

=== "SimpleStockQuoteService Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

=== "Mail Endpoint" 
    ```xml
    <endpoint name="MailEndpoint" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="mailto:user@host"/>
    </endpoint>
    ```

## Build and Run

Create the artifacts:

{!includes/build-and-run.md!} 
3. Create the proxy service with the [VFS configurations parameters given above]({{base_path}}/reference/config-catalog-mi/#vfs-transport).
4. Create the [endpoint]({{base_path}}/develop/creating-artifacts/creating-endpoints/) with the given deatails for SimpleStockQuoteService Endpoint.
5. Create the [endpoint]({{base_path}}/develop/creating-artifacts/creating-endpoints/) with the given deatails for Mail Endpoint.
6. Configure [MailTo transport sender]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport).
7. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator and start the Micro Integrator.

Set up the back-end service.

1.	Download the [back-end service](
https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
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
      
Add the following request.xml file to the sftp location and verify the content received via the mailto transport.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
<soapenv:Body>
	<m0:getQuote xmlns:m0="http://services.samples">
        <m0:request>
            <m0:symbol>WSO2</m0:symbol>
        </m0:request>
     </m0:getQuote>
</soapenv:Body>
</soapenv:Envelope> 
```
