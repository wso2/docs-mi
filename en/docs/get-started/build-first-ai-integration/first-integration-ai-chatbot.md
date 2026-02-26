# Build an AI Chatbot

In this tutorial, you will learn how to create an AI chatbot using WSO2 MI, enabling seamless integration and hassle-free deployment.

## What you will build

In this tutorial, you will implement a chatbot, which will serve customer requests. The chatbot will be deployed as the `Chat` API in the WSO2 Integrator: MI, enabling seamless integration and hassle-free deployment.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/what_you_will_build.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/what_you_will_build.png" alt="Create New Project" width="60%"></a>

## What you will learn

- How to create an Integration API for building an AI chatbot.
- How to deploy and test the chatbot integration.

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed. The MI for VS Code extension is the official developer tool for designing, developing, and testing integration solutions with WSO2 Integrator: MI.

    !!! Info
        See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

2. You need an OpenAI API key to proceed. Visit the [OpenAI API Documentation](https://platform.openai.com/docs/api-reference) for more details on obtaining and managing your API key.

Follow the instructions below to create your first Integration API.

## Step 1 - Create a new integration project

To develop the above scenario, let us get started with creating an integration project in the WSO2 Integrator: MI extension installed VS Code.

1. Launch VS Code with the WSO2 Integrator: MI extension installed.

2. Click on the WSO2 Integrator: MI icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a>

3. Click **Create New Project** on **Design View**. For more options for creating a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project_btn.png" alt="Create New Project" width="80%"></a>

4. In the **Project Creation Form**, enter `BankIntegration` as the **Project Name**.

5. Ensure `4.6.0` is selected as the **WSO2 Integrator: MI runtime version**.

6. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project.png" alt="Create New Project" width="80%"></a>

7. Click **Create**.

   Once you click **Create**, the **Add Artifact** pane will be opened.

!!! note
    You need the following to work with the MI for VS Code extension.

    - Java Development Kit (JDK) version 21
    - WSO2 Integrator:  MI 4.6.0 runtime

    If you don't have them installed on your local machine, these will be automatically prompted for downloading and configured by the WSO2 Integrator: MI for VS Code extension during the project creation step:

    1. Click **Download Java & MI** to download and set up Java and MI runtime.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/download-java-and-mi.png" alt="Download Java and MI" width="80%"></a>

        !!! info
            If a different JDK or WSO2 MI version is installed on your local machine, you'll be prompted to download the required versions. 

            1. Click **Download** to install the required JDK or/and MI version(s).
            2. Once the download is complete, configure the Java Home or/and MI Home paths by clicking **Select Java Home** or/and **Select MI Path**, respectively.

            If the required JDK and WSO2 MI versions are already installed, you can directly configure the Java Home and MI Home paths in this step by clicking **Select Java Home** and **Select MI Path**, respectively.

        Once the process is complete, a window reload will be required, and you will be prompted with the following message:

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/reload-window.png" alt="Reload Window" width="80%"></a>

    2. Click **Reload Window**.

## Step 2 - Create an API

Now the integration project is ready to add an API. In this scenario, the API responds to the client with the response from the LLM. First, let us create an API.

1. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the **API Form**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png" alt="Create New Project" width="80%"></a>

2. Enter `ChatAPI` as the API **Name**. The API **Context** field will be automatically populated with the same value.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_bank_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/create_chat_api.png" alt="Create Chat API" width="80%"></a>

3. Click **Create**.

Once you create the API, a default resource will be automatically generated. You can see this default resource listed in the **Service Designer** under **Available resources**. You will use this resource in this tutorial.

## Step 3 - Design the integration

Now it is time to design your API. This is the underlying logic that's executed behind the scenes when an API request is made. In this scenario, you need to send the user request to the LLM and send back the response from LLM to user. For that, you have to add a [Chat operation of AI Module]({{base_path}}/reference/connectors/ai-module/ai-module-reference/#operations). Follow the below steps to add a Chat operation.  

!!! Tip "What is a connector?"
    - Connectors in WSO2 Integrator:  MI enable seamless integration with external systems, cloud platforms, and messaging services without the need for custom implementations. They provide a standardized way to send, receive, and process data from third-party applications like Salesforce, Kafka, and AWS services. To explore connectors in detail, see the [Connector documentation]({{base_path}}/reference/connectors/connectors-overview/).
    - In VS Code, you can view all available connectors by clicking **Add Module** under the **Mediators** tab in the **Mediator Palette**.

1. Change the method of the default resource to `POST` by clicking the three dots icon in the resource.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/change_resource_method.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/change_resource_method.gif" alt="Create New Project" width="80%"></a>

2. Open the **Resource View** of the API resource by clicking the `POST` resource under **Available resources** on **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/click_post_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/click_post_resource.png" alt="Create New Project" width="80%"></a>

3. Define the expected payload in the start node to streamline the development process.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions, which you will explore in later steps of this tutorial.

    Below is the expected payload for this API resource:
    ```
    {
        "userID":"abc123",
        "query":"Hi!"
    }
    ```
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/set_chat_resource_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/set_chat_resource_payload.gif" alt="Create New Project" width="80%"></a>

4. Once you open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/click_add_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/click_add_mediator.png" alt="Create New Project" width="80%"></a>

5. Under **Mediators**, select the **+ Add Module**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/click-add-module.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/click-add-module.png" alt="Create New Project" width="80%"></a>

6. In the **Add Modules** pane, type `AI` in the **Search** field to locate the **AI Module**. Click **Download** to install the module.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/download_ai_module.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/download_ai_module.gif" alt="Download AI Module" width="30%"></a>

7. Select the `chat` operation from the mediator panel.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/add_chat_operation.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/add_chat_operation.png" alt="Add Chat Operation" width="80%"></a>

8. Select the **+ Add new connection** in the **LLM Connection** field.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/add_new_llm_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/add_new_llm_connection.png" alt="Add Chat Operation" width="30%"></a>

9. On the **Add New Connection** page, choose your desired `LLM Provider`. For this tutorial, we will be using `OpenAI` as the provider.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/select_llm_provider.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/select_llm_provider.png" alt="Add Chat Operation" width="40%"></a>

10. Complete the connection form by entering `OPENAI_CONN` as the **Connection Name** and providing your API key in the **OpenAI Key** field.

    !!! note
        Refer to the [OpenAI API Documentation](https://platform.openai.com/docs/api-reference) to obtain your API key.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/create_openai_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/create_openai_connection.png" alt="OpenAI Connection Form" width="80%"></a>

11. For this tutorial, we will use file-based memory to store conversation history. 

    !!! note
        The memory connection is used to store the conversation history. This is useful for maintaining context in a conversation, especially when dealing with multiple turns of dialogue.
    
    !!! warning
        The file-based memory connection is not suitable for production use cases. It is intended only for development purposes. For production applications, it is recommended to use the database based memory.

    1. Click on the **+ Add new connection** in the **Memory Connection** field.
    2. In the **Add New Connection** page, select `FILE_MEMORY` as the **Memory Type**.
    3. Enter `FILE_MEMORY_CONN` as the **Connection Name**.
    4. Submit the form.  

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/add_file_memory.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/add_file_memory.gif" alt="Set Chat Operation Payload" width="80%"></a>

12. Now, we shall complete the **Chat** operation configuration by filling the `User Query/Prompt` field with the payload value.  

    Here, we will use the `query` value from the request payload as the user query for the Chat operation. Follow these steps to set it up:

    1. Click the **fx** icon next to the **User Query/Prompt** field to open the **Expression Editor**.
    2. In the **Expression Editor**, choose **Payload** and select the `query` field.
    3. Click **Add** to insert the expression into the field.

13. Next, enable the **Overwrite Body** option to ensure the API response body is replaced with the AI's output.  
    Otherwise, we need to manually set the response body using the [Payload Mediator]({{base_path}}/reference/mediators/payloadfactory-mediator/).
      
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/complete_chat_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/complete_chat_operation.gif" alt="Set Chat Operation Payload" width="80%"></a>

    Next, add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to send the AI's response back to the client.

14. Click on the **+** icon placed just after the Chat operation to open the **Mediator Palette**.

15. Select the **Respond** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/select_respond_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/select_respond_mediator.png" alt="Create New Project" width="80%"></a>

You may refer to the following API configuration for reference,

??? "Chat API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/chat_api_completed.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/chat_api_completed.png" alt="Create New Project" width="70%"></a>

    === "Source View"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/chatapi" name="ChatAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <ai.chat>
                        <connections>
                            <llmConfigKey>OPENAI_CONN</llmConfigKey>
                            <memoryConfigKey>FILE_MEMORY_CONN</memoryConfigKey>
                        </connections>
                        <sessionId>{${payload.userID}}</sessionId>
                        <prompt>${payload.query}</prompt>
                        <outputType>string</outputType>
                        <responseVariable>ai_chat_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                        <modelName>gpt-4o</modelName>
                        <temperature>0.7</temperature>
                        <maxTokens>4069</maxTokens>
                        <topP>1</topP>
                        <frequencyPenalty>0</frequencyPenalty>
                        <maxHistory>10</maxHistory>
                    </ai.chat>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ```

## Step 4 - Run the Integration API

After developing the integration using the WSO2 Integrator: MI extension for Visual Studio Code, deploy it to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/build_and_run.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/build_and_run.png" alt="Create New Project" width="80%"></a>

## Step 5 - Test the Integration API

Next, test the Integration API using the built-in 'Try it' functionality in the MI for VS Code extension.

When you run the integration as in [Step 4](#step-4-run-the-integration-api), the **Runtime Services** interface is opened up. You can see all the available services.

1. Select **Try it** of the `ChatAPI` that you have developed and test the resource.
2. Expand the `POST /` resource and click on the **Try it out** button.
3. Now you can enter the request payload in the **Request Body** field. For this tutorial, you can use the following payload:

    ```json
    {
        "userID":"001",
        "query":"Hi!"
    }
    ```
4. Click **Execute** to send the request to the API.  

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/tryout_chat.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/tryout_chat.gif" alt="Test API" width="80%"></a>

Here is the response returned by the Chat API:
```json
{
"content": "Hello! How can I assist you today?",
"tokenUsage": {
    "inputTokensDetails": {
    "cachedTokens": 0
    },
    "outputTokensDetails": {
    "reasoningTokens": 0
    },
    "inputTokenCount": 26,
    "outputTokenCount": 9,
    "totalTokenCount": 35
},
"finishReason": "STOP",
"toolExecutions": []
}
```
The AI's response is located in the `content` section of the API response. This field contains the message generated by the AI based on the user's query.

Congratulations!
Now, you have created your first AI Integration API.

## What's next?  

So far, you have used the LLM (OpenAI API in this case) to process client requests and generate responses. In the next tutorial, you will learn how to build a knowledge base. This will serve as a foundation for enhancing your chatbot's capabilities in future integrations.

Click on the **Next** button below to continue to the next tutorial.

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px;">
  <a href="{{base_path}}/get-started/build-first-ai-integration/first-integration-knowledge-base/" class="md-button md-button--primary">Next →</a>
</div>
