# Error codes in Micro Integrator

This section describes error codes and their meanings.

## Transport Error Codes

| **Error Code** | **Detail**                                                                                            |
|----------------|-------------------------------------------------------------------------------------------------------|
| 101000         | Receiver input/output error sending                                                                   |
| 101001         | Receiver input/output error receiving                                                                 |
| 101500         | Sender input/output error sending                                                                     |
| 101501         | Sender input/output error receiving                                                                   |
| 101503         | Connection failed                                                                                     |
| 101504         | Connection timed out (no input was detected on this connection over the maximum period of inactivity) |
| 101505         | Connection closed                                                                                     |
| 101506         | NHTTP protocol violation                                                                              |
| 101507         | Connection canceled                                                                                   |
| 101508         | Request to establish new connection timed out                                                         |
| 101509         | Send abort                                                                                            |
| 101510         | Response processing failed                                                                            |

If the HTTP PassThrough transport is used, and a connection-level error
occurs, the error code is calculated using the following equation:

``` java
Error code = Base error code + Protocol State
```

The sender side of the transport matches the protocol state, which
changes according to the phase of the message.

Following are the possible protocol states and the description for each:

| Protocol State     | Description                                                |
|--------------------|------------------------------------------------------------|
| REQUEST_READY (0) | Connection is at the initial stage ready to send a request |
| REQUEST_HEAD(1)   | Sending the request headers through the connection         |
| REQUEST_BODY(2)   | Sending the request body                                   |
| REQUEST_DONE(3)   | Request is completely sent                                 |
| RESPONSE_HEAD(4)  | The connection is reading the response headers             |
| RESPONSE_BODY(5)  | The connection is reading the response body                |
| RESPONSE_DONE(6)  | The response is completed                                  |
| CLOSING(7)         | The connection is closing                                  |
| CLOSED(8)          | The connection is closed                                   |

Since there are several possible protocol states in which a request can
time out, you can calculate the error code accordingly using the values
in the table above. For example, in a scenario where you send a request
and the request is completely sent to the backend, but a timeout happens
before the response headers are received, the error code is calculated
as follows:

In this scenario, the base error code is
`         CONNECTION_TIMEOUT(101504)        ` and the protocol state is
`         REQUEST_DONE(3).        `

Therefore, Error code = 101504 + 3 = 101507

## Endpoint Error Codes

This section describes the error codes for endpoint failures. For more information on handling endpoint errors, see [Endpoint Error Handling]({{base_path}}/reference/synapse-properties/endpoint-properties/#endpoint-error-handling-properties).

### General errors

| **Error Code** | **Detail**                                    |
|----------------|-----------------------------------------------|
| 303000         | <ul><li>Load Balance endpoint is not ready to connect</li><li>Recipient List Endpoint is not ready</li><li>Failover endpoint is not ready to connect</li></ul> |
| 303001         | Address Endpoint is not ready to connect      |
| 303002         | WSDL Address is not ready to connect          |

### Failure on endpoint in the session

| **Error Code** | **Detail**                                                    |
|----------------|---------------------------------------------------------------|
| 309001         | Session aware load balance endpoint, No ready child endpoints |
| 309002         | Session aware load balance endpoint, Invalid reference        |
| 309003         | Session aware load balance endpoint, Failed session           |

### Non-fatal warnings

| **Error Code** | **Detail**                                     |
|----------------|------------------------------------------------|
| 303100         | A failover occurred in a Load balance endpoint |
| 304100         | A failover occurred in a Failover endpoint     |

### Referring real endpoint is null

| **Error Code** | **Detail**                  |
|----------------|-----------------------------|
| 305100         | Indirect endpoint not ready |

### Callout operation failed

| **Error Code** |   **Detail**                                                                     |
|----------------|-------------------------------------------------------------------------------------------------|
| 401000         | Callout operation failed (from the Callout mediator)                                            |
| 401001         | Blocking call operation failed (from the Call mediator when you have enabled blocking in it).   |
| 401002         | Blocking sender operation failed (from the Call mediator when you have enabled blocking in it). |

### XML / JSON parsing errors

| **Error Code** | **Detail**                   |
|----------------|------------------------------|
| 601000         | Malform XML or JSON received |

## Custom error codes

| **Error Code** |   **Detail**                                                                                    |
|----------------|-------------------------------------------------------------------------------------------------|
| 500000         | Endpoint Custom Error - This error is triggered when the endpoint is prefixed by `<property>name="FORCE_ERROR_ON_SOAP_FAULT" value="true"/>`, which enhances the failover logic by marking an endpoint as suspended when the response is a SOAP fault. |

## Data service error codes

<table>
    <tr>
        <th>Error Code</th>
        <th>Detail</th>
    </tr>
    <tr>
        <td><code>DATABASE_ERROR</code></td>
        <td>This exception is thrown at the point of invoking a request if there are errors occurring while querying the database or while processing the result of a query. For example, a syntax error thrown from the database, a primary key constraint violation, etc.</td>
    </tr>
    <tr>
        <td><code>CONNECTION_UNAVAILABLE_ERROR</code></td>
        <td>This error occurs at the point of <a href="{{base_path}}/develop/creating-artifacts/data-services/creating-data-services">creating a data service</a> if the connection to the datasource cannot be established.</td>
    </tr>
    <tr>
        <td><code>VALIDATION_ERROR</code></td>
        <td>This error occurs when an input parameter in the request for a query fails the <a href="{{base_path}}/reference/synapse-properties/data-services/input-validators">validation</a> defined for that parameter. See the <a href="{{base_path}}/learn/examples/data-integration/data-input-validator">example on validators</a> to understand how validations work.</td>
    </tr>
    <tr>
        <td><code>INCOMPATIBLE_PARAMETERS_ERROR</code></td>
        <td>This error occurs in the following instances:
        <ul>
            <li>When a request is invoked, the number of parameters passed in the request should match the number of input parameters defined in the query. Otherwise, there need to be <a href="{{base_path}}/reference/synapse-properties/data-services/query-parameters/#input-parameters">default values</a> specified in the corresponding query for the parameters that are not passed in the request. If either of these requirements is not fulfilled, this error will occur when invoking the request.</li>
            <li>When a request is invoked, the list of parameters given for the operation defined in your data service should match the input parameters given in the corresponding query definition. If there is a mismatch, this error will occur.</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td><code>UNKNOWN_ERROR</code></td>
        <td>For all other types of errors.</td>
    </tr>
</table>

!!! Note
    When logging the errors by default it prints the service name, operation or resource, parameters, error code, and the exception. You can use the following system property to avoid printing request parameters in the logs.
    
    `-Ddss.disable.current.params=true`