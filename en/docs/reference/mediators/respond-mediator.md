# Respond Mediator

The Respond mediator stops the processing of the current message and sends the message back to the client as a response.

## Syntax

```xml
<respond/>
```

## Example

Assume that you have a configuration that sends the request to the Stock Quote service and change the response value when the symbol is WSO2 or CRF. If the symbol does not meet that criteria, it sends the message back to the client without sending it to the Stock Quote service or performing any additional processing. To achieve this, you can add the respond mediator in the default case of the [switch mediator]({{base_path}}/reference/mediators/switch-mediator).

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/stock" name="StockAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST" uri-template="/">
            <inSequence>
                <switch source="//m0:getQuote/m0:request/m0:symbol" xmlns:m0="http://services.samples">
                    <case regex="WSO2">
                        <property name="symbol" scope="default" type="STRING" value="Great stock - WSO2"/>
                        <call>
                            <endpoint key="simplestock"/>
                        </call>
                    </case>
                    <case regex="CRF">
                        <property name="symbol" scope="default" type="STRING" value="Are you sure? - CRF"/>
                        <call>
                            <endpoint key="simplestock"/>
                        </call>
                    </case>
                    <default>
                        <property name="symbol" scope="default" type="STRING" expression="fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)" xmlns:m0="http://services.samples"/>
                    </default>
                </switch>
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="simplestock" xmlns="http://ws.apache.org/ns/synapse">
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

Similarly, if you want to temporarily change the configuration so that if the symbol is CRF, the WSO2 Micro Integrator sends the message back to the client without sending it to the Stock Quote service or performing any additional processing, you can add the respond mediator at the beginning of the CRF case. All the configuration after the respond mediator is ignored. As a result, the rest of the CRF case configuration is left intact, allowing you to revert to the original behavior in the future by removing the respond mediator if required. 