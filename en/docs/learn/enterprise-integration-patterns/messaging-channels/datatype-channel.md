# Datatype Channel

This section explains, through an example scenario, how the Datatype Channel EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Datatype Channel

This EIP creates a separate channel for each type of data so that all the messages on a given channel will contain the same data type. The sender, who knows the data type, should select the appropriate channel on which to send the message. The receiver knows which type of data a message contains based on the channel in which it is received.

For more information, go to Data Type Channel.

![Data type solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/data-type-solution.gif)

## Sample scenario

The example scenario depicts a Stock Quote service deployed in Axis2 server. It offers several service operations to the user. The ESB profile uses the filter mediator to identify each action that is specified by the sender and diverts the request into the appropriate sequence. Each sequence acts as a separate channel. The sender experiences the decomposition of channels through a log message indicated by the ESB profile. There will be a different log message for each operation the sender requests.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Data type channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/datatype-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Datatype Channel EIP by comparing their core components.

| Datatype Channel EIP (Figure 1) | Datatype Channel Example Scenario (Figure 2) |
|---------------------------------|----------------------------------------------|
| Sender                          | Client                                             |
| Datatype Channel                                | Filter and Sequence mediators of the ESB profile. The Filter Mediator specifies which datatype channel to use, and the ESB profile each datatype channel as a Sequence Mediator.                                             |
| Receiver                                | Stock Quote Server Instance                                             |

## ESB configuration

Given below is the ESB configuration of this sample. Log in to the Management Console of the ESB profile, click Main, and then click Source View in the Service Bus menu to view this. 

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <endpoint name="StockQuoteReceiver">
       <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
   </endpoint>
   <sequence name="MarketActivity">
       <log level="custom">
           <property name="Messaging_Channel" value="MARKET_ACTIVITY"/>
       </log>
       <send>
           <endpoint key="StockQuoteReceiver"/>
       </send>
   </sequence>
   <sequence name="FullQuote">
       <log level="custom">
           <property name="Messaging_Channel" value="FULL_QUOTE"/>
       </log>
       <send>
           <endpoint key="StockQuoteReceiver"/>
       </send>
   </sequence>
 
   <sequence name="StockQuote">
       <log level="custom">
           <property name="Messaging_Channel" value="STOCK_QUOTE"/>
       </log>
       <send>
           <endpoint key="StockQuoteReceiver"/>
       </send>
   </sequence>
   <proxy name="datatype-channel-proxy" startOnLoad="true" transports="http https">
       <target>
           <log/>
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
               </switch>
           </inSequence>
           <outSequence>
               <respond/>
           </outSequence>
       </target>
   </proxy>
</definitions>
```

### How the implementation works

Let's investigate the elements of the configuration in detail.

- Endpoint - Defines an endpoint referenced by a name that contains an <address> element with the endpoint address of a particular service.
- Sequence - The Sequence Mediator defines a sequence block, callable by its key (defined in the name attribute). Each sequence block has its own <in> and <out> blocks.
- Sequence main - The main sequence, which is always run first.
- Filter - A Filter mediator that uses the get-property XPath expression to find the Action field from the SOAP header. The regular expression that is defined in the Regex attribute tries to match the value in the Action field. If successfully matched, it calls the relevant sequence by its key. In line 55, if get-property('Action') returns urn:getQuote, the StockQuote sequence defined in line 39 is called. 

## Set up the sample scenario

Now, let's try out the sample scenario explained above.

### Set up the environment

Download the `Datatype_Channel.zip`, which includes the artifacts of this sample and follow the steps in Simulating a Sample Scenario.

## Execute the sample

Execute the following command to send a request using theStock Quote Client to the ESB profile:

```
ant stockquote -Dtrpurl=http://localhost:8280/services/datatype-channel-proxy -Dmode=quote
```

For information on the Stock Quote Client and its operation modes, go to Stock Quote Client in the WSO2 EI Documentation.

Stock Client Console output :

```
Standard :: Stock price = $172.81050109499768
```

Axis2 server console output:

```
samples.services.SimpleStockQuoteService :: Generating quote for : IBM
```

ESB Profile logs:

```
INFO - LogMediator Messaging_Channel = STOCK_QUOTE
```

Also execute the below commands, and observe the ESB profile log of the corresponding values `STOCK_QUOTE`, `MARKET_ACTIVITY`, and `FULL_QUOTE`.

```
ant stockquote -Dtrpurl=http://localhost:8280/services/datatype-channel-proxy -Dmode=marketactivity
ant stockquote -Dtrpurl=http://localhost:8280/services/datatype-channel-proxy -Dmode=fullquote
```

Notice the following respective output.

Stock Client Console output :

Activity :: Average price = $123.67485145988432

Full :: Average price = $125.67875616729333

Axis2 server console output:

samples.services.SimpleStockQuoteService :: Generating Market activity report for : [JLN, FDZ, EQR, XNV, RDR, CZC, LIY, ZEP, ZJX, GWO, STS, NQU, RMA, UUR, PFL, ZEF, IYU, ZLV, KTW, PUN, IOZ, PZJ, HAE, PSL, CQM, CLX, BWI, UYF, QWC, EKB, LMM, UQI, GZA, KRC, GFB, DWM, ETA, SRS, VEP, ZTS, TNE, FJF, LNV, QBY, ZIO, HBS, IIW, SNO, MMO, BTY, OGJ, OUW, CLW, OZT, MXB, HNK, FQC, VEI, BLD, LUP, PHR, JUQ, MZM, GIL, EVE, UAH, SHV, WYS, MAG, XBX, ZYB, MUX, MUO, DAM, DVR, RDF, LGB, KGS, DWP, ZAG, SDF, BSF, CTX, MKG, YTO, RRX, OVJ, MEZ, ODU, JGU, GQB, SLW, UCQ, GDI, DIO, BKV, UUQ, JES, TAZ, AAU]
samples.services.SimpleStockQuoteService :: Full quote for : IBM

ESB Profile logs:

```
INFO - LogMediator Messaging_Channel = MARKET_ACTIVITY

INFO - LogMediator Messaging_Channel = FULL_QUOTE
```
