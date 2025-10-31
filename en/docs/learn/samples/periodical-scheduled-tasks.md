# Periodical Scheduled triggers Sample

This sample demonstrates the task scheduling capabilities of the WSO2 Integrator: MI.

The scenario is about fetching information related to personal records from a service periodically.

This sample consists of a Scheduled trigger called `PersonRecordRetrieveTask`, an Endpoint called `PersonRecordEP`, and a Sequence called `PersonRecordSeq`.

The scheduled task is configured to run five times in 30 seconds time intervals. It injects messages to the sequence and the sequence invokes the endpoint to get the person record.

## Deploying the sample

1.  Open the sample by clicking on the **Periodical Scheduled triggers** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your WSO2 Integrator: MI.

## Running the sample

A scheduled task will be executed after the carbon application is deployed in the server and that task will log data in the MI server console.
