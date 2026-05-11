---
tags:
  - vscode
  - extension
  - copilot
  - ai
---

# Modes: Ask, Edit, and Plan

The Copilot has three modes, selectable from the pill on the left of the input bar. Each mode changes what the Copilot is allowed to do — you pick the mode that matches how much autonomy you want to give it for the task at hand.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/mode-switcher.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/mode-switcher.png" alt="Mode switcher" width="60%"></a>

## Mode comparison

<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Ask</th>
      <th>Edit (default)</th>
      <th>Plan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Use it when</b></td>
      <td>You want to understand an existing project, get explanations, or preview code without changes.</td>
      <td>You want the Copilot to implement something — create or edit artifacts, add connectors, build, and run.</td>
      <td>You're starting a larger task and want a written plan to review before any file is touched.</td>
    </tr>
    <tr>
      <td><b>Reads files</b></td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><b>Edits files</b></td>
      <td>No — shows code blocks with an <b>Add to Project</b> button instead</td>
      <td>Yes — direct in-workspace edits with checkpoints</td>
      <td>Only the plan file; no source file edits until the plan is approved and you switch back to Edit</td>
    </tr>
    <tr>
      <td><b>Runs the server / builds</b></td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td><b>Runs shell commands</b></td>
      <td>Read-only commands only</td>
      <td>Yes (sensitive commands require your approval)</td>
      <td>Read-only commands only</td>
    </tr>
    <tr>
      <td><b>Ends turn with</b></td>
      <td>Any reply</td>
      <td>Any reply</td>
      <td>A question for you, or a plan approval request</td>
    </tr>
  </tbody>
</table>

You can switch modes between messages. If you start in **Plan** and later approve the plan, you'll typically move to **Edit** to run it.

---

## Ask mode — explore and preview

**Ask** is read-only. The Copilot can open files, run searches, look up connector docs, and generate code snippets, but it never writes to your project. If it produces code, the code appears in a code block with an **Add to Project** button — you stay in control of what goes in.

Use Ask mode to:

- Understand how an existing integration is wired (sequences, APIs, connections)
- Preview what a mediation would look like before committing to it
- Ask "how do I…" questions without modifying the project
- Compare approaches ("should I use the `http.get` connector or a send mediator here?")

### Walkthrough — explore an existing project

**Scenario:** You just inherited a Synapse project and need to understand what the `OrderAPI` does before making changes.

1. Open the Copilot panel and switch the mode pill to **Ask**.
2. Type:

    > *Walk me through what `OrderAPI` does. Which endpoints does it call, and what transformations happen along the way?*

3. The Copilot reads the relevant files, lists the resources exposed by the API, and explains the flow in plain language. No files are modified.

4. Ask a follow-up:

    > *Show me what a `PUT /orders/{id}` resource for this API would look like, but don't add it yet.*

5. The Copilot replies with a Synapse XML snippet in a code block. You see an **Add to Project** button above the snippet.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/ask-mode-add-to-project.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/ask-mode-add-to-project.png" alt="Ask mode — Add to Project button" width="100%"></a>

6. If you like it, click **Add to Project**. The Copilot inserts the snippet at the right place in your project and creates a [checkpoint]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/features/#checkpoints-and-undo) so you can undo if needed.

!!! tip
    **Add to Project** in Ask mode is a one-click way to apply a specific snippet without giving the Copilot full Edit-mode access. It's useful when you want control over exactly what lands in the project.

---

## Edit mode — the default working mode

**Edit** is the default. The Copilot can create and edit files, run the language server to validate XML, add or remove connectors (updating `pom.xml`), create data mappers, build the project, deploy the CAR, and start or stop the MI runtime.

Every file the Copilot changes is captured on a **Checkpoint** card so you can review and undo before moving on.

Use Edit mode to:

- Build a new API or mediation from a prompt
- Extend an existing integration ("add a retry with exponential backoff to the payment call")
- Migrate a data mapper, generate mappings, or refactor a flow
- Build and run the project to verify it works

### Walkthrough — build a REST API end-to-end

**Scenario:** You want to build a REST API that fetches weather data for a city and emails the result to a recipient.

1. Make sure you are in **Edit** mode (the default).
2. Open the Copilot panel and type:

    > *Create a REST API called `WeatherEmailService` at context `/weatherEmail`. Add a `GET /getWeather` resource with `city` and `email` query parameters. It should call OpenWeather's geolocation and current-weather endpoints, then email the weather details to the recipient. Use the HTTP and Email connectors.*

3. (Optional) Attach the OpenAPI specifications for the weather endpoints by clicking the **Attach** button.

4. Press **Enter**. The Copilot will:

    - **Plan out the work** internally and show a **Todo** list of what it's about to do.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/edit-mode-todo-list.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/edit-mode-todo-list.png" alt="Edit mode — todo list" width="100%"></a>

    - **Add the connectors** (`mi-connector-http`, `mi-connector-email`) to your `pom.xml` and trigger the download.
    - **Create the API** file at `src/main/wso2mi/artifacts/apis/WeatherEmailService.xml`.
    - **Create the connections** (`OpenWeather`, `EMAIL_CONN`) as local entries.
    - **Validate** the generated XML against the LemMinx language server.

5. As each tool runs, you see a **tool call indicator** in the chat (for example, *Adding HTTP connector*, *Writing WeatherEmailService.xml*, *Validating XML*). When everything finishes, a **Checkpoint** card appears listing the files changed:

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/edit-mode-checkpoint.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/edit-mode-checkpoint.png" alt="Edit mode — checkpoint card" width="100%"></a>

6. Open the **Design View** to confirm the API is wired correctly. If something's off, you can either:

    - Click **Undo** on the Checkpoint card to roll back every file the Copilot changed in that turn, then rephrase your prompt; or
    - Send a follow-up like *"The email subject should include the city name — update it."*

7. When you're happy, ask the Copilot to build and run:

    > *Build the project and start the server.*

    The Copilot runs Maven, deploys the resulting `.car`, and starts the MI runtime. When the server is up, a link to the Runtime Services panel appears in the chat so you can try your API.

### Shell commands in Edit mode

When the Copilot needs to run a shell command — for example, `mvn clean install` or `pnpm test` — the command goes through a safety layer:

- **Safe commands** (typical build, test, and read-only commands) run automatically.
- **Sensitive commands** (anything touching outside the project directory, elevated commands, or unrecognized commands) pause the turn and ask you to approve. You can approve once or remember the approval for the rest of the session.
- **Blocked commands** (for example, `sudo`, interactive editors, or commands touching `~/.ssh`) are refused entirely. The Copilot explains the block and suggests an alternative.

You can always see the full command before it runs.

---

## Plan mode — structured workflow for larger tasks

**Plan** is the right choice when a task is big enough that you want a written plan before any code changes. In Plan mode the Copilot:

1. **Understands the task** — reads relevant files, asks clarifying questions if needed.
2. **Writes a plan** to a dedicated plan file (stored per session) covering context, approach, which files will change, reusable code, steps, and how to verify the result.
3. **Presents the plan for approval** — you review it and either approve, reject with feedback, or request changes.
4. **On approval**, you typically switch to **Edit** mode and ask the Copilot to execute the plan.

While in Plan mode, the Copilot cannot modify source files — only the plan file itself. That's the safety guarantee: no surprise edits, no matter how long the planning conversation runs.

### Walkthrough — plan a connector migration

**Scenario:** Your project uses the legacy XSLT-based CSV transformation flow. You want to migrate it to use the data mapper, but you want a reviewable plan first.

1. Switch the mode pill to **Plan**.
2. Type:

    > *I need to migrate `TransformOrdersSequence` from XSLT to the data mapper. Study the existing sequence and write a plan.*

3. The Copilot reads `TransformOrdersSequence`, inspects the input and expected output, and may ask a clarifying question — for example:

    > *The XSLT currently drops the `internalNotes` field. Should the new data mapper also drop it, or include it?*

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/plan-mode-question.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/plan-mode-question.png" alt="Plan mode — question to user" width="100%"></a>

    Respond inline in the question dialog and the Copilot continues.

4. When ready, the Copilot writes a plan like:

    ```markdown
    # Migrate TransformOrdersSequence to Data Mapper

    ## Context
    - Current implementation uses XSLT at resources/xslt/orders.xslt
    - Called from TransformOrdersSequence.xml line 12
    - …

    ## Approach
    - Create a new data mapper at …
    - Replace the <xslt> mediator call with a <datamapper> mediator
    - …

    ## Files to change
    - TransformOrdersSequence.xml (modify)
    - datamapper/OrdersMapper/OrdersMapper.ts (new)
    - …

    ## Steps
    1. …

    ## Verification
    - …
    ```

5. The Copilot then presents a **Plan Approval** dialog:

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/plan-approval-dialog.png" class="glightbox"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/wso2-integrator-copilot/plan-approval-dialog.png" alt="Plan approval dialog" width="100%"></a>

    You can:

    - **Approve Plan** — the Copilot acknowledges approval and exits Plan mode.
    - **Request Changes** — type feedback (for example, *"Keep the XSLT as a fallback until we've tested the new flow in dev"*) and the Copilot updates the plan and re-asks for approval.

6. Once the plan is approved, switch the mode pill back to **Edit** and say:

    > *Execute the plan.*

    The Copilot now implements the plan in Edit mode, with the full set of tools available.

!!! tip "When to prefer Plan mode"
    Use Plan mode when the task is ambiguous, touches many files, or is risky enough that you'd want a written record of the intent. For small, well-defined tasks, Edit mode is more direct.

---

## Switching modes mid-conversation

You can change modes between turns. A few common patterns:

- **Ask → Edit:** Explore the project, then ask the Copilot to implement what you just discussed.
- **Edit → Plan:** Mid-task you realize the scope is larger than you thought. Switch to Plan and ask for a plan.
- **Plan → Edit:** The most common post-approval move — switch back to Edit and say *"Execute the plan."*

The Copilot also can suggest a mode switch itself when it thinks the task warrants it. For example, if you start a very large request in Edit mode, it may reply:

> *This is a big change that will touch several files. I recommend switching to Plan mode first so we can review a plan before editing. Would you like to switch?*

You can accept the suggested switch from the dialog, or decline and keep going in your current mode.

---

## What's next

- **[Features]({{base_path}}/develop/mi-for-vscode/wso2-integrator-copilot/features)** — a detailed reference for checkpoints, plan approval, attachments, sessions, shell approvals, model settings, and usage limits.
- **[Generate integrations using AI]({{base_path}}/get-started/how-to-guides/ai-code-generation)** — a full end-to-end tutorial using the Copilot.
