# TCP Transport Performance Test

## Overview

This document outlines the setup and execution of performance tests designed to evaluate the behavior of WSO2 Micro
Integrator (MI) when acting as a TCP proxy that forwards requests to a backend TCP server. The goal of these tests was
to assess MI’s performance under varying transactions per second (TPS) loads, particularly when managing short-lived TCP
connections.

## Test Environment

[![MI TCP Transport Performance Setup]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/setup.png)]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/setup.png)

### MI Server
* **Platform:** WSO2 Micro Integrator
* **Heap settings:** Initial = 1024 MB, Maximum = 2048 MB
* **TCP Properties Configuration** 

    Enable TCP listeners and senders in the `MI_HOME/conf/deployment.toml` file:

    ```toml
    [transport.tcp]
    listener.enable = true
    sender.enable = true
    ```

    Configure TCP listeners and senders in the `MI_HOME/conf/tcp.properties` file: 

    ```properties
    lst_t_core=600
    lst_t_max=1500
    snd_t_core=600
    snd_t_max=1500
    ```

  Here, 600 TCP listeners and a maximum of 1500 listeners are defined. Similarly, 600 TCP senders and a maximum of 1500
  senders are defined.

* **Proxy Service:** TCPProxy 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<proxy xmlns="http://ws.apache.org/ns/synapse"
       name="TCPProxy"
       transports="tcp"
       startOnLoad="true">
   <target>
      <inSequence>
         <property name="ClientApiNonBlocking" action="remove" scope="axis2"/>
         <property name="symbol" value="IBM" scope="default" type="STRING"/>
         <enrich description="Replace the body content.">
            <source type="inline" clone="true">
               <m:getQuote xmlns:m="http://services.samples">
                  <m:request>
                     <m:symbol>?</m:symbol>
                  </m:request>
               </m:getQuote>
            </source>
            <target type="body"/>
         </enrich>
         <enrich description="Replace the symbol value with the value from the 'symbol' property.">
            <source type="property" clone="true" property="symbol"/>
            <target xmlns:m="http://services.samples" xpath="//m:getQuote/m:request/m:symbol"/>
         </enrich>
         <send>
                <endpoint>
                    <address uri="tcp://backend-http-host-wso2:9000/services/hellomi"/>
                </endpoint>
            </send>
      </inSequence>
      <outSequence>
         <send/>
      </outSequence>
      <faultSequence/>
   </target>
   <parameter name="transport.tcp.responseDelimiterType">string</parameter>
   <parameter name="transport.tcp.responseClient">true</parameter>
   <parameter name="transport.tcp.inputType">string</parameter>
   <parameter name="transport.tcp.recordDelimiter">\n</parameter>
   <parameter name="transport.tcp.responseDelimiter">|</parameter>
   <parameter name="transport.tcp.contentType">plain/text</parameter>
   <parameter name="transport.tcp.port">6061</parameter>
   <parameter name="transport.tcp.recordDelimiterType">string</parameter>
</proxy>
```

### TCP Client

Since it was not possible to use a common load test client (e.g., JMeter), a custom TCP client was used. The client
opens a new TCP connection for each request, sends a SOAP message, waits for a response terminated by the `|` character,
and then closes the connection.

- **Heap settings:** Initial = 512 MB, Maximum = 2 GB
- **Threads:** 50
- **TPS:** Varied per test (50, 250, 500, 1000)

### TCP Server

A lightweight TCP server was used as the backend application. It responds to requests with a payload ending with the `|`
delimiter (to signal end of response).

- **Heap settings:** Initial = 512 MB, Maximum = 2 GB

### System Specifications

* Deployment: AWS EC2 instance
* CPU: 2 vCPU
* Memory: 8 GB
* OS: Ubuntu 24.04.3 LTS
* Java: OpenJDK 17.0.16
* Ephemeral port range: 10000–65000
* File descriptor limits:
    * Soft limit: 1048576
    * Hard limit: 1048576

The TCP Client, TCP Server, and MI Server were run on separate instances, all with the same specifications listed above.

## Test Steps 

1. Only one MI node was used as the server.
2. The client and backend were executed as described above.
3. Tests were executed at different **TPS levels**:
     * 50 TPS
     * 250 TPS
     * 500 TPS
     * 1000 TPS
4. Each test ran for more than **10 minutes**.
5. Metrics captured at the client side:
     * Achieved TPS
     * Latency

## Observed Results 

Graphs for TPS and latency can be found here:

* At lower loads (50 TPS, 250 TPS), the client was able to sustain the configured rate.

    50 TPS 

    [![Client set to 50 TPS]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/50-tps.png)]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/50-tps.png)

    250 TPS 

    [![Client set to 50 TPS]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/250-tps.png)]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/250-tps.png)

* At higher loads (500 TPS, 1000 TPS), the achieved TPS fell short of the target.

    500 TPS 

    [![Client set to 500 TPS]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/500-tps.png)]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/500-tps.png)

    1000 TPS 

    [![Client set to 1000 TPS]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/1000-tps.png)]({{base_path}}/assets/img/setup-and-install/tcp-transport-performance-test-results/1000-tps.png)
