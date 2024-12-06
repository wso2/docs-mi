# How to Store and Forward Messages for Guaranteed Delivery

## What you'll build
Store and forward messaging is used to serve traffic to back-end services that can only accept request messages at a given rate. This method also ensures guaranteed delivery of messages. Messages are never lost since they are stored in the message store and available for future reference.

**In this tutorial**, instead of sending the request directly to the back-end service, you store the request message in the RabbitMQ broker. You then use a **Message Processor** to retrieve the message from the store before delivering it to the back-end service.

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

- **RabbitMQ:** Install and [setup Micro Integrator]({{base_path}}/install-and-setup/setup/brokers/configure-with-rabbitmq) with RabbitMQ.

### Step 2: Develop the integration artifacts

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `StoreAndForwardTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create a REST API

1. Go to **MI Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png" alt="create new api" width="30%"></a>

2. Hover over **APIs** and click the **+** icon that appears to open the **API Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-api.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-api.png" alt="add API" width="30%"></a>

3.  Specify values for the required REST API properties:
    <table>
      <tr>
        <th>Property</th>
        <th>Value</th>
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
        <td><code>/healthcare </code></td>
        <td>
          Here you are anchoring the API in the <code>/healthcare </code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to /healthcare means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare<code>.
        </td>
      </tr>   
    <table>                                                                  

4.  Click **Create**. This will open the **Service Designer** interface.

    You can now start configuring the API resource.

5. Click on the `GET` API resource under **Available resources** on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/edit-icon.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/edit-icon.png" alt="edit icon" width="80%"></a>

7.  Specify values for the required resource properties:

    <table>
      <tr>
        <th>Property</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>URI-Template</td>
        <td>
          <code>/categories/{category}/reserve</code> </br> This defines the request URL format. In this case, the full request URL format is <code>http://host:port/categories/{category}/reserve</code> where <code>{category}</code> is a variable.
        </td>
      </tr>
      <tr>
        <td>Url Style</td>
        <td>
          <code>URI_TEMPLATE</code>
        </td>
      </tr>
      <tr>
        <td>Methods</td>
        <td>
          <code>POST</code> <br> This defines that the API resource only handles requests where the HTTP method is POST.
        </td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/edit-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/edit-api-resource.png" alt="edit API resource" width="30%"></a>

8. Click **Update**.

#### Create the Message Store

Now, let's create a message store artifact to represent the broker.

1.  Go to **MI Project Explorer** > **Message Stores**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store.png" alt="create Message Store" width="30%"></a>

2. Hover over **Message Stores** and click the **+** icon that appears to open the **Message Store Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-2.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-2.png" alt="edit API resource" width="30%"></a>

3. Create a **RabbitMQ Message Store**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-3.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-message-store-3.png" alt="edit API resource" width="80%"></a>

4.  Specify values for the required Message Store properties:

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
    <tr>
    <td>RabbitMQ Queue Name</td>
    <td>`HospitalServiceMessageStoreQueue`</td>
    <td>The queue to which the subscription is created.</td>
    </tr>
    <tr>
    <td>RabbitMQ Exchange Name</td>
    <td>`exchange`</td>
    <td>The name of the RabbitMQ exchange to which the queue is bound.</td>
    </tr>
    <tr>
    <td>Routing Key</td>
    <td>`key`</td>
    <td>The exchange and queue binding value.</td>
    </tr>
    <tr>
    <td>User Name</td>
    <td>user name</td>
    <td>The user name to connect to the broker.</td>
    <tr>
    <td>Password</td>
    <td>password</td>
    <td>The password to connect to the broker.</td>
    </tr>
    </table>

3.  Click **Create**.

#### Create new Endpoint

Let's create an Endpoint to represent the Hospital Service back-end service.

1. Navigate to the **MI Project Explorer** > **Endpoints**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-endpoint/create-new-endpoint.png" alt="create new endpoint" width="30%"></a>

2. Hover over **Endpoints** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-endpoint.png" alt="Add endpoint" width="30%"></a>

3. Next, select **HTTP Endpoint** type from the **Create Endpoint Artifact** interface.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/create-http-endpoint.png" alt="Create HTTP Endpoint" width="60%"></a>

3.  Let's create the hospital service endpoint (**HospitalServicesEP**) using the following values:

    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Endpoint Name </td>
            <td>
                <code>HospitalServicesEP</code>
            </td>
            <td>
                This is a single endpoint configured to forward requests to the relevant hospital by reading the hospital specified in the request payload.
            </td>
        </tr>
        <tr>
            <td>URI Template</td>
            <td>
                <code>http://localhost:9090/{uri.var.hospital}/categories/{uri.var.category}/reserve</code>
            </td>
            <td>
                The template for the request URL expected by the back-end service. The following two variables will be replaced by the corresponding values in the request message:
                <ul>
                  <li>{uri.var.hospital}</li>
                  <li>{uri.var.category}</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Method</td>
            <td>
                <code>POST</code>
            </td>
            <td>
                Endpoint HTTP REST Method.
            </td>
        </tr>
    </table>

4.  Click **Create**.

#### Create a Sequence

Let's create a Sequence that uses the message in the message store to send the request to the hospital service endpoint.

1. Navigate to the **MI Project Explorer** > **Sequences**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/create-sequence.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-reusable-sequence/create-sequence.png" alt="create sequence" width="40%"></a>

2. Hover over **Sequences** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-sequence.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-sequence.png" alt="add sequence" width="40%"></a>

3. In the Sequence Form that appears, provide `HospitalServiceSequence` as the **Name**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-sequence.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/create-new-sequence.png" alt="Create new sequence" width="80%"></a> 

4.  Click **Create**. Then you will be directed to the **MI Overview** page.

5. Click on `HospitalServiceSequence` under **Sequences** that you have just created to open its diagram view.

6. Next, add a Call mediator to the sequence. Click the **+** icon and select **Call mediator** from the Palette.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-call-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/add-call-mediator.png" alt="Add call mediator" width="80%"></a>

4.  In the sequence palette specify the endpoint as `HospitalServicesEP`. Click **Submit**.

5.  Click **+** icon after the **Call mediator** and add a **Log mediator** from the palette and specify the following details:

    <table>
    <tr>
        <th>Field</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>Log Category</td>
        <td>INFO</td>
    </tr>
    <tr>
        <td>Log Level</td>
        <td>FULL</td>
    </tr>
    </table>

6.  Click **+** icon after the **Log mediator** and add a **Drop mediator** from the palette. Click **Submit**.

#### Create the Message Processor

Let's create a **Message Sampling Processor** to dispatch the request message from the **Message Store** to the **HospitalServiceSequence**.

!!! Info
    You can also use the **Scheduled Message Forwarding Processor** here and define the endpoint within the processor. The Message Sampling Processor is used because you need to perform mediation on the request message in the next tutorial.

1. Navigate to the **MI Project Explorer** > **Message Processors**.

2. Hover over **Message Processors** and click the **+** icon that appears.

3. Next, select **Message Sampling Processor** type from the **Create New Message Processor** interface.
    <table>
        <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
        </tr>
        <tr>
        <td>Message Processor Name</td>
        <td>`HospitalServiceMessageProcessor`</td>
        <td>The name of the scheduled message forwarding processor.</td>
        </tr>
        <tr>
        <td>Message Store</td>
        <td>`HospitalServiceMessageStore`</td>
        <td>The message store from which the scheduled message forwarding processor consumes messages.</td>
        </tr>
        <tr>
        <td>Processor State</td>
        <td>`Activate`</td>
        <td>Whether the processor needs to be activated or deactivated.</td>
        </tr>
        <tr>
        <td>Sequence Name</td>
        <td>`HospitalServiceSequence`</td>
        <td>The name of the sequence to which the message from the store needs to be sent.</td>
        </tr>
    </table>

2.  Click **Create**.

#### Update the mediation flow

Let's update the REST API so that the client request is forwarded to the message store we created above.

1. Navigate to the **MI Project Explorer** > **APIs** > **HealthcareAPI** > **/categories/{category}/reserve**.

    <a href="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/update-mediation-flow.png"><img src="{{base_path}}/assets/img/learn/tutorials/storing-and-forwarding-messages/update-mediation-flow.png" alt="edit API resource" width="30%"></a>

2.  To add **Property mediator** click **+** icon and select **Property mediator** from the palette.

    !!! Info
        This is used to extract the hospital name that is sent in the request payload. 

2.  With the **Property mediator** selected, access the **Properties** tab and give the following details:

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
      <tr>
         <td>Property Name</td>
         <td>Enter <code>uri.var.hospital</code></td>
      </tr>
      <tr>
         <td>Property Action</td>
         <td>Enter <code>set</code></td>
      </tr>
      <tr>
         <td>Property Data Type</td>
         <td>STRING</td>
      </tr>
      <tr>
         <td>Property Scope</td>
         <td>Enter <code>default</code></td>
      </tr>
      <tr>
         <td>Value</td>
         <td>
            <ol>
                <li>Click the <strong>Ex</strong> button before the <b>Value</b> field. This specifies the value type as <i>expression</i>.
                </li>
               <li>Enter <code>json-eval($.hospital_id)</code> as the expression value.</li>
            </ol>
               <b>Note</b>:
               This is the JSONPath expression that will extract the hospital from the request payload.
            </div>
         </td>
      </tr>
    </table>

3. Click **Submit**.

4.  Click **+** icon after the **Property mediator** and add a **Store mediator** by clicking **Store Message** from the palette.

5.  With the Store mediator selected, access the **Property** tab and specify the following details:

    <table>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Message Store</td>
            <td>Select <strong>HospitalServiceMessageStore</strong></td>
        </tr>
        <tr>
            <td>Description</td>
            <td>Hospital Service Store</td>
        </tr>
    </table>

6. Click **Submit**.

7. Click **+** icon after the **Store mediator** and add a **Respond mediator** from the palette. Click **Submit**.

We have now finished creating all the required artifacts.

### Step 3: Start the RabbitMQ Broker
    
Be sure to install and start a RabbitMQ server instance before starting the Micro-Integrator.

See the [RabbitMQ documentation](https://www.rabbitmq.com/download.html) for more information on how to install and run the product.

### Step 4: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

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

Let's send a request to the API resource. You can use Postman or any other **HTTP Client**:

1. Open the Postman application. If you do not have the application, download it from here : [Postman](https://www.postman.com/downloads/)

2. Add the request information as given below and click the <b>Send</b> button.
    
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
                  The URI-Template format that is used in this URL was defined when creating the API resource HealthcareAPI:
          <code>http://<host>:<port>/categories/{category}/reserve</code>.
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
                    "appointment_date": "2025-04-02"
                }
              </code>
            </div></br>
            <ul>
              <li>
                This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and data of appointment.
              </li>
            </ul>
        </tr>
     </table>

     <br/><br/>
     <video src="{{base_path}}/assets/vids/surgery-reserve.webm" width="720" height="480" controls></video>
     <br/><br/>
     
If you want to send the client request from your terminal:

1.  Install and set up [cURL](https://curl.haxx.se/) as your REST client.

2.  Create a JSON file named `request.json` with the following request payload.

    ```json
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
        "appointment_date": "2025-04-02"
    }
    ```

3.  Open a command line terminal and execute the following command from the location where the `request.json` file you created is saved:

    ```bash
    curl -v -X POST --data @request.json http://localhost:8290/healthcare/categories/surgery/reserve --header "Content-Type:application/json"
    ```

#### Analyze the response

You will see the same request JSON as the response received by your **HTTP Client**.

Now check the **OUTPUT** tab of VS code and you will see the following message:

```log
[2024-07-26 11:45:56,798]  INFO {LogMediator} - {api:HealthcareAPI} To: http://www.w3.org/2005/08/addressing/anonymous, WSAction: , SOAPAction: , MessageID: urn:uuid:03d39a92-1727-40c7-80a6-3a0cba58e57f, correlation_id: 2a3b2350-5ef9-4e30-b5bd-7ec5a6fb0167_1aa41990-0b7f-4c1c-bbeb-23976344f792, Direction: request, Payload: {"appointmentNumber":1,"doctor":{"name":"thomas collins","hospital":"grand oak community hospital","category":"surgery","availability":"9.00 a.m - 11.00 a.m","fee":7000.0},"patient":{"name":"John Doe","dob":"1940-03-19","ssn":"234-23-525","address":"California","phone":"8770586755","email":"johndoe@gmail.com"},"fee":7000.0,"confirmed":false}
```

You have now explored how the Micro Integrator can be used to implement store and forward messaging using a **Message Store**, **Message Processors**, and the **Store Mediator**.
