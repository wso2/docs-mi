# Content-Based Router

This section explains, through a sample scenario, how the Content-Based Router EIP can be implemented using the EBS profile of WSO2 EI.

## Introduction to Content-Based Router

The Content-Based Router (CBR) reads the content of a message and routes it to a specific recipient based on its content. This approach is useful when an implementation of a specific logical function is distributed across multiple physical systems.

The following diagram depicts the Content-Based Router's behavior where the router performs a logical function (e.g., inventory check). It receives a request message (new order), reads it, and routes the request to one of the two recipients according to the message's content. 

!!! info

    For more information on the Content-Based Router, see the [Content-Based Router](http://www.eaipatterns.com/ContentBasedRouter.html) documentation.

![Content-Based Router]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/content-based-router.png)

## Sample scenario

The sample scenario depicts an inventory for stocks and illustrates how the Content-Based Router routes a message based on the message content. When the router receives a stock request, it reads the content of the request. If the request is made for foo, the request is routed to the foo stock inventory service. If the request is for bar, it is routed to the bar stock inventory service.

The diagram below depicts how to simulate the sample scenario using the EBS profile.

![Content-Based Router sample scenario]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/content-based router-sample-scenario.png)

Before digging into implementation details, let's take a look at the relationship between the sample scenario and the Content-Based Router EIP by comparing their core components.

| Content-Based Router EIP (Figure 1) | Content-Based Router Sample Scenario (Figure 2)                                                                                                                                                                                                                                                                                   |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Widget and Gadget Inventory         | foo Inventory Service and bar Inventory service act as two separate services in the sample scenario.                                                                                                                                                                                                                              |
| Router                              | Message routing is simulated by the Switch and Send mediators of the EBS profile. The Switch Mediator acts as the router and observes the content of the message, while the Send Mediator is used to send the message to a selected recipient. Each case defined should decide on routing the message to the appropriate service. |
| New Order                           | Stock Quote Request                                                                                                                                                                                                                                                                                                               |

### Environment set up

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, refer to Installation Guide in the WSO2 ESB documentation.

2. Start two Sample Axis2 server instances on ports 9001 and 9002. For instructions, refer to the section Setting Up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```
<!-- The example use of content based routing -->
<definitions xmlns="http://ws.apache.org/ns/synapse">
    <!-- The service which the sender will be invoking -->
    <proxy name="ContentBasedRoutingProxy">
        <target>
           <!-- When a request arrives the following sequence will be followed -->   
           <inSequence>
             <!-- The content of the incoming message will be isolated -->
             <switch source="//m0:getQuote/m0:request/m0:symbol" xmlns:m0="http://services.samples">
                    <!-- The isolated content will be filtered -->
                    <case regex="foo">
                        <!-- Will Route the content to the appropriate destination -->  
                        <send>
                             <endpoint>
                                 <address uri="http://localhost:9001/services/SimpleStockQuoteService?wsdl"/>
                             </endpoint>
                        </send>
                    </case>
                    <case regex="bar">
                        <send>
                            <endpoint>
                                <address uri="http://localhost:9002/services/SimpleStockQuoteService?wsdl"/>
                            </endpoint>
                        </send>
                    </case>
                    <default>
                     <!-- it is possible to assign the result of an XPath expression as well -->
                    <property name="symbol" expression="fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)" xmlns:m0="http://services.samples"/>
                    </default>
            </switch>      
            </inSequence>
            <outSequence>
                <send/>
            </outSequence>
        </target>     
    </proxy>
</definitions>
```

## Set up the sample scenario

1. Send a request using the Stock Quote client to WSO2 ESB in the following manner. For information about the Stock Quote client, refer to the section Sample Clients in the WSO2 ESB documentation.

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/services/ContentBasedRoutingProxy -Dsymbol=foo
    ```
    
    !!! note
        - When you send the request with -Dsymbol=foo, you view the following output printed in the Axis2 server console started in port 9000.
        
        ```
        samples.services.SimpleStockQuoteService :: Generating quote for : foo
        ```
        
        - When you send the request with -Dsymbol=bar, you view the following output printed in the Axis2 server console started in port 9001.
        
        ```
        samples.services.SimpleStockQuoteService :: Generating quote for : foo
        ```

2. After executing the above command through the client, observe that the request is transferred to the foo inventory service. If the -Dsymbol parameter is changed to bar, the request will be transferred to the bar inventory service.

    The structure of the request is as follows:
 
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <ser:getQuote>
             <!--Optional:-->
             <ser:request>
                <!--Optional:-->
                <ser:symbol>foo</ser:symbol>
             </ser:request>
          </ser:getQuote>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

### How the implementation works

Let's investigate the elements of the ESB configuration in detail. The line numbers below are mapped with the ESB configuration shown above.

- Proxy Service [line 4 of ESB config] - The proxy service takes requests and forwards them to appropriate the back-end service, abstracting the routing logic from the client. Regardless of the request, the client sends it to the exposed service and not to the back-end services.
- inSequence [line 7 of ESB config] - When the service is invoked through the client, the message will be received by the inSequence and sent as per the routing logic.
- switch [line 9 of ESB config] - Observes the message and filters out the message content as per the XPath expression.
- case [line 11 and 19 of ESB config] - The filtered content will match the specified regular expression.
- send [line 13, 20, and 34 of ESB config] - When a matching case is found, the send mediator will route the message to the endpoint specified in the address URI.
- default [line 26 of ESB config] - If a matching condition is not found, the message will be diverted to the default case.
- outSequence [line 33 of ESB config] - The response from an endpoint is received through the outSequence. The message will be transferred back to the sender.
