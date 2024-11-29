# Create a Message Store

Follow the instructions below to create a new [Message Store]({{base_path}}/reference/synapse-properties/about-message-stores-processors) artifact in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the message store artifact

{!includes/creating-project.md!}

3. Go to **Micro Integrator Project Explorer** > **Message Stores**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/create-message-store.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/create-message-store.png" alt="create-message-store" width="30%"></a>

4. Hover over **Message Stores** and click the **+** icon that appears to open the **Message Store Form** below. 

    <a href="{{base_path}}/assets/img/learn/tutorials/add-message-store.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-message-store.png" alt="add message store" width="30%"></a>

5. Select the type of message store you are creating.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/message-store-form.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/message-store-form.png" alt="create-message-store" width="80%"></a>

6. Enter a unique name for the message store.

7. Specify values for the other required properties.

	See the links given below for descriptions of message store properties for each store type:

	-	[JMS properties]({{base_path}}/reference/synapse-properties/message-stores/jms-msg-store-properties)
	-	[JDBC properties]({{base_path}}/reference/synapse-properties/message-stores/jdbc-msg-store-properties)
	-	[RabbitMQ properties]({{base_path}}/reference/synapse-properties/message-stores/rabbitmq-msg-store-properties)
	-	[Resequence properties]({{base_path}}/reference/synapse-properties/message-stores/resequence-msg-store-properties)
	-	[WSO2 MB properties]({{base_path}}/reference/synapse-properties/message-stores/wso2mb-msg-store-properties)
	-	[In-Memory properties]({{base_path}}/reference/synapse-properties/message-stores/in-memory-msg-store-properties)
	-	[Custom properties]({{base_path}}/reference/synapse-properties/message-stores/custom-msg-store-properties)

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/new-message-store.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/new-message-store.png" alt="new message store" width="80%"></a>

8. Once you specify the values for the relevant properties, click **Create**.

The message store is created in the `src/main/wso2mi/artifacts/message-stores` folder under the integration project you created.

### Design the integration

To add a message store to the integration sequence, use the [Store Mediator]({{base_path}}/reference/mediators/store-mediator):

1. Open to the **Design View** of your [mediation sequence]({{base_path}}/reference/mediation-sequences).

2. Add **Store Message** from the **Palette** under **Mediators** > **Generic** to the relevant position in the mediation sequence.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message.png" alt="Store message" width="80%"></a>

3. Select the name of the message store artifact you previously created from the dropdown.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message-details.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-message-store/store-message-details.png" alt="Store message details" width="30%"></a>

The message store is now linked to your integration sequence.

### Update the properties

Open the above-created message store artifact from the **MI Project Explorer**. You can use the **Form** view or the **Source** view to update message store properties.

!!! abstract "Learn more about message stores"

    Follow our examples on message stores:  

    - [Introduction to Message Stores and Processors]({{base_path}}/learn/examples/message-store-processor-examples/intro-message-stores-processors)
    - [JDBC Message Store]({{base_path}}/learn/examples/message-store-processor-examples/using-jdbc-message-store)
    - [JMS Message Store]({{base_path}}/learn/examples/message-store-processor-examples/using-jms-message-stores)
    - [RabbitMQ Message Store]({{base_path}}/learn/examples/message-store-processor-examples/using-rabbitmq-message-stores)

    Follow our tutorials on message stores:

    - [Using message stores and processors]({{base_path}}/learn/integration-tutorials/storing-and-forwarding-messages)
