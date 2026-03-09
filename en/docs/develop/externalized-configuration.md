# Externalized Configuration

## Overview

In the dynamic landscape of integration solutions, the ability to secure sensitive data and adapt deployments to specific operational contexts is crucial. WSO2 Integrator: MI excels in this area with its support for externalized configuration, a feature that significantly enhances both the security and flexibility of deployment processes.

Externalized configuration in WSO2 Integrator: MI allows for the dynamic resolution of configuration parameters at runtime. This capability ensures that sensitive information is securely managed and that deployments can be tailored efficiently to different environments without the need to maintain multiple versions of artifacts.

## Configuration sources and priority

WSO2 Integrator: MI  manages configuration properties from multiple sources by following a specific order of precedence. This hierarchy is essential for understanding which configuration will take precedence when properties are duplicated across various sources.

- **Environment Variables:** Granted the highest precedence, these settings are specified externally, typically at the container or OS level, allowing configurations to be adjusted without code changes.

- **System Properties:** Set at the JVM level, these are the second-highest in precedence and offer a flexible way to configure the application dynamically without altering the codebase.

- **File Properties:** Residing in the `file.properties` file within the `<MI_HOME>/conf` directory, these have the lowest precedence and usually contain default settings that apply unless higher precedence sources override them.
    If you are using a custom configuration file, instead of the file.properties file, you need to configure the particular file path in the product startup script as shown below.
           
    === "On Linux/MacOs"
         ```bash  
            -Dproperties.file.path=/home/user/ei_configs/dev/dev.properties
         ```
    === "On Windows"    
         ```bash  
            -Dproperties.file.path="%CONFIG_DIR%\dev\dev.properties
         ```

For example, if the `connection_name` property is defined in both an environment variable and as a system property, the value set in the environment variable will take precedence.

## Initialize configuration

The `config.properties` file, located at `<PROJECT_PATH>/src/main/wso2mi/resources/conf/`, plays a critical role in initializing configurable parameters. This file supports flexibility in configuration management, allowing updates to be made manually, through the **Expression Editor**, or via the **Project Summary** page. Parameters can be set as either `string` or `cert` types, with `cert` specifically used for adding a certificate file to the trust store at deployment time.

The parameters should be defined in the `config.properties` file as follows:

```properties
connection_name: string
http_connection_cert: cert
```

- **Using Expression Editor**

    1. Click on the **Ex** button on the right side of the input field to launch the Expression Editor.
    2. Click directly inside the input field where the value needs to be entered. Alternatively, you can click on the **edit** icon positioned to the right of the **Ex** button. This will open the Expression Editor, where you can view, modify, or add new configuration values.

          <a href="{{base_path}}/assets/img/integrate/externalized-config/add-modify-config.png"><img src="{{base_path}}/assets/img/integrate/externalized-config/add-modify-config.png" alt="add or modify configs" width="400"></a>

- **Via Project Summary Page**

    1. Navigate to the configurable editor by clicking on **Manage Configurables**.
         
          <a href="{{base_path}}/assets/img/integrate/externalized-config/manage-config.png"><img src="{{base_path}}/assets/img/integrate/externalized-config/manage-config.png" alt="manage config" width="400"></a>

    2. To add a new configuration, click on **Add Configurable**. Use the specific buttons to remove or update configurations as needed.

          <a href="{{base_path}}/assets/img/integrate/externalized-config/add-config.png"><img src="{{base_path}}/assets/img/integrate/externalized-config/add-config.png" alt="add config" width="400"></a>

!!! info "Adding Environment Variables"

    To efficiently manage environment-specific configurations in WSO2 Integrator: MI, you can utilize an `.env` file located in your `<PROJECT_HOME>`. This approach allows you to maintain a clear separation between your development environment and production settings, facilitating easier adjustments and deployments across different environments.

    Populate the `.env` file with key-value pairs that represent the configuration settings you want to externalize. Here’s an example of what this file might contain:
    ```env
    connection_name=dev_coonection
    http_connection_cert=/Users/wso2/Documents/http.crt
    ```

    When you start the WSO2 Integrator: MI server, specify the `.env` file using the `--env-file` flag. This flag tells the server to load the environment variables from the `.env` file, integrating them into the server's runtime environment.    

    ```script
    sh micro-integrator.sh --env-file=/PROJECT_HOME/.env
    ```

## Syntax 

To retrieve a configuration parameter within your integration, the following syntax is used:

```
${configs.<parameter_name>}
```

For example, If you want to access a configuration named `connection_timeout`, you would use:

```
${configs.connection_timeout}
```

## Implementing externalized configurations

Below are detailed methods on how to implement this strategy effectively within your integration, focusing on `expressions` and `Synapse artifacts`.

### Using Expressions

Expressions allow dynamic configuration values to be injected into the integration at runtime. This method is highly effective for adjusting parameters without redeploying or modifying the underlying code.

Example:
```
<property name="connection_name" scope="default" type="STRING" expression="${configs.connection_name}"/>
```

<a href="{{base_path}}/assets/img/integrate/externalized-config/add-config-to-integration.png"><img src="{{base_path}}/assets/img/integrate/externalized-config/add-config-to-integration.png" alt="add config to the integration" width="400"></a>

=== "API"
    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/apiConfig" name="test_api" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/test_api">
            <inSequence>
                <property name="msg" scope="default" type="STRING" expression="${configs.msg}"/>
                <payloadFactory media-type="json" template-type="freemarker">
                    <format>
                        <![CDATA[{
                            "msg": "${ctx.msg}"
                        }]]>
                    </format>
                    <args/>
                </payloadFactory>
                <respond/>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
=== "config.properties"     
    ``` properties  
    msg:string
    ```
=== ".env"
    ``` env  
    msg=Gd mng
    ```

For more information about `Expression`, refer to this [documentation]({{base_path}}/reference/synapse-properties/synapse-expressions/).

### In Synapse artifacts

Utilizing externalized configuration in Synapse artifacts such as endpoints, data services, and proxies allows these components to automatically adapt to different environments by fetching values at runtime: This is particularly useful for tailoring backend connections, API endpoints, and service configurations without manual intervention for each environment. 
It ensures that sensitive configurations are handled securely and remain flexible to changes in the deployment environment.

!!! Note
    While Synapse artifacts continue to support the `$FILE` and `$SYSTEM` sources, it is now recommended to use `${configs.<parameter_name>}` for managing configurations to enhance security and deployment flexibility.

#### Supported parameters

Listed below are the synapse artifact parameters to which you can dynamically inject values.

##### Endpoint parameters

Listed below are the Endpoint parameters that can be dynamically injected.

<table>
    <tr>
        <th>Endpoint Type</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>Address Endpoint</td>
        <td><code>URI</code></td>
    </tr>
    <tr>
        <td>HTTP Endpoint</td>
        <td><code>uri-template</code></td>
    </tr>
    <tr>
        <td>Template Endpoint</td>
        <td>
            <code>URI</code>
        </td>
    </tr>
    <tr>
        <td>WSDL Endpoint</td>
        <td>
            <code>WSDL URI</code>
        </td>
    </tr>
</table>

###### Example

```xml
<endpoint name="TestEndpoint" xmlns="http://ws.apache.org/ns/synapse">
    <address uri="${configs.url}">
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

##### Data service parameters

Listed below are the data service parameters that can be dynamically injected.

-   `Driver`
-   `URL`
-   `Username`
-   `Password`

###### Example

```xml 
<data name="DataServiceSample" serviceGroup="" serviceNamespace="">
    <description/>
    <config id="SourceSample">
        <property name="org.wso2.ws.dataservice.user">${configs.uname}</property>
        <property name="org.wso2.ws.dataservice.password">${configs.pass}</property>
        <property name="org.wso2.ws.dataservice.protocol">${configs.url}</property>
        <property name="org.wso2.ws.dataservice.driver">${configs.driver}</property>
    </config>
    <query>
    --------------------
    </query>
    <operation>
    --------------------
    </operation>
</data>
```

##### Scheduled trigger parameters

The <b>pinned servers</b> parameter can be dynamically injected to a Scheduled trigger or proxy service. See the example given below.

###### Example

```xml  
<?xml version="1.0" encoding="UTF-8"?>
<task class="org.apache.synapse.startup.tasks.MessageInjector" group="synapse.simple.quartz" name="ProxytestInject" pinnedServers="${configs.pinned}" xmlns="http://ws.apache.org/ns/synapse">
    <trigger count="5" interval="10"/>
    <property name="injectTo" value="proxy" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
    <property name="proxyName" value="testProxy" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
    <property name="soapAction" value="mediate" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
    <property name="message" xmlns:task="http://www.wso2.org/products/wso2commons/tasks">
        ----------
    </property>
</task>
```

##### Inbound endpoint parameters

See the list of inbound endpoint parameters that can be dynamically injected.

-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/http-inbound-endpoint-properties">HTTP/HTTPS Inbound Protocol</a>
-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/hl7-inbound-endpoint-properties">HL7 Inbound Protocol</a>
-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/cxf-ws-rm-inbound-endpoint-properties">CXF WS-RM Inbound Protocol</a>
-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/listening-inbound-endpoints/websocket-inbound-endpoint-properties">WebSocket Inbound Protocol</a>

-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/polling-inbound-endpoints/file-inbound-endpoint-properties">File Inbound Protocol</a>
-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/polling-inbound-endpoints/jms-inbound-endpoint-properties">JMS Inbound Protocol</a>
-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/polling-inbound-endpoints/kafka-inbound-endpoint-properties">Kafka Inbound Protocol</a>

-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/event-based-inbound-endpoints/mqtt-inbound-endpoint-properties">MQTT Inbound Protocol</a>
-   <a href="{{base_path}}/reference/synapse-properties/inbound-endpoints/event-based-inbound-endpoints/rabbitmq-inbound-endpoint-properties">RabbitMQ Inbound Protocol</a>

###### Example

In the following example, JMS transport parameters in an inbound endpoint are configured as dynamic values.

```xml 
<?xml version="1.0" encoding="UTF-8"?>
<inboundEndpoint name="jms" onError="fault" protocol="jms" sequence="LogMsgSeq" suspend="false" xmlns="http://ws.apache.org/ns/synapse">
    <parameters>
        <parameter name="interval">15000</parameter>
        <parameter name="sequential">true</parameter>
        <parameter name="coordination">true</parameter>
        <parameter name="transport.jms.Destination">myq</parameter>
        <parameter name="transport.jms.CacheLevel">3</parameter>
        <parameter name="transport.jms.ConnectionFactoryJNDIName">${configs.jmsconfac}</parameter>
        <parameter name="java.naming.factory.initial">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
        <parameter name="java.naming.provider.url">${configs.jmsurl}</parameter>
        <parameter name="transport.jms.UserName">${configs.jmsuname}</parameter>
        <parameter name="transport.jms.SessionAcknowledgement">AUTO_ACKNOWLEDGE</parameter>
        <parameter name="transport.jms.Password">${configs.jmspass}</parameter>
        <parameter name="transport.jms.SessionTransacted">false</parameter>
        <parameter name="transport.jms.ConnectionFactoryType">queue</parameter>
        <parameter name="transport.jms.ContentType">application/xml</parameter>
        <parameter name="transport.jms.SharedSubscription">false</parameter>
        <parameter name="pinnedServers">${configs.pinned}</parameter>
        <parameter name="transport.jms.ResetConnectionOnPollingSuspension">false</parameter>
    </parameters>
</inboundEndpoint>
```

##### Proxy service parameters

The <b>pinned servers</b> parameter as well as all the service-level <b>transport parameters</b> can be dynamically injected to a proxy service.

-   [JMS parameters]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters)
-   [FIX parameters]({{base_path}}/reference/synapse-properties/transport-parameters/fix-transport-parameters)
-   [MailTo parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mailto-transport-parameters)
-   [MQTT parameters]({{base_path}}/reference/synapse-properties/transport-parameters/mqtt-transport-parameters)
-   [RabbitMQ parameters]({{base_path}}/reference/synapse-properties/transport-parameters/rabbitmq-transport-parameters)
-   [VFS parameters]({{base_path}}/reference/synapse-properties/transport-parameters/vfs-transport-parameters)

###### Example

In the following example, JMS transport parameters are dynamically injected to the proxy service.

```xml  
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="JmsListner" pinnedServers="localhost" startOnLoad="true" transports="http https jms" xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
            -------------
            <drop/>
        </inSequence>
        <outSequence/>
        <faultSequence/>
    </target>
    <parameter name="transport.jms.SessionAcknowledgement">AUTO_ACKNOWLEDGE</parameter>
    <parameter name="transport.jms.Destination">myq</parameter>
    <parameter name="transport.jms.ConnectionFactoryType">queue</parameter>
    <parameter name="transport.jms.ContentType">application/xml</parameter>
    <parameter name="java.naming.factory.initial">org.apache.activemq.jndi.ActiveMQInitialContextFactory</parameter>
    <parameter name="java.naming.provider.url">${configs.jmsurl}</parameter>
    <parameter name="transport.jms.SessionTransacted">false</parameter>
    <parameter name="transport.jms.ConnectionFactoryJNDIName">${configs.jmsconfac}</parameter>
    <parameter name="transport.jms.UserName">${configs.jmsuname}</parameter>
    <parameter name="transport.jms.Password">${configs.jmspass}</parameter>
</proxy>
```

##### Message store parameters

Listed below are the message store parameters that can be dynamically injected.

<table>
    <tr>
        <th>Message Store Type</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>JMS Message Store | WSO2 MB Message Store</td>
        <td>
            <ul>
                <li>
                    <code>Username</code>
                </li>
                <li>
                    <code>Password</code>
                </li>
                <li>
                    <code>Factory</code>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>RabbitMQ Message Store</td>
        <td>
            <ul>
                <li>
                    <code>Host name</code>
                </li>
                <li>
                    <code>Port</code>
                </li>
                <li>
                    <code>Username</code>
                </li>
                <li>
                    <code>Password</code>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>JDBC Message Store | Resequence Message Store</td>
        <td>
            <ul>
                <li>
                    <code>Driver</code>
                </li>
                <li>
                    <code>Url</code>
                </li>
                <li>
                    <code>Username</code>
                </li>
                <li>
                    <code>Password</code>
                </li>
            </ul>
        </td>
    </tr>
</table>

###### Example

In the following example, the parameters in the RabbitMQ message store are configured as dynamic values.

```xml  
<?xml version="1.0" encoding="UTF-8"?>
<messageStore class="org.apache.synapse.message.store.impl.rabbitmq.RabbitMQStore" name="InboundStore" xmlns="http://ws.apache.org/ns/synapse">
    <parameter name="store.rabbitmq.host.name">${configs.rabbithost}</parameter>
    <parameter name="store.producer.guaranteed.delivery.enable">false</parameter>
    <parameter name="store.rabbitmq.host.port">${configs.rabbitport}</parameter>
    <parameter name="store.rabbitmq.route.key"/>
    <parameter name="store.rabbitmq.username">${configs.rabbitname}</parameter>
    <parameter name="store.rabbitmq.virtual.host"/>
    <parameter name="rabbitmq.connection.ssl.enabled">false</parameter>
    <parameter name="store.rabbitmq.exchange.name">exchange3</parameter>
    <parameter name="store.rabbitmq.queue.name">queue3</parameter>
    <parameter name="store.rabbitmq.password">${configs.rabbitpass}</parameter>
</messageStore>
```
