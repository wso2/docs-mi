---
tags:
  - vscode
  - extension
  - copilot
  - ai
---

# Features

This page is a reference for the user-facing features of the Copilot panel. For how to use the three modes, see [Modes]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/modes).

## Checkpoints and undo

Every time the Copilot edits files on your behalf, it creates a **checkpoint** — a snapshot of the files it is about to change. After the turn finishes, a card appears in the conversation showing the files that changed and how many lines were added or removed.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/checkpoint-card.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/checkpoint-card.png" alt="Checkpoint card" width="100%"></a>

The card has two actions:

- **Accept** — acknowledges the changes and dismisses the card. Files stay as they are.
- **Undo** — rolls back every file that was changed in that turn to the state it was in before the turn started. Works across multiple tool calls, file creations, and edits.

!!! info
    Checkpoints are stored on disk, so they survive restarts of VS Code. The Copilot keeps the most recent checkpoints and garbage-collects older ones automatically.

Checkpoints are created for any mutation: file writes, file edits, new data mappers, connector additions, and connector removals. If you edit the same files yourself between the checkpoint and hitting **Undo**, the Copilot detects the conflict and asks whether you want to force the rollback or keep your manual edits.

## Plan approval

When the Copilot finishes writing a plan in Plan mode, it presents a **Plan Approval** dialog.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/plan-approval-dialog.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/plan-approval-dialog.png" alt="Plan approval dialog" width="100%"></a>

Your options:

- **Approve Plan** — confirms the plan. The Copilot exits Plan mode, and you typically switch to Edit mode to execute it.
- **Request Changes** — opens a feedback box. Type what you want changed (for example, *"Don't touch the existing unit tests; I'll update them separately"*), and the Copilot revises the plan and re-asks for approval.

The Copilot may also ask for permission to **enter** or **exit** Plan mode if it thinks the task warrants a switch. These use the same approval dialog with a different prompt.

## Todo tracking

For multi-step tasks, the Copilot maintains a **todo list** visible in the conversation. Each item shows its status — pending, in progress, or done — as the Copilot works through them. This gives you a live view of what's happening during longer operations.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/todo-list.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/todo-list.png" alt="Todo list" width="80%"></a>

Todos are in-memory for the current turn — they're a progress indicator, not a persistent task tracker.

## Attachments

You can attach files and images to a message by clicking the **Attach** button in the input bar.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/attachments.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/attachments.png" alt="Attachments" width="80%"></a>

### Supported types

- **Text files** — `.txt`, `.md`, `.csv`, `.html`, `.js`, `.ts`, `.css`, `.json`, `.xml`, `.yaml`, and 12 other common text formats. The Copilot reads the contents as part of your message.
- **PDF** — parsed as a document (vision-based).
- **Images** — `.png`, `.jpg`, and similar. The Copilot uses vision to read diagrams, screenshots, UI mockups, and documents-as-images.

Attachments are validated before the message is sent — if anything is unsupported or malformed, the Copilot tells you upfront instead of partially failing halfway through a generation.

### Typical uses

- **OpenAPI specs and JSON/XML schemas** for generating REST APIs and transformations
- **Screenshots of error dialogs** when asking the Copilot to help debug
- **Architecture diagrams** when asking the Copilot to scaffold a project from a design
- **Sample request/response payloads** when building mediations

## @Mentions

Type `@` in the input bar and start typing a file or folder name to mention it inline. Mentions are picked from your open project.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/mentions.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/mentions.png" alt="File and folder @mentions" width="80%"></a>

Mentions are a quick way to point the Copilot at a specific file or directory without having to describe it. For example:

> *Refactor `@src/main/wso2mi/artifacts/sequences/TransformOrders.xml` to use the data mapper.*

The Copilot reads the mentioned file automatically — you don't need to attach it.

## Sessions

Each conversation you have with the Copilot is a **session**. Sessions are saved automatically and you can switch between them from the **session switcher** in the header.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/session-switcher.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/session-switcher.png" alt="Session switcher" width="60%"></a>

- **New Chat** (in the header) starts a fresh session. Your current session is saved to history.
- The session switcher groups history into **Today**, **Yesterday**, **Past Week**, and **Older**.
- Session titles are derived from your first message (or a short fallback label). You can switch between sessions freely; the Copilot remembers the full history per session.

!!! note
    Sessions are append-only — you can't edit or delete individual messages. If a conversation has gone in the wrong direction, start a new session.

## Extended thinking

For complex requests, the Copilot may use **extended thinking** — it works through the problem before responding. When it does, you'll see a collapsible *Thinking* segment in the conversation with the Copilot's reasoning.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/thinking-segment.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/thinking-segment.png" alt="Extended thinking" width="80%"></a>

You can expand the thinking to see the Copilot's approach, or collapse it to focus on the final answer and the changes.

## Shell command approvals

In **Edit** mode, the Copilot can run shell commands — typically build, test, or project-setup commands. Commands are classified into three tiers:

- **Auto-approved** — standard, read-only, or project-scoped commands (for example, `ls`, `mvn clean install`, `pnpm test`). These run without interruption.
- **Needs approval** — commands that write outside the project, use the network, or look unfamiliar. The Copilot pauses and asks for your approval, showing the exact command. You can approve once, approve for the rest of the session, or deny.
- **Blocked** — anything genuinely dangerous: elevated commands (`sudo`), interactive editors (`vim`, `nano`), access to sensitive paths (`~/.ssh`, `~/.aws`, `.env`), or commands that try to escape the project directory via symlinks. These are refused outright and the Copilot explains why.

In **Ask** and **Plan** modes, only read-only shell commands are permitted.

## Model selection

Open **Settings** from the header and find the **Models** section to choose which Claude model the Copilot uses.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/model-settings.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/model-settings.png" alt="Model settings" width="80%"></a>

Two presets are configurable:

- **Main model** — used for the primary conversation. Options include **Claude Sonnet** (default, best balance of speed and quality) and **Claude Opus** (stronger reasoning, slower).
- **Sub-agent model** — used when the Copilot spawns a sub-agent for codebase exploration or deep documentation lookups. Options include **Claude Haiku** (default, fast) and **Claude Sonnet** (more thorough).

You can also override with a custom model ID if your account supports a specific model. Your selection is saved locally per device.

## Usage limits and quota

The behaviour here depends on how you signed in — see [Sign in]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/overview/#sign-in) for the three options.

### WSO2 Account

- Your account includes a free usage quota that resets on a recurring schedule.
- The Copilot shows your remaining quota and reset time when you open **Settings**.
- When you run out, the panel displays a **Usage limit reached** message explaining when your quota resets. You have three options:
    - **Wait** — your quota refreshes automatically at the displayed reset time.
    - **Switch to Anthropic API key** — unlimited, billed to your Anthropic account.
    - **Switch to AWS Bedrock** — unlimited, billed to your AWS account.

### Anthropic API key

- No WSO2-side quota. Usage is billed directly by Anthropic based on your key's plan.
- If your key is revoked or rate-limited, the Copilot signs you out and asks for a new key.

### AWS Bedrock

- No WSO2-side quota. Usage is billed through your AWS account.
- If your credentials expire (for example, a session token runs out), the Copilot signs you out and asks for new credentials.

!!! info "AI usage and data handling"
    For details on how your prompts and attached files are processed, see [AI Usage and Data Handling Guidelines]({{base_path}}/install-and-setup/setup/reference/ai-usage-and-data-handling-guidelines).

## Long conversations

The Copilot handles very long conversations automatically. When a session gets close to the context limit, it summarizes older messages in-place without interrupting you — you'll see a *Compacted earlier messages* segment in the conversation where the summary was written. The Copilot keeps going from there with the summarized history plus your newer messages.

You don't need to do anything; this is entirely automatic. If you prefer a fresh slate at any point, click **New Chat** in the header.

## Reconnecting after closing the panel

If you close the Copilot panel or VS Code while the Copilot is working on a long task, you can reopen the panel and the Copilot will reconnect to the in-flight run. The conversation picks up where you left off, including streaming events and tool calls. If the task already finished while the panel was closed, you'll see the final results when you reopen.

## What's next

- **[Overview]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/overview)** — a quick introduction to the Copilot and how to sign in.
- **[Modes]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/modes)** — a walkthrough for each of the three modes.
- **[Generate integrations using AI]({{base_path}}/get-started/how-to-guides/ai-code-generation)** — a full end-to-end tutorial using the Copilot.
