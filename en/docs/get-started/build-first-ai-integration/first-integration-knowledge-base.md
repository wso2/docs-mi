# Build a Knowledge Base

In this tutorial, you'll learn how to create an Integration API to add and retrieve knowledge from a knowledge base using WSO2 MI, enabling seamless integration and deployment with minimal hassle.

## What you'll build

Let’s try a simple scenario where a bank creates a knowledge base to store documents that can be used to answer user queries.This Knowledge Base will enable the bank to provide accurate and efficient responses to customer inquiries.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/what_you_will_build.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/what_you_will_build.png" alt="Create New Project" width="40%"></a>

## What you'll learn

- Create an integration to access and manage a knowledge base efficiently.
- Seamlessly deploy and test the integration.

## Prerequisites

You need Visual Studio Code (VS Code) with the <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator">Micro Integrator for VS Code</a> extension installed. The MI for VS Code extension is the official developer tool for designing, developing, and testing integration solutions with WSO2 Micro Integrator.

!!! Info
    See the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) documentation to learn how to install Micro Integrator for VS Code.

Follow the instructions below to create your first Integration API.

## Step 1 - Create a new integration project

To develop the above scenario, let's get started with creating an integration project in the Micro Integrator extension installed VS Code.

1. Launch VS Code with the Micro Integrator extension installed.

2. Click on the Micro Integrator icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="MI VS Code Extension" width="80%"></a>

3. Click **Create New Project** on **Design View**. For more options for creating a new integration project, see [Create an Integration Project]({{base_path}}/develop/create-integration-project).

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project_btn.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project_btn.png" alt="Create New Project" width="80%"></a>

4. In the **Project Creation Form**, enter `BankIntegration` as the **Project Name**.

5. Ensure `4.4.0` is selected as the **Micro Integrator runtime version**.

6. Provide a location for the integration project under **Project Directory**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/create_new_project.png" alt="Create New Project" width="80%"></a>


7. Click **Create**.

   Once you click **Create**, the **Add Artifact** pane will be opened.

!!! note
    You need the following to work with the MI for VS Code extension.

    - Java Development Kit (JDK) version 21
    - WSO2 Micro Integrator (MI) 4.4.0 runtime

    If you don't have them installed on your local machine, these will be automatically prompted for downloading and configured by the Micro Integrator for VS Code extension during the project creation step:

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

Now the integration project is ready to add APIs. In this scenario, there will be two resources:

1. **Add Data to Knowledge Base**: This resource allows clients to add data to the knowledge base, enabling the system to store and manage information effectively.

2. **Get Data from Knowledge Base**: This resource retrieves data from the knowledge base, providing clients with relevant information based on their queries.

Let's create these APIs step by step.

1. In the **Add Artifact** interface, under **Create an Integration**, click on **API**. This opens the **API Form**.

    <a href="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-integration/add_artifact_api.png" alt="Create New Project" width="80%"></a>

2. Enter `KnowledgeBaseAPI` as the API **Name**. The API **Context** field will be automatically populated with the same value.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_api.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_api.png" alt="Create Chat API" width="60%"></a>

3. Click **Create**.

Once you create the API, a default resource will be automatically generated. You can see this default resource listed in the **Service Designer** under **Available resources**. You'll use this resource in this tutorial.

## Step 3 - Design the integration

Now it's time to design your API. This is the underlying logic that's executed behind the scenes when an API request is made. In this scenario, you need to send the user request to the LLM and send back the response from LLM to user. For that, you have to add a [Chat operation of AI Module]({{base_path}}/reference/connectors/ai-connector/ai-connector-reference/#operations). Follow the below steps to add a Chat operation.

<!-- !!! Tip "What is a connectors?"
    Mediators are the core building blocks of message processing in WSO2 Micro Integrator (MI). They define how messages are transformed and routed as they pass through an integration flow. To explore mediators in detail and understand how they work, see the [Mediator documentation]({{base_path}}/reference/mediators/about-mediators/). -->
1. Edit the default resource to `POST` and change resource path to `addToStore` by clicking the three dots icon in the resource.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_addToStore_resource.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_addToStore_resource.gif" alt="Create New Project" width="80%"></a>
    
2. Create a new resource with `POST` and set the resource path to `getFromStore` by clicking on the **+ Resource** button.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_getFromStore_resource.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_getFromStore_resource.gif" alt="Create New Project" width="80%"></a>

    Let's design the `addToStore` resource first.

2. Open the **Resource View** of the `addToStore` API resource by clicking the `POST` resource under **Available resources** on **Service Designer**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToStore_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToStore_resource.png" alt="Create New Project" width="80%"></a>

3. Define the expected payload in the start node to streamline the development process.

    !!! Note
        Setting an input payload for the integration flow is not mandatory. However, it is recommended, as it will be used to enable expression suggestions, which you will explore in later steps of this tutorial.

    Below is the expected payload for this API resource:
    ```
    {
        "content" : "This is a sample content"
    }
    ```
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_addToResource_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_addToResource_payload.gif" alt="Create New Project" width="80%"></a>

4. Once you open the **Resource View**, click on the **+** icon on the canvas to open the **Mediator Palette**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/click_add_mediator.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/click_add_mediator.png" alt="Create New Project" width="80%"></a>

5. Under **Mediators**, select the **+ Add Module**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/click_add_module.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/click_add_module.png" alt="Create New Project" width="80%"></a>

6. In the **Add Modules** pane, type `AI` in the **Search** field to locate the **AI Module**. Click **Download** to install the module.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/download_ai_module.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/chatbot/download_ai_module.gif" alt="Download AI Module" width="30%"></a>

7. Select the `Add to Knowledge` operation from the mediator panel.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToKnowledgeBase_operation.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_addToKnowledgeBase_operation.png" alt="Add Chat Operation" width="80%"></a>

8. Select the **+ Add new connection** in the **Vector Store Connection** field.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/vector_add_new_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/vector_add_new_connection.png" alt="Add Chat Operation" width="30%"></a>

9. On the **Add New Connection** page, choose your desired `Vector Database`. For this tutorial, we will be using `MI_VECTOR_STORE` as the database.   
`MI_VECTOR_STORE` is a built-in vector store that comes with the AI Module. It is a simple in-memory vector store that is suitable for development and testing purposes.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_vector_store_type.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_vector_store_type.png" alt="Add Chat Operation" width="40%"></a>

10. Complete the connection form by entering `KB_CONN` as the **Connection Name**.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_vector_store_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/create_vector_store_connection.png" alt="Add Chat Operation" width="50%"></a>

11. Next, we shall add the embedding model connection by clicking the **+ Add new connection** in the **Embedding model Connection** field.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/embedding_add_new_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/embedding_add_new_connection.png" alt="OpenAI Connection Form" width="30%"></a>

12. On the **Add New Connection** page, choose the **OPEN_AI** as the memory type.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_embedding_model_type.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_embedding_model_type.png" alt="OpenAI Connection Form" width="40%"></a>

13. Complete the connection form by entering `OPENAI_CONN` as the **Connection Name** and providing your API key in the **OpenAI Key** field.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/create_openai_connection.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/create_openai_connection.png" alt="OpenAI Connection Form" width="80%"></a>

14. Now, we shall complete the **Add To Knowledge** operation configuration by filling the `Input` field and disabling the `Parse`.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_addToKnowledge_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_addToKnowledge_operation.gif" alt="Set Chat Operation Payload" width="80%"></a>

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

15. Click on the **+** icon placed just after the Chat operation to open the **Mediator Palette**.

16. Select the **Respond** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_respond_mediator_addToKnowledge.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_respond_mediator_addToKnowledge.png" alt="Create New Project" width="80%"></a>

    Now we have completed the `addToStore` resource. Let's move on to the `getFromStore` resource.

17. Open the **Resource View** of the `getFromStore` API resource from the project explorer on the left side.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/go_to_getFromStore_resource.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/go_to_getFromStore_resource.png" alt="Create New Project" width="20%"></a>

18. Define the expected payload in the start node to streamline the development process.

    Below is the expected payload for this API resource:
    ```
    {
        "content" : "This is a sample content"
    }
    ```
    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_getFromKnowledge_payload.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/set_getFromKnowledge_payload.gif" alt="Create New Project" width="80%"></a>

19. Select the `Get from Knowledge` operation from the mediator panel.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_getFromKnowledge_operation.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/select_getFromKnowledge_operation.png" alt="Add Chat Operation" width="80%"></a>

20. Complete the form with the following values.

    **Vector Store Connection**: `KB_CONN`  
    **Embedding Model Connection**: `OPENAI_CONN`  
    **Input**: `payload.content` (with `EX` enabled)  
    **Overwrite Message Body**: `true`

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_getFromKnowledge_operation.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/add_getFromKnowledge_operation.gif" alt="Add Chat Operation" width="80%"></a>

    Now let's add a [Respond Mediator]({{base_path}}/reference/mediators/respond-mediator) to respond the message to the client.

21. Click the **+** icon placed just after the Chat operation to open the **Mediator Palette**.

22. Select the **Respond** mediator from the **Mediator Palette**, and click **Add** to add it to the integration flow.

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

Now that you have developed an integration using the Micro Integrator for the Visual Studio Code plugin, it's time to deploy the integration to the Micro Integrator server runtime.

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/build_and_run.png"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/build_and_run.png" alt="Create New Project" width="80%"></a>

## Step 5 - Test the Integration API

Now, let's test the Integration API. For that, you can use the inbuilt try-it functionality in the MI for VS Code extension.

When you run the integration as in [Step 4](#step-4-run-the-integration-api), the **Runtime Services** interface is opened up. You can see all the available services.

1. Select `KnowledgeBaseAPI` that you have developed and test the resource. 

    First, let's test the `addToStore` resource.

2. Expand the `POST /addToStore` resource and click on the **Try it** button.

3. Click on the **Try it out** button to try out the resource.  

4.  Let's give a sample content as the request payload.

    Here is a sample product brochure document of PineValley Bank,
    ```json
    {
    "content": "Article: Overview of Tax-Free Savings Account (TFSA)\nDocument Title: PineValley Bank – TFSA Product Brochure\nLast Updated: March 2025\nDocument Type: Product Brochure\nApplies To: All eligible Canadian residents aged 18 and older\n\nProduct Summary\nA Tax-Free Savings Account (TFSA) allows you to grow your savings and investment earnings tax-free. Contributions are not tax-deductible, but withdrawals (including any gains) are completely tax-free.\n\nWho Is It For?\n\n- Individuals looking to save or invest with flexibility\n- Customers with short- or long-term financial goals\n- Those who want to earn interest, dividends, or capital gains tax-free\n\nKey Features\n\n- Contribution Limit (2025): $7,000 (subject to change annually by CRA)\n- Unused Contribution Room: Carries forward indefinitely\n- Withdrawals: Tax-free and can be re-contributed the following year\n- Investment Options: GICs, stocks, ETFs, mutual funds, cash deposits\n- Eligibility: Canadian residents, 18+ years old, with valid SIN\n\nRegulatory Guidelines\n\n- Must comply with Canada Revenue Agency (CRA) limits and rules\n- Over-contributions are subject to a 1% monthly penalty\n- TFSA earnings do not affect federal income-tested benefits\n\nOnboarding Requirements\nTo open a TFSA with PineValley Bank:\n\n1. Provide proof of age (e.g., driver’s license or passport)\n2. Upload your Social Insurance Number (SIN)\n3. Complete a Risk Tolerance Questionnaire\n4. Agree to TFSA terms & conditions via e-signature\n\nEstimated completion time: 15–20 minutes\n\nFAQs\n\nQ: Can I open more than one TFSA account?\nA: Yes, but your total contributions across all accounts cannot exceed your CRA limit.\n\nQ: What happens if I withdraw money?\nA: Withdrawals are tax-free and re-added to your contribution room the next year.\n\nQ: Can I transfer my TFSA from another institution?\nA: Yes. We support direct TFSA transfers without affecting your contribution room."
    }
    ```

5. Click on the **Execute** button to execute the request.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_addToStore.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_addToStore.gif" alt="Test API" width="80%"></a>

    Next, let's test the `getFromStore` resource.

6. Scroll down to the `POST /getFromStore` resource and expand it.

7. Click on the **Try it out** button to try out the resource.

8. Let's give a keyword as the request payload to retrieve the stored data.

    Here is a sample request payload to retrieve the stored data,
    ```json
    {
        "content": "TFSA"
    }
    ```

9. Click on the **Execute** button to execute the request.

    <a href="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_getFromStore.gif"><img src="{{base_path}}/assets/img/get-started/build-first-ai-integration/knowledge-base/tryout_getFromStore.gif" alt="Test API" width="80%"></a>

Congratulations!
You have now created your first AI Integration API

## What's Next?  
So far, you have built a knowledge base and exposed it through an API. In the next tutorial, you will learn how to integrate this knowledge base with a Large Language Model (LLM) to enable Retrieval-Augmented Generation (RAG). This will allow you to create more advanced, context-aware integrations for enhanced user experiences.

Click on the **Next** button below to continue to the next tutorial.

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px;">
  <a href="{{base_path}}/get-started/build-first-ai-integration/first-integration-rag-chat/" class="md-button md-button--primary">Next →</a>
</div>
