# Content Enricher

This section explains, through an example scenario, how the Content Enricher EIP can be implemented using the ESB profile of WSO2 EI. 

## Introduction to Content Enricher

The Content Enricher EIP facilitates communication with another system if the message originator does not have all the required data items available. It accesses an external data source to augment a message with missing information. 

!!! info
    For more information, see the [Content Enricher](http://www.eaipatterns.com/DataEnricher.html) documentation.

![Data enricher]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/data-enricher.gif)

## Sample scenario

This example scenario depicts a stock quote service. The client sends a stock quote request to the ESB with only an identity number. But in order to provide a stock quote, the sample Axis2 server at the back-end needs to map the identity number with a corresponding name, which is in an external source. The values are stored in the registry as a local entry. When the request arrives, the identity will be analyzed using the Switch mediator. Sequentially, the identity number will be replaced with the local entry using the Enrich mediator.

The diagram below depicts how to simulate the example scenario using the ESB profile of WSO2 EI.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/content-enricher.png" style="width: 70%;" alt="Content enricher">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Content Enricher EIP by comparing their core components.

| Content Enricher EIP (Figure 1) | Content Enricher Sample Scenario (Figure 2)                  |
|---------------------------------|--------------------------------------------------------------|
| Basic Message                   | Stock Quote Request from Stock Quote Client                  |
| Enricher                        | Enrich Mediator                                              |
| Resource	                       | Local Registry                                               |
| Enriched Message                | Enriched Stock Quote Request from the ESB profile of WSO2 EI |

### Environment setup

1. Download and install WSO2 Enterprise Integrator. For a list of prerequisites and step-by-step installation instructions, see the the ESB profile of WSO2 EI Installation Guide.

2. Start two Sample Axis2 server instances on ports 9000 and 9002. For instructions, see Setting Up the Service Bus Samples - Starting the Axis2 server.

## Service bus configuration

Start the Integration Profile of the ESB profile of WSO2 EI and log into its management console UI (https: //localhost:9443/carbon). In the management console, navigate to the Main menu and click Source View in the Service Bus section . Next, copy and paste the following configuration, which helps you explore the example scenario, to the source view.  

```
<!-- Content Enricher -->
<definitions xmlns="http://ws.apache.org/ns/synapse">
     <proxy name="ContentEnrichProxy">
        <target>   
        <inSequence>
            <!-- Would Enrich the Value Based On the Number -->
                  <switch source="//m1:symbol" xmlns:m0="http://services.samples" xmlns:m1="http://services.samples/xsd">
                <case regex="1">
                     <log level="full" />
                      <enrich>
                        <source type="inline" key="Location1"/>
                        <target xmlns:m1="http://services.samples/xsd" xpath="//m1:symbol/text()"/>
                                   </enrich>
                 </case>
                 <case regex="2">
                     <enrich>
                        <source type="inline" key="Location2"/>
                        <target xmlns:m1="http://services.samples/xsd" xpath="//m1:symbol/text()"/>
                                   </enrich>
                 </case>
                </switch>
                  <!--Will Send the Enriched Message -->
                  <send>
                    <endpoint>
                       <address uri="http://localhost:9000/services/SimpleStockQuoteService" />
                    </endpoint>
                  </send>
                <!--  <drop />    -->                  
        </inSequence>
        <outSequence>
                <send />
        </outSequence>   
      </target>
    <publishWSDL uri="file:samples/service-bus/resources/proxy/sample_proxy_1.wsdl"/>
    </proxy>
    <localEntry key="Location1">IBM</localEntry>
    <localEntry key="Location2">WSO2</localEntry>   
</definitions>
```

## Set up the sample scenario

Send the following request to the ESB profile of WSO2 EI using a SOAP client like [SoapUI](https://www.soapui.org/). 

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:getQuote>
         <!--Optional:-->
         <ser:request>
            <!--Optional:-->
            <xsd:symbol>2</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soapenv:Body>
</soapenv:Envelope>
```

Note that the Axis2 server log displays that the request is processed.

### How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration shown above.

- enrich [line 10 in config] - Mediator used for message enrichment.
- source [line 11 in config] - The location in which you can find the source configuration. In this example, it is a simple inline text string located in the local registry entry with key Location1.
- target  [line 12 in config] - The location where the source configuration should be applied. This is specified using an XPath expression.
- localEntry [lines 36 and 37 in config] - Entries from the local registry. 
