# ThrowError Mediator

The ThrowError mediator allows you to throw an error from the mediation sequence. The error type and message can be customized as required.

!!! Info 
    Errors thrown by the ThrowError mediator is handled by the onError sequence (if defined) or the default fault sequence.

## Syntax

``` java
<!-- Error message as string -->
<throwError type="string" errorMessage="string"></throwError>
<!-- Dynamic error message -->
<throwError type="string" errorMessage="{${expression}}"></throwError>
```

## Examples

The following examples demonstrate the use of the ThrowError mediator.


The following API configuration demonstrates how to use the ThrowError mediator to throw an error if a required field is not present in the incoming payload.

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
                    <throwError type="PAYLOAD_ERROR" errorMessage="{${vars.ERROR_MSG}}"/>
                </else>
            </filter>
        </inSequence>
        <faultSequence>
            <log level="custom">
                <property name="ERROR_CODE" expression="${properties.ERROR_CODE}"/>
                <property name="ERROR_MESSAGE" expression="${properties.ERROR_MESSAGE}"/>
            </log>
            <drop/>
        </faultSequence>
    </resource>
</api>
```

Invoking the above API with a payload that does not contain the required field will throw an error.
```
curl --location 'http://localhost:8290/testThrowError' \
--header 'Content-Type: application/json' \
--data '{
    "Hello": "World"
}'
```

The response log will contain the following error message:
```
INFO {LogMediator} - {api:TestThrowErrorMediatorAPI} ERROR_CODE = PAYLOAD_ERROR, ERROR_MESSAGE = Required field does not exist
```
