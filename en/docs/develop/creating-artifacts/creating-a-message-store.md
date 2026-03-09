# Create a Message Store

Follow the instructions below to create a new [Message Store]({{base_path}}/reference/synapse-properties/about-message-stores-processors) artifact in the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the message store artifact

{!includes/creating-project.md!}

3. To add a new Message Store, navigate to **WSO2 Integrator: MI Project Explorer**.

4. Click on the **+** icon to open the **Add Artifact** pane.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="40%"></a>

5. Click **+ View More** under **Create an Integration**.

6. Click **Message Store** under **Other Artifacts** to open the **Message Store Form**.

7. Select the type of message store you are creating.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/message-store-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/message-store-form.png" alt="create-message-store" width="80%"></a>

8. Enter a unique name for the message store.

9. Specify values for the other required properties.

	See the links given below for descriptions of message store properties for each store type:

	-	[JMS properties]({{base_path}}/reference/synapse-properties/message-stores/jms-msg-store-properties)
	-	[JDBC properties]({{base_path}}/reference/synapse-properties/message-stores/jdbc-msg-store-properties)
	-	[RabbitMQ properties]({{base_path}}/reference/synapse-properties/message-stores/rabbitmq-msg-store-properties)
	-	[Resequence properties]({{base_path}}/reference/synapse-properties/message-stores/resequence-msg-store-properties)
	-	[WSO2 MB properties]({{base_path}}/reference/synapse-properties/message-stores/wso2mb-msg-store-properties)
	-	[In-Memory properties]({{base_path}}/reference/synapse-properties/message-stores/in-memory-msg-store-properties)
	-	[Custom properties]({{base_path}}/reference/synapse-properties/message-stores/custom-msg-store-properties)

10. Once you specify the values for the relevant properties, click **Create**.

The message store is created in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/message-stores` folder under the integration project you created.

### Design the integration

To add a message store to the integration sequence, use the [Store Mediator]({{base_path}}/reference/mediators/store-mediator):

1. Open the **Design View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).

2. Add **Store Message** from the **Palette** under **Mediators** > **Generic** to the relevant position in the mediation sequence.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message.png" alt="Store message" width="80%"></a>

3. Select the name of the message store artifact you previously created from the dropdown.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message-details.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message-details.png" alt="Store message details" width="30%"></a>

The message store is now linked to your integration sequence.

<a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-mediator.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-mediator.png" alt="store mediator" width="80%"></a>

### Update the properties

Open the above-created message store artifact from the **MI Project Explorer**. You can use the **Form** view or the **Source** view to update message store properties.

## Tutorials

Follow our tutorials on message stores:

- [Using message stores and processors]({{base_path}}/learn/integration-tutorials/storing-and-forwarding-messages)

## Examples

Follow our examples on message stores:  

- [Introduction to Message Stores and Processors]({{base_path}}/learn/examples/message-store-processor-examples/intro-message-stores-processors)
- [JDBC Message Store]({{base_path}}/learn/examples/message-store-processor-examples/using-jdbc-message-store)
- [JMS Message Store]({{base_path}}/learn/examples/message-store-processor-examples/using-jms-message-stores)
- [RabbitMQ Message Store]({{base_path}}/learn/examples/message-store-processor-examples/using-rabbitmq-message-stores)
