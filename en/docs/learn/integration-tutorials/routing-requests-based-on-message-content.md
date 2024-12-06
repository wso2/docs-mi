# How to Route Requests Based on Message Content

## What you'll build

In this tutorial, we are creating the mediation artifacts that can route a message to the relevant endpoint depending on the content of the message payload.

When the client sends the appointment reservation request to the Micro Integrator, the message payload of the request contains the name of the hospital where the appointment needs to be confirmed. The HTTP request method that is used for this is POST. Based on the hospital name sent in the request message, the Micro Integrator should route the appointment reservation to the relevant hospital's back-end service.

### Concepts and artifacts used

-   [REST API]({{base_path}}/reference/synapse-properties/rest-api-properties)
-   [HTTP Endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties)
-   [Property Mediator]({{base_path}}/reference/mediators/property-mediator)
-   [Call Mediator]({{base_path}}/reference/mediators/call-mediator)

## Let's get started!

### Step 1: Set up the workspace

{!includes/setting-up-workspace-for-mi-for-vscode.md!}

### Step 2: Develop the integration artifacts

Follow the instructions given in this section to create and configure the required artifacts.

#### Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `ContentBasedRouteTutorial` as the **Project Name**.

5. Provide a location under the **Select Project Directory**.

     <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/create-new-project.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/create-new-project.png" alt="create new project" width="80%"></a>

6. Click **Finish**.

You will now see the projects listed in the **Project Explorer**.

#### Create endpoints

In this tutorial, we have three hospital services hosted as the backend:

-   Grand Oak Community Hospital: `http://localhost:9090/grandoaks/`
-   Clemency Medical Center: `http://localhost:9090/clemency/`
-   Pine Valley Community Hospital: `http://localhost:9090/pinevalley/`

The request method is `POST` and the format of the request URL expected by the back-end services is as below.
`http://localhost:9090/grandoaks/categories/{category}/reserve`

Let's create three different HTTP endpoints for the above services.

1. Go to **Micro Integrator Project Explorer** > **Endpoints**. This will open the **Endpoint Form**, from which you can select the **HTTP Endpoint**.

2. Enter the information given below to create the new endpoint.
    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Endpoint Name </td>
            <td>
                <code>GrandOakEP</code>
            </td>
            <td>
                The name of the endpoint representing the Grand Oaks Hospital service.
            </td>
        </tr>
        <tr>
            <td>URI Template</td>
            <td>
                <code>http://localhost:9090/grandoaks/categories/{uri.var.category}/reserve</code>
            </td>
            <td>
                The template for the request URL expected by the back-end service.
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

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/grandoak-endpoint.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/grandoak-endpoint.png" alt="Grand Oak endpoint" width="80%"></a>

3.  Click **Create**.

4.  Similarly, create the HTTP endpoints for the other two hospital services using the URI Templates given below:

   | Endpoint Name | Type   | URI Template                                                             | Method   |
   |---------------|--------|--------------------------------------------------------------------------|----------|
   | ClemencyEP    | `HTTP` | `http://localhost:9090/clemency/categories/{uri.var.category}/reserve`   | `POST`   |
   | PineValleyEP  | `HTTP` | `http://localhost:9090/pinevalley/categories/{uri.var.category}/reserve` | `POST`   |

You have now created the three endpoints for the hospital back-end services that will be used to make appointment reservations.

!!! Tip
    You can also create a single endpoint where the differentiation of the hospital name can be handled using a variable in the URI template. See the tutorial on [Exposing Several Services as a Single Service]({{base_path}}/learn/integration-tutorials/exposing-several-services-as-a-single-service).

    Using three different endpoints is advantageous when the back-end services are very different from one another and/or when there is a requirement to configure error handling differently for each of them.

#### Create a REST API

1. Go to **MI Project Explorer** > **APIs**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-rest-api/create-rest-api.png" alt="create new api" width="30%"></a>

2. Hover over **APIs** and click the **+** icon that appears to open the **API Form**.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-api.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-api.png" alt="add API" width="30%"></a>

3.  Enter the details given below to create a new REST API.
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
    </table>                                                                   

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/synapse-api-artifact.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/synapse-api-artifact.png" alt="Synapse API artifact" width="70%"></a>

4. Click **Create**.

5. On the Service Designer, click on the default API resource to access the **Properties** tab to edit the default API resource.

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-icon-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-icon-api-resource.png" alt="Edit API resource" width="70%"></a>

6. Enter the following details:

    <table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>URI Template</td>
        <td>
            <code>/categories/{category}/reserve</code>
        </td>
    </tr>
    <tr>
        <td>URL Style</td>
        <td>
            <code>URI_TEMPLATE</code>
        </td>
    </tr>
    <tr>
        <td>Methods</td>
        <td>
            <code>POST</code> 
        </td>
    </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-api-resource.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/edit-api-resource.png" alt="Edit API resource" width="35%"></a>

7. Click **Update**.

#### Define the mediation flow 

You can now start configuring the API resource.

1. Open the **Resource View** of the API resource.

2. Click on the **+** icon to open the **Palette**. 

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/open-palette.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/open-palette.png" alt="open palette" width="60%"></a>

3. Select **Property** mediator under **Mediators** > **Generic**.

4. Specify the following values.

    !!! Info
        This is used to extract the hospital name that is sent in the request payload.

    <table>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
      <tr>
         <td>Property Name</td>
         <td><code>Hospital</code></td>
      </tr>
      <tr>
         <td>Property Action</td>
         <td><code>set</code></td>
      </tr>
      <tr>
         <td>Property Scope</td>
         <td><code>DEFAULT</code></td>
      </tr>
      <tr>
         <td>Property Value</td>
         <td>
            <div class="content-wrapper">
              <p>Follow the steps given below to specify the expression value:</p>
            <ol>
                <li>Click the **EX** button next to the <b>Property Value</b> field. This specifies the value type as <i>expression</i>.</li>
                <li>
                  Now, click the pen icon to open the <b>Expression Editor</b>.
                </li>
               <li>Enter <code>json-eval($.hospital)</code> as the **Expression Value**.</li>
            </ol>
               <b>Note</b>:
               This is the JSONPath expression that will extract the hospital from the request payload.</br>
               Click **Save**.
            </div>
         </td>
      </tr>
    </table>

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/property.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/property.png" alt="Property pane" width="35%"></a>

5. Click **Submit**.

6. Next, add a **Switch** mediator from the **palette** just after the Property mediator.

7. In the **Switch** pane, specify the details for **Source XPath**:

      1. Add `get-property('Hospital')` as the **Source XPath**. 
   
      2. Click the `EX` button next to the Source XPath value field. This specifies the value type as expression.

8. Specify the details for **Case Branches**:

      We have three different hospital endpoints, which corresponds to three switch cases. Therefore, add three Case Branches with the below details.

      1. Click **Add Parameter** under **Case Branches** to add a branch.  
   
      2. Change the **Case RegEx** value for the switch cases as follows:

         Case1: 
         ```
         grand oak community hospital
         ```
         
      3. Click **Save**.

      4. Similarly, add two other branches and change the **Case RegEx** value for the respective switch cases as follows.

         Case 2:
         ```
         clemency medical center
         ```
         Case3:
         ```
         pine valley community hospital
         ```

9. Click **Submit** to save the values for Switch mediator.

10.  Add a Log mediator to the first Case box of the Switch mediator and name it **Grand Oak Log**.  

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/grandoak-case-box.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/grandoak-case-box.png" alt="grandoak case box" width="60%"></a>

    !!! Info
        This prints a message indicating to which hospital the request message is being routed. 

11.  With the Log mediator selected, access the **Properties** tab and give the following details:
    <table>
    <tr>
        <th>Property</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Log Category</td>
        <td>
           <code>INFO</code> 
        </td>
        <td>
            Indicates that the log contains an informational message.
        </td>
    </tr>
    <tr>
        <td>Log Level</td>
        <td>
            <code>CUSTOM</code>
        </td>
        <td>
            Only specified properties will be logged by this mediator.
        </td>
    </tr>
    <tr>
        <td>Log Separator</td>
        <td>(blank)</td>
        <td>
           Since there is only one property that is being logged, we do not require a separator. Therefore, this field can be left blank. 
        </td>
    </tr>
    <tr>
        <td>Properties</td>
        <td colspan="2">
            Follow the steps given below to extract the stock symbol from the request and print a welcome message in the log:
            <ol>
                <li>
                    Click **Add Parameter** under **Properties**.
                </li>
                <li>
                    Add the following values:
                    <ul>
                        <li>
                            <b>Property Name</b> : `message`
                        </li>
                        <li> 
                            <b>Prperty Value</b> : `fn:concat('Routing to ', get-property('Hospital'))`
                            </br>Next, click on the `EX` icon, because the required properties for the log message must be extracted from the request, which we can do using an XPath expression.)
                        </li>
                    </ul>
                    <b>Note</b>: This XPath expression value gets the value stored in the Property mediator and concatenates the two strings to display the log message: `Routing to <hospital name>`
                </li>
                <li>
                    Click <b>Save</b>.
                </li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>Description</td>
        <td><code>GrandOak Log</code></td>
        <td>
           A description for the log mediator.
        </td>
    </tr>
    </table>

12. Click **Submit**.

13. Add a **Call Endpoint** mediator from the palette after the Log mediator.

    <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/add-call-mediator.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/add-call-mediator.png" alt="add call mediator" width="60%"></a>

14. On the **Call Endpoint** pane, select **GrandOakEP** from **Select Endpoint** dropdown.
15. Click **Submit**.

16. Similarly, add **Log mediators** in the other two **Case boxes** in the Switch mediator and then enter the same properties. Make sure to add a description for the two Log mediators as follows:

    -   `Clemency Log`
    -   `Pine Valley Log`

17. Add **Call** mediators after these log mediators and add the **ClemencyEP** and **PineValleyEP** endpoints respectively from the **Defined Endpoints** palette.

    !!! Info
        You have now configured the Switch mediator to log the `Routing to <Hospital Name>` message when a request is sent to this API resource. The request message will then be routed to the relevant hospital back-end service based on the hospital name that is sent in the request payload.

18. Add a **Log mediator** to the **Default** case of the Switch mediator and configure it the same way as the previous Log mediators.

     <a href="{{base_path}}/assets/img/learn/tutorials/message-routing/default-case.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/default-case.png" alt="default case" width="60%"></a>

    !!! Note
        Make sure to name this **Fault Log** and change its <b>Property Expression</b> as follows:`fn:concat('Invalid hospital - ', get-property('Hospital'))`

    The default case of the Switch mediator handles the invalid hospital requests that are sent to the request payload. This logs the message (`Invalid hospital - <Hospital Name>`) for requests that have the invalid hospital name.

19. Add a **Respond mediator** just after the **Switch** mediator to return the response from the health care service back to the client.

You have successfully created all the artifacts that are required for routing messages to a back-end service depending on the content in the request payload. 

<a href="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view.png"><img src="{{base_path}}/assets/img/learn/tutorials/message-routing/resource-view.png" alt="Resource view" width="80%"></a>

### Step 3: Build and run the artifacts

{!includes/build-and-run-artifacts.md!}

The artifacts will be deployed in the Micro Integrator server and the server will start.

- See the startup log in the **Console** tab.
- See the URLs of the deployed services and APIs in the **Runtime Services** tab.

### Step 4: Test the use case

Let's test the use case by sending a simple client request that invokes the service.

#### Start the back-end service

1. Download the JAR file of the back-end service from [here](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/Hospital-Service-JDK11-2.0.0.jar).
2. Open a terminal, navigate to the location where your saved the back-end service.
3. Execute the following command to start the service:

    ```bash
    java -jar Hospital-Service-JDK11-2.0.0.jar
    ```

#### Send the client request

Let's send a request to the API resource to make a reservation. You can use Postman application as follows:

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
          <code>http://host:port/categories/{category}/reserve</code>
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
        "appointment_date": "2025-04-02"
    }
    ```
3. Open a terminal and navigate to the directory where you have saved the `request.json` file.
4. Execute the following command.
    ```json
    curl -v -X POST --data @request.json http://localhost:8290/healthcare/categories/surgery/reserve --header "Content-Type:application/json"
    ```

#### Analyze the response

You will see the following response received to your <b>HTTP Client</b>:

```json
{"appointmentNumber":1,
    "doctor":
         {"name":"thomas collins",
          "hospital":"grand oak community hospital",
          "category":"surgery","availability":"9.00 a.m - 11.00 a.m",
          "fee":7000.0},
    "patient":
        {"name":"John Doe",
         "dob":"1990-03-19",
         "ssn":"234-23-525",
         "address":"California",
         "phone":"8770586755",
         "email":"johndoe@gmail.com"},
    "fee":7000.0,
"confirmed":false,
"appointmentDate":"2025-04-02"}
```

Now check the **Console** tab and you will see the following message: `INFO - LogMediator message = Routing to grand oak community hospital`
    
This is the message printed by the Log mediator when the message from the client is routed to the relevant endpoint in the Switch mediator.

You have successfully completed this tutorial and have seen how the requests received by the Micro Integrator can be routed to the relevant endpoint using the Switch mediator.
