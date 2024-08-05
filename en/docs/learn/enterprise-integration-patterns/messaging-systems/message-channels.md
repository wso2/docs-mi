# Message Channels

Message Channels facilitate communication between applications. A sender adds a message to a particular channel, which a receiver can read. Message Channels allow the sender and receiver to synchronize.

!!! info
    For more information, see the [Message Channel](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html) documentation.

## Sample scenario

The sample scenario depicts how a stock inventory is made from a sender application to the receiver application through a Message Channel. The Message Channel retrieves the message content from the sender, and it allows the receiver to read the content through the Message Channel. The diagram below depicts how to simulate the sample scenario using the ESB profile.

![Message channels]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-systems/message-channels.png)

## Synapse configurations of the artifacts

When you unzip the ZIP file you download below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/synapse-config` directory. For more information about these artifacts, go to WSO2 EI Documentation.

=== "Proxy Service"
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="message-channel-proxy" startOnLoad="true" transports="http https"
          xmlns="http://ws.apache.org/ns/synapse">
          <target>
              <inSequence>
                  <sequence key="message-channel-sequence"/>
              </inSequence>
              <outSequence>
                  <log level="custom">
                      <property name="sending response to" value="client"/>
                  </log>
                  <respond/>
              </outSequence>
              <faultSequence/>
          </target>
      </proxy>
      ```
=== "Sequence"
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="message-channel-sequence" trace="disable"
          xmlns="http://ws.apache.org/ns/synapse">
          <log level="custom">
              <property name="sending request to" value="axis2 server"/>
          </log>
          <send>
              <endpoint>
                  <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
              </endpoint>
          </send>
      </sequence>
      ```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

1. Install WSO2 EI.

    For instructions, go to Installing the Product in the WSO2 EI Documentation.

2. Set up WSO2 EI Tooling.

    For instructions, go to Installing Enterprise Integrator Tooling in the WSO2 EI Documentation.

3. Start the backend (SimpleStockQuoteService) service

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Server/src/SimpleStockQuoteService` directory, and execute the ant command.

    For more information on the SimpleStockQuoteService, go to Deploying sample backend services in the WSO2 EI Documentation.

4. Start one Axis2 server instance.

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2server` directory, and execute the following commands:

    === "On Windows"
          ```
          axis2server.bat
          ```
    === "On Linux/Solaris"
          ```
          ./axis2server.sh
          ```

5. Download the artifacts of the sample.

    Download the `MessageChannels.zip` file.

6. Import the artifacts to WSO2 EI.

    Click File -> Import -> WSO2 -> Existing WSO2 projects into workspace to import the downloaded ZIP file via WSO2 EI Tooling.

7. Start the ESB profile of the WSO2 EI server

    For instructions, go to Running WSO2 Enterprise Integrator via Tooling in the WSO2 EI Documentation.

8. Start the Stock Quote Client.

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Client` directory to start the Stock Quote Client application.

9. Execute the sample.

    In the Console tab of the Stock Quote Client, execute the following command:

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/services/message-channel-proxy
    ```

## Analysing the output

When you execute the request, the ESB profile first receives the message and then routes it to the back-end service (StockQuoteService). The following output will be printed on the Axis2 Server Console:

```

```

The generated stock quote will then be sent to the client application (Stock Quote Client). The following output will be printed on the client application Console:

```

```
