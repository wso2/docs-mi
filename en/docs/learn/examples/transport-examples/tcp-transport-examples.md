# How to Use TCP Transport

**Sending multiple messages via the same TCP channel**

Generally, you can send only one message via one generic TCP channel. Nevertheless, the Micro Integrator also supports sending multiple messages via the same TCP channel by splitting them in different ways.  Hence, the TCP transport needs to determine the end of the message that is mediated through the Micro Integrator to split it by a character, a sequence of characters, message length, or special characters in hex form. The client can select which input type to use to send the request to the TCP proxy out of the available options (i.e., binary and String). Splitting the message by a single character is the most efficient method.

You can split the following sample request input message in different ways as explained below.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body/></soapenv:Envelope>
```

The following are the properties that are specific to sending multiple messages via the same TCP channel.

| **Property**       | **Description**                                       | **Required**                        | **Possible Values**         | **Default Value**       |
|--------------------|-------------------------------------------------------|-------------------------------------|-----------------------------|-------------------------|
|recordDelimiterType          |Type of the record delimiter you use to split the message	                                        | No   | Character, byte or String	                                     | String |
|recordDelimiter              |The delimiter of the record you use to split the message	                                        | No   | A valid value that matches the specified delimiter type	| N/A    |
|recordLength                 | Length of the message to be split. If you set this, then the delimiter properties are omitted.	 | No   | A valid integer value. This will be identified in bytes.	   | N/A    |
|inputType	                  | Input type of the message	                                                                      | No   | String or binary	                                              | String |

The following are the transport receiver properties.

| **Property**       | **Description**                                       | **Required**                        | **Possible Values**         | **Default Value**       |
|--------------------|-------------------------------------------------------|---------------------------  --------|-----------------------------|-------------------------|
|port              | The port on which the TCP server should listen for incoming messages	 | No   | A positive integer less than 65535                                              | 8000   |
|hostname          | The host name of the server to be displayed in WSDLs, etc.	          | No   | A valid host name or an IP address	                                             | N/A    |
|contentType       | The content type of the input message                   	             | No   | A valid content type (e.g., application/xml, application/json, text/html etc.)	| N/A    |
|responseClient	 | Whether the client needs to get the response or not	                | No   | True or false	                                                                  | true   |


## Prerequisites

[Enable the TCP transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-tcp-transport). 

## Example 1: Splitting by a character

### Synapse configurations

The following proxy service splits the message by a character. It receives a message with an empty body, which it will forward to the HTTP endpoint after enriching the body with the symbolic value "`IBM`".

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="TCPProxy" startOnLoad="true" transports="tcp" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="symbol" scope="default" type="STRING" value="IBM"/>
                <enrich description="Replace the body content.">
                    <source clone="true" type="inline">
                        <m:getQuote xmlns:m="http://services.samples">
                            <m:request>
                                <m:symbol>?</m:symbol>
                            </m:request>
                        </m:getQuote>
                    </source>
                    <target action="replace" type="body"/>
                </enrich>
                <enrich description="Replace the symbol value with the value from the 'symbol' property.">
                    <source clone="true" property="symbol" type="property"/>
                    <target action="replace" xpath="//m:getQuote/m:request/m:symbol" xmlns:m="http://services.samples"/>
                </enrich>
                <log category="INFO" level="full" separator=","/>
                <header name="Action" action="set" scope="default" value="urn:getQuote"/>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEp"/>
                </call>
                <log category="INFO" level="full"/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.tcp.responseClient">true</parameter>
        <parameter name="transport.tcp.recordDelimiter">|</parameter>
        <parameter name="transport.tcp.inputType">string</parameter>
        <parameter name="transport.tcp.port">6061</parameter>
        <parameter name="transport.tcp.recordDelimiterType">character</parameter>
        <parameter name="transport.tcp.contentType">text/xml</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
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

### Build and run (example 1)

Create the artifacts:

{!includes/build-and-run.md!}
3.  Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service.

* Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
* Extract the downloaded zip file.
* Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
* Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
          ```bash 
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash 
          axis2server.bat
          ```

Send the following message via TCP to the TCP listener port.
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body/></soapenv:Envelope>|<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body/></soapenv:Envelope>
```
In Linux, we can save the request in a <strong>request.xml</strong> file and use Netcat to send the TCP request. 
```
netcat localhost 6061 < request.xml
```
It can be observed that two messages are sent to the backend.

## Example 2: Splitting by a special character

### Synapse configuration

The sample proxy below splits the input message by appending a special character to the end of the message.

=== "Proxy Service"
    ```xml 
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="TCPProxy" startOnLoad="true" transports="tcp" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="symbol" scope="default" type="STRING" value="IBM"/>
                <enrich description="Replace the body content.">
                    <source clone="true" type="inline">
                        <m:getQuote xmlns:m="http://services.samples">
                            <m:request>
                                <m:symbol>?</m:symbol>
                            </m:request>
                        </m:getQuote>
                    </source>
                    <target action="replace" type="body"/>
                </enrich>
                <enrich description="Replace the symbol value with the value from the 'symbol' property.">
                    <source clone="true" property="symbol" type="property"/>
                    <target action="replace" xpath="//m:getQuote/m:request/m:symbol" xmlns:m="http://services.samples"/>
                </enrich>
                <log category="INFO" level="full" separator=","/>
                <header name="Action" action="set" scope="default" value="urn:getQuote"/>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEp"/>
                </call>
                <log category="INFO" level="full"/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.tcp.recordDelimiter">0x03</parameter>
        <parameter name="transport.tcp.responseClient">true</parameter>
        <parameter name="transport.tcp.inputType">binary</parameter>
        <parameter name="transport.tcp.port">6061</parameter>
        <parameter name="transport.tcp.recordDelimiterType">byte</parameter>
        <parameter name="transport.tcp.contentType">text/xml</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
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

### Build and run (example 2)

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service.

* Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
* Extract the downloaded zip file.
* Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
* Execute the following command to start the axis2server with the SimpleStockQuote back-end service:
 
    === "On MacOS/Linux"  
          ```bash 
          sh axis2server.sh
          ```
    === "On Windows"                     
          ```bash  
          axis2server.bat
          ```

Send the following message via TCP to the TCP listener port.
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body/></soapenv:Envelope>
```
In Linux, you can save the request in a `request.xml` file and use Netcat to send the TCP request. 
```
netcat localhost 6061 < request.xml
```
It can be observed that one message is sent to the backend.

## Example 3: Splitting by a character sequence

### Synapse configuration

The sample proxy below splits the input message by a sequence of characters.

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="TCPProxy" startOnLoad="true" transports="tcp" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property name="symbol" scope="default" type="STRING" value="IBM"/>
                <enrich description="Replace the body content.">
                    <source clone="true" type="inline">
                        <m:getQuote xmlns:m="http://services.samples">
                            <m:request>
                                <m:symbol>?</m:symbol>
                            </m:request>
                        </m:getQuote>
                    </source>
                    <target action="replace" type="body"/>
                </enrich>
                <enrich description="Replace the symbol value with the value from the 'symbol' property.">
                    <source clone="true" property="symbol" type="property"/>
                    <target action="replace" xpath="//m:getQuote/m:request/m:symbol" xmlns:m="http://services.samples"/>
                </enrich>
                <log category="INFO" level="full" separator=","/>
                <header name="Action" action="set" scope="default" value="urn:getQuote"/>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEp"/>
                </call>
                <log category="INFO" level="full"/>
                <respond/>
            </inSequence>
            <faultSequence/>
        </target>
        <parameter name="transport.tcp.responseClient">true</parameter>
        <parameter name="transport.tcp.recordDelimiter">split</parameter>
        <parameter name="transport.tcp.inputType">string</parameter>
        <parameter name="transport.tcp.port">6061</parameter>
        <parameter name="transport.tcp.recordDelimiterType">string</parameter>
        <parameter name="transport.tcp.contentType">text/xml</parameter>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
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

### Build and run (example 3)

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service.

* Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
* Extract the downloaded zip file.
* Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
* Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
          ```bash  
          sh axis2server.sh
          ```
    === "On Windows"               
          ```bash  
          axis2server.bat
          ```

Send the following message via TCP to the TCP listener port.
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body/></soapenv:Envelope>split<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Header/><soapenv:Body/></soapenv:Envelope>
```

On macOS, you can save the request in a `request.xml` file and use Netcat to send the TCP request.

```
nc localhost 6061 < request.xml
```
It can be observed that two messages are sent to the backend.

## Developing the Java client for the transport

The sample Java Client below splits the input message by a special character. Also, you can develop a character delimiter client by changing the below client accordingly.

```java
 import java.io.ByteArrayOutputStream;
 import java.io.IOException;
 import java.io.InputStream;
 import java.io.OutputStreamWriter;
 import java.io.PrintWriter;
 import java.net.Socket;
 
 public class TCPClient {
 
     String host = "localhost";
     int port = 6061;
     Socket socket = null;
     int count = 0;
     
     public static void main(String args[]) throws Exception {
         Character aByte = 0x10;
         TCPClient client = new TCPClient();
         String message = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                         + "<soapenv:Header/><soapenv:Body/></soapenv:Envelope>" + aByte;
         client.sendToServer(message);
         client.recieveFromServer();
         client.sendToServer(message);
         client.recieveFromServer();
         client.close();
     }
     
     TCPClient() throws Exception {
        socket = new Socket(host, port);
     }
     
     void sendToServer(String msg) throws Exception {
         //create output stream attached to socket
         PrintWriter outToServer = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));
         //send msg to server
         outToServer.print(msg);
         outToServer.flush();
     }
     
     void recieveFromServer() throws Exception {
         char delimiter = 0x10;
         InputStream inFromServer = socket.getInputStream();
         //read from server
         int next = inFromServer.read();
         ByteArrayOutputStream bos = new ByteArrayOutputStream();
         while (next > -1) {
             if (delimiter != next) {
                bos.write(next);
            }
            next = inFromServer.read();
            if (delimiter == next) {
                System.out.println(new String(bos.toByteArray()));
                count++;
                if (count == 1 || count == 2) {
                    break;
                }
                bos = new ByteArrayOutputStream();
            }
        }   
        if (count == 2) {
            close();
        }
     }
     
     void close() throws IOException {
        socket.close();
     }
 }
```
