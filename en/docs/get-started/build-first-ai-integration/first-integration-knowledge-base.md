# Build a Knowledge Base

In this tutorial, you'll learn how to create an Integration API to add and retrieve knowledge from a knowledge base using WSO2 MI, enabling seamless integration and deployment with minimal hassle.

## What you'll build

PineValley Bank needs to create a knowledge base to store its product-related documents and enable efficient search capabilities. To achieve this, the bank has decided to use a vector database as the solution. In this tutorial, we will build a vector database and access it using WSO2 Integrator:  MI with the help of the AI Module. This integration will allow the bank to provide accurate and efficient responses to customer inquiries by leveraging advanced search and retrieval mechanisms.

In this tutorial, you will build two API resources to interact with the vector database:

1. **Add Data to Knowledge Base**: This resource allows you to add information to the vector database. It processes the input data, generates embeddings using an AI model, and stores the data in the vector database for efficient retrieval.

2. **Retrieve Data from Knowledge Base**: This resource enables you to query the vector database and retrieve relevant information based on the input query. It uses embeddings to perform similarity searches and returns the most relevant results.

These resources will form the foundation of your knowledge base API, enabling seamless data storage and retrieval.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/what_you_will_build.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/what_you_will_build.png" alt="Create New Project" width="60%"></a>

## What you'll learn

- Create an integration to access and manage a knowledge base efficiently.
- Seamlessly deploy and test the integration.

## Prerequisites

1. You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">WSO2 Integrator: MI for VS Code</a> extension installed. The MI for VS Code extension is the official developer tool for designing, developing, and testing integration solutions with WSO2 Integrator: MI.

    !!! Info
        See the [Install WSO2 Integrator: MI for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install WSO2 Integrator: MI for VS Code.

2. In the earlier tutorial, we created a new project in the WSO2 Integrator: MI extension for VS Code. You can continue using that same project here. If you haven’t created a project yet, follow the steps in the [Create a new project]({{base_path}}/develop/create-integration-project/) documentation to set one up.

Follow the steps below to create the Knowledge Base API.

## Step 1 - Create an API

Let's create these APIs step by step.

1. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the **API Form**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png" alt="Create New Project" width="80%"></a>

2. Enter `KnowledgeBaseAPI` as the API **Name**. The API **Context** field will be automatically populated with the same value.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_api.png" alt="Create Chat API" width="60%"></a>

3. Click **Create**.

Once you create the API, a default resource will be automatically generated. You can see this default resource listed in the **Service Designer** under **Available resources**. You'll use this resource in this tutorial.

## Step 3 - Design the integration

Now it's time to design your API. This is the underlying logic that's executed behind the scenes when an API request is made. In this scenario, you need to process user requests to add data to or retrieve data from the Knowledge Base. For that, you have to add the [Add to Knowledge]({{base_path}}/reference/connectors/ai-module/ai-module-reference/#operations) and [Get from Knowledge]({{base_path}}/reference/connectors/ai-module/ai-module-reference/#operations) operations of the AI Module.

Follow the steps below to design these operations.

1. Edit the default resource to `POST` and change resource path to `addToStore` by clicking the three dots icon in the resource.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_addToStore_resource.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_addToStore_resource.gif" alt="Create New Project" width="80%"></a>
    
2. Create a new resource with `POST` and set the resource path to `getFromStore` by clicking on the **+ Resource** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_getFromStore_resource.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_getFromStore_resource.gif" alt="Create New Project" width="80%"></a>

    Let's design the `addToStore` resource first.

3. Open the **Resource View** of the `addToStore` API resource by clicking the `POST` resource under **Available resources** on **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToStore_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToStore_resource.png" alt="Create New Project" width="80%"></a>

4. Define the expected payload in the start node to streamline the development process.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions, which you will explore in later steps of this tutorial.

    Below is the expected payload for this API resource:
    ```
    {
        "content" : "This is a sample content"
    }
    ```
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_addToResource_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_addToResource_payload.gif" alt="Create New Project" width="80%"></a>

5. Once you open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/click_add_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/click_add_mediator.png" alt="Create New Project" width="80%"></a>

6. Under **Mediators**, go to **AI** section and select the **Add to Knowledge** operation.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToKnowledgeBase_operation.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToKnowledgeBase_operation.png" alt="Create New Project" width="80%"></a>

7. Select the **+ Add new connection** in the **Vector Store Connection** field.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/vector_add_new_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/vector_add_new_connection.png" alt="Add Chat Operation" width="30%"></a>

8. On the **Add New Connection** page, choose your desired `Vector Database`. For this tutorial, we will be using `MI_VECTOR_STORE` as the database.

    !!! Note
        `MI_VECTOR_STORE` is a built-in vector store that comes with the AI Module. It is a simple in-memory vector store that is suitable for development and testing purposes.

    !!! Warning
        The `MI_VECTOR_STORE` is not recommended for production use. For production, you can use any of the supported vector stores such as `Pinecone`, `Chroma DB`, `PGVector`.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_vector_store_type.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_vector_store_type.png" alt="Add Chat Operation" width="40%"></a>

9. Complete the connection form by entering `KB_CONN` as the **Connection Name**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_vector_store_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_vector_store_connection.png" alt="Add Chat Operation" width="50%"></a>

10. Next, add the embedding model connection. You can reuse the existing OpenAI connection (`OPENAI_CONN`) created for the LLM in the previous tutorial as the embedding model connection.  

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_embedding_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_embedding_connection.png" alt="OpenAI Connection Form" width="80%"></a>

    If you don't have an existing connection, you can create a new one by following these steps:

    1. In the **Embedding Model Connection** field, click on the **Add new connection** link.  
    2. Choose **OpenAI** as the connection type from the available options.  
    3. Provide `OPENAI_CONN` as the **Connection Name**.  
    4. Enter your **API Key** in the designated field.  
    5. Click **Add** to finalize and store the connection.   

11. Now, we shall complete the **Add To Knowledge** operation configuration by filling the `Input` field and disabling the `Parse`.  

    !!! note
        Enable parsing only when the input is an encoded string. If you are sending plain text content, you can safely disable the `Parse` option.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_addToKnowledge_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_addToKnowledge_operation.gif" alt="Set Chat Operation Payload" width="80%"></a>

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

12. Click on the **+** icon placed just after the Chat operation to open the **Mediator Palette**.

13. Select the **Respond** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_respond_mediator_addToKnowledge.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_respond_mediator_addToKnowledge.png" alt="Create New Project" width="80%"></a>

    Now we have completed the `addToStore` resource. Let's move on to the `getFromStore` resource.

14. Open the **Resource View** of the `getFromStore` API resource from the project explorer on the left side.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/go_to_getFromStore_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/go_to_getFromStore_resource.png" alt="Create New Project" width="20%"></a>

15. Define the expected payload in the start node to streamline the development process.

    Below is the expected payload for this API resource:
    ```
    {
        "content" : "This is a sample content"
    }
    ```
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_getFromKnowledge_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_getFromKnowledge_payload.gif" alt="Create New Project" width="80%"></a>

16. Select the `Get from Knowledge` operation from the mediator panel.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_getFromKnowledge_operation.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_getFromKnowledge_operation.png" alt="Add Chat Operation" width="80%"></a>

17. Complete the form with the following values.

    **Vector Store Connection**: `KB_CONN`  
    **Embedding Model Connection**: `OPENAI_CONN`  
    **Input**: `payload.content` (with `EX` enabled)  
    **Overwrite Message Body**: `true`

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_getFromKnowledge_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_getFromKnowledge_operation.gif" alt="Add Chat Operation" width="80%"></a>

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

18. Click the **+** icon placed just after the Chat operation to open the **Mediator Palette**.

19. Select the **Respond** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_respond_mediator_getFromKnowledge.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_respond_mediator_getFromKnowledge.png" alt="Create New Project" width="80%"></a>

You may refer to the following API configuration for reference,

??? "Knowledge Base API"

    !!! info
        You can view the source view by clicking on the **Show Source** (`</>`) icon located in the top right corner of the VS Code.

    === "Design View (Add to Knowledge Base Resource)"
        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/addToStore_resource_completed.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/addToStore_resource_completed.png" alt="Create New Project" width="70%"></a>

    === "Design View (Get from Knowledge Base Resource)"
        <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/getFromStore_resource_completed.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/getFromStore_resource_completed.png" alt="Create New Project" width="70%"></a>

    === "Source View"
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <api context="/knowledgebaseapi" name="KnowledgeBaseAPI" xmlns="http://ws.apache.org/ns/synapse">
            <resource methods="POST" uri-template="/addToStore">
                <inSequence>
                    <ai.addToKnowledge>
                        <connections>
                            <embeddingConfigKey>OPENAI_CONN</embeddingConfigKey>
                            <vectorStoreConfigKey>KB_CONN</vectorStoreConfigKey>
                        </connections>
                        <input>{${payload.content}}</input>
                        <needParse>false</needParse>
                        <needSplit>true</needSplit>
                        <splitStrategy>Recursive</splitStrategy>
                        <maxSegmentSize>1000</maxSegmentSize>
                        <maxOverlapSize>200</maxOverlapSize>
                        <needEmbedding>true</needEmbedding>
                        <embeddingModel>text-embedding-3-small</embeddingModel>
                        <responseVariable>ai_addToKnowledge_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </ai.addToKnowledge>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
            <resource methods="POST" uri-template="/getFromStore">
                <inSequence>
                    <ai.getFromKnowledge>
                        <connections>
                            <embeddingConfigKey>OPENAI_CONN</embeddingConfigKey>
                            <vectorStoreConfigKey>KB_CONN</vectorStoreConfigKey>
                        </connections>
                        <input>{${payload.content}}</input>
                        <needEmbedding>true</needEmbedding>
                        <embeddingModel>text-embedding-3-small</embeddingModel>
                        <maxResults>5</maxResults>
                        <minScore>0.75</minScore>
                        <responseVariable>ai_getFromKnowledge_1</responseVariable>
                        <overwriteBody>true</overwriteBody>
                    </ai.getFromKnowledge>
                    <respond/>
                </inSequence>
                <faultSequence>
                </faultSequence>
            </resource>
        </api>
        ```

## Step 4 - Run the Integration API

Now that you have developed an integration using the WSO2 Integrator: MI for the Visual Studio Code plugin, it's time to deploy the integration to the WSO2 Integrator: MI server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/build_and_run.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/build_and_run.png" alt="Create New Project" width="80%"></a>

## Step 5 - Test the Integration API

Now, let's test the Integration API. For that, you can use the inbuilt try-it functionality in the MI for VS Code extension.

When you run the integration as in [Step 4](#step-4-run-the-integration-api), the **Runtime Services** interface is opened up. You can see all the available services.

1. Select `KnowledgeBaseAPI` that you have developed and test the resource. 

    First, let's test the `addToStore` resource.

2. Expand the `POST /addToStore` resource and click on the **Try it** button.

3. Click on the **Try it out** button to try out the resource.  

4. Let's give a sample content as the request payload. Below is the product brochure of the High-Interest Savings Account (HISA) offered by PineValley Bank. Let us add this to the knowledge base.

    ```text
    Article: Overview of High-Interest Savings Account (HISA)
    Document Title: PineValley Bank – HISA Product Brochure
    Last Updated: March 2025
    Document Type: Product Brochure
    Applies To: All US residents aged 18 and older

    Product Summary
    A High-Interest Savings Account (HISA) offers a competitive interest rate to help you grow your savings faster while maintaining easy access to your funds.

    Key Features

    - Interest Rate: 3.5% per annum
    - Minimum Balance: $1,000
    - Withdrawals: Unlimited and free
    - Eligibility: US residents, 18+ years old

    Onboarding Requirements
    To open a HISA with PineValley Bank:

    1. Provide a valid government-issued ID
    2. Upload proof of address (e.g., utility bill)
    3. Agree to HISA terms & conditions via e-signature

    Estimated completion time: 10 minutes
    ```
    You can use the following JSON payload to add the above content to the knowledge base,
    ```json
    {
        "content": "Article: Overview of High-Interest Savings Account (HISA)\nDocument Title: PineValley Bank – HISA Product Brochure\nLast Updated: March 2025\nDocument Type: Product Brochure\nApplies To: All US residents aged 18 and older\n\nProduct Summary\nA High-Interest Savings Account (HISA) offers a competitive interest rate to help you grow your savings faster while maintaining easy access to your funds.\n\nKey Features\n\n- Interest Rate: 3.5% per annum\n- Minimum Balance: $1,000\n- Withdrawals: Unlimited and free\n- Eligibility: US residents, 18+ years old\n\nOnboarding Requirements\nTo open a HISA with PineValley Bank:\n\n1. Provide a valid government-issued ID\n2. Upload proof of address (e.g., utility bill)\n3. Agree to HISA terms & conditions via e-signature\n\nEstimated completion time: 10 minutes"
    }
    ```

5. Click on the **Execute** button to execute the request.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_addToStore.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_addToStore.gif" alt="Test API" width="80%"></a>

Now that we have added some knowledge to the knowledge base, let's proceed to retrieve it using the `getFromStore` resource.  
Let us retrieve the information available in the knowledge base about the savings account products offered by PineValley Bank.

1. Scroll down to the `POST /getFromStore` resource and expand it.

2. Click on the **Try it out** button to try out the resource.

3. Let's give a keyword as the request payload to retrieve the stored data.

    Here is a sample request payload to retrieve the stored data,
    ```json
    {
        "content": "High Interest Savings Account"
    }
    ```

4. Click on the **Execute** button to execute the request.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_getFromStore.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_getFromStore.gif" alt="Test API" width="80%"></a>

Congratulations!  
You have successfully created your first Knowledge Base Integration API, enabling seamless interaction with a knowledge base.

## What's next?  
So far, you have built a knowledge base and exposed it through an API. In the next tutorial, you will learn how to integrate this knowledge base with a Large Language Model (LLM) to enable Retrieval-Augmented Generation (RAG). This will allow you to create more advanced, context-aware integrations for enhanced user experiences.

Click on the **Next** button below to continue to the next tutorial.

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px;">
  <a href="{{base_path}}/get-started/build-first-ai-integration/first-integration-rag-chat/" class="md-button md-button--primary">Next →</a>
</div>
