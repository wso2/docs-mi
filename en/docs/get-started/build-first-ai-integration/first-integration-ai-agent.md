# Build an AI Agent

In the previous tutorial, you learned how to build a RAG application. In this tutorial, you’ll learn how to create an AI agent.

## What you'll build

Let's consider a scenario where a client interacts with a `CustomerService` API deployed in WSO2 Micro Integrator. Upon receiving a query from the client, the API leverages an AI agent to provide instant customer service assistance. The AI agent uses a knowledge base and a Large Language Model (LLM) to understand the query and respond with accurate and helpful information tailored to the client's needs.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/what_you_will_build.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/what_you_will_build.png" alt="Create New Project" width="60%"></a>

Now, it's time to design the AI agent flow. Follow the steps below to create the agent integration.

## What you'll learn

- How to build an AI agent using WSO2 Micro Integrator.

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">Micro Integrator for VS Code</a> extension installed.

    !!! Info
        See the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install Micro Integrator for VS Code.

2. You must have completed the **Build a Knowledge Base** tutorial under **Build your first AI Integration** before proceeding. Start the [Build a Knowledge Base]({{base_path}}/get-started/build-first-ai-integration/first-integration-knowledge-base/) tutorial if you haven’t completed it yet.

Follow the instructions below to modify the existing project to add the RAG functionality.

## Step 1 - Create a new API

To develop the above scenario, let's get started with creating a new API in the existing `BankIntegration` project.

1. Click on the add new API (`+`) icon in the `APIs` in the **Micro Integrator Project Explorer** to create a new API.

    <a href="{{base_path}}/assets/img/get-started/build-ai-first-integration/rag/create_new_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/create_new_api.png" alt="Create New Project" width="80%"></a>

2. Create a new API named `CustomerServiceAPI` by giving the name in the **Create API** form. Click **Create** to create the API.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_api.png" alt="Create New Project" width="80%"></a>

3. In the **Service Designer** pane, modify the resource `Method` to `POST`. 

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/edit_resource.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/edit_resource.gif" alt="Create New Project" width="80%"></a>

## Step 2 - Design the integration

1. Open the **Resource View** of the newly created API resource by clicking the `POST /chat` resource under **Available resources** in the **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_resource.png" alt="Create New Project" width="80%"></a>

2. After opening the **Resource View**, click on the **Start** node on the canvas to set an input payload for the integration flow.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions, which you will explore in later steps of this tutorial.

    Click **Add Request**, provide the following JSON payload, then click **Add**. Finally, click **Save** to complete the input payload setup.

    ```json
    {
        "userID": "C567",
        "query": "What can I invest in?"
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/set_start_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/set_start_payload.gif" alt="Create New Project" width="80%"></a>

3. Click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_new_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_new_mediator.png" alt="Create New Project" width="80%"></a>

4. Select `Agent` operation from the **AI** category in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_agent_operation.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_agent_operation.png" alt="Create New Project" width="80%"></a>

5. Fill the form with the following details and click **Add** to add the RAG Chat operation to the integration flow.

    We are going to reuse the same connections that we created in the previous tutorial.

    **LLM Connection**: `OPENAI_CONN`  
    **User ID**: `payload.userID` (with `EX` enabled)  
    **Role**: `PineValley Bank Customer Assistant`  
    **Instructions**:
    ```text
    Your task is to both recommend the most suitable investment products based on customer profile data and provide general assistance to customers throughout their investment onboarding journey.
    Your Responsibilities:

    Use the provided tools to retrieve relevant context or supporting information from PineValley Bank’s internal knowledge base. This includes:

    Product brochures
    Regulatory guidelines
    Risk assessment materials
    If any customer profile information is missing or unclear, politely request clarification or additional details before proceeding.

    Explain investment products and onboarding steps in simple, compliant terms, referencing PineValley Bank’s official documents and materials.

    Recommend the most suitable investment product(s) for the customer’s profile based solely on the information retrieved from official documents. Do not assume or make up information beyond what is provided.

    Provide a clear, compliant explanation for any recommendation, ensuring that it aligns with relevant regulations and suitability guidelines.

    Answer general customer questions regarding investment account types, product features, onboarding requirements, and the application process. Start the chat with greeting the user with his name which can be got form the provided tools.

    Offer polite, step-by-step guidance, including instructions for uploading required documents and next steps.

    Products to Recommend & Explain:

    GICs
    TFSAs
    RRSPs
    RRIFs
    Qtrade Guided Portfolios
    Direct Investing (stocks, ETFs)
    Guidelines:

    Always ground your explanations and recommendations in retrieved documentation from PineValley Bank.
    Maintain a clear, conversational, and supportive tone.
    If unsure or if necessary information is missing, ask relevant follow-up questions without making assumptions.
    Do not make up investment products, regulatory information, or personalized advice beyond what is supported by official documentation.
    Ensure all interactions are compliant with regulatory and suitability standards.
    Example Interactions:

    “Based on your goal of long-term growth and balanced risk appetite, our Qtrade Guided Portfolios may be suitable. Would you like more information about this product?”
    “Could you please clarify your investment timeline or upload a document showing your financial goals? This will help me recommend the product that best fits your needs.”
    “TFSAs allow your investments to grow tax-free. I can help you open an account or explain how TFSAs compare with RRSPs, if you’d like.”
    Your goal is to make investing with PineValley Bank smooth, secure, and smart—by providing expert product recommendations and attentive assistance at every step.
    ```  
    **User Query/Prompt**: `${payload.query}`  
    **Overwrite Message Body**: `true`

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_agent_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_agent_operation.gif" alt="Create New Project" width="80%"></a>

    Now that we added the `Agent` operation, we need to add tools to the agent.  
    Let's create a mock API to get customer information. This API will be used as a tool for the agent to retrieve customer information.  

6. Click on the **+** icon located just after the **APIs** to add a new API.

    <a href="{{base_path}}/assets/img/get-started/build-ai-first-integration/rag/create_new_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/create_new_api.png" alt="Create New Project" width="80%"></a>

7. Create a new API named `MockCustomerInfoAPI` by giving the name in the **Create API** form. Click **Create** to create the API.

    <a href="{{base_path}}/assets/img/get-started/build-ai-first-integration/agent/create_mock_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_mock_api.png" alt="Create New Project" width="80%"></a>

8. In the **Service Designer** pane of the `MockCustomerInfoAPI`, modify the resource `Method` to `POST`.  

9. Open the diagram view by clicking on `POST /` under **Available resources** in the **Service Designer**.  

10. Click on the **+** icon on the canvas to open the **Mediator Palette**.  

11. Select `Payload` from the **Favourites** category in the **Mediator Palette**.  
    Give the following as the payload.

    ```json
    {
    "userID": "C567",
    "name": "John Doe",
    "age": 30,
    "investmentGoal": "Long-term growth"
    }
    ```  
    Click **Add** to add the payload to the integration flow.  
    Now, we need to add a `Respond` mediator to respond to the client.

12. Click on the **+** icon located just after the **Payload** mediator to open the **Mediator Palette** to add a `Respond` mediator.
    Click **Add** to add the `Respond` mediator to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_mock_customer_info_api.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_mock_customer_info_api.gif" alt="Create New Project" width="80%"></a>

    Now that we have created the mock API, we need to add it as a tool to the agent.  

13. Open the `POST /` resource of the `CustomerServiceAPI` again.

14. Click on the **+** icon located inside the **Agent** operation to open the **Mediator Palette** to add a `Tool`.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/click_add_tool.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/click_add_tool.png" alt="Create New Project" width="80%"></a>

15. Select `POST` from the **HTTP** category in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_http_post.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_http_post.png" alt="Create New Project" width="80%"></a>

16. Let's configure the tool with the following details.

    **Tool Name**: `CustomerInfoTool`
    **Tool Description**: `Get customer information from PineValley Bank's internal database`

17. Once you have filled the above details, we need to create a connection to the `MockCustomerInfoAPI` we created earlier.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_create_mock_api_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_create_mock_api_connection.png" alt="Create New Project" width="30%"></a>

18. Select `HTTP` from the **Add New Connection** page.

19. Fill the form with the following details and click **Add** to add the connection.  

    **Connection Name**: `CustomerMockAPIConn`  
    **Base URL**: `http://localhost:8290/mockcustomerinfoapi/`

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_mock_api_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_mock_api_connection.png" alt="Create New Project" width="80%"></a>

    Click **Add** to add the connection.

    Now, we need to configure the request payload in the tool configuration.

20. Click on the magic (<img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/ai_button.png" alt="Value from AI button" class="inline-icon">) in the `Request Body` field.  
    This action designates the field as an argument for the tool, enabling the AI to populate the request body with the necessary values dynamically.  

    After clicking the magic button, a new input field will appear where you can provide a description for the argument. This description helps the AI understand what needs to be filled for the argument.  

    Enter the following description:  
    ```text
    Provide the customer ID in the following format: {userID: "C567"}
    ```  
    Click **Add** to add the tool.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_http_post_tool.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_http_post_tool.gif" alt="Create New Project" width="80%"></a>

    Next, let's add another tool to get the bank documents from the knowledge base.

21. Click on the **+** icon located inside the **Agent** operation to open the **Mediator Palette** to add a `Tool`.

22. Select `Get From Knowledge` from the **AI** category in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_getFromKnowledge_tool.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_getFromKnowledge_tool.png" alt="Create New Project" width="80%"></a>  

23. Let's configure the tool with the following details.

    **Tool Name**: `GetBankDocumentsTool`  
    **Tool Description**: `Get the PineValley bank documents from the knowledge base`  
    **Vector Store Connection**: `KB_CONN`  
    **Embedding Model Connection**: `OPENAI_CONN`  

24. Click on the magic (<img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/ai_button.png" alt="Value from AI button" class="inline-icon">) in the `Input` field.  
    We can leave the default description as it is.  

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_getFromKnowledge_tool.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_getFromKnowledge_tool.gif" alt="Create New Project" width="80%"></a>

    Next, add the `Respond` mediator to finalize the integration flow and send a response back to the client.

8. Click on the **+** icon located just after the **Agent** operation to open the **Mediator Palette** to add a `Respond` mediator.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_respond_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_respond_mediator.png" alt="Create New Project" width="80%"></a>

You have successfully updated the integration flow to implement the customer assistance agent.  
For reference, you can review the configured API.

??? "Customer Service API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/agent_completed.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/agent_completed.png" alt="ai datamapping api" width="70%"></a>

    === "Source View"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/customerserviceapi" name="CustomerServiceAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/">
                <inSequence>
                    <ai.agent>
                        <connections>
                            <llmConfigKey>OPENAI_CONN</llmConfigKey>
                            <memoryConfigKey></memoryConfigKey>
                        </connections>
                        <userID>{${payload.userID}}</userID>
                        <role>PineValley Bank Customer Assistant</role>
                        <instructions><![CDATA[Your task is to both recommend the most suitable investment products based on customer profile data and provide general assistance to customers throughout their investment onboarding journey.
        Your Responsibilities:

        Use the provided tools to retrieve relevant context or supporting information from PineValley Bank’s internal knowledge base. This includes:

        Product brochures
        Regulatory guidelines
        Risk assessment materials
        If any customer profile information is missing or unclear, politely request clarification or additional details before proceeding.

        Explain investment products and onboarding steps in simple, compliant terms, referencing PineValley Bank’s official documents and materials.

        Recommend the most suitable investment product(s) for the customer’s profile based solely on the information retrieved from official documents. Do not assume or make up information beyond what is provided.

        Provide a clear, compliant explanation for any recommendation, ensuring that it aligns with relevant regulations and suitability guidelines.

        Answer general customer questions regarding investment account types, product features, onboarding requirements, and the application process. Start the chat with greetig the user with his name which can be got form the provided tools.

        Offer polite, step-by-step guidance, including instructions for uploading required documents and next steps.

        Products to Recommend & Explain:

        GICs
        TFSAs
        RRSPs
        RRIFs
        Qtrade Guided Portfolios
        Direct Investing (stocks, ETFs)
        Guidelines:

        Always ground your explanations and recommendations in retrieved documentation from PineValley Bank.
        Maintain a clear, conversational, and supportive tone.
        If unsure or if necessary information is missing, ask relevant follow-up questions without making assumptions.
        Do not make up investment products, regulatory information, or personalized advice beyond what is supported by official documentation.
        Ensure all interactions are compliant with regulatory and suitability standards.
        Example Interactions:

        “Based on your goal of long-term growth and balanced risk appetite, our Qtrade Guided Portfolios may be suitable. Would you like more information about this product?”
        “Could you please clarify your investment timeline or upload a document showing your financial goals? This will help me recommend the product that best fits your needs.”
        “TFSAs allow your investments to grow tax-free. I can help you open an account or explain how TFSAs compare with RRSPs, if you’d like.”
        Your goal is to make investing with PineValley Bank smooth, secure, and smart—by providing expert product recommendations and attentive assistance at every step.
        ]]></instructions>
                        <prompt>${payload.query}</prompt>
                        <responseVariable>ai_agent_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                        <modelName>gpt-4o</modelName>
                        <temperature>0.7</temperature>
                        <maxTokens>4069</maxTokens>
                        <topP>1</topP>
                        <frequencyPenalty>0</frequencyPenalty>
                        <maxHistory>10</maxHistory>
                        <toolExecutionTimeout>10</toolExecutionTimeout>
                        <agentID>ca09d35c-77f7-4036-a8e7-5fcd63056f77</agentID>
                        <tools>
                            <tool name="CustomerInfoTool" template="http_post_tool_0" resultExpression="${vars.http_post_223.payload}" description="Get customer information from PineValley Bank's internal database"/>
                            <tool name="GetBankDocumentsTool" template="ai_getFromKnowledge_tool_0" resultExpression="${vars.ai_getFromKnowledge_358.payload}" description="Get the PineValley bank documents from the knowledge base"/>
                        </tools>
                    </ai.agent>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ```

## Step 3 - Run the integration

Now that you have updated the integration, it's time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/build_and_run.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/build_and_run.png" alt="Create New Project" width="80%"></a>

## Step 4 - Test the integration service

1. Once the **Runtime Services** interface is open, select the `CustomerServiceAPI`, and click the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_tryout.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_tryout.png" alt="Create New Project" width="80%"></a>

2. Select the `/` resource and click **Try it Out** to test the API.  
    Provide a JSON payload and click the **Execute** button to invoke the API. You may use the following sample payload to test the API.

    ```json
    {
        "userID": "C567",
        "query": "What can I invest in?"
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/tryout_agent.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/tryout_agent.gif" alt="Create New Project" width="80%"></a>  

You have now learned how to create an AI agent to enhance your integration flow with automating tasks using AI.

## What's Next?  

You have now completed this tutorial series, where you learned how to build a complete integration flow step by step. Throughout this journey, you have explored how to create AI chatbot, build a knowledge base, build RAG application, and develop an AI agent to enhance your integration flow.

Now, you can explore advanced integration scenarios, applying what you’ve learned to real-world use cases and expanding your expertise in WSO2 Micro Integrator.

Try more [tutorials and examples]({{base_path}}/learn/learn-overview/).

{% raw %}
<style>
.language-bash {
    color: var(--md-feedback-button-color) !important;
}
.language-bash .hljs-string, .hljs-keyword {
    color: var(--md-feedback-button-color) !important;
}
.language-bash .hljs-variable {
    font-weight: 600;
    color: rgb(45, 116, 215) !important;
}
</style>
{% endraw %}
