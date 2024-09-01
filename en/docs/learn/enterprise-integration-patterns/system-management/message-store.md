# Message Store

This section explains, through a sample scenario, how the Message Store EIP can be implemented using WSO2 ESB.

## Introduction to Message Store

The Message Store EIP reports against message information without disturbing the loosely coupled and transient nature of a messaging system. It stores a duplicate of a message between each flow and captures the message information in a central location. 

!!! info
    For more information, see the [Message Store](http://www.eaipatterns.com/MessageStore.html) documentation.

![Message Store]({{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/message-store.gif)

## Sample scenario

This sample scenario is a stock quote service and demonstrates how Message Stores can be used to store the state of a message between each mediation cycle. We send several stock quote requests to the ESB using a sample client, and then use the ESB management console UI to check how those messages were stored when the request was sent and a reply has arrived.

The diagram below depicts how to simulate the sample scenario using the WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/message-store.png" style="width: 70%;" alt="Claim Check">

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Message Store EIP by comparing their core components.

| Message Store EIP (Figure 1) | Message Store Sample Scenario (Figure 2) |
|------------------------------|------------------------------------------|
| Message Store                | WSO2 ESB Message Store                   |

## Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Getting Started in the WSO2 ESB documentation.

2. Start the sample Axis2 server. For instructions, refer to the section ESB Samples Setup - Starting Sample Back-End Services in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```xml
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <localEntry key="Location">foo</localEntry>
   <sequence name="fault">
      <log level="full">
         <property name="MESSAGE" value="Executing default &#34;fault&#34; sequence"/>
         <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
         <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
      </log>
      <drop/>
   </sequence>
   <sequence name="main">
      <in>
         <enrich>
            <source type="inline" clone="true" key="Location"/>
            <target xmlns:m1="http://services.samples/xsd" xpath="//m1:symbol/text()"/>
         </enrich>
         <store messageStore="CentralStorage"/>
         <send>
            <endpoint>
               <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
            </endpoint>
         </send>
      </in>
      <out>
         <store messageStore="CentralStorage"/>
         <send/>
      </out>
   </sequence>
   <messageStore name="CentralStorage"/>
</definitions>
```

## Set up the sample scenario

1. Send the following request to the server several times using a SOAP client like SoapUI. 

    ```xml
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <ser:getQuote>
             <!--Optional:-->
             <ser:request>
                <!--Optional:-->
                <xsd:symbol>A</xsd:symbol>
             </ser:request>
          </ser:getQuote>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

2. In the ESB management console, click the Main menu and select Message Stores sub menu under the Service Bus menu. The messages you sent will be available under message stores. You can explore their content as follows.

    **Message 1**
    
    <img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/message-1.png" style="width: 70%;" alt="Message 1">
    
    **Message 2**
    
    <img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/system-management/message-2.png" style="width: 70%;" alt="Message 2">
    
### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below refer to the ESB configuration shown above.

- **localEntry** [line 2 in ESB config] - Specifies the local entry that has the key Location and value foo.
- **sequence** [line 11 in ESB config] - This is the main sequence invoked when a request is sent to the ESB. It has an in mediator, which defines the mediation to perform when a request is received, and an out mediator, which defines the mediation to perform when a response is received from a back-end service.
- **enrich** [line 13 in ESB config] - The Enrich mediator applies what is in its source element to what is in its target specified as an XPath expression. In this example, it applies the plain text value inside the localEntry with key Location as a text value into the symbol element in the SOAP body.
- **store** [line 17 in ESB] - The Store mediator stores the message inside the CentralStorage message store.
- **send** [line 18 in ESB config] - The message is then sent to the specified endpoint.
- **store** [line 25 in ESB config] - This store mediator is in the out sequence. It stores the message received as a response from the back-end service inside the CentralStorage message store.
- **messageStore** [line 29 in ESB config] - Defines a new message store with the name CentralStorage. 
