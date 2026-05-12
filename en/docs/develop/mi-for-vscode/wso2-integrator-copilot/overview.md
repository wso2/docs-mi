---
tags:
  - vscode
  - extension
  - copilot
  - ai
---

# WSO2 Integrator Copilot (MI)

WSO2 Integrator Copilot is an AI assistant built into the MI for VS Code extension. It works alongside you inside your integration project — reading your files, running validations, adding connectors, generating mediations, and even building and running the server — through a conversational chat panel.

You can describe what you want to build in natural language, ask questions about an existing project, or hand over larger tasks and review the plan before execution. The Copilot edits files directly in your workspace, keeping everything in sync with the language server and project model.

## What the Copilot can do

- Generate integration artifacts (REST APIs, sequences, proxy services, inbound endpoints, scheduled tasks, message stores) from a natural-language description
- Explore and explain an existing integration project
- Add or remove connectors and configure connections (pom.xml updates, connector catalog lookup)
- Generate data mappings (TypeScript) and create new data mappers
- Build the project, deploy the `.car`, and start or stop the MI runtime
- Read server logs and help you debug failures
- Validate Synapse XML against the language server before you save
- Reference Synapse syntax and connector documentation on demand

The Copilot works with any MI project — new or existing — and chooses the right tools for the job based on your request.

## Open the Copilot panel

You can open the Copilot panel in either of these ways:

- Click the **Copilot** icon in the top-right corner of VS Code.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/open-ai-panel.png" alt="Open the Copilot panel" width="100%"></a>

!!! info
    The Copilot panel is a VS Code side-panel webview. You can drag it to the right, bottom, or secondary side bar like any other panel.

## Sign in

The first time you open the Copilot panel, you are asked to sign in. The Copilot supports three sign-in methods — you can switch between them at any time from **Settings**.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/sign-in-options.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/sign-in-options.png" alt="Sign-in options" width="100%"></a>

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Who should pick this</th>
      <th>How it works</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>WSO2 Account</b> (default)</td>
      <td>Most users. Free, no setup.</td>
      <td>Sign in with your WSO2 account (email, Google, or GitHub). A free usage quota is applied to your account and resets periodically. You are notified in the panel when your quota runs out.</td>
    </tr>
    <tr>
      <td><b>Anthropic API key</b></td>
      <td>Users who have their own Anthropic account and want unlimited usage billed directly to Anthropic.</td>
      <td>Paste your Anthropic API key. All Copilot requests go directly to the Anthropic API using your key.</td>
    </tr>
    <tr>
      <td><b>AWS Bedrock</b></td>
      <td>Organizations that run Claude through Amazon Bedrock for compliance or procurement reasons.</td>
      <td>Provide your AWS access key ID, secret access key, and region (session token optional). Requests are sent to Claude on Bedrock using cross-region inference.</td>
    </tr>
  </tbody>
</table>

### Switching auth methods later

From the Copilot panel, click the **Settings** gear in the header and click the **Sign Out** button. You can sign out and switch to any of the three methods without losing your chat history. The provider you are currently using is shown in the header as a small chip (for example, **WSO2**, **Anthropic**, or **Bedrock**).

## Your first message

Before you send your first message, make sure you have:

1. [Created a new integration project]({{base_path}}/develop/create-integration-project) or [opened an existing one]({{base_path}}/develop/opening-projects).
2. Signed in with one of the three methods above.

To start a new chat session, open the Copilot panel and type in the input at the bottom. For example:

> *Create a REST API called `OrderAPI` at context `/orders` with a `GET /orders/{id}` resource that fetches an order from the `https://api.example.com/orders/{id}` endpoint and returns the JSON response.*

Press **Enter**. The Copilot opens a new chat session in **Edit mode** (the default) and starts working:

- You see the Copilot's reasoning stream in live, followed by **tool call indicators** (for example, *reading file*, *adding connector*, *writing `src/main/wso2mi/artifacts/apis/OrderAPI.xml`*).
- Files it creates or edits appear on a **Checkpoint** card at the bottom of the conversation, with **Accept** and **Undo** buttons so you can review before keeping the changes.
- When it finishes, you can ask a follow-up (for example, *"Add a `POST /orders` resource too"*) and the Copilot continues from the same context.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/first-message-walkthrough.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/first-message-walkthrough.png" alt="First message walkthrough" width="100%"></a>

!!! tip
    You can also attach files with your message — OpenAPI specifications, JSON schemas, CSVs, PDFs, or images. The Copilot uses them as additional context. See [Attachments]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/features/#attachments).

## Anatomy of the Copilot panel

**Header (top)**

- **Auth provider chip** — which sign-in method you are using.
- **New Chat** — start a fresh session. Your current session is saved to history.
- **Settings gear** — open the full settings view (authentication, model selection).

**Conversation (middle)**

- Your messages and the Copilot's replies, including live **tool call indicators**, **code blocks**, and **Checkpoint** cards with Accept/Undo.
- Long-running tasks show a **Todo** list so you can see progress step by step.

**Input bar (bottom)**

- **Text input** — type your prompt. Use `@` to mention a file or folder from your project.
- **Mode switcher** — a pill on the left lets you pick between **Ask**, **Edit**, and **Plan**. See [Modes]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/modes).
- **Attach** — add files or images to your message.
- **Send** — submit the message (or press Enter).

## Where to go next

- **[Modes: Ask, Edit, and Plan]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/modes)** — learn when to use each mode, with hands-on walkthroughs.
- **[Features]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/features)** — checkpoints, plan approval, sessions, attachments, model selection, and more.
- **[Generate integrations using AI]({{base_path}}/get-started/how-to-guides/ai-code-generation)** — a full end-to-end tutorial that builds a weather-email integration with the Copilot.

!!! info "AI usage and data handling"
    For details on how your prompts and files are processed by the Copilot, see [AI Usage and Data Handling Guidelines]({{base_path}}/install-and-setup/setup/reference/ai-usage-and-data-handling-guidelines).
