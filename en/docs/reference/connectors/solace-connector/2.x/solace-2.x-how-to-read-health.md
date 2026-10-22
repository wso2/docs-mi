# Read health and counters from the management API and ICP

At the end of this guide you read the status, the three health axes and the counters of an endpoint from the management API, and you know what each word means.

## Steps

1. Call the management API with an admin user. The port is 9164 on a default server.

    ```bash
    TOKEN=$(curl -sk -u admin:admin https://localhost:9164/management/login \
      | sed -n 's/.*"AccessToken"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
    curl -sk -H "Authorization: Bearer $TOKEN" \
      'https://localhost:9164/management/inbound-endpoints?inboundEndpointName=OrderListener'
    ```

    The health block of the answer, as the server returned it on the test bench right after a deploy. The [quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/) shows the whole answer.

    ```json
    "health": {
      "retried": 0,
      "retainedUnsettled": 0,
      "freePermits": 1,
      "lastErrorAt": 0,
      "connectivity.session": "connected",
      "activity": "active",
      "rolledBackByBroker": 0,
      "settled.ack": 0,
      "pending": 0,
      "connectivity.flow-1": "connected",
      "applied.REJECTED": 0,
      "dropped": 0,
      "settleFailed": 0,
      "settled.rejected": 0,
      "settled.failed": 0,
      "unknown": 0,
      "closeRejected": 0,
      "lifecycle": "running",
      "leftByDrain": 0,
      "handlerFailed": 0,
      "connectivity": "connected",
      "rejectedSubmit": 0,
      "rolledBack": 0,
      "decided.INJECTION_REJECTED": 0,
      "abandoned": 0,
      "decided.DRAIN": 0,
      "generation": 1,
      "activity.flow-1": "active",
      "applied.FAILED": 0,
      "committed": 0,
      "degradedOutcomes": 0,
      "applied.NONE": 0,
      "inFlight": 0,
      "received": 0,
      "decided.OTHER": 0,
      "decided.AUTOACK": 0,
      "decided.FAILED": 0,
      "redelivered": 0,
      "applied.ACK": 0,
      "pendingMax": 0,
      "decided.TIMEOUT": 0,
      "decided.ACK": 0,
      "decided.REJECTED": 0,
      "status": "active"
    }
    ```

2. Read the status: active, standby, connected, recovering, failed or stopped. Read the health block: lifecycle, generation, connectivity as a whole and per resource, activity as a whole and per flow, and the counters.
3. In ICP open the server, then Inbound Endpoints, then the endpoint. The status column shows the same word, and the detail shows the health block.
4. Watch it change. Pause the broker container for a minute: the status reads recovering and connectivity reads reconnecting while the lifecycle stays running. Unpause: active again, the generation unchanged. Delete and recreate the queue: recovering, then active with the generation increased by one.

## Verify

During normal consumption the counters move together: received, decided.ACK, applied.ACK and settled.ack. A retry shows as decided.FAILED and retried, with the message in flight through its back off. A rejection shows as applied.REJECTED and settled.rejected. On the bench one message that failed four times with maxRedeliveries 3 left received 1, retried 3, decided.FAILED 4, applied.REJECTED 1 and settled.rejected 1. The sum of the settled counters, the retained ones and the in flight ones matches received.

| Word | Where | Meaning |
| --- | --- | --- |
| recovering with connectivity reconnecting | status and connectivity | the client reconnects on its own, no recovery |
| recovering with lifecycle recovering | status and lifecycle | a terminal loss, the endpoint retries with a back off |
| connected | status | running, and the broker has not reported the flow as active or standby: before the first indication, or on a broker without the capability |
| standby | status | bound, the broker holds this flow standby |
| disconnected | connectivity | before the first bind of a generation, or after a refusal at start |
| unknown | activity | no active flow indication yet, or none on this broker |

Below the latest U2 update level the endpoint shows the task state only.

## Undo

Nothing to undo. Reading the API changes nothing. Health never triggers a recovery.
