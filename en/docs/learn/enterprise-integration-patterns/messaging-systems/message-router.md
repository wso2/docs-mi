# Message Router

The Message Router EIP reads the content of a message and routes it to a specific recipient based on its content. When the implementation of a specific logical function is distributed across multiple physical systems, an incoming request needs to be passed on to the correct service based on the content of the request. A Message Router is useful in handling such scenarios.

The Message Router performs a logical function (such as an inventory check). It receives a request message (new order), reads it, and routes the request to one of the two recipients according to the content of the message. The router is also defined as a special type of a filter.

!!! info
    For more information, see the [Message Router](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html) documentation.  

## Sample scenario

The sample scenario depicts an inventory for stocks, and how Message Router EIP routes a message to a different service based on the content of the message. When the router receives a stock request, it reads the content of the request as follows.

* If the request is made to foo, it is routed to fooOutQueue.
* If the request is for bar, it is routed to barOutQueue.

!!! note
    The Switch and Send mediators of the ESB profile of WSO2 EI simulate the Message Router EIP. The Switch Mediator depicts the Router and observes the content of the message, while the Send Mediator sends the message to a selected recipient.

    Each case defined in the Switch mediator is used to decide the routing of the message to the appropriate service. fooOutQueue and barOutQueue act as two separate services.

## Synapse configuration

When you unzip the ZIP file you download below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/synapse-config` directory. For more information about these artifacts, go to WSO2 EI Documentation.

=== "Proxy Service"
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <proxy name="message-router-proxy" startOnLoad="true" transports="http https"
          xmlns="http://ws.apache.org/ns/synapse">
          <target>
              <inSequence>
                  <!-- Will call the message router -->
                  <sequence key="MessageRoute"/>
              </inSequence>
              <outSequence>
                  <respond/>
              </outSequence>
              <faultSequence/>
          </target>
      </proxy>
      ```
=== "Sequence"
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <sequence name="MessageRoute" trace="disable"
          xmlns="http://ws.apache.org/ns/synapse">
          <switch source="//m0:getQuote/m0:request/m0:symbol"
              xmlns:m0="http://services.samples">
              <case regex="foo">
                  <send>
                      <endpoint>
                          <address uri="http://localhost:9000/services/SimpleStockQuoteService?wsdl"/>
                      </endpoint>
                  </send>
              </case>
              <case regex="bar">
                  <send>
                      <endpoint>
                          <address uri="http://localhost:9001/services/SimpleStockQuoteService?wsdl"/>
                      </endpoint>
                  </send>
              </case>
              <default>
                  <property expression="fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)" name="symbol" scope="default" type="STRING"/>
              </default>
          </switch>
      </sequence>
      ```     

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Start the backend (SimpleStockQuoteService) service

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Server/src/SimpleStockQuoteService` directory, and execute the ant command.

    For more information on the SimpleStockQuoteService, go to Deploying sample backend services in the WSO2 EI Documentation.

5. Start two Axis2 server instances

    In two new Console tabs, navigate to the `<EI_HOME>/samples/axis2server` directory, and execute the following commands:

    ```
    ./axis2server.sh -http  9000 -https  9002 -name MyServer1
    
    ./axis2server.sh -http  9001 -https  9003 -name MyServer2
    ```

6. Download the artifacts of the sample

    Download the `MessageRouter.zip` file.

7. Import the artifacts to WSO2 EI

    Click File -> Import -> WSO2 -> Existing WSO2 projects into workspace to import the downloaded ZIP file via WSO2 EI Tooling.

8. Start the ESB profile of the WSO2 EI server

    For instructions, go to Running WSO2 Enterprise Integrator via Tooling in the WSO2 EI Documentation.

10. Start the Stock Quote Client

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Client` directory to start the Stock Quote Client application.

11. Execute the sample

    In the Console tab of the Stock Quote Client, execute the following command:
    
    ```  
    ant stockquote -Dtrpurl=http://localhost:8280/services/message-router-proxy -Dsymbol=foo
    ```
    
## Analyze the output

After you execute the above command through the client, the request is transferred to the foo inventory service. You view the following processed server log in the Stock Quote Client Console: 

```

```

Also, you view the following log printed in the MyServer1 Axis2 Server Console open in the HTTP port 9000.

```

```

Now, change the -Dsymbol parameter to bar and run the following command:

```
ant stockquote -Dtrpurl=http://localhost:8280/services/message-router-proxy -Dsymbol=bar
```
Then, the request goes to the bar inventory service. You view the following processed server log in the Stock Quote Client Console:
```

```
Also, you view the following log printed in the MyServer2 Axis2 Server Console open in the HTTP port 9001.

```

```