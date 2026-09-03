# CommitCV web

Interactive design prototype for choosing GitHub profile components, templates,
themes, section order, preview size, and export state.

## Stack

- React 19 with TypeScript
- Vite
- shadcn/ui with Radix primitives
- Tailwind CSS
- Lucide icons

shadcn/ui was selected because CommitCV needs a distinct visual language for its
cards and templates. It provides accessible primitives without forcing the app
to look like a generic component library. The tradeoff is that the generated UI
components live in this repository and must be maintained by the team.

All interactive actions use shadcn components. Product layouts and reusable
cards are styled with Tailwind utilities; src/index.css only contains the
Tailwind/shadcn imports and shared design tokens.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Checks

\`\`\`bash
npm run lint
npm run build
\`\`\`

## Current scope

The prototype uses local dummy data. GitHub API fetching, authentication,
publishing, and actual PNG generation are intentionally not implemented yet.
