# Connect a Knowledge Base to the Chatbot

In the previous tutorial, you learned how to build a knowledge base. In this tutorial, you’ll learn how to integrate it with a Large Language Model (LLM) for Retrieval-Augmented Generation (RAG).

## What you'll build
PineValley Bank needs to develop a chatbot powered by Retrieval-Augmented Generation (RAG) to assist customers in understanding the bank's offerings and products. This chatbot leverages a knowledge base built from the bank's documents, stored in a vector database, and integrates with a Large Language Model (LLM). By combining these technologies, the chatbot can retrieve relevant information and generate accurate, context-aware responses to customer queries, providing instant and personalized assistance.  

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/what_you_will_build.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/what_you_will_build.png" alt="Create New Project" width="60%"></a>

Now, it's time to design the RAG flow. Follow the steps below to create the RAG integration.

## What you'll learn

- How to create Retrieval-Augmented Generation (RAG) integration API.

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

2. Create a new API named `RAGChatAPI` by giving the name in the **Create API** form. Click **Create** to create the API.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/create_rag_chat_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/create_rag_chat_api.png" alt="Create New Project" width="80%"></a>

3. In the **Service Designer** pane, modify the `Resource Path` to `\chat` and the `Method` to `POST`. 

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/edit_resource.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/edit_resource.gif" alt="Create New Project" width="80%"></a>

## Step 2 - Design the integration

1. Open the **Resource View** of the newly created API resource by clicking the `POST /chat` resource under **Available resources** in the **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/open_resource_view.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/open_resource_view.png" alt="Create New Project" width="80%"></a>

2. After opening the **Resource View**, click on the **Start** node on the canvas to set an input payload for the integration flow.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions, which you will explore in later steps of this tutorial.

    Click **Add Request**, provide the following JSON payload, then click **Add**. Finally, click **Save** to complete the input payload setup.

    ```json
    {
        "userID": "C567",
        "query": "I want to invest in PineValley bank product"
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/set_start_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/set_start_payload.gif" alt="Create New Project" width="80%"></a>

3. Click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/add_new_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/add_new_mediator.png" alt="Create New Project" width="80%"></a>

6. Select `RAG Chat` operation from the **AI** category in the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/select_rag_chat.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/select_rag_chat.png" alt="Create New Project" width="80%"></a>

7. Fill the form with the following details and click **Add** to add the RAG Chat operation to the integration flow.

    We are going to reuse the same connections that we created in the previous tutorial.

    **Embedding Model Connection**: `OPENAI_CONN`  
    **Vector Store Connection**: `KB_CONN`  
    **LLM Connection**: `OPENAI_CONN`  
    **Memory Connection**: `FILE_MEMORY_CONN`  
    **User ID**: `payload.userID` (with `EX` enabled)  
    **User Query/Prompt**: `${payload.query}`  
    **Overwrite Message Body**: `true`  

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/add_rag_chat.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/add_rag_chat.gif" alt="Create New Project" width="80%"></a>

    Now let's add the respond mediator to respond to the client.

8. Click on the **+** icon located just after the **RAG Chat** operation to open the **Mediator Palette** to add a `Respond` mediator.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/add_respond_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/add_respond_mediator.png" alt="Create New Project" width="80%"></a>

You have successfully updated the integration flow to implement Retrieval-Augmented Generation (RAG) functionality.  
For reference, you can review the configured API.

??? "RAG Chat API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View"
        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/rag_chat_completed.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/rag_chat_completed.png" alt="ai datamapping api" width="70%"></a>

    === "Source View"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/ragchatapi" name="RAGChatAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/chat">
                <inSequence>
                    <ai.ragChat>
                        <connections>
                            <llmConfigKey>OPENAI_CONN</llmConfigKey>
                            <memoryConfigKey>FILE_MEMORY_CONN</memoryConfigKey>
                            <embeddingConfigKey>OPENAI_CONN</embeddingConfigKey>
                            <vectorStoreConfigKey>KB_CONN</vectorStoreConfigKey>
                        </connections>
                        <userID>{${payload.userID}}</userID>
                        <prompt>${payload.query}</prompt>
                        <outputType>string</outputType>
                        <responseVariable>ai_ragChat_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                        <embeddingModel>text-embedding-3-small</embeddingModel>
                        <maxResults>5</maxResults>
                        <minScore>0.75</minScore>
                        <modelName>gpt-4o</modelName>
                        <temperature>0.7</temperature>
                        <maxTokens>4069</maxTokens>
                        <topP>1</topP>
                        <frequencyPenalty>0</frequencyPenalty>
                        <maxHistory>10</maxHistory>
                    </ai.ragChat>
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

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/build_and_run.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/build_and_run.png" alt="Create New Project" width="80%"></a>

## Step 4 - Test the integration service

Let us test a scenario where a customer wants to know about the interest rate, minimum balance, and withdrawal rules for a High-Interest Savings Account (HISA) at PineValley Bank.

1. Once the **Runtime Services** interface is open, select the `RAGChatAPI`, and click the **Try It** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/select_tryout.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/select_tryout.png" alt="Create New Project" width="80%"></a>

2. Select the `/chat` resource and click **Try it Out** to test the API.  

    Provide a JSON payload and click the **Execute** button to invoke the API. You may use the following sample payload to test the API.

    ```json
    {
        "userID": "001",
        "query": "Can you tell me the interest rate and minimum balance for a High Interest Savings Account?"
    }
    ```

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/tryout_ragChat.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/rag/tryout_ragChat.gif" alt="Create New Project" width="80%"></a>
    
3. Review the following response to identify the sources retrieved from the vector database. The AI-generated response is available in the `content` section, while the relevant sources are listed in the `sources` section of the response.

    ```json
    {
    "content": "The High-Interest Savings Account (HISA) at PineValley Bank offers an interest rate of 3.5% per annum and requires a minimum balance of $1,000.",
    "tokenUsage": {
        "inputTokensDetails": {
        "cachedTokens": 0
        },
        "outputTokensDetails": {
        "reasoningTokens": 0
        },
        "inputTokenCount": 1073,
        "outputTokenCount": 38,
        "totalTokenCount": 1111
    },
    "sources": [
        {
        "textSegment": {
            "text": "Article: Overview of High-Interest Savings Account (HISA)\nDocument Title: PineValley Bank – HISA Product Brochure\nLast Updated: March 2025\nDocument Type: Product Brochure\nApplies To: All US residents aged 18 and older\n\nProduct Summary\nA High-Interest Savings Account (HISA) offers a competitive interest rate to help you grow your savings faster while maintaining easy access to your funds.\n\nKey Features\n\n- Interest Rate: 3.5% per annum\n- Minimum Balance: $1,000\n- Withdrawals: Unlimited and free\n- Eligibility: US residents, 18+ years old\n\nOnboarding Requirements\nTo open a HISA with PineValley Bank:\n\n1. Provide a valid government-issued ID\n2. Upload proof of address (e.g., utility bill)\n3. Agree to HISA terms & conditions via e-signature\n\nEstimated completion time: 10 minutes",
            "metadata": {
            "index": "0"
            }
        },
        "metadata": {}
        }
    ],
    "finishReason": "STOP",
    "toolExecutions": []
    }    
    ```

Congratulations!  
You have now learned how to create a Retrieval-Augmented Generation (RAG) application by integrating a knowledge base with a Large Language Model (LLM) to enhance your integration flow.

## What's next?  

So far, you have learned to create a RAG application by integrating the knowledge base with the LLM. In the next tutorial, you will learn how to create an AI assistant that can automate tasks, further enhancing your integration capabilities.

Click on the **Next** button below to continue to the next tutorial.

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px;">
  <a href="{{base_path}}/get-started/build-first-ai-integration/first-integration-ai-agent/" class="md-button md-button--primary">Next →</a>
</div>
