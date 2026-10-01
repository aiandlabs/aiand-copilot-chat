<p align="center">
  <img src="https://raw.githubusercontent.com/aiandlabs/aiand-copilot-chat/main/assets/cover.jpg" alt="ai& and GitHub Copilot" width="960">
</p>

<h1 align="center">ai& for GitHub Copilot Chat</h1>

<p align="center">Use ai& models directly from the GitHub Copilot Chat model picker in Visual Studio Code.</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=aiand.aiand-copilot-chat"><img src="https://img.shields.io/visual-studio-marketplace/v/aiand.aiand-copilot-chat?style=flat-square&logo=visualstudiocode&label=Marketplace" alt="Visual Studio Marketplace version"></a>
  <a href="https://github.com/aiandlabs/aiand-copilot-chat/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/aiandlabs/aiand-copilot-chat/ci.yml?branch=main&style=flat-square&label=CI" alt="CI status"></a>
  <a href="https://github.com/aiandlabs/aiand-copilot-chat/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aiandlabs/aiand-copilot-chat?style=flat-square" alt="MIT license"></a>
</p>

This extension is a native VS Code `LanguageModelChatProvider`. It validates a user-supplied ai& API key, discovers the models available to that key, and streams OpenAI-compatible chat completions directly from `https://api.aiand.com/v1` into Copilot Chat.

## Highlights

- Direct ai& integration without a local proxy
- API keys managed by VS Code Secret Storage or provider configuration
- Multiple isolated ai& API-key entries in Manage Language Models
- Current input, cached-input, and output pricing in the model picker
- Live organization credit balance with locally tracked token activity and request history
- Live `/models` discovery with context and output limits from ai& metadata
- Streaming text, `reasoning_content`, token usage, and function-tool calls
- ai& reasoning effort controls only on models that advertise support
- Image input for models that advertise image capability
- Agent mode function-tool calls

## Quick start

1. Install the extension. You need VS Code 1.125 or newer and GitHub Copilot Chat.
2. Create an API key in the [ai& dashboard](https://console.aiand.com/settings/api-keys).
3. Open Copilot Chat, select **Manage Models**, add a **ai&** provider entry, and enter the key.
4. Choose any model returned by your ai& account.

To use more than one account or key, add another **ai&** entry. Each entry keeps its own credential and model list. The legacy **ai&: Configure API Key** command remains available for command-driven workflows.

For models that support configurable reasoning, choose **None**, **Low**, **Medium**, or **High** from the reasoning control in Copilot Chat. A per-request selection overrides `aiandCopilot.reasoningEffort`.

## Documentation

- [Setup, settings, and troubleshooting](docs/setup.md)
- [Models and pricing](docs/models.md)
- [API key and security model](docs/security.md)
- [Development and releases](docs/development.md)

## Credits

Officially maintained by [ai&](https://www.aiand.com). Originally created by [Griko Nibras](https://github.com/grikomsn), who handed the project over to ai&. Everyone else who has helped is listed in [THANKS.md](THANKS.md).

Not affiliated with GitHub or Microsoft. ai& usage limits and charges apply. Licensed under [MIT](LICENSE).
