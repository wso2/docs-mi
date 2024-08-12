# Normalizer

This section explains, through an example scenario, how the Normalizer EIP can be implemented using WSO2 ESB.

## Introduction to Normalizer

The Normalizer EIP processes messages that are semantically equivalent but arrive in different formats. It routes each message type through a custom Message Translator so that the resulting messages match a common format. 

!!! info
    For more information, see the [Normalizer](http://www.eaipatterns.com/Normalizer.html) documentation.

![Normalizer]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/normalizer-detail.gif)

## Sample scenario

This example scenario demonstrates how WSO2 ESB handles messages it receives in different formats using Message Builders and Message Formatters. The client application and back-end service do not have to be concerned about message formats, because the ESB processes them and sends the responses back in the same format.

The diagram below depicts how to simulate the example scenario using WSO2 ESB.

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-transformation/normalizer.png" style="width: 70%;" alt="Normalizer">

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Normalizer EIP by comparing their core components.

| Normalizer EIP (Figure 1) | Normalizer Sample Scenario (Figure 2)                                                                                  |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| Different Message Formats | SOAP, POX, or JSON Stock Quote Request                                                                                 |
| Router                    | Filter Mediator routes messages based on an existing XPath expression, which identifies what format the message is in. |
| Translators               | XSLT Mediator                                                                                                          |
| Common Format Message     | SOAP Request from WSO2 ESB                                                                                             |

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start the sample Axis2 server. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (https: //localhost:9443/carbon ). In the management console,  navigate to the Main menu and click Source View in the Service Bus section . Next, copy and paste the following configuration, which helps you explore the example scenario, to the source view.

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <!-- The proxy service to receive all kinds of messages -->
   <proxy name="ServiceProxy"   transports="https http"  startOnLoad="true" trace="disable">
      <description/>
      <target>
        <inSequence>
            <log level="full"/>
            <!-- Filters incoming JSON messages -->
            <filter xmlns:m0="http://services.samples" xpath="//m0:getQuote/m0:request/m0:symbol">
               <then>
                  <sequence key="sendSeq"/>
               </then>
               <else>
                  <sequence key="jsonInTransformSeq"/>
               </else>
            </filter>
         </inSequence>
         <outSequence>
            <!-- Filters outgoing JSON messages -->
            <filter source="get-property('TRANSFORMATION')" regex="JSONtoSOAP">
               <then>
                  <property name="messageType"  value="application/json"  scope="axis2" type="STRING"/>
               </then>
            </filter>
            <log level="full"/>
            <send/>
         </outSequence>
      </target>
   </proxy>
   <localEntry key="in_transform">
      <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                      xmlns:fn="http://www.w3.org/2005/02/xpath-functions"
                      xmlns:m0="http://services.samples"
                      version="2.0"
                      exclude-result-prefixes="m0 fn">
         <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
         <xsl:template match="*">
            <xsl:element name="{local-name()}" namespace="http://services.samples">
               <xsl:copy-of select="attribute::*"/>
               <xsl:apply-templates/>
            </xsl:element>
         </xsl:template>
      </xsl:stylesheet>
   </localEntry>
    <!-- Transform a JSON message -->
   <sequence name="jsonInTransformSeq">
      <xslt key="in_transform"/>
      <property name="TRANSFORMATION"   value="JSONtoSOAP"  scope="default"  type="STRING"/>
      <enrich>
          <source clone="true" xmlns:m0="http://services.samples" xmlns:ns="http://org.apache.synapse/xsd" xpath="//m0:getQuote"/>
          <target type="body"/>
      </enrich>
      <header name="Action" scope="default" value="urn:getQuote"/>
      <sequence key="sendSeq"/>
   </sequence>
   <!-- Normal flow of messages -->
   <sequence name="sendSeq">
      <send>
         <endpoint>
            <address uri="http://localhost:9000/services/SimpleStockQuoteService"  format="soap11"/>
         </endpoint>
      </send>
   </sequence>
   <sequence name="fault">
      <log level="full">
         <property name="MESSAGE" value="Executing default 'fault' sequence"/>
         <property xmlns:ns="http://org.apache.synapse/xsd"  name="ERROR_CODE"   expression="get-property('ERROR_CODE')"/>
         <property xmlns:ns="http://org.apache.synapse/xsd"  name="ERROR_MESSAGE"  expression="get-property('ERROR_MESSAGE')"/>
      </log>
      <drop/>
   </sequence>
   <sequence name="main">
      <log/>
      <drop/>
   </sequence>
</definitions>
```

The configuration above first filters out the JSON messages to do the necessary transformation, since the back-end service understands only SOAP messages. JSON messages are also filtered in the out sequence. Most of these transformations are done at the code level.

## Set up the sample scenario

You can test this configuration for JSON, SOAP, and POX messages using the sample Axis2 client that comes with WSO2 ESB. You can find examples below.

- For SOAP: `ant stockquote -Dtrpurl=http://localhost:8280/services/ServiceProxy`
- For POX: `ant stockquote -Dtrpurl=http://localhost:8280/services/ServiceProxy`
    Note that the XML message has the exact format the service wants. Otherwise, you should use the Payload Factory Mediator to create the required messages from the incoming message.
- For JSON: `ant jsonclient -Daddurl=http://localhost:8280/services/ServiceProxy`

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- **filter** [line 9 in ESB config] - The Filter mediator looks for a particular XPath expression inside the request message. If the expression evaluates successfully, it is assumed to be a SOAP or POX message, and the mediation continues through the sequence sendSeq. If the expression does not evaluate, it is assumed to be a JSON message, and the mediation continues via the jsonInTransformSeq sequence.
- **localEntry** [line 30 in ESB config] - The local entry holds an XSL transformation that converts JSON requests to XML.
- **xslt** [line 47 in ESB config] - The XSLT mediator applies the defined XSLT to the payload.
- **address** [line 55 in ESB config] - The address element of the endpoint defines the back-end service and the message format that back-end service prefers. This format is used to normalize a message further, but only when there can be a 1-to-1 mapping between two different formats, for example, between SOAP 1.1 and SOAP 1.2. 
