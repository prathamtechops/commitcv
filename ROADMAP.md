# CommitCV project plan

## The idea

CommitCV is a command-line tool that turns GitHub activity into a developer profile.

A user picks their repositories and a date range. The app checks their commits, pull requests, languages, and releases. It then creates a profile that the user can review and export.

This is a fun learning project, but we want to finish the whole product—from choosing the tech stack to publishing installable packages.

## What the finished app should do

1. Let a user connect GitHub.
2. Let them choose repositories and dates.
3. Find the commits and pull requests that belong to them.
4. Ignore bots, generated files, lockfile-only changes, and other noise.
5. Group the useful work into easy-to-read contributions.
6. Create Markdown, JSON, and HTML profiles.
7. Optionally use Grok to improve the writing.
8. Keep private repository information safe.
9. Work on macOS and Linux.
10. Be easy to install and use.

## Rules we should not break

- Commit count does not automatically mean skill or impact.
- We do not claim business results unless the user provides proof.
- We do not give someone credit based only on a matching name.
- Every profile claim should point back to GitHub evidence.
- AI is optional and cannot add unsupported facts.
- Private code is not sent to AI by default.
- The user always reviews the final result.

## The tickets, in order

### 1. Choose the tech stack

**Goal:** Decide what we will use before anyone starts building.

**What to do:**

- Compare Go, TypeScript, Rust, or another sensible option.
- Pick the CLI language, GitHub library, testing tools, HTML approach, AI library, and packaging method.
- Write the final choices in a short `TECH_STACK.md` file.

**Done when:** The team understands the choices and can set up the project without guessing.

### 2. Agree on what the final profile should look like

**Goal:** Make one example profile before building the generator.

**What to do:**

- Create a sample profile by hand.
- Decide which sections are useful.
- Decide what information should never be claimed automatically.

**Done when:** The team agrees that the sample is the result we want the app to create.

### 3. Set up the app and basic CLI

**Goal:** Create the project structure and commands.

**What to do:**

- Set up the chosen language and dependencies.
- Add commands such as `generate`, `scan`, `validate`, and `version`.
- Add config loading and clear error messages.

**Done when:** Everyone can install the project locally and run the help command on macOS and Linux.

### 4. Connect GitHub and choose repositories

**Goal:** Let users safely choose which GitHub work to scan.

**What to do:**

- Support public GitHub profiles.
- Add login for private repositories.
- Let users choose repositories and a date range.

**Done when:** The app never scans a private repository unless the user selects it.

### 5. Read the useful GitHub data

**Goal:** Collect the facts needed for the profile.

**What to do:**

- Read repository details, commits, changed files, pull requests, languages, tags, and releases.
- Handle GitHub pagination and rate limits.
- Keep links back to the original GitHub activity.

**Done when:** The app can scan several repositories without losing good results if one repository fails.

### 6. Match commits to the right person

**Goal:** Avoid giving someone credit for another person's work.

**What to do:**

- Match GitHub accounts, approved emails, pull-request authors, and co-authors.
- Mark matches as confirmed, likely, unclear, or excluded.
- Ignore name-only matches by default.

**Done when:** Test examples correctly handle normal commits, co-authors, bots, and unclear identities.

### 7. Remove noise and understand the type of work

**Goal:** Keep useful work and hide activity that says very little.

**What to do:**

- Detect bots, merge-only commits, generated files, duplicates, and lockfile-only changes.
- Use changed files to understand whether work is frontend, backend, mobile, testing, documentation, or something else.

**Done when:** Every included or excluded item has a simple explanation.

### 8. Group work into useful contributions

**Goal:** Show meaningful work instead of a long list of commits.

**What to do:**

- Group related commits by pull request, feature, repository, folder, and time.
- Keep the GitHub links behind each group.
- Let the user review and correct a group.

**Done when:** A real repository history becomes a short list of understandable contributions.

### 9. Generate Markdown and JSON profiles

**Goal:** Create useful profiles without needing AI.

**What to do:**

- Generate readable Markdown.
- Generate structured JSON.
- Let users accept, edit, or remove sections before export.
- Add a command that checks whether every claim has evidence.

**Done when:** The same input creates the same result and every claim links to evidence.

### 10. Keep private data and tokens safe

**Goal:** Make private-repository use safe.

**What to do:**

- Store tokens safely and never print them in logs.
- Add public, private, offline, and no-AI modes.
- Let users hide private repository names and links.
- Show what data will be sent before calling an AI service.

**Done when:** Public exports and AI requests cannot accidentally leak private information.

### 11. Add optional Grok writing

**Goal:** Let Grok improve the wording without changing the facts.

**What to do:**

- Send only approved, structured evidence.
- Ask Grok for clear and natural profile text.
- Handle API errors, bad responses, and rate limits.

**Done when:** The app still works without Grok and safely falls back when Grok fails.

### 12. Stop AI from making things up

**Goal:** Check every AI-written claim before showing it to the user.

**What to do:**

- Reject new technologies, numbers, leadership claims, or impact claims that are not in the evidence.
- Test good, bad, and tricky AI responses.
- Track how often the AI adds something unsupported.

**Done when:** Unsupported AI claims fail the check instead of entering the profile.

### 13. Design the profile in Figma

**Goal:** Decide how the final profile should look and feel.

**What to do:**

- Design desktop, mobile, and printable layouts.
- Show projects, skills, evidence links, confidence, empty states, and private states.
- Create reusable colors, spacing, typography, and components.

**Done when:** The team approves the design and the developer has everything needed to build it.

### 14. Build the HTML profile

**Goal:** Turn the approved Figma design into a real export.

**What to do:**

- Build a responsive and accessible HTML profile.
- Add print-friendly styles.
- Make sure public and private modes display the right information.

**Done when:** The HTML works on desktop, mobile, print, and without an internet connection.

### 15. Test the whole app

**Goal:** Catch mistakes before users do.

**What to do:**

- Add test GitHub histories that do not contain real private data.
- Test identity matching, filtering, privacy, generation, AI checks, and failures.
- Run tests automatically for every pull request.

**Done when:** The important user flows pass on macOS and Linux.

### 16. Build and publish installable packages

**Goal:** Make CommitCV easy for other people to install.

**What to do:**

- Build macOS and Linux releases.
- Publish the package format chosen in Ticket 1, such as Homebrew, npm, or downloadable binaries.
- Add version numbers, checksums, release notes, and an upgrade path.
- Test installation on a clean computer.

**Done when:** A new user can install CommitCV, run it, and generate a sample profile without cloning the source code.

### 17. Write the docs and record a demo

**Goal:** Help users and new contributors understand the project.

**What to do:**

- Write setup, usage, privacy, troubleshooting, and contribution guides.
- Add an example profile made from safe test data.
- Record a short demo from installation to final export.

**Done when:** A new user can follow the guide without help and a contributor can pick a Linear ticket and start working.

## Simple project stages

1. **Plan:** Tickets 1–2
2. **Build the scanner:** Tickets 3–8
3. **Create the profiles:** Tickets 9–14
4. **Test and publish:** Tickets 15–16
5. **Teach people how to use it:** Ticket 17

## Who can work on what

- CLI or backend developers: Tickets 1, 3–10, 15–16
- AI developers: Tickets 11–12
- Figma designer: Ticket 13
- Frontend developer: Ticket 14
- Anyone who enjoys writing, testing, or demos: Tickets 2, 15, and 17

People can work together or assign themselves. The ticket order shows the main dependency, but tasks such as design, tests, and documentation can start early when their required information is ready.

## The project is finished when

- A user can install CommitCV on macOS or Linux.
- They can connect GitHub and choose repositories.
- The app correctly finds and groups their work.
- They can review and export Markdown, JSON, and HTML profiles.
- Private information stays private.
- AI cannot add unsupported claims.
- The packages, documentation, example, and demo are public.
- All 17 tickets are complete.
