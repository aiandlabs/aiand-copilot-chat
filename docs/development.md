# Development and releases

## Local workflow

```bash
npm install
npm test
npm run package
```

Tests are colocated with the modules they cover under `src/auth/`, `src/models/`, `src/provider/`, `src/transport/`, and `src/usage/`, plus `scripts/release.test.mjs` for the release helper. `npm test` performs a clean compile and runs credential-storage, provider-configuration, model-filtering, retry, stream-parser, protocol, error, cache, and usage tests. `npm run package` validates the project and creates an installable VSIX.

Install the local build with:

```bash
code --install-extension aiand-copilot-chat-<version>.vsix --force
```

The packaged extension contains compiled runtime files, Marketplace metadata, the changelog, license, README, and icon. Source, tests, maps, repository automation, project documentation, secrets, and local build artifacts are excluded by `.vscodeignore`.

For a live API check, put `AIAND_API_KEY` in an ignored local `.env` file or your shell environment. Never commit credentials or paste them into an issue.

## Releasing

Merges to `main` never publish; a pushed `v<version>` tag does. This is the same model as [aiand-cli](https://github.com/aiandlabs/aiand-cli). User-visible changes land with a `CHANGELOG.md` entry under `## [Unreleased]`; released sections are never edited.

```bash
npm run release -- prepare patch   # or minor, major, x.y.z
# review and merge the release/v<version> PR, wait for CI on main
npm run release -- tag
```

`prepare` runs from an up-to-date `main`: it bumps `package.json`, turns `[Unreleased]` into `[<version>] - <date>` with a fresh empty `[Unreleased]` above, runs `npm run package` (tests plus a VSIX build), and opens the PR with `gh`. `tag` refuses unless `main` is clean, at `origin/main`, and has a successful CI run, then pushes the tag.

`.github/workflows/publish.yml` checks the same things again (tag matches `package.json`, commit on `main` with a successful CI run, a changelog section for the version, version not yet on the Marketplace), publishes the VSIX to the Visual Studio Marketplace, and creates the GitHub release with that VSIX and the version's changelog section as its notes.

Publishing runs in the `marketplace` GitHub environment, which holds the credentials:

- **Microsoft Entra ID (preferred):** set the `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` and `AZURE_SUBSCRIPTION_ID` environment variables for a user-assigned managed identity that has a federated credential for `repo:aiandlabs/aiand-copilot-chat:environment:marketplace` and is a Contributor on the `aiand` publisher.
- **Personal access token (fallback):** the `VSCE_PAT` environment secret, an Azure DevOps token with the Marketplace (Manage) scope. Azure DevOps retires global personal access tokens on December 1, 2026, so move to Entra ID before then.

### Protecting publishing

A tag runs `publish.yml` as it exists at the tagged commit, so its checks only protect a release if the repository settings stop anyone from tagging a commit with a modified workflow. Configure these before the first release:

- **Tag ruleset:** Settings → Rules → new tag ruleset for `v*` that restricts creation, update and deletion to maintainers (repository admins as bypass).
- **Environment:** create the `marketplace` environment yourself (GitHub creates an unprotected one on first use otherwise). Under Deployment branches and tags, allow only tags matching `v*`. Add maintainers as required reviewers if you want a second approval on every publish.
- **Credentials live only on the environment,** never as repository secrets or variables.

### If a release fails halfway

- **Before the Marketplace publish** (a check or `npm run package` failed): fix it on `main`, delete the tag (`git push --delete origin v<version>` and `git tag -d v<version>`), and tag again once CI is green.
- **After the Marketplace publish** (only `gh release create` failed): re-running the workflow stops at the "already on the Marketplace" check, so create the GitHub release by hand from the tag: `npm ci && npm run package`, then `node scripts/release.mjs notes <version> > notes.md` and `gh release create v<version> aiand-copilot-chat-<version>.vsix --verify-tag --notes-file notes.md --title v<version>`.

## References

- [ai& API documentation](https://docs.aiand.com)
- [ai& model pricing and capabilities](https://docs.aiand.com)
- [ai& API console](https://console.aiand.com)
