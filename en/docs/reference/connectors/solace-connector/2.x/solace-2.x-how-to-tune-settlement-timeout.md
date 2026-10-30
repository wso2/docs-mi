# Tune the settlement timeout through deployment.toml

At the end of this guide the time a sequence has to settle a message is set once for the whole server, with a per endpoint override where one flow needs more.

## Steps

1. Work out the value. The settlement timeout must exceed the longest timeout in the sequence plus the 15 second sweep of the timeout handler, so that the fault sequence decides before the inbound endpoint does. With an HTTP endpoint timeout of 120 seconds the value is above 135 seconds, for example the 150 seconds below. On a default server the passthrough socket timeout is 180 seconds, so a sequence whose backend can hang sets the HTTP endpoint's timeout below 165 seconds, or raises this value above 180.
2. Set the server wide value in deployment.toml and restart.

    ```toml
    [messaging_callback]
    solace_inbound_settlement_timeout_ms = 150000
    ```

3. For one endpoint that needs more, set the parameter on that endpoint. The parameter wins over the deployment.toml key, and the shipped default of 180000 applies when neither is set.

    ```xml
    <parameter name="solace.settlementTimeout">300000</parameter>
    ```

## Verify

Deploy a sequence that never settles, a Log mediator only, on an endpoint with autoAck false, with a fault sequence that does not settle either. The deploy time WARN says that no settlement operation was found in the sequence, its fault sequence or the sequences they reference. A fault sequence that nacks counts as a settlement operation, and then there is no WARN. Publish one message: after the configured time the log shows the timeout decision and the counters show decided.TIMEOUT 1, then the failureOutcome applies, FAILED by default, which retries the message. The time between the publish and the retry is the value you set.

## Undo

Remove the key from deployment.toml and the parameter from the endpoint. The default of 180 seconds applies again.
