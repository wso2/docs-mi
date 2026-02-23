# Create a Message Processor

Follow the instructions below to create a new [Message Processor]({{base_path}}/reference/synapse-properties/about-message-stores-processors) artifact in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the message processor artifact

{!includes/creating-project.md!}

3. To add a new Message Processor, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Message Processor** under **Other Artifacts** to open the **Message Processor Form**.

7. Select the type of message processor you are creating.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-processor/message-processor-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-processor/message-processor-form.png" alt="message processor form" width="80%"></a>

8. Enter a unique name for the message processor.

	See the links given below for descriptions of properties for each message processor type:

	-	[Message Sampling Processor properties]({{base_path}}/reference/synapse-properties/message-processors/msg-sampling-processor-properties)
	-	[Scheduled Message Forwarding Processor properties]({{base_path}}/reference/synapse-properties/message-processors/msg-sched-forwarding-processor-properties)
	-	[Scheduled Failover Message Forwarding Processor properties]({{base_path}}/reference/synapse-properties/message-processors/msg-sched-failover-forwarding-processor-properties)

9. Click **Create**.

The message processor is created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/message-processors` folder under the integration project you created.

### Update the properties

Open the above-created message processor artifact from the **MI Project Explorer**. You can use the **Form** view or the **Source** view to update message processor properties.

See the links given below for descriptions of properties for each processor type:

-	[Message Sampling Processor properties]({{base_path}}/reference/synapse-properties/message-processors/msg-sampling-processor-properties)
-	[Scheduled Message Forwarding Processor properties]({{base_path}}/reference/synapse-properties/message-processors/msg-sched-forwarding-processor-properties)
-	[Scheduled Failover Message Forwarding Processor properties]({{base_path}}/reference/synapse-properties/message-processors/msg-sched-failover-forwarding-processor-properties)

## Tutorials

Follow our tutorials on message processors:

- [Using message stores and processors]({{base_path}}/learn/integration-tutorials/storing-and-forwarding-messages)

## Examples

Follow our examples on message processors:  

- [Using the Message Forwarding Processor]({{base_path}}/learn/examples/message-store-processor-examples/using-message-forwarding-processor)
- [Using the Message Sampling Processor]({{base_path}}/learn/examples/message-store-processor-examples/using-message-sampling-processor)
- [Securing the Message Forwarding Processor]({{base_path}}/learn/examples/message-store-processor-examples/securing-message-processor)
- [Load Balancing with Message Forwarding Processor]({{base_path}}/learn/examples/message-store-processor-examples/loadbalancing-with-message-processor)
