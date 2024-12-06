# MI Copilot

The WSO2 Micro Integrator (MI) Copilot is an AI-powered tool that simplifies the process of creating integration scenarios. It allows you to specify integration requirements using natural language or by providing relevant files, such as OpenAPI specifications. MI Copilot generates the necessary integration artifacts, which can be seamlessly incorporated into your projects. You can iteratively refine your projects through conversational prompts, enabling the addition of features or modifications with ease. This approach supports incremental development, allowing you to build and enhance your integration projects over time.

1. [Create a new integration project]({{base_path}}/develop/create-integration-project) or [open an existing integration project]({{base_path}}/develop/opening-projects).

2. Click the **Open AI Panel** icon in the top-right corner of VS Code to open the MI Copilot interface. You can also type in the text box below and click **Generate** to open the MI Copilot interface.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png" alt="Open AI Panel" width="100%"></a>

    !!! note
        To use WSO2 MI Copilot in your integration project, you need an MI Copilot account.

        If you don’t have an account, the MI Copilot interface will display a message: **MI Copilot Account Not Found**.  

        Follow these steps to create an account if you don't already have one:

        1.Click **Sign In**. A dialog box will appear, asking if you want VS Code to open an external website.

        2.Click **Open**. 

        3.To create an account, click **Register**.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/sign-in-to-copilot.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/sign-in-to-copilot.png" alt="sign-in-to-copilot" width="30%"></a>

        4.Sign up using your email, Google account, or GitHub account.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/sign-up-to-copilot.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/sign-up-to-copilot.png" alt="sign-up-to-copilot" width="30%"></a>

3. You can describe your integration scenarios in natural language in the provided text box, and the Copilot will generate the necessary integration projects, configurations, and required artifacts.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-copilot.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-copilot.png" alt="MI Copilot" width="100%"></a>

    !!! info
        You can provide integration requirements as:
        
        - Text prompts: Describe your integration scenario in natural language.
        - Files: Upload relevant files, such as OpenAPI specifications, that provide additional context for the integration.

4. Click **Generate** or the arrow button next to the text box.

    Based on the provided input, the MI Copilot processes the data and automatically generates an integration sequence tailored to your scenario.

5. Add artifacts to your integration project.

    Once the integration sequence and artifacts are generated,
    
    1. Review the generated artifacts to ensure they align with your requirements.
    2. Click **Add to Project** to add the artifacts to your existing integration project.

??? "Click here for examples"

    **Example 1:** Describe the integration scenario in natural language.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/text-prompt.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/text-prompt.gif" alt="text prompt" width="900"></a>
    
    **Example 2:** Describe the integration scenario in natural language and upload an additional file.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/file-upload.gif"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/file-upload.gif" alt="file upload" width="900"></a>
