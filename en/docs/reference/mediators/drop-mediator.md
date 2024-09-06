# Drop Mediator

The **Drop Mediator** stops the processing of the current message. This mediator is useful for ensuring that the message is sent only once and then dropped by the Micro Integrator. If you have any mediators defined after the `<drop/>` element, they will not be executed, because `<drop/>` is considered to be the end of the message flow.

!!! Info
    The Drop mediator is a [content-unaware]({{base_path}}/reference/mediators/about-mediators/#classification-of-mediators) mediator.

## Syntax

The drop token refers to a `<drop/>` element, which is used to stop further processing of a message:

```xml
<drop/>
```

## Example

You can use the drop mediator for messages that do not meet the filter criteria in case the client is waiting for a response to ensure the message was received by the Micro Integrator. For example:

=== "Proxy Service"
    ```xml
    <proxy name="SimpleProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <!-- filtering of messages with XPath and regex matches -->
                <filter regex="/StockQuote.*" source="get-property('To')">
                    <then>
                        <call>
                            <endpoint key="SimpleStockEp"/>
                        </call>
                    </then>
                    <else>
                        <drop/>
                    </else>
                </filter>
    ...
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService">
            <suspendOnFailure>
                <initialDuration>-1</initialDuration>
                <progressionFactor>1</progressionFactor>
            </suspendOnFailure>
            <markForSuspension>
                <retriesBeforeSuspension>0</retriesBeforeSuspension>
            </markForSuspension>
        </address>
    </endpoint>
    ```

In this scenario, if the message doesn't meet the filter condition, it is dropped, and the HTTP 202 Accepted response is sent to the client. If you did not include the drop mediator, the client would not receive any response.
