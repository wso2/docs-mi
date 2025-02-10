# How to Expose Several Services as a Single Service

## What you'll build

When information from several services is required to construct a response to a client request, service chaining needs to be implemented. This means integrating several services based on some business logic and exposing them as a single, aggregated service.

In this tutorial, when a client sends a request for a medical appointment, the Micro Integrator performs several service calls to multiple back-end services to construct a response that includes all the necessary details. The **Call** mediator allows you to specify all service invocations one after the other within a single sequence.

You will also use the **PayloadFactory** mediator to take the response from one back-end service and transform it into the format accepted by another back-end service.

### Concepts and artifacts used

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties)
-   [HTTP Connector]({{base_path}}/reference/connectors/http-connector/http-connector-overview)
-   [Variable Mediator]({{base_path}}/reference/mediators/variable-mediator)
-   [PayloadFactory Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator)

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `ExposeSeveralServicesTutorial` as the **Project Name**.

5. Provide a location under **Select Project Directory**.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Create**.

Now let's start designing the integration by adding the necessary artifacts.

#### Create HTTP connections

Let's create an HTTP connection to represent all three back-end services: Hospital Service, Channeling Service, and Payment Service.

1. Navigate to the **Project Settings**.
2. Click on **Add artifact**.

   <a href="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/add-artifact-icon.png" alt="add artifact" width="80%"></a>

3. Click **+ View More** under **Create an Integration**.
4. Select **Connections** under **Other Artifacts** to open the **Connector Store Form**.

   <a href="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png"><img src="{{base_path}}/assets/img/integrate/connectors/connections-artifact.png" alt="connections artifact" width="80%"></a>

5. Select **HTTP**.
6. You need to add dependencies to the project, if not added yet.
7. In the **Add New Connection** form, specify the following values to create the new HTTP connection.

     <table>
         <thead>
           <tr>
              <th>Property</th>
              <th>Value</th>
              <th>Description</th>
           </tr>
         </thead>
         <tbody>
           <tr>
              <td>Connection Name</td>
              <td><code>CommonServiceConn</code></td>
              <td>The name of the connection.</td>
           </tr>
           <tr>
              <td>Base URL</td>
              <td>
                 <code>http://localhost:9090</code>
              </td>
              <td>The base of the request URL for the back-end service.</td>
           </tr>
         </tbody>
     </table>

8. Click **Add**.

You have now created the connection that is required for this tutorial.

#### Create a REST API

1. Go to **Project Settings** > **Add Artifact**.
2. Select **API** under **Create an Integration**.
3. Specify values for the required REST API properties:
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
        <td><code>/healthcare</code></td>
        <td>
          Here you are anchoring the API in the <code>/healthcare</code> context. This will become part of the name of the generated URL used by the client when sending requests to the Healthcare service. For example, setting the context to /healthcare means that the API will only handle HTTP requests where the URL path starts with <code>http://host:port/healthcare</code>.
        </td>
      </tr>
    <table>                                                    
    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/create-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/create-api-artifact.png" alt="create API artifact" width="80%"></a>               

4. Click **Create**. This opens the **Service Designer** interface.

    You can now start configuring the API resource.

5. Click on the `GET` API resource under **Available resources** on the **Service Designer**.

    You will now see the graphical view of the `HealthcareAPI` with its default API Resource.

6. Click the **Edit** icon to edit the API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-icon.png"><img src="{{base_path}}/assets/img/learn/tutorials/sending-simple-message-to-service/edit-icon.png" alt="edit icon" width="80%"></a>

7. Specify values for the required resource properties:

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
            The request URL should match this resource path. The {category} variable will be replaced with the value sent in the request.
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
8. Click **Update**.

#### Update the mediation flow

You can now start updating the API resource with the mediation flow.

1. To get started, click on the **+** icon to add the first mediator to the sequence.

2. Select **Variable** mediator from the **Mediators** palette. This is used to extract the hospital name that is sent in the request payload.

   <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-variable-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-variable-mediator.png" alt="add variable mediator" width="80%"></a>

3. With the **Variable** mediator selected, access the **Properties** tab and give the following details:

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>Hospital</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>STRING</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.hospital_id</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the hospital from the request payload.
                </div>
            </td>
        </tr>
    </table>

4. Click **Add**.

5. Add a new **Variable** mediator just after the previous variable mediator. This will retrieve and store the card number that was sent to the request payload.

6. With the **Variable** mediator selected, access the properties tab and specify the following details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>CardNumber</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>STRING</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.cardNo</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the hospital from the request payload.
                </div>
            </td>
        </tr>
    </table>

7. Click **Add**.

8. Add an HTTP **POST** operation by clicking the **+** sign after the **Variable** mediator.
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection</td>
            <td>Select <code>CommonServiceConn</code>.</td>
        </tr>
        <tr>
            <td>Relative Path</td>
            <td>Enter <code>/\${vars.Hospital}/categories/${params.pathParams.category}/reserve</code>.</td>
        </tr>
        <tr>
            <td>Headers</td>
            <td>Leave empty.</td>
        </tr>
        <tr>
            <td>Content Type</td>
            <td>Select <code>JSON</code>.</td>
        </tr>
        <tr>
            <td>Request Body</td>
            <td>Enter <code>\${payload}</code>.</td>
        </tr>
        <tr>
            <td>Response Variable Name</td>
            <td>Enter <code>HospitalServiceRes</code>.</td>
        </tr>
        <tr>
            <td>Overwrite Message Body</td>
            <td>Select.</td>
        </tr>
    </table>

    !!! Note
        A similar response to the following will be returned from different hospital services: GrandOaks, Clemency, or PineValley:
        ```json
        {
            "appointmentNumber": 1,
            "doctor": {
                "name": "thomas collins",
                "hospital": "grand oak community hospital",
                "category": "surgery",
                "availability": "9.00 a.m - 11.00 a.m",
                "fee": 7000.0
            },
            "patient": {
                "name": "John Doe",
                "dob": "1990-03-19",
                "ssn": "234-23-525",
                "address": "California",
                "phone": "8770586755",
                "email": "johndoe@gmail.com"
            },
            "fee": 7000.0,
            "confirmed": false
        }
        ```
        Let's use variable mediators to retrieve and store the values that you get from the response you receive.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-http-post-operation.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-http-post-operation.png" alt="add http post operation" width="80%"></a>

9. Add another **Variable** mediator after HTTP **POST** operation to retrieve and store the value sent as `appointmentNumber`.

10. With the **Variable** mediator selected, access the properties tab and specify the following details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>AppointmentId</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>STRING</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.appointmentNumber</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the hospital from the request payload.
                </div>
            </td>
        </tr>
    </table>

11. Similarly, add two more **Variable** mediators. They will retrieve and store the `doctor` details and `patient` details respectively from the response that is received.

    - To store `doctor` details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>DoctorDetails</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>JSON</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.doctor</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the doctor's details from the request payload.
                </div>
            </td>
        </tr>
    </table>

    - To store `patient` details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>PatientDetails</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>JSON</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.patient</code> as the expression value.</li>
                    </ol>
                    <b>Note</b>:
                    This is the synapse expression that will extract the patient details from the request payload.
                </div>
            </td>
        </tr>
    </table>

12. Add an HTTP **GET** operation from the **Mediators** palette by clicking the **+** sign after the **Variable** mediator. 
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection</td>
            <td>Select <code>CommonServiceConn</code>.</td>
        </tr>
        <tr>
            <td>Relative Path</td>
            <td>Enter <code>/\${vars.Hospital}/categories/appointments/\${vars.AppointmentId}/fee</code>.</td>
        </tr>
        <tr>
            <td>Headers</td>
            <td>Leave empty.</td>
        </tr>
        <tr>
            <td>Response Variable Name</td>
            <td>Enter <code>ChannelingServiceRes</code>.</td>
        </tr>
        <tr>
            <td>Overwrite Message Body</td>
            <td>Select.</td>
        </tr>
    </table>
    
    !!! Note
        The following response is received from the Channeling Service:
        ```json
        {
            "patientName": " John Doe ",
            "doctorName": "thomas collins",
            "actualFee": "7000.0"
        }
        ```  

13. Add a **Variable** mediator adjoining the HTTP **POST** operation to retrieve and store the value sent as `actualFee`. This value is used when invoking the Payments Service.

14. With the **Variable** mediator selected, access the properties tab and specify the following details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>Enter <code>ActualFee</code>.</td>
        </tr>
        <tr>
            <td>Data Type</td>
            <td>Select <code>STRING</code>.</td>
        </tr>
        <tr>
            <td>Value</td>
            <td>
                <div class="content-wrapper">
                    <p>Follow the steps given below to specify the expression value:</p>
                    <ol>
                        <li>Click the <b>Ex</b> button in the <b>Value</b> field. This specifies the value type as an <i>expression</i>.</li>
                        <li>Enter <code>payload.actualFee</code> as the expression value.</li>
                    </ol>
                </div>
            </td>
        </tr>
    </table>

15. Let's use the **PayloadFactory** mediator to construct the following message payload for the request sent to Payment Service.

    ```json
    {
        "appointmentNumber": 2,
        "doctor": {
            "name": "thomas collins",
            "hospital": "grand oak community hospital",
            "category": "surgery",
            "availability": "9.00 a.m - 11.00 a.m",
            "Fee": 7000.0
        },
        "patient": {
            "name": "John Doe",
            "dob": "1990-03-19",
            "ssn": "234-23-525",
            "address": "California",
            "phone": "8770586755",
            "email": "johndoe@gmail.com"
        },
        "fee": 7000.0,
        "Confirmed": false,
        "card_number": "1234567890"
    }
    ```

16. Add a **PayloadFactory** mediator next to the **Variable** mediator to construct the above message payload.

    <a href="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-payload-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/exposing-several-services/add-payload-mediator.png" alt="add payload mediator" width="80%"></a>

17. With the **PayloadFactory** mediator selected, access the properties tab of the mediator and specify the following details:
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Content Type</td>
            <td>Select <code>json</code>.</td>
        </tr>
        <tr>
            <td>Payload</td>
            <td>
                ```json 
                {"appointmentNumber":${vars.AppointmentId}, "doctor":${vars.DoctorDetails}, "patient":${vars.PatientDetails}, "fee":${vars.ActualFee}, "confirmed":"false", "card_number":"${vars.CardNumber}"}
                ```   
                This is the message payload to send with the request to Payments Service.
            </td>
        </tr>
    </table>

18. Click **Add**.

19. Add an HTTP **POST** operation from the **Mediators** palette by clicking the **+** sign after the **Variable** mediator.
    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Connection</td>
            <td>Select <code>CommonServiceConn</code>.</td>
        </tr>
        <tr>
            <td>Relative Path</td>
            <td>Enter <code>/healthcare/payments</code>.</td>
        </tr>
        <tr>
            <td>Headers</td>
            <td>Leave empty.</td>
        </tr>
        <tr>
            <td>Content Type</td>
            <td>Select <code>JSON</code>.</td>
        </tr>
        <tr>
            <td>Request Body</td>
            <td>Enter <code>\${payload}</code>.</td>
        </tr>
        <tr>
            <td>Response Variable Name</td>
            <td>Enter <code>PaymentServiceRes</code>.</td>
        </tr>
        <tr>
            <td>Overwrite Message Body</td>
            <td>Select.</td>
        </tr>
    </table>

20. Add a **Respond** mediator to send the response to the client. 

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, and navigate to the location where you saved the back-end service.
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
                  The URI-Template format that is used in this URL was defined when creating the API resource:
          <code>http://<host>:<port>/categories/{category}/reserve</code>
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
            <ul>
              <li>
                This JSON payload contains details of the appointment reservation, which includes patient details, doctor, hospital, and date of appointment.
              </li>
            </ul>
        </tr>
     </table>
     
If you want to send the client request from your terminal:

1. Install and set up [cURL](https://curl.haxx.se/) as your REST client.
2. Create a JSON file named `request.json` with the following request payload.

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
      "cardNo": "7844481124110331",
      "appointment_date": "2025-04-02"
    }
    ```
3. Open a terminal and navigate to the directory where you have saved the `request.json` file.

4. Execute the following command.

    ```bash
    curl -v -X POST --data @request.json  http://localhost:8290/healthcare/categories/surgery/reserve  --header "Content-Type:application/json"
    ```

#### Analyze the response

You will see the response received to your <b>HTTP Client</b>:

```json
{
"patient":"John Doe",
"actualFee":7000.0,
"discount":20,
"discounted":5600.0,
"paymentID":"480fead2-e592-4791-941a-690ad1363802",
"status":"Settled"
}
```

You have now explored how the Micro Integrator can perform service chaining using the **Call** mediator and transform message payloads from one format to another using the **PayloadFactory** mediator.
