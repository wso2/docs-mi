# Generate integrations using AI

Did you know that the WSO2 Integrator: MI component of WSO2 Integrator includes an AI-powered assistant to help you effortlessly generate integration flows?
In this guide, you'll use the [WSO2 Integrator Copilot]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/overview) to generate an API that retrieves weather information for a specified city and emails it to a designated recipient.

Check out this <a target="_blank" href="https://www.youtube.com/watch?v=XfXjwqhO9dY">video on YouTube</a> to see it in action.

## Let's get started!

### Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed.

!!! Info
    See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation to learn how to install WSO2 Integrator: MI for VS Code.

### Step 1: Create an integration project

{!includes/create-new-project.md!}

4. In the **Project Creation Form**, enter `AICodeDemo` as the **Project Name**.

5. Provide a location under the **Project Directory**.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-project-creation.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-project-creation.png" alt="create new project" width="80%"></a>

6. Click **Create**.

You will now see the project listed in the **Project Explorer**.

### Step 2: Open the Copilot panel and sign in

1. Click the **Open AI Panel** button in the top-right corner of VS Code.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-open-ai-panel.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-open-ai-panel.png" alt="open the Copilot panel" width="80%"></a>

2. Sign in with one of the three supported methods — **WSO2 Account** (default, free with usage quota), **Anthropic API key**, or **AWS Bedrock**. For this tutorial, signing in with your WSO2 Account is the simplest option.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-sign-in-ai.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-sign-in-ai.png" alt="sign in to the Copilot" width="80%"></a>

    !!! info
        For details on the three sign-in options, see [Sign in]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/overview/#sign-in).

### Step 3: Describe the integration to the Copilot

The Copilot opens a new chat session in **Edit mode** (the default). In this mode the Copilot can read, create, and edit files directly in your workspace. Every file it changes is captured on a **Checkpoint** card so you can review and undo before keeping the changes.

1. Make sure the mode pill in the input bar is set to **Edit**.

2. Attach the two OpenAPI specifications that describe the geolocation and weather endpoints by clicking the **Attach** <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-attach-files-btn.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-attach-files-btn.png" alt="attach files" width="30px"></a> button. Use [GeoLocationOAS.yaml]({{base_path}}/assets/attachments/quick-start-guide/how-to-guides/ai-code-gen/GeoLocationOAS.yaml) and [OpenWeatherOAS.yaml]({{base_path}}/assets/attachments/quick-start-guide/how-to-guides/ai-code-gen/OpenWeatherOAS.yaml).

3. Describe the integration you want to build. For example:

    ??? "Example Prompt"
        ```
        Create a REST API called WeatherEmailService at context /weatherEmail with a GET /getWeather resource that accepts city and email query parameters. Use the attached OpenAPI specs to call the OpenWeather geolocation endpoint to get coordinates for the city, then call the current-weather endpoint using those coordinates, and finally email the weather details to the email address in the request. Use the HTTP and Email connectors.
        ```

4. Press **Enter** to send the message.

    The Copilot will stream its progress in the chat panel:

    - It lays out a **todo list** of the work (for example, *add HTTP connector*, *add Email connector*, *create API*, *create connections*, *validate*).
    - You see live **tool call indicators** such as *Adding HTTP connector*, *Writing WeatherEmailService.xml*, and *Validating XML*.
    - The Copilot adds the required connectors to your `pom.xml`, triggers their download, creates the API file and the two connection local entries, and validates the generated XML against the language server.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-generate-btn.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-generate-btn.png" alt="Copilot generating the integration" width="80%"></a>

5. When the Copilot finishes, a **Checkpoint** card appears listing the files it created or changed. Open the **Design View** to confirm the API looks right.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-add-artifacts.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-add-artifacts.png" alt="generated artifacts and checkpoint" width="80%"></a>

    If something looks off, either click **Undo** on the Checkpoint card to roll back and rephrase your prompt, or send a follow-up message like *"Include the city name in the email subject."*

    When you're happy with the result, click **Accept** on the Checkpoint card.

    !!! Note
        Your generated flow may differ slightly from what's shown here — AI-generated designs can vary. For example, the Copilot may place the mediation logic in a separate sequence instead of inline.

    The generated API resembles the structure below:

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png" alt="generated API" width="80%"></a>

    ??? "WeatherEmailService API"
        === "Design View"
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-api.png" alt="ai-code-gen-api" width="70%"></a>

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
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-email-conn.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-email-conn.png" alt="http connection config" width="40%"></a>

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
            <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-connection.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-data-mapping/ai-data-mapping-http-connection.png" alt="http connection config" width="40%"></a>

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
        Before running the API, update the generated configurations with real credentials:

          - Update the email connection with the credentials of the sender's email account.
          - Update the `API_KEY` variable with your OpenWeather API key.

        You can ask the Copilot to open a specific file for you — for example, *"Open the Email connection so I can update the credentials."*

### Step 4: Build and run

You have two options for building and running the integration: ask the Copilot to do it, or click the **Build and Run** button yourself.

=== "Using the Copilot"

    Send a follow-up message:

    ```
    Build the project and start the server.
    ```

    The Copilot runs the Maven build, deploys the resulting `.car`, and starts the MI runtime. When the server is up, it posts a link to the Runtime Services panel in the chat.

=== "Using the Build and Run button"

    1. Click the **Build and Run** button to build and deploy the integration.

        <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-run-btn.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-run-btn.png" alt="build and run" width="80%"></a>

Once the server is running, **Runtime Services** opens. From that panel:

1. Select your API and click **Try It**.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-try.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-try.png" alt="try out swagger" width="80%"></a>

2. Click **Try it Out** to open the parameter form.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-op-try.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-op-try.png" alt="try out operation" width="80%"></a>

3. Provide the required query parameters and click **Execute**.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-exec.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-swagger-exec.png" alt="execute request" width="80%"></a>

4. Check the response and confirm that the weather details for the specified city were emailed to the address in the request.

    <a href="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-results.png" class="glightbox"><img src="{{base_path}}/assets/img/get-started/how-to-guides/ai-code-gen/ai-code-gen-results.png" alt="response" width="80%"></a>

Automating complex integrations has never been easier. Let the WSO2 Integrator Copilot do it for you and save yourself hours of effort!
