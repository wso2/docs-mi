# Message Bus

This section explains how the Message Bus EIP can be implemented using the ESB profile of WSO2 EI. The following topics are covered:

* Introduction to Message Bus
* How the ESB profile implements the EIP

## Introduction to Message Bus

The Message Bus EIP enables separate applications to work together in a decoupled manner so that applications can be easily added or removed without affecting each other. This approach makes maintenance and testing smoother, since editing or removing an application will not affect the functionality of any other application. For more information, refer to http://www.eaipatterns.com/MessageBus.html.

![Message bus solution]({{base_path}}/assets/img/learn/enterprise-integration-patterns/messaging-channels/message-bus-solution.gif)

### How the ESB profile implements the EIP

The architecture of the ESB profile is discussed in Introducing the Enterprise Integrator in the WSO2 EI documentation. It illustrates how application logic is layered, and how each component of the application logic is separated as a mediator, allowing message processing to be executed in a decoupled manner. The mediation process is explained in the Mediating Messages section of the WSO2 EI documentation.

A sample ESB profile configuration is illustrated below:  

```
<definitions xmlns="http://ws.apache.org/ns/synapse">
    <!-- filtering of messages with XPath and regex matches -->
    <filter source="get-property('To')" regex=".*/StockQuote.*">
        <send>
            <endpoint>
                <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
            </endpoint>
        </send>
        <drop/>
    </filter>
    <send/>
</definitions>
```

According to the configuration above, the ESB profile routes an incoming message to a back-end server if the conditions in the filter section are met. Notice how the application's logic is decoupled. It uses one component for filtering, and another to send a message to the endpoint. If you were to decide to remove the filtering step, you could remove the filter mediator segment from the XML without affecting the application's logic for sending the message to the back-end server.
