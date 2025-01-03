# ThrowError Mediator

The ThrowError mediator allows you to raise an error from the mediation sequence. The error type and message can be customized as required.

!!! Info 
    Errors thrown by the ThrowError mediator is handled by the onError sequence (if defined) or the default fault sequence.

## Syntax

``` java
<!-- Error message as string -->
<throw-error type="string" errorMessage="string"></throw-error>
<!-- Dynamic error message -->
<throw-error type="string" errorMessage="{string}"></throw-error>
```

## Examples

Following examples demonstrate the use of Throw Error mediator.

### Example 1

The following API configuration demonstrates how to use the Throw Error mediator to raise an error when some required field is not present in the incoming payload.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/testThrowError" name="TestThrowErrorMediatorAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST">
        <inSequence>
            <filter xpath="${exists(payload.required)}">
                <then>
                    <log level="full"/>
                    <respond/>
                </then>
                <else>
                    <variable name="ERROR_MSG" value="Required field does not exist"/>
                    <throwError type="PAYLOAD_ERROR" errorMessage="{${var.ERROR_MSG}}"/>
                </else>
            </filter>
        </inSequence>
        <faultSequence>
            <log level="custom">
                <property name="ERROR_CODE" expression="get-property('ERROR_CODE')"/>
                <property name="ERROR_MESSAGE" expression="get-property('ERROR_MESSAGE')"/>
            </log>
            <drop/>
        </faultSequence>
    </resource>
</api>
```

Invoking the above API with a payload that does not contain the required field will raise an error.
```
curl --location 'http://localhost:8290/testThrowError' \
--header 'Content-Type: application/json' \
--data '{
    "Hello": "World"
}'
```

Response log will contain the error message as follows.
```
INFO {LogMediator} - {api:TestThrowErrorMediatorAPI} ERROR_CODE = PAYLOAD_ERROR, ERROR_MESSAGE = Required field does not exist
```
