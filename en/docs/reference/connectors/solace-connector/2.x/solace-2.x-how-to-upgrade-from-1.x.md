# Upgrade a 1.x project to 2.x

At the end of this guide a project built on the 1.x artifacts runs on 2.x with every manual acknowledgement sequence checked, every content type dependency settled, and the new defaults understood.

## Steps

1. Read the [migration page]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-migration-from-1.x/) once. The breaking changes are the acknowledgement on return, the failure outcome default, the version lock, the reconnect default, the confirmed publishes, the client names and the end of the content type guess.
2. In the project's pom change both versions to the latest 2.x release, the connector and the inbound endpoint.
3. Find every inbound endpoint with autoAck false and open its sequence and fault sequence. Add acknowledgeMessage on the success path and nackMessage in the fault sequence where they are missing. A sequence that only nacks REJECTED for bad input needs acknowledgeMessage for the good path.
4. Find every flow that reads JSON or XML from a producer that declares no content type. 1.x guessed the type from the first character, 2.x does not. Set solace.contentType on the inbound endpoint, or contentType on poll, sendRequest and browse, or have the producer declare the type. Where a sequence must only accept a valid document, parse and validate it in the sequence, since 2.x never falls back to text for malformed JSON or XML.
5. Find every publishMessage, sendRequest and sendReply. Decide whether a rejection should be a fault, the default, or a status in the response, continueOnAckFailure true. Add a fault sequence where there is none.
6. Find every script, monitor or broker ACL that keys on the client name. Either change it to the new name, prefix, node and endpoint, or set clientNameStrict true on that endpoint and accept that two nodes with that endpoint evict each other.
7. Check the broker's connection limit for the client username: pool size plus two per connection plus one per endpoint.
8. Build the CAR. Deploy the connector before the inbound endpoint, or both in one CAR. On the first deploy watch the log for the deploy time WARNs: a sequence with no settlement operation, a strict client name, a transacted endpoint's queue settings.

## Verify

No endpoint logs `cannot start: a Solace connector older than 2.0.0 is deployed`. No WARN names a sequence without a settlement operation. A message through each flow is acknowledged after its work, which the counters show as decided.ACK and settled.ack moving together, and the queue depth stays at zero. A rejected publish reaches the fault sequence.

## Undo

Redeploy the previous CAR with the 1.x versions in the pom. The 1.x artifacts need no settlement change to run as before, and the broker's queues are unchanged by the upgrade.
