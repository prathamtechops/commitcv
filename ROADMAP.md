# CommitCV

> A fun, evidence-first CLI that turns selected GitHub activity into an editable developer profile.

## 1. Project status

CommitCV starts as a learning project. The first goal is not to build a perfect hiring platform. The goal is to build a useful CLI, learn Git/GitHub APIs and Linux-friendly tooling, and produce profiles that never claim more than the available evidence supports.

Working repository name: `commitcv`

Planned owner: `prathamtechops`

Initial visibility: public, as chosen by the project owner.

## 2. Product idea

A user runs a command, selects repositories and a time range, reviews the collected evidence, and generates an editable Markdown developer profile.

```bash
commitcv generate --user prathamtechops --since 2025-01-01 --output profile.md
```

CommitCV should answer:

- What projects did this developer contribute to?
- Which technologies are directly supported by the repository and file history?
- What kinds of engineering work appear repeatedly?
- Which pull requests, commits, and releases support each statement?
- Which claims are strong, weak, or require user confirmation?

## 3. Product principles

1. Evidence before prose.
2. Repository selection must be explicit.
3. Commit count is activity, not impact.
4. AI may rewrite facts but may not invent facts.
5. Every generated claim must retain source links.
6. Private repository names and content stay private unless the user explicitly exports them.
7. Users approve the final profile.
8. The deterministic pipeline must work without Grok.

## 4. MVP scope

### Included

- GitHub username input
- Optional authenticated access to selected private repositories
- Explicit repository selection
- Configurable date range
- Repository metadata collection
- Commit collection and identity matching
- Associated pull-request context when available
- Language and file-area signals
- Release participation signals
- Bot, merge, duplicate, generated-file, and low-signal filtering
- Evidence records with confidence levels
- Optional Grok-powered rewriting
- Markdown and JSON output
- Interactive review before export
- Linux and macOS support

### Not included in the first release

- Automatic job applications
- Claims about revenue, users, latency, or business impact without explicit evidence
- Ranking developers by commit count
- Recruiter marketplace
- LeetCode-style coding platform
- PDF resume designer
- Automatic publishing of private activity
- Background storage of GitHub or Grok credentials
- Scraping GitHub webpages when an API or local Git source is available

## 5. Correctness model

CommitCV uses three information layers.

### Layer A: confirmed facts

Facts come directly from GitHub or local Git:

- Repository owner, name, description, topics, visibility, and dates
- Commit SHA, URL, author, committer, timestamp, and message
- Parent count, allowing merge commits to be recognized
- Files changed and additions/deletions when available
- Associated pull request, title, body, labels, merge date, and URL
- Repository language-byte distribution
- Tags and published releases
- User-selected repository and time-range boundaries

These values may be displayed directly and retained in the evidence store.

### Layer B: derived signals

Rules derive conservative signals from confirmed facts:

- `apps/api/**`, controllers, routes, or server packages may indicate backend work.
- React components, screens, and UI tests may indicate frontend or mobile work.
- Migration and schema files may indicate database work.
- Workflow and container files may indicate CI/CD or infrastructure work.
- Test files may indicate testing work, but not necessarily ownership of the entire test strategy.
- A repository language is a project signal; it is not automatically a personal skill.
- Repeated, attributable changes in a language or subsystem raise confidence.

Derived signals always retain their source SHAs and file paths.

### Layer C: generated narrative

Grok or another provider converts approved evidence into readable language.

Allowed:

> Contributed to authentication reliability through API and regression-test changes.

Not allowed without explicit evidence:

> Designed the company authentication architecture and reduced failures by 80%.

The generator receives structured evidence, not an unrestricted dump of repository content.

## 6. Mapping the correct person to commits

Identity resolution is the most important correctness boundary.

### Inputs

- Target GitHub login
- GitHub user ID
- Public or user-approved commit email aliases
- GitHub-linked author login returned for a commit
- Optional local aliases supplied by the user
- `Co-authored-by` trailers

### Matching order

1. **Strong match:** GitHub returns the target login and user ID as the commit author.
2. **Strong match:** The associated pull request is authored by the target and the commit belongs to it.
3. **Medium match:** The commit email matches an explicitly approved alias.
4. **Medium match:** A `Co-authored-by` trailer matches an approved identity.
5. **Weak match:** Name-only matching. Weak matches are excluded by default.
6. **No match:** Do not attribute the commit to the user.

Author and committer must not be treated as interchangeable. A merge bot or maintainer may be the committer while another person authored the change.

### Confidence levels

```text
verified  = GitHub login/user ID or authored PR confirms identity
probable  = approved email or co-author trailer confirms identity
uncertain = name-only or contradictory metadata
excluded  = bot, unrelated author, or insufficient evidence
```

Only `verified` and user-approved `probable` records may generate profile claims.

## 7. Mapping commits to useful profile information

### Step 1: collect repositories

Collect repositories visible to the user, then ask the user to select which ones are in scope. Forks, archived repositories, tutorials, and generated repositories are excluded by default but can be included manually.

### Step 2: collect activity

For each selected repository and date range, collect attributable commits. Handle API pagination, retries, rate limits, and partial failures.

### Step 3: enrich commits

For each candidate commit, collect:

- Changed files
- Additions and deletions
- Commit message and body
- Associated pull requests
- Repository languages and topics
- Release or tag proximity
- Test, documentation, migration, configuration, and generated-file indicators

### Step 4: filter noise

Exclude or down-rank:

- Merge-only commits
- Dependabot and other bot commits
- Lockfile-only changes
- Formatting-only changes
- Generated output
- Reverts without additional work
- Duplicate commits from cherry-picks
- Commits outside the selected range
- Commits whose identity cannot be verified

### Step 5: classify work areas

Classification uses file paths, repository structure, languages, PR context, and repeated activity—not commit-message keywords alone.

Initial work-area taxonomy:

- Backend/API
- Web frontend
- Mobile
- Database/data modeling
- Infrastructure/DevOps
- Testing/quality
- Security/authentication
- Performance/reliability
- Developer tooling
- Documentation
- Product/design implementation

### Step 6: group evidence into contributions

Related commits are grouped by repository, pull request, subsystem, and time window. The unit presented to the user is a contribution bundle rather than hundreds of individual commits.

Example:

```text
Contribution: Authentication error handling
Repository: example/api
Evidence: 2 PRs, 7 verified commits, 5 tests, auth middleware changes
Confidence: high
Allowed claim: Improved authentication error handling and added regression coverage.
Blocked claim: Reduced login failures by 40%.
```

### Step 7: ask for missing context

The CLI may ask the user:

- What problem were you solving?
- Was this production work, a prototype, or a tutorial?
- Did you lead, pair on, or contribute to this work?
- Is there a measurable result you can verify?
- May the repository name appear in the output?

User answers are stored separately from GitHub facts and labeled as user-provided context.

### Step 8: generate and validate claims

Each generated bullet must include:

- Claim text
- Evidence IDs
- Confidence
- Source URLs where export permissions allow
- Whether user context was used
- Whether AI rewrote the claim

Claims without evidence fail validation and are not exported.

## 8. Evidence data model

```json
{
  "id": "evidence_01",
  "user": "prathamtechops",
  "repository": "owner/repository",
  "visibility": "public",
  "commit": {
    "sha": "abc123",
    "url": "https://github.com/owner/repository/commit/abc123",
    "message": "fix authentication fallback",
    "authoredAt": "2026-08-01T10:00:00Z",
    "authorMatch": "verified"
  },
  "pullRequest": {
    "number": 42,
    "title": "Handle expired sessions safely",
    "url": "https://github.com/owner/repository/pull/42"
  },
  "files": [
    "src/auth/session.ts",
    "src/auth/session.test.ts"
  ],
  "signals": [
    "security/authentication",
    "testing/quality"
  ],
  "confidence": 0.92,
  "exportPermission": "source-links-allowed"
}
```

## 9. Suggested confidence scoring

The exact weights will be tested rather than treated as truth.

```text
+40 GitHub-linked target author
+25 target-authored associated PR
+15 approved email or co-author match
+10 relevant file and repository signals agree
+10 repeated related contribution
-25 merge-only commit
-30 generated or dependency-only change
-40 contradictory identity metadata
-100 no defensible identity match
```

Rules:

- `80-100`: high confidence
- `60-79`: medium confidence; request review
- Below `60`: do not generate a claim by default
- A score never proves business impact or leadership

## 10. CLI experience

```text
$ commitcv generate

GitHub user: prathamtechops
Time range: last 12 months

Select repositories:
[x] devflow
[x] for-you
[ ] tutorial-repository

Found:
- 83 candidate commits
- 56 verified contributions
- 11 probable contributions requiring review
- 16 excluded low-signal or unmatched commits

Review contribution bundles? Yes
Use AI rewriting? Yes
Output: Markdown + JSON
```

Other planned commands:

```bash
commitcv auth login
commitcv scan --user USERNAME
commitcv evidence review
commitcv generate
commitcv validate profile.json
commitcv config show
```

## 11. Technical architecture

### Recommended starting point

Use Go for the CLI spike because it creates portable binaries and supports the Linux-learning goal. The language decision remains a short, explicit architecture ticket; TypeScript is the fallback if team familiarity makes iteration significantly faster.

### Components

```text
CLI input
  -> GitHub client
  -> identity resolver
  -> evidence collector
  -> noise filter
  -> contribution grouper
  -> claim validator
  -> optional AI provider
  -> Markdown/JSON renderer
```

### Provider boundary

```go
type NarrativeProvider interface {
    Generate(ctx context.Context, evidence []Contribution) ([]Claim, error)
}
```

Providers:

- Deterministic template provider for tests and offline usage
- Grok provider for optional natural-language rewriting
- Future provider adapters without changing the evidence pipeline

### Planned repository structure

```text
commitcv/
├── README.md
├── ROADMAP.md
├── CONTRIBUTING.md
├── cmd/commitcv/
├── internal/github/
├── internal/identity/
├── internal/evidence/
├── internal/classifier/
├── internal/generator/
├── internal/render/
├── internal/privacy/
├── fixtures/
└── docs/
```

## 12. Privacy and security requirements

- Never commit GitHub or Grok tokens.
- Prefer environment variables or the operating system credential store.
- Request the least GitHub permission needed.
- Public-profile mode must work without private-repository access.
- Private repository selection is opt-in.
- Private code must not be sent to an AI provider by default.
- Send structured summaries rather than raw source code.
- Redact private repository names when the user requests it.
- Show exactly what will be sent to an AI provider before transmission.
- Provide `--offline` and `--no-ai` modes.
- Store an export manifest documenting which evidence was included.

## 13. Testing strategy

### Deterministic fixtures

Fixtures should cover:

- Verified GitHub author
- Email-only author match
- Co-authored commit
- Bot commit
- Merge commit
- Lockfile-only change
- Generated files
- Rename and file deletion
- Commit connected to multiple PRs
- Private repository redaction
- Empty profile
- API pagination and rate-limit response
- Partial repository failure

### Claim validation tests

- Every claim has at least one evidence ID.
- Every evidence ID resolves.
- Blocked metrics never appear without user-provided evidence.
- Private source links do not appear in public mode.
- AI output cannot introduce unrecognized technologies or numbers.
- Re-running the deterministic provider produces stable output.

### Evaluation set

Create a small, manually reviewed set of GitHub histories and expected contribution bundles. Compare false attribution, missing attribution, unsupported claims, and usefulness of the final profile.

## 14. Milestones

### Milestone 1: product proof

- One manually prepared example profile
- Agreed evidence model
- Agreed claim rules
- CLI architecture decision

### Milestone 2: deterministic scanner

- Repository selection
- Commit and PR collection
- Identity matching
- Noise filtering
- JSON evidence output

### Milestone 3: usable profile generator

- Contribution grouping
- Markdown generation
- Review workflow
- Source links and confidence

### Milestone 4: optional AI and design

- Grok adapter
- Claim guardrails and evaluations
- Figma profile design
- Designed HTML export

### Milestone 5: fun-project release

- Linux/macOS builds
- Installation instructions
- Example profile
- Demo recording
- v0.1.0 release

## 15. Roles

| Role | Responsibilities |
|---|---|
| Product/tech lead | MVP scope, architecture, acceptance criteria, final decisions |
| CLI/Linux engineer | Command structure, configuration, packaging, releases |
| GitHub-data engineer | API client, pagination, identity attribution, evidence records |
| AI engineer | Provider adapter, prompts, validation, evaluation set |
| Figma designer | Information hierarchy, profile/report design, visual system |
| Report/frontend engineer | HTML renderer and design implementation |
| QA/release owner | Fixtures, cross-platform checks, documentation, release verification |

Assignments must be based on confirmed expertise. Unclear tickets remain unassigned with a recommended role so team members can self-assign.

## 16. Linear ticket plan

### Parent issue

**CommitCV: Build an evidence-backed GitHub developer profile CLI**

The parent contains the product brief, MVP boundary, milestones, repository link, roadmap link, privacy rules, definition of done, and child-ticket checklist.

### Child issues

#### CCV-1: Create the reference profile and lock the MVP

- Owner role: Product/tech lead
- Deliverable: one manually reviewed Markdown profile
- Acceptance: team agrees on useful sections, evidence links, and excluded claims

#### CCV-2: Decide the CLI language and architecture

- Owner role: CLI/Linux engineer
- Deliverable: short Go-versus-TypeScript decision record and CLI skeleton plan
- Acceptance: packaging, dependencies, configuration, and test approach are documented
- Depends on: CCV-1

#### CCV-3: Implement the CLI skeleton

- Owner role: CLI/Linux engineer
- Deliverable: commands, config loading, structured logging, error handling
- Acceptance: help output and offline placeholder flow run on Linux and macOS
- Depends on: CCV-2

#### CCV-4: Implement GitHub authentication and repository selection

- Owner role: GitHub-data engineer
- Deliverable: public mode, authenticated mode, explicit repository picker
- Acceptance: no private repository is scanned without selection
- Depends on: CCV-3

#### CCV-5: Collect repository, commit, PR, language, and release facts

- Owner role: GitHub-data engineer
- Deliverable: paginated collector with normalized records
- Acceptance: partial failures are reported without losing successful repositories
- Depends on: CCV-4

#### CCV-6: Resolve commit identity and co-authorship

- Owner role: GitHub-data engineer
- Deliverable: verified/probable/uncertain/excluded identity resolver
- Acceptance: name-only matches are excluded by default
- Depends on: CCV-5

#### CCV-7: Filter noise and classify work areas

- Owner role: GitHub-data engineer
- Deliverable: bot, merge, generated, lockfile, duplicate, and work-area rules
- Acceptance: every classification retains source evidence and confidence
- Depends on: CCV-5, CCV-6

#### CCV-8: Group evidence into contribution bundles

- Owner role: Product/tech lead plus GitHub-data engineer
- Deliverable: repository/PR/subsystem/time-window grouping
- Acceptance: users review bundles instead of individual low-level commits
- Depends on: CCV-7

#### CCV-9: Build deterministic Markdown and JSON generation

- Owner role: CLI/Linux engineer
- Deliverable: offline profile generator
- Acceptance: every claim has valid evidence IDs and stable test output
- Depends on: CCV-8

#### CCV-10: Add privacy, redaction, and export controls

- Owner role: GitHub-data engineer
- Deliverable: public/private modes, source-link controls, export manifest
- Acceptance: private names and URLs never leak in public mode
- Depends on: CCV-5, CCV-9

#### CCV-11: Implement the Grok narrative provider

- Owner role: AI engineer
- Deliverable: optional provider using structured evidence only
- Acceptance: no raw private code is sent; unsupported technologies and metrics are rejected
- Depends on: CCV-9, CCV-10

#### CCV-12: Build the AI evaluation and claim-validation suite

- Owner role: AI engineer plus QA
- Deliverable: reviewed histories, expected bundles, hallucination tests
- Acceptance: false attribution and unsupported-claim failures are measurable
- Depends on: CCV-11

#### CCV-13: Design the profile/report experience in Figma

- Owner role: Figma designer
- Deliverable: profile hierarchy, evidence treatment, confidence states, responsive layout
- Acceptance: approved desktop/mobile designs and reusable visual tokens
- Depends on: CCV-1; can run alongside scanner development

#### CCV-14: Implement the designed HTML profile export

- Owner role: Report/frontend engineer
- Deliverable: accessible HTML report using approved design
- Acceptance: correct private/public behavior and printable layout
- Depends on: CCV-9, CCV-10, CCV-13

#### CCV-15: Add deterministic fixtures and integration tests

- Owner role: QA/release owner
- Deliverable: fixture matrix from Section 13
- Acceptance: attribution, filtering, privacy, pagination, and partial failures are covered
- Depends on: CCV-5 through CCV-10

#### CCV-16: Add CI, cross-platform builds, and v0.1.0 release

- Owner role: QA/release owner plus CLI/Linux engineer
- Deliverable: Linux/macOS builds, checksums, installation docs, release notes
- Acceptance: clean-machine installation and sample generation are verified
- Depends on: CCV-12, CCV-14, CCV-15

#### CCV-17: Create onboarding, demo, and contributor documentation

- Owner role: Product/tech lead plus QA
- Deliverable: setup guide, architecture overview, demo, contribution flow
- Acceptance: a new contributor can run fixtures and claim a Linear ticket
- Depends on: CCV-3 and updated throughout the project

## 17. Parent issue definition of done

- Repository exists under `prathamtechops`.
- README and this roadmap are committed.
- One user can select repositories and a date range.
- Identity mapping excludes uncertain authors by default.
- Evidence is collected and grouped deterministically.
- Markdown and JSON profiles work without AI.
- Optional Grok rewriting cannot add unsupported claims.
- Private repository information is opt-in and redactable.
- Figma-designed HTML output is implemented.
- Linux and macOS builds are published.
- A complete demo profile is reviewed by the team.
- All child tickets meet their acceptance criteria.

## 18. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Commit count is mistaken for skill | Treat count only as an activity signal |
| Wrong person receives credit | Strong identity resolver; exclude name-only matches |
| AI invents impact | Structured evidence, claim validator, user approval |
| Private code leaks | Explicit selection, redaction, no raw code to AI by default |
| Free API changes | Provider interface and deterministic offline mode |
| Large GitHub history is slow | Pagination, caching, date/repository filters |
| Too many tickets before proof | CCV-1 produces a sample before implementation expands |
| Figma work blocks the CLI | Design runs in parallel after the sample profile exists |
| Team assignments are guessed | Recommended roles plus self-assignment |

## 19. Official GitHub references

- GitHub REST commit endpoints, including associated pull requests: https://docs.github.com/en/rest/commits
- GitHub REST commit representation and linked author/committer data: https://docs.github.com/en/rest/commits/commits
- GitHub GraphQL commit contribution types: https://docs.github.com/en/graphql/reference/commits
- GitHub repository language endpoint: https://docs.github.com/en/rest/repos/repos#list-repository-languages
- GitHub release endpoints: https://docs.github.com/en/rest/releases/releases

## 20. Immediate next action

Before creating tickets, inspect the existing personal Linear issue. Use it as the parent if it already represents CommitCV. Then create the personal GitHub repository, commit `README.md` and `ROADMAP.md`, add their links to the parent, and create CCV-1 through CCV-17 as child issues with dependencies and recommended roles.
