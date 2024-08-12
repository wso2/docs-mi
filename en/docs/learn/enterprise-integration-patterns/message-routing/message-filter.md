# Message Filter

This section explains, through a sample scenario, how the Message Filter EIP can be implemented using WSO2 ESB.

## Introduction to Message Filter

The Message Filter EIP checks an incoming message against a certain criteria that the message should adhere to. If the criteria is not met, the filter will discard the message. Otherwise, it will route the message to the output channel. 

!!! info
    For more information, see the [Message Filter](http://www.eaipatterns.com/Filter.html) documentation.

## Sample scenario

The sample scenario depicts an inventory for stocks where an incoming request will be filtered based on its content. If the content meets the criteria, the message filter will allow the request to proceed. Otherwise, the message will be dropped.

The diagram below depicts how to simulate the sample scenario using WSO2 ESB.

### Scenario 1: content meeting the filter criteria

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-filter-eip.png" style="width: 70%;" alt="Message filter EIP">

### Scenario 2: content not meeting the filter criteria

<img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/message-filter.png" style="width: 70%;" alt="Message filter">

Before digging into implementation details, let's take a look at the co-relation of the sample scenario and the Message Filter EIP by comparing their core components.

| Message Filter EIP (Figure 1) | Message Filter Sample Scenario (Figure 2)                             | 
|-------------------------------|-----------------------------------------------------------------------|
| Quote                         | Stock Quote Request                                                   | 
| Message Filter                | Filter Mediator is used to filter the content of the incoming message | 

### Environment setup

1. Download and install WSO2 ESB from http://wso2.com/products/enterprise-service-bus. For a list of prerequisites and step-by-step installation instructions, see Installation Guide in the WSO2 ESB documentation.

2. Start a sample Axis2 server instance on port 9000. For instructions, see Setting up the ESB Samples - Starting the Axis2 server in the WSO2 ESB documentation.

## ESB configuration

Start the ESB server and log into its management console UI (`https://localhost:9443/carbon`). In the management console, navigate to the Main menu and click Source View in the Service Bus section. Next, copy and paste the following configuration, which helps you explore the sample scenario, to the source view.

```
<!-- The example use of Mesage Filtering -->
<definitions xmlns="http://ws.apache.org/ns/synapse">
    <proxy name="MessageFilterProxy">
        <target>
            <inSequence>
        <filter xmlns:m0="http://services.samples" source="//m0:getQuote/m0:request/m0:symbol" regex="foo">
              <then>
              <send>
                <endpoint>
                    <address uri="http://localhost:9000/services/SimpleStockQuoteService?wsdl"/>
                </endpoint>
              </send>
              </then>
              <else>
              <drop/>
              </else>
        </filter>
        </inSequence>
            <outSequence>
                <send/>
            </outSequence>
        </target>          
    </proxy>
</definitions>
```

## Set up the sample scenario

1. Send a request using the Stock Quote client to WSO2 ESB in the following manner. For information about the Stock Quote client, see Sample Clients in the WSO2 ESB Documentation.

    ```
    ant stockquote -Dtrpurl=http://localhost:8280/services/MessageFilterProxy -Dsymbol=foo
    ```

2. After executing the above command through the client, observe that the request is transferred to the foo inventory service and a response is received. If the -Dsymbol parameter was changed to another value, there will be no response.

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

- Proxy Service  - The proxy service takes requests and forwards them to appropriate the back-end service, abstracting the routing logic from the client. Regardless of the request, the client sends it to the exposed service and not to the back-end services.

- inSequence   - When the service is invoked through the client, the message will be processed by the inSequence and sent as per the routing logic.

- filter   - Filters incoming messages, dropping any that do not meet the criteria.

- send  - When a matching case is found, the send mediator will route the message to the endpoint specified in address URI.

- outSequence  - The response from the endpoint is processed by the outSequence. The message will be transferred back to the sender.
