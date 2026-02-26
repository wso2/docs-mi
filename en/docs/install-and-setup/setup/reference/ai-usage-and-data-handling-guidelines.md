# AI Usage and Data Handling Guidelines

WSO2 Integrator: MI provides an AI-powered Copilot to enhance developer productivity. This page explains how the Copilot works, how user data is handled, and what best practices organizations should follow when using AI features.

These guidelines are designed to ensure transparency, security, and compliance when using AI-powered assistance in enterprise environments.

## Macro architecture

The AI Copilot is integrated into the WSO2 Integrator: MI developer experience. It works as follows:

<a href="{{base_path}}/assets/img/setup-and-install/references/ai-usage/macro-architecture.png"><img src="{{base_path}}/assets/img/setup-and-install/references/ai-usage/macro-architecture.png" alt="AI Macro Architecture" width="70%"></a>

- **AI Copilot Code**: Delivered as a Visual Studio Code (VS Code) extension, providing in-editor assistance such as code completion, explanations, and suggestions.
- **Language Server**: Powers intelligent features inside the IDE, including syntax awareness and integration with Copilot services.
- **MI Intelligence Endpoint**: A lightweight intermediary service that connects the extension to Anthropic model. This service does not retain data.
- **Anthropic Integration**: The endpoint forwards user prompts and context to the selected Large Language Model (LLM) provider for processing.



## Authentication

To maintain security, all AI Copilot features require authentication:

- Users must log in to enable Copilot functionality.
- Social login options are supported for ease of use.
- Authentication and session management are handled by [Asgardeo](https://wso2.com/asgardeo/), WSO2’s identity provider.

This ensures that only authorized users in your organization can access Copilot features.

## Data flow

The movement of data through the Copilot is designed for zero-retention at the intermediary layer:

<a href="{{base_path}}/assets/img/setup-and-install/references/ai-usage/ai-data-flow.png"><img src="{{base_path}}/assets/img/setup-and-install/references/ai-usage/ai-data-flow.png" alt="AI Macro Architecture" width="70%"></a>

- **Direct Forwarding**: MI Intelligence forwards user data directly to Anthropic for processing
- **No Local Storage**: MI Intelligence does not store any user data locally
- **Real-time Processing**: All data handling occurs in real-time without persistent storage at the MI Intelligence layer

## Bring your own key (BYOK)

Organizations can configure the Copilot to run using their own model provider accounts. This ensures enterprise-level control over data governance and billing.

### Anthropic deployment
- Copilot can connect directly to Anthropic’s public deployments.
- Requires an Anthropic API key that you provide.
- This setup ensures that data flows directly between your environment and Anthropic without WSO2 retaining it.

## MI copilot code

The Copilot is open source, enabling transparency and community contribution:

- The full source code is available for inspection, download, and modification.
- This allows organizations to validate the behavior of the Copilot.
- Enterprises can also extend the code to adapt to custom compliance needs.

This openness ensures that security-conscious users can audit how prompts and data are handled.

## Feedback data

To improve the Copilot experience, user feedback may be collected.

**Retention period**

- Feedback data (such as thumbs up/down ratings) is retained for 1 week only.
- After 1 week, feedback records are permanently deleted.

**Collection scope**

- Feedback is collected only when a user explicitly provides it.
- No hidden or passive data collection is performed.

**Transparency**

- The feedback interface clearly explains what is being collected and why.
- Users always have control over whether to provide feedback.

## Guidelines

When using AI features, organizations must apply standard security and compliance practices.

### Data usage policies
- All operations are subject to the [Anthropic Data Usage Policy](https://privacy.anthropic.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data) or the chosen model provider’s terms.
- WSO2 ensures that the Copilot does not bypass these policies.

### Organizational data storage

How long do we store your organization's data?

We follow a zero-retention policy at the MI Intelligence level - your organizational data is not stored by our intermediate services.

### Best practices

To ensure maximum security and privacy, we recommend avoiding sending organizational-specific details such as:

- Customer personal information
- Passwords or authentication credentials
- Proprietary business data
- Sensitive internal communications

General Copilot Best Practices are as follows.

- Review all AI-generated code before implementation
- Be mindful of what information you include in prompts
- Use generic examples rather than real data when possible
- Follow your organization's data governance policies

## Data retention summary

| Data Type                       | Retention Period              | Notes                                              |
|---------------------------------|-------------------------------|----------------------------------------------------|
| Code Prompts & Responses        | Not stored by MI Intelligence | Forwarded directly to Anthropic         |
| User Feedback                   | 1 week                        | Retained only when explicitly provided by the user |
| Authentication Tokens           | Session-based                 | Managed securely by Asgardeo                       |
| Organizational Data             | Not stored                    | Zero-retention policy at MI Intelligence           |