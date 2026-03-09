# How to Store and Forward Messages for Guaranteed Delivery

## What you'll build

Store and forward messaging is used to serve traffic to back-end services that can only accept request messages at a given rate. This method also ensures guaranteed delivery of messages. Messages are never lost since they are stored in the message store and available for future reference.

In this tutorial, instead of sending the request directly to the back-end service, you will store the request message in the [RabbitMQ Message Store]({{base_path}}/reference/synapse-properties/message-stores/rabbitmq-msg-store-properties/). You will then use a [Message Processor]({{base_path}}/reference/synapse-properties/message-processors/msg-sampling-processor-properties/) to retrieve the message from the store and deliver it to the back-end service.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

- **RabbitMQ:** Install and [setup WSO2 Integrator: MI]({{base_path}}/install-and-setup/setup/brokers/configure-with-rabbitmq) with RabbitMQ.

### Step 2: Develop the integration artifacts

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `StoreAndForwardTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create a REST API

1. Go to **MI Project Explorer**  and click **+** button to add artifact.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-artifact.png" alt="add artifact" width="80%"></a>

2. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the API Form.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_artifact_pane.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/add_artifact_pane.png" alt="select new API" width="80%"></a>

3. Enter the details given below to create a new REST API.

    <table>
    <tr>
        <th>Property</th>
        <th style="width: 140px">Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Name</td>
        <td><code>HealthcareAPI</code></td>
        <td>
            The name of the REST API.
        </td>
    </tr>
    <tr>
        <td>Context</td>
        <td><code>/healthcare</code></td>
        <td>
            Here you are anchoring the API in the <code>/healthcare</code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to <code>/healthcare</code> means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare</code>.
        </td>
    </tr>
    </table>

4. Click **Create**. This will open the **Service Designer** interface.

    You can now start configuring the API resource.

5. On the Service Designer, click on the three dots (**⋮**) and then **Edit** to access the **Properties** of the default API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_default_get.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_default_get.png" alt="Edit API resource" width="80%"></a>

6. Enter the following details:

    <table>
    <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Resource Path</td>
        <td><code>/categories/{category}/reserve</code></td>
        <td>
            The request URL should match this resource path. The <code>{category}</code> variable will be replaced with the value sent in the request.
        </td>
    </tr>
    <tr>
        <td>Methods</td>
        <td>
            `POST`
        </td>
        <td>
            This API resource will accept POST requests.
        </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_api_resource_props.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/edit_api_resource_props.png" alt="Edit API resource properties" width="30%"></a>

7. Click **Update**.

#### Create the Message Store

Now, let's create a message store artifact that connects to the RabbitMQ broker to store the messages.

!!! Tip "What is a Message Store?"
    A **Message Store** in WSO2 Integrator: MI (WSO2 MI) is a persistence layer used to temporarily hold messages for later processing. It acts as a buffer between message producers and consumers, enabling asynchronous message handling, retries, and reliable delivery. To learn more, see the [Message Stores and Processors]({{base_path}}/reference/synapse-properties/about-message-stores-processors/) documentation.

1. In the **MI Project Explorer** click on **+ Add artifact**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store.png" alt="create Message Store" width="80%"></a>

2. Click **+ View More** under **Create an Integration**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-2.png" alt="edit API resource" width="80%"></a>

3. Select **Message Store** under **Other Artifacts** to open the **Message Store Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-3.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-3.png" alt="select message store" width="80%"></a>

4. Select **RabbitMQ Message Store**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-4.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-4.png" alt="select rabbitmq store" width="80%"></a>

5. Enter the following details to create a new RabbitMQ message store.

    !!! Note  
        In this tutorial, you will use a local RabbitMQ broker with the default configurations. If you plan to use a different RabbitMQ broker, update the following fields accordingly. Refer to the [RabbitMQ Message Store]({{base_path}}/reference/synapse-properties/message-stores/rabbitmq-msg-store-properties/) documentation for more details and configuration options.

    <table>
    <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
    <td>Message Store Name</td>
    <td><code>HospitalServiceMessageStore</code></td>
    <td>The name of the message store.</td>
    </tr>
    <tr>
    <td>RabbitMQ Server Host Name</td>
    <td><code>localhost</code></td>
    <td>The address of the RabbitMQ broker</td>
    </tr>
    <tr>
    <td>RabbitMQ Server Port</td>
    <td><code>5672</code></td>
    <td>The port number of the RabbitMQ message broker.</td>
    </tr>
    </table>

    Enter the following details in the **Miscellaneous Properties** section.

    <table>
    <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
    <td>RabbitMQ Queue Name</td>
    <td><code>HospitalServiceMessageStoreQueue</code></td>
    <td>The queue to which the subscription is created.</td>
    </tr>
    <tr>
    <td>RabbitMQ Exchange Name</td>
    <td><code>exchange</code></td>
    <td>The name of the RabbitMQ exchange to which the queue is bound.</td>
    </tr>
    <tr>
    <td>User Name</td>
    <td><code>guest</code></td>
    <td>The user name to connect to the broker.</td>
    <tr>
    <td>Password</td>
    <td><code>guest</code></td>
    <td>The password to connect to the broker.</td>
    </tr>
    </table>

6.  Click **Create**.

#### Update the mediation flow

Let’s update the REST API so that incoming client requests are forwarded to the Message Store you created earlier.

1. Navigate to **MI Project Explorer** > **APIs** > **HealthcareAPI** > **/categories/{category}/reserve** to open the **Resource View**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/update-mediation-flow.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/update-mediation-flow.png" alt="Edit API resource" width="80%"></a>

2. Click on the **+** icon on the canvas to open the **Mediator Palette**. In the next step, you will add a [Store mediator]({{base_path}}/reference/mediators/store-mediator/) to store the incoming message in the Message Store you configured earlier.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-mediator-mediation-flow.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-mediator-mediation-flow.png" alt="Add mediator" width="80%"></a>

2. Select the **Store Message** mediator under **Mediators**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/select_store_mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/select_store_mediator.png" alt="Add mediator" width="80%"></a>

3. Select `HospitalServiceMessageStore` as the **Message Store** in the **Add Store Mediator** pane, and click **Add** to insert it into the integration flow.

4. Click the **+** icon after the **Store** mediator, and add a **Respond** mediator from the **Mediator Palette** to send a response back to the client.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/post_resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/post_resource.png" alt="Add mediator" width="80%"></a>

You have now completed the integration flow that stores the message sent by the client in the configured message store. Next, we’ll create the integration flow that will be executed when the Message Processor retrieves a message from the store.

#### Create a Sequence

Let's create a sequence that will use the messages saved in the message store and send them to the hospital service backend. The sequence defines the integration flow that will be executed when the message processor picks up a message. You will link this sequence when creating the message processor later.

1. In the **MI Project Explorer** click on **+ Add artifact**.

2. Click **+ View More** under **Create an Integration**.

3. Select **Sequence** under **Other Artifacts** to open the **Sequence Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-sequence.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-sequence.png" alt="Create new sequence" width="80%"></a>

4. In the **Sequence Form** that appears, provide `HospitalServiceSequence` as the **Name**, and click **Create**. This will open the **Sequence View**, where you can design the integration flow.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-sequence-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-sequence-2.png" alt="Create new HospitalServiceSequence" width="80%"></a>

    In the next steps, you will design the integration flow to call the hospital service backend and log the response it returns.

5. Click on the **+** icon on the canvas to open the **Mediator Palette**, to add the HTTP POST operation to call the hospital service backend.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add_first_mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add_first_mediator.png" alt="Add first mediator" width="80%"></a>

6. Search for `post` in the **Mediator Palette**, and select the **HTTP POST** operation.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/search_post.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/search_post.png" alt="Add POST operation" width="80%"></a>

7. Click **+ Add new connection** to create a new connection.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/new_http_conn.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/new_http_conn.png" alt="add new connection" width="80%"></a>

8. Select `HTTP` and fill in the following details to create a connection to hospital service backend. Finally, click **Add** in the **Add New Connection** form to create the connection.

    | Property            | Value                   |
    |---------------------|-------------------------|
    | **Connection Name** | `HospitalConnection`        |
    | **Base URL**        | `http://localhost:9090` |

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/form_http_conn.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/form_http_conn.png" alt="create connection" width="80%"></a>

9. Provide `/${payload.hospital_id}/categories/${params.pathParams.category}/reserve` as the **Relative Path**, and click **Add** to add the operation to the integration flow.

    !!! Note
        You can leave the rest of the configurations as default: **Content Type** set to **JSON**, **Request Body** as `${payload}`, and **Overwrite Message Body** checked.

    <a href="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/http_post_op.png"><img src="{{base_path}}/assets/img/learn/tutorials/transforming-message-content/http_post_op.png" alt="HTTP operation" width="30%"></a>

10. Click on the **+** icon after the **HTTP POST** operation, and select the **Log** mediator from the **Mediator Palette** to log the response received from the hospital backend service.

11. Provide `Payload: ${payload}` as the **Message** in the **Add Log Mediator** pane, and click **Add** to insert the **Log** mediator into the integration flow.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-log-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-log-mediator.png" alt="HTTP operation" width="30%"></a>

12. Finally, click on the **+** icon after the **Log** mediator, select the **Drop** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/select_drop_mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/select_drop_mediator.png" alt="HTTP operation" width="80%"></a>

You have now completed the integration flow that will be executed when the message processor picks up a message.  
In the next step, you will create a [Message Processor]({{base_path}}/reference/synapse-properties/message-processors/msg-sampling-processor-properties/) that will pick messages from the Message Store configured in the [previous step](#create-the-message-store).

#### Create the Message Processor

You need to create a **Message Sampling Processor**, which will retrieve messages from the **Message Store** and forward them to a specified sequence. In this tutorial, the messages will be dispatched to the `HospitalServiceSequence` created in the [previous step](#create-a-sequence).

!!! Tip "What is a Message Processor?"
    A **Message Processor** in WSO2 Integrator: MI (WSO2 MI) is a background task that retrieves messages from a **Message Store** and forwards them to a defined sequence for processing. It supports scheduled, asynchronous, and reliable message delivery which is useful for store-and-forward patterns and retry mechanisms. To learn more, see the [Message Stores and Processors]({{base_path}}/reference/synapse-properties/about-message-stores-processors/) documentation.

1. In the **MI Project Explorer** click on **+ Add artifact**.

2. Click **+ View More** under **Create an Integration**.

3. Select **Message Processor** under **Other Artifacts** to open the **Message Processor Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-processor.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-processor.png" alt="Create-message-processor" width="80%"></a>

4. Select **Message Sampling Processor**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-processor-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-processor-2.png" alt="Create new message processor" width="80%"></a>

5. Enter the following details, and click **Create** to add a new Message Sampling Processor.

    <table>
        <tr>
            <th>Property</th>
            <th style="width: 240px">Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Message Processor Name</td>
            <td><code>HospitalServiceMessageProcessor</code></td>
            <td>The unique name to identify the message processor. This processor will pick messages from the store and trigger the defined integration flow.</td>
        </tr>
        <tr>
            <td>Message Store</td>
            <td><code>HospitalServiceMessageStore</code></td>
            <td>The message store where incoming requests are saved. The message processor continuously polls this store to fetch pending messages for processing.</td>
        </tr>
        <tr>
            <td>Sequence Name</td>
            <td><code>HospitalServiceSequence</code></td>
            <td>The sequence that defines the integration logic to be executed once a message is fetched from the store. The message will be dispatched to this sequence for further processing.</td>
        </tr>
    </table>

You have now completed creating all the required artifacts for this integration.

### Step 3: Start the RabbitMQ Broker
    
Be sure to install and start a RabbitMQ server instance before starting the WSO2 Integrator: MI.

See the [RabbitMQ documentation](https://www.rabbitmq.com/download.html) for more information on how to install and run the product.

### Step 4: Build and run the artifacts

Now that you have developed an integration using the WSO2 Integrator: MI for the Visual Studio Code plugin, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/build_and_run_btn.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/build_and_run_btn.png" alt="Build and Run" width="80%"></a>

### Step 5: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, navigate to the location where you saved the back-end service.
3. Execute the following command to start the service:

    ```bash
    java -jar Hospital-Service-JDK11-2.0.0.jar
    ```

#### Send the client request

Now, let's test the integration service. For that, you can use the inbuilt try-it functionality in the MI for VS Code extension.

When you run the integration artifact as in [Step 4](#step-4-build-and-run-the-artifacts), the **Runtime Services** interface is opened up. You can see all the available services.

Select the `HealthcareAPI` you have developed and test the resource using the following category and payload.

<table>
    <tr>
        <th>Category</th>
        <td>
            <code>surgery</code> 
        </td>
    </tr>
    <tr>
        <th>Payload</th>
        <td>
        <div>
            <pre><code>
            {
                "patient":{
                    "name":"John Doe",
                    "dob":"1940-03-19",
                    "ssn":"234-23-525",
                    "address":"California",
                    "phone":"8770586755",
                    "email":"johndoe@gmail.com"
                },
                "doctor":"thomas collins",
                "hospital_id":"grandoaks",
                "hospital":"grand oak community hospital",
                "cardNo":"7844481124110331",
                "appointment_date":"2025-04-02"
            }
            </code></pre>
        </div></br>
        This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and date of appointment.
    </tr>
</table>

<a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/try_out.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/try_out.png" alt="Try Out" width="80%"></a>

Optionally, you can use [Postman](https://www.postman.com/downloads/) or [cURL](https://curl.haxx.se/) to send the request. You can refer to the following request information.

<table>
    <tr>
        <th>Method</th>
        <td>
            <code>POST</code> 
        </td>
    </tr>
    <tr>
        <th>Headers</th>
        <td>
            <code>Content-Type=application/json</code>
        </td>
    </tr>
    <tr>
        <th>URL</th>
        <td><code>http://localhost:8290/healthcare/categories/surgery/reserve</code></br></br>
            <ul>
            <li>
                The URI-Template format that is used in this URL was defined when creating the API resource:
        <code>http://host:port/healthcare/categories/{category}/reserve</code>
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Body</th>
        <td>
        <div>
            <code>
            {
                "patient": {
                "name": "John Doe",
                "dob": "1940-03-19",
                "ssn": "234-23-525",
                "address": "California",
                "phone": "8770586755",
                "email": "johndoe@gmail.com"
            },
                "doctor": "thomas collins",
                "hospital_id": "grandoaks",
                "hospital": "grand oak community hospital",
                "cardNo": "7844481124110331",
                "appointment_date": "2025-04-02"
            }
            </code>
        </div>
        </td>
    </tr>
</table>

#### Analyze the response

You will see the same request JSON as the response received by your **HTTP Client**.

Now, check the **Output** tab in VS Code. You should see a message similar to the following:

```
[2025-04-29 09:40:45,606]  INFO {LogMediator} - {api:HealthcareAPI POST /healthcare/categories/surgery/reserve} Payload: {"appointmentNumber":1,"doctor":{"name":"thomas collins","hospital":"grand oak community hospital","category":"surgery","availability":"9.00 a.m - 11.00 a.m","fee":7000.0},"patient":{"name":"John Doe","dob":"1940-03-19","ssn":"234-23-525","address":"California","phone":"8770586755","email":"johndoe@gmail.com"},"fee":7000.0,"confirmed":false}
```

This message is printed by the <a target="_blank" href="{{base_path}}/reference/mediators/log-mediator">Log mediator</a> in the integration flow that is executed when the Message Processor retrieves a message from the Message Store.

You have now explored how WSO2 Integrator: MI can implement store-and-forward messaging using a [RabbitMQ Message Store]({{base_path}}/reference/synapse-properties/message-stores/rabbitmq-msg-store-properties/), a [Message Processor]({{base_path}}/reference/synapse-properties/message-processors/msg-sampling-processor-properties/), and the [Store mediator]({{base_path}}/reference/mediators/store-mediator/).
