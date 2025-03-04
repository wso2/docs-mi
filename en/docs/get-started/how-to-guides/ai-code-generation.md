# Generate integrations using AI

Did you know that the WSO2 Micro Integrator component of WSO2 Integrator includes an AI-powered assistant to help you effortlessly generate integration flows?
In this guide, we are generating an API to retrieve weather information for a specified city and send it via email to a designated recipient.

## Let's get started!

### Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">Micro Integrator for VS Code</a> extension installed.

!!! Info
    See the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation to learn how to install Micro Integrator for VS Code.

### Step 1: Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `AICodeDemo` as the **Project Name**.

5. Provide a location under the **Project Directory**.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-project-creation.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-project-creation.png" alt="create new project" width="80%"></a>

6. Click **Create**.

You will now see the projects listed in the **Project Explorer**.

### Step 2: Setup MI Copilot

1. Click on the **Open AI Panel** button in the top left corner.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-open-ai-panel.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-open-ai-panel.png" alt="open ai panel" width="80%"></a>

2. Sign in to MI Copilot via the MI extension.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-sign-in-ai.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-sign-in-ai.png" alt="sign in to mi copilot" width="80%"></a>

### Step 3: Generate the mediation using MI Copilot

1. Describe the scenario that you need to generate the integration.
    
    ??? "Example Prompt"
        ```
        Generate a service to fetch weather data from a city name and email the weather details to the given email in the request. Refer to the attached OpenAPI Specifications for more details about the geolocation endpoint and weather endpoint.
        ```

2. Add any supporting files that are required to generate this integration such as OpenAPI specifications, schemas, etc., by clicking on the **Add Files** <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-attach-files-btn.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-attach-files-btn.png" alt="attach files" width="30px"></a> button. In this guide, we are using the [GeoLocationOAS.yaml]({{base_path}}/assets/attachments/quick-start-guide/how-to-guides/ai-code-gen/GeoLocationOAS.yaml) and [OpenWeatherOAS.yaml]({{base_path}}/assets/attachments/quick-start-guide/how-to-guides/ai-code-gen/OpenWeatherOAS.yaml) OpenAPI specifications.

3. Click on the **Generate** button and wait for the MI copilot to generate the necessary synapse configurations to work the scenario.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-generate-btn.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-generate-btn.png" alt="generate code" width="80%"></a>

4. Once the configurations are generated, add them to the project using the **Add to Project** button, which is in line with the artifact name.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-add-artifacts.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-add-artifacts.png" alt="add artifacts" width="80%"></a>

    The API will resemble the following structure once all the generated artifacts have been added.

    !!! Note 
        The generated view may differ from ours, as AI-generated designs can vary. For example, AI may create separate sequences for the Weather API calls and email operation.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png" alt="add artifacts" width="80%"></a>

    ??? "WeatherEmailService API"
        === "Design View"
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png" alt="ai-code-gen-api" width="70%"></a>
		    
        === "Source View"
            ```yaml
            <api xmlns="http://ws.apache.org/ns/synapse" name="WeatherEmailService" context="/weatherEmail">
                <resource methods="GET" uri-template="/getWeather?city={city}&amp;email={email}">
                    <inSequence>
                        <variable name="API_KEY" type="STRING" value="REPLACE_WITH_YOUR_KEY"/>
                        <http.get configKey="OpenWeather">
                            <relativePath>/geo/1.0/direct?q=${params.queryParams.city}&amp;limit=1&amp;appid=${vars.API_KEY}</relativePath>
                            <headers>[]</headers>
                            <forceScAccepted>false</forceScAccepted>
                            <disableChunking>false</disableChunking>
                            <forceHttp10>false</forceHttp10>
                            <noKeepAlive>false</noKeepAlive>
                            <responseVariable>http_get_1</responseVariable>
                            <overwriteBody>true</overwriteBody>
                        </http.get>
                        <http.get configKey="OpenWeather">
                            <relativePath>/data/2.5/weather?lat=${payload[0].lat}&amp;lon=${payload[0].lon}&amp;appid=${vars.API_KEY}</relativePath>
                            <headers>[]</headers>
                            <forceScAccepted>false</forceScAccepted>
                            <disableChunking>false</disableChunking>
                            <forceHttp10>false</forceHttp10>
                            <noKeepAlive>false</noKeepAlive>
                            <responseVariable>http_get_2</responseVariable>
                            <overwriteBody>true</overwriteBody>
                        </http.get>
                        <email.send configKey="EMAIL_CONN">
                            <from>weather@example.com</from>
                            <personalName></personalName>
                            <to>{${params.queryParams.email}}</to>
                            <cc></cc>
                            <bcc></bcc>
                            <replyTo></replyTo>
                            <subject>Weather Update</subject>
                            <content>{${payload}}</content>
                            <contentType>text/html</contentType>
                            <encoding>UTF-8</encoding>
                            <attachments></attachments>
                            <inlineImages>[]</inlineImages>
                            <contentTransferEncoding>Base64</contentTransferEncoding>
                        </email.send>
                        <respond/>
                    </inSequence>
                </resource>
            </api>
            ```

    ??? "Email Connection"
        === "Design View"
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-email-conn.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-email-conn.png" alt="http connection config" width="40%"></a>
		    
        === "Source View"
            ```yaml
            <?xml version="1.0" encoding="UTF-8"?>
            <localEntry key="EMAIL_CONN" xmlns="http://ws.apache.org/ns/synapse">
                <email.init>
                    <connectionType>SMTPS</connectionType>
                    <host>smtp.gmail.com</host>
                    <port>465</port>
                    <username>REPLACE</username>
                    <password>REPLACE</password>
                    <name>EMAIL_CONN</name>
                </email.init>
            </localEntry>
            ```
    
    ??? "HTTP Connection"
        === "Design View"
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-connection.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-connection.png" alt="http connection config" width="40%"></a>
		    
        === "Source View"
            ```yaml
            <?xml version="1.0" encoding="UTF-8"?>
            <localEntry key="OpenWeather" xmlns="http://ws.apache.org/ns/synapse">
                <http.init>
                    <connectionType>HTTPS</connectionType>
                    <baseUrl>https://api.openweathermap.org/</baseUrl>
                    <authType>None</authType>
                    <timeoutAction>Never</timeoutAction>
                    <retryCount>0</retryCount>
                    <retryDelay>0</retryDelay>
                    <suspendInitialDuration>-1</suspendInitialDuration>
                    <suspendProgressionFactor>1</suspendProgressionFactor>
                    <name>OpenWeather</name>
                </http.init>
            </localEntry>
            ```

    !!! Note
        After adding the synapse artifacts to the project, make sure to update the synapse configurations as follows,

          - Update the email connection with the credentials of the sender’s email account.
          - Update the `API_KEY` variable with the OpenWeather key obtained to retrieve the weather data.

### Step 4: Build and run

1. Click on the **Build and Run** button to build and deploy the integration.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-run-btn.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-run-btn.png" alt="build and run" width="80%"></a>

2. **Runtime Services** will open after the server is up and running, and from that panel, select the API that you need to try out using the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-try.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-try.png" alt="try out swagger" width="80%"></a>

3. Click the **Try it Out** button to provide the required query parameters.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-op-try.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-op-try.png" alt="try out operation" width="80%"></a>

4. Provide the required parameters and click the **Execute** button to invoke the API.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-exec.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-exec.png" alt="execute request" width="80%"></a>

5. Check the response received from the server and confirm that the weather details for the specified city have been successfully sent to the email address provided as a query parameter in the API request.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-results.png"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-results.png" alt="response" width="80%"></a>

Automating complex integrations has never been easier. Why spend time doing all this manually when the Micro Integrator Copilot can do it for you? Try it out today and save yourself hours of effort!
