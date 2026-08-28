# CommitCV

CommitCV is a fun, evidence-first CLI project that turns selected GitHub activity into an editable developer profile.

Instead of treating commit counts or commit messages as a resume, CommitCV builds structured evidence from repositories, attributable commits, pull requests, languages, releases, and file changes. Optional AI may improve the wording, but every generated claim must remain connected to verifiable evidence.

## Why build it?

- Learn Git, GitHub APIs, CLI development, and Linux-friendly tooling.
- Turn scattered development history into a useful project profile.
- Experiment with AI without allowing unsupported resume claims.
- Give contributors clear backend, CLI, AI, design, frontend, QA, and release tracks.

## Planned workflow

```bash
commitcv generate --user prathamtechops --since 2025-01-01 --output profile.md
```

The user will select repositories, review matched contributions, optionally add missing context, and export Markdown or JSON. A designed HTML profile is planned after the deterministic evidence pipeline works.

## Core rules

1. GitHub facts first, derived signals second, AI wording last.
2. Repository selection is explicit.
3. Commit count is activity, not impact.
4. Uncertain authorship is excluded by default.
5. Every claim retains evidence IDs and permitted source links.
6. Private repositories and AI sharing are opt-in.
7. The deterministic pipeline works without an AI provider.

## Project roadmap

The complete product specification, commit-mapping model, privacy requirements, milestones, roles, test strategy, and Linear ticket plan are in [ROADMAP.md](./ROADMAP.md).

## Status

Planning and project setup. No application implementation has started yet.

## Contributing

Work is organized in the personal Linear team `AVE`. Tickets include a recommended role and acceptance criteria. Contributors should self-assign work that matches their experience.
