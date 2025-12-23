# Build an AI Agent

In the previous tutorial, you learned how to build a RAG application. In this tutorial, you’ll learn how to create an AI agent.

## What you'll build
PineValley Bank is introducing an AI-powered agent designed to assist users in making informed investment decisions and creating investment accounts tailored to their specific needs. This AI agent utilizes a knowledge base and a Large Language Model (LLM) to analyze user queries, provide personalized investment recommendations, and guide users through the account creation process. By integrating this AI agent into the `CustomerService` API deployed in WSO2 Integrator: MI, PineValley Bank aims to deliver seamless and efficient customer service, enhancing user satisfaction and experience.

### Tools Used by the AI Agent
1. **GetBankDocumentsTool**: Accesses PineValley Bank's documents from the knowledge base.
2. **CustomerInfoTool**: Retrieves customer information from PineValley Bank's internal database.
3. **InvestmentCreationTool**: Facilitates the creation of new investment accounts.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/what_you_will_build.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/what_you_will_build.png" alt="Create New Project" width="60%"></a>

Now, it's time to design the AI agent flow. Follow the steps below to create the agent integration.

## What you'll learn

- How to build an AI agent using WSO2 Integrator: MI.

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed.

    !!! Info
        See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

2. You must have completed the **Build a Knowledge Base** tutorial under **Build your first AI Integration** before proceeding. Start the [Build a Knowledge Base]({{base_path}}/get-started/build-first-ai-integration/first-integration-knowledge-base/) tutorial if you haven’t completed it yet.

Follow the instructions below to modify the existing project to add the RAG functionality.

## Step 1 - Create a new API

To develop the above scenario, let's get started with creating a new API in the existing `BankIntegration` project.

1. Click on the add new API (`+`) icon in the `APIs` in the **WSO2 Integrator: MI Project Explorer** to create a new API.

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
    **Memory Connection**: `FILE_MEMORY_CONN`  
    **User ID**: `payload.userID` (with `EX` enabled)  
    **Role**: `PineValley Bank Customer Assistant`  
    **Instructions**:
    ```text
    Your task is to recommend suitable investment products based on customer data,  
    assist with onboarding, and create investment accounts for requested products.  

    After creating the investment account, it will be sent to the manager for approval.  
    Once it is approved, it will get activated.  

    Use tools to retrieve official PineValley Bank documents like brochures and guidelines.  
    Provide clear, compliant explanations and step-by-step guidance.  

    Always base recommendations on retrieved information and ask for clarification if needed.  
    Products include Tax Free Saving Account, High-Interest Savings Account, and more.  

    Ensure all interactions are professional, accurate, and regulatory-compliant.
    ```  
    **User Query/Prompt**: `${payload}`  *(Tip: Click the `fx` icon next to the `User Query/Prompt` field, select **Payload** from the expression panel, choose `payload`, and click **Add** to insert this expression.)*  
    **Overwrite Message Body**: `true`

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_agent_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_agent_operation.gif" alt="Create New Project" width="80%"></a>

    Now that we added the `Agent` operation, we need to add tools to the agent.    
    
6. To proceed with this tutorial, we will mock the Bank's API to retrieve customer information and create investment accounts. Let's start by creating a mock API to fetch customer details. This mock API will serve as a tool for the AI agent to access customer information during the integration process. 

    1. Click on the **+** icon located just after the **APIs** to add a new API.

        <a href="{{base_path}}/assets/img/get-started/build-ai-first-integration/rag/create_new_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/create_new_api.png" alt="Create New Project" width="80%"></a>

    2. Create a new API named `BankMockAPI` by giving the name in the **Create API** form. Click **Create** to create the API.

    3. In the **Service Designer** pane of the `BankMockAPI`, modify the `Resource Path` to `/customerInfo` and `Method` to `POST`

    4. Open the diagram view by clicking on `POST /customerInfo` under **Available resources** in the **Service Designer**.  

    5. Click on the **+** icon on the canvas to open the **Mediator Palette**.  

    6. Select `Payload` mediator from the **Favourites** category in the **Mediator Palette**.  
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
        Now, we need to add a **Respond** mediator to respond to the client.

        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_mock_customer_info_api.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/create_mock_customer_info_api.gif" alt="Create New Project" width="80%"></a>

        Now that we have created the mock API to retrieve customer information, let's proceed to create another mock API for handling investment account creation.

    7. Go to **Service Designer**  of the `BankMockAPI`.  

        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/goto_mockAPI_serviceDesigner.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/goto_mockAPI_serviceDesigner.png" alt="Create New Project" width="80%"></a>

    8. In the **Service Designer** pane, select the **+ Resource** icon to add a new resource.  
        Set the following details in the **Create Resource** form.  
        **Resource Path**: `/createInvestmentAccount`  
        **Method**: `POST`.

    9. Open the diagram view by clicking on `POST /createInvestmentAccount` under **Available resources** in the **Service Designer**.

    10. Click on the **+** icon on the canvas to open the **Mediator Palette**.

    11. Select `Payload` mediator from the **Favourites** category in the **Mediator Palette**.  
        Give the following as the payload.

        ```json
        {
        "accountID": "INV12345",
        "status": "Pending Approval"
        }
        ```  

    11. Click **Add** to add the payload to the integration flow.  

    12. Now, we need to add a **Respond** mediator to respond to the client.

    Now that we have created the mock API to create investment accounts, let's proceed to add the tools to the agent.

7. Open the `POST /` resource of the `CustomerServiceAPI` again.

8. Click on the **+** icon located inside the **Agent** operation to open the **Mediator Palette** to add a `Tool`.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/click_add_tool.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/click_add_tool.png" alt="Create New Project" width="80%"></a>

9. Select `POST` from the **HTTP** category in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_http_post.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_http_post.png" alt="Create New Project" width="80%"></a>

10. Let's configure the tool with the following details.

    **Tool Name**: `CustomerInfoTool`  
    **Tool Description**: `Get customer information from PineValley Bank's internal database`

11. Once you have filled the above details, we need to create a connection to the `MockCustomerInfoAPI` we created earlier.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_create_mock_api_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_create_mock_api_connection.png" alt="Create New Project" width="30%"></a>

12. Select `HTTP` from the **Add New Connection** page.

13. Fill the form with the following details and click **Add** to add the connection.  

    **Connection Name**: `BankMockAPI_CONN`  
    **Base URL**: `http://localhost:8290/bankmockapi`

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_mock_api_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_mock_api_connection.png" alt="Create New Project" width="80%"></a>

    Click **Add** to add the connection.

    

14. In the **HTTP POST Tool** configuration, set the **Relative Path** as `/customerInfo`.

    Now, we need to configure the request payload in the tool configuration.

15. Click on the magic (<img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/ai_button.png" alt="Value from AI button" class="inline-icon">) in the `Request Body` field.  
    
    !!! Note
        Clicking on the (<img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/ai_button.png" alt="Value from AI button" class="inline-icon">) action designates the field as an argument for the tool, enabling the AI to populate the field with the necessary values dynamically.  
        After clicking the magic button, a new input field will appear where you can provide a description for the argument. This description helps the AI understand what needs to be filled for the argument.  

    Enter the following description in the new field that appears:  
    ```text
    Provide the customer ID in the following format: {userID: "C567"}
    ```  
    Click **Add** to add the tool.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_getCustomerInfo_tool.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_getCustomerInfo_tool.gif" alt="Create New Project" width="80%"></a>

    Next, let's add another tool to get the bank documents from the knowledge base.

16. Click on the **+** icon located inside the **Agent** operation to open the **Mediator Palette** to add a `Tool`.

17. Select `Get From Knowledge` from the **AI** category in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_getFromKnowledge_tool.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_getFromKnowledge_tool.png" alt="Create New Project" width="80%"></a>  

18. Let's configure the tool with the following details.

    **Tool Name**: `GetBankDocumentsTool`  
    **Tool Description**: `Get the PineValley bank documents from the knowledge base`  
    **Vector Store Connection**: `KB_CONN`  
    **Embedding Model Connection**: `OPENAI_CONN`  

19. Click on the magic (<img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/ai_button.png" alt="Value from AI button" class="inline-icon">) in the `Input` field.  
    We can leave the default description as it is.  

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_getFromKnowledge_tool.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/fill_getFromKnowledge_tool.gif" alt="Create New Project" width="80%"></a>

    Next, let's add the final tool to create the investment account.

20. Click on the **+** icon located inside the **Agent** operation to open the **Mediator Palette** to add a `Tool`.

21. Select `POST` from the **HTTP** category in the **Mediator Palette**.

22. Let's configure the tool with the following details.

    **Tool Name**: `InvestmentCreationTool`  
    **Tool Description**: `Create investment account for the customer`  
    **Connection**: `BankMockAPI_CONN`  
    **Relative Path**: `/createInvestmentAccount`  
    **Request Body**:  
    Click on the magic (<img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/ai_button.png" alt="Value from AI button" class="inline-icon">) in the `Request Body` field.  
    Enter the following description in the new field that appears:  
    ```text
    Provide the investment account details in the following format: {"userID":"C567", "investmentType":"HISA", "initialDeposit":5000, "investmentGoal":"Long-term growth"}
    ```
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_createInvestment_tool.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/add_createInvestment_tool.png" alt="Create New Project" width="25%"></a>

    Finally, click **Add** to add the tool.  

    Next, add the `Respond` mediator to finalize the integration flow and send a response back to the client.

20. Click on the **+** icon located just after the **Agent** operation to open the **Mediator Palette** to add a `Respond` mediator.

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
                            <memoryConfigKey>FILE_MEMORY_CONN</memoryConfigKey>
                        </connections>
                        <sessionId>{${payload.userID}}</sessionId>
                        <role>PineValley Bank Customer Assistant</role>
                        <instructions>Your task is to recommend suitable investment products based on customer data,
                            assist with onboarding, and create investment accounts for requested products.
                            After creating the investment account, it will be sent to the manager for approval.
                            Once it is approved, it will get activated.
                            Use tools to retrieve official PineValley Bank documents like brochures and guidelines.
                            Provide clear, compliant explanations and step-by-step guidance.
                            Always base recommendations on retrieved information and ask for clarification if needed.
                            Products include Tax Free Saving Account, High-Interest Savings Account, and more.
                            Ensure all interactions are professional, accurate, and regulatory-compliant.
        </instructions>
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
                        <tools>
                            <tool name="CustomerInfoTool" template="http_post_tool_1" resultExpression="${vars.http_post_759.payload}" description="Get customer information from PineValley Bank's internal database"/>
                            <tool name="GetBankDocumentsTool" template="ai_getFromKnowledge_tool_1" resultExpression="${vars.ai_getFromKnowledge_571.payload}" description="Get the PineValley bank documents from the knowledge base"/>
                            <tool name="InvestmentCreationTool" template="http_post_tool_2" resultExpression="${vars.http_post_809.payload}" description="Create investment account for the customer"/>
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

Now that you have updated the integration, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/build_and_run.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/build_and_run.png" alt="Create New Project" width="80%"></a>

## Step 4 - Test the integration service

1. Once the **Runtime Services** interface is open, select the `CustomerServiceAPI`, and click the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_tryout.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/select_tryout.png" alt="Create New Project" width="80%"></a>

2. Select the `/` resource and click **Try it Out** to test the API.   

    Let's first ask the agent about the investment options available.

    ```json
    {
        "userID": "001",
        "query": "What can I invest in?"
    }
    ```
    Give the above payload in the **Request Body** and click **Execute**.  

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/tryout_agent_1.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/tryout_agent_1.gif" alt="Create New Project" width="80%"></a>  

    You should see a response similar to the one below.

    ```json
    {
    "content": "Based on the PineValley Bank documents, here are some investment options available to you:\n\n1. **High-Interest Savings Account (HISA)**:\n   - Offers a competitive interest rate of 3.5% per annum.\n   - Minimum balance required is $1,000.\n   - Provides unlimited and free withdrawals.\n   - Suitable for US residents aged 18 and older.\n\n2. **Tax-Free Savings Account (TFSA)**:\n   - Allows tax-free growth on savings and investment earnings.\n   - Contributions are not tax-deductible, but all withdrawals are tax-free.\n   - The contribution limit for 2025 is $7,000 (subject to change annually).\n   - Suitable for Canadian residents aged 18 and older, with a valid SIN.\n   - Investment options include GICs, stocks, ETFs, mutual funds, and cash deposits.\n\nIf you have specific preferences or goals, please let me know so I can provide more tailored recommendations.",
    "tokenUsage": {
        "inputTokenCount": 21688,
        "outputTokenCount": 221,
        "totalTokenCount": 21909
    },
    "finishReason": "STOP",
    "toolExecutions": [
        {
        "request": {
            "id": "call_U209o5wZyxrHTas7oNWn8vdZ",
            "name": "ai_getFromKnowledge_tool_1",
            "arguments": "{\"input\":\"investment options PineValley Bank\"}"
        },
        "result": "[{\"score\":0.7656985474367457,\"embeddingId\":\"dd2d5a41-baed-4755-be81-82d5f49599a9\",\"embedding\":[...],\"embedded\":{\"text\":\"Article: Overview of Tax-Free Savings Account (TFSA)\\nDocument Title: PineValley Bank – TFSA Product Brochure\\nLast Updated: March 2025\\nDocument Type: Product Brochure\\nApplies To: All eligible Canadian residents aged 18 and older\\n\\nProduct Summary\\nA Tax-Free Savings Account (TFSA) allows you to grow your savings and investment earnings tax-free. Contributions are not tax-deductible, but withdrawals (including any gains) are completely tax-free.\\n\\nWho Is It For?\\n\\n- Individuals looking to save or invest with flexibility\\n- Customers with short- or long-term financial goals\\n- Those who want to earn interest, dividends, or capital gains tax-free\\n\\nKey Features\\n\\n- Contribution Limit (2025): $7,000 (subject to change annually by CRA)\\n- Unused Contribution Room: Carries forward indefinitely\\n- Withdrawals: Tax-free and can be re-contributed the following year\\n- Investment Options: GICs, stocks, ETFs, mutual funds, cash deposits\\n- Eligibility: Canadian residents, 18+ years old, with valid SIN\\n\\nRegulatory Guidelines\\n\\n- Must comply with Canada Revenue Agency (CRA) limits and rules\\n- Over-contributions are subject to a 1% monthly penalty\\n- TFSA earnings do not affect federal income-tested benefits\\n\\nOnboarding Requirements\\nTo open a TFSA with PineValley Bank:\\n\\n1. Provide proof of age (e.g., driver’s license or passport)\\n2. Upload your Social Insurance Number (SIN)\\n3. Complete a Risk Tolerance Questionnaire\\n4. Agree to TFSA terms & conditions via e-signature\\n\\nEstimated completion time: 15–20 minutes\\n\\nFAQs\\n\\nQ: Can I open more than one TFSA account?\\nA: Yes, but your total contributions across all accounts cannot exceed your CRA limit.\\n\\nQ: What happens if I withdraw money?\\nA: Withdrawals are tax-free and re-added to your contribution room the next year.\\n\\nQ: Can I transfer my TFSA from another institution?\\nA: Yes. We support direct TFSA transfers without affecting your contribution room.\",\"metadata\":{\"index\":\"0\"}}}]"
        }
    ]
    }
    ```

    In the response above, the agent utilized the `GetBankDocumentsTool` to retrieve information about the investment options available at PineValley Bank. It then formulated an answer based on the retrieved data to address the user's query effectively.  

    Now let's ask the agent to create an investment account for High-Interest Savings Account.

    ```json
    {
        "userID": "001",
        "query": "I want to create a High-Interest Savings Account with an initial deposit of $5000."
    }
    ```
    Give the above payload in the **Request Body** and click **Execute**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/tryout_agent_2.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/agent/tryout_agent_2.gif" alt="Create New Project" width="80%"></a>  

    You should see a response similar to the one below.

    ```json
    {
    "content": "Your High-Interest Savings Account (HISA) with an initial deposit of $5,000 has been successfully created and is currently pending approval. Here are the details:\n\n- **Account ID**: INV12345\n- **Status**: Pending Approval\n\nOnce the account is approved by the manager, it will become active. If you have any further questions or need assistance, feel free to ask!",
    "tokenUsage": {
        "inputTokenCount": 48122,
        "outputTokenCount": 126,
        "totalTokenCount": 48248
    },
    "finishReason": "STOP",
    "toolExecutions": [
        {
        "request": {
            "id": "call_ZuOsW99DaaQLv8LJd49jj55C",
            "name": "http_post_tool_2",
            "arguments": "{\"requestBodyJson\":\"{\\\"userID\\\":\\\"001\\\",\\\"investmentType\\\":\\\"HISA\\\",\\\"initialDeposit\\\":5000,\\\"investmentGoal\\\":\\\"Long-term growth\\\"}\"}"
        },
        "result": "{\"accountID\":\"INV12345\",\"status\":\"Pending Approval\"}"
        }
    ]
    }
    ```

    Here is the response from the agent extracted from the above response:

    ```markdown
    Your High-Interest Savings Account (HISA) with an initial deposit of $5,000 has been successfully created and is currently pending approval. Here are the details:  
    - **Account ID**: INV12345  
    - **Status**: Pending Approval  
      
    Once the account is approved by the manager, it will become active. If you have any further questions or need assistance, feel free to ask!
    ```

    In the response above, the agent utilized the `InvestmentCreationTool` to create a High-Interest Savings Account with an initial deposit of $5000. The account is currently pending approval, and once approved, it will become active.
    The agent also provided the account ID for reference.  
    This demonstrates how the agent can assist users in creating investment accounts and provide real-time updates on the status of their requests.

You have now learned how to create an AI agent to enhance your integration flow with automating tasks using AI.

## What's next?  

You have now completed this tutorial series, where you learned how to build a complete integration flow step by step. Throughout this journey, you have explored how to create AI chatbot, build a knowledge base, build RAG application, and develop an AI agent to enhance your integration flow.

Now, you can explore advanced integration scenarios, applying what you’ve learned to real-world use cases and expanding your expertise in WSO2 Integrator: MI.

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
