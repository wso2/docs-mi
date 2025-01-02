# How to Route Messages to a Static List of Recipients
This example demonstrates how messages can be routed to a list of static endpoints. This configuration routes a cloned copy of a message to each recipient defined within the static recipient list. The Micro Integrator will create cloned copies of the message and route to the endpoints mentioned in the configuration.

## Synapse configuration
Following are the synapse configurations that we can use to implement this scenario. 

!!! Note
    Add the endpoints of your backend services replacing the placeholders and if there are more or less endpoints they also can be added or removed accordingly. The payload also can be updated based on the requirement.

=== "API"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/callEndpoint" name="callEndpoint" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/">
            <inSequence>
                <property name="REST_URL_POSTFIX" scope="axis2" action="remove"/>
                <payloadFactory media-type="json" template-type="default">
                    <format>{"payload": "sample"}</format>
                    <args></args>
                </payloadFactory>
                <sequence key="EndpointCaller"/>
                <respond/>
            </inSequence>
            <faultSequence>
                <sequence key="ErrorHandler"/>
            </faultSequence>
        </resource>
    </api>
    ```

=== "Recipient List Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="RecipientListEndpoint" xmlns="http://ws.apache.org/ns/synapse">
        <recipientlist>
            <endpoint>
                <http method="post" uri-template="<ENDPOINT_URL_01>"/>
            </endpoint>
            <endpoint>
                <http method="post" uri-template="<ENDPOINT_URL_02>"/>
            </endpoint>
            <endpoint>
                <http method="post" uri-template="<ENDPOINT_URL_03>"/>
            </endpoint>
        </recipientlist>
    </endpoint>
    ```

=== "Endpoint Calling Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="EndpointCaller" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <call>
            <endpoint key="RecipientListEndpoint"/>
        </call>
        <aggregate>
            <onComplete expression="json-eval($)">
                <log level="full"/>
            </onComplete>
        </aggregate>
    </sequence>
    ```

=== "Error Handling Sequence"    
    ```xml
    <sequence name="ErrorHandler" xmlns="http://ws.apache.org/ns/synapse">
        <makefault response="true" version="soap12">
            <code xmlns:soap12Env="http://www.w3.org/2003/05/soap-envelope" value="soap12Env:Receiver"/>
            <reason value="Couldn't send the request to the server"/>
        </makefault>
        <respond/>
    </sequence>
    ```

## Testing the scenario

Open a terminal and execute the following curl to invoke the API.
    ```bash
    curl --location http://localhost:8290/callEndpoint/
    ```

You will receive a response that aggregates the outputs from each endpoint, showing that the payload was cloned and sent to all the endpoints.

!!! Note
    The **Aggregate** mediator was used in the above configuration to aggregate the responses received from each endpoint.
