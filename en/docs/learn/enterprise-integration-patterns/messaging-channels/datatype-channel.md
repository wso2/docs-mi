# Datatype Channel

This page explains how you can implement a sample scenario of Datatype Channel EIP using WSO2 Micro Integrator.

## Introduction to Datatype Channel

This EIP creates a separate channel for each type of data so that all messages on a given channel contain the same data type. The sender, knowing the data type, selects the appropriate channel to send the message. The receiver identifies the data type of a message based on the channel it is received on.

!!! info
    For more information, go to [Data Type Channel](http://www.eaipatterns.com/DatatypeChannel.html).

![Data type solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/data-type-solution.gif)

## Sample scenario

The example scenario depicts a Stock Quote service deployed in an Axis2 server. It offers several service operations to the user. WSO2 MI uses the switch mediator to identify each action specified by the sender and diverts the request into the appropriate sequence. Each sequence acts as a separate channel. The sender experiences the decomposition of channels through a log message indicated by the system. There will be a different log message for each operation the sender requests.

The diagram below shows how to simulate the example scenario using the WSO2 MI.

![Data type channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/datatype-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Datatype Channel EIP by comparing their core components.

| Datatype Channel EIP (Figure 1) | Datatype Channel Example Scenario (Figure 2) |
|---------------------------------|----------------------------------------------|
| Sender                          | Client                                       |
| Datatype Channel                | Switch and Sequence mediators specify which datatype channel to use. The Switch Mediator determines the appropriate datatype channel, and each datatype channel is defined as a Sequence Mediator.                                             |
| Receiver                        | Stock Quote Server Instance                  |

## Synapse configuration of the artifacts

!!! note
    When you unzip the ZIP file you downloaded below in step 7 when simulating the sample scenario, you can find the below configurations in the `<UNZIPPED_FILE>/src/main/wso2mi/artifacts` directory. For more information about these artifacts, go to [Develop Integration Solutions]({{base_path}}/develop/intro-integration-development/).

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="datatype-channel-proxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <switch source="get-property('Action')">
                    <case regex="/*urn:getQuote/*">
                        <sequence key="StockQuote"/>
                    </case>
                    <case regex="/*urn:getFullQuote/*">
                        <sequence key="FullQuote"/>
                    </case>
                    <case regex="/*urn:getMarketActivity/*">
                        <sequence key="MarketActivity"/>
                    </case>
                    <default>
                    </default>
                </switch>
                <respond/>
            </inSequence>
        </target>
    </proxy>
    ```
=== "FullQuote Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="FullQuote" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log level="custom">
            <property name="Messaging_Channel" value="FULL_QUOTE"/>
        </log>
        <call>
            <endpoint key="StockQuoteReceiver"/>
        </call>
    </sequence>
    ```
=== "MarketActivity Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="MarketActivity" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log level="custom">
            <property name="Messaging_Channel" value="MARKET_ACTIVITY"/>
        </log>
        <call>
            <endpoint key="StockQuoteReceiver"/>
        </call>
    </sequence>
    ```
=== "StockQuote Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="StockQuote" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <log level="custom">
            <property name="Messaging_Channel" value="STOCK_QUOTE"/>
        </log>
        <call>
            <endpoint key="StockQuoteReceiver"/>
        </call>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="StockQuoteReceiver" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- **Endpoint**: Defines an endpoint referenced by a name that contains an `<address>` element with the endpoint address of a particular service.
- **Sequence**: The Sequence Mediator defines a sequence block, callable by its key (defined in the name attribute). Each sequence block has its own `<in>` and `<out>` blocks.
- **Switch**: A Switch mediator that uses the `get-property` XPath expression to find the Action field from the SOAP header. The regular expression defined in the `Regex` attribute tries to match the value in the Action field. If successfully matched, it calls the relevant sequence by its key. If `get-property('Action')` returns `urn:getQuote`, the StockQuote sequence is called. 

## Set up the sample scenario

Follow the below instructions to simulate this sample scenario.

{!includes/eip-set-up.md!}

3. Download the [backend service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).

4. Extract the downloaded zip file.

5. Open a terminal, and navigate to the `axis2Server/bin/` directory inside the extracted folder.

6. Execute the following command to start the axis2server with the SimpleStockQuote backend service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"                
          ```bash
          axis2server.bat
          ``` 

7. Download the artifacts of the sample.

    <a href="{{base_path}}/assets/attachments/learn/enterprise-integration-patterns/datatype-channel.zip">
        <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
    </a>

8. Import the artifacts to WSO2 MI.

    Click **File** -> **Open Folder** -> Select the extracted ZIP file to import the downloaded ZIP file.

9.  Start the project in the WSO2 MI server.

    For instructions, go to [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) Documentation.

10. Start SoapUI.

    For instructions on downloading and starting, go to [SoapUI Getting Started](https://www.soapui.org/getting-started/) Documentation.

## Execute the sample

Send the following request using SoapUI (or any other Soap client).

```xml
POST http://localhost:8290/services/datatype-channel-proxy

Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: "urn:getQuote"
Connection: Keep-Alive

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Body>
      <ser:getQuote>
         <ser:request>
            <xsd:symbol>IBM</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

## Analyze the output

Client Console output :

```xml
<?xml version='1.0' encoding='UTF-8'?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <ns:getQuoteResponse xmlns:ns="http://services.samples">
            <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetQuoteResponse">
                <ax21:change>4.43961367484849</ax21:change>
                <ax21:earnings>-8.635518433323004</ax21:earnings>
                <ax21:high>-166.1948849143979</ax21:high>
                <ax21:last>168.37324107248676</ax21:last>
                <ax21:lastTradeTimestamp>Wed Aug 07 16:35:17 IST 2024</ax21:lastTradeTimestamp>
                <ax21:low>-164.8905773076009</ax21:low>
                <ax21:marketCap>1.2851652039616395E7</ax21:marketCap>
                <ax21:name>IBM Company</ax21:name>
                <ax21:open>-165.59569807034666</ax21:open>
                <ax21:peRatio>25.757171461451893</ax21:peRatio>
                <ax21:percentageChange>-2.7261040463404305</ax21:percentageChange>
                <ax21:prevClose>-162.85562103942087</ax21:prevClose>
                <ax21:symbol>IBM</ax21:symbol>
                <ax21:volume>7254</ax21:volume>
            </ns:return>
        </ns:getQuoteResponse>
    </soapenv:Body>
</soapenv:Envelope>
```

Axis2 server console output:

```log
samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

WSO2 MI logs:

```log
INFO {LogMediator} - {proxy:datatype-channel-proxy} Messaging_Channel = STOCK_QUOTE
```

Also execute the below commands, and observe the WSO2 MI log of the corresponding values `MARKET_ACTIVITY`, and `FULL_QUOTE`.

=== "MARKET_ACTIVITY"
    ```xml
    POST http://localhost:8290/services/datatype-channel-proxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    SOAPAction: "urn:getMarketActivity"
    Connection: Keep-Alive

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <ser:getMarketActivity xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
            <ser:request>
                <xsd:symbols>IBM</xsd:symbols>
                <xsd:symbols>MSFT</xsd:symbols>
            </ser:request>
        </ser:getMarketActivity>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
=== "FULL_QUOTE"
    ```xml
    POST http://localhost:8290/services/datatype-channel-proxy

    Accept-Encoding: gzip,deflate
    Content-Type: text/xml;charset=UTF-8
    SOAPAction: "urn:getFullQuote"
    Connection: Keep-Alive

    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <ser:getQuote>
            <ser:request>
                <xsd:symbol>IBM</xsd:symbol>
            </ser:request>
        </ser:getQuote>
    </soapenv:Body>
    </soapenv:Envelope>
    ```

Notice the following respective output.

Client Console outputs :
=== "MARKET_ACTIVITY"
    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <ns:getMarketActivityResponse xmlns:ns="http://services.samples">
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetMarketActivityResponse">
                    <ax21:quotes xsi:type="ax21:GetQuoteResponse">
                        <ax21:change>4.40336660358583</ax21:change>
                        <ax21:earnings>12.319295187078</ax21:earnings>
                        <ax21:high>94.03619304836798</ax21:high>
                        <ax21:last>90.82348202396865</ax21:last>
                        <ax21:lastTradeTimestamp>Wed Aug 07 15:38:17 IST 2024</ax21:lastTradeTimestamp>
                        <ax21:low>93.44940381561476</ax21:low>
                        <ax21:marketCap>4.549622323611886E7</ax21:marketCap>
                        <ax21:name>IBM Company</ax21:name>
                        <ax21:open>94.6327891666243</ax21:open>
                        <ax21:peRatio>25.629335846088587</ax21:peRatio>
                        <ax21:percentageChange>-5.134415494508379</ax21:percentageChange>
                        <ax21:prevClose>-85.76178940515318</ax21:prevClose>
                        <ax21:symbol>IBM</ax21:symbol>
                        <ax21:volume>9964</ax21:volume>
                    </ax21:quotes>
                    <ax21:quotes xsi:type="ax21:GetQuoteResponse">
                        <ax21:change>-2.324984024729231</ax21:change>
                        <ax21:earnings>12.689150281270935</ax21:earnings>
                        <ax21:high>-76.06437403824907</ax21:high>
                        <ax21:last>78.01271422949337</ax21:last>
                        <ax21:lastTradeTimestamp>Wed Aug 07 15:38:17 IST 2024</ax21:lastTradeTimestamp>
                        <ax21:low>81.53477214299937</ax21:low>
                        <ax21:marketCap>-558317.9771472402</ax21:marketCap>
                        <ax21:name>MSFT Company</ax21:name>
                        <ax21:open>-77.27340122935652</ax21:open>
                        <ax21:peRatio>23.654158218769233</ax21:peRatio>
                        <ax21:percentageChange>3.0488952179783175</ax21:percentageChange>
                        <ax21:prevClose>-76.2566063608738</ax21:prevClose>
                        <ax21:symbol>MSFT</ax21:symbol>
                        <ax21:volume>17217</ax21:volume>
                    </ax21:quotes>
                </ns:return>
            </ns:getMarketActivityResponse>
        </soapenv:Body>
    </soapenv:Envelope>
    ```
=== "FULL_QUOTE"
    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <ns:getFullQuoteResponse xmlns:ns="http://services.samples">
                <ns:return xmlns:ax21="http://services.samples/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ax21:GetFullQuoteResponse">
                    <ax21:tradeHistory xsi:type="ax21:TradingDay">
                        <ax21:day>0</ax21:day>
                        <ax21:quote xsi:type="ax21:GetQuoteResponse">
                            <ax21:change>-2.5198893690114956</ax21:change>
                            <ax21:earnings>13.19468975206724</ax21:earnings>
                            <ax21:high>-167.65670851883834</ax21:high>
                            <ax21:last>168.6391882596344</ax21:last>
                            <ax21:lastTradeTimestamp>Wed Aug 07 15:04:13 IST 2024</ax21:lastTradeTimestamp>
                            <ax21:low>-167.55006922799092</ax21:low>
                            <ax21:marketCap>-6712036.421688136</ax21:marketCap>
                            <ax21:name>IBM Company</ax21:name>
                            <ax21:open>175.61492125577578</ax21:open>
                            <ax21:peRatio>25.986398160281574</ax21:peRatio>
                            <ax21:percentageChange>1.52878739951175</ax21:percentageChange>
                            <ax21:prevClose>-164.82928691172327</ax21:prevClose>
                            <ax21:symbol>IBM</ax21:symbol>
                            <ax21:volume>5054</ax21:volume>
                        </ax21:quote>
                    </ax21:tradeHistory>
                    ........
                    <ax21:tradeHistory xsi:type="ax21:TradingDay">
                        <ax21:day>364</ax21:day>
                        <ax21:quote xsi:type="ax21:GetQuoteResponse">
                            <ax21:change>4.2557370763975</ax21:change>
                            <ax21:earnings>-9.752680350379652</ax21:earnings>
                            <ax21:high>91.819438532482</ax21:high>
                            <ax21:last>87.92397844293666</ax21:last>
                            <ax21:lastTradeTimestamp>Wed Aug 07 15:04:13 IST 2024</ax21:lastTradeTimestamp>
                            <ax21:low>92.21429951895794</ax21:low>
                            <ax21:marketCap>4776036.162258254</ax21:marketCap>
                            <ax21:name>IBM Company</ax21:name>
                            <ax21:open>-86.28062478600118</ax21:open>
                            <ax21:peRatio>25.82066202297852</ax21:peRatio>
                            <ax21:percentageChange>4.353943899600255</ax21:percentageChange>
                            <ax21:prevClose>97.74441689035609</ax21:prevClose>
                            <ax21:symbol>IBM</ax21:symbol>
                            <ax21:volume>18648</ax21:volume>
                        </ax21:quote>
                    </ax21:tradeHistory>
                </ns:return>
            </ns:getFullQuoteResponse>
        </soapenv:Body>
    </soapenv:Envelope>
    ```

Axis2 server console outputs:

=== "MARKET_ACTIVITY"
    ```log
    samples.services.SimpleStockQuoteService :: Generating Market activity report for : [IBM, MSFT]
    ```
=== "FULL_QUOTE"
    ```log
    samples.services.SimpleStockQuoteService :: Full quote for : IBM
    ```
WSO2 MI logs:

=== "MARKET_ACTIVITY"
    ```log
    INFO {LogMediator} - {proxy:datatype-channel-proxy} Messaging_Channel = MARKET_ACTIVITY
    ```
=== "FULL_QUOTE"
    ```log
    INFO {LogMediator} - {proxy:datatype-channel-proxy} Messaging_Channel = FULL_QUOTE
    ```
