# Ordering with one worker

One worker processes the queue in order, and a failed message is retried on that same worker before the next one is taken, so the order holds through retries.

## The shape

Set solace.concurrentConsumers to 1 and keep the failure policy at FAILED with in place retries. The worker holds the failed message, waits the back off, injects it again, and takes the next message only after the decision. The broker never sees a redelivery, so the message does not move behind the ones already delivered into the window.

```xml
<parameter name="solace.concurrentConsumers">1</parameter>
<parameter name="solace.failureOutcome">FAILED</parameter>
<parameter name="solace.maxRedeliveries">-1</parameter>
```

## What breaks the order

| Setting | Effect on the order |
| --- | --- |
| solace.maxRedeliveries 0 | the message is settled FAILED at once and the broker redelivers it, behind the messages already in the window |
| solace.concurrentConsumers above 1 | the order is per worker |
| REJECTED | the message leaves the queue, for the dead message queue when it is eligible, and the order of the rest holds |
| a continuation of an earlier attempt | a sequence that timed out and was retried can still run its first attempt's continuation later, which is the at least once contract, not a reorder of the queue |
