# SNMP Monitoring

Simple Network Management Protocol (SNMP) is an Internet-standard protocol for managing devices on IP networks. Follow the instructions given below to configure SNMP monitoring in the WSO2 Micro Integrator, which exposes various MBeans via SNMP.

!!! Info "Java Version Compatibility"
    - For Java 8 and later versions, use SNMP4J version 3.x and above
    - For older Java versions (Java 7 and below), SNMP4J version 2.x may be used
    - Always refer to the [official SNMP4J documentation](https://www.snmp4j.org/) for the latest compatibility information

## Enabling SNMP

1.  Download the following jar files from [https://www.snmp4j.org](https://www.snmp4j.org/) and add them to the
    `<MI_HOME>/lib` directory. 
    
     !!! Info
         For Java 8 and later versions, it is recommended to use SNMP4J version 3.x and above as per the [official SNMP4J documentation](https://www.snmp4j.org/).
    
     -  **snmp4j-3.8.0.jar** (or latest 3.x version)
     -  **snmp4j-agent-3.1.2.jar** (or latest 3.x version)
  
2.  Enable SNMP monitoring by adding the required JAR files to the classpath. 
    
    !!! Warning "Configuration Note"
        The previously documented `synapse.snmp.enabled` property may not be recognized by the current Micro Integrator implementation. SNMP monitoring is typically enabled by the presence of the SNMP4J libraries in the classpath. If SNMP monitoring is not working with just the JAR files, please consult the latest WSO2 Micro Integrator documentation or contact WSO2 support for the correct configuration properties.
    
    Alternatively, you can try adding the following configuration to the `deployment.toml` file in the `<MI_HOME>/conf/` directory:
    
     ```toml
     [synapse_properties]
     'synapse.snmp.enabled'=true
     ```
     
     Note: If the above property doesn't work, SNMP monitoring might be automatically enabled when the SNMP4J libraries are detected in the classpath.

3.  **Verification**: Restart the WSO2 Micro Integrator after adding the JAR files and configuration. Check the server logs for any SNMP-related messages to confirm that SNMP monitoring is properly initialized.

The WSO2 Micro Integrator can now monitor MBeans with SNMP. For example:

``` java
Monitoring Info : OID branch "1.3.6.1.4.1.18060.14" with the following sub-branches:
    
1 - ServerManager MBean
2 - Transport MBeans
3 - NHttpConnections MBeans
4 - NHTTPLatency MBeans
5 - NHTTPS2SLatency MBeans
```

## MBean OID mappings

Following are the OID equivalents of the server manager and transport MBeans, which are described in [JMX Monitoring]({{base_path}}/observe-and-manage/classic-observability-metrics/jmx-monitoring):

!!! Note "Downloading SNMP4J Libraries"
    - Download the latest compatible versions from the [SNMP4J Downloads page](https://www.snmp4j.org/html/download.html)
    - Ensure you download both the core SNMP4J library and the SNMP4J Agent library
    - The version numbers mentioned above are examples; always use the latest stable versions compatible with your Java version

```
Name=ServerManager@ServerState as OID: 
1.3.6.1.4.1.18060.14.1.21.1.0

Name=passthru-http-sender@ActiveThreadCount as OID:
1.3.6.1.4.1.18060.14.2.17.1.0

Name=passthru-http-sender@AvgSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.17.2.0

Name=passthru-http-sender@AvgSizeSent as OID:
1.3.6.1.4.1.18060.14.2.17.3.0

Name=passthru-http-sender@BytesReceived as OID:
1.3.6.1.4.1.18060.14.2.17.4.0

Name=passthru-http-sender@BytesSent as OID:
1.3.6.1.4.1.18060.14.2.17.5.0

Name=passthru-http-sender@FaultsReceiving as OID:
1.3.6.1.4.1.18060.14.2.17.6.0

Name=passthru-http-sender@FaultsSending as OID:
1.3.6.1.4.1.18060.14.2.17.7.0

Name=passthru-http-sender@LastResetTime as OID:
1.3.6.1.4.1.18060.14.2.17.8.0

Name=passthru-http-sender@MaxSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.17.9.0

Name=passthru-http-sender@MaxSizeSent as OID:
1.3.6.1.4.1.18060.14.2.17.10.0

Name=passthru-http-sender@MessagesReceived as OID:
1.3.6.1.4.1.18060.14.2.17.11.0

Name=passthru-http-sender@MessagesSent as OID:
1.3.6.1.4.1.18060.14.2.17.12.0

Name=passthru-http-sender@MetricsWindow as OID:
1.3.6.1.4.1.18060.14.2.17.13.0

Name=passthru-http-sender@MinSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.17.14.0

Name=passthru-http-sender@MinSizeSent as OID:
1.3.6.1.4.1.18060.14.2.17.15.0

Name=passthru-http-sender@QueueSize as OID:
1.3.6.1.4.1.18060.14.2.17.16.0

Name=passthru-http-sender@TimeoutsReceiving as OID:
1.3.6.1.4.1.18060.14.2.17.18.0

Name=passthru-http-sender@TimeoutsSending as OID:
1.3.6.1.4.1.18060.14.2.17.19.0

Name=passthru-https-sender@ActiveThreadCount as OID:
1.3.6.1.4.1.18060.14.2.18.1.0

Name=passthru-https-sender@AvgSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.18.2.0

Name=passthru-https-sender@AvgSizeSent as OID:
1.3.6.1.4.1.18060.14.2.18.3.0

Name=passthru-https-sender@BytesReceived as OID:
1.3.6.1.4.1.18060.14.2.18.4.0

Name=passthru-https-sender@BytesSent as OID:
1.3.6.1.4.1.18060.14.2.18.5.0

Name=passthru-https-sender@FaultsReceiving as OID:
1.3.6.1.4.1.18060.14.2.18.6.0

Name=passthru-https-sender@FaultsSending as OID:
1.3.6.1.4.1.18060.14.2.18.7.0

Name=passthru-https-sender@LastResetTime as OID:
1.3.6.1.4.1.18060.14.2.18.8.0

Name=passthru-https-sender@MaxSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.18.9.0

Name=passthru-https-sender@MaxSizeSent as OID:
1.3.6.1.4.1.18060.14.2.18.10.0

Name=passthru-https-sender@MessagesReceived as OID:
1.3.6.1.4.1.18060.14.2.18.11.0

Name=passthru-https-sender@MessagesSent as OID:
1.3.6.1.4.1.18060.14.2.18.12.0

Name=passthru-https-sender@MetricsWindow as OID:
1.3.6.1.4.1.18060.14.2.18.13.0

Name=passthru-https-sender@MinSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.18.14.0

Name=passthru-https-sender@MinSizeSent as OID:
1.3.6.1.4.1.18060.14.2.18.15.0

Name=passthru-https-sender@QueueSize as OID:
1.3.6.1.4.1.18060.14.2.18.16.0

Name=passthru-https-sender@TimeoutsReceiving as OID:
1.3.6.1.4.1.18060.14.2.18.18.0

Name=passthru-https-sender@TimeoutsSending as OID:
1.3.6.1.4.1.18060.14.2.18.19.0

Name=passthru-http-receiver@ActiveThreadCount as OID:
1.3.6.1.4.1.18060.14.2.19.1.0

Name=passthru-http-receiver@AvgSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.19.2.0

Name=passthru-http-receiver@AvgSizeSent as OID:
1.3.6.1.4.1.18060.14.2.19.3.0

Name=passthru-http-receiver@BytesReceived as OID:
1.3.6.1.4.1.18060.14.2.19.4.0

Name=passthru-http-receiver@BytesSent as OID:
1.3.6.1.4.1.18060.14.2.19.5.0

Name=passthru-http-receiver@FaultsReceiving as OID:
1.3.6.1.4.1.18060.14.2.19.6.0

Name=passthru-http-receiver@FaultsSending as OID:
1.3.6.1.4.1.18060.14.2.19.7.0

Name=passthru-http-receiver@LastResetTime as OID:
1.3.6.1.4.1.18060.14.2.19.8.0

Name=passthru-http-receiver@MaxSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.19.9.0

Name=passthru-http-receiver@MaxSizeSent as OID:
1.3.6.1.4.1.18060.14.2.19.10.0

Name=passthru-http-receiver@MessagesReceived as OID:
1.3.6.1.4.1.18060.14.2.19.11.0

Name=passthru-http-receiver@MessagesSent as OID:
1.3.6.1.4.1.18060.14.2.19.12.0

Name=passthru-http-receiver@MetricsWindow as OID:
1.3.6.1.4.1.18060.14.2.19.13.0

Name=passthru-http-receiver@MinSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.19.14.0

Name=passthru-http-receiver@MinSizeSent as OID:
1.3.6.1.4.1.18060.14.2.19.15.0

Name=passthru-http-receiver@QueueSize as OID:
1.3.6.1.4.1.18060.14.2.19.16.0

Name=passthru-http-receiver@TimeoutsReceiving as OID:
1.3.6.1.4.1.18060.14.2.19.18.0

Name=passthru-http-receiver@TimeoutsSending as OID:
1.3.6.1.4.1.18060.14.2.19.19.0

Name=passthru-https-receiver@ActiveThreadCount as OID:
1.3.6.1.4.1.18060.14.2.20.1.0

Name=passthru-https-receiver@AvgSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.20.2.0

Name=passthru-https-receiver@AvgSizeSent as OID:
1.3.6.1.4.1.18060.14.2.20.3.0

Name=passthru-https-receiver@BytesReceived as OID:
1.3.6.1.4.1.18060.14.2.20.4.0

Name=passthru-https-receiver@BytesSent as OID:
1.3.6.1.4.1.18060.14.2.20.5.0

Name=passthru-https-receiver@FaultsReceiving as OID:
1.3.6.1.4.1.18060.14.2.20.6.0

Name=passthru-https-receiver@FaultsSending as OID:
1.3.6.1.4.1.18060.14.2.20.7.0

Name=passthru-https-receiver@LastResetTime as OID:
1.3.6.1.4.1.18060.14.2.20.8.0

Name=passthru-https-receiver@MaxSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.20.9.0

Name=passthru-https-receiver@MaxSizeSent as OID:
1.3.6.1.4.1.18060.14.2.20.10.0

Name=passthru-https-receiver@MessagesReceived as OID:
1.3.6.1.4.1.18060.14.2.20.11.0

Name=passthru-https-receiver@MessagesSent as OID:
1.3.6.1.4.1.18060.14.2.20.12.0

Name=passthru-https-receiver@MetricsWindow as OID:
1.3.6.1.4.1.18060.14.2.20.13.0

Name=passthru-https-receiver@MinSizeReceived as OID:
1.3.6.1.4.1.18060.14.2.20.14.0

Name=passthru-https-receiver@MinSizeSent as OID:
1.3.6.1.4.1.18060.14.2.20.15.0

Name=passthru-https-receiver@QueueSize as OID:
1.3.6.1.4.1.18060.14.2.20.16.0

Name=passthru-https-receiver@TimeoutsReceiving as OID:
1.3.6.1.4.1.18060.14.2.20.18.0

Name=passthru-https-receiver@TimeoutsSending as OID:
1.3.6.1.4.1.18060.14.2.20.19.0
```