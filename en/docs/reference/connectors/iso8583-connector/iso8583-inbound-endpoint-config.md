# ISO8583 Inbound Endpoint Reference

The following operations allow you to work with the ISO8583 Inbound Endpoint. Click an operation name to see parameter details and samples on how to use it.

ISO8583 Inbound endpoint allows the ISO8583 standard messages through the WSO2 integration runtime. ISO8583 is a message standard that is used in financial transactions. There are various versions of the ISO8583 standard. The Inbound Endpoint is developed based on the 1987 and 1993 versions of the standard. For more information about ISO8583 Standard, go to ISO8583 Documentation.

!!!Note
    ISO8583 version 1993 support is available only with ISO8583 Inbound Endpoint v1.1.1 and above.

The WSO2 ISO8583 inbound endpoint acts as a message consumer. Since it is a listening inbound, it is listening on port 5000. When a client is connected on port 5000, the WSO2 ISO8583 Inbound Endpoint starts to consume the ISO8583 standard messages and inject the messages in XML format into sequence.

In order to use the ISO8583 inbound endpoint, you need to do the following: 

- Download the inbound `org.wso2.carbon.inbound.iso8583-1.1.1.jar` file from the [EI Connector Store](https://store.wso2.com/connector/esb-inbound-iso8583). 
- Download the `jpos-1.9.4.jar` from the [http://mvnrepository.com/artifact/org.jpos/jpos/1.9.4](http://mvnrepository.com/artifact/org.jpos/jpos/1.9.4). 
- Download `jdom-1.1.3.jar` from [http://mvnrepository.com/artifact/org.jdom/jdom/1.1.3](http://mvnrepository.com/artifact/org.jdom/jdom/1.1.3). 
- Download `commons-cli-1.3.1.jar` from [http://mvnrepository.com/artifact/commons-cli/commons-cli/1.3.1](http://mvnrepository.com/artifact/commons-cli/commons-cli/1.3.1). 

Copy the .jar files to the <PRODUCT_HOME>/lib directory.

> **Note**: `jpos` is the third party library, and `jposdef.xml` has the field definitions of the standard ISO8583 Messages. According to the field definitions, each and every ISO8583 message that  comes from the client will be unpacked and the fields of the ISO8583 standard messages will be identified.

To handle the concurrent messages in ISO8583 inbound endpoint, you need to create the threadpool and it can contain a varying amount of threads. The number of threads in the pool is determined by these variables:

- `corePoolSize`: The number of threads to keep in the pool, even if they are idle.
- `maximumPoolSize`: The maximum number of threads to allow in the pool.

Another parameter in `threadPool` configuration is `keepAliveTime`, which is the maximum time that excess idle threads will be alive for new tasks before terminating. 

<table>
    <tr>
        <th>Display Name</th>
        <th>Parameter Name</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>Port</td>
        <td><code>port</code></td>
        <td>Port number on which to listen for incoming messages</td>
        <td></td>
        <td>Yes</td>
    </tr>
    <tr>
        <td>Act as proxy</td>
        <td><code>isProxy</code></td>
        <td>Determine whether the ISO8583 Inbound endpoint act as a proxy to another service</td>
        <td><code>false</code></td>
        <td>No</td>
    </tr>
    <tr>
        <td>Length of the ISO header</td>
        <td><code>headerLength</code></td>
        <td>Length of the ISO header</td>
        <td><code>0</code></td>
        <td>No</td>
    </tr>
    <tr>
        <td>Core Threads</td>
        <td><code>coreThreads</code></td>
        <td>Number of core threads in the thread pool</td>
        <td><code>1</code></td>
        <td>No</td>
    </tr>
    <tr>
        <td>Maximum Threads</td>
        <td><code>maxThreads</code></td>
        <td>Maximum number of threads in the thread pool</td>
        <td><code>3</code></td>
        <td>No</td>
    </tr>
    <tr>
        <td>Idle Thread Keep Alive Timeout (s)</td>
        <td><code>keepAliveTime</code></td>
        <td>Maximum time that excess idle threads will wait for new tasks before terminating</td>
        <td><code>1</code></td>
        <td>No</td>
    </tr>
    <tr>
        <td>Queue Length</td>
        <td><code>queueLength</code></td>
        <td>Number of tasks that can be queued before the thread pool starts rejecting tasks</td>
        <td><code>1</code></td>
        <td>No</td>
    </tr>
</table>

**Sample configuration**

```xml
<inboundEndpoint
        class="org.wso2.carbon.inbound.iso8583.listening.ISO8583MessageConsumer"
        name="custom_listener" onError="fault" sequence="request" suspend="false">
        <parameters>
            <parameter name="sequential">true</parameter>
            <parameter name="inbound.behavior">listening</parameter>
            <parameter name="port">5000</parameter>
        </parameters>
</inboundEndpoint>
```

> **Note**: To send ISO8583 Standard messages to an inbound endpoint, you can use Java client applications. The client needs to produce the ISO8583 Standard messages and get the acknowledgement from the inbound endpoint.

A Sample test client program is provided in https://github.com/wso2-docs/CONNECTORS/tree/master/ISO8583/ISO8583TestClient. You can use this sample client to test the inbound endpoint.
