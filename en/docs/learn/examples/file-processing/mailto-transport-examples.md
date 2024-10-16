# How to Use MailTo Transport

## Set the email sender globally

When the [MailTo transport sender is enabled]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport) for the Micro Integrator, you can configure your mediation sequences to send emails. In this example, the email sender credentials are set globally in the `deployment.toml` file (stored in the `MI_HOME/conf` directory). You need to specify a valid email address prefixed with the transport sender name (as configured in the deployment.toml file) in your mediation flow. For example, if the transport sender is 'mailto', the endpoint URL in the synapse configuration should be as follows: `mailto:targetemail@mail.com`

### Synapse configuration

Following are the integration artifacts (proxy service) that we can use to implement this scenario.

=== "Proxy Service"
    ```xml
    <proxy name="EmailSender" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full" />
                <property name="OUT_ONLY" action="set" value="true"/>
                <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
                <call>
                    <endpoint key="Mail" />
                </call>
            </inSequence>
            <faultSequence />
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="Mail" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="mailto:targetemail@mail.com"/>
    </endpoint>
    ```

!!! Note
    - Incoming payload will be sent as mail body.

### Build and run

Create the artifacts:

{!includes/build-and-run.md!}
2. Open the `deployment.toml` file from the `MI_HOME/conf` directory, and [enable the MailTo transport sender]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport).
4. [Create the proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator. 

Invoke the proxy service by sending a request. For example use SOAP UI. Check the inbox of your email account, which is configured as the target endpoint. You will receive an email from the email sender that is configured globally in the `deployment.toml` file.

## Set the email sender dynamically

In this example, let's set the email sender details by adding **Property** mediators to the mediation sequence. If these details are not provided in the proxy service, the system uses the [email sender configurations](#globally-setting-the-email-sender) in the deployment.toml file explained above.

### Synapse configuration

Following are the integration artifacts (proxy service) that we can use to implement this scenario.

Enter a valid email address prefixed with the transport sender name (configured in the `deployment.toml` file). For example, if the transport sender is 'mailto', the endpoint URL should be as follows: `mailto:targetemail@mail.com`.

!!! Note
    -   You need to update the property values with the actual values of the mail sender account.
    -   In some email service providers, the value for the 'mail.smtp.user' property is the same as the email address of the account.

!!! Tip
    For testing purposes, be sure to enable access from less secure apps to your email account. See the documentation from your email service provider for instructions.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="EmailDynamicSender" startOnLoad="true" transports="http https"
        xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <log category="INFO" level="full"/>
                <property name="From" scope="transport" type="STRING"
                    value="sender@mail.com"/>
                <property name="mail.smtp.user" scope="transport" type="STRING" value="sender"/>
                <property name="mail.smtp.password" scope="transport" type="STRING" value="password"/>
                <property name="OUT_ONLY" action="set" value="true"/>
                <property name="FORCE_SC_ACCEPTED" value="true" scope="axis2"/>
                <property name="Subject" scope="transport" type="STRING" value="Stock quote response"/>
                <call>
                    <endpoint key="Mail"/>
                </call>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="Mail" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="mailto:targetemail@mail.com"/>
    </endpoint>
    ```

### Build and run

Create the artifacts:

{!includes/build-and-run.md!}
2. Open the `deployment.toml` file from the `MI_HOME/conf` directory, and [enable the MailTo transport sender]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport).
4. [Create the proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
5. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator. 

Invoke the proxy service by sending a request. Check your inbox. You will receive an email from the email sender that you configured for the proxy service.

## Receive emails

When the [MailTo transport listener is enabled]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport) for the Micro Integrator, you can configure your mediation sequences to send emails.

In this example, let's configure your mediation sequence to receive emails and then process the email contents. The MailTo transport receiver should be configured at the service level and each service configuration should explicitly state the mail transport receiver configuration. This is required to enable different services to receive mails over different mail accounts and configurations.

!!! Info
    You need to provide correct parameters for a valid mail account at the service level.

### Synapse configuration

In this sample, we used the `transport.mail.ContentType` property to make sure that the transport parses the request message as POX. If you remove this property, you may still be able to send requests using a standard mail client. Instead of writing the XML in the body of the message, you add it as an attachment. In that case, you should use XML as a suffix for the attachment and format the request as a SOAP 1.1 message. Indeed, for a file with the suffix XML, the mail client will most likely use text/XML as the content type, exactly as required for SOAP 1.1. Sending a POX message using this approach will be a lot trickier because most standard mail clients do not allow the user to explicitly set the content type.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="StockQuoteProxy" startOnLoad="true" transports="malito" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="senderAddress" expression="get-property('transport', 'From')"/>
                <log level="full">
                    <property name="Sender Address" expression="get-property('senderAddress')"/>
                </log>
                <call>
                    <endpoint key="SimpleStockQuoteService"/>
                </call>
                <property name="Subject" value="Custom Subject for Response" scope="transport" />
                <header name="To" expression="fn:concat('mailto:', get-property('senderAddress'))"/>
                <log level="full">
                    <property name="message" value="Response message"/>
                    <property name="Sender Address" expression="get-property('senderAddress')"/>
                </log>
                <respond/>
            </inSequence>
        </target>
        <publishWSDL key="conf:custom/sample_proxy_1.wsdl" preservePolicy="true"/>
        <parameter name="mail.pop3.socketFactory.class">javax.net.ssl.SSLSocketFactory</parameter>
        <parameter name="transport.PollInterval">5</parameter>
        <parameter name="mail.pop3.host">pop.gmail.com</parameter>
        <parameter name="mail.pop3.user"> user</parameter>
        <parameter name="transport.mail.Protocol">pop3</parameter>
        <parameter name="mail.pop3.socketFactory.port">995</parameter>
        <parameter name="transport.mail.Address">mail@mail.com</parameter>
        <parameter name="mail.pop3.password"> password</parameter>
        <parameter name="mail.pop3.port">995</parameter>
        <parameter name="mail.pop3.socketFactory.fallback">false</parameter>
        <parameter name="transport.mail.ContentType">application/xml</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

### Build and run

Create the artifacts:

{!includes/build-and-run.md!}
2. Open the `deployment.toml` file from the `MI_HOME/conf/` directory, and [enable the MailTo transport sender]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport).
3. [Create the proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. Add [sample_proxy_1.wsdl](https://github.com/wso2-docs/WSO2_EI/blob/master/samples-protocol-switching/sample_proxy_1.wsdl) as a [registry resource]({{base_path}}/develop/creating-artifacts/creating-registry-resources). Change the registry path of the proxy accordingly. 
5. Set up the back-end service.
    - Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
    
    - Extract the downloaded zip file.
    - Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
    - Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

        === "On MacOS/Linux"
            ```bash
            sh axis2server.sh
            ```
        === "On Windows"
            ```bash
            axis2server.bat
            ```

6. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator. 

Send a plain/text e-mail (Ensure you switch to **Plain text** **mode** when composing the email) with the following body and any custom Subject from your mail account to the mail address `synapse.demo.1@gmail.com`. 

```xml 
<m0:getQuote xmlns:m0="http://services.samples">
    <m0:request>
        <m0:symbol>IBM</m0:symbol>
    </m0:request>
</m0:getQuote>
```

After a few seconds (for example 30 seconds), you should receive a POX response in your e-mail account with the stock quote reply.
