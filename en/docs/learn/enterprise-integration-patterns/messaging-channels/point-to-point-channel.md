# Point-to-Point Channel

The Point-to-Point Channel EIP pattern allows only a single receiver to consume a sent message when there are multiple receivers waiting to consume it.

!!! info
    For more information, go to [Point-to-Point Channel](http://www.eaipatterns.com/PointToPointChannel.html). 

## Sample scenario

The sample scenario is an inventory for stocks. It illustrates how a stock quote is generated, which only a single consumer receives at a given time. The diagram below depicts how to simulate the sample scenario using the ESB profile.

![Point-to-Point Channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/point-to-point.png)

## Synapse configurations of the artifacts

When you unzip the ZIP file you download below in Step 6 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/synapse-config` directory. For more information about these artifacts, go to WSO2 EI Documentation.

**Proxy Service**

```
<proxy xmlns="http://ws.apache.org/ns/synapse" name="PointToPointProxy" transports="http https" startOnLoad="true" >
       <target>
           <inSequence>
               <send>
                   <endpoint>
                       <!-- Channel With Multiple Endpoints Load Balancer Will Ensure that only one will receive it -->
                       <loadbalance>
                           <endpoint>
                               <address uri="http://localhost:9000/services/SimpleStockQuoteService/" />
                           </endpoint>
                           <endpoint>
                               <address uri="http://localhost:9001/services/SimpleStockQuoteService/" />
                           </endpoint>
                           <endpoint>
                               <address uri="http://localhost:9002/services/SimpleStockQuoteService/" />
                           </endpoint>
                       </loadbalance>
                   </endpoint>
               </send>
           </inSequence>
           <outSequence>
               <respond/>
           </outSequence>
       </target>
</proxy>
```

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

1. Install WSO2 EI

    For instructions, go to Installing the Product in the WSO2 EI Documentation.

2. Set up WSO2 EI Tooling

    For instructions, go to Installing Enterprise Integrator Tooling in the WSO2 EI Documentation.

3. Start the backend (`SimpleStockQuoteService`) service

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Server/src/SimpleStockQuoteService` directory, and execute the ant command.

    For more information on the `SimpleStockQuoteService`, go to Deploying sample backend services in the WSO2 EI Documentation.

4. Start three Axis2 server instances

    In three new Console tabs, navigate to the `<EI_HOME>/samples/axis2server` directory, and execute the following commands one after the other:

    ```
    sh axis2Server.sh -http 9000 -https 9005
    
    sh axis2Server.sh -http 9001 -https 9006
    
    sh axis2Server.sh -http 9002 -https 9007
    ```

5. Download the artifacts of the sample

    Download the `Point-to-Point-Channel.zip` file.

6. Import the artifacts to WSO2 EI

    Click File -> Import -> WSO2 -> Existing WSO2 projects into workspace to import the downloaded ZIP file via WSO2 EI Tooling.

7. Start the ESB profile of the WSO2 EI server

    For instructions, go to Running WSO2 Enterprise Integrator via Tooling in the WSO2 EI Documentation.

8. Start the Stock Quote Client

    In a new Console tab, navigate to the `<EI_HOME>/samples/axis2Client` directory to start the Stock Quote Client application.

9. Execute the sample

    In a new Console tab, execute the following command three time to send three requests:

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/services/PointToPointProxy 
    ```
   
The structure of the request should be as follows:

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header />
   <soapenv:Body>
        <ser:getQuote>       
         <ser:request>
             <ser:symbol>foo</ser:symbol>
         </ser:request>     
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

Out of the three instances of the Stock Quote service (Axis2 server), only one server acquires the sent request at a given time. When you execute the request, the ESB profile first receives the message and then routes it to the back-end service (StockQuoteService). The following output will be printed on the Axis2 Server Console: 

```

```

The generated stock quote will then be sent to the client application (Stock Quote Client). The following output will be printed on the client application Console:

```

```

!!! note
    If you try sending multiple requests, the Console logs of each of the Axis2 server instances will display that the three of them are receiving the message one after the other (i.e., in Round Robin pattern).
