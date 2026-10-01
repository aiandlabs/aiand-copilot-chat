# Changelog

All notable changes to this project will be documented in this file.

Versioning follows semver. Versions up to 0.2.2 were published by the original
author as `grikomsn.aiand-copilot-chat`; 1.0.0 is the first release from ai& as
`aiand.aiand-copilot`.

## [Unreleased]

## [1.0.0] - 2026-10-01

### Changed

- The extension is now published by ai& as `aiand.aiand-copilot` and
  maintained in the [aiandlabs](https://github.com/aiandlabs) GitHub
  organization. Thanks to Griko Nibras (@grikomsn), who created it.
- New ai& icon and cover artwork.
- Offline fallback model metadata now matches the live ai& catalog: five
  context limits raised to 1,048,576 tokens and Kimi K3 image input enabled
  (thanks @grikomsn).

## [0.2.2]

### Changed

- Parse ai&'s flat `cached_input_per_1m` rate so live cached-input pricing reaches the picker, and add published cached-input rates to the bundled fallback pricing table. Also correct the Kimi K2.7 Code fallback to advertise image input, matching the live catalog.

## [0.2.1]

### Changed

- Benchmark inline-completion latency across the ai& catalog and surface measured badges in the model picker. Candidates are now ordered default-first with median TTFB/total timings from live fill-in-the-middle requests, and Kimi K2.7 Code is flagged as always-reasoning (its only accepted effort is high, so ghost text may be delayed or empty). The default model is unchanged.

## [0.2.0]

### Changed

- Scope reasoning effort per model. The Copilot Chat Reasoning Effort picker now lists exactly the efforts each ai& model accepts (from the live `reasoning_efforts` catalog field), adds the `xhigh` and `max` levels several models support, and never sends an effort the model would reject with HTTP 400. The workspace default applies only when the model supports it, otherwise the model's own default is used; models without reasoning control omit the parameter entirely. Inline suggestions now use the suggestion model's reasoning-off effort instead of assuming `none`.

## [0.1.1]

### Changed

- Show the live ai& organization credit balance alongside locally tracked inference usage.

## [0.1.0]

### Added

- Initial bootstrap of the ai& provider: OpenAI-compatible chat completions at `https://api.aiand.com/v1` with `Bearer` API-key auth, live `/v1/models` discovery plus a bundled fallback catalog, streaming text/reasoning/tool-call projection, per-model reasoning-effort and context-window controls, and opt-in ghost-text inline suggestions.
