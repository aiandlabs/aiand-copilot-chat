# Contributing

Thanks for helping improve ai& for GitHub Copilot.

## Before opening work

- Use [Discussions](https://github.com/aiandlabs/aiand-copilot-chat/discussions/categories/q-a) for setup and usage questions.
- Search existing issues before filing a bug or feature request.
- Report vulnerabilities according to [SECURITY.md](SECURITY.md), not in a public issue.
- Keep changes focused. Open an issue first when a proposal changes credential storage, provider behavior, or public configuration.

## Development

Use Node.js 22 or newer:

```bash
npm ci
npm test
npm run package
```

Add or update tests when behavior changes. Do not include generated `out/` files, `.env` files, API keys, or VSIX artifacts in commits.

User-visible changes need a Changeset:

```bash
npm run changeset
```

Documentation, tests, and repository-maintenance-only changes do not need one.

## How pull requests are reviewed

This project is maintained by the ai& team. Anyone can open a pull request:

- **Outside contributors:** fork the repository and open a pull request from your fork. A maintainer approves the CI run for first-time and external contributors, then reviews the change.
- **Maintainers:** work on a branch in this repository. Every pull request, including a maintainer's own, needs an approving review from a different maintainer.
- Pull requests merge into `main` only after CI passes and a maintainer other than the author approves.
- Releases to the Visual Studio Marketplace are published by maintainers through the release workflow; contributors never need publishing credentials.

## Credit

Every outside contribution gets credit: code, bug reports, testing, and ideas all count. You're listed in [THANKS.md](THANKS.md) after your first merged PR, and changelog entries for your work end with `(#<pr>, thanks @<handle>)`.

Maintainers: add first-time contributors to THANKS.md when merging. Keep them as commit authors; if you rework their change, add a `Co-authored-by:` trailer, and credit a bug report with `Reported-by:`.

## Pull requests

A pull request should:

- Explain the problem and the chosen solution
- Stay limited to one coherent change
- Pass tests and packaging
- Update documentation when commands, settings, security behavior, or user workflows change
- Avoid unrelated dependency or formatting churn

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). For contribution questions not suited to Discussions, contact [support@aiand.com](mailto:support@aiand.com).
