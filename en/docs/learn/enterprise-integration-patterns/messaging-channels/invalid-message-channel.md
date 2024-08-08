# Invalid Message Channel

This section explains, through an example scenario, how the Invalid Message Channel EIP can be implemented using the ESB profile of WSO2 EI. 

## Introduction to Invalid Message Channel

The Invalid Message Channel EIP pattern allows administrators to define an error indication that appears when an endpoint fails to process a request. For more information, go to Invalid Message Channel.

![Invalid message solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/invalid-message-solution.gif)

## Sample scenario

The example scenario creates a deliberate error situation to demonstrate how the ESB profile handles errors on message failures. It requires a live Axis2 server instance to successfully provide a response to the sender, and the server instance will be shut down before sending a request. You will observe how the ESB profile directs the process to the faultsequence mediator, which indicates the message invalidity to the user.

The diagram below depicts how to simulate the example scenario using the ESB profile.

![Invalid message channel]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/invalid-message-channel.png)

Before digging into implementation details, let's take a look at the relationship between the example scenario and the Invalid Message Channel EIP by comparing their core components.

| Invalid Message Channel EIP (Figure 1) | Invalid Message Channel Example Scenario (Figure 2) |
|----------------------------------------|-----------------------------------------------------|
| Sender                                 | Stock Quote Client                                  |
| Channel                                | Target Endpoint                                     |
| Receiver                               | Stock Quote Service Instance                        |
| Invalid Message Channel                | FaultSequence                                       |

### Environment setup

1. Download and install the ESB profile of WSO2 Enterprise Integrator (EI). For a list of prerequisites and step-by-step installation instructions, go to Installing the Product in WSO2 EI Documentation.

2. Start an instance of Sample Axis2 server. For instructions, go to Starting the Axis2 server in WSO2 EI Documentation.

3. Deploy the back-end service SimpleStockQuoteService. For instructions on deploying sample back-end services, go to Deploying sample back-end services in WSO2 EI Documentation.

### ESB configuration

Start the ESB profile and log into its Management Console. For instructions, see Starting the ESB profile in WSO2 EI Documentation.

On the Management Console, navigate to the Main Menu and click Source View in the Service Bus section. Copy and paste the following configuration to the source view. You can now explore the example scenario. 

```
<!-- Invalid Message Chanel Proxy-->
<definitions xmlns="http://ws.apache.org/ns/synapse">
   <proxy name="InvalidMessageChannelProxy">
        <target>
         <endpoint>
                   <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
        </endpoint>
        <inSequence>
              <log level="full" />        
        </inSequence>
        <outSequence>
                <log level="full" />
        </outSequence>
     <faultSequence>
          <log level="full">
                    <property name="MESSAGE" value="Failure Message..."/>
                    <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
                    <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
              </log>
         <drop />
       </faultSequence>
        </target>
    <publishWSDL uri="file:repository/samples/resources/proxy/sample_proxy_1.wsdl"/>
    </proxy>
</definitions>
```

When the server receives a request and the endpoint referred through the ESB profile is unavailable, the server triggers an error message. The ESB profile diverts the response to the invalid message channel. 

## Set up the sample scenario

Pass the following message to the ESB profile. You can use SoapUI or the ESB profile's Try It tool. To invoke the Try It tool, log into the Management Console of the ESB profile, navigate to the Services menu under the Main menu and select the List sub menu. Then select InvalidMessageChannelProxy and pass the following request to the ESB profile. 

<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
   <soap:Header/>
   <soap:Body>
      <ser:getQuote>
         <!--Optional:-->
         <ser:request>
            <!--Optional:-->
            <xsd:symbol>foo</xsd:symbol>
         </ser:request>
      </ser:getQuote>
   </soap:Body>
</soap:Envelope>

### How the implementation works

Let's investigate the elements of the configuration in detail. The line numbers below are mapped with the configuration shown above.

- Proxy Service [line 3 of config] - Defines the proxy service `InvalidMessageChannelProxy` with a target endpoint to the back end service.
- faultSequence [line 14 of config] - Defines a fault sequence to execute in the event of a fault. It acts as the Invalid Message Channel for this EIP. In this example configuration, we log the fault as an error, but you can place any of the usual mediators inside this sequence. For example, you could pass the invalid message to another service or back to the client.  
